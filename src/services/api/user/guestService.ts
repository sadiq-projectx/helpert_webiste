import apiClient from "../config/apiClient";
import ApiEndpoints from "../config/apiEndpoints";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

interface GuestLoginResponse {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  jwt_token: string;
  x_api_key: string;
}

// Guest Login
export const guestLogin = async (): Promise<GuestLoginResponse> => {
  try {
    console.log('Attempting guest login');
    const response = await apiClient.get(ApiEndpoints.guestLogin);
    
    if (response.status === 200 && response.data?.body?.status === true) {
      const data = response.data.body.data as GuestLoginResponse;
      
      // Save JWT token to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("jwtToken", data.jwt_token);
        localStorage.setItem("x_api_key", data.x_api_key);
      }
      
      console.log('Guest login successful');
      return data;
    } else {
      throw new Error(response.data?.body?.message || 'Failed to log in as a guest');
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error('Guest login error:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      url: err.config?.url
    });
    throw new Error(err.response?.data?.body?.message || "Failed to log in as a guest. Please try again.");
  }
};