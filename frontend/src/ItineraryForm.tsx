import { useForm, SubmitHandler } from "react-hook-form";

export interface ItineraryFormInputs {
  destination: string;
  days: number;
  preference: "eating" | "sightseeing" | "mix";
}

interface ItineraryFormProps {
  onSubmit: (data: ItineraryFormInputs) => void;
}

export default function ItineraryForm({ onSubmit }: ItineraryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItineraryFormInputs>();

  const onSubmitHandler: SubmitHandler<ItineraryFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white shadow-md rounded-lg p-6 space-y-6 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Destination
        </label>
        <input
          {...register("destination", { required: "Destination is required" })}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-travel-blue focus:outline-none"
          placeholder="Enter your destination"
        />
        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">
            {errors.destination.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Number of Days
        </label>
        <select
          {...register("days", {
            required: "Please select the number of days",
            valueAsNumber: true,
          })}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-travel-blue focus:outline-none"
        >
          <option value="">Select Days</option>
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === 1 ? "day" : "days"}
            </option>
          ))}
        </select>
        {errors.days && (
          <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Preferences
        </label>
        <select
          {...register("preference", {
            required: "Please select a preference",
          })}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-travel-blue focus:outline-none"
        >
          <option value="">Select an option</option>
          <option value="eating">Eating</option>
          <option value="sightseeing">Sightseeing</option>
          <option value="a mix of eating and sightseeing">A Mix of both</option>
        </select>
        {errors.preference && (
          <p className="text-red-500 text-sm mt-1">
            {errors.preference.message}
          </p>
        )}
      </div>

      <div className="flex gap-6">
        <button
          type="submit"
          className="w-full bg-travel-blue text-white font-bold py-3 px-6 rounded-md hover:bg-travel-blue/80 transition duration-300"
        >
          Generate Itinerary
        </button>
        <button onClick={() => reset()}>
          <img src="../public/image.png" className="w-10" />
        </button>
      </div>
    </form>
  );
}
