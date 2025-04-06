import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeConfig";
import { UserProfileProvider } from "../context/UserProfileContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Helpert - Book Experts for Any Advice",
  description: "Find top experts in astrology, psychology, yoga, and more. Book 1-on-1 sessions instantly.",
  keywords: "experts, online consultation, astrology, psychology, yoga, mentorship",
  metadataBase: new URL("https://www.helperts.com"),
  openGraph: {
    title: "Helpert - Find Experts for Any Advice",
    description: "Instantly connect with verified experts in various fields and get personalized guidance.",
    url: "https://www.helperts.com",
    siteName: "Helpert",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Helpert - Find Experts for Any Advice" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helpert - Find Experts for Any Advice",
    description: "Book consultations with experts in various fields like astrology, psychology, and more.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-background text-text-color font-sans flex flex-col min-h-screen">
        <ThemeProvider>
          <UserProfileProvider>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 pt-[64px] pb-8">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {children}
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </UserProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
