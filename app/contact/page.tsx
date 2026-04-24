import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  return (
    <main style={{ background: "#0A0A0C" }} className="min-h-screen">
      <Header />

      <section className="relative pt-40 pb-16 overflow-hidden" style={{ background: "#0A0A0C" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8,42,123,0.14), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Contact</span>
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-none mb-6" style={{ color: "#EDEDED" }}>
            Let&apos;s Build<br /><span style={{ color: "#4B73D4" }}>Together.</span>
          </h1>
          <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(237,237,237,0.58)" }}>
            Start a brief, ask a question, or simply reach out. The BLACKLINE team is ready.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}
