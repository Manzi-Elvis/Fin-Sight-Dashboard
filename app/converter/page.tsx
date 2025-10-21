import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ConverterContent } from "@/components/converter-content"

export default function ConverterPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <ConverterContent />
        </main>
      </div>
    </div>
  )
}
