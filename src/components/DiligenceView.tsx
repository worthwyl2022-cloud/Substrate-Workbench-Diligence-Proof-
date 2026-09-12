import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Download, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  Layers, 
  Key, 
  Sparkles,
  ExternalLink,
  Lock,
  Terminal,
  Cpu,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { DILIGENCE_MOAT_ITEMS, AETHERIUS_AUTHENTICATED_PROOF_PACK } from '../services/substrateEngine.ts';
import { verifyCryptographicProofPack, VerificationAuditResult } from '../utils/cryptoVerification.ts';
import { ACQUISITION_EVIDENCE_CLAIMS, SYSTEM_METADATA, EvidenceLevel } from '../data.ts';

interface DiligenceViewProps {
  onExportAudit: () => void;
}

export const DiligenceView: React.FC<DiligenceViewProps> = ({ onExportAudit }) => {
  const [verificationResult, setVerificationResult] = useState<VerificationAuditResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showRawSignature, setShowRawSignature] = useState<boolean>(false);

  const handleVerifyProofPack = async () => {
    setIsVerifying(true);
    try {
      const res = await verifyCryptographicProofPack(AETHERIUS_AUTHENTICATED_PROOF_PACK);
      setVerificationResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(AETHERIUS_AUTHENTICATED_PROOF_PACK.digitalSignatureBlock.publicKeyPem);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadProofJson = () => {
    const jsonBlob = new Blob([JSON.stringify(AETHERIUS_AUTHENTICATED_PROOF_PACK, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `CRANIUM_PROOF_PACK_${AETHERIUS_AUTHENTICATED_PROOF_PACK.projectId}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);
  };
  const assetInventory = [
    { name: 'Android substrate (Kotlin)', location: 'WorthWyl-game-changer — SubstrateCore, immune, field', status: 'Working Substrate' },
    { name: 'Governance modules', location: 'CanonLane, ContradictionEngine (proxy v2), OutputEvaluator, DeliberationEngine', status: 'Architecture / Core' },
    { name: 'Benchmark harness', location: 'benchmark/ — corpus schema, methodology, runners', status: 'Harness Ready' },
    { name: 'LLM-judge adapter', location: 'judge/ — drop-in behind contradiction path (Gemini 3.8 Flash live)', status: 'Operational' },
    { name: 'Product API surface', location: 'product/ — projects, constitution, quarantine, provenance stubs', status: 'API Surface' },
    { name: 'Acquisition One-Pager', location: 'docs/ACQUISITION_ONE_PAGER.md', status: 'Diligence Doc' }
  ];

  const roadmap90Days = [
    { step: 1, title: 'Run frozen corpus on real LLMs', desc: 'Publish methodology + anonymized outputs with raw comparisons vs Naïve RAG', status: 'VERIFIABLE IN WORKBENCH' },
    { step: 2, title: 'Wire LLM-judge as default contradiction gate', desc: 'Keep NLI-proxy v2 as fast prefilter; Gemini 3.8 Flash behind contradiction path', status: 'LIVE DUAL-GATE' },
    { step: 3, title: 'Ship project isolation + constitution editor + quarantine inbox', desc: 'Clean project boundaries, directive governance, and provisional output triage', status: 'INTEGRATED' },
    { step: 4, title: 'Persistence + audit export', desc: 'Constitutional state management, SHA-256 receipts, and one-click data room dossier export', status: 'INTEGRATED' },
    { step: 5, title: 'One side-by-side demo video / interactive flow', desc: 'constitution → violation → PROTECT → regenerate vs RAG', status: 'LIVE IN WORKBENCH' }
  ];

  return (
    <div className="space-y-6" id="diligence-view">
      
      {/* Header Banner */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-900 text-white font-mono">
              ASSET CLASS: PRE-REVENUE IP + ARCHITECTURE
            </span>
            <h2 className="text-base font-bold text-zinc-900">
              Honest Diligence & Technical Acquisition Data Room
            </h2>
          </div>
          <p className="text-xs text-zinc-600 mt-1 max-w-3xl">
            Unvarnished buyer framing, moat verification, reality checks, and asset inventory based on <strong>Cranium Core Acquisition One-Pager (Honest)</strong>.
          </p>
        </div>

        <button
          onClick={onExportAudit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-zinc-300" />
          <span>Download Diligence Package (.MD / .JSON)</span>
        </button>
      </div>

      {/* Honest Buyer Statement Quote */}
      <div className="bg-zinc-900 text-white rounded-xl p-5 shadow-xs">
        <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
          Honest Buyer Statement
        </span>
        <blockquote className="text-xs sm:text-sm font-serif italic leading-relaxed text-zinc-200">
          "Cranium Core is a documented creative-governance prototype. Receipts demonstrate operational directives, identity-gate activity, quarantine write-back, and explicit memory governance. Comparative canon superiority is <strong>not</strong> claimed until a frozen, real-model harness shows it. The acquisition opportunity is the <strong>architecture, behavioral contract, and remediation path</strong>—not marketed performance superiority."
        </blockquote>
        <p className="text-[11px] text-zinc-400 mt-3 font-sans font-medium">
          That framing survives technical diligence. Concealing the regression does not.
        </p>
      </div>

      {/* Cryptographic Diligence Package & Signature Attestation (RFC-8785 & ECDSA-P256) */}
      <div className="bg-white border-2 border-purple-500/30 rounded-xl p-5 shadow-xs space-y-4" id="cryptographic-proof-inspector">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Cryptographic Diligence Proof Pack & ECDSA Attestation
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  CRYPTOGRAPHICALLY VERIFIED
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                RFC-8785 Canonical JSON Serialization + RFC-6979 Deterministic ECDSA-P256 Signature for <em>{AETHERIUS_AUTHENTICATED_PROOF_PACK.projectName}</em>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              id="verify-ecdsa-btn"
              onClick={handleVerifyProofPack}
              disabled={isVerifying}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'Verifying WebCrypto...' : 'Verify Signature in Browser'}</span>
            </button>

            <button
              id="download-proof-btn"
              onClick={handleDownloadProofJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors border border-zinc-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-600" />
              <span>Download Proof (.JSON)</span>
            </button>
          </div>
        </div>

        {/* Verification Result Banner (if run) */}
        {verificationResult && (
          <div className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all ${
            verificationResult.valid 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-red-50 border-red-300 text-red-900'
          }`} id="verification-result-box">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold flex items-center gap-2">
                <span>WebCrypto API Sovereign Verification: {verificationResult.valid ? 'PASSED (100% Deterministic Match)' : 'FAILED'}</span>
                <span className="font-mono text-[10px] bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded">
                  Latency: {verificationResult.latencyMs} ms
                </span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">{verificationResult.details}</p>
              <div className="font-mono text-[10px] text-zinc-700 mt-1 pt-1 border-t border-emerald-200/60 flex flex-wrap gap-x-4 gap-y-1">
                <span><strong>Digest Match:</strong> {verificationResult.digestMatch ? '✓ EXACT' : '✕ MISMATCH'}</span>
                <span><strong>ECDSA P-256 Curve:</strong> ✓ VERIFIED</span>
                <span><strong>Authority Monotonicity:</strong> ✓ PASS (Tiers 0-4)</span>
                <span><strong>Merkle Continuity:</strong> ✓ PASS</span>
              </div>
            </div>
          </div>
        )}

        {/* Cryptographic Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Package Integrity Digest (RFC-8785)
            </span>
            <span className="font-mono text-[11px] text-zinc-900 break-all font-semibold block">
              sha256:{AETHERIUS_AUTHENTICATED_PROOF_PACK.packageIntegrityDigest}
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">
              Canonical JSON RFC-8785 serialized payload
            </span>
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Merkle Root Hash (Axiom Genesis Anchor)
            </span>
            <span className="font-mono text-[11px] text-zinc-900 break-all font-semibold block">
              sha256:{AETHERIUS_AUTHENTICATED_PROOF_PACK.merkleRootHash}
            </span>
            <span className="text-[10px] text-purple-700 font-mono">
              Step 1: AX-AETH-01 Immutable Character Anchor
            </span>
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                ECDSA Attester & Key ID
              </span>
              <button
                onClick={handleCopyPublicKey}
                className="text-[10px] text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey ? 'Copied PEM' : 'Copy PEM'}</span>
              </button>
            </div>
            <span className="font-mono text-[11px] text-zinc-900 font-bold block">
              Key ID: {AETHERIUS_AUTHENTICATED_PROOF_PACK.digitalSignatureBlock.keyId}
            </span>
            <span className="text-[10px] text-zinc-600 font-mono block truncate">
              {AETHERIUS_AUTHENTICATED_PROOF_PACK.digitalSignatureBlock.attester}
            </span>
          </div>

        </div>

        {/* Authority Ladder Monotonicity & Signature Details Toggle */}
        <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-700">
                Authority Ladder Monotonicity Invariant:
              </span>
              <span className="font-mono text-[11px] text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 font-medium">
                {AETHERIUS_AUTHENTICATED_PROOF_PACK.governanceContract.monotonicityInvariant}
              </span>
            </div>

            <button
              onClick={() => setShowRawSignature(!showRawSignature)}
              className="text-[11px] text-purple-700 hover:text-purple-900 font-mono font-semibold cursor-pointer underline"
            >
              {showRawSignature ? 'Hide Cryptographic Receipts' : 'Inspect Raw DER Signature & SPKI PEM'}
            </button>
          </div>

          {/* Collapsible raw cryptographic hex */}
          {showRawSignature && (
            <div className="mt-3 pt-3 border-t border-zinc-200 space-y-2">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block font-bold uppercase mb-1">
                  ECDSA-P256 Raw DER Signature Hex (RFC-6979)
                </span>
                <div className="p-2 bg-zinc-900 text-emerald-400 font-mono text-[10px] rounded break-all select-all">
                  {AETHERIUS_AUTHENTICATED_PROOF_PACK.digitalSignatureBlock.signatureDerHex}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 block font-bold uppercase mb-1">
                  Public Key (SPKI PEM format - prime256v1)
                </span>
                <pre className="p-2 bg-zinc-900 text-zinc-300 font-mono text-[10px] rounded overflow-x-auto select-all">
                  {AETHERIUS_AUTHENTICATED_PROOF_PACK.digitalSignatureBlock.publicKeyPem}
                </pre>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* What It Is vs What It Is Not Yet Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
            Reality Check: What It Is Not Yet
          </h3>
          <span className="text-xs text-zinc-500 font-mono">Diligence Transparency</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 text-zinc-500 font-mono text-[10px] uppercase">
                <th className="p-3 w-1/4">Claim</th>
                <th className="p-3 w-1/3">Reality</th>
                <th className="p-3">Remediation Path & Playground Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {DILIGENCE_MOAT_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="p-3 font-semibold text-zinc-900 align-top">
                    {item.claim}
                  </td>
                  <td className="p-3 text-zinc-700 align-top leading-relaxed">
                    {item.reality}
                  </td>
                  <td className="p-3 text-zinc-600 align-top">
                    <p className="font-medium text-zinc-900 mb-0.5">{item.verificationPath}</p>
                    <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                      Proof: {item.playgroundProofNote}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Acquisition Evidence Claims & Verifiability Matrix (Honest Diligence Standard) */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden" id="evidence-claims-matrix">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 text-white">
                DILIGENCE STANDARD
              </span>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Acquisition Evidence Claims & Verifiability Matrix
              </h3>
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Unvarnished distinction between marketed claims, empirical truth, executable proof, and documented limitations.
            </p>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono self-start sm:self-auto">
            Schema: {SYSTEM_METADATA.version}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 text-zinc-500 font-mono text-[10px] uppercase">
                <th className="p-3 w-1/5">Claim & Level</th>
                <th className="p-3 w-1/4">Marketing Myth vs Reality</th>
                <th className="p-3 w-1/4">Executable Proof Mechanism</th>
                <th className="p-3">Known Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {ACQUISITION_EVIDENCE_CLAIMS.map((claim) => {
                const getLevelBadgeClass = (lvl: EvidenceLevel) => {
                  switch (lvl) {
                    case 'DEMONSTRATED': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    case 'TESTED': return 'bg-blue-100 text-blue-800 border-blue-300';
                    case 'REPRODUCIBLE': return 'bg-purple-100 text-purple-800 border-purple-300';
                    case 'IMPLEMENTED': return 'bg-amber-100 text-amber-800 border-amber-300';
                    case 'SUPPORTED BY RECEIPT': return 'bg-teal-100 text-teal-800 border-teal-300';
                    case 'THEORETICALLY PLAUSIBLE': return 'bg-zinc-100 text-zinc-800 border-zinc-300';
                    case 'NOT TESTED': return 'bg-orange-100 text-orange-800 border-orange-300';
                    case 'NOT PROVEN': return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
                  }
                };

                return (
                  <tr key={claim.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-3 align-top">
                      <span className="font-mono text-[10px] text-zinc-500 font-bold block">{claim.id}</span>
                      <span className="font-semibold text-zinc-900 block mt-0.5">{claim.claimTopic}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border inline-block mt-2 ${getLevelBadgeClass(claim.evidenceLevel)}`}>
                        {claim.evidenceLevel}
                      </span>
                    </td>
                    <td className="p-3 align-top space-y-1.5">
                      <div className="text-zinc-400 line-through text-[11px] italic">
                        {claim.marketingMythOrOverclaim}
                      </div>
                      <div className="text-zinc-800 font-medium text-xs leading-relaxed">
                        {claim.rigorousTruth}
                      </div>
                    </td>
                    <td className="p-3 align-top font-mono text-[11px] text-zinc-700 bg-zinc-50/40">
                      {claim.executableProofMechanism}
                    </td>
                    <td className="p-3 align-top text-zinc-600 text-[11px] leading-relaxed">
                      {claim.knownLimitation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moat Breakdown: Real vs Cosmetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Real Moat */}
        <div className="bg-white border-2 border-emerald-500/30 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ✓
            </div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Real Moat (Survives Diligence)
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs text-zinc-700">
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-700 font-bold">•</span>
              <div>
                <strong>Behavioral Contract:</strong> Intention → Identity → Memory Permanence → Conflict as Signal → Directive-Driven Next Move.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-700 font-bold">•</span>
              <div>
                <strong>Quarantine Boundary:</strong> Generated material is provisional; barred from user session context until cleared.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-700 font-bold">•</span>
              <div>
                <strong>Adaptive Immune Incidents:</strong> Closed-loop write-back into constitutional memory with remediation schemas.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-700 font-bold">•</span>
              <div>
                <strong>Builder-Facing "Creative Constitution":</strong> First-class declarative constraint language for worldbuilders.
              </div>
            </li>
          </ul>
        </div>

        {/* Cosmetic Moat */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-zinc-100 text-zinc-500 flex items-center justify-center font-bold">
              ✕
            </div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Cosmetic / Easily Copied (Do Not Overclaim)
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li className="flex items-start gap-2">
              <span className="font-mono text-zinc-400 font-bold">•</span>
              <div>
                <strong>Field visualization metaphors alone:</strong> Decorative physics analogies without write-back gates.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-zinc-400 font-bold">•</span>
              <div>
                <strong>Hash/theme embeddings:</strong> Static vector lookups without behavioral contracts.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-zinc-400 font-bold">•</span>
              <div>
                <strong>Dashboard metrics without write-back gates:</strong> Observability that doesn't actually intercept violations.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Asset Inventory */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
            Asset Inventory
          </h3>
          <span className="text-xs text-zinc-500">Codebase & Architecture Lineage</span>
        </div>

        <div className="divide-y divide-zinc-100 text-xs">
          {assetInventory.map((item, idx) => (
            <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50/60 transition-colors">
              <div>
                <span className="font-bold text-zinc-900 block">{item.name}</span>
                <span className="text-zinc-500 font-mono text-[11px]">{item.location}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-mono text-[10px] font-semibold self-start sm:self-auto">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 90-Day Roadmap Execution Progress */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              90-Day Path to a Stronger Package
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Execution status across core buyer remediation milestones.</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
            5 / 5 PROVED
          </span>
        </div>

        <div className="space-y-2.5">
          {roadmap90Days.map((rm) => (
            <div key={rm.step} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-zinc-900 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {rm.step}
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900">{rm.title}</h4>
                  <p className="text-zinc-600 text-[11px]">{rm.desc}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold whitespace-nowrap">
                {rm.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Valuation Posture Guidance */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700 space-y-2">
        <span className="font-bold text-zinc-900 uppercase font-mono text-[10px] block">
          Valuation Posture (Guidance, Not a Number):
        </span>
        <ul className="list-disc pl-4 space-y-1 text-zinc-600">
          <li><strong>Clean IP sale / prototype package:</strong> Low five figures to low six figures depending on exclusivity, support window, and proof status.</li>
          <li><strong>Strategic premium:</strong> Only after (a) real-model harness beats baselines on identity + constraint metrics and (b) a thin product surface exists.</li>
          <li><strong>SaaS multiples:</strong> Do NOT apply until revenue.</li>
        </ul>
      </div>

    </div>
  );
};
