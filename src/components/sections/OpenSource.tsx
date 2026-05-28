"use client";

import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Package, Scale } from "lucide-react";

const REPOS = [
  {
    id: 1,
    owner: "harish3699",
    name: "Salesforce-File-Extractor",
    description:
      "Bulk-export Salesforce files (ContentVersions + Attachments) to a structured local folder, organized by Account and Opportunity — with a CSV index. No Connected App needed.",
    impact: "Saved €20,000 in manual effort",
    language: "Python",
    languageColor: "#3572A5",
    license: "MIT",
    topics: ["salesforce", "python", "content-version", "bulk-export", "tkinter"],
    url: "https://github.com/harish3699/Salesforce-File-Extractor",
    featured: true,
    version: "v1.0 · Apr 2026",
  },
  {
    id: 2,
    owner: "harish3699",
    name: "ai-engineer-roadmap",
    description:
      "26-week · 9-phase · 62-module AI engineering curriculum. Covers Python, LLMs, Prompt Engineering, RAG, Agents, MCP, Multi-Agent Orchestration, LLMOps, and Cloud Deployment — with a capstone project building a production RAG + agent app.",
    impact: "Live at ai-engineer-roadmap-pi.vercel.app",
    language: "JavaScript",
    languageColor: "#f1e05a",
    license: null,
    topics: ["ai", "llm", "rag", "agents", "mcp", "curriculum", "react", "vercel"],
    url: "https://github.com/harish3699/ai-engineer-roadmap",
    featured: true,
    version: "v1.0 · May 2026",
  },
  {
    id: 3,
    owner: "harish3699",
    name: "ikea-ai-assistant",
    description:
      "KALLAX AI Support webapp — RAG chatbot powered by Flowise, Pinecone, and Groq. Answers real product questions from a PDF knowledge base using vector search. Also embedded as an LWC component in a Salesforce Experience Cloud site.",
    impact: "Live demo at ikea-assistant.vercel.app",
    language: "HTML",
    languageColor: "#e34c26",
    license: null,
    topics: ["rag", "flowise", "pinecone", "groq", "salesforce-ec", "lwc", "vercel"],
    url: "https://github.com/harish3699/ikea-ai-assistant",
    featured: false,
    version: "v1.0 · May 2026",
  },
];

export default function OpenSource() {
  return (
    <section id="opensource" className="py-24 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(128,0,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,32,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Open Source</span>
            <span className="w-8 h-px bg-salesforce" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Built for the <span className="text-gradient">Community</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-400 max-w-xl mx-auto"
          >
            Tools I built to solve real Salesforce problems — open-sourced so anyone can use, extend, or contribute.
          </motion.p>
        </div>

        {/* Repo cards */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {REPOS.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative block rounded-3xl border border-white/10 bg-white/5 hover:border-salesforce/50 backdrop-blur-sm overflow-hidden transition-colors duration-300"
            >
              {/* Top accent bar */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-salesforce/60 to-transparent" />

              {/* Card content */}
              <div className="p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    {/* GitHub icon */}
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-salesforce/20 transition-colors">
                      <Github size={20} className="text-white" />
                    </div>
                    <div>
                      {/* Repo path */}
                      <p className="font-mono text-xs text-gray-500 leading-none mb-1">{repo.owner} /</p>
                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-salesforce transition-colors leading-tight">
                        {repo.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {repo.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/15 text-gold border border-gold/20">
                        Featured
                      </span>
                    )}
                    <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={15} className="text-white" />
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{repo.description}</p>

                {/* Impact callout */}
                <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-gold/5 border border-gold/15">
                  <span className="text-gold font-bold text-base">›</span>
                  <span className="text-gold text-sm font-medium">{repo.impact}</span>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-salesforce/10 text-salesforce border border-salesforce/20"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Footer stats */}
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <div className="flex items-center gap-5 text-xs text-gray-400">
                    {/* Language */}
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      {repo.language}
                    </span>

                    {/* License */}
                    {repo.license && (
                      <span className="flex items-center gap-1.5">
                        <Scale size={12} />
                        {repo.license}
                      </span>
                    )}

                    {/* Stars placeholder */}
                    <span className="flex items-center gap-1.5">
                      <Star size={12} />
                      Star it
                    </span>

                    {/* Fork */}
                    <span className="flex items-center gap-1.5">
                      <GitFork size={12} />
                      Fork it
                    </span>
                  </div>

                  <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    {repo.version}
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(128,0,32,0.08),transparent_60%)]" />
            </motion.a>
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/harish3699"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <Github size={16} />
            <span>More on GitHub</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
