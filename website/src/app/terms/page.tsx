"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "140px 0 80px", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFF", marginBottom: "1rem" }}>
          Terms & Conditions
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Last Updated: July 2026 · Good Life Sutra Pvt. Ltd.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#D1D5DB", lineHeight: 1.7, fontSize: "0.95rem" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>1. Acceptance of Terms</h2>
            <p style={{ color: "#9CA3AF" }}>
              By accessing this platform, submitting a Commerce Diagnostic, or engaging our operating services, you agree to comply with these terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>2. Operating Scope</h2>
            <p style={{ color: "#9CA3AF" }}>
              Good Life acts as an Ecommerce Operating Partner. Platform performance, warehousing SLAs, and revenue assurance audits are governed under mutually signed client service agreements.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
