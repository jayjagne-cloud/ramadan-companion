"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { loadUserData, saveUserData, generateId, type UserData, type CharityEntry } from "@/lib/storage"
import { weeklyThemes, charityTypes } from "@/lib/ramadan-data"
import { Star, Heart, Check, Eye, EyeOff, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WeeklyPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [responses, setResponses] = useState<string[]>(["", "", ""])
  const [showCharity, setShowCharity] = useState(true)
  const [charityNote, setCharityNote] = useState("")
  const [selectedCharityType, setSelectedCharityType] = useState<string | null>(null)
  const [hideCharity, setHideCharity] = useState(false)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    const weekReflection = data.weeklyReflections[selectedWeek]
    if (weekReflection) {
      setResponses(weekReflection.responses)
    }
  }, [selectedWeek])

  const handleSaveReflection = () => {
    if (!userData) return
    const updatedData = {
      ...userData,
      weeklyReflections: {
        ...userData.weeklyReflections,
        [selectedWeek]: {
          week: selectedWeek,
          responses,
          timestamp: new Date().toISOString(),
        },
      },
    }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const handleAddCharity = () => {
    if (!userData || !selectedCharityType) return
    const newEntry: CharityEntry = {
      id: generateId(),
      type: selectedCharityType,
      note: charityNote,
      hidden: hideCharity,
      timestamp: new Date().toISOString(),
    }
    const updatedData = {
      ...userData,
      charityLog: [...userData.charityLog, newEntry],
    }
    saveUserData(updatedData)
    setUserData(updatedData)
    setCharityNote("")
    setSelectedCharityType(null)
    setHideCharity(false)
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

  const currentTheme = weeklyThemes[selectedWeek - 1]
  const visibleCharities = userData.charityLog.filter((c) => !c.hidden)
  const hiddenCount = userData.charityLog.filter((c) => c.hidden).length

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Star className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Weekly Muraqabah</h1>
        <p className="font-serif text-2xl text-foreground">Self-Awareness & Growth</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Week Selector */}
      <div className="flex gap-2 mb-6">
        {weeklyThemes.map((theme, index) => {
          const week = index + 1
          const isSelected = week === selectedWeek
          const hasReflection = userData.weeklyReflections[week]
          return (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={cn(
                "flex-1 py-3 px-2 rounded-lg text-center transition-all soft-press border",
                isSelected
                  ? "gold-gradient text-[#0a0e1a] border-transparent"
                  : "bg-secondary/50 text-foreground border-primary/20",
                hasReflection && !isSelected && "ring-1 ring-primary/30",
              )}
            >
              <span className="block text-xs opacity-70">Week</span>
              <span className="block font-medium">{week}</span>
            </button>
          )
        })}
      </div>

      {/* Weekly Theme */}
      <Card className="p-6 mb-6 bg-primary/10 border-primary/20 gold-border">
        <div className="text-center mb-4">
          <p className="arabic-text text-2xl text-foreground mb-2">{currentTheme.arabicTitle}</p>
          <h2 className="font-serif text-xl font-medium gold-text">{currentTheme.title}</h2>
        </div>
        <p className="text-foreground text-center italic">{currentTheme.theme}</p>
      </Card>

      {/* Reflection Prompts */}
      <Card className="p-5 mb-6 bg-card/50 gold-border">
        <h3 className="font-medium text-foreground mb-4">Week {selectedWeek} Reflections</h3>
        <div className="space-y-4">
          {currentTheme.prompts.map((prompt, index) => (
            <div key={index}>
              <label className="block text-sm text-foreground mb-2">{prompt}</label>
              <Textarea
                value={responses[index] || ""}
                onChange={(e) => {
                  const newResponses = [...responses]
                  newResponses[index] = e.target.value
                  setResponses(newResponses)
                }}
                placeholder="Reflect here..."
                className="min-h-24 text-base resize-none bg-[#0a0e1a] border-primary/20"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleSaveReflection}
          className="w-full h-12 mt-4 soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
        >
          <Check className="h-4 w-4 mr-2" />
          Save Week {selectedWeek} Reflections
        </Button>
      </Card>

      {/* Charity & Generosity Log */}
      <Card className="p-5 mb-6 bg-card/50 gold-border">
        <button onClick={() => setShowCharity(!showCharity)} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Charity & Generosity</span>
          </div>
          {showCharity ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {showCharity && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Not just money. Time, patience, kindness, silence...</p>
            <div className="grid grid-cols-3 gap-2">
              {charityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedCharityType(type.id === selectedCharityType ? null : type.id)}
                  className={cn(
                    "p-3 rounded-lg text-center transition-all border",
                    selectedCharityType === type.id
                      ? "gold-gradient text-[#0a0e1a] border-transparent"
                      : "bg-secondary/50 text-muted-foreground border-primary/20",
                  )}
                >
                  <span className="block text-lg mb-1">{type.icon}</span>
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>

            {selectedCharityType && (
              <div className="space-y-3">
                <Textarea
                  value={charityNote}
                  onChange={(e) => setCharityNote(e.target.value)}
                  placeholder="What did you give? (Optional)"
                  className="min-h-16 text-base resize-none bg-[#0a0e1a] border-primary/20"
                />
                <button
                  onClick={() => setHideCharity(!hideCharity)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors border",
                    hideCharity
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-secondary/50 text-muted-foreground border-primary/20",
                  )}
                >
                  {hideCharity ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>Hidden Charity</span>
                </button>
                <p className="text-xs text-muted-foreground">Some deeds are meant to stay private.</p>
                <Button
                  onClick={handleAddCharity}
                  className="w-full soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log This Act
                </Button>
              </div>
            )}

            {visibleCharities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-primary/20">
                <h4 className="text-sm font-medium text-foreground mb-3">Your Acts of Generosity</h4>
                <div className="space-y-2">
                  {visibleCharities.slice(-5).map((entry) => {
                    const type = charityTypes.find((t) => t.id === entry.type)
                    return (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 p-2 bg-secondary/30 rounded-lg border border-primary/10"
                      >
                        <span className="text-lg">{type?.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-foreground">{type?.label}</span>
                          {entry.note && <p className="text-xs text-muted-foreground truncate">{entry.note}</p>}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {hiddenCount > 0 && (
              <p className="text-xs text-center text-muted-foreground italic">
                + {hiddenCount} hidden {hiddenCount === 1 ? "act" : "acts"} between you and Allah
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Gentle reminder */}
      <section className="text-center py-6">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">Where growth becomes visible.</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
