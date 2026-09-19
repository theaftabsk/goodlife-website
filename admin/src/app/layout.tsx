import type { Metadata } from "next";
import "./globals.css";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Good Life Admin CMS | Enterprise Commerce Control Panel",
  description: "Standalone Admin CMS Dashboard for Diagnostic Leads, Content, Platforms, and Operations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AdminDataProvider>
            {children}
          </AdminDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
