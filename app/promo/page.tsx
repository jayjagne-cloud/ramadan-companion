"use client"

import Image from "next/image"
import { Star, BookOpen, Clock, Heart, Moon, Sparkles, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PromoPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Page Header */}
      <div className="pt-8 pb-4 px-4 text-center border-b border-gold/10">
        <Image
          src="/images/33df7b37-1a2e-432a-8029.jpeg"
          alt="Barrkeh DigiProducts"
          width={60}
          height={60}
          className="rounded-full border border-gold/40 mx-auto mb-3"
        />
        <h1 className="text-gold font-serif text-2xl tracking-wide mb-1">Marketing Assets</h1>
        <p className="text-gold/60 text-xs tracking-[0.15em]">BARRKEH RAMADAN COMPANION</p>
        <p className="text-cream/50 text-sm mt-2">Social media ready promotional materials</p>
      </div>

      {/* Generated Images Section */}
      <section className="p-4 border-b border-gold/10">
        <h2 className="text-gold text-sm tracking-[0.15em] uppercase mb-4 text-center">Ready-to-Use Promotional Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-gold/60 text-xs mb-2">Instagram Square</p>
            <div className="relative group">
              <Image
                src="/images/promo-instagram-square.jpg"
                alt="Instagram Square Promo"
                width={300}
                height={300}
                className="rounded-xl border border-gold/20 w-full"
              />
              <a 
                href="/images/promo-instagram-square.jpg" 
                download="barrkeh-ramadan-instagram.jpg"
                className="absolute inset-0 bg-[#0a0e1a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
              >
                <span className="text-gold text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gold/60 text-xs mb-2">Instagram Story</p>
            <div className="relative group">
              <Image
                src="/images/promo-instagram-story.jpg"
                alt="Instagram Story Promo"
                width={200}
                height={355}
                className="rounded-xl border border-gold/20 mx-auto"
              />
              <a 
                href="/images/promo-instagram-story.jpg" 
                download="barrkeh-ramadan-story.jpg"
                className="absolute inset-0 bg-[#0a0e1a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
              >
                <span className="text-gold text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gold/60 text-xs mb-2">Social Banner</p>
            <div className="relative group">
              <Image
                src="/images/promo-social-banner.jpg"
                alt="Social Media Banner"
                width={300}
                height={169}
                className="rounded-xl border border-gold/20 w-full"
              />
              <a 
                href="/images/promo-social-banner.jpg" 
                download="barrkeh-ramadan-banner.jpg"
                className="absolute inset-0 bg-[#0a0e1a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
              >
                <span className="text-gold text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Previews Section Header */}
      <div className="pt-6 pb-2 px-4 text-center">
        <h2 className="text-gold text-sm tracking-[0.15em] uppercase mb-1">Interactive Preview Cards</h2>
        <p className="text-cream/40 text-xs">Screenshot these for additional promotional content</p>
      </div>

      {/* Hero Poster - Instagram Square */}
      <section className="p-4">
        <h2 className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4 text-center">Instagram Post (1:1)</h2>
        <div className="mx-auto max-w-[400px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl overflow-hidden relative">
          {/* Border glow */}
          <div className="absolute inset-0 border border-gold/20 rounded-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase mb-4">Introducing</p>
            
            <Image
              src="/images/33df7b37-1a2e-432a-8029.jpeg"
              alt="Barrkeh DigiProducts"
              width={80}
              height={80}
              className="rounded-full border-2 border-gold/40 shadow-xl shadow-gold/20 mb-4"
            />
            
            <h1 className="text-gold font-serif text-3xl tracking-wide mb-1">BARRKEH</h1>
            <p className="text-gold/60 text-[10px] tracking-[0.25em] mb-4">RAMADAN COMPANION</p>
            
            <p className="text-gold/80 font-arabic text-2xl mb-4">بَرَكَة</p>
            
            <p className="text-cream/70 text-sm max-w-[250px] mb-6">
              Your premium spiritual guide for the holiest month
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold/80 text-[10px]">
                Full Quran
              </span>
              <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold/80 text-[10px]">
                Prayer Times
              </span>
              <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold/80 text-[10px]">
                30 Day Guide
              </span>
            </div>
            
            <p className="text-gold text-sm font-medium">barrkehdp.com</p>
          </div>
        </div>
      </section>

      {/* Story Format - 9:16 */}
      <section className="p-4">
        <h2 className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4 text-center">Instagram Story (9:16)</h2>
        <div className="mx-auto max-w-[270px] aspect-[9/16] bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="h-full flex flex-col items-center justify-between py-10 px-6 text-center">
            <div>
              <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase mb-2">Introducing</p>
              <Image
                src="/images/33df7b37-1a2e-432a-8029.jpeg"
                alt="Barrkeh DigiProducts"
                width={60}
                height={60}
                className="rounded-full border border-gold/40 mx-auto mb-3"
              />
              <h1 className="text-gold font-serif text-2xl tracking-wide">BARRKEH</h1>
              <p className="text-gold/50 text-[8px] tracking-[0.2em]">RAMADAN COMPANION</p>
            </div>
            
            <div>
              <p className="text-gold/80 font-arabic text-3xl mb-2">رَمَضَان مُبَارَك</p>
              <p className="text-cream/60 text-xs mb-6">Transform your holy month</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-cream/70 text-xs">
                  <BookOpen className="w-3 h-3 text-gold" />
                  <span>Complete Quran with Bookmarks</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-cream/70 text-xs">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>Location-Based Prayer Times</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-cream/70 text-xs">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>30 Days of Spiritual Content</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-cream/70 text-xs">
                  <Moon className="w-3 h-3 text-gold" />
                  <span>Laylatul Qadr Experience</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-r from-gold to-gold-light text-navy text-xs font-semibold px-6 py-2 rounded-full mb-3">
                Get Yours Now
              </div>
              <p className="text-gold/80 text-xs">barrkehdp.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Card */}
      <section className="p-4">
        <h2 className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4 text-center">Feature Highlight Cards</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
          {/* Quran Card */}
          <div className="min-w-[300px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center snap-center">
            <BookOpen className="w-10 h-10 text-gold mb-4" />
            <p className="text-gold/80 font-arabic text-xl mb-2">الْقُرْآن الْكَرِيم</p>
            <h3 className="text-gold font-serif text-xl mb-2">Complete Quran</h3>
            <p className="text-cream/60 text-sm mb-4">All 114 Surahs at your fingertips</p>
            <div className="space-y-1 text-xs text-cream/50">
              <p>Arabic Text</p>
              <p>Transliteration</p>
              <p>English Translation</p>
              <p>Bookmarks & Progress</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/20 w-full">
              <p className="text-gold/60 text-xs">BARRKEH RAMADAN COMPANION</p>
            </div>
          </div>

          {/* Prayer Times Card */}
          <div className="min-w-[300px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center snap-center">
            <Clock className="w-10 h-10 text-gold mb-4" />
            <p className="text-gold/80 font-arabic text-xl mb-2">الصَّلَاة</p>
            <h3 className="text-gold font-serif text-xl mb-2">Prayer Times</h3>
            <p className="text-cream/60 text-sm mb-4">Never miss a prayer again</p>
            <div className="space-y-1 text-xs text-cream/50">
              <p>Location-Based Accuracy</p>
              <p>Multiple Calculation Methods</p>
              <p>Countdown to Next Prayer</p>
              <p>Notification Reminders</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/20 w-full">
              <p className="text-gold/60 text-xs">BARRKEH RAMADAN COMPANION</p>
            </div>
          </div>

          {/* Daily Barakah Card */}
          <div className="min-w-[300px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center snap-center">
            <Sparkles className="w-10 h-10 text-gold mb-4" />
            <p className="text-gold/80 font-arabic text-xl mb-2">بَرَكَة</p>
            <h3 className="text-gold font-serif text-xl mb-2">Daily Barakah</h3>
            <p className="text-cream/60 text-sm mb-4">Unique content for every day</p>
            <div className="space-y-1 text-xs text-cream/50">
              <p>Daily Ayah with Tafsir</p>
              <p>99 Names of Allah</p>
              <p>Morning Adhkar</p>
              <p>Acts of Ihsaan</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/20 w-full">
              <p className="text-gold/60 text-xs">BARRKEH RAMADAN COMPANION</p>
            </div>
          </div>

          {/* Laylatul Qadr Card */}
          <div className="min-w-[300px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center snap-center">
            <Moon className="w-10 h-10 text-gold mb-4" />
            <p className="text-gold/80 font-arabic text-xl mb-2">لَيْلَةُ الْقَدْرِ</p>
            <h3 className="text-gold font-serif text-xl mb-2">Sacred Nights</h3>
            <p className="text-cream/60 text-sm mb-4">Last 10 nights experience</p>
            <div className="space-y-1 text-xs text-cream/50">
              <p>Night-Specific Duas</p>
              <p>Letter to Allah</p>
              <p>Tahajjud Tracker</p>
              <p>Repentance Prompts</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/20 w-full">
              <p className="text-gold/60 text-xs">BARRKEH RAMADAN COMPANION</p>
            </div>
          </div>

          {/* Emotional Care Card */}
          <div className="min-w-[300px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center snap-center">
            <Heart className="w-10 h-10 text-gold mb-4" />
            <p className="text-gold/80 font-arabic text-xl mb-2">رَحْمَة</p>
            <h3 className="text-gold font-serif text-xl mb-2">Emotional Care</h3>
            <p className="text-cream/60 text-sm mb-4">For the heavy days</p>
            <div className="space-y-1 text-xs text-cream/50">
              <p>Low Imaan Support</p>
              <p>Forgiveness Pages</p>
              <p>Mercy Reminders</p>
              <p>Gentle Guidance</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/20 w-full">
              <p className="text-gold/60 text-xs">BARRKEH RAMADAN COMPANION</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Banner - Twitter/Facebook */}
      <section className="p-4">
        <h2 className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4 text-center">Social Media Banner (16:9)</h2>
        <div className="mx-auto max-w-[600px] aspect-video bg-gradient-to-r from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 border border-gold/10" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="h-full flex items-center justify-between px-8">
            <div className="flex-1">
              <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase mb-2">Introducing</p>
              <h1 className="text-gold font-serif text-2xl md:text-3xl tracking-wide mb-1">BARRKEH</h1>
              <p className="text-gold/50 text-[10px] tracking-[0.15em] mb-3">RAMADAN COMPANION</p>
              <p className="text-cream/60 text-xs max-w-[200px] mb-4">
                Your premium spiritual guide for the holiest month
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded text-gold/80 text-[9px]">
                  Full Quran
                </span>
                <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded text-gold/80 text-[9px]">
                  Prayer Times
                </span>
                <span className="px-2 py-1 bg-gold/10 border border-gold/20 rounded text-gold/80 text-[9px]">
                  30 Days
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <Image
                src="/images/33df7b37-1a2e-432a-8029.jpeg"
                alt="Barrkeh DigiProducts"
                width={70}
                height={70}
                className="rounded-full border-2 border-gold/40 shadow-xl shadow-gold/20 mb-3"
              />
              <p className="text-gold/80 font-arabic text-xl mb-2">بَرَكَة</p>
              <p className="text-gold text-xs font-medium">barrkehdp.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Style Card */}
      <section className="p-4 pb-24">
        <h2 className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4 text-center">Quote Card</h2>
        <div className="mx-auto max-w-[400px] aspect-square bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] border border-gold/30 rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <Star className="w-6 h-6 text-gold/40 mb-4" />
            
            <p className="text-gold/80 font-arabic text-xl mb-4">
              وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
            </p>
            
            <p className="text-cream/80 text-sm italic mb-2">
              "And whoever fears Allah - He will make for him a way out"
            </p>
            <p className="text-gold/50 text-xs mb-8">Surah At-Talaq, 65:2</p>
            
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
            
            <p className="text-cream/60 text-sm mb-6">
              Let this Ramadan be your turning point. Plan with purpose. Grow with intention.
            </p>
            
            <div className="flex items-center gap-3">
              <Image
                src="/images/33df7b37-1a2e-432a-8029.jpeg"
                alt="Barrkeh DigiProducts"
                width={40}
                height={40}
                className="rounded-full border border-gold/30"
              />
              <div className="text-left">
                <p className="text-gold text-sm font-medium">Barrkeh Ramadan Companion</p>
                <p className="text-gold/50 text-xs">barrkehdp.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Planner */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-6 py-3 rounded-full shadow-lg shadow-gold/30"
          onClick={() => (window.location.href = "/")}
        >
          Back to Planner
        </Button>
      </div>
    </div>
  )
}
