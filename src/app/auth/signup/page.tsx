"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput"; // Reusable TextInput component
import TextButton from "@/components/ui/buttons/TextButton"; // Reusable TextButton component
import SocialLoginWidget from "@/components/ui/SocialLoginWidget"; // Reusable SocialLoginWidget component
import { signUpUser } from "@/services/api/auth/authService"; // Import the sign-up service
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For displaying error messages
  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    setIsFormValid(
      email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword
    );
  };

  // Handle form submission
  const handleSignUp = async () => {
    if (!isFormValid) {
      setErrorMessage("Please fill out all fields and ensure passwords match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null); // Clear any previous error messages
    try {
      // Call the sign-up API
      const response = await signUpUser(email, password);
      console.log("Sign-up successful:", response);

      // Navigate to the complete profile screen
      router.push("/auth/complete-profile");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error("Sign-up error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Sign-Up Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Create an Account
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Join Helpert – Connect with experts, learn new skills, and grow your knowledge!
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="space-y-4"
        >
          {/* Email Input */}
          <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateForm();
            }}
            placeholder="Email"
            required
          />

          {/* Password Input */}
          <TextInput
            id="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateForm();
            }}
            placeholder="Password"
            required
            suffix={
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-500 dark:text-gray-400"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            }
          />

          {/* Confirm Password Input */}
          <TextInput
            id="confirm-password"
            label="Confirm Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateForm();
            }}
            placeholder="Confirm your password"
            required
            suffix={
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="text-gray-500 dark:text-gray-400"
              >
                {isConfirmPasswordVisible ? "Hide" : "Show"}
              </button>
            }
          />

          {/* Submit Button */}
          <TextButton
            text={isLoading ? "Signing Up..." : "Next"}
            onClick={handleSignUp}
            textColor="white"
            backgroundColor={isFormValid ? "#3b82f6" : "#93c5fd"}
            borderColor="transparent"
            className={`w-full py-3 font-semibold ${
              isLoading ? "cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={!isFormValid || isLoading}
          />
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
            or Sign Up with
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center">
          <SocialLoginWidget />
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/signin")}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}