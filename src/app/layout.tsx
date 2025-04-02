import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import { ThemeProvider } from "../context/ThemeConfig"; // Import ThemeProvider
import Navbar from "@/components/layout/Navbar"; // Import Navbar component

// Load Inter font (Professional & Clean like LinkedIn/Twitter)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Optimized font loading
  variable: "--font-inter",
});

// SEO Optimization (Title, Description, OpenGraph, Twitter Meta)
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
    images: [
      {
        url: "/og-image.jpg", // Add a proper OpenGraph image
        width: 1200,
        height: 630,
        alt: "Helpert - Find Experts for Any Advice",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helpert - Find Experts for Any Advice",
    description: "Book consultations with experts in various fields like astrology, psychology, and more.",
    images: ["/og-image.jpg"], // Use the same OpenGraph image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background-color text-text-color font-sans">
        <ThemeProvider>
          <Navbar /> {/* Include the Navbar component */}
          {children} {/* Render the page content */}
        </ThemeProvider>
      </body>
    </html>
  );
}
