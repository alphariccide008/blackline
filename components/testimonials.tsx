"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  { quote: "LOECHSAR didn't just redesign our brand — they rewired how our entire team thinks about it. The clarity we now have is worth more than the campaign itself.", name: "Oluwaseun Adeyemi", title: "CEO, Vaultix Financial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", rating: 5 },
  { quote: "LO ECHSAR didn't just redesign our brand — they rewired how our entire team thinks about it. The clarity we now have is worth more than the campaign itself.", name: "Oluwaseun Adeyemi", title: "CEO, Vaultix Financial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", rating: 5 },
  { quote: "We launched in three cities simultaneously. LOECHSAR's OOH strategy and campaign system made us look like we had been there for years. Remarkable execution.", name: "Chidinma Okafor", title: "CMO, Nexus Properties", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80", rating: 5 },
  { quote: "The strategy work alone changed our market position. When LOECHSAR says 'precision over noise', they mean it — every decision was intentional.", name: "Emeka Nwosu", title: "Founder, TechForge Nigeria", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", rating: 5 },
  { quote: "The strategy work alone changed our market position. When LO ECHSAR says 'precision over noise', they mean it — every decision was intentional.", name: "Emeka Nwosu", title: "Founder, TechForge Nigeria", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", rating: 5 },
  { quote: "They brought clarity to a brand that had been speaking in too many directions. Three months later, our inbound inquiries doubled without any paid media.", name: "Adunola Bello", title: "MD, Crescent Agro", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", rating: 5 },
  { quote: "LOECHSAR's outdoor activation in Lagos was the most impactful brand moment we've had in seven years. People were talking about it like it was a cultural event.", name: "Babatunde Adegoke", title: "Director, Lagos Cultural Board", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", rating: 5 },
  { quote: "LO ECHSAR's outdoor activation in Lagos was the most impactful brand moment we've had in seven years. People were talking about it like it was a cultural event.", name: "Babatunde Adegoke", title: "Director, Lagos Cultural Board", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", rating: 5 },
]

const ease = [0.16, 1, 0.3, 1] as const

export function Testimonials() {
  const [cur, setCur]         = useState(0)
  const [animating, setAnim]  = useState(false)
  const [dir, setDir]         = useState(1)
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((idx: number) => {
    if (animating) return
    const next = ((idx % testimonials.length) + testimonials.length) % testimonials.length
    setDir(next > cur ? 1 : -1)
    setAnim(true)
    setTimeout(() => {
      setCur(next)
      setAnim(false)
    }, 10)
  }, [animating, cur])

  const next = useCallback(() => goTo(cur + 1), [cur, goTo])
  const prev = useCallback(() => goTo(cur - 1), [cur, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [cur, next])

  const t = testimonials[cur]

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "#111115" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(194,164,109,0.1), transparent)" }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>What Clients Say</span>
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
              </div>
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
            The Evidence<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>Speaks</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cur}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
              style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 w-24 h-[1px]" style={{ background: "linear-gradient(90deg, var(--primary), transparent)" }} />
              <div className="absolute top-0 left-0 h-24 w-[1px]" style={{ background: "linear-gradient(180deg, var(--primary), transparent)" }} />

              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" style={{ color: "var(--primary)" }} />
                ))}
              </div>

              <blockquote className="text-lg md:text-2xl font-bold leading-relaxed mb-10" style={{ color: "rgba(237,237,237,0.88)" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black" style={{ color: "#EDEDED" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(237,237,237,0.48)" }}>{t.title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex items-center justify-between mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          <div className="flex gap-2">
                {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Testimonial ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? "var(--primary)" : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(237,237,237,0.55)" }} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(237,237,237,0.55)" }} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
