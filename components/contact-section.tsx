"use client"

import { useState } from "react"
import { ArrowRight, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export function ContactSection() {
  const [form, setForm]           = useState({ name: "", company: "", brief: "" })
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof typeof form, val: string) => setForm((p) => ({ ...p, [key]: val }))

  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "#111115" }}>
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at left, rgba(194,164,109,0.1), transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
              <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Direct Access</span>
            </div>

            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none mb-6" style={{ color: "#EDEDED" }}>
              Start a<br />Project
            </h2>

            <p className="text-sm leading-relaxed mb-14 max-w-sm" style={{ color: "rgba(237,237,237,0.58)" }}>
              Not a lead form. A direct line to a strategist. Tell us what you&apos;re building and we&apos;ll tell you how we can make it undeniable.
            </p>

            <div className="space-y-5">
              {[
                { Icon: Mail,   label: "hello@loechsar.com" },
                { Icon: MapPin, label: "Lagos / Global" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(194,164,109,0.3)", background: "rgba(194,164,109,0.12)" }}>
                    <Icon className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(237,237,237,0.62)" }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 hidden lg:block">
              <div className="inline-block px-5 py-3 rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)" }}>
                <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "rgba(237,237,237,0.35)" }}>Response time</p>
                <p className="text-sm font-black mt-0.5" style={{ color: "#EDEDED" }}>Within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-sm flex items-center justify-center mx-auto mb-8" style={{ border: "1px solid rgba(194,164,109,0.5)", background: "rgba(194,164,109,0.15)" }}>
                    <ArrowRight className="h-6 w-6" style={{ color: "var(--primary)" }} />
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: "#EDEDED" }}>Message Received</h3>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(237,237,237,0.52)" }}>
                    A strategist will reach you within 24 hours. Keep building.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (form.name || form.company) setSubmitted(true) }} className="space-y-4">
                {[
                  { key: "name",    placeholder: "Your name",       type: "text" },
                  { key: "company", placeholder: "Company / Brand", type: "text" },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => update(key as keyof typeof form, e.target.value)}
                    className="w-full px-5 py-4 rounded-sm text-sm focus:outline-none transition-colors placeholder:text-white/25"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#EDEDED" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                ))}

                <textarea
                  placeholder="Project Brief — describe what you're building, the challenge, the goal."
                  value={form.brief}
                  onChange={(e) => update("brief", e.target.value)}
                  rows={6}
                  className="w-full px-5 py-4 rounded-sm text-sm focus:outline-none resize-none transition-colors placeholder:text-white/25"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#EDEDED" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                />

                <button
                  type="submit"
                  className="group flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white rounded-sm hover:opacity-90 transition-all duration-300"
                  style={{ background: "var(--primary)" }}
                >
                  Submit Brief
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <p className="text-[9px] uppercase tracking-widest pt-1" style={{ color: "rgba(237,237,237,0.3)" }}>
                  No spam. No sales pipeline. Direct operator contact.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
