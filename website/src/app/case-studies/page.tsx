"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface CaseStudy {
  id: string;
  tag: string;
  category: string;
  client: string;
  headline: string;
  timeframe: string;
  metrics: { val: string; lbl: string }[];
  challenge: string;
  actionTaken: string[];
  outcome: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "oem-appliances",
    tag: "Launch Online",
    category: "Launch Online",
    client: "Tier-1 Home Appliances OEM",
    headline: "From Contract Manufacturer to ₹18 Cr/yr Direct Marketplace Brand",
    timeframe: "9 Months from Zero",
    metrics: [
      { val: "₹18.4Cr", lbl: "Annual Run-Rate" },
      { val: "13.8%", lbl: "Blended TACOS" },
      { val: "Top 3", lbl: "Category BSR Rank" }
    ],
    challenge: "A 25-year-old appliance manufacturer with zero direct-to-consumer presence was losing margins to traditional distributors and wanted to launch ceiling fans and induction cooktops directly on Amazon and Flipkart without alienating offline dealers.",
    actionTaken: [
      "Designed an exclusive online D2C sub-brand with unique model numbers and pricing guardrails.",
      "Engineered drop-tested master packaging compliant with marketplace conveyor standards.",
      "Deployed inventory across 6 regional Good Life warehouses, securing Prime/Fast delivery badges.",
      "Structured tiered sponsored ads, keyword harvest campaigns, and brand-registry protection."
    ],
    outcome: "Scaled from zero to ₹1.5+ Cr monthly GMV within 9 months, maintaining 18.2% operating profit margin after all marketplace fees and logistics costs."
  },
  {
    id: "bulky-appliances",
    tag: "Heavy & Bulky",
    category: "Heavy & Bulky",
    client: "Premium Kitchen Chimney & Cooktop Brand",
    headline: "Eliminating Transit Damage & Slashing Return Freight from 18% to 2.8%",
    timeframe: "4 Months",
    metrics: [
      { val: "-82%", lbl: "Transit Breakage" },
      { val: "2.8%", lbl: "Final Return Rate" },
      { val: "48h", lbl: "Doorstep Delivery SLA" }
    ],
    challenge: "High in-transit glass canopy breakage on kitchen chimneys (exceeding 14% damage rates) was eroding seller ratings and generating astronomical two-way freight debit notes from courier partners.",
    actionTaken: [
      "Engineered customized wooden crating and reinforced high-density edge buffer boards.",
      "Rerouted line-haul movements away from rough conveyor sorting hubs into dedicated palletized surface networks.",
      "Deployed stock into 8 regional hubs, cutting delivery transit distances by 65%.",
      "Integrated two-person doorstep delivery with pre-call customer delivery appointment scheduling."
    ],
    outcome: "Transit damage collapsed from 14.2% to under 0.4%. Customer return rate decreased from 18% to 2.8%, saving over ₹42 Lakh in quarterly freight penalties."
  },
  {
    id: "revenue-recovery",
    tag: "Revenue Assurance",
    category: "Fix & Grow",
    client: "Consumer Electronics & Audio Brand",
    headline: "Auditing 14 Months of Marketplace Ledger to Recover ₹84 Lakh Leaked Capital",
    timeframe: "60 Days Audit",
    metrics: [
      { val: "₹84.2L", lbl: "Cash Recovered" },
      { val: "100%", lbl: "SAFE-T Claim SLA" },
      { val: "+3.1%", lbl: "Net Margin Increase" }
    ],
    challenge: "Despite generating ₹4 Cr monthly GMV, the brand's finance team noticed continuous cash flow compression due to unverified commission debits, volumetric weight overcharges, and uncredited return parcels.",
    actionTaken: [
      "Ingested 14 months of raw marketplace settlement files into Good Life's algorithmic reconciliation engine.",
      "Identified 38,000+ orders where courier volumetric dimensions were billed at higher weight tiers.",
      "Filed 1,400+ evidence-backed SAFE-T claims for missing and damaged customer returns with unboxing video proof.",
      "Instituted automated daily reconciliation guardrails to flag ledger anomalies within 24 hours."
    ],
    outcome: "Recovered ₹84.2 Lakh directly into the brand's seller settlement accounts within 60 days, providing an immediate 3.1% net margin expansion."
  },
  {
    id: "pan-india-scale",
    tag: "Scale Pan-India",
    category: "Scale Pan-India",
    client: "National Cookware & Kitchen Essentials Brand",
    headline: "Transitioning from Single Factory Dispatch to 12-State Next-Day Delivery",
    timeframe: "5 Months",
    metrics: [
      { val: "91%", lbl: "Next-Day Delivery Reach" },
      { val: "+44%", lbl: "Organic Buybox Win Rate" },
      { val: "-28%", lbl: "Per-Unit Logistics Cost" }
    ],
    challenge: "Operating from a single centralized factory warehouse in Gujarat, the brand suffered 5-7 day delivery SLAs to South and East India, losing the Amazon Buybox to regional competitors with next-day Prime badges.",
    actionTaken: [
      "Secured state GST APOB registrations across 10 additional states within 30 days.",
      "Algorithmically partitioned national inventory based on historical pin-code demand heatmaps.",
      "Transferred 60% of volume to regional hubs in Bhiwandi, Gurugram, Bengaluru, and Dankuni.",
      "Integrated regional ERP stock balancing preventing regional stockouts."
    ],
    outcome: "Buybox ownership surged by 44%, conversion rate jumped from 3.2% to 5.4%, while overall freight costs decreased by 28% due to localized zonal shipping rates."
  }
];

export default function CaseStudiesPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredStories = activeTab === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === activeTab);

  return (
    <div className={`case-studies-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Case Studies & Proof</span>
          </div>

          <div style={{ maxWidth: "880px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              color: "#1D4ED8",
              fontSize: "0.82rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              Verified Outcomes • Operational Case Studies
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Proof in Numbers: <br />
              <span style={{ color: "#2563EB" }}>Accountable Operations in Action</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              Explore verified performance case studies detailing how Good Life helps consumer brands solve inventory stockouts, eliminate transit damage, recover leaked platform revenue, and scale pan-India.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.32)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>UNLOCK YOUR GROWTH</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: "3rem 0 1rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {(["All", "Launch Online", "Fix & Grow", "Scale Pan-India", "Heavy & Bulky"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.6rem 1.3rem",
                  borderRadius: "999px",
                  border: activeTab === tab ? "1.5px solid #2563EB" : "1.5px solid #CBD5E1",
                  background: activeTab === tab ? "#2563EB" : "#FFFFFF",
                  color: activeTab === tab ? "#FFFFFF" : "#475569",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Cards List */}
      <section style={{ padding: "2rem 0 6rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {filteredStories.map((cs) => (
              <div
                key={cs.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "2.8rem",
                  border: "1.5px solid #E2E8F0",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.2rem" }}>
                  <div>
                    <span style={{
                      display: "inline-block",
                      padding: "0.25rem 0.8rem",
                      borderRadius: "6px",
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "0.5rem"
                    }}>
                      {cs.tag}
                    </span>
                    <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>{cs.client} • {cs.timeframe}</div>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    {cs.metrics.map((m, mIdx) => (
                      <div key={mIdx} style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2563EB" }}>{m.val}</div>
                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>{m.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0B1736", margin: "0 0 1.2rem", lineHeight: 1.3 }}>
                  {cs.headline}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", margin: "1.8rem 0", background: "#F8FAFC", padding: "1.6rem", borderRadius: "16px", border: "1px solid #E2E8F0" }} className="cs-detail-grid">
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "0.5rem" }}>
                      The Operational Challenge
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                      {cs.challenge}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "0.5rem" }}>
                      Verified Business Outcome
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
                      {cs.outcome}
                    </p>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1E293B", marginBottom: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Strategic Actions Deployed by Good Life:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
                    {cs.actionTaken.map((act, aIdx) => (
                      <div key={aIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                        <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#EFF6FF", color: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.5, fontWeight: 500 }}>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section style={{ padding: "5rem 0 5.5rem", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{
            background: "linear-gradient(135deg, #0B1736 0%, #0F2557 100%)",
            borderRadius: "28px",
            padding: "3.5rem 3rem",
            color: "#FFFFFF",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(11, 23, 54, 0.25)"
          }}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.12)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                color: "#60A5FA"
              }}>
                Proven Methodology
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Ready to Author Your Brand&apos;s Growth Story?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Start with our interactive Commerce Diagnostic to assess your operational health, category headroom, and warehouse readiness.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "56px",
                    padding: "0 2.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <Link
                  href="/contact"
                  style={{
                    height: "56px",
                    padding: "0 2rem",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1.5px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  Discuss Custom Strategy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
