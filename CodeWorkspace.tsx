import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Check, 
  Copy, 
  Download, 
  Split, 
  Edit3, 
  Plus, 
  Trash2,
  Layers,
  Code2,
  Terminal,
  Columns,
  RotateCcw,
  CheckCircle2,
  FileDiff,
  ShieldCheck,
  ChevronRight,
  Play,
  Flame
} from 'lucide-react';
import { VirtualFile, CanvasViewMode, TestCase, SecurityVulnerability, ProjectMission } from '../types/forge';
import { TerminalPanel } from './TerminalPanel';
import { LiveSolutionPreview } from './LiveSolutionPreview';

interface CodeWorkspaceProps {
  files: VirtualFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onUpdateFileContent: (fileId: string, content: string) => void;
  onCreateFile: (path: string) => void;
  onDeleteFile: (fileId: string) => void;
  onRollbackFile?: (fileId: string) => void;
  onApproveFile?: (fileId: string) => void;
  canvasViewMode: CanvasViewMode;
  onChangeCanvasViewMode: (mode: CanvasViewMode) => void;
  terminalLogs: string[];
  testCases: TestCase[];
  securityIssues: SecurityVulnerability[];
  metrics: ProjectMission['metrics'];
  onRunTests: () => void;
  onRunSecurityScan: () => void;
  isTesting: boolean;
  isScanning: boolean;
}

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onUpdateFileContent,
  onCreateFile,
  onDeleteFile,
  onRollbackFile,
  onApproveFile,
  canvasViewMode,
  onChangeCanvasViewMode,
  terminalLogs,
  testCases,
  securityIssues,
  metrics,
  onRunTests,
  onRunSecurityScan,
  isTesting,
  isScanning,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newFilePath, setNewFilePath] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilePath.trim()) return;
    onCreateFile(newFilePath.trim());
    setNewFilePath('');
    setShowNewFileInput(false);
  };

  // Group files into directories for tree view
  const fileTree = React.useMemo(() => {
    const tree: Record<string, VirtualFile[]> = {};
    files.forEach((file) => {
      const parts = file.path.split('/');
      const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
      if (!tree[dir]) tree[dir] = [];
      tree[dir].push(file);
    });
    return tree;
  }, [files]);

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] overflow-hidden">
      {/* 1-Click Canvas Tab Switcher Bar */}
      <div className="h-10 px-3 md:px-4 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none">
        {/* Left View Tabs */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onChangeCanvasViewMode('code')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              canvasViewMode === 'code'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Luxurious full-height code editor"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code View</span>
          </button>

          <button
            onClick={() => onChangeCanvasViewMode('diff')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              canvasViewMode === 'diff'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Side-by-side Git Diff with Instant Rollback"
          >
            <Split className="w-3.5 h-3.5" />
            <span>Git Diff View</span>
            {activeFile?.status === 'modified' && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onChangeCanvasViewMode('terminal')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              canvasViewMode === 'terminal'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Full-height Terminal, Tests & SAST verification"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal & Verification</span>
          </button>

          <button
            onClick={() => onChangeCanvasViewMode('split')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              canvasViewMode === 'split'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Split view (Code on top, Terminal below)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => onChangeCanvasViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              canvasViewMode === 'preview'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Interactive running software solution preview"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Live App Preview</span>
          </button>
        </div>

        {/* Right Active File Snippet */}
        {activeFile && (
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">{activeFile.name}</span>
            <span>•</span>
            <span>{activeFile.language}</span>
            {activeFile.lastEditedBy && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {activeFile.lastEditedBy}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        {canvasViewMode === 'preview' ? (
          <div className="flex-1 h-full overflow-hidden">
            <LiveSolutionPreview />
          </div>
        ) : canvasViewMode === 'terminal' ? (
          <div className="flex-1 h-full overflow-hidden">
            <TerminalPanel
              logs={terminalLogs}
              testCases={testCases}
              securityIssues={securityIssues}
              metrics={metrics}
              onRunTests={onRunTests}
              onRunSecurityScan={onRunSecurityScan}
              isTesting={isTesting}
              isScanning={isScanning}
              isFullHeight={true}
            />
          </div>
        ) : canvasViewMode === 'diff' ? (
          /* Dedicated Side-by-Side Git Diff View with Instant Rollback */
          <div className="flex-1 flex flex-col h-full bg-[#0B0F19] overflow-hidden">
            {/* Diff Header Bar */}
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <FileDiff className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">
                  {activeFile.path} (Git Diff)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                  AST Patch Applied
                </span>
              </div>

              {/* Instant Rollback & Approve Actions */}
              <div className="flex items-center space-x-2">
                {activeFile.previousContent && onRollbackFile && (
                  <button
                    onClick={() => onRollbackFile(activeFile.id)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 hover:text-white transition"
                    title="Rollback this file to original state"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rollback Changes</span>
                  </button>
                )}

                {onApproveFile && (
                  <button
                    onClick={() => onApproveFile(activeFile.id)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
                    title="Accept and approve this diff"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Patch</span>
                  </button>
                )}
              </div>
            </div>

            {/* Side-by-side or Unified Diff View */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Original Code */}
                <div className="rounded-lg border border-rose-900/40 bg-slate-950/80 p-3 space-y-1">
                  <div className="text-[11px] font-bold text-rose-400 border-b border-rose-900/30 pb-1 mb-2 flex items-center justify-between">
                    <span>ORIGINAL COMMIT (Before Patch)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Base Branch</span>
                  </div>
                  <pre className="text-slate-400 text-[11px] leading-relaxed whitespace-pre-wrap">
                    {activeFile.previousContent || activeFile.content}
                  </pre>
                </div>

                {/* Right: Swarm Modified Code */}
                <div className="rounded-lg border border-emerald-900/40 bg-slate-950/80 p-3 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 border-b border-emerald-900/30 pb-1 mb-2 flex items-center justify-between">
                    <span>SWARM SYNTHESIZED (Active Patch)</span>
                    <span className="text-[10px] text-emerald-400 font-normal">Hardened AST</span>
                  </div>
                  <pre className="text-emerald-200 text-[11px] leading-relaxed whitespace-pre-wrap">
                    {activeFile.content}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Code View OR Split View */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className={`flex ${canvasViewMode === 'split' ? 'h-[55%]' : 'h-full'} overflow-hidden`}>
              {/* File Tree Sidebar */}
              <div className="w-52 border-r border-slate-800/80 bg-slate-900/40 flex flex-col shrink-0">
                <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Workspace</span>
                  </div>
                  <button
                    onClick={() => setShowNewFileInput(!showNewFileInput)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                    title="Create new file"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {showNewFileInput && (
                  <form onSubmit={handleAddFileSubmit} className="p-2 border-b border-slate-800 bg-slate-950">
                    <input
                      type="text"
                      autoFocus
                      value={newFilePath}
                      onChange={(e) => setNewFilePath(e.target.value)}
                      placeholder="e.g. src/router.go"
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-white px-2 py-1 rounded focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </form>
                )}

                <div className="flex-1 overflow-y-auto py-2 px-1 space-y-2 text-xs">
                  {Object.entries(fileTree).map(([dir, dirFiles]) => (
                    <div key={dir} className="space-y-0.5">
                      <div className="flex items-center space-x-1 px-2 py-1 text-[11px] font-semibold text-slate-400 font-mono">
                        <Folder className="w-3 h-3 text-amber-500/80" />
                        <span className="truncate">{dir}</span>
                      </div>
                      <div className="pl-3 space-y-0.5">
                        {dirFiles.map((file) => {
                          const isActive = file.id === activeFile?.id;
                          return (
                            <button
                              key={file.id}
                              onClick={() => onSelectFile(file.id)}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition font-mono text-[11px] ${
                                isActive
                                  ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 truncate">
                                <FileCode className="w-3 h-3 text-indigo-400/80 shrink-0" />
                                <span className="truncate">{file.name}</span>
                              </div>
                              {file.status !== 'clean' && (
                                <span
                                  className={`text-[9px] px-1 py-0.2 rounded font-semibold uppercase ${
                                    file.status === 'modified'
                                      ? 'bg-amber-500/20 text-amber-400'
                                      : 'bg-emerald-500/20 text-emerald-400'
                                  }`}
                                >
                                  {file.status.charAt(0)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col bg-[#0B0F19] overflow-hidden">
                {activeFile ? (
                  <>
                    {/* File toolbar */}
                    <div className="px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                      <div className="flex items-center space-x-2">
                        <FileCode className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-mono font-medium text-slate-200">
                          {activeFile.path}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({activeFile.content.split('\n').length} lines)
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {activeFile.previousContent && (
                          <button
                            onClick={() => onChangeCanvasViewMode('diff')}
                            className="flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-purple-950/40 border border-purple-700/50 text-purple-300 hover:text-white transition"
                            title="Inspect diff in side-by-side mode"
                          >
                            <Split className="w-3 h-3" />
                            <span>View Diff</span>
                          </button>
                        )}

                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium border transition ${
                            isEditing
                              ? 'bg-amber-600/20 border-amber-500/40 text-amber-300'
                              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isEditing ? 'Editing' : 'Edit'}</span>
                        </button>

                        <button
                          onClick={handleCopy}
                          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                          title="Copy code"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={handleDownload}
                          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                          title="Download file"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Editor canvas */}
                    <div className="flex-1 overflow-auto flex font-mono text-xs">
                      {/* Line numbers */}
                      <div className="py-3 px-2 bg-slate-950 text-slate-600 select-none text-right shrink-0 font-mono text-[11px] border-r border-slate-900 leading-relaxed">
                        {activeFile.content.split('\n').map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>

                      {/* Content */}
                      {isEditing ? (
                        <textarea
                          value={activeFile.content}
                          onChange={(e) => onUpdateFileContent(activeFile.id, e.target.value)}
                          className="flex-1 p-3 bg-transparent text-slate-100 font-mono text-xs leading-relaxed resize-none focus:outline-none"
                          spellCheck={false}
                        />
                      ) : (
                        <pre className="flex-1 p-3 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
                          <code>{activeFile.content}</code>
                        </pre>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                    Select a file to inspect code
                  </div>
                )}
              </div>
            </div>

            {/* If in Split View, show lower 45% terminal panel */}
            {canvasViewMode === 'split' && (
              <div className="h-[45%] border-t border-slate-800 overflow-hidden">
                <TerminalPanel
                  logs={terminalLogs}
                  testCases={testCases}
                  securityIssues={securityIssues}
                  metrics={metrics}
                  onRunTests={onRunTests}
                  onRunSecurityScan={onRunSecurityScan}
                  isTesting={isTesting}
                  isScanning={isScanning}
                  isFullHeight={true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
