"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star, Plus, X, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface WatchlistItem {
  id: number
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  type: "stock" | "crypto" | "forex" | "commodity"
}

const initialWatchlist: WatchlistItem[] = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 182.31, change: -3.82, changePercent: -2.05, type: "stock" },
  { id: 2, symbol: "TSLA", name: "Tesla Inc.", price: 248.5, change: 14.5, changePercent: 6.2, type: "stock" },
  { id: 3, symbol: "BTC", name: "Bitcoin", price: 67234, change: 3312, changePercent: 5.18, type: "crypto" },
  { id: 4, symbol: "ETH", name: "Ethereum", price: 3512, change: 168, changePercent: 5.02, type: "crypto" },
  {
    id: 5,
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    price: 1.0842,
    change: -0.0033,
    changePercent: -0.3,
    type: "forex",
  },
  { id: 6, symbol: "GOLD", name: "Gold Spot", price: 2156, change: 38, changePercent: 1.79, type: "commodity" },
]

const availableAssets = [
  { symbol: "NVDA", name: "NVIDIA Corp", type: "stock" },
  { symbol: "MSFT", name: "Microsoft Corp", type: "stock" },
  { symbol: "GOOGL", name: "Alphabet Inc", type: "stock" },
  { symbol: "SOL", name: "Solana", type: "crypto" },
  { symbol: "ADA", name: "Cardano", type: "crypto" },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", type: "forex" },
  { symbol: "SILVER", name: "Silver Spot", type: "commodity" },
]

export function WatchlistContent() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter((item) => item.id !== id))
  }

  const addToWatchlist = (asset: (typeof availableAssets)[0]) => {
    const newItem: WatchlistItem = {
      id: Date.now(),
      symbol: asset.symbol,
      name: asset.name,
      price: Math.random() * 1000 + 100,
      change: Math.random() * 20 - 10,
      changePercent: Math.random() * 10 - 5,
      type: asset.type as WatchlistItem["type"],
    }
    setWatchlist([...watchlist, newItem])
    setIsDialogOpen(false)
  }

  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "stock":
        return "bg-chart-1/10 text-chart-1"
      case "crypto":
        return "bg-chart-2/10 text-chart-2"
      case "forex":
        return "bg-chart-3/10 text-chart-3"
      case "commodity":
        return "bg-chart-4/10 text-chart-4"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">My Watchlist</h1>
          <p className="text-muted-foreground">Track your favorite assets in one place</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Watchlist</DialogTitle>
              <DialogDescription>Select an asset to add to your watchlist</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              {availableAssets.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => addToWatchlist(asset)}
                  className="w-full flex items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
                >
                  <div>
                    <p className="font-semibold">{asset.symbol}</p>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                  <Badge variant="outline" className={getTypeColor(asset.type)}>
                    {asset.type}
                  </Badge>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search watchlist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredWatchlist.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Star className="h-6 w-6 fill-primary text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{item.symbol}</h3>
                      <Badge variant="outline" className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {item.type === "crypto" || item.type === "commodity" ? "$" : ""}
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <div
                      className={`flex items-center gap-1 justify-end text-sm font-medium ${
                        item.change >= 0 ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)} ({item.changePercent >= 0 ? "+" : ""}
                      {item.changePercent.toFixed(2)}%)
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(item.id)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove from watchlist</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWatchlist.length === 0 && (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No assets found matching your search."
                : "Your watchlist is empty. Add some assets to get started."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
