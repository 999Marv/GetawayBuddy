import { Itinerary } from "@/app/types";

const BASE_URL = "http://localhost:5001";

export const fetchUserItineraries = async (
  clerkId: string,
  token: string
): Promise<Itinerary[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries?clerk_id=${clerkId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const saveUserItinerary = async (
  clerkId: string,
  itineraryId: number,
  token: string
): Promise<Itinerary> => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries/${clerkId}/${itineraryId}/save`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in saveUserItinerary:", error);
    throw error;
  }
};
