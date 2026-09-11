"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function NotFound() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className={`not-found-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <main style={{ padding: "180px 1.5rem 100px", textAlign: "center", flex: 1 }}>
        <div style={{
          display: "inline-flex",
          padding: "0.4rem 1.2rem",
          borderRadius: "999px",
          background: "#EFF6FF",
          color: "#2563EB",
          fontSize: "0.85rem",
          fontWeight: 800,
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "1.2rem"
        }}>
          Error 404
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1.5px", marginBottom: "1rem" }}>
          Resource or Page Not Found
        </h1>
        <p style={{ color: "#64748B", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 2.2rem", lineHeight: 1.6, fontWeight: 500 }}>
          The operational page or document you are seeking has been repositioned or does not exist within the Good Life commerce blueprint.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              height: "50px",
              padding: "0 2rem",
              borderRadius: "12px",
              background: "#2563EB",
              color: "#FFFFFF",
              fontSize: "0.95rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <span>Return to Homepage</span>
            <span>→</span>
          </Link>
          <button
            type="button"
            onClick={() => setDiagOpen(true)}
            style={{
              height: "50px",
              padding: "0 2rem",
              borderRadius: "12px",
              background: "#FFFFFF",
              border: "1.5px solid #CBD5E1",
              color: "#0F172A",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: "pointer"
            }}
          >
            Run Commerce Diagnostic
          </button>
        </div>
      </main>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
