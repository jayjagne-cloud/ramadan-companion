"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Card } from "@/components/ui/card"
import { loadUserData, type UserData } from "@/lib/storage"
import { moodOptions } from "@/lib/ramadan-data"
import { Calendar, Bookmark, Heart, Sparkles, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TimelinePage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    setUserData(loadUserData())
  }, [])

  if (!userData) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <BarrkehLogo size={48} />
        </div>
      </PageWrapper>
    )
  }

  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const getWeekTheme = (day: number) => {
    if (day <= 7) return { theme: "Tawbah", color: "text-rose-400" }
    if (day <= 14) return { theme: "Taqwa", color: "text-emerald-400" }
    if (day <= 21) return { theme: "Yaqeen", color: "text-blue-400" }
    return { theme: "Nuur", color: "text-amber-400" }
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Your Journey</h1>
        <p className="font-serif text-xl text-foreground">Ramadan Timeline</p>
        <p className="text-sm text-muted-foreground mt-2">Tap any day to revisit</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Summary Stats */}
      <Card className="p-4 mb-6 bg-primary/10 border-primary/30 gold-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-serif gold-text">{Object.keys(userData.dailyEntries).length}</p>
            <p className="text-xs text-muted-foreground">Days Journaled</p>
          </div>
          <div>
            <p className="text-2xl font-serif gold-text">{Object.values(userData.vaults).flat().length}</p>
            <p className="text-xs text-muted-foreground">Items Saved</p>
          </div>
          <div>
            <p className="text-2xl font-serif gold-text">{Object.keys(userData.laylatulQadrEntries).length}</p>
            <p className="text-xs text-muted-foreground">Sacred Nights</p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="space-y-2">
        {days.map((day) => {
          const entry = userData.dailyEntries[day]
          const weekInfo = getWeekTheme(day)
          const mood = entry?.mood
          const moodInfo = moodOptions.find((m) => m.value === mood)
          const hasSavedAyah = entry?.savedAyah
          const hasIhsaan = entry?.ihsaanCompleted
          const hasNuur = entry?.nuurMoment
          const isLast10 = day >= 21
          const qadrEntry = userData.laylatulQadrEntries[day]

          return (
            <Link key={day} href={`/daily?day=${day}`}>
              <Card
                className={cn(
                  "p-4 transition-all hover:border-primary/40 soft-press",
                  entry ? "bg-card/50 gold-border" : "bg-card/20 border-primary/10",
                  isLast10 && "border-l-2 border-l-primary/50",
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Day Number */}
                  <div
                    className={cn(
                      "h-12 w-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0",
                      entry ? "gold-gradient" : "bg-secondary/50",
                    )}
                  >
                    <span className={cn("text-xs", entry ? "text-[#0a0e1a]/70" : "text-muted-foreground")}>Day</span>
                    <span className={cn("text-lg font-bold", entry ? "text-[#0a0e1a]" : "text-foreground")}>{day}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs font-medium", weekInfo.color)}>{weekInfo.theme}</span>
                      {isLast10 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Last 10</span>
                      )}
                    </div>

                    {entry ? (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {moodInfo && <span>{moodInfo.label}</span>}
                        {hasSavedAyah && <Bookmark className="h-3 w-3 text-emerald-400" />}
                        {hasIhsaan && <Heart className="h-3 w-3 text-rose-400" />}
                        {hasNuur && <Sparkles className="h-3 w-3 text-amber-400" />}
                        {qadrEntry && <span className="text-primary">Night written</span>}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Not yet journaled</p>
                    )}
                  </div>

                  <ChevronRight className="h-5 w-5 text-primary/40 flex-shrink-0" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <section className="text-center py-8">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">"Your story, unfolding day by day"</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
