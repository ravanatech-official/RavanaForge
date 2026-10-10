import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { AIStudioParams, AIStudioTurn } from '../types/aistudio';

interface GetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: AIStudioParams;
  lastTurnContent: string;
}

export const GetCodeModal: React.FC<GetCodeModalProps> = ({
  isOpen,
  onClose,
  params,
  lastTurnContent,
}) => {
  const [activeLang, setActiveLang] = useState<'ts' | 'py' | 'curl'>('ts');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promptSnippet = (lastTurnContent || 'Architect high performance web solution').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  const systemInstructionSnippet = params.systemInstruction.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  // Generate TypeScript code with modern @google/genai SDK
  const tsCode = `// Install official SDK: npm install @google/genai
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

async function main() {
  const response = await ai.models.generateContent({
    model: '${params.modelId}',
    contents: '${promptSnippet}',
    config: {
      systemInstruction: '${systemInstructionSnippet}',
      temperature: ${params.temperature},
      topP: ${params.topP},
      topK: ${params.topK},
      maxOutputTokens: ${params.maxOutputTokens},
      ${params.groundingSearch ? 'tools: [{ googleSearch: {} }],\n' : ''}
    },
  });

  console.log(response.text);
}

main();`;

  // Generate Python code
  const pyCode = `# Install official SDK: pip install google-genai
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model='${params.modelId}',
    contents='${promptSnippet.replace(/"/g, '\\"')}',
    config=types.GenerateContentConfig(
        system_instruction='${systemInstructionSnippet.replace(/"/g, '\\"')}',
        temperature=${params.temperature},
        top_p=${params.topP},
        top_k=${params.topK},
        max_output_tokens=${params.maxOutputTokens},
        ${params.groundingSearch ? "tools=[{'google_search': {}}]," : ''}
    ),
)

print(response.text)`;

  // Generate cURL code
  const curlCode = `curl "https://generativelanguage.googleapis.com/v1beta/models/${params.modelId}:generateContent" \\
  -H "Content-Type: application/json" \\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\
  -X POST \\
  -d '{
    "systemInstruction": {
      "parts": [{ "text": "${systemInstructionSnippet.replace(/"/g, '\\"')}" }]
    },
    "contents": [{
      "parts": [{ "text": "${promptSnippet.replace(/"/g, '\\"')}" }]
    }],
    "generationConfig": {
      "temperature": ${params.temperature},
      "topP": ${params.topP},
      "topK": ${params.topK},
      "maxOutputTokens": ${params.maxOutputTokens}
    }
  }'`;

  const codeToShow = activeLang === 'ts' ? tsCode : activeLang === 'py' ? pyCode : curlCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToShow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#1e1f20] border border-[#282a2c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="h-14 px-5 border-b border-[#282a2c] flex items-center justify-between bg-[#131314]">
          <div className="flex items-center space-x-2.5">
            <Code2 className="w-5 h-5 text-[#7cacf8]" />
            <h3 className="text-sm font-semibold text-[#e3e3e3]">Get code</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8e918f] hover:text-white hover:bg-[#282a2c] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="px-5 py-3 border-b border-[#282a2c] bg-[#18191a] flex items-center justify-between">
          <div className="flex items-center space-x-1.5 bg-[#131314] p-1 rounded-lg border border-[#282a2c]">
            <button
              onClick={() => setActiveLang('ts')}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                activeLang === 'ts'
                  ? 'bg-[#1a73e8] text-white shadow-sm'
                  : 'text-[#8e918f] hover:text-[#e3e3e3]'
              }`}
            >
              JavaScript / TypeScript (@google/genai)
            </button>
            <button
              onClick={() => setActiveLang('py')}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                activeLang === 'py'
                  ? 'bg-[#1a73e8] text-white shadow-sm'
                  : 'text-[#8e918f] hover:text-[#e3e3e3]'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setActiveLang('curl')}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                activeLang === 'curl'
                  ? 'bg-[#1a73e8] text-white shadow-sm'
                  : 'text-[#8e918f] hover:text-[#e3e3e3]'
              }`}
            >
              cURL (REST API)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a73e8] hover:bg-[#1b66c9] text-white shadow transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#131314]">
          <pre className="font-mono text-xs text-[#c4c7c5] leading-relaxed whitespace-pre overflow-x-auto p-4 rounded-xl bg-[#0d0e0f] border border-[#282a2c]">
            <code>{codeToShow}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#282a2c] bg-[#18191a] flex items-center justify-between text-xs text-[#8e918f]">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#7cacf8]" />
            <span>Using model: <strong className="text-[#e3e3e3]">{params.modelId}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#e3e3e3] text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
