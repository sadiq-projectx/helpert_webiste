import apiClient from '@/services/api/config/apiClient';
import { VideoFeedResponse } from '@/types/video';

interface FetchVideosParams {
  page: number;
  limit: number;
  categories?: string[];
}

class VideoService {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  async fetchVideos({ page, limit, categories }: FetchVideosParams): Promise<VideoFeedResponse> {
    try {
      const response = await apiClient.get('/video/trending', {
        params: {
          page,
          limit,
          categories: categories?.join(','),
        },
      });

      // Flutter API structure
      const { status, body } = response.data;
      if (!body?.status) {
        throw new Error(body?.message || 'Failed to fetch videos');
      }

      return {
        success: true,
        message: body.message,
        data: {
          videos: (body.data.videos || []).map((video: any) => ({
            id: video.id,
            videoUrl: video.video_path,
            thumbnailUrl: video.thumbnail_path,
            videoTitle: video.video_title ?? video.videoTitle,
            expertName: video.expert_name ?? undefined,
            expertImage: video.expert_image ?? undefined,
            likesCount: video.video_likes ?? undefined,
            commentsCount: video.video_comments_count ?? undefined,
            isLiked: video.is_liked ?? undefined,
            expertSpecialization: video.expert_specialization ?? undefined,
          })),
          categories: body.data.categories || [],
          hasReachedMax: false // You can add logic if your API supports this
        }
      };
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  async getVideoById(videoId: string) {
    try {
      const response = await apiClient.get(`/video/${videoId}`);
      const { status, body } = response.data;
      if (!body?.status) {
        throw new Error(body?.message || 'Failed to fetch video');
      }
      const video = body.data.video;
      return {
        id: video.id,
        videoUrl: video.video_path,
        thumbnailUrl: video.thumbnail_path,
        videoTitle: video.video_title ?? video.videoTitle,
        expertName: video.expert_name ?? undefined,
        expertImage: video.expert_image ?? undefined,
        likesCount: video.video_likes ?? undefined,
        commentsCount: video.video_comments_count ?? undefined,
        isLiked: video.is_liked ?? undefined,
        expertSpecialization: video.expert_specialization ?? undefined,
      };
    } catch (error) {
      console.error('Error fetching video by id:', error);
      throw error;
    }
  }

  async likeVideo(videoId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/api/v1/videos/${videoId}/like`);
  }

  async unlikeVideo(videoId: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/api/v1/videos/${videoId}/like`);
  }

  async bookmarkVideo(videoId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/api/v1/videos/${videoId}/bookmark`);
  }

  async removeBookmark(videoId: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/api/v1/videos/${videoId}/bookmark`);
  }

  async incrementVideoView(videoId: string): Promise<void> {
    try {
      // Use the viewVideo endpoint from ApiEndpoints
      await apiClient.post(`${require('@/services/api/config/apiEndpoints').default.viewVideo}${videoId}`);
    } catch (error) {
      console.error('Error incrementing video view:', error);
      throw error;
    }
  }
}

export const videoService = new VideoService(); 