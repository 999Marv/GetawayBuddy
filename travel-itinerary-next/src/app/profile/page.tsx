"use client";

import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Header from "../header";
import { Itinerary } from "@/app/types";
import ItineraryComponent from "@/app/itinerary-component";
import { fetchUserItineraries } from "@/app/profile/data/adapters";
import { ChevronDown, Star } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(
    null
  );

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

  const toggleItinerary = (itineraryId: string) => {
    setExpandedItinerary((prev) => (prev === itineraryId ? null : itineraryId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header place="Profile" linkTo="/dashboard" linkToName="Dashboard" />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Travel Plans
          </h1>
          <p className="text-gray-600 mt-2">
            {loading ? "Loading your adventures..." : "Click to view details"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 shadow animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))
          ) : itineraries.length > 0 ? (
            itineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItinerary(itinerary.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {itinerary.name}
                      <Star className={`w-5 h-5 text-blue-500 fill-blue-500`} />
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {Object.keys(itinerary.activity).length} days ·{" "}
                      {itinerary.location}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      expandedItinerary === itinerary.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedItinerary === itinerary.id && (
                  <div className="p-6 border-t border-gray-100 animate-slideDown flex justify-center">
                    <ItineraryComponent
                      generatedItinerary={itinerary}
                      clerkId={String(user?.id)}
                    />
                  </div>
                )}
              </div>
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
