"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/data";

function TimelineCard({ experience, index }: { experience: typeof EXPERIENCES[0], index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex justify-center w-full my-12 md:my-24">
      {/* Central Node for Desktop */}
      <div className="absolute left-1/2 -translate-x-[50%] top-6 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0A0F1E] bg-salesforce text-white shadow-[0_0_20px_rgba(128,0,32,0.5)] z-20">
        <Briefcase size={20} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`w-full md:w-[calc(50%-3rem)] glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-salesforce/50 transition-colors duration-500 relative z-10 ${
          isEven ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        {/* Mobile timeline node */}
        <div className="md:hidden absolute -left-6 top-8 w-12 h-12 rounded-full border-4 border-[#0A0F1E] bg-salesforce text-white flex items-center justify-center shadow-[0_0_20px_rgba(128,0,32,0.5)] z-20">
          <Briefcase size={20} />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{experience.role}</h3>
            <div className="text-salesforce font-medium text-lg mb-2">{experience.company}</div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-2">
              {experience.type}
            </span>
            <div className="text-gray-400 text-sm whitespace-nowrap">{experience.date}</div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {experience.description}
        </p>

        <ul className="space-y-2 mb-6 text-sm text-gray-400">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-salesforce shrink-0">▹</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Key Win Callout */}
        <div className="bg-salesforce/10 border border-salesforce/20 rounded-xl p-4 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-salesforce" />
          <h4 className="text-salesforce text-xs font-bold uppercase tracking-wider mb-1">Key Win</h4>
          <p className="text-white text-sm italic">{experience.keyWin}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {experience.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-24 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-salesforce/30 bg-salesforce/5 mb-6"
          >
            <span className="text-salesforce text-sm font-medium tracking-wide">MY JOURNEY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Career <span className="text-gradient">Timeline</span>
          </motion.h2>
        </div>

        <div className="relative pl-6 md:pl-0">
          {/* Animated Central Spine for Desktop */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-[50%]" />
          
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-salesforce -translate-x-[50%] origin-top z-0 shadow-[0_0_15px_rgba(128,0,32,0.5)]"
            style={{ scaleY: pathLength }}
          />

          {EXPERIENCES.map((exp, i) => (
            <TimelineCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
