"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Home,
  Heart,
  BookOpen,
  Calendar,
  Star,
  Sun,
  Sparkles,
  Archive,
  Clock,
  Settings,
  Book,
  Moon,
  Gift,
  Megaphone,
} from "lucide-react"

// Navigation sections with grouping
const navSections = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Home", icon: Home, description: "Dashboard overview" },
      { href: "/intentions", label: "Intentions", icon: Heart, description: "Set your Ramadan goals" },
      { href: "/baseline", label: "Baseline", icon: BookOpen, description: "Pre-Ramadan assessment" },
    ],
  },
  {
    title: "Daily Practice",
    items: [
      { href: "/daily", label: "Daily Tracker", icon: Calendar, description: "Track daily ibadah" },
      { href: "/quran", label: "Quran Learning", icon: Book, description: "Read, listen & memorize" },
      { href: "/salah-times", label: "Salah Times", icon: Clock, description: "Prayer schedule" },
    ],
  },
  {
    title: "Progress",
    items: [
      { href: "/weekly", label: "Weekly Review", icon: Star, description: "Weekly reflection" },
      { href: "/vaults", label: "Vaults", icon: Archive, description: "Saved content" },
      { href: "/timeline", label: "Timeline", icon: Clock, description: "Your Ramadan journey" },
    ],
  },
  {
    title: "Special",
    items: [
      { href: "/laylatul-qadr", label: "Sacred Nights", icon: Moon, description: "Last 10 nights" },
      { href: "/emotional-care", label: "Self Care", icon: Heart, description: "Emotional wellness" },
      { href: "/eid", label: "Eid & Beyond", icon: Gift, description: "Eid preparations" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { href: "/showcase", label: "Showcase", icon: Sparkles, description: "Animated showcase" },
      { href: "/promo", label: "Marketing", icon: Megaphone, description: "Promo materials" },
    ],
  },
  {
    title: "System",
    items: [{ href: "/settings", label: "Settings", icon: Settings, description: "App preferences" }],
  },
]

// Flat list for mobile bottom nav
const quickNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/daily", label: "Daily", icon: Calendar },
  { href: "/quran", label: "Quran", icon: Book },
  { href: "/salah-times", label: "Salah", icon: Clock },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-primary/20">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BarrkehLogo size={36} />
            <div className="flex flex-col">
              <span className="luxury-text text-xs gold-text">Barrkeh</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                DigiProducts
              </span>
            </div>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-[#0a0e1a] border-l border-primary/20 p-0 h-full"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 pt-6 pb-4 border-b border-primary/10">
                  <BarrkehLogo size={50} />
                  <span className="luxury-text text-sm gold-text">Barrkeh</span>
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">
                    Ramadan Planner
                  </span>
                </div>

                {/* Scrollable Navigation */}
                <div className="flex-1 overflow-y-auto px-3 overscroll-contain">
                  <div className="py-4 space-y-6">
                    {navSections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-[10px] font-semibold text-primary/60 uppercase tracking-wider px-3 mb-2">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                                  "hover:bg-primary/5",
                                  isActive && "bg-primary/10 border border-primary/20"
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                                    isActive
                                      ? "gold-gradient text-[#0a0e1a]"
                                      : "bg-primary/5 text-primary/60 group-hover:text-primary group-hover:bg-primary/10"
                                  )}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={cn(
                                      "text-sm font-medium truncate",
                                      isActive ? "text-primary" : "text-foreground/80"
                                    )}
                                  >
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground truncate">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-primary/10">
                  <p className="text-[10px] text-center text-muted-foreground">
                    Ramadan 2025 Edition
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-lg border-t border-primary/20 md:hidden">
        <div className="max-w-lg mx-auto px-2 h-16 flex items-center justify-around">
          {quickNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_rgba(201,162,39,0.5)]")} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
