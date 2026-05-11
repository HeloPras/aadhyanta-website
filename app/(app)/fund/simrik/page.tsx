'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, CheckCircle, TrendingUp, Users, Target, Award,
  Briefcase, Factory, GraduationCap, Building2, Globe, Zap, Leaf, Download
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
  @keyframes barFill   { from { width:0; } to { width:var(--bar-w); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important} .d6{animation-delay:.45s!important}

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

  /* Governance / goal row hover */
  .gov-row { transition: background 0.2s, transform 0.2s; }
  .gov-row:hover { background: #fff !important; transform: translateX(4px); }

  /* Proof card */
  .proof-card { transition: background 0.2s; }
  .proof-card:hover { background: rgba(255,255,255,0.07) !important; }

  /* Sector pill hover */
  .sector-pill { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
  .sector-pill:hover { background: #fff !important; border-color: #B71E52 !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(183,30,82,0.1); }
  .sector-pill:hover .sector-icon { background: rgba(183,30,82,0.12) !important; }

  /* Hero grid */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Stat bar */
  .prog-bar { animation: barFill 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; width:0; }

  /* Two-category card border accent */
  .cat-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .cat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.08); }
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

/* ─── Animated stat value ─────────────────────────────────────────────── */
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

/* ─── Animated progress bar ─────────────────────────────────────────────── */
function ProgressBar({ pct }: { pct: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.unobserve(e.target) }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
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

const marketStats = [
  { value: '<10%', label: 'Bank credit to women-led businesses' },
  { value: '42%', label: 'Loan approval rate for women vs 60% for men' },
  { value: '7%', label: 'Economically active women employed' },
  { value: '78%', label: 'Higher capital efficiency for women founders' },
]

const businessCase = [
  { stat: '25%', label: 'Higher profitability', source: 'Companies with gender-diverse executive teams (McKinsey)', pct: 25 },
  { stat: '63%', label: 'Better performance', source: 'Startups with at least one female founder', pct: 63 },
  { stat: '26%', label: 'Better returns', source: 'Startups with female board directors', pct: 26 },
  { stat: '$730K', label: 'Revenue per $935K raised', source: 'Women founders vs $662K on $2.12M for men', pct: 80 },
]

const sectors = [
  { icon: <Factory size={18} />, name: 'Manufacturing' },
  { icon: <GraduationCap size={18} />, name: 'Education & Healthcare' },
  { icon: <Building2 size={18} />, name: 'Tourism & Infrastructure' },
  { icon: <Globe size={18} />, name: 'Information Technology' },
  { icon: <Leaf size={18} />, name: 'Agriculture & Agri-Processing' },
  { icon: <Zap size={18} />, name: 'Clean Energy' },
]

const goals = [
  { icon: <Users size={18} />, label: 'Leadership', title: 'Champion Female Leadership', description: '100% female deal team — experienced operators driving every investment decision' },
  { icon: <TrendingUp size={18} />, label: 'Returns', title: 'Deliver Impact with Returns', description: 'Prove gender-lens investing generates competitive financial performance, not concessional returns' },
  { icon: <Target size={18} />, label: 'Inclusion', title: 'Elevate Women in Business', description: 'Economic inclusion as catalyst for Nepal\'s sustainable and broad-based growth' },
  { icon: <Award size={18} />, label: 'Benchmark', title: 'Institutionalize Gender-Smart Investing', description: "Set Nepal's benchmark for gender-lens fund management across the institutional PE ecosystem" },
  { icon: <Briefcase size={18} />, label: 'Value', title: 'Create Value Beyond Capital', description: 'Hands-on partnership — governance, networks, and strategic support accelerating portfolio growth' },
]

const teamRoles = [
  { role: 'Investment Leadership', description: 'Chartered Accountants and finance professionals with 10+ years of fund management, banking, and PE experience' },
  { role: 'Advisory Committee', description: 'Seasoned banking executives (25+ years) and institutional investors with proven track records across Nepal\'s financial sector' },
  { role: 'Legal & Compliance', description: 'Licensed advocates ensuring full regulatory adherence, governance standards, and SEBON compliance' },
]

const proofs = [
  "Gender-lens investing isn't concessional — it's competitive",
  'Market failures can be corrected through purposeful, disciplined capital',
  "Women's economic participation drives inclusive and sustainable growth",
  'Impact and returns are complementary, not competing objectives',
  'Institutional capital can mobilize for gender equity at meaningful scale',
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
          backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1800&q=80')",
          animation: 'heroZoom 24s ease-in-out infinite alternate',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E]/95 via-[#1C1C2E]/70 to-[#1C1C2E]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/85 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-16">
        {/* Fund label row */}
        <div className="sr flex items-center gap-3 mb-7">
          <span className="font-mono-dm text-[9px] tracking-widest uppercase px-3 py-1.5 bg-[#B71E52] rounded text-white">
            Gender-Lens Fund
          </span>
          <span className="font-mono-dm text-[10px] text-white/40 tracking-[0.1em] uppercase">
            Simrik Fund
          </span>
        </div>

        <h1 className="sr d1 font-display font-bold text-white leading-[1.0] mb-5 text-[clamp(44px,7vw,88px)]">
          For women,<br />
          <em className="italic text-white/45">by women</em>
        </h1>

        <p className="sr d2 text-[#B71E52] font-display font-semibold text-[clamp(18px,2vw,24px)] mb-5">
          Nepal's first gender-lens investment fund
        </p>

        <p className="sr d3 text-white/55 text-base sm:text-lg leading-[1.8] max-w-lg">
          Pioneering gender-smart investing with an all-women deal team — mobilizing capital for women-led and women-impacting businesses to close Nepal's persistent financing gap.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS STRIP — The Financing Gap
═══════════════════════════════════════════════════════════════════════════ */
function StatsStrip() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD]">
          {marketStats.map((s, i) => (
            <div key={i} className="sr p-8 lg:p-10" style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-3">{s.label}</div>
              <div className="font-display font-bold text-[#B71E52] leading-none text-[clamp(28px,3.5vw,44px)]">
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
   MARKET FAILURE
═══════════════════════════════════════════════════════════════════════════ */
function MarketFailure() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">The Market Failure</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            This isn't a capability gap —<br />
            <em className="italic text-[#B71E52]">it's a capital gap</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            Despite strong business performance and repayment history, women-led businesses in Nepal receive less than 10% of total bank credit. Collateral requirements, institutional bias, and structural exclusion — not capability — drive this gap.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Women-founded companies generate more revenue per capital raised and demonstrate stronger repayment discipline. The market failure is in supply, not demand.
          </p>
        </div>

        {/* Right — challenge + reality cards */}
        <div className="sr-r flex flex-col gap-4">
          {/* Challenge */}
          <div className="bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
            <div className="px-8 py-5 border-b border-[#E8E4DD]">
              <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">The Challenge</span>
            </div>
            <div className="divide-y divide-[#E8E4DD]">
              {[
                'Women entrepreneurs face 42% loan approval rates vs 60% for men',
                'Collateral requirements remain the single biggest structural hurdle',
                'Only 7% of economically active women are employed vs 93% of men',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-8 py-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0 mt-[7px]" />
                  <span className="text-[13px] text-stone-600 leading-[1.7]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reality */}
          <div className="bg-[#1C1C2E] border border-[#1C1C2E] rounded-xl p-8 flex items-center justify-center min-h-[120px]">
            <p className="font-display font-bold italic text-center text-[22px] sm:text-[26px] text-white leading-[1.3]">
              Women-founded companies generate{' '}
              <span className="text-[#B71E52]">more revenue</span>{' '}
              with <span className="text-[#B71E52]">less capital</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   BUSINESS CASE
═══════════════════════════════════════════════════════════════════════════ */
function BusinessCase() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Data-Driven</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            The business case for <em className="italic text-[#B71E52]">gender-lens investing</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businessCase.map((item, i) => (
            <div key={i} className={`sr lift d${i + 1} bg-white border border-[#E8E4DD] rounded-xl p-7 relative overflow-hidden`}>
              <span className="absolute top-3 right-4 font-display font-bold text-[80px] text-[#1C1C2E]/[0.04] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="font-display font-bold text-[#B71E52] leading-none text-[clamp(32px,4vw,48px)] mb-3">
                <StatValue value={item.stat} />
              </div>
              <div className="font-semibold text-[15px] text-[#1C1C2E] mb-2">{item.label}</div>
              <div className="text-[12px] text-stone-500 leading-[1.65] mb-4">{item.source}</div>
              <ProgressBar pct={item.pct} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MISSION & VISION
═══════════════════════════════════════════════════════════════════════════ */
function MissionVision() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        <div className="sr-l bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
          <div className="px-8 py-5 border-b border-[#E8E4DD]">
            <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">Mission</span>
          </div>
          <div className="px-8 py-8">
            <p className="font-display italic text-[20px] text-[#1C1C2E] leading-[1.65]">
              To invest in high-growth, women-led businesses across Nepal — leveraging capital and expertise to drive strong returns and build a more competitive, inclusive economy.
            </p>
          </div>
        </div>

        <div className="sr-r bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
          <div className="px-8 py-5 border-b border-[#E8E4DD]">
            <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">Vision</span>
          </div>
          <div className="px-8 py-8">
            <p className="font-display italic text-[20px] text-[#1C1C2E] leading-[1.65]">
              To become Nepal's premier investment platform driving economic growth by backing exceptional women-led businesses and consistently delivering top-tier returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INVESTMENT FOCUS
═══════════════════════════════════════════════════════════════════════════ */
function InvestmentFocus() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Investment Focus</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Two investment <em className="italic text-[#B71E52]">categories</em>
          </h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {[
            {
              tag: 'Category A',
              title: 'Women-Led Enterprises',
              description: 'Businesses with women founders, CEOs, or majority ownership positions — where women drive strategic decisions and hold meaningful economic stake.',
              accent: true,
            },
            {
              tag: 'Category B',
              title: 'Women-Impacting Businesses',
              description: 'Enterprises with significant female workforce, customer base, or supply chain impact — where growth directly expands economic opportunity for women.',
              accent: false,
            },
          ].map((cat, i) => (
            <div
              key={i}
              className={`cat-card bg-white rounded-xl p-8 border-2 ${cat.accent ? 'border-[#B71E52]' : 'border-[#E8E4DD]'}`}
            >
              <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2 py-1 bg-[#f5e8ed] text-[#B71E52] rounded mb-4 inline-block">{cat.tag}</span>
              <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-3 leading-tight">{cat.title}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">{cat.description}</p>
            </div>
          ))}
        </div>

        {/* Sector grid */}
        <div className="sr">
          <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase mb-6">Sector Priorities</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sectors.map((sector, i) => (
              <div
                key={i}
                className={`sector-pill sr d${Math.min(i + 1, 6)} bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-4 flex flex-col items-center gap-3 cursor-default text-center`}
              >
                <div className="sector-icon w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] transition-all duration-300">
                  {sector.icon}
                </div>
                <span className="font-semibold text-[12px] text-[#1C1C2E] leading-tight">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STRATEGIC GOALS
═══════════════════════════════════════════════════════════════════════════ */
function StrategicGoals() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Strategic Goals</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Five pillars of <em className="italic text-[#B71E52]">our approach</em>
          </h2>
        </div>

        <div className="bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden">
          {goals.map((goal, i) => (
            <div
              key={i}
              className={`gov-row flex items-start gap-5 px-8 py-6 bg-[#F5F2ED] ${i < goals.length - 1 ? 'border-b border-[#E8E4DD]' : ''}`}
            >
              {/* Number */}
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52]">
                {goal.icon}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="font-semibold text-[14px] text-[#1C1C2E]">{goal.title}</div>
                  <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2 py-0.5 bg-white border border-[#E8E4DD] text-stone-400 rounded hidden sm:inline-block">
                    {goal.label}
                  </span>
                </div>
                <div className="text-[13px] text-stone-500 leading-[1.65]">{goal.description}</div>
              </div>
              {/* Ghost number */}
              <div className="flex-shrink-0 font-display font-bold text-[40px] text-[#1C1C2E]/[0.06] leading-none select-none hidden md:block">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   OUR TEAM
═══════════════════════════════════════════════════════════════════════════ */
function Team() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Team</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            All-women team,<br /><em className="italic text-[#B71E52]">deep expertise</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamRoles.map((team, i) => (
            <div key={i} className={`sr lift d${i + 1} bg-white border border-[#E8E4DD] rounded-xl p-8 relative overflow-hidden`}>
              <span className="absolute top-4 right-5 font-display font-bold text-[80px] text-[#1C1C2E]/[0.04] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-4">
                <Users size={18} />
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] mb-3 leading-tight">{team.role}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">{team.description}</p>
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
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Impact</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.06] text-white mb-3">
            Why this <em className="italic text-[#B71E52]">matters</em>
          </h2>
          <p className="text-white/50 text-[15px] max-w-xl mx-auto">
            Simrik Fund proves that gender-lens investing creates value for all stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {proofs.map((p, i) => (
            <div key={i} className={`sr d${Math.min(i + 1, 5)} proof-card flex items-start gap-4 bg-white/[0.05] border border-white/[0.08] rounded-xl p-6`}>
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
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Join the Movement</span>
            <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-4">
              Be part of <em className="italic text-[#B71E52]">something historic</em>
            </h2>
            <p className="text-stone-500 text-[15px] leading-[1.85] max-w-md">
              Be part of Nepal's first institutional gender-lens fund. Together, we're proving that investing in women isn't just the right thing to do — it's the smart thing to do.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
            >
              Investor Inquiry <ArrowRight size={15} />
            </a>
            <a
              href="/apply"
              className="flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200"
            >
              Submit Your Business
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
export default function SimrikFundPage() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Hero />
        <StatsStrip />
        <MarketFailure />
        <BusinessCase />
        <MissionVision />
        <InvestmentFocus />
        <StrategicGoals />
        <Team />
        <WhyItMatters />
        <CTA />
      </div>
    </>
  )
}