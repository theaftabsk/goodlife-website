"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CareersPage() {
  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "140px 0 80px", maxWidth: "900px" }}>
        <span className="section-tag">JOIN OUR OPERATING TEAM</span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFF", marginTop: "0.5rem", marginBottom: "1rem" }}>
          Careers at Good Life
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          We are building India&apos;s premier Ecommerce Operating Partner. Join a high-accountability team managing marketplace operations, performance marketing, warehousing, and revenue assurance.
        </p>

        <div style={{ display: "grid", gap: "1.25rem" }}>
          {[
            { role: "Marketplace Account Manager (Amazon & Flipkart)", dept: "Ecommerce Operations", loc: "Kolkata / Hybrid" },
            { role: "Performance Marketing Specialist (Meta & Ads)", dept: "Growth Marketing", loc: "Kolkata / Remote" },
            { role: "Supply Chain & Warehouse Analyst", dept: "Fulfilment Operations", loc: "Regional Network" },
            { role: "Revenue Reconciliation & Audit Analyst", dept: "Finance & Assurance", loc: "Kolkata HQ" }
          ].map((item, idx) => (
            <div key={idx} className="glass-card-feature" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase" }}>{item.dept}</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFF", margin: "0.2rem 0" }}>{item.role}</h3>
                <div style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>📍 {item.loc}</div>
              </div>
              <a href="mailto:careers@goodlifesutra.com" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem" }}>
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
