"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Billboard } from "./billboards-store"

interface CartContextType {
  items: Billboard[]
  add: (b: Billboard) => void
  remove: (id: number) => void
  clear: () => void
  has: (id: number) => boolean
}

const CartContext = createContext<CartContextType | null>(null)

const CART_KEY = "bl_billboard_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Billboard[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const persist = (next: Billboard[]) => {
    setItems(next)
    localStorage.setItem(CART_KEY, JSON.stringify(next))
  }

  const add = useCallback((b: Billboard) => {
    setItems((prev) => {
      if (prev.find((x) => x.id === b.id)) return prev
      const next = [...prev, b]
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const remove = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.id !== id)
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clear = useCallback(() => persist([]), [])

  const has = useCallback((id: number) => items.some((x) => x.id === id), [items])

  return (
    <CartContext.Provider value={{ items, add, remove, clear, has }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
