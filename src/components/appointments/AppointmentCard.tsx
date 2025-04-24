import React from 'react';
import Image from 'next/image';
import { Video, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Expert {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  profile_picture: string;
}

interface Appointment {
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

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
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

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onClick }) => {
  const { expert, appointmentStatus, timeSlot } = appointment;

  return (
    <div className="p-4">
      <div 
        onClick={onClick}
        className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-4 cursor-pointer transition-all hover:shadow-md"
      >
        <div className="flex items-start space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={expert.profile_picture}
              alt={expert.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {expert.name}
            </h3>
            
            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Video className="w-4 h-4 mr-1 text-primary" />
              <span>Video call - </span>
              <span className={cn(
                "ml-1 px-2 py-0.5 rounded-full text-xs font-medium",
                getStatusColor(appointmentStatus)
              )}>
                {appointmentStatus}
              </span>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-1 text-primary" />
                <span>{timeSlot}</span>
              </div>
              
              <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10">
                <span className="text-xs font-medium text-primary">
                  Appointment
                </span>
              </div>
            </div>
          </div>
          
          <ArrowRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}; 