'use client'

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import {
  ChevronRight, CheckCircle, ArrowRight, Zap, Building2,
  Smartphone, Leaf, Factory, Shield, Globe, TrendingUp,
  BarChart3, Users, ArrowUpRight
} from 'lucide-react'

/* ─── Global CSS — same token system ────────────────────────────────────── */
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
  @keyframes barFill   { from { width:0; } to { width:var(--bar-w); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(12px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important}

  /* Stat pop */
  .stat-pop { animation: numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Progress bars — animated on scroll */
  .prog-bar { animation: barFill 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; width:0; }

  /* Card hover lift */
  .lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.2s; }
  .lift:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); border-color: #B71E52 !important; }

  /* Value card hover */
  .val-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
  .val-card:hover { background: #1C1C2E !important; transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
  .val-card:hover .val-icon { background: rgba(183,30,82,0.25) !important; color: #fff !important; }
  .val-card:hover .val-title { color: #fff !important; }
  .val-card:hover .val-desc  { color: rgba(255,255,255,0.55) !important; }

  /* Portfolio card */
  .port-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .port-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); }

  /* Governance row hover */
  .gov-row { transition: background 0.2s, transform 0.2s; }
  .gov-row:hover { background: #fff !important; transform: translateX(4px); }

  /* Hero grid */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Proof card */
  .proof-card { transition: background 0.2s; }
  .proof-card:hover { background: rgba(255,255,255,0.07) !important; }
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
  return (
    <span ref={ref} className={show ? 'stat-pop' : 'opacity-0'}>{value}</span>
  )
}

/* ─── Animated progress bar ─────────────────────────────────────────────── */
function ProgressBar({ value, max }: { value: number; max: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.unobserve(e.target) }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const pct = Math.round((value / max) * 100)
  return (
    <div ref={ref} className="w-full h-1.5 bg-[#E8E4DD] rounded-full overflow-hidden">
      <div
        className={`h-full bg-[#B71E52] rounded-full ${show ? 'prog-bar' : ''}`}
        style={{ '--bar-w': `${pct}%` } as React.CSSProperties}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const stats = [
  { value: 'NPR 300Cr', label: 'Raised from institutions' },
  { value: '18 Months', label: 'Fully deployed' },
  { value: '127', label: 'Opportunities screened' },
  { value: '12%', label: 'Conversion rate' },
]

const pipeline = [
  { label: 'Opportunities Screened', value: 127, max: 127 },
  { label: 'Full Due Diligence', value: 25, max: 127 },
  { label: 'Investments Made', value: 16, max: 127 },
]

const pillars = [
  {
    label: 'Capital Mobilization',
    heading: 'Institutional confidence at scale',
    body: "Raised NPR 300 crores from Nepal's leading financial institutions — the 4 largest banks and 7 insurance companies. Fully deployed in 18 months, proving our ability to source, assess, and execute deals with discipline.",
  },
  {
    label: 'Portfolio Construction',
    heading: 'Sector-agnostic market intelligence',
    body: 'Built a diversified portfolio across energy, manufacturing, hospitality, technology, and agriculture. Screened 127 opportunities, conducted full due diligence on 25, and invested in 16.',
  },
  {
    label: 'Value Creation',
    heading: 'Hands-on partnership beyond capital',
    body: 'Delivered board seats, governance strengthening, strategic planning, market access, and operational support across every portfolio company. Multiple companies advancing toward public markets.',
  },
]

const whatWeLookFor = [
  { title: 'Proven Market Demand', description: 'Revenue-generating businesses with demonstrated customer traction, not early-stage concepts' },
  { title: 'Capable Management', description: 'Domain expertise, execution track record, and growth ambition' },
  { title: 'Clear Competitive Position', description: 'Sustainable advantages in their markets, not commodity businesses' },
  { title: 'Governance Readiness', description: 'Willingness to strengthen systems, embrace transparency, and build institutional discipline' },
  { title: 'Growth Pathway', description: 'Clear use of capital with measurable milestones and realistic scaling plans' },
  { title: 'Impact Alignment', description: 'Contribution to jobs, inclusion, or sustainability — measured rigorously' },
]

const howWeAddValue = [
  { icon: <Shield size={18} />, title: 'Governance Strengthening', description: 'Board representation and institutional frameworks' },
  { icon: <BarChart3 size={18} />, title: 'Financial Management', description: 'Improved reporting systems and discipline' },
  { icon: <Globe size={18} />, title: 'Market Access', description: 'Buyer and supplier introductions' },
  { icon: <TrendingUp size={18} />, title: 'Strategic Planning', description: 'Performance monitoring and growth roadmaps' },
  { icon: <Users size={18} />, title: 'Follow-on Capital', description: 'Unlock funding through our investor network' },
  { icon: <Building2 size={18} />, title: 'Regulatory Navigation', description: 'Build stakeholder relationships and compliance' },
]

const portfolio = [
  {
    icon: <Zap size={22} />,
    sector: 'Renewable Energy Infrastructure',
    name: 'Shikhar Power Development Limited',
    description: 'Long-term partnership supporting clean energy generation. Our involvement strengthened governance, improved financial reporting, and facilitated additional financing for expansion projects.',
    impacts: ['MW-scale clean energy', 'CO₂ emissions avoided', 'Rural energy access'],
  },
  {
    icon: <Smartphone size={22} />,
    sector: 'Digital Financial Inclusion',
    name: 'DV Excellus Kheti',
    description: 'Supporting digital fintech platform expanding access to finance for farmers and small enterprises. Hands-on support in product development, regulatory navigation, and scaling operations.',
    impacts: ['NPR 170M+ loans disbursed', '12,000+ users', '900+ farmer beneficiaries'],
  },
  {
    icon: <Leaf size={22} />,
    sector: 'Agriculture Value Chains',
    name: 'Daunne Agro Farm Limited',
    description: 'Market leader in poultry production with expansion capital and governance support. Partnership focused on scaling operations, improving efficiency, and strengthening market position.',
    impacts: ['Large-scale production', 'Food security', 'Rural employment'],
  },
  {
    icon: <Factory size={22} />,
    sector: 'Agricultural Processing',
    name: 'Shreenagar Agritech Industries',
    description: 'Long-established agritech venture with growth capital for market expansion. Over two decades of operations with demonstrated market leadership and scaling potential.',
    impacts: ['Smallholder farmer linkages', 'Value addition', 'Market access'],
  },
]

const governance = [
  { title: 'Independent Investment Committee', description: 'All investment decisions made by experienced IC with rigorous approval process' },
  { title: 'Limited Partners Advisory Committee', description: 'Investor oversight and conflict resolution' },
  { title: 'SEBON Regulation', description: 'Full compliance with regulatory requirements' },
  { title: 'Quarterly Reporting', description: 'Transparent communication with all investors' },
  { title: 'Annual Impact Measurement', description: 'SDG-aligned metrics tracked with same rigour as financial performance' },
]

const proofs = [
  'Domestic capital can be mobilized at meaningful scale',
  'Rigorous processes create value, not just deploy capital',
  "Exit pathways exist through Nepal's growing public markets",
  'Impact and returns are complementary, not competing objectives',
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#1C1C2E] hero-grid">
      {/* Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80')",
          animation: 'heroZoom 22s ease-in-out infinite alternate',
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E]/95 via-[#1C1C2E]/65 to-[#1C1C2E]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/80 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        {/* Fund label row */}
        <div className="sr flex items-center gap-3 mb-7">
          <span className="font-mono-dm text-[9px] tracking-widest uppercase px-3 py-1.5 bg-[#B71E52] rounded text-white">
            Fully Deployed
          </span>
          <span className="font-mono-dm text-[10px] text-white/40 tracking-[0.1em] uppercase">
            Nepal Opportunity Fund I
          </span>
        </div>

        {/* Headline */}
        <h1 className="sr d1 font-display font-bold text-white leading-[1.0] mb-6
          text-[clamp(44px,7vw,88px)]">
          Proof of concept,<br />
          <em className="italic text-white/45">delivered</em>
        </h1>

        <p className="sr d2 text-white/55 text-base sm:text-lg leading-[1.8] max-w-lg">
          Nepal's flagship sector-agnostic growth equity fund — demonstrating disciplined capital deployment and sustainable value creation.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS STRIP
═══════════════════════════════════════════════════════════════════════════ */
function StatsStrip() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD]">
          {stats.map((s, i) => (
            <div key={i} className="sr p-8 lg:p-10" style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-3">{s.label}</div>
              <div className="font-display font-bold text-[#1C1C2E] leading-none text-[clamp(30px,3.5vw,44px)]">
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
   THE CHALLENGE
═══════════════════════════════════════════════════════════════════════════ */
function Challenge() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">The Challenge</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            We set out to prove institutional private equity <em className="italic text-[#B71E52]">works in Nepal</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            In 2021, Nepal's most promising enterprises faced a fundamental constraint: access to patient, professionally managed growth capital. Banks provided debt, but equity was scarce. Family offices invested opportunistically, but institutional fund management was virtually nonexistent.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            We set out to prove that Nepal's growth economy could support institutional private equity — that domestic capital could be mobilized at scale, deployed with discipline, and create measurable value.
          </p>
        </div>

        {/* Right — pipeline funnel */}
        <div className="sr-r flex flex-col gap-4">
          {pipeline.map((item, i) => (
            <div key={i} className="bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[14px] text-[#1C1C2E]">{item.label}</span>
                <span className="font-display font-bold text-[22px] text-[#B71E52] leading-none">{item.value}</span>
              </div>
              <ProgressBar value={item.value} max={item.max} />
            </div>
          ))}
          <p className="font-mono-dm text-[10px] text-stone-400 tracking-[0.08em] text-right pt-1">
            12% conversion rate reflects rigorous discipline
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   THREE PILLARS
═══════════════════════════════════════════════════════════════════════════ */
function Pillars() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">What We Delivered</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Three pillars of <em className="italic text-[#B71E52]">success</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <div key={i} className={`sr lift d${i + 1} bg-white border border-[#E8E4DD] rounded-xl p-8 relative overflow-hidden`}>
              {/* Ghost number */}
              <span className="absolute top-4 right-5 font-display font-bold text-[96px] text-[#1C1C2E]/[0.04] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-4 block">{p.label}</span>
              <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-3 leading-tight">{p.heading}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INVESTMENT APPROACH
═══════════════════════════════════════════════════════════════════════════ */
function Approach() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Investment Approach</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            What we look for &amp; <em className="italic text-[#B71E52]">how we add value</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* What We Look For */}
          <div className="sr-l bg-[#F5F2ED] rounded-xl border border-[#E8E4DD] overflow-hidden">
            <div className="px-8 py-5 border-b border-[#E8E4DD]">
              <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">What We Look For</span>
            </div>
            <div className="divide-y divide-[#E8E4DD]">
              {whatWeLookFor.map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-8 py-5">
                  <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={10} className="text-[#B71E52]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-[#1C1C2E] mb-0.5">{item.title}</div>
                    <div className="text-[13px] text-stone-500 leading-[1.7]">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How We Add Value */}
          <div className="sr-r flex flex-col gap-4">
            <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase mb-1">How We Add Value</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {howWeAddValue.map((item, i) => (
                <div key={i} className={`val-card bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-5 cursor-default`}>
                  <div className={`val-icon w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-3 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <div className={`val-title font-semibold text-[14px] text-[#1C1C2E] mb-1 transition-colors duration-300`}>{item.title}</div>
                  <div className={`val-desc text-[13px] text-stone-500 leading-[1.65] transition-colors duration-300`}>{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO HIGHLIGHTS
═══════════════════════════════════════════════════════════════════════════ */
function Portfolio() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Portfolio Highlights</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-3">
            Representative <em className="italic text-[#B71E52]">investments</em>
          </h2>
          <p className="text-stone-500 text-[15px]">
            Demonstrating our approach across sectors. Full details available to qualified investors.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {portfolio.map((item, i) => (
            <div key={i} className={`sr d${Math.min(i + 1, 4)} port-card bg-white border border-[#E8E4DD] rounded-xl overflow-hidden`}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-0">

                {/* Left — content */}
                <div className="p-7 sm:p-8 border-b md:border-b-0 md:border-r border-[#E8E4DD]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.1em] uppercase mb-0.5">{item.sector}</div>
                      <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-[#1C1C2E] leading-tight">{item.name}</h3>
                    </div>
                  </div>
                  <p className="text-stone-500 text-[14px] leading-[1.8]">{item.description}</p>
                </div>

                {/* Right — impact */}
                <div className="p-7 sm:p-8 bg-[#F5F2ED] flex flex-col justify-center">
                  <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-4">Impact</div>
                  <ul className="flex flex-col gap-3">
                    {item.impacts.map((imp, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0 mt-[6px]" />
                        <span className="text-[13px] text-stone-600 leading-[1.65]">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GOVERNANCE
═══════════════════════════════════════════════════════════════════════════ */
function Governance() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Governance &amp; Oversight</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            Institutional discipline <em className="italic text-[#B71E52]">throughout</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Every aspect of NOF I operates under rigorous institutional standards — from investment decision-making to reporting, regulatory compliance, and impact measurement.
          </p>

          {/* Decorative governance badge */}
          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
              <Shield size={14} className="text-[#B71E52]" />
            </div>
            <div>
              <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">Licensed by</div>
              <div className="font-semibold text-[13px] text-[#1C1C2E]">SEBON — Securities Board of Nepal</div>
            </div>
          </div>
        </div>

        {/* Right — governance checklist */}
        <div className="sr-r">
          <div className="bg-[#F5F2ED] rounded-xl border border-[#E8E4DD] overflow-hidden">
            {governance.map((item, i) => (
              <div key={i} className={`gov-row flex items-start gap-4 px-7 py-5 bg-[#F5F2ED] ${i < governance.length - 1 ? 'border-b border-[#E8E4DD]' : ''}`}>
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
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHAT THIS PROVES
═══════════════════════════════════════════════════════════════════════════ */
function Verdict() {
  return (
    <section className="bg-[#1C1C2E] py-20 md:py-24 hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr text-center mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">The Verdict</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.06] text-white mb-3">
            What this <em className="italic text-[#B71E52]">proves</em>
          </h2>
          <p className="text-white/50 text-[15px] max-w-xl mx-auto">
            NOF I demonstrated that Nepal can support institutional private equity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {proofs.map((p, i) => (
            <div key={i} className={`sr d${i + 1} proof-card flex items-start gap-4 bg-white/[0.05] border border-white/[0.08] rounded-xl p-6`}>
              <div className="w-7 h-7 rounded-full bg-[#B71E52]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={13} className="text-[#B71E52]" />
              </div>
              <p className="font-display italic text-[17px] text-white/80 leading-[1.6]">{p}</p>
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
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">What's Next</span>
            <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-4">
              Interested in our <em className="italic text-[#B71E52]">next fund?</em>
            </h2>
            <p className="text-stone-500 text-[15px] leading-[1.85] max-w-md">
              NOF I's track record forms the foundation for Nepal Opportunity Fund II. Learn how we're building on this success with blended finance and expanded mandate.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <a href="/fund/noftwo" className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
              Explore NOF II <ArrowRight size={15} />
            </a>
            <a href="/contact-us?topic=investor" className="flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200">
              Investor Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function NOF1Page() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <StatsStrip />
        <Challenge />
        <Pillars />
        <Approach />
        <Portfolio />
        <Governance />
        <Verdict />
        <CTA />
      </div>
    </>
  )
}