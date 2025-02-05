"use client";

import ItineraryForm from "./itinerary-form";
import { useUser } from "@clerk/clerk-react";
import { ItineraryFormInputs } from "./itinerary-form";
import Header from "../header";
import { useState } from "react";
import { fetchItinerary } from "./data/adapters";
import { Itinerary } from "@/app/types";
import ItineraryComponent from "@/app/itinerary-component";
import { Placeholder } from "@/app/dashboard/placeholder";
import ProtectedRoute from "@/app/protected";

export default function Dashboard() {
  const user = useUser();
  const clerkId: string | undefined = user?.user?.id;
  const [generatedItinerary, setGeneratedItinerary] =
    useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: ItineraryFormInputs) => {
    if (!clerkId) {
      alert("User not authenticated. Please sign in.");
      return;
    }
    setIsLoading(true);
    try {
      const itinerary = await fetchItinerary(data, clerkId);
      setGeneratedItinerary(itinerary);
    } catch (error) {
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <Header place="Dashboard" linkTo={"/profile"} linkToName="Profile" />

        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              AI Travel Planner
            </h2>
            <p className="text-gray-600">
              Create your perfect travel itinerary powered by AI
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 px-4">
            <div className="w-full lg:w-1/3">
              <ItineraryForm onSubmit={handleFormSubmit} />
            </div>

            {isLoading ? (
              <Placeholder />
            ) : (
              <ItineraryComponent
                generatedItinerary={generatedItinerary}
                clerkId={clerkId}
                type={"generated"}
              />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
