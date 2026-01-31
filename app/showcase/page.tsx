"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, Pause, ChevronRight, Star, BookOpen, Clock, Heart, Moon, Sparkles, Video, Download, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const slides = [
  {
    id: 1,
    title: "Introducing",
    subtitle: "بَرَكَة",
    headline: "Barrkeh Ramadan Companion",
    description: "Your premium spiritual guide for the holiest month",
    bg: "from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]",
    icon: Moon,
    isIntro: true,
    features: ["Premium Interactive Planner", "Full Quran with Bookmarks", "Location-Based Prayer Times"],
  },
  {
    id: 2,
    title: "Set Your Intentions",
    subtitle: "نِيَّة",
    headline: "Begin With Purpose",
    description: "A living space for your niyyah. Return to it on difficult days.",
    bg: "from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]",
    icon: Star,
    mockup: "intentions",
    features: ["Why am I entering Ramadan?", "What am I asking Allah for?", "What do I need to let go of?"],
  },
  {
    id: 3,
    title: "Daily Barakah",
    subtitle: "بَرَكَة",
    headline: "Every Day, A New Light",
    description: "Unique spiritual content for each of the 30 blessed days.",
    bg: "from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]",
    icon: Sparkles,
    mockup: "daily",
    features: ["Daily Ayah with Tafsir", "99 Names of Allah", "Presence-Based Salah Tracking"],
  },
  {
    id: 4,
    title: "The Complete Quran",
    subtitle: "الْقُرْآن",
    headline: "Read. Reflect. Remember.",
    description: "All 114 Surahs with Arabic, transliteration, and translation.",
    bg: "from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]",
    icon: BookOpen,
    mockup: "quran",
    features: ["Bookmark Your Progress", "Track Your Khatm", "Three Reading Modes"],
  },
  {
    id: 5,
    title: "Prayer Times",
    subtitle: "الصَّلَاة",
    headline: "Never Miss A Prayer",
    description: "Accurate prayer times based on your location with gentle reminders.",
    bg: "from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]",
    icon: Clock,
    mockup: "salah",
    features: ["Location-Based Times", "Multiple Calculation Methods", "Reminder Notifications"],
  },
  {
    id: 6,
    title: "Laylatul Qadr",
    subtitle: "لَيْلَةُ الْقَدْرِ",
    headline: "The Night of Power",
    description: "Special guidance for the last 10 nights. Sacred. Intentional.",
    bg: "from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]",
    icon: Moon,
    mockup: "qadr",
    features: ["Night-Specific Duas", "Letter to Allah", "Tahajjud Presence Tracker"],
  },
  {
    id: 7,
    title: "Emotional Care",
    subtitle: "رَحْمَة",
    headline: "For The Heavy Days",
    description: "Because faith has seasons. And Allah sees your struggle.",
    bg: "from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]",
    icon: Heart,
    mockup: "emotional",
    features: ["Low Imaan Support", "Forgiveness & Letting Go", "Gentle Mercy Reminders"],
  },
  {
    id: 8,
    title: "BARRKEH",
    subtitle: "DigiProducts",
    headline: "Plan With Purpose",
    description: "Premium Digital Planners • Islamic Resources • Spiritual Growth",
    bg: "from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]",
    icon: Star,
    cta: true,
    features: ["Works on iPhone & iPad", "No App Needed", "Instant Download"],
  },
  {
    id: 9,
    title: "Get Yours Today",
    subtitle: "رَمَضَان مُبَارَك",
    headline: "Transform Your Ramadan",
    description: "Join thousands of Muslims on a journey to spiritual excellence",
    bg: "from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]",
    icon: Sparkles,
    cta: true,
    isFinal: true,
    features: ["barrkehdp.com", "@barrkehdigiproducts", "Premium Islamic Resources"],
  },
]

const MockupScreen = ({ type }: { type: string }) => {
  const mockups: Record<string, React.ReactNode> = {
    intentions: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-4">
          <p className="text-gold/60 text-xs tracking-widest">NIYYAH RESET</p>
          <h3 className="text-gold font-serif text-lg">My Intentions</h3>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5">
          <p className="text-gold/50 text-xs mb-1">Why am I entering Ramadan?</p>
          <p className="text-cream/80 text-sm">To reconnect with Allah and find peace...</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5">
          <p className="text-gold/50 text-xs mb-1">What do I need to let go of?</p>
          <p className="text-cream/80 text-sm">The resentment I've been carrying...</p>
        </div>
        <button className="w-full bg-gradient-to-r from-gold to-gold-light text-navy py-2 rounded-lg text-sm font-medium">
          Return to This
        </button>
      </div>
    ),
    daily: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-2">
          <p className="text-gold text-xs tracking-widest">DAY 15</p>
          <p className="text-cream/60 text-xs">Ramadan 15, 1446 AH</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5 text-center">
          <p className="text-gold font-arabic text-lg mb-1">وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ</p>
          <p className="text-cream/70 text-xs">Be patient, for Allah never wastes the reward of those who do good</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5">
          <p className="text-gold text-sm">As-Sabur • الصَّبُور</p>
          <p className="text-cream/60 text-xs">The Patient One</p>
        </div>
        <div className="flex justify-center gap-2">
          <span className="px-2 py-1 bg-gold/20 rounded text-gold text-xs">☀️ Fajr</span>
          <span className="px-2 py-1 bg-gold/20 rounded text-gold text-xs">🌤 Dhuhr</span>
          <span className="px-2 py-1 bg-gold/20 rounded text-gold text-xs">🌅 Asr</span>
        </div>
      </div>
    ),
    quran: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-2">
          <p className="text-gold/60 text-xs tracking-widest">SURAH AL-FATIHAH</p>
          <p className="text-cream/60 text-xs">The Opening • 7 Verses</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5 text-center">
          <p className="text-gold font-arabic text-xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-cream/50 text-xs italic">Bismillahir Rahmanir Raheem</p>
          <p className="text-cream/70 text-xs mt-1">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </div>
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 bg-gold/30 rounded-full text-gold text-xs">Arabic</span>
          <span className="px-3 py-1 bg-gold/10 rounded-full text-gold/60 text-xs">Transliteration</span>
          <span className="px-3 py-1 bg-gold/10 rounded-full text-gold/60 text-xs">Translation</span>
        </div>
        <button className="w-full border border-gold/30 text-gold py-2 rounded-lg text-sm">
          ★ Bookmark This Verse
        </button>
      </div>
    ),
    salah: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-2">
          <p className="text-gold/60 text-xs tracking-widest">PRAYER TIMES</p>
          <p className="text-cream/60 text-xs">New York, USA</p>
        </div>
        <div className="space-y-2">
          {["Fajr 5:23 AM", "Dhuhr 12:45 PM", "Asr 4:15 PM", "Maghrib 7:32 PM", "Isha 9:00 PM"].map((time, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-2 rounded-lg ${i === 2 ? "bg-gold/20 border border-gold/40" : "bg-gold/5 border border-gold/10"}`}
            >
              <span className="text-cream/80 text-sm">{time.split(" ")[0]}</span>
              <span className={`text-sm ${i === 2 ? "text-gold font-medium" : "text-cream/60"}`}>
                {time.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-gold/60 text-xs">Next: Asr in 2h 15m</p>
      </div>
    ),
    qadr: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-2">
          <p className="text-gold text-xs tracking-widest">✦ NIGHT 27 ✦</p>
          <p className="text-cream/60 text-xs">Seeking Laylatul Qadr</p>
        </div>
        <div className="border border-gold/30 rounded-lg p-3 bg-gold/10 text-center">
          <p className="text-gold font-arabic text-lg mb-1">اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي</p>
          <p className="text-cream/70 text-xs">O Allah, You are Forgiving and love forgiveness, so forgive me</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5">
          <p className="text-gold/80 text-xs mb-2">If tonight is Laylatul Qadr...</p>
          <p className="text-cream/60 text-xs italic">Write your letter to Allah...</p>
        </div>
        <div className="flex gap-2">
          <span className="flex-1 text-center py-2 bg-gold/10 rounded-lg text-gold/80 text-xs">Tahajjud ✓</span>
          <span className="flex-1 text-center py-2 bg-gold/10 rounded-lg text-gold/80 text-xs">Witr ✓</span>
        </div>
      </div>
    ),
    emotional: (
      <div className="space-y-3 p-4">
        <div className="text-center mb-2">
          <p className="text-gold/60 text-xs tracking-widest">EMOTIONAL CARE</p>
          <p className="text-cream/60 text-xs">For the heavy days</p>
        </div>
        <div className="border border-gold/20 rounded-lg p-3 bg-gold/5">
          <p className="text-gold/80 text-xs mb-2">Today feels heavy because...</p>
          <p className="text-cream/60 text-sm italic">I feel distant from Allah...</p>
        </div>
        <div className="border border-gold/30 rounded-lg p-3 bg-gold/10">
          <p className="text-gold text-xs mb-2">If Allah were speaking mercy to you right now...</p>
          <p className="text-cream/80 text-sm">
            "I am closer to you than your jugular vein. I see your effort, even when you don't."
          </p>
        </div>
        <button className="w-full bg-gradient-to-r from-gold/80 to-gold text-navy py-2 rounded-lg text-sm">
          One Small Step Back
        </button>
      </div>
    ),
  }

  return mockups[type] || null
}

export default function ShowcasePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(9)
  const [showExportDialog, setShowExportDialog] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const slideDuration = 5000 // 5 seconds per slide
  
  const durationOptions = [
    { value: 6, label: "6 seconds", slides: 2 },
    { value: 9, label: "9 seconds", slides: 3 },
    { value: 12, label: "12 seconds", slides: 4 },
    { value: 15, label: "15 seconds", slides: 5 },
    { value: 45, label: "Full (45s)", slides: 9 },
  ]

  // Canvas-based rendering for video export (avoids oklch color parsing issues)
  const renderSlideToCanvas = useCallback((ctx: CanvasRenderingContext2D, slideIndex: number, progressPct: number) => {
    const slide = slides[slideIndex]
    const width = 1080
    const height = 1920
    
    // Colors in hex (converted from oklch)
    const colors = {
      navy: "#0a0e1a",
      navyLight: "#1a1f35",
      gold: "#c9a227",
      goldLight: "#e6c547",
      cream: "#f5f5f0",
      creamMuted: "rgba(245, 245, 240, 0.6)",
    }
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, colors.navy)
    gradient.addColorStop(0.5, colors.navyLight)
    gradient.addColorStop(1, colors.navy)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    // Top gold line
    const topLineGradient = ctx.createLinearGradient(width * 0.3, 0, width * 0.7, 0)
    topLineGradient.addColorStop(0, "transparent")
    topLineGradient.addColorStop(0.5, colors.gold)
    topLineGradient.addColorStop(1, "transparent")
    ctx.fillStyle = topLineGradient
    ctx.fillRect(width * 0.3, 0, width * 0.4, 2)
    
    // Bottom gold line
    ctx.fillStyle = topLineGradient
    ctx.fillRect(width * 0.3, height - 2, width * 0.4, 2)
    
    // Center content
    const centerY = height / 2
    
    // Animate elements based on progress (fade in effect)
    const fadeIn = Math.min(progressPct / 20, 1)
    
    ctx.globalAlpha = fadeIn
    
    // Title (Arabic or intro text)
    ctx.fillStyle = colors.gold
    ctx.font = "bold 72px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    
    if (slide.isIntro) {
      // Intro slide
      ctx.font = "24px sans-serif"
      ctx.fillStyle = "rgba(201, 162, 39, 0.6)"
      ctx.fillText("Introducing", width / 2, centerY - 300)
      
      ctx.font = "bold 96px serif"
      ctx.fillStyle = colors.gold
      ctx.fillText("BARRKEH", width / 2, centerY - 150)
      
      ctx.font = "20px sans-serif"
      ctx.fillStyle = "rgba(201, 162, 39, 0.6)"
      ctx.fillText("RAMADAN COMPANION", width / 2, centerY - 80)
      
      ctx.font = "64px serif"
      ctx.fillStyle = "rgba(201, 162, 39, 0.8)"
      ctx.fillText(slide.subtitle, width / 2, centerY + 50)
      
      ctx.font = "28px sans-serif"
      ctx.fillStyle = colors.creamMuted
      ctx.fillText(slide.description, width / 2, centerY + 150)
    } else if (slide.isFinal) {
      // Final CTA slide
      ctx.font = "64px serif"
      ctx.fillStyle = "rgba(201, 162, 39, 0.8)"
      ctx.fillText(slide.subtitle, width / 2, centerY - 200)
      
      ctx.font = "bold 72px serif"
      ctx.fillStyle = colors.gold
      ctx.fillText(slide.headline, width / 2, centerY - 50)
      
      ctx.font = "28px sans-serif"
      ctx.fillStyle = colors.creamMuted
      ctx.fillText(slide.description, width / 2, centerY + 50)
      
      ctx.font = "bold 36px sans-serif"
      ctx.fillStyle = colors.gold
      ctx.fillText("barrkehdp.com", width / 2, centerY + 200)
    } else {
      // Regular slides
      ctx.font = "56px serif"
      ctx.fillStyle = "rgba(201, 162, 39, 0.8)"
      ctx.fillText(slide.subtitle, width / 2, centerY - 250)
      
      ctx.font = "bold 64px serif"
      ctx.fillStyle = colors.gold
      ctx.fillText(slide.title, width / 2, centerY - 100)
      
      ctx.font = "42px sans-serif"
      ctx.fillStyle = colors.cream
      ctx.fillText(slide.headline, width / 2, centerY)
      
      ctx.font = "28px sans-serif"
      ctx.fillStyle = colors.creamMuted
      
      // Word wrap description
      const words = slide.description.split(" ")
      let line = ""
      let y = centerY + 80
      for (const word of words) {
        const testLine = line + word + " "
        if (ctx.measureText(testLine).width > width * 0.8) {
          ctx.fillText(line, width / 2, y)
          line = word + " "
          y += 40
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, width / 2, y)
      
      // Features
      ctx.font = "24px sans-serif"
      slide.features.forEach((feature, i) => {
        ctx.fillStyle = "rgba(245, 245, 240, 0.7)"
        ctx.fillText("• " + feature, width / 2, centerY + 250 + i * 50)
      })
    }
    
    // Progress bar at bottom
    ctx.globalAlpha = 1
    ctx.fillStyle = "rgba(201, 162, 39, 0.2)"
    ctx.fillRect(100, height - 100, width - 200, 8)
    ctx.fillStyle = colors.gold
    ctx.fillRect(100, height - 100, (width - 200) * (progressPct / 100), 8)
    
    // Slide counter
    ctx.font = "20px sans-serif"
    ctx.fillStyle = "rgba(245, 245, 240, 0.4)"
    ctx.textAlign = "right"
    ctx.fillText(`${slideIndex + 1} / ${slides.length}`, width - 60, height - 60)
    
    // Barrkeh branding
    ctx.textAlign = "left"
    ctx.font = "18px sans-serif"
    ctx.fillStyle = "rgba(201, 162, 39, 0.5)"
    ctx.fillText("BARRKEH DIGIPRODUCTS", 60, height - 60)
    
    ctx.globalAlpha = 1
  }, [])

  const startExport = useCallback(async () => {
    setIsExporting(true)
    setExportProgress(0)
    setShowExportDialog(false)
    chunksRef.current = []
    
    try {
      // Create canvas for rendering
      const canvas = document.createElement("canvas")
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext("2d")
      
      if (!ctx) throw new Error("Could not get canvas context")
      
      // Create stream from canvas
      const stream = canvas.captureStream(30)
      
      // Create MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") 
        ? "video/webm;codecs=vp9" 
        : "video/webm"
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 5000000,
      })
      
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        
        const a = document.createElement("a")
        a.href = url
        a.download = `barrkeh-ramadan-companion-${selectedDuration}s.webm`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        setIsExporting(false)
        setExportProgress(0)
        setIsPlaying(true)
      }
      
      mediaRecorder.start(100)
      
      // Animation loop
      const totalDuration = selectedDuration * 1000
      const slideDurationMs = 5000
      const frameInterval = 1000 / 30
      let elapsed = 0
      
      const animate = () => {
        if (elapsed >= totalDuration) {
          mediaRecorder.stop()
          return
        }
        
        const currentSlideIdx = Math.min(
          Math.floor(elapsed / slideDurationMs),
          slides.length - 1
        )
        const slideProgress = ((elapsed % slideDurationMs) / slideDurationMs) * 100
        
        setCurrentSlide(currentSlideIdx)
        setProgress(slideProgress)
        setExportProgress(Math.round((elapsed / totalDuration) * 100))
        
        renderSlideToCanvas(ctx, currentSlideIdx, slideProgress)
        
        elapsed += frameInterval
        setTimeout(animate, frameInterval)
      }
      
      animate()
      
    } catch (error) {
      console.error("Export failed:", error)
      setIsExporting(false)
      setExportProgress(0)
      alert("Video export failed. Please try a different browser or download screenshots instead.")
    }
  }, [selectedDuration, renderSlideToCanvas])
  
  const cancelExport = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop()
    }
    setIsExporting(false)
    setExportProgress(0)
    setIsPlaying(true)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 100 / (slideDuration / 50)
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [isPlaying, nextSlide])

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0e1a] overflow-hidden relative">
      {/* Export Progress Overlay */}
      {isExporting && (
        <div className="fixed inset-0 z-[100] bg-[#0a0e1a]/95 flex flex-col items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
            <h3 className="text-gold font-serif text-xl mb-2">Exporting Video</h3>
            <p className="text-cream/60 text-sm mb-4">Recording your showcase at 1080x1920</p>
            <div className="w-64 h-2 bg-[#1a1f35] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-gold/80 text-sm">{exportProgress}%</p>
            <button
              onClick={cancelExport}
              className="mt-6 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors"
            >
              Cancel Export
            </button>
          </div>
        </div>
      )}

      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-50 flex gap-1">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light"
              initial={{ width: 0 }}
              animate={{
                width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%",
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen bg-gradient-to-b ${slide.bg} flex flex-col`}
        >
          {/* Logo */}
          <div className="pt-12 pb-4 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/images/33df7b37-1a2e-432a-8029.jpeg"
                alt="Barrkeh DigiProducts"
                width={50}
                height={50}
                className="rounded-full"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
            {/* Intro slide special layout */}
            {slide.isIntro ? (
              <>
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4"
                >
                  {slide.title}
                </motion.p>
                
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  className="mb-6"
                >
                  <Image
                    src="/images/33df7b37-1a2e-432a-8029.jpeg"
                    alt="Barrkeh DigiProducts"
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-gold/40 shadow-2xl shadow-gold/20"
                  />
                </motion.div>

                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gold font-serif text-4xl md:text-5xl text-center mb-2 tracking-wide"
                >
                  BARRKEH
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gold/60 text-sm tracking-[0.2em] mb-6"
                >
                  RAMADAN COMPANION
                </motion.p>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gold/80 font-arabic text-3xl mb-4"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-cream/70 text-center max-w-xs mb-8"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {slide.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold/80 text-xs">
                      {feature}
                    </span>
                  ))}
                </motion.div>
              </>
            ) : slide.isFinal ? (
              <>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mb-6"
                >
                  <Image
                    src="/images/33df7b37-1a2e-432a-8029.jpeg"
                    alt="Barrkeh DigiProducts"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-gold/40"
                  />
                </motion.div>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gold/80 font-arabic text-3xl mb-4"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gold font-serif text-3xl md:text-4xl text-center mb-2"
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-cream/60 text-center max-w-sm mb-8"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center space-y-2 mb-8"
                >
                  <p className="text-gold text-lg font-medium">barrkehdp.com</p>
                  <p className="text-cream/50 text-sm">@barrkehdigiproducts</p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-10 py-6 text-lg rounded-xl shadow-lg shadow-gold/30"
                    onClick={() => (window.location.href = "/")}
                  >
                    Start Your Journey
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                {/* Arabic subtitle */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gold/80 font-arabic text-2xl mb-2"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center mb-4"
                >
                  <Icon className="w-8 h-8 text-gold" />
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gold font-serif text-3xl md:text-4xl text-center mb-2"
                >
                  {slide.title}
                </motion.h1>

                {/* Headline */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-cream text-xl md:text-2xl text-center font-light mb-3"
                >
                  {slide.headline}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-cream/60 text-center max-w-sm mb-6"
                >
                  {slide.description}
                </motion.p>
              </>
            )}

            {/* Mockup or Features - only for regular slides */}
            {!slide.isIntro && !slide.isFinal && (
              slide.mockup ? (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full max-w-xs bg-[#1a1f35]/50 border border-gold/20 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10"
                >
                  <MockupScreen type={slide.mockup} />
                </motion.div>
              ) : !slide.cta && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-3"
                >
                  {slide.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-gold-light" />
                      <span className="text-cream/80">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )
            )}

            {/* CTA Button on cta slides that aren't final */}
            {slide.cta && !slide.isFinal && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8"
              >
                <Button
                  className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-gold/20"
                  onClick={() => (window.location.href = "/")}
                >
                  Enter Your Planner
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-4 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-4 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-50">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-gold to-gold-light flex items-center justify-center text-navy shadow-lg shadow-gold/30"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 text-cream/40 text-sm z-50">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Export Video Button */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogTrigger asChild>
          <button
            className="absolute top-14 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-gold/10 border border-gold/30 rounded-lg text-gold text-sm hover:bg-gold/20 transition-colors"
            disabled={isExporting}
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Export Video</span>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#0a0e1a] border-gold/30 text-cream max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-gold font-serif text-xl">Export Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <p className="text-cream/60 text-sm mb-3">Select video duration:</p>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedDuration(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedDuration === option.value
                        ? "bg-gold text-navy font-medium"
                        : "bg-gold/10 border border-gold/20 text-gold/80 hover:bg-gold/20"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gold/10 pt-4">
              <p className="text-cream/50 text-xs mb-2">Output settings:</p>
              <ul className="text-cream/60 text-xs space-y-1">
                <li>Resolution: 1080 x 1920 (Vertical)</li>
                <li>Format: WebM (VP9)</li>
                <li>Frame rate: 30fps</li>
                <li>Slides: {durationOptions.find(d => d.value === selectedDuration)?.slides || 3}</li>
              </ul>
            </div>
            
            <Button
              onClick={startExport}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-semibold py-3"
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
