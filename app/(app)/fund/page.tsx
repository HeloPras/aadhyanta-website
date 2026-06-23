'use client'

import { useState, useEffect, useRef } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import {
  ChevronRight, CheckCircle, TrendingUp, Users,
  Building2, Shield, Globe, BarChart3, ArrowRight
} from 'lucide-react'

/* ─── Same global CSS token as Landing + About pages ────────────────────── */
const GLOBAL_CSS = `
  // @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  // body { font-family: 'Outfit', sans-serif; }
  // .font-display { font-family: 'Cormorant Garamond', serif; }
  // .font-mono-dm { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(14px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes panelIn   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  /* Scroll-reveal */
  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important}

  /* Fund panel transition */
  .fund-panel { animation: panelIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Stat pop */
  .stat-pop { animation: numberPop 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Value card hover */
  .val-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .val-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); }

  /* Hero bg */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Sector pill hover */
  .sector-pill { transition: all 0.2s; }
  .sector-pill:hover { background: #1C1C2E !important; color: #fff !important; border-color: #1C1C2E !important; }

  /* Fund overview card hover */
  .fund-overview-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.2s; }
  .fund-overview-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
`

/* ─── Intersection-observer reveal ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr,.sr-l,.sr-r,.sr-s')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Animated stat number ───────────────────────────────────────────────── */
function StatNumber( {value}:{value:string} ) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.unobserve(e.target) }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <span ref={ref} style={show ? { animation: 'numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards' } : { opacity: 0 }}>
      {value}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const trackRecord = [
  { value: 'NPR 320M+', label: 'Capital Mobilized' },
  { value: '18 Months', label: 'Raised & Deployed' },
  { value: '12%', label: 'Investment Conversion Rate' },
  { value: '5+', label: 'Sectors Covered' },
]

const funds = [
  {
    id: 0,
    tag: 'Fully Deployed',
    tagBg: '#1C1C2E',
    shortName: 'NOF I',
    name: 'Nepal Opportunity Fund I',
    subtitle: "Nepal's flagship sector-agnostic growth equity fund",
    description: "Our first institutional fund demonstrated proof of concept: raising NPR 300 crores from Nepal's leading banks and insurance companies, deploying capital across diverse sectors, and building a portfolio advancing toward exits.",
    icon: <TrendingUp size={20} />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    capital: 'NPR 120M+',
    meta: [
      { label: 'Status', value: 'Fully deployed — Portfolio actively managed' },
      { label: 'Backed by', value: "Nepal's 4 largest banks + leading insurance companies" },
      { label: 'Hold period', value: '5–7 years with active board representation' },
    ],
    href:'/fund/nofone',
  },
  {
    id: 1,
    tag: 'Active',
    tagBg: '#B71E52',
    shortName: 'NOF II',
    name: 'Nepal Opportunity Fund II',
    subtitle: 'Building on proven success with enhanced flexibility',
    description: "Our second fund leverages NOF I's track record with a blended finance structure, enabling both follow-on support for high-performing portfolio companies and strategic new investments with flexible instruments beyond pure equity.",
    icon: <BarChart3 size={20} />,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    capital: 'NPR 140M+',
    meta: [
      { label: 'Structure', value: 'Blended finance (commercial + development capital)' },
      { label: 'Instruments', value: 'Equity, quasi-equity, mezzanine' },
      { label: 'Strategy', value: 'Follow-on + strategic new investments' },
    ],
    href:'/fund/noftwo',
  },
  // {
  //   id: 2,
  //   tag: 'Gender-Lens',
  //   tagBg: '#B71E52',
  //   shortName: 'Simrik',
  //   name: 'Simrik Fund',
  //   subtitle: "Nepal's first gender-lens investment fund",
  //   description: "Pioneering gender-lens investing in Nepal with an all-women deal team. Mobilizing capital for women-led and women-impacting businesses, addressing the persistent financing gap where women receive less than 10% of bank credit despite strong performance.",
  //   icon: <Users size={20} />,
  //   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  //   capital: 'NPR 60M+',
  //   meta: [
  //     { label: 'Focus', value: 'Women-led and women-impacting businesses' },
  //     { label: 'Team', value: '100% female investment committee and deal team' },
  //     { label: 'Impact', value: 'Addressing <10% female access to institutional credit' },
  //   ],
  //   href:'/fund/simrik'
  // },
]

const valueProps = [
  { icon: <Shield size={20} />, title: 'Governance Strengthening', desc: 'Board seats, reporting systems, fiduciary discipline' },
  { icon: <Globe size={20} />, title: 'Market Access', desc: 'Buyer connections, supplier networks, strategic partnerships' },
  { icon: <TrendingUp size={20} />, title: 'Strategic Planning', desc: 'Growth roadmaps, performance metrics, execution discipline' },
  { icon: <Building2 size={20} />, title: 'Operational Excellence', desc: 'Financial management, systems improvement, capability building' },
  { icon: <BarChart3 size={20} />, title: 'Follow-on Capital', desc: 'Access to additional funding rounds and co-investment networks' },
]

const sectors = ['Energy', 'Manufacturing', 'Hospitality', 'Agriculture', 'Technology']

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#1C1C2E] hero-grid">
      {/* Photo with zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center anim-hero-zoom opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=1800&q=80')",
          animation: 'heroZoom 22s ease-in-out infinite alternate',
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1C1C2E]/95 via-[#1C1C2E]/70 to-[#1C1C2E]/40" />
      <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/80 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        {/* Badge */}
        <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white/[0.07] border border-white/15 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] shrink-0" />
          <span className="font-mono-dm text-[10px] text-white/75 tracking-[0.12em] uppercase">Our Funds</span>
        </div>

        <h1 className="sr d1 font-display font-bold text-white leading-none mb-6
          text-[clamp(44px,7vw,88px)]">
          Growth capital for<br />
          <em className="italic text-white/45">Nepal's transformation</em>
        </h1>

        <p className="sr d2 text-white/60 text-base sm:text-lg leading-[1.8] max-w-lg">
          Three institutional funds mobilizing patient capital that creates financial returns and lasting social impact across Nepal's growth economy.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRACK RECORD STATS
═══════════════════════════════════════════════════════════════════════════ */
function TrackRecord() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD] border-x border-[#E8E4DD]">
          {trackRecord.map((s, i) => (
            <div key={i} className="sr p-8 lg:p-10" style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-display font-bold text-[#1C1C2E] leading-none mb-2
                text-[clamp(32px,4vw,48px)]">
                <StatNumber value={s.value} />
              </div>
              <div className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRACK RECORD NARRATIVE
═══════════════════════════════════════════════════════════════════════════ */
function Narrative() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Since 2021</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            Disciplined capital deployment and <em className="italic text-[#B71E52]">value creation</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            Since 2021, we've demonstrated a rigorous approach to institutional fund management — raising and deploying capital with precision, maintaining a 12% investment conversion rate from our comprehensive screening process.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Our sector-agnostic approach has enabled us to identify and back Nepal's most compelling growth opportunities, with multiple portfolio companies advancing toward public markets.
          </p>
        </div>

        {/* Right — sectors + checklist card */}
        <div className="sr-r">
          <div className="bg-[#F5F2ED] rounded-xl border border-[#E8E4DD] p-8 sm:p-10">
            <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] mb-5">Sectors We Cover</h3>

            {/* Sector pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {sectors.map((s, i) => (
                <span key={i} className="sector-pill px-4 py-2 rounded bg-white border border-[#E8E4DD] text-[13px] font-semibold text-[#1C1C2E] cursor-default">
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E8E4DD] space-y-4">
              {[
                'SEBON-licensed institutional processes',
                'Strong exit pipeline toward public markets',
                'NPR 320M+ mobilized across three funds',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={11} className="text-[#B71E52]" />
                  </div>
                  <span className="text-[14px] text-stone-600 leading-[1.65]">{item}</span>
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
   OUR FUNDS (tabbed detail + overview cards)
═══════════════════════════════════════════════════════════════════════════ */
function OurFunds() {
  const [active, setActive] = useState(0)
  const f = funds[active]

  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Funds</span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              Three funds. <em className="italic text-[#B71E52]">One mission.</em>
            </h2>
          </div>

          {/* Tab pills */}
          <div className="flex gap-1 bg-white p-1 rounded-lg border border-[#E8E4DD] self-start sm:self-auto shrink-0">
            {funds.map(fund => (
              <button key={fund.id} onClick={() => setActive(fund.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap
                  ${active === fund.id ? 'bg-[#1C1C2E] text-white' : 'text-stone-400 hover:text-stone-600'}`}>
                {fund.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Active fund panel */}
        <div key={active} className="fund-panel grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden aspect-4/3 shadow-xl shadow-stone-200">
            <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/65 via-transparent to-transparent" />
            {/* Capital overlay */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="font-display font-bold text-[28px] sm:text-[32px] text-white leading-none">{f.capital}</div>
                <div className="text-[11px] text-white/55 mt-1 font-mono-dm tracking-wide">Committed Capital</div>
              </div>
              <span
                className="px-3 py-1.5 rounded font-mono-dm text-[9px] text-white tracking-widest uppercase"
                style={{ background: f.tagBg }}>
                {f.tag}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-display font-bold text-[26px] sm:text-[32px] text-[#1C1C2E] mb-2 leading-tight">{f.name}</h3>
            <p className="text-[14px] text-[#B71E52] italic mb-5">{f.subtitle}</p>
            <p className="text-[15px] text-stone-500 leading-[1.85] mb-8">{f.description}</p>

            {/* Meta details */}
            <div className="bg-white rounded-xl border border-[#E8E4DD] overflow-hidden mb-8">
              {f.meta.map((m, i) => (
                <div key={i} className={`px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6
                  ${i < f.meta.length - 1 ? 'border-b border-[#E8E4DD]' : ''}`}>
                  <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-widest uppercase shrink-0 w-28 pt-0.5">{m.label}</div>
                  <div className="text-[14px] text-stone-600 leading-[1.6] font-medium">{m.value}</div>
                </div>
              ))}
            </div>

            <a href={f.href} className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[14px] px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
              Learn More <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* ── Fund overview cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 border-t border-[#E8E4DD]">
          {funds.map(fund => (
            <button key={fund.id} onClick={() => setActive(fund.id)}
              className={`fund-overview-card text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer
                ${active === fund.id
                  ? 'bg-white border-[#B71E52] shadow-lg shadow-stone-100'
                  : 'bg-white border-[#E8E4DD] hover:border-stone-300'}`}>

              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded font-mono-dm text-[9px] text-white tracking-widest uppercase"
                  style={{ background: fund.tagBg }}>{fund.tag}</span>
                <span className={active === fund.id ? 'text-[#B71E52]' : 'text-stone-300'}>
                  {fund.icon}
                </span>
              </div>

              <h4 className="font-display font-bold text-[17px] text-[#1C1C2E] mb-2 leading-snug">{fund.name}</h4>
              <p className="text-[13px] text-stone-500 leading-[1.65]">{fund.subtitle}</p>

              {/* Active indicator line */}
              {active === fund.id && (
                <div className="mt-4 h-0.5 bg-[#B71E52] rounded-full w-8" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   VALUE BEYOND CAPITAL
═══════════════════════════════════════════════════════════════════════════ */
function ValueBeyondCapital() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr mb-16 max-w-2xl">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">More Than Money</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-4">
            Our value <em className="italic text-[#B71E52]">beyond capital</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Every fund investment includes hands-on operational and strategic support to accelerate growth and create lasting enterprise value.
          </p>
        </div>

        {/* Grid — 5 value cards + 1 CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {valueProps.map((v, i) => (
            <div key={i} className={`sr val-card d${i + 1} bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-8`}>
              {/* Ghost number */}
              <div className="relative">
                <span className="absolute -top-1 -right-1 font-display font-bold text-[80px] text-[#1C1C2E]/4 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-11 h-11 rounded-lg bg-white border border-[#E8E4DD] flex items-center justify-center text-[#B71E52] mb-5 relative z-10">
                  {v.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] mb-2.5 leading-tight">{v.title}</h3>
              <p className="text-[14px] text-stone-500 leading-[1.75]">{v.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div className="sr d6 rounded-xl bg-[#1C1C2E] p-8 flex flex-col justify-between border border-transparent">
            {/* Subtle inner grid */}
            <div className="absolute inset-0 rounded-xl opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10 flex flex-col justify-between h-full gap-8">
              <div>
                <div className="w-10 h-[2px] bg-[#B71E52] mb-6 rounded-full" />
                <h3 className="font-display font-bold text-[22px] text-white mb-3 leading-tight">
                  Ready to invest with us?
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.75]">
                  Explore opportunities across our three institutional funds and join Nepal's investment future.
                </p>
              </div>
              <a href="/contact-us" className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[14px] px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/30 self-start">
                Get in Touch <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function FundsPage() {
  useReveal()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <TrackRecord />
        <Narrative />
        <OurFunds />
        <ValueBeyondCapital />
      </div>
    </>
  )
}