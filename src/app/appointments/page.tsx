'use client';

import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '@/types/appointment';
import { appointmentService } from '@/services/api/appointment/appointmentService';
import { AppointmentTile } from '@/components/appointments/AppointmentTile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tabs: { value: AppointmentStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AppointmentStatus>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching appointments for tab:', activeTab);
      
      const response = await appointmentService.getAllAppointments({ status: activeTab });
      console.log('Appointments fetched successfully:', response);
      
      if (response.success) {
        setAppointments(response.data);
      } else {
        console.error('API returned unsuccessful response:', response);
        setError(response.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error in fetchAppointments:', error);
      setError('An error occurred while fetching appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId: string, status: AppointmentStatus) => {
    try {
      console.log('Changing appointment status:', { appointmentId, status });
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      console.log('Appointment status updated successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Failed to update appointment status. Please try again.');
    }
  };

  const handleJoinCall = async (appointmentId: string) => {
    try {
      console.log('Joining call for appointment:', appointmentId);
      const { token } = await appointmentService.getAgoraToken(appointmentId);
      console.log('Agora token received:', token);
      // Implement your video call logic here using the token
    } catch (error) {
      console.error('Error joining call:', error);
      setError('Failed to join the call. Please try again.');
    }
  };

  const handleReschedule = (appointmentId: string) => {
    console.log('Rescheduling appointment:', appointmentId);
    // Implement reschedule logic
  };

  const handleCancel = async (appointmentId: string) => {
    try {
      console.log('Cancelling appointment:', appointmentId);
      await appointmentService.updateAppointmentStatus(appointmentId, 'cancelled');
      console.log('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
        <Button onClick={() => router.push('/appointments/book')}>
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentTile
                    key={appointment.id}
                    appointment={appointment}
                    onStatusChange={handleStatusChange}
                    onJoinCall={handleJoinCall}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No appointments</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  You don't have any {tab.label.toLowerCase()} appointments.
                </p>
                <div className="mt-6">
                  <Button onClick={() => router.push('/appointments/book')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}