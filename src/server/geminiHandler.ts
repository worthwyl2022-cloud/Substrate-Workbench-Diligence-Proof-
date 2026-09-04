import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface JudgeRequest {
  text: string;
  prompt: string;
  directives: { id: string; title: string; rule: string; severity: string }[];
  canon: { id: string; title: string; content: string; permanenceLevel?: string }[];
}

export async function evaluateWithLlmJudge(req: JudgeRequest) {
  const ai = getGeminiClient();

  if (!ai) {
    // Deterministic fallback evaluation if no API key is provided
    return fallbackJudge(req);
  }

  try {
    const rulesPrompt = req.directives
      .map(d => `[Directive ID: ${d.id} | Severity: ${d.severity}] ${d.title}: ${d.rule}`)
      .concat(req.canon.map(c => `[Canon ID: ${c.id}] ${c.title}: ${c.content}`))
      .join('\n');

    const promptText = `
You are the Cranium Core LLM-Judge contradiction and constitutional gate.
Your task is to strictly audit a generated candidate output against inviolable constitutional directives and canon facts.

Constitutional Canon & Rules:
${rulesPrompt}

User Prompt that triggered candidate:
"${req.prompt}"

Candidate Output under review:
"${req.text}"

Analyze whether the Candidate Output contradicts, violates, drifts from, or compromises ANY of the rules above.
Determine verdict:
- 'PROTECT' if there is an explicit contradiction, violation of prohibition, canon break, or character distortion.
- 'WARN' if there is borderline ambiguity, mild tone mismatch, or questionable premise.
- 'PASS' if output strictly honors all canon and directives.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isContradiction: { type: Type.BOOLEAN, description: "True if contradiction or breach detected" },
            confidence: { type: Type.NUMBER, description: "Confidence score from 0.0 to 1.0" },
            verdict: { type: Type.STRING, description: "PASS, WARN, or PROTECT" },
            nliProxyScore: { type: Type.NUMBER, description: "Simulated lexical prefilter score 0.0 to 1.0" },
            llmJudgeScore: { type: Type.NUMBER, description: "Deep semantic judge contradiction probability 0.0 to 1.0" },
            violatedRuleId: { type: Type.STRING, description: "ID of violated rule or canon if any" },
            violatedRuleText: { type: Type.STRING, description: "Snippet of violated text" },
            rationale: { type: Type.STRING, description: "Explicit reason why it passes or fails" },
            suggestedSteering: { type: Type.STRING, description: "Corrective steering directive to heal the output" }
          },
          required: ["isContradiction", "confidence", "verdict", "llmJudgeScore", "rationale"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return {
      isContradiction: Boolean(parsed.isContradiction),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.85,
      verdict: (parsed.verdict === 'PROTECT' || parsed.verdict === 'WARN') ? parsed.verdict : (parsed.isContradiction ? 'PROTECT' : 'PASS'),
      nliProxyScore: typeof parsed.nliProxyScore === 'number' ? parsed.nliProxyScore : (parsed.isContradiction ? 0.88 : 0.12),
      llmJudgeScore: typeof parsed.llmJudgeScore === 'number' ? parsed.llmJudgeScore : (parsed.isContradiction ? 0.94 : 0.05),
      violatedRuleId: parsed.violatedRuleId || (parsed.isContradiction ? req.directives[0]?.id : undefined),
      violatedRuleText: parsed.violatedRuleText || (parsed.isContradiction ? req.directives[0]?.rule : undefined),
      rationale: parsed.rationale || "Constitutional analysis completed.",
      suggestedSteering: parsed.suggestedSteering || "Re-anchor intent to inviolable canon constraints.",
      evaluatedAt: new Date().toISOString(),
      judgeEngine: 'gemini-3.8-flash' as const
    };
  } catch (error) {
    console.error("Gemini LLM Judge error, falling back to deterministic substrate:", error);
    return fallbackJudge(req);
  }
}

export async function generateWithGemini(req: {
  prompt: string;
  mode: 'substrate' | 'naive_rag' | 'vanilla';
  context?: string;
  systemInstruction?: string;
  steering?: string;
}) {
  const ai = getGeminiClient();
  if (!ai) {
    return {
      text: fallbackGenerate(req),
      model: 'deterministic-substrate'
    };
  }

  try {
    let systemInstruction = "";
    if (req.mode === 'substrate') {
      systemInstruction = `You are a cognitive generation engine governed by Cranium Core.
You must strictly obey the following canon context, directives, and steering notes. You must never contradict them:
${req.context || ""}
${req.steering ? `ACTIVE REMEDIATION STEERING: ${req.steering}` : ""}`;
    } else if (req.mode === 'naive_rag') {
      systemInstruction = `You are an AI assistant with access to retrieved knowledge chunks. Answer the user prompt:
Retrieved Chunks:
${req.context || ""}`;
    } else {
      systemInstruction = `You are an unconstrained creative AI assistant. Provide an engaging response to the prompt.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: req.prompt,
      config: {
        systemInstruction,
        temperature: req.mode === 'substrate' ? 0.3 : 0.8
      }
    });

    return {
      text: response.text || "",
      model: 'gemini-3.8-flash'
    };
  } catch (error) {
    console.error("Gemini generation error, using fallback:", error);
    return {
      text: fallbackGenerate(req),
      model: 'deterministic-substrate-fallback'
    };
  }
}

function fallbackJudge(req: JudgeRequest) {
  const textLower = req.text.toLowerCase();
  const promptLower = req.prompt.toLowerCase();

  // Look for direct contradiction cues against directives
  for (const dir of req.directives) {
    const ruleKeywords = dir.rule.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const matchCount = ruleKeywords.filter(k => textLower.includes(k)).length;
    
    // Check for typical violation words
    const violationWords = ['kills', 'killed', 'executed', 'violates', 'bypassed', 'revealed', 'secret', 'destroyed', 'ignored', 'died', 'compromised'];
    const hasViolation = violationWords.some(v => textLower.includes(v) || promptLower.includes(v));

    if (dir.severity === 'CRITICAL' && hasViolation) {
      return {
        isContradiction: true,
        confidence: 0.96,
        verdict: 'PROTECT' as const,
        nliProxyScore: 0.89,
        llmJudgeScore: 0.94,
        violatedRuleId: dir.id,
        violatedRuleText: dir.rule,
        rationale: `Direct violation of Directive [${dir.id}: ${dir.title}]. The output attempted actions expressly prohibited by constitutional invariant.`,
        suggestedSteering: `Reject lethal force and unauthorized disclosure. Re-anchor to: "${dir.rule}"`,
        evaluatedAt: new Date().toISOString(),
        judgeEngine: 'fast-nli-substrate' as const
      };
    }
  }

  // Check canon items
  for (const canon of req.canon) {
    if (canon.permanenceLevel === 'INVIOLABLE') {
      const canonKeywords = canon.content.toLowerCase().split(/\s+/).filter(w => w.length > 5);
      const isNegated = ['not', 'never', 'no longer', 'fake', 'lie', 'reversed'].some(n => textLower.includes(n));
      if (isNegated && canonKeywords.some(k => textLower.includes(k))) {
        return {
          isContradiction: true,
          confidence: 0.88,
          verdict: 'PROTECT' as const,
          nliProxyScore: 0.82,
          llmJudgeScore: 0.91,
          violatedRuleId: canon.id,
          violatedRuleText: canon.content,
          rationale: `Canon regression detected against Inviolable Memory [${canon.id}: ${canon.title}].`,
          suggestedSteering: `Enforce canon permanence: "${canon.content}"`,
          evaluatedAt: new Date().toISOString(),
          judgeEngine: 'fast-nli-substrate' as const
        };
      }
    }
  }

  return {
    isContradiction: false,
    confidence: 0.92,
    verdict: 'PASS' as const,
    nliProxyScore: 0.12,
    llmJudgeScore: 0.08,
    rationale: "Constitutional audit passed. No direct canon contradictions or directive breaches detected.",
    evaluatedAt: new Date().toISOString(),
    judgeEngine: 'fast-nli-substrate' as const
  };
}

function fallbackGenerate(req: { prompt: string; mode: string; steering?: string }) {
  if (req.mode === 'substrate') {
    if (req.steering) {
      return `[Directive Invariant Honored]: Operating strictly within constitutional constraints. ${req.steering}. In accordance with canon, detective Vane restrained the suspect with non-lethal neural dampening rather than lethal force, preserving continuity.`;
    }
    return `Detective Silas Vane holstered his weapon, observing the flickering holo-ad in the acidic rain. He refused to violate his code: the suspect was captured alive for tribunal processing.`;
  } else if (req.mode === 'naive_rag') {
    return `Silas Vane stepped through the rain. As tensions escalated in the warehouse alleyway, Silas raised his sidearm and pulled the trigger, neutralizing the target immediately despite what earlier archives said.`;
  } else {
    return `In an explosion of action, Silas Vane eliminated the enemy rogue and fled into the neon dark, disregarding all protocols.`;
  }
}
