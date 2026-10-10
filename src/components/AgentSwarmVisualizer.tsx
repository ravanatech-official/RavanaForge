import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ShieldAlert, 
  TestTube, 
  Code2, 
  Layers, 
  Workflow,
  Sparkles,
  ArrowRight,
  Minimize2,
  Maximize2,
  Zap,
  Shield,
  Flame
} from 'lucide-react';
import { Agent, WorkflowStage } from '../types/forge';

interface AgentSwarmVisualizerProps {
  agents: Agent[];
  stages: WorkflowStage[];
  currentStageIndex: number;
  activeAgentId?: string;
  onSelectAgent: (agentId: string) => void;
  selectedAgentFilter?: string;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'architect':
      return Layers;
    case 'tech_lead':
      return Workflow;
    case 'backend_eng':
      return Code2;
    case 'frontend_eng':
      return Sparkles;
    case 'qa_engineer':
      return TestTube;
    case 'security_auditor':
      return ShieldAlert;
    default:
      return Terminal;
  }
};

const getRoleGlow = (color: string, isActive: boolean) => {
  if (!isActive) return 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700/80 hover:bg-slate-900/90';
  switch (color) {
    case 'indigo':
      return 'border-indigo-500/80 bg-indigo-950/30 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-500/10';
    case 'purple':
      return 'border-purple-500/80 bg-purple-950/30 ring-1 ring-purple-500/40 shadow-lg shadow-purple-500/10';
    case 'blue':
      return 'border-blue-500/80 bg-blue-950/30 ring-1 ring-blue-500/40 shadow-lg shadow-blue-500/10';
    case 'cyan':
      return 'border-cyan-500/80 bg-cyan-950/30 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-500/10';
    case 'amber':
      return 'border-amber-500/80 bg-amber-950/30 ring-1 ring-amber-500/40 shadow-lg shadow-amber-500/10';
    case 'rose':
      return 'border-rose-500/80 bg-rose-950/30 ring-1 ring-rose-500/40 shadow-lg shadow-rose-500/10';
    default:
      return 'border-slate-700 bg-slate-800';
  }
};

const getAvatarBadgeColor = (color: string) => {
  switch (color) {
    case 'indigo':
      return 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30';
    case 'purple':
      return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
    case 'blue':
      return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
    case 'cyan':
      return 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30';
    case 'amber':
      return 'bg-amber-600/20 text-amber-300 border-amber-500/30';
    case 'rose':
      return 'bg-rose-600/20 text-rose-300 border-rose-500/30';
    default:
      return 'bg-slate-700/40 text-slate-300 border-slate-600/30';
  }
};

export const AgentSwarmVisualizer: React.FC<AgentSwarmVisualizerProps> = ({
  agents,
  stages,
  currentStageIndex,
  activeAgentId,
  onSelectAgent,
  selectedAgentFilter,
}) => {
  const [isCompact, setIsCompact] = useState(false);

  // Compute active stage and handoff
  const currentStage = stages[currentStageIndex];
  const nextStage = stages[currentStageIndex + 1];
  const activeAgent = agents.find((a) => a.id === activeAgentId);
  const nextAgent = nextStage ? agents.find((a) => a.id === nextStage.agentId) : null;

  return (
    <div className="bg-[#0B0F19]/90 border-b border-slate-800/80 px-3 md:px-4 py-2 transition-all duration-200 select-none">
      {/* Top stage info bar + Compact View Toggle */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-xs">
          <Workflow className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200 text-xs">
            Swarm Commander Hierarchy
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            [Stage {Math.min(currentStageIndex + 1, stages.length)}/{stages.length}: {currentStage?.name || 'Execution'}]
          </span>

          {/* Dynamic Task Hand-off Indicator */}
          {activeAgent && nextAgent && (
            <div className="hidden md:flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
              <span className="text-slate-400">Hand-off:</span>
              <span className="font-semibold text-indigo-300">{activeAgent.name.split(' ')[0]}</span>
              <ArrowRight className="w-2.5 h-2.5 text-indigo-400 animate-pulse" />
              <span className="font-semibold text-purple-300">{nextAgent.name.split(' ')[0]}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {selectedAgentFilter && (
            <button
              onClick={() => onSelectAgent('')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 mr-2"
            >
              <span>Filtered by agent</span>
              <span className="underline font-semibold font-mono">(clear)</span>
            </button>
          )}

          {/* 1-Click Compact Mode Toggle */}
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            title={isCompact ? 'Switch to Expanded Commander Cards' : 'Switch to Compact Status Bar'}
          >
            {isCompact ? (
              <>
                <Maximize2 className="w-3 h-3 text-indigo-400" />
                <span>Expanded View</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-slate-400" />
                <span>Compact View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode A: Compact Single-Line Strip */}
      {isCompact ? (
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {agents.map((agent) => {
            const isCurrentActive = activeAgentId === agent.id;
            const isSelected = selectedAgentFilter === agent.id;
            const matchingStage = stages.find((s) => s.agentId === agent.id);
            const isCompleted = matchingStage?.status === 'completed';

            return (
              <button
                key={agent.id}
                onClick={() => onSelectAgent(isSelected ? '' : agent.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs border transition shrink-0 ${
                  isSelected
                    ? 'ring-1 ring-indigo-400 bg-slate-800 border-indigo-500'
                    : isCurrentActive
                    ? 'border-indigo-500/70 bg-indigo-950/40 text-indigo-200 shadow-sm shadow-indigo-500/20'
                    : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <span className="text-xs">{agent.avatarSymbol || '⚡'}</span>
                <span className="font-semibold text-xs text-slate-200">{agent.name.split(' ')[0]}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : isCurrentActive ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Mode B: Full Sovereign Commander Cards */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {agents.map((agent) => {
            const Icon = getRoleIcon(agent.role);
            const isCurrentActive = activeAgentId === agent.id;
            const isSelected = selectedAgentFilter === agent.id;
            const matchingStage = stages.find((s) => s.agentId === agent.id);
            const isCompleted = matchingStage?.status === 'completed';

            return (
              <div
                key={agent.id}
                onClick={() => onSelectAgent(isSelected ? '' : agent.id)}
                className={`relative cursor-pointer rounded-lg p-2.5 border transition-all duration-200 select-none ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 bg-slate-850 border-indigo-500/80 shadow-lg'
                    : getRoleGlow(agent.avatarColor, isCurrentActive)
                }`}
              >
                {/* Header: Commander Avatar Badge + Status */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm select-none" title={agent.commanderTitle}>
                      {agent.avatarSymbol || '⚡'}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${getAvatarBadgeColor(
                        agent.avatarColor
                      )}`}
                    >
                      <Icon className="w-2.5 h-2.5" />
                      <span className="capitalize">{agent.role.replace('_', ' ')}</span>
                    </span>
                  </div>

                  {isCompleted ? (
                    <span title="Stage Verified">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  ) : isCurrentActive || agent.status !== 'idle' ? (
                    <span className="relative flex h-2 w-2" title="Active Computing">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                  ) : (
                    <Clock className="w-3 h-3 text-slate-600" />
                  )}
                </div>

                {/* Commander Sovereign Name */}
                <div className="font-semibold text-xs text-white truncate flex items-center space-x-1">
                  <span>{agent.name}</span>
                </div>

                {/* Current Action / Domain */}
                <div className="text-[10px] text-slate-400 truncate mt-0.5 font-sans">
                  {agent.currentAction || agent.title.split(' ')[0] + ' Domain'}
                </div>

                {/* Model & Confidence Bar */}
                <div className="mt-2 pt-1 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-slate-400 truncate max-w-[70px]">
                    {agent.model.split(' ')[0]}
                  </span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    {(agent.confidence * 100).toFixed(0)}% conf
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress pipeline bar */}
      <div className="mt-2 flex items-center space-x-1 overflow-x-auto py-0.5">
        {stages.map((stage, idx) => {
          const isPast = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <React.Fragment key={stage.id}>
              <div
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition ${
                  isCurrent
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50 font-medium'
                    : isPast
                    ? 'bg-slate-900 text-emerald-400 border border-slate-800/80'
                    : 'bg-slate-900/60 text-slate-500 border border-slate-800/40'
                }`}
              >
                {isPast ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                )}
                <span className="truncate">{stage.name}</span>
              </div>
              {idx < stages.length - 1 && (
                <ArrowRight className="w-2.5 h-2.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
