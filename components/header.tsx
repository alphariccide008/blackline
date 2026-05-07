"use client"



import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, ChevronDown, Lightbulb, Palette, Megaphone, Monitor,
  Calendar, GraduationCap, BarChart2, MapPin, ShoppingBag,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  { name: "Brand Strategy",           href: "/services#strategy",    icon: Lightbulb },
  { name: "Identity Systems",          href: "/services#identity",    icon: Palette },
  { name: "Campaign Development",      href: "/services#campaigns",   icon: Megaphone },
  { name: "Outdoor Advertising",       href: "/services#outdoor",     icon: Monitor },
  { name: "Event & Experience Design", href: "/services#events",      icon: Calendar },
  { name: "Corporate Training",        href: "/services#training",    icon: GraduationCap },
  { name: "Market Research",           href: "/services#research",    icon: BarChart2 },
  { name: "Geographic Activation",     href: "/services#geo",         icon: MapPin },
]

export function Header() {
  const [scrolled,           setScrolled]           = useState(false)
  const [mobileOpen,         setMobileOpen]         = useState(false)
  const [servicesOpen,       setServicesOpen]       = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Always white/light text — dark site, scrolled bg is also dark
  const navColor   = (href: string) => isActive(href) ? "var(--primary)" : "rgba(237,237,237,0.72)"
  const logoWord   = "#EDEDED"
  const logoSub    = "rgba(237,237,237,0.38)"

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "shadow-lg" : ""}`}
      style={{
        background:    scrolled ? "rgba(10,10,12,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom:  scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div className="container-wide">
        <div className="flex h-24 items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0 group">
            <img src="logo.PNG" alt="Loechsar" width={38} height={38} className="md:w-36 md:h-28 h-30 w-10 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight" style={{ color: logoWord }}>
                LO <span style={{ color: "var(--primary)" }}>ECHSAR</span>
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: logoSub }}>
                Precision Over Noise
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "/",           label: "Home" },
              { href: "/projects",   label: "Work" },
              { href: "/billboards", label: "Billboards" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold transition-colors duration-300 pb-1 hover:text-white"
                style={{ color: navColor(l.href) }}
              >
                {l.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300 pb-1 hover:text-white"
                style={{ color: pathname.startsWith("/services") ? "var(--primary)" : "rgba(237,237,237,0.72)" }}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] transition-all duration-300 ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                  <div className="rounded-2xl shadow-2xl p-4 overflow-hidden" style={{ background: "#17171C", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="h-0.5 w-full rounded-full mb-4" style={{ background: "linear-gradient(90deg,var(--primary),var(--primary),transparent)" }} />
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((s) => {
                      const Icon = s.icon
                      return (
                        <Link key={s.href} href={s.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,164,109,0.12)" }}>
                            <Icon className="h-4 w-4" style={{ color: "var(--primary)" }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#EDEDED" }}>{s.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <Link href="/services" className="flex items-center justify-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: "var(--primary)" }}>
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {[
              { href: "/about",   label: "About" },
              { href: "/blog",    label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold transition-colors duration-300 pb-1 hover:text-white"
                style={{ color: navColor(l.href) }}
              >
                {l.label}
              </Link>
            ))}
              </nav>
          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            {/* Brief cart button */}
              <Link
              href="/billboards/brief"
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <ShoppingBag className="h-4 w-4" style={{ color: items.length > 0 ? "var(--primary)" : "rgba(237,237,237,0.5)" }} />
              <span style={{ color: items.length > 0 ? "#EDEDED" : "rgba(237,237,237,0.5)" }}>Brief</span>

              {/* Animated badge */}
              <AnimatePresence>
                {items.length > 0 && (
                    <motion.span
                    key={items.length}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: "var(--primary)", boxShadow: "0 0 0 2px #0A0A0C" }}
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

              <Link
              href="/#brief"
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ background: "var(--primary)" }}
            >
              Build Brief
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile brief cart icon */}
              <Link
              href="/billboards/brief"
              className="relative p-2 rounded-xl transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.07)" }}
              aria-label="View brief"
            >
              <ShoppingBag className="h-5 w-5" style={{ color: items.length > 0 ? "var(--primary)" : "rgba(237,237,237,0.6)" }} />
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.span
                    key={items.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: "var(--primary)", boxShadow: "0 0 0 2px #0A0A0C" }}
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-xl transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.07)", color: "#EDEDED" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-6 animate-slide-down" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(10,10,12,0.98)", backdropFilter: "blur(20px)" }}>
            <nav className="space-y-1">
              {[
                { href: "/",           label: "Home" },
                { href: "/projects",   label: "Work" },
                { href: "/billboards", label: "Billboards" },
                { href: "/about",      label: "About" },
                { href: "/blog",       label: "Insights" },
                { href: "/contact",    label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    color: isActive(l.href) ? "var(--primary)" : "rgba(237,237,237,0.7)",
                    background: isActive(l.href) ? "rgba(194,164,109,0.12)" : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile services */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{ color: "rgba(237,237,237,0.7)" }}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-1 ml-4 space-y-1 animate-slide-down">
                    {services.map((s) => {
                      const Icon = s.icon
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:text-white"
                          style={{ color: "rgba(237,237,237,0.55)" }}
                        >
                          <Icon className="h-4 w-4" style={{ color: "var(--primary)" }} /> {s.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>
            <div className="mt-6 pt-6 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <Link
                href="/#brief"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-bold text-white"
                style={{ background: "var(--primary)" }}
              >
                Build a Brief
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
