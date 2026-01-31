"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { loadUserData, saveUserData, type UserData, type SpiritualBaseline } from "@/lib/storage"
import { BookOpen, Check, ArrowRight, Sparkles, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const salahLabels = ["Rarely", "Sometimes", "Often", "Most days", "Always"]

const quranOptions = [
  { value: "haven't-read", label: "I haven't opened it in a while", encouragement: "This month can be your return" },
  { value: "struggle-start", label: "I struggle to start", encouragement: "One ayah is enough to begin" },
  {
    value: "read-disconnected",
    label: "I read but feel disconnected",
    encouragement: "Understanding will come with patience",
  },
  { value: "inconsistent", label: "I'm inconsistent", encouragement: "Consistency over quantity" },
  { value: "beginning", label: "I'm just beginning my journey", encouragement: "Every hafidh started with Alif" },
  {
    value: "daily-connection",
    label: "I have a daily connection",
    encouragement: "May Allah increase your love for it",
  },
]

const emotionalOptions = [
  { value: "exhausted", label: "Exhausted", dua: "Ya Allah, grant me strength" },
  { value: "anxious", label: "Anxious", dua: "Ya Allah, calm my heart" },
  { value: "hopeful", label: "Hopeful", dua: "Ya Allah, fulfill my hopes" },
  { value: "overwhelmed", label: "Overwhelmed", dua: "Ya Allah, ease my burden" },
  { value: "numb", label: "Numb / Disconnected", dua: "Ya Allah, soften my heart" },
  { value: "grateful", label: "Grateful", dua: "Ya Allah, increase my gratitude" },
  { value: "ready", label: "Ready and excited", dua: "Ya Allah, accept my efforts" },
  { value: "uncertain", label: "Uncertain", dua: "Ya Allah, guide my path" },
]

const fearOptions = [
  {
    value: "waste-month",
    label: "That I'll waste this month",
    reassurance: "Your intention to try is already accepted",
  },
  { value: "too-far", label: "That I'm too far from Allah", reassurance: "He is closer to you than your jugular vein" },
  { value: "nothing-change", label: "That nothing will change", reassurance: "Even the smallest shift is victory" },
  { value: "not-forgiven", label: "That I won't be forgiven", reassurance: "His mercy encompasses all things" },
  { value: "cant-sustain", label: "That I can't sustain good habits", reassurance: "Take what you can carry" },
  { value: "not-enough", label: "That I'm not doing enough", reassurance: "Quality over quantity, always" },
  { value: "miss-qadr", label: "That I'll miss Laylatul Qadr", reassurance: "Seek it every odd night with sincerity" },
]

const hopeOptions = [
  { value: "closeness", label: "To feel close to Allah again", promise: "Draw near to Him and He draws near to you" },
  {
    value: "let-go",
    label: "To finally let go of something",
    promise: "Release it to The One who handles all affairs",
  },
  { value: "peace", label: "To find inner peace", promise: "In His remembrance do hearts find rest" },
  { value: "forgiveness", label: "To be forgiven completely", promise: "Ramadan to Ramadan is expiation" },
  { value: "discipline", label: "To build spiritual discipline", promise: "Fasting is a shield" },
  { value: "dua-answered", label: "For a specific dua to be answered", promise: "Call upon Me and I will respond" },
  { value: "better-person", label: "To become a better person", promise: "He loves those who constantly repent" },
  { value: "family-guidance", label: "For my family's guidance", promise: "Pray for them in their absence" },
]

export default function BaselinePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [step, setStep] = useState(0)
  const [baseline, setBaseline] = useState<SpiritualBaseline>({
    salahConsistency: 3,
    quranRelationship: "",
    emotionalState: "",
    spiritualFear: "",
    spiritualHope: "",
    timestamp: "",
  })
  const [saving, setSaving] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [customInput, setCustomInput] = useState(false)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    if (data.baseline) {
      setBaseline(data.baseline)
    }
  }, [])

  const handleSave = () => {
    if (!userData) return

    setSaving(true)

    const updatedBaseline = {
      ...baseline,
      timestamp: new Date().toISOString(),
    }

    const updatedData = {
      ...userData,
      baseline: updatedBaseline,
    }

    saveUserData(updatedData)

    setTimeout(() => {
      setSaving(false)
      router.push("/daily")
    }, 1000)
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return true
      case 1:
        return baseline.quranRelationship.trim().length > 0
      case 2:
        return baseline.emotionalState.trim().length > 0
      case 3:
        return baseline.spiritualFear.trim().length > 0
      case 4:
        return baseline.spiritualHope.trim().length > 0
      default:
        return false
    }
  }

  const handleSelectOption = (value: string, field: keyof SpiritualBaseline) => {
    setBaseline({ ...baseline, [field]: value })
    setShowDropdown(false)
    setCustomInput(false)
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

  // Get encouragement/reassurance based on selection
  const getQuranEncouragement = () => {
    const option = quranOptions.find((o) => o.value === baseline.quranRelationship)
    return option?.encouragement
  }

  const getEmotionalDua = () => {
    const option = emotionalOptions.find((o) => o.value === baseline.emotionalState)
    return option?.dua
  }

  const getFearReassurance = () => {
    const option = fearOptions.find((o) => o.value === baseline.spiritualFear)
    return option?.reassurance
  }

  const getHopePromise = () => {
    const option = hopeOptions.find((o) => o.value === baseline.spiritualHope)
    return option?.promise
  }

  const steps = [
    {
      title: "Salah Consistency",
      subtitle: "Be gentle with yourself. This is just a starting point.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-2xl font-serif gold-text">{salahLabels[baseline.salahConsistency - 1]}</span>
          </div>
          <Slider
            value={[baseline.salahConsistency]}
            onValueChange={(value) => setBaseline({ ...baseline, salahConsistency: value[0] })}
            min={1}
            max={5}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Rarely</span>
            <span>Always</span>
          </div>
          {baseline.salahConsistency <= 2 && (
            <Card className="p-4 bg-primary/5 border-primary/20 text-center">
              <Heart className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground italic">
                "Every prayer you make is a conversation with Allah. Start with one."
              </p>
            </Card>
          )}
        </div>
      ),
    },
    {
      title: "Relationship with Qur'an",
      subtitle: "Where are you with the Book right now?",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          {/* Dropdown Options */}
          <div className="space-y-2">
            {quranOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value, "quranRelationship")}
                className={cn(
                  "w-full p-4 rounded-lg border text-left transition-all",
                  baseline.quranRelationship === option.value
                    ? "bg-primary/10 border-primary/40 text-foreground"
                    : "bg-[#0a0e1a] border-primary/20 text-muted-foreground hover:border-primary/30",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom option */}
          <button
            onClick={() => setCustomInput(true)}
            className={cn(
              "w-full p-4 rounded-lg border text-left transition-all",
              customInput
                ? "bg-primary/10 border-primary/40"
                : "bg-[#0a0e1a] border-primary/20 hover:border-primary/30",
            )}
          >
            <span className="text-muted-foreground">Something else...</span>
          </button>

          {customInput && (
            <Textarea
              value={baseline.quranRelationship}
              onChange={(e) => setBaseline({ ...baseline, quranRelationship: e.target.value })}
              placeholder="Share your own words..."
              className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
          )}

          {/* Encouragement based on selection */}
          {getQuranEncouragement() && (
            <Card className="p-4 bg-primary/5 border-primary/20 text-center">
              <Sparkles className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground italic">{getQuranEncouragement()}</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      title: "Emotional State",
      subtitle: "How is your heart entering this month?",
      icon: <Heart className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          {/* Emotional grid */}
          <div className="grid grid-cols-2 gap-2">
            {emotionalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value, "emotionalState")}
                className={cn(
                  "p-4 rounded-lg border text-center transition-all",
                  baseline.emotionalState === option.value
                    ? "bg-primary/10 border-primary/40 text-foreground"
                    : "bg-[#0a0e1a] border-primary/20 text-muted-foreground hover:border-primary/30",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom option */}
          <button
            onClick={() => setCustomInput(true)}
            className={cn(
              "w-full p-4 rounded-lg border text-center transition-all",
              customInput
                ? "bg-primary/10 border-primary/40"
                : "bg-[#0a0e1a] border-primary/20 hover:border-primary/30",
            )}
          >
            <span className="text-muted-foreground">Express it differently...</span>
          </button>

          {customInput && (
            <Textarea
              value={baseline.emotionalState}
              onChange={(e) => setBaseline({ ...baseline, emotionalState: e.target.value })}
              placeholder="How are you really feeling..."
              className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
          )}

          {/* Dua based on emotion */}
          {getEmotionalDua() && (
            <Card className="p-4 bg-primary/5 border-primary/20 text-center">
              <p className="text-xs text-muted-foreground mb-2">A dua for you</p>
              <p className="text-foreground font-serif">{getEmotionalDua()}</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      title: "One Spiritual Fear",
      subtitle: "What are you afraid of spiritually?",
      icon: <Heart className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {fearOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value, "spiritualFear")}
                className={cn(
                  "w-full p-4 rounded-lg border text-left transition-all",
                  baseline.spiritualFear === option.value
                    ? "bg-primary/10 border-primary/40 text-foreground"
                    : "bg-[#0a0e1a] border-primary/20 text-muted-foreground hover:border-primary/30",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCustomInput(true)}
            className={cn(
              "w-full p-4 rounded-lg border text-left transition-all",
              customInput
                ? "bg-primary/10 border-primary/40"
                : "bg-[#0a0e1a] border-primary/20 hover:border-primary/30",
            )}
          >
            <span className="text-muted-foreground">Something else weighs on me...</span>
          </button>

          {customInput && (
            <Textarea
              value={baseline.spiritualFear}
              onChange={(e) => setBaseline({ ...baseline, spiritualFear: e.target.value })}
              placeholder="What you're afraid of..."
              className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
          )}

          {/* Reassurance */}
          {getFearReassurance() && (
            <Card className="p-4 bg-primary/5 border-primary/20 text-center">
              <Sparkles className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground italic">{getFearReassurance()}</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      title: "One Spiritual Hope",
      subtitle: "What are you hoping for?",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {hopeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value, "spiritualHope")}
                className={cn(
                  "w-full p-4 rounded-lg border text-left transition-all",
                  baseline.spiritualHope === option.value
                    ? "bg-primary/10 border-primary/40 text-foreground"
                    : "bg-[#0a0e1a] border-primary/20 text-muted-foreground hover:border-primary/30",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCustomInput(true)}
            className={cn(
              "w-full p-4 rounded-lg border text-left transition-all",
              customInput
                ? "bg-primary/10 border-primary/40"
                : "bg-[#0a0e1a] border-primary/20 hover:border-primary/30",
            )}
          >
            <span className="text-muted-foreground">My hope is different...</span>
          </button>

          {customInput && (
            <Textarea
              value={baseline.spiritualHope}
              onChange={(e) => setBaseline({ ...baseline, spiritualHope: e.target.value })}
              placeholder="What you're hoping for..."
              className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
            />
          )}

          {/* Promise */}
          {getHopePromise() && (
            <Card className="p-4 bg-primary/5 border-primary/20 text-center">
              <p className="text-xs text-muted-foreground mb-2">Allah's promise</p>
              <p className="text-foreground font-serif italic">"{getHopePromise()}"</p>
            </Card>
          )}
        </div>
      ),
    },
  ]

  const currentStep = steps[step]

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Spiritual Baseline</h1>
        <p className="font-serif text-2xl text-foreground">Before Day 1</p>
        <p className="text-sm text-muted-foreground mt-2 italic font-serif">
          This becomes powerful when you look back and see the shift.
        </p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Progress - gold gradient */}
      <div className="flex gap-2 mb-6">
        {steps.map((s, index) => (
          <div
            key={index}
            className={cn("h-1 flex-1 rounded-full transition-colors", index <= step ? "gold-gradient" : "bg-border")}
          />
        ))}
      </div>

      {/* Current Step */}
      <Card className="p-6 mb-6 bg-card/50 gold-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {currentStep.icon}
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-foreground">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
          </div>
        </div>
        {currentStep.content}
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              setStep(step - 1)
              setCustomInput(false)
            }}
            className="flex-1 h-12 border-primary/30 text-foreground hover:bg-primary/10"
          >
            Back
          </Button>
        )}

        {step < steps.length - 1 ? (
          <Button
            onClick={() => {
              setStep(step + 1)
              setCustomInput(false)
            }}
            disabled={!canProceed()}
            className="flex-1 h-12 soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            disabled={!canProceed() || saving}
            className="flex-1 h-12 soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
          >
            {saving ? (
              <>
                <BarrkehLogo size={16} className="mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Complete Baseline
              </>
            )}
          </Button>
        )}
      </div>

      {/* Existing baseline notice */}
      {userData.baseline && (
        <Card className="p-4 mt-6 bg-primary/5 border-primary/20">
          <p className="text-sm text-center text-foreground">
            You completed your baseline on{" "}
            {new Date(userData.baseline.timestamp).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
            . Updating it will create a new snapshot.
          </p>
        </Card>
      )}
    </PageWrapper>
  )
}
