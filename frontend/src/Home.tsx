import ItineraryForm from "./ItineraryForm";
import { UserButton } from "@clerk/clerk-react";

import { ItineraryFormInputs } from "./ItineraryForm";

export default function Home() {
  const handleFormSubmit = (data: ItineraryFormInputs) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <UserButton />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome to your AI Itinerary Maker
          </h2>
          <ItineraryForm onSubmit={handleFormSubmit} />
        </div>
      </main>
    </div>
  );
}
