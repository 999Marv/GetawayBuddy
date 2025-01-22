import { useState } from "react";
import Header from "./Header";

export default function Profile() {
  const [itineraries, setItineraries] = useState(0);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header place="Profile" linkTo={"/dashboard"} linkToName="Dashboard" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-800">
            {itineraries ? (
              <p>Here are your saved itineraries</p>
            ) : (
              <p>You don't have any saved itineraries</p>
            )}
          </h2>
        </div>
      </main>
    </div>
  );
}
