"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function D2CCommerceOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const capabilities = [
    { title: "D2C Website & Catalog Ops", desc: "Coordinating store cataloguing, product variants, collection management, and banner updates across Shopify, WooCommerce, or custom platforms." },
    { title: "Inventory & Pricing Sync", desc: "Live multi-channel stock sync preventing overselling across marketplace and D2C storefront inventory buffers." },
    { title: "Order Processing & Dispatch", desc: "Automated order routing to regional state warehouses for rapid packing, courier allocation, and same-day dispatch." },
    { title: "Payment & COD Reconciliation", desc: "Tracking gateway settlements, COD remittance cycles, NDR (Non-Delivery Reports), and payment gateway fee audits." },
    { title: "Returns & Reverse Logistics", desc: "Managing customer return requests, warehouse quality check (QC), restock qualification, and refund status coordination." },
    { title: "Customer Escalation Workflows", desc: "Handling tier-2 customer order inquiries, shipping tracking escalations, and product exchange workflows." },
    { title: "Performance Marketing Coordination", desc: "Operating Amazon & Flipkart performance ad campaigns while coordinating D2C acquisition traffic across expanding Meta & SEO channels." },
    { title: "Unified Commerce MIS", desc: "Consolidated real-time reporting dashboard unifying marketplace GMV, D2C sales, return rates, and stock health." }
  ];

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section className="page-hero-wrapper">
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <span className="diagnostic-step-pill" style={{ marginBottom: "1rem" }}>
              🛒 D2C Operations Engine
            </span>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
              End-to-End D2C Commerce Operations for Brands
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "#9CA3AF", marginBottom: "2rem" }}>
              Good Life can manage the operational layer behind a brand's D2C channel—from catalogue and order flow to inventory, fulfilment, returns, customer coordination and performance reporting.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
                Discuss Your D2C Operation
              </button>
              <Link href="/brand-launch-incubation" className="hero-play-btn" style={{ textDecoration: "none" }}>
                Explore OEM Brand Incubation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Integration Wording */}
      <section style={{ padding: "3.5rem 0", background: "rgba(17, 24, 39, 0.6)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-tag">TECH-AGNOSTIC OPERATING LAYER</span>
          <h2 style={{ fontSize: "1.6rem", color: "#FFF", fontWeight: 700, marginTop: "0.5rem", marginBottom: "1rem" }}>
            Compatible With Your Existing Commerce Tech Stack
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Good Life operates and seamlessly integrates with your brand’s chosen storefront platform (Shopify, WooCommerce, Magento, or Custom Web App) and logistics ecosystems—delivering operational excellence without forcing proprietary software locks.
          </p>
        </div>
      </section>

      {/* 8 D2C Capability Scopes */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">OPERATIONAL SCOPE</span>
            <h2 className="section-title">End-to-End D2C Execution Pillars</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {capabilities.map((cap, idx) => (
              <div key={idx} className="glass-card-feature">
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#10B981", marginBottom: "0.8rem" }}>
                  Pillar 0{idx + 1}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFF", marginBottom: "0.5rem" }}>{cap.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ padding: "4rem 0", background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(11, 15, 25, 1) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", color: "#FFF", fontWeight: 800, marginBottom: "1rem" }}>
            Streamline Your Brand's D2C Operations
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Unify your D2C web store operations with your marketplace and pan-India warehouse network.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
            Request a Commerce Diagnostic
          </button>
        </div>
      </section>

      <Footer />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
