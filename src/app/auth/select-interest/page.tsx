"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/ui/buttons/TextButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fetchAllInterests, addUserInterests } from "@/services/api/user/interestService";
import { AxiosError } from "axios";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeConfig";

interface Interest {
  id: string;
  name: string;
  interest_icon: string;
}

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export default function SelectInterestPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const router = useRouter();
  const minSelection = 5;
  const { themeColors } = useTheme();

  // Fetch interests from the API
  useEffect(() => {
    const loadInterests = async () => {
      try {
        const response = await fetchAllInterests();
        console.log("Interests API Response:", response);
        
        // Handle different possible response structures
        let interestsData: Interest[] = [];
        
        if (Array.isArray(response)) {
          // Direct array response
          interestsData = response;
        } else if (response && typeof response === 'object') {
          if (Array.isArray(response.data)) {
            // Response with data property containing array
            interestsData = response.data;
          } else if (response.body && Array.isArray(response.body.data)) {
            // Nested response structure
            interestsData = response.body.data;
          }
        }
        
        if (interestsData.length > 0) {
          setInterests(interestsData);
        } else {
          throw new Error("No interests data found in the response");
        }
      } catch (error) {
        console.error("Error loading interests:", error);
        setErrorDetails(JSON.stringify(error instanceof AxiosError ? error.response?.data : error));
        if (error instanceof AxiosError && error.response?.status === 401) {
          setErrorMessage("Session expired. Please log in again.");
        } else {
          setErrorMessage("Failed to load interests. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadInterests();
  }, []);

  // Toggle interest selection
  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((interestId) => interestId !== id);
      } else if (prev.length < minSelection) {
        return [...prev, id];
      } else {
        alert(`You can choose up to ${minSelection} interests.`);
        return prev;
      }
    });
  };

  // Handle continue button click
  const handleContinue = async () => {
    if (selectedInterests.length < minSelection) {
      alert(`Please select at least ${minSelection} interests.`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setErrorDetails(null);
    try {
      await addUserInterests(selectedInterests);
      router.push("/");
    } catch (error) {
      console.error("Error saving interests:", error);
      setErrorDetails(JSON.stringify(error instanceof AxiosError ? error.response?.data : error));
      if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
      } else {
        setErrorMessage("Failed to save interests. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image failed to load:", e.currentTarget.src);
    e.currentTarget.src = "/images/fallback-icon.png"; // Fallback image
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Select Your Interests
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Choose up to {minSelection} interests to personalize your experience.
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm mb-4">
            {errorMessage}
          </div>
        )}

        {/* Debugging Error Details */}
        {errorDetails && (
          <div className="text-gray-500 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-auto max-h-32">
            <strong>Error Details:</strong>
            <pre>{errorDetails}</pre>
          </div>
        )}

        {/* Interests Section */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <div
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-transparent border-gray-300 text-gray-800 dark:text-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src={interest.interest_icon}
                      alt={interest.name}
                      className="w-6 h-6 object-contain"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium">{interest.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Selection Counter */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {selectedInterests.length} of {minSelection} interests selected
        </div>

        {/* Continue Button */}
        <div className="mt-6">
          <TextButton
            text={isSubmitting ? "Saving..." : "Continue"}
            onClick={handleContinue}
            textColor="white"
            backgroundColor={selectedInterests.length >= minSelection ? themeColors.primaryColor : "blue-400"}
            borderColor="transparent"
            className={`w-full py-3 font-semibold ${
              selectedInterests.length < minSelection || isSubmitting
                ? "cursor-not-allowed opacity-70"
                : ""
            }`}
            disabled={selectedInterests.length < minSelection || isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}