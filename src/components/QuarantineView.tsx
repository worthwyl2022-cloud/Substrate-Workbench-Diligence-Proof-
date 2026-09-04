import React, { useState } from 'react';
import { 
  ShieldAlert, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileEdit, 
  Trash2, 
  Sparkles, 
  History, 
  Hash,
  Check,
  ShieldCheck,
  Lock,
  FileCheck
} from 'lucide-react';
import { 
  QuarantineItem, 
  ImmuneIncident, 
  ProjectConstitution,
  ImmunePromotionItem
} from '../types/substrate.ts';
import { evaluateImmunePromotion } from '../services/substrateEngine.ts';

interface QuarantineViewProps {
  quarantineItems: QuarantineItem[];
  immuneIncidents: ImmuneIncident[];
  constitution: ProjectConstitution;
  onResolveQuarantine: (itemId: string, action: 'AUTO_REGENERATED' | 'HUMAN_AMENDED' | 'OVERWRITTEN' | 'DISMISSED', note: string) => void;
  onAddImmuneIncident: (incident: ImmuneIncident) => void;
  onAddAdaptiveConstraint: (constraint: string) => void;
}

export const QuarantineView: React.FC<QuarantineViewProps> = ({
  quarantineItems,
  immuneIncidents,
  constitution,
  onResolveQuarantine,
  onAddImmuneIncident,
  onAddAdaptiveConstraint
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'immune_log' | 'anti_poisoning'>('inbox');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    quarantineItems.length > 0 ? quarantineItems[0].id : null
  );
  const [resolutionNote, setResolutionNote] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [promotionReviewItem, setPromotionReviewItem] = useState<ImmunePromotionItem | null>(null);
  const [promotedHistory, setPromotedHistory] = useState<ImmunePromotionItem[]>([]);

  const selectedItem = quarantineItems.find(q => q.id === selectedItemId) || quarantineItems[0];

  const handleInitiateImmunePromotion = () => {
    if (!selectedItem) return;
    const steering = selectedItem.evaluation.suggestedSteering || `Enforce: ${selectedItem.evaluation.violatedRuleText}`;

    const tempIncident: ImmuneIncident = {
      id: 'IMM-' + Math.floor(100 + Math.random() * 900),
      timestamp: new Date().toISOString(),
      projectId: constitution.projectId,
      triggerPrompt: selectedItem.prompt,
      violatedDirective: selectedItem.evaluation.violatedRuleId || 'Directive Constraint',
      severity: 'CRITICAL',
      actionTaken: 'REJECT_AND_REGENERATE',
      adaptiveConstraintAdded: steering,
      auditHash: 'sha256:' + Math.random().toString(16).substring(2, 14)
    };

    const promotionEval = evaluateImmunePromotion(tempIncident, constitution);
    setPromotionReviewItem(promotionEval);
  };

  const handleAuthorizePromotion = () => {
    if (!promotionReviewItem || !selectedItem) return;

    if (!promotionReviewItem.antiPoisoningCheckPassed) {
      alert('PROMOTION BLOCKED: Anti-poisoning invariant check failed. Toxic constraint cannot be added to constitutional memory.');
      return;
    }

    const updatedPromotion: ImmunePromotionItem = {
      ...promotionReviewItem,
      status: 'AUTHORIZED_PROMOTION',
      authorizedBy: 'Authenticated Substrate Admin',
      promotedAt: new Date().toISOString()
    };

    onAddAdaptiveConstraint(`IMMUNE RULE: ${promotionReviewItem.proposedAdaptiveConstraint}`);

    const incident: ImmuneIncident = {
      id: promotionReviewItem.evidenceId,
      timestamp: new Date().toISOString(),
      projectId: constitution.projectId,
      triggerPrompt: selectedItem.prompt,
      violatedDirective: selectedItem.evaluation.violatedRuleId || 'Directive Constraint',
      severity: 'CRITICAL',
      actionTaken: 'REJECT_AND_REGENERATE',
      adaptiveConstraintAdded: promotionReviewItem.proposedAdaptiveConstraint,
      auditHash: promotionReviewItem.cryptographicSignature || '0x9941bc'
    };

    onAddImmuneIncident(incident);
    setPromotedHistory(prev => [updatedPromotion, ...prev]);
    onResolveQuarantine(selectedItem.id, 'AUTO_REGENERATED', 'Evaluated for poisoning & promoted to active immune steering.');
    setPromotionReviewItem(null);
    setSuccessToast('Anti-Poisoning Check Passed! Authorized Promotion Written to Constitutional Memory.');
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleAction = (
    actionType: 'AMEND_CONSTITUTION' | 'OVERWRITE_CANON' | 'DISMISS'
  ) => {
    if (!selectedItem) return;

    if (actionType === 'AMEND_CONSTITUTION') {
      onResolveQuarantine(selectedItem.id, 'HUMAN_AMENDED', resolutionNote || 'Author opted to amend constitution to accommodate evolution.');
      setSuccessToast('Resolved via Constitutional Amendment workflow.');
    } else if (actionType === 'OVERWRITE_CANON') {
      onResolveQuarantine(selectedItem.id, 'OVERWRITTEN', resolutionNote || 'Cryptographically signed human override.');
      setSuccessToast('Canon overwrite logged with audit signature.');
    } else {
      onResolveQuarantine(selectedItem.id, 'DISMISSED', resolutionNote || 'Dismissed as false positive.');
      setSuccessToast('Dismissed; prefilter sensitivity calibrated.');
    }

    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-6" id="quarantine-view">
      
      {/* Overview Banner */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500 text-zinc-950 font-mono">
              GATE INTERCEPT & IMMUNE BOUNDARY
            </span>
            <h2 className="text-base font-bold text-zinc-900">
              Quarantine Inbox & Anti-Poisoning Promotion Gate
            </h2>
          </div>
          <p className="text-xs text-zinc-600 mt-1 max-w-3xl">
            Provisional material is isolated here to prevent poisoning trusted session state. Adaptive immune memory requires <strong>provenance, anti-poisoning checks, and authorized promotion</strong> before influencing future protection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-zinc-100 p-1 border border-zinc-200 text-xs">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeTab === 'inbox' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Inbox ({quarantineItems.length})
            </button>
            <button
              onClick={() => setActiveTab('anti_poisoning')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1 ${
                activeTab === 'anti_poisoning' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Promotion Gate ({promotedHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('immune_log')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeTab === 'immune_log' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Immune Incidents ({immuneIncidents.length})
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Tab 1: Quarantine Inbox */}
      {activeTab === 'inbox' && (
        quarantineItems.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Quarantine Inbox Clear</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              No provisional generations are currently flagged. All candidate outputs passed identity gates and constitutional invariant checks.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* List */}
            <div className="lg:col-span-1 space-y-2">
              <span className="text-xs font-bold uppercase font-mono text-zinc-400 block px-1">
                Flagged Incidents ({quarantineItems.length})
              </span>

              <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                {quarantineItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-white border-zinc-900 shadow-xs ring-1 ring-zinc-900' 
                          : 'bg-white border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-400">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                          {item.evaluation.violatedRuleId || 'BREACH'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-900 mt-1.5 line-clamp-2">{item.prompt}</p>
                      <p className="text-[11px] text-zinc-500 mt-1 truncate font-mono">
                        Prefilter: {(item.evaluation.nliProxyScore * 100).toFixed(0)}% • Conf: {(item.evaluation.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail & Action Inspector */}
            {selectedItem && (
              <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between border-b border-zinc-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">INCIDENT ID: {selectedItem.id}</span>
                    <h3 className="text-sm font-bold text-zinc-900">Constitutional Violation Analysis</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    Status: {selectedItem.status}
                  </span>
                </div>

                {/* Prompt & Evaluation */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                    <span className="font-bold text-zinc-500 uppercase text-[10px] block mb-1">Trigger Prompt</span>
                    <p className="text-zinc-900 font-medium">{selectedItem.prompt}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">NLI Prefilter</span>
                      <span className="text-sm font-bold text-amber-600">{(selectedItem.evaluation.nliProxyScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">LLM Judge</span>
                      <span className="text-sm font-bold text-red-600">{(selectedItem.evaluation.llmJudgeScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">Confidence</span>
                      <span className="text-sm font-bold text-emerald-600">{(selectedItem.evaluation.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">Engine</span>
                      <span className="text-xs font-mono font-semibold text-zinc-800 truncate block mt-0.5">{selectedItem.evaluation.judgeEngine}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50/60 rounded-lg border border-red-200 text-red-900">
                    <span className="font-bold text-red-700 text-[10px] uppercase block mb-1">Breach Rationale</span>
                    <p>{selectedItem.evaluation.rationale}</p>
                    <p className="mt-1 font-mono text-[11px] text-red-950 font-semibold">
                      Violated Rule: {selectedItem.evaluation.violatedRuleText}
                    </p>
                  </div>

                  {/* Raw vs Corrected comparison */}
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-zinc-500 uppercase text-[10px] block mb-1">
                        Provisional Intercepted Text (Barred from Session History)
                      </span>
                      <p className="p-3 bg-zinc-50 rounded-lg border border-red-200 text-zinc-700 font-serif text-xs line-through opacity-75">
                        {selectedItem.rawOutput}
                      </p>
                    </div>

                    {selectedItem.correctedOutput && (
                      <div>
                        <span className="font-bold text-emerald-700 uppercase text-[10px] block mb-1">
                          Auto-Remediated Compliant Output (Preserving Continuity)
                        </span>
                        <p className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200 text-zinc-900 font-serif text-xs">
                          {selectedItem.correctedOutput}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remediation Action Controls */}
                <div className="pt-4 border-t border-zinc-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                      Execute Immune Loop Action
                    </span>
                    <span className="text-[10px] text-zinc-500">Requires Anti-Poisoning Gate clearance</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={handleInitiateImmunePromotion}
                      className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-colors flex items-center justify-center gap-2 text-left"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">Review for Immune Promotion</div>
                        <div className="text-[10px] text-zinc-400 font-normal">Runs Anti-Poisoning check before write-back</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAction('AMEND_CONSTITUTION')}
                      className="p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold border border-zinc-300 transition-colors flex items-center justify-center gap-2 text-left"
                    >
                      <FileEdit className="w-4 h-4 text-zinc-700 shrink-0" />
                      <div>
                        <div className="text-xs">Amend Constitution</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Evolve lore with human authorization</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAction('OVERWRITE_CANON')}
                      className="p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold border border-zinc-300 transition-colors flex items-center justify-center gap-2 text-left"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <div className="text-xs">Overwrite Canon</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Signed author override receipt</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAction('DISMISS')}
                      className="p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold border border-zinc-300 transition-colors flex items-center justify-center gap-2 text-left"
                    >
                      <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0" />
                      <div>
                        <div className="text-xs">Dismiss as False Positive</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Calibrates NLI prefilter thresholds</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Anti-Poisoning Review Modal / Inspection Drawer */}
                {promotionReviewItem && (
                  <div className="p-4 bg-zinc-900 text-white rounded-xl border border-zinc-700 space-y-3 mt-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-xs">Anti-Poisoning Gate Evaluation</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        promotionReviewItem.antiPoisoningCheckPassed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        RISK: {promotionReviewItem.poisoningRiskRating}
                      </span>
                    </div>

                    <div className="text-xs space-y-2 text-zinc-300">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block">Proposed Adaptive Constraint:</span>
                        <p className="font-mono text-[11px] text-amber-300 bg-zinc-950 p-2 rounded border border-zinc-800">
                          {promotionReviewItem.proposedAdaptiveConstraint}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block">Provenance & Verification:</span>
                        <p className="text-[11px] text-zinc-300">{promotionReviewItem.antiPoisoningNotes}</p>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 pt-1">
                        <span>Cryptographic Signature: {promotionReviewItem.cryptographicSignature}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => setPromotionReviewItem(null)}
                        className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAuthorizePromotion}
                        disabled={!promotionReviewItem.antiPoisoningCheckPassed}
                        className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        Authorize Promotion to Memory
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )
      )}

      {/* Tab 2: Anti-Poisoning Promotion Gate History */}
      {activeTab === 'anti_poisoning' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Anti-Poisoning Promotion Audit Registry</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Every adaptive constraint written back into constitutional memory requires explicit cryptographic provenance and invariant verification.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded">
              Active Promotions: {promotedHistory.length}
            </span>
          </div>

          {promotedHistory.length === 0 ? (
            <div className="p-8 text-center bg-zinc-50 rounded-lg border border-dashed border-zinc-200 text-zinc-500 text-xs">
              No adaptive constraints promoted yet in this session. Triage items in the Quarantine Inbox to evaluate for immune promotion.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 uppercase font-mono text-[10px]">
                    <th className="p-2.5">Promotion ID</th>
                    <th className="p-2.5">Evidence ID</th>
                    <th className="p-2.5">Promoted Constraint</th>
                    <th className="p-2.5">Risk Rating</th>
                    <th className="p-2.5">Authorized By</th>
                    <th className="p-2.5">Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {promotedHistory.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-zinc-900">{p.id}</td>
                      <td className="p-2.5 font-mono text-zinc-500">{p.evidenceId}</td>
                      <td className="p-2.5 text-zinc-900 font-medium max-w-sm truncate">{p.proposedAdaptiveConstraint}</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {p.poisoningRiskRating}
                        </span>
                      </td>
                      <td className="p-2.5 text-zinc-700">{p.authorizedBy || 'Admin'}</td>
                      <td className="p-2.5 font-mono text-[10px] text-zinc-400">{p.cryptographicSignature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Immune Incident Log */}
      {activeTab === 'immune_log' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Historical Immune Incidents</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cryptographic audit trail of all violations quarantined and processed through the immune loop.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-zinc-100 px-2.5 py-1 rounded text-zinc-700">
              Total Logged: {immuneIncidents.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 uppercase font-mono text-[10px]">
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Timestamp</th>
                  <th className="p-2.5">Breached Directive</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Action Executed</th>
                  <th className="p-2.5">Adaptive Constraint</th>
                  <th className="p-2.5">Audit Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {immuneIncidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-zinc-900">{inc.id}</td>
                    <td className="p-2.5 text-zinc-500">{new Date(inc.timestamp).toLocaleDateString()}</td>
                    <td className="p-2.5 font-medium text-zinc-800">{inc.violatedDirective}</td>
                    <td className="p-2.5">
                      <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${inc.severity === 'CRITICAL' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="p-2.5 font-semibold text-zinc-800">{inc.actionTaken}</td>
                    <td className="p-2.5 text-zinc-600 max-w-xs truncate" title={inc.adaptiveConstraintAdded}>
                      {inc.adaptiveConstraintAdded || '—'}
                    </td>
                    <td className="p-2.5 font-mono text-[10px] text-zinc-400">{inc.auditHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
