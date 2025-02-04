import { Itinerary } from "@/app/types";

const BASE_URL = "http://localhost:5001";

export const fetchUserItineraries = async (
  clerkId: string,
  token: string
): Promise<{ saved: Itinerary[]; shared: Itinerary[] }> => {
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
    return data; // { saved: [...], shared: [...] }
  } catch (error) {
    console.error("Fetch error:", error);
    return { saved: [], shared: [] };
  }
};

export const saveUserItinerary = async (
  clerkId: string,
  itineraryId: number,
  token: string
): Promise<Itinerary> => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries/${itineraryId}/save`,
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

export const shareItinerary = async (itineraryId: number, token: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries/${itineraryId}/share`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate share code");
    }

    const data = await response.json();
    return data.share_code;
  } catch (error) {
    console.error("Error sharing itinerary:", error);
    return null;
  }
};

export const getSharedItinerary = async (shareCode: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/itineraries/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ share_code: shareCode }),
    });

    if (!response.ok) {
      throw new Error("Failed to claim shared itinerary");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error claiming shared itinerary:", error);
    return null;
  }
};

export const removeSharedItinerary = async (
  itineraryId: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/itineraries/${itineraryId}/shared`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    console.error("Error removing shared itinerary:", error);
    throw error;
  }
};
