import React from 'react';
import { ChevronRight, CheckCircle, ArrowLeft, TrendingUp, Users, Target, Award, Briefcase, Shield, Factory, GraduationCap, Building2, Globe, Zap, Leaf } from 'lucide-react';

export default function SimrikFundPage({ onBack }: { onBack?: () => void }) {
  const marketStats = [
    { value: '<10%', label: 'Bank credit to women-led businesses' },
    { value: '42%', label: 'Loan approval rate for women vs 60% for men' },
    { value: '7%', label: 'Economically active women employed' },
    { value: '78%', label: 'Higher capital efficiency for women founders' },
  ];

  const businessCase = [
    { stat: '25%', label: 'Higher profitability', source: 'Companies with gender-diverse executive teams (McKinsey)' },
    { stat: '63%', label: 'Better performance', source: 'Startups with at least one female founder' },
    { stat: '26%', label: 'Better returns', source: 'Startups with female board directors' },
    { stat: '$730K', label: 'Revenue per $935K', source: 'Women founders vs $662K on $2.12M for men' },
  ];

  const sectors = [
    { icon: <Factory className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Manufacturing' },
    { icon: <GraduationCap className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Education & Healthcare' },
    { icon: <Building2 className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Tourism & Infrastructure' },
    { icon: <Globe className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Information Technology' },
    { icon: <Leaf className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Agriculture & Agri-Processing' },
    { icon: <Zap className="w-5 h-5" style={{ color: '#B71E52' }} />, name: 'Clean Energy' },
  ];

  const goals = [
    { icon: <Users className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Champion Female Leadership', description: '100% female deal team—experienced operators driving every decision' },
    { icon: <TrendingUp className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Deliver Impact with Returns', description: 'Prove gender-lens investing generates competitive financial performance' },
    { icon: <Target className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Elevate Women in Business', description: 'Economic inclusion as catalyst for sustainable growth' },
    { icon: <Award className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Institutionalize Gender-Smart Investing', description: "Set Nepal's benchmark for gender-lens fund management" },
    { icon: <Briefcase className="w-5 h-5" style={{ color: '#B71E52' }} />, title: 'Create Value Beyond Capital', description: 'Hands-on support accelerating portfolio growth' },
  ];

  const teamRoles = [
    { role: 'Investment Leadership', description: 'Chartered Accountants and finance professionals with 10+ years fund management, banking, and PE experience' },
    { role: 'Advisory Committee', description: 'Seasoned banking executives (25+ years) and institutional investors with proven track records' },
    { role: 'Legal & Compliance', description: 'Licensed advocates ensuring regulatory adherence and governance' },
  ];

  const proofs = [
    "Gender-lens investing isn't concessional—it's competitive",
    'Market failures can be corrected through purposeful capital',
    "Women's economic participation drives inclusive growth",
    'Impact and returns are complementary, not competing',
    'Institutional capital can mobilize for gender equity at scale',
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

      {/* ── Hero - Unique gradient layout ── */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#B71E52' }}>
                Gender-Lens Fund
              </span>
              <span className="text-gray-500 text-sm font-medium">Simrik Fund</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
              For women, by women
            </h1>
            <p className="text-2xl font-semibold mb-6" style={{ color: '#B71E52' }}>
              Nepal's first gender-lens investment fund
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Pioneering gender-smart investing with an all-women deal team, mobilizing capital for women-led and women-impacting businesses to close Nepal's persistent financing gap.
            </p>
          </div>
        </div>
      </section>

      {/* ── Market Stats ── */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-8 text-gray-400">
            The Financing Gap
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {marketStats.map((s, i) => (
              <div key={i} className="text-center px-8 first:pl-0 last:pr-0">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#B71E52' }}>{s.value}</div>
                <div className="text-gray-500 text-sm font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Market Failure ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              The Market Failure
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
              This isn't a capability gap—it's a capital gap
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Despite strong business performance and repayment history, women-led businesses in Nepal receive less than 10% of total bank credit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#161142' }}>The Challenge</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#B71E52' }} />
                  <span className="text-gray-700">Women entrepreneurs face 42% loan approval rates vs 60% for men</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#B71E52' }} />
                  <span className="text-gray-700">Collateral requirements remain the biggest hurdle</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#B71E52' }} />
                  <span className="text-gray-700">Only 7% of economically active women are employed vs 93% men</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border-2 p-8" style={{ borderColor: '#B71E52', backgroundColor: '#fef2f7' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#161142' }}>The Reality</h3>
              <div className="flex items-center justify-center h-32">
                <p className="text-2xl font-bold text-center leading-tight" style={{ color: '#B71E52' }}>
                  Women-founded companies generate MORE revenue with LESS capital
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Business Case ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Data-Driven
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
              The business case for gender-lens investing
            </h2>
            <p className="text-xl text-gray-600">Data proves women-led businesses outperform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessCase.map((item, i) => (
              <div key={i} className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-5xl font-bold mb-3" style={{ color: '#B71E52' }}>{item.stat}</div>
                <div className="font-bold text-lg mb-3" style={{ color: '#161142' }}>{item.label}</div>
                <p className="text-sm text-gray-500 leading-tight">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg border border-gray-200 p-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>Mission</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To invest in high-growth, women-led businesses across Nepal, leveraging capital and expertise to drive strong returns and build a more competitive, inclusive economy.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>Vision</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become Nepal's premier investment platform driving economic growth by backing exceptional women-led businesses and consistently delivering top-tier returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Focus ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Investment Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#161142' }}>
              Two investment categories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="border-2 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#161142' }}>Women-Led Enterprises</h3>
              <p className="text-gray-600 leading-relaxed">Women founders, CEOs, or majority ownership positions</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#161142' }}>Women-Impacting Businesses</h3>
              <p className="text-gray-600 leading-relaxed">Significant female workforce, customer base, or supply chain impact</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 text-center" style={{ color: '#161142' }}>Sector Priorities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectors.map((sector, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
                  <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    {sector.icon}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: '#161142' }}>{sector.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Goals ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Strategic Goals
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#161142' }}>
              Five pillars of our approach
            </h2>
          </div>

          <div className="space-y-4">
            {goals.map((goal, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-5 hover:shadow-lg transition-shadow duration-300">
                <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#161142' }}>{goal.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              All-women investment team bringing deep expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamRoles.map((team, i) => (
              <div key={i} className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8">
                <h3 className="font-bold text-lg mb-4" style={{ color: '#161142' }}>{team.role}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{team.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#161142' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#B71E52' }}>
              Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why this matters
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Simrik Fund proves that gender-lens investing creates value for all stakeholders
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {proofs.map((proof, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg p-6 border border-white border-opacity-10 bg-white bg-opacity-5">
                <CheckCircle className="w-4 h-4 shrink-0 mt-1" style={{ color: '#B71E52' }} />
                <p className="text-gray-500 text-sm leading-relaxed">{proof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#161142' }}>
            Join the movement
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Be part of Nepal's first institutional gender-lens fund. Together, we're proving that investing in women isn't just the right thing to do—it's the smart thing to do.
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
              Submit Your Business
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}