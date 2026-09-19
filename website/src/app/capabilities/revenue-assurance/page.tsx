"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function RevenueAssurancePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [gmvLakhs, setGmvLakhs] = useState<number>(75); // ₹75 Lakhs monthly GMV
  const [activeRadarItem, setActiveRadarItem] = useState<number>(0);

  // Dynamic Leakage Calculations based on real empirical e-commerce data (2.2% avg leakage)
  const monthlyGmvValue = gmvLakhs * 100000;
  const totalLeakage = Math.round(monthlyGmvValue * 0.022); // 2.2%
  const weightLeakage = Math.round(totalLeakage * 0.42);    // 42%
  const returnLeakage = Math.round(totalLeakage * 0.35);    // 35%
  const feeCreepLeakage = Math.round(totalLeakage * 0.15);  // 15%
  const taxCreditLeakage = totalLeakage - (weightLeakage + returnLeakage + feeCreepLeakage); // 8%
  const annualRecovery = totalLeakage * 12;

  const radarItems = [
    {
      id: "weight-audit",
      badge: "AUDIT 01",
      name: "Volumetric Weight Overcharge Detection",
      lossShare: "42% of Total Leakage",
      color: "#2563EB",
      desc: "Marketplace courier scales routinely over-measure parcel dimensions, bumping products from 500g tiers into 1kg+ freight brackets. We match pack-table digital scale photographs against carrier billing files to dispute every single overbilled rupee.",
      deliverable: "Automated weight variance dispute filing with photographic & 3D dimension proof",
      metric: "98.4%",
      metricLabel: "Weight Claims Approved"
    },
    {
      id: "uncredited-returns",
      badge: "AUDIT 02",
      name: "Uncredited Customer Returns & Lost In-Transit Inventory",
      lossShare: "35% of Total Leakage",
      color: "#E11D48",
      desc: "When a customer initiates a return, marketplaces immediately debit the seller. If the customer never actually hands the parcel to the courier, or if the courier loses it in transit, the seller is rarely reimbursed automatically. We track every return AWB to force reimbursement on day 60.",
      deliverable: "60-day automated reimbursement trigger on all unreceived return AWBs",
      metric: "100%",
      metricLabel: "Unreceived Return Recovery"
    },
    {
      id: "commission-creep",
      badge: "AUDIT 03",
      name: "Referral Commission & Pick-Pack Fee Creep",
      lossShare: "15% of Total Leakage",
      color: "#0D9488",
      desc: "Platforms frequently misclassify high-ticket ASINs into higher-tier commission categories (e.g., charging 14% instead of 9%), or miscalculate closing fees during promotional deal events without seller notice.",
      deliverable: "Automated SKU category rate-card validation across every monthly tax invoice",
      metric: "Zero",
      metricLabel: "Uncontested Fee Creep"
    },
    {
      id: "tax-credits",
      badge: "AUDIT 04",
      name: "GST, TDS & TCS Ledger Reconciliation",
      lossShare: "8% of Total Leakage",
      color: "#7C3AED",
      desc: "Marketplace Tax Deducted at Source (TDS 1%) and Tax Collected at Source (TCS 1%) must reconcile with GSTR-2B and Form 26AS. We identify unclaimed withholdings to ensure your finance team claims 100% of tax credits.",
      deliverable: "Dual-sided tax credit ledger export aligned with chartered accountant filings",
      metric: "100%",
      metricLabel: "Tax Credit Reconciled"
    }
  ];

  const comparisonData = [
    {
      factor: "Weight Dispute Handling",
      traditional: "Accountant notices shipping costs look high, but lacks proof; courier overcharges are written off as normal business losses.",
      goodlife: "In-line packing table scales record photos and exact dimensions; automated batch disputes recover 98.4% of overcharged weight fees."
    },
    {
      factor: "Lost Return Tracking",
      traditional: "Returns debited by marketplace are forgotten; seller loses both product and revenue on hundreds of units every quarter.",
      goodlife: "Continuous tracking of every reverse AWB; automated reimbursement claims filed the instant carrier 60-day delivery SLA elapses."
    },
    {
      factor: "Commission Accuracy",
      traditional: "Sellers trust marketplace automated invoices; wrong commission category brackets drain 2-5% of margin silently.",
      goodlife: "Algorithm cross-checks every order line item against official rate-cards; instant credit note demands generated on overbilled fees."
    },
    {
      factor: "Bank Settlement Reconciliation",
      traditional: "Bulk lump-sum deposits received from Amazon/Flipkart; impossible to manually verify which specific orders were paid.",
      goodlife: "Granular UTR waterfall reconciliation matching every bank transaction to exact order IDs, deductions, and escrow releases."
    }
  ];

  return (
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .rev-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rev-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(16, 185, 129, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(16, 185, 129, 0.35);
        }
        .slider-rev::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }
        @media (max-width: 991px) {
          .rev-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .rev-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .calc-layout-grid { grid-template-columns: 1fr !important; }
          .dossier-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .rev-stats-grid { grid-template-columns: 1fr !important; }
          .rev-radar-grid { grid-template-columns: 1fr !important; }
          .rev-banner-box { padding: 2rem 1.5rem !important; }
        }
      `}</style>

      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. SIGNATURE LIGHT ICE-BLUE HERO ── */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "5rem",
        background: "linear-gradient(180deg, #E0F2FE 0%, #E8F4FE 20%, #F0F7FF 45%, #FAFCFE 70%, #FFFFFF 92%, #FFFFFF 100%)",
        overflow: "hidden"
      }}>
        {/* Soft Ambient Aurora Orbs */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(125, 211, 252, 0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#10B981", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Capabilities</span>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Revenue Assurance</span>
          </div>

          <div className="rev-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                border: "1.5px solid #A7F3D0",
                color: "#059669",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(16, 185, 129, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                CAPABILITY 06 • FINANCIAL RECONCILIATION &amp; RECOVERY
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Revenue Assurance: <br />
                <span style={{ background: "linear-gradient(135deg, #10B981 0%, #0284C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Automated Escrow &amp; 100% Fee Reconciliation
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Marketplace complexity causes 1.5% to 3.5% of total GMV to leak silently through incorrect weight brackets, uncredited returns, and hidden commission fee creep. Good Life audits every single transaction line item against official rate cards, recovering your hard-earned cash.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(16, 185, 129, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE REVENUE AUDIT →</span>
                </Link>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "52px",
                    padding: "0 1.6rem",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#0F172A",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Estimate Capital Leakage</span>
                </button>
              </div>

            </div>

            {/* Right: Live Interactive UTR Waterfall Ledger Simulator (Bespoke Visual Component) */}
            <div>
              <div className="rev-glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(16, 185, 129, 0.08), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#065F46" }}>
                      Automated UTR Waterfall Ledger
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#059669", background: "#ECFDF5", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    RECONCILED
                  </span>
                </div>

                {/* 5-Line Waterfall Breakdown */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "0.65rem 0.9rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>Gross Invoiced Value</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#0F172A" }}>₹2,480.00</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF1F2", padding: "0.65rem 0.9rem", borderRadius: "10px", border: "1px solid #FECDD3" }}>
                    <span style={{ fontSize: "0.78rem", color: "#BE123C", fontWeight: 700 }}>Marketplace Referral Fee</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#E11D48" }}>- ₹297.60</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFBEB", padding: "0.65rem 0.9rem", borderRadius: "10px", border: "1px solid #FDE68A" }}>
                    <span style={{ fontSize: "0.78rem", color: "#B45309", fontWeight: 700 }}>Weight / Freight Surcharge</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#D97706" }}>- ₹148.00</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F0FDF4", padding: "0.65rem 0.9rem", borderRadius: "10px", border: "1px solid #BBF7D0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ color: "#16A34A", fontWeight: 900 }}>✓</span>
                      <span style={{ fontSize: "0.78rem", color: "#15803D", fontWeight: 700 }}>Overcharge Disputed &amp; Reclaimed</span>
                    </div>
                    <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#15803D" }}>+ ₹62.50</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(135deg, #0B1736 0%, #1E293B 100%)", padding: "0.85rem 1rem", borderRadius: "12px", color: "#FFFFFF" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#94A3B8" }}>Net Escrow Credited to Bank</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#34D399" }}>₹2,096.90</span>
                  </div>
                </div>

                {/* Status Callout */}
                <div style={{ background: "#F1F5F9", padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.75rem", color: "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                    UTR #AXIS89204 matched to invoice line items with 0 variance
                  </span>
                  <span style={{ fontWeight: 700, color: "#10B981" }}>Live</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS (Matching Screenshot 2 Aesthetic) ── */}
          <div className="rev-stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "₹3.82 Cr+",
                label: "Capital Recovered for Brands",
                description: "Reclaimed from marketplace weight, return, and commission errors",
                tag: "Cash Preserved",
                tagColor: "#10B981",
                tagBg: "#ECFDF5",
                borderColor: "rgba(16, 185, 129, 0.2)",
                subText: "100% Direct P&L Credit"
              },
              {
                value: "100%",
                label: "Commission Accuracy",
                description: "Zero undetected category rate creeping or deal fee overcharges",
                tag: "Rate Audit",
                tagColor: "#2563EB",
                tagBg: "#EFF6FF",
                borderColor: "rgba(37, 99, 235, 0.2)",
                subText: "Automated Rate-Card Match"
              },
              {
                value: "98.4%",
                label: "Weight Claims Won",
                description: "Pack-station photographic scale evidence forcing full carrier refund",
                tag: "Weight Armor",
                tagColor: "#0D9488",
                tagBg: "#F0FDFA",
                borderColor: "rgba(13, 148, 136, 0.2)",
                subText: "Sub-48hr Dispute Submission"
              },
              {
                value: "Daily",
                label: "Escrow & UTR Reconciliation",
                description: "Granular order-to-payout matching identifying missing settlement credits",
                tag: "Audit Discipline",
                tagColor: "#7C3AED",
                tagBg: "#FAF5FF",
                borderColor: "rgba(124, 58, 237, 0.2)",
                subText: "Zero Unreconciled Escrow",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="rev-glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: st.tagColor, background: st.tagBg, padding: "3px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                    {st.tag}
                  </span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.8px", lineHeight: 1 }}>
                  {st.value}
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1E293B", marginTop: "0.4rem", marginBottom: "0.3rem" }}>
                  {st.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.45, marginBottom: "1rem" }}>
                  {st.description}
                </div>
                {st.showBar && (
                  <div style={{ width: "100%", height: "4px", background: "#E2E8F0", borderRadius: "99px", overflow: "hidden", marginBottom: "0.75rem" }}>
                    <div style={{ width: "100%", height: "100%", background: "#10B981" }} />
                  </div>
                )}
                <div style={{ fontSize: "0.75rem", color: st.tagColor, fontWeight: 700 }}>
                  ✓ {st.subText}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. INTERACTIVE CAPITAL LEAKAGE RECOVERY CALCULATOR ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#10B981", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Dynamic Financial Simulator
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Calculate Your Brand's Recoverable Marketplace Capital
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Adjust your monthly marketplace gross merchandise value (GMV) to calculate the exact amount of leaked cash Good Life will reclaim directly into your bank account.
            </p>
          </div>

          <div className="calc-layout-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch"
          }}>
            {/* Input Slider Box */}
            <div className="rev-glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.5rem" }}>
                  Monthly Gross Marketplace GMV
                </h3>

                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Total Marketplace Sales (Amazon + Flipkart)</span>
                    <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10B981" }}>₹{gmvLakhs} Lakh / Mo</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={5}
                    value={gmvLakhs}
                    onChange={(e) => setGmvLakhs(Number(e.target.value))}
                    className="slider-rev"
                    style={{ width: "100%", accentColor: "#10B981", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                    <span>₹10 Lakh</span>
                    <span>₹2.5 Crore</span>
                    <span>₹5.0 Crore</span>
                  </div>
                </div>

                {/* 4 Category Leakage Breakdown */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Courier Weight Overcharges (42%)</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>Volumetric inflation on courier slips</div>
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 900, color: "#2563EB" }}>₹{(weightLeakage / 1000).toFixed(0)}k / mo</div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Uncredited Return Losses (35%)</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>Parcels lost in courier reverse transit</div>
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 900, color: "#E11D48" }}>₹{(returnLeakage / 1000).toFixed(0)}k / mo</div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Commission &amp; Closing Fee Creep (15%)</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>Erroneous category tier charges</div>
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 900, color: "#0D9488" }}>₹{(feeCreepLeakage / 1000).toFixed(0)}k / mo</div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Unclaimed TDS &amp; TCS Credits (8%)</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>Discrepancies in Form 26AS vs portal</div>
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 900, color: "#7C3AED" }}>₹{(taxCreditLeakage / 1000).toFixed(0)}k / mo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Console */}
            <div className="rev-glass-card" style={{
              padding: "2.5rem",
              background: "linear-gradient(135deg, #064E3B 0%, #0F172A 100%)",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#34D399", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Projected Capital Recovery
                  </span>
                  <span style={{ fontSize: "0.72rem", background: "rgba(52, 211, 153, 0.15)", color: "#34D399", padding: "3px 10px", borderRadius: "999px" }}>
                    NET CASH RETURN
                  </span>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>Monthly Recoverable Margin</div>
                  <div style={{ fontSize: "clamp(2.5rem, 3.8vw, 3.4rem)", fontWeight: 900, color: "#34D399", letterSpacing: "-1px", marginTop: "0.2rem" }}>
                    ₹{(totalLeakage / 100000).toFixed(2)} Lakh
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#E2E8F0", marginTop: "0.4rem", fontWeight: 500 }}>
                    Direct bottom-line EBITDA addition credited back to your bank account.
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Annualized 12-Month Net Capital Reclaimed:
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#FFFFFF" }}>
                    ₹{(annualRecovery / 100000).toFixed(1)} Lakh / Year
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#34D399", marginTop: "0.3rem" }}>
                    Equivalent to adding 2-3 full-time employees or 30% additional ad budget for zero extra cost.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Want us to audit your last 90 days of settlement sheets?</span>
                <Link href="/book-meeting" style={{ color: "#34D399", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}>
                  Claim Free Audit →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. THE 4-POINT RECONCILIATION LEAKAGE RADAR (BESPOKE LAYOUT) ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#10B981", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Algorithmic Inspection Core
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Four Automated Reconciliation Radars
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Inspect how our software scans every line item on Amazon Seller Central, Flipkart Payment Settlement, and courier manifests to detect and reclaim leaked funds.
            </p>
          </div>

          <div className="rev-radar-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginBottom: "2.5rem"
          }}>
            {radarItems.map((item, idx) => {
              const isSelected = activeRadarItem === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRadarItem(idx)}
                  style={{
                    padding: "1.5rem 1.25rem",
                    borderRadius: "18px",
                    border: isSelected ? `2px solid ${item.color}` : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? "0 8px 24px rgba(16, 185, 129, 0.12)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: item.color }}>
                    {item.badge}
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: isSelected ? "#0F172A" : "#475569", margin: "0.4rem 0 0.3rem", lineHeight: 1.3 }}>
                    {item.name.split(" ")[0]} {item.name.split(" ")[1]}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
                    {item.lossShare}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Radar Showcase */}
          {(() => {
            const current = radarItems[activeRadarItem];
            return (
              <div className="rev-glass-card" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: current.color, background: "#F1F5F9", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    {current.badge} • {current.lossShare}
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 1rem", letterSpacing: "-0.5px" }}>
                    {current.name}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {current.desc}
                  </p>
                  <div style={{ background: "#FFFFFF", padding: "1rem", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "0.9rem", color: "#1E293B", fontWeight: 600 }}>
                    <span style={{ color: current.color, fontWeight: 900, marginRight: "0.5rem" }}>✓ DELIVERABLE:</span>
                    {current.deliverable}
                  </div>
                </div>

                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "3.2rem", fontWeight: 900, color: current.color, lineHeight: 1, letterSpacing: "-1px" }}>
                    {current.metric}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1E293B", marginTop: "0.6rem" }}>
                    {current.metricLabel}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#16A34A", fontWeight: 700, marginTop: "0.5rem" }}>
                    ✓ Automated Daily Telemetry Run
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 4. HEAD-TO-HEAD COMPARISON TABLE ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#10B981", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Rigor Comparison
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Manual Accounting vs. Good Life Automated Reconciliation
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Why traditional monthly spreadsheet bookkeeping misses 90% of marketplace leakage while Good Life reclaims your cash.
            </p>
          </div>

          <div className="rev-glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#64748B", width: "26%" }}>AUDIT CAPABILITY</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#EF4444", width: "37%" }}>CONVENTIONAL ACCOUNTING</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 900, color: "#10B981", width: "37%" }}>GOOD LIFE REVENUE ENGINE</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx === comparisonData.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                      {row.factor}
                    </td>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5 }}>
                      <span style={{ color: "#EF4444", fontWeight: 700, marginRight: "0.4rem" }}>✕</span>
                      {row.traditional}
                    </td>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5, background: "rgba(16, 185, 129, 0.02)" }}>
                      <span style={{ color: "#10B981", fontWeight: 900, marginRight: "0.4rem" }}>✓</span>
                      {row.goodlife}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── 5. EXECUTIVE AUDIT BANNER & NEXT STEPS ── */}
      <section style={{ padding: "5rem 0", background: "#0B1736" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="rev-banner-box" style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(2, 132, 199, 0.15) 100%)",
            border: "1.5px solid rgba(16, 185, 129, 0.4)",
            borderRadius: "26px",
            padding: "3.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}>
            <div style={{ maxWidth: "700px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6EE7B7", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                ZERO OUT-OF-POCKET RISK
              </span>
              <h3 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#FFFFFF", margin: "0.8rem 0 1rem", letterSpacing: "-1px" }}>
                Request a Free 90-Day Fee &amp; Weight Discrepancy Audit
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
                Upload your Amazon Seller Central MTR and Flipkart settlement files. We will run our automated forensic discrepancy audit and show you the exact cash value waiting to be reclaimed.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/book-meeting"
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>CLAIM COMPLIMENTARY REVENUE AUDIT →</span>
              </Link>

              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "50px",
                  padding: "0 1.8rem",
                  borderRadius: "999px",
                  background: "transparent",
                  border: "1.5px solid rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s ease"
                }}
              >
                <span>Run Diagnostic Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Modal */}
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      <Footer />
    </div>
  );
}
