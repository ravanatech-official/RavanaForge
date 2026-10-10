import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ArrowRight, 
  Lock, 
  Layers, 
  Search, 
  SlidersHorizontal,
  Flame,
  Send,
  Radio
} from 'lucide-react';

interface LiveSolutionPreviewProps {
  onSwitchToCockpit?: () => void;
}

interface KVItem {
  key: string;
  value: string;
  term: number;
  index: number;
  timestamp: string;
  nodesReplicated: number;
}

export const LiveSolutionPreview: React.FC<LiveSolutionPreviewProps> = ({
  onSwitchToCockpit
}) => {
  const [activeTab, setActiveTab] = useState<'raft' | 'ecommerce' | 'fintech'>('raft');

  // Raft Demo State
  const [store, setStore] = useState<KVItem[]>([
    { key: 'session_usr_99', value: '{"role":"admin","tenant":"corp_us"}', term: 3, index: 142, timestamp: '10:43:02', nodesReplicated: 3 },
    { key: 'rate_limit_ip_192', value: '{"tokens":84,"max":100}', term: 3, index: 143, timestamp: '10:43:18', nodesReplicated: 3 },
    { key: 'auth_jwt_pubkey', value: '{"alg":"Ed25519","valid_until":179294}', term: 3, index: 144, timestamp: '10:43:40', nodesReplicated: 3 }
  ]);
  const [inputKey, setInputKey] = useState('cache_order_774');
  const [inputValue, setInputValue] = useState('{"items":2,"total":499.00,"status":"reserved"}');
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitLog, setCommitLog] = useState<string[]>([
    '[RAFT-CLUSTER] Cluster initialized with 3 nodes. Leader elected: Node 1 (Term 3).',
    '[RAFT-QUORUM] Quorum established (3/3 nodes in sync, latency 0.38ms).',
  ]);
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState<KVItem | null>(null);
  const [node2Status, setNode2Status] = useState<'healthy' | 'partitioned'>('healthy');

  // E-Commerce Demo State
  const [stock, setStock] = useState(5);
  const [cartLog, setCartLog] = useState<string[]>([
    '[MUTEX] Distributed lock table initialized in Redis memory tier.',
    '[INVENTORY] Product SKU #APL-16PRO stock verified: 5 units available.',
  ]);
  const [isSimulatingCart, setIsSimulatingCart] = useState(false);

  // FinTech Demo State
  const [fintechAccounts, setFintechAccounts] = useState({
    userVault: 15400.00,
    merchantEscrow: 42300.00,
    settlementPool: 98000.00,
  });
  const [transferAmount, setTransferAmount] = useState('250.00');
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 'TXN-901', debit: 'userVault', credit: 'merchantEscrow', amount: 500.00, status: 'VERIFIED', hash: 'sha256:7f81a...' },
    { id: 'TXN-902', debit: 'merchantEscrow', credit: 'settlementPool', amount: 120.00, status: 'VERIFIED', hash: 'sha256:9c02d...' },
  ]);

  const handleCommitRaft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim() || !inputValue.trim()) return;

    setIsCommitting(true);
    const newIndex = store.length > 0 ? store[store.length - 1].index + 1 : 1;
    const replicatedCount = node2Status === 'healthy' ? 3 : 2;

    setTimeout(() => {
      const newItem: KVItem = {
        key: inputKey.trim(),
        value: inputValue.trim(),
        term: 3,
        index: newIndex,
        timestamp: new Date().toLocaleTimeString(),
        nodesReplicated: replicatedCount,
      };

      setStore(prev => [...prev, newItem]);
      setCommitLog(prev => [
        `[RAFT-PROPOSE] Leader Node 1 proposed Key="${newItem.key}" -> Log Index #${newItem.index} (Term 3).`,
        `[RAFT-COMMIT] Quorum reached (${replicatedCount}/3 nodes acknowledged). Applied to state machine in 0.34ms!`,
        ...prev.slice(0, 8),
      ]);
      setIsCommitting(false);
      setInputKey('');
      setInputValue('');
    }, 450);
  };

  const handleSearchKey = () => {
    if (!searchKey.trim()) {
      setSearchResult(null);
      return;
    }
    const found = store.find(i => i.key.toLowerCase().includes(searchKey.trim().toLowerCase()));
    setSearchResult(found || null);
  };

  const handleSimulateCheckoutBurst = () => {
    setIsSimulatingCart(true);
    setCartLog(prev => [
      '[BURST] Received 12 concurrent checkout requests for SKU #APL-16PRO...',
      ...prev,
    ]);

    setTimeout(() => {
      if (stock > 0) {
        setStock(prev => Math.max(0, prev - 1));
        setCartLog(prev => [
          `[MUTEX-ACQUIRED] Order #ORD-${Math.floor(1000 + Math.random() * 9000)} secured atomic inventory lock.`,
          `[STRIPE-INTENT] Payment webhook verified signature HMAC-SHA256. 1 unit decremented.`,
          `[MUTEX-RELEASED] Remaining inventory: ${Math.max(0, stock - 1)} units. Zero race conditions!`,
          ...prev.slice(0, 10),
        ]);
      } else {
        setCartLog(prev => [
          '[MUTEX-GUARD] Stock depleted (0 remaining). Gracefully redirected excess traffic with 0 over-allocations.',
          ...prev.slice(0, 10),
        ]);
      }
      setIsSimulatingCart(false);
    }, 600);
  };

  const handleFintechTransfer = () => {
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0 || amt > fintechAccounts.userVault) return;

    setFintechAccounts(prev => ({
      ...prev,
      userVault: prev.userVault - amt,
      merchantEscrow: prev.merchantEscrow + amt,
    }));

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      debit: 'userVault (-$' + amt.toFixed(2) + ')',
      credit: 'merchantEscrow (+$' + amt.toFixed(2) + ')',
      amount: amt,
      status: 'VERIFIED',
      hash: `sha256:${Math.random().toString(36).substring(2, 9)}...`,
    };

    setLedgerEntries(prev => [newTxn, ...prev.slice(0, 5)]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] text-slate-100 overflow-y-auto">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 p-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE APPLICATION RUNTIME
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Synthesized by RavanaForge Autonomous Swarm
            </span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-white mt-1">
            Real-Time Verified Software Solution in Action
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test and interact with the production software engines generated by the 6 Sovereign Commanders.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('raft')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'raft'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Raft KV Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('ecommerce')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'ecommerce'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>E-Commerce Mutex</span>
          </button>
          <button
            onClick={() => setActiveTab('fintech')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'fintech'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FinTech Ledger</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-6 space-y-6 flex-1">
        {/* ===================== RAFT CLUSTER TAB ===================== */}
        {activeTab === 'raft' && (
          <div className="space-y-6">
            {/* Raft Nodes Visualization */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Distributed Raft Quorum Topology (3 Replicas)
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400">Chaos Experiment:</span>
                  <button
                    onClick={() => setNode2Status(s => s === 'healthy' ? 'partitioned' : 'healthy')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                      node2Status === 'healthy'
                        ? 'bg-rose-950/40 border-rose-700/60 text-rose-300 hover:bg-rose-900/50'
                        : 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/50'
                    }`}
                  >
                    {node2Status === 'healthy' ? '⚡ Simulate Node 2 Split' : '✅ Reconnect Node 2'}
                  </button>
                </div>
              </div>

              {/* 3 Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Node 1 - Leader */}
                <div className="bg-slate-950/80 rounded-lg p-3 border border-indigo-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center space-x-1.5">
                      <span>Node 1 (10.0.1.10)</span>
                      <span className="text-amber-400">👑 LEADER</span>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Term / Quorum:</span>
                      <span className="text-slate-200 font-bold">Term 3 (Active)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applied Log Index:</span>
                      <span className="text-indigo-300 font-bold">#{store.length > 0 ? store[store.length - 1].index : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heartbeat Period:</span>
                      <span className="text-slate-200">50ms tick</span>
                    </div>
                  </div>
                </div>

                {/* Node 2 - Follower */}
                <div className={`bg-slate-950/80 rounded-lg p-3 border transition ${
                  node2Status === 'healthy' ? 'border-slate-800' : 'border-rose-500/50 bg-rose-950/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center space-x-1.5">
                      <span>Node 2 (10.0.1.11)</span>
                      <span className="text-slate-400 font-normal">FOLLOWER</span>
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                      node2Status === 'healthy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {node2Status === 'healthy' ? 'ONLINE' : 'SPLIT PARTITION'}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Replication State:</span>
                      <span className={node2Status === 'healthy' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {node2Status === 'healthy' ? 'Synchronized' : 'Paused (Quorum Survives)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Match Index:</span>
                      <span className="text-slate-200 font-bold">
                        #{node2Status === 'healthy' ? (store.length > 0 ? store[store.length - 1].index : 0) : 144}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Election Timeout:</span>
                      <span className="text-slate-200">180ms</span>
                    </div>
                  </div>
                </div>

                {/* Node 3 - Follower */}
                <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center space-x-1.5">
                      <span>Node 3 (10.0.1.12)</span>
                      <span className="text-slate-400 font-normal">FOLLOWER</span>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Replication State:</span>
                      <span className="text-emerald-400 font-bold">Synchronized</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Match Index:</span>
                      <span className="text-indigo-300 font-bold">#{store.length > 0 ? store[store.length - 1].index : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Election Timeout:</span>
                      <span className="text-slate-200">220ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Live KV Store Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Commit to Raft Form */}
              <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Linearizable KV Store Playground</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Store any key-value record. Watch the leader propose and replicate across quorum before acknowledging commit.
                  </p>

                  <form onSubmit={handleCommitRaft} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 mb-1">
                        Key (Unique Identifier):
                      </label>
                      <input
                        type="text"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="e.g. user_session_token"
                        className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 mb-1">
                        Value (JSON or String):
                      </label>
                      <textarea
                        rows={2}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='{"field": "value"}'
                        className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isCommitting || !inputKey.trim()}
                      className="w-full py-2 px-4 rounded-md text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
                    >
                      {isCommitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Replicating to Quorum...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Commit to Raft Quorum</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Instant Key Lookup */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    Linearizable Key Lookup:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      placeholder="Type key to retrieve..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-2.5 py-1 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleSearchKey}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 rounded-md transition"
                    >
                      Lookup
                    </button>
                  </div>

                  {searchResult && (
                    <div className="mt-2 p-2 bg-indigo-950/40 border border-indigo-500/40 rounded text-xs font-mono text-indigo-200">
                      <div className="font-bold text-white flex justify-between">
                        <span>Key: {searchResult.key}</span>
                        <span className="text-[10px] text-emerald-400">Index #{searchResult.index}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 break-all mt-1">{searchResult.value}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: State Machine Log & Stored Records */}
              <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                      <Database className="w-3.5 h-3.5" />
                      <span>Committed Raft State Machine ({store.length} Records)</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Zero Race Conditions</span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {store.slice().reverse().map((item) => (
                      <div
                        key={item.index}
                        className="p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-lg hover:border-slate-700 transition"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-indigo-300 truncate max-w-[200px]">{item.key}</span>
                          <span className="text-slate-500 text-[10px]">
                            Log #{item.index} • Term {item.term} • {item.nodesReplicated}/3 Replicas
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 mt-1 break-all line-clamp-2">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Consensus Log Stream */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Cluster Consensus Audit Trail:
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900 font-mono text-[10px] text-slate-400 space-y-0.5 max-h-24 overflow-y-auto">
                    {commitLog.map((log, idx) => (
                      <div key={idx} className={log.includes('COMMIT') ? 'text-emerald-400' : 'text-slate-400'}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== E-COMMERCE TAB ===================== */}
        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    High-Concurrency Flash Checkout Engine
                  </h3>
                </div>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Distributed Row-Level Locks
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Card */}
                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
                        Flash Sale Active
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        Quantum AI Neural Accelerator Board
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        SKU: #APL-16PRO • In-Memory Distributed Lock Guard
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white font-mono">$1,299.00</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-900/60 rounded-md border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Available Stock:</span>
                      <div className="text-xl font-bold font-mono text-white mt-0.5">
                        {stock} <span className="text-xs text-slate-400 font-normal">units</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSimulateCheckoutBurst}
                      disabled={isSimulatingCart || stock === 0}
                      className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center space-x-1.5"
                    >
                      {isSimulatingCart ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing Concurrency...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Simulate Flash Checkout</span>
                        </>
                      )}
                    </button>
                  </div>
                  {stock === 0 && (
                    <p className="text-xs text-rose-400 mt-2 font-mono">
                      Stock Sold Out! Distributed mutex successfully rejected over-allocation without overselling.
                    </p>
                  )}
                </div>

                {/* Concurrency Audit Log */}
                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 flex flex-col justify-between">
                  <h5 className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Distributed Mutex & Payment Invariant Stream:
                  </h5>
                  <div className="bg-slate-900/90 p-3 rounded border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1.5 mt-2 h-40 overflow-y-auto">
                    {cartLog.map((log, idx) => (
                      <div key={idx} className={log.includes('ACQUIRED') ? 'text-emerald-400' : log.includes('GUARD') ? 'text-amber-400' : 'text-slate-400'}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== FINTECH TAB ===================== */}
        {activeTab === 'fintech' && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Autonomous Double-Entry Settlement Ledger
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Sum(Debits) == Sum(Credits) [Invariant Enforced]
                </span>
              </div>

              {/* Accounts balance grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">User Vault Account</span>
                  <div className="text-lg font-mono font-bold text-white mt-1">
                    ${fintechAccounts.userVault.toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">Merchant Escrow</span>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-1">
                    ${fintechAccounts.merchantEscrow.toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">Settlement Liquidity Pool</span>
                  <div className="text-lg font-mono font-bold text-indigo-400 mt-1">
                    ${fintechAccounts.settlementPool.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Action and ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <h5 className="text-xs font-mono font-bold text-white mb-2">Execute Atomic Settlement</h5>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="Amount to transfer..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleFintechTransfer}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-md shadow transition"
                    >
                      Post Entry
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    All debits and credits are cryptographically chained with SHA-256 tamper-evident integrity hashes.
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <h5 className="text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Immutable Journal Ledger:
                  </h5>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {ledgerEntries.map((txn) => (
                      <div key={txn.id} className="p-2 bg-slate-900/70 rounded text-[11px] font-mono flex items-center justify-between">
                        <div>
                          <span className="text-indigo-300 font-bold">{txn.id}</span>
                          <span className="text-slate-400 ml-2">${txn.amount.toFixed(2)}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-1 rounded">
                          {txn.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
