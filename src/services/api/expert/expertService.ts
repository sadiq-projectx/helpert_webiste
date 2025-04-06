import apiClient from "../config/apiClient";
import ApiEndpoints from "../config/apiEndpoints";
import { AxiosError } from "axios";
import { guestLogin } from "../user/guestService";
import { ExpertProfile, Expertise, Portfolio, Videobot } from "@/types/expert";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

interface ExpertProfileResponse {
  id: string;
  Username?: string;
  First_Name?: string;
  Last_Name?: string;
  Profile_Picture?: string;
  bio?: string;
  Follower?: number;
  Following?: number;
  Joined_At?: string;
  Specialization_Name?: string;
  Session_Rate?: number;
  Rating?: number;
  Consultations?: number;
  Description?: string;
  Happy_Clients?: number;
  Booked?: number;
  isFollowing?: boolean;
  Location?: string;
  User_Location?: string;
  My_Expertise?: Expertise[];
  Currently_Working?: boolean;
  Experience?: string;
  End_At?: string;
  is_expert?: boolean;
}

export const getExpertProfile = async (expertId: string): Promise<ExpertProfile> => {
  try {
    console.log('Fetching expert profile for ID:', expertId);
    
    // Check if we have a token
    const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    
    // If no token, try guest login
    if (!token) {
      console.log('No token found, attempting guest login');
      try {
        const guestData = await guestLogin();
        console.log('Guest login successful');
      } catch (guestError) {
        console.error('Guest login failed:', guestError);
        throw new Error('Failed to authenticate as guest');
      }
    }
    
    // Use the correct endpoint format with proper error handling
    const url = `${ApiEndpoints.getProfile}${expertId}`;
    console.log('API URL:', url);
    
    const response = await apiClient.get(url);

    console.log('Raw API Response:', response.data);

    if (response.status === 200 && response.data?.body?.status === true) {
      const data = response.data.body.data.Profile as ExpertProfileResponse;
      // Keep the original portfolio data structure without transformation
      const portfolio = response.data.body.data.Portfolio;
      const videobots = response.data.body.data.Videobots as Videobot[] | undefined;
      const allPortfolio = response.data.body.data.All_Portfolio as any[] | undefined;
      
      console.log('API Response Data:', data);
      console.log('Expertise Data from API:', data.My_Expertise);
      console.log('Portfolio Data from API:', portfolio);
      console.log('Videobots Data from API:', videobots);
      console.log('All Portfolio Data from API:', allPortfolio);

      // Transform the API response to match our ExpertProfile type
      const transformedData: ExpertProfile = {
        id: data.id || '',
        username: data.Username,
        firstName: data.First_Name,
        lastName: data.Last_Name,
        profilePicture: data.Profile_Picture,
        bio: data.bio,
        followers: data.Follower,
        following: data.Following,
        joinedAt: data.Joined_At,
        specialization: data.Specialization_Name,
        sessionRate: data.Session_Rate,
        rating: data.Rating,
        appointments: data.Consultations,
        description: data.Description,
        happyClients: data.Happy_Clients,
        booked: data.Booked,
        isFollowing: data.isFollowing,
        location: data.Location,
        userLocation: data.User_Location,
        myExpertise: data.My_Expertise,
        currentlyWorking: data.Currently_Working,
        experience: data.Experience,
        consultations: data.Consultations,
        // Include the raw response data for components that need it
        body: {
          data: {
            profile: {
              id: data.id,
              name: data.First_Name ? `${data.First_Name} ${data.Last_Name || ''}` : data.Username,
              username: data.Username,
              profilePicture: data.Profile_Picture,
              specializationName: data.Specialization_Name,
              rating: data.Rating,
              followers: data.Follower,
              following: data.Following,
              joinedAt: data.Joined_At,
              consultations: data.Consultations,
              description: data.Description,
              booked: data.Booked,
              experience: data.Experience,
              sessionRate: data.Session_Rate,
              userLocation: data.User_Location,
              myExpertise: data.My_Expertise
            },
            // Keep the original portfolio data structure
            portfolio: portfolio,
            videobots: videobots,
            allPortfolio: allPortfolio
          }
        }
      };

      console.log('Transformed Expert Profile:', transformedData);
      console.log('Transformed Expertise Data:', transformedData.myExpertise);
      console.log('Transformed Portfolio Data:', transformedData.body?.data?.portfolio);
      console.log('Transformed Videobots Data:', transformedData.body?.data?.videobots);
      console.log('Transformed All Portfolio Data:', transformedData.body?.data?.allPortfolio);

      return transformedData;
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error in getExpertProfile:', error);
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      throw new Error(errorData?.message || 'Failed to fetch expert profile');
    }
    throw error;
  }
};

export const followExpert = async (expertId: string): Promise<void> => {
  try {
    console.log('Following expert:', expertId);
    const response = await apiClient.post(ApiEndpoints.followExpert, {
      expert_id: expertId,
    });

    if (response.status === 200 && response.data?.body?.status === true) {
      console.log('Successfully followed expert');
      return;
    } else {
      throw new Error(response.data?.body?.message || 'Failed to follow expert');
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error('Error in followExpert:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    });
    throw new Error(err.response?.data?.body?.message || 'Failed to follow expert. Please try again.');
  }
};

export const getExpertReviews = async (expertId: string): Promise<any[]> => {
  try {
    console.log('Fetching reviews for expert:', expertId);
    
    // Check if we have a token
    const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    
    // If no token, try guest login
    if (!token) {
      console.log('No token found, attempting guest login');
      try {
        const guestData = await guestLogin();
        console.log('Guest login successful');
      } catch (guestError) {
        console.error('Guest login failed:', guestError);
        throw new Error('Failed to authenticate as guest');
      }
    }
    
    // Use the correct endpoint format
    const url = `${ApiEndpoints.getReviews}${expertId}`;
    console.log('API URL:', url);
    
    const response = await apiClient.get(url);

    if (response.status === 200 && response.data?.body?.status === true) {
      console.log('Reviews data:', response.data.body.data);
      return response.data.body.data;
    } else {
      throw new Error(response.data?.body?.message || 'Failed to fetch expert reviews');
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error('Error in getExpertReviews:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      url: err.config?.url
    });
    throw new Error(err.response?.data?.body?.message || 'Failed to fetch expert reviews. Please try again.');
  }
}; 