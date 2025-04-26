'use client';

import React, { useEffect, useState } from 'react';
import { ShortsPlayer } from '@/components/videos/ShortsPlayer';
import { videoService } from '@/services/api/video/videoService';
import { VideoDetails } from '@/types/video';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ShortsFeedPage() {
  const [videos, setVideos] = useState<{
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
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the start video id from the query param
  const startId = searchParams.get('start');
  console.log('Start ID:', startId); // Debug log

  useEffect(() => {
    async function fetchShorts() {
      console.log('Fetching shorts...'); // Debug log
      setLoading(true);
      setError(null);
      try {
        // First try to get the specific video if startId exists
        if (startId) {
          try {
            console.log('Fetching specific video:', startId); // Debug log
            const video = await videoService.getVideoById(startId);
            console.log('Specific video response:', video); // Debug log
            if (video) {
              setVideos([video]);
            }
          } catch (err) {
            console.error('Error fetching specific video:', err);
          }
        }

        // Then fetch the trending videos
        const response = await videoService.fetchVideos({ page: 1, limit: 10 });
        console.log('Trending videos response:', response); // Debug log

        if (response.success) {
          const mappedVideos = response.data.videos.map((v: VideoDetails & { video_title?: string }) => ({
            id: v.id,
            videoUrl: v.videoUrl,
            thumbnailUrl: v.thumbnailUrl,
            videoTitle: (v as any).videoTitle ?? (v as any).video_title ?? undefined,
            expertName: v.expertName ?? undefined,
            expertImage: v.expertImage ?? undefined,
            likesCount: v.likesCount ?? undefined,
            commentsCount: v.commentsCount ?? undefined,
            isLiked: v.isLiked ?? undefined,
            expertSpecialization: v.expertSpecialization ?? undefined,
          }));

          // If we already have the specific video, add other videos
          if (startId && videos.length > 0) {
            setVideos(prev => [...prev, ...mappedVideos.filter(v => v.id !== startId)]);
          } else {
            setVideos(mappedVideos);
          }
          
          console.log('Final videos array:', videos); // Debug log
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to load shorts.');
        console.error('Shorts API error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchShorts();
  }, [startId]); // Added startId as dependency

  // Find the index of the video to start with
  const initialIndex = startId && videos.length > 0 ? videos.findIndex(v => v.id === startId) : 0;
  console.log('Shorts initialIndex:', initialIndex, 'startId:', startId, 'videos:', videos);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <ShortsPlayer videos={videos} initialIndex={initialIndex >= 0 ? initialIndex : 0} onBack={() => router.back()} />
    </div>
  );
} 