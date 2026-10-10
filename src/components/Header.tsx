import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings2, 
  GitBranch, 
  Download, 
  Zap, 
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Layers,
  Rocket,
  Flame,
  LayoutGrid,
  Cpu
} from 'lucide-react';
import { ProjectMission } from '../types/forge';

interface HeaderProps {
  mission: ProjectMission;
  isRunning: boolean;
  onToggleRun: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onOpenNewMission: () => void;
  onOpenAgentStudio: () => void;
  onOpenWorkflow: () => void;
  onOpenExport: () => void;
  simulationSpeed: number;
  onChangeSpeed: (speed: number) => void;
  showRoiDrawer?: boolean;
  onToggleRoiDrawer?: () => void;
  activeViewMode: 'executive' | 'cockpit';
  onChangeViewMode: (mode: 'executive' | 'cockpit') => void;
}

export const Header: React.FC<HeaderProps> = ({
  mission,
  isRunning,
  onToggleRun,
  onStepForward,
  onReset,
  onOpenNewMission,
  onOpenAgentStudio,
  onOpenWorkflow,
  onOpenExport,
  simulationSpeed,
  onChangeSpeed,
  showRoiDrawer = false,
  onToggleRoiDrawer,
  activeViewMode,
  onChangeViewMode,
}) => {
  return (
    <header className="h-12 border-b border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur-md px-3 md:px-4 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand & Mission title */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white flex items-center">
              Ravana<span className="text-amber-400">Forge</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded font-mono">
              Enterprise Swarm
            </span>
          </div>
        </div>

        <div className="hidden lg:block h-4 w-px bg-slate-800" />

        {/* Mission Pill */}
        <button
          onClick={onOpenNewMission}
          className="hidden md:flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700/80 rounded-md px-2.5 py-1 transition group max-w-xs"
          title="Click to view or switch active mission"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-emerald-400' : 'bg-indigo-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
          </span>
          <span className="text-xs text-slate-300 group-hover:text-white font-medium truncate">
            {mission.title}
          </span>
          <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300 shrink-0" />
        </button>
      </div>

      {/* Center: Dual-Mode Switcher & Cockpit Controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Segmented Mode Switcher */}
        <div className="bg-slate-950/90 p-0.5 rounded-lg border border-slate-800 flex items-center shadow-inner">
          <button
            onClick={() => onChangeViewMode('executive')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activeViewMode === 'executive'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-sm ring-1 ring-amber-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Executive Solutions View: Client & Business Overview"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Executive Solutions</span>
            <span className="sm:hidden">Solutions</span>
          </button>

          <button
            onClick={() => onChangeViewMode('cockpit')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activeViewMode === 'cockpit'
                ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Raptor 3 Swarm Cockpit: Deep Multi-Agent Engineering Foundry"
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Raptor 3 Cockpit</span>
            <span className="sm:hidden">Cockpit</span>
          </button>
        </div>

        {/* Swarm Quick Controls */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 border-l border-slate-800 pl-2">
          {/* Glowing Emerald Auto-Forge Button */}
          <button
            onClick={onToggleRun}
            className={`relative group flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold shadow-md transition-all duration-200 ${
              isRunning
                ? 'bg-amber-600/90 hover:bg-amber-500 text-white ring-1 ring-amber-400/40 shadow-amber-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-1 ring-emerald-400/40 shadow-emerald-500/25 hover:shadow-emerald-500/40'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden md:inline">Pause</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span className="hidden md:inline">Auto-Forge</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={onStepForward}
            disabled={isRunning}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border border-slate-700/80 transition ${
              isRunning
                ? 'bg-slate-900/50 text-slate-600 border-slate-800/80 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600'
            }`}
            title="Execute single multi-agent autonomous step"
          >
            <span>Step</span>
          </button>

          {/* Speed Pills */}
          <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-xs">
            {[1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition ${
                  simulationSpeed === speed
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800 transition"
            title="Reset swarm state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Controls: ROI Telemetry & Navigation */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
        {/* Transparent ROI Quick Pill */}
        {onToggleRoiDrawer && (
          <button
            onClick={onToggleRoiDrawer}
            className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition ${
              showRoiDrawer
                ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300 shadow-sm'
                : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Transparent ROI & Business Telemetry"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono font-medium">ROI: ~18h Saved</span>
          </button>
        )}

        {/* Commander Studio */}
        <button
          onClick={onOpenAgentStudio}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white transition"
          title="Configure Sovereign Commanders & Models"
        >
          <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline text-[11px]">Commanders</span>
        </button>

        {/* Workflow Topology */}
        <button
          onClick={onOpenWorkflow}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white transition"
          title="Workflow Pipeline Configuration"
        >
          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden lg:inline text-[11px]">Workflow</span>
        </button>

        {/* Export to Production (Glowing Accent) */}
        <button
          onClick={onOpenExport}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-600/20 border border-indigo-400/30 transition"
          title="1-Click Export to Production (SDK & CLI)"
        >
          <Download className="w-3.5 h-3.5 text-indigo-100" />
          <span className="text-[11px]">Export</span>
        </button>
      </div>
    </header>
  );
};
