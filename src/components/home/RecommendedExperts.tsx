"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// --- IMPORTANT: Verify these import paths match YOUR project structure ---
import { FEATURED_EXPERT, USER_DEFAULT } from "@/constants/assets/imageConstants";

// --- Constants ---
const SCROLL_AMOUNT = 300; // Pixels to scroll with buttons

// --- SVG Star Icon Component (for cleaner rating display) ---
const StarIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true" // Hide decorative icon from screen readers
  >
     <title>Star Rating</title> {/* Accessibility Title */}
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Interfaces ---
interface Expert {
  id: string;
  fullName: string;
  specialization: string;
  profilePicture: string; // Should be a complete URL or handle internally
  sessionRate: number;
  rating: number;
}

interface RecommendedExpertsProps {
  experts: Expert[];
  title: string;
  icon?: string; // Optional: Path to the header icon
  viewMoreLink?: string; // Optional: Link for the "View More" button
}

// --- Component ---
const RecommendedExperts: React.FC<RecommendedExpertsProps> = ({
  experts,
  title,
  icon = FEATURED_EXPERT, // Default Icon
  viewMoreLink = "/search", // Default View More destination
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartData = useRef({ startX: 0, scrollLeft: 0 });

  // --- Helper to get valid image URL or fallback ---
  const getImageUrl = useCallback((url: string | null | undefined): string => {
    // Provide USER_DEFAULT if url is null, undefined, or doesn't seem like a valid URL
    if (!url || !(url.startsWith("http://") || url.startsWith("https://"))) {
        return USER_DEFAULT;
    }
    return url;
  }, []); // Empty dependency array as USER_DEFAULT is constant


  // --- Scroll Button State Update Logic ---
  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const tolerance = 2;
    // Round values for more reliable comparison at edges
    const currentScrollLeft = Math.round(container.scrollLeft);
    const maxScrollLeft = Math.round(container.scrollWidth - container.clientWidth);

    setCanScrollLeft(currentScrollLeft > tolerance);
    setCanScrollRight(currentScrollLeft < maxScrollLeft - tolerance);
  }, []); // Depends only on the ref, which is stable

  // --- Effect for Initial State & Listeners ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || experts.length === 0) return; // Don't add listeners if no container or experts

    const handleScroll = () => updateScrollButtons();
    const handleResize = () => updateScrollButtons();

    // Initial check right after component mounts and potentially renders
    requestAnimationFrame(updateScrollButtons); // Use rAF for check after layout

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [experts, updateScrollButtons]); // Rerun if experts array changes

  // --- Scroll Button Click Handlers ---
  const handleScrollLeft = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }, []); // No dependencies needed

  const handleScrollRight = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }, []); // No dependencies needed

  // --- Drag Scroll Logic ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current || e.button !== 0) return; // Only main mouse button
    setIsDragging(true);
    dragStartData.current = {
      startX: e.pageX - (scrollContainerRef.current.offsetLeft ?? 0), // Handle potential null offsetLeft
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
    e.preventDefault(); // Prevent text selection etc. during drag
     // Change cursor for the body while dragging for better UX
    document.body.style.cursor = 'grabbing';
    scrollContainerRef.current.style.cursor = 'grabbing';
  }, []); // No changing dependencies

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    // No preventDefault needed here usually
    const x = e.pageX - (scrollContainerRef.current.offsetLeft ?? 0);
    const walk = x - dragStartData.current.startX;
    scrollContainerRef.current.scrollLeft = dragStartData.current.scrollLeft - walk;
    updateScrollButtons(); // Update buttons while dragging
  }, [isDragging, updateScrollButtons]); // Depends on isDragging state

  const stopDragging = useCallback(() => {
    if (isDragging) { // Only run if dragging was active
      setIsDragging(false);
       // Restore cursor
      document.body.style.cursor = '';
      if(scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
      }
    }
  }, [isDragging]); // Depends on isDragging state

  // Effect to add/remove mouseup/mouseleave listeners on window
  useEffect(() => {
    if (isDragging) {
      // Add listeners to window to catch drag end anywhere
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('mouseleave', stopDragging); // Stop if mouse leaves window
    }
    // Cleanup function
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('mouseleave', stopDragging);
       // Ensure cursor is reset if component unmounts while dragging
      document.body.style.cursor = '';
    };
  }, [isDragging, stopDragging]); // Rerun when isDragging changes

  // --- Touch Support --- (Simplified version)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true); // Reuse isDragging state for visual feedback (cursor won't show, but can use for styling)
    dragStartData.current = {
      startX: e.touches[0].pageX - (scrollContainerRef.current.offsetLeft ?? 0),
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
     // Don't preventDefault here unless you want to block vertical scroll completely
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    // Only preventDefault if horizontal scroll is significant? Advanced topic.
    const x = e.touches[0].pageX - (scrollContainerRef.current.offsetLeft ?? 0);
    const walk = x - dragStartData.current.startX;
    scrollContainerRef.current.scrollLeft = dragStartData.current.scrollLeft - walk;
    updateScrollButtons();
  }, [isDragging, updateScrollButtons]);

  // --- Render ---
  if (!experts || experts.length === 0) {
    return (
      <div className="my-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-text-color mb-4">{title}</h2>
        <p className="text-secondary">No experts found.</p>
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-12 relative group/section"> {/* Section container */}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          {/* Icon */}
          <div className="relative w-6 h-6 text-primary">
             {icon && ( // Ensure icon path is valid before rendering Image
               <Image src={icon} alt="" fill className="object-contain" aria-hidden="true" sizes="24px" />
             )}
          </div>
          {/* Title */}
          <h2 className="text-xl font-semibold text-text-color tracking-tight">{title}</h2>
        </div>
        {/* View More Link */}
        {viewMoreLink && (
            <Link href={viewMoreLink} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View More
            </Link>
        )}
      </div>

      {/* Scroll Buttons */}
      {/* Left Button */}
      <button
        onClick={handleScrollLeft}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`absolute left-0 md:left-1 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-background/60 dark:bg-surface/60 backdrop-blur-sm border border-white/20 dark:border-black/20 text-text-color/80 hover:text-text-color shadow-md hover:shadow-lg transition-all duration-300 ease-in-out opacity-0 group-hover/section:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary/50`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><title>Scroll Left</title><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {/* Right Button */}
      <button
        onClick={handleScrollRight}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-background/60 dark:bg-surface/60 backdrop-blur-sm border border-white/20 dark:border-black/20 text-text-color/80 hover:text-text-color shadow-md hover:shadow-lg transition-all duration-300 ease-in-out opacity-0 group-hover/section:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary/50`}
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><title>Scroll Right</title><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Experts List Container */}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide snap-x snap-mandatory transition-transform duration-200 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} // Apply cursor style based on state
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // Ensure cursor style overrides default
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        // MouseUp/Leave handled by window listeners attached in useEffect
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDragging} // Use common stop function for touch end
        onTouchCancel={stopDragging} // Handle touch cancel
      >
        {experts.map((expert) => (
          <Link
            key={expert.id}
            href={`/expert/${expert.id}`}
            className="block w-56 sm:w-60 md:w-64 flex-shrink-0 group snap-center bg-surface rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg focus-visible:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface" // Added offset color to match card bg
            aria-label={`View profile of ${expert.fullName}`}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
              {/* Adjust aspect-square if profile pics are not square */}
              <Image
                src={getImageUrl(expert.profilePicture)} // Use helper for fallback
                alt={`Profile picture of ${expert.fullName}`}
                fill
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw"
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Image scale on hover
              />
            </div>

            {/* Expert Details */}
            <div className="p-3 sm:p-4 space-y-1.5">
              {/* Name */}
              <h3 className="text-base font-semibold text-text-color truncate group-hover:text-primary transition-colors" title={expert.fullName}>
                {expert.fullName}
              </h3>
              {/* Specialization */}
              <p className="text-xs sm:text-sm text-secondary truncate" title={expert.specialization}>
                {expert.specialization}
              </p>
              {/* Rating & Price Row */}
              <div className="flex justify-between items-center pt-1 text-sm">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                  <StarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-text-color">{expert.rating.toFixed(1)}</span>
                </div>
                {/* Price */}
                <div className="font-semibold text-text-color">
                   {/* Replace with actual currency formatting logic if available */}
                  ₹{expert.sessionRate.toLocaleString()}
                  <span className="text-xs font-normal text-secondary"> /session</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {/* Spacer for snapping */}
        <div className="flex-shrink-0 w-1 snap-center" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default RecommendedExperts;

// Add CSS for scrollbar-hide to globals.css if needed:
/*
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
*/