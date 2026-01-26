import React from 'react';
import { Award, Target, Eye, Heart, TrendingUp, Users, Globe, Briefcase, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { teamMembers } from '@/data/team';

interface approach {
  icon: React.ReactNode;
  title: string;
  description: string;
  features:string[]
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const approaches: approach[] = [
    {
      icon: <Award className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Source',
      description: 'We identify high-potential enterprises through our extensive network, accelerator programs, and systematic market screening across all provinces.',
      features:['Pipeline development', 'Market intelligence', 'Referral networks']
    },
    {
      icon: <Heart className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Assess',
      description: 'Comprehensive due diligence examines financial performance, governance structures, market positioning, team capabilities, and impact potential.',
      features:['Financial analysis', 'Market validation', 'Impact assessment']
    },
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Invest',
      description: 'We structure appropriate equity and quasi-equity instruments, typically securing board representation to ensure alignment and governance.',
      features:['Capital deployment', 'Terms negotiation', 'Documentation']
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Strengthen',
      description: 'Active post-investment support includes governance strengthening, strategic planning, market access, and operational excellence over 5-7 years.',
      features:['Board engagement', 'Strategic guidance', 'Exit planning']
    }
  ];



  const milestones: Milestone[] = [
    {
      year: '2009',
      title: 'Foundation',
      description: 'Aadhyanta Fund was established with a vision to revolutionize wealth management'
    },
    {
      year: '2012',
      title: '$500M AUM',
      description: 'Reached half a billion in assets under management, establishing our market presence'
    },
    {
      year: '2016',
      title: 'Global Expansion',
      description: 'Opened offices in London and Singapore, serving international clients'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched our proprietary investment analytics platform'
    },
    {
      year: '2024',
      title: '$2.5B+ AUM',
      description: 'Surpassed $2.5 billion in assets, serving over 5,000 satisfied clients'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Goldman Sachs minimalist approach */}
      <section className="relative overflow-hidden pt-36 pb-28 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 via-white to-slate-100">
        {/* Decorative gradient blur */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#B71E52]/10 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/70 backdrop-blur text-sm font-medium text-[#B71E52] mb-8">
              <span className="h-2 w-2 rounded-full bg-[#B71E52]" />
              Trusted since 2009
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#161142] mb-8">
              Building wealth
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#161142] to-[#B71E52]">
                with clarity & discipline
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              For more than 15 years, we&apos;ve partnered with individuals and
              institutions to grow capital responsibly through long-term
              strategies, data-driven decisions, and personalized guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar - Clean minimal style */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#161142" }}
              >
                12+
              </div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#161142" }}
              >
                150+
              </div>
              <div className="text-gray-600 font-medium">
                Expert Team Members
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#161142" }}
              >
                25+
              </div>
              <div className="text-gray-600 font-medium">Industry Awards</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#161142" }}
              >
                18.5%
              </div>
              <div className="text-gray-600 font-medium">
                Avg. Annual Return
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by side with cleaner design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div
                className="text-sm font-semibold uppercase tracking-wide mb-4"
                style={{ color: "#B71E52" }}
              >
                Our Mission
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#161142" }}
              >
                Creating lasting value for our clients
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide world-class investment management services that
                create lasting value for our clients. We combine rigorous
                analysis, innovative strategies, and personalized attention to
                help you build and preserve wealth across generations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our approach is grounded in deep market expertise, quantitative
                research, and a commitment to understanding the unique goals of
                each client we serve.
              </p>
            </div>

            <div>
              <div
                className="text-sm font-semibold uppercase tracking-wide mb-4"
                style={{ color: "#B71E52" }}
              >
                Our Vision
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#161142" }}
              >
                The most trusted name in investment management
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be the most trusted and respected fund management firm
                globally, recognized for our integrity, performance, and
                commitment to client success.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where every investor has access to
                institutional-quality management, sophisticated strategies, and
                the peace of mind that comes from working with a firm that puts
                their interests first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Horizontal cards with borders */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#B71E52" }}
            >
              From Beginning to End
            </div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#161142" }}
            >
              Our Investment Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-7xl">
              We apply a disciplined, four-stage process that combines rigorous
              financial analysis with deep operational engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {approaches.map((approach, index) => (
              <div
                key={index}
                className="group border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:border-transparent bg-white"
              >
                <div className="mb-4">{approach.icon}</div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#161142" }}
                >
                  {approach.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {approach.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {approach.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#B71E52]" />
                      <span className="text-gray-600 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline - Cleaner, more minimal */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#B71E52" }}
            >
              Our Story
            </div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#161142" }}
            >
              A legacy of growth and innovation
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 md:gap-16 group"
              >
                <div className="md:w-32 shrink-0">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: "#B71E52" }}
                  >
                    {milestone.year}
                  </div>
                </div>
                <div className="grow border-l-2 border-gray-200 pl-8 pb-8 group-hover:border-gray-400 transition-colors">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#161142" }}
                  >
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team - Grid layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#B71E52" }}
            >
              Leadership
            </div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#161142" }}
            >
              Meet our executive team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals guiding Aadhyanta Fund to new heights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers
              .filter(
                (member) => member.department.toLowerCase() === "executive",
              )
              .map(
                (member, index) =>
                  index < 4 && (
                    <div key={index} className="group">
                      <div
                        className="h-80 flex items-center justify-center text-white text-5xl font-bold mb-6 rounded-lg overflow-hidden"
                        style={{ backgroundColor: "#161142" }}
                      >
                        <img
                          src={member.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: "#161142" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="mb-3 font-semibold text-sm"
                        style={{ color: "#B71E52" }}
                      >
                        {member.position}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  ),
              )}
          </div>
        </div>
      </section>

      {/* Featured Content Section - Goldman style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="text-sm font-semibold uppercase tracking-wide mb-4"
                style={{ color: "#B71E52" }}
              >
                Global Presence
              </div>
              <h2
                className="text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#161142" }}
              >
                Operating across continents, thinking globally
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With offices spanning North America, Europe, and Asia, we bring
                a truly global perspective to investment management. Our
                international footprint enables us to identify opportunities and
                manage risks across diverse markets and asset classes.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center font-semibold text-lg transition-colors duration-200"
                style={{ color: "#B71E52" }}
              >
                Find an office near you
                <ChevronRight className="ml-1" size={20} />
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: "#161142" }}
              >
                Office Locations
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#161142" }}
                  >
                    New York
                  </div>
                  <div className="text-gray-600">Americas Headquarters</div>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#161142" }}
                  >
                    London
                  </div>
                  <div className="text-gray-600">European Operations</div>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#161142" }}
                  >
                    Singapore
                  </div>
                  <div className="text-gray-600">Asia-Pacific Hub</div>
                </div>
                <div>
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#161142" }}
                  >
                    Dubai
                  </div>
                  <div className="text-gray-600">Middle East Gateway</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal and clean */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#161142" }}
          >
            Partner with Aadhyanta Fund
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover how our expertise and commitment can help you achieve your
            financial aspirations. Let's build your financial future together.
          </p>
          <button
            className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center group"
            style={{ backgroundColor: "#B71E52" }}
          >
            Get in Touch
            <ChevronRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
        </div>
      </section>
    </div>
  )
};

export default AboutPage;