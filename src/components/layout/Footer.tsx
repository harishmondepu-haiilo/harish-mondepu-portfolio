"use client";

import { Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060a14] border-t border-white/5 pt-16 pb-8 text-center md:text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12 relative z-10">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
             <div className="w-8 h-8 rounded-full bg-salesforce text-white flex items-center justify-center font-heading font-bold text-sm">
                HM
             </div>
             <span className="font-heading font-semibold text-xl text-white">Harish <span className="text-salesforce">Mondepu</span></span>
          </Link>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            Elevating enterprise architecture. Building scalable, maintainable, and high-performance solutions on the Salesforce platform.
          </p>
          <a href="mailto:harimba963@gmail.com" className="text-white font-medium hover:text-salesforce transition-colors">
            harimba963@gmail.com
          </a>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#about" className="hover:text-salesforce transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-salesforce transition-colors">Skills</a></li>
            <li><a href="#experience" className="hover:text-salesforce transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-salesforce transition-colors">Projects</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Connect</h4>
           <ul className="space-y-3 text-sm text-gray-400">
             <li><a href="https://linkedin.com/in/harishmondepu" target="_blank" rel="noreferrer" className="hover:text-[#0077b5] transition-colors">LinkedIn</a></li>
             <li><a href="https://trailhead.salesforce.com/en/me/harishmondepu" target="_blank" rel="noreferrer" className="hover:text-salesforce transition-colors">Trailhead</a></li>
             <li><a href="https://github.com/harishmondepu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
             <li><a href="https://wa.me/919591011997?text=Hi%20Harish%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp</a></li>
             <li><Link href="/admin" className="hover:text-gold transition-colors">Admin Login</Link></li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Harish Mondepu. All rights reserved. <br className="md:hidden" />
          <span className="md:inline hidden"> | </span>Built with Next.js & Tailwind.
        </p>
        
        <button 
          onClick={scrollToTop}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-salesforce transition-all"
        >
          <motion.div whileHover={{ y: -5, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Rocket size={18} />
          </motion.div>
          <motion.div className="absolute opacity-0 group-hover:opacity-100 mt-10" whileHover={{ y: -45 }} transition={{ duration: 0.3, type: "spring" }}>
            <Rocket size={18} />
          </motion.div>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-salesforce/50 to-transparent" />
    </footer>
  );
}
