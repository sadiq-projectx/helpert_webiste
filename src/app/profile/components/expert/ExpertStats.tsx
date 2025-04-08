import React, { useState } from "react";
import { ExpertProfile } from "@/types/expert";
import { useTheme } from "@/contexts/ThemeConfig";
import { Book, Users, Calendar, Star, Briefcase } from "lucide-react";

interface ExpertStatsProps {
  expert: ExpertProfile;
}

export default function ExpertStats({ expert }: ExpertStatsProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle both old and new field names
  const sessionRate = expert.sessionRate || 
    expert.body?.data?.profile?.sessionRate || 
    0;
    
  const booked = expert.booked || 
    expert.appointments || 
    expert.body?.data?.profile?.booked || 
    0;
    
  const experience = expert.experience || 
    expert.body?.data?.profile?.experience || 
    '0';
    
  const rating = expert.rating || 
    expert.body?.data?.profile?.rating || 
    0;
    
  const consultations = expert.consultations || 
    expert.body?.data?.profile?.consultations || 
    0;

  console.log("ExpertStats - Expert data:", {
    sessionRate,
    booked,
    experience,
    rating,
    consultations,
    rawData: expert.body?.data?.profile
  });

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Session & Experience Details
        </h2>
        <button className="focus:outline-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke={isDarkMode ? 'white' : 'currentColor'}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatItem 
              icon={<Book className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
              value={`₹${sessionRate.toLocaleString()}`} 
              label="Session Price" 
              isDarkMode={isDarkMode} 
            />
            <StatItem 
              icon={<Users className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
              value={booked.toString()} 
              label="Booked" 
              isDarkMode={isDarkMode} 
            />
            <StatItem 
              icon={<Briefcase className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
              value={consultations.toString()} 
              label="Consultations" 
              isDarkMode={isDarkMode} 
            />
            <StatItem 
              icon={<Calendar className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
              value={experience} 
              label="Experience" 
              isDarkMode={isDarkMode} 
            />
            <StatItem 
              icon={<Star className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
              value={`${rating}+`} 
              label="Rating" 
              isDarkMode={isDarkMode} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  isDarkMode: boolean;
}

function StatItem({ icon, value, label, isDarkMode }: StatItemProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-1">{icon}</div>
      <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
        {value}
      </div>
      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </div>
    </div>
  );
} 