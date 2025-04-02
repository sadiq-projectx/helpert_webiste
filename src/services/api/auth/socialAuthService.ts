import apiClient from "../config/apiClient";
import ApiEndpoints from "../config/apiEndpoints";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface SocialUserModel {
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  provider: string;
  email: string;
  fcmToken: string;
}

// Social Login API Call
export const loginSocialAuthApi = async (socialUser: SocialUserModel): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(ApiEndpoints.socialLogin, socialUser);
    localStorage.setItem("jwtToken", response.data.token); // Save JWT token
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    throw new Error(err.response?.data?.message || "Failed to log in with social account. Please try again.");
  }
};