import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const projects = [
  { title: "Zenith Bank Rebrand",     category: "Identity Systems",      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", year: "2025", tags: ["Identity", "Campaign"] },
  { title: "MTN 5G National Launch",  category: "Campaign Development",  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", year: "2026", tags: ["OOH", "TV", "Digital"] },
  { title: "Flutterwave Activation",  category: "Geographic Activation", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", year: "2025", tags: ["Strategy", "Media"] },
  { title: "Dangote — Pan-Africa",    category: "Brand Strategy",        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", year: "2026", tags: ["Strategy", "OOH"] },
  { title: "Paystack Growth System",  category: "Market Research",       image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", year: "2025", tags: ["Research", "Identity"] },
  { title: "GTBank Identity Refresh", category: "Identity Systems",      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", year: "2026", tags: ["Identity", "Brand"] },
  { title: "Airtel Nigeria Relaunch", category: "Campaign Development",  image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80", year: "2025", tags: ["OOH", "Social"] },
  { title: "NNPC Brand Activation",   category: "Event & Experience",    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", year: "2026", tags: ["Events", "OOH"] },
  { title: "Stanbic Team Training",   category: "Corporate Training",    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", year: "2025", tags: ["Training"] },
]

export default function ProjectsPage() {
  return (
    <main style={{ background: "#0A0A0C" }} className="min-h-screen">
      <Header />

      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#0A0A0C" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(194,164,109,0.12), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Our Work</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-none mb-8" style={{ color: "#EDEDED" }}>
            Projects That<br /><span style={{ color: "var(--primary)" }}>Moved Markets.</span>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(237,237,237,0.58)" }}>
            A record of brands we have built, positioned, and activated across Africa and beyond.
          </p>
        </div>
      </section>

      <section className="pb-24" style={{ background: "#111115" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.title} className="group relative overflow-hidden rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="relative h-60 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(194,164,109,0.12)" }} />
                  <span className="absolute top-4 right-4 text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{p.year}</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: "rgba(194,164,109,0.12)", color: "var(--primary)" }}>{t}</span>
                    ))}
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.25em] mb-2" style={{ color: "rgba(237,237,237,0.35)" }}>{p.category}</p>
                  <h3 className="text-lg font-black" style={{ color: "#EDEDED" }}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0A0A0C" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6" style={{ color: "#EDEDED" }}>Start Your Project</h2>
          <p className="text-sm mb-10" style={{ color: "rgba(237,237,237,0.55)" }}>Ready to add your brand to this record?</p>
          <a href="/#brief" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black text-white hover:opacity-85 transition-all" style={{ background: "var(--primary)" }}>
            Build a Brief →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
