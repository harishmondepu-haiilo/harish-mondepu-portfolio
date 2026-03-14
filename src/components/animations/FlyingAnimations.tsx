"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FlyingAnimations() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run on client side
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  // The bear runs along the bottom and right edges
  const bearPath = {
    x: [-100, windowSize.width - 100, windowSize.width - 100, -100],
    y: [windowSize.height - 100, windowSize.height - 100, 100, 100],
    scaleX: [1, 1, -1, -1], // Flip character based on direction
  };

  // Einstein flies along top and left edges
  const einsteinPath = {
    x: [windowSize.width + 100, 100, 100, windowSize.width + 100],
    y: [100, 100, windowSize.height - 100, windowSize.height - 100],
    scaleX: [1, 1, -1, -1],
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {/* Bear Animation */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24"
        animate={{
          x: bearPath.x,
          y: bearPath.y,
          scaleX: bearPath.scaleX,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.45, 0.5, 0.95],
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <span className="text-4xl text-white">🐻</span>
        </div>
      </motion.div>

      {/* Einstein Animation */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24"
        animate={{
          x: einsteinPath.x,
          y: einsteinPath.y,
          scaleX: einsteinPath.scaleX,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.45, 0.5, 0.95],
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center bg-salesforce/20 backdrop-blur-md rounded-full border border-salesforce/30 shadow-[0_0_15px_rgba(128,0,32,0.3)]">
          <span className="text-4xl">👨‍🔬</span>
        </div>
      </motion.div>
    </div>
  );
}
