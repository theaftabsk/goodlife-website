"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface ServiceMatrixItem {
  id: string;
  category: "Strategy & Sales" | "Operations & Supply" | "Creative & Media" | "Global";
  title: string;
  shortDesc: string;
  whatWeDo: string[];
  businessOutcome: string;
  badge?: string;
  icon: React.ReactNode;
  href?: string;
}

export const servicesData: ServiceMatrixItem[] = [
  {
    id: "marketplace-management",
    category: "Strategy & Sales",
    title: "Marketplace Management",
    shortDesc: "End-to-end execution across Amazon, Flipkart, Blinkit, Zepto, Moglix and regional platforms.",
    whatWeDo: [
      "Daily catalog & Buy Box health monitoring",
      "Account health management & policy compliance",
      "Promotions, lightning deals & brand fest execution",
      "Multi-channel inventory sync & price parity control"
    ],
    businessOutcome: "Increase marketplace market share & sales velocity",
    badge: "Core Service",
    href: "/capabilities/marketplace-operations",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" />
      </svg>
    )
  },
  {
    id: "sales-strategy-planning",
    category: "Strategy & Sales",
    title: "Sales Strategy & Planning",
    shortDesc: "Dedicated revenue planning, annual/quarterly forecasts, category targets, and channel strategy.",
    whatWeDo: [
      "Annual & quarterly marketplace sales forecasting",
      "Category, hero SKU and long-tail portfolio planning",
      "Channel strategy & multi-platform price elasticity modeling",
      "Event-driven promotional calendars & margin governance"
    ],
    businessOutcome: "Build predictable, profitable revenue growth",
    badge: "Strategic Pillar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
        <circle cx="12" cy="7" r="1" />
      </svg>
    )
  },
  {
    id: "demand-planning",
    category: "Operations & Supply",
    title: "Demand Planning & Replenishment",
    shortDesc: "Algorithmic inventory forecasting, regional buffer planning, and zero-stockout governance.",
    whatWeDo: [
      "Run-rate velocity tracking & seasonal demand spikes",
      "Multi-state warehouse re-order trigger algorithms",
      "Safety stock buffers to eliminate out-of-stock penalties",
      "Slow-moving & obsolete stock (SLOB) mitigation strategies"
    ],
    businessOutcome: "Reduce stock-outs and avoid excess working capital lock-up",
    href: "/capabilities/inventory-planning",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="m7 10 3 3 7-7" />
      </svg>
    )
  },
  {
    id: "revenue-assurance",
    category: "Strategy & Sales",
    title: "Revenue Assurance & Leakage Audit",
    shortDesc: "Automated daily reconciliation identifying hidden deductions, weight disputes, and margin leakage.",
    whatWeDo: [
      "Marketplace commission & volumetric weight audit",
      "Customer return verification & lost transit claims",
      "Overcharged pick-pack & storage fee dispute recovery",
      "Consolidated settlement reconciliation vs. bank credit"
    ],
    businessOutcome: "Protect gross margins & recover 1.5% to 3.2% lost GMV",
    badge: "High ROI",
    href: "/capabilities/revenue-assurance",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M16 8a4 4 0 0 0-8 0v4" />
      </svg>
    )
  },
  {
    id: "advertising-ppc",
    category: "Creative & Media",
    title: "Marketplace Advertising & Performance",
    shortDesc: "Full-funnel Sponsored Ads, DSP programmatic media, and blended TACoS optimization.",
    whatWeDo: [
      "Keyword harvesting, negative targeting & bid optimization",
      "Sponsored Brands, Display, Video & Amazon DSP campaigns",
      "Organic rank defense against competitor brand conquesting",
      "ROAS-driven budget allocation tied directly to inventory availability"
    ],
    businessOutcome: "Improve profitable customer acquisition & lower blended TACoS",
    href: "/capabilities/marketplace-growth",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    id: "crm-retention",
    category: "Creative & Media",
    title: "CRM, Retention & Lifecycle Marketing",
    shortDesc: "Email, WhatsApp, SMS, loyalty workflows, and customer repeat purchase enablement.",
    whatWeDo: [
      "WhatsApp & SMS transactional & promotional workflows",
      "Post-purchase warranty registration & customer capture",
      "Cross-sell, up-sell and consumable refill reminder sequences",
      "Customer lifetime value (LTV) cohort analysis"
    ],
    businessOutcome: "Increase repeat purchase rates & expand direct customer relationships",
    href: "/d2c-commerce-operations",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  },
  {
    id: "creative-content",
    category: "Creative & Media",
    title: "Creative & Content Studio Division",
    shortDesc: "Dedicated production studio: Product photography, 3D renders, A+ Content & Brand Stores.",
    whatWeDo: [
      "High-resolution e-commerce studio photography & videos",
      "Premium Amazon A+ / Enhanced Brand Content (EBC) & Brand Stores",
      "Conversion-engineered infographics & lifestyle imagery",
      "Search-optimized titles, bullet points, and backend indexing"
    ],
    businessOutcome: "Dramatically improve click-through rates (CTR) & listing conversion (CVR)",
    badge: "Dedicated Studio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    )
  },
  {
    id: "operations-fulfilment",
    category: "Operations & Supply",
    title: "12-State Fulfilment & Operations",
    shortDesc: "Pan-India physical warehouse infrastructure with sub-24hr dispatch SLAs and reverse logistics.",
    whatWeDo: [
      "12-State regional warehouse stocking (Prime / Assured badging)",
      "B2C, B2B, heavy-bulky staging & quick-commerce dark store replenishment",
      "Serial number barcode scanning & zero-defect dispatch QC",
      "Reverse logistics triage, refurbishment & claims management"
    ],
    businessOutcome: "Deliver sub-24hr nationwide shipping with 98.6% on-time dispatch SLA",
    badge: "12 State Hubs",
    href: "/specialised/fulfilment-network",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  },
  {
    id: "international-expansion",
    category: "Global",
    title: "International Expansion: Global Selling",
    shortDesc: "Take your Indian brand global across Amazon Global Selling in the UAE, Saudi Arabia, USA & UK.",
    whatWeDo: [
      "International market-entry strategy, regulatory & compliance audit",
      "Catalog localization, international pricing & tax coordination",
      "Cross-border ocean/air freight & destination FBA warehousing",
      "International PPC campaign management & local competitor benchmarking"
    ],
    businessOutcome: "Unlock dollar/dirham revenue and establish global brand equity",
    badge: "Global Selling",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
];

export default function ServiceMatrix({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceMatrixItem | null>(servicesData[0]);

  const filtered = activeTab === "all"
    ? servicesData
    : servicesData.filter((item) => item.category === activeTab);

  return (
    <section
      id="service-matrix"
      className="scroll-blur-reveal"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "5rem 1.5rem 5.5rem",
        borderTop: "1.5px solid rgba(191, 219, 254, 0.45)",
        borderBottom: "1.5px solid rgba(191, 219, 254, 0.45)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="ambient-glow-orb-left" style={{ opacity: 0.5 }} />
      <div className="ambient-glow-orb-right" style={{ opacity: 0.55 }} />

      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.8rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0.26rem 0.95rem",
            borderRadius: "99px",
            background: "rgba(239, 246, 255, 0.9)",
            border: "1px solid rgba(191, 219, 254, 0.8)",
            color: "#2563EB",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
            Everything We Do • Visual Service Matrix
          </span>
          <h2 style={{
            fontSize: "clamp(1.95rem, 3vw, 2.6rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.7rem"
          }}>
            Nine Integrated Divisions. One Operating Partner.
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "#475569",
            maxWidth: "680px",
            margin: "0 auto 1.8rem",
            lineHeight: 1.65
          }}>
            Understand GoodLife’s full capability in 60 seconds. Every division connects directly to your top-line sales, operational efficiency, and gross margin protection.
          </p>

          {/* Filter Pills */}
          <div className="service-matrix-categories" style={{
            display: "inline-flex",
            background: "#F1F5F9",
            padding: "4px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            gap: "4px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {[
              { id: "all", label: "All 9 Divisions" },
              { id: "Strategy & Sales", label: "Sales & Strategy" },
              { id: "Operations & Supply", label: "Operations & 12-State" },
              { id: "Creative & Media", label: "Creative & Ads" },
              { id: "Global", label: "International Expansion" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  border: "none",
                  background: activeTab === tab.id ? "#2563EB" : "transparent",
                  color: activeTab === tab.id ? "#FFFFFF" : "#475569",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "9px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 9-Grid Visual Service Matrix */}
        <div
          className="service-matrix-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "1.4rem",
            marginBottom: "2.5rem"
          }}
        >
          {filtered.map((item) => {
            const isSelected = selectedService?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedService(item)}
                style={{
                  background: "#FFFFFF",
                  border: isSelected ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "1.5rem",
                  boxShadow: isSelected
                    ? "0 12px 30px rgba(37, 99, 235, 0.12)"
                    : "0 3px 12px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#93C5FD";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                    <div style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "#EFF6FF",
                      border: "1px solid #BFDBFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {item.icon}
                    </div>
                    {item.badge && (
                      <span style={{
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        background: "#F0FDF4",
                        color: "#15803D",
                        border: "1px solid #BBF7D0",
                        padding: "0.18rem 0.55rem",
                        borderRadius: "99px"
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Desc */}
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "#0B1736",
                    margin: "0 0 0.4rem",
                    letterSpacing: "-0.3px"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: "0.84rem",
                    color: "#64748B",
                    lineHeight: 1.5,
                    margin: "0 0 1rem"
                  }}>
                    {item.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div style={{
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: "0.75rem",
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem"
                  }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px" }}>
                      What We Execute:
                    </div>
                    {item.whatWeDo.map((bullet, bIdx) => (
                      <div key={bIdx} style={{ display: "flex", alignItems: "flex-start", gap: "7px", fontSize: "0.78rem", color: "#334155", fontWeight: 550 }}>
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <circle cx="10" cy="10" r="9" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
                          <path d="M6 10.2l2.6 2.6L14.2 7" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome Footer Banner */}
                <div style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "0.6rem 0.8rem",
                  marginTop: "auto"
                }}>
                  <div style={{ fontSize: "0.66rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "0.15rem" }}>
                    Business Outcome
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.35 }}>
                    {item.businessOutcome}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
