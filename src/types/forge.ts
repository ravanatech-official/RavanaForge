export type AgentRole = 
  | 'architect'
  | 'tech_lead'
  | 'frontend_eng'
  | 'backend_eng'
  | 'qa_engineer'
  | 'security_auditor'
  | 'devops_eng'
  | 'data_engineer'
  | 'sre'
  | 'ui_ux_designer'
  | 'mobile_engineer'
  | 'chaos_engineer'
  | 'performance_profiler';

export type FirmDivision = 
  | 'Executive Leadership'
  | 'Architecture & Systems'
  | 'Core Backend & APIs'
  | 'Frontend & UI Systems'
  | 'QA, Security & Resilience'
  | 'DevOps & Cloud Infra';

export interface Agent {
  id: string;
  name: string;
  commanderTitle?: string;
  avatarSymbol?: string;
  role: AgentRole;
  division: FirmDivision;
  isExecutive?: boolean;
  avatarColor: string;
  title: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  capabilities: string[];
  status: 'idle' | 'thinking' | 'coding' | 'executing' | 'reviewing' | 'completed';
  currentAction?: string;
  tokensUsed: number;
  confidence: number;
  ticketsCount?: number;
  assignedTickets?: string[];
}

export interface FirmTicket {
  id: string;
  ticketCode: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'backlog' | 'in_progress' | 'in_review' | 'completed';
  assignedToId: string;
  assignedToName: string;
  division: FirmDivision;
  createdAt: string;
  updatedAt: string;
  linkedFile?: string;
}

export interface VirtualCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
  branch: string;
}

export interface ApiLogRecord {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  statusCode: number;
  latencyMs: number;
  timestamp: string;
  requestBody?: Record<string, any>;
  responseSnippet: string;
}

export interface AgentMessage {
  id: string;
  agentId: string;
  agentName: string;
  agentRole: AgentRole;
  avatarColor: string;
  timestamp: string;
  content: string;
  thought?: string;
  type: 'message' | 'tool_call' | 'file_edit' | 'test_run' | 'review' | 'approval_request';
  toolName?: string;
  toolArgs?: Record<string, any>;
  toolResult?: string;
  targetFile?: string;
  diffSummary?: string;
}

export interface VirtualFile {
  id: string;
  path: string;
  name: string;
  language: string;
  content: string;
  previousContent?: string;
  status: 'clean' | 'modified' | 'added' | 'deleted';
  lastEditedBy?: string;
  size: number;
}

export interface TestCase {
  id: string;
  suite: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'skipped';
  durationMs: number;
  error?: string;
}

export interface SecurityVulnerability {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  cwe: string;
  file: string;
  line: number;
  description: string;
  recommendation: string;
  status: 'open' | 'fixed' | 'waived';
}

export type CanvasViewMode = 'code' | 'diff' | 'terminal' | 'split' | 'preview';

export interface SolutionBlueprint {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  category: 'Distributed Systems' | 'E-Commerce' | 'FinTech' | 'SaaS' | 'AI & Automation' | 'Real-Time Logistics';
  description: string;
  iconName: string;
  stack: {
    frontend: string;
    backend: string;
    database: string;
    api: string;
  };
  metrics: {
    locEstimate: string;
    agencyCost: string;
    agencyTime: string;
    swarmCost: string;
    swarmTime: string;
    securityGrade: string;
  };
  highlights: string[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  agentId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  requiresHumanApproval: boolean;
  artifactsProduced: string[];
}

export interface ProjectMission {
  id: string;
  title: string;
  description: string;
  stack: string[];
  stages: WorkflowStage[];
  currentStageIndex: number;
  status: 'draft' | 'running' | 'paused' | 'completed';
  metrics: {
    linesOfCode: number;
    testsPassing: number;
    totalTests: number;
    securityScore: number;
    iterations: number;
    costEstimate: number;
    engineeringHoursSaved?: number;
    zeroDaysPrevented?: number;
  };
}
