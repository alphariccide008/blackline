"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  getBillboards, addBillboard, updateBillboard, deleteBillboard,
  type Billboard,
} from "@/lib/billboards-store"
import {
  Plus, Pencil, Trash2, X, Check, MapPin,
  ToggleLeft, ToggleRight, Search,
} from "lucide-react"

const EMPTY: Omit<Billboard, "id"> = {
  title: "", location: "", state: "", type: "Unipole / Monopole",
  size: "", impressions: "", facing: "Single-faced", illuminated: false,
  available: true, image: "", views: "", badge: "Available", features: [],
}

const TYPES   = ["Unipole / Monopole","LED Digital Screen","Gantry / Bridge","Wall Drape / Wrap","Rooftop Billboard","Transit / Bus Shelter","Airport Advertising","Mall / Indoor"]
const STATES  = ["Lagos","FCT - Abuja","Rivers","Kano","Edo","Cross River","Anambra","Ogun","Oyo","Delta","Imo","Enugu","Plateau","Kaduna"]
const FACINGS = ["Single-faced","Dual-faced","Overhead","Indoor","Multiple"]
const BADGES  = ["Top Pick","Digital","Premium","Hot Deal","New","Available"]

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/40 mb-1.5">
        {label} {required && <span className="text-[#4B73D4]">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/20"

export default function AdminBillboards() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [boards, setBoards] = useState<Billboard[]>([])
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState<{ mode: "add" | "edit"; data: Billboard | Omit<Billboard,"id"> } | null>(null)
  const [delTarget, setDelTarget] = useState<Billboard | null>(null)
  const [saving, setSaving] = useState(false)
  const [featInput, setFeatInput] = useState("")

  useEffect(() => {
    if (localStorage.getItem("bl_admin_auth") !== "true") {
      router.replace("/admin/login")
      return
    }
    setReady(true)
    setBoards(getBillboards())
  }, [router])

  const reload = () => setBoards(getBillboards())

  const openAdd = () => {
    setFeatInput("")
    setModal({ mode: "add", data: { ...EMPTY } })
  }

  const openEdit = (b: Billboard) => {
    setFeatInput("")
    setModal({ mode: "edit", data: { ...b } })
  }

  const handleSave = () => {
    if (!modal) return
    const d = modal.data
    if (!d.title || !d.location || !d.state || !d.size || !d.impressions || !d.image) return
    setSaving(true)
    setTimeout(() => {
      if (modal.mode === "add") {
        addBillboard(d as Omit<Billboard,"id">)
      } else {
        updateBillboard(d as Billboard)
      }
      reload()
      setModal(null)
      setSaving(false)
    }, 400)
  }

  const handleDelete = () => {
    if (!delTarget) return
    deleteBillboard(delTarget.id)
    reload()
    setDelTarget(null)
  }

  const toggleAvailable = (b: Billboard) => {
    updateBillboard({ ...b, available: !b.available })
    reload()
  }

  const addFeature = () => {
    const f = featInput.trim()
    if (!f || !modal) return
    const cur = (modal.data.features ?? [])
    setModal({ ...modal, data: { ...modal.data, features: [...cur, f] } })
    setFeatInput("")
  }

  const removeFeature = (idx: number) => {
    if (!modal) return
    const cur = [...(modal.data.features ?? [])]
    cur.splice(idx, 1)
    setModal({ ...modal, data: { ...modal.data, features: cur } })
  }

  const update = (key: keyof Omit<Billboard,"id">, val: unknown) => {
    if (!modal) return
    setModal({ ...modal, data: { ...modal.data, [key]: val } })
  }

  const filtered = boards.filter((b) => {
    if (!search) return true
    const q = search.toLowerCase()
    return b.title.toLowerCase().includes(q) || b.location.toLowerCase().includes(q)
  })

  if (!ready) return null

  return (
    <div className="p-6 lg:p-10 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Billboards</h1>
          <p className="text-white/35 text-sm mt-1">{boards.length} locations in inventory</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
          style={{ background: "#082A7B" }}
        >
          <Plus className="h-4 w-4" /> Add Billboard
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
        <input
          type="text"
          placeholder="Search billboards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Billboard","Location","Type","Impressions","Status","Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-white/25 font-bold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="admin-row-hover transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={b.image} alt={b.title} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="text-sm font-black text-white/90">{b.title}</p>
                        <p className="text-[10px] text-white/30">{b.size} · {b.badge}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#4B73D4" }} />
                      <span className="text-xs text-white/55 whitespace-nowrap">{b.location}</span>
                    </div>
                    <p className="text-[10px] text-white/25 mt-0.5">{b.state}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-white/45 whitespace-nowrap">{b.type}</td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-white/70">{b.impressions}</p>
                    <p className="text-[10px] text-white/25">{b.views} monthly</p>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleAvailable(b)}
                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: b.available ? "#4ade80" : "rgba(237,237,237,0.3)" }}
                    >
                      {b.available
                        ? <ToggleRight className="h-5 w-5 text-green-400" />
                        : <ToggleLeft className="h-5 w-5 text-white/25" />
                      }
                      {b.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(b)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/8"
                      >
                        <Pencil className="h-3.5 w-3.5 text-white/40" />
                      </button>
                      <button
                        onClick={() => setDelTarget(b)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400/50" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/25 text-sm">No billboards found</div>
          )}
        </div>
      </div>

      {/* Add/Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
            style={{ background: "#111115", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/6 sticky top-0" style={{ background: "#111115", zIndex: 1 }}>
              <h2 className="text-base font-black text-white">
                {modal.mode === "add" ? "Add Billboard" : "Edit Billboard"}
              </h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                <X className="h-4 w-4 text-white/50" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Title" required>
                  <input className={inputCls} placeholder="e.g. Lekki-Epe Expressway Unipole" value={modal.data.title} onChange={(e) => update("title", e.target.value)} />
                </FormField>
                <FormField label="Location" required>
                  <input className={inputCls} placeholder="e.g. Lekki Phase 1, Lagos" value={modal.data.location} onChange={(e) => update("location", e.target.value)} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="State" required>
                  <select className={inputCls} value={modal.data.state} onChange={(e) => update("state", e.target.value)} style={{ background: "#17171C" }}>
                    <option value="">Select state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Type">
                  <select className={inputCls} value={modal.data.type} onChange={(e) => update("type", e.target.value)} style={{ background: "#17171C" }}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <FormField label="Size" required>
                  <input className={inputCls} placeholder="48ft × 24ft" value={modal.data.size} onChange={(e) => update("size", e.target.value)} />
                </FormField>
                <FormField label="Impressions" required>
                  <input className={inputCls} placeholder="85,000/day" value={modal.data.impressions} onChange={(e) => update("impressions", e.target.value)} />
                </FormField>
                <FormField label="Views">
                  <input className={inputCls} placeholder="2.4M" value={modal.data.views} onChange={(e) => update("views", e.target.value)} />
                </FormField>
                <FormField label="Badge">
                  <select className={inputCls} value={modal.data.badge} onChange={(e) => update("badge", e.target.value)} style={{ background: "#17171C" }}>
                    {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Facing">
                  <select className={inputCls} value={modal.data.facing} onChange={(e) => update("facing", e.target.value)} style={{ background: "#17171C" }}>
                    {FACINGS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </FormField>
                <FormField label="Image URL" required>
                  <input className={inputCls} placeholder="https://images.unsplash.com/..." value={modal.data.image} onChange={(e) => update("image", e.target.value)} />
                </FormField>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className={`w-10 h-5 rounded-full relative transition-colors ${modal.data.illuminated ? "bg-[#082A7B]" : "bg-white/10"}`}
                    onClick={() => update("illuminated", !modal.data.illuminated)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${modal.data.illuminated ? "left-5" : "left-0.5"}`} />
                  </div>
                  <span className="text-xs text-white/50 font-semibold">Illuminated</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className={`w-10 h-5 rounded-full relative transition-colors ${modal.data.available ? "bg-green-600" : "bg-white/10"}`}
                    onClick={() => update("available", !modal.data.available)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${modal.data.available ? "left-5" : "left-0.5"}`} />
                  </div>
                  <span className="text-xs text-white/50 font-semibold">Available</span>
                </label>
              </div>

              {/* Features */}
              <FormField label="Features">
                <div className="flex gap-2 mb-2">
                  <input
                    className={inputCls}
                    placeholder="e.g. Illuminated (24hrs)"
                    value={featInput}
                    onChange={(e) => setFeatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
                  />
                  <button onClick={addFeature} className="px-3 py-2 rounded-xl text-xs font-black text-white flex-shrink-0 hover:opacity-90 transition-opacity" style={{ background: "#082A7B" }}>
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(modal.data.features ?? []).map((f, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(75,115,212,0.15)", color: "#4B73D4", border: "1px solid rgba(75,115,212,0.25)" }}>
                      {f}
                      <button onClick={() => removeFeature(i)} className="hover:text-white transition-colors">
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </FormField>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/6 sticky bottom-0" style={{ background: "#111115" }}>
              <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/40 hover:text-white/70 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !modal.data.title || !modal.data.location || !modal.data.state || !modal.data.size || !modal.data.impressions || !modal.data.image}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black text-white disabled:opacity-40 transition-all hover:opacity-90"
                style={{ background: "#082A7B" }}
              >
                {saving ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Check className="h-4 w-4" />}
                {modal.mode === "add" ? "Add Billboard" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {delTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDelTarget(null)} />
          <div className="relative w-full max-w-sm rounded-2xl p-6" style={{ background: "#111115", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-base font-black text-white mb-2">Delete Billboard?</h3>
            <p className="text-sm text-white/40 mb-6">
              &ldquo;{delTarget.title}&rdquo; will be permanently removed from the inventory.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDelTarget(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/40 hover:text-white/70 transition-colors border border-white/10">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl text-sm font-black text-white bg-red-600/80 hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
