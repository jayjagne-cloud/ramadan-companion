"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DaySelectorProps {
  selectedDay: number
  onSelectDay: (day: number) => void
  currentDay: number
}

export function DaySelector({ selectedDay, onSelectDay, currentDay }: DaySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(`[data-day="${selectedDay}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [selectedDay])

  return (
    <div className="mb-6">
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1
          const isSelected = day === selectedDay
          const isFuture = day > currentDay
          const isLastTen = day >= 21

          return (
            <button
              key={day}
              data-day={day}
              onClick={() => onSelectDay(day)}
              disabled={isFuture}
              className={cn(
                "min-w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-all",
                "text-sm font-medium soft-press border",
                isSelected && "gold-gradient text-[#0a0e1a] border-transparent",
                !isSelected && !isFuture && "bg-secondary/50 text-foreground hover:border-primary/40 border-primary/20",
                isFuture && "bg-muted/30 text-muted-foreground opacity-50 cursor-not-allowed border-transparent",
                isLastTen && !isSelected && !isFuture && "ring-1 ring-primary/40",
              )}
            >
              <span className="text-xs opacity-70">Day</span>
              <span>{day}</span>
            </button>
          )
        })}
      </div>
      <div className="flex justify-center mt-2">
        <span className="text-xs text-muted-foreground">Scroll to navigate days</span>
      </div>
    </div>
  )
}
