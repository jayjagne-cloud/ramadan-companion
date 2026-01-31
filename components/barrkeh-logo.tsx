"use client"

import Image from "next/image"

interface BarrkehLogoProps {
  size?: number
  className?: string
}

export function BarrkehLogo({ size = 60, className = "" }: BarrkehLogoProps) {
  return (
    <Image
      src="/images/33df7b37-1a2e-432a-8029.jpeg"
      alt="Barrkeh DigiProducts"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      priority
    />
  )
}
