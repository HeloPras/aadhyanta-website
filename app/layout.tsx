import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda, Figtree, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import { lazy } from "react";
import Footer from "@/components/Layout/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadhyanta Fund Management",
  description: "",
};

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
})

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${figtree.variable} ${lato.variable} antialiased`}
    >
      <Navbar />
      {/* <body className={`${figtree.className}`}>{children}</body> */}
      <body className={`${lato.className}`}>{children}</body>
      <Footer />
    </html>
  )
}
