"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function MarketplaceGrowthPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [tacosTarget, setTacosTarget] = useState<number>(14);

  // Ad efficiency simulation
  const organicShare = Math.min(85, Math.max(50, 85 - (tacosTarget - 10) * 1.8));
  const paidShare = 100 - organicShare;
  const growthMultiplier = (1 + (tacosTarget - 10) * 0.12).toFixed(1);

  return (
    <div className={`capability-growth-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
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
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Marketplace Growth & Ads</span>
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
              Capability 02 • Profit-Guarded Performance Advertising
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Marketplace Growth & Ads: <br />
              <span style={{ color: "#2563EB" }}>Scaling Top-Line Without Sacrificing Net Profit</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              We don&apos;t run vanity ad campaigns that burn margins for GMV screenshots. Good Life manages Amazon PPC, Flipkart PLA, and Quick Commerce media with algorithmic TACOS guardrails—syncing media spend directly to real-time warehouse inventory depth.
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
                Audit Current Ad Accounts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Profit-Guarded TACOS Simulator */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.6px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Algorithmic Ad Optimization
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              Interactive TACOS vs. Profit Guardrail Simulator
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Adjust target TACOS (Total Advertising Cost of Sales) to simulate the healthy balance between aggressive ranking gains and net unit profitability.
            </p>
          </div>

          <div style={{
            background: "#F8FAFC",
            borderRadius: "24px",
            padding: "3rem",
            border: "1.5px solid #BFDBFE",
            boxShadow: "0 14px 40px rgba(37,99,235,0.07)",
            maxWidth: "960px",
            margin: "0 auto"
          }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1E293B" }}>
                  Target Blended TACOS:
                </span>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: tacosTarget <= 15 ? "#16A34A" : "#D97706" }}>
                  {tacosTarget}% Blended TACOS
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="25"
                step="1"
                value={tacosTarget}
                onChange={(e) => setTacosTarget(Number(e.target.value))}
                style={{ width: "100%", height: "8px", borderRadius: "4px", accentColor: "#2563EB", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748B", marginTop: "0.5rem" }}>
                <span>8% - 12% (Mature Cash Cow)</span>
                <span>13% - 16% (Optimal Profit & Scaling)</span>
                <span>17% - 25% (Hyper-Aggressive Conquest)</span>
              </div>
            </div>

            {/* Projected Metrics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase" }}>Organic Sales Dependency</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  {organicShare}% Organic
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Generated via high keyword BSR ranks</div>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>Paid Sponsored Sales</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  {paidShare}% Sponsored
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Targeted paid conversions & brand defense</div>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7C3AED", textTransform: "uppercase" }}>Projected Velocity Multiplier</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  {growthMultiplier}x Velocity
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Compared to un-optimized baseline</div>
              </div>
            </div>

            {/* Guardrail Policy Banner */}
            <div style={{
              background: "linear-gradient(135deg, #0B1736 0%, #1E3A8A 100%)",
              borderRadius: "18px",
              padding: "1.8rem 2.2rem",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}>
              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "1px" }}>
                  The Good Life Ad-to-Stock Guardrail:
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.3rem" }}>
                  Zero Ad Budget Bleed on Out-of-Stock SKUs
                </div>
                <div style={{ fontSize: "0.86rem", color: "#94A3B8" }}>
                  Our bidding engine algorithmically throttles ad bids when warehouse inventory drops below 7 days.
                </div>
              </div>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "46px",
                  padding: "0 1.8rem",
                  borderRadius: "12px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                CALIBRATE MY AD ACCOUNT
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Tier Keyword Funnel */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              The 3-Tier Keyword Harvesting Funnel
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              How we systematically transition ad spend from expensive generic queries into high-margin branded and defensive conversions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {[
              {
                tier: "Tier 01: Top-of-Funnel",
                title: "Broad Discovery & Harvesting",
                desc: "Low-bid automatic campaigns and phrase-match discovery capturing long-tail customer search queries with strict negative match filters."
              },
              {
                tier: "Tier 02: Mid-of-Funnel",
                title: "Exact Match BSR Escalation",
                desc: "Harvested winning search terms migrated into high-conviction exact-match campaigns to forcefully improve organic Best Seller Rank (BSR)."
              },
              {
                tier: "Tier 03: Bottom-of-Funnel",
                title: "Brand Defense & Competitor ASIN",
                desc: "Targeting your brand page to block competitors while bidding on vulnerable competitor product pages with superior pricing or reviews."
              }
            ].map((box, bIdx) => (
              <div key={bIdx} style={{ background: "#FFFFFF", borderRadius: "20px", padding: "2.2rem", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.6rem" }}>
                  {box.tier}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.6rem" }}>{box.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
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
                Performance Advertising
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Ready to Cut Wasted Ad Spend and Scale Net Sales?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Run our Commerce Diagnostic to evaluate your category ad saturation, TACOS efficiency, and competitor conquest opportunities.
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
                  Book Ad Audit Call
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
