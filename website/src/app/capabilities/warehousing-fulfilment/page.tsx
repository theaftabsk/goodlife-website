"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function WarehousingFulfilmentPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const regionalHubs = [
    {
      region: "North",
      name: "Sonipat Mega-FC (Delhi-NCR)",
      badge: "NORTH CORRIDOR",
      sqft: "160,000 Sq. Ft.",
      docks: "12 Inbound / Outbound Docks",
      throughput: "32,000 Parcels / Day",
      palletCapacity: "18,000 Pallets",
      carriers: "Amazon Seller Flex, Flipkart Smart, Delhivery, Blue Dart, Gati",
      storageType: "Multi-Tier Mezzanine + Heavy Bulk Staging",
      highlight: "Positioned on the KMP Expressway cluster, ensuring sub-12hr dispatch across Delhi, Haryana, Punjab, and West UP."
    },
    {
      region: "West",
      name: "Bhiwandi Super-Hub (Mumbai)",
      badge: "WEST GATEWAY",
      sqft: "185,000 Sq. Ft.",
      docks: "14 Automated Dock Doors",
      throughput: "28,000 Parcels / Day",
      palletCapacity: "22,500 Pallets",
      carriers: "Amazon ATS, Flipkart Ekart, Delhivery, Blue Dart, Gati",
      storageType: "Heavy Pallet Racking + VNA (Very Narrow Aisle)",
      highlight: "Direct NH-48 port connectivity allowing 4-hour container offloading and same-day marketplace cross-docking."
    },
    {
      region: "South",
      name: "Hoskote Tech-Hub (Bangalore)",
      badge: "SOUTH TECH CORE",
      sqft: "120,000 Sq. Ft.",
      docks: "10 Fast-Track Dock Bays",
      throughput: "22,000 Parcels / Day",
      palletCapacity: "14,000 Pallets",
      carriers: "Ekart, Amazon Logistics, Delhivery Prime, Blue Dart",
      storageType: "Climate-Assisted Electronics & Appliance Racks",
      highlight: "Dedicated high-velocity packing lanes for consumer electronics, home decor, and appliances with ESD-safe stations."
    },
    {
      region: "East",
      name: "Dankuni Logistics Node (Kolkata)",
      badge: "EAST CORRIDOR",
      sqft: "95,000 Sq. Ft.",
      docks: "8 Multi-Modal Docks",
      throughput: "14,500 Parcels / Day",
      palletCapacity: "10,500 Pallets",
      carriers: "Delhivery Surface, Blue Dart Air, Ekart East Hub, Gati",
      storageType: "Heavy Corrugated & Palletized Storage",
      highlight: "Eastern nexus connecting West Bengal, Odisha, Bihar, and Northeast feeder lines with zero regional choke-points."
    }
  ];

  const packagingAnatomy = [
    {
      id: "carton",
      name: "5-Layer / 7-Layer Corrugated Master Carton",
      spec: "250+ GSM Virgin Kraft Liner",
      tolerance: "45 kg Vertical Compression",
      desc: "Engineered with heavy-grade fluting to absorb multi-tier stacking inside long-haul freight trucks without sidewall buckling."
    },
    {
      id: "foam",
      name: "Custom CNC-Cut EPE Corner Foam Protectors",
      spec: "High-Density Contoured Inserts",
      tolerance: "ISTA-3A Drop-Test Certified",
      desc: "Shock-absorbing polyethylene cushions molded tightly to the product frame, eliminating internal transit shifting."
    },
    {
      id: "strapping",
      name: "Cross-Woven Filament Strapping & Tamper Void Tape",
      spec: "Fiberglass Reinforced + Serialized Barcode",
      tolerance: "Anti-Pilferage Locked",
      desc: "High-tensile cross-weave strapping preventing burst damage, paired with tamper-evident tape that reveals open attempts."
    }
  ];

  const conveyorStages = [
    {
      step: "01",
      title: "Inwarding & Barcode Tagging",
      desc: "Dock check-in with 3D volumetric cubing scales capturing weight, dimensions, and lot numbers into WMS within 120 minutes."
    },
    {
      step: "02",
      title: "Climate-Controlled Storage",
      desc: "Temperature-regulated zone allocation preventing cosmetic degradation, moisture ingress, or battery depreciation."
    },
    {
      step: "03",
      title: "Batch Wave Picking",
      desc: "Algorithmic pick-path sequencing guiding operators along the shortest physical warehouse route to beat hourly cutoffs."
    },
    {
      step: "04",
      title: "Drop-Tested Packing",
      desc: "Dual-scale check-weighting packing stations with barcode-verified accessory inclusion and drop-test packaging."
    },
    {
      step: "05",
      title: "Carrier Manifest Handoff",
      desc: "Dedicated dock staging lanes for Amazon Easy Ship, Ekart, and Delhivery with signed digital manifests by 2:00 PM."
    }
  ];

  const carrierCutoffs = [
    { carrier: "Amazon Easy Ship / ATS", cutoff: "11:30 AM & 03:30 PM", sla: "Same-Day Dispatch", badge: "Direct Hand-off" },
    { carrier: "Flipkart Smart / Ekart", cutoff: "01:00 PM & 05:00 PM", sla: "Sub-4hr Processing", badge: "Assured Lane" },
    { carrier: "Delhivery Surface & Express", cutoff: "02:30 PM & 06:30 PM", sla: "Linehaul Manifest", badge: "Pan-India Linehaul" },
    { carrier: "Quick Commerce (Blinkit / Zepto)", cutoff: "Hourly Continuous Flow", sla: "Sub-45m Dispatch", badge: "Dark Store Sync" }
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <style>{`
        .light-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .light-panel:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(217, 119, 6, 0.08);
          border-color: #FDE68A;
        }
        @media (max-width: 991px) {
          .wh-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hubs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .conveyor-desktop { display: none !important; }
          .conveyor-mobile { display: flex !important; }
        }
        @media (max-width: 640px) {
          .hubs-grid { grid-template-columns: 1fr !important; }
          .cta-inner-box { padding: 2rem 1.5rem !important; }
        }
      `}</style>
      
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section style={{
        paddingTop: "9rem",
        paddingBottom: "5.5rem",
        background: "linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="wh-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Messaging */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: "999px", marginBottom: "1.25rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#92400E", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  CAPABILITY 04 // REGIONAL FULFILMENT INFRASTRUCTURE
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.3rem, 4.5vw, 3.8rem)",
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: "0 0 1.25rem"
              }}>
                Institutional Warehousing Built for Zero-Defect Marketplace SLAs
              </h1>

              <p style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#475569",
                lineHeight: 1.65,
                margin: "0 0 2rem",
                maxWidth: "580px"
              }}>
                Over 645,000 sq. ft. of enterprise-grade Grade-A fulfillment centers across North, West, South, and East India. Integrated with Amazon Seller Flex, Flipkart Smart, and leading logistics networks.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  REQUEST DIAGNOSTIC →
                </button>

                <Link
                  href="/book-meeting"
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#EFF6FF";
                    e.currentTarget.style.borderColor = "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#BFDBFE";
                  }}
                >
                  Schedule Strategy Session
                </Link>
              </div>
            </div>

            {/* Right: Live Warehouse Dock Terminal (White Dashboard) */}
            <div style={{
              background: "#FFFFFF",
              border: "1.5px solid #FDE68A",
              borderRadius: "24px",
              boxShadow: "0 12px 35px rgba(217, 119, 6, 0.05), 0 2px 6px rgba(15, 23, 42, 0.03)",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "1rem 1.5rem",
                background: "#FFFBEB",
                borderBottom: "1px solid #FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#92400E", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    LIVE WAREHOUSE DOCK TERMINAL
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#D97706", fontWeight: 700, background: "#FEF3C7", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  14 DOCKS OPERATIONAL
                </div>
              </div>

              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                
                {/* Metric 1 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B" }}>Same-Day Dispatch Rate</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      Target &gt;99.0%
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                    99.4%
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: "99.4%", height: "100%", background: "linear-gradient(90deg, #D97706 0%, #16A34A 100%)" }} />
                  </div>
                </div>

                {/* Metric 2 & 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Active Regional Nodes</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A" }}>12 FCs</div>
                    <div style={{ fontSize: "0.72rem", color: "#D97706", fontWeight: 700 }}>645,000+ sq. ft.</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Transit Breakage Rate</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16A34A" }}>0.38%</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>Bench &gt;2.5%</div>
                  </div>
                </div>

                {/* Inwarding Latency */}
                <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#D97706", fontWeight: 800 }}>⚡</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#92400E" }}>Dock-to-Stock Latency</span>
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#D97706" }}>&lt;4 HOURS</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. 12-NODE REGIONAL NETWORK EXPLORER ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#D97706", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PAN-INDIA SUPER-HUB DIRECTORY
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              12 Managed Regional Fulfillment Nodes
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Select a strategic hub below to inspect dock capacities, throughput velocity, and integrated carrier partner networks.
            </p>
          </div>

          <div className="hubs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
            {regionalHubs.map((h, idx) => {
              const isSelected = activeRegion === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveRegion(idx)}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "18px",
                    border: isSelected ? "1.5px solid #D97706" : "1px solid #E2E8F0",
                    background: isSelected ? "#FFFBEB" : "#FFFFFF",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 4px 14px rgba(217, 119, 6, 0.08)" : "0 2px 6px rgba(15, 23, 42, 0.02)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: isSelected ? "#D97706" : "#94A3B8", marginBottom: "0.35rem" }}>
                    {h.badge}
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: isSelected ? "#92400E" : "#0F172A", marginBottom: "0.5rem" }}>
                    {h.region} Facility
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.4 }}>
                    {h.sqft} • {h.docks}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Facility Detail Panel */}
          {(() => {
            const cur = regionalHubs[activeRegion];
            return (
              <div style={{ background: "#FFFFFF", border: "1px solid #FDE68A", borderRadius: "22px", padding: "2.5rem", boxShadow: "0 8px 30px rgba(217, 119, 6, 0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#D97706", background: "#FEF3C7", padding: "0.25rem 0.65rem", borderRadius: "6px" }}>
                      {cur.badge}
                    </span>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0.75rem 0 0.35rem" }}>
                      {cur.name}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, maxWidth: "700px" }}>
                      {cur.highlight}
                    </p>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "0.75rem 1.25rem", textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Daily Throughput</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>{cur.throughput}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", borderTop: "1px solid #E2E8F0", paddingTop: "1.5rem" }}>
                  <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.25rem" }}>Integrated Carriers</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>{cur.carriers}</div>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.25rem" }}>Storage Infrastructure</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>{cur.storageType}</div>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "12px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.25rem" }}>Pallet Capacity</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>{cur.palletCapacity}</div>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 3. HEAVY & BULKY PACKAGING ANATOMY ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              ZERO-DAMAGE TRANSIT ENGINEERING
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Heavy &amp; Bulky Drop-Test Packaging Anatomy
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              How Good Life achieves a 0.38% transit breakage rate on large appliances, mirrors, and bulky furniture.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {packagingAnatomy.map((pa, idx) => (
              <div key={idx} className="light-panel" style={{ padding: "2rem 1.75rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#D97706", background: "#FEF3C7", padding: "0.2rem 0.6rem", borderRadius: "6px", display: "inline-block", marginBottom: "0.85rem" }}>
                  LAYER 0{idx + 1} SPECIFICATION
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.3 }}>
                  {pa.name}
                </h4>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#D97706", marginBottom: "0.3rem" }}>
                  {pa.spec}
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.2rem 0.5rem", borderRadius: "4px", display: "inline-block", marginBottom: "1rem" }}>
                  ✓ {pa.tolerance}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  {pa.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. 5-STAGE WAREHOUSE CONVEYOR FLOW ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#D97706", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              DOCK-TO-CARRIER EXECUTION
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The 5-Stage Warehouse Conveyor Pipeline
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              From initial container unlading to sealed manifest hand-off, each step is monitored by barcoded WMS checkpoints.
            </p>
          </div>

          {/* Desktop Horizontal */}
          <div className="conveyor-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {conveyorStages.map((cs, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.5rem 1.25rem", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {cs.step}
                </div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.35 }}>
                  {cs.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                  {cs.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Vertical */}
          <div className="conveyor-mobile" style={{ display: "none", flexDirection: "column", gap: "1rem" }}>
            {conveyorStages.map((cs, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>
                    {cs.step}
                  </span>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    {cs.title}
                  </h4>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                  {cs.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CARRIER OUTBOUND CUTOFF BOARD ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              CARRIER CUTOFF SLA DISPATCH BOARD
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Automated Carrier Sync &amp; Dispatch Cadence
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Fixed carrier pickup windows guaranteeing zero late-dispatch rate (LDR) strikes on your seller portal scorecards.
            </p>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", overflow: "hidden", minWidth: "620px", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <th style={{ padding: "1.1rem 1.5rem", width: "30%", color: "#0F172A" }}>Carrier Network</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "25%", color: "#D97706" }}>Daily Manifest Cutoff</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "25%", color: "#16A34A" }}>Guaranteed Processing SLA</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "20%", color: "#2563EB" }}>Staging Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {carrierCutoffs.map((cc, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#FFFBEB" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>
                        {cc.carrier}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#D97706", fontSize: "0.85rem", fontWeight: 700 }}>
                        {cc.cutoff}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#16A34A", fontSize: "0.85rem", fontWeight: 700 }}>
                        ✓ {cc.sla}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#475569", fontSize: "0.82rem", fontWeight: 600 }}>
                        {cc.badge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. LIGHT ENTERPRISE EXECUTIVE CTA BANNER ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div
            className="cta-inner-box"
            style={{
              background: "linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%)",
              border: "1.5px solid #FDE68A",
              borderRadius: "24px",
              padding: "3.5rem 3rem",
              boxShadow: "0 10px 30px rgba(217, 119, 6, 0.06)"
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#D97706", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY WAREHOUSING DIAGNOSTIC
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Upgrade Your Marketplace Dispatch SLAs to Prime Standard
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our logistics leadership evaluate your dispatch latency, transit breakage rates, and regional hub coverage. We deliver a custom multi-node warehousing blueprint within 48 hours under NDA.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  SCHEDULE 30-MIN STRATEGY SESSION →
                </Link>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                >
                  Request Diagnostic
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer hideTopBanner={true} />

      <CommerceDiagnosticModal
        isOpen={diagOpen}
        onClose={() => setDiagOpen(false)}
      />
    </div>
  );
}
