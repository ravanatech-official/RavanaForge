import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Code2, 
  Send, 
  X,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight,
  Filter,
  Flame,
  Plus
} from 'lucide-react';
import { Agent, FirmDivision, FirmTicket } from '../types/forge';

interface SoftwareFirmOrgDirectoryProps {
  agents: Agent[];
  tickets: FirmTicket[];
  onDispatchTaskToAgent: (agentId: string, directive: string) => void;
  onSelectAgentForChat: (agentId: string) => void;
  onCreateTicket?: (ticket: Partial<FirmTicket>) => void;
}

export const SoftwareFirmOrgDirectory: React.FC<SoftwareFirmOrgDirectoryProps> = ({
  agents,
  tickets,
  onDispatchTaskToAgent,
  onSelectAgentForChat,
  onCreateTicket,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [dispatchDirective, setDispatchDirective] = useState<string>('');
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [newTicketTitle, setNewTicketTitle] = useState<string>('');
  const [newTicketPriority, setNewTicketPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('high');

  // Divisions list
  const divisions: { id: string; name: string; count: number }[] = [
    { id: 'all', name: 'All Firm Staff', count: agents.length },
    { id: 'Executive Leadership', name: 'Executive Leadership (5 Chiefs)', count: agents.filter(a => a.isExecutive).length },
    { id: 'Architecture & Systems', name: 'Architecture & Systems (7)', count: agents.filter(a => a.division === 'Architecture & Systems').length },
    { id: 'Core Backend & APIs', name: 'Core Backend & APIs (8)', count: agents.filter(a => a.division === 'Core Backend & APIs').length },
    { id: 'Frontend & UI Systems', name: 'Frontend & UI Systems (8)', count: agents.filter(a => a.division === 'Frontend & UI Systems').length },
    { id: 'QA, Security & Resilience', name: 'QA & Security (7)', count: agents.filter(a => a.division === 'QA, Security & Resilience').length },
    { id: 'DevOps & Cloud Infra', name: 'DevOps & Cloud (6)', count: agents.filter(a => a.division === 'DevOps & Cloud Infra').length },
  ];

  // Filtering
  const filteredAgents = agents.filter((agent) => {
    const matchesDivision = 
      selectedDivision === 'all' 
        ? true 
        : selectedDivision === 'Executive Leadership' 
        ? agent.isExecutive 
        : agent.division === selectedDivision;

    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (agent.commanderTitle && agent.commanderTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDivision && matchesSearch;
  });

  // 5 Main Executive Commanders
  const executiveAgents = agents.filter(a => a.isExecutive);
  // Specialized Staff
  const specialistAgents = filteredAgents.filter(a => !a.isExecutive);

  const handleExecuteDispatch = () => {
    if (!selectedAgent || !dispatchDirective.trim()) return;
    onDispatchTaskToAgent(selectedAgent.id, dispatchDirective.trim());
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setIsAssignModalOpen(false);
      setDispatchDirective('');
    }, 1200);
  };

  const handleCreateAndAssignTicket = () => {
    if (!selectedAgent || !newTicketTitle.trim()) return;
    if (onCreateTicket) {
      onCreateTicket({
        title: newTicketTitle.trim(),
        description: `Direct task assigned from Firm Org Directory to ${selectedAgent.name}`,
        priority: newTicketPriority,
        status: 'in_progress',
        assignedToId: selectedAgent.id,
        assignedToName: selectedAgent.name,
        division: selectedAgent.division,
      });
    }
    setNewTicketTitle('');
    setIsAssignModalOpen(false);
  };

  const totalTokens = agents.reduce((sum, a) => sum + a.tokensUsed, 0);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#131314] text-[#e3e3e3]">
      {/* Top Banner & Telemetry Bar */}
      <div className="border-b border-[#282a2c] bg-[#17191a] px-6 py-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-white tracking-tight">Software Firm Org Directory</span>
              <span className="text-xs font-mono text-[#7cacf8] bg-[#1a73e8]/15 px-2 py-0.5 rounded border border-[#1a73e8]/30">
                41 Active Engineers
              </span>
            </div>
            <p className="text-xs text-[#8e918f] mt-1">
              5 Executive Commanders orchestrating 36 specialized swarm engineers across 5 production divisions.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 text-xs text-[#8e918f]">
            <div>
              <span className="text-white font-mono font-medium text-sm tabular-nums">5</span>
              <span className="ml-1 text-[11px]">Executive Chiefs</span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-white font-mono font-medium text-sm tabular-nums">36</span>
              <span className="ml-1 text-[11px]">Swarm Specialists</span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-[#81c995] font-mono font-medium text-sm tabular-nums">{totalTokens.toLocaleString()}</span>
              <span className="ml-1 text-[11px]">Tokens Synthesized</span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-[#c58af9] font-mono font-medium text-sm tabular-nums">{tickets.length}</span>
              <span className="ml-1 text-[11px]">Active Tickets</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-[#282a2c]/60">
          {/* Division Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none py-0.5">
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedDivision === div.id
                    ? 'bg-[#1a73e8] text-white shadow-sm'
                    : 'bg-[#1e1f20] text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]'
                }`}
              >
                {div.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#8e918f] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1f20] border border-[#282a2c] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
        </div>
      </div>

      {/* Main Directory Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8">
        {/* Section 1: 5 MAIN EXECUTIVE COMMANDERS (Only show if 'all' or 'Executive Leadership') */}
        {(selectedDivision === 'all' || selectedDivision === 'Executive Leadership') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#282a2c] pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-white tracking-tight">Executive Leadership & Department Chiefs</span>
                <span className="text-[11px] font-mono text-[#fdd663] bg-[#fdd663]/10 px-2 py-0.5 rounded border border-[#fdd663]/20">
                  5 Sovereign Directors
                </span>
              </div>
              <span className="text-xs text-[#8e918f]">Governing Architecture, Strategy, Backend, UI & CISO</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {executiveAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-[#1a1c1e] border border-[#2e3135] hover:border-[#1a73e8]/70 rounded-xl p-4 flex flex-col justify-between transition-all group hover:shadow-lg hover:shadow-[#1a73e8]/5"
                >
                  <div>
                    {/* Header: Symbol & Role badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#282a2c] border border-[#3c4043] flex items-center justify-center text-lg shadow-inner">
                        {agent.avatarSymbol || '⚡'}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7cacf8] bg-[#1a73e8]/15 px-2 py-0.5 rounded border border-[#1a73e8]/30">
                        Chief Lead
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#7cacf8] transition-colors">
                        {agent.name}
                      </h4>
                      <p className="text-[11px] text-[#8e918f] line-clamp-1 mt-0.5">
                        {agent.title}
                      </p>
                    </div>

                    {/* Current Action / State */}
                    <div className="mt-3 p-2 rounded-lg bg-[#141517] border border-[#282a2c] text-[11px]">
                      <div className="flex items-center space-x-1.5 text-[#8e918f] mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === 'coding' ? 'bg-[#7cacf8]' :
                          agent.status === 'thinking' ? 'bg-[#c58af9]' :
                          agent.status === 'reviewing' ? 'bg-[#fdd663]' :
                          agent.status === 'executing' ? 'bg-[#81c995]' : 'bg-slate-500'
                        }`} />
                        <span className="capitalize font-medium text-white">{agent.status}</span>
                      </div>
                      <p className="text-[#c4c7c5] line-clamp-2 text-[10px] font-mono leading-tight">
                        {agent.currentAction || 'Ready for executive mandate'}
                      </p>
                    </div>

                    {/* Capabilities */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 3).map((cap, i) => (
                        <span key={i} className="text-[10px] text-[#8e918f] bg-[#282a2c]/60 px-1.5 py-0.5 rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="mt-4 pt-3 border-t border-[#282a2c] flex items-center justify-between">
                    <div className="text-[10px] font-mono text-[#8e918f]">
                      <span className="text-white tabular-nums font-medium">{agent.tokensUsed.toLocaleString()}</span> t
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAssignModalOpen(true);
                        }}
                        className="px-2 py-1 rounded bg-[#1e1f20] hover:bg-[#1a73e8] hover:text-white text-[#c4c7c5] text-[11px] font-medium transition"
                        title="Assign task or dispatch directive"
                      >
                        Dispatch
                      </button>
                      <button
                        onClick={() => onSelectAgentForChat(agent.id)}
                        className="p-1 rounded bg-[#1e1f20] hover:bg-[#282a2c] text-[#7cacf8] transition"
                        title="Chat in AI Studio"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: 36 SPECIALIZED DEPARTMENT EMPLOYEES */}
        {selectedDivision !== 'Executive Leadership' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#282a2c] pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-white tracking-tight">Specialized Engineering Swarm</span>
                <span className="text-[11px] font-mono text-[#8e918f]">
                  ({specialistAgents.length} Engineers matching filter)
                </span>
              </div>
              <span className="text-xs text-[#8e918f]">Deep domain experts in Go, React, Rust, Security, Cloud & Chaos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {specialistAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-[#17191a] border border-[#282a2c] hover:border-[#3c4043] rounded-xl p-3.5 flex flex-col justify-between transition-colors group"
                >
                  <div>
                    {/* Top Row: Symbol, Name, Division */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#1e1f20] border border-[#2e3135] flex items-center justify-center text-sm">
                          {agent.avatarSymbol || '⚡'}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white group-hover:text-[#7cacf8] transition-colors">
                            {agent.name}
                          </h4>
                          <span className="text-[10px] text-[#8e918f] line-clamp-1">
                            {agent.division}
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono text-[#8e918f] bg-[#1e1f20] px-1.5 py-0.5 rounded border border-[#282a2c]">
                        {agent.model.includes('Thinking') ? 'Thinking' : 'Flash'}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#c4c7c5] mt-2 font-medium line-clamp-1">
                      {agent.title}
                    </p>

                    {/* Action or Idle state */}
                    <div className="mt-2 text-[10px] text-[#8e918f] font-mono flex items-center space-x-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        agent.status === 'coding' ? 'bg-[#7cacf8]' :
                        agent.status === 'thinking' ? 'bg-[#c58af9]' :
                        agent.status === 'executing' ? 'bg-[#81c995]' : 'bg-[#5f6368]'
                      }`} />
                      <span className="truncate">
                        {agent.currentAction || `Status: ${agent.status}`}
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 2).map((cap, i) => (
                        <span key={i} className="text-[9px] text-[#8e918f] bg-[#1e1f20] px-1.5 py-0.5 rounded border border-[#282a2c]/60">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="mt-3 pt-2.5 border-t border-[#282a2c] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8e918f]">
                      {agent.tokensUsed.toLocaleString()} tokens
                    </span>

                    <button
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsAssignModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded bg-[#1e1f20] hover:bg-[#1a73e8] hover:text-white text-[#c4c7c5] text-[10px] font-medium transition"
                    >
                      Assign Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Modal: Assign Ticket & Dispatch Directive */}
      {isAssignModalOpen && selectedAgent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#1e1f20] border border-[#2e3135] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#282a2c] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#282a2c] flex items-center justify-center text-lg">
                  {selectedAgent.avatarSymbol || '⚡'}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Dispatch to {selectedAgent.name}
                  </h3>
                  <p className="text-xs text-[#8e918f]">
                    {selectedAgent.title} · {selectedAgent.division}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-lg text-[#8e918f] hover:text-white hover:bg-[#282a2c] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Agent System Prompt Preview */}
              <div className="p-3 rounded-xl bg-[#141517] border border-[#282a2c]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8e918f] mb-1">
                  Agent Autonomous Prompt Specification
                </div>
                <p className="text-xs text-[#c4c7c5] leading-relaxed">
                  {selectedAgent.systemPrompt}
                </p>
              </div>

              {/* Directive Input */}
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Direct Autonomous Mandate / Prompt
                </label>
                <textarea
                  rows={3}
                  value={dispatchDirective}
                  onChange={(e) => setDispatchDirective(e.target.value)}
                  placeholder={`e.g., "Synthesize zero-copy ring buffer with 64MB memory bounds for ${selectedAgent.name}..."`}
                  className="w-full bg-[#141517] border border-[#282a2c] rounded-xl p-3 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              {/* Or Create Formal Ticket */}
              <div className="pt-2 border-t border-[#282a2c]">
                <label className="block text-xs font-medium text-white mb-1.5">
                  Or Log Sprint Ticket in Database
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    placeholder="Ticket title (e.g. TCK-Implement Raft Log Compaction)"
                    className="flex-1 bg-[#141517] border border-[#282a2c] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
                  />
                  <select
                    value={newTicketPriority}
                    onChange={(e: any) => setNewTicketPriority(e.target.value)}
                    className="bg-[#141517] border border-[#282a2c] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {dispatchSuccess && (
                <div className="p-2.5 rounded-lg bg-[#81c995]/15 border border-[#81c995]/30 text-[#81c995] text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Mandate successfully dispatched into live agent execution thread!</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-[#282a2c] bg-[#17191a] flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectAgentForChat(selectedAgent.id);
                  setIsAssignModalOpen(false);
                }}
                className="flex items-center space-x-1.5 text-xs text-[#7cacf8] hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open in AI Studio Chat</span>
              </button>

              <div className="flex items-center space-x-2">
                {newTicketTitle.trim() ? (
                  <button
                    onClick={handleCreateAndAssignTicket}
                    className="px-4 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] text-white text-xs font-semibold shadow-sm transition"
                  >
                    Create Ticket
                  </button>
                ) : (
                  <button
                    onClick={handleExecuteDispatch}
                    disabled={!dispatchDirective.trim()}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Directive</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
