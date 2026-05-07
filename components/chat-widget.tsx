"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageCircle, X, Send, ChevronLeft, ArrowRight } from "lucide-react"

/* ── Storage helpers ── */
const SESSIONS_KEY = "bl_live_chats"
const SESSION_ID_KEY = "bl_chat_session_id"

type Msg = { role: "client" | "admin"; text: string; ts: number }
type Session = { id: string; name: string; email: string; messages: Msg[]; createdAt: number; read: boolean }

function getSessions(): Session[] {
  try { return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "[]") } catch { return [] }
}
function saveSessions(s: Session[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(s))
}
function getOrCreateSession(name: string, email: string): Session {
  const id = sessionStorage.getItem(SESSION_ID_KEY) ?? ""
  const all = getSessions()
  const existing = all.find((s) => s.id === id)
  if (existing) return existing
  const newId = `bl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  sessionStorage.setItem(SESSION_ID_KEY, newId)
  const s: Session = { id: newId, name, email, messages: [], createdAt: Date.now(), read: false }
  saveSessions([...all, s])
  return s
}
function pushClientMessage(text: string) {
  const id = sessionStorage.getItem(SESSION_ID_KEY) ?? ""
  const all = getSessions()
  const idx = all.findIndex((s) => s.id === id)
  if (idx < 0) return
  all[idx].messages.push({ role: "client", text, ts: Date.now() })
  all[idx].read = false
  saveSessions(all)
}
function getMyMessages(): Msg[] {
  const id = sessionStorage.getItem(SESSION_ID_KEY) ?? ""
  return getSessions().find((s) => s.id === id)?.messages ?? []
}

const quickReplies = [
  { emoji: "💡", label: "Brand strategy",    text: "I'd like to learn more about your brand strategy services." },
  { emoji: "🎨", label: "Identity design",   text: "Can you tell me about identity systems and what's included?" },
  { emoji: "📍", label: "OOH advertising",   text: "I'm interested in outdoor advertising for my brand." },
  { emoji: "📋", label: "Build a brief",     text: "I'd like to build a brief for a project." },
]

export function ChatWidget() {
  const [open, setOpen]           = useState(false)
  const [screen, setScreen]       = useState<"home" | "chat">("home")
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [input, setInput]         = useState("")
  const [messages, setMessages]   = useState<Msg[]>([])
  const [typing, setTyping]       = useState(false)
  const [unread, setUnread]       = useState(0)
  const [started, setStarted]     = useState(false)
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const pollRef                   = useRef<ReturnType<typeof setInterval> | null>(null)

  const syncMessages = useCallback(() => {
    const msgs = getMyMessages()
    setMessages((prev) => {
      const prevCount = prev.filter((m) => m.role === "admin").length
      const nextCount = msgs.filter((m) => m.role === "admin").length
      if (!open && nextCount > prevCount) setUnread((u) => u + (nextCount - prevCount))
      return msgs
    })
  }, [open])

  useEffect(() => {
    if (started) {
      pollRef.current = setInterval(syncMessages, 1500)
      return () => { if (pollRef.current) clearInterval(pollRef.current) }
    }
  }, [started, syncMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    if (open) setUnread(0)
  }, [open])

  const startChat = () => {
    if (!name.trim() || !email.trim()) return
    getOrCreateSession(name.trim(), email.trim())
    setStarted(true)
    setScreen("chat")

    setTimeout(() => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        const all = getSessions()
        const id = sessionStorage.getItem(SESSION_ID_KEY) ?? ""
        const idx = all.findIndex((s) => s.id === id)
        if (idx >= 0) {
          all[idx].messages.push({
            role: "admin",
            text: `Hi ${name.trim()}! 👋 Welcome to LOECHSAR. I'm here to help — what are you working on?`,
            ts: Date.now(),
          })
          saveSessions(all)
          syncMessages()
        }
      }, 1400)
    }, 900)
  }

  const send = (text = input.trim()) => {
    if (!text) return
    pushClientMessage(text)
    setInput("")
    syncMessages()

    setTyping(true)
    setTimeout(() => setTyping(false), 2200)
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105"
        style={{ background: "var(--primary)" }}
      >
        {open
          ? <X className="h-5 w-5 text-white" />
          : <MessageCircle className="h-5 w-5 text-white" />}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-black flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden transition-all duration-400 origin-bottom-right ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{ background: "#050811", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Home screen */}
        {screen === "home" && (
          <div>
            {/* Gradient header */}
            <div className="relative px-6 pt-8 pb-10 overflow-hidden" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #9B7B52 100%)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, rgba(194,164,109,0.28), transparent 60%)" }} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-1">LOECHSAR Support</h3>
                <p className="text-white/55 text-xs">Usually replies in a few minutes</p>
              </div>
            </div>

            {/* Form */}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">LOECHSAR Team</p>
                  <p className="text-[10px] text-white/35">Online now</p>
                </div>
              </div>

              <p className="text-xs text-white/50 mb-4">Enter your details to start the conversation:</p>

              <div className="space-y-3 mb-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 ring-[var(--primary)] transition"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 ring-[var(--primary)] transition"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onKeyDown={(e) => e.key === "Enter" && startChat()}
                />
              </div>

              <button
                onClick={startChat}
                disabled={!name.trim() || !email.trim()}
                className="w-full py-3 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 hover:opacity-90"
                style={{ background: "var(--primary)" }}
              >
                Start Chat <ArrowRight className="h-4 w-4" />
              </button>

              {/* Quick reply buttons */}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Quick questions</p>
                <div className="space-y-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => {
                        if (!name.trim() || !email.trim()) return
                        startChat()
                        setTimeout(() => send(q.text), 2500)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all border border-white/5"
                    >
                      <span>{q.emoji}</span> {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat screen */}
        {screen === "chat" && (
          <div className="flex flex-col h-[520px]">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "var(--primary)" }}>
              <button onClick={() => setScreen("home")} className="text-white/70 hover:text-white transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <span className="text-xs font-black text-white">BL</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">LOECHSAR Team</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-white/60">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "client" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                    style={{
                      background: m.role === "client" ? "var(--primary)" : "rgba(255,255,255,0.08)",
                      color: m.role === "client" ? "#fff" : "rgba(255,255,255,0.82)",
                      borderRadius: m.role === "client" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                        style={{ background: "var(--primary)", animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: "var(--primary)" }}
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
