"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/Layout/Navbar"
import {
  Code,
  Network,
  ArrowUpRight,
  Zap,
  Building2,
  Leaf,
  Cpu,
  Factory,
  Search,
  MapPin,
  Calendar,
} from "lucide-react"

/* ─── Global CSS — same token system ────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  body { font-family: 'Outfit', sans-serif; }
  .font-display { font-family: 'Cormorant Garamond', serif; }
  .font-mono-dm { font-family: 'DM Mono', monospace; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.95); }        to { opacity:1; transform:scale(1); } }
  @keyframes heroZoom  { from { transform:scale(1.0); } to { transform:scale(1.05); } }
  @keyframes numberPop { from { opacity:0; transform:translateY(12px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }

  .sr,.sr-l,.sr-r,.sr-s { opacity:0; }
  .sr.on   { animation: fadeUp    0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-l.on { animation: fadeLeft  0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-r.on { animation: fadeRight 0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sr-s.on { animation: scaleIn   0.75s cubic-bezier(0.16,1,0.3,1) forwards; }

  .d1{animation-delay:.05s!important} .d2{animation-delay:.12s!important}
  .d3{animation-delay:.19s!important} .d4{animation-delay:.26s!important}
  .d5{animation-delay:.33s!important} .d6{animation-delay:.40s!important}

  /* Stat pop */
  .stat-pop { animation: numberPop 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

  /* Hero */
  .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Sector ticker */
  .ticker-track { display:flex; width:max-content; animation: marquee 28s linear infinite; }
  .ticker-track:hover { animation-play-state:paused; }

  /* Filter pill */
  .fp { transition: all 0.2s; }
  .fp.active { background:#1C1C2E !important; color:#fff !important; border-color:#1C1C2E !important; }
  .fp:not(.active):hover { border-color:#1C1C2E !important; color:#1C1C2E !important; }

  /* Company card */
  .co-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.2s;
  }
  .co-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 56px rgba(0,0,0,0.1);
    border-color: #B71E52 !important;
  }
  .co-card:hover .co-img { transform: scale(1.05); }
  .co-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .co-card:hover .co-arrow { opacity:1; transform:translate(0,0); }
  .co-arrow {
    opacity:0; transform:translate(-4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }

  /* Search focus */
  .port-search:focus { outline:none; border-color:#B71E52 !important; box-shadow: 0 0 0 3px rgba(183,30,82,0.1); }

  /* Status badge colours */
  .status-active   { background:#F0FDF4; color:#15803D; }
  .status-exit     { background:#EFF6FF; color:#1D4ED8; }
  .status-deployed { background:#FFF7ED; color:#C2410C; }
`

/* ─── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Animated stat ─────────────────────────────────────────────────────── */
function StatValue({ value }: { value: string }) {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.unobserve(e.target)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <span ref={ref} className={show ? "stat-pop" : "opacity-0"}>
      {value}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
type Company = {
  id: string
  name: string
  sector: string
  sectorIcon: React.ReactNode
  fund: "NOF I" | "NOF II" | "Simrik"
  statusCls: string
  province: string
  year: string
  description: string
  tags: string[]
  impacts: string[]
  image: string
  featured?: boolean
  logoPlaceholder: string
}

const companies: Company[] = [
  {
    id: "riddhi-siddhi-cement",
    name: "Riddhi Siddhi Cement",
    sector: "Manufacturing",
    sectorIcon: <Factory size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Bagmati Province",
    year: "2019",
    description:
      "Integrated cement and clinker manufacturer based in Hetauda, established as a joint venture between Shanker Group and Ambe Group. The company focuses on high-quality, technology-driven cement production using robotic quality control systems, VRM grinding technology, and energy-efficient manufacturing processes.",
    tags: ["Cement", "Infrastructure", "Manufacturing"],
    impacts: [
      "Advanced robotic quality control in cement manufacturing",
      "Energy-efficient VRM production technology",
      "Nationwide cement distribution and infrastructure support",
    ],
    image:
      "/aadhyanta/Portfolio/riddhisiddhi.jpg",
    featured: true,
    logoPlaceholder: "RS",
  },

  {
    id: "dishhome",
    name: "DishHome",
    sector: "Telecommunications & Digital Services",
    sectorIcon: <Network size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Bagmati Province",
    year: "2010",
    description:
      "Leading Nepalese digital service provider offering direct-to-home television, high-speed fiber internet, OTT streaming, and enterprise connectivity solutions. Expanded nationwide digital access through integrated entertainment and broadband infrastructure.",
    tags: ["Fiber Internet", "Digital TV", "OTT Services"],
    impacts: [
      "Nationwide broadband connectivity",
      "Expanded digital entertainment access",
      "Strengthened digital infrastructure in Nepal",
    ],
    image: "/aadhyanta/Portfolio/dishhome.webp",
    featured: true,
    logoPlaceholder: "DH",
  },

  {
    id: "jagadamba-hospitality",
    name: "Jagadamba Hospitality Limited (Hilton)",
    sector: "Hospitality & Tourism",
    sectorIcon: <Building2 size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Bagmati Province",
    year: "2024",
    description:
      "Luxury five-star hotel located in Naxal, Kathmandu, developed in partnership with Hilton and Shanker Group. The property combines modern hospitality with Nepalese cultural design elements, offering premium accommodation, rooftop dining, wellness facilities, and event spaces for international and domestic travelers.",
    tags: ["Hospitality", "Tourism", "Luxury Hotel"],
    impacts: [
      "Strengthened Nepal’s premium tourism infrastructure",
      "Created high-value hospitality employment",
      "Expanded international hotel investment in Nepal",
    ],
    image: "/aadhyanta/Portfolio/hilton.jpg",
    featured: true,
    logoPlaceholder: "HK",
  },
  {
    id: "aarati-power",
    name: "Aarati Power Company Limited",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Koshi Province",
    year: "2016",
    description:
      "Aarati Power Company Limited is developing the 14.5 MW Upper Irkhuwa Hydropower Project, a run-of-river hydroelectric scheme located in Bhojpur District. The project aims to utilize Nepal’s water resources for sustainable energy generation and contribute to national grid expansion.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "14.5 MW renewable energy generation",
      "Grid-connected hydropower development in eastern Nepal",
      "Promotion of sustainable water resource utilization",
    ],
    image: "/aadhyanta/Portfolio/aarati.jpg",
    featured: true,
    logoPlaceholder: "AP",
  },
  {
    id: "kbnr-isuwa-power",
    name: "K.B.N.R Isuwa Power Limited",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Koshi Province",
    year: "2020",
    description:
      "Developer of the 97.2 MW Isuwa Khola Hydropower Project in Sankhuwasabha, focused on sustainable clean energy generation, national grid contribution, and community infrastructure development through a peaking run-of-river hydropower scheme.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "97.2 MW renewable energy generation",
      "674.30 GWh annual electricity production",
      "50,000+ tons CO₂ emissions avoided annually",
    ],
    image: "/aadhyanta/Portfolio/kbnr.jpg",
    featured: true,
    logoPlaceholder: "KB",
  },

  {
    id: "madame-khola-hydropower",
    name: "Madame Khola Hydropower Project",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Gandaki Province",
    year: "2015",
    description:
      "Madame Khola Hydropower Project is a 24 MW run-of-river hydroelectric project located in the Annapurna Conservation Area in Madi Rural Municipality, Kaski District. The project focuses on harnessing river flow from the Madme Khola system to generate clean electricity and contribute to Nepal’s national grid while following environmental and conservation guidelines.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "24 MW renewable energy generation",
      "Contribution to national grid stability",
      "Support for rural electrification and local infrastructure development",
    ],
    image:
      "/aadhyanta/Portfolio/Madame.jpeg",
    featured: true,
    logoPlaceholder: "MK",
  },
  {
    id: "siddhi-hydropower",
    name: "Siddhi Hydropower Company Limited",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Koshi Province",
    year: "2012",
    description:
      "Siddhi Hydropower Company Limited is a Nepal-based renewable energy developer focused on run-of-river hydropower generation. The company operates a 10 MW hydroelectric project in Ilam District, aiming to harness river energy for sustainable electricity production while supporting Nepal’s growing power demand and environmental goals.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "10 MW renewable energy generation",
      "Contribution to Nepal’s national grid",
      "Support for rural electrification and energy security",
    ],
    image: "/aadhyanta/Portfolio/siddhi.jpg",
    featured: true,
    logoPlaceholder: "SH",
  },
  {
    id: "daunne-agro",
    name: "Daunne Agro Farm Limited",
    sector: "Agriculture & Poultry",
    sectorIcon: <Leaf size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Gandaki Province",
    year: "2018",
    description:
      "Daunne Agro Farm Limited is one of Nepal’s largest commercial egg production companies, specializing in large-scale layer poultry farming. The company operates highly automated farms using imported German and Malaysian technology, producing eggs for nationwide distribution while expanding capacity through modern, technology-driven agriculture systems.",
    tags: ["Poultry", "Egg Production", "Agri-Tech"],
    impacts: [
      "400,000+ layer chickens in operation",
      "Approx. 1,700 cartons of eggs produced daily",
      "Advanced automated poultry farming systems",
      "Supports national food supply and agro-industrial growth",
    ],
    image: "/aadhyanta/Portfolio/daunne.jfif",
    featured: true,
    logoPlaceholder: "DA",
  },
  {
    id: "doodhpokhari-chepe-hydropower",
    name: "Doodhpokhari Chepe Hydropower Public Limited",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Gandaki Province",
    year: "2017",
    description:
      "Doodhpokhari Chepe Hydropower Public Limited is a run-of-river hydropower developer promoting the 11 MW Chepe Khola Hydropower Project located on the Chepe River, a tributary of the Marsyangdi River along the Gorkha–Lamjung border. The project is focused on generating clean electricity for Nepal’s national grid while supporting local infrastructure development and sustainable resource utilization.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "11 MW renewable energy generation",
      "Contribution to national grid expansion",
      "Local employment and infrastructure development in Chepe corridor",
    ],
    image: "/aadhyanta/Portfolio/doodhpokhari.png",
    featured: true,
    logoPlaceholder: "DC",
  },
  {
    id: "shikhar-power-development",
    name: "Shikhar Power Development Limited",
    sector: "Renewable Energy",
    sectorIcon: <Zap size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Gandaki Province",
    year: "2015",
    description:
      "Shikhar Power Development Limited is a Nepal-based hydropower company focused on developing run-of-river hydroelectric projects. The company was established to harness Nepal’s hydropower potential and currently operates and develops multiple projects contributing clean electricity to the national grid.",
    tags: ["Hydropower", "Clean Energy", "Infrastructure"],
    impacts: [
      "Run-of-river hydropower generation for national grid",
      "Support for Nepal’s renewable energy expansion",
      "Contribution to rural electrification and energy security",
    ],
    image: "/aadhyanta/Portfolio/shikhar.JPG",
    featured: true,
    logoPlaceholder: "SP",
  },
  {
    id: "radiant-nepal",
    name: "Radiant InfoTech Nepal Pvt. Ltd.",
    sector: "Information Technology & Digital Services",
    sectorIcon: <Code size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Bagmati Province",
    year: "2003",
    description:
      "Radiant InfoTech Nepal is a long-established IT company providing end-to-end digital solutions including web development, software development, mobile applications, graphic design, digital marketing, hosting, domain registration, and IT infrastructure services. It serves businesses, government agencies, and institutions in Nepal and abroad.",
    tags: ["IT Services", "Software Development", "Web Development"],
    impacts: [
      "20+ years of IT service experience in Nepal",
      "Digital transformation for SMEs and institutions",
      "Web and software solutions for public and private sectors",
      "Support for digital infrastructure and online services",
    ],
    image: "/aadhyanta/Portfolio/radiant infotech.jpg",
    featured: true,
    logoPlaceholder: "RN",
  },
  {
    id: "fikkal-tea-coffee-farm",
    name: "Fikkal Tea & Coffee Farm",
    sector: "Agriculture & Agro-Industry",
    sectorIcon: <Leaf size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Koshi Province",
    year: "2015",
    description:
      "Fikkal Tea & Coffee Farm is one of Nepal’s largest operational coffee farms located in Ilam district, spanning over 800 ropanis (around 100 acres). The farm focuses on specialty coffee cultivation, processing, and agro-tourism, aiming to position Nepal as a global producer of premium coffee while integrating sustainable farming practices and value-added processing.",
    tags: ["Coffee Farming", "Agro Tourism", "Agriculture"],
    impacts: [
      "800+ ropani large-scale coffee farming operation",
      "65,000+ coffee plants with expansion plans up to 100,000",
      "Supports Nepal’s specialty coffee export ecosystem",
      "Promotes sustainable agro-tourism and rural livelihoods",
    ],
    image:
      "/aadhyanta/Portfolio/Fikkal.jpg",
    featured: true,
    logoPlaceholder: "FTC",
  },
  {
    id: "dv-excellus",
    name: "DV Excellus Pvt. Ltd.",
    sector: "Agri-Tech & Information Technology",
    sectorIcon: <Cpu size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Bagmati Province",
    year: "2016",
    description:
      "DV Excellus is an agri-tech and digital solutions company based in Nepal, focused on building integrated agricultural ecosystems through technology. It develops platforms such as Kheti, connecting farmers, input suppliers, financial institutions, and markets through digital tools to improve access to finance, advisory services, and market linkages.",
    tags: ["Agri-Tech", "Fintech", "Digital Agriculture"],
    impacts: [
      "Digital platform connecting farmers and agri-markets (Kheti ecosystem)",
      "Improved access to agricultural finance and advisory services",
      "Onboarding of hundreds of farmers and agri-vendors in Nepal",
      "Support for rural digitization and agri-fintech innovation",
    ],
    image: "",
    featured: true,
    logoPlaceholder: "DV",
  },
  {
    id: "saf-nepal",
    name: "Shreenagar Agritech Industries Ltd. (SAF / SAIL)",
    sector: "Agriculture & Agro-Industry",
    sectorIcon: <Leaf size={15} />,
    fund: "NOF I",
    statusCls: "status-active",
    province: "Lumbini Province",
    year: "2002",
    description:
      "Shreenagar Agritech Industries Ltd. (SAF/SAIL) is a leading integrated agri-business in Nepal providing end-to-end solutions for farmers, including poultry, fish, feed production, technical services, and market linkages. The company operates on a “farm–feed–food–facilitation” model to improve productivity and strengthen Nepal’s agricultural ecosystem.",
    tags: ["Agri-Business", "Poultry", "Fish Farming", "Feed Production"],
    impacts: [
      "Integrated support system for 5,000+ farmers",
      "Provision of day-old chicks and fish hatchlings nationwide",
      "Introduction of advanced feed and extrusion technology in Nepal",
      "Strengthening of contract farming and rural agribusiness systems",
    ],
    image: "/aadhyanta/Portfolio/shreenagar.jpg",
    featured: true,
    logoPlaceholder: "SAF",
  },
]

const FUNDS = ["All", "NOF I", "NOF II", "Simrik"]
const SECTORS = [
  "All",
  "Renewable Energy",
  "Agriculture",
  "Digital Finance",
  "Hospitality",
  "FMCG / Beverages",
  "Agro-Processing",
  "Clean Transport",
  "Dairy & Food",
  "Artisan & Export",
  "Organic Agriculture",
  "Trade & Logistics",
  "EdTech",
]

const portfolioStats = [
  { value: "12", label: "Active Companies" },
  { value: "5+", label: "Sectors" },
  { value: "7", label: "Provinces" },
  { value: "400+", label: "Jobs Created" },
]

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const sectors = [
    "Renewable Energy",
    "AgriTech",
    "Digital Finance",
    "Hospitality",
    "FMCG",
    "Clean Transport",
    "Dairy & Food",
    "Trade & Logistics",
    "EdTech",
    "Gender Finance",
  ]
  const all = [...sectors, ...sectors]

  return (
    <section className="pt-5 bg-[#F5F2ED] border-b border-[#E8E4DD] overflow-hidden">
      {/* Dark sector ticker */}
      {/* <div className="bg-[#1C1C2E] py-2.5 overflow-hidden">
        <div className="ticker-track">
          {all.map((s, i) => (
            <span key={i} className="whitespace-nowrap px-8 font-mono-dm text-[10px] text-white/45 tracking-widest uppercase inline-flex items-center gap-5">
              {s} <span className="w-1 h-1 rounded-full bg-[#B71E52] inline-block" />
            </span>
          ))}
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left */}
          <div>
            <div className="sr inline-flex items-center gap-2.5 mb-7 px-4 py-2 bg-white border border-[#E8E4DD] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0" />
              <span className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase">
                Portfolio Companies
              </span>
            </div>

            <h1
              className="sr d1 font-display font-bold text-[#1C1C2E] leading-[1.0] mb-6
              text-[clamp(48px,6.5vw,80px)]"
            >
              The enterprises
              <br />
              <em className="italic text-[#B71E52]">we back</em>
            </h1>

            <p className="sr d2 text-stone-500 text-[16px] leading-[1.85] max-w-md">
              Growth-stage businesses across Nepal's seven provinces — each
              selected through our disciplined 12% conversion process and
              supported with capital, governance, and strategic partnership.
            </p>
          </div>

          {/* Right — stat strip */}
          <div className="sr-r grid grid-cols-2 gap-3">
            {portfolioStats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E8E4DD] p-6"
              >
                <div className="font-display font-bold text-[#1C1C2E] leading-none mb-2 text-[clamp(28px,3vw,40px)]">
                  <StatValue value={s.value} />
                </div>
                <div className="font-mono-dm text-[10px] text-stone-400 tracking-[0.1em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED COMPANIES — large horizontal cards for the 2 marquee picks
═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   FULL PORTFOLIO GRID — filterable
═══════════════════════════════════════════════════════════════════════════ */
function PortfolioGrid() {
  const [fundFilter, setFundFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = companies.filter((c) => {
    const matchFund = fundFilter === "All" || c.fund === fundFilter
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q) ||
      c.province.toLowerCase().includes(q)

    return matchFund && matchSearch
  })



  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              All Companies
            </span>
            <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E]">
              Full <em className="italic text-[#B71E52]">Portfolio</em>
            </h2>
          </div>

          {/* Search */}
          <div className="relative self-start sm:self-auto">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search companies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="port-search pl-9 pr-4 py-2.5 text-[13px] border border-[#E8E4DD] rounded-lg bg-[#F5F2ED] text-[#1C1C2E] placeholder:text-stone-400 w-52 transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="sr flex gap-2 flex-wrap mb-10">
          {FUNDS.map((f) => (
            <button
              key={f}
              onClick={() => setFundFilter(f)}
              className={`fp px-4 py-2 rounded-full border text-[13px] font-medium cursor-pointer
                ${fundFilter === f ? "active" : "border-[#E8E4DD] text-stone-500 bg-[#F5F2ED]"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-display italic text-[24px] text-stone-400">
              No companies match your filter.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((co, i) => (
              <div
                key={co.id}
                className={`sr on co-card d${Math.min(i + 1, 6)} bg-[#F5F2ED] border border-[#E8E4DD] rounded-xl overflow-hidden cursor-pointer`}
                onClick={() => setExpanded(expanded === co.id ? null : co.id)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={co.image}
                    alt={co.name}
                    className="co-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/50 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="font-mono-dm text-[9px] tracking-widest uppercase px-2 py-1 bg-[#B71E52] text-white rounded">
                      {co.fund}
                    </span>
                    
                  </div>


                </div>

                {/* Card body */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded bg-[#f5e8ed] flex items-center justify-center text-[#B71E52] flex-shrink-0">
                      {co.sectorIcon}
                    </div>
                    <span className="font-mono-dm text-[10px] text-stone-400 tracking-[0.08em] uppercase truncate">
                      {co.sector}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-[19px] text-[#1C1C2E] leading-tight mb-2">
                    {co.name}
                  </h3>

                  <p className="text-stone-500 text-[13px] leading-[1.75] mb-4 line-clamp-2">
                    {co.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-stone-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      <span className="font-mono-dm text-[10px]">
                        {co.province}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      <span className="font-mono-dm text-[10px]">
                        Since {co.year}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E8E4DD]">
                    {co.tags.map((t, j) => (
                      <span
                        key={j}
                        className="font-mono-dm text-[9px] tracking-[0.06em] uppercase px-2 py-1 bg-white border border-[#E8E4DD] text-stone-500 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable impact panel */}
                {expanded === co.id && (
                  <div
                    className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-[#E8E4DD] bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pt-5">
                      <div className="font-mono-dm text-[10px] text-[#B71E52] tracking-[0.12em] uppercase mb-3">
                        Impact Highlights
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {co.impacts.map((imp, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B71E52] flex-shrink-0 mt-[6px]" />
                            <span className="text-[13px] text-stone-600 leading-[1.65]">
                              {imp}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`/portfolio/${co.id}`}
                        className="mt-5 inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[13px] hover:gap-3 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Full Profile <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Result count */}
        <div className="sr mt-8 text-center">
          <span className="font-mono-dm text-[11px] text-stone-400 tracking-[0.08em]">
            Showing {filtered.length} of {companies.length} portfolio companies
          </span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROVINCE MAP — visual breakdown of geographic spread
═══════════════════════════════════════════════════════════════════════════ */
function ProvinceBreakdown() {
  const provinces = [
    { name: "Bagmati Province", count: 5, pct: 42 },
    { name: "Lumbini Province", count: 2, pct: 17 },
    { name: "Koshi Province", count: 2, pct: 17 },
    { name: "Gandaki Province", count: 2, pct: 17 },
    { name: "Madhesh Province", count: 1, pct: 8 },
  ]

  return (
    <section className="bg-[#F5F2ED] py-20 md:py-24 border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div className="sr-l">
          <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
            Geographic Reach
          </span>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,48px)] leading-[1.08] text-[#1C1C2E] mb-6">
            Investing across{" "}
            <em className="italic text-[#B71E52]">all provinces</em>
          </h2>
          <p className="text-stone-500 text-[15px] leading-[1.85] mb-8">
            Our sector-agnostic, all-provinces mandate is a deliberate strategy.
            The enterprises that will generate the strongest risk-adjusted
            returns aren't necessarily in Kathmandu — and our pipeline reflects
            that conviction.
          </p>
          <a
            href="/insights/province-investment-corridors"
            className="inline-flex items-center gap-1.5 text-[#B71E52] font-semibold text-[14px] hover:gap-3 transition-all duration-200"
          >
            Read our province analysis <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Right — bar chart */}
        <div className="sr-r flex flex-col gap-4">
          {provinces.map((p, i) => (
            <div key={i} className={`sr d${i + 1}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#B71E52]" />
                  <span className="font-semibold text-[14px] text-[#1C1C2E]">
                    {p.name}
                  </span>
                </div>
                <span className="font-mono-dm text-[11px] text-[#B71E52]">
                  {p.count} {p.count === 1 ? "company" : "companies"}
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B71E52] rounded-full transition-all duration-1000"
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="bg-[#1C1C2E] py-20 hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sr-s grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono-dm text-[11px] tracking-[0.14em] uppercase text-[#B71E52] mb-3 block">
              Work With Us
            </span>
            <h2 className="font-display font-bold text-[clamp(34px,4vw,52px)] leading-[1.06] text-white mb-4">
              Is your enterprise{" "}
              <em className="italic text-[#B71E52]">ready to grow?</em>
            </h2>
            <p className="text-white/50 text-[15px] leading-[1.85] max-w-md">
              We're actively deploying capital across Nepal's provinces. If
              you're a growth-stage enterprise with proven revenue and clear
              expansion plans, we want to hear from you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <a
              href="/accelerator#apply"
              className="flex items-center justify-center gap-2 bg-[#B71E52] hover:bg-[#9e1847] text-white font-semibold text-[15px] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B71E52]/30"
            >
              Apply for Investment <ArrowUpRight size={15} />
            </a>
            <a
              href="/funds"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-medium text-[15px] px-7 py-3.5 rounded transition-all duration-200"
            >
              View Our Funds
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="min-h-screen bg-white">
        <Navbar variant="nontransparent" />
        <Hero />
        <PortfolioGrid />
        {/* <ProvinceBreakdown /> */}
      </div>
    </>
  )
}
