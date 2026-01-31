import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Cormorant_Garamond, Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Barrkeh DigiProducts | Ramadan Planner",
  description: "A luxury, app-style digital planner for your sacred Ramadan journey by Barrkeh DigiProducts",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ramadan Planner",
  },
  icons: {
    apple: "/images/33df7b37-1a2e-432a-8029.jpeg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0e1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#0a0e1a]">
      <body className={`${outfit.variable} ${cormorant.variable} ${amiri.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
