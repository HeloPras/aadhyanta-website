"use client"

import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Users,
  TrendingUp,
  MessageSquare,
  ChevronDown,
} from "lucide-react"

/* ─── CSS additions (already in page GLOBAL_CSS, keep these if split out) ── */
const CONTACT_CSS = `
  .cf-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #E8E4DD;
    border-radius: 8px;
    background: #F5F2ED;
    color: #1C1C2E;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    appearance: none;
  }
  .cf-input::placeholder { color: #9CA3AF; }
  .cf-input:focus {
    border-color: #B71E52;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(183,30,82,0.09);
  }
  .cf-input.error { border-color: #EF4444; background: #FFF5F5; }
  textarea.cf-input { resize: vertical; min-height: 120px; }

  .topic-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border: 1.5px solid #E8E4DD;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    background: #F5F2ED;
    text-align: left;
    width: 100%;
  }
  .topic-tab:hover { border-color: #1C1C2E; }
  .topic-tab.active {
    border-color: #B71E52;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(183,30,82,0.08);
  }
  .topic-tab.active .tab-icon { background: #B71E52; color: #fff; }

  .tab-icon {
    width: 32px; height: 32px;
    border-radius: 7px;
    background: #E8E4DD;
    color: #9CA3AF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  /* Form section fade transition */
  @keyframes formFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .form-fade { animation: formFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Select arrow */
  .cf-select-wrap { position: relative; }
  .cf-select-wrap::after {
    content: '';
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #9CA3AF;
    pointer-events: none;
  }
`

/* ═══════════════════════════════════════════════════════════════════════════
   TOPIC DEFINITIONS — each topic has its own extra fields + label copy
═══════════════════════════════════════════════════════════════════════════ */
type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "number"
  | "checkbox"
  | "net profit"

interface ExtraField {
  key: string
  label: string
  placeholder: string
  type: FieldType
  dependent?: boolean
  required?: boolean
  options?: string[] // for select
  hint?: string // helper text below
}

interface TopicConfig {
  id: string
  label: string
  icon: React.ReactNode
  tagline: string
  messageLabel: string
  messagePlaceholder: string
  extraFields: ExtraField[]
  submitLabel: string
  successNote: string
}

const TOPICS: TopicConfig[] = [
  {
    id: "general",
    label: "General Inquiry",
    icon: <MessageSquare size={16} />,
    tagline: "Not sure where to start? We'll point you in the right direction.",
    messageLabel: "Message",
    messagePlaceholder:
      "Tell us what you have in mind — we'll make sure it reaches the right team.",
    extraFields: [],
    submitLabel: "Send Message",
    successNote: "A member of our team will respond within 2–3 business days.",
  },

  {
    id: "accelerator",
    label: "Accelerator Program",
    icon: <TrendingUp size={16} />,
    tagline:
      "Apply to our accelerator or ask about eligibility, cohorts, and timelines.",
    messageLabel: "Tell us about your business",
    messagePlaceholder:
      "Describe your business — what you do, who your customers are, what stage you're at, and what support you're looking for from the accelerator.",
    extraFields: [
      {
        key: "businessName",
        label: "Business Name",
        placeholder: "Your enterprise or startup name",
        type: "text",
        required: true,
      },
      {
        key: "sector",
        label: "Primary Sector",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Agriculture & Agro-Processing",
          "Manufacturing",
          "Technology / Digital",
          "Hospitality & Tourism",
          "Renewable Energy",
          "Trade & Logistics",
          "Financial Services",
          "Health & Education",
          "Other",
        ],
      },
      {
        key: "annualRevenue",
        label: "Approximate Annual Revenue (NPR)",
        placeholder: "e.g. 5,000,000",
        type: "text",
        required: false,
        hint: "Businesses with NPR 10M+ revenue typically qualify for our flagship track.",
      },
      {
        key: "yearsOperating",
        label: "Years in Operation",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Less than 1 year",
          "1–3 years",
          "3–5 years",
          "5–10 years",
          "10+ years",
        ],
      },
      {
        key: "province",
        label: "Province",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Koshi Province",
          "Madhesh Province",
          "Bagmati Province",
          "Gandaki Province",
          "Lumbini Province",
          "Karnali Province",
          "Sudurpashchim Province",
        ],
      },
      {
        key: "capitalNeeded",
        label: "Capital Sought (NPR)",
        placeholder: "e.g. 25,000,000",
        type: "text",
        required: false,
        hint: "Optional — helps us match you to the right fund and program track.",
      },
    ],
    submitLabel: "Submit Accelerator Application",
    successNote:
      "Our programs team will review your application and reach out within 5 business days.",
  },

  {
    id: "investment",
    label: "Investment Inquiry",
    icon: <Building2 size={16} />,
    tagline:
      "Seeking growth capital for your enterprise? Tell us about your business.",
    messageLabel: "Investment thesis & use of capital",
    messagePlaceholder:
      "Describe your business model, current traction, and how you plan to use the capital. Include any specific milestones you're targeting.",
    extraFields: [
      {
        key: "companyName",
        label: "Company Name",
        placeholder: "Your registered business name",
        type: "text",
        required: true,
      },
      {
        key: "sector",
        label: "Industry Sector",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Agriculture & Agro-Processing",
          "Manufacturing",
          "Technology / Digital",
          "Hospitality & Tourism",
          "Renewable Energy",
          "Trade & Logistics",
          "Financial Services",
          "Consumer & FMCG",
          "Healthcare",
          "Other",
        ],
      },
      {
        key: "fundingAmount",
        label: "Investment Amount Sought (NPR)",
        placeholder: "e.g. 30,000,000",
        type: "text",
        required: true,
        hint: "Our typical ticket size ranges from NPR 10M to NPR 100M+.",
      },
      {
        key: "registered date",
        label: "Registered Date (A.D)",
        placeholder: "yyyy-mm-dd",
        type: "text",
        required: true,
        hint: "We typically invest in businesses with NPR 10M+ in annual revenue.",
      },

      {
        key: "business model",
        label: "What does your business do?",
        placeholder:
          "e.g. SaaS platform for SMEs, retail distribution, fintech lending",
        type: "text",
        required: true,
        hint: "Briefly describe how your business creates, delivers, and captures value.",
      },
      {
        key: "product",
        label: "Product",
        placeholder: "e.g. Mobile app, physical product, or service offering",
        type: "text",
        required: true,
        hint: "Describe the main product or service your business offers to customers.",
      },
      {
        key: "successfully launched",
        label: "launched",
        placeholder: "e.g. 50,000,000",
        type: "checkbox",
        required: false,
        hint: "Have launched the business and started to generate revenue. ",
      },

      {
        key: "share capital",
        label: "Share Capital (NPR)",
        placeholder: "e.g. 10,000,000",
        dependent: true,
        type: "text",
        required: false,
        hint: "Total value of shares issued by the company.",
      },
      {
        key: "book networth",
        label: "Book Networth (NPR)",
        placeholder: "e.g. 25,000,000",
        dependent: true,
        type: "text",
        required: false,
        hint: "Total assets minus total liabilities as per your financial statements.",
      },
      {
        key: "annualRevenue",
        label: "Annual Revenue (NPR)",
        placeholder: "e.g. 50,000,000",
        dependent: true,
        type: "text",
        required: false,
        hint: "We typically invest in businesses with NPR 10M+ in annual revenue.",
      },
      {
        key: "net profit",
        label: "Net Profit (NPR)",
        placeholder: "e.g. 50,000,000",
        type: "net profit",
        dependent:true,
        required: false,
        hint: "We typically invest in businesses with NPR 10M+ in annual revenue.",
      },
      {
        key: "province",
        label: "Province of Operation",
        placeholder: "",
        type: "select",
        required: false,
        dependent:true,
        options: [
          "Koshi Province",
          "Madhesh Province",
          "Bagmati Province",
          "Gandaki Province",
          "Lumbini Province",
          "Karnali Province",
          "Sudurpashchim Province",
          "Multiple Provinces",
        ],
      },
      {
        key: "yearsOperating",
        label: "Years in Operation",
        placeholder: "eg. 10",
        type: "text",
        required: false,
        dependent:true,
      },
    ],
    submitLabel: "Submit Investment Inquiry",
    successNote:
      "Our investment team reviews all inquiries. If your business fits our mandate, we'll be in touch within 5–7 business days to schedule an initial call.",
  },

  {
    id: "investor",
    label: "Investor Inquiry",
    icon: <Users size={16} />,
    tagline:
      "Interested in becoming a limited partner or co-investor? Let's talk.",
    messageLabel: "Investment mandate & questions",
    messagePlaceholder:
      "Tell us about your investment mandate, the capital you're looking to deploy, and any specific questions about our funds or strategy.",
    extraFields: [
      {
        key: "investorType",
        label: "Investor Type",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Commercial Bank",
          "Insurance Company",
          "Development Finance Institution (DFI)",
          "Family Office",
          "Pension / Provident Fund",
          "Endowment / Foundation",
          "High-Net-Worth Individual",
          "Other Institutional Investor",
        ],
      },
      {
        key: "fundInterest",
        label: "Fund of Interest",
        placeholder: "",
        type: "select",
        required: true,
        options: [
          "Nepal Opportunity Fund I (NOF I)",
          "Nepal Opportunity Fund II (NOF II)",
          "Simrik Fund (Gender-Lens)",
          "All Funds — General LP Interest",
          "Co-investment Opportunities",
        ],
      },
      {
        key: "commitmentSize",
        label: "Indicative Commitment Size (NPR)",
        placeholder: "e.g. 100,000,000",
        type: "text",
        required: false,
        hint: "Indicative only — helps us send the most relevant materials.",
      },
      {
        key: "impactFocus",
        label: "Impact / ESG Priorities",
        placeholder: "",
        type: "select",
        required: false,
        options: [
          "Gender Lens / Women Inclusion",
          "Climate & Environmental",
          "Job Creation & Livelihoods",
          "SDG Alignment",
          "Financial Inclusion",
          "No specific impact mandate",
        ],
      },
      {
        key: "decisionTimeline",
        label: "Decision Timeline",
        placeholder: "",
        type: "select",
        required: false,
        options: [
          "Actively evaluating (next 3 months)",
          "Planning ahead (3–12 months)",
          "Early exploration (12+ months)",
          "Research only",
        ],
      },
    ],
    submitLabel: "Submit Investor Inquiry",
    successNote:
      "Our investor relations team will follow up within 3 business days with our fund fact sheet and an invitation to connect.",
  },
]

/* ─── Offices data ───────────────────────────────────────────────────────── */
const offices = [
  {
    city: "Kathmandu",
    label: "Headquarters",
    address: "Lazimpat, Ward No. 2\nKathmandu 44600, Nepal",
    phone: "01-4526601",
    email: "info@aadhyanta.com",
    hours: "Sun – Fri, 9:00 AM – 6:00 PM NPT",
    primary: true,
  },
]

/* ─── Field renderer ─────────────────────────────────────────────────────── */
function Field({
  field,
  clearValue,
  isChecked,
  value,
  onChange,
  error,
}: {
  field: ExtraField
  clearValue: Dispatch<SetStateAction<Record<string, string> >>;
  isChecked:boolean
  value: string
  onChange: (v: string) => void
  error?: string
}) {

  const [Net, setNet] = useState('profit')

    const checked = isChecked && field.dependent

    
  if (field.type === "select") {
    return (
      <div>
        <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
          {field.label}{" "}
          {(field.required || checked) && <span className="text-[#B71E52]">*</span>}
        </label>
        <div className="cf-select-wrap">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`cf-input pr-9 ${error ? "error" : ""}`}
          >
            <option value="">Select…</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        {field.hint && !error && (
          <p className="text-[11px] text-stone-400 mt-1.5">{field.hint}</p>
        )}
        {error && <p className="text-[11px] text-red-500 mt-1.5">{error}</p>}
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
          {field.label}{" "}
          {(field.required || checked) && <span className="text-[#B71E52]">*</span>}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`cf-input ${error ? "error" : ""}`}
        />
        {field.hint && !error && (
          <p className="text-[11px] text-stone-400 mt-1.5">{field.hint}</p>
        )}
        {error && <p className="text-[11px] text-red-500 mt-1.5">{error}</p>}
      </div>
    )
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex gap-2 font-black content-centre items-center  ">
        {/* <div className='inline-block'>
          <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
            {field.label}{" "}
            {field.required && <span className="text-[#B71E52]">*</span>}
          </label>
        </div> */}
        <input
          type="checkbox"
          //   value={value}
          onChange={(e) => {onChange(e.target.checked ? "on" : "off");
            
            if(!e.target.checked){
              clearValue({})
            }
          }}
          //   placeholder={field.placeholder}
          className={` ${error ? "error" : ""}`}
        />
        {field.hint && !error && (
          <p style={{ fontSize: 14 }} className=" text-stone-400 ">
            {field.hint}
          </p>
        )}
        {error && <p className="text-[11px] text-red-500 ">{error}</p>}
      </div>
    )
  }

  if (field.type === "net profit") {
    return (
      <div>
        <div className="font-mono-dm text-[12px]  text-stone-400 flex  uppercase mb-2  gap-3 ">
          <div
            onClick={() => {
              setNet("profit")
            }}
            className={`uppercase  p-0.5 px-1 rounded  cursor-pointer ${Net == "profit" ? "bg-[#B71E52] text-[#F5F2ED] " : " hover:bg-gray-100 border"}   `}
          >
            Net Profit
          </div>
          /
          <div
            onClick={() => {
              setNet("loss")
            }}
            className={`uppercase  p-0.5 px-1 rounded  cursor-pointer ${Net == "loss" ? "bg-[#B71E52] text-[#F5F2ED] " : " hover:bg-gray-100 border"}   `}
          >
            Net Loss
          </div>
          {"in (NPR)"}
          {(field.required || checked) && <span className="text-[#B71E52]">*</span>}
        </div>
        <div className="">
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`cf-input ${error ? "error" : ""}`}
          />
        </div>

        {field.hint && !error && (
          <p style={{ fontSize: 10 }} className="text-[11px] pt-1 text-stone-400 ">
            {field.hint}
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
        {field.label}{" "}
        {(field.required || checked) && <span className="text-[#B71E52]">*</span>}
      </label>
      <input
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`cf-input ${error ? "error" : ""}`}
      />
      {field.hint && !error && (
        <p className="text-[11px] text-stone-400 mt-1.5">{field.hint}</p>
      )}
      {error && <p className="text-[11px] text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
function ContactMain({ paramTopic }: { paramTopic: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /* ─── Resolve active topic from searchParam ─── */
  const topicFromUrl = searchParams.get("topic")
  const resolveId = (raw: string | null): string => {
    if (!raw) return paramTopic || "general"
    const match = TOPICS.find(
      (t) =>
        t.id === raw.toLowerCase() ||
        t.label.toLowerCase().includes(raw.toLowerCase()),
    )
    return match?.id ?? "general"
  }

  const [activeId, setActiveId] = useState<string>(resolveId(topicFromUrl))

  // Sync if URL changes externally
  useEffect(() => {
    setActiveId(resolveId(searchParams.get("topic")))
    // Reset extra fields when topic changes
    setExtraValues({})
    setErrors({})
  }, [searchParams])

  const activeTopic = TOPICS.find((t) => t.id === activeId) ?? TOPICS[0]

  /* ─── Base form state ─── */
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    phone: "",
    message: "",
  })

  const [extraValues, setExtraValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const setBase =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))
  const setExtra = (k: string) => (v: string) =>
    setExtraValues((prev) => ({ ...prev, [k]: v }))

  /* ─── Switch topic & update URL ─── */
  const switchTopic = (id: string) => {
    setActiveId(id)
    setExtraValues({})
    setErrors({})
    setSubmitted(false)
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("topic", id)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  /* ─── Validate ─── */
  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email"
    if (!form.message.trim()) e.message = "Message is required"
    activeTopic.extraFields
      .filter((f) => f.required || (extraValues['successfully launched'] === 'on' && f.dependent ))
      .forEach((f) => {
        if (!extraValues[f.key]?.trim()) e[f.key] = `${f.label} is required`
      })
    return e
  }

  /* ─── Submit ─── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...extraValues,
          topic: activeTopic.label,
        }),
      })
      setSubmitted(true)
    } catch {
      // handle silently — show success anyway for UX
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CONTACT_CSS }} />

      <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          {/* ── LEFT — form ── */}
          <div className="sr-l">
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Send a Message
            </span>
            <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-8">
              How can we <em className="italic text-[#B71E52]">help you?</em>
            </h2>

            {/* ── Topic selector ── */}
            <div className="mb-8">
              <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-3 block">
                What are you reaching out about?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => switchTopic(t.id)}
                    className={`topic-tab ${activeId === t.id ? "active" : ""}`}
                  >
                    <div
                      className={`tab-icon ${activeId === t.id ? "bg-[#B71E52] text-white" : ""}`}
                    >
                      {t.icon}
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-semibold text-[13px] text-[#1C1C2E] leading-tight">
                        {t.label}
                      </div>
                      <div className="text-[11px] text-stone-400 leading-tight truncate">
                        {t.tagline.split("?")[0].slice(0, 40)}…
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tagline for active topic ── */}
            <div className="mb-8 px-5 py-4 bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f5e8ed] flex items-center justify-center shrink-0 mt-0.5 text-[#B71E52]">
                {activeTopic.icon}
              </div>
              <p className="text-[13px] text-stone-500 leading-[1.75]">
                {activeTopic.tagline}
              </p>
            </div>

            {/* ── Success state ── */}
            {submitted ? (
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={26} className="text-[#16A34A]" />
                </div>
                <div className="font-display font-bold text-[28px] text-[#15803D] mb-2">
                  Message sent.
                </div>
                <p className="text-[#166534] text-[14px] leading-[1.75] max-w-sm mx-auto">
                  {activeTopic.successNote}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({
                      name: "",
                      org: "",
                      email: "",
                      phone: "",
                      message: "",
                    })
                    setExtraValues({})
                  }}
                  className="mt-6 text-[13px] text-[#166534] underline underline-offset-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                key={activeId}
                onSubmit={submit}
                className="form-fade flex flex-col gap-5"
                noValidate
              >
                {/* ── Base fields: Name + Org ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Full Name <span className="text-[#B71E52]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={setBase("name")}
                      placeholder="Your name"
                      className={`cf-input ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Organisation
                    </label>
                    <input
                      type="text"
                      value={form.org}
                      onChange={setBase("org")}
                      placeholder="Company or institution"
                      className="cf-input"
                    />
                  </div>
                </div>

                {/* ── Email + Phone ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Email <span className="text-[#B71E52]">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={setBase("email")}
                      placeholder="you@company.com"
                      className={`cf-input ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={setBase("phone")}
                      placeholder="+977 98XXXXXXXX"
                      className="cf-input"
                    />
                  </div>
                </div>

                {/* ── Topic-specific extra fields ── */}
                {activeTopic.extraFields.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-px flex-1 bg-[#E8E4DD]" />
                      <span className="font-mono-dm text-[9px] text-stone-400 tracking-[0.12em] uppercase">
                        {activeTopic.label} Details
                      </span>
                      <div className="h-px flex-1 bg-[#E8E4DD]" />
                    </div>

                    {/* Pair extra fields into 2-column rows where possible */}
                    {(() => {
                      const fields = activeTopic.extraFields
                      const rows: ExtraField[][] = []
                      let i = 0
                      while (i < fields.length) {
                        // textarea always solo
                        if (
                          fields[i].type === "textarea" ||
                          fields[i].type === "checkbox"
                        ) {
                          rows.push([fields[i]])
                          i++
                        } else if (
                          i + 1 < fields.length &&
                          fields[i + 1].type !== "textarea" &&
                          fields[i + 1].type !== "checkbox"
                        ) {
                          rows.push([fields[i], fields[i + 1]])
                          i += 2
                        } else {
                          rows.push([fields[i]])
                          i++
                        }
                      }
                      return (
                        extraValues["successfully launched"] &&
                        extraValues["successfully launched"] == "on"
                          ? rows
                          : rows.slice(0, 4)
                      ).map((row, ri) => (
                        <div
                          key={ri}
                          className={`grid gap-4 ${row.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
                        >
                          {row.map((field) => (
                            <Field
                              isChecked = {extraValues["successfully launched"] == "on"}
                              key={field.key}
                              clearValue = {setExtraValues}
                              field={field}
                              value={extraValues[field.key] ?? ""}
                              onChange={setExtra(field.key)}
                              error={errors[field.key]}
                            />
                          ))}
                        </div>
                      ))
                    })()}
                  </>
                )}

                {/* ── Message ── */}
                <div>
                  <label className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase mb-2 block">
                    {activeTopic.messageLabel}{" "}
                    <span className="text-[#B71E52]">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={setBase("message")}
                    placeholder={activeTopic.messagePlaceholder}
                    className={`cf-input ${errors.message ? "error" : ""}`}
                    style={{ minHeight: 130 }}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500 mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] disabled:bg-[#d88fa5] text-white font-semibold text-[15px] px-8 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25 self-start"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 2a6 6 0 0 1 6 6"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      {activeTopic.submitLabel} <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 leading-[1.6]">
                  We respond to all inquiries within 2–3 business days. Your
                  information is never shared with third parties.
                </p>
              </form>
            )}
          </div>

          {/* ── RIGHT — offices ── */}

          <div className="sr-r flex flex-col gap-5 sticky top-25  ">
            {offices.map((o, i) => (
              <div
                key={i}
                className={`bg-[#F5F2ED] rounded-xl border overflow-hidden ${o.primary ? "border-[#B71E52]" : "border-[#E8E4DD]"}`}
              >
                <div
                  className={`px-6 py-4 border-b flex items-center justify-between ${o.primary ? "bg-[#B71E52]/5 border-[#B71E52]/20" : "bg-white border-[#E8E4DD]"}`}
                >
                  <div>
                    <div className="font-display font-bold text-[18px] text-[#1C1C2E] leading-tight">
                      {o.city}
                    </div>
                    <div
                      className="font-mono-dm text-[9px] tracking-[0.12em] uppercase mt-0.5"
                      style={{ color: o.primary ? "#B71E52" : "#9CA3AF" }}
                    >
                      {o.label}
                    </div>
                  </div>
                  {o.primary && (
                    <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2.5 py-1 bg-[#B71E52] text-white rounded">
                      HQ
                    </span>
                  )}
                </div>

                <div className="px-6 py-5 flex flex-col gap-4">
                  {[
                    { icon: <MapPin size={13} />, text: o.address },
                    {
                      icon: <Phone size={13} />,
                      text: o.phone,
                      href: `tel:${o.phone.replace(/\s/g, "")}`,
                    },
                    {
                      icon: <Mail size={13} />,
                      text: o.email,
                      href: `mailto:${o.email}`,
                    },
                    { icon: <Clock size={13} />, text: o.hours },
                  ].map((row, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center shrink-0 text-[#B71E52] mt-0.5">
                        {row.icon}
                      </div>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-[13px] text-stone-600 leading-[1.65] hover:text-[#B71E52] transition-colors duration-200 whitespace-pre-line"
                        >
                          {row.text}
                        </a>
                      ) : (
                        <span className="text-[13px] text-stone-600 leading-[1.65] whitespace-pre-line">
                          {row.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick links by topic */}
            <div className="bg-white border border-[#E8E4DD] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8E4DD]">
                <span className="font-mono-dm text-[10px] text-stone-400 tracking-widest uppercase">
                  Quick Paths
                </span>
              </div>
              <div className="divide-y divide-[#E8E4DD]">
                {[
                  {
                    label: "Apply to Accelerator",
                    href: "?topic=accelerator",
                    tag: "Enterprises",
                  },
                  {
                    label: "Seek Investment Capital",
                    href: "?topic=investment",
                    tag: "Enterprise Owners",
                  },
                  {
                    label: "Invest in Our Funds",
                    href: "?topic=investor",
                    tag: "Investors & LPs",
                  },
                ].map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F2ED] transition-colors duration-200 group"
                  >
                    <div>
                      <div className="font-semibold text-[13px] text-[#1C1C2E] group-hover:text-[#B71E52] transition-colors duration-200">
                        {l.label}
                      </div>
                      <div className="font-mono-dm text-[10px] text-stone-400 tracking-wide">
                        {l.tag}
                      </div>
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-stone-300 group-hover:text-[#B71E52] transition-colors duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactMain
