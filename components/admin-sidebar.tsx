"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, Megaphone, MessageCircle,
  Users, Settings, LogOut, Menu, X,
} from "lucide-react"

const SESSIONS_KEY = "bl_live_chats"

function getLiveUnread(): number {
  try {
    const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "[]")
    return sessions.filter((s: { read: boolean }) => !s.read).length
  } catch { return 0 }
}

const navItems = [
  { href: "/admin",           icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/campaigns", icon: Megaphone,       label: "Campaigns" },
  { href: "/admin/enquiries", icon: MessageCircle,   label: "Enquiries", badge: true },
  { href: "/admin/clients",   icon: Users,           label: "Clients" },
  { href: "/admin/settings",  icon: Settings,        label: "Settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [unread, setUnread] = useState(0)
  const [open,   setOpen]   = useState(false)

  useEffect(() => {
    setUnread(getLiveUnread())
    const t = setInterval(() => setUnread(getLiveUnread()), 2000)
    return () => clearInterval(t)
  }, [])

  const logout = () => {
    localStorage.removeItem("bl_admin_auth")
    router.push("/admin/login")
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 72 72" fill="none">
            <rect x="2" y="2" width="68" height="68" rx="14" stroke="#082A7B" strokeWidth="2" />
            <text x="36" y="46" textAnchor="middle" fill="#082A7B" fontSize="22" fontWeight="900" fontFamily="Poppins, sans-serif" letterSpacing="-1">BL</text>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black text-white">BLACKLINE</span>
            <span className="text-[9px] tracking-widest text-white/30 uppercase">Admin</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
              style={active ? { background: "rgba(8,42,123,0.4)", color: "#fff" } : {}}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
              {badge && unread > 0 && (
                <span className="ml-auto text-[10px] font-black bg-green-500 text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {unread}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-6 border-t border-white/6 pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 h-screen fixed left-0 top-0 z-40"
        style={{ background: "#050811", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4" style={{ background: "#050811", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/admin" className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 72 72" fill="none">
            <rect x="2" y="2" width="68" height="68" rx="14" stroke="#082A7B" strokeWidth="2" />
            <text x="36" y="46" textAnchor="middle" fill="#082A7B" fontSize="22" fontWeight="900" fontFamily="Poppins, sans-serif" letterSpacing="-1">BL</text>
          </svg>
          <span className="text-sm font-black text-white">BLACKLINE Admin</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-white/60 hover:text-white">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside
            className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-60 flex flex-col"
            style={{ background: "#050811", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  )
}
