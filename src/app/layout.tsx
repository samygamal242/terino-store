import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "TERINO | Luxury Fashion Store",
  description:
    "Discover TERINO — a premium luxury fashion brand offering exclusive shoes, sneakers, bags, and accessories. Redefine your style with elegance.",
  keywords: [
    "luxury fashion",
    "premium shoes",
    "designer bags",
    "sneakers",
    "accessories",
    "TERINO",
  ],
  openGraph: {
    title: "TERINO | Luxury Fashion Store",
    description: "Premium fashion for the discerning individual.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
