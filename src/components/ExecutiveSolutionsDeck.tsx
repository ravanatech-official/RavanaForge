import React, { useState } from 'react';
import { 
  Zap, 
  Rocket, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Code2, 
  Database, 
  Sparkles, 
  Flame, 
  Server, 
  ShieldAlert, 
  ChevronRight,
  ExternalLink,
  Wand2,
  Sliders,
  DollarSign,
  Play
} from 'lucide-react';
import { SolutionBlueprint, Agent } from '../types/forge';
import { LiveSolutionPreview } from './LiveSolutionPreview';

interface ExecutiveSolutionsDeckProps {
  blueprints: SolutionBlueprint[];
  agents: Agent[];
  onSelectBlueprint: (blueprint: SolutionBlueprint) => void;
  onSwitchToCockpit: () => void;
  onCustomMissionLaunch: (title: string, description: string, stack: string[]) => void;
}

export const ExecutiveSolutionsDeck: React.FC<ExecutiveSolutionsDeckProps> = ({
  blueprints,
  agents,
  onSelectBlueprint,
  onSwitchToCockpit,
  onCustomMissionLaunch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [customSpec, setCustomSpec] = useState<{
    title: string;
    description: string;
    frontend: string;
    backend: string;
    database: string;
    api: string;
    estimatedMinutes: number;
    estimatedCost: string;
  } | null>(null);
  const [showLivePreviewModal, setShowLivePreviewModal] = useState<boolean>(false);

  const categories = ['All', 'Distributed Systems', 'E-Commerce', 'FinTech', 'SaaS', 'AI & Automation', 'Real-Time Logistics'];

  const filteredBlueprints = selectedCategory === 'All' 
    ? blueprints 
    : blueprints.filter(b => b.category === selectedCategory);

  const handleGenerateSpec = (promptText?: string) => {
    const text = promptText || customPrompt;
    if (!text.trim()) return;

    // Intelligent spec synthesis based on keywords
    let title = 'Custom Enterprise Web Solution';
    let frontend = 'Next.js 14 / React 19 + Tailwind CSS SPA';
    let backend = 'Node.js / Go Microservice with Mutex Guards';
    let database = 'PostgreSQL + Redis In-Memory Cache';
    let api = 'RESTful OpenAPI 3.1 + WebSocket Real-Time Gateway';
    let minutes = 15;
    let cost = '$0.18';

    const lower = text.toLowerCase();
    if (lower.includes('crypto') || lower.includes('payment') || lower.includes('fintech') || lower.includes('wallet')) {
      title = 'Autonomous FinTech & Payment Rails Engine';
      backend = 'Go 1.22 Concurrency Core with Double-Entry Invariant Guard';
      database = 'PostgreSQL Append-Only Journal with Cryptographic Audit';
      api = 'Secure HMAC REST API + Stripe / ISO-20022 Financial Gateway';
      minutes = 18;
      cost = '$0.22';
    } else if (lower.includes('shop') || lower.includes('commerce') || lower.includes('store') || lower.includes('cart')) {
      title = 'High-Concurrency E-Commerce & Flash Checkout Engine';
      frontend = 'Next.js 14 + Tailwind UI + Stripe Elements';
      backend = 'Node.js Distributed Inventory Lock Microservice';
      database = 'PostgreSQL (Row-Level Locking) + Redis Distributed Cache';
      api = 'Stripe Payment Webhooks + OpenAPI 3.1 REST';
      minutes = 19;
      cost = '$0.24';
    } else if (lower.includes('ai') || lower.includes('agent') || lower.includes('bot') || lower.includes('chat')) {
      title = 'Enterprise AI Autonomous Intelligence Platform';
      frontend = 'React 19 Dynamic Stream Chat + Executive Dashboard';
      backend = 'Python / TypeScript Agentic Orchestration Pipeline';
      database = 'pgvector Vector Store + Document Knowledge Embeddings';
      api = 'Server-Sent Events (SSE) Streaming + Webhook Dispatches';
      minutes = 16;
      cost = '$0.20';
    } else if (lower.includes('delivery') || lower.includes('uber') || lower.includes('map') || lower.includes('fleet')) {
      title = 'Real-Time Fleet Logistics & Geospatial Dispatch Engine';
      frontend = 'Interactive Map Cluster Canvas + Driver PWA';
      backend = 'Go WebSocket Telemetry Gateway + Routing Optimizer';
      database = 'PostGIS Geospatial DB + Redis Pub/Sub Stream';
      api = 'Bi-Directional WebSockets + Location Telemetry API';
      minutes = 20;
      cost = '$0.25';
    }

    setCustomSpec({
      title,
      description: text,
      frontend,
      backend,
      database,
      api,
      estimatedMinutes: minutes,
      estimatedCost: cost,
    });
  };

  const handleLaunchCustomSpec = () => {
    if (!customSpec) return;
    onCustomMissionLaunch(
      customSpec.title,
      customSpec.description,
      [customSpec.frontend, customSpec.backend, customSpec.database, customSpec.api]
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#070A11] text-slate-100 select-text">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] via-[#090D16] to-[#070A11] py-14 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          {/* Raptor 3 Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wide uppercase text-amber-300">
              SpaceX Raptor 3 Doctrine • Maximum Engineering Thrust
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            We don't just build websites. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
              We forge complete autonomous software solutions.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From high-level business vision to full-stack production systems in minutes. Powered by 6 Sovereign AI Commanders who architect, write backend logic, craft UIs, run chaos tests, and harden zero-day security.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onSwitchToCockpit}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center space-x-2 group transition"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Launch Live Swarm Engine</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => setShowLivePreviewModal(true)}
              className="px-5 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition flex items-center space-x-2"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Interact with Live Solution</span>
            </button>
          </div>

          {/* RAPTOR 3 TELEMETRY HUD (The SpaceX Metric Strip) */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Engineering Thrust</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">1,420+ LOC</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Per-minute synthesis</div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Zero-Day Defense</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">100% Pre-SAST</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">CWE & OWASP Invariant</div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Delivery Velocity</div>
              <div className="text-xl font-bold font-mono text-indigo-400 mt-0.5">18 Minutes</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">vs 4-6 Months Agency</div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Cost Efficiency</div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-0.5">99.8% Saved</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">$0.12 vs $120k Retainer</div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Quorum Integrity</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">99.999%</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Formal ADR proofs</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE 6 SOVEREIGN COMMANDERS ===================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            <span>🔱</span>
            <span>The 6 Sovereign Commanders of RavanaForge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            An Elite 6-Role Engineering Swarm Dedicated to Your Solution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every software solution undergoes rigorous multi-agent validation. No generic code snippets. Real architectural discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-slate-900/40 rounded-xl border border-slate-800/80 p-4 hover:border-slate-700 transition relative overflow-hidden group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-lg shadow-sm">
                  {agent.avatarSymbol || '⚡'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {agent.title}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {agent.systemPrompt.replace(/You are [^.]*\./, '').trim().substring(0, 130)}...
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 bg-slate-950/80 border border-slate-800 rounded text-slate-400"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== READY-TO-IGNITE PRODUCTION BLUEPRINTS ===================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <span>🚀</span>
              <span>1-Click Production Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Select & Ignite an Enterprise Solution
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Choose any pre-architected solution to dispatch the 6 commanders into action. Each blueprint includes complete frontend, backend, database schema, and test suites.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-slate-900/50 rounded-xl border border-slate-800/90 p-5 hover:border-indigo-500/50 transition flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                    {bp.badge}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {bp.metrics.securityGrade}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-3 group-hover:text-amber-400 transition">
                  {bp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {bp.tagline}
                </p>

                {/* Stack breakdown */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs font-mono">
                  <div className="text-slate-400 flex items-start space-x-1">
                    <span className="text-indigo-400 shrink-0 font-bold">FE:</span>
                    <span className="text-slate-300 truncate">{bp.stack.frontend}</span>
                  </div>
                  <div className="text-slate-400 flex items-start space-x-1">
                    <span className="text-amber-400 shrink-0 font-bold">BE:</span>
                    <span className="text-slate-300 truncate">{bp.stack.backend}</span>
                  </div>
                  <div className="text-slate-400 flex items-start space-x-1">
                    <span className="text-emerald-400 shrink-0 font-bold">DB:</span>
                    <span className="text-slate-300 truncate">{bp.stack.database}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1 text-[11px] text-slate-300">
                  {bp.highlights.slice(0, 2).map((hl, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom stats and ignite button */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Agency Cost</span>
                    <span className="text-slate-400 line-through">{bp.metrics.agencyCost}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] block">RavanaForge</span>
                    <span className="text-emerald-400 font-bold">{bp.metrics.swarmCost} ({bp.metrics.swarmTime})</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBlueprint(bp)}
                  className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-1.5 group-hover:bg-amber-600 group-hover:shadow-amber-600/20 transition"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Ignite Solution in Swarm</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CUSTOM SOLUTION SPEC GENERATOR ===================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-800/80">
        <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 rounded-2xl border border-indigo-500/30 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Instant Solution Spec Generator</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Describe Any Web or Software Vision
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Type what you want to build in plain English. The 6 commanders will instantly generate your complete architecture spec (Frontend, Backend, Database, APIs) ready to ignite.
            </p>

            {/* Quick Templates */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-500 font-mono py-1">Quick Suggestions:</span>
              {[
                'Global Marketplace with Stripe & Escrow',
                'High-Frequency Crypto Trading Bot',
                'AI Clinical Diagnostic Portal with HIPAA',
                'Real-Time Food Delivery Dispatch System'
              ].map((template) => (
                <button
                  key={template}
                  onClick={() => {
                    setCustomPrompt(template);
                    handleGenerateSpec(template);
                  }}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition"
                >
                  {template}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateSpec()}
                placeholder="e.g. Build an autonomous multi-tenant booking engine for medical clinics with SMS alerts"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                onClick={() => handleGenerateSpec()}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize Architecture</span>
              </button>
            </div>
          </div>

          {/* Generated Spec Preview Card */}
          {customSpec && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fadeIn">
              <div className="bg-slate-950/80 rounded-xl border border-indigo-500/40 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                      SPEC READY FOR FORGE
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {customSpec.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Est. Time</span>
                      <span className="text-amber-400 font-bold">{customSpec.estimatedMinutes} Mins</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Compute Cost</span>
                      <span className="text-emerald-400 font-bold">{customSpec.estimatedCost}</span>
                    </div>
                  </div>
                </div>

                {/* 4 Pillars Architecture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-[10px] text-indigo-400 block font-bold uppercase">1. Frontend Layer</span>
                    <span className="text-slate-300 text-[11px] mt-0.5 block">{customSpec.frontend}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-[10px] text-amber-400 block font-bold uppercase">2. Backend Engine</span>
                    <span className="text-slate-300 text-[11px] mt-0.5 block">{customSpec.backend}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-[10px] text-emerald-400 block font-bold uppercase">3. Database Schema</span>
                    <span className="text-slate-300 text-[11px] mt-0.5 block">{customSpec.database}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-[10px] text-cyan-400 block font-bold uppercase">4. API Contracts</span>
                    <span className="text-slate-300 text-[11px] mt-0.5 block">{customSpec.api}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleLaunchCustomSpec}
                    className="py-2.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition"
                  >
                    <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Dispatch Swarm into Live Cockpit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== TRADITIONAL AGENCY VS RAVANAFORGE ===================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-white">
            The Raptor 3 Engineering Difference
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Why visionary founders, CTOs, and global enterprises choose RavanaForge over traditional web software shops.
          </p>
        </div>

        <div className="bg-slate-900/40 rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-3 p-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase font-bold">
            <div>Criterion</div>
            <div className="text-rose-400">Traditional Web Agency</div>
            <div className="text-emerald-400">RavanaForge Autonomous Swarm</div>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs font-mono">
            <div className="grid grid-cols-3 p-3.5">
              <span className="text-slate-300 font-bold">Delivery Timeline</span>
              <span className="text-slate-400">16 - 28 Weeks (4-7 Months)</span>
              <span className="text-emerald-300 font-bold">15 - 25 Minutes (Real-Time)</span>
            </div>
            <div className="grid grid-cols-3 p-3.5">
              <span className="text-slate-300 font-bold">Total Project Cost</span>
              <span className="text-slate-400">$85,000 - $160,000</span>
              <span className="text-emerald-300 font-bold">&lt; $0.50 (Autonomous Compute)</span>
            </div>
            <div className="grid grid-cols-3 p-3.5">
              <span className="text-slate-300 font-bold">Team Composition</span>
              <span className="text-slate-400">8 Humans with handover delays</span>
              <span className="text-emerald-300 font-bold">6 Sovereign AI Specialists in Quorum</span>
            </div>
            <div className="grid grid-cols-3 p-3.5">
              <span className="text-slate-300 font-bold">Security & Zero-Day Checks</span>
              <span className="text-slate-400">Manual review at end of cycle</span>
              <span className="text-emerald-300 font-bold">Real-Time Continuous Pre-SAST (Mahodara)</span>
            </div>
            <div className="grid grid-cols-3 p-3.5">
              <span className="text-slate-300 font-bold">Code Quality & Invariants</span>
              <span className="text-slate-400">Inconsistent junior copy-paste</span>
              <span className="text-emerald-300 font-bold">Formal ADR Architecture Contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal for Live Solution Preview */}
      {showLivePreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F19] border border-slate-700 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center space-x-2">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>RavanaForge • Interactive Running Solution Runtime</span>
              </span>
              <button
                onClick={() => setShowLivePreviewModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono"
              >
                Close Preview [ESC]
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <LiveSolutionPreview onSwitchToCockpit={() => {
                setShowLivePreviewModal(false);
                onSwitchToCockpit();
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
