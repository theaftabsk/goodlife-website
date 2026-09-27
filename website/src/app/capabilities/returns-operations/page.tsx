"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function ReturnsOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState<number>(0);

  const gradingTiers = [
    {
      grade: "GRADE A",
      name: "Seal Intact / Pristine",
      badge: "100% VALUE RESTORED",
      color: "#16A34A",
      bg: "#F0FDF4",
      border: "#BBF7D0",
      desc: "Items returned due to accidental order or buyer change of mind with factory seal intact. Cleaned, barcode reverified, and injected back into active Prime/Assured inventory within 24 hours.",
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
      name: "Open Box / Minor Cosmetic",
      badge: "85-92% VALUE RESTORED",
      color: "#2563EB",
      bg: "#EFF6FF",
      border: "#BFDBFE",
      desc: "Product is 100% functional and unblemished, but the outer packaging has shipping label tears or transit creases. Re-boxed into fresh manufacturer packaging and relisted at prime prices.",
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
      name: "Transit Damage",
      badge: "65-75% VALUE RESTORED",
      color: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
      desc: "Items damaged in courier transit or missing peripheral accessories. Replenished with original manufacturer spare parts or routed to refurbished B2B liquidators with carrier freight disputes filed.",
      recoveryShare: "8.8% of Total Returns",
      action: "Carrier Damage Dispute Filed",
      steps: [
        "Forensic technician diagnosis and defect categorization",
        "Carrier transit damage manifest documentation",
        "Bench testing and 12-point functional re-certification",
        "B2B bulk salvage or clearance promotional sale"
      ]
    },
    {
      grade: "GRADE D",
      name: "Fraud / Swapped Item",
      badge: "100% CAPITAL RECLAIMED",
      color: "#E11D48",
      bg: "#FFF1F2",
      border: "#FECDD3",
      desc: "Customer returned used goods, swapped the original unit for a fake or broken model, or courier pilfered contents. Automatically isolated into 4K video evidence station and submitted for SAFE-T reimbursement.",
      recoveryShare: "5.5% of Total Returns",
      action: "SAFE-T Claim Filed with Marketplace",
      steps: [
        "Continuous 4K unboxing video recorded from 2 camera angles",
        "Serial number and IMEI comparison against outward dispatch log",
        "Automated PDF dossier generated with weight timestamps",
        "SAFE-T dispute claim submitted to Amazon/Flipkart within 24hr"
      ]
    }
  ];

  const rtoEngineSteps = [
    {
      step: "01",
      title: "Pre-Dispatch PIN Risk",
      badge: "Verification",
      desc: "High-risk Cash-on-Delivery (COD) orders undergo automated WhatsApp address verification and OTP confirmation before warehouse picklists are printed."
    },
    {
      step: "02",
      title: "WhatsApp COD Confirmation",
      badge: "Engagement",
      desc: "Post-purchase incentives offer discounts for switching from COD to UPI/Credit Card, immediately driving RTO incidence down from 24% to below 8%."
    },
    {
      step: "03",
      title: "NDR Escalation",
      badge: "Intervention",
      desc: "When a courier flags 'Customer Unavailable', our automated bot immediately messages the buyer on WhatsApp to schedule an exact re-delivery window."
    },
    {
      step: "04",
      title: "Capital Recovery",
      badge: "Restock / Claim",
      desc: "Returned parcels are scanned within 24 hours of arrival, restocked immediately if pristine, or filed for SAFE-T dispute if fraudulent."
    }
  ];

  const forensicWorkflow = [
    {
      title: "Unboxing Video Station",
      spec: "Overhead 4K Dual-Camera",
      desc: "Flagged packages are unboxed under calibrated high-resolution cameras recording shipping label, outer seal condition, and internal contents."
    },
    {
      title: "Weigh-Scale Evidence",
      spec: "Digital Variance Sensors",
      desc: "In-line scales log arrival weight against the outward shipping receipt. Any discrepancy >50 grams generates timestamped forensic proof."
    },
    {
      title: "Marketplace Appeal Documentation",
      spec: "Automated Dispute PDF",
      desc: "Our reverse platform binds courier tracking histories, weight receipts, and video stills into compliant SAFE-T dispute claims within 24 hours."
    }
  ];

  const caseDossiers = [
    {
      id: "CASE-8491",
      category: "Consumer Electronics",
      incident: "Electronics Unit Swapped with Counterfeit Dummy",
      evidence: "Dock digital scale flagged a 320g weight discrepancy; 4K video proved customer returned a cheap replica.",
      recovery: "₹18,499 Reimbursed",
      status: "SAFE-T Approved"
    },
    {
      id: "CASE-7230",
      category: "Apparel & Footwear",
      incident: "14 Premium Apparel Units Trapped in Reverse Transit",
      evidence: "Courier marked parcels as 'Return In Transit' for 60+ days without physical delivery to the brand warehouse.",
      recovery: "₹42,800 Reimbursed",
      status: "Lost Transit Claim Paid"
    },
    {
      id: "CASE-9104",
      category: "Home & Kitchen",
      incident: "Sealed Order-Cancelled SKU Restocked in 24 Hours",
      evidence: "Doorstep delivery refusal with original holographic seal intact; checked, cleaned, and restocked into Prime.",
      recovery: "₹12,200 Inventory Restored",
      status: "Active Prime Stock"
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
          box-shadow: 0 12px 30px rgba(225, 29, 72, 0.08);
          border-color: #FECDD3;
        }
        @media (max-width: 991px) {
          .ret-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .grading-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .rto-pipeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .forensics-grid { grid-template-columns: 1fr !important; }
          .dossier-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .grading-grid { grid-template-columns: 1fr !important; }
          .rto-pipeline-grid { grid-template-columns: 1fr !important; }
          .cta-inner-box { padding: 2rem 1.5rem !important; }
        }
      `}</style>
      
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section style={{
        paddingTop: "9rem",
        paddingBottom: "5.5rem",
        background: "linear-gradient(180deg, #FFF1F2 0%, #FFFFFF 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ret-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Messaging */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", background: "#FFE4E6", border: "1px solid #FECDD3", borderRadius: "999px", marginBottom: "1.25rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9F1239", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  CAPABILITY 05 // REVERSE LOGISTICS & DISPUTE FORENSICS
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
                Transform Costly Returns into Automated Capital Recovery
              </h1>

              <p style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#475569",
                lineHeight: 1.65,
                margin: "0 0 2rem",
                maxWidth: "580px"
              }}>
                Recover margin leakage from customer returns, fraudulent courier swaps, and in-transit RTO damages with 24-hour grading triage and forensic SAFE-T reimbursement filing.
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

            {/* Right: Reverse Logistics Control Station (White Dashboard) */}
            <div style={{
              background: "#FFFFFF",
              border: "1.5px solid #FECDD3",
              borderRadius: "24px",
              boxShadow: "0 12px 35px rgba(225, 29, 72, 0.05), 0 2px 6px rgba(15, 23, 42, 0.03)",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "1rem 1.5rem",
                background: "#FFF1F2",
                borderBottom: "1px solid #FFE4E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#9F1239", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    REVERSE LOGISTICS CONTROL STATION
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#E11D48", fontWeight: 700, background: "#FFE4E6", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  FORENSIC TRIAGE ACTIVE
                </div>
              </div>

              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                
                {/* Metric 1 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B" }}>Total Capital Reclaimed</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      Recovered Cash
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                    ₹1.4 Cr
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: "85%", height: "100%", background: "linear-gradient(90deg, #E11D48 0%, #16A34A 100%)" }} />
                  </div>
                </div>

                {/* Metric 2 & 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>RTO Reduction</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16A34A" }}>-34%</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>WhatsApp OTP &amp; NDR</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>SAFE-T Win Rate</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A" }}>91.2%</div>
                    <div style={{ fontSize: "0.72rem", color: "#E11D48", fontWeight: 700 }}>4K Video Evidence</div>
                  </div>
                </div>

                {/* Restock Velocity */}
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#16A34A", fontWeight: 800 }}>⚡</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#166534" }}>Grade A Re-Inward Rate</span>
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#16A34A" }}>64% (24H RESTOCK)</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. 4-TIER RETURN GRADING STATION ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#E11D48", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              INWARDING TRIAGE WORKBENCH
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              4-Tier Return Grading &amp; Restock Workstation
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Every returned parcel is scanned and graded within 24 hours of warehouse arrival. Select a tier below to inspect its operational recovery path.
            </p>
          </div>

          <div className="grading-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {gradingTiers.map((t, idx) => {
              const isSelected = activeGrade === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveGrade(idx)}
                  style={{
                    padding: "1.25rem 1rem",
                    borderRadius: "16px",
                    border: isSelected ? `1.5px solid ${t.color}` : "1px solid #E2E8F0",
                    background: isSelected ? t.bg : "#FFFFFF",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 4px 14px rgba(15, 23, 42, 0.08)" : "0 2px 6px rgba(15, 23, 42, 0.02)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: t.color, marginBottom: "0.3rem" }}>
                    {t.grade}
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem" }}>
                    {t.name}
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: t.color, background: "#FFFFFF", padding: "0.15rem 0.45rem", borderRadius: "4px", border: `1px solid ${t.border}` }}>
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Grade Deep Dive Panel */}
          {(() => {
            const cur = gradingTiers[activeGrade];
            return (
              <div style={{ background: "#FFFFFF", border: `1px solid ${cur.border}`, borderRadius: "22px", padding: "2.5rem", boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: cur.color, background: cur.bg, padding: "0.25rem 0.65rem", borderRadius: "6px" }}>
                      {cur.grade}: {cur.badge}
                    </span>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0.75rem 0 0.35rem" }}>
                      {cur.name}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, maxWidth: "700px" }}>
                      {cur.desc}
                    </p>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "0.75rem 1.25rem", textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Triage Share</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: cur.color }}>{cur.recoveryShare}</div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.5rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", textTransform: "uppercase", marginBottom: "1rem" }}>
                    OPERATIONAL PROTOCOL STEPS:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                    {cur.steps.map((s, sIdx) => (
                      <div key={sIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span style={{ color: cur.color, fontWeight: 800 }}>✓</span>
                        <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 500 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 3. RTO MINIMIZATION ENGINE ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#E11D48", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PRE-RETURN PREVENTION ENGINE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The 4-Step RTO Minimization Blueprint
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              The cheapest return is the one that never happens. Here is our automated workflow stopping returns before freight charges accrue.
            </p>
          </div>

          <div className="rto-pipeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {rtoEngineSteps.map((re, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "1.75rem 1.5rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF1F2", color: "#E11D48", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {re.step}
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.4rem" }}>
                  {re.title}
                </h4>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#E11D48", background: "#FFF1F2", padding: "0.15rem 0.45rem", borderRadius: "4px", display: "inline-block", marginBottom: "0.85rem" }}>
                  {re.badge}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                  {re.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. DISPUTE FORENSICS EVIDENCE WORKFLOW ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              IRREFUTABLE EVIDENCE CHAIN
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Dispute Forensics &amp; Video Station Architecture
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Marketplaces routinely reject fraud claims due to insufficient evidence. Good Life records an unbroken digital audit trail.
            </p>
          </div>

          <div className="forensics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {forensicWorkflow.map((fw, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "2rem 1.75rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.2rem 0.6rem", borderRadius: "6px", display: "inline-block", marginBottom: "0.85rem" }}>
                  FORENSIC MODULE 0{idx + 1}
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.4rem" }}>
                  {fw.title}
                </h4>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563EB", marginBottom: "0.85rem" }}>
                  {fw.spec}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  {fw.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. REAL-WORLD FORENSIC CASE DOSSIERS ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#E11D48", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              DOCUMENTED CASE ARCHIVE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Real-World Fraud Interceptions &amp; Capital Reclaims
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Inspect three actual dispute resolutions where Good Life's forensic unboxing evidence and carrier ledgers recovered brand capital.
            </p>
          </div>

          <div className="dossier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {caseDossiers.map((cd, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "2rem 1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B" }}>{cd.id}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                    ✓ {cd.status}
                  </span>
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.6rem" }}>
                  {cd.incident}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 1.25rem" }}>
                  {cd.evidence}
                </p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.85rem", fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>
                  Result: <span style={{ color: "#16A34A" }}>{cd.recovery}</span>
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
              background: "linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)",
              border: "1.5px solid #FECDD3",
              borderRadius: "24px",
              padding: "3.5rem 3rem",
              boxShadow: "0 10px 30px rgba(225, 29, 72, 0.06)"
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#E11D48", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY REVERSE AUDIT
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Stop RTO Leaks &amp; Customer Fraud on Your Seller Portals
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our reverse supply chain specialists audit your last 90 days of return manifests, identify unfiled SAFE-T claims, and calculate your exact RTO margin leakage within 48 hours under NDA.
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
