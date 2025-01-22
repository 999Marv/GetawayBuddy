import ItineraryForm from "./ItineraryForm";

import { ItineraryFormInputs } from "./ItineraryForm";
import Header from "./Header";
import { useState } from "react";
import { fetchItinerary } from "./data/adapters";
import { Itinerary } from "./data/types";

export default function Dashboard() {
  const [userPreferences, setUserPreferences] = useState<ItineraryFormInputs>({
    destination: null,
    days: 1,
    preference: "mix",
  });

  const [generatedItinerary, setGeneratedItinerary] =
    useState<Itinerary | null>(null);

  const handleFormSubmit = async (data: ItineraryFormInputs) => {
    console.log("Form submitted:", data);
    setUserPreferences(data);

    const itinerary = await fetchItinerary(data);
    if (itinerary) {
      setGeneratedItinerary(itinerary);
    } else {
      alert("Failed to generate itinerary. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header place="Dashboard" linkTo={"/profile"} linkToName="Profile" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome to your AI Itinerary Maker
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 px-4">
          <div className="w-full lg:w-1/2">
            <ItineraryForm onSubmit={handleFormSubmit} />
          </div>

          <div className="w-full lg:w-1/2 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Your Generated Itinerary
            </h3>
            {generatedItinerary ? (
              <div className="text-gray-600">
                {Object.entries(generatedItinerary).map(([day, activities]) => (
                  <div key={day} className="mb-4">
                    <h4 className="text-md font-bold">{day}</h4>
                    <p>
                      <strong>Morning:</strong> {activities.morning}
                    </p>
                    <p>
                      <strong>Afternoon:</strong> {activities.afternoon}
                    </p>
                    <p>
                      <strong>Night:</strong> {activities.night}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No itinerary generated yet. Please fill out the form to get
                started.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
