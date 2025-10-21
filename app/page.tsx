import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
