export type AppointmentStatus = 'pending' | 'upcoming' | 'completed' | 'rejected' | 'cancelled';

export interface Appointment {
  id: string;
  expertId: string;
  expertName: string;
  expertImage: string;
  userId: string;
  userName: string;
  userImage: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  type: 'video' | 'audio' | 'chat';
  price: number;
  currency: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  type?: 'video' | 'audio' | 'chat';
}

export interface AppointmentResponse {
  success: boolean;
  data: Appointment[];
  message?: string;
} 