"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))

    if (username === "admin" && password === "blackline@2026") {
      localStorage.setItem("bl_admin_auth", "true")
      router.push("/admin")
    } else {
      setError("Invalid credentials. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#030612" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(194,164,109,0.18), transparent)" }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
              <svg width="44" height="44" viewBox="0 0 72 72" fill="none">
              <rect x="2" y="2" width="68" height="68" rx="14" stroke="var(--primary)" strokeWidth="2" />
              <text x="36" y="46" textAnchor="middle" fill="var(--primary)" fontSize="22" fontWeight="900" fontFamily="Poppins, sans-serif" letterSpacing="-1">LO</text>
            </svg>
            <div>
              <p className="text-lg font-black text-white">LOECHSAR</p>
              <p className="text-[9px] uppercase tracking-widest text-white/30">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h1 className="text-xl font-black text-white mb-2">Sign in</h1>
          <p className="text-xs text-white/35 mb-8">Access the BLACKLINE control panel</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/35 mb-2">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:ring-1 transition"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/35 mb-2">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:ring-1 transition"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">{error}</p>
            )}

              <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-black text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: "var(--primary)" }}
            >
              {loading
                ? <><span className="loader-ring w-4 h-4 inline-block" />Signing in...</>
                : "Sign in →"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
