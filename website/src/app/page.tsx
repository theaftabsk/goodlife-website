"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import CommerceNetwork from "./components/CommerceNetwork";
import { IndiaGeoMapBackground } from "./components/IndiaGeoMapSVG";
import ServiceMatrix from "./components/ServiceMatrix";
import CommercialModels from "./components/CommercialModels";
import CustomSolutionForm from "./components/CustomSolutionForm";
import ProofCaseStudies from "./components/ProofCaseStudies";
// import MarketplaceLeakageCalculator from "./components/MarketplaceLeakageCalculator";
import ThirdPartyValidation from "./components/ThirdPartyValidation";
import "./home.css";
import "./homepage.css";

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
                  Confidential Operating Audit
                </span>
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem", lineHeight: 1.35 }}>
                Ready to find your fee leaks?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#94A3B8", marginBottom: "1.2rem", lineHeight: 1.5 }}>
                Get an expert diagnostic audit — zero obligation.
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
                UNLOCK YOUR GROWTH →
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
            border-radius: 18px !important;
          }
          .wh-map-viewport {
            height: 300px !important;
            padding-top: 0.5rem !important;
          }
          .wh-map-viewport svg {
            padding: 0.5rem !important;
          }
          .wh-floating-card {
            position: relative;
            bottom: auto; left: auto;
            width: 100% !important;
            border-radius: 16px 16px 0 0 !important;
            border: none !important;
            border-top: 1px solid #DBEAFE !important;
            padding: 1rem 0.85rem !important;
            box-shadow: 0 -6px 20px rgba(37, 99, 235, 0.06);
            animation: none;
          }
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1340px", margin: "0 auto", position: "relative", zIndex: 2 }}>

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




// STICKY BAR REMOVED
const StickyBar: React.FC<{ onOpenDiag: () => void }> = () => null;


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
  const [auditName, setAuditName] = useState("");
  const [auditPhone, setAuditPhone] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [toastDismissed, setToastDismissed] = useState(false);

  // Universal Scroll Blur Reveal Observer (Smooth Apple-style Appearing)
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .scroll-blur-reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 30px 0px' }
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
      name: "Crompton",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 165 42" width="165" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.5px" fill="#004B87">Crompton</text>
        </svg>
      )
    },
    {
      name: "USHA",
      category: "Sewing Machine",
      svg: (
        <svg viewBox="0 0 130 42" width="130" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="28" letterSpacing="2px" fill="#ED1C24">USHA</text>
        </svg>
      )
    },
    {
      name: "Havells",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 155 42" width="155" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <circle cx="15" cy="21" r="10" fill="#E31E24" />
          <path d="M12 18 L18 24 M18 18 L12 24" stroke="#FFF" strokeWidth="2.5" />
          <text x="32" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" fill="#E31E24" letterSpacing="0.5px">HAVELLS</text>
        </svg>
      )
    },
    {
      name: "Hindware",
      category: "Chimney",
      svg: (
        <svg viewBox="0 0 165 42" width="165" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="Georgia, serif" fontWeight="900" fontSize="24" letterSpacing="1px" fill="#D32F2F">hindware</text>
        </svg>
      )
    },
    {
      name: "Kenstar",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 150 42" width="150" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1.2px" fill="#0072CE">KENSTAR</text>
        </svg>
      )
    },
    {
      name: "Bajaj",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 140 42" width="140" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <polygon points="12,10 24,21 12,32 6,26 14,21 6,16" fill="#004A97" />
          <text x="30" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#004A97" letterSpacing="1px">BAJAJ</text>
        </svg>
      )
    },
    {
      name: "Livpure",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 150 42" width="150" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="25" fill="#00A3E0">Livpure</text>
          <circle cx="106" cy="14" r="3" fill="#84BD00" />
        </svg>
      )
    },
    {
      name: "Luminus",
      category: "Invertors & Battery",
      svg: (
        <svg viewBox="0 0 155 42" width="155" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1.5px" fill="#002D72">LUMINOUS</text>
        </svg>
      )
    },
    {
      name: "Exide",
      category: "Invertors & Battery",
      svg: (
        <svg viewBox="0 0 140 42" width="140" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" letterSpacing="1.5px" fill="#E4002B">EXIDE</text>
        </svg>
      )
    },
    {
      name: "Bhaburly",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 155 42" width="155" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" letterSpacing="1px" fill="#1E293B">BHABURLY</text>
        </svg>
      )
    },
    {
      name: "Amplesta",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 160 42" width="160" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1.5px" fill="#2563EB">AMPLESTA</text>
        </svg>
      )
    },
    {
      name: "CG",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 120 42" width="120" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <rect x="4" y="7" width="30" height="28" rx="5" fill="#00529B" />
          <text x="11" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#FFF">CG</text>
          <text x="40" y="29" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#00529B">Power</text>
        </svg>
      )
    },
    {
      name: "VW",
      category: "TV",
      svg: (
        <svg viewBox="0 0 130 42" width="130" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <rect x="4" y="6" width="32" height="30" rx="4" fill="#0F172A" />
          <text x="8" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#38BDF8">VW</text>
          <text x="42" y="28" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">Vision</text>
        </svg>
      )
    },
    {
      name: "IVAS",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 130 42" width="130" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" letterSpacing="2px" fill="#E65100">IVAS</text>
        </svg>
      )
    },
    {
      name: "Faber",
      category: "Chimney",
      svg: (
        <svg viewBox="0 0 140 42" width="140" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" fontStyle="italic" fill="#E10A17" letterSpacing="1px">FABER</text>
        </svg>
      )
    },
    {
      name: "IKEA",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 135 42" width="135" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <rect x="2" y="7" width="80" height="28" rx="4" fill="#0058A3" />
          <ellipse cx="42" cy="21" rx="38" ry="13" fill="#FFDA1A" />
          <text x="14" y="29" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#0058A3" letterSpacing="2px">IKEA</text>
        </svg>
      )
    },
    {
      name: "Reo",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 130 42" width="130" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" fill="#0284C7" letterSpacing="2px">REO</text>
          <text x="68" y="29" fontFamily="system-ui, sans-serif" fontSize="11" fill="#64748B" fontWeight="700">by Havells</text>
        </svg>
      )
    },
    {
      name: "Activa",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 145 42" width="145" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fontStyle="italic" fill="#DC2626" letterSpacing="1px">ACTIVA</text>
        </svg>
      )
    },
    {
      name: "Summercool",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 175 42" width="175" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <circle cx="16" cy="21" r="10" fill="#0284C7" />
          <text x="32" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#0369A1" letterSpacing="0.5px">SUMMERCOOL</text>
        </svg>
      )
    },
    {
      name: "Thermocool",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 175 42" width="175" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#EA580C" letterSpacing="0.5px">THERMOCOOL</text>
        </svg>
      )
    },
    {
      name: "Power Guard",
      category: "Invertors & Battery",
      svg: (
        <svg viewBox="0 0 185 42" width="185" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <path d="M12 9 L24 21 L12 33 Z" fill="#16A34A" />
          <text x="30" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#15803D" letterSpacing="0.5px">POWER GUARD</text>
        </svg>
      )
    },
    {
      name: "Sujata",
      category: "Home & Kitchen Appliances",
      svg: (
        <svg viewBox="0 0 140 42" width="140" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <text x="4" y="29" fontFamily="Georgia, serif" fontWeight="900" fontSize="25" fill="#B91C1C" letterSpacing="1px">SUJATA</text>
        </svg>
      )
    },
    {
      name: "Orient",
      category: "Seasonal Category",
      svg: (
        <svg viewBox="0 0 145 42" width="145" height="42" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
          <circle cx="14" cy="21" r="10" fill="#E11D48" />
          <text x="30" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#1E293B" letterSpacing="1px">orient</text>
        </svg>
      )
    }
  ];

  // Approved Platform Vector SVGs (Authentic Official Brand Logos, Grand 52px Scale, Perfectly Middle-Aligned)
  const channelSVGs: { name: string; svg: React.ReactNode }[] = [
    {
      name: "Amazon",
      svg: (
        <svg viewBox="0 0 155 44" width="183" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <text x="2" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="30" fill="#131921" letterSpacing="-0.8px">
            amazon
          </text>
          <path
            d="M 6 35 C 40 48, 80 47, 108 35"
            stroke="#FF9900"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="103,29 114,35 105,42 107,35" fill="#FF9900" />
        </svg>
      ),
    },
    {
      name: "Flipkart",
      svg: (
        <img
          src="/flipkart_official.svg"
          alt="Flipkart"
          style={{ height: "60px", width: "auto", display: "block", objectFit: "contain" }}
        />
      ),
    },
    {
      name: "IndiaMART",
      svg: (
        <svg viewBox="0 0 170 44" width="200" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <rect x="2" y="6" width="32" height="32" rx="6" fill="#0A5EB0" />
          <path d="M8 26 L14 14 L20 22 L26 14 L26 26" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="40" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#0A5EB0" letterSpacing="-0.3px">
            indiamart
          </text>
        </svg>
      ),
    },
    {
      name: "Tradeindia",
      svg: (
        <svg viewBox="0 0 170 44" width="200" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <circle cx="18" cy="22" r="15" fill="#E62E2D" />
          <text x="12" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" fill="#FFF">ti</text>
          <text x="40" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="25" fill="#1E293B" letterSpacing="-0.2px">
            tradeindia
          </text>
        </svg>
      ),
    },
    {
      name: "Industrybuying",
      svg: (
        <svg viewBox="0 0 195 44" width="230" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <rect x="2" y="6" width="32" height="32" rx="7" fill="#F36F21" />
          <text x="8" y="29" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" fill="#FFF">IB</text>
          <text x="42" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#231F20" letterSpacing="-0.2px">
            industrybuying
          </text>
        </svg>
      ),
    },
    {
      name: "Meesho",
      svg: (
        <svg viewBox="0 0 145 44" width="171" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <text x="2" y="31" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="31" fill="#F43397" letterSpacing="-0.6px">
            meesho
          </text>
        </svg>
      ),
    },
    {
      name: "Myntra",
      svg: (
        <svg viewBox="0 0 170 44" width="201" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <defs>
            <linearGradient id="myntraG1Real" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF905A" />
              <stop offset="100%" stopColor="#FF3F6C" />
            </linearGradient>
            <linearGradient id="myntraG2Real" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF3F6C" />
              <stop offset="100%" stopColor="#D81B60" />
            </linearGradient>
          </defs>
          <path d="M 3 33 L 13 10 L 21 25 L 30 10 L 40 33" stroke="url(#myntraG1Real)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 13 10 L 21 25 L 30 10" stroke="url(#myntraG2Real)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="50" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="28" fill="#282C3F" letterSpacing="0.2px">
            myntra
          </text>
        </svg>
      ),
    },
    {
      name: "Blinkit",
      svg: (
        <svg viewBox="0 0 165 44" width="195" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <rect x="2" y="6" width="32" height="32" rx="9" fill="#F8CB46" />
          <text x="10" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" fill="#0C831F">
            b
          </text>
          <circle cx="23.5" cy="15.5" r="2.8" fill="#0C831F" />
          <text x="44" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="28" fill="#0C831F" letterSpacing="-0.4px">
            blinkit
          </text>
        </svg>
      ),
    },
    {
      name: "Nykaa",
      svg: (
        <svg viewBox="0 0 140 44" width="165" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <text x="2" y="31" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="31" fill="#FC2779" letterSpacing="1px">
            NYKAA
          </text>
        </svg>
      ),
    },
    {
      name: "JioMart",
      svg: (
        <svg viewBox="0 0 175 44" width="207" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <circle cx="18" cy="22" r="16" fill="#E11900" />
          <text x="8" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF" letterSpacing="-0.2px">
            Jio
          </text>
          <text x="44" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="29" fill="#008ECC" letterSpacing="-0.3px">
            Mart
          </text>
          <path d="M 45 36 C 68 33, 89 37, 112 35" stroke="#008ECC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      name: "Zepto",
      svg: (
        <svg viewBox="0 0 130 44" width="154" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <text x="2" y="31" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="31" letterSpacing="-0.5px">
            <tspan fill="#3E0067">z</tspan>
            <tspan fill="#FF3269">epto</tspan>
          </text>
        </svg>
      ),
    },
    {
      name: "Moglix",
      svg: (
        <svg viewBox="0 0 165 44" width="195" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <rect x="2" y="6" width="32" height="32" rx="7" fill="#E02A26" />
          <path d="M 8 28 V 13 L 18 22 L 28 13 V 28" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="44" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="27" fill="#1E293B" letterSpacing="-0.3px">
            moglix
          </text>
        </svg>
      ),
    },
    {
      name: "Shopify",
      svg: (
        <svg viewBox="0 0 170 44" width="201" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <path d="M 17 6 L 5 15 L 11 38 L 33 38 L 39 15 Z" fill="#95BF47" />
          <path d="M 17 6 C 17 6, 21 2.5, 24.5 3.5 C 29 5.5, 28 10, 28 10" stroke="#5E8E3E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <text x="12" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF">
            S
          </text>
          <text x="46" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="27" fill="#212326" letterSpacing="-0.4px">
            shopify
          </text>
        </svg>
      ),
    },
    {
      name: "AJIO",
      svg: (
        <svg viewBox="0 0 135 44" width="160" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <text x="2" y="31" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="30" fill="#1E293B" letterSpacing="2.2px">
            AJIO
          </text>
          <circle cx="74" cy="11" r="3.6" fill="#00A8B5" />
        </svg>
      ),
    },
    {
      name: "Snapmint",
      svg: (
        <svg viewBox="0 0 175 44" width="207" height="52" style={{ height: "52px", width: "auto" }} fill="none">
          <circle cx="17" cy="22" r="16" fill="#00C29F" />
          <text x="10" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF">
            S
          </text>
          <text x="42" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="26" fill="#00C29F" letterSpacing="-0.2px">
            snapmint
          </text>
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
    <div style={{
      background: "radial-gradient(130% 90% at 50% 0%, #E0F2FE 0%, #F0F7FF 25%, #F8FAFC 55%, #EDF5FF 80%, #E2F1FE 100%)",
      color: "#0F172A",
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden"
    }}>

      {/* ── SECTION 1: HEADER (Sticky navigation + CTA always visible) ── */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── SECTION 2: LUXURY WHITE & LIGHT GLASS HERO (CUSTOM OPERATING PARTNER UI/UX) ── */}
      <section id="hero-home" className="hero-section">

        {/* Smooth Floating Light Blue Aurora Glow Orbs */}
        <div className="hero-aurora-orb-1" />
        <div className="hero-aurora-orb-2" />
        <div className="hero-aurora-orb-3" />

        <div className="hero-container">
          <div className="hero-main-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="hero-left-col">
              {/* Luminous Trust Eyebrow */}
              <div className="hero-eyebrow-pill">
                <span className="hero-eyebrow-dot" />
                <span className="hero-eyebrow-text">India&apos;s Leading Ecommerce Operating Partner</span>
                <span className="hero-eyebrow-badge">SPN Verified</span>
              </div>

              {/* Bold High-Impact Headline */}
              <h1 className="hero-headline">
                Scale Your Brand Across <br className="hero-desktop-br" />
                <span className="hero-headline-highlight">
                  <span className="hero-grad-text">Marketplaces &amp; Quick Commerce</span>
                  <svg className="hero-headline-underline" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 8 C80 2, 220 2, 298 8" stroke="url(#hero-blue-grad)" strokeWidth="3.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="hero-blue-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38BDF8" />
                        <stop offset="0.5" stopColor="#2563EB" />
                        <stop offset="1" stopColor="#60A5FA" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Subheadline Value Proposition */}
              <p className="hero-subheadline">
                End-to-end execution across Amazon, Flipkart, Blinkit, Zepto, and D2C — powered by 12-state warehousing, ad growth, and automated revenue recovery.
              </p>

              {/* Two Direct Hero Actions: Book Diagnostic or Explore Solutions */}
              <div className="hero-cta-btns">
                <button
                  onClick={() => setDiagOpen(true)}
                  className="hero-btn-primary"
                >
                  <span>Request Diagnostic →</span>
                </button>
                <a
                  href="#where-is-your-business"
                  className="hero-btn-secondary"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                  <span>Explore Solutions ↓</span>
                </a>
              </div>

              {/* High-Impact 3-Stats Glass Dock */}
              <div className="hero-stats-dock">
                <div className="hero-stat-card">
                  <div className="hero-stat-num">500+</div>
                  <div className="hero-stat-lbl">BRANDS MANAGED</div>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-card">
                  <div className="hero-stat-num">₹850Cr+</div>
                  <div className="hero-stat-lbl">GMV DELIVERED</div>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-card">
                  <div className="hero-stat-num hero-stat-text">Verified</div>
                  <div className="hero-stat-lbl">SPN STATUS</div>
                </div>
              </div>

              {/* Explore Links Strip */}
              <div className="hero-explore-strip">
                <span className="hero-explore-title">EXPLORE:</span>
                <div className="hero-explore-pills">
                  {["Marketplace Operations", "E-commerce Enabler", "12-State Warehousing", "Quick Commerce", "Revenue Audit"].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setDiagOpen(true)}
                      className="hero-explore-pill"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: FROSTED LIQUID GLASS AUDIT CARD ── */}
            <div className="hero-right-col">
              <div className="hero-audit-card">
                <div className="hero-audit-eyebrow">
                  <span className="hero-audit-eyebrow-star">✦</span>
                  <span className="hero-audit-eyebrow-text">
                    COMPLIMENTARY COMMERCE DIAGNOSTIC
                  </span>
                </div>

                <h3 className="hero-audit-title">
                  Get Your Growth Diagnostic
                </h3>
                <p className="hero-audit-subtitle">
                  Confidential multi-channel diagnostic delivered within 24 hours.
                </p>

                <div className="hero-audit-fields">
                  <div className="hero-audit-group">
                    <label className="hero-audit-label">
                      Full name
                    </label>
                    <div className="hero-audit-input-wrap">
                      <span className="hero-audit-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </span>
                      <input
                        type="text"
                        value={auditName}
                        onChange={(e) => setAuditName(e.target.value)}
                        placeholder="Enter your full name"
                        className="hero-audit-input"
                      />
                    </div>
                  </div>

                  <div className="hero-audit-group">
                    <label className="hero-audit-label">
                      Phone / WhatsApp number
                    </label>
                    <div className="hero-audit-input-wrap">
                      <span className="hero-audit-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      </span>
                      <input
                        type="text"
                        value={auditPhone}
                        onChange={(e) => setAuditPhone(e.target.value)}
                        placeholder="Enter your phone / WhatsApp number"
                        className="hero-audit-input"
                      />
                    </div>
                  </div>

                  <div className="hero-audit-group">
                    <label className="hero-audit-label">
                      Work email
                    </label>
                    <div className="hero-audit-input-wrap">
                      <span className="hero-audit-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      </span>
                      <input
                        type="email"
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        placeholder="Enter your work email address"
                        className="hero-audit-input"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setDiagOpen(true)}
                    className="hero-audit-submit"
                  >
                    Request Diagnostic →
                  </button>

                  <div className="hero-audit-trust">
                    <span className="hero-audit-trust-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8"><polyline points="20 6 9 17 4 12" /></svg>
                      Audit report
                    </span>
                    <span className="hero-audit-trust-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8"><polyline points="20 6 9 17 4 12" /></svg>
                      No commitment
                    </span>
                    <span className="hero-audit-trust-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8"><polyline points="20 6 9 17 4 12" /></svg>
                      2hr response
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── OPERATING ACROSS LEADING PLATFORMS (HERO MARQUEE TICKER) ── */}
        <div className="hero-ticker-wrap">
          <p className="hero-ticker-title">
            Operating Across India&apos;s Leading Marketplaces &amp; Quick Commerce Platforms
          </p>
          <div className="channel-strip" style={{ margin: 0, padding: 0 }}>
            <div className="channel-marquee-container" style={{ margin: 0, padding: "0.3rem 0", maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)" }}>
              <div className="channel-marquee-track" style={{ alignItems: "center" }}>
                {[...channelSVGs, ...channelSVGs].map((ch, idx) => (
                  <div
                    key={idx}
                    title={ch.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 2.2rem",
                      cursor: "default",
                      transition: "all 0.25s ease",
                      opacity: 0.92,
                      minHeight: "48px"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {ch.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHERE IS YOUR BUSINESS TODAY? (Three Operating Paths Moved Up) ── */}
      <section className="paths-section scroll-blur-reveal" id="where-is-your-business" style={{
        padding: "5rem 1.5rem 5.5rem",
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1.5px solid rgba(191, 219, 254, 0.45)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Soft Ambient Aurora Orb */}
        <div className="ambient-glow-orb-left" style={{ opacity: 0.6 }} />
        <div className="ambient-glow-orb-right" style={{ opacity: 0.5 }} />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "0.26rem 0.95rem",
              borderRadius: "99px",
              background: "rgba(239, 246, 255, 0.9)",
              border: "1px solid rgba(191, 219, 254, 0.8)",
              color: "#2563EB",
              fontSize: "0.76rem",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
              Section 2 • Tailored Operating Paths
            </span>
            <h2 style={{ fontSize: "clamp(1.95rem, 3vw, 2.6rem)", fontWeight: 800, color: "#0B1736", letterSpacing: "-0.6px", lineHeight: 1.2, margin: "0 0 0.7rem" }}>
              Where Is Your Business Today?
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#475569", maxWidth: "680px", margin: "0 auto", lineHeight: 1.65 }}>
              Choose Launch Online, Fix &amp; Grow, or Scale Pan-India as your primary operating entry route. Each has a dedicated execution mandate.
            </p>
          </div>
          <div className="paths-grid">
            {[
              { tag: "01. Launch Online", tagColor: "#2563EB", title: "Offline Brand / Manufacturer", desc: "Entering ecommerce for the first time across Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Blinkit and other approved platforms, plus D2C.", cta: "Explore Launch Mandate →", href: "/solutions/launch-online" },
              { tag: "02. Fix & Grow", tagColor: "#0D9488", title: "Active Marketplace Brand", desc: "Stuck with stagnant GMV, rising ACOS, un-audited settlement losses, or high customer returns. We audit, fix, and grow.", cta: "Explore Fix & Grow Audit →", href: "/solutions/fix-and-grow" },
              { tag: "03. Scale Pan-India", tagColor: "#7C3AED", title: "Established Enterprise Brand", desc: "Scaling 12-state warehouse inventory, regional dealer fulfilment, B2B/institutional channels, and multi-platform D2C sync.", cta: "Explore Pan-India Scale →", href: "/solutions/scale-pan-india" },
            ].map((card, idx) => (
              <div key={idx} className="path-card luxury-blue-glass scroll-blur-reveal" style={{ transitionDelay: `${idx * 0.12}s`, borderRadius: "20px" }}>
                <div className="path-card-tag" style={{ color: card.tagColor }}>{card.tag}</div>
                <h3 className="path-card-title">{card.title}</h3>
                <p className="path-card-desc">{card.desc}</p>
                <Link href={card.href} className="path-card-cta" style={{ color: card.tagColor }}>{card.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MARKETPLACE LEAKAGE CALCULATOR (Self-Serve Revenue Assurance) [HIDDEN] ── */}
      {/* <MarketplaceLeakageCalculator onOpenDiag={() => setDiagOpen(true)} /> */}

      {/* ── SECTION 4: EVERYTHING WE DO (Visual Service Matrix) ── */}
      <ServiceMatrix onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 5: PROOF — NAMED CLIENT CASE STUDIES ── */}
      <ProofCaseStudies onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 5.5: BRANDS WE OPERATE & SCALE ACROSS MARKETPLACES & D2C ── */}
      <section className="scroll-blur-reveal" id="brands-we-operate" style={{
        padding: "4.5rem 1.5rem 4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)",
        borderTop: "1.5px solid rgba(226, 232, 240, 0.85)",
        borderBottom: "1.5px solid rgba(226, 232, 240, 0.85)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Soft Ambient Aurora Orb */}
        <div className="ambient-glow-orb-left" style={{ opacity: 0.35 }} />
        <div className="ambient-glow-orb-right" style={{ opacity: 0.35 }} />

        <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "0.26rem 0.95rem",
              borderRadius: "99px",
              background: "rgba(239, 246, 255, 0.9)",
              border: "1px solid rgba(191, 219, 254, 0.8)",
              color: "#2563EB",
              fontSize: "0.76rem",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
              boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
              Section 5.5 • Verified Client Footprint
            </span>
            <h2 style={{
              fontSize: "clamp(1.95rem, 3vw, 2.6rem)",
              fontWeight: 800,
              color: "#0B1736",
              letterSpacing: "-0.6px",
              lineHeight: 1.2,
              margin: "0 0 0.7rem"
            }}>
              Brands We Operate &amp; Scale Across Marketplaces &amp; D2C
            </h2>
            <p style={{
              fontSize: "0.98rem",
              color: "#475569",
              maxWidth: "740px",
              margin: "0 auto",
              lineHeight: 1.65
            }}>
              Direct operational management across Amazon, Flipkart, Blinkit, Zepto, and Quick Commerce for India&apos;s leading consumer enterprises and high-growth challenger brands.
            </p>
          </div>

          {/* Marquee Strip Container */}
          <div className="channel-strip" style={{ margin: 0, padding: 0 }}>
            <div className="channel-marquee-container" style={{
              margin: 0,
              padding: "0.8rem 0",
              maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)"
            }}>
              <div className="channel-marquee-track" style={{ alignItems: "center", gap: "2rem" }}>
                {[...portfolioLogos, ...portfolioLogos].map((brand, idx) => (
                  <div
                    key={idx}
                    title={`${brand.name} • ${brand.category}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.9rem 2.2rem",
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "1.5px solid rgba(226, 232, 240, 0.9)",
                      boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
                      cursor: "default",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: 0.95,
                      minHeight: "58px",
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.06)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 99, 235, 0.12)";
                      e.currentTarget.style.borderColor = "#93C5FD";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.95";
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 10px rgba(15, 23, 42, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.9)";
                    }}
                  >
                    {brand.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PHYSICAL 12-STATE INFRASTRUCTURE & HUB MAP ── */}
      <WarehouseHubs />

      {/* ── SECTION 7: THIRD-PARTY VALIDATION & GOVERNANCE ── */}
      <ThirdPartyValidation onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 8: HOW WE WORK TOGETHER (Transparent Commercial Models) ── */}
      <CommercialModels onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 9: NEXT STEPS & LOOKING FOR SOMETHING ELSE? ── */}
      <CustomSolutionForm onOpenDiag={() => setDiagOpen(true)} />

      {/* ── FOOTER ── */}
      <Footer />

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
