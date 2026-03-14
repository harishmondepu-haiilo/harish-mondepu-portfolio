"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EinsteinAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 60000); // 1 minute
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed bottom-6 z-50 pointer-events-none"
          style={{ left: 0, right: 0 }}
        >
          {/* Einstein on a plane flying across screen */}
          <motion.div
            initial={{ x: "-150px" }}
            animate={{ x: "calc(100vw + 150px)" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            className="relative"
          >
            {/* Plane + Einstein combo */}
            <div className="relative inline-flex items-end">
              {/* Trail/contrail */}
              <motion.div
                className="absolute -left-32 top-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-l from-white/40 to-transparent rounded-full"
              />

              {/* Paper plane body */}
              <svg width="80" height="50" viewBox="0 0 80 50" className="drop-shadow-[0_0_15px_rgba(128,0,32,0.6)]">
                {/* Plane body */}
                <polygon points="0,25 70,10 70,18" fill="#800020" opacity="0.9" />
                <polygon points="0,25 70,32 70,40" fill="#0081C0" opacity="0.9" />
                {/* Wing */}
                <polygon points="40,10 55,0 55,10" fill="#800020" opacity="0.7" />
                <polygon points="40,40 55,50 55,40" fill="#0081C0" opacity="0.7" />
                {/* Window */}
                <circle cx="55" cy="22" r="5" fill="#FFB547" opacity="0.9" />
              </svg>

              {/* Einstein character riding on top */}
              <div className="absolute -top-10 left-8 text-4xl" style={{ transform: "rotate(-10deg)" }}>
                🧑‍🔬
              </div>

              {/* Salesforce cloud trail */}
              <motion.span
                animate={{ opacity: [0.8, 0.3, 0.8], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -left-12 -top-2 text-xl text-salesforce/40"
              >
                ☁
              </motion.span>
              <motion.span
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="absolute -left-20 top-1 text-sm text-salesforce/30"
              >
                ☁
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
