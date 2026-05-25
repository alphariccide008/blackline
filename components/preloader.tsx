"use client"

import { useEffect, useRef, useState } from "react"

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState<"loading" | "exit" | "done">("loading")
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null)

  // Tick progress forward
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 14 + 6, 100))
    }, 55)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  // When progress hits 100, trigger exit
  useEffect(() => {
    if (progress < 100) return
    if (timerRef.current) clearInterval(timerRef.current)
    const t1 = setTimeout(() => setPhase("exit"), 120)
    const t2 = setTimeout(() => setPhase("done"), 820)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [progress])

  if (phase === "done") return null

  const pct = Math.min(Math.round(progress), 100)

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: "#080604",
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "exit" ? "transform 0.68s cubic-bezier(0.76,0,0.24,1)" : "none",
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-10 h-10" style={{ borderTop: "1px solid rgba(194,164,109,0.55)", borderLeft: "1px solid rgba(194,164,109,0.55)" }} />
      <div className="absolute top-8 right-8 w-10 h-10" style={{ borderTop: "1px solid rgba(194,164,109,0.55)", borderRight: "1px solid rgba(194,164,109,0.55)" }} />
      <div className="absolute bottom-8 left-8 w-10 h-10" style={{ borderBottom: "1px solid rgba(194,164,109,0.55)", borderLeft: "1px solid rgba(194,164,109,0.55)" }} />
      <div className="absolute bottom-8 right-8 w-10 h-10" style={{ borderBottom: "1px solid rgba(194,164,109,0.55)", borderRight: "1px solid rgba(194,164,109,0.55)" }} />

      {/* Scan line that travels as progress increases */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: `${pct}%`,
          background: "linear-gradient(90deg, transparent 0%, rgba(194,164,109,0.18) 20%, rgba(194,164,109,0.95) 50%, rgba(194,164,109,0.18) 80%, transparent 100%)",
            boxShadow: "0 0 10px rgba(194,164,109,0.45)",
          transition: "top 0.06s linear",
        }}
      />

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        {/* Logo — stroke-draw via CSS class defined in globals.css */}
          <div className="mb-10" style={{ animation: "pl-fade-in 0.5s ease both" }}>
          <img src="/logo.PNG" alt="Loechsar" width={78} height={78} className="w-40 h-40 object-contain" />
        </div>

        {/* Wordmark */}
        <div
          className="font-black text-white mb-1.5"
          style={{
            fontSize: "clamp(1.7rem, 5vw, 2.8rem)",
            letterSpacing: "0.16em",
            animation: "pl-slide-up 0.65s ease 0.25s both",
          }}
        >
          LO <span style={{ color: "var(--primary)" }}>ECHSAR</span>
        </div>

        {/* Tagline */}
        <div
          className="uppercase font-medium mb-12"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.44em",
            color: "rgba(255,255,255,0.22)",
            animation: "pl-slide-up 0.65s ease 0.4s both",
          }}
        >
          Precision Over Noise
        </div>

        {/* Progress bar + counter */}
        <div style={{ animation: "pl-fade-in 0.5s ease 0.3s both", width: "clamp(150px,18vw,210px)" }}>
          <div className="w-full rounded-full overflow-hidden mb-2" style={{ height: 1, background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #ECD9B8, var(--primary))",
                transition: "width 0.08s linear",
                boxShadow: "0 0 8px rgba(194,164,109,0.45)",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span style={{ fontSize: "0.52rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.18)", fontFamily: "monospace", textTransform: "uppercase" }}>
              Loading
            </span>
            <span style={{ fontSize: "0.58rem", color: "var(--primary)", fontFamily: "monospace", fontWeight: 700 }}>
              {pct}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom progress line */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--primary), #ECD9B8)",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  )
}
