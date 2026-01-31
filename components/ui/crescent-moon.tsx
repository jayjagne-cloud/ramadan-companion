"use client"

import { cn } from "@/lib/utils"

interface CrescentMoonProps {
  className?: string
  size?: number
  animate?: boolean
}

export function CrescentMoon({ className, size = 24, animate = false }: CrescentMoonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-primary", animate && "animate-pulse", className)}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}
