'use client'
import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface Partner {
  title: string;
  description: string;
  features: Feature[];
  button: string;
  link: string;
}

const WorkWithUsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Enterprises');

  const differentPartners: Partner[] = [
    {
      title: "For Enterprises",
      description: "What We Look For",
      features: [
        { title: "Strong Team", description: "Experienced management with domain expertise" },
        { title: "Market Demand", description: "Proven business model with clear positioning" },
        { title: "Governance", description: "Willingness to strengthen systems and transparency" },
        { title: "Use of Capital", description: "Clear growth plan for deployment" },
        { title: "Impact Potential", description: "Jobs, inclusion, sustainability alignment" },
      ],
      button: "Submit Your Enterprise",
      link: "/"
    },
    {
      title: "For Investors",
      description: "What to Expect",
      features: [
        { title: "Disciplined Management", description: "SEBON-licensed institutional processes" },
        { title: "Strong Governance", description: "Transparent reporting and oversight" },
        { title: "Long-term Value", description: "Patient capital with active partnership" },
        { title: "Impact Integration", description: "Rigorous measurement alongside returns" },
        { title: "Local Expertise", description: "Deep Nepal market knowledge" },
      ],
      button: "Investor Inquiry",
      link: "/"
    },
    {
      title: "For Partners",
      description: "How We Collaborate",
      features: [
        { title: "Pipeline Building", description: "Joint enterprise identification and development" },
        { title: "Ecosystem Support", description: "Accelerator and capacity building programs" },
        { title: "Blended Finance", description: "Catalytic capital and risk-sharing structures" },
        { title: "Knowledge Sharing", description: "Research, insights, and best practices" },
        { title: "Measurable Impact", description: "Aligned metrics and transparent reporting" },
      ],
      button: "Partner Inquiry",
      link: "/"
    },
  ];

  const tabs = ['Enterprises', 'Investors', 'Partners'];

  const currentPartner = differentPartners.find(p => 
    p.title.includes(activeTab)
  );

  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className=" mb-16">
          <div
            className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6"
            style={{ color: "#B71E52" }}
          >
            Work with us
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "#161142" }}
              >
                Choose your path with Aadhyanta
              </h2>
            </div>
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're an enterprise seeking growth capital, an investor
                looking for institutional impact opportunities, or a development
                partner interested in ecosystem building—we're ready to
                collaborate toward shared goals of sustainable, inclusive
                economic transformation.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-8 py-4 text-center font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#B71E52] text-[#161142]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  For {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            {currentPartner && (
              <div className="max-w-6xl">
                {/* Title and Description */    }
                <div className="mb-8">
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-3"
                    style={{ color: "#B71E52" }}
                  >
                    {currentPartner.description}
                  </div>
                  <h3
                    className="text-3xl font-bold"
                    style={{ color: "#161142" }}
                  >
                    {currentPartner.title}
                  </h3>
                </div>

                {/* Features List */}
                <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPartner.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="shrink-0 mt-1">
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: "#B71E52" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-bold text-lg mb-1"
                          style={{ color: "#161142" }}
                        >
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-gray-200 flex justify-center ">
                  <button
                    className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl inline-flex items-center group"
                    style={{ backgroundColor: "#B71E52" }}
                  >
                    {currentPartner.button}
                    <ChevronRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Cards */}
      </section>
    </div>
  )
};

export default WorkWithUsSection;