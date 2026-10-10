import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Rocket, 
  Terminal, 
  Layers, 
  Database, 
  ShieldCheck, 
  Cpu,
  Code2
} from 'lucide-react';
import { ProjectMission } from '../types/forge';

interface NewMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchMission: (title: string, description: string, stack: string[]) => void;
}

const TEMPLATES = [
  {
    id: 'raft-cache',
    title: 'Distributed In-Memory Cache with Raft Consensus',
    description: 'Autonomous multi-node KV store with leader election, quorum log replication, snapshot compaction, and chaos testing.',
    stack: ['Go 1.23', 'Raft Algorithm', 'High-Throughput IO', 'SAST Hardened'],
    icon: Database,
  },
  {
    id: 'nextjs-saas',
    title: 'Full-Stack Next.js 15 SaaS with Stripe & Multi-Tenancy',
    description: 'App Router architecture with organization workspaces, role-based access control (RBAC), webhook validation, and E2E specs.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe Billing'],
    icon: Sparkles,
  },
  {
    id: 'vector-rag',
    title: 'Hybrid Vector Search Engine & Semantic RAG Pipeline',
    description: 'Embeddings indexing engine with BM25 keyword reranking, cosine similarity search, and automated retrieval accuracy benchmarks.',
    stack: ['Python 3.12', 'FastAPI', 'NumPy Vectors', 'pytest'],
    icon: Cpu,
  },
  {
    id: 'secops-patch',
    title: 'Zero-Day Vulnerability SAST Remediation & Hardening',
    description: 'Automated vulnerability triage, AST-safe patch synthesis, and regression verification across enterprise microservices.',
    stack: ['Security Audit', 'CWE-400 Remediation', 'Zero-Trust', 'Fuzzing'],
    icon: ShieldCheck,
  },
];

export const NewMissionModal: React.FC<NewMissionModalProps> = ({
  isOpen,
  onClose,
  onLaunchMission,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customStack, setCustomStack] = useState('Rust, Actix-Web, PostgreSQL, Docker');

  if (!isOpen) return null;

  const handleLaunchCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const stackList = customStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onLaunchMission(customTitle.trim(), customDescription.trim(), stackList);
    onClose();
  };

  const handleSelectTemplate = (template: typeof TEMPLATES[0]) => {
    onLaunchMission(template.title, template.description, template.stack);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Launch New AI Software Engineering Mission
              </h2>
              <p className="text-xs text-slate-400">
                Deploy the RavanaForge swarm to design, implement, and verify software systems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Preset Blueprints */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">
              Select Curated Engineering Blueprint
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-850 cursor-pointer transition text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900 group-hover:bg-indigo-600 group-hover:text-white transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold text-xs text-white group-hover:text-indigo-300 transition">
                          {tpl.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {tpl.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[11px] font-mono">
              OR DEFINE CUSTOM MISSION
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Custom Mission Form */}
          <form onSubmit={handleLaunchCustom} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                System / Project Name
              </label>
              <input
                type="text"
                required
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Distributed Lock Manager with TTL and Redlock Algorithm"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Engineering Specification & Objectives
              </label>
              <textarea
                rows={3}
                required
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Describe key invariants, performance requirements, edge cases, and test suites needed..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Technologies & Stack (comma-separated)
              </label>
              <input
                type="text"
                value={customStack}
                onChange={(e) => setCustomStack(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Initialize Custom Swarm Mission</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
