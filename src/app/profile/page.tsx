"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeUserProfile from "../profile/components/user/HomeUserProfile";
import ExpertProfile from "../profile/components/expert/ExpertProfile";
import GuestProfile from "../profile/components/guest/GuestProfile";
import { useUserProfile } from "@/contexts/UserProfileContext";
import TextButton from "@/components/ui/buttons/TextButton";
import { useTheme } from "@/contexts/ThemeConfig";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpertHeader from "../expert/[id]/components/ExpertHeader";
import ExpertStats from "../expert/[id]/components/ExpertStats";
import ExpertiseSection from "../expert/[id]/components/ExpertiseSection";
import ExpertPortfolio from "../expert/[id]/components/ExpertPortfolio";
import ExpertVideos from "../expert/[id]/components/ExpertVideos";
import ExperienceCard from "../expert/[id]/components/ExperienceCard";
import { ExpertProfile as ExpertProfileType } from "@/types/expert";
import { getExpertProfile } from "@/services/api/expert/expertService";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, isLoading, error, isAuthenticated, userType } = useUserProfile();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [expertData, setExpertData] = useState<ExpertProfileType | null>(null);
  const [isExpertLoading, setIsExpertLoading] = useState(false);
  const [expertError, setExpertError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Profile Page Data:', {
      profile,
      isLoading,
      error,
      isAuthenticated,
      userType
    });
    
    // Check if we have a token but not authenticated
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (token && !isAuthenticated && !isLoading) {
      console.log('Token exists but not authenticated, refreshing page');
      // Force a refresh of the page to trigger the UserProfileContext to fetch data again
      window.location.reload();
    }
  }, [profile, isLoading, error, isAuthenticated, userType]);

  // Fetch expert data when profile is loaded and user is an expert
  useEffect(() => {
    const fetchExpertData = async () => {
      if (userType === 'expert' && profile?.id) {
        try {
          setIsExpertLoading(true);
          setExpertError(null);
          const expertProfile = await getExpertProfile(profile.id);
          console.log('Expert profile data:', expertProfile);
          setExpertData(expertProfile);
        } catch (err) {
          console.error('Error fetching expert data:', err);
          setExpertError(err instanceof Error ? err.message : 'Failed to load expert profile');
        } finally {
          setIsExpertLoading(false);
        }
      }
    };

    fetchExpertData();
  }, [userType, profile?.id]);

  if (isLoading || isExpertLoading) {
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

  if (error || expertError) {
    console.error('Profile error:', error || expertError);
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-3">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800">Error Loading Profile</h3>
          </div>
          <p className="mt-2 text-red-700">{error || expertError}</p>
          <div className="mt-4">
            <TextButton
              text="Try Again"
              onClick={() => window.location.reload()}
              backgroundColor="red"
              textColor="white"
              className="w-full"
            />
          </div>
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
          <div className="mt-4">
            <TextButton
              text="Sign In Again"
              onClick={() => router.push("/auth/signin")}
              backgroundColor="yellow"
              textColor="black"
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering profile:', profile, 'User type:', userType);
  
  // Render different profile components based on user type
  switch (userType) {
    case 'expert':
      const expertProfile = expertData || profile as ExpertProfileType;
      const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('userId');
        router.push('/auth/signin');
      };

      return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ExpertHeader expert={expertProfile} />
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Call
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                size="lg"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
            
            <div className="mt-8">
              <ExpertStats expert={expertProfile} />
            </div>

            <div className="mt-8">
              <ExpertiseSection expert={expertProfile} />
            </div>
            
            <div className="mt-8">
              <ExperienceCard expert={expertProfile} />
            </div>

            <div className="mt-8">
              <Tabs defaultValue="portfolio" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="portfolio">
                  <ExpertPortfolio expert={expertProfile} />
                </TabsContent>
                
                <TabsContent value="videos">
                  <ExpertVideos expert={expertProfile} />
                </TabsContent>
                
                <TabsContent value="sessions">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expertProfile.sessions?.map((session, index) => (
                      <div key={index} className={`rounded-lg overflow-hidden shadow-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {session.title}
                        </h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {session.description}
                        </p>
                        <div className="mt-4">
                          <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            ₹{session.price.toLocaleString()}
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            / {session.duration} minutes
                          </span>
                        </div>
                      </div>
                    ))}
                    {(!expertProfile.sessions || expertProfile.sessions.length === 0) && (
                      <div className={`col-span-full text-center p-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No sessions available.
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      );
    case 'user':
      return <HomeUserProfile user={profile} />;
    default:
      return <GuestProfile />;
  }
}