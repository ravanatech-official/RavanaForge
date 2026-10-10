import { 
  Agent, 
  VirtualFile, 
  TestCase, 
  SecurityVulnerability, 
  ProjectMission, 
  SolutionBlueprint,
  FirmTicket,
  VirtualCommit,
  ApiLogRecord
} from '../types/forge';

// 5 Main Executive Commanders + 36 Specialized Swarm Engineers = 41 Full-Time Software Firm Employees
export const INITIAL_AGENTS: Agent[] = [
  // ==========================================
  // 5 MAIN EXECUTIVE COMMANDERS & DEPARTMENT CHIEFS
  // ==========================================
  {
    id: 'agent_architect',
    name: 'Prahasta',
    commanderTitle: 'Prahasta • Chief Systems Architect & VP of Engineering',
    avatarSymbol: '🔱',
    role: 'architect',
    division: 'Executive Leadership',
    isExecutive: true,
    avatarColor: 'indigo',
    title: 'Chief Systems Architect & VP of Engineering',
    model: 'Gemini 2.5 Pro (Thinking)',
    systemPrompt: 'You are Prahasta, Chief Architect & VP of Engineering at RavanaForge Software Foundry. You oversee enterprise architectural decomposition, invariant bounds, high-level component diagrams, and author formal Architecture Decision Records (ADRs).',
    temperature: 0.2,
    capabilities: ['Architecture Decomposition', 'ADR Authoring', 'Invariant Bounds', 'Micro-Monolith Topology', 'Enterprise Roadmaps'],
    status: 'thinking',
    currentAction: 'Refining consensus boundary contracts for Raft state machine',
    tokensUsed: 28450,
    confidence: 0.99,
    ticketsCount: 4,
    assignedTickets: ['TCK-101', 'TCK-102'],
  },
  {
    id: 'agent_tech_lead',
    name: 'Indrajit',
    commanderTitle: 'Indrajit • Supreme Strategist & Staff Tech Lead',
    avatarSymbol: '⚡',
    role: 'tech_lead',
    division: 'Executive Leadership',
    isExecutive: true,
    avatarColor: 'purple',
    title: 'Supreme Strategist & Staff Tech Lead',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Indrajit, Supreme Strategist and Tech Lead at RavanaForge. You deconstruct architectural specifications into atomic sprints, enforce interface contracts, oversee task distribution across 35+ engineers, and verify code reviews.',
    temperature: 0.3,
    capabilities: ['Sprint Decomposition', 'Interface Contract Design', 'Code Reviews', 'Task Routing & Dispatch', 'Tech Debt Elimination'],
    status: 'executing',
    currentAction: 'Dispatching KVStore atomic write tickets to Core Backend Division',
    tokensUsed: 31200,
    confidence: 0.98,
    ticketsCount: 5,
    assignedTickets: ['TCK-103', 'TCK-104'],
  },
  {
    id: 'agent_backend_eng',
    name: 'Kumbhakarna',
    commanderTitle: 'Kumbhakarna • Staff Backend & Distributed Infrastructure Lead',
    avatarSymbol: '🛡️',
    role: 'backend_eng',
    division: 'Executive Leadership',
    isExecutive: true,
    avatarColor: 'blue',
    title: 'Staff Backend & Distributed Infrastructure Lead',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Kumbhakarna, Staff Backend & Distributed Systems Lead at RavanaForge. You author high-concurrency Go and Node.js engines, lockless ring buffers, memory management primitives, and fault-tolerant network services.',
    temperature: 0.2,
    capabilities: ['Go Concurrency & Goroutines', 'Lockless Ring Buffers', 'eBPF Kernel Bypass', 'Distributed Storage', 'Memory Pools'],
    status: 'coding',
    currentAction: 'Synthesizing mutex-guarded quorum channel in cluster/raft_node.go',
    tokensUsed: 44100,
    confidence: 0.97,
    ticketsCount: 6,
    assignedTickets: ['TCK-105', 'TCK-106'],
  },
  {
    id: 'agent_frontend_eng',
    name: 'Mayasura',
    commanderTitle: 'Mayasura • Principal UI Systems & Frontend Architect',
    avatarSymbol: '🎨',
    role: 'frontend_eng',
    division: 'Executive Leadership',
    isExecutive: true,
    avatarColor: 'emerald',
    title: 'Principal UI Systems & Frontend Architect',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Mayasura, Principal UI Systems Architect at RavanaForge. You design high-density interfaces, reactive state graphs, responsive design systems, WebGL canvases, and WCAG AA accessible design tokens.',
    temperature: 0.4,
    capabilities: ['Google AI Studio UI Fidelity', 'Tailwind & Design Systems', 'Reactive Stores', 'Zero-Pill Typography', 'WebGL & Canvas'],
    status: 'reviewing',
    currentAction: 'Reviewing real-time token telemetry drawer and canvas micro-interactions',
    tokensUsed: 26800,
    confidence: 0.96,
    ticketsCount: 4,
    assignedTickets: ['TCK-107', 'TCK-108'],
  },
  {
    id: 'agent_security_auditor',
    name: 'Atikaya',
    commanderTitle: 'Atikaya • Chief Information Security Officer & Audit Lead',
    avatarSymbol: '🔒',
    role: 'security_auditor',
    division: 'Executive Leadership',
    isExecutive: true,
    avatarColor: 'rose',
    title: 'Chief Information Security Officer & Audit Lead',
    model: 'Gemini 2.5 Pro (Thinking)',
    systemPrompt: 'You are Atikaya, CISO & Security Audit Lead at RavanaForge. You perform static application security testing (SAST), penetration testing, CWE vulnerability classification, zero-day threat prevention, and cryptographical validations.',
    temperature: 0.1,
    capabilities: ['SAST Security Scanning', 'CWE Classification & Remediation', 'Zero-Trust Architecture', 'Buffer Overflow Defense', 'Auth & Token Audit'],
    status: 'thinking',
    currentAction: 'Executing memory exhaustion (CWE-400) vulnerability scan',
    tokensUsed: 21900,
    confidence: 0.99,
    ticketsCount: 3,
    assignedTickets: ['TCK-109'],
  },

  // ==========================================
  // DIVISION 1: ARCHITECTURE, SYSTEMS & DATA (7 EMPLOYEES)
  // ==========================================
  {
    id: 'emp_vibhishana',
    name: 'Vibhishana',
    commanderTitle: 'Vibhishana • Principal Data Modeler',
    avatarSymbol: '📐',
    role: 'data_engineer',
    division: 'Architecture & Systems',
    avatarColor: 'cyan',
    title: 'Principal Data Modeler & Schema Architect',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Vibhishana, Data Modeling Specialist. You formulate relational and document schemas, indexing strategies, and database sharding contracts.',
    temperature: 0.2,
    capabilities: ['Schema Normalization', 'Firestore Data Architecture', 'PostgreSQL Partitioning', 'ERD Generation'],
    status: 'idle',
    tokensUsed: 11200,
    confidence: 0.96,
    ticketsCount: 2,
    assignedTickets: ['TCK-201'],
  },
  {
    id: 'emp_akampana',
    name: 'Akampana',
    commanderTitle: 'Akampana • Distributed Consensus Analyst',
    avatarSymbol: '🌐',
    role: 'architect',
    division: 'Architecture & Systems',
    avatarColor: 'indigo',
    title: 'Distributed Consensus & Raft Analyst',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Akampana, Distributed Consensus Specialist. You simulate split-brain scenarios, quorum losses, and log replication formal models.',
    temperature: 0.2,
    capabilities: ['TLA+ Specifications', 'Consensus Edge Cases', 'Quorum Math', 'Linearizability Audits'],
    status: 'thinking',
    currentAction: 'Formalizing quorum vote threshold for 5-node cluster',
    tokensUsed: 14500,
    confidence: 0.95,
    ticketsCount: 2,
    assignedTickets: ['TCK-202'],
  },
  {
    id: 'emp_shuka',
    name: 'Shuka',
    commanderTitle: 'Shuka • System Topology Planner',
    avatarSymbol: '🗺️',
    role: 'architect',
    division: 'Architecture & Systems',
    avatarColor: 'indigo',
    title: 'System Topology & Capacity Planner',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Shuka, System Topology Planner. You chart network boundaries, latency budgets, egress costs, and cross-region routing topologies.',
    temperature: 0.3,
    capabilities: ['Latency Budgets', 'Cross-Region Topologies', 'Capacity Forecasting', 'Network Mesh Design'],
    status: 'idle',
    tokensUsed: 9800,
    confidence: 0.94,
    ticketsCount: 1,
    assignedTickets: ['TCK-203'],
  },
  {
    id: 'emp_sarana',
    name: 'Sarana',
    commanderTitle: 'Sarana • FinOps & Cost Optimizer',
    avatarSymbol: '💰',
    role: 'architect',
    division: 'Architecture & Systems',
    avatarColor: 'amber',
    title: 'FinOps & Cloud Cost Optimization Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Sarana, Cloud Cost & FinOps Specialist. You analyze token burn, compute instance sizing, bandwidth fees, and serverless billing efficiencies.',
    temperature: 0.2,
    capabilities: ['Cloud Cost Analysis', 'Token Budgeting', 'Compute Sizing', 'Storage Tier Optimization'],
    status: 'idle',
    tokensUsed: 8700,
    confidence: 0.97,
    ticketsCount: 1,
    assignedTickets: ['TCK-204'],
  },
  {
    id: 'emp_dhumraksha',
    name: 'Dhumraksha',
    commanderTitle: 'Dhumraksha • In-Memory Cache Specialist',
    avatarSymbol: '⚡',
    role: 'backend_eng',
    division: 'Architecture & Systems',
    avatarColor: 'blue',
    title: 'High-Throughput In-Memory Cache Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Dhumraksha, Cache Specialist. You engineer LRU/LFU eviction policies, lock-free hash rings, and sub-microsecond key retrieval.',
    temperature: 0.2,
    capabilities: ['LRU Cache Primitives', 'Lock-Free Hash Maps', 'Zero-Allocation Slices', 'Cache Stampede Prevention'],
    status: 'coding',
    currentAction: 'Benchmarking 2-million QPS cache lookup with sync.Map vs atomic buckets',
    tokensUsed: 18400,
    confidence: 0.98,
    ticketsCount: 3,
    assignedTickets: ['TCK-205', 'TCK-206'],
  },
  {
    id: 'emp_vajramushti',
    name: 'Vajramushti',
    commanderTitle: 'Vajramushti • Network Protocol Designer',
    avatarSymbol: '🔗',
    role: 'architect',
    division: 'Architecture & Systems',
    avatarColor: 'blue',
    title: 'P2P Gossip & Network Protocols Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Vajramushti, Protocol Designer. You implement custom binary wire formats, HTTP/3 QUIC streams, and gossip cluster membership protocols.',
    temperature: 0.2,
    capabilities: ['Wire Protocol Design', 'QUIC & HTTP/3', 'SWIM Gossip Protocol', 'Framing & Framing Guards'],
    status: 'idle',
    tokensUsed: 12100,
    confidence: 0.95,
    ticketsCount: 1,
    assignedTickets: ['TCK-207'],
  },
  {
    id: 'emp_mahaparsva',
    name: 'Mahaparsva',
    commanderTitle: 'Mahaparsva • Micro-Monolith Decomposition Lead',
    avatarSymbol: '📦',
    role: 'architect',
    division: 'Architecture & Systems',
    avatarColor: 'indigo',
    title: 'Modular Monolith Architectural Lead',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Mahaparsva, Modular Monolith Lead. You eliminate distributed microservice slop by consolidating dependencies into clean in-process package boundaries.',
    temperature: 0.2,
    capabilities: ['Modular Monoliths', 'Circular Dependency Checks', 'Domain-Driven Design', 'Package Boundaries'],
    status: 'idle',
    tokensUsed: 10400,
    confidence: 0.96,
    ticketsCount: 1,
    assignedTickets: ['TCK-208'],
  },

  // ==========================================
  // DIVISION 2: CORE BACKEND & APIS (8 EMPLOYEES)
  // ==========================================
  {
    id: 'emp_praghasa',
    name: 'Praghasa',
    commanderTitle: 'Praghasa • Go Core Engine Developer',
    avatarSymbol: '🐹',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'Go Core Engine & Systems Developer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Praghasa, Senior Go Developer. You write high-performance Go routines, channel multiplexers, atomic state transitions, and unit benchmarks.',
    temperature: 0.2,
    capabilities: ['Go Idioms & Goroutines', 'Context Propagation', 'Pprof Profiling', 'Channel Synchronization'],
    status: 'coding',
    currentAction: 'Implementing heartbeat loop in cluster/raft_node.go',
    tokensUsed: 22400,
    confidence: 0.97,
    ticketsCount: 3,
    assignedTickets: ['TCK-301'],
  },
  {
    id: 'emp_virupaksha',
    name: 'Virupaksha',
    commanderTitle: 'Virupaksha • Database & Storage Systems Engineer',
    avatarSymbol: '💾',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'PostgreSQL, Vector DB & Firestore Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Virupaksha, Storage Specialist. You implement transactions, ACID guarantees, WAL disk persistence, and vector similarity indexing.',
    temperature: 0.2,
    capabilities: ['Firestore SDK & Rules', 'PostgreSQL pgvector', 'WAL Logging', 'Snapshot Compaction'],
    status: 'idle',
    tokensUsed: 15300,
    confidence: 0.96,
    ticketsCount: 2,
    assignedTickets: ['TCK-302'],
  },
  {
    id: 'emp_durmukha',
    name: 'Durmukha',
    commanderTitle: 'Durmukha • WebSocket & Streaming Engineer',
    avatarSymbol: '📡',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'Real-Time WebSockets & SSE Streaming Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Durmukha, Streaming Specialist. You engineer high-density WebSocket hubs, Server-Sent Events, connection backpressure, and heartbeat ping/pongs.',
    temperature: 0.3,
    capabilities: ['WebSocket Multiplexing', 'SSE Pipelines', 'Backpressure Handling', 'Connection Pooling'],
    status: 'idle',
    tokensUsed: 13900,
    confidence: 0.95,
    ticketsCount: 2,
    assignedTickets: ['TCK-303'],
  },
  {
    id: 'emp_trisiras',
    name: 'Trisiras',
    commanderTitle: 'Trisiras • API Contract & Schema Designer',
    avatarSymbol: '📋',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'GraphQL, REST & OpenAPI Contract Designer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Trisiras, API Contract Designer. You craft type-safe OpenAPI schemas, JSON Schema contracts, and gRPC protobuf declarations.',
    temperature: 0.2,
    capabilities: ['OpenAPI 3.1 Spec', 'TypeScript RPC', 'Zod Schema Validation', 'RESTful Ergonomics'],
    status: 'idle',
    tokensUsed: 11800,
    confidence: 0.97,
    ticketsCount: 2,
    assignedTickets: ['TCK-304'],
  },
  {
    id: 'emp_vidyutjihva',
    name: 'Vidyutjihva',
    commanderTitle: 'Vidyutjihva • Async Worker & Queue Lead',
    avatarSymbol: '⚡',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'amber',
    title: 'Async Worker, Job Queue & Scheduler Lead',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Vidyutjihva, Background Job Engineer. You build persistent job queues, dead-letter retries, idempotency keys, and scheduled batch workers.',
    temperature: 0.3,
    capabilities: ['Idempotency Guards', 'Exponential Backoff', 'Dead Letter Queues', 'Priority Workers'],
    status: 'idle',
    tokensUsed: 14200,
    confidence: 0.96,
    ticketsCount: 2,
    assignedTickets: ['TCK-305'],
  },
  {
    id: 'emp_simhika',
    name: 'Simhika',
    commanderTitle: 'Simhika • Event Stream Architect',
    avatarSymbol: '🌊',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'Event-Driven Stream & Telemetry Architect',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Simhika, Event Stream Architect. You construct pub/sub topics, event consumer groups, schema registries, and outbox transactional patterns.',
    temperature: 0.2,
    capabilities: ['Event Sourcing', 'Transactional Outbox', 'Consumer Groups', 'Compacted Topics'],
    status: 'idle',
    tokensUsed: 10900,
    confidence: 0.94,
    ticketsCount: 1,
    assignedTickets: ['TCK-306'],
  },
  {
    id: 'emp_maricha',
    name: 'Maricha',
    commanderTitle: 'Maricha • AST Parsing & Code Generation Specialist',
    avatarSymbol: '⚙️',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'purple',
    title: 'AST Parser & Code Generation Specialist',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Maricha, AST Specialist. You parse abstract syntax trees in Go and TypeScript, synthesize boilerplate-free client SDKs, and execute tree transforms.',
    temperature: 0.1,
    capabilities: ['Go AST Manipulation', 'TypeScript Compiler API', 'Automated Codegen', 'Macro Expansions'],
    status: 'thinking',
    currentAction: 'Generating type-safe client SDK bindings from Go KVStore interface',
    tokensUsed: 19100,
    confidence: 0.98,
    ticketsCount: 2,
    assignedTickets: ['TCK-307'],
  },
  {
    id: 'emp_subahu',
    name: 'Subahu',
    commanderTitle: 'Subahu • Binary Serialization Engineer',
    avatarSymbol: '📦',
    role: 'backend_eng',
    division: 'Core Backend & APIs',
    avatarColor: 'blue',
    title: 'Zero-Copy Serialization & FlatBuffers Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Subahu, Serialization Specialist. You optimize byte packing, eliminate memory copying, and implement Protobuf / MsgPack streaming decoders.',
    temperature: 0.2,
    capabilities: ['Zero-Copy Deserialization', 'Protobuf Packing', 'Binary Endianness Guards', 'Memory Alignment'],
    status: 'idle',
    tokensUsed: 9900,
    confidence: 0.96,
    ticketsCount: 1,
    assignedTickets: ['TCK-308'],
  },

  // ==========================================
  // DIVISION 3: FRONTEND & UI SYSTEMS (8 EMPLOYEES)
  // ==========================================
  {
    id: 'emp_mandodari',
    name: 'Mandodari',
    commanderTitle: 'Mandodari • Staff UI/UX Design System Principal',
    avatarSymbol: '✨',
    role: 'ui_ux_designer',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Staff UI/UX Design System Principal',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Mandodari, UI/UX Principal. You curate aesthetic harmonies, Google AI Studio dark design palettes, typographic hierarchies, and viewport presence.',
    temperature: 0.4,
    capabilities: ['Design System Tokens', 'Anti-Slop Design Constitution', 'Optical Balance', 'Color Harmony'],
    status: 'reviewing',
    currentAction: 'Auditing Google AI Studio dark surface contrast ratios',
    tokensUsed: 16500,
    confidence: 0.99,
    ticketsCount: 3,
    assignedTickets: ['TCK-401'],
  },
  {
    id: 'emp_sulochana',
    name: 'Sulochana',
    commanderTitle: 'Sulochana • Tailwind CSS & Radix Architect',
    avatarSymbol: '💎',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Tailwind CSS, Radix UI & Component Architect',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Sulochana, Tailwind Architect. You construct modular, zero-pill accessible React components with clean HTML primitives and high performance.',
    temperature: 0.3,
    capabilities: ['Tailwind CSS v4 Engine', 'Radix Primitives', 'Responsive Layouts', 'Zero-Pill Discipline'],
    status: 'coding',
    currentAction: 'Building expandable prompt turn cards with Google AI Studio styling',
    tokensUsed: 21300,
    confidence: 0.97,
    ticketsCount: 3,
    assignedTickets: ['TCK-402'],
  },
  {
    id: 'emp_hemamalini',
    name: 'Hemamalini',
    commanderTitle: 'Hemamalini • WebGL & Kinetic Canvas Specialist',
    avatarSymbol: '🪐',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'WebGL, Three.js & Kinetic Canvas Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Hemamalini, Kinetic UI Specialist. You craft 60fps WebGL particle visualizations, agent swarm orbital graphs, and smooth interactive canvases.',
    temperature: 0.4,
    capabilities: ['Three.js & Canvas 2D', 'Kinetic Spring Curves', 'Particle Renderers', 'Hardware Acceleration'],
    status: 'idle',
    tokensUsed: 14700,
    confidence: 0.95,
    ticketsCount: 2,
    assignedTickets: ['TCK-403'],
  },
  {
    id: 'emp_chitrasena',
    name: 'Chitrasena',
    commanderTitle: 'Chitrasena • Data Visualization Engineer',
    avatarSymbol: '📊',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Data Visualization & Real-Time Charts Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Chitrasena, Data Vis Engineer. You build live latency sparklines, token burn charts, throughput gauges, and multi-node swarm topology visuals.',
    temperature: 0.3,
    capabilities: ['SVG Sparklines & Charts', 'Tabular Numerals', 'Real-time D3 Visualizers', 'Heatmaps'],
    status: 'idle',
    tokensUsed: 12800,
    confidence: 0.96,
    ticketsCount: 2,
    assignedTickets: ['TCK-404'],
  },
  {
    id: 'emp_urvashi',
    name: 'Urvashi',
    commanderTitle: 'Urvashi • Progressive Web App Lead',
    avatarSymbol: '📱',
    role: 'mobile_engineer',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Progressive Web Apps & Service Worker Lead',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Urvashi, PWA Lead. You ensure instant page loads, offline asset caching via Service Workers, responsive touch gestures, and Web App manifests.',
    temperature: 0.3,
    capabilities: ['PWA Offline Sync', 'Service Worker Cache', 'Touch Ergonomics', 'Manifest Compliance'],
    status: 'idle',
    tokensUsed: 11200,
    confidence: 0.94,
    ticketsCount: 1,
    assignedTickets: ['TCK-405'],
  },
  {
    id: 'emp_menaka',
    name: 'Menaka',
    commanderTitle: 'Menaka • Accessibility & Semantic DOM Auditor',
    avatarSymbol: '👁️',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Web Accessibility WCAG AA & Semantic DOM Auditor',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Menaka, Accessibility Auditor. You guarantee WCAG AA contrast compliance, keyboard focus trapping, ARIA live announcements, and screen-reader tree validity.',
    temperature: 0.2,
    capabilities: ['WCAG 2.2 AA Auditing', 'Focus Trap & Rings', 'ARIA Live Regions', 'Semantic HTML5'],
    status: 'idle',
    tokensUsed: 9400,
    confidence: 0.98,
    ticketsCount: 1,
    assignedTickets: ['TCK-406'],
  },
  {
    id: 'emp_rambha',
    name: 'Rambha',
    commanderTitle: 'Rambha • State Management & Reactive Store Architect',
    avatarSymbol: '🔄',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'State Management & Reactive Store Architect',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Rambha, React State Specialist. You prevent unnecessary re-renders, optimize selector memos, and manage multi-turn prompt session history.',
    temperature: 0.2,
    capabilities: ['React 19 Hooks', 'Optimized State Reducers', 'Undo/Redo History', 'IndexedDB Persistence'],
    status: 'idle',
    tokensUsed: 15600,
    confidence: 0.97,
    ticketsCount: 2,
    assignedTickets: ['TCK-407'],
  },
  {
    id: 'emp_tilottama',
    name: 'Tilottama',
    commanderTitle: 'Tilottama • Asset Pipeline & Bundler Specialist',
    avatarSymbol: '⚡',
    role: 'frontend_eng',
    division: 'Frontend & UI Systems',
    avatarColor: 'emerald',
    title: 'Vite & Frontend Bundler Optimization Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Tilottama, Bundler Specialist. You optimize tree-shaking, code splitting, SVG sprite packaging, and Vite 6 dev server latency.',
    temperature: 0.2,
    capabilities: ['Vite 6 Configuration', 'Tree-Shaking Audit', 'Dynamic Imports', 'Zero-Jank Hot Reload'],
    status: 'idle',
    tokensUsed: 10100,
    confidence: 0.96,
    ticketsCount: 1,
    assignedTickets: ['TCK-408'],
  },

  // ==========================================
  // DIVISION 4: QA, TESTING, SECURITY & CHAOS (7 EMPLOYEES)
  // ==========================================
  {
    id: 'emp_mahodara',
    name: 'Mahodara',
    commanderTitle: 'Mahodara • Site Reliability & Chaos Resilience Engineer',
    avatarSymbol: '🌪️',
    role: 'chaos_engineer',
    division: 'QA, Security & Resilience',
    avatarColor: 'amber',
    title: 'Site Reliability & Chaos Resilience Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Mahodara, Chaos Engineer. You inject network latency, simulate sudden node termination, verify fault recovery, and ensure zero data loss during partitions.',
    temperature: 0.3,
    capabilities: ['Chaos Engineering', 'Network Partition Injection', 'Crash Recovery Verification', 'Circuit Breakers'],
    status: 'executing',
    currentAction: 'Running network drop simulation across 3 simulated Raft nodes',
    tokensUsed: 17800,
    confidence: 0.96,
    ticketsCount: 3,
    assignedTickets: ['TCK-501'],
  },
  {
    id: 'emp_kumbha',
    name: 'Kumbha',
    commanderTitle: 'Kumbha • Automated E2E Test Specialist',
    avatarSymbol: '🧪',
    role: 'qa_engineer',
    division: 'QA, Security & Resilience',
    avatarColor: 'teal',
    title: 'Automated Integration & E2E Test Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Kumbha, Test Automation Lead. You design test suites, race condition detectors (`go test -race`), regression fixtures, and end-to-end API validations.',
    temperature: 0.2,
    capabilities: ['Go Race Detector', 'Integration Fixtures', 'Mock Injection', 'Snapshot Verification'],
    status: 'coding',
    currentAction: 'Executing race condition detection on Raft propose channel',
    tokensUsed: 23100,
    confidence: 0.98,
    ticketsCount: 3,
    assignedTickets: ['TCK-502'],
  },
  {
    id: 'emp_nikumbha',
    name: 'Nikumbha',
    commanderTitle: 'Nikumbha • SAST & DAST Penetration Testing Expert',
    avatarSymbol: '🛡️',
    role: 'security_auditor',
    division: 'QA, Security & Resilience',
    avatarColor: 'rose',
    title: 'SAST & DAST Penetration Testing Expert',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Nikumbha, Penetration Tester. You uncover SQL injections, SSRF vectors, cross-site scripting, and payload exhaustion vulnerabilities.',
    temperature: 0.2,
    capabilities: ['Penetration Testing', 'DAST Fuzzing', 'OWASP Top 10 Audit', 'Header Sanitization'],
    status: 'thinking',
    currentAction: 'Auditing API endpoint parameter boundaries against CWE-20',
    tokensUsed: 19400,
    confidence: 0.97,
    ticketsCount: 2,
    assignedTickets: ['TCK-503'],
  },
  {
    id: 'emp_makaraksha',
    name: 'Makaraksha',
    commanderTitle: 'Makaraksha • Latency Profiling & eBPF Engineer',
    avatarSymbol: '⏱️',
    role: 'performance_profiler',
    division: 'QA, Security & Resilience',
    avatarColor: 'amber',
    title: 'Latency Profiling & eBPF Performance Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Makaraksha, Performance Engineer. You analyze CPU flame graphs, memory allocation bottlenecks, lock contention, and sub-millisecond P99 latency.',
    temperature: 0.2,
    capabilities: ['Flame Graph Analysis', 'Lock Contention Profiling', 'Sub-millisecond P99 Latency', 'eBPF Tracing'],
    status: 'idle',
    tokensUsed: 14300,
    confidence: 0.97,
    ticketsCount: 2,
    assignedTickets: ['TCK-504'],
  },
  {
    id: 'emp_kalayavana',
    name: 'Kalayavana',
    commanderTitle: 'Kalayavana • Mutation & Fuzz Testing Lead',
    avatarSymbol: '💥',
    role: 'qa_engineer',
    division: 'QA, Security & Resilience',
    avatarColor: 'teal',
    title: 'Mutation & Property-Based Fuzz Testing Lead',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Kalayavana, Fuzz Tester. You subject software protocols to millions of malformed random bytes and boundary inputs to detect edge crashes.',
    temperature: 0.3,
    capabilities: ['Go Fuzzing (go test -fuzz)', 'Mutation Testing', 'Boundary Value Analysis', 'Crash Dump Triage'],
    status: 'idle',
    tokensUsed: 12200,
    confidence: 0.95,
    ticketsCount: 1,
    assignedTickets: ['TCK-505'],
  },
  {
    id: 'emp_jalandhara',
    name: 'Jalandhara',
    commanderTitle: 'Jalandhara • Cryptographic Protocols Verifier',
    avatarSymbol: '🔐',
    role: 'security_auditor',
    division: 'QA, Security & Resilience',
    avatarColor: 'rose',
    title: 'Cryptographic Protocols & Zero-Knowledge Verifier',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Jalandhara, Cryptography Specialist. You audit TLS 1.3 handshakes, Ed25519 digital signatures, AES-GCM payload encryption, and key rotation.',
    temperature: 0.1,
    capabilities: ['Ed25519 & ECDSA', 'TLS 1.3 Hardening', 'AES-256-GCM', 'Cryptographic Nonce Guards'],
    status: 'idle',
    tokensUsed: 13700,
    confidence: 0.99,
    ticketsCount: 1,
    assignedTickets: ['TCK-506'],
  },
  {
    id: 'emp_taraka',
    name: 'Taraka',
    commanderTitle: 'Taraka • API Key & Secret Scanning Specialist',
    avatarSymbol: '🔑',
    role: 'security_auditor',
    division: 'QA, Security & Resilience',
    avatarColor: 'rose',
    title: 'API Key, Secret Scanning & OAuth Security Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Taraka, Secret Security Specialist. You scan repository commits for leaked credentials, enforce environment variable hygiene, and audit OAuth scopes.',
    temperature: 0.1,
    capabilities: ['Secret Leak Scanning', 'Env Var Validation', 'OAuth Scope Minimization', 'Vault Integration'],
    status: 'idle',
    tokensUsed: 10800,
    confidence: 0.98,
    ticketsCount: 1,
    assignedTickets: ['TCK-507'],
  },

  // ==========================================
  // DIVISION 5: DEVOPS, CLOUD INFRASTRUCTURE & CI/CD (6 EMPLOYEES)
  // ==========================================
  {
    id: 'emp_ravana_ops',
    name: 'Ravana-Ops',
    commanderTitle: 'Ravana-Ops • Automated Delivery Director',
    avatarSymbol: '🚀',
    role: 'devops_eng',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'purple',
    title: 'GitHub Actions CI/CD & Automated Delivery Director',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Ravana-Ops, CI/CD Director. You construct rock-solid GitHub Actions workflows, automate Firebase Hosting releases, and enforce pre-merge gates.',
    temperature: 0.2,
    capabilities: ['GitHub Actions Workflows', 'Firebase Hosting Automation', 'Automated Rollback', 'Docker Multi-Stage'],
    status: 'idle',
    tokensUsed: 21500,
    confidence: 0.98,
    ticketsCount: 3,
    assignedTickets: ['TCK-601'],
  },
  {
    id: 'emp_vritra',
    name: 'Vritra',
    commanderTitle: 'Vritra • Kubernetes & Container Master',
    avatarSymbol: '☸️',
    role: 'devops_eng',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'purple',
    title: 'Docker, OCI & Kubernetes Cluster Orchestrator',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Vritra, Container Orchestration Master. You build slim scratch-based container images, Helm charts, horizontal pod autoscalers, and resource limits.',
    temperature: 0.3,
    capabilities: ['Scratch Base Images', 'K8s HPA Scaling', 'Resource Limits & Cgroups', 'Pod Disruption Budgets'],
    status: 'idle',
    tokensUsed: 14900,
    confidence: 0.96,
    ticketsCount: 2,
    assignedTickets: ['TCK-602'],
  },
  {
    id: 'emp_bhasmasura',
    name: 'Bhasmasura',
    commanderTitle: 'Bhasmasura • Cloud SQL & Storage Infrastructure Manager',
    avatarSymbol: '🗄️',
    role: 'devops_eng',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'purple',
    title: 'Cloud SQL, Redis Cluster & Storage Infrastructure Manager',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Bhasmasura, Infrastructure Manager. You manage Cloud SQL replicas, automated backup snapshots, disk volume expansion, and Redis failover topologies.',
    temperature: 0.2,
    capabilities: ['Cloud SQL HA Replicas', 'Automated Snapshots', 'Connection Pooling (PgBouncer)', 'Failover Drills'],
    status: 'idle',
    tokensUsed: 12600,
    confidence: 0.97,
    ticketsCount: 2,
    assignedTickets: ['TCK-603'],
  },
  {
    id: 'emp_sunda',
    name: 'Sunda',
    commanderTitle: 'Sunda • Observability & OpenTelemetry Lead',
    avatarSymbol: '📈',
    role: 'sre',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'cyan',
    title: 'OpenTelemetry, Prometheus & Grafana Monitoring Lead',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Sunda, Observability Lead. You instrument distributed tracing via OpenTelemetry, setup Prometheus scrape targets, and build operational health dashboards.',
    temperature: 0.2,
    capabilities: ['OpenTelemetry Spans', 'Prometheus Metrics', 'Grafana Dashboards', 'SLO/SLI Error Budgets'],
    status: 'idle',
    tokensUsed: 11400,
    confidence: 0.95,
    ticketsCount: 1,
    assignedTickets: ['TCK-604'],
  },
  {
    id: 'emp_upasunda',
    name: 'Upasunda',
    commanderTitle: 'Upasunda • Incident Response & SRE Lead',
    avatarSymbol: '🚨',
    role: 'sre',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'rose',
    title: 'Incident Response, Alerting & On-Call SRE',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Upasunda, Incident Response SRE. You configure PagerDuty escalation policies, automated health probes, and author Blameless Post-Mortems.',
    temperature: 0.2,
    capabilities: ['Automated Health Probes', 'PagerDuty Escalation', 'Blameless Post-Mortems', 'Runbook Automation'],
    status: 'idle',
    tokensUsed: 10200,
    confidence: 0.98,
    ticketsCount: 1,
    assignedTickets: ['TCK-605'],
  },
  {
    id: 'emp_narantaka',
    name: 'Narantaka',
    commanderTitle: 'Narantaka • Build Cache & Artifact Optimizer',
    avatarSymbol: '⚡',
    role: 'devops_eng',
    division: 'DevOps & Cloud Infra',
    avatarColor: 'purple',
    title: 'Build Cache, Turborepo & Artifact Registry Optimizer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Narantaka, Build Speed Specialist. You eliminate build bottlenecks, tune Go compilation caches, and optimize npm ci install times down to sub-10s.',
    temperature: 0.2,
    capabilities: ['Turborepo Remote Cache', 'Compiler Cache Sizing', 'Artifact Registries', 'Build Speed Optimization'],
    status: 'idle',
    tokensUsed: 8900,
    confidence: 0.96,
    ticketsCount: 1,
    assignedTickets: ['TCK-606'],
  },
];

// Initial Firm Tickets
export const INITIAL_TICKETS: FirmTicket[] = [
  {
    id: 'tck-101',
    ticketCode: 'TCK-101',
    title: 'Define Raft Consensus Invariant Boundaries and Quorum Sizing',
    description: 'Formalize failure domain contracts, leader election invariants, and bounded latency proofs in ADR-004.',
    priority: 'critical',
    status: 'in_progress',
    assignedToId: 'agent_architect',
    assignedToName: 'Prahasta (Chief Architect)',
    division: 'Executive Leadership',
    createdAt: '10:30 AM',
    updatedAt: '10:42 AM',
    linkedFile: 'docs/ADR-004-CONSENSUS-ENGINE.md',
  },
  {
    id: 'tck-103',
    ticketCode: 'TCK-103',
    title: 'Decompose ADR-004 into KVStore Interface and RaftNode specifications',
    description: 'Export clean Go interface contracts with Snapshot isolation semantics and atomic proposal mechanisms.',
    priority: 'high',
    status: 'completed',
    assignedToId: 'agent_tech_lead',
    assignedToName: 'Indrajit (Tech Lead)',
    division: 'Executive Leadership',
    createdAt: '10:35 AM',
    updatedAt: '10:43 AM',
    linkedFile: 'src/cluster/kv_store.go',
  },
  {
    id: 'tck-105',
    ticketCode: 'TCK-105',
    title: 'Synthesize RaftNode struct with Mutex guards and 64MB buffer guard',
    description: 'Implement lockless proposal channels, append-entries RPC handler, and CWE-400 memory bounds.',
    priority: 'critical',
    status: 'in_progress',
    assignedToId: 'agent_backend_eng',
    assignedToName: 'Kumbhakarna (Backend Lead)',
    division: 'Executive Leadership',
    createdAt: '10:38 AM',
    updatedAt: '10:44 AM',
    linkedFile: 'src/cluster/raft_node.go',
  },
  {
    id: 'tck-107',
    ticketCode: 'TCK-107',
    title: 'Construct Google AI Studio Dark UI Canvas & 41-Employee Org Directory',
    description: 'Implement pixel-perfect AI Studio header, parameters drawer, prompt turns, and full firm org structure.',
    priority: 'high',
    status: 'in_review',
    assignedToId: 'agent_frontend_eng',
    assignedToName: 'Mayasura (UI Architect)',
    division: 'Executive Leadership',
    createdAt: '10:40 AM',
    updatedAt: '10:45 AM',
    linkedFile: 'src/components/SoftwareFirmOrgDirectory.tsx',
  },
  {
    id: 'tck-109',
    ticketCode: 'TCK-109',
    title: 'Execute Automated SAST Audit for Unbounded Buffer Allocation (CWE-400)',
    description: 'Run static analysis and penetration vectors across propose channels to verify 64MB payload cutoff.',
    priority: 'critical',
    status: 'in_progress',
    assignedToId: 'agent_security_auditor',
    assignedToName: 'Atikaya (CISO)',
    division: 'Executive Leadership',
    createdAt: '10:41 AM',
    updatedAt: '10:45 AM',
    linkedFile: 'src/cluster/raft_node.go',
  },
  {
    id: 'tck-205',
    ticketCode: 'TCK-205',
    title: 'Benchmark In-Memory LRU Eviction Under 2-Million QPS Concurrent Load',
    description: 'Ensure cache eviction routines never block reader goroutines by using atomic pointer swapping.',
    priority: 'medium',
    status: 'in_progress',
    assignedToId: 'emp_dhumraksha',
    assignedToName: 'Dhumraksha',
    division: 'Architecture & Systems',
    createdAt: '10:42 AM',
    updatedAt: '10:45 AM',
    linkedFile: 'src/cluster/kv_store.go',
  },
  {
    id: 'tck-502',
    ticketCode: 'TCK-502',
    title: 'Write Automated Race Detector Test Suite with go test -race',
    description: 'Stress-test 100 concurrent writers on propose channel to verify zero data races and 100% test pass rate.',
    priority: 'high',
    status: 'completed',
    assignedToId: 'emp_kumbha',
    assignedToName: 'Kumbha',
    division: 'QA, Security & Resilience',
    createdAt: '10:40 AM',
    updatedAt: '10:44 AM',
    linkedFile: 'tests/consensus_test.go',
  },
  {
    id: 'tck-601',
    ticketCode: 'TCK-601',
    title: 'Configure GitHub Actions CI/CD with Instant Firebase Hosting Deploy',
    description: 'Setup .github/workflows/firebase-hosting-merge.yml with workflow_dispatch and secrets fallback.',
    priority: 'high',
    status: 'completed',
    assignedToId: 'emp_ravana_ops',
    assignedToName: 'Ravana-Ops',
    division: 'DevOps & Cloud Infra',
    createdAt: '10:25 AM',
    updatedAt: '10:35 AM',
    linkedFile: '.github/workflows/firebase-hosting-merge.yml',
  },
];

// Initial Virtual Commits
export const INITIAL_COMMITS: VirtualCommit[] = [
  {
    id: 'c-001',
    hash: 'a7f94b2',
    message: 'feat(consensus): synthesize RaftNode struct with mutex guards & 64MB buffer limit',
    author: 'Kumbhakarna (Backend Lead)',
    timestamp: '10:43 AM',
    filesChanged: 2,
    insertions: 78,
    deletions: 4,
    branch: 'main',
  },
  {
    id: 'c-002',
    hash: 'd3e811c',
    message: 'spec(architecture): author ADR-004 defining failure domains & state machine invariants',
    author: 'Prahasta (Chief Architect)',
    timestamp: '10:42 AM',
    filesChanged: 1,
    insertions: 42,
    deletions: 0,
    branch: 'main',
  },
  {
    id: 'c-003',
    hash: '90b1e4a',
    message: 'test(consensus): add 100-client concurrent race verification fixtures (PASS)',
    author: 'Kumbha (QA Specialist)',
    timestamp: '10:44 AM',
    filesChanged: 1,
    insertions: 95,
    deletions: 2,
    branch: 'main',
  },
  {
    id: 'c-004',
    hash: 'ff6192c',
    message: 'sec(audit): verify CWE-400 mitigation with strict chamber ceiling validation',
    author: 'Atikaya (CISO)',
    timestamp: '10:45 AM',
    filesChanged: 1,
    insertions: 12,
    deletions: 8,
    branch: 'main',
  },
];

// Initial API Log Records
export const INITIAL_API_LOGS: ApiLogRecord[] = [
  {
    id: 'api-log-1',
    method: 'POST',
    endpoint: '/api/firm/dispatch',
    statusCode: 200,
    latencyMs: 38,
    timestamp: '10:42:15',
    requestBody: { agentId: 'agent_backend_eng', directive: 'Synthesize raft_node.go with mutex' },
    responseSnippet: '{"status":"dispatched","ticket":"TCK-105","agent":"Kumbhakarna","estimatedTokens":340}',
  },
  {
    id: 'api-log-2',
    method: 'GET',
    endpoint: '/api/firm/employees',
    statusCode: 200,
    latencyMs: 12,
    timestamp: '10:42:30',
    responseSnippet: '{"totalEmployees":41,"activeExecutives":5,"departments":5,"status":"healthy"}',
  },
  {
    id: 'api-log-3',
    method: 'POST',
    endpoint: '/api/security/scan',
    statusCode: 200,
    latencyMs: 44,
    timestamp: '10:43:05',
    requestBody: { targetFile: 'src/cluster/raft_node.go', ruleSet: 'OWASP_TOP_10' },
    responseSnippet: '{"findings":1,"cwe":"CWE-400","remediated":true,"securityScore":100}',
  },
  {
    id: 'api-log-4',
    method: 'POST',
    endpoint: '/api/database/query',
    statusCode: 200,
    latencyMs: 24,
    timestamp: '10:43:20',
    requestBody: { collection: 'firm_tickets', filter: { status: 'in_progress' } },
    responseSnippet: '{"recordsCount":4,"collection":"firm_tickets","cached":true}',
  },
];

export const INITIAL_FILES: VirtualFile[] = [
  {
    id: 'file-1',
    path: 'src/cluster/raft_node.go',
    name: 'raft_node.go',
    language: 'go',
    size: 2840,
    status: 'modified',
    lastEditedBy: 'Kumbhakarna (Backend Lead)',
    previousContent: `package cluster

import "sync"

type RaftNode struct {
	mu sync.Mutex
	id string
}
`,
    content: `package cluster

import (
	"context"
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

// Role defines the consensus state machine role
type Role int

const (
	Follower Role = iota
	Candidate
	Leader
)

// LogEntry encapsulates a replicated state machine command
type LogEntry struct {
	Index uint64
	Term  uint64
	Data  []byte
}

// RaftNode represents a sovereign consensus commander
type RaftNode struct {
	mu        sync.RWMutex
	id        string
	role      Role
	term      uint64
	votedFor  string
	log       []LogEntry
	commitIdx atomic.Uint64
	proposeCh chan []byte

	// Invariant bounds: hard ceiling prevents CWE-400 memory exhaustion
	maxPayloadBytes int
}

// NewRaftNode initializes a resilient consensus commander
func NewRaftNode(id string, peers []string) *RaftNode {
	return &RaftNode{
		id:              id,
		role:            Follower,
		term:            0,
		log:             make([]LogEntry, 0, 1024),
		proposeCh:       make(chan []byte, 512),
		maxPayloadBytes: 64 * 1024 * 1024, // 64MB hard chamber guard
	}
}

// ProposeCommand executes a thread-safe quorum proposal
func (rn *RaftNode) ProposeCommand(ctx context.Context, payload []byte) (uint64, error) {
	// Guard: Enforce invariant chamber bound
	if len(payload) > rn.maxPayloadBytes {
		return 0, fmt.Errorf("payload length %d exceeds invariant limit %d", len(payload), rn.maxPayloadBytes)
	}

	rn.mu.Lock()
	defer rn.mu.Unlock()

	if rn.role != Leader {
		return 0, fmt.Errorf("node %s is not cluster leader", rn.id)
	}

	newIndex := rn.commitIdx.Add(1)
	entry := LogEntry{
		Index: newIndex,
		Term:  rn.term,
		Data:  payload,
	}
	rn.log = append(rn.log, entry)

	return newIndex, nil
}
`,
  },
  {
    id: 'file-2',
    path: 'src/cluster/kv_store.go',
    name: 'kv_store.go',
    language: 'go',
    size: 1950,
    status: 'clean',
    lastEditedBy: 'Indrajit (Tech Lead)',
    content: `package cluster

import (
	"sync"
)

// KVStore defines the high-throughput in-memory storage contract
type KVStore interface {
	Get(key string) ([]byte, bool)
	Put(key string, val []byte) error
	Delete(key string) bool
	Snapshot() (map[string][]byte, error)
}

// MemoryKVStore implements thread-safe memory storage with RWMutex
type MemoryKVStore struct {
	mu    sync.RWMutex
	store map[string][]byte
}

func NewMemoryKVStore() *MemoryKVStore {
	return &MemoryKVStore{
		store: make(map[string][]byte, 4096),
	}
}

func (m *MemoryKVStore) Get(key string) ([]byte, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	val, ok := m.store[key]
	return val, ok
}

func (m *MemoryKVStore) Put(key string, val []byte) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.store[key] = val
	return nil
}

func (m *MemoryKVStore) Delete(key string) bool {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, exists := m.store[key]; exists {
		delete(m.store, key)
		return true
	}
	return false
}

func (m *MemoryKVStore) Snapshot() (map[string][]byte, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	cp := make(map[string][]byte, len(m.store))
	for k, v := range m.store {
		cp[k] = v
	}
	return cp, nil
}
`,
  },
  {
    id: 'file-3',
    path: 'docs/ADR-004-CONSENSUS-ENGINE.md',
    name: 'ADR-004-CONSENSUS-ENGINE.md',
    language: 'markdown',
    size: 2120,
    status: 'clean',
    lastEditedBy: 'Prahasta (Chief Architect)',
    content: `# Architecture Decision Record: ADR-004
## Title: Consensus Engine Architecture & Quorum Replication

* **Status:** Accepted
* **Deciders:** Prahasta (Chief Architect), Indrajit (Tech Lead), Kumbhakarna (Backend Lead)
* **Date:** 2026-10-10

### Context & Problem Statement
The enterprise mission demands a sub-millisecond, linearly consistent distributed cache. We must prevent split-brain scenarios while operating on ephemeral, zero-daemon container architectures without relying on external Zookeeper or etcd clusters.

### Decision
We will synthesize an in-process Raft consensus engine implemented in Go:
1. Strict Quorum of $(N/2)+1$ nodes for state commitments.
2. Invariant Zero-Copy memory ring buffers for incoming payloads.
3. Strict hard ceiling of 64MB on single proposal frames to mathematically nullify CWE-400 resource exhaustion.
4. Modular packaging allowing immediate embedding into single static binaries.

### Consequences
* Positive: Zero external cluster dependencies, single deployable binary, sub-800µs commit latency.
* Negative: Requires custom leader-election log compaction in Go.
`,
  },
  {
    id: 'file-4',
    path: 'src/api/server.ts',
    name: 'server.ts',
    language: 'typescript',
    size: 2400,
    status: 'clean',
    lastEditedBy: 'Mayasura (UI Architect)',
    content: `// RavanaForge Autonomous Full-Stack API Router
import express from 'express';

const app = express();
app.use(express.json());

// 41-Employee Software Firm Engine API Routes
app.get('/api/firm/employees', (req, res) => {
  res.json({
    totalEmployees: 41,
    executives: 5,
    specialists: 36,
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/firm/dispatch', (req, res) => {
  const { agentId, directive } = req.body;
  res.json({
    status: 'dispatched',
    agentId,
    directive,
    ticketId: 'TCK-' + Math.floor(Math.random() * 900 + 100),
    timestamp: new Date().toISOString()
  });
});

export default app;
`,
  },
];

export const INITIAL_TEST_CASES: TestCase[] = [
  {
    id: 'test-1',
    suite: 'Consensus Quorum Suite',
    name: 'TestRaftLeaderElectionLinearizability',
    status: 'passed',
    durationMs: 42,
  },
  {
    id: 'test-2',
    suite: 'Consensus Quorum Suite',
    name: 'TestConcurrentProposeUnderMutexLock',
    status: 'passed',
    durationMs: 18,
  },
  {
    id: 'test-3',
    suite: 'Memory Safety Suite',
    name: 'TestPayloadCeilingEnforcement64MB',
    status: 'passed',
    durationMs: 9,
  },
  {
    id: 'test-4',
    suite: 'Storage Isolation Suite',
    name: 'TestKVStoreSnapshotConsistency',
    status: 'passed',
    durationMs: 31,
  },
  {
    id: 'test-5',
    suite: 'Chaos Partition Suite',
    name: 'TestNetworkSplitBrainRecovery',
    status: 'passed',
    durationMs: 84,
  },
];

export const INITIAL_SECURITY_ISSUES: SecurityVulnerability[] = [
  {
    id: 'vuln-1',
    severity: 'critical',
    title: 'Unbounded Buffer Allocation in Propose Channel (CWE-400)',
    cwe: 'CWE-400',
    file: 'src/cluster/raft_node.go',
    line: 58,
    description: 'Propose channel lacked ceiling validation on payload size, enabling malicious actors to exhaust container heap via oversized byte slices.',
    recommendation: 'Enforce strict 64MB hard ceiling guard before mutex lock allocation.',
    status: 'fixed',
  },
];

export const INITIAL_MISSION: ProjectMission = {
  id: 'mission-raft-cache',
  title: 'Distributed In-Memory Cache with Raft Consensus',
  description: 'Enterprise-grade, sub-millisecond in-memory key-value cache with leader-elected Raft quorum replication and bounded memory limits.',
  stack: ['Go 1.24', 'TypeScript', 'React 19', 'Tailwind CSS', 'Firebase Hosting', 'Docker'],
  currentStageIndex: 2,
  status: 'running',
  metrics: {
    linesOfCode: 1840,
    testsPassing: 5,
    totalTests: 5,
    securityScore: 100,
    iterations: 4,
    costEstimate: 280,
    engineeringHoursSaved: 164,
    zeroDaysPrevented: 1,
  },
  stages: [
    {
      id: 'stg-1',
      name: 'Architectural Decomposition',
      description: 'Analyze failure domains and author ADR-004 specification',
      agentId: 'agent_architect',
      status: 'completed',
      requiresHumanApproval: false,
      artifactsProduced: ['docs/ADR-004-CONSENSUS-ENGINE.md'],
    },
    {
      id: 'stg-2',
      name: 'Interface Specification',
      description: 'Deconstruct ADR into KVStore & RaftNode contract interfaces',
      agentId: 'agent_tech_lead',
      status: 'completed',
      requiresHumanApproval: false,
      artifactsProduced: ['src/cluster/kv_store.go'],
    },
    {
      id: 'stg-3',
      name: 'Core Synthesis & Guarding',
      description: 'Synthesize RaftNode with mutex guards and 64MB buffer boundary',
      agentId: 'agent_backend_eng',
      status: 'in_progress',
      requiresHumanApproval: true,
      artifactsProduced: ['src/cluster/raft_node.go'],
    },
    {
      id: 'stg-4',
      name: 'Race & Chaos Verification',
      description: 'Execute race condition test fixtures and split-brain verification',
      agentId: 'emp_kumbha',
      status: 'pending',
      requiresHumanApproval: false,
      artifactsProduced: ['tests/consensus_test.go'],
    },
    {
      id: 'stg-5',
      name: 'SAST Audit & Production Signoff',
      description: 'Verify zero open CWE vulnerabilities and sign off on production merge',
      agentId: 'agent_security_auditor',
      status: 'pending',
      requiresHumanApproval: true,
      artifactsProduced: ['audit/sast_report.json'],
    },
  ],
};

export const SOLUTION_BLUEPRINTS: SolutionBlueprint[] = [
  {
    id: 'bp-consensus-cache',
    title: 'SpaceX Raptor-3 Distributed In-Memory Engine',
    badge: 'Consensus & Cache',
    tagline: 'Zero-slop monolithic in-memory consensus state machine with sub-800µs P99 latency.',
    category: 'Distributed Systems',
    description: 'Stripped of microservice layers and network tax. Direct in-process Raft quorum replication with hard 64MB chamber boundaries.',
    iconName: 'Cpu',
    stack: {
      frontend: 'React 19 + Tailwind v4 + Vite',
      backend: 'Go 1.24 Monolithic Engine',
      database: 'In-Memory KV + Atomic WAL Snapshots',
      api: 'gRPC / Zero-Copy HTTP/3 QUIC',
    },
    metrics: {
      locEstimate: '3,800 LOC',
      agencyCost: '$45,000',
      agencyTime: '12 Weeks',
      swarmCost: '$120 (AI Tokens)',
      swarmTime: '14 Minutes',
      securityGrade: 'Grade A+ (Zero Open CVEs)',
    },
    highlights: [
      'Sub-800µs P99 linearizable read latency under 100k QPS',
      'Eliminated 80% microservice hops using Raptor-3 part-elimination rules',
      'Automated SAST scan verifying zero memory exhaustion flaws (CWE-400)',
    ],
  },
  {
    id: 'bp-fintech-ledger',
    title: 'Autonomous High-Frequency Ledger & Escrow',
    badge: 'FinTech & Banking',
    tagline: 'Double-entry distributed ledger with ACID idempotency and cryptographic audit trails.',
    category: 'FinTech',
    description: 'Autonomous financial settlement engine with zero-knowledge proof verifiers and double-entry immutable journal tables.',
    iconName: 'ShieldCheck',
    stack: {
      frontend: 'React 19 + Radix UI',
      backend: 'Node.js + TypeScript Fastify',
      database: 'PostgreSQL + Partitioned Timescale',
      api: 'OpenAPI 3.1 + Webhooks',
    },
    metrics: {
      locEstimate: '5,200 LOC',
      agencyCost: '$68,000',
      agencyTime: '16 Weeks',
      swarmCost: '$180 (AI Tokens)',
      swarmTime: '18 Minutes',
      securityGrade: 'SOC-2 Ready (100% Invariant Pass)',
    },
    highlights: [
      'Mathematically impossible negative balance invariant via database checks',
      'Strict double-entry journal with cryptographic hash chains',
      'Live audit logging with zero-trust token authorization',
    ],
  },
  {
    id: 'bp-enterprise-commerce',
    title: 'Ultra-Scale E-Commerce Checkout Foundry',
    badge: 'E-Commerce',
    tagline: 'Flash-sale checkout engine with predictive inventory locking and instant settlement.',
    category: 'E-Commerce',
    description: 'Designed for high-traffic product drops with optimistic concurrency control and zero database lock starvation.',
    iconName: 'Rocket',
    stack: {
      frontend: 'Next.js / Vite React SPA',
      backend: 'Go / Node Micro-Monolith',
      database: 'Cloud SQL + Redis Cluster',
      api: 'REST + GraphQL Subscriptions',
    },
    metrics: {
      locEstimate: '6,400 LOC',
      agencyCost: '$80,000',
      agencyTime: '18 Weeks',
      swarmCost: '$210 (AI Tokens)',
      swarmTime: '22 Minutes',
      securityGrade: 'PCI-DSS Compliant Ready',
    },
    highlights: [
      'Zero oversell guarantee with Redis token buckets and optimistic locks',
      '350ms checkout completion flow from cart to payment gateway',
      'Instant real-time webhook dispatch with automated retry queues',
    ],
  },
];
