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
            videoTitle: video.video_title,
            videoUrl: video.video_path,
            thumbnailUrl: video.thumbnail_path,
            expertId: video.expert_id,
            expertName: video.expert_name,
            expertImage: video.expert_image,
            tagList: video.tag_list || [],
            expertSpecialization: video.expert_specialization,
            videoViews: video.video_views,
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
}

export const videoService = new VideoService(); 