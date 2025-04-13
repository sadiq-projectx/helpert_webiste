import React, { useState, useEffect } from "react";

interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  defaultDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Select date",
  required = false,
  error,
  defaultDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Set default date if value is empty and defaultDate is provided
  useEffect(() => {
    if (!value && defaultDate) {
      onChange(defaultDate);
    }
  }, [value, defaultDate, onChange]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          onChange={handleDateChange}
          required={required}
          className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;