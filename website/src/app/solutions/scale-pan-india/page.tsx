"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { IndiaGeoMapBackground } from "../../components/IndiaGeoMapSVG";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const mapHubs = [
  { city: "Gurgaon", state: "Haryana", area: "22,000 sq ft", sla: "Same Day", coverage: "Delhi NCR + North", region: "North", x: 244.79, y: 262.47 },
  { city: "Mumbai", state: "Maharashtra", area: "18,500 sq ft", sla: "Next Day", coverage: "West India", region: "West", x: 132.28, y: 534.89 },
  { city: "Bengaluru", state: "Karnataka", area: "16,000 sq ft", sla: "Next Day", coverage: "South India", region: "South", x: 260.19, y: 712.11 },
  { city: "Hyderabad", state: "Telangana", area: "12,000 sq ft", sla: "Next Day", coverage: "South India", region: "South", x: 284.39, y: 583.98 },
  { city: "Chennai", state: "Tamil Nadu", area: "11,000 sq ft", sla: "Next Day", coverage: "South India", region: "South", x: 332.76, y: 708.89 },
  { city: "Kolkata", state: "West Bengal", area: "10,500 sq ft", sla: "Next Day", coverage: "East India", region: "East", x: 552.24, y: 433.38 },
  { city: "Ahmedabad", state: "Gujarat", area: "9,500 sq ft", sla: "Next Day", coverage: "West India", region: "West", x: 123.97, y: 420.31 },
  { city: "Lucknow", state: "Uttar Pradesh", area: "8,000 sq ft", sla: "Next Day", coverage: "Central UP + East", region: "North", x: 351.08, y: 309.29 },
  { city: "Patna", state: "Bihar", area: "7,000 sq ft", sla: "Next Day", coverage: "Bihar + Jharkhand", region: "East", x: 464.75, y: 345.66 },
  { city: "Indore", state: "Madhya Pradesh", area: "6,500 sq ft", sla: "Next Day", coverage: "Central India", region: "Central", x: 213.09, y: 429.11 },
  { city: "Ludhiana", state: "Punjab", area: "6,000 sq ft", sla: "Next Day", coverage: "Punjab + J&K", region: "North", x: 213.08, y: 191.58 },
  { city: "Guwahati", state: "Assam", area: "5,500 sq ft", sla: "Next Day", coverage: "North East India", region: "NE", x: 643.69, y: 329.68 },
];

export default function ScalePanIndiaPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [units, setUnits] = useState<number>(25000);
  const [activeHub, setActiveHub] = useState<number>(1); // Mumbai by default (matching screenshot)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const activeHubData = mapHubs[activeHub];

  // Auto-play cycle for network map
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveHub((prev) => (prev + 1) % mapHubs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Regional split calculations
  const westUnits = Math.round(units * 0.35);
  const northUnits = Math.round(units * 0.30);
  const southUnits = Math.round(units * 0.22);
  const eastUnits = Math.round(units * 0.13);

  // Freight savings calculation (₹48 avg saved per unit by shifting long-haul to zonal)
  const freightSavedLakhs = ((units * 48) / 100000).toFixed(1);

  const presets = [
    { label: "Tier-1 Scale", val: 5000 },
    { label: "National Category Leader", val: 25000 },
    { label: "Fast-Scaling Enterprise", val: 50000 },
    { label: "Enterprise Scale", val: 100000 }
  ];

  return (
    <div className={`solution-scale-root ${inter.className}`} style={{ background: "#FFFFFF", color: "#0B1736", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      {/* 01. FIXED HEADER */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* 02. BREADCRUMB & 03. HERO SECTION */}
      <section className="scale-hero-section" style={{
        position: "relative",
        paddingTop: "8.5rem",
        paddingBottom: "5.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#64748B", marginBottom: "1.8rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Scale Pan-India Solution</span>
          </div>

          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1.05fr",
            gap: "3rem",
            alignItems: "center"
          }}>
            
            {/* Left 55% Content */}
            <div>
              <div className="scale-eyebrow-pill" style={{
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
                SOLUTION 03 • NATIONAL FULFILMENT & SPEED DOMINANCE
              </div>

              <h1 className="scale-hero-title" style={{
                fontSize: "clamp(2.3rem, 4vw, 3.6rem)",
                fontWeight: 900,
                lineHeight: 1.14,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.35rem"
              }}>
                Scale Pan-India: <br />
                <span style={{ color: "#2563EB" }}>12 Regional Hubs.</span> <br />
                Next-Day Delivery Across India.
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.16rem)",
                color: "#475569",
                lineHeight: 1.75,
                marginBottom: "2.4rem",
                fontWeight: 500
              }}>
                For scaling brands constrained by single-warehouse delivery bottlenecks. Good Life deploys, balances, and fulfills your inventory across 12 strategic regional facilities to unlock same-day & next-day badges nationwide.
              </p>

              <div className="scale-hero-btn-row" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "52px",
                    padding: "0 2rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.94rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 18px rgba(37, 99, 235, 0.28)",
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

                <button
                  onClick={() => {
                    const el = document.getElementById("network-simulator");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#0B1736",
                    fontSize: "0.94rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease"
                  }}
                >
                  Simulate Network Rollout
                </button>
              </div>
            </div>

            {/* Right 45% COMPACT INDIA MAP VISUAL (Pure & Clean Map) */}
            <div>
              <div
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "0.85rem",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 14px 40px rgba(11, 23, 54, 0.06)",
                  position: "relative"
                }}
              >
                {/* Map Viewport */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(340px, 36vw, 460px)",
                  background: "linear-gradient(180deg, #F0F7FF 0%, #E8F3FE 50%, #F8FAFC 100%)",
                  borderRadius: "18px",
                  overflow: "hidden"
                }}>
                  {/* Subtle Grid Pattern */}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35, pointerEvents: "none" }}>
                    <defs>
                      <pattern id="mini-map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#CBD5E1" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mini-map-grid)" />
                  </svg>

                  {/* SVG India Map */}
                  <svg
                    viewBox="0 0 800 850"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: "relative", zIndex: 1, padding: "0.8rem 1rem" }}
                  >
                    <defs>
                      <radialGradient id="mini-pin-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                      </radialGradient>
                      <filter id="mini-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>

                    {/* GeoJSON Detailed States of India */}
                    <IndiaGeoMapBackground />

                    {/* Dynamic Network Radiating Lines from Active Hub */}
                    {mapHubs.map((targetHub, i) => {
                      if (i === activeHub) return null;
                      return (
                        <g key={`map-line-${i}`}>
                          <line
                            x1={activeHubData.x}
                            y1={activeHubData.y}
                            x2={targetHub.x}
                            y2={targetHub.y}
                            stroke="#93C5FD"
                            strokeWidth="2"
                            strokeDasharray="7 5"
                            opacity="0.65"
                            style={{ animation: "wh-dash-flow 1s linear infinite" }}
                          />
                          {/* Moving Particle */}
                          <g>
                            <circle r="4" fill="#3B82F6" filter="url(#mini-glow)">
                              <animateMotion path={`M ${activeHubData.x} ${activeHubData.y} L ${targetHub.x} ${targetHub.y}`} dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle r="2" fill="#FFFFFF">
                              <animateMotion path={`M ${activeHubData.x} ${activeHubData.y} L ${targetHub.x} ${targetHub.y}`} dur="3s" repeatCount="indefinite" />
                            </circle>
                          </g>
                        </g>
                      );
                    })}

                    {/* 12 Hub Pins */}
                    {mapHubs.map((h, idx) => {
                      const isActive = activeHub === idx;
                      return (
                        <g
                          key={idx}
                          onClick={() => { setActiveHub(idx); setIsAutoPlay(false); }}
                          style={{ cursor: "pointer", transformOrigin: `${h.x}px ${h.y}px` }}
                        >
                          {isActive && (
                            <>
                              <circle cx={h.x} cy={h.y} r="32" fill="url(#mini-pin-glow)" style={{ animation: "wh-glow-breathe 2s ease-in-out infinite" }} />
                              <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#2563EB" strokeWidth="2.5" style={{ animation: "wh-pulse-ring 2s infinite" }} />
                            </>
                          )}
                          <circle
                            cx={h.x}
                            cy={h.y}
                            r={isActive ? "9.5" : "6.5"}
                            fill={isActive ? "#2563EB" : "#64748B"}
                            stroke="#FFFFFF"
                            strokeWidth={isActive ? "2.5" : "2"}
                            style={{ transition: "all 0.3s ease" }}
                          />
                          <circle cx={h.x} cy={h.y} r={isActive ? "3.5" : "2.5"} fill="#FFFFFF" />

                          {/* City Name Text */}
                          <text
                            x={h.x}
                            y={h.y - (isActive ? 15 : 12)}
                            textAnchor="middle"
                            fontSize={isActive ? "13" : "10"}
                            fontWeight="800"
                            fill={isActive ? "#0F172A" : "#64748B"}
                            stroke="#FFFFFF"
                            strokeWidth="3.5"
                            paintOrder="stroke fill"
                            fontFamily="'Inter', sans-serif"
                            style={{ pointerEvents: "none", userSelect: "none" }}
                          >
                            {h.city}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 04, 05 & 06: NATIONAL NETWORK SIMULATION (Interactive Volume Slider & Savings) ── */}
      <section id="network-simulator" style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 3.4rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              NATIONAL NETWORK SIMULATION
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.8rem" }}>
              Interactive 12-State Inventory Split & Savings Simulator
            </h2>
            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.65, fontWeight: 500 }}>
              Adjust your monthly dispatch volume to see how Good Life algorithmically partitions inventory across India to optimize Buybox conversion and freight margin:
            </p>
          </div>

          <div className="simulator-panel-card" style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "3rem 2.5rem",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 30px rgba(11, 23, 54, 0.04)",
            maxWidth: "1050px",
            margin: "0 auto"
          }}>
            
            {/* 04. VOLUME SELECTOR */}
            <div style={{ marginBottom: "2.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.8rem" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Monthly Order Dispatch Volume
                  </div>
                  <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.8px" }}>
                    {units.toLocaleString()} <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2563EB" }}>Units / Mo</span>
                  </div>
                </div>

                {/* Preset Scale Buttons */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {presets.map((p, pIdx) => {
                    const isActive = units === p.val;
                    return (
                      <button
                        key={pIdx}
                        onClick={() => setUnits(p.val)}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "10px",
                          background: isActive ? "#2563EB" : "#F8FAFC",
                          color: isActive ? "#FFFFFF" : "#0B1736",
                          border: isActive ? "1px solid #2563EB" : "1px solid #E2E8F0",
                          fontSize: "0.78rem",
                          fontWeight: 750,
                          cursor: "pointer",
                          transition: "all 0.18s ease"
                        }}
                      >
                        <div>{p.val.toLocaleString()}</div>
                        <div style={{ fontSize: "0.64rem", opacity: isActive ? 0.9 : 0.65 }}>{p.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "4px",
                  accentColor: "#2563EB",
                  cursor: "pointer"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", color: "#64748B", marginTop: "0.6rem", fontWeight: 500 }}>
                <span>5,000 Units (Tier-1 Scale)</span>
                <span>25,000 Units (Category Leader)</span>
                <span>50,000 Units (Enterprise)</span>
                <span>100,000 Units (Scale Leader)</span>
              </div>
            </div>

            {/* 05. REGIONAL ALLOCATION (4 Clean Zone Cards) */}
            <div className="zone-cards-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.2rem",
              marginBottom: "2.4rem"
            }}>
              {[
                {
                  zone: "West Hubs",
                  pct: "35%",
                  units: westUnits,
                  cities: "Bhiwandi · Pune · Ahmedabad",
                  color: "#2563EB"
                },
                {
                  zone: "North Hubs",
                  pct: "30%",
                  units: northUnits,
                  cities: "Gurugram · Lucknow · Jaipur",
                  color: "#1D4ED8"
                },
                {
                  zone: "South Hubs",
                  pct: "22%",
                  units: southUnits,
                  cities: "Bengaluru · Hyderabad · Chennai",
                  color: "#0284C7"
                },
                {
                  zone: "East Hubs",
                  pct: "13%",
                  units: eastUnits,
                  cities: "Kolkata · Guwahati · Patna",
                  color: "#16A34A"
                }
              ].map((card, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "16px",
                    padding: "1.5rem 1.3rem",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.84rem", fontWeight: 800, color: "#0B1736" }}>{card.zone}</span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 800, color: card.color, background: "#FFFFFF", padding: "0.2rem 0.5rem", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                        {card.pct}
                      </span>
                    </div>

                    <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0B1736", margin: "0.2rem 0" }}>
                      {card.units.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#64748B", fontWeight: 600 }}>Allocated Stock</div>

                    {/* Horizontal Allocation Bar */}
                    <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden", margin: "0.9rem 0 0.8rem" }}>
                      <div style={{ height: "100%", width: card.pct, background: card.color, borderRadius: "3px" }} />
                    </div>
                  </div>

                  <div style={{ fontSize: "0.76rem", color: "#475569", fontWeight: 500, lineHeight: 1.4, borderTop: "1px solid #E2E8F0", paddingTop: "0.6rem" }}>
                    {card.cities}
                  </div>
                </div>
              ))}
            </div>

            {/* 06. FREIGHT SAVINGS RESULT (Large Light-Blue Glass Result Card) */}
            <div className="freight-result-card" style={{
              background: "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)",
              borderRadius: "18px",
              padding: "2rem 2.2rem",
              border: "1.5px solid #BFDBFE",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}>
              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem" }}>
                  Projected Monthly Freight Arbitrage
                </div>
                <div style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.3rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.6px" }}>
                  ₹{freightSavedLakhs} Lakh <span style={{ fontSize: "1rem", color: "#16A34A", fontWeight: 800 }}>Saved / Month</span>
                </div>
                <div style={{ fontSize: "0.88rem", color: "#64748B", fontWeight: 500, marginTop: "0.2rem" }}>
                  By shifting from long-haul national air/surface to localized regional fulfillment.
                </div>
              </div>

              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "48px",
                  padding: "0 1.8rem",
                  borderRadius: "12px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.28)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease"
                }}
              >
                <span>REQUEST NETWORK ALLOCATION</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── 07. WHY NEXT-DAY DELIVERY WINS THE BUYBOX (3 Large Clean Cards) ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.4rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              SPEED DOMINANCE ECONOMICS
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.8rem" }}>
              Why Next-Day Delivery Wins The Buybox
            </h2>
            <p style={{ fontSize: "1.08rem", color: "#53627A", lineHeight: 1.65, fontWeight: 500 }}>
              Marketplace algorithms heavily prioritize delivery SLA over price matching. Regional fulfillment unlocks superior unit economics:
            </p>
          </div>

          {/* 3 Large Horizontal Cards */}
          <div className="buybox-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.8rem"
          }}>
            {[
              {
                metric: "+42%",
                metricSub: "Conversion Lift",
                title: "Prime & Fast Delivery Badges",
                desc: "Placing inventory in all 4 zones automatically earns your listings same-day and next-day badges across India's top 100 cities."
              },
              {
                metric: "-35%",
                metricSub: "COD RTO Rate",
                title: "35% Lower Return to Origin",
                desc: "Buyers who receive COD orders within 24 to 48 hours rarely cancel or refuse deliveries compared to 6-day long transit orders."
              },
              {
                metric: "₹45–₹55",
                metricSub: "Saved Per Unit",
                title: "Zonal Shipping Cost Reduction",
                desc: "Bypassing high national transit slab rates cuts your per-order logistics fee from ₹140+ down to ₹85–₹95."
              }
            ].map((card, cIdx) => (
              <div
                key={cIdx}
                className="buybox-card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "2.4rem 2rem",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.22s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{
                    fontSize: "clamp(2.4rem, 3.2vw, 3rem)",
                    fontWeight: 900,
                    color: "#2563EB",
                    letterSpacing: "-1.2px",
                    lineHeight: 1,
                    marginBottom: "0.3rem"
                  }}>
                    {card.metric}
                  </div>
                  
                  <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "1.2rem" }}>
                    {card.metricSub}
                  </div>

                  <h3 style={{ fontSize: "1.28rem", fontWeight: 850, color: "#0B1736", margin: "0 0 0.75rem", letterSpacing: "-0.4px" }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: "0.94rem", color: "#53627A", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 08. PAN-INDIA FULFILMENT CTA (White / Light-Blue Glass Card) ── */}
      <section style={{ padding: "5.5rem 0 6.5rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="scale-final-cta-card" style={{
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
                PAN-INDIA FULFILMENT
              </div>

              <h2 style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.18,
                color: "#0B1736",
                letterSpacing: "-1.2px",
                margin: "0 0 1.1rem"
              }}>
                Ready to Expand Your Inventory to 12 Strategic States?
              </h2>

              <p style={{
                fontSize: "1.12rem",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.4rem",
                fontWeight: 500
              }}>
                Run our Commerce Diagnostic to evaluate your regional stock partition model, state GST onboarding steps, and projected logistics savings.
              </p>

              <div className="scale-final-cta-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
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
                  Contact Supply Chain Director
                </Link>
              </div>

              <div className="scale-trust-points" style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.8rem",
                marginTop: "2.2rem",
                fontSize: "0.82rem",
                color: "#64748B",
                fontWeight: 600,
                flexWrap: "wrap"
              }}>
                <span>✓ Multi-State GST Compliance</span>
                <span>✓ 12 Regional Facilities</span>
                <span>✓ Sub-24h Delivery Across 19,000+ Pin Codes</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 09. EXISTING MASTER FOOTER ── */}
      <Footer hideTopBanner={true} />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* ── RESPONSIVE & INTERACTIVE STYLES ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wh-pulse-ring {
          0% { r: 8; opacity: 0.7; }
          100% { r: 32; opacity: 0; }
        }
        @keyframes wh-glow-breathe {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes wh-dash-flow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }

        .buybox-card:hover {
          border-color: #93C5FD !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.08) !important;
        }

        @media (max-width: 1100px) and (min-width: 769px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr !important;
            gap: 1.5rem !important;
            align-items: center !important;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            width: 100% !important;
          }
          .hero-grid > div {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .zone-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .buybox-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }

        @media (max-width: 640px) {
          .scale-hero-section {
            padding-top: 5rem !important;
            padding-bottom: 3.5rem !important;
          }
          .scale-hero-section .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .scale-eyebrow-pill {
            font-size: 0.68rem !important;
            padding: 0.35rem 0.75rem !important;
            white-space: normal !important;
            line-height: 1.35 !important;
            max-width: 100% !important;
            margin-bottom: 1rem !important;
            box-sizing: border-box !important;
          }
          .scale-hero-title {
            font-size: clamp(1.55rem, 6vw, 2rem) !important;
            letter-spacing: -0.8px !important;
            line-height: 1.15 !important;
            margin-bottom: 1rem !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .scale-hero-desc {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
            max-width: 100% !important;
          }
          .india-map-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .india-map-container svg {
            width: 100% !important;
            height: auto !important;
          }
          .zone-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .scale-hero-btn-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          .scale-hero-btn-row button,
          .scale-hero-btn-row a {
            width: 100% !important;
            justify-content: center !important;
            height: 48px !important;
          }
          .simulator-panel-card {
            padding: 1.5rem 1rem !important;
            border-radius: 16px !important;
          }
          .freight-result-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1.2rem !important;
            padding: 1.4rem 1rem !important;
          }
          .freight-result-card button {
            width: 100% !important;
            justify-content: center !important;
          }
          .scale-final-cta-card {
            padding: 2rem 1rem !important;
            border-radius: 18px !important;
          }
          .scale-final-cta-btns {
            flex-direction: column !important;
            width: 100% !important;
          }
          .scale-final-cta-btns button,
          .scale-final-cta-btns a {
            width: 100% !important;
            justify-content: center !important;
          }
          .scale-trust-points {
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.6rem !important;
          }
        }

        @media (max-width: 400px) {
          .scale-hero-title {
            font-size: clamp(1.35rem, 7vw, 1.65rem) !important;
          }
          .zone-cards-grid {
            gap: 0.75rem !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
