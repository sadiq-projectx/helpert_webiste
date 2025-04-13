import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // Add maxLength property
  suffix?: React.ReactNode; // Optional suffix (e.g., password visibility toggle)
  className?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  required = false,
  maxLength, // Handle maxLength
  suffix,
  className = "",
  error,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {/* Input Field with Suffix */}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength} // Apply maxLength
          className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {/* Suffix */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextInput;