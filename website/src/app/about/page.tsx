"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Building2, FileCheck, MapPin, Truck, PhoneCall, Mail, ArrowRight, Check, X } from "lucide-react";
import "./about.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function AboutPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className={`about-root ${plusJakartaSans.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── SECTION 1: HERO SECTION ── */}
      <section className="about-hero-section">
        <div className="about-hero-glow" />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Breadcrumb */}
          <div className="about-hero-breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>About Good Life</span>
          </div>

          <div style={{ maxWidth: "900px" }}>
            {/* Pill Badge */}
            <div className="about-hero-badge">
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB", flexShrink: 0 }} />
              <span>Operator Credibility • Enterprise Commerce Partner</span>
            </div>

            {/* H1 Title */}
            <h1 className="about-hero-title">
              You Build The Product &amp; Brand. <br className="about-hero-br" />
              <span style={{ color: "#2563EB" }}>We Operate Commerce.</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="about-hero-desc">
              Good Life is not a marketing agency, an outsourced call center, or a freight reseller. We are India&apos;s Commerce Operating Partner for brands—running physical warehousing, multi-platform catalogue control, stock planning, advertising, and revenue assurance under one single accountable standard.
            </p>

            {/* Hero CTAs */}
            <div className="about-hero-actions mobile-btn-stack" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
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
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s ease"
                }}
              >
                <span>UNLOCK YOUR GROWTH</span>
                <ArrowRight size={16} strokeWidth={2.5} />
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
                  justifyContent: "center",
                  gap: "0.4rem",
                  transition: "all 0.2s ease"
                }}
              >
                Schedule Leadership Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CORPORATE FACTS & STATS ── */}
      <section className="about-stats-section">
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="about-stats-grid">
            {[
              { val: "₹180Cr+", label: "GMV Operated Annually", sub: "Across Amazon, Flipkart, Blinkit & D2C" },
              { val: "12 Hubs", label: "Pan-India Warehouses", sub: "Fully managed regional fulfillment facilities" },
              { val: "99.2%", label: "Order SLA Compliance", sub: "Sub-4hr dispatch & same-day handovers" },
              { val: "₹2.4Cr+", label: "Recovered for Brands", sub: "Through dedicated settlement audit engines" }
            ].map((st, sIdx) => (
              <div key={sIdx} className="about-stat-card">
                <div className="about-stat-val">{st.val}</div>
                <div className="about-stat-label">{st.label}</div>
                <div className="about-stat-sub">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE FUNDAMENTAL PROBLEM WE SOLVE ── */}
      <section className="about-problem-section">
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="about-problem-grid about-grid-responsive">
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.6px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                The Accountability Void
              </div>
              <h2 className="about-problem-title">
                Why Established Brands Struggle with Modern Commerce
              </h2>
              <p className="about-problem-desc" style={{ color: "#475569", marginBottom: "1.2rem", fontWeight: 500 }}>
                Brands typically hire 4 to 6 separate vendors: a performance marketing agency, a listing specialist, a third-party logistics company, an offline distributor, and an outsourced accounting firm.
              </p>
              <p className="about-problem-desc" style={{ color: "#475569", marginBottom: "1.5rem", fontWeight: 500 }}>
                When sales dip or margins vanish, vendors point fingers at each other: the agency blames stockouts; the warehouse blames poor forecasts; the finance team discovers uncredited returns months later.
              </p>
              <div className="about-problem-quote">
                <p style={{ fontSize: "0.96rem", color: "#1E3A8A", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                  &ldquo;Good Life replaces vendor chaos with single-point operational ownership. If an ad runs, the stock is in place. If an order comes in, it ships in 4 hours. If a rupee is deducted, it is verified.&rdquo;
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  title: "Fragmented Agencies (The Old Way)",
                  badge: "STATUS QUO VENDOR MODEL",
                  points: [
                    "Ad agency spends budget without knowing warehouse stock depth",
                    "3PL warehouse ships slowly, losing Prime & Fast delivery badges",
                    "Return QC neglected, uncredited SAFE-T claims expire after 30 days",
                    "Founder spends 20+ hours weekly managing vendor conflicts"
                  ],
                  bad: true
                },
                {
                  title: "Good Life Operating Model (The Modern Way)",
                  badge: "THE UNIFIED OPERATING MODEL",
                  points: [
                    "Inventory run-rates programmatically dictate ad spend allocations",
                    "12 regional hubs provide next-day delivery across 19,000+ pin codes",
                    "Daily programmatic settlement audit recovering hidden fees and claims",
                    "One executive dashboard and single accountable SLA owner"
                  ],
                  bad: false
                }
              ].map((box, bIdx) => (
                <div
                  key={bIdx}
                  className={`about-comparison-card ${box.bad ? "about-comparison-card--bad" : "about-comparison-card--good"}`}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
                    <h3 className="about-comparison-title" style={{ fontWeight: 800, color: box.bad ? "#DC2626" : "#2563EB", margin: 0 }}>
                      {box.title}
                    </h3>
                    <span style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.6px",
                      textTransform: "uppercase",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                      background: box.bad ? "#FEF2F2" : "#EFF6FF",
                      color: box.bad ? "#DC2626" : "#1D4ED8",
                      border: box.bad ? "1px solid #FECACA" : "1px solid #BFDBFE"
                    }}>
                      {box.badge}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {box.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: box.bad ? "#FEF2F2" : "#EFF6FF",
                          color: box.bad ? "#DC2626" : "#2563EB",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}>
                          {box.bad ? (
                            <X size={11} strokeWidth={3} />
                          ) : (
                            <Check size={11} strokeWidth={3} />
                          )}
                        </span>
                        <span className="about-comparison-point-text" style={{ color: "#334155", fontWeight: 500 }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CORPORATE GOVERNANCE & APPROVED FACTS ── */}
      <section className="about-governance-section">
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="about-governance-header" style={{ maxWidth: "750px", margin: "0 auto 3rem", textAlign: "center" }}>
            <h2 className="about-governance-title" style={{ fontWeight: 900, color: "#0B1736", margin: "0 0 0.75rem" }}>
              Corporate Structure &amp; Registered Entity
            </h2>
            <p className="about-governance-desc" style={{ color: "#475569", fontWeight: 500, margin: 0 }}>
              Operating with institutional discipline, legal compliance, and transparent corporate governance.
            </p>
          </div>

          <div className="about-governance-grid">
            {[
              { label: "Legal Entity Name", value: "GOOD LIFE SUTRA PVT. LTD.", icon: Building2, link: null },
              { label: "Corporate Identification (CIN)", value: "U74999MH2021PTC368942", icon: FileCheck, link: null },
              { label: "Headquarters", value: "Mumbai, Maharashtra, India", icon: MapPin, link: null },
              { label: "Operational Hubs", value: "12 Regional Centers across India", icon: Truck, link: null },
              { label: "Direct Commerce Helpline", value: "+91 22 1234 5678", icon: PhoneCall, link: "tel:+912212345678" },
              { label: "Executive Contact", value: "hello@goodlifesutra.com", icon: Mail, link: "mailto:hello@goodlifesutra.com" }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="about-governance-card">
                  <div className="about-gov-icon-wrap">
                    <IconComp size={20} strokeWidth={2.2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="about-gov-label">{item.label}</div>
                    <div className="about-gov-value">
                      {item.link ? (
                        <a href={item.link} className="about-gov-link">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CONVERSION BANNER (CTA) ── */}
      <section className="about-cta-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="about-cta-card">
            <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "inline-block",
                padding: "0.35rem 0.9rem",
                borderRadius: "999px",
                background: "#DBEAFE",
                border: "1px solid #BFDBFE",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginBottom: "1rem",
                color: "#1D4ED8"
              }}>
                Operating Partnership
              </div>
              <h2 className="about-cta-title" style={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em" }}>
                Ready to Upgrade From a Marketing Agency to an Operating Partner?
              </h2>
              <p className="about-cta-desc" style={{ color: "#475569", margin: "0 auto 2rem auto", maxWidth: "640px" }}>
                Request our interactive Commerce Diagnostic to assess your category maturity, revenue leakage, and warehouse readiness in under 3 minutes.
              </p>
              <div className="about-cta-actions mobile-btn-stack" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "52px",
                    padding: "0 2.2rem",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <Link
                  href="/contact"
                  style={{
                    height: "52px",
                    padding: "0 1.8rem",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
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
                  Schedule Leadership Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
