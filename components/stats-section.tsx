"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { end: 100, suffix: "+",  label: "Brands Built",   desc: "From challenger startups to established enterprises across Africa and beyond." },
  { end: 7,   suffix: "",   label: "Disciplines",    desc: "Strategy, identity, campaigns, OOH, events, training, and research — unified." },
  { end: 12,  suffix: "+",  label: "Years Active",   desc: "Over a decade of precision brand work that has shaped markets and led categories." },
  { end: 500, suffix: "M+", label: "Audience Reach", desc: "Campaigns built and deployed to half a billion people across every channel." },
]

function useCountUp(end: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])
  return count
}

function StatCard({ stat, started, idx }: { stat: (typeof stats)[0]; started: boolean; idx: number }) {
  const count = useCountUp(stat.end, started)
  return (
    <motion.div
      className="relative p-8 rounded-2xl group overflow-hidden"
      style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: idx * 0.1 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(8,42,123,0.15), transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, #082A7B, transparent)" }} />

      <div className="relative z-10">
        <div className="text-5xl md:text-6xl font-black leading-none mb-3" style={{ color: "#4B73D4" }}>
          {count}{stat.suffix}
        </div>
        <div className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(237,237,237,0.55)" }}>{stat.label}</div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(237,237,237,0.42)" }}>{stat.desc}</p>
      </div>
    </motion.div>
  )
}

export function StatsSection() {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: "#0A0A0C" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(8,42,123,0.1), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>By the Numbers</span>
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight" style={{ color: "#EDEDED" }}>
            Results That<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>Define the Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} started={started} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
