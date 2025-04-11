"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// Import custom Swiper styles if you create a separate CSS module
import '../../styles/components/HeroBanner.css'; // Fixed case in filename

import Image from "next/image";

interface Banner {
  id: string;
  title: string;
  image: string;
  type: string; // Assuming type might be used later (e.g., for links)
}

interface HeroBannerProps {
  banners: Banner[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    // Use standard Tailwind spacing, add class for custom CSS targeting
    <div className="relative w-full mt-5 hero-banner-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true} // Keep looping enabled
        autoplay={{
          delay: 2500, // Slightly longer delay? Adjust as needed
          disableOnInteraction: false, // Keeps playing after user interaction
        }}
        pagination={{ clickable: true }} // Standard clickable pagination
        watchSlidesProgress={true} // Needed for potential custom effects (like scaling)
        className="!pb-10" // Add padding-bottom to make space for pagination (adjust value if needed)
        aria-label="Promotional Banners" // Accessibility: Label for the slider region
        // --- Responsive Breakpoints ---
        breakpoints={{
          // Base (mobile-first)
          0: {
            slidesPerView: 1, // Full slide on smallest screens
            spaceBetween: 10,
            centeredSlides: false, // Not needed for 1 slide
          },
          // Small screens (e.g., >= 640px)
          640: {
            slidesPerView: 1.2, // Show a peek of the next slide
            spaceBetween: 15,
            centeredSlides: true, // Center the active slide
          },
          // Medium screens (e.g., >= 768px)
          768: {
            slidesPerView: 1.3, // Show a bit more
            spaceBetween: 20,
            centeredSlides: true,
          },
          // Large screens (e.g., >= 1024px)
          1024: {
            slidesPerView: 1.5, // Show more as screen grows
            spaceBetween: 25,
            centeredSlides: true,
          },
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide
            key={banner.id}
            role="group" // Accessibility: Role for slide group
            aria-label={`Banner ${index + 1}: ${banner.title}`} // Accessibility: Label each slide
            className="transition-transform duration-300 ease-in-out" // Add transition for potential scale effect
            // Optional: Scale down non-active slides
            // style={{
            //   transform: slide.isActive ? 'scale(1)' : 'scale(0.95)', // Example scaling effect
            //   opacity: slide.isActive ? 1 : 0.8, // Example opacity effect
            // }}
          >
            {({ isActive }) => ( // Get active state for potential styling
              // --- Responsive Height & Styling ---
              <div
                className={`relative w-full overflow-hidden shadow-lg rounded-2xl md:rounded-3xl 
                           h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 
                           transition-transform duration-300 ease-in-out ${isActive ? 'scale-100' : 'scale-95 opacity-80 md:opacity-100'}`} // Responsive height, rounded corners, scale/opacity effect
              >
                <Image
                  src={banner.image}
                  alt={banner.title} // Use banner title for alt text
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw" // Help Next.js optimize image sizes
                  className="object-cover" // Removed rounded here, applied to parent div
                  // Try removing unoptimized first. Add back ONLY if necessary.
                  // unoptimized
                  priority={index === 0} // Prioritize first image load
                />
                {/* Optional: Add an overlay for text contrast later */}
                {/* <div className="absolute inset-0 bg-black/10 rounded-2xl md:rounded-3xl"></div> */}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;