"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function AboutPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className={`about-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>About Good Life</span>
          </div>

          <div style={{ maxWidth: "900px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              color: "#1D4ED8",
              fontSize: "0.82rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              Operator Credibility • Enterprise Commerce Partner
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              You Build The Product & Brand. <br />
              <span style={{ color: "#2563EB" }}>We Operate Commerce.</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "820px",
              fontWeight: 500
            }}>
              Good Life is not a marketing agency, an outsourced call center, or a freight reseller. We are India&apos;s Commerce Operating Partner for brands—running physical warehousing, multi-platform catalogue control, stock planning, advertising, and revenue assurance under one single accountable standard.
            </p>

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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
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
                  gap: "0.4rem"
                }}
              >
                Schedule Leadership Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Facts & Stats */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "2.5rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { val: "₹180Cr+", label: "GMV Operated Annually", sub: "Across Amazon, Flipkart, Blinkit & D2C" },
              { val: "12 Hubs", label: "Pan-India Warehouses", sub: "Fully managed regional fulfillment facilities" },
              { val: "99.2%", label: "Order SLA Compliance", sub: "Sub-4hr dispatch & same-day handovers" },
              { val: "₹2.4Cr+", label: "Recovered for Brands", sub: "Through dedicated settlement audit engines" }
            ].map((st, sIdx) => (
              <div key={sIdx} style={{ borderLeft: "3px solid #2563EB", paddingLeft: "1.2rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.8px" }}>{st.val}</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1E293B", marginTop: "0.2rem" }}>{st.label}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.2rem" }}>{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Fundamental Problem We Solve */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }} className="about-grid-responsive">
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.6px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                The Accountability Void
              </div>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", lineHeight: 1.25, margin: "0 0 1.25rem" }}>
                Why Established Brands Struggle with Modern Commerce
              </h2>
              <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.2rem", fontWeight: 500 }}>
                Brands typically hire 4 to 6 separate vendors: a performance marketing agency, a listing specialist, a third-party logistics company, an offline distributor, and an outsourced accounting firm.
              </p>
              <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem", fontWeight: 500 }}>
                When sales dip or margins vanish, vendors point fingers at each other: the agency blames stockouts; the warehouse blames poor forecasts; the finance team discovers uncredited returns months later.
              </p>
              <div style={{ background: "#EFF6FF", borderLeft: "4px solid #2563EB", padding: "1.2rem 1.5rem", borderRadius: "0 12px 12px 0" }}>
                <p style={{ fontSize: "0.96rem", color: "#1E3A8A", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                  &ldquo;Good Life replaces vendor chaos with single-point operational ownership. If an ad runs, the stock is in place. If an order comes in, it ships in 4 hours. If a rupee is deducted, it is verified.&rdquo;
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  title: "Fragmented Agencies (The Old Way)",
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
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "2rem",
                    border: box.bad ? "1.5px solid #FECACA" : "2px solid #2563EB",
                    boxShadow: box.bad ? "none" : "0 12px 35px rgba(37,99,235,0.08)"
                  }}
                >
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: box.bad ? "#DC2626" : "#2563EB", marginBottom: "1rem" }}>
                    {box.title}
                  </h3>
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
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 500, lineHeight: 1.5 }}>
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

      {/* Corporate Governance & Approved Facts */}
      <section style={{ padding: "4.5rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem" }}>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 0.75rem" }}>
              Corporate Structure & Registered Entity
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Operating with institutional discipline, legal compliance, and transparent corporate governance.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: "Legal Entity Name", value: "GOOD LIFE SUTRA PVT. LTD." },
              { label: "Corporate Identification (CIN)", value: "U74999MH2021PTC368942" },
              { label: "Headquarters", value: "Mumbai, Maharashtra, India" },
              { label: "Operational Hubs", value: "12 Regional Centers across India" },
              { label: "Direct Commerce Helpline", value: "+91 22 1234 5678" },
              { label: "Executive Contact", value: "hello@goodlifesutra.com" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", borderRadius: "16px", padding: "1.5rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B1736", marginTop: "0.4rem" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section style={{ padding: "5rem 0 5.5rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
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
          }}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.12)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                color: "#60A5FA"
              }}>
                Operating Partnership
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Ready to Upgrade From a Marketing Agency to an Operating Partner?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Request our interactive Commerce Diagnostic to assess your category maturity, revenue leakage, and warehouse readiness in under 3 minutes.
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem"
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
                    height: "56px",
                    padding: "0 2rem",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1.5px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
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
