"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Removed Navigation module
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Banner {
  id: string;
  title: string;
  image: string;
  type: string;
}

interface HeroBannerProps {
  banners: Banner[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null; // Return nothing if there are no banners
  }

  return (
    <div className="relative w-full mt-[20px]"> {/* Adjusted margin to place banner below navbar */}
      <Swiper
        modules={[Autoplay, Pagination]} // Removed Navigation module
        spaceBetween={20} // Space between slides
        slidesPerView={1.5} // Show 80% of the current card
        loop={true} // Enable infinite loop
        autoplay={{
          delay: 3000, // Auto scroll every 3 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }} // Enable pagination dots
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-md"> {/* Increased height to h-64 (16rem) */}
              <Image
                src={banner.image}
                alt={banner.title}
                fill // Replaces layout="fill"
                className="rounded-3xl object-cover" // CSS class for object fitting
                unoptimized // Fix image not showing issue
                priority={index === 0} // Add priority to the first image
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;