'use client'

import React, { useState } from 'react';
import { ChevronRight, CheckCircle, ArrowLeft, Zap, Building2, Smartphone, Leaf, Factory, Shield, Globe, TrendingUp, BarChart3, Users } from 'lucide-react';


export default function NOF1Page({ onBack }: { onBack: () => void }) {
  const stats = [
    { value: 'NPR 300Cr', label: 'Raised from institutions' },
    { value: '18 Months', label: 'Fully deployed' },
    { value: '127', label: 'Opportunities screened' },
    { value: '12%', label: 'Conversion rate' },
  ];

  const whatWeLookFor = [
    { title: 'Proven Market Demand', description: 'Revenue-generating businesses with demonstrated customer traction, not early-stage concepts' },
    { title: 'Capable Management', description: 'Domain expertise, execution track record, and growth ambition' },
    { title: 'Clear Competitive Position', description: 'Sustainable advantages in their markets, not commodity businesses' },
    { title: 'Governance Readiness', description: 'Willingness to strengthen systems, embrace transparency, and build institutional discipline' },
    { title: 'Growth Pathway', description: 'Clear use of capital with measurable milestones and realistic scaling plans' },
    { title: 'Impact Alignment', description: 'Contribution to jobs, inclusion, or sustainability—measured rigorously' },
  ];

  const howWeAddValue = [
    { icon: <Shield className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Governance Strengthening', description: 'Board representation and institutional frameworks' },
    { icon: <BarChart3 className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Financial Management', description: 'Improved reporting systems and discipline' },
    { icon: <Globe className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Market Access', description: 'Buyer and supplier introductions' },
    { icon: <TrendingUp className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Strategic Planning', description: 'Performance monitoring and growth roadmaps' },
    { icon: <Users className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Follow-on Capital', description: 'Unlock funding through our investor network' },
    { icon: <Building2 className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Regulatory Navigation', description: 'Build stakeholder relationships and compliance' },
  ];

  const portfolio = [
    {
      icon: <Zap className="w-6 h-6" style={{ color: '#B71E52' }} />,
      sector: 'Renewable Energy Infrastructure',
      name: 'Shikhar Power Development Limited',
      description: 'Long-term partnership supporting clean energy generation. Our involvement strengthened governance, improved financial reporting, and facilitated additional financing for expansion projects.',
      impacts: ['MW-scale clean energy', 'CO₂ emissions avoided', 'Rural energy access'],
    },
    {
      icon: <Building2 className="w-6 h-6" style={{ color: '#B71E52' }} />,
      sector: 'Premium Hospitality',
      name: 'Budhanilkantha Heritage Hotel',
      description: 'Growth capital and strategic support for 5-star heritage hotel development under international brand partnership. Focus on operational excellence, brand positioning, and market expansion.',
      impacts: ['Quality jobs created', 'Tourism infrastructure', 'Heritage preservation'],
    },
    {
      icon: <Smartphone className="w-6 h-6" style={{ color: '#B71E52' }} />,
      sector: 'Digital Financial Inclusion',
      name: 'DV Excellus Kheti',
      description: 'Supporting digital fintech platform expanding access to finance for farmers and small enterprises. Hands-on support in product development, regulatory navigation, and scaling operations.',
      impacts: ['NPR 170M+ loans disbursed', '12,000+ users', '900+ farmer beneficiaries'],
    },
    {
      icon: <Leaf className="w-6 h-6" style={{ color: '#B71E52' }} />,
      sector: 'Agriculture Value Chains',
      name: 'Daunne Agro Farm Limited',
      description: 'Market leader in poultry production with expansion capital and governance support. Partnership focused on scaling operations, improving efficiency, and strengthening market position.',
      impacts: ['Large-scale production', 'Food security', 'Rural employment'],
    },
    {
      icon: <Factory className="w-6 h-6" style={{ color: '#B71E52' }} />,
      sector: 'Agricultural Processing',
      name: 'Shreenagar Agritech Industries',
      description: 'Long-established agritech venture with growth capital for market expansion. Over two decades of operations with demonstrated market leadership and scaling potential.',
      impacts: ['Smallholder farmer linkages', 'Value addition', 'Market access'],
    },
  ];

  const governance = [
    { title: 'Independent Investment Committee', description: 'All investment decisions made by experienced IC with rigorous approval process' },
    { title: 'Limited Partners Advisory Committee', description: 'Investor oversight and conflict resolution' },
    { title: 'SEBON Regulation', description: 'Full compliance with regulatory requirements' },
    { title: 'Quarterly Reporting', description: 'Transparent communication with all investors' },
    { title: 'Annual Impact Measurement', description: 'SDG-aligned metrics tracked with same rigour as financial performance' },
  ];

  const proofs = [
    'Domestic capital can be mobilized at meaningful scale',
    'Rigorous processes create value, not just deploy capital',
    'Exit pathways exist through Nepal\'s growing public markets',
    'Impact and returns are complementary, not competing objectives',
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Back nav */}
      {/* <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: '#161142' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Funds
          </button>
        </div>
      </div> */}

      {/* Hero */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#161142' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(183,30,82,.3) 35px,rgba(183,30,82,.3) 70px)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-white bg-opacity-20">
                Fully Deployed
              </span>
              <span className="text-gray-400 text-sm">Nepal Opportunity Fund I</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Proof of concept, delivered
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Nepal's flagship sector-agnostic growth equity fund demonstrating disciplined capital deployment and sustainable value creation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>{s.value}</div>
                <div className="text-gray-600 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                The Challenge
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
                We set out to prove institutional private equity works in Nepal
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                In 2021, Nepal's most promising enterprises faced a fundamental constraint: access to patient, professionally managed growth capital. Banks provided debt, but equity was scarce. Family offices invested opportunistically, but institutional fund management was virtually nonexistent.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We set out to prove that Nepal's growth economy could support institutional private equity—that domestic capital could be mobilized at scale, deployed with discipline, and create measurable value.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Opportunities Screened', value: 127, max: 127 },
                { label: 'Full Due Diligence', value: 25, max: 127 },
                { label: 'Investments Made', value: 16, max: 127 },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold" style={{ color: '#161142' }}>{item.label}</span>
                    <span className="font-bold text-lg" style={{ color: '#B71E52' }}>{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: '#B71E52' }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-500 text-right pt-2">12% conversion rate reflects rigorous discipline</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Delivered */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              What We Delivered
            </div>
            <h2 className="text-4xl font-bold" style={{ color: '#161142' }}>
              Three pillars of success
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: 'Capital Mobilization',
                heading: 'Institutional confidence at scale',
                body: "Raised NPR 300 crores from Nepal's leading financial institutions—the 4 largest banks and 7 insurance companies. Fully deployed in 18 months, proving our ability to source, assess, and execute deals with discipline.",
              },
              {
                label: 'Portfolio Construction',
                heading: 'Sector-agnostic market intelligence',
                body: 'Built a diversified portfolio across energy, manufacturing, hospitality, technology, and agriculture. Screened 127 opportunities, conducted full due diligence on 25, and invested in 16.',
              },
              {
                label: 'Value Creation',
                heading: 'Hands-on partnership beyond capital',
                body: 'Delivered board seats, governance strengthening, strategic planning, market access, and operational support across every portfolio company. Multiple companies advancing toward public markets.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                  {item.label}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#161142' }}>{item.heading}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              Investment Approach
            </div>
            <h2 className="text-4xl font-bold" style={{ color: '#161142' }}>
              What we look for & how we add value
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* What We Look For */}
            <div className="bg-white p-10 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-8" style={{ color: '#161142' }}>What We Look For</h3>
              <div className="space-y-6">
                {whatWeLookFor.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                    <div>
                      <div className="font-bold mb-1" style={{ color: '#161142' }}>{item.title}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Add Value */}
            <div>
              <h3 className="text-2xl font-bold mb-8" style={{ color: '#161142' }}>How We Add Value</h3>
              <div className="grid grid-cols-1 gap-4">
                {howWeAddValue.map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-bold mb-1" style={{ color: '#161142' }}>{item.title}</div>
                      <div className="text-gray-600 text-sm">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              Portfolio Highlights
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Representative investments
            </h2>
            <p className="text-lg text-gray-600">
              Demonstrating our approach across sectors. Full details available to qualified investors.
            </p>
          </div>

          <div className="space-y-6">
            {portfolio.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Left */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#B71E52' }}>
                          {item.sector}
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: '#161142' }}>{item.name}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  {/* Right - Impact */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                      Impact
                    </div>
                    <ul className="space-y-3">
                      {item.impacts.map((imp, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#B71E52' }} />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                Governance & Oversight
              </div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#161142' }}>
                Institutional discipline throughout
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every aspect of NOF I operates under rigorous institutional standards — from investment decision-making to reporting, regulatory compliance, and impact measurement.
              </p>
            </div>
            <div className="space-y-4">
              {governance.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#161142' }}>{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What This Proves */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#161142' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              The Verdict
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              What this proves
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              NOF I demonstrated that Nepal can support institutional private equity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {proofs.map((p, i) => (
              <div key={i} className="flex items-start gap-4 bg-white bg-opacity-5 rounded-lg p-6">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                <p className="text-gray-200 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#161142' }}>
            Interested in our next fund?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            NOF I's track record forms the foundation for Nepal Opportunity Fund II. Learn how we're building on this success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group"
              style={{ backgroundColor: '#B71E52' }}
            >
              Explore NOF II
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center"
              style={{ borderColor: '#161142', color: '#161142' }}
            >
              Investor Inquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
