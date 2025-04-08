import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons"; // Import LinkedIn icon
import { useTheme } from "../../contexts/ThemeConfig"; // Import the theme context

const SocialLoginWidget: React.FC = () => {
  const { themeColors } = useTheme(); // Access theme colors from ThemeContext

  return (
    <div className="flex space-x-4">
      {/* Google Login Button */}
      <button
        onClick={() => console.log("Google Login")}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg"
        style={{
          backgroundColor: themeColors.surfaceColor, // Theme-aware background
          color: themeColors.textColor, // Theme-aware text color
        }}
      >
        <FontAwesomeIcon icon={faGoogle} className="text-red-500" size="lg" />
      </button>

      {/* LinkedIn Login Button */}
      <button
        onClick={() => console.log("LinkedIn Login")}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg"
        style={{
          backgroundColor: themeColors.surfaceColor, // Theme-aware background
          color: themeColors.textColor, // Theme-aware text color
        }}
      >
        <FontAwesomeIcon icon={faLinkedin} className="text-blue-700" size="lg" />
      </button>
    </div>
  );
};

export default SocialLoginWidget;