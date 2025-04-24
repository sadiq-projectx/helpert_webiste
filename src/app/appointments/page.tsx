'use client';

import React, { useState, useEffect } from 'react';
import { AppointmentStatus } from '@/types/appointment';
import { appointmentService } from '@/services/api/appointment/appointmentService';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tabs: { value: AppointmentStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

interface AppointmentResponse {
  success: boolean;
  message: string;
  data: Appointment[];
}

interface Appointment {
  id: string;
  bookingId: string;
  expert: {
    id: string;
    name: string;
    profile_picture: string;
    specialization: string[];
    rating: number;
  };
  appointmentDate: string;
  timeSlot: string;
  appointmentStatus: string;
  appointmentApprovalStatus: string;
  discussion_topic: string;
  amount: number;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AppointmentStatus>('pending');
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Tab changed, fetching appointments for:', activeTab);
    fetchAppointments();
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching appointments...', {
        activeTab,
        currentAppointments: allAppointments.length
      });
      
      const response = await appointmentService.getAllAppointments({ status: activeTab });
      console.log('📥 Raw API Response:', JSON.stringify(response, null, 2));
      
      if (response.success && Array.isArray(response.data)) {
        console.log('✅ Appointments fetched successfully:', {
          count: response.data.length
        });
        setAllAppointments(response.data);
      } else {
        console.error('❌ API returned unsuccessful response:', {
          success: response.success,
          message: response.message,
          data: response.data
        });
        setError(response.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('🚨 Error in fetchAppointments:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      setError('An error occurred while fetching appointments. Please try again later.');
    } finally {
      setLoading(false);
      console.log('🏁 Fetch appointments completed', {
        success: !error,
        appointmentsCount: allAppointments.length,
        hasError: !!error
      });
    }
  };

  const handleAppointmentClick = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}`);
  };

  // Filter appointments based on the active tab
  const filteredAppointments = allAppointments.filter(appointment => 
    appointment.appointmentStatus.toLowerCase() === activeTab.toLowerCase()
  );

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

      <Tabs defaultValue="pending" className="w-full">
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
            ) : filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => handleAppointmentClick(appointment.id)}
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