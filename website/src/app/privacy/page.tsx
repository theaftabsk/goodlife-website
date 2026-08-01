"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "140px 0 80px", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFF", marginBottom: "1rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Last Updated: July 2026 · Good Life Sutra Pvt. Ltd.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#D1D5DB", lineHeight: 1.7, fontSize: "0.95rem" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>1. Information We Collect</h2>
            <p style={{ color: "#9CA3AF" }}>
              We collect information you provide directly through our Commerce Diagnostic Tool, contact forms, or business enquiry submissions, including company name, designation, business email, phone number, category details, and operational parameters.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>2. Use of Diagnostic Data</h2>
            <p style={{ color: "#9CA3AF" }}>
              Diagnostic and enquiry submissions are strictly used to evaluate operating fit, calculate opportunity tags, and prepare tailored commerce proposals. We do not sell or share business lead data with unauthorized third parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>3. Data Security & CRM Integration</h2>
            <p style={{ color: "#9CA3AF" }}>
              Form data is encrypted and transferred via secure server-side API webhooks directly into our enterprise CRM system.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
