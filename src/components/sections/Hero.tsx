"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Billboard, Text } from "@react-three/drei";
import { useEffect, useState, useMemo } from "react";
import * as THREE from "three";

// A simplistic 3D Cloud Particle System mapped to the background
function CloudParticles() {
  const count = 50;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 10 - 5;
        temp.push({ position: new THREE.Vector3(x, y, z), scale: Math.random() * 0.5 + 0.5 });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Billboard position={particle.position}>
            <Text 
              fontSize={particle.scale} 
              color="#800020" 
              fillOpacity={0.2}
              font={"https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hidA.woff2"}
              >
                ☁
            </Text>
          </Billboard>
        </Float>
      ))}
    </>
  );
}

const ROLES = [
  "Salesforce Engineer",
  "CRM Consultant",
  "Platform Developer",
  "Cloud Solutions Expert",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const name = "Harish Mondepu".split("");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <CloudParticles />
        </Canvas>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left: Typography */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#800020]/50 bg-[#800020]/10 w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse shrink-0" />
            <span className="text-[#cc334d] text-sm font-medium tracking-wide">AVAILABLE FOR NEW OPPORTUNITIES</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="inline-flex whitespace-nowrap">
              {name.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={char === " " ? "w-[0.3em]" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="h-12 md:h-16 flex items-center mb-6">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-4xl font-heading font-semibold text-gradient"
            >
              {ROLES[roleIndex]}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block ml-1 w-3 h-8 md:h-10 bg-salesforce align-middle"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            With 9+ years of hands-on Salesforce expertise, I design and deliver scalable CRM solutions — from CPQ and Service Cloud to MuleSoft integrations and LWC development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 rounded-full bg-salesforce text-white font-semibold hover:bg-white hover:text-[#0A0F1E] transition-all duration-300 shadow-[0_0_20px_rgba(128,0,32,0.3)] hover:shadow-white/30 transform hover:-translate-y-1">
              View My Work
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1">
              Let&apos;s Connect
            </button>
          </motion.div>
        </div>

        {/* Right: Floating Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:ml-auto w-72 h-72 md:w-96 md:h-96"
        >
          {/* Main Avatar Bubble */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 shadow-[0_0_50px_rgba(128,0,32,0.1)] relative z-10"
          >
             <div className="w-full h-full rounded-full bg-[#111827] overflow-hidden relative">
               {/* Replace with actual candidate image */}
                <img src="/harish-profile.jpg" alt="Harish Mondepu" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Harish+Mondepu&background=0A0F1E&color=800020&size=512"; }} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/80 to-transparent" />
             </div>
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute top-10 -left-10 md:top-20 md:-left-16 glass px-4 py-3 rounded-2xl flex items-center gap-3 z-20 shadow-xl border border-salesforce/30"
          >
             <span className="text-3xl text-salesforce">☁</span>
             <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase font-semibold">16x Certified</span>
               <span className="text-sm font-bold text-white">Salesforce Expert</span>
             </div>
          </motion.div>

          <motion.div
            animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 -right-4 md:bottom-20 md:-right-8 glass px-4 py-3 rounded-2xl flex items-center gap-3 z-20 shadow-xl border border-gold/30"
          >
             <span className="font-heading text-2xl font-bold text-gold">9+</span>
             <div className="flex flex-col">
               <span className="text-xs text-gray-400 uppercase font-semibold">Years of</span>
               <span className="text-sm font-bold text-white">Experience</span>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
