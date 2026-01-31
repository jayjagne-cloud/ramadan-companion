"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { BarrkehLogo } from "@/components/barrkeh-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { loadUserData, generateId, type UserData } from "@/lib/storage"
import {
  SURAHS,
  RECITERS,
  TAJWEED_RULES,
  fetchSurahVerses,
  getJuzNumber,
  getAudioUrl,
  type Surah,
  type Verse,
  type QuranBookmark,
  type ReadingProgress,
  type Reciter,
} from "@/lib/quran-data"
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Maximize2,
  Minimize2,
  Info,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ReadingMode = "arabic" | "transliteration" | "translation" | "all"

export default function QuranPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [verses, setVerses] = useState<{
    arabic: Verse[]
    transliteration: Verse[]
    translation: Verse[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [readingMode, setReadingMode] = useState<ReadingMode>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([])
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null)
  const [showBookmarkDialog, setShowBookmarkDialog] = useState(false)
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const [bookmarkNote, setBookmarkNote] = useState("")
  const [bookmarkColor, setBookmarkColor] = useState<"gold" | "silver" | "bronze">("gold")
  const [activeTab, setActiveTab] = useState<"read" | "bookmarks" | "progress" | "learn">("read")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")

  // Audio states
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null)
  const [audioVolume, setAudioVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"none" | "ayah" | "surah">("none")
  const [autoScroll, setAutoScroll] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  // Full page mode
  const [isFullPage, setIsFullPage] = useState(false)
  const [showTajweed, setShowTajweed] = useState(true)
  const [showTajweedLegend, setShowTajweedLegend] = useState(false)

  useEffect(() => {
    const data = loadUserData()
    setUserData(data)
    const stored = localStorage.getItem("barrkeh-quran-data")
    if (stored) {
      const quranData = JSON.parse(stored)
      setBookmarks(quranData.bookmarks || [])
      setReadingProgress(quranData.readingProgress || null)
      if (quranData.selectedReciter) {
        const reciter = RECITERS.find((r) => r.id === quranData.selectedReciter)
        if (reciter) setSelectedReciter(reciter)
      }
    }
  }, [])

  const saveQuranData = useCallback(
    (newBookmarks: QuranBookmark[], newProgress: ReadingProgress | null) => {
      localStorage.setItem(
        "barrkeh-quran-data",
        JSON.stringify({
          bookmarks: newBookmarks,
          readingProgress: newProgress,
          selectedReciter: selectedReciter.id,
        })
      )
      setBookmarks(newBookmarks)
      setReadingProgress(newProgress)
    },
    [selectedReciter]
  )

  const loadSurah = useCallback(
    async (surah: Surah) => {
      setLoading(true)
      setSelectedSurah(surah)
      stopAudio()
      const data = await fetchSurahVerses(surah.number)
      setVerses(data)
      setLoading(false)

      const newProgress: ReadingProgress = {
        lastSurah: surah.number,
        lastAyah: 1,
        completedSurahs: readingProgress?.completedSurahs || [],
        totalAyahsRead: readingProgress?.totalAyahsRead || 0,
        timestamp: new Date().toISOString(),
      }
      saveQuranData(bookmarks, newProgress)
    },
    [bookmarks, readingProgress, saveQuranData]
  )

  // Audio functions
  const playAyah = useCallback(
    (ayahNumber: number) => {
      if (!selectedSurah) return

      const audioUrl = getAudioUrl(selectedReciter.id, selectedSurah.number, ayahNumber)

      if (audioRef.current) {
        audioRef.current.pause()
      }

      const audio = new Audio(audioUrl)
      audio.volume = isMuted ? 0 : audioVolume / 100
      audioRef.current = audio

      audio.onended = () => {
        if (repeatMode === "ayah") {
          playAyah(ayahNumber)
        } else if (verses && ayahNumber < verses.arabic.length) {
          playAyah(ayahNumber + 1)
        } else if (repeatMode === "surah" && verses) {
          playAyah(1)
        } else {
          setIsPlaying(false)
          setCurrentPlayingAyah(null)
        }
      }

      audio.play()
      setIsPlaying(true)
      setCurrentPlayingAyah(ayahNumber)

      // Auto scroll to playing ayah
      if (autoScroll && verseRefs.current[ayahNumber]) {
        verseRefs.current[ayahNumber]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    },
    [selectedSurah, selectedReciter, isMuted, audioVolume, repeatMode, verses, autoScroll]
  )

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlaying(false)
    setCurrentPlayingAyah(null)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else if (currentPlayingAyah) {
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      playAyah(1)
    }
  }, [isPlaying, currentPlayingAyah, playAyah])

  const playNext = useCallback(() => {
    if (currentPlayingAyah && verses && currentPlayingAyah < verses.arabic.length) {
      playAyah(currentPlayingAyah + 1)
    }
  }, [currentPlayingAyah, verses, playAyah])

  const playPrevious = useCallback(() => {
    if (currentPlayingAyah && currentPlayingAyah > 1) {
      playAyah(currentPlayingAyah - 1)
    }
  }, [currentPlayingAyah, playAyah])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : audioVolume / 100
    }
  }, [audioVolume, isMuted])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const addBookmark = useCallback(() => {
    if (!selectedSurah || selectedVerse === null || !verses) return

    const newBookmark: QuranBookmark = {
      id: generateId(),
      surahNumber: selectedSurah.number,
      ayahNumber: selectedVerse,
      surahName: selectedSurah.englishName,
      arabic: verses.arabic[selectedVerse - 1]?.arabic || "",
      translation: verses.translation[selectedVerse - 1]?.translation || "",
      note: bookmarkNote,
      timestamp: new Date().toISOString(),
      color: bookmarkColor,
    }

    const newBookmarks = [...bookmarks, newBookmark]
    saveQuranData(newBookmarks, readingProgress)
    setShowBookmarkDialog(false)
    setBookmarkNote("")
    setSelectedVerse(null)
  }, [selectedSurah, selectedVerse, verses, bookmarkNote, bookmarkColor, bookmarks, readingProgress, saveQuranData])

  const removeBookmark = useCallback(
    (id: string) => {
      const newBookmarks = bookmarks.filter((b) => b.id !== id)
      saveQuranData(newBookmarks, readingProgress)
    },
    [bookmarks, readingProgress, saveQuranData]
  )

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    },
    [bookmarks]
  )

  const markSurahComplete = useCallback(() => {
    if (!selectedSurah || !readingProgress) return

    const completedSurahs = readingProgress.completedSurahs.includes(selectedSurah.number)
      ? readingProgress.completedSurahs
      : [...readingProgress.completedSurahs, selectedSurah.number]

    const newProgress: ReadingProgress = {
      ...readingProgress,
      completedSurahs,
      totalAyahsRead: readingProgress.totalAyahsRead + selectedSurah.numberOfAyahs,
      timestamp: new Date().toISOString(),
    }

    saveQuranData(bookmarks, newProgress)
  }, [selectedSurah, readingProgress, bookmarks, saveQuranData])

  const filteredSurahs = SURAHS.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.number.toString() === searchQuery
  )

  const fontSizeClass = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl",
  }[fontSize]

  // Full Page Arabic Mode
  if (isFullPage && selectedSurah && verses) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0a0e1a] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-primary/20 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullPage(false)}
              className="text-primary hover:bg-primary/10"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              Exit Full Page
            </Button>
            <div className="text-center">
              <h2 className="font-arabic text-2xl text-primary">{selectedSurah.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedSurah.englishName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTajweedLegend(!showTajweedLegend)}
                className="text-muted-foreground hover:text-primary"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tajweed Legend */}
        {showTajweedLegend && (
          <div className="max-w-4xl mx-auto p-4 border-b border-primary/10">
            <h3 className="text-primary font-medium mb-3">Tajweed Color Guide</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TAJWEED_RULES.map((rule) => (
                <div key={rule.id} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: rule.color }} />
                  <div>
                    <p className="text-sm text-foreground">{rule.name}</p>
                    <p className="text-xs text-muted-foreground">{rule.arabicName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quran Content - Traditional Style */}
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          {/* Bismillah */}
          {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
            <div className="text-center py-8 mb-8 border-b border-primary/10">
              <p className="font-arabic text-4xl md:text-5xl text-primary leading-loose">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Verses in traditional Quran style */}
          <div className="text-right leading-[3] md:leading-[3.5]" dir="rtl">
            {verses.arabic.map((verse, index) => {
              const ayahNumber = index + 1
              const isCurrentlyPlaying = currentPlayingAyah === ayahNumber

              return (
                <span
                  key={ayahNumber}
                  ref={(el) => {
                    verseRefs.current[ayahNumber] = el as HTMLDivElement
                  }}
                  onClick={() => playAyah(ayahNumber)}
                  className={cn(
                    "font-arabic text-3xl md:text-4xl lg:text-5xl cursor-pointer transition-all inline",
                    isCurrentlyPlaying
                      ? "text-primary bg-primary/10 rounded px-1"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {verse.arabic}{" "}
                  <span className="text-primary/60 text-2xl">﴿{ayahNumber.toLocaleString("ar-SA")}﴾</span>{" "}
                </span>
              )
            })}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0e1a]/95 backdrop-blur-lg border-t border-primary/20 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Select value={selectedReciter.id} onValueChange={(v) => {
                const reciter = RECITERS.find((r) => r.id === v)
                if (reciter) setSelectedReciter(reciter)
              }}>
                <SelectTrigger className="w-48 bg-[#0a0e1a] border-primary/20 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RECITERS.map((reciter) => (
                    <SelectItem key={reciter.id} value={reciter.id}>
                      <span className="font-arabic">{reciter.arabicName}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={playPrevious} className="text-primary">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                onClick={togglePlayPause}
                className="h-12 w-12 rounded-full gold-gradient text-[#0a0e1a]"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={playNext} className="text-primary">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground hover:text-primary"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={[audioVolume]}
                onValueChange={([v]) => setAudioVolume(v)}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
    )
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
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <h1 className="luxury-text text-sm gold-text mb-2">Al-Qur'an Al-Kareem</h1>
        <p className="font-serif text-2xl text-foreground">Quran Learning Platform</p>
        <p className="text-sm text-muted-foreground mt-2 italic font-serif">
          "And We have certainly made the Quran easy for remembrance" - 54:17
        </p>
        <div className="w-32 h-px gold-gradient mx-auto mt-6 opacity-50" />
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
        <TabsList className="w-full bg-card/50 border border-primary/20 p-1">
          <TabsTrigger
            value="read"
            className="flex-1 data-[state=active]:gold-gradient data-[state=active]:text-[#0a0e1a] text-xs"
          >
            Read
          </TabsTrigger>
          <TabsTrigger
            value="learn"
            className="flex-1 data-[state=active]:gold-gradient data-[state=active]:text-[#0a0e1a] text-xs"
          >
            Learn
          </TabsTrigger>
          <TabsTrigger
            value="bookmarks"
            className="flex-1 data-[state=active]:gold-gradient data-[state=active]:text-[#0a0e1a] text-xs"
          >
            Saved
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="flex-1 data-[state=active]:gold-gradient data-[state=active]:text-[#0a0e1a] text-xs"
          >
            Progress
          </TabsTrigger>
        </TabsList>

        {/* Read Tab */}
        <TabsContent value="read" className="space-y-4 mt-4">
          {!selectedSurah ? (
            <>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search surah by name or number..."
                  className="pl-10 bg-[#0a0e1a] border-primary/20"
                />
              </div>

              {/* Reciter Selection */}
              <Card className="p-4 bg-card/50 gold-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-foreground">Select Reciter</h3>
                  <span className="font-arabic text-primary text-sm">{selectedReciter.arabicName}</span>
                </div>
                <Select
                  value={selectedReciter.id}
                  onValueChange={(v) => {
                    const reciter = RECITERS.find((r) => r.id === v)
                    if (reciter) setSelectedReciter(reciter)
                  }}
                >
                  <SelectTrigger className="bg-[#0a0e1a] border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RECITERS.map((reciter) => (
                      <SelectItem key={reciter.id} value={reciter.id}>
                        <div className="flex flex-col">
                          <span>{reciter.name}</span>
                          <span className="text-xs text-muted-foreground">{reciter.style}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>

              {/* Surah List */}
              <ScrollArea className="h-[50vh]">
                <div className="space-y-2">
                  {filteredSurahs.map((surah) => {
                    const isCompleted = readingProgress?.completedSurahs.includes(surah.number)
                    return (
                      <Card
                        key={surah.number}
                        onClick={() => loadSurah(surah)}
                        className={cn(
                          "p-4 cursor-pointer transition-all hover:border-primary/40 bg-card/50 gold-border",
                          isCompleted && "border-primary/50 bg-primary/5"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full gold-gradient flex items-center justify-center text-[#0a0e1a] font-bold text-sm">
                            {surah.number}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-foreground">{surah.englishName}</h3>
                              <span className="text-xl font-arabic text-primary">{surah.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{surah.englishNameTranslation}</span>
                              <span>•</span>
                              <span>{surah.numberOfAyahs} ayahs</span>
                              <span>•</span>
                              <span>{surah.revelationType}</span>
                            </div>
                          </div>
                          {isCompleted && <BookmarkCheck className="h-5 w-5 text-primary" />}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </>
          ) : (
            <>
              {/* Surah Header */}
              <Card className="p-4 bg-card/50 gold-border">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedSurah(null)
                      setVerses(null)
                      stopAudio()
                    }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    All Surahs
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Juz {getJuzNumber(selectedSurah.number, 1)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFullPage(true)}
                      className="text-primary hover:bg-primary/10"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h2 className="text-3xl font-arabic text-primary mb-1">{selectedSurah.name}</h2>
                  <p className="font-serif text-lg text-foreground">{selectedSurah.englishName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSurah.englishNameTranslation}</p>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Button variant="ghost" size="icon" onClick={playPrevious} className="text-primary">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={togglePlayPause}
                    className="h-10 w-10 rounded-full gold-gradient text-[#0a0e1a]"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={playNext} className="text-primary">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setRepeatMode(repeatMode === "none" ? "ayah" : repeatMode === "ayah" ? "surah" : "none")
                    }
                    className={cn(
                      "text-muted-foreground hover:text-primary",
                      repeatMode !== "none" && "text-primary"
                    )}
                  >
                    <Repeat className="h-4 w-4" />
                    {repeatMode === "ayah" && <span className="absolute text-[8px] -bottom-1">1</span>}
                  </Button>
                </div>

                {currentPlayingAyah && (
                  <p className="text-center text-sm text-primary mb-4">
                    Playing Ayah {currentPlayingAyah} of {selectedSurah.numberOfAyahs}
                  </p>
                )}

                {/* Reading Mode & Font Controls */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Select value={readingMode} onValueChange={(v) => setReadingMode(v as ReadingMode)}>
                    <SelectTrigger className="w-36 bg-[#0a0e1a] border-primary/20 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabic">Arabic Only</SelectItem>
                      <SelectItem value="transliteration">Transliteration</SelectItem>
                      <SelectItem value="translation">Translation</SelectItem>
                      <SelectItem value="all">All Three</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={fontSize} onValueChange={(v) => setFontSize(v as typeof fontSize)}>
                    <SelectTrigger className="w-28 bg-[#0a0e1a] border-primary/20 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedReciter.id}
                    onValueChange={(v) => {
                      const reciter = RECITERS.find((r) => r.id === v)
                      if (reciter) setSelectedReciter(reciter)
                    }}
                  >
                    <SelectTrigger className="w-36 bg-[#0a0e1a] border-primary/20 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RECITERS.map((reciter) => (
                        <SelectItem key={reciter.id} value={reciter.id}>
                          {reciter.name.split(" ")[0]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Verses */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading surah...</p>
                </div>
              ) : verses ? (
                <ScrollArea className="h-[45vh]">
                  {/* Bismillah */}
                  {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                    <div className="text-center py-6">
                      <p className={cn("font-arabic text-primary", fontSizeClass)}>
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      {(readingMode === "transliteration" || readingMode === "all") && (
                        <p className="text-muted-foreground mt-2 italic">Bismillahir Rahmanir Raheem</p>
                      )}
                      {(readingMode === "translation" || readingMode === "all") && (
                        <p className="text-foreground/80 mt-1">
                          In the name of Allah, the Most Gracious, the Most Merciful
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    {verses.arabic.map((verse, index) => {
                      const ayahNumber = index + 1
                      const bookmarked = isBookmarked(selectedSurah.number, ayahNumber)
                      const isCurrentlyPlaying = currentPlayingAyah === ayahNumber

                      return (
                        <Card
                          key={ayahNumber}
                          ref={(el) => {
                            verseRefs.current[ayahNumber] = el
                          }}
                          className={cn(
                            "p-4 bg-card/30 border-primary/10 transition-all",
                            bookmarked && "border-primary/40 bg-primary/5",
                            isCurrentlyPlaying && "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          )}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <button
                              onClick={() => playAyah(ayahNumber)}
                              className={cn(
                                "h-8 w-8 rounded-full border flex items-center justify-center text-xs shrink-0 transition-all",
                                isCurrentlyPlaying
                                  ? "gold-gradient text-[#0a0e1a] border-transparent"
                                  : "border-primary/30 text-primary hover:bg-primary/10"
                              )}
                            >
                              {isCurrentlyPlaying ? (
                                <Volume2 className="h-4 w-4" />
                              ) : (
                                ayahNumber
                              )}
                            </button>
                            <div className="flex-1 space-y-3">
                              {/* Arabic */}
                              {(readingMode === "arabic" || readingMode === "all") && (
                                <p
                                  className={cn(
                                    "font-arabic text-right leading-loose",
                                    fontSizeClass,
                                    isCurrentlyPlaying ? "text-primary" : "text-foreground"
                                  )}
                                  dir="rtl"
                                >
                                  {verse.arabic}
                                </p>
                              )}

                              {/* Transliteration */}
                              {(readingMode === "transliteration" || readingMode === "all") && (
                                <p className="text-primary/80 italic">
                                  {verses.transliteration[index]?.transliteration}
                                </p>
                              )}

                              {/* Translation */}
                              {(readingMode === "translation" || readingMode === "all") && (
                                <p className="text-muted-foreground">
                                  {verses.translation[index]?.translation}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => playAyah(ayahNumber)}
                              className="text-muted-foreground hover:text-primary"
                            >
                              {isCurrentlyPlaying && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVerse(ayahNumber)
                                setShowBookmarkDialog(true)
                              }}
                              className={cn(
                                "text-muted-foreground hover:text-primary",
                                bookmarked && "text-primary"
                              )}
                            >
                              {bookmarked ? (
                                <BookmarkCheck className="h-4 w-4" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Mark Complete Button */}
                  <div className="py-8 text-center">
                    <Button
                      onClick={markSurahComplete}
                      className="gold-gradient text-[#0a0e1a] font-semibold hover:opacity-90"
                    >
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Mark Surah as Complete
                    </Button>
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Failed to load surah. Please try again.</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedSurah.number <= 1}
                  onClick={() => loadSurah(SURAHS[selectedSurah.number - 2])}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedSurah.number >= 114}
                  onClick={() => loadSurah(SURAHS[selectedSurah.number])}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* Learn Tab - Tajweed */}
        <TabsContent value="learn" className="space-y-4 mt-4">
          <Card className="p-6 bg-card/50 gold-border">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Tajweed Rules Guide
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Learn the rules of Quranic recitation to perfect your pronunciation.
            </p>

            <div className="space-y-4">
              {TAJWEED_RULES.map((rule) => (
                <Card key={rule.id} className="p-4 bg-[#0a0e1a] border-primary/10">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: rule.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">{rule.name}</h4>
                        <span className="font-arabic text-primary text-lg">{rule.arabicName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {rule.examples.map((example, i) => (
                          <span
                            key={i}
                            className="font-arabic text-lg px-2 py-1 rounded"
                            style={{ backgroundColor: `${rule.color}20`, color: rule.color }}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Memorization Tips */}
          <Card className="p-6 bg-card/50 gold-border">
            <h3 className="text-lg font-medium text-foreground mb-4">Memorization Tips</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span>Listen to the recitation repeatedly before attempting to memorize</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Understand the meaning of the verses you're memorizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>Recite out loud to reinforce memory through multiple senses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Review previously memorized portions daily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">5.</span>
                <span>Use the repeat function for challenging verses</span>
              </li>
            </ul>
          </Card>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4 mt-4">
          {bookmarks.length === 0 ? (
            <Card className="p-8 text-center bg-card/50 gold-border">
              <Bookmark className="h-12 w-12 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No bookmarks yet. Start reading and save verses that speak to your heart.
              </p>
            </Card>
          ) : (
            <ScrollArea className="h-[60vh]">
              <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                  <Card
                    key={bookmark.id}
                    className={cn(
                      "p-4 bg-card/50 border-l-4",
                      bookmark.color === "gold" && "border-l-primary",
                      bookmark.color === "silver" && "border-l-gray-400",
                      bookmark.color === "bronze" && "border-l-amber-700"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {bookmark.surahName} : {bookmark.ayahNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(bookmark.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBookmark(bookmark.id)}
                        className="text-muted-foreground hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-arabic text-right text-lg text-primary mb-2" dir="rtl">
                      {bookmark.arabic}
                    </p>
                    <p className="text-sm text-muted-foreground">{bookmark.translation}</p>
                    {bookmark.note && (
                      <p className="text-sm text-foreground/80 mt-2 italic border-t border-primary/10 pt-2">
                        Note: {bookmark.note}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4 mt-4">
          <Card className="p-6 bg-card/50 gold-border">
            <h3 className="text-lg font-medium text-foreground mb-4">Your Quran Journey</h3>

            {readingProgress ? (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#0a0e1a] rounded-lg">
                    <p className="text-3xl font-bold text-primary">
                      {readingProgress.completedSurahs.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Surahs Completed</p>
                  </div>
                  <div className="text-center p-4 bg-[#0a0e1a] rounded-lg">
                    <p className="text-3xl font-bold text-primary">{readingProgress.totalAyahsRead}</p>
                    <p className="text-xs text-muted-foreground">Ayahs Read</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="text-primary">
                      {Math.round((readingProgress.completedSurahs.length / 114) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#0a0e1a] rounded-full overflow-hidden">
                    <div
                      className="h-full gold-gradient transition-all"
                      style={{
                        width: `${(readingProgress.completedSurahs.length / 114) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Last Read */}
                <div className="text-sm text-muted-foreground">
                  <p>
                    Last read: {SURAHS[readingProgress.lastSurah - 1]?.englishName}, Ayah{" "}
                    {readingProgress.lastAyah}
                  </p>
                  <p>{new Date(readingProgress.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Start reading to track your progress towards completing the Quran.
              </p>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bookmark Dialog */}
      <Dialog open={showBookmarkDialog} onOpenChange={setShowBookmarkDialog}>
        <DialogContent className="bg-[#0a0e1a] border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">Save Bookmark</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Color</label>
              <div className="flex gap-2">
                {(["gold", "silver", "bronze"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setBookmarkColor(color)}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      color === "gold" && "bg-primary",
                      color === "silver" && "bg-gray-400",
                      color === "bronze" && "bg-amber-700",
                      bookmarkColor === color ? "border-white scale-110" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Note (optional)</label>
              <Textarea
                value={bookmarkNote}
                onChange={(e) => setBookmarkNote(e.target.value)}
                placeholder="Add a personal note..."
                className="bg-[#0a0e1a] border-primary/20"
              />
            </div>
            <Button onClick={addBookmark} className="w-full gold-gradient text-[#0a0e1a]">
              Save Bookmark
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  )
}
