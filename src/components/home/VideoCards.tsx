"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IC_VIDEO } from "@/constants/imageConstants"; // Import the video icon constant

interface Video {
  id: string;
  thumbnailPath: string;
  tagList: string[];
  title: string;
}

interface VideoCardsProps {
  videos: Video[];
}

const VideoCards: React.FC<VideoCardsProps> = ({ videos }) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleVideoClick = (videoId: string, initialIndex: number) => {
    router.push(`/video/${videoId}?index=${initialIndex}`);
  };

  const convertTagListIntoString = (tags: string[]) => {
    return tags.length > 0 ? tags.join(", ") : "No tags available";
  };

  // Scroll left button handler
  const handleScrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" }); // Reduced scroll speed
    }
  };

  // Scroll right button handler
  const handleScrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" }); // Reduced scroll speed
    }
  };

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      isDragging = true;
      startX = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault(); // Prevent text selection while dragging
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX; // Calculate the distance moved
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseLeave = () => {
    isDragging = false; // Stop dragging if the mouse leaves the container
  };

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      isDragging = true;
      startX = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  return (
    <div className="my-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Videos</h2>
          <Image src={IC_VIDEO} alt="Videos" width={20} height={20} /> {/* Use the imported constant */}
        </div>
        <button
          onClick={() => router.push("/video-feed")}
          className="text-blue-500 hover:underline text-sm"
        >
          View more
        </button>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={handleScrollLeft} // Renamed to handleScrollLeft
        aria-label="Scroll left" // Accessibility improvement
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        &#8592; {/* Left Arrow */}
      </button>
      <button
        onClick={handleScrollRight} // Renamed to handleScrollRight
        aria-label="Scroll right" // Accessibility improvement
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        &#8594; {/* Right Arrow */}
      </button>

      {/* Video List - Horizontal Scrollable Grid */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden space-x-6 px-4 cursor-grab"
        onMouseDown={handleMouseDown} // Mouse drag support
        onMouseMove={handleMouseMove} // Mouse drag support
        onMouseUp={handleMouseUp} // Mouse drag support
        onMouseLeave={handleMouseLeave} // Stop dragging when mouse leaves
        onTouchStart={handleTouchStart} // Touch support
        onTouchMove={handleTouchMove} // Touch support
        onTouchEnd={handleTouchEnd} // Touch support
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="cursor-pointer w-[200px] md:w-[220px] lg:w-[240px] flex-shrink-0"
            onClick={() => handleVideoClick(video.id, index)}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-md">
              <Image
                src={video.thumbnailPath || "/assets/images/default-thumbnail.png"} // Fallback for missing thumbnails
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              {/* Text Positioned on the Bottom Left */}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {convertTagListIntoString(video.tagList)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;