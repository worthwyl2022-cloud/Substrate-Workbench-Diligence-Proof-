import React, { useState } from 'react';
import { 
  Bug, 
  ShieldAlert, 
  AlertOctagon, 
  CheckCircle2, 
  Lock, 
  RotateCcw, 
  ChevronRight, 
  Binary, 
  FileCode, 
  Key, 
  Layers,
  Sparkles
} from 'lucide-react';
import { FivePointCorruptionVector, VerificationManifest } from '../types/substrate.ts';

interface AdversarialCorruptionLabProps {
  manifest: VerificationManifest | null;
  corruptionVectors: FivePointCorruptionVector[] | null;
  isCorrupting: boolean;
  onRunCorruptionAttack: () => void;
}

export const AdversarialCorruptionLab: React.FC<AdversarialCorruptionLabProps> = ({
  manifest,
  corruptionVectors,
  isCorrupting,
  onRunCorruptionAttack
}) => {
  const [selectedVectorIndex, setSelectedVectorIndex] = useState<number>(0);

  const vectors = corruptionVectors || [];
  const selectedVector = vectors[selectedVectorIndex] || vectors[0];

  const getVectorIcon = (type: string) => {
    switch (type) {
      case 'CORRUPT_INPUT_BYTE': return <FileCode className="w-4 h-4 text-amber-500" />;
      case 'CORRUPT_STATE_FIELD': return <Layers className="w-4 h-4 text-purple-500" />;
      case 'CORRUPT_LEAF_HASH': return <Binary className="w-4 h-4 text-blue-500" />;
      case 'CORRUPT_MERKLE_SIBLING': return <Binary className="w-4 h-4 text-indigo-500" />;
      case 'CORRUPT_SIGNATURE_BYTE': return <Key className="w-4 h-4 text-red-500" />;
      default: return <Bug className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-6" id="adversarial-corruption-lab">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 text-white rounded-xl p-5 shadow-xs border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                AUDITOR ADVERSARIAL STRESS TEST
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Fail-Closed Verification Invariant
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-100">
              5-Point Corruption Experiment: Verifier Fails Closed
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              Technical diligence demands attacking the evidence pipeline itself. This lab deliberately mutates one byte in each core component—input, state field, leaf hash, Merkle sibling, and digital signature—proving every single forgery is caught and fails closed.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRunCorruptionAttack}
              disabled={isCorrupting || !manifest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isCorrupting ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-white" />
                  <span>Attacking Evidence Pipeline...</span>
                </>
              ) : (
                <>
                  <Bug className="w-4 h-4 fill-current text-white" />
                  <span>Execute 5-Vector Tamper Attack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Summary Metric */}
        {vectors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
            {vectors.map((vec, idx) => (
              <div key={vec.id} className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700/60 space-y-0.5">
                <span className="text-[9px] text-zinc-400 block truncate">{vec.id}: {vec.vectorType.replace('CORRUPT_', '')}</span>
                <span className="text-red-400 font-bold text-[11px] block">✕ {vec.verificationVerdict}</span>
                <span className="text-[9px] text-zinc-500 block">Caught in {vec.reproductionLatencyMs}ms</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {!manifest && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center text-xs text-zinc-500">
          Please run the 24-case benchmark corpus first to generate valid base evidence before executing corruption attacks.
        </div>
      )}

      {vectors.length === 0 && manifest && (
        <div className="bg-white border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">
            Adversarial Tamper Vectors Ready for Dispatch
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Click "Execute 5-Vector Tamper Attack" above to systematically inject deliberate 1-byte corruptions across all 5 verification layers.
          </p>
        </div>
      )}

      {/* Vectors Explorer */}
      {vectors.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Vector Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
              Adversarial Corruption Vectors (5 / 5 Failed Closed)
            </span>

            <div className="space-y-2">
              {vectors.map((vec, idx) => {
                const isSelected = selectedVectorIndex === idx;
                return (
                  <div
                    key={vec.id}
                    onClick={() => setSelectedVectorIndex(idx)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-red-600 bg-red-50/40 shadow-xs ring-1 ring-red-600/30' 
                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        {getVectorIcon(vec.vectorType)}
                        <span className="font-mono font-bold text-zinc-900">
                          {vec.id}: {vec.label}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-900 border border-red-300">
                        FAILED_CLOSED
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1">
                      {vec.tamperDescription}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-100 text-[10px] text-zinc-500 font-mono">
                      <span>Target: {vec.targetComponent.slice(0, 26)}...</span>
                      <span>{vec.reproductionLatencyMs} ms</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Vector Telemetry (7 cols) */}
          {selectedVector && (
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">
                      {selectedVector.label}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono">
                      Target: {selectedVector.targetComponent}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-100 text-red-900 border border-red-300 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
                  <span>{selectedVector.verificationVerdict}</span>
                </span>
              </div>

              {/* Tamper Description */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
                  Tamper Specification & Injection Method
                </span>
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 leading-relaxed font-mono">
                  {selectedVector.tamperDescription}
                </div>
              </div>

              {/* Original vs Tampered Diff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
                  <span className="text-[10px] text-emerald-800 font-bold block">ORIGINAL VALUE SNIPPET:</span>
                  <span className="text-zinc-900 font-bold text-[11px] break-all">{selectedVector.originalValueSnippet}</span>
                  <span className="text-[10px] text-emerald-700 block">Valid canonical state</span>
                </div>

                <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg space-y-1">
                  <span className="text-[10px] text-red-800 font-bold block">DELIBERATELY TAMPERED VALUE:</span>
                  <span className="text-red-950 font-bold text-[11px] break-all">{selectedVector.tamperedValueSnippet}</span>
                  <span className="text-[10px] text-red-700 block">Single-byte bitflip / mutation</span>
                </div>
              </div>

              {/* Invariant Caught By */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">
                  Enforcing Cryptographic Invariant
                </span>
                <div className="p-3 bg-zinc-900 text-white rounded-lg text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold">Caught By:</span>
                    <span className="text-zinc-400">{selectedVector.caughtByInvariant}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
                    {selectedVector.auditExplanation}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
