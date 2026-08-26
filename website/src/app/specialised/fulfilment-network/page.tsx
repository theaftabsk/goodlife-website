"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import "../../home.css";

export default function FulfilmentNetworkPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">🗺️ Pan-India Footprint</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            12-State Fulfilment & Warehouse Network
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            Strategic regional warehouse hubs delivering nationwide fast dispatch, regional CNF support, and dealer replenishment.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn" style={{ margin: "2rem auto 0" }}>
            Request a Free Audit →
          </button>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
