"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

const categories = ["All", "Markets", "Crypto", "Forex", "Commodities", "Economy"]

const newsArticles = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Cuts in 2024",
    description:
      "The Federal Reserve indicated a shift in monetary policy, suggesting possible interest rate reductions as inflation shows signs of cooling.",
    category: "Economy",
    time: "2 hours ago",
    source: "Financial Times",
    impact: "high",
    trending: "up",
  },
  {
    id: 2,
    title: "Bitcoin Surges Past $67,000 on ETF Optimism",
    description:
      "Cryptocurrency markets rally as institutional investors show renewed interest following positive regulatory developments.",
    category: "Crypto",
    time: "4 hours ago",
    source: "CoinDesk",
    impact: "high",
    trending: "up",
  },
  {
    id: 3,
    title: "Tech Stocks Lead Market Rally Amid AI Boom",
    description:
      "Major technology companies see significant gains as artificial intelligence investments continue to drive market sentiment.",
    category: "Markets",
    time: "5 hours ago",
    source: "Bloomberg",
    impact: "medium",
    trending: "up",
  },
  {
    id: 4,
    title: "Gold Prices Reach New Highs on Economic Uncertainty",
    description:
      "Precious metals attract safe-haven flows as investors hedge against potential market volatility and geopolitical tensions.",
    category: "Commodities",
    time: "6 hours ago",
    source: "Reuters",
    impact: "medium",
    trending: "up",
  },
  {
    id: 5,
    title: "Euro Weakens Against Dollar on ECB Policy Outlook",
    description:
      "The European Central Bank's dovish stance puts pressure on the euro as divergence with Fed policy becomes more apparent.",
    category: "Forex",
    time: "8 hours ago",
    source: "Wall Street Journal",
    impact: "medium",
    trending: "down",
  },
  {
    id: 6,
    title: "Oil Prices Stabilize After OPEC+ Production Decision",
    description:
      "Energy markets find equilibrium following the cartel's announcement to maintain current production levels through Q2.",
    category: "Commodities",
    time: "10 hours ago",
    source: "CNBC",
    impact: "low",
    trending: "up",
  },
]

export function NewsContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredNews =
    selectedCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Financial News</h1>
        <p className="text-muted-foreground">Stay updated with the latest market developments</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredNews.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={article.impact === "high" ? "default" : "secondary"}>{article.category}</Badge>
                    {article.impact === "high" && (
                      <Badge variant="outline" className="gap-1">
                        {article.trending === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        High Impact
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight text-balance">{article.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3" />
                {article.time} • {article.source}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.description}</p>
              <Button variant="ghost" size="sm" className="w-fit gap-2">
                Read More
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">No news articles found in this category.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
