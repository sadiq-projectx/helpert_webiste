"use client"; // Mark this component as a client component

import React from "react";

interface IconButtonProps {
  icon: string; // Class name for the icon (e.g., FontAwesome class)
  onClick: () => void; // Function to handle click events
  color?: string; // Icon color
  size?: string; // Icon size
  padding?: string; // Padding around the button
  backgroundColor?: string; // Background color of the button
  borderColor?: string; // Border color of the button
  borderRadius?: string; // Border radius of the button
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  color = "white",
  size = "24px",
  padding = "8px",
  backgroundColor = "blue",
  borderColor = "blue",
  borderRadius = "8px",
}) => {
  return (
    <div
      style={{
        padding,
        backgroundColor,
        borderRadius,
        border: `1px solid ${borderColor}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <i
        className={icon}
        style={{
          color,
          fontSize: size,
        }}
      ></i>
    </div>
  );
};

export default IconButton;