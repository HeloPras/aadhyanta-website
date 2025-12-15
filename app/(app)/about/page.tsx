import React from 'react';
import { Award, Target, Eye, Heart, TrendingUp, Users, Globe, Briefcase } from 'lucide-react';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
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
  const values: Value[] = [
    {
      icon: <Award className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Excellence',
      description: 'We strive for excellence in every investment decision and client interaction, maintaining the highest standards of professionalism.'
    },
    {
      icon: <Heart className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Integrity',
      description: 'Trust and transparency form the foundation of our relationships. We operate with unwavering ethical standards.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Innovation',
      description: 'We embrace cutting-edge strategies and technology to deliver superior investment outcomes for our clients.'
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: '#B71E52' }} />,
      title: 'Client-Centric',
      description: 'Your financial goals are our priority. We tailor our approach to meet your unique needs and aspirations.'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Michael Chen',
      position: 'Chief Executive Officer',
      bio: '25+ years of experience in asset management and private equity',
      image: 'MC'
    },
    {
      name: 'Sarah Williams',
      position: 'Chief Investment Officer',
      bio: 'Former portfolio manager at Fortune 500 investment firms',
      image: 'SW'
    },
    {
      name: 'David Martinez',
      position: 'Head of Risk Management',
      bio: 'PhD in Financial Engineering with 20 years industry experience',
      image: 'DM'
    },
    {
      name: 'Emily Thompson',
      position: 'Managing Director',
      bio: 'Specialist in institutional client relations and strategic growth',
      image: 'ET'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #161142 0%, #2d1b69 100%)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span style={{ color: '#B71E52' }}>Aadhyanta Fund</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, we've been dedicated to helping individuals and institutions 
              achieve their financial goals through strategic investment management and personalized service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-10 rounded-2xl">
              <div className="flex items-center mb-6">
                <Target className="w-10 h-10 mr-4" style={{ color: '#B71E52' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#161142' }}>Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To provide world-class investment management services that create lasting value 
                for our clients. We combine rigorous analysis, innovative strategies, and 
                personalized attention to help you build and preserve wealth across generations.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-2xl">
              <div className="flex items-center mb-6">
                <Eye className="w-10 h-10 mr-4" style={{ color: '#B71E52' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#161142' }}>Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the most trusted and respected fund management firm globally, recognized 
                for our integrity, performance, and commitment to client success. We envision 
                a future where every investor has access to institutional-quality management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every relationship we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#161142' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              A legacy of growth, innovation, and unwavering commitment
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full" style={{ backgroundColor: '#B71E52', opacity: 0.2 }}></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#B71E52' }}>
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#161142' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center w-full md:w-2/12 my-4 md:my-0">
                    <div className="w-6 h-6 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: '#B71E52' }}></div>
                  </div>

                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#161142' }}>
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals guiding Aadhyanta Fund
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-64 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundColor: '#161142' }}>
                  {member.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#161142' }}>
                    {member.name}
                  </h3>
                  <p className="mb-3 font-semibold" style={{ color: '#B71E52' }}>
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#161142' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Globe className="w-12 h-12 mx-auto mb-4" style={{ color: '#B71E52' }} />
              <div className="text-4xl font-bold text-white mb-2">12+</div>
              <div className="text-gray-300">Countries Served</div>
            </div>
            <div>
              <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: '#B71E52' }} />
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-gray-300">Expert Team Members</div>
            </div>
            <div>
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: '#B71E52' }} />
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-300">Industry Awards</div>
            </div>
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#B71E52' }} />
              <div className="text-4xl font-bold text-white mb-2">18.5%</div>
              <div className="text-gray-300">Avg. Annual Return</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#161142' }}>
            Partner With Us
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how our expertise and commitment can help you achieve your financial aspirations. 
            Let's build your financial future together.
          </p>
          <button 
            className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#B71E52' }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;