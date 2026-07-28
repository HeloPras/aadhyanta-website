
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Phone, Mail, Linkedin, Twitter, ArrowRight } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER — Rich editorial dark footer
═══════════════════════════════════════════════════════════════════════════ */

const FOOTER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .footer-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -1px;
    height: 1px; width: 0;
    background: #B71E52;
    transition: width 0.25s ease;
  }
  .footer-link:hover { color: rgba(255,255,255,0.9); }
  .footer-link:hover::after { width: 100%; }

  .footer-nl-input {
    flex: 1;
    padding: 11px 16px;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 6px 0 0 6px;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
  }
  .footer-nl-input::placeholder { color: rgba(255,255,255,0.25); }
  .footer-nl-input:focus { border-color: #B71E52; }

  .footer-nl-btn {
    padding: 11px 18px;
    background: #B71E52;
    border: none;
    border-radius: 0 6px 6px 0;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    display: flex; align-items: center;
  }
  .footer-nl-btn:hover { background: #9e1847; transform: translateX(2px); }

  .footer-social-btn {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: all 0.2s;
  }
  .footer-social-btn:hover {
    border-color: #B71E52;
    color: #B71E52;
    background: rgba(183,30,82,0.08);
  }

  /* Animated crimson rule on fund stat */
  .fund-stat { position: relative; }
  .fund-stat::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: #B71E52;
    border-radius: 2px;
  }

  /* Dot pattern background */
  .footer-dot-bg {
    background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
  }
`

const funds = [
  { name: 'NOF I', href: '/fund/nofone', tag: 'Fully Deployed' },
  { name: 'NOF II', href: '/fund/noftwo', tag: 'Active' },
  // { name: 'Simrik Fund', href: '/fund/simrik', tag: 'Gender-Lens' },
  { name: 'Fund Overview', href: '/fund', tag: null },
]

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Accelerator', href: '/our-ecosystem' },
  { name: 'Contact', href: '/contact-us' },
]

const resources = [
  { name: 'Insights & Research', href: '/insights' },
  { name: 'Investment Tools', href: '/tools' },
  { name: 'Valuation Calculator', href: '/tools/revenue-valuation-calculator' },
  { name: 'Impact Reports', href: '/insights' },
]

function Footer() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />

      <footer
        className="footer-dot-bg"
        style={{ background: '#0E0D1F', borderTop: '3px solid #B71E52', fontFamily: "'Outfit', sans-serif" }}
      >

        {/* ── TOP STRIP — key stats ── */}


        {/* ── MAIN CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 lg:gap-12 mb-14">

            {/* ── Brand column ── */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-5">
                <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                  <div style={{ width: 40, height: 40 }}>
                    <Image
                      src="/logomark.png"
                      alt="Aadhyanta Fund"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1.1 }}>
                      Aadhyanta Fund
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                      Management Pvt. Ltd.
                    </div>
                  </div>
                </Link>
              </div>

              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: 240, marginBottom: 20 }}>
                SEBON-licensed institutional fund manager — deploying patient capital that transforms enterprises and communities across all seven provinces.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  { icon: <MapPin size={11} />, text: 'Dharamarg, Baluwatar-4, Kathmandu, Nepal' },
                  { icon: <Phone size={11} />, text: '+977-01-4526601', href: '' },
                  { icon: <Mail size={11} />, text: 'contact@aadhyanta.com', href: 'mailto:contact@aadhyanta.com' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.35)' }}>
                    <div style={{ flexShrink: 0, color: '#B71E52' }}>{c.icon}</div>
                    {c.href
                      ? <a href={c.href} className="footer-link" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.text}</a>
                      : <span style={{ fontSize: 12, fontFamily: "'Outfit', sans-serif" }}>{c.text}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ display: 'flex', gap: 8 }}>
                <a href="https://www.linkedin.com/company/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>

            {/* ── Funds column ── */}
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
                Our Funds
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {funds.map((l, i) => (
                  <a key={i} href={l.href} className="footer-link"
                    style={{ paddingTop: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between' }}>
                    <span>{l.name}</span>
                    {l.tag && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', background: 'rgba(183,30,82,0.2)', color: '#e8839f', borderRadius: 3 }}>
                        {l.tag}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Company column ── */}
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
                Company
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {company.map((l, i) => (
                  <a key={i} href={l.href} className="footer-link">{l.name}</a>
                ))}
              </div>
            </div>

            {/* ── Resources + Newsletter column ── */}
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
                Resources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {resources.map((l, i) => (
                  <a key={i} href={l.href} className="footer-link">{l.name}</a>
                ))}
              </div>

              {/* Newsletter mini-signup */}
              {/* <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                  The Dispatch
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, marginBottom: 12 }}>
                  Weekly capital markets insights, delivered.
                </p>
                <div style={{ display: 'flex' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="footer-nl-input"
                  />
                  <button className="footer-nl-btn" type="button" aria-label="Subscribe">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div> */}
            </div>

          </div>

          {/* ── SEBON badge strip ── */}
          {/* <div style={{
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              {['SEBON Licensed', 'SDG Aligned', 'Gender-Smart Capital', 'Impact Verified', 'IFC Supported'].map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#B71E52', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
            <a href="/contact-us"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                color: '#B71E52', textDecoration: 'none',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '10px'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '6px'}
            >
              Investor Inquiry <ArrowUpRight size={12} />
            </a>
          </div> */}

          {/* ── Bottom bar ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>
              © 2025 Aadhyanta Fund Management Pvt. Ltd. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Use', 'SEBON Disclosure'].map((l, i) => (
                <a key={i} href="#"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.18)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.18)'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer