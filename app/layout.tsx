import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Preloader } from "@/components/preloader"
import { ChatWidget } from "@/components/chat-widget"

export const metadata: Metadata = {
  title: "BLACKLINE — Precision Over Noise",
  description:
    "A full-spectrum brand and growth company. We build, position, and activate brands across every environment in which they exist.",
  openGraph: {
    title: "BLACKLINE — Precision Over Noise",
    description: "Brand strategy, identity systems, outdoor advertising, and full-spectrum growth activation.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Preloader />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
