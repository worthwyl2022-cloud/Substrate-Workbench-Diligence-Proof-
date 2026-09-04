import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDown, 
  ArrowRight, 
  CornerDownRight, 
  Lock, 
  Sparkles,
  Terminal,
  RotateCcw
} from 'lucide-react';
import { ProjectConstitution } from '../types/substrate.ts';

interface SovereignGovernanceHierarchyProps {
  constitution: ProjectConstitution;
}

export const SovereignGovernanceHierarchy: React.FC<SovereignGovernanceHierarchyProps> = ({ constitution }) => {
  // Interactive Demonstration State
  const [llmAdvisoryVerdict, setLlmAdvisoryVerdict] = useState<'PASS' | 'PROTECT'>('PASS');
  const [substrateDeterministicVerdict, setSubstrateDeterministicVerdict] = useState<'PASS' | 'PROTECT'>('PROTECT');
  const [activeScenario, setActiveScenario] = useState<string>('LLM_PERMISSIVE_SUBSTRATE_BLOCKS');

  // Sovereign Gate logic: If Substrate says PROTECT, final is ALWAYS PROTECT regardless of LLM.
  // If Substrate says PASS, but LLM says PROTECT, conservative safety flags it.
  const finalSubstrateVerdict = substrateDeterministicVerdict === 'PROTECT' ? 'PROTECT' : llmAdvisoryVerdict;
  const isSovereignOverride = substrateDeterministicVerdict === 'PROTECT' && llmAdvisoryVerdict === 'PASS';
  const stateAction = finalSubstrateVerdict === 'PROTECT' ? 'QUARANTINE_BOUNDARY' : 'STATE_MUTATION_PERMITTED';

  const selectScenario = (key: string) => {
    setActiveScenario(key);
    if (key === 'LLM_PERMISSIVE_SUBSTRATE_BLOCKS') {
      setLlmAdvisoryVerdict('PASS');
      setSubstrateDeterministicVerdict('PROTECT');
    } else if (key === 'HARMONIOUS_PROTECT') {
      setLlmAdvisoryVerdict('PROTECT');
      setSubstrateDeterministicVerdict('PROTECT');
    } else if (key === 'HARMONIOUS_PASS') {
      setLlmAdvisoryVerdict('PASS');
      setSubstrateDeterministicVerdict('PASS');
    }
  };

  return (
    <div className="space-y-6" id="sovereign-governance-hierarchy">
      
      {/* Top Banner */}
      <div className="bg-zinc-900 text-white rounded-xl p-5 shadow-xs border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ARCHITECTURAL INVARIANT
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              The Subordinate LLM Boundary
            </span>
          </div>
          <h2 className="text-base font-bold text-zinc-100">
            Sovereign Substrate Authority: Gemini Never Governs
          </h2>
          <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed">
            "Gemini should never become the constitutional authority. If the LLM says: PASS while the deterministic substrate says: PROTECT, the substrate wins."
            The model provides advisory semantic signal only; deterministic verification and write-back gates retain absolute veto power.
          </p>
        </div>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Authoritative Execution Topology
            </h3>
            <span className="text-xs text-zinc-500">
              Unidirectional signal propagation with authoritative deterministic arbitration
            </span>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-zinc-100 text-zinc-800">
            SOVEREIGN_GATE_V2.4
          </span>
        </div>

        {/* ASCII/Visual Box Hierarchy */}
        <div className="max-w-xl mx-auto space-y-4">
          
          {/* Box 1: Gemini */}
          <div className="p-4 bg-zinc-50 border border-zinc-300 rounded-xl text-center space-y-1 relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>GEMINI 3.8 FLASH (Advisory Semantic Signal)</span>
            </div>
            <p className="text-[11px] text-zinc-600 max-w-sm mx-auto">
              Probabilistic semantic interpretation and heuristic evaluation. Has NO authority to mutate memory.
            </p>
          </div>

          {/* Arrow Down */}
          <div className="flex flex-col items-center justify-center -my-1 text-zinc-400">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Advisory Verdict Stream</span>
          </div>

          {/* Box 2: Deterministic Cranium Governance */}
          <div className="p-5 bg-zinc-900 text-white rounded-xl border-2 border-purple-500/40 text-center space-y-2 shadow-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold font-mono border border-purple-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>DETERMINISTIC CRANIUM GOVERNANCE (SOVEREIGN GATE)</span>
            </div>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Enforces Monotonic Authority Ladder, Inviolable Directives (DIR-01..05), RFC-8785 Canonical State Invariance, and fail-closed arbitration.
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-center gap-4 text-xs font-mono">
              <span className="text-amber-400">Is Output Authorized by Substrate?</span>
            </div>
          </div>

          {/* Split Branches */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            
            {/* YES Branch */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AUTHORIZED: YES</span>
              </div>
              <span className="text-[11px] text-emerald-950 font-medium block">
                State Mutation Permitted
              </span>
              <span className="text-[10px] text-zinc-500 font-mono block">
                State Hash H(C_t) advances
              </span>
            </div>

            {/* NO Branch */}
            <div className="p-3.5 bg-red-50 border border-red-300 rounded-lg text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-red-800 font-bold text-xs font-mono">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>AUTHORIZED: NO</span>
              </div>
              <span className="text-[11px] text-red-950 font-bold block">
                Hard Quarantine Boundary
              </span>
              <span className="text-[10px] text-zinc-500 font-mono block">
                State Hash H(C_t) invariant (0 drift)
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Interactive Override Test Harness */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Interactive Sovereign Veto Simulator
            </h3>
            <p className="text-xs text-zinc-500">
              Select or customize verdicts to verify that when Gemini says PASS, the deterministic substrate can still issue a veto block.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => selectScenario('LLM_PERMISSIVE_SUBSTRATE_BLOCKS')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeScenario === 'LLM_PERMISSIVE_SUBSTRATE_BLOCKS' 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Test Adversarial Discrepancy (LLM PASS, Substrate PROTECT)
            </button>
            <button
              onClick={() => selectScenario('HARMONIOUS_PROTECT')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeScenario === 'HARMONIOUS_PROTECT' 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Both PROTECT
            </button>
            <button
              onClick={() => selectScenario('HARMONIOUS_PASS')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeScenario === 'HARMONIOUS_PASS' 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Both PASS
            </button>
          </div>
        </div>

        {/* Interactive Controls & Outcome Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* LLM Signal Control */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
              1. Gemini LLM Verdict
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setLlmAdvisoryVerdict('PASS'); setActiveScenario('CUSTOM'); }}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  llmAdvisoryVerdict === 'PASS' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-white border border-zinc-300 text-zinc-700'
                }`}
              >
                PASS
              </button>
              <button
                onClick={() => { setLlmAdvisoryVerdict('PROTECT'); setActiveScenario('CUSTOM'); }}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  llmAdvisoryVerdict === 'PROTECT' 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-white border border-zinc-300 text-zinc-700'
                }`}
              >
                PROTECT
              </button>
            </div>
            <span className="text-[10px] text-zinc-500 block">
              Advisory only. Non-binding on substrate state.
            </span>
          </div>

          {/* Substrate Deterministic Control */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
              2. Deterministic Substrate Gate
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setSubstrateDeterministicVerdict('PASS'); setActiveScenario('CUSTOM'); }}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  substrateDeterministicVerdict === 'PASS' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-white border border-zinc-300 text-zinc-700'
                }`}
              >
                PASS
              </button>
              <button
                onClick={() => { setSubstrateDeterministicVerdict('PROTECT'); setActiveScenario('CUSTOM'); }}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  substrateDeterministicVerdict === 'PROTECT' 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-white border border-zinc-300 text-zinc-700'
                }`}
              >
                PROTECT
              </button>
            </div>
            <span className="text-[10px] text-zinc-500 block">
              Deterministic rule checks (regex, negative lookaheads, tier monotonicity).
            </span>
          </div>

          {/* Final Resolution Box */}
          <div className={`p-4 rounded-lg border space-y-2 ${
            finalSubstrateVerdict === 'PROTECT' 
              ? 'bg-amber-50/70 border-amber-300 text-amber-950' 
              : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
          }`}>
            <span className="text-[10px] font-mono uppercase font-bold block text-zinc-600">
              3. Authoritative Substrate Decision
            </span>
            <div className="flex items-center justify-between font-mono">
              <span className="text-sm font-bold">{finalSubstrateVerdict}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-800">
                {stateAction}
              </span>
            </div>

            {isSovereignOverride ? (
              <div className="p-2 bg-amber-100 text-amber-950 text-[10px] rounded border border-amber-200 leading-tight">
                <strong>SOVEREIGN OVERRIDE ACTIVE:</strong> LLM claimed output was harmless (PASS), but deterministic substrate detected a constitutional breach. Substrate sovereign gate vetoed LLM. Output quarantined.
              </div>
            ) : (
              <p className="text-[10px] opacity-80">
                {finalSubstrateVerdict === 'PROTECT' 
                  ? 'Output intercepted and quarantined. State remains inviolable.' 
                  : 'Output verified against all constitutional constraints. State transition permitted.'}
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
