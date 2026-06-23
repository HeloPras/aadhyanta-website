"use client"

import { useState, useEffect, useRef, FormEvent } from "react"
import { Navbar } from "@/components/Layout/Navbar"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Headphones,
  Mail,
  Play,
  Clock,
  Calendar,
  ChevronRight,
  Search,
  Pause,
  Volume2,
  Rss,
} from "lucide-react"
import { articles } from "@/data/articles"
import { podcasts } from "@/data/podcasts"

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes barPulse  { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  // @keyframes showup {from {opacity:0} to {opacity:1}}

  /* Scroll-reveal */
  // .sr,.sr-l,.sr-r,.sr-s { opacity: 0}
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important} .d6{animation-delay:.45s!important}

  /* Marquee */
  .marquee-track { display:flex; width:max-content; animation: marquee 22s linear infinite; }
  .marquee-track:hover { animation-play-state:paused; }

  /* Card image zoom */
  .card-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .card-img-wrap:hover .card-img { transform:scale(1.05); }

  /* Card lift */
  .lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .lift:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(0,0,0,0.09); }

  /* Filter pill */
  .filter-pill { transition: all 0.2s; }
  .filter-pill.active { background:#1C1C2E !important; color:#fff !important; border-color:#1C1C2E !important; }
  .filter-pill:not(.active):hover { border-color:#1C1C2E !important; color:#1C1C2E !important; }

  /* Podcast waveform bars */
  .wave-bar { transform-origin:bottom; animation: barPulse 1s ease-in-out infinite; }
  .wave-bar:nth-child(2) { animation-delay:.15s; }
  .wave-bar:nth-child(3) { animation-delay:.3s; }
  .wave-bar:nth-child(4) { animation-delay:.45s; }
  .wave-bar:nth-child(5) { animation-delay:.6s; }

  /* Newsletter input focus ring */
  .nl-input:focus { outline:none; border-color:#B71E52 !important; box-shadow:0 0 0 3px rgba(183,30,82,0.12); }

  /* Featured article — editorial horizontal rule reveal */
  .rule-reveal { position:relative; overflow:hidden; }
  .rule-reveal::after {
    content:''; position:absolute; bottom:0; left:0; height:2px;
    width:0; background:#B71E52;
    transition:width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .rule-reveal:hover::after { width:100%; }

  /* Search */
  .search-input:focus { outline:none; border-color:#B71E52 !important; }

  /* Podcast progress bar */
  .pod-progress { appearance:none; -webkit-appearance:none; height:3px; border-radius:2px; background:#E8E4DD; cursor:pointer; }
  .pod-progress::-webkit-slider-thumb { appearance:none; width:12px; height:12px; border-radius:50%; background:#B71E52; cursor:pointer; }

  /* Type badge */
  .type-blog     { background:#EFF6FF; color:#1D4ED8; }
  .type-article  { background:#F0FDF4; color:#15803D; }
  .type-report   { background:#FFF7ED; color:#C2410C; }
  .type-podcast  { background:#FDF4FF; color:#7E22CE; }

  /* Hero asymmetric grid */
  .hero-featured { position:relative; }
  .hero-featured::before {
    content:''; position:absolute; top:0; right:0; bottom:0;
    width:45%; background:#F5F2ED;
    z-index:0;
  }

  /* Section number watermark */
  .section-watermark {
    position:absolute; right:0; top:50%; transform:translateY(-50%);
    font-family:'Cormorant Garamond',serif; font-weight:700;
    font-size:160px; color:rgba(28,28,46,0.025); line-height:1;
    pointer-events:none; user-select:none;
  }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const FILTERS = ["All", "Blog", "Article", "Report"]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — editorial asymmetric split
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const featured = articles.filter((a) => a.featured)

  return (
    <section className="bg-white border-b border-[#E8E4DD] overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">
        {/* Page title row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-[#E8E4DD]">
          <div className="sr">
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Insights
            </span>
            <h1 className="font-display font-bold text-[clamp(52px,7vw,96px)] leading-[0.95] text-[#1C1C2E]">
              Ideas &amp;
              <br />
              <em className="italic text-[#B71E52]">Analysis</em>
            </h1>
          </div>
          <p className="sr-r text-stone-500 text-[15px] leading-[1.85] max-w-sm pb-2">
            Perspectives on private equity, impact investing, and Nepal's
            evolving capital markets — from the practitioners building them.
          </p>
        </div>

        {/* ── Featured article — asymmetric editorial layout ── */}
        {featured.map((a) => {
          return (
            <a
            key={a.title}
            href={`/articles/${a.id}`}>
              <div className=" sr grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 border-b border-[#E8E4DD]">
                {/* Left — image */}
                <div className=" overflow-hidden aspect-video lg:aspect-auto lg:min-h-[420px] max-h-[756px] border-r border-[#E8E4DD]">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="card-img w-full h-full object-cover"
                  />
                </div>

                {/* Right — content */}
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-[#F5F2ED]">
                  {/* Top meta */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className={`px-2.5 py-1 rounded font-mono-dm text-[9px] tracking-widest uppercase ${a.typeCls}`}
                      >
                        {a.type}
                      </span>
                      <span className="font-mono-dm text-[10px] text-stone-400 tracking-wide">
                        Featured
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-[clamp(24px,2.5vw,34px)] leading-[1.15] text-[#1C1C2E] mb-5 rule-reveal pb-5">
                      {a.title}
                    </h2>

                    <p className="text-stone-500 text-[14px] leading-[1.85] mb-8">
                      {a.excerpt}
                    </p>
                  </div>

                  {/* Bottom author + CTA */}
                  <div>
                    <div className="flex items-center gap-3 mb-7 pt-6 border-t border-[#E8E4DD]">
                      <div>
                        <div className="font-semibold text-[13px] text-[#1C1C2E]">
                          {a.author}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="font-mono-dm text-[10px] text-stone-400">
                          {a.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
                        <span className="font-mono-dm text-[10px] text-stone-400">
                          {a.readTime}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/articles/${a.id}`}
                      className="flex items-center justify-center gap-2 bg-[#1C1C2E] hover:bg-[#B71E52] text-white font-semibold text-[14px] px-6 py-3.5 rounded transition-all duration-300"
                    >
                      Read Article <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLES & BLOGS — filterable masonry-style grid
═══════════════════════════════════════════════════════════════════════════ */
function Articles() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = articles.filter((a) => {
    const matchType = filter === "All" || a.type === filter
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <span className="section-watermark hidden lg:block">01</span>

        {/* Header row */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Reading
            </span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-[#1C1C2E]">
              Articles &amp; <em className="italic text-[#B71E52]">Blogs</em>
            </h2>
          </div>

          {/* Search */}
          <div className="relative self-start sm:self-auto">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              className="search-input pl-9 pr-4 py-2.5 text-[13px] border border-[#E8E4DD] rounded-lg bg-[#F5F2ED] text-[#1C1C2E] placeholder:text-stone-400 w-52 transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="sr flex gap-2 flex-wrap mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-pill px-4 py-2 rounded-full border text-[13px] font-medium cursor-pointer transition-all duration-200
                ${filter === f ? "active" : "border-[#E8E4DD] text-stone-500 bg-white"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400 font-display italic text-[22px]">
            No articles found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered
              .filter((a) => !a.featured)
              .map((a, i) => (
                <a
                  key={i}
                  href={`/articles/${a.id}`}
                  className={`sr lift d${Math.min(i + 1, 5)}  group bg-white border border-[#E8E4DD] rounded-xl overflow-hidden block`}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="card-img w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E]/30 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded font-mono-dm text-[9px] tracking-widest uppercase ${a.typeCls}`}
                    >
                      {a.type}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-white/90 font-mono-dm text-[9px] text-stone-500 tracking-wide uppercase">
                      {a.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-[18px] sm:text-[20px] text-[#1C1C2E] leading-tight mb-3 group-hover:text-[#B71E52] transition-colors duration-200">
                      {a.title}
                    </h3>
                    <p className="text-stone-500 text-[13px] leading-[1.75] mb-5 line-clamp-3">
                      {a.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DD]">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-stone-500">
                          {a.author}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
                        <span className="font-mono-dm text-[10px] text-stone-400">
                          {a.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-400">
                        <Clock size={11} />
                        <span className="font-mono-dm text-[10px]">
                          {a.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        )}

        {/* Load more */}
        {/* <div className="sr text-center mt-12">
          <button className="inline-flex items-center gap-2 border border-[#E8E4DD] hover:border-[#1C1C2E] text-stone-500 hover:text-[#1C1C2E] font-medium text-[14px] px-7 py-3 rounded-lg transition-all duration-200">
            Load More Articles <ChevronRight size={15} />
          </button>
        </div> */}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PODCAST — large horizontal cards with waveform player
═══════════════════════════════════════════════════════════════════════════ */
function PodcastPlayer({
  episode,
  playing,
  onToggle,
}: {
  episode: string
  playing: number
  onToggle: () => void
}) {
  const [progress, setProgress] = useState(18)
  return (
    <div className="flex flex-col gap-3">
      {/* Waveform + progress */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-full bg-[#B71E52] flex items-center justify-center text-white shrink-0 hover:bg-[#9e1847] transition-colors duration-200"
        >
          {playing ? (
            <Pause size={14} />
          ) : (
            <Play size={14} className="ml-0.5" />
          )}
        </button>

        {/* Waveform bars (decorative, animated when playing) */}
        {/* <div className={`flex items-end gap-[3px] h-5 ${playing ? '' : 'opacity-40'}`}>
          {[12, 18, 10, 20, 14, 16, 8, 18, 12, 20, 10, 16].map((h, i) => (
            <div key={i} className={`w-[3px] rounded-full bg-[#B71E52] ${playing ? 'wave-bar' : ''}`}
              style={{ height: h, animationDelay: `${i * 0.07}s` }} />
          ))}
        </div> */}

        {/* <input type="range" min={0} max={100} value={progress}
          onChange={e => setProgress(Number(e.target.value))}
          className="pod-progress flex-1" /> */}

        <span className="font-mono-dm text-[10px] text-stone-400 shrink-0">
          {episode}
        </span>
      </div>
    </div>
  )
}

function Podcast() {
  const [playing, setPlaying] = useState(-1)

  return (
    <section className="bg-[#1C1C2E] py-20 md:py-28 border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Listening
            </span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-white">
              The Aadhyanta <em className="italic text-[#B71E52]">Podcast</em>
            </h2>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-[13px] font-medium transition-all duration-200"
            >
              <Rss size={13} /> Subscribe
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.07] border border-white/10 text-white/60 hover:text-white text-[13px] font-medium transition-all duration-200"
            >
              All Episodes <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Episode cards */}

        <div className="space-y-4">
          {podcasts.map((podcast, i) => (
            <div
              key={i}
              className={`sr d${i + 1} group flex flex-col sm:flex-row gap-0 bg-white/4 hover:bg-white/[0.07] border border-white/8 rounded-2xl overflow-hidden transition-all duration-300`}
            >
              {/* Thumbnail */}
              <div className="card-img-wrap shrink-0 w-full sm:w-36 md:w-44 h-40 sm:h-auto overflow-hidden">
                <img
                  src={podcast.image}
                  alt={podcast.guest}
                  className="card-img w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-dm text-[9px] text-[#B71E52] tracking-widest uppercase px-2.5 py-1 bg-[#B71E52]/10 rounded">
                      {podcast.episode}
                    </span>
                    <span className="font-mono-dm text-[10px] text-white/35">
                      {podcast.date}
                    </span>
                    <div className="flex items-center gap-1 text-white/35 ml-auto">
                      <Volume2 size={11} />
                      <span className="font-mono-dm text-[10px]">
                        {podcast.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-[19px] sm:text-[22px] text-white leading-tight mb-2 group-hover:text-[#B71E52] transition-colors duration-200">
                    {podcast.title}
                  </h3>
                  <p className="text-white/45 text-[13px] leading-[1.75] line-clamp-2">
                    {podcast.desc}
                  </p>
                </div>

                {/* Player */}
                <div className="border-t border-white/[0.07] pt-4">
                  <PodcastPlayer
                    episode={podcast.episode}
                    playing={playing}
                    onToggle={() => setPlaying(playing === i ? -1 : i)}
                  />
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
   NEWSLETTER — split layout, distinct from all other CTAs
═══════════════════════════════════════════════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [freq, setFreq] = useState("weekly")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  const issues = [
    {
      label: "Previous Issue",
      title: "The Governance Gap in Nepal's Private Markets",
      date: "Mar 2025",
    },
    {
      label: "Most Read",
      title: "Why Women-Led Businesses Outperform",
      date: "Feb 2025",
    },
    {
      label: "Editor's Pick",
      title: "Patient Capital: The 5-Year Thesis",
      date: "Jan 2025",
    },
  ]

  return (
    <section className="bg-[#F5F2ED] py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <span className="section-watermark hidden lg:block">03</span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#E8E4DD] rounded-2xl overflow-hidden bg-white shadow-sm">
          {/* Left — signup */}
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E4DD]">
            <div className="sr-l">
              <div className="w-10 h-[3px] bg-[#B71E52] rounded-full mb-6" />
              <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
                Newsletter
              </span>
              <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-4">
                The Aadhyanta{" "}
                <em className="italic text-[#B71E52]">Dispatch</em>
              </h2>
              <p className="text-stone-500 text-[15px] leading-[1.85] mb-8">
                Curated insights on Nepal's capital markets, impact investing,
                and private equity — delivered to practitioners who can't afford
                to miss what's happening.
              </p>

              {submitted ? (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-6 text-center">
                  <div className="font-display font-bold text-[22px] text-[#15803D] mb-2">
                    You're in.
                  </div>
                  <p className="text-[14px] text-[#166534]">
                    Your first issue arrives this Friday.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="nl-input w-full px-4 py-3 border border-[#E8E4DD] rounded-lg text-[14px] text-[#1C1C2E] bg-[#F5F2ED] placeholder:text-stone-400 transition-all duration-200"
                    />
                  </div>

                  {/* Frequency toggle */}
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Frequency
                    </label>
                    <div className="flex gap-2">
                      {["weekly", "monthly"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFreq(f)}
                          className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 cursor-pointer
                            ${freq === f ? "bg-[#1C1C2E] text-white border-[#1C1C2E]" : "bg-white border-[#E8E4DD] text-stone-500 hover:border-stone-300"}`}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
                  >
                    <Mail size={15} /> Subscribe to the Dispatch
                  </button>

                  <p className="text-[11px] text-stone-400 text-center">
                    No spam. Unsubscribe any time. Read by 2,400+ professionals.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right — recent issues preview */}
          <div className="p-8 sm:p-12 bg-[#F5F2ED]">
            <div className="sr-r">
              <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-stone-400 mb-6 block">
                Recent Issues
              </span>

              <div className="space-y-0">
                {issues.map((issue, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`flex items-start gap-4 py-6 group cursor-pointer ${i < issues.length - 1 ? "border-b border-[#E8E4DD]" : ""}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-widest uppercase mb-1.5">
                        {issue.label}
                      </div>
                      <h4 className="font-display font-bold text-[17px] text-[#1C1C2E] leading-tight mb-1 group-hover:text-[#B71E52] transition-colors duration-200">
                        {issue.title}
                      </h4>
                      <div className="font-mono-dm text-[10px] text-stone-400">
                        {issue.date}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-stone-300 group-hover:text-[#B71E52] shrink-0 mt-1 transition-colors duration-200"
                    />
                  </a>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-8 pt-6 border-t border-[#E8E4DD]">
                <div className="flex items-center gap-3">
                  {/* Mini avatar stack */}
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40",
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
                    ].map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover border-2 border-[#F5F2ED]"
                      />
                    ))}
                  </div>
                  <p className="text-[12px] text-stone-500 leading-tight">
                    Joined by{" "}
                    <span className="font-semibold text-[#1C1C2E]">2,400+</span>{" "}
                    investors, founders &amp; practitioners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOPICS / TAGS — editorial index style
═══════════════════════════════════════════════════════════════════════════ */
function Topics() {
  const topics = [
    { name: "Private Equity", count: 18 },
    { name: "Gender Finance", count: 9 },
    { name: "Impact Investing", count: 14 },
    { name: "Nepal Markets", count: 22 },
    { name: "Fund Management", count: 11 },
    { name: "Ecosystem Building", count: 7 },
    { name: "Agriculture & Food", count: 6 },
    { name: "ESG & Climate", count: 8 },
    { name: "Governance", count: 10 },
    { name: "Exit Strategy", count: 5 },
  ]
  return (
    <section className="bg-white py-16 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr flex flex-wrap items-center gap-3">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-stone-400 mr-2">
            Browse Topics:
          </span>
          {topics.map((t, i) => (
            <a
              key={i}
              href="#"
              className="group flex items-center gap-2 px-4 py-2 bg-[#F5F2ED] hover:bg-[#1C1C2E] border border-[#E8E4DD] hover:border-[#1C1C2E] rounded-full text-[13px] font-medium text-stone-600 hover:text-white transition-all duration-200"
            >
              {t.name}
              <span className="font-mono-dm text-[10px] text-stone-400 group-hover:text-white/60">
                {t.count}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function InsightsPage() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar variant="nontransparent"></Navbar>
        <Hero />
        <Articles />
        {/* <Podcast /> */}
        {/* <Newsletter /> */}
        {/* <Topics /> */}
      </div>
    </>
  )
}
