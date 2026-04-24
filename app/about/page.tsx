import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Operators } from "@/components/operators"

const values = [
  { num: "01", title: "Precision",   desc: "Every decision is intentional. We eliminate what doesn't serve the brand and build what does — nothing more." },
  { num: "02", title: "Integration", desc: "Strategy, identity, and activation are not separate services. They are one system, operating together." },
  { num: "03", title: "Evidence",    desc: "We measure outcomes, not effort. Our work is evaluated by what it produces in the market." },
  { num: "04", title: "Longevity",   desc: "We build brands that endure. Not campaigns that expire. The BLACKLINE system is built to compound over time." },
]

export default function AboutPage() {
  return (
    <main style={{ background: "#0A0A0C" }} className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ background: "#0A0A0C" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(8,42,123,0.14), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>About BLACKLINE</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-none mb-8" style={{ color: "#EDEDED" }}>
            We Build<br />Brands That<br /><span style={{ color: "#4B73D4" }}>Move Markets.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "rgba(237,237,237,0.58)" }}>
            BLACKLINE is a full-spectrum brand and growth company. We operate at the intersection of strategy, identity, and culture — building systems that make brands undeniable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24" style={{ background: "#111115" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px" style={{ background: "#082A7B" }} />
                <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ color: "#EDEDED" }}>Precision Over Noise.</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(237,237,237,0.58)" }}>
                The market is saturated with brands that say everything and mean nothing. BLACKLINE exists to change that — for the brands we work with, and for the standard of brand work on the continent.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(237,237,237,0.58)" }}>
                Our methodology is not modular. It is unified. Strategy informs identity. Identity shapes campaigns. Campaigns build experience. Experience creates loyalty. When all four stages are executed correctly, brands don&apos;t just grow — they lead.
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 420 }}>
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="BLACKLINE team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                {[{ v: "100+", l: "Brands" }, { v: "12+", l: "Years" }, { v: "7", l: "Disciplines" }].map((s) => (
                  <div key={s.l} className="text-center py-4 rounded-xl" style={{ background: "rgba(10,10,12,0.88)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-xl font-black" style={{ color: "#4B73D4" }}>{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(237,237,237,0.45)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: "#0A0A0C" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#082A7B" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Our Values</span>
              <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            </div>
            <h2 className="text-4xl font-black" style={{ color: "#EDEDED" }}>What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.num} className="p-8 rounded-2xl" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-[10px] font-black tracking-widest mb-4" style={{ color: "#4B73D4" }}>{v.num}</div>
                <h3 className="text-2xl font-black mb-4" style={{ color: "#EDEDED" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(237,237,237,0.55)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Operators />

      {/* CTA */}
      <section className="py-24" style={{ background: "#0A0A0C" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#EDEDED" }}>Work With BLACKLINE</h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(237,237,237,0.55)" }}>
            If you are building a brand that needs to win — not just exist — let&apos;s start with a brief.
          </p>
          <a href="/#brief" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black text-white hover:opacity-85 transition-all" style={{ background: "#082A7B" }}>
            Build a Brief →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
