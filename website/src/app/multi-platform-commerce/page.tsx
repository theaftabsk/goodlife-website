"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function MultiPlatformCommercePage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const categories = [
    {
      cat: "Core Marketplaces",
      examples: ["Amazon", "Flipkart"],
      desc: "High-volume flagship channels with dedicated ad management, buy box protection, and FBA/FBF alignment."
    },
    {
      cat: "Fashion & Lifestyle",
      examples: ["Myntra"],
      desc: "Curated category listing, seasonal cataloguing, brand registry, and specialized return workflows."
    },
    {
      cat: "B2B & Industrial",
      examples: ["Moglix", "IndiaMART", "TradeIndia"],
      desc: "Bulk quantity pricing, GST trade invoicing, RFQ response SLAs, and institutional client fulfillment."
    },
    {
      cat: "Omnichannel & Retail",
      examples: ["JioMart", "IB"],
      desc: "Hyperlocal and multi-node warehouse distribution with unified SLA management."
    },
    {
      cat: "Assisted Purchase & Finance",
      examples: ["Snapmint", "Bajaj"],
      desc: "Consumer finance integrations, EMI promotion execution, and assisted-purchase checkout support."
    }
  ];

  const controls = [
    { title: "Opportunity Assessment", desc: "Evaluating category demand, platform economics, and operational readiness before onboarding." },
    { title: "Catalog & Pricing Adaptation", desc: "Adapting listings, titles, and localized pricing architecture per channel requirements." },
    { title: "Platform-Specific Controls", desc: "Enforcing unique operational protocols rather than force-fitting a single marketplace template." },
    { title: "Unified Inventory Planning", desc: "Consolidated multi-channel inventory allocation to prevent out-of-stock or channel hoarding." },
    { title: "Settlements & Claims Governance", desc: "Automated auditing of settlements, commissions, logisitics overcharges, and returns." },
    { title: "Channel Conflict Mitigation", desc: "Strict MAP (Minimum Advertised Price) enforcement and exclusive bundle strategies." }
  ];

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section className="page-hero-wrapper">
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <span className="diagnostic-step-pill" style={{ marginBottom: "1rem" }}>
              🌐 Multi-Platform Expansion
            </span>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
              Launch and Operate Your Brand Across Multiple Commerce Platforms
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "#9CA3AF", marginBottom: "2rem" }}>
              Good Life helps brands evaluate, onboard and operate across mainstream marketplaces, category platforms, B2B channels and assisted-purchase ecosystems through one coordinated operating model.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
                Plan Your Multi-Platform Expansion
              </button>
              <Link href="/d2c-commerce-operations" className="hero-play-btn" style={{ textDecoration: "none" }}>
                Explore D2C Operations →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approved Platform Ecosystem */}
      <section style={{ padding: "5rem 0", background: "rgba(17, 24, 39, 0.4)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">APPROVED ECOSYSTEM</span>
            <h2 className="section-title">Multi-Platform Operating Coverage</h2>
            <p className="section-subtitle">We manage your brand presence across leading and relevant commerce platforms with single-point accountability.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {categories.map((c, i) => (
              <div key={i} className="glass-card-feature">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", letterSpacing: "1px" }}>{c.cat}</span>
                  <span style={{ fontSize: "0.85rem", color: "#60A5FA", fontWeight: 600 }}>Approved</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  {c.examples.map((ex, idx) => (
                    <span key={idx} style={{ background: "rgba(255,255,255,0.08)", padding: "0.3rem 0.75rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 700, color: "#FFF" }}>
                      {ex}
                    </span>
                  ))}
                </div>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Controls Framework */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">OPERATIONAL CONTROLS</span>
            <h2 className="section-title">6-Pillar Cross-Platform Framework</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {controls.map((ctrl, idx) => (
              <div key={idx} className="glass-card-feature">
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginBottom: "1rem" }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "0.5rem" }}>{ctrl.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{ctrl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ padding: "4rem 0", background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, rgba(11, 15, 25, 1) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", color: "#FFF", fontWeight: 800, marginBottom: "1rem" }}>
            Expand Across Leading Commerce Platforms
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Schedule a platform capability audit to identify your highest-upside marketplace channels.
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
