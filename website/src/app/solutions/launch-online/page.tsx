"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import "../../home.css";

export default function LaunchOnlinePage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">🚀 Solution 01</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Launch Online — Marketplace & D2C Entry
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            For offline brands and product companies entering marketplaces and direct digital channels for the first time.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn" style={{ margin: "2rem auto 0" }}>
            Request for a FREE AUDIT →
          </button>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>1. Multi-Platform Onboarding</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Account creation across Amazon, Flipkart, Myntra, JioMart, Moglix, and D2C store.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>2. Cataloguing & Pricing</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>SEO listing creation, A+ content, price architecture, and margin protection.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700 }}>3. Warehouse Setup</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Stock allocation in regional warehouses for rapid dispatch SLAs.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
