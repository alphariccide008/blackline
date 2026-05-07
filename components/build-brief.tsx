"use client"

import { useState } from "react"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  { id: "channels", label: "Channels",    question: "Select your channels",    hint: "Choose all environments where your brand should appear", multi: true,  options: ["Billboards","Lampposts","Transit Ads","TV Primetime Slots","Radio Primetime Slots","Social Media Campaign","Digital Ads","Influencer Activation","Events / Workshops"] },
  { id: "location", label: "Location",    question: "Choose your market",       hint: "Select all target regions",                             multi: true,  options: ["Lagos","Abuja","Port Harcourt","Kano","Ibadan","Nationwide"], hasCustom: true },
  { id: "duration", label: "Duration",    question: "Set your timeline",        hint: "How long will the campaign run?",                        multi: false, options: ["7 days","14 days","30 days","Custom"] },
  { id: "budget",   label: "Budget Range",question: "Define your investment",   hint: "Select the tier that fits your scope",                   multi: false, options: ["Starter","Growth","Scale","Enterprise"] },
  { id: "output",   label: "Output",      question: "What do you need?",        hint: "Select all deliverables you require",                    multi: true,  options: ["Media Plan","Full Proposal","Rate Breakdown","Strategy Recommendation"] },
]

export function BuildBrief() {
  const [current, setCurrent]               = useState(0)
  const [selections, setSelections]         = useState<Record<number, string[]>>({})
  const [customLocation, setCustomLocation] = useState("")
  const [email, setEmail]                   = useState("")
  const [phone, setPhone]                   = useState("")
  const [submitted, setSubmitted]           = useState(false)

  const toggle = (stepIdx: number, option: string) => {
    const isMulti = steps[stepIdx].multi
    const cur = selections[stepIdx] || []
    setSelections((prev) => ({
      ...prev,
      [stepIdx]: isMulti
        ? cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option]
        : [option],
    }))
  }

  const isSelected  = (si: number, o: string) => (selections[si] || []).includes(o)
  const isCompleted = (si: number)             => (selections[si] || []).length > 0
  const canNext     = isCompleted(current)
  const finalStep   = current === steps.length

  return (
    <section id="brief" className="py-32 relative overflow-hidden" style={{ background: "#111115" }}>
      <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at right top, rgba(194,164,109,0.12), transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--primary)" }}>Campaign Configuration</span>
          </div>
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-none" style={{ color: "#EDEDED" }}>
            Build Your Brief
          </h2>
          <p className="text-sm mt-3 max-w-md leading-relaxed" style={{ color: "rgba(237,237,237,0.52)" }}>
            Every selection shapes the strategy. This is not a form — it is the foundation.
          </p>
        </motion.div>

        {submitted ? (
            <div className="max-w-md mx-auto text-center py-24">
            <div className="w-16 h-16 rounded-sm border-2 flex items-center justify-center mx-auto mb-8" style={{ borderColor: "var(--primary)" }}>
              <Check className="h-7 w-7" style={{ color: "var(--primary)" }} />
            </div>
            <h3 className="text-2xl font-black mb-3" style={{ color: "#EDEDED" }}>Brief Generated</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(237,237,237,0.52)" }}>
              Your brief is in the system. A strategist will reach you within 24 hours.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0 overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.1 }}
          >

            {/* Step rail */}
            <div className="border-b lg:border-b-0 lg:border-r p-6" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
              <p className="text-[8px] uppercase tracking-[0.3em] font-bold mb-5" style={{ color: "rgba(237,237,237,0.28)" }}>Progress</p>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {steps.map((step, idx) => {
                  const done   = isCompleted(idx)
                  const active = current === idx
                  return (
                    <button
                      key={step.id}
                      onClick={() => (done || idx <= current) && setCurrent(idx)}
                      className="flex items-center gap-3 p-3 text-left transition-all duration-300 min-w-[140px] lg:min-w-0"
                      style={{ background: active ? "rgba(194,164,109,0.12)" : "transparent", border: active ? "1px solid rgba(194,164,109,0.3)" : "1px solid transparent", borderRadius: "4px" }}
                    >
                      <div className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 text-[10px] font-black transition-all" style={{
                        background: done && !active ? "var(--primary)" : "transparent",
                        border: active ? "1.5px solid var(--primary)" : done ? "none" : "1.5px solid rgba(255,255,255,0.18)",
                        color: done && !active ? "white" : active ? "var(--primary)" : "rgba(237,237,237,0.28)",
                      }}>
                        {done && !active ? <Check className="h-3 w-3" /> : idx + 1}
                      </div>
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: active ? "var(--primary)" : "rgba(237,237,237,0.28)" }}>
                          Step {idx + 1}
                        </div>
                        <div className="text-xs font-semibold" style={{ color: active ? "#EDEDED" : "rgba(237,237,237,0.45)" }}>
                          {step.label}
                        </div>
                      </div>
                    </button>
                  )
                })}
                <div className="flex items-center gap-3 p-3 min-w-[140px] lg:min-w-0" style={{ background: finalStep ? "rgba(194,164,109,0.12)" : "transparent", border: finalStep ? "1px solid rgba(194,164,109,0.3)" : "1px solid transparent", borderRadius: "4px" }}>
                  <div className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 text-[10px] font-black" style={{ border: finalStep ? "1.5px solid var(--primary)" : "1.5px solid rgba(255,255,255,0.18)", color: finalStep ? "var(--primary)" : "rgba(237,237,237,0.28)" }}>
                    {steps.length + 1}
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: finalStep ? "var(--primary)" : "rgba(237,237,237,0.28)" }}>Final</div>
                    <div className="text-xs font-semibold" style={{ color: finalStep ? "#EDEDED" : "rgba(237,237,237,0.45)" }}>Contact</div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block mt-8">
                <div className="h-px relative" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="absolute top-0 left-0 h-full transition-all duration-500" style={{ width: `${(Math.min(current, steps.length) / steps.length) * 100}%`, background: "var(--primary)" }} />
                </div>
                <p className="text-[8px] uppercase tracking-widest mt-2" style={{ color: "rgba(237,237,237,0.3)" }}>
                  {Math.round((Math.min(current, steps.length) / steps.length) * 100)}% configured
                </p>
              </div>
            </div>

            {/* Content panel */}
            <div className="p-8 lg:p-12" style={{ background: "#0A0A0C" }}>
              {!finalStep ? (
                <div>
                  <div className="mb-8">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "var(--primary)" }}>
                      Step {current + 1} / {steps.length}
                    </div>
                    <h3 className="text-2xl font-black mb-1" style={{ color: "#EDEDED" }}>{steps[current].question}</h3>
                    <p className="text-xs" style={{ color: "rgba(237,237,237,0.48)" }}>{steps[current].hint}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10">
                    {steps[current].options.map((opt) => {
                      const sel = isSelected(current, opt)
                      return (
                        <button
                          key={opt}
                          onClick={() => toggle(current, opt)}
                          className="relative p-4 text-left text-sm font-medium rounded-sm transition-all duration-200 border"
                          style={{
                            background:   sel ? "rgba(194,164,109,0.12)" : "rgba(255,255,255,0.04)",
                            borderColor:  sel ? "var(--primary)"           : "rgba(255,255,255,0.09)",
                            color:        sel ? "#EDEDED"                  : "rgba(237,237,237,0.58)",
                          }}
                        >
                          {sel && (
                            <span className="absolute top-2 right-2 w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: "var(--primary)" }}>
                              <Check className="h-2.5 w-2.5 text-white" />
                            </span>
                          )}
                          {opt}
                        </button>
                      )
                    })}

                    {steps[current].hasCustom && (
                      <input
                        type="text"
                        placeholder="Custom location…"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="p-4 rounded-sm text-sm focus:outline-none col-span-2 sm:col-span-1 transition-colors placeholder:text-white/25"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#EDEDED" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                        onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {current > 0 && (
                      <button
                        onClick={() => setCurrent((p) => p - 1)}
                        className="flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
                        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(237,237,237,0.5)" }}
                      >
                        <ChevronLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    )}
                    <button
                      onClick={() => canNext && setCurrent((p) => p + 1)}
                      disabled={!canNext}
                      className="flex items-center gap-2 px-7 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
                      style={{
                        background: canNext ? "var(--primary)" : "rgba(255,255,255,0.07)",
                        color:      canNext ? "white"         : "rgba(237,237,237,0.28)",
                        cursor:     canNext ? "pointer"       : "not-allowed",
                      }}
                    >
                      {current < steps.length - 1 ? "Continue" : "Review Brief"}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "var(--primary)" }}>Final Step</div>
                    <h3 className="text-2xl font-black mb-1" style={{ color: "#EDEDED" }}>Your Contact Details</h3>
                    <p className="text-xs" style={{ color: "rgba(237,237,237,0.48)" }}>One last step. We&apos;ll send your brief and a strategist will follow up.</p>
                  </div>

                  <div className="mb-8 p-5 rounded-sm space-y-3" style={{ background: "rgba(194,164,109,0.08)", border: "1px solid rgba(194,164,109,0.18)" }}>
                    {Object.entries(selections).map(([si, opts]) =>
                      opts.length > 0 ? (
                        <div key={si} className="flex items-start gap-3">
                          <span className="text-[8px] uppercase tracking-widest pt-0.5 w-24 flex-shrink-0" style={{ color: "rgba(237,237,237,0.35)" }}>
                            {steps[Number(si)].label}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {opts.map((o) => (
                              <span key={o} className="text-[10px] px-2 py-0.5 rounded-sm" style={{ background: "rgba(194,164,109,0.12)", border: "1px solid rgba(194,164,109,0.3)", color: "var(--primary)" }}>
                                {o}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { val: email, set: setEmail, placeholder: "Email address", type: "email" },
                      { val: phone, set: setPhone, placeholder: "Phone number",  type: "tel" },
                    ].map(({ val, set, placeholder, type }) => (
                      <input
                        key={placeholder}
                        type={type}
                        value={val}
                        onChange={(e) => set(e.target.value)}
                        placeholder={placeholder}
                        className="p-4 rounded-sm text-sm focus:outline-none transition-colors placeholder:text-white/25"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#EDEDED" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                        onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrent(steps.length - 1)}
                      className="flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(237,237,237,0.5)" }}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button
                      onClick={() => (email || phone) && setSubmitted(true)}
                      className="flex items-center gap-2 px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
                      style={{ background: "var(--primary)", color: "white" }}
                    >
                      Generate Brief <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
