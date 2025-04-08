import React, { useState } from "react";

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="mt-6">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`flex-1 py-2 ${
            activeTab === "appointments"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveTab("sessions")}
          className={`flex-1 py-2 ${
            activeTab === "sessions"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Sessions
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "appointments" && <p>Appointments content here...</p>}
        {activeTab === "sessions" && <p>Sessions content here...</p>}
      </div>
    </div>
  );
};

export default ProfileTabs;