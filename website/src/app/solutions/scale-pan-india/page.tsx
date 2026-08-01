"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import "../../home.css";

export default function ScalePanIndiaPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">🌐 Solution 03</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Scale Pan-India — 12-State Fulfilment & B2B
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            For brands ready to scale multi-state inventory placement, regional dealer replenishment, and institutional procurement.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn" style={{ margin: "2rem auto 0" }}>
            Request a Commerce Diagnostic
          </button>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>12-State Warehousing</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Multi-location stock placement for fast delivery speeds and regional CNF support.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>B2B & Dealer Commerce</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Bulk quotation handling, institutional order workflows, and IndiaMART/TradeIndia fulfillment.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>D2C & Marketplace Sync</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Unified inventory allocation across all retail and enterprise channels.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
