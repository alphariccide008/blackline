import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Clock, ArrowUpRight } from "lucide-react"

const posts = [
  { slug: "why-brand-strategy-must-precede-identity", category: "Brand Strategy",    title: "Why Strategy Must Always Precede Identity",          excerpt: "The most common brand mistake isn't a bad logo. It's a good logo on a poorly defined brand. Before you design anything, define everything.",                                          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", readTime: "6 min read", date: "Apr 12, 2026", featured: true },
  { slug: "ooh-advertising-in-africa-what-works",      category: "Outdoor Advertising", title: "OOH Advertising in Africa: What Actually Works",   excerpt: "Billboards are not just large posters. The geometry of attention, placement, and timing determines whether OOH is investment or waste.",                                          image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80", readTime: "8 min read", date: "Mar 28, 2026", featured: false },
  { slug: "the-integrated-brand-system",               category: "Identity Systems",    title: "The Integrated Brand System: Why Seven Disciplines", excerpt: "BLACKLINE runs seven disciplines because brand is not one thing. It is a system. Each discipline reinforces the others — or it weakens them.",                                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", readTime: "5 min read", date: "Feb 14, 2026", featured: false },
  { slug: "corporate-training-for-brand-consistency",  category: "Corporate Training",  title: "Why Your Team Is Your Brand's Biggest Risk",       excerpt: "Brand guidelines mean nothing if the people who execute them don't understand them. The internal brand is as important as the external one.",                                      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", readTime: "4 min read", date: "Jan 30, 2026", featured: false },
  { slug: "market-research-before-launch",             category: "Market Research",     title: "The Research You Skip Is The Launch You Regret",   excerpt: "Every brand assumption costs money to test in market. The brands that research first spend less, learn faster, and grow more predictably.",                                         image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", readTime: "7 min read", date: "Jan 10, 2026", featured: false },
  { slug: "event-design-brand-experience",             category: "Event Design",        title: "How Events Become Brand Moments",                  excerpt: "A well-designed brand event creates more loyalty than a year of advertising. The key is designing for memory — not just attendance.",                                                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", readTime: "5 min read", date: "Dec 18, 2025", featured: false },
]

const featured = posts.find((p) => p.featured)!
const rest     = posts.filter((p) => !p.featured)

export default function BlogPage() {
  return (
    <main style={{ background: "#0A0A0C" }} className="min-h-screen">
      <Header />

      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#0A0A0C" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(194,164,109,0.14), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Insights</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-none mb-8" style={{ color: "#EDEDED" }}>
              Ideas That<br /><span style={{ color: "var(--primary)" }}>Shape Practice.</span>
          </h1>
        </div>
      </section>

      <section className="pb-24" style={{ background: "#111115" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Featured */}
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden mb-8 hover:shadow-2xl transition-all" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
              <span className="absolute top-5 left-5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: "var(--primary)", color: "rgba(255,255,255,0.92)" }}>
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>{featured.category}</span>
              <h2 className="text-2xl md:text-3xl font-black mb-4 leading-snug" style={{ color: "#EDEDED" }}>{featured.title}</h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(237,237,237,0.52)" }}>{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(237,237,237,0.35)" }}>
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--primary)" }}>
                  Read Article <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: "var(--primary)", color: "rgba(255,255,255,0.92)" }}>
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-black mb-3 leading-snug line-clamp-2" style={{ color: "#EDEDED" }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed flex-1 mb-5 line-clamp-3" style={{ color: "rgba(237,237,237,0.5)" }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(237,237,237,0.35)" }}>
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <span className="text-[10px]" style={{ color: "rgba(237,237,237,0.35)" }}>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
