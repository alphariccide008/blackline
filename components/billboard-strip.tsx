"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBillboards, type Billboard } from "@/lib/billboards-store"
import { useCart } from "@/lib/cart-context"
import { motion } from "framer-motion"
import { MapPin, Zap, Plus, Check, ArrowRight, Eye } from "lucide-react"

const badgeColors: Record<string, string> = {
  "Top Pick":  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Digital":   "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Premium":   "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Hot Deal":  "bg-red-500/20 text-red-300 border-red-500/30",
  "New":       "bg-green-500/20 text-green-300 border-green-500/30",
  "Available": "bg-white/10 text-white/50 border-white/15",
}

function MiniCard({ b, idx }: { b: Billboard; idx: number }) {
  const { add, remove, has } = useCart()
  const inCart = has(b.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: idx * 0.09 }}
      className="group relative overflow-hidden rounded-2xl flex flex-col"
      style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Image */}
      <Link href={`/billboards/${b.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={b.image}
            alt={b.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColors[b.badge] ?? badgeColors["Available"]}`}>
              {b.badge}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            <Eye className="h-3 w-3 text-white/50" />
            <span className="text-[10px] text-white/50">{b.views} views/mo</span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/billboards/${b.id}`}>
          <h3 className="text-sm font-black text-white mb-1 leading-snug hover:text-white/80 transition-colors">{b.title}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "#4B73D4" }} />
          <span className="text-[11px] text-white/40 truncate">{b.location}</span>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <Zap className="h-3 w-3 flex-shrink-0" style={{ color: "#4B73D4" }} />
          <span className="text-[11px] font-bold" style={{ color: "#4B73D4" }}>{b.impressions} impressions</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => inCart ? remove(b.id) : add(b)}
            className="w-full py-2 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200"
            style={{
              background: inCart ? "rgba(75,115,212,0.12)" : "#082A7B",
              border: inCart ? "1px solid rgba(75,115,212,0.35)" : "1px solid transparent",
              color: "#fff",
            }}
          >
            {inCart ? <><Check className="h-3 w-3" /> Added</> : <><Plus className="h-3 w-3" /> Add to Brief</>}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function BillboardStrip() {
  const [featured, setFeatured] = useState<Billboard[]>([])

  useEffect(() => {
    const all = getBillboards().filter((b) => b.available)
    // Pick 4 diverse featured billboards
    const picks = all.filter((b) => ["Top Pick","Premium","Digital","Hot Deal"].includes(b.badge)).slice(0, 4)
    setFeatured(picks.length >= 4 ? picks : all.slice(0, 4))
  }, [])

  if (featured.length === 0) return null

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#111115" }}>
      {/* Subtle bg glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(8,42,123,0.08) 0%, transparent 70%)" }} />

      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 block" style={{ background: "#082A7B" }} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: "rgba(237,237,237,0.4)" }}>
                Billboard Network
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Premium Outdoor<br /><span style={{ color: "#4B73D4" }}>Locations.</span>
            </h2>
            <p className="mt-4 text-white/45 text-sm leading-relaxed max-w-md">
              Access Nigeria&apos;s most strategically positioned outdoor inventory. No prices — just pure audience reach.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <Link
              href="/billboards"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-black text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#082A7B" }}
            >
              Browse All Locations
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((b, i) => <MiniCard key={b.id} b={b} idx={i} />)}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(8,42,123,0.1)", border: "1px solid rgba(75,115,212,0.15)" }}
        >
          <div>
            <p className="text-sm font-black text-white">Can&apos;t find the right location?</p>
            <p className="text-xs text-white/40 mt-0.5">Our team has access to 200+ unlisted premium sites across Nigeria.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-black border transition-all duration-300 hover:bg-white/10"
            style={{ color: "rgba(237,237,237,0.7)", borderColor: "rgba(255,255,255,0.15)" }}
          >
            Talk to a Strategist
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
