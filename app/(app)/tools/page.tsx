import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const page = () => {
  const tools = [
    {
      name: "Term Sheet Generator",
      link: "/tools/term-sheet-generator",
      description: "Generate clean, investor-ready term sheets in minutes.",
      image: "https://picsum.photos/seed/tool1/400/300",
    },
    {
      name: "Tool 2",
      link: "#",
      description: "Description of Tool 2",
      image: "https://picsum.photos/seed/tool2/400/300",
    },
    {
      name: "Tool 3",
      link: "#",
      description: "Description of Tool 3",
      image: "https://picsum.photos/seed/tool3/400/300",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#161142] to-[#B71E52]">
            Powerful Business Tools
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Explore our suite of carefully crafted tools designed to simplify
            complex decisions, improve accuracy, and accelerate execution.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-medium text-[#B71E52] group-hover:gap-3 transition-all">
                    Explore Tool
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
