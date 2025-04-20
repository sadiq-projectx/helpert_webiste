import { Appointment, AppointmentFilters, AppointmentResponse } from '@/types/appointment';
import ApiEndpoints from '../config/apiEndpoints';
import apiClient from '../config/apiClient';
import { AxiosError } from 'axios';

export const appointmentService = {
  // Get all appointments with optional filters
  getAllAppointments: async (filters?: AppointmentFilters): Promise<AppointmentResponse> => {
    console.log('Fetching appointments with filters:', filters);
    try {
      const response = await apiClient.get(ApiEndpoints.getAllAppointments, { params: filters });
      console.log('Appointments API response:', response);
      
      // Transform the response to match the expected structure
      return {
        success: response.data.body.status,
        message: response.data.body.message,
        data: response.data.body.data.appointmentDetails || []
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching appointments:', axiosError);
      if (axiosError.response) {
        console.error('API error details:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
          headers: axiosError.response.headers,
        });
      }
      throw error;
    }
  },

  // Get appointment details by ID
  getAppointmentDetails: async (appointmentId: string): Promise<Appointment> => {
    console.log('Fetching appointment details for ID:', appointmentId);
    try {
      const response = await apiClient.get(`${ApiEndpoints.getAppointmentDetails}${appointmentId}`);
      console.log('Appointment details API response:', response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching appointment details:', axiosError);
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
  updateAppointmentStatus: async (appointmentId: string, status: Appointment['status']): Promise<Appointment> => {
    console.log('Updating appointment status:', { appointmentId, status });
    try {
      const response = await apiClient.put(`${ApiEndpoints.updateAppointmentStatus}${appointmentId}`, { status });
      console.log('Update appointment status API response:', response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error updating appointment status:', axiosError);
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