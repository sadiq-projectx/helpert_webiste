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

// Sign up a new user
export const signUpUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(ApiEndpoints.register, { email, password });

    // Log the full response to inspect the structure
    console.log("Signup Response:", response.data);

    // Extract the nested token and other data
    const { jwt_token, user_id, email: userEmail } = response.data.body.data;

    // Save the token and other details in localStorage
    localStorage.setItem("jwtToken", jwt_token);
    localStorage.setItem("userId", user_id);

    return {
      token: jwt_token,
      user: {
        id: user_id,
        email: userEmail,
        name: "", // Add name if available in the response
      },
    };
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Signup Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.body?.message || "Failed to sign up. Please try again.");
  }
};

// Login with Email/Username and Password
export const loginUser = async (
  emailOrUsername: string,
  password: string,
  fcmToken: string
): Promise<LoginResponse> => {
  try {
    const isEmail = emailOrUsername.includes("@");
    const payload = {
      [isEmail ? "email" : "username"]: emailOrUsername,
      password,
      fcm_token: fcmToken,
      timestamp: new Date().toISOString(),
    };

    const response = await apiClient.post(ApiEndpoints.login, payload);

    // Log the full response for debugging
    console.log("Login Response:", response.data);

    if (!response.data?.body?.data) {
      throw new Error("Invalid response format from server");
    }

    const { jwt_token, user_id, email: userEmail } = response.data.body.data;

    if (!jwt_token || !user_id) {
      throw new Error("Missing authentication data in response");
    }

    // Save the token and other details in both localStorage and sessionStorage
    localStorage.setItem("jwtToken", jwt_token);
    localStorage.setItem("userId", user_id);
    sessionStorage.setItem("jwtToken", jwt_token);
    sessionStorage.setItem("userId", user_id);

    return {
      token: jwt_token,
      user: {
        id: user_id,
        email: userEmail,
        name: "", // Add name if available in the response
      },
    };
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Login Error:", err.response?.data || err.message);
    
    // Clear any existing tokens on error
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("userId");
    
    throw new Error(err.response?.data?.body?.message || "Failed to log in. Please try again.");
  }
};