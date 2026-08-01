"use client";

import React from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "180px 0 100px", textAlign: "center", flex: 1 }}>
        <div style={{ fontSize: "4rem", fontWeight: 900, color: "#38BDF8", marginBottom: "0.5rem" }}>404</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#FFF", marginBottom: "1rem" }}>
          Page Not Found
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
          The page or resource you are looking for has been moved or does not exist on Good Life.
        </p>
        <Link href="/" className="hero-cta-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
          Return to Homepage →
        </Link>
      </main>

      <Footer />
    </div>
  );
}
