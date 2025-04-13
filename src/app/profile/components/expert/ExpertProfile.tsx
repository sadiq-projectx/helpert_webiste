"use client";

import React, { useState } from "react";
import { ProfileHeader } from "../common/ProfileHeader";
import ShareModal from "../common/SharedModel";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, MessageSquare, Edit, PlusCircle } from "lucide-react";
import ExpertReviews from "./ExpertReviews";
import ExperienceCard from "./ExperienceCard";
import ExpertHeader from "./ExpertHeader";
import ExpertiseSection from "./ExpertiseSection";
import ExpertPortfolio from "./ExpertPortfolio";
import ExpertStats from "./ExpertStats";
import ExpertVideos from "./ExpertVideos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeConfig";
import { Session } from "@/types/expert";

interface ExpertProfileProps {
  expert: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    bio?: string;
    followers: number;
    following: number;
    joinedAt: string;
    specialization?: string;
    experience?: string;
    rating?: number;
    totalReviews?: number;
    sessions?: Session[];
  };
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expert }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Use default profile picture if expert hasn't updated their profile picture
  const profilePicture = expert.profilePicture || "/images/default-avatar.png";
  
  // Log the profile picture path for debugging
  console.log("Expert profile picture path:", profilePicture);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleEditProfileClick = () => {
    router.push('/profile/edit');
  };

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  const handleLogout = () => {
    // Clear any stored tokens or user data
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userId');
    
    // Redirect to login page
    router.push('/auth/signin');
  };

  // Transform the expert data to match the expected structure
  const transformedExpert = {
    ...expert,
    body: {
      data: {
        portfolio: {},
        videobots: [],
        profile: {
          sessionRate: 0,
          booked: 0,
          experience: expert.experience || '',
          rating: expert.rating || 0,
          consultations: 0
        }
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader
          username={expert.username}
          firstName={expert.firstName}
          lastName={expert.lastName}
          profilePicture={profilePicture}
          bio={expert.bio || ""}
          followers={expert.followers}
          following={expert.following}
          joinedAt={expert.joinedAt}
          isExpert={true}
          onShareClick={handleShareClick}
          onEditProfileClick={handleEditProfileClick}
        />

        {/* Logout Button */}
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            className="text-red-500 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
            onClick={handleCreatePost}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Post
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            onClick={handleEditProfileClick}
          >
            <Edit className="mr-2 h-5 w-5" />
            Edit Profile
          </Button>
        </div>

        {/* Expert Stats */}
        <div className="mt-8">
          <ExpertStats expert={transformedExpert} />
        </div>

        {/* Expertise Section */}
        <div className="mt-8">
          <ExpertiseSection expert={transformedExpert} />
        </div>

        {/* Experience Card */}
        <div className="mt-8">
          <ExperienceCard expert={transformedExpert} />
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <ExpertPortfolio expert={transformedExpert} />
            </TabsContent>
            
            <TabsContent value="videos">
              <ExpertVideos expert={transformedExpert} />
            </TabsContent>
            
            <TabsContent value="sessions">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expert.sessions?.map((session, index) => (
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
                {(!expert.sessions || expert.sessions.length === 0) && (
                  <div className={`col-span-full text-center p-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No sessions available.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <ExpertReviews expertId={expert.id} />
        </div>

        {/* Share Modal */}
        {isShareModalOpen && (
          <ShareModal onClose={() => setIsShareModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default ExpertProfile;
