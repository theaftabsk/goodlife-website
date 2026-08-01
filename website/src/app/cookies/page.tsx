"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CookiesPage() {
  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "140px 0 80px", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFF", marginBottom: "1rem" }}>
          Cookie Policy
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Last Updated: July 2026 · Good Life Sutra Pvt. Ltd.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#D1D5DB", lineHeight: 1.7, fontSize: "0.95rem" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>1. How We Use Cookies</h2>
            <p style={{ color: "#9CA3AF" }}>
              We use essential cookies and analytics tags (GA4, GTM) to track session parameters, measure page performance, and ensure smooth diagnostic form navigation.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
