'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronDown,
  Users, MapPin, CheckCircle2, ExternalLink
} from 'lucide-react'
import { Navbar } from '@/components/Layout/Navbar'

/* ─── Global CSS — same token system as all other pages ─────────────────── */
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
  @keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(12px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes pulseDot  { 0%,100%{box-shadow:0 0 0 0 rgba(21,128,61,0.4)} 50%{box-shadow:0 0 0 7px rgba(21,128,61,0)} }
  @keyframes tabSlide  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important} .d6{animation-delay:.45s!important}

  .stat-pop { animation: numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
  .live-dot { animation: pulseDot 2.2s ease-in-out infinite; }
  .tab-content { animation: tabSlide 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Hero */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Ticker */
  .ticker-track { display:flex; width:max-content; animation: ticker 28s linear infinite; }
  .ticker-track:hover { animation-play-state:paused; }

  /* Program card */
  .prog-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.2s;
  }
  .prog-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 56px rgba(0,0,0,0.10);
    border-color: #B71E52 !important;
  }
  .prog-card:hover .prog-img { transform: scale(1.05); }
  .prog-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

  /* Stat chip */
  .stat-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px;
    background: rgba(28,28,46,0.05);
    border: 1px solid rgba(28,28,46,0.08);
    border-radius: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #3D3D52;
  }

  /* Funder badge */
  .funder-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9CA3AF;
  }
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

/* ─── Animated counter ──────────────────────────────────────────────────── */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - t0) / 1600, 1)
        setV(Math.round((1 - Math.pow(1 - t, 3)) * end))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [end])
  return <span ref={ref}>{prefix}{v}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
type Program = {
  id: string
  status: 'active' | 'completed'
  name: string
  funder: string
  description: string
  chips: string[]
  image: string
  href: string
}

const programs: Program[] = [
  /* ── ACTIVE ── */
  {
    id: 'code-for-impact',
    status: 'active',
    name: 'Code for Impact',
    funder: 'US Embassy',
    description: 'A national tech innovation hackathon series across all 7 provinces of Nepal — delivered with Georgia Tech Enterprise Innovation Institute.',
    chips: ['175 Innovators', '35 Teams', '7 Provinces', 'Oct 2025 – Aug 2026'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    href: '/program/code-for-impact',
  },
  {
    id: 'seeding-scaling',
    status: 'active',
    name: 'Seeding & Scaling Innovation',
    funder: 'US Embassy',
    description: 'U.S.–Nepal pre-accelerator connecting 20 early-stage entrepreneurs to AI tools, U.S. innovation frameworks, and dual-mentorship support.',
    chips: ['20 Entrepreneurs', '100+ Ecosystem Participants'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    href: '/program/seeding-scaling',
  },
  {
    id: 'fao-sdg-fund',
    status: 'active',
    name: 'FAO Joint SDG Fund Engagement',
    funder: 'FAO Joint SDG Fund',
    description: 'Two-component programme: SME investment-readiness accelerator for 25+ agribusiness SMEs + Women Agro Guarantee Facility for women agro-entrepreneurs.',
    chips: ['25+ SMEs', '100% Women-led enterprises'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    href: '/program/fao-sdg-fund',
  },
  {
    id: 'ffpo-matchmaking',
    status: 'active',
    name: 'FFPO Matchmaking & Business Pitching',
    funder: 'FAO Forest and Farm Facility (FFF)',
    description: 'Financing and partnership readiness for 5 Forest and Farm Producer Organization enterprises — culminating in a full-day B2B and B2F pitching event.',
    chips: ['5 FFPO Enterprises', '5 Value Chains'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    href: '/program/ffpo-matchmaking',
  },

  /* ── COMPLETED ── */
  {
    id: 'koshi-accelerator',
    status: 'completed',
    name: 'Aadhyanta Accelerator – Koshi Chapter',
    funder: 'Swisscontact NAMDP (Sahaj Phase II)',
    description: 'Investment-readiness acceleration for agri-enterprises across 5 districts of Koshi Province — 24 selected enterprises, USD 600K+ financing mobilised.',
    chips: ['166 Applicants', '24 Selected', '5 Districts'],
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    href: '/program/koshi-accelerator',
  },
  {
    id: 'roof-of-the-world',
    status: 'completed',
    name: 'Roof of the World (ROTW)',
    funder: 'USAID Trade & Competitiveness (Deloitte/TC-Udhyam)',
    description: 'Multi-province accelerator for export-oriented SMEs in agriculture, tourism, and digital services. 4 alumni secured NOF I equity investment.',
    chips: ['4 Alumni → NOF I Equity'],
    image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800&q=80',
    href: '/program/roof-of-the-world',
  },
  {
    id: 'dial',
    status: 'completed',
    name: 'Digital Innovation in Agriculture & Logistics (DIAL)',
    funder: 'Swiss Agency for Development and Cooperation (SDC)',
    description: 'Early-stage acceleration for agritech-logistics startups — 7 enterprises, 32-hour hackathon, and product showcase.',
    chips: ['7 Enterprises', '32-Hr Hackathon'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    href: '/program/dial',
  },
  {
    id: 'feed-the-future',
    status: 'completed',
    name: 'Feed the Future Nepal – Agricultural Inputs',
    funder: 'USAID Feed the Future',
    description: 'Investment-readiness for agri-input enterprises across USAID Zones of Influence. Research-led diagnostics, investor matchmaking, and legal due-diligence support.',
    chips: ['20–30 Enterprises Scouted'],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    href: '/program/feed-the-future',
  },
]

const heroStats = [
  { end: 8,    suffix: '+', label: 'Programmes' },
  { end: 300,  suffix: '+', label: 'Enterprises Supported' },
  { end: 7,    suffix: '',  label: 'Provinces' },
  { end: 3345, suffix: '',  label: 'Jobs Created' },
]

const funders = [
  'US Embassy', 'USAID', 'FAO', 'Swisscontact', 'Swiss SDC', 'FAO FFF', 'Georgia Tech'
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative bg-[#1C1C2E] hero-grid overflow-hidden">
      {/* Subtle photo backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80')",
          animation: 'heroZoom 22s ease-in-out infinite alternate',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E]/95 via-[#1C1C2E]/70 to-[#1C1C2E]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/80 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20">
        {/* Badge */}
        <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white/[0.07] border border-white/[0.15] rounded-sm">
          <div className="live-dot w-2 h-2 rounded-full bg-[#15803D] flex-shrink-0" />
          <span className="font-mono-dm text-[10px] text-white/75 tracking-[0.12em] uppercase">
            Our Ecosystem
          </span>
        </div>

        {/* Tagline */}
        <div className="sr d1 font-mono-dm text-[12px] text-[#B71E52] tracking-[0.14em] uppercase mb-4">
          Walking with Nepal's Enterprises
        </div>

        {/* Headline */}
        <h1 className="sr d2 font-display font-bold text-white leading-[1.0] mb-6
          text-[clamp(48px,7vw,88px)]">
          With Structure,<br />
          <em className="italic text-white/45">Support &amp; Sector</em><br />
          Expertise
        </h1>

        {/* Sub */}
        <p className="sr d3 text-white/55 text-[16px] leading-[1.85] max-w-lg mb-10">
          Aadhyanta delivers structured accelerator programmes across all 7 provinces — connecting enterprises with business development services, capital, markets, and long-term growth support.
        </p>

        {/* CTA */}
        <div className="sr d4">
          <a href="#programmes"
            className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/30">
            View All Programmes <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07]">
            {heroStats.map((s, i) => (
              <div key={i} className="sr py-8 px-6" style={{ animationDelay: `${i * 0.09}s` }}>
                <div className="font-display font-bold text-white leading-none mb-2
                  text-[clamp(30px,4vw,44px)]">
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div className="font-mono-dm text-[10px] text-white/35 tracking-[0.1em] uppercase">
                  {s.label}
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
   FUNDER TICKER
═══════════════════════════════════════════════════════════════════════════ */
function FunderTicker() {
  const all = [...funders, ...funders, ...funders, ...funders]
  return (
    <div className="bg-[#F5F2ED] border-b border-[#E8E4DD] py-3 overflow-hidden">
      <div className="ticker-track">
        {all.map((f, i) => (
          <span key={i} className="whitespace-nowrap px-8 font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase inline-flex items-center gap-6">
            {f}
            <span className="w-1 h-1 rounded-full bg-[#D6D0C7] inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAM CARD
═══════════════════════════════════════════════════════════════════════════ */
function ProgramCard({ prog, delay = 0 }: { prog: Program; delay?: number }) {
  const active = prog.status === 'active'

  return (
    <div
      className="prog-card bg-white border border-[#E8E4DD] rounded-xl overflow-hidden flex flex-col"
      style={{ opacity: 0, animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img src={prog.image} alt={prog.name} className=" w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/50 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {active ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded">
              <div className="live-dot w-1.5 h-1.5 rounded-full bg-[#15803D] flex-shrink-0" />
              <span className="font-mono-dm text-[9px] text-[#15803D] tracking-[0.1em] uppercase">Active</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded">
              <CheckCircle2 size={10} className="text-stone-400" />
              <span className="font-mono-dm text-[9px] text-stone-500 tracking-[0.1em] uppercase">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Funder */}
        <div className="funder-badge">
          <span style={{ color: '#B71E52' }}>Funder:</span> {prog.funder}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] leading-tight">
          {prog.name}
        </h3>

        {/* Description */}
        <p className="text-stone-500 text-[13px] leading-[1.8] flex-1">
          {prog.description}
        </p>

        {/* Stat chips */}
        {prog.chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prog.chips.map((chip, j) => (
              <span key={j} className="stat-chip">{chip}</span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-[#E8E4DD]" />

        {/* CTA */}
        <div className="flex items-center gap-3">
          {active ? (
            <a href={`${prog.href}#apply`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[13px] px-5 py-2.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#B71E52]/25">
              Apply Now <ArrowUpRight size={13} />
            </a>
          ) : (
            <a href={`${prog.href}#outcomes`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#F5F2ED] hover:bg-stone-200 text-stone-600 font-semibold text-[13px] px-5 py-2.5 rounded transition-all duration-200 border border-[#E8E4DD]">
              View Outcomes <ExternalLink size={13} />
            </a>
          )}
          <a href={prog.href}
            className="flex items-center justify-center gap-2 border border-[#E8E4DD] hover:border-[#1C1C2E] text-stone-500 hover:text-[#1C1C2E] font-medium text-[13px] px-4 py-2.5 rounded transition-all duration-200">
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAMMES SECTION — tabbed
═══════════════════════════════════════════════════════════════════════════ */
function Programmes() {
  const [tab, setTab] = useState<'active' | 'completed'>('active')
  const active    = programs.filter(p => p.status === 'active')
  const completed = programs.filter(p => p.status === 'completed')
  const shown     = tab === 'active' ? active : completed

  return (
    <section id="programmes" className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Explore our Programmes
            </span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              What we're <em className="italic text-[#B71E52]">running</em>
            </h2>
          </div>

          {/* Programme count summary */}
          <div className="flex gap-5 self-start sm:self-auto flex-shrink-0">
            <div className="text-center">
              <div className="font-display font-bold text-[28px] text-[#15803D] leading-none">{active.length}</div>
              <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.08em] uppercase mt-1">Active</div>
            </div>
            <div className="w-px bg-[#E8E4DD]" />
            <div className="text-center">
              <div className="font-display font-bold text-[28px] text-stone-400 leading-none">{completed.length}</div>
              <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.08em] uppercase mt-1">Completed</div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="sr flex gap-1 bg-[#F5F2ED] p-1 rounded-xl border border-[#E8E4DD] w-fit mb-12">
          <button
            onClick={() => setTab('active')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 cursor-pointer
              ${tab === 'active' ? 'bg-white text-[#1C1C2E] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${tab === 'active' ? 'bg-[#15803D]' : 'bg-stone-300'}`} />
            Active Programmes
            <span className={`font-mono-dm text-[10px] px-2 py-0.5 rounded transition-colors duration-200
              ${tab === 'active' ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-stone-200 text-stone-500'}`}>
              {active.length}
            </span>
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 cursor-pointer
              ${tab === 'completed' ? 'bg-white text-[#1C1C2E] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <CheckCircle2 size={14} className={tab === 'completed' ? 'text-stone-500' : 'text-stone-300'} />
            Completed Programmes
            <span className={`font-mono-dm text-[10px] px-2 py-0.5 rounded transition-colors duration-200
              ${tab === 'completed' ? 'bg-stone-100 text-stone-500' : 'bg-stone-200 text-stone-400'}`}>
              {completed.length}
            </span>
          </button>
        </div>

        {/* Cards grid */}
        <div key={tab} className="tab-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shown.map((prog, i) => (
            <ProgramCard key={prog.id} prog={prog} delay={i * 0.07} />
          ))}
        </div>

        {/* Empty state just in case */}
        {shown.length === 0 && (
          <div className="text-center py-20 text-stone-400 font-display italic text-[22px]">
            No programmes in this category yet.
          </div>
        )}

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   APPROACH — What makes Aadhyanta's programmes different
═══════════════════════════════════════════════════════════════════════════ */
function Approach() {
  const points = [
    {
      num: '01',
      title: 'Structured, Not Transactional',
      desc: 'Multi-month cohort programmes with clear milestones and accountability — not one-off workshops.'
    },
    {
      num: '02',
      title: 'Practitioner-Led',
      desc: 'Mentorship from experienced entrepreneurs, investors, and operators — people who\'ve built businesses, not just studied them.'
    },
    {
      num: '03',
      title: 'Capital-Connected',
      desc: 'Direct pathways to funding through our investor network, partner banks, and fund management platform.'
    },
    {
      num: '04',
      title: 'Outcome-Driven',
      desc: 'Measured by capital accessed and businesses scaled — not attendance numbers.'
    },
  ]

  return (
    <section className="bg-[#F5F2ED] py-20 md:py-24 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
            Our Approach
          </span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            What makes us <em className="italic text-[#B71E52]">different</em>
          </h2>
        </div>

        <div className="space-y-0">
          {points.map((p, i) => (
            <div key={i} className={`sr d${i + 1} flex flex-col sm:flex-row gap-6 sm:gap-10 py-8 border-b border-[#E8E4DD] last:border-b-0 group`}>
              <div className="font-display font-bold text-[36px] text-[#E8E4DD] leading-none flex-shrink-0 sm:w-14 sm:text-right transition-colors duration-200 group-hover:text-[#B71E52]">
                {p.num}
              </div>
              <div className="flex-1 sm:border-l sm:border-[#E8E4DD] sm:pl-10">
                <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-2 leading-tight">{p.title}</h3>
                <p className="text-stone-500 text-[15px] leading-[1.8]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA — For enterprises + development partners
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="bg-[#1C1C2E] py-20 hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr-s grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* For Enterprises */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2.5 py-1 bg-[#B71E52] text-white rounded mb-5 inline-block">
                Enterprises
              </span>
              <div className="w-8 h-[2px] bg-[#B71E52] rounded-full mb-5" />
              <h3 className="font-display font-bold text-[26px] text-white leading-tight mb-3">
                Seeking growth &amp; investment readiness?
              </h3>
              <p className="text-white/45 text-[14px] leading-[1.8]">
                Our accelerator programmes are designed for growth-stage enterprises ready to access capital, markets, and structured support.
              </p>
            </div>
            <a href="/contact-us?topic=accelerator"
              className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[14px] px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/30 self-start">
              Apply to a Programme <ArrowRight size={14} />
            </a>
          </div>

          {/* For Development Partners */}
          <div className="bg-white rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2.5 py-1 bg-[#1C1C2E] text-white rounded mb-5 inline-block">
                Partners
              </span>
              <div className="w-8 h-[2px] bg-[#1C1C2E] rounded-full mb-5" />
              <h3 className="font-display font-bold text-[26px] text-[#1C1C2E] leading-tight mb-3">
                Looking to design impactful ecosystem programmes?
              </h3>
              <p className="text-stone-500 text-[14px] leading-[1.8]">
                We bring fund management expertise, market connections, and proven delivery capability. Let's co-design something that works.
              </p>
            </div>
            <a href="/contact-us?topic"
              className="inline-flex items-center gap-2 bg-[#1C1C2E] hover:bg-[#B71E52] text-white font-semibold text-[14px] px-6 py-3 rounded transition-all duration-300 self-start">
              Partner With Us <ArrowUpRight size={14} />
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
export default function ProgramPage() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <FunderTicker />
        <Programmes />
        <Approach />
        <CTA />
      </div>
    </>
  )
}