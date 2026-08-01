"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function B2BInstitutionalCommercePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can Good Life fulfil bulk and institutional orders?",
      a: "Yes. Good Life coordinates order qualification, commercial approval, stock allocation across multi-state warehouses, dispatch, tax documentation, and financial reconciliation for high-volume corporate and institutional orders."
    },
    {
      q: "Can Good Life supply local dealers from regional warehouses?",
      a: "Yes. Good Life can act as a regional inventory buffer and fulfilment/CNF-style support partner where commercially and legally agreed, allowing brands to fulfill city and regional dealer replenishment rapidly."
    },
    {
      q: "Does Good Life handle B2B platform enquiries?",
      a: "Good Life manages listing cataloguing, pricing controls, inquiry routing, quotation delivery, and dispatch workflows across major B2B commerce platforms including IndiaMART, TradeIndia, Moglix, and Jio B2B."
    },
    {
      q: "Can Good Life manage inventory allocation and financial reconciliation for B2B orders?",
      a: "Absolutely. Our operations team maintains unified inventory safety stock across retail and B2B orders while delivering multi-tier settlement reconciliation and credit terms reporting."
    }
  ];

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section className="page-hero-wrapper">
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <span className="diagnostic-step-pill" style={{ marginBottom: "1rem" }}>
              ⚡ Dedicated Phase 1 Solution
            </span>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
              B2B, Institutional and Dealer-Supply Commerce—Operated at Scale
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "#9CA3AF", marginBottom: "2rem" }}>
              Good Life supports brands across bulk enquiries, institutional requirements, B2B platforms and local dealer supplies, using regional warehousing and controlled order execution.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
                Discuss B2B or Institutional Requirements
              </button>
              <Link href="/multi-platform-commerce" className="hero-play-btn" style={{ textDecoration: "none" }}>
                Explore Multi-Platform Operations →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section style={{ padding: "5rem 0", background: "rgba(17, 24, 39, 0.4)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">TARGET AUDIENCE</span>
            <h2 className="section-title">Who This B2B Commerce Operation Is Built For</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
            {[
              {
                title: "B2B / Institutional Growth Brands",
                desc: "Companies seeking systematic execution across corporate buyers, institutional procurement, and enterprise clients."
              },
              {
                title: "Bulk & Corporate Enquiry Handlers",
                desc: "Brands receiving incoming high-value trade inquiries that require structured quotations, GST invoicing, and freight dispatch."
              },
              {
                title: "Regional Dealer Fulfilment",
                desc: "Brands needing regional warehouse stock buffers to fulfill city and state distributor stock requests without long lead times."
              },
              {
                title: "Institutional Buyers & Procurement",
                desc: "Corporate entities and government vendors looking for reliable, compliant, multi-state delivery SLA commitments."
              }
            ].map((item, i) => (
              <div key={i} className="glass-card-feature">
                <div style={{ fontSize: "1.4rem", color: "#38BDF8", marginBottom: "0.8rem", fontWeight: 800 }}>0{i + 1}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFF", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Channels & Execution Services */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <span className="section-tag">EXECUTION PLATFORMS</span>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
                Connected B2B Platforms & Direct Procurement Channels
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We operate across validated B2B platforms and direct institutional procurement pipelines, guaranteeing accurate inventory synchronization and pricing governance.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {["IndiaMART", "TradeIndia", "Moglix", "Jio B2B", "Direct Institutional Bids"].map((ch, idx) => (
                  <span key={idx} style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    background: "rgba(56, 189, 248, 0.1)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    color: "#38BDF8",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                  }}>
                    ✓ {ch}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card-feature" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFF", marginBottom: "1.2rem" }}>
                Warehouse-Supported Regional Dealer Supplies
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                Good Life can act as a regional inventory buffer and warehouse-supported CNF fulfilment partner where commercially and legally contracted.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {[
                  "Regional stock placement in 12+ strategic state warehouses",
                  "Fast order processing for city & regional dealer restocking",
                  "GST tax invoice compliance & freight SLA tracking",
                  "Unified credit & payment reconciliation dashboards"
                ].map((pt, index) => (
                  <li key={index} style={{ color: "#E5E7EB", fontSize: "0.9rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: "#38BDF8" }}>✦</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Workflow */}
      <section style={{ padding: "5rem 0", background: "rgba(15, 23, 42, 0.6)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">CONTROLLED EXECUTION</span>
            <h2 className="section-title">7-Step Institutional Order Workflow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginTop: "3rem" }}>
            {[
              { step: "01", name: "Qualification", desc: "Requirement & buyer credit qualification." },
              { step: "02", name: "Commercial Approval", desc: "Pricing, margin, & quote approval." },
              { step: "03", name: "Inventory Confirmation", desc: "Multi-warehouse safety stock allocation." },
              { step: "04", name: "Documentation", desc: "Tax invoices, e-way bills & compliance." },
              { step: "05", name: "Order Dispatch", desc: "Freight booking & palletized dispatch." },
              { step: "06", name: "Exception Tracking", desc: "Real-time transit monitoring & proof of delivery." },
              { step: "07", name: "Reconciliation", desc: "Payment settlement & financial MIS reporting." }
            ].map((wf, idx) => (
              <div key={idx} className="workflow-step-card">
                <div className="workflow-step-num">{wf.step}</div>
                <h4 style={{ color: "#FFF", fontSize: "1rem", fontWeight: 700 }}>{wf.name}</h4>
                <p style={{ color: "#9CA3AF", fontSize: "0.82rem", lineHeight: 1.5 }}>{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center">
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">B2B & Institutional Commerce Insights</h2>
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                background: "rgba(17, 24, 39, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                overflow: "hidden"
              }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "1.2rem 1.5rem",
                    background: "none",
                    border: "none",
                    color: "#FFF",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  {faq.q}
                  <span style={{ color: "#38BDF8", fontSize: "1.2rem" }}>{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 1.5rem 1.2rem", color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ padding: "4rem 0", background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, rgba(11, 15, 25, 1) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", color: "#FFF", fontWeight: 800, marginBottom: "1rem" }}>
            Ready to Scale B2B & Institutional Commerce?
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Connect with our commerce operations leadership to build your regional warehouse fulfilment framework.
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
