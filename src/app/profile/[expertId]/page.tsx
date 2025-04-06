"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProfileHeader } from "../componets/ProfileHeader";
import ProfileTabs from "../componets/ProfileTabs";
import ShareModal from "../componets/SharedModel";
import ExpertReviews from "../componets/ExpertReviews";
import { useTheme } from "@/context/ThemeConfig";
import { getExpertProfile, getExpertReviews } from "@/services/api/expert/expertService";

interface ExpertProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio?: string;
  followers: number;
  following: number;
  joinedAt: string;
  isExpert: boolean;
  specialization?: string;
  sessionRate?: number;
  rating?: number;
  appointments?: number;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ExpertProfilePage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [expert, setExpert] = useState<ExpertProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        setIsLoading(true);
        const [expertData, reviewsData] = await Promise.all([
          getExpertProfile(params.expertId as string),
          getExpertReviews(params.expertId as string),
        ]);
        setExpert(expertData);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to load expert profile");
        console.error("Error fetching expert data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.expertId) {
      fetchExpertData();
    }
  }, [params.expertId]);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || "Expert not found"}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Profile Header */}
      <ProfileHeader
        username={expert.username}
        firstName={expert.firstName}
        lastName={expert.lastName}
        profilePicture={expert.profilePicture}
        bio={expert.bio || ""}
        followers={expert.followers}
        following={expert.following}
        joinedAt={expert.joinedAt}
        isExpert={true}
        onShareClick={handleShareClick}
      />

      {/* Expert Stats */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{expert.rating?.toFixed(1) || "N/A"}</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{expert.appointments || 0}</div>
              <div className="text-sm text-gray-500">Appointments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">₹{expert.sessionRate?.toLocaleString() || "N/A"}</div>
              <div className="text-sm text-gray-500">Session Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange("appointments")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "appointments"
                ? "bg-blue-500 text-white"
                : isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => handleTabChange("reviews")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "reviews"
                ? "bg-blue-500 text-white"
                : isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reviews
          </button>
        </div>

        {activeTab === "appointments" ? (
          <ProfileTabs />
        ) : (
          <ExpertReviews reviews={reviews} />
        )}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
}
