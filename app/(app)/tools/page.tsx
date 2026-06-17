'use client'

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/Layout/Navbar"
import {sfl,container, sfd} from '@/util/animation/framer-helper'
import {
  ArrowUpRight, BarChart3, FileText, Scale,
  TrendingUp, ArrowRight
} from "lucide-react"
import { motion } from "motion/react"

const tools = [
  {
    name: "Term Sheet Generator",
    link: "/tools/term-sheet-generator",
    tag: "Legal & Deal",
    description:
      "Generate clean, investor-ready term sheets in minutes. Covers equity structure, valuation cap, liquidation preferences, and governance rights.",
    icon: <FileText size={20} />,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    badge: "New",
  },
  {
    name: "Balance Sheet Calculator",
    link: "/tools/balance-sheet-calculator",
    tag: "Financial Statements",
    description:
      "Generate a clean balance sheet snapshot — assets, liabilities, and equity — and understand what investors see when reviewing your financial position.",
    icon: <Scale size={20} />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    badge: null,
  },
  {
    name: "Income Statement Calculator",
    link: "/tools/income-statement-calculator",
    tag: "Financial Statements",
    description:
      "Build a profit & loss statement from your operational numbers. Understand gross profit, operating expenses, and net margin at a glance.",
    icon: <BarChart3 size={20} />,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80",
    badge: null,
  },
  {
    name: "Revenue Valuation Calculator",
    link: "/tools/revenue-valuation-calculator",
    tag: "Investor Readiness",
    description:
      "Estimate your enterprise valuation using industry-standard revenue multiples — the same methodology used by Nepal's institutional investors.",
    icon: <TrendingUp size={20} />,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    badge: null,
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
const ToolsPage = () => {
  return (
    <>
      {/* <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} /> */}
      {/* <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} /> */}

      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Navbar variant="nontransparent" />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative bg-[#F5F2ED] border-b border-[#E8E4DD] overflow-hidden dot-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              {/* Left */}
              <motion.div
              variants={container}
              initial = 'hidden'
              animate = 'visible'
              >
                <motion.div
                variants={sfl}

                 className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] shrink-0" />
                  <span
                    className="font-mono-dm"
                    style={{
                      fontSize: 10,
                      color: "#B71E52",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Investment Tools
                  </span>
                </motion.div>

                <motion.h1
                variants={sfl}
                  className="sr d1 font-display font-bold text-[#1C1C2E] leading-none mb-6"
                  style={{ fontSize: "clamp(48px, 6.5vw, 80px)" }}
                >
                  Powerful
                  <br />
                  <em style={{ fontStyle: "italic", color: "#B71E52" }}>
                    Business Tools
                  </em>
                </motion.h1>

                <motion.p
                variants={sfl}
                  className="sr d2 leading-[1.85] max-w-md"
                  style={{ fontSize: 16, color: "#6B7280" }}
                >
                  A suite of carefully crafted tools designed to simplify
                  complex financial decisions, improve accuracy, and accelerate
                  your path to institutional investment readiness.
                </motion.p>
              </motion.div>

              {/* Right — stat chips */}
              <motion.div
                variants={container}
                initial = "hidden"
                animate = "visible"
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { val: "4", label: "Free Tools" },
                  { val: "3", label: "Financial Calculators" },
                  { val: "1", label: "Deal Generator" },
                  { val: "0", label: "Sign-up Required" },
                ].map((s, i) => (
                  <motion.div
                  variants={sfd}
                    key={i}
                    className="bg-white border border-[#E8E4DD] rounded-xl p-5"
                  >
                    <div
                      className="font-display font-bold text-[#1C1C2E] leading-none mb-1.5"
                      style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="font-mono-dm"
                      style={{
                        fontSize: 10,
                        color: "#9CA3AF",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TOOLS GRID ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section label */}
            <div className="sr flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-mono-dm block mb-3"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#B71E52",
                  }}
                >
                  All Tools
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display font-bold text-[#1C1C2E] leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
                >
                  Start with what you{" "}
                  <em style={{ fontStyle: "italic", color: "#B71E52" }}>
                    need
                  </em>
                </motion.h2>
              </div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-mono-dm"
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  letterSpacing: "0.08em",
                }}
              >
                {tools.length} tools available
              </motion.span>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {tools.map((tool, i) => (
                <motion.div
                key={tool.name}
                initial= {{opacity:0,y:20}}
                whileInView={{opacity:1,y:0}}
                transition={{delay:i*0.09, duration:0.3}}

                >
                  <Link
                    key={i}
                    href={tool.link}
                    className={`group block bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden hover:translate-y-[-2px] transition-all duration-100`}
                    style={{ textDecoration: "none" }}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: 180 }}
                    >
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="tool-img w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(28,28,46,0.55) 0%, transparent 60%)",
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className="font-mono-dm"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "4px 10px",
                            background: "#B71E52",
                            color: "#fff",
                            borderRadius: 3,
                          }}
                        >
                          {tool.tag}
                        </span>
                        {tool.badge && (
                          <span
                            className="font-mono-dm"
                            style={{
                              fontSize: 9,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              padding: "4px 10px",
                              background: "#1C1C2E",
                              color: "#fff",
                              borderRadius: 3,
                            }}
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      {/* Arrow — appears on hover */}
                      <div className="tool-arrow absolute top-3 right-3">
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ArrowUpRight
                            size={13}
                            style={{ color: "#1C1C2E" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "20px 22px 24px" }}>
                      {/* Icon + Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "#f5e8ed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#B71E52",
                            flexShrink: 0,
                          }}
                        >
                          {tool.icon}
                        </div>
                        <h3
                          className="font-display font-bold text-[#1C1C2E] leading-tight mt-1"
                          style={{ fontSize: 18 }}
                        >
                          {tool.name}
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          lineHeight: 1.75,
                          marginBottom: 16,
                        }}
                      >
                        {tool.description}
                      </p>

                      <div className="relative inline-block">
                        <div
                          className="flex items-center   gap-1.5 group-hover:gap-2 transition-all duration-300  "
                          style={{ color: "#B71E52" }}
                        >
                          <span
                            className="font-mono-dm "
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              fontWeight: 600,
                            }}
                          >
                            Open Tool
                          </span>
                          <ArrowRight size={13} />
                        </div>
                        <div className=" relative w-0 left-0 bottom-0 h-px group-hover:bg-[#B71E52] group-hover:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ──────────────────────────────────────────── */}
        {/* <section className="bg-[#F5F2ED] border-t border-[#E8E4DD] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono-dm mb-2" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B71E52' }}>
                More Coming Soon
              </div>
              <div className="font-display font-bold text-[#1C1C2E] leading-tight" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>
                Have a tool request? <em style={{ fontStyle: 'italic', color: '#B71E52' }}>Tell us.</em>
              </div>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex bg-[#1C1C2E] items-center gap-2 font-semibold transition-all duration-200 hover:bg-[#B71E52]"
              style={{
                fontSize: 14, padding: '13px 28px', borderRadius: 8,
                 color: '#fff', textDecoration: 'none',
              }}
            >
              Suggest a Tool <ArrowRight size={15} />
            </Link>
          </div>
        </section> */}
      </div>
    </>
  )
}

export default ToolsPage