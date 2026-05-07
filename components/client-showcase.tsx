"use client"

const clients = [
  "Dangote Group", "GTBank", "MTN Nigeria", "Zenith Bank",
  "Flutterwave", "Paystack", "Access Bank", "Interswitch",
  "Stanbic IBTC", "UBA", "Lafarge Africa", "Airtel Nigeria",
  "NNPC", "Sterling Bank", "Cowrywise", "PiggyVest",
]

export function ClientShowcase() {
  const doubled = [...clients, ...clients]

  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#111115", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center gap-4">
        <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
        <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Trusted By</span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111115, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111115, transparent)" }} />

        <div className="flex animate-scroll-infinite pause-animation whitespace-nowrap gap-0" style={{ width: "max-content" }}>
          {doubled.map((name, i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(194,164,109,0.5)" }} />
              <span className="text-sm font-bold tracking-wide whitespace-nowrap" style={{ color: "rgba(237,237,237,0.45)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
