"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ServiceNode {
  id: string;
  num: string;
  name: string;
  shortLabel: string;
  tagline: string;
  categoryTag: string;
  deliverables: string[];
  href: string;
}

const serviceNodes: ServiceNode[] = [
  {
    id: "mkt-ops",
    num: "01",
    name: "Marketplace Operations",
    shortLabel: "Marketplace Ops",
    tagline: "Run & optimise every day",
    categoryTag: "Platform Ops",
    deliverables: [
      "Full catalogue management & listing creation",
      "Daily listing health & stockout monitoring",
      "Buybox pricing & platform SLA compliance"
    ],
    href: "/capabilities/marketplace-operations"
  },
  {
    id: "mkt-growth",
    num: "02",
    name: "Marketplace Growth & Ads",
    shortLabel: "Ads & Growth",
    tagline: "Turn spend into sales",
    categoryTag: "Performance Ads",
    deliverables: [
      "Amazon PPC, Sponsored & Display campaigns",
      "Flipkart PLA & Myntra ad optimizations",
      "ACOS & ROAS target margin control"
    ],
    href: "/capabilities/marketplace-growth"
  },
  {
    id: "multi-platform",
    num: "03",
    name: "Multi-Platform Commerce",
    shortLabel: "Multi-Platform",
    tagline: "Sell everywhere, seamlessly",
    categoryTag: "Channel Expansion",
    deliverables: [
      "Catalog sync on Amazon, Flipkart, Myntra, JioMart & Snapmint",
      "Automated cross-platform stock allocation",
      "Channel margin guardrails & price parity"
    ],
    href: "/multi-platform-commerce"
  },
  {
    id: "d2c-ops",
    num: "04",
    name: "D2C Commerce",
    shortLabel: "D2C Storefront",
    tagline: "Own the customer journey",
    categoryTag: "Direct Store",
    deliverables: [
      "Shopify & Custom storefront technical ops",
      "Integrated payment gateways & COD verification",
      "Sub-4-hour dispatch from nearest regional hub"
    ],
    href: "/d2c-commerce-operations"
  },
  {
    id: "b2b-inst",
    num: "05",
    name: "B2B & Institutional",
    shortLabel: "B2B & Enterprise",
    tagline: "Win larger orders",
    categoryTag: "Corporate Sales",
    deliverables: [
      "Moglix, IndiaMART & B2B portal operations",
      "Bulk PO processing & corporate credit terms",
      "Pan-India institutional dealer fulfillment"
    ],
    href: "/b2b-institutional-commerce"
  },
  {
    id: "inv-plan",
    num: "06",
    name: "Inventory Planning",
    shortLabel: "Inventory Planning",
    tagline: "Right stock, right channel",
    categoryTag: "Supply Chain",
    deliverables: [
      "12-State WMS regional stock placement",
      "Demand forecasting & buffer stock alerts",
      "Deadstock & slow-moving SKU analytics"
    ],
    href: "/capabilities/inventory-planning"
  },
  {
    id: "fulfilment",
    num: "07",
    name: "Fulfilment & Warehousing",
    shortLabel: "12-State Warehousing",
    tagline: "Pan-India delivery infrastructure",
    categoryTag: "Logistics Infra",
    deliverables: [
      "12 Managed state warehousing hubs",
      "FBA & FA regional consignment processing",
      "Same-day & Next-day order SLAs"
    ],
    href: "/capabilities/warehousing-fulfilment"
  },
  {
    id: "rev-assurance",
    num: "08",
    name: "Revenue Assurance",
    shortLabel: "Revenue Audit",
    tagline: "Recover every rupee",
    categoryTag: "Audit & Claims",
    deliverables: [
      "Daily settlement audit & fee dispute claims",
      "Overcharged shipping & weight audit recovery",
      "COD reconciliation & missing payout tracking"
    ],
    href: "/capabilities/revenue-assurance"
  },
  {
    id: "returns-mgmt",
    num: "09",
    name: "Returns Management",
    shortLabel: "Returns QC",
    tagline: "Reduce RTO & leakage",
    categoryTag: "Reverse Logistics",
    deliverables: [
      "Pan-India reverse logistics & customer verification",
      "In-warehouse QC & restocking classification",
      "Automated platform SAFE-T claim filing"
    ],
    href: "/capabilities/returns-operations"
  },
  {
    id: "payment-recon",
    num: "10",
    name: "Payment Reconciliation",
    shortLabel: "Payment Reconciliation",
    tagline: "Daily settlement audit & fee recovery",
    categoryTag: "Audit & Claims",
    deliverables: [
      "Multi-platform automated payment & fee reconciliation",
      "Discrepancy dispute logging & clawback recovery",
      "TCS, TDS, GST & bank settlement reporting"
    ],
    href: "/capabilities/revenue-assurance"
  }
];

export default function CommerceNetwork() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeNode = serviceNodes[activeIdx];

  const center = { x: 360, y: 300 };
  const radius = 215;

  return (
    <section className="commerce-network-section" id="commerce-network" style={{
      position: "relative",
      width: "100%",
      padding: "6rem 0",
      background: "#F7F9FC",
      borderTop: "1px solid #E2E8F0",
      borderBottom: "1px solid #E2E8F0",
      overflow: "hidden"
    }}>
      {/* Background Subtle Noise & Grid Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.02,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        pointerEvents: "none"
      }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35, pointerEvents: "none" }}>
        <defs>
          <pattern id="light-network-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#light-network-grid-pattern)" />
      </svg>
      
      {/* Subtle Blue Radial Glow */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1000px",
        height: "1000px",
        background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Standard Box Container */}
      <div className="container" style={{
        position: "relative",
        zIndex: 2
      }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            padding: "0.4rem 1.2rem",
            borderRadius: "99px",
            background: "#EFF6FF",
            border: "1.5px solid #BFDBFE",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: "#1D4ED8",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            marginBottom: "1.1rem",
            boxShadow: "0 4px 12px rgba(37,99,235,0.08)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", boxShadow: "0 0 8px rgba(37,99,235,0.6)" }}>
              <span className="pulse-dot" style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: "#60A5FA" }} />
            </span>
            Connected Commerce Operating Model
          </div>

          <h2 style={{
            fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            margin: "0 0 1rem",
            fontFamily: "var(--font-display)"
          }}>
            Everything Commerce. <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One Partner.</span>
          </h2>

          <p style={{
            fontSize: "1.15rem",
            color: "#475569",
            maxWidth: "750px",
            margin: "0 auto",
            lineHeight: 1.68,
            fontWeight: 500
          }}>
            Good Life connects your entire ecommerce operation — from marketplaces and D2C to B2B, fulfilment and revenue assurance.
          </p>
        </div>

        {/* ── LIGHT WHITE NETWORK CONSOLE CONTAINER ── */}
        <div className="network-console-container" style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(24px)",
          borderRadius: "32px",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
          position: "relative",
          overflow: "hidden"
        }}>
          
          {/* Directional Axis Labels (Desktop Only) */}
          <div className="network-axis-labels">
            <div className="desktop-only-axis" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2.5px", color: "#64748B", textTransform: "uppercase" }}>
              ▲ MARKETPLACE
            </div>
            <div className="desktop-only-axis" style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2.5px", color: "#64748B", textTransform: "uppercase" }}>
              ▼ FULFILMENT &amp; REVENUE
            </div>
            <div className="desktop-only-axis" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2.5px", color: "#64748B", textTransform: "uppercase" }}>
              ◀ D2C COMMERCE
            </div>
            <div className="desktop-only-axis" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2.5px", color: "#64748B", textTransform: "uppercase" }}>
              ▶ B2B &amp; INSTITUTIONAL
            </div>
          </div>

          <div className="network-split-layout" style={{
            display: "grid",
            gap: "1.75rem",
            alignItems: "center"
          }}>
            
            {/* ── LEFT: SVG LIGHT NETWORK DIAGRAM (Desktop) ── */}
            <div style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center", justifyContent: "center" }} className="network-svg-viewport">
              <svg viewBox="0 0 720 600" width="100%" height="100%" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="light-ray-active" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="active-node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="center-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EFF6FF" />
                    <stop offset="100%" stopColor="#DBEAFE" />
                  </linearGradient>
                  <filter id="light-shadow">
                    <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#2563EB" floodOpacity="0.22" />
                  </filter>
                  <filter id="node-active-shadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#2563EB" floodOpacity="0.38" />
                  </filter>
                  <filter id="node-card-shadow">
                    <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.06" />
                  </filter>
                  <filter id="blue-glow">
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#60A5FA" floodOpacity="0.9" />
                  </filter>
                </defs>

                {/* Concentric Dashed Orbit Rings */}
                <circle cx={center.x} cy={center.y} r={radius} fill="none" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="6 6" />
                <circle cx={center.x} cy={center.y} r={radius * 0.55} fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                {/* Connecting Line Rays & Moving Particles */}
                {serviceNodes.map((_, idx) => {
                  const angle = (idx * 360) / serviceNodes.length - 90;
                  const rad = (angle * Math.PI) / 180;
                  const nx = center.x + radius * Math.cos(rad);
                  const ny = center.y + radius * Math.sin(rad);
                  const isActive = idx === activeIdx;

                  return (
                    <g key={idx}>
                      <line
                        x1={center.x}
                        y1={center.y}
                        x2={nx}
                        y2={ny}
                        stroke={isActive ? "url(#light-ray-active)" : "#E2E8F0"}
                        strokeWidth={isActive ? "2.8" : "1.2"}
                        style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                      />
                      {isActive && (
                        <circle cx={center.x} cy={center.y} r="3.5" fill="#60A5FA" filter="url(#blue-glow)">
                          <animate attributeName="cx" values={`${center.x};${nx}`} dur="1.2s" repeatCount="indefinite" />
                          <animate attributeName="cy" values={`${center.y};${ny}`} dur="1.2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* ── CENTER CORE NODE: GOOD LIFE ── */}
                <g filter="url(#light-shadow)" className="center-node-group" style={{ transformOrigin: `${center.x}px ${center.y}px` }}>
                  {/* Subtle Pulse Core Background */}
                  <circle cx={center.x} cy={center.y} r="58" fill="url(#center-core-gradient)" stroke="#BFDBFE" strokeWidth="2">
                    <animate attributeName="r" values="56;60;56" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={center.x} cy={center.y} r="48" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
                  
                  {/* Rotating Outer Ring */}
                  <circle className="rotating-ring" cx={center.x} cy={center.y} r="66" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="6 10" style={{ transformOrigin: `${center.x}px ${center.y}px` }} />
                  
                  {/* Center Pulse Dot */}
                  <circle cx={center.x} cy={center.y - 17} r="3.5" fill="#2563EB">
                    <animate attributeName="r" values="2.5;4.5;2.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={center.x} y={center.y + 3} textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#0F172A" fontFamily="var(--font-display), system-ui, sans-serif" letterSpacing="1.2">
                    GOOD LIFE
                  </text>
                  <text x={center.x} y={center.y + 17} textAnchor="middle" fontSize="8" fontWeight="800" fill="#2563EB" letterSpacing="1.8" style={{ textTransform: "uppercase" }}>
                    OPERATING ENGINE
                  </text>
                </g>

                {/* ── 10 SERVICE NODE CARDS (Modern 4-Corner Rounded Cards with Numbers) ── */}
                {serviceNodes.map((node, idx) => {
                  const angle = (idx * 360) / serviceNodes.length - 90;
                  const rad = (angle * Math.PI) / 180;
                  const nx = center.x + radius * Math.cos(rad);
                  const ny = center.y + radius * Math.sin(rad);
                  const isActive = idx === activeIdx;

                  const cardW = 186;
                  const cardH = 44;
                  const cardRx = 10; // Modern 4-corner rounded box

                  return (
                    <g
                      key={node.id}
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`svg-node ${isActive ? 'active' : ''}`}
                      style={{ cursor: "pointer", transformOrigin: `${nx}px ${ny}px` }}
                    >
                      {/* Node Box Rectangle */}
                      <rect
                        x={nx - cardW / 2}
                        y={ny - cardH / 2}
                        width={cardW}
                        height={cardH}
                        rx={cardRx}
                        className="node-bg"
                        fill={isActive ? "url(#active-node-gradient)" : "#FFFFFF"}
                        stroke={isActive ? "#1D4ED8" : "#E2E8F0"}
                        strokeWidth={isActive ? "2" : "1.2"}
                        filter={isActive ? "url(#node-active-shadow)" : "url(#node-card-shadow)"}
                      />

                      {/* Left Number Tag Badge */}
                      <rect
                        x={nx - cardW / 2 + 8}
                        y={ny - 11}
                        width="22"
                        height="22"
                        rx="5"
                        fill={isActive ? "rgba(255, 255, 255, 0.22)" : "#F1F5F9"}
                      />
                      <text
                        x={nx - cardW / 2 + 19}
                        y={ny + 3.5}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="900"
                        fontFamily="monospace, system-ui, sans-serif"
                        fill={isActive ? "#FFFFFF" : "#64748B"}
                      >
                        {node.num}
                      </text>

                      {/* Main Node Label */}
                      <text
                        x={nx - cardW / 2 + 36}
                        y={ny + 4}
                        textAnchor="start"
                        fontSize="11.5"
                        fontWeight="800"
                        className="node-text"
                        fill={isActive ? "#FFFFFF" : "#0F172A"}
                        fontFamily="var(--font-display), system-ui, -apple-system, sans-serif"
                        letterSpacing="-0.2px"
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>


            <div style={{ display: "flex", flexDirection: "column" }} className="active-node-card-wrapper">
              <div className="active-node-card" style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1.5px solid #E2E8F0",
                padding: "1.85rem 1.75rem",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.02)",
                position: "relative",
                overflow: "hidden",
                minHeight: "470px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                {/* Micro-Animation Wrapper */}
                <div key={activeNode.id} className="fade-slide-up" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                  
                  <div>
                    {/* Active Indicator Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 0 3px rgba(16,185,129,0.2)" }} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#059669" }}>
                          Operating Mandate Active
                        </span>
                      </div>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "0.22rem 0.65rem", borderRadius: "6px", border: "1px solid #BFDBFE" }}>
                        {activeNode.categoryTag}
                      </span>
                    </div>

                    {/* Node Title & Tagline */}
                    <h3 className="active-node-title" style={{ fontSize: "1.42rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.35rem", fontFamily: "var(--font-display)", letterSpacing: "-0.4px", lineHeight: 1.25 }}>
                      {activeNode.name}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "#2563EB", fontWeight: 600, margin: "0 0 1.3rem", lineHeight: 1.4 }}>
                      {activeNode.tagline}
                    </p>

                    {/* Deliverables Checklist */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#64748B", marginBottom: "0.75rem" }}>
                        Key Execution Deliverables
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        {activeNode.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.65rem",
                            background: "#F8FAFC",
                            border: "1px solid #F1F5F9",
                            padding: "0.55rem 0.75rem",
                            borderRadius: "10px"
                          }}>
                            <span style={{ width: 18, height: 18, borderRadius: "5px", background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900, flexShrink: 0, marginTop: "1px" }}>
                              ✓
                            </span>
                            <span style={{ fontSize: "0.86rem", color: "#334155", fontWeight: 600, lineHeight: 1.4 }}>
                              {deliv}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Explore CTA Button */}
                  <Link
                    href={activeNode.href}
                    className="btn-primary-hero"
                    style={{
                      width: "100%",
                      height: "46px",
                      borderRadius: "11px",
                      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: "0.4rem",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(37, 99, 235, 0.25)",
                      transition: "all 0.2s ease",
                      marginTop: "auto"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 22px rgba(37, 99, 235, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 99, 235, 0.25)";
                    }}
                  >
                    Explore {activeNode.shortLabel} Mandate →
                  </Link>

                </div>
              </div>

              {/* Desktop Quick Select Node Bar removed for cleaner look */}
            </div>

          </div>

        </div>

      </div>

      {/* Responsive & Animation Styles */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-slide-up {
          animation: fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotating-ring {
          animation: spinSlow 24s linear infinite;
        }

        .pulse-dot {
          animation: pulseOpacity 2s infinite;
        }
        @keyframes pulseOpacity {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* SVG Node Hover FX */
        .svg-node {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .svg-node:hover:not(.active) {
          transform: scale(1.04);
        }
        .svg-node:hover:not(.active) .node-bg {
          stroke: #93C5FD;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .network-split-layout {
          grid-template-columns: 1fr 420px;
        }
        .network-console-container {
          padding: 2.5rem 2rem;
        }

        @media (max-width: 992px) {
          .network-console-container {
            padding: 1.5rem 0.5rem;
          }
          .desktop-only-axis {
            display: none !important;
          }
          .network-split-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .network-svg-viewport {
            min-height: 350px !important;
            display: flex !important;
          }
          .svg-node {
            transform: scale(1) !important;
          }
          .svg-node:hover:not(.active) {
            transform: scale(1) !important;
          }
          .center-node-group {
            transform: scale(1) !important;
          }
          .rotating-ring {
            animation: none !important;
          }
          .active-node-card-wrapper {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
            margin-bottom: -1.5rem;
          }
          .active-node-card {
            border-radius: 0 0 32px 32px !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
            padding: 1.5rem 1rem 1.8rem 1rem !important;
            box-shadow: none !important;
            background: rgba(255, 255, 255, 0.9) !important;
          }
          .active-node-title {
            font-size: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  );
}
