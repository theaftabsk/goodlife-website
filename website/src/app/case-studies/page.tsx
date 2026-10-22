"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { getCaseStudies, CaseStudyDetail } from "./caseStudiesData";
import "./case-studies.css";

export default function CaseStudiesPage() {
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyDetail[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [quickPreviewItem, setQuickPreviewItem] = useState<CaseStudyDetail | null>(null);

  useEffect(() => {
    // Load published case studies from localStorage (or fallback seeds)
    setCaseStudiesList(getCaseStudies());

    // Listen for cross-tab or admin storage updates
    const handleStorage = () => {
      setCaseStudiesList(getCaseStudies());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const categories = [
    "All",
    "Marketplace Scale",
    "Heavy & Bulky",
    "Revenue Assurance",
    "Pan-India Logistics"
  ];

  const filteredStudies = useMemo(() => {
    return caseStudiesList.filter((cs) => {
      const matchFilter =
        activeFilter === "All" ||
        cs.category === activeFilter ||
        cs.industry?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        cs.capabilities?.some((cap) => cap.toLowerCase().includes(activeFilter.toLowerCase()));

      const matchSearch =
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cs.industry && cs.industry.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchFilter && matchSearch;
    });
  }, [caseStudiesList, activeFilter, searchQuery]);

  const featuredStudy = useMemo(() => {
    return caseStudiesList.find((c) => c.isFeatured) || caseStudiesList[0];
  }, [caseStudiesList]);

  return (
    <div className="cs-page-root" style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0F172A", fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}>
      <Header onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* Hero Section — Light, Crisp, High-Contrast & Beautiful */}
      <section className="cs-hero-section">
        {/* Soft Sky Blue Aurora Glow */}
        <div className="cs-hero-glow" />

        <div className="cs-hero-container">
          {/* Breadcrumb Navigation */}
          <div className="cs-breadcrumb">
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Case Studies &amp; Outcomes</span>
          </div>

          {/* Eyebrow Pill */}
          <div className="cs-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            VERIFIED OPERATIONAL OUTCOMES
          </div>

          {/* Main Headline — Crisp Dark Color for Perfect Visibility */}
          <h1 className="cs-hero-title">
            Real Proof Points in Appliance &amp;{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Electronics Commerce.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="cs-hero-desc">
            Explore how GoodLife engineers high-speed regional logistics, eliminates in-transit fragile damage, and scales Indian manufacturers to market-leading marketplace positions.
          </p>

          {/* Key Enterprise Achievements Metric Bar */}
          <div className="cs-hero-metrics">
            <div className="cs-metric-cell">
              <div className="cs-metric-num" style={{ color: "#2563EB" }}>
                ₹420+ Cr
              </div>
              <div className="cs-metric-lbl">
                Annual GMV Scaled
              </div>
            </div>

            <div className="cs-metric-cell">
              <div className="cs-metric-num" style={{ color: "#059669" }}>
                99.4%
              </div>
              <div className="cs-metric-lbl">
                On-Time Dispatch SLA
              </div>
            </div>

            <div className="cs-metric-cell">
              <div className="cs-metric-num" style={{ color: "#D97706" }}>
                0.4%
              </div>
              <div className="cs-metric-lbl">
                Fragile Breakage (from 14%)
              </div>
            </div>

            <div className="cs-metric-cell">
              <div className="cs-metric-num" style={{ color: "#7C3AED" }}>
                12 Hubs
              </div>
              <div className="cs-metric-lbl">
                Multi-State GST Warehousing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="cs-main-wrap">
        {/* Featured Case Study Spotlight Card */}
        {featuredStudy && activeFilter === "All" && !searchQuery && (
          <div className="cs-featured-card">
            <div className="cs-featured-media">
              <img
                src={featuredStudy.coverImage}
                alt={featuredStudy.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                background: "#FEF3C7",
                color: "#B45309",
                fontSize: "0.76rem",
                fontWeight: 800,
                padding: "0.35rem 0.85rem",
                borderRadius: "30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#B45309" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                FEATURED SPOTLIGHT
              </div>
            </div>

            <div className="cs-featured-body">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                  <span style={{
                    background: "#EFF6FF",
                    color: "#1D4ED8",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    padding: "0.25rem 0.7rem",
                    borderRadius: "6px"
                  }}>
                    {featuredStudy.industry || featuredStudy.category}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
                    {featuredStudy.timeframe}
                  </span>
                </div>

                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#2563EB", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  CLIENT: {featuredStudy.client}
                </div>

                <h2 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", fontWeight: 900, color: "#0F172A", margin: "0 0 0.8rem", lineHeight: 1.3 }}>
                  <Link href={`/case-studies/${featuredStudy.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {featuredStudy.title}
                  </Link>
                </h2>

                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
                  {featuredStudy.shortDescription}
                </p>

                {/* Outcome Metrics Grid */}
                <div className="cs-featured-metrics">
                  {featuredStudy.metrics.slice(0, 3).map((m, i) => (
                    <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.75rem 0.9rem", borderRadius: "10px" }}>
                      <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#059669", lineHeight: 1.1 }}>{m.val}</div>
                      <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748B", marginTop: "0.25rem" }}>{m.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-featured-actions">
                <Link
                  href={`/case-studies/${featuredStudy.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    padding: "0.75rem 1.4rem",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
                    transition: "all 0.15s"
                  }}
                >
                  Read Full Case Study
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <button
                  onClick={() => setQuickPreviewItem(featuredStudy)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "#F1F5F9",
                    color: "#334155",
                    padding: "0.75rem 1.1rem",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer"
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Quick Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar: Category Filters & Search */}
        <div className="cs-toolbar">
          {/* Filter Pills with smooth mobile scroll */}
          <div className="cs-filters-scroll">
            {categories.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  className="cs-filter-btn"
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    border: active ? "1.5px solid #2563EB" : "1px solid #CBD5E1",
                    background: active ? "#2563EB" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#475569",
                    boxShadow: active ? "0 2px 8px rgba(37,99,235,0.2)" : "none"
                  }}
                >
                  {cat === "All" ? "All Breakthroughs" : cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="cs-search-wrap">
            <span style={{ position: "absolute", left: "0.95rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search case studies or OEM client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.9rem 0.6rem 2.4rem",
                borderRadius: "30px",
                border: "1px solid #CBD5E1",
                background: "#FFFFFF",
                fontSize: "0.86rem",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="cs-grid">
          {filteredStudies.map((cs) => (
            <div key={cs.id} className="cs-card">
              {/* Cover Image Container */}
              <div className="cs-card-media">
                <img
                  src={cs.coverImage}
                  alt={cs.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  top: "0.85rem",
                  left: "0.85rem",
                  background: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(4px)",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.65rem",
                  borderRadius: "6px"
                }}>
                  {cs.industry || cs.category}
                </div>

                {cs.timeframe && (
                  <div style={{
                    position: "absolute",
                    bottom: "0.85rem",
                    right: "0.85rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(4px)",
                    color: "#0F172A",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.22rem 0.6rem",
                    borderRadius: "6px"
                  }}>
                    {cs.timeframe}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="cs-card-body">
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                    CLIENT: {cs.client}
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.6rem", lineHeight: 1.35 }}>
                    <Link href={`/case-studies/${cs.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {cs.title}
                    </Link>
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.55, margin: "0 0 1.2rem" }}>
                    {cs.shortDescription}
                  </p>

                  {/* Metrics Row */}
                  <div className="cs-card-metrics">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.6rem 0.75rem", borderRadius: "8px" }}>
                        <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#059669" }}>{m.val}</div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>{m.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="cs-card-actions">
                  <button
                    onClick={() => setQuickPreviewItem(cs)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#64748B",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.3rem 0"
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Quick Preview
                  </button>

                  <Link
                    href={`/case-studies/${cs.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "#2563EB",
                      fontSize: "0.86rem",
                      fontWeight: 800,
                      textDecoration: "none"
                    }}
                  >
                    Explore Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredStudies.length === 0 && (
          <div style={{
            background: "#FFFFFF",
            padding: "4rem 2rem",
            borderRadius: "16px",
            border: "1px dashed #CBD5E1",
            textAlign: "center"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem" }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#334155", margin: "0 0 0.4rem" }}>
              No Matching Case Studies
            </h3>
            <p style={{ color: "#64748B", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
              We couldn't find any enterprise outcomes matching your search query or filter.
            </p>
            <button
              onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
              style={{
                padding: "0.55rem 1.2rem",
                borderRadius: "8px",
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                fontWeight: 700,
                fontSize: "0.86rem",
                cursor: "pointer"
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Enterprise Diagnostic CTA Card */}
        <div className="cs-cta-box">
          <div style={{ maxWidth: "650px" }}>
            <div style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              background: "#DBEAFE",
              border: "1px solid #BFDBFE",
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#1D4ED8",
              marginBottom: "0.6rem"
            }}>
              Enterprise Diagnostic
            </div>
            <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0F172A", margin: "0 0 0.8rem", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              Ready to Replicate These Results for Your Brand?
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, lineHeight: 1.6 }}>
              Run our 2-minute Commerce Readiness Diagnostic to benchmark your marketplace fulfillment, transit breakage risks, and commission leakage against tier-1 brand averages.
            </p>
          </div>

          <button
            onClick={() => setIsDiagnosticOpen(true)}
            className="cs-cta-btn"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
          >
            <span>Start Diagnostic Benchmark</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Preview Modal */}
      {quickPreviewItem && (
        <div className="cs-modal-overlay">
          <div className="cs-modal-card">
            <button
              onClick={() => setQuickPreviewItem(null)}
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                background: "#F1F5F9",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748B",
                fontWeight: 700
              }}
            >
              ✕
            </button>

            <div style={{ height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "1.2rem" }}>
              <img src={quickPreviewItem.coverImage} alt={quickPreviewItem.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "6px" }}>
                {quickPreviewItem.industry || quickPreviewItem.category}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>
                {quickPreviewItem.timeframe}
              </span>
            </div>

            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#2563EB", marginBottom: "0.2rem" }}>
              CLIENT: {quickPreviewItem.client}
            </div>

            <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 900, color: "#0F172A", margin: "0 0 0.8rem", lineHeight: 1.3 }}>
              {quickPreviewItem.title}
            </h2>

            <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 1.2rem" }}>
              {quickPreviewItem.shortDescription}
            </p>

            {/* Metrics Showcase */}
            <div className="cs-modal-metrics">
              {quickPreviewItem.metrics.map((m, idx) => (
                <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.75rem 0.9rem", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#059669" }}>{m.val}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B", marginTop: "0.2rem" }}>{m.lbl}</div>
                </div>
              ))}
            </div>

            <div className="cs-modal-actions">
              <button
                onClick={() => setQuickPreviewItem(null)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  cursor: "pointer"
                }}
              >
                Close Preview
              </button>

              <Link
                href={`/case-studies/${quickPreviewItem.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  padding: "0.65rem 1.3rem",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none"
                }}
              >
                View Full Detailed Case Study
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Commerce Diagnostic Modal */}
      {isDiagnosticOpen && <CommerceDiagnosticModal onClose={() => setIsDiagnosticOpen(false)} />}

      <Footer />
    </div>
  );
}
