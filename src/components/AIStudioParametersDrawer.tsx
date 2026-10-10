import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Search, 
  Terminal, 
  Braces, 
  Layers, 
  Cpu, 
  Zap,
  Info
} from 'lucide-react';
import { AIStudioModel, AIStudioParams, SafetyThreshold } from '../types/aistudio';

interface AIStudioParametersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  params: AIStudioParams;
  onChangeParams: (newParams: AIStudioParams) => void;
  availableModels: AIStudioModel[];
  currentTokens: number;
}

export const AIStudioParametersDrawer: React.FC<AIStudioParametersDrawerProps> = ({
  isOpen,
  onClose,
  params,
  onChangeParams,
  availableModels,
  currentTokens,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [stopInput, setStopInput] = useState('');

  if (!isOpen) return null;

  const currentModel = availableModels.find((m) => m.id === params.modelId) || availableModels[0];
  const contextRatio = (currentTokens / currentModel.contextWindow) * 100;

  const handleUpdate = <K extends keyof AIStudioParams>(key: K, value: AIStudioParams[K]) => {
    onChangeParams({
      ...params,
      [key]: value,
    });
  };

  const handleAddStopSequence = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && stopInput.trim()) {
      if (!params.stopSequences.includes(stopInput.trim())) {
        handleUpdate('stopSequences', [...params.stopSequences, stopInput.trim()]);
      }
      setStopInput('');
    }
  };

  const handleRemoveStopSequence = (seq: string) => {
    handleUpdate('stopSequences', params.stopSequences.filter((s) => s !== seq));
  };

  return (
    <aside className="w-80 border-l border-[#282a2c] bg-[#131314] flex flex-col shrink-0 select-none h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Drawer Header */}
      <div className="h-12 px-4 border-b border-[#282a2c] flex items-center justify-between sticky top-0 bg-[#131314] z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e3e3e3]">
            Run settings
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#1e1f20] transition"
          title="Close parameters drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-6 flex-1 text-xs text-[#c4c7c5]">
        {/* Model Selector Card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-medium text-[#e3e3e3]">Model</label>
            <span className="text-[10px] font-mono text-[#7cacf8] bg-[#1a73e8]/10 px-1.5 py-0.5 rounded border border-[#1a73e8]/30">
              {currentModel.tag}
            </span>
          </div>

          <div className="relative">
            <select
              value={params.modelId}
              onChange={(e) => handleUpdate('modelId', e.target.value)}
              className="w-full bg-[#1e1f20] hover:bg-[#282a2c] border border-[#282a2c] rounded-lg px-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-[#1a73e8] cursor-pointer"
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id} className="bg-[#1e1f20] text-white">
                  {model.name} {model.badge ? `(${model.badge})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#8e918f] absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <p className="text-[11px] text-[#8e918f] leading-relaxed">
            {currentModel.description}
          </p>

          {/* Context Window visual meter */}
          <div className="mt-3 p-2.5 rounded-lg bg-[#1e1f20]/60 border border-[#282a2c] space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#8e918f]">Context window</span>
              <span className="font-mono text-[#e3e3e3]">
                {currentTokens.toLocaleString()} / {currentModel.contextWindow.toLocaleString()} tokens
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#282a2c] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1a73e8] to-[#7cacf8] rounded-full transition-all duration-300"
                style={{ width: `${Math.max(contextRatio, 2)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-[#8e918f] font-mono">
              <span>{(contextRatio).toFixed(2)}% used</span>
              <span>{(currentModel.contextWindow - currentTokens).toLocaleString()} tokens free</span>
            </div>
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" title="Controls randomness of output tokens">
              <label className="font-medium text-[#e3e3e3]">Temperature</label>
              <Info className="w-3 h-3 text-[#8e918f]" />
            </div>
            <input
              type="number"
              step="0.05"
              min="0"
              max="2"
              value={params.temperature}
              onChange={(e) => handleUpdate('temperature', parseFloat(e.target.value) || 0)}
              className="w-14 bg-[#1e1f20] border border-[#282a2c] rounded px-1.5 py-0.5 text-right font-mono text-xs text-white focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={params.temperature}
            onChange={(e) => handleUpdate('temperature', parseFloat(e.target.value))}
            className="w-full accent-[#1a73e8] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8e918f]">
            <span>Precise (0.0)</span>
            <span>Balanced (1.0)</span>
            <span>Creative (2.0)</span>
          </div>
        </div>

        {/* Top P Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" title="Nucleus sampling probability threshold">
              <label className="font-medium text-[#e3e3e3]">Top P</label>
              <Info className="w-3 h-3 text-[#8e918f]" />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={params.topP}
              onChange={(e) => handleUpdate('topP', parseFloat(e.target.value) || 0)}
              className="w-14 bg-[#1e1f20] border border-[#282a2c] rounded px-1.5 py-0.5 text-right font-mono text-xs text-white focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.topP}
            onChange={(e) => handleUpdate('topP', parseFloat(e.target.value))}
            className="w-full accent-[#1a73e8] cursor-pointer"
          />
        </div>

        {/* Top K Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" title="Top K candidate pool count">
              <label className="font-medium text-[#e3e3e3]">Top K</label>
              <Info className="w-3 h-3 text-[#8e918f]" />
            </div>
            <input
              type="number"
              min="1"
              max="64"
              value={params.topK}
              onChange={(e) => handleUpdate('topK', parseInt(e.target.value, 10) || 1)}
              className="w-14 bg-[#1e1f20] border border-[#282a2c] rounded px-1.5 py-0.5 text-right font-mono text-xs text-white focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
          <input
            type="range"
            min="1"
            max="64"
            step="1"
            value={params.topK}
            onChange={(e) => handleUpdate('topK', parseInt(e.target.value, 10))}
            className="w-full accent-[#1a73e8] cursor-pointer"
          />
        </div>

        {/* Max Output Tokens Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" title="Maximum tokens per response turn">
              <label className="font-medium text-[#e3e3e3]">Max output tokens</label>
              <Info className="w-3 h-3 text-[#8e918f]" />
            </div>
            <input
              type="number"
              min="1"
              max={currentModel.maxOutput}
              value={params.maxOutputTokens}
              onChange={(e) => handleUpdate('maxOutputTokens', parseInt(e.target.value, 10) || 1)}
              className="w-16 bg-[#1e1f20] border border-[#282a2c] rounded px-1.5 py-0.5 text-right font-mono text-xs text-white focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
          <input
            type="range"
            min="1"
            max={currentModel.maxOutput}
            step="128"
            value={params.maxOutputTokens}
            onChange={(e) => handleUpdate('maxOutputTokens', parseInt(e.target.value, 10))}
            className="w-full accent-[#1a73e8] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8e918f]">
            <span>1</span>
            <span>{currentModel.maxOutput.toLocaleString()}</span>
          </div>
        </div>

        {/* Safety Settings Accordion */}
        <div className="border border-[#282a2c] rounded-lg overflow-hidden">
          <button
            onClick={() => setIsSafetyOpen(!isSafetyOpen)}
            className="w-full px-3 py-2.5 bg-[#1e1f20]/50 hover:bg-[#1e1f20] flex items-center justify-between text-left transition"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#81c995]" />
              <span className="font-medium text-[#e3e3e3]">Safety settings</span>
            </div>
            {isSafetyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isSafetyOpen && (
            <div className="p-3 space-y-3 bg-[#131314] text-[11px]">
              {(['Harassment', 'Hate speech', 'Sexually explicit', 'Dangerous content'] as const).map((cat) => (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-[#8e918f]">
                    <span>{cat}</span>
                    <span className="text-[#81c995] font-mono">Block few</span>
                  </div>
                  <div className="w-full h-1 bg-[#282a2c] rounded-full overflow-hidden">
                    <div className="h-full bg-[#81c995] w-3/4 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advanced Settings Accordion */}
        <div className="border border-[#282a2c] rounded-lg overflow-hidden">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full px-3 py-2.5 bg-[#1e1f20]/50 hover:bg-[#1e1f20] flex items-center justify-between text-left transition"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-[#fdd663]" />
              <span className="font-medium text-[#e3e3e3]">Advanced capabilities</span>
            </div>
            {isAdvancedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isAdvancedOpen && (
            <div className="p-3 space-y-3.5 bg-[#131314] text-[11px]">
              {/* Google Search Grounding */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-[#7cacf8]" />
                  <div>
                    <div className="text-[#e3e3e3] font-medium">Search Grounding</div>
                    <div className="text-[10px] text-[#8e918f]">Ground answers with real-time web search</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={params.groundingSearch}
                  onChange={(e) => handleUpdate('groundingSearch', e.target.checked)}
                  className="rounded bg-[#1e1f20] border-[#282a2c] text-[#1a73e8] focus:ring-0 w-4 h-4"
                />
              </label>

              {/* Code Execution */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5 text-[#81c995]" />
                  <div>
                    <div className="text-[#e3e3e3] font-medium">Code Execution</div>
                    <div className="text-[10px] text-[#8e918f]">Allow sandbox runtime to evaluate code</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={params.codeExecution}
                  onChange={(e) => handleUpdate('codeExecution', e.target.checked)}
                  className="rounded bg-[#1e1f20] border-[#282a2c] text-[#1a73e8] focus:ring-0 w-4 h-4"
                />
              </label>

              {/* Structured JSON Output */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-2">
                  <Braces className="w-3.5 h-3.5 text-[#c58af9]" />
                  <div>
                    <div className="text-[#e3e3e3] font-medium">Structured Outputs</div>
                    <div className="text-[10px] text-[#8e918f]">Enforce JSON Schema compliance</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={params.structuredOutput}
                  onChange={(e) => handleUpdate('structuredOutput', e.target.checked)}
                  className="rounded bg-[#1e1f20] border-[#282a2c] text-[#1a73e8] focus:ring-0 w-4 h-4"
                />
              </label>

              {/* Stop sequences */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[#e3e3e3] font-medium">Stop sequences</label>
                <div className="flex flex-wrap gap-1 mb-1">
                  {params.stopSequences.map((seq) => (
                    <span 
                      key={seq} 
                      className="inline-flex items-center space-x-1 bg-[#1e1f20] border border-[#282a2c] px-1.5 py-0.5 rounded text-[10px] font-mono"
                    >
                      <span>{seq}</span>
                      <button onClick={() => handleRemoveStopSequence(seq)} className="hover:text-red-400">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type sequence and press Enter"
                  value={stopInput}
                  onChange={(e) => setStopInput(e.target.value)}
                  onKeyDown={handleAddStopSequence}
                  className="w-full bg-[#1e1f20] border border-[#282a2c] rounded px-2 py-1 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pricing / Quota estimate */}
        <div className="p-3 rounded-lg bg-[#1e1f20]/40 border border-[#282a2c] space-y-1 text-[11px]">
          <div className="flex justify-between text-[#8e918f]">
            <span>Estimated session cost</span>
            <span className="font-mono text-[#81c995] font-semibold">$0.00 (Free Tier)</span>
          </div>
          <div className="text-[10px] text-[#8e918f]">
            Generative AI Studio developer rate: 15 RPM / 1M TPM gratis.
          </div>
        </div>
      </div>
    </aside>
  );
};
