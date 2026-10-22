"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { ArrowRight, Check, X, Shield, Zap } from "lucide-react";
import "./marketplace-growth.css";

export default function MarketplaceGrowthPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  
  // Interactive Simulator State
  const [monthlyGmv, setMonthlyGmv] = useState<number>(12000000); // INR 1.2 Crore
  const [selectedCategory, setSelectedCategory] = useState<string>("Beauty & Personal Care");
  const [activeLever, setActiveLever] = useState<number>(0);
  const [activeFestiveDay, setActiveFestiveDay] = useState<number>(0);

  // Category multipliers for simulator
  const categoryMultipliers: Record<string, { tacosTarget: number; wasteFactor: number; organicLift: number }> = {
    "Beauty & Personal Care": { tacosTarget: 11.2, wasteFactor: 0.24, organicLift: 3.6 },
    "Consumer Electronics": { tacosTarget: 8.5, wasteFactor: 0.19, organicLift: 2.9 },
    "Apparel & Fashion": { tacosTarget: 13.8, wasteFactor: 0.26, organicLift: 3.8 },
    "Home & Kitchen": { tacosTarget: 10.5, wasteFactor: 0.22, organicLift: 3.2 },
    "Health & Nutrition": { tacosTarget: 12.0, wasteFactor: 0.23, organicLift: 3.5 }
  };

  const curCat = categoryMultipliers[selectedCategory] || categoryMultipliers["Beauty & Personal Care"];
  
  // Computed values
  const estimatedAdBudget = Math.round(monthlyGmv * (curCat.tacosTarget / 100));
  const wastedSpendSavedMonth = Math.round(estimatedAdBudget * curCat.wasteFactor);
  const wastedSpendSavedYear = wastedSpendSavedMonth * 12;
  const tacosReductionPct = (curCat.tacosTarget * 0.28).toFixed(1);
  const incrementalProfitYear = Math.round(wastedSpendSavedYear * 1.35);

  const growthLevers = [
    {
      id: "asin-defense",
      badge: "01 SPONSORED PRODUCTS & ASIN DEFENSE",
      title: "Sponsored Products & Hero ASIN Defense",
      desc: "Stop wasting spend on broad search queries. Our automation mines converting search terms from broad discovery campaigns into high-intent exact match buckets with dedicated budgets.",
      deliverables: [
        "Continuous 24-hour search term log harvesting across Amazon & Flipkart",
        "Automated negative phrase weeding to eliminate non-converting budget leaks",
        "100% impression share defense on your core brand keywords and trademarks",
        "Competitor ASIN target harvesting based on high-traffic cross-shopping behavior"
      ],
      metric: "3.4x",
      metricLabel: "Search Term Conversion Multiplier",
      scorecard: [
        { label: "Search Term Harvest Cadence", value: "Daily Sync", status: "Automated" },
        { label: "Negative Keyword Additions", value: "450+ / Month", status: "Shield Active" },
        { label: "Exact Match Revenue Share", value: "68.5%", status: "High Intent" },
        { label: "Cost Per Click (CPC) Reduction", value: "-24.2%", status: "Optimized" }
      ]
    },
    {
      id: "amazon-dsp",
      badge: "02 AMAZON DSP & RETARGETING",
      title: "Amazon DSP & Off-Marketplace Retargeting",
      desc: "Re-engage past purchasers, abandoned carts, and competitor cross-shoppers through programmatic display and online video campaigns off Amazon.",
      deliverables: [
        "Dynamic remarketing audiences segmenting 30, 60, and 90-day PDP visitors",
        "High-fidelity brand video storytelling in Prime Video and premium web publishers",
        "Custom audience exclusion logic to avoid wasting bids on recently completed buyers",
        "Cross-sell sequences promoting complementary SKUs to increase customer lifetime value"
      ],
      metric: "4.8x",
      metricLabel: "Blended DSP Return on Ad Spend",
      scorecard: [
        { label: "Remarketing Pool Reach", value: "1.2M Shoppers", status: "Staged" },
        { label: "Customer Acquisition Cost", value: "-31%", status: "Reduced" },
        { label: "Cart Abandoner Recovery", value: "18.4%", status: "Recaptured" },
        { label: "Video Completion Rate", value: "78.2%", status: "High Yield" }
      ]
    },
    {
      id: "day-parting",
      badge: "03 HOURLY DAY-PARTING & BID SHADING",
      title: "Hourly Day-Parting & Dynamic Bid Shading",
      desc: "Shoppers convert at vastly different rates depending on time of day. We apply algorithmic bidding multipliers that maximize impression share during peak purchase windows and slash bids during dead late-night hours.",
      deliverables: [
        "Hourly conversion rate and AOV clustering per category and delivery region",
        "Automated bid scaling during lunch hours (12 PM - 3 PM) and prime evening slots (8 PM - 11 PM)",
        "Deep night budget conservation saving 15-25% of daily ad capital",
        "Weekend vs. weekday bidding profiles tailored for urban fast-delivery pin codes"
      ],
      metric: "+38%",
      metricLabel: "Conversion Rate Lift in Peak Windows",
      scorecard: [
        { label: "High-Intent Peak Hours", value: "11am-2pm & 8pm-11pm", status: "Boosted" },
        { label: "Off-Peak Spend Savings", value: "18.6%", status: "Preserved" },
        { label: "Hourly Bid Adjustment Rules", value: "24 Profiles", status: "Configured" },
        { label: "Click-to-Purchase Ratio", value: "14.2%", status: "Above Benchmark" }
      ]
    },
    {
      id: "organic-flywheel",
      badge: "04 ORGANIC RANK FLYWHEEL",
      title: "Organic Rank Flywheel & Buybox-Synced Ads",
      desc: "Every paid ad dollar must build enduring organic rank momentum. Our API instantly pauses paid campaigns if Buybox drops below 95%, ensuring ad capital never benefits third-party resellers.",
      deliverables: [
        "Zero-delay automated ad pausing when Buybox drops below 95%",
        "Instant campaign resumption the millisecond Buybox ownership is restored",
        "Elimination of sponsored product cannibalization on organic #1 rankings",
        "Strategic velocity surges pushing target ASINs into organic Best Seller Rank (BSR)"
      ],
      metric: "100%",
      metricLabel: "Ad Capital Guard on Lost Buybox",
      scorecard: [
        { label: "Buybox Telemetry Polling", value: "Every 5 Mins", status: "Active" },
        { label: "Wasted Spend Prevented", value: "₹78,000 / Mo", status: "Capital Saved" },
        { label: "Organic Revenue Share", value: "66.4%", status: "Dominant" },
        { label: "Top-3 Organic Keyword Ranks", value: "+14 SKUs", status: "Gained" }
      ]
    }
  ];

  const festivePhases = [
    {
      day: "Day 1",
      name: "Catalog SEO & Organic Indexation",
      badge: "Flywheel Primer",
      tasks: [
        "Audit backend search terms, indexing 250 bytes of high-velocity festive keywords",
        "A/B test PDP hero imagery and video assets to maximize organic CTR",
        "Seed inventory into 12 regional fulfillment hubs to earn Prime/Assured delivery badges"
      ]
    },
    {
      day: "Day 15",
      name: "Deal Approval & Remarketing Pooling",
      badge: "Audience Staging",
      tasks: [
        "Lock in Lightning Deals, Best Deals, and Mega Banner slots with category managers",
        "Build massive Sponsored Display remarketing audiences of past 90-day viewers",
        "Stabilize reference prices to ensure compliant 30-day deal discount badging"
      ]
    },
    {
      day: "Day 30",
      name: "The Surge – Hourly Bid & Budget Management",
      badge: "Live Execution",
      tasks: [
        "24/7 war room monitoring hourly budget exhaustion and uncapping high-converting SKUs",
        "Dynamic bid surges during flash-sale hours with automated Buybox monitoring",
        "Same-day dark store inventory replenishment to maintain 10-minute delivery badges"
      ]
    },
    {
      day: "Day 45",
      name: "Review Harvest & Post-Surge Retention",
      badge: "Moat Consolidation",
      tasks: [
        "Trigger compliant review request sequences to capture 5-star customer ratings",
        "Re-engage first-time festive buyers with subscribe-and-save and cross-sell campaigns",
        "Reconcile ad spend vs. organic sales to cement higher permanent BSR rankings"
      ]
    }
  ];

  const keywordMatrix = [
    { keyword: "Anti Dandruff Shampoo 400ml", volume: "145,000", brandShare: 78, competitorShare: 22, status: "Dominant (#1)" },
    { keyword: "Sulfate Free Hair Cleanser", volume: "92,000", brandShare: 64, competitorShare: 36, status: "High Share (#2)" },
    { keyword: "Keratin Smooth Conditioner", volume: "68,000", brandShare: 58, competitorShare: 42, status: "Contested (#3)" },
    { keyword: "Onion Hair Oil for Hair Fall", volume: "185,000", brandShare: 71, competitorShare: 29, status: "Dominant (#1)" }
  ];

  const comparisonRows = [
    {
      factor: "TACOS & Profit Focus",
      traditional: "Obsessed with vanity ROAS on brand keywords; ignores blended margin and total advertising cost of sales.",
      goodlife: "Engineered for strict TACOS targets (10-14%), prioritizing organic search rank momentum and net cash profit."
    },
    {
      factor: "Buybox Ad Spend Sync",
      traditional: "Campaigns run blindly even when Buybox is lost to counterfeiters or 3P resellers, wasting client capital.",
      goodlife: "API-level instantaneous campaign pause the second Buybox is displaced; resumes when restored."
    },
    {
      factor: "Keyword Management",
      traditional: "Manual weekly reviews of search term reports; hundreds of irrelevant clicks burn monthly budget.",
      goodlife: "Automated 24/7 search term harvesting engine with continuous negative phrase filtration."
    },
    {
      factor: "Dayparting & Timing",
      traditional: "Budgets exhaust by 11:00 AM due to uncontrolled morning bids; zero presence during prime evening buying hours.",
      goodlife: "Algorithmic hourly bid scaling maximizing impression share during peak 11am-2pm and 8pm-11pm purchase surges."
    },
    {
      factor: "Festive War Room",
      traditional: "Agency logs off at 6 PM during Great Indian Festival; campaigns run out of budget mid-event.",
      goodlife: "Dedicated 24/7 surge operations war room continuously adjusting bids, deal slots, and regional allocation."
    }
  ];

  return (
    <div className="growth-page-root" style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 1. LIGHT BESPOKE HERO ── */}
      <section className="growth-hero-section">
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-hero-grid">
            
            {/* Left: Messaging */}
            <div>
              <div className="growth-hero-badge">
                <span className="growth-badge-tag">
                  <span className="growth-badge-dot" />
                  CAPABILITY 02
                </span>
                <span className="growth-badge-sep">//</span>
                <span className="growth-badge-title">REVENUE EXPANSION &amp; ADS</span>
              </div>

              <h1 className="growth-hero-title">
                Algorithmic Ads &amp; Market Dominance Without Profit Erosion
              </h1>

              <p className="growth-hero-desc">
                We engineer performance marketing on Amazon and Flipkart around strict blended TACOS targets. Stop burning ad budgets on vanity ROAS while third-party resellers hijack your organic rank.
              </p>

              <div className="growth-hero-actions mobile-btn-stack">
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

            {/* Right: Growth Accelerator Command Cockpit (White Card) */}
            <div className="growth-cockpit-card">
              <div className="growth-cockpit-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#4C1D95", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    GROWTH ACCELERATOR COMMAND COCKPIT
                  </span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "#7C3AED", fontWeight: 700, background: "#EDE9FE", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  BID SHADING ACTIVE
                </div>
              </div>

              <div className="growth-cockpit-body">
                
                {/* Metric 1 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B" }}>Portfolio Blended TACOS</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", background: "#ECFDF3", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      Target &lt;14.0%
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                    11.4%
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: "76%", height: "100%", background: "linear-gradient(90deg, #7C3AED 0%, #16A34A 100%)" }} />
                  </div>
                </div>

                {/* Metric 2 & 3 in 2-col */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "0.95rem 1rem" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Ad-to-Organic Multiplier</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>3.4x</div>
                    <div style={{ fontSize: "0.7rem", color: "#16A34A", fontWeight: 700 }}>Organic rank flywheel</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "0.95rem 1rem" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B", marginBottom: "0.2rem" }}>Ad-Attributed GMV</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>₹4.8 Cr</div>
                    <div style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700 }}>Active monthly flow</div>
                  </div>
                </div>

                {/* Live Buybox Pauser Status */}
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Shield size={16} strokeWidth={2.2} color="#2563EB" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E40AF" }}>Buybox Ad-Pauser Daemon</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#16A34A" }}>100% PROTECTED</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. REAL INTERACTIVE ROAS / TACOS SIMULATOR ── */}
      <section className="growth-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#7C3AED", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              INTERACTIVE PROFIT &amp; TACOS CALCULATOR
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Simulate Your Brand&apos;s Ad Efficiency &amp; Capital Recovery
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Adjust your monthly marketplace GMV and category to see the estimated wasted ad spend eliminated by Good Life&apos;s algorithmic dayparting and search term harvesting.
            </p>
          </div>

          <div className="sim-grid">
            {/* Controls */}
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                    Monthly Marketplace GMV
                  </label>
                  <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#7C3AED" }}>
                    ₹{(monthlyGmv / 10000000).toFixed(2)} Crores
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="1000000"
                  value={monthlyGmv}
                  onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                  className="touch-slider"
                  aria-label="Monthly Marketplace GMV"
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#94A3B8" }}>
                  <span>₹20 Lakhs</span>
                  <span>₹5.0 Crores</span>
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A", display: "block", marginBottom: "0.75rem" }}>
                  Primary Product Category
                </label>
                <div className="cat-selector" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {Object.keys(categoryMultipliers).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "0.6rem 1rem",
                        borderRadius: "10px",
                        border: selectedCategory === cat ? "1.5px solid #7C3AED" : "1px solid #E2E8F0",
                        background: selectedCategory === cat ? "#FAF5FF" : "#FFFFFF",
                        color: selectedCategory === cat ? "#7C3AED" : "#475569",
                        fontWeight: selectedCategory === cat ? 700 : 500,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="sim-output-card">
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#7C3AED", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  ESTIMATED CAPITAL RECOVERED
                </div>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                  ₹{(wastedSpendSavedYear / 100000).toFixed(1)} Lakhs <span style={{ fontSize: "1rem", color: "#64748B", fontWeight: 500 }}>/ year</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
                  Projected wasted ad spend eliminated via negative keyword filtering, Buybox sync pausing, and automated dayparting.
                </p>
              </div>

              <div className="calc-output-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid #E9D5FF", paddingTop: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.2rem" }}>Target Blended TACOS</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#7C3AED" }}>{curCat.tacosTarget}%</div>
                  <div style={{ fontSize: "0.72rem", color: "#16A34A", fontWeight: 700 }}>-{tacosReductionPct}% reduction</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, marginBottom: "0.2rem" }}>Organic Lift Ratio</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>{curCat.organicLift}x</div>
                  <div style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 700 }}>BSR rank multiplier</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. FOUR GROWTH LEVERS (4-Step Architecture) ── */}
      <section className="growth-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              ENGINEERED AD ARCHITECTURE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The Four Marketplace Growth Levers
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Each lever functions as an automated software subsystem driving organic velocity while shielding brand gross margins.
            </p>
          </div>

          {/* Lever Selector Grid */}
          <div className="levers-grid">
            {growthLevers.map((gl, idx) => {
              const isSelected = activeLever === idx;
              return (
                <button
                  key={gl.id}
                  onClick={() => setActiveLever(idx)}
                  style={{
                    padding: "1.2rem 1rem",
                    borderRadius: "16px",
                    border: isSelected ? "1.5px solid #7C3AED" : "1px solid #E2E8F0",
                    background: isSelected ? "#FAF5FF" : "#FFFFFF",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 4px 14px rgba(124, 58, 237, 0.08)" : "0 2px 6px rgba(15, 23, 42, 0.02)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: isSelected ? "#7C3AED" : "#94A3B8", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>
                    LEVER 0{idx + 1}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: isSelected ? "#4C1D95" : "#0F172A", lineHeight: 1.35 }}>
                    {gl.title.split("&")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Lever Deep Dive */}
          {(() => {
            const cur = growthLevers[activeLever];
            return (
              <div className="lever-deepdive-card">
                <div className="lever-deepdive-grid">
                  
                  <div>
                    <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, color: "#7C3AED", background: "#FAF5FF", padding: "0.25rem 0.65rem", borderRadius: "6px", marginBottom: "0.75rem" }}>
                      {cur.badge}
                    </div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
                      {cur.title}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
                      {cur.desc}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {cur.deliverables.map((d, dIdx) => (
                        <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                          <Check size={14} strokeWidth={3} color="#7C3AED" style={{ marginTop: "3px", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.5, fontWeight: 500 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "18px", padding: "1.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.75rem" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", textTransform: "uppercase" }}>
                        TELEMETRY VERIFICATION
                      </span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7C3AED", background: "#FAF5FF", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                        Active Algo
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {cur.scorecard.map((sc, sIdx) => (
                        <div key={sIdx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "0.85rem 1.1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>{sc.label}</span>
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7C3AED", background: "#FAF5FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                              {sc.status}
                            </span>
                          </div>
                          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A" }}>
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

      {/* ── 4. 45-DAY FESTIVE BLUEPRINT TIMELINE ── */}
      <section className="growth-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#7C3AED", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              MEGA SALE EVENT STAGING
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              The 45-Day Festive Event Staging Playbook
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              How Good Life prepares brands for Amazon Great Indian Festival and Flipkart Big Billion Days without inventory stockouts.
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="timeline-desktop">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {festivePhases.map((fp, idx) => {
                const isSelected = activeFestiveDay === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveFestiveDay(idx)}
                    style={{
                      padding: "1.25rem 1rem",
                      borderRadius: "14px",
                      border: isSelected ? "1.5px solid #7C3AED" : "1px solid #E2E8F0",
                      background: isSelected ? "#FAF5FF" : "#FFFFFF",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: isSelected ? "#7C3AED" : "#0F172A", marginBottom: "0.3rem" }}>
                      {fp.day}
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", lineHeight: 1.3, marginBottom: "0.4rem" }}>
                      {fp.name}
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: isSelected ? "#6D28D9" : "#64748B", background: isSelected ? "#EDE9FE" : "#F1F5F9", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                      {fp.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #DDD6FE", borderRadius: "18px", padding: "2rem" }}>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>
                {festivePhases[activeFestiveDay].day}: {festivePhases[activeFestiveDay].name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {festivePhases[activeFestiveDay].tasks.map((t, tIdx) => (
                  <div key={tIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <Check size={14} strokeWidth={3} color="#7C3AED" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="timeline-mobile">
            {festivePhases.map((fp, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#7C3AED" }}>{fp.day}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7C3AED", background: "#FAF5FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                    {fp.badge}
                  </span>
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.75rem" }}>
                  {fp.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {fp.tasks.map((t, tIdx) => (
                    <div key={tIdx} style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                      <span style={{ color: "#7C3AED", fontWeight: 700 }}>•</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. KEYWORD DOMINANCE MATRIX ── */}
      <section className="growth-section-block" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              SEARCH INTELLIGENCE MATRIX
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              High-Intent Keyword Dominance Tracker
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Live telemetry tracking our partner brands&apos; share of search voice vs competing category incumbents.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="growth-kw-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", overflow: "hidden", minWidth: "620px", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <th style={{ padding: "1.1rem 1.5rem", width: "35%", color: "#0F172A" }}>High-Intent Search Phrase</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "20%", color: "#64748B" }}>Monthly Searches</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "30%", color: "#7C3AED" }}>Brand Search Share</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "15%", color: "#16A34A" }}>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordMatrix.map((km, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#FAF5FF" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>
                        {km.keyword}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#64748B", fontSize: "0.85rem", fontWeight: 600 }}>
                        {km.volume}
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ flex: 1, height: "8px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                            <div style={{ width: `${km.brandShare}%`, height: "100%", background: "#7C3AED", borderRadius: "999px" }} />
                          </div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#7C3AED" }}>{km.brandShare}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "1.1rem 1.5rem", color: "#16A34A", fontSize: "0.82rem", fontWeight: 700 }}>
                        {km.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Keyword Cards View */}
          <div className="growth-kw-mobile-cards">
            {keywordMatrix.map((km, idx) => (
              <div key={idx} className="growth-kw-card">
                <div className="growth-kw-header">
                  <div className="growth-kw-phrase">{km.keyword}</div>
                  <div className="growth-kw-pos">{km.status}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#64748B", marginBottom: "0.5rem" }}>
                  <span>Searches: <strong style={{ color: "#0F172A" }}>{km.volume}</strong></span>
                  <span style={{ fontWeight: 800, color: "#7C3AED" }}>{km.brandShare}% Brand Share</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${km.brandShare}%`, height: "100%", background: "#7C3AED", borderRadius: "999px" }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. PERFORMANCE COMPARISON ── */}
      <section className="growth-section-block" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="growth-section-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
              PERFORMANCE METHODOLOGY
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
              Traditional PPC Agency vs. Good Life Operating Cell
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              Why scaling brands transition from generic PPC agencies to our margin-guarded commerce cell.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="growth-comparison-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", overflow: "hidden", minWidth: "620px", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F1F5F9", borderBottom: "1px solid #E2E8F0", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <th style={{ padding: "1.1rem 1.5rem", width: "25%", color: "#0F172A" }}>Growth Dimension</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#DC2626" }}>Traditional PPC Agency</th>
                    <th style={{ padding: "1.1rem 1.5rem", width: "37.5%", color: "#16A34A" }}>Good Life Growth Cell</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((cr, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0", background: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                      <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>
                        {cr.factor}
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
          <div className="growth-comparison-mobile-cards">
            {comparisonRows.map((cr, idx) => (
              <div key={idx} className="growth-comp-card">
                <div className="growth-comp-factor">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7C3AED", display: "inline-block" }} />
                  <span>{cr.factor}</span>
                </div>

                <div className="growth-comp-traditional">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <X size={12} strokeWidth={3} />
                    <span>Traditional PPC Agency</span>
                  </div>
                  <div>{cr.traditional}</div>
                </div>

                <div className="growth-comp-goodlife">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#7C3AED", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    <Check size={12} strokeWidth={3} />
                    <span>Good Life Growth Cell</span>
                  </div>
                  <div>{cr.goodlife}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. LIGHT ENTERPRISE EXECUTIVE CTA BANNER ── */}
      <section className="growth-section-block" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="cta-inner-box">
            <div style={{ maxWidth: "720px" }}>
              <span style={{ display: "inline-block", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", color: "#7C3AED", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                COMPLIMENTARY AD AUDIT
              </span>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Uncover Wasted Ad Spend on Your Top Seller Portals
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 0 2rem" }}>
                Let our performance directors audit your last 60 days of search query reports. We uncover wasted broad-match spend, cannibalized organic rankings, and Buybox leaks within 48 hours under NDA.
              </p>

              <div className="growth-cta-actions mobile-btn-stack">
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
