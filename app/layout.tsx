import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Preloader } from "@/components/preloader"
import { ChatWidget } from "@/components/chat-widget"
import { CartProvider } from "@/lib/cart-context"
import { BriefCartBar } from "@/components/brief-cart-bar"

export const metadata: Metadata = {
  title: "LO ECHSAR - Structured Brand System",
  description:
    "Lo Echsar is a structured brand system. We define, design, and deploy brands across environments with precision.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/logo.PNG", type: "image/png" }],
  },
  openGraph: {
    title: "LO ECHSAR - Structured Brand System",
    description: "Lo Echsar is a structured brand system. We define, design, and deploy brands across environments with precision.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CartProvider>
            <Preloader />
            {children}
            <BriefCartBar />
            <ChatWidget />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
