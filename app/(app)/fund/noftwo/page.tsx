
import React from 'react';
import { ChevronRight, CheckCircle, ArrowLeft, TrendingUp, Layers, Target, Shield, Users, BarChart3, Globe } from 'lucide-react';

export default function NOF2Page() {
  const differentiators = [
    {
      icon: <Layers className="w-5 h-5" style={{ color: '#B71E52' }} />,
      title: 'Blended Finance Structure',
      description: 'NOF II integrates commercial and concessional capital, enabling investments that create strong returns while addressing market failures—gender gaps, climate resilience, rural access—that pure commercial capital often overlooks. This structure doesn\'t dilute discipline. It expands possibility.',
    },
    {
      icon: <Target className="w-5 h-5" style={{ color: '#B71E52' }} />,
      title: 'Instrument Flexibility',
      description: 'Beyond pure equity, NOF II deploys quasi-equity (revenue shares, profit participation, convertible structures), mezzanine (subordinated debt with equity upside), and structured products customized to match business cash flows and growth profiles.',
    },
    {
      icon: <TrendingUp className="w-5 h-5" style={{ color: '#B71E52' }} />,
      title: 'Dual Focus',
      description: 'Portfolio continuation supporting high-performing NOF I companies requiring additional capital, plus strategic new deals deploying capital in enterprises aligned with our proven thesis—sector-agnostic growth equity with strong teams, market traction, and impact potential.',
    },
  ];

  const corePrinciples = [
    { title: 'Rigorous due diligence', description: 'Comprehensive assessment across financial, commercial, operational, and impact dimensions' },
    { title: 'Hands-on partnership', description: 'Board representation, governance strengthening, strategic support' },
    { title: 'Value creation focus', description: 'Not just capital deployment, but sustainable enterprise building' },
    { title: 'Institutional governance', description: 'Independent IC, LPAC oversight, SEBON compliance' },
    { title: 'Impact measurement', description: 'SDG-aligned metrics tracked with same rigour as financial KPIs' },
  ];

  const investmentCriteria = [
    'Proven business model with revenue traction',
    'Strong management team with execution capability',
    'Clear competitive positioning and growth pathway',
    'Governance readiness and transparency commitment',
    'Measurable impact potential—jobs, inclusion, climate, or market access',
    'Alignment with SDG targets tracked and reported',
  ];

  const whyThisMatters = [
    { label: 'Follow-on capital exists', description: 'Successful companies can access growth rounds domestically' },
    { label: 'Blended finance works', description: 'Commercial and development capital can combine effectively' },
    { label: 'Flexible instruments scale', description: 'Beyond pure equity, diverse structures match business needs' },
    { label: 'Impact drives returns', description: 'SDG-aligned investments deliver competitive performance' },
    { label: 'Institutional capital deepens', description: 'Track record attracts continued investor confidence' },
  ];

  const instruments = [
    { name: 'Equity', description: 'Traditional growth equity investments' },
    { name: 'Quasi-equity', description: 'Revenue shares, profit participation, convertible structures' },
    { name: 'Mezzanine', description: 'Subordinated debt with equity upside' },
    { name: 'Structured products', description: 'Customized instruments matching business cash flows' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Back nav ── */}
      {/* <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-60 transition-opacity"
            style={{ color: '#161142' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Funds
          </button>
        </div>
      </div> */}

      {/* ── Hero ── */}
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: '#161142' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(183,30,82,.3) 35px,rgba(183,30,82,.3) 70px)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white border border-white border-opacity-30">
                Active
              </span>
              <span className="text-gray-400 text-sm font-medium">Nepal Opportunity Fund II</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building on proven success
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Enhanced flexibility, continued discipline, expanded impact—NOF II builds on NOF I's proven track record with blended finance structure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why NOF II ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
                Why NOF II
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-snug" style={{ color: '#161142' }}>
                NOF I proved the concept. NOF II expands the model.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-5">
                Our flagship fund demonstrated that Nepal's growth economy can support institutional private equity. But it also revealed opportunities beyond traditional fund structures: follow-on capital needs for high-performing companies, impact-aligned investments requiring patient capital, and growth-stage businesses needing flexible instruments beyond pure equity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                NOF II addresses these gaps through blended finance—combining commercial institutional capital with concessional development resources to enable deeper impact while maintaining financial discipline.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#161142' }}>
                Structure Overview
              </h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#B71E52' }}>
                    Capital Mix
                  </p>
                  <p className="text-gray-700 leading-relaxed">Commercial institutional capital + concessional development resources</p>
                </div>
                <div className="pb-6 border-b border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#B71E52' }}>
                    Instruments
                  </p>
                  <p className="text-gray-700 leading-relaxed">Equity, quasi-equity, mezzanine, structured products</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#B71E52' }}>
                    Investment Focus
                  </p>
                  <p className="text-gray-700 leading-relaxed">Follow-on capital for NOF I portfolio + strategic new investments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Different ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              What's Different
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#161142' }}>
              Enhanced capabilities, maintained discipline
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-9 h-9 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold leading-snug" style={{ color: '#161142' }}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instruments ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Investment Instruments
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Flexible capital structures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              This flexibility enables partnerships with businesses at different stages, capital structures, and growth trajectories—expanding our investable universe without compromising returns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instruments.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold mb-2" style={{ color: '#161142' }}>{item.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Stays the Same ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
                Core Principles
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug" style={{ color: '#161142' }}>
                What stays the same
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                While structure and instruments evolve, our core approach remains unchanged. The same disciplined processes, governance standards, and value creation focus that defined NOF I continue in NOF II.
              </p>
            </div>
            <div className="space-y-3">
              {corePrinciples.map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-start gap-4">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#B71E52' }} />
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: '#161142' }}>{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Criteria ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
                Investment Criteria
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug" style={{ color: '#161142' }}>
                Similar to NOF I, with enhanced impact focus
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We maintain the same rigorous standards for business fundamentals while deepening our commitment to measurable impact. Every investment must demonstrate both financial viability and meaningful contribution to Nepal's sustainable development.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-8 pb-6 border-b border-gray-100" style={{ color: '#161142' }}>
                What We Look For
              </h3>
              <div className="space-y-0">
                {investmentCriteria.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-0"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                    <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#161142' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Ecosystem Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why this matters
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              NOF II demonstrates maturation of Nepal's private equity ecosystem
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyThisMatters.map((item, i) => (
              <div key={i} className="rounded-lg p-6 border border-white border-opacity-10 bg-white bg-opacity-5">
                <h3 className="font-bold mb-2 text-white">{item.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Advantages ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-8">
              <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                <Shield className="w-5 h-5" style={{ color: '#B71E52' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#161142' }}>Proven Track Record</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Building on NOF I's demonstrated success in capital mobilization, portfolio construction, and value creation.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-8">
              <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                <Users className="w-5 h-5" style={{ color: '#B71E52' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#161142' }}>Deep Impact</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Blended structure enables investments in high-impact enterprises that address market failures while delivering returns.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-8">
              <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                <BarChart3 className="w-5 h-5" style={{ color: '#B71E52' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#161142' }}>Enhanced Flexibility</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Multiple instruments and structures match diverse business needs without compromising institutional discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
            Ready to participate in NOF II?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Join institutional and development partners in building Nepal's next generation of growth enterprises with enhanced impact and flexibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group"
              style={{ backgroundColor: '#B71E52' }}
            >
              Investor Inquiry
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-md border-2 inline-flex items-center justify-center"
              style={{ borderColor: '#161142', color: '#161142' }}
            >
              Download Overview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}