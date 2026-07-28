'use client'


import { Navbar } from '@/components/Layout/Navbar'
import toast,{Toaster} from 'react-hot-toast'
import { Suspense, useEffect, useRef, useState } from 'react'
import {
  MapPin, Phone, Mail, Clock, ArrowRight,
  CheckCircle, Linkedin, Twitter, ChevronRight
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import ContactMain from '@/components/Pages/Contact/ContactForm'
import Loader from '@/components/Loader'

/* ─── Global CSS — same token system ────────────────────────────────────── */
const GLOBAL_CSS = `

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }

  /* hero bg grid */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

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
    address: 'Dharamarg, Baluwatar-4\nKathmandu, Nepal',
    phone: '+977-01-4526601',
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
    <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-[#1C1C2E] hero-grid">
      {/* Photo backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/contact/contact.jpg')",
          animation: "heroZoom 22s ease-in-out infinite alternate",
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-[#1C1C2E]/10" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

          {/* Left */}
          <div>
            <div className="sr inline-flex items-center gap-2.5 mb-6 px-4 py-2 bg-white/[0.07] border border-white/[0.15] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0" />
              <span className="font-mono-dm text-[10px] text-white/75 tracking-[0.12em] uppercase">
                Get In Touch
              </span>
            </div>
            <h1 className="sr d1 font-display font-bold text-white leading-[1.0] mb-5
              text-[clamp(48px,7vw,88px)]">
              Let's start a<br />
              <em className="italic text-white/45">conversation</em>
            </h1>
            <p className="sr d2 text-white/55 text-base sm:text-lg leading-[1.8] max-w-md">
              Whether you're an enterprise seeking growth capital, an investor exploring opportunities, or a partner looking to collaborate — we want to hear from you.
            </p>
          </div>

          {/* Right — three quick contact chips */}
          <div className="sr-r flex flex-col gap-3 align-middle">
            {[
              { icon: <Mail size={16} />, label: 'General Inquiries', value: 'contact@aadhyanta.com' },
              // { icon: <Mail size={16} />, label: 'Investor Relations', value: 'invest@aadhyanta.com', href: 'mailto:invest@aadhyanta.com' },
              { icon: <Phone size={16} />, label: 'Kathmandu Office', value: '+977-01-4526601'},
            ].map((c, i) => (
              <div key={i}
              onClick={()=>{navigator.clipboard.writeText(c.value); toast.success("Copied to Clipboard")

              }}
                className="group flex items-center gap-4 bg-white/[0.07] border border-white/[0.15] rounded-xl px-5 py-4 hover:border-[#B71E52] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1]">
                <div className="w-9 h-9 rounded-lg bg-[#B71E52]/20 flex items-center justify-center text-[#B71E52] shrink-0">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-mono-dm text-[10px] text-white/40 tracking-widest uppercase mb-0.5">{c.label}</div>
                  <div className="font-semibold text-[14px] text-white truncate group-hover:text-[#B71E52] transition-colors duration-200">{c.value}</div>
               </div>
                <ChevronRight size={15} className="text-white/30 group-hover:text-[#B71E52] ml-auto shrink-0 transition-colors duration-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

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
                <span className="font-semibold text-[15px] text-[#1C1C2E] leading-normal group-hover:text-[#B71E52] transition-colors duration-200">
                  {faq.q}
                </span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200
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
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <ContactPageContent />
    </Suspense>
  )
}

function ContactPageContent() {
  useReveal()

  const searchParams = useSearchParams()
  const topic = searchParams.get('topic') || ''

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Toaster position="bottom-center" />
        <Navbar />
        <Hero />
        <ContactMain paramTopic={topic} />
        <MapSection />
        <FAQ />
      </div>
    </>
  )
}