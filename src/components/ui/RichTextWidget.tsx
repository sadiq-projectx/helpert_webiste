import React from "react";
import { useTheme } from "../../context/ThemeConfig"; // Import the theme context

interface TextSegment {
  text: string;
  color?: string; // Optional color to allow fallback to theme colors
  onClick?: () => void;
}

interface RichTextWidgetProps {
  textSegments: TextSegment[];
}

const RichTextWidget: React.FC<RichTextWidgetProps> = ({ textSegments }) => {
  const { themeColors } = useTheme(); // Access theme colors from ThemeContext

  return (
    <p className="text-gray-700" style={{ color: themeColors.textColor }}>
      {textSegments.map((segment, index) => (
        <span
          key={index}
          style={{
            color: segment.color || themeColors.textColor, // Use segment color or fallback to theme text color
            cursor: segment.onClick ? "pointer" : "default",
          }}
          onClick={segment.onClick}
        >
          {segment.text}
        </span>
      ))}
    </p>
  );
};

export default RichTextWidget;