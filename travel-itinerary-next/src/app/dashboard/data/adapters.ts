import { Itinerary } from "@/app/types";
import { ItineraryFormInputs } from "../itinerary-form";

const BASE_URL = "http://localhost:5001";

export const fetchItinerary = async (
  formData: ItineraryFormInputs,
  clerkId: string | undefined
): Promise<Itinerary | null> => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        clerk_id: clerkId,
        days: formData.days,
        country: formData.destination,
        type_of_activity: formData.preference,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch itinerary");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
};
