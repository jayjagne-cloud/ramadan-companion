// Local storage utilities for the Ramadan planner

export interface UserData {
  intentions: Intention[]
  baseline: SpiritualBaseline | null
  dailyEntries: Record<number, DailyEntry>
  weeklyReflections: Record<number, WeeklyReflection>
  charityLog: CharityEntry[]
  laylatulQadrEntries: Record<number, LaylatulQadrEntry>
  savedDuas: SavedDua[]
  lowImaanEntries: LowImaanEntry[]
  forgivenessList: ForgivenessEntry[]
  eidReflection: EidReflection | null
  postEidEntries: Record<number, PostEidEntry>
  letterFromRamadan: string
  currentDay: number
  quranGoal: QuranGoal | null
  quranProgress: Record<number, number>
  streaks: Streaks
  settings: UserSettings
  vaults: {
    duaVault: VaultItem[]
    ayahVault: VaultItem[]
    nuurVault: VaultItem[] // moments of light
    repentanceVault: VaultItem[] // private
  }
  todayAnchor: TodayAnchor | null
}

export interface VaultItem {
  id: string
  content: string
  arabic?: string
  reference?: string
  tags: string[]
  timestamp: string
  useTonight: boolean
  dayNumber?: number
}

export interface TodayAnchor {
  type: "ayah" | "name" | "dua" | "custom"
  content: string
  arabic?: string
  timestamp: string
}

export interface QuranGoal {
  type: "khatm" | "half" | "juz" | "custom"
  dailyTarget: number
  totalPages: number
}

export interface Streaks {
  salahStreak: number
  quranStreak: number
  lastSalahDate: string | null
  lastQuranDate: string | null
}

export interface UserSettings {
  userName: string
  showHijriDate: boolean
  dailyReminder: boolean
}

export interface Intention {
  id: string
  text: string
  timestamp: string
  type: "why" | "asking" | "release"
}

export interface SpiritualBaseline {
  salahConsistency: number
  quranRelationship: string
  emotionalState: string
  spiritualFear: string
  spiritualHope: string
  timestamp: string
}

export interface DailyEntry {
  day: number
  date: string
  ayahReflection?: string
  savedAyah: boolean
  nameReflection?: string
  duaResponse?: string
  mood?: string
  moodNote?: string
  ihsaanCompleted: boolean
  ihsaanNote?: string
  salah: {
    fajr: { prayed: boolean; present: boolean; distraction?: string }
    dhuhr: { prayed: boolean; present: boolean; distraction?: string }
    asr: { prayed: boolean; present: boolean; distraction?: string }
    maghrib: { prayed: boolean; present: boolean; distraction?: string }
    isha: { prayed: boolean; present: boolean; distraction?: string }
    taraweeh: { prayed: boolean; present: boolean; distraction?: string }
    witr?: { prayed: boolean; present: boolean; distraction?: string }
  }
  fastingReflection?: {
    hardToday?: string
    softenedHeart?: string
  }
  quranPagesRead?: number
  morningDhikrDone?: boolean
  nuurMoment?: string
}

export interface WeeklyReflection {
  week: number
  responses: string[]
  timestamp: string
}

export interface CharityEntry {
  id: string
  type: string
  note?: string
  hidden: boolean
  timestamp: string
}

export interface LaylatulQadrEntry {
  night: number
  dua: string
  letterToAllah?: string
  repentanceNote?: string
  tahajjud: {
    performed: boolean
    presenceLevel: number
    reflection?: string
  }
  timestamp: string
}

export interface SavedDua {
  id: string
  text: string
  source: string
  timestamp: string
}

export interface LowImaanEntry {
  id: string
  heavyBecause: string
  mercyWouldSay: string
  smallStep: string
  timestamp: string
}

export interface ForgivenessEntry {
  id: string
  person: string
  gain: string
  released: boolean
  timestamp: string
}

export interface EidReflection {
  changed: string
  proudOf: string
  preserve: string
  timestamp: string
}

export interface PostEidEntry {
  day: number
  response: string
  timestamp: string
}

const STORAGE_KEY = "barrkeh-ramadan-planner"

export function getDefaultUserData(): UserData {
  return {
    intentions: [],
    baseline: null,
    dailyEntries: {},
    weeklyReflections: {},
    charityLog: [],
    laylatulQadrEntries: {},
    savedDuas: [],
    lowImaanEntries: [],
    forgivenessList: [],
    eidReflection: null,
    postEidEntries: {},
    letterFromRamadan: "",
    currentDay: 1,
    quranGoal: null,
    quranProgress: {},
    streaks: {
      salahStreak: 0,
      quranStreak: 0,
      lastSalahDate: null,
      lastQuranDate: null,
    },
    settings: {
      userName: "",
      showHijriDate: true,
      dailyReminder: false,
    },
    vaults: {
      duaVault: [],
      ayahVault: [],
      nuurVault: [],
      repentanceVault: [],
    },
    todayAnchor: null,
  }
}

export function loadUserData(): UserData {
  if (typeof window === "undefined") return getDefaultUserData()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...getDefaultUserData(), ...JSON.parse(stored) }
    }
  } catch (e) {
    console.error("Error loading user data:", e)
  }
  return getDefaultUserData()
}

export function saveUserData(data: UserData): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error("Error saving user data:", e)
  }
}

export function exportUserData(): string {
  const data = loadUserData()
  return JSON.stringify(data, null, 2)
}

export function importUserData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString)
    const mergedData = { ...getDefaultUserData(), ...data }
    saveUserData(mergedData)
    return true
  } catch (e) {
    console.error("Error importing user data:", e)
    return false
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function calculateProgress(userData: UserData): {
  daysCompleted: number
  salahPercentage: number
  quranPercentage: number
  barakahLevel: number
  barakahMessage: string
} {
  const entries = Object.values(userData.dailyEntries)
  const daysCompleted = entries.length

  let totalSalahPrayed = 0
  let totalSalahPossible = 0
  let presenceScore = 0

  entries.forEach((entry) => {
    const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const
    prayers.forEach((prayer) => {
      totalSalahPossible++
      if (entry.salah[prayer]?.prayed) {
        totalSalahPrayed++
        if (entry.salah[prayer]?.present) presenceScore++
      }
    })
  })

  const salahPercentage = totalSalahPossible > 0 ? Math.round((totalSalahPrayed / totalSalahPossible) * 100) : 0

  const totalPagesRead = Object.values(userData.quranProgress).reduce((a, b) => a + b, 0)
  const quranTarget = userData.quranGoal?.totalPages || 604
  const quranPercentage = Math.min(100, Math.round((totalPagesRead / quranTarget) * 100))

  // Calculate barakah level (0-100) based on multiple factors
  const charityCount = userData.charityLog.length
  const dhikrCount = entries.filter((e) => e.morningDhikrDone).length
  const ihsaanCount = entries.filter((e) => e.ihsaanCompleted).length
  const vaultItems = Object.values(userData.vaults).flat().length

  const barakahLevel = Math.min(
    100,
    Math.round(
      salahPercentage * 0.3 +
        quranPercentage * 0.2 +
        (presenceScore / Math.max(1, totalSalahPossible)) * 100 * 0.2 +
        Math.min(100, charityCount * 10) * 0.1 +
        Math.min(100, dhikrCount * 5) * 0.1 +
        Math.min(100, ihsaanCount * 5) * 0.1,
    ),
  )

  // Soft, encouraging messages based on level
  let barakahMessage = ""
  if (barakahLevel < 20) barakahMessage = "Every small step matters"
  else if (barakahLevel < 40) barakahMessage = "Your light is beginning to grow"
  else if (barakahLevel < 60) barakahMessage = "Today's light is building"
  else if (barakahLevel < 80) barakahMessage = "Your soul is finding its rhythm"
  else barakahMessage = "Nuur upon nuur"

  return { daysCompleted, salahPercentage, quranPercentage, barakahLevel, barakahMessage }
}

export function getHijriDate(): string {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    calendar: "islamic-umalqura",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  try {
    const hijri = today.toLocaleDateString("en-u-ca-islamic-umalqura", options)
    return hijri
  } catch {
    return ""
  }
}
