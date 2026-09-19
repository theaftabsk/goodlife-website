"use client";

import React, { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useAdminData } from "@/context/AdminDataContext";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useAdminData();
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isBuilder = pathname?.includes("/builder");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div style={{
        height: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#0F172A",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}>
        <style>{`
          @keyframes adminSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{
          width: "42px",
          height: "42px",
          border: "3px solid #E2E8F0",
          borderTopColor: "#2563EB",
          borderRadius: "50%",
          animation: "adminSpin 0.75s linear infinite",
          marginBottom: "1rem"
        }} />
        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.01em" }}>
          Loading Good Life CMS...
        </div>
        <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "0.25rem" }}>
          Verifying session credentials
        </div>
      </div>
    );
  }

  if (isBuilder) {
    return (
      <div style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden", background: "#F8FAFC", display: "flex", flexDirection: "column" }}>
        {children}
        {toast && (
          <div style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            background: "#0F172A",
            color: "#FFFFFF",
            padding: "0.85rem 1.4rem",
            borderRadius: "10px",
            boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            zIndex: 9999,
            fontSize: "0.86rem",
            fontWeight: 600,
            animation: "fadeIn 0.2s ease-out"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      {/* Persistent Left Sidebar */}
      <AdminSidebar />

      {/* Main Panel Viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader />
        
        <main style={{
          flex: 1,
          padding: "1.75rem 2.25rem",
          overflowY: "auto",
          maxWidth: "1600px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box"
        }}>
          {children}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          background: "#0F172A",
          color: "#FFFFFF",
          padding: "0.85rem 1.4rem",
          borderRadius: "10px",
          boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          zIndex: 9999,
          fontSize: "0.86rem",
          fontWeight: 600,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
