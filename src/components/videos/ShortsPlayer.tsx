'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, MoreVertical, ArrowLeft } from 'lucide-react';

interface ShortsPlayerProps {
  videos: {
    id: string;
    videoUrl: string;
    thumbnailUrl?: string;
    videoTitle?: string;
    expertName?: string;
    expertImage?: string;
    likesCount?: number;
    commentsCount?: number;
    isLiked?: boolean;
    expertSpecialization?: string;
  }[];
  onBack?: () => void;
  initialIndex?: number;
}

export function ShortsPlayer({ videos, onBack, initialIndex = 0 }: ShortsPlayerProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  const handlers = useSwipeable({
    onSwipedUp: () => setCurrent((prev) => Math.min(prev + 1, videos.length - 1)),
    onSwipedDown: () => setCurrent((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    setIsLiked(!!videos[current]?.isLiked);
  }, [current, isPlaying, videos]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!videos.length) return <div className="text-white">No videos available</div>;

  const video = videos[current];

  return (
    <div
      {...handlers}
      className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Video Container with 9:16 aspect ratio */}
      <div className="relative mx-auto w-full max-w-[430px] h-full flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
        {/* Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          className="w-full h-full object-cover rounded-none"
          controls={false}
          autoPlay
          loop
          muted={isMuted}
          onClick={() => setIsPlaying((p) => !p)}
        />
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none" />
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 z-20 p-2 bg-black/60 rounded-full text-white"
            style={{ pointerEvents: 'auto' }}
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
        )}
        {/* Video Controls (top right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2 bg-black/50 rounded-full text-white"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-2 bg-black/50 rounded-full text-white"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
        {/* Action Buttons (right, vertically centered) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={() => setIsLiked((liked) => !liked)}
            className="flex flex-col items-center"
          >
            <Heart className={`w-9 h-9 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            <span className="text-white text-base mt-1 font-semibold">{video.likesCount ?? 0}</span>
          </button>
          <button className="flex flex-col items-center">
            <MessageCircle className="w-9 h-9 text-white" />
            <span className="text-white text-base mt-1 font-semibold">{video.commentsCount ?? 0}</span>
          </button>
          <button className="flex flex-col items-center">
            <Share2 className="w-9 h-9 text-white" />
            <span className="text-white text-base mt-1 font-semibold">Share</span>
          </button>
          <button className="flex flex-col items-center">
            <MoreVertical className="w-9 h-9 text-white" />
            <span className="text-white text-base mt-1 font-semibold">More</span>
          </button>
        </div>
        {/* Video Info (bottom left) */}
        <div className="absolute bottom-6 left-4 z-20 flex flex-row items-end gap-3 w-3/4">
          {video.expertImage ? (
            <img
              src={video.expertImage}
              alt={video.expertName || ''}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold">{video.expertName?.[0] || '?'}</div>
          )}
          <div className="flex flex-col gap-1">
            <div className="text-white font-bold text-lg leading-tight truncate">
              {video.videoTitle || 'Untitled Video'}
            </div>
            <div className="text-white/90 text-base font-medium truncate">
              {video.expertName}
            </div>
            <div className="text-white/70 text-xs font-normal truncate">
              {video.expertSpecialization}
            </div>
          </div>
        </div>
        {/* Video Counter (bottom center) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/80 text-xs z-20">
          Video {current + 1} / {videos.length}
        </div>
      </div>
    </div>
  );
} 