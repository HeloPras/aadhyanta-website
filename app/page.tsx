
import React from 'react';
import { TrendingUp, Shield, Users, BarChart3, ArrowRight, CheckCircle, Menu, X } from 'lucide-react';
import Footer from '@/components/Layout/Footer';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Service {
  title: string;
  description: string;
  features: string[];
}

const LandingPage: React.FC = () => {


  const features: Feature[] = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-pink" />,
      title: 'Expert Portfolio Management',
      description: 'Strategic investment solutions tailored to your financial goals with proven track records.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-pink" />,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment and mitigation strategies to protect your investments.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary-pink" />,
      title: 'Dedicated Advisory',
      description: 'Personalized guidance from experienced financial advisors committed to your success.'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-pink" />,
      title: 'Real-Time Analytics',
      description: 'Advanced reporting and insights to keep you informed about your portfolio performance.'
    }
  ];

  const stats: Stat[] = [
    { value: '$2.5B+', label: 'Assets Under Management' },
    { value: '15+', label: 'Years of Excellence' },
    { value: '5,000+', label: 'Satisfied Clients' },
    { value: '98%', label: 'Client Retention Rate' }
  ];

  const services: Service[] = [
    {
      title: 'Wealth Management',
      description: 'Comprehensive financial planning and investment management for high-net-worth individuals.',
      features: ['Portfolio Diversification', 'Tax Optimization', 'Estate Planning', 'Retirement Strategies']
    },
    {
      title: 'Institutional Services',
      description: 'Tailored solutions for corporations, foundations, and institutional investors.',
      features: ['Custom Mandates', 'ESG Integration', 'Performance Reporting', 'Regulatory Compliance']
    },
    {
      title: 'Alternative Investments',
      description: 'Access to exclusive investment opportunities across various asset classes.',
      features: ['Private Equity', 'Real Estate', 'Hedge Funds', 'Venture Capital']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}


      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(135deg,#161142_0%,#2d1b69_100%)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight hero-bold">
              Elevate Your Wealth<br />
              <span className="text-primary-pink">With Expert Fund Management</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Strategic investment solutions backed by 15+ years of excellence.
              We manage your wealth with precision, transparency, and unwavering commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 bg-primary-pink  cursor-pointer"
              >
                Start Investing Today
              </button>
              <button className="px-8 py-4 rounded-lg bg-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 text-primary-blue">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-blue">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary-blue">
              Why Choose Aadhyanta Fund
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference of working with a premier fund management firm dedicated to your financial success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-primary-blue">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary-blue  ">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions tailored to your investment needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary-blue">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-primary-pink" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-blue text-primary-pink">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Wealth?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors who trust us with their financial future.
            Schedule a consultation with our expert advisors today.
          </p>
          <button
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center bg-primary-pink text-white cursor-pointer "
          >
            Schedule Consultation
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
};

export default LandingPage;