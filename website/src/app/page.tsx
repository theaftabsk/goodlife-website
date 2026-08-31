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
                Request a Free Audit →
              </button>
            </div>
          </div>
          <div className="calc-right">
            <div className="calc-result-card calc-result-main">
              <div className="calc-result-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /><path d="M16 8a4 4 0 0 0-8 0v4" /></svg>
              </div>
              <div className="calc-result-label">Fee Leakage Recovered / Month</div>
              <div className="calc-result-value">{fmt(leakage)}</div>
              <div className="calc-result-sub">Platform commissions, weight disputes &amp; return claims</div>
            </div>
            <div className="calc-small-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>
                <div className="calc-result-label">Settlement Time Saved</div>
                <div className="calc-result-value" style={{ fontSize: "1.8rem" }}>{timeSaved} hrs</div>
                <div className="calc-result-sub">Auto-reconciled disputes</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
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
    <section id="fulfilment-network" style={{
      position: "relative",
      padding: "5rem 0",
      background: "linear-gradient(180deg, #F0F7FF 0%, #E2F1FE 30%, #ECF6FE 65%, #F8FAFC 100%)",
      overflow: "hidden"
    }}>
      {/* Soft Sky Blue Animated Floating Aurora Glows */}
      <div style={{
        position: "absolute",
        top: "-80px",
        left: "-80px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)",
        filter: "blur(90px)",
        pointerEvents: "none",
        animation: "whAurora1 22s ease-in-out infinite alternate"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "-100px",
        right: "-100px",
        width: "650px",
        height: "650px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 70%)",
        filter: "blur(95px)",
        pointerEvents: "none",
        animation: "whAurora2 26s ease-in-out infinite alternate"
      }}></div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes whAurora1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(90px, 45px) scale(1.12); }
          100% { transform: translate(45px, 80px) scale(0.96); }
        }
        @keyframes whAurora2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-80px, -55px) scale(1.15); }
          100% { transform: translate(-40px, -90px) scale(0.94); }
        }
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
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(186, 230, 253, 0.9);
          border-radius: 16px;
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.04);
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
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wh-grid)" />
            </svg>

            <svg viewBox="0 0 800 850" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "relative", zIndex: 1, padding: "2rem 2rem 4rem 2rem" }}>
              <defs>
                <linearGradient id="wh-india-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <filter id="wh-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="wh-pin-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
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
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
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
          <button onClick={onOpenDiag} className="sticky-bar-btn">Request a Free Audit →</button>
        </div>

        {/* MOBILE CONTENT (WhatsApp) */}
        <a href="https://wa.me/9102212345678" target="_blank" rel="noopener noreferrer" className="sticky-bar-mobile-content" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    { quote: "Daily payment disputes were eating up our margins. Good Life automated audits resolved 98% of return variances instantly.", author: "Head of Ecommerce", role: "Premier Wellness Partner", initial: "W", color: "#059669" },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const [activeAccStep, setActiveAccStep] = useState(0);
  const [catFilter, setCatFilter] = useState<"all" | "active" | "upcoming">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  // Section 15: Schema-Enabled FAQ Data
  const homeFaqs = [
    { q: "What makes Good Life different from a traditional ecommerce agency?", a: "Good Life is an integrated Ecommerce Operating Partner, not an agency. We take full accountability for catalogue listings, inventory planning, multi-state warehousing, performance ads, settlement reconciliation, D2C operations, B2B/institutional execution and multi-channel order dispatch—under one operating model." },
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
      category: "Global Wellness & Nutrition",
      svg: (
        <svg viewBox="0 0 120 30" width="120" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="900" fontSize="17" letterSpacing="2px" fill="#0F172A">THORNE</text>
        </svg>
      )
    },
    {
      name: "Puka",
      category: "Organic FMCG & Herbal",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" fill="#15803D">PUKA</text>
        </svg>
      )
    },
    {
      name: "HMS",
      category: "Industrial OEM & B2B",
      svg: (
        <svg viewBox="0 0 90 30" width="90" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px" fill="#2563EB">HMS</text>
        </svg>
      )
    },
    {
      name: "Gaia Herbs",
      category: "Herbal Supplements",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <path d="M10 20 Q15 6 20 20" stroke="#059669" strokeWidth="2.5" fill="none" />
          <text x="26" y="21" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5px" fill="#059669">GAIA HERBS</text>
        </svg>
      )
    },
    {
      name: "Spark",
      category: "Consumer Electronics",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <polygon points="12,6 15,14 23,14 17,19 19,27 12,22 5,27 7,19 1,14 9,14" fill="#F59E0B" />
          <text x="28" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="1px" fill="#D97706">SPARK</text>
        </svg>
      )
    },
    {
      name: "Panasonic",
      category: "Consumer Appliances",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5px" fill="#0041C2">Panasonic</text>
        </svg>
      )
    },
    {
      name: "Mamaearth",
      category: "Personal Care & Beauty",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5px" fill="#0D9488">mamaearth</text>
        </svg>
      )
    },
    {
      name: "boAt",
      category: "Audio & Wearables",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <path d="M6 22 L16 10 L24 22 Z" fill="#DC2626" />
          <text x="30" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="17" fill="#0F172A">boAt</text>
        </svg>
      )
    },
    {
      name: "Golf Pro",
      category: "Sports & Fitness",
      svg: (
        <svg viewBox="0 0 130 30" width="130" height="30" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="800" fontSize="16" letterSpacing="1px" fill="#15803D">GOLF PRO</text>
        </svg>
      )
    }
  ];

  // Approved Platform Vector SVGs (Refined & Balanced 38px Scale)
  const channelSVGs: { name: string; svg: React.ReactNode }[] = [
    {
      name: "Amazon",
      svg: (
        <svg viewBox="0 0 145 38" width="145" height="38" fill="none">
          <text x="2" y="23" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="24" fill="#131921" letterSpacing="-0.5">amazon</text>
          <path d="M5 29 C 33 39, 70 39, 94 29" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M88 25.5 L 97 29.5 L 90.5 35 Z" fill="#FF9900" />
        </svg>
      ),
    },
    {
      name: "Flipkart",
      svg: (
        <svg viewBox="0 0 155 38" width="155" height="38" fill="none">
          <rect x="3" y="6" width="24" height="26" rx="5" fill="#2874F0" />
          <text x="10" y="25" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="19" fill="#FFE500">f</text>
          <text x="34" y="25" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="23" fill="#2874F0" letterSpacing="-0.5">flipkart</text>
        </svg>
      ),
    },
    {
      name: "Meesho",
      svg: (
        <svg viewBox="0 0 145 38" width="145" height="38" fill="none">
          <text x="2" y="27" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="27" fill="#F43397" letterSpacing="-0.5">meesho</text>
        </svg>
      )
    },
    {
      name: "Myntra",
      svg: (
        <svg viewBox="0 0 150 38" width="150" height="38" fill="none">
          <path d="M4 27 L10 9 L17 21 L24 9 L30 27" stroke="#FF3F6C" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="39" y="25" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="23" fill="#282C3F" letterSpacing="0.2">myntra</text>
        </svg>
      ),
    },
    {
      name: "Blinkit",
      svg: (
        <svg viewBox="0 0 145 38" width="145" height="38" fill="none">
          <rect x="2" y="5" width="28" height="28" rx="8" fill="#F8CB46" />
          <text x="10" y="25" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="20" fill="#0C831F">b</text>
          <text x="37" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="23" fill="#0C831F" letterSpacing="-0.4">blinkit</text>
        </svg>
      ),
    },
    {
      name: "Nykaa",
      svg: (
        <svg viewBox="0 0 135 38" width="135" height="38" fill="none">
          <text x="2" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="25" fill="#FC2779" fontStyle="italic" letterSpacing="0.5">NYKAA</text>
        </svg>
      ),
    },
    {
      name: "JioMart",
      svg: (
        <svg viewBox="0 0 150 38" width="150" height="38" fill="none">
          <text x="2" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#E11900">Jio</text>
          <text x="34" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="24" fill="#008ECC" letterSpacing="-0.2">Mart</text>
        </svg>
      ),
    },
    {
      name: "Moglix",
      svg: (
        <svg viewBox="0 0 145 38" width="145" height="38" fill="none">
          <rect x="2" y="6" width="24" height="26" rx="4" fill="#E02A26" />
          <path d="M6 24 V12 L14 18 L22 12 V24" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="33" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="23" fill="#1F2937" letterSpacing="-0.2">moglix</text>
        </svg>
      ),
    },
    {
      name: "Shopify",
      svg: (
        <svg viewBox="0 0 145 38" width="145" height="38" fill="none">
          <path d="M14 5 L4 12 L9 33 L26 33 L31 12 Z" fill="#95BF47" />
          <text x="10" y="27" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF">S</text>
          <text x="38" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#212326" letterSpacing="-0.3">shopify</text>
        </svg>
      ),
    },
    {
      name: "Snapmint",
      svg: (
        <svg viewBox="0 0 155 38" width="155" height="38" fill="none">
          <circle cx="15" cy="19" r="12" fill="#00C29F" />
          <text x="9" y="25" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF">S</text>
          <text x="35" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#00C29F" letterSpacing="-0.2">snapmint</text>
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

      {/* ── SECTION 2: HERO (CLEAN CORPORATE PROFESSIONAL) ── */}
      <section className="hero-real-section" id="hero-home">

        {/* Animated Aurora Background */}
        <div className="hero-bottom-glow"></div>

        {/* Hero Main Content */}
        <div className="hero-real-body" style={{ zIndex: 2, position: 'relative' }}>
          <div className="container" style={{ width: "100%", padding: "0 1rem" }}>
            <div className="hero-left-content" style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", alignItems: "center" }}>

              {/* Professional Clean Trust Eyebrow (No bulky fita/ribbon border) */}
              <div className="reveal" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "2rem",
                color: "#2563EB",
                fontSize: "0.86rem",
                fontWeight: 700,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                padding: 0
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "rgba(37, 99, 235, 0.10)",
                  color: "#2563EB",
                  flexShrink: 0
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>India&apos;s Trusted Ecommerce Operations Partner</span>
              </div>

              <h1 className="hero-headline-etail reveal" style={{ fontSize: "clamp(2.8rem, 5.8vw, 4.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-2px", color: "#0B1736", margin: "0 auto 2.2rem", maxWidth: "1050px" }}>
                Scale Ecommerce. <br />
                <span style={{ background: "linear-gradient(90deg, #4F46E5 0%, #2563EB 50%, #0284C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
                  Not Complexity.
                </span>
              </h1>

              <p className="hero-subtitle-etail reveal" style={{ fontSize: "clamp(1.12rem, 1.9vw, 1.3rem)", color: "#475569", lineHeight: 1.75, marginBottom: "3.2rem", maxWidth: "880px", fontWeight: 500 }}>
                Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.
              </p>

              <div className="hero-cta-wrapper reveal" style={{ display: "flex", alignItems: "center", gap: "1.4rem", flexWrap: "wrap", justifyContent: "center", width: "100%", marginBottom: "4.5rem" }}>
                <button
                  className="btn-primary-hero"
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "58px",
                    padding: "0 2.5rem",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 28px rgba(37, 99, 235, 0.35)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(37, 99, 235, 0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(37, 99, 235, 0.35)"; }}
                >
                  Request a Free Audit →
                </button>
                <button
                  className="btn-ghost-hero"
                  onClick={() => setVideoOpen(true)}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(15,23,42,0.16)",
                    color: "#0B1736",
                    height: "58px",
                    borderRadius: "16px",
                    padding: "0 2.3rem",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(15,23,42,0.09)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  ▷ Watch Our Story
                </button>
              </div>

              {/* ── BRAND MARQUEE (Trusted Channels) ── */}
              <div className="brands-marquee-section reveal" style={{ position: "relative", zIndex: 3, padding: "1.5rem 0 1rem", background: "transparent", border: "none", boxShadow: "none" }}>
                <p className="brands-marquee-label" style={{ textAlign: "center", marginBottom: "1.1rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.2px", color: "#64748B", textTransform: "uppercase" }}>
                  Operating across India&apos;s leading platforms
                </p>
                <div className="channel-strip" style={{ margin: 0, padding: 0 }}>
                  <div className="channel-marquee-container" style={{ margin: 0, padding: 0, maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)" }}>
                    <div className="channel-marquee-track">
                      {[...channelSVGs, ...channelSVGs].map((ch, idx) => (
                        <div
                          key={idx}
                          title={ch.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 1.85rem",
                            cursor: "default",
                            transition: "all 0.3s ease",
                            opacity: 1
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          {ch.svg}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2.5: METRICS & PROVEN IMPACT (Interactive Glass Cards + Smooth Sky Blue Aurora Animation) ── */}
      <section className="metrics-interactive-section">
        {/* Animated Sky Blue Aurora Background Glows */}
        <div className="metrics-glow-1"></div>
        <div className="metrics-glow-2"></div>

        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "2.8rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)", fontWeight: 800, color: "#0B1736", margin: "0 0 0.6rem", letterSpacing: "-0.6px" }}>
              What Our Operating Scale Represents
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#64748B", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
              Measurable infrastructure, revenue throughput, and performance reliability delivered daily for partner brands across India.
            </p>
          </div>

          {/* Interactive 4-Tile Grid with Visual Icons and Micro-Details */}
          <div className="reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.25rem",
            width: "100%"
          }}>
            {[
              {
                value: "₹850 Cr+",
                label: "GMV Managed & Scaled",
                description: "Cumulative annual commerce volume across brand partners",
                tag: "Revenue Scaled",
                tagColor: "#2563EB",
                tagBg: "rgba(37, 99, 235, 0.08)",
                borderColor: "rgba(37, 99, 235, 0.18)",
                iconBg: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
                iconColor: "#2563EB",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                ),
                subIcon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                ),
                subText: "2.8x Average Client Growth"
              },
              {
                value: "35+",
                label: "Platform Channels",
                description: "Marketplaces, Quick-Commerce apps & D2C storefronts",
                tag: "Multi-Platform",
                tagColor: "#0D9488",
                tagBg: "rgba(13, 148, 136, 0.08)",
                borderColor: "rgba(13, 148, 136, 0.18)",
                iconBg: "linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)",
                iconColor: "#0D9488",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                subIcon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                subText: "Amazon, Flipkart & Quick Comm"
              },
              {
                value: "12",
                label: "State Regional Hubs",
                description: "Pan-India multi-state inventory replication nodes",
                tag: "Pan-India Network",
                tagColor: "#7C3AED",
                tagBg: "rgba(124, 58, 237, 0.08)",
                borderColor: "rgba(124, 58, 237, 0.18)",
                iconBg: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
                iconColor: "#7C3AED",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                subIcon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                subText: "12 State Fulfilment Centers"
              },
              {
                value: "98.2%",
                label: "Dispatch & Fill Rate SLA",
                description: "Same-day execution & defect-free dispatch accuracy",
                tag: "Execution SLA",
                tagColor: "#059669",
                tagBg: "rgba(5, 150, 105, 0.08)",
                borderColor: "rgba(5, 150, 105, 0.18)",
                iconBg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
                iconColor: "#059669",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
                subIcon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                subText: "Under 4-Hour SLA Turnaround",
                showSlaBar: true
              },
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.84)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${metric.borderColor}`,
                  borderRadius: "20px",
                  padding: "1.75rem 1.5rem",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 45px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)";
                  e.currentTarget.style.borderColor = metric.tagColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)";
                  e.currentTarget.style.borderColor = metric.borderColor;
                }}
              >
                {/* Top Row: Icon + Category Badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: metric.iconBg,
                    color: metric.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
                  }}>
                    {metric.icon}
                  </div>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: metric.tagColor,
                    background: metric.tagBg,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "99px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    {metric.tag}
                  </span>
                </div>

                {/* Big Counter Value */}
                <div>
                  <div style={{ fontSize: "clamp(2.1rem, 2.8vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", lineHeight: 1 }}>
                    <Counter target={metric.value} />
                  </div>
                  <div style={{ fontSize: "1rem", color: "#0F172A", fontWeight: 800, marginTop: "0.5rem", lineHeight: 1.3 }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: "0.84rem", color: "#64748B", marginTop: "0.35rem", lineHeight: 1.5, fontWeight: 500 }}>
                    {metric.description}
                  </div>
                </div>

                {/* Bottom Micro-Badge or SLA progress with pure SVG Icons */}
                <div style={{ marginTop: "1.25rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(226, 232, 240, 0.7)" }}>
                  {metric.showSlaBar ? (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", fontWeight: 700, color: "#059669", marginBottom: "0.4rem" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          {metric.subIcon} Target: 98%
                        </span>
                        <span>Achieved: 98.2%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ width: "98.2%", height: "100%", background: "linear-gradient(90deg, #10B981 0%, #059669 100%)", borderRadius: "99px" }}></div>
                      </div>
                    </div>
                  ) : (
                    <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      {metric.subIcon}
                      <span>{metric.subText}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY / OPERATING MODEL MANIFESTO ── */}
      <section style={{ padding: "0 1.5rem 1rem", position: "relative", zIndex: 2 }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{
            background: "linear-gradient(135deg, #0B1736 0%, #172554 50%, #1E293B 100%)",
            borderRadius: "24px",
            padding: "3rem 2.5rem",
            color: "#FFFFFF",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 24px 60px rgba(11, 23, 54, 0.16)",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Subtle glow background */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "300px",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none"
            }} />

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.35rem 1rem",
                borderRadius: "99px",
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38BDF8",
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                marginBottom: "1.2rem"
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38BDF8", boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.25)" }} />
                The Good Life Operating Principle
              </div>

              <h3 style={{
                fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)",
                fontWeight: 700,
                lineHeight: 1.55,
                color: "#F8FAFC",
                maxWidth: "960px",
                margin: "0 auto 1rem",
                letterSpacing: "-0.3px"
              }}>
                &ldquo;Established brands achieve profitable pan-India ecommerce growth when channels, marketing, inventory, fulfilment and revenue control operate as one integrated system—with one accountable operating partner.&rdquo;
              </h3>

              <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: "780px", margin: "0 auto", lineHeight: 1.6 }}>
                Eliminating operational fragmentation across listings, ads, multi-state warehouses, and finance reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY GOOD LIFE (Operator Credibility - Rich Sky Blue Aurora & Frosted Glass) ── */}
      <section className="unlock-section unlock-section-rich-glow" id="why-good-life">
        {/* Rich Sky Blue Animated Floating Aurora Orbs */}
        <div className="unlock-glow-orb-1"></div>
        <div className="unlock-glow-orb-2"></div>
        <div className="unlock-glow-orb-3"></div>

        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1rem", position: "relative", zIndex: 2 }}>
          <div className="unlock-card" style={{
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "22px",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            padding: "2.2rem 2.5rem",
            boxShadow: "0 16px 40px rgba(37, 99, 235, 0.07), 0 1px 3px rgba(15, 23, 42, 0.04)",
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "2.4rem",
            alignItems: "start"
          }}>
            {/* Left Column: Heading & CTA */}
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.22rem 0.75rem",
                borderRadius: "99px",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                color: "#2563EB",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "0.65rem"
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563EB", boxShadow: "0 0 0 2.5px rgba(37, 99, 235, 0.2)" }}></span>
                Operator Credibility
              </span>
              <h2 style={{
                fontSize: "clamp(1.65rem, 2.3vw, 2.05rem)",
                fontWeight: 800,
                color: "#0B1736",
                letterSpacing: "-0.6px",
                lineHeight: 1.2,
                marginTop: "0.2rem",
                marginBottom: "0.75rem"
              }}>
                Why Leading Brands Choose Good Life
              </h2>
              <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Not just another marketing agency. Good Life takes accountability for your complete ecommerce operation—from multi-state warehousing to daily reconciliation.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "42px",
                    padding: "0 1.4rem",
                    borderRadius: "10px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 16px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Schedule a Demo →
                </button>
                <button
                  onClick={() => setVideoOpen(true)}
                  style={{
                    height: "42px",
                    padding: "0 1.2rem",
                    borderRadius: "10px",
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    color: "#0B1736",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F8FAFC";
                    e.currentTarget.style.borderColor = "#94A3B8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#CBD5E1";
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563EB">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column: Explored Points (Detailed Deliverables & Accreditations) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                {
                  num: "01",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  ),
                  title: "Merchant & Distribution Partnership",
                  summary: "We purchase stock outright, manage multi-platform cataloguing, and take inventory holding risk completely off your balance sheet.",
                  bullets: [
                    "Direct Purchase Orders (PO) for predictable cash-flow",
                    "Channel MAP price parity & brand registry governance",
                    "Automated daily payment settlement audit & deduction recovery"
                  ],
                  highlight: "Instant balance sheet relief with guaranteed commercial execution."
                },
                {
                  num: "02",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  ),
                  title: "OEM Brand Launch & Incubation",
                  summary: "Turnkey incubation engine transforming legacy contract manufacturers and OEM factories into high-growth consumer digital brands.",
                  bullets: [
                    "Fast-track onboarding on Amazon Brand Registry, Flipkart Mall & Myntra",
                    "Complete packaging audit, A+ catalogue visual design & storefront setup",
                    "5 brand-new labels launched with ₹45 Cr+ combined first-year GMV"
                  ],
                  highlight: "Full turnkey product-market fit and commercial launch in 45 days."
                },
                {
                  num: "03",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="6" height="6" x="15" y="3" rx="1.5" />
                      <rect width="6" height="6" x="3" y="15" rx="1.5" />
                      <path d="M6 15V7a2 2 0 0 1 2-2h7" />
                      <path d="M18 9v8a2 2 0 0 1-2 2H9" />
                    </svg>
                  ),
                  title: "Unified Multi-Channel Execution",
                  summary: "Synchronize inventory across 12 state regional warehouse hubs to satisfy Amazon Prime, Flipkart Plus, Myntra, Quick-Commerce, B2B, and D2C simultaneously.",
                  bullets: [
                    "Same-day dispatch SLA & 98.2% defect-free order fill rate",
                    "Algorithmic multi-state stock replication & automated return QC",
                    "Single unified dashboard for consolidated cross-platform analytics"
                  ],
                  highlight: "Under 4-hour order turnaround across India's tier-1 and tier-2 markets."
                },
              ].map((item, idx) => {
                const isActive = activeAccStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveAccStep(idx)}
                    style={{
                      padding: "0.95rem 1.25rem",
                      borderRadius: "14px",
                      background: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.65)",
                      border: isActive ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: isActive ? "0 8px 20px rgba(37, 99, 235, 0.08), 0 1px 4px rgba(15, 23, 42, 0.03)" : "none"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#93C5FD";
                        e.currentTarget.style.background = "#FFFFFF";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#E2E8F0";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.65)";
                      }
                    }}
                  >
                    {/* Step Head */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{
                          fontFamily: "monospace",
                          fontWeight: 900,
                          fontSize: "0.82rem",
                          color: isActive ? "#FFFFFF" : "#64748B",
                          background: isActive ? "#2563EB" : "#F1F5F9",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "7px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}>
                          {item.icon}
                          {item.num}
                        </span>
                        <h4 style={{
                          fontSize: "0.98rem",
                          fontWeight: 800,
                          color: isActive ? "#0B1736" : "#1E293B",
                          margin: 0,
                          letterSpacing: "-0.2px",
                          transition: "color 0.2s ease"
                        }}>
                          {item.title}
                        </h4>
                      </div>
                      <div>
                        {/* Animated Chevron Indicator */}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isActive ? "#2563EB" : "#94A3B8"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.2s ease",
                            flexShrink: 0
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Smooth Slow Animated Expand Body */}
                    <div style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease"
                    }}>
                      <div style={{
                        overflow: "hidden",
                        minHeight: 0,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(-6px)",
                        transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}>
                        <div style={{ marginTop: "0.7rem", paddingTop: "0.7rem", borderTop: "1px solid #F1F5F9" }}>
                          <p style={{ color: "#475569", fontSize: "0.86rem", lineHeight: 1.55, margin: "0 0 0.75rem", fontWeight: 500 }}>
                            {item.summary}
                          </p>

                          {/* Key Deliverables Bullet Points */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.42rem", marginBottom: "0.8rem" }}>
                            {item.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#1E293B", fontWeight: 600 }}>
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="10" cy="10" r="9" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
                                  <path d="M6 10.2l2.6 2.6L14.2 7" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlight Badge */}
                          <div style={{
                            background: "#EFF6FF",
                            borderLeft: "3px solid #2563EB",
                            padding: "0.45rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.76rem",
                            color: "#1D4ED8",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "7px"
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                              <path d="M9 18h6" />
                              <path d="M10 22h4" />
                            </svg>
                            <span>{item.highlight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5.5: BRANDS WE SERVE (Sleek Horizontal Marquee Strip - Item 7) ── */}
      <div className="brands-marquee-section" style={{
        padding: "2.4rem 0 2.2rem",
        background: "#FFFFFF",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
        position: "relative",
        overflow: "hidden"
      }}>
        <p className="brands-marquee-label" style={{
          textAlign: "center",
          marginBottom: "1.2rem",
          fontSize: "0.78rem",
          fontWeight: 800,
          letterSpacing: "2.5px",
          color: "#475569",
          textTransform: "uppercase"
        }}>
          Brands We Operate &amp; Scale Across Marketplaces &amp; D2C
        </p>
        <div className="channel-strip" style={{ margin: 0 }}>
          <div className="channel-marquee-container" style={{
            margin: 0,
            padding: 0,
            maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)"
          }}>
            <div className="channel-marquee-track">
              {[...portfolioLogos, ...portfolioLogos].map((brand, idx) => (
                <div
                  key={idx}
                  title={brand.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 2.2rem",
                    cursor: "default",
                    transition: "all 0.3s ease",
                    opacity: 0.88
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.88";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {brand.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6.5: INDUSTRY CATEGORIES (Item 9 - Compact & Sleek) ── */}
      <section className="industry-categories-section" style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)",
        padding: "3.2rem 0 3.8rem",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
        position: "relative"
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>

          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "0.18rem 0.7rem",
              borderRadius: "99px",
              background: "#F5F3FF",
              border: "1px solid #DDD6FE",
              color: "#7C3AED",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "0.45rem"
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7C3AED", boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.2)" }}></span>
              Specialised Vertical Operations
            </span>
            <h2 className="ptn-section-title" style={{ fontSize: "clamp(1.55rem, 2.3vw, 1.95rem)", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem", letterSpacing: "-0.5px" }}>
              Category-Specific Fulfilment &amp; Growth
            </h2>
            <p className="ptn-section-subtitle" style={{ fontSize: "0.88rem", color: "#64748B", margin: "0 auto 1.3rem", maxWidth: "640px", lineHeight: 1.55 }}>
              Customised operating workflows tailored for high-growth product categories, alongside rapidly expanding new commerce verticals.
            </p>

            {/* Filter Pills */}
            <div style={{ display: "inline-flex", background: "#F1F5F9", padding: "3px", borderRadius: "10px", gap: "3px", border: "1px solid #E2E8F0" }}>
              {[
                { key: "all", label: "All Verticals (8)" },
                { key: "active", label: "Active Operations (5)" },
                { key: "upcoming", label: "Upcoming Verticals (3)" }
              ].map((tab) => {
                const isSelected = catFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setCatFilter(tab.key as "all" | "active" | "upcoming")}
                    style={{
                      padding: "0.32rem 0.85rem",
                      borderRadius: "7px",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      background: isSelected ? "#FFFFFF" : "transparent",
                      color: isSelected ? "#0F172A" : "#64748B",
                      boxShadow: isSelected ? "0 2px 6px rgba(15, 23, 42, 0.08)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem"
          }}>
            {[
              {
                id: "cat-1",
                type: "active",
                title: "Beauty & Personal Care",
                badge: "Active",
                badgeBg: "#ECFDF5",
                badgeColor: "#059669",
                badgeDot: "#10B981",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                  </svg>
                ),
                iconBg: "#F5F3FF",
                iconBorder: "#DDD6FE",
                desc: "Expedited turnaround under 4 hours, batch expiration & FEFO tracking, tamper seals and return QC checks.",
                highlight: "FEFO Batch Expiration & Fragrance QC",
                channels: ["Nykaa", "Amazon Beauty", "Tira", "Myntra", "Purplle"]
              },
              {
                id: "cat-2",
                type: "active",
                title: "Consumer Electronics & Appliances",
                badge: "Active",
                badgeBg: "#ECFDF5",
                badgeColor: "#059669",
                badgeDot: "#10B981",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="12" x="3" y="4" rx="2" />
                    <line x1="2" x2="22" y1="20" y2="20" />
                  </svg>
                ),
                iconBg: "#F0F9FF",
                iconBorder: "#BAE6FD",
                desc: "High-value serial number scan tracking, anti-theft packaging, return verification and marketplace SLA compliance.",
                highlight: "IMEI / Serial Scan & Sealed Inspection",
                channels: ["Amazon", "Flipkart", "JioMart", "Moglix"]
              },
              {
                id: "cat-3",
                type: "active",
                title: "Nutraceuticals & Wellness",
                badge: "Active",
                badgeBg: "#ECFDF5",
                badgeColor: "#059669",
                badgeDot: "#10B981",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                iconBg: "#FFFBEB",
                iconBorder: "#FDE68A",
                desc: "FSSAI-compliant storage, hygiene protocols, lot-level traceability, and temperature-monitored warehouse zones.",
                highlight: "FSSAI Certified & Lot Traceability",
                channels: ["Amazon", "Flipkart", "Tata 1mg", "D2C Stores"]
              },
              {
                id: "cat-4",
                type: "active",
                title: "Fashion, Apparel & Footwear",
                badge: "Active",
                badgeBg: "#ECFDF5",
                badgeColor: "#059669",
                badgeDot: "#10B981",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                ),
                iconBg: "#FFF1F2",
                iconBorder: "#FECDD3",
                desc: "Complex size-color variant matrix, high-speed automated picking, and rapid 24-hour return assessment QC.",
                highlight: "Variant SKU Matrix & Fast Returns QC",
                channels: ["Myntra", "Ajio", "Amazon Fashion", "Flipkart"]
              },
              {
                id: "cat-5",
                type: "active",
                title: "Home, Kitchen & Smart Living",
                badge: "Active",
                badgeBg: "#ECFDF5",
                badgeColor: "#059669",
                badgeDot: "#10B981",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                iconBg: "#EEF2FF",
                iconBorder: "#C7D2FE",
                desc: "Heavy/bulky freight handling, reinforced drop-test protective packaging, and multi-channel dealer sync.",
                highlight: "Bulky Freight & Fragile Glass Safe Pack",
                channels: ["Amazon", "Flipkart", "Pepperfry", "Meesho"]
              },
              {
                id: "cat-6",
                type: "upcoming",
                title: "Quick-Commerce Dark Stores",
                badge: "Upcoming • Pilot Live",
                badgeBg: "#F5F3FF",
                badgeColor: "#7C3AED",
                badgeDot: "#8B5CF6",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                iconBg: "#FAF5FF",
                iconBorder: "#E9D5FF",
                desc: "10-minute micro-node inventory staging, real-time dark store replenishment feeds, and automated zero-stockout triggers.",
                highlight: "10-Min Micro Staging & Dark Store Feed",
                channels: ["Blinkit", "Zepto", "Swiggy Instamart", "BB Now"]
              },
              {
                id: "cat-7",
                type: "upcoming",
                title: "Industrial & B2B Spares",
                badge: "Upcoming • In Pipeline",
                badgeBg: "#EFF6FF",
                badgeColor: "#2563EB",
                badgeDot: "#3B82F6",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                ),
                iconBg: "#F0F7FF",
                iconBorder: "#BFDBFE",
                desc: "OEM part number cataloguing, corrosion-resistant storage, and regional dealer quotation B2B fulfilment.",
                highlight: "OEM Part Indexing & Dealer Institutional",
                channels: ["Moglix", "IndustryBuying", "Amazon Business"]
              },
              {
                id: "cat-8",
                type: "upcoming",
                title: "Luxury Goods & Fine Jewelry",
                badge: "Upcoming • Q4 2026",
                badgeBg: "#FFFBEB",
                badgeColor: "#B45309",
                badgeDot: "#F59E0B",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 13L2 9Z" />
                    <path d="M11 3 8 9l4 13 4-13-3-6" />
                    <path d="M2 9h20" />
                  </svg>
                ),
                iconBg: "#FEFCE8",
                iconBorder: "#FEF08A",
                desc: "Armored vault storage, tamper-evident security packaging, OTP-validated dispatch, and custom white-glove unboxing.",
                highlight: "Vault Storage & OTP-Verified Courier",
                channels: ["Tata CLiQ Luxury", "Exclusive D2C", "Invite-Only"]
              }
            ]
              .filter((item) => catFilter === "all" || item.type === catFilter)
              .map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "15px",
                    padding: "1.15rem 1.15rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 3px 12px rgba(15, 23, 42, 0.03)",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(37, 99, 235, 0.08)";
                    e.currentTarget.style.borderColor = "#93C5FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 3px 12px rgba(15, 23, 42, 0.03)";
                    e.currentTarget.style.borderColor = "#E2E8F0";
                  }}
                >
                  {/* Top Row: Icon & Status Badge */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: cat.iconBg,
                        border: `1px solid ${cat.iconBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {cat.icon}
                      </div>

                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "0.16rem 0.5rem",
                        borderRadius: "99px",
                        background: cat.badgeBg,
                        color: cat.badgeColor,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.3px",
                        textTransform: "uppercase"
                      }}>
                        <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: cat.badgeDot }}></span>
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: "0.96rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem", letterSpacing: "-0.2px", lineHeight: 1.25 }}>
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.45, margin: "0 0 0.75rem", fontWeight: 500 }}>
                      {cat.desc}
                    </p>
                  </div>

                  {/* Bottom: Highlight Feature & Channels */}
                  <div>
                    {/* Highlight Box */}
                    <div style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "7px",
                      padding: "0.35rem 0.55rem",
                      fontSize: "0.72rem",
                      color: "#1E293B",
                      fontWeight: 700,
                      marginBottom: "0.65rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.highlight}</span>
                    </div>

                    {/* Supported Channels Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                      {cat.channels.map((ch, chIdx) => (
                        <span key={chIdx} style={{
                          fontSize: "0.64rem",
                          fontWeight: 600,
                          color: "#64748B",
                          background: "#F1F5F9",
                          padding: "0.12rem 0.4rem",
                          borderRadius: "4px"
                        }}>
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INTERACTIVE COMMERCE NETWORK ECOSYSTEM ── */}
      <CommerceNetwork />



      {/* ── SECTION 9: FULFILMENT NETWORK (Pan-India Interactive Map) ── */}
      <WarehouseHubs />

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
              { tag: "01. Launch Online", tagColor: "#2563EB", title: "Offline Brand / Manufacturer", desc: "Entering ecommerce for the first time across Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj and other approved platforms, plus D2C.", cta: "Explore Launch Mandate →", href: "/solutions/launch-online" },
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
        </div>
      </section>

      {/* ── SECTION 10: VERIFIED TESTIMONIALS & PARTNER REVIEWS (Item 10 - After India Map) ── */}
      <section className="testimonials-section" style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%)",
        padding: "4rem 0 4.5rem",
        borderTop: "1px solid #E2E8F0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.2rem 0.8rem",
              borderRadius: "99px",
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              color: "#2563EB",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "0.5rem"
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563EB", boxShadow: "0 0 0 2.5px rgba(37, 99, 235, 0.2)" }}></span>
              Client Testimonials &amp; Case Studies
            </span>
            <h2 className="ptn-section-title" style={{ fontSize: "clamp(1.65rem, 2.4vw, 2.1rem)", fontWeight: 800, color: "#0B1736", margin: "0 0 0.4rem", letterSpacing: "-0.5px" }}>
              What Brand Founders &amp; Operators Say
            </h2>
            <p className="ptn-section-subtitle" style={{ fontSize: "0.92rem", color: "#64748B", margin: "0 auto", maxWidth: "620px", lineHeight: 1.55 }}>
              Real operating impact and commerce scale delivered for India&apos;s leading consumer brands across marketplaces &amp; D2C.
            </p>
          </div>

          {/* 3-Column Testimonial Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.35rem"
          }}>
            {[
              {
                quote: "Good Life transitioned our entire marketplace model from passive selling to proactive growth. Their daily automated finance reconciliation caught fee leaks we didn't know existed, and our sales grew 2.8x in under 9 months.",
                author: "Rohan Mehta",
                role: "Founder & Managing Director",
                company: "National Home Appliances Brand",
                channels: "Amazon Prime • Flipkart Plus • JioMart",
                metric: "+180% YoY Commerce Growth",
                metricColor: "#1D4ED8",
                metricBg: "#EFF6FF",
                initial: "R",
                avatarBg: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                badgeBorder: "#BFDBFE"
              },
              {
                quote: "Scaling to 12 state hubs seemed impossible until Good Life took over our supply chain. Our dispatch SLA turnaround is consistently sub-4 hours with zero stockout penalties across Myntra, Ajio and Amazon.",
                author: "Pooja Sharma",
                role: "VP of Supply Chain & Operations",
                company: "Leading Consumer Lifestyle Label",
                channels: "Myntra • Ajio • Amazon Fashion • Nykaa",
                metric: "98.6% Order Fill Rate SLA",
                metricColor: "#047857",
                metricBg: "#ECFDF5",
                initial: "P",
                avatarBg: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
                badgeBorder: "#A7F3D0"
              },
              {
                quote: "As an OEM manufacturer, launching direct to consumer was completely new territory. Good Life handled our catalogue, Brand Registry, climate warehousing, and ads—taking us to ₹45 Cr+ GMV in year one.",
                author: "Vikramaditya Sengupta",
                role: "Co-Founder & Head of Digital Commerce",
                company: "Premier Nutraceuticals & Wellness Enterprise",
                channels: "Tata 1mg • Amazon • Flipkart • D2C",
                metric: "₹45 Cr+ First-Year GMV Scaled",
                metricColor: "#B45309",
                metricBg: "#FFFBEB",
                initial: "V",
                avatarBg: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
                badgeBorder: "#FDE68A"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "1.6rem 1.6rem 1.4rem",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 14px 30px rgba(37, 99, 235, 0.09)";
                  e.currentTarget.style.borderColor = "#93C5FD";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}
              >
                <div>
                  {/* Top: 5 Stars Rating & Metric Pill */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[...Array(5)].map((_, sIdx) => (
                        <svg key={sIdx} width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "99px",
                      background: item.metricBg,
                      border: `1px solid ${item.badgeBorder}`,
                      color: item.metricColor,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.3px"
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      {item.metric}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p style={{
                    fontSize: "0.92rem",
                    color: "#1E293B",
                    lineHeight: 1.6,
                    fontWeight: 500,
                    margin: "0 0 1.2rem",
                    fontStyle: "normal"
                  }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info & Verified Badge */}
                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: item.avatarBg,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "0.95rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      flexShrink: 0
                    }}>
                      {item.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0B1736", letterSpacing: "-0.2px", lineHeight: 1.2 }}>
                        {item.author}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                        {item.role} • <span style={{ color: "#334155" }}>{item.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Checkmark */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    padding: "0.18rem 0.45rem",
                    borderRadius: "6px",
                    fontSize: "0.64rem",
                    color: "#15803D",
                    fontWeight: 700
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
