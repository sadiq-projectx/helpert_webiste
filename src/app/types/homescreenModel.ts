export interface HomeScreenModel {
  status: number;
  body: Body;
}

export interface Body {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user_detail: UserDetail; // Updated to match API response
  progress?: number;
  appointments_details?: AppointmentsDetail[]; // Updated to match API response
  banners: Banner[];
  wide_range_of_experts: WideRangeOfExpert[]; // Updated to match API response
  trending_videos: TrendingVideo[]; // Updated to match API response
  recommended_for_you: ExpertList[]; // Updated to match API response
  top_rated_experts: TopRatedExpert[]; // Updated to match API response
}

export interface UserDetail {
  id: string;
  first_name: string; // Updated to match API response
  isExpert: boolean;
  username: string;
  last_name: string; // Updated to match API response
  profile_picture: string; // Updated to match API response
}

export interface AppointmentsDetail {
  bookingId: string;
  appointmentDate: string;
  expertImage: string;
  expertName: string;
  day: string;
  time: string;
}

export interface Banner {
  id: string;
  title: string;
  image: string;
  type: string;
}

export interface WideRangeOfExpert {
  id: string;
  specialization_name: string; // Updated to match API response
  specialization_image: string; // Updated to match API response
}

export interface TrendingVideo {
  id: string;
  video_title: string; // Updated to match API response
  thumbnail_path: string; // Updated to match API response
  tag_list?: string[]; // Updated to match API response
}

export interface ExpertList {
  id?: string;
  profile_picture?: string; // Updated to match API response
  full_name?: string; // Updated to match API response
  specialization?: string;
  session_rate?: number; // Updated to match API response
  rating?: number;
}

export interface TopRatedExpert {
  id?: string;
  profile_picture?: string; // Updated to match API response
  full_name?: string; // Updated to match API response
  specialization?: string;
  appointments?: number;
  session_rate?: number; // Updated to match API response
  rating?: number;
}