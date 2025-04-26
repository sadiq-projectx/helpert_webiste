"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IC_VIDEO } from "../../constants/assets/imageConstants"; // Assuming this is a valid path/import

// Constants
const SCROLL_AMOUNT = 300; // Pixels to scroll with buttons

interface Video {
  id: string;
  thumbnailPath: string;
  tagList: string[];
  title: string; // Still needed for alt text and aria-label
}

interface VideoCardsProps {
  videos: Video[];
}

const VideoCards: React.FC<VideoCardsProps> = ({ videos }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // --- Scroll Button State Update ---
  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const tolerance = 2;
    const currentScrollLeft = Math.round(container.scrollLeft);
    const maxScrollLeft = Math.round(container.scrollWidth - container.clientWidth);
    setCanScrollLeft(currentScrollLeft > tolerance);
    setCanScrollRight(currentScrollLeft < maxScrollLeft - tolerance);
  }, []);

  // --- Effect for Initial State & Listeners ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    // Debounce/throttle recommended for production if performance issues arise
    const handleScroll = () => updateScrollButtons();
    const handleResize = () => updateScrollButtons();

    updateScrollButtons(); // Initial check
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [videos, updateScrollButtons]);

  // --- Tag Conversion ---
  const convertTagListIntoString = (tags: string[]) => {
    // Show first 3 tags with a dot separator for a clean look
    return tags?.length > 0 ? tags.slice(0, 3).join(" · ") : "Video";
  };

  // --- Scroll Button Handlers ---
  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };
  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  // --- Drag Scroll Logic ---
  const dragStartData = useRef({ startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current || e.button !== 0) return; // Only main button
    setIsDragging(true);
    dragStartData.current = {
      startX: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - dragStartData.current.startX;
    scrollContainerRef.current.scrollLeft = dragStartData.current.scrollLeft - walk;
    updateScrollButtons();
  };

  const stopDragging = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  // Attach mouse up/leave listener to the window for robust drag end detection
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('mouseleave', stopDragging);
    }
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('mouseleave', stopDragging);
    };
  }, [isDragging, stopDragging]);

  // --- Touch support ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    dragStartData.current = {
      startX: e.touches[0].pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - dragStartData.current.startX;
    scrollContainerRef.current.scrollLeft = dragStartData.current.scrollLeft - walk;
    updateScrollButtons();
  };

  // --- Render ---
  if (!videos || videos.length === 0) {
    return <div className="my-8 px-4 sm:px-6 lg:px-8 text-secondary">No videos available.</div>;
  }

  return (
    <div className="my-8 relative group/section"> {/* Section container */}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Image src={IC_VIDEO} alt="" width={22} height={22} aria-hidden="true" className="opacity-80"/>
          <h2 className="text-xl font-semibold text-text-color tracking-tight">Featured Videos</h2>
        </div>
        <Link href="/feed" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          View More
        </Link>
      </div>

      {/* Scroll Buttons - Refined Style */}
      <button
        onClick={handleScrollLeft}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`absolute left-0 md:left-1 top-1/2 transform -translate-y-1/2 z-20
                   w-9 h-9 rounded-full flex items-center justify-center
                   bg-background/60 dark:bg-surface/60 backdrop-blur-sm
                   border border-white/20 dark:border-black/20
                   text-text-color/80 hover:text-text-color
                   shadow-md hover:shadow-lg
                   transition-all duration-300 ease-in-out
                   opacity-0 group-hover/section:opacity-100
                   disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-md disabled:hover:bg-background/60
                   focus:outline-none focus:ring-2 focus:ring-primary/50`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><title>Scroll Left</title><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={handleScrollRight}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-20
                   w-9 h-9 rounded-full flex items-center justify-center
                   bg-background/60 dark:bg-surface/60 backdrop-blur-sm
                   border border-white/20 dark:border-black/20
                   text-text-color/80 hover:text-text-color
                   shadow-md hover:shadow-lg
                   transition-all duration-300 ease-in-out
                   opacity-0 group-hover/section:opacity-100
                   disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-md disabled:hover:bg-background/60
                   focus:outline-none focus:ring-2 focus:ring-primary/50`}
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><title>Scroll Right</title><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Video List Container */}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto space-x-4 sm:space-x-5 px-4 sm:px-6 lg:px-8 pb-4
                   scrollbar-hide snap-x snap-mandatory
                   ${isDragging ? 'cursor-grabbing scale-[1.01]' : 'cursor-grab'}
                   transition-transform duration-200 ease-out
                   `}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        // onMouseUp/Leave handled by window listener effect
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDragging} // Use common stop function
        onTouchCancel={stopDragging} // Handle cancel events too
      >
        {videos.map((video, index) => (
          <Link
            key={video.id}
            href={`/video/${video.id}?index=${index}`}
            className="block w-44 sm:w-48 md:w-52 lg:w-56 // Responsive card width (adjust!)
                       flex-shrink-0 group snap-center // Group for hover effects, snap alignment
                       rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" // Focus ring
            aria-label={`Watch video: ${video.title}`} // Accessibility label
          >
            {/* Thumbnail Container - Clipping Mask */}
            <div className="relative w-full aspect-[9/16] // *** ADJUST ASPECT RATIO IF NEEDED (e.g., aspect-video) ***
                           rounded-xl overflow-hidden // <<<<< KEEP overflow-hidden
                           bg-surface // Background color while loading image
                           shadow-md group-hover:shadow-xl // Hover shadow
                           transition-shadow duration-300 ease-in-out" // <<<<< Transition only shadow here
                           // <<<<< REMOVED transform and scale from this div
            >
              <Image
                src={video.thumbnailPath || "/assets/images/default-thumbnail.png"}
                alt={video.title} // IMPORTANT for accessibility
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" // Adjust sizes
                className="object-cover // Keep object-cover
                           transition-transform duration-300 ease-in-out // <<<<< ADD transition here
                           group-hover:scale-[1.04]" // <<<<< MOVED scale here
              />
              {/* Tag Overlay - Solid Background Style */}
              <div className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 z-10 // Ensure overlay is above image
                             bg-black/60 // Solid semi-transparent background
                             " // Removed rounding here, container handles it
                   aria-hidden="true"
              >
                <p className="text-white text-[11px] font-medium truncate"
                   title={video.tagList?.join(", ")} // Full list on hover
                >
                  {convertTagListIntoString(video.tagList)}
                </p>
              </div>
            </div>
            {/* Title Removed */}
          </Link>
        ))}
        {/* Optional: Spacer at the end for better snapping */}
         <div className="flex-shrink-0 w-1 snap-center" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default VideoCards;

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