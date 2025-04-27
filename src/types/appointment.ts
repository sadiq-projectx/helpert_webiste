export type AppointmentStatus = 'pending' | 'upcoming' | 'completed' | 'cancelled';

export interface Expert {
  id: string;
  name: string;
  profile_picture: string;
  specialization: string[];
  rating: number;
}

export interface Appointment {
  id: string;
  bookingId: string;
  expert: Expert;
  appointmentDate: string;
  timeSlot: string;
  appointmentStatus: string;
  appointmentApprovalStatus: string;
  discussion_topic: string;
  amount: number;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  type?: 'video' | 'audio' | 'chat';
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data: Appointment | Appointment[];
} 