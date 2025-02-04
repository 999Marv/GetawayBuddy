"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getSharedItinerary } from "@/app/profile/data/adapters";

export default function ClaimItineraryForm() {
  const { getToken } = useAuth();
  const [shareCode, setShareCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<"black" | "green" | "red">(
    "black"
  );

  const handleClaim = async () => {
    const token = await getToken();
    if (!token || shareCode.trim() === "") {
      setMessage("Please enter a valid share code.");
      setMessageColor("red");
      return;
    }

    try {
      const result = await getSharedItinerary(shareCode, token);
      if (result) {
        setMessage("Itinerary successfully claimed!");
        setMessageColor("green");
      } else {
        setMessage(
          "Invalid share code or itinerary already added or your own itinerary."
        );
        setMessageColor("red");
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
        className="border p-2 rounded mb-2"
      />
      <button
        onClick={handleClaim}
        className="px-4 py-2 bg-travel-blue text-white rounded hover:bg-travel-blue/80 transition"
      >
        Claim Itinerary
      </button>
      {message && (
        <p className={`mt-2 text-sm text-${messageColor}-500`}>{message}</p>
      )}
    </div>
  );
}
