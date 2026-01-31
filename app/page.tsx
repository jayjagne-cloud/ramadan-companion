"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loadUserData, saveUserData, calculateProgress, getHijriDate, type UserData } from "@/lib/storage"
import {
  ArrowRight,
  Heart,
  BookOpen,
  Calendar,
  Star,
  Sparkles,
  Sun,
  Moon,
  Archive,
  Clock,
  Book,
  MapPin,
} from "lucide-react"

const dailySpiritualReminders = [
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Indeed, Allah is with the patient.",
    reference: "Al-Baqarah 2:153",
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship comes ease.",
    reference: "Ash-Sharh 94:5",
  },
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "Whoever fears Allah, He will make a way out for them.",
    reference: "At-Talaq 65:2",
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Verily, in the remembrance of Allah do hearts find rest.",
    reference: "Ar-Ra'd 13:28",
  },
  {
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
    translation: "And when My servants ask you about Me, indeed I am near.",
    reference: "Al-Baqarah 2:186",
  },
  {
    arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِنَ الْمُحْسِنِينَ",
    translation: "Indeed, the mercy of Allah is near to those who do good.",
    reference: "Al-A'raf 7:56",
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    translation: "And He is with you wherever you are.",
    reference: "Al-Hadid 57:4",
  },
]

const greetingsByTime = {
  morning: {
    greeting: "صباح الخير",
    message: "May your morning be filled with barakah",
  },
  afternoon: {
    greeting: "السلام عليكم",
    message: "May Allah bless your day",
  },
  evening: {
    greeting: "مساء النور",
    message: "May your evening bring peace",
  },
  night: {
    greeting: "تصبح على خير",
    message: "May Allah protect you through the night",
  },
}

const journeySteps = [
  {
    href: "/intentions",
    title: "Set Your Intentions",
    description: "Before Ramadan begins, return to why",
    icon: Heart,
    phase: "foundation",
  },
  {
    href: "/baseline",
    title: "Spiritual Baseline",
    description: "Know where you're starting from",
    icon: BookOpen,
    phase: "foundation",
  },
  {
    href: "/daily",
    title: "Daily Barakah",
    description: "Your daily spiritual companion",
    icon: Calendar,
    phase: "ramadan",
  },
  {
    href: "/quran",
    title: "Quran",
    description: "Read with Arabic, transliteration & translation",
    icon: Book,
    phase: "ramadan",
  },
  {
    href: "/salah-times",
    title: "Salah Times",
    description: "Location-based prayer times with reminders",
    icon: MapPin,
    phase: "ramadan",
  },
  {
    href: "/weekly",
    title: "Weekly Muraqabah",
    description: "Deeper reflections each week",
    icon: Star,
    phase: "ramadan",
  },
  {
    href: "/vaults",
    title: "Your Vaults",
    description: "Dua, Ayah, Nuur & Repentance collections",
    icon: Archive,
    phase: "ramadan",
  },
  {
    href: "/timeline",
    title: "Timeline",
    description: "Your Ramadan story at a glance",
    icon: Clock,
    phase: "ramadan",
  },
  {
    href: "/laylatul-qadr",
    title: "Sacred Nights",
    description: "The last ten nights",
    icon: Sparkles,
    phase: "qadr",
  },
  {
    href: "/emotional-care",
    title: "Emotional Care",
    description: "For the heavy days",
    icon: Heart,
    phase: "care",
  },
  {
    href: "/eid",
    title: "Eid & Beyond",
    description: "Carrying the light forward",
    icon: Sun,
    phase: "eid",
  },
]

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showNameInput, setShowNameInput] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [dailyReminder, setDailyReminder] = useState(dailySpiritualReminders[0])
  const [timeGreeting, setTimeGreeting] = useState(greetingsByTime.morning)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    setMounted(true)
    if (!data.settings.userName) {
      setShowNameInput(true)
    }

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setDailyReminder(dailySpiritualReminders[dayOfYear % dailySpiritualReminders.length])

    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setTimeGreeting(greetingsByTime.morning)
    } else if (hour >= 12 && hour < 17) {
      setTimeGreeting(greetingsByTime.afternoon)
    } else if (hour >= 17 && hour < 21) {
      setTimeGreeting(greetingsByTime.evening)
    } else {
      setTimeGreeting(greetingsByTime.night)
    }
  }, [])

  const handleSaveName = () => {
    if (!userData || !nameInput.trim()) return
    const updatedData = {
      ...userData,
      settings: { ...userData.settings, userName: nameInput.trim() },
    }
    saveUserData(updatedData)
    setUserData(updatedData)
    setShowNameInput(false)
  }

  if (!mounted) {
    return (
      <PageWrapper showNav={false}>
        <div className="min-h-screen flex items-center justify-center">
          <Image
            src="/images/33df7b37-1a2e-432a-8029.jpeg"
            alt="Barrkeh DigiProducts"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
      </PageWrapper>
    )
  }

  const hasStarted = userData && (userData.intentions.length > 0 || userData.baseline)
  const progress = userData ? calculateProgress(userData) : null
  const hijriDate = getHijriDate()
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const userName = userData?.settings.userName

  return (
    <PageWrapper showNav={false} className="pt-0">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        {/* Gold decorative line */}
        <div className="w-48 h-px gold-gradient mb-8 opacity-60" />

        <div className="mb-4">
          <Image
            src="/images/33df7b37-1a2e-432a-8029.jpeg"
            alt="Barrkeh DigiProducts"
            width={80}
            height={80}
            className="rounded-full mx-auto sacred-glow"
          />
        </div>

        <h1 className="luxury-text text-xl gold-text mb-1">BARRKEH</h1>
        <p className="luxury-text text-xs text-muted-foreground tracking-[0.3em] mb-4">DIGIPRODUCTS</p>

        <p className="text-xs text-muted-foreground mb-2">Premium Digital Planners • Checklists • Islamic Resources</p>

        <div className="w-32 h-px gold-gradient my-4 opacity-40" />

        <div className="mb-4">
          <p className="text-sm gold-text font-medium uppercase tracking-wider">{today}</p>
          {hijriDate && <p className="text-xs text-muted-foreground italic mt-1">Hijri: {hijriDate}</p>}
        </div>

        <div className="flex flex-col items-center gap-1 mb-4">
          <p className="arabic-text text-lg text-primary">{timeGreeting.greeting}</p>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-primary" />
            <h2 className="font-serif text-lg text-foreground">
              {userName ? `Welcome back, ${userName}` : "As-salamu Alaykum"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">{timeGreeting.message}</p>
        </div>

        <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed text-sm">
          Welcome to your <span className="gold-text font-medium">Welcome to your Ramadan Interactive Digital Planner</span> by
          Barrkeh DigiProducts. This sacred space is lovingly crafted to inspire you to live intentionally and cultivate a life filled
          with barakah, joy, and purpose. May this journey bring you closer to your goals and enhance your spiritual experience during this blessed month.
        </p>

        {showNameInput && (
          <Card className="p-4 mb-6 bg-card/50 gold-border w-full max-w-xs">
            <p className="text-sm text-foreground mb-3">What should we call you?</p>
            <div className="flex gap-2">
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                className="bg-[#0a0e1a] border-primary/20"
              />
              <Button
                onClick={handleSaveName}
                disabled={!nameInput.trim()}
                className="gold-gradient text-[#0a0e1a] border-0"
              >
                Save
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-5 mb-6 bg-gradient-to-br from-primary/10 to-transparent gold-border w-full max-w-xs">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Reminder</p>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="arabic-text text-xl text-foreground mb-2">{dailyReminder.arabic}</p>
          <p className="text-sm text-foreground italic mb-1">{dailyReminder.translation}</p>
          <p className="text-xs text-muted-foreground">— {dailyReminder.reference}</p>
        </Card>

        {hasStarted && progress && (
          <Card className="p-4 mb-6 bg-card/50 gold-border w-full max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Light</span>
              <span className="text-xs gold-text">Day {userData?.currentDay || 1}</span>
            </div>

            {/* Soft Barakah Progress Bar */}
            <div className="mb-4">
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div
                  className="h-full gold-gradient transition-all duration-1000"
                  style={{ width: `${progress.barakahLevel}%` }}
                />
              </div>
              <p className="text-sm text-center font-serif gold-text">{progress.barakahMessage}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-serif gold-text">{progress.daysCompleted}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <div>
                <p className="text-lg font-serif gold-text">{progress.salahPercentage}%</p>
                <p className="text-xs text-muted-foreground">Salah</p>
              </div>
              <div>
                <p className="text-lg font-serif gold-text">{progress.quranPercentage}%</p>
                <p className="text-xs text-muted-foreground">Quran</p>
              </div>
            </div>
          </Card>
        )}

        {/* Today's Anchor */}
        {userData?.todayAnchor && (
          <Card className="p-4 mb-6 bg-primary/10 gold-border w-full max-w-xs">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Today's Anchor</p>
            {userData.todayAnchor.arabic && (
              <p className="arabic-text text-lg text-foreground mb-1">{userData.todayAnchor.arabic}</p>
            )}
            <p className="text-sm text-foreground italic">{userData.todayAnchor.content}</p>
          </Card>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {hasStarted ? (
            <Button
              asChild
              size="lg"
              className="h-14 text-base soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
            >
              <Link href="/daily">
                <Sparkles className="mr-2 h-5 w-5" />
                Daily Barakah Prayer
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="h-14 text-base soft-press gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90 border-0"
            >
              <Link href="/intentions">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>

        {hasStarted && (
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Saved • Last saved: {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </p>
        )}

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["No app needed", "Works on iPhone & iPad", "Instant download"].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 rounded-full border border-primary/30 text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </section>

      {/* Journey Overview */}
      <section className="py-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex-1 h-px gold-gradient opacity-30" />
          <h2 className="luxury-text text-sm gold-text">Your Ramadan Path</h2>
          <div className="flex-1 h-px gold-gradient opacity-30" />
        </div>

        <div className="space-y-3">
          {journeySteps.map((step) => {
            const Icon = step.icon
            return (
              <Link key={step.href} href={step.href}>
                <Card className="p-4 bg-card/50 border-primary/20 hover:border-primary/40 hover:bg-card transition-all soft-press gold-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary/60 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="py-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent gold-border text-center">
          <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-serif text-xl text-foreground mb-3">Allah is With You</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Every step you take toward Him, He takes ten toward you. Every moment you remember Him, you are remembered
            above the heavens. You are never alone in this journey.
          </p>
          <p className="arabic-text text-lg text-primary mb-2">وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ</p>
          <p className="text-xs text-muted-foreground italic">
            "And We are closer to him than his jugular vein" — Qaf 50:16
          </p>
        </Card>
      </section>

      {/* Gentle reminder */}
      <section className="py-8 text-center">
        <div className="w-24 h-px gold-gradient mx-auto mb-6 opacity-40" />
        <p className="text-sm text-muted-foreground italic font-serif">"Presence matters more than perfection"</p>
        <div className="w-24 h-px gold-gradient mx-auto mt-6 opacity-40" />
      </section>

      {/* Footer branding */}
      <footer className="py-8 text-center border-t border-primary/10">
        <Image
          src="/images/33df7b37-1a2e-432a-8029.jpeg"
          alt="Barrkeh DigiProducts"
          width={40}
          height={40}
          className="rounded-full mx-auto mb-3"
        />
        <p className="luxury-text text-xs gold-text mb-1">Barrkeh DigiProducts</p>
        <p className="text-xs text-muted-foreground">Premium Islamic Resources</p>
      </footer>
    </PageWrapper>
  )
}
