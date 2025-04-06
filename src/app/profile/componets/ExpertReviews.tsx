"use client";

import React from "react";
import { useTheme } from "@/context/ThemeConfig";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ExpertReviewsProps {
  reviews: Review[];
}

const ExpertReviews: React.FC<ExpertReviewsProps> = ({ reviews }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className={`p-6 rounded-lg shadow-sm ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={review.userProfilePicture || "/images/default-avatar.svg"}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{review.userName}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {review.comment}
              </p>
              <p className={`mt-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
      {reviews.length === 0 && (
        <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          No reviews yet
        </div>
      )}
    </div>
  );
};

export default ExpertReviews; 