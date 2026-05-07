"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  { title: "Zenith Bank Rebrand",        category: "Identity Systems",      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", tags: ["Brand Identity", "Campaign"] },
  { title: "MTN 5G Launch",              category: "Campaign Development",  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", tags: ["OOH", "Digital"] },
  { title: "Flutterwave Activation",     category: "Geographic Activation", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", tags: ["Strategy", "Media"] },
  { title: "Dangote Cement — Pan-Africa",category: "Brand Strategy",        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", tags: ["Strategy", "Outdoor"] },
  { title: "Paystack Growth System",     category: "Market Research",       image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", tags: ["Research", "Identity"] },
]

export function FeaturedWork() {
  return (
    <section className="py-32 relative" style={{ background: "#0A0A0C" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header — slides in from right */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Featured Work</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
              Projects That<br /><span style={{ color: "rgba(237,237,237,0.38)" }}>Moved Markets</span>
            </h2>
          </div>
          <Link href="/projects" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-80 self-end" style={{ color: "var(--primary)" }}>
            View All Work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Large card — dramatic slide up */}
          <motion.div
            className="md:col-span-7 group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ height: 420 }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <img src={projects[0].image} alt={projects[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(194,164,109,0.15)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                {projects[0].tags.map((t) => (
                  <span key={t} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: "rgba(194,164,109,0.95)", color: "rgba(255,255,255,0.92)" }}>{t}</span>
                ))}
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{projects[0].category}</p>
              <h3 className="text-xl font-black text-white">{projects[0].title}</h3>
            </div>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0" style={{ background: "var(--primary)" }}>
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          </motion.div>

          {/* Two small right cards — pop in with spring */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {projects.slice(1, 3).map((p, i) => (
              <motion.div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl cursor-pointer flex-1"
                style={{ minHeight: 196 }}
                initial={{ opacity: 0, scale: 0.88, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 + i * 0.12 }}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(194,164,109,0.15)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[8px] uppercase tracking-[0.25em] mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{p.category}</p>
                  <h3 className="text-base font-black text-white">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom two cards — pop up with bounce */}
          {projects.slice(3, 5).map((p, i) => (
            <motion.div
              key={p.title}
              className="md:col-span-6 group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ height: 280 }}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.14 }}
            >
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(194,164,109,0.15)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: "rgba(194,164,109,0.95)", color: "rgba(255,255,255,0.92)" }}>{t}</span>
                  ))}
                </div>
                <p className="text-[8px] uppercase tracking-[0.25em] mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{p.category}</p>
                <h3 className="text-lg font-black text-white">{p.title}</h3>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0" style={{ background: "var(--primary)" }}>
                <ArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
