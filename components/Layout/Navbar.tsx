"use client"

import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type NavbarProp = {
  variant?: "transparent" | "nontransparent"
}

interface DropdownItem {
  name: string
  href: string
  tag?: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  {
    name: "Funds",
    href: "/fund",
    dropdown: [
      { name: "NOF-I", href: "/fund/nofone", tag: "Fully Deployed" },
      { name: "NOF-II", href: "/fund/noftwo", tag: "Active" },
      // { name: "Simrik Fund", href: "/fund/simrik", tag: "Gender-Lens" },
    ],
  },
  { name: "Our Ecosystem", href: "/our-ecosystem" },
  { name: "Team", href: "/team" },
  { name: "Insights", href: "/insights" },
  { name: "Tools", href: "/tools" },
  { name: "Contact", href: "/contact-us" },
]

/* ─── Desktop nav item with dropdown ──────────────────────────────────── */
function NavLink({
  item,
  light,
}: {
  item: NavItem
  light: boolean
}) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        className={`nav-link font-medium text-md transition-colors duration-200
          ${light ? "text-white/75 hover:text-white" : "text-stone-500 hover:text-[#1C1C2E]"}`}
      >
        {item.name}
      </a>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 font-medium text-md transition-colors duration-200 cursor-pointer
          ${light ? "text-white/75 hover:text-white" : "text-stone-500 hover:text-[#1C1C2E]"}`}
      >
        {item.name}
        <ChevronDown
          size={14}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className="absolute left-1/2 top-full pt-3"
        style={{
          transform: "translateX(-50%)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          translate: open ? "0 0" : "0 -4px",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          className="bg-white rounded-xl border border-[#E8E4DD] shadow-xl overflow-hidden"
          style={{ minWidth: 220 }}
        >
          {/* Parent overview link */}
          <a
            href={item.href}
            className="block px-5 py-3.5 border-b border-[#E8E4DD] hover:bg-[#F5F2ED] transition-colors duration-150"
          >
            <div className="font-display font-bold text-[15px] text-[#1C1C2E] leading-tight">
              {item.name} Overview
            </div>
            <div className="font-mono-dm text-[9px] text-stone-400 tracking-widest uppercase mt-0.5">
              See all {item.name.toLowerCase()}
            </div>
          </a>

          {/* Dropdown items */}
          <div className="py-1.5">
            {item.dropdown.map(d => (
              <a
                key={d.name}
                href={d.href}
                className="flex items-center justify-between px-5 py-2.5 hover:bg-[#F5F2ED] transition-colors duration-150 group"
              >
                <span className="text-[13px] font-medium text-stone-600 group-hover:text-[#1C1C2E] transition-colors duration-150">
                  {d.name}
                </span>
                {d.tag && (
                  <span
                    className="font-mono-dm text-[8px] tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{ background: "#f5e8ed", color: "#B71E52" }}
                  >
                    {d.tag}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile accordion nav item ───────────────────────────────────────── */
function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        className="text-stone-600 font-medium text-sm py-2 border-b border-stone-100 block"
      >
        {item.name}
      </a>
    )
  }

  return (
    <div className="border-b border-stone-100">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-stone-600 font-medium text-sm py-2"
      >
        {item.name}
        <ChevronDown
          size={16}
          className="transition-transform duration-200 text-stone-400"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.25s ease",
        }}
      >
        <div className="pb-2 pl-3 flex flex-col gap-0.5">
          <a
            href={item.href}
            className="text-stone-500 text-[13px] py-2 flex items-center justify-between"
          >
            <span>{item.name} Overview</span>
          </a>
          {item.dropdown.map(d => (
            <a
              key={d.name}
              href={d.href}
              className="text-stone-500 text-[13px] py-2 flex items-center justify-between"
            >
              <span>{d.name}</span>
              {d.tag && (
                <span
                  className="font-mono-dm text-[8px] tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ background: "#f5e8ed", color: "#B71E52" }}
                >
                  {d.tag}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Navbar({ variant = "transparent" }: NavbarProp) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const solid = scrolled || variant !== "transparent"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3
      ${solid ? "bg-white/95 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/">
            <Image alt="logo" height={50} width={50} src={"/logomark.png"} />
          </a>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <NavLink key={item.name} item={item} light={!solid} />
          ))}
          <a
            href="/contact-us?topic=investor"
            className="flex items-center gap-1.5 bg-[#B71E52] hover:bg-[#9e1847] text-white text-sm font-semibold px-5 py-2.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25"
          >
            Invest Now <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={22} className={solid ? "text-[#1C1C2E]" : "text-white"} />
          ) : (
            <Menu size={22} className={solid ? "text-[#1C1C2E]" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-64px)] overflow-y-auto">
          {navItems.map(item => (
            <MobileNavItem key={item.name} item={item} />
          ))}
          <a
            href="/contact-us?topic=investor"
            className="mt-3 flex items-center justify-center gap-1.5 bg-[#B71E52] text-white text-sm font-semibold px-5 py-3 rounded"
          >
            Invest Now <ArrowUpRight size={13} />
          </a>
        </div>
      )}
    </nav>
  )
}