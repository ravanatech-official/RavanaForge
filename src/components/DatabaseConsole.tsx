import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  FolderGit2,
  ShieldAlert,
  Server,
  X,
  FileJson,
  Edit2
} from 'lucide-react';
import { Agent, FirmTicket, VirtualCommit, SecurityVulnerability, ApiLogRecord, ProjectMission } from '../types/forge';

interface DatabaseConsoleProps {
  agents: Agent[];
  tickets: FirmTicket[];
  commits: VirtualCommit[];
  vulnerabilities: SecurityVulnerability[];
  apiLogs: ApiLogRecord[];
  mission: ProjectMission;
  onAddTicket?: (ticket: Partial<FirmTicket>) => void;
  onDeleteTicket?: (id: string) => void;
}

export const DatabaseConsole: React.FC<DatabaseConsoleProps> = ({
  agents,
  tickets,
  commits,
  vulnerabilities,
  apiLogs,
  mission,
  onAddTicket,
  onDeleteTicket,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>('firm_tickets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddRecordOpen, setIsAddRecordOpen] = useState<boolean>(false);
  const [selectedRecordJson, setSelectedRecordJson] = useState<any | null>(null);

  // New ticket state for add record
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('high');
  const [newTicketAgentId, setNewTicketAgentId] = useState(agents[0]?.id || 'agent_backend_eng');

  const collections = [
    { id: 'firm_tickets', name: 'firm_tickets', count: tickets.length, icon: Layers, desc: 'Active sprint tickets & engineering tasks' },
    { id: 'firm_employees', name: 'firm_employees', count: agents.length, icon: Server, desc: '41 Software firm engineering staff profiles' },
    { id: 'git_commits', name: 'git_commits', count: commits.length, icon: FolderGit2, desc: 'Autonomous git commit history & code diffs' },
    { id: 'security_vulnerabilities', name: 'security_vulnerabilities', count: vulnerabilities.length, icon: ShieldAlert, desc: 'SAST audit logs & CWE findings' },
    { id: 'api_request_logs', name: 'api_request_logs', count: apiLogs.length, icon: Code2, desc: 'Full-stack REST API round-trip telemetry' },
    { id: 'missions', name: 'missions', count: 1, icon: Database, desc: 'Enterprise project mission contracts & blueprints' },
  ];

  // Get active items based on activeCollection
  const getActiveData = () => {
    switch (activeCollection) {
      case 'firm_tickets':
        return tickets.filter(t => 
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.assignedToName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'firm_employees':
        return agents.filter(a => 
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.division.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'git_commits':
        return commits.filter(c => 
          c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.hash.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'security_vulnerabilities':
        return vulnerabilities.filter(v => 
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.cwe.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'api_request_logs':
        return apiLogs.filter(l => 
          l.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.method.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'missions':
        return [mission];
      default:
        return [];
    }
  };

  const currentData = getActiveData();

  // Export collection as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeCollection}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCreateRecord = () => {
    if (!newTicketTitle.trim()) return;
    const assignedAgent = agents.find(a => a.id === newTicketAgentId) || agents[0];
    if (onAddTicket) {
      onAddTicket({
        ticketCode: `TCK-${Math.floor(Math.random() * 900 + 100)}`,
        title: newTicketTitle.trim(),
        description: newTicketDesc.trim() || 'Logged via Database Console',
        priority: newTicketPriority,
        status: 'in_progress',
        assignedToId: assignedAgent.id,
        assignedToName: assignedAgent.name,
        division: assignedAgent.division,
      });
    }
    setNewTicketTitle('');
    setNewTicketDesc('');
    setIsAddRecordOpen(false);
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-[#131314] text-[#e3e3e3]">
      {/* Left Sidebar: Collection Switcher */}
      <div className="w-72 border-r border-[#282a2c] bg-[#17191a] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#282a2c]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#1a73e8]/20 border border-[#1a73e8]/40 flex items-center justify-center text-[#7cacf8]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Firestore & DB Console</h2>
              <div className="flex items-center space-x-1.5 text-[10px] text-[#81c995] font-mono mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81c995]"></span>
                <span>Live · ravanaforge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collections List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8e918f]">
            Database Collections
          </div>
          {collections.map((col) => {
            const Icon = col.icon;
            const isActive = activeCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => {
                  setActiveCollection(col.id);
                  setSearchQuery('');
                  setSelectedRecordJson(null);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition group ${
                  isActive
                    ? 'bg-[#1a73e8] text-white shadow-sm'
                    : 'text-[#c4c7c5] hover:bg-[#1e1f20] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8e918f] group-hover:text-white'}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-medium truncate">{col.name}</div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-[#8e918f]'}`}>
                      {col.desc}
                    </div>
                  </div>
                </div>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#1e1f20] text-[#8e918f]'
                }`}>
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Firebase Config Notice */}
        <div className="p-3 border-t border-[#282a2c] bg-[#141517] text-[10px] text-[#8e918f] font-mono">
          <div className="flex items-center justify-between text-white mb-1">
            <span>Firebase Hosting</span>
            <span className="text-[#81c995]">Connected</span>
          </div>
          <div className="truncate text-[#c4c7c5]">https://ravanaforge.web.app</div>
        </div>
      </div>

      {/* Right Area: Records Table & JSON Inspector */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#131314]">
        {/* Top Action Bar */}
        <div className="h-14 border-b border-[#282a2c] px-6 flex items-center justify-between shrink-0 bg-[#17191a]">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-[#7cacf8] bg-[#1a73e8]/15 px-2 py-0.5 rounded border border-[#1a73e8]/30">
              collection: {activeCollection}
            </span>
            <span className="text-xs text-[#8e918f] hidden sm:inline">
              ({currentData.length} records found)
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Search query */}
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8e918f] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1f20] border border-[#282a2c] rounded-lg pl-7 pr-3 py-1.5 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            {/* Export JSON button */}
            <button
              onClick={handleExportJson}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1e1f20] hover:bg-[#282a2c] text-[#c4c7c5] hover:text-white text-xs font-medium transition"
              title="Download Collection JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export JSON</span>
            </button>

            {/* Add Record (Available on tickets) */}
            {activeCollection === 'firm_tickets' && (
              <button
                onClick={() => setIsAddRecordOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] text-white text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body: Split View (Table + JSON Inspector) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Table View */}
          <div className="flex-1 overflow-y-auto">
            {currentData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-[#8e918f] space-y-2">
                <Database className="w-8 h-8 opacity-40" />
                <p className="text-xs">No records matched current query in {activeCollection}</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#282a2c] bg-[#141517] text-[#8e918f] font-mono text-[11px] sticky top-0 z-10">
                    <th className="py-2.5 px-4 font-normal">Document ID / Key</th>
                    <th className="py-2.5 px-4 font-normal">Primary Fields</th>
                    <th className="py-2.5 px-4 font-normal">Status / State</th>
                    <th className="py-2.5 px-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282a2c]/60">
                  {currentData.map((record: any, idx: number) => {
                    const recId = record.id || record.ticketCode || record.hash || `doc-${idx}`;
                    const isSelected = selectedRecordJson && (selectedRecordJson.id === recId || selectedRecordJson === record);

                    return (
                      <tr 
                        key={recId}
                        onClick={() => setSelectedRecordJson(record)}
                        className={`hover:bg-[#1e1f20]/70 cursor-pointer transition ${
                          isSelected ? 'bg-[#1a73e8]/10' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-[#7cacf8] font-medium whitespace-nowrap">
                          {recId}
                        </td>

                        <td className="py-3 px-4 max-w-md">
                          <div className="font-medium text-white truncate">
                            {record.title || record.name || record.message || record.endpoint || 'Document'}
                          </div>
                          <div className="text-[11px] text-[#8e918f] truncate font-mono mt-0.5">
                            {record.description || record.systemPrompt || record.author || record.responseSnippet || record.recommendation || ''}
                          </div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-mono text-[10px] text-[#c4c7c5] bg-[#1e1f20] px-2 py-0.5 rounded border border-[#282a2c]">
                            {record.status || record.priority || record.method || (record.tokensUsed ? `${record.tokensUsed} tokens` : 'stored')}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedRecordJson(record)}
                              className="p-1 rounded text-[#8e918f] hover:text-[#7cacf8] hover:bg-[#1e1f20] transition"
                              title="Inspect JSON Document"
                            >
                              <FileJson className="w-3.5 h-3.5" />
                            </button>
                            {activeCollection === 'firm_tickets' && onDeleteTicket && (
                              <button
                                onClick={() => onDeleteTicket(record.id)}
                                className="p-1 rounded text-[#8e918f] hover:text-rose-400 hover:bg-[#1e1f20] transition"
                                title="Delete Document"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Right Inspector Panel: Full JSON Document */}
          {selectedRecordJson && (
            <div className="w-96 border-l border-[#282a2c] bg-[#141517] flex flex-col shrink-0 animate-in slide-in-from-right duration-150">
              <div className="p-3 border-b border-[#282a2c] flex items-center justify-between bg-[#17191a]">
                <div className="flex items-center space-x-2">
                  <FileJson className="w-4 h-4 text-[#7cacf8]" />
                  <span className="text-xs font-semibold text-white">Document JSON</span>
                </div>
                <button
                  onClick={() => setSelectedRecordJson(null)}
                  className="p-1 rounded text-[#8e918f] hover:text-white hover:bg-[#282a2c]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <pre className="text-[11px] font-mono text-[#c4c7c5] whitespace-pre-wrap leading-relaxed select-text">
                  {JSON.stringify(selectedRecordJson, null, 2)}
                </pre>
              </div>

              <div className="p-3 border-t border-[#282a2c] bg-[#17191a] flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selectedRecordJson, null, 2));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1e1f20] hover:bg-[#282a2c] text-white text-xs font-medium transition"
                >
                  Copy JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {isAddRecordOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e1f20] border border-[#2e3135] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-[#282a2c] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Add Record to firm_tickets</h3>
              <button onClick={() => setIsAddRecordOpen(false)} className="text-[#8e918f] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-medium text-white mb-1">Ticket Title</label>
                <input
                  type="text"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  placeholder="e.g. Implement Raft Log Compaction with Inode snapshots"
                  className="w-full bg-[#141517] border border-[#282a2c] rounded-lg px-3 py-2 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  placeholder="Technical acceptance criteria and state machine invariants..."
                  className="w-full bg-[#141517] border border-[#282a2c] rounded-lg px-3 py-2 text-xs text-white placeholder-[#8e918f] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Priority</label>
                  <select
                    value={newTicketPriority}
                    onChange={(e: any) => setNewTicketPriority(e.target.value)}
                    className="w-full bg-[#141517] border border-[#282a2c] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white mb-1">Assignee</label>
                  <select
                    value={newTicketAgentId}
                    onChange={(e) => setNewTicketAgentId(e.target.value)}
                    className="w-full bg-[#141517] border border-[#282a2c] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.division.slice(0, 10)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-[#282a2c] bg-[#17191a] flex justify-end space-x-2">
              <button
                onClick={() => setIsAddRecordOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-[#282a2c] text-xs font-medium text-[#c4c7c5] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRecord}
                className="px-4 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] text-xs font-semibold text-white shadow-sm"
              >
                Save Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
