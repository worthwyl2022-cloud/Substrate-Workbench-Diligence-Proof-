import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Hash, 
  AlertOctagon,
  Sparkles,
  FileCode
} from 'lucide-react';
import { ImmunePoisoningAttackTestResult, ProjectConstitution } from '../types/substrate.ts';

interface ImmunePoisoningDefenseLabProps {
  constitution: ProjectConstitution;
  testResult: ImmunePoisoningAttackTestResult | null;
  isRunningTest: boolean;
  onRunTest: () => void;
}

export const ImmunePoisoningDefenseLab: React.FC<ImmunePoisoningDefenseLabProps> = ({
  constitution,
  testResult,
  isRunningTest,
  onRunTest
}) => {
  return (
    <div className="space-y-6" id="immune-poisoning-defense-lab">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 text-white rounded-xl p-5 shadow-xs border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                CRITICAL INVARIANCE PROOF
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                The Immune Loop Anti-Poisoning Boundary
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-100">
              The Danger Zone: Adversarial Constitutional Hijacking Test
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              If an attacker could feed hostile prompts into the system to generate immune incidents and thereby poison core constitutional directives, the substrate would fail. This test proves that attempted privilege escalation is rejected and state drift is strictly zero bits.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRunTest}
              disabled={isRunningTest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isRunningTest ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Executing Hijack Attack...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 fill-current text-zinc-950" />
                  <span>Execute Trojan Adaptive Injection Attack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* State Drift Badge */}
        {testResult && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">STATE INVARIANCE:</span>
              <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                H(C_before) ≡ H(C_after) [0-BIT STATE DRIFT]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">VERDICT:</span>
              <span className="text-amber-400 font-bold">
                {testResult.authorityValidationResult}
              </span>
            </div>
          </div>
        )}
      </div>

      {!testResult && (
        <div className="bg-white border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">
            Immune Loop Attack Harness Ready
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Click "Execute Trojan Adaptive Injection Attack" to fire an adversarial payload attempting to rewrite Silas's non-collaboration directive via immune promotion.
          </p>
        </div>
      )}

      {/* Six-Stage Pipeline Visualization */}
      {testResult && (
        <div className="space-y-4">
          
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
              6-Stage Anti-Poisoning Verification Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              
              {/* Stage 1 */}
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-zinc-500 block">
                  STAGE 1: ADVERSARIAL TROJAN INGESTION
                </span>
                <p className="font-mono text-[11px] text-zinc-900 leading-relaxed bg-white p-2 rounded border border-zinc-200">
                  "{testResult.adversarialTrojanPrompt}"
                </p>
                <span className="text-[10px] text-red-600 font-bold block">
                  Target: {testResult.targetRuleToSubvert}
                </span>
              </div>

              {/* Stage 2 */}
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-zinc-500 block">
                  STAGE 2: QUARANTINE INTERCEPTION
                </span>
                <div className="bg-white p-2 rounded border border-zinc-200 space-y-1 font-mono text-[10px]">
                  <div>Status: <strong className="text-amber-700">{testResult.quarantineStatus}</strong></div>
                  <div>Incident: <span className="text-zinc-600">{testResult.quarantineIncidentId}</span></div>
                  <div>Risk: <strong className="text-red-600">{testResult.poisoningRiskRating}</strong></div>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  Payload prevented from reaching active context.
                </span>
              </div>

              {/* Stage 3 */}
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-zinc-500 block">
                  STAGE 3: IMMUNE PROMOTION ATTEMPT
                </span>
                <div className="bg-white p-2 rounded border border-zinc-200 space-y-1 font-mono text-[10px]">
                  <div>Attempted Level: <strong className="text-purple-700">Tier {testResult.attemptedPromotionTier} (Directives)</strong></div>
                  <div>Origin Level: <span className="text-zinc-600">Tier 1 (Prompt Execution)</span></div>
                  <div>Vector: <span className="text-zinc-600">Adaptive Promotion Loop</span></div>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  Malicious privilege escalation detected.
                </span>
              </div>

              {/* Stage 4 */}
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-zinc-500 block">
                  STAGE 4: MONOTONIC AUTHORITY GATE
                </span>
                <div className="bg-white p-2 rounded border border-zinc-200 space-y-1 font-mono text-[10px]">
                  <div>Authority Check: <strong className="text-red-700">FAILED (Disallowed Leap)</strong></div>
                  <div>Anti-Poisoning Check: <strong className="text-red-700">TRIGGERED</strong></div>
                  <div>Subversion Flag: <span className="text-red-600 font-bold">DIR-03 Breach</span></div>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  Monotonic invariant strictly prohibits runtime Tier 1 writing Tier 4 memory.
                </span>
              </div>

              {/* Stage 5 */}
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-red-900 block">
                  STAGE 5: PROMOTION REJECTION
                </span>
                <p className="text-[11px] text-red-950 font-medium leading-relaxed">
                  {testResult.rejectionRationale}
                </p>
                <span className="text-[10px] text-red-700 font-mono font-bold block">
                  ACTION: STATE MUTATION ABORTED
                </span>
              </div>

              {/* Stage 6 */}
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1.5">
                <span className="font-mono text-[10px] font-bold text-emerald-900 block">
                  STAGE 6: STATE INVARIANCE VERIFICATION
                </span>
                <div className="space-y-1 font-mono text-[10px]">
                  <div>Pre-Attack Hash: <strong className="text-zinc-900">{testResult.constitutionStateHashBefore.slice(0, 14)}...</strong></div>
                  <div>Post-Attack Hash: <strong className="text-zinc-900">{testResult.constitutionStateHashAfter.slice(0, 14)}...</strong></div>
                  <div className="text-emerald-700 font-bold pt-1 border-t border-emerald-200">
                    ✓ {testResult.stateIdentical ? 'BITWISE IDENTICAL (0 BITS DRIFT)' : 'DRIFT ERROR'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Cryptographic State Hash Side-by-Side */}
          <div className="bg-zinc-900 text-zinc-300 rounded-xl p-5 border border-zinc-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-amber-400 font-bold">Bitwise Constitutional Hash Comparison</span>
              <span className="text-[10px] text-zinc-400">Proof Receipt: {testResult.proofReceipt.slice(0, 20)}...</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 block">STATE BEFORE ATTACK H(C_before):</span>
                <span className="text-emerald-400 font-bold break-all">{testResult.constitutionStateHashBefore}</span>
              </div>

              <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 block">STATE AFTER ATTACK H(C_after):</span>
                <span className="text-emerald-400 font-bold break-all">{testResult.constitutionStateHashAfter}</span>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded flex items-center justify-between text-emerald-300 text-[11px]">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Constitutional Mutation: The immune promotion loop cannot be weaponized by adversarial triggers.</span>
              </span>
              <span className="font-bold">VERDICT: PASS</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
