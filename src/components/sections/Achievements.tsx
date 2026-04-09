"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "@/data";

export default function Achievements() {
  if (!ACHIEVEMENTS || ACHIEVEMENTS.length === 0) return null;

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Recognition</span>
            <span className="w-8 h-px bg-salesforce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Key <span className="text-gradient">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ACHIEVEMENTS.map((ach: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-salesforce/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">{ach.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{ach.description}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-salesforce font-semibold">
                  {ach.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-salesforce/10 blur-[100px] rounded-full" />
    </section>
  );
}
