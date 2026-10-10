import React, { useState } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  FileText, 
  Plus, 
  Trash2,
  ChevronDown
} from 'lucide-react';
import { AIStudioParams } from '../types/aistudio';

interface AIStudioFreeformCanvasProps {
  params: AIStudioParams;
  onRunFreeform: (prompt: string) => Promise<string>;
}

export const AIStudioFreeformCanvas: React.FC<AIStudioFreeformCanvasProps> = ({
  params,
  onRunFreeform,
}) => {
  const [content, setContent] = useState(`You are evaluating a mission-critical web backend solution for an enterprise client.

Input Requirement:
Client needs a high-frequency real-time booking engine handling 100,000 transactions per second with zero double-booking and sub-2ms response time.

Engineering Specification:
1. Concurrency Model:
2. Database / In-Memory State:
3. Network Transport:
4. Failure Invariants:

Generate the complete architecture specification:`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleRun = async () => {
    if (!content.trim() || isRunning) return;
    setIsRunning(true);
    try {
      const res = await onRunFreeform(content);
      setOutput(res);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#131314] overflow-hidden select-text p-4 md:p-6">
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col space-y-4">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#282a2c] pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#c58af9]" />
            <h2 className="text-sm font-semibold text-[#e3e3e3]">Freeform Prompt Workspace</h2>
            <span className="text-[10px] font-mono text-[#8e918f] bg-[#1e1f20] px-2 py-0.5 rounded border border-[#282a2c]">
              Raw Context Playground
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition ${
                isRunning
                  ? 'bg-[#1a73e8]/70 text-white cursor-wait'
                  : 'bg-[#1a73e8] hover:bg-[#1b66c9] text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Freeform</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Grid: Prompt on left/top, Output on right/bottom */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
          {/* Prompt Input Box */}
          <div className="flex flex-col bg-[#1e1f20]/60 border border-[#282a2c] rounded-xl overflow-hidden">
            <div className="h-8 px-3 bg-[#1e1f20] border-b border-[#282a2c] flex items-center justify-between text-xs text-[#8e918f]">
              <span className="font-medium text-[#c4c7c5]">Prompt Input</span>
              <span className="font-mono text-[10px]">{Math.round(content.length / 4)} tokens</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 bg-transparent p-3 text-xs md:text-sm font-mono text-[#e3e3e3] focus:outline-none resize-none leading-relaxed overflow-y-auto"
              placeholder="Write your freeform prompt here..."
            />
          </div>

          {/* Model Output Box */}
          <div className="flex flex-col bg-[#1e1f20]/60 border border-[#282a2c] rounded-xl overflow-hidden">
            <div className="h-8 px-3 bg-[#1e1f20] border-b border-[#282a2c] flex items-center justify-between text-xs text-[#8e918f]">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#7cacf8]" />
                <span className="font-medium text-[#c4c7c5]">Model Response</span>
              </div>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-[11px] hover:text-white transition"
                >
                  {isCopied ? <Check className="w-3 h-3 text-[#81c995]" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 p-3 text-xs md:text-sm font-mono text-[#e3e3e3] overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {output ? (
                output
              ) : isRunning ? (
                <div className="flex items-center space-x-2 text-[#8e918f] p-4">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1a73e8]" />
                  <span>Synthesizing monolithic Raptor 3 architecture output...</span>
                </div>
              ) : (
                <div className="text-[#8e918f] italic p-4 text-center">
                  Click "Run Freeform" to generate model response with active parameters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
