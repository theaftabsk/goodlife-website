import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Good Life Admin CMS | Enterprise Control Panel",
  description: "Standalone Admin CMS Dashboard for Diagnostic Leads, Content, RBAC, and Site Operations.",
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
      <body>{children}</body>
    </html>
  );
}
