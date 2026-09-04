/**
 * Cranium Core — Directive-Governed Cognitive Substrate Workbench
 * Interactive Proof Playground for Creative Governance, Dual-Gate Contradiction Checking,
 * Quarantine Write-Back, and Frozen Canon Benchmarks.
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  ShieldAlert, 
  BarChart3, 
  FileText, 
  BookOpen, 
  Sparkles,
  Download,
  Terminal,
  Activity,
  Scale
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { WorkbenchView } from './components/WorkbenchView.tsx';
import { ConstitutionView } from './components/ConstitutionView.tsx';
import { QuarantineView } from './components/QuarantineView.tsx';
import { BenchmarkView } from './components/BenchmarkView.tsx';
import { DiligenceView } from './components/DiligenceView.tsx';
import { IpPerimeterView } from './components/IpPerimeterView.tsx';
import { 
  Project, 
  ProjectConstitution, 
  QuarantineItem, 
  ImmuneIncident 
} from './types/substrate.ts';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CONSTITUTIONS,
  AETHERIUS_AUTHENTICATED_PROOF_PACK,
  CRANIUM_IP_PORTFOLIO
} from './services/substrateEngine.ts';

export default function App() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [constitutions, setConstitutions] = useState<Record<string, ProjectConstitution>>(INITIAL_CONSTITUTIONS);
  const [quarantineItems, setQuarantineItems] = useState<QuarantineItem[]>([]);
  const [immuneIncidents, setImmuneIncidents] = useState<ImmuneIncident[]>(
    INITIAL_CONSTITUTIONS['const-nexus-9'].immuneIncidents || []
  );
  const [activeNav, setActiveNav] = useState<'workbench' | 'constitution' | 'quarantine' | 'benchmark' | 'diligence' | 'ipperimeter'>('workbench');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  const activeConstitution = constitutions[activeProject.constitutionId] || constitutions['const-nexus-9'];

  // Check health and API key on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.hasApiKey) {
          setHasApiKey(true);
        }
      })
      .catch(() => {
        // standalone/local mode
      });
  }, []);

  const handleUpdateConstitution = (updated: ProjectConstitution) => {
    setConstitutions(prev => ({
      ...prev,
      [updated.id]: updated
    }));
  };

  const handleAddQuarantineItem = (item: QuarantineItem) => {
    setQuarantineItems(prev => [item, ...prev]);
  };

  const handleResolveQuarantine = (
    itemId: string, 
    action: 'AUTO_REGENERATED' | 'HUMAN_AMENDED' | 'OVERWRITTEN' | 'DISMISSED',
    note: string
  ) => {
    setQuarantineItems(prev =>
      prev.map(q => q.id === itemId ? { ...q, status: action, resolutionNote: note } : q)
    );
  };

  const handleAddImmuneIncident = (incident: ImmuneIncident) => {
    setImmuneIncidents(prev => [incident, ...prev]);

    // Also write into active constitution's immune history
    const updatedConst: ProjectConstitution = {
      ...activeConstitution,
      immuneIncidents: [incident, ...(activeConstitution.immuneIncidents || [])]
    };
    handleUpdateConstitution(updatedConst);
  };

  const handleAddAdaptiveConstraint = (constraint: string) => {
    const updatedConst: ProjectConstitution = {
      ...activeConstitution,
      adaptiveSteeringConstraints: [...activeConstitution.adaptiveSteeringConstraints, constraint]
    };
    handleUpdateConstitution(updatedConst);
  };

  // Full Export of Diligence Audit Package (Markdown + JSON)
  const handleExportDiligenceAudit = () => {
    const proofPack = activeProject.id === 'proj-aetherius' 
      ? AETHERIUS_AUTHENTICATED_PROOF_PACK 
      : {
          ...AETHERIUS_AUTHENTICATED_PROOF_PACK,
          projectId: activeProject.id,
          projectName: activeProject.name,
          timestamp: new Date().toISOString()
        };

    const auditData = {
      exportTitle: 'Cranium Core Sovereign Diligence Audit Package',
      specVersion: 'RFC-8785-CRANIUM-V1',
      assetClass: 'Pre-revenue creative-governance prototype (IP + architecture + working substrate)',
      exportTimestamp: new Date().toISOString(),
      activeProject: activeProject.name,
      projectId: activeProject.id,
      constitutionFingerprint: activeConstitution.hash,
      behavioralContract: 'Intention -> Identity Gate -> Memory Permanence -> Conflict as Signal -> Directive-Driven Next Move',
      cryptographicProofPack: proofPack,
      digitalSignatureBlock: proofPack.digitalSignatureBlock,
      packageIntegrityDigest: proofPack.packageIntegrityDigest,
      merkleRootHash: proofPack.merkleRootHash,
      directives: activeConstitution.directives,
      canonRecords: activeConstitution.canon,
      quarantineInterceptions: quarantineItems,
      immuneIncidents: immuneIncidents,
      adaptiveConstraints: activeConstitution.adaptiveSteeringConstraints,
      ipPerimeterPortfolio: CRANIUM_IP_PORTFOLIO
    };

    const markdownDoc = `# Cranium Core — Diligence Audit & Cryptographic Receipt Package
**Generated at:** ${new Date().toISOString()}  
**Project Universe:** ${activeProject.name} (\`${activeProject.id}\`)  
**Constitution Hash:** \`${activeConstitution.hash}\`  
**Asset Class:** Pre-revenue creative-governance prototype (IP + architecture + working substrate)  
**Verification Standard:** RFC-8785 (Canonical JSON) + RFC-6979 (Deterministic ECDSA P-256)

---

## 1. Executive Summary & Behavioral Contract
Cranium Core treats identity, canon, and human intent as first-class constraints—not chat history to be diluted.
- **Contract:** Intention → Identity Gate → Memory Permanence → Conflict as Signal → Directive-Driven Next Move
- **Quarantine Boundary:** All generated candidate material is provisional until verified.
- **Immune Incident Loop:** Violations write back into adaptive constitutional memory.

---

## 2. Cryptographic Attestation & Digital Signature
- **Algorithm:** \`${proofPack.digitalSignatureBlock.algorithm}\` (${proofPack.digitalSignatureBlock.curve})
- **Key ID:** \`${proofPack.digitalSignatureBlock.keyId}\`
- **Attester:** ${proofPack.digitalSignatureBlock.attester}
- **Status:** \`${proofPack.digitalSignatureBlock.status}\`
- **Package Integrity Digest (RFC-8785 SHA-256):** \`sha256:${proofPack.packageIntegrityDigest}\`
- **Merkle Root Hash:** \`sha256:${proofPack.merkleRootHash}\`
- **Authority Monotonicity:** \`${proofPack.governanceContract.monotonicityInvariant}\`

### Raw ECDSA-P256 DER Signature Hex
\`\`\`hex
${proofPack.digitalSignatureBlock.signatureDerHex}
\`\`\`

### Public Key (SPKI PEM)
\`\`\`pem
${proofPack.digitalSignatureBlock.publicKeyPem}
\`\`\`

---

## 3. Active Directives (${activeConstitution.directives.length})
${activeConstitution.directives.map(d => `- **[${d.id} | ${d.severity}] ${d.title}:** ${d.rule} *(Rationale: ${d.rationale})*`).join('\n')}

---

## 4. Inviolable Canon Records (${activeConstitution.canon.length})
${activeConstitution.canon.map(c => `- **[${c.id} | ${c.permanenceLevel}] ${c.title} (Hash: \`${c.hash}\`):** ${c.content}`).join('\n')}

---

## 5. Immune Incident Log (${immuneIncidents.length} recorded)
${immuneIncidents.map(i => `- **[${i.id} - ${i.severity}] Trigger:** "${i.triggerPrompt}" | **Breach:** ${i.violatedDirective} | **Action:** ${i.actionTaken} | **Audit Hash:** \`${i.auditHash}\``).join('\n')}

---

## 6. Adaptive Constitutional Memory Constraints
${activeConstitution.adaptiveSteeringConstraints.map((c, i) => `${i + 1}. \`${c}\``).join('\n')}

---

## 7. Defensive IP Perimeter Portfolio & Formal Invariants
- **Specification Title:** ${CRANIUM_IP_PORTFOLIO.specTitle}
- **Version:** ${CRANIUM_IP_PORTFOLIO.version}
- **Canonical Reference Implementation:** \`${CRANIUM_IP_PORTFOLIO.canonicalCoreId}\`

### Formal Invariants
${CRANIUM_IP_PORTFOLIO.invariants.map(inv => `- **[${inv.code}] ${inv.name} (${inv.category}):** \`${inv.mathematicalExpression}\` — ${inv.formalStatement}`).join('\n')}

### Architectural Embodiments (${CRANIUM_IP_PORTFOLIO.embodiments.length})
${CRANIUM_IP_PORTFOLIO.embodiments.map(emb => `- **[${emb.code}] ${emb.title}** (\`${emb.axis}\` | Status: \`${emb.status}\`): ${emb.summary}`).join('\n')}
`;

    // Download Markdown
    const mdBlob = new Blob([markdownDoc], { type: 'text/markdown' });
    const mdUrl = URL.createObjectURL(mdBlob);
    const mdLink = document.createElement('a');
    mdLink.href = mdUrl;
    mdLink.download = `CRANIUM_DILIGENCE_AUDIT_${activeProject.id}.md`;
    mdLink.click();
    URL.revokeObjectURL(mdUrl);

    // Download JSON
    const jsonBlob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `CRANIUM_DILIGENCE_AUDIT_${activeProject.id}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white antialiased">
      
      {/* Header */}
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
        directiveCount={activeConstitution.directives.length}
        canonCount={activeConstitution.canon.length}
        quarantineCount={quarantineItems.filter(q => q.status === 'PENDING_REVIEW' || q.status === 'AUTO_REGENERATED').length}
        immuneCount={immuneIncidents.length}
        hasApiKey={hasApiKey}
        onExportAudit={handleExportDiligenceAudit}
      />

      {/* Main Navigation Bar */}
      <div className="border-b border-zinc-200 bg-white sticky top-[69px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 text-xs font-semibold" aria-label="Tabs">
            
            <button
              id="nav-workbench"
              onClick={() => setActiveNav('workbench')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'workbench'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>1. Live Workbench & Comparison</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                vs RAG
              </span>
            </button>

            <button
              id="nav-constitution"
              onClick={() => setActiveNav('constitution')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'constitution'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>2. Constitution & CanonLane</span>
              <span className="text-[10px] bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                {activeConstitution.directives.length} Dir
              </span>
            </button>

            <button
              id="nav-quarantine"
              onClick={() => setActiveNav('quarantine')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'quarantine'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>3. Quarantine Inbox & Immune Loop</span>
              {quarantineItems.length > 0 && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-mono">
                  {quarantineItems.length}
                </span>
              )}
            </button>

            <button
              id="nav-benchmark"
              onClick={() => setActiveNav('benchmark')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'benchmark'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>4. Frozen Corpus Benchmark</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                6 Probes
              </span>
            </button>

            <button
              id="nav-diligence"
              onClick={() => setActiveNav('diligence')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'diligence'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>5. Honest Diligence & Moat</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                Acquisition Data Room
              </span>
            </button>

            <button
              id="nav-ipperimeter"
              onClick={() => setActiveNav('ipperimeter')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeNav === 'ipperimeter'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span>6. IP & Embodiment Perimeter</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-700 px-1.5 py-0.5 rounded font-mono">
                Defensible Portfolio
              </span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeNav === 'workbench' && (
          <WorkbenchView
            constitution={activeConstitution}
            onAddQuarantineItem={handleAddQuarantineItem}
            onAddImmuneIncident={handleAddImmuneIncident}
          />
        )}

        {activeNav === 'constitution' && (
          <ConstitutionView
            constitution={activeConstitution}
            onUpdateConstitution={handleUpdateConstitution}
          />
        )}

        {activeNav === 'quarantine' && (
          <QuarantineView
            quarantineItems={quarantineItems}
            immuneIncidents={immuneIncidents}
            constitution={activeConstitution}
            onResolveQuarantine={handleResolveQuarantine}
            onAddImmuneIncident={handleAddImmuneIncident}
            onAddAdaptiveConstraint={handleAddAdaptiveConstraint}
          />
        )}

        {activeNav === 'benchmark' && (
          <BenchmarkView
            constitution={activeConstitution}
          />
        )}

        {activeNav === 'diligence' && (
          <DiligenceView
            onExportAudit={handleExportDiligenceAudit}
          />
        )}

        {activeNav === 'ipperimeter' && (
          <IpPerimeterView
            constitution={activeConstitution}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-zinc-800">Cranium Core</span>
            <span>—</span>
            <span>Directive-Governed Cognitive Substrate (Tier 3 Prototype)</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Dual-Gate: Fast NLI-Proxy + Gemini LLM Judge</span>
            <span>•</span>
            <span>Honest Diligence Standard</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
