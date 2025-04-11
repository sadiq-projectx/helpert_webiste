"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { guestLogin } from "@/services/api/user/guestService";
import { useTheme } from "../../../../contexts/ThemeConfig";

const GuestProfile: React.FC = () => {
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
    <div className="max-w-4xl mx-auto p-6">
      <div 
        className="rounded-xl shadow-lg p-8"
        style={{ backgroundColor: themeColors.surfaceColor }}
      >
        <div className="text-center">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: themeColors.textColor }}
          >
            Welcome to Helpert!
          </h2>
          <p 
            className="mb-6"
            style={{ color: themeColors.secondaryTextColor }}
          >
            You're currently browsing as a guest. Sign in to access all features or continue as a guest.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full"
              style={{ 
                backgroundColor: themeColors.primaryColor,
                color: 'white'
              }}
            >
              Sign In
            </Button>
            
            <Button
              onClick={handleGuestLogin}
              variant="outline"
              className="w-full"
              disabled={isLoading}
              style={{ 
                borderColor: themeColors.primaryColor,
                color: themeColors.primaryColor
              }}
            >
              {isLoading ? "Logging in..." : "Continue as Guest"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div 
                  className="w-full border-t"
                  style={{ borderColor: themeColors.dividerColor }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-2"
                  style={{ 
                    backgroundColor: themeColors.surfaceColor,
                    color: themeColors.secondaryTextColor
                  }}
                >
                  or
                </span>
              </div>
            </div>

            <Button
              onClick={() => router.push("/auth/signup")}
              variant="outline"
              className="w-full"
              style={{ 
                borderColor: themeColors.textColor,
                color: themeColors.textColor
              }}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestProfile;
