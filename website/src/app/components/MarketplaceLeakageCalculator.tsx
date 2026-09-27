"use client";

import React, { useState } from "react";

export default function MarketplaceLeakageCalculator({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [monthlyGmvLakhs, setMonthlyGmvLakhs] = useState<number>(35); // in Lakhs
  const [returnRate, setReturnRate] = useState<number>(14); // in %
  const [channel, setChannel] = useState<string>("Amazon + Flipkart");

  const monthlyGmv = monthlyGmvLakhs * 100000;

  // Real-world channel risk multipliers from ₹850Cr+ GMV reconciliations
  const channelData: Record<string, { factor: number; note: string; tag: string }> = {
    "Amazon + Flipkart": {
      factor: 1.0,
      note: "Standard FBA & Easy Ship commission tier card with weekly settlement cycles.",
      tag: "Standard Benchmarks"
    },
    "Multi-Channel + D2C": {
      factor: 1.15,
      note: "Multi-warehouse stock allocation drift, payment gateway deductions & regional freight variance.",
      tag: "High Cross-Channel Drift"
    },
    "Quick-Commerce (Blinkit/Zepto)": {
      factor: 1.24,
      note: "Dark store receiving shortages, damage deductions & sub-4hr handover penalties.",
      tag: "Rapid Shortage Risk"
    },
    "Heavy Bulky Appliances": {
      factor: 1.38,
      note: "Severe volumetric weight disputes, two-man delivery damages & high customer RTO freight.",
      tag: "Extreme Weight Disputes"
    }
  };

  const channelFactor = channelData[channel]?.factor || 1.0;

  // Leakage calculations based on audited ₹850Cr+ GMV benchmarks
  const commissionLeakage = Math.round(monthlyGmv * 0.016 * channelFactor);
  const weightDisputes = Math.round(monthlyGmv * 0.009 * channelFactor);
  const returnClaimsLoss = Math.round(monthlyGmv * (returnRate / 100) * 0.08 * channelFactor);
  const totalLeakage = commissionLeakage + weightDisputes + returnClaimsLoss;
  const annualLeakage = totalLeakage * 12;

  // Percentage shares for visual progress bars
  const commPct = Math.round((commissionLeakage / totalLeakage) * 100) || 44;
  const weightPct = Math.round((weightDisputes / totalLeakage) * 100) || 25;
  const returnPct = 100 - commPct - weightPct;

  // Sliders visual fill percentages
  const gmvPercent = Math.min(100, Math.max(0, ((monthlyGmvLakhs - 5) / (500 - 5)) * 100));
  const returnPercent = Math.min(100, Math.max(0, ((returnRate - 5) / (35 - 5)) * 100));

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  const channelOptions = [
    {
      name: "Amazon + Flipkart",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      name: "Multi-Channel + D2C",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      name: "Quick-Commerce (Blinkit/Zepto)",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      name: "Heavy Bulky Appliances",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="leakage-calculator"
      className="scroll-blur-reveal"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "5.5rem 1.5rem 6rem",
        borderTop: "1.5px solid rgba(191, 219, 254, 0.5)",
        borderBottom: "1.5px solid rgba(191, 219, 254, 0.4)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Soft Ambient Aurora Light Glows */}
      <div className="ambient-glow-orb-left" style={{ opacity: 0.5 }} />
      <div className="ambient-glow-orb-right" style={{ opacity: 0.55 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0.26rem 0.95rem",
            borderRadius: "99px",
            background: "rgba(239, 246, 255, 0.95)",
            border: "1px solid rgba(191, 219, 254, 0.85)",
            color: "#2563EB",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
            Outcome-Oriented Lead Diagnostic • Self-Serve Tool
          </span>
          <h2 style={{
            fontSize: "clamp(1.95rem, 3vw, 2.6rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.7rem"
          }}>
            Calculate Your Marketplace Leakage
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "#475569",
            maxWidth: "720px",
            margin: "0 auto",
            lineHeight: 1.65
          }}>
            Discover how much revenue and margin you are losing to undetected marketplace fee drift, volumetric weight disputes, and uncredited return claims across Amazon, Flipkart, and Quick Commerce.
          </p>
        </div>

        {/* 2-Column Luxury Smooth Light Glass Calculator Box */}
        <div
          className="luxury-blue-glass leakage-calculator-grid"
          style={{
            borderRadius: "28px",
            padding: "2.8rem 2.6rem",
            display: "grid",
            alignItems: "stretch",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 250, 255, 0.9) 100%)",
            border: "1.5px solid rgba(191, 219, 254, 0.75)",
            boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)"
          }}
        >
          {/* ── LEFT COLUMN: INTERACTIVE CONTROLS ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            
            {/* Control 1: Monthly GMV */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div>
                  <label style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0B1736", letterSpacing: "-0.2px" }}>
                    Monthly Marketplace GMV
                  </label>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                    Total gross merchandise value across all online channels
                  </div>
                </div>
                <div style={{
                  background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                  border: "1.5px solid #BFDBFE",
                  padding: "0.35rem 0.95rem",
                  borderRadius: "12px",
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  color: "#1D4ED8",
                  letterSpacing: "-0.3px",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.08)"
                }}>
                  {monthlyGmvLakhs >= 100
                    ? `₹${(monthlyGmvLakhs / 100).toFixed(2)} Cr`
                    : `₹${monthlyGmvLakhs} Lakhs`}
                </div>
              </div>

              {/* Slider Track with Smooth Gradient Fill */}
              <div style={{ position: "relative", padding: "8px 0" }}>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={monthlyGmvLakhs}
                  onChange={(e) => setMonthlyGmvLakhs(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "99px",
                    background: `linear-gradient(to right, #2563EB 0%, #3B82F6 ${gmvPercent}%, #E2E8F0 ${gmvPercent}%, #E2E8F0 100%)`,
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    transition: "background 0.1s ease"
                  }}
                />
              </div>

              {/* Slider Scale Indicators */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", color: "#64748B", fontWeight: 650, marginTop: "2px" }}>
                <span>₹5 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹2.5 Crore</span>
                <span>₹5.0 Crore+</span>
              </div>

              {/* Quick Select Preset Buttons */}
              <div style={{ display: "flex", gap: "6px", marginTop: "0.75rem", flexWrap: "wrap" }}>
                {[15, 35, 75, 150, 300].map((preset) => {
                  const label = preset >= 100 ? `₹${preset / 100}Cr` : `₹${preset}L`;
                  const isSelected = monthlyGmvLakhs === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonthlyGmvLakhs(preset)}
                      style={{
                        padding: "0.22rem 0.65rem",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        fontWeight: 750,
                        border: isSelected ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                        background: isSelected ? "#2563EB" : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "#475569",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0 2px 8px rgba(37, 99, 235, 0.25)" : "none",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Customer Return Rate */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div>
                  <label style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0B1736", letterSpacing: "-0.2px" }}>
                    Customer Return Rate (RTO + CIR)
                  </label>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                    Combined Return-to-Origin and Customer-Initiated Returns
                  </div>
                </div>
                <div style={{
                  background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
                  border: "1.5px solid #FDBA74",
                  padding: "0.35rem 0.95rem",
                  borderRadius: "12px",
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  color: "#EA580C",
                  letterSpacing: "-0.3px",
                  boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)"
                }}>
                  {returnRate}%
                </div>
              </div>

              {/* Slider Track with Dynamic Fill */}
              <div style={{ position: "relative", padding: "8px 0" }}>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "99px",
                    background: `linear-gradient(to right, #EA580C 0%, #F97316 ${returnPercent}%, #E2E8F0 ${returnPercent}%, #E2E8F0 100%)`,
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    transition: "background 0.1s ease"
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", color: "#64748B", fontWeight: 650, marginTop: "2px" }}>
                <span style={{ color: "#16A34A" }}>5% (Low / FMCG)</span>
                <span style={{ color: "#D97706" }}>15% (Industry Avg)</span>
                <span style={{ color: "#DC2626" }}>35% (High RTO / Fashion)</span>
              </div>
            </div>

            {/* Control 3: Primary Marketplace Channels */}
            <div style={{ marginBottom: "1.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0B1736" }}>
                  Primary Marketplace Operating Category:
                </label>
                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "99px",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  border: "1px solid #BFDBFE"
                }}>
                  {channelData[channel]?.tag}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                {channelOptions.map((opt) => {
                  const isSelected = channel === opt.name;
                  return (
                    <button
                      type="button"
                      key={opt.name}
                      onClick={() => setChannel(opt.name)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        textAlign: "left",
                        border: isSelected ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
                        background: isSelected ? "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)" : "#FFFFFF",
                        color: isSelected ? "#1D4ED8" : "#334155",
                        fontWeight: isSelected ? 800 : 650,
                        fontSize: "0.82rem",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "12px",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0 4px 14px rgba(37, 99, 235, 0.12)" : "0 2px 4px rgba(15, 23, 42, 0.02)",
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                    >
                      <span style={{
                        color: isSelected ? "#2563EB" : "#64748B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {opt.icon}
                      </span>
                      <span style={{ flex: 1 }}>{opt.name}</span>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audit Methodology Note */}
            <div style={{
              background: "#F8FAFC",
              border: "1.5px solid #E2E8F0",
              borderRadius: "14px",
              padding: "0.95rem 1.15rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px"
            }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
                flexShrink: 0,
                marginTop: "1px"
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.55 }}>
                <strong style={{ color: "#0F172A" }}>Audited Methodology:</strong> {channelData[channel]?.note} Benchmarked across ₹850Cr+ GMV reconciliations.
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: SMOOTH LIGHT GLASS RESULTS CARD ── */}
          <div
            className="leakage-result-card"
            style={{
              background: "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.95) 50%, rgba(255, 255, 255, 1) 100%)",
              borderRadius: "24px",
              padding: "2.4rem 2.2rem",
              color: "#0B1736",
              border: "1.5px solid rgba(191, 219, 254, 0.9)",
              boxShadow: "0 20px 50px rgba(37, 99, 235, 0.09), 0 4px 16px rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 1)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden"
            }}
          >
            {/* Subtle Sky Blue Glow Accent */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 65%)",
              pointerEvents: "none"
            }} />

            <div style={{ position: "relative", zIndex: 2 }}>
              
              {/* Status Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#16A34A",
                    boxShadow: "0 0 10px rgba(22, 163, 74, 0.6)",
                    display: "inline-block"
                  }} />
                  <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#2563EB" }}>
                    Live Audit Projection
                  </span>
                </div>

                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "0.22rem 0.6rem",
                  borderRadius: "99px",
                  background: "#FEE2E2",
                  border: "1px solid #FECACA",
                  color: "#DC2626"
                }}>
                  Critical Margin Loss
                </span>
              </div>

              {/* Main Total Leakage Metric */}
              <div style={{
                fontSize: "clamp(2.4rem, 3.8vw, 3.1rem)",
                fontWeight: 900,
                color: "#0B1736",
                lineHeight: 1.08,
                letterSpacing: "-1px",
                margin: "0.4rem 0 0.25rem"
              }}>
                {fmt(totalLeakage)}
                <span style={{ fontSize: "1.05rem", color: "#64748B", fontWeight: 600, letterSpacing: "0" }}> / month</span>
              </div>

              {/* Annual Loss Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(239, 246, 255, 0.95)",
                border: "1px solid rgba(191, 219, 254, 0.85)",
                padding: "0.35rem 0.85rem",
                borderRadius: "10px",
                fontSize: "0.85rem",
                color: "#1E40AF",
                fontWeight: 750,
                marginBottom: "1.6rem"
              }}>
                <span>≈ {fmt(annualLeakage)} per year</span>
                <span style={{ color: "#94A3B8" }}>•</span>
                <span style={{ color: "#D97706", fontWeight: 800 }}>Recoverable by Audit</span>
              </div>

              {/* Real-Time Breakdown with Visual Light Progress Bars */}
              <div style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: "16px",
                padding: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
                marginBottom: "1.6rem",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)"
              }}>
                
                {/* Breakdown Item 1 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", marginBottom: "5px" }}>
                    <span style={{ color: "#334155", fontWeight: 650 }}>Marketplace Commission &amp; Fee Drift</span>
                    <strong style={{ color: "#2563EB", fontWeight: 850, fontSize: "0.9rem" }}>{fmt(commissionLeakage)}</strong>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#EFF6FF", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: `${commPct}%`, height: "100%", background: "linear-gradient(90deg, #2563EB, #38BDF8)", borderRadius: "99px", transition: "width 0.3s ease" }} />
                  </div>
                </div>

                {/* Breakdown Item 2 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", marginBottom: "5px" }}>
                    <span style={{ color: "#334155", fontWeight: 650 }}>Inaccurate Weight &amp; Tier Overcharges</span>
                    <strong style={{ color: "#0D9488", fontWeight: 850, fontSize: "0.9rem" }}>{fmt(weightDisputes)}</strong>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#F0FDFA", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: `${weightPct}%`, height: "100%", background: "linear-gradient(90deg, #0D9488, #2DD4BF)", borderRadius: "99px", transition: "width 0.3s ease" }} />
                  </div>
                </div>

                {/* Breakdown Item 3 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", marginBottom: "5px" }}>
                    <span style={{ color: "#334155", fontWeight: 650 }}>Unreconciled Returns &amp; Damaged Stock</span>
                    <strong style={{ color: "#EA580C", fontWeight: 850, fontSize: "0.9rem" }}>{fmt(returnClaimsLoss)}</strong>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#FFF7ED", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: `${returnPct}%`, height: "100%", background: "linear-gradient(90deg, #EA580C, #FB923C)", borderRadius: "99px", transition: "width 0.3s ease" }} />
                  </div>
                </div>

              </div>

            </div>

            {/* CTA Button & Trust Badge */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <button
                onClick={onOpenDiag}
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontWeight: 850,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 28px rgba(37, 99, 235, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
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
                <span>Claim Full Reconciliation Audit</span>
                <span style={{ fontSize: "1.1rem" }}>→</span>
              </button>

              <div style={{
                textAlign: "center",
                fontSize: "0.75rem",
                color: "#64748B",
                marginTop: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>100% Confidential • Delivered within 24 Hours • Zero Upfront Cost</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
