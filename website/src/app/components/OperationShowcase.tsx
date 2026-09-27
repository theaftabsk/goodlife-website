"use client";

import React, { useState } from "react";

export default function OperationShowcase({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [selectedHub, setSelectedHub] = useState<number>(0);

  const hubs = [
    {
      state: "Delhi NCR (Gurgaon Hub)",
      type: "Central Mother Hub & Automated Sorting",
      capacity: "35,000 sq. ft.",
      sla: "98.8% Same-Day Dispatch",
      features: "Heavy-Bulky Dock Appointments • Conveyor Sortation • Barcode Scanning",
      tag: "Live Mother Hub",
      renderSvg: () => (
        <svg viewBox="0 0 400 220" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hub1-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0B1736" />
              <stop offset="50%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="hub1-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="belt-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#hub1-bg)" />
          
          {/* Isometric Grid Floor */}
          <path d="M 0 160 L 200 110 L 400 160 L 200 215 Z" fill="#1E293B" opacity="0.6" />
          <path d="M 200 110 L 200 215" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
          <path d="M 100 135 L 300 185" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.2" />
          <path d="M 300 135 L 100 185" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.2" />

          {/* Automated Conveyor Assembly */}
          <path d="M 30 170 L 190 125 L 370 165" stroke="url(#belt-grad)" strokeWidth="12" strokeLinecap="round" />
          <path d="M 30 170 L 190 125 L 370 165" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="8,6" opacity="0.8" />

          {/* Parcels on Conveyor */}
          <rect x="70" y="146" width="22" height="16" rx="3" fill="#F59E0B" />
          <rect x="74" y="143" width="14" height="4" rx="1" fill="#FCD34D" />
          <rect x="175" y="115" width="26" height="18" rx="3" fill="#3B82F6" />
          <rect x="180" y="112" width="16" height="4" rx="1" fill="#93C5FD" />
          <rect x="290" y="140" width="24" height="16" rx="3" fill="#10B981" />
          
          {/* Laser Scanner Arch */}
          <path d="M 160 140 L 160 75 L 220 75 L 220 140" stroke="#38BDF8" strokeWidth="3" fill="none" />
          <polygon points="165,77 215,77 235,130 145,130" fill="url(#hub1-beam)" />
          <line x1="150" y1="125" x2="230" y2="125" stroke="#EF4444" strokeWidth="2" opacity="0.9" />

          {/* Racks & Overhead Telemetry */}
          <rect x="20" y="30" width="80" height="75" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
          <line x1="20" y1="55" x2="100" y2="55" stroke="#334155" strokeWidth="1" />
          <line x1="20" y1="80" x2="100" y2="80" stroke="#334155" strokeWidth="1" />
          <rect x="28" y="38" width="18" height="12" rx="2" fill="#64748B" />
          <rect x="52" y="38" width="18" height="12" rx="2" fill="#F59E0B" opacity="0.8" />
          <rect x="28" y="63" width="22" height="12" rx="2" fill="#3B82F6" opacity="0.8" />
          <rect x="58" y="63" width="16" height="12" rx="2" fill="#10B981" opacity="0.8" />

          {/* Telemetry Badge Top Right */}
          <g transform="translate(260, 24)">
            <rect width="125" height="42" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38BDF8" strokeWidth="1" />
            <circle cx="16" cy="16" r="4" fill="#10B981" />
            <text x="26" y="19" fill="#F8FAFC" fontSize="10" fontWeight="800" fontFamily="system-ui">SORTATION: ACTIVE</text>
            <text x="26" y="32" fill="#38BDF8" fontSize="9" fontWeight="700" fontFamily="system-ui">SPEED: 1,850 PPH</text>
          </g>

          {/* Sorter Flow Arrows */}
          <path d="M 340 180 L 375 190" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <polygon points="378,191 368,186 371,194" fill="#38BDF8" />
        </svg>
      )
    },
    {
      state: "Maharashtra (Bhiwandi, Mumbai)",
      type: "Western Regional Distribution Center",
      capacity: "24,000 sq. ft.",
      sla: "98.5% On-Time Dock Handover",
      features: "Dark Store Milk-Run Feeds • FBA Inbound Staging • Return QC Center",
      tag: "Active 24/7",
      renderSvg: () => (
        <svg viewBox="0 0 400 220" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hub2-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0A192F" />
              <stop offset="60%" stopColor="#172A45" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id="rack-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#hub2-bg)" />

          {/* High-Bay Multi-Tier Industrial Racking */}
          <g transform="translate(30, 20)">
            {/* Bay 1 */}
            <rect x="0" y="0" width="10" height="150" fill="#475569" />
            <rect x="65" y="0" width="10" height="150" fill="#475569" />
            <rect x="130" y="0" width="10" height="150" fill="#475569" />
            {/* Shelves */}
            <rect x="10" y="30" width="120" height="6" fill="#64748B" />
            <rect x="10" y="70" width="120" height="6" fill="#64748B" />
            <rect x="10" y="110" width="120" height="6" fill="#64748B" />
            <rect x="10" y="145" width="120" height="6" fill="#64748B" />

            {/* Pallets and Goods */}
            <rect x="15" y="12" width="22" height="18" rx="2" fill="#F59E0B" />
            <rect x="40" y="15" width="20" height="15" rx="2" fill="#3B82F6" />
            <rect x="75" y="10" width="24" height="20" rx="2" fill="#10B981" />
            <rect x="102" y="14" width="22" height="16" rx="2" fill="#EC4899" />

            <rect x="15" y="50" width="24" height="20" rx="2" fill="#06B6D4" />
            <rect x="42" y="48" width="20" height="22" rx="2" fill="#8B5CF6" />
            <rect x="75" y="52" width="22" height="18" rx="2" fill="#F59E0B" />
            <rect x="100" y="48" width="25" height="22" rx="2" fill="#3B82F6" />

            <rect x="15" y="88" width="22" height="22" rx="2" fill="#10B981" />
            <rect x="40" y="90" width="22" height="20" rx="2" fill="#F97316" />
            <rect x="75" y="86" width="26" height="24" rx="2" fill="#6366F1" />
            <rect x="104" y="90" width="20" height="20" rx="2" fill="#14B8A6" />
          </g>

          {/* Loading Dock Bay & Handover Truck Silhouette */}
          <g transform="translate(200, 70)">
            <rect x="0" y="0" width="170" height="105" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
            <rect x="10" y="10" width="150" height="85" fill="#0F172A" />
            <text x="20" y="32" fill="#38BDF8" fontSize="11" fontWeight="800" fontFamily="system-ui">DOCK #04 • READY</text>
            
            {/* Truck Ramp */}
            <path d="M 20 85 L 140 85 L 150 95 L 10 95 Z" fill="#475569" />
            {/* Pallet Jack */}
            <rect x="35" y="55" width="30" height="20" rx="3" fill="#F59E0B" />
            <circle cx="42" cy="78" r="4" fill="#94A3B8" />
            <circle cx="60" cy="78" r="4" fill="#94A3B8" />
            {/* QC Verified Tag */}
            <rect x="80" y="50" width="70" height="25" rx="5" fill="#065F46" stroke="#10B981" strokeWidth="1" />
            <text x="88" y="66" fill="#34D399" fontSize="9" fontWeight="800" fontFamily="system-ui">✓ QC 100% PASS</text>
          </g>

          {/* Ground Caution Lines */}
          <line x1="0" y1="195" x2="400" y2="195" stroke="#F59E0B" strokeWidth="4" strokeDasharray="14,10" opacity="0.75" />
          <text x="30" y="212" fill="#94A3B8" fontSize="9" fontWeight="700" fontFamily="system-ui">WEST REGIONAL HUB • BHIWANDI • 24/7 DOCK HANDOVER</text>
        </svg>
      )
    },
    {
      state: "Karnataka (Bengaluru South)",
      type: "Southern Tech & Electronics Fulfillment Hub",
      capacity: "20,000 sq. ft.",
      sla: "99.1% Error-Free Dispatch",
      features: "ESD-Safe Electronics Storage • Serial Scan Indexing • 2-Hour Slotting",
      tag: "High Velocity",
      renderSvg: () => (
        <svg viewBox="0 0 400 220" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hub3-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#031E3D" />
              <stop offset="60%" stopColor="#0B2B5C" />
              <stop offset="100%" stopColor="#041224" />
            </linearGradient>
            <radialGradient id="esd-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="220" fill="url(#hub3-bg)" />

          {/* Circuit / Tech Tracks */}
          <path d="M 0 50 L 60 50 L 90 80 L 150 80" stroke="#0284C7" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="150" cy="80" r="3" fill="#38BDF8" />
          <path d="M 400 130 L 320 130 L 290 100 L 230 100" stroke="#0284C7" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="230" cy="100" r="3" fill="#38BDF8" />

          {/* ESD-Safe Workstation & Robotic Pick Arm */}
          <g transform="translate(60, 45)">
            {/* Table */}
            <rect x="0" y="80" width="180" height="10" rx="2" fill="#0284C7" />
            <rect x="15" y="90" width="8" height="45" fill="#334155" />
            <rect x="157" y="90" width="8" height="45" fill="#334155" />
            
            {/* ESD Mat */}
            <rect x="10" y="76" width="160" height="4" fill="#38BDF8" />

            {/* High-Tech Robotic Pick Arm */}
            <circle cx="50" cy="76" r="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <path d="M 50 76 L 70 30 L 110 40 L 120 70" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="70" cy="30" r="4" fill="#F59E0B" />
            <circle cx="110" cy="40" r="4" fill="#F59E0B" />
            {/* Robotic Gripper */}
            <path d="M 115 70 L 120 76 L 125 70" stroke="#F59E0B" strokeWidth="3" fill="none" />
            <rect x="113" y="74" width="14" height="10" rx="1" fill="#3B82F6" />

            {/* Barcode Scanner Gun Silhouette */}
            <rect x="145" y="55" width="8" height="20" rx="2" fill="#94A3B8" />
            <rect x="140" y="52" width="16" height="6" rx="1" fill="#EF4444" />
            <line x1="148" y1="58" x2="165" y2="76" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" />
          </g>

          {/* Digital HUD Serial Verification Box */}
          <g transform="translate(255, 35)">
            <rect width="125" height="120" rx="10" fill="rgba(11, 23, 54, 0.9)" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="16" cy="18" r="4" fill="#10B981" />
            <text x="26" y="21" fill="#F8FAFC" fontSize="10" fontWeight="800" fontFamily="system-ui">SERIAL SCAN</text>
            <line x1="10" y1="32" x2="115" y2="32" stroke="#1E3A8A" strokeWidth="1" />
            
            <text x="14" y="48" fill="#93C5FD" fontSize="9" fontFamily="monospace">IMEI: 86429012***</text>
            <text x="14" y="62" fill="#93C5FD" fontSize="9" fontFamily="monospace">SLOT: BN-B4-09</text>
            <text x="14" y="76" fill="#34D399" fontSize="9" fontWeight="700" fontFamily="system-ui">MATCH: 100% VALID</text>
            
            <rect x="12" y="86" width="101" height="22" rx="4" fill="#1E3A8A" />
            <text x="20" y="101" fill="#38BDF8" fontSize="9" fontWeight="800" fontFamily="system-ui">99.1% ACCURACY</text>
          </g>

          <text x="40" y="205" fill="#38BDF8" fontSize="9" fontWeight="700" fontFamily="system-ui">⚡ ESD CONTROLLED • ZERO-DEFECT HIGH VALUE TECH STAGING</text>
        </svg>
      )
    },
    {
      state: "Telangana & AP (Hyderabad Hub)",
      type: "South-Central Regional Fulfillment Node",
      capacity: "14,000 sq. ft.",
      sla: "98.4% Sub-24hr Regional SLA",
      features: "Climate-Controlled Storage • Fast Pick Tunnels • Daily Milk-Runs",
      tag: "Regional Node",
      renderSvg: () => (
        <svg viewBox="0 0 400 220" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hub4-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="50%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#062F24" />
            </linearGradient>
            <linearGradient id="cold-chill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#hub4-bg)" />

          {/* Climate Control Chamber */}
          <g transform="translate(30, 25)">
            <rect width="170" height="135" rx="8" fill="rgba(6, 47, 36, 0.85)" stroke="#34D399" strokeWidth="1.5" />
            {/* Top Vent */}
            <rect x="20" y="8" width="130" height="8" rx="2" fill="#047857" />
            <line x1="30" y1="12" x2="140" y2="12" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="4,3" />

            {/* Cold Mist Visual */}
            <polygon points="20,16 150,16 160,80 10,80" fill="url(#cold-chill)" />

            {/* Temperature Gauge Meter */}
            <circle cx="85" cy="55" r="24" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
            <text x="68" y="58" fill="#ECFDF5" fontSize="13" fontWeight="900" fontFamily="system-ui">18°C</text>
            <text x="68" y="70" fill="#6EE7B7" fontSize="8" fontWeight="700" fontFamily="system-ui">CONTROLLED</text>

            {/* Storage Tunnels */}
            <rect x="15" y="92" width="40" height="30" rx="3" fill="#047857" />
            <rect x="65" y="92" width="40" height="30" rx="3" fill="#047857" />
            <rect x="115" y="92" width="40" height="30" rx="3" fill="#047857" />
            <text x="24" y="110" fill="#A7F3D0" fontSize="9" fontWeight="800">TUNNEL A</text>
            <text x="74" y="110" fill="#A7F3D0" fontSize="9" fontWeight="800">TUNNEL B</text>
            <text x="124" y="110" fill="#A7F3D0" fontSize="9" fontWeight="800">TUNNEL C</text>
          </g>

          {/* Quick-Commerce Dispatch Lane */}
          <g transform="translate(225, 40)">
            <rect width="145" height="110" rx="8" fill="#062F24" stroke="#10B981" strokeWidth="1.2" />
            <text x="15" y="24" fill="#34D399" fontSize="10" fontWeight="800" fontFamily="system-ui">⚡ MILK-RUN DISPATCH</text>
            <line x1="12" y1="32" x2="132" y2="32" stroke="#047857" strokeWidth="1" />

            {/* EV Van Outline */}
            <rect x="25" y="48" width="80" height="32" rx="4" fill="#047857" />
            <rect x="85" y="54" width="22" height="18" rx="2" fill="#A7F3D0" opacity="0.6" />
            <circle cx="45" cy="82" r="7" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
            <circle cx="85" cy="82" r="7" fill="#064E3B" stroke="#34D399" strokeWidth="2" />

            <text x="22" y="100" fill="#ECFDF5" fontSize="8.5" fontWeight="700" fontFamily="system-ui">Blinkit / Zepto / Insta Feeds</text>
          </g>

          <text x="35" y="200" fill="#A7F3D0" fontSize="9" fontWeight="700" fontFamily="system-ui">❄️ CLIMATE STABILITY + FAST REGIONAL SLA DISPATCH • HYDERABAD HUB</text>
        </svg>
      )
    }
  ];

  return (
    <section
      id="operation-showcase"
      className="scroll-blur-reveal"
      style={{
        position: "relative",
        padding: "5.5rem 1.5rem 6rem",
        overflow: "hidden"
      }}
    >
      {/* Background Aurora Orbs for Luxury Blue Glass Feel */}
      <div className="ambient-glow-orb-left" />
      <div className="ambient-glow-orb-right" />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0.28rem 0.95rem",
            borderRadius: "99px",
            background: "rgba(239, 246, 255, 0.85)",
            border: "1px solid rgba(147, 197, 253, 0.8)",
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)",
            color: "#2563EB",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: "0.75rem"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
            The Operation, Photographed & Modeled • 100% Real Infrastructure
          </span>
          <h2 style={{
            fontSize: "clamp(1.95rem, 3vw, 2.65rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.75rem"
          }}>
            Physical 12-State Infrastructure. Real Execution.
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "#475569",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.65
          }}>
            No generic drop-shipping or outsourced broker claims. GoodLife operates physical regional warehouse facilities with audited SLAs, automated sortation, and live capacity metrics.
          </p>
        </div>

        {/* 4 Key SLA Denominators */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3.2rem"
        }}>
          {[
            {
              metric: "100,000+ sq. ft.",
              label: "Physical Warehouse Capacity",
              sub: "across 12 state operating hubs",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                  <path d="M9 9h1" />
                  <path d="M9 13h1" />
                  <path d="M9 17h1" />
                  <path d="M14 9h1" />
                  <path d="M14 13h1" />
                  <path d="M14 17h1" />
                </svg>
              )
            },
            {
              metric: "15,000+ Orders",
              label: "Dispatched Daily at Peak",
              sub: "with sub-4hr dock turnaround",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              )
            },
            {
              metric: "98.6% SLA",
              label: "On-Time Dispatch Rate",
              sub: "measured against marketplace SLAs",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )
            },
            {
              metric: "<0.04% Error",
              label: "Defect-Free Pick & Pack",
              sub: "validated by serial barcode scans",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              )
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="luxury-blue-glass"
              style={{
                borderRadius: "18px",
                padding: "1.45rem",
                display: "flex",
                alignItems: "center",
                gap: "1.1rem",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                border: "1px solid #BFDBFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: "1.38rem", fontWeight: 900, color: "#0B1736", lineHeight: 1.1 }}>
                  {stat.metric}
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 750, color: "#2563EB", marginTop: "4px" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "2px" }}>
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photographed Operations Showcase Grid - 100% Vector SVGs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.6rem"
        }}>
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              className="luxury-blue-glass"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 45px rgba(37, 99, 235, 0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37, 99, 235, 0.08)";
              }}
            >
              {/* Vector SVG Architecture Visual */}
              <div style={{
                position: "relative",
                height: "190px",
                overflow: "hidden",
                background: "#0F172A",
                borderBottom: "1px solid rgba(191, 219, 254, 0.4)"
              }}>
                {hub.renderSvg()}
                
                {/* Floating Tag */}
                <span style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#FFFFFF",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  padding: "0.22rem 0.6rem",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {hub.tag}
                </span>

                {/* Capacity Tag */}
                <span style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "12px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.35)",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "0.22rem 0.6rem",
                  borderRadius: "5px"
                }}>
                  {hub.capacity}
                </span>
              </div>

              {/* Hub Details */}
              <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem" }}>
                  {hub.state}
                </h4>
                <div style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#059669",
                  marginBottom: "0.65rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669" }} />
                  {hub.sla}
                </div>
                <p style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.5, margin: "0 0 1rem", flex: 1 }}>
                  {hub.type}
                </p>
                <div style={{
                  background: "rgba(241, 245, 249, 0.75)",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "0.55rem 0.75rem",
                  fontSize: "0.74rem",
                  color: "#334155",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{hub.features}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Denominator Callout */}
        <div
          className="luxury-blue-glass"
          style={{
            marginTop: "2.8rem",
            padding: "1.2rem 1.6rem",
            borderRadius: "16px",
            textAlign: "center",
            fontSize: "0.88rem",
            color: "#334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.6rem",
            flexWrap: "wrap"
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <strong>12 Operating States:</strong> DL, HR, MH, KA, TS, TN, WB, RJ, GJ, UP, PB, KL
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <strong>WMS Integration:</strong> Unicommerce, Vinculum, Increff, ERP
          </span>
          <button
            onClick={onOpenDiag}
            style={{
              background: "none",
              border: "none",
              color: "#2563EB",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0
            }}
          >
            Explore 12-State Warehousing Distribution →
          </button>
        </div>

      </div>
    </section>
  );
}
