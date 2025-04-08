"use client";

import React, { useEffect, useState } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import SearchBar from "@/components/home/SearchBar";
import CategorySection from "@/components/home/CategorySection";
import VideoCards from "@/components/home/VideoCards";
import RecommendedExperts from "@/components/home/RecommendedExperts";
import TopRatedExperts from "@/components/home/TopRatedExperts";
import { fetchHomeScreenData } from "@/services/api/home/homeService";
import { FEATURED_EXPERT } from "@/constants/assets/imageConstants"; // Import the featured expert icon
import { HomeScreenModel, ExpertList, TopRatedExpert, WideRangeOfExpert, TrendingVideo } from "@/app/types/homescreenModel"; // Import HomeScreenModel

interface Category {
  id: string;
  specializationName: string;
  specializationImage?: string;
}

interface Video {
  id: string;
  thumbnailPath: string;
  tagList: string[];
  title: string;
}

interface Expert {
  id: string;
  fullName: string;
  specialization: string;
  profilePicture: string;
  sessionRate: number;
  rating: number;
}

export default function HomePage() {
  const [banners, setBanners] = useState<HomeScreenModel["body"]["data"]["banners"]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [recommendedExperts, setRecommendedExperts] = useState<Expert[]>([]);
  const [topRatedExperts, setTopRatedExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeScreenData = async () => {
      try {
        const data: HomeScreenModel = await fetchHomeScreenData();

        // Log the raw API response to the console
        console.log("API Full Response:", data);

        if (!data?.body?.data) {
          throw new Error("Invalid API response structure");
        }

        // Map API data to match expected structure
        const formattedCategories = data.body.data.wide_range_of_experts.map((expert) => ({
          id: expert.id || "unknown",
          specializationName: expert.specialization_name || "Unknown",
          specializationImage: expert.specialization_image || "/default-category.png",
        }));

        const formattedVideos = data.body.data.trending_videos.map((video) => ({
          id: video.id || "unknown",
          thumbnailPath: video.thumbnail_path || "",
          tagList: video.tag_list || [],
          title: video.video_title || "Untitled",
        }));

        const formattedRecommendedExperts = data.body.data.recommended_for_you.map((expert) => ({
          id: expert.id || "unknown",
          fullName: expert.full_name || "Unknown",
          specialization: expert.specialization || "Unknown",
          profilePicture: expert.profile_picture || "/assets/images/default-avatar.png",
          sessionRate: expert.session_rate || 0,
          rating: expert.rating || 0,
        }));

        const formattedTopRatedExperts = data.body.data.top_rated_experts.map((expert) => ({
          id: expert.id || "unknown",
          fullName: expert.full_name || "Unknown",
          specialization: expert.specialization || "Unknown",
          profilePicture: expert.profile_picture || "/assets/images/default-avatar.png",
          sessionRate: expert.session_rate || 0,
          rating: expert.rating || 0,
        }));

        setCategories(formattedCategories);
        setBanners(data.body.data.banners || []);
        setVideos(formattedVideos);
        setRecommendedExperts(formattedRecommendedExperts);
        setTopRatedExperts(formattedTopRatedExperts);
        setError(null);
      } catch (err) {
        console.error("Error fetching home screen data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeScreenData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner banners={banners} />

      {/* Search Bar */}
      <div className="mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>

      {/* Category Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
        <CategorySection categories={categories} />
      </div>

      {/* Video Cards Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
        <VideoCards videos={videos} />
      </div>

      {/* Recommended Experts Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
        <RecommendedExperts
          experts={recommendedExperts}
          title="Recommended Experts"
          icon={FEATURED_EXPERT}
        />
      </div>

      {/* Top Rated Experts Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
        <TopRatedExperts
          experts={topRatedExperts}
          title="Top Rated Experts"
          icon={FEATURED_EXPERT}
        />
      </div>
    </div>
  );
}