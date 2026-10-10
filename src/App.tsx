import React, { useState, useEffect } from 'react';
import { 
  INITIAL_AGENTS, 
  INITIAL_FILES, 
  INITIAL_TEST_CASES, 
  INITIAL_SECURITY_ISSUES, 
  INITIAL_MISSION,
  SOLUTION_BLUEPRINTS,
  INITIAL_TICKETS,
  INITIAL_COMMITS,
  INITIAL_API_LOGS
} from './data/defaultData';
import { 
  AVAILABLE_MODELS, 
  DEFAULT_STUDIO_PARAMS, 
  INITIAL_STUDIO_TURNS, 
  SAVED_PROMPTS_LIST 
} from './data/aiStudioData';
import { 
  Agent, 
  AgentMessage, 
  VirtualFile, 
  TestCase, 
  SecurityVulnerability, 
  ProjectMission,
  CanvasViewMode,
  SolutionBlueprint,
  FirmTicket,
  VirtualCommit,
  ApiLogRecord
} from './types/forge';
import { 
  AIStudioParams, 
  AIStudioTurn, 
  AIStudioViewMode, 
  SavedPrompt 
} from './types/aistudio';
import { AIStudioHeader } from './components/AIStudioHeader';
import { AIStudioLeftRail } from './components/AIStudioLeftRail';
import { AIStudioParametersDrawer } from './components/AIStudioParametersDrawer';
import { AIStudioChatCanvas } from './components/AIStudioChatCanvas';
import { AIStudioFreeformCanvas } from './components/AIStudioFreeformCanvas';
import { BottomEngineDrawer } from './components/BottomEngineDrawer';
import { SoftwareFirmOrgDirectory } from './components/SoftwareFirmOrgDirectory';
import { DatabaseConsole } from './components/DatabaseConsole';
import { ApiConsole } from './components/ApiConsole';
import { GetCodeModal } from './components/GetCodeModal';
import { SharePromptModal } from './components/SharePromptModal';
import { AgentSwarmVisualizer } from './components/AgentSwarmVisualizer';
import { AgentFeed } from './components/AgentFeed';
import { CodeWorkspace } from './components/CodeWorkspace';
import { ExecutiveSolutionsDeck } from './components/ExecutiveSolutionsDeck';
import { AgentStudioModal } from './components/AgentStudioModal';
import { WorkflowConfigModal } from './components/WorkflowConfigModal';
import { NewMissionModal } from './components/NewMissionModal';
import { ExportModal } from './components/ExportModal';
import { generateStudioResponse } from './utils/aiStudioGenerator';

export default function App() {
  // Google AI Studio View State (Raptor-3 Minimalist Framework)
  const [activeViewMode, setActiveViewMode] = useState<AIStudioViewMode>('chat');
  const [promptTitle, setPromptTitle] = useState<string>('RavanaForge Autonomous Firm Engine');
  const [activePromptId, setActivePromptId] = useState<string>('prompt-1');
  const [studioParams, setStudioParams] = useState<AIStudioParams>(DEFAULT_STUDIO_PARAMS);
  const [studioTurns, setStudioTurns] = useState<AIStudioTurn[]>(INITIAL_STUDIO_TURNS);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(SAVED_PROMPTS_LIST);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Collapsible Drawers (Raptor 3 Minimalist Workspace)
  const [isLeftRailOpen, setIsLeftRailOpen] = useState<boolean>(true);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(false);
  const [bottomDrawerTab, setBottomDrawerTab] = useState<'database' | 'api' | 'firm_org' | 'logs' | 'tests'>('database');
  const [isGetCodeOpen, setIsGetCodeOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // 1000% Powerful Underlying Architecture (41 Staff, DB Collections, API Engine)
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [tickets, setTickets] = useState<FirmTicket[]>(INITIAL_TICKETS);
  const [commits, setCommits] = useState<VirtualCommit[]>(INITIAL_COMMITS);
  const [apiLogs, setApiLogs] = useState<ApiLogRecord[]>(INITIAL_API_LOGS);

  // Workspace & Mission State
  const [mission, setMission] = useState<ProjectMission>(INITIAL_MISSION);
  const [files, setFiles] = useState<VirtualFile[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string>(INITIAL_FILES[0].id);
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [securityIssues, setSecurityIssues] = useState<SecurityVulnerability[]>(INITIAL_SECURITY_ISSUES);
  const [canvasViewMode, setCanvasViewMode] = useState<CanvasViewMode>('code');
  const [activeAgentId, setActiveAgentId] = useState<string | undefined>('agent_backend_eng');
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string | undefined>(undefined);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Swarm Messages & Terminal Logs
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg-0',
      agentId: 'agent_architect',
      agentName: 'Prahasta (Chief Architect)',
      agentRole: 'architect',
      avatarColor: 'indigo',
      timestamp: '10:42:01',
      content: 'Initiating architectural decomposition for Mission: Distributed In-Memory Cache with Raft Consensus. Analyzing invariants: quorum replication, linearizability, and bounded latency.',
      thought: 'Evaluating Paxos vs Raft vs Zab. Raft provides strict leader election invariants and formal proofs for log matching. We structure the state machine around clean Go interface boundaries without external daemon dependencies.',
      type: 'message',
    },
    {
      id: 'msg-1',
      agentId: 'agent_architect',
      agentName: 'Prahasta (Chief Architect)',
      agentRole: 'architect',
      avatarColor: 'indigo',
      timestamp: '10:42:15',
      content: 'Authored Architecture Decision Record ADR-004-CONSENSUS-ENGINE.md defining failure domains and state machine contracts.',
      type: 'file_edit',
      targetFile: 'docs/ADR-004-CONSENSUS-ENGINE.md',
      diffSummary: '+42 lines (Accepted ADR)',
    },
    {
      id: 'msg-2',
      agentId: 'agent_tech_lead',
      agentName: 'Indrajit (Tech Lead)',
      agentRole: 'tech_lead',
      avatarColor: 'purple',
      timestamp: '10:42:30',
      content: 'Deconstructing ADR-004 into implementation specifications. Defined the KVStore interface contract with Snapshot isolation semantics.',
      thought: 'Breaking down into 2 core modules: cluster/raft_node.go for consensus state machine and cluster/kv_store.go for in-memory key-value storage. Handing off synthesis ticket to Kumbhakarna.',
      type: 'tool_call',
      toolName: 'ast_spec_generator.define_interface',
      toolArgs: { interface: 'KVStore', package: 'cluster' },
      toolResult: 'Exported KVStore interface with Get(), Apply(), and Snapshot() methods.',
      targetFile: 'src/cluster/kv_store.go',
      diffSummary: '+52 lines',
    },
    {
      id: 'msg-3',
      agentId: 'agent_backend_eng',
      agentName: 'Kumbhakarna (Backend Lead)',
      agentRole: 'backend_eng',
      avatarColor: 'blue',
      timestamp: '10:43:05',
      content: 'Synthesized RaftNode struct with mutex guards and quorum proposal channel in src/cluster/raft_node.go.',
      thought: 'ProposeCommand must check leader state first under mutex lock, allocate an incremental log index, append to local log, and broadcast AppendEntries to follower nodes.',
      type: 'file_edit',
      targetFile: 'src/cluster/raft_node.go',
      diffSummary: '+78 lines (Raft election & propose)',
    },
  ]);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[FORGE-INIT] RavanaForge Google AI Studio initialized on Linux x64.',
    '[FIREBASE] Connected to live project "ravanaforge" at https://ravanaforge.web.app.',
    '[RAPTOR-3] Engine Architecture: Part-elimination doctrine active. Zero microservice slop.',
    '[FIRM-ORG] 41 Sovereign Staff Active: 5 Executive Chiefs + 36 Production Specialists.',
  ]);

  // Modals
  const [isAgentStudioOpen, setIsAgentStudioOpen] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Global Keyboard Shortcuts (Ctrl+Enter to Run, Ctrl+` to toggle bottom console, Ctrl+B for sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunPrompt();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'j')) {
        e.preventDefault();
        setIsBottomDrawerOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsLeftRailOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [studioTurns, studioParams, isGenerating]);

  // Calculate live token consumption
  const currentTokenCount = studioTurns.reduce((acc, t) => acc + (t.tokens || Math.round(t.content.length / 4)), 0) + Math.round(studioParams.systemInstruction.length / 4);

  // Run Prompt Execution (Google AI Studio Run)
  const handleRunPrompt = async (customPrompt?: string) => {
    if (isGenerating) return;
    const promptToRun = customPrompt || (studioTurns.length > 0 && studioTurns[studioTurns.length - 1].role === 'user' 
      ? studioTurns[studioTurns.length - 1].content 
      : 'Architect an ultra-high performance distributed web solution engineered with SpaceX Raptor 3 rocket principles.');

    const userTurn: AIStudioTurn = {
      id: `turn-${Date.now()}`,
      role: 'user',
      content: promptToRun,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (customPrompt) {
      setStudioTurns((prev) => [...prev, userTurn]);
    }

    setIsGenerating(true);
    setTerminalLogs((prev) => [
      ...prev,
      `[AI-STUDIO] Executing prompt using model ${studioParams.modelId} (temp: ${studioParams.temperature}, topP: ${studioParams.topP})...`,
    ]);

    try {
      const response = await generateStudioResponse({
        prompt: promptToRun,
        params: studioParams,
        history: studioTurns,
      });

      const modelTurn: AIStudioTurn = {
        ...response,
        id: `turn-${Date.now() + 1}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setStudioTurns((prev) => [...prev, modelTurn]);
      setTerminalLogs((prev) => [
        ...prev,
        `[AI-STUDIO] Synthesis completed: ${modelTurn.tokens || 350} tokens generated in ${modelTurn.thoughtSeconds || 10}s.`,
      ]);

      // Distribute token credit to active commanders
      setAgents((prev) =>
        prev.map((a) =>
          a.isExecutive ? { ...a, tokensUsed: a.tokensUsed + Math.round((modelTurn.tokens || 350) / 5) } : a
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Dispatch task to specific agent
  const handleDispatchTaskToAgent = (agentId: string, directive: string) => {
    const targetAgent = agents.find((a) => a.id === agentId);
    if (!targetAgent) return;

    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              status: 'coding',
              currentAction: directive.slice(0, 80),
              tokensUsed: a.tokensUsed + 380,
            }
          : a
      )
    );

    const newCode = `TCK-${Math.floor(Math.random() * 900 + 100)}`;
    const newTicket: FirmTicket = {
      id: `tck-${Date.now()}`,
      ticketCode: newCode,
      title: directive.slice(0, 70),
      description: directive,
      priority: 'high',
      status: 'in_progress',
      assignedToId: targetAgent.id,
      assignedToName: targetAgent.name,
      division: targetAgent.division,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTickets((prev) => [newTicket, ...prev]);

    const newMsg: AgentMessage = {
      id: `msg-${Date.now()}`,
      agentId: targetAgent.id,
      agentName: targetAgent.name,
      agentRole: targetAgent.role,
      avatarColor: targetAgent.avatarColor,
      timestamp: new Date().toLocaleTimeString(),
      content: `Dispatched directive: "${directive}"`,
      thought: `Deconstructing directive for ${targetAgent.division}. Executing atomic implementation within bounds.`,
      type: 'message',
    };
    setMessages((prev) => [...prev, newMsg]);

    setTerminalLogs((prev) => [
      ...prev,
      `[DISPATCH] ${targetAgent.name} received mandate: "${directive.slice(0, 60)}..."`,
    ]);

    setApiLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        method: 'POST',
        endpoint: '/api/firm/dispatch',
        statusCode: 200,
        latencyMs: 28,
        timestamp: new Date().toLocaleTimeString(),
        requestBody: { agentId, directive },
        responseSnippet: `{"ticket":"${newCode}","status":"dispatched","agent":"${targetAgent.name}"}`,
      },
      ...prev,
    ]);
  };

  const handleCreateTicket = (ticketData: Partial<FirmTicket>) => {
    const newTicket: FirmTicket = {
      id: `tck-${Date.now()}`,
      ticketCode: ticketData.ticketCode || `TCK-${Math.floor(Math.random() * 900 + 100)}`,
      title: ticketData.title || 'Untitled Sprint Ticket',
      description: ticketData.description || '',
      priority: ticketData.priority || 'medium',
      status: ticketData.status || 'in_progress',
      assignedToId: ticketData.assignedToId || agents[0].id,
      assignedToName: ticketData.assignedToName || agents[0].name,
      division: ticketData.division || 'Core Backend & APIs',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTickets((prev) => [newTicket, ...prev]);
    setTerminalLogs((prev) => [
      ...prev,
      `[TICKET-CREATED] Logged ${newTicket.ticketCode}: ${newTicket.title}`,
    ]);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleExecuteApiCall = (log: ApiLogRecord) => {
    setApiLogs((prev) => [log, ...prev]);
    setTerminalLogs((prev) => [
      ...prev,
      `[API-CALL] ${log.method} ${log.endpoint} -> 200 OK (${log.latencyMs}ms)`,
    ]);
  };

  const handleRegenerateLast = () => {
    const lastUserTurn = [...studioTurns].reverse().find((t) => t.role === 'user');
    if (lastUserTurn) {
      handleRunPrompt(lastUserTurn.content);
    }
  };

  const handleApplyCodeToFile = (filename: string, code: string) => {
    const existingFile = files.find((f) => f.path === filename || f.name === filename.split('/').pop());
    if (existingFile) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === existingFile.id
            ? { ...f, content: code, status: 'modified', previousContent: f.content, lastEditedBy: 'AI Studio Model' }
            : f
        )
      );
      setActiveFileId(existingFile.id);
    } else {
      const name = filename.split('/').pop() || 'file.go';
      const newFile: VirtualFile = {
        id: `file-${Date.now()}`,
        path: filename,
        name,
        language: name.endsWith('.go') ? 'go' : name.endsWith('.ts') ? 'typescript' : 'text',
        content: code,
        status: 'added',
        lastEditedBy: 'AI Studio Model',
        size: code.length,
      };
      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
    }

    const newCommit: VirtualCommit = {
      id: `c-${Date.now()}`,
      hash: Math.random().toString(16).substring(2, 9),
      message: `apply(studio): sync synthesized code into ${filename}`,
      author: 'AI Studio Swarm',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      filesChanged: 1,
      insertions: code.split('\n').length,
      deletions: 0,
      branch: 'main',
    };
    setCommits((prev) => [newCommit, ...prev]);

    setTerminalLogs((prev) => [
      ...prev,
      `[WORKSPACE-APPLY] Synced code from AI Studio turn into ${filename}. Commit: ${newCommit.hash}`,
    ]);
    setActiveViewMode('code');
  };

  const handleRunFreeform = async (promptText: string): Promise<string> => {
    const response = await generateStudioResponse({
      prompt: promptText,
      params: studioParams,
      history: [],
    });
    return response.content;
  };

  const handleSelectPrompt = (id: string) => {
    setActivePromptId(id);
    const found = savedPrompts.find((p) => p.id === id);
    if (found) {
      setPromptTitle(found.title);
      if (found.type === 'freeform') setActiveViewMode('freeform');
      else setActiveViewMode('chat');
    }
  };

  const handleCreateNewPrompt = (type: 'chat' | 'freeform' | 'structured') => {
    const newId = `prompt-${Date.now()}`;
    const newTitle = type === 'chat' 
      ? 'Untitled Chat Prompt' 
      : type === 'freeform' 
      ? 'Untitled Freeform Prompt' 
      : 'Untitled Structured Prompt';

    const newPrompt: SavedPrompt = {
      id: newId,
      title: newTitle,
      updatedAt: 'Just now',
      type,
      tokenCount: 0,
    };

    setSavedPrompts((prev) => [newPrompt, ...prev]);
    setActivePromptId(newId);
    setPromptTitle(newTitle);
    setStudioTurns([]);

    if (type === 'freeform') {
      setActiveViewMode('freeform');
    } else {
      setActiveViewMode('chat');
    }
  };

  const handleRollbackFile = (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId && f.previousContent) {
          return {
            ...f,
            content: f.previousContent,
            status: 'clean',
          };
        }
        return f;
      })
    );
  };

  const handleApproveFile = (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: 'clean' } : f))
    );
  };

  const handleRunTests = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestCases((prev) => prev.map((t) => ({ ...t, status: 'passed' })));
      setIsTesting(false);
      setTerminalLogs((prev) => [
        ...prev,
        '[TEST-RUN] PASS: All 5 test suites passed (0 race conditions, 0 memory leaks).',
      ]);
    }, 700);
  };

  const handleRunSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setSecurityIssues((prev) => prev.map((s) => ({ ...s, status: 'fixed' })));
      setIsScanning(false);
      setTerminalLogs((prev) => [
        ...prev,
        '[SAST-SCAN] 100% Passed. Zero open vulnerabilities. CWE-400 remediated.',
      ]);
    }, 700);
  };

  const handleUserPrompt = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        agentId: 'user',
        agentName: 'Executive Supervisor',
        agentRole: 'tech_lead',
        avatarColor: 'emerald',
        timestamp: new Date().toLocaleTimeString(),
        content: text,
        type: 'message',
      },
    ]);
  };

  const activeModel = AVAILABLE_MODELS.find((m) => m.id === studioParams.modelId) || AVAILABLE_MODELS[0];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#131314] text-[#e3e3e3] overflow-hidden font-sans">
      {/* Raptor-3 Ultra-Clean Google AI Studio Top Navigation Bar */}
      <AIStudioHeader
        promptTitle={promptTitle}
        onUpdatePromptTitle={setPromptTitle}
        activeViewMode={activeViewMode}
        onChangeViewMode={setActiveViewMode}
        isGenerating={isGenerating}
        onRunPrompt={() => handleRunPrompt()}
        onOpenGetCode={() => setIsGetCodeOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        isLeftRailOpen={isLeftRailOpen}
        onToggleLeftRail={() => setIsLeftRailOpen(!isLeftRailOpen)}
        isRightDrawerOpen={isRightDrawerOpen}
        onToggleRightDrawer={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
        isBottomDrawerOpen={isBottomDrawerOpen}
        onToggleBottomDrawer={() => setIsBottomDrawerOpen(!isBottomDrawerOpen)}
        activeModelName={activeModel.name}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Collapsible Rail Drawer */}
        <AIStudioLeftRail
          isOpen={isLeftRailOpen}
          savedPrompts={savedPrompts}
          activePromptId={activePromptId}
          onSelectPrompt={handleSelectPrompt}
          onNewPrompt={handleCreateNewPrompt}
          agents={agents}
          files={files}
          onSelectFile={(id) => { setActiveFileId(id); setActiveViewMode('code'); }}
          onChangeViewMode={(mode) => {
            if (mode === 'database') {
              setBottomDrawerTab('database');
              setIsBottomDrawerOpen(true);
            } else if (mode === 'api') {
              setBottomDrawerTab('api');
              setIsBottomDrawerOpen(true);
            } else if (mode === 'firm_org') {
              setBottomDrawerTab('firm_org');
              setIsBottomDrawerOpen(true);
            } else {
              setActiveViewMode(mode);
            }
          }}
        />

        {/* Center Canvas / Pristine Workspaces */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#131314] relative">
          {/* View 1: Authentic Google AI Studio Chat Canvas */}
          {activeViewMode === 'chat' && (
            <AIStudioChatCanvas
              turns={studioTurns}
              params={studioParams}
              onChangeParams={setStudioParams}
              onSendPrompt={(text) => handleRunPrompt(text)}
              isGenerating={isGenerating}
              onClearChat={() => setStudioTurns([])}
              onRegenerateLast={handleRegenerateLast}
              onApplyCodeToFile={handleApplyCodeToFile}
            />
          )}

          {/* View 2: Google AI Studio Freeform Canvas */}
          {activeViewMode === 'freeform' && (
            <AIStudioFreeformCanvas
              params={studioParams}
              onRunFreeform={handleRunFreeform}
            />
          )}

          {/* View 3: Multi-Agent Swarm Cockpit (41 Agents Active) */}
          {activeViewMode === 'cockpit' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0B0F19]">
              <AgentSwarmVisualizer
                agents={agents}
                stages={mission.stages}
                currentStageIndex={mission.currentStageIndex}
                activeAgentId={activeAgentId}
                onSelectAgent={setSelectedAgentFilter}
                selectedAgentFilter={selectedAgentFilter}
              />

              <div className="flex-1 flex overflow-hidden">
                <div className="w-[42%] min-w-[340px] max-w-xl h-full border-r border-slate-800">
                  <AgentFeed
                    messages={messages}
                    onSendMessage={handleUserPrompt}
                    selectedAgentFilter={selectedAgentFilter}
                    onSelectFile={(path) => {
                      const file = files.find((f) => f.path === path);
                      if (file) {
                        setActiveFileId(file.id);
                        setActiveViewMode('code');
                      }
                    }}
                    onClearFeed={() => setMessages([])}
                  />
                </div>

                <div className="flex-1 h-full overflow-hidden">
                  <CodeWorkspace
                    files={files}
                    activeFileId={activeFileId}
                    onSelectFile={setActiveFileId}
                    onUpdateFileContent={(id, content) => {
                      setFiles((prev) =>
                        prev.map((f) => (f.id === id ? { ...f, content, status: 'modified' } : f))
                      );
                    }}
                    onCreateFile={(path) => {
                      const name = path.split('/').pop() || 'file';
                      const newF: VirtualFile = {
                        id: `file-${Date.now()}`,
                        path,
                        name,
                        language: 'go',
                        content: `// ${name}\n`,
                        status: 'added',
                        size: 50,
                      };
                      setFiles((prev) => [...prev, newF]);
                      setActiveFileId(newF.id);
                    }}
                    onDeleteFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
                    onRollbackFile={handleRollbackFile}
                    onApproveFile={handleApproveFile}
                    canvasViewMode={canvasViewMode}
                    onChangeCanvasViewMode={setCanvasViewMode}
                    terminalLogs={terminalLogs}
                    testCases={testCases}
                    securityIssues={securityIssues}
                    metrics={mission.metrics}
                    onRunTests={handleRunTests}
                    onRunSecurityScan={handleRunSecurityScan}
                    isTesting={isTesting}
                    isScanning={isScanning}
                  />
                </div>
              </div>
            </div>
          )}

          {/* View 4: Full-Stack Code Workspace & Diffs */}
          {activeViewMode === 'code' && (
            <div className="flex-1 h-full overflow-hidden bg-[#0B0F19]">
              <CodeWorkspace
                files={files}
                activeFileId={activeFileId}
                onSelectFile={setActiveFileId}
                onUpdateFileContent={(id, content) => {
                  setFiles((prev) =>
                    prev.map((f) => (f.id === id ? { ...f, content, status: 'modified' } : f))
                  );
                }}
                onCreateFile={(path) => {
                  const name = path.split('/').pop() || 'file';
                  const newF: VirtualFile = {
                    id: `file-${Date.now()}`,
                    path,
                    name,
                    language: 'go',
                    content: `// ${name}\n`,
                    status: 'added',
                    size: 50,
                  };
                  setFiles((prev) => [...prev, newF]);
                  setActiveFileId(newF.id);
                }}
                onDeleteFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
                onRollbackFile={handleRollbackFile}
                onApproveFile={handleApproveFile}
                canvasViewMode={canvasViewMode}
                onChangeCanvasViewMode={setCanvasViewMode}
                terminalLogs={terminalLogs}
                testCases={testCases}
                securityIssues={securityIssues}
                metrics={mission.metrics}
                onRunTests={handleRunTests}
                onRunSecurityScan={handleRunSecurityScan}
                isTesting={isTesting}
                isScanning={isScanning}
              />
            </div>
          )}

          {/* View 5: Full Org Directory View (When requested directly) */}
          {activeViewMode === 'firm_org' && (
            <SoftwareFirmOrgDirectory
              agents={agents}
              tickets={tickets}
              onDispatchTaskToAgent={handleDispatchTaskToAgent}
              onSelectAgentForChat={(agentId) => {
                const target = agents.find((a) => a.id === agentId);
                if (target) {
                  handleRunPrompt(`@${target.name} (${target.title}): Provide your technical specification for the current mission.`);
                  setActiveViewMode('chat');
                }
              }}
              onCreateTicket={handleCreateTicket}
            />
          )}

          {/* View 6: Standalone Database Console (When requested directly) */}
          {activeViewMode === 'database' && (
            <DatabaseConsole
              agents={agents}
              tickets={tickets}
              commits={commits}
              vulnerabilities={securityIssues}
              apiLogs={apiLogs}
              mission={mission}
              onAddTicket={handleCreateTicket}
              onDeleteTicket={handleDeleteTicket}
            />
          )}

          {/* View 7: Standalone REST API Tester (When requested directly) */}
          {activeViewMode === 'api' && (
            <ApiConsole
              agents={agents}
              tickets={tickets}
              onExecuteApiCall={handleExecuteApiCall}
            />
          )}

          {/* View 8: Executive Solutions Deck */}
          {activeViewMode === 'executive' && (
            <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19]">
              <ExecutiveSolutionsDeck
                blueprints={SOLUTION_BLUEPRINTS}
                agents={agents}
                onSelectBlueprint={(bp) => {
                  setMission((prev) => ({
                    ...prev,
                    title: bp.title,
                    description: bp.description,
                  }));
                  setActiveViewMode('chat');
                  handleRunPrompt(`Architect the enterprise production deployment for "${bp.title}" with SpaceX Raptor 3 engine invariants.`);
                }}
                onSwitchToCockpit={() => setActiveViewMode('cockpit')}
                onCustomMissionLaunch={(title, desc) => {
                  setPromptTitle(title);
                  setActiveViewMode('chat');
                  handleRunPrompt(desc);
                }}
              />
            </div>
          )}
        </main>

        {/* Right Collapsible Parameters Drawer (Google AI Studio Settings) */}
        <AIStudioParametersDrawer
          isOpen={isRightDrawerOpen}
          onClose={() => setIsRightDrawerOpen(false)}
          params={studioParams}
          onChangeParams={setStudioParams}
          availableModels={AVAILABLE_MODELS}
          currentTokens={currentTokenCount}
        />
      </div>

      {/* Raptor-3 Collapsible Bottom Engine Drawer (Database, API, 41 Staff, Logs & Tests) */}
      <BottomEngineDrawer
        isOpen={isBottomDrawerOpen}
        onToggle={() => setIsBottomDrawerOpen(!isBottomDrawerOpen)}
        activeTab={bottomDrawerTab}
        onChangeTab={setBottomDrawerTab}
        agents={agents}
        tickets={tickets}
        commits={commits}
        vulnerabilities={securityIssues}
        apiLogs={apiLogs}
        terminalLogs={terminalLogs}
        testCases={testCases}
        mission={mission}
        onDispatchTaskToAgent={handleDispatchTaskToAgent}
        onSelectAgentForChat={(agentId) => {
          const target = agents.find((a) => a.id === agentId);
          if (target) {
            handleRunPrompt(`@${target.name} (${target.title}): Provide your technical specification for the current mission.`);
            setActiveViewMode('chat');
          }
        }}
        onAddTicket={handleCreateTicket}
        onDeleteTicket={handleDeleteTicket}
        onExecuteApiCall={handleExecuteApiCall}
        onRunTests={handleRunTests}
        onRunSecurityScan={handleRunSecurityScan}
      />

      {/* Google AI Studio Get Code Modal */}
      <GetCodeModal
        isOpen={isGetCodeOpen}
        onClose={() => setIsGetCodeOpen(false)}
        params={studioParams}
        lastTurnContent={studioTurns.length > 0 ? studioTurns[studioTurns.length - 1].content : ''}
      />

      {/* Share Prompt Modal */}
      <SharePromptModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        promptTitle={promptTitle}
      />

      {/* Auxiliary Modals */}
      <AgentStudioModal
        isOpen={isAgentStudioOpen}
        onClose={() => setIsAgentStudioOpen(false)}
        agents={agents}
        onUpdateAgent={(updated) => {
          setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        }}
        onAddAgent={(newAgent) => {
          setAgents((prev) => [...prev, newAgent]);
        }}
      />

      <WorkflowConfigModal
        isOpen={isWorkflowOpen}
        onClose={() => setIsWorkflowOpen(false)}
        mission={mission}
        onUpdateMission={setMission}
      />

      <NewMissionModal
        isOpen={isNewMissionOpen}
        onClose={() => setIsNewMissionOpen(false)}
        onLaunchMission={(title, desc) => {
          setPromptTitle(title);
          setActiveViewMode('chat');
          handleRunPrompt(desc);
        }}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        files={files}
        mission={mission}
        agents={agents}
      />
    </div>
  );
}
