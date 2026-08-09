"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import CommerceNetwork from "./components/CommerceNetwork";
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
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const hub = hubs[activeHub];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveHub((prev) => (prev + 1) % hubs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section id="fulfilment-network" style={{ position: "relative", padding: "6rem 0", background: "#F7F9FC", overflow: "hidden" }}>
      {/* Keyframe Animations */}
      <style>{`
        @keyframes wh-pulse-ring { 0% { r: 8; opacity: 0.7; } 100% { r: 35; opacity: 0; } }
        @keyframes wh-pulse-ring-inner { 0% { r: 8; opacity: 0.5; } 100% { r: 25; opacity: 0; } }
        @keyframes wh-glow-breathe { 0%,100% { opacity: 0.2; } 50% { opacity: 0.6; } }
        @keyframes wh-dash-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
        @keyframes wh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes wh-fade-slide-up { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        
        .wh-metric-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .wh-metric-card {
          background: #FFFFFF;
          border: 1px solid #DBEAFE;
          border-radius: 16px;
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.04);
          transition: all 0.3s ease;
        }
        .wh-metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.10);
          border-color: #93C5FD;
        }

        .wh-dashboard-container {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border-radius: 28px;
          border: 1px solid #DBEAFE;
          box-shadow: 0 20px 50px rgba(37, 99, 235, 0.10);
          overflow: hidden;
        }

        .wh-map-viewport {
          position: relative;
          width: 100%;
          height: 700px;
          background: #F7F9FC;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 2rem;
        }

        .wh-floating-card {
          position: absolute;
          bottom: 2.5rem;
          left: 2.5rem;
          zIndex: 20;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 1.8rem;
          width: 300px;
          box-shadow: 0 20px 50px rgba(37, 99, 235, 0.10);
          border: 1px solid #DBEAFE;
          animation: wh-float 6s ease-in-out infinite;
        }
        
        .wh-card-content {
          animation: wh-fade-slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .wh-node-group {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .wh-node-group:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .wh-metric-grid { grid-template-columns: repeat(2, 1fr); }
          .wh-map-viewport { height: 600px; }
        }

        @media (max-width: 768px) {
          .wh-dashboard-container {
            display: flex;
            flex-direction: column;
          }
          .wh-map-viewport {
            height: 450px;
            padding-top: 3.5rem;
          }
          .wh-floating-card {
            position: relative;
            bottom: auto; left: auto;
            width: 100%;
            border-radius: 24px 24px 0 0;
            border: none;
            border-top: 1px solid #DBEAFE;
            box-shadow: 0 -10px 30px rgba(37, 99, 235, 0.08);
            animation: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        
        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800, color: "#0F172A",
            lineHeight: 1.15, margin: "0 0 1rem 0", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em"
          }}>
            12-State Managed <span style={{ color: "#2563EB" }}>Warehouse Network</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#64748B", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Real-time pan-India logistics infrastructure designed to scale your operations effortlessly across all major hubs.
          </p>
        </div>

        {/* ── METRICS ROW ── */}
        <div className="wh-metric-grid">
          <div className="wh-metric-card">
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1E3A8A", marginBottom: "0.2rem" }}>12+</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Active States</div>
          </div>
          <div className="wh-metric-card">
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1E3A8A", marginBottom: "0.2rem" }}>15</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Warehouse Hubs</div>
          </div>
          <div className="wh-metric-card">
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1E3A8A", marginBottom: "0.2rem" }}>150K+</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Sq.Ft Capacity</div>
          </div>
          <div className="wh-metric-card">
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1E3A8A", marginBottom: "0.2rem" }}>99.9%</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Pan-India SLA</div>
          </div>
        </div>

        {/* ── MAP DASHBOARD ── */}
        <div 
          className="wh-dashboard-container"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* SVG Map Background */}
          <div className="wh-map-viewport">
            {/* Subtle Grid Lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
              <defs>
                <pattern id="wh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wh-grid)" />
            </svg>

            <svg viewBox="0 0 800 850" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "relative", zIndex: 1, padding: "2rem 2rem 4rem 2rem" }}>
              <defs>
                <linearGradient id="wh-india-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB"/>
                  <stop offset="100%" stopColor="#3B82F6"/>
                </linearGradient>
                <filter id="wh-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="wh-pin-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0"/>
                </radialGradient>
              </defs>

              <IndiaGeoMapBackground />

              {/* Dynamic network lines from active hub to all others */}
              {hubs.map((targetHub, i) => {
                if (i === activeHub) return null; // Don't draw to itself
                return (
                  <g key={`dynamic-line-${i}`}>
                    <line
                      x1={hub.x} y1={hub.y} x2={targetHub.x} y2={targetHub.y}
                      stroke="#93C5FD"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      opacity="0.6"
                      style={{ transition: "all 0.5s ease", animation: "wh-dash-flow 1s linear infinite" }}
                    />
                    {/* Moving Particle for all active routes */}
                    <g>
                      <circle r="4.5" fill="#60A5FA" filter="url(#wh-glow)">
                        <animateMotion path={`M ${hub.x} ${hub.y} L ${targetHub.x} ${targetHub.y}`} dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2.5" fill="#FFFFFF">
                        <animateMotion path={`M ${hub.x} ${hub.y} L ${targetHub.x} ${targetHub.y}`} dur="3s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>
                );
              })}

              {/* Hub Pins */}
              {hubs.map((h, idx) => {
                const isActive = activeHub === idx;
                return (
                  <g key={idx} onClick={() => { setActiveHub(idx); setIsAutoPlay(false); }} className="wh-node-group" style={{ transformOrigin: `${h.x}px ${h.y}px` }}>
                    {isActive && (
                      <circle cx={h.x} cy={h.y} r="35" fill="url(#wh-pin-glow)" style={{ animation: "wh-glow-breathe 2s ease-in-out infinite" }} />
                    )}
                    {isActive && (
                      <>
                        <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#2563EB" strokeWidth="2.5" style={{ animation: "wh-pulse-ring 2s infinite" }} />
                        <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#60A5FA" strokeWidth="1.5" style={{ animation: "wh-pulse-ring-inner 2s infinite", animationDelay: "0.5s" }} />
                      </>
                    )}
                    <circle
                      cx={h.x} cy={h.y}
                      r={isActive ? "9.5" : "6.5"}
                      fill={isActive ? "#2563EB" : "#64748B"}
                      stroke="#FFFFFF"
                      strokeWidth={isActive ? "2.5" : "2"}
                      style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", filter: isActive ? "drop-shadow(0 4px 10px rgba(37,99,235,0.4))" : "none" }}
                    />
                    <circle cx={h.x} cy={h.y} r={isActive ? "3.5" : "2.5"} fill="#FFFFFF" style={{ transition: "all 0.3s ease" }} />
                    
                    <text
                      x={h.x} y={h.y - (isActive ? 16 : 13)}
                      textAnchor="middle"
                      fontSize={isActive ? "14" : "11"}
                      fontWeight="800"
                      fill={isActive ? "#0F172A" : "#64748B"}
                      stroke="#F7F9FC"
                      strokeWidth="4"
                      paintOrder="stroke fill"
                      fontFamily="'Inter', sans-serif"
                      style={{ pointerEvents: "none", userSelect: "none", transition: "all 0.3s ease" }}
                    >
                      {h.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* FLOATING HUB DETAILS CARD */}
          <div className="wh-floating-card">
            <div key={activeHub} className="wh-card-content">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2563EB" }} />
                <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", fontFamily: "'Inter', sans-serif" }}>{hub.city}</h3>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#64748B", fontWeight: 500, marginBottom: "1.5rem" }}>
                {hub.state}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9", paddingBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>Capacity</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{hub.area}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9", paddingBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>SLA Coverage</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{hub.sla}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>Status</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10B981", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} /> Active
                  </span>
                </div>
              </div>


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
        <style>{`
          .sticky-bar-desktop-content { display: flex; align-items: center; gap: 1rem; flex: 1; }
          .sticky-bar-mobile-content { display: none; }
          @media (max-width: 768px) {
            .sticky-bar-desktop-content { display: none !important; }
            .sticky-bar-close { display: none !important; }
            .sticky-bar-inner {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              justify-content: flex-end !important;
              width: 100%;
            }
            .sticky-bar-mobile-content {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 56px;
              height: 56px;
              background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
              color: #FFFFFF;
              border-radius: 50%;
              text-decoration: none;
              box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
              margin-right: 0.5rem;
              margin-bottom: 0.5rem;
              transition: transform 0.2s ease;
            }
            .sticky-bar-mobile-content:active {
              transform: scale(0.95);
            }
            .sticky-bar-mobile-content svg {
              margin: 0 !important;
              width: 30px;
              height: 30px;
            }
          }
        `}</style>

        {/* DESKTOP CONTENT */}
        <div className="sticky-bar-desktop-content">
          <div className="sticky-bar-dot" />
          <p className="sticky-bar-text"><strong>Ready to find your fee leaks?</strong> Get a complimentary Free Audit — no obligation.</p>
          <button onClick={onOpenDiag} className="sticky-bar-btn">Request for a FREE AUDIT →</button>
        </div>

        {/* MOBILE CONTENT (WhatsApp) */}
        <a href="https://wa.me/9102212345678" target="_blank" rel="noopener noreferrer" className="sticky-bar-mobile-content" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        
        <button onClick={() => { setDismissed(true); setVisible(false); }} className="sticky-bar-close">✕</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// 3D ARCHITECTURAL HERO SCENE (AICM DESIGN STYLE)
// ═══════════════════════════════════════════════
const Etail3DHeroScene: React.FC = () => {
  return (
    <div className="hero-3d-scene-container">
      <div className="hero-3d-canvas" style={{
        background: "linear-gradient(145deg, #FAF8FF 0%, #F3F0FF 45%, #F7F5FF 100%)",
        borderColor: "#E9D5FF",
        boxShadow: "0 25px 60px rgba(124, 58, 237, 0.08), inset 0 2px 0 rgba(255, 255, 255, 0.9)"
      }}>
        {/* Subtle Pearl Grid Floor Overlay */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.28 }}>
          <defs>
            <pattern id="aicm-iso-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 25 L 50 50 L 100 25 Z" fill="none" stroke="#C084FC" strokeWidth="0.5" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aicm-iso-grid)" />
        </svg>

        {/* Ambient Purple & Cyan Neon Laser Glow Orbs */}
        <div style={{ position: "absolute", top: "20%", right: "20%", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(192,132,252,0.05) 50%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "15%", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(45px)", pointerEvents: "none" }} />

        {/* Floating Glass Metric Badge Left */}
        <div style={{
          position: "absolute",
          top: "12%",
          left: "6%",
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1.5px solid #E9D5FF",
          borderRadius: "16px",
          padding: "0.65rem 1rem",
          boxShadow: "0 12px 30px rgba(124,58,237,0.14)",
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          animation: "etailFloat3D 5s ease-in-out infinite"
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#A855F7", boxShadow: "0 0 0 4px rgba(168,85,247,0.25)" }} />
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", color: "#7C3AED", letterSpacing: "0.8px" }}>AICM AI Engine</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#0F172A" }}>Decentralized Ops</div>
          </div>
        </div>

        {/* Floating Glass Metric Badge Right */}
        <div style={{
          position: "absolute",
          bottom: "14%",
          right: "6%",
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1.5px solid #BFDBFE",
          borderRadius: "16px",
          padding: "0.65rem 1rem",
          boxShadow: "0 12px 30px rgba(37,99,235,0.14)",
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          animation: "etailFloat3D 6s ease-in-out infinite 1s"
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #0284C7)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 900 }}>
            ₹
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", color: "#2563EB", letterSpacing: "0.8px" }}>Revenue Recovery</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#0F172A" }}>₹850 Cr+ GMV</div>
          </div>
        </div>

        {/* AICM 3D ARCHITECTURAL ORBITAL TRACK & GOLD COIN SVG */}
        <svg viewBox="0 0 700 550" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "relative", zIndex: 2 }}>
          <defs>
            <linearGradient id="aicm-step-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F5F3FF" />
            </linearGradient>
            <linearGradient id="aicm-step-side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
            <radialGradient id="neon-ring-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#A855F7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="aicm-gold-coin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <filter id="aicm-shadow-heavy" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="12" dy="24" stdDeviation="20" floodColor="#4C1D95" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Large Architectural 3D Ground Shadow */}
          <ellipse cx="360" cy="360" rx="260" ry="110" fill="rgba(76,29,149,0.06)" />

          {/* AICM Recessed Circular Groove Orbit Track */}
          <g transform="translate(180, 150)">
            {/* Outer Recessed Groove Ring */}
            <ellipse cx="180" cy="180" rx="190" ry="95" fill="none" stroke="#E9D5FF" strokeWidth="28" opacity="0.6" />
            <ellipse cx="180" cy="180" rx="190" ry="95" fill="none" stroke="#C084FC" strokeWidth="6" opacity="0.8" filter="drop-shadow(0 0 12px #C084FC)" />

            {/* Glowing Laser Light Point inside Orbit Ring */}
            <ellipse cx="320" cy="235" rx="18" ry="8" fill="#F0ABFC" filter="drop-shadow(0 0 16px #E879F9)" />
            <ellipse cx="320" cy="235" rx="8" ry="3.5" fill="#FFFFFF" />

            {/* ROLLING 3D GOLD COIN ORBITING THE CIRCULAR GROOVE */}
            <g style={{ animation: "etailCoinBob 4s ease-in-out infinite" }} transform="translate(295, 120)">
              <ellipse cx="24" cy="24" rx="26" ry="26" fill="url(#aicm-gold-coin)" stroke="#FFFFFF" strokeWidth="3.5" filter="drop-shadow(0 10px 20px rgba(234,179,8,0.45))" />
              <ellipse cx="24" cy="24" rx="18" ry="18" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <text x="24" y="32" textAnchor="middle" fontSize="21" fontWeight="900" fill="#713F12" fontFamily="sans-serif">₹</text>
            </g>
          </g>

          {/* RIGHT SIDE 3D ARCHITECTURAL STEP PLATFORM */}
          <g filter="url(#aicm-shadow-heavy)" transform="translate(370, 160)">
            {/* Platform Top Surface */}
            <polygon points="0,90 180,0 300,60 120,150" fill="url(#aicm-step-top)" stroke="#FFFFFF" strokeWidth="2" />

            {/* Platform Front Left Side */}
            <polygon points="0,90 120,150 120,290 0,230" fill="url(#aicm-step-side)" stroke="#E9D5FF" strokeWidth="1.5" />

            {/* Platform Front Right Side */}
            <polygon points="120,150 300,60 300,200 120,290" fill="#CBD5E1" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* 3D Platform Top Architectural Accent Line */}
            <line x1="20" y1="80" x2="140" y2="140" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" />

            {/* GoodLife Brand Tag on 3D Step Surface */}
            <g transform="translate(70, 60) rotate(-26)">
              <rect x="0" y="0" width="110" height="34" rx="10" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
              <text x="55" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF" fontFamily="'Inter', sans-serif" letterSpacing="1">GOODLIFE</text>
            </g>
          </g>
        </svg>
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
  const [storeInputValue, setStoreInputValue] = useState("");

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

  // Hero Video Control State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const toggleHeroVideo = () => {
    if (heroVideoRef.current) {
      if (isVideoPlaying) {
        heroVideoRef.current.pause();
      } else {
        heroVideoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (heroVideoRef.current && heroVideoRef.current.duration) {
      const prog = (heroVideoRef.current.currentTime / heroVideoRef.current.duration) * 100;
      setVideoProgress(prog);
    }
  };
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

      {/* ── SECTION 2: HERO (NO. 1 WORLD-CLASS REAL WEBSITE 100VH FULL-BLEED VIDEO HERO) ── */}
      <section className="hero-real-section" id="hero-home">
        {/* Full Bleed Background Video (Muted, AutoPlay, Loop, 100% Crystal-Clear) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-real-video"
          src="/hero-bg-clean-video.mp4"
        />
        <div className="hero-real-overlay" />

        {/* Hero Main Content */}
        <div className="hero-real-body">
          <div className="container" style={{ width: "100%" }}>
            <div className="hero-left-content" style={{ maxWidth: "720px" }}>
              
              <div className="hero-badge" style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(12px)", border: "1px solid #E9D5FF", color: "#7C3AED" }}>
                <span className="hero-badge-dot" style={{ background: "#A855F7" }} />
                India&apos;s Trusted E-Commerce Operations Partner | Pan-India Presence
              </div>

              <h1 className="hero-headline-etail" style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-2.5px", color: "#0F172A", margin: "0 0 1.3rem" }}>
                We help businesses attract more customers,<br />
                automate operations &amp; grow faster.
              </h1>

              <p className="hero-subtitle-etail" style={{ fontSize: "1.18rem", color: "#475569", lineHeight: 1.65, marginBottom: "2.4rem", maxWidth: "580px", fontWeight: 500 }}>
                Marketplace, D2C &amp; B2B growth—managed through one accountable operating model.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                <button
                  className="btn-primary-hero"
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "56px",
                    padding: "0 2.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 28px rgba(37, 99, 235, 0.32)"
                  }}
                >
                  Request for a FREE AUDIT →
                </button>
                <button className="btn-ghost-hero" onClick={() => setVideoOpen(true)} style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", color: "#0F172A", height: "56px", borderRadius: "14px", padding: "0 1.8rem" }}>
                  ▷ Watch Our Story
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ── SECTION 3: CREDIBILITY STRIP (Channel Logos Infinite Auto-Scroll Marquee) ── */}
        <div className="brands-marquee-section" style={{ position: "relative", zIndex: 3, padding: "1.8rem 0", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
          <div className="container">
            <p className="brands-marquee-label" style={{ textAlign: "center", marginBottom: "1.2rem", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "2.5px", color: "#64748B", textTransform: "uppercase" }}>
              Pan-India Multi-Channel Marketplace Integrations
            </p>
            <div className="channel-strip" style={{ margin: 0 }}>
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

      {/* ── SECTION 7: INTERACTIVE COMMERCE NETWORK ECOSYSTEM ── */}
      <CommerceNetwork />



      {/* ── SECTION 9: FULFILMENT NETWORK (Pan-India Interactive Map) ── */}
      <WarehouseHubs />

      {/* ── FOOTER ── */}

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
