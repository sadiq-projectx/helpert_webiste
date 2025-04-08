"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeUserProfile from "../profile/components/user/HomeUserProfile";
import { useUserProfile } from "@/contexts/UserProfileContext";
import TextButton from "@/components/ui/buttons/TextButton";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, isLoading, error, isAuthenticated } = useUserProfile();

  useEffect(() => {
    console.log('Profile Page Data:', {
      profile,
      isLoading,
      error,
      isAuthenticated
    });
  }, [profile, isLoading, error, isAuthenticated]);

  if (isLoading) {
    console.log('Loading profile...');
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated');
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600">You need to be logged in to view your profile</p>
          </div>
          <TextButton
            text="Sign In"
            onClick={() => router.push("/auth/signin")}
            backgroundColor="blue"
            textColor="white"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Profile error:', error);
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-3">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800">Error Loading Profile</h3>
          </div>
          <p className="mt-2 text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    console.log('No profile found');
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-3">
            <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-yellow-800">Profile Not Found</h3>
          </div>
          <p className="mt-2 text-yellow-700">We couldn't find your profile information.</p>
        </div>
      </div>
    );
  }

  console.log('Rendering profile:', profile);
  return <HomeUserProfile user={profile} />;
}