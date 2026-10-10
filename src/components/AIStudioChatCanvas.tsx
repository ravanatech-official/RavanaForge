import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  RotateCcw, 
  Trash2, 
  Paperclip, 
  Terminal, 
  Search, 
  Braces, 
  Send, 
  Sparkles, 
  Loader2, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  FileCode2, 
  Mic, 
  Sliders,
  Flame,
  ArrowRight
} from 'lucide-react';
import { AIStudioTurn, AIStudioParams } from '../types/aistudio';

interface AIStudioChatCanvasProps {
  turns: AIStudioTurn[];
  params: AIStudioParams;
  onChangeParams: (newParams: AIStudioParams) => void;
  onSendPrompt: (promptText: string) => void;
  isGenerating: boolean;
  onClearChat: () => void;
  onRegenerateLast: () => void;
  onApplyCodeToFile?: (filename: string, code: string) => void;
}

export const AIStudioChatCanvas: React.FC<AIStudioChatCanvasProps> = ({
  turns,
  params,
  onChangeParams,
  onSendPrompt,
  isGenerating,
  onClearChat,
  onRegenerateLast,
  onApplyCodeToFile,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSystemInstructionOpen, setIsSystemInstructionOpen] = useState(true);
  const [copiedTurnId, setCopiedTurnId] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll on new turn or generating
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isGenerating]);

  // Handle Ctrl+Enter / Cmd+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim() || isGenerating) return;
    onSendPrompt(inputText.trim());
    setInputText('');
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTurnId(id);
    setTimeout(() => setCopiedTurnId(null), 2000);
  };

  const handleCopyCode = (code: string, codeKey: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(codeKey);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const toggleThought = (turnId: string) => {
    setExpandedThoughts((prev) => ({
      ...prev,
      [turnId]: !prev[turnId],
    }));
  };

  // Quick suggestion prompts
  const suggestions = [
    { label: '🚀 Raptor 3 Monolithic Engine', text: 'Apply SpaceX Raptor 3 engine philosophy to create a zero-copy, sub-millisecond Go state machine.' },
    { label: '🛡️ Zero-Trust Security Audit', text: 'Scan our distributed cluster architecture for race conditions, unbounded heap allocation, and auth bypass.' },
    { label: '⚡ Quorum Lockless Channel', text: 'Synthesize lock-free atomic ring buffers for high-concurrency order processing.' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#131314] overflow-hidden select-text">
      {/* Scrollable Canvas Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl w-full mx-auto">
        
        {/* System Instructions Collapsible Card (Google AI Studio iconic section) */}
        <div className="border border-[#282a2c] bg-[#1e1f20]/60 rounded-xl overflow-hidden transition shadow-sm">
          <button
            onClick={() => setIsSystemInstructionOpen(!isSystemInstructionOpen)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#1e1f20] transition select-none"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-semibold text-[#e3e3e3] flex items-center gap-1.5">
                System Instructions
                <span className="text-[10px] text-[#8e918f] font-normal">(Optional)</span>
              </span>
              <span className="text-[10px] font-mono text-[#7cacf8] bg-[#1a73e8]/10 px-1.5 py-0.2 rounded border border-[#1a73e8]/30">
                {Math.round(params.systemInstruction.length / 4)} tokens
              </span>
            </div>
            {isSystemInstructionOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8e918f]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8e918f]" />
            )}
          </button>

          {isSystemInstructionOpen && (
            <div className="px-4 pb-3 pt-1 border-t border-[#282a2c]/60">
              <textarea
                value={params.systemInstruction}
                onChange={(e) => onChangeParams({ ...params, systemInstruction: e.target.value })}
                placeholder="Give the model instructions and define its persona, constraints, and engineering guidelines..."
                rows={3}
                className="w-full bg-[#131314] border border-[#282a2c] rounded-lg p-2.5 text-xs text-[#e3e3e3] placeholder-[#8e918f] font-mono focus:outline-none focus:border-[#1a73e8] leading-relaxed resize-y"
              />
            </div>
          )}
        </div>

        {/* Turns conversation history */}
        <div className="space-y-6">
          {turns.map((turn) => {
            const isUser = turn.role === 'user';
            const isCopied = copiedTurnId === turn.id;
            const isThoughtOpen = expandedThoughts[turn.id] ?? false;

            return (
              <div 
                key={turn.id} 
                className={`group flex flex-col space-y-2 rounded-2xl p-4 transition ${
                  isUser 
                    ? 'bg-[#1e1f20] border border-[#282a2c]' 
                    : 'bg-[#18191a] border border-[#282a2c]/80'
                }`}
              >
                {/* Turn Header */}
                <div className="flex items-center justify-between select-none">
                  <div className="flex items-center space-x-2">
                    {isUser ? (
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white text-[10px] font-bold">
                        U
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#c58af9] flex items-center justify-center text-white text-[10px]">
                        <Sparkles className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-[#e3e3e3]">
                      {isUser ? 'User' : (turn.modelUsed || 'Model')}
                    </span>
                    <span className="text-[10px] text-[#8e918f] font-mono">
                      {turn.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyText(turn.content, turn.id)}
                      className="p-1 rounded text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#282a2c] transition"
                      title="Copy response"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#81c995]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Thinking Process Accordion (Iconic Google AI Studio Gemini 2.0+ feature) */}
                {!isUser && turn.thought && (
                  <div className="border border-[#282a2c] bg-[#131314]/80 rounded-xl overflow-hidden mt-1 text-xs">
                    <button
                      onClick={() => toggleThought(turn.id)}
                      className="w-full px-3 py-2 flex items-center justify-between text-left text-[#8e918f] hover:text-[#c4c7c5] hover:bg-[#1e1f20] transition select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-[#7cacf8]" />
                        <span className="font-medium">
                          Thinking Process
                        </span>
                        {turn.thoughtSeconds && (
                          <span className="text-[10px] font-mono text-[#7cacf8] bg-[#1a73e8]/10 px-1 py-0.2 rounded">
                            {turn.thoughtSeconds}s
                          </span>
                        )}
                      </div>
                      {isThoughtOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isThoughtOpen && (
                      <div className="p-3 border-t border-[#282a2c] text-[#8e918f] text-[11px] font-mono leading-relaxed whitespace-pre-wrap bg-[#131314]">
                        {turn.thought}
                      </div>
                    )}
                  </div>
                )}

                {/* Tool Calls Execution Box */}
                {!isUser && turn.toolCalls && turn.toolCalls.length > 0 && (
                  <div className="space-y-1.5 my-1">
                    {turn.toolCalls.map((tc, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start space-x-2 p-2 rounded-lg bg-[#131314] border border-[#282a2c] text-[11px] font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#81c995] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[#7cacf8] font-semibold">{tc.name}</span>
                          <span className="text-[#8e918f] mx-1.5">→</span>
                          <span className="text-[#c4c7c5]">{tc.result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Content Body */}
                <div className="text-xs md:text-sm text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                  {turn.content}
                </div>

                {/* Code Blocks */}
                {!isUser && turn.codeBlocks && turn.codeBlocks.map((cb, cIdx) => {
                  const codeKey = `${turn.id}-${cIdx}`;
                  const isCodeCopied = copiedCodeIndex === codeKey;

                  return (
                    <div key={cIdx} className="rounded-xl border border-[#282a2c] bg-[#0d0e0f] overflow-hidden my-2 shadow-md">
                      <div className="h-8 px-3 bg-[#1e1f20] border-b border-[#282a2c] flex items-center justify-between text-xs select-none">
                        <div className="flex items-center space-x-2 font-mono text-[11px] text-[#c4c7c5]">
                          <FileCode2 className="w-3.5 h-3.5 text-[#7cacf8]" />
                          <span>{cb.filename || `${cb.language} snippet`}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {onApplyCodeToFile && cb.filename && (
                            <button
                              onClick={() => onApplyCodeToFile(cb.filename!, cb.code)}
                              className="flex items-center space-x-1 text-[11px] text-[#81c995] hover:text-white px-2 py-0.5 rounded bg-[#81c995]/10 border border-[#81c995]/30 transition"
                              title="Sync code into active workspace IDE"
                            >
                              <span>Apply to IDE</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleCopyCode(cb.code, codeKey)}
                            className="flex items-center space-x-1 text-[11px] text-[#8e918f] hover:text-[#e3e3e3] px-2 py-0.5 rounded hover:bg-[#282a2c] transition"
                          >
                            {isCodeCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#81c995]" />
                                <span className="text-[#81c995]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <pre className="p-3 text-[11px] md:text-xs font-mono text-[#c4c7c5] overflow-x-auto leading-relaxed">
                        <code>{cb.code}</code>
                      </pre>
                    </div>
                  );
                })}

                {/* Turn Footer stats */}
                {!isUser && (
                  <div className="flex items-center justify-between pt-1 text-[10px] text-[#8e918f] font-mono">
                    <div className="flex items-center space-x-2">
                      {turn.tokens && <span>{turn.tokens} tokens</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={onRegenerateLast}
                        className="flex items-center space-x-1 hover:text-[#e3e3e3] transition"
                        title="Regenerate this response"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Generating Indicator Bubble */}
          {isGenerating && (
            <div className="rounded-2xl p-4 bg-[#18191a] border border-[#282a2c] flex items-center space-x-3 text-xs text-[#8e918f] animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-[#1a73e8]" />
              <div className="flex items-center space-x-2">
                <span>Model thinking and synthesizing code...</span>
                <span className="font-mono text-[10px] text-[#7cacf8]">(Streaming verified)</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestion Quick Chips if conversation is short */}
        {turns.length <= 2 && (
          <div className="pt-2">
            <div className="text-[11px] font-medium text-[#8e918f] mb-2">Suggested engineering prompts:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => onSendPrompt(sug.text)}
                  className="p-2.5 rounded-xl bg-[#1e1f20]/60 hover:bg-[#1e1f20] border border-[#282a2c] text-left transition group"
                >
                  <div className="text-xs font-semibold text-[#e3e3e3] group-hover:text-white mb-1">
                    {sug.label}
                  </div>
                  <div className="text-[10px] text-[#8e918f] line-clamp-2 leading-snug">
                    {sug.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Iconic Google AI Studio Bottom Input Dock */}
      <div className="p-4 border-t border-[#282a2c] bg-[#131314]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#1e1f20] border border-[#282a2c] focus-within:border-[#1a73e8] shadow-lg transition-all p-3 space-y-2">
            {/* Input Textarea */}
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type something, or press Ctrl+Enter to run..."
              className="w-full bg-transparent text-xs md:text-sm text-[#e3e3e3] placeholder-[#8e918f] focus:outline-none resize-none leading-relaxed"
            />

            {/* Bottom Controls Bar inside Input Box */}
            <div className="flex items-center justify-between pt-1 select-none">
              {/* Attachment, Tools & Tokens */}
              <div className="flex items-center space-x-2 text-xs">
                {/* Add files / media button */}
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#282a2c] transition"
                  title="Attach files or media context"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Grounding Status Pill */}
                <button
                  type="button"
                  onClick={() => onChangeParams({ ...params, groundingSearch: !params.groundingSearch })}
                  className={`flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-medium border transition ${
                    params.groundingSearch
                      ? 'bg-[#1a73e8]/10 text-[#7cacf8] border-[#1a73e8]/30'
                      : 'bg-transparent text-[#8e918f] border-[#282a2c] hover:text-white'
                  }`}
                  title="Toggle Google Search Grounding"
                >
                  <Search className="w-3 h-3" />
                  <span className="hidden sm:inline">Search Grounding</span>
                </button>

                {/* Code Execution Pill */}
                <button
                  type="button"
                  onClick={() => onChangeParams({ ...params, codeExecution: !params.codeExecution })}
                  className={`flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-medium border transition ${
                    params.codeExecution
                      ? 'bg-[#81c995]/10 text-[#81c995] border-[#81c995]/30'
                      : 'bg-transparent text-[#8e918f] border-[#282a2c] hover:text-white'
                  }`}
                  title="Toggle Code Execution Sandbox"
                >
                  <Terminal className="w-3 h-3" />
                  <span className="hidden sm:inline">Code Execution</span>
                </button>
              </div>

              {/* Right side: Token Counter & Send/Run Button */}
              <div className="flex items-center space-x-2.5">
                <div className="text-[10px] font-mono text-[#8e918f]">
                  {inputText.length > 0 ? `${Math.round(inputText.length / 4)} tokens` : '0 tokens'}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isGenerating}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition-all ${
                    !inputText.trim() || isGenerating
                      ? 'bg-[#282a2c] text-[#8e918f] cursor-not-allowed'
                      : 'bg-[#1a73e8] hover:bg-[#1b66c9] text-white shadow-[#1a73e8]/30 hover:scale-[1.02]'
                  }`}
                  title="Send prompt (Ctrl+Enter)"
                >
                  {isGenerating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Run</span>
                      <Send className="w-3 h-3 ml-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-[#8e918f] mt-1.5 font-mono">
            RavanaForge AI Studio may display invariant synthesis proofs. Press <kbd className="bg-[#1e1f20] px-1 py-0.2 rounded border border-[#282a2c]">Ctrl+Enter</kbd> to execute.
          </div>
        </div>
      </div>
    </div>
  );
};
