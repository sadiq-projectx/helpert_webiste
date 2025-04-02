"use client"; // Mark this component as a client component

import React from "react";

interface TextButtonWithSuffixIconProps {
  text: string; // The text to display on the button
  icon: string; // The class name for the icon (e.g., FontAwesome class)
  onClick: () => void; // Function to handle button click
  textColor?: string; // Text color
  iconColor?: string; // Icon color
  iconSize?: string; // Icon size
  textStyle?: React.CSSProperties; // Additional styles for the text
  padding?: string; // Padding inside the button
  backgroundColor?: string; // Background color of the button
  borderColor?: string; // Border color of the button
  borderRadius?: string; // Border radius of the button
  borderWidth?: string; // Border width of the button
  height?: string; // Height of the button
  width?: string; // Width of the button
}

const TextButtonWithSuffixIcon: React.FC<TextButtonWithSuffixIconProps> = ({
  text,
  icon,
  onClick,
  textColor = "black",
  iconColor = "black",
  iconSize = "24px",
  textStyle = {},
  padding = "12px",
  backgroundColor = "transparent",
  borderColor = "blue",
  borderRadius = "8px",
  borderWidth = "1px",
  height = "50px",
  width = "100%",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding,
        backgroundColor,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius,
        height,
        width,
        cursor: "pointer",
      }}
    >
      <span style={{ color: textColor, ...textStyle }}>{text}</span>
      <i
        className={icon}
        style={{
          color: iconColor,
          fontSize: iconSize,
          marginLeft: "8px",
        }}
      ></i>
    </button>
  );
};

export default TextButtonWithSuffixIcon;