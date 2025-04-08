"use client";

import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import FollowStats from "./FollowStats";
import ProfileTabs from "./ProfileTabs";
import ShareModal from "./SharedModel"; // Assuming you have a ShareModal component
import TextButton from "../../../components/ui/buttons/TextButton";
import TextButtonWithPrefixIcon from "../../../components/ui/buttons/TextButtonWithPrefixIcon"; // Adjust the import path as necessary

interface HomeNormalUserProfileProps {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    bio: string;
    followers: number;
    following: number;
    joinedAt: string;
    isExpert: boolean;
  };
}

const HomeNormalUserProfile: React.FC<HomeNormalUserProfileProps> = ({ user }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <ProfileHeader
        profilePicture={user.profilePicture}
        fullName={`${user.firstName} ${user.lastName}`}
        username={user.username}
        bio={user.bio}
        joinedAt={user.joinedAt}
      />

      {/* Follow Stats */}
      <FollowStats
        followers={user.followers}
        following={user.following}
        onShareClick={handleShareClick}
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <TextButtonWithPrefixIcon
          text="Become an Expert"
          icon="fas fa-user-tie"
          onClick={() => console.log("Navigate to Become an Expert")}
          backgroundColor="blue"
          textColor="white"
        />
        <TextButton
          text="Edit Profile"
          onClick={() => console.log("Navigate to Edit Profile")}
          backgroundColor="transparent"
          textColor="blue"
          borderColor="blue"
        />
      </div>

      {/* Tabs for Appointments and Sessions */}
      {user.isExpert && <ProfileTabs />}
      
      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

export default HomeNormalUserProfile;