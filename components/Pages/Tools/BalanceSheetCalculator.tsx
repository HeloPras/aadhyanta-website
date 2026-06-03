'use client'

import { useState } from 'react'
import { Scale, TrendingUp, TrendingDown, Minus, ArrowRight, Info, LayoutList } from 'lucide-react'

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

  @keyframes numIn  { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .num-in { animation: numIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes barGrow { from { width:0; } to { width: var(--w); } }
  .bar-grow { animation: barGrow 0.9s cubic-bezier(0.16,1,0.3,1) forwards; width:0; }
`

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmt = (n: number) =>
  'NPR ' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

const pct = (part: number, total: number) =>
  total === 0 ? 0 : Math.min(Math.max((Math.abs(part) / Math.abs(total)) * 100, 0), 100)

type Status = 'strong' | 'moderate' | 'high' | 'idle'

const STATUS: Record<Status, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  strong:   { label: 'Strong Financial Position', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', icon: <TrendingUp size={15} /> },
  moderate: { label: 'Moderate Financial Risk',   color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', icon: <Minus size={15} /> },
  high:     { label: 'High Financial Risk',        color: '#B91C1C', bg: '#FFF5F5', border: '#FECACA', icon: <TrendingDown size={15} /> },
  idle:     { label: '—',                          color: '#9CA3AF', bg: '#F5F2ED', border: '#E8E4DD', icon: <Minus size={15} /> },
}

/* ─── Balance Sheet Row ──────────────────────────────────────────────────── */
function BSRow({
  label, value, indent = false, bold = false,
  positive, negative, separator = false,
}: {
  label: string; value: number | null; indent?: boolean; bold?: boolean
  positive?: boolean; negative?: boolean; separator?: boolean
}) {
  const display = value === null ? '—' : (value < 0 ? `(${fmt(value)})` : fmt(value))
  const color = positive && value !== null && value >= 0 ? '#15803D'
    : negative && value !== null ? '#B91C1C'
    : bold ? '#1C1C2E' : '#3D3D52'

  return (
    <div className={`flex items-center justify-between py-3 ${separator ? 'border-t-2 border-[#E8E4DD] mt-1 pt-4' : 'border-b border-[#F5F2ED]'}`}>
      <span className={`font-sans-dm text-[13px] ${indent ? 'pl-4 text-stone-400' : ''} ${bold ? 'font-semibold text-[#1C1C2E]' : 'text-stone-500'}`}>
        {label}
      </span>
      <span className={`font-mono-dm text-[13px] ${bold ? 'text-[15px]' : ''}`} style={{ color }} key={value ?? 'nil'}>
        {display}
      </span>
    </div>
  )
}

/* ─── Proportion bar ─────────────────────────────────────────────────────── */
function PropBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const w = pct(value, total)
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-sans-dm text-[12px] text-stone-500">{label}</span>
        <span className="font-mono-dm text-[12px]" style={{ color }}>
          {total === 0 ? '—' : `${w.toFixed(1)}%`}
        </span>
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
const BalanceSheetCalculator = () => {
  const [cash,        setCash]        = useState(0)
  const [receivables, setReceivables] = useState(0)
  const [equipment,   setEquipment]   = useState(0)
  const [debt,        setDebt]        = useState(0)
  const [expenses,    setExpenses]    = useState(0)

  const [result, setResult] = useState<{
    assets: number
    liabilities: number
    equity: number
    status: Status
    message: string
    debtRatio: number
  } | null>(null)

  const assetInputs = [
    { label: 'Cash in Bank',               subLabel: 'Liquid funds available immediately',             val: cash,        set: setCash,        placeholder: '5,000,000' },
    { label: 'Receivables',                subLabel: 'Money customers or debtors owe you',             val: receivables, set: setReceivables, placeholder: '1,200,000' },
    { label: 'Equipment & Fixed Assets',   subLabel: 'Machinery, vehicles, property, inventory',       val: equipment,   set: setEquipment,   placeholder: '2,500,000' },
  ]

  const liabInputs = [
    { label: 'Loans & Debt',               subLabel: 'Bank loans, investor notes, outstanding credit', val: debt,     set: setDebt,     placeholder: '1,500,000' },
    { label: 'Unpaid Bills & Accruals',    subLabel: 'Supplier invoices, accrued expenses payable',    val: expenses, set: setExpenses, placeholder: '400,000'   },
  ]

  const generate = () => {
    const assets      = cash + receivables + equipment
    const liabilities = debt + expenses
    const equity      = assets - liabilities
    const debtRatio   = assets > 0 ? (liabilities / assets) * 100 : 0

    let status: Status = 'high'
    let message = 'Liabilities currently exceed assets. Improving cash generation, securing equity investment, or reducing debt may be necessary to restore financial stability.'
    if (equity > 0 && liabilities < assets * 0.5) {
      status  = 'strong'
      message = 'Your business has healthy equity and manageable liabilities — a reassuring profile for institutional investors conducting due diligence.'
    } else if (equity > 0) {
      status  = 'moderate'
      message = 'Your business remains solvent, but liabilities are elevated relative to assets. Consider accelerating receivables collection or restructuring debt.'
    }

    setResult({ assets, liabilities, equity, debtRatio, status, message })
  }

  const hasResult = result !== null && (cash + receivables + equipment) > 0
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
              Balance Sheet
              <br />
              <em className="italic text-[#B71E52]">Calculator</em>
            </h1>

            <p className="text-stone-500 text-[16px] leading-[1.85] max-w-xl">
              Generate a clean balance sheet snapshot using the financial
              numbers your business already tracks — and understand what
              institutional investors see when they review your position.
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
                    <Scale size={16} className="text-[#B71E52]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-[#1C1C2E]">
                      Financial Inputs
                    </div>
                    <div className="font-mono-dm text-[9px] text-stone-400 tracking-[0.1em] uppercase">
                      Current figures in NPR
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 flex flex-col gap-6">
                  {/* Assets group */}
                  <div className="flex items-center gap-3 -mb-2">
                    <div className="h-px flex-1 bg-[#E8E4DD]" />
                    <span className="font-mono-dm text-[9px] text-[#15803D] tracking-[0.12em] uppercase">
                      Assets
                    </span>
                    <div className="h-px flex-1 bg-[#E8E4DD]" />
                  </div>

                  {assetInputs.map((inp, i) => (
                    <div key={i}>
                      <div className="flex items-start justify-between mb-1.5">
                        <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase leading-tight">
                          {inp.label}
                        </label>
                        {inp.val > 0 && (
                          <span className="font-mono-dm text-[10px] text-[#15803D]">
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
                        className="cf-input"
                      />
                    </div>
                  ))}

                  {/* Liabilities group */}
                  <div className="flex items-center gap-3 -mb-2 pt-2">
                    <div className="h-px flex-1 bg-[#E8E4DD]" />
                    <span className="font-mono-dm text-[9px] text-[#B91C1C] tracking-[0.12em] uppercase">
                      Liabilities
                    </span>
                    <div className="h-px flex-1 bg-[#E8E4DD]" />
                  </div>

                  {liabInputs.map((inp, i) => (
                    <div key={i}>
                      <div className="flex items-start justify-between mb-1.5">
                        <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase leading-tight">
                          {inp.label}
                        </label>
                        {inp.val > 0 && (
                          <span className="font-mono-dm text-[10px] text-[#B91C1C]">
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
                        className="cf-input"
                      />
                    </div>
                  ))}

                  <button
                    onClick={generate}
                    disabled={!cash && !receivables && !equipment}
                    className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold text-[15px] px-6 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25 mt-2"
                  >
                    Generate Balance Sheet <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Results ── */}
            <div className="flex flex-col gap-5">
              {/* Balance Sheet statement */}
              <div className="bg-white rounded-2xl border border-[#E8E4DD] overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-[#E8E4DD] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5e8ed] flex items-center justify-center">
                    <LayoutList size={16} className="text-[#B71E52]" />
                  </div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E]">
                    Balance Sheet
                  </div>
                </div>

                <div className="px-7 py-5">
                  {/* Assets */}
                  <div className="font-mono-dm text-[9px] text-[#15803D] tracking-[0.1em] uppercase mb-1">
                    Assets
                  </div>
                  <BSRow label="Cash in Bank" value={cash || null} indent />
                  <BSRow
                    label="Receivables"
                    value={receivables || null}
                    indent
                  />
                  <BSRow
                    label="Equipment & Assets"
                    value={equipment || null}
                    indent
                  />
                  <BSRow
                    label="Total Assets"
                    value={hasResult ? result.assets : null}
                    bold
                    separator
                    positive
                  />

                  {/* Liabilities */}
                  <div className="font-mono-dm text-[9px] text-[#B91C1C] tracking-[0.1em] uppercase mt-5 mb-1">
                    Liabilities
                  </div>
                  <BSRow label="Loans & Debt" value={debt || null} indent />
                  <BSRow label="Unpaid Bills" value={expenses || null} indent />
                  <BSRow
                    label="Total Liabilities"
                    value={hasResult ? result.liabilities : null}
                    bold
                    separator
                    negative
                  />

                  {/* Equity */}
                  <div className="font-mono-dm text-[9px] text-[#1D4ED8] tracking-[0.1em] uppercase mt-5 mb-1">
                    Equity
                  </div>
                  <BSRow
                    label="Founder / Owner Equity"
                    value={hasResult ? result.equity : null}
                    bold
                    separator
                    positive={hasResult && result.equity >= 0}
                    negative={hasResult && result.equity < 0}
                  />
                </div>
              </div>

              {/* Equity hero card */}
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
                    Owner Equity
                  </div>
                  <div
                    key={hasResult ? result.equity : "idle"}
                    className={`font-display font-bold leading-none mb-1 ${hasResult ? "num-in" : ""}
                    text-[clamp(26px,4vw,40px)]`}
                    style={{
                      color: !hasResult
                        ? "rgba(255,255,255,0.2)"
                        : result.equity >= 0
                          ? "#6EE7B7"
                          : "#FCA5A5",
                    }}
                  >
                    {hasResult
                      ? result.equity < 0
                        ? `(${fmt(result.equity)})`
                        : fmt(result.equity)
                      : "NPR —"}
                  </div>
                  {hasResult && (
                    <div className="flex gap-4 mt-3">
                      <div>
                        <div className="font-mono-dm text-[9px] text-white/30 uppercase tracking-wider">
                          Debt Ratio
                        </div>
                        <div className="font-mono-dm text-[13px] text-white/70 mt-0.5">
                          {result.debtRatio.toFixed(1)}%
                        </div>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div>
                        <div className="font-mono-dm text-[9px] text-white/30 uppercase tracking-wider">
                          Total Assets
                        </div>
                        <div className="font-mono-dm text-[13px] text-white/70 mt-0.5">
                          {fmt(result.assets)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Composition bars */}
              {hasResult && (
                <div className="bg-white rounded-2xl border border-[#E8E4DD] px-7 py-6">
                  <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-5">
                    Asset Composition
                  </div>
                  <div className="flex flex-col gap-4">
                    <PropBar
                      label="Cash"
                      value={cash}
                      total={result.assets}
                      color="#15803D"
                    />
                    <PropBar
                      label="Receivables"
                      value={receivables}
                      total={result.assets}
                      color="#1D4ED8"
                    />
                    <PropBar
                      label="Fixed Assets"
                      value={equipment}
                      total={result.assets}
                      color="#7E22CE"
                    />
                    <div className="border-t border-[#E8E4DD] pt-4 mt-1">
                      <PropBar
                        label="Debt-to-Asset Ratio"
                        value={result.liabilities}
                        total={result.assets}
                        color="#B91C1C"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Health */}
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
                    Financial Health
                  </span>
                </div>
                <p className="font-sans-dm text-[14px] leading-[1.8] mb-5 text-stone-600">
                  {hasResult
                    ? result.message
                    : "Enter your business numbers above to generate financial health insights."}
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
                  This calculator provides a simplified balance sheet view. It
                  excludes intangible assets, deferred tax, and complex
                  liability structures. Consult an accountant for formal
                  financial statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BalanceSheetCalculator