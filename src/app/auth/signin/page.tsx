"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput"; // Import reusable TextInput component
import SocialLoginWidget from "@/components/ui/SocialLoginWidget"; // Import reusable SocialLoginWidget component
import TextButton from "@/components/ui/buttons/TextButton"; // Import reusable TextButton component
import { loginUser } from "@/services/api/auth/authService"; // Import the loginUser service

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState(""); // Updated to allow email or username
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    setIsFormValid(emailOrUsername.trim() !== "" && password.trim() !== "");
    setError(null);
  };

  // Handle form submission
  const handleSignIn = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call the loginUser API
      const response = await loginUser(emailOrUsername, password, "dummy-fcm-token");
      console.log("Login Response:", response);

      if (!response.token) {
        throw new Error("No token received from server");
      }

      // Verify token format
      if (!response.token.startsWith("Bearer ")) {
        localStorage.setItem("jwtToken", `Bearer ${response.token}`);
        sessionStorage.setItem("jwtToken", `Bearer ${response.token}`);
      } else {
        localStorage.setItem("jwtToken", response.token);
        sessionStorage.setItem("jwtToken", response.token);
      }

      // Navigate to the home page
      router.push("/");
    } catch (error: any) {
      console.error("Sign-in error:", error);
      setError(error.message || "Failed to sign in. Please try again.");
      
      // Clear any existing tokens
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("userId");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Sign-In Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Welcome Back!
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          We're delighted to have you back! Log in to continue addressing your
          concerns or explore some helpful tips.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="space-y-4"
        >
          {/* Email or Username Input */}
          <TextInput
            id="emailOrUsername"
            label="Username / Email"
            type="text"
            value={emailOrUsername}
            onChange={(e) => {
              setEmailOrUsername(e.target.value);
              validateForm();
            }}
            placeholder="Username or Email"
            required
          />

          {/* Password Input */}
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateForm();
            }}
            placeholder="Password"
            required
          />

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push("/auth/reset-password")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <TextButton
            text={isLoading ? "Signing In..." : "Sign In"}
            onClick={handleSignIn}
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
            or Sign In with
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center">
          <SocialLoginWidget />
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            I don't have an account?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}