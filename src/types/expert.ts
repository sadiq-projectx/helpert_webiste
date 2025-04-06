export interface ExpertProfile {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  specialization?: string;
  specializationName?: string;
  rating?: number;
  location?: string;
  userLocation?: string;
  followerCount?: number;
  followingCount?: number;
  joinedAt?: string;
  currentlyWorking?: boolean;
  experience?: string;
  description?: string;
  profilePicture?: string;
  sessionRate?: number;
  booked?: number;
  portfolio?: PortfolioItem[];
  videobots?: VideoBot[];
  sessions?: Session[];
  bio?: string;
  followers?: number;
  following?: number;
  appointments?: number;
  happyClients?: number;
  isFollowing?: boolean;
  myExpertise?: Expertise[];
  consultations?: number;
  body?: {
    data?: {
      profile?: {
        id?: string;
        name?: string;
        username?: string;
        profilePicture?: string;
        specializationName?: string;
        userLocation?: string;
        rating?: number;
        followers?: number;
        following?: number;
        joinedAt?: string;
        consultations?: number;
        description?: string;
        booked?: number;
        experience?: string;
        sessionRate?: number;
        myExpertise?: Expertise[];
      };
      portfolio?: Portfolio;
      videobots?: Videobot[];
      allPortfolio?: any[];
    };
  };
}

export interface Expertise {
  id?: string;
  expertiseName?: string;
  expertise_name?: string;
}

export interface Portfolio {
  company?: {
    name?: string;
  };
  iAm?: {
    roles?: string;
  };
  specializedIn?: string;
  location?: string;
}

export interface Videobot {
  id?: string;
  expert_id?: string;
  videoUrl?: string;
  videoPath?: string;
  video_path?: string;
  thumbnailPath?: string;
  thumbnailUrl?: string;
  thumbnail_path?: string;
  videoTitle?: string;
  title?: string;
  video_title?: string;
  videoDescription?: string;
  description?: string;
  video_description?: string;
  tag_list?: string[];
  video_status?: string;
  deleted_at?: string | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface VideoBot {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  rating: number;
  comment: string;
  createdAt: string;
} 