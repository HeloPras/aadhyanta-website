'use client'

/**
 * IPOPipeline — "Path to Public Markets" section
 *
 * Drop into LandingPage.tsx anywhere after the Hero, e.g.:
 *   <Hero />
 *   <Stats />
 *   <IPOPipeline />
 *   <About />
 *
 * Data: edit the `ipoCompanies` array below, or pass via props.
 */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, TrendingUp, Calendar, MapPin,
  CheckCircle2, Circle, Clock, FileCheck, Megaphone
} from 'lucide-react'

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const IPO_CSS = `
  .ipo-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.2s;
  }
  .ipo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.08);
    border-color: #1C1C2E !important;
  }
  .ipo-card:hover .ipo-img { transform: scale(1.05); }
  .ipo-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

  @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 rgba(183,30,82,0.4)} 50%{box-shadow:0 0 0 6px rgba(183,30,82,0)} }
  .pulse-dot { animation: pulseDot 2.2s ease-in-out infinite; }

  @keyframes shimmerBar {
    0%   { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }
  .shimmer-bar {
    background-image: linear-gradient(90deg, #B71E52 0%, #d4356b 50%, #B71E52 100%);
    background-size: 200px 100%;
    animation: shimmerBar 2.5s linear infinite;
  }

  .stage-track { position: relative; }
  .stage-track::before {
    content: '';
    position: absolute;
    top: 11px; left: 11px; right: 11px;
    height: 2px;
    background: #E8E4DD;
    z-index: 0;
  }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ipo-sr')
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('ipo-on'); io.unobserve(e.target) }
    }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
// Stages, in order. Each company has a `stage` index (0-3) indicating progress.
const STAGES = ['Audit Complete', 'SEBON Filing', 'Roadshow', 'NEPSE Listing'] as const

const ipoCompanies = [
  {
    id: 'himalayan-brew',
    name: 'Himalayan Brew Co.',
    sector: 'FMCG / Beverages',
    fund: 'NOF I',
    province: 'Bagmati',
    stage: 3,                       // index into STAGES — 3 = listed
    targetQuarter: 'Listed Q1 2025',
    revenue: 'NPR 2.4B',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    blurb: 'Nepal\'s first PE-backed NEPSE main board listing — completed ahead of schedule.',
  },
  {
    id: 'mountain-agro',
    name: 'Mountain Agro Processors',
    sector: 'Agro-Processing',
    fund: 'NOF I',
    province: 'Koshi',
    stage: 2,
    targetQuarter: 'Target: Q3 2025',
    revenue: 'NPR 890M',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    blurb: 'Roadshow underway with anchor investor commitments already secured.',
  },
  {
    id: 'koshi-dairy',
    name: 'Koshi Valley Dairy',
    sector: 'Dairy & Food',
    fund: 'NOF II',
    province: 'Koshi',
    stage: 1,
    targetQuarter: 'Target: Q1 2026',
    revenue: 'NPR 540M',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80',
    blurb: 'SEBON prospectus filed; merchant banker mandate confirmed.',
  },
  {
    id: 'clean-move',
    name: 'CleanMove Nepal',
    sector: 'Clean Transport',
    fund: 'NOF II',
    province: 'Bagmati',
    stage: 0,
    targetQuarter: 'Target: Q3 2026',
    revenue: 'NPR 310M',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    blurb: 'Statutory audit complete; preparing governance documentation for filing.',
  },
]

/* ─── Stage tracker ──────────────────────────────────────────────────────── */
function StageTrack({ stage }: { stage: number }) {
  return (
    <div className="stage-track flex items-center justify-between mb-3" style={{ position: 'relative' }}>
      {/* Filled progress line */}
      <div
        className="absolute top-[11px] left-[11px] h-[2px] z-0"
        style={{
          width: `calc(${(stage / (STAGES.length - 1)) * 100}% - 22px)`,
          background: stage === STAGES.length - 1 ? '#15803D' : '#B71E52',
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {STAGES.map((s, i) => {
        const done = i < stage
        const current = i === stage
        const isFinal = i === STAGES.length - 1 && current
        return (
          <div key={s} className="relative z-10 flex flex-col items-center" style={{ flex: i === 0 || i === STAGES.length - 1 ? '0 0 auto' : '1' }}>
            <div
              className={isFinal ? 'pulse-dot' : ''}
              style={{
                width: 22, height: 22, borderRadius: '50%',
                background: done || isFinal ? (isFinal ? '#15803D' : '#B71E52') : current ? '#fff' : '#fff',
                border: `2px solid ${done || isFinal ? (isFinal ? '#15803D' : '#B71E52') : current ? '#B71E52' : '#E8E4DD'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              {done || isFinal
                ? <CheckCircle2 size={12} color="#fff" />
                : current
                  ? <Circle size={8} fill="#B71E52" color="#B71E52" />
                  : <Circle size={6} fill="#E8E4DD" color="#E8E4DD" />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Single IPO card ─────────────────────────────────────────────────────── */
function IPOCard({ co, delay = 0 }: { co: typeof ipoCompanies[number]; delay?: number }) {
  const isListed = co.stage === STAGES.length - 1
  const stageLabel = STAGES[co.stage]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className="ipo-card bg-white border border-[#E8E4DD] rounded-xl overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <img src={co.image} alt={co.name} className="ipo-img w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,46,0.6) 0%, transparent 55%)' }} />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', background: '#B71E52', color: '#fff', borderRadius: 3 }}>
            {co.fund}
          </span>
        </div>

        {isListed && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5" style={{ padding: '3px 9px', background: '#15803D', borderRadius: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>Listed</span>
          </div>
        )}

        {/* Name */}
        <div className="absolute bottom-3 left-3 right-3">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 19, color: '#fff', lineHeight: 1.2 }}>
            {co.name}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9CA3AF' }}>
            <MapPin size={10} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{co.province}</span>
          </div>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E8E4DD' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9CA3AF' }}>{co.sector}</span>
        </div>

        {/* Stage tracker */}
        {/* <StageTrack stage={co.stage} /> */}

        {/* Stage label row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.04em' }}>
            {STAGES[0]}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.04em' }}>
            {STAGES[STAGES.length - 1]}
          </span>
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 14 }}>
          {co.blurb}
        </p>

        {/* Bottom stat row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #F5F2ED' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Revenue</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 16, color: '#1C1C2E', marginTop: 2 }}>{co.revenue}</div>
          </div>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 4,
              background: isListed ? '#F0FDF4' : '#fff7ed',
              border: `1px solid ${isListed ? '#BBF7D0' : '#FED7AA'}`,
            }}
          >
            <Clock size={10} style={{ color: isListed ? '#15803D' : '#C2410C' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 600, color: isListed ? '#15803D' : '#C2410C', letterSpacing: '0.04em' }}>
              {co.targetQuarter}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════════════════════ */
export default function IPOPipeline({ companies = ipoCompanies }: { companies?: typeof ipoCompanies }) {
  useReveal()

  const listedCount = companies.filter(c => c.stage === STAGES.length - 1).length
  const inProgress  = companies.length - listedCount

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: IPO_CSS }} />

      <section className="bg-[#F5F2ED] py-20 md:py-28 lg:py-32 border-t border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="ipo-sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12" style={{ opacity: 0 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B71E52' }}>
                  Path to Public Markets
                </span>
                <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#B71E52' }} />
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1.08, color: '#1C1C2E',
              }}>
                Portfolio companies <em style={{ fontStyle: 'italic', color: '#B71E52' }}>heading to NEPSE</em>
              </h2>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: '#6B7280', lineHeight: 1.85, maxWidth: 520, marginTop: 14 }}>
                Strong governance and disciplined growth don't just build better businesses — they build companies ready for the public markets. Here's where our portfolio stands today.
              </p>
            </div>

            {/* Pipeline summary stat */}
            <div style={{ background: '#fff', border: '1px solid #E8E4DD', borderRadius: 14, padding: '18px 26px', flexShrink: 0, display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 32, color: '#15803D', lineHeight: 1 }}>{listedCount}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>Listed</div>
              </div>
              <div style={{ width: 1, background: '#E8E4DD' }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 32, color: '#B71E52', lineHeight: 1 }}>{inProgress}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>In Pipeline</div>
              </div>
            </div>
          </div>

          {/* ── Stage legend ── */}
          <div className="ipo-sr flex flex-wrap items-center gap-x-6 gap-y-2 mb-10" style={{ opacity: 0 }}>
            {STAGES.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: i === STAGES.length - 1 ? '#F0FDF4' : '#f5e8ed',
                  border: `1px solid ${i === STAGES.length - 1 ? '#BBF7D0' : '#f0ccd9'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 600,
                  color: i === STAGES.length - 1 ? '#15803D' : '#B71E52',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{s}</span>
                {i < STAGES.length - 1 && <span style={{ color: '#D6D0C7', marginLeft: 4 }}>→</span>}
              </div>
            ))}
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companies.map((co, i) => (
              <IPOCard key={co.id} co={co} delay={i * 0.08} />
            ))}
          </div>

          {/* ── CTA ── */}

        </div>
      </section>

      <style>{`
        .ipo-sr { opacity: 0; }
        .ipo-sr.ipo-on { animation: ipoFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes ipoFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </>
  )
}