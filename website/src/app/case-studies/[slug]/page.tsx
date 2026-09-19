"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { getCaseStudyBySlug, getCaseStudies, CaseStudyDetail } from "../caseStudiesData";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

  const [study, setStudy] = useState<CaseStudyDetail | null>(null);
  const [allStudies, setAllStudies] = useState<CaseStudyDetail[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      const found = getCaseStudyBySlug(slug);
      if (found) setStudy(found);
    }
    setAllStudies(getCaseStudies());
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!study) {
    return (
      <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0F172A", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <Header onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />
        <div style={{ maxWidth: "800px", margin: "6rem auto", textAlign: "center", padding: "2rem" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.8rem" }}>Case Study Not Found</h1>
          <p style={{ color: "#64748B", fontSize: "1rem", margin: "0 0 2rem" }}>
            The case study you are looking for might have been moved or updated.
          </p>
          <Link
            href="/case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#2563EB",
              color: "#FFFFFF",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontWeight: 700,
              textDecoration: "none"
            }}
          >
            ← Back to All Case Studies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related studies (excluding current)
  const relatedStudies = allStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0F172A", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Header onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* Top Breadcrumb Bar */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.82rem",
          color: "#64748B",
          flexWrap: "wrap"
        }}>
          <Link href="/" style={{ color: "#64748B", textDecoration: "none", fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href="/case-studies" style={{ color: "#64748B", textDecoration: "none", fontWeight: 600 }}>Case Studies</Link>
          <span>›</span>
          <span style={{ color: "#0F172A", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "450px" }}>
            {study.title}
          </span>
        </div>
      </div>

      {/* Hero Header Section — Light, Crisp, High-Contrast & Beautiful */}
      <section style={{
        position: "relative",
        paddingTop: "4rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 50%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        {/* Soft Aurora Glow */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "450px",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(56,189,248,0.03) 50%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", position: "relative", zIndex: 2 }}>
          {/* Metadata Badges & Share Button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <span style={{
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                color: "#1D4ED8",
                fontSize: "0.8rem",
                fontWeight: 800,
                padding: "0.35rem 0.8rem",
                borderRadius: "30px",
                letterSpacing: "0.3px"
              }}>
                {study.industry || study.category}
              </span>

              {study.location && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "#64748B",
                  fontSize: "0.82rem",
                  fontWeight: 600
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {study.location}
                </span>
              )}

              {study.timeframe && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "#64748B",
                  fontSize: "0.82rem",
                  fontWeight: 600
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {study.timeframe}
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#FFFFFF",
                border: "1px solid #CBD5E1",
                color: "#334155",
                padding: "0.45rem 0.95rem",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {copiedLink ? "Link Copied!" : "Share Case Study"}
            </button>
          </div>

          <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.4rem" }}>
            CLIENT OEM: {study.client}
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            maxWidth: "980px",
            color: "#0F172A",
            margin: "0 0 1.2rem"
          }}>
            {study.title}
          </h1>

          <p style={{
            fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
            color: "#475569",
            maxWidth: "860px",
            lineHeight: 1.65,
            margin: 0
          }}>
            {study.shortDescription}
          </p>
        </div>
      </section>

      {/* Outcome Metrics Bar (Floating Grid) */}
      <div style={{ maxWidth: "1200px", margin: "-2rem auto 3rem", padding: "0 1.25rem", position: "relative", zIndex: 10 }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.07)",
          padding: "1.6rem 2rem",
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(190px, 1fr))`,
          gap: "1.5rem"
        }}>
          {study.metrics.map((m, idx) => (
            <div key={idx} style={{
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", fontWeight: 900, color: "#059669", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {m.val}
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginTop: "0.35rem" }}>
                {m.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout (Responsive) */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem 5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "start"
        }}>
          {/* Left Column: Full Case Study Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Facility / Product Cover Image */}
            {study.coverImage && (
              <div style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                maxHeight: "440px",
                background: "#0F172A"
              }}>
                <img
                  src={study.coverImage}
                  alt={study.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            {/* Section 1: The Challenge */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "2.2rem 2.4rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "#FEF2F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  The Challenge & Pre-GoodLife Bottleneck
                </h2>
              </div>

              <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                {study.challenge}
              </p>
            </div>

            {/* Section 2: The Solution */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "2.2rem 2.4rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "#ECFDF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  The Operational Solution Deployed
                </h2>
              </div>

              <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7, margin: "0 0 1.8rem" }}>
                {study.solution}
              </p>

              {/* Execution Action Items List */}
              {study.actionTaken && study.actionTaken.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 1rem" }}>
                    Execution Milestones & Infrastructure Deployed:
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {study.actionTaken.map((action, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                        <div style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "0.2rem"
                        }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "0.94rem", color: "#334155", lineHeight: 1.55 }}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Client Testimonial */}
            {study.testimonial && study.testimonial.quote && (
              <div style={{
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                borderRadius: "16px",
                padding: "2.4rem 2.6rem",
                color: "#FFFFFF",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontSize: "5rem", color: "rgba(255,255,255,0.06)", fontFamily: "Georgia, serif", lineHeight: 1 }}>
                  “
                </div>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#F59E0B",
                  marginBottom: "1rem"
                }}>
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p style={{
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "#F1F5F9",
                  margin: "0 0 1.6rem",
                  position: "relative",
                  zIndex: 1
                }}>
                  "{study.testimonial.quote}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#3B82F6",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "1.1rem"
                  }}>
                    {study.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#FFFFFF" }}>
                      {study.testimonial.author}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
                      {study.testimonial.designation}, {study.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Capabilities Deployed */}
            {study.capabilities && study.capabilities.length > 0 && (
              <div style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "1.8rem 2.2rem"
              }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.85rem" }}>
                  GoodLife Capabilities & Services Deployed
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {study.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#EFF6FF",
                        color: "#1D4ED8",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        padding: "0.35rem 0.8rem",
                        borderRadius: "20px",
                        border: "1px solid #BFDBFE"
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: OEM Profile & Diagnostic CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "sticky", top: "2rem" }}>
            {/* OEM Profile Card */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "1.6rem 1.8rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 1.2rem", borderBottom: "1px solid #F1F5F9", paddingBottom: "0.6rem" }}>
                Client Project Overview
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Industry Vertical</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginTop: "0.15rem" }}>
                    {study.industry || study.category}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Distribution Reach</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginTop: "0.15rem" }}>
                    {study.location || "Pan-India Tier 1-3 PIN Codes"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Time to Scale</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginTop: "0.15rem" }}>
                    {study.timeframe || "Under 9 Months"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Operating Model</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginTop: "0.15rem" }}>
                    Multi-Hub Regional Fulfillment + FBA/FBF
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Action Card */}
            <div style={{
              background: "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
              borderRadius: "16px",
              padding: "1.8rem",
              color: "#FFFFFF",
              boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.3)"
            }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.4rem" }}>
                Enterprise Diagnostic
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.6rem", lineHeight: 1.3 }}>
                Replicate These Results for Your Brand
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.5, margin: "0 0 1.2rem" }}>
                Get an instant diagnostic report evaluating your marketplace fee leaks, fulfillment speed, and damage mitigation.
              </p>

              <button
                onClick={() => setIsDiagnosticOpen(true)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
                }}
              >
                Run Diagnostic Assessment
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Navigation back */}
            <Link
              href="/case-studies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                background: "#FFFFFF",
                color: "#475569",
                fontSize: "0.86rem",
                fontWeight: 700,
                textDecoration: "none"
              }}
            >
              ← Back to All Case Studies
            </Link>
          </div>
        </div>

        {/* Related Case Studies Grid at Bottom */}
        {relatedStudies.length > 0 && (
          <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
              <div>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Explore More Enterprise Case Studies
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748B", margin: "0.2rem 0 0" }}>
                  Proven transformations across appliances, electronics, and power backup.
                </p>
              </div>
              <Link
                href="/case-studies"
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#2563EB",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                View All Case Studies →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {relatedStudies.map((rel) => (
                <div
                  key={rel.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{ height: "160px", position: "relative", background: "#F1F5F9" }}>
                    <img src={rel.coverImage} alt={rel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(15, 23, 42, 0.8)",
                      color: "#FFFFFF",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "5px"
                    }}>
                      {rel.industry || rel.category}
                    </div>
                  </div>

                  <div style={{ padding: "1.2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                        {rel.client}
                      </div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.35 }}>
                        <Link href={`/case-studies/${rel.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {rel.title}
                        </Link>
                      </h4>
                    </div>

                    <Link
                      href={`/case-studies/${rel.slug}`}
                      style={{
                        marginTop: "1rem",
                        color: "#2563EB",
                        fontSize: "0.84rem",
                        fontWeight: 800,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem"
                      }}
                    >
                      Read Case Study →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Commerce Diagnostic Modal */}
      {isDiagnosticOpen && <CommerceDiagnosticModal onClose={() => setIsDiagnosticOpen(false)} />}

      <Footer />
    </div>
  );
}
