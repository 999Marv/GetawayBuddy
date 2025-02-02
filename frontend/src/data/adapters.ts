import { ItineraryFormInputs } from "../ItineraryForm";

const BASE_URL = "http://localhost:5001";

interface Itinerary {
  id: string;
  clerk_id: string;
  name: string;
  activity: Record<string, unknown>;
  saved: boolean;
  start_date?: string;
  end_date?: string;
  createdAt: string;
}

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
      body: JSON.stringify({
        clerk_id: clerkId,
        days: formData.days,
        country: formData.destination,
        type_of_activity: formData.preference,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch itinerary");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
};

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure correct format
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user itineraries");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    return [];
  }
};

export const saveItinerary = async (
  itineraryId: string,
  clerkId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries/${itineraryId}/save`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerk_id: clerkId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save itinerary");
    }
    return true;
  } catch (error) {
    console.error("Error saving itinerary:", error);
    return false;
  }
};

export const deleteItinerary = async (
  itineraryId: string,
  clerkId: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries/${itineraryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerk_id: clerkId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete itinerary");
    }
    return true;
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    return false;
  }
};
