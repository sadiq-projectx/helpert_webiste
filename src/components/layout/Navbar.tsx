"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image for optimized loading
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // For smooth animations
import { Menu, X, Home, Calendar, Flame, MessageCircle, User } from "lucide-react"; // Import professional icons

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  // Define navigation items with professional icons
  const navItems = [
    { label: "Home", href: "/home", icon: <Home size={20} /> },
    { label: "Meetings", href: "/appointments", icon: <Calendar size={20} /> },
    { label: "Feed", href: "/video-feed", icon: <Flame size={20} /> },
    { label: "Messages", href: "/messages", icon: <MessageCircle size={20} /> },
    { label: "Profile", href: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-6 h-full flex justify-between items-center max-w-[1440px]">
        {/* Logo */}
        <div className="flex items-center h-full py-2">
          <Link href="/home" aria-label="Helpert Home" className="flex items-center h-full">
            <Image
              src="/helpert-logo.svg"
              alt="Helpert Logo"
              className="h-10 w-auto object-contain"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`flex flex-col items-center text-sm transition duration-300 ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label={item.label}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 h-1 w-full bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
          aria-label="Toggle Mobile Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)} // Close menu when clicking the backdrop
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-md absolute top-16 left-0 w-full z-40"
          >
            <ul className="flex flex-col items-center py-6 space-y-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 text-base ${
                      pathname === item.href
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    onClick={() => setIsOpen(false)} // Close menu on click
                    aria-label={item.label}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
