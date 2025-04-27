import React from 'react';
import Image from 'next/image';
import { Play, Heart, MessageCircle, Clock } from 'lucide-react';
import { VideoDetails } from '@/types/video';
import { formatDuration, formatTimeAgo } from '@/lib/utils';

function isValidImageUrl(url?: string) {
  if (!url) return false;
  if (url === 'temp_url') return false;
  return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');
}

interface VideoThumbnailCardProps {
  video: VideoDetails;
  onClick: () => void;
  onLike?: () => void;
}

export function VideoThumbnailCard({ video, onClick, onLike }: VideoThumbnailCardProps) {
  const firstTag = video.tagList?.[0] ? capitalize(video.tagList[0]) : 'Health';
  const secondTag = video.tagList?.[1] ? capitalize(video.tagList[1]) : '';

  return (
    <div 
      onClick={onClick}
      className="relative rounded-lg overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] w-full">
        {isValidImageUrl(video.thumbnailUrl) ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.expertName || ''}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="32" height="32" rx="6" fill="#e5e7eb"/>
                <path d="M8 24l4-4 4 4 4-4 4 4" stroke="#9ca3af" strokeWidth="2"/>
              </svg>
            </span>
          </div>
        )}
        {/* Duration Badge */}
        <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-white text-xs">{formatDuration((video as any).duration ?? 0)}</span>
          </div>
        </div>
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Expert Details */}
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          {isValidImageUrl(video.expertImage) ? (
            <Image
              src={video.expertImage!}
              alt={video.expertName || ''}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">
              <span className="text-gray-500 text-lg">?</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-white text-sm font-medium line-clamp-1">{video.expertName}</p>
          <p className="text-white/80 text-xs line-clamp-1">{video.expertSpecialization}</p>
        </div>
      </div>

      {/* Video Details */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        {/* Tags */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-white text-sm">
            {secondTag ? `${firstTag} & ${secondTag}` : firstTag}
          </p>
          <div className="flex items-center space-x-1">
            <Play className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{video.videoViews}</span>
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className="flex items-center space-x-1 group"
            >
              <Heart 
                className={`w-4 h-4 ${video.isLiked ? 'text-red-500 fill-red-500' : 'text-white group-hover:text-red-500'}`} 
              />
              <span className="text-white text-xs">{(video as any).likesCount ?? 0}</span>
            </button>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-white text-xs">{(video as any).commentsCount ?? 0}</span>
            </div>
          </div>
          <span className="text-white/80 text-xs">{formatTimeAgo((video as any).createdAt ?? '')}</span>
        </div>
      </div>
    </div>
  );
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
} 