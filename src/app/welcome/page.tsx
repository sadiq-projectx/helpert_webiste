"use client"; // Mark this file as a client component

import React from "react";
import TextButton from "../../components/ui/buttons/TextButton";
import DividerWithText from "../../components/ui/DividerWithText";
import SocialLoginWidget from "../../components/ui/SocialLoginWidget";
import RichTextWidget from "../../components/ui/RichTextWidget";
import { useTheme } from "../../context/ThemeConfig";

export default function WelcomePage() {
  const { themeColors } = useTheme() || {
    backgroundColor: "#f9f9f9",
    surfaceColor: "#ffffff",
    textColor: "#333333",
    secondaryTextColor: "#70757a",
    primaryColor: "#007bff",
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

        {/* Action Buttons Section */}
        <div className="flex flex-col items-center space-y-4">
          <TextButton
            text="Create an Account"
            onClick={() => console.log("Navigate to Signup")}
            backgroundColor={themeColors.primaryColor}
            textColor="#FFF"
            className="w-full py-3 rounded-md font-semibold"
          />
          <TextButton
            text="Continue as Guest"
            onClick={() => console.log("Guest Login")}
            backgroundColor="transparent"
            textColor={themeColors.textColor}
            borderColor={themeColors.textColor}
            className="w-full py-3 border rounded-md font-semibold"
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
                onClick: () => console.log("Navigate to Login"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
