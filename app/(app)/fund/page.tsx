'use client'

import React, { useState } from 'react';
import { ChevronRight, CheckCircle, TrendingUp, Users, Building2, Shield, Globe, BarChart3 } from 'lucide-react';

const FundsPage: React.FC = () => {
  const [activeFund, setActiveFund] = useState<number>(0);

  const trackRecord = [
    { value: 'NPR 320M+', label: 'Capital Mobilized' },
    { value: '18 Months', label: 'Raised & Deployed' },
    { value: '12%', label: 'Investment Conversion Rate' },
    { value: '5+', label: 'Sectors Covered' },
  ];

  const funds = [
    {
      id: 0,
      tag: 'Fully Deployed',
      tagColor: '#161142',
      name: 'Nepal Opportunity Fund I',
      shortName: 'NOF I',
      subtitle: "Nepal's flagship sector-agnostic growth equity fund",
      description: "Our first institutional fund demonstrated proof of concept: raising NPR 300 crores from Nepal's leading banks and insurance companies, deploying capital across diverse sectors, and building a portfolio advancing toward exits.",
      icon: <TrendingUp className="w-6 h-6" />,
      meta: [
        { label: 'Status', value: 'Fully deployed | Portfolio actively managed' },
        { label: 'Backed by', value: "Nepal's 4 largest banks + leading insurance companies" },
      ],
    },
    {
      id: 1,
      tag: 'Active',
      tagColor: '#B71E52',
      name: 'Nepal Opportunity Fund II',
      shortName: 'NOF II',
      subtitle: 'Building on proven success with enhanced flexibility',
      description: "Our second fund leverages NOF I's track record with blended finance structure, enabling both follow-on support for high-performing portfolio companies and strategic new investments with flexible instruments beyond pure equity.",
      icon: <BarChart3 className="w-6 h-6" />,
      meta: [
        { label: 'Structure', value: 'Blended finance (commercial + development capital)' },
        { label: 'Instruments', value: 'Equity, quasi-equity, mezzanine' },
      ],
    },
    {
      id: 2,
      tag: 'Gender-Lens',
      tagColor: '#B71E52',
      name: 'Simrik Fund',
      shortName: 'SIMRIK',
      subtitle: "Nepal's first gender-lens investment fund",
      description: "Pioneering gender-lens investing in Nepal with an all-women deal team. Mobilizing capital for women-led and women-impacting businesses, addressing the persistent financing gap where women receive less than 10% of bank credit despite strong performance.",
      icon: <Users className="w-6 h-6" />,
      meta: [
        { label: 'Focus', value: 'Women-led and women-impacting businesses' },
        { label: 'Team', value: '100% female investment committee and deal team' },
      ],
    },
  ];

  const valueProps = [
    {
      icon: <Shield className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Governance Strengthening',
      description: 'Board seats, reporting systems, fiduciary discipline'
    },
    {
      icon: <Globe className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Market Access',
      description: 'Buyer connections, supplier networks, strategic partnerships'
    },
    {
      icon: <TrendingUp className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Strategic Planning',
      description: 'Growth roadmaps, performance metrics, execution discipline'
    },
    {
      icon: <Building2 className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Operational Excellence',
      description: 'Financial management, systems improvement, capability building'
    },
    {
      icon: <BarChart3 className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Follow-on Capital',
      description: 'Access to additional funding rounds and co-investment networks'
    },
  ];

  const sectors = ['Energy', 'Manufacturing', 'Hospitality', 'Agriculture', 'Technology'];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#161142' }}>
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(183,30,82,.3) 35px,rgba(183,30,82,.3) 70px)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 bg-white bg-opacity-10 rounded-full text-sm font-medium mb-8 text-white">
              Our Funds
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Growth capital for Nepal's transformation
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Three institutional funds mobilizing patient capital that creates financial returns and lasting social impact across Nepal's growth economy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Track Record ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trackRecord.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Track Record Narrative ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                Since 2021
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
                Disciplined capital deployment and value creation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Since 2021, we've demonstrated a rigorous approach to institutional fund management — raising and deploying capital with precision, maintaining a 12% investment conversion rate from our comprehensive screening process.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our sector-agnostic approach has enabled us to identify and back Nepal's most compelling growth opportunities with strong exit pipelines and multiple portfolio companies advancing toward public markets.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#161142' }}>
                Sectors We Cover
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {sectors.map((s, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-50 border border-gray-200"
                    style={{ color: '#161142' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#B71E52' }} />
                  <span className="text-gray-700">SEBON-licensed institutional processes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#B71E52' }} />
                  <span className="text-gray-700">Strong exit pipeline toward public markets</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#B71E52' }} />
                  <span className="text-gray-700">NPR 320M+ mobilized across three funds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Funds ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              Our Funds
            </div>
            <h2 className="text-4xl font-bold" style={{ color: '#161142' }}>
              Three funds. One mission.
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-10 border-b border-gray-200 overflow-x-auto">
            {funds.map((fund) => (
              <button
                key={fund.id}
                onClick={() => setActiveFund(fund.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeFund === fund.id
                    ? 'border-[#B71E52] text-[#161142]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {fund.shortName}
              </button>
            ))}
          </div>

          {/* Fund Detail Panel */}
          {funds.map((fund) =>
            activeFund === fund.id ? (
              <div key={fund.id} className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left - Content */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: fund.tagColor }}
                    >
                      {fund.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: '#161142' }}>
                    {fund.name}
                  </h3>
                  <p className="text-lg mb-6" style={{ color: '#B71E52', fontWeight: 600 }}>
                    {fund.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {fund.description}
                  </p>
                  <button
                    className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center group"
                    style={{ backgroundColor: '#B71E52' }}
                  >
                    Learn More
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>

                {/* Right - Meta Card */}
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-bold mb-6" style={{ color: '#161142' }}>
                    Fund Details
                  </h4>
                  <div className="space-y-6">
                    {fund.meta.map((m, i) => (
                      <div key={i} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#B71E52' }}>
                          {m.label}
                        </div>
                        <div className="text-gray-800 font-medium">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null
          )}

          {/* Fund Overview Cards — all three at a glance */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-100">
            {funds.map((fund) => (
              <button
                key={fund.id}
                onClick={() => setActiveFund(fund.id)}
                className={`text-left p-6 rounded-lg border transition-all duration-300 ${
                  activeFund === fund.id
                    ? 'border-[#B71E52] shadow-md'
                    : 'border-gray-200 hover:shadow-lg hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: fund.tagColor }}
                  >
                    {fund.tag}
                  </span>
                  <span style={{ color: activeFund === fund.id ? '#B71E52' : '#9ca3af' }}>
                    {fund.icon}
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: '#161142' }}>
                  {fund.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {fund.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Beyond Capital ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              More than money
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Our value beyond capital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Every fund investment includes hands-on operational and strategic support to accelerate growth and create lasting enterprise value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map((prop, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{prop.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#161142' }}>
                  {prop.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{prop.description}</p>
              </div>
            ))}

            {/* CTA Card */}
            <div className="rounded-lg p-8 flex flex-col justify-between" style={{ backgroundColor: '#161142' }}>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Ready to invest with us?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Explore opportunities across our three institutional funds and join Nepal's investment future.
                </p>
              </div>
              <button
                className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-xl inline-flex items-center group self-start"
                style={{ backgroundColor: '#B71E52' }}
              >
                Get in Touch
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FundsPage;