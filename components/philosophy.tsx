"use client"

import { motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1] as const

export function Philosophy() {
  return (
    <section className="relative py-40 overflow-hidden" style={{ background: "#111115" }}>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span className="font-black whitespace-nowrap" style={{ fontSize: "clamp(6rem,18vw,18rem)", opacity: 0.04, letterSpacing: "-0.05em", color: "#EDEDED" }}>
          BLACKLINE
        </span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,42,123,0.14), transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <motion.div
          className="flex items-center justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="w-8 h-px" style={{ background: "#082A7B" }} />
          <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Philosophy</span>
          <div className="w-8 h-px" style={{ background: "#082A7B" }} />
        </motion.div>

        <motion.blockquote
          className="font-black leading-[1.12] tracking-tight mb-6"
          style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", color: "#EDEDED" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          We don&apos;t build noise.
        </motion.blockquote>

        <motion.blockquote
          className="font-black leading-[1.12] tracking-tight mb-16"
          style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", color: "#4B73D4" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          We build clarity{" "}
          <span style={{ color: "#EDEDED" }}>that moves through systems.</span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          style={{ transformOrigin: "top" }}
        >
          <div className="w-px h-16 mx-auto mb-16" style={{ background: "rgba(255,255,255,0.1)" }} />
        </motion.div>

        <motion.p
          className="font-light leading-relaxed tracking-[0.06em] mb-4"
          style={{ fontSize: "clamp(1.1rem,2.5vw,1.65rem)", color: "rgba(237,237,237,0.48)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          Precision is not silence.
        </motion.p>
        <motion.p
          className="font-light leading-relaxed tracking-[0.06em]"
          style={{ fontSize: "clamp(1.1rem,2.5vw,1.65rem)", color: "rgba(237,237,237,0.48)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
        >
          It is control.
        </motion.p>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <div className="grid grid-cols-3 max-w-md mx-auto overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>
            {[
              { value: "100+", label: "Brands Built" },
              { value: "7",    label: "Disciplines", accent: true },
              { value: "∞",    label: "Systems" },
            ].map((s, idx) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-8"
                style={{
                  borderRight: idx < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  background: s.accent ? "rgba(8,42,123,0.12)" : "transparent",
                }}
              >
                <span className="text-3xl font-black mb-1.5" style={{ color: s.accent ? "#4B73D4" : "#EDEDED" }}>{s.value}</span>
                <span className="text-[8px] uppercase tracking-widest" style={{ color: "rgba(237,237,237,0.35)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
