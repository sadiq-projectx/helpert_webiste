export interface Expert {
  id: string;
  name: string;
  profile_picture: string;
  specialization: string[];
  rating: number;
}

export interface VideoDetails {
  id: string;
  tagList: string[];
  videoViews: number;
  expertImage: string | null;
  expertName: string | null;
  expertSpecialization: string | null;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  duration: number;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  expert?: Expert;
}

export interface VideoFeedData {
  videos: VideoDetails[];
  categories: string[];
  hasReachedMax: boolean;
}

export interface VideoFeedResponse {
  success: boolean;
  message: string;
  data: VideoFeedData;
}

export interface VideoStats {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
} 