"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBillboards, type Billboard } from "@/lib/billboards-store"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Search, Plus, Check,
  Zap, Eye, ChevronRight, X,
} from "lucide-react"

const TYPES = ["All Types", "Unipole / Monopole", "LED Digital Screen", "Gantry / Bridge", "Wall Drape / Wrap", "Rooftop Billboard", "Transit / Bus Shelter", "Airport Advertising", "Mall / Indoor"]
const STATES = ["All States", "Lagos", "FCT - Abuja", "Rivers", "Kano", "Edo", "Cross River", "Anambra"]

const badgeColors: Record<string, string> = {
  "Top Pick":  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Digital":   "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Premium":   "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Hot Deal":  "bg-red-500/20 text-red-300 border-red-500/30",
  "New":       "bg-green-500/20 text-green-300 border-green-500/30",
  "Available": "bg-white/10 text-white/50 border-white/15",
}

function BillboardCard({ b, idx }: { b: Billboard; idx: number }) {
  const { add, remove, has } = useCart()
  const inCart = has(b.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: idx * 0.06 }}
      className="group relative overflow-hidden rounded-2xl flex flex-col"
      style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Clickable image → detail page */}
      <Link href={`/billboards/${b.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={b.image}
            alt={b.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColors[b.badge] ?? badgeColors["Available"]}`}>
              {b.badge}
            </span>
          </div>

          {/* Illuminated dot */}
          {b.illuminated && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[9px] text-white/70 font-semibold">24hr Lit</span>
            </div>
          )}

          {/* Views overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <Eye className="h-3 w-3 text-white/60" />
            <span className="text-xs text-white/60 font-medium">{b.views} monthly views</span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/billboards/${b.id}`} className="group/title">
          <h3 className="text-sm font-black text-white mb-1 leading-snug group-hover/title:text-white/80 transition-colors">{b.title}</h3>
        </Link>
          <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
          <span className="text-xs text-white/45 truncate">{b.location}</span>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[b.type, b.size, b.facing].map((spec) => (
            <span key={spec} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(237,237,237,0.45)" }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Impressions */}
        <div className="flex items-center gap-1.5 mb-5">
          <Zap className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
          <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{b.impressions} impressions</span>
        </div>

        {/* Add to brief button */}
        <div className="mt-auto">
          <button
            onClick={() => inCart ? remove(b.id) : add(b)}
            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
              inCart
                ? "text-white"
                : "text-white hover:opacity-90"
            }`}
            style={{
              background: inCart ? "rgba(194,164,109,0.15)" : "var(--primary)",
              border: inCart ? "1px solid rgba(194,164,109,0.4)" : "1px solid transparent",
            }}
          >
            {inCart ? <><Check className="h-3.5 w-3.5" /> Added to Brief</> : <><Plus className="h-3.5 w-3.5" /> Add to Brief</>}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function BillboardsPage() {
  const { items } = useCart()
  const [billboards, setBillboards] = useState<Billboard[]>([])
  const [search,  setSearch]  = useState("")
  const [selType, setType]    = useState("All Types")
  const [selState, setState]  = useState("All States")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => { setBillboards(getBillboards()) }, [])

  const filtered = useMemo(() => {
    return billboards.filter((b) => {
      if (!b.available) return false
      if (selType  !== "All Types"  && b.type  !== selType)  return false
      if (selState !== "All States" && b.state !== selState) return false
      if (search) {
        const q = search.toLowerCase()
        return b.title.toLowerCase().includes(q) || b.location.toLowerCase().includes(q)
      }
      return true
    })
  }, [billboards, selType, selState, search])

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <Header />

      {/* Page hero */}
      <section className="pt-36 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 block" style={{ background: "var(--primary)" }} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: "rgba(237,237,237,0.4)" }}>
                Billboard Network
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Find Your<br /><span style={{ color: "var(--primary)" }}>Perfect Spot.</span>
            </h1>
            <p className="text-white/50 max-w-lg text-base leading-relaxed">
              Browse our premium outdoor inventory across Nigeria. Add billboards to your brief and our team will reach out with availability and strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 z-30 py-4" style={{ background: "rgba(10,10,12,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Type filter */}
            <select
              value={selType}
              onChange={(e) => setType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 outline-none focus:border-white/25 transition-colors cursor-pointer"
              style={{ minWidth: 180 }}
            >
              {TYPES.map((t) => <option key={t} value={t} style={{ background: "#17171C" }}>{t}</option>)}
            </select>

            {/* State filter */}
            <select
              value={selState}
              onChange={(e) => setState(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 outline-none focus:border-white/25 transition-colors cursor-pointer"
              style={{ minWidth: 160 }}
            >
              {STATES.map((s) => <option key={s} value={s} style={{ background: "#17171C" }}>{s}</option>)}
            </select>
          </div>

          {/* Active filters summary */}
          {(search || selType !== "All Types" || selState !== "All States") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[11px] text-white/30 font-semibold">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
              {search && (
                <button onClick={() => setSearch("")} className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ color: "var(--primary)", borderColor: "rgba(194,164,109,0.3)" }}>
                  "{search}" <X className="h-2.5 w-2.5" />
                </button>
              )}
              {selType !== "All Types" && (
                <button onClick={() => setType("All Types")} className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ color: "var(--primary)", borderColor: "rgba(194,164,109,0.3)" }}>
                  {selType} <X className="h-2.5 w-2.5" />
                </button>
              )}
              {selState !== "All States" && (
                <button onClick={() => setState("All States")} className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ color: "var(--primary)", borderColor: "rgba(194,164,109,0.3)" }}>
                  {selState} <X className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <MapPin className="h-10 w-10 mx-auto mb-4 text-white/20" />
              <p className="text-white/30 text-sm font-semibold">No billboards match your filters</p>
              <button onClick={() => { setSearch(""); setType("All Types"); setState("All States") }} className="mt-4 text-sm font-bold" style={{ color: "var(--primary)" }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((b, i) => <BillboardCard key={b.id} b={b} idx={i} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
