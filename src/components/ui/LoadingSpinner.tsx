import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  );
};

export default LoadingSpinner;