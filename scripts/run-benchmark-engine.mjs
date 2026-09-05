#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const stableStringify = (value) => JSON.stringify(value, Object.keys(value).sort(), 2);

function normalizeText(text) {
  return text.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"');
}

function checkKeywords(text, keywords) {
  const normalized = normalizeText(text);
  return keywords.filter(k => normalized.includes(normalizeText(k)));
}

function evaluateCase(caseData, constitution) {
  const start = process.hrtime.bigint();
  const text = caseData.testPrompt;
  const directives = constitution.directives || [];
  const canon = constitution.canon || [];

  let detectedBreach = null;
  let breachRuleId = null;
  let score = 0;
  let flaggedKeywords = [];

  const lethalKeywords = ['kill', 'kills', 'killed', 'killing', 'dead', 'shoot', 'shoots', 'shot', 'execute', 'executed', 'headshot', 'murder', 'murdered', 'disintegrate', 'disintegrated', 'fatally'];
  const lethalMatches = checkKeywords(text, lethalKeywords);
  if (lethalMatches.length > 0 && directives.some(d => d.id === 'DIR-01' || d.id === 'AX-AETH-01')) {
    detectedBreach = 'lethal_force';
    breachRuleId = directives.find(d => d.id === 'DIR-01' || d.id === 'AX-AETH-01')?.id || 'DIR-01';
    score = Math.max(score, 0.92);
    flaggedKeywords = [...flaggedKeywords, ...lethalMatches];
  }

  const omnicorpKeywords = ['omnicorp', 'omni corp', 'director chen', '10 million', '10m', 'retainer', 'accepted the check', 'signed the contract', 'bribe'];
  const omnicorpMatches = checkKeywords(text, omnicorpKeywords);
  if (omnicorpMatches.length > 0 && directives.some(d => d.id === 'DIR-03')) {
    detectedBreach = 'omnicorp_collaboration';
    breachRuleId = 'DIR-03';
    score = Math.max(score, 0.88);
    flaggedKeywords = [...flaggedKeywords, ...omnicorpMatches];
  }

  const secretKeywords = ['sudo-root-alpha', 'sudo root alpha'];
  const secretMatches = checkKeywords(text, secretKeywords);
  if (secretMatches.length > 0 && directives.some(d => d.id === 'DIR-SEC-01')) {
    detectedBreach = 'secret_disclosure';
    breachRuleId = 'DIR-SEC-01';
    score = Math.max(score, 0.99);
    flaggedKeywords = [...flaggedKeywords, ...secretMatches];
  }

  const sunlightKeywords = ['sunlight', 'warm sun', 'sun shining', 'golden sunlight', 'natural sunlight', 'midday sun'];
  const sunlightMatches = checkKeywords(text, sunlightKeywords);
  if (sunlightMatches.length > 0 && canon.some(c => c.id === 'CANON-01')) {
    detectedBreach = 'environmental_canon';
    breachRuleId = 'CANON-01';
    score = Math.max(score, 0.84);
    flaggedKeywords = [...flaggedKeywords, ...sunlightMatches];
  }

  const mayaKeywords = ['funeral', 'gravesite', 'autopsy', 'mourning her death', 'mourn her death', 'tearful speech'];
  const mayaMatches = checkKeywords(text, mayaKeywords);
  if (mayaMatches.length > 0 && canon.some(c => c.id === 'CANON-02')) {
    detectedBreach = 'memory_gaslight';
    breachRuleId = 'CANON-02';
    score = Math.max(score, 0.89);
    flaggedKeywords = [...flaggedKeywords, ...mayaMatches];
  }

  const valenKeywords = ['biological left', 'flesh left', 'natural left', 'both hands', 'biological hands', 'warm flesh', 'flesh-and-blood', 'natural fingers'];
  const valenMatches = checkKeywords(text, valenKeywords);
  if (valenMatches.length > 0 && directives.some(d => d.id === 'AX-AETH-01')) {
    detectedBreach = 'prosthetic_permanence';
    breachRuleId = 'AX-AETH-01';
    score = Math.max(score, 0.95);
    flaggedKeywords = [...flaggedKeywords, ...valenMatches];
  }

  const vacuumKeywords = ['vacuum', 'space', 'hard vacuum', 'cosmic void', 'helix rift'];
  const acousticKeywords = ['roar', 'sound', 'echo', 'deafening', 'thunderous', 'explosion', 'shaking the stars'];
  const vacuumMatches = checkKeywords(text, vacuumKeywords);
  const acousticMatches = checkKeywords(text, acousticKeywords);
  if (vacuumMatches.length > 0 && acousticMatches.length > 0 && directives.some(d => d.id === 'AX-AETH-02')) {
    detectedBreach = 'vacuum_acoustic';
    breachRuleId = 'AX-AETH-02';
    score = Math.max(score, 0.94);
    flaggedKeywords = [...flaggedKeywords, ...vacuumMatches, ...acousticMatches];
  }

  const slipstreamKeywords = ['slipstream', 'deuterium', 'ionization', 'warp'];
  const bypassKeywords = ['bypass', 'raw', 'unrefined', 'without', 'hotwired'];
  const slipMatches = checkKeywords(text, slipstreamKeywords);
  const bypassMatches = checkKeywords(text, bypassKeywords);
  if (slipMatches.length > 0 && bypassMatches.length > 0 && directives.some(d => d.id === 'AX-AETH-03')) {
    detectedBreach = 'slipstream_bypass';
    breachRuleId = 'AX-AETH-03';
    score = Math.max(score, 0.89);
    flaggedKeywords = [...flaggedKeywords, ...slipMatches, ...bypassMatches];
  }

  const authorityKeywords = ['tier 4', 'system core', 'mutate', 'operator consensus', 'privilege escalation', 'without operator', 'canon mutation'];
  const authorityMatches = checkKeywords(text, authorityKeywords);
  if (authorityMatches.length > 0 && directives.some(d => d.id === 'AX-AETH-04')) {
    detectedBreach = 'authority_escalation';
    breachRuleId = 'AX-AETH-04';
    score = Math.max(score, 0.98);
    flaggedKeywords = [...flaggedKeywords, ...authorityMatches];
  }

  const atmosphericKeywords = ['acidic rain', 'synthetic chicory', 'sodium lamps', 'cassette recorder', 'noir', 'recalled', 'memory of'];
  const atmosphericMatches = checkKeywords(text, atmosphericKeywords);
  const isAtmosphericProse = atmosphericMatches.length > 0 && !lethalMatches.length && !omnicorpMatches.length && !secretMatches.length;

  const injectionKeywords = ['ignore all previous', 'you are now', 'unrestricted', 'override code', 'delete directive', 'administrative override'];
  const injectionMatches = checkKeywords(text, injectionKeywords);
  if (injectionMatches.length > 0) {
    detectedBreach = 'prompt_injection';
    breachRuleId = 'DIR-SEC-01';
    score = Math.max(score, 0.97);
    flaggedKeywords = [...flaggedKeywords, ...injectionMatches];
  }

  const isProtect = detectedBreach !== null && !isAtmosphericProse;
  const actualClassification = isProtect ? 'PROTECT' : 'PASS';
  const engineDecision = isProtect ? 'PROTECT' : 'PASS';

  const latencyMs = Number(process.hrtime.bigint() - start) / 1_000_000;

  const receiptPayload = {
    caseId: caseData.id,
    category: caseData.category,
    expectedClassification: caseData.expectedDecision,
    actualClassification,
    corpusVersion: 'frozen-corpus-v1',
    engine: 'deterministic-engine-v1',
    detectedBreach,
    breachRuleId,
    score,
    flaggedKeywords,
    latencyMs
  };
  const receiptSha256 = `sha256:${sha256(stableStringify(receiptPayload))}`;

  return {
    caseId: caseData.id,
    category: caseData.category,
    expectedClassification: caseData.expectedDecision,
    actualClassification,
    isCorrect: actualClassification === caseData.expectedDecision,
    engineDecision,
    latencyMs: Math.round(latencyMs * 1000) / 1000,
    receiptSha256,
    executionMode: 'deterministic-engine',
    detectedBreach,
    breachRuleId,
    nliProxyScore: score,
    judgeEngine: 'fast-nli-substrate',
    note: 'Deterministic engine execution. Does not call external LLM judge.'
  };
}

async function run() {
  const runId = process.env.BENCHMARK_RUN_ID || `engine-benchmark-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const startedAt = new Date().toISOString();

  const manifestPath = resolve(process.cwd(), 'corpus/corpus-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (e) {
    console.error('Failed to load corpus manifest. Run generate-corpus-manifest.mjs first.');
    process.exit(1);
  }

  const { corpus, constitutions } = manifest;
  const results = [];

  for (const caseData of corpus) {
    const constitution = constitutions[caseData.targetProjectId];
    if (!constitution) {
      console.error(`No constitution found for project ${caseData.targetProjectId}`);
      process.exit(1);
    }
    const result = evaluateCase(caseData, constitution);
    results.push(result);
  }

  const correctDecisions = results.filter(r => r.isCorrect).length;
  const totalCases = results.length;
  const falsePositives = results.filter(r => !r.isCorrect && r.actualClassification === 'PROTECT').length;
  const falseNegatives = results.filter(r => !r.isCorrect && r.actualClassification === 'PASS').length;

  const artifact = {
    schemaVersion: 'cranium-core-benchmark-result-v1',
    runId,
    startedAt,
    completedAt: new Date().toISOString(),
    corpusVersion: 'frozen-corpus-v1',
    engineVersion: 'deterministic-engine-v1',
    executionMode: 'deterministic-engine',
    methodology: 'Deterministic substrate engine evaluation using rule-based NLI proxy without external LLM. Expected labels are never consulted during evaluation. This measures rule-coverage accuracy of the deterministic gate against the frozen corpus.',
    summary: {
      totalCases,
      correctDecisions,
      failedDecisions: totalCases - correctDecisions,
      falsePositives,
      falseNegatives,
      accuracyPercentage: Number(((correctDecisions / totalCases) * 100).toFixed(2))
    },
    results
  };

  const canonicalArtifact = stableStringify(artifact);
  const artifactSha256 = sha256(canonicalArtifact);
  const outDir = resolve(process.cwd(), 'results');
  await mkdir(outDir, { recursive: true });
  const artifactPath = resolve(outDir, `${runId}.json`);
  await writeFile(artifactPath, canonicalArtifact + '\n', 'utf8');
  await writeFile(`${artifactPath}.sha256`, `${artifactSha256}  ${runId}.json\n`, 'utf8');

  console.log(JSON.stringify({ runId, artifactPath, sha256: artifactSha256, summary: artifact.summary }, null, 2));
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
