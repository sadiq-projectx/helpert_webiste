import React from "react";

interface ProfileHeaderProps {
  profilePicture: string;
  fullName: string;
  username: string;
  bio: string;
  joinedAt: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePicture,
  fullName,
  username,
  bio,
  joinedAt,
}) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={profilePicture || "/default-avatar.png"}
        alt={fullName}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h1 className="text-xl font-bold">{fullName}</h1>
        <p className="text-gray-500">@{username}</p>
        <p className="text-gray-700">{bio}</p>
        <p className="text-gray-400 text-sm">Joined {joinedAt}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;