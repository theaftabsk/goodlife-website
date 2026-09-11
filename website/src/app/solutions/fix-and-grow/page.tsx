"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function FixAndGrowPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<number>(0);

  const marginLeaks = [
    {
      id: "volumetric",
      title: "Volumetric Weight",
      pct: "3.2%",
      tag: "Freight Overcharges",
      problem: "Couriers bump 500g parcels to 1kg+ volumetric tiers at automated transshipment hubs.",
      leakage: "3.2% of GMV lost in excess carrier debit notes without automatic verification.",
      fix: "Warehouse scan matching against carrier billing manifests with automated batch dispute filing.",
      detail: "Automated sorting hubs routinely flag packaging dimensions above physical reality. Without automated dimensional reconciliation at receipt, brands bleed lakhs each quarter in undetected freight weight penalties."
    },
    {
      id: "returns",
      title: "Customer Returns",
      pct: "4.5%",
      tag: "Uncredited Inwarding",
      problem: "Up to 15% of customer return parcels never physically reach the warehouse or arrive switched.",
      leakage: "4.5% of GMV absorbed as lost inventory without filing mandatory SAFE-T reimbursement claims.",
      fix: "24-hour dock inwarding with forensic HD unboxing footage and automated sub-48h SAFE-T claim filing.",
      detail: "Marketplace customer return logistics suffer high transit shrinkage and fraudulent switch-outs. When returns sit uninspected past the 7-day platform claim window, seller compensation is permanently forfeited."
    },
    {
      id: "adspend",
      title: "Ad Spend Bleed",
      pct: "5.8%",
      tag: "Stockout Misalignment",
      problem: "Marketing agencies scale ad spend without monitoring live warehouse buffer levels.",
      leakage: "5.8% of GMV wasted driving traffic to fast-depleting SKUs, causing organic rank crashes upon stockout.",
      fix: "Algorithmic ad throttling pauses campaigns automatically when SKU buffer falls below 7 days run-rate.",
      detail: "Running aggressive performance marketing while warehouse stock is nearing depletion burns capital twice: once on non-convertible clicks, and secondly by tanking the algorithm's organic rank upon out-of-stock."
    },
    {
      id: "buybox",
      title: "Buybox Suppression",
      pct: "6.4%",
      tag: "Slow Regional Delivery",
      problem: "Shipping from a single central warehouse produces 5-7 day delivery promises for non-metro buyers.",
      leakage: "6.4% of GMV forfeited to local competitors winning the Buybox with same-day / next-day delivery badges.",
      fix: "Split-inventory allocation across 12 regional hubs provides sub-24h delivery promises to 19,000+ pin codes.",
      detail: "Marketplace algorithms strictly prioritize delivery speed. A single national warehouse causes high estimated transit days, dropping your listing Buybox win rate by up to 45% against regional sellers."
    }
  ];

  const protocolStages = [
    {
      step: "01",
      title: "Diagnose",
      days: "Days 1–10",
      desc: "Audit past 12-month carrier debits, return losses, ACOS leaks, and Buybox win rates."
    },
    {
      step: "02",
      title: "Restructure",
      days: "Days 11–20",
      desc: "Distribute inventory across 12 regional hubs; configure algorithmic price floor guardrails."
    },
    {
      step: "03",
      title: "Recover",
      days: "Days 21–35",
      desc: "Batch-file carrier weight disputes and SAFE-T claims to recover uncredited cash."
    },
    {
      step: "04",
      title: "Optimise",
      days: "Days 36–50",
      desc: "Synchronize ad spend throttling directly with live inventory buffer velocity."
    },
    {
      step: "05",
      title: "Scale",
      days: "Days 51–60+",
      desc: "Expand national velocity with same-day delivery badges across 19,000+ pin codes."
    }
  ];

  return (
    <div className={`solution-fix-root ${inter.className}`} style={{ background: "#FFFFFF", color: "#0B1736", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── SECTION 1: HERO (Clean 2-Column: Left Copy, Right Margin Leak Card) ── */}
      <section style={{
        position: "relative",
        paddingTop: "8.5rem",
        paddingBottom: "5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.8rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span>Solutions</span>
            <span>/</span>
            <span style={{ color: "#0B1736", fontWeight: 600 }}>Fix & Grow</span>
          </div>

          <div className="hero-two-column" style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.95fr",
            gap: "3.5rem",
            alignItems: "center"
          }}>
            
            {/* Left Column: Heading, Paragraph, Buttons */}
            <div>
              <div className="fix-eyebrow-pill" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1.1rem",
                borderRadius: "999px",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                color: "#1D4ED8",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "1.4rem"
              }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2563EB" }} />
                SOLUTION 02 • TURNAROUND & MARGIN RECOVERY
              </div>

              <h1 className="fix-hero-title" style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
                fontWeight: 900,
                lineHeight: 1.14,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.25rem"
              }}>
                Stop Margin Leakage <br />
                <span style={{ color: "#2563EB" }}>& Reignite Stagnant Sales</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.15rem)",
                color: "#475569",
                lineHeight: 1.75,
                marginBottom: "2.4rem",
                fontWeight: 500
              }}>
                For brands already selling online whose GMV has plateaued, ACOS has spiked, or marketplace settlement reports show shrinking net margins. Good Life audits, restructures, and operates your entire commerce flywheel under strict operational SLAs.
              </p>

              <div className="hero-btn-row" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(37, 99, 235, 0.28)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <Link
                  href="/contact"
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#0B1736",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease"
                  }}
                >
                  Request Margin Audit
                </Link>
              </div>
            </div>

            {/* Right Column: Simple Margin Leakage Glass Card */}
            <div>
              <div className="margin-leak-card" style={{
                background: "#FFFFFF",
                borderRadius: "22px",
                padding: "2.4rem 2rem",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(11, 23, 54, 0.05)",
                position: "relative"
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  color: "#DC2626",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem"
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#DC2626" }} />
                  UNCLAIMED MARGIN EROSION
                </div>

                <div style={{
                  fontSize: "clamp(2.8rem, 4vw, 3.6rem)",
                  fontWeight: 900,
                  color: "#0B1736",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.05,
                  marginBottom: "0.4rem"
                }}>
                  18% – 24%
                </div>

                <div style={{ fontSize: "0.94rem", color: "#64748B", fontWeight: 600, marginBottom: "1.8rem" }}>
                  Average net margin leaking across unverified carrier debits, uncredited returns, and misaligned ad spend.
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid #F1F5F9", paddingTop: "1.4rem" }}>
                  {[
                    { label: "Volumetric Weight Slabs", val: "3.2% GMV" },
                    { label: "Uncredited Customer Returns", val: "4.5% GMV" },
                    { label: "Ad Bleed on Stockouts", val: "5.8% GMV" },
                    { label: "Buybox Lost to Slow Transit", val: "6.4% GMV" }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.86rem" }}>
                      <span style={{ color: "#475569", fontWeight: 500 }}>{item.label}</span>
                      <span style={{ color: "#DC2626", fontWeight: 750 }}>{item.val}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: "1.6rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  color: "#166534",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% SLA-backed recovery process</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2 & 3: MARGIN LEAKAGE (4 Horizontal Cards) & FINANCIAL LEAK DETAIL ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.2rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              THE 4 SILENT MARGIN LEAKS
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.8rem" }}>
              Where Your Profit Disappears Every Month
            </h2>
            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.65, fontWeight: 500 }}>
              Select any of the four operational leak categories below to inspect the exact financial drain mechanism and our accountable fix:
            </p>
          </div>

          {/* 4 Clean Horizontal Cards */}
          <div className="leak-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.2rem",
            marginBottom: "2.5rem"
          }}>
            {marginLeaks.map((leak, idx) => {
              const isSelected = selectedLeak === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedLeak(idx)}
                  className={`leak-card-item ${isSelected ? "leak-card-selected" : ""}`}
                  style={{
                    background: isSelected ? "#EFF6FF" : "#F8FAFC",
                    borderRadius: "16px",
                    padding: "1.4rem 1.25rem",
                    border: isSelected ? "2px solid #2563EB" : "1px solid #E2E8F0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 8px 24px rgba(37, 99, 235, 0.08)" : "none",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
                      {leak.tag}
                    </span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: isSelected ? "#2563EB" : "#DC2626" }}>
                      {leak.pct}
                    </span>
                  </div>

                  <div style={{ fontSize: "1.05rem", fontWeight: 850, color: isSelected ? "#1E3A8A" : "#0B1736", marginBottom: "0.35rem" }}>
                    {leak.title}
                  </div>

                  <div style={{ fontSize: "0.8rem", color: isSelected ? "#2563EB" : "#64748B", fontWeight: 600 }}>
                    {isSelected ? "● Active Inspection" : "Click to inspect detail →"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION 3: FINANCIAL LEAK DETAIL (Problem → Leakage → Good Life Fix) */}
          <div className="leak-detail-panel" style={{
            background: "#F8FAFC",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            padding: "2.5rem 2.2rem",
            boxShadow: "0 6px 20px rgba(11, 23, 54, 0.03)"
          }}>
            <div className="leak-detail-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.35fr",
              gap: "2.5rem",
              alignItems: "center"
            }}>
              
              {/* Left: Explanation */}
              <div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  background: "#EFF6FF",
                  color: "#1D4ED8",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  marginBottom: "1rem"
                }}>
                  <span>LEAK CATEGORY {selectedLeak + 1} OF 4</span>
                </div>

                <h3 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.8rem", letterSpacing: "-0.5px" }}>
                  {marginLeaks[selectedLeak].title} ({marginLeaks[selectedLeak].pct} GMV)
                </h3>

                <p style={{ fontSize: "0.96rem", color: "#53627A", lineHeight: 1.7, marginBottom: "1.6rem", fontWeight: 500 }}>
                  {marginLeaks[selectedLeak].detail}
                </p>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "44px",
                    padding: "0 1.4rem",
                    borderRadius: "10px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.86rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.22)"
                  }}
                >
                  <span>Audit Account For This Leak</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Right: Problem → Leakage → Good Life Fix visual */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                
                {/* Step 1: Problem */}
                <div style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.1rem 1.3rem",
                  border: "1px solid #FECACA",
                  borderLeft: "4px solid #DC2626"
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "0.3rem" }}>
                    Problem
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5 }}>
                    {marginLeaks[selectedLeak].problem}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center", color: "#94A3B8", fontSize: "1.1rem", fontWeight: 900 }}>
                  ↓
                </div>

                {/* Step 2: Leakage */}
                <div style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.1rem 1.3rem",
                  border: "1px solid #FED7AA",
                  borderLeft: "4px solid #EA580C"
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#EA580C", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "0.3rem" }}>
                    Financial Leakage
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5 }}>
                    {marginLeaks[selectedLeak].leakage}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center", color: "#94A3B8", fontSize: "1.1rem", fontWeight: 900 }}>
                  ↓
                </div>

                {/* Step 3: Good Life Fix */}
                <div style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.1rem 1.3rem",
                  border: "1px solid #BFDBFE",
                  borderLeft: "4px solid #2563EB"
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "0.3rem" }}>
                    Good Life Accountable Fix
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "#0B1736", fontWeight: 700, lineHeight: 1.5 }}>
                    {marginLeaks[selectedLeak].fix}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: BEFORE VS AFTER (Two Clean Comparison Cards) ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              PERFORMANCE COMPARISON
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.8rem" }}>
              Stagnant Setup vs. Good Life Operating Partner
            </h2>
            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.65, fontWeight: 500 }}>
              What happens when you replace disconnected agency vendors with single-point operational accountability:
            </p>
          </div>

          <div className="compare-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem"
          }}>
            
            {/* Card Left: Stagnant Setup */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "2.4rem 2rem",
              border: "1.5px solid #FECACA",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.6rem" }}>
                <span style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#FEF2F2",
                  color: "#DC2626",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "0.9rem"
                }}>
                  ✕
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#991B1B", margin: 0 }}>
                  Stagnant Setup (Fragmented Vendors)
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { label: "Delivery Speed", val: "5–7 Days (Single warehouse long-haul transit)" },
                  { label: "Ad Spend Efficiency", val: "ACOS 38%+ (Ads running during stockouts)" },
                  { label: "Return Inwarding", val: "Parcels sit uninspected for 4+ weeks at dock" },
                  { label: "Dispute Claims", val: "Carrier and SAFE-T claim deadlines regularly missed" },
                  { label: "Accountability", val: "Ad agency blames warehouse; warehouse blames courier" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: "0.9rem 1.1rem",
                    background: "#FEF2F2",
                    borderRadius: "12px",
                    border: "1px solid #FEE2E2"
                  }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.94rem", color: "#7F1D1D", fontWeight: 600, marginTop: "0.2rem" }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Right: Good Life Operating Mandate */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "2.4rem 2rem",
              border: "2px solid #2563EB",
              boxShadow: "0 12px 36px rgba(37, 99, 235, 0.08)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.6rem" }}>
                <span style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "0.9rem"
                }}>
                  ✓
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1D4ED8", margin: 0 }}>
                  Good Life Operating Partner
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { label: "Delivery Speed", val: "Same-Day / Next-Day badges across 19,000+ pin codes" },
                  { label: "Ad Spend Efficiency", val: "ACOS 14–18% (Automated stock-sync ad throttling)" },
                  { label: "Return Inwarding", val: "Sub-24h dock inwarding with forensic HD unboxing proof" },
                  { label: "Dispute Claims", val: "100% claim filing SLA within platform dispute windows" },
                  { label: "Accountability", val: "One single executive team accountable for bottom-line margin" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: "0.9rem 1.1rem",
                    background: "#EFF6FF",
                    borderRadius: "12px",
                    border: "1px solid #BFDBFE"
                  }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.94rem", color: "#1E3A8A", fontWeight: 700, marginTop: "0.2rem" }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 5: TURNAROUND PROTOCOL (Simple Horizontal Timeline) ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              THE 60-DAY EXECUTION SEQUENCE
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.8rem" }}>
              Turnaround Protocol
            </h2>
            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.65, fontWeight: 500 }}>
              Diagnose → Restructure → Recover → Optimise → Scale
            </p>
          </div>

          {/* Simple Horizontal Timeline */}
          <div className="protocol-timeline-row" style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: "0.75rem",
            position: "relative"
          }}>
            {protocolStages.map((stg, sIdx) => (
              <React.Fragment key={sIdx}>
                <div className="protocol-step-card" style={{
                  flex: "1 1 0",
                  background: "#F8FAFC",
                  borderRadius: "16px",
                  padding: "1.6rem 1.2rem",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box"
                }}>
                  <div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.8rem"
                    }}>
                      <span style={{
                        fontSize: "0.74rem",
                        fontWeight: 850,
                        color: "#2563EB",
                        background: "#EFF6FF",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "6px",
                        border: "1px solid #DBEAFE"
                      }}>
                        {stg.step}
                      </span>
                      <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B" }}>
                        {stg.days}
                      </span>
                    </div>

                    <div style={{ fontSize: "1.15rem", fontWeight: 850, color: "#0B1736", marginBottom: "0.5rem" }}>
                      {stg.title}
                    </div>

                    <div style={{ fontSize: "0.86rem", color: "#53627A", lineHeight: 1.55, fontWeight: 500 }}>
                      {stg.desc}
                    </div>
                  </div>
                </div>

                {sIdx < protocolStages.length - 1 && (
                  <div className="protocol-step-arrow" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94A3B8",
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    flexShrink: 0
                  }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA (Clean White / Light-Blue Glass Card) ── */}
      <section style={{ padding: "5.5rem 0 6.5rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="final-cta-card" style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "3.8rem 2.8rem",
            border: "1.5px solid #BFDBFE",
            boxShadow: "0 14px 45px rgba(37, 99, 235, 0.08)",
            textAlign: "center",
            position: "relative"
          }}>
            <div style={{ maxWidth: "780px", margin: "0 auto" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "#EFF6FF",
                border: "1px solid #DBEAFE",
                color: "#1D4ED8",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "1.4rem"
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
                60-DAY MARGIN RECOVERY MANDATE
              </div>

              <h2 style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.18,
                color: "#0B1736",
                letterSpacing: "-1.2px",
                margin: "0 0 1.1rem"
              }}>
                Ready to Recover Your Margins & Reignite Growth?
              </h2>

              <p style={{
                fontSize: "1.12rem",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.4rem",
                fontWeight: 500
              }}>
                Take our 10-step Commerce Diagnostic to calculate your exact net profit recovery potential across Amazon, Flipkart, and Quick Commerce channels.
              </p>

              <div className="final-cta-btn-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "52px",
                    padding: "0 2.2rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(37, 99, 235, 0.32)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <Link
                  href="/contact"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#0B1736",
                    fontSize: "0.94rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease"
                  }}
                >
                  Schedule Margin Audit
                </Link>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.8rem",
                marginTop: "2.2rem",
                fontSize: "0.82rem",
                color: "#64748B",
                fontWeight: 600,
                flexWrap: "wrap"
              }}>
                <span>✓ Zero Disruption to Active Listings</span>
                <span>✓ 100% Operational SLA Guarantee</span>
                <span>✓ Direct Margin Reconciliation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 7: EXISTING FOOTER ── */}
      <Footer hideTopBanner={true} />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* ── RESPONSIVE CSS ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .leak-card-item:hover {
          border-color: #93C5FD !important;
          transform: translateY(-2px);
        }
        .leak-card-selected {
          border-color: #2563EB !important;
        }

        @media (max-width: 980px) {
          .hero-two-column {
            grid-template-columns: 1fr !important;
            gap: 2.2rem !important;
            width: 100% !important;
          }
          .hero-two-column > div {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .leak-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .leak-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .compare-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .protocol-timeline-row {
            flex-direction: column !important;
            gap: 0.8rem !important;
          }
          .protocol-step-arrow {
            transform: rotate(90deg);
            margin: 0.2rem 0;
          }
        }

        @media (max-width: 640px) {
          .fix-eyebrow-pill {
            font-size: 0.68rem !important;
            padding: 0.35rem 0.75rem !important;
            white-space: normal !important;
            line-height: 1.35 !important;
            max-width: 100% !important;
            margin-bottom: 1rem !important;
            box-sizing: border-box !important;
          }
          .fix-hero-title {
            font-size: clamp(1.65rem, 6.5vw, 2.2rem) !important;
            letter-spacing: -1px !important;
            line-height: 1.15 !important;
            margin-bottom: 1rem !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .hero-btn-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn-row button,
          .hero-btn-row a {
            width: 100% !important;
            justify-content: center !important;
          }
          .margin-leak-card {
            padding: 1.25rem 1rem !important;
            border-radius: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .margin-leak-card * {
            box-sizing: border-box !important;
          }
          .leak-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .leak-detail-panel {
            padding: 1.4rem 1.15rem !important;
            border-radius: 18px !important;
          }
          .compare-cards-grid > div {
            padding: 1.5rem 1.15rem !important;
            border-radius: 16px !important;
          }
          .final-cta-card {
            padding: 2.2rem 1.25rem !important;
            border-radius: 18px !important;
          }
          .final-cta-btn-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          .final-cta-btn-row button,
          .final-cta-btn-row a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
