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
  LayoutGrid,
  FileCode2,
  ExternalLink,
  CloudCheck
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
      {/* Left section: Nav toggle, Google AI Sparkle, Prompt Name, Cloud Status */}
      <div className="flex items-center space-x-2.5 min-w-0">
        {/* Toggle Left Rail */}
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

        {/* RavanaForge Sparkle Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1a73e8] via-[#7cacf8] to-[#c58af9] flex items-center justify-center shadow-sm shadow-[#1a73e8]/30">
            <Sparkles className="w-4 h-4 text-white fill-white/80" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              RavanaForge
              <span className="text-[10px] text-[#7cacf8] font-mono px-1.5 py-0.2 rounded bg-[#1a73e8]/15 border border-[#1a73e8]/30">
                Studio
              </span>
            </span>
            <span className="text-[10px] text-[#8e918f] font-mono leading-none hidden sm:block">
              AI Software Foundry
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-[#282a2c] mx-1 hidden sm:block" />

        {/* Prompt Title with inline editing */}
        <div className="flex items-center space-x-1.5 max-w-[200px] md:max-w-xs truncate">
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

          {/* Cloud Auto-Saved indicator */}
          <div className="hidden lg:flex items-center space-x-1 text-[11px] text-[#81c995] font-mono bg-[#81c995]/10 px-1.5 py-0.5 rounded border border-[#81c995]/20 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#81c995]"></span>
            <span>Saved</span>
          </div>
        </div>
      </div>

      {/* Center section: View Mode Tabs */}
      <div className="hidden md:flex items-center bg-[#1e1f20] p-0.5 rounded-lg border border-[#282a2c]">
        <button
          onClick={() => onChangeViewMode('chat')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
            activeViewMode === 'chat'
              ? 'bg-[#1a73e8] text-white shadow-sm'
              : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="RavanaForge Chat Prompt Canvas"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chat Prompt</span>
        </button>

        <button
          onClick={() => onChangeViewMode('freeform')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
            activeViewMode === 'freeform'
              ? 'bg-[#1a73e8] text-white shadow-sm'
              : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="Freeform Prompt Studio"
        >
          <span>Freeform</span>
        </button>

        <button
          onClick={() => onChangeViewMode('cockpit')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
            activeViewMode === 'cockpit'
              ? 'bg-[#c58af9] text-black font-semibold shadow-sm'
              : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="RavanaForge Autonomous Multi-Agent Cockpit"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>RavanaForge Cockpit</span>
        </button>

        <button
          onClick={() => onChangeViewMode('code')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
            activeViewMode === 'code'
              ? 'bg-[#7cacf8] text-black font-semibold shadow-sm'
              : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="Code Workspace & Invariant Diffs"
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>IDE & Diffs</span>
        </button>

        <button
          onClick={() => onChangeViewMode('executive')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
            activeViewMode === 'executive'
              ? 'bg-[#fdd663] text-black font-semibold shadow-sm'
              : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
          }`}
          title="Executive Solutions & Client Deck"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Solutions</span>
        </button>
      </div>

      {/* Right section: Get code, Share, Firebase status, Run button, Drawer toggle */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Firebase Live Status */}
        <a 
          href="https://ravanaforge.web.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#1e1f20] hover:bg-[#282a2c] border border-[#282a2c] text-[#c4c7c5] hover:text-white transition group"
          title="Open live Firebase deployment at ravanaforge.web.app"
        >
          <span className="w-2 h-2 rounded-full bg-[#81c995] animate-pulse"></span>
          <span className="font-mono text-[11px]">ravanaforge.web.app</span>
          <ExternalLink className="w-3 h-3 text-[#8e918f] group-hover:text-white" />
        </a>

        {/* Get Code button (Google AI Studio iconic feature) */}
        <button
          onClick={onOpenGetCode}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e1f20] hover:bg-[#282a2c] text-[#c4c7c5] hover:text-white border border-[#282a2c] transition"
          title="Get integration code in Node.js, Python, or cURL"
        >
          <Code2 className="w-3.5 h-3.5 text-[#7cacf8]" />
          <span className="hidden sm:inline">Get code</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="p-1.5 rounded-lg text-[#8e918f] hover:text-white hover:bg-[#1e1f20] transition hidden sm:flex items-center justify-center"
          title="Share Prompt"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Google AI Studio Blue Run Button */}
        <button
          onClick={onRunPrompt}
          disabled={isGenerating}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all ${
            isGenerating
              ? 'bg-[#1a73e8]/70 text-white cursor-wait'
              : 'bg-[#1a73e8] hover:bg-[#1b66c9] text-white shadow-[#1a73e8]/25 hover:shadow-[#1a73e8]/40'
          }`}
          title="Execute prompt (Ctrl+Enter / Cmd+Enter)"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
              <kbd className="hidden lg:inline text-[9px] bg-white/20 px-1 py-0.2 rounded font-mono ml-0.5">
                Ctrl+↵
              </kbd>
            </>
          )}
        </button>

        {/* Parameters Drawer Toggle */}
        <button
          onClick={onToggleRightDrawer}
          className={`p-1.5 rounded-lg transition ${
            isRightDrawerOpen
              ? 'bg-[#1a73e8]/20 text-[#7cacf8] border border-[#1a73e8]/40'
              : 'text-[#8e918f] hover:text-white hover:bg-[#1e1f20]'
          }`}
          title={isRightDrawerOpen ? "Close parameters panel" : "Open parameters panel"}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* User initials avatar */}
        <div 
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#c58af9] flex items-center justify-center text-white text-[11px] font-bold shadow ring-1 ring-white/10"
          title="Signed in as firebase00.ravanatech@gmail.com"
        >
          RF
        </div>
      </div>
    </header>
  );
};
