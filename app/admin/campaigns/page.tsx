"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, ArrowUpRight } from "lucide-react"

const CAMPAIGNS = [
  { id: 1, name: "Zenith Bank Q2 Rebrand",   client: "Zenith Bank",    status: "active",    reach: "4.2M",  budget: "₦28M",   start: "Mar 2026", end: "Jun 2026", channels: ["OOH", "Social"] },
  { id: 2, name: "MTN 5G National Launch",   client: "MTN Nigeria",    status: "active",    reach: "18M",   budget: "₦95M",   start: "Feb 2026", end: "Aug 2026", channels: ["OOH", "TV", "Digital"] },
  { id: 3, name: "Paystack Growth Sprint",   client: "Paystack",       status: "paused",    reach: "2.1M",  budget: "₦12M",   start: "Jan 2026", end: "Mar 2026", channels: ["Social", "Email"] },
  { id: 4, name: "Dangote Q1 Campaign",      client: "Dangote Group",  status: "completed", reach: "26M",   budget: "₦140M",  start: "Jan 2026", end: "Mar 2026", channels: ["OOH", "Radio"] },
  { id: 5, name: "NNPC Brand Activation",    client: "NNPC",           status: "planned",   reach: "—",     budget: "₦55M",   start: "May 2026", end: "Sep 2026", channels: ["OOH", "Events"] },
  { id: 6, name: "GTBank Identity Refresh",  client: "GTBank",         status: "planned",   reach: "—",     budget: "₦20M",   start: "Jun 2026", end: "Dec 2026", channels: ["Identity", "Social"] },
  { id: 7, name: "Airtel Nigeria Relaunch",  client: "Airtel Nigeria", status: "completed", reach: "11M",   budget: "₦72M",   start: "Oct 2025", end: "Jan 2026", channels: ["OOH", "TV"] },
]

const statusColor: Record<string, string> = {
  active:    "bg-green-500/15 text-green-400 border-green-500/20",
  paused:    "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  planned:   "bg-white/8 text-white/40 border-white/10",
}

export default function CampaignsPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") { router.replace("/admin/login"); return }
    setReady(true)
  }, [router])

  if (!ready) return null

  const filtered = CAMPAIGNS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.client.toLowerCase().includes(search.toLowerCase())
  )

  const counts = {
    total: CAMPAIGNS.length,
    active: CAMPAIGNS.filter((c) => c.status === "active").length,
    planned: CAMPAIGNS.filter((c) => c.status === "planned").length,
    completed: CAMPAIGNS.filter((c) => c.status === "completed").length,
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-black text-white">Campaigns</h1>
          <p className="text-white/35 text-sm mt-1">Manage all brand campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition hover:opacity-85" style={{ background: "#082A7B" }}>
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total", value: counts.total, color: "text-white" },
          { label: "Active", value: counts.active, color: "text-green-400" },
          { label: "Planned", value: counts.planned, color: "text-white/40" },
          { label: "Completed", value: counts.completed, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="admin-card p-5">
            <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/25">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="p-4 border-b border-white/6">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-white/25 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Campaign", "Client", "Status", "Reach", "Budget", "Period", "Channels"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-white/25 font-bold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="admin-row-hover border-b border-white/4 last:border-0 cursor-pointer transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white/85 whitespace-nowrap">{c.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/20" />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/40 whitespace-nowrap">{c.client}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColor[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/40">{c.reach}</td>
                  <td className="px-5 py-4 text-sm text-white/40 font-mono">{c.budget}</td>
                  <td className="px-5 py-4 text-xs text-white/30 whitespace-nowrap">{c.start} – {c.end}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {c.channels.map((ch) => (
                        <span key={ch} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: "rgba(8,42,123,0.2)", color: "#4B73D4" }}>
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
