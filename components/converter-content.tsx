"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 149.5 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", rate: 0.88 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.53 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
]

const popularPairs = [
  { from: "USD", to: "EUR", rate: 0.92 },
  { from: "USD", to: "GBP", rate: 0.79 },
  { from: "EUR", to: "USD", rate: 1.09 },
  { from: "GBP", to: "USD", rate: 1.27 },
]

export function ConverterContent() {
  const [amount, setAmount] = useState("1000")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)

  const handleConvert = () => {
    const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1
    const converted = (Number.parseFloat(amount) / fromRate) * toRate
    setResult(converted)
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Currency Converter</h1>
        <p className="text-muted-foreground">Convert between major world currencies</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Convert Currency</CardTitle>
              <CardDescription>Enter amount and select currencies to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr]">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger id="from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end pb-2">
                  <Button variant="outline" size="icon" onClick={handleSwap}>
                    <ArrowDownUp className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger id="to">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleConvert} className="w-full" size="lg">
                Convert
              </Button>

              {result !== null && (
                <div className="rounded-lg bg-muted p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Converted Amount</p>
                  <p className="text-3xl font-bold">
                    {currencies.find((c) => c.code === toCurrency)?.symbol}
                    {result.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Pairs</CardTitle>
              <CardDescription>Quick access to common conversions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularPairs.map((pair) => (
                <button
                  key={`${pair.from}-${pair.to}`}
                  onClick={() => {
                    setFromCurrency(pair.from)
                    setToCurrency(pair.to)
                    setResult(null)
                  }}
                  className="w-full flex items-center justify-between rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent"
                >
                  <span className="font-medium">
                    {pair.from}/{pair.to}
                  </span>
                  <span className="text-sm text-muted-foreground">{pair.rate.toFixed(4)}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchange Rates</CardTitle>
              <CardDescription>Current rates vs USD</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {currencies.slice(1, 5).map((currency) => (
                <div key={currency.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                      {currency.symbol}
                    </div>
                    <span className="font-medium">{currency.code}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{currency.rate.toFixed(4)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
