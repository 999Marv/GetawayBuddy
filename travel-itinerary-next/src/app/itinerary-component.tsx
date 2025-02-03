"use client";

import { Itinerary } from "@/app/types";
import { Landmark, MapPin, Moon, Sun, Watch, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { saveUserItinerary } from "@/app/profile/data/adapters";

interface ItineraryComponentProps {
  generatedItinerary: Itinerary | null;
  clerkId: string;
}

export default function ItineraryComponent({
  generatedItinerary,
  clerkId,
}: ItineraryComponentProps) {
  const { getToken } = useAuth();
  const [saved, setSaved] = useState(generatedItinerary?.saved);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    setSaved(generatedItinerary?.saved);
  }, [generatedItinerary]);

  const handleSaveItinerary = async () => {
    if (!generatedItinerary) return;
    try {
      const token = await getToken();
      await saveUserItinerary(clerkId, generatedItinerary.id, token || "");
      setSaved((prev) => !prev);
      setSavedMessage(saved ? "Unsaved." : "Saved!");
      setTimeout(() => setSavedMessage(null), 2000);
    } catch (error) {
      console.error("Error saving itinerary:", error);
      setSavedMessage("Failed to save itinerary.");
    }
  };

  const TimeSlot = ({
    title,
    icon,
    content,
  }: {
    title: string;
    icon: React.ReactNode;
    content: string;
  }) => (
    <div className="flex gap-4 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-2/3">
      {generatedItinerary?.activity ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {generatedItinerary.name || "Your Personalized Itinerary"}
                </h3>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              {savedMessage && (
                <p className="text-sm text-gray-500 bg-travel-default/35 px-2 py-1 rounded-md">
                  {savedMessage}
                </p>
              )}
              <button
                className="p-3 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-600/30"
                onClick={handleSaveItinerary}
              >
                <Star
                  className={`w-6 h-6 text-blue-600 ${
                    saved ? "fill-blue-600" : "fill-none"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {Object.entries(generatedItinerary.activity).map(
              ([day, activities], index) => (
                <div key={day} className="border-l-4 border-blue-100 pl-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Day {index + 1}
                    </h4>
                  </div>

                  <TimeSlot
                    title="Morning"
                    icon={<Sun className="w-4 h-4" />}
                    content={activities.morning}
                  />
                  <TimeSlot
                    title="Afternoon"
                    icon={<Watch className="w-4 h-4" />}
                    content={activities.afternoon}
                  />
                  <TimeSlot
                    title="Evening"
                    icon={<Moon className="w-4 h-4" />}
                    content={activities.nighttime}
                  />
                </div>
              )
            )}
            <p className="text-travel-default">
              <em>
                *Disclaimer: please look online to make sure that these
                locations are still accessible to the public ⛔️ and check
                weather forecasts to pack appropriate attire ⛈️
              </em>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <Landmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-gray-600">
              Fill out the travel preferences to generate your personalized
              AI-powered itinerary
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
