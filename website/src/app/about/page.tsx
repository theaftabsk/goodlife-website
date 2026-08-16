"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function AboutPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "900px" }}>
          <span className="diagnostic-step-pill">🏢 About Good Life</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Scale Ecommerce. <span style={{ color: "#38BDF8" }}>Not Complexity.</span>
          </h1>
          <p className="hero-description" style={{ color: "#CBD5E1", fontSize: "1.15rem", marginTop: "1.2rem", lineHeight: 1.6 }}>
            Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.
          </p>
        </div>
      </section>

      {/* Core Principle Banner */}
      <section style={{ padding: "2rem 0 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "16px",
            padding: "2rem 2.5rem",
            textAlign: "center"
          }}>
            <p style={{ color: "#38BDF8", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.8rem" }}>
              Our Operating Philosophy
            </p>
            <h3 style={{ fontSize: "1.25rem", color: "#F8FAFC", fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
              &ldquo;Established brands achieve profitable pan-India ecommerce growth when channels, marketing, inventory, fulfilment and revenue control operate as one integrated system—with one accountable operating partner.&rdquo;
            </h3>
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div className="glass-card-feature">
              <h3 style={{ color: "#38BDF8", fontSize: "1.3rem", fontWeight: 700 }}>Single-Point Accountability</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>
                Unlike fragmented agencies that manage ads or listings in isolation, Good Life takes end-to-end accountability across stock allocation, warehousing, ads, return QC, and revenue auditing.
              </p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#10B981", fontSize: "1.3rem", fontWeight: 700 }}>5 OEM Brands Incubation</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>
                Over the last 3 years, we have enabled 5 OEM manufacturers to launch direct-to-consumer digital brands across marketplaces and D2C channels.
              </p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#3B82F6", fontSize: "1.3rem", fontWeight: 700 }}>12-State Fulfilment Network</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>
                Regional warehouse nodes positioned strategically across major metro and tier-1 clusters for rapid dispatch and B2B dealer restocking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
