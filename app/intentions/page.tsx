"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { loadUserData, saveUserData, generateId, type Intention, type UserData } from "@/lib/storage"
import { Heart, RefreshCw, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const intentionPrompts = [
  {
    type: "why" as const,
    question: "Why am I entering Ramadan this year?",
    placeholder: "What is calling me to this month...",
  },
  {
    type: "asking" as const,
    question: "What am I asking Allah for that I haven't said out loud?",
    placeholder: "The unspoken prayer in my heart...",
  },
  {
    type: "release" as const,
    question: "What do I need to let go of?",
    placeholder: "What I'm ready to release...",
  },
]

export default function IntentionsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
  }, [])

  const currentPrompt = intentionPrompts[currentPromptIndex]

  const handleSave = () => {
    if (!inputValue.trim() || !userData) return

    setSaving(true)

    const newIntention: Intention = {
      id: generateId(),
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
      type: currentPrompt.type,
    }

    const updatedData = {
      ...userData,
      intentions: [...userData.intentions, newIntention],
    }

    saveUserData(updatedData)
    setUserData(updatedData)
    setInputValue("")

    setTimeout(() => {
      setSaving(false)
      if (currentPromptIndex < intentionPrompts.length - 1) {
        setCurrentPromptIndex(currentPromptIndex + 1)
      }
    }, 500)
  }

  const getIntentionsByType = (type: Intention["type"]) => {
    return userData?.intentions.filter((i) => i.type === type) || []
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
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
        <h1 className="luxury-text text-sm gold-text mb-2">Intentions Hub</h1>
        <p className="font-serif text-2xl text-foreground">Niyyah Reset</p>
        <p className="text-sm text-muted-foreground mt-2 italic font-serif">
          A living space for your intentions. Return here anytime.
        </p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Current Prompt */}
      <Card className="p-6 mb-6 bg-card/50 gold-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {intentionPrompts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromptIndex(index)}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors",
                  index === currentPromptIndex ? "gold-gradient" : "bg-border",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {currentPromptIndex + 1} of {intentionPrompts.length}
          </span>
        </div>

        <h2 className="font-serif text-xl font-medium text-foreground mb-4">{currentPrompt.question}</h2>

        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentPrompt.placeholder}
          className="min-h-32 text-base resize-none bg-[#0a0e1a] border-primary/20 mb-4"
        />

        <Button
          onClick={handleSave}
          disabled={!inputValue.trim() || saving}
          className="w-full h-12 soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
        >
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Save This Intention
            </>
          )}
        </Button>
      </Card>

      {/* Return to This - for low days */}
      {userData.intentions.length > 0 && (
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20 gold-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">For the days when it feels hard</p>
            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="soft-press border-primary/30 text-primary hover:bg-primary/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Return to My Intentions
            </Button>
          </div>
        </Card>
      )}

      {/* Intention History */}
      {userData.intentions.length > 0 && (
        <section className="mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full py-3 text-left"
          >
            <span className="font-medium text-foreground">Your Intentions Journey</span>
            {showHistory ? (
              <ChevronUp className="h-5 w-5 text-primary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-primary" />
            )}
          </button>

          {showHistory && (
            <div className="space-y-6 mt-4">
              {intentionPrompts.map((prompt) => {
                const intentions = getIntentionsByType(prompt.type)
                if (intentions.length === 0) return null

                return (
                  <div key={prompt.type}>
                    <h3 className="text-sm font-medium text-primary mb-3">{prompt.question}</h3>
                    <div className="space-y-3">
                      {intentions.map((intention) => (
                        <Card key={intention.id} className="p-4 bg-secondary/30 border-primary/10">
                          <p className="text-foreground mb-2">{intention.text}</p>
                          <p className="text-xs text-muted-foreground">{formatTimestamp(intention.timestamp)}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}

      {/* Gentle guidance */}
      <section className="text-center py-6">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">
          Your intentions are quietly timestamped. No pressure. Just honesty.
        </p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
