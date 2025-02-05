"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return <>{children}</>;
}
