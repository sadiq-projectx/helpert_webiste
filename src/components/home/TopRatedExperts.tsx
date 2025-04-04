"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { USER_DEFAULT, IC_VERIFIED } from "@/constants/imageConstants"; // Import constants

interface Expert {
  id: string;
  fullName: string;
  specialization: string;
  profilePicture: string;
  sessionRate: number;
  rating: number;
}

interface TopRatedExpertsProps {
  experts: Expert[];
  title: string;
  icon: string;
}

const TopRatedExperts: React.FC<TopRatedExpertsProps> = ({ experts, title, icon }) => {
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
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Image
            src={icon}
            alt={title}
            width={22}
            height={20}
            style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
          />
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
        className="flex overflow-x-auto gap-4 px-4 sm:px-6 lg:px-8 scrollbar-hide"
      >
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64 cursor-pointer"
            onClick={() => handleExpertClick(expert.id)}
          >
            {/* Expert Card */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {/* Profile Picture */}
              <Image
                src={
                  expert.profilePicture?.startsWith("http")
                    ? expert.profilePicture
                    : USER_DEFAULT // Use fallback if URL is invalid
                }
                alt={expert.fullName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Expert Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3
                  className="text-sm font-semibold truncate"
                  title={expert.fullName} // Tooltip for full name
                >
                  {expert.fullName}
                </h3>
                <div className="flex items-center gap-1 text-xs">
                  <span>{expert.specialization}</span>
                  <Image src={IC_VERIFIED} alt="Verified" width={14} height={14} />
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                  <span>⭐</span>
                  <span>{expert.rating.toFixed(1)}</span>
                </div>
                <div className="text-sm font-medium text-blue-400 mt-1">
                  ₹{expert.sessionRate.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedExperts;