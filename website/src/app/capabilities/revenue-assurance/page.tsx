"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function RevenueAssurancePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [monthlyGmvLakhs, setMonthlyGmvLakhs] = useState<number>(150); // ₹1.5 Crores
  const [activeRadarIndex, setActiveRadarIndex] = useState<number>(0);

  // Fee Leakage Breakdown Percentages specified in prompt:
  // Commission overcharges 0.8%, Weight slab errors 1.2%, Uncredited customer returns 0.9%, Lost inventory claims 0.7%
  // Total leakage = 3.6%
  const monthlyGmvValue = monthlyGmvLakhs * 100000;
  const commissionLeakage = Math.round(monthlyGmvValue * 0.008);
  const weightLeakage = Math.round(monthlyGmvValue * 0.012);
  const returnsLeakage = Math.round(monthlyGmvValue * 0.009);
  const lostInvLeakage = Math.round(monthlyGmvValue * 0.007);
  const totalMonthlyLeakage = commissionLeakage + weightLeakage + returnsLeakage + lostInvLeakage;
  const annualCapitalRecoverable = totalMonthlyLeakage * 12;

  const sixRadarPoints = [
    {
      num: "01",
      title: "Category Commission Audits",
      leakageRate: "0.8% of GMV",
      desc: "Platforms routinely misclassify high-ticket ASINs into higher-tier commission categories or miscalculate closing fees during promotional deal events.",
      protocol: "Automated SKU category rate-card validation across every monthly tax invoice."
    },
    {
      num: "02",
      title: "Volumetric Weight Discrepancies",
      leakageRate: "1.2% of GMV",
      desc: "Marketplace courier scales over-measure parcel dimensions, bumping products from 500g tiers into 1kg+ freight brackets without seller knowledge.",
      protocol: "Photographic & 3D dimension proof matched against carrier billing files to dispute overbilled fees."
    },
    {
      num: "03",
      title: "Customer Return Credits",
      leakageRate: "0.9% of GMV",
      desc: "When a customer requests a return, marketplaces immediately debit the seller. If the item is never physically handed to courier, credits are rarely issued automatically.",
      protocol: "Continuous reverse AWB tracking triggering automated reimbursement claims at Day 60."
    },
    {
      num: "04",
      title: "Storage Fees & Aged Inventory",
      leakageRate: "0.4% of GMV",
      desc: "Erroneous cubic-foot volume calculations in marketplace fulfillment centers causing inflated monthly long-term storage fees.",
      protocol: "Audit of FBA/Fulfillment Center cubic space measurements against physical product master."
    },
    {
      num: "05",
      title: "TCS / TDS Ledger Matching",
      leakageRate: "100% Reconciled",
      desc: "Marketplace Tax Deducted at Source (TDS 1%) and Tax Collected at Source (TCS 1%) must reconcile with GSTR-2B and Form 26AS.",
      protocol: "Dual-sided tax credit ledger export aligned with chartered accountant filings."
    },
    {
      num: "06",
      title: "Lost Shipment Claims",
      leakageRate: "0.7% of GMV",
      desc: "Inbound shipments lost inside marketplace receiving docks or units damaged during inter-fulfillment center transfers.",
      protocol: "Dock-to-dock discrepancy reconciliation filing claims before the 90-day policy cutoff."
    }
  ];

  const waterfallSteps = [
    {
      step: "01",
      title: "Bank UTR Remittance Ingestion",
      desc: "Daily automated ingestion of bank settlement files and marketplace disbursement reports across Amazon, Flipkart, and Quick Commerce."
    },
    {
      step: "02",
      title: "Order-Level Fee Parsing",
      desc: "Every order line item is matched against agreed contract rate-cards, commission slabs, and shipping weight tiers."
    },
    {
      step: "03",
      title: "Discrepancy Flagging",
      desc: "Algorithmic audit flags overcharged shipping, unauthorized promotional discounts, and uncredited customer return debits."
    },
    {
      step: "04",
      title: "Marketplace Dispute Filing",
      desc: "Structured batch claims with photographic proof and AWB manifests submitted directly to portal seller resolution cells."
    },
    {
      step: "05",
      title: "Credit Note Verification",
      desc: "Dispute approvals verified against subsequent bank payout cycles to ensure 100% of awarded capital hits your bank account."
    }
  ];

  const discrepancyDossiers = [
    {
      orderId: "OD-49201948201",
      platform: "Amazon IN",
      issue: "Incorrect Volumetric Weight Slab (Charged 1.5kg instead of 650g)",
      overcharge: "₹184 / unit across 420 orders",
      recovery: "₹77,280 Recovered",
      status: "Dispute Settled"
    },
    {
      orderId: "OD-88192039102",
      platform: "Flipkart",
      issue: "Commission Misclassification (Charged 15% instead of 10.5% electronics fee)",
      overcharge: "₹450 / unit across 210 units",
      recovery: "₹94,500 Recovered",
      status: "Credit Note Issued"
    },
    {
      orderId: "OD-33104928190",
      platform: "Amazon Easy Ship",
      issue: "Uncredited Customer Return (Courier lost parcel; debited seller)",
      overcharge: "Full item price + return freight fee",
      recovery: "₹34,200 Recovered",
      status: "SAFE-T Approved"
    }
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <style>{`
        .light-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .light-panel:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.08);
          border-color: #A7F3D0;
        }
        .touch-slider-green {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: #E2E8F0;
          outline: none;
          margin: 1.25rem 0;
          cursor: pointer;
        }
        .touch-slider-green::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #10B981;
          border: 3px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .rev-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .calc-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .radar-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .waterfall-desktop { display: none !important; }
          .waterfall-mobile { display: flex !important; }
          .dossier-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .radar-grid { grid-template-columns: 1fr !important; }
          .calc-breakdown-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-inner-box { padding: 2rem 1.5rem !important; }
        }
      `}</style>
      
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section style={{
        paddingTop: "9rem",
        paddingBottom: "5.5rem",
        background: "linear-gradient(180deg, #ECFDF5 0%, #FFFFFF 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="rev-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Messaging */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: "999px", marginBottom: "1.25rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#065F46", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  CAPABILITY 06 // FINANCIAL RECONCILIATION & FEE LEAKAGE
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.3rem, 4.5vw, 3.8rem)",
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: "0 0 1.25rem"
              }}>
                Stop Marketplace Fee Leakage. Reclaim Trapped Brand Capital.
              </h1>

              <p style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#475569",
                lineHeight: 1.65,
                margin: "0 0 2rem",
                maxWidth: "580px"
              }}>
                Marketplace algorithms silently overcharge brands 2% to 5% of GMV through volumetric weight miscalculations, uncredited customer returns, and incorrect commission rates. We audit every order and recover every rupee.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  REQUEST DIAGNOSTIC →
                </button>

                <Link
                  href="/book-meeting"
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#EFF6FF";
                    e.currentTarget.style.borderColor = "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#BFDBFE";
                  }}
                >
                  Schedule Strategy Session
                </Link>
              </div>
            </div>

            {/* Right: Financial Assurance Terminal (White Dashboard) */}
            <div style={{
              background: "#FFFFFF",
              border: "1.5px solid #A7F3D0",
              borderRadius: "24px",
              boxShadow: "0 12px 35px rgba(16, 185, 129, 0.05), 0 2px 6px rgba(15, 23, 42, 0.03)",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "1rem 1.5rem",
                background: "#ECFDF5",
                borderBottom: "1px solid #D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#065F46", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    FINANCIAL ASSURANCE TERMINAL
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#10B981", fontWeight: 700, background: "#D1FAE5", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  DAILY UTR RECON
                </div>
              </div>

              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                
                {/* Metric 1 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B" }}>Total Capital Recovered</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10B981", background: "#ECFDF5", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      100% Deposited
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                    ₹3.82 Cr
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: "98%", height: "100%", background: "linear-gradient(90deg, #10B981 0%, #2563EB 100%)" }} />
                  </div>
                </div>

                {/* Metric 2 & 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Commission Accuracy</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10B981" }}>100%</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>Zero Rate Creep</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Weight Dispute Win Rate</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A" }}>98.4%</div>
                    <div style={{ fontSize: "0.72rem", color: "#10B981", fontWeight: 700 }}>3D Scan Proof</div>
                  </div>
                </div>

                {/* Audit Cadence */}
                <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "12px", padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#10B981", fontWeight: 800 }}>⚡</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#065F46" }}>Remittance Audit Cycle</span>
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#10B981" }}>DAILY UTR LEDGER</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. REAL INTERACTIVE FEE LEAKAGE CALCULATOR ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#10B981", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              INTERACTIVE REVENUE RECOVERY ESTIMATOR
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Calculate Your Brand's Hidden Fee Leakage
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Adjust your monthly marketplace GMV (₹20 Lakhs – ₹10 Crores) to calculate exact capital recoverable across commission errors, weight discrepancies, and uncredited returns.
            </p>
          </div>

          <div className="calc-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "2.5rem",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "24px",
            padding: "2.5rem",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)"
          }}>
            {/* Input Slider */}
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                    Monthly Marketplace GMV
                  </label>
                  <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#10B981" }}>
                    ₹{(monthlyGmvLakhs / 100).toFixed(2)} Crores
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={monthlyGmvLakhs}
                  onChange={(e) => setMonthlyGmvLakhs(Number(e.target.value))}
                  className="touch-slider-green"
                  aria-label="Monthly Marketplace GMV"
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#94A3B8" }}>
                  <span>₹20 Lakhs</span>
                  <span>₹10.0 Crores</span>
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.25rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                  Estimated Monthly Leakage Breakdown:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Volumetric Weight Slab Errors (1.2%):</span>
                    <strong style={{ color: "#0F172A" }}>₹{(weightLeakage / 1000).toFixed(1)}k / mo</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Uncredited Returns &amp; Lost Parcels (0.9%):</span>
                    <strong style={{ color: "#0F172A" }}>₹{(returnsLeakage / 1000).toFixed(1)}k / mo</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Commission Overcharges (0.8%):</span>
                    <strong style={{ color: "#0F172A" }}>₹{(commissionLeakage / 1000).toFixed(1)}k / mo</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748B" }}>Lost Inventory Claims (0.7%):</span>
                    <strong style={{ color: "#0F172A" }}>₹{(lostInvLeakage / 1000).toFixed(1)}k / mo</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div style={{ background: "#ECFDF5", border: "1.5px solid #A7F3D0", borderRadius: "18px", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  NET CAPITAL RECOVERABLE PER ANNUM
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
                  ₹{(annualCapitalRecoverable / 100000).toFixed(1)} Lakhs <span style={{ fontSize: "1rem", color: "#64748B", fontWeight: 500 }}>/ year</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
                  Total bottom-line cash reclaimed via Good Life's daily order-level reconciliation and automated dispute filing.
                </p>
              </div>

              <div className="calc-breakdown-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid #A7F3D0", paddingTop: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.2rem" }}>Blended Leakage Rate</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#10B981" }}>3.6% of GMV</div>
                  <div style={{ fontSize: "0.72rem", color: "#065F46", fontWeight: 700 }}>Silently eroded margin</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.2rem" }}>Dispute Approval Rate</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>98.4%</div>
                  <div style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 700 }}>Direct bank credits</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. 6-POINT LEAKAGE RADAR ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              COMPREHENSIVE AUDIT PERIMETER
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The 6-Point Margin Leakage Radar
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Our proprietary reconciliation algorithm audits every rupee across 6 critical operational leakage zones.
            </p>
          </div>

          <div className="radar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {sixRadarPoints.map((rp, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "1.75rem 1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#10B981", background: "#ECFDF5", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                    RADAR {rp.num}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B" }}>
                    {rp.leakageRate}
                  </span>
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.3 }}>
                  {rp.title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1rem" }}>
                  {rp.desc}
                </p>
                <div style={{ fontSize: "0.78rem", color: "#0F172A", fontWeight: 600, borderTop: "1px solid #E2E8F0", paddingTop: "0.75rem" }}>
                  ✓ {rp.protocol}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. DAILY ESCROW AUDIT WATERFALL ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#10B981", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              AUTOMATED RECONCILIATION PIPELINE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The Daily Escrow Audit Waterfall
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              How our automated ledger processes thousands of marketplace order disbursements into reconciled bank credits.
            </p>
          </div>

          {/* Desktop Horizontal */}
          <div className="waterfall-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {waterfallSteps.map((ws, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.5rem 1.25rem", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ECFDF5", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {ws.step}
                </div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.35 }}>
                  {ws.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                  {ws.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Vertical */}
          <div className="waterfall-mobile" style={{ display: "none", flexDirection: "column", gap: "1rem" }}>
            {waterfallSteps.map((ws, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#ECFDF5", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>
                    {ws.step}
                  </span>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    {ws.title}
                  </h4>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                  {ws.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. SETTLEMENT DISCREPANCY AUDIT DOSSIERS ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#10B981", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              LINE-ITEM AUDIT EVIDENCE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Settlement Discrepancy Case Dossiers
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Inspect three actual settlement recovery files where our forensic audits reclaimed capital from marketplace accounting errors.
            </p>
          </div>

          <div className="dossier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {discrepancyDossiers.map((dd, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "2rem 1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B" }}>{dd.orderId}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10B981", background: "#ECFDF5", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                    ✓ {dd.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", marginBottom: "0.4rem" }}>
                  {dd.platform}
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.6rem" }}>
                  {dd.issue}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
                  Overcharge pattern: {dd.overcharge}
                </p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.85rem", fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>
                  Recovered: <span style={{ color: "#10B981" }}>{dd.recovery}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. LIGHT ENTERPRISE EXECUTIVE CTA BANNER ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div
            className="cta-inner-box"
            style={{
              background: "linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%)",
              border: "1.5px solid #A7F3D0",
              borderRadius: "24px",
              padding: "3.5rem 3rem",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.06)"
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#10B981", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY REVENUE AUDIT
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Recover Your Trapped Marketplace Capital Under NDA
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our financial forensics team run an automated audit on your last 90 days of Amazon and Flipkart settlement files. We identify your exact fee leakage down to the paisa within 48 hours under NDA.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  SCHEDULE 30-MIN STRATEGY SESSION →
                </Link>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                >
                  Request Diagnostic
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer hideTopBanner={true} />

      <CommerceDiagnosticModal
        isOpen={diagOpen}
        onClose={() => setDiagOpen(false)}
      />
    </div>
  );
}
