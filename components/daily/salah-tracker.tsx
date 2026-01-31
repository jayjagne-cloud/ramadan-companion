"use client"

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Check, Circle } from "lucide-react"

interface SalahEntry {
  prayed: boolean
  present: boolean
  distraction?: string
}

interface SalahState {
  fajr: SalahEntry
  dhuhr: SalahEntry
  asr: SalahEntry
  maghrib: SalahEntry
  isha: SalahEntry
  taraweeh: SalahEntry
}

interface SalahTrackerProps {
  salah: SalahState
  onUpdate: (salah: SalahState) => void
}

const salahNames = [
  { key: "fajr", label: "Fajr", time: "Dawn" },
  { key: "dhuhr", label: "Dhuhr", time: "Noon" },
  { key: "asr", label: "Asr", time: "Afternoon" },
  { key: "maghrib", label: "Maghrib", time: "Sunset" },
  { key: "isha", label: "Isha", time: "Night" },
  { key: "taraweeh", label: "Taraweeh", time: "Night Prayer" },
] as const

export function SalahTracker({ salah, onUpdate }: SalahTrackerProps) {
  const updateSalah = (key: keyof SalahState, field: keyof SalahEntry, value: boolean | string) => {
    onUpdate({
      ...salah,
      [key]: {
        ...salah[key],
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-4">
      {salahNames.map(({ key, label, time }) => {
        const entry = salah[key]
        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground ml-2">{time}</span>
              </div>
              <div className="flex gap-2">
                {/* Prayed button - Gold gradient when active */}
                <button
                  onClick={() => updateSalah(key, "prayed", !entry.prayed)}
                  className={cn(
                    "h-10 px-3 rounded-lg flex items-center gap-2 text-sm transition-all border",
                    entry.prayed
                      ? "gold-gradient text-[#0a0e1a] border-transparent"
                      : "bg-secondary/50 text-muted-foreground border-primary/20",
                  )}
                >
                  {entry.prayed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span>Prayed</span>
                </button>

                {/* Present button */}
                <button
                  onClick={() => updateSalah(key, "present", !entry.present)}
                  disabled={!entry.prayed}
                  className={cn(
                    "h-10 px-3 rounded-lg flex items-center gap-2 text-sm transition-all border",
                    !entry.prayed && "opacity-50 cursor-not-allowed",
                    entry.present
                      ? "bg-primary/20 text-primary border-primary/30"
                      : "bg-secondary/50 text-muted-foreground border-primary/20",
                  )}
                >
                  {entry.present ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span>Present</span>
                </button>
              </div>
            </div>

            {/* Distraction note */}
            {entry.prayed && !entry.present && (
              <Textarea
                value={entry.distraction || ""}
                onChange={(e) => updateSalah(key, "distraction", e.target.value)}
                placeholder="What distracted you?"
                className="min-h-12 text-sm resize-none bg-[#0a0e1a] border-primary/20"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
