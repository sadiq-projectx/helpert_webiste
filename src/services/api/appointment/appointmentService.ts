import { Appointment, AppointmentFilters, AppointmentResponse } from '@/types/appointment';
import ApiEndpoints from '../config/apiEndpoints';
import apiClient from '../config/apiClient';
import { AxiosError } from 'axios';

interface ApiResponse<T> {
  status: number;
  body: {
    status: boolean;
    message: string;
    data: T;
  };
}

interface AppointmentData {
  appointmentDetails: any[];
  appointmentExperts: any[];
}

export const appointmentService = {
  // Get all appointments with optional filters
  getAllAppointments: async (params: { status?: string }) => {
    try {
      const response = await apiClient.get<ApiResponse<AppointmentData>>(
        ApiEndpoints.getAllAppointments,
        { params }
      );
      
      // Transform the response to match the expected structure
      const transformedResponse: AppointmentResponse = {
        success: response.data.body.status,
        message: response.data.body.message,
        data: response.data.body.data.appointmentExperts.map(expert => ({
          id: expert.appointment_details.id,
          bookingId: expert.appointment_details.id,
          expert: {
            id: expert.user.id || '',
            name: expert.user.name,
            profile_picture: expert.user.profile_picture,
            specialization: [],
            rating: 0
          },
          appointmentDate: expert.appointment_details.date,
          timeSlot: expert.appointment_details.time,
          appointmentStatus: expert.appointment_details.status,
          appointmentApprovalStatus: expert.appointment_details.approval_status,
          discussion_topic: expert.discussion_topic,
          amount: 0
        }))
      };
      
      return transformedResponse;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Get appointment details by ID
  getAppointmentDetails: async (id: string) => {
    try {
      console.log('🔄 Fetching appointment details for ID:', id);
      console.log('📡 API Endpoint:', `${ApiEndpoints.getAppointmentDetails}${id}`);
      
      const response = await apiClient.get<ApiResponse<any>>(
        `${ApiEndpoints.getAppointmentDetails}${id}`
      );
      
      console.log('📥 Raw API Response:', JSON.stringify(response.data, null, 2));
      
      if (!response.data.body.data) {
        console.error('❌ No appointment data found in response');
        throw new Error('Appointment not found');
      }

      const appointmentData = response.data.body.data;
      
      // Transform the response to match the expected structure
      const transformedResponse: AppointmentResponse = {
        success: response.data.body.status,
        message: response.data.body.message,
        data: {
          id: appointmentData.booking_id,
          bookingId: appointmentData.booking_id,
          expert: {
            id: appointmentData.expert_id,
            name: appointmentData.expert_name,
            profile_picture: appointmentData.profile_picture,
            specialization: [appointmentData.expert_specialization],
            rating: appointmentData.expert_rating
          },
          appointmentDate: appointmentData.appointment_date,
          timeSlot: appointmentData.time_slot,
          appointmentStatus: appointmentData.appointment_status,
          appointmentApprovalStatus: appointmentData.appointment_approval_status,
          discussion_topic: appointmentData.additional_notes,
          amount: appointmentData.amount
        }
      };
      
      console.log('✨ Transformed response:', JSON.stringify(transformedResponse, null, 2));
      return transformedResponse;
    } catch (error) {
      console.error('🚨 Error in getAppointmentDetails:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  },

  // Book a new appointment
  bookAppointment: async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
    console.log('Booking appointment with data:', appointmentData);
    try {
      const response = await apiClient.post(ApiEndpoints.bookAppointment, appointmentData);
      console.log('Book appointment API response:', response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error booking appointment:', axiosError);
      if (axiosError.response) {
        console.error('API error details:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
        });
      }
      throw error;
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (id: string, status: string) => {
    try {
      const response = await apiClient.put<ApiResponse<AppointmentData>>(
        `${ApiEndpoints.updateAppointmentStatus}${id}`,
        { status }
      );
      
      if (!response.data.body.data.appointmentExperts || response.data.body.data.appointmentExperts.length === 0) {
        throw new Error('Appointment not found');
      }

      const expert = response.data.body.data.appointmentExperts[0];
      
      // Transform the response to match the expected structure
      const transformedResponse: AppointmentResponse = {
        success: response.data.body.status,
        message: response.data.body.message,
        data: {
          id: expert.appointment_details.id,
          bookingId: expert.appointment_details.id,
          expert: {
            id: expert.user.id || '',
            name: expert.user.name,
            profile_picture: expert.user.profile_picture,
            specialization: [],
            rating: 0
          },
          appointmentDate: expert.appointment_details.date,
          timeSlot: expert.appointment_details.time,
          appointmentStatus: expert.appointment_details.status,
          appointmentApprovalStatus: expert.appointment_details.approval_status,
          discussion_topic: expert.discussion_topic,
          amount: 0
        }
      };
      
      return transformedResponse;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  },

  // Update appointment details
  updateAppointment: async (appointmentId: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    console.log('Updating appointment details:', { appointmentId, appointmentData });
    try {
      const response = await apiClient.put(`${ApiEndpoints.updateAppointment}${appointmentId}`, appointmentData);
      console.log('Update appointment API response:', response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error updating appointment:', axiosError);
      if (axiosError.response) {
        console.error('API error details:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
        });
      }
      throw error;
    }
  },

  // Get Agora token for video call
  getAgoraToken: async (appointmentId: string): Promise<{ token: string }> => {
    console.log('Getting Agora token for appointment:', appointmentId);
    try {
      const response = await apiClient.get(`${ApiEndpoints.getAgoraTokenByAppointmentId}?appointmentId=${appointmentId}`);
      console.log('Get Agora token API response:', response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error getting Agora token:', axiosError);
      if (axiosError.response) {
        console.error('API error details:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
        });
      }
      throw error;
    }
  }
}; 