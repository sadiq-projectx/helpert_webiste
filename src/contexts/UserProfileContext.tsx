"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/services/api/config/apiClient";

type UserType = 'user' | 'expert' | 'guest';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
  bio?: string;
  followers: number;
  following: number;
  joinedAt: string;
  isExpert: boolean;
  specialization?: string;
  experience?: string;
  rating?: number;
  totalReviews?: number;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userType: UserType;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  userType: 'guest',
  refreshProfile: async () => {},
});

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>('guest');

  const fetchUserData = async () => {
    try {
      // Get token from localStorage or sessionStorage
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      
      if (!token) {
        setUserType('guest');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Fetch dashboard data which includes user profile
      const response = await apiClient.get('/common/dashboard');
      
      if (!response.data?.body?.data?.user_detail) {
        throw new Error('Invalid user data received');
      }

      const userData = response.data.body.data.user_detail;
      
      // Map the user data to our profile format
      const userProfile: UserProfile = {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        profilePicture: userData.profile_picture || '/assets/images/default-avatar.png',
        bio: userData.bio || '',
        followers: userData.followers || 0,
        following: userData.following || 0,
        joinedAt: userData.joined_at || new Date().toISOString(),
        isExpert: userData.isExpert || false,
        specialization: userData.specialization,
        experience: userData.experience,
        rating: userData.rating,
        totalReviews: userData.total_reviews
      };

      setProfile(userProfile);
      setUserType(userData.isExpert ? 'expert' : 'user');
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      console.error('User data fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching user data');
      setUserType('guest');
      setIsAuthenticated(false);
      
      // Clear tokens on error
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('userId');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        isLoading,
        error,
        isAuthenticated,
        userType,
        refreshProfile: fetchUserData,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext); 