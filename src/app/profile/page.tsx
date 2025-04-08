import React from "react";
import HomeNormalUserProfile from "./components/HomeNormalUserProfile";

export default function ProfilePage() {
  // Mock user data (replace with actual API data)
  const user = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    profilePicture: "/default-avatar.png", // Replace with actual image URL
    bio: "I am a software engineer and tech enthusiast.",
    followers: 120,
    following: 80,
    joinedAt: "January 2023",
    isExpert: true, // Set to true if the user is an expert
  };

  return (
    <div>
      <HomeNormalUserProfile user={user} />
    </div>
  );
}