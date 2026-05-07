"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBillboards, type Billboard } from "@/lib/billboards-store"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, ArrowLeft, Eye, Zap, CheckCircle2,
  Plus, Check, ChevronRight, ShoppingBag, LayoutGrid,
  Maximize2, Navigation,
} from "lucide-react"

const trafficMap: Record<string, string> = {
  "Unipole / Monopole":    "Very High",
  "LED Digital Screen":    "High",
  "Gantry / Bridge":       "Very High",
  "Wall Drape / Wrap":     "High",
  "Rooftop Billboard":     "Moderate–High",
  "Transit / Bus Shelter": "High",
  "Airport Advertising":   "Very High",
  "Mall / Indoor":         "High",
}

const bestForMap: Record<string, string[]> = {
  "Unipole / Monopole":    ["Telecoms", "FMCG brands", "Finance & banking", "Auto/motors"],
  "LED Digital Screen":    ["Tech & fintech", "Entertainment", "Fashion", "E-commerce"],
  "Gantry / Bridge":       ["Mass-market brands", "Government", "FMCG", "Telecoms"],
  "Wall Drape / Wrap":     ["Real estate", "Luxury brands", "Corporate identity", "Events"],
  "Rooftop Billboard":     ["Industrial brands", "B2B", "Insurance", "Logistics"],
  "Transit / Bus Shelter": ["Retail", "QSR / food", "Healthcare", "Education"],
  "Airport Advertising":   ["Luxury", "Travel", "Finance", "International brands"],
  "Mall / Indoor":         ["Fashion", "Beauty & FMCG", "Food & beverage", "Tech"],
}

export default function BillboardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { add, remove, has, items } = useCart()
  const [board, setBoard] = useState<Billboard | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const inCart = board ? has(board.id) : false

  useEffect(() => {
    const all = getBillboards()
    const found = all.find((b) => b.id === Number(id))
    if (!found) { router.replace("/billboards"); return }
    setBoard(found)
  }, [id, router])

  if (!board) return null

  const traffic  = trafficMap[board.type]  ?? "High"
  const bestFor  = bestForMap[board.type]  ?? ["All major brands"]

  // Two images: main + environment shot (reuse image with different crop)
  const images = [
    board.image,
    board.image.replace("w=800", "w=600").replace("q=80", "q=70"),
  ]

  const specs = [
    { label: "Type",        value: board.type },
    { label: "Size",        value: board.size },
    { label: "Facing",      value: board.facing },
    { label: "State",       value: board.state },
    { label: "Daily Views", value: board.impressions },
    { label: "Traffic",     value: traffic },
    { label: "Monthly Reach", value: `${board.views} views` },
    { label: "Illuminated", value: board.illuminated ? "Yes — 24hr" : "No" },
  ]

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <Header />

      {/* Breadcrumb */}
      <div className="pt-20 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,10,12,0.8)" }}>
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(237,237,237,0.3)" }}>
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/billboards" className="hover:text-white/60 transition-colors">Billboards</Link>
            <span>/</span>
            <span className="truncate max-w-[200px]" style={{ color: "rgba(237,237,237,0.6)" }}>{board.title}</span>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="container-wide">

          {/* Back */}
          <Link
            href="/billboards"
            className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-opacity hover:opacity-70"
            style={{ color: "rgba(237,237,237,0.4)" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Billboards
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* ── Left column ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden"
                style={{ height: "clamp(260px, 42vw, 480px)" }}
              >
                <img
                  src={images[activeImg]}
                  alt={board.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Available badge */}
                {board.available && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Available Now
                  </div>
                )}

                {/* Illuminated badge */}
                {board.illuminated && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                    <Zap className="h-3 w-3 text-yellow-400" />
                    Illuminated 24hr
                  </div>
                )}

                {/* Views */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-white/60" />
                  <span className="text-xs text-white/60 font-medium">{board.views} monthly views</span>
                </div>
              </motion.div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      height: 72,
                      border: activeImg === i ? "2px solid var(--primary)" : "2px solid rgba(255,255,255,0.08)",
                      opacity: activeImg === i ? 1 : 0.55,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                <div
                  className="rounded-xl flex items-center justify-center text-xs font-semibold cursor-default"
                  style={{ height: 72, background: "rgba(255,255,255,0.04)", color: "rgba(237,237,237,0.25)", border: "2px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-center">
                    <Maximize2 className="h-4 w-4 mx-auto mb-1 opacity-40" />
                    <span className="text-[9px]">+4 photos</span>
                  </div>
                </div>
                <div
                  className="rounded-xl flex items-center justify-center cursor-default"
                  style={{ height: 72, background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-center">
                    <Navigation className="h-4 w-4 mx-auto mb-1 opacity-20" />
                    <span className="text-[9px]" style={{ color: "rgba(237,237,237,0.25)" }}>Map view</span>
                  </div>
                </div>
              </div>

              {/* Specs grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {specs.map((s) => (
                  <div key={s.label} className="rounded-xl p-4" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(237,237,237,0.3)" }}>{s.label}</p>
                    <p className="text-sm font-black text-white">{s.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Features — what's included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl p-6"
                style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="text-base font-black text-white mb-5">What&apos;s Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {board.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                      <span className="text-sm" style={{ color: "rgba(237,237,237,0.65)" }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Best for */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl p-6"
                style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="text-base font-black text-white mb-2">Best For</h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <LayoutGrid className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
                  <p className="text-xs" style={{ color: "rgba(237,237,237,0.4)" }}>
                    Ideal for brands targeting {board.state} and surrounding markets
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {bestFor.map((b) => (
                      <span
                        key={b}
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(194,164,109,0.12)", color: "var(--primary)", border: "1px solid rgba(194,164,109,0.25)" }}
                      >
                        {b}
                      </span>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right sticky card ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="sticky top-28 space-y-4"
              >
                {/* Main CTA card */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {/* Blue accent line */}
                  <div className="h-1" style={{ background: "linear-gradient(90deg,var(--primary),transparent)" }} />

                  <div className="p-6">
                    <h2 className="text-lg font-black text-white mb-1 leading-snug">{board.title}</h2>
                    <div className="flex items-center gap-1.5 mb-5">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                      <span className="text-xs" style={{ color: "rgba(237,237,237,0.45)" }}>{board.location}</span>
                    </div>

                    {/* Impressions highlight */}
                    <div
                      className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-5"
                      style={{ background: "rgba(194,164,109,0.12)", border: "1px solid rgba(194,164,109,0.2)" }}
                      >
                        <Eye className="h-4 w-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                        <span className="text-sm" style={{ color: "rgba(237,237,237,0.7)" }}>
                          <span className="font-black" style={{ color: "var(--primary)" }}>{board.impressions}</span> impressions
                        </span>
                      </div>

                    {/* No price — brief CTA */}
                    <div className="mb-5 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: "rgba(237,237,237,0.3)" }}>Pricing</p>
                      <p className="text-sm font-semibold" style={{ color: "rgba(237,237,237,0.45)" }}>
                        Available on request — add to your brief and our team will provide a tailored proposal.
                      </p>
                    </div>

                    {/* CTA buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => inCart ? remove(board.id) : add(board)}
                        className="w-full py-3.5 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-90"
                        style={{
                          background: inCart ? "rgba(194,164,109,0.12)" : "var(--primary)",
                          border: inCart ? "1px solid rgba(194,164,109,0.4)" : "1px solid transparent",
                        }}
                      >
                        {inCart
                          ? <><Check className="h-4 w-4" /> Added to Brief</>
                          : <><Plus className="h-4 w-4" /> Add to Brief</>
                        }
                      </button>

                      {items.length > 0 && (
                        <Link
                          href="/billboards/brief"
                          className="w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white/10"
                          style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(237,237,237,0.7)" }}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          View Brief ({items.length})
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <h4 className="text-xs font-black text-white mb-4 uppercase tracking-wider">Quick Stats</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Traffic Density",  value: traffic },
                      { label: "Format",           value: board.type },
                      { label: "Size",             value: board.size },
                      { label: "Facing",           value: board.facing },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "rgba(237,237,237,0.35)" }}>{s.label}</span>
                        <span className="text-xs font-bold text-white">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help strip */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(194,164,109,0.08)", border: "1px solid rgba(194,164,109,0.12)" }}
                >
                  <p className="text-xs font-black text-white mb-1">Need expert advice?</p>
                  <p className="text-[11px] mb-4" style={{ color: "rgba(237,237,237,0.35)" }}>
                    Our strategists will help you pick the right mix of locations for your campaign.
                  </p>
                  <Link
                    href="/contact"
                    className="text-xs font-black flex items-center gap-1 transition-opacity hover:opacity-70"
                    style={{ color: "var(--primary)" }}
                  >
                    Talk to a strategist <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
