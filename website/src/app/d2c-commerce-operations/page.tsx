"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";

export default function D2CCommerceOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const capabilities = [
    { title: "D2C Website Store Operations", desc: "Catalogue setup, product detail page maintenance, promotional banner updates, and storefront management." },
    { title: "Product Data & Price Architecture", desc: "SKU mapping, bundle configurations, discount rule management, and inventory synchronisation." },
    { title: "Order Processing & Warehouse Fulfilment", desc: "Direct order ingestion, multi-warehouse dispatch from 12 state hubs, packaging SLA compliance, and carrier handover." },
    { title: "Payment & COD Reconciliation", desc: "Automated gateway settlement audits, cash-on-delivery collection tracking, and RTO fee dispute recovery." },
    { title: "Returns & Reverse Logistics", desc: "RTO management, reverse shipping QC, customer exchange processing, and restock workflows." },
    { title: "Customer Operations & Escalations", desc: "Order tracking support, delivery exception management, and customer escalation resolution according to agreed scope." },
    { title: "Performance Marketing Coordination", desc: "Established Amazon & Flipkart performance ad execution, while Meta, SEO and SMO are managed through expanding capabilities." },
    { title: "Unified Marketplace + D2C MIS", desc: "Single dashboard performance reporting combining website sales with marketplace channel metrics." },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* HERO */}
      <section style={{ paddingTop: "110px", paddingBottom: "5rem", background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(252,231,243,0.8) 0%, rgba(243,232,255,0.4) 40%, #FFFFFF 75%)", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "#FCE7F3", border: "1px solid #FBCFE8", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, color: "#EC4899", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
              D2C Commerce Operations
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.08, color: "#0F172A", marginBottom: "1.25rem" }}>
              End-to-End D2C Commerce Operations <span style={{ color: "#EC4899" }}>for Brands</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: 1.75, maxWidth: 650, marginBottom: "2.2rem" }}>
              Good Life can manage the operational layer behind a brand&apos;s D2C channel—from catalogue and order flow to inventory, fulfilment, returns, customer coordination and performance reporting.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} style={{ height: 52, padding: "0 2rem", borderRadius: 12, background: "#EC4899", color: "#FFF", fontWeight: 700, fontSize: "0.96rem", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(236,72,153,0.28)" }}>
                Discuss Your D2C Operation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* D2C CAPABILITIES */}
      <section style={{ padding: "5.5rem 0", background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="ptn-section-eyebrow">D2C Operational Scope</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Complete D2C Operating Layer</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {capabilities.map((cap, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.6rem" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#EC4899", marginBottom: "0.4rem" }}>0{idx + 1}.</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem" }}>{cap.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH & MARKETING STATEMENT */}
      <section style={{ padding: "4rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ background: "#FFF", border: "1.5px solid #E2E8F0", borderRadius: 20, padding: "2.2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.8rem" }}>Technology &amp; Marketing Positioning</h3>
            <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, marginBottom: "1rem" }}>
              Good Life operates and integrates with your selected D2C website platform and service providers. We do not claim a proprietary software platform.
            </p>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              Amazon and Flipkart performance advertising is an established in-house capability. Meta ads, SEO, and social media marketing are treated as expanding capabilities managed through transparent delivery models.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "6rem 0", background: "linear-gradient(135deg, #0F172A 0%, #831843 50%, #EC4899 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#FFF", letterSpacing: "-1.5px", marginBottom: "1rem" }}>Ready to Optimise Your D2C Storefront?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>Connect your website storefront to our 12-state WMS, order execution and revenue audit engine.</p>
          <button onClick={() => setDiagOpen(true)} style={{ height: 54, padding: "0 2.5rem", borderRadius: 14, background: "#FFF", color: "#831843", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>Discuss Your D2C Operation →</button>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
