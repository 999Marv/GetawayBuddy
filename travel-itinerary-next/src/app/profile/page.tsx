"use client";

import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Header from "../header";
import { Itinerary } from "@/app/types";
// import { Skeleton } from "@/components/ui/skeleton"; // Add a skeleton component
import ItineraryComponent from "@/app/itinerary-component";
import { fetchUserItineraries } from "@/app/profile/data/adapters";

export default function ProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        if (!user?.id) return;

        const token = await getToken();
        const data = await fetchUserItineraries(user.id, token || "");
        setItineraries(data);
        setError(null);
      } catch (err) {
        setError("Failed to load itineraries. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadItineraries();
  }, [user?.id, getToken]);

  console.log(itineraries);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header place="Profile" linkTo="/dashboard" linkToName="Dashboard" />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Travel Plans
          </h1>
          <p className="text-gray-600 mt-2">
            {loading
              ? "Loading your adventures..."
              : "Manage and view your saved itineraries"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                // <Skeleton key={i} className="h-48 w-full rounded-xl" />
                <h1 key={i}>i</h1>
              ))
          ) : itineraries.length > 0 ? (
            itineraries.map((itinerary, id) => (
              <ItineraryComponent
                key={id}
                generatedItinerary={itinerary}
                clerkId={String(user?.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                No saved itineraries found. Start planning your next adventure!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
