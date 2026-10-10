import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  Code2, 
  CheckCircle2, 
  Archive,
  Flame,
  Cloud,
  ExternalLink,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import { VirtualFile, ProjectMission, Agent } from '../types/forge';
import { firebaseConfig } from '../firebase';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: VirtualFile[];
  mission: ProjectMission;
  agents: Agent[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  files,
  mission,
  agents,
}) => {
  const [activeTab, setActiveTab] = useState<'firebase' | 'cli' | 'sdk' | 'yaml' | 'files'>('firebase');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const yamlConfig = `# RavanaForge Orchestration Specification
version: "1.0"
mission:
  title: "${mission.title}"
  stack: [${mission.stack.map((s) => `"${s}"`).join(', ')}]

agents:
${agents
  .map(
    (a) => `  - id: ${a.id}
    name: "${a.name}"
    role: ${a.role}
    model: "${a.model}"
    temperature: ${a.temperature}
    capabilities: [${a.capabilities.map((c) => `"${c}"`).join(', ')}]`
  )
  .join('\n')}

pipeline:
${mission.stages
  .map(
    (s, idx) => `  - step: ${idx + 1}
    name: "${s.name}"
    agent: ${s.agentId}
    requires_approval: ${s.requiresHumanApproval}`
  )
  .join('\n')}
`;

  const pythonSdkSnippet = `from ravanaforge import Swarm, Mission

# Initialize RavanaForge Multi-Agent Swarm
swarm = Swarm.from_config("forge.config.yaml")

# Execute autonomous software engineering lifecycle
mission = Mission(
    title="${mission.title}",
    stack=[${mission.stack.map((s) => `"${s}"`).join(', ')}],
)

result = swarm.execute(
    mission=mission,
    auto_approve_safe_stages=True,
    sast_audit_strict=True
)

print(f"Generated {len(result.artifacts)} files with 100% test pass rate.")
`;

  const tsSdkSnippet = `import { RavanaForgeSwarm, MissionRunner } from '@ravanatech/forge';

const swarm = new RavanaForgeSwarm({
  apiKey: process.env.GEMINI_API_KEY,
  topology: 'sequential-swe',
});

const mission = await swarm.launch({
  title: '${mission.title}',
  stack: [${mission.stack.map((s) => `'${s}'`).join(', ')}],
  onStep: (event) => {
    console.log(\`[\${event.agentName}] \${event.action}\`);
  }
});

await mission.awaitCompletion();
`;

  const downloadAllFiles = () => {
    const payload = JSON.stringify({ mission, files, agents }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ravanaforge-${mission.id}-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Export Project & RavanaForge SDK Spec
              </h2>
              <p className="text-xs text-slate-400">
                Run via CLI locally, embed in CI/CD, or download synthesized codebase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="px-6 pt-3 border-b border-slate-800 flex space-x-4 bg-slate-900/40">
          {[
            { id: 'firebase', label: '🔥 Firebase CI/CD Deploy' },
            { id: 'cli', label: 'CLI Commands' },
            { id: 'yaml', label: 'forge.config.yaml' },
            { id: 'sdk', label: 'Python / TS SDK' },
            { id: 'files', label: `Files Bundle (${files.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs">
          {activeTab === 'firebase' && (
            <div className="space-y-4">
              {/* Live Project Target Info */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Firebase Project Connected: ravanaforge</div>
                      <div className="text-xs text-amber-300/80 font-mono">https://ravanaforge.firebaseapp.com</div>
                    </div>
                  </div>
                  <a
                    href="https://ravanaforge.firebaseapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-xs font-medium transition"
                  >
                    <span>Open URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Push to Git -> Auto Deploy Flow */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-sans font-semibold text-xs mb-2">
                  <GitBranch className="w-4 h-4" />
                  <span>1. Push to Git → Automatic Firebase Deployment</span>
                </div>
                <p className="text-slate-400 font-sans text-xs mb-3">
                  A GitHub Actions workflow (<code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">.github/workflows/firebase-hosting-merge.yml</code>) is configured in the codebase. Whenever you push to Git, it automatically builds and deploys to Firebase!
                </p>

                {/* Important GitHub Secret Setup notice */}
                <div className="mb-3 p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <div className="font-semibold mb-1 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>GitHub Actions Secret Setup (Required for Auto-Deploy):</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 mb-2">
                    GitHub Actions fails if the Firebase secret is not in your GitHub Repository Settings. Choose either:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                    <li>
                      Run <code className="text-amber-300 bg-slate-900 px-1 rounded">firebase init hosting:github</code> locally to auto-set <code className="text-amber-300">FIREBASE_SERVICE_ACCOUNT_RAVANAFORGE</code>.
                    </li>
                    <li>
                      Or run <code className="text-amber-300 bg-slate-900 px-1 rounded">firebase login:ci</code>, copy the token, and add it to <strong>GitHub Repo → Settings → Secrets &amp; Variables → Actions</strong> as <code className="text-amber-300">FIREBASE_TOKEN</code>.
                    </li>
                  </ol>
                </div>

                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-semibold text-slate-300 font-sans">
                    Terminal commands to push:
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        'git add .\ngit commit -m "feat: ravanaforge live production"\ngit push origin main',
                        'git-push'
                      )
                    }
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copied === 'git-push' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="text-emerald-400 bg-slate-900 p-2.5 rounded font-mono text-[11px] leading-relaxed">
                  git add .<br />
                  git commit -m "feat: ravanaforge live production"<br />
                  git push origin main
                </pre>
              </div>

              {/* Direct Firebase CLI Deploy */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-indigo-400 font-sans font-semibold text-xs mb-2">
                  <Cloud className="w-4 h-4" />
                  <span>2. Direct Deploy via Firebase CLI</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-semibold text-slate-300 font-sans">
                    Build & Deploy command:
                  </span>
                  <button
                    onClick={() =>
                      handleCopy('npm run build && firebase deploy --only hosting', 'fb-deploy')
                    }
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copied === 'fb-deploy' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
                <code className="text-indigo-400 block p-2 bg-slate-900 rounded font-mono text-[11px]">
                  npm run build && firebase deploy --only hosting
                </code>
              </div>

              {/* Embedded Firebase Config Reference */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold text-slate-300 font-sans">
                    App Firebase Config (src/firebase.ts):
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(JSON.stringify(firebaseConfig, null, 2), 'fb-conf')
                    }
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copied === 'fb-conf' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Config</span>
                  </button>
                </div>
                <pre className="text-slate-400 bg-slate-900 p-2.5 rounded font-mono text-[10px] leading-relaxed overflow-x-auto">
                  {JSON.stringify(firebaseConfig, null, 2)}
                </pre>
              </div>
            </div>
          )}
          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Run autonomous forge in your local terminal:
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `npx @ravanatech/forge run --goal "${mission.title}"`,
                        'cli1'
                      )
                    }
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copied === 'cli1' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
                <code className="text-indigo-400 block p-2 bg-slate-900 rounded font-mono">
                  npx @ravanatech/forge run --goal "{mission.title}"
                </code>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Run with custom YAML spec and human-in-the-loop:
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        'npx @ravanatech/forge run --spec ./forge.config.yaml --interactive',
                        'cli2'
                      )
                    }
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copied === 'cli2' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
                <code className="text-indigo-400 block p-2 bg-slate-900 rounded font-mono">
                  npx @ravanatech/forge run --spec ./forge.config.yaml --interactive
                </code>
              </div>
            </div>
          )}

          {activeTab === 'yaml' && (
            <div className="relative">
              <button
                onClick={() => handleCopy(yamlConfig, 'yaml')}
                className="absolute top-2 right-2 text-xs flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition"
              >
                {copied === 'yaml' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy YAML</span>
              </button>
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 leading-relaxed overflow-x-auto">
                {yamlConfig}
              </pre>
            </div>
          )}

          {activeTab === 'sdk' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 font-semibold text-[11px]">
                    Python SDK (pip install ravanaforge)
                  </span>
                  <button
                    onClick={() => handleCopy(pythonSdkSnippet, 'py')}
                    className="text-slate-400 hover:text-white flex items-center space-x-1 text-[11px]"
                  >
                    {copied === 'py' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>Copy Python</span>
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 leading-relaxed overflow-x-auto">
                  {pythonSdkSnippet}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 font-semibold text-[11px]">
                    TypeScript SDK (npm install @ravanatech/forge)
                  </span>
                  <button
                    onClick={() => handleCopy(tsSdkSnippet, 'ts')}
                    className="text-slate-400 hover:text-white flex items-center space-x-1 text-[11px]"
                  >
                    {copied === 'ts' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>Copy TypeScript</span>
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 leading-relaxed overflow-x-auto">
                  {tsSdkSnippet}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Export All Project Source Files
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Includes all {files.length} synthesized source files, tests, and ADR docs.
                  </div>
                </div>
                <button
                  onClick={downloadAllFiles}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-1.5 transition font-sans text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Manifest JSON</span>
                </button>
              </div>

              <div className="space-y-1">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80"
                  >
                    <div className="flex items-center space-x-2">
                      <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-slate-300 font-mono text-[11px]">
                        {file.path}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px]">
                      {file.content.split('\n').length} lines
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
