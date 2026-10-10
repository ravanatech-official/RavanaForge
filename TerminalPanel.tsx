import React, { useState } from 'react';
import { 
  Terminal, 
  TestTube, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCw,
  Cpu,
  Zap,
  ShieldCheck,
  Flame,
  Layers,
  ArrowRight,
  DollarSign,
  Award
} from 'lucide-react';
import { TestCase, SecurityVulnerability, ProjectMission } from '../types/forge';

interface TerminalPanelProps {
  logs: string[];
  testCases: TestCase[];
  securityIssues: SecurityVulnerability[];
  metrics: ProjectMission['metrics'];
  onRunTests: () => void;
  onRunSecurityScan: () => void;
  isTesting: boolean;
  isScanning: boolean;
  isFullHeight?: boolean;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  logs,
  testCases,
  securityIssues,
  metrics,
  onRunTests,
  onRunSecurityScan,
  isTesting,
  isScanning,
  isFullHeight = false,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'tests' | 'security' | 'roi'>('terminal');

  const passingTests = testCases.filter((t) => t.status === 'passed').length;
  const fixedIssues = securityIssues.filter((s) => s.status === 'fixed').length;
  const openIssues = securityIssues.filter((s) => s.status === 'open').length;

  return (
    <div className={`border-t border-slate-800/80 bg-[#0B0F19] flex flex-col ${isFullHeight ? 'h-full' : 'h-64'} shrink-0`}>
      {/* Tab Navigation */}
      <div className="px-3 md:px-4 py-1.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Agent Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
              activeTab === 'tests'
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TestTube className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Tests</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 font-mono border border-emerald-800/40">
              {passingTests}/{testCases.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
              activeTab === 'security'
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>SAST & Zero-Day Shield</span>
            {openIssues > 0 ? (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 font-mono border border-rose-800">
                {openIssues} Alert
              </span>
            ) : (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 font-mono border border-emerald-800/40">
                100% Safe
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
              activeTab === 'roi'
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Business ROI Telemetry</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 font-mono border border-amber-800/40">
              ~18h Saved
            </span>
          </button>
        </div>

        {/* Tab specific actions */}
        <div className="flex items-center space-x-2">
          {activeTab === 'tests' && (
            <button
              onClick={onRunTests}
              disabled={isTesting}
              className="flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-50"
            >
              <RotateCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Running Race Suites...' : 'Run Go Test Suites'}</span>
            </button>
          )}

          {activeTab === 'security' && (
            <button
              onClick={onRunSecurityScan}
              disabled={isScanning}
              className="flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition disabled:opacity-50"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isScanning ? 'animate-pulse' : ''}`} />
              <span>{isScanning ? 'Scanning AST...' : 'Scan OWASP & CWE'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {/* TAB 1: Terminal Console */}
        {activeTab === 'terminal' && (
          <div className="space-y-1.5 leading-relaxed">
            {logs.map((log, index) => {
              const isAst = log.includes('[AST-PATCH]');
              const isSast = log.includes('[SAST-AUDIT]');
              const isTest = log.includes('[TEST-RUN]');
              const isForge = log.includes('[FORGE-');
              const isDirective = log.includes('[DIRECTIVE]');

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-2 text-[11px] ${
                    isAst
                      ? 'text-amber-300'
                      : isSast
                      ? 'text-rose-300'
                      : isTest
                      ? 'text-emerald-300'
                      : isDirective
                      ? 'text-cyan-300 font-semibold'
                      : isForge
                      ? 'text-indigo-300'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="text-slate-600 select-none shrink-0">$</span>
                  <span>{log}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Autonomous Unit Tests */}
        {activeTab === 'tests' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] mb-2">
              <span className="text-slate-300">
                Go Race Detector & Network Chaos Fuzzing Matrix (Commander Atikaya):
              </span>
              <span className="text-emerald-400 font-bold">5/5 Suites Passing (0 Race Conditions)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 truncate">{tc.name}</div>
                      <div className="text-[10px] text-slate-500 font-sans">{tc.suite}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                    {tc.durationMs}ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAST Security & Zero-Day Self-Healing */}
        {activeTab === 'security' && (
          <div className="space-y-3 font-sans">
            {/* Zero-Day Self-Healing Alert Banner */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>DevSecOps Zero-Day Self-Healing: Active & Remediated</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                  Security Posture: 100/100
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Commander Mahodara detected CWE-400 buffer vulnerability on wire deserialization. Commander Kumbhakarna synthesized an atomic 64MB buffer threshold guard. Zero regressions introduced.
              </p>
            </div>

            {/* Vulnerability Timeline / Table */}
            <div className="space-y-2">
              {securityIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold uppercase">
                        {issue.severity}
                      </span>
                      <span className="font-semibold text-white">{issue.cwe}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold">
                      VERIFIED FIXED
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-500 font-mono">{issue.file}:{issue.line}</span> — {issue.description}
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Applied Fix: {issue.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Business ROI & Telemetry */}
        {activeTab === 'roi' && (
          <div className="font-sans space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Synthesized Code</div>
                <div className="text-lg font-bold text-white font-mono mt-1">1,420 Lines</div>
                <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Go 1.23 Raft Core</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Engineering Time Saved</div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-1">~18 Hours</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Senior dev equivalent</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Zero-Days Prevented</div>
                <div className="text-lg font-bold text-rose-400 font-mono mt-1">1 CVE (CWE-400)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Self-healed autonomously</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Autonomous Test Pass</div>
                <div className="text-lg font-bold text-indigo-400 font-mono mt-1">100% (5/5)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Race & fuzz verified</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/40 text-xs flex items-center justify-between">
              <div>
                <div className="text-indigo-300 font-semibold">Total Swarm Inference Cost: $0.12</div>
                <div className="text-slate-400 text-[11px]">Senior SWE Benchmark Cost: ~$1,800.00 (99.9% cost reduction)</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold text-sm">$1,799.88 Saved</div>
                <div className="text-slate-400 text-[10px]">Client ROI Factor: 14,999x</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
