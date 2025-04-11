"use client"; // Mark this file as a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextButton from "../../components/ui/buttons/TextButton";
import DividerWithText from "../../components/ui/DividerWithText";
import SocialLoginWidget from "../../components/ui/SocialLoginWidget";
import RichTextWidget from "../../components/ui/RichTextWidget";
import { useTheme } from "../../contexts/ThemeConfig";
import { guestLogin } from "@/services/api/user/guestService";

export default function WelcomePage() {
  const router = useRouter();
  const { themeColors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await guestLogin();
      router.push("/"); // Redirect to home page after successful guest login
    } catch (err) {
      setError("Failed to login as guest. Please try again.");
      console.error("Guest login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 relative"
      style={{ backgroundColor: themeColors.backgroundColor, color: themeColors.textColor }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Card Container */}
      <div
        className="relative z-10 shadow-lg rounded-3xl p-8 w-full max-w-md"
        style={{ backgroundColor: themeColors.surfaceColor }}
      >
        {/* Welcome Text Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <h1 className="text-3xl font-bold" style={{ color: themeColors.textColor }}>
            Welcome to Helpert!
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: themeColors.secondaryTextColor }}
          >
            Connect with top experts, specialists, recruiters, and job seekers in various fields.
            Get personalized consultations or career advice via video call. Become an expert, help
            others, and earn money.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Action Buttons Section */}
        <div className="flex flex-col items-center space-y-4">
          <TextButton
            text="Create an Account"
            onClick={() => router.push("/auth/signup")}
            backgroundColor={themeColors.primaryColor}
            textColor="#FFF"
            className="w-full py-3 rounded-md font-semibold"
          />
          <TextButton
            text={isLoading ? "Logging in..." : "Continue as Guest"}
            onClick={handleGuestLogin}
            backgroundColor="transparent"
            textColor={themeColors.textColor}
            borderColor={themeColors.textColor}
            className="w-full py-3 border rounded-md font-semibold"
            disabled={isLoading}
          />
          <DividerWithText text="or Sign Up with" />
          <div className="flex justify-center space-x-4">
            <SocialLoginWidget />
          </div>
        </div>

        {/* Already Have an Account Section */}
        <div className="mt-6 text-center">
          <RichTextWidget
            textSegments={[
              { text: "Already have an account? ", color: themeColors.textColor },
              {
                text: "Sign In",
                color: themeColors.primaryColor,
                onClick: () => router.push("/auth/signin"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
