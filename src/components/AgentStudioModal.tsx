import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Cpu, 
  Sliders, 
  Check, 
  Sparkles, 
  Plus, 
  Trash2,
  ShieldAlert,
  Code2,
  TestTube
} from 'lucide-react';
import { Agent } from '../types/forge';

interface AgentStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  onUpdateAgent: (agent: Agent) => void;
  onAddAgent: (agent: Agent) => void;
}

const AVAILABLE_MODELS = [
  'Gemini 2.5 Pro (Thinking)',
  'Gemini 2.5 Flash',
  'Gemini 1.5 Pro',
  'Claude 3.5 Sonnet',
  'GPT-4o (Reasoning)',
  'DeepSeek-Coder V2',
];

const ALL_CAPABILITIES = [
  'Architecture Spec',
  'ADR Authoring',
  'Task Decomposition',
  'Interface Contracts',
  'Code Synthesis',
  'AST Manipulation',
  'Unit Test Generation',
  'Integration Mocks',
  'Edge-Case Fuzzing',
  'SAST Static Analysis',
  'Secret Leak Detection',
  'OWASP Top 10 Audit',
];

export const AgentStudioModal: React.FC<AgentStudioModalProps> = ({
  isOpen,
  onClose,
  agents,
  onUpdateAgent,
  onAddAgent,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  if (!isOpen) return null;

  const handleToggleCapability = (cap: string) => {
    if (!activeAgent) return;
    const hasCap = activeAgent.capabilities.includes(cap);
    const updated = hasCap
      ? activeAgent.capabilities.filter((c) => c !== cap)
      : [...activeAgent.capabilities, cap];
    onUpdateAgent({ ...activeAgent, capabilities: updated });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                RavanaForge Agent Swarm Studio
              </h2>
              <p className="text-xs text-slate-400">
                Configure autonomous agent roles, models, temperature, and capability tools
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

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Agent Selector List */}
          <div className="w-64 border-r border-slate-800 bg-slate-950/40 p-3 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-500 uppercase px-2 py-1 tracking-wider">
              Active Swarm Members ({agents.length})
            </div>
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`w-full flex items-center space-x-2.5 p-2 rounded-xl text-left transition ${
                  agent.id === activeAgent?.id
                    ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                    agent.role === 'architect'
                      ? 'bg-indigo-600'
                      : agent.role === 'tech_lead'
                      ? 'bg-purple-600'
                      : agent.role === 'backend_eng'
                      ? 'bg-blue-600'
                      : agent.role === 'frontend_eng'
                      ? 'bg-cyan-600'
                      : agent.role === 'qa_engineer'
                      ? 'bg-amber-600'
                      : 'bg-rose-600'
                  }`}
                >
                  {agent.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold truncate text-slate-200">
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize truncate">
                    {agent.role.replace('_', ' ')}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Agent Configuration Editor */}
          {activeAgent && (
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-900/40">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Agent Name & Title
                  </label>
                  <input
                    type="text"
                    value={activeAgent.name}
                    onChange={(e) =>
                      onUpdateAgent({ ...activeAgent, name: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Underlying LLM Engine
                  </label>
                  <select
                    value={activeAgent.model}
                    onChange={(e) =>
                      onUpdateAgent({ ...activeAgent, model: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {AVAILABLE_MODELS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Temperature Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Sampling Temperature ({activeAgent.temperature})
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Lower = Deterministic & Rigorous, Higher = Creative
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={activeAgent.temperature}
                  onChange={(e) =>
                    onUpdateAgent({
                      ...activeAgent,
                      temperature: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* System Prompt */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  System Persona & Domain Instructions
                </label>
                <textarea
                  rows={4}
                  value={activeAgent.systemPrompt}
                  onChange={(e) =>
                    onUpdateAgent({ ...activeAgent, systemPrompt: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Capabilities checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Specialized Tools & AST Capabilities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_CAPABILITIES.map((cap) => {
                    const isChecked = activeAgent.capabilities.includes(cap);
                    return (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => handleToggleCapability(cap)}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-xs font-medium border text-left transition ${
                          isChecked
                            ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isChecked
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'border-slate-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{cap}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            Save Swarm Configurations
          </button>
        </div>
      </div>
    </div>
  );
};
