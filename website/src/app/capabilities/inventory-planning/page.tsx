"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function InventoryPlanningPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  // Interactive ROP Formula Workbench
  const [dailySales, setDailySales] = useState<number>(45); // units/day
  const [leadTime, setLeadTime] = useState<number>(21); // days
  const [safetyBufferDays, setSafetyBufferDays] = useState<number>(14); // days

  // Interactive Cluster Selector
  const [activeCluster, setActiveCluster] = useState<number>(0);
  const [activeAbcTab, setActiveAbcTab] = useState<number>(0);

  // Computed Values
  const leadTimeStock = dailySales * leadTime;
  const safetyStock = dailySales * safetyBufferDays;
  const reorderPoint = leadTimeStock + safetyStock;
  const monthlyVolume = dailySales * 30;
  const bufferFillPercentage = Math.min(100, Math.round((safetyBufferDays / 30) * 100));

  const clusters = [
    {
      id: "north",
      name: "North Mega-Zone",
      states: "Delhi NCR, Haryana, UP, Punjab, Rajasthan",
      hubs: "Sonipat Mega FC • Bhiwandi Express Feeder",
      demandShare: "38% of National Volume",
      avgTransit: "14 Hours to Doorstep",
      primeRate: "99.4%",
      stockBalance: "Optimal (26 Days DOI)",
      transferLane: "Inbound via Dedicated Rail-Freight Corridor from Mundra Port",
      color: "#0D9488"
    },
    {
      id: "west",
      name: "West Coastal Cluster",
      states: "Maharashtra, Gujarat, Goa, Madhya Pradesh",
      hubs: "Bhiwandi Super Hub • Ahmedabad Dock",
      demandShare: "29% of National Volume",
      avgTransit: "11 Hours to Doorstep",
      primeRate: "99.7%",
      stockBalance: "Balanced (22 Days DOI)",
      transferLane: "Direct Nhava Sheva container destuffing & same-day cross-dock",
      color: "#0284C7"
    },
    {
      id: "south",
      name: "South Technology Arc",
      states: "Karnataka, Tamil Nadu, Telangana, Kerala",
      hubs: "Bangalore Hoskote • Hyderabad Shamshabad",
      demandShare: "24% of National Volume",
      avgTransit: "16 Hours to Doorstep",
      primeRate: "98.8%",
      stockBalance: "Rapid Velocity (18 Days DOI)",
      transferLane: "Inter-hub air cargo links for high-ticket electronics replenishment",
      color: "#2563EB"
    },
    {
      id: "east",
      name: "East & North-East Nexus",
      states: "West Bengal, Odisha, Bihar, Assam",
      hubs: "Kolkata Dankuni Logistics Hub",
      demandShare: "9% of National Volume",
      avgTransit: "28 Hours to Doorstep",
      primeRate: "96.1%",
      stockBalance: "Staged Buffer (32 Days DOI)",
      transferLane: "Multi-modal express surface linehaul from Sonipat Hub",
      color: "#7C3AED"
    }
  ];

  const abcMatrix = [
    {
      tier: "CLASS A",
      name: "High-Velocity Hero SKUs",
      portfolioShare: "Top 20% SKUs → 80% Revenue",
      leadRule: "Strict 14-Day Safety Buffer + Daily Rolling Run-Rate Audit",
      action: "Zero Stockout Tolerance. Immediate air-freight backup if lead time slips.",
      turnover: "18.4 Turns / Year",
      doiTarget: "25 - 30 Days DOI",
      status: "Priority Buybox Defender",
      badgeColor: "#0D9488",
      badgeBg: "#F0FDFA"
    },
    {
      tier: "CLASS B",
      name: "Core Catalog Runners",
      portfolioShare: "Next 30% SKUs → 15% Revenue",
      leadRule: "21-Day Dynamic Buffer + Bi-Weekly Automated PO Sync",
      action: "Consolidated surface shipments to minimize inward logistics freight costs.",
      turnover: "8.6 Turns / Year",
      doiTarget: "40 - 45 Days DOI",
      status: "Steady Margins",
      badgeColor: "#0284C7",
      badgeBg: "#F0F9FF"
    },
    {
      tier: "CLASS C",
      name: "Long-Tail & Experimental Variants",
      portfolioShare: "Remaining 50% SKUs → 5% Revenue",
      leadRule: "Just-In-Time (JIT) Minimum Batch Reorders + Aging Watchdog",
      action: "Automated bundle discounts & deal liquidations at Day 60 to prevent aged storage fees.",
      turnover: "3.2 Turns / Year",
      doiTarget: "Sub-50 Days DOI",
      status: "Capital Preservation Guard",
      badgeColor: "#D97706",
      badgeBg: "#FFFBEB"
    }
  ];

  const comparisonData = [
    {
      factor: "Demand Forecasting Method",
      traditional: "Static spreadsheets updated once a month; prone to catastrophic stockouts during surprise sales spikes.",
      goodlife: "Continuous machine-assisted run-rate models factoring paid ad velocity, seasonality, and prime festive surges."
    },
    {
      factor: "Reorder Trigger Automation",
      traditional: "Manual human PO creation after warehouse manager notices an empty shelf; supplier lead time is ignored.",
      goodlife: "Algorithmic Reorder Point (ROP) thresholds issue automated purchase orders 21 days before stock depletion."
    },
    {
      factor: "Multi-State Inventory Balance",
      traditional: "100% of stock dumped into one central warehouse; out-of-region orders face 5-day delivery and lose Buybox.",
      goodlife: "Dynamic 12-state inventory placement positioning stock within 24hr delivery radius of 95% of online buyers."
    },
    {
      factor: "Dead Capital & Aged Surcharges",
      traditional: "Slow-moving inventory sits for 6+ months; platform aged storage penalties drain tens of thousands of rupees.",
      goodlife: "Automated liquidation triggers at Day 60 (virtual bundling, coupons) ensure zero inventory incurs over-storage fees."
    }
  ];

  return (
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .teal-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .teal-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(13, 148, 136, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(13, 148, 136, 0.35);
        }
        .slider-range-teal::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0D9488;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.4);
        }
        @media (max-width: 991px) {
          .inv-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .inv-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .rop-workbench-grid { grid-template-columns: 1fr !important; }
          .cluster-main-grid { grid-template-columns: 1fr !important; }
          .abc-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .inv-stats-grid { grid-template-columns: 1fr !important; }
          .cluster-tabs-row { grid-template-columns: 1fr !important; }
          .inv-banner-box { padding: 2rem 1.5rem !important; }
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
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.25) 0%, transparent 70%)",
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
            <Link href="/" style={{ color: "#0D9488", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Capabilities</span>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Inventory Planning</span>
          </div>

          <div className="inv-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
                border: "1.5px solid #99F6E4",
                color: "#0D9488",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(13, 148, 136, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0D9488" }} />
                CAPABILITY 03 • DEMAND FORECASTING &amp; SUPPLY CHAIN
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Inventory Planning: <br />
                <span style={{ background: "linear-gradient(135deg, #0D9488 0%, #0284C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Zero Stockouts. Zero Dead Capital.
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Stockouts kill search rank; over-ordering traps working capital. Good Life deploys predictive run-rate algorithms, automated safety stock alerts, and regional stock placement across 12 managed warehouse hubs to keep your bestsellers in stock 99.8% of the time.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(13, 148, 136, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE INVENTORY AUDIT →</span>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Evaluate Working Capital</span>
                </button>
              </div>

            </div>

            {/* Right: Live Stock Velocity Radar Console (Floating Glass Card) */}
            <div>
              <div className="teal-glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(13, 148, 136, 0.08), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0D9488", boxShadow: "0 0 8px #0D9488" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#134E4A" }}>
                      Supply Chain Velocity Radar
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#0D9488", background: "#F0FDFA", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    12-NODE LIVE SYNC
                  </span>
                </div>

                {/* 4 Health Telemetry Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Stockout Incidence</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0D9488", marginTop: "2px" }}>0.02%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Hero rank preserved</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Days of Inventory (DOI)</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0284C7", marginTop: "2px" }}>38 Days</div>
                    <div style={{ fontSize: "0.68rem", color: "#0284C7", marginTop: "2px", fontWeight: 700 }}>Industry avg: 90+ days</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Aged Stock (&gt;90d)</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>0.4%</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: "2px", fontWeight: 600 }}>0 Platform Penalty</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>In-Transit PO Flow</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#2563EB", marginTop: "2px" }}>₹1.4 Cr</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Scheduled cross-docking</div>
                  </div>
                </div>

                {/* Live Micro Status */}
                <div style={{ background: "#F1F5F9", padding: "0.85rem 1rem", borderRadius: "12px", fontSize: "0.75rem", color: "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0D9488" }} />
                    North cluster buffer refreshed; 450 units routed to Sonipat FC
                  </span>
                  <span style={{ fontWeight: 700, color: "#0D9488" }}>Live</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS ── */}
          <div className="inv-stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "28 Days",
                label: "Automated Safety Buffer",
                description: "Dynamic safety thresholds that adjust to supplier lead-time changes",
                tag: "Buffer Shield",
                tagColor: "#0D9488",
                tagBg: "#F0FDFA",
                borderColor: "rgba(13, 148, 136, 0.2)",
                subText: "Dynamic ROP Calculation"
              },
              {
                value: "0.02%",
                label: "Stockout Incidence Rate",
                description: "Eliminates catastrophic search rank wipeouts on top revenue hero SKUs",
                tag: "Rank Protection",
                tagColor: "#2563EB",
                tagBg: "#EFF6FF",
                borderColor: "rgba(37, 99, 235, 0.2)",
                subText: "99.8% In-Stock Availability"
              },
              {
                value: "12 States",
                label: "Regional Dynamic Placement",
                description: "Multi-node distribution guaranteeing Amazon Prime & Flipkart Assured badges",
                tag: "Prime Coverage",
                tagColor: "#0284C7",
                tagBg: "#F0F9FF",
                borderColor: "rgba(2, 132, 199, 0.2)",
                subText: "Sub-24hr Delivery Velocity"
              },
              {
                value: "+41%",
                label: "Working Capital Velocity",
                description: "Capital unlocked from slow-moving inventory reinvested into high-ROI growth",
                tag: "Cash Flow Liquidity",
                tagColor: "#059669",
                tagBg: "#F0FDF4",
                borderColor: "rgba(5, 150, 105, 0.2)",
                subText: "0% Dead Inventory Penalty",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="teal-glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
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
                    <div style={{ width: "95%", height: "100%", background: "#059669" }} />
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

      {/* ── 2. BESPOKE SECTION A: ALGORITHMIC ROP WORKBENCH WITH LIQUID GAUGE ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#0D9488", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Dynamic Replenishment Equation
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Algorithmic Reorder Point (ROP) Formula Workbench
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Formula: <code>ROP = (Average Daily Demand × Lead Time) + Safety Stock Buffer</code>. Adjust the parameters below to see the dynamic trigger threshold recalculate live.
            </p>
          </div>

          <div className="rop-workbench-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "2.5rem",
            alignItems: "stretch"
          }}>
            {/* Controls */}
            <div className="teal-glass-card" style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  SKU Run-Rate Parameters
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#0D9488", background: "#F0FDFA", padding: "4px 10px", borderRadius: "999px", fontWeight: 700 }}>
                  LIVE FORMULA ENGINE
                </span>
              </div>

              {/* Slider 1: Daily Demand */}
              <div style={{ marginBottom: "1.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Daily Sales Velocity (d)</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0D9488" }}>{dailySales} Units / Day</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={dailySales}
                  onChange={(e) => setDailySales(Number(e.target.value))}
                  className="slider-range-teal"
                  style={{ width: "100%", accentColor: "#0D9488", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                  <span>5 u/d (Niche SKU)</span>
                  <span>100 u/d</span>
                  <span>200 u/d (Mega Bestseller)</span>
                </div>
              </div>

              {/* Slider 2: Supplier Lead Time */}
              <div style={{ marginBottom: "1.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Supplier Lead Time (L)</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0284C7" }}>{leadTime} Days</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={60}
                  step={1}
                  value={leadTime}
                  onChange={(e) => setLeadTime(Number(e.target.value))}
                  className="slider-range-teal"
                  style={{ width: "100%", accentColor: "#0284C7", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                  <span>7d (Local 3PL)</span>
                  <span>30d (Domestic Factory)</span>
                  <span>60d (Import Container)</span>
                </div>
              </div>

              {/* Slider 3: Safety Buffer Days */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Safety Buffer Duration (SS)</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#2563EB" }}>{safetyBufferDays} Days</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={30}
                  step={1}
                  value={safetyBufferDays}
                  onChange={(e) => setSafetyBufferDays(Number(e.target.value))}
                  className="slider-range-teal"
                  style={{ width: "100%", accentColor: "#2563EB", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                  <span>7d (Lean JIT)</span>
                  <span>14d (Recommended)</span>
                  <span>30d (Festive Surge)</span>
                </div>
              </div>

              {/* Monthly Consumption Box */}
              <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", padding: "1.2rem", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>ESTIMATED 30-DAY SALES VOLUME</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>{monthlyVolume.toLocaleString()} Units / Month</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>SAFETY FILL</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0D9488", marginTop: "2px" }}>{bufferFillPercentage}% Shielded</div>
                </div>
              </div>
            </div>

            {/* Visual Output Workbench Display */}
            <div className="teal-glass-card" style={{
              padding: "2.5rem",
              background: "linear-gradient(135deg, #042F2E 0%, #0F172A 100%)",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#5EEAD4", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Automated PO Trigger
                  </span>
                  <span style={{ fontSize: "0.72rem", background: "rgba(94, 234, 212, 0.15)", color: "#5EEAD4", padding: "3px 10px", borderRadius: "999px" }}>
                    ZERO-STOCKOUT THRESHOLD
                  </span>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>Reorder Point Threshold (Units in Stock)</div>
                  <div style={{ fontSize: "clamp(2.6rem, 4vw, 3.6rem)", fontWeight: 900, color: "#5EEAD4", letterSpacing: "-1px", marginTop: "0.2rem" }}>
                    {reorderPoint.toLocaleString()} Units
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#CBD5E1", marginTop: "0.4rem" }}>
                    When available inventory drops to {reorderPoint.toLocaleString()} units, the factory purchase order fires automatically.
                  </div>
                </div>

                {/* Visual Stacked Buffer Diagram */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#CBD5E1", marginBottom: "0.5rem" }}>
                    <span>Lead-Time Stock: {leadTimeStock.toLocaleString()}u</span>
                    <span>Safety Buffer: {safetyStock.toLocaleString()}u</span>
                  </div>
                  <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.15)", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${Math.round((leadTimeStock / reorderPoint) * 100)}%`, height: "100%", background: "#0284C7" }} />
                    <div style={{ width: `${Math.round((safetyStock / reorderPoint) * 100)}%`, height: "100%", background: "#5EEAD4" }} />
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "1.2rem" }}>
                  <div style={{ fontSize: "0.8rem", color: "#5EEAD4", fontWeight: 800, marginBottom: "0.3rem" }}>
                    ✓ Connected to Supplier EDI / ERP
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: 1.5 }}>
                    Eliminates manual warehouse spreadsheets. The moment the threshold is breached, purchase orders with accurate SKU bill-of-materials are automatically transmitted to your factories.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Have 100+ SKUs with seasonal spikes?</span>
                <Link href="/book-meeting" style={{ color: "#5EEAD4", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}>
                  Audit Catalog →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. BESPOKE SECTION B: 12-STATE MULTI-NODE REGIONAL CLUSTERS ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#0D9488", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Pan-India Supply Chain Balancing
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              12-State Multi-Node Regional Deployment Architecture
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Marketplaces deliver 90% higher Buybox preference to inventory located near the shopper. Inspect our 4 regional clusters below.
            </p>
          </div>

          {/* Cluster Selector Tabs */}
          <div className="cluster-tabs-row" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.85rem",
            marginBottom: "2.5rem"
          }}>
            {clusters.map((c, idx) => {
              const isSelected = activeCluster === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCluster(idx)}
                  style={{
                    padding: "1.2rem 1.1rem",
                    borderRadius: "18px",
                    border: isSelected ? `2px solid ${c.color}` : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? "0 8px 24px rgba(13, 148, 136, 0.12)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: c.color, textTransform: "uppercase" }}>
                    CLUSTER 0{idx + 1}
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 900, color: isSelected ? "#0F172A" : "#475569", marginTop: "0.3rem" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.2rem" }}>
                    {c.demandShare}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Cluster Showcase Panel */}
          {(() => {
            const current = clusters[activeCluster];
            return (
              <div className="teal-glass-card cluster-main-grid" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: current.color, background: "#F0FDFA", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    {current.name} • {current.demandShare}
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 0.8rem", letterSpacing: "-0.5px" }}>
                    Covering {current.states}
                  </h3>
                  <div style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    <strong>Active Fulfilment Hubs:</strong> {current.hubs}
                  </div>

                  <div style={{ background: "#FFFFFF", padding: "1.2rem", borderRadius: "14px", border: "1px solid #E2E8F0", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>Inter-Hub Transit Lane</div>
                    <div style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700, marginTop: "0.3rem" }}>
                      {current.transferLane}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ background: "#F8FAFC", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", display: "block" }}>Stock Balance Status:</span>
                      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>{current.stockBalance}</span>
                    </div>
                  </div>
                </div>

                {/* Right Stat Box */}
                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "3rem", fontWeight: 900, color: current.color, lineHeight: 1, letterSpacing: "-1px" }}>
                    {current.primeRate}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1E293B", marginTop: "0.6rem" }}>
                    Next-Day Prime / Assured Delivery SLA
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.3rem" }}>
                    Average Doorstep Transit: {current.avgTransit}
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 4. BESPOKE SECTION C: SKU VELOCITY ABC CLASSIFICATION MATRIX ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#0D9488", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Capital Allocation Framework
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The ABC Inventory Velocity Matrix
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Not all SKUs deserve the same working capital. We categorize every product in your catalog into three disciplined inventory velocity tiers.
            </p>
          </div>

          <div className="abc-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem"
          }}>
            {abcMatrix.map((tier, idx) => (
              <div key={tier.tier} className="teal-glass-card" style={{ padding: "2.2rem 1.8rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: tier.badgeColor, background: tier.badgeBg, padding: "4px 10px", borderRadius: "8px" }}>
                      {tier.tier}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>
                      {tier.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.5rem" }}>
                    {tier.name}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "#0D9488", fontWeight: 700, marginBottom: "1.2rem" }}>
                    {tier.portfolioShare}
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px", border: "1px solid #E2E8F0", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>REPLENISHMENT RULE:</div>
                    <div style={{ fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, marginTop: "2px" }}>{tier.leadRule}</div>
                  </div>

                  <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.55 }}>
                    {tier.action}
                  </div>
                </div>

                <div style={{ marginTop: "1.8rem", paddingTop: "1.2rem", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#64748B" }}>Turnover</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A" }}>{tier.turnover}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B" }}>DOI Target</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, color: tier.badgeColor }}>{tier.doiTarget}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. HEAD-TO-HEAD COMPARISON TABLE ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#0D9488", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Capital Efficiency Comparison
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Spreadsheet Guesswork vs. Good Life Algorithmic Discipline
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              See why leading consumer brands transition their supply chain forecasting to Good Life.
            </p>
          </div>

          <div className="teal-glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#64748B", width: "26%" }}>SUPPLY CHAIN CAPABILITY</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#EF4444", width: "37%" }}>CONVENTIONAL BRAND OPERATIONS</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 900, color: "#0D9488", width: "37%" }}>GOOD LIFE DEMAND ENGINE</th>
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
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5, background: "rgba(13, 148, 136, 0.02)" }}>
                      <span style={{ color: "#0D9488", fontWeight: 900, marginRight: "0.4rem" }}>✓</span>
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
          <div className="inv-banner-box" style={{
            background: "linear-gradient(135deg, rgba(13, 148, 136, 0.25) 0%, rgba(2, 132, 199, 0.15) 100%)",
            border: "1.5px solid rgba(13, 148, 136, 0.4)",
            borderRadius: "26px",
            padding: "3.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}>
            <div style={{ maxWidth: "700px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#5EEAD4", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                CAPITAL OPTIMIZATION
              </span>
              <h3 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#FFFFFF", margin: "0.8rem 0 1rem", letterSpacing: "-1px" }}>
                Schedule a Working Capital &amp; Inventory Health Audit
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
                We will evaluate your trailing 90-day SKU velocity, quantify dead capital trapped in aging stock, and map out your optimal multi-state regional allocation plan.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/book-meeting"
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(13, 148, 136, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>BOOK INVENTORY SESSION →</span>
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
