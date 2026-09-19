"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { getCaseStudies, CaseStudyDetail } from "./caseStudiesData";

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
    <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0F172A", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Header onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* Hero Section — Light, Crisp, High-Contrast & Beautiful */}
      <section style={{
        position: "relative",
        paddingTop: "8.5rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 45%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        {/* Soft Sky Blue Aurora Glow */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1200px",
          height: "550px",
          background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, rgba(56,189,248,0.04) 45%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", position: "relative", zIndex: 2 }}>
          {/* Breadcrumb Navigation */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: "#64748B",
            marginBottom: "1.2rem",
            fontWeight: 500
          }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 700 }}>Case Studies &amp; Outcomes</span>
          </div>

          {/* Eyebrow Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            padding: "0.4rem 1rem",
            borderRadius: "30px",
            fontSize: "0.82rem",
            fontWeight: 800,
            color: "#1D4ED8",
            marginBottom: "1.2rem",
            letterSpacing: "0.4px"
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            VERIFIED OPERATIONAL OUTCOMES
          </div>

          {/* Main Headline — Crisp Dark Color for Perfect Visibility */}
          <h1 style={{
            fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "960px",
            color: "#0F172A",
            margin: "0 0 1.2rem"
          }}>
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
          <p style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "#475569",
            maxWidth: "820px",
            lineHeight: 1.6,
            margin: "0 0 2.8rem"
          }}>
            Explore how GoodLife engineers high-speed regional logistics, eliminates in-transit fragile damage, and scales Indian manufacturers to market-leading marketplace positions.
          </p>

          {/* Key Enterprise Achievements Metric Bar — Light Card, 100% Mobile Responsive */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.2rem",
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "1.6rem 2rem",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)"
          }}>
            <div style={{ padding: "0.4rem 0" }}>
              <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#2563EB", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                ₹420+ Cr
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 700, marginTop: "0.35rem" }}>
                Annual GMV Scaled
              </div>
            </div>

            <div style={{ padding: "0.4rem 0" }}>
              <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#059669", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                99.4%
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 700, marginTop: "0.35rem" }}>
                On-Time Dispatch SLA
              </div>
            </div>

            <div style={{ padding: "0.4rem 0" }}>
              <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#D97706", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                0.4%
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 700, marginTop: "0.35rem" }}>
                Fragile Breakage (from 14%)
              </div>
            </div>

            <div style={{ padding: "0.4rem 0" }}>
              <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#7C3AED", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                12 Hubs
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 700, marginTop: "0.35rem" }}>
                Multi-State GST Warehousing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 1.25rem 5rem" }}>
        {/* Featured Case Study Spotlight Card (Clean & Responsive) */}
        {featuredStudy && activeFilter === "All" && !searchQuery && (
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 12px 32px -10px rgba(0,0,0,0.07)",
            overflow: "hidden",
            marginBottom: "3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "0"
          }}>
            <div style={{ position: "relative", minHeight: "300px", background: "#0F172A" }}>
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

            <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.8rem"
                }}>
                  {featuredStudy.metrics.slice(0, 3).map((m, i) => (
                    <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.75rem 0.9rem", borderRadius: "10px" }}>
                      <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#059669", lineHeight: 1.1 }}>{m.val}</div>
                      <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748B", marginTop: "0.25rem" }}>{m.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
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

        {/* Toolbar: Category Filters & Search (Mobile Responsive) */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.2rem",
          marginBottom: "2.2rem"
        }}>
          {/* Filter Pills with smooth mobile scroll */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            maxWidth: "100%",
            paddingBottom: "0.3rem"
          }}>
            {categories.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: "0.55rem 1.1rem",
                    borderRadius: "30px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: active ? "1.5px solid #2563EB" : "1px solid #CBD5E1",
                    background: active ? "#2563EB" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#475569",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                    boxShadow: active ? "0 2px 8px rgba(37,99,235,0.2)" : "none"
                  }}
                >
                  {cat === "All" ? "All Breakthroughs" : cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "380px" }}>
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

        {/* Case Studies Grid (Fully Responsive) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.8rem"
        }}>
          {filteredStudies.map((cs) => (
            <div
              key={cs.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1.5px solid #E2E8F0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              {/* Cover Image Container */}
              <div style={{ position: "relative", height: "200px", background: "#F1F5F9" }}>
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
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.2rem" }}>
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.6rem 0.75rem", borderRadius: "8px" }}>
                        <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#059669" }}>{m.val}</div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>{m.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid #F1F5F9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
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
        <div style={{
          marginTop: "5rem",
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
          borderRadius: "20px",
          padding: "clamp(2rem, 4vw, 3.5rem)",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
          boxShadow: "0 15px 35px -10px rgba(15, 23, 42, 0.35)"
        }}>
          <div style={{ maxWidth: "650px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.4rem" }}>
              Enterprise Diagnostic
            </div>
            <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 0.8rem", lineHeight: 1.25 }}>
              Ready to Replicate These Results for Your Brand?
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
              Run our 2-minute Commerce Readiness Diagnostic to benchmark your marketplace fulfillment, transit breakage risks, and commission leakage against tier-1 brand averages.
            </p>
          </div>

          <button
            onClick={() => setIsDiagnosticOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#FFFFFF",
              color: "#0F172A",
              padding: "0.9rem 1.8rem",
              borderRadius: "10px",
              border: "none",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(255,255,255,0.2)",
              transition: "all 0.15s"
            }}
          >
            Start Diagnostic Benchmark
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Preview Modal (Mobile Responsive) */}
      {quickPreviewItem && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            maxWidth: "720px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            padding: "clamp(1.2rem, 3vw, 2rem)",
            position: "relative"
          }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {quickPreviewItem.metrics.map((m, idx) => (
                <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.75rem 0.9rem", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#059669" }}>{m.val}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B", marginTop: "0.2rem" }}>{m.lbl}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid #E2E8F0", flexWrap: "wrap", gap: "0.8rem" }}>
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
