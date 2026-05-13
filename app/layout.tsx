import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Bodoni_Moda,
  Figtree,
  Lato,
  Cormorant_Garamond,
  DM_Mono,
  Outfit,
} from "next/font/google"
import "./globals.css"

// import Navbar from "@/components/Layout/Navbar";
import { Navbar } from "@/components/Layout/Navbar"
import Footer from "@/components/Layout/Footer"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aadhyanta Fund Management",
  description: "",
}

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
})

const dm_mono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
})

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
})

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  weight: ["400", "700"],
  subsets: ["latin"],
})

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${figtree.variable} ${lato.variable} ${cormorant.variable} ${dm_mono.variable} ${outfit.variable} antialiased`}
    >
      {/* <body className={`${figtree.className}`}>{children}</body> */}
      <body className={`${outfit.className} `}>
        {/* <Navbar variant="transparent"/> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
