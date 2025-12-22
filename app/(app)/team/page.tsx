"use client"
import React, { useState } from 'react';
import { Linkedin, Mail, Award, Briefcase, GraduationCap } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  department: string;
  bio: string;
  experience: string;
  education: string;
  specialties: string[];
  initials: string;
}

interface Department {
  name: string;
  color: string;
}

const TeamPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  const departments: Department[] = [
    { name: 'All', color: '#161142' },
    { name: 'Executive', color: '#B71E52' },
    { name: 'Investment', color: '#161142' },
    { name: 'Operations', color: '#B71E52' },
    { name: 'Client Relations', color: '#161142' }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Michael Chen',
      position: 'Chief Executive Officer',
      department: 'Executive',
      bio: 'Michael brings over 25 years of leadership experience in asset management and private equity. He has successfully managed portfolios exceeding $10 billion and led multiple firms through periods of significant growth.',
      experience: '25+ years in Asset Management',
      education: 'MBA, Harvard Business School',
      specialties: ['Strategic Planning', 'M&A', 'Corporate Governance', 'Leadership'],
      initials: 'MC'
    },
    {
      name: 'Sarah Williams',
      position: 'Chief Investment Officer',
      department: 'Investment',
      bio: 'Sarah is a seasoned portfolio manager with an exceptional track record of delivering alpha. Her quantitative approach and deep market insights have consistently outperformed benchmarks.',
      experience: '20+ years in Portfolio Management',
      education: 'CFA, MS Finance - MIT',
      specialties: ['Portfolio Strategy', 'Quantitative Analysis', 'Risk Assessment', 'Global Markets'],
      initials: 'SW'
    },
    {
      name: 'David Martinez',
      position: 'Head of Risk Management',
      department: 'Operations',
      bio: 'David specializes in comprehensive risk assessment and mitigation strategies. His PhD research focused on market volatility and systematic risk in emerging markets.',
      experience: '18+ years in Risk Management',
      education: 'PhD Financial Engineering - Stanford',
      specialties: ['Risk Modeling', 'Compliance', 'Derivatives', 'Stress Testing'],
      initials: 'DM'
    },
    {
      name: 'Emily Thompson',
      position: 'Managing Director',
      department: 'Executive',
      bio: 'Emily oversees strategic growth initiatives and institutional client relationships. She has been instrumental in expanding our global footprint and establishing key partnerships.',
      experience: '22+ years in Business Development',
      education: 'MBA, Wharton School',
      specialties: ['Business Development', 'Strategic Partnerships', 'Client Strategy', 'Market Expansion'],
      initials: 'ET'
    },
    {
      name: 'James Anderson',
      position: 'Senior Portfolio Manager',
      department: 'Investment',
      bio: 'James manages our equity portfolios with a focus on technology and healthcare sectors. His research-driven approach has generated consistent returns for our clients.',
      experience: '15+ years in Equity Research',
      education: 'CFA, MBA - Columbia',
      specialties: ['Equity Analysis', 'Sector Research', 'Tech & Healthcare', 'Value Investing'],
      initials: 'JA'
    },
    {
      name: 'Lisa Wong',
      position: 'Director of Operations',
      department: 'Operations',
      bio: 'Lisa ensures operational excellence across all our processes. Her expertise in compliance and regulatory frameworks keeps our operations running smoothly and securely.',
      experience: '16+ years in Operations',
      education: 'MS Operations Management',
      specialties: ['Operations Management', 'Compliance', 'Process Optimization', 'Technology Integration'],
      initials: 'LW'
    },
    {
      name: 'Robert Kim',
      position: 'Head of Fixed Income',
      department: 'Investment',
      bio: 'Robert leads our fixed income strategies with expertise in bonds, credit analysis, and interest rate management. His conservative approach balances growth with capital preservation.',
      experience: '19+ years in Fixed Income',
      education: 'CFA, MBA - NYU Stern',
      specialties: ['Bond Markets', 'Credit Analysis', 'Duration Management', 'Yield Strategies'],
      initials: 'RK'
    },
    {
      name: 'Jennifer Lee',
      position: 'Director of Client Relations',
      department: 'Client Relations',
      bio: 'Jennifer builds and maintains strong relationships with our high-net-worth clients. Her personalized approach ensures each client receives tailored investment solutions.',
      experience: '14+ years in Client Services',
      education: 'MBA, CFP - UC Berkeley',
      specialties: ['Client Advisory', 'Wealth Planning', 'Relationship Management', 'Financial Planning'],
      initials: 'JL'
    },
    {
      name: 'Thomas Brown',
      position: 'VP Alternative Investments',
      department: 'Investment',
      bio: 'Thomas specializes in private equity, hedge funds, and real estate investments. He identifies unique opportunities that provide diversification and enhanced returns.',
      experience: '12+ years in Alternatives',
      education: 'CFA, MS Real Estate Finance',
      specialties: ['Private Equity', 'Real Estate', 'Hedge Funds', 'Alternative Strategies'],
      initials: 'TB'
    },
    {
      name: 'Maria Garcia',
      position: 'Senior Client Advisor',
      department: 'Client Relations',
      bio: 'Maria provides comprehensive financial guidance to our institutional clients. Her analytical skills and market knowledge help clients navigate complex investment decisions.',
      experience: '11+ years in Advisory',
      education: 'CFP, MBA - Georgetown',
      specialties: ['Institutional Advisory', 'Portfolio Construction', 'Asset Allocation', 'Performance Analysis'],
      initials: 'MG'
    },
    {
      name: 'Kevin Zhang',
      position: 'Head of Research',
      department: 'Investment',
      bio: 'Kevin leads our research team in conducting in-depth market analysis and investment research. His insights drive our investment strategies and decision-making processes.',
      experience: '17+ years in Research',
      education: 'PhD Economics - Princeton',
      specialties: ['Economic Research', 'Market Analysis', 'Quantitative Models', 'Investment Research'],
      initials: 'KZ'
    },
    {
      name: 'Amanda Brooks',
      position: 'VP Client Experience',
      department: 'Client Relations',
      bio: 'Amanda is dedicated to ensuring exceptional client experiences. She oversees client communications, reporting, and satisfaction initiatives across all touchpoints.',
      experience: '13+ years in Client Success',
      education: 'MBA - Northwestern Kellogg',
      specialties: ['Client Experience', 'Service Excellence', 'Communication Strategy', 'Client Retention'],
      initials: 'AB'
    }
  ];

  const filteredMembers = selectedDepartment === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #161142 0%, #2d1b69 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Meet Our <span style={{ color: '#B71E52' }}>Expert Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our team of seasoned professionals brings decades of combined experience in investment 
              management, financial analysis, and client service to help you achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept, index) => (
              <button
                key={index}
                onClick={() => setSelectedDepartment(dept.name)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedDepartment === dept.name 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedDepartment === dept.name ? { backgroundColor: dept.color } : {}}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Profile Header */}
                <div className="h-48 flex items-center justify-center text-white text-5xl font-bold relative" style={{ backgroundColor: '#161142' }}>
                  {member.initials}
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#161142' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#B71E52' }}>
                    {member.position}
                  </p>
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">
                    {member.department}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Experience & Education */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Briefcase size={16} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#B71E52' }} />
                      <span className="text-sm text-gray-700">{member.experience}</span>
                    </div>
                    <div className="flex items-start">
                      <GraduationCap size={16} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#B71E52' }} />
                      <span className="text-sm text-gray-700">{member.education}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="flex items-center mb-2">
                      <Award size={16} className="mr-2" style={{ color: '#B71E52' }} />
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Our Team by Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#B71E52' }}>150+</div>
              <div className="text-gray-600 font-medium">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#B71E52' }}>450+</div>
              <div className="text-gray-600 font-medium">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#B71E52' }}>85%</div>
              <div className="text-gray-600 font-medium">Hold Advanced Degrees</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#B71E52' }}>40+</div>
              <div className="text-gray-600 font-medium">CFA Charterholders</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#161142' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for talented professionals who share our commitment to excellence 
            and client success. Explore career opportunities at Apex Fund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: '#B71E52' }}
            >
              View Open Positions
            </button>
            <button className="px-8 py-4 rounded-lg bg-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105" style={{ color: '#161142' }}>
              Contact a Team Member
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;