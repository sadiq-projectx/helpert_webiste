import React, { useState } from "react";
import { useTheme } from "../../../../contexts/ThemeConfig";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const { theme, themeColors } = useTheme();
  const isDarkMode = theme === "dark";
  const router = useRouter();

  // Empty arrays instead of mock data
  const appointments: any[] = [];
  const sessions: any[] = [];

  const handleFindExperts = () => {
    router.push("/experts");
  };

  return (
    <div className={`mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === "appointments"
              ? "border-b-2 border-blue-500 text-blue-500"
              : isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveTab("sessions")}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === "sessions"
              ? "border-b-2 border-blue-500 text-blue-500"
              : isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sessions
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={appointment.expertImage} 
                        alt={appointment.expertName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{appointment.expertName}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span className="mx-2">•</span>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{appointment.time}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium">No appointments</h3>
                <p className="mt-1 text-sm">You don't have any appointments scheduled.</p>
                <div className="mt-4">
                  <Button 
                    onClick={handleFindExperts}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Find Experts
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="space-y-4">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={session.expertImage} 
                        alt={session.expertName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{session.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">with {session.expertName}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(session.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span className="mx-2">•</span>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{session.time}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          session.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium">No sessions</h3>
                <p className="mt-1 text-sm">You don't have any sessions scheduled.</p>
                <div className="mt-4">
                  <Button 
                    onClick={handleFindExperts}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Find Experts
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;