import apiClient from '../config/apiClient';
import ApiEndpoints from '../config/apiEndpoints';

export interface SearchExpertData {
  id: string;
  username: string | null;
  first_name: string;
  last_name: string;
  profile_picture: string;
  specialization: string;
  consultations: number;
  rating: number;
  isFollowing: boolean;
}

export interface SpecializationData {
  id: string;
  specialization_name: string;
  specialization_image: string;
}

export interface SearchResponse {
  status: number;
  body: {
    status: boolean;
    data: {
      experts: SearchExpertData[];
      totalItems: number;
      totalPages: number;
      currentPage: string;
    };
  };
}

export interface SpecializationsResponse {
  status: number;
  body: {
    status: boolean;
    message: string;
    data: SpecializationData[];
  };
}

class SearchService {
  async searchExperts(query: string, limit: number, page: number): Promise<SearchResponse> {
    try {
      console.log('Searching experts with query:', query, 'limit:', limit, 'page:', page);
      const response = await apiClient.get(ApiEndpoints.searchExperts, {
        params: {
          query,
          limit,
          page,
        },
      });
      console.log('Search API Response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Error searching experts:', error);
      throw error;
    }
  }

  async getSpecializations(): Promise<SpecializationsResponse> {
    try {
      console.log('Fetching specializations...');
      const response = await apiClient.get(ApiEndpoints.getSpecializations);
      console.log('Specializations API Response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Error fetching specializations:', error);
      throw error;
    }
  }
}

export const searchService = new SearchService(); 