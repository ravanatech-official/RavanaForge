import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Workflow, 
  ShieldCheck, 
  RotateCw, 
  CheckCircle2, 
  Sliders,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProjectMission, WorkflowStage } from '../types/forge';

interface WorkflowConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: ProjectMission;
  onUpdateMission: (mission: ProjectMission) => void;
}

const PRESET_TOPOLOGIES = [
  {
    id: 'sequential',
    name: 'Sequential SWE Pipeline (Waterfall)',
    description: 'Strict stage-by-stage execution with architectural sign-off before coding and mandatory QA before merge.',
    stagesCount: 5,
    tag: 'Recommended for Core Infrastructure',
  },
  {
    id: 'collaborative',
    name: 'Collaborative Swarm (Iterative Debate)',
    description: 'Tech lead and coders debate implementation approaches in real-time with continuous AST lint verification.',
    stagesCount: 4,
    tag: 'Best for Complex Algorithms',
  },
  {
    id: 'secops',
    name: 'DevSecOps Hardening & Zero-Day Patching',
    description: 'Auditor surfaces vulnerabilities; backend developer crafts minimal patches; QA verifies zero functional regressions.',
    stagesCount: 4,
    tag: 'Security & Bug Remediation',
  },
];

export const WorkflowConfigModal: React.FC<WorkflowConfigModalProps> = ({
  isOpen,
  onClose,
  mission,
  onUpdateMission,
}) => {
  const [selectedTopology, setSelectedTopology] = useState('sequential');
  const [autoRollback, setAutoRollback] = useState(true);
  const [maxRetries, setMaxRetries] = useState(3);

  if (!isOpen) return null;

  const toggleApproval = (stageId: string) => {
    const updatedStages = mission.stages.map((stage) => {
      if (stage.id === stageId) {
        return {
          ...stage,
          requiresHumanApproval: !stage.requiresHumanApproval,
        };
      }
      return stage;
    });
    onUpdateMission({ ...mission, stages: updatedStages });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Multi-Agent Workflow & Topology Architect
              </h2>
              <p className="text-xs text-slate-400">
                Configure stage progression, human-in-the-loop checkpoints, and convergence rules
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
          {/* Preset Topologies */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Orchestration Pattern
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_TOPOLOGIES.map((topo) => (
                <div
                  key={topo.id}
                  onClick={() => setSelectedTopology(topo.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                    selectedTopology === topo.id
                      ? 'bg-purple-950/30 border-purple-500/60 ring-1 ring-purple-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-semibold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/60">
                      {topo.tag}
                    </span>
                    <h3 className="font-semibold text-xs text-white mt-2 mb-1">
                      {topo.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {topo.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                    {topo.stagesCount} coordinated stages
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stages and Human Approval Gates */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pipeline Stages & Human Approval Gates
            </label>
            <div className="space-y-2">
              {mission.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {stage.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {stage.description}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleApproval(stage.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                      stage.requiresHumanApproval
                        ? 'bg-amber-600/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {stage.requiresHumanApproval
                        ? 'Approval Required'
                        : 'Autonomous Flow'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Convergence Controls */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Max Retry Iterations on Failure
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxRetries}
                onChange={(e) => setMaxRetries(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="text-xs font-semibold text-slate-300">
                  Auto-Rollback on Test Regression
                </div>
                <div className="text-[11px] text-slate-500">
                  Revert virtual code tree if unit tests fail
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoRollback}
                onChange={(e) => setAutoRollback(e.target.checked)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            Apply Topology Settings
          </button>
        </div>
      </div>
    </div>
  );
};
