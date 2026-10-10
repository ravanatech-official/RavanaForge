import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Braces, 
  FolderGit2, 
  Search, 
  Clock, 
  Flame, 
  Users, 
  Server, 
  ChevronRight,
  Database,
  Code2,
  Sparkles
} from 'lucide-react';
import { SavedPrompt, AIStudioViewMode } from '../types/aistudio';
import { Agent, VirtualFile } from '../types/forge';

interface AIStudioLeftRailProps {
  isOpen: boolean;
  savedPrompts: SavedPrompt[];
  activePromptId: string;
  onSelectPrompt: (id: string) => void;
  onNewPrompt: (type: 'chat' | 'freeform' | 'structured') => void;
  agents: Agent[];
  files: VirtualFile[];
  onSelectFile: (fileId: string) => void;
  onChangeViewMode: (mode: AIStudioViewMode) => void;
}

export const AIStudioLeftRail: React.FC<AIStudioLeftRailProps> = ({
  isOpen,
  savedPrompts,
  activePromptId,
  onSelectPrompt,
  onNewPrompt,
  agents,
  files,
  onSelectFile,
  onChangeViewMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompts' | 'files' | 'agents' | 'system'>('prompts');

  if (!isOpen) return null;

  const filteredPrompts = savedPrompts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const executiveChiefs = agents.filter(a => a.isExecutive);
  const specialistStaff = agents.filter(a => !a.isExecutive);

  return (
    <aside className="w-64 border-r border-[#282a2c] bg-[#131314] flex flex-col shrink-0 select-none h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Top action: New Prompt Button */}
      <div className="p-3 border-b border-[#282a2c] relative">
        <button
          onClick={() => setShowNewMenu(!showNewMenu)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] text-white text-xs font-semibold shadow-sm transition"
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create new</span>
          </div>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showNewMenu ? 'rotate-90' : ''}`} />
        </button>

        {/* Dropdown Menu for Create New */}
        {showNewMenu && (
          <div className="absolute top-14 left-3 right-3 bg-[#1e1f20] border border-[#282a2c] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
            <button
              onClick={() => { onNewPrompt('chat'); setShowNewMenu(false); }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs rounded-lg text-[#e3e3e3] hover:bg-[#282a2c] text-left transition"
            >
              <MessageSquare className="w-4 h-4 text-[#7cacf8]" />
              <div>
                <div className="font-medium">Chat prompt</div>
                <div className="text-[10px] text-[#8e918f]">Multi-turn conversational flow</div>
              </div>
            </button>

            <button
              onClick={() => { onNewPrompt('freeform'); setShowNewMenu(false); }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs rounded-lg text-[#e3e3e3] hover:bg-[#282a2c] text-left transition"
            >
              <FileText className="w-4 h-4 text-[#c58af9]" />
              <div>
                <div className="font-medium">Freeform prompt</div>
                <div className="text-[10px] text-[#8e918f]">Raw prompt canvas with test variants</div>
              </div>
            </button>

            <button
              onClick={() => { onNewPrompt('structured'); setShowNewMenu(false); }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs rounded-lg text-[#e3e3e3] hover:bg-[#282a2c] text-left transition"
            >
              <Braces className="w-4 h-4 text-[#81c995]" />
              <div>
                <div className="font-medium">Structured prompt</div>
                <div className="text-[10px] text-[#8e918f]">Strict JSON Schema & API contracts</div>
              </div>
            </button>

            <div className="h-px bg-[#282a2c] my-1" />

            <button
              onClick={() => { onChangeViewMode('firm_org'); setShowNewMenu(false); }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs rounded-lg text-[#7cacf8] hover:bg-[#282a2c] text-left transition"
            >
              <Users className="w-4 h-4 text-[#7cacf8]" />
              <div>
                <div className="font-medium">Firm Org Directory</div>
                <div className="text-[10px] text-[#8e918f]">41 Sovereign Engineers (5 Chiefs + 36 Staff)</div>
              </div>
            </button>

            <button
              onClick={() => { onChangeViewMode('cockpit'); setShowNewMenu(false); }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs rounded-lg text-amber-300 hover:bg-[#282a2c] text-left transition"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <div className="font-medium">Swarm Cockpit</div>
                <div className="text-[10px] text-amber-400/70">Autonomous Multi-Agent Foundry</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Quick Navigation Strips */}
      <div className="px-3 py-2 border-b border-[#282a2c] space-y-0.5">
        <button
          onClick={() => onChangeViewMode('firm_org')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#c4c7c5] hover:text-white hover:bg-[#1e1f20] transition"
        >
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-[#7cacf8]" />
            <span>Firm Org Directory</span>
          </div>
          <span className="text-[10px] font-mono text-[#7cacf8] bg-[#1a73e8]/15 px-1.5 py-0.2 rounded">41</span>
        </button>

        <button
          onClick={() => onChangeViewMode('database')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#c4c7c5] hover:text-white hover:bg-[#1e1f20] transition"
        >
          <div className="flex items-center space-x-2">
            <Database className="w-3.5 h-3.5 text-[#81c995]" />
            <span>Database Console</span>
          </div>
          <span className="text-[10px] font-mono text-[#81c995] bg-[#81c995]/15 px-1.5 py-0.2 rounded">Firestore</span>
        </button>

        <button
          onClick={() => onChangeViewMode('api')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#c4c7c5] hover:text-white hover:bg-[#1e1f20] transition"
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-3.5 h-3.5 text-[#fdd663]" />
            <span>REST API Console</span>
          </div>
          <span className="text-[10px] font-mono text-[#fdd663] bg-[#fdd663]/15 px-1.5 py-0.2 rounded">5 Routes</span>
        </button>
      </div>

      {/* Segmented Sub-navigation: Prompts / Files / Staff */}
      <div className="flex items-center px-3 pt-2 pb-1 border-b border-[#282a2c] gap-1">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex-1 py-1 text-[11px] font-medium rounded text-center transition ${
            activeTab === 'prompts'
              ? 'bg-[#1e1f20] text-white border border-[#282a2c]'
              : 'text-[#8e918f] hover:text-[#e3e3e3]'
          }`}
        >
          Prompts
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`flex-1 py-1 text-[11px] font-medium rounded text-center transition ${
            activeTab === 'files'
              ? 'bg-[#1e1f20] text-white border border-[#282a2c]'
              : 'text-[#8e918f] hover:text-[#e3e3e3]'
          }`}
        >
          Files ({files.length})
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`flex-1 py-1 text-[11px] font-medium rounded text-center transition ${
            activeTab === 'agents'
              ? 'bg-[#1e1f20] text-white border border-[#282a2c]'
              : 'text-[#8e918f] hover:text-[#e3e3e3]'
          }`}
        >
          Staff (41)
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {activeTab === 'prompts' && (
          <>
            {/* Search filter */}
            <div className="relative px-1 mb-2">
              <Search className="w-3.5 h-3.5 text-[#8e918f] absolute left-3 top-2" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1f20] border border-[#282a2c] rounded-md pl-7 pr-2 py-1 text-xs text-[#e3e3e3] placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            {/* List of prompts */}
            <div className="space-y-0.5">
              {filteredPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => onSelectPrompt(prompt.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition group ${
                    activePromptId === prompt.id
                      ? 'bg-[#1e1f20] text-white border border-[#282a2c] shadow-sm'
                      : 'text-[#c4c7c5] hover:bg-[#1e1f20]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2 min-w-0">
                    {prompt.type === 'chat' && <MessageSquare className="w-3.5 h-3.5 text-[#7cacf8] mt-0.5 shrink-0" />}
                    {prompt.type === 'freeform' && <FileText className="w-3.5 h-3.5 text-[#c58af9] mt-0.5 shrink-0" />}
                    {prompt.type === 'structured' && <Braces className="w-3.5 h-3.5 text-[#81c995] mt-0.5 shrink-0" />}
                    <div className="min-w-0">
                      <div className="font-medium truncate">{prompt.title}</div>
                      <div className="flex items-center space-x-1.5 text-[10px] text-[#8e918f] font-mono mt-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{prompt.updatedAt}</span>
                        <span>•</span>
                        <span>{prompt.tokenCount}t</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'files' && (
          <div className="space-y-0.5">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => { onSelectFile(file.id); onChangeViewMode('code'); }}
                className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-[#c4c7c5] hover:bg-[#1e1f20] hover:text-white transition group"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#7cacf8] shrink-0" />
                  <span className="truncate font-mono text-[11px]">{file.name}</span>
                </div>
                {file.status === 'modified' && (
                  <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30">
                    MOD
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-3">
            {/* Executive Chiefs */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#8e918f] px-2 py-0.5">
                <span>5 Executive Chiefs</span>
                <span className="text-[#fdd663]">Leadership</span>
              </div>
              {executiveChiefs.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => onChangeViewMode('firm_org')}
                  className="p-2 rounded-lg bg-[#1e1f20]/60 hover:bg-[#1e1f20] border border-[#282a2c]/40 hover:border-[#7cacf8]/40 cursor-pointer transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">{agent.avatarSymbol}</span>
                      <span className="text-xs font-semibold text-white">{agent.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#fdd663] bg-[#fdd663]/10 px-1 py-0.2 rounded border border-[#fdd663]/20">
                      Chief
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8e918f] truncate mt-0.5">
                    {agent.title}
                  </div>
                </div>
              ))}
            </div>

            {/* View Full 41 Roster CTA */}
            <div className="pt-2 border-t border-[#282a2c]">
              <button
                onClick={() => onChangeViewMode('firm_org')}
                className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-[#1a73e8]/20 hover:bg-[#1a73e8]/30 border border-[#1a73e8]/40 text-[#7cacf8] text-xs font-medium transition"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Open Full 41-Staff Org</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
