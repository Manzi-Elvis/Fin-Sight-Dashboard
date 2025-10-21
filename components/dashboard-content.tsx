"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"

const marketData = [
  { time: "9:00", value: 4750 },
  { time: "10:00", value: 4765 },
  { time: "11:00", value: 4758 },
  { time: "12:00", value: 4772 },
  { time: "13:00", value: 4768 },
  { time: "14:00", value: 4783 },
]

const cryptoData = [
  { time: "9:00", btc: 64200, eth: 3420 },
  { time: "10:00", btc: 65100, eth: 3450 },
  { time: "11:00", btc: 64800, eth: 3435 },
  { time: "12:00", btc: 66200, eth: 3480 },
  { time: "13:00", btc: 66800, eth: 3495 },
  { time: "14:00", btc: 67234, eth: 3512 },
]

const topMovers = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$875.28", change: "+8.4%", positive: true },
  { symbol: "TSLA", name: "Tesla Inc", price: "$248.50", change: "+6.2%", positive: true },
  { symbol: "AAPL", name: "Apple Inc", price: "$182.31", change: "-2.1%", positive: false },
  { symbol: "MSFT", name: "Microsoft Corp", price: "$420.55", change: "+3.7%", positive: true },
]

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Market Overview</h1>
        <p className="text-muted-foreground">Real-time financial data and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,783.45</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bitcoin</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,234</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EUR/USD</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.0842</div>
            <p className="text-xs text-destructive flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -0.3% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gold</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,156</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +1.8% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>S&P 500 Today</CardTitle>
            <CardDescription>Intraday performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={marketData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[4740, 4790]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrency Performance</CardTitle>
            <CardDescription>BTC & ETH intraday trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cryptoData}>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="btc"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  name="Bitcoin"
                />
                <Line
                  type="monotone"
                  dataKey="eth"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="Ethereum"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Movers</CardTitle>
          <CardDescription>Stocks with significant price changes today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMovers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-mono text-sm font-semibold">
                    {stock.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stock.price}</p>
                  <p
                    className={`text-sm flex items-center gap-1 justify-end ${
                      stock.positive ? "text-accent" : "text-destructive"
                    }`}
                  >
                    {stock.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
