import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Share2, 
  Play, 
  Loader2, 
  Check, 
  Edit3, 
  PanelLeftClose, 
  PanelLeftOpen, 
  SlidersHorizontal,
  Flame,
  FileCode2,
  ExternalLink,
  Database,
  Terminal,
  PanelBottomOpen,
  PanelBottomClose
} from 'lucide-react';
import { AIStudioViewMode } from '../types/aistudio';

interface AIStudioHeaderProps {
  promptTitle: string;
  onUpdatePromptTitle: (newTitle: string) => void;
  activeViewMode: AIStudioViewMode;
  onChangeViewMode: (mode: AIStudioViewMode) => void;
  isGenerating: boolean;
  onRunPrompt: () => void;
  onOpenGetCode: () => void;
  onOpenShare: () => void;
  isLeftRailOpen: boolean;
  onToggleLeftRail: () => void;
  isRightDrawerOpen: boolean;
  onToggleRightDrawer: () => void;
  isBottomDrawerOpen?: boolean;
  onToggleBottomDrawer?: () => void;
  activeModelName: string;
}

export const AIStudioHeader: React.FC<AIStudioHeaderProps> = ({
  promptTitle,
  onUpdatePromptTitle,
  activeViewMode,
  onChangeViewMode,
  isGenerating,
  onRunPrompt,
  onOpenGetCode,
  onOpenShare,
  isLeftRailOpen,
  onToggleLeftRail,
  isRightDrawerOpen,
  onToggleRightDrawer,
  isBottomDrawerOpen,
  onToggleBottomDrawer,
  activeModelName,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(promptTitle);

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      onUpdatePromptTitle(tempTitle.trim());
    } else {
      setTempTitle(promptTitle);
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="h-14 border-b border-[#282a2c] bg-[#131314] text-[#e3e3e3] px-3 md:px-4 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Zone 1: Brand Wordmark, Left Rail Toggle, Prompt Name */}
      <div className="flex items-center space-x-2.5 min-w-0">
        <button
          onClick={onToggleLeftRail}
          className="p-1.5 rounded-lg text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#1e1f20] transition"
          title={isLeftRailOpen ? "Collapse navigation" : "Expand navigation"}
        >
          {isLeftRailOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>

        {/* Raptor-3 Clean Wordmark */}
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1a73e8] via-[#7cacf8] to-[#c58af9] flex items-center justify-center shadow-sm shadow-[#1a73e8]/30">
            <Sparkles className="w-4 h-4 text-white fill-white/80" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              RavanaForge
              <span className="text-[10px] text-[#7cacf8] font-mono px-1.5 py-0.2 rounded bg-[#1a73e8]/15 border border-[#1a73e8]/30">
                Raptor-3
              </span>
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-[#282a2c] mx-1 hidden sm:block" />

        {/* Prompt Title */}
        <div className="flex items-center space-x-1.5 max-w-[180px] md:max-w-xs truncate">
          {isEditingTitle ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                autoFocus
                className="bg-[#1e1f20] border border-[#1a73e8] rounded px-2 py-0.5 text-xs text-white focus:outline-none"
              />
              <button onClick={handleTitleSubmit} className="text-[#81c995] p-0.5">
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => { setTempTitle(promptTitle); setIsEditingTitle(true); }}
              className="group flex items-center space-x-1.5 cursor-pointer py-1 px-1.5 rounded hover:bg-[#1e1f20] transition max-w-full"
              title="Click to rename prompt"
            >
              <span className="text-xs font-medium text-[#c4c7c5] group-hover:text-white truncate">
                {promptTitle}
              </span>
              <Edit3 className="w-3 h-3 text-[#8e918f] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          )}

          <div className="hidden lg:flex items-center space-x-1 text-[10px] text-[#81c995] font-mono bg-[#81c995]/10 px-1.5 py-0.2 rounded border border-[#81c995]/20 shrink-0">
            <span>Saved</span>
          </div>
        </div>
      </div>

      {/* Zone 2: Simple, Clean 3-Segment View Switcher + Engine Drawer Toggle */}
      <div className="hidden md:flex items-center space-x-2">
        <div className="flex items-center bg-[#1e1f20] p-0.5 rounded-lg border border-[#282a2c]">
          <button
            onClick={() => onChangeViewMode('chat')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
              activeViewMode === 'chat' || activeViewMode === 'freeform'
                ? 'bg-[#1a73e8] text-white shadow-sm'
                : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
            }`}
            title="Google AI Studio Prompt Canvas"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Prompt</span>
          </button>

          <button
            onClick={() => onChangeViewMode('cockpit')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
              activeViewMode === 'cockpit' || activeViewMode === 'firm_org'
                ? 'bg-[#7cacf8] text-black font-semibold shadow-sm'
                : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
            }`}
            title="41-Agent Autonomous Swarm Cockpit"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Firm Swarm (41)</span>
          </button>

          <button
            onClick={() => onChangeViewMode('code')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
              activeViewMode === 'code'
                ? 'bg-[#1a73e8] text-white font-semibold shadow-sm'
                : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
            }`}
            title="Virtual IDE & File Workspace"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Code Workspace</span>
          </button>
        </div>

        {/* Bottom Drawer Drawer Button */}
        {onToggleBottomDrawer && (
          <button
            onClick={onToggleBottomDrawer}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition ${
              isBottomDrawerOpen
                ? 'bg-[#81c995]/20 border-[#81c995]/40 text-[#81c995]'
                : 'bg-[#1e1f20] border-[#282a2c] text-[#8e918f] hover:text-white hover:border-[#3c4043]'
            }`}
            title="Toggle Bottom Database & API Console Drawer"
          >
            <Database className="w-3.5 h-3.5 text-[#81c995]" />
            <span className="text-[11px]">DB & API Console</span>
            {isBottomDrawerOpen ? (
              <PanelBottomClose className="w-3.5 h-3.5 ml-0.5" />
            ) : (
              <PanelBottomOpen className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Zone 3: Actions (Get code, Share, Drawer, Run) */}
      <div className="flex items-center space-x-2 shrink-0">
        <a 
          href="https://ravanaforge.web.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden xl:flex items-center space-x-1.5 px-2 py-1 rounded-md text-xs font-medium bg-[#1e1f20] hover:bg-[#282a2c] border border-[#282a2c] text-[#c4c7c5] hover:text-white transition"
          title="Open live Firebase deployment at ravanaforge.web.app"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#81c995]"></span>
          <span className="font-mono text-[10px]">ravanaforge.web.app</span>
          <ExternalLink className="w-3 h-3 text-[#8e918f]" />
        </a>

        {/* Get Code button */}
        <button
          onClick={onOpenGetCode}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#1e1f20] hover:bg-[#282a2c] text-[#c4c7c5] hover:text-white text-xs font-medium transition"
          title="Export code in TypeScript or Python"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Get code</span>
        </button>

        {/* Share button */}
        <button
          onClick={onOpenShare}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#1e1f20] hover:bg-[#282a2c] text-[#c4c7c5] hover:text-white text-xs font-medium transition"
          title="Share prompt configuration"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Toggle Right Drawer */}
        <button
          onClick={onToggleRightDrawer}
          className={`p-1.5 rounded-lg border transition ${
            isRightDrawerOpen 
              ? 'bg-[#1a73e8]/20 border-[#1a73e8]/50 text-[#7cacf8]' 
              : 'bg-[#1e1f20] border-[#282a2c] text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="Toggle run parameters drawer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Iconic Google AI Studio Run Button */}
        <button
          onClick={onRunPrompt}
          disabled={isGenerating}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] active:bg-[#1557b0] text-white text-xs font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Run prompt execution (Ctrl+Enter)"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run</span>
              <span className="hidden md:inline text-[10px] opacity-75 font-mono ml-0.5">Ctrl↵</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
