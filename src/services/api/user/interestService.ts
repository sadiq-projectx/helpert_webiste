import apiClient from "../config/apiClient";
import ApiEndpoints from "../config/apiEndpoints";

// Fetch all interests from the API
export const fetchAllInterests = async () => {
  try {
    const response = await apiClient.get(ApiEndpoints.getAllInterests);

    console.log("Raw API Response:", response.data);

    // Validate and extract the array of interests
    if (
      response.data &&
      response.data.status === 200 &&
      response.data.body?.status === true &&
      Array.isArray(response.data.body.data)
    ) {
      return response.data.body.data; // Return the array of interests
    } else {
      console.error("Invalid response format:", response.data);
      throw new Error("Invalid response format: Expected an array");
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      alert("Session expired. Please log in again.");
      window.location.href = "/auth/signin"; // Redirect to login page
    } else {
      console.error("Error fetching interests:", error.message);
    }
    throw error;
  }
};

// Add user-selected interests to the backend
export const addUserInterests = async (interests: string[]) => {
  try {
    const response = await apiClient.post(ApiEndpoints.addUserInterest, {
      interests, // Send the selected interests
    });

    console.log("Add Interests Response:", response.data);

    if (response.status === 200 && response.data.body?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to save interests");
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      alert("Session expired. Please log in again.");
      window.location.href = "/auth/signin"; // Redirect to login page
    } else {
      console.error("Error saving interests:", error.message);
    }
    throw error;
  }
};