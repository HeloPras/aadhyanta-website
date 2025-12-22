import React from 'react';

const footerData = {
  brand: {
    name: 'Aadhyanta Fund',
    color: '#B71E52',
    description: 'Your trusted partner in wealth management and investment excellence.',
  },
  sections: [
    {
      title: 'Services',
      items: [
        { name: 'Wealth Management', href: '/services/wealth-management' },
        { name: 'Institutional Services', href: '/services/institutional' },
        { name: 'Alternative Investments', href: '/services/alternative-investments' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Contact',
      items: [
        { name: 'info@aadhyanta.com', href: 'mailto:info@aadhyanta.com' },
        { name: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { name: 'New York, NY 10001', href: 'https://www.google.com/maps/search/New+York,+NY+10001', target: '_blank', rel: 'noopener noreferrer' },
      ],
    },
  ],
  copyright: '© 2024 Aadhyanta Fund Management. All rights reserved.',
};

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-primary-pink">
                {footerData.brand.name}
              </span>
              <p className="mt-4 text-gray-400">
                {footerData.brand.description}
              </p>
            </div>
            {footerData.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="hover:text-white transition-colors"
                          target={item.target || '_self'}
                          rel={item.rel || ''}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{footerData.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;