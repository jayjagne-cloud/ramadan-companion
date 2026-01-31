// Prayer times calculation using Aladhan API
// Supports multiple calculation methods and location-based times

export interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  date: string
  hijriDate: string
  hijriMonth: string
  hijriYear: string
}

export interface LocationData {
  latitude: number
  longitude: number
  city: string
  country: string
  timezone: string
}

export interface PrayerReminder {
  prayer: string
  enabled: boolean
  minutesBefore: number
}

export const CALCULATION_METHODS = [
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 7, name: "Institute of Geophysics, University of Tehran" },
  { id: 8, name: "Gulf Region" },
  { id: 9, name: "Kuwait" },
  { id: 10, name: "Qatar" },
  { id: 11, name: "Majlis Ugama Islam Singapura" },
  { id: 12, name: "Union Organization Islamic de France" },
  { id: 13, name: "Diyanet İşleri Başkanlığı, Turkey" },
  { id: 14, name: "Spiritual Administration of Muslims of Russia" },
  { id: 15, name: "Moonsighting Committee Worldwide" },
]

export const DEFAULT_REMINDERS: PrayerReminder[] = [
  { prayer: "Fajr", enabled: true, minutesBefore: 15 },
  { prayer: "Dhuhr", enabled: true, minutesBefore: 10 },
  { prayer: "Asr", enabled: true, minutesBefore: 10 },
  { prayer: "Maghrib", enabled: true, minutesBefore: 5 },
  { prayer: "Isha", enabled: true, minutesBefore: 10 },
]

export async function getLocationFromCoords(lat: number, lng: number): Promise<LocationData | null> {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    )
    const data = await response.json()
    return {
      latitude: lat,
      longitude: lng,
      city: data.city || data.locality || "Unknown",
      country: data.countryName || "Unknown",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  } catch {
    return null
  }
}

export async function searchLocation(query: string): Promise<LocationData | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
    )
    const data = await response.json()
    if (data && data.length > 0) {
      const result = data[0]
      return {
        latitude: Number.parseFloat(result.lat),
        longitude: Number.parseFloat(result.lon),
        city: result.display_name.split(",")[0],
        country: result.display_name.split(",").pop()?.trim() || "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    }
    return null
  } catch {
    return null
  }
}

export async function fetchPrayerTimes(
  latitude: number,
  longitude: number,
  method = 2,
  date?: Date,
): Promise<PrayerTimes | null> {
  try {
    const d = date || new Date()
    const dateStr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}`,
    )
    const data = await response.json()

    if (data.code === 200) {
      const timings = data.data.timings
      const hijri = data.data.date.hijri

      return {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        date: data.data.date.readable,
        hijriDate: hijri.day,
        hijriMonth: hijri.month.en,
        hijriYear: hijri.year,
      }
    }
    return null
  } catch {
    return null
  }
}

export async function fetchMonthlyPrayerTimes(
  latitude: number,
  longitude: number,
  method = 2,
  month: number,
  year: number,
): Promise<PrayerTimes[]> {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=${method}`,
    )
    const data = await response.json()

    if (data.code === 200) {
      return data.data.map((day: any) => ({
        Fajr: day.timings.Fajr.split(" ")[0],
        Sunrise: day.timings.Sunrise.split(" ")[0],
        Dhuhr: day.timings.Dhuhr.split(" ")[0],
        Asr: day.timings.Asr.split(" ")[0],
        Maghrib: day.timings.Maghrib.split(" ")[0],
        Isha: day.timings.Isha.split(" ")[0],
        date: day.date.readable,
        hijriDate: day.date.hijri.day,
        hijriMonth: day.date.hijri.month.en,
        hijriYear: day.date.hijri.year,
      }))
    }
    return []
  } catch {
    return []
  }
}

export function getNextPrayer(times: PrayerTimes): { name: string; time: string; isNow: boolean } | null {
  if (!times) return null

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { name: "Fajr", time: times.Fajr },
    { name: "Dhuhr", time: times.Dhuhr },
    { name: "Asr", time: times.Asr },
    { name: "Maghrib", time: times.Maghrib },
    { name: "Isha", time: times.Isha },
  ]

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(":").map(Number)
    const prayerMinutes = hours * 60 + minutes

    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes
      return {
        name: prayer.name,
        time: prayer.time,
        isNow: diff <= 15,
      }
    }
  }

  // If all prayers passed, next is Fajr tomorrow
  return { name: "Fajr", time: times.Fajr, isNow: false }
}

export function formatTimeRemaining(targetTime: string): string {
  const now = new Date()
  const [hours, minutes] = targetTime.split(":").map(Number)

  const targetDate = new Date()
  targetDate.setHours(hours, minutes, 0, 0)

  // If time has passed, it's tomorrow
  if (targetDate < now) {
    targetDate.setDate(targetDate.getDate() + 1)
  }

  const diff = targetDate.getTime() - now.getTime()
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`
  }
  return `${diffMinutes}m`
}

export function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) {
    return Promise.resolve(false)
  }

  if (Notification.permission === "granted") {
    return Promise.resolve(true)
  }

  return Notification.requestPermission().then((permission) => permission === "granted")
}

export function schedulePrayerReminder(prayer: string, time: string, minutesBefore: number) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return null
  }

  const [hours, minutes] = time.split(":").map(Number)
  const targetDate = new Date()
  targetDate.setHours(hours, minutes - minutesBefore, 0, 0)

  const now = new Date()
  const delay = targetDate.getTime() - now.getTime()

  if (delay > 0) {
    return setTimeout(() => {
      new Notification(`${prayer} Prayer Reminder`, {
        body: `${prayer} prayer is in ${minutesBefore} minutes. Prepare your heart and wudu.`,
        icon: "/images/33df7b37-1a2e-432a-8029.jpeg",
        tag: `prayer-${prayer}`,
      })
    }, delay)
  }

  return null
}
