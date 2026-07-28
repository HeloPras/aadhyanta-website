export type ProgramStatus = "Active" | "Completed"

export type KeyNumber = {
  value: string
  label: string
}

export type JourneyStep = {
  title: string
  description?: string
}

export type AlumniOutcome = {
  company: string
  outcome: string
  badge?: string
  videoId?: string
}

export type ProgramComponent = {
  title: string
  description: string
  details?: string[]
}

export type PartnerFunder = {
  funder?: string
  partners?: string[]
  technicalPartner?: string
  lendingPartner?: string
  taPartner?: string
  exportPartner?: string
  pilotLocation?: string
  term?: string
  role?: string
}

export type ProgramPage = {
  id: number
  slug: string
  programName: string
  status: ProgramStatus
  funderTag: string
  oneLiner: string
  overview: string[]
  keyNumbers: KeyNumber[]
  whoWasThisFor?: string[]
  programDeliverables: string[]
  journey: JourneyStep[]
  toolsUsed?: string[]
  toolsAndPlatforms?: string[]
  evaluationCriteria?: string[]
  valueChains?: string[]
  components?: ProgramComponent[]
  alumniOutcomes?: AlumniOutcome[]
  successStory?: {
    title: string
    description: string
    link?: string
  }
  outcomes?: string[]
  sustainabilityNote?: string
  genderLensNote?: string
  youtubeVideoId?: string
  heroImage?: string
  partnerAndFunder: PartnerFunder
}

export const programPages: ProgramPage[] = [
  {
    id: 1,
    slug: "aadhyanta-accelerator-koshi-chapter",
    programName: "Aadhyanta Accelerator Koshi Chapter",
    status: "Completed",
    funderTag:
      "Funded by: Swisscontact NAMDP (Sahaj Phase II) | Partners: FNCCI Koshi, Investment Authority of Koshi Province",
    oneLiner:
      "Investment-readiness acceleration for agri-enterprises across Koshi Province — from diagnostics to Demo Day.",
    overview: [
      "When 166 enterprises from across Koshi Province applied to the Aadhyanta Accelerator, 24 were selected — not just for their potential, but for their readiness to commit to a full growth journey.",
      "That journey had three phases. First came the foundation: every selected enterprise went through a Capacity Gap Assessment — an honest, individualised look at what the business needed most, whether that was financial clarity, market positioning, or operational systems. Second came the training: two residential bootcamps and virtual modules where founders built Business Model Canvases, developed investor pitches, learned digital marketing, and practised CRM. Third came the mentorship: each enterprise was paired with a mentor who worked with them directly, at their pace, on their specific challenges.",
      "The result was not just stronger businesses — it was a permanent infrastructure. The Business Growth Centre, established with FNCCI-Koshi as a lasting output of the programme, means enterprises in Koshi Province now have a place to go for business development support even after the programme has closed.",
    ],
    keyNumbers: [
      {
        value: "166",
        label: "Applicants Screened",
      },
      {
        value: "24",
        label: "Enterprises Selected",
      },
      {
        value: "5",
        label: "Districts Covered",
      },
    ],
    whoWasThisFor: [
      "Agri-enterprises in Koshi Province seeking investment readiness and business model clarity.",
      "Enterprises looking for access to formal financing, including bank loans, equity, and grants.",
      "Businesses requiring capacity building and 1:1 mentorship.",
      "Enterprises seeking connections to markets and service providers.",
    ],
    programDeliverables: [
      "Individualised Capacity Gap Assessment",
      "Customised Business Growth Plan",
      "Investment readiness training through bootcamp and virtual sessions",
      "1:1 mentorship from industry experts",
      "Investor Engagement Event access",
      "MoU-based service provider connections",
    ],
    journey: [
      {
        title: "Application & Screening",
        description: "166 applicants screened.",
      },
      {
        title: "Capacity Gap Assessment",
        description: "Individualised diagnostics for selected enterprises.",
      },
      {
        title: "Growth Plan Development",
      },
      {
        title: "Residential Bootcamp I",
        description: "Business Model Canvas and Investment Readiness.",
      },
      {
        title: "Residential Bootcamp II",
        description: "Investor Pitching, CRM, and Digital Marketing.",
      },
      {
        title: "1:1 Mentorship",
      },
      {
        title: "Investor Engagement Event",
      },
    ],
    toolsUsed: [
      "Lean Business Model Canvas",
      "Capacity Gap Diagnostics",
      "Individualised Growth Plans",
      "MoU-Based Service-Provider Partnerships",
      "Investor Engagement Event",
      "Residential Bootcamp Format",
    ],
    outcomes: [
      "Multiple enterprises went on to secure financing after the programme concluded.",
      "Monkshood Krishi Farm became one of the programme's standout success stories, securing significant institutional financing shortly after completing the accelerator.",
      "24 enterprises completed individualised investment-readiness development.",
      "Business Growth Centre established as permanent provincial infrastructure with FNCCI-Koshi.",
    ],
    sustainabilityNote:
      "A permanent Business Growth Centre was co-established with FNCCI-Koshi as a provincial BDS platform — extending the programme's value beyond the contract period.",
    youtubeVideoId: "LYDogiTSRTY",
    heroImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    partnerAndFunder: {
      funder: "Swisscontact NAMDP (Sahaj Phase II)",
      partners: [
        "FNCCI Koshi",
        "Investment Authority of Koshi Province",
      ],
      term: "August 2024 – March 2025",
      role: "Lead Implementer",
    },
  },
  {
    id: 2,
    slug: "roof-of-the-world-accelerator-programme",
    programName: "Roof of the World Accelerator Programme",
    status: "Completed",
    funderTag:
      "Funded by: USAID Trade and Competitiveness Program (Deloitte / TC-Udhyam Nepal) | Role: Delivery Aggregator",
    oneLiner:
      "Accelerating export-ready SMEs in agriculture, tourism, and digital services — with four alumni receiving private equity from Nepal Opportunity Fund I.",
    overview: [
      "Roof of the World was a multi-province accelerator addressing capability and capital-access gaps among export-oriented SMEs across three sectors: agriculture, tourism, and digital services.",
      "Aadhyanta operated as Delivery Aggregator, mobilising a curated network of industry experts and partner firms — including WorldStartup as expert-mentorship co-lead — to provide tailored business development services.",
      "The diagnostic phase included 95 Capacity Gap Analyses across all three target sectors, followed by investment-readiness training, digital marketing clinics, IT-systems support, and expert mentorship paired with structured community-network access.",
    ],
    keyNumbers: [
      {
        value: "4",
        label: "Alumni Received NOF I Equity",
      },
      {
        value: "95",
        label: "Capacity Gap Analyses",
      },
      {
        value: "7.43→9.29",
        label: "Knowledge Score",
      },
    ],
    whoWasThisFor: [
      "Export-oriented SMEs in agriculture, tourism, and digital services.",
      "Enterprises seeking investment readiness and international market access.",
      "Businesses targeting U.S. retail and diaspora markets.",
      "Companies ready for equity investment.",
    ],
    programDeliverables: [
      "Capacity Gap Analysis (CGA) — individualised diagnostics",
      "Investment readiness training calibrated to CGA findings",
      "Digital marketing and IT systems clinics",
      "Expert mentorship",
      "Export partnership access",
      "Priority pipeline to Nepal Opportunity Fund I equity",
    ],
    journey: [
      {
        title: "Diagnostic",
        description:
          "95 CGA assessments across agriculture, tourism, and digital services.",
      },
      {
        title: "Investment Readiness Training",
      },
      {
        title: "Digital Marketing & IT Clinics",
      },
      {
        title: "Expert Mentorship",
      },
      {
        title: "Export Linkage",
        description: "Partnership with Zenmandu in the U.S.",
      },
      {
        title: "Alumni → NOF I Pipeline",
        description: "4 companies selected for equity.",
      },
    ],
    alumniOutcomes: [
      {
        company: "Fikkal Tea and Coffee",
        outcome:
          "Secured private equity from Nepal Opportunity Fund I and achieved a public listing.",
        badge: "IPO Exit",
      },
      {
        company: "Budhanilkantha Heritage Hotel",
        outcome:
          "Secured private equity from Nepal Opportunity Fund I following programme completion.",
      },
      {
        company: "D.V Excellus Pvt. Ltd",
        outcome:
          "Received equity investment from Nepal Opportunity Fund I as a direct and named outcome of programme participation.",
      },
      {
        company: "Dauune Agro Farm Pvt. Ltd",
        outcome:
          "Secured private equity from Nepal Opportunity Fund I — supporting continued growth across Nepal's agricultural value chain.",
      },
    ],
    successStory: {
      title: "Fikkal Tea and Coffee",
      description:
        "Nepal's first accelerator-to-IPO exit story. From Roof of the World cohort to Nepal Opportunity Fund I equity to IPO listing.",
    },
    heroImage: "/our-ecosystem/roof-of-the-world.png",
    partnerAndFunder: {
      funder:
        "USAID Trade and Competitiveness Program (Deloitte / TC-Udhyam Nepal)",
      term: "April 2024 – January 2025",
      role: "Delivery Aggregator",
      exportPartner: "Zenmandu (U.S.) — CA, TX, VA markets",
    },
  },
  {
    id: 3,
    slug: "digital-innovation-in-agriculture-and-logistics",
    programName: "Digital Innovation in Agriculture and Logistics (DIAL)",
    status: "Completed",
    funderTag:
      "Funded by: Swiss Agency for Development and Cooperation (SDC) | July 2024 – August 2025",
    oneLiner:
      "Early-stage acceleration for tech startups at the agritech-logistics intersection — from Idea Canvas to MVP, 32-Hour Hackathon, and Product Showcase.",
    overview: [
      "DIAL was designed for early-stage technology startups operating at the intersection of agriculture and logistics — a sub-sector where Nepal's investment-readiness gap is most acute.",
      "A cohort of 7 enterprises was admitted through structured selection, with Gender, Disability, and Social Inclusion (GEDSI) considerations integrated into curriculum design and selection criteria.",
      "The programme applied a five-stage methodology culminating in a Product Showcase that served as a structured investor-engagement event.",
    ],
    keyNumbers: [
      {
        value: "7",
        label: "Cohort Enterprises",
      },
      {
        value: "32 hrs",
        label: "Hackathon Format",
      },
      {
        value: "2",
        label: "Notable Exits",
      },
    ],
    whoWasThisFor: [
      "Early-stage tech startups in agritech, including crop monitoring, digital supply chains, and farm inputs.",
      "Startups working on logistics and cold-chain solutions.",
      "Agriculture-linked digital service providers.",
      "Startups with a working prototype or early MVP.",
    ],
    programDeliverables: [
      "Idea Canvas development for problem-solution articulation",
      "Lean Business Model Canvas for iterative validation",
      "MVP Experiment Plan for hypothesis-driven product development",
      "Pivot/Persevere Decision Framework",
      "32-Hour Hackathon for rapid prototype build",
      "Product Showcase with investor audience",
      "Mentor access in AI/ML, cloud infrastructure, UI/UX, and product management",
    ],
    journey: [
      {
        title: "Idea Canvas",
        description:
          "Structured framework for problem-solution articulation.",
      },
      {
        title: "Lean Business Model Canvas",
        description: "Iterative business model development.",
      },
      {
        title: "MVP Experiment Plan",
        description: "Hypothesis-driven product testing.",
      },
      {
        title: "Pivot/Persevere Decision Framework",
        description: "Evidence-based direction.",
      },
      {
        title: "32-Hour Hackathon + Product Showcase",
        description: "Investor engagement.",
      },
    ],
    alumniOutcomes: [
      {
        company: "PlantSat (Seed Innovations)",
        outcome:
          "Secured follow-on funding for satellite-based crop monitoring and micro-index insurance product.",
        badge: "Funded",
      },
      {
        company: "Dailo Krishi",
        outcome:
          "Acquired by Prixa Tech in a strategic acquisition, validating its food-traceability infrastructure.",
        badge: "Acquired",
        // TODO: replace with the real Dailo Krishi Testimonial.mp4 upload — reusing the DIAL journey video ID as a placeholder for now.
        videoId: "1211958492",
      },
    ],
    heroImage: "/our-ecosystem/dial-card-1.webp",
    partnerAndFunder: {
      funder: "Swiss Agency for Development and Cooperation (SDC)",
      term: "July 2024 – August 2025",
      role: "Lead Implementer",
    },
  },
  {
    id: 4,
    slug: "code-for-impact",
    programName: "Code for Impact",
    status: "Active",
    funderTag:
      "Funded by: US Embassy | Technical Partner: Georgia Tech Enterprise Innovation Institute | Oct 2025 – Aug 2026",
    oneLiner:
      "Nepal's first national tech hackathon series — 7 provinces, 35 teams, 175 innovators building solutions for real-world challenges.",
    overview: [
      "Code for Impact is a U.S.–Nepal tech innovation hackathon series designed as a multi-stage, capacity-building intervention delivered across all seven provinces of Nepal.",
      "The programme is structured as a four-tier selection process: application screening, provincial hackathons, prototype refinement, and national showcase.",
      "Seven sequential two-day provincial hackathons are held across Surkhet/Nepalgunj, Pokhara, Dhangadi, Biratnagar, Kathmandu, and Janakpur.",
      "Delivered in partnership with Georgia Tech's Enterprise Innovation Institute, alongside Genese Solution, Fusemachines, AmCham Nepal, CNI-IT Council, FNCCI, NAS-IT, and Prixa — with an inclusion target of at least 30% women and underrepresented groups.",
    ],
    keyNumbers: [
      {
        value: "175",
        label: "Innovators",
      },
      {
        value: "35",
        label: "Teams",
      },
      {
        value: "7",
        label: "Provincial Hackathons",
      },
      {
        value: "≥30%",
        label: "Women & Underrepresented Groups",
      },
    ],
    whoWasThisFor: [
      "Tech innovators, students, and early-stage entrepreneurs working on problem-relevant tech solutions.",
      "Participants based in any of Nepal's 7 provinces.",
      "35 teams selected through the programme.",
      "Individuals with women or underrepresented group participation encouraged.",
    ],
    programDeliverables: [
      "Two-day provincial hackathon experience",
      "Prototype development support",
      "Access to U.S. platforms including AWS, OpenAI, GitHub, Figma, V0, and Cursor",
      "Evaluation by Georgia Tech and ecosystem partners",
      "Top teams connected to Georgia Tech's innovation ecosystem",
      "Top teams provided access to AFML Tech Fund, Genese cloud/certification, and Fusemachines AI Fellowship",
      "National Showcase opportunity",
    ],
    journey: [
      {
        title: "Application Screening",
        description: "Open applications reviewed across all provinces.",
      },
      {
        title: "Provincial Hackathons",
        description: "7 two-day hackathons across 7 provinces.",
      },
      {
        title: "Prototype Refinement",
        description: "Top teams refine solutions with mentor support.",
      },
      {
        title: "National Showcase",
        description: "Final presentations to investors and partners.",
      },
    ],
    evaluationCriteria: [
      "Problem Relevance",
      "Innovation Potential",
      "Team Diversity",
      "Prototype Functionality",
      "Scalability",
      "Investment Readiness",
    ],
    toolsAndPlatforms: [
      "Value Proposition Canvas",
      "Lean Startup Methodology",
      "Idea Canvas",
      "MVP Experiment Plan",
      "AWS",
      "OpenAI",
      "GitHub",
      "Figma",
      "V0",
      "Cursor",
    ],
    partnerAndFunder: {
      funder: "US Embassy",
      technicalPartner: "Georgia Tech Enterprise Innovation Institute",
      partners: [
        "Genese Solution",
        "Fusemachines",
        "AmCham Nepal",
        "CNI-IT Council",
        "FNCCI",
        "NAS-IT",
        "Prixa",
      ],
      term: "October 2025 – August 2026",
    },
    heroImage: "/our-ecosystem/code-for-impact.jpg",
  },
  {
    id: 5,
    slug: "seeding-and-scaling-innovation-ai-entrepreneurs-lab",
    programName: "Seeding & Scaling Innovation AI Entrepreneurs Lab",
    status: "Active",
    funderTag: "Funded by: US Embassy",
    oneLiner:
      "A U.S.–Nepal commercial diplomacy initiative — pre-accelerating 20 early-stage entrepreneurs with AI tools, dual mentorship, and access to U.S. innovation markets.",
    overview: [
      "Seeding and Scaling Innovation is a U.S.–Nepal commercial-diplomacy initiative addressing Nepal's isolation from U.S. innovation markets and platforms.",
      "20 early-stage entrepreneurs are admitted through competitive intake into the AI Entrepreneurs Lab pre-accelerator.",
      "The programme also includes a four-part public dialogue series, Bridging Valleys: U.S.–Nepal Tech Conversations, engaging 100+ ecosystem participants on Ethical AI, Global Market Design, Access to Capital, and Tech Partnerships.",
      "The alliance includes AmCham Nepal, Genese Solution, Draper Startup House, Shequal Foundation, FNCCI/CNI, Laxmi Sunrise Bank, and Global IME Bank.",
      "The programme includes the soft-launch of a USD 5M Tech Innovation Fund providing follow-on investment infrastructure for future cohorts and is designed to create a permanent bridge between Nepal's tech ecosystem and U.S. innovation platforms.",
    ],
    keyNumbers: [
      {
        value: "20",
        label: "Entrepreneurs",
      },
      {
        value: "100+",
        label: "Ecosystem Participants",
      },
      {
        value: "8 months",
        label: "Duration",
      },
    ],
    programDeliverables: [
      "AI-integrated business modelling and customer discovery",
      "U.S. framework-based go-to-market strategy",
      "Dual mentorship with one Nepali expert and one U.S. expert per entrepreneur",
      "Weekly mentor sessions",
      "Targeted U.S. market integration support",
      "Virtual investor showcase",
      "Access to a dedicated follow-on Tech Innovation Fund",
    ],
    journey: [
      {
        title: "Competitive Intake",
        description: "20 entrepreneurs selected.",
      },
      {
        title: "AI-Integrated Business Modelling",
        description: "Solution-centred design and Lean Startup.",
      },
      {
        title: "Dual Mentorship Pairing",
        description: "Nepali and U.S. experts paired with entrepreneurs.",
      },
      {
        title: "Weekly Mentor Sessions",
      },
      {
        title: "U.S. Market Integration",
        description:
          "At least 30% participant target for accelerator, platform, or investor engagement.",
      },
      {
        title: "Virtual Investor Showcase",
      },
    ],
    partnerAndFunder: {
      funder: "US Embassy",
      partners: [
        "AmCham Nepal",
        "Genese Solution",
        "Draper Startup House",
        "Shequal Foundation",
        "FNCCI/CNI",
        "Laxmi Sunrise Bank",
        "Global IME Bank",
      ],
    },
    heroImage: "/our-ecosystem/seeding-and-scaling.webp",
  },
  {
    id: 6,
    slug: "fao-joint-sdg-fund-agribusiness-accelerator-women-agro-guarantee-facility",
    programName:
      "FAO Joint SDG Fund Agribusiness Accelerator & Women Agro Guarantee Facility",
    status: "Active",
    funderTag:
      "Funded by: FAO Joint SDG Fund — Innovative Financial Solutions for Local Food Systems Transformation in Nepal",
    oneLiner:
      "A dual-component programme: accelerating 25+ agribusiness SMEs to investment readiness, while deploying Nepal's first ring-fenced credit guarantee facility for women agro-entrepreneurs.",
    overview: [
      "This programme combines two integrated components under a single coordinated workstream.",
      "The first component — the SME Accelerator — is a cohort-based, investment-readiness programme preparing 25+ agribusiness SMEs for equity and debt financing, culminating in a Demo Day with named investor engagement.",
      "The second component — the Women Agro Guarantee Facility (Challenge Fund) — is a ring-fenced partial credit guarantee for early-stage women agro-entrepreneurs who do not yet meet conventional lending criteria, delivered with Global IME Bank Limited as lending partner.",
    ],
    keyNumbers: [
      {
        value: "25+",
        label: "Agribusiness SMEs",
      },
      {
        value: "100%",
        label: "Women-led Enterprise Target",
      },
      {
        value: "2",
        label: "Integrated Components",
      },
    ],
    components: [
      {
        title: "SME Accelerator Programme",
        description:
          "Cohort-based investment-readiness preparation for 25+ agribusiness SMEs.",
        details: [
          "8 modules over 16–18 weeks.",
          "Methodology includes Idea Canvas, Lean Business Model Canvas, MVP Experiment Plan, and Pitch.",
          "Culminates in Demo Day with named investor engagement.",
        ],
      },
      {
        title: "Women Agro Guarantee Facility",
        description:
          "Ring-fenced partial credit guarantee for early-stage women agro-entrepreneurs.",
        details: [
          "Bagmati pilot structured for scale-up to additional provinces and BFI partners.",
          "Lending partner: Global IME Bank Limited.",
          "Technical assistance from FAO.",
        ],
      },
    ],
    programDeliverables: [
      "Structured investment-readiness curriculum delivered across eight modules over the full programme cycle.",
      "Individualised financial diagnostics and customised business growth plan for each enterprise.",
      "Business valuation support to prepare enterprises for equity screening and investor conversations.",
      "Pre and post knowledge assessments to measure and document progress.",
      "Demo Day as a structured investor engagement event where enterprises pitch directly to investors and financing partners.",
      "Access to a partial credit guarantee facility for early-stage women agro-entrepreneurs who do not yet meet conventional lending criteria.",
      "Technical assistance and guidance from application to facility design.",
      "Direct connection to Global IME Bank as a formal lending partner.",
      "Financing pathway designed to close the gap between enterprise potential and access to finance.",
    ],
    journey: [
      {
        title: "SME Accelerator",
        description:
          "25+ agribusiness SMEs prepared for equity and debt financing.",
      },
      {
        title: "Investment Readiness Curriculum",
        description:
          "Eight modules delivered over 16–18 weeks using Idea Canvas, Lean Business Model Canvas, MVP Experiment Plan, and Pitch.",
      },
      {
        title: "Demo Day",
        description:
          "Structured investor engagement with named investor participation.",
      },
      {
        title: "Women Agro Guarantee Facility",
        description:
          "Partial credit guarantee for early-stage women agro-entrepreneurs.",
      },
      {
        title: "Bagmati Pilot",
        description:
          "Pilot location structured for scale-up to additional provinces and BFI partners.",
      },
    ],
    genderLensNote:
      "A gender-differentiated diagnostic framework targets at least 100% women-led or women-influenced enterprises across deployments. GEDSI considerations are systematically integrated into curriculum design and selection criteria.",
    partnerAndFunder: {
      funder: "FAO Joint SDG Fund",
      lendingPartner: "Global IME Bank Limited",
      taPartner: "Food and Agriculture Organization (FAO)",
      pilotLocation: "Bagmati Province",
    },
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    id: 7,
    slug: "ffpo-matchmaking-and-business-pitching-event",
    programName: "FFPO Matchmaking & Business Pitching Event",
    status: "Active",
    funderTag:
      "Funded by: FAO Forest and Farm Facility (FFF) Programme",
    oneLiner:
      "Connecting five Forest and Farm Producer Organization enterprises to financing and market partners through structured pitching and B2B/B2F matchmaking.",
    overview: [
      "This programme selects and prepares five agribusiness enterprises from FFPO member groups for structured business pitching.",
      "Each enterprise is assessed for readiness, market potential, and inclusiveness.",
      "Selected enterprises receive support to review business and market plans, develop financial projections, and build effective pitches covering their market opportunity, business model, financial needs, and social and environmental impact.",
      "The programme culminates in a full-day Matchmaking and Business Pitching Event with approximately 40 to 50 participants, facilitating B2B and B2F meetings and partnership dialogues between FFPOs and market and finance actors.",
    ],
    keyNumbers: [
      {
        value: "5",
        label: "FFPO Enterprises",
      },
      {
        value: "40–50",
        label: "Event Participants",
      },
      {
        value: "5",
        label: "Value Chains",
      },
    ],
    valueChains: [
      "Coffee (Sindhu Coffee)",
      "Community Forest Timber",
      "Forest-Based Bio-Fertilizer",
      "Forest Farm-Based Silage (Seti Devi & Sana Kishan Cooperatives)",
      "Forest-Based Cinnamon (Jadibuti Cooperative)",
    ],
    programDeliverables: [
      "Investment readiness assessment through a 5-day workshop.",
      "Business plan and financial projection review.",
      "Pitch preparation covering market opportunity, business model, financial needs, and impact.",
      "B2B meetings with buyers, agencies, and finance actors.",
      "B2F meetings with banks and blended finance providers.",
      "Networking with government agencies and development partners.",
    ],
    journey: [
      {
        title: "Investment Readiness Workshop",
        description:
          "A 5-day practice-based and participatory workshop with technical inputs, hands-on exercises, peer learning, and individualised coaching.",
      },
      {
        title: "Matchmaking and Business Pitching Event",
        description:
          "Partnership and Financing Forum with enterprise pitching, Q&A sessions, pre-arranged B2B and B2F meetings, thematic breakout discussions, and networking.",
      },
    ],
    partnerAndFunder: {
      funder: "FAO Forest and Farm Facility (FFF)",
      term: "May 2026 – July 2026",
    },
    heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
]