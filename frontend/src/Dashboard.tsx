import ItineraryForm from "./ItineraryForm";

import { ItineraryFormInputs } from "./ItineraryForm";
import Header from "./Header";

export default function Dashboard() {
  const handleFormSubmit = (data: ItineraryFormInputs) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header place="Dashboard" linkTo={"/profile"} linkToName="Profile" />
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
