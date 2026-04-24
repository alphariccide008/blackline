"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=85&auto=format&fit=crop",
    label: "Brand Strategy",
    headline: ["Precision", "Over Noise."],
    sub: "We build brands that cut through clutter — with strategy, identity, and activation that moves people to act.",
    cta: { label: "See Our Work", href: "/projects" },
    cta2: { label: "Build a Brief", href: "/#brief" },
  },
  {
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&q=85&auto=format&fit=crop",
    label: "Identity Systems",
    headline: ["Built to Be", "Remembered."],
    sub: "From visual identity to full campaign systems, we engineer brands that earn attention and hold it.",
    cta: { label: "Our Services", href: "/services" },
    cta2: { label: "Meet the Team", href: "/about" },
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85&auto=format&fit=crop",
    label: "Growth Activation",
    headline: ["Your Brand.", "Every Place."],
    sub: "Outdoor, digital, experiential — BLACKLINE activates brands where audiences live, move, and decide.",
    cta: { label: "Start a Project", href: "/contact" },
    cta2: { label: "View Work", href: "/projects" },
  },
]

const stats = [
  { value: "100+",  label: "Brands Built" },
  { value: "7",     label: "Disciplines" },
  { value: "12+",   label: "Years Active" },
  { value: "500M+", label: "Audience Reach" },
]

export function Hero() {
  const [cur, setCur]        = useState(0)
  const [prev, setPrev]      = useState<number | null>(null)
  const [animating, setAnim] = useState(false)
  const timerRef             = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((idx: number) => {
    if (animating) return
    const next = ((idx % slides.length) + slides.length) % slides.length
    setAnim(true)
    setPrev(cur)
    setCur(next)
    setTimeout(() => { setPrev(null); setAnim(false) }, 800)
  }, [animating, cur])

  const next = useCallback(() => goTo(cur + 1), [cur, goTo])
  const back = useCallback(() => goTo(cur - 1), [cur, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [cur, next])

  const s = slides[cur]

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 780 }}>

      {/* ── Slide images ── */}
      {slides.map((sl, i) => (
        <div
          key={i}
          className="absolute inset-0 will-change-transform"
          style={{
            zIndex: i === cur ? 2 : i === prev ? 1 : 0,
            opacity: i === cur ? 1 : i === prev ? 1 : 0,
            transition: i === cur ? "opacity 0.8s ease" : "none",
          }}
        >
          <img
            src={sl.image}
            alt=""
            className="w-full h-full object-cover"
            style={{
              animation: i === cur ? "ken-burns 8s ease-in-out forwards" : "none",
              transform: "scale(1)",
            }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(8,6,4,0.80) 0%, rgba(8,6,4,0.52) 55%, rgba(8,6,4,0.18) 100%)" }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,6,4,0.70) 0%, transparent 42%)" }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(8,6,4,0.40) 0%, transparent 22%)" }} />

      {/* ── Slide content — vertically centred between navbar and stats strip ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-center"
        style={{ paddingTop: 96, paddingBottom: 160 }}
      >
        <div className="container-wide">
          <div className="max-w-3xl">

            {/* Label */}
            <div
              key={`label-${cur}`}
              className="flex items-center gap-3 mb-7"
              style={{ animation: "fade-in-up 0.6s ease-out forwards", opacity: 0 }}
            >
              <span className="h-px w-10 block flex-shrink-0" style={{ background: "#082A7B" }} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>
                {s.label}
              </span>
            </div>

            {/* Headline
                — two lines, fixed minHeight guarantees identical block height for all slides
                — font clamped to prevent wrapping at mid-range viewports              */}
            <div key={`h-${cur}`} style={{ minHeight: "clamp(8.5rem, 14vw, 13rem)" }}>
              {s.headline.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <h1
                    className="block font-black text-white leading-[0.92] tracking-tight whitespace-nowrap"
                    style={{
                      fontSize: "clamp(2.8rem, 5.6vw, 5.8rem)",
                      animation: `fade-in-up 0.7s ease-out ${0.08 + i * 0.1}s forwards`,
                      opacity: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {line}
                  </h1>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <p
              key={`sub-${cur}`}
              className="text-base md:text-lg leading-relaxed mt-7 mb-10 max-w-xl"
              style={{
                color: "rgba(255,255,255,0.72)",
                animation: "fade-in-up 0.7s ease-out 0.28s forwards",
                opacity: 0,
              }}
            >
              {s.sub}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${cur}`}
              className="flex flex-wrap gap-4"
              style={{ animation: "fade-in-up 0.7s ease-out 0.38s forwards", opacity: 0 }}
            >
              <Link
                href={s.cta.href}
                className="group flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-black text-white transition-all duration-300 hover:opacity-90 hover:shadow-2xl hover:-translate-y-0.5"
                style={{ background: "#082A7B" }}
              >
                {s.cta.label}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={s.cta2.href}
                className="px-8 py-3.5 rounded-full text-sm font-black text-white border transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                {s.cta2.label}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows — on mobile sit at ~35% so they clear the text block ── */}
      <button
        onClick={back}
        className="absolute left-5 top-[35%] md:top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-[35%] md:top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-28 right-8 z-30 font-mono text-xs tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.45)" }}>
        {String(cur + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Stats strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{ background: "rgba(8,6,4,0.78)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {stats.map((st) => (
              <div key={st.label} className="flex flex-col items-center py-5 px-4">
                <span className="text-2xl md:text-3xl font-black leading-none" style={{ color: "#4B73D4" }}>
                  {st.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] mt-1.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
