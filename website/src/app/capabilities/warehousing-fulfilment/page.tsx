"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function WarehousingFulfilmentPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeHub, setActiveHub] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const regionalHubs = [
    {
      id: "bhiwandi",
      name: "Bhiwandi Super-Hub (Mumbai / West)",
      badge: "WEST GATEWAY",
      sqft: "185,000 Sq. Ft.",
      docks: "14 Automated Dock Doors",
      throughput: "28,000 Parcels / Day",
      carriers: "Amazon ATS, Flipkart Ekart, Delhivery, Blue Dart",
      storageType: "Heavy Pallet Racking + VNA (Very Narrow Aisle)",
      highlight: "Direct NH-48 port connectivity allowing 4-hour container offloading and same-day marketplace cross-docking."
    },
    {
      id: "delhi-ncr",
      name: "Sonipat Mega-FC (Delhi-NCR / North)",
      badge: "NORTH CORRIDOR",
      sqft: "160,000 Sq. Ft.",
      docks: "12 Inbound / Outbound Docks",
      throughput: "32,000 Parcels / Day",
      carriers: "Amazon Easy Ship, Smart Fulfilment, Shadowfax, Xpressbees",
      storageType: "Multi-Tier Mezzanine + Heavy Bulk Staging",
      highlight: "Positioned directly inside the KMP Expressway cluster, ensuring sub-12hr dispatch across Delhi, Haryana, Punjab, and West UP."
    },
    {
      id: "bangalore",
      name: "Hoskote Tech-Hub (Bangalore / South)",
      badge: "SOUTH TECH CORE",
      sqft: "120,000 Sq. Ft.",
      docks: "10 Fast-Track Dock Bays",
      throughput: "22,000 Parcels / Day",
      carriers: "Ekart, Amazon Logistics, Delhivery Prime, DTDC",
      storageType: "Climate-Assisted Electronics & Appliance Racks",
      highlight: "Dedicated high-velocity packing lanes for consumer electronics, home decor, and appliances with ESD-safe workstations."
    },
    {
      id: "kolkata",
      name: "Dankuni Logistics Node (Kolkata / East)",
      badge: "EAST CORRIDOR",
      sqft: "95,000 Sq. Ft.",
      docks: "8 Multi-Modal Docks",
      throughput: "14,500 Parcels / Day",
      carriers: "Delhivery Surface, Blue Dart Air, Ekart East Hub",
      storageType: "Heavy Corrugated & Palletized Storage",
      highlight: "Crucial eastern nexus connecting West Bengal, Odisha, Bihar, and Northeast feeder lines with zero regional choke-points."
    },
    {
      id: "hyderabad",
      name: "Shamshabad Air-Dock (Hyderabad / Deccan)",
      badge: "DECCAN JUNCTION",
      sqft: "85,000 Sq. Ft.",
      docks: "6 Rapid Air-Cargo Docks",
      throughput: "12,000 Parcels / Day",
      carriers: "Blue Dart Aviation, Amazon Logistics, Delhivery",
      storageType: "High-Density Selective Racking",
      highlight: "Sub-20 minutes from RGIA air cargo terminal, guaranteeing next-morning delivery across South-Central India."
    }
  ];

  const packagingLayers = [
    {
      layer: "01",
      name: "Heavy-Duty 5-Ply / 7-Ply Corrugated Outer Shell",
      tag: "CRUSH RESISTANCE",
      desc: "Engineered with 250+ GSM virgin kraft paper designed to withstand up to 45 kg of vertical stacking weight inside courier linehaul trucks without wall deformation.",
      metric: "45 kg",
      metricLabel: "Compression Stacking Tolerance"
    },
    {
      layer: "02",
      name: "Custom-Molded EPS / High-Density EPE Foam",
      tag: "KINETIC SHOCK DISSIPATION",
      desc: "Precision CNC-cut foam inserts contoured exactly to the product chassis, preventing internal shifting and absorbing sudden drops from conveyor belts.",
      metric: "ISTA-1A",
      metricLabel: "Drop-Test Certified (1.2m Height)"
    },
    {
      layer: "03",
      name: "Multi-Axis Rigid Corner & Edge Protectors",
      tag: "IMPACT CORNER GUARDS",
      desc: "Laminated compressed paperboard angle boards along all 8 corners and 12 edges, neutralizing 90% of corner crush incidents during courier rough handling.",
      metric: "99.8%",
      metricLabel: "Corner Impact Protection Rate"
    },
    {
      layer: "04",
      name: "Anti-Static & Moisture-Barrier Poly Sealing",
      tag: "WEATHER & ESD SHIELD",
      desc: "Hermetically heat-sealed 80-micron LDPE film shielding sensitive electrical circuits, metal finishes, and fabrics from monsoon humidity and dust ingress.",
      metric: "IP-54",
      metricLabel: "Moisture & Dust Barrier"
    },
    {
      layer: "05",
      name: "Cross-Woven Filament Strapping & Tamper Tape",
      tag: "PILFERAGE & BURST LOCK",
      desc: "Fiberglass reinforced strapping tape paired with serialized barcode void tape, preventing mid-transit tampering and opportunistic courier pilferage.",
      metric: "0.01%",
      metricLabel: "Transit Pilferage Incidence"
    }
  ];

  const warehouseStages = [
    {
      step: "01",
      title: "Inbound Verification & Weight Capture",
      desc: "Digital dock check-in with volumetric 3D scanners capturing weight, dimensions, and lot numbers into ERP within 120 minutes of unloading."
    },
    {
      step: "02",
      title: "Barcode Binning & Dynamic Slotting",
      desc: "High-velocity hero SKUs placed in front ergonomic picking zones; every bin scanned via handheld barcode terminals for 100% location accuracy."
    },
    {
      step: "03",
      title: "Wave & Batch Picking",
      desc: "Automated route optimization directing warehouse pickers through the shortest physical path, cutting pick times down to 42 seconds per order."
    },
    {
      step: "04",
      title: "Dual-Weight Verification & Pack",
      desc: "Scales embedded in packing tables match measured parcel weight against expected SKU weight, catching missing accessories before the box is taped."
    },
    {
      step: "05",
      title: "Carrier Staging & Signed Manifest",
      desc: "Sorted by carrier (Amazon Easy Ship, Ekart, Delhivery) in dedicated loading lanes with signed digital manifests handed over before 2:00 PM cutoff."
    }
  ];

  const comparisonData = [
    {
      factor: "Order-to-Carrier Dispatch SLA",
      traditional: "24 to 48 hours; orders sit unpicked while daily carrier cutoff times are missed.",
      goodlife: "Sub-4 hours guaranteed; orders ingested before 12 PM are handed over to couriers the same day."
    },
    {
      factor: "Fragile & Bulky Handling",
      traditional: "Standard generic cardboard boxes; 15-20% transit breakage on mirrors, furniture, and appliances.",
      goodlife: "Drop-tested 5-layer packaging engineering with custom molded EPS inserts reducing damage to 0.18%."
    },
    {
      factor: "Barcode & Inventory Accuracy",
      traditional: "Manual paper checklists prone to human error, phantom stock cancellations, and warehouse shrinkage.",
      goodlife: "100% handheld wireless barcode scanning at binning, picking, and packing with 99.8% accuracy."
    },
    {
      factor: "Regional Node Coverage",
      traditional: "Single warehouse location resulting in 4-6 day delivery times and losing Prime badges in other zones.",
      goodlife: "12-state Grade-A warehouse network placing stock within 24hr delivery radius of 95% of online shoppers."
    },
    {
      factor: "Weight Dispute Defense",
      traditional: "No proof against carrier overcharging; brands lose 5-10% of revenue to courier dead-weight surcharges.",
      goodlife: "Automated in-line digital scales photograph and record parcel dimensions and weight at the packing station."
    }
  ];

  return (
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .amber-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .amber-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(217, 119, 6, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(217, 119, 6, 0.35);
        }
        @media (max-width: 991px) {
          .wh-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .wh-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .wh-hub-detail { grid-template-columns: 1fr !important; }
          .wh-pack-detail { grid-template-columns: 1fr !important; }
          .wh-stages-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .wh-stats-grid { grid-template-columns: 1fr !important; }
          .wh-pill-grid { grid-template-columns: 1fr !important; }
          .wh-banner-box { padding: 2rem 1.5rem !important; }
        }
      `}</style>

      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. SIGNATURE LIGHT ICE-BLUE HERO ── */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "5rem",
        background: "linear-gradient(180deg, #E0F2FE 0%, #E8F4FE 20%, #F0F7FF 45%, #FAFCFE 70%, #FFFFFF 92%, #FFFFFF 100%)",
        overflow: "hidden"
      }}>
        {/* Soft Ambient Aurora Orbs */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(147, 197, 253, 0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#D97706", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Capabilities</span>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Warehousing &amp; Fulfilment</span>
          </div>

          <div className="wh-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                border: "1.5px solid #FDE68A",
                color: "#D97706",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(217, 119, 6, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706" }} />
                CAPABILITY 04 • INFRASTRUCTURE &amp; 3PL EXCELLENCE
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Warehousing &amp; Fulfilment: <br />
                <span style={{ background: "linear-gradient(135deg, #D97706 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  12 Regional Hubs &amp; Sub-4hr Dock Dispatch
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Standard 3PLs miss carrier cutoffs and destroy bulky inventory in transit. Good Life operates institutional Grade-A warehouse facilities across 12 strategic states with barcode-guided picking, custom drop-tested packaging, and guaranteed sub-4 hour order-to-carrier handoff.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(217, 119, 6, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE WAREHOUSE TOUR →</span>
                </Link>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "52px",
                    padding: "0 1.6rem",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#0F172A",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Calculate Fulfilment SLA</span>
                </button>
              </div>

            </div>

            {/* Right: Live Warehouse Terminal Console (Floating Glass Card) */}
            <div>
              <div className="amber-glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(217, 119, 6, 0.08), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#D97706", boxShadow: "0 0 8px #D97706" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#78350F" }}>
                      Dock Execution Console
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#D97706", background: "#FEF3C7", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    ACTIVE SHIFT
                  </span>
                </div>

                {/* 4 Health Telemetry Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Scanning Accuracy</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#D97706", marginTop: "2px" }}>99.8%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Handheld Barcode WMS</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Dock Dispatch Time</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1D4ED8", marginTop: "2px" }}>3.4 Hours</div>
                    <div style={{ fontSize: "0.68rem", color: "#1D4ED8", marginTop: "2px", fontWeight: 700 }}>SLA Guarantee: &lt;4.0 hrs</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Bulky Transit Damage</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>0.18%</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: "2px", fontWeight: 600 }}>Industry: 4.5% - 8.0%</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Daily Throughput</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#2563EB", marginTop: "2px" }}>1,420 / hr</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>100% On-time handover</div>
                  </div>
                </div>

                {/* Live Micro Status */}
                <div style={{ background: "#F1F5F9", padding: "0.85rem 1rem", borderRadius: "12px", fontSize: "0.75rem", color: "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D97706" }} />
                    Bhiwandi Dock #4 cleared; 1,840 Flipkart Smart parcels manifested
                  </span>
                  <span style={{ fontWeight: 700, color: "#D97706" }}>Live</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS (Matching Screenshot 2 Aesthetic) ── */}
          <div className="wh-stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "12 Hubs",
                label: "Regional Super-Nodes",
                description: "Grade-A warehousing in Bhiwandi, NCR, Bangalore, Kolkata, Hyderabad",
                tag: "National Grid",
                tagColor: "#D97706",
                tagBg: "#FFFBEB",
                borderColor: "rgba(217, 119, 6, 0.2)",
                subText: "100% CCTV & Temperature Monitored"
              },
              {
                value: "99.4%",
                label: "Same-Day Dispatch SLA",
                description: "Orders placed by 12 PM manifested and handed to couriers same day",
                tag: "Speed Guarantee",
                tagColor: "#1D4ED8",
                tagBg: "#EFF6FF",
                borderColor: "rgba(29, 78, 216, 0.2)",
                subText: "Zero Late-Shipment Strikes"
              },
              {
                value: "< 4hr",
                label: "Dock-to-Carrier Cycle",
                description: "From digital order ingestion to signed carrier manifest handover",
                tag: "Fast Turnaround",
                tagColor: "#0284C7",
                tagBg: "#F0F9FF",
                borderColor: "rgba(2, 132, 199, 0.2)",
                subText: "3 Daily Scheduled Cutoffs"
              },
              {
                value: "0.18%",
                label: "Transit Damage Rate",
                description: "ISTA-1A drop-tested multi-ply packaging for bulky & fragile SKUs",
                tag: "Zero Breakage",
                tagColor: "#059669",
                tagBg: "#F0FDF4",
                borderColor: "rgba(5, 150, 105, 0.2)",
                subText: "Guaranteed Safe Transit",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="amber-glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: st.tagColor, background: st.tagBg, padding: "3px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                    {st.tag}
                  </span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.8px", lineHeight: 1 }}>
                  {st.value}
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1E293B", marginTop: "0.4rem", marginBottom: "0.3rem" }}>
                  {st.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.45, marginBottom: "1rem" }}>
                  {st.description}
                </div>
                {st.showBar && (
                  <div style={{ width: "100%", height: "4px", background: "#E2E8F0", borderRadius: "99px", overflow: "hidden", marginBottom: "0.75rem" }}>
                    <div style={{ width: "98%", height: "100%", background: "#059669" }} />
                  </div>
                )}
                <div style={{ fontSize: "0.75rem", color: st.tagColor, fontWeight: 700 }}>
                  ✓ {st.subText}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. INTERACTIVE 12-NODE REGIONAL HUB EXPLORER ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Physical Network Infrastructure
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Explore Good Life Regional Fulfillment Hubs
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Select a facility node below to review dock specifications, daily parcel handling capacity, carrier integrations, and regional delivery SLAs.
            </p>
          </div>

          {/* Hub Selector Pills */}
          <div className="wh-pill-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.75rem",
            marginBottom: "2.5rem"
          }}>
            {regionalHubs.map((hub, idx) => {
              const isSelected = activeHub === idx;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(idx)}
                  style={{
                    padding: "1.1rem 1rem",
                    borderRadius: "16px",
                    border: isSelected ? "2px solid #D97706" : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? "0 8px 24px rgba(217, 119, 6, 0.12)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: isSelected ? "#D97706" : "#94A3B8", textTransform: "uppercase" }}>
                    {hub.badge}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: isSelected ? "#0F172A" : "#475569", marginTop: "0.3rem" }}>
                    {hub.name.split("(")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hub Details Showcase */}
          {(() => {
            const current = regionalHubs[activeHub];
            return (
              <div className="amber-glass-card wh-hub-detail" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#D97706", background: "#FFFBEB", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    {current.badge} • HUB SPECIFICATION
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 1rem", letterSpacing: "-0.5px" }}>
                    {current.name}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                    {current.highlight}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>FACILITY AREA</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", marginTop: "3px" }}>{current.sqft}</div>
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>DOCK ACCESS</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", marginTop: "3px" }}>{current.docks}</div>
                    </div>
                  </div>
                </div>

                {/* Right Stat Tile */}
                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2rem"
                }}>
                  <div style={{ textAlign: "center", paddingBottom: "1.5rem", borderBottom: "1px solid #E2E8F0", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#D97706", lineHeight: 1 }}>
                      {current.throughput}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginTop: "0.4rem" }}>
                      Peak Daily Outbound Capacity
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
                    <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, display: "block" }}>Integrated Carrier Fleets:</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1D4ED8" }}>{current.carriers}</span>
                    </div>
                    <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, display: "block" }}>Storage Architecture:</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A" }}>{current.storageType}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 3. INTERACTIVE 5-LAYER DROP-TEST PACKAGING SHOWCASE ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Damage Mitigation Engineering
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              5-Layer Bulky &amp; Fragile Drop-Tested Packaging Architecture
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Transit returns due to cracked screens, scratched paint, or dented boxes destroy e-commerce margins. Inspect how Good Life engineers custom packaging that drops breakage rates below 0.2%.
            </p>
          </div>

          {/* Layer Selector */}
          <div className="wh-pill-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.75rem",
            marginBottom: "2.5rem"
          }}>
            {packagingLayers.map((layer, idx) => {
              const isSelected = activeLayer === idx;
              return (
                <button
                  key={layer.layer}
                  onClick={() => setActiveLayer(idx)}
                  style={{
                    padding: "1.1rem 1rem",
                    borderRadius: "16px",
                    border: isSelected ? "2px solid #D97706" : "1.5px solid #E2E8F0",
                    background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? "0 8px 24px rgba(217, 119, 6, 0.12)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: isSelected ? "#D97706" : "#94A3B8" }}>
                    LAYER {layer.layer}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: isSelected ? "#0F172A" : "#475569", marginTop: "0.3rem" }}>
                    {layer.tag}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Details */}
          {(() => {
            const current = packagingLayers[activeLayer];
            return (
              <div className="amber-glass-card wh-pack-detail" style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "3rem",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#D97706", background: "#FFFBEB", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                    PACKAGING LAYER {current.layer} • {current.tag}
                  </span>
                  <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0B1736", margin: "1rem 0 1rem", letterSpacing: "-0.5px" }}>
                    {current.name}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                    {current.desc}
                  </p>
                </div>

                <div style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "3rem", fontWeight: 900, color: "#D97706", lineHeight: 1, letterSpacing: "-1px" }}>
                    {current.metric}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1E293B", marginTop: "0.6rem" }}>
                    {current.metricLabel}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#16A34A", fontWeight: 700, marginTop: "0.5rem" }}>
                    ✓ 100% Marketplace Carrier Approved
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 4. THE 5-STAGE WAREHOUSE CONVEYOR WORKFLOW ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              High-Velocity Fulfillment Pipeline
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              From Order Notification to Signed Carrier Manifest
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              How Good Life processes high-volume marketplace orders with flawless accuracy and zero carrier pickup delays.
            </p>
          </div>

          <div className="wh-stages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.25rem"
          }}>
            {warehouseStages.map((stage, sIdx) => (
              <div key={sIdx} className="amber-glass-card" style={{ padding: "2rem 1.4rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#D97706", marginBottom: "0.8rem", lineHeight: 1 }}>
                    {stage.step}
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.8rem", lineHeight: 1.35 }}>
                    {stage.title}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. HEAD-TO-HEAD COMPARISON TABLE ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#D97706", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Service Level Comparison
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Conventional 3PL Provider vs. Good Life Infrastructure
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Why typical warehouse providers fail marketplace SLAs while Good Life secures Prime badging and protects product margins.
            </p>
          </div>

          <div className="amber-glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#64748B", width: "26%" }}>FULFILMENT BENCHMARK</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#EF4444", width: "37%" }}>GENERIC 3PL PROVIDER</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 900, color: "#D97706", width: "37%" }}>GOOD LIFE FULFILMENT HUB</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx === comparisonData.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                      {row.factor}
                    </td>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5 }}>
                      <span style={{ color: "#EF4444", fontWeight: 700, marginRight: "0.4rem" }}>✕</span>
                      {row.traditional}
                    </td>
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5, background: "rgba(217, 119, 6, 0.02)" }}>
                      <span style={{ color: "#D97706", fontWeight: 900, marginRight: "0.4rem" }}>✓</span>
                      {row.goodlife}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── 6. EXECUTIVE AUDIT BANNER & NEXT STEPS ── */}
      <section style={{ padding: "5rem 0", background: "#0B1736" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="wh-banner-box" style={{
            background: "linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(29, 78, 216, 0.15) 100%)",
            border: "1.5px solid rgba(217, 119, 6, 0.4)",
            borderRadius: "26px",
            padding: "3.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}>
            <div style={{ maxWidth: "700px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#FDE68A", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                REGIONAL WAREHOUSING TOUR
              </span>
              <h3 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#FFFFFF", margin: "0.8rem 0 1rem", letterSpacing: "-1px" }}>
                Request a Physical Facility Inspection &amp; SLA Review
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
                Tour our Bhiwandi, Sonipat, or Bangalore super-hubs. Review our barcode binning stations, packaging drop-test benches, and dedicated carrier handoff bays.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/book-meeting"
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(217, 119, 6, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>BOOK FACILITY WALKTHROUGH →</span>
              </Link>

              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "50px",
                  padding: "0 1.8rem",
                  borderRadius: "999px",
                  background: "transparent",
                  border: "1.5px solid rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s ease"
                }}
              >
                <span>Run Fulfillment Audit</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Modal */}
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      <Footer />
    </div>
  );
}
