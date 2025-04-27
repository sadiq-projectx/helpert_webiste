'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { appointmentService } from '@/services/api/appointment/appointmentService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Video, MessageSquare, CreditCard, AlertCircle, Star, Phone, Mail, ChevronRight, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Appointment {
  id: string;
  bookingId: string;
  expert: {
    id: string;
    name: string;
    profile_picture: string;
    specialization: string[];
    rating: number;
    email?: string;
    phone?: string;
  };
  appointmentDate: string;
  timeSlot: string;
  appointmentStatus: string;
  appointmentApprovalStatus: string;
  discussion_topic: string;
  amount: number;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [params.id]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentService.getAppointmentDetails(params.id);
      if (response.success) {
        setAppointment(response.data);
      } else {
        setError(response.message || 'Failed to fetch appointment details');
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      setError('An error occurred while fetching appointment details');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCall = () => {
    router.push(`/video-call/${appointment?.bookingId}`);
  };

  const handleStartChat = () => {
    router.push(`/chat/${appointment?.expert.id}`);
  };

  const handleCancelAppointment = () => {
    console.log('Cancel appointment:', appointment?.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'Appointment not found'}</p>
          <Button onClick={() => router.push('/appointments')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/appointments')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Expert Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8 relative">
              {/* Three Dots Menu */}
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem 
                      onClick={handleCancelAppointment}
                      className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancel Appointment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Profile Picture */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 mb-6">
                    <Image
                      src={appointment.expert.profile_picture}
                      alt={appointment.expert.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {appointment.expert.name}
                  </h1>

                  {/* Specialization */}
                  {appointment.expert.specialization.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {appointment.expert.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {appointment.expert.rating}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <span className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium",
                      getStatusColor(appointment.appointmentStatus)
                    )}>
                      {appointment.appointmentStatus}
                    </span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex items-center gap-3">
                    {appointment.expert.phone && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-10 w-10"
                        title="Call"
                      >
                        <Phone className="w-5 h-5" />
                      </Button>
                    )}
                    {appointment.expert.email && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-10 w-10"
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Appointment Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time Slot</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {appointment.timeSlot}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Topic */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discussion Topic</h3>
              </div>
              <div className="pl-16">
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  {appointment.discussion_topic}
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Details</h3>
              </div>
              <div className="pl-16">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Session Fee</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{appointment.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Appointment Actions
                </h2>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full justify-between" 
                    onClick={handleJoinCall}
                    disabled={appointment.appointmentStatus !== 'Pending'}
                  >
                    <div className="flex items-center">
                      <Video className="w-5 h-5 mr-3" />
                      Join Video Call
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    className="w-full justify-between"
                    onClick={handleStartChat}
                    variant="outline"
                  >
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-3" />
                      Start Chat
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 