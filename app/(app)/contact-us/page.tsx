'use client'


import { Navbar } from '@/components/Layout/Navbar'
import toast,{Toaster} from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'
import {
  MapPin, Phone, Mail, Clock, ArrowRight,
  CheckCircle, Linkedin, Twitter, ChevronRight
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import ContactMain from '@/components/Pages/Contact/ContactForm'

/* ─── Global CSS — same token system ────────────────────────────────────── */
const GLOBAL_CSS = `

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}
  .d5{animation-delay:.37s!important}

  /* Form inputs */
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

  textarea.cf-input { resize:vertical; min-height:130px; }

  /* Topic pill */
  .topic-pill { transition:all 0.18s; cursor:pointer; }
  .topic-pill.active {
    background:#1C1C2E !important;
    color:#fff !important;
    border-color:#1C1C2E !important;
  }
  .topic-pill:not(.active):hover {
    border-color:#1C1C2E !important;
    color:#1C1C2E !important;
  }

  /* Office card hover */
  .office-card { transition:transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .office-card:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,0.08); }

  /* Map placeholder shimmer */
  @keyframes shimmer {
    0%   { background-position:-400px 0; }
    100% { background-position:400px 0; }
  }
  .map-shimmer {
    background: linear-gradient(90deg, #EDE9E2 25%, #E5E0D8 50%, #EDE9E2 75%);
    background-size:800px 100%;
    animation:shimmer 2s infinite;
  }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const offices = [
  {
    city: 'Kathmandu',
    label: 'Headquarters',
    address: 'Lazimpat, Ward No. 2\nKathmandu 44600, Nepal',
    phone: ' 01-4526601',
    email: 'contact@aadhyanta.com',
    hours: 'Mon – Fri, 9:30 AM – 5:3-*0 PM NPT',
    primary: true,
  },
]

const topics = [
  'Investment Inquiry',
  'Accelerator Program',
  'Investor Relations',
  'Partnership',
  'Media & Press',
  'General Inquiry',
]

const faqs = [
  {
    q: 'What is the minimum investment size for your funds?',
    a: 'Our funds target enterprise investments of NPR 10M–100M+ depending on the fund. For LP commitments, please contact our investor relations team directly.',
  },
  {
    q: 'How do I apply for the Aadhyanta Accelerator Program?',
    a: 'Applications are reviewed on a rolling basis. Visit our Accelerator page to learn about eligibility criteria and submit your expression of interest.',
  },
  {
    q: 'We are a development partner interested in co-designing a program. Who should we contact?',
    a: 'Please reach out to partnerships@aadhyanta.com with a brief overview of your mandate and program objectives. Our team will follow up within 5 business days.',
  },
  {
    q: 'How long does the investment evaluation process typically take?',
    a: 'Initial screening takes 2–4 weeks. Full due diligence, if we proceed, typically spans 3–6 months. We maintain transparent communication at every stage.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — split, no photo, typography-led
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD] pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

          {/* Left */}
          <div>
            <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0" />
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">
                Get In Touch
              </span>
            </div>
            <h1 className="sr d1 font-display font-bold text-[#1C1C2E] leading-[1.0] mb-6
              text-[clamp(48px,6.5vw,80px)]">
              Let's start a<br />
              <em className="italic text-[#B71E52]">conversation</em>
            </h1>
            <p className="sr d2 text-stone-500 text-[16px] leading-[1.85] max-w-md">
              Whether you're an enterprise seeking growth capital, an investor exploring opportunities, or a partner looking to collaborate — we want to hear from you.
            </p>
          </div>

          {/* Right — three quick contact chips */}
          <div className="sr-r flex flex-col gap-3 align-middle">
            {[
              { icon: <Mail size={16} />, label: 'General Inquiries', value: 'contact@aadhyanta.com' },
              // { icon: <Mail size={16} />, label: 'Investor Relations', value: 'invest@aadhyanta.com', href: 'mailto:invest@aadhyanta.com' },
              { icon: <Phone size={16} />, label: 'Kathmandu Office (1. num)', value: '01-4526601'},
              { icon: <Phone size={16} />, label: 'Kathmandu Office (2. num)', value: ' 01-4526603'},
            ].map((c, i) => (
              <div key={i} 
              onClick={()=>{navigator.clipboard.writeText(c.value); toast.success("Copied to Clipboard")

              }}
                className="group flex items-center gap-4 bg-white border border-[#E8E4DD] rounded-xl px-5 py-4 hover:border-[#B71E52] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="w-9 h-9 rounded-lg bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] flex-shrink-0">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-0.5">{c.label}</div>
                  <div className="font-semibold text-[14px] text-[#1C1C2E] truncate group-hover:text-[#B71E52] transition-colors duration-200">{c.value}</div>
               </div>
                <ChevronRight size={15} className="text-stone-300 group-hover:text-[#B71E52] ml-auto flex-shrink-0 transition-colors duration-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT FORM + OFFICES
═══════════════════════════════════════════════════════════════════════════ */
// function ContactMain({paramTopic}:{paramTopic:string}) {



//   const [topic, setTopic] = useState(paramTopic || "General Inquiry")
//   const [form, setForm] = useState({ name: 'nothing', org: 'nothing', email: 'maharjanprasiddha8@gmail.com', phone:'nothing', message: 'nothing', topic:topic})
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)

//   // useEffect(()=>{

//   //   setForm({ ...form, topic: topic })

//   // },[topic])

//   const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//     setForm(f => ({ ...f, [k]: e.target.value }))

//   const validate = () => {
//     const e: Record<string, string> = {}
//     if (!form.name.trim())    e.name    = 'Name is required'
//     if (!form.email.trim())   e.email   = 'Email is required'
//     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
//     if (!form.message.trim()) e.message = 'Message is required'
//     return e
//   }

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const errs = validate()
//     if (Object.keys(errs).length) {
//       setErrors(errs)
//       return
//     }
//     setLoading(true)
//     // setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         body: JSON.stringify({ ...form, topic: topic }),
//       })
//       // console.log(response)

//       // setSubmitted(true)
//       setLoading(false)


//     } catch (error) {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

//         {/* ── FORM ── */}
//         <div className="sr-l">
//           <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Send a Message</span>
//           <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-8">
//             How can we <em className="italic text-[#B71E52]">help you?</em>
//           </h2>

//           {submitted ? (
//             /* ── Success state ── */
//             <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-10 text-center">
//               <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle size={26} className="text-[#16A34A]" />
//               </div>
//               <div className="font-display font-bold text-[28px] text-[#15803D] mb-2">Message sent.</div>
//               <p className="text-[#166534] text-[14px] leading-[1.75] max-w-sm mx-auto">
//                 Thank you for reaching out. A member of our team will respond within 2–3 business days.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={submit} className="flex flex-col gap-6" noValidate>

//               {/* Topic selector */}
//               <div>
//                 <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-3 block">
//                   What's this about?
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {topics.map(t => (
//                     <button key={t} type="button" onClick={() => setTopic(t)}
//                       className={`topic-pill px-4 py-2 rounded-full border text-[13px] font-medium
//                         ${topic === t ? 'active' : 'border-[#E8E4DD] text-stone-500 bg-[#F5F2ED]'}`}>
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Name + Org */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-2 block">
//                     Full Name <span className="text-[#B71E52]">*</span>
//                   </label>
//                   <input
//                     type="text" value={form.name} onChange={set('name')} placeholder="Your Name"
//                     className={`cf-input ${errors.name ? 'error' : ''}`}
//                   />
//                   {errors.name && <p className="text-[11px] text-red-500 mt-1.5">{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-2 block">
//                     Organisation
//                   </label>
//                   <input
//                     type="text" value={form.org} onChange={set('org')} placeholder="Company or Fund"
//                     className="cf-input"
//                   />
//                 </div>
//               </div>

//               {/* Email + Phone */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-2 block">
//                     Email <span className="text-[#B71E52]">*</span>
//                   </label>
//                   <input
//                     type="email" value={form.email} onChange={set('email')} placeholder="you@company.com"
//                     className={`cf-input ${errors.email ? 'error' : ''}`}
//                   />
//                   {errors.email && <p className="text-[11px] text-red-500 mt-1.5">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-2 block">
//                     Phone
//                   </label>
//                   <input
//                     type="tel" value={form.phone} onChange={set('phone')} placeholder="+977 98XXXXXXXX"
//                     className="cf-input"
//                   />
//                 </div>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase mb-2 block">
//                   Message <span className="text-[#B71E52]">*</span>
//                 </label>
//                 <textarea
//                   value={form.message} onChange={set('message')}
//                   placeholder="Tell us what you're working on, what you're looking for, or how we can help…"
//                   className={`cf-input ${errors.message ? 'error' : ''}`}
//                 />
//                 {errors.message && <p className="text-[11px] text-red-500 mt-1.5">{errors.message}</p>}
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] disabled:bg-[#d88fa5] text-white font-semibold text-[15px] px-8 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25 self-start"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                       <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
//                       <path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                     Sending…
//                   </>
//                 ) : (
//                   <>Send Message <ArrowRight size={16} /></>
//                 )}
//               </button>

//               <p className="text-[11px] text-stone-400 leading-[1.6]">
//                 We respond to all inquiries within 2–3 business days. Your information is never shared with third parties.
//               </p>
//             </form>
//           )}
//         </div>

//         {/* ── OFFICES ── */}
//         <div className="sr-r flex flex-col gap-5">
//           {offices.map((o, i) => (
//             <div key={i} className={` bg-[#F5F2ED] rounded-xl border overflow-hidden
//               ${o.primary ? 'border-[#B71E52]' : 'border-[#E8E4DD]'}`}>

//               {/* Card header */}
//               <div className={`px-6 py-4 border-b flex items-center justify-between
//                 ${o.primary ? 'bg-[#B71E52]/5 border-[#B71E52]/20' : 'bg-white border-[#E8E4DD]'}`}>
//                 <div>
//                   <div className="font-display font-bold text-[18px] text-[#1C1C2E] leading-tight">{o.city}</div>
//                   <div className="font-mono-dm text-[9px] tracking-[0.12em] uppercase mt-0.5"
//                     style={{ color: o.primary ? '#B71E52' : '#9CA3AF' }}>{o.label}</div>
//                 </div>
//                 {o.primary && (
//                   <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2.5 py-1 bg-[#B71E52] text-white rounded">
//                     HQ
//                   </span>
//                 )}
//               </div>

//               {/* Card body */}
//               <div className="px-6 py-5 flex flex-col gap-4">
//                 {[
//                   { icon: <MapPin size={13} />, text: o.address },
//                   { icon: <Phone size={13} />, text: o.phone, href: `tel:${o.phone.replace(/\s/g,'')}` },
//                   { icon: <Mail size={13} />, text: o.email, href: `mailto:${o.email}` },
//                   { icon: <Clock size={13} />, text: o.hours },
//                 ].map((row, j) => (
//                   <div key={j} className="flex items-start gap-3">
//                     <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0 text-[#B71E52] mt-0.5">
//                       {row.icon}
//                     </div>
//                     {row.href ? (
//                       <a href={row.href}
//                         className="text-[13px] text-stone-600 leading-[1.65] hover:text-[#B71E52] transition-colors duration-200 whitespace-pre-line">
//                         {row.text}
//                       </a>
//                     ) : (
//                       <span className="text-[13px] text-stone-600 leading-[1.65] whitespace-pre-line">{row.text}</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {/* Social links */}
//           {/* <div className="bg-white border border-[#E8E4DD] rounded-xl p-5 flex items-center justify-between">
//             <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase">Follow us</span>
//             <div className="flex gap-3">
//               {[
//                 { icon: <Linkedin size={15} />, href: 'https://linkedin.com', label: 'LinkedIn' },
//                 { icon: <Twitter size={15} />, href: 'https://twitter.com', label: 'Twitter' },
//               ].map((s, i) => (
//                 <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
//                   aria-label={s.label}
//                   className="w-9 h-9 rounded-full border border-[#E8E4DD] bg-[#F5F2ED] flex items-center justify-center text-stone-400 hover:text-[#B71E52] hover:border-[#B71E52] transition-all duration-200">
//                   {s.icon}
//                 </a>
//               ))}
//             </div>
//           </div> */}
//         </div>

//       </div>
//     </section>
//   )
// }

/* ═══════════════════════════════════════════════════════════════════════════
   MAP SECTION
═══════════════════════════════════════════════════════════════════════════ */
function MapSection() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="sr rounded-2xl overflow-hidden border border-[#E8E4DD] shadow-sm" style={{ height: 380 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.4493927942553!2d85.33149031186679!3d27.73428177606772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fbe4fee5e3%3A0xfcbf3d8a1c30145b!2sAadhyanta%20Fund%20Management%20Limited!5e0!3m2!1sen!2snp!4v1779261342303!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aadhyanta Fund office location"
          />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-white py-20 md:py-24 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20">

        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">FAQ</span>
          <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E] mb-4">
            Common <em className="italic text-[#B71E52]">questions</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85]">
            Can't find what you're looking for? Drop us a message using the form above.
          </p>
        </div>

        {/* Right — accordion */}
        <div className="sr-r flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-b border-[#E8E4DD] ${i === 0 ? 'border-t' : ''}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer group"
              >
                <span className="font-semibold text-[15px] text-[#1C1C2E] leading-[1.5] group-hover:text-[#B71E52] transition-colors duration-200">
                  {faq.q}
                </span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200
                  ${open === i ? 'border-[#B71E52] bg-[#B71E52] text-white' : 'border-[#E8E4DD] text-stone-400'}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    {open === i
                      ? <path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      : <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>}
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <p className="text-stone-500 text-[14px] leading-[1.85] pb-5 pr-10">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTENT CARDS — quick pathway chooser
═══════════════════════════════════════════════════════════════════════════ */
function IntentCards() {
  const cards = [
    {
      tag: 'Enterprises',
      title: 'Seeking growth capital',
      desc: 'Growth-stage business with proven revenue and clear expansion plans? Apply to our accelerator or reach out directly.',
      cta: 'Apply for Investment',
      href: '/accelerator#apply',
      dark: false,
    },
    {
      tag: 'Investors',
      title: 'Exploring fund opportunities',
      desc: 'Institutional or development finance investor interested in Nepal\'s private equity market? Let\'s talk.',
      cta: 'Investor Inquiry',
      href: 'mailto:invest@aadhyanta.com',
      dark: true,
    },
    {
      tag: 'Partners',
      title: 'Looking to collaborate',
      desc: 'Development partner, government body, or ecosystem builder? We design programs and partnerships that create lasting impact.',
      cta: 'Partnership Inquiry',
      href: 'mailto:partnerships@aadhyanta.com',
      dark: false,
    },
  ]

  return (
    <section className="bg-[#F5F2ED] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr text-center mb-12">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">Quick Paths</span>
          <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E]">
            What brings you <em className="italic text-[#B71E52]">here?</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={i}
              className={`sr d${i + 1} rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl
                ${c.dark
                  ? 'bg-[#1C1C2E] border-transparent hover:shadow-[#1C1C2E]/20'
                  : 'bg-white border-[#E8E4DD] hover:shadow-stone-200'}`}>

              <div>
                <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2.5 py-1 bg-[#B71E52] text-white rounded mb-5 inline-block">
                  {c.tag}
                </span>
                <div className="w-8 h-[2px] bg-[#B71E52] rounded-full mb-5" />
                <h3 className={`font-display font-bold text-[24px] leading-tight mb-3
                  ${c.dark ? 'text-white' : 'text-[#1C1C2E]'}`}>
                  {c.title}
                </h3>
                <p className={`text-[14px] leading-[1.8] mb-8
                  ${c.dark ? 'text-white/50' : 'text-stone-500'}`}>
                  {c.desc}
                </p>
              </div>

              <a href={c.href}
                className={`inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-lg self-start transition-all duration-200 hover:-translate-y-0.5
                  ${c.dark
                    ? 'bg-[#B71E52] hover:bg-[#9e1847] text-white hover:shadow-lg hover:shadow-[#B71E52]/30'
                    : 'bg-[#1C1C2E] hover:bg-[#B71E52] text-white'}`}>
                {c.cta} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  useReveal()
  const searchParams = useSearchParams()
  const topic = searchParams.get('topic')||""


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Toaster position='bottom-center'/>
        <Navbar variant='nontransparent'/>
        <Hero />
        {/* <ContactMain  paramTopic = {topic}/> */}
        <ContactMain paramTopic={topic}/>
        <MapSection />
        <FAQ />
        <IntentCards />
      </div>
    </>
  )
}