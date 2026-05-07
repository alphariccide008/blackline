"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, ChevronRight } from "lucide-react"

export function BriefCartBar() {
  const { items } = useCart()

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-lg"
        >
          <Link
            href="/billboards/brief"
            className="flex items-center justify-between gap-4 px-6 py-4 rounded-2xl text-white shadow-2xl group"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #ECD9B8 100%)",
              border: "1px solid rgba(194,164,109,0.45)",
              boxShadow: "0 20px 60px rgba(194,164,109,0.18), 0 0 0 1px rgba(194,164,109,0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Icon with pulse ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-white/10 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-white/15">
                  <ShoppingBag className="h-4 w-4" style={{ color: "var(--primary)" }} />
                </div>
              </div>

              <div>
                <p className="text-xs font-black leading-tight">
                  {items.length} billboard{items.length !== 1 ? "s" : ""} selected
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Tap to create your brief
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-black group-hover:gap-2.5 transition-all duration-200">
              Create Brief
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
