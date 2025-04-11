"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link"; // Use Next.js Link for navigation
import Image from "next/image";

// Define interfaces for props
interface Category {
  id: string;
  specializationName: string;
  specializationImage?: string; // Optional image URL
}

interface CategorySectionProps {
  categories: Category[];
}

// Constants for better maintainability
const SCROLL_AMOUNT = 300; // Pixels to scroll with buttons
const AUTO_SCROLL_SPEED = 0.5; // Pixels per frame for auto-scroll
const IMAGE_TRANSITION_DURATION = "duration-300"; // Tailwind duration class for image scale

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false); // Track mouse hover over the component
  const [canScrollLeft, setCanScrollLeft] = useState(false); // State for left scroll button
  const [canScrollRight, setCanScrollRight] = useState(false); // State for right scroll button
  const autoScrollFrameRef = useRef<number | null>(null); // Ref to store animation frame ID for cleanup

  // --- Scroll Button State Update Logic ---
  // useCallback ensures this function reference is stable unless dependencies change
  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const tolerance = 1; // Tolerance for floating point comparisons
    const currentScrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(currentScrollLeft > tolerance);
    setCanScrollRight(currentScrollLeft < maxScrollLeft - tolerance);
  }, []); // No dependencies, reads directly from ref

  // --- Auto-scroll Effect ---
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    // Exit if container doesn't exist or no categories to scroll
    if (!scrollContainer || !categories || categories.length === 0) return;

    let scrollAmount = scrollContainer.scrollLeft; // Start from current scroll position

    const scroll = () => {
      // Only scroll if not hovering and the container still exists
      if (!isHovering && scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Prevent scrolling if content doesn't overflow
        if (maxScroll <= 0) {
           if (autoScrollFrameRef.current) cancelAnimationFrame(autoScrollFrameRef.current);
           updateScrollButtons(); // Ensure buttons are correctly disabled
           return;
        }

        scrollAmount += AUTO_SCROLL_SPEED;

        // Simple reset loop: If scrolled past the end, jump back to the beginning
        if (scrollAmount >= maxScroll + AUTO_SCROLL_SPEED) {
            scrollAmount = 0;
        }

        // Apply the calculated scroll position
        scrollContainer.scrollLeft = scrollAmount;

        // Update button states after programmatic scroll
        updateScrollButtons();
      }
      // Request the next frame
      autoScrollFrameRef.current = requestAnimationFrame(scroll);
    };

    // Start the animation loop
    autoScrollFrameRef.current = requestAnimationFrame(scroll);

    // Cleanup function: Cancel the animation frame when component unmounts
    // or when dependencies (isHovering, categories.length, updateScrollButtons) change
    return () => {
      if (autoScrollFrameRef.current) {
        cancelAnimationFrame(autoScrollFrameRef.current);
      }
    };
  }, [isHovering, categories, updateScrollButtons]); // Effect depends on hover state, categories array, and the callback

  // --- Effect for Initial State & Event Listeners ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check for button states on mount and when categories change
    updateScrollButtons();

    // Listen for user scrolls to update button states
    container.addEventListener("scroll", updateScrollButtons, { passive: true });

    // Use ResizeObserver to update buttons if container size changes
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    // Cleanup listeners on unmount
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [categories, updateScrollButtons]); // Depend on categories array and the stable callback

  // --- Event Handlers ---
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  // --- Render Logic ---
  // Handle case where categories array might be empty or not provided
  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-center text-gray-500 dark:text-gray-400">
        No categories available.
      </div>
    );
  }

  return (
    <div
      className="my-12 relative"
      onMouseEnter={handleMouseEnter} // Pause auto-scroll on hover
      onMouseLeave={handleMouseLeave} // Resume auto-scroll on leave
    >
      <h2 className="text-2xl font-extrabold text-text-color px-4 sm:px-6 lg:px-8 mb-8">
        Explore Categories
      </h2>

      {/* Scroll Left Button */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        disabled={!canScrollLeft} // Disable button if cannot scroll left
        className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 border border-gray-300 hover:border-gray-500 text-gray-500 hover:text-gray-700 rounded-full p-3 shadow-sm flex items-center justify-center
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-500 transition-opacity`}
      >
        <i className="fas fa-angle-left"></i> {/* Ensure Font Awesome is available */}
      </button>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        disabled={!canScrollRight} // Disable button if cannot scroll right
        className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 border border-gray-300 hover:border-gray-500 text-gray-500 hover:text-gray-700 rounded-full p-3 shadow-sm flex items-center justify-center
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-500 transition-opacity`}
      >
        <i className="fas fa-angle-right"></i> {/* Ensure Font Awesome is available */}
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 px-4 sm:space-x-8 sm:px-6 lg:px-12 scrollbar-hide" // Horizontal scroll, spacing, padding, hide scrollbar
      >
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${encodeURIComponent(category.specializationName)}`}
            className="flex flex-col items-center flex-shrink-0 group" // Use group for hover effects on children
            aria-label={`View category: ${category.specializationName}`}
          >
            {/* Circular Container (Mask) */}
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-background-secondary flex items-center justify-center shadow-lg overflow-hidden"
              // Removed scale/transform from here - it now only clips the image
            >
              <Image
                src={category.specializationImage || "/default-category.png"} // Provide fallback image path
                alt={category.specializationName} // Alt text for accessibility
                width={160} // Match container dimensions (e.g., sm:w-40 -> 160px)
                height={160} // Match container dimensions
                className={`rounded-full object-cover w-full h-full transition-transform ${IMAGE_TRANSITION_DURATION} ease-in-out group-hover:scale-110`} // Apply scale and transition directly to image
                priority={index < 3} // Prioritize loading first few images
              />
            </div>

            {/* Category Name */}
            <p
              className="mt-4 text-base sm:text-lg font-medium text-text-color text-center truncate w-36 sm:w-40"
              title={category.specializationName} // Show full name on hover (tooltip)
            >
              {category.specializationName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Add this CSS to your global stylesheet (e.g., styles/globals.css)
// if you don't have a Tailwind plugin for hiding scrollbars:
/*
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

export default CategorySection;