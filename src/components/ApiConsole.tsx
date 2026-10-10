import React, { useState } from 'react';
import { 
  Send, 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Play,
  RotateCcw
} from 'lucide-react';
import { Agent, ApiLogRecord, FirmTicket } from '../types/forge';

interface ApiConsoleProps {
  agents: Agent[];
  tickets: FirmTicket[];
  onExecuteApiCall: (log: ApiLogRecord) => void;
}

interface ApiEndpointConfig {
  id: string;
  method: 'GET' | 'POST';
  endpoint: string;
  name: string;
  description: string;
  defaultPayload?: Record<string, any>;
}

export const ApiConsole: React.FC<ApiConsoleProps> = ({
  agents,
  tickets,
  onExecuteApiCall,
}) => {
  const endpoints: ApiEndpointConfig[] = [
    {
      id: 'ep-employees',
      method: 'GET',
      endpoint: '/api/firm/employees',
      name: 'Fetch 41 Staff Roster',
      description: 'Returns real-time operational roster of 5 executives and 36 swarm engineers with token usage statistics.',
    },
    {
      id: 'ep-dispatch',
      method: 'POST',
      endpoint: '/api/firm/dispatch',
      name: 'Autonomous Agent Dispatch',
      description: 'Dispatches task directive or invariant mandate directly to an executive commander or specialist.',
      defaultPayload: {
        agentId: 'agent_backend_eng',
        directive: 'Synthesize mutex-guarded 64MB buffer in raft_node.go',
        priority: 'critical',
      },
    },
    {
      id: 'ep-ticket',
      method: 'POST',
      endpoint: '/api/firm/tickets/create',
      name: 'Create & Assign Sprint Ticket',
      description: 'Creates a new engineering ticket and atomically binds it to an engineer.',
      defaultPayload: {
        title: 'Stress-test 100k QPS on Propose Channel',
        assignedToId: 'emp_kumbha',
        priority: 'high',
        division: 'QA, Security & Resilience',
      },
    },
    {
      id: 'ep-security',
      method: 'POST',
      endpoint: '/api/security/scan',
      name: 'Execute SAST Security Audit',
      description: 'Scans source files for CWE memory exhaustion and buffer overflows.',
      defaultPayload: {
        targetFile: 'src/cluster/raft_node.go',
        ruleSet: 'OWASP_TOP_10',
        enforceBounds: true,
      },
    },
    {
      id: 'ep-query',
      method: 'POST',
      endpoint: '/api/database/query',
      name: 'Query Firestore Collections',
      description: 'Executes structured database query against firm_tickets or firm_employees.',
      defaultPayload: {
        collection: 'firm_tickets',
        filter: { status: 'in_progress' },
        limit: 10,
      },
    },
  ];

  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('ep-dispatch');
  const activeEndpoint = endpoints.find(e => e.id === selectedEndpointId) || endpoints[0];

  const [requestPayload, setRequestPayload] = useState<string>(
    JSON.stringify(activeEndpoint.defaultPayload || {}, null, 2)
  );
  const [responseOutput, setResponseOutput] = useState<any | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseLatency, setResponseLatency] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'response' | 'curl' | 'typescript'>('response');

  // Handle switching endpoint
  const handleSelectEndpoint = (ep: ApiEndpointConfig) => {
    setSelectedEndpointId(ep.id);
    setRequestPayload(JSON.stringify(ep.defaultPayload || {}, null, 2));
    setResponseOutput(null);
    setResponseStatus(null);
    setResponseLatency(null);
  };

  // Run interactive API call
  const handleSendRequest = () => {
    setIsLoading(true);
    const startTime = performance.now();

    setTimeout(() => {
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime + Math.random() * 25 + 15);

      let parsedPayload: any = {};
      try {
        parsedPayload = JSON.parse(requestPayload);
      } catch (e) {
        parsedPayload = {};
      }

      let resultData: any = {};

      if (activeEndpoint.endpoint === '/api/firm/employees') {
        resultData = {
          totalEmployees: agents.length,
          executiveChiefs: agents.filter(a => a.isExecutive).length,
          specialists: agents.filter(a => !a.isExecutive).length,
          totalTokensSynthesized: agents.reduce((acc, a) => acc + a.tokensUsed, 0),
          firmStatus: 'operational',
          serverTime: new Date().toISOString(),
          roster: agents.slice(0, 5).map(a => ({ id: a.id, name: a.name, role: a.role, tokens: a.tokensUsed })),
        };
      } else if (activeEndpoint.endpoint === '/api/firm/dispatch') {
        const targetAgent = agents.find(a => a.id === parsedPayload.agentId) || agents[0];
        resultData = {
          success: true,
          status: 'dispatched',
          ticketId: `TCK-${Math.floor(Math.random() * 900 + 100)}`,
          assignedAgent: {
            id: targetAgent.id,
            name: targetAgent.name,
            role: targetAgent.role,
            division: targetAgent.division,
          },
          directive: parsedPayload.directive,
          estimatedTokens: 420,
          timestamp: new Date().toISOString(),
        };
      } else if (activeEndpoint.endpoint === '/api/firm/tickets/create') {
        resultData = {
          success: true,
          ticketCode: `TCK-${Math.floor(Math.random() * 900 + 100)}`,
          title: parsedPayload.title || 'Stress-test 100k QPS',
          assignedTo: parsedPayload.assignedToId || 'emp_kumbha',
          status: 'in_progress',
          createdAt: new Date().toISOString(),
        };
      } else if (activeEndpoint.endpoint === '/api/security/scan') {
        resultData = {
          success: true,
          scannedFiles: 4,
          findings: 1,
          cweClassifications: [
            { id: 'CWE-400', severity: 'critical', file: parsedPayload.targetFile || 'src/cluster/raft_node.go', status: 'remediated' }
          ],
          securityScore: 100,
          zeroDaysDetected: 0,
        };
      } else {
        resultData = {
          success: true,
          collection: parsedPayload.collection || 'firm_tickets',
          recordsReturned: tickets.length,
          executionPlan: 'index-scan (primary key)',
          cached: true,
        };
      }

      setResponseStatus(200);
      setResponseLatency(latency);
      setResponseOutput(resultData);
      setIsLoading(false);

      // Register into global API Logs
      onExecuteApiCall({
        id: `log-${Date.now()}`,
        method: activeEndpoint.method,
        endpoint: activeEndpoint.endpoint,
        statusCode: 200,
        latencyMs: latency,
        timestamp: new Date().toLocaleTimeString(),
        requestBody: parsedPayload,
        responseSnippet: JSON.stringify(resultData).slice(0, 100) + '...',
      });
    }, 350);
  };

  // Generate Curl snippet
  const curlSnippet = `curl -X ${activeEndpoint.method} "https://ravanaforge.web.app${activeEndpoint.endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ravana_live_token" ${activeEndpoint.method === 'POST' ? `\\
  -d '${requestPayload.replace(/\n/g, '').replace(/\s+/g, ' ')}'` : ''}`;

  // Generate TypeScript snippet
  const tsSnippet = `// TypeScript / Node.js client
const response = await fetch('https://ravanaforge.web.app${activeEndpoint.endpoint}', {
  method: '${activeEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.RAVANA_API_KEY,
  },
  ${activeEndpoint.method === 'POST' ? `body: JSON.stringify(${requestPayload}),` : ''}
});

const data = await response.json();
console.log(data);`;

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-[#131314] text-[#e3e3e3]">
      {/* Left Column: Endpoints Catalog */}
      <div className="w-80 border-r border-[#282a2c] bg-[#17191a] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#282a2c]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#81c995]/20 border border-[#81c995]/40 flex items-center justify-center text-[#81c995]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Full-Stack API Router</h2>
              <p className="text-[10px] text-[#8e918f] font-mono">Live Express & Cloud Endpoints</p>
            </div>
          </div>
        </div>

        {/* List of Endpoints */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8e918f]">
            Firm Backend Routes
          </div>

          {endpoints.map((ep) => {
            const isSelected = selectedEndpointId === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => handleSelectEndpoint(ep)}
                className={`w-full p-2.5 rounded-xl text-left transition group ${
                  isSelected
                    ? 'bg-[#1a73e8] text-white shadow-sm'
                    : 'text-[#c4c7c5] hover:bg-[#1e1f20] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    ep.method === 'GET' 
                      ? isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400' 
                      : isSelected ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="text-xs font-mono font-medium truncate">
                    {ep.endpoint}
                  </span>
                </div>
                <div className={`text-[11px] truncate ${isSelected ? 'text-white/90' : 'text-[#8e918f]'}`}>
                  {ep.name}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-[#282a2c] bg-[#141517] text-[10px] text-[#8e918f] font-mono flex items-center justify-between">
          <span>Target Host</span>
          <span className="text-white">0.0.0.0:3000 (Vite Proxy)</span>
        </div>
      </div>

      {/* Right Column: Interactive Request & Response Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#131314]">
        {/* Top Endpoint Header Bar */}
        <div className="h-14 border-b border-[#282a2c] px-6 flex items-center justify-between shrink-0 bg-[#17191a]">
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              activeEndpoint.method === 'GET'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
            }`}>
              {activeEndpoint.method}
            </span>
            <span className="text-sm font-mono font-semibold text-white">
              {activeEndpoint.endpoint}
            </span>
            <span className="text-xs text-[#8e918f] hidden md:inline">
              · {activeEndpoint.description}
            </span>
          </div>

          <button
            onClick={handleSendRequest}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1b66c9] disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition"
          >
            {isLoading ? (
              <Clock className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>Send Request</span>
          </button>
        </div>

        {/* Main Split: Request Config (Top) + Response View (Bottom) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Request Payload Editor */}
          <div className="w-full md:w-1/2 border-r border-[#282a2c] flex flex-col overflow-hidden">
            <div className="p-3 border-b border-[#282a2c] bg-[#141517] flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8e918f]">
                Request Payload (JSON)
              </span>
              <button
                onClick={() => setRequestPayload(JSON.stringify(activeEndpoint.defaultPayload || {}, null, 2))}
                className="text-[11px] text-[#7cacf8] hover:underline"
              >
                Reset Default
              </button>
            </div>

            <div className="flex-1 p-3 overflow-hidden">
              <textarea
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
                readOnly={activeEndpoint.method === 'GET'}
                className="w-full h-full bg-[#1e1f20] border border-[#282a2c] rounded-xl p-3 font-mono text-xs text-[#e3e3e3] focus:outline-none focus:border-[#1a73e8] resize-none leading-relaxed"
                placeholder={activeEndpoint.method === 'GET' ? '// No payload required for GET' : '{\n  "key": "value"\n}'}
              />
            </div>
          </div>

          {/* Response & Code Generator Pane */}
          <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-[#141517]">
            {/* Tab switchers */}
            <div className="h-10 border-b border-[#282a2c] px-3 flex items-center justify-between bg-[#17191a] shrink-0">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'response' ? 'bg-[#1e1f20] text-white' : 'text-[#8e918f] hover:text-white'
                  }`}
                >
                  Response Output
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'curl' ? 'bg-[#1e1f20] text-white' : 'text-[#8e918f] hover:text-white'
                  }`}
                >
                  cURL Snippet
                </button>
                <button
                  onClick={() => setActiveTab('typescript')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'typescript' ? 'bg-[#1e1f20] text-white' : 'text-[#8e918f] hover:text-white'
                  }`}
                >
                  TypeScript SDK
                </button>
              </div>

              {/* Response Stats */}
              {responseStatus && (
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="text-[#81c995] font-semibold">{responseStatus} OK</span>
                  <span className="text-[#8e918f]">{responseLatency}ms</span>
                </div>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'response' && (
                responseOutput ? (
                  <pre className="text-xs font-mono text-[#c4c7c5] whitespace-pre-wrap leading-relaxed select-text">
                    {JSON.stringify(responseOutput, null, 2)}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-[#8e918f] space-y-2">
                    <Send className="w-8 h-8 opacity-30" />
                    <p className="text-xs">Click "Send Request" to invoke {activeEndpoint.endpoint}</p>
                  </div>
                )
              )}

              {activeTab === 'curl' && (
                <div className="relative">
                  <pre className="text-xs font-mono text-[#7cacf8] whitespace-pre-wrap bg-[#1e1f20] p-4 rounded-xl border border-[#282a2c] leading-relaxed">
                    {curlSnippet}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(curlSnippet);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 1500);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#282a2c] hover:bg-[#3c4043] text-white text-xs flex items-center space-x-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#81c995]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {activeTab === 'typescript' && (
                <div className="relative">
                  <pre className="text-xs font-mono text-[#81c995] whitespace-pre-wrap bg-[#1e1f20] p-4 rounded-xl border border-[#282a2c] leading-relaxed">
                    {tsSnippet}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(tsSnippet);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 1500);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#282a2c] hover:bg-[#3c4043] text-white text-xs flex items-center space-x-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#81c995]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
