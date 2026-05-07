"use client"

import { Zap, Target, Globe, Award, Shield, Layers } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  { Icon: Target,  title: "Strategy First",          desc: "Every engagement begins with a strategic brief — no executions without direction. We define the game before we play it." },
  { Icon: Layers,  title: "Fully Integrated",        desc: "All seven disciplines share a single logic. What strategy defines, identity shapes. What identity shapes, campaigns amplify." },
  { Icon: Globe,   title: "Pan-African Reach",       desc: "Networks, media relationships, and on-ground activation capability across Lagos, Abuja, Port Harcourt, and growing markets." },
  { Icon: Zap,     title: "Speed Without Sacrifice", desc: "Rapid deployment cadence that does not compromise craft. We move fast because our systems are already built." },
  { Icon: Award,   title: "Proven at Scale",         desc: "Over 100 brands built across FMCG, finance, tech, real estate, and government — each outcome documented and repeatable." },
  { Icon: Shield,  title: "Brand Protection",        desc: "We build for longevity. Brand guidelines, governance frameworks, and training programs that keep your brand consistent." },
]

/* alternates: even = slide from left, odd = pop from below */
function cardVariants(i: number) {
  if (i % 2 === 0) {
    return {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      transition: { type: "spring" as const, stiffness: 220, damping: 24, delay: i * 0.08 },
    }
  }
  return {
    initial: { opacity: 0, scale: 0.88, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay: i * 0.08 },
  }
}

export function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "#0A0A0C" }}>
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Why LOECHSAR</span>
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
          </div>
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none mb-4" style={{ color: "#EDEDED" }}>
            The Difference<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>Is The System</span>
          </h2>
          <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "rgba(237,237,237,0.55)" }}>
            We don&apos;t just execute briefs. We build the systems that make brands endure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
          {features.map(({ Icon, title, desc }, i) => {
            const v = cardVariants(i)
            return (
              <motion.div
                key={title}
                className="group relative p-8 overflow-hidden cursor-default"
                style={{ background: "#0A0A0C" }}
                initial={v.initial}
                whileInView={v.animate}
                viewport={{ once: true, amount: 0.1 }}
                transition={v.transition}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(194,164,109,0.12), transparent 60%)" }} />

                <motion.div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(194,164,109,0.12)", border: "1px solid rgba(194,164,109,0.22)" }}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-base font-black mb-3" style={{ color: "#EDEDED" }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(237,237,237,0.52)" }}>{desc}</p>
                </div>

                <div className="absolute bottom-6 right-6 text-[3.5rem] font-black leading-none select-none pointer-events-none" style={{ color: "rgba(237,237,237,0.04)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
