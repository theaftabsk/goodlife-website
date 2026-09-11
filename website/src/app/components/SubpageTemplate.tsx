"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import CommerceDiagnosticModal from "./CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

export interface PillarItem {
  num: string;
  title: string;
  desc: string;
  deliverables: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  timeline?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SubpageTemplateProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  stats: StatItem[];
  overviewTitle: string;
  overviewText: string;
  challenges: { title: string; desc: string }[];
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: PillarItem[];
  workflowTitle?: string;
  workflowSteps?: ProcessStep[];
  faqs?: FAQItem[];
  relatedSolutions?: { name: string; href: string; tag: string }[];
}

export default function SubpageTemplate({
  badge,
  title,
  subtitle,
  stats,
  overviewTitle,
  overviewText,
  challenges,
  pillarsTitle,
  pillarsSubtitle,
  pillars,
  workflowTitle = "How We Execute",
  workflowSteps,
  faqs,
  relatedSolutions
}: SubpageTemplateProps) {
  const [diagOpen, setDiagOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className={`subpage-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      {/* ── SHARED STICKY HEADER ── */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── HERO SECTION (Light Executive Glass Style) ── */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        {/* Ambient Radial Sky Glow */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        {/* Precision Grid Overlay */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}>
          <defs>
            <pattern id="subpage-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray="2 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subpage-grid)" />
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>{badge.split("•")[0]?.trim() || "Operations"}</span>
          </div>

          <div style={{ maxWidth: "900px" }}>
            {/* Pill Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.45rem 1.25rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "#1D4ED8",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              boxShadow: "0 4px 14px rgba(37,99,235,0.08)"
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", display: "inline-block", position: "relative" }}>
                <span style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: "#60A5FA", animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              </span>
              {badge}
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              {title}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "820px",
              fontWeight: 500
            }}>
              {subtitle}
            </p>

            {/* CTA Buttons Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.32)",
                  transition: "all 0.22s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 99, 235, 0.42)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 99, 235, 0.32)";
                }}
              >
                <span>UNLOCK YOUR GROWTH</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <Link
                href="/contact"
                style={{
                  height: "54px",
                  padding: "0 1.8rem",
                  borderRadius: "14px",
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  color: "#0F172A",
                  fontSize: "0.96rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.22s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2563EB";
                  e.currentTarget.style.color = "#2563EB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#CBD5E1";
                  e.currentTarget.style.color = "#0F172A";
                }}
              >
                <span>Talk to an Operator</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      {stats && stats.length > 0 && (
        <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "2.5rem 0" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`, gap: "1.5rem" }} className="stats-grid-responsive">
              {stats.map((st, sIdx) => (
                <div key={sIdx} style={{ textAlign: "center", padding: "0 1rem" }}>
                  <div style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    fontWeight: 900,
                    color: "#0B1736",
                    lineHeight: 1.1,
                    marginBottom: "0.35rem",
                    letterSpacing: "-1px"
                  }}>
                    <span style={{ background: "linear-gradient(135deg, #0B1736 0%, #2563EB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {st.value}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.2rem" }}>
                    {st.label}
                  </div>
                  {st.sub && (
                    <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 500 }}>
                      {st.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OVERVIEW & CHALLENGES SECTION ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "flex-start"
          }} className="overview-split-responsive">
            
            {/* Left: Strategic Context */}
            <div>
              <div style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                color: "#2563EB",
                textTransform: "uppercase",
                marginBottom: "0.75rem"
              }}>
                The Operating Mandate
              </div>
              <h2 style={{
                fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)",
                fontWeight: 800,
                color: "#0B1736",
                lineHeight: 1.25,
                letterSpacing: "-1px",
                margin: "0 0 1.2rem"
              }}>
                {overviewTitle}
              </h2>
              <p style={{
                fontSize: "1.05rem",
                color: "#475569",
                lineHeight: 1.75,
                marginBottom: "1.5rem",
                fontWeight: 500
              }}>
                {overviewText}
              </p>

              {/* Callout box */}
              <div style={{
                background: "#EFF6FF",
                border: "1.5px solid #BFDBFE",
                borderRadius: "16px",
                padding: "1.4rem 1.6rem",
                marginTop: "1.5rem"
              }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    border: "1.5px solid #BFDBFE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1D4ED8", marginBottom: "0.25rem" }}>
                      One Single Point of Accountability
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.55 }}>
                      No finger-pointing between marketing agencies, warehouse teams, and accounting staff. Good Life connects catalog, ads, stock, and audits under one roof.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Failure Modes We Solve */}
            <div>
              <div style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                color: "#DC2626",
                textTransform: "uppercase",
                marginBottom: "0.75rem"
              }}>
                Common Failure Modes
              </div>
              <h3 style={{
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "#0B1736",
                marginBottom: "1.25rem"
              }}>
                Why Brands Lose Margin & Momentum
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {challenges.map((ch, cIdx) => (
                  <div key={cIdx} style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "1.25rem 1.4rem",
                    border: "1.5px solid #E2E8F0",
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.4rem" }}>
                      <span style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#FEE2E2",
                        border: "1px solid #FECACA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </span>
                      <span style={{ fontWeight: 800, fontSize: "0.98rem", color: "#0F172A" }}>{ch.title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55 }}>
                      {ch.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CORE PILLARS & DELIVERABLES (The Meat) ── */}
      <section style={{ padding: "5.5rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "#1D4ED8",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              marginBottom: "0.8rem"
            }}>
              Operational Deliverables
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
              fontWeight: 800,
              color: "#0B1736",
              lineHeight: 1.2,
              letterSpacing: "-1px",
              margin: "0 0 0.75rem"
            }}>
              {pillarsTitle}
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, fontWeight: 500 }}>
              {pillarsSubtitle}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.75rem"
          }}>
            {pillars.map((pil, pIdx) => (
              <div
                key={pIdx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "22px",
                  border: "1.5px solid #E2E8F0",
                  padding: "2rem 1.85rem",
                  boxShadow: "0 12px 36px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#BFDBFE";
                  e.currentTarget.style.boxShadow = "0 18px 45px rgba(37, 99, 235, 0.09)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.boxShadow = "0 12px 36px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0,0,0,0.02)";
                }}
              >
                <div>
                  {/* Badge & Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                    <span style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "#EFF6FF",
                      color: "#2563EB",
                      fontSize: "0.85rem",
                      fontWeight: 900,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #BFDBFE",
                      flexShrink: 0
                    }}>
                      {pil.num}
                    </span>
                    <h3 style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0B1736",
                      margin: 0,
                      lineHeight: 1.3
                    }}>
                      {pil.title}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: "0.92rem",
                    color: "#475569",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem"
                  }}>
                    {pil.desc}
                  </p>

                  {/* Checklist of concrete items */}
                  <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {pil.deliverables.map((d, dIdx) => (
                      <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#EFF6FF",
                          border: "1px solid #BFDBFE",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span style={{ fontSize: "0.86rem", color: "#1E293B", fontWeight: 500, lineHeight: 1.5 }}>
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── WORKFLOW / EXECUTION TIMELINE (How Engagement Works) ── */}
      {workflowSteps && workflowSteps.length > 0 && (
        <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
            
            <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
              <div style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                color: "#2563EB",
                textTransform: "uppercase",
                marginBottom: "0.75rem"
              }}>
                Accountable Operating Model
              </div>
              <h2 style={{
                fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                fontWeight: 800,
                color: "#0B1736",
                letterSpacing: "-1px",
                margin: "0 0 0.75rem"
              }}>
                {workflowTitle}
              </h2>
              <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
                From technical discovery and commercial alignment to live marketplace execution and SLA reviews.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${workflowSteps.length}, minmax(0, 1fr))`,
              gap: "1.5rem",
              position: "relative"
            }} className="workflow-grid-responsive">
              {workflowSteps.map((wf, wIdx) => (
                <div
                  key={wIdx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    border: "1.5px solid #E2E8F0",
                    padding: "1.75rem 1.5rem",
                    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                        color: "#FFFFFF",
                        fontSize: "0.9rem",
                        fontWeight: 900,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {wIdx + 1}
                      </span>
                      {wf.timeline && (
                        <span style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          background: "#F1F5F9",
                          color: "#475569",
                          border: "1px solid #E2E8F0"
                        }}>
                          {wf.timeline}
                        </span>
                      )}
                    </div>

                    <h4 style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#0B1736",
                      marginBottom: "0.5rem"
                    }}>
                      {wf.title}
                    </h4>

                    <p style={{
                      fontSize: "0.88rem",
                      color: "#64748B",
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {wf.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── RELATED OPERATIONAL NODES ── */}
      {relatedSolutions && relatedSolutions.length > 0 && (
        <section style={{ padding: "4rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736" }}>
                Connected Capabilities in Good Life&apos;s Operating Engine
              </h3>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {relatedSolutions.map((rel, rIdx) => (
                <Link
                  key={rIdx}
                  href={rel.href}
                  style={{
                    padding: "0.85rem 1.4rem",
                    borderRadius: "14px",
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.background = "#EFF6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "#F8FAFC";
                  }}
                >
                  <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>{rel.tag}</span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A" }}>{rel.name}</span>
                  <span style={{ color: "#2563EB" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ACCORDION ── */}
      {faqs && faqs.length > 0 && (
        <section style={{ padding: "5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
            
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                color: "#2563EB",
                textTransform: "uppercase",
                marginBottom: "0.6rem"
              }}>
                Got Questions?
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 800, color: "#0B1736", margin: 0 }}>
                Frequently Asked Operational Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {faqs.map((f, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      border: `1.5px solid ${isOpen ? "#BFDBFE" : "#E2E8F0"}`,
                      overflow: "hidden",
                      boxShadow: isOpen ? "0 8px 24px rgba(37,99,235,0.06)" : "0 2px 6px rgba(0,0,0,0.02)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        padding: "1.25rem 1.4rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left"
                      }}
                    >
                      <span style={{ fontSize: "1rem", fontWeight: 700, color: isOpen ? "#1D4ED8" : "#0F172A", lineHeight: 1.4 }}>
                        {f.q}
                      </span>
                      <span style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: isOpen ? "#EFF6FF" : "#F1F5F9",
                        border: `1.5px solid ${isOpen ? "#BFDBFE" : "#E2E8F0"}`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#2563EB" : "#64748B"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: "0 1.4rem 1.25rem",
                        fontSize: "0.92rem",
                        color: "#475569",
                        lineHeight: 1.68,
                        borderTop: "1px solid #F1F5F9",
                        paddingTop: "1rem"
                      }}>
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ── FINAL CONVERSION BANNER ── */}
      <section style={{ padding: "5rem 0 5.5rem", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{
            background: "linear-gradient(135deg, #0B1736 0%, #0F2557 100%)",
            borderRadius: "28px",
            padding: "3.5rem 3rem",
            color: "#FFFFFF",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(11, 23, 54, 0.25)"
          }} className="cta-banner-responsive">
            
            {/* Subtle glow */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "400px",
              background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)",
              pointerEvents: "none"
            }} />

            <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                color: "#60A5FA"
              }}>
                Take The First Step Today
              </div>

              <h2 style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: "-1px",
                margin: "0 0 1rem"
              }}>
                Ready to Accelerate Your Commerce Mandate?
              </h2>

              <p style={{
                fontSize: "1.05rem",
                color: "#94A3B8",
                lineHeight: 1.65,
                marginBottom: "2.2rem"
              }}>
                Complete our interactive Commerce Diagnostic to assess your category maturity, revenue leakage, and warehouse readiness in under 3 minutes.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "56px",
                    padding: "0 2.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
                    transition: "all 0.22s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <Link
                  href="/contact"
                  style={{
                    height: "56px",
                    padding: "0 2rem",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1.5px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.22s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                >
                  Contact Leadership Team
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SHARED FOOTER ── */}
      <Footer />

      {/* ── COMMERCE DIAGNOSTIC MODAL ── */}
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* Responsive Styles */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @media (max-width: 900px) {
          .stats-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
          .overview-split-responsive {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .workflow-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .cta-banner-responsive {
            padding: 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
