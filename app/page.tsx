
'use client'

import {
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Building2,
} from "lucide-react"
import {
  motion
} from "framer-motion"
import ModalDemo from "@/components/Pages/Landing/fundmodal"
import WorkWithUsSection from "@/components/Pages/Landing/workwithussection"
import { ScrollReveal } from "@/components/ui/scrollreveal"

import { cardUp, cardZoom, fadeLeft, fadeRight, fadeUp, slideFromRight, springPop, zoomIn } from '@/util/animation/animaitonhelper';
import { StaggerReveal } from "@/components/ui/staggerreveal"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface Service {
  title: string
  description: string
  features: string[]
}

interface Highlight {
  title: string
  description: string
  icon: React.ReactNode
}



const LandingPage: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Expert Portfolio Management",
      description: "Strategic investment solutions tailored to your financial goals with proven track records.",
    },
    {
      icon: <Shield className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies to protect your investments.",
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Dedicated Advisory",
      description: "Personalized guidance from experienced financial advisors committed to your success.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Real-Time Analytics",
      description: "Advanced reporting and insights to keep you informed about your portfolio performance.",
    },
  ]

  const stats: Stat[] = [
    { value: "Rs. 320M+", label: "Capital Mobilized" },
    { value: "200+", label: "Enterprises Supported" },
    { value: "3", label: "Active Funds" },
  ]

  const services: Service[] = [
    {
      title: "Fund Management",
      description:
        "We manage three institutional funds totaling NPR 320M+ in committed capital, deploying growth equity to market-proven enterprises across all seven provinces of Nepal.",
      features: [
        "Nepal Opportunity Fund I & II",
        "Simrik Fund (gender-lens investing)",
        "Sector-agnostic approach",
        "5-7 year hold periods",
      ],
    },
    {
      title: "Ecosystem Building",
      description:
        "Through targeted accelerator programs and technical assistance, we transform early-stage ventures into investment-ready enterprises capable of absorbing institutional capital.",
      features: [
        "Comprehensive accelerator programs",
        "Investment readiness training",
        "Market linkage support",
        "Governance strengthening",
      ],
    },
    {
      title: "Impact & Inclusion",
      description:
        "Every investment decision integrates rigorous impact measurement, targeting job creation, gender inclusion, climate resilience, and sustainable development aligned with national priorities.",
      features: [
        "SDG-aligned investments",
        "Gender lens integration",
        "Climate impact measurement",
        "Livelihood creation focus",
      ],
    },
  ]

  const funds = [
    {
      title: "Nepal Opportunity Fund I",
      focus: "Market-proven growth enterprises",
      description:
        "Our flagship fund targets established businesses with proven business models, strong management teams, and clear growth trajectories. NOF I provides patient growth capital with active governance support.",
      features: [
        "Sector-agnostic approach",
        "All seven provinces",
        "NPR 10-50M ticket sizes",
        "5-7 year hold periods",
        "Board representation",
      ],
    },
    {
      title: "Nepal Opportunity Fund II",
      focus: "Follow-on and new investments",
      description:
        "Building on NOF I's success, our second fund continues supporting portfolio companies while identifying new high-potential enterprises ready for institutional capital and strategic growth partnerships.",
      features: [
        "Follow-on capacity",
        "Larger ticket sizes",
        "Proven track record",
        "Enhanced due diligence",
        "Portfolio synergies",
      ],
    },
    {
      title: "Simrik Fund",
      focus: "Gender-lens investing",
      description:
        "Nepal's first gender-lens investment fund, managed by an all-women deal team. Simrik targets women-led enterprises and businesses with significant women beneficiaries, addressing critical financing gaps.",
      features: [
        "Women-led businesses",
        "Women workforce focus",
        "All-women deal team",
        "Gender-smart design",
        "Inclusion metrics",
      ],
    },
  ]

  const highlights: Highlight[] = [
    {
      icon: <Users className="w-10 h-10" style={{ color: "#B71E52" }} />,
      title: "Simrik Fund Launch",
      description:
        "Nepal's first gender-lens investment fund, managed by an all-women deal team, targeting women-led and women-benefiting enterprises. This pioneering initiative addresses the critical financing gap faced by women entrepreneurs.",
    },
    {
      icon: <TrendingUp className="w-10 h-10" style={{ color: "#B71E52" }} />,
      title: "Koshi Accelerator Program",
      description:
        "A targeted provincial development initiative supporting enterprises in Nepal's Koshi Province, strengthening local economic ecosystems through capital access, technical assistance, and market linkages.",
    },
    {
      icon: <Building2 className="w-10 h-10" style={{ color: "#B71E52" }} />,
      title: "DV Excellus Partnership",
      description:
        "Strategic growth investment in one of Nepal's leading manufacturing enterprises, showcasing our approach to value creation through governance strengthening, operational excellence, and market expansion support.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — cascading fade-up on mount (no scroll needed) ── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6 text-[#B71E52]"
            >
              Nepal's Impact Investment Pioneer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-relaxed tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#161142] to-[#B71E52]"
            >
              Mobilizing Capital That Transforms
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              We deploy growth capital and build investment-ready ecosystems across Nepal, bridging the gap between
              ambitious enterprises and institutional investors. As Nepal's first SEBON-licensed institutional fund
              manager, we combine rigorous financial discipline with deep impact commitment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group bg-[#B71E52] cursor-pointer">
                For Enterprises
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="px-8 py-4 cursor-pointer rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center border-[#161142] text-[#161142]">
                For Investors
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats — spring bounce, staggered per number ── */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerReveal
            className="grid grid-cols-2 md:grid-cols-3 border border-gray-200 divide-x divide-y md:divide-y-0 divide-gray-200"
            childVariants={springPop}
            staggerDelay={0.1}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-8 py-10">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Featured — opposing horizontal slides; checklist slides from right ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal variants={fadeLeft}>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
                About Aadhyanta Fund
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-relaxed text-[#161142]">
                See why we are uniquely equipped to support global investors
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We combine rigorous analysis, innovative strategies, and personalized attention to help you build and
                preserve wealth across generations.
              </p>
              <a href="#about" className="inline-flex items-center font-semibold transition-colors duration-200 text-[#B71E52]">
                Learn more about us <ChevronRight className="ml-1" size={20} />
              </a>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight}>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-[#161142]">Our Commitment</h3>
                <StaggerReveal
                  className="space-y-4"
                  childVariants={slideFromRight}
                  staggerDelay={0.09}
                >
                  {[
                    "Transparent communication and regular portfolio updates",
                    "Rigorous due diligence and risk management processes",
                    "Access to institutional-quality investment opportunities",
                    "Personalized strategies aligned with your goals",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start list-none">
                      <CheckCircle className="w-6 h-6 mr-3 shrink-0 mt-0.5" style={{ color: "#B71E52" }} />
                      <span className="text-gray-700">{text}</span>
                    </li>
                  ))}
                </StaggerReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Services — heading fades up; cards stagger up ── */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variants={fadeUp} className="text-center mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">What We Do</div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">Capital Meets Capability</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aadhyanta stands at the intersection of institutional finance and transformative impact. We don't just
              deploy capital—we build the entire ecosystem that makes growth sustainable, inclusive, and scalable
              across Nepal's diverse provinces.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-8" childVariants={cardUp} staggerDelay={0.11}>
            {services.map((service, index) => (
              <div key={index} className="group bg-white border border-gray-200 p-8 rounded-lg hover:shadow-xl transition-all duration-300 hover:border-transparent">
                <h3 className="text-2xl font-bold mb-4 text-[#161142]">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 shrink-0 mt-0.5" style={{ color: "#B71E52" }} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Highlights — heading fades up; cards zoom-in stagger ── */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variants={fadeUp} className="mb-12">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Recent Highlights
            </div>
            <h2 className="text-4xl font-bold text-[#161142]">Building Nepal's Investment Future</h2>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-8" childVariants={cardZoom} staggerDelay={0.13}>
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="mb-6">{highlight.icon}</div>
                <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "#161142" }}>
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Work With Us ── */}
      <div className="border-b border-gray-200">
        <WorkWithUsSection />
      </div>

      {/* ── Funds — opposing slides ── */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal variants={fadeLeft}>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: "#B71E52" }}>
                Our Funds
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: "#161142" }}>
                Three Vehicles, One Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We manage three complementary institutional funds, each designed to address specific market
                opportunities while maintaining our core commitment to growth capital deployment and transformative
                impact across Nepal's economy.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight}>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="space-y-6">
                  <ModalDemo highlights={funds} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Features — stagger up ── */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">Why Choose Aadhyanta Fund</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference of working with a premier fund management firm dedicated to your financial success.
            </p>
          </ScrollReveal>

          <StaggerReveal
            className="grid md:grid-cols-2 lg:grid-cols-4 border border-gray-200 divide-x divide-y lg:divide-y-0 divide-gray-200"
            childVariants={cardUp}
            staggerDelay={0.09}
          >
            {features.map((feature, index) => (
              <div key={index} className="p-8 hover:bg-gray-50 transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#161142]">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── CTA — zoom-in as single confident block ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161142]">
        <ScrollReveal variants={zoomIn} className="max-w-4xl mx-auto text-center" threshold={0.2}>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Grow Your Wealth?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors who trust us with their financial future. Schedule a consultation with our
            expert advisors today.
          </p>
          <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center bg-[#B71E52]">
            Schedule Consultation
            <ArrowRight className="ml-2" size={20} />
          </button>
        </ScrollReveal>
      </section>

    </div>
  )
}

export default LandingPage