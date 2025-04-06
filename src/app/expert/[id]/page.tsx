"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeConfig";
import { getExpertProfile } from "@/services/api/expert/expertService";
import { ExpertProfile } from "@/types/expert";
import ExpertHeader from "./components/ExpertHeader";
import ExpertStats from "./components/ExpertStats";
import ExpertiseSection from "./components/ExpertiseSection";
import ExpertPortfolio from "./components/ExpertPortfolio";
import ExpertVideos from "./components/ExpertVideos";
import ExperienceCard from "./components/ExperienceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare } from "lucide-react";

export default function ExpertProfilePage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [expert, setExpert] = useState<ExpertProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpertData = async () => {
      if (!params?.id) {
        setError("Expert ID is required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const expertData = await getExpertProfile(params.id as string);
        
        console.log("ExpertProfilePage - Raw expert data:", expertData);
        console.log("ExpertProfilePage - Expertise data:", expertData.myExpertise);
        
        // Simply set the expert data as is, since our components handle missing fields
        setExpert(expertData as ExpertProfile);
      } catch (err) {
        console.error("Error fetching expert data:", err);
        setError(err instanceof Error ? err.message : "Failed to load expert profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpertData();
  }, [params?.id]);

  // Log the expert data whenever it changes
  useEffect(() => {
    if (expert) {
      console.log("ExpertProfilePage - Expert state updated:", expert);
      console.log("ExpertProfilePage - Expertise in state:", expert.myExpertise);
    }
  }, [expert]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || "Expert not found"}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExpertHeader expert={expert} />
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Call
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat
          </Button>
        </div>
        
        <div className="mt-8">
          <ExpertStats expert={expert} />
        </div>

        <div className="mt-8">
          <ExpertiseSection expert={expert} />
        </div>
        
        <div className="mt-8">
          <ExperienceCard expert={expert} />
        </div>

        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <ExpertPortfolio expert={expert} />
            </TabsContent>
            
            <TabsContent value="videos">
              <ExpertVideos expert={expert} />
            </TabsContent>
            
            <TabsContent value="sessions">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expert.sessions?.map((session, index) => (
                  <div key={index} className={`rounded-lg overflow-hidden shadow-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {session.title}
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {session.description}
                    </p>
                    <div className="mt-4">
                      <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        ₹{session.price.toLocaleString()}
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        / {session.duration} minutes
                      </span>
                    </div>
                  </div>
                ))}
                {(!expert.sessions || expert.sessions.length === 0) && (
                  <div className={`col-span-full text-center p-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No sessions available.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 