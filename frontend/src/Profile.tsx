import { useEffect, useState } from "react";
import Header from "./Header";
import { fetchUserItineraries } from "./data/adapters";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Itinerary } from "./data/types";

export default function Profile() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const clerkId = user?.id;
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (clerkId) {
        try {
          const token = await getToken();
          console.log("Clerk token:", token); // Log token to confirm retrieval
          const itineraries = await fetchUserItineraries(clerkId, token);
          setItineraries(itineraries);
        } catch (error) {
          console.error("Error fetching itineraries:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItineraries();
  }, [clerkId, getToken]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header place="Profile" linkTo={"/dashboard"} linkToName="Dashboard" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {loading ? (
              <p>Loading your saved itineraries...</p>
            ) : itineraries.length > 0 ? (
              <p>Here are your saved itineraries:</p>
            ) : (
              <p>You don't have any saved itineraries</p>
            )}
          </h2>

          {!loading && itineraries.length > 0 && (
            <ul className="space-y-4">
              {itineraries.map((itinerary) => (
                <li
                  key={itinerary.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold">{itinerary.name}</h3>
                  <p className="text-gray-600">
                    Created on:{" "}
                    {new Date(itinerary.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
