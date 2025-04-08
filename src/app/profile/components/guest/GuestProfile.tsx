"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GuestProfile: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, Guest!
          </h2>
          <p className="text-gray-600 mb-6">
            You're currently browsing as a guest. Sign in to access all features.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full"
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/auth/signup")}
              className="w-full"
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
