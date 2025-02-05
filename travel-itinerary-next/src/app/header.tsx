import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";

export default function Header({
  place,
  linkTo,
  linkToName,
}: {
  place: string;
  linkTo: string;
  linkToName: string;
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Section: Company Name and Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Company Name */}
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold text-travel-default">
              GetawayBuddy
            </h1>
          </Link>

          {/* Place and Link */}
          <div className="flex items-center gap-2 sm:gap-4">
            <h2 className="text-base sm:text-lg font-medium text-gray-700">
              {place}
            </h2>
            <Link
              href={linkTo}
              className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-1 px-2 sm:px-3 rounded-md text-xs sm:text-sm transition duration-150"
            >
              {linkToName}
            </Link>
          </div>
        </div>

        {/* Right Section: User Button */}
        <div className="flex-shrink-0">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
