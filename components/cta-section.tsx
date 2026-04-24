"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section className="py-4 relative overflow-hidden" style={{ background: "#030612" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="relative rounded-2xl overflow-hidden p-12 md:p-20"
          style={{ background: "linear-gradient(135deg, #082A7B 0%, #041650 60%, #030612 100%)" }}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/15 pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-white/15 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-white/15 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/15 pointer-events-none" />

          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(75,115,212,0.2), transparent)" }} />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-px bg-white/25" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/50">Ready to Begin</span>
              <div className="w-8 h-px bg-white/25" />
            </motion.div>

            <motion.h2
              className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Your Brand&apos;s Next<br />Chapter Starts Here.
            </motion.h2>

            <motion.p
              className="text-white/50 text-sm md:text-base leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              Build a brief, schedule a strategy session, or simply reach out. The BLACKLINE system is ready.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/#brief"
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black text-[#082A7B] bg-white hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Build a Brief
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black text-white border border-white/25 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Talk to Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
