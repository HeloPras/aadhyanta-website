'use client'

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Career', href: '/career' },
    //  {
    //   name: 'Services',
    //   href: '#services',
    //   dropdown: [
    //     { name: 'Web Development', href: '#web-dev' },
    //     { name: 'Mobile Apps', href: '#mobile' },
    //     { name: 'UI/UX Design', href: '#design' },
    //     { name: 'Consulting', href: '#consulting' }
    //   ]
    // },
    { name: 'Team', href: '/team' },
    { name: 'Press', href: '/press' },
    { name: 'Tools', href: '/tools' },
  ];

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/">
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
                    className="flex items-center gap-1 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium py-2 relative group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--primary-pink)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={16} />}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary-pink"></span>
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && openDropdown === index && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <a
                          key={dropIndex}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--primary-pink)"
                            e.currentTarget.style.color = "#B71E52"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ""
                            e.currentTarget.style.color = ""
                          }}
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className=" bg-primary-blue px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:cursor-pointer ">
                LP Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-150"
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
              <div key={index}>
                <a
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault()
                      setOpenDropdown(openDropdown === index ? null : index)
                    } else {
                      setIsOpen(false)
                    }
                  }}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Mobile Dropdown */}
                {item.dropdown && openDropdown === index && (
                  <div className="pl-6 space-y-1">
                    {item.dropdown.map((dropItem, dropIndex) => (
                      <a
                        key={dropIndex}
                        href={dropItem.href}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full mt-2 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 bg-primary-blue">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
};

export default Navbar;