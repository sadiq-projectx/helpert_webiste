import React from "react";
import { ExpertProfile } from "@/types/expert";
import { useTheme } from "@/contexts/ThemeConfig";
import { Briefcase, MapPin, Building, Calendar, User, Star, FileText } from "lucide-react";

interface ExperienceCardProps {
  expert: ExpertProfile;
}

export default function ExperienceCard({ expert }: ExperienceCardProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Get portfolio data directly from the API response
  const portfolio = expert.body?.data?.portfolio as any;
  const allPortfolio = expert.body?.data?.allPortfolio || [];
  
  // Extract specific fields from the portfolio data
  const companyName = portfolio?.Company?.name;
  const role = portfolio?.I_Am?.roles;
  const specialization = portfolio?.Specialized_In;
  const location = portfolio?.Location;
  const experience = portfolio?.experience;
  const expertise = portfolio?.Your_Expertise || [];
  
  console.log("ExperienceCard - Company name:", companyName);
  console.log("ExperienceCard - Role:", role);
  console.log("ExperienceCard - Specialization:", specialization);
  console.log("ExperienceCard - Location:", location);
  console.log("ExperienceCard - Experience:", experience);
  console.log("ExperienceCard - Expertise:", expertise);

  // If no portfolio data is available, show a placeholder
  if (!portfolio && allPortfolio.length === 0) {
    return (
      <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
        <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Experience & Portfolio
        </h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No experience information available.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Experience & Portfolio
      </h3>
      
      {/* Display all portfolio items */}
      {allPortfolio.length > 0 && (
        <div className="space-y-6">
          {allPortfolio.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.company?.name || 'Company'}
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.role?.roles || 'Role'}
                  </p>
                </div>
                <div className="flex items-center">
                  <Calendar className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'Start date'} - 
                    {item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Present'}
                  </span>
                </div>
              </div>
              
              {item.description && (
                <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              )}
              
              {item.expertise && item.expertise.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.expertise.map((skill: string, skillIndex: number) => (
                    <span 
                      key={skillIndex}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Display the main portfolio data if no allPortfolio items */}
      {allPortfolio.length === 0 && portfolio && (
        <div className="space-y-6">
          {/* Company */}
          <div className="flex items-start">
            <Building className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Company
              </h3>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {companyName || 'N/A'}
              </p>
            </div>
          </div>
          
          {/* Role */}
          <div className="flex items-start">
            <User className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                I am
              </h3>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {role || 'N/A'}
              </p>
            </div>
          </div>
          
          {/* Specialization */}
          <div className="flex items-start">
            <Star className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Specialized in
              </h3>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {specialization || 'N/A'}
              </p>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-start">
            <MapPin className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Location
              </h3>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {location || 'N/A'}
              </p>
            </div>
          </div>
          
          {/* Experience */}
          {experience && (
            <div className="flex items-start">
              <Calendar className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Experience
                </h3>
                <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {experience}
                </p>
              </div>
            </div>
          )}
          
          {/* Expertise Tags */}
          {expertise.length > 0 && (
            <div className="mt-4">
              <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item: any, index: number) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode 
                        ? 'bg-blue-900/30 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.expertise_name || item.expertiseName || 'Expertise'}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Description */}
          {expert.description && (
            <div className="flex items-start">
              <FileText className={`w-5 h-5 mt-1 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Description
                </h3>
                <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} whitespace-pre-line`}>
                  {expert.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 