"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Briefcase, GraduationCap, X } from "lucide-react"

/* ─── Inline styles for fonts — same token as all other pages ────────────── */
const MEMBER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  .member-display { font-family: 'Cormorant Garamond', serif; }
  .member-mono    { font-family: 'DM Mono', monospace; }
  .member-sans    { font-family: 'Outfit', sans-serif; }
`

/* ─── Specialty pill ─────────────────────────────────────────────────────── */
function Pill({ label }: { label: string }) {
  return (
    <span className="member-mono inline-block px-3 py-1.5 rounded bg-[#F5F2ED] border border-[#E8E4DD] text-[10px] text-stone-500 tracking-[0.06em] uppercase">
      {label}
    </span>
  )
}

/* ─── Detail content — shared between mobile card and desktop panel ──────── */
function MemberDetail({ member }: { member: any }) {
  return (
    <div className="member-sans flex flex-col gap-5">
      {/* Name + position */}
      <div>
        <h3 className="member-display font-bold text-[22px] leading-tight text-[#1C1C2E] mb-1">
          {member.name}
        </h3>
        <p className="member-mono text-[10px] tracking-[0.12em] uppercase text-[#B71E52]">
          {member.position}
        </p>
      </div>

      {/* Thin crimson rule */}
      <div className="w-8 h-[2px] bg-[#B71E52] rounded-full" />

      {/* Bio */}
      <p className="text-[13px] text-stone-500 leading-[1.8]">{member.bio}</p>

      {/* Experience + Education */}
      <div className="flex flex-col gap-3 py-4 border-y border-[#E8E4DD]">
        {member.experience && (
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Briefcase size={10} className="text-[#B71E52]" />
            </div>
            <span className="text-[13px] text-stone-600 leading-[1.65]">{member.experience}</span>
          </div>
        )}
        {member.education && (
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#f5e8ed] flex items-center justify-center flex-shrink-0 mt-0.5">
              <GraduationCap size={10} className="text-[#B71E52]" />
            </div>
            <span className="text-[13px] text-stone-600 leading-[1.65]">{member.education}</span>
          </div>
        )}
      </div>

      {/* Specialties */}
      {member.specialties?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award size={13} className="text-[#B71E52]" />
            <span className="member-mono text-[10px] text-stone-400 tracking-[0.1em] uppercase">Expertise</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.specialties.map((s: string, i: number) => (
              <Pill key={i} label={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Member = ({
  teamMembers,
  department,
}: {
  teamMembers: any[]
  department: string
}) => {
  const [selected, setSelected] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const members = teamMembers.filter((m) => m.department === department)

  /* ─── MOBILE — vertical stacked cards ─────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: MEMBER_CSS }} />
        <div className="flex flex-col gap-5">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-[#E8E4DD] rounded-xl overflow-hidden shadow-sm"
            >
              {/* Photo */}
              <div className="relative h-60 bg-[#1C1C2E] overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top opacity-90"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="member-display font-bold text-[56px] text-white/20">
                      {member.initials || member.name?.[0]}
                    </span>
                  </div>
                )}
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/60 via-transparent to-transparent" />
                {/* Name overlay */}
                <div className="absolute bottom-4 left-5">
                  <div className="member-display font-bold text-[18px] text-white leading-tight">
                    {member.name}
                  </div>
                  <div className="member-mono text-[9px] text-[#B71E52] tracking-[0.1em] uppercase mt-0.5">
                    {member.position}
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="p-6">
                <MemberDetail member={member} />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  /* ─── DESKTOP — expanding cards ───────────────────────────────────────── */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MEMBER_CSS }} />

      <div className="flex flex-wrap gap-5 pb-4">
        {members.map((member) => {
          const isSelected = selected === member.name

          return (
            <motion.div
              key={member.name}
              layout
              initial={{ width: 260 }}
              animate={{
                width: isSelected ? 560 : 260,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={() => setSelected(isSelected ? "" : member.name)}
              className="relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden shadow-sm border"
              style={{
                height: 380,
                borderColor: isSelected ? "#B71E52" : "#E8E4DD",
                background: "#F5F2ED",
                transition: "border-color 0.3s",
                boxShadow: isSelected
                  ? "0 20px 48px rgba(183,30,82,0.12)"
                  : "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* ── Photo panel ── */}
              <motion.div
                layout="position"
                className="absolute left-0 top-0 bottom-0 overflow-hidden rounded-l-xl"
                animate={{
                  width: 260,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {/* Image */}
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    style={{
                      filter: isSelected ? "none" : "grayscale(20%)",
                      transition: "filter 0.4s",
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#1C1C2E] flex items-center justify-center">
                    <span className="member-display font-bold text-[64px] text-white/20">
                      {member.initials || member.name?.[0]}
                    </span>
                  </div>
                )}

                {/* Gradient overlay — always present, darkens bottom for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/80 via-[#1C1C2E]/20 to-transparent" />

                {/* Right-edge fade into stone when expanded */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent 55%, #F5F2ED 100%)",
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}
                />

                {/* Name + position — always visible at bottom, solid backdrop for legibility */}
                <AnimatePresence>
                  {!isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 px-5 pt-10 pb-5"
                      style={{
                        background: "linear-gradient(to top, rgba(15,14,42,0.92) 0%, rgba(15,14,42,0.6) 60%, transparent 100%)",
                      }}
                    >
                      {/* Name on a subtle semi-opaque backdrop */}
                      <div className="member-display font-bold text-[20px] text-white leading-tight drop-shadow-sm">
                        {member.name}
                      </div>
                      <div
                        className="member-mono text-[9px] tracking-[0.12em] uppercase mt-1.5 mb-3"
                        style={{ color: "#e8839f" }}
                      >
                        {member.position}
                      </div>

                      {/* Hint pill */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/12 border border-white/20 backdrop-blur-sm">
                        <span className="member-mono text-[8px] text-white/70 tracking-[0.1em] uppercase">View profile</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Detail panel ── */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    // exit={{
                    //   opacity: 0,
                    //   filter: "blur(4px)",
                    //   // Exit fast — fade out in the first half of the width collapse
                    //   transition: { duration: 0.18, ease: "easeIn", delay: 0 },
                    // }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                    className="absolute right-0 top-0 bottom-0 overflow-y-auto"
                    style={{ width: 300, background: "#F5F2ED" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected("") }}
                      className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white border border-[#E8E4DD] flex items-center justify-center text-stone-400 hover:text-[#B71E52] hover:border-[#B71E52] transition-all duration-200"
                    >
                      <X size={12} />
                    </button>

                    <div className="p-7 pt-6">
                      <MemberDetail member={member} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default Member