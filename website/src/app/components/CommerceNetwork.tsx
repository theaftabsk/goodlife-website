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
    shortLabel: "Payment Recon",
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
  const [isHubHovered, setIsHubHovered] = useState<boolean>(false);
  const activeNode = serviceNodes[activeIdx];
  const svgRef = useRef<SVGSVGElement>(null);

  // ── Layout constants ──
  const center = { x: 450, y: 350 };
  const hubRadius = 60; // 120px diameter circular core
  const radiusX = 350;
  const radiusY = 250;
  const cardW = 180;
  const cardH = 42;
  const cardRx = 10;

  // ── Initial positions from elliptical angles ──
  const nodeAngles = [
    -90, -54, -18, 18, 54, 90, 126, 162, 198, 234
  ];

  // ── Helper to eliminate SSR/Client floating-point hydration discrepancies ──
  const roundCoord = (val: number) => Math.round(val * 100) / 100;

  const getInitialPositions = () =>
    nodeAngles.map((angleDeg) => {
      const rad = (angleDeg * Math.PI) / 180;
      return {
        x: roundCoord(center.x + radiusX * Math.cos(rad)),
        y: roundCoord(center.y + radiusY * Math.sin(rad))
      };
    });

  // ── Draggable state ──
  const [positions, setPositions] = useState(getInitialPositions);
  const dragState = useRef<{ dragging: boolean; idx: number; offsetX: number; offsetY: number }>({
    dragging: false, idx: -1, offsetX: 0, offsetY: 0
  });

  // Convert mouse/touch event to SVG coordinates
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
        x: svgPt.x - offsetX,
        y: svgPt.y - offsetY
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
            
            {/* ── LEFT: SVG NETWORK DIAGRAM — Zero Overlap Layout ── */}
            <div style={{ position: "relative", minHeight: "680px", display: "flex", alignItems: "center", justifyContent: "center" }} className="network-svg-viewport">
              <svg
                ref={svgRef}
                viewBox="0 0 900 700"
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
                  <linearGradient id="active-node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  {/* Premium Enterprise Hub Shadow */}
                  <filter id="hub-card-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.08" />
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.06" />
                  </filter>
                  <filter id="node-active-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#2563EB" floodOpacity="0.30" />
                  </filter>
                  <filter id="node-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.05" />
                  </filter>
                </defs>

                {/* ── LAYER 1: Single faint orbit guide ring (behind everything) ── */}
                <ellipse
                  cx={center.x}
                  cy={center.y}
                  rx={radiusX}
                  ry={radiusY}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.65"
                />

                {/* ── LAYER 2: Connecting lines (start from center circle edge, stay behind cards) ── */}
                {serviceNodes.map((_, idx) => {
                  const pos = positions[idx];
                  const isActive = idx === activeIdx;
                  const dx = pos.x - center.x;
                  const dy = pos.y - center.y;
                  const angle = Math.atan2(dy, dx);
                  // Line starts exactly from the outer edge of the 120px hub (r = 60), rounded for SSR/Client hydration parity
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
                      stroke={isActive ? "#2563EB" : "#E2E8F0"}
                      strokeWidth={isActive ? "2.2" : "1.2"}
                      strokeLinecap="round"
                      style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
                    />
                  );
                })}

                {/* ── LAYER 3: Center core hub (Premium Enterprise SaaS Control Center) ── */}
                <g
                  className="center-hub-group"
                  onMouseEnter={() => setIsHubHovered(true)}
                  onMouseLeave={() => setIsHubHovered(false)}
                  style={{ cursor: "default", transformOrigin: `${center.x}px ${center.y}px` }}
                >
                  {/* 1. Very faint single outer reference ring */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={78}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    opacity={isHubHovered ? "0.9" : "0.55"}
                    style={{ transition: "opacity 0.3s ease" }}
                  />

                  {/* 2. Subtle blue active ring around the hub */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={66}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    opacity={isHubHovered ? "0.5" : "0.22"}
                    style={{ transition: "opacity 0.3s ease" }}
                  />

                  {/* 3. Main Circular Core (120px diameter / r = 60) */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={hubRadius}
                    fill="#FFFFFF"
                    stroke={isHubHovered ? "#2563EB" : "#CBD5E1"}
                    strokeWidth={isHubHovered ? "1.8" : "1.4"}
                    filter="url(#hub-card-shadow)"
                    style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
                  />

                  {/* 4. Subtle inner border highlight */}
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={56}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />

                  {/* 5. Typography — Perfectly Centered */}
                  <text
                    x={center.x}
                    y={center.y - 5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="15.5"
                    fontWeight="900"
                    fill="#0F172A"
                    fontFamily="var(--font-inter), Inter, sans-serif"
                    letterSpacing="0.8px"
                  >
                    GOOD LIFE
                  </text>
                  <text
                    x={center.x}
                    y={center.y + 13}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="7.5"
                    fontWeight="800"
                    fill={isHubHovered ? "#1D4ED8" : "#2563EB"}
                    letterSpacing="1.8px"
                    fontFamily="var(--font-inter), Inter, sans-serif"
                    style={{ textTransform: "uppercase", transition: "fill 0.25s ease" }}
                  >
                    OPERATING ENGINE
                  </text>
                </g>

                {/* ── LAYER 4: Service node cards (on top of lines) ── */}
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
                      className={`svg-node ${isActive ? 'active' : ''}`}
                      style={{ cursor: "grab", transformOrigin: `${px}px ${py}px` }}
                    >
                      {/* Node Box Rectangle */}
                      <rect
                        x={roundCoord(px - cardW / 2)}
                        y={roundCoord(py - cardH / 2)}
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
                        x={roundCoord(px - cardW / 2 + 8)}
                        y={roundCoord(py - 11)}
                        width="22"
                        height="22"
                        rx="5"
                        fill={isActive ? "rgba(255, 255, 255, 0.22)" : "#F1F5F9"}
                      />
                      <text
                        x={roundCoord(px - cardW / 2 + 19)}
                        y={roundCoord(py + 4)}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="800"
                        fontFamily="var(--font-inter), Inter, sans-serif"
                        fill={isActive ? "#FFFFFF" : "#64748B"}
                      >
                        {node.num}
                      </text>

                      {/* Main Node Label */}
                      <text
                        x={roundCoord(px - cardW / 2 + 37)}
                        y={roundCoord(py + 1)}
                        textAnchor="start"
                        dominantBaseline="central"
                        fontSize="12.5"
                        fontWeight="700"
                        className="node-text"
                        fill={isActive ? "#FFFFFF" : "#0F172A"}
                        fontFamily="var(--font-inter), Inter, sans-serif"
                        letterSpacing="-0.1px"
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
                padding: "1.75rem 1.6rem",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.02)",
                position: "relative",
                overflow: "hidden",
                minHeight: "485px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box"
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
                            gap: "0.7rem",
                            background: "#F8FAFC",
                            border: "1px solid #F1F5F9",
                            padding: "0.6rem 0.8rem",
                            borderRadius: "10px",
                            boxSizing: "border-box"
                          }}>
                            <span style={{
                              width: 18,
                              height: 18,
                              borderRadius: "5px",
                              background: "#EFF6FF",
                              color: "#2563EB",
                              border: "1px solid #BFDBFE",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.72rem",
                              fontWeight: 900,
                              flexShrink: 0,
                              marginTop: "1.5px"
                            }}>
                              ✓
                            </span>
                            <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 600, lineHeight: 1.42, wordBreak: "break-word" }}>
                              {deliv}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Explore CTA Button — dedicated class & styles to prevent any clipping */}
                  <Link
                    href={activeNode.href}
                    className="active-card-cta-btn"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      minHeight: "48px",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                      color: "#FFFFFF",
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: "0.4rem",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(37, 99, 235, 0.22)",
                      transition: "all 0.2s ease",
                      marginTop: "auto",
                      lineHeight: 1.3
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 22px rgba(37, 99, 235, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 99, 235, 0.22)";
                    }}
                  >
                    <span>Explore {activeNode.name} Mandate</span>
                    <span style={{ fontSize: "0.95rem", marginLeft: "0.25rem", display: "inline-block" }}>→</span>
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
          animation: fadeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .center-hub-group {
          transition: transform 0.25s ease;
        }
        .center-hub-group:hover {
          transform: scale(1.015);
        }

        .active-card-cta-btn:hover {
          background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%) !important;
        }

        .commerce-network-section {
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* SVG Node Hover FX */
        .svg-node {
          cursor: grab;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .svg-node:active {
          cursor: grabbing !important;
        }
        .svg-node:hover:not(.active) {
          transform: scale(1.03);
        }
        .svg-node:hover:not(.active) .node-bg {
          stroke: #93C5FD;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .network-split-layout {
          grid-template-columns: 1fr 390px;
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
            min-height: 380px !important;
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
