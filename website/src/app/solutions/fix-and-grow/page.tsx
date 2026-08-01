"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import "../../home.css";

export default function FixAndGrowPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">⚡ Solution 02</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Fix & Grow — Eliminate Leaks & Scale GMV
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            For brands selling online but struggling with stagnant growth, rising ACOS, un-audited claims, or return losses.
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
              <h3 style={{ color: "#10B981", fontSize: "1.2rem", fontWeight: 700 }}>ACOS & Ads Optimization</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Optimizing Amazon & Flipkart ad campaigns for lower ACOS and higher organic rank conversion.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: 700 }}>Revenue Recovery Audit</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Automated audit of platform commission overcharges, missing inventory, and unclaimed disputes.</p>
            </div>
            <div className="glass-card-feature">
              <h3 style={{ color: "#3B82F6", fontSize: "1.2rem", fontWeight: 700 }}>RTO & Return Reduction</h3>
              <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Tightening packaging standards, customer verification, and reverse logistics QC.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
