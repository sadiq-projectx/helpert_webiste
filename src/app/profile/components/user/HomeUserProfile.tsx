"use client";

import React, { useState } from "react";
import { ProfileHeader } from "../common/ProfileHeader";
import ShareModal from "../common/SharedModel";
import ProfileTabs from "../common/ProfileTabs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface HomeUserProfileProps {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    bio?: string;
    followers: number;
    following: number;
    joinedAt: string;
    isExpert: boolean;
  };
}

const HomeUserProfile: React.FC<HomeUserProfileProps> = ({ user }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const router = useRouter();

  // Use default profile picture if user hasn't updated their profile picture
  const profilePicture = user.profilePicture || "/images/default-avatar.png";
  
  console.log("HomeUserProfile - profile picture:", profilePicture);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleEditProfileClick = () => {
    router.push('/profile/edit');
  };

  const handleBecomeExpertClick = () => {
    router.push('/become-expert');
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

  return (
    <>
      {/* Profile Header */}
      <ProfileHeader
        username={user.username}
        firstName={user.firstName}
        lastName={user.lastName}
        profilePicture={profilePicture}
        bio={user.bio || ""}
        followers={user.followers}
        following={user.following}
        joinedAt={user.joinedAt}
        isExpert={user.isExpert}
        onShareClick={handleShareClick}
        onEditProfileClick={handleEditProfileClick}
        onBecomeExpertClick={handleBecomeExpertClick}
      />

      {/* Logout Button */}
      <div className="max-w-4xl mx-auto mt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="text-red-500 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto mt-8">
        <ProfileTabs />
      </div>

      {/* Expert Services Section */}
      {user.isExpert && (
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Expert Services</h2>
            {/* Add your expert services content here */}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </>
  );
};

export default HomeUserProfile;