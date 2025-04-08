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

// Request Interceptor: Add Authorization Header and x-api-key
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      // Add Authorization header if token exists
      const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      if (token) {
        // Ensure token has Bearer prefix
        const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        config.headers.Authorization = formattedToken;
        
        // Log token for debugging (remove in production)
        console.log("Using token:", formattedToken.substring(0, 20) + "...");
      } else {
        console.log("No token found in storage");
      }
      
      // Add x-api-key header if it exists
      const xApiKey = localStorage.getItem("x_api_key");
      if (xApiKey) {
        config.headers["x-api-key"] = xApiKey;
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
      // Clear tokens and redirect to login page
      if (typeof window !== "undefined") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("userId");
        window.location.href = "/auth/signin";
      }
    } else if (error.response?.status === 403) {
      console.error("Forbidden: You don't have permission to access this resource.");
      // For 403 errors, we might want to handle differently than 401
      // For now, we'll just log it
    } else if (error.response?.status === 500) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;