"use client";

import { useState, useCallback } from "react";
import { SKILLS_DATA } from "@/data";

const CATEGORIES = Object.keys(SKILLS_DATA);

export default function Skills() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [animKey, setAnimKey] = useState(0);

  const handleTabClick = useCallback((cat: string) => {
    setActiveTab(cat);
    setAnimKey((k) => k + 1);
  }, []);

  const skills = SKILLS_DATA[activeTab as keyof typeof SKILLS_DATA] || [];

  return (
    <section id="skills" className="py-24 relative bg-[#060a14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Capabilities</span>
            <span className="w-8 h-px bg-salesforce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onPointerDown={() => handleTabClick(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-150 cursor-pointer select-none border-2 ${
                  isActive
                    ? "text-white bg-salesforce border-salesforce shadow-[0_0_20px_rgba(128,0,32,0.5)]"
                    : "text-gray-300 bg-white/5 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tab Content — no AnimatePresence, direct render */}
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 max-w-4xl mx-auto relative overflow-hidden">
          <div key={animKey} className="grid gap-7 fade-in-skills">
            {skills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full skill-bar-fill"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 12px ${skill.color}`,
                      width: `${skill.level}%`,
                      animationDelay: `${index * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
