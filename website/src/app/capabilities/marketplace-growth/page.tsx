"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";

export default function MarketplaceGrowthPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  
  // Interactive Simulator State
  const [monthlySpend, setMonthlySpend] = useState<number>(350000); // INR 3.5 Lakh
  const [targetTacos, setTargetTacos] = useState<number>(12); // 12%
  const [activeLever, setActiveLever] = useState<number>(0);

  // Computed metrics for simulator
  const projectedGMV = Math.round(monthlySpend / (targetTacos / 100));
  const organicShare = Math.min(84, Math.max(52, 88 - (targetTacos - 8) * 2.4));
  const paidShare = 100 - organicShare;
  const organicRevenue = Math.round(projectedGMV * (organicShare / 100));
  const paidRevenue = projectedGMV - organicRevenue;
  const effectiveROAS = (paidRevenue / monthlySpend).toFixed(1);
  const estimatedWastedSpendSaved = Math.round(monthlySpend * 0.22); // Good Life eliminates ~22% wasted ad spend

  const growthLevers = [
    {
      id: "keyword-harvesting",
      badge: "LEVER 01",
      title: "Algorithmic Keyword Harvesting & Search Term Migration",
      desc: "Stop wasting spend on broad search queries. Our automation actively mines converting search terms from broad discovery campaigns and migrates them into high-intent exact match buckets with dedicated target budgets.",
      deliverables: [
        "Continuous 24-hour search term log harvesting across Amazon & Flipkart",
        "Automated negative phrase weeding to eliminate non-converting budget leaks",
        "Long-tail conversational keyword harvesting tailored for voice and mobile search",
        "Competitor ASIN target harvesting based on high-traffic cross-shopping behavior"
      ],
      metric: "3.4x",
      metricLabel: "Search Term Conversion Multiplier",
      cardItems: [
        { label: "Search Term Harvest Cadence", value: "Daily Sync", status: "Automated" },
        { label: "Negative Keyword Additions", value: "450+ / Month", status: "Shield Active" },
        { label: "Exact Match Revenue Share", value: "68.5%", status: "High Intent" },
        { label: "Cost Per Click (CPC) Reduction", value: "-24.2%", status: "Optimized" }
      ]
    },
    {
      id: "buybox-sync",
      badge: "LEVER 02",
      title: "Buybox-Synced Ad Automation & Budget Protection",
      desc: "Never pay for ads that convert sales for unauthorized third-party resellers. Our API synchronizes ad spending directly with Buybox ownership, instantly pausing campaigns if your brand loses the buybox by even a single minute.",
      deliverables: [
        "Zero-delay automated ad pausing when Buybox drops below 95%",
        "Instant campaign resumption the millisecond Buybox ownership is restored",
        "Elimination of sponsored product cannibalization on organic #1 rankings",
        "Daily automated audit logs of rogue sellers siphoning brand search traffic"
      ],
      metric: "100%",
      metricLabel: "Ad Spend Protection on Lost Buybox",
      cardItems: [
        { label: "Buybox Telemetry Polling", value: "Every 5 Mins", status: "Active" },
        { label: "Wasted Ad Spend Prevented", value: "₹78,000 / Mo", status: "Capital Saved" },
        { label: "Rogue Seller Hijack Interception", value: "Instant", status: "Enforced" },
        { label: "Ad Uptime on Owned Buybox", value: "99.8%", status: "Optimal" }
      ]
    },
    {
      id: "dayparting",
      badge: "LEVER 03",
      title: "Dynamic Dayparting & High-Conversion Bidding Schedule",
      desc: "Shoppers convert at vastly different rates depending on time of day. We apply mathematical bidding multipliers that maximize impression share during peak purchase windows and slash bids during dead late-night hours.",
      deliverables: [
        "Hourly conversion rate and AOV clustering per category and region",
        "Automated bid scaling during lunch hours (12 PM - 3 PM) and prime evening slots (8 PM - 11 PM)",
        "Deep night budget conservation saving 15-25% of daily ad capital",
        "Weekend vs. weekday bidding profiles tailored for urban delivery clusters"
      ],
      metric: "+38%",
      metricLabel: "Conversion Rate Lift in Peak Windows",
      cardItems: [
        { label: "High-Intent Peak Hours", value: "11am-2pm & 8pm-11pm", status: "Boosted" },
        { label: "Off-Peak Spend Savings", value: "18.6%", status: "Preserved" },
        { label: "Hourly Bid Adjustment Rules", value: "24 Profiles", status: "Configured" },
        { label: "Click-to-Purchase Ratio", value: "14.2%", status: "Above Benchmark" }
      ]
    },
    {
      id: "brand-defense",
      badge: "LEVER 04",
      title: "Brand Defense & Competitor Conquesting Architecture",
      desc: "Defend your branded search queries against predator competitors while aggressively positioning your hero SKUs directly on rival product detail pages where their reviews are dropping or prices are higher.",
      deliverables: [
        "100% impression share defense on your core brand keywords and trademarks",
        "Targeted sponsored display and video ads on competitor PDPs with rating vulnerabilities",
        "Virtual product bundling to increase Average Order Value (AOV) across catalog",
        "Custom Brand Store storefront layouts with video engagement and cross-sell carousels"
      ],
      metric: "94.6%",
      metricLabel: "Brand Keyword Impression Share",
      cardItems: [
        { label: "Brand Defense CPC", value: "Controlled", status: "Protected" },
        { label: "Competitor Conquesting ROAS", value: "3.8x", status: "High Yield" },
        { label: "Brand Store Bounce Rate", value: "26.4%", status: "Engaged" },
        { label: "Cross-Sell Basket Lift", value: "+21.5%", status: "Active" }
      ]
    }
  ];

  const festivePhases = [
    {
      period: "Days -45 to -21",
      name: "Phase 1: Catalog SEO & Organic Indexation",
      badge: "Flywheel Primer",
      bullets: [
        "Audit backend search terms, indexing 250 bytes of high-velocity festive keywords",
        "A/B test PDP hero imagery and video assets to maximize organic CTR",
        "Seed inventory into 12 regional fulfillment hubs to earn Prime/Assured delivery badges"
      ]
    },
    {
      period: "Days -20 to -1",
      name: "Phase 2: Deal Approval & Remarketing Pooling",
      badge: "Audience Staging",
      bullets: [
        "Lock in Lightning Deals, Best Deals, and Mega Banner slots with category managers",
        "Build massive Sponsored Display remarketing audiences of past 90-day viewers",
        "Stabilize reference prices to ensure compliant 30-day deal discount badging"
      ]
    },
    {
      period: "Days 1 to 8",
      name: "Phase 3: The Surge – Hourly Bid & Budget Management",
      badge: "Live Execution",
      bullets: [
        "24/7 war room monitoring hourly budget exhaustion and uncapping high-converting SKUs",
        "Dynamic bid surges during flash-sale hours with automated Buybox monitoring",
        "Same-day dark store inventory replenishment to maintain 10-minute delivery badges"
      ]
    },
    {
      period: "Days +1 to +15",
      name: "Phase 4: Review Harvest & Post-Surge Retention",
      badge: "Moat Consolidation",
      bullets: [
        "Trigger compliant review request sequences to capture 5-star customer ratings",
        "Re-engage first-time festive buyers with subscribe-and-save and cross-sell campaigns",
        "Reconcile ad spend vs. organic sales to cement higher permanent BSR rankings"
      ]
    }
  ];

  const comparisonData = [
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
    <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseViolet {
          0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
        }
        .growth-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          border-radius: 22px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .growth-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(124, 58, 237, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          border-color: rgba(124, 58, 237, 0.35);
        }
        .slider-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.4);
        }
        @media (max-width: 991px) {
          .growth-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .growth-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .growth-levers-grid { grid-template-columns: 1fr !important; }
          .simulator-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .growth-stats-grid { grid-template-columns: 1fr !important; }
          .growth-pill-tabs { grid-template-columns: 1fr !important; }
          .growth-cta-box { padding: 2rem 1.5rem !important; }
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
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(125, 211, 252, 0.3) 0%, transparent 70%)",
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
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Marketplace Growth &amp; Ads</span>
          </div>

          <div className="growth-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            
            {/* Left: Mission Statement & Positioning */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
                border: "1.5px solid #DDD6FE",
                color: "#7C3AED",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7C3AED" }} />
                CAPABILITY 02 • ALGORITHMIC PERFORMANCE ADVERTISING
              </div>

              <h1 style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0B1736",
                letterSpacing: "-1.5px",
                margin: "0 0 1.5rem"
              }}>
                Marketplace Growth: <br />
                <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #0284C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Organic Ranking Flywheels &amp; Profitable TACOS Scale
                </span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: "2.2rem",
                fontWeight: 500
              }}>
                Most agencies burn your ad capital on vanity ROAS by bidding on your own brand name. Good Life engineers mathematically disciplined Amazon Ads and Flipkart PLA campaigns designed for true incremental sales velocity, lowering your blended TACOS while propelling organic #1 Best Seller Rank (BSR).
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/book-meeting"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(124, 58, 237, 0.28)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>SCHEDULE AD AUDIT →</span>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <span>Calculate Ad Waste</span>
                </button>
              </div>

            </div>

            {/* Right: Live Growth Cockpit (Floating Glass Card) */}
            <div>
              <div className="growth-glass-card" style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 50px rgba(124, 58, 237, 0.09), 0 2px 6px rgba(0,0,0,0.02)",
                position: "relative",
                animation: "floatSlow 8s ease-in-out infinite"
              }}>
                {/* Console Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#7C3AED", boxShadow: "0 0 8px #7C3AED" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", color: "#4C1D95" }}>
                      Growth &amp; Ad Engine Telemetry
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#7C3AED", background: "#FAF5FF", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    ACTIVE OPTIMIZER
                  </span>
                </div>

                {/* 4 Health Telemetry Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Blended TACOS</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#7C3AED", marginTop: "2px" }}>11.4%</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>▼ -6.2% vs target ceiling</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Organic Lift Ratio</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0284C7", marginTop: "2px" }}>3.4x</div>
                    <div style={{ fontSize: "0.68rem", color: "#0284C7", marginTop: "2px", fontWeight: 700 }}>Every ₹1 ad → ₹3.4 organic</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Buybox-Ad Pauser</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>PROTECTED</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: "2px", fontWeight: 600 }}>0 Wasted Ad Clicks</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.9rem", borderRadius: "14px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Top 3 Organic Ranks</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#2563EB", marginTop: "2px" }}>48 SKUs</div>
                    <div style={{ fontSize: "0.68rem", color: "#16A34A", marginTop: "2px", fontWeight: 700 }}>▲ +18 new hero keywords</div>
                  </div>
                </div>

                {/* Micro Live Feed */}
                <div style={{ background: "#F1F5F9", padding: "0.85rem 1rem", borderRadius: "12px", fontSize: "0.75rem", color: "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7C3AED" }} />
                    Auto-harvested 14 new exact keywords from broad campaign #204
                  </span>
                  <span style={{ fontWeight: 700, color: "#7C3AED" }}>Just now</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── 4 FLOATING GLASS STATS CARDS (Matching Screenshot 2 Aesthetic) ── */}
          <div className="growth-stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginTop: "3.5rem"
          }}>
            {[
              {
                value: "11.4%",
                label: "Target Blended TACOS",
                description: "Sustainable advertising cost of sales preserving gross operating margin",
                tag: "Margin Shield",
                tagColor: "#7C3AED",
                tagBg: "#FAF5FF",
                borderColor: "rgba(124, 58, 237, 0.2)",
                subText: "Guaranteed Below 14% Cap"
              },
              {
                value: "3.4x",
                label: "Organic Velocity Multiplier",
                description: "Paid ad momentum converts directly into permanent organic keyword rank lift",
                tag: "Flywheel Lift",
                tagColor: "#0284C7",
                tagBg: "#F0F9FF",
                borderColor: "rgba(2, 132, 199, 0.2)",
                subText: "72% Organic Sales Share"
              },
              {
                value: "₹4.8 Cr+",
                label: "Monthly Managed Ad GMV",
                description: "Scaled ad governance across Amazon SP/SB/SD and Flipkart PLA/PCA",
                tag: "Proven Scale",
                tagColor: "#2563EB",
                tagBg: "#EFF6FF",
                borderColor: "rgba(37, 99, 235, 0.2)",
                subText: "Enterprise Portfolio"
              },
              {
                value: "99.2%",
                label: "Buybox-Ad Sync Uptime",
                description: "Sub-second ad shutoff when Buybox is lost prevents funding competitor conversions",
                tag: "Waste Elimination",
                tagColor: "#059669",
                tagBg: "#F0FDF4",
                borderColor: "rgba(5, 150, 105, 0.2)",
                subText: "Zero Wasted Spend",
                showBar: true
              }
            ].map((st, idx) => (
              <div key={idx} className="growth-glass-card" style={{ padding: "1.75rem 1.5rem", borderColor: st.borderColor }}>
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
                    <div style={{ width: "99%", height: "100%", background: "#059669" }} />
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

      {/* ── 2. INTERACTIVE ROAS & TACOS IMPACT SIMULATOR ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#7C3AED", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Interactive Ad Yield Calculator
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Simulate Your Revenue &amp; Organic Momentum at Controlled TACOS
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Adjust your monthly ad budget and target TACOS to see how Good Life's algorithmic harvesting transforms ad spend into permanent organic ranking lift without burning profit margins.
            </p>
          </div>

          <div className="simulator-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "2.5rem",
            alignItems: "stretch"
          }}>
            {/* Controls Box */}
            <div className="growth-glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.5rem" }}>
                  Ad Parameters &amp; Targets
                </h3>

                {/* Monthly Ad Spend Slider */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Monthly Ad Spend (₹)</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#7C3AED" }}>₹{(monthlySpend / 100000).toFixed(1)} Lakh</span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={2500000}
                    step={50000}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="slider-range"
                    style={{ width: "100%", accentColor: "#7C3AED", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                    <span>₹1.0 Lakh</span>
                    <span>₹12.5 Lakh</span>
                    <span>₹25.0 Lakh</span>
                  </div>
                </div>

                {/* Target TACOS Slider */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>Target Blended TACOS (%)</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0284C7" }}>{targetTacos}%</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={22}
                    step={1}
                    value={targetTacos}
                    onChange={(e) => setTargetTacos(Number(e.target.value))}
                    className="slider-range"
                    style={{ width: "100%", accentColor: "#0284C7", height: "6px", borderRadius: "4px", background: "#E2E8F0", outline: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.4rem" }}>
                    <span>8% (Ultra Lean)</span>
                    <span>14% (Optimal Growth)</span>
                    <span>22% (Aggressive Launch)</span>
                  </div>
                </div>
              </div>

              {/* Elimination of Ad Waste Callout */}
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", padding: "1.2rem", borderRadius: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#166534", fontWeight: 800, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>✓</span> Estimated Wasted Spend Saved by Good Life:
                </div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#15803D" }}>
                  ₹{(estimatedWastedSpendSaved / 100000).toFixed(2)} Lakh / Month
                </div>
                <div style={{ fontSize: "0.75rem", color: "#166534", marginTop: "0.2rem" }}>
                  Achieved via automated negative phrase filters &amp; lost-Buybox ad pause triggers.
                </div>
              </div>
            </div>

            {/* Results Output Console */}
            <div className="growth-glass-card" style={{
              padding: "2.5rem",
              background: "linear-gradient(135deg, #0B1736 0%, #1E1B4B 100%)",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#A78BFA", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Projected Brand Commercial Outcome
                  </span>
                  <span style={{ fontSize: "0.72rem", background: "rgba(167, 139, 250, 0.2)", color: "#DDD6FE", padding: "3px 10px", borderRadius: "999px" }}>
                    ALGORITHMIC FORECAST
                  </span>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>Projected Total Monthly GMV (Blended)</div>
                  <div style={{ fontSize: "clamp(2.4rem, 3.5vw, 3.2rem)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-1px", marginTop: "0.2rem" }}>
                    ₹{(projectedGMV / 100000).toFixed(1)} Lakh
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#38BDF8", marginTop: "0.3rem", fontWeight: 600 }}>
                    Equivalent to ₹{((projectedGMV * 12) / 10000000).toFixed(2)} Cr Annualized Run-Rate
                  </div>
                </div>

                {/* Revenue Breakdown Split (Organic vs Paid) */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    <span style={{ color: "#38BDF8" }}>Organic Sales: {organicShare}% (₹{(organicRevenue / 100000).toFixed(1)}L)</span>
                    <span style={{ color: "#C084FC" }}>Paid Sales: {paidShare}% (₹{(paidRevenue / 100000).toFixed(1)}L)</span>
                  </div>
                  <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.15)", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${organicShare}%`, height: "100%", background: "#38BDF8" }} />
                    <div style={{ width: `${paidShare}%`, height: "100%", background: "#C084FC" }} />
                  </div>
                </div>

                {/* 3 Metric Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.06)", padding: "0.9rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Paid ROAS</div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF", marginTop: "2px" }}>{effectiveROAS}x</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", padding: "0.9rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Organic Multiplier</div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#38BDF8", marginTop: "2px" }}>{(organicRevenue / paidRevenue).toFixed(1)}x</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", padding: "0.9rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>BSR Trajectory</div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#4ADE80", marginTop: "2px" }}>Top 1%</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Want custom keyword targets modeled for your ASINs?</span>
                <Link href="/book-meeting" style={{ color: "#C084FC", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}>
                  Consult Ad Team →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. FOUR GROWTH LEVERS ARCHITECTURE (INTERACTIVE 2x2 MATRIX GRID) ── */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#7C3AED", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Category Domination Engine
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The Four Proprietary Levers That Drive Category Domination
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Unlike generic ad agencies that bid randomly, Good Life coordinates four interconnected algorithmic levers to systematically drive organic rank momentum.
            </p>
          </div>

          {/* 2x2 Bespoke Visual Matrix Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem"
          }}>
            {growthLevers.map((lv, idx) => (
              <div
                key={lv.id}
                className="growth-glass-card"
                style={{
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#7C3AED", background: "#FAF5FF", padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase" }}>
                      {lv.badge}
                    </span>
                    <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#7C3AED" }}>
                      {lv.metric}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.8rem", lineHeight: 1.3 }}>
                    {lv.title}
                  </h3>

                  <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {lv.desc}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.65rem", marginBottom: "1.5rem" }}>
                    {lv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                        <span style={{ color: "#7C3AED", fontWeight: 900, fontSize: "1rem", lineHeight: 1.2 }}>✓</span>
                        <span style={{ fontSize: "0.85rem", color: "#1E293B", fontWeight: 600 }}>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: "#F8FAFC",
                  borderRadius: "14px",
                  padding: "1rem",
                  border: "1px solid #E2E8F0",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem"
                }}>
                  {lv.cardItems.slice(0, 2).map((item, iIdx) => (
                    <div key={iIdx}>
                      <div style={{ fontSize: "0.7rem", color: "#64748B" }}>{item.label}</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. 45-DAY FESTIVE MEGA-SALE EVENT PLAYBOOK ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#7C3AED", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Event Execution Blueprint
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              The 45-Day Festive Event Staging Playbook
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Amazon Great Indian Festival and Flipkart Big Billion Days generate 35-45% of annual e-commerce revenue. Here is our exact chronological execution playbook.
            </p>
          </div>

          <div className="timeline-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem"
          }}>
            {festivePhases.map((phase, pIdx) => (
              <div key={pIdx} className="growth-glass-card" style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#7C3AED", background: "#FAF5FF", padding: "3px 8px", borderRadius: "6px" }}>
                      {phase.period}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase" }}>
                    {phase.badge}
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", margin: "0.4rem 0 1.25rem", lineHeight: 1.3 }}>
                    {phase.name}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                    {phase.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, display: "flex", gap: "0.5rem" }}>
                        <span style={{ color: "#7C3AED", fontWeight: 900 }}>•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
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
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", color: "#7C3AED", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Operational Rigor
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", letterSpacing: "-0.8px" }}>
              Traditional Ad Agency vs. Good Life Algorithmic Engine
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6 }}>
              Why typical digital agencies burn client capital while Good Life scales sustainable market share and net profit.
            </p>
          </div>

          <div className="growth-glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#64748B", width: "26%" }}>STRATEGIC CAPABILITY</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 800, color: "#EF4444", width: "37%" }}>TYPICAL AD AGENCY</th>
                  <th style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", fontWeight: 900, color: "#7C3AED", width: "37%" }}>GOOD LIFE PERFORMANCE ENGINE</th>
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
                    <td style={{ padding: "1.2rem 1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 600, lineHeight: 1.5, background: "rgba(124, 58, 237, 0.02)" }}>
                      <span style={{ color: "#7C3AED", fontWeight: 900, marginRight: "0.4rem" }}>✓</span>
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
          <div className="growth-cta-box" style={{
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(2, 132, 199, 0.15) 100%)",
            border: "1.5px solid rgba(124, 58, 237, 0.4)",
            borderRadius: "26px",
            padding: "3.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}>
            <div style={{ maxWidth: "700px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#C084FC", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                NO-RISK OPPORTUNITY
              </span>
              <h3 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#FFFFFF", margin: "0.8rem 0 1rem", letterSpacing: "-1px" }}>
                Request a Free 48-Hour Marketplace Ad &amp; TACOS Audit
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
                Our senior ad strategists will analyze your last 90 days of Amazon &amp; Flipkart search term reports to identify wasted clicks, rogue Buybox leaks, and top unranked keyword opportunities.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/book-meeting"
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>CLAIM COMPLIMENTARY AUDIT →</span>
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
                <span>Launch Quick Diagnostic</span>
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
