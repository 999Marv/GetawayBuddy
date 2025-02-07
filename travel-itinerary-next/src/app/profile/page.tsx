"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Header from "../header";
import ItineraryComponent from "@/app/itinerary-component";
import ClaimItineraryForm from "@/app/profile/get-shared-itinerary-form";
import { ChevronDown, Star } from "lucide-react";
import { Placeholder } from "@/app/profile/placeholder";
import { fetchUserItineraries } from "@/app/profile/data/adapters";
import ProtectedRoute from "@/app/protected";

interface Itinerary {
  id: number;
  name: string;
  activity: {
    activities: {
      [day: string]: { morning: string; afternoon: string; nighttime: string };
    };
    description?: string;
  } | null;
  saved: boolean;
}

interface ItineraryResponse {
  saved: Itinerary[];
  shared: Itinerary[];
}

export default function ProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [itineraries, setItineraries] = useState<ItineraryResponse>({
    saved: [],
    shared: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(
    null
  );

  const loadItineraries = useCallback(async () => {
    setLoading(true);
    try {
      if (!user?.id) return;
      const token = await getToken();
      const data: ItineraryResponse = await fetchUserItineraries(
        user.id,
        token || ""
      );
      setItineraries(data);
      setError(null);
    } catch (err) {
      setError("Failed to load itineraries. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, getToken]);

  useEffect(() => {
    loadItineraries();
  }, [loadItineraries]);

  const toggleItinerary = (itineraryId: number) => {
    setExpandedItinerary((prev) => (prev === itineraryId ? null : itineraryId));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center md:flex-row md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Travel Plans
            </h1>
            <div className="mt-4 md:mt-0">
              <ClaimItineraryForm onRefetch={loadItineraries} />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <Placeholder />
          ) : itineraries.saved.length === 0 &&
            itineraries.shared.length === 0 ? (
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
                No saved or shared itineraries found. Start planning your next
                adventure!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  My Saved Itineraries
                </h2>
                {itineraries.saved.length > 0 ? (
                  itineraries.saved.map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-6"
                    >
                      <button
                        onClick={() => toggleItinerary(itinerary.id)}
                        className="w-full p-6 text-left flex items-center justify-between gap-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            {itinerary.name}
                            <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {
                              Object.keys(itinerary.activity?.activities || {})
                                .length
                            }{" "}
                            {Object.keys(itinerary.activity?.activities || {})
                              .length > 1
                              ? "Days"
                              : "Day"}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-gray-400 transform transition-transform ${
                            expandedItinerary === itinerary.id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {expandedItinerary === itinerary.id && (
                        <div className="p-6 border-t border-gray-200 animate-slideDown flex justify-center">
                          <ItineraryComponent
                            generatedItinerary={itinerary}
                            clerkId={String(user?.id)}
                            type="saved"
                            onRefetch={loadItineraries}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">
                    No saved itineraries found.
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Itineraries Shared With Me
                </h2>
                {itineraries.shared.length > 0 ? (
                  itineraries.shared.map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-6"
                    >
                      <button
                        onClick={() => toggleItinerary(itinerary.id)}
                        className="w-full p-6 text-left flex items-center justify-between gap-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            {itinerary.name}
                            <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {
                              Object.keys(itinerary.activity?.activities || {})
                                .length
                            }{" "}
                            {Object.keys(itinerary.activity?.activities || {})
                              .length > 1
                              ? "Days"
                              : "Day"}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-gray-400 transform transition-transform ${
                            expandedItinerary === itinerary.id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {expandedItinerary === itinerary.id && (
                        <div className="p-6 border-t border-gray-200 animate-slideDown flex justify-center">
                          <ItineraryComponent
                            generatedItinerary={itinerary}
                            clerkId={String(user?.id)}
                            type="shared"
                            onRefetch={loadItineraries}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">
                    No shared itineraries found.
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
