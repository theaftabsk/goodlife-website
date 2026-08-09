"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import { IndiaGeoMapBackground } from "./components/IndiaGeoMapSVG";
import "./home.css";

// ═══════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════
const Counter: React.FC<{ target: string }> = ({ target }) => {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { animate(); observer.disconnect(); } }); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    function animate() {
      const prefix = target.startsWith("₹") ? "₹" : "";
      const hasCr = target.includes("Cr");
      const hasPlus = target.includes("+");
      const hasPct = target.includes("%");
      const targetVal = parseFloat(target.replace(/[^0-9.]/g, ""));
      if (isNaN(targetVal)) { setValue(target); return; }
      const duration = 1800;
      const startTime = performance.now();
      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = hasPct ? (ease * targetVal).toFixed(1) : Math.floor(ease * targetVal).toLocaleString("en-IN");
        setValue(prefix + current + (hasCr ? " Cr" : "") + (hasPlus ? "+" : "") + (hasPct ? "%" : ""));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      }
      requestAnimationFrame(tick);
    }
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{value}</span>;
};

// ═══════════════════════════════════════════════
// SAVINGS CALCULATOR (REVENUE ASSURANCE VISUAL)
// ═══════════════════════════════════════════════
const SavingsCalculator: React.FC<{ onOpenDiag: () => void }> = ({ onOpenDiag }) => {
  const [orders, setOrders] = useState(5000);
  const [aov, setAov] = useState(1200);
  const leakage = Math.round(orders * aov * 0.023);
  const timeSaved = Math.round(orders * 0.0012 * 60);
  const disputeRecovery = Math.round(orders * aov * 0.008);
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <section className="calc-section" id="revenue-assurance">
      <div className="container">
        <div className="calc-wrapper">
          <div className="calc-left">
            <span className="ptn-section-eyebrow">Revenue Assurance Engine</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.5rem" }}>Automated Settlement &amp; Claims Audit Engine</h2>
            <p style={{ color: "#64748B", fontSize: "0.97rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Daily automated reconciliation audits across marketplace commissions, weight disputes, return claims and payment gateway settlements.
            </p>
            <div className="calc-slider-group">
              <div className="calc-slider-label">
                <span>Monthly Orders</span>
                <strong>{orders.toLocaleString("en-IN")}</strong>
              </div>
              <input type="range" min={500} max={50000} step={500} value={orders} onChange={(e) => setOrders(Number(e.target.value))} className="calc-slider" />
              <div className="calc-slider-ticks"><span>500</span><span>25,000</span><span>50,000</span></div>
            </div>
            <div className="calc-slider-group" style={{ marginTop: "1.5rem" }}>
              <div className="calc-slider-label">
                <span>Avg. Order Value (₹)</span>
                <strong>₹{aov.toLocaleString("en-IN")}</strong>
              </div>
              <input type="range" min={200} max={10000} step={100} value={aov} onChange={(e) => setAov(Number(e.target.value))} className="calc-slider" />
              <div className="calc-slider-ticks"><span>₹200</span><span>₹5,000</span><span>₹10,000</span></div>
            </div>

            {/* Ultra-Stylish Diagnostic Banner */}
            <div style={{
              marginTop: "2rem",
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              borderRadius: "16px",
              padding: "1.4rem 1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 28px rgba(15, 23, 42, 0.25)",
              color: "#FFFFFF"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 0 3px rgba(16,185,129,0.2)" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#38BDF8" }}>
                  Complimentary Free Audit
                </span>
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem", lineHeight: 1.35 }}>
                Ready to find your fee leaks?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#94A3B8", marginBottom: "1.2rem", lineHeight: 1.5 }}>
                Get a complimentary Free Audit — no obligation.
              </p>
              <button
                onClick={onOpenDiag}
                className="btn-primary-hero"
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
                }}
              >
                Request for a FREE AUDIT →
              </button>
            </div>
          </div>
          <div className="calc-right">
            <div className="calc-result-card calc-result-main">
              <div className="calc-result-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M16 8a4 4 0 0 0-8 0v4"/></svg>
              </div>
              <div className="calc-result-label">Fee Leakage Recovered / Month</div>
              <div className="calc-result-value">{fmt(leakage)}</div>
              <div className="calc-result-sub">Platform commissions, weight disputes &amp; return claims</div>
            </div>
            <div className="calc-small-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div className="calc-result-label">Settlement Time Saved</div>
                <div className="calc-result-value" style={{ fontSize: "1.8rem" }}>{timeSaved} hrs</div>
                <div className="calc-result-sub">Auto-reconciled disputes</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </div>
                <div className="calc-result-label">Dispute Recovery</div>
                <div className="calc-result-value" style={{ fontSize: "1.8rem" }}>{fmt(disputeRecovery)}</div>
                <div className="calc-result-sub">Return claim &amp; COD mismatch</div>
              </div>
            </div>
            <div className="calc-badge">
              <div className="calc-badge-dot" />
              100% automated settlement reconciliation across active commerce platforms.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// FULFILMENT NETWORK & WAREHOUSE HUBS — FULL-WIDTH SPLIT DASHBOARD UI
// ═══════════════════════════════════════════════
const hubs = [
  { city: "Gurgaon", state: "Haryana", area: "22,000 sq ft", sla: "Same Day", coverage: "Delhi NCR + North", fba: true, fa: true, region: "North", x: 244.79, y: 262.47 },
  { city: "Mumbai", state: "Maharashtra", area: "18,500 sq ft", sla: "Next Day", coverage: "West India", fba: true, fa: false, region: "West", x: 132.28, y: 534.89 },
  { city: "Bengaluru", state: "Karnataka", area: "16,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: true, region: "South", x: 260.19, y: 712.11 },
  { city: "Hyderabad", state: "Telangana", area: "12,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: false, region: "South", x: 284.39, y: 583.98 },
  { city: "Chennai", state: "Tamil Nadu", area: "11,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: false, region: "South", x: 332.76, y: 708.89 },
  { city: "Kolkata", state: "West Bengal", area: "10,500 sq ft", sla: "Next Day", coverage: "East India", fba: true, fa: false, region: "East", x: 552.24, y: 433.38 },
  { city: "Ahmedabad", state: "Gujarat", area: "9,500 sq ft", sla: "Next Day", coverage: "West India", fba: false, fa: false, region: "West", x: 123.97, y: 420.31 },
  { city: "Lucknow", state: "Uttar Pradesh", area: "8,000 sq ft", sla: "Next Day", coverage: "Central UP + East", fba: false, fa: false, region: "North", x: 351.08, y: 309.29 },
  { city: "Patna", state: "Bihar", area: "7,000 sq ft", sla: "Next Day", coverage: "Bihar + Jharkhand", fba: false, fa: false, region: "East", x: 464.75, y: 345.66 },
  { city: "Indore", state: "Madhya Pradesh", area: "6,500 sq ft", sla: "Next Day", coverage: "Central India", fba: false, fa: false, region: "Central", x: 213.09, y: 429.11 },
  { city: "Ludhiana", state: "Punjab", area: "6,000 sq ft", sla: "Next Day", coverage: "Punjab + J&K", fba: false, fa: false, region: "North", x: 213.08, y: 191.58 },
  { city: "Guwahati", state: "Assam", area: "5,500 sq ft", sla: "Next Day", coverage: "North East India", fba: false, fa: false, region: "NE", x: 643.69, y: 329.68 },
];

const WarehouseHubs: React.FC = () => {
  const [activeHub, setActiveHub] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const hub = hubs[activeHub];
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    setTimeout(() => setBarWidth("98.2%"), 300);
  }, [activeHub]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveHub((prev) => (prev + 1) % hubs.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const filteredHubs = hubs;

  return (
    <section id="fulfilment-network" style={{ position: "relative", overflow: "hidden", padding: "4.5rem 0 5.5rem", background: "#FAFBFF" }}>
      {/* Keyframe Animations & Clean Scrollbar */}
      <style>{`
        @keyframes wh-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes wh-pulse-ring { 0% { r: 200; opacity: 0.7; } 100% { r: 700; opacity: 0; } }
        @keyframes wh-dash-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
        @keyframes wh-glow-breathe { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        @keyframes wh-dot-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); } 50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); } }
        
        .wh-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .wh-sidebar-scroll::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 4px; }
        .wh-sidebar-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        .wh-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

        .wh-hub-item { transition: all 0.22s cubic-bezier(0.4,0,0.2,1); }
        .wh-hub-item:hover { transform: translateX(3px); background: #FFFFFF !important; box-shadow: 0 4px 14px rgba(37,99,235,0.08) !important; }
        .wh-stat-card { transition: all 0.25s ease; }
        .wh-stat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(37,99,235,0.1) !important; border-color: #93C5FD !important; }
        .wh-tooltip { animation: wh-float 4s ease-in-out infinite; }

        .wh-split-container {
          display: grid;
          grid-template-columns: 330px 1fr;
          gap: 1.2rem;
          margin-bottom: 2rem;
          align-items: stretch;
        }
        @media (max-width: 1024px) {
          .wh-split-container {
            display: flex !important;
            flex-direction: column-reverse !important;
            width: 100% !important;
            gap: 1.25rem !important;
          }
          .wh-sidebar-card, .wh-map-card {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .wh-map-viewport {
            height: 390px !important;
            width: 100% !important;
          }
          .wh-sidebar-scroll {
            max-height: 250px !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
        @media (max-width: 640px) {
          .wh-map-viewport {
            height: 330px !important;
          }
        }
      `}</style>

      {/* Background Orbs */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1340px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Compact Center-Aligned Header ── */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            background: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
            border: "1px solid #BFDBFE",
            borderRadius: "30px", padding: "0.3rem 1rem", marginBottom: "0.5rem"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB", animation: "wh-dot-pulse 2s infinite" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px", color: "#1D4ED8", fontFamily: "'Inter', sans-serif" }}>
              Pan-India Fulfilment Infrastructure
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 800, color: "#0F172A",
            lineHeight: 1.15, margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em"
          }}>
            12-State Managed <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Warehouse Network</span>
          </h2>
        </div>

        {/* ── 2-COLUMN SPLIT DASHBOARD LAYOUT (RESPONSIVE) ── */}
        <div className="wh-split-container">

          {/* ── LEFT SIDEBAR: HUBS LIST ── */}
          <div className="wh-sidebar-card" style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #E2E8F0",
            padding: "1.2rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 30px rgba(37,99,235,0.04)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.8rem", borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB" }} />
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F172A", fontFamily: "'Inter', sans-serif" }}>
                  Hub Locations
                </span>
              </div>
              <span style={{ fontSize: "0.72rem", background: "#EFF6FF", color: "#2563EB", fontWeight: 800, padding: "0.18rem 0.6rem", borderRadius: "12px", border: "1px solid #BFDBFE" }}>
                {filteredHubs.length} Hubs
              </span>
            </div>

            {/* Scrollable City Items List */}
            <div className="wh-sidebar-scroll" style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              maxHeight: "520px",
              overflowY: "auto",
              paddingRight: "0.3rem"
            }}>
              {filteredHubs.map((h, i) => {
                const originalIndex = hubs.findIndex(item => item.city === h.city);
                const isActive = activeHub === originalIndex;
                return (
                  <div
                    key={h.city}
                    className="wh-hub-item"
                    onClick={() => { setActiveHub(originalIndex); setIsAutoPlay(false); }}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "16px",
                      background: isActive ? "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)" : "#F8FAFC",
                      border: isActive ? "1.5px solid #3B82F6" : "1px solid #F1F5F9",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "10px",
                        background: isActive ? "linear-gradient(135deg, #2563EB, #4F46E5)" : "#E2E8F0",
                        color: isActive ? "#FFFFFF" : "#64748B",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.78rem", fontWeight: 800, flexShrink: 0
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#FFFFFF" : "#64748B"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.86rem", fontWeight: isActive ? 800 : 700, color: isActive ? "#1E40AF" : "#0F172A", fontFamily: "'Inter', sans-serif" }}>
                          {h.city}
                        </div>
                        <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 500 }}>
                          {h.state} • {h.area}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 700,
                        color: h.sla === "Same Day" ? "#059669" : "#2563EB",
                        background: h.sla === "Same Day" ? "#ECFDF5" : "#EFF6FF",
                        padding: "0.15rem 0.45rem", borderRadius: "6px",
                        display: "inline-block"
                      }}>
                        {h.sla}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT SIDE: FULL MAP VIEWPORT ── */}
          <div
            className="wh-map-card"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 30px rgba(37,99,235,0.04)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Map Top Status Bar */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.9rem 1.4rem",
              borderBottom: "1px solid #F1F5F9",
              background: "linear-gradient(180deg, #FAFBFF 0%, #FFFFFF 100%)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB" }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", fontFamily: "'Inter', sans-serif" }}>
                  Interactive Pan-India Map View
                </span>
              </div>
            </div>

            {/* Large Interactive Map Canvas */}
            <div className="wh-map-viewport" style={{
              position: "relative", width: "100%", height: "550px",
              background: "linear-gradient(160deg, #F8FAFF 0%, #F0F4FF 40%, #FAFBFF 100%)",
              overflow: "hidden"
            }}>
              {/* Subtle Grid Lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}>
                <defs>
                  <pattern id="wh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wh-grid)" />
              </svg>

              {/* Main SVG India GeoJSON Map (Exact Lat/Long Projection) */}
              <svg viewBox="0 0 800 900" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "relative", zIndex: 1 }}>
                <defs>
                  <linearGradient id="wh-india-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#6366F1"/>
                  </linearGradient>
                  <linearGradient id="wh-line-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.15"/>
                  </linearGradient>
                  <filter id="wh-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="wh-pin-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                  </radialGradient>
                </defs>

                {/* Mathematical GeoJSON State Boundaries Background */}
                <IndiaGeoMapBackground />

                {/* Logistics Route Lines from Central Gurgaon Hub (x: 244.79, y: 262.47) */}
                {hubs.map((h, i) => {
                  const isActive = activeHub === i;
                  const isFiltered = filteredHubs.some(fh => fh.city === h.city);
                  if (!isFiltered) return null;
                  return (
                    <g key={`wh-line-${i}`}>
                      <line
                        x1="244.79" y1="262.47" x2={h.x} y2={h.y}
                        stroke={isActive ? "url(#wh-line-flow)" : "#93C5FD"}
                        strokeWidth={isActive ? "2.5" : "1"}
                        strokeDasharray={isActive ? "none" : "3 4"}
                        opacity={isActive ? 0.9 : 0.3}
                        style={{ transition: "all 0.4s ease" }}
                      />
                      {isActive && (
                        <>
                          <circle r="4" fill="#3B82F6" filter="url(#wh-glow)">
                            <animateMotion path={`M 244.79 262.47 L ${h.x} ${h.y}`} dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <circle r="2" fill="#FFFFFF">
                            <animateMotion path={`M 244.79 262.47 L ${h.x} ${h.y}`} dur="2.5s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* All 12 Hub Pins */}
                {hubs.map((h, idx) => {
                  const isActive = activeHub === idx;
                  const isFiltered = filteredHubs.some(fh => fh.city === h.city);
                  if (!isFiltered) return null;

                  return (
                    <g key={idx} onClick={() => { setActiveHub(idx); setIsAutoPlay(false); }} style={{ cursor: "pointer" }}>
                      {/* Active Glow Background */}
                      {isActive && (
                        <circle cx={h.x} cy={h.y} r="28" fill="url(#wh-pin-glow)" style={{ animation: "wh-glow-breathe 2s ease-in-out infinite" }} />
                      )}

                      {/* Sonar Pulse Rings */}
                      {isActive && (
                        <>
                          <circle cx={h.x} cy={h.y} r="8" fill="none" stroke="#3B82F6" strokeWidth="2">
                            <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={h.x} cy={h.y} r="8" fill="none" stroke="#6366F1" strokeWidth="1.5">
                            <animate attributeName="r" values="8;24" dur="2s" begin="0.4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0" dur="2s" begin="0.4s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}

                      {/* Pin Shadow */}
                      {isActive && <circle cx={h.x} cy={h.y + 2} r="10" fill="rgba(37,99,235,0.15)" />}

                      {/* Main Pin Circle */}
                      <circle
                        cx={h.x} cy={h.y}
                        r={isActive ? "8.5" : "5.5"}
                        fill={isActive ? "url(#wh-india-stroke)" : "#475569"}
                        stroke="#FFFFFF"
                        strokeWidth={isActive ? "2.5" : "2"}
                        style={{ transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", filter: isActive ? "drop-shadow(0 2px 6px rgba(37,99,235,0.4))" : "none" }}
                      />

                      {/* Inner White Center Dot */}
                      <circle cx={h.x} cy={h.y} r={isActive ? "3.2" : "2"} fill="#FFFFFF" style={{ transition: "all 0.3s ease" }} />

                      {/* City Name Label with White Mask Outline */}
                      <text
                        x={h.x} y={h.y - (isActive ? 13 : 9)}
                        textAnchor="middle"
                        fontSize={isActive ? "13" : "10"}
                        fontWeight="800"
                        fill={isActive ? "#1D4ED8" : "#1E293B"}
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        paintOrder="stroke fill"
                        fontFamily="'Inter', sans-serif"
                        style={{
                          pointerEvents: "none", userSelect: "none",
                          transition: "all 0.3s ease"
                        }}
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
    </section>
  );
};




// ═══════════════════════════════════════════════
// STICKY BAR
// ═══════════════════════════════════════════════
const StickyBar: React.FC<{ onOpenDiag: () => void }> = ({ onOpenDiag }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const handleScroll = () => { if (!dismissed) setVisible(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);
  return (
    <div className={`sticky-bar ${visible && !dismissed ? "sticky-bar-visible" : ""}`}>
      <div className="sticky-bar-inner">
        <div className="sticky-bar-dot" />
        <p className="sticky-bar-text"><strong>Ready to find your fee leaks?</strong> Get a complimentary Free Audit — no obligation.</p>
        <button onClick={onOpenDiag} className="sticky-bar-btn">Request for a FREE AUDIT →</button>
        <button onClick={() => { setDismissed(true); setVisible(false); }} className="sticky-bar-close">✕</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// MAIN HOME PAGE COMPONENT
// ═══════════════════════════════════════════════
export default function HomePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeCap, setActiveCap] = useState(0);

  // Universal Scroll Reveal Observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animated Count-Up for Stats
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } }); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const useCountUp = (end: number, duration: number, active: boolean, decimals = 0) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!active) return;
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(parseFloat((eased * end).toFixed(decimals)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [active, end, duration, decimals]);
    return count;
  };

  const gmvCount = useCountUp(850, 2000, statsVisible);
  const channelCount = useCountUp(35, 1800, statsVisible);
  const warehouseCount = useCountUp(12, 1500, statsVisible);
  const fillRateCount = useCountUp(98.2, 2200, statsVisible, 1);
  const words = ["Marketplaces", "D2C Stores", "B2B Channels", "Institutional Orders", "Multi-Platform Growth"];
  const [wordIdx, setWordIdx] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionClass("exit");
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
        setTransitionClass("enter");
        setTimeout(() => setTransitionClass(""), 50);
      }, 380);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  // Timeline observer
  const [isTimelineLit, setIsTimelineLit] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsTimelineLit(true); observer.disconnect(); } }); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Section 12: Case Studies / Testimonials (3 approved stories)
  const testimonials = [
    { quote: "Good Life transitioned our entire marketplace model. Their finance reconciliation caught fee leaks we didn't know existed, and our sales grew 2.5x in under a year.", author: "Founder & CEO", role: "National Kitchen Appliance Brand", initial: "N", color: "#2563EB" },
    { quote: "We scaled from 1 to 12 states overnight. Good Life WMS is rock solid — our dispatch SLA turnaround is consistently under 4 hours.", author: "Operations Director", role: "Leading Consumer Goods Brand", initial: "C", color: "#7C3AED" },
    { quote: "Daily payment disputes were eating up our margins. Good Life automated audits resolved 98% of return variances instantly.", author: "Head of E-commerce", role: "Premier Wellness Partner", initial: "W", color: "#059669" },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const [activeAccStep, setActiveAccStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  // Section 15: Schema-Enabled FAQ Data
  const homeFaqs = [
    { q: "What makes Good Life different from a traditional e-commerce agency?", a: "Good Life is an integrated Commerce Operating Partner, not an agency. We take full accountability for catalogue listings, inventory planning, multi-state warehousing, performance ads, settlement reconciliation, D2C operations, B2B/institutional execution and multi-channel order dispatch—under one operating model." },
    { q: "Does Good Life support multi-platform marketplace launch?", a: "Yes. Good Life helps brands evaluate, onboard and operate across multiple leading and relevant platforms—including Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj and other approved channels." },
    { q: "Can Good Life help an OEM manufacturer launch a consumer brand?", a: "Yes. Good Life has supported the ecommerce launch of new brands created by companies that previously operated primarily as OEMs. Our Brand Incubation mandate covers opportunity assessment, catalogue, marketplace setup, inventory, fulfilment and performance marketing." },
    { q: "Can Good Life manage D2C and marketplace operations together?", a: "Yes. Good Life can manage the operational layer for both marketplace and D2C channels together — including catalogue, order flow, inventory synchronisation, fulfilment, returns and performance reporting — providing a unified view across channels." },
    { q: "How does your finance reconciliation service work?", a: "We perform daily automated reconciliation audits on commissions, shipping charges, COD payments, returns, and payment gateways across marketplace and D2C channels. We identify listing fee leaks and disputable platform returns, recovering money that typically goes unnoticed." },
    { q: "Can Good Life fulfil bulk and institutional orders?", a: "Good Life can support brands in fulfilling bulk and institutional orders through its regional warehouse network. This includes B2B platform enquiries (IndiaMART, TradeIndia, Moglix, JioMart B2B), quotation coordination, dispatch and reconciliation." },
    { q: "Where are your warehouses located?", a: "We operate 12 warehousing locations across Gurgaon, Patna, Mumbai, Ahmedabad, Hyderabad, Guwahati, Bengaluru, Lucknow, Chennai, Indore, Kolkata, and Ludhiana, with FBA/FA hubs in select cities." },
  ];

  const portfolioLogos = [
    {
      name: "Thorne",
      svg: (
        <svg viewBox="0 0 120 30" width="120" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="900" fontSize="17" letterSpacing="2px" fill="#0F172A">THORNE</text>
        </svg>
      )
    },
    {
      name: "Puka",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" fill="#15803D">PUKA</text>
        </svg>
      )
    },
    {
      name: "HMS",
      svg: (
        <svg viewBox="0 0 90 30" width="90" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px" fill="#2563EB">HMS</text>
        </svg>
      )
    },
    {
      name: "Gaia Herbs",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <path d="M10 20 Q15 6 20 20" stroke="#059669" strokeWidth="2.5" fill="none" />
          <text x="26" y="21" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5px" fill="#059669">GAIA HERBS</text>
        </svg>
      )
    },
    {
      name: "Spark",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <polygon points="12,6 15,14 23,14 17,19 19,27 12,22 5,27 7,19 1,14 9,14" fill="#F59E0B" />
          <text x="28" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="1px" fill="#D97706">SPARK</text>
        </svg>
      )
    },
    {
      name: "Panasonic",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5px" fill="#0041C2">Panasonic</text>
        </svg>
      )
    },
    {
      name: "Mamaearth",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5px" fill="#0D9488">mamaearth</text>
        </svg>
      )
    },
    {
      name: "boAt",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <path d="M6 22 L16 10 L24 22 Z" fill="#DC2626" />
          <text x="30" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="17" fill="#0F172A">boAt</text>
        </svg>
      )
    },
    {
      name: "Golf Pro",
      svg: (
        <svg viewBox="0 0 130 30" width="130" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="800" fontSize="16" letterSpacing="1px" fill="#15803D">GOLF PRO</text>
        </svg>
      )
    }
  ];

  // Approved Platform Vector SVGs (Enlarged & High-Impact)
  // Approved Platform Vector SVGs (Authentic High-Impact Logos)
  const channelSVGs: { name: string; bg: string; svg: React.ReactNode }[] = [
    {
      name: "Amazon",
      bg: "#232F3E",
      svg: (
        <svg viewBox="0 0 120 36" width="95" height="28" fill="none">
          <text x="2" y="22" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#FFFFFF" letterSpacing="-0.5">amazon</text>
          <path d="M6 26.5 C 30 35, 62 35, 78 26.5" stroke="#FF9900" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M74 23.5 L 81 27 L 76 32 Z" fill="#FF9900" />
        </svg>
      ),
    },
    {
      name: "Flipkart",
      bg: "#2874F0",
      svg: (
        <svg viewBox="0 0 125 36" width="100" height="28" fill="none">
          <rect x="2" y="4" width="24" height="26" rx="5" fill="#FFE500" />
          <path d="M8 9 h12 v4 h-7 v3 h6 v4 h-6 v7 h-5 z" fill="#2874F0" />
          <path d="M18 16 h4 v3 h-4 z" fill="#FFE500" />
          <text x="32" y="24" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="-0.5">flipkart</text>
        </svg>
      ),
    },
    {
      name: "Myntra",
      bg: "#18181B",
      svg: (
        <svg viewBox="0 0 115 36" width="92" height="28" fill="none">
          <path d="M3 26 L9 7 L16 19 L23 7 L29 26" stroke="#FF3F6C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M9 7 L16 19 L23 7" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="34" y="23" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#FFFFFF" letterSpacing="0.2">myntra</text>
        </svg>
      ),
    },
    {
      name: "Moglix",
      bg: "#E8192C",
      svg: (
        <svg viewBox="0 0 115 36" width="92" height="28" fill="none">
          <rect x="2" y="5" width="24" height="24" rx="6" fill="#E8192C" />
          <path d="M7 22 V12 L12 17 L17 12 V22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="32" y="24" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="-0.2">moglix</text>
        </svg>
      ),
    },
    {
      name: "JioMart",
      bg: "#0066CC",
      svg: (
        <svg viewBox="0 0 115 36" width="92" height="28" fill="none">
          <circle cx="15" cy="17" r="12" fill="#0088FF" />
          <text x="7" y="22" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF">Jio</text>
          <text x="32" y="24" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="-0.2">Mart</text>
        </svg>
      ),
    },
    {
      name: "Snapmint",
      bg: "#00B09B",
      svg: (
        <svg viewBox="0 0 120 36" width="96" height="28" fill="none">
          <path d="M4 25 L12 6 L16 15 L22 6 L14 25 Z" fill="#00B09B" />
          <text x="26" y="24" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#FFFFFF" letterSpacing="-0.2">snapmint</text>
        </svg>
      ),
    },
    {
      name: "Bajaj",
      bg: "#003087",
      svg: (
        <svg viewBox="0 0 110 36" width="88" height="28" fill="none">
          <path d="M3 8 H16 L7 17 L16 26 H3 Z" fill="#38BDF8" />
          <text x="22" y="24" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="0.5">BAJAJ</text>
        </svg>
      ),
    },
    {
      name: "IB (Industrybuying / IndiaMART)",
      bg: "#E8711A",
      svg: (
        <svg viewBox="0 0 100 36" width="80" height="28" fill="none">
          <rect x="2" y="5" width="26" height="24" rx="6" fill="#FFFFFF" />
          <text x="7" y="23" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#E8711A">IB</text>
          <text x="34" y="23" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">B2B</text>
        </svg>
      ),
    },
  ];

  // Section 7: Capability & Promise Mapping (Everything Commerce. One Partner.)
  const capabilityPromises = [
    { capability: "Marketplace Operations", promise: "Run & optimise every day", href: "/capabilities/marketplace-operations" },
    { capability: "Marketplace Growth & Ads", promise: "Turn spend into sales", href: "/capabilities/marketplace-growth" },
    { capability: "Multi-Platform Commerce", promise: "Sell everywhere, seamlessly", href: "/multi-platform-commerce" },
    { capability: "D2C Commerce", promise: "Own the customer journey", href: "/d2c-commerce-operations" },
    { capability: "B2B & Institutional", promise: "Win larger orders", href: "/b2b-institutional-commerce" },
    { capability: "Inventory Planning", promise: "Right stock, right channel", href: "/capabilities/inventory-planning" },
    { capability: "Fulfilment & Warehousing", promise: "Pan-India delivery infrastructure", href: "/capabilities/warehousing-fulfilment" },
    { capability: "Revenue Assurance", promise: "Recover every rupee", href: "/capabilities/revenue-assurance" },
    { capability: "Returns Management", promise: "Reduce RTO & leakage", href: "/capabilities/returns-operations" },
    { capability: "Heavy & Bulky Commerce", promise: "Deliver complex products confidently", href: "/specialised/heavy-bulky-commerce" },
  ];

  // Section 14: Insights (CMS Articles preview)
  const insights = [
    { title: "How Daily Settlement Audits Recover 2-3% Leaked GMV for Marketplace Brands", category: "Revenue Assurance", date: "July 2026", readTime: "5 min read", link: "/insights" },
    { title: "Multi-State Warehousing Strategy: Reducing Order SLA & Regional Freight Costs", category: "Fulfilment", date: "June 2026", readTime: "7 min read", link: "/insights" },
    { title: "From OEM Manufacturer to Consumer Brand: A 6-Step Ecommerce Launch Playbook", category: "Brand Launch", date: "May 2026", readTime: "6 min read", link: "/insights" },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      
      {/* ── SECTION 1: HEADER (Sticky navigation + CTA always visible) ── */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── SECTION 2: HERO (Positioning statement + Primary/Secondary CTA) ── */}
      <section className="hero-section-light" id="hero-home">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="container">
          <div className="hero-inner-light">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              India&apos;s Trusted E-Commerce Operations Partner | Pan-India Presence
            </div>
            <h1 className="hero-headline">
              We help businesses attract more customers,<br />
              automate operations &amp; grow faster.
            </h1>
            <p className="hero-subtitle">
              Marketplace, D2C &amp; B2B growth—managed through one accountable operating model.
            </p>
            <div className="hero-cta-row">
              <button className="btn-primary-hero" onClick={() => setDiagOpen(true)}>
                Request for a FREE AUDIT →
              </button>
              <button className="btn-ghost-hero" onClick={() => setVideoOpen(true)}>
                ▷ Watch Our Story
              </button>
            </div>

            {/* ── SECTION 3: CREDIBILITY STRIP (Channel Logos Infinite Auto-Scroll Marquee) ── */}
            <div className="channel-strip">
              <div className="channel-marquee-container">
                <div className="channel-marquee-track">
                  {[...channelSVGs, ...channelSVGs].map((ch, idx) => (
                    <div
                      key={idx}
                      className="channel-card-lg"
                      title={ch.name}
                      style={{ background: ch.bg }}
                    >
                      {ch.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Band (Credibility Metric Track) */}
      <section className="stats-band">
        <div className="container stats-band-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <p className="stats-band-eyebrow" style={{ color: "#FBBF24" }}>Proven Performance</p>
              <h2 className="stats-band-title">Our Track Record</h2>
            </div>
            <p style={{ color: "#E2E8F0", maxWidth: "340px", fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.6 }}>
              Six years operating e-commerce across marketplaces, D2C, B2B and institutional channels for Indian brands.
            </p>
          </div>
          <div className="stats-grid">
            {[
              { num: "₹850 Cr+", caption: "GMV Managed" },
              { num: "35+", caption: "Channel Integrations" },
              { num: "12", caption: "State Warehouse Hubs" },
              { num: "98.2%", caption: "Fill Rate SLA" },
            ].map((stat, idx) => (
              <div key={idx} className="stat-block reveal" style={{ transitionDelay: `${idx * 0.1}s`, opacity: 1, transform: "none" }}>
                <span className="stat-number"><Counter target={stat.num} /></span>
                <div className="stat-divider" style={{ background: "linear-gradient(90deg, #FBBF24, #F59E0B)" }} />
                <p className="stat-caption" style={{ color: "#CBD5E1", fontSize: "0.9rem", fontWeight: 700, opacity: 1 }}>{stat.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── SECTION 5: THREE BUYER SITUATIONS (Routes to Launch / Fix & Grow / Scale page) ── */}
      <section className="paths-section" id="three-situations">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="ptn-section-eyebrow">Tailored Operating Paths</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Where Is Your Business Today?</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Choose Launch Online, Fix &amp; Grow, or Scale Pan-India as your primary entry route.</p>
          </div>
          <div className="paths-grid">
            {[
              { tag: "01. Launch Online", tagColor: "#2563EB", title: "Offline Brand / Manufacturer", desc: "Entering e-commerce for the first time across Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj and other approved platforms, plus D2C.", cta: "Explore Launch Mandate →", href: "/solutions/launch-online" },
              { tag: "02. Fix & Grow", tagColor: "#0D9488", title: "Active Marketplace Brand", desc: "Stuck with stagnant GMV, rising ACOS, un-audited settlement losses, or high customer returns. We audit, fix, and grow.", cta: "Explore Fix & Grow Audit →", href: "/solutions/fix-and-grow" },
              { tag: "03. Scale Pan-India", tagColor: "#7C3AED", title: "Established Enterprise Brand", desc: "Scaling 12-state warehouse inventory, regional dealer fulfilment, B2B/institutional channels, and multi-platform D2C sync.", cta: "Explore Pan-India Scale →", href: "/solutions/scale-pan-india" },
            ].map((card, idx) => (
              <div key={idx} className="path-card reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="path-card-tag" style={{ color: card.tagColor }}>{card.tag}</div>
                <h3 className="path-card-title">{card.title}</h3>
                <p className="path-card-desc">{card.desc}</p>
                <Link href={card.href} className="path-card-cta" style={{ color: card.tagColor }}>{card.cta}</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.95rem", color: "#475569", fontWeight: 600 }}>
            💡 We also help OEMs build brands, brands expand across platforms, and companies operate D2C and institutional commerce.
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY GOOD LIFE (Operator Credibility) ── */}
      <section className="unlock-section" id="why-good-life">
        <div className="container">
          <div className="unlock-card">
            <div>
              <span className="ptn-section-eyebrow">Operator Credibility</span>
              <h2 className="ptn-section-title" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>Why Leading Brands Choose Good Life</h2>
              <p style={{ color: "#64748B", fontSize: "0.97rem", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                Not just an agency. Good Life takes accountability for your complete e-commerce operation.
              </p>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <button onClick={() => setDiagOpen(true)} className="btn-primary-hero" style={{ height: "46px", padding: "0 1.5rem", fontSize: "0.92rem" }}>Schedule a Demo →</button>
                <button onClick={() => setVideoOpen(true)} className="btn-ghost-hero" style={{ height: "46px", padding: "0 1.4rem", fontSize: "0.92rem" }}>▷ Watch Demo</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { num: "01", title: "Merchant & Distribution Partnership", desc: "We purchase stock, manage end-to-end catalogue listings, and take inventory risk off your balance sheet." },
                { num: "02", title: "OEM Brand Launch & Incubation", desc: "Proven track record launching 5 brand-new consumer labels on ecommerce for veteran manufacturing/OEM partners over the last 3 years." },
                { num: "03", title: "Unified Multi-Channel Execution", desc: "Synchronize inventory across 12 state hubs to satisfy Amazon, Flipkart, Myntra, Snapmint, B2B, Moglix, and D2C orders simultaneously." },
              ].map((item, idx) => (
                <div key={idx} className={`unlock-step ${activeAccStep === idx ? "active" : ""}`} onClick={() => setActiveAccStep(idx)}>
                  <div className="unlock-step-head">
                    <span className="unlock-step-num">{item.num}</span>
                    <h4 className="unlock-step-title">{item.title}</h4>
                  </div>
                  {activeAccStep === idx && <p className="unlock-step-desc">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE (Trusted by brands) ── */}
      <div className="brands-marquee-section" style={{ padding: "3.5rem 0", background: "#FAFBFF", borderTop: "1px solid #E2E8F0" }}>
        <p className="brands-marquee-label">Trusted by brands across e-commerce, B2B &amp; institutional commerce</p>
        <div className="logo-marquee-wrap">
          <div className="logo-marquee-track">
            {[...portfolioLogos, ...portfolioLogos].map((logo, idx) => (
              <span key={idx} className="marquee-brand" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{logo.svg}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── INDUSTRY CATEGORIES SECTION (Feedback Item 6) ── */}
      <section className="industry-categories-section" style={{ background: "#FFFFFF", padding: "4.5rem 0", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow" style={{ color: "#7C3AED" }}>Specialised Vertical Operations</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Category-Specific Fulfilment &amp; Growth</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Customised operating workflows tailored for high-growth product categories.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="industry-categories-grid">
            {[
              {
                num: "01",
                title: "Beauty & Fashion",
                desc: "Expedited dispatch turnaround under 4 hours, batch expiration tracking, and return QC checks.",
                gradient: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
                badgeColor: "#7C3AED",
                borderColor: "#D8B4FE"
              },
              {
                num: "02",
                title: "Electronics & FMCG",
                desc: "High-value serial number tracking, return validation, and platform SLA compliance checks.",
                gradient: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
                badgeColor: "#0284C7",
                borderColor: "#7DD3FC"
              },
              {
                num: "03",
                title: "Nutrition & Luxury",
                desc: "FSSAI-compliant warehouse hygiene setup, batch control, and tamper-proof security shipping.",
                gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                badgeColor: "#D97706",
                borderColor: "#FCD34D"
              }
            ].map((cat, idx) => (
              <div key={idx} style={{
                background: cat.gradient,
                border: `1.5px solid ${cat.borderColor}`,
                borderRadius: "20px",
                padding: "2rem 1.6rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: cat.badgeColor, opacity: 0.85, marginBottom: "0.8rem", lineHeight: 1 }}>
                  {cat.num}
                </span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem", letterSpacing: "-0.3px" }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.65, fontWeight: 500, margin: 0 }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CAPABILITY & PROMISE (Interactive Split Terminal Viewport - Option 1) ── */}
      <section className="ptn-do-section" id="capabilities" style={{ background: "linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%)", padding: "5.5rem 0", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div className="ptn-do-header" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
              border: "1px solid #BFDBFE",
              borderRadius: "30px", padding: "0.35rem 1.1rem", marginBottom: "0.6rem"
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB", animation: "wh-dot-pulse 2s infinite" }} />
              <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.8px", color: "#1D4ED8", fontFamily: "'Inter', sans-serif" }}>
                Connected Commerce Operating Model
              </span>
            </div>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>
              Everything Commerce. <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One Partner.</span>
            </h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem", maxWidth: "720px", margin: "0.4rem auto 0" }}>
              Good Life connects your entire e-commerce operation— from marketplaces and D2C to B2B, fulfilment and revenue assurance.
            </p>
          </div>

          {/* ── INTERACTIVE SPLIT TERMINAL VIEWPORT (Linear / Vercel Style) ── */}
          <div className="wh-split-container" style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
            alignItems: "stretch"
          }}>
            {/* Left Capabilities Selector List */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
              padding: "1.2rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 30px rgba(37,99,235,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              maxHeight: "560px",
              overflowY: "auto"
            }} className="wh-sidebar-scroll">
              {capabilityPromises.map((item, idx) => {
                const isActive = activeCap === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCap(idx)}
                    onMouseEnter={() => setActiveCap(idx)}
                    style={{
                      padding: "0.85rem 1.1rem",
                      borderRadius: "16px",
                      background: isActive ? "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)" : "#F8FAFC",
                      border: isActive ? "1.5px solid #2563EB" : "1px solid #F1F5F9",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: isActive ? "0 4px 14px rgba(37,99,235,0.1)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "10px",
                        background: isActive ? "linear-gradient(135deg, #2563EB, #4F46E5)" : "#E2E8F0",
                        color: isActive ? "#FFFFFF" : "#64748B",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.75rem", fontWeight: 800, flexShrink: 0
                      }}>
                        0{idx + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.88rem", fontWeight: isActive ? 800 : 700, color: isActive ? "#1D4ED8" : "#0F172A", fontFamily: "'Inter', sans-serif" }}>
                          {item.capability}
                        </div>
                        <div style={{ fontSize: "0.74rem", color: isActive ? "#2563EB" : "#64748B", fontWeight: 500 }}>
                          {item.promise}
                        </div>
                      </div>
                    </div>

                    <div style={{ color: isActive ? "#2563EB" : "#94A3B8", fontSize: "0.9rem", fontWeight: 800, transform: isActive ? "translateX(2px)" : "none", transition: "all 0.2s ease" }}>
                      →
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Interactive Mandate Operating Terminal Card */}
            {(() => {
              const active = capabilityPromises[activeCap] || capabilityPromises[0];
              const detailsMap: Record<string, string[]> = {
                "Marketplace Operations": [
                  "Full catalogue creation, listing & A+ brand store setup",
                  "Daily listing health, stockouts & buybox price monitoring",
                  "Platform compliance, SLA management & brand registry"
                ],
                "Marketplace Growth & Ads": [
                  "Amazon PPC, Sponsored Products, Display & Brand ads",
                  "Flipkart PLA & Myntra ad campaign management",
                  "ACOS & ROAS target optimization for maximum margin"
                ],
                "Multi-Platform Commerce": [
                  "Unified expansion across Amazon, Flipkart, Myntra, JioMart & Snapmint",
                  "Multi-channel automated inventory synchronization",
                  "Channel-wise margin guardrails & price parity control"
                ],
                "D2C Commerce": [
                  "Shopify & Custom storefront technical management",
                  "Integrated payment gateway & COD verification engine",
                  "Under 4-hour order dispatch SLA from nearest warehouse"
                ],
                "B2B & Institutional": [
                  "IndiaMART, Moglix, TradeIndia & B2B enquiry management",
                  "Bulk quotation, PO processing & payment terms execution",
                  "Institutional dealer network fulfillment pan-India"
                ],
                "Inventory Planning": [
                  "12-State WMS regional stock allocation strategy",
                  "AI-driven demand forecasting & buffer stock triggers",
                  "Overstock & slow-moving SKU prevention analytics"
                ],
                "Fulfilment & Warehousing": [
                  "12 Strategic managed state warehouse locations",
                  "FBA / FA regional node execution and consignment intake",
                  "Same-day & Next-day order dispatch SLA across India"
                ],
                "Revenue Assurance": [
                  "Daily automated audit of marketplace commission & shipping fees",
                  "Weight dispute, lost inventory & damaged return claim recovery",
                  "Payment gateway & COD settlement reconciliation"
                ],
                "Returns Management": [
                  "Pan-India reverse logistics & customer return verification",
                  "Warehouse QC inspection & restocking classification",
                  "Automated platform claim filing to recover RTO losses"
                ],
                "Heavy & Bulky Commerce": [
                  "Specialised ops for ceiling fans, chimneys & home appliances",
                  "Heavy freight transit insurance & damage-proof packaging",
                  "Regional dealer & large package logistics fulfillment"
                ]
              };
              const activeDetails = detailsMap[active.capability] || detailsMap["Marketplace Operations"];

              return (
                <div style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  border: "1.5px solid #2563EB",
                  padding: "2rem 2.2rem",
                  boxShadow: "0 10px 40px rgba(37,99,235,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Top Status & Indicator */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 0 3px rgba(16,185,129,0.2)" }} />
                        <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#059669" }}>
                          Operating Mandate Active
                        </span>
                      </div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.3rem 0.8rem", borderRadius: "14px", border: "1px solid #BFDBFE" }}>
                        0{activeCap + 1} / 10 Mandate
                      </span>
                    </div>

                    {/* Active Title */}
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.8rem", letterSpacing: "-0.02em" }}>
                      {active.capability}
                    </h3>

                    {/* Active Promise Guarantee Box */}
                    <div style={{
                      background: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
                      border: "1px solid #BFDBFE",
                      borderRadius: "16px",
                      padding: "0.9rem 1.2rem",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem"
                    }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#1D4ED8" }}>Good Life Operating Promise</div>
                        <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginTop: "0.1rem" }}>{active.promise}</div>
                      </div>
                    </div>

                    {/* Key Execution Deliverables */}
                    <div style={{ marginBottom: "1.8rem" }}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#64748B", marginBottom: "0.8rem" }}>
                        Key Execution Deliverables
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {activeDetails.map((detail, dIdx) => (
                          <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                            <span style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.9rem", lineHeight: 1.4 }}>✓</span>
                            <span style={{ fontSize: "0.92rem", color: "#334155", fontWeight: 600, lineHeight: 1.45 }}>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Explore Link CTA */}
                  <div style={{ paddingTop: "1.2rem", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
                      Managed under 1 Operating Model
                    </span>
                    <Link
                      href={active.href}
                      className="btn-primary-hero"
                      style={{
                        height: "44px",
                        padding: "0 1.4rem",
                        borderRadius: "12px",
                        fontSize: "0.88rem",
                        fontWeight: 800,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                    >
                      Explore {active.capability} Mandate →
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>



      {/* ── SECTION 9: FULFILMENT NETWORK (Pan-India Interactive Map) ── */}
      <WarehouseHubs />

      {/* ── SECTION 16: FINAL CTA BAND + FOOTER ── */}
      <section className="final-cta-section">
        <div className="container final-cta-inner">
          <h2 className="final-cta-title">Scale Your Brand With India&apos;s <span className="cta-br"><br /></span>Premier Commerce Operating Partner</h2>
          <p className="final-cta-subtitle">Request our complimentary Commerce Diagnostic to identify leakage points, unlock new channel growth—across marketplaces, D2C, B2B and institutional commerce.</p>
          <div className="final-cta-btn-wrap">
            <button onClick={() => setDiagOpen(true)} className="btn-final-cta">Request a Free Commerce Diagnostic →</button>
          </div>
        </div>
      </section>

      <Footer />

      <StickyBar onOpenDiag={() => setDiagOpen(true)} />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* VIDEO MODAL */}
      <div className={`video-modal-overlay ${videoOpen ? "open" : ""}`} onClick={() => setVideoOpen(false)}>
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="video-modal-close" onClick={() => setVideoOpen(false)}>&times;</button>
          {videoOpen && (
            <video controls autoPlay src="https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-data-on-a-computer-screen-40787-large.mp4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>
      </div>
    </div>
  );
}
