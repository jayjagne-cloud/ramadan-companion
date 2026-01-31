"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  loadUserData,
  saveUserData,
  generateId,
  type UserData,
  type LowImaanEntry,
  type ForgivenessEntry,
} from "@/lib/storage"
import { Heart, Feather, Trash2, Check, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EmotionalCarePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState<"low" | "forgiveness">("low")
  const [lowEntry, setLowEntry] = useState({ heavyBecause: "", mercyWouldSay: "", smallStep: "" })
  const [forgivenessEntry, setForgivenessEntry] = useState({ person: "", gain: "" })

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
  }, [])

  const handleSaveLowEntry = () => {
    if (!userData || !lowEntry.heavyBecause.trim()) return
    const newEntry: LowImaanEntry = { id: generateId(), ...lowEntry, timestamp: new Date().toISOString() }
    const updatedData = { ...userData, lowImaanEntries: [...userData.lowImaanEntries, newEntry] }
    saveUserData(updatedData)
    setUserData(updatedData)
    setLowEntry({ heavyBecause: "", mercyWouldSay: "", smallStep: "" })
  }

  const handleSaveForgivenessEntry = () => {
    if (!userData || !forgivenessEntry.person.trim()) return
    const newEntry: ForgivenessEntry = {
      id: generateId(),
      ...forgivenessEntry,
      released: false,
      timestamp: new Date().toISOString(),
    }
    const updatedData = { ...userData, forgivenessList: [...userData.forgivenessList, newEntry] }
    saveUserData(updatedData)
    setUserData(updatedData)
    setForgivenessEntry({ person: "", gain: "" })
  }

  const handleRelease = (id: string) => {
    if (!userData) return
    const updatedData = {
      ...userData,
      forgivenessList: userData.forgivenessList.map((entry) =>
        entry.id === id ? { ...entry, released: true } : entry,
      ),
    }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const handleDeleteForgiveness = (id: string) => {
    if (!userData) return
    const updatedData = { ...userData, forgivenessList: userData.forgivenessList.filter((entry) => entry.id !== id) }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  if (!userData) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <BarrkehLogo size={48} />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Emotional Care</h1>
        <p className="font-serif text-2xl text-foreground">For the Heavy Days</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("low")}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg text-center transition-all soft-press border",
            activeTab === "low"
              ? "gold-gradient text-[#0a0e1a] border-transparent"
              : "bg-secondary/50 text-muted-foreground border-primary/20",
          )}
        >
          Low Imaan Days
        </button>
        <button
          onClick={() => setActiveTab("forgiveness")}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg text-center transition-all soft-press border",
            activeTab === "forgiveness"
              ? "gold-gradient text-[#0a0e1a] border-transparent"
              : "bg-secondary/50 text-muted-foreground border-primary/20",
          )}
        >
          Letting Go
        </button>
      </div>

      {/* Low Imaan Tab */}
      {activeTab === "low" && (
        <>
          <Card className="p-5 mb-6 bg-primary/10 border-primary/20 gold-border">
            <p className="text-center text-foreground italic font-serif">
              "This page matters more than most. Because healing happens in the hard moments."
            </p>
          </Card>

          <Card className="p-5 mb-6 bg-card/50 gold-border">
            <h3 className="font-medium text-foreground mb-4">When It Feels Heavy</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Today feels heavy because...</label>
                <Textarea
                  value={lowEntry.heavyBecause}
                  onChange={(e) => setLowEntry({ ...lowEntry, heavyBecause: e.target.value })}
                  placeholder="Let it out. No judgment here."
                  className="min-h-24 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">
                  If Allah were speaking mercy to me right now, it would sound like...
                </label>
                <Textarea
                  value={lowEntry.mercyWouldSay}
                  onChange={(e) => setLowEntry({ ...lowEntry, mercyWouldSay: e.target.value })}
                  placeholder="What would His gentleness tell you?"
                  className="min-h-24 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">One small step back, not forward</label>
                <Textarea
                  value={lowEntry.smallStep}
                  onChange={(e) => setLowEntry({ ...lowEntry, smallStep: e.target.value })}
                  placeholder="What's one tiny thing you can do right now?"
                  className="min-h-16 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
              </div>
              <Button
                onClick={handleSaveLowEntry}
                disabled={!lowEntry.heavyBecause.trim()}
                className="w-full soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Save This Moment
              </Button>
            </div>
          </Card>

          {userData.lowImaanEntries.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Your Journey Through the Hard Days</h4>
              {userData.lowImaanEntries
                .slice(-3)
                .reverse()
                .map((entry) => (
                  <Card key={entry.id} className="p-4 bg-secondary/30 border-primary/10">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-foreground text-sm">{entry.heavyBecause}</p>
                    {entry.mercyWouldSay && (
                      <p className="text-sm text-primary mt-2 italic">Mercy: "{entry.mercyWouldSay}"</p>
                    )}
                  </Card>
                ))}
            </div>
          )}
        </>
      )}

      {/* Forgiveness Tab */}
      {activeTab === "forgiveness" && (
        <>
          <Card className="p-5 mb-6 bg-primary/10 border-primary/20 gold-border">
            <p className="text-center text-foreground italic font-serif">
              "Forgiveness is not about them. It's about freeing your heart."
            </p>
          </Card>

          <Card className="p-5 mb-6 bg-card/50 gold-border">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Feather className="h-5 w-5 text-primary" />
              Release & Let Go
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Who am I holding in my heart?</label>
                <Textarea
                  value={forgivenessEntry.person}
                  onChange={(e) => setForgivenessEntry({ ...forgivenessEntry, person: e.target.value })}
                  placeholder="A name, a situation, a memory..."
                  className="min-h-16 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">What do I gain by releasing this?</label>
                <Textarea
                  value={forgivenessEntry.gain}
                  onChange={(e) => setForgivenessEntry({ ...forgivenessEntry, gain: e.target.value })}
                  placeholder="Peace, freedom, space to grow..."
                  className="min-h-16 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
              </div>
              <Button
                onClick={handleSaveForgivenessEntry}
                disabled={!forgivenessEntry.person.trim()}
                className="w-full soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Release List
              </Button>
            </div>
          </Card>

          {userData.forgivenessList.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Your Release Journey</h4>
              {userData.forgivenessList.map((entry) => (
                <Card
                  key={entry.id}
                  className={cn(
                    "p-4",
                    entry.released ? "bg-primary/10 border-primary/20" : "bg-secondary/30 border-primary/10",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className={cn("text-foreground", entry.released && "line-through opacity-60")}>
                        {entry.person}
                      </p>
                      {entry.gain && <p className="text-sm text-muted-foreground mt-1">To gain: {entry.gain}</p>}
                    </div>
                    <div className="flex gap-2">
                      {!entry.released && (
                        <button
                          onClick={() => handleRelease(entry.id)}
                          className="h-10 w-10 rounded-lg gold-gradient text-[#0a0e1a] flex items-center justify-center soft-press"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteForgiveness(entry.id)}
                        className="h-10 w-10 rounded-lg bg-secondary/50 text-muted-foreground flex items-center justify-center soft-press border border-primary/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {entry.released && (
                    <p className="text-sm text-primary mt-2 italic">
                      Released on{" "}
                      {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Gentle closing */}
      <section className="text-center py-8">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">
          This is where people quietly fall in love with growth.
        </p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
