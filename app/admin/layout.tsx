import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#030612" }}>
      <AdminSidebar />
      <div className="lg:pl-60">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  )
}
