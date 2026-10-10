import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Sparkles } from 'lucide-react';

interface SharePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptTitle: string;
}

export const SharePromptModal: React.FC<SharePromptModalProps> = ({
  isOpen,
  onClose,
  promptTitle,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1f20] border border-[#282a2c] rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-14 px-5 border-b border-[#282a2c] flex items-center justify-between bg-[#131314]">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-[#7cacf8]" />
            <h3 className="text-sm font-semibold text-[#e3e3e3]">Share prompt</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8e918f] hover:text-white hover:bg-[#282a2c] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-[#c4c7c5]">
          <p>
            Anyone with this link can view this Google AI Studio prompt and run live engineering iterations on the RavanaForge Foundry.
          </p>

          <div className="p-3 rounded-xl bg-[#131314] border border-[#282a2c] flex items-center justify-between">
            <div className="truncate font-mono text-[11px] text-[#e3e3e3] mr-2">
              {shareUrl}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] text-white font-medium shrink-0 shadow transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#81c995] bg-[#81c995]/10 p-2.5 rounded-lg border border-[#81c995]/20">
            <Globe className="w-4 h-4 shrink-0" />
            <span>Deployed live on Google Firebase Hosting at <strong>https://ravanaforge.web.app</strong></span>
          </div>
        </div>

        <div className="p-4 border-t border-[#282a2c] bg-[#18191a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#282a2c] hover:bg-[#333537] text-white text-xs font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
