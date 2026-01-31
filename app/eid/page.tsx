"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { loadUserData, saveUserData, generateId, type UserData, type EidReflection, type SavedDua } from "@/lib/storage"
import { postEidDays } from "@/lib/ramadan-data"
import { Sun, Sparkles, BookOpen, Check, ChevronDown, ChevronUp, Heart, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EidPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedPostDay, setSelectedPostDay] = useState(1)
  const [expandedSections, setExpandedSections] = useState({
    eidReflection: true,
    postEid: false,
    letter: false,
    duas: false,
  })
  const [eidForm, setEidForm] = useState<Partial<EidReflection>>({ changed: "", proudOf: "", preserve: "" })
  const [letterContent, setLetterContent] = useState("")
  const [postResponse, setPostResponse] = useState("")
  const [newDua, setNewDua] = useState("")

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    if (data.eidReflection) setEidForm(data.eidReflection)
    if (data.letterFromRamadan) setLetterContent(data.letterFromRamadan)
    if (data.postEidEntries[selectedPostDay]) setPostResponse(data.postEidEntries[selectedPostDay].response)
  }, [selectedPostDay])

  const handleSaveEidReflection = () => {
    if (!userData) return
    const reflection: EidReflection = {
      changed: eidForm.changed || "",
      proudOf: eidForm.proudOf || "",
      preserve: eidForm.preserve || "",
      timestamp: new Date().toISOString(),
    }
    saveUserData({ ...userData, eidReflection: reflection })
    setUserData({ ...userData, eidReflection: reflection })
  }

  const handleSavePostDay = () => {
    if (!userData) return
    const updatedData = {
      ...userData,
      postEidEntries: {
        ...userData.postEidEntries,
        [selectedPostDay]: { day: selectedPostDay, response: postResponse, timestamp: new Date().toISOString() },
      },
    }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const handleSaveLetter = () => {
    if (!userData) return
    saveUserData({ ...userData, letterFromRamadan: letterContent })
    setUserData({ ...userData, letterFromRamadan: letterContent })
  }

  const handleAddDua = () => {
    if (!userData || !newDua.trim()) return
    const dua: SavedDua = {
      id: generateId(),
      text: newDua.trim(),
      source: "manual",
      timestamp: new Date().toISOString(),
    }
    const updatedData = { ...userData, savedDuas: [...userData.savedDuas, dua] }
    saveUserData(updatedData)
    setUserData(updatedData)
    setNewDua("")
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
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

  const currentPostDay = postEidDays[selectedPostDay - 1]

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Sun className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Eid & Beyond</h1>
        <p className="font-serif text-2xl text-foreground">Carrying the Light Forward</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Eid Day Reflection */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <button
          onClick={() => toggleSection("eidReflection")}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Eid Day Reflection</span>
          </div>
          {expandedSections.eidReflection ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {expandedSections.eidReflection && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground italic">Not just celebration. Reflection.</p>
            <div>
              <label className="block text-sm text-foreground mb-2">What did Ramadan change in me?</label>
              <Textarea
                value={eidForm.changed || ""}
                onChange={(e) => setEidForm({ ...eidForm, changed: e.target.value })}
                placeholder="The shift I can feel..."
                className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">What am I proud of?</label>
              <Textarea
                value={eidForm.proudOf || ""}
                onChange={(e) => setEidForm({ ...eidForm, proudOf: e.target.value })}
                placeholder="Even the small victories..."
                className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">What do I want Allah to preserve?</label>
              <Textarea
                value={eidForm.preserve || ""}
                onChange={(e) => setEidForm({ ...eidForm, preserve: e.target.value })}
                placeholder="The light I found..."
                className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
              />
            </div>
            <Button
              onClick={handleSaveEidReflection}
              className="w-full soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Eid Reflection
            </Button>
          </div>
        )}
      </Card>

      {/* 6 Days After Eid */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <button onClick={() => toggleSection("postEid")} className="flex items-center justify-between w-full text-left">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">6 Days After Eid</span>
          </div>
          {expandedSections.postEid ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {expandedSections.postEid && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4 italic">
              Gently transition back into life without losing the sweetness.
            </p>
            <div className="flex gap-2 mb-4">
              {postEidDays.map((day, index) => {
                const dayNum = index + 1
                const isSelected = dayNum === selectedPostDay
                const hasEntry = userData.postEidEntries[dayNum]
                return (
                  <button
                    key={dayNum}
                    onClick={() => {
                      setSelectedPostDay(dayNum)
                      setPostResponse(userData.postEidEntries[dayNum]?.response || "")
                    }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-center transition-all soft-press border",
                      isSelected
                        ? "gold-gradient text-[#0a0e1a] border-transparent"
                        : "bg-secondary/50 text-foreground border-primary/20",
                      hasEntry && !isSelected && "ring-1 ring-primary/50",
                    )}
                  >
                    <span className="block text-xs">{dayNum}</span>
                  </button>
                )
              })}
            </div>
            <Card className="p-4 bg-primary/10 border-primary/20 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Day {selectedPostDay}</p>
              <h4 className="font-serif text-lg gold-text mb-2">{currentPostDay.theme}</h4>
              <p className="text-sm text-muted-foreground italic">{currentPostDay.reflection}</p>
            </Card>
            <div>
              <label className="block text-sm text-foreground mb-2">{currentPostDay.prompt}</label>
              <Textarea
                value={postResponse}
                onChange={(e) => setPostResponse(e.target.value)}
                placeholder="Your reflection..."
                className="min-h-24 text-base resize-none bg-[#0a0e1a] border-primary/20"
              />
            </div>
            <Button
              onClick={handleSavePostDay}
              className="w-full mt-4 soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Day {selectedPostDay}
            </Button>
          </div>
        )}
      </Card>

      {/* Letter From Ramadan */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <button onClick={() => toggleSection("letter")} className="flex items-center justify-between w-full text-left">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Letter From Ramadan</span>
          </div>
          {expandedSections.letter ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {expandedSections.letter && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground italic">A reflective close.</p>
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <p className="font-serif text-foreground">"If Ramadan could speak to me, it would say..."</p>
            </div>
            <Textarea
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              placeholder="Dear one, this month I watched you..."
              className="min-h-40 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
            <Button
              onClick={handleSaveLetter}
              className="w-full soft-press gold-gradient text-[#0a0e1a] font-semibold border-0"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Letter
            </Button>
          </div>
        )}
      </Card>

      {/* Dua Bank */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <button onClick={() => toggleSection("duas")} className="flex items-center justify-between w-full text-left">
          <div className="flex items-center gap-3">
            <BarrkehLogo size={20} />
            <span className="font-medium text-foreground">Dua Bank</span>
          </div>
          {expandedSections.duas ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {expandedSections.duas && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground italic">
              Saved duas from the month. Because people forget how deeply they asked.
            </p>
            <div className="flex gap-2">
              <Textarea
                value={newDua}
                onChange={(e) => setNewDua(e.target.value)}
                placeholder="Add a dua to remember..."
                className="min-h-16 text-base resize-none flex-1 bg-[#0a0e1a] border-primary/20"
              />
              <Button
                onClick={handleAddDua}
                disabled={!newDua.trim()}
                size="icon"
                className="h-auto soft-press gold-gradient text-[#0a0e1a] border-0"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            {userData.savedDuas.length > 0 && (
              <div className="space-y-3 mt-4 pt-4 border-t border-primary/20">
                <h4 className="text-sm font-medium text-foreground">Your Saved Duas</h4>
                {userData.savedDuas.map((dua) => (
                  <Card key={dua.id} className="p-3 bg-primary/10 border-primary/20">
                    <p className="text-foreground text-sm">{dua.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(dua.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </Card>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Ayahs you saved during daily reflections also appear here.
            </p>
          </div>
        )}
      </Card>

      {/* Closing */}
      <section className="text-center py-8">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif mb-2">
          "May the barakah of this month stay with you always."
        </p>
        <p className="arabic-text text-lg text-foreground">تقبل الله منا ومنكم</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>

      {/* Footer branding */}
      <footer className="py-6 text-center border-t border-primary/10">
        <BarrkehLogo size={40} className="mx-auto mb-3" />
        <p className="luxury-text text-xs gold-text mb-1">Barrkeh DigiProducts</p>
        <p className="text-xs text-muted-foreground">Premium Islamic Resources</p>
      </footer>
    </PageWrapper>
  )
}
