"use client";

import { SignInButton } from "@clerk/nextjs";

interface LandingContentProps {
  handleGetStarted: () => void;
  isSignedIn: boolean | undefined;
}

export default function LandingContent({
  handleGetStarted,
  isSignedIn,
}: LandingContentProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-16">
      <section>
        <h2 className="text-3xl font-bold text-travel-default mb-6 text-center">
          See Our App in Action
        </h2>
        <div className="space-y-12">
          <div className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-xl">
            <video
              src="/landin1.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <p className="p-4 text-center text-gray-700">
              This video gives a complete tour of the website.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-xl">
            <div className="w-full h-56 flex justify-center items-center bg-gray-200">
              <video
                src="/location.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="p-4 text-center text-gray-700">
              This video shows how you can add a location that isn’t available
              in the dropdown.
            </p>
          </div>

          {/* Video 3: Sharing & Deleting Itineraries */}
          <div className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-xl">
            <video
              src="/merged-share.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <p className="p-4 text-center text-gray-700">
              This video demonstrates generating a share code, claiming a shared
              itinerary, and deleting it.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-travel-default mb-6 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Generated Itineraries
            </h3>
            <p className="text-gray-600">
              Let our AI craft personalized travel itineraries based on your
              preferences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Sharing
            </h3>
            <p className="text-gray-600">
              Easily share itineraries with friends and family using a unique
              share code.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Customized Planning
            </h3>
            <p className="text-gray-600">
              Every itinerary is tailored to your unique travel style, ensuring
              a personalized journey every time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-xl mb-6">
          {isSignedIn
            ? "Create your personalized itinerary now!"
            : "Sign in to create your personalized itinerary."}
        </p>
        {isSignedIn ? (
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition"
          >
            Create New Itinerary
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition">
              Get Started
            </button>
          </SignInButton>
        )}
      </section>
    </div>
  );
}
