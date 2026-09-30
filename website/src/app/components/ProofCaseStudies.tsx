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

      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
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
        <div className="case-studies-tabs-container">
          <div className="case-studies-tabs">
            {cases.map((c, idx) => {
              const isActive = activeCase === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(idx)}
                  className={`case-study-tab-btn ${isActive ? "active" : ""}`}
                >
                  <span className="case-study-tab-dot" />
                  <span>{c.brandName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Liquid Glass Case Study Card */}
        <div className="luxury-blue-glass case-study-liquid-card">
          {/* Left Column: Clean Narrative */}
          <div className="case-study-narrative">
            {/* Meta Tags */}
            <div className="case-study-meta-row">
              <span className="case-study-tag-category">
                {current.category}
              </span>
              <span className="case-study-tag-timeline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {current.timePeriod}
              </span>
            </div>

            {/* Headline */}
            <h3 className="case-study-headline">
              {current.headline}
            </h3>

            {/* Clean Challenge & Solution Pills */}
            <div className="case-study-narrative-pills">
              {/* Challenge */}
              <div className="case-study-challenge">
                <div className="case-study-challenge-badge">
                  <span className="case-study-badge-dot red" />
                  Challenge
                </div>
                <div className="case-study-challenge-text">
                  {current.challenge}
                </div>
              </div>

              {/* Solution */}
              <div className="case-study-solution">
                <div className="case-study-solution-badge">
                  <span className="case-study-badge-dot green" />
                  GoodLife Solution
                </div>
                <div className="case-study-solution-text">
                  {current.solution}
                </div>
              </div>
            </div>

            {/* Clean Quote */}
            <div className="case-study-quote-box">
              &ldquo;{current.quote}&rdquo;
              <span className="case-study-quote-author">
                — {current.spokesperson}
              </span>
            </div>
          </div>

          {/* Right Column: Clean Liquid Glass Metric Outcomes */}
          <div className="case-study-metrics-capsule">
            <div className="case-study-metrics-header">
              <span className="case-study-metrics-tag">
                Key Operating Outcomes
              </span>
              <h4 className="case-study-metrics-title">
                Audited Performance
              </h4>
            </div>

            {/* 4 Metric Tiles */}
            <div className="case-study-metrics-grid">
              {current.metrics.map((m, mIdx) => (
                <div key={mIdx} className="case-study-metric-card">
                  <div className="case-study-metric-val">
                    {m.value}
                  </div>
                  <div className="case-study-metric-lbl">
                    {m.label}
                  </div>
                  <div className="case-study-metric-sub">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Clean 1-Line Outcome Pill */}
            <div className="case-study-impact-pill">
              <strong>Key Impact:</strong> {current.outcome}
            </div>

            {/* Clean Action Button */}
            <button
              onClick={onOpenDiag}
              className="case-study-cta-btn"
            >
              Get Category Diagnostic →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
