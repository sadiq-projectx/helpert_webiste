'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appointmentService } from '@/services/api/appointment/appointmentService';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function BookAppointmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement booking logic here
      await appointmentService.bookAppointment({
        // Add appointment details
      });
      router.push('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Book Appointment
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Add form fields here */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 