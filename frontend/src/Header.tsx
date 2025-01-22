import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  place: string;
  linkTo: string;
  linkToName: string;
}

export default function Header({ place, linkTo, linkToName }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-6">
          <h1 className="text-2xl font-semibold text-gray-900">{place}</h1>
          <button
            className="bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-2 px-5 sm:px-6 rounded-full text-base sm:text-lg transition duration-300 shadow-md"
            onClick={() => navigate(linkTo)}
          >
            {linkToName}
          </button>
        </div>
        <UserButton />
      </div>
    </header>
  );
}
