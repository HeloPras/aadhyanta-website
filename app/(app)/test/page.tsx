import React from 'react';
import { ChevronRight, TrendingUp, Users, Building2 } from 'lucide-react';

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const HighlightsSection: React.FC = () => {
  const highlights: Highlight[] = [
    {
      icon: <Users className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Simrik Fund Launch',
      description: "Nepal's first gender-lens investment fund, managed by an all-women deal team, targeting women-led and women-benefiting enterprises. This pioneering initiative addresses the critical financing gap faced by women entrepreneurs while demonstrating that gender-inclusive investing delivers strong financial and social returns.",
      image: 'simrik'
    },
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Koshi Accelerator Program',
      description: "A targeted provincial development initiative supporting enterprises in Nepal's Koshi Province, strengthening local economic ecosystems through capital access, technical assistance, and market linkages. This program demonstrates our commitment to inclusive development beyond Kathmandu valley.",
      image: 'koshi'
    },
    {
      icon: <Building2 className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'DV Excellus Partnership',
      description: "Strategic growth investment in one of Nepal's leading manufacturing enterprises, showcasing our approach to value creation through governance strengthening, operational excellence, and market expansion support alongside patient capital deployment.",
      image: 'dv'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6" style={{ color: '#B71E52' }}>
              Recent Initiatives
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
              Building Nepal's investment future
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Our recent initiatives demonstrate our commitment to expanding access to capital while strengthening the broader investment ecosystem. From launching Nepal's first gender-lens fund to pioneering provincial acceleration programs, we're creating pathways for inclusive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid - Clean cards with borders */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-transparent"
              >
                {/* Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {highlight.image === 'simrik' && (
                    <svg className="w-full h-full p-12" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Office meeting illustration */}
                      <rect x="40" y="80" width="120" height="140" fill="#161142" opacity="0.1" rx="4"/>
                      <rect x="50" y="90" width="100" height="70" fill="white" stroke="#161142" strokeWidth="2"/>
                      <path d="M 60 120 Q 100 100 140 120" stroke="#161142" strokeWidth="2" fill="none"/>
                      <circle cx="75" cy="140" r="15" fill="#B71E52" opacity="0.3"/>
                      <circle cx="125" cy="140" r="15" fill="#B71E52" opacity="0.3"/>
                      <rect x="200" y="100" width="120" height="100" fill="white" stroke="#161142" strokeWidth="2"/>
                      <line x1="220" y1="120" x2="300" y2="120" stroke="#B71E52" strokeWidth="2"/>
                      <line x1="220" y1="140" x2="280" y2="140" stroke="#161142" strokeWidth="2"/>
                      <line x1="220" y1="160" x2="290" y2="160" stroke="#161142" strokeWidth="2"/>
                      <circle cx="260" cy="80" r="20" fill="#B71E52" opacity="0.2"/>
                    </svg>
                  )}
                  {highlight.image === 'koshi' && (
                    <svg className="w-full h-full p-12" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Provincial/rural development illustration */}
                      <path d="M 50 180 L 100 150 L 150 180 L 150 220 L 50 220 Z" fill="white" stroke="#161142" strokeWidth="2"/>
                      <rect x="80" y="190" width="20" height="30" fill="#B71E52" opacity="0.3"/>
                      <rect x="150" y="160" width="80" height="60" fill="white" stroke="#161142" strokeWidth="2"/>
                      <rect x="170" y="180" width="15" height="15" fill="#161142" opacity="0.2"/>
                      <rect x="200" y="180" width="15" height="15" fill="#161142" opacity="0.2"/>
                      <circle cx="280" cy="140" r="30" fill="#B71E52" opacity="0.1"/>
                      <path d="M 250 180 L 280 180 L 280 220 L 250 220" stroke="#161142" strokeWidth="2" fill="white"/>
                      <rect x="260" y="150" width="40" height="20" fill="white" stroke="#161142" strokeWidth="2"/>
                      <text x="265" y="165" fontSize="10" fill="#161142" fontWeight="bold">KOSHI</text>
                      <path d="M 20 200 Q 200 190 380 200" stroke="#B71E52" strokeWidth="1" opacity="0.3" fill="none"/>
                    </svg>
                  )}
                  {highlight.image === 'dv' && (
                    <svg className="w-full h-full p-12" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Manufacturing/industrial illustration */}
                      <rect x="80" y="100" width="60" height="120" fill="white" stroke="#161142" strokeWidth="2"/>
                      <rect x="160" y="80" width="60" height="140" fill="white" stroke="#161142" strokeWidth="2"/>
                      <rect x="240" y="120" width="60" height="100" fill="white" stroke="#161142" strokeWidth="2"/>
                      <rect x="95" y="50" width="10" height="50" fill="#B71E52" opacity="0.6"/>
                      <rect x="175" y="30" width="10" height="50" fill="#B71E52" opacity="0.6"/>
                      <rect x="255" y="60" width="10" height="60" fill="#B71E52" opacity="0.6"/>
                      <rect x="50" y="180" width="40" height="40" fill="#161142" opacity="0.1"/>
                      <circle cx="70" cy="200" r="8" fill="#B71E52" opacity="0.4"/>
                      <path d="M 20 220 L 380 220" stroke="#161142" strokeWidth="3"/>
                      <path d="M 10 150 L 40 140 L 50 160" stroke="#161142" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:underline" style={{ color: '#161142' }}>
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {highlight.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center font-semibold transition-colors duration-200 group-hover:underline"
                    style={{ color: '#B71E52' }}
                  >
                    Learn more
                    <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
              Impact Metrics
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Creating measurable impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our initiatives are driving real change across Nepal's investment landscape
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>
                250+
              </div>
              <div className="text-gray-600 font-medium">Enterprises Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>
                15K+
              </div>
              <div className="text-gray-600 font-medium">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>
                7
              </div>
              <div className="text-gray-600 font-medium">Provinces Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#161142' }}>
                65%
              </div>
              <div className="text-gray-600 font-medium">Women-Led Businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
                Our Approach
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#161142' }}>
                Patient capital for sustainable growth
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our investment philosophy centers on deploying patient capital that enables enterprises to build sustainable competitive advantages. We combine financial resources with strategic guidance, operational support, and market access to drive transformational growth.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                By focusing on sectors critical to Nepal's economic development—from manufacturing to agriculture to technology—we're helping build a more resilient and inclusive economy.
              </p>
              <a 
                href="#approach" 
                className="inline-flex items-center font-semibold text-lg transition-colors duration-200"
                style={{ color: '#B71E52' }}
              >
                Read about our investment approach
                <ChevronRight className="ml-1" size={20} />
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#161142' }}>
                Investment Focus Areas
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Gender-Inclusive Finance</div>
                    <div className="text-gray-600 text-sm">Supporting women entrepreneurs and gender-lens investing</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Provincial Development</div>
                    <div className="text-gray-600 text-sm">Catalyzing economic growth beyond the Kathmandu valley</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Manufacturing Excellence</div>
                    <div className="text-gray-600 text-sm">Building world-class production capabilities</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: '#B71E52' }} />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Ecosystem Building</div>
                    <div className="text-gray-600 text-sm">Strengthening the broader investment infrastructure</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#161142' }}>
            Partner with us
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Whether you're an enterprise seeking growth capital or an investor looking to make an impact, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center group"
              style={{ backgroundColor: '#B71E52' }}
            >
              Explore Opportunities
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg border-2 inline-flex items-center justify-center" 
              style={{ borderColor: '#161142', color: '#161142' }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HighlightsSection;