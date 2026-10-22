"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { ArrowRight, Check, X, Shield, Activity } from "lucide-react";
import "./marketplace-operations.css";

export default function MarketplaceOperationsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [activeCadence, setActiveCadence] = useState(0);

  const telemetryMetrics = [
    {
      platform: "Amazon IN",
      label: "Amazon Buybox Win Rate",
      value: "98.4%",
      target: "Target >97.0%",
      status: "PROTECTED",
      statusColor: "#16A34A",
      statusBg: "#ECFDF3",
      progress: 98.4,
      trend: "+1.2% vs 30d avg"
    },
    {
      platform: "Multi-Channel",
      label: "Order Defect Rate (ODR)",
      value: "0.08%",
      target: "Amazon Ceiling <1.00%",
      status: "OPTIMAL",
      statusColor: "#16A34A",
      statusBg: "#ECFDF3",
      progress: 8,
      trend: "Zero Policy Strikes"
    },
    {
      platform: "Global Master",
      label: "Active Catalog Health",
      value: "99.8%",
      target: "2,400+ Active SKUs",
      status: "HEALTHY",
      statusColor: "#16A34A",
      statusBg: "#ECFDF3",
      progress: 99.8,
      trend: "0 Search Suppressed"
    },
    {
      platform: "Flipkart",
      label: "Flipkart Assured Badge",
      value: "100%",
      target: "Gold Tier Fulfillment SLA",
      status: "SYNCHRONIZED",
      statusColor: "#16A34A",
      statusBg: "#ECFDF3",
      progress: 100,
      trend: "100% In-Stock Node"
    }
  ];

  const liveEvents = [
    { time: "09:14 AM", platform: "Amazon IN", desc: "Rogue reseller undercutting MAP detected. Price enforcement resolved in 4 mins.", tag: "RESOLVED" },
    { time: "08:45 AM", platform: "Flipkart", desc: "240 units synchronized to Bhiwandi hub. Inventory buffer restored to 100%.", tag: "SYNCED" },
    { time: "08:12 AM", platform: "Blinkit", desc: "Flash stock replenishment triggered across 18 dark stores before morning rush.", tag: "DISPATCHED" },
    { time: "07:30 AM", platform: "Multi-Node", desc: "Automated flat-file indexing audit completed across 2,400+ PDPs. Zero suppressions.", tag: "VERIFIED" }
  ];

  const fourMetrics = [
    {
      num: "99.8%",
      label: "Catalog Health Index",
      desc: "Zero hidden search suppressions, automated variation parenting, and synchronized attribute tagging.",
      badge: "Zero Suppression",
      progress: "99.8%"
    },
    {
      num: "98.4%",
      label: "Buybox Shield Win Rate",
      desc: "Sub-5 min automated repricing engine neutralizing rogue resellers and unauthorized price undercutters.",
      badge: "Algorithmic Protection",
      progress: "98.4%"
    },
    {
      num: "<45m",
      label: "Order Dispatch Velocity",
      desc: "Direct ERP-to-dock routing with automated batch tax invoicing and courier pickup lock-in.",
      badge: "Same-Day Hand-off",
      progress: "96.5%"
    },
    {
      num: "0.08%",
      label: "Account Armor & Health",
      desc: "Strict SLA buffer monitoring keeping late dispatches and pre-fulfillment cancels far below policy limits.",
      badge: "SLA Compliant",
      progress: "99.2%"
    }
  ];

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
      scorecard: [
        { label: "Title Keyword Density", value: "98/100", status: "Optimal" },
        { label: "Backend Search Terms Index", value: "249/250 bytes", status: "Full" },
        { label: "Variation Tree Health", value: "100% Active", status: "Active" },
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
      scorecard: [
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
      scorecard: [
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
      scorecard: [
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
      scorecard: [
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
      scorecard: [
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
      desc: "Audit overnight orders across Amazon, Flipkart, Myntra & Blinkit. Inspect Account Health for policy warnings or intellectual property flags. Verify Buybox status across top 20% revenue-driving hero SKUs."
    },
    {
      time: "11:30 AM",
      phase: "First Dispatch Cutoff",
      badge: "Logistics Hand-off",
      desc: "Generate unified batch picklists and GST tax invoices for warehouse docks. Synchronize courier tracking IDs and schedule Amazon Easy Ship / 3PL pickups. Verify dark-store purchase orders for Blinkit, Zepto, and Instamart."
    },
    {
      time: "03:00 PM",
      phase: "Pricing & Buybox Recalibration",
      badge: "Margin Defense",
      desc: "Run automated MAP compliance scan to catch rogue third-party seller discounts. Adjust automated repricing limits based on real-time competitor stock depletion. Audit ad-spend attribution to ensure Buybox is active on sponsored listings."
    },
    {
      time: "06:30 PM",
      phase: "Evening Carrier Manifest",
      badge: "SLA Lock",
      desc: "Finalize end-of-day carrier pickup reconciliation and signed manifest filing. Resolve buyer inquiries within Buyer-Seller Messaging before the 12-hour timer. Flag return shipments in transit and schedule replacement orders where required."
    },
    {
      time: "11:00 PM",
      phase: "Night Automated Guard",
      badge: "24/7 Watchdog",
      desc: "Automated scraper checks for midnight unauthorized pricing violations. Buffer alarms prevent out-of-stock listings from receiving unfillable orders. Daily operational summary and GMV telemetry pushed to executive dashboards."
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
    <div className="ops-page-root" style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section className="ops-hero-section">
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-hero-grid">
            
            {/* Left: Authority & Messaging */}
            <div>
              <div className="ops-hero-badge">
                <span className="ops-badge-tag">
                  <span className="ops-pulse" />
                  CAPABILITY 01
                </span>
                <span className="ops-badge-sep">//</span>
                <span className="ops-badge-title">MISSION-CRITICAL PLATFORM OPERATIONS</span>
              </div>

              <h1 className="ops-hero-title">
                Commerce Mission Control for High-Growth Enterprise Brands
              </h1>

              <p className="ops-hero-desc">
                Good Life provides dedicated brand operations cells executing daily catalog maintenance, buybox defense, order synchronization, and account health compliance across Amazon, Flipkart, Blinkit, and quick commerce.
              </p>

              <div className="ops-hero-actions mobile-btn-stack">
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
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>REQUEST DIAGNOSTIC</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
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
                    justifyContent: "center",
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

            {/* Right: Bespoke Live Operations Control Center (Large White Dashboard) */}
            <div className="ops-cockpit-card">
              {/* Dashboard Header Bar */}
              <div className="ops-cockpit-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="ops-pulse" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0F172A", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    LIVE OPERATIONS CONTROL CENTER
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>
                  UPDATED JUST NOW • UTC+05:30
                </div>
              </div>

              {/* 4 Telemetry Rows */}
              <div className="ops-cockpit-body">
                {telemetryMetrics.map((tm, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "14px",
                      padding: "0.95rem 1.15rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem", flexWrap: "wrap", gap: "0.35rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                          {tm.platform}
                        </span>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1E293B" }}>
                          {tm.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: tm.statusColor, background: tm.statusBg, padding: "0.15rem 0.45rem", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <Check size={11} strokeWidth={3} />
                        <span>{tm.status}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                        {tm.value}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600 }}>
                        {tm.target}
                      </div>
                    </div>

                    {/* Progress Fill Visualization */}
                    <div style={{ width: "100%", height: "5px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${Math.min(tm.progress, 100)}%`, height: "100%", background: "linear-gradient(90deg, #2563EB 0%, #16A34A 100%)", borderRadius: "999px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. LIVE EVENT STREAM ── */}
      <section style={{ padding: "2rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="ops-pulse" />
              <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#0F172A", textTransform: "uppercase" }}>
                AUTOMATED EVENT STREAM
              </span>
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.25rem 0.75rem", borderRadius: "999px", border: "1px solid #A7F3D0", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Check size={12} strokeWidth={3} />
              <span>142 incidents prevented this quarter</span>
            </div>
          </div>

          <div className="touch-scroll-row">
            {liveEvents.map((evt, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: "260px",
                  flex: "1 1 260px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "0.95rem 1.15rem",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.02)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B" }}>
                    {evt.time} • {evt.platform}
                  </span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                    {evt.tag}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#334155", margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
                  {evt.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. FOUR OPERATIONS METRICS (Subtle Variations) ── */}
      <section className="ops-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              OPERATIONAL PERFORMANCE BENCHMARKS
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Engineered for Zero-Defect Marketplace Execution
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Institutional metrics maintained every single operating day across all connected brand channels.
            </p>
          </div>

          <div className="metrics-4-grid">
            {fourMetrics.map((m, idx) => (
              <div
                key={idx}
                className="light-panel"
                style={{
                  padding: "1.75rem 1.5rem",
                  borderTop: idx === 1 ? "3px solid #2563EB" : idx === 3 ? "3px solid #16A34A" : "1px solid #E2E8F0"
                }}
              >
                <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "0.2rem 0.6rem", borderRadius: "6px", marginBottom: "0.85rem" }}>
                  {m.badge}
                </div>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {m.num}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.5rem" }}>
                  {m.label}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1rem" }}>
                  {m.desc}
                </p>
                <div style={{ width: "100%", height: "4px", background: "#E2E8F0", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: m.progress, height: "100%", background: "#2563EB", borderRadius: "99px" }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. SIX ENGINEERED DELIVERABLES (Interactive Module Selector) ── */}
      <section className="ops-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              COMPREHENSIVE OPERATIONS SUITE
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Six Engineered Deliverables That Power Daily Marketplace Sales
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Select a control module below to explore how Good Life manages your listings, defends pricing integrity, protects your seller account, and executes flawless dispatches.
            </p>
          </div>

          {/* Module Selector */}
          <div className="ops-modules-grid">
            {pillars.map((p, idx) => {
              const isSelected = activeModule === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveModule(idx)}
                  className={`ops-module-btn ${isSelected ? "ops-module-btn--active" : ""}`}
                >
                  <div className="ops-module-top">
                    <span className="ops-module-tag">{p.tag}</span>
                    {isSelected && <span className="ops-module-active-dot" />}
                  </div>
                  <div className="ops-module-title">
                    {p.title.split("&")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Detail View */}
          {(() => {
            const cur = pillars[activeModule];
            return (
              <div className="ops-detail-card">
                <div className="ops-detail-split">
                  
                  {/* Left: Operational Deliverables */}
                  <div>
                    <div className="ops-pillar-badge">
                      <span className="ops-pillar-pulse" />
                      <span>{cur.tag} ACTIVE SYSTEM</span>
                    </div>
                    <h3 className="ops-pillar-title">
                      {cur.title}
                    </h3>
                    <p className="ops-pillar-desc">
                      {cur.desc}
                    </p>

                    <div className="ops-pillar-deliverables">
                      {cur.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="ops-deliverable-item">
                          <Check size={14} strokeWidth={3} color="#16A34A" className="ops-deliverable-check" />
                          <span className="ops-deliverable-text">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Target Benchmark Scorecard */}
                  <div className="ops-scorecard-box">
                    <div className="ops-scorecard-header">
                      <span className="ops-scorecard-title">
                        TARGET BENCHMARK SCORECARD
                      </span>
                      <span className="ops-scorecard-sla">
                        Active SLA
                      </span>
                    </div>

                    <div className="ops-scorecard-grid">
                      {cur.scorecard.map((sc, sIdx) => (
                        <div key={sIdx} className="ops-scorecard-item">
                          <div className="ops-sc-header-row">
                            <span className="ops-sc-label">{sc.label}</span>
                            <span className="ops-sc-status">{sc.status}</span>
                          </div>
                          <div className="ops-sc-value">
                            {sc.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 5. 24-HOUR OPERATOR CADENCE TIMELINE ── */}
      <section className="ops-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PRECISION OPERATIONAL RHYTHM
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The 24-Hour Operator Cadence Schedule
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Marketplaces never sleep. Here is how our operational cell monitors, synchronizes, and executes throughout a continuous 24-hour cycle.
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="timeline-desktop">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
              {cadenceSchedule.map((c, idx) => {
                const isSelected = activeCadence === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCadence(idx)}
                    style={{
                      padding: "1.2rem 1rem",
                      borderRadius: "14px",
                      border: isSelected ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                      background: isSelected ? "#EFF6FF" : "#F8FAFC",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: isSelected ? "#2563EB" : "#0F172A", marginBottom: "0.3rem" }}>
                      {c.time}
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", lineHeight: 1.3, marginBottom: "0.4rem" }}>
                      {c.phase}
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: isSelected ? "#1D4ED8" : "#64748B", background: isSelected ? "#DBEAFE" : "#E2E8F0", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      {c.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Cadence Deep Dive */}
            <div style={{ background: "#F8FAFC", border: "1px solid #BFDBFE", borderRadius: "18px", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#2563EB" }}>
                  {cadenceSchedule[activeCadence].time}
                </span>
                <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A" }}>
                  — {cadenceSchedule[activeCadence].phase}
                </span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                {cadenceSchedule[activeCadence].desc}
              </p>
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="timeline-mobile">
            {cadenceSchedule.map((c, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#2563EB" }}>{c.time}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                    {c.badge}
                  </span>
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>
                  {c.phase}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. OPERATIONAL COMPARISON (Light Enterprise Table) ── */}
      <section className="ops-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="ops-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              OPERATIONAL DIFFERENTIATION
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Legacy / Junior In-House Model vs. Good Life Operating Cell
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Why scaling brands replace junior portal executives with Good Life&apos;s institutional operations infrastructure.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="ops-comparison-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", overflow: "hidden", minWidth: "620px", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F1F5F9", borderBottom: "1px solid #E2E8F0", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <th style={{ padding: "1.1rem 1.5rem", width: "25%", color: "#0F172A" }}>Operational Parameter</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#DC2626" }}>Legacy / Junior In-House</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#16A34A" }}>Good Life Dedicated Cell</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((cr, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>
                        {cr.metric}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        <X size={12} strokeWidth={3} color="#EF4444" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.45rem" }} />
                        {cr.traditional}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#0F172A", fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 600 }}>
                        <Check size={13} strokeWidth={3} color="#16A34A" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.45rem" }} />
                        {cr.goodlife}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Cards View */}
          <div className="ops-comparison-mobile-cards">
            {comparisonRows.map((cr, idx) => (
              <div key={idx} className="ops-comp-card">
                <div className="ops-comp-factor">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB", display: "inline-block" }} />
                  <span>{cr.metric}</span>
                </div>

                <div className="ops-comp-traditional">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <X size={12} strokeWidth={3} />
                    <span>Legacy / Junior In-House</span>
                  </div>
                  <div>{cr.traditional}</div>
                </div>

                <div className="ops-comp-goodlife">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#2563EB", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <Check size={12} strokeWidth={3} />
                    <span>Good Life Dedicated Cell</span>
                  </div>
                  <div>{cr.goodlife}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. LIGHT ENTERPRISE EXECUTIVE AUDIT BANNER ── */}
      <section className="ops-section-block" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="cta-inner-box">
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY EXECUTIVE DIAGNOSTIC
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Book an Executive Account Health &amp; Operations Audit
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our senior operations leadership run a forensic review of your Amazon, Flipkart, and Blinkit accounts. We uncover hidden search suppressions, Buybox leaks, and logistics SLA bottlenecks within 48 hours under NDA.
              </p>

              <div className="ops-cta-actions mobile-btn-stack">
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
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>SCHEDULE 30-MIN STRATEGY SESSION</span>
                  <ArrowRight size={15} strokeWidth={2.5} style={{ marginLeft: "0.4rem" }} />
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
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
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
