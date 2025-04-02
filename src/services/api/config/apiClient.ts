import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

// Base URL for the API
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables.");
}

// Create an Axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 60000, // 60 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken"); // Retrieve token from localStorage
      if (token) {
        config.headers.Authorization = token.startsWith("Bearer") ? token : `Bearer ${token}`; // Add Authorization header
      }
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors Globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token is invalid or expired.");
      // Optionally, redirect to login page or clear token
      if (typeof window !== "undefined") {
        localStorage.removeItem("jwtToken");
        window.location.href = "/auth/signin"; // Redirect to login page
      }
    } else if (error.response?.status === 500) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;