"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function RevenueAssurancePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [gmvLakhs, setGmvLakhs] = useState<number>(50); // In ₹ Lakhs

  // Leakage calculations
  const estTotalLeakage = (gmvLakhs * 100000) * 0.021; // 2.1% average leakage
  const estWeightLeak = estTotalLeakage * 0.42;        // 42% weight overcharges
  const estReturnLeak = estTotalLeakage * 0.35;        // 35% uncredited returns
  const estFeeLeak = estTotalLeakage * 0.23;           // 23% platform fee creep

  return (
    <div className={`capability-revenue-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
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
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Revenue Assurance</span>
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
              Capability 05 • Financial Integrity & Settlement Recovery
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Revenue Assurance: <br />
              <span style={{ color: "#2563EB" }}>Marketplace Settlement Audit & Cash Recovery</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              Stop hidden commission overcharges, uncredited returns, incorrect volumetric weight slabs, and lost inventory. Good Life conducts daily order-by-order financial reconciliations, recovering 1% to 3% of your top-line GMV directly into your bank account.
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
                Request 90-Day Free Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Settlement Leakage Calculator */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.6px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Algorithmic Financial Simulator
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              Calculate Your Recoverable Marketplace Leakage
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Based on historical data from over 500,000 marketplace orders audited across Amazon India, Flipkart, and Quick Commerce channels.
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
            {/* GMV Slider */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1E293B" }}>
                  Your Approximate Monthly Marketplace GMV:
                </span>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "#2563EB" }}>
                  ₹{gmvLakhs} Lakh / Mo
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={gmvLakhs}
                onChange={(e) => setGmvLakhs(Number(e.target.value))}
                style={{ width: "100%", height: "8px", borderRadius: "4px", accentColor: "#2563EB", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748B", marginTop: "0.5rem" }}>
                <span>₹10 Lakh (Emerging Brand)</span>
                <span>₹1.5 Crore (Mid-Market Brand)</span>
                <span>₹3 Crore+ (Enterprise Leader)</span>
              </div>
            </div>

            {/* Estimated Recovery Breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", marginBottom: "2.2rem" }}>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.6rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase" }}>Volumetric Weight Discrepancies</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  ₹{(estWeightLeak / 1000).toFixed(0)}k / mo
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Erroneous courier slab upgrades & pick fees</div>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.6rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#EA580C", textTransform: "uppercase" }}>Uncredited Return Claims</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  ₹{(estReturnLeak / 1000).toFixed(0)}k / mo
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Switched items & unreceived returns (SAFE-T)</div>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.6rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7C3AED", textTransform: "uppercase" }}>Commission & Ad Creep</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B1736", margin: "0.4rem 0 0.2rem" }}>
                  ₹{(estFeeLeak / 1000).toFixed(0)}k / mo
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Wrong referral rates & closing fee mismatches</div>
              </div>
            </div>

            {/* Total Annualized Recovery Banner */}
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
                  Projected Annual Capital Recoverable:
                </div>
                <div style={{ fontSize: "1.9rem", fontWeight: 900, marginTop: "0.2rem" }}>
                  ₹{((estTotalLeakage * 12) / 100000).toFixed(1)} Lakh / Year
                </div>
                <div style={{ fontSize: "0.86rem", color: "#94A3B8" }}>
                  Credited directly into your seller account via automated dispute filings.
                </div>
              </div>

              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "48px",
                  padding: "0 1.8rem",
                  borderRadius: "12px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                START RECOVERY AUDIT
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step UTR & Settlement Flowchart */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              Our Order-to-Bank Reconciliation Engine
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Every single order is tracked from customer click to final bank account deposit across 4 rigorous verification gates.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                step: "Gate 01",
                title: "Order Manifest Ingestion",
                desc: "Order ID, invoice value, GST tax rate, and SKU dimensional specs are captured at the moment of warehouse dispatch."
              },
              {
                step: "Gate 02",
                title: "Logistics Manifest Audit",
                desc: "Actual courier billing statements are compared against master SKU deadweight and volumetric dimensions to catch weight overcharges."
              },
              {
                step: "Gate 03",
                title: "Settlement Remittance Match",
                desc: "Platform remittance files (Amazon, Flipkart, Quick Comm) are matched line-by-line against UTR bank credits, detecting unbilled deductions."
              },
              {
                step: "Gate 04",
                title: "Automated Dispute Filing",
                desc: "Evidence-backed tickets (SAFE-T, fee corrections, weight disputes) are filed within limitation windows until credit notes are credited."
              }
            ].map((gate, gIdx) => (
              <div key={gIdx} style={{ background: "#FFFFFF", borderRadius: "18px", padding: "2rem", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.6rem" }}>
                  {gate.step}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.6rem" }}>{gate.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{gate.desc}</p>
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
                Financial Assurance
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Ready to Recover Your Leaked Platform Margins?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Complete our Commerce Diagnostic to evaluate your settlement auditing health and book a complimentary 90-day historical leak audit.
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
                  Consult Audit Lead
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
