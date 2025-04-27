"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaCalendarAlt, FaVideo, FaComments, FaUser, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/home", icon: <FaHome /> },
    { label: "Meetings", href: "/appointments", icon: <FaCalendarAlt /> },
    { label: "Feed", href: "/feed", icon: <FaVideo /> },
    { label: "Messages", href: "/messages", icon: <FaComments /> },
    { label: "Profile", href: "/profile", icon: <FaUser /> },
  ];

  return (
    <aside
      className={`bg-white shadow-md rounded-lg p-4 w-64 md:w-72 h-auto md:h-screen fixed md:static transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/assets/images/default-avatar.png" // Replace with dynamic user profile picture
          alt="User Profile"
          className="w-20 h-20 rounded-full shadow-md"
        />
        <h2 className="mt-4 text-lg font-semibold">John Doe</h2> {/* Replace with dynamic user name */}
        <p className="text-sm text-gray-500">Software Engineer</p> {/* Replace with dynamic user role */}
      </div>

      {/* Navigation Items */}
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item.href}
            className={`flex items-center gap-3 p-3 rounded-md ${
              pathname === item.href ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            } transition`}
          >
            {item.icon}
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden absolute top-4 right-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-xl" />
      </button>
    </aside>
  );
};

export default Sidebar;
