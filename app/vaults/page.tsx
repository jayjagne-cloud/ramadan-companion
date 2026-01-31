"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { loadUserData, saveUserData, generateId, type UserData, type VaultItem } from "@/lib/storage"
import { BookOpen, Heart, Sparkles, Lock, Plus, Star, Moon, Trash2, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"

type VaultType = "duaVault" | "ayahVault" | "nuurVault" | "repentanceVault"

const vaultConfig = {
  duaVault: {
    title: "Dua Vault",
    description: "Your heartfelt supplications",
    icon: Heart,
    color: "text-rose-400",
    placeholder: "A dua from your heart...",
  },
  ayahVault: {
    title: "Ayah Vault",
    description: "Verses that moved you",
    icon: BookOpen,
    color: "text-emerald-400",
    placeholder: "An ayah that spoke to you...",
  },
  nuurVault: {
    title: "Nuur Vault",
    description: "Moments of light",
    icon: Sparkles,
    color: "text-amber-400",
    placeholder: "A moment when you felt close to Allah...",
  },
  repentanceVault: {
    title: "Repentance Notes",
    description: "Private reflections",
    icon: Lock,
    color: "text-purple-400",
    placeholder: "Between you and Allah...",
  },
}

export default function VaultsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedVault, setSelectedVault] = useState<VaultType>("duaVault")
  const [newContent, setNewContent] = useState("")
  const [newArabic, setNewArabic] = useState("")
  const [newTags, setNewTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    setUserData(loadUserData())
  }, [])

  const handleAddItem = () => {
    if (!userData || !newContent.trim()) return

    const item: VaultItem = {
      id: generateId(),
      content: newContent.trim(),
      arabic: newArabic.trim() || undefined,
      tags: newTags,
      timestamp: new Date().toISOString(),
      useTonight: false,
    }

    const updatedVaults = {
      ...userData.vaults,
      [selectedVault]: [...userData.vaults[selectedVault], item],
    }

    const updatedData = { ...userData, vaults: updatedVaults }
    saveUserData(updatedData)
    setUserData(updatedData)
    setNewContent("")
    setNewArabic("")
    setNewTags([])
    setShowAddForm(false)
  }

  const handleDeleteItem = (itemId: string) => {
    if (!userData) return
    const updatedVaults = {
      ...userData.vaults,
      [selectedVault]: userData.vaults[selectedVault].filter((i) => i.id !== itemId),
    }
    const updatedData = { ...userData, vaults: updatedVaults }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const handleToggleUseTonight = (itemId: string) => {
    if (!userData) return
    const updatedVaults = {
      ...userData.vaults,
      [selectedVault]: userData.vaults[selectedVault].map((i) =>
        i.id === itemId ? { ...i, useTonight: !i.useTonight } : i,
      ),
    }
    const updatedData = { ...userData, vaults: updatedVaults }
    saveUserData(updatedData)
    setUserData(updatedData)
  }

  const addTag = () => {
    if (tagInput.trim() && !newTags.includes(tagInput.trim())) {
      setNewTags([...newTags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setNewTags(newTags.filter((t) => t !== tag))
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

  const currentVault = vaultConfig[selectedVault]
  const VaultIcon = currentVault.icon
  const items = userData.vaults[selectedVault]
  const tonightItems = items.filter((i) => i.useTonight)

  return (
    <PageWrapper>
      {/* Header */}
      <section className="py-6 text-center">
        <div className="w-32 h-px gold-gradient mx-auto mb-6 opacity-50" />
        <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Star className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Your Vaults</h1>
        <p className="font-serif text-xl text-foreground">Sacred Collections</p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Vault Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {(Object.keys(vaultConfig) as VaultType[]).map((vault) => {
          const config = vaultConfig[vault]
          const Icon = config.icon
          const count = userData.vaults[vault].length
          const isSelected = vault === selectedVault
          return (
            <button
              key={vault}
              onClick={() => setSelectedVault(vault)}
              className={cn(
                "p-4 rounded-xl text-left transition-all border",
                isSelected
                  ? "gold-gradient border-transparent"
                  : "bg-card/50 border-primary/20 hover:border-primary/40",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-2", isSelected ? "text-[#0a0e1a]" : config.color)} />
              <p className={cn("font-medium text-sm", isSelected ? "text-[#0a0e1a]" : "text-foreground")}>
                {config.title}
              </p>
              <p className={cn("text-xs", isSelected ? "text-[#0a0e1a]/70" : "text-muted-foreground")}>{count} saved</p>
            </button>
          )
        })}
      </div>

      {/* Tonight's Selection */}
      {tonightItems.length > 0 && (
        <Card className="p-4 mb-4 bg-primary/10 border-primary/30 gold-border">
          <div className="flex items-center gap-2 mb-3">
            <Moon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium gold-text">For Tonight</span>
          </div>
          <div className="space-y-2">
            {tonightItems.map((item) => (
              <p key={item.id} className="text-sm text-foreground">
                {item.content.slice(0, 80)}...
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Current Vault */}
      <Card className="p-5 mb-4 bg-card/50 gold-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <VaultIcon className={cn("h-5 w-5", currentVault.color)} />
            <div>
              <h2 className="font-medium text-foreground">{currentVault.title}</h2>
              <p className="text-xs text-muted-foreground">{currentVault.description}</p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="gold-gradient text-[#0a0e1a] border-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="space-y-3 mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
            {(selectedVault === "ayahVault" || selectedVault === "duaVault") && (
              <Input
                value={newArabic}
                onChange={(e) => setNewArabic(e.target.value)}
                placeholder="Arabic text (optional)"
                className="bg-[#0a0e1a] border-primary/20 arabic-text text-right"
                dir="rtl"
              />
            )}
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={currentVault.placeholder}
              className="min-h-20 bg-[#0a0e1a] border-primary/20"
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {newTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag..."
                className="flex-1 bg-[#0a0e1a] border-primary/20"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button size="sm" variant="outline" onClick={addTag} className="border-primary/30 bg-transparent">
                <Tag className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddItem}
              disabled={!newContent.trim()}
              className="w-full gold-gradient text-[#0a0e1a] border-0"
            >
              Save to Vault
            </Button>
          </div>
        )}

        {/* Items List */}
        {items.length === 0 ? (
          <div className="text-center py-8">
            <VaultIcon className={cn("h-10 w-10 mx-auto mb-3 opacity-30", currentVault.color)} />
            <p className="text-muted-foreground text-sm">Your vault is waiting</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className={cn("p-4 bg-primary/5 border-primary/10", item.useTonight && "ring-1 ring-primary/50")}
              >
                {item.arabic && (
                  <p className="arabic-text text-lg text-foreground mb-2 text-right" dir="rtl">
                    {item.arabic}
                  </p>
                )}
                <p className="text-foreground text-sm">{item.content}</p>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleUseTonight(item.id)}
                      className={cn(
                        "flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-all",
                        item.useTonight
                          ? "gold-gradient text-[#0a0e1a]"
                          : "bg-secondary/50 text-muted-foreground hover:text-primary",
                      )}
                    >
                      <Moon className="h-3 w-3" />
                      {item.useTonight ? "Tonight" : "Use Tonight"}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Footer */}
      <section className="text-center py-6">
        <div className="w-24 h-px gold-gradient mx-auto mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground italic font-serif">"Some treasures are meant to be kept close"</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-4 opacity-30" />
      </section>
    </PageWrapper>
  )
}
