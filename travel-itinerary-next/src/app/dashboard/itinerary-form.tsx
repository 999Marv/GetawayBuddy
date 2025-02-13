"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import dynamic from "next/dynamic";
import cities from "./data/cities.json";

interface Option {
  value: string;
  label: string;
}

const CreatableSelectNoSSR = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

export interface ItineraryFormInputs {
  destination: string | null;
  days: number;
  preference: "eating" | "sightseeing" | "mix";
}

interface ItineraryFormProps {
  onSubmit: (data: ItineraryFormInputs) => void;
}

const initialCityOptions: Option[] = cities.map((city) => ({
  value: city,
  label: city,
}));

export default function ItineraryForm({ onSubmit }: ItineraryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ItineraryFormInputs>({
    defaultValues: {
      destination: null,
      days: 1,
      preference: "eating",
    },
  });

  const [cityOptions, setCityOptions] = useState<Option[]>(initialCityOptions);

  const onSubmitHandler: SubmitHandler<ItineraryFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white text-gray-700 shadow-md rounded-lg p-6 space-y-6 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Select or Enter a Destination
        </label>
        <Controller
          name="destination"
          control={control}
          rules={{ required: "Please select or enter a city" }}
          render={({ field: { value, onChange } }) => (
            <CreatableSelectNoSSR
              options={cityOptions}
              placeholder="Select or type your city..."
              isSearchable
              isClearable
              inputId="itinerary-city-select-input"
              instanceId="itinerary-city-select"
              value={
                cityOptions.find((option) => option.value === value) || null
              }
              onChange={(selectedOption) => {
                onChange((selectedOption as Option)?.value ?? null);
              }}
              onCreateOption={(newValue: string) => {
                const newOption: Option = { value: newValue, label: newValue };
                setCityOptions((prevOptions) => [...prevOptions, newOption]);
                onChange(newValue);
              }}
            />
          )}
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
          <option value="a mix of sightseeing and eating">A Mix</option>
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
        <button
          type="button"
          onClick={() => reset()}
          className="flex justify-center items-center"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
