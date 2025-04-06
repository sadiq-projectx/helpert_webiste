import React from "react";
import { ExpertProfile, Expertise } from "@/types/expert";
import { useTheme } from "@/context/ThemeConfig";

interface ExpertiseSectionProps {
  expert: ExpertProfile;
}

export default function ExpertiseSection({ expert }: ExpertiseSectionProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Get expertise list from either the direct property or from the nested body structure
  const expertiseList = expert.myExpertise || expert.body?.data?.profile?.myExpertise || [];
  
  console.log("ExpertiseSection - Full expert object:", expert);
  console.log("ExpertiseSection - Expertise data:", {
    myExpertise: expert.myExpertise,
    expertiseList,
    rawData: expert.body?.data?.profile?.myExpertise
  });

  if (expertiseList.length === 0) {
    return (
      <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
        <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Expertise
        </h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No expertise information available.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        My Expertise
      </h3>
      <div className="flex flex-wrap gap-2">
        {expertiseList.map((expertise, index) => (
          <ExpertiseTag 
            key={expertise.id || index} 
            name={expertise.expertise_name || expertise.expertiseName || ''} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </div>
  );
}

interface ExpertiseTagProps {
  name: string;
  isDarkMode: boolean;
}

function ExpertiseTag({ name, isDarkMode }: ExpertiseTagProps) {
  return (
    <span 
      className={`px-3 py-1 rounded-full text-sm ${
        isDarkMode 
          ? 'bg-blue-900/30 text-blue-300' 
          : 'bg-blue-100 text-blue-700'
      }`}
    >
      {name}
    </span>
  );
} 