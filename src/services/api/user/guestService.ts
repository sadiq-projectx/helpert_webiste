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

// Guest Login
export const guestLogin = async (): Promise<LoginResponse> => {
  try {
    const response = await apiClient.get(ApiEndpoints.guestLogin);
    localStorage.setItem("jwtToken", response.data.token); // Save JWT token
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    throw new Error(err.response?.data?.message || "Failed to log in as a guest. Please try again.");
  }
};