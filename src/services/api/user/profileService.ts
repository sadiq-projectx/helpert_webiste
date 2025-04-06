import apiClient from "../config/apiClient";
import ApiEndpoints from "../config/apiEndpoints";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

interface ProfileData {
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  mobile: string;
  profilePicture: string;
  bio?: string;
}

interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio?: string;
  followers: number;
  following: number;
  joinedAt: string;
  isExpert: boolean;
  // Add other fields as needed
}

// Complete user profile
export const completeUserProfile = async (profileData: ProfileData) => {
  try {
    // Make the API request
    const response = await apiClient.put(ApiEndpoints.completeProfile, {
      username: profileData.username,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      mobile: profileData.mobile,
      dob: profileData.dob,
      profile_picture: profileData.profilePicture,
    });

    // Check the response status
    if (response.status === 200 && response.data.body?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.body?.message || "Failed to complete profile");
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error in completeUserProfile:", err.response?.data || err.message);
    throw new Error(err.response?.data?.body?.message || "Failed to complete profile. Please try again.");
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const token = localStorage.getItem('jwtToken');
  console.log('Authentication token exists:', !!token);
  return !!token;
};

// Get user profile
export const getUserProfile = async (userId?: string) => {
  try {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      console.warn('User is not authenticated. Profile fetch may fail.');
    }
    
    const endpoint = userId 
      ? `${ApiEndpoints.getProfileDetails}${userId}`
      : ApiEndpoints.homeProfile;
    
    console.log('Fetching profile from endpoint:', endpoint);
    const response = await apiClient.get(endpoint);
    console.log('Full API response:', response);
    
    // Check if the response has the expected structure
    if (response.status === 200) {
      // Handle different possible response structures
      let profileData;
      
      if (response.data.body?.status === true && response.data.body?.data) {
        console.log('Profile data found in response.data.body.data');
        profileData = response.data.body.data;
      } else if (response.data.status === true && response.data.data) {
        console.log('Profile data found in response.data.data');
        profileData = response.data.data;
      } else if (response.data) {
        console.log('Profile data found directly in response.data');
        profileData = response.data;
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Invalid response format');
      }
      
      console.log('Extracted profile data:', profileData);
      console.log('Follower in API response:', profileData.Follower, 'type:', typeof profileData.Follower);
      console.log('Following in API response:', profileData.Following, 'type:', typeof profileData.Following);
      return profileData;
    }
    
    throw new Error('Failed to fetch profile');
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error('Error in getUserProfile:', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to fetch profile. Please try again.');
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<ProfileData>) => {
  try {
    const response = await apiClient.put(ApiEndpoints.updateUser, {
      username: profileData.username,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      mobile: profileData.mobile,
      dob: profileData.dob,
      profile_picture: profileData.profilePicture,
      bio: profileData.bio,
    });

    if (response.status === 200 && response.data.body?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.body?.message || "Failed to update profile");
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error in updateUserProfile:", err.response?.data || err.message);
    throw new Error(err.response?.data?.body?.message || "Failed to update profile. Please try again.");
  }
};

// Upload profile picture
export const uploadProfilePicture = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    const response = await apiClient.post(ApiEndpoints.uploadProfilePicture, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 && response.data.body?.status === true) {
      return response.data.body.data;
    } else {
      throw new Error(response.data.body?.message || "Failed to upload profile picture");
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error in uploadProfilePicture:", err.response?.data || err.message);
    throw new Error(err.response?.data?.body?.message || "Failed to upload profile picture. Please try again.");
  }
};