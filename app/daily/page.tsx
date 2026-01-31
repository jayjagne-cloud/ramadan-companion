"use client"

import type React from "react"

import { Suspense, useCallback, useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  loadUserData,
  saveUserData,
  getHijriDate,
  generateId,
  type UserData,
  type DailyEntry,
  type VaultItem,
} from "@/lib/storage"
import { dailyContent, moodOptions } from "@/lib/ramadan-data"
import { DaySelector } from "@/components/daily/day-selector"
import { SalahTracker } from "@/components/daily/salah-tracker"
import { FastingReflection } from "@/components/daily/fasting-reflection"
import {
  Calendar,
  BookOpen,
  Star,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Check,
  Book,
  Sun,
  Anchor,
  Archive,
} from "lucide-react"
import { cn } from "@/lib/utils"

function DailyPageContent() {
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedDay, setSelectedDay] = useState(1)
  const initialLoadDone = useRef(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dhikr: true,
    ayah: true,
    name: true,
    dua: true,
    mood: true,
    ihsaan: true,
    nuur: false,
    salah: false,
    quran: false,
    fasting: false,
  })

  useEffect(() => {
    if (initialLoadDone.current) return
    initialLoadDone.current = true

    const data = loadUserData()
    setUserData(data)

    const dayParam = searchParams.get("day")
    if (dayParam) {
      setSelectedDay(Number.parseInt(dayParam))
    } else {
      setSelectedDay(data.currentDay || 1)
    }
  }, []) // Empty dependency array - only run once on mount

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const dayEntry = useMemo((): DailyEntry => {
    return (
      userData?.dailyEntries[selectedDay] || {
        day: selectedDay,
        date: new Date().toISOString(),
        savedAyah: false,
        ihsaanCompleted: false,
        salah: {
          fajr: { prayed: false, present: false },
          dhuhr: { prayed: false, present: false },
          asr: { prayed: false, present: false },
          maghrib: { prayed: false, present: false },
          isha: { prayed: false, present: false },
          taraweeh: { prayed: false, present: false },
          witr: { prayed: false, present: false },
        },
      }
    )
  }, [userData, selectedDay])

  const updateDayEntry = useCallback(
    (updates: Partial<DailyEntry>) => {
      setUserData((prevUserData) => {
        if (!prevUserData) return prevUserData

        const currentEntry = prevUserData.dailyEntries[selectedDay] || {
          day: selectedDay,
          date: new Date().toISOString(),
          savedAyah: false,
          ihsaanCompleted: false,
          salah: {
            fajr: { prayed: false, present: false },
            dhuhr: { prayed: false, present: false },
            asr: { prayed: false, present: false },
            maghrib: { prayed: false, present: false },
            isha: { prayed: false, present: false },
            taraweeh: { prayed: false, present: false },
            witr: { prayed: false, present: false },
          },
        }

        const updatedEntry = { ...currentEntry, ...updates }

        const updatedData = {
          ...prevUserData,
          dailyEntries: {
            ...prevUserData.dailyEntries,
            [selectedDay]: updatedEntry,
          },
          currentDay: Math.max(prevUserData.currentDay, selectedDay),
        }

        saveUserData(updatedData)
        return updatedData
      })
    },
    [selectedDay],
  )

  const updateQuranProgress = useCallback(
    (pages: number) => {
      setUserData((prevUserData) => {
        if (!prevUserData) return prevUserData
        const updatedData = {
          ...prevUserData,
          quranProgress: {
            ...prevUserData.quranProgress,
            [selectedDay]: pages,
          },
        }
        saveUserData(updatedData)
        return updatedData
      })
    },
    [selectedDay],
  )

  const setAsAnchor = useCallback((type: "ayah" | "name" | "dua", content: string, arabic?: string) => {
    setUserData((prevUserData) => {
      if (!prevUserData) return prevUserData
      const updatedData = {
        ...prevUserData,
        todayAnchor: {
          type,
          content,
          arabic,
          timestamp: new Date().toISOString(),
        },
      }
      saveUserData(updatedData)
      return updatedData
    })
  }, [])

  const saveToVault = useCallback(
    (vault: "duaVault" | "ayahVault", content: string, arabic?: string, reference?: string) => {
      setUserData((prevUserData) => {
        if (!prevUserData) return prevUserData
        const item: VaultItem = {
          id: generateId(),
          content,
          arabic,
          reference,
          tags: [`Day ${selectedDay}`],
          timestamp: new Date().toISOString(),
          useTonight: false,
          dayNumber: selectedDay,
        }
        const updatedData = {
          ...prevUserData,
          vaults: {
            ...prevUserData.vaults,
            [vault]: [...prevUserData.vaults[vault], item],
          },
        }
        saveUserData(updatedData)
        return updatedData
      })
    },
    [selectedDay],
  )

  const handleSalahUpdate = useCallback(
    (salahData: DailyEntry["salah"]) => {
      updateDayEntry({ salah: salahData })
    },
    [updateDayEntry],
  )

  const handleFastingUpdate = useCallback(
    (updates: Partial<Pick<DailyEntry, "fastingHard" | "fastingSoftened">>) => {
      updateDayEntry(updates)
    },
    [updateDayEntry],
  )

  if (!userData) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full gold-gradient animate-pulse" />
            <p className="text-muted-foreground">Loading your journey...</p>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const content = dailyContent[selectedDay - 1] || dailyContent[0] // Adjusted index access
  const quranPagesRead = userData.quranProgress[selectedDay] || 0
  const totalQuranPages = Object.values(userData.quranProgress).reduce((a, b) => a + b, 0)
  const khatmProgress = Math.min((totalQuranPages / 604) * 100, 100)

  const CollapsibleSection = ({
    id,
    title,
    icon: Icon,
    children,
    badge,
  }: {
    id: string
    title: string
    icon: React.ElementType
    children: React.ReactNode
    badge?: string
  }) => (
    <Card className="bg-card/60 border-primary/20 overflow-hidden">
      <button onClick={() => toggleSection(id)} className="w-full p-4 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{title}</span>
          {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">{badge}</span>}
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {expandedSections[id] && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </Card>
  )

  const hijriDate = getHijriDate(selectedDay) // Pass selectedDay to getHijriDate if it supports it

  return (
    <PageWrapper>
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-primary text-sm tracking-widest uppercase">Daily Barakah</p>
            <h1 className="text-2xl font-serif text-foreground">Day {selectedDay} of Ramadan</h1>
            <p className="text-sm text-muted-foreground">{hijriDate}</p>
          </div>

          {/* Day Selector */}
          <DaySelector currentDay={selectedDay} onSelectDay={setSelectedDay} maxDay={30} />

          {/* Soft Progress Indicator */}
          <Card className="bg-card/60 border-primary/20 p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Today's light is building</span>
                <span className="text-primary">{Math.round((selectedDay / 30) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full gold-gradient rounded-full transition-all duration-500"
                  style={{ width: `${(selectedDay / 30) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Morning Dhikr */}
          <CollapsibleSection id="dhikr" title="Morning Dhikr" icon={Sun}>
            <div className="bg-[#0a0e1a] rounded-lg p-4 border border-primary/10">
              <p className="text-xl text-center font-arabic text-primary leading-relaxed mb-3">
                {content.morningDhikr.arabic}
              </p>
              <p className="text-sm text-center text-foreground mb-2">{content.morningDhikr.transliteration}</p>
              <p className="text-xs text-center text-muted-foreground italic">{content.morningDhikr.meaning}</p>
            </div>
            <Button
              variant={dayEntry.morningDhikrDone ? "secondary" : "outline"}
              onClick={() => updateDayEntry({ morningDhikrDone: !dayEntry.morningDhikrDone })}
              className={cn(
                "w-full soft-press",
                dayEntry.morningDhikrDone ? "gold-gradient text-[#0a0e1a] border-0" : "border-primary/30",
              )}
            >
              {dayEntry.morningDhikrDone ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Barakah Claimed
                </>
              ) : (
                "I've Said This Today"
              )}
            </Button>
          </CollapsibleSection>

          {/* Daily Ayah */}
          <CollapsibleSection
            id="ayah"
            title="Daily Ayah"
            icon={BookOpen}
            badge={dayEntry.savedAyah ? "Saved" : undefined}
          >
            <div className="space-y-4">
              <div className="bg-[#0a0e1a] rounded-lg p-4 border border-primary/10">
                <p className="text-xl text-center font-arabic text-primary leading-relaxed mb-3">
                  {content.ayah.arabic}
                </p>
                <p className="text-sm text-center text-foreground mb-2">{content.ayah.translation}</p>
                <p className="text-xs text-center text-muted-foreground">{content.ayah.reference}</p>
              </div>

              {/* Tafsir */}
              <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                <p className="text-xs text-primary mb-1 uppercase tracking-wide">Brief Tafsir</p>
                <p className="text-sm text-muted-foreground">{content.ayah.tafsir}</p>
              </div>

              {/* Reflection */}
              <Textarea
                value={dayEntry.ayahReflection || ""}
                onChange={(e) => updateDayEntry({ ayahReflection: e.target.value })}
                placeholder="What does this ayah stir in you?"
                className="min-h-20 bg-[#0a0e1a] border-primary/20 resize-none"
              />

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAsAnchor("ayah", content.ayah.translation, content.ayah.arabic)}
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Anchor className="h-3 w-3 mr-2" />
                  Set as Anchor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    saveToVault("ayahVault", content.ayah.translation, content.ayah.arabic, content.ayah.reference)
                    updateDayEntry({ savedAyah: true })
                  }}
                  disabled={dayEntry.savedAyah}
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Archive className="h-3 w-3 mr-2" />
                  {dayEntry.savedAyah ? "Saved" : "Save to Vault"}
                </Button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Name of Allah */}
          <CollapsibleSection id="name" title="Name of Allah" icon={Star}>
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-3xl font-arabic text-primary">{content.nameOfAllah.arabic}</p>
                <p className="text-lg font-medium text-foreground">{content.nameOfAllah.name}</p>
                <p className="text-sm text-muted-foreground">{content.nameOfAllah.meaning}</p>
              </div>

              <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                <p className="text-sm text-muted-foreground italic text-center">{content.nameOfAllah.reflection}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setAsAnchor(
                    "name",
                    `${content.nameOfAllah.name} - ${content.nameOfAllah.meaning}`,
                    content.nameOfAllah.arabic,
                  )
                }
                className="w-full border-primary/30 text-primary hover:bg-primary/10"
              >
                <Anchor className="h-3 w-3 mr-2" />
                Set as Today's Anchor
              </Button>
            </div>
          </CollapsibleSection>

          {/* Dua Prompt */}
          <CollapsibleSection id="dua" title="Dua Prompt" icon={Heart} badge={content.duaPrompt.theme}>
            <div className="space-y-4">
              <div className="bg-secondary/30 rounded-lg p-4 border border-primary/10">
                <p className="text-sm text-foreground text-center italic">"{content.duaPrompt.prompt}"</p>
              </div>

              <Textarea
                value={dayEntry.duaResponse || ""}
                onChange={(e) => updateDayEntry({ duaResponse: e.target.value })}
                placeholder="Write your dua here... speak to Allah"
                className="min-h-24 bg-[#0a0e1a] border-primary/20 resize-none"
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAsAnchor("dua", content.duaPrompt.prompt)}
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Anchor className="h-3 w-3 mr-2" />
                  Set as Anchor
                </Button>
                {dayEntry.duaResponse && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => saveToVault("duaVault", dayEntry.duaResponse || "", undefined, `Day ${selectedDay}`)}
                    className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Archive className="h-3 w-3 mr-2" />
                    Save to Vault
                  </Button>
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* Mood Check-in */}
          <CollapsibleSection id="mood" title="How is your heart today?" icon={Sparkles}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => updateDayEntry({ mood: mood.value })}
                    className={cn(
                      "p-3 rounded-lg border text-sm text-left transition-all",
                      dayEntry.mood === mood.value
                        ? "gold-gradient text-[#0a0e1a] border-transparent"
                        : "bg-secondary/30 border-primary/20 text-foreground hover:border-primary/40",
                    )}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>

              {dayEntry.mood && (
                <Textarea
                  value={dayEntry.moodNote || ""}
                  onChange={(e) => updateDayEntry({ moodNote: e.target.value })}
                  placeholder="Anything you want to note about how you're feeling?"
                  className="min-h-16 bg-[#0a0e1a] border-primary/20 resize-none"
                />
              )}
            </div>
          </CollapsibleSection>

          {/* Act of Ihsaan */}
          <CollapsibleSection
            id="ihsaan"
            title="One Act of Ihsaan"
            icon={Heart}
            badge={dayEntry.ihsaanCompleted ? "Done" : undefined}
          >
            <div className="space-y-4">
              <div className="bg-secondary/30 rounded-lg p-4 border border-primary/10">
                <p className="text-sm text-foreground text-center">{content.ihsaan}</p>
              </div>

              <button
                onClick={() => updateDayEntry({ ihsaanCompleted: !dayEntry.ihsaanCompleted })}
                className={cn(
                  "w-full p-4 rounded-lg border flex items-center justify-center gap-3 transition-all",
                  dayEntry.ihsaanCompleted
                    ? "gold-gradient text-[#0a0e1a] border-transparent"
                    : "bg-secondary/30 border-primary/20 text-foreground hover:border-primary/40",
                )}
              >
                {dayEntry.ihsaanCompleted ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Alhamdulillah, I managed this</span>
                  </>
                ) : (
                  <span>Today I managed this</span>
                )}
              </button>

              {dayEntry.ihsaanCompleted && (
                <Textarea
                  value={dayEntry.ihsaanNote || ""}
                  onChange={(e) => updateDayEntry({ ihsaanNote: e.target.value })}
                  placeholder="How did it feel?"
                  className="min-h-16 bg-[#0a0e1a] border-primary/20 resize-none"
                />
              )}
            </div>
          </CollapsibleSection>

          {/* Nuur Moment */}
          <CollapsibleSection id="nuur" title="Nuur Moment" icon={Sparkles}>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                What small moment of light did you witness today? A kind word, a quiet blessing, a gentle sign?
              </p>
              <Textarea
                value={dayEntry.nuurMoment || ""}
                onChange={(e) => updateDayEntry({ nuurMoment: e.target.value })}
                placeholder="Today I noticed..."
                className="min-h-20 bg-[#0a0e1a] border-primary/20 resize-none"
              />

              {dayEntry.nuurMoment && dayEntry.nuurMoment.length > 20 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!userData) return
                    const item: VaultItem = {
                      id: generateId(),
                      content: dayEntry.nuurMoment || "",
                      tags: [`Day ${selectedDay}`, "Nuur"],
                      timestamp: new Date().toISOString(),
                      useTonight: false,
                      dayNumber: selectedDay, // Ensure dayNumber is set
                    }
                    const updatedData = {
                      ...userData,
                      vaults: {
                        ...userData.vaults,
                        nuurVault: [...userData.vaults.nuurVault, item],
                      },
                    }
                    saveUserData(updatedData)
                    setUserData(updatedData)
                  }}
                  className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Save to Nuur Vault
                </Button>
              )}
            </div>
          </CollapsibleSection>

          {/* Salah Tracker */}
          <CollapsibleSection id="salah" title="Salah & Presence" icon={Calendar}>
            <SalahTracker salah={dayEntry.salah} onUpdate={handleSalahUpdate} />
          </CollapsibleSection>

          {/* Quran Progress */}
          <CollapsibleSection id="quran" title="Quran Journey" icon={Book}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Pages read today:</span>
                <Input
                  type="number"
                  min={0}
                  max={30} // Assuming max pages per day is 30 for simplicity, adjust if needed
                  value={quranPagesRead}
                  onChange={(e) => updateQuranProgress(Number.parseInt(e.target.value) || 0)}
                  className="w-20 bg-[#0a0e1a] border-primary/20 text-center"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Journey to Khatm</span>
                  <span className="text-primary">{totalQuranPages}/604 pages</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full gold-gradient rounded-full transition-all duration-500"
                    style={{ width: `${khatmProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {khatmProgress >= 100
                    ? "MashaAllah, you've completed a Khatm!"
                    : // Calculate pages per day needed, assuming 30 days total
                      `${Math.ceil((604 - totalQuranPages) / (30 - selectedDay + 1))} pages/day to complete`}
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Fasting Reflection */}
          <CollapsibleSection id="fasting" title="Fasting Reflection" icon={BookmarkCheck}>
            <FastingReflection
              hard={dayEntry.fastingHard || ""}
              softened={dayEntry.fastingSoftened || ""}
              onUpdate={handleFastingUpdate}
            />
          </CollapsibleSection>

          {/* Auto-save indicator */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              Your reflections are saved automatically
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default function DailyPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto relative">
                <Image
                  src="/images/33df7b37-1a2e-432a-8029.jpeg"
                  alt="Barrkeh DigiProducts"
                  fill
                  className="object-contain animate-pulse"
                />
              </div>
              <p className="text-muted-foreground">Loading your journey...</p>
            </div>
          </div>
        </PageWrapper>
      }
    >
      <DailyPageContent />
    </Suspense>
  )
}
