"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput"; // Reusable TextInput component
import TextButton from "@/components/ui/buttons/TextButton"; // Reusable TextButton component
import DatePicker from "@/components/ui/DatePicker"; // Reusable DatePicker component
import { completeUserProfile } from "@/services/api/user/profileService"; // Import the complete profile service
import { AxiosError } from "axios"; // Import AxiosError for better error handling
import {
  validateUsername,
  validateFirstName,
  validateLastName,
  validateMobileNumber,
  validateBirthdate,
} from "@/utils/validators";
import { useTheme } from "@/contexts/ThemeConfig";

// Define a type for the error response
interface ErrorResponse {
  message?: string; // Optional because it may not always exist
  [key: string]: any; // Allow additional properties
}

interface ValidationErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  mobile?: string;
  profilePicture?: string;
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    username: false,
    firstName: false,
    lastName: false,
    dob: false,
    mobile: false,
    profilePicture: false,
  });
  const router = useRouter();
  const { themeColors } = useTheme();

  // Calculate default date (13 years ago)
  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 13;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Set default date on component mount
  useEffect(() => {
    if (!dob) {
      setDob(getDefaultDate());
    }
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors: ValidationErrors = {};
    
    // Only validate fields that have been touched
    if (touched.username) {
      errors.username = validateUsername(username);
    }
    
    if (touched.firstName) {
      errors.firstName = validateFirstName(firstName);
    }
    
    if (touched.lastName) {
      errors.lastName = validateLastName(lastName);
    }
    
    if (touched.dob) {
      errors.dob = validateBirthdate(dob);
    }
    
    if (touched.mobile) {
      errors.mobile = validateMobileNumber(mobile);
    }
    
    if (touched.profilePicture) {
      // Validate profile picture URL
      if (!profilePicture) {
        errors.profilePicture = "Please enter a profile picture URL.";
      } else {
        try {
          new URL(profilePicture);
        } catch (e) {
          errors.profilePicture = "Please enter a valid URL for your profile picture.";
        }
      }
    }

    setValidationErrors(errors);
    
    // Form is valid if all fields are valid and not empty
    const isUsernameValid = !errors.username && username.length > 0;
    const isFirstNameValid = !errors.firstName && firstName.length > 0;
    const isLastNameValid = !errors.lastName && lastName.length > 0;
    const isDobValid = !errors.dob && dob.length > 0;
    const isMobileValid = !errors.mobile && mobile.length > 0;
    const isProfilePictureValid = !errors.profilePicture && profilePicture.length > 0;
    
    setIsFormValid(
      isUsernameValid && 
      isFirstNameValid && 
      isLastNameValid && 
      isDobValid && 
      isMobileValid && 
      isProfilePictureValid
    );
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    validateForm();
  }, [username, firstName, lastName, dob, mobile, profilePicture, touched]);

  // Handle form submission
  const handleCompleteProfile = async () => {
    // Mark all fields as touched when submitting
    setTouched({
      username: true,
      firstName: true,
      lastName: true,
      dob: true,
      mobile: true,
      profilePicture: true,
    });
    
    // Validate all fields
    const errors: ValidationErrors = {};
    errors.username = validateUsername(username);
    errors.firstName = validateFirstName(firstName);
    errors.lastName = validateLastName(lastName);
    errors.dob = validateBirthdate(dob);
    errors.mobile = validateMobileNumber(mobile);
    
    // Validate profile picture URL
    if (!profilePicture) {
      errors.profilePicture = "Please enter a profile picture URL.";
    } else {
      try {
        new URL(profilePicture);
      } catch (e) {
        errors.profilePicture = "Please enter a valid URL for your profile picture.";
      }
    }
    
    setValidationErrors(errors);
    
    // Check if form is valid
    const isUsernameValid = !errors.username && username.length > 0;
    const isFirstNameValid = !errors.firstName && firstName.length > 0;
    const isLastNameValid = !errors.lastName && lastName.length > 0;
    const isDobValid = !errors.dob && dob.length > 0;
    const isMobileValid = !errors.mobile && mobile.length > 0;
    const isProfilePictureValid = !errors.profilePicture && profilePicture.length > 0;
    
    const isFormValid = 
      isUsernameValid && 
      isFirstNameValid && 
      isLastNameValid && 
      isDobValid && 
      isMobileValid && 
      isProfilePictureValid;
    
    setIsFormValid(isFormValid);
    
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await completeUserProfile({
        username,
        firstName,
        lastName,
        dob,
        mobile,
        profilePicture,
      });
      console.log("Profile completed successfully:", response);
      router.push("/auth/select-interest");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error("Complete profile error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to complete profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {/* Complete Profile Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Complete Your Profile
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Tell us a bit about yourself. Don't worry, your account is secure with us.
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
              // Remove spaces from username
              setUsername(e.target.value.replace(/\s/g, ''));
            }}
            onBlur={() => handleBlur("username")}
            placeholder="Username"
            maxLength={15}
            error={validationErrors.username}
            required
          />

          {/* First Name Input */}
          <TextInput
            id="first-name"
            label="First Name"
            value={firstName}
            onChange={(e) => {
              // Remove spaces and capitalize first letter
              const value = e.target.value.replace(/\s/g, '');
              if (value.length > 0) {
                setFirstName(value.charAt(0).toUpperCase() + value.slice(1));
              } else {
                setFirstName(value);
              }
            }}
            onBlur={() => handleBlur("firstName")}
            placeholder="First Name"
            error={validationErrors.firstName}
            required
          />

          {/* Last Name Input */}
          <TextInput
            id="last-name"
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              // Remove spaces and capitalize first letter
              const value = e.target.value.replace(/\s/g, '');
              if (value.length > 0) {
                setLastName(value.charAt(0).toUpperCase() + value.slice(1));
              } else {
                setLastName(value);
              }
            }}
            onBlur={() => handleBlur("lastName")}
            placeholder="Last Name"
            error={validationErrors.lastName}
            required
          />

          {/* Mobile Number Input */}
          <TextInput
            id="mobile"
            label="Mobile Number"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={() => handleBlur("mobile")}
            placeholder="Mobile Number"
            maxLength={10}
            error={validationErrors.mobile}
            required
          />

          {/* Date of Birth Input */}
          <DatePicker
            id="dob"
            label="When is your birthday?"
            value={dob}
            onChange={(date) => {
              setDob(date);
              handleBlur("dob");
            }}
            placeholder="Birthday"
            error={validationErrors.dob}
            required
            defaultDate={getDefaultDate()}
          />

          {/* Profile Picture Input */}
          <TextInput
            id="profile-picture"
            label="Profile Picture URL"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            onBlur={() => handleBlur("profilePicture")}
            placeholder="Profile Picture URL"
            error={validationErrors.profilePicture}
            required
          />

          {/* Submit Button */}
          <TextButton
            text={isLoading ? "Submitting..." : "Next"}
            onClick={handleCompleteProfile}
            textColor="white"
            backgroundColor={isFormValid ? themeColors.primaryColor : "blue-400"}
            borderColor="transparent"
            className={`w-full py-3 font-semibold ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid || isLoading}
          />
        </form>
      </div>
    </div>
  );
}