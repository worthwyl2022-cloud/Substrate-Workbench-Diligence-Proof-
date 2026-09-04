import React from 'react';
import { 
  ShieldAlert, 
  Layers, 
  Cpu, 
  FileText, 
  Download, 
  Radio, 
  Sparkles,
  GitBranch
} from 'lucide-react';
import { Project } from '../types/substrate.ts';

interface HeaderProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (p: Project) => void;
  directiveCount: number;
  canonCount: number;
  quarantineCount: number;
  immuneCount: number;
  hasApiKey: boolean;
  onExportAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  directiveCount,
  canonCount,
  quarantineCount,
  immuneCount,
  hasApiKey,
  onExportAudit
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-xs" id="app-header">
      {/* Top Banner with Substrate Metadata */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Logo & Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-xs">
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 font-mono">CRANIUM CORE</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                v2.4 Tier-3 Substrate
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Directive-Governed Cognitive Substrate & Proof Workbench
            </p>
          </div>
        </div>

        {/* Project Isolation Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-1">
            <span className="text-xs font-semibold text-zinc-500 px-2.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              Project:
            </span>
            <select
              id="project-selector"
              value={activeProject.id}
              onChange={(e) => {
                const found = projects.find(p => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              aria-label="Select Project Universe"
              className="bg-white text-xs font-medium text-zinc-800 border border-zinc-200 rounded-md py-1 px-2.5 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Telemetry badges */}
          <div className="hidden lg:flex items-center space-x-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Directives: <strong className="font-semibold text-zinc-900">{directiveCount}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700">
              <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
              <span>Canon: <strong className="font-semibold text-zinc-900">{canonCount}</strong></span>
            </div>

            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${quarantineCount > 0 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-zinc-50 border-zinc-200 text-zinc-700'}`}>
              <ShieldAlert className={`w-3.5 h-3.5 ${quarantineCount > 0 ? 'text-amber-600' : 'text-zinc-400'}`} />
              <span>Quarantine: <strong className="font-semibold">{quarantineCount}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Immune Incidents: <strong className="font-semibold">{immuneCount}</strong></span>
            </div>
          </div>

          {/* Engine Mode Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs text-zinc-700">
            <Sparkles className={`w-3.5 h-3.5 ${hasApiKey ? 'text-amber-500' : 'text-zinc-400'}`} />
            <span className="font-medium">{hasApiKey ? 'Live Gemini 3.8 Flash Judge' : 'Local NLI-Proxy Substrate'}</span>
          </div>

          {/* Export Audit Package */}
          <button
            id="export-audit-btn"
            onClick={onExportAudit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-zinc-300" />
            <span>Export Diligence Audit</span>
          </button>
        </div>

      </div>
    </header>
  );
};
