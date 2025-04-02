"use client";

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import VideoCards from "@/components/home/VideoCards";
import TopExperts from "@/components/home/TopExperts";
import RecommendedExperts from "@/components/home/RecommendedExperts";
import SearchBar from "@/components/home/SearchBar";

export default function HomePage() {
  // Mock data for testing UI
  const homeData = {
    banners: [
      { image: "https://via.placeholder.com/1200x400?text=Banner+1" },
      { image: "https://via.placeholder.com/1200x400?text=Banner+2" },
      { image: "https://via.placeholder.com/1200x400?text=Banner+3" },
    ],
    wideRangeOfExperts: [
      {
        specializationName: "Yoga",
        specializationImage: "https://via.placeholder.com/100?text=Yoga",
      },
      {
        specializationName: "Astrology",
        specializationImage: "https://via.placeholder.com/100?text=Astrology",
      },
      {
        specializationName: "Fitness",
        specializationImage: "https://via.placeholder.com/100?text=Fitness",
      },
    ],
    trendingVideos: [
      {
        id: "1",
        thumbnailPath: "https://via.placeholder.com/200x150?text=Video+1",
        tagList: ["Yoga", "Health"],
        title: "Yoga for Beginners",
      },
      {
        id: "2",
        thumbnailPath: "https://via.placeholder.com/200x150?text=Video+2",
        tagList: ["Fitness", "Workout"],
        title: "10-Minute Workout",
      },
    ],
    topRatedExperts: [
      {
        id: "1",
        fullName: "John Doe",
        specialization: "Astrology",
        profilePicture: "https://via.placeholder.com/150?text=John",
        sessionRate: 500,
        rating: 4.8,
      },
      {
        id: "2",
        fullName: "Jane Smith",
        specialization: "Yoga",
        profilePicture: "https://via.placeholder.com/150?text=Jane",
        sessionRate: 700,
        rating: 4.9,
      },
    ],
    recommendedForYou: [
      {
        id: "3",
        fullName: "Alice Johnson",
        specialization: "Psychology",
        profilePicture: "https://via.placeholder.com/150?text=Alice",
        sessionRate: 600,
        rating: 4.7,
      },
      {
        id: "4",
        fullName: "Bob Brown",
        specialization: "Fitness",
        profilePicture: "https://via.placeholder.com/150?text=Bob",
        sessionRate: 800,
        rating: 4.6,
      },
    ],
  };

  return (
    <div>
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <HeroBanner banners={homeData.banners} />

        {/* Search Bar */}
        <SearchBar />

        {/* Categories Section */}
        <CategorySection categories={homeData.wideRangeOfExperts} />

        {/* Video Cards Section */}
        <VideoCards videos={homeData.trendingVideos} />

        {/* Top Experts Section */}
        <TopExperts
          title="Featured Experts"
          experts={homeData.topRatedExperts}
          icon="/images/featured.png"
        />

        {/* Recommended Experts Section */}
        <RecommendedExperts
          title="Recommended Experts"
          experts={homeData.recommendedForYou}
          icon="/images/recommended.png"
        />
      </div>

      {/* Floating Chat Button */}
      
    </div>
  );
}