import React from "react";
import { useTheme } from "../../context/ThemeConfig";

interface DividerWithTextProps {
  text: string;
}

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  const { themeColors } = useTheme(); // Access theme colors from ThemeContext

  return (
    <div className="flex items-center w-full">
      {/* Left Divider */}
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: themeColors.dividerColor }}
      ></div>

      {/* Text */}
      <span
        className="px-4 text-sm font-medium"
        style={{ color: themeColors.secondaryTextColor }}
      >
        {text}
      </span>

      {/* Right Divider */}
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: themeColors.dividerColor }}
      ></div>
    </div>
  );
};

export default DividerWithText;