// Spiritual content for each day of Ramadan - Full 30 days with unique content

export interface MorningDhikr {
  arabic: string
  transliteration: string
  meaning: string
}

export interface DailyContent {
  day: number
  ayah: {
    arabic: string
    translation: string
    reference: string
    tafsir?: string
  }
  nameOfAllah: {
    arabic: string
    transliteration: string
    meaning: string
    reflection: string
  }
  duaPrompt: {
    theme: "repentance" | "hope" | "gratitude" | "surrender"
    prompt: string
  }
  ihsaanAct: string
  morningDhikr: MorningDhikr
}

export interface WeeklyTheme {
  week: number
  title: string
  arabicTitle: string
  theme: string
  prompts: string[]
}

export const weeklyThemes: WeeklyTheme[] = [
  {
    week: 1,
    title: "Tawbah & Returning",
    arabicTitle: "التوبة",
    theme: "This week, we turn. We return. We remember who we were always meant to be.",
    prompts: [
      "What patterns am I noticing in my heart?",
      "Where is Allah gently calling me back?",
      "What am I ready to release?",
    ],
  },
  {
    week: 2,
    title: "Taqwa & Restraint",
    arabicTitle: "التقوى",
    theme: "This week, we practice sacred restraint. We hold back to move forward.",
    prompts: [
      "What am I learning about my nafs?",
      "Where have I found unexpected strength?",
      "What does my soul need less of?",
    ],
  },
  {
    week: 3,
    title: "Yaqeen & Trust",
    arabicTitle: "اليقين",
    theme: "This week, we deepen trust. Even when we cannot see, we believe.",
    prompts: ["Where is Allah answering me quietly?", "What am I still resisting?", "How is my certainty growing?"],
  },
  {
    week: 4,
    title: "Nuur & Nearness",
    arabicTitle: "النور",
    theme: "This week, we seek light. We draw close. We prepare for the sacred nights.",
    prompts: [
      "What light have I found within?",
      "How has Ramadan changed my heart?",
      "What do I want to carry forward?",
    ],
  },
]

export const dailyContent: DailyContent[] = [
  {
    day: 1,
    ayah: {
      arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ",
      translation: "The month of Ramadan in which was revealed the Quran",
      reference: "Al-Baqarah 2:185",
      tafsir:
        "This verse establishes Ramadan as the month of divine revelation, making it sacred for spiritual renewal.",
    },
    nameOfAllah: {
      arabic: "الرَّحْمَن",
      transliteration: "Ar-Rahman",
      meaning: "The Most Merciful",
      reflection: "His mercy encompasses all things. As you begin this month, know that you are already held in mercy.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What hope are you carrying into this month?",
    },
    ihsaanAct: "Send a message to someone you haven't spoken to in a while",
    morningDhikr: {
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'",
      meaning: "In the name of Allah, with whose name nothing can harm on earth or in heaven",
    },
  },
  {
    day: 2,
    ayah: {
      arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
      translation: "And when My servants ask you about Me, indeed I am near",
      reference: "Al-Baqarah 2:186",
      tafsir:
        "Unlike other verses where Allah tells the Prophet to 'say', here Allah speaks directly—He is that close.",
    },
    nameOfAllah: {
      arabic: "القَرِيب",
      transliteration: "Al-Qareeb",
      meaning: "The Near One",
      reflection: "He is closer than your jugular vein. In this moment, He hears you.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What are you ready to hand over to Allah?",
    },
    ihsaanAct: "Smile genuinely at a stranger today",
    morningDhikr: {
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      transliteration: "Asbahna wa asbahal-mulku lillahi wal-hamdulillah",
      meaning: "We have reached the morning and the kingdom belongs to Allah, and all praise is for Allah",
    },
  },
  {
    day: 3,
    ayah: {
      arabic: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ",
      translation: "Indeed, Allah loves those who are constantly repentant",
      reference: "Al-Baqarah 2:222",
      tafsir: "The word 'tawwabeen' implies those who return repeatedly—Allah loves the return, not the perfection.",
    },
    nameOfAllah: {
      arabic: "التَّوَّاب",
      transliteration: "At-Tawwab",
      meaning: "The Acceptor of Repentance",
      reflection: "He doesn't just accept your return—He loves it. He turns toward you as you turn toward Him.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "What do you need forgiveness for that you haven't asked yet?",
    },
    ihsaanAct: "Forgive someone silently in your heart",
    morningDhikr: {
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfirullaha wa atubu ilayh",
      meaning: "I seek forgiveness from Allah and I repent to Him",
    },
  },
  {
    day: 4,
    ayah: {
      arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
      translation: "And seek help through patience and prayer",
      reference: "Al-Baqarah 2:45",
      tafsir: "Patience and prayer are paired as the two wings that lift us through difficulty.",
    },
    nameOfAllah: {
      arabic: "الصَّبُور",
      transliteration: "As-Sabur",
      meaning: "The Patient One",
      reflection: "He is patient with you. Can you be patient with yourself?",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "Where do you need more patience in your life?",
    },
    ihsaanAct: "Wait without complaint today, even when it's hard",
    morningDhikr: {
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
      transliteration: "Hasbiyal-lahu la ilaha illa huwa 'alayhi tawakkaltu",
      meaning: "Sufficient for me is Allah; there is no deity except Him. On Him I rely",
    },
  },
  {
    day: 5,
    ayah: {
      arabic: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ",
      translation: "And We will surely test you with something of fear and hunger",
      reference: "Al-Baqarah 2:155",
      tafsir:
        "Tests are certain, but they come in small doses—'something of'—because Allah is merciful in His testing.",
    },
    nameOfAllah: {
      arabic: "الحَكِيم",
      transliteration: "Al-Hakeem",
      meaning: "The All-Wise",
      reflection: "Every test has wisdom, even when you cannot see it yet.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What test has taught you the most about yourself?",
    },
    ihsaanAct: "Share your food with someone who has less",
    morningDhikr: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا",
      transliteration: "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban",
      meaning: "O Allah, I ask You for beneficial knowledge and good provision",
    },
  },
  {
    day: 6,
    ayah: {
      arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      translation: "So remember Me; I will remember you",
      reference: "Al-Baqarah 2:152",
      tafsir: "A divine promise: your remembrance of Him is met with His remembrance of you.",
    },
    nameOfAllah: {
      arabic: "الذَّاكِر",
      transliteration: "Adh-Dhakir",
      meaning: "The One Who Remembers",
      reflection: "When you mention Him, He mentions you to the angels. You are known in the heavens.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "When do you feel most connected to Allah?",
    },
    ihsaanAct: "Make dhikr while doing a mundane task",
    morningDhikr: {
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
      transliteration: "SubhanAllahi wa bihamdihi, SubhanAllahil-'Azim",
      meaning: "Glory be to Allah and His is the praise. Glory be to Allah, the Most Great",
    },
  },
  {
    day: 7,
    ayah: {
      arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ",
      translation: "Perhaps you dislike a thing and it is good for you",
      reference: "Al-Baqarah 2:216",
      tafsir: "Your limited vision cannot see what Allah sees. Trust His plan over your preferences.",
    },
    nameOfAllah: {
      arabic: "العَلِيم",
      transliteration: "Al-Aleem",
      meaning: "The All-Knowing",
      reflection: "He knows what you need before you ask. He knows what's good before you understand.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What difficulty might actually be a hidden blessing?",
    },
    ihsaanAct: "Accept something you've been resisting",
    morningDhikr: {
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا",
      transliteration: "Raditu billahi rabban, wa bil-islami dinan, wa bi-Muhammadin nabiyyan",
      meaning: "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad as my Prophet",
    },
  },
  {
    day: 8,
    ayah: {
      arabic: "وَاللَّهُ يَرْزُقُ مَن يَشَاءُ بِغَيْرِ حِسَابٍ",
      translation: "And Allah provides for whom He wills without account",
      reference: "Al-Baqarah 2:212",
      tafsir: "His provision is unlimited, uncalculated, overflowing—beyond what we deserve.",
    },
    nameOfAllah: {
      arabic: "الرَّزَّاق",
      transliteration: "Ar-Razzaq",
      meaning: "The Provider",
      reflection: "Your rizq is written. Relax into the trust that He will provide.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "What unexpected provision have you received recently?",
    },
    ihsaanAct: "Give without counting",
    morningDhikr: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      transliteration: "Allahumma inni as'aluka rizqan tayyiban wa 'amalan mutaqabbalan",
      meaning: "O Allah, I ask You for good provision and accepted deeds",
    },
  },
  {
    day: 9,
    ayah: {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Indeed, with hardship comes ease",
      reference: "Ash-Sharh 94:6",
      tafsir: "Ease is not after hardship—it comes with it. Look for the ease within your difficulty.",
    },
    nameOfAllah: {
      arabic: "اللَّطِيف",
      transliteration: "Al-Lateef",
      meaning: "The Subtle, The Kind",
      reflection: "His kindness works in ways you cannot perceive, gently arranging your life.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "Where is the ease hidden within your current hardship?",
    },
    ihsaanAct: "Offer comfort to someone going through difficulty",
    morningDhikr: {
      arabic: "يَا لَطِيفُ أَلْطِفْ بِي فِي قَضَائِكَ",
      transliteration: "Ya Latifu altif bi fi qada'ik",
      meaning: "O Subtle One, be gentle with me in Your decree",
    },
  },
  {
    day: 10,
    ayah: {
      arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
      translation: "And We are closer to him than his jugular vein",
      reference: "Qaf 50:16",
      tafsir: "A powerful metaphor for intimacy—nothing is closer to you than your own blood, except Allah.",
    },
    nameOfAllah: {
      arabic: "الوَدُود",
      transliteration: "Al-Wadud",
      meaning: "The Loving One",
      reflection: "He doesn't just love—He is love itself. Let yourself be loved.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "What keeps you from feeling His closeness?",
    },
    ihsaanAct: "Tell someone you love them today",
    morningDhikr: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuk",
      meaning: "O Allah, I ask You for Your love and the love of those who love You",
    },
  },
  {
    day: 11,
    ayah: {
      arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
      translation: "Call upon Me; I will respond to you",
      reference: "Ghafir 40:60",
      tafsir: "A direct command and promise—asking is worship, and response is guaranteed.",
    },
    nameOfAllah: {
      arabic: "المُجِيب",
      transliteration: "Al-Mujeeb",
      meaning: "The Responsive One",
      reflection: "Every dua is heard. Every call is answered. Trust the response.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What dua have you been afraid to make?",
    },
    ihsaanAct: "Make dua for someone without them knowing",
    morningDhikr: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ",
      transliteration: "Allahumma inni as'aluka min fadlika wa rahmatik",
      meaning: "O Allah, I ask You from Your bounty and mercy",
    },
  },
  {
    day: 12,
    ayah: {
      arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      translation: "Verily, in the remembrance of Allah do hearts find rest",
      reference: "Ar-Ra'd 13:28",
      tafsir: "The restless heart finds its anchor only in remembrance. Everything else is temporary calm.",
    },
    nameOfAllah: {
      arabic: "السَّلَام",
      transliteration: "As-Salam",
      meaning: "The Source of Peace",
      reflection: "True peace isn't found—it's received from the One who is Peace itself.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What is disturbing your inner peace?",
    },
    ihsaanAct: "Create 5 minutes of intentional silence today",
    morningDhikr: {
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      transliteration: "Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram",
      meaning: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor",
    },
  },
  {
    day: 13,
    ayah: {
      arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
      translation: "And your Lord is going to give you, and you will be satisfied",
      reference: "Ad-Duha 93:5",
      tafsir: "A divine promise of satisfaction—not just receiving, but being content with what you receive.",
    },
    nameOfAllah: {
      arabic: "الوَهَّاب",
      transliteration: "Al-Wahhab",
      meaning: "The Bestower",
      reflection: "He gives without being asked, without conditions, without limit.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "What has Allah given you that once seemed impossible?",
    },
    ihsaanAct: "Give a gift to someone expecting nothing in return",
    morningDhikr: {
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
      transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana",
      meaning: "Our Lord, do not let our hearts deviate after You have guided us",
    },
  },
  {
    day: 14,
    ayah: {
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "For indeed, with hardship will be ease",
      reference: "Ash-Sharh 94:5",
      tafsir: "Mentioned twice in succession—Allah emphasizes the certainty of ease coming.",
    },
    nameOfAllah: {
      arabic: "الفَتَّاح",
      transliteration: "Al-Fattah",
      meaning: "The Opener",
      reflection: "When doors close, He opens others. Trust the closing as much as the opening.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What door are you waiting for Allah to open?",
    },
    ihsaanAct: "Help someone access an opportunity",
    morningDhikr: {
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration: "Allahumma-ftah li abwaba rahmatik",
      meaning: "O Allah, open for me the doors of Your mercy",
    },
  },
  {
    day: 15,
    ayah: {
      arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
      translation: "And rely upon the Ever-Living who does not die",
      reference: "Al-Furqan 25:58",
      tafsir: "Everything you rely on will end except Him. He is the only eternal anchor.",
    },
    nameOfAllah: {
      arabic: "الحَيّ",
      transliteration: "Al-Hayy",
      meaning: "The Ever-Living",
      reflection: "When everyone leaves, He remains. When everything fades, He endures.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What are you relying on that isn't Allah?",
    },
    ihsaanAct: "Check on an elderly person in your community",
    morningDhikr: {
      arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
      transliteration: "Ya Hayyu ya Qayyumu bi-rahmatika astaghith",
      meaning: "O Ever-Living, O Sustainer, by Your mercy I seek relief",
    },
  },
  {
    day: 16,
    ayah: {
      arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
      translation: "Say, O My servants who have transgressed against themselves, do not despair of the mercy of Allah",
      reference: "Az-Zumar 39:53",
      tafsir: "Allah calls them 'My servants' even while mentioning their sins—ownership despite imperfection.",
    },
    nameOfAllah: {
      arabic: "الغَفَّار",
      transliteration: "Al-Ghaffar",
      meaning: "The Repeatedly Forgiving",
      reflection: "He forgives again and again. Your return is never too late, never too much.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "What sin do you keep returning to? Ask for strength.",
    },
    ihsaanAct: "Forgive yourself for something you've been carrying",
    morningDhikr: {
      arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfirullaha al-'Azim alladhi la ilaha illa huwa wa atubu ilayh",
      meaning: "I seek forgiveness from Allah the Almighty, there is no god but Him, and I repent to Him",
    },
  },
  {
    day: 17,
    ayah: {
      arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      translation: "And He is with you wherever you are",
      reference: "Al-Hadid 57:4",
      tafsir: "Not just watching from above—with you. In your loneliness, your struggle, your joy.",
    },
    nameOfAllah: {
      arabic: "الشَّهِيد",
      transliteration: "Ash-Shaheed",
      meaning: "The Witness",
      reflection: "Every good deed is seen. Every struggle is witnessed. You are never unseen.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "When have you felt Allah's presence most strongly?",
    },
    ihsaanAct: "Witness someone's effort and acknowledge it",
    morningDhikr: {
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ الصَّابِرِينَ الشَّاكِرِينَ",
      transliteration: "Allahumma-j'alni minas-sabirina ash-shakirin",
      meaning: "O Allah, make me among the patient and grateful ones",
    },
  },
  {
    day: 18,
    ayah: {
      arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
      translation: "Indeed, Allah does not waste the reward of those who do good",
      reference: "At-Tawbah 9:120",
      tafsir: "Not a single good deed is lost. Even the ones no one saw. Even the ones you forgot.",
    },
    nameOfAllah: {
      arabic: "الشَّكُور",
      transliteration: "Ash-Shakur",
      meaning: "The Appreciative",
      reflection: "He appreciates the small things. He multiplies the sincere things.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "What small good deed have you been consistent with?",
    },
    ihsaanAct: "Do something good that no one will ever know about",
    morningDhikr: {
      arabic: "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
      transliteration: "Alhamdulillahi hamdan kathiran tayyiban mubarakan fih",
      meaning: "All praise is due to Allah, abundant, pure, and blessed praise",
    },
  },
  {
    day: 19,
    ayah: {
      arabic: "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",
      translation: "And whatever good you send forth for yourselves, you will find it with Allah",
      reference: "Al-Baqarah 2:110",
      tafsir: "Good deeds are not lost—they are saved, waiting for you.",
    },
    nameOfAllah: {
      arabic: "الحَافِظ",
      transliteration: "Al-Hafiz",
      meaning: "The Preserver",
      reflection: "He preserves your deeds, your secrets, your hopes. Nothing good is ever wasted.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What are you sending forward for your akhirah?",
    },
    ihsaanAct: "Set aside sadaqah jariyah today",
    morningDhikr: {
      arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي",
      transliteration: "Allahumma-hfazni min bayni yadayya wa min khalfi",
      meaning: "O Allah, protect me from before me and from behind me",
    },
  },
  {
    day: 20,
    ayah: {
      arabic: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
      translation: "And Allah loves the patient",
      reference: "Aal-Imran 3:146",
      tafsir: "Patience isn't passive—it's an active trust that earns divine love.",
    },
    nameOfAllah: {
      arabic: "الصَّبُور",
      transliteration: "As-Sabur",
      meaning: "The Most Patient",
      reflection: "He is patient with your mistakes, your returns, your slowness. Be patient with yourself.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "Where is Allah teaching you patience right now?",
    },
    ihsaanAct: "Practice patience in a situation that usually frustrates you",
    morningDhikr: {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
      meaning: "O Allah, help me to remember You, thank You, and worship You in the best way",
    },
  },
  {
    day: 21,
    ayah: {
      arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ",
      translation: "The Night of Decree is better than a thousand months",
      reference: "Al-Qadr 97:3",
      tafsir: "One night. More than 83 years of worship. Seek it with everything you have.",
    },
    nameOfAllah: {
      arabic: "المَلِك",
      transliteration: "Al-Malik",
      meaning: "The King",
      reflection: "The King of kings descends in mercy on this night. Prepare your heart.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "If tonight is Laylatul Qadr, what must you ask for?",
    },
    ihsaanAct: "Extend your night prayers, even by a little",
    morningDhikr: {
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
      meaning: "O Allah, You are Pardoning and love to pardon, so pardon me",
    },
  },
  {
    day: 22,
    ayah: {
      arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا",
      translation: "The angels and the Spirit descend therein",
      reference: "Al-Qadr 97:4",
      tafsir: "So many angels descend that they outnumber the pebbles on earth.",
    },
    nameOfAllah: {
      arabic: "القُدُّوس",
      transliteration: "Al-Quddus",
      meaning: "The Most Holy",
      reflection: "In these holy nights, seek the Holy One. Purify your heart.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What impossible thing will you ask Allah for tonight?",
    },
    ihsaanAct: "Make dua for the ummah",
    morningDhikr: {
      arabic: "سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ",
      transliteration: "Subbuhun Quddusun Rabbul-mala'ikati war-ruh",
      meaning: "Exalted, Holy, Lord of the angels and the Spirit",
    },
  },
  {
    day: 23,
    ayah: {
      arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ",
      translation: "Peace it is until the emergence of dawn",
      reference: "Al-Qadr 97:5",
      tafsir: "The entire night is saturated with peace. Bathe in it.",
    },
    nameOfAllah: {
      arabic: "السَّلَام",
      transliteration: "As-Salam",
      meaning: "The Source of Peace",
      reflection: "Peace descends on this night. Open your heart to receive it.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What inner war are you ready to end?",
    },
    ihsaanAct: "Make peace with someone you've been distant from",
    morningDhikr: {
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
      transliteration: "Allahumma antas-salam wa minkas-salam",
      meaning: "O Allah, You are Peace and from You comes peace",
    },
  },
  {
    day: 24,
    ayah: {
      arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ",
      translation: "Indeed, We sent it down during the Night of Decree",
      reference: "Al-Qadr 97:1",
      tafsir: "The Quran's descent marks this night forever. Honor the Book.",
    },
    nameOfAllah: {
      arabic: "النُّور",
      transliteration: "An-Nur",
      meaning: "The Light",
      reflection: "The Quran is light, revealed in a night of light. Let it illuminate your heart.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "How has the Quran guided you this Ramadan?",
    },
    ihsaanAct: "Read Quran with more presence than usual",
    morningDhikr: {
      arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي",
      transliteration: "Allahumma-j'alil-Qur'ana rabi'a qalbi wa nura sadri",
      meaning: "O Allah, make the Quran the spring of my heart and the light of my chest",
    },
  },
  {
    day: 25,
    ayah: {
      arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ",
      translation: "And what can make you know what the Night of Decree is?",
      reference: "Al-Qadr 97:2",
      tafsir: "Its magnitude is beyond human comprehension. Approach it with awe.",
    },
    nameOfAllah: {
      arabic: "الكَبِير",
      transliteration: "Al-Kabeer",
      meaning: "The Greatest",
      reflection: "Greater than our understanding, yet intimate with our hearts.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "What have you been too proud to repent for?",
    },
    ihsaanAct: "Humble yourself in a way that feels uncomfortable",
    morningDhikr: {
      arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ",
      transliteration: "SubhanAllahil-'Azimi wa bihamdih",
      meaning: "Glory be to Allah the Most Great and with His praise",
    },
  },
  {
    day: 26,
    ayah: {
      arabic: "وَاسْجُدْ وَاقْتَرِب",
      translation: "Prostrate and draw near",
      reference: "Al-Alaq 96:19",
      tafsir: "The closest you are to Allah is in sujood. Lengthen it.",
    },
    nameOfAllah: {
      arabic: "القَرِيب",
      transliteration: "Al-Qareeb",
      meaning: "The Near One",
      reflection: "In prostration, the distance disappears. Stay there longer.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "What do you whisper to Allah in your sujood?",
    },
    ihsaanAct: "Add extra sujood to your prayers today",
    morningDhikr: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
      transliteration: "Subhana Rabbiyal-A'la wa bihamdih",
      meaning: "Glory be to my Lord, the Most High, and with His praise",
    },
  },
  {
    day: 27,
    ayah: {
      arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
      translation: "And those who strive for Us—We will surely guide them to Our ways",
      reference: "Al-Ankabut 29:69",
      tafsir: "The striving comes first, then the guidance. Keep walking.",
    },
    nameOfAllah: {
      arabic: "الهَادِي",
      transliteration: "Al-Hadi",
      meaning: "The Guide",
      reflection: "He guides those who seek. Your seeking is not in vain.",
    },
    duaPrompt: {
      theme: "surrender",
      prompt: "What guidance are you seeking from Allah?",
    },
    ihsaanAct: "Share beneficial knowledge with someone",
    morningDhikr: {
      arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
      transliteration: "Allahumma-hdini wa saddidni",
      meaning: "O Allah, guide me and keep me on the right path",
    },
  },
  {
    day: 28,
    ayah: {
      arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
      translation: "And My mercy encompasses all things",
      reference: "Al-A'raf 7:156",
      tafsir: "His mercy is wider than your sins, deeper than your fears.",
    },
    nameOfAllah: {
      arabic: "الرَّحِيم",
      transliteration: "Ar-Raheem",
      meaning: "The Especially Merciful",
      reflection: "Special mercy for the believers. You are included in this embrace.",
    },
    duaPrompt: {
      theme: "repentance",
      prompt: "What mercy do you need that you haven't asked for?",
    },
    ihsaanAct: "Show mercy to someone who doesn't deserve it",
    morningDhikr: {
      arabic: "اللَّهُمَّ ارْحَمْنِي بِرَحْمَتِكَ الْوَاسِعَةِ",
      transliteration: "Allahumma-rhamni bi-rahmatika al-wasi'ah",
      meaning: "O Allah, have mercy on me with Your vast mercy",
    },
  },
  {
    day: 29,
    ayah: {
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ",
      translation: "O you who believe, fear Allah and be with those who are true",
      reference: "At-Tawbah 9:119",
      tafsir: "Taqwa is cultivated in community. Surround yourself with the truthful.",
    },
    nameOfAllah: {
      arabic: "الحَقّ",
      transliteration: "Al-Haqq",
      meaning: "The Truth",
      reflection: "He is the ultimate truth. Align yourself with truth in all things.",
    },
    duaPrompt: {
      theme: "gratitude",
      prompt: "Who are the truthful people Allah has placed in your life?",
    },
    ihsaanAct: "Speak only truth today, even when it's hard",
    morningDhikr: {
      arabic: "اللَّهُمَّ أَرِنِي الْحَقَّ حَقًّا وَارْزُقْنِي اتِّبَاعَهُ",
      transliteration: "Allahumma arinal-haqqa haqqan wa-rzuqnat-tiba'ah",
      meaning: "O Allah, show me the truth as truth and grant me to follow it",
    },
  },
  {
    day: 30,
    ayah: {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      translation: "And whoever fears Allah—He will make for him a way out",
      reference: "At-Talaq 65:2",
      tafsir: "Taqwa is the key that opens doors you didn't know existed.",
    },
    nameOfAllah: {
      arabic: "الوَكِيل",
      transliteration: "Al-Wakeel",
      meaning: "The Trustee",
      reflection: "Hand your affairs to Him. He is the best of planners.",
    },
    duaPrompt: {
      theme: "hope",
      prompt: "As Ramadan ends, what do you hope has changed in you?",
    },
    ihsaanAct: "Make a commitment to carry one practice forward",
    morningDhikr: {
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      transliteration: "Hasbunallahu wa ni'mal-wakeel",
      meaning: "Sufficient for us is Allah, and He is the best Disposer of affairs",
    },
  },
]

export const lastTenNights = [
  {
    night: 21,
    focus: "Seek forgiveness with tears if they come",
    dua: "Ya Allah, forgive me for the sins I remember and those I've forgotten",
  },
  {
    night: 22,
    focus: "Ask for what seems impossible",
    dua: "Ya Allah, I ask You for the impossible because nothing is impossible for You",
  },
  {
    night: 23,
    focus: "Pray for those who have hurt you",
    dua: "Ya Allah, soften my heart toward those I struggle with",
  },
  {
    night: 24,
    focus: "Ask for protection of your faith",
    dua: "Ya Allah, let me die upon La ilaha illAllah",
  },
  {
    night: 25,
    focus: "Make dua for the ummah",
    dua: "Ya Allah, ease the suffering of every heart in pain tonight",
  },
  {
    night: 26,
    focus: "Ask for your parents, living or passed",
    dua: "Ya Allah, forgive them as they raised me when I was small",
  },
  {
    night: 27,
    focus: "This could be the night. Pour everything out",
    dua: "Ya Allah, accept this month from me and make it a turning point",
  },
  {
    night: 28,
    focus: "Ask for consistency after Ramadan",
    dua: "Ya Allah, don't let me return to who I was before",
  },
  {
    night: 29,
    focus: "Thank Allah for allowing you to witness this month",
    dua: "All praise is due to You for bringing me here",
  },
  {
    night: 30,
    focus: "One final, sincere asking",
    dua: "Ya Allah, You know what I need even when I don't",
  },
]

export const postEidDays = [
  {
    day: 1,
    theme: "Gratitude",
    prompt: "What are you most grateful for from Ramadan?",
    reflection: "The sweetness lingers. Notice it.",
  },
  {
    day: 2,
    theme: "Consistency",
    prompt: "What one practice will you maintain?",
    reflection: "Small and steady wins.",
  },
  {
    day: 3,
    theme: "Carrying Taqwa",
    prompt: "How will you protect what Ramadan built?",
    reflection: "Guard the garden of your heart.",
  },
  {
    day: 4,
    theme: "Protecting Nuur",
    prompt: "What threatens your inner light?",
    reflection: "Know your weaknesses. Protect accordingly.",
  },
  {
    day: 5,
    theme: "Sustaining Yaqeen",
    prompt: "How will you nurture your certainty?",
    reflection: "Faith needs tending.",
  },
  {
    day: 6,
    theme: "Long-term Dua",
    prompt: "What dua will you carry for the year ahead?",
    reflection: "Plant seeds for seasons you won't see.",
  },
]

export const charityTypes = [
  { id: "money", label: "Financial", icon: "💰" },
  { id: "time", label: "Time", icon: "⏰" },
  { id: "patience", label: "Patience", icon: "🌱" },
  { id: "kindness", label: "Kindness", icon: "💝" },
  { id: "silence", label: "Silence", icon: "🤫" },
  { id: "forgiveness", label: "Forgiveness", icon: "🕊️" },
]

export const moodOptions = [
  { value: "peaceful", label: "Peaceful", description: "A quiet stillness" },
  { value: "struggling", label: "Struggling", description: "Finding it hard today" },
  { value: "grateful", label: "Grateful", description: "Heart feels full" },
  { value: "heavy", label: "Heavy", description: "Carrying something" },
  { value: "hopeful", label: "Hopeful", description: "Light on the horizon" },
  { value: "distant", label: "Distant", description: "Feeling far away" },
]

export const morningAdhkar = [
  { arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ", translation: "We have reached the morning and the kingdom belongs to Allah" },
  {
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
    translation: "O Allah, by You we enter the morning and by You we enter the evening",
  },
  { arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ", translation: "O Allah, I ask You for the good of this day" },
]

export const quranGoals = [
  { id: "khatm", label: "Complete Khatm", pages: 20, description: "Finish the entire Quran" },
  { id: "half", label: "Half Khatm", pages: 10, description: "Complete 15 juz" },
  { id: "juz", label: "One Juz", pages: 1, description: "One juz this Ramadan" },
  { id: "custom", label: "Custom Goal", pages: 0, description: "Set your own pace" },
]
