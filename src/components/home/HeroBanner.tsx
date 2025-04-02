import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import styles from "@/styles/HeroBanner.module.css";

interface Banner {
  image: string;
}

interface HeroBannerProps {
  banners: Banner[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null; // Return nothing if there are no banners
  }

  return (
    <div className={styles.heroBanner}>
      <Swiper
        spaceBetween={20} // Space between slides
        slidesPerView={1.2} // Show 80% of the current card
        loop={true} // Enable infinite loop
        autoplay={{
          delay: 3000, // Auto scroll every 3 seconds
          disableOnInteraction: false,
        }}
        navigation={true} // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className={styles.bannerContainer}>
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                layout="fill"
                objectFit="cover" // Ensure the image fills the container
                className={styles.bannerImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;