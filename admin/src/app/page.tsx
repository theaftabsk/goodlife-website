"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootAdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/admin");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div style={{
      height: "100vh",
      background: "#070B19",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#38BDF8",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        border: "3px solid rgba(56, 189, 248, 0.2)",
        borderTopColor: "#38BDF8",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
    </div>
  );
}
