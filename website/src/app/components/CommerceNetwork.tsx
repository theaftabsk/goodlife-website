"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

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
    shortLabel: "Marketplace Operations",
    tagline: "Run & optimise every day across platforms",
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
    tagline: "Turn performance advertising spend into profitable sales",
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
    tagline: "Sell everywhere seamlessly across 12+ leading marketplaces",
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
    tagline: "Own the customer journey and direct sales channels",
    categoryTag: "Direct Store",
    deliverables: [
      "Shopify & custom storefront technical ops",
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
    tagline: "Win larger enterprise and bulk institutional orders",
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
    tagline: "Right stock, right channel, optimized working capital",
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
    tagline: "Pan-India delivery infrastructure with regional nodes",
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
    shortLabel: "Revenue Assurance",
    tagline: "Recover every rupee from fees, weight disputes and claims",
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
    shortLabel: "Returns Quality Control",
    tagline: "Reduce RTO, recover inventory value and prevent leakage",
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
    tagline: "Automated multi-channel financial recon & discrepancy dispute",
    categoryTag: "Finance Audit",
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isHubHovered, setIsHubHovered] = useState<boolean>(false);
  const activeNode = serviceNodes[activeIdx];
  const svgRef = useRef<SVGSVGElement>(null);

  // ── Generous Geometry: Large prominent node buttons with bold typography ──
  const center = { x: 530, y: 380 };
  const hubRadius = 78; // 156px diameter central engine
  const radiusX = 380;
  const radiusY = 260;
  const cardW = 295;
  const cardH = 66;
  const cardRx = 18;

  // Optimized angles ensuring generous clearance between all 10 large buttons
  const nodeAngles = [
    -90, -42, -14, 14, 42, 90, 138, 166, 194, 222
  ];

  const roundCoord = (val: number) => Math.round(val * 100) / 100;

  const getInitialPositions = () =>
    nodeAngles.map((angleDeg) => {
      const rad = (angleDeg * Math.PI) / 180;
      return {
        x: roundCoord(center.x + radiusX * Math.cos(rad)),
        y: roundCoord(center.y + radiusY * Math.sin(rad))
      };
    });

  const [positions, setPositions] = useState(getInitialPositions);
  const dragState = useRef<{ dragging: boolean; idx: number; offsetX: number; offsetY: number }>({
    dragging: false, idx: -1, offsetX: 0, offsetY: 0
  });

  const getSVGPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const handleDragStart = (idx: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const svgPt = getSVGPoint(clientX, clientY);
    dragState.current = {
      dragging: true,
      idx,
      offsetX: svgPt.x - positions[idx].x,
      offsetY: svgPt.y - positions[idx].y
    };
    setActiveIdx(idx);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const svgPt = getSVGPoint(clientX, clientY);
    const { idx, offsetX, offsetY } = dragState.current;
    setPositions(prev => {
      const next = [...prev];
      next[idx] = {
        x: roundCoord(svgPt.x - offsetX),
        y: roundCoord(svgPt.y - offsetY)
      };
      return next;
    });
  };

  const handleDragEnd = () => {
    dragState.current.dragging = false;
  };

  return (
    <section className={`commerce-network-section ${inter.className}`} id="commerce-network" style={{
      position: "relative",
      width: "100%",
      padding: "5rem 0 5.5rem",
      background: "#F8FAFC",
      borderTop: "1px solid #E2E8F0",
      borderBottom: "1px solid #E2E8F0",
      overflow: "hidden"
    }}>
      {/* Precision Grid Overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25, pointerEvents: "none" }}>
        <defs>
          <pattern id="network-precision-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray="2 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-precision-grid)" />
      </svg>
      
      {/* Ambient Radial Sky Glow */}
      <div style={{
        position: "absolute",
        top: "15%",
        left: "45%",
        transform: "translate(-50%, -50%)",
        width: "1200px",
        height: "1200px",
        background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div className="container" style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 1.25rem"
      }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            padding: "0.45rem 1.25rem",
            borderRadius: "999px",
            background: "#EFF6FF",
            border: "1.5px solid #BFDBFE",
            fontSize: "0.82rem",
            fontWeight: 800,
            color: "#1D4ED8",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            marginBottom: "0.9rem",
            boxShadow: "0 4px 14px rgba(37,99,235,0.08)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", display: "inline-block", position: "relative" }}>
              <span className="pulse-dot" style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: "#60A5FA", animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
            </span>
            UNLOCK YOUR GROWTH
          </div>

          <h2 style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
            fontWeight: 800,
            color: "#0B1736",
            lineHeight: 1.18,
            letterSpacing: "-1.5px",
            margin: "0 0 0.85rem",
            fontFamily: "var(--font-inter), 'Inter', sans-serif"
          }}>
            We don&apos;t just advise businesses. <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We build, operate and scale them.</span>
          </h2>

          <p style={{
            fontSize: "1.02rem",
            color: "#475569",
            maxWidth: "960px",
            margin: "0 auto",
            lineHeight: 1.7,
            fontWeight: 500
          }}>
            We provide marketplace launch <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> catalogue <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> pricing <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> advertising <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> inventory planning <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> warehousing <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> fulfilment <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> returns <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> reconciliation <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> claims/recovery <span style={{ color: "#2563EB", fontWeight: 700 }}>→</span> analytics.
          </p>
        </div>

        {/* ── INTERACTIVE MOBILE PILLS ── */}
        <div className="mobile-nodes-bar" style={{ display: "none", marginBottom: "1.25rem" }}>
          <div style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            padding: "0.3rem 0.2rem 0.6rem",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none"
          }}>
            {serviceNodes.map((node, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    flexShrink: 0,
                    padding: "0.5rem 0.9rem",
                    borderRadius: "12px",
                    background: isSelected ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#1E293B",
                    border: isSelected ? "1.5px solid #1D4ED8" : "1.5px solid #E2E8F0",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    boxShadow: isSelected ? "0 4px 12px rgba(37,99,235,0.25)" : "none"
                  }}
                >
                  <span style={{ fontSize: "0.72rem", opacity: isSelected ? 0.9 : 0.6, fontWeight: 800 }}>
                    {node.num}
                  </span>
                  <span>{node.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── LIGHT WHITE GLASS CONSOLE CONTAINER ── */}
        <div className="network-console-container" style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "hidden"
        }}>
          
          <div className="network-split-layout" style={{
            display: "grid",
            gap: "2rem",
            alignItems: "center"
          }}>
            
            {/* ── LEFT: GRAND OPERATING ENGINE DIAGRAM (Large Prominent Buttons, Crisp Font) ── */}
            <div style={{ position: "relative", minHeight: "680px", display: "flex", alignItems: "center", justifyContent: "center" }} className="network-svg-viewport">
              <svg
                ref={svgRef}
                viewBox="0 0 1060 760"
                width="100%"
                height="100%"
                style={{ overflow: "visible", touchAction: "none" }}
                suppressHydrationWarning
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onTouchCancel={handleDragEnd}
              >
                <defs>
                  {/* Royal Blue Active Gradient */}
                  <linearGradient id="active-node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>

                  {/* Clean Elevation Filters */}
                  <filter id="hub-card-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#0B1736" floodOpacity="0.08" />
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.06" />
                  </filter>
                  <filter id="node-active-shadow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#2563EB" floodOpacity="0.36" />
                  </filter>
                  <filter id="node-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="9" floodColor="#0F172A" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* ── LAYER 1: Elliptical Guide Ring ── */}
                <ellipse
                  cx={center.x}
                  cy={center.y}
                  rx={radiusX}
                  ry={radiusY}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                {/* ── LAYER 2: Connecting Lines (Start from Hub Outer Rim) ── */}
                {serviceNodes.map((_, idx) => {
                  const pos = positions[idx];
                  const isActive = idx === activeIdx;
                  const isHovered = idx === hoveredIdx;
                  const dx = pos.x - center.x;
                  const dy = pos.y - center.y;
                  const angle = Math.atan2(dy, dx);
                  const startX = roundCoord(center.x + hubRadius * Math.cos(angle));
                  const startY = roundCoord(center.y + hubRadius * Math.sin(angle));
                  const endX = roundCoord(pos.x);
                  const endY = roundCoord(pos.y);

                  return (
                    <line
                      key={`line-${idx}`}
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke={isActive ? "#2563EB" : isHovered ? "#60A5FA" : "#CBD5E1"}
                      strokeWidth={isActive ? "3.4" : isHovered ? "2.4" : "1.6"}
                      strokeLinecap="round"
                      style={{
                        transition: "stroke 0.22s ease, stroke-width 0.22s ease",
                        filter: isActive ? "drop-shadow(0 0 8px rgba(37,99,235,0.4))" : "none"
                      }}
                    />
                  );
                })}

                {/* ── LAYER 3: Central Engine Core (Clear & Symmetrical) ── */}
                <g
                  className="center-hub-group"
                  onMouseEnter={() => setIsHubHovered(true)}
                  onMouseLeave={() => setIsHubHovered(false)}
                  style={{ cursor: "default", transformOrigin: `${center.x}px ${center.y}px` }}
                >
                  {/* Subtle Reference Rings */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={96}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    opacity={isHubHovered ? "0.95" : "0.55"}
                  />
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={84}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    opacity={isHubHovered ? "0.55" : "0.22"}
                  />

                  {/* Core White Circular Hub */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={hubRadius}
                    fill="#FFFFFF"
                    stroke={isHubHovered ? "#2563EB" : "#CBD5E1"}
                    strokeWidth={isHubHovered ? "2.5" : "2"}
                    filter="url(#hub-card-shadow)"
                    style={{ transition: "all 0.22s ease" }}
                  />

                  {/* Inner Accent Ring */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={66}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="1.2"
                  />

                  {/* Center Hub Typography — Clean Good Life Title Only */}
                  <text
                    x={center.x}
                    y={center.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="22"
                    fontWeight="900"
                    fill="#0B1736"
                    fontFamily="var(--font-inter), 'Inter', sans-serif"
                    letterSpacing="2.2px"
                  >
                    GOOD LIFE
                  </text>
                </g>

                {/* ── LAYER 4: 10 Perfectly Spaced Service Node Cards (Large, Bold, Zero Overlap) ── */}
                {serviceNodes.map((node, idx) => {
                  const pos = positions[idx];
                  const px = roundCoord(pos.x);
                  const py = roundCoord(pos.y);
                  const isActive = idx === activeIdx;

                  return (
                    <g
                      key={node.id}
                      onMouseDown={(e) => handleDragStart(idx, e)}
                      onTouchStart={(e) => handleDragStart(idx, e)}
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`svg-node ${isActive ? 'active' : ''}`}
                      style={{
                        cursor: "pointer",
                        transformOrigin: `${px}px ${py}px`,
                        userSelect: "none"
                      }}
                    >
                      {/* Node Card Box (295px × 66px: High-Impact & Bold) */}
                      <rect
                        x={roundCoord(px - cardW / 2)}
                        y={roundCoord(py - cardH / 2)}
                        width={cardW}
                        height={cardH}
                        rx={cardRx}
                        className="node-bg"
                        fill={isActive ? "url(#active-node-gradient)" : "#FFFFFF"}
                        stroke={isActive ? "#1D4ED8" : "#E2E8F0"}
                        strokeWidth={isActive ? "2.4" : "1.4"}
                        filter={isActive ? "url(#node-active-shadow)" : "url(#node-card-shadow)"}
                        style={{ transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                      />

                      {/* Number Badge (38x38) */}
                      <rect
                        x={roundCoord(px - cardW / 2 + 14)}
                        y={roundCoord(py - 19)}
                        width="38"
                        height="38"
                        rx="10"
                        fill={isActive ? "rgba(255, 255, 255, 0.22)" : "#F1F5F9"}
                        stroke={isActive ? "rgba(255, 255, 255, 0.38)" : "#E2E8F0"}
                        strokeWidth="1.2"
                      />
                      <text
                        x={roundCoord(px - cardW / 2 + 33)}
                        y={roundCoord(py + 1)}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="15.5"
                        fontWeight="800"
                        fontFamily="var(--font-inter), 'Inter', sans-serif"
                        fill={isActive ? "#FFFFFF" : "#475569"}
                      >
                        {node.num}
                      </text>

                      {/* Full Node Title (Clear, Crisp, Large Bold Font 18px) */}
                      <text
                        x={roundCoord(px - cardW / 2 + 62)}
                        y={roundCoord(py + 1)}
                        textAnchor="start"
                        dominantBaseline="central"
                        fontSize="18"
                        fontWeight="800"
                        className="node-text"
                        fill={isActive ? "#FFFFFF" : "#0B1736"}
                        fontFamily="var(--font-inter), 'Inter', sans-serif"
                        letterSpacing="-0.2px"
                      >
                        {node.shortLabel}
                      </text>

                      {/* Subtle Interactive Chevron Affordance */}
                      <text
                        x={roundCoord(px + cardW / 2 - 20)}
                        y={roundCoord(py)}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="22"
                        fontWeight="700"
                        fill={isActive ? "#FFFFFF" : "#94A3B8"}
                        opacity={isActive ? "0.9" : "0.55"}
                        fontFamily="var(--font-inter), 'Inter', sans-serif"
                      >
                        ›
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* ── RIGHT: SLEEK EXECUTIVE BUYER BRIEF (Clean Minimal, No Box Clutter) ── */}
            <div style={{ display: "flex", flexDirection: "column" }} className="active-node-card-wrapper">
              <div className="active-node-card" style={{
                background: "#FFFFFF",
                borderRadius: "22px",
                border: "1.5px solid #E2E8F0",
                padding: "2rem 1.85rem",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0,0,0,0.02)",
                position: "relative",
                overflow: "hidden",
                minHeight: "475px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box"
              }}>
                
                {/* Content with Smooth Fade-in */}
                <div key={activeNode.id} className="fade-slide-up" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                  
                  <div>
                    {/* Node Title */}
                    <h3 className="active-node-title" style={{
                      fontSize: "1.65rem",
                      fontWeight: 800,
                      color: "#0B1736",
                      margin: "0 0 0.5rem",
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      letterSpacing: "-0.5px",
                      lineHeight: 1.2
                    }}>
                      {activeNode.name}
                    </h3>
                    
                    {/* Executive Subtitle */}
                    <p style={{
                      fontSize: "0.96rem",
                      color: "#475569",
                      fontWeight: 500,
                      margin: "0 0 1.6rem",
                      lineHeight: 1.55
                    }}>
                      {activeNode.tagline}
                    </p>

                    {/* Clean Deliverables (NO gray boxes wrapping each line!) */}
                    <div style={{ marginBottom: "1.6rem" }}>
                      <div style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "#94A3B8",
                        marginBottom: "0.9rem"
                      }}>
                        Key Execution Deliverables
                      </div>
                      
                      {/* Clean List Items */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                        {activeNode.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              background: "#EFF6FF",
                              color: "#2563EB",
                              fontSize: "0.72rem",
                              fontWeight: 900,
                              flexShrink: 0,
                              marginTop: "2px",
                              border: "1px solid #BFDBFE"
                            }}>
                              ✓
                            </span>
                            <span style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 500, lineHeight: 1.5 }}>
                              {deliv}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clean Executive CTA Button */}
                  <Link
                    href={activeNode.href}
                    className="active-card-cta-btn"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: "52px",
                      padding: "0 1.25rem",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                      color: "#FFFFFF",
                      fontSize: "0.94rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: "0.45rem",
                      textDecoration: "none",
                      boxShadow: "0 6px 20px rgba(37, 99, 235, 0.28)",
                      transition: "all 0.22s ease",
                      marginTop: "auto",
                      lineHeight: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 24px rgba(37, 99, 235, 0.38)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.28)";
                    }}
                  >
                    <span>Explore {activeNode.name}</span>
                    <span style={{ fontSize: "1.05rem", display: "inline-block", transition: "transform 0.2s ease" }}>→</span>
                  </Link>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-slide-up {
          animation: fadeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .center-hub-group {
          transition: transform 0.25s ease;
        }
        .center-hub-group:hover {
          transform: scale(1.02);
        }

        .active-card-cta-btn:hover span:last-child {
          transform: translateX(4px);
        }

        .commerce-network-section {
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* SVG Node Hover & Interactive State */
        .svg-node {
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .svg-node:hover:not(.active) {
          transform: translateY(-2px) scale(1.02);
        }
        .svg-node:hover:not(.active) .node-bg {
          stroke: #93C5FD;
          filter: drop-shadow(0 6px 14px rgba(37, 99, 235, 0.15));
        }

        .network-split-layout {
          grid-template-columns: minmax(0, 1fr) 350px;
        }
        .network-console-container {
          padding: 2rem 1.8rem;
        }

        @media (max-width: 1100px) {
          .network-split-layout {
            grid-template-columns: minmax(0, 1fr) 330px;
          }
        }

        @media (max-width: 992px) {
          .mobile-nodes-bar {
            display: block !important;
          }
          .network-console-container {
            padding: 1.25rem 0.75rem;
            border-radius: 20px;
          }
          .desktop-only-axis {
            display: none !important;
          }
          .network-split-layout {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .network-svg-viewport {
            min-height: 480px !important;
          }
          .active-node-card {
            border-radius: 18px !important;
            padding: 1.4rem 1.15rem !important;
            min-height: auto !important;
          }
          .active-node-title {
            font-size: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  );
}
