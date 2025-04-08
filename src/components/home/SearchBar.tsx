"use client";

import React from "react";
import Link from "next/link"; // Import Link
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const router = useRouter();

  // Keep using onClick for the input as it's visually an input
  const handleSearchClick = () => {
    router.push("/search");
  };

  // NOTE: If notification count is available, pass it as a prop
  // const { notificationCount = 1 } = props; // Example prop
  const hasNotifications = true; // Simulate having notifications for the dot

  return (
    // Adjusted padding and main background (optional, depends on context)
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 py-3 bg-background"> {/* Use theme background */}

      {/* Search Input Area (using div for focus-within styling) */}
      <div className="flex-grow relative w-full group"> {/* Added group for focus-within styling */}
        {/* Add an explicit label for accessibility */}
        <label htmlFor="search-trigger" className="sr-only"> {/* Screen-reader only label */}
          Search
        </label>
        <input
          id="search-trigger" // Link label to input
          type="text" // Keep type text for semantics, but it's read-only
          placeholder="Search for experts..." // More specific placeholder
          readOnly
          onClick={handleSearchClick}
          aria-label="Open search page" // More descriptive aria-label
          className="w-full h-11 pl-10 pr-4 rounded-lg border // Use border instead of shadow
                     bg-surface text-text-color placeholder-secondary // Use theme colors
                     border-gray-200 dark:border-gray-700 // Subtle border
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary // Ring focus state
                     dark:bg-surface cursor-pointer transition-colors" // Cursor pointer indicates clickability
        />
        <span
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary pointer-events-none" // pointer-events-none so it doesn't block clicks
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5" // Slightly larger icon?
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8} // Slightly thinner stroke?
            aria-hidden="true" // Hide decorative icon from screen readers
          >
             <title>Search Icon</title> {/* SVG Title */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
            />
          </svg>
        </span>
      </div>

      {/* Notification Button (using Link for navigation) */}
      <Link
        href="/notifications"
        passHref // Necessary for custom component/tag inside Link
        legacyBehavior // Required when wrapping an `<a>` or custom component that isn't just text
      >
        <a // Use an anchor tag for semantic link, styled as a button
          aria-label="View notifications" // Aria-label for the link
          className="relative w-11 h-11 flex items-center justify-center rounded-lg border // Use border like input
                     bg-surface text-secondary // Theme colors
                     border-gray-200 dark:border-gray-700 // Subtle border
                     hover:bg-gray-100 dark:hover:bg-gray-700/50 // Hover state
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary // Ring focus state
                     flex-shrink-0 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" // Icon size
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8} // Match search icon stroke?
            aria-hidden="true" // Hide decorative icon
          >
             <title>Notifications Icon</title> {/* SVG Title */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
            />
          </svg>
          {/* Notification Dot (Conditional Rendering) */}
          {hasNotifications && (
            <span
               className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" // Added border to pop against icon
               aria-hidden="true" // Hide dot itself, label on button is sufficient
            ></span>
          )}
        </a>
      </Link>
    </div>
  );
};

export default SearchBar;