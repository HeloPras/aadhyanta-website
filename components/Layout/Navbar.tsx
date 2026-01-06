"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

interface DropdownItem {
  name: string
  href: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  // 🔥 scroll logic
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false) // scrolling down
      } else {
        setShowNavbar(true) // scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems: NavItem[] = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Career", href: "/career" },
    { name: "Team", href: "/team" },
    { name: "Press", href: "/press" },
    { name: "Tools", href: "/tools" },
  ]

  return (
   <header
  className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
    ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
    
  `}
>
<nav className=" backdrop-blur-lg border-b border-gray-200  mx-auto bg-transparent rounded-2xl ">
<div className="h-[2px] w-full bg-linear-to-r from-transparent via-primary-pink to-transparent " />

        <div className="px-6 sm:px-8 lg:px-10 max-w-[80%] mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <a
                href="/"
                className="relative font-medium text-gray-700 transition-colors duration-200 hover:text-primary-pink"
              >
                <span className="text-2xl font-bold cursor-pointer text-primary-pink">
                  Brand
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setOpenDropdown(index)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium py-2 relative group"
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown size={16} />}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary-pink"></span>
                    </a>

                    {/* Dropdown */}
                    {item.dropdown && openDropdown === index && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={dropItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {dropItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button className="rounded-xl bg-primary-blue px-6 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  LP Login
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

    </header>
  )
}

export default Navbar
