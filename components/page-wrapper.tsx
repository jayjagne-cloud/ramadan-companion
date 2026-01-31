"use client"

import type { ReactNode } from "react"
import { Navigation } from "@/components/navigation"
import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: ReactNode
  className?: string
  showNav?: boolean
}

export function PageWrapper({ children, className, showNav = true }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {showNav && <Navigation />}
      <main className={cn("max-w-lg mx-auto px-4 pb-24 md:pb-8", showNav && "pt-20", "page-transition", className)}>
        {children}
      </main>
    </div>
  )
}
