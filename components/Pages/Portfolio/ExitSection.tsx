'use client'

/**
 * ExitsSection — drop this anywhere in PortfolioPage.tsx
 *
 * Usage in ROOT:
 *   import ExitsSection from '@/components/Pages/Portfolio/ExitsSection'
 *   ...
 *   <Hero />
 *   <PortfolioGrid />
 *   <ExitsSection />          ← add here
 *   <ProvinceBreakdown />
 *
 * OR copy-paste the ExitsSection function directly into PortfolioPage.tsx
 * and add <ExitsSection /> to the ROOT render.
 *
 * Data: edit the `exits` array below, or import from @/data/company
 * and filter by status === 'Exited'.
 */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, TrendingUp, Calendar, MapPin,
  CheckCircle, Award, ExternalLink
} from 'lucide-react'

/* ─── CSS additions (append to existing GLOBAL_CSS or inject here) ─────── */
const EXITS_CSS = `
  /* Exit card */
  .exit-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.2s;
  }
  .exit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.08);
    border-color: #1C1C2E !important;
  }
  .exit-card:hover .exit-img  { transform: scale(1.05); }
  .exit-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

  /* Timeline dot pulse */
  @keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(183,30,82,0.4)} 50%{box-shadow:0 0 0 6px rgba(183,30,82,0)} }
  .dot-pulse { animation: dotPulse 2.5s ease-in-out infinite; }

  /* Metric chip */
  .metric-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 10px;
    background: rgba(28,28,46,0.06);
    border: 1px solid rgba(28,28,46,0.1);
    border-radius: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #1C1C2E;
    letter-spacing: 0.04em;
  }

  /* Return badge */
  .return-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px;
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    border-radius: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #15803D;
    letter-spacing: 0.06em;
  }
`

/* ─── Exit data ──────────────────────────────────────────────────────────── */
// Replace with your actual exited companies or filter from companies array
const exits = [
  {
    id: 'himalayan-brew-exit',
    name: 'Himalayan Brew Co.',
    sector: 'FMCG / Beverages',
    fund: 'NOF I',
    province: 'Bagmati',
    investedYear: '2021',
    exitYear: '2024',
    exitType: 'NEPSE IPO',
    returnMultiple: '3.8x MOIC',
    holdPeriod: '3 years',
    description:
      `Nepal's first PE-backed NEPSE IPO exit. Himalayan Brew scaled from a regional manufacturer to a nationally distributed premium beverage brand — demonstrating that Nepal's public markets can deliver institutional-grade exits.`,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    impacts: ['400+ direct jobs at exit', 'NPR 2.4B revenue run-rate', 'Listed on NEPSE Main Board'],
    featured: true,
  },
  {
    id: 'pokhara-heritage-exit',
    name: 'Pokhara Heritage Resorts',
    sector: 'Hospitality',
    fund: 'NOF I',
    province: 'Gandaki',
    investedYear: '2021',
    exitYear: '2024',
    exitType: 'Strategic Sale',
    returnMultiple: '2.6x MOIC',
    holdPeriod: '3 years',
    description:
      'Strategic sale to a regional hospitality group with international brand ambitions. Governance strengthening and brand positioning work during the hold period unlocked a material valuation premium at exit.',
    image: '/aadhyanta/Portfolio/pokhara-heritage-resort-cropped.jpg',
    impacts: ['300+ quality jobs', 'International brand tie-up completed', '4-star rating achieved'],
    featured: false,
  },
  {
    id: 'agri-processing-exit',
    name: 'Mountain Agro Processors',
    sector: 'Agro-Processing',
    fund: 'NOF I',
    province: 'Koshi',
    investedYear: '2022',
    exitYear: '2024',
    exitType: 'Secondary Sale',
    returnMultiple: '2.2x MOIC',
    holdPeriod: '2 years',
    description:
      'Secondary sale to a development finance institution seeking a portfolio of established agri-businesses. Accelerated exit driven by strong operational performance and buyer appetite for Nepal agriculture exposure.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    impacts: ['Smallholder farmer network scaled', 'Export market entry achieved', 'Governance audit-ready'],
    featured: false,
  },
]

/* ─── Animated counter ───────────────────────────────────────────────────── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - t0) / 1400, 1)
        setV(Math.round((1 - Math.pow(1 - t, 3)) * end))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [end])
  return <span ref={ref}>{v}{suffix}</span>
}

/* ─── Stagger reveal ─────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ex-sr')
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('ex-on'); io.unobserve(e.target) }
    }), { threshold: 0.08 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Featured exit card ─────────────────────────────────────────────────── */
function FeaturedExit({ co }: { co: typeof exits[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 bg-white border border-[#E8E4DD] rounded-2xl overflow-hidden shadow-sm mb-5"
    >
      {/* Left — image */}
      <div className="relative overflow-hidden min-h-[280px] lg:min-h-0">
        <img
          src={co.image}
          alt={co.name}
          className="exit-img w-full h-full object-cover absolute inset-0"
        />
        {/* Gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(28,28,46,0.75) 0%, rgba(28,28,46,0.3) 60%, transparent 100%)' }} />

        {/* Overlay content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-7 sm:p-8 min-h-[280px]">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', background: '#B71E52', color: '#fff', borderRadius: 3 }}>
              {co.fund}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 3, backdropFilter: 'blur(8px)' }}>
              {co.exitType}
            </span>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 'clamp(26px,3vw,36px)', color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
              {co.name}
            </h3>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={10} style={{ color: '#B71E52' }} />
              {co.province} Province
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
              {co.sector}
            </div>
          </div>
        </div>
      </div>

      {/* Right — details */}
      <div className="p-7 sm:p-8 flex flex-col justify-between gap-6">
        {/* Return highlight */}
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={16} style={{ color: '#15803D' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 28, color: '#15803D', lineHeight: 1 }}>
              {co.returnMultiple}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#166534', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
              Return on Investment
            </div>
          </div>
        </div>

        {/* Timeline chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Invested', val: co.investedYear },
            { label: 'Exited', val: co.exitYear },
            { label: 'Hold Period', val: co.holdPeriod },
            { label: 'Exit Type', val: co.exitType },
          ].map((m, i) => (
            <div key={i} className="metric-chip">
              <span style={{ color: '#B71E52' }}>{m.label}</span>
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>·</span>
              {m.val}
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: '#6B7280', lineHeight: 1.8 }}>
          {co.description}
        </p>

        {/* Impact list */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#B71E52', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            At Exit
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {co.impacts.map((imp, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <CheckCircle size={9} style={{ color: '#15803D' }} />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#374151', lineHeight: 1.65 }}>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Compact exit card ──────────────────────────────────────────────────── */
function ExitCard({ co, delay = 0 }: { co: typeof exits[number]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="exit-card bg-white border border-[#E8E4DD] rounded-xl overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img src={co.image} alt={co.name} className="exit-img w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,28,46,0.65) 0%, transparent 60%)' }} />

        {/* Fund + exit type badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', background: '#B71E52', color: '#fff', borderRadius: 3 }}>
            {co.fund}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 3, backdropFilter: 'blur(6px)' }}>
            {co.exitType}
          </span>
        </div>

        {/* Return badge on image */}
        <div className="absolute bottom-3 right-3 return-badge">
          <TrendingUp size={10} /> {co.returnMultiple}
        </div>

        {/* Name on image */}
        <div className="absolute bottom-3 left-3">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18, color: '#fff', lineHeight: 1.2 }}>
            {co.name}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 22px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9CA3AF' }}>
            <MapPin size={10} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{co.province}</span>
          </div>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E8E4DD', display: 'inline-block' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9CA3AF' }}>
            <Calendar size={10} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{co.investedYear}–{co.exitYear}</span>
          </div>
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#6B7280', lineHeight: 1.75, marginBottom: 14 }}>
          {co.description.slice(0, 120)}…
        </p>

        {/* Hold period chip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <div className="metric-chip">Hold · {co.holdPeriod}</div>
          <div className="metric-chip" style={{ color: '#15803D', background: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <TrendingUp size={9} /> {co.returnMultiple}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXITS SECTION — main export
═══════════════════════════════════════════════════════════════════════════ */
export default function ExitsSection() {
  useReveal()

  const featuredExit = exits.find(e => e.featured)
  const restExits    = exits.filter(e => !e.featured)

  const aggregateReturn = 3.1  // average MOIC across all exits
  const totalExits = exits.length
  const avgHold = '2.7 yrs'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EXITS_CSS }} />

      <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
          <div className="ex-sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
            style={{ opacity: 0 }}>

            <div>
              {/* Label with exit dot */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#15803D' }}>
                  Exits & Realizations
                </span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#15803D' }} className="dot-pulse" />
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 'clamp(34px, 4vw, 52px)',
                lineHeight: 1.08,
                color: '#1C1C2E',
              }}>
                Value created,{' '}
                <em style={{ fontStyle: 'italic', color: '#15803D' }}>capital returned</em>
              </h2>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: '#6B7280', lineHeight: 1.85, maxWidth: 480, marginTop: 14 }}>
                Our exits demonstrate that Nepal's private markets can deliver institutional-quality returns — through NEPSE listings, strategic sales, and secondary transactions.
              </p>
            </div>

            {/* Aggregate return stat */}
            <div style={{
              background: '#fff',
              border: '1px solid #E8E4DD',
              borderRadius: 14,
              padding: '20px 28px',
              flexShrink: 0,
              minWidth: 200,
              alignSelf: 'flex-start',
            }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Avg. Return Across Exits
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 40, color: '#15803D', lineHeight: 1 }}>
                <CountUp end={Math.round(aggregateReturn * 10)} suffix="x" />
                <span style={{ fontSize: 18, color: '#9CA3AF', marginLeft: 2, fontFamily: "'DM Mono', monospace", fontWeight: 400 }}>MOIC</span>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Exits</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: '#1C1C2E' }}>{totalExits}</div>
                </div>
                <div style={{ width: 1, background: '#E8E4DD' }} />
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Avg Hold</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: '#1C1C2E' }}>{avgHold}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Exit type legend ── */}
          <div className="ex-sr flex flex-wrap gap-4 mb-10" style={{ opacity: 0 }}>
            {[
              { color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE', label: 'NEPSE IPO' },
              { color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', label: 'Strategic Sale' },
              { color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', label: 'Secondary Sale' },
              { color: '#7E22CE', bg: '#FDF4FF', border: '#E9D5FF', label: 'Buyback' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: t.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.label}</span>
              </div>
            ))}
          </div>

          {/* ── Featured exit ── */}
          {featuredExit && <FeaturedExit co={featuredExit} />}

          {/* ── Compact cards ── */}
          {restExits.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {restExits.map((co, i) => (
                <ExitCard key={co.id} co={co} delay={i * 0.1} />
              ))}
            </div>
          )}

          {/* ── Bottom note ── */}
          <div className="ex-sr mt-10 flex items-start gap-3 px-5 py-4 bg-white border border-[#E8E4DD] rounded-xl" style={{ opacity: 0 }}>
            <Award size={14} className="text-[#B71E52] flex-shrink-0 mt-0.5" />
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9CA3AF', lineHeight: 1.75, letterSpacing: '0.02em' }}>
              Return multiples are calculated on a Money-on-Invested-Capital (MOIC) basis, net of fees. Past performance is not indicative of future results. Full performance data available to qualified investors on request.
            </p>
          </div>

        </div>
      </section>

      {/* Inline CSS for .ex-sr reveal (uses a separate class to avoid conflicts) */}
      <style>{`
        .ex-sr { opacity:0; }
        .ex-sr.ex-on { animation: fadeUpEx 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes fadeUpEx { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </>
  )
}