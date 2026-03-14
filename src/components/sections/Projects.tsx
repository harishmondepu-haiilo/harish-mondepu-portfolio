"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, MonitorPlay } from "lucide-react";

const CATEGORIES = ["All", "Salesforce", "Integration", "Innovation"];

const PROJECTS = [
  {
    id: 1,
    title: "Custom Field Service Lightning Solution",
    category: "Salesforce",
    description: "Built a custom Field Service solution using Salesforce development and AppExchange apps, bypassing native FSL licensing. Empowered field technicians with real-time data access, improved on-site issue resolution, and enhanced customer feedback collection.",
    impact: "Saved project budget by €410,000 in licensing costs",
    tech: ["Service Cloud", "Apex", "LWC", "AppExchange", "Flow Builder"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    size: "large"
  },
  {
    id: 2,
    title: "ServiceNow & Majakka Integration",
    category: "Integration",
    description: "Integrated Salesforce with ServiceNow and Majakka invoicing systems using REST API and MuleSoft, streamlining invoicing and support processes. Improved data consistency and eliminated manual intervention across platforms.",
    impact: "Reduced manual intervention across 3 platforms",
    tech: ["REST API", "MuleSoft", "ServiceNow", "Salesforce", "Apex"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    size: "large"
  },
  {
    id: 3,
    title: "Salesforce CPQ for HP",
    category: "Salesforce",
    description: "Delivered Salesforce CPQ automation for HP, ensuring streamlined quote-to-cash processes. Integrated Salesforce with HP partner website to automatically fetch product and pricing data, enhancing sales efficiency.",
    impact: "Automated quote-to-cash with real-time pricing sync",
    tech: ["Salesforce CPQ", "REST API", "Apex", "Flow Builder", "Partner Portal"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    size: "small"
  },
  {
    id: 4,
    title: "AI-Driven Metadata & Data Backup",
    category: "Innovation",
    description: "Designed an AI-driven solution integrating Salesforce, MuleSoft, and OpenAI's ChatGPT API. Enabled natural language-triggered metadata and data backups, improving storage efficiency, data security, and disaster recovery.",
    impact: "AI-powered backups via natural language",
    tech: ["Salesforce", "MuleSoft", "OpenAI API", "Apex", "REST API"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    size: "small"
  },
  {
    id: 5,
    title: "Experience Cloud Portal Optimization",
    category: "Salesforce",
    description: "Led end-to-end solution ownership of Experience Cloud community portals, including customer self-service and content delivery. Designed metadata-driven Lightning pages and user-centric layouts with DAM and CIAM integrations.",
    impact: "40% improvement in customer engagement",
    tech: ["Experience Cloud", "LWC", "Lightning Pages", "CIAM", "DAM"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    size: "small"
  },
  {
    id: 6,
    title: "Healthcare Vlocity Implementation",
    category: "Salesforce",
    description: "Built and enhanced Vlocity cards, OmniScripts, DataRaptors, and Integration Procedures for Healthcare domain at Anthem Inc. Implemented end-to-end Lightning quick actions, LDS, Aura, VF, Apex, and LWC solutions.",
    impact: "Improved patient engagement workflows",
    tech: ["OmniStudio", "Vlocity", "Apex", "LWC", "Aura", "AutoRabit"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    size: "small"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(p => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Portfolio</span>
            <span className="w-8 h-px bg-salesforce" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Impact <span className="text-gradient">Delivered</span>
          </motion.h2>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-salesforce text-white shadow-[0_0_15px_rgba(128,0,32,0.4)]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:border-salesforce/50 transition-colors ${
                  project.size === "large" ? "md:col-span-2" : "col-span-1"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[#0A0F1E]/80 group-hover:bg-[#0A0F1E]/60 transition-colors z-10 mix-blend-multiply" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-auto">
                    <span className="px-3 py-1 bg-salesforce/20 text-salesforce text-xs font-bold rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-salesforce text-white transition-colors">
                        <MonitorPlay size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-gray-700 text-white transition-colors">
                        <Github size={18} />
                      </a>
                    </div>
                  </div>

                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gold font-bold text-lg">›</span>
                      <span className="text-gold font-medium text-sm">{project.impact}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-medium text-gray-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
