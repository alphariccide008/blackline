"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

const stages = [
  {
    number: "01", stage: "THINK", title: "Strategy",
    description: "We define how brands win before they enter the market.",
    detail: "Market positioning, competitive analysis, brand architecture, and go-to-market strategy designed to establish dominance before the first impression is made.",
  },
  {
    number: "02", stage: "DESIGN", title: "Identity",
    description: "We shape how brands are seen, heard, and remembered.",
    detail: "Visual identity systems, sonic branding, brand guidelines, and creative direction built to be unmistakable and enduring across every touchpoint.",
  },
  {
    number: "03", stage: "SHOW", title: "Activation",
    description: "We introduce brands into culture with precision.",
    detail: "Campaign development, outdoor advertising, digital placement, and media strategy executed with surgical precision across every relevant channel.",
  },
  {
    number: "04", stage: "LIVE", title: "Experience",
    description: "We create real-world brand moments that stay.",
    detail: "Events, installations, experiential marketing, and brand environments that create memory, loyalty, and cultural conversation.",
  },
]

const ease = [0.16, 1, 0.3, 1] as const

function TiltCard({ stage, idx, total }: { stage: (typeof stages)[0]; idx: number; total: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -6
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 6
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      className="relative p-8 cursor-default group"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderRight: idx < total - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "transform 0.35s ease, background 0.35s ease",
        background: hovered ? "rgba(8,42,123,0.1)" : "transparent",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <div className="absolute top-0 left-0 h-[2px] transition-all duration-500" style={{ width: hovered ? "100%" : "0%", background: "#082A7B" }} />

      <span className="text-[10px] font-black tracking-[0.3em] mb-6 block" style={{ color: "rgba(237,237,237,0.22)" }}>{stage.number}</span>

      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ background: "#082A7B" }} />
        <span className="text-[9px] font-black uppercase tracking-[0.32em]" style={{ color: "#4B73D4" }}>{stage.stage}</span>
      </div>

      <h3 className="text-[1.6rem] font-black mb-3 transition-colors duration-300" style={{ color: hovered ? "#EDEDED" : "rgba(237,237,237,0.7)" }}>
        {stage.title}
      </h3>

      <div className="w-8 h-px mb-4" style={{ background: "rgba(75,115,212,0.4)" }} />
      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(237,237,237,0.55)" }}>{stage.description}</p>

      <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: hovered ? 90 : 0, opacity: hovered ? 1 : 0 }}>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(237,237,237,0.42)" }}>{stage.detail}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, rgba(75,115,212,0.5), transparent)", opacity: hovered ? 1 : 0 }} />
    </div>
  )
}

export function SystemSection() {
  return (
    <section id="system" className="py-32 relative overflow-hidden" style={{ background: "#111115" }}>
      <div className="absolute inset-x-0 top-0 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(8,42,123,0.12), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>How We Operate</span>
          </div>
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
            The BLACKLINE<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>System</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
        >
          {stages.map((stage, idx) => (
            <TiltCard key={stage.number} stage={stage} idx={idx} total={stages.length} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="text-[10px] uppercase tracking-[0.2em] text-center" style={{ color: "rgba(237,237,237,0.3)" }}>
            Every engagement runs through all four stages — no shortcuts.
          </p>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
        </motion.div>
      </div>
    </section>
  )
}
