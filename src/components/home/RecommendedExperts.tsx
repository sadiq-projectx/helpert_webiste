"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FEATURED_EXPERT, USER_DEFAULT } from "@/constants/imageConstants"; // Import constants

interface Expert {
  id: string;
  fullName: string;
  specialization: string;
  profilePicture: string;
  sessionRate: number;
  rating: number;
}

interface RecommendedExpertsProps {
  experts: Expert[];
  title: string;
  icon?: string; // Optional icon prop
}

const RecommendedExperts: React.FC<RecommendedExpertsProps> = ({
  experts,
  title,
  icon = FEATURED_EXPERT, // Default to FEATURED_EXPERT if no icon is provided
}) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleExpertClick = (expertId: string) => {
    router.push(`/expert/${expertId}`);
  };

  // Scroll left button handler
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll right button handler
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="my-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <div className="relative w-6 h-6">
            <Image
              src={icon}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain" // Use object-contain to maintain aspect ratio
            />
          </div>
        </div>
        <button
          onClick={() => router.push("/search")}
          className="text-blue-500 hover:underline text-sm"
        >
          View more
        </button>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        &#8592; {/* Left Arrow */}
      </button>
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        &#8594; {/* Right Arrow */}
      </button>

      {/* Experts List */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden gap-4 px-4"
      >
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="flex-shrink-0 w-60 bg-secondary rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => handleExpertClick(expert.id)}
          >
            {/* Profile Picture */}
            <div className="relative w-full h-48">
              <Image
                src={
                  expert.profilePicture.startsWith("http")
                    ? expert.profilePicture
                    : USER_DEFAULT // Use fallback if URL is invalid
                }
                alt={expert.fullName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Expert Details */}
            <div className="p-4">
              <h3 className="text-sm font-semibold truncate text-primary">
                {expert.fullName}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {expert.specialization}
              </p>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                <span>⭐</span>
                <span>{expert.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm font-medium text-blue-600 mt-2">
                ₹{expert.sessionRate.toLocaleString()} / session
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedExperts;