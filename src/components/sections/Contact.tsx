"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Send, Github, Loader2, MessageCircle, CheckCircle, XCircle } from "lucide-react";
import { PERSONAL } from "@/data";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setFormState("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
          subject: "Portfolio Contact from " + fd.get("name"),
          from_name: String(fd.get("name") || ""),
          replyto: String(fd.get("email") || ""),
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          message: String(fd.get("message") || ""),
        }),
      });
      const data = await res.json();
      setFormState("idle");
      if (data.success) {
        setToastType("success");
        setToastMsg("Email Sent! I'll get back to you soon.");
        setShowToast(true);
        formRef.current?.reset();
      } else {
        setToastType("error");
        setToastMsg("Something went wrong. Please try again.");
        setShowToast(true);
      }
    } catch {
      setFormState("idle");
      setToastType("error");
      setToastMsg("Network error. Please try again.");
      setShowToast(true);
    }
  }

  return (
    <>
      {/* Global Toast Notification — rendered outside section to avoid stacking context issues */}
      <div
        id="contact-toast"
        style={{
          position: "fixed",
          bottom: showToast ? "2.5rem" : "-5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999999,
          opacity: showToast ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: showToast ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.5rem",
            borderRadius: "9999px",
            background: "#0A0F1E",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          {toastType === "success" ? (
            <CheckCircle size={22} color="#4ade80" />
          ) : (
            <XCircle size={22} color="#f87171" />
          )}
          <span style={{ color: "white", fontWeight: 500, fontSize: "1rem" }}>
            {toastMsg}
          </span>
          <button
            onClick={() => setShowToast(false)}
            style={{
              color: "rgba(255,255,255,0.5)",
              marginLeft: "0.5rem",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
      </div>

      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-[#0A0F1E]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-salesforce" />
                <span className="text-salesforce font-semibold tracking-widest uppercase text-sm">Get in Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                Let&apos;s Build <span className="text-gradient">Something</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                Whether you need a full Salesforce implementation, an architecture review, or a custom LWC app, I&apos;m here to help you hit your business goals.
              </p>

              <div className="space-y-6 mb-12">
                 <a href={`mailto:${PERSONAL.email}`} className="flex items-center gap-4 group">
                   <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-salesforce group-hover:bg-salesforce group-hover:text-white transition-all transform group-hover:-translate-y-1 shadow-[0_0_15px_rgba(128,0,32,0)] group-hover:shadow-[0_0_15px_rgba(128,0,32,0.3)]">
                     <Mail size={20} />
                   </div>
                   <div>
                     <span className="block text-xs text-gray-400 uppercase font-semibold">Email</span>
                     <span className="text-white font-medium">{PERSONAL.email}</span>
                   </div>
                 </a>

                 <div className="flex items-center gap-4 group">
                   <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#0A0F1E] transition-all transform group-hover:-translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                     <MapPin size={20} />
                   </div>
                   <div>
                     <span className="block text-xs text-gray-400 uppercase font-semibold">Location</span>
                     <span className="text-white font-medium">{PERSONAL.location}</span>
                   </div>
                 </div>

                 <a href="https://wa.me/919591011997?text=Hi%20Harish%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                   <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all transform group-hover:-translate-y-1 shadow-[0_0_15px_rgba(37,211,102,0)] group-hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                     <MessageCircle size={20} />
                   </div>
                   <div>
                     <span className="block text-xs text-gray-400 uppercase font-semibold">WhatsApp</span>
                     <span className="text-white font-medium">+91 95910 11997</span>
                     <span className="text-gray-400 mx-1">|</span>
                     <span className="text-white font-medium">+358 50 430 4276</span>
                   </div>
                 </a>
              </div>

              <div className="flex gap-4">
                 <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#0077b5] hover:border-[#0077b5] transition-colors">
                    <Linkedin size={20} />
                 </a>
                 <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors">
                    <Github size={20} />
                 </a>
                 <a href="https://wa.me/919591011997?text=Hi%20Harish%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#25D366] hover:border-[#25D366] transition-colors">
                    <MessageCircle size={20} />
                 </a>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <form ref={formRef} onSubmit={submitForm} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Name</label>
                    <input required id="name" name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-salesforce transition-colors placeholder:text-gray-600" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Email</label>
                    <input required id="email" name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-salesforce transition-colors placeholder:text-gray-600" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Message</label>
                  <textarea required id="message" name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-salesforce transition-colors placeholder:text-gray-600 resize-none" placeholder="Tell me about your project or just say hello..." />
                </div>

                <button
                  disabled={formState === "loading"}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-salesforce text-white font-bold flex items-center justify-center gap-2 hover:bg-[#5c0017] transition-colors disabled:opacity-70 group"
                >
                  {formState === "loading" ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
