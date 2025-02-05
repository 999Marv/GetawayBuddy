export interface Itinerary {
  name: string;
  id: number;
  activity: {
    activities: {
      [key: string]: {
        morning: string;
        afternoon: string;
        nighttime: string;
      };
    };
    description?: string;
  } | null;
  saved: boolean;
}
