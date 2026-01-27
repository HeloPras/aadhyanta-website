import React from 'react';
import { TrendingUp, Users, Building2 } from 'lucide-react';

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightsSection: React.FC = () => {
 

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#B71E52' }}>
            Recent Highlights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#161142' }}>
            Building Nepal's investment future
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
         
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;