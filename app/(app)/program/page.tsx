'use client'
import React, { useState } from 'react';
import { ChevronRight, Target, Users, TrendingUp, Globe, Lightbulb, Building2, Leaf, Zap, CheckCircle, ArrowRight, Mail } from 'lucide-react';

export default function AcceleratorPage() {
  const [activeTrack, setActiveTrack] = useState(0);

  const stats = [
    { value: '200+', label: 'Enterprises Supported' },
    { value: '$28M+', label: 'Capital Facilitated' },
    { value: '50+', label: 'Investment-Ready Enterprises' },
    { value: 'Multiple', label: 'Provinces Reached' },
  ];

  const approach = [
    { title: 'Structured, Not Transactional', description: 'Multi-month cohort programs with clear milestones and accountability, not one-off workshops' },
    { title: 'Practitioner-Led', description: "Mentorship from experienced entrepreneurs, investors, and operators—people who've built businesses, not just studied them" },
    { title: 'Capital-Connected', description: 'Direct pathways to funding through our investor network, partner banks, and fund management platform' },
    { title: 'Market-Focused', description: 'Real buyer/supplier introductions and partnership facilitation, not just capability building' },
    { title: 'Outcome-Driven', description: 'Measured by capital accessed and businesses scaled, not attendance numbers' },
  ];

  const components = [
    {
      icon: <Target className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Investment Readiness',
      items: ['Financial modeling and business plan refinement', 'Governance framework development', 'Financial reporting systems strengthening', 'Pitch preparation and investor targeting'],
    },
    {
      icon: <Users className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Expert Mentorship',
      items: ['One-on-one guidance from experienced entrepreneurs', 'Sector-specific technical advisors', 'Strategic planning support', 'Operational excellence frameworks'],
    },
    {
      icon: <Globe className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Market Linkages',
      items: ['Buyer and supplier introductions', 'Strategic partnership facilitation', 'Distribution channel access', 'Export market connections'],
    },
    {
      icon: <TrendingUp className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Capital Facilitation',
      items: ['Bank credit access through partner institutions', 'Investor network introductions', 'Fund consideration for high-performers', 'Pitch events and demo days'],
    },
    {
      icon: <Lightbulb className="w-6 h-6" style={{ color: '#B71E52' }} />,
      title: 'Peer Learning',
      items: ['Cohort-based learning with fellow entrepreneurs', 'Peer-to-peer problem solving', 'Shared experiences and best practices', 'Long-term alumni network'],
    },
  ];

  const tracks = [
    {
      name: 'General Accelerator Track',
      tagline: 'Sector-agnostic enterprise support',
      icon: <Building2 className="w-5 h-5" style={{ color: '#B71E52' }} />,
      description: 'Our flagship track supports growth-stage SMEs across all sectors—manufacturing, services, technology, agriculture, hospitality—with proven revenue and clear expansion potential.',
      focus: 'Comprehensive investment readiness for established businesses seeking growth capital',
      criteria: 'NPR 10M+ revenue, 3+ years operations, proven market demand, clear expansion plans',
    },
    {
      name: 'Koshi Accelerator Initiative',
      tagline: 'Provincial enterprise development',
      icon: <Globe className="w-5 h-5" style={{ color: '#B71E52' }} />,
      description: 'Developed in partnership with Koshi Province government, this initiative brings the Aadhyanta Accelerator model to provincial enterprises across agriculture, manufacturing, and services.',
      focus: 'Supporting local enterprises with province-specific market intelligence and government alignment',
      whyItMatters: 'Demonstrates that investment-ready businesses exist beyond Kathmandu—creating replicable model for all seven provinces',
    },
    {
      name: 'DIAL Initiative',
      tagline: 'Digital Innovation for Agriculture & Livelihoods',
      icon: <Leaf className="w-5 h-5" style={{ color: '#B71E52' }} />,
      description: 'Specialized track supporting digital solutions for agriculture value chains—connecting tech entrepreneurs with farming realities, facilitating market validation, and enabling investment access for proven innovations.',
      focus: 'Technology-enabled agriculture, farmer livelihoods, supply chain optimization',
      approach: 'Supporting entrepreneurs proving their solutions work through pilot facilitation and farmer feedback',
    },
    {
      name: 'Roof of the World Initiative',
      tagline: 'Cross-border market access',
      icon: <Zap className="w-5 h-5" style={{ color: '#B71E52' }} />,
      description: 'Supporting Nepali SMEs seeking regional expansion through market intelligence, buyer connections, and cross-border partnership development.',
      focus: 'Export development, regional trade facilitation, international market access',
      strategicValue: "For enterprises constrained by Nepal's domestic market, regional expansion unlocks growth potential that attracts institutional investment",
    },
  ];

  const integration = [
    { title: 'Deal Flow Generation', description: 'We identify high-potential enterprises early, before they reach traditional fund sourcing channels' },
    { title: 'Investment Readiness', description: 'We strengthen governance and financial systems before capital deployment, reducing execution risk' },
    { title: 'Market Intelligence', description: 'Direct enterprise engagement provides ground-level sector insights that inform investment decisions' },
    { title: 'Portfolio Support', description: 'Program infrastructure—mentors, buyers, technical advisors—benefits our portfolio companies post-investment' },
    { title: 'Ecosystem Credibility', description: "Supporting 200+ enterprises builds trust and relationships across Nepal's business community" },
  ];

  const partners = ['Swiss Development Cooperation', 'USAID', 'US Embassy in Nepal', 'FAO', 'Winrock International', 'Koshi Province Government'];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-blue-100 rounded-full text-sm font-medium mb-6" style={{ color: '#161142' }}>
              Accelerator Programs
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
              Aadhyanta Accelerator Program
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Building investment-ready enterprises through comprehensive support, market connections, and pathways to capital.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-8 text-gray-400">
            Track Record Since Launch
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="text-center px-8 first:pl-0 last:pr-0">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#B71E52' }}>
              The Challenge We Address
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center leading-tight" style={{ color: '#161142' }}>
              Capital alone isn't the constraint
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-10">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Nepal has promising enterprises with strong products, capable teams, and real market demand. But they lack what institutional investors require: financial discipline, governance frameworks, market validation, and scalable business models.
              </p>
              <p className="text-lg font-semibold" style={{ color: '#161142' }}>
                The Aadhyanta Accelerator Program bridges this gap—transforming promising businesses into fundable opportunities through structured support, expert mentorship, and direct connections to capital and markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#161142' }}>
              What makes us different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approach.map((item, i) => (
              <div key={i} className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold text-lg mb-3" style={{ color: '#161142' }}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Components ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Program Components
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Comprehensive enterprise support
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every enterprise receives structured support across five critical dimensions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {components.map((comp, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                  {comp.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#161142' }}>{comp.title}</h3>
                <ul className="space-y-3">
                  {comp.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#B71E52' }} />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialized Initiatives ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Specialized Initiatives
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Four distinct tracks
            </h2>
            <p className="text-lg text-gray-600">
              Each addressing specific market opportunities or geographic priorities
            </p>
          </div>

          {/* Track Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {tracks.map((track, i) => (
              <button
                key={i}
                onClick={() => setActiveTrack(i)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTrack === i
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={activeTrack === i ? { backgroundColor: '#B71E52' } : {}}
              >
                {track.name}
              </button>
            ))}
          </div>

          {/* Active Track Detail */}
          {tracks.map((track, i) =>
            activeTrack === i ? (
              <div key={i} className="border border-gray-200 rounded-lg p-10 bg-linear-to-br from-white to-gray-50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#161142' }}>{track.name}</h3>
                    <p className="text-lg font-semibold" style={{ color: '#B71E52' }}>{track.tagline}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">{track.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#B71E52' }}>Focus</p>
                    <p className="text-gray-700 leading-relaxed">{track.focus}</p>
                  </div>
                  {track.criteria && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#B71E52' }}>Who Should Apply</p>
                      <p className="text-gray-700 leading-relaxed">{track.criteria}</p>
                    </div>
                  )}
                  {track.whyItMatters && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#B71E52' }}>Why It Matters</p>
                      <p className="text-gray-700 leading-relaxed">{track.whyItMatters}</p>
                    </div>
                  )}
                  {track.approach && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#B71E52' }}>Approach</p>
                      <p className="text-gray-700 leading-relaxed">{track.approach}</p>
                    </div>
                  )}
                  {track.strategicValue && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 md:col-span-2">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#B71E52' }}>Strategic Value</p>
                      <p className="text-gray-700 leading-relaxed">{track.strategicValue}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* ── Integration with Funds ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
                Strategic Integration
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug" style={{ color: '#161142' }}>
                How the accelerator connects to our funds
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Ecosystem building isn't separate from investing—it's integrated.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This integration is our competitive advantage. While other fund managers wait for deals to arrive, we actively build the enterprises that become tomorrow's investments.
              </p>
            </div>
            <div className="space-y-4">
              {integration.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#161142' }}>{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: '#B71E52' }}>
            Program Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, i) => (
              <div key={i} className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Enterprises */}
            <div className="bg-white border-2 rounded-xl p-10" style={{ borderColor: '#B71E52' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#161142' }}>For Enterprises</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Are you a growth-stage SME ready to scale? The Aadhyanta Accelerator provides structured support, market connections, and pathways to capital.
              </p>
              <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#B71E52' }}>Duration</p>
                  <p className="text-gray-700">6-12 months depending on track</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#B71E52' }}>Application</p>
                  <p className="text-gray-700">Rolling applications with cohort-based selection</p>
                </div>
              </div>
              <button
                className="w-full px-8 py-4 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group"
                style={{ backgroundColor: '#B71E52' }}
              >
                Apply Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>

            {/* For Partners */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-10">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#161142' }}>For Development Partners</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Looking to design ecosystem programs that create sustainable impact? We bring fund management expertise, market connections, and proven implementation capability.
              </p>
              <ul className="space-y-3 mb-8 pb-8 border-b border-gray-100">
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#B71E52' }} />
                  Strategic program design around partner objectives
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#B71E52' }} />
                  Outcome focus: capital accessed and businesses scaled
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#B71E52' }} />
                  Real market connections through fund platform
                </li>
              </ul>
              <a
                href="mailto:partnerships@aadhyanta.com"
                className="w-full px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-md border-2 inline-flex items-center justify-center group"
                style={{ borderColor: '#161142', color: '#161142' }}
              >
                <Mail className="mr-2" size={18} />
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}