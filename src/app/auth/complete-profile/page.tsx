"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput"; // Reusable TextInput component
import TextButton from "@/components/ui/buttons/TextButton"; // Reusable TextButton component
import DatePicker from "@/components/ui/DatePicker"; // Reusable DatePicker component
import { completeUserProfile } from "@/services/api/user/profileService"; // Import the complete profile service
import { AxiosError } from "axios"; // Import AxiosError for better error handling

// Define a type for the error response
interface ErrorResponse {
  message?: string; // Optional because it may not always exist
  [key: string]: any; // Allow additional properties
}

export default function CompleteProfilePage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // New field for profile picture
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    setIsFormValid(
      username.trim() !== "" &&
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        dob.trim() !== "" &&
        mobile.trim().length === 10 &&
        isValidUrl(profilePicture.trim()) // Ensure profile picture is a valid URL
    );
  };

  // Handle form submission
  const handleCompleteProfile = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Call the complete profile API
      const response = await completeUserProfile({
        username,
        firstName,
        lastName,
        dob,
        mobile,
        profilePicture,
      });
      console.log("Profile completed successfully:", response);

      // Navigate to the next screen
      router.push("/auth/select-interest");
    } catch (error: any) {
      // Cast 'error' to 'AxiosError<ErrorResponse>'
      const err = error as AxiosError<ErrorResponse>;

      console.error("Complete profile error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to complete profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Complete Profile Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Complete Your Profile
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Tell us a bit about yourself. Don’t worry, your account is secure with us.
        </p>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCompleteProfile();
          }}
          className="space-y-4"
        >
          {/* Username Input */}
          <TextInput
            id="username"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateForm();
            }}
            placeholder="Username"
            maxLength={12}
            required
          />

          {/* First Name Input */}
          <TextInput
            id="first-name"
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateForm();
            }}
            placeholder="First Name"
            maxLength={12}
            required
          />

          {/* Last Name Input */}
          <TextInput
            id="last-name"
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateForm();
            }}
            placeholder="Last Name"
            maxLength={12}
            required
          />

          {/* Mobile Number Input */}
          <TextInput
            id="mobile"
            label="Mobile Number"
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              validateForm();
            }}
            placeholder="Mobile Number"
            maxLength={10}
            required
          />

          {/* Date of Birth Input */}
          <DatePicker
            id="dob"
            label="When is your birthday?"
            value={dob}
            onChange={(date) => {
              setDob(date);
              validateForm();
            }}
            placeholder="Birthday"
            required
          />

          {/* Profile Picture Input */}
          <TextInput
            id="profile-picture"
            label="Profile Picture URL"
            value={profilePicture}
            onChange={(e) => {
              setProfilePicture(e.target.value);
              validateForm();
            }}
            placeholder="Profile Picture URL"
            required
          />

          {/* Submit Button */}
          <TextButton
            text={isLoading ? "Submitting..." : "Next"}
            onClick={handleCompleteProfile}
            textColor="white"
            backgroundColor={isFormValid ? "#3b82f6" : "#93c5fd"}
            borderColor="transparent"
            className={`w-full py-3 font-semibold ${
              isLoading ? "cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={!isFormValid || isLoading}
          />
        </form>
      </div>
    </div>
  );
}