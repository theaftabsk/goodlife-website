"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function LaunchOnlinePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<number>(0);
  const [activeJourneyNode, setActiveJourneyNode] = useState<number>(0);
  const [isPhasePaused, setIsPhasePaused] = useState<boolean>(false);
  const [isJourneyPaused, setIsJourneyPaused] = useState<boolean>(false);

  // ── AUTO-CYCLE: 60-Day Roadmap (every 4.5s) ──
  useEffect(() => {
    if (isPhasePaused) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhasePaused]);

  // ── AUTO-CYCLE: Factory-to-Scale Pipeline (every 3.5s) ──
  useEffect(() => {
    if (isJourneyPaused) return;
    const interval = setInterval(() => {
      setActiveJourneyNode((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, [isJourneyPaused]);

  // Readiness tool state
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true
  });

  const checklist = [
    { title: "Registered Trademark", sub: "Required for Amazon Brand Registry 2.0 & Buybox defense" },
    { title: "Active State GSTIN", sub: "Primary billing and subsequent APOB multi-state tax mapping" },
    { title: "Master SKU Spec Sheets", sub: "Raw technical specifications to draft conversion-optimized A+ content" },
    { title: "Barcodes (GS1 / EAN)", sub: "Mandatory for automated warehouse scanning and catalog indexing" },
    { title: "Drop-Tested Packaging", sub: "Engineered to withstand multi-touch Indian courier transit chutes" }
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  const getReadinessStatus = () => {
    if (readinessPercent === 100) return { text: "100% READY", color: "#16A34A", bg: "#DCFCE7", desc: "Ready for expedited 30-day go-to-market dispatch" };
    if (readinessPercent >= 80) return { text: "80% NEAR READY", color: "#2563EB", bg: "#EFF6FF", desc: "Minor asset finalization needed during Phase 1" };
    if (readinessPercent >= 60) return { text: "60% PREPARATION REQUIRED", color: "#D97706", bg: "#FEF3C7", desc: "Brand incubation support required for trademark/barcodes" };
    return { text: "INITIAL STAGE", color: "#DC2626", bg: "#FEE2E2", desc: "Foundational compliance required before onboarding" };
  };

  const phases = [
    {
      id: "01",
      timeline: "Days 1 – 15",
      title: "Brand Foundation & Category Approvals",
      summary: "Securing brand registry, category gates, tax mapping, and trademark defenses before spending a single rupee on ads.",
      deliverables: [
        "Amazon Brand Registry 2.0 and Flipkart Brand Authorization verification",
        "Category ungating and hazardous/heavy-bulky classification clearance",
        "State GST, TCS, and TDS legal entity configuration",
        "SKU barcode mapping and digital catalog master architecture"
      ]
    },
    {
      id: "02",
      timeline: "Days 16 – 30",
      title: "Conversion Engine & A+ Content",
      summary: "Transforming raw factory engineering specs into conversion-focused listings engineered for high organic indexing.",
      deliverables: [
        "High-intent keyword harvesting and backend search term indexing",
        "3D exploded render creation and lifestyle infographic design",
        "Brand Story and premium A+ / Enhanced Brand Content module publication",
        "Compliance packaging drop-test certification for courier line-hauls"
      ]
    },
    {
      id: "03",
      timeline: "Days 31 – 45",
      title: "Warehouse Deployment & Buybox Seed",
      summary: "Distributing initial inventory into strategic regional fulfillment nodes to unlock same-day and next-day delivery badges.",
      deliverables: [
        "First-mile pallet pickup from your manufacturing facility",
        "Inwarding across key regional hubs (Bhiwandi, Gurugram, Bengaluru)",
        "Amazon Seller-Flex / Prime badge activation and Flipkart FBF onboarding",
        "Initial seed reviews and early reviewer program protocol execution"
      ]
    },
    {
      id: "04",
      timeline: "Days 46 – 60+",
      title: "Full-Throttle Advertising & Scale",
      summary: "Deploying profit-guarded ad campaigns and automated daily settlement reconciliations to scale profitability.",
      deliverables: [
        "Tiered sponsored product, sponsored brand, and display ad campaigns",
        "Targeted competitor ASIN conquesting and defensive brand term bidding",
        "Daily automated settlement audits catching platform fee deductions early",
        "Weekly executive P&L, ROAS, and inventory replenishment reporting"
      ]
    }
  ];

  const journeySteps = [
    {
      step: "01",
      name: "FACTORY",
      desc: "Contract manufacturing or OEM production line with ready inventory",
      detail: "We audit master cartons, packaging strength, and barcoding directly at your factory dock."
    },
    {
      step: "02",
      name: "BRAND FOUNDATION",
      desc: "Trademark defense & legal entity multi-platform setup",
      detail: "Securing Brand Registry 2.0 to permanently block unauthorized counterfeit sellers."
    },
    {
      step: "03",
      name: "CATALOGUE",
      desc: "High-conversion A+ content & keyword indexing",
      detail: "Infographic creation, 3D exploded views, and backend search term optimization."
    },
    {
      step: "04",
      name: "WAREHOUSE",
      desc: "12-state regional hub deployment for Next-Day Prime",
      detail: "Sub-4hr dispatch SLA ensuring your listings win the Amazon Buybox."
    },
    {
      step: "05",
      name: "MARKETPLACE",
      desc: "Amazon, Flipkart, Quick Commerce & D2C live selling",
      detail: "Simultaneous multi-channel order orchestration under unified stock planning."
    },
    {
      step: "06",
      name: "NATIONAL SCALE",
      desc: "Profit-guarded ad scaling & daily settlement recovery",
      detail: "Scaling from initial launch to ₹1Cr+ monthly GMV with audited net margins."
    }
  ];

  const readinessStatus = getReadinessStatus();

  return (
    <div className={`launch-online-page ${inter.className}`} style={{ background: "#F8FAFC", color: "#0B1736", minHeight: "100vh" }}>
      {/* ── 01: HEADER ── */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 02: BREADCRUMB ── */}
      <div style={{ paddingTop: "7.5rem", paddingBottom: "1rem", maxWidth: "1200px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>
          <Link href="/" style={{ color: "#2563EB", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "#94A3B8" }}>/</span>
          <span style={{ color: "#0B1736" }}>Launch Online Solution</span>
        </div>
      </div>

      {/* ── 03: HERO SECTION ── */}
      <section style={{
        position: "relative",
        paddingTop: "1.5rem",
        paddingBottom: "5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 60%, #FFFFFF 100%)",
        overflow: "hidden"
      }}>
        {/* Navy Blue Ambient Glow */}
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "600px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(11, 23, 54, 0.03) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr", gap: "3.5rem", alignItems: "center" }} className="launch-hero-split">
            
            {/* Left Side Content */}
            <div>
              {/* Eyebrow */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1.1rem",
                borderRadius: "999px",
                background: "#EFF6FF",
                border: "1.5px solid rgba(37, 99, 235, 0.2)",
                color: "#1D4ED8",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                marginBottom: "1.5rem"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
                SOLUTION 01 • FROM FACTORY FLOOR TO MARKETPLACE VELOCITY
              </div>

              {/* H1 Heading */}
              <h1 style={{
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#0B1736",
                letterSpacing: "-2.5px",
                margin: "0 0 1.4rem"
              }}>
                Launch Online: <br />
                <span style={{ color: "#2563EB" }}>The Enterprise Incubation Mandate</span>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
                color: "#53627A",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "680px",
                fontWeight: 500
              }}>
                For traditional offline manufacturers, OEMs, and industrial brands entering ecommerce. Good Life builds, operates, and scales your direct digital sales channel—operating cataloguing, warehousing, ads, and revenue assurance without disrupting your offline dealer network.
              </p>

              {/* CTAs */}
              <div className="launch-hero-btn-row" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "56px",
                    padding: "0 2.2rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 28px rgba(37, 99, 235, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    transition: "all 0.22s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 14px 34px rgba(37, 99, 235, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 28px rgba(37, 99, 235, 0.35)";
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
                    padding: "0 1.8rem",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1.5px solid #CBD5E1",
                    color: "#0B1736",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    transition: "all 0.22s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#CBD5E1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Consult Incubation Lead
                </Link>
              </div>
            </div>

            {/* ── 04 & 05: HERO RIGHT — READINESS TOOL (Compact Clean Enterprise Card) ── */}
            <div className="launch-readiness-card" style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "1.35rem 1.5rem 1.4rem",
              border: "1px solid #E2E8F0",
              boxShadow: "0 14px 36px rgba(11, 23, 54, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.7px" }}>
                  LAUNCHPAD READINESS TOOL
                </span>
                <span style={{
                  padding: "0.22rem 0.65rem",
                  borderRadius: "999px",
                  background: readinessStatus.bg,
                  color: readinessStatus.color,
                  fontSize: "0.74rem",
                  fontWeight: 800
                }}>
                  {readinessStatus.text}
                </span>
              </div>

              <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.2rem" }}>
                Brand Launch Prerequisite Checker
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0 0 0.75rem", lineHeight: 1.4 }}>
                {readinessStatus.desc}
              </p>

              {/* Progress Bar */}
              <div style={{ width: "100%", height: "5px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden", marginBottom: "0.85rem" }}>
                <div style={{
                  width: `${readinessPercent}%`,
                  height: "100%",
                  background: readinessPercent === 100 ? "#16A34A" : "#2563EB",
                  borderRadius: "999px",
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }} />
              </div>

              {/* Checkbox List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1rem" }}>
                {checklist.map((item, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.45rem 0.65rem",
                        borderRadius: "9px",
                        background: isChecked ? "#F0F7FF" : "#F8FAFC",
                        border: isChecked ? "1px solid #BFDBFE" : "1px solid #E2E8F0",
                        cursor: "pointer",
                        transition: "all 0.16s ease"
                      }}
                    >
                      <div style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "5px",
                        border: isChecked ? "none" : "1.5px solid #94A3B8",
                        background: isChecked ? "#2563EB" : "#FFFFFF",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#FFFFFF"
                      }}>
                        {isChecked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.81rem", fontWeight: 700, color: isChecked ? "#1E3A8A" : "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: "0.70rem", color: "#64748B", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Button */}
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  letterSpacing: "0.4px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                  transition: "all 0.18s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1D4ED8";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.25)";
                }}
              >
                <span>REQUEST CUSTOM 45-DAY LAUNCH PLAN</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── 06: HERO METRICS (4 Executive Metric Cards with Top Accent) ── */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="launch-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem" }}>
            {[
              { num: "30–45 Days", label: "Average Time to First Dispatch", sub: "Complete legal, catalog & warehouse setup" },
              { num: "100%", label: "Channel Conflict Guardrail", sub: "Zero price disruption to offline trade dealers" },
              { num: "12+ Hubs", label: "Day-1 Pan-India Reach", sub: "Prime & Fast delivery badges enabled" },
              { num: "Single Partner", label: "End-to-End Ownership", sub: "Manufacturing is yours; commerce is ours" }
            ].map((m, idx) => (
              <div key={idx} style={{
                borderTop: "3px solid #2563EB",
                paddingTop: "1.2rem",
                transition: "transform 0.2s ease"
              }}
              className="metric-card-hover"
              >
                <div style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px" }}>
                  {m.num}
                </div>
                <div style={{ fontSize: "0.98rem", fontWeight: 700, color: "#1E293B", marginTop: "0.35rem" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "0.84rem", color: "#53627A", marginTop: "0.3rem", lineHeight: 1.5 }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07, 08 & 09: THE #1 FEAR SECTION (Full White Bright UI #FFFFFF) ── */}
      <section className="channel-conflict-section" style={{
        background: "#FFFFFF",
        color: "#0B1736",
        padding: "6.5rem 0 7.5rem",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0"
      }}>
        {/* Subtle Ambient Radial Glows */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "550px",
          background: "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.06) 0%, rgba(248, 250, 252, 0.5) 50%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* Section Header */}
          <div className="channel-conflict-header" style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 4.2rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.45rem 1.25rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid rgba(37, 99, 235, 0.22)",
              color: "#2563EB",
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
            }}>
              <span className="pulse-blue-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              THE #1 FEAR OF OFFLINE BRANDS
            </div>

            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.5px",
              margin: "0 0 1.3rem"
            }}>
              How Good Life Eliminates <br />
              <span style={{
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Offline Channel Conflict</span>
            </h2>

            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.75, margin: "0 auto", fontWeight: 500, maxWidth: "780px" }}>
              Traditional distributors revolt when online marketplaces discount the same products below wholesale dealer prices. Good Life establishes iron-clad operational separation so your digital growth never undermines trade trust.
            </p>
          </div>

          {/* ── 09: CHANNEL HARMONIZATION ARCHITECTURE (Minimal & Professional Visual Flow) ── */}
          <div className="architecture-box" style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "24px",
            padding: "2.6rem 2.2rem 2.2rem",
            maxWidth: "1140px",
            margin: "0 auto 4.5rem",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(11, 23, 54, 0.04)"
          }}>
            
            {/* Top Label */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "#2563EB",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "2.2rem",
              padding: "0.3rem 0.95rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1px solid #DBEAFE"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
              CHANNEL HARMONIZATION ARCHITECTURE
            </div>

            {/* Architecture Horizontal Flow (Side by Side Desktop -> Vertical Stack Mobile) */}
            <div className="architecture-horizontal-row" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.85rem",
              position: "relative"
            }}>
              
              {/* NODE 1 (LEFT): DIRECT REVENUE / ONLINE MARKETPLACES */}
              <div className="arch-card" style={{
                flex: "1 1 0",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "1.5rem 1.2rem",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                textAlign: "center",
                minWidth: 0,
                boxSizing: "border-box"
              }}>
                <div style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  DIRECT REVENUE
                </div>
                <div style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", fontWeight: 850, color: "#0B1736", margin: "0 0 0.35rem" }}>
                  Online Marketplaces
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 500, lineHeight: 1.4 }}>
                  Amazon 2.0  •  Flipkart  •  Quick Commerce
                </div>
              </div>

              {/* CONNECTOR 1: PRICE & SKU GUARD */}
              <div className="architecture-connector-item" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexShrink: 0,
                padding: "0 0.25rem"
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.38rem",
                  padding: "0.38rem 0.9rem",
                  borderRadius: "999px",
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#1D4ED8",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.06)"
                }}>
                  <span>PRICE & SKU GUARD</span>
                  <span className="connector-arrow-icon" style={{ fontSize: "0.85rem", color: "#2563EB", fontWeight: 900, transition: "transform 0.2s ease" }}>⟷</span>
                </div>
              </div>

              {/* NODE 2 (CENTER): CENTRAL OPERATING ENGINE */}
              <div className="arch-card-center central-engine-core" style={{
                flex: "1.25 1 0",
                background: "#FFFFFF",
                border: "2px solid #2563EB",
                borderRadius: "18px",
                padding: "1.6rem 1.4rem",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.08)",
                textAlign: "center",
                minWidth: 0,
                position: "relative",
                boxSizing: "border-box"
              }}>
                <div style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#2563EB",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem"
                }}>
                  GOOD LIFE OPERATING ENGINE
                </div>

                <div style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.4rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.4px", margin: "0 0 0.5rem" }}>
                  Good Life Central
                </div>

                <div style={{
                  fontSize: "0.78rem",
                  color: "#475569",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  lineHeight: 1.4
                }}>
                  <span>Automated Allocation</span>
                  <span>•</span>
                  <span>Price Parity Audit</span>
                  <span>•</span>
                  <span>Margin Shield</span>
                </div>
              </div>

              {/* CONNECTOR 2: STOCK BUFFER */}
              <div className="architecture-connector-item" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexShrink: 0,
                padding: "0 0.25rem"
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.38rem",
                  padding: "0.38rem 0.9rem",
                  borderRadius: "999px",
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#1D4ED8",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.06)"
                }}>
                  <span>STOCK BUFFER</span>
                  <span className="connector-arrow-icon" style={{ fontSize: "0.85rem", color: "#2563EB", fontWeight: 900, transition: "transform 0.2s ease" }}>⟷</span>
                </div>
              </div>

              {/* NODE 3 (RIGHT): PROTECTED TRADE / OFFLINE DEALER NETWORK */}
              <div className="arch-card" style={{
                flex: "1 1 0",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "1.5rem 1.2rem",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                textAlign: "center",
                minWidth: 0,
                boxSizing: "border-box"
              }}>
                <div style={{ fontSize: "0.72rem", color: "#16A34A", fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  PROTECTED TRADE
                </div>
                <div style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", fontWeight: 850, color: "#0B1736", margin: "0 0 0.35rem" }}>
                  Offline Dealer Network
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 500, lineHeight: 1.4 }}>
                  Wholesale Price Immunity  •  B2B Hub Stock
                </div>
              </div>

            </div>

            {/* Bottom Tagline Pill */}
            <div className="architecture-tagline-pill" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2.4rem",
              padding: "0.5rem 1.4rem",
              borderRadius: "999px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#166534",
              fontSize: "0.86rem",
              fontWeight: 750
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Online Growth ≠ Offline Trade Cannibalization</span>
            </div>
          </div>

          {/* ── 08: THREE PILLARS (3 Clean & Minimal White Cards) ── */}
          <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                num: "01",
                title: "Digital Exclusive",
                subTitle: "Model Identifiers",
                desc: "We configure distinct online model numbers, colorways, or bundled accessory packs, preventing direct price comparisons by offline trade buyers.",
                points: ["Exclusive online SKU codes", "Distinct barcode & EAN structure", "Packaged accessory combos"]
              },
              {
                num: "02",
                title: "Strict MAP Enforcement",
                subTitle: "Minimum Advertised Price",
                desc: "Algorithmic pricing guardrails prevent marketplace coupon matching from crashing below agreed wholesale floor pricing.",
                points: ["Real-time price floor monitors", "Automated repricing protections", "Buybox defense against grey sellers"]
              },
              {
                num: "03",
                title: "Regional B2B Hubs",
                subTitle: "Dealer Replenishment",
                desc: "Use our 12 regional warehouses to supply offline distributors faster, transforming your online logistics network into a trade advantage.",
                points: ["Regional stock availability", "GST compliant B2B invoicing", "Sub-48h dealer restocking"]
              }
            ].map((card, cIdx) => (
              <div
                key={cIdx}
                className="harmonization-glass-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "2.2rem 2rem",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.22s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {/* Number Badge */}
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    color: "#2563EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 850,
                    marginBottom: "1.2rem",
                    border: "1px solid #DBEAFE"
                  }}>
                    {card.num}
                  </div>

                  <h3 style={{ fontSize: "1.22rem", fontWeight: 850, color: "#0B1736", margin: "0 0 0.65rem", letterSpacing: "-0.4px" }}>
                    {card.title} <br />
                    <span style={{ color: "#2563EB", fontWeight: 750, fontSize: "1.05rem" }}>{card.subTitle}</span>
                  </h3>

                  <p style={{ fontSize: "0.92rem", color: "#53627A", lineHeight: 1.6, marginBottom: "1.5rem", fontWeight: 500 }}>
                    {card.desc}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", borderTop: "1px solid #F1F5F9", paddingTop: "1.2rem" }}>
                    {card.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <span style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#DCFCE7",
                          color: "#16A34A",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span style={{ fontSize: "0.86rem", color: "#1E293B", fontWeight: 600 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 10, 11 & 12: 60-DAY BRAND INCUBATION ROADMAP (Interactive Tabs & Timeline with Auto-Cycle) ── */}
      <section
        onMouseEnter={() => setIsPhasePaused(true)}
        onMouseLeave={() => setIsPhasePaused(false)}
        style={{ padding: "6rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", position: "relative" }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "1.6px",
              color: "#2563EB",
              textTransform: "uppercase",
              marginBottom: "0.6rem"
            }}>
              <span className="pulse-blue-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2563EB" }} />
              FORTNIGHT-BY-FORTNIGHT EXECUTION {isPhasePaused ? "(PAUSED)" : "• AUTO-ADVANCING"}
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              The 60-Day Brand Incubation Roadmap
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#53627A", lineHeight: 1.6, fontWeight: 500 }}>
              Hover over this section to pause auto-advancing, or click through each phase below to inspect the exact operational milestones Good Life executes:
            </p>

            {/* ── 11: HORIZONTAL TIMELINE TABS ── */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {phases.map((ph, idx) => {
                const isSelected = activePhase === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    style={{
                      padding: "0.75rem 1.6rem",
                      borderRadius: "999px",
                      border: isSelected ? "2px solid #2563EB" : "1.5px solid #CBD5E1",
                      background: isSelected ? "#2563EB" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "#53627A",
                      fontSize: "0.92rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: isSelected ? "0 6px 20px rgba(37, 99, 235, 0.25)" : "0 2px 6px rgba(0,0,0,0.02)",
                      transition: "all 0.22s ease"
                    }}
                  >
                    Phase {ph.id} • {ph.timeline}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 12: PHASE CONTENT PANEL ── */}
          <div className="launch-phase-panel" style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "3.2rem",
            border: "1.5px solid #BFDBFE",
            boxShadow: "0 18px 45px rgba(37,99,235,0.06)",
            maxWidth: "960px",
            margin: "0 auto",
            transition: "all 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px" }}>
                PHASE {phases[activePhase].id} : {phases[activePhase].timeline}
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "6px", background: "#EFF6FF", color: "#1D4ED8" }}>
                SLA Guarded Execution
              </span>
            </div>

            <h3 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem" }}>
              {phases[activePhase].title}
            </h3>

            <p style={{ fontSize: "1.05rem", color: "#53627A", lineHeight: 1.65, marginBottom: "2.2rem" }}>
              {phases[activePhase].summary}
            </p>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.8rem" }}>
              <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#1E293B", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "1rem" }}>
                Mandatory Operational Milestones:
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                {phases[activePhase].deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.8rem",
                    background: "#F8FAFC",
                    padding: "1.1rem 1.3rem",
                    borderRadius: "14px",
                    border: "1.5px solid #E2E8F0"
                  }}>
                    <span style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#EFF6FF",
                      color: "#2563EB",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px"
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5 }}>
                      {deliv}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 13: VISUAL JOURNEY "FROM FACTORY TO NATIONAL SCALE" (Auto-Advancing Chain) ── */}
      <section
        onMouseEnter={() => setIsJourneyPaused(true)}
        onMouseLeave={() => setIsJourneyPaused(false)}
        style={{ padding: "6rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0", position: "relative" }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "1.6px",
              color: "#2563EB",
              textTransform: "uppercase",
              marginBottom: "0.6rem"
            }}>
              <span className="pulse-blue-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2563EB" }} />
              END-TO-END OPERATING PIPELINE {isJourneyPaused ? "(PAUSED)" : "• AUTO-ADVANCING"}
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              From Factory to National Scale
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#53627A", lineHeight: 1.6, fontWeight: 500 }}>
              Hover over this section to pause auto-advancing, or click any node in the operating chain to inspect how Good Life transforms raw factory output into national sales velocity:
            </p>
          </div>

          {/* Interactive Pipeline Nodes */}
          <div className="launch-journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {journeySteps.map((j, jIdx) => {
              const isActive = activeJourneyNode === jIdx;
              return (
                <div
                  key={jIdx}
                  onClick={() => setActiveJourneyNode(jIdx)}
                  style={{
                    background: isActive ? "#EFF6FF" : "#F8FAFC",
                    border: isActive ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "1.4rem 1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: isActive ? "#2563EB" : "#CBD5E1",
                    color: "#FFFFFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    marginBottom: "0.8rem"
                  }}>
                    {j.step}
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 900, color: isActive ? "#1E3A8A" : "#0B1736" }}>
                    {j.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Node Deep Dive Card */}
          <div className="launch-journey-detail-card" style={{
            background: "#F8FAFC",
            borderRadius: "20px",
            padding: "2.2rem 2.8rem",
            border: "1.5px solid #BFDBFE",
            maxWidth: "850px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>
                PIPELINE STAGE {journeySteps[activeJourneyNode].step}
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0B1736", margin: "0.2rem 0 0.5rem" }}>
                {journeySteps[activeJourneyNode].name} : {journeySteps[activeJourneyNode].desc}
              </h3>
              <p style={{ fontSize: "0.96rem", color: "#53627A", margin: 0, fontWeight: 500, maxWidth: "600px" }}>
                {journeySteps[activeJourneyNode].detail}
              </p>
            </div>

            <button
              onClick={() => setDiagOpen(true)}
              style={{
                height: "46px",
                padding: "0 1.6rem",
                borderRadius: "10px",
                background: "#2563EB",
                color: "#FFFFFF",
                fontSize: "0.88rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer"
              }}
            >
              EXPLORE STAGE FIT
            </button>
          </div>

        </div>
      </section>

      {/* ── 14 & 15: 45-DAY CTA SECTION (Deep Navy with 100% White Typography & Subtle Network) ── */}
      <section style={{
        background: "#0B1736",
        color: "#FFFFFF",
        padding: "6rem 0 6.5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* 15: Subtle Background Network Mesh */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}>
          <defs>
            <pattern id="launch-cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#60A5FA" />
              <path d="M 30 0 L 30 60 M 0 30 L 60 30" fill="none" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#launch-cta-grid)" />
        </svg>

        {/* Ambient Blue Radial Flare */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          
          <div style={{
            display: "inline-block",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.12)",
            color: "#60A5FA",
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            marginBottom: "1.2rem"
          }}>
            FROM FACTORY TO NATIONAL SCALE
          </div>

          <h2 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#FFFFFF",
            letterSpacing: "-1.5px",
            margin: "0 0 1.2rem"
          }}>
            Ready to Launch Your Direct Brand in 45 Days?
          </h2>

          <p style={{
            fontSize: "1.1rem",
            color: "#E2E8F0",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "680px",
            margin: "0 auto 2.5rem"
          }}>
            Complete our 3-minute Commerce Diagnostic to assess your category headroom, trademark readiness, and initial warehouse allocation.
          </p>

          <div className="launch-final-cta-btns" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
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
                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.45)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.22s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
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
                background: "rgba(255, 255, 255, 0.12)",
                border: "1.5px solid rgba(255, 255, 255, 0.35)",
                color: "#FFFFFF",
                fontSize: "0.96rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.22s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Speak With Incubation Lead
            </Link>
          </div>

        </div>
      </section>

      {/* ── 16: DARK FOOTER (Without Duplicate Top Banner) ── */}
      <Footer hideTopBanner={true} />

      {/* Diagnostic Modal */}
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* Scoped Styles for Bright Full-White Harmonization & Auto-Cycle */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .harmonization-glass-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(37, 99, 235, 0.4) !important;
          box-shadow: 0 24px 50px rgba(37, 99, 235, 0.12) !important;
        }

        .central-engine-core {
          animation: corePulse 3.5s infinite ease-in-out;
        }

        @keyframes corePulse {
          0%, 100% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.08), 0 0 0 16px rgba(37, 99, 235, 0.03), 0 18px 45px rgba(37, 99, 235, 0.16);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(37, 99, 235, 0.14), 0 0 0 24px rgba(37, 99, 235, 0.06), 0 22px 55px rgba(37, 99, 235, 0.24);
          }
        }

        .pulse-blue-dot {
          animation: dotPulse 2s infinite ease-in-out;
        }

        @keyframes dotPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(0.85);
          }
        }

        @media (max-width: 980px) {
          .launch-hero-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .channel-conflict-section {
            padding: 4rem 0 4.5rem !important;
          }
          .channel-conflict-header {
            margin-bottom: 2.5rem !important;
          }
          .architecture-box {
            padding: 1.8rem 1.2rem 1.6rem !important;
            border-radius: 18px !important;
            margin-bottom: 2.8rem !important;
          }
          .architecture-horizontal-row {
            flex-direction: column !important;
            gap: 0.6rem !important;
            max-width: 480px !important;
            margin: 0 auto !important;
          }
          .arch-card, .arch-card-center {
            width: 100% !important;
            flex: none !important;
            padding: 1.35rem 1.15rem !important;
          }
          .architecture-connector-item {
            margin: 0.15rem 0 !important;
          }
          .connector-arrow-icon {
            display: inline-block !important;
            transform: rotate(90deg) !important;
          }
          .architecture-tagline-pill {
            font-size: 0.78rem !important;
            padding: 0.45rem 1rem !important;
            margin-top: 1.6rem !important;
            line-height: 1.35 !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .harmonization-glass-card {
            padding: 1.6rem 1.35rem !important;
          }
          .launch-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          .launch-phase-panel {
            padding: 2rem 1.5rem !important;
          }
          .launch-journey-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.8rem !important;
          }
          .launch-journey-detail-card {
            padding: 1.8rem 1.4rem !important;
          }
        }

        @media (max-width: 640px) {
          .launch-hero-split {
            gap: 2rem !important;
          }
          .launch-hero-btn-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          .launch-hero-btn-row button,
          .launch-hero-btn-row a {
            width: 100% !important;
            justify-content: center !important;
          }
          .launch-readiness-card {
            padding: 1.2rem 1rem 1.25rem !important;
            border-radius: 16px !important;
          }
          .launch-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
          .channel-conflict-section {
            padding: 3.2rem 0 3.8rem !important;
          }
          .channel-conflict-header {
            margin-bottom: 2rem !important;
          }
          .architecture-box {
            padding: 1.4rem 0.85rem 1.35rem !important;
            border-radius: 16px !important;
            margin-bottom: 2rem !important;
          }
          .arch-card, .arch-card-center {
            padding: 1.15rem 0.95rem !important;
            border-radius: 14px !important;
          }
          .harmonization-glass-card {
            padding: 1.4rem 1.1rem !important;
            border-radius: 14px !important;
          }
          .launch-phase-panel {
            padding: 1.4rem 1.1rem !important;
            border-radius: 16px !important;
          }
          .launch-journey-grid {
            grid-template-columns: 1fr !important;
          }
          .launch-journey-detail-card {
            padding: 1.4rem 1.1rem !important;
            border-radius: 16px !important;
          }
          .launch-final-cta-btns {
            flex-direction: column !important;
            width: 100% !important;
          }
          .launch-final-cta-btns button,
          .launch-final-cta-btns a {
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
