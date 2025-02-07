import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albert = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetawayBuddy",
  description: "Plan your next trip using AI!",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider publishableKey={process.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <html lang="en">
          <body className={albert.className}>{children}</body>
        </html>
      </ClerkProvider>
    </html>
  );
}
