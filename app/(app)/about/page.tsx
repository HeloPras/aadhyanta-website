'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import {
  Award, Heart, TrendingUp, Users,
  ChevronRight, Check, ArrowRight, MapPin
} from 'lucide-react'

teamMembers

/* ─── Same global CSS as LandingPage — font imports + keyframes only ─────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }
  .font-display  { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm  { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1); } to { transform:scale(1.06); } }
  @keyframes barGrow   { from { width:0; } to { width:var(--bar-w,100%); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(16px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }

  /* Scroll-reveal */
  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important} .d6{animation-delay:.45s!important}

  /* Stat bar */
  .stat-bar { animation: barGrow 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; width:0; }

  /* Program row left-border accent hover */
  .program-row:hover .program-border { border-color: #B71E52 !important; }
  .program-border { transition: border-color 0.3s; }

  /* Approach card hover */
  .approach-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .approach-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); }

  /* Team card image zoom */
  .team-img-wrap { overflow: hidden; }
  .team-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .team-img-wrap:hover .team-img { transform: scale(1.05); }

  /* Feat card hover */
  .feat-card { transition: background 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .feat-card:hover { background: #1C1C2E !important; transform: translateY(-4px); }
  .feat-card:hover .feat-icon  { background: rgba(183,30,82,0.25) !important; color: #fff !important; }
  .feat-card:hover .feat-title { color: #fff !important; }
  .feat-card:hover .feat-body  { color: rgba(255,255,255,0.55) !important; }

  /* Hero subtle bg */
  .hero-grid {
    background-image: linear-gradient(rgba(28,28,46,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(28,28,46,0.03) 1px, transparent 1px);
    background-size: 72px 72px;
  }
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

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ value }:{value:string}) {
  // Just render the value directly — pre-formatted strings like "18.5%"
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.unobserve(e.target) }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} style={visible ? { animation: 'numberPop 0.6s cubic-bezier(0.16,1,0.3,1) forwards' } : { opacity: 0 }}>
      {value}
    </span>
  )
}

import { useRef } from 'react'
import { teamMembers } from '@/data/team'

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const approaches = [
  {
    icon: <Award size={22} />,
    title: 'Source',
    description: 'We identify high-potential enterprises through our extensive network, accelerator programs, and systematic market screening across all provinces.',
    features: ['Pipeline development', 'Market intelligence', 'Referral networks'],
  },
  {
    icon: <Heart size={22} />,
    title: 'Assess',
    description: 'Comprehensive due diligence examines financial performance, governance structures, market positioning, team capabilities, and impact potential.',
    features: ['Financial analysis', 'Market validation', 'Impact assessment'],
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Invest',
    description: 'We structure appropriate equity and quasi-equity instruments, typically securing board representation to ensure alignment and governance.',
    features: ['Capital deployment', 'Terms negotiation', 'Documentation'],
  },
  {
    icon: <Users size={22} />,
    title: 'Strengthen',
    description: 'Active post-investment support includes governance strengthening, strategic planning, market access, and operational excellence over 5–7 years.',
    features: ['Board engagement', 'Strategic guidance', 'Exit planning'],
  },
]

const programs = [
  { number: '01', title: 'Enterprise Accelerator', description: 'Our flagship program has supported 200+ enterprises with comprehensive business development services, resulting in $28M+ in follow-on capital raised by program participants.' },
  { number: '02', title: 'Koshi Accelerator', description: 'Targeted provincial development initiative supporting enterprises in Koshi Province, demonstrating our commitment to inclusive growth beyond Kathmandu valley.' },
  { number: '03', title: 'DIAL Program', description: 'Agriculture technology and innovation acceleration, supporting agri-tech ventures that strengthen food security and rural livelihoods across Nepal.' },
  { number: '04', title: 'Roof of the World', description: 'Cross-border connectivity initiative fostering regional trade and investment linkages, positioning Nepal as a bridge between South Asian markets.' },
]

const stats = [
  { value: '12+', label: 'Countries Served' },
  { value: '150+', label: 'Expert Team Members' },
  { value: '25+', label: 'Industry Awards' },
  { value: '18.5%', label: 'Avg. Annual Return' },
]

// const teamMembers = [
//   { name: 'Rajan Sharma', position: 'Chief Executive Officer', bio: 'Over 20 years in institutional investment management across South and Southeast Asia.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
//   { name: 'Priya Thapa', position: 'Chief Investment Officer', bio: 'Former Goldman Sachs MD with deep expertise in emerging market private equity.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
//   { name: 'Anil Pradhan', position: 'Managing Director, Funds', bio: 'Pioneered Nepal\'s structured finance market with 15 years of fund management experience.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
//   { name: 'Sunita Rai', position: 'Head of Impact', bio: 'Leading SDG integration and impact measurement across all portfolio companies.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
// ]



const offices = [
  { city: 'Kathmandu', label: 'Headquarters', detail: 'Lazimpat, Kathmandu 44600' },
  { city: 'New York', label: 'Americas Office', detail: '535 Fifth Avenue, Suite 1200' },
  { city: 'London', label: 'European Office', detail: '1 Canada Square, Canary Wharf' },
  { city: 'Singapore', label: 'Asia-Pacific Hub', detail: '1 Raffles Place, #40-02' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 bg-[#F5F2ED] border-b border-[#E8E4DD] hero-grid">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#B71E52]/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-[#1C1C2E]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="sr inline-flex items-center gap-2.5 px-4 py-2 rounded-sm border border-[#E8E4DD] bg-white/80 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[#B71E52] flex-shrink-0" />
            <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">Trusted since 2009</span>
          </div>

          {/* Headline */}
          <h1 className="sr d1 font-display font-bold leading-[1.02] text-[#1C1C2E] mb-7
            text-[clamp(44px,6.5vw,80px)]">
            Building wealth<br />
            <em className="italic text-[#B71E52]">with clarity &amp; discipline</em>
          </h1>

          {/* Sub */}
          <p className="sr d2 text-stone-500 text-base sm:text-lg leading-[1.85] max-w-xl">
            For more than 15 years, we've partnered with individuals and institutions to grow capital responsibly
            through long-term strategies, data-driven decisions, and personalized guidance.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <section className="bg-white border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD] border border-[#E8E4DD]">
          {stats.map((s, i) => (
            <div key={i} className={`sr p-8 lg:p-10 text-center`} style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-display font-bold text-[42px] sm:text-[52px] text-[#1C1C2E] leading-none mb-2">
                <Counter value={s.value} />
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
   MISSION & VISION
═══════════════════════════════════════════════════════════════════════════ */
function MissionVision() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Mission */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Mission</span>
          <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.1] text-[#1C1C2E] mb-6">
            Creating lasting value for our clients
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            To provide world-class investment management services that create lasting value for our clients. We combine
            rigorous analysis, innovative strategies, and personalized attention to help you build and preserve wealth
            across generations.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Our approach is grounded in deep market expertise, quantitative research, and a commitment to understanding
            the unique goals of each client we serve.
          </p>
        </div>

        {/* Vision */}
        <div className="sr-r">
          {/* Decorative quote block */}
          <div className="relative bg-white rounded-xl border border-[#E8E4DD] p-8 sm:p-10 shadow-sm mb-8">
            <div className="font-display text-[64px] text-[#B71E52]/20 leading-[0.7] mb-4 select-none">"</div>
            <p className="font-display italic text-[20px] sm:text-[22px] text-[#1C1C2E] leading-[1.55] mb-6">
              To be the most trusted and respected fund management firm globally, recognized for our integrity,
              performance, and commitment to client success.
            </p>
            <div className="w-10 h-[3px] bg-[#B71E52] rounded-full" />
          </div>
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Vision</span>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            We envision a future where every investor has access to institutional-quality management, sophisticated
            strategies, and the peace of mind that comes from working with a firm that puts their interests first.
          </p>
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
    <section className="bg-white py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr mb-16 max-w-2xl">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">From Beginning to End</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-4">
            Our Investment <em className="italic text-[#B71E52]">Approach</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            We apply a disciplined, four-stage process that combines rigorous financial analysis with deep operational engagement.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {approaches.map((a, i) => (
            <div key={i} className={`sr d${i + 1} approach-card relative bg-white border border-[#E8E4DD] rounded-xl p-8 sm:p-10 overflow-hidden`}>
              {/* Ghost number */}
              <span className="absolute top-4 right-5 font-display font-bold text-[96px] text-[#1C1C2E]/[0.04] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] flex-shrink-0">
                  {a.icon}
                </div>
                <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">Step {String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="font-display font-bold text-[26px] text-[#1C1C2E] mb-3 leading-tight">{a.title}</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8] mb-6">{a.description}</p>

              <hr className="border-[#E8E4DD] mb-5" />

              {/* Feature chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {a.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0">
                      <Check size={9} className="text-[#B71E52]" />
                    </div>
                    <span className="text-[13px] text-stone-600 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAMS
═══════════════════════════════════════════════════════════════════════════ */
function Programs() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr mb-16">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Programs</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Building <em className="italic text-[#B71E52]">Investment-Ready</em> Ecosystems
          </h2>
        </div>

        {/* Program rows */}
        <div className="space-y-0">
          {programs.map((p, i) => (
            <div key={i} className={`sr d${Math.min(i + 1, 5)} program-row flex flex-col sm:flex-row gap-0 group border-b border-[#E8E4DD] last:border-b-0 py-8 sm:py-10`}>
              {/* Number */}
              <div className="flex-shrink-0 w-full sm:w-24 mb-3 sm:mb-0">
                <span className="font-display font-bold text-[40px] text-[#B71E52] leading-none">{p.number}</span>
              </div>
              {/* Content */}
              <div className="flex-1 sm:border-l-2 border-[#E8E4DD] sm:pl-10 program-border">
                <h3 className="font-display font-bold text-[22px] sm:text-[26px] text-[#1C1C2E] mb-2 leading-tight">{p.title}</h3>
                <p className="text-stone-500 text-[14px] sm:text-[15px] leading-[1.8]">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sr mt-14">
          <a href="/our-ecosystem" className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
            Learn More About Our Programs <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM
═══════════════════════════════════════════════════════════════════════════ */
function Team() {
  const directors = teamMembers.filter((m) => m.department === "Director")
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const VISIBLE = 4 // cards visible at once on desktop
  const total = directors.length
  const canPrev = current > 0
  const canNext = current < total - VISIBLE

  const prev = () => canPrev && setCurrent((c) => c - 1)
  const next = () => canNext && setCurrent((c) => c + 1)

  // Drag / swipe
  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); setDragStartX(e.clientX) }
  const onMouseUp   = (e: React.MouseEvent) => {
    if (!dragging) return
    setDragging(false)
    const diff = dragStartX - e.clientX
    if (diff > 60) next()
    else if (diff < -60) prev()
  }
  const onTouchStart = (e: React.TouchEvent) => setDragStartX(e.touches[0].clientX)
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = dragStartX - e.changedTouches[0].clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
  }

  return (
    <section className="bg-white py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="sr flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Leadership</span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-2">
              Meet our <em className="italic text-[#B71E52]">Directors</em>
            </h2>
            <p className="text-stone-500 text-[15px]">Experienced professionals guiding Aadhyanta Fund to new heights</p>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200
                ${canPrev
                  ? 'border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white'
                  : 'border-[#E8E4DD] text-[#E8E4DD] cursor-not-allowed'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200
                ${canNext
                  ? 'border-[#B71E52] bg-[#B71E52] text-white hover:bg-[#9e1847]'
                  : 'border-[#E8E4DD] text-[#E8E4DD] cursor-not-allowed'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none "
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{
              transform: `translateX(calc(-${current} * (25% + 6px)))`,
              transition: dragging ? 'none' : 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
              width: `${(total / VISIBLE) * 100}%`,
            }}
          >
            {directors.map((m, i) => (
              <div
                key={i}
                style={{ width: `${100 / total}%` }}
                className="flex-shrink-0"
              >
                {/* Photo */}
                <div className="team-img-wrap rounded-xl overflow-hidden aspect-3/4 mb-5 bg-[#1C1C2E] shadow-md">
                  <img
                    src={m.image}
                    alt={m.name}
                    draggable={false}
                    className="team-img w-full h-full object-cover object-top"
                  />
                </div>
                {/* Info */}
                <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] mb-1 leading-tight">{m.name}</h3>
                <p className="font-mono-dm text-[10px] text-[#B71E52] tracking-widest uppercase">{m.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: total - VISIBLE + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full cursor-pointer transition-all duration-300 ${
                i === current
                  ? 'w-6 h-1.5 bg-[#B71E52]'
                  : 'w-1.5 h-1.5 bg-[#E8E4DD] hover:bg-stone-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL PRESENCE
═══════════════════════════════════════════════════════════════════════════ */
// function GlobalPresence() {
//   return (
//     <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

//         {/* Left */}
//         <div className="sr-l">
//           <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Global Presence</span>
//           <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-6">
//             Operating across continents, thinking <em className="italic text-[#B71E52]">globally</em>
//           </h2>
//           <p className="text-stone-500 text-[15px] leading-[1.85] mb-8">
//             With offices spanning South Asia, North America, Europe, and Asia-Pacific, we bring a truly global
//             perspective to investment management. Our international footprint enables us to identify opportunities
//             and manage risks across diverse markets and asset classes.
//           </p>
//           <a href="#contact" className="inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[14px] hover:gap-3 transition-all duration-200">
//             Find an office near you <ChevronRight size={16} />
//           </a>
//         </div>

//         {/* Right — office cards */}
//         <div className="sr-r">
//           <div className="bg-white rounded-xl border border-[#E8E4DD] overflow-hidden shadow-sm">
//             {offices.map((o, i) => (
//               <div key={i} className={`flex items-start gap-5 p-6 sm:p-7 transition-colors duration-200 hover:bg-[#F5F2ED]
//                 ${i < offices.length - 1 ? 'border-b border-[#E8E4DD]' : ''}`}>
//                 <div className="w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] flex-shrink-0 mt-0.5">
//                   <MapPin size={15} />
//                 </div>
//                 <div>
//                   <div className="font-display font-bold text-[18px] text-[#1C1C2E] leading-tight">{o.city}</div>
//                   <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.1em] uppercase mt-0.5 mb-1">{o.label}</div>
//                   <div className="text-[13px] text-stone-400">{o.detail}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-t border-[#E8E4DD]">
      <div className="sr-s max-w-2xl mx-auto px-4 text-center">
        <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-4 block">Partner With Us</span>
        <h2 className="font-display font-bold text-[clamp(36px,4.5vw,56px)] leading-[1.06] text-[#1C1C2E] mb-5">
          Partner with <em className="italic text-[#B71E52]">Aadhyanta Fund</em>
        </h2>
        <p className="text-stone-500 text-[15px] leading-[1.85] mb-10 max-w-xl mx-auto">
          Discover how our expertise and commitment can help you achieve your financial aspirations. Let's build
          your financial future together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/contact-us" className="inline-flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
            Get in Touch <ChevronRight size={18} />
          </a>
          <a href="/fund" className="inline-flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-8 py-4 rounded transition-all duration-200">
            View Our Funds
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  useReveal()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar variant="nontransparent" />
        <Hero />
        <Stats />
        <MissionVision />
        <Approach />
        <Programs />
        <Team />
        {/* <GlobalPresence /> */}
        <CTA />
      </div>
    </>
  )
}