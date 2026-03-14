"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Education</span>
            <span className="w-8 h-px bg-salesforce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-salesforce/30 transition-all duration-300"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-salesforce/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-salesforce/10 border border-salesforce/20 flex items-center justify-center text-salesforce mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={28} />
                </div>

                {/* Degree */}
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-gray-400 mb-4">
                  {edu.institution}
                </p>

                {/* Year Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gold font-semibold">
                  🎓 {edu.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-salesforce/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gold/10 blur-[100px] rounded-full" />
    </section>
  );
}
