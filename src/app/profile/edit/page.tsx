"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/contexts/UserProfileContext";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import TextButton from "@/components/ui/buttons/TextButton";
import { updateUserProfile } from "@/services/api/user/profileService";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, isLoading, error, refreshProfile } = useUserProfile();
  
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await updateUserProfile({
        username,
        firstName,
        lastName,
        bio,
      });
      
      await refreshProfile();
      router.push("/profile");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <TextInput
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <TextInput
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        
        <TextInput
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        
        <TextArea
          id="bio"
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          maxLength={500}
        />
        
        <div className="flex gap-4 mt-6">
          <TextButton
            text={isSubmitting ? "Saving..." : "Save Changes"}
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            backgroundColor="blue"
            textColor="white"
          />
          
          <TextButton
            text="Cancel"
            onClick={() => router.push("/profile")}
            backgroundColor="transparent"
            textColor="gray"
            borderColor="gray"
          />
        </div>
      </form>
    </div>
  );
} 