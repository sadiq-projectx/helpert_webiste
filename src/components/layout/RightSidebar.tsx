"use client";

import React from "react";

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-64 fixed right-4 top-[74px] bg-white shadow-md rounded-lg p-4 h-[calc(100vh-74px)] overflow-hidden">
      {/* Recommendations Section */}
      <h3 className="text-md font-semibold text-gray-700 mb-4">Recommended Experts</h3>
      <ul className="space-y-4">
        <li className="flex items-center gap-3">
          <img
            src="/assets/images/default-avatar.png"
            alt="Expert"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <div>
            <p className="text-sm font-medium">Jane Smith</p>
            <p className="text-xs text-gray-500">Astrologer</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <img
            src="/assets/images/default-avatar.png"
            alt="Expert"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <div>
            <p className="text-sm font-medium">Mark Johnson</p>
            <p className="text-xs text-gray-500">Yoga Trainer</p>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default RightSidebar;