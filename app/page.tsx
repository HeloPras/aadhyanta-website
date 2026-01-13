"use client"

import React, { useState } from "react"
import {
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import ScaleLetterText from "@/components/ui/scale-letter-text"

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

interface InsightCard {
  category: string
  title: string
  type: string
  date: string
}

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features: Feature[] = [
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Expert Portfolio Management",
      description:
        "Strategic investment solutions tailored to your financial goals with proven track records.",
    },
    {
      icon: <Shield className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Risk Management",
      description:
        "Comprehensive risk assessment and mitigation strategies to protect your investments.",
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Dedicated Advisory",
      description:
        "Personalized guidance from experienced financial advisors committed to your success.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" style={{ color: "#B71E52" }} />,
      title: "Real-Time Analytics",
      description:
        "Advanced reporting and insights to keep you informed about your portfolio performance.",
    },
  ]

  const stats: Stat[] = [
    { value: "$2.5B+", label: "Assets Under Management" },
    { value: "15+", label: "Years of Excellence" },
    { value: "5,000+", label: "Satisfied Clients" },
    { value: "98%", label: "Client Retention Rate" },
  ]

  const services: Service[] = [
    {
      title: "Wealth Management",
      description:
        "Comprehensive financial planning and investment management for high-net-worth individuals.",
      features: [
        "Portfolio Diversification",
        "Tax Optimization",
        "Estate Planning",
        "Retirement Strategies",
      ],
    },
    {
      title: "Institutional Services",
      description:
        "Tailored solutions for corporations, foundations, and institutional investors.",
      features: [
        "Custom Mandates",
        "ESG Integration",
        "Performance Reporting",
        "Regulatory Compliance",
      ],
    },
    {
      title: "Alternative Investments",
      description:
        "Access to exclusive investment opportunities across various asset classes.",
      features: [
        "Private Equity",
        "Real Estate",
        "Hedge Funds",
        "Venture Capital",
      ],
    },
  ]

  const insights: InsightCard[] = [
    {
      category: "Market Analysis",
      title: "Global Market Outlook 2025: Navigating Uncertainty",
      type: "Report",
      date: "15 Dec 2025",
    },
    {
      category: "Investment Strategy",
      title: "ESG Investing: The Future of Sustainable Returns",
      type: "Insight",
      date: "10 Dec 2025",
    },
    {
      category: "Private Capital",
      title: "Alternative Investments in a Rising Rate Environment",
      type: "Podcast",
      date: "5 Dec 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section - Inspired by A&O Shearman */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-gray-50 to-white">

        

        <div className="absolute -top-24 right-24 h-96 w-96 rounded-full bg-[#B71E52]/10 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6 text-[#B71E52]">
              Trusted by Global Investors
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-relaxed tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#161142] to-[#B71E52]">
              Investment excellence in a fast-changing world
            </h1>

            {/* <ScaleLetterText text="Investment excellence in a fast-changing world" className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-transparent" /> */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Strategic investment solutions backed by 15+ years of excellence.
              We manage your wealth with precision, transparency, and unwavering
              commitment to your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group bg-[#B71E52]  ">
                Explore Our Services
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center boder-[#161142] text-[#161142]">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section - A&O Shearman Style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
                About Aadhyanta Fund
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-relaxed text-[#161142]">
                See why we are uniquely equipped to support global investors
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We combine rigorous analysis, innovative strategies, and
                personalized attention to help you build and preserve wealth
                across generations. Our approach is grounded in deep market
                expertise and a commitment to excellence.
              </p>
              <a
                href="#about"
                className="inline-flex items-center font-semibold transition-colors duration-200 text-[#B71E52]"
              >
                Learn more about us
                <ChevronRight className="ml-1" size={20} />
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-[#161142]">
                Our Commitment
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle
                    className="w-6 h-6 mr-3 shrink-0 mt-0.5"
                    style={{ color: "#B71E52" }}
                  />
                  <span className="text-gray-700">
                    Transparent communication and regular portfolio updates
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-6 h-6 mr-3 shrink-0 mt-0.5"
                    style={{ color: "#B71E52" }}
                  />
                  <span className="text-gray-700">
                    Rigorous due diligence and risk management processes
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-6 h-6 mr-3 shrink-0 mt-0.5"
                    style={{ color: "#B71E52" }}
                  />
                  <span className="text-gray-700">
                    Access to institutional-quality investment opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="w-6 h-6 mr-3 shrink-0 mt-0.5"
                    style={{ color: "#B71E52" }}
                  />
                  <span className="text-gray-700">
                    Personalized strategies aligned with your goals
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Expertise
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Explore our capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our teams are known for the quality of their financial thinking
              and for creating cutting-edge investment strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 p-8 rounded-lg hover:shadow-xl transition-all duration-300 hover:border-transparent"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#161142]">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight
                        className="w-5 h-5 mr-2 shrink-0 mt-0.5"
                        style={{ color: "#B71E52" }}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center font-semibold transition-colors duration-200 group-hover:underline text-[#B71E52]"
                >
                  Learn more
                  <ChevronRight
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section - A&O Shearman Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
                Insights
              </div>
              <h2 className="text-4xl font-bold text-[#161142]">
                Spotlight on our latest thinking
              </h2>
            </div>
            <a
              href="#insights"
              className="hidden md:inline-flex items-center font-semibold transition-colors duration-200 text-[#B71E52]"
            >
              View all insights
              <ChevronRight className="ml-1" size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <a
                key={index}
                href="#"
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200"></div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 text-[#B71E52]">
                    {insight.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:underline text-[#161142]">
                    {insight.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{insight.type}</span>
                    <span>{insight.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Why Choose Aadhyanta Fund
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference of working with a premier fund
              management firm dedicated to your financial success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#161142]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161142]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Wealth?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors who trust us with their financial
            future. Schedule a consultation with our expert advisors today.
          </p>
          <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center bg-[#B71E52] ">
            Schedule Consultation
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
