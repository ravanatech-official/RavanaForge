import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Send, 
  Wrench, 
  FileCode, 
  TestTube, 
  ShieldCheck, 
  Sparkles,
  Bot,
  User,
  Trash2,
  ExternalLink,
  BrainCircuit,
  CornerDownRight,
  ShieldAlert
} from 'lucide-react';
import { AgentMessage } from '../types/forge';

interface AgentFeedProps {
  messages: AgentMessage[];
  onSendMessage: (text: string) => void;
  selectedAgentFilter?: string;
  onSelectFile: (filePath: string) => void;
  onClearFeed: () => void;
}

const QUICK_DIRECTIVES = [
  { label: '🛡️ Enforce 64MB Buffer Guard', text: 'Audit and enforce a 64MB buffer threshold guard on incoming RPC payloads in src/cluster/raft_node.go.' },
  { label: '⚡ Run Go Race Fuzzing', text: 'Run the full automated test suite with -race flag and network partition chaos fuzzing.' },
  { label: '📑 Author ADR Quorum Spec', text: 'Author Architecture Decision Record ADR-005 for Raft consensus snapshot isolation.' },
  { label: '🔄 Optimize Mutex Contention', text: 'Refactor ProposeCommand in RaftNode to minimize write-lock contention across concurrent clients.' },
];

export const AgentFeed: React.FC<AgentFeedProps> = ({
  messages,
  onSendMessage,
  selectedAgentFilter,
  onSelectFile,
  onClearFeed,
}) => {
  const [inputText, setInputText] = useState('');
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const toggleThought = (id: string) => {
    setExpandedThoughts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickDirective = (text: string) => {
    onSendMessage(text);
  };

  const filteredMessages = selectedAgentFilter
    ? messages.filter((m) => m.agentId === selectedAgentFilter || m.agentId === 'user')
    : messages;

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] border-r border-slate-800/80">
      {/* Stream Header */}
      <div className="px-3 md:px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200">
            Agent Dialogue & Reasoning Stream
          </span>
          <span className="px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded-full text-[10px] font-mono">
            {filteredMessages.length} events
          </span>
        </div>

        <button
          onClick={onClearFeed}
          className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800 transition"
          title="Clear event transcript"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Stream with Progressive Disclosure */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 font-sans">
        {filteredMessages.map((msg) => {
          const isUser = msg.agentId === 'user';
          const isThoughtExpanded = expandedThoughts[msg.id] ?? false;

          return (
            <div
              key={msg.id}
              className={`rounded-lg border transition-all duration-150 ${
                isUser
                  ? 'bg-indigo-950/25 border-indigo-500/40 ml-3'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Message Header */}
              <div className="px-3 py-2 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/40 rounded-t-lg">
                <div className="flex items-center space-x-2 truncate">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isUser ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {isUser ? <User className="w-3 h-3 text-emerald-400" /> : <Bot className="w-3 h-3 text-indigo-400" />}
                  </div>
                  <span className="font-semibold text-xs text-white truncate">
                    {msg.agentName}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-400">
                    {msg.agentRole.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                  {msg.timestamp}
                </span>
              </div>

              {/* Message Content */}
              <div className="p-3 text-xs text-slate-200 leading-relaxed space-y-2">
                <p>{msg.content}</p>

                {/* Progressive Disclosure: Collapsible Chain of Thought Tree */}
                {msg.thought && (
                  <div className="mt-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => toggleThought(msg.id)}
                      className="flex items-center space-x-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition group select-none"
                    >
                      {isThoughtExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300" />
                      )}
                      <BrainCircuit className="w-3 h-3 text-indigo-400" />
                      <span>Agent Reasoning & Chain of Thought</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {isThoughtExpanded ? '(collapse)' : '(expand)'}
                      </span>
                    </button>

                    {isThoughtExpanded && (
                      <div className="mt-1.5 p-2.5 rounded-md bg-slate-950/80 border border-indigo-900/30 text-[11px] font-mono text-indigo-200/90 leading-relaxed animate-fadeIn">
                        <div className="text-[10px] uppercase tracking-wider text-indigo-400/80 font-bold mb-1 flex items-center space-x-1">
                          <CornerDownRight className="w-3 h-3" />
                          <span>Internal Monologue & Invariant Verification:</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.thought}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* File edit artifact card with 1-click jump */}
                {msg.type === 'file_edit' && msg.targetFile && (
                  <div className="mt-2 p-2 rounded-md bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono text-xs text-slate-300 truncate">
                        {msg.targetFile}
                      </span>
                      {msg.diffSummary && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono shrink-0">
                          {msg.diffSummary}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onSelectFile(msg.targetFile!)}
                      className="flex items-center space-x-1 text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-0.5 rounded hover:bg-slate-800 transition font-mono shrink-0"
                      title="Open in Code Editor"
                    >
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}

                {/* Tool call badge */}
                {msg.type === 'tool_call' && msg.toolName && (
                  <div className="mt-2 p-2 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] font-mono">
                    <div className="flex items-center space-x-1.5 text-purple-400 mb-1">
                      <Wrench className="w-3 h-3" />
                      <span>{msg.toolName}</span>
                    </div>
                    {msg.toolResult && (
                      <div className="text-slate-400 text-[10px] pl-4 border-l border-purple-500/30">
                        {msg.toolResult}
                      </div>
                    )}
                  </div>
                )}

                {/* Test run badge */}
                {msg.type === 'test_run' && (
                  <div className="mt-2 p-2 rounded-md bg-emerald-950/20 border border-emerald-800/40 text-[11px]">
                    <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold mb-1">
                      <TestTube className="w-3.5 h-3.5" />
                      <span>Autonomous Test Suite Verified</span>
                    </div>
                    {msg.toolResult && (
                      <div className="text-slate-300 text-[10px] font-mono">
                        {msg.toolResult}
                      </div>
                    )}
                  </div>
                )}

                {/* Security review badge */}
                {msg.type === 'review' && (
                  <div className="mt-2 p-2 rounded-md bg-rose-950/20 border border-rose-800/40 text-[11px]">
                    <div className="flex items-center space-x-1.5 text-rose-400 font-semibold mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>DevSecOps SAST Audit Complete</span>
                    </div>
                    {msg.toolResult && (
                      <div className="text-slate-300 text-[10px] font-mono">
                        {msg.toolResult}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Directives & Human Steering Input Box */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 shrink-0 space-y-2">
        {/* Preset Silicon Valley Directives */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_DIRECTIVES.map((directive, i) => (
            <button
              key={i}
              onClick={() => handleQuickDirective(directive.text)}
              className="text-[10px] whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-200 border border-slate-700/60 hover:border-indigo-500/40 transition shrink-0 font-medium"
            >
              {directive.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Steer swarm: e.g. 'Harden mutex guards against deadlock'..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-3 pr-10 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-slate-500 font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 p-1 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white transition"
            title="Send directive to swarm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
