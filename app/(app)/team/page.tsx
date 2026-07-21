"use client"

import {
  ChevronRight,
  ArrowRight,
  Users,
  Award,
  Globe,
  TrendingUp,
} from "lucide-react"
import { Navbar } from "@/components/Layout/Navbar"
import { useEffect } from "react"
import Member from "@/components/Pages/Teams/member"
import { teamMembers } from "@/data/team"

/* ─── Same reveal hook as every other page ───────────────────────────────── */
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

/* ─── Global CSS — same token as all other pages ─────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(14px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.13s!important}
  .d3{animation-delay:.21s!important} .d4{animation-delay:.29s!important}

  .stat-pop { animation: numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* hero bg grid */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* testimonial card */
  .testi-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s; }
  .testi-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.08); }

  /* offer list item */
  .offer-item { transition: background 0.2s, transform 0.2s; }
  .offer-item:hover { background: #fff !important; transform: translateX(4px); }
`

/* ─── Department section wrapper ─────────────────────────────────────────── */
function DepartmentSection({
  label,
  title,
  description,
  department,
}: {
  label: string
  title: string
  description: string
  department: string
}) {
  return (
    <div className="mb-24 last:mb-0">
      {/* Header */}
      <div className="sr mb-12">
        <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
          {label}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E]">
            {title}
          </h2>
        </div>
        <p className="text-stone-500 text-[15px] leading-[1.8] max-w-xl mt-3">
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E8E4DD] mb-10" />

      {/* Members */}
      <Member teamMembers={teamMembers} department={department} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
const TeamPage: React.FC = () => {
  useReveal()

  const stats = [
    { value: "20+", label: "Team Members", icon: <Users size={16} /> },
    { value: "1", label: "Active Funds", icon: <TrendingUp size={16} /> },
    { value: "7", label: "Provinces Reached", icon: <Globe size={16} /> },
    { value: "15+", label: "Years Experience", icon: <Award size={16} /> },
  ]

  const offers = [
    {
      title: "Competitive Compensation",
      desc: "Market-leading salaries and performance-based bonuses",
    },
    {
      title: "Professional Development",
      desc: "Support for CFA, MBA, and other certifications",
    },
    {
      title: "Global Opportunities",
      desc: "Work across our international offices and diverse markets",
    },
    {
      title: "Inclusive Environment",
      desc: "Diverse team with equal opportunities for all",
    },
  ]

  const testimonials = [
    {
      quote:
        "Aadhyanta's team brings together deep expertise, strategic thinking, and a strong commitment to helping businesses grow. Their approach goes beyond investment by creating long-term value.",
      name: "Nischal Singh Bhandari",
      role: "Partnerships and Communication Manager",
      initials: "NSB",
    },
    {
      quote:
        "There’s a strong emphasis on learning, data-driven thinking, and accountability. Every decision is backed by discussion and analysis.",
      name: "Bijesh Rajkarnikar",
      role: "Financial Analyst",
      initials: "BR",
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-[#1C1C2E] hero-grid">
          {/* Photo backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80')",
              animation: "heroZoom 22s ease-in-out infinite alternate",
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E]/90 via-[#1C1C2E]/60 to-[#1C1C2E]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/80 via-transparent to-transparent" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
            {/* Badge */}
            <div className="sr inline-flex items-center gap-2.5 mb-6 px-4 py-2 bg-white/[0.07] border border-white/[0.15] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0" />
              <span className="font-mono-dm text-[10px] text-white/75 tracking-[0.12em] uppercase">
                Our People
              </span>
            </div>

            <h1
              className="sr d1 font-display font-bold text-white leading-[1.0] mb-5
              text-[clamp(48px,7vw,88px)]"
            >
              The Team Behind
              <br />
              <em className="italic text-white/45">Nepal's Capital Markets</em>
            </h1>

            <p className="sr d2 text-white/55 text-base sm:text-lg leading-[1.8] max-w-lg">
              Meet the exceptional professionals driving investment excellence
              and delivering results for enterprises and investors across Nepal.
            </p>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section className="bg-[#F5F2ED] border-b border-[#E8E4DD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E4DD]">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="sr p-8 lg:p-10"
                  style={{ animationDelay: `${i * 0.09}s` }}
                >
                  <div className="flex items-center gap-2 mb-3 text-[#B71E52]">
                    {s.icon}
                    <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase">
                      {s.label}
                    </span>
                  </div>
                  <div className="font-display font-bold text-[#1C1C2E] leading-none text-[clamp(32px,4vw,48px)]">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM SECTIONS ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28 lg:py-32 border-b border-[#E8E4DD]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <DepartmentSection
              label="Governance"
              title="Board of Directors"
              description="Experienced board members providing strategic oversight, governance, and long-term direction for the organization."
              department="Director"
            />
            <DepartmentSection
              label="Leadership"
              title="Executive Team"
              description="Strategic leaders with decades of experience guiding investment strategy and enterprise development across Nepal."
              department="Executive"
            />
            <DepartmentSection
              label="Portfolio Management"
              title="Management Team"
              description="Expert portfolio managers and analysts identifying and nurturing Nepal's most compelling growth opportunities."
              department="Management"
            />

            <DepartmentSection
              label="Business Developement"
              title="Accelerator Team"
              description="Building partnerships, accelerating ventures, and creating opportunities that drive sustainable business growth."
              department="Programs"
            />
            {/* <DepartmentSection
              label="Support Teams"
              title="Operations & Client Relations"
              description="Dedicated professionals ensuring operational excellence and exceptional service across every touchpoint."
              department="Operations"
            /> */}
          </div>
        </section>

        {/* ── CULTURE & VALUES ─────────────────────────────────────────────── */}
        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-24 border-b border-[#E8E4DD]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sr text-center mb-14">
              <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
                Team Voices
              </span>
              <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.08] text-[#1C1C2E]">
                What our <em className="italic text-[#B71E52]">team says</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`sr d${i + 1} testi-card bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl p-8`}
                >
                  {/* Quote mark */}
                  <div className="flex justify-between h-full  w-full flex-col">
                    <div>
                      <div className="font-display font-bold text-[56px] text-[#B71E52]/20 leading-[0.7] mb-5 select-none">
                        "
                      </div>

                      <blockquote className="font-display italic text-[19px] text-[#1C1C2E] leading-[1.6] mb-8">
                        {t.quote}
                      </blockquote>
                    </div>
                    <div>
                      <div className="flex  items-center gap-3 pt-5 border-t border-[#E8E4DD]">
                        <div className="w-10 h-10 rounded-full bg-[#1C1C2E] flex items-center justify-center flex-shrink-0">
                          <span className="font-mono-dm text-[11px] text-white">
                            {t.initials}
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-[14px] text-[#1C1C2E]">
                            {t.name}
                          </div>
                          <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.08em] uppercase mt-0.5">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN US CTA ───────────────────────────────────────────────────── */}
        {/* <section className="bg-[#1C1C2E] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sr-s grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> */}
        {/* <div>
                <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
                  Careers
                </span>
                <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.08] text-white mb-5">
                  Join our <em className="italic text-[#B71E52]">team</em>
                </h2>
                <p className="text-white/50 text-[15px] leading-[1.85] max-w-md">
                  We're always looking for talented professionals who share our
                  commitment to excellence and client success. Explore career
                  opportunities at Aadhyanta Fund.
                </p>
              </div> */}

        {/* <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="#positions"
                  className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/30"
                >
                  View Open Positions <ArrowRight size={16} />
                </a>
                <a
                  href="mailto:careers@aadhyanta.com"
                  className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-medium text-[15px] px-8 py-4 rounded transition-all duration-200"
                >
                  Contact Recruitment
                </a>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  )
}

export default TeamPage
