"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Category {
  specializationName: string;
  specializationImage: string;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/${encodeURIComponent(category.specializationName)}`);
  };

  return (
    <div className="my-4">
      <div className="flex overflow-x-auto space-x-4 px-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circular Avatar */}
            <div
              className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.specializationImage}
                alt={category.specializationName}
                className="w-18 h-18 rounded-full object-cover"
              />
            </div>

            {/* Category Name */}
            <p className="mt-2 text-sm text-gray-600 text-center truncate w-20">
              {category.specializationName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;