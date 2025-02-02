import { Itinerary } from "@/app/types";

const BASE_URL = "http://localhost:5001";

const fetchHandler = async <T,>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
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
