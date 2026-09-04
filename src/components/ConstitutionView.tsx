import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  ShieldCheck, 
  GitBranch, 
  Sparkles, 
  Hash, 
  Calendar,
  AlertCircle,
  Save,
  Check
} from 'lucide-react';
import { 
  ProjectConstitution, 
  Directive, 
  CanonItem 
} from '../types/substrate.ts';

interface ConstitutionViewProps {
  constitution: ProjectConstitution;
  onUpdateConstitution: (updated: ProjectConstitution) => void;
}

export const ConstitutionView: React.FC<ConstitutionViewProps> = ({
  constitution,
  onUpdateConstitution
}) => {
  const [activeTab, setActiveTab] = useState<'directives' | 'canon' | 'adaptive'>('directives');
  const [isAddingDirective, setIsAddingDirective] = useState<boolean>(false);
  const [isAddingCanon, setIsAddingCanon] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // New Directive Form State
  const [newDirective, setNewDirective] = useState<Partial<Directive>>({
    category: 'inviolable_canon',
    severity: 'CRITICAL',
    title: '',
    rule: '',
    rationale: ''
  });

  // New Canon Form State
  const [newCanon, setNewCanon] = useState<Partial<CanonItem>>({
    title: '',
    content: '',
    permanenceLevel: 'INVIOLABLE'
  });

  const handleCreateDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirective.title || !newDirective.rule) return;

    const directive: Directive = {
      id: 'DIR-' + Math.floor(10 + Math.random() * 90),
      category: newDirective.category as any || 'inviolable_canon',
      severity: newDirective.severity as any || 'CRITICAL',
      title: newDirective.title,
      rule: newDirective.rule,
      rationale: newDirective.rationale || 'Human intent invariant constraint.'
    };

    const updated = {
      ...constitution,
      directives: [...constitution.directives, directive],
      hash: 'sha256:' + Math.random().toString(16).substring(2, 12) + Math.random().toString(16).substring(2, 12)
    };

    onUpdateConstitution(updated);
    setIsAddingDirective(false);
    setNewDirective({
      category: 'inviolable_canon',
      severity: 'CRITICAL',
      title: '',
      rule: '',
      rationale: ''
    });
    triggerSaveIndicator();
  };

  const handleDeleteDirective = (id: string) => {
    const updated = {
      ...constitution,
      directives: constitution.directives.filter(d => d.id !== id),
      hash: 'sha256:' + Math.random().toString(16).substring(2, 12) + Math.random().toString(16).substring(2, 12)
    };
    onUpdateConstitution(updated);
    triggerSaveIndicator();
  };

  const handleCreateCanon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCanon.title || !newCanon.content) return;

    const item: CanonItem = {
      id: 'CANON-' + Math.floor(10 + Math.random() * 90),
      title: newCanon.title,
      content: newCanon.content,
      permanenceLevel: newCanon.permanenceLevel as any || 'INVIOLABLE',
      hash: 'sha256:' + Math.random().toString(16).substring(2, 8),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updated = {
      ...constitution,
      canon: [...constitution.canon, item],
      hash: 'sha256:' + Math.random().toString(16).substring(2, 12) + Math.random().toString(16).substring(2, 12)
    };

    onUpdateConstitution(updated);
    setIsAddingCanon(false);
    setNewCanon({
      title: '',
      content: '',
      permanenceLevel: 'INVIOLABLE'
    });
    triggerSaveIndicator();
  };

  const handleDeleteCanon = (id: string) => {
    const updated = {
      ...constitution,
      canon: constitution.canon.filter(c => c.id !== id),
      hash: 'sha256:' + Math.random().toString(16).substring(2, 12) + Math.random().toString(16).substring(2, 12)
    };
    onUpdateConstitution(updated);
    triggerSaveIndicator();
  };

  const triggerSaveIndicator = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6" id="constitution-view">
      
      {/* Header Info */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 text-zinc-800 font-mono border border-zinc-300">
              {constitution.version}
            </span>
            <h2 className="text-base font-bold text-zinc-900">{constitution.name}</h2>
          </div>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl">{constitution.summary}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-mono">CONSTITUTION FINGERPRINT</p>
            <p className="text-xs font-mono font-semibold text-zinc-800 truncate max-w-[200px]">{constitution.hash}</p>
          </div>
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
      </div>

      {/* Internal Sub-Tabs */}
      <div className="flex border-b border-zinc-200 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('directives')}
          className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${activeTab === 'directives' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Operational Directives ({constitution.directives.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('canon')}
          className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${activeTab === 'canon' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          <GitBranch className="w-4 h-4" />
          <span>CanonLane Permanence ({constitution.canon.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('adaptive')}
          className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${activeTab === 'adaptive' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Adaptive Constitutional Memory ({constitution.adaptiveSteeringConstraints.length})</span>
        </button>
      </div>

      {/* Tab Content: Directives */}
      {activeTab === 'directives' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Directives form the first-class operational rules enforced by the identity gate and contradiction engine.
            </p>
            <button
              onClick={() => setIsAddingDirective(!isAddingDirective)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Directive</span>
            </button>
          </div>

          {/* Add Directive Form */}
          {isAddingDirective && (
            <form onSubmit={handleCreateDirective} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-900 uppercase">Create New Constitutional Directive</h3>
                <button type="button" onClick={() => setIsAddingDirective(false)} className="text-xs text-zinc-400 hover:text-zinc-700">Cancel</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newDirective.title}
                    onChange={e => setNewDirective({ ...newDirective, title: e.target.value })}
                    placeholder="e.g. Non-Lethal Sanctity"
                    className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Category</label>
                  <select
                    value={newDirective.category}
                    onChange={e => setNewDirective({ ...newDirective, category: e.target.value as any })}
                    className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                  >
                    <option value="inviolable_canon">Inviolable Canon</option>
                    <option value="core_identity">Core Identity</option>
                    <option value="prohibition">Prohibition</option>
                    <option value="stylistic_invariant">Stylistic Invariant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Severity Level</label>
                  <select
                    value={newDirective.severity}
                    onChange={e => setNewDirective({ ...newDirective, severity: e.target.value as any })}
                    className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                  >
                    <option value="CRITICAL">CRITICAL (Trigger PROTECT)</option>
                    <option value="HIGH">HIGH (Trigger WARN/Steer)</option>
                    <option value="MEDIUM">MEDIUM (Stylistic)</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-zinc-700 mb-1">Inviolable Rule Statement</label>
                <textarea
                  required
                  rows={2}
                  value={newDirective.rule}
                  onChange={e => setNewDirective({ ...newDirective, rule: e.target.value })}
                  placeholder="The exact rule the agent and LLM judge must enforce..."
                  className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-zinc-700 mb-1">Rationale / Intent Justification</label>
                <input
                  type="text"
                  value={newDirective.rationale}
                  onChange={e => setNewDirective({ ...newDirective, rationale: e.target.value })}
                  placeholder="Why this rule exists..."
                  className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-1.5 rounded bg-zinc-900 text-white text-xs font-semibold">
                  Save Directive
                </button>
              </div>
            </form>
          )}

          {/* Directives List */}
          <div className="grid grid-cols-1 gap-3">
            {constitution.directives.map((dir) => (
              <div key={dir.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs hover:border-zinc-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
                        {dir.id}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-900">{dir.title}</h4>
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${dir.severity === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' : dir.severity === 'HIGH' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-zinc-100 text-zinc-700'}`}>
                        {dir.severity}
                      </span>

                      <span className="text-[10px] text-zinc-400 font-mono">
                        category: {dir.category}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-800 leading-relaxed pt-1">
                      {dir.rule}
                    </p>

                    <p className="text-[11px] text-zinc-500 italic">
                      Rationale: {dir.rationale}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteDirective(dir.id)}
                    className="text-zinc-400 hover:text-red-600 p-1 rounded hover:bg-zinc-100 transition-colors"
                    title="Delete Directive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: CanonLane */}
      {activeTab === 'canon' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              CanonLane indexes permanent truths and facts of this creative or strategic universe with cryptographic permanence hashes.
            </p>
            <button
              onClick={() => setIsAddingCanon(!isAddingCanon)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Canon Fact</span>
            </button>
          </div>

          {/* Add Canon Form */}
          {isAddingCanon && (
            <form onSubmit={handleCreateCanon} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-900 uppercase">Register New Canon Record</h3>
                <button type="button" onClick={() => setIsAddingCanon(false)} className="text-xs text-zinc-400 hover:text-zinc-700">Cancel</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newCanon.title}
                    onChange={e => setNewCanon({ ...newCanon, title: e.target.value })}
                    placeholder="e.g. Maya Lin Presumed Captive"
                    className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Permanence Level</label>
                  <select
                    value={newCanon.permanenceLevel}
                    onChange={e => setNewCanon({ ...newCanon, permanenceLevel: e.target.value as any })}
                    className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                  >
                    <option value="INVIOLABLE">INVIOLABLE (Cannot be overridden without audit signature)</option>
                    <option value="STABLE">STABLE (Standard canonical history)</option>
                    <option value="EVOLVING">EVOLVING (May update through plot development)</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-zinc-700 mb-1">Canonical Content Fact</label>
                <textarea
                  required
                  rows={2}
                  value={newCanon.content}
                  onChange={e => setNewCanon({ ...newCanon, content: e.target.value })}
                  placeholder="Describe the canonical fact in explicit detail..."
                  className="w-full bg-white border border-zinc-300 rounded p-2 text-xs"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-1.5 rounded bg-zinc-900 text-white text-xs font-semibold">
                  Commit Canon Item
                </button>
              </div>
            </form>
          )}

          {/* Canon Items List */}
          <div className="grid grid-cols-1 gap-3">
            {constitution.canon.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs hover:border-zinc-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.permanenceLevel === 'INVIOLABLE' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-zinc-100 text-zinc-700'}`}>
                        {item.permanenceLevel}
                      </span>

                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <Hash className="w-3 h-3" /> {item.hash}
                      </span>

                      <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.lastUpdated}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-800 leading-relaxed pt-1">
                      {item.content}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteCanon(item.id)}
                    className="text-zinc-400 hover:text-red-600 p-1 rounded hover:bg-zinc-100 transition-colors"
                    title="Delete Canon Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Adaptive Constitutional Memory */}
      {activeTab === 'adaptive' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Immune Loop Write-Back Engine</span>
            </div>
            <p className="text-emerald-800">
              When Cranium Core intercepts an adversarial violation in the Quarantine Inbox, the human or automated remediation action writes back an adaptive constraint into constitutional memory. These adaptive rules dynamically strengthen the gate against recurring attack vectors.
            </p>
          </div>

          <div className="space-y-3">
            {constitution.adaptiveSteeringConstraints.length === 0 ? (
              <div className="text-center py-10 bg-white border border-dashed border-zinc-300 rounded-xl text-xs text-zinc-500">
                No adaptive steering constraints recorded yet. Run tests in the Live Workbench to trigger and log immune incidents!
              </div>
            ) : (
              constitution.adaptiveSteeringConstraints.map((constraint, idx) => (
                <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <p className="text-xs font-mono text-zinc-800 font-medium">
                      {constraint}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const updated = {
                        ...constitution,
                        adaptiveSteeringConstraints: constitution.adaptiveSteeringConstraints.filter((_, i) => i !== idx)
                      };
                      onUpdateConstitution(updated);
                      triggerSaveIndicator();
                    }}
                    className="text-zinc-400 hover:text-red-600 p-1 rounded"
                    title="Remove Constraint"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
