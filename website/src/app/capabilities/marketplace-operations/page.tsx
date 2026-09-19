"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function MarketplaceOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: "catalog",
      tag: "CORE PILLAR 01",
      title: "Catalogue Architecture & PDP Optimization",
      desc: "Building high-ranking listing hierarchies that rank higher organically, eliminate variation fragmentation, and convert traffic into confirmed revenue.",
      deliverables: [
        "Keyword-indexed Title, 5-point Benefit Hierarchy & Backend Search Terms",
        "Multi-angle 3D lifestyle imagery, unboxing videos, and Brand Story module",
        "A+ Enhanced Brand Content (EBC) with dynamic comparison matrices",
        "Automated backend attribute auditing to prevent stealth search suppression"
      ],
      metric: "99.8%",
      metricLabel: "Listing Health Index",
      previewTitle: "Catalog Quality Scorecard",
      previewItems: [
        { label: "Title Keyword Density", value: "98/100", status: "Optimal" },
        { label: "Backend Search Terms Index", value: "249/250 bytes", status: "Full" },
        { label: "Variation Tree Health", value: "100% Parented", status: "Active" },
        { label: "A+ Content Conversion Lift", value: "+28.4%", status: "Verified" }
      ]
    },
    {
      id: "buybox",
      tag: "CORE PILLAR 02",
      title: "Algorithmic Buybox Management & Price Parity",
      desc: "Defending your brand's Buybox share 24/7 with automated algorithmic pricing rules that protect offline channel profitability.",
      deliverables: [
        "Automated repricing rules tied to inventory velocity and competitor bid behavior",
        "Strict enforcement of Minimum Advertised Price (MAP) against rogue resellers",
        "Real-time Buybox win telemetry with sub-5 minute displacement alerts",
        "Cross-platform price parity checks across Amazon, Flipkart, and Quick Commerce"
      ],
      metric: "98.4%",
      metricLabel: "Average Buybox Win Rate",
      previewTitle: "Buybox Algorithm Monitor",
      previewItems: [
        { label: "Prime/Assured Eligibility", value: "100%", status: "Guaranteed" },
        { label: "Unauthorized Seller Detection", value: "0 Active", status: "Clean" },
        { label: "MAP Price Compliance", value: "99.9%", status: "Protected" },
        { label: "Average Response Time", value: "4.2 mins", status: "Sub-5m" }
      ]
    },
    {
      id: "account-health",
      tag: "CORE PILLAR 03",
      title: "Account Health & Policy Compliance Defense",
      desc: "Preventing sudden category gating and account suspensions through proactive monitoring of order defect rates and buyer feedback.",
      deliverables: [
        "24/7 continuous Seller Central account health telemetry across all portals",
        "Rapid dispute management for unfair or retaliatory buyer reviews",
        "Immediate resolution of counterfeit claims, trademark warnings, and safety flags",
        "Custom Plan of Action (POA) documentation for reinstated ASINs within 48 hours"
      ],
      metric: "0.08%",
      metricLabel: "Order Defect Rate (SLA < 1%)",
      previewTitle: "Seller Central Health Dossier",
      previewItems: [
        { label: "Account Health Rating", value: "250 / 250", status: "Healthy" },
        { label: "Late Dispatch Rate (LDR)", value: "0.04%", status: "Exceptional" },
        { label: "Pre-Fulfillment Cancel Rate", value: "0.01%", status: "Zero Strike" },
        { label: "Policy Compliance Warnings", value: "0 Open", status: "Clean" }
      ]
    },
    {
      id: "order-flow",
      tag: "CORE PILLAR 04",
      title: "Order Flow Synchronization & Warehouse Hand-off",
      desc: "Automating the flow of incoming marketplace orders directly into warehouse pick-and-pack queues to beat strict daily carrier cutoffs.",
      deliverables: [
        "Sub-15 minute automated order ingestion across 10+ major marketplaces",
        "Batch generation of shipping labels, tax invoices, and carrier dispatch manifests",
        "Deep integration with Amazon Easy Ship, Flipkart Smart, and specialized bulky 3PLs",
        "Automated buffer alarms that hold inventory before out-of-stock penalties occur"
      ],
      metric: "< 45m",
      metricLabel: "Order-to-Manifest Cycle Time",
      previewTitle: "Dispatch SLA Radar",
      previewItems: [
        { label: "Daily Batch Manifests", value: "3 Cycles / Day", status: "On-Time" },
        { label: "Carrier Pickup SLA", value: "99.7%", status: "Met" },
        { label: "Cross-Dock Transit Sync", value: "Real-Time", status: "Active" },
        { label: "Inventory Buffer Accuracy", value: "99.92%", status: "Verified" }
      ]
    },
    {
      id: "promotions",
      tag: "CORE PILLAR 05",
      title: "Promotional Calendar & Mega Sale Surge Planning",
      desc: "Engineering high-converting promotional calendars for Amazon Great Indian Festival, Flipkart Big Billion Days, and seasonal brand surges.",
      deliverables: [
        "Strategic deal submission for Lightning Deals, Best Deals, Brand Spotlight, and SuperCoins",
        "Curated coupon ladders and virtual bundle creation to lift Average Order Value (AOV)",
        "Pre-sale stock allocation across strategic regional warehouse fulfillment centers",
        "Real-time event pricing and inventory velocity adjustments during peak traffic hours"
      ],
      metric: "4.8x",
      metricLabel: "Peak Festive Velocity Surge",
      previewTitle: "Mega Sale Command Console",
      previewItems: [
        { label: "Deal Slot Approval Rate", value: "94.2%", status: "Prime Slots" },
        { label: "Pre-Allocated Festive Stock", value: "100%", status: "Staged" },
        { label: "AOV Lift via Bundling", value: "+32%", status: "Expanded" },
        { label: "Stockout Incidence", value: "0%", status: "Protected" }
      ]
    },
    {
      id: "customer-sentiment",
      tag: "CORE PILLAR 06",
      title: "Buyer-Seller Messaging & Sentiment Mining",
      desc: "Turning customer reviews and product inquiries into actionable improvements while maintaining sub-12 hour customer messaging SLAs.",
      deliverables: [
        "Guaranteed 12-hour response SLA across Amazon Buyer-Seller Messaging and Flipkart Tickets",
        "Granular review sentiment categorization (transit packaging, electrical fitment, durability)",
        "Proactive publishing of verified customer FAQs directly on high-traffic PDP listings",
        "Compliant automated review request sequences to build organic 4.5+ star review moats"
      ],
      metric: "4.6 ★",
      metricLabel: "Portfolio Average Rating",
      previewTitle: "Customer Sentiment Analytics",
      previewItems: [
        { label: "Buyer Message Response Time", value: "3.4 Hours", status: "Fast" },
        { label: "Positive Review Ratio", value: "92.1%", status: "Moat" },
        { label: "Packaging Feedback Loop", value: "Weekly", status: "Iterated" },
        { label: "Customer Questions Answered", value: "100%", status: "Zero Pending" }
      ]
    }
  ];

  const cadenceSchedule = [
    {
      time: "09:00 AM",
      phase: "Morning Dawn Sweep",
      badge: "Compliance & Sync",
      tasks: [
        "Audit overnight orders across Amazon, Flipkart, Myntra & Blinkit",
        "Inspect Account Health dashboard for policy warnings or intellectual property flags",
        "Verify Buybox status across top 20% revenue-driving hero SKUs"
      ]
    },
    {
      time: "11:30 AM",
      phase: "First Dispatch Cutoff",
      badge: "Logistics Hand-off",
      tasks: [
        "Generate unified batch picklists and GST tax invoices for warehouse docks",
        "Synchronize courier tracking IDs and schedule Amazon Easy Ship / 3PL pickups",
        "Verify dark-store purchase orders for Blinkit, Zepto, and Instamart"
      ]
    },
    {
      time: "03:00 PM",
      phase: "Pricing & Buybox Recalibration",
      badge: "Margin Defense",
      tasks: [
        "Run automated MAP compliance scan to catch rogue third-party seller discounts",
        "Adjust automated repricing limits based on real-time competitor stock depletion",
        "Audit ad-spend attribution to ensure Buybox is active on sponsored listings"
      ]
    },
    {
      time: "06:30 PM",
      phase: "Evening Carrier Manifest",
      badge: "SLA Lock",
      tasks: [
        "Finalize end-of-day carrier pickup reconciliation and signed manifest filing",
        "Resolve buyer inquiries within Buyer-Seller Messaging before the 12-hour timer",
        "Flag return shipments in transit and schedule replacement orders where required"
      ]
    },
    {
      time: "11:00 PM",
      phase: "Night Automated Guard",
      badge: "24/7 Watchdog",
      tasks: [
        "Automated scraper checks for midnight unauthorized pricing violations",
        "Buffer alarms prevent out-of-stock listings from receiving unfillable orders",
        "Daily operational summary and GMV telemetry pushed to executive dashboards"
      ]
    }
  ];

  const comparisonRows = [
    {
      metric: "Listing Suppression Handling",
      traditional: "Discovered days after sales drop when someone notices search absence.",
      goodlife: "Proactive 24/7 telemetry detects missing backend attributes within 15 minutes."
    },
    {
      metric: "Buybox Management",
      traditional: "Manual price checks once a day; Buybox lost to grey-market sellers overnight.",
      goodlife: "Algorithmic repricer + MAP legal enforcement recaptures Buybox in sub-10 minutes."
    },
    {
      metric: "Order Processing & Dispatch",
      traditional: "Excel exports uploaded manually at 4 PM; frequent late-dispatch seller strikes.",
      goodlife: "Automated real-time ERP-to-dock routing with multi-batch label generation."
    },
    {
      metric: "Account Health & Policy Defense",
      traditional: "Junior executive responds after ASIN is suspended; slow and vague appeals.",
      goodlife: "Dedicated policy attorneys and former marketplace executives draft rapid POAs."
    },
    {
      metric: "Festive Mega Sale Readiness",
      traditional: "Deal forms submitted last minute; stock sits stuck at state checkposts during BBD.",
      goodlife: "45-day advance stock placement in 12 regional hub centers with guaranteed Prime slots."
    }
  ];

  return (
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(37, 99, 235, 0.35);
        }
        @media (max-width: 991px) {
          .ops-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .ops-tabs-container { grid-template-columns: repeat(2, 1fr) !important; }
          .ops-active-card { grid-template-columns: 1fr !important; padding: 1.8rem !important; gap: 2rem !important; }
          .stats-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .ops-tabs-container { grid-template-columns: 1fr !important; }
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
          .ops-banner-box { padding: 2rem 1.5rem !important; }
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
          background: "radial-gradient(circle, rgba(125, 211, 252, 0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#64748B" }}>Capabilities</span>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Marketplace Operations</span>
          </div>

          <div className="ops-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
                border: "1.5px solid #BFDBFE",
                color: "#1D4ED8",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
                CAPABILITY 01 • MISSION-CRITICAL PLATFORM OPERATIONS
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Marketplace Operations: <br />
                <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #0284C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Zero-SLA-Defect Precision &amp; 99.8% Buybox Defense
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Marketplace algorithms ruthlessly penalize late dispatches, broken variations, out-of-stock cancellations, and suppressed listings. Good Life provides enterprise-grade 24/7 seller operations across Amazon, Flipkart, Blinkit, and Myntra with automated catalog monitoring, dynamic repricing, and guaranteed policy compliance.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE OPERATIONS AUDIT →</span>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Evaluate Channel Gaps</span>
                </button>
              </div>

            </div>

            {/* Right: Live Operations Console Mockup (Floating Glass Card) */}
            <div>
              <div className="glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 8px #16A34A" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#1E3A8A" }}>
                      Operations Control Center
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#2563EB", background: "#EFF6FF", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* 4 Health Telemetry Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Amazon Buybox</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#2563EB", marginTop: "2px" }}>98.4%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>▲ +4.2% vs industry avg</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Order Defect Rate</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>0.08%</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: "2px", fontWeight: 600 }}>SLA Threshold: &lt;1.00%</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Catalog Health</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#D97706", marginTop: "2px" }}>99.8%</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: "2px", fontWeight: 600 }}>Zero search suppression</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Flipkart Assured</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#7C3AED", marginTop: "2px" }}>100%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>Full badge coverage</div>
                  </div>
                </div>

                {/* Real-time incident stream */}
                <div style={{ background: "#F1F5F9", borderRadius: "12px", padding: "0.85rem", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#1E3A8A", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Automated Event Stream
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.76rem", color: "#334155" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "#16A34A", fontWeight: 800 }}>[09:14]</span>
                      <span>Amazon IN: Rogue reseller undercutting MAP detected. Price enforcement resolved.</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "#2563EB", fontWeight: 800 }}>[08:45]</span>
                      <span>Flipkart: 240 units synchronized to Bhiwandi hub for Big Billion Days staging.</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600 }}>142 incidents prevented this quarter</span>
                  <span style={{ fontSize: "0.74rem", color: "#2563EB", fontWeight: 800 }}>All Systems Nominal ✓</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS (Matching Home Page Screenshot 2) ── */}
          <div className="stats-grid-responsive" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "99.8%",
                label: "Listing Health Index",
                description: "Zero search suppression across 15+ marketplaces",
                tag: "Catalog Health",
                tagColor: "#2563EB",
                tagBg: "#EFF6FF",
                borderColor: "rgba(37, 99, 235, 0.2)",
                subText: "100% Parented Variations"
              },
              {
                value: "98.4%",
                label: "Average Buybox Win",
                description: "Algorithmic repricing protecting offline dealer margins",
                tag: "Buybox Shield",
                tagColor: "#0D9488",
                tagBg: "#F0FDFA",
                borderColor: "rgba(13, 148, 136, 0.2)",
                subText: "Sub-5 Min Recapture Time"
              },
              {
                value: "< 45m",
                label: "Order-to-Manifest SLA",
                description: "Automated warehouse batch picking & courier handoff",
                tag: "Dispatch Velocity",
                tagColor: "#7C3AED",
                tagBg: "#FAF5FF",
                borderColor: "rgba(124, 58, 237, 0.2)",
                subText: "3 Daily Outbound Cycles"
              },
              {
                value: "0.08%",
                label: "Order Defect Rate (ODR)",
                description: "Strict policy compliance avoiding category gating",
                tag: "Account Armor",
                tagColor: "#059669",
                tagBg: "#F0FDF4",
                borderColor: "rgba(5, 150, 105, 0.2)",
                subText: "SLA Threshold < 1.00%",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
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
                    <div style={{ width: "94%", height: "100%", background: "#059669" }} />
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

      {/* ── 2. INTERACTIVE 6-TAB CONTROL STATION ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Comprehensive Operations Suite
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Six Engineered Deliverables That Power Daily Marketplace Sales
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Select a control module below to explore how Good Life manages your listings, defends pricing integrity, protects your seller account, and executes flawless dispatches.
            </p>
          </div>

          {/* Interactive Tab Selectors (Light Glassmorphic Pill Row) */}
          <div className="ops-tabs-container" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "0.5rem",
            background: "#F1F5F9",
            padding: "0.5rem",
            borderRadius: "18px",
            marginBottom: "2.5rem"
          }}>
            {pillars.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: "0.9rem 0.6rem",
                  borderRadius: "14px",
                  border: "none",
                  background: activeTab === idx ? "#FFFFFF" : "transparent",
                  color: activeTab === idx ? "#2563EB" : "#475569",
                  fontWeight: activeTab === idx ? 800 : 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  boxShadow: activeTab === idx ? "0 4px 15px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.18s ease",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: activeTab === idx ? "#2563EB" : "#94A3B8", marginBottom: "3px" }}>
                  {p.tag}
                </div>
                <div>{p.title.split("&")[0]}</div>
              </button>
            ))}
          </div>

          {/* Active Tab Deep-Dive Display Card */}
          <div className="ops-active-card glass-card" style={{
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "center"
          }}>
            {/* Left: Description & Deliverables Checklist */}
            <div>
              <div style={{ display: "inline-block", background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, marginBottom: "1rem" }}>
                {pillars[activeTab].tag}
              </div>
              <h3 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.5px" }}>
                {pillars[activeTab].title}
              </h3>
              <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                {pillars[activeTab].desc}
              </p>

              <div style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#0F172A", marginBottom: "0.85rem" }}>
                Key Operational Deliverables:
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {pillars[activeTab].deliverables.map((item, dIdx) => (
                  <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#DCFCE7", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", fontSize: "0.7rem", fontWeight: 900 }}>
                      ✓
                    </div>
                    <span style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.5, fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dedicated Metric & Interactive Preview Box */}
            <div style={{
              background: "#F8FAFC",
              borderRadius: "18px",
              padding: "2rem",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1.5px solid #E2E8F0", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
                    Target Benchmark
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#2563EB", lineHeight: 1.1, marginTop: "0.2rem" }}>
                    {pillars[activeTab].metric}
                  </div>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", textAlign: "right", maxWidth: "160px" }}>
                  {pillars[activeTab].metricLabel}
                </div>
              </div>

              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
                {pillars[activeTab].previewTitle}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {pillars[activeTab].previewItems.map((pi, piIdx) => (
                  <div key={piIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.8rem", background: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>{pi.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A" }}>{pi.value}</span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#16A34A", background: "#DCFCE7", padding: "2px 6px", borderRadius: "4px" }}>
                        {pi.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    display: "block",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    background: "#0F172A",
                    color: "#FFFFFF",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    textAlign: "center"
                  }}
                >
                  Request Detailed Audit for This Pillar →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. THE 24-HOUR OPERATING RHYTHM (CHRONOLOGICAL TIMELINE) ── */}
      <section style={{ padding: "5.5rem 0", background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Flawless Daily Execution
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Our 24-Hour Operator Cadence
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Marketplaces operate around the clock. Here is the exact chronologically scheduled workflow our account managers execute every single business day.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {cadenceSchedule.map((cs, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: "1.8rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#2563EB", fontFamily: "monospace" }}>
                      {cs.time}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#1D4ED8", background: "#EFF6FF", padding: "2px 7px", borderRadius: "6px" }}>
                      {cs.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem" }}>
                    {cs.phase}
                  </h4>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    {cs.tasks.map((task, tIdx) => (
                      <div key={tIdx} style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                        <span style={{ color: "#2563EB", fontWeight: 800 }}>•</span>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem", paddingTop: "0.85rem", borderTop: "1px solid #F1F5F9", fontSize: "0.75rem", color: "#16A34A", fontWeight: 700 }}>
                  ✓ Standardized Protocol
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. PROBLEM VS GOODLIFE OPERATIONAL ARCHITECTURE ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Operational Comparison
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Traditional In-House / Agency vs. Good Life Sutra
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: 1.6 }}>
              Why brands transition from junior portal executives to our dedicated institutional commerce operating cell.
            </p>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#F8FAFC", borderRadius: "20px", border: "1.5px solid #E2E8F0", overflow: "hidden", minWidth: "600px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#0B1736", color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <th style={{ padding: "1.2rem 1.5rem", width: "25%" }}>Operational Metric</th>
                    <th style={{ padding: "1.2rem 1.5rem", width: "37.5%", color: "#FCA5A5" }}>Legacy / Junior In-House Model</th>
                    <th style={{ padding: "1.2rem 1.5rem", width: "37.5%", color: "#86EFAC" }}>Good Life Dedicated Operating Cell</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((cr, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 800, color: "#0F172A", fontSize: "0.88rem" }}>
                        {cr.metric}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        <span style={{ color: "#EF4444", fontWeight: 800, marginRight: "0.35rem" }}>✗</span>
                        {cr.traditional}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#0F172A", fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 600 }}>
                        <span style={{ color: "#16A34A", fontWeight: 800, marginRight: "0.35rem" }}>✓</span>
                        {cr.goodlife}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. STRATEGIC EXECUTIVE AUDIT BANNER (Dark Navy Luxury Finish) ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-banner-box" style={{
            background: "linear-gradient(135deg, #0B1736 0%, #0F2557 100%)",
            borderRadius: "28px",
            padding: "3.5rem 3rem",
            color: "#FFFFFF",
            boxShadow: "0 25px 60px rgba(11, 23, 54, 0.25)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ maxWidth: "680px", position: "relative", zIndex: 2 }}>
              <span style={{ display: "inline-block", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "1.5px", color: "#60A5FA", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Ready to Upgrade Your Daily Operations?
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, margin: "0 0 1rem", lineHeight: 1.2, letterSpacing: "-0.8px" }}>
                Book an Executive Account Health &amp; Operations Audit
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2rem" }}>
                Let our senior operations leadership run a forensic review of your Amazon, Flipkart, and Blinkit accounts. We uncover hidden search suppressions, Buybox leaks, and logistics SLA bottlenecks within 48 hours under NDA.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "50px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)"
                  }}
                >
                  <span>SCHEDULE 30-MIN STRATEGY SESSION →</span>
                </Link>

                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "50px",
                    padding: "0 1.6rem",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: "pointer"
                  }}
                >
                  Run 3-Min Diagnostic Evaluation
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
