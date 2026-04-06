"use client"

import { ArrowUpRight, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

// import { useState, useEffect } from "react"
// import { Menu, X, ChevronDown } from "lucide-react"

interface DropdownItem {
  name: string
  href: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
}

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [openDropdown, setOpenDropdown] = useState<number | null>(null)

//   // 🔥 scroll logic
//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY

//       if (currentScrollY > lastScrollY && currentScrollY > 80) {
//         setShowNavbar(false) // scrolling down
//       } else {
//         setShowNavbar(true) // scrolling up
//       }

//       setLastScrollY(currentScrollY)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [lastScrollY])

  const navItems: NavItem[] = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    {name:"Funds", href:"/fund",
      dropdown:[
        {name:"NOF-I", href:"/fund/nofone"},
        {name:"NOF-II", href:"/fund/noftwo"},
        // {name:"Simrik Fund", href:"/fund/simrik"},
      ]
    },
    { name: "Program", href: "/program" },
    { name: "Career", href: "/career" },
    { name: "Team", href: "/team" },
    { name: "Insights", href: "/insights" },
    { name: "Tools", href: "/tools" },
  ]


//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300  mx-auto
//     ${showNavbar ? "translate-y-0" : "-translate-y-full"}
    
//   `}
//     >
//       <nav className=" backdrop-blur-lg border-b border-gray-200  mx-auto bg-transparent rounded-2xl ">
//         <div className="h-[2px] w-full bg-linear-to-r from-transparent via-primary-pink to-transparent " />
//         <div className="px-6 sm:px-8 lg:px-10 max-w-[80%] mx-auto">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <div className="shrink-0">
//               <a
//                 href="/"
//                 className="relative font-medium text-gray-700 transition-colors duration-200 hover:text-primary-pink"
//               >
//                 <img
//                   src="/aadhyanta/logomark.png"
//                   alt="aadhyanta-logo"
//                   className="h-full w-12"
//                 />
//               </a>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-center space-x-8">
//                 {navItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={() => item.dropdown && setOpenDropdown(index)}
//                     onMouseLeave={() => {
//                       setOpenDropdown(null)
//                     }}
//                   >
//                     <a
//                       href={item.href}
//                       className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium py-2 relative group"
//                     >
//                       {item.name}
//                       {item.dropdown && <ChevronDown size={16} />}
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary-pink"></span>
//                     </a>

//                     {/* Dropdown */}
//                     {item.dropdown && openDropdown === index && (
//                       <div className="absolute top-[36] left-[-50] transition-all  mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border  border-gray-100">
//                         {item.dropdown.map((dropItem, dropIndex) => (
//                           <a
//                             key={dropIndex}
//                             href={dropItem.href}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:"
//                           >
//                             {dropItem.name}
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 <button className="rounded-xl bg-primary-blue px-6 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
//                   LP Login
//                 </button>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden px-5 border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item, index) => (
//                 <>
//                   <a
//                     key={index}
//                     href={item.href}
//                     className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 border-b "
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.name}
//                     {item.dropdown && <ChevronDown size={16} color="#8E1A4E" />}
//                   </a>

//                   {item.dropdown && (
//                     <div className="transition-all  pl-5  bg-white rounded-lg py-2 z-50">
//                       {item.dropdown.map((dropItem, dropIndex) => (
//                         <a
//                           key={dropIndex}
//                           href={dropItem.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         >
//                           {dropItem.name}
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   )
// }

// export default Navbar

export function Navbar() {  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3
      ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200 ' : 'bg-transparent '}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#B71E52] flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-white text-lg leading-none">A</span>
          </div>
          <div>
            <div className={`font-display font-bold text-base leading-tight transition-colors duration-300
              ${scrolled ? 'text-[#1C1C2E]' : 'text-white'}`}>Aadhyanta</div>
            <div className={`font-mono-dm text-[9px] tracking-[0.12em] uppercase transition-colors duration-300
              ${scrolled ? 'text-stone-400' : 'text-white/50'}`}>Fund Management</div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className={`nav-link font-medium text-sm transition-colors duration-200
              ${scrolled ? 'text-stone-500 hover:text-[#1C1C2E]' : 'text-white/75 hover:text-white'}`}>{item.name}</a>
          ))}
          <a href="#" className="flex items-center gap-1.5 bg-[#B71E52] hover:bg-[#9e1847] text-white text-sm font-semibold px-5 py-2.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/25">
            Invest Now <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <X size={22} className={scrolled ? 'text-[#1C1C2E]' : 'text-white'} />
            : <Menu size={22} className={scrolled ? 'text-[#1C1C2E]' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 flex flex-col gap-3">
          {['About', 'Funds', 'Impact', 'Insights'].map(l => (
            <a key={l} href="#" className="text-stone-600 font-medium text-sm py-2 border-b border-stone-100">{l}</a>
          ))}
          <a href="#" className="mt-2 flex items-center justify-center gap-1.5 bg-[#B71E52] text-white text-sm font-semibold px-5 py-3 rounded">
            Invest Now <ArrowUpRight size={13} />
          </a>
        </div>
      )}
    </nav>
  )

}