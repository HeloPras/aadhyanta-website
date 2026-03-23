'use client'
import React from 'react';
import { ArrowRight, Grid, List, Share2, Mail, Rss } from 'lucide-react';

// ── Types ──
interface Article {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

interface CategoryItem {
  name: string;
  count: number;
}

interface TopInsight {
  rank: string;
  title: string;
  readTime: string;
}

// ── Reusable Components ──
const PerformanceRibbon: React.FC = () => (
  <div className="w-full h-12 bg-gray-900 flex items-center overflow-hidden">
    <div className="flex animate-marquee text-white text-xs uppercase tracking-widest gap-16 px-8 items-center whitespace-nowrap">
      <span>Nepal Opportunity Fund I: Fully Deployed • Portfolio Advancing</span>
      <span>Nepal Opportunity Fund II: Active Deployment</span>
      <span>Simrik Fund: NPR 170M+ Capital Mobilized</span>
      <span>200+ Enterprises Supported Through Accelerator</span>
      <span>Nepal Opportunity Fund I: Fully Deployed • Portfolio Advancing</span>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
    `}</style>
  </div>
);

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <article className="flex flex-col space-y-6">
    <div className="aspect-4/3 bg-gray-100 overflow-hidden rounded-lg">
      <img
        alt={article.title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        src={article.image}
      />
    </div>
    <div className="space-y-3">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B71E52' }}>
        {article.category}
      </span>
      <h3 className="text-2xl font-bold leading-tight hover:opacity-70 transition-opacity cursor-pointer" style={{ color: '#161142' }}>
        {article.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>
      <div className="pt-2 flex justify-between items-center text-xs text-gray-500">
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>
    </div>
  </article>
);

const NewsletterSignup: React.FC = () => (
  <div className="rounded-lg p-10 text-white space-y-6" style={{ backgroundColor: '#161142' }}>
    <h3 className="text-3xl font-bold italic">The Aadhyanta Brief</h3>
    <p className="text-sm opacity-80 leading-relaxed">
      Exclusive market intelligence and investment insights delivered bi-weekly to institutional investors and partners.
    </p>
    <div className="space-y-4">
      <input
        className="w-full bg-white bg-opacity-10 border-none rounded-lg p-4 text-white placeholder:text-white placeholder:opacity-40 focus:ring-2 outline-none transition-all"
        placeholder="Professional Email"
        type="email"
      />
      <button
        className="w-full text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all"
        style={{ backgroundColor: '#B71E52' }}
      >
        Request Access
      </button>
    </div>
    <p className="text-[10px] opacity-40 uppercase tracking-widest text-center">
      Qualified Institutional Investors Only
    </p>
  </div>
);

const CategoryList: React.FC<{ categories: CategoryItem[] }> = ({ categories }) => (
  <div className="space-y-8">
    <h4 className="text-xs uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-4">
      Categories
    </h4>
    <ul className="space-y-4">
      {categories.map((cat, i) => (
        <li key={i}>
          <a className="flex justify-between group py-1" href="#">
            <span className="font-medium group-hover:opacity-70 transition-opacity" style={{ color: '#161142' }}>
              {cat.name}
            </span>
            <span className="text-gray-500 text-sm">{cat.count}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const TopInsightsList: React.FC<{ insights: TopInsight[] }> = ({ insights }) => (
  <div className="space-y-8">
    <h4 className="text-xs uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-4">
      Most Read
    </h4>
    <div className="space-y-8">
      {insights.map((insight, i) => (
        <div key={i} className="flex gap-4 items-start group cursor-pointer">
          <span className="text-3xl font-bold italic text-gray-300 group-hover:opacity-70 transition-opacity" style={{ color: i === 0 ? '#B71E52' : undefined }}>
            {insight.rank}
          </span>
          <div className="space-y-1">
            <h5 className="text-sm font-medium leading-snug group-hover:opacity-70 transition-opacity" style={{ color: '#161142' }}>
              {insight.title}
            </h5>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              {insight.readTime}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Main Component ──
export default function InsightsPage() {
  const articles: Article[] = [
    {
      category: 'Investment Strategy',
      title: 'Building Nepal\'s First Gender-Lens Fund: Lessons from Year One',
      excerpt: 'How the Simrik Fund is proving that gender-lens investing delivers both impact and competitive returns in Nepal\'s evolving capital markets.',
      author: 'Investment Team',
      date: 'Nov 15, 2024',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
    },
    {
      category: 'Market Analysis',
      title: 'Provincial Capital: The Koshi Model for Regional Investment',
      excerpt: 'Evaluating the success of provincial acceleration programs and their role in creating investment-ready enterprises beyond Kathmandu.',
      author: 'Research Team',
      date: 'Nov 10, 2024',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
    },
    {
      category: 'Portfolio Insights',
      title: 'From Due Diligence to Exit: NOF I Portfolio Performance',
      excerpt: 'A transparent look at our flagship fund\'s journey from capital deployment to building exit pathways through Nepal\'s public markets.',
      author: 'Fund Management',
      date: 'Nov 5, 2024',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      category: 'Impact Measurement',
      title: 'Beyond Returns: Measuring Impact That Matters',
      excerpt: 'How we track SDG-aligned metrics with the same rigor as financial KPIs across our portfolio companies.',
      author: 'Impact Team',
      date: 'Oct 28, 2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
  ];

  const categories: CategoryItem[] = [
    { name: 'Investment Strategy', count: 18 },
    { name: 'Market Analysis', count: 24 },
    { name: 'Portfolio Insights', count: 12 },
    { name: 'Impact Measurement', count: 9 },
    { name: 'Ecosystem Building', count: 15 },
  ];

  const topInsights: TopInsight[] = [
    {
      rank: '01',
      title: 'Institutional Private Equity in Nepal: The NOF I Proof of Concept',
      readTime: '12 min read',
    },
    {
      rank: '02',
      title: 'Blended Finance Structures: Expanding Impact Without Diluting Discipline',
      readTime: '8 min read',
    },
    {
      rank: '03',
      title: 'The Accelerator-to-Fund Pipeline: How We Build Tomorrow\'s Investments',
      readTime: '10 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Performance Ribbon */}
      {/* <PerformanceRibbon /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Featured Article */}
        <section className="mb-24">
          <div className="grid grid-cols-12 gap-12 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  alt="Featured insight"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop"
                />
                <div className="absolute top-6 left-6 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white" style={{ backgroundColor: 'rgba(22, 17, 66, 0.9)' }}>
                  Featured Insight
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-8">
              <div className="space-y-4">
                <span className="text-sm uppercase tracking-widest" style={{ color: '#B71E52' }}>
                  Fund Strategy • November 2024
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: '#161142' }}>
                  Blended Finance in Practice: NOF II's First Year
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  How Nepal Opportunity Fund II is combining commercial and concessional capital to expand our investable universe while maintaining institutional discipline and competitive returns.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold" style={{ color: '#161142' }}>
                  AF
                </div>
                <div className="flex flex-col">
                  <span className="font-medium" style={{ color: '#161142' }}>Aadhyanta Team</span>
                  <span className="text-xs text-gray-500">Investment Committee</span>
                </div>
              </div>
              <div>
                <a
                  className="inline-flex items-center gap-2 font-semibold border-b-2 border-transparent hover:border-current transition-all pb-1 group"
                  href="#"
                  style={{ color: '#B71E52' }}
                >
                  Read Full Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-16">
          {/* Articles Grid */}
          <div className="col-span-12 lg:col-span-8">
            <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
              <h2 className="text-3xl font-bold italic" style={{ color: '#161142' }}>
                Recent Publications
              </h2>
              <div className="flex gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#161142' }}>
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 rounded-full hover:bg-gray-100 transition-colors">
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
              {articles.map((article, i) => (
                <ArticleCard key={i} article={article} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button
                className="px-10 py-4 border-2 font-medium hover:text-white transition-all rounded-lg"
                style={{ borderColor: '#161142', color: '#161142' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161142')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                View All Insights
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-16">
            <NewsletterSignup />
            <CategoryList categories={categories} />
            <TopInsightsList insights={topInsights} />
          </aside>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 bg-gray-50 pt-20 pb-10 mt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 col-span-2">
          <div className="space-y-8">
            <div className="text-2xl font-bold italic" style={{ color: '#161142' }}>
              Aadhyanta Fund
            </div>
            <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
              Institutional fund management and ecosystem building for Nepal's growth economy. Creating sustainable value through disciplined capital deployment and comprehensive enterprise support.
            </p>
            <div className="flex gap-6">
              <a className="text-gray-500 hover:opacity-70 transition-opacity" href="#">
                <Share2 className="w-5 h-5" />
              </a>
              <a className="text-gray-500 hover:opacity-70 transition-opacity" href="#">
                <Mail className="w-5 h-5" />
              </a>
              <a className="text-gray-500 hover:opacity-70 transition-opacity" href="#">
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h5 className="text-xs uppercase tracking-widest font-bold" style={{ color: '#161142' }}>
                Firm
              </h5>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">About Us</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Our Team</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Our Funds</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Programs</a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="text-xs uppercase tracking-widest font-bold" style={{ color: '#161142' }}>
                Legal
              </h5>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">SEBON Compliance</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Privacy Policy</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Terms of Service</a>
              <a className="text-gray-600 text-sm hover:opacity-70 transition-opacity" href="#">Contact</a>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 pt-12 border-t border-gray-200 max-w-7xl mx-auto w-full">
          <p className="text-xs leading-relaxed text-gray-400">
            © 2024 Aadhyanta Fund Management. All rights reserved. SEBON-licensed institutional fund manager. Past performance does not guarantee future results.
          </p>
        </div>
      </footer> */}
    </div>
  );
}