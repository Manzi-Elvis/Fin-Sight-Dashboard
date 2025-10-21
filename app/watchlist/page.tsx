import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WatchlistContent } from "@/components/watchlist-content"

export default function WatchlistPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <WatchlistContent />
        </main>
      </div>
    </div>
  )
}
