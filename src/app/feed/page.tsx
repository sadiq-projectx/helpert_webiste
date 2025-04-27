'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VideoDetails, VideoFeedData } from '@/types/video';
import { videoService } from '@/services/api/video/videoService';
import { VideoThumbnailCard } from '@/components/videos/VideoThumbnailCard';
import { CategoryTabs } from '@/components/videos/CategoryTabs';
import { Button } from '@/components/ui/button';

const LIMIT = 6;

export default function FeedPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedData, setFeedData] = useState<VideoFeedData | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchVideos = async (pageNum: number, resetData = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await videoService.fetchVideos({
        page: pageNum,
        limit: LIMIT,
        categories: Array.from(selectedCategories),
      });

      if (response.success) {
        setFeedData(prev => {
          if (resetData) return response.data;
          return {
            ...response.data,
            videos: [...(prev?.videos || []), ...response.data.videos],
          };
        });
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1, true);
  }, [selectedCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !feedData?.hasReachedMax) {
          setPage(prev => {
            const nextPage = prev + 1;
            fetchVideos(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, feedData?.hasReachedMax]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setPage(1);
  };

  const handleVideoClick = (videoId: string) => {
    router.push(`/feed/shorts?start=${videoId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center px-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trending Videos
          </h1>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedCategories(new Set());
              fetchVideos(1, true);
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* Categories */}
        {feedData?.categories && feedData.categories.length > 0 && (
          <CategoryTabs
            categories={feedData.categories}
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
            isLoading={loading}
          />
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {feedData?.videos && feedData.videos.length > 0 ? (
            feedData.videos.map((video) => (
              <VideoThumbnailCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))
          ) : !loading ? (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No videos available
              {selectedCategories.size > 0 && (
                <p className="mt-2 text-sm">
                  Try removing some filters
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        )}

        {/* Infinite Scroll Observer */}
        {!loading && !error && feedData?.videos.length ? (
          <div ref={observerTarget} className="h-4" />
        ) : null}
      </div>
    </main>
  );
}