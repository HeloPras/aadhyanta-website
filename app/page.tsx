
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
import ModalDemo from "@/components/Pages/Landing/fundmodal"

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
    { value: "Rs. 320M+", label: "Capital Mobilized" },
    { value: "200+", label: "Enterprises Supported" },
    // { value: "40+", label: "Banking Partners" },
    { value: "3", label: "Active Funds" },
    // { value: "", label: "" },
    // { value: "6+", label: "Development Partners" },
    // { value: "1st", label: "Gender-Lens Fund" },
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
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-gray-50 to-white">
        <div className="absolute top-24 right-24 h-96 w-96 rounded-full bg-[#B71E52]/10 blur-3xl" />
        <div className="absolute top-1/2 left-24 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6 text-[#B71E52]">
              Nepal's Impact Investment Pioneer
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-relaxed tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#161142] to-[#B71E52]">
              Mobilizing Capital That Transforms
            </h1>

            {/* <ScaleLetterText text="Investment excellence in a fast-changing world" className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-transparent" /> */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              We deploy growth capital and build investment-ready ecosystems
              across Nepal, bridging the gap between ambitious enterprises and
              institutional investors. As Nepal's first SEBON-licensed
              institutional fund manager, we combine rigorous financial
              discipline with deep impact commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group bg-[#B71E52]  ">
                For Enterprises
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center boder-[#161142] text-[#161142]">
                For Investors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20  pt-20 bg-white border-t border-b border-gray-100">
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
              What We Do
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Capital Meets Capability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aadhyanta stands at the intersection of institutional finance and
              transformative impact. We don't just deploy capital—we build the
              entire ecosystem that makes growth sustainable, inclusive, and
              scalable across Nepal's diverse provinces.
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="text-sm font-semibold uppercase tracking-wide mb-4"
                style={{ color: "#B71E52" }}
              >
                Our Funds
              </div>
              <h2
                className="text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#161142" }}
              >
               Three Vehicles, One Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We manage three complementary institutional funds, each designed
                to address specific market opportunities while maintaining our
                core commitment to growth capital deployment and transformative
                impact across Nepal's economy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="space-y-6">
                <ModalDemo highlights={funds}></ModalDemo>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
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
