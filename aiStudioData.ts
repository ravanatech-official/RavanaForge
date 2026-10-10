import { AIStudioModel, AIStudioParams, AIStudioTurn, SavedPrompt } from '../types/aistudio';

export const AVAILABLE_MODELS: AIStudioModel[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tag: 'Fast & Multimodal',
    badge: 'Recommended',
    description: 'Next-gen workhorse model offering balanced latency, multimodal understanding, and rapid synthesis.',
    contextWindow: 1048576,
    maxOutput: 8192,
    tokensPerSec: 145,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    tag: 'Deep Reasoning & Code',
    badge: 'Reasoning',
    description: 'Highest capability model for complex multi-step reasoning, mathematical proofs, and enterprise software synthesis.',
    contextWindow: 2097152,
    maxOutput: 8192,
    tokensPerSec: 88,
  },
  {
    id: 'gemini-2.0-flash-thinking',
    name: 'Gemini 2.0 Flash Thinking',
    tag: 'Chain-of-Thought',
    badge: 'Thinking',
    description: 'Exposes real-time internal chain-of-thought verification before formulating final outputs.',
    contextWindow: 1048576,
    maxOutput: 8192,
    tokensPerSec: 110,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    tag: 'Massive Context',
    badge: '2M Window',
    description: 'Up to 2,000,000 token context window for analyzing full multi-million-line codebases and enterprise repositories.',
    contextWindow: 2097152,
    maxOutput: 8192,
    tokensPerSec: 72,
  },
  {
    id: 'ravana-swarm-ultra',
    name: 'RavanaForge Raptor-3 Swarm',
    tag: '6-Agent Sovereign Engine',
    badge: 'Autonomous',
    description: 'Coordinates 6 autonomous AI commanders (Architect, Lead, Backend, Frontend, QA, Security) in parallel quorum.',
    contextWindow: 4194304,
    maxOutput: 16384,
    tokensPerSec: 210,
  },
];

export const DEFAULT_STUDIO_PARAMS: AIStudioParams = {
  modelId: 'gemini-2.5-flash',
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  systemInstruction: `You are RavanaForge — an autonomous AI software engineering platform. Architect clean, high-performance systems and generate production-ready code with zero fluff.`,
  safetyHarassment: 'BLOCK_ONLY_HIGH',
  safetyHateSpeech: 'BLOCK_ONLY_HIGH',
  safetySexuallyExplicit: 'BLOCK_ONLY_HIGH',
  safetyDangerousContent: 'BLOCK_ONLY_HIGH',
  groundingSearch: true,
  codeExecution: true,
  structuredOutput: false,
  responseSchema: `{\n  "type": "OBJECT",\n  "properties": {\n    "architecture": { "type": "STRING" },\n    "latencyP99Ms": { "type": "NUMBER" },\n    "components": { "type": "ARRAY", "items": { "type": "STRING" } }\n  }\n}`,
  stopSequences: [],
};

export const INITIAL_STUDIO_TURNS: AIStudioTurn[] = [
  {
    id: 'turn-1',
    role: 'user',
    content: 'Architect an ultra-high performance distributed web solution with RavanaForge. Sub-millisecond p99 latency, zero-copy concurrency, and autonomous multi-agent failover. How do we construct this stack?',
    timestamp: '10:41 AM',
  },
  {
    id: 'turn-2',
    role: 'model',
    modelUsed: 'gemini-2.5-flash',
    timestamp: '10:41 AM',
    thought: `Deconstructing Raptor 3 engineering philosophy:
1. Elon Musk's mandate: "The best part is no part. The best process is no process." Raptor 3 eliminated 80% of external piping, sensors, and bolted interfaces by 3D printing regenerative cooling channels directly inside the combustion jacket.
2. In software architecture: Traditional microservices introduce 15+ network hops, JSON serialization overhead, and RPC serialization delays. A Raptor 3 equivalent web solution consolidates this into a single zero-copy actor runtime (Go / Rust) backed by Raft consensus and eBPF kernel network bypass.
3. Quantifying target invariants: P99 latency < 1.2ms, 250,000 writes/sec per node, zero external daemon dependencies.`,
    thoughtSeconds: 14,
    toolCalls: [
      {
        name: 'ast_spec_generator.synthesize_cluster',
        args: { protocol: 'RaftQuorum', zeroCopy: true, targetP99: '0.8ms' },
        result: 'Verified cluster topology: 3-node in-memory state machine with direct ring-buffer serialization.',
        status: 'success',
      },
      {
        name: 'kernel_profiler.analyze_locks',
        args: { concurrencyPrimitive: 'sync.RWMutex vs atomic.Value' },
        result: 'Lock contention reduced by 94.2% using atomic pointer swap on immutable snapshot trees.',
        status: 'success',
      },
    ],
    content: `### 🚀 Raptor 3 Software Architecture: Radical Simplification & Raw Velocity

To engineer a software platform with **SpaceX Raptor 3 rocket engine** characteristics, we apply the exact first-principles doctrine: **eliminate intermediate complexity, consolidate monolithic interfaces, and design for maximum thrust-to-weight ratio.**

#### 1. Core Architectural Pillars
* **Part Consolidation (Zero Microservice Slop):** Instead of 12 distinct microservices with REST/gRPC serialization tax, we synthesize a unified actor runtime in **Go** compiled directly to an optimized static binary.
* **Direct Regenerative Flow (Zero-Copy Ring Buffers):** Inbound payloads bypass standard memory allocations via lockless ring buffers, delivering **sub-millisecond (< 850µs) P99 latency**.
* **Autonomous Invariant Enforcement:** Built-in 6 Sovereign AI Commanders continuously monitor memory thresholds, quorum heartbeats, and zero-day vulnerabilities in background threads.

#### 2. Monolithic Consensus State Machine (Go)`,
    codeBlocks: [
      {
        filename: 'src/cluster/raptor_engine.go',
        language: 'go',
        code: `package cluster

import (
	"context"
	"fmt"
	"sync/atomic"
	"time"
)

// RaptorEngine implements zero-slop consensus state machine
type RaptorEngine struct {
	state       atomic.Uint32 // 0: Idle, 1: Pressurized, 2: Ignition
	commitIndex atomic.Uint64
	ringBuffer  chan []byte
	invariants  []func() error
}

func NewRaptorEngine(bufferDepth int) *RaptorEngine {
	return &RaptorEngine{
		ringBuffer: make(chan []byte, bufferDepth),
		invariants: make([]func() error, 0),
	}
}

// Fire executes sub-millisecond atomic quorum write
func (re *RaptorEngine) Fire(ctx context.Context, payload []byte) (uint64, error) {
	// Guard: Enforce strict payload ceiling (Raptor 3 boundary guard)
	if len(payload) > 64*1024*1024 {
		return 0, fmt.Errorf("payload %d bytes exceeds 64MB hard chamber limit", len(payload))
	}

	select {
	case re.ringBuffer <- payload:
		idx := re.commitIndex.Add(1)
		return idx, nil
	case <-time.After(500 * time.Microsecond):
		return 0, fmt.Errorf("chamber backpressure timeout (<500µs)")
	case <-ctx.Done():
		return 0, ctx.Err()
	}
}`,
      },
    ],
    tokens: 382,
  },
];

export const SAVED_PROMPTS_LIST: SavedPrompt[] = [
  {
    id: 'prompt-1',
    title: 'RavanaForge Core Architecture',
    updatedAt: 'Just now',
    type: 'chat',
    tokenCount: 420,
  },
  {
    id: 'prompt-2',
    title: 'Distributed Raft Consensus KVStore',
    updatedAt: '2 hours ago',
    type: 'chat',
    tokenCount: 890,
  },
  {
    id: 'prompt-3',
    title: 'Zero-Trust Firebase Security Audit',
    updatedAt: 'Yesterday',
    type: 'structured',
    tokenCount: 650,
  },
  {
    id: 'prompt-4',
    title: 'Next.js 15 High-Density Client Portal',
    updatedAt: '3 days ago',
    type: 'freeform',
    tokenCount: 1240,
  },
];
