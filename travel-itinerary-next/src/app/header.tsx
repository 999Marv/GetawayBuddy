"use client";

import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isDashboardActive = pathname.startsWith("/dashboard");
  const isProfileActive = pathname.startsWith("/profile");

  const activeClasses =
    "bg-travel-blue hover:bg-travel-blue/80 text-white font-bold py-1 px-2 sm:px-3 rounded-md text-xs sm:text-sm transition duration-150";
  const inactiveClasses = "text-base sm:text-lg font-medium text-travel-blue";

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold text-travel-default">
              GetawayBuddy
            </h1>
          </Link>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/dashboard">
              <span
                className={isDashboardActive ? activeClasses : inactiveClasses}
              >
                Dashboard
              </span>
            </Link>
            <Link href="/profile">
              <span
                className={isProfileActive ? activeClasses : inactiveClasses}
              >
                Profile
              </span>
            </Link>
          </div>
        </div>

        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
