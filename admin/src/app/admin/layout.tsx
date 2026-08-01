import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Good Life Admin CMS | Enterprise Commerce Control Panel",
  description: "Manage Diagnostic Leads, Insights, Case Studies, FAQs, Media, and Site Settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, padding: 0, background: "#060B1A", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
