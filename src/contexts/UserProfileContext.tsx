"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserProfile, isAuthenticated } from '@/services/api/user/profileService';

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

interface UserProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    // Check authentication status
    const authenticated = isAuthenticated();
    setAuthStatus(authenticated);
    
    if (!authenticated) {
      console.log('User is not authenticated. Skipping profile fetch.');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Fetching user profile...');
      const data = await getUserProfile();
      console.log('Raw profile data received:', data);
      console.log('First_Name from data:', data.First_Name);
      console.log('Last_Name from data:', data.Last_Name);
      console.log('Follower from data:', data.Follower, 'type:', typeof data.Follower);
      console.log('Following from data:', data.Following, 'type:', typeof data.Following);
      
      // Check if the data has the expected structure
      if (!data) {
        console.error('Profile data is null or undefined');
        setError('Failed to fetch profile: No data received');
        return;
      }
      
      // Map the API response fields to our expected format
      const profileData: UserProfile = {
        id: data.id || 'unknown',
        username: data.Username || 'unknown',
        firstName: data.First_Name || 'Unknown',
        lastName: data.Last_Name || 'User',
        profilePicture: data.Profile_Picture || '/images/default-avatar.svg',
        bio: data.bio || '',
        followers: data.Follower || 0,
        following: data.Following || 0,
        joinedAt: data.Joined_At || 'Unknown date',
        isExpert: data.isExpert || false,
      };
      
      console.log('Transformed profile data:', profileData);
      console.log('firstName after transformation:', profileData.firstName);
      console.log('lastName after transformation:', profileData.lastName);
      console.log('followers after transformation:', profileData.followers, 'type:', typeof profileData.followers);
      console.log('following after transformation:', profileData.following, 'type:', typeof profileData.following);
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <UserProfileContext.Provider value={{ profile, isLoading, error, refreshProfile, isAuthenticated: authStatus }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}; 