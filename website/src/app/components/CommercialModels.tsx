"use client";

import React, { useState } from "react";

export default function CommercialModels({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [selectedModel, setSelectedModel] = useState<number | "all">("all");

  const models = [
    {
      id: "performance-share",
      tag: "Co-Growth",
      tagColor: "#2563EB",
      tagBg: "rgba(239, 246, 255, 0.95)",
      title: "Performance-Share Partnership",
      bestFor: "Established brands seeking aggressive marketplace GMV expansion.",
      structure: "Base operating retainer + % of incremental GMV growth",
      includes: [
        "Full marketplace management (Amazon, Flipkart, Quick-Commerce)",
        "Daily ad spend & TACoS optimization (PPC + DSP)",
        "Automated stock replenishment alerts & quarterly growth roadmap"
      ],
      kpis: "Target ROAS, YoY GMV growth rate, Buy Box win %",
      badge: "Most Popular"
    },
    {
      id: "monthly-retainer",
      tag: "Fixed Management",
      tagColor: "#059669",
      tagBg: "rgba(236, 253, 245, 0.95)",
      title: "Dedicated Monthly Retainer",
      bestFor: "Brands seeking predictable operational costs with a dedicated team.",
      structure: "Fixed monthly fee based on catalog size & active channels",
      includes: [
        "Dedicated Account Lead & catalog operations specialist",
        "Weekly catalog optimization & suppressed listing resolution",
        "Cross-channel unified analytics & daily sales reporting"
      ],
      kpis: "SLA compliance, listing quality score, ad efficiency (TACoS)",
      badge: "Predictable Cost"
    },
    {
      id: "turnkey-enabler",
      tag: "Full Turnkey",
      tagColor: "#7C3AED",
      tagBg: "rgba(245, 243, 255, 0.95)",
      title: "Turnkey Merchant / Enabler",
      bestFor: "Enterprises needing instant 12-state GST billing & warehouses.",
      structure: "GoodLife operates as verified merchant-of-record on wholesale terms",
      includes: [
        "Immediate multi-state Prime & Assured badge activation",
        "Zero setup delay for 12 regional state GST registrations",
        "End-to-end B2C/B2B fulfillment, returns triage & customer service"
      ],
      kpis: "PO fulfillment SLA, dock-to-stock turnaround, same-day dispatch",
      badge: "Zero Friction"
    },
    {
      id: "project-diagnostic",
      tag: "Targeted Sprint",
      tagColor: "#D97706",
      tagBg: "rgba(255, 251, 235, 0.95)",
      title: "Fixed-Scope Sprint & Audit",
      bestFor: "Brands facing an immediate bottleneck: fee leaks or launch sprint.",
      structure: "Fixed milestone project fee or % of recovered fee leakage",
      includes: [
        "Deep-dive marketplace fee leakage & settlement audit",
        "International expansion sprint (Amazon UAE / US / UK launch)",
        "A+ Brand Store design overhaul & reverse logistics backlog recovery"
      ],
      kpis: "Dispute recovery cash (₹), listing conversion rate uplift",
      badge: "Fast Results"
    }
  ];

  return (
    <section
      id="commercial-models"
      className="scroll-blur-reveal"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(239, 246, 255, 0.75) 0%, rgba(255, 255, 255, 0.98) 70%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "4.5rem 1.25rem 5rem",
        borderTop: "1.5px solid rgba(191, 219, 254, 0.45)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ambient Liquid Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
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
            Transparent Commercials • Zero Ambiguity
          </span>
          <h2 style={{
            fontSize: "clamp(1.85rem, 3vw, 2.45rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.5rem"
          }}>
            How We Work Together
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "#64748B",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.55
          }}>
            Four transparent engagement models with clear deliverables, SLAs, and performance metrics.
          </p>
        </div>

        {/* Mobile Interactive Tab Pills (Quick Filter on Small Screens) */}
        <div className="models-mobile-nav" style={{
          display: "none",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.75rem",
          marginBottom: "1.25rem",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}>
          <button
            type="button"
            onClick={() => setSelectedModel("all")}
            className={`models-mobile-pill ${selectedModel === "all" ? "active" : ""}`}
            style={{
              padding: "0.45rem 0.95rem",
              borderRadius: "99px",
              fontSize: "0.76rem",
              fontWeight: 800,
              whiteSpace: "nowrap",
              cursor: "pointer",
              border: selectedModel === "all" ? "1.5px solid #2563EB" : "1px solid rgba(191, 219, 254, 0.8)",
              background: selectedModel === "all" ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)" : "rgba(255, 255, 255, 0.85)",
              color: selectedModel === "all" ? "#FFFFFF" : "#334155",
              boxShadow: selectedModel === "all" ? "0 4px 14px rgba(37, 99, 235, 0.25)" : "none",
              transition: "all 0.2s ease",
              flexShrink: 0
            }}
          >
            All 4 Models
          </button>
          {models.map((m, idx) => {
            const isActive = selectedModel === idx;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedModel(idx)}
                className={`models-mobile-pill ${isActive ? "active" : ""}`}
                style={{
                  padding: "0.45rem 0.95rem",
                  borderRadius: "99px",
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: isActive ? `1.5px solid ${m.tagColor}` : "1px solid rgba(191, 219, 254, 0.8)",
                  background: isActive ? m.tagColor : "rgba(255, 255, 255, 0.85)",
                  color: isActive ? "#FFFFFF" : "#334155",
                  boxShadow: isActive ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                  transition: "all 0.2s ease",
                  flexShrink: 0
                }}
              >
                {m.tag}
              </button>
            );
          })}
        </div>

        {/* 4 Models Compact Liquid Glass Grid */}
        <div className="models-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.6rem"
        }}>
          {models.map((model, idx) => {
            if (selectedModel !== "all" && selectedModel !== idx) return null;
            const isHighlighted = idx === 0;
            return (
              <div
                key={model.id}
                className="commercial-card"
                style={{
                  background: isHighlighted
                    ? "linear-gradient(150deg, rgba(255, 255, 255, 0.96) 0%, rgba(239, 246, 255, 0.88) 100%)"
                    : "linear-gradient(150deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.82) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: isHighlighted
                    ? "1.8px solid #2563EB"
                    : "1.5px solid rgba(191, 219, 254, 0.85)",
                  borderRadius: "20px",
                  padding: "1.35rem 1.25rem",
                  boxShadow: isHighlighted
                    ? "0 12px 30px rgba(37, 99, 235, 0.12), inset 0 1px 2px #FFFFFF"
                    : "0 6px 20px rgba(15, 23, 42, 0.04), inset 0 1px 2px #FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(37, 99, 235, 0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = isHighlighted
                    ? "0 12px 30px rgba(37, 99, 235, 0.12), inset 0 1px 2px #FFFFFF"
                    : "0 6px 20px rgba(15, 23, 42, 0.04), inset 0 1px 2px #FFFFFF";
                }}
              >
                {/* Floating Top Badge */}
                {model.badge && (
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    right: "14px",
                    background: isHighlighted
                      ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                      : "#0F172A",
                    color: "#FFFFFF",
                    fontSize: "0.66rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "99px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.12)"
                  }}>
                    {model.badge}
                  </div>
                )}

                <div>
                  {/* Category Pill */}
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "0.18rem 0.55rem",
                    borderRadius: "6px",
                    background: model.tagBg,
                    border: `1px solid ${model.tagColor}33`,
                    color: model.tagColor,
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    marginBottom: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: model.tagColor }} />
                    {model.tag}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: "1.12rem",
                    fontWeight: 800,
                    color: "#0B1736",
                    margin: "0 0 0.4rem",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.25
                  }}>
                    {model.title}
                  </h3>

                  {/* Concise Best For */}
                  <p style={{
                    fontSize: "0.8rem",
                    color: "#64748B",
                    lineHeight: 1.45,
                    margin: "0 0 0.75rem"
                  }}>
                    {model.bestFor}
                  </p>

                  {/* Compact Commercial Structure Box */}
                  <div className="commercial-structure-box" style={{
                    background: "rgba(248, 250, 252, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderRadius: "10px",
                    padding: "0.55rem 0.75rem",
                    marginBottom: "0.85rem"
                  }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.7px" }}>
                      Commercial Structure:
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0F172A", marginTop: "2px", lineHeight: 1.35 }}>
                      {model.structure}
                    </div>
                  </div>

                  {/* Concise Deliverables */}
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "0.66rem", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "0.35rem" }}>
                      Key Deliverables:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {model.includes.map((inc, iIdx) => (
                        <div key={iIdx} style={{ display: "flex", alignItems: "flex-start", gap: "5px", fontSize: "0.76rem", color: "#334155", lineHeight: 1.35, fontWeight: 550 }}>
                          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                            <path d="M6 10.2l2.6 2.6L14.2 7" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compact KPIs */}
                  <div style={{
                    borderTop: "1px solid rgba(226, 232, 240, 0.8)",
                    paddingTop: "0.55rem",
                    fontSize: "0.72rem",
                    color: "#64748B",
                    lineHeight: 1.35
                  }}>
                    <strong style={{ color: "#0F172A" }}>KPIs:</strong> {model.kpis}
                  </div>
                </div>

                {/* Compact Button */}
                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={onOpenDiag}
                    style={{
                      width: "100%",
                      height: "38px",
                      borderRadius: "10px",
                      background: isHighlighted
                        ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                        : "rgba(239, 246, 255, 0.85)",
                      color: isHighlighted ? "#FFFFFF" : "#1D4ED8",
                      border: isHighlighted ? "none" : "1px solid rgba(191, 219, 254, 0.8)",
                      fontWeight: 750,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: isHighlighted ? "0 4px 14px rgba(37, 99, 235, 0.25)" : "none"
                    }}
                    onMouseEnter={(e) => {
                      if (!isHighlighted) {
                        e.currentTarget.style.background = "#DBEAFE";
                        e.currentTarget.style.color = "#1E40AF";
                      } else {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(37, 99, 235, 0.35)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isHighlighted) {
                        e.currentTarget.style.background = "rgba(239, 246, 255, 0.85)";
                        e.currentTarget.style.color = "#1D4ED8";
                      } else {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.25)";
                      }
                    }}
                  >
                    Discuss This Model →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── THREE NON-NEGOTIABLES (Liquid Glass Compact Card) ── */}
        <div className="commercial-non-negotiables" style={{
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 247, 255, 0.82) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "20px",
          border: "1.5px solid rgba(191, 219, 254, 0.8)",
          padding: "1.6rem 1.8rem",
          boxShadow: "0 10px 30px rgba(37, 99, 235, 0.06), inset 0 1px 2px #FFFFFF"
        }}>
          <div style={{ textAlign: "center", marginBottom: "1.3rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.3px", color: "#2563EB" }}>
              Commercial Governance
            </span>
            <h4 style={{ fontSize: "1.22rem", fontWeight: 800, color: "#0B1736", margin: "0.15rem 0 0.25rem" }}>
              Our Three Commercial Non-Negotiables
            </h4>
            <p style={{ fontSize: "0.84rem", color: "#64748B", margin: 0 }}>
              Principles protecting partner brands across every engagement model:
            </p>
          </div>

          <div className="non-negotiables-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem"
          }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
                title: "1. Zero Blind Stock Risk",
                desc: "Inventory stays on brand balance sheets with real-time WMS visibility, or purchased outright via verified POs."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "2. 100% Brand Pricing Control",
                desc: "Brand always dictates MAP thresholds and deal discounts. GoodLife never initiates rogue price discounting."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                ),
                title: "3. Complete Data & Account Ownership",
                desc: "Your seller accounts, brand registries, customer databases, and pixel history remain 100% your IP from day one."
              }
            ].map((pillar, pIdx) => (
              <div key={pIdx} className="non-negotiable-card" style={{
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "14px",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                padding: "1rem",
                display: "flex",
                gap: "0.85rem",
                alignItems: "flex-start",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {pillar.icon}
                </div>
                <div>
                  <h5 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.2rem" }}>
                    {pillar.title}
                  </h5>
                  <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
