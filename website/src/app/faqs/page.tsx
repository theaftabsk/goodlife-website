"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FaqsPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqsList = [
    { q: "What makes Good Life different from a traditional ecommerce agency?", a: "Good Life is an integrated Ecommerce Operating Partner, not a fragmented agency. We take single-point accountability for marketplace listings, catalogue data, multi-state warehousing, performance ads, settlement reconciliation, and multi-channel order dispatch." },
    { q: "Can Good Life help an OEM manufacturer launch a direct consumer brand?", a: "Yes. Through our Brand Incubation mandate, we have launched five new brands over the last 3 years created by companies that previously operated primarily as OEMs." },
    { q: "Which platforms does Good Life operate across?", a: "We operate across mainstream marketplaces (Amazon, Flipkart), fashion platforms (Myntra), B2B channels (Moglix, IndiaMART, TradeIndia, Jio B2B), and consumer-finance ecosystems (Snapmint, Bajaj)." },
    { q: "How does Good Life handle B2B and regional dealer supplies?", a: "Good Life acts as a warehouse-supported regional inventory buffer partner, fulfilling bulk corporate orders, institutional requests, and local dealer replenishment from our 12-state warehouse network." },
    { q: "What is included in the Commerce Diagnostic assessment?", a: "The 10-step diagnostic evaluates company category, GMV, marketplace presence, warehouse dispatch model, operational pain points, and decision timeline to calculate a tailored fit score and strategic opportunity tags." }
  ];

  return (
    <div style={{ background: "#080A12", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => {}} />

      <main className="container" style={{ padding: "140px 0 80px", maxWidth: "800px" }}>
        <span className="section-tag">KNOWLEDGE BASE</span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFF", marginTop: "0.5rem", marginBottom: "1rem" }}>
          Master Frequently Asked Questions
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", marginBottom: "2.5rem" }}>
          Find detailed answers about Good Life&apos;s operating model, multi-channel capabilities, and incubation mandates.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqsList.map((item, idx) => (
            <div key={idx} className="glass-card-feature" style={{ padding: "0" }}>
              <button
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                style={{
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  background: "none",
                  border: "none",
                  color: "#FFF",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                {item.q}
                <span style={{ color: "#38BDF8", fontSize: "1.2rem" }}>{activeIdx === idx ? "−" : "+"}</span>
              </button>
              {activeIdx === idx && (
                <div style={{ padding: "0 1.5rem 1.25rem", color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.65 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
