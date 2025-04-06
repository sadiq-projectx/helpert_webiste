"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import ShareModal from "./SharedModel";
import ProfileTabs from "./ProfileTabs";
import { useRouter } from "next/navigation";

interface HomeNormalUserProfileProps {
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

const HomeNormalUserProfile: React.FC<HomeNormalUserProfileProps> = ({ user }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const router = useRouter();

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleEditProfileClick = () => {
    router.push('/profile/edit');
  };

  const handleBecomeExpertClick = () => {
    router.push('/become-expert');
  };

  return (
    <>
      {/* Profile Header */}
      <ProfileHeader
        username={user.username}
        firstName={user.firstName}
        lastName={user.lastName}
        profilePicture={user.profilePicture}
        bio={user.bio || ""}
        followers={user.followers}
        following={user.following}
        joinedAt={user.joinedAt}
        isExpert={user.isExpert}
        onShareClick={handleShareClick}
        onEditProfileClick={handleEditProfileClick}
        onBecomeExpertClick={handleBecomeExpertClick}
      />

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

export default HomeNormalUserProfile;