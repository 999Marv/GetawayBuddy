"use client";

import { Itinerary } from "@/app/types";
import { Globe, Landmark, MapPin, Moon, Sun, Watch } from "lucide-react";

interface ItineraryComponentProps {
  generatedItinearay: Itinerary | null;
}

export default function ItineraryComponent({
  generatedItinerary,
}: ItineraryComponentProps) {
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
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {generatedItinerary.name || "Your Personalized Itinerary"}
                </h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {generatedItinerary.destination}
                </p>
              </div>
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
