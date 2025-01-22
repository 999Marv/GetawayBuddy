import { useAuth, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative bg-gray-100 flex flex-col justify-center items-center px-4 py-16 md:py-24">
      {/* Sign-in button positioned separately */}
      <div className="absolute top-6 right-6">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-2 px-4 rounded transition duration-300">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-12 md:gap-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Traveling soon?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Taking forever to build that itinerary?
          </p>
          <p className="text-xl md:text-2xl font-semibold text-travel-default mb-8">
            Let AI plan your perfect trip in seconds!
          </p>

          {isSignedIn ? (
            <button
              onClick={handleGetStarted}
              className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
            >
              Go to Dashboard
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
                Get Started
              </button>
            </SignInButton>
          )}
        </div>

        {/* Image section */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md">
          <img
            src="/Trip-pana.png"
            alt="Travel Illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* GIF demonstration section */}
      <div className="w-full max-w-3xl mt-16 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/path-to-your-gif.gif"
          alt="AI Itinerary Maker Demo"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
