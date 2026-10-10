import { Agent, VirtualFile, TestCase, SecurityVulnerability, ProjectMission, SolutionBlueprint } from '../types/forge';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent_architect',
    name: 'Prahasta',
    commanderTitle: 'Prahasta • Chief Architect',
    avatarSymbol: '🔱',
    role: 'architect',
    avatarColor: 'indigo',
    title: 'Principal Systems Architect',
    model: 'Gemini 2.5 Pro (Thinking)',
    systemPrompt: 'You are Prahasta, Chief Architect in RavanaForge. You analyze software requirements, design high-level component diagrams, establish invariant constraints, and author Architecture Decision Records (ADRs).',
    temperature: 0.2,
    capabilities: ['Architecture Spec', 'ADR Authoring', 'Topology Design', 'Constraint Enforcement'],
    status: 'idle',
    tokensUsed: 14250,
    confidence: 0.98,
  },
  {
    id: 'agent_tech_lead',
    name: 'Indrajit',
    commanderTitle: 'Indrajit • Supreme Strategist',
    avatarSymbol: '⚡',
    role: 'tech_lead',
    avatarColor: 'purple',
    title: 'Staff Tech Lead & Orchestrator',
    model: 'Gemini 2.5 Pro',
    systemPrompt: 'You are Indrajit, Supreme Strategist and Tech Lead in RavanaForge. You deconstruct architectural specifications into atomic developer tickets, define API schemas, enforce code style, and resolve inter-agent dependencies.',
    temperature: 0.3,
    capabilities: ['Task Decomposition', 'Interface Contracts', 'Dependency Graph', 'PR Review'],
    status: 'idle',
    tokensUsed: 28900,
    confidence: 0.95,
  },
  {
    id: 'agent_backend_eng',
    name: 'Kumbhakarna',
    commanderTitle: 'Kumbhakarna • Heavy Synthesizer',
    avatarSymbol: '⚔️',
    role: 'backend_eng',
    avatarColor: 'blue',
    title: 'Senior Systems & Backend Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Kumbhakarna, Heavy Systems & Backend Synthesizer in RavanaForge. You implement high-performance backend services, database transactions, concurrency primitives, and microservice APIs with zero regressions.',
    temperature: 0.2,
    capabilities: ['Code Synthesis', 'AST Manipulation', 'Database Schemas', 'Concurrency & Locks'],
    status: 'idle',
    tokensUsed: 62400,
    confidence: 0.96,
  },
  {
    id: 'agent_frontend_eng',
    name: 'Mayasura',
    commanderTitle: 'Mayasura • Master Architect',
    avatarSymbol: '🎨',
    role: 'frontend_eng',
    avatarColor: 'cyan',
    title: 'Principal UI/UX & Frontend Engineer',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Mayasura, Master Architect and Principal Frontend Engineer in RavanaForge. You craft responsive, accessible, high-performance UI components with modern React, Tailwind CSS, and resilient client-side state.',
    temperature: 0.4,
    capabilities: ['Component Engineering', 'State Hydration', 'A11y Compliance', 'Tailwind Systems'],
    status: 'idle',
    tokensUsed: 43100,
    confidence: 0.94,
  },
  {
    id: 'agent_qa_engineer',
    name: 'Atikaya',
    commanderTitle: 'Atikaya • Battlefield Tester',
    avatarSymbol: '🏹',
    role: 'qa_engineer',
    avatarColor: 'amber',
    title: 'Staff QA & Test Automation Specialist',
    model: 'Gemini 2.5 Flash',
    systemPrompt: 'You are Atikaya, Staff QA and Battlefield Tester in RavanaForge. You write unit, integration, and fuzz testing suites. You hunt edge conditions, race conditions, memory leaks, and boundary anomalies.',
    temperature: 0.2,
    capabilities: ['Unit Test Generation', 'Integration Mocks', 'Edge-Case Fuzzing', 'Coverage Analysis'],
    status: 'idle',
    tokensUsed: 31200,
    confidence: 0.99,
  },
  {
    id: 'agent_security_auditor',
    name: 'Mahodara',
    commanderTitle: 'Mahodara • Imperial Shield',
    avatarSymbol: '🛡️',
    role: 'security_auditor',
    avatarColor: 'rose',
    title: 'Principal DevSecOps & Security Auditor',
    model: 'Gemini 2.5 Pro (SecEngine)',
    systemPrompt: 'You are Mahodara, Imperial Security Shield and DevSecOps Auditor in RavanaForge. You perform static application security testing (SAST), detect SQL/command injection, check OAuth & token sanitization, and audit OWASP Top 10.',
    temperature: 0.1,
    capabilities: ['SAST Static Analysis', 'Secret Leak Detection', 'OWASP Top 10 Audit', 'Zero-Trust Hardening'],
    status: 'idle',
    tokensUsed: 19800,
    confidence: 0.97,
  },
];

export const INITIAL_FILES: VirtualFile[] = [
  {
    id: 'file-1',
    path: 'src/cluster/raft_node.go',
    name: 'raft_node.go',
    language: 'go',
    status: 'clean',
    lastEditedBy: 'Kumbhakarna',
    size: 2840,
    content: `package cluster

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type NodeRole int

const (
	Follower NodeRole = iota
	Candidate
	Leader
)

// RaftNode represents an autonomous consensus peer in RavanaForge Cluster.
type RaftNode struct {
	mu          sync.RWMutex
	id          string
	peers       []string
	currentTerm uint64
	votedFor    string
	role        NodeRole
	log         []LogEntry
	commitIndex uint64
	lastApplied uint64

	heartbeatTicker *time.Ticker
	electionTimeout time.Duration
	stateMachine    KVStore
}

type LogEntry struct {
	Term  uint64
	Index uint64
	Cmd   string
	Key   string
	Value []byte
}

func NewRaftNode(id string, peers []string, store KVStore) *RaftNode {
	return &RaftNode{
		id:              id,
		peers:           peers,
		role:            Follower,
		currentTerm:     0,
		votedFor:        "",
		log:             make([]LogEntry, 0),
		stateMachine:    store,
		electionTimeout: time.Duration(150+time.Now().UnixNano()%150) * time.Millisecond,
	}
}

// ProposeCommand accepts write commands from API clients and commits via quorum consensus.
func (rn *RaftNode) ProposeCommand(ctx context.Context, key string, val []byte) error {
	rn.mu.Lock()
	defer rn.mu.Unlock()

	if rn.role != Leader {
		return fmt.Errorf("node %s is not current leader (current term: %d)", rn.id, rn.currentTerm)
	}

	entry := LogEntry{
		Term:  rn.currentTerm,
		Index: uint64(len(rn.log) + 1),
		Cmd:   "SET",
		Key:   key,
		Value: val,
	}
	rn.log = append(rn.log, entry)

	// In-memory state machine apply
	return rn.stateMachine.Apply(entry)
}
`,
  },
  {
    id: 'file-2',
    path: 'src/cluster/kv_store.go',
    name: 'kv_store.go',
    language: 'go',
    status: 'clean',
    lastEditedBy: 'Kumbhakarna',
    size: 1420,
    content: `package cluster

import (
	"errors"
	"sync"
)

var ErrKeyNotFound = errors.New("key does not exist")

type KVStore interface {
	Get(key string) ([]byte, error)
	Apply(entry LogEntry) error
	Snapshot() ([]byte, error)
}

type MemoryStore struct {
	mu   sync.RWMutex
	data map[string][]byte
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{
		data: make(map[string][]byte),
	}
}

func (m *MemoryStore) Get(key string) ([]byte, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	val, exists := m.data[key]
	if !exists {
		return nil, ErrKeyNotFound
	}
	return val, nil
}

func (m *MemoryStore) Apply(entry LogEntry) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	switch entry.Cmd {
	case "SET":
		m.data[entry.Key] = entry.Value
		return nil
	case "DEL":
		delete(m.data, entry.Key)
		return nil
	default:
		return errors.New("unknown state machine command")
	}
}
`,
  },
  {
    id: 'file-3',
    path: 'tests/raft_consensus_test.go',
    name: 'raft_consensus_test.go',
    language: 'go',
    status: 'clean',
    lastEditedBy: 'Atikaya',
    size: 2120,
    content: `package tests

import (
	"context"
	"testing"
	"time"

	"github.com/ravanaforge/core/cluster"
)

func TestLeaderElectionQuorum(t *testing.T) {
	peers := []string{"node-1", "node-2", "node-3"}
	nodes := make([]*cluster.RaftNode, 3)

	for i := 0; i < 3; i++ {
		store := cluster.NewMemoryStore()
		nodes[i] = cluster.NewRaftNode(peers[i], peers, store)
	}

	// Verify election completes within timeout bounds
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	_ = ctx
	t.Log("Leader election test passed: quorum achieved with zero split-brain incidents.")
}

func TestConcurrentReplication(t *testing.T) {
	store := cluster.NewMemoryStore()
	leader := cluster.NewRaftNode("leader-1", []string{"peer-2"}, store)

	// Simulate concurrent writes
	for i := 0; i < 100; i++ {
		key := "test_key"
		val := []byte("val_payload")
		_ = leader.ProposeCommand(context.Background(), key, val)
	}

	t.Log("100 concurrent log writes successfully processed with strict linearizability.")
}
`,
  },
  {
    id: 'file-4',
    path: 'docs/ADR-004-CONSENSUS-ENGINE.md',
    name: 'ADR-004-CONSENSUS-ENGINE.md',
    language: 'markdown',
    status: 'clean',
    lastEditedBy: 'Prahasta',
    size: 1850,
    content: `# ADR-004: Raft Consensus Engine for In-Memory Storage Layer

## Status
Accepted

## Context
RavanaForge requires low-latency, deterministic multi-agent state persistence across ephemeral worker nodes without requiring external cloud databases.

## Decision
We implement a lightweight Raft consensus replication module using Go channel primitives and in-memory key-value state machines.

## Consequences
- **Positive**: Sub-millisecond latency for distributed commits; no external DBMS daemon required.
- **Positive**: Clean deterministic unit testing via mock channel transports.
- **Negative**: Cluster size must be kept odd (3 or 5 nodes) to guarantee majority quorum.
`,
  },
  {
    id: 'file-5',
    path: 'security/audit-report.json',
    name: 'audit-report.json',
    language: 'json',
    status: 'clean',
    lastEditedBy: 'Mahodara',
    size: 980,
    content: `{
  "scanner": "RavanaForge-SecEngine v2.4",
  "auditTimestamp": "2026-10-06T23:40:00Z",
  "scannedFiles": 18,
  "vulnerabilitiesFound": 1,
  "summary": {
    "critical": 0,
    "high": 0,
    "medium": 1,
    "low": 0
  },
  "complianceScore": 94.2
}
`,
  },
];

export const INITIAL_TEST_CASES: TestCase[] = [
  {
    id: 'tc-1',
    suite: 'ConsensusEngine',
    name: 'TestLeaderElectionQuorum',
    status: 'passed',
    durationMs: 42,
  },
  {
    id: 'tc-2',
    suite: 'ConsensusEngine',
    name: 'TestConcurrentReplicationLinearizability',
    status: 'passed',
    durationMs: 118,
  },
  {
    id: 'tc-3',
    suite: 'StorageLayer',
    name: 'TestMemoryStoreSnapshotIsolation',
    status: 'passed',
    durationMs: 24,
  },
  {
    id: 'tc-4',
    suite: 'NetworkFuzzing',
    name: 'TestSplitBrainNetworkPartitionRecovery',
    status: 'passed',
    durationMs: 280,
  },
  {
    id: 'tc-5',
    suite: 'SecurityRegression',
    name: 'TestBufferBoundarySanitizationOnWire',
    status: 'passed',
    durationMs: 15,
  },
];

export const INITIAL_SECURITY_ISSUES: SecurityVulnerability[] = [
  {
    id: 'sec-1',
    severity: 'medium',
    title: 'Unbounded Slice Allocation in Remote Wire Deserialization',
    cwe: 'CWE-400 (Uncontrolled Resource Consumption)',
    file: 'src/cluster/raft_node.go',
    line: 58,
    description: 'Incoming RPC payload slice allocated directly from message header length without maximum threshold guard.',
    recommendation: 'Enforce max payload limit (64MB) before buffer allocation.',
    status: 'fixed',
  },
];

export const INITIAL_MISSION: ProjectMission = {
  id: 'mission-01',
  title: 'Distributed In-Memory Cache with Raft Consensus',
  description: 'Design and synthesize an autonomous high-throughput consensus storage engine with quorum replication, automatic failover, and comprehensive fuzz testing.',
  stack: ['Go 1.23', 'Raft Consensus', 'Zero-Allocation Protocol', 'SAST Hardened'],
  currentStageIndex: 2,
  status: 'running',
  metrics: {
    linesOfCode: 1420,
    testsPassing: 5,
    totalTests: 5,
    securityScore: 98,
    iterations: 4,
    costEstimate: 0.12,
    engineeringHoursSaved: 18,
    zeroDaysPrevented: 1,
  },
  stages: [
    {
      id: 'stg-1',
      name: 'System Architecture & ADR Design',
      description: 'Prahasta drafts system invariants, failure boundaries, and ADR-004.',
      agentId: 'agent_architect',
      status: 'completed',
      requiresHumanApproval: false,
      artifactsProduced: ['docs/ADR-004-CONSENSUS-ENGINE.md'],
    },
    {
      id: 'stg-2',
      name: 'Interface Specification & Task Breakdown',
      description: 'Indrajit decomposes contracts into atomic implementation tickets.',
      agentId: 'agent_tech_lead',
      status: 'completed',
      requiresHumanApproval: false,
      artifactsProduced: ['src/cluster/kv_store.go'],
    },
    {
      id: 'stg-3',
      name: 'Core Consensus Implementation',
      description: 'Kumbhakarna implements Raft node election logic and snapshot state machine.',
      agentId: 'agent_backend_eng',
      status: 'in_progress',
      requiresHumanApproval: true,
      artifactsProduced: ['src/cluster/raft_node.go'],
    },
    {
      id: 'stg-4',
      name: 'Fuzz Testing & Quorum Validation',
      description: 'Atikaya authors unit tests and runs network partition fuzzing.',
      agentId: 'agent_qa_engineer',
      status: 'pending',
      requiresHumanApproval: false,
      artifactsProduced: ['tests/raft_consensus_test.go'],
    },
    {
      id: 'stg-5',
      name: 'DevSecOps & SAST Audit Hardening',
      description: 'Mahodara runs static code analysis and resolves memory exhaustion vulnerabilities.',
      agentId: 'agent_security_auditor',
      status: 'pending',
      requiresHumanApproval: false,
      artifactsProduced: ['security/audit-report.json'],
    },
  ],
};

export const SOLUTION_BLUEPRINTS: SolutionBlueprint[] = [
  {
    id: 'blueprint-raft',
    title: 'Distributed Raft Consensus & In-Memory KV Cluster',
    badge: 'Deep Tech • Active Engine',
    tagline: 'Fault-tolerant distributed memory tier with linearizable reads & automatic quorum leader election.',
    category: 'Distributed Systems',
    description: 'A production Go distributed storage engine engineered for extreme throughput, bounded latency, and zero data loss across network splits. Implements formal Raft invariants with sub-millisecond local commit times.',
    iconName: 'Cpu',
    stack: {
      frontend: 'Web-Based Cluster Visualizer & Topology Monitor',
      backend: 'Go 1.22 Concurrency Engine with Goroutines & Mutex Locks',
      database: 'Raft State Machine with In-Memory KV & Snapshot Compaction',
      api: 'gRPC Cluster RPC & Low-Latency HTTP/2 REST Endpoints',
    },
    metrics: {
      locEstimate: '1,420 LOC',
      agencyCost: '$85,000',
      agencyTime: '16 Weeks',
      swarmCost: '$0.12',
      swarmTime: '18 Minutes',
      securityGrade: 'A+ (0 Vulnerabilities)',
    },
    highlights: [
      'Automatic leader election with randomized election timeouts',
      'Quorum log matching with strict monotonic index guarantees',
      '64MB memory boundary protection against Denial of Service',
      'Zero external daemons required — self-contained static binary',
    ],
  },
  {
    id: 'blueprint-ecommerce',
    title: 'Global High-Concurrency E-Commerce & Flash Sale Engine',
    badge: 'Enterprise Retail',
    tagline: 'Multi-region checkout platform engineered to handle 100,000+ peak orders/min without overselling.',
    category: 'E-Commerce',
    description: 'Complete e-commerce platform with distributed inventory locks, instant cart serialization, Stripe Payment Intents webhook integration, and real-time order lifecycle tracking.',
    iconName: 'ShoppingBag',
    stack: {
      frontend: 'Next.js 14 / React 19 + Tailwind CSS + Framer Motion',
      backend: 'Node.js / Express Microservices + Distributed Mutex Engine',
      database: 'PostgreSQL with Row-Level Locking & Redis Distributed Cache',
      api: 'RESTful OpenAPI 3.1 + Stripe & PayPal Webhook Listeners',
    },
    metrics: {
      locEstimate: '3,850 LOC',
      agencyCost: '$120,000',
      agencyTime: '24 Weeks',
      swarmCost: '$0.28',
      swarmTime: '24 Minutes',
      securityGrade: 'PCI-DSS Tier 1 Ready',
    },
    highlights: [
      'Atomic stock reservation preventing inventory oversell',
      'Instant payment webhook validation with HMAC SHA-256 signatures',
      'Sub-50ms product catalog search and faceted filtering',
      'Integrated customer dashboard and invoice generation',
    ],
  },
  {
    id: 'blueprint-fintech',
    title: 'Autonomous FinTech Ledger & Atomic Settlement Gateway',
    badge: 'High-Frequency FinTech',
    tagline: 'Immutable double-entry ledger with multi-currency FX conversions and audit verification.',
    category: 'FinTech',
    description: 'Institutional-grade ledger engine enforcing strict double-entry invariants (Debits == Credits). Built for neobanks, cross-border payouts, and automated transaction reconciliation.',
    iconName: 'CircleDollarSign',
    stack: {
      frontend: 'React Financial Dashboard with Real-Time Balance Telemetry',
      backend: 'TypeScript Core Ledger Engine with Strict Invariant Guard',
      database: 'PostgreSQL Append-Only Journal Tables with Cryptographic Hashes',
      api: 'Secure HMAC REST API + ISO-20022 Financial Messaging Schema',
    },
    metrics: {
      locEstimate: '2,900 LOC',
      agencyCost: '$160,000',
      agencyTime: '28 Weeks',
      swarmCost: '$0.22',
      swarmTime: '21 Minutes',
      securityGrade: 'SOC-2 Invariant Compliant',
    },
    highlights: [
      'Mathematically verified double-entry invariant verification',
      'Append-only immutable audit trail with tamper-evident chain hashes',
      'Automated FX settlement with slippage bounds',
      'Zero floating-point rounding errors via integer-cent math',
    ],
  },
  {
    id: 'blueprint-saas',
    title: 'Enterprise Multi-Tenant B2B SaaS Foundry',
    badge: 'B2B Scale',
    tagline: 'Complete multi-tenant workspace platform with granular RBAC, Stripe billing, and audit logs.',
    category: 'SaaS',
    description: 'Turnkey enterprise SaaS platform with tenant domain isolation, role-based access control (Owner, Admin, Member, Guest), team invitations, Stripe tier upgrades, and automated audit logging.',
    iconName: 'Layers',
    stack: {
      frontend: 'Modern React SPA + Tailwind UI Component Architecture',
      backend: 'Fastify / Node.js High-Throughput API Gateway',
      database: 'Multi-Tenant Schema Isolation on PostgreSQL + Redis Sessions',
      api: 'OpenAPI 3.1 Specification with Auto-Generated TypeScript Clients',
    },
    metrics: {
      locEstimate: '4,100 LOC',
      agencyCost: '$95,000',
      agencyTime: '18 Weeks',
      swarmCost: '$0.19',
      swarmTime: '19 Minutes',
      securityGrade: 'A+ (OWASP Audited)',
    },
    highlights: [
      'Tenant data isolation with PostgreSQL Row Level Security (RLS)',
      'Pre-built Stripe checkout & customer portal billing integration',
      'Fine-grained permission matrices with caching middleware',
      'Comprehensive security event audit trail',
    ],
  },
  {
    id: 'blueprint-ai-agent',
    title: 'Autonomous AI Customer Intelligence & Workflow Engine',
    badge: 'Generative AI',
    tagline: 'Real-time agentic support platform that autonomously resolves 90% of complex customer inquiries.',
    category: 'AI & Automation',
    description: 'Multi-agent orchestration service that ingests user support tickets, queries internal knowledge via vector embeddings, verifies solution correctness, and executes automated customer actions.',
    iconName: 'Sparkles',
    stack: {
      frontend: 'Interactive Agent Chat & Human-in-the-Loop Review Console',
      backend: 'Python / Node.js Agentic Pipeline with Function Calling',
      database: 'pgvector / Pinecone Vector Store + Document Chunk Embeddings',
      api: 'Server-Sent Events (SSE) Streaming + Webhook Triggers',
    },
    metrics: {
      locEstimate: '3,200 LOC',
      agencyCost: '$110,000',
      agencyTime: '20 Weeks',
      swarmCost: '$0.25',
      swarmTime: '22 Minutes',
      securityGrade: 'Enterprise Privacy Shield',
    },
    highlights: [
      'Autonomous ticket triage and multi-turn resolution',
      'Hallucination guardrails and ground-truth verification',
      'Automated escalation to human operator when confidence drops below 85%',
      'Detailed agent thought trace logs for compliance review',
    ],
  },
  {
    id: 'blueprint-logistics',
    title: 'Real-Time Global Logistics & Fleet Dispatch Engine',
    badge: 'Spatial & IoT',
    tagline: 'Sub-second driver tracking, spatial geofencing, and automated dispatch route optimization.',
    category: 'Real-Time Logistics',
    description: 'High-density real-time tracking engine for on-demand delivery, freight routing, and courier dispatch. Handles dynamic geofence triggers and live driver status over bi-directional WebSockets.',
    iconName: 'Navigation',
    stack: {
      frontend: 'Interactive Dispatch Canvas with Live Map Marker Clustering',
      backend: 'Go / Node.js High-Concurrency WebSocket Gateway',
      database: 'PostGIS Spatial Database + Redis Pub/Sub Message Broker',
      api: 'Bi-Directional WebSockets + REST Dispatch Orchestration API',
    },
    metrics: {
      locEstimate: '3,400 LOC',
      agencyCost: '$140,000',
      agencyTime: '22 Weeks',
      swarmCost: '$0.24',
      swarmTime: '20 Minutes',
      securityGrade: 'A+ (TLS 1.3 & HMAC Auth)',
    },
    highlights: [
      'Sub-50ms location updates over persistent WebSockets',
      'Spatial geofencing with polygon containment calculations',
      'Intelligent dispatch algorithm matching nearest driver to highest priority job',
      'Live driver telemetry and ETA recalculation engine',
    ],
  },
];
