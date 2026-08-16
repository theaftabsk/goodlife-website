"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import "../../home.css";

export default function MarketplaceGrowthPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "860px" }}>
          <span className="diagnostic-step-pill">📈 Growth & Ads</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Performance Marketing Connected to Ecommerce Operations
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            Advertising performs best when listings, pricing, inventory, fulfilment and margin are managed together. Good Life currently operates Amazon and Flipkart performance campaigns as part of its ecommerce model and is expanding its D2C growth capability across Meta, SEO and social channels.
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
              <div style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>ESTABLISHED CAPABILITY</div>
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginTop: "0.4rem" }}>Amazon & Flipkart Advertising</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Campaign setup, keyword targeting, ACOS pacing, promotions, event planning, and buy box synergy.</p>
            </div>
            <div className="glass-card-feature">
              <div style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>ESTABLISHED CAPABILITY</div>
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginTop: "0.4rem" }}>Marketplace Growth Operations</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Listing conversion optimization, pricing rules, buy box preservation, and inventory availability.</p>
            </div>
            <div className="glass-card-feature">
              <div style={{ color: "#38BDF8", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>EXPANDING CAPABILITY</div>
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginTop: "0.4rem" }}>Meta, SEO & Social Marketing</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Developing in-house capability supporting D2C visibility, performance traffic, and brand search volume.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
