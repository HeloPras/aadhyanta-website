'use client'

import { useEffect, useRef, useState } from 'react'
import {
  TrendingUp, Shield, Users, BarChart3,
  ArrowRight, CheckCircle, ChevronRight, Building2,
  ArrowUpRight, Globe, Award, Layers, MapPin, Phone, Mail, Menu, X
} from 'lucide-react'
import { Navbar } from '@/components/Layout/Navbar'
import TextFlipper from '@/components/Pages/Landing/TextFlipper'


/* ─── Minimal global CSS — only what Tailwind can't do ───────────────────── */
const GLOBAL_CSS = `

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1); } to { transform:scale(1.06); } }
  @keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes barGrow   { from { width:0; } to { width:97%; } }

  .anim-hero-zoom { animation: heroZoom 22s ease-in-out infinite alternate; }
  .ticker-track   { display:flex; width:max-content; animation: ticker 30s linear infinite; }
  .ticker-track:hover { animation-play-state: paused; }

  /* Scroll-reveal classes */
  .sr      { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l    { opacity:0; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r    { opacity:0; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s    { opacity:0; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1 { animation-delay: 0.05s !important; }
  .d2 { animation-delay: 0.13s !important; }
  .d3 { animation-delay: 0.21s !important; }
  .d4 { animation-delay: 0.29s !important; }
  .d5 { animation-delay: 0.37s !important; }

  /* Nav underline */
  .nav-link { position:relative; text-decoration:none; }
  .nav-link::after { content:''; position:absolute; left:0; bottom:-2px; height:1.5px; width:0; background:#B71E52; transition:width .25s ease; }
  .nav-link:hover::after { width:100%; }

  /* Fund tab active state */
  .fund-tab.active { background: #1C1C2E !important; color: #fff !important; }

  /* Feature card hover */
  .feat-card:hover { background: #1C1C2E !important; transform: translateY(-4px); }
  .feat-card:hover .feat-icon { background: rgba(183,30,82,0.25) !important; color: #fff !important; }
  .feat-card:hover .feat-title { color: #fff !important; }
  .feat-card:hover .feat-body  { color: rgba(255,255,255,0.55) !important; }

  /* Stat bar animation */
  .stat-bar { animation: barGrow 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; width:0; }

  /* Image zoom on card hover */
  .card-img-wrap:hover .card-img { transform: scale(1.05); }
  .card-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
`

/* ─── Intersection-observer reveal ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr,.sr-l,.sr-r,.sr-s')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Scroll progress ────────────────────────────────────────────────────── */
function useScrollPct() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => { const s = document.documentElement; setP((s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return p
}

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ end=-1, suffix = '', prefix = '', duration = 1600 }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (now:number) => {
        const t = Math.min((now - t0) / duration, 1)
        setV(Math.round((1 - Math.pow(1 - t, 3)) * end * 10) / 10)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [end, duration])
  return <span ref={ref}>{prefix}{v}{suffix}</span>
}




function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#1C1C2E]">
      {/* Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center anim-hero-zoom"
        style={{ backgroundImage: "url('/aadhyanta/Landing/grass.jpg')" }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1C1C2E]/90 via-[#1C1C2E]/60 to-[#1C1C2E]/25" />
      <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/70 via-transparent to-transparent" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36 md:pt-44">
        {/* Badge */}
        <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white/[0.07] border border-white/15 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-mono-dm text-[10px] text-white/80 tracking-[0.12em] uppercase">
            Nepal's First SEBON-Licensed Fund Manager
          </span>
        </div>

        {/* Headline */}
        <h1 className="sr d1 font-display font-bold text-white leading-none mb-7
          text-[clamp(48px,8vw,92px)]">
          Transforming the <br />
          <em className="italic text-white/45">Approach to Capital</em><br />
           Mobilization
        </h1>

        {/* Sub */}
        <p className="sr d2 text-white/60 text-base sm:text-lg leading-[1.8] max-w-md mb-10">
          We deploy growth capital and build investment-ready ecosystems across Nepal, bridging the gap between ambitious enterprises and institutional investors.
        </p>

        {/* CTAs */}
        <div className="sr d3 flex flex-col sm:flex-row gap-3">
          <a href="#" className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#B71E52]/30">
           <TextFlipper className='bg-transparent text-white font-semibold text-[15px]'>For&nbsp;Enterprises</TextFlipper> <ArrowRight size={16} />
          </a>
          <button className="flex items-center justify-center gap-2 text-white font-medium text-[15px] px-8 py-4 rounded border border-white/30 hover:bg-white/10 transition-all duration-200">
            For Investors
          </button>
        </div>

        {/* Scroll cue */}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS STRIP
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { end: 320, suffix: 'M+', prefix: 'NPR ', label: 'Capital Mobilized', icon: <TrendingUp size={16} /> },
    { end: 200, suffix: '+', prefix: '', label: 'Enterprises Supported', icon: <Building2 size={16} /> },
    { end: 1, suffix: '', prefix: '', label: 'Active Funds', icon: <Layers size={16} /> },
    { end: 7, suffix: '', prefix: '', label: 'Provinces Covered', icon: <Globe size={16} /> },
  ]
  return (
    <section className="  bg-[#F5F2ED] border-b border-[#E8E4DD] ">
      <div className="max-w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="   grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD]">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`sr p-8 lg:p-10 text-center`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-2 mb-3 text-[#B71E52]">
                {s.icon}
                <span className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase">
                  {s.label}
                </span>
              </div>
              <div className="font-display font-bold text-[42px] sm:text-[48px] text-[#1C1C2E] leading-none ">
                <Counter end={s.end} suffix={s.suffix} prefix={s.prefix} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════════════════════ */
function TrustBar() {
  const badges = ['SEBON Licensed', 'SDG Aligned', 'Gender-Smart', 'IFC Supported', 'Impact Verified']
  return (
    <section className="bg-white border-b border-[#E8E4DD] py-4 px-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center min-w-max md:min-w-0 gap-0">
        {badges.map((b, i) => (
          <div key={i} className={`flex items-center gap-2 px-5 sm:px-7 ${i < badges.length - 1 ? 'border-r border-[#E8E4DD]' : ''}`}>
            <div className="w-4 h-4 rounded-full bg-[#f5e8ed] flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52]" />
            </div>
            <span className="font-medium text-[13px] text-stone-500 whitespace-nowrap">{b}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function About() {
  const points = [
    'Establish and manage sector-focused investment funds by mobilizing domestic and foreign capital',
    'Invest in and restructure high-potential companies, partnering with institutions to provide advisory and technical support',
    'Facilitate foreign investment and manage foreign exchange risk',
    'Manage assets and securities, deploying capital through flexible instruments — equity, debt, and hybrid structures',
  ]
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left */}
        <div className="sr-l ">
          <span className="font-mono-dm text-sm tracking-[0.14em] uppercase text-[#B71E52] mb-3 block  ">
            About Aadhyanta
          </span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-6">
            Uniquely equipped to support{" "}
            <em className="italic text-[#B71E52]">global investors</em>
          </h2>
          <p className="text-stone-500 text-[18px] leading-[1.85] mb-8">
            With a mission to transform how capital is mobilized and deployed
            across Nepal. Backed by the country's leading banks with a combined
            promoter stake exceeding 50%, we manage sector-focused investment
            funds that bridge the gap between institutional capital and
            high-potential businesses.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {points.map((p, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={11} className="text-[#B71E52]" />
                </div>
                <span className="text-[16px] text-stone-600 leading-[1.7]">
                  {p}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
          >
          <TextFlipper className='bg-transparent text-white font-semibold text-sm '>Our&nbsp;Story 
          </TextFlipper>
             <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Right */}
        <div className="sr-r relative mt-8 lg:mt-0">
          {/* Main image */}
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-stone-200 aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl p-5 shadow-xl shadow-stone-200/80 border border-[#E8E4DD] min-w-[160px]">
            <div className="font-display font-bold text-[34px] text-[#1C1C2E] leading-none">
              <Counter end={97} suffix="%" />
            </div>
            <div className="text-[12px] text-stone-400 mt-1">
              Portfolio Retention
            </div>
            <div className="mt-3 h-[3px] bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#B71E52] rounded-full stat-bar" />
            </div>
          </div>

          {/* Corner bracket */}
          <div className="absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 border-[#B71E52] rounded-tr-xl opacity-40 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════════════════ */
function Services() {
  const services = [
    {
      num: '01', icon: <TrendingUp size={20} />, title: 'Fund Management',
      desc: 'We manage three institutional funds totaling NPR 320M+ in committed capital, deploying growth equity to market-proven enterprises across all seven provinces of Nepal.',
      items: ['Nepal Opportunity Fund I & II', 'Simrik Fund (gender-lens)', 'Sector-agnostic approach', '5–7 year hold periods'],
    },
    {
      num: '02', icon: <Award size={20} />, title: 'Ecosystem Building',
      desc: 'Through targeted accelerator programs and technical assistance, we transform early-stage ventures into investment-ready enterprises capable of absorbing institutional capital.',
      items: ['Comprehensive accelerator programs', 'Investment readiness training', 'Market linkage support', 'Governance strengthening'],
    },
    {
      num: '03', icon: <Shield size={20} />, title: 'Impact & Inclusion',
      desc: 'Every investment integrates rigorous impact measurement, targeting job creation, gender inclusion, climate resilience, and sustainable development aligned with national priorities.',
      items: ['SDG-aligned investments', 'Gender lens integration', 'Climate impact measurement', 'Livelihood creation focus'],
    },
  ]
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <span className="font-mono-dm text-sm tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">What We Do</span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              Capital Meets <em className="italic text-[#B71E52]">Capability</em>
            </h2>
          </div>
          <p className="text-stone-500 text-[18px] leading-[1.85] lg:pt-4">
            Aadhyanta stands at the intersection of institutional finance and transformative impact — building the entire ecosystem that makes growth sustainable, inclusive, and scalable across Nepal.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className={`sr d${i + 1} relative bg-white rounded-xl border border-[#E8E4DD] p-8 sm:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-200`}>
              {/* Ghost number */}
              <span className="absolute top-4 right-5 font-display font-bold text-[96px] text-[#1C1C2E]/15 leading-none select-none pointer-events-none">{s.num}</span>

              <div className="w-11 h-11 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-6">{s.icon}</div>
              <h3 className="font-display font-bold text-[24px] text-[#1C1C2E] mb-3 leading-tight">{s.title}</h3>
              <p className="text-[16px] text-stone-500 leading-[1.8] mb-6">{s.desc}</p>
              <hr className="border-[#E8E4DD] mb-6" />
              <ul className="space-y-2.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <ChevronRight size={13} className="text-[#B71E52] mt-0.5 shrink-0" />
                    <span className="text-[14px] text-stone-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FUNDS
═══════════════════════════════════════════════════════════════════════════ */
function Funds() {
  const [active, setActive] = useState(0)
  const funds = [
    {
      tag: 'NOF I', title: 'Nepal Opportunity Fund I', subtitle: 'Our flagship growth equity vehicle',
      desc: 'NOF I targets established businesses with proven models, strong management, and clear growth trajectories. We provide patient capital with active governance support and strategic value-add.',
      items: ['Sector-agnostic', 'All 7 provinces', 'NPR 10–50M tickets', '5–7 year hold periods', 'Board representation'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
      capital: 'NPR 120M+',
      href: '/fund/nofone'
    },
    {
      tag: 'NOF II', title: 'Nepal Opportunity Fund II', subtitle: 'Building on a proven track record',
      desc: 'Our second fund continues supporting portfolio companies while identifying new high-potential enterprises ready for institutional capital and strategic growth partnerships across Nepal.',
      items: ['Follow-on capacity', 'Larger ticket sizes', 'Enhanced due diligence', 'Portfolio synergies', 'Active value creation'],
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      capital: 'NPR 140M+',
      href: '/fund/noftwo'
    },
    {
      tag: 'Simrik', title: 'Simrik Fund', subtitle: "Nepal's first gender-lens investment fund",
      desc: 'Managed by an all-women deal team, Simrik targets women-led enterprises and businesses with significant women beneficiaries, addressing critical financing gaps with measurable gender impact.',
      items: ['Women-led businesses', 'Women workforce focus', 'All-women deal team', 'Gender-smart design', 'Inclusion metrics'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
      capital: 'NPR 60M+',
      href: '/fund/simrik'
    },
  ]
  const f = funds[active]

  return (
    <section className="bg-white py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-dm text-sm tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Funds</span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              Three Vehicles, <em className="italic text-[#B71E52]">One Mission</em>
            </h2>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 bg-[#F5F2ED] p-1 rounded-lg border border-[#E8E4DD] self-start sm:self-auto">
            {funds.map((fund, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`fund-tab px-4 sm:px-5 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200 cursor-pointer
                  ${active === i ? 'bg-[#1C1C2E] text-white' : 'text-stone-400 hover:text-stone-600'}`}>
                {fund.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Fund panel */}
        <div key={active} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ animation: 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden aspect-4/3 shadow-2xl shadow-stone-200">
            <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="font-display font-bold text-[30px] text-white leading-none">{f.capital}</div>
                <div className="text-[11px] text-white/60 mt-1">Committed Capital</div>
              </div>
              <span className="px-3 py-1.5 bg-[#B71E52] rounded font-mono-dm text-[9px] text-white tracking-widest uppercase">{f.tag}</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-display font-bold text-[28px] sm:text-[32px] text-[#1C1C2E] mb-2 leading-tight">{f.title}</h3>
            <p className="text-[14px] text-[#B71E52] italic mb-5">{f.subtitle}</p>
            <p className="text-[16px] text-stone-500 leading-[1.85] mb-8">{f.desc}</p>
            <div className="space-y-3 mb-10">
              {f.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-[1.5px] bg-stone-300 shrink-0" />
                  <span className="text-[14px] text-stone-600">{item}</span>
                </div>
              ))}
            </div>
            <a href={f.href} className="inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
              <TextFlipper>Learn&nbsp;More</TextFlipper> <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HIGHLIGHTS
═══════════════════════════════════════════════════════════════════════════ */
function Highlights() {
  const items = [
    { tag: 'Gender Finance', title: 'Simrik Fund Launch', desc: "Nepal's first gender-lens investment fund, managed by an all-women deal team, targeting women-led and women-benefiting enterprises.", image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80' },
    { tag: 'Provincial Dev.', title: 'Koshi Accelerator', desc: 'A targeted initiative supporting enterprises in Koshi Province through capital access, technical assistance, and market linkages.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80' },
    { tag: 'Portfolio', title: 'DV Excellus Partnership', desc: "Strategic growth investment in one of Nepal's leading manufacturers, showcasing value creation through governance strengthening.", image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=700&q=80' },
  ]
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <span className="font-mono-dm text-sm tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Recent Highlights</span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              Building Nepal's <em className="italic text-[#B71E52]">Investment Future</em>
            </h2>
          </div>
          <a href="/fund" className="inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[14px] hover:gap-3 transition-all duration-200 self-start sm:self-auto shrink-0">
            View All <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={i} className={`sr d${i + 1} card-img-wrap bg-white rounded-xl overflow-hidden border border-[#E8E4DD] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-200`}>
              <div className="relative h-52 overflow-hidden">
                <img src={item.image} alt={item.title} className="card-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#B71E52] rounded font-mono-dm text-[9px] text-white tracking-widest uppercase">
                  {item.tag}
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display font-bold text-[22px] text-[#1C1C2E] mb-2.5 leading-snug">{item.title}</h3>
                <p className="text-[14px] text-stone-500 leading-[1.75] mb-5">{item.desc}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[13px] hover:gap-3 transition-all duration-200">
                  Read More <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════════════════════════ */
function Features() {
  const feats = [
    { icon: <TrendingUp size={20} />, title: 'Expert Portfolio Management', body: "Strategic investment solutions tailored to your financial goals with proven track records across Nepal's diverse sectors." },
    { icon: <Shield size={20} />, title: 'Risk Management', body: 'Comprehensive risk assessment and mitigation strategies to protect and grow your investments over the long term.' },
    { icon: <Users size={20} />, title: 'Dedicated Advisory', body: 'Personalized guidance from experienced financial advisors committed to your success at every stage of your journey.' },
    { icon: <BarChart3 size={20} />, title: 'Real-Time Analytics', body: 'Advanced reporting and insights to keep you fully informed about your portfolio performance and opportunities.' },
  ]
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr text-center max-w-xl mx-auto mb-16">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Why Choose Us</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            The Difference of <em className="italic text-[#B71E52]">Premier Fund Management</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E8E4DD] divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#E8E4DD]">
          {feats.map((f, i) => (
            <div key={i} className={`sr feat-card d${i + 1} p-8 sm:p-9 bg-white transition-all duration-300 cursor-default
              ${i < 3 ? 'lg:border-r lg:border-[#E8E4DD]' : ''}`}>
              <div className="feat-icon w-11 h-11 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] mb-5 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="feat-title font-display font-bold text-[22px] text-[#1C1C2E] mb-3 leading-tight transition-colors duration-300">{f.title}</h3>
              <p className="feat-body text-[16px] text-stone-500 leading-[1.75] transition-colors duration-300">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIAL
═══════════════════════════════════════════════════════════════════════════ */
function Testimonial() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-24 border-t border-b border-[#E8E4DD] px-4">
      <div className="sr-s max-w-2xl mx-auto text-center">
        <div className='flex'>
        <div className="font-display text-[72px] text-[#B71E52]/25 leading-[0.6] mb-6">"</div>
        <blockquote className="font-display italic text-[clamp(20px,3vw,34px)] text-[#1C1C2E] leading-[1.6] mb-8">
          Aadhyanta has been instrumental in our growth. Their disciplined approach to capital deployment and hands-on governance support set them apart from any other investor we've worked with.
        </blockquote>
        <div className="font-display text-[72px] text-[#B71E52]/25 leading-[0.6] mb-6">"</div>
</div>
        <div className="flex items-center justify-center gap-3">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80"
            alt="CEO" className="w-11 h-11 rounded-full object-cover border-2 border-[#E8E4DD]" />
          <div className="text-left">
            <div className="font-semibold text-[14px] text-[#1C1C2E]">Rajiv Sharma</div>
            <div className="text-[12px] text-stone-400">CEO, DV Excellus</div>
          </div>
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
    <section className="bg-white py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-sm tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Get Started</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-5">
            Ready to Grow <em className="italic text-[#B71E52]">Your Wealth?</em>
          </h2>
          <p className="text-stone-500 text-base leading-[1.85] mb-10">
            Join the growing community of investors who trust us with their financial future. Schedule a consultation with our expert advisors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/contact-us" className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
             <TextFlipper>Schedule&nbsp;Consultation</TextFlipper> <ArrowRight size={16} />
            </a>
            <a href="#" className="flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200">
              Download Deck
            </a>
          </div>
        </div>

        {/* Right — contact card */}
        <div className="sr-r">
          <div className="bg-[#F5F2ED] rounded-xl p-8 sm:p-10 border border-[#E8E4DD]">
            <p className="font-semibold text-[15px] text-[#1C1C2E] mb-7">Contact Us Directly</p>
            {[
              { icon: <MapPin size={15} />, label: 'Address', val: 'Lazimpat, Kathmandu, Nepal' },
              { icon: <Phone size={15} />, label: 'Phone', val: '+977 1 XXXXXXX' },
              { icon: <Mail size={15} />, label: 'Email', val: 'invest@aadhyanta.com' },
            ].map((c, i) => (
              <div key={i} className={`flex gap-4 items-start ${i < 2 ? 'mb-6 pb-6 border-b border-[#E8E4DD]' : ''}`}>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E8E4DD] flex items-center justify-center text-[#B71E52] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-1">{c.label}</div>
                  <div className="text-[14px] text-[#1C1C2E] font-medium">{c.val}</div>
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
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  useReveal()
  const prog = useScrollPct()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      {/* Progress bar */}
      <div
        className="fixed top-0  left-0 h-[2px] z-9999 bg-[#B71E52] transition-[width_0.1s_linear]"
        style={{ width: `${prog}%` }}
      />

      {/* <Nav />
      <Ticker /> */}
      <Navbar />
      <Hero />
      <Stats />
      <TrustBar />
      <About />
      <Services />
      <Funds />
      <Highlights />
      <Features />
      <Testimonial />
      <CTA />
      {/* <Footer /> */}
    </>
  )
}