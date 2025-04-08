import { Appointment, AppointmentFilters, AppointmentResponse } from '@/types/appointment';
import ApiEndpoints from '../config/apiEndpoints';
import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.helperts.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentService = {
  // Get all appointments with optional filters
  getAllAppointments: async (filters?: AppointmentFilters): Promise<AppointmentResponse> => {
    console.log('Fetching appointments with filters:', filters);
    try {
      const response = await axiosInstance.get(ApiEndpoints.getAllAppointments, { params: filters });
      console.log('Appointments API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  // Get appointment details by ID
  getAppointmentDetails: async (appointmentId: string): Promise<Appointment> => {
    console.log('Fetching appointment details for ID:', appointmentId);
    try {
      const response = await axiosInstance.get(`${ApiEndpoints.getAppointmentDetails}${appointmentId}`);
      console.log('Appointment details API response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  // Book a new appointment
  bookAppointment: async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
    console.log('Booking appointment with data:', appointmentData);
    try {
      const response = await axiosInstance.post(ApiEndpoints.bookAppointment, appointmentData);
      console.log('Book appointment API response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (appointmentId: string, status: Appointment['status']): Promise<Appointment> => {
    console.log('Updating appointment status:', { appointmentId, status });
    try {
      const response = await axiosInstance.put(`${ApiEndpoints.updateAppointmentStatus}${appointmentId}`, { status });
      console.log('Update appointment status API response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  // Update appointment details
  updateAppointment: async (appointmentId: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    console.log('Updating appointment details:', { appointmentId, appointmentData });
    try {
      const response = await axiosInstance.put(`${ApiEndpoints.updateAppointment}${appointmentId}`, appointmentData);
      console.log('Update appointment API response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  // Get Agora token for video call
  getAgoraToken: async (appointmentId: string): Promise<{ token: string }> => {
    console.log('Getting Agora token for appointment:', appointmentId);
    try {
      const response = await axiosInstance.get(`${ApiEndpoints.getAgoraTokenByAppointmentId}?appointmentId=${appointmentId}`);
      console.log('Get Agora token API response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error getting Agora token:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  }
}; 