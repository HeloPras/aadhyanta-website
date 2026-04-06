'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Target, Users, TrendingUp, Globe, Lightbulb,
  Building2, Leaf, Zap, CheckCircle, ArrowRight, Mail, ChevronRight
} from 'lucide-react'

/* ─── Global CSS — same token system, distinct personality ──────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }
  .font-display { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(14px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes panelIn   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }
  @keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes drawLine  { from { width:0; } to { width:100%; } }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }

  /* Scroll-reveal */
  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important} .d6{animation-delay:.45s!important}

  /* Ticker */
  .ticker-track { display:flex; width:max-content; animation: ticker 28s linear infinite; }
  .ticker-track:hover { animation-play-state:paused; }

  /* Panel transition */
  .panel-in { animation: panelIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Stat pop */
  .stat-pop { animation: numberPop 0.6s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }

  /* Approach card — distinctive step number style */
  .approach-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .approach-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
  .approach-card:hover .approach-num { color: #B71E52 !important; }

  /* Component card */
  .comp-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.2s; }
  .comp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.07); border-color: #B71E52 !important; }

  /* Track tab */
  .track-tab { transition: all 0.2s; }

  /* Integration row */
  .integ-row { transition: background 0.2s, transform 0.2s; }
  .integ-row:hover { background: #fff !important; transform: translateX(4px); }

  /* CTA card hover */
  .cta-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .cta-card:hover { transform: translateY(-4px); box-shadow: 0 24px 56px rgba(0,0,0,0.1); }

  /* Partner logos */
  .partner-logo { filter: grayscale(100%); opacity: 0.5; transition: all 0.3s; }
  .partner-logo:hover { filter: grayscale(0%); opacity: 1; }

  /* Hero step dots */
  @keyframes stepPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
`

/* ─── Intersection reveal ───────────────────────────────────────────────── */
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

/* ─── Animated stat ─────────────────────────────────────────────────────── */
function StatNumber({ value }:{value:string}) {
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
    <span ref={ref} className={show ? 'stat-pop' : 'opacity-0'}>{value}</span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const stats = [
  { value: '200+', label: 'Enterprises Supported' },
  { value: '$28M+', label: 'Capital Facilitated' },
  { value: '50+', label: 'Investment-Ready Enterprises' },
  { value: '7', label: 'Provinces Reached' },
]

const approach = [
  { title: 'Structured, Not Transactional', desc: 'Multi-month cohort programs with clear milestones and accountability — not one-off workshops.' },
  { title: 'Practitioner-Led', desc: "Mentorship from experienced entrepreneurs, investors, and operators — people who've built businesses, not just studied them." },
  { title: 'Capital-Connected', desc: 'Direct pathways to funding through our investor network, partner banks, and fund management platform.' },
  { title: 'Market-Focused', desc: 'Real buyer/supplier introductions and partnership facilitation — not just capability building.' },
  { title: 'Outcome-Driven', desc: 'Measured by capital accessed and businesses scaled — not attendance numbers.' },
]

const components = [
  { icon: <Target size={20} />, title: 'Investment Readiness', items: ['Financial modeling and business plan refinement', 'Governance framework development', 'Financial reporting systems strengthening', 'Pitch preparation and investor targeting'] },
  { icon: <Users size={20} />, title: 'Expert Mentorship', items: ['One-on-one guidance from experienced entrepreneurs', 'Sector-specific technical advisors', 'Strategic planning support', 'Operational excellence frameworks'] },
  { icon: <Globe size={20} />, title: 'Market Linkages', items: ['Buyer and supplier introductions', 'Strategic partnership facilitation', 'Distribution channel access', 'Export market connections'] },
  { icon: <TrendingUp size={20} />, title: 'Capital Facilitation', items: ['Bank credit access through partner institutions', 'Investor network introductions', 'Fund consideration for high-performers', 'Pitch events and demo days'] },
  { icon: <Lightbulb size={20} />, title: 'Peer Learning', items: ['Cohort-based learning with fellow entrepreneurs', 'Peer-to-peer problem solving', 'Shared experiences and best practices', 'Long-term alumni network'] },
]

const tracks = [
  {
    name: 'General Accelerator', shortName: 'General', tagline: 'Sector-agnostic enterprise support',
    icon: <Building2 size={18} />,
    description: 'Our flagship track supports growth-stage SMEs across all sectors — manufacturing, services, technology, agriculture, hospitality — with proven revenue and clear expansion potential.',
    details: [
      { label: 'Focus', value: 'Comprehensive investment readiness for established businesses seeking growth capital' },
      { label: 'Who Should Apply', value: 'NPR 10M+ revenue, 3+ years operations, proven market demand, clear expansion plans' },
    ],
  },
  {
    name: 'Koshi Accelerator', shortName: 'Koshi', tagline: 'Provincial enterprise development',
    icon: <Globe size={18} />,
    description: 'Developed in partnership with Koshi Province government, this initiative brings the Aadhyanta Accelerator model to provincial enterprises across agriculture, manufacturing, and services.',
    details: [
      { label: 'Focus', value: 'Supporting local enterprises with province-specific market intelligence and government alignment' },
      { label: 'Why It Matters', value: 'Demonstrates that investment-ready businesses exist beyond Kathmandu — creating a replicable model for all seven provinces' },
    ],
  },
  {
    name: 'DIAL Initiative', shortName: 'DIAL', tagline: 'Digital Innovation for Agriculture & Livelihoods',
    icon: <Leaf size={18} />,
    description: 'Specialized track supporting digital solutions for agriculture value chains — connecting tech entrepreneurs with farming realities, facilitating market validation, and enabling investment access for proven innovations.',
    details: [
      { label: 'Focus', value: 'Technology-enabled agriculture, farmer livelihoods, supply chain optimization' },
      { label: 'Approach', value: 'Supporting entrepreneurs proving their solutions work through pilot facilitation and farmer feedback' },
    ],
  },
  {
    name: 'Roof of the World', shortName: 'RoW', tagline: 'Cross-border market access',
    icon: <Zap size={18} />,
    description: 'Supporting Nepali SMEs seeking regional expansion through market intelligence, buyer connections, and cross-border partnership development.',
    details: [
      { label: 'Focus', value: 'Export development, regional trade facilitation, international market access' },
      { label: 'Strategic Value', value: "For enterprises constrained by Nepal's domestic market, regional expansion unlocks growth potential that attracts institutional investment" },
    ],
  },
]

const integration = [
  { title: 'Deal Flow Generation', desc: 'We identify high-potential enterprises early, before they reach traditional fund sourcing channels' },
  { title: 'Investment Readiness', desc: 'We strengthen governance and financial systems before capital deployment, reducing execution risk' },
  { title: 'Market Intelligence', desc: 'Direct enterprise engagement provides ground-level sector insights that inform investment decisions' },
  { title: 'Portfolio Support', desc: 'Program infrastructure — mentors, buyers, technical advisors — benefits our portfolio companies post-investment' },
  { title: 'Ecosystem Credibility', desc: "Supporting 200+ enterprises builds trust and relationships across Nepal's business community" },
]

const partners = [
  { name: 'Swiss Development Cooperation', src: '/aadhyanta/Logo/Program/Swiss.jpeg' },
  { name: 'USAID', src: '/aadhyanta/Logo/Program/USAID.webp' },
  { name: 'FAO', src: '/aadhyanta/Logo/Program/FAO.svg' },
  { name: 'Winrock International', src: '/aadhyanta/Logo/Program/winrock.png' },
  { name: 'Koshi Province Government', src: '' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — Different from other pages: uses a split layout with a bold
   typographic left + illustrated step pipeline on the right
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const steps = ['Source', 'Assess', 'Accelerate', 'Fund']
  return (
    <section className="relative bg-[#F5F2ED] border-b border-[#E8E4DD] overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#D6D0C7 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — text */}
        <div>
          {/* Badge */}
          <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] shrink-0" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">Accelerator Programs</span>
          </div>

          <h1 className="sr d1 font-display font-bold leading-none text-[#1C1C2E] mb-6
            text-[clamp(44px,6vw,76px)]">
            Aadhyanta<br />
            <em className="italic text-[#B71E52]">Accelerator</em><br />
            Program
          </h1>

          <p className="sr d2 text-stone-500 text-base sm:text-lg leading-[1.85] max-w-md mb-10">
            Building investment-ready enterprises through comprehensive support, market connections, and direct pathways to capital.
          </p>

          <div className="sr d3 flex flex-col sm:flex-row gap-3">
            <a href="#apply" className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
              Apply Now <ArrowRight size={15} />
            </a>
            <a href="#tracks" className="flex items-center justify-center gap-2 border border-[#1C1C2E] text-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200">
              View Tracks
            </a>
          </div>
        </div>

        {/* Right — pipeline visualisation */}
        <div className="sr-r hidden lg:flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-5 group">
              {/* Node + connector */}
              <div className="flex flex-col items-center">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-mono-dm text-[11px] font-medium shrink-0 border-2 transition-all duration-300
                  ${i === 2
                    ? 'bg-[#B71E52] border-[#B71E52] text-white shadow-lg shadow-[#B71E52]/30'
                    : 'bg-white border-[#E8E4DD] text-stone-400 group-hover:border-[#B71E52] group-hover:text-[#B71E52]'}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-10 bg-[#E8E4DD]" />
                )}
              </div>

              {/* Label card */}
              <div className={`flex-1 rounded-xl border px-6 py-4 mb-3 transition-all duration-200
                ${i === 2
                  ? 'bg-white border-[#B71E52] shadow-md'
                  : 'bg-white/70 border-[#E8E4DD]'}`}>
                <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.12em] uppercase mb-0.5">Step {String(i + 1).padStart(2, '0')}</div>
                <div className="font-display font-bold text-[20px] text-[#1C1C2E] leading-tight">{step}</div>
                {i === 2 && <div className="text-[12px] text-[#B71E52] font-medium mt-0.5">You are here</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS — Dark background, distinct from landing/about
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <section className="bg-[#1C1C2E] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07]">
          {stats.map((s, i) => (
            <div key={i} className="sr p-8 lg:p-10 group" style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="font-mono-dm text-[10px] text-white/35 tracking-widest uppercase mb-3">{s.label}</div>
              <div className="font-display font-bold text-white leading-none
                text-[clamp(32px,4vw,48px)]">
                <StatNumber value={s.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   THE CHALLENGE — centered, pull-quote style
═══════════════════════════════════════════════════════════════════════════ */
function Challenge() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="sr">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-4 block">The Challenge We Address</span>
          <h2 className="font-display font-bold text-[clamp(34px,4.5vw,56px)] leading-[1.06] text-[#1C1C2E] mb-8">
            Capital alone isn't <em className="italic text-[#B71E52]">the constraint</em>
          </h2>
        </div>

        <div className="sr-s relative bg-[#F5F2ED] rounded-2xl border border-[#E8E4DD] p-8 sm:p-12 text-left overflow-hidden">
          {/* Decorative quote */}
          <div className="absolute top-4 right-6 font-display font-bold text-[120px] text-[#1C1C2E]/4 leading-none select-none pointer-events-none">"</div>

          <p className="text-stone-500 text-[15px] sm:text-[16px] leading-[1.9] mb-6 relative z-10">
            Nepal has promising enterprises with strong products, capable teams, and real market demand. But they lack what institutional investors require: financial discipline, governance frameworks, market validation, and scalable business models.
          </p>
          <div className="w-10 h-[3px] bg-[#B71E52] rounded-full mb-5" />
          <p className="font-display font-bold text-[20px] sm:text-[22px] text-[#1C1C2E] leading-[1.45] relative z-10">
            The Aadhyanta Accelerator bridges this gap — transforming promising businesses into fundable opportunities through structured support, expert mentorship, and direct connections to capital.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   OUR APPROACH — numbered horizontal list
═══════════════════════════════════════════════════════════════════════════ */
function Approach() {
  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Our Approach</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            What makes us <em className="italic text-[#B71E52]">different</em>
          </h2>
        </div>

        <div className="space-y-0">
          {approach.map((a, i) => (
            <div key={i} className={`sr d${Math.min(i + 1, 5)} approach-card flex flex-col sm:flex-row gap-5 sm:gap-10 items-start
              py-7 border-b border-[#E8E4DD] last:border-b-0 group`}>
              {/* Number */}
              <div className="approach-num font-display font-bold text-[36px] text-[#E8E4DD] leading-none shrink-0 transition-colors duration-200 sm:w-14 sm:text-right">
                {String(i + 1).padStart(2, '0')}
              </div>
              {/* Content */}
              <div className="flex-1 sm:border-l sm:border-[#E8E4DD] sm:pl-10">
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-[#1C1C2E] mb-2 leading-tight">{a.title}</h3>
                <p className="text-stone-500 text-[14px] sm:text-[15px] leading-[1.8]">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAM COMPONENTS — icon cards with crimson accent on hover
═══════════════════════════════════════════════════════════════════════════ */
function Components() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr mb-14 text-center">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Program Components</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E] mb-3">
            Comprehensive <em className="italic text-[#B71E52]">enterprise support</em>
          </h2>
          <p className="text-stone-500 text-[15px] max-w-xl mx-auto">Every enterprise receives structured support across five critical dimensions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {components.map((c, i) => (
            <div key={i} className={`sr comp-card d${i + 1} bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-8 cursor-default`}>
              {/* Ghost number */}
              <div className="relative mb-6">
                <span className="absolute top-0 right-0 font-display font-bold text-[72px] text-[#1C1C2E]/5 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-11 h-11 rounded-lg bg-white border border-[#E8E4DD] flex items-center justify-center text-[#B71E52] relative z-10">
                  {c.icon}
                </div>
              </div>

              <h3 className="font-display font-bold text-[20px] text-[#1C1C2E] mb-4 leading-tight">{c.title}</h3>

              <ul className="space-y-3">
                {c.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52] shrink-0 mt-[7px]" />
                    <span className="text-[13px] text-stone-500 leading-[1.75]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sixth cell — CTA tile */}
          <div className="sr d6 rounded-xl bg-[#1C1C2E] p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-xl"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="w-8 h-[2px] bg-[#B71E52] mb-5 rounded-full" />
              <p className="font-display font-bold text-[22px] text-white leading-tight mb-3">
                Ready to scale your enterprise?
              </p>
              <p className="text-[13px] text-white/45 leading-[1.75]">
                Join Nepal's leading enterprise accelerator and access capital, markets, and mentorship.
              </p>
            </div>
            <a href="#apply" className="relative z-10 mt-6 inline-flex items-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[13px] px-5 py-2.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-[#B71E52]/30 self-start">
              Apply Now <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPECIALIZED TRACKS — tabbed with sidebar nav on desktop
═══════════════════════════════════════════════════════════════════════════ */
function Tracks() {
  const [active, setActive] = useState(0)
  const t = tracks[active]

  return (
    <section id="tracks" className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="sr mb-12">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Specialized Initiatives</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Four distinct <em className="italic text-[#B71E52]">tracks</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

          {/* Sidebar tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {tracks.map((track, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`track-tab flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left flex-shrink-0 lg:flex-shrink cursor-pointer w-full
                  ${active === i
                    ? 'bg-white border-[#B71E52] shadow-md'
                    : 'bg-white/60 border-[#E8E4DD] hover:bg-white hover:border-stone-300'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${active === i ? 'bg-[#f5e8ed] text-[#B71E52]' : 'bg-[#F5F2ED] text-stone-400'}`}>
                  {track.icon}
                </div>
                <div className="min-w-0">
                  <div className={`font-semibold text-[13px] leading-tight transition-colors duration-200 ${active === i ? 'text-[#1C1C2E]' : 'text-stone-500'}`}>
                    {track.shortName}
                  </div>
                  <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.08em] uppercase truncate">{track.tagline}</div>
                </div>
                {active === i && <div className="ml-auto w-1 h-5 bg-[#B71E52] rounded-full flex-shrink-0 hidden lg:block" />}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div key={active} className="panel-in bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">

            {/* Panel header */}
            <div className="p-8 sm:p-10 border-b border-[#E8E4DD]">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#f5e8ed] flex items-center justify-center text-[#B71E52]">
                  {t.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[24px] sm:text-[28px] text-[#1C1C2E] leading-tight">{t.name}</h3>
                  <p className="text-[13px] text-[#B71E52] italic mt-0.5">{t.tagline}</p>
                </div>
              </div>
              <p className="text-stone-500 text-[15px] leading-[1.85]">{t.description}</p>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E4DD]">
              {t.details.map((d, i) => (
                <div key={i} className="p-7 sm:p-8">
                  <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-3">{d.label}</div>
                  <p className="text-[14px] text-stone-600 leading-[1.8]">{d.value}</p>
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
   INTEGRATION WITH FUNDS
═══════════════════════════════════════════════════════════════════════════ */
function Integration() {
  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Strategic Integration</span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            How the accelerator connects to our <em className="italic text-[#B71E52]">funds</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-5">
            Ecosystem building isn't separate from investing — it's integrated.
          </p>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            This integration is our competitive advantage. While other fund managers wait for deals to arrive, we actively build the enterprises that become tomorrow's investments.
          </p>

          {/* Decorative connector graphic */}
          <div className="mt-10 hidden sm:flex items-center gap-3">
            {['Accelerate', '→', 'Fund', '→', 'Grow'].map((s, i) => (
              <div key={i}>
                {s === '→'
                  ? <span className="text-[#B71E52] font-bold text-lg">{s}</span>
                  : <span className="px-4 py-2 rounded-lg bg-[#F5F2ED] border border-[#E8E4DD] font-mono-dm text-[11px] text-[#1C1C2E] tracking-[0.08em] uppercase">{s}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Right — integration list */}
        <div className="sr-r space-y-3">
          {integration.map((item, i) => (
            <div key={i} className={`integ-row sr d${Math.min(i + 1, 5)} flex items-start gap-4 p-5 rounded-xl bg-[#F5F2ED] border border-[#E8E4DD]`}>
              <div className="w-7 h-7 rounded-full bg-[#f5e8ed] border border-[#E8E4DD] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={13} className="text-[#B71E52]" />
              </div>
              <div>
                <div className="font-semibold text-[14px] text-[#1C1C2E] mb-1">{item.title}</div>
                <div className="text-[13px] text-stone-500 leading-[1.7]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNERS TICKER
═══════════════════════════════════════════════════════════════════════════ */
function Partners() {
  const all = [...partners, ...partners]
  return (
    <section className="bg-[#F5F2ED] py-14 border-b border-[#E8E4DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] text-center">Program Partners</p>
      </div>
      <div className="overflow-hidden">
        <div className="ticker-track">
          {all.map((p, i) => (
            <div key={i} className="shrink-0 mx-10 flex items-center justify-center h-12 w-36">
              {p.src
                ? <img src={p.src} alt={p.name} className="partner-logo h-full w-full object-contain" />
                : <span className="font-mono-dm text-[11px] text-stone-400 tracking-[0.08em] uppercase text-center leading-tight partner-logo">{p.name}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA — two cards side by side
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section id="apply" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr text-center mb-14">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Get Involved</span>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
            Ready to <em className="italic text-[#B71E52]">take the next step?</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* For Enterprises */}
          <div className="cta-card bg-[#F5F2ED] border-2 border-[#B71E52] rounded-2xl p-8 sm:p-10 flex flex-col">
            <div className="w-10 h-[3px] bg-[#B71E52] rounded-full mb-6" />
            <h3 className="font-display font-bold text-[26px] text-[#1C1C2E] mb-3 leading-tight">For Enterprises</h3>
            <p className="text-stone-500 text-[14px] leading-[1.8] mb-7">
              Are you a growth-stage SME ready to scale? The Aadhyanta Accelerator provides structured support, market connections, and pathways to capital.
            </p>

            <div className="space-y-4 mb-7 pb-7 border-b border-[#E8E4DD]">
              {[
                { label: 'Duration', val: '6–12 months depending on track' },
                { label: 'Application', val: 'Rolling applications with cohort-based selection' },
              ].map((d, i) => (
                <div key={i}>
                  <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.1em] uppercase mb-1">{d.label}</div>
                  <div className="text-[14px] text-stone-600 font-medium">{d.val}</div>
                </div>
              ))}
            </div>

            <a href="#" className="mt-auto flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
              Apply Now <ArrowRight size={16} />
            </a>
          </div>

          {/* For Development Partners */}
          <div className="cta-card bg-[#1C1C2E] rounded-2xl p-8 sm:p-10 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-2xl"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-[3px] bg-[#B71E52] rounded-full mb-6" />
              <h3 className="font-display font-bold text-[26px] text-white mb-3 leading-tight">For Development Partners</h3>
              <p className="text-white/50 text-[14px] leading-[1.8] mb-7">
                Looking to design ecosystem programs that create sustainable impact? We bring fund management expertise, market connections, and proven implementation capability.
              </p>

              <ul className="space-y-3 mb-8 pb-8 border-b border-white/[0.08]">
                {[
                  'Strategic program design around partner objectives',
                  'Outcome focus: capital accessed and businesses scaled',
                  'Real market connections through fund platform',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f5e8ed]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={11} className="text-[#B71E52]" />
                    </div>
                    <span className="text-[13px] text-white/55 leading-[1.7]">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="mailto:partnerships@aadhyanta.com"
                className="mt-auto flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-medium text-[15px] px-7 py-4 rounded-xl transition-all duration-200">
                <Mail size={16} /> Partner With Us
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
export default function AcceleratorPage() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Hero />
        <Stats />
        <Challenge />
        <Approach />
        <Components />
        <Tracks />
        <Integration />
        <Partners />
        <CTA />
      </div>
    </>
  )
}