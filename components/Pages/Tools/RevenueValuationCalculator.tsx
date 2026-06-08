'use client'

import { useState } from 'react'
import { TrendingUp, BarChart3, Zap, ArrowRight, Info } from 'lucide-react'

/* ─── Global CSS — same token system ────────────────────────────────────── */
const GLOBAL_CSS = `


  /* Inputs */
  .vc-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #E8E4DD;
    border-radius: 8px;
    background: #fff;
    color: #1C1C2E;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    appearance: none;
    -webkit-appearance: none;
  }

  .vc-input::placeholder { color: #9CA3AF; }
  .vc-input:focus {
    border-color: #B71E52;
    box-shadow: 0 0 0 3px rgba(183,30,82,0.09);
  }

  /* Select arrow */
  .vc-select-wrap { position: relative; }
  .vc-select-wrap::after {
    content: '';
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #9CA3AF;
    pointer-events: none;
  }

  /* Range slider */
  .vc-range {
    -webkit-appearance: none;
    width: 100%; height: 4px;
    border-radius: 2px; cursor: pointer;
    outline: none;
    background: linear-gradient(to right, #B71E52 var(--val, 0%), #E8E4DD var(--val, 0%));
  }
  .vc-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px; border-radius: 50%;
    background: #B71E52;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(183,30,82,0.3);
    cursor: pointer;
    transition: transform 0.15s;
  }
  .vc-range::-webkit-slider-thumb:hover { transform: scale(1.2); }

  /* Animated number */
  @keyframes numIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .num-in { animation: numIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Bar fill */
  @keyframes barFill { from { width:0; } to { width: var(--w); } }
  .bar-fill { animation: barFill 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Status badge */
  .status-premium  { background:#f5e8ed; color:#B71E52; border-color:#f0ccd9; }
  .status-strong   { background:#F0FDF4; color:#15803D; border-color:#BBF7D0; }
  .status-moderate { background:#FFF7ED; color:#C2410C; border-color:#FED7AA; }
`

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmt = (n: number) =>
  n === 0 ? '—' : 'NPR ' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })

const industries = [
  {
    label: "Traditional Business",
    multiple: 2.5,
    hint: "Stable SMEs, manufacturing, services",
  },
  {
    label: "E-Commerce Brand",
    multiple: 3,
    hint: "D2C, marketplace, retail tech",
  },
  {
    label: "SaaS / Tech Platform",
    multiple: 5,
    hint: "Recurring revenue software",
  },
  {
    label: "High-Growth Agri-Tech",
    multiple:  6,
    hint: "Digital agri solutions, food tech",
  },
  {
    label: "High-Growth Fintech / AI",
    multiple: 6,
    hint: "DFS, embedded finance, AI platforms",
  },
  {
    label: "EdTech / Online Learning",
    multiple: 4,
    hint: "LMS, AI tutoring, creator economy, subscription platforms",
  },
  {
    label: "Tourism / Hospitality Tech",
    multiple: 2.5,
    hint: "Booking platforms, travel SaaS, hotel management, experience marketplaces",
  },
  {
    label: "Healthcare / HealthTech",
    multiple: 4,
    hint: "Telemedicine, health data platforms, AI diagnostics, digital clinics",
  },
]

type StatusKey = 'premium' | 'strong' | 'moderate' | 'idle'

const STATUS_META: Record<StatusKey, { label: string; cls: string }> = {
  premium:  { label: 'Premium Venture Valuation', cls: 'status-premium'  },
  strong:   { label: 'Strong Growth Valuation',   cls: 'status-strong'   },
  moderate: { label: 'Moderate Market Valuation', cls: 'status-moderate' },
  idle:     { label: '—',                         cls: ''                },
}

/* ─── Row component ──────────────────────────────────────────────────────── */
function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3.5 border-b border-[#E8E4DD] last:border-b-0 ${bold ? '' : ''}`}>
      <span className={`font-sans-dm text-[13px] ${bold ? 'font-semibold text-[#1C1C2E]' : 'text-stone-500'}`}>{label}</span>
      <span className={`font-mono-dm text-[14px] ${bold ? 'text-[#B71E52] text-[16px]' : 'text-[#1C1C2E]'}`}>{value}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const RevenueValuationCalculator = () => {
  const [revenue, setRevenue]   = useState(0)
  const [growth, setGrowth]     = useState(30)
  const [industryIdx, setIndustryIdx] = useState(0)

  const [result, setResult] = useState<{
    valuation: number
    multiple: number
    boost: number
    status: StatusKey
    message: string
  } | null>(null)

  const ind = industries[industryIdx]

  // For the growth slider fill
  const growthPct = Math.min(Math.max(growth, 0), 200) / 200 * 100

  const calculate = () => {
    let boost = 1
    if (growth >= 100)      boost = 1.5
    else if (growth >= 60)  boost = 1.3
    else if (growth >= 30)  boost = 1.15

    const multiple   = ind.multiple * boost
    const valuation  = revenue * multiple

    let status: StatusKey = 'moderate'
    let message = 'Your valuation reflects a traditional operating business profile with moderate growth expectations — common for established Nepali SMEs.'
    if (multiple >= 10) {
      status  = 'premium'
      message = 'Your business falls into the high-growth category that institutional investors typically value aggressively due to scalability and future expansion potential.'
    } else if (multiple >= 6) {
      status  = 'strong'
      message = 'Your business demonstrates attractive growth characteristics commonly associated with scalable venture-backed enterprises in Nepal\'s emerging capital markets.'
    }

    setResult({ valuation, multiple, boost: (boost - 1) * 100, status, message })
  }

  const hasResult = result !== null && revenue > 0

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <section className="min-h-screen bg-[#F5F2ED] font-sans-dm py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Page Header ── */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] shrink-0" />
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">
                Investment Tools
              </span>
            </div>

            <h1
              className="font-display font-bold text-[#1C1C2E] leading-none mb-5
              text-[clamp(40px,5.5vw,68px)]"
            >
              Revenue Multiple
              <br />
              <em className="italic text-[#B71E52]">Valuation Calculator</em>
            </h1>

            <p className="text-stone-500 text-[16px] leading-[1.85] max-w-xl">
              Estimate your enterprise valuation using industry-standard revenue
              multiples — the same methodology used by Nepal's institutional
              investors and growth equity funds.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
            {/* ── LEFT — Inputs ── */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">
                {/* Card header */}
                <div className="px-8 py-5 border-b border-[#E8E4DD] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
                    <BarChart3 size={16} className="text-[#B71E52]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-[#1C1C2E]">
                      Business Inputs
                    </div>
                    <div className="font-mono-dm text-[9px] text-stone-400 tracking-widest uppercase">
                      Enter your metrics below
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 flex flex-col gap-7">
                  {/* Annual Revenue */}
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Annual Revenue (NPR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 10,000,000"
                      value={revenue || ""}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="vc-input"
                    />
                    {revenue > 0 && (
                      <p className="font-mono-dm text-[10px] text-stone-400 mt-1.5">
                        = NPR {revenue.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  {/* Growth Rate — slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase">
                        Annual Revenue Growth Rate
                      </label>
                      <span className="font-mono-dm text-[13px] font-medium text-[#B71E52]">
                        {growth}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={200}
                      step={5}
                      value={growth}
                      onChange={(e) => setGrowth(Number(e.target.value))}
                      className="vc-range"
                      style={
                        { "--val": `${growthPct}%` } as React.CSSProperties
                      }
                    />

                    {/* Growth tier labels */}
                    <div className="flex justify-between mt-2">
                      {[
                        { pct: "0%", label: "Stable" },
                        { pct: "30%", label: "+15% boost" },
                        { pct: "60%", label: "+30% boost" },
                        { pct: "100%+", label: "+50% boost" },
                      ].map((t, i) => (
                        <div key={i} className="text-center">
                          <div className="font-mono-dm text-[9px] text-stone-400">
                            {t.pct}
                          </div>
                          <div className="font-mono-dm text-[8px] text-[#B71E52]">
                            {t.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industry Type */}
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Industry / Business Type
                    </label>

                    <div className="flex flex-col gap-2">
                      {industries.map((ind, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndustryIdx(i)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all duration-200 cursor-pointer
                          ${
                            industryIdx === i
                              ? "bg-[#1C1C2E] border-[#1C1C2E] text-white"
                              : "bg-[#F5F2ED] border-[#E8E4DD] text-[#1C1C2E] hover:border-stone-300"
                          }`}
                        >
                          <div>
                            <div
                              className={`font-semibold text-[13px] ${industryIdx === i ? "text-white" : "text-[#1C1C2E]"}`}
                            >
                              {ind.label}
                            </div>
                            <div
                              className={`font-mono-dm text-[10px] mt-0.5 ${industryIdx === i ? "text-white/50" : "text-stone-400"}`}
                            >
                              {ind.hint}
                            </div>
                          </div>
                          <span
                            className={`font-mono-dm text-[13px] font-medium ml-4 shrink-0
                          ${industryIdx === i ? "text-[#e8839f]" : "text-[#B71E52]"}`}
                          >
                            {ind.multiple}x
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={calculate}
                    disabled={!revenue}
                    className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold text-[15px] px-6 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
                  >
                    Calculate Valuation <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Results ── */}
            <div className="flex flex-col gap-5">
              {/* Valuation Breakdown */}
              <div className="bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-[#E8E4DD] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
                    <TrendingUp size={16} className="text-[#B71E52]" />
                  </div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E]">
                    Valuation Breakdown
                  </div>
                </div>

                <div className="px-7 py-5">
                  <Row
                    label="Annual Revenue"
                    value={revenue > 0 ? fmt(revenue) : "—"}
                  />
                  <Row
                    label="Base Multiple"
                    value={hasResult ? `${ind.multiple}x` : "—"}
                  />
                  <Row
                    label="Growth Adjustment"
                    value={hasResult ? `+${result.boost.toFixed(0)}%` : "—"}
                  />
                  <Row
                    label="Adjusted Multiple"
                    value={hasResult ? `${result.multiple.toFixed(2)}x` : "—"}
                  />
                  <Row
                    label="Estimated Valuation"
                    value={hasResult ? fmt(result.valuation) : "—"}
                    bold
                  />
                </div>
              </div>

              {/* Enterprise Value hero number */}
              <div className="bg-[#1C1C2E] rounded-2xl p-7 relative overflow-hidden">
                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  <div className="font-mono-dm text-[10px] text-white/40 tracking-[0.12em] uppercase mb-3">
                    Estimated Enterprise Value
                  </div>
                  <div
                    key={hasResult ? result.valuation : "idle"}
                    className={`font-display font-bold leading-none mb-2 ${hasResult ? "num-in" : ""}
                    text-[clamp(28px,4vw,44px)] ${hasResult ? "text-white" : "text-white/20"}`}
                  >
                    {hasResult ? fmt(result.valuation) : "NPR —"}
                  </div>
                  {hasResult && (
                    <div className="font-mono-dm text-[11px] text-white/40 mt-1">
                      at {result.multiple.toFixed(2)}x revenue multiple
                    </div>
                  )}
                </div>
              </div>

              {/* Multiple bar visual */}
              {hasResult && (
                <div className="bg-white rounded-2xl border border-[#E8E4DD] px-7 py-6">
                  <div className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-4">
                    Multiple vs. Industry Range
                  </div>
                  <div className="flex flex-col gap-3">
                    {industries.map((ind, i) => {
                      const isSelected = i === industryIdx
                      const w = Math.min((ind.multiple / 12) * 100, 100)
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`font-sans-dm text-[12px] ${isSelected ? "text-[#1C1C2E] font-semibold" : "text-stone-400"}`}
                            >
                              {ind.label}
                            </span>
                            <span className="font-mono-dm text-[11px] text-stone-400">
                              {ind.multiple}x
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#F5F2ED] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bar-fill"
                              style={
                                {
                                  "--w": `${w}%`,
                                  background: isSelected
                                    ? "#B71E52"
                                    : "#D6D0C7",
                                } as React.CSSProperties
                              }
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Investor Perspective */}
              <div
                className={`rounded-2xl border p-7 ${hasResult ? STATUS_META[result.status].cls : "bg-[#F5F2ED] border-[#E8E4DD]"}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Zap
                    size={15}
                    className={
                      hasResult && result.status !== "idle"
                        ? "text-current"
                        : "text-stone-400"
                    }
                  />
                  <span className="font-mono-dm text-[10px] tracking-widest uppercase opacity-70">
                    Investor Perspective
                  </span>
                </div>

                <p
                  className={`font-sans-dm text-[14px] leading-[1.8] mb-5
                  ${hasResult ? "" : "text-stone-400"}`}
                >
                  {hasResult
                    ? result.message
                    : "Enter your startup metrics above to generate investor-oriented valuation insights."}
                </p>

                {hasResult && (
                  <div
                    className={`font-display font-bold text-[22px] leading-tight ${STATUS_META[result.status].cls.includes("crimson") ? "text-[#B71E52]" : ""}`}
                  >
                    {STATUS_META[result.status].label}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 px-5 py-4 bg-white border border-[#E8E4DD] rounded-xl">
                <Info
                  size={13}
                  className="text-stone-400 shrink-0 mt-0.5"
                />
                <p className="font-mono-dm text-[10px] text-stone-400 leading-[1.75] tracking-[0.02em]">
                  This calculator provides indicative estimates only. Actual
                  valuations depend on profitability, team, market conditions,
                  and investor negotiation. Consult an advisor before making
                  investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RevenueValuationCalculator