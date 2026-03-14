"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Database, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PERSONAL } from "@/data";

const ValueProps = [
  { icon: Cloud, title: "Cloud Architecture", text: "Designing scalable, resilient, and multi-cloud solutions." },
  { icon: Code, title: "Custom Development", text: "Expertise in Apex, LWC, and complex system integrations." },
  { icon: Database, title: "Data Strategy", text: "Secure data modeling and seamless migrations." },
  { icon: Users, title: "Team Leadership", text: "Guiding Agile teams to deliver high-impact enterprise projects." },
];

function StatCounter({ delay, end, suffix, label }: { delay: number, end: number, suffix: string, label: string }) {
  const countRef = useRef(0);
  const [, forceRender] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const delayTimeout = setTimeout(() => {
      let current = 0;
      const stepTime = Math.max(Math.floor(2000 / end), 20);
      intervalId = setInterval(() => {
        current += 1;
        // Direct DOM update for reliability
        if (nodeRef.current) {
          nodeRef.current.textContent = current + suffix;
        }
        if (current >= end) {
          countRef.current = end;
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          forceRender(v => v + 1);
        }
      }, stepTime);
    }, delay * 1000);
    return () => {
      clearTimeout(delayTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, end, suffix]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      className="glass p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-lg relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-salesforce/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span ref={nodeRef} className="text-4xl font-heading font-bold text-white mb-2 relative z-10">
        {countRef.current}{suffix}
      </span>
      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider relative z-10">
        {label}
      </span>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Bio & Value Props */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">About Me</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
            Architecting <span className="text-gradient">Digital Transformation</span>
          </h2>

          <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-10">
            {PERSONAL.bio.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {ValueProps.map((prop, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-salesforce/10 flex items-center justify-center shrink-0 border border-salesforce/20 text-salesforce">
                  <prop.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{prop.title}</h4>
                  <p className="text-sm text-gray-500">{prop.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main Frame — Einstein & Agentforce Showcase */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-salesforce/20 bg-gradient-to-br from-[#0d1530] to-[#0A0F1E] aspect-[4/5] max-w-md mx-auto z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-salesforce/20 via-transparent to-gold/10 opacity-50 mix-blend-overlay" />
            <img
              src="/einstein-agentforce.png"
              alt="Salesforce Einstein AI & Agentforce"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Salesforce ecosystem floating icons */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-salesforce border border-salesforce/30 backdrop-blur-md">☁ Salesforce</span>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-gold border border-gold/30 backdrop-blur-md">🤖 Einstein AI</span>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-purple-400 border border-purple-400/30 backdrop-blur-md">⚡ Agentforce</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-salesforce/30 blur-[80px] rounded-full z-0" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/20 blur-[80px] rounded-full z-0" />

          {/* Stat Floating Cards */}
          <div className="absolute -left-12 top-1/4 z-20 hidden md:block">
            <StatCounter delay={0.4} end={PERSONAL.stats.yearsExp} suffix="+" label="Years Experience" />
          </div>

          <div className="absolute -right-8 bottom-1/4 z-20 hidden md:block">
            <StatCounter delay={0.6} end={PERSONAL.stats.certifications} suffix="+" label="Certifications" />
          </div>

          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 z-20 hidden md:block w-48">
            <StatCounter delay={0.8} end={PERSONAL.stats.projects} suffix="+" label="Projects Delivered" />
          </div>

          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8 md:hidden z-20 relative">
            <StatCounter delay={0.4} end={PERSONAL.stats.yearsExp} suffix="+" label="Years Exp" />
            <StatCounter delay={0.6} end={PERSONAL.stats.certifications} suffix="+" label="Certs" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
