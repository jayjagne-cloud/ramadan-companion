"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { loadUserData, saveUserData, type UserData, type LaylatulQadrEntry } from "@/lib/storage"
import { lastTenNights } from "@/lib/ramadan-data"
import { Sparkles, Moon, Check, ChevronDown, ChevronUp, Heart, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LaylatulQadrPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedNight, setSelectedNight] = useState(21)
  const [entry, setEntry] = useState<Partial<LaylatulQadrEntry>>({
    dua: "",
    letterToAllah: "",
    tahajjud: { performed: false, presenceLevel: 3 },
  })
  const [showSavedDuas, setShowSavedDuas] = useState(false)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    const existingEntry = data.laylatulQadrEntries[selectedNight]
    if (existingEntry) {
      setEntry(existingEntry)
    } else {
      setEntry({ dua: "", letterToAllah: "", tahajjud: { performed: false, presenceLevel: 3 } })
    }
  }, [selectedNight])

  const handleSave = () => {
    if (!userData) return
    const fullEntry: LaylatulQadrEntry = {
      night: selectedNight,
      dua: entry.dua || "",
      letterToAllah: entry.letterToAllah,
      tahajjud: entry.tahajjud || { performed: false, presenceLevel: 3 },
      timestamp: new Date().toISOString(),
    }
    const updatedData = {
      ...userData,
      laylatulQadrEntries: { ...userData.laylatulQadrEntries, [selectedNight]: fullEntry },
    }
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

  const nightInfo = lastTenNights.find((n) => n.night === selectedNight)
  const presenceLabels = ["Distracted", "Struggling", "Present", "Focused", "Immersed"]

  const tonightDuas = userData.vaults.duaVault.filter((d) => d.useTonight)
  const allSavedDuas = userData.vaults.duaVault

  return (
    <PageWrapper>
      {/* Header - Sacred styling */}
      <section className="py-8 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="relative inline-block mb-4">
          <div className="h-16 w-16 rounded-full border border-primary/30 flex items-center justify-center sacred-glow">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Nights of Power</h1>
        <p className="font-serif text-2xl text-foreground">The Last Ten Nights</p>
        <p className="arabic-text text-xl text-foreground mt-3">لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ</p>
        <p className="text-sm text-muted-foreground italic mt-1">"Better than a thousand months"</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Night Selector */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        {lastTenNights.map((night) => {
          const isSelected = night.night === selectedNight
          const hasEntry = userData.laylatulQadrEntries[night.night]
          const isOdd = night.night % 2 === 1
          return (
            <button
              key={night.night}
              onClick={() => setSelectedNight(night.night)}
              className={cn(
                "min-w-14 py-3 rounded-lg text-center transition-all soft-press border",
                isSelected && "gold-gradient text-[#0a0e1a] border-transparent",
                !isSelected && isOdd && "bg-primary/10 text-foreground border-primary/20",
                !isSelected && !isOdd && "bg-secondary/50 text-foreground border-primary/20",
                hasEntry && !isSelected && "ring-1 ring-primary/50",
              )}
            >
              <Moon className={cn("h-4 w-4 mx-auto mb-1", isSelected ? "text-[#0a0e1a]" : "text-primary")} />
              <span className="block text-xs opacity-70">Night</span>
              <span className="block font-medium">{night.night}</span>
            </button>
          )
        })}
      </div>

      {/* Night Focus */}
      {nightInfo && (
        <Card className="p-5 mb-4 bg-primary/10 border-primary/20 gold-border">
          <p className="text-sm text-muted-foreground mb-2">Tonight's Focus</p>
          <p className="font-serif text-lg text-foreground">{nightInfo.focus}</p>
        </Card>
      )}

      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <button
          onClick={() => setShowSavedDuas(!showSavedDuas)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium text-foreground">Replay Saved Duas</span>
              {tonightDuas.length > 0 && (
                <p className="text-xs text-primary">{tonightDuas.length} marked for tonight</p>
              )}
            </div>
          </div>
          {showSavedDuas ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </button>

        {showSavedDuas && (
          <div className="mt-4 space-y-3">
            {tonightDuas.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">For Tonight</p>
                {tonightDuas.map((dua) => (
                  <Card key={dua.id} className="p-3 mb-2 bg-primary/10 border-primary/30">
                    {dua.arabic && (
                      <p className="arabic-text text-lg text-foreground mb-1 text-right" dir="rtl">
                        {dua.arabic}
                      </p>
                    )}
                    <p className="text-sm text-foreground">{dua.content}</p>
                  </Card>
                ))}
              </div>
            )}

            {allSavedDuas.length > 0 ? (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">All Saved Duas</p>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {allSavedDuas.map((dua) => (
                    <Card key={dua.id} className="p-3 bg-secondary/30 border-primary/10">
                      <p className="text-sm text-foreground">
                        {dua.content.slice(0, 100)}
                        {dua.content.length > 100 ? "..." : ""}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(dua.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No saved duas yet. Save duas from your daily reflections to replay them here.
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Dua Space */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Your Dua Tonight
        </h3>
        <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
          <p className="arabic-text text-lg text-foreground text-center mb-2">اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي</p>
          <p className="text-sm text-center text-muted-foreground italic">
            "O Allah, You are the Pardoner and love to pardon, so pardon me"
          </p>
        </div>
        {nightInfo && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Suggested focus:</p>
            <p className="text-foreground italic">"{nightInfo.dua}"</p>
          </div>
        )}
        <Textarea
          value={entry.dua || ""}
          onChange={(e) => setEntry({ ...entry, dua: e.target.value })}
          placeholder="Pour your heart here... What are you asking for tonight?"
          className="min-h-32 text-base resize-none bg-[#0a0e1a] border-primary/20"
        />
      </Card>

      {/* Letter to Allah */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <h3 className="font-medium text-foreground mb-2">If Tonight is Laylatul Qadr...</h3>
        <p className="text-sm text-muted-foreground mb-4">A letter to Allah</p>
        <Textarea
          value={entry.letterToAllah || ""}
          onChange={(e) => setEntry({ ...entry, letterToAllah: e.target.value })}
          placeholder="Ya Allah, if You are listening tonight, I want You to know..."
          className="min-h-40 text-base resize-none bg-[#0a0e1a] border-primary/20"
        />
      </Card>

      {/* Tahajjud Tracker */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <BarrkehLogo size={20} />
          Tahajjud Tonight
        </h3>
        <button
          onClick={() =>
            setEntry({ ...entry, tahajjud: { ...entry.tahajjud!, performed: !entry.tahajjud?.performed } })
          }
          className={cn(
            "w-full h-12 rounded-lg flex items-center justify-center gap-2 transition-all soft-press mb-4 border",
            entry.tahajjud?.performed
              ? "gold-gradient text-[#0a0e1a] border-transparent"
              : "bg-secondary/50 text-muted-foreground border-primary/20",
          )}
        >
          {entry.tahajjud?.performed ? (
            <>
              <Check className="h-5 w-5" />
              <span>Tahajjud Offered</span>
            </>
          ) : (
            <span>Mark Tahajjud</span>
          )}
        </button>

        {entry.tahajjud?.performed && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">How present were you?</p>
              <div className="text-center mb-2">
                <span className="font-serif text-lg gold-text">
                  {presenceLabels[(entry.tahajjud?.presenceLevel || 3) - 1]}
                </span>
              </div>
              <Slider
                value={[entry.tahajjud?.presenceLevel || 3]}
                onValueChange={(value) =>
                  setEntry({ ...entry, tahajjud: { ...entry.tahajjud!, presenceLevel: value[0] } })
                }
                min={1}
                max={5}
                step={1}
                className="py-4"
              />
            </div>
            <Textarea
              value={entry.tahajjud?.reflection || ""}
              onChange={(e) => setEntry({ ...entry, tahajjud: { ...entry.tahajjud!, reflection: e.target.value } })}
              placeholder="How did it feel to stand tonight?"
              className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
          </div>
        )}
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full h-12 mb-6 soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
      >
        <Check className="h-4 w-4 mr-2" />
        Save Night {selectedNight}
      </Button>

      {/* Sacred closing */}
      <section className="text-center py-6">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">No fireworks. Just depth.</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
