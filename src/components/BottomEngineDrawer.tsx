import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Database, 
  Code2, 
  Users, 
  Terminal, 
  ShieldCheck, 
  X, 
  Maximize2, 
  Minimize2,
  Sparkles,
  ExternalLink,
  Play
} from 'lucide-react';
import { Agent, FirmTicket, VirtualCommit, SecurityVulnerability, ApiLogRecord, TestCase, ProjectMission } from '../types/forge';
import { DatabaseConsole } from './DatabaseConsole';
import { ApiConsole } from './ApiConsole';
import { SoftwareFirmOrgDirectory } from './SoftwareFirmOrgDirectory';

interface BottomEngineDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: 'database' | 'api' | 'firm_org' | 'logs' | 'tests';
  onChangeTab: (tab: 'database' | 'api' | 'firm_org' | 'logs' | 'tests') => void;
  agents: Agent[];
  tickets: FirmTicket[];
  commits: VirtualCommit[];
  vulnerabilities: SecurityVulnerability[];
  apiLogs: ApiLogRecord[];
  terminalLogs: string[];
  testCases: TestCase[];
  mission: ProjectMission;
  onDispatchTaskToAgent: (agentId: string, directive: string) => void;
  onSelectAgentForChat: (agentId: string) => void;
  onAddTicket: (ticket: Partial<FirmTicket>) => void;
  onDeleteTicket: (id: string) => void;
  onExecuteApiCall: (log: ApiLogRecord) => void;
  onRunTests: () => void;
  onRunSecurityScan: () => void;
}

export const BottomEngineDrawer: React.FC<BottomEngineDrawerProps> = ({
  isOpen,
  onToggle,
  activeTab,
  onChangeTab,
  agents,
  tickets,
  commits,
  vulnerabilities,
  apiLogs,
  terminalLogs,
  testCases,
  mission,
  onDispatchTaskToAgent,
  onSelectAgentForChat,
  onAddTicket,
  onDeleteTicket,
  onExecuteApiCall,
  onRunTests,
  onRunSecurityScan,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div 
      className={`border-t border-[#282a2c] bg-[#141517] transition-all duration-200 flex flex-col shrink-0 z-30 select-none ${
        isOpen ? (isMaximized ? 'h-[75vh]' : 'h-84') : 'h-9'
      }`}
    >
      {/* Drawer Header Strip / Status Bar */}
      <div 
        className="h-9 px-3 bg-[#17191a] border-b border-[#282a2c]/60 flex items-center justify-between cursor-pointer hover:bg-[#1e1f20]/80 transition text-xs"
        onClick={onToggle}
      >
        {/* Left: Tab Selectors */}
        <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { onChangeTab('database'); if (!isOpen) onToggle(); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              isOpen && activeTab === 'database'
                ? 'bg-[#1a73e8] text-white'
                : 'text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Console</span>
            <span className="text-[10px] opacity-75 font-mono">({tickets.length})</span>
          </button>

          <button
            onClick={() => { onChangeTab('api'); if (!isOpen) onToggle(); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              isOpen && activeTab === 'api'
                ? 'bg-[#1a73e8] text-white'
                : 'text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>API Router</span>
            <span className="text-[10px] opacity-75 font-mono">(5)</span>
          </button>

          <button
            onClick={() => { onChangeTab('firm_org'); if (!isOpen) onToggle(); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              isOpen && activeTab === 'firm_org'
                ? 'bg-[#1a73e8] text-white'
                : 'text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>41 Staff Org</span>
            <span className="text-[10px] opacity-75 font-mono">(5 Chiefs)</span>
          </button>

          <button
            onClick={() => { onChangeTab('logs'); if (!isOpen) onToggle(); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              isOpen && activeTab === 'logs'
                ? 'bg-[#1a73e8] text-white'
                : 'text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Swarm Telemetry</span>
          </button>

          <button
            onClick={() => { onChangeTab('tests'); if (!isOpen) onToggle(); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              isOpen && activeTab === 'tests'
                ? 'bg-[#1a73e8] text-white'
                : 'text-[#8e918f] hover:text-white hover:bg-[#282a2c]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SAST & Tests</span>
            <span className="text-[10px] opacity-75 font-mono">(100%)</span>
          </button>
        </div>

        {/* Center: Live Engine Pulse */}
        <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-[#8e918f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#81c995]"></span>
          <span>Raptor-3 Engine Online</span>
          <span>·</span>
          <span>Firebase ravanaforge</span>
        </div>

        {/* Right: Drawer Toggle Controls */}
        <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-[#8e918f] hover:text-white hover:bg-[#282a2c]"
              title={isMaximized ? "Restore height" : "Maximize height"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onToggle}
            className="p-1 rounded text-[#8e918f] hover:text-white hover:bg-[#282a2c] flex items-center space-x-1"
            title={isOpen ? "Collapse drawer" : "Expand drawer"}
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Drawer Expanded Content */}
      {isOpen && (
        <div className="flex-1 overflow-hidden bg-[#131314]">
          {activeTab === 'database' && (
            <DatabaseConsole
              agents={agents}
              tickets={tickets}
              commits={commits}
              vulnerabilities={vulnerabilities}
              apiLogs={apiLogs}
              mission={mission}
              onAddTicket={onAddTicket}
              onDeleteTicket={onDeleteTicket}
            />
          )}

          {activeTab === 'api' && (
            <ApiConsole
              agents={agents}
              tickets={tickets}
              onExecuteApiCall={onExecuteApiCall}
            />
          )}

          {activeTab === 'firm_org' && (
            <SoftwareFirmOrgDirectory
              agents={agents}
              tickets={tickets}
              onDispatchTaskToAgent={onDispatchTaskToAgent}
              onSelectAgentForChat={onSelectAgentForChat}
              onCreateTicket={onAddTicket}
            />
          )}

          {activeTab === 'logs' && (
            <div className="h-full flex flex-col p-3 bg-[#0d0e11] font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-[#8e918f] pb-2 border-b border-[#282a2c]">
                <span>Autonomous Swarm Execution Log Stream</span>
                <span>Active Model: Gemini 2.5 Pro / Flash</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5 pt-2 text-[#c4c7c5]">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-[#7cacf8] shrink-0">&gt;</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="h-full flex flex-col p-4 bg-[#141517] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">SAST Vulnerability Audit & Race Detection</h3>
                  <p className="text-[11px] text-[#8e918f]">Automated verification of 64MB buffer bounds & zero-race quorum</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onRunTests}
                    className="px-3 py-1 rounded bg-[#1e1f20] hover:bg-[#282a2c] text-white text-xs font-medium"
                  >
                    Run Test Fixtures
                  </button>
                  <button
                    onClick={onRunSecurityScan}
                    className="px-3 py-1 rounded bg-[#1a73e8] hover:bg-[#1b66c9] text-white text-xs font-medium"
                  >
                    Run SAST Audit
                  </button>
                </div>
              </div>

              {/* Test Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#1e1f20] border border-[#282a2c] space-y-2">
                  <div className="text-[11px] font-semibold text-[#81c995]">Passed Test Suites ({testCases.length}/5)</div>
                  {testCases.map((tc) => (
                    <div key={tc.id} className="flex items-center justify-between text-xs text-[#c4c7c5] font-mono">
                      <span>{tc.name}</span>
                      <span className="text-[#81c995] text-[10px]">{tc.durationMs}ms</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#1e1f20] border border-[#282a2c] space-y-2">
                  <div className="text-[11px] font-semibold text-[#7cacf8]">Security Audits (CWE Status)</div>
                  {vulnerabilities.map((v) => (
                    <div key={v.id} className="text-xs text-[#c4c7c5]">
                      <div className="font-semibold text-white">{v.cwe}: {v.title}</div>
                      <div className="text-[10px] text-[#81c995] font-mono mt-0.5">Status: {v.status.toUpperCase()} (Hard chamber bound verified)</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
