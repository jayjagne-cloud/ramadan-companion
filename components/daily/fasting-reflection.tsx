"use client"

import { Textarea } from "@/components/ui/textarea"

interface FastingReflectionData {
  hardToday?: string
  softenedHeart?: string
}

interface FastingReflectionProps {
  reflection?: FastingReflectionData
  onUpdate: (reflection: FastingReflectionData) => void
}

export function FastingReflection({ reflection = {}, onUpdate }: FastingReflectionProps) {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">What was hard today?</label>
        <Textarea
          value={reflection.hardToday || ""}
          onChange={(e) => onUpdate({ ...reflection, hardToday: e.target.value })}
          placeholder="The hunger, the patience, the waiting..."
          className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">What softened your heart today?</label>
        <Textarea
          value={reflection.softenedHeart || ""}
          onChange={(e) => onUpdate({ ...reflection, softenedHeart: e.target.value })}
          placeholder="A moment of gratitude, a kind word..."
          className="min-h-20 text-base resize-none bg-[#0a0e1a] border-primary/20"
        />
      </div>
    </div>
  )
}
