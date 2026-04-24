"use client"

import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { motion } from "framer-motion"

const posts = [
  { slug: "why-brand-strategy-must-precede-identity", category: "Brand Strategy",    title: "Why Strategy Must Always Precede Identity",        excerpt: "The most common brand mistake isn't a bad logo. It's a good logo on a poorly defined brand. Before you design anything, define everything.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", readTime: "6 min read", date: "Apr 2026" },
  { slug: "ooh-advertising-in-africa-what-works",      category: "Outdoor Advertising", title: "OOH Advertising in Africa: What Actually Works", excerpt: "Billboards are not just large posters. The geometry of attention, placement, and timing determines whether OOH is investment or waste.", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80", readTime: "8 min read", date: "Mar 2026" },
  { slug: "the-integrated-brand-system",               category: "Identity Systems",  title: "The Integrated Brand System: Why Seven Disciplines", excerpt: "BLACKLINE runs seven disciplines because brand is not one thing. It is a system. Each discipline reinforces the others — or it weakens them.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", readTime: "5 min read", date: "Feb 2026" },
]

export function BlogSection() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "#0A0A0C" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#082A7B" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "#4B73D4" }}>Insights</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
              Ideas That<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>Shape Practice</span>
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition self-end" style={{ color: "#4B73D4" }}>
            All Articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 60, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 240, damping: 22, delay: i * 0.12 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full"
                style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }} />
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: "#082A7B", color: "rgba(255,255,255,0.92)" }}>
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-black mb-3 leading-snug line-clamp-2" style={{ color: "#EDEDED" }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed flex-1 mb-6 line-clamp-3" style={{ color: "rgba(237,237,237,0.5)" }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(237,237,237,0.38)" }}>
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <span className="text-[10px]" style={{ color: "rgba(237,237,237,0.38)" }}>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
