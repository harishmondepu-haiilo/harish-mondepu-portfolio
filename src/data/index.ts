// ============================================================
//  PORTFOLIO CMS — Edit this file to update your portfolio
//  No code changes needed anywhere else!
// ============================================================

// ── PERSONAL INFO ──────────────────────────────────────────
export const PERSONAL = {
  name: "Harish Mondepu",
  title: "Senior Salesforce Consultant",
  tagline: "Salesforce Engineer",
  roles: [
    "Salesforce Engineer",
    "CRM Consultant",
    "Platform Developer",
    "Cloud Solutions Expert",
  ],
  bio: [
    "With 9+ years of hands-on Salesforce experience, I have delivered complex implementations across Healthcare, Manufacturing, Financial Services, and High-Tech domains.",
    "My expertise spans Salesforce CPQ, Service Cloud, Experience Cloud, MuleSoft integrations, CRM Analytics, and Lightning Web Component development — turning business requirements into scalable, maintainable solutions.",
    "Beyond the code, I drive DevOps practices with Copado, leverage AI tools like Einstein and Agentforce, and ensure every solution is built for compliance, performance, and future growth.",
  ],
  email: "harish.mondepu@gmail.com",
  location: "Bangalore, India",
  linkedin: "https://linkedin.com/in/harishmondepu",
  github: "https://github.com/harishmondepu",
  trailhead: "https://trailhead.salesforce.com/en/me/harishmondepu",
  stats: {
    yearsExp: 9,
    certifications: 13,
    projects: 20,
  },
};

// ── EXPERIENCE ─────────────────────────────────────────────
// Add, remove, or reorder entries here
export const EXPERIENCES = [
  {
    id: 1,
    role: "Senior Salesforce Consultant",
    company: "Haiilo",
    date: "Jan 2023 – Present",
    type: "Full-time",
    description:
      "Leading Salesforce platform strategy and development for a global employee communications SaaS company, driving automation and AI-powered workflows.",
    bullets: [
      "Architected Agentforce and Einstein AI solutions to automate internal support workflows.",
      "Built and maintained CRM Analytics dashboards for real-time business intelligence.",
      "Led CPQ configuration and custom pricing rule development for subscription management.",
      "Implemented Copado DevOps pipelines, improving release frequency by 50%.",
    ],
    tech: ["Salesforce CPQ", "CRM Analytics", "Agentforce", "LWC", "Copado"],
    keyWin: "Deployed Agentforce implementation reducing manual support tickets by 60%.",
  },
  // Add more experience entries here following the same structure
];

// ── CERTIFICATIONS ─────────────────────────────────────────
// Set highlight: true for the featured cert (shows larger)
export const CERTS = [
  { id: 1,  name: "Administrator",                      issuer: "Salesforce",  date: "2017", logo: "⚙️",  verified: true, highlight: false },
  { id: 2,  name: "Advanced Administrator",              issuer: "Salesforce",  date: "2018", logo: "🔧",  verified: true, highlight: false },
  { id: 3,  name: "Platform App Builder",                issuer: "Salesforce",  date: "2018", logo: "🏗️",  verified: true, highlight: false },
  { id: 4,  name: "Platform Developer I",                issuer: "Salesforce",  date: "2019", logo: "👨‍💻", verified: true, highlight: false },
  { id: 5,  name: "Sales Cloud Consultant",              issuer: "Salesforce",  date: "2019", logo: "💼",  verified: true, highlight: false },
  { id: 6,  name: "Service Cloud Consultant",            issuer: "Salesforce",  date: "2020", logo: "🎧",  verified: true, highlight: false },
  { id: 7,  name: "Experience Cloud Consultant",         issuer: "Salesforce",  date: "2021", logo: "☁️",  verified: true, highlight: false },
  { id: 8,  name: "Marketing Cloud Consultant",          issuer: "Salesforce",  date: "2021", logo: "📣",  verified: true, highlight: false },
  { id: 9,  name: "Field Service Lightning Consultant",  issuer: "Salesforce",  date: "2022", logo: "🔩",  verified: true, highlight: false },
  { id: 10, name: "Einstein Analytics Consultant",       issuer: "Salesforce",  date: "2022", logo: "🤖",  verified: true, highlight: false },
  { id: 11, name: "Copado Certified DevOps Admin",       issuer: "Copado",      date: "2023", logo: "🚀",  verified: true, highlight: false },
  { id: 12, name: "IBM AI & Multi Cloud",                issuer: "IBM",         date: "2023", logo: "🌐",  verified: true, highlight: false },
  { id: 13, name: "Data Cloud Consultant",               issuer: "Salesforce",  date: "2024", logo: "📊",  verified: true, highlight: true  },
];

// ── SKILLS ─────────────────────────────────────────────────
export const SKILLS_DATA = {
  "Salesforce Ecosystem": [
    { name: "Apex & Visualforce",                           level: 95, color: "bg-salesforce" },
    { name: "Lightning Web Components (LWC)",               level: 90, color: "bg-salesforce" },
    { name: "Sales, Service & Experience Cloud",            level: 95, color: "bg-salesforce" },
    { name: "Salesforce CPQ & Billing",                     level: 85, color: "bg-salesforce" },
    { name: "Flows, Process Builder & Automation",          level: 98, color: "bg-salesforce" },
    { name: "CRM Analytics (Einstein Analytics)",           level: 80, color: "bg-salesforce" },
    { name: "Field Service Lightning / ServiceMax",         level: 80, color: "bg-salesforce" },
    { name: "Agentforce & Einstein AI",                     level: 75, color: "bg-salesforce" },
  ],
  "Development & Integration": [
    { name: "JavaScript / TypeScript",   level: 85, color: "bg-purple-500" },
    { name: "REST / SOAP APIs",          level: 90, color: "bg-purple-500" },
    { name: "MuleSoft Anypoint Platform",level: 75, color: "bg-purple-500" },
    { name: "Workato (iPaaS)",           level: 75, color: "bg-purple-500" },
    { name: "SQL / SOQL / SOSL",         level: 95, color: "bg-purple-500" },
    { name: "Python (Data & Automation)",level: 65, color: "bg-purple-500" },
  ],
  "Cloud & DevOps": [
    { name: "Copado DevOps",      level: 90, color: "bg-teal-500" },
    { name: "SFDX & SF CLI",      level: 90, color: "bg-teal-500" },
    { name: "Git & Version Control",level: 90, color: "bg-teal-500" },
    { name: "ServiceNow (ITSM)",  level: 70, color: "bg-teal-500" },
    { name: "Power BI",           level: 75, color: "bg-teal-500" },
    { name: "Tableau",            level: 70, color: "bg-teal-500" },
  ],
  "Methodologies": [
    { name: "Agile & Scrum",           level: 95, color: "bg-orange-500" },
    { name: "Solution Architecture",   level: 88, color: "bg-orange-500" },
    { name: "Stakeholder Management",  level: 90, color: "bg-orange-500" },
    { name: "Technical Documentation", level: 85, color: "bg-orange-500" },
    { name: "DevOps & CI/CD",          level: 85, color: "bg-orange-500" },
  ],
};

// ── PROJECTS ───────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title: "Fuel Lightning Service Desk",
    category: "Service Cloud",
    description:
      "Architected and built a complete Lightning Service Console for a global energy client, consolidating 4 legacy tools into one Salesforce-native platform.",
    outcome: "Reduced average case resolution time by 45%",
    tech: ["Service Cloud", "LWC", "Omni-Channel", "Apex", "REST APIs"],
    impact: "45% faster resolution",
    color: "from-blue-600/20 to-salesforce/20",
    icon: "⚡",
  },
  // Add more projects here
];

// ── TESTIMONIALS ────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Harish is a phenomenal architect. His deep understanding of Salesforce limits and LWC design patterns saved our global rollout.",
    name: "Sarah Jenkins",
    title: "Director of CRM",
    company: "Fortune 500 Manufacturing",
    relation: "Client",
    rating: 5,
  },
  // Add more testimonials here
];

// ── EDUCATION ────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    "degree": "MBA (IT & Marketing)",
    "institution": "AMITY University, Gurgaon",
    "year": "2016"
  },
  {
    "degree": "B.Tech in Information Technology",
    "institution": "Andhra University, India",
    "year": "2014"
  }
];

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    "title": "Custom FSL Solution — €40K Saved",
    "description": "Spearheaded the design and implementation of a custom Field Service Lightning solution, bypassing native FSL, resulting in significant cost savings.",
    "company": "Elisa Videra"
  },
  {
    "title": "Employee of the Month — SLA Excellence",
    "description": "Awarded for automating workflows in Service Cloud, achieving the highest SLA compliance for case resolution, directly boosting revenue.",
    "company": "Autodesk Inc"
  },
  {
    "title": "AI-Driven Backup Innovation",
    "description": "Designed and developed an AI-driven Salesforce metadata and data backup solution integrating MuleSoft and OpenAI's ChatGPT API for automated disaster recovery.",
    "company": "Innovation Project"
  }
];
