import apiClient from "../config/apiClient";
import { HomeScreenModel } from "@/app/types/homescreenModel";

export const fetchHomeScreenData = async (): Promise<HomeScreenModel> => {
  const response = await apiClient.get("/common/dashboard"); // Update the endpoint here
  return response.data;
};