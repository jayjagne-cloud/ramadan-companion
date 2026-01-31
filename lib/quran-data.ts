// Complete Quran Surah metadata with verse counts
// Verses are loaded dynamically via API to keep bundle size manageable

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: "Meccan" | "Medinan"
}

export interface Verse {
  number: number
  arabic: string
  transliteration: string
  translation: string
  audioUrl?: string
}

export interface QuranBookmark {
  id: string
  surahNumber: number
  ayahNumber: number
  surahName: string
  arabic: string
  translation: string
  note?: string
  timestamp: string
  color: "gold" | "silver" | "bronze"
}

export interface ReadingProgress {
  lastSurah: number
  lastAyah: number
  completedSurahs: number[]
  totalAyahsRead: number
  timestamp: string
}

// Quran Reciters with API identifiers
export interface Reciter {
  id: string
  name: string
  arabicName: string
  style: string
  apiIdentifier: string
}

export const RECITERS: Reciter[] = [
  {
    id: "mishary",
    name: "Mishary Rashid Alafasy",
    arabicName: "مشاري راشد العفاسي",
    style: "Murattal",
    apiIdentifier: "ar.alafasy",
  },
  {
    id: "sudais",
    name: "Abdurrahman As-Sudais",
    arabicName: "عبدالرحمن السديس",
    style: "Murattal",
    apiIdentifier: "ar.abdurrahmaansudais",
  },
  {
    id: "ghamdi",
    name: "Saad Al-Ghamdi",
    arabicName: "سعد الغامدي",
    style: "Murattal",
    apiIdentifier: "ar.saoodshuraym",
  },
  {
    id: "minshawi",
    name: "Mohamed Siddiq El-Minshawi",
    arabicName: "محمد صديق المنشاوي",
    style: "Mujawwad",
    apiIdentifier: "ar.minshawi",
  },
  {
    id: "husary",
    name: "Mahmoud Khalil Al-Husary",
    arabicName: "محمود خليل الحصري",
    style: "Murattal",
    apiIdentifier: "ar.husary",
  },
]

// Tajweed rules and their colors
export interface TajweedRule {
  id: string
  name: string
  arabicName: string
  description: string
  color: string
  examples: string[]
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: "ghunnah",
    name: "Ghunnah",
    arabicName: "غُنَّة",
    description: "Nasalization - A nasal sound held for 2 counts",
    color: "#2D8B4E", // Green
    examples: ["نّ", "مّ"],
  },
  {
    id: "ikhfa",
    name: "Ikhfa",
    arabicName: "إخفاء",
    description: "Concealment - Hiding the noon sound with nasalization",
    color: "#1E90FF", // Blue
    examples: ["نت", "نث", "نج"],
  },
  {
    id: "idgham",
    name: "Idgham",
    arabicName: "إدغام",
    description: "Merging - Merging one letter into another",
    color: "#FF6B35", // Orange
    examples: ["نر", "نل", "نم", "نن", "نو", "ني"],
  },
  {
    id: "iqlab",
    name: "Iqlab",
    arabicName: "إقلاب",
    description: "Conversion - Changing noon to meem sound",
    color: "#9B59B6", // Purple
    examples: ["نب", "مب"],
  },
  {
    id: "qalqalah",
    name: "Qalqalah",
    arabicName: "قلقلة",
    description: "Echoing - A slight bounce on certain letters",
    color: "#E74C3C", // Red
    examples: ["ق", "ط", "ب", "ج", "د"],
  },
  {
    id: "madd",
    name: "Madd",
    arabicName: "مَدّ",
    description: "Prolongation - Extending vowel sounds",
    color: "#F1C40F", // Yellow/Gold
    examples: ["آ", "وو", "يي"],
  },
]

// Get audio URL for a specific ayah
export function getAudioUrl(reciterId: string, surahNumber: number, ayahNumber: number): string {
  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0]
  // Format: https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3
  const ayahGlobal = getGlobalAyahNumber(surahNumber, ayahNumber)
  return `https://cdn.islamic.network/quran/audio/128/${reciter.apiIdentifier}/${ayahGlobal}.mp3`
}

// Get global ayah number (1-6236) from surah and ayah number
export function getGlobalAyahNumber(surahNumber: number, ayahNumber: number): number {
  let globalNumber = 0
  for (let i = 0; i < surahNumber - 1; i++) {
    globalNumber += SURAHS[i].numberOfAyahs
  }
  return globalNumber + ayahNumber
}

export const SURAHS: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatihah",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan",
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    revelationType: "Medinan",
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Aal-E-Imran",
    englishNameTranslation: "The Family of Imran",
    numberOfAyahs: 200,
    revelationType: "Medinan",
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    englishNameTranslation: "The Women",
    numberOfAyahs: 176,
    revelationType: "Medinan",
  },
  {
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    englishNameTranslation: "The Table Spread",
    numberOfAyahs: 120,
    revelationType: "Medinan",
  },
  {
    number: 6,
    name: "الأنعام",
    englishName: "Al-An'am",
    englishNameTranslation: "The Cattle",
    numberOfAyahs: 165,
    revelationType: "Meccan",
  },
  {
    number: 7,
    name: "الأعراف",
    englishName: "Al-A'raf",
    englishNameTranslation: "The Heights",
    numberOfAyahs: 206,
    revelationType: "Meccan",
  },
  {
    number: 8,
    name: "الأنفال",
    englishName: "Al-Anfal",
    englishNameTranslation: "The Spoils of War",
    numberOfAyahs: 75,
    revelationType: "Medinan",
  },
  {
    number: 9,
    name: "التوبة",
    englishName: "At-Tawbah",
    englishNameTranslation: "The Repentance",
    numberOfAyahs: 129,
    revelationType: "Medinan",
  },
  {
    number: 10,
    name: "يونس",
    englishName: "Yunus",
    englishNameTranslation: "Jonah",
    numberOfAyahs: 109,
    revelationType: "Meccan",
  },
  {
    number: 11,
    name: "هود",
    englishName: "Hud",
    englishNameTranslation: "Hud",
    numberOfAyahs: 123,
    revelationType: "Meccan",
  },
  {
    number: 12,
    name: "يوسف",
    englishName: "Yusuf",
    englishNameTranslation: "Joseph",
    numberOfAyahs: 111,
    revelationType: "Meccan",
  },
  {
    number: 13,
    name: "الرعد",
    englishName: "Ar-Ra'd",
    englishNameTranslation: "The Thunder",
    numberOfAyahs: 43,
    revelationType: "Medinan",
  },
  {
    number: 14,
    name: "إبراهيم",
    englishName: "Ibrahim",
    englishNameTranslation: "Abraham",
    numberOfAyahs: 52,
    revelationType: "Meccan",
  },
  {
    number: 15,
    name: "الحجر",
    englishName: "Al-Hijr",
    englishNameTranslation: "The Rocky Tract",
    numberOfAyahs: 99,
    revelationType: "Meccan",
  },
  {
    number: 16,
    name: "النحل",
    englishName: "An-Nahl",
    englishNameTranslation: "The Bee",
    numberOfAyahs: 128,
    revelationType: "Meccan",
  },
  {
    number: 17,
    name: "الإسراء",
    englishName: "Al-Isra",
    englishNameTranslation: "The Night Journey",
    numberOfAyahs: 111,
    revelationType: "Meccan",
  },
  {
    number: 18,
    name: "الكهف",
    englishName: "Al-Kahf",
    englishNameTranslation: "The Cave",
    numberOfAyahs: 110,
    revelationType: "Meccan",
  },
  {
    number: 19,
    name: "مريم",
    englishName: "Maryam",
    englishNameTranslation: "Mary",
    numberOfAyahs: 98,
    revelationType: "Meccan",
  },
  {
    number: 20,
    name: "طه",
    englishName: "Ta-Ha",
    englishNameTranslation: "Ta-Ha",
    numberOfAyahs: 135,
    revelationType: "Meccan",
  },
  {
    number: 21,
    name: "الأنبياء",
    englishName: "Al-Anbiya",
    englishNameTranslation: "The Prophets",
    numberOfAyahs: 112,
    revelationType: "Meccan",
  },
  {
    number: 22,
    name: "الحج",
    englishName: "Al-Hajj",
    englishNameTranslation: "The Pilgrimage",
    numberOfAyahs: 78,
    revelationType: "Medinan",
  },
  {
    number: 23,
    name: "المؤمنون",
    englishName: "Al-Mu'minun",
    englishNameTranslation: "The Believers",
    numberOfAyahs: 118,
    revelationType: "Meccan",
  },
  {
    number: 24,
    name: "النور",
    englishName: "An-Nur",
    englishNameTranslation: "The Light",
    numberOfAyahs: 64,
    revelationType: "Medinan",
  },
  {
    number: 25,
    name: "الفرقان",
    englishName: "Al-Furqan",
    englishNameTranslation: "The Criterion",
    numberOfAyahs: 77,
    revelationType: "Meccan",
  },
  {
    number: 26,
    name: "الشعراء",
    englishName: "Ash-Shu'ara",
    englishNameTranslation: "The Poets",
    numberOfAyahs: 227,
    revelationType: "Meccan",
  },
  {
    number: 27,
    name: "النمل",
    englishName: "An-Naml",
    englishNameTranslation: "The Ant",
    numberOfAyahs: 93,
    revelationType: "Meccan",
  },
  {
    number: 28,
    name: "القصص",
    englishName: "Al-Qasas",
    englishNameTranslation: "The Stories",
    numberOfAyahs: 88,
    revelationType: "Meccan",
  },
  {
    number: 29,
    name: "العنكبوت",
    englishName: "Al-Ankabut",
    englishNameTranslation: "The Spider",
    numberOfAyahs: 69,
    revelationType: "Meccan",
  },
  {
    number: 30,
    name: "الروم",
    englishName: "Ar-Rum",
    englishNameTranslation: "The Romans",
    numberOfAyahs: 60,
    revelationType: "Meccan",
  },
  {
    number: 31,
    name: "لقمان",
    englishName: "Luqman",
    englishNameTranslation: "Luqman",
    numberOfAyahs: 34,
    revelationType: "Meccan",
  },
  {
    number: 32,
    name: "السجدة",
    englishName: "As-Sajdah",
    englishNameTranslation: "The Prostration",
    numberOfAyahs: 30,
    revelationType: "Meccan",
  },
  {
    number: 33,
    name: "الأحزاب",
    englishName: "Al-Ahzab",
    englishNameTranslation: "The Combined Forces",
    numberOfAyahs: 73,
    revelationType: "Medinan",
  },
  {
    number: 34,
    name: "سبأ",
    englishName: "Saba",
    englishNameTranslation: "Sheba",
    numberOfAyahs: 54,
    revelationType: "Meccan",
  },
  {
    number: 35,
    name: "فاطر",
    englishName: "Fatir",
    englishNameTranslation: "The Originator",
    numberOfAyahs: 45,
    revelationType: "Meccan",
  },
  {
    number: 36,
    name: "يس",
    englishName: "Ya-Sin",
    englishNameTranslation: "Ya-Sin",
    numberOfAyahs: 83,
    revelationType: "Meccan",
  },
  {
    number: 37,
    name: "الصافات",
    englishName: "As-Saffat",
    englishNameTranslation: "Those Ranged in Ranks",
    numberOfAyahs: 182,
    revelationType: "Meccan",
  },
  {
    number: 38,
    name: "ص",
    englishName: "Sad",
    englishNameTranslation: "Sad",
    numberOfAyahs: 88,
    revelationType: "Meccan",
  },
  {
    number: 39,
    name: "الزمر",
    englishName: "Az-Zumar",
    englishNameTranslation: "The Groups",
    numberOfAyahs: 75,
    revelationType: "Meccan",
  },
  {
    number: 40,
    name: "غافر",
    englishName: "Ghafir",
    englishNameTranslation: "The Forgiver",
    numberOfAyahs: 85,
    revelationType: "Meccan",
  },
  {
    number: 41,
    name: "فصلت",
    englishName: "Fussilat",
    englishNameTranslation: "Explained in Detail",
    numberOfAyahs: 54,
    revelationType: "Meccan",
  },
  {
    number: 42,
    name: "الشورى",
    englishName: "Ash-Shura",
    englishNameTranslation: "The Consultation",
    numberOfAyahs: 53,
    revelationType: "Meccan",
  },
  {
    number: 43,
    name: "الزخرف",
    englishName: "Az-Zukhruf",
    englishNameTranslation: "The Gold Adornments",
    numberOfAyahs: 89,
    revelationType: "Meccan",
  },
  {
    number: 44,
    name: "الدخان",
    englishName: "Ad-Dukhan",
    englishNameTranslation: "The Smoke",
    numberOfAyahs: 59,
    revelationType: "Meccan",
  },
  {
    number: 45,
    name: "الجاثية",
    englishName: "Al-Jathiyah",
    englishNameTranslation: "The Kneeling",
    numberOfAyahs: 37,
    revelationType: "Meccan",
  },
  {
    number: 46,
    name: "الأحقاف",
    englishName: "Al-Ahqaf",
    englishNameTranslation: "The Wind-Curved Sandhills",
    numberOfAyahs: 35,
    revelationType: "Meccan",
  },
  {
    number: 47,
    name: "محمد",
    englishName: "Muhammad",
    englishNameTranslation: "Muhammad",
    numberOfAyahs: 38,
    revelationType: "Medinan",
  },
  {
    number: 48,
    name: "الفتح",
    englishName: "Al-Fath",
    englishNameTranslation: "The Victory",
    numberOfAyahs: 29,
    revelationType: "Medinan",
  },
  {
    number: 49,
    name: "الحجرات",
    englishName: "Al-Hujurat",
    englishNameTranslation: "The Rooms",
    numberOfAyahs: 18,
    revelationType: "Medinan",
  },
  {
    number: 50,
    name: "ق",
    englishName: "Qaf",
    englishNameTranslation: "Qaf",
    numberOfAyahs: 45,
    revelationType: "Meccan",
  },
  {
    number: 51,
    name: "الذاريات",
    englishName: "Adh-Dhariyat",
    englishNameTranslation: "The Winnowing Winds",
    numberOfAyahs: 60,
    revelationType: "Meccan",
  },
  {
    number: 52,
    name: "الطور",
    englishName: "At-Tur",
    englishNameTranslation: "The Mount",
    numberOfAyahs: 49,
    revelationType: "Meccan",
  },
  {
    number: 53,
    name: "النجم",
    englishName: "An-Najm",
    englishNameTranslation: "The Star",
    numberOfAyahs: 62,
    revelationType: "Meccan",
  },
  {
    number: 54,
    name: "القمر",
    englishName: "Al-Qamar",
    englishNameTranslation: "The Moon",
    numberOfAyahs: 55,
    revelationType: "Meccan",
  },
  {
    number: 55,
    name: "الرحمن",
    englishName: "Ar-Rahman",
    englishNameTranslation: "The Most Gracious",
    numberOfAyahs: 78,
    revelationType: "Medinan",
  },
  {
    number: 56,
    name: "الواقعة",
    englishName: "Al-Waqi'ah",
    englishNameTranslation: "The Inevitable",
    numberOfAyahs: 96,
    revelationType: "Meccan",
  },
  {
    number: 57,
    name: "الحديد",
    englishName: "Al-Hadid",
    englishNameTranslation: "The Iron",
    numberOfAyahs: 29,
    revelationType: "Medinan",
  },
  {
    number: 58,
    name: "المجادلة",
    englishName: "Al-Mujadilah",
    englishNameTranslation: "The Pleading Woman",
    numberOfAyahs: 22,
    revelationType: "Medinan",
  },
  {
    number: 59,
    name: "الحشر",
    englishName: "Al-Hashr",
    englishNameTranslation: "The Exile",
    numberOfAyahs: 24,
    revelationType: "Medinan",
  },
  {
    number: 60,
    name: "الممتحنة",
    englishName: "Al-Mumtahanah",
    englishNameTranslation: "She that is to be Examined",
    numberOfAyahs: 13,
    revelationType: "Medinan",
  },
  {
    number: 61,
    name: "الصف",
    englishName: "As-Saff",
    englishNameTranslation: "The Ranks",
    numberOfAyahs: 14,
    revelationType: "Medinan",
  },
  {
    number: 62,
    name: "الجمعة",
    englishName: "Al-Jumu'ah",
    englishNameTranslation: "Friday",
    numberOfAyahs: 11,
    revelationType: "Medinan",
  },
  {
    number: 63,
    name: "المنافقون",
    englishName: "Al-Munafiqun",
    englishNameTranslation: "The Hypocrites",
    numberOfAyahs: 11,
    revelationType: "Medinan",
  },
  {
    number: 64,
    name: "التغابن",
    englishName: "At-Taghabun",
    englishNameTranslation: "The Mutual Disillusion",
    numberOfAyahs: 18,
    revelationType: "Medinan",
  },
  {
    number: 65,
    name: "الطلاق",
    englishName: "At-Talaq",
    englishNameTranslation: "The Divorce",
    numberOfAyahs: 12,
    revelationType: "Medinan",
  },
  {
    number: 66,
    name: "التحريم",
    englishName: "At-Tahrim",
    englishNameTranslation: "The Prohibition",
    numberOfAyahs: 12,
    revelationType: "Medinan",
  },
  {
    number: 67,
    name: "الملك",
    englishName: "Al-Mulk",
    englishNameTranslation: "The Sovereignty",
    numberOfAyahs: 30,
    revelationType: "Meccan",
  },
  {
    number: 68,
    name: "القلم",
    englishName: "Al-Qalam",
    englishNameTranslation: "The Pen",
    numberOfAyahs: 52,
    revelationType: "Meccan",
  },
  {
    number: 69,
    name: "الحاقة",
    englishName: "Al-Haqqah",
    englishNameTranslation: "The Reality",
    numberOfAyahs: 52,
    revelationType: "Meccan",
  },
  {
    number: 70,
    name: "المعارج",
    englishName: "Al-Ma'arij",
    englishNameTranslation: "The Ascending Stairways",
    numberOfAyahs: 44,
    revelationType: "Meccan",
  },
  {
    number: 71,
    name: "نوح",
    englishName: "Nuh",
    englishNameTranslation: "Noah",
    numberOfAyahs: 28,
    revelationType: "Meccan",
  },
  {
    number: 72,
    name: "الجن",
    englishName: "Al-Jinn",
    englishNameTranslation: "The Jinn",
    numberOfAyahs: 28,
    revelationType: "Meccan",
  },
  {
    number: 73,
    name: "المزمل",
    englishName: "Al-Muzzammil",
    englishNameTranslation: "The Enshrouded One",
    numberOfAyahs: 20,
    revelationType: "Meccan",
  },
  {
    number: 74,
    name: "المدثر",
    englishName: "Al-Muddaththir",
    englishNameTranslation: "The Cloaked One",
    numberOfAyahs: 56,
    revelationType: "Meccan",
  },
  {
    number: 75,
    name: "القيامة",
    englishName: "Al-Qiyamah",
    englishNameTranslation: "The Resurrection",
    numberOfAyahs: 40,
    revelationType: "Meccan",
  },
  {
    number: 76,
    name: "الإنسان",
    englishName: "Al-Insan",
    englishNameTranslation: "Man",
    numberOfAyahs: 31,
    revelationType: "Medinan",
  },
  {
    number: 77,
    name: "المرسلات",
    englishName: "Al-Mursalat",
    englishNameTranslation: "The Emissaries",
    numberOfAyahs: 50,
    revelationType: "Meccan",
  },
  {
    number: 78,
    name: "النبأ",
    englishName: "An-Naba",
    englishNameTranslation: "The Tidings",
    numberOfAyahs: 40,
    revelationType: "Meccan",
  },
  {
    number: 79,
    name: "النازعات",
    englishName: "An-Nazi'at",
    englishNameTranslation: "Those Who Drag Forth",
    numberOfAyahs: 46,
    revelationType: "Meccan",
  },
  {
    number: 80,
    name: "عبس",
    englishName: "Abasa",
    englishNameTranslation: "He Frowned",
    numberOfAyahs: 42,
    revelationType: "Meccan",
  },
  {
    number: 81,
    name: "التكوير",
    englishName: "At-Takwir",
    englishNameTranslation: "The Overthrowing",
    numberOfAyahs: 29,
    revelationType: "Meccan",
  },
  {
    number: 82,
    name: "الانفطار",
    englishName: "Al-Infitar",
    englishNameTranslation: "The Cleaving",
    numberOfAyahs: 19,
    revelationType: "Meccan",
  },
  {
    number: 83,
    name: "المطففين",
    englishName: "Al-Mutaffifin",
    englishNameTranslation: "The Defrauding",
    numberOfAyahs: 36,
    revelationType: "Meccan",
  },
  {
    number: 84,
    name: "الانشقاق",
    englishName: "Al-Inshiqaq",
    englishNameTranslation: "The Sundering",
    numberOfAyahs: 25,
    revelationType: "Meccan",
  },
  {
    number: 85,
    name: "البروج",
    englishName: "Al-Buruj",
    englishNameTranslation: "The Mansions of the Stars",
    numberOfAyahs: 22,
    revelationType: "Meccan",
  },
  {
    number: 86,
    name: "الطارق",
    englishName: "At-Tariq",
    englishNameTranslation: "The Morning Star",
    numberOfAyahs: 17,
    revelationType: "Meccan",
  },
  {
    number: 87,
    name: "الأعلى",
    englishName: "Al-A'la",
    englishNameTranslation: "The Most High",
    numberOfAyahs: 19,
    revelationType: "Meccan",
  },
  {
    number: 88,
    name: "الغاشية",
    englishName: "Al-Ghashiyah",
    englishNameTranslation: "The Overwhelming",
    numberOfAyahs: 26,
    revelationType: "Meccan",
  },
  {
    number: 89,
    name: "الفجر",
    englishName: "Al-Fajr",
    englishNameTranslation: "The Dawn",
    numberOfAyahs: 30,
    revelationType: "Meccan",
  },
  {
    number: 90,
    name: "البلد",
    englishName: "Al-Balad",
    englishNameTranslation: "The City",
    numberOfAyahs: 20,
    revelationType: "Meccan",
  },
  {
    number: 91,
    name: "الشمس",
    englishName: "Ash-Shams",
    englishNameTranslation: "The Sun",
    numberOfAyahs: 15,
    revelationType: "Meccan",
  },
  {
    number: 92,
    name: "الليل",
    englishName: "Al-Layl",
    englishNameTranslation: "The Night",
    numberOfAyahs: 21,
    revelationType: "Meccan",
  },
  {
    number: 93,
    name: "الضحى",
    englishName: "Ad-Duha",
    englishNameTranslation: "The Morning Hours",
    numberOfAyahs: 11,
    revelationType: "Meccan",
  },
  {
    number: 94,
    name: "الشرح",
    englishName: "Ash-Sharh",
    englishNameTranslation: "The Relief",
    numberOfAyahs: 8,
    revelationType: "Meccan",
  },
  {
    number: 95,
    name: "التين",
    englishName: "At-Tin",
    englishNameTranslation: "The Fig",
    numberOfAyahs: 8,
    revelationType: "Meccan",
  },
  {
    number: 96,
    name: "العلق",
    englishName: "Al-Alaq",
    englishNameTranslation: "The Clot",
    numberOfAyahs: 19,
    revelationType: "Meccan",
  },
  {
    number: 97,
    name: "القدر",
    englishName: "Al-Qadr",
    englishNameTranslation: "The Power",
    numberOfAyahs: 5,
    revelationType: "Meccan",
  },
  {
    number: 98,
    name: "البينة",
    englishName: "Al-Bayyinah",
    englishNameTranslation: "The Clear Proof",
    numberOfAyahs: 8,
    revelationType: "Medinan",
  },
  {
    number: 99,
    name: "الزلزلة",
    englishName: "Az-Zalzalah",
    englishNameTranslation: "The Earthquake",
    numberOfAyahs: 8,
    revelationType: "Medinan",
  },
  {
    number: 100,
    name: "العاديات",
    englishName: "Al-Adiyat",
    englishNameTranslation: "The Courser",
    numberOfAyahs: 11,
    revelationType: "Meccan",
  },
  {
    number: 101,
    name: "القارعة",
    englishName: "Al-Qari'ah",
    englishNameTranslation: "The Calamity",
    numberOfAyahs: 11,
    revelationType: "Meccan",
  },
  {
    number: 102,
    name: "التكاثر",
    englishName: "At-Takathur",
    englishNameTranslation: "The Rivalry in World Increase",
    numberOfAyahs: 8,
    revelationType: "Meccan",
  },
  {
    number: 103,
    name: "العصر",
    englishName: "Al-Asr",
    englishNameTranslation: "The Declining Day",
    numberOfAyahs: 3,
    revelationType: "Meccan",
  },
  {
    number: 104,
    name: "الهمزة",
    englishName: "Al-Humazah",
    englishNameTranslation: "The Traducer",
    numberOfAyahs: 9,
    revelationType: "Meccan",
  },
  {
    number: 105,
    name: "الفيل",
    englishName: "Al-Fil",
    englishNameTranslation: "The Elephant",
    numberOfAyahs: 5,
    revelationType: "Meccan",
  },
  {
    number: 106,
    name: "قريش",
    englishName: "Quraysh",
    englishNameTranslation: "Quraysh",
    numberOfAyahs: 4,
    revelationType: "Meccan",
  },
  {
    number: 107,
    name: "الماعون",
    englishName: "Al-Ma'un",
    englishNameTranslation: "The Small Kindnesses",
    numberOfAyahs: 7,
    revelationType: "Meccan",
  },
  {
    number: 108,
    name: "الكوثر",
    englishName: "Al-Kawthar",
    englishNameTranslation: "The Abundance",
    numberOfAyahs: 3,
    revelationType: "Meccan",
  },
  {
    number: 109,
    name: "الكافرون",
    englishName: "Al-Kafirun",
    englishNameTranslation: "The Disbelievers",
    numberOfAyahs: 6,
    revelationType: "Meccan",
  },
  {
    number: 110,
    name: "النصر",
    englishName: "An-Nasr",
    englishNameTranslation: "The Divine Support",
    numberOfAyahs: 3,
    revelationType: "Medinan",
  },
  {
    number: 111,
    name: "المسد",
    englishName: "Al-Masad",
    englishNameTranslation: "The Palm Fiber",
    numberOfAyahs: 5,
    revelationType: "Meccan",
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "The Sincerity",
    numberOfAyahs: 4,
    revelationType: "Meccan",
  },
  {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    englishNameTranslation: "The Daybreak",
    numberOfAyahs: 5,
    revelationType: "Meccan",
  },
  {
    number: 114,
    name: "الناس",
    englishName: "An-Nas",
    englishNameTranslation: "Mankind",
    numberOfAyahs: 6,
    revelationType: "Meccan",
  },
]

// Calculate totals
export const TOTAL_AYAHS = SURAHS.reduce((sum, s) => sum + s.numberOfAyahs, 0) // 6236
export const TOTAL_SURAHS = 114
export const TOTAL_JUZ = 30

// Juz boundaries (starting surah:ayah)
export const JUZ_BOUNDARIES: { juz: number; surah: number; ayah: number }[] = [
  { juz: 1, surah: 1, ayah: 1 },
  { juz: 2, surah: 2, ayah: 142 },
  { juz: 3, surah: 2, ayah: 253 },
  { juz: 4, surah: 3, ayah: 93 },
  { juz: 5, surah: 4, ayah: 24 },
  { juz: 6, surah: 4, ayah: 148 },
  { juz: 7, surah: 5, ayah: 83 },
  { juz: 8, surah: 6, ayah: 111 },
  { juz: 9, surah: 7, ayah: 88 },
  { juz: 10, surah: 8, ayah: 41 },
  { juz: 11, surah: 9, ayah: 93 },
  { juz: 12, surah: 11, ayah: 6 },
  { juz: 13, surah: 12, ayah: 53 },
  { juz: 14, surah: 15, ayah: 1 },
  { juz: 15, surah: 17, ayah: 1 },
  { juz: 16, surah: 18, ayah: 75 },
  { juz: 17, surah: 21, ayah: 1 },
  { juz: 18, surah: 23, ayah: 1 },
  { juz: 19, surah: 25, ayah: 21 },
  { juz: 20, surah: 27, ayah: 56 },
  { juz: 21, surah: 29, ayah: 46 },
  { juz: 22, surah: 33, ayah: 31 },
  { juz: 23, surah: 36, ayah: 28 },
  { juz: 24, surah: 39, ayah: 32 },
  { juz: 25, surah: 41, ayah: 47 },
  { juz: 26, surah: 46, ayah: 1 },
  { juz: 27, surah: 51, ayah: 31 },
  { juz: 28, surah: 58, ayah: 1 },
  { juz: 29, surah: 67, ayah: 1 },
  { juz: 30, surah: 78, ayah: 1 },
]

// API function to fetch verses (using Al-Quran Cloud API)
export async function fetchSurahVerses(surahNumber: number): Promise<{
  arabic: Verse[]
  transliteration: Verse[]
  translation: Verse[]
} | null> {
  try {
    const [arabicRes, translitRes, translationRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.transliteration`),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`),
    ])

    const [arabicData, translitData, translationData] = await Promise.all([
      arabicRes.json(),
      translitRes.json(),
      translationRes.json(),
    ])

    if (arabicData.code !== 200) return null

    const arabic: Verse[] = arabicData.data.ayahs.map((a: any) => ({
      number: a.numberInSurah,
      arabic: a.text,
      transliteration: "",
      translation: "",
    }))

    const transliteration: Verse[] = translitData.data.ayahs.map((a: any) => ({
      number: a.numberInSurah,
      arabic: "",
      transliteration: a.text,
      translation: "",
    }))

    const translation: Verse[] = translationData.data.ayahs.map((a: any) => ({
      number: a.numberInSurah,
      arabic: "",
      transliteration: "",
      translation: a.text,
    }))

    return { arabic, transliteration, translation }
  } catch (error) {
    console.error("Error fetching surah:", error)
    return null
  }
}

// Get juz number for a given surah and ayah
export function getJuzNumber(surahNumber: number, ayahNumber: number): number {
  for (let i = JUZ_BOUNDARIES.length - 1; i >= 0; i--) {
    const boundary = JUZ_BOUNDARIES[i]
    if (surahNumber > boundary.surah || (surahNumber === boundary.surah && ayahNumber >= boundary.ayah)) {
      return boundary.juz
    }
  }
  return 1
}
