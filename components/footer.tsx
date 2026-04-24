"use client"

import { Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react"

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter,   href: "#", label: "Twitter" },
  { Icon: Linkedin,  href: "#", label: "LinkedIn" },
]

const nav = [
  { label: "System",    href: "#system" },
  { label: "Work",      href: "/projects" },
  { label: "Services",  href: "/services" },
  { label: "Contact",   href: "#contact" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#080809", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #082A7B, rgba(8,42,123,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-black tracking-[0.12em] text-white">
                BLACK<span style={{ color: "#082A7B" }}>LINE</span>
              </span>
              <p className="text-[8px] tracking-[0.35em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.22)" }}>Precision Over Noise</p>
            </div>
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              A full-spectrum brand and growth company operating at the intersection of strategy, identity, and culture.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#082A7B"; el.style.borderColor = "#082A7B"; el.style.color = "white" }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.3)" }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[8px] font-black uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(255,255,255,0.22)" }}>Navigation</h4>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[8px] font-black uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(255,255,255,0.22)" }}>Contact</h4>
            <div className="space-y-3.5">
              {[
                { Icon: Mail, text: "hello@blackline.com" },
                { Icon: MapPin, text: "Lagos / Global" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#082A7B" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{text}</span>
                </div>
              ))}
            </div>
            <a
              href="#brief"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-white rounded-sm hover:opacity-85 transition-all"
              style={{ background: "#082A7B" }}
            >
              Build a Brief →
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.18)" }}>© BLACKLINE 2026 — All rights reserved</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-[9px] uppercase tracking-widest hover:text-white/40 transition-colors" style={{ color: "rgba(255,255,255,0.18)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
