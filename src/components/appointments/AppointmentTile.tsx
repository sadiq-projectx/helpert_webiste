import React from 'react';
import Image from 'next/image';
import { Appointment } from '@/types/appointment';
import { format } from 'date-fns';
import { Video, Phone, MessageCircle, Calendar, Clock, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppointmentTileProps {
  appointment: Appointment;
  onStatusChange: (appointmentId: string, status: Appointment['status']) => void;
  onJoinCall: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
}

const getStatusColor = (status: Appointment['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getTypeIcon = (type: Appointment['type']) => {
  switch (type) {
    case 'video':
      return <Video className="w-4 h-4" />;
    case 'audio':
      return <Phone className="w-4 h-4" />;
    case 'chat':
      return <MessageCircle className="w-4 h-4" />;
    default:
      return <MessageCircle className="w-4 h-4" />;
  }
};

export const AppointmentTile: React.FC<AppointmentTileProps> = ({
  appointment,
  onStatusChange,
  onJoinCall,
  onReschedule,
  onCancel,
}) => {
  const formatDate = (dateString: string) => {
    try {
      // First try parsing the date string directly
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        // If invalid, try parsing the date parts separately
        const [year, month, day] = dateString.split('-').map(Number);
        if (year && month && day) {
          const newDate = new Date(year, month - 1, day);
          if (!isNaN(newDate.getTime())) {
            return format(newDate, 'EEEE, MMMM d, yyyy');
          }
        }
        return 'Invalid date';
      }
      
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formattedDate = formatDate(appointment.date);
  const status = appointment.status || 'pending';
  const isUpcoming = status === 'upcoming';
  const isPending = status === 'pending';
  const isCompleted = status === 'completed';

  const formatStatus = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={appointment.expertImage}
              alt={appointment.expertName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {appointment.expertName}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{appointment.time}</span>
              <span className="mx-2">•</span>
              {getTypeIcon(appointment.type)}
              <span className="ml-1">{appointment.type}</span>
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {formatStatus(status)}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isUpcoming && (
              <>
                <DropdownMenuItem onClick={() => onJoinCall(appointment.id)}>
                  Join Call
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onReschedule(appointment.id)}>
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCancel(appointment.id)}>
                  Cancel
                </DropdownMenuItem>
              </>
            )}
            {isPending && (
              <>
                <DropdownMenuItem onClick={() => onStatusChange(appointment.id, 'upcoming')}>
                  Accept
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(appointment.id, 'rejected')}>
                  Reject
                </DropdownMenuItem>
              </>
            )}
            {isCompleted && (
              <DropdownMenuItem onClick={() => onStatusChange(appointment.id, 'cancelled')}>
                Mark as Cancelled
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}; 