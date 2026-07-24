'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { programPages, ProgramPage } from '@/data/program'
import { Navbar } from '@/components/Layout/Navbar'
import { useParams } from 'next/navigation'

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }
  .font-display { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulseDot  { 0%,100%{box-shadow:0 0 0 0 rgba(21,128,61,0.4)} 50%{box-shadow:0 0 0 6px rgba(21,128,61,0)} }
  @keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }

  .live-dot { animation: pulseDot 2.2s ease-in-out infinite; }
  .ticker-track { display:flex; width:max-content; animation: ticker 24s linear infinite; }
  .ticker-track:hover { animation-play-state:paused; }

  .prog-detail-hero {
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .prog-detail-hero-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .alumni-card {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.2s;
  }
  .alumni-card:hover { transform: translateY(-4px); border-color: #B71E52 !important; }

  .deliv-item { transition: border-color 0.2s, background 0.2s; }
  .deliv-item:hover { border-color: #B71E52; background: #fdf8f9; }

  .nav-item-detail { transition: color 0.15s, border-color 0.15s; }
  .nav-item-detail:hover { color: #1C1C2E !important; border-left-color: #E8E4DD !important; }

  /* Mobile drawer */
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 40; opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .drawer-overlay.open { opacity: 1; pointer-events: all; }
  .drawer-panel {
    position: fixed; left: 0; top: 0; bottom: 0; width: min(300px, 85vw);
    background: #fff; z-index: 50; overflow-y: auto;
    transform: translateX(-100%); transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 4px 0 32px rgba(0,0,0,0.12);
  }
  .drawer-panel.open { transform: translateX(0); }

  /* Reveal */
  .reveal-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-section.revealed { opacity: 1; transform: translateY(0); }

  /* Video modal */
  .video-modal-overlay {
    position: fixed; inset: 0; background: rgba(15,15,23,0.85);
    z-index: 100; display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .watch-testimonial-btn { transition: color 0.15s, gap 0.15s; }
  .watch-testimonial-btn:hover { color: #B71E52; gap: 8px; }
`

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */
function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-section')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.06 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/* ─── Scroll Spy ─────────────────────────────────────────────────────────── */
function useScrollSpy(sectionIds: string[], setActive: (id: string) => void) {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25, rootMargin: '-60px 0px -55% 0px' }
    )
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [sectionIds, setActive])
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="mb-6">
      <span className="font-mono-dm text-[10px] tracking-[0.14em] uppercase text-[#B71E52] block mb-2">{label}</span>
      <h2 className="font-display font-bold leading-[1.08] text-[#1C1C2E]" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
        {title}
      </h2>
    </div>
  )
}

/* ─── Alumni Badge ───────────────────────────────────────────────────────── */
function AlumniBadge({ badge }: { badge: string }) {
  const styles: Record<string, string> = {
    'Funded':   'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]',
    'Acquired': 'bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]',
    'IPO Exit': 'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE68A]',
  }
  return (
    <span className={`font-mono-dm text-[8px] tracking-[0.1em] uppercase px-2 py-1 rounded mb-2 inline-block ${styles[badge] ?? styles['Funded']}`}>
      {badge}
    </span>
  )
}

/* ─── Video Modal ────────────────────────────────────────────────────────── */
function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 sm:top-3 sm:right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-[16px] z-10 cursor-pointer"
        >
          ✕
        </button>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&like=0&share=0&watchlater=0&collections=0&autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV SECTIONS
═══════════════════════════════════════════════════════════════════════════ */
const ALL_NAV = [
  { id: 'sec-overview',      label: 'Overview' },
  { id: 'sec-who',           label: "Who it's For" },
  { id: 'sec-components',    label: 'Components' },
  { id: 'sec-journey',       label: 'Journey' },
  { id: 'sec-deliverables',  label: 'Deliverables' },
  { id: 'sec-eval',          label: 'Evaluation' },
  { id: 'sec-tools',         label: 'Tools' },
  { id: 'sec-valuechains',   label: 'Value Chains' },
  { id: 'sec-outcomes',      label: 'Outcomes' },
  { id: 'sec-alumni',        label: 'Alumni' },
  { id: 'sec-success',       label: 'Success Story' },
  { id: 'sec-sustainability', label: 'Sustainability' },
  { id: 'sec-gender',        label: 'Gender Lens' },
  { id: 'sec-partners',      label: 'Partners & Funders' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR INNER (shared by desktop sidebar + mobile drawer)
═══════════════════════════════════════════════════════════════════════════ */
function SidebarInner({
  program,
  programs,
  activeSection,
  onSelect,
  onNavClick,
}: {
  program: ProgramPage
  programs: ProgramPage[]
  activeSection: string
  onSelect: (slug: string) => void
  onNavClick?: () => void
}) {
  const pf = program.partnerAndFunder

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onNavClick?.()
  }

  // Only show nav items that exist in the DOM
  const visibleNav = ALL_NAV.filter(s => !!document.getElementById(s.id))

  return (
    <>
      {/* Programme selector */}
      <div className="p-5 border-b border-[#E8E4DD] pt-20">
        <div className="font-mono-dm text-[9px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-3">Select Programme</div>
        <select
          value={program.slug}
          onChange={e => { onSelect(e.target.value); onNavClick?.() }}
          className="w-full font-sans text-[13px] font-medium text-[#1C1C2E] bg-[#F5F2ED] border border-[#E8E4DD] rounded-md px-3 py-2 cursor-pointer outline-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%231C1C2E' d='M5 6L0 0h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'calc(100% - 10px) center', appearance: 'none' }}
        >
          {programs.map(p => (
            <option className='rounded' key={p.slug} value={p.slug}>{p.programName}</option>
          ))}
        </select>
      </div>

      {/* Jump nav */}
      <div className="p-5 border-b border-[#E8E4DD]">
        <div className="font-mono-dm text-[9px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-3">Jump to</div>
        <nav>
          {visibleNav.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`nav-item-detail w-full text-left font-mono-dm text-[10px] tracking-[0.08em] cursor-pointer uppercase py-2 px-4 border-l-2 block ${
                activeSection === s.id
                  ? 'text-[#B71E52] border-l-[#B71E52]'
                  : 'text-[#9CA3AF] border-l-transparent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Quick meta */}
      <div className="p-5">
        <div className="font-mono-dm text-[9px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-3">Quick Info</div>
        {pf.funder && (
          <div className="mb-3">
            <div className="font-mono-dm text-[9px] uppercase text-[#B71E52] mb-1">Funder</div>
            <div className="text-[12px] text-[#44403C] leading-[1.6]">{pf.funder}</div>
          </div>
        )}
        {pf.term && (
          <div className="mb-3">
            <div className="font-mono-dm text-[9px] uppercase text-[#B71E52] mb-1">Term</div>
            <div className="text-[12px] text-[#44403C]">{pf.term}</div>
          </div>
        )}
        {pf.role && (
          <div>
            <div className="font-mono-dm text-[9px] uppercase text-[#B71E52] mb-1">Role</div>
            <div className="text-[12px] text-[#44403C]">{pf.role}</div>
          </div>
        )}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function ProgramHero({ program }: { program: ProgramPage }) {
  const isActive = program.status === 'Active'
  const hasHeroImage = !!program.heroImage
  return (
    <div
      className={`bg-[#1C1C2E] prog-detail-hero overflow-hidden pt-22${hasHeroImage ? ' prog-detail-hero-img' : ''}`}
      style={hasHeroImage ? {
        backgroundImage: `linear-gradient(rgba(28, 28, 46, 0.73), rgba(28,28,46,0.9)), url(${program.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero text */}
        <div className="px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-8 border-b border-white/[0.07]">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded mb-5 ${isActive ? 'bg-[#F0FDF4] border border-[#BBF7D0]' : 'bg-white/[0.06] border border-white/[0.12]'}`}>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#15803D] live-dot' : 'bg-[#6B7280]'}`} />
            <span className={`font-mono-dm text-[9px] tracking-[0.1em] uppercase ${isActive ? 'text-[#15803D]' : 'text-white/45'}`}>
              {program.status}
            </span>
          </div>

          <div className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3">
            Programme Detail
          </div>

          <h1 className="font-display font-bold text-white leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
            {program.programName}
          </h1>

          <p className="text-white/55 leading-[1.85] max-w-2xl mb-5"
            style={{ fontSize: 'clamp(13px, 1.5vw, 15px)' }}>
            {program.oneLiner}
          </p>

          <p className="font-mono-dm text-[10px] text-white/50 leading-[1.7]">{program.funderTag}</p>
        </div>

        {/* Stats strip */}
        <div
          className="grid divide-x divide-white/[0.07]"
          style={{ gridTemplateColumns: `repeat(${Math.min(program.keyNumbers.length, 4)}, 1fr)` }}
        >
          {program.keyNumbers.slice(0, 4).map((kn, i) => (
            <div key={i} className="px-5 sm:px-8 lg:px-10 py-5 sm:py-6">
              <div className="font-display font-bold text-white leading-none mb-1"
                style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
                {kn.value}
              </div>
              <div className="font-mono-dm text-[9px] tracking-[0.1em] uppercase text-white/50">{kn.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT
═══════════════════════════════════════════════════════════════════════════ */
function ProgramContent({ program, revealKey }: { program: ProgramPage; revealKey: string }) {
  useReveal(revealKey)

  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null)

  const pf = program.partnerAndFunder
  const partnerCells = [
    pf.funder             && { label: 'Funder',             value: pf.funder },
    pf.technicalPartner   && { label: 'Technical Partner',  value: pf.technicalPartner },
    pf.lendingPartner     && { label: 'Lending Partner',    value: pf.lendingPartner },
    pf.taPartner          && { label: 'TA Partner',         value: pf.taPartner },
    pf.exportPartner      && { label: 'Export Partner',     value: pf.exportPartner },
    pf.partners?.length   && { label: 'Ecosystem Partners', value: pf.partners!.join(', ') },
    pf.pilotLocation      && { label: 'Pilot Location',     value: pf.pilotLocation },
    pf.term               && { label: 'Term',               value: pf.term },
    pf.role               && { label: 'Aadhyanta Role',     value: pf.role, accent: true },
  ].filter(Boolean) as { label: string; value: string; accent?: boolean }[]

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-14 sm:space-y-20">

      {/* OVERVIEW */}
      <section id="sec-overview" className="reveal-section scroll-mt-44 ">
        <SectionHeader label="Overview" title={<>About the <em className="italic text-[#B71E52]">Programme</em></>} />
        <div className="space-y-4">
          {program.overview.map((o, i) => (
            <p key={i} className="text-stone-500 text-[14px] leading-[1.9]">{o}</p>
          ))}
        </div>
      </section>

      {/* WHO */}
      {program.whoWasThisFor && (
        <section id="sec-who" className="reveal-section scroll-mt-44">
          <SectionHeader label="Eligibility" title={<>Who was this <em className="italic text-[#B71E52]">for?</em></>} />
          <ul className="space-y-3">
            {program.whoWasThisFor.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-stone-600 leading-[1.75]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0 mt-[7px]" />
                {w}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COMPONENTS */}
      {program.components && (
        <section id="sec-components" className="reveal-section scroll-mt-44">
          <SectionHeader label="Structure" title={<>Programme <em className="italic text-[#B71E52]">Components</em></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.components.map((c, i) => (
              <div key={i} className="bg-white border border-[#E8E4DD] rounded-xl p-5 sm:p-6">
                <h3 className="font-display font-bold text-[18px] text-[#1C1C2E] mb-2">{c.title}</h3>
                <p className="text-[13px] text-stone-500 leading-[1.75] mb-4">{c.description}</p>
                {c.details && (
                  <ul className="space-y-2">
                    {c.details.map((d, j) => (
                      <li key={j} className="text-[12px] text-stone-500 leading-[1.6] pl-4 border-l-2 border-[#E8E4DD]">{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* JOURNEY */}
      <section id="sec-journey" className="reveal-section scroll-mt-44">
        <SectionHeader label="Programme Journey" title={<>The <em className="italic text-[#B71E52]">Pathway</em></>} />
        {/* Mobile: stacked, Desktop: timeline */}
        <div className="block sm:hidden space-y-4">
          {program.journey.map((step, i) => (
            <div key={i} className="group bg-white border border-[#E8E4DD] rounded-lg px-4 py-3 flex gap-3">
              <span className="font-mono-dm text-[10px] text-[#B71E52] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="font-display font-bold text-[16px] text-[#1C1C2E]">{step.title}</div>
                {step.description && <div className="text-[12px] text-stone-500 mt-0.5 leading-[1.6]">{step.description}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block relative pl-8 border-l border-[#E8E4DD]">
          {program.journey.map((step, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-[#B71E52] border-[#B71E52]' : 'bg-white border-[#E8E4DD]'}`} />
              <div className="font-mono-dm text-[9px] tracking-[0.1em] uppercase text-[#9CA3AF] mb-1">Step {String(i + 1).padStart(2, '0')}</div>
              <div className="font-display font-bold text-[17px] text-[#1C1C2E] mb-1">{step.title}</div>
              {step.description && <div className="text-[13px] text-stone-500 leading-[1.7]">{step.description}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* DIAL JOURNEY VIDEO — only shown for the DIAL programme */}
      {program.slug === 'digital-innovation-in-agriculture-and-logistics' && (
        <section className="reveal-section scroll-mt-44">
          <SectionHeader label="Our Journey" title={<>The <em className="italic text-[#B71E52]">DIAL</em> Story</>} />
          <p className="text-stone-500 text-[14px] leading-[1.9] mb-6">
            Witness how the DIAL programme is transforming agricultural innovation and rural livelihoods across Nepal.
          </p>

          {/* Vimeo embed */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#E8E4DD] shadow-xl aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1211933504?title=0&byline=0&portrait=0&like=0&share=0&watchlater=0&collections=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="DIAL Journey Video"
            />
          </div>
        </section>
      )}

      {/* YOUTUBE JOURNEY VIDEO — shown for programmes with a youtubeVideoId */}
      {program.youtubeVideoId && (
        <section className="reveal-section scroll-mt-44">
          <SectionHeader label="Our Journey" title={<>The <em className="italic text-[#B71E52]">Programme</em> Story</>} />
          <p className="text-stone-500 text-[14px] leading-[1.9] mb-6">
            Watch how this programme is driving lasting impact across enterprises and communities.
          </p>

          {/* YouTube embed */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#E8E4DD] shadow-xl aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${program.youtubeVideoId}?rel=0&modestbranding=1&color=white`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Programme Journey Video"
            />
          </div>
        </section>
      )}

      {/* DELIVERABLES */}
      <section id="sec-deliverables" className="reveal-section scroll-mt-44">
        <SectionHeader label="What Participants Get" title={<>Programme <em className="italic text-[#B71E52]">Deliverables</em></>} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {program.programDeliverables.map((d, i) => (
            <li key={i} className="deliv-item flex items-start gap-3 bg-white border border-[#E8E4DD] rounded-lg px-4 py-3 text-[13px] text-stone-600 leading-[1.65]">
              <span className="text-[#B71E52] flex-shrink-0 mt-0.5 text-[11px]">✦</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* EVALUATION CRITERIA */}
      {program.evaluationCriteria && (
        <section id="sec-eval" className="reveal-section scroll-mt-44">
          <SectionHeader label="Selection" title={<>Evaluation <em className="italic text-[#B71E52]">Criteria</em></>} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {program.evaluationCriteria.map((e, i) => (
              <div key={i} className="bg-white border border-[#E8E4DD] rounded-lg p-4 text-center">
                <div className="font-display font-bold text-[22px] text-[#B71E52] leading-none mb-2">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-mono-dm text-[9px] tracking-[0.08em] uppercase text-[#9CA3AF]">{e}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TOOLS */}
      {(program.toolsUsed ?? program.toolsAndPlatforms) && (
        <section id="sec-tools" className="reveal-section scroll-mt-44">
          <SectionHeader label="Methodology" title={<>Tools &amp; <em className="italic text-[#B71E52]">Platforms</em></>} />
          <div className="flex flex-wrap gap-2">
            {(program.toolsUsed ?? program.toolsAndPlatforms)!.map((t, i) => (
              <span key={i} className="font-mono-dm text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 bg-[rgba(28,28,46,0.05)] border border-[rgba(28,28,46,0.08)] rounded text-[#3D3D52]">{t}</span>
            ))}
          </div>
        </section>
      )}

      {/* VALUE CHAINS */}
      {program.valueChains && (
        <section id="sec-valuechains" className="reveal-section scroll-mt-44">
          <SectionHeader label="Sectors" title={<>Value <em className="italic text-[#B71E52]">Chains</em></>} />
          <div className="flex flex-wrap gap-2">
            {program.valueChains.map((vc, i) => (
              <span key={i} className="font-mono-dm text-[10px] px-3 py-1.5 bg-white border border-[#E8E4DD] rounded text-[#44403C]">{vc}</span>
            ))}
          </div>
        </section>
      )}

      {/* OUTCOMES */}
      {program.outcomes && (
        <section id="sec-outcomes" className="reveal-section scroll-mt-44">
          <SectionHeader label="Results" title={<>Key <em className="italic text-[#B71E52]">Outcomes</em></>} />
          <ul className="space-y-3">
            {program.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-stone-600 leading-[1.75]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0 mt-[7px]" />
                {o}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ALUMNI */}
      {program.alumniOutcomes && (
        <section id="sec-alumni" className="reveal-section scroll-mt-44">
          <SectionHeader label="Cohort Spotlight" title={<>Alumni <em className="italic text-[#B71E52]">Outcomes</em></>} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {program.alumniOutcomes.map((a, i) => (
              <div key={i} className="alumni-card bg-white border border-[#E8E4DD] rounded-xl p-5">
                {a.badge && <AlumniBadge badge={a.badge} />}
                <h3 className="font-display font-bold text-[18px] text-[#1C1C2E] mb-2">{a.company}</h3>
                <p className="text-[12px] text-stone-500 leading-[1.75]">{a.outcome}</p>
                {a.videoId && (
                  <button
                    onClick={() => setActiveVideo({ videoId: a.videoId!, title: `${a.company} Testimonial` })}
                    className="watch-testimonial-btn cursor-pointer flex items-center gap-1.5 mt-4 font-mono-dm text-[9px] tracking-[0.1em] uppercase text-[#9CA3AF]"
                  >
                    <span className="text-[10px]">▶</span> Watch Testimonial
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.videoId}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* SUCCESS STORY */}
      {program.successStory && (
        <section id="sec-success" className="reveal-section scroll-mt-44">
          <div className="bg-[#1C1C2E] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-[#B71E52]/10 pointer-events-none" />
            <div className="font-mono-dm text-[9px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 relative">⭑ Success Story</div>
            <h3 className="font-display font-bold text-[22px] text-white mb-3 relative">{program.successStory.title}</h3>
            <p className="text-white/50 text-[13px] leading-[1.8] relative">{program.successStory.description}</p>
            {program.successStory.link && (
              <a href={program.successStory.link} className="inline-flex items-center gap-2 mt-5 font-mono-dm text-[10px] tracking-[0.1em] uppercase text-[#B71E52] hover:text-white transition-colors relative">
                Read More →
              </a>
            )}
          </div>
        </section>
      )}

      {/* SUSTAINABILITY */}
      {program.sustainabilityNote && (
        <section id="sec-sustainability" className="reveal-section scroll-mt-44">
          <SectionHeader label="Sustainability" title={<>Lasting <em className="italic text-[#B71E52]">Impact</em></>} />
          <div className="border-l-[3px] border-[#B71E52] pl-5 py-3 bg-white rounded-r-lg">
            <div className="font-mono-dm text-[9px] uppercase tracking-[0.1em] text-[#B71E52] mb-2">Note</div>
            <p className="text-[13px] text-stone-500 leading-[1.8]">{program.sustainabilityNote}</p>
          </div>
        </section>
      )}

      {/* GENDER */}
      {program.genderLensNote && (
        <section id="sec-gender" className="reveal-section scroll-mt-44">
          <SectionHeader label="Gender Lens" title={<>GEDSI <em className="italic text-[#B71E52]">Integration</em></>} />
          <div className="border-l-[3px] border-[#B71E52] pl-5 py-3 bg-white rounded-r-lg">
            <div className="font-mono-dm text-[9px] uppercase tracking-[0.1em] text-[#B71E52] mb-2">Gender Note</div>
            <p className="text-[13px] text-stone-500 leading-[1.8]">{program.genderLensNote}</p>
          </div>
        </section>
      )}

      {/* PARTNERS */}
      <section id="sec-partners" className=" reveal-section scroll-mt-44">
        <SectionHeader label="Collaboration" title={<>Partners &amp; <em className="italic text-[#B71E52]">Funders</em></>} />
        <div className="bg-[#1C1C2E] rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {partnerCells.map((cell, i) => (
            <div key={i}>
              <div className="font-mono-dm text-[9px] tracking-[0.1em] uppercase text-white/50 mb-1.5">{cell.label}</div>
              <div className={`text-[13px] leading-[1.6] ${cell.accent ? 'text-[#B71E52]' : 'text-white'}`}>{cell.value}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function ProgramDetailPage() {

  const param = useParams<{slug:string}>()
  const slug:string =param.slug || "code-for-impact"
  const [activeSlug, setActiveSlug] = useState<string>(slug|| programPages[0].slug)
  const [activeSection, setActiveSection] = useState('sec-overview')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const program = programPages.find(p => p.slug === activeSlug) ?? programPages[0]
  const sectionIds = ALL_NAV.map(s => s.id)
  useScrollSpy(sectionIds, setActiveSection)


  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-[#F5F2ED]">
    <Navbar variant='transparent'/>
        {/* Desktop layout: sidebar + main */}
        <div className="lg:flex lg:min-h-screen ">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto bg-white border-r border-[#E8E4DD]">
            <SidebarInner
              program={program}
              programs={programPages}
              activeSection={activeSection}
              onSelect={handleSelect}
            />
          </aside>

          {/* Main content — max-w-7xl on the inner, full bleed hero */}
          <div className="flex-1 min-w-0">
            <ProgramHero program={program} />
            <ProgramContent program={program} revealKey={activeSlug} />
          </div>
        </div>
      </div>
    </>
  )
}