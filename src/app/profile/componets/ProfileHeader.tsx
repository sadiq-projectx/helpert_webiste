import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeConfig";

interface ProfileHeaderProps {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio: string;
  followers: number;
  following: number;
  joinedAt: string;
  isExpert?: boolean;
  onShareClick?: () => void;
  onEditProfileClick?: () => void;
  onBecomeExpertClick?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  firstName,
  lastName,
  profilePicture,
  bio,
  followers,
  following,
  joinedAt,
  isExpert = false,
  onShareClick = () => {},
  onEditProfileClick = () => {},
  onBecomeExpertClick = () => {},
}) => {
  const [imgError, setImgError] = useState(false);
  const { theme, themeColors } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Debug followers and following values
  console.log("ProfileHeader - followers:", followers, "type:", typeof followers);
  console.log("ProfileHeader - following:", following, "type:", typeof following);
  
  const handleImageError = () => {
    setImgError(true);
  };

  // Check if user is new (no followers and no following)
  const isNewUser = followers === 0 && following === 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className={`h-32 md:h-40 rounded-t-xl overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}>
        {/* You can add an actual cover image here if available */}
      </div>
      
      {/* Profile Content */}
      <div className={`relative px-6 py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-b-xl shadow-lg`}>
        {/* Profile Picture - Positioned to overlap with cover image */}
        <div className="absolute -top-16 left-6">
          <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} shadow-lg`}>
            <img
              src={imgError ? '/images/default-avatar.png' : profilePicture}
              alt={`${firstName}'s profile`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
        
        {/* Profile Info - Moved down to accommodate the overlapping profile picture */}
        <div className="mt-20 md:mt-16">
          {/* Name and Username */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{`${firstName} ${lastName}`}</h1>
              <p className="text-blue-500 text-sm mt-1">@{username}</p>
            </div>
            
            {/* Action Buttons - Moved to top right */}
            <div className="flex gap-2 mt-4 md:mt-0">
              {!isExpert && (
                <button
                  onClick={onBecomeExpertClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Become an Expert
                </button>
              )}
              <button
                onClick={onEditProfileClick}
                className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <div className="mt-4">
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{bio}</p>
            </div>
          )}

          {/* Join Date */}
          <div className={`mt-3 flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              Joined {new Date(joinedAt).toLocaleDateString('en-US', { 
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Stats and Share - Redesigned as a card */}
          <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              {/* Stats */}
              <div className="flex space-x-8">
                <div className="text-center">
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{followers || 0}</span>
                  <span className={`block text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Followers</span>
                </div>
                <div className="text-center">
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{following || 0}</span>
                  <span className={`block text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Following</span>
                </div>
              </div>
              
              {/* Share Icon */}
              <button 
                onClick={onShareClick}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                aria-label="Share Profile"
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>

          {/* New User Message - Redesigned */}
          {isNewUser && (
            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Welcome to Helperts!</p>
                  <p className="text-sm mt-1">Connect with experts and other users to start building your network.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;