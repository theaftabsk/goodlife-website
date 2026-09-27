"use client";

import React, { useState } from "react";

export default function ProofCaseStudies({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases = [
    {
      id: "kenstar-sda",
      brandName: "Kenstar & Partner Ecosystem",
      category: "Home & Kitchen Appliances",
      timePeriod: "9 Months Intervention",
      headline: "2.8x Revenue Growth & ₹45 Cr+ First-Year Marketplace GMV",
      challenge: "Single-hub bottleneck, slow metro delivery SLAs, and a 22% return rate from transit damage.",
      solution: "12-state distributed warehousing with safe-pack re-engineering and SKU profitability bidding.",
      metrics: [
        { label: "GMV Growth", value: "2.8x", sub: "in 9 months" },
        { label: "Dispatch SLA", value: "98.6%", sub: "same-day fulfillment" },
        { label: "First-Year GMV", value: "₹45 Cr+", sub: "across platforms" },
        { label: "Transit Damage", value: "-68%", sub: "safe pack redesign" }
      ],
      outcome: "Expanded Prime coverage from 44% to 92% tier-1 pin codes with zero festival stockouts.",
      quote: "GoodLife transformed our marketplace model into predictable, high-margin growth.",
      spokesperson: "Rohan Mehta, Managing Director"
    },
    {
      id: "luminous-power",
      brandName: "Power Backup & Inverter Manufacturer",
      category: "Industrial & Batteries",
      timePeriod: "60-Day Diagnostic Sprint",
      headline: "₹1.4 Cr Leaked Revenue Recovered with 38% Fee Reduction",
      challenge: "Chronic volumetric weight overcharges and rejected damage claims exceeding ₹25L per quarter.",
      solution: "Automated barcode dimensional capture at dispatch with algorithmic dispute filing within 72 hours.",
      metrics: [
        { label: "Recovered Cash", value: "₹1.4 Cr", sub: "in 60 days of audits" },
        { label: "Dispute Win Rate", value: "84.2%", sub: "for weight disputes" },
        { label: "Peak Season SLA", value: "99.1%", sub: "zero stockout events" },
        { label: "Margin Lift", value: "+2.4%", sub: "net margin recovery" }
      ],
      outcome: "Turned an invisible 3% bottom-line drain into pure cash flow for summer inventory buffers.",
      quote: "Their reconciliation caught discrepancies our internal team spent months trying to pinpoint.",
      spokesperson: "Vikramaditya S., Head of Digital Operations"
    },
    {
      id: "quick-commerce-fmcg",
      brandName: "Rapid Consumer Goods Label",
      category: "FMCG & Quick Commerce",
      timePeriod: "4 Months Launch Mandate",
      headline: "Zero to 14,000+ Orders/Month on Blinkit & Zepto",
      challenge: "Frequent dark store stockout penalties and complex slotting across metro hubs.",
      solution: "Integrated real-time dark store depletion feeds with daily automated milk-run deliveries.",
      metrics: [
        { label: "Monthly Orders", value: "14,000+", sub: "scaled from zero" },
        { label: "Fill-Rate SLA", value: "99.4%", sub: "zero store rejections" },
        { label: "Repeat Rate", value: "3.4x", sub: "via rapid replenishment" },
        { label: "Stockout Rate", value: "<0.6%", sub: "across 80+ nodes" }
      ],
      outcome: "Top-3 shelf visibility in high-velocity metro pin codes, converting Q-Commerce into top channel.",
      quote: "Scaling 10-minute grocery was chaos until GoodLife automated our dark store logistics.",
      spokesperson: "Pooja Sharma, VP of Commercial Supply"
    }
  ];

  const current = cases[activeCase];

  return (
    <section
      id="proof-case-studies"
      className="scroll-blur-reveal"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(239, 246, 255, 0.75) 0%, rgba(255, 255, 255, 0.98) 70%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "4.5rem 1.25rem 5rem",
        borderTop: "1.5px solid rgba(191, 219, 254, 0.5)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Liquid Ambient Light Glows */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "8%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Clean Header */}
        <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0.26rem 0.95rem",
            borderRadius: "99px",
            background: "linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.7) 100%)",
            border: "1.5px solid rgba(191, 219, 254, 0.8)",
            backdropFilter: "blur(12px)",
            color: "#1D4ED8",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: "0.65rem",
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.06)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
            Verified Case Studies
          </span>
          <h2 style={{
            fontSize: "clamp(1.85rem, 3vw, 2.45rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.5rem"
          }}>
            Documented Operating Interventions &amp; Results
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "#64748B",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.55
          }}>
            Real brands, verified challenges, specific interventions, and audited outcomes.
          </p>
        </div>

        {/* Clean Floating Liquid Glass Tab Switcher Dock */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.2rem"
        }}>
          <div
            className="case-studies-tabs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "6px 8px",
              borderRadius: "99px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid rgba(191, 219, 254, 0.85)",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.08), inset 0 1px 2px #FFFFFF",
              maxWidth: "100%",
              overflowX: "auto"
            }}
          >
            {cases.map((c, idx) => {
              const isActive = activeCase === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(idx)}
                  style={{
                    border: isActive ? "1px solid #2563EB" : "1px solid transparent",
                    background: isActive
                      ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                      : "transparent",
                    color: isActive ? "#FFFFFF" : "#475569",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "0.86rem",
                    padding: "0.55rem 1.2rem",
                    borderRadius: "99px",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                    boxShadow: isActive
                      ? "0 4px 16px rgba(37, 99, 235, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)"
                      : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(239, 246, 255, 0.75)";
                      e.currentTarget.style.color = "#1D4ED8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#475569";
                    }
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isActive ? "#67E8F9" : "#94A3B8"
                  }} />
                  <span>{c.brandName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Liquid Glass Case Study Card */}
        <div
          className="luxury-blue-glass case-study-liquid-card"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(245, 250, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1.5px solid rgba(191, 219, 254, 0.8)",
            boxShadow: "0 20px 50px -10px rgba(37, 99, 235, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "2.4rem 2.2rem",
            display: "grid",
            alignItems: "center"
          }}
        >
          {/* Left Column: Clean Narrative */}
          <div>
            {/* Meta Tags */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{
                background: "#0F172A",
                color: "#FFFFFF",
                fontSize: "0.72rem",
                fontWeight: 750,
                padding: "0.22rem 0.65rem",
                borderRadius: "6px"
              }}>
                {current.category}
              </span>
              <span style={{
                background: "rgba(239, 246, 255, 0.9)",
                border: "1px solid rgba(191, 219, 254, 0.8)",
                color: "#1D4ED8",
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "0.22rem 0.65rem",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {current.timePeriod}
              </span>
            </div>

            {/* Headline */}
            <h3 style={{
              fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
              fontWeight: 800,
              color: "#0B1736",
              margin: "0 0 1.2rem",
              lineHeight: 1.3,
              letterSpacing: "-0.4px"
            }}>
              {current.headline}
            </h3>

            {/* Clean Challenge & Solution Pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.3rem" }}>
              
              {/* Challenge */}
              <div style={{
                background: "rgba(254, 242, 242, 0.75)",
                border: "1px solid rgba(254, 205, 211, 0.8)",
                borderLeft: "3.5px solid #EF4444",
                padding: "0.75rem 1rem",
                borderRadius: "10px"
              }}>
                <div style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#991B1B",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
                  Challenge
                </div>
                <div style={{ fontSize: "0.85rem", color: "#7F1D1D", lineHeight: 1.45, fontWeight: 550 }}>
                  {current.challenge}
                </div>
              </div>

              {/* Solution */}
              <div style={{
                background: "rgba(240, 253, 244, 0.75)",
                border: "1px solid rgba(167, 243, 208, 0.8)",
                borderLeft: "3.5px solid #10B981",
                padding: "0.75rem 1rem",
                borderRadius: "10px"
              }}>
                <div style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#166534",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                  GoodLife Solution
                </div>
                <div style={{ fontSize: "0.85rem", color: "#14532D", lineHeight: 1.45, fontWeight: 550 }}>
                  {current.solution}
                </div>
              </div>
            </div>

            {/* Clean Quote */}
            <div style={{
              borderTop: "1px solid rgba(226, 232, 240, 0.8)",
              paddingTop: "0.85rem",
              fontSize: "0.84rem",
              color: "#334155",
              fontStyle: "italic",
              lineHeight: 1.45
            }}>
              &ldquo;{current.quote}&rdquo;
              <span style={{ fontStyle: "normal", fontWeight: 750, color: "#0F172A", marginLeft: "8px", whiteSpace: "nowrap" }}>
                — {current.spokesperson}
              </span>
            </div>
          </div>

          {/* Right Column: Clean Liquid Glass Metric Outcomes */}
          <div
            className="case-study-metrics-capsule"
            style={{
              background: "linear-gradient(155deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.88) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid rgba(191, 219, 254, 0.85)",
              borderRadius: "20px",
              padding: "1.8rem 1.6rem",
              boxShadow: "0 14px 35px -8px rgba(37, 99, 235, 0.1), inset 0 1px 2px #FFFFFF"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#2563EB",
                background: "rgba(239, 246, 255, 0.9)",
                padding: "0.2rem 0.65rem",
                borderRadius: "99px",
                border: "1px solid rgba(191, 219, 254, 0.8)",
                display: "inline-block",
                marginBottom: "0.3rem"
              }}>
                Key Operating Outcomes
              </span>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B1736", margin: 0 }}>
                Audited Performance
              </h4>
            </div>

            {/* 4 Metric Tiles */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.85rem",
              marginBottom: "1.2rem"
            }}>
              {current.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(219, 234, 254, 0.9)",
                    borderRadius: "14px",
                    padding: "1rem 0.8rem",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.04)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = "#93C5FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(219, 234, 254, 0.9)";
                  }}
                >
                  <div style={{
                    fontSize: "clamp(1.65rem, 2.2vw, 2.05rem)",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #0284C7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                    letterSpacing: "-0.5px"
                  }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0B1736", marginTop: "0.4rem" }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748B", marginTop: "2px" }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Clean 1-Line Outcome Pill */}
            <div style={{
              background: "linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(224, 242, 254, 0.7) 100%)",
              border: "1px solid rgba(191, 219, 254, 0.8)",
              borderRadius: "10px",
              padding: "0.7rem 0.9rem",
              fontSize: "0.77rem",
              color: "#1E40AF",
              lineHeight: 1.4,
              fontWeight: 550,
              marginBottom: "1.1rem"
            }}>
              <strong>Key Impact:</strong> {current.outcome}
            </div>

            {/* Clean Action Button */}
            <button
              onClick={onOpenDiag}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                fontWeight: 750,
                fontSize: "0.88rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(37, 99, 235, 0.28)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(37, 99, 235, 0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(37, 99, 235, 0.28)";
              }}
            >
              Get Category Diagnostic →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
