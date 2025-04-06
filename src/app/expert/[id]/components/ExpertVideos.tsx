import React from "react";
import Image from "next/image";
import { ExpertProfile, Videobot } from "@/types/expert";
import { useTheme } from "@/context/ThemeConfig";
import { Play } from "lucide-react";

interface ExpertVideosProps {
  expert: ExpertProfile;
}

export default function ExpertVideos({ expert }: ExpertVideosProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Get videos from either the direct property or from the nested body structure
  const videos = expert.videobots || expert.body?.data?.videobots || [];

  console.log("ExpertVideos - Videos data:", videos);

  if (videos.length === 0) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-8`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Videos
        </h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No videos available.
        </p>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-8`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <VideoCard 
            key={video.id || index} 
            video={video} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: Videobot;
  isDarkMode: boolean;
}

function VideoCard({ video, isDarkMode }: VideoCardProps) {
  // Handle both old and new field names
  const thumbnailUrl = video.thumbnailPath || video.thumbnailUrl || video.thumbnail_path || '/video-placeholder.jpg';
  const videoUrl = video.videoPath || video.videoUrl || video.video_path || '';
  const tags = video.tag_list || [];

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md ${
        isDarkMode ? 'bg-gray-700' : 'bg-white'
      }`}
    >
      <div className="relative aspect-[9/16] group">
        <Image
          src={thumbnailUrl}
          alt="Video thumbnail"
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/video-placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Play size={24} />
          </a>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="p-2 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-300' 
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 