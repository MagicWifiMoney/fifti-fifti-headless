import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Fifti Fifti - Home Decor and Design for All",
    template: "%s | Fifti Fifti"
  },
  description: "Your trusted source for home decor inspiration, interior design tips, and lifestyle ideas. Empowering homeowners since 2015.",
  keywords: ["home decor", "interior design", "lifestyle", "home improvement", "design ideas", "furniture", "room design", "decorating tips"],
  authors: [{ name: "Fifti Fifti Editorial Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fifti-fifti.net",
    siteName: "Fifti Fifti",
    title: "Fifti Fifti - Home Decor and Design for All",
    description: "Your trusted source for home decor inspiration, interior design tips, and lifestyle ideas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fifti Fifti - Home Decor and Design for All",
    description: "Your trusted source for home decor inspiration, interior design tips, and lifestyle ideas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
