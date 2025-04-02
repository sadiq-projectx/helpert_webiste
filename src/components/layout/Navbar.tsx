"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { label: "Home", href: "/home", icon: "🏠" },
    { label: "Meetings", href: "/appointments", icon: "📅" },
    { label: "Feed", href: "/video-feed", icon: "🔥" },
    { label: "Messages", href: "/messages", icon: "💬" },
    { label: "Profile", href: "/profile", icon: "👤" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          <Link href="/home">Helpert</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={`flex flex-col items-center text-sm ${
                pathname === item.href
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              <Link href={item.href} className="flex flex-col items-center">
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;