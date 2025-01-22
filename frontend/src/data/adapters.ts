import { ItineraryFormInputs } from "../ItineraryForm";

const BASE_URL = "http://localhost:5001/";

interface Itinerary {
  id: string;
  destination: string;
  days: number;
  preference: "eating" | "sightseeing" | "mix";
  saved: boolean;
  createdAt: string;
}

export const fetchItinerary = async (
  formData: ItineraryFormInputs
): Promise<Itinerary | null> => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
  userId: string
): Promise<Itinerary[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/itineraries`);
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
  itinerary: Omit<Itinerary, "id" | "createdAt">
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    });
    if (!response.ok) {
      throw new Error("Failed to save itinerary");
    }
    return true;
  } catch (error) {
    console.error("Error saving itinerary:", error);
    return false;
  }
};

export const deleteItinerary = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries/${id}`, {
      method: "DELETE",
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
