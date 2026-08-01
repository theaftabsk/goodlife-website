"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function CaseStudiesPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const caseStudies = [
    {
      title: "From OEM Manufacturer to ₹15 Cr/yr D2C Appliance Brand",
      category: "New Brand Launch",
      stats: "5.2x GMV Growth • 14% ACOS",
      desc: "Supported the launch, cataloguing, multi-state warehouse placement, and Amazon ads for a leading home appliance OEM."
    },
    {
      title: "Multi-Platform Expansion Across 6 Mainstream Marketplace Channels",
      category: "Multi-Platform",
      stats: "3.4x Channel Expansion",
      desc: "Scaled channel presence beyond Amazon/Flipkart into Myntra, JioMart, Moglix, and assisted-finance platforms."
    },
    {
      title: "End-to-End D2C Store Operations & Logistics Integration",
      category: "D2C",
      stats: "99.2% Same-Day Dispatch",
      desc: "Synchronized Shopify store orders with regional 12-state warehouse fulfillment and payment reconciliation."
    },
    {
      title: "Regional Warehouse Dealer Replenishment for B2B Electronics Brand",
      category: "B2B/Institutional",
      stats: "₹45 Cr B2B Volume Handled",
      desc: "Fulfilled corporate bulk orders, institutional bids, and regional dealer restocking with tax invoice compliance."
    }
  ];

  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter(cs => cs.category === activeFilter);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">🏆 Validated Outcomes</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Case Studies & Proof Gallery
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            Real operational case studies demonstrating marketplace growth, OEM brand incubation, D2C scale, and B2B fulfilment.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem" }}>
            {["All", "New Brand Launch", "Multi-Platform", "D2C", "B2B/Institutional"].map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "99px",
                  border: activeFilter === f ? "1px solid #38BDF8" : "1px solid rgba(255,255,255,0.1)",
                  background: activeFilter === f ? "rgba(56, 189, 248, 0.15)" : "rgba(255,255,255,0.03)",
                  color: activeFilter === f ? "#38BDF8" : "#9CA3AF",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((cs, idx) => (
              <div key={idx} className="glass-card-feature">
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "1px" }}>{cs.category}</span>
                <h3 style={{ color: "#FFF", fontSize: "1.25rem", fontWeight: 700, margin: "0.5rem 0" }}>{cs.title}</h3>
                <div style={{ color: "#38BDF8", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.8rem" }}>{cs.stats}</div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.6 }}>{cs.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
