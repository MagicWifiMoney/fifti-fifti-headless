import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fifti Fifti - Home Decor and Design for All",
    template: "%s | Fifti Fifti"
  },
  description: "Discover inspiring home decor ideas, interior design tips, and lifestyle inspiration for creating beautiful living spaces.",
  keywords: ["home decor", "interior design", "lifestyle", "home improvement", "design ideas"],
  authors: [{ name: "Fifti Fifti" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fifti-fifti.net",
    siteName: "Fifti Fifti",
    title: "Fifti Fifti - Home Decor and Design for All",
    description: "Discover inspiring home decor ideas, interior design tips, and lifestyle inspiration for creating beautiful living spaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fifti Fifti - Home Decor and Design for All",
    description: "Discover inspiring home decor ideas, interior design tips, and lifestyle inspiration for creating beautiful living spaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
