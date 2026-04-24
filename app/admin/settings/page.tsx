"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Shield } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    displayName: "BLACKLINE Admin",
    email: "admin@blackline.com",
    currentPw: "",
    newPw: "",
    confirmPw: "",
    notifyEnquiries: true,
    notifyCampaigns: true,
    notifyWeeklyReport: false,
  })

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") { router.replace("/admin/login"); return }
    setReady(true)
  }, [router])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!ready) return null

  return (
    <div className="p-6 lg:p-10 min-h-screen max-w-2xl">
      <div className="mb-10">
        <h1 className="text-2xl font-black text-white">Settings</h1>
        <p className="text-white/35 text-sm mt-1">Manage your admin profile and preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Profile */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-black text-white mb-6">Profile</h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white" style={{ background: "#082A7B" }}>
              A
            </div>
            <div>
              <p className="text-sm font-bold text-white">{form.displayName}</p>
              <p className="text-xs text-white/35">{form.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Display Name", key: "displayName", type: "text" },
              { label: "Email Address", key: "email", type: "email" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-[10px] uppercase tracking-widest text-white/35 mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-4 w-4" style={{ color: "#082A7B" }} />
            <h2 className="text-sm font-black text-white">Security</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Current Password", key: "currentPw" },
              { label: "New Password", key: "newPw" },
              { label: "Confirm Password", key: "confirmPw" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-[10px] uppercase tracking-widest text-white/35 mb-2">{label}</label>
                <input
                  type="password"
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-black text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { key: "notifyEnquiries",   label: "New enquiry alerts",       desc: "Notify when a visitor starts a chat" },
              { key: "notifyCampaigns",   label: "Campaign status changes",   desc: "Notify on campaign start, pause, or completion" },
              { key: "notifyWeeklyReport",label: "Weekly summary report",     desc: "Receive a digest every Monday morning" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                  className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                  style={{ background: form[key as keyof typeof form] ? "#082A7B" : "rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                    style={{ left: form[key as keyof typeof form] ? "calc(100% - 1.25rem)" : "0.25rem" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition hover:opacity-85"
          style={{ background: "#082A7B" }}
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
