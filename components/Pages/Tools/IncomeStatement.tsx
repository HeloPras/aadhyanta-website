'use client'

import { useState } from 'react'
import { FileText, TrendingUp, TrendingDown, Minus, ArrowRight, Info, PieChart } from 'lucide-react'

/* ─── Global CSS — same token system ────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .font-display { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm { font-family: 'DM Mono', monospace; }
  .font-sans-dm { font-family: 'Outfit', sans-serif; }

  .cf-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #E8E4DD;
    border-radius: 8px;
    background: #fff;
    color: #1C1C2E;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
  }
  .cf-input::placeholder { color: #9CA3AF; }
  .cf-input:focus {
    border-color: #B71E52;
    box-shadow: 0 0 0 3px rgba(183,30,82,0.09);
  }
  .cf-input::-webkit-inner-spin-button,
  .cf-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

  @keyframes numIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .num-in { animation: numIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes barGrow { from { width:0; } to { width: var(--w); } }
  .bar-grow { animation: barGrow 0.9s cubic-bezier(0.16,1,0.3,1) forwards; width:0; }
`

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmt = (n: number) =>
  'NPR ' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

const pct = (part: number, total: number) =>
  total === 0 ? 0 : Math.min(Math.max((part / total) * 100, 0), 100)

type Status = 'strong' | 'moderate' | 'loss' | 'idle'

const STATUS: Record<Status, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  strong:   { label: 'Strong Profitability',    color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', icon: <TrendingUp size={15} /> },
  moderate: { label: 'Moderate Profitability',  color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', icon: <Minus size={15} /> },
  loss:     { label: 'Operating at a Loss',     color: '#B91C1C', bg: '#FFF5F5', border: '#FECACA', icon: <TrendingDown size={15} /> },
  idle:     { label: '—',                       color: '#9CA3AF', bg: '#F5F2ED', border: '#E8E4DD', icon: <Minus size={15} /> },
}

/* ─── Statement row ──────────────────────────────────────────────────────── */
function StatRow({
  label, value, indent = false, bold = false, positive, negative, separator = false,
}: {
  label: string; value: number | null; indent?: boolean; bold?: boolean
  positive?: boolean; negative?: boolean; separator?: boolean
}) {
  const display = value === null ? '—' : (value < 0 ? `(${fmt(value)})` : fmt(value))
  const color = positive && value !== null && value >= 0 ? '#15803D'
    : negative && value !== null && value < 0 ? '#B91C1C'
    : bold ? '#1C1C2E' : '#3D3D52'

  return (
    <div className={`flex items-center justify-between py-3 ${separator ? 'border-t border-[#E8E4DD] mt-1' : 'border-b border-[#F5F2ED]'}`}>
      <span className={`font-sans-dm text-[13px] ${indent ? 'pl-4 text-stone-400' : ''} ${bold ? 'font-semibold text-[#1C1C2E]' : 'text-stone-500'}`}>
        {label}
      </span>
      <span
        className={`font-mono-dm text-[13px] ${bold ? 'text-[15px]' : ''}`}
        style={{ color }}
        key={value ?? 'nil'}
      >
        {display}
      </span>
    </div>
  )
}

/* ─── Margin bar ─────────────────────────────────────────────────────────── */
function MarginBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const w = pct(Math.abs(value), Math.abs(max))
  const formatted = max === 0 ? '—' : `${((value / max) * 100).toFixed(1)}%`
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-sans-dm text-[12px] text-stone-500">{label}</span>
        <span className="font-mono-dm text-[12px]" style={{ color }}>{formatted}</span>
      </div>
      <div className="h-1.5 bg-[#F5F2ED] rounded-full overflow-hidden">
        <div className="h-full rounded-full bar-grow" style={{ '--w': `${w}%`, background: color } as React.CSSProperties} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const StartupIncomeStatementCalculator = () => {
  const [revenue,    setRevenue]    = useState(0)
  const [cogs,       setCogs]       = useState(0)
  const [salaries,   setSalaries]   = useState(0)
  const [marketing,  setMarketing]  = useState(0)
  const [operations, setOperations] = useState(0)

  const [result, setResult] = useState<{
    grossProfit: number
    opex: number
    netIncome: number
    margin: number
    status: Status
    message: string
  } | null>(null)

  const inputs = [
    { label: 'Total Revenue',                      subLabel: 'All income before any deductions',       val: revenue,    set: setRevenue,    placeholder: '10,000,000', accent: true  },
    { label: 'Cost of Goods / Services (COGS)',     subLabel: 'Direct cost of delivering your product', val: cogs,       set: setCogs,       placeholder: '3,500,000',  accent: false },
    { label: 'Salaries & Team Expenses',            subLabel: 'Total compensation including benefits',  val: salaries,   set: setSalaries,   placeholder: '2,500,000',  accent: false },
    { label: 'Marketing & Advertising',             subLabel: 'All paid and organic growth spending',   val: marketing,  set: setMarketing,  placeholder: '1,000,000',  accent: false },
    { label: 'Software, Operations & Misc.',        subLabel: 'Infrastructure, tools, overheads',        val: operations, set: setOperations, placeholder: '800,000',    accent: false },
  ]

  const generate = () => {
    const gp   = revenue - cogs
    const opex = salaries + marketing + operations
    const net  = gp - opex
    const margin = revenue > 0 ? (net / revenue) * 100 : 0

    let status: Status = 'loss'
    let message = 'Expenses currently exceed revenue. Consider improving pricing, reducing costs, or accelerating revenue growth to reach profitability.'
    if (net > 0 && margin >= 20) {
      status  = 'strong'
      message = 'Your business is generating healthy profits with strong operational efficiency — an attractive profile for institutional investors.'
    } else if (net > 0) {
      status  = 'moderate'
      message = 'Your business is profitable, but margins can still improve through cost optimisation or revenue growth. Demonstrates commercial viability to investors.'
    }

    setResult({ grossProfit: gp, opex, netIncome: net, margin, status, message })
  }

  const hasResult = result !== null && revenue > 0
  const st = hasResult ? STATUS[result.status] : STATUS.idle

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <section className="min-h-screen bg-[#F5F2ED] font-sans-dm py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Page Header ── */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0" />
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">
                Investment Tools
              </span>
            </div>

            <h1
              className="font-display font-bold text-[#1C1C2E] leading-[1.0] mb-5
              text-[clamp(40px,5.5vw,68px)]"
            >
              Income Statement
              <br />
              <em className="italic text-[#B71E52]">Calculator</em>
            </h1>

            <p className="text-stone-500 text-[16px] leading-[1.85] max-w-xl">
              Generate a simple profit &amp; loss statement instantly using the
              operational numbers your business already tracks — and see how
              investors will read your financials.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            {/* ── LEFT — Inputs ── */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">
                {/* Card header */}
                <div className="px-8 py-5 border-b border-[#E8E4DD] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
                    <FileText size={16} className="text-[#B71E52]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-[#1C1C2E]">
                      Business Inputs
                    </div>
                    <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">
                      Annual figures in NPR
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 flex flex-col gap-6">
                  {inputs.map((inp, i) => (
                    <div key={i}>
                      {/* Divider before COGS group */}
                      {i === 1 && (
                        <div className="flex items-center gap-3 mb-6 -mt-2">
                          <div className="h-px flex-1 bg-[#E8E4DD]" />
                          <span className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">
                            Costs &amp; Expenses
                          </span>
                          <div className="h-px flex-1 bg-[#E8E4DD]" />
                        </div>
                      )}
                      {i === 2 && (
                        <div className="flex items-center gap-3 mb-6 -mt-2">
                          <div className="h-px flex-1 bg-[#E8E4DD]" />
                          <span className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">
                            Operating Expenses
                          </span>
                          <div className="h-px flex-1 bg-[#E8E4DD]" />
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-2">
                        <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase leading-tight">
                          {inp.label}
                        </label>
                        {inp.val > 0 && (
                          <span className="font-mono-dm text-[10px] text-[#B71E52]">
                            {fmt(inp.val)}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-stone-400 mb-2 leading-tight">
                        {inp.subLabel}
                      </p>
                      <input
                        type="number"
                        placeholder={inp.placeholder}
                        value={inp.val || ""}
                        onChange={(e) => inp.set(Number(e.target.value))}
                        className={`cf-input ${inp.accent ? "border-[#B71E52]/30 bg-[#f5e8ed]/30" : ""}`}
                      />
                    </div>
                  ))}

                  <button
                    onClick={generate}
                    disabled={!revenue}
                    className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold text-[15px] px-6 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25 mt-2"
                  >
                    Generate Income Statement <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Results ── */}
            <div className="flex flex-col gap-5">
              {/* Income Statement */}
              <div className="bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-[#E8E4DD] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
                    <FileText size={16} className="text-[#B71E52]" />
                  </div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E]">
                    Income Statement
                  </div>
                </div>

                <div className="px-7 py-5">
                  <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase mb-1">
                    Revenue
                  </div>
                  <StatRow label="Total Revenue" value={revenue || null} />

                  <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase mt-4 mb-1">
                    Cost of Sales
                  </div>
                  <StatRow
                    label="Cost of Goods / Services"
                    value={cogs || null}
                    indent
                  />
                  <StatRow
                    label="Gross Profit"
                    value={hasResult ? result.grossProfit : null}
                    bold
                    separator
                    positive
                    negative={false}
                  />

                  <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase mt-4 mb-1">
                    Operating Expenses
                  </div>
                  <StatRow
                    label="Salaries & Team"
                    value={salaries || null}
                    indent
                  />
                  <StatRow
                    label="Marketing & Advertising"
                    value={marketing || null}
                    indent
                  />
                  <StatRow
                    label="Operations & Misc."
                    value={operations || null}
                    indent
                  />
                  <StatRow
                    label="Total Opex"
                    value={hasResult ? result.opex : null}
                    bold
                    separator
                  />

                  <StatRow
                    label="Net Profit / Loss"
                    value={hasResult ? result.netIncome : null}
                    bold
                    separator
                    positive={hasResult && result.netIncome >= 0}
                    negative={hasResult && result.netIncome < 0}
                  />
                </div>
              </div>

              {/* Net income hero */}
              <div className="bg-[#1C1C2E] rounded-2xl p-7 relative overflow-hidden">
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
                    Net Profit / Loss
                  </div>
                  <div
                    key={hasResult ? result.netIncome : "idle"}
                    className={`font-display font-bold leading-none mb-1 ${hasResult ? "num-in" : ""}
                    text-[clamp(26px,4vw,40px)]`}
                    style={{
                      color: !hasResult
                        ? "rgba(255,255,255,0.2)"
                        : result.netIncome >= 0
                          ? "#6EE7B7"
                          : "#FCA5A5",
                    }}
                  >
                    {hasResult
                      ? result.netIncome < 0
                        ? `(${fmt(result.netIncome)})`
                        : fmt(result.netIncome)
                      : "NPR —"}
                  </div>
                  {hasResult && (
                    <div className="font-mono-dm text-[11px] text-white/40 mt-1">
                      {result.margin.toFixed(1)}% net margin
                    </div>
                  )}
                </div>
              </div>

              {/* Margin breakdown */}
              {hasResult && (
                <div className="bg-white rounded-2xl border border-[#E8E4DD] px-7 py-6">
                  <div className="flex items-center gap-2 mb-5">
                    <PieChart size={14} className="text-[#B71E52]" />
                    <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase">
                      Margin Analysis
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <MarginBar
                      label="Gross Margin"
                      value={result.grossProfit}
                      max={revenue}
                      color={result.grossProfit >= 0 ? "#15803D" : "#B91C1C"}
                    />
                    <MarginBar
                      label="COGS % of Revenue"
                      value={cogs}
                      max={revenue}
                      color="#C2410C"
                    />
                    <MarginBar
                      label="Opex % of Revenue"
                      value={result.opex}
                      max={revenue}
                      color="#7E22CE"
                    />
                    <MarginBar
                      label="Net Margin"
                      value={result.netIncome}
                      max={revenue}
                      color={result.netIncome >= 0 ? "#1D4ED8" : "#B91C1C"}
                    />
                  </div>
                </div>
              )}

              {/* Business Performance */}
              <div
                className="rounded-2xl border p-7"
                style={{ background: st.bg, borderColor: st.border }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ color: st.color }}
                >
                  {st.icon}
                  <span className="font-mono-dm text-[10px] tracking-[0.1em] uppercase opacity-75">
                    Business Performance
                  </span>
                </div>

                <p className="font-sans-dm text-[14px] leading-[1.8] mb-5 text-stone-600">
                  {hasResult
                    ? result.message
                    : "Enter your business numbers above to generate profitability insights."}
                </p>

                {hasResult && (
                  <div
                    className="font-display font-bold text-[22px] leading-tight"
                    style={{ color: st.color }}
                  >
                    {st.label}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 px-5 py-4 bg-white border border-[#E8E4DD] rounded-xl">
                <Info
                  size={13}
                  className="text-stone-400 flex-shrink-0 mt-0.5"
                />
                <p className="font-mono-dm text-[10px] text-stone-400 leading-[1.75] tracking-[0.02em]">
                  This calculator provides a simplified P&amp;L view. It
                  excludes depreciation, tax, interest, and non-cash items.
                  Consult an accountant for formal financial statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default StartupIncomeStatementCalculator