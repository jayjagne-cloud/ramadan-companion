"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  MapPin,
  Clock,
  Bell,
  BellOff,
  Search,
  ChevronDown,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  RefreshCw,
  Settings,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  type PrayerTimes,
  type LocationData,
  type PrayerReminder,
  CALCULATION_METHODS,
  DEFAULT_REMINDERS,
  fetchPrayerTimes,
  getLocationFromCoords,
  searchLocation,
  getNextPrayer,
  formatTimeRemaining,
  requestNotificationPermission,
  schedulePrayerReminder,
} from "@/lib/prayer-times"

const PRAYER_ICONS: Record<string, React.ReactNode> = {
  Fajr: <Moon className="w-5 h-5" />,
  Sunrise: <Sunrise className="w-5 h-5" />,
  Dhuhr: <Sun className="w-5 h-5" />,
  Asr: <Sun className="w-5 h-5 opacity-70" />,
  Maghrib: <Sunset className="w-5 h-5" />,
  Isha: <Moon className="w-5 h-5" />,
}

const PRAYER_MESSAGES: Record<string, string> = {
  Fajr: "Begin your day with Allah. The angels witness this prayer.",
  Dhuhr: "Pause in the middle of your day. Return to your Lord.",
  Asr: "The afternoon prayer - do not let it slip away.",
  Maghrib: "Break your fast and stand before Allah with gratitude.",
  Isha: "End your day in His remembrance. He is closer than you think.",
}

export default function SalahTimesPage() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [method, setMethod] = useState(2) // ISNA default
  const [showMethodPicker, setShowMethodPicker] = useState(false)
  const [reminders, setReminders] = useState<PrayerReminder[]>(DEFAULT_REMINDERS)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; isNow: boolean } | null>(null)

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Update next prayer when times change
  useEffect(() => {
    if (prayerTimes) {
      setNextPrayer(getNextPrayer(prayerTimes))
    }
  }, [prayerTimes, currentTime])

  // Load saved data
  useEffect(() => {
    const savedLocation = localStorage.getItem("barrkeh_location")
    const savedMethod = localStorage.getItem("barrkeh_prayer_method")
    const savedReminders = localStorage.getItem("barrkeh_reminders")

    if (savedLocation) {
      const loc = JSON.parse(savedLocation)
      setLocation(loc)
      loadPrayerTimes(loc.latitude, loc.longitude, savedMethod ? Number.parseInt(savedMethod) : 2)
    } else {
      detectLocation()
    }

    if (savedMethod) setMethod(Number.parseInt(savedMethod))
    if (savedReminders) setReminders(JSON.parse(savedReminders))

    // Check notification permission
    if ("Notification" in window && Notification.permission === "granted") {
      setNotificationsEnabled(true)
    }
  }, [])

  const loadPrayerTimes = async (lat: number, lng: number, calcMethod: number) => {
    setLoading(true)
    const times = await fetchPrayerTimes(lat, lng, calcMethod)
    setPrayerTimes(times)
    setLoading(false)
  }

  const detectLocation = async () => {
    setLoading(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = await getLocationFromCoords(position.coords.latitude, position.coords.longitude)
          if (loc) {
            setLocation(loc)
            localStorage.setItem("barrkeh_location", JSON.stringify(loc))
            await loadPrayerTimes(loc.latitude, loc.longitude, method)
          }
          setLoading(false)
        },
        () => {
          setLoading(false)
        },
      )
    } else {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    const loc = await searchLocation(searchQuery)
    if (loc) {
      setLocation(loc)
      localStorage.setItem("barrkeh_location", JSON.stringify(loc))
      await loadPrayerTimes(loc.latitude, loc.longitude, method)
    }
    setSearching(false)
    setSearchQuery("")
  }

  const handleMethodChange = (newMethod: number) => {
    setMethod(newMethod)
    localStorage.setItem("barrkeh_prayer_method", newMethod.toString())
    setShowMethodPicker(false)
    if (location) {
      loadPrayerTimes(location.latitude, location.longitude, newMethod)
    }
  }

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission()
      setNotificationsEnabled(granted)
      if (granted && prayerTimes) {
        scheduleAllReminders()
      }
    } else {
      setNotificationsEnabled(false)
    }
  }

  const scheduleAllReminders = useCallback(() => {
    if (!prayerTimes || !notificationsEnabled) return

    reminders.forEach((reminder) => {
      if (reminder.enabled) {
        const time = prayerTimes[reminder.prayer as keyof PrayerTimes]
        if (typeof time === "string") {
          schedulePrayerReminder(reminder.prayer, time, reminder.minutesBefore)
        }
      }
    })
  }, [prayerTimes, reminders, notificationsEnabled])

  useEffect(() => {
    scheduleAllReminders()
  }, [scheduleAllReminders])

  const toggleReminder = (prayer: string) => {
    const updated = reminders.map((r) => (r.prayer === prayer ? { ...r, enabled: !r.enabled } : r))
    setReminders(updated)
    localStorage.setItem("barrkeh_reminders", JSON.stringify(updated))
  }

  const isPrayerPassed = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const prayerMinutes = hours * 60 + minutes
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    return currentMinutes > prayerMinutes
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0f1629] to-[#0a0e1a] border-b border-[#c9a227]/20">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/33df7b37-1a2e-432a-8029.jpeg"
                alt="Barrkeh DigiProducts"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h1 className="text-lg font-serif text-[#c9a227] tracking-wide">SALAH TIMES</h1>
                <p className="text-xs text-[#d4af37]/60">Prayer is the pillar of your deen</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-[#c9a227]/70 hover:text-[#c9a227] hover:bg-[#c9a227]/10"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Location Display */}
          <div className="flex items-center gap-2 text-[#d4af37]/80 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location ? `${location.city}, ${location.country}` : "Location not set"}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={detectLocation}
              className="text-[#c9a227]/60 hover:text-[#c9a227] p-1 h-auto"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>

          {/* Hijri Date */}
          {prayerTimes && (
            <div className="text-center py-2 border-y border-[#c9a227]/20">
              <p className="text-[#c9a227] font-serif">
                {prayerTimes.hijriDate} {prayerTimes.hijriMonth} {prayerTimes.hijriYear} AH
              </p>
              <p className="text-xs text-[#d4af37]/50">{prayerTimes.date}</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-[#0f1629] border-b border-[#c9a227]/20">
          <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
            {/* Location Search */}
            <div>
              <label className="text-xs text-[#d4af37]/60 uppercase tracking-wider mb-2 block">Search Location</label>
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter city or address..."
                  className="bg-[#0a0e1a] border-[#c9a227]/30 text-white placeholder:text-[#d4af37]/30"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  disabled={searching}
                  className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-[#0a0e1a]"
                >
                  {searching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Calculation Method */}
            <div>
              <label className="text-xs text-[#d4af37]/60 uppercase tracking-wider mb-2 block">
                Calculation Method
              </label>
              <Button
                variant="outline"
                onClick={() => setShowMethodPicker(!showMethodPicker)}
                className="w-full justify-between border-[#c9a227]/30 text-[#d4af37] hover:bg-[#c9a227]/10"
              >
                <span className="truncate text-left">{CALCULATION_METHODS.find((m) => m.id === method)?.name}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
              {showMethodPicker && (
                <div className="mt-2 bg-[#0a0e1a] border border-[#c9a227]/30 rounded-lg max-h-48 overflow-y-auto">
                  {CALCULATION_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleMethodChange(m.id)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-[#c9a227]/10 transition-colors ${
                        method === m.id ? "text-[#c9a227] bg-[#c9a227]/10" : "text-[#d4af37]/70"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-[#d4af37]/60 uppercase tracking-wider">Prayer Reminders</label>
                <button
                  type="button"
                  onClick={toggleNotifications}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                    notificationsEnabled ? "bg-[#c9a227]" : "bg-[#1a1f35]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                      notificationsEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {notificationsEnabled && (
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.prayer}
                      className="flex items-center justify-between py-3 px-4 bg-[#0a0e1a] rounded-lg border border-[#c9a227]/10"
                    >
                      <span className="text-[#d4af37]/80 text-sm">{reminder.prayer}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#d4af37]/50">{reminder.minutesBefore}min before</span>
                        <button
                          type="button"
                          onClick={() => toggleReminder(reminder.prayer)}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                            reminder.enabled ? "bg-[#c9a227]" : "bg-[#1a1f35]"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                              reminder.enabled ? "translate-x-8" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-2 border-[#c9a227]/30 border-t-[#c9a227] rounded-full animate-spin mb-4" />
            <p className="text-[#d4af37]/60 text-sm">Loading prayer times...</p>
          </div>
        ) : prayerTimes ? (
          <>
            {/* Next Prayer Card */}
            {nextPrayer && (
              <Card className="bg-gradient-to-br from-[#c9a227]/20 to-[#0f1629] border-[#c9a227]/40 p-6 mb-6">
                <div className="text-center">
                  <p className="text-xs text-[#d4af37]/60 uppercase tracking-wider mb-1">
                    {nextPrayer.isNow ? "Time for" : "Next Prayer"}
                  </p>
                  <h2 className="text-3xl font-serif text-[#c9a227] mb-2">{nextPrayer.name}</h2>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-[#d4af37]/60" />
                    <span className="text-xl text-white">{nextPrayer.time}</span>
                    {!nextPrayer.isNow && (
                      <span className="text-sm text-[#d4af37]/60">({formatTimeRemaining(nextPrayer.time)})</span>
                    )}
                  </div>
                  <p className="text-sm text-[#d4af37]/70 italic leading-relaxed">{PRAYER_MESSAGES[nextPrayer.name]}</p>
                  {nextPrayer.isNow && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-[#c9a227]">
                      <Bell className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-medium">It's time to pray</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* All Prayer Times */}
            <div className="space-y-3">
              <h3 className="text-xs text-[#d4af37]/60 uppercase tracking-wider mb-3">Today's Prayer Times</h3>
              {(["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const).map((prayer) => {
                const time = prayerTimes[prayer]
                const passed = isPrayerPassed(time)
                const isNext = nextPrayer?.name === prayer
                const isSunrise = prayer === "Sunrise"

                return (
                  <Card
                    key={prayer}
                    className={`border transition-all ${
                      isNext
                        ? "bg-gradient-to-r from-[#c9a227]/20 to-transparent border-[#c9a227]/50"
                        : passed
                          ? "bg-[#0f1629]/50 border-[#c9a227]/10 opacity-60"
                          : "bg-[#0f1629] border-[#c9a227]/20"
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isNext
                              ? "bg-[#c9a227]/30 text-[#c9a227]"
                              : passed
                                ? "bg-[#c9a227]/10 text-[#d4af37]/40"
                                : "bg-[#c9a227]/10 text-[#d4af37]/70"
                          }`}
                        >
                          {PRAYER_ICONS[prayer]}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              isNext ? "text-[#c9a227]" : passed ? "text-[#d4af37]/50" : "text-white"
                            }`}
                          >
                            {prayer}
                          </p>
                          {isSunrise && <p className="text-xs text-[#d4af37]/40">No prayer</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-lg font-mono ${
                            isNext ? "text-[#c9a227]" : passed ? "text-[#d4af37]/50" : "text-white"
                          }`}
                        >
                          {time}
                        </span>
                        {passed && !isSunrise && <CheckCircle2 className="w-4 h-4 text-green-500/60" />}
                        {!passed && !isSunrise && notificationsEnabled && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleReminder(prayer)}
                            className="h-8 w-8"
                          >
                            {reminders.find((r) => r.prayer === prayer)?.enabled ? (
                              <Bell className="w-4 h-4 text-[#c9a227]" />
                            ) : (
                              <BellOff className="w-4 h-4 text-[#d4af37]/30" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Spiritual Reminder */}
            <Card className="mt-6 bg-[#0f1629] border-[#c9a227]/20 p-5">
              <div className="text-center">
                <p className="text-[#c9a227] font-serif text-lg mb-2">A Reminder</p>
                <p className="text-[#d4af37]/70 text-sm leading-relaxed italic">
                  "Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater."
                </p>
                <p className="text-[#d4af37]/50 text-xs mt-2">— Al-Ankabut 29:45</p>
              </div>
            </Card>
          </>
        ) : (
          <Card className="bg-[#0f1629] border-[#c9a227]/20 p-6 text-center">
            <MapPin className="w-12 h-12 text-[#c9a227]/30 mx-auto mb-4" />
            <p className="text-[#d4af37]/70 mb-4">Please set your location to view prayer times</p>
            <Button onClick={detectLocation} className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-[#0a0e1a]">
              <MapPin className="w-4 h-4 mr-2" />
              Detect My Location
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
