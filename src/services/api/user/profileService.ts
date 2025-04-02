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