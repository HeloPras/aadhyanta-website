"use client"
import React, { useState } from "react"
import { Award, Briefcase, GraduationCap, ChevronRight } from "lucide-react"
import Member from "@/components/Pages/Teams/member"

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Michael Chen",
      position: "Chief Executive Officer",
      department: "Executive",
      bio: "Michael brings over 25 years of leadership experience in asset management and private equity. He has successfully managed portfolios exceeding $10 billion and led multiple firms through periods of significant growth.",
      experience: "25+ years in Asset Management",
      education: "MBA, Harvard Business School",
      specialties: [
        "Strategic Planning",
        "M&A",
        "Corporate Governance",
        "Leadership",
      ],
      initials: "MC"    ,
      image: "/aadhyanta/Team/Copy of DSC01254.JPG",
    },


    {
      name: "Sarah Williams",
      position: "Chief Investment Officer",
      department: "Investment",
      bio: "Sarah is a seasoned portfolio manager with an exceptional track record of delivering alpha. Her quantitative approach and deep market insights have consistently outperformed benchmarks.",
      experience: "20+ years in Portfolio Management",
      education: "CFA, MS Finance - MIT",
      specialties: [
        "Portfolio Strategy",
        "Quantitative Analysis",
        "Risk Assessment",
        "Global Markets",
      ],
      initials: "SW",
    },
    {
      name: "David Martinez",
      position: "Head of Risk Management",
      department: "Operations",
      bio: "David specializes in comprehensive risk assessment and mitigation strategies. His PhD research focused on market volatility and systematic risk in emerging markets.",
      experience: "18+ years in Risk Management",
      education: "PhD Financial Engineering - Stanford",
      specialties: [
        "Risk Modeling",
        "Compliance",
        "Derivatives",
        "Stress Testing",
      ],
      initials: "DM",
    },
    {
      name: "Emily Thompson",
      position: "Managing Director",
      department: "Executive",
      bio: "Emily oversees strategic growth initiatives and institutional client relationships. She has been instrumental in expanding our global footprint and establishing key partnerships.",
      experience: "22+ years in Business Development",
      education: "MBA, Wharton School",
      specialties: [
        "Business Development",
        "Strategic Partnerships",
        "Client Strategy",
        "Market Expansion",
      ],
      initials: "ET",
    },
    {
      name: "James Anderson",
      position: "Senior Portfolio Manager",
      department: "Investment",
      bio: "James manages our equity portfolios with a focus on technology and healthcare sectors. His research-driven approach has generated consistent returns for our clients.",
      experience: "15+ years in Equity Research",
      education: "CFA, MBA - Columbia",
      specialties: [
        "Equity Analysis",
        "Sector Research",
        "Tech & Healthcare",
        "Value Investing",
      ],
      initials: "JA",
    },
    {
      name: "Lisa Wong",
      position: "Director of Operations",
      department: "Operations",
      bio: "Lisa ensures operational excellence across all our processes. Her expertise in compliance and regulatory frameworks keeps our operations running smoothly and securely.",
      experience: "16+ years in Operations",
      education: "MS Operations Management",
      specialties: [
        "Operations Management",
        "Compliance",
        "Process Optimization",
        "Technology Integration",
      ],
      initials: "LW",
    },
    {
      name: "Robert Kim",
      position: "Head of Fixed Income",
      department: "Investment",
      bio: "Robert leads our fixed income strategies with expertise in bonds, credit analysis, and interest rate management. His conservative approach balances growth with capital preservation.",
      experience: "19+ years in Fixed Income",
      education: "CFA, MBA - NYU Stern",
      specialties: [
        "Bond Markets",
        "Credit Analysis",
        "Duration Management",
        "Yield Strategies",
      ],
      initials: "RK",
    },
    {
      name: "Jennifer Lee",
      position: "Director of Client Relations",
      department: "Client Relations",
      bio: "Jennifer builds and maintains strong relationships with our high-net-worth clients. Her personalized approach ensures each client receives tailored investment solutions.",
      experience: "14+ years in Client Services",
      education: "MBA, CFP - UC Berkeley",
      specialties: [
        "Client Advisory",
        "Wealth Planning",
        "Relationship Management",
        "Financial Planning",
      ],
      initials: "JL",
    },
    {
      name: "Thomas Brown",
      position: "VP Alternative Investments",
      department: "Investment",
      bio: "Thomas specializes in private equity, hedge funds, and real estate investments. He identifies unique opportunities that provide diversification and enhanced returns.",
      experience: "12+ years in Alternatives",
      education: "CFA, MS Real Estate Finance",
      specialties: [
        "Private Equity",
        "Real Estate",
        "Hedge Funds",
        "Alternative Strategies",
      ],
      initials: "TB",
    },
    {
      name: "Maria Garcia",
      position: "Senior Client Advisor",
      department: "Client Relations",
      bio: "Maria provides comprehensive financial guidance to our institutional clients. Her analytical skills and market knowledge help clients navigate complex investment decisions.",
      experience: "11+ years in Advisory",
      education: "CFP, MBA - Georgetown",
      specialties: [
        "Institutional Advisory",
        "Portfolio Construction",
        "Asset Allocation",
        "Performance Analysis",
      ],
      initials: "MG",
    },
    {
      name: "Kevin Zhang",
      position: "Head of Research",
      department: "Investment",
      bio: "Kevin leads our research team in conducting in-depth market analysis and investment research. His insights drive our investment strategies and decision-making processes.",
      experience: "17+ years in Research",
      education: "PhD Economics - Princeton",
      specialties: [
        "Economic Research",
        "Market Analysis",
        "Quantitative Models",
        "Investment Research",
      ],
      initials: "KZ",
    },
    {
      name: "Amanda Brooks",
      position: "VP Client Experience",
      department: "Client Relations",
      bio: "Amanda is dedicated to ensuring exceptional client experiences. She oversees client communications, reporting, and satisfaction initiatives across all touchpoints.",
      experience: "13+ years in Client Success",
      education: "MBA - Northwestern Kellogg",
      specialties: [
        "Client Experience",
        "Service Excellence",
        "Communication Strategy",
        "Client Retention",
      ],
      initials: "AB",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: "#161142" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(183, 30, 82, 0.3) 35px, rgba(183, 30, 82, 0.3) 70px)",
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Our Team
            </h1>
            <p className="text-2xl text-gray-300 leading-relaxed">
              Meet the exceptional professionals driving investment excellence
              and delivering results for our clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">
                150+
              </div>
              <div className="text-gray-600 font-medium">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">
                450+
              </div>
              <div className="text-gray-600 font-medium">
                Years Combined Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">
                85%
              </div>
              <div className="text-gray-600 font-medium">
                Hold Advanced Degrees
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#161142]">
                40+
              </div>
              <div className="text-gray-600 font-medium">
                CFA Charterholders
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Leadership Section */}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Leadership
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Executive team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Strategic leaders with decades of experience guiding global
              investment strategies
            </p>
          </div>

          <div className=" mb-20">
            <Member teamMembers={teamMembers} department="Executive"></Member>
          </div>

          {/* Investment Team */}
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Portfolio Management
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Investment team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Expert portfolio managers and analysts driving superior investment
              performance
            </p>
          </div>

          <div className=" gap-8 mb-20">
            <Member teamMembers={teamMembers} department="Investment"></Member>
          </div>

          {/* Operations & Client Relations */}
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Support Teams
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              Operations & client relations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Dedicated professionals ensuring operational excellence and
              exceptional client service
            </p>
          </div>

          <div className="gap-8">
            <Member teamMembers={teamMembers} department="Operations"></Member>
          </div>
        </div>
      </section>

      {/* Featured Section - Culture & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
                Our Culture
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight text-[#161142]">
                Where talent meets opportunity
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Aadhyanta Fund, we cultivate an environment where exceptional
                professionals can thrive, innovate, and make meaningful
                contributions to our clients' success. Our culture emphasizes
                collaboration, continuous learning, and excellence in everything
                we do.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We invest in our team through professional development programs,
                industry certifications, and opportunities to work on
                challenging, high-impact projects alongside some of the
                brightest minds in finance.
              </p>
              <a
                href="#careers"
                className="inline-flex items-center font-semibold text-lg transition-colors duration-200 text-[#B71E52]"
              >
                Explore career opportunities
                <ChevronRight className="ml-1" size={20} />
              </a>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-[#161142]">
                What We Offer
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 shrink-0 mt-0.5 text-[#B71E52]" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Competitive Compensation
                    </div>
                    <div className="text-gray-600 text-sm">
                      Market-leading salaries and performance-based bonuses
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flexnk-0 mt-0.5 text-[#B71E52]" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Professional Development
                    </div>
                    <div className="text-gray-600 text-sm">
                      Support for CFA, MBA, and other certifications
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flexnk-0 mt-0.5 text-[#B71E52]" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Global Opportunities
                    </div>
                    <div className="text-gray-600 text-sm">
                      Work across our international offices and diverse markets
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flexnk-0 mt-0.5 text-[#B71E52]" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Inclusive Environment
                    </div>
                    <div className="text-gray-600 text-sm">
                      Diverse team with equal opportunities for all
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#B71E52]">
              Team Voices
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#161142]">
              What our team says
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                "The collaborative environment and access to sophisticated
                investment strategies make every day a learning opportunity.
                I've grown more here in three years than in the previous decade
                of my career."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 bg-[#161142]">
                  JA
                </div>
                <div>
                  <div className="font-bold text-[#161142]">James Anderson</div>
                  <div className="text-sm text-gray-600">
                    Senior Portfolio Manager
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                "What sets Aadhyanta apart is the genuine commitment to both
                client success and employee development. The leadership truly
                invests in helping us reach our full potential."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 bg-[#161142]">
                  JL
                </div>
                <div>
                  <div className="font-bold text-[#161142]">Jennifer Lee</div>
                  <div className="text-sm text-gray-600">
                    Director of Client Relations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#161142]">
            Join our team
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're always looking for talented professionals who share our
            commitment to excellence and client success. Explore career
            opportunities at Aadhyanta Fund.
          </p>
          <div className="flex flexsm:flexgap-4 justify-center">
            <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group bg-[#B71E52]">
              View Open Positions
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center border-[#161142]  bg-[#161142] text-white">
              Contact Recruitment
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamPage
