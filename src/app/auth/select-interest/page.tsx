"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/ui/buttons/TextButton"; // Reusable TextButton component
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // Reusable LoadingSpinner component
import { fetchAllInterests, addUserInterests } from "@/services/api/user/interestService";

interface Interest {
  id: string;
  name: string;
  interestIcon: string;
}

export default function SelectInterestPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For displaying error messages
  const [errorDetails, setErrorDetails] = useState<string | null>(null); // For debugging error details
  const router = useRouter();
  const minSelection = 5;

  // Fetch interests from the API
  useEffect(() => {
    const loadInterests = async () => {
      try {
        const data = await fetchAllInterests();
        console.log("Interests API Response:", data); // Log the response
        if (Array.isArray(data)) {
          setInterests(data);
        } else {
          throw new Error("Invalid response format: Expected an array");
        }
      } catch (error: any) {
        console.error("Error loading interests:", error);
        setErrorDetails(JSON.stringify(error.response?.data || error.message)); // Log error details
        if (error.response?.status === 401) {
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

    setIsLoading(true);
    setErrorMessage(null); // Clear any previous error messages
    setErrorDetails(null); // Clear any previous error details
    try {
      await addUserInterests(selectedInterests);
      router.push("/dashboard"); // Navigate to the dashboard
    } catch (error: any) {
      console.error("Error saving interests:", error);
      setErrorDetails(JSON.stringify(error.response?.data || error.message)); // Log error details
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
      } else {
        setErrorMessage("Failed to save interests. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Debugging Error Details */}
        {errorDetails && (
          <div className="text-gray-500 text-xs bg-gray-100 p-2 rounded mb-4 overflow-auto max-h-32">
            <strong>Error Details:</strong>
            <pre>{errorDetails}</pre>
          </div>
        )}

        {/* Interests Section */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <div
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center space-x-2 ${
                    isSelected
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-transparent border-gray-300 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <img
                    src={interest.interestIcon}
                    alt={interest.name}
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.png"; // Replace with fallback image
                    }}
                  />
                  <span className="text-sm font-medium">{interest.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6">
          <TextButton
            text="Continue"
            onClick={handleContinue}
            textColor="white"
            backgroundColor={
              selectedInterests.length >= minSelection ? "#3b82f6" : "#93c5fd"
            }
            borderColor="transparent"
            className={`w-full py-3 font-semibold ${
              selectedInterests.length < minSelection
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-blue-600"
            }`}
            disabled={selectedInterests.length < minSelection}
          />
        </div>
      </div>
    </div>
  );
}