"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Building2 } from "lucide-react"

const CLIENTS = [
  { id: 1, name: "Zenith Bank",    industry: "Banking",          campaigns: 3, since: "2022", tier: "enterprise", contact: "Adaeze Okonkwo" },
  { id: 2, name: "MTN Nigeria",    industry: "Telecommunications",campaigns: 2, since: "2021", tier: "enterprise", contact: "Emeka Njoku" },
  { id: 3, name: "Dangote Group",  industry: "Manufacturing",    campaigns: 4, since: "2020", tier: "enterprise", contact: "Chidinma Osei" },
  { id: 4, name: "Paystack",       industry: "Fintech",          campaigns: 2, since: "2023", tier: "growth",     contact: "Taiwo Adeyemi" },
  { id: 5, name: "Flutterwave",    industry: "Fintech",          campaigns: 1, since: "2023", tier: "growth",     contact: "Ngozi Adesanya" },
  { id: 6, name: "GTBank",         industry: "Banking",          campaigns: 2, since: "2022", tier: "enterprise", contact: "Obinna Eze" },
  { id: 7, name: "NNPC",           industry: "Energy",           campaigns: 1, since: "2024", tier: "enterprise", contact: "Adaeze Okonkwo" },
  { id: 8, name: "Airtel Nigeria", industry: "Telecommunications",campaigns: 3, since: "2021", tier: "growth",     contact: "Emeka Njoku" },
  { id: 9, name: "Interswitch",    industry: "Fintech",          campaigns: 1, since: "2024", tier: "starter",    contact: "Taiwo Adeyemi" },
  { id: 10, name: "UBA",           industry: "Banking",          campaigns: 2, since: "2022", tier: "enterprise", contact: "Chidinma Osei" },
]

const tierColor: Record<string, string> = {
  enterprise: "bg-[rgba(194,164,109,0.12)] text-[#C2A46D]",
  growth:     "bg-green-500/15 text-green-400",
  starter:    "bg-white/8 text-white/40",
}

export default function ClientsPage() {
  const router  = useRouter()
  const [ready, setReady]   = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") { router.replace("/admin/login"); return }
    setReady(true)
  }, [router])

  if (!ready) return null

  const filtered = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-black text-white">Clients</h1>
          <p className="text-white/35 text-sm mt-1">{CLIENTS.length} active client relationships</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition hover:opacity-85" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" /> Add Client
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Enterprise", count: CLIENTS.filter(c => c.tier === "enterprise").length },
          { label: "Growth",     count: CLIENTS.filter(c => c.tier === "growth").length },
          { label: "Starter",    count: CLIENTS.filter(c => c.tier === "starter").length },
        ].map((s) => (
          <div key={s.label} className="admin-card p-5 text-center">
            <div className="text-3xl font-black mb-1" style={{ color: s.label === "Enterprise" ? "var(--primary)" : s.label === "Growth" ? undefined : undefined }}>{s.count}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/25">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="admin-card overflow-hidden">
        <div className="p-4 border-b border-white/6">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-white/25 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {filtered.map((c) => (
            <div key={c.id} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/3 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,164,109,0.12)" }}>
                <Building2 className="h-4 w-4" style={{ color: "var(--primary)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-black text-white truncate">{c.name}</p>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${tierColor[c.tier]}`}>
                    {c.tier}
                  </span>
                </div>
                <p className="text-xs text-white/35 mt-0.5">{c.industry}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] text-white/25">{c.campaigns} campaigns</span>
                  <span className="text-[10px] text-white/15">·</span>
                  <span className="text-[10px] text-white/25">Since {c.since}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
