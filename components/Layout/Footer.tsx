// import React from 'react';

// const footerData = {
//   brand: {
//     name: 'Aadhyanta Fund',
//     color: '#B71E52',
//     description: 'Your trusted partner in wealth management and investment excellence.',
//   },
//   sections: [
//     {
//       title: 'Services',
//       items: [
//         { name: 'Wealth Management', href: '/services/wealth-management' },
//         { name: 'Institutional Services', href: '/services/institutional' },
//         { name: 'Alternative Investments', href: '/services/alternative-investments' },
//       ],
//     },
//     {
//       title: 'Company',
//       items: [
//         { name: 'About Us', href: '/about' },
//         { name: 'Our Team', href: '/team' },
//         { name: 'Careers', href: '/careers' },
//       ],
//     },
//     {
//       title: 'Contact',
//       items: [
//         { name: 'info@aadhyanta.com', href: 'mailto:info@aadhyanta.com' },
//         { name: '01-4526601 / 01-4526601 '},
//         { name: 'Dharamarga, Baluwatar-4, Kathmandu, Nepal', href: 'https://www.google.com/maps/search/New+York,+NY+10001', target: '_blank', rel: 'noopener noreferrer' },
//       ],
//     },
//     {title:'',items:[]},
//     {title:'',items:[]},
//     {title:'',items:[]},
//     {
//       title:'Specialized Contacts',
// items:[
//   {name:'Investments: investments@aadhyanta.com',href:'mailto:investments@aadhyanta.com'},
//   {name:'Partnerships: partnerships@aadhyanta.com',href:'mailto:partnerships@aadhyanta.com'},
//   {name:'Governance: governance@aadhyanta.com',href:'mailto:governance@aadhyanta.com'}]
//     }
//   ],
//   copyright: '© 2024 Aadhyanta Fund Management. All rights reserved.',
// };

// const Footer = () => {
//   return (
//     <div>
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <span className="text-2xl font-bold text-primary-pink">
//                 {footerData.brand.name}
//               </span>
//               <p className="mt-4 text-gray-400">
//                 {footerData.brand.description}
//               </p>
//             </div>
//             {footerData.sections.map((section, index) => (
//               <div key={index}>
//                 <h4 className="font-semibold mb-4">{section.title}</h4>
//                 <ul className="space-y-2 text-gray-400">
//                   {section.items.map((item, itemIndex) => (
//                     <li key={itemIndex}>
//                       {item.href ? (
//                         <a 
//                           href={item.href} 
//                           className="hover:text-white transition-colors"
//                           target={item.target || '_self'}
//                           rel={item.rel || ''}
//                         >
//                           {item.name}
//                         </a>
//                       ) : (
//                         <span>{item.name}</span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>{footerData.copyright}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

function Footer() {
  return (
    <footer className="bg-[#1C1C2E] pt-16 pb-8 border-t-[3px] border-[#B71E52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-[#B71E52] flex items-center justify-center">
                <span className="font-display font-bold text-white text-[13px]">
                  A
                </span>
              </div>
              <span className="font-display font-bold text-white text-base">
                Aadhyanta Fund
              </span>
            </div>
            <p className="text-[13px] text-white/35 leading-[1.75] max-w-[220px]">
              Nepal's first SEBON-licensed institutional fund manager, deploying
              growth capital across all seven provinces.
            </p>
          </div>

          {/* Link columns */}
          {[
            {
              title: "Funds",
              links: [
                { name: "NOF I", href: "/fund/nofone" },
                { name: "NOF II", href: "/fund/noftwo" },
                { name: "Simrik Fund", href: "/fund/simri" },
                { name: "Overview", href: "/fund" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About", href: "/about" },
                { name: "Team", href: "/team" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Program", href: "/program" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Insights", href: "/insights" },
                { name: "Contact", href: "/contact-us" },
                { name: "Tools", href: "/tools" },
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <div className="font-mono-dm text-[10px] text-white/30 tracking-[0.12em] uppercase mb-5">
                {col.title}
              </div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {l.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="text-[12px] text-white/20">
            © 2025 Aadhyanta Fund Management. All rights reserved. SEBON
            Licensed.
          </span>
          <span className="font-mono-dm text-[10px] text-white/15 tracking-widest uppercase">
            Kathmandu, Nepal
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer