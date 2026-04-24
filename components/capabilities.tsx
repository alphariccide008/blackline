"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const capabilities = [
  { name: "Brand Strategy",           description: "Positioning, architecture, and market dominance frameworks designed before the first dollar is spent." },
  { name: "Identity Systems",          description: "Visual language, guidelines, and brand expression built to be unmistakable and enduring." },
  { name: "Campaign Development",      description: "End-to-end campaign conception and execution across every relevant channel." },
  { name: "Outdoor Advertising",       description: "Precision OOH placement across premium billboard, transit, and lamppost environments." },
  { name: "Event & Experience Design", description: "Brand environments and installations that create culture, memory, and conversation." },
  { name: "Corporate Training",        description: "Brand internalization programs for teams that carry and execute the brand vision." },
  { name: "Market Research",           description: "Competitive intelligence and audience insight that shapes decisions before they are made." },
]

const ease = [0.16, 1, 0.3, 1] as const

export function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="py-32 relative overflow-hidden" style={{ background: "#111115" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 60%, rgba(8,42,123,0.07) 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#082A7B" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Capabilities</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
              What<br />We Do
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(237,237,237,0.58)" }}>
              Seven disciplines. One system. Every service compounds — none compete. When you engage one, you engage the logic of all.
            </p>
          </div>
        </motion.div>

        <div>
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              className="relative group cursor-default"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: idx === capabilities.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: hovered === idx ? 1 : 0, background: "linear-gradient(90deg, rgba(8,42,123,0.1), transparent 70%)" }} />
              <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300" style={{ background: "#4B73D4", opacity: hovered === idx ? 1 : 0, transform: hovered === idx ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top" }} />

              <div className="relative flex items-center justify-between gap-6 py-6 pl-6">
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <span className="text-[11px] font-black tracking-[0.25em] flex-shrink-0 transition-colors duration-300 w-8" style={{ color: hovered === idx ? "#4B73D4" : "rgba(237,237,237,0.22)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black truncate transition-colors duration-300" style={{ color: hovered === idx ? "#EDEDED" : "rgba(237,237,237,0.62)" }}>
                    {cap.name}
                  </h3>
                </div>

                <p className="hidden sm:block text-xs max-w-xs text-right leading-relaxed transition-all duration-300" style={{ color: "rgba(237,237,237,0.5)", opacity: hovered === idx ? 1 : 0, transform: hovered === idx ? "translateX(0)" : "translateX(12px)" }}>
                  {cap.description}
                </p>

                <div className="w-8 h-8 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ borderColor: hovered === idx ? "#4B73D4" : "rgba(255,255,255,0.12)", background: hovered === idx ? "#082A7B" : "transparent" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
