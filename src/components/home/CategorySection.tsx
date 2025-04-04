"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Category {
  id: string;
  specializationName: string;
  specializationImage?: string; // Optional to handle missing images
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth) {
        scrollAmount = 0; // Reset scroll
      }
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation); // Cleanup on unmount
  }, []);

  if (!categories.length) {
    return (
      <div className="flex items-center justify-center h-40 text-center text-gray-500 dark:text-gray-400">
        No categories available.
      </div>
    );
  }

  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/${encodeURIComponent(category.specializationName)}`);
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
    <div className="my-12 relative">
      <h2 className="text-2xl font-extrabold text-text-color px-4 sm:px-6 lg:px-8 mb-8">
        Explore Categories
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 border border-gray-300 hover:border-gray-500 text-gray-500 hover:text-gray-700 rounded-full p-3 shadow-sm flex items-center justify-center"
      >
        <i className="fas fa-angle-left"></i> {/* Font Awesome Left Arrow */}
      </button>
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 border border-gray-300 hover:border-gray-500 text-gray-500 hover:text-gray-700 rounded-full p-3 shadow-sm flex items-center justify-center"
      >
        <i className="fas fa-angle-right"></i> {/* Font Awesome Right Arrow */}
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden space-x-6 px-4 sm:space-x-8 sm:px-6 lg:px-8"
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="flex flex-col items-center transition-transform transform hover:scale-110" // Scale the entire container on hover
          >
            {/* Circular Avatar */}
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-background-secondary flex items-center justify-center cursor-pointer shadow-lg overflow-hidden transition-transform transform"
              onClick={() => handleCategoryClick(category)}
            >
              <Image
                src={category.specializationImage || "/default-category.png"} // Fallback image
                alt={category.specializationName}
                width={160}
                height={160}
                className="rounded-full object-cover"
                priority={index === 0} // Add priority to the first image (above the fold)
              />
            </div>

            {/* Category Name */}
            <p
              className="mt-4 text-base sm:text-lg font-medium text-text-color text-center truncate w-36 sm:w-40"
              title={category.specializationName} // Tooltip for full name
            >
              {category.specializationName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;