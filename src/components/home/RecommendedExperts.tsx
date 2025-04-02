"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Expert {
  id: string;
  fullName: string;
  specialization: string;
  profilePicture: string;
  sessionRate: number;
  rating: number;
}

interface RecommendedExpertsProps {
  experts: Expert[];
  title: string;
  icon: string;
}

const RecommendedExperts: React.FC<RecommendedExpertsProps> = ({
  experts,
  title,
  icon,
}) => {
  const router = useRouter();

  const handleExpertClick = (expertId: string) => {
    router.push(`/expert/${expertId}`);
  };

  return (
    <div className="my-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Image src={icon} alt={title} width={22} height={20} />
        </div>
        <button
          onClick={() => router.push("/search")}
          className="text-blue-500 hover:underline text-sm"
        >
          View more
        </button>
      </div>

      {/* Experts List */}
      <div className="flex overflow-x-auto gap-4 px-4">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="flex-shrink-0 w-40 cursor-pointer"
            onClick={() => handleExpertClick(expert.id)}
          >
            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
              <Image
                src={expert.profilePicture}
                alt={expert.fullName}
                fill
                className="object-cover"
              />
            </div>

            {/* Expert Details */}
            <div className="mt-2 text-center">
              <h3 className="text-sm font-semibold truncate">
                {expert.fullName}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {expert.specialization}
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm mt-1">
                <span>⭐</span>
                <span>{expert.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm font-medium text-blue-600 mt-1">
                ₹{expert.sessionRate.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedExperts;