"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/data";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#060a14]">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-salesforce/5 blur-[120px] rounded-full point-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-salesforce" />
            <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Recommendations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Trusted by <br />
            <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
            I believe that the best code is code that delivers real business value. Here&apos;s what some of the people I&apos;ve collaborated with have to say about my work and work ethic.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-4">
               {TESTIMONIALS.slice(0, 4).map((t) => (
                 <img key={t.id} className="w-12 h-12 rounded-full border-2 border-[#060a14]" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0A0F1E&color=800020`} alt={t.name} />
               ))}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex text-gold">
                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">5.0 Average Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Carousel Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[400px] mx-auto lg:mx-0 lg:ml-auto"
        >
          {mounted ? (
             <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="w-full h-full pb-12"
              >
              {TESTIMONIALS.map((test) => (
                <SwiperSlide key={test.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0A0F1E] p-8 shadow-2xl relative">
                  <Quote className="absolute top-6 right-6 text-white/5" size={80} />
                  <div className="flex items-center gap-1 text-gold mb-6">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic text-lg mb-8 relative z-10 leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(test.name)}&background=0A0F1E&color=800020`} 
                      alt={test.name} 
                      className="w-12 h-12 rounded-full border border-salesforce/30"
                    />
                    <div>
                      <h4 className="text-white font-bold">{test.name}</h4>
                      <p className="text-gray-400 text-xs">{test.title} at {test.company}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-salesforce">
                        {test.relation}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
