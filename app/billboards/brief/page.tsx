"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, X, ChevronLeft, Send, Check,
  User, Phone, Mail, FileText, Zap,
} from "lucide-react"

function Field({
  label, icon: Icon, required = false, ...props
}: {
  label: string
  icon: React.ElementType
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-bold mb-2" style={{ color: "rgba(237,237,237,0.45)" }}>
        {label} {required && <span style={{ color: "#4B73D4" }}>*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(237,237,237,0.25)" }} />
        <input
          {...props}
          className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(75,115,212,0.6)"; props.onFocus?.(e) }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; props.onBlur?.(e) }}
        />
      </div>
    </div>
  )
}

export default function BriefPage() {
  const { items, remove, clear } = useCart()
  const router = useRouter()

  const [name,    setName]    = useState("")
  const [phone,   setPhone]   = useState("")
  const [email,   setEmail]   = useState("")
  const [brief,   setBrief]   = useState("")
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState("")

  const canSubmit = name.trim() && phone.trim() && email.trim() && items.length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || loading) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          brief: brief.trim(),
          billboards: items.map((b) => ({
            title: b.title,
            location: b.location,
            type: b.type,
            size: b.size,
          })),
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setSent(true)
        clear()
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <Header />

      <section className="pt-36 pb-24">
        <div className="container-wide max-w-5xl">

          {/* Back */}
          <Link href="/billboards" className="inline-flex items-center gap-2 text-xs font-bold mb-10 transition-opacity hover:opacity-70" style={{ color: "rgba(237,237,237,0.4)" }}>
            <ChevronLeft className="h-4 w-4" /> Back to Billboards
          </Link>

          {/* Success state */}
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(8,42,123,0.2)", border: "2px solid rgba(75,115,212,0.4)" }}>
                  <Check className="h-9 w-9" style={{ color: "#4B73D4" }} />
                </div>
                <h2 className="text-3xl font-black text-white mb-3">Brief Sent!</h2>
                <p className="text-white/45 max-w-md mx-auto text-sm leading-relaxed mb-8">
                  We&apos;ve received your brief and sent a confirmation to your email. A BLACKLINE strategist will reach out within 24 hours.
                </p>
                <Link
                  href="/billboards"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black text-white"
                  style={{ background: "#082A7B" }}
                >
                  Browse More Billboards
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!sent && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

              {/* Selected billboards */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <h2 className="text-lg font-black text-white mb-1">Selected Billboards</h2>
                  <p className="text-xs text-white/35 mb-6">{items.length} location{items.length !== 1 ? "s" : ""} in your brief</p>

                  {items.length === 0 ? (
                    <div className="rounded-2xl py-12 text-center" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <MapPin className="h-8 w-8 mx-auto mb-3 text-white/15" />
                      <p className="text-sm text-white/25">No billboards selected</p>
                      <Link href="/billboards" className="mt-4 inline-block text-xs font-bold" style={{ color: "#4B73D4" }}>
                        Browse billboards →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((b, i) => (
                        <motion.div
                          key={b.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex gap-3 p-3 rounded-xl"
                          style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          <img src={b.image} alt={b.title} className="w-16 h-14 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-white truncate">{b.title}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "#4B73D4" }} />
                              <p className="text-[10px] text-white/35 truncate">{b.location}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Zap className="h-2.5 w-2.5" style={{ color: "#4B73D4" }} />
                              <span className="text-[10px] font-semibold" style={{ color: "#4B73D4" }}>{b.impressions}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(b.id)}
                            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                          >
                            <X className="h-3.5 w-3.5 text-white/30" />
                          </button>
                        </motion.div>
                      ))}

                      <Link href="/billboards" className="block text-center text-[11px] font-bold py-3 rounded-xl transition-colors hover:bg-white/5" style={{ color: "#4B73D4", border: "1px dashed rgba(75,115,212,0.3)" }}>
                        + Add more billboards
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Brief form */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-lg font-black text-white mb-1">Your Details</h2>
                <p className="text-xs text-white/35 mb-6">We&apos;ll use this to contact you with a tailored proposal</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="rounded-2xl p-6 space-y-4" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Field label="Full Name" icon={User} required placeholder="e.g. Tunde Adeyemi" value={name} onChange={(e) => setName(e.target.value)} />
                    <Field label="Phone Number" icon={Phone} required placeholder="e.g. +234 801 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                    <Field label="Email Address" icon={Mail} required placeholder="e.g. tunde@company.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

                    {/* Brief textarea */}
                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: "rgba(237,237,237,0.45)" }}>
                        Campaign Brief <span className="text-white/25 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 h-4 w-4" style={{ color: "rgba(237,237,237,0.25)" }} />
                        <textarea
                          rows={4}
                          placeholder="Tell us about your campaign objectives, target audience, timeline, or anything else we should know..."
                          value={brief}
                          onChange={(e) => setBrief(e.target.value)}
                          className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none resize-none transition-colors"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(75,115,212,0.6)" }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 font-semibold">{error}</p>
                  )}

                  <div className="rounded-2xl p-4" style={{ background: "rgba(8,42,123,0.08)", border: "1px solid rgba(75,115,212,0.15)" }}>
                    <p className="text-[11px] text-white/35 leading-relaxed">
                      By submitting this brief, you agree to be contacted by BLACKLINE regarding your outdoor advertising campaign. A confirmation copy will be sent to your email address.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="w-full py-4 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "#082A7B" }}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending Brief...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Submit Brief</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
