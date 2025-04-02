"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search"); // Navigate to the search page
  };

  const handleNotificationClick = () => {
    router.push("/notifications"); // Navigate to the notifications page
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      {/* Search Input */}
      <div className="flex-grow relative">
        <input
          type="text"
          placeholder="Search"
          readOnly
          onClick={handleSearchClick}
          className="w-full h-12 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none shadow-md"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
            />
          </svg>
        </span>
      </div>

      {/* Notification Icon */}
      <button
        onClick={handleNotificationClick}
        className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
          />
        </svg>
        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
};

export default SearchBar;