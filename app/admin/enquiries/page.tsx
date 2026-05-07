"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Send, Search, RefreshCw } from "lucide-react"

const SESSIONS_KEY = "bl_live_chats"

type Msg = { role: "client" | "admin"; text: string; ts: number }
type Session = { id: string; name: string; email: string; messages: Msg[]; createdAt: number; read: boolean }

function getSessions(): Session[] {
  try { return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "[]") } catch { return [] }
}
function saveSessions(s: Session[]) { localStorage.setItem(SESSIONS_KEY, JSON.stringify(s)) }

function timeAgo(ts: number) {
  const secs = Math.floor((Date.now() - ts) / 1000)
  if (secs < 60)   return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ago`
}

export default function EnquiriesPage() {
  const router  = useRouter()
  const [ready, setReady]     = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [reply,    setReply]    = useState("")
  const [search,   setSearch]   = useState("")
  const [view,     setView]     = useState<"list" | "chat">("list")
  const bottomRef = useRef<HTMLDivElement>(null)

  const sync = useCallback(() => setSessions(getSessions()), [])

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") { router.replace("/admin/login"); return }
    setReady(true)
    sync()
    const t = setInterval(sync, 1500)
    return () => clearInterval(t)
  }, [router, sync])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selected, sessions])

  const markRead = (id: string) => {
    const all = getSessions()
    const idx = all.findIndex((s) => s.id === id)
    if (idx >= 0) { all[idx].read = true; saveSessions(all); sync() }
  }

  const openSession = (id: string) => {
    setSelected(id)
    setView("chat")
    markRead(id)
  }

  const sendReply = () => {
    if (!reply.trim() || !selected) return
    const all = getSessions()
    const idx = all.findIndex((s) => s.id === selected)
    if (idx >= 0) {
      all[idx].messages.push({ role: "admin", text: reply.trim(), ts: Date.now() })
      all[idx].read = true
      saveSessions(all)
      setReply("")
      sync()
    }
  }

  const filteredSessions = sessions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  const currentSession = sessions.find((s) => s.id === selected)

  if (!ready) return null

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar list */}
      <div className={`${view === "chat" ? "hidden" : "flex"} lg:flex flex-col w-full lg:w-80 border-r border-white/6 flex-shrink-0`}>
        <div className="p-4 border-b border-white/6">
          <h1 className="text-base font-black text-white mb-3">Enquiries</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-white/25 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-white/25 text-sm">No sessions yet</div>
          ) : (
            filteredSessions.map((s) => (
              <button
                key={s.id}
                onClick={() => openSession(s.id)}
                className={`w-full flex items-start gap-3 px-4 py-4 border-b border-white/4 hover:bg-white/4 transition-colors text-left ${selected === s.id ? "bg-white/6" : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "rgba(194,164,109,0.4)" }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  {!s.read && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#030612]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-white truncate">{s.name}</p>
                    <span className="text-[10px] text-white/25 flex-shrink-0 ml-2">{timeAgo(s.createdAt)}</span>
                  </div>
                  <p className="text-xs text-white/35 truncate">{s.email}</p>
                  <p className="text-xs text-white/25 truncate mt-0.5">
                    {s.messages[s.messages.length - 1]?.text ?? "No messages"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat panel */}
      <div className={`${view === "list" ? "hidden" : "flex"} lg:flex flex-1 flex-col overflow-hidden`}>
        {!currentSession ? (
          <div className="flex-1 flex items-center justify-center text-white/20 text-sm">
            Select a conversation
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/6 flex-shrink-0">
              <button className="lg:hidden text-white/50 hover:text-white mr-1" onClick={() => setView("list")}>←</button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white" style={{ background: "rgba(194,164,109,0.4)" }}>
                {currentSession.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-white">{currentSession.name}</p>
                <p className="text-xs text-white/35">{currentSession.email}</p>
              </div>
              <button onClick={sync} className="text-white/30 hover:text-white transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {currentSession.messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[70%] px-4 py-2.5 text-sm rounded-2xl leading-relaxed"
                    style={{
                      background: m.role === "admin" ? "#C2A46D" : "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.88)",
                      borderRadius: m.role === "admin" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Reply bar */}
            <div className="p-4 border-t border-white/6 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendReply()}
                  placeholder="Type a reply..."
                  className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button
                  onClick={sendReply}
                  disabled={!reply.trim()}
                  className="px-4 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2 transition disabled:opacity-40"
                  style={{ background: "#C2A46D" }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
