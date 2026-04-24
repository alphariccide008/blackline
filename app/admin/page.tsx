"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, MessageCircle, Users, Megaphone, Eye, ArrowUpRight } from "lucide-react"

const SESSIONS_KEY = "bl_live_chats"

function getSessions() {
  try { return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "[]") } catch { return [] }
}

const campaigns = [
  { name: "Zenith Bank Q2 Rebrand",   status: "active",    reach: "4.2M",  channels: "OOH + Social" },
  { name: "MTN 5G National Launch",   status: "active",    reach: "18M",   channels: "OOH + TV + Digital" },
  { name: "Paystack Growth Sprint",   status: "paused",    reach: "2.1M",  channels: "Social + Email" },
  { name: "Dangote Q1 Campaign",      status: "completed", reach: "26M",   channels: "OOH + Radio" },
  { name: "NNPC Brand Activation",    status: "planned",   reach: "—",     channels: "OOH + Events" },
]

const statusColor: Record<string, string> = {
  active:    "bg-green-500/15 text-green-400",
  paused:    "bg-yellow-500/15 text-yellow-400",
  completed: "bg-blue-500/15 text-blue-400",
  planned:   "bg-white/8 text-white/40",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [liveCount, setLiveCount] = useState(0)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") {
      router.replace("/admin/login")
      return
    }
    setReady(true)
    const update = () => {
      const sessions = getSessions()
      setLiveCount(sessions.length)
      setUnread(sessions.filter((s: { read: boolean }) => !s.read).length)
    }
    update()
    const t = setInterval(update, 2000)
    return () => clearInterval(t)
  }, [router])

  if (!ready) return null

  const kpis = [
    { label: "Total Campaigns",    value: "24",        icon: Megaphone,      delta: "+3 this month" },
    { label: "Active Campaigns",   value: "2",         icon: TrendingUp,     delta: "Running now" },
    { label: "Live Chats",         value: liveCount,   icon: MessageCircle,  delta: `${unread} unread` },
    { label: "Total Clients",      value: "38",        icon: Users,          delta: "+2 this quarter" },
  ]

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="mb-10">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-white/35 text-sm mt-1">Welcome back, Admin</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="admin-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(8,42,123,0.15), transparent)" }} />
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(8,42,123,0.2)" }}>
                <Icon className="h-4 w-4" style={{ color: "#082A7B" }} />
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs font-semibold text-white/50 mb-1">{label}</div>
            <div className="text-[10px] text-white/25">{delta}</div>
          </div>
        ))}
      </div>

      {/* Campaigns table */}
      <div className="admin-card overflow-hidden mb-6">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-sm font-black text-white">Active Campaigns</h2>
          <a href="/admin/campaigns" className="text-xs font-bold text-[#082A7B] flex items-center gap-1 hover:opacity-80 transition">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Campaign", "Status", "Est. Reach", "Channels"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] uppercase tracking-widest text-white/25 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="admin-row-hover border-b border-white/4 last:border-0 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-white/80">{c.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">{c.reach}</td>
                  <td className="px-6 py-4 text-xs text-white/40">{c.channels}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiries panel */}
      <div className="admin-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black text-white">Live Enquiries</h2>
            {unread > 0 && (
              <span className="text-[10px] font-black bg-green-500 text-white rounded-full px-2 py-0.5">{unread} new</span>
            )}
          </div>
          <a href="/admin/enquiries" className="text-xs font-bold text-[#082A7B] flex items-center gap-1 hover:opacity-80 transition">
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {liveCount === 0 ? (
          <div className="p-10 text-center text-white/25 text-sm">No live sessions yet</div>
        ) : (
          <div className="p-4">
            {getSessions().slice(0, 5).map((s: { id: string; name: string; email: string; read: boolean; messages: { text: string }[] }) => (
              <a
                key={s.id}
                href="/admin/enquiries"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/4 transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "rgba(8,42,123,0.4)" }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  {!s.read && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#030612]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                  <p className="text-xs text-white/30 truncate">{s.messages[s.messages.length - 1]?.text ?? "No messages yet"}</p>
                </div>
                <Eye className="h-4 w-4 text-white/20 flex-shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
