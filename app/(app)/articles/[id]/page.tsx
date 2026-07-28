"use client"

// app/insights/[id]/page.tsx
// Usage: place this file at app/insights/[id]/page.tsx
// The `articles` array lives in data/articles.ts

import { use, useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/Layout/Navbar"
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowUpRight,
  Share2,
  BookOpen,
  ChevronRight,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react"
import { articles } from "@/data/articles" // adjust path if needed
import { useParams } from "next/navigation"
import { Section } from "@/types/global"

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `

  @keyframes fadeUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.97); }       to { opacity:1; transform:scale(1); } }

  .sr,.sr-l,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp   0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn  0.7s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.12s!important}
  .d3{animation-delay:.19s!important} .d4{animation-delay:.26s!important}

  /* Prose typography */
  .prose-body p {
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    line-height: 1.9;
    color: #3D3D52;
    margin-bottom: 1.6rem;
  }
  .prose-body h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(26px, 3vw, 34px);
    line-height: 1.15;
    color: #1C1C2E;
    margin-top: 2.8rem;
    margin-bottom: 1rem;
  }
  .prose-body h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(20px, 2.5vw, 26px);
    line-height: 1.2;
    color: #1C1C2E;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .prose-body blockquote {
    border-left: 3px solid #B71E52;
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    background: #F5F2ED;
    border-radius: 0 8px 8px 0;
  }
  .prose-body blockquote p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(18px, 2.2vw, 22px);
    color: #1C1C2E;
    line-height: 1.6;
    margin-bottom: 0;
  }
  .prose-body ul {
    margin: 1.2rem 0 1.6rem;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
  }
  .prose-body ul li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 15px;
    color: #3D3D52;
    line-height: 1.75;
  }
  .prose-body ul li::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #B71E52;
    flex-shrink: 0;
    margin-top: 8px;
  }
  .prose-body .callout {
    background: #f5e8ed;
    border: 1px solid #f0ccd9;
    border-radius: 10px;
    padding: 20px 24px;
    margin: 2rem 0;
    font-size: 14px;
    color: #1C1C2E;
    line-height: 1.75;
    font-weight: 500;
  }
  .prose-body hr {
    border: none;
    border-top: 1px solid #E8E4DD;
    margin: 2.5rem 0;
  }

  /* Reading progress bar */
  #read-progress {
    position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
    background: linear-gradient(90deg, #B71E52, #d4356b);
    transition: width 0.05s linear;
    pointer-events: none;
  }

  /* Sticky TOC */
  .toc-link { transition: color 0.2s, padding-left 0.2s; }
  .toc-link.active { color: #B71E52 !important; padding-left: 10px; }
  .toc-link:hover { color: #1C1C2E !important; }

  /* Share copied toast */
  .toast-enter { animation: fadeUp 0.3s ease forwards; }

  /* Related card */
  .rel-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .rel-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
  .rel-card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
  .rel-card:hover .rel-card-img { transform: scale(1.04); }

  /* Back link underline */
  .back-link { position: relative; display: inline-flex; align-items: center; gap: 6px; }
  .back-link::after {
    content: ''; position: absolute; left: 0; bottom: -1px;
    height: 1px; width: 0; background: #B71E52;
    transition: width 0.25s ease;
  }
  .back-link:hover::after { width: 100%; }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-l,.sr-s")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.07 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Reading progress ──────────────────────────────────────────────────── */
function useReadProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const s = document.documentElement
      setP((s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return p
}

/* ─── Prose renderer ────────────────────────────────────────────────────── */
function ProseSection({ section }: { section: Section }) {
  switch (section.kind) {
    case "heading":
      return <h2>{section.text}</h2>
    case "subheading":
      return <h3>{section.text}</h3>
    case "paragraph":
      return <p>{section.text}</p>
    case "quote":
      return (
        <blockquote>
          <p>{section.text}</p>
        </blockquote>
      )
    case "bullets":
      return (
        <ul>{section.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>
      )
    case "callout":
      return <div className="callout">{section.text}</div>
    case "divider":
      return <hr />
    default:
      return null
  }
}

/* ─── Table of Contents ─────────────────────────────────────────────────── */
function TableOfContents({ content }: { content: Section[] }) {
  const headings = content.filter((s) => s.kind === "heading")
  const [active, setActive] = useState(0)

  useEffect(() =>   {
    const headingEls = document.querySelectorAll(".prose-body h2")
    if (!headingEls.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Array.from(headingEls).indexOf(e.target)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { rootMargin: "-10% 0px -80% 0px" },
    )
    headingEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  if (!headings.length) return null

  return (
    <div className="bg-[#F5F2ED] rounded-xl border border-[#E8E4DD] p-6">
      <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase mb-4">
        In This Article
      </div>
      <nav className="flex flex-col gap-2">
        {headings.map((h, i) => (
          <button
            key={i}
            onClick={() => {
              const els = document.querySelectorAll(".prose-body h2")
              els[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
            }}

            className={`toc-link text-left text-[13px] leading-normal transition-all duration-200 py-0.5 ${
              active === i
                ? "active font-semibold"
                : "text-stone-400 font-medium"
            }`}
          >
            {h.text}
          </button>
        ))}
      </nav>
    </div>
  )
}

/* ─── Share buttons ─────────────────────────────────────────────────────── */
function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-1 hidden lg:block">
        Share
      </div>
      {[
        {
          icon: <Twitter size={14} />,
          label: "Twitter",
          href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
        },
        {
          icon: <Linkedin size={14} />,
          label: "LinkedIn",
          href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
        },
      ].map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-[#E8E4DD] bg-white flex items-center justify-center text-stone-400 hover:text-[#B71E52] hover:border-[#B71E52] transition-all duration-200"
        >
          {s.icon}
        </a>
      ))}
      <button
        onClick={copy}
        className="w-9 h-9 rounded-full border border-[#E8E4DD] bg-white flex items-center justify-center text-stone-400 hover:text-[#B71E52] hover:border-[#B71E52] transition-all duration-200 relative"
      >
        {copied ? (
          <span className="text-[9px] text-[#B71E52] font-mono-dm">✓</span>
        ) : (
          <Link2 size={14} />
        )}
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   Next.js App Router: receives { params: { id: string } }
═══════════════════════════════════════════════════════════════════════════ */
export default function ArticlePage() {
  useReveal()
  const progress = useReadProgress()
  const params = useParams()
  const article = articles.find((a) => a.id === params.id)
  const related = articles
    .filter((a) => article?.relatedIds?.includes(a.id))
    .slice(0, 3)

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="font-display font-bold text-[64px] text-[#E8E4DD]">
            404
          </div>
          <div className="font-display italic text-[24px] text-stone-400 mb-6">
            Article not found
          </div>
          <a
            href="/insights"
            className="inline-flex items-center gap-2 bg-[#B71E52] text-white font-semibold text-[14px] px-6 py-3 rounded transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft size={14} /> Back to Insights
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div id="read-progress" style={{ width: `${progress}%` }} />
    <Navbar variant="nontransparent"/>
      <div className="min-h-screen bg-white">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-[#F5F2ED] border-b border-[#E8E4DD] pt-28 pb-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <div className="mb-8">
              <a
                href="/insights"
                className="back-link font-mono-dm text-[11px] text-stone-400 hover:text-[#B71E52] tracking-widest uppercase transition-colors duration-200"
              >
                <ArrowLeft size={13} /> Insights
              </a>
            </div>

            {/* Type + tag */}
            <div className="sr flex items-center gap-3 mb-6">
              <span
                className={`px-2.5 py-1 rounded font-mono-dm text-[9px] tracking-widest uppercase ${article.typeCls}`}
              >
                {article.type}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
              <span className="font-mono-dm text-[10px] text-stone-400 tracking-wide uppercase">
                {article.tag}
              </span>
            </div>

            {/* Title */}
            <h1
              className="sr d1 font-display font-bold text-[#1C1C2E] leading-[1.05] mb-7 max-w-4xl
              text-[clamp(36px,5.5vw,68px)]"
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="sr d2 text-stone-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-2xl mb-10">
              {article.excerpt}
            </p>

            {/* Author + meta row */}
            <div className="sr d3 flex flex-col sm:flex-row sm:items-center gap-5 pb-8 border-b border-[#E8E4DD]">
              <div className="flex items-center gap-3">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E8E4DD]"
                />
                <div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E]">
                    {article.author}
                  </div>
                  <div className="font-mono-dm text-[10px] text-stone-400">
                    {article.authorRole}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:ml-auto">
                <div className="flex items-center gap-1.5 text-stone-400">
                  <Calendar size={12} />
                  <span className="font-mono-dm text-[11px]">
                    {article.date}
                  </span>
                </div>
                <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
                <div className="flex items-center gap-1.5 text-stone-400">
                  <Clock size={12} />
                  <span className="font-mono-dm text-[11px]">
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image — bleeds to full width */}
          <div className="mt-8 overflow-hidden h-[580px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white border-b border-[#E8E4DD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
              {/* ── Article prose ── */}
              <article>
                {/* Lede / first paragraph styled larger */}
                <div className="prose-body" id="article-body">
                  {article.content.map((section: Section, i: number) => (
                    <ProseSection key={i} section={section} />
                  ))}
                </div>

                {/* Bottom meta */}
                <div className="mt-12 pt-8 border-t border-[#E8E4DD] flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#E8E4DD]"
                    />
                    <div>
                      <div className="font-semibold text-[14px] text-[#1C1C2E]">
                        {article.author}
                      </div>
                      <div className="font-mono-dm text-[10px] text-stone-400">
                        {article.authorRole}
                      </div>
                    </div>
                  </div>

                  {/* Share inline on mobile */}
                  <div className="flex items-center gap-3 lg:hidden">
                    <span className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase">
                      Share:
                    </span>
                    {[
                      { icon: <Twitter size={13} />, href: "#" },
                      { icon: <Linkedin size={13} />, href: "#" },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        className="w-8 h-8 rounded-full border border-[#E8E4DD] flex items-center justify-center text-stone-400 hover:text-[#B71E52] hover:border-[#B71E52] transition-all"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              {/* ── Sticky sidebar ── */}
              <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
                {/* TOC */}
                <TableOfContents content={article.content} />

                {/* Share buttons */}
                <div className="bg-white border border-[#E8E4DD] rounded-xl p-6 flex flex-col items-center gap-3">
                  <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.12em] uppercase">
                    Share Article
                  </div>
                  <div className="flex gap-3">
                    <ShareBar title={article.title} />
                  </div>
                </div>

                {/* Newsletter mini */}
                
              </aside>
            </div>
          </div>
        </section>

        {/* ── RELATED ARTICLES ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-[#F5F2ED] py-16 md:py-20 border-b border-[#E8E4DD]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="sr flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-2 block">
                    Keep Reading
                  </span>
                  <h2 className="font-display font-bold text-[clamp(28px,3.5vw,40px)] leading-[1.1] text-[#1C1C2E]">
                    Related <em className="italic text-[#B71E52]">Articles</em>
                  </h2>
                </div>
                <a
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[14px] hover:gap-3 transition-all duration-200"
                >
                  All Insights <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((rel, i) => (
                  <a
                    key={i}
                    href={`/articles/${rel.id}`}
                    className={`sr rel-card d${i + 1} bg-white border border-[#E8E4DD] rounded-xl overflow-hidden block`}
                  >
                    {/* Image */}
                    <div className="h-44 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="rel-card-img w-full h-full object-cover"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2.5 py-1 rounded font-mono-dm text-[9px] tracking-widest uppercase ${rel.typeCls}`}
                        >
                          {rel.type}
                        </span>
                        <span className="font-mono-dm text-[10px] text-stone-400">
                          {rel.date}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-[18px] text-[#1C1C2E] leading-tight mb-2 hover:text-[#B71E52] transition-colors duration-200 line-clamp-3">
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-stone-400 mt-4">
                        <Clock size={11} />
                        <span className="font-mono-dm text-[10px]">
                          {rel.readTime}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BACK TO INSIGHTS CTA ──────────────────────────────────────── */}
       
      </div>
    </>
  )
}
