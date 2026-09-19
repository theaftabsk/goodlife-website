"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function ReturnsOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState<number>(0);
  const [activeClaimStep, setActiveClaimStep] = useState<number>(0);

  const gradingTiers = [
    {
      grade: "GRADE A",
      name: "Like-New / Unopened Seal",
      badge: "100% VALUE RESTORED",
      color: "#16A34A",
      bg: "#F0FDF4",
      border: "rgba(22, 163, 74, 0.3)",
      desc: "Items returned by buyers due to accidental order or change of mind with factory seal intact. Cleaned, barcode reverified, and injected back into active Prime/Assured inventory within 24 hours.",
      recoveryShare: "64.2% of Total Returns",
      action: "Immediate Restock at 100% MSRP",
      steps: [
        "Factory tamper-seal integrity check",
        "Barcode re-scan and inventory WMS increment",
        "Dual-weight sensor verification against master SKU weight",
        "Moved to frontline pick-bins for next-day dispatch"
      ]
    },
    {
      grade: "GRADE B",
      name: "Open-Box / Cosmetic Box Distress",
      badge: "85-92% VALUE RESTORED",
      color: "#2563EB",
      bg: "#EFF6FF",
      border: "rgba(37, 99, 235, 0.3)",
      desc: "Product is 100% functional and unblemished, but the outer packaging has shipping label tears or transit creases. Re-boxed into fresh manufacturer retail packaging and relisted at prime prices.",
      recoveryShare: "21.5% of Total Returns",
      action: "Repackaged & Relisted within 48hr",
      steps: [
        "Full electronic power-on and physical inspection",
        "Accessory inventory reconciliation (cables, manuals, warranties)",
        "Re-boxing in fresh branded outer carton with new shrink wrap",
        "Secondary listing or Amazon Renewed channel routing"
      ]
    },
    {
      grade: "GRADE C",
      name: "Minor Cosmetic Defect / Missing Part",
      badge: "65-75% VALUE RESTORED",
      color: "#D97706",
      bg: "#FFFBEB",
      border: "rgba(217, 119, 6, 0.3)",
      desc: "Items missing a minor peripheral (e.g., power adapter, mounting screw) or exhibiting surface scratches. Replenished with original manufacturer spare parts or routed to refurbished B2B liquidators.",
      recoveryShare: "8.8% of Total Returns",
      action: "Refurbished or B2B Clearance",
      steps: [
        "Forensic technician diagnosis and defect categorization",
        "Direct replenishment from warehouse spare parts inventory",
        "Bench testing and 12-point functional re-certification",
        "B2B bulk salvage or clearance promotional sale"
      ]
    },
    {
      grade: "GRADE D",
      name: "Fraudulent Return / Transit Destruction",
      badge: "100% CAPITAL RECLAIMED",
      color: "#E11D48",
      bg: "#FFF1F2",
      border: "rgba(225, 29, 72, 0.3)",
      desc: "Customer returned used goods, swapped the original unit for a fake or broken model, or courier crushed the parcel. Automatically isolated into 4K video evidence station and submitted for SAFE-T reimbursement.",
      recoveryShare: "5.5% of Total Returns",
      action: "SAFE-T Dispute Filed with Marketplace",
      steps: [
        "Continuous 4K unboxing video recorded from 2 camera angles",
        "Serial number and IMEI comparison against outward dispatch log",
        "Automated PDF dossier generated with weight timestamps",
        "SAFE-T dispute claim submitted to Amazon/Flipkart within 24hr"
      ]
    }
  ];

  const claimFunnelSteps = [
    {
      num: "01",
      title: "Barcode & Weight Scan at Inward Dock",
      tag: "DOCK ENTRY",
      desc: "The second a returned box arrives, its AWB barcode is scanned and parcel weight is checked against the original dispatch weight on in-line digital scales. Any weight variance greater than 50 grams immediately flags the box for forensic unboxing.",
      metric: "50g",
      metricLabel: "Weight Variance Detection Threshold"
    },
    {
      num: "02",
      title: "Dual-Angle 4K Unboxing Camera Recording",
      tag: "FORENSIC AUDIT",
      desc: "Flagged packages are opened exclusively at dedicated unboxing workstations equipped with overhead 4K cameras that continuously record the shipping label, package condition, seal rupture, and actual contents.",
      metric: "100%",
      metricLabel: "Video Archiving on Contested Parcels"
    },
    {
      num: "03",
      title: "Automated Evidence Dossier Generation",
      tag: "CASE COMPILATION",
      desc: "Our reverse operations platform automatically binds the courier tracking history, outbound dispatch weight receipt, CCTV timestamp, and serial number discrepancies into a marketplace-compliant dispute PDF.",
      metric: "< 15m",
      metricLabel: "Dossier Assembly Time"
    },
    {
      num: "04",
      title: "SAFE-T Claim Filing & Payout Tracking",
      tag: "DISPUTE ESCALATION",
      desc: "The claim is submitted via Amazon Seller Central or Flipkart Seller Helpdesk within 24 hours of arrival (well within policy windows). Our dedicated legal claims team follows up until full capital reimbursement hits the brand bank account.",
      metric: "91.2%",
      metricLabel: "Historical Claim Approval Rate"
    }
  ];

  const rtoPillars = [
    {
      title: "Pre-Dispatch Phone & Address Verification",
      desc: "High-risk Cash-on-Delivery (COD) orders undergo automated WhatsApp address verification and OTP confirmation before warehouse picklists are printed."
    },
    {
      title: "Real-Time NDR (Non-Delivery Report) Escalation",
      desc: "When a courier flags 'Customer Unavailable' or 'Address Incomplete', our automated bot immediately messages the buyer on WhatsApp to schedule an exact re-delivery window."
    },
    {
      title: "Courier Fake-Remark GPS Auditing",
      desc: "We verify delivery agent GPS coordinates against customer delivery addresses to catch fraudulent delivery attempts and escalate directly to courier regional heads."
    },
    {
      title: "COD to Prepaid Payment Conversion Nudges",
      desc: "Post-purchase incentives offer discounts for switching from COD to UPI/Credit Card, immediately driving RTO incidence down from 24% to below 8%."
    }
  ];

  const comparisonData = [
    {
      factor: "Return Inwarding Cadence",
      traditional: "Boxes pile up in a warehouse corner for 3-4 weeks; dispute deadlines expire and inventory depreciates.",
      goodlife: "Strict 24-hour inwarding SLA; every single returned parcel is scanned, weighed, and graded on the day of arrival."
    },
    {
      factor: "Customer Return Fraud Defense",
      traditional: "Fraudulent returns go unnoticed; customers keep expensive hero products and brand absorbs total loss.",
      goodlife: "4K forensic unboxing stations record evidence; 91.2% SAFE-T reimbursement success rate on swapped items."
    },
    {
      factor: "Inventory Restocking Velocity",
      traditional: "Sellable units sit uninspected for months, missing peak seasonal demand cycles.",
      goodlife: "64% of returned units are Grade-A reconditioned and restocked into active Prime inventory within 48 hours."
    },
    {
      factor: "RTO Prevention",
      traditional: "Zero intervention; orders ship to fake addresses and return freight fees erode profitability.",
      goodlife: "Automated WhatsApp NDR workflows and pre-dispatch COD address verification slashing RTO by 34.2%."
    },
    {
      factor: "Financial Reconciliation",
      traditional: "No reconciliation of courier return freight fees; double charges slip through unnoticed.",
      goodlife: "Automated AWB ledger matching returned tracking IDs against marketplace fee deductions to ensure zero overcharges."
    }
  ];

  return (
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .rose-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rose-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(225, 29, 72, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(225, 29, 72, 0.35);
        }
        @media (max-width: 991px) {
          .returns-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .returns-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .grading-detail-grid { grid-template-columns: 1fr !important; }
          .funnel-detail-grid { grid-template-columns: 1fr !important; }
          .rto-pillars-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .returns-stats-grid { grid-template-columns: 1fr !important; }
          .returns-pill-grid { grid-template-columns: 1fr !important; }
          .rto-pillars-grid { grid-template-columns: 1fr !important; }
          .returns-banner-box { padding: 2rem 1.5rem !important; }
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
          background: "radial-gradient(circle, rgba(251, 113, 133, 0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(147, 197, 253, 0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#E11D48", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Capabilities</span>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Returns &amp; Reverse Logistics</span>
          </div>

          <div className="returns-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
                border: "1.5px solid #FECDD3",
                color: "#E11D48",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(225, 29, 72, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }} />
                CAPABILITY 05 • MARGIN PRESERVATION &amp; DISPUTE RECOVERY
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Returns &amp; Reverse Logistics: <br />
                <span style={{ background: "linear-gradient(135deg, #E11D48 0%, #0F172A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  24hr Inwarding, Forensic QC &amp; Margin Recovery
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Uninspected returns and fake customer returns drain up to 15-20% of net e-commerce brand profits. Good Life implements a forensic reverse operations workflow: 24-hour barcode inwarding, 4K evidence unboxing, automated SAFE-T dispute claims, and rapid 48-hour restocking.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(225, 29, 72, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE REVERSE AUDIT →</span>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Calculate RTO Losses</span>
                </button>
              </div>

            </div>

            {/* Right: Live Reverse Operations Console (Floating Glass Card) */}
            <div>
              <div className="rose-glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(225, 29, 72, 0.08), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E11D48", boxShadow: "0 0 8px #E11D48" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#881337" }}>
                      Reverse Recovery Terminal
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#E11D48", background: "#FFF1F2", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    ACTIVE QC BENCH
                  </span>
                </div>

                {/* 4 Health Telemetry Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>RTO Reduction</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#E11D48", marginTop: "2px" }}>-34.2%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Automated WhatsApp NDR</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>SAFE-T Dispute Win</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>91.2%</div>
                    <div style={{ fontSize: "0.68rem", color: "#059669", marginTop: "2px", fontWeight: 700 }}>4K Video Evidence Proof</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Grade-A Restock</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#2563EB", marginTop: "2px" }}>64.2%</div>
                    <div style={{ fontSize: "0.68rem", color: "#2563EB", marginTop: "2px", fontWeight: 600 }}>Restocked in &lt;48 Hours</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Monthly Recovered</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>₹14.2 Lakh</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Reimbursed into Brand Bank</div>
                  </div>
                </div>

                {/* Live Micro Status */}
                <div style={{ background: "#F1F5F9", padding: "0.85rem 1rem", borderRadius: "12px", fontSize: "0.75rem", color: "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E11D48" }} />
                    SAFE-T claim #8892 approved: ₹48,200 credited by Amazon
                  </span>
                  <span style={{ fontWeight: 700, color: "#E11D48" }}>Just now</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS (Matching Screenshot 2 Aesthetic) ── */}
          <div className="returns-stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "-34.2%",
                label: "Average RTO Reduction",
                description: "Automated WhatsApp address verification and COD-to-prepaid incentives",
                tag: "RTO Prevention",
                tagColor: "#E11D48",
                tagBg: "#FFF1F2",
                borderColor: "rgba(225, 29, 72, 0.2)",
                subText: "Pre-Dispatch Verification"
              },
              {
                value: "91.2%",
                label: "SAFE-T Dispute Approval",
                description: "4K forensic unboxing video evidence compelling full marketplace reimbursement",
                tag: "Fraud Defense",
                tagColor: "#059669",
                tagBg: "#F0FDF4",
                borderColor: "rgba(5, 150, 105, 0.2)",
                subText: "100% Video Archival"
              },
              {
                value: "64.0%",
                label: "Grade-A Immediate Restock",
                description: "Unopened sealed units cleaned and restocked into active catalog within 48h",
                tag: "Capital Velocity",
                tagColor: "#2563EB",
                tagBg: "#EFF6FF",
                borderColor: "rgba(37, 99, 235, 0.2)",
                subText: "Preserves Prime Eligibility"
              },
              {
                value: "₹1.4 Cr+",
                label: "Annual Margin Reclaimed",
                description: "Net capital preserved across customer fraud claims and inventory salvage",
                tag: "EBITDA Impact",
                tagColor: "#0D9488",
                tagBg: "#F0FDFA",
                borderColor: "rgba(13, 148, 136, 0.2)",
                subText: "Direct P&L Addition",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="rose-glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
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
                    <div style={{ width: "96%", height: "100%", background: "#059669" }} />
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

      {/* ── 2. INTERACTIVE 4-TIER RETURN GRADING STATION ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Dynamic Restock Classification
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The 4-Tier Inventory Recovery Grading Matrix
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Every returned product is forensically triaged into one of four grading categories to maximize capital recovery and prevent slow-moving depreciation.
            </p>
          </div>

          {/* 4 Interactive Selector Tabs */}
          <div className="returns-pill-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.75rem",
            marginBottom: "2.5rem"
          }}>
            {gradingTiers.map((t, idx) => {
              const isSelected = activeGrade === idx;
              return (
                <button
                  key={t.grade}
                  onClick={() => setActiveGrade(idx)}
                  style={{
                    padding: "1.1rem 1rem",
                    borderRadius: "16px",
                    border: isSelected ? `2px solid ${t.color}` : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? `0 8px 24px ${t.border}` : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: t.color }}>
                    {t.grade}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: isSelected ? "#0F172A" : "#475569", marginTop: "0.3rem" }}>
                    {t.name.split("/")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Grade Showcase */}
          {(() => {
            const current = gradingTiers[activeGrade];
            return (
              <div className="rose-glass-card grading-detail-grid" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: current.color, background: current.bg, padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    {current.grade} • {current.badge}
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 1rem", letterSpacing: "-0.5px" }}>
                    {current.name}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                    {current.desc}
                  </p>

                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.8rem", textTransform: "uppercase" }}>
                    Standard Operating Procedure:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem" }}>
                    {current.steps.map((st, sIdx) => (
                      <div key={sIdx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "#FFFFFF", padding: "0.65rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0", fontSize: "0.88rem", fontWeight: 600, color: "#1E293B" }}>
                        <span style={{ color: current.color, fontWeight: 900 }}>✓</span>
                        {st}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Statistics Box */}
                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2rem"
                }}>
                  <div style={{ textAlign: "center", paddingBottom: "1.5rem", borderBottom: "1px solid #E2E8F0", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "2.8rem", fontWeight: 900, color: current.color, lineHeight: 1 }}>
                      {current.recoveryShare}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginTop: "0.4rem" }}>
                      Portfolio Distribution
                    </div>
                  </div>

                  <div style={{ background: "#FFFFFF", padding: "1rem", borderRadius: "12px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, display: "block" }}>Commercial Outcome:</span>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: current.color, marginTop: "4px", display: "block" }}>
                      {current.action}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 3. INTERACTIVE SAFE-T CLAIM DISPUTE FUNNEL ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Forensic Recovery Pipeline
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The 4-Step SAFE-T Claim Reimbursement Funnel
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              When customers return counterfeit items, old used units, or empty boxes, our airtight forensic evidence workflow ensures 91.2% capital reimbursement from platform claims.
            </p>
          </div>

          {/* 4 Funnel Stages */}
          <div className="funnel-detail-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginBottom: "2.5rem"
          }}>
            {claimFunnelSteps.map((step, idx) => {
              const isSelected = activeClaimStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveClaimStep(idx)}
                  style={{
                    padding: "1.5rem 1.25rem",
                    borderRadius: "18px",
                    border: isSelected ? "2px solid #E11D48" : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? "0 8px 24px rgba(225, 29, 72, 0.12)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: isSelected ? "#E11D48" : "#94A3B8", lineHeight: 1 }}>
                    {step.num}
                  </div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: isSelected ? "#E11D48" : "#94A3B8", textTransform: "uppercase", margin: "0.4rem 0 0.2rem" }}>
                    {step.tag}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: isSelected ? "#0F172A" : "#475569", lineHeight: 1.3 }}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Funnel Showcase */}
          {(() => {
            const current = claimFunnelSteps[activeClaimStep];
            return (
              <div className="rose-glass-card" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#E11D48", background: "#FFF1F2", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    STEP {current.num} • {current.tag}
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 1rem", letterSpacing: "-0.5px" }}>
                    {current.title}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                    {current.desc}
                  </p>
                </div>

                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "3rem", fontWeight: 900, color: "#E11D48", lineHeight: 1, letterSpacing: "-1px" }}>
                    {current.metric}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1E293B", marginTop: "0.6rem" }}>
                    {current.metricLabel}
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 4. THE 4-PILLAR NDR & RTO REDUCTION BLUEPRINT ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Pre-Return Prevention
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The 4-Pillar NDR &amp; RTO Minimization Blueprint
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              The cheapest return is the one that never happens. Here is how we stop orders from turning into costly reverse freight in transit.
            </p>
          </div>

          <div className="rto-pillars-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem"
          }}>
            {rtoPillars.map((p, idx) => (
              <div key={idx} className="rose-glass-card" style={{ padding: "2rem 1.5rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#FFF1F2", color: "#E11D48", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", marginBottom: "1rem" }}>
                  0{idx + 1}
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", margin: "0 0 0.8rem", lineHeight: 1.35 }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. HEAD-TO-HEAD COMPARISON TABLE ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Operational Rigor
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Neglected Warehouse Returns vs. Good Life Forensic Recovery
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Compare how standard warehouse operators leak brand profit versus our disciplined reverse logistics framework.
            </p>
          </div>

          <div className="rose-glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#64748B", width: "26%" }}>REVERSE LOGISTICS PARAMETER</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#EF4444", width: "37%" }}>CONVENTIONAL WAREHOUSE</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 900, color: "#E11D48", width: "37%" }}>GOOD LIFE FORENSIC REVERSE</th>
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
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5, background: "rgba(225, 29, 72, 0.02)" }}>
                      <span style={{ color: "#E11D48", fontWeight: 900, marginRight: "0.4rem" }}>✓</span>
                      {row.goodlife}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── 6. EXECUTIVE AUDIT BANNER & NEXT STEPS ── */}
      <section style={{ padding: "5rem 0", background: "#0B1736" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="returns-banner-box" style={{
            background: "linear-gradient(135deg, rgba(225, 29, 72, 0.25) 0%, rgba(15, 23, 42, 0.2) 100%)",
            border: "1.5px solid rgba(225, 29, 72, 0.4)",
            borderRadius: "26px",
            padding: "3.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}>
            <div style={{ maxWidth: "700px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#FDA4AF", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                REVERSE LOGISTICS AUDIT
              </span>
              <h3 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#FFFFFF", margin: "0.8rem 0 1rem", letterSpacing: "-1px" }}>
                Stop RTO Leaks &amp; Customer Fraud on Your Seller Portals
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
                Let our reverse supply chain specialists audit your last 90 days of return manifests, identify unfiled SAFE-T claims, and calculate your exact RTO margin leakage.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/book-meeting"
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(225, 29, 72, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>BOOK REVERSE AUDIT →</span>
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
