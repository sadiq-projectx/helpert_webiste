import React from "react";

interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string; // Optional className for additional styling
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {/* Date Input */}
      <input
        id={id}
        type="date"
        value={value}
        onChange={handleDateChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
      />
    </div>
  );
};

export default DatePicker;