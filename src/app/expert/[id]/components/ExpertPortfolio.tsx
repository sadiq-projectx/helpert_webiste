import React from "react";
import { ExpertProfile } from "@/types/expert";
import { useTheme } from "@/context/ThemeConfig";
import { Building2, User, Star, MapPin, FileText } from "lucide-react";

interface ExpertPortfolioProps {
  expert: ExpertProfile;
}

export default function ExpertPortfolio({ expert }: ExpertPortfolioProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Get portfolio data from the API response
  const portfolio = expert.body?.data?.portfolio as any;
  
  console.log("ExpertPortfolio - Portfolio data:", portfolio);
  console.log("ExpertPortfolio - Company name:", portfolio?.Company?.name);
  console.log("ExpertPortfolio - I_Am roles:", portfolio?.I_Am?.roles);
  console.log("ExpertPortfolio - Specialized_In:", portfolio?.Specialized_In);
  console.log("ExpertPortfolio - Location:", portfolio?.Location);
  
  if (!portfolio) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Portfolio
        </h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No portfolio information available.
        </p>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Experience
      </h2>
      
      <div className="space-y-6">
        <PortfolioItem 
          icon={<Building2 className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
          title="Company"
          value={portfolio.Company?.name || 'N/A'}
          isDarkMode={isDarkMode}
        />
        
        <PortfolioItem 
          icon={<User className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
          title="I am"
          value={portfolio.I_Am?.roles || 'N/A'}
          isDarkMode={isDarkMode}
        />
        
        <PortfolioItem 
          icon={<Star className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
          title="Specialized in"
          value={portfolio.Specialized_In || 'N/A'}
          isDarkMode={isDarkMode}
        />
        
        <PortfolioItem 
          icon={<MapPin className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
          title="Location"
          value={portfolio.Location || 'N/A'}
          isDarkMode={isDarkMode}
        />
        
        {expert.description && (
          <PortfolioItem 
            icon={<FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />}
            title="Description"
            value={expert.description}
            isDarkMode={isDarkMode}
            isDescription={true}
          />
        )}
      </div>
    </div>
  );
}

interface PortfolioItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  isDarkMode: boolean;
  isDescription?: boolean;
}

function PortfolioItem({ icon, title, value, isDarkMode, isDescription = false }: PortfolioItemProps) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isDescription ? 'whitespace-pre-line' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
} 