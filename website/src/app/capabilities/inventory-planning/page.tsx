"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { ArrowRight, Check, X, Box, Layers, ShieldCheck, Zap } from "lucide-react";
import "./inventory-planning.css";

export default function InventoryPlanningPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  // Interactive ROP Formula Workbench
  const [dailySales, setDailySales] = useState<number>(65); // units/day
  const [leadTime, setLeadTime] = useState<number>(18); // days
  const [safetyBuffer, setSafetyBuffer] = useState<number>(14); // days
  const [seasonalMultiplier, setSeasonalMultiplier] = useState<number>(1.2); // multiplier

  // Interactive Hub Selector
  const [activeHub, setActiveHub] = useState<number>(0);

  // Dynamic ROP Formula Calculation: ROP = (Average Daily Sales × Lead Time) + (Safety Buffer × Seasonal Multiplier)
  const baseLeadTimeUnits = Math.round(dailySales * leadTime);
  const safetyBufferUnits = Math.round(dailySales * safetyBuffer * seasonalMultiplier);
  const calculatedROP = baseLeadTimeUnits + safetyBufferUnits;
  const daysOfCover = Math.round(calculatedROP / dailySales);

  const hubs = [
    {
      region: "North",
      facility: "Bilaspur Super-Hub",
      share: 35,
      states: "Delhi NCR, Haryana, UP, Punjab, Rajasthan",
      coverage: "88% Next-Day Delivery",
      palletCapacity: "12,000 Pallets",
      status: "Optimal DOI (24 Days)",
      transferLane: "Inbound via Dedicated Rail-Freight Corridor from Mundra Port"
    },
    {
      region: "West",
      facility: "Bhiwandi Mega Node",
      share: 30,
      states: "Maharashtra, Gujarat, Goa, MP",
      coverage: "92% Next-Day Delivery",
      palletCapacity: "14,500 Pallets",
      status: "Balanced DOI (21 Days)",
      transferLane: "Direct Nhava Sheva container destuffing & same-day cross-dock"
    },
    {
      region: "South",
      facility: "Hosur Express Terminal",
      share: 22,
      states: "Karnataka, Tamil Nadu, Telangana, Kerala",
      coverage: "86% Next-Day Delivery",
      palletCapacity: "8,500 Pallets",
      status: "High Velocity (18 Days)",
      transferLane: "Inter-hub air cargo links for high-ticket electronics replenishment"
    },
    {
      region: "East",
      facility: "Kolkata Dankuni Logistics Node",
      share: 13,
      states: "West Bengal, Bihar, Odisha, North-East",
      coverage: "79% Next-Day Delivery",
      palletCapacity: "5,200 Pallets",
      status: "Staged Buffer (28 Days)",
      transferLane: "Multi-modal express surface linehaul from Bilaspur Super-Hub"
    }
  ];

  const skuVelocityMatrix = [
    {
      category: "Fast-Movers (Class A)",
      volumeShare: "Top 20% SKUs → 75% Sales",
      cycle: "14-Day Reorder Cadence",
      protocol: "Strict 14-day safety buffer + daily rolling run-rate audits. Zero stockout tolerance.",
      doiTarget: "20 - 25 Days DOI",
      badge: "Class A",
      badgeColor: "#0D9488",
      badgeBg: "#F0FDFA"
    },
    {
      category: "Core Lines (Class B)",
      volumeShare: "Next 30% SKUs → 20% Sales",
      cycle: "30-Day Reorder Cadence",
      protocol: "21-day dynamic buffer + bi-weekly automated PO sync via consolidated surface freight.",
      doiTarget: "35 - 40 Days DOI",
      badge: "Class B",
      badgeColor: "#0284C7",
      badgeBg: "#F0F9FF"
    },
    {
      category: "Long-Tail (Class C)",
      volumeShare: "Remaining 40% SKUs → 5% Sales",
      cycle: "On-Demand Cross-Dock",
      protocol: "Just-in-time minimum batch reorders. Aging watchdog triggers deal liquidations at Day 60.",
      doiTarget: "Sub-45 Days DOI",
      badge: "Class C",
      badgeColor: "#D97706",
      badgeBg: "#FFFBEB"
    },
    {
      category: "Festive Stock (Surge)",
      volumeShare: "Seasonal High-Volume SKUs",
      cycle: "45-Day Advance Placement",
      protocol: "Pre-allocated into regional hubs 30 days ahead of Great Indian Festival / Big Billion Days.",
      doiTarget: "Surge Covered",
      badge: "Seasonal",
      badgeColor: "#7C3AED",
      badgeBg: "#FAF5FF"
    }
  ];

  const comparisonRows = [
    {
      factor: "Demand Forecasting Method",
      traditional: "Static spreadsheets updated once a month; prone to catastrophic stockouts during surprise sales spikes.",
      goodlife: "Continuous machine-assisted run-rate models factoring paid ad velocity, seasonality, and festive surges."
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
    <div className="inv-page-root" style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section className="inv-hero-section">
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="inv-hero-grid">
            
            {/* Left: Messaging */}
            <div>
              <div className="inv-hero-badge">
                <span className="inv-badge-tag">
                  <span className="inv-badge-dot" />
                  CAPABILITY 03
                </span>
                <span className="inv-badge-sep">//</span>
                <span className="inv-badge-title">WORKING CAPITAL &amp; REPLENISHMENT</span>
              </div>

              <h1 className="inv-hero-title">
                Zero Stockouts. Zero Trapped Capital. Machine-Paced Supply Chains.
              </h1>

              <p className="inv-hero-desc">
                Good Life eliminates stockouts and warehouse aged-storage penalties by continuously calculating dynamic reorder points, buffer stock alerts, and multi-state inventory balancing across 12 regional fulfillment hubs.
              </p>

              <div className="inv-hero-actions mobile-btn-stack">
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
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>REQUEST DIAGNOSTIC</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
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
                    justifyContent: "center",
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

            {/* Right: Predictive Inventory Health Radar (White Dashboard) */}
            <div className="inv-radar-card">
              <div className="inv-radar-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0D9488", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#115E59", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    PREDICTIVE INVENTORY HEALTH RADAR
                  </span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "#0D9488", fontWeight: 700, background: "#CCFBF1", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  REAL-TIME PO ENGINE
                </div>
              </div>

              <div className="inv-radar-body">
                
                {/* Metric 1 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B" }}>Safety Stock Coverage</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0D9488", background: "#F0FDFA", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      Target 25-30 Days
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                    28 Days
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: "93%", height: "100%", background: "linear-gradient(90deg, #0D9488 0%, #2563EB 100%)" }} />
                  </div>
                </div>

                {/* Metric 2 & 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "0.95rem 1rem" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Stockout Risk Index</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#16A34A" }}>0.02%</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>Threshold &lt;0.5%</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "0.95rem 1rem" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Dead Stock Depletion</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>+41%</div>
                    <div style={{ fontSize: "0.7rem", color: "#0D9488", fontWeight: 700 }}>60-day pace</div>
                  </div>
                </div>

                {/* Live Inwarding Sync */}
                <div style={{ background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: "12px", padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Box size={16} strokeWidth={2.2} color="#0D9488" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#115E59" }}>Multi-Node Inbound PO Sync</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#0D9488" }}>12 HUBS SYNCHRONIZED</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. REORDER POINT (ROP) VISUALIZER (Interactive Formula Workbench) ── */}
      <section className="inv-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="inv-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#0D9488", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              ALGORITHMIC REPLENISHMENT WORKBENCH
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Interactive Reorder Point (ROP) Calculator
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Test your SKU&apos;s velocity and lead times using Good Life&apos;s institutional formula: <br />
              <strong style={{ color: "#0F172A", wordBreak: "break-word" }}>ROP = (Average Daily Sales × Lead Time) + (Safety Buffer × Seasonal Multiplier)</strong>
            </p>
          </div>

          <div className="rop-grid">
            {/* Sliders */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              
              {/* Daily Sales Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>
                    Average Daily Sales (Units / Day)
                  </label>
                  <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0D9488" }}>
                    {dailySales} units
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={dailySales}
                  onChange={(e) => setDailySales(Number(e.target.value))}
                  className="touch-slider-teal"
                  aria-label="Average Daily Sales"
                />
              </div>

              {/* Lead Time Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>
                    Supplier Manufacturing &amp; Inward Transit Lead Time
                  </label>
                  <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0D9488" }}>
                    {leadTime} days
                  </span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="60"
                  step="1"
                  value={leadTime}
                  onChange={(e) => setLeadTime(Number(e.target.value))}
                  className="touch-slider-teal"
                  aria-label="Lead Time in Days"
                />
              </div>

              {/* Safety Buffer Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>
                    Safety Buffer Days
                  </label>
                  <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0D9488" }}>
                    {safetyBuffer} days
                  </span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="30"
                  step="1"
                  value={safetyBuffer}
                  onChange={(e) => setSafetyBuffer(Number(e.target.value))}
                  className="touch-slider-teal"
                  aria-label="Safety Buffer Days"
                />
              </div>

              {/* Seasonal Multiplier Buttons */}
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", display: "block", marginBottom: "0.5rem" }}>
                  Seasonal Multiplier
                </label>
                <div className="inv-multiplier-grid" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {[
                    { label: "Normal (1.0x)", val: 1.0 },
                    { label: "Festive Ramp (1.2x)", val: 1.2 },
                    { label: "BBD / GIF Peak (1.8x)", val: 1.8 }
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSeasonalMultiplier(s.val)}
                      style={{
                        padding: "0.5rem 0.85rem",
                        borderRadius: "8px",
                        border: seasonalMultiplier === s.val ? "1.5px solid #0D9488" : "1px solid #E2E8F0",
                        background: seasonalMultiplier === s.val ? "#F0FDFA" : "#FFFFFF",
                        color: seasonalMultiplier === s.val ? "#0F766E" : "#475569",
                        fontWeight: seasonalMultiplier === s.val ? 700 : 500,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculated Output Workbench Card */}
            <div className="rop-output-card">
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0D9488", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  AUTOMATED PURCHASE ORDER TRIGGER
                </div>
                <div className="rop-output-val" style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
                  {calculatedROP.toLocaleString()} Units
                </div>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
                  When total available warehouse stock drops to this threshold, Good Life&apos;s system triggers an automated purchase order to prevent stockout strikes.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", borderTop: "1px solid #CCFBF1", paddingTop: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "#64748B" }}>Lead-Time Consumption Buffer:</span>
                  <strong style={{ color: "#0F172A" }}>{baseLeadTimeUnits} units</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "#64748B" }}>Safety Buffer Allocation:</span>
                  <strong style={{ color: "#0F172A" }}>{safetyBufferUnits} units</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "#64748B" }}>Days of Cover Protected:</span>
                  <strong style={{ color: "#0D9488" }}>{daysOfCover} Days DOI</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. REGIONAL ALLOCATION (12-State Visualization) ── */}
      <section className="inv-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="inv-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PAN-INDIA MULTI-NODE NETWORK
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              12-State Regional Stock Allocation
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Avoid single-point warehouse bottlenecks. We balance inventory across 4 strategic macro-clusters to unlock next-day delivery badges for 95% of buyers.
            </p>
          </div>

          <div className="hubs-grid">
            {hubs.map((h, idx) => {
              const isSelected = activeHub === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveHub(idx)}
                  className="light-panel"
                  style={{
                    padding: "1.75rem 1.5rem",
                    cursor: "pointer",
                    borderTop: isSelected ? "3px solid #0D9488" : "1px solid #E2E8F0",
                    background: isSelected ? "#F0FDFA" : "#FFFFFF"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0D9488", textTransform: "uppercase" }}>
                      {h.region} NODE
                    </span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                      {h.share}%
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem" }}>
                    {h.facility}
                  </h3>

                  <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.45, margin: "0 0 1rem" }}>
                    {h.states}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.78rem", borderTop: "1px solid #E2E8F0", paddingTop: "0.85rem" }}>
                    <div style={{ color: "#16A34A", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <Check size={13} strokeWidth={3} />
                      <span>{h.coverage}</span>
                    </div>
                    <div style={{ color: "#334155", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <Box size={13} strokeWidth={2.2} />
                      <span>{h.palletCapacity}</span>
                    </div>
                    <div style={{ color: "#64748B" }}>{h.status}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. SKU VELOCITY MATRIX ── */}
      <section className="inv-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="inv-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#0D9488", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PORTFOLIO VELOCITY PROFILES
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              4-Tier SKU Velocity Segmentation
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Different SKUs demand different capital velocity rules. We categorize your catalog into strict replenishment protocols.
            </p>
          </div>

          <div className="velocity-grid">
            {skuVelocityMatrix.map((m, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "1.75rem 1.5rem" }}>
                <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 800, color: m.badgeColor, background: m.badgeBg, padding: "0.2rem 0.6rem", borderRadius: "6px", marginBottom: "0.85rem" }}>
                  {m.badge}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.4rem" }}>
                  {m.category}
                </h3>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0D9488", marginBottom: "0.6rem" }}>
                  {m.volumeShare}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1rem" }}>
                  {m.protocol}
                </p>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", background: "#F1F5F9", padding: "0.4rem 0.6rem", borderRadius: "6px" }}>
                  Target: {m.doiTarget}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. COMPARISON SECTION ── */}
      <section className="inv-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="inv-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              INVENTORY GOVERNANCE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Spreadsheet Guesswork vs. Machine-Assisted Replenishment
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Why brands switch from manual inventory forecasting to Good Life&apos;s algorithmic stock orchestration.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="inv-comparison-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", overflow: "hidden", minWidth: "620px", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <th style={{ padding: "1.1rem 1.5rem", width: "25%", color: "#0F172A" }}>Inventory Parameter</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#DC2626" }}>Traditional Spreadsheet Model</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#0D9488" }}>Good Life Inventory Engine</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((cr, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>
                        {cr.factor}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        <X size={12} strokeWidth={3} color="#EF4444" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.45rem" }} />
                        {cr.traditional}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#0F172A", fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 600 }}>
                        <Check size={13} strokeWidth={3} color="#0D9488" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.45rem" }} />
                        {cr.goodlife}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Cards View */}
          <div className="inv-comparison-mobile-cards">
            {comparisonRows.map((cr, idx) => (
              <div key={idx} className="inv-comp-card">
                <div className="inv-comp-factor">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB", display: "inline-block" }} />
                  <span>{cr.factor}</span>
                </div>

                <div className="inv-comp-traditional">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <X size={12} strokeWidth={3} />
                    <span>Traditional Spreadsheet</span>
                  </div>
                  <div>{cr.traditional}</div>
                </div>

                <div className="inv-comp-goodlife">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#0D9488", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <Check size={12} strokeWidth={3} />
                    <span>Good Life Inventory Engine</span>
                  </div>
                  <div>{cr.goodlife}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. LIGHT ENTERPRISE EXECUTIVE CTA BANNER ── */}
      <section className="inv-section-block" style={{ background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="cta-inner-box">
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#0D9488", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY STOCK AUDIT
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Audit Your Trapped Working Capital &amp; Stockout Risks
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our supply chain operations directors run a forensic audit on your last 90 days of sales run-rates. We identify stockout risks, overstocked long-tail SKUs, and aging storage fees within 48 hours under NDA.
              </p>

              <div className="inv-cta-actions mobile-btn-stack">
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
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>SCHEDULE 30-MIN STRATEGY SESSION</span>
                  <ArrowRight size={15} strokeWidth={2.5} style={{ marginLeft: "0.4rem" }} />
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
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
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
