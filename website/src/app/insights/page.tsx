"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function InsightsPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const articles = [
    {
      title: "How OEM Manufacturers Can Build High-Margin Digital Brands in 2026",
      date: "July 2026",
      readTime: "6 min read",
      desc: "Key frameworks for transition from contract manufacturing to direct marketplace ownership."
    },
    {
      title: "The True Cost of Un-Reconciled Marketplace Claims & Returns",
      date: "July 2026",
      readTime: "8 min read",
      desc: "How automated settlement auditing recovers lost margin across Amazon and Flipkart payouts."
    },
    {
      title: "Multi-State Warehouse Stock Placement: Slashing Delivery SLAs & RTO",
      date: "June 2026",
      readTime: "5 min read",
      desc: "Optimizing 12-state inventory buffers for rapid customer dispatch and regional dealer supply."
    }
  ];

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">📚 Knowledge Hub</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Insights & Commerce Strategy
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            Expert operational guides, marketplace reports, and commerce operating strategies.
          </p>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {articles.map((art, idx) => (
              <div key={idx} className="glass-card-feature">
                <div style={{ display: "flex", justifyContent: "space-between", color: "#9CA3AF", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{art.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{art.desc}</p>
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
