"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Video {
  id: string;
  thumbnailPath: string;
  tagList: string[];
  title: string;
}

interface VideoCardsProps {
  videos: Video[];
}

const VideoCards: React.FC<VideoCardsProps> = ({ videos }) => {
  const router = useRouter();

  const handleVideoClick = (videoId: string, initialIndex: number) => {
    router.push(`/video/${videoId}?index=${initialIndex}`);
  };

  const convertTagListIntoString = (tags: string[]) => {
    return tags.length > 0 ? tags.join(" ") : "";
  };

  return (
    <div className="my-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Videos</h2>
          <Image src="/icons/video-icon.png" alt="Videos" width={20} height={20} />
        </div>
        <button
          onClick={() => router.push("/video-feed")}
          className="text-blue-500 hover:underline text-sm"
        >
          View more
        </button>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="cursor-pointer"
            onClick={() => handleVideoClick(video.id, index)}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md">
              <Image
                src={video.thumbnailPath}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Video Title */}
            <div className="mt-2 text-sm text-gray-700 truncate">
              {convertTagListIntoString(video.tagList)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;