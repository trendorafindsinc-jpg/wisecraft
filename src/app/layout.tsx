export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "WISECRAFT - Learn. Build. Prosper.",
  description:
    "WISECRAFT is an AI-powered financial education and entrepreneurship platform. Learn practical skills, discover opportunities, and grow your income with personalized AI guidance.",
  keywords: ["AI mentor", "financial education", "entrepreneurship", "skill building", "income growth"],
  authors: [{ name: "Trendorafinds" }],
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-surface dark:bg-navy-900 antialiased">
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <Navbar />
              <main>{children}</main>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
