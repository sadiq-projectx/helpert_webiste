import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: string[];
  selectedCategories: Set<string>;
  onCategorySelect: (category: string) => void;
  isLoading: boolean;
}

export function CategoryTabs({
  categories,
  selectedCategories,
  onCategorySelect,
  isLoading
}: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto py-2 px-4 gap-4 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => !isLoading && onCategorySelect(category)}
          disabled={isLoading}
          className={cn(
            "px-6 py-2 rounded-full text-sm whitespace-nowrap transition-all",
            "border border-gray-200 dark:border-gray-700",
            "hover:shadow-md",
            selectedCategories.has(category)
              ? "bg-primary text-white shadow-primary/25"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 