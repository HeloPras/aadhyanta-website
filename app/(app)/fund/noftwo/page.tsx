'use client'

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/Layout/Navbar' 
import {
  ArrowRight, CheckCircle, Layers, Target, TrendingUp,
  Shield, Users, BarChart3, Zap, ChevronRight, Download,
  ArrowUpRight
} from 'lucide-react'

/* ─── Global CSS — NOF I token system ───────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }
  .font-display { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(12px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes lineGrow  { from { width:0; } to { width:100%; } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important}

  .stat-pop { animation: numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Card hover lift */
  .lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.2s; }
  .lift:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); border-color: #B71E52 !important; }

  /* Value card hover */
  .val-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
  .val-card:hover { background: #1C1C2E !important; transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
  .val-card:hover .val-icon { background: rgba(183,30,82,0.25) !important; color: #fff !important; }
  .val-card:hover .val-title { color: #fff !important; }
  .val-card:hover .val-desc  { color: rgba(255,255,255,0.55) !important; }

  /* Governance row hover */
  .gov-row { transition: background 0.2s, transform 0.2s; }
  .gov-row:hover { background: #fff !important; transform: translateX(4px); }

  /* Proof card */
  .proof-card { transition: background 0.2s; }
  .proof-card:hover { background: rgba(255,255,255,0.07) !important; }

  /* Instrument row hover */
  .inst-row { transition: background 0.2s, transform 0.2s; cursor: default; }
  .inst-row:hover { background: #fff !important; transform: translateX(4px); }

  /* Hero grid */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Line accent animation */
  .line-grow { animation: lineGrow 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }

  /* NOF connector line */
  .nof-connector { position:relative; }
  .nof-connector::after {
    content: '';
    position: absolute;
    left: 0; bottom: -1px;
    height: 2px;
    background: #B71E52;
    width: 0;
    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .nof-connector:hover::after { width: 100%; }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr,.sr-l,.sr-r,.sr-s')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Animated stat value ────────────────────────────────────────────────── */
function StatValue({ value }: { value: string }) {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.unobserve(e.target) }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <span ref={ref} className={show ? 'stat-pop' : 'opacity-0'}>{value}</span>
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */

const highlights = [
  { value: 'Fund II', label: 'Currently active' },
  { value: 'Blended', label: 'Finance structure' },
  { value: '4+', label: 'Instruments deployed' },
  { value: 'SDG-aligned', label: 'Impact framework' },
]

const differentiators = [
  {
    icon: <Layers size={18} />,
    label: 'Structure',
    title: 'Blended Finance Architecture',
    body: "NOF II integrates commercial and concessional capital — enabling investments that create strong returns while addressing market failures that pure commercial capital overlooks: gender gaps, climate resilience, rural access. This structure doesn't dilute discipline. It expands possibility.",
  },
  {
    icon: <Target size={18} />,
    label: 'Instruments',
    title: 'Beyond Pure Equity',
    body: 'NOF II deploys quasi-equity (revenue shares, profit participation, convertible structures), mezzanine (subordinated debt with equity upside), and bespoke structured products matched to business cash flows and growth profiles — not just traditional growth equity.',
  },
  {
    icon: <TrendingUp size={18} />,
    label: 'Focus',
    title: 'Dual Investment Mandate',
    body: 'Portfolio continuation — follow-on capital for high-performing NOF I companies — alongside strategic new deployments aligned with our proven thesis: sector-agnostic growth equity with strong teams, market traction, and measurable impact potential.',
  },
]

const instruments = [
  { name: 'Equity', tag: 'Core', description: 'Traditional growth equity — board seat, governance strengthening, strategic partnership.' },
  { name: 'Quasi-Equity', tag: 'Flexible', description: 'Revenue shares, profit participation, convertible structures matched to business stage.' },
  { name: 'Mezzanine', tag: 'Structured', description: 'Subordinated debt with equity upside — bridging debt discipline with return enhancement.' },
  { name: 'Structured Products', tag: 'Bespoke', description: 'Custom instruments designed around cash flow profiles, sector dynamics, and impact objectives.' },
]

const corePrinciples = [
  { title: 'Rigorous due diligence', description: 'Comprehensive assessment across financial, commercial, operational, and impact dimensions' },
  { title: 'Hands-on partnership', description: 'Board representation, governance strengthening, strategic support throughout the investment period' },
  { title: 'Value creation focus', description: 'Not just capital deployment — sustainable enterprise building with measurable milestones' },
  { title: 'Institutional governance', description: 'Independent IC, LPAC oversight, full SEBON regulatory compliance' },
  { title: 'Impact measurement', description: 'SDG-aligned metrics tracked with the same rigour as financial KPIs' },
]

const investmentCriteria = [
  { title: 'Proven business model', description: 'Revenue-generating with demonstrated customer traction' },
  { title: 'Strong management', description: 'Domain expertise, execution track record, growth ambition' },
  { title: 'Competitive positioning', description: 'Sustainable advantages — not commodity businesses' },
  { title: 'Governance readiness', description: 'Willingness to embrace transparency and institutional systems' },
  { title: 'Measurable impact', description: 'Jobs, inclusion, climate, or market access — tracked rigorously' },
  { title: 'SDG alignment', description: 'Contribution to sustainable development goals, reported annually' },
]

const whyThisMatters = [
  { label: 'Follow-on capital exists', description: 'Successful companies can access growth rounds domestically' },
  { label: 'Blended finance works', description: 'Commercial and development capital can combine effectively in Nepal' },
  { label: 'Flexible instruments scale', description: 'Beyond pure equity, diverse structures match real business needs' },
  { label: 'Impact drives returns', description: 'SDG-aligned investments deliver competitive performance, not despite it' },
  { label: 'Institutional depth grows', description: 'Track record attracts continued and expanded investor confidence' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[62vh] flex items-end overflow-hidden bg-[#1C1C2E] hero-grid">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('/noftwo/bg.jpg')",
          animation: 'heroZoom 24s ease-in-out infinite alternate',
        }}
      />
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E]/95 via-[#1C1C2E]/70 to-[#1C1C2E]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/85 via-transparent to-transparent" /> */}

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-16">
        {/* Breadcrumb */}
        <div className="sr flex items-center gap-3 mb-7">
          <span className="font-mono-dm text-[9px] tracking-widest uppercase px-3 py-1.5 bg-[#B71E52] rounded text-white">
            Active
          </span>
          <span className="font-mono-dm text-[10px] text-white/40 tracking-[0.1em] uppercase">
            Nepal Opportunity Fund II
          </span>
        </div>

        <h1 className="sr d1 font-display font-bold text-white leading-[1.0] mb-6 text-[clamp(44px,7vw,88px)]">
          Building on<br />
          <em className="italic text-white/45">proven success</em>
        </h1>

        <p className="sr d2 text-white/55 text-base sm:text-lg leading-[1.8] max-w-lg mb-10">
          Enhanced flexibility, continued discipline, expanded impact — NOF II builds on our flagship fund's track record with a blended finance structure and broadened instrument set.
        </p>

        {/* NOF I → NOF II lineage badge */}
        <div className="sr d3 inline-flex items-center gap-4 px-5 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl">
          <span className="font-mono-dm text-[10px] text-white/40 uppercase tracking-[0.1em]">NOF I</span>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-px bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52]" />
            <div className="w-8 h-px bg-[#B71E52]/60" />
          </div>
          <span className="font-mono-dm text-[10px] text-[#B71E52] uppercase tracking-[0.1em]">NOF II</span>
          <span className="font-mono-dm text-[10px] text-white/30 pl-2 border-l border-white/10 uppercase tracking-[0.08em]">Builds on proven concept</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HIGHLIGHTS STRIP
═══════════════════════════════════════════════════════════════════════════ */
function HighlightsStrip() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD]">
          {highlights.map((s, i) => (
            <div key={i} className="sr p-8 lg:p-10" style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-3">{s.label}</div>
              <div className="font-display font-bold text-[#1C1C2E] leading-none text-[clamp(26px,3vw,38px)]">
                <StatValue value={s.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY NOF II
═══════════════════════════════════════════════════════════════════════════ */
function WhyNOF2() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Why NOF II</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            NOF I proved the concept.<br />
            <em className="italic text-[#B71E52]">NOF II expands the model.</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            Our flagship fund demonstrated that Nepal's growth economy can support institutional private equity. But it also revealed opportunities beyond traditional fund structures: follow-on capital needs for high-performing companies, impact-aligned investments requiring patient capital, and growth-stage businesses needing flexible instruments beyond pure equity.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            NOF II addresses these gaps through blended finance — combining commercial institutional capital with concessional development resources to enable deeper impact while maintaining the financial discipline that defined NOF I.
          </p>
        </div>

        {/* Right — structure overview card */}
        <div className="sr-r bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
          <div className="px-8 py-5 border-b border-[#E8E4DD]">
            <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">Structure Overview</span>
          </div>
          <div className="divide-y divide-[#E8E4DD]">
            {[
              { label: 'Capital Mix', value: 'Commercial institutional + concessional development resources' },
              { label: 'Instruments', value: 'Equity, quasi-equity, mezzanine, structured products' },
              { label: 'Investment Focus', value: 'NOF I portfolio follow-on + strategic new investments' },
              { label: 'Impact Framework', value: 'SDG-aligned, measured with same rigour as financial KPIs' },
            ].map((row, i) => (
              <div key={i} className="px-8 py-5">
                <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-1.5">{row.label}</div>
                <div className="text-[14px] text-[#1C1C2E] leading-[1.65]">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHAT'S DIFFERENT — THREE DIFFERENTIATORS
═══════════════════════════════════════════════════════════════════════════ */
function Differentiators() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">What's Different</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Enhanced capabilities,<br /><em className="italic text-[#B71E52]">maintained discipline</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <div key={i} className={`sr lift d${i + 1} bg-white border border-[#E8E4DD] rounded-xl p-8 relative overflow-hidden`}>
              <span className="absolute top-4 right-5 font-display font-bold text-[96px] text-[#1C1C2E]/[0.04] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="val-icon w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-4 transition-all duration-300">
                {d.icon}
              </div>
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-3 block">{d.label}</span>
              <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-3 leading-tight">{d.title}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INSTRUMENTS
═══════════════════════════════════════════════════════════════════════════ */
function Instruments() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Investment Instruments</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            Flexible capital <em className="italic text-[#B71E52]">structures</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Instrument flexibility enables partnerships with businesses at different stages, capital structures, and growth trajectories — expanding our investable universe without compromising return standards or governance discipline.
          </p>
        </div>

        {/* Right — instrument list */}
        <div className="sr-r bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
          <div className="px-8 py-5 border-b border-[#E8E4DD]">
            <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">Capital Instruments</span>
          </div>
          <div className="divide-y divide-[#E8E4DD]">
            {instruments.map((item, i) => (
              <div key={i} className="inst-row flex items-start gap-4 px-8 py-5 bg-[#F5F2ED]">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2 py-1 bg-[#f5e8ed] text-[#B71E52] rounded">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E] mb-0.5">{item.name}</div>
                  <div className="text-[13px] text-stone-500 leading-[1.7]">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHAT STAYS THE SAME
═══════════════════════════════════════════════════════════════════════════ */
function CorePrinciples() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Core Principles</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            What stays <em className="italic text-[#B71E52]">the same</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            While structure and instruments evolve, our core approach remains unchanged. The same disciplined processes, governance standards, and value creation focus that defined NOF I are carried unchanged into NOF II.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#E8E4DD] rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
              <Shield size={14} className="text-[#B71E52]" />
            </div>
            <div>
              <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">Licensed by</div>
              <div className="font-semibold text-[13px] text-[#1C1C2E]">SEBON — Securities Board of Nepal</div>
            </div>
          </div>
        </div>

        {/* Right — checklist */}
        <div className="sr-r bg-white border border-[#E8E4DD] rounded-xl overflow-hidden">
          {corePrinciples.map((item, i) => (
            <div key={i} className={`gov-row flex items-start gap-4 px-7 py-5 bg-white ${i < corePrinciples.length - 1 ? 'border-b border-[#E8E4DD]' : ''}`}>
              <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={10} className="text-[#B71E52]" />
              </div>
              <div>
                <div className="font-semibold text-[14px] text-[#1C1C2E] mb-0.5">{item.title}</div>
                <div className="text-[13px] text-stone-500 leading-[1.65]">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INVESTMENT CRITERIA
═══════════════════════════════════════════════════════════════════════════ */
function InvestmentCriteria() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Investment Criteria</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Similar to NOF I, with <em className="italic text-[#B71E52]">enhanced impact focus</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {investmentCriteria.map((item, i) => (
            <div key={i} className={`sr val-card d${Math.min(i + 1, 5)} bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-6 cursor-default`}>
              <div className="val-icon w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-3 transition-all duration-300">
                <CheckCircle size={16} />
              </div>
              <div className="val-title font-semibold text-[14px] text-[#1C1C2E] mb-1 transition-colors duration-300">{item.title}</div>
              <div className="val-desc text-[13px] text-stone-500 leading-[1.65] transition-colors duration-300">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY THIS MATTERS — dark section
═══════════════════════════════════════════════════════════════════════════ */
function WhyItMatters() {
  return (
    <section className="bg-[#1C1C2E] py-20 md:py-24 hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr text-center mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Ecosystem Impact</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.06] text-white mb-3">
            Why this <em className="italic text-[#B71E52]">matters</em>
          </h2>
          <p className="text-white/50 text-[15px] max-w-xl mx-auto">
            NOF II demonstrates the maturation of Nepal's private equity ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {whyThisMatters.map((item, i) => (
            <div key={i} className={`sr d${Math.min(i + 1, 5)} proof-card flex items-start gap-4 bg-white/[0.05] border border-white/[0.08] rounded-xl p-6`}>
              <div className="w-7 h-7 rounded-full bg-[#B71E52]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={13} className="text-[#B71E52]" />
              </div>
              <div>
                <div className="font-semibold text-[14px] text-[#B71E52] mb-1">{item.label}</div>
                <p className="font-display italic text-[15px] text-white/65 leading-[1.6]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   KEY ADVANTAGES
═══════════════════════════════════════════════════════════════════════════ */
function KeyAdvantages() {
  const cards = [
    { icon: <Shield size={18} />, title: 'Proven Track Record', body: 'Building on NOF I\'s demonstrated success in capital mobilization, portfolio construction, and hands-on value creation across 16 investments.' },
    { icon: <Users size={18} />, title: 'Deeper Impact', body: 'Blended structure enables investments in high-impact enterprises that address market failures — gender inclusion, climate resilience, rural access — while delivering returns.' },
    { icon: <BarChart3 size={18} />, title: 'Enhanced Flexibility', body: 'Multiple instruments and bespoke structures match diverse business needs and growth stages, without compromising institutional discipline or governance standards.' },
  ]
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Investor Advantages</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Why invest in <em className="italic text-[#B71E52]">NOF II</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={i} className={`sr lift d${i + 1} bg-white border border-[#E8E4DD] rounded-xl p-8`}>
              <div className="w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-5">
                {c.icon}
              </div>
              <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-3 leading-tight">{c.title}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr-s grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 bg-[#F5F2ED] rounded-2xl border border-[#E8E4DD]">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Participate in NOF II</span>
            <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-4">
              Ready to join <em className="italic text-[#B71E52]">NOF II?</em>
            </h2>
            <p className="text-stone-500 text-[15px] leading-[1.85] max-w-md">
              Join institutional and development partners building Nepal's next generation of growth enterprises — with enhanced impact, flexibility, and a proven foundation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <a
              href="/contact-us"
              className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
            >
              Investor Inquiry <ArrowRight size={15} />
            </a>
            {/* <a
              href="/downloads/nof2-overview.pdf"
              className="flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200"
            >
              <Download size={15} /> Download Overview
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function NOF2Page() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <HighlightsStrip />
        <WhyNOF2 />
        <Differentiators />
        <Instruments />
        <CorePrinciples />
        <InvestmentCriteria />
        <WhyItMatters />
        <KeyAdvantages />
        <CTA />
      </div>
    </>
  )
}