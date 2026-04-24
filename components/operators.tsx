"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const operators = [
  {
    name: "Adaeze Okonkwo",
    discipline: "Brand Strategist",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Emeka Njoku",
    discipline: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chidinma Osei",
    discipline: "Campaign Architect",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Taiwo Adeyemi",
    discipline: "Identity Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Obinna Eze",
    discipline: "Media Planner",
    image:
      "https://images.unsplash.com/photo-1655249481446-25d575f1c054?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ngozi Adesanya",
    discipline: "Growth Operator",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
]

const N = operators.length

function getPos(idx: number, cur: number): string {
  const offset = (idx - cur + N) % N
  if (offset === 0) return "pos-center"
  if (offset === 1) return "pos-right1"
  if (offset === 2) return "pos-right2"
  if (offset === N - 1) return "pos-left1"
  if (offset === N - 2) return "pos-left2"
  return "pos-hidden"
}

export function Operators() {
  const [cur, setCur] = useState(0)
  const [busy, setBusy] = useState(false)
  const [nameVisible, setNameVisible] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (busy) return
      setBusy(true)
      setNameVisible(false)
      setTimeout(() => {
        setCur(((idx % N) + N) % N)
        setNameVisible(true)
      }, 280)
      setTimeout(() => setBusy(false), 800)
    },
    [busy]
  )

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(cur + 1), 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [cur, goTo])

  const resetTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    goTo(idx)
  }

  return (
    <section id="operators" className="py-32 bg-black relative overflow-hidden">

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse at bottom, rgba(8,42,123,0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* OUR TEAM watermark — matches the index.html style */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap font-black uppercase"
        style={{
          fontSize: "clamp(3rem,10vw,7.5rem)",
          letterSpacing: "-0.02em",
          fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
          background: "linear-gradient(to bottom, rgba(8,42,123,0.2) 30%, rgba(255,255,255,0) 76%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        THE OPERATORS
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#082A7B" }}>
              Selected Talent
            </span>
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
          </div>
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight text-white mb-4">
            The Operators
          </h2>
          <p className="text-white/28 text-sm max-w-sm mx-auto leading-relaxed">
            A curated group of specialists behind Blackline systems.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => resetTimer(cur - 1)}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(8,42,123,0.45)",
              border: "1px solid rgba(8,42,123,0.6)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#082A7B")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(8,42,123,0.45)")}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          {/* Carousel wrapper */}
          <div className="carousel-wrap mx-auto">
            <div className="carousel-inner">
              {operators.map((op, idx) => {
                const pos = getPos(idx, cur)
                const isCenter = pos === "pos-center"
                return (
                  <div
                    key={idx}
                    onClick={() => !isCenter && resetTimer(idx)}
                    className={`c-card ${pos}`}
                    style={{
                      background: "linear-gradient(180deg, #0a0a14, #050508)",
                      border: isCenter
                        ? "1px solid rgba(8,42,123,0.45)"
                        : "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* Photo */}
                    <img src={op.image} alt={op.name} />

                    {/* Center overlay */}
                    {isCenter && (
                      <>
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(8,42,123,0.75) 0%, transparent 55%)",
                          }}
                        />
                        <div className="absolute bottom-5 left-5 right-5">
                          <a
                            href="#"
                            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Work
                          </a>
                        </div>
                        {/* Blue corner accent */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: "#082A7B" }} />
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: "#082A7B" }} />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => resetTimer(cur + 1)}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(8,42,123,0.45)",
              border: "1px solid rgba(8,42,123,0.6)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#082A7B")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(8,42,123,0.45)")}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Member info — matches index.html layout */}
        <div className="text-center mt-14">
          <div
            className="transition-all duration-300"
            style={{ opacity: nameVisible ? 1 : 0, transform: nameVisible ? "translateY(0)" : "translateY(8px)" }}
          >
            <div className="flex items-center justify-center gap-6 mb-1">
              <div className="w-20 h-px" style={{ background: "#082A7B" }} />
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {operators[cur].name}
              </h3>
              <div className="w-20 h-px" style={{ background: "#082A7B" }} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mt-2">
              {operators[cur].discipline}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {operators.map((_, idx) => (
            <button
              key={idx}
              onClick={() => resetTimer(idx)}
              aria-label={`Go to operator ${idx + 1}`}
              className="rounded-full transition-all duration-400"
              style={{
                width: idx === cur ? 28 : 8,
                height: 8,
                background: idx === cur ? "#082A7B" : "rgba(8,42,123,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
