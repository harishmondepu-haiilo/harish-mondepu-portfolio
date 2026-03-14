"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CERTS, PERSONAL } from "@/data";

function CertCard({ cert, index }: { cert: typeof CERTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className={`group perspective-1000 ${cert.highlight ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <div className={`relative w-full h-full preserve-3d transition-transform duration-700 group-hover:rotate-y-180 min-h-[200px] ${cert.highlight ? "min-h-[250px]" : ""}`}>
        
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
          {cert.highlight && (
            <div className="absolute inset-0 bg-gradient-to-tr from-salesforce/20 to-gold/20 opacity-30" />
          )}
          <div className="text-5xl mb-4 relative z-10">{cert.logo}</div>
          <h3 className={`font-bold text-white mb-1 relative z-10 ${cert.highlight ? "text-2xl" : "text-lg"}`}>
            {cert.name}
          </h3>
          <p className="text-salesforce text-sm font-medium relative z-10">{cert.issuer}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#1A233A] to-[#0A0F1E] rounded-3xl p-6 border border-salesforce/50 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(128,0,32,0.2)]">
          {/* Holographic shimmer */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat group-hover:transition-[background-position_0s_ease] group-hover:bg-[position:-100%_0,0_0] group-hover:duration-[2000ms]" />
          
          <div className="relative z-10">
            <h3 className="font-bold text-white text-lg mb-2 leading-tight">{cert.name}</h3>
            <div className="text-gray-400 text-sm mb-4">
              <p>Issued: {cert.date}</p>
              <p>Status: Active</p>
            </div>
          </div>
          
          <button className="relative z-10 w-full py-2 rounded-lg bg-salesforce/20 hover:bg-salesforce text-salesforce hover:text-white border border-salesforce transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
            <span>Verify</span>
            <ExternalLink size={14} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-[#060a14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold font-semibold tracking-widest uppercase text-sm">Credentials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold"
            >
              Salesforce <span className="text-gradient">Certified</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6"
          >
            <div className="text-4xl md:text-5xl font-bold font-heading text-white">{PERSONAL.stats.certifications}</div>
            <div className="text-sm font-medium text-gray-400 leading-tight">
              Active<br />Certifications
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CERTS.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href={PERSONAL.trailhead}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#800020]/10 border border-[#800020]/50 text-[#800020] font-semibold hover:bg-[#800020] hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(128,0,32,0.2)]"
          >
            <img src="https://trailhead.salesforce.com/assets/trailhead-logo-0eb6a7c36a43b2f5b66d7ad4683c31b2.svg" alt="Trailhead" className="w-6 h-6 filter invert brightness-0 hover:invert-0 transition-all" />
            <span>Trailhead Ranger Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
