"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getSharedItinerary } from "@/app/profile/data/adapters";

export default function ClaimItineraryForm() {
  const { getToken } = useAuth();
  const [shareCode, setShareCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleClaim = async () => {
    const token = await getToken();
    if (!token || shareCode.trim() === "") {
      setMessage("Please enter a valid share code.");
      return;
    }

    try {
      const result = await getSharedItinerary(shareCode, token);
      if (result) {
        setMessage("Itinerary successfully claimed!");
      } else {
        setMessage(
          "Invalid share code or itinerary already added or your own itinerary."
        );
      }
    } catch (error) {
      console.error("Error claiming shared itinerary:", error);
      setMessage("Error claiming itinerary.");
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow text-black">
      <h3 className="text-lg font-bold mb-2">Enter Code</h3>
      <input
        type="text"
        value={shareCode}
        onChange={(e) => setShareCode(e.target.value)}
        placeholder="Enter code..."
        className="w-full border p-2 rounded mb-2"
      />
      <button
        onClick={handleClaim}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Claim Itinerary
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
