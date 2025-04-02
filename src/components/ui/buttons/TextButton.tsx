"use client"; // Mark this component as a client component

import React from "react";

interface TextButtonProps {
  text: string; // The text to display on the button
  onClick: () => void; // Function to handle button click
  textColor?: string; // Text color
  backgroundColor?: string; // Background color
  borderColor?: string; // Border color
  height?: string; // Height of the button
  padding?: string; // Padding inside the button
  textSize?: string; // Font size of the text
  fontWeight?: string; // Font weight of the text
  borderRadius?: string; // Border radius of the button
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  textColor = "white",
  backgroundColor = "blue",
  borderColor = "transparent",
  height = "50px",
  padding = "12px",
  textSize = "16px",
  fontWeight = "600",
  borderRadius = "8px",
  className = "",
  disabled = false, // Default value for disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // Apply the disabled prop
      style={{
        backgroundColor: disabled ? "#d1d5db" : backgroundColor, // Gray background when disabled
        color: disabled ? "#9ca3af" : textColor, // Gray text when disabled
        border: `1px solid ${disabled ? "#d1d5db" : borderColor}`, // Gray border when disabled
        height,
        padding,
        fontSize: textSize,
        fontWeight,
        borderRadius,
        cursor: disabled ? "not-allowed" : "pointer", // Change cursor when disabled
        width: "100%",
      }}
      className={`flex items-center justify-center ${className} ${
        disabled ? "opacity-50" : "hover:opacity-90 focus:ring-2 focus:ring-offset-2"
      }`}
    >
      {text}
    </button>
  );
};

export default TextButton;