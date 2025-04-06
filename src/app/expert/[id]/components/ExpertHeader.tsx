import React from "react";
import { ExpertProfile } from "@/types/expert";
import { useTheme } from "@/context/ThemeConfig";
import Image from "next/image";
import { MapPin, Share2 } from "lucide-react";
import { getFormattedLocation } from "@/lib/locationUtils";

interface ExpertHeaderProps {
  expert: ExpertProfile;
}

export default function ExpertHeader({ expert }: ExpertHeaderProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Handle both old and new field names
  const displayName = expert.firstName && expert.lastName 
    ? `${expert.firstName} ${expert.lastName}`
    : expert.username || expert.body?.data?.profile?.name || "Expert";

  const specialization = expert.specialization || 
    expert.specializationName || 
    expert.body?.data?.profile?.specializationName || 
    "Specialist";

  // Use the new location utility function
  const location = getFormattedLocation(expert);
  console.log("Location data:", {
    location,
    rawLocation: expert.location,
    userLocation: expert.userLocation,
    profileLocation: expert.body?.data?.profile?.userLocation
  });

  const profilePicture = expert.profilePicture || 
    expert.body?.data?.profile?.profilePicture || 
    "";

  const followers = expert.followers || 
    expert.followerCount || 
    expert.body?.data?.profile?.followers || 
    0;

  const following = expert.following || 
    expert.followingCount || 
    expert.body?.data?.profile?.following || 
    0;

  const booked = expert.booked || 
    expert.appointments || 
    expert.body?.data?.profile?.booked || 
    0;

  const rating = expert.rating || 
    expert.body?.data?.profile?.rating || 
    0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${displayName}'s Profile`,
        text: `Check out ${displayName}'s profile on Helpert`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt={displayName}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-avatar.png";
                  }}
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <span className="text-4xl text-gray-500">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Expert Details */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {displayName}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {specialization}
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                >
                  Follow
                </button>
                <button 
                  onClick={handleShare}
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium flex items-center gap-2`}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="mt-2 flex items-center">
              <MapPin size={16} className={isDarkMode ? 'text-red-400' : 'text-red-500'} />
              <span className={`ml-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {location}
              </span>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {expert.description || expert.bio || expert.body?.data?.profile?.description || "No description available"}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {followers}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {following}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Following
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {booked}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Booked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 