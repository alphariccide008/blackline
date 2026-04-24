import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lightbulb, Palette, Megaphone, Monitor, Calendar, GraduationCap, BarChart2 } from "lucide-react"

const services = [
  { id: "strategy",  Icon: Lightbulb,     title: "Brand Strategy",           tagline: "Define before you design.",        desc: "We build the architecture of how brands win. From positioning to competitive mapping, our strategy work ensures every downstream decision is anchored in a clear, defensible brand logic.", deliverables: ["Brand positioning framework","Competitive landscape audit","Audience segmentation","Messaging architecture","Brand naming & narrative"], image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" },
  { id: "identity",  Icon: Palette,       title: "Identity Systems",          tagline: "Built to be unmistakable.",        desc: "Visual language that does not just look good — it communicates with precision. We build identity systems that hold across every surface, touchpoint, and environment.", deliverables: ["Logo & brand mark","Color, type & grid systems","Brand guidelines document","Packaging & collateral design","Digital identity standards"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { id: "campaigns", Icon: Megaphone,     title: "Campaign Development",      tagline: "Ideas that earn attention.",       desc: "End-to-end campaign concepting, production, and execution across every relevant channel — built around a single sharp idea that travels.", deliverables: ["Campaign concept & creative direction","Multi-channel content production","Media planning & buying support","Performance tracking & optimization","Post-campaign analysis"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { id: "outdoor",   Icon: Monitor,       title: "Outdoor Advertising",       tagline: "Precision OOH placement.",         desc: "We plan and execute billboard, lamppost, transit, and ambient media campaigns with surgical placement logic — putting brands where audiences actually look.", deliverables: ["OOH strategy & site selection","Billboard design & production","Lamppost & transit formats","Ambient & guerrilla media","Location analytics & reporting"], image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80" },
  { id: "events",    Icon: Calendar,      title: "Event & Experience Design",  tagline: "Moments that become memory.",     desc: "We design brand environments that people talk about. From experiential activations to corporate events, we create moments that earn cultural conversation.", deliverables: ["Experience concept & design","Event production management","Brand environment design","Launch activation strategy","Experiential content creation"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
  { id: "training",  Icon: GraduationCap, title: "Corporate Training",         tagline: "Brand from the inside out.",      desc: "The people who carry a brand are as important as the brand itself. Our training programs equip teams to understand, communicate, and protect the brand at every level.", deliverables: ["Brand internalization workshops","Communication style guides","Leadership brand coaching","Team brand immersion programs","Brand governance frameworks"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
  { id: "research",  Icon: BarChart2,     title: "Market Research",            tagline: "Intelligence before investment.", desc: "We design and execute primary and secondary research that informs strategy before a single dollar is committed to execution.", deliverables: ["Competitive intelligence reports","Consumer insight studies","Perception & awareness audits","Market sizing & opportunity mapping","Trend analysis & category reports"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
]

export default function ServicesPage() {
  return (
    <main style={{ background: "#0A0A0C" }} className="min-h-screen">
      <Header />

      <section className="relative pt-40 pb-24 overflow-hidden" style={{ background: "#0A0A0C" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8,42,123,0.14), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#082A7B" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Services</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-none mb-8" style={{ color: "#EDEDED" }}>
            Seven Disciplines.<br /><span style={{ color: "#4B73D4" }}>One System.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "rgba(237,237,237,0.58)" }}>
            Every service BLACKLINE offers compounds with the others. None compete — all connect.
          </p>
        </div>
      </section>

      <section className="py-8" style={{ background: "#111115" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-5">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#17171C" }}>
              <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ minHeight: 320 }}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
                <div className="absolute top-5 left-5 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#082A7B" }}>
                  <s.Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="text-[9px] font-black uppercase tracking-[0.35em] mb-4" style={{ color: "#4B73D4" }}>{s.tagline}</div>
                <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: "#EDEDED" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(237,237,237,0.58)" }}>{s.desc}</p>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(237,237,237,0.32)" }}>What&apos;s included</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm" style={{ color: "rgba(237,237,237,0.65)" }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4B73D4" }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24" style={{ background: "#0A0A0C" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6" style={{ color: "#EDEDED" }}>Ready to Build?</h2>
          <p className="text-sm mb-10 max-w-lg mx-auto" style={{ color: "rgba(237,237,237,0.55)" }}>Start with a brief. We&apos;ll scope it precisely and recommend the disciplines that apply.</p>
          <a href="/#brief" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black text-white hover:opacity-85 transition-all" style={{ background: "#082A7B" }}>
            Build a Brief →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
