"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { videoService } from '@/services/api/video/videoService';
import { VideoDetails } from '@/types/video';

export default function VideoDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      setError(null);
      try {
        // 1. Try to find the video in trending batch
        const response = await videoService.fetchVideos({ page: 1, limit: 50 });
        const found = response.data.videos.find((v) => v.id === id);
        if (found) {
          setVideo(found);
          // 3. Increment view count
          try {
            await videoService.incrementVideoView(found.id);
          } catch (e) {
            console.warn('Failed to increment view count', e);
          }
        } else {
          // 2. If not found, fetch by ID
          try {
            const videoById = await videoService.getVideoById(id);
            setVideo(videoById);
            // 3. Increment view count
            try {
              await videoService.incrementVideoView(videoById.id);
            } catch (e) {
              console.warn('Failed to increment view count', e);
            }
          } catch (err) {
            setError('Video not found');
          }
        }
      } catch (err) {
        setError('Failed to load video.');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchVideo();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!video) return null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-black py-8">
      <video
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        controls
        className="w-full max-w-md rounded-lg"
      />
      <div className="mt-4 text-white text-lg font-semibold">{(video as any).videoTitle ?? (video as any).video_title ?? 'Untitled Video'}</div>
      <div className="mt-2 text-white/80">{video.expertName}</div>
    </div>
  );
} 