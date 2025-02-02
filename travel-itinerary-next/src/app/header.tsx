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
        <div className="flex gap-6">
          <h1 className="text-2xl font-semibold text-gray-900">{place}</h1>
          <Link
            href={linkTo}
            className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            {linkToName}
          </Link>
        </div>
        <UserButton />
      </div>
    </header>
  );
}
