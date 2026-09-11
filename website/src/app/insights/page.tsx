"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface Article {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  takeaways: string[];
}

const ARTICLES: Article[] = [
  {
    id: "oem-brand-incubation",
    category: "Marketplace Strategy",
    title: "How Indian OEM Manufacturers Can Build High-Margin Direct Brands in 2026",
    date: "September 2026",
    readTime: "7 min read",
    author: "Commerce Operations Practice",
    excerpt: "Contract manufacturers across Rajkot, Pune, and Coimbatore are transitioning from thin OEM margins to direct digital brand ownership. Here is the operational blueprint for avoiding channel conflict and safeguarding wholesale relationships.",
    takeaways: [
      "Launch separate digital-exclusive model numbers to protect offline dealer networks.",
      "Calculate true net realization after marketplace commissions, logistics, and reverse QC.",
      "Deploy regional buffer inventory to capture Amazon Prime badges without heavy capex."
    ]
  },
  {
    id: "marketplace-reconciliation-leakage",
    category: "Revenue Assurance",
    title: "The Silent Profit Killer: Auditing ₹1Cr+ in Uncredited Marketplace Deductions",
    date: "August 2026",
    readTime: "9 min read",
    author: "Financial Engineering Group",
    excerpt: "A forensic analysis of over 500,000 marketplace settlement line items revealed that the average brand leaks 1.8% of GMV to miscalculated volumetric weight slabs, uncredited customer returns, and phantom closing fees.",
    takeaways: [
      "Volumetric weight overcharges represent 42% of all recoverable marketplace discrepancies.",
      "SAFE-T dispute limitation windows require automated unboxing photo and video archives.",
      "Programmatic daily UTR matching prevents month-end balance sheet suspense accounts."
    ]
  },
  {
    id: "heavy-bulky-logistics-playbook",
    category: "Warehousing & Logistics",
    title: "Heavy & Bulky Ecommerce Playbook: Solving The 15kg+ Transit Conundrum",
    date: "August 2026",
    readTime: "8 min read",
    author: "Fulfilment Engineering Team",
    excerpt: "Why standard courier chutes destroy consumer appliances and how regional palletized line-haul networks reduce transit breakage from 14% to under 0.5% while cutting two-way return freight costs.",
    takeaways: [
      "ISTA drop-test standards and honeycombed edge protectors prevent glass canopy shattering.",
      "Scheduled two-person delivery eliminates buyer refusal at doorstep.",
      "Synchronizing parcel arrival with local installation technicians cuts return rates by 35%."
    ]
  },
  {
    id: "pan-india-inventory-allocation",
    category: "Operating Economics",
    title: "Algorithmically Distributing Inventory Across 12 States to Win The Buybox",
    date: "July 2026",
    readTime: "6 min read",
    author: "Inventory Intelligence Practice",
    excerpt: "Single-warehouse fulfillment is commercially dead. Discover how strategic 12-state inventory splitting yields same-day delivery badges, improves organic Buybox ownership by 40%, and reduces per-unit shipping expenses.",
    takeaways: [
      "Pin-code demand heatmapping prevents slow-moving stock accumulation in remote hubs.",
      "APOB registrations can be executed within 30 days under compliant commercial lease agreements.",
      "Buffer stock triggers prevent localized stockouts during festival promotional spikes."
    ]
  }
];

export default function InsightsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const filteredArticles = selectedCat === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === selectedCat);

  return (
    <div className={`insights-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
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
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Insights & Knowledge</span>
          </div>

          <div style={{ maxWidth: "880px" }}>
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
              Executive Knowledge Hub • Commerce Operations Strategy
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Operational Insights & <br />
              <span style={{ color: "#2563EB" }}>Commerce Strategy Intelligence</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              Deep tactical briefings on marketplace unit economics, regional warehouse deployment, heavy-bulky freight management, and algorithmic settlement reconciliation written by hands-on commerce operators.
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
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: "3rem 0 1rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {(["All", "Marketplace Strategy", "Revenue Assurance", "Warehousing & Logistics", "Operating Economics"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: "0.6rem 1.3rem",
                  borderRadius: "999px",
                  border: selectedCat === cat ? "1.5px solid #2563EB" : "1.5px solid #CBD5E1",
                  background: selectedCat === cat ? "#2563EB" : "#FFFFFF",
                  color: selectedCat === cat ? "#FFFFFF" : "#475569",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: "2rem 0 6rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "2.4rem",
                  border: "1.5px solid #E2E8F0",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "6px",
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>{art.date} • {art.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0B1736", margin: "0 0 1rem", lineHeight: 1.35 }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.4rem" }}>
                    {art.excerpt}
                  </p>

                  <div style={{ background: "#F8FAFC", padding: "1.2rem", borderRadius: "12px", border: "1px solid #E2E8F0", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#1E293B", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.6rem" }}>
                      Key Operational Takeaways:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {art.takeaways.map((tk, tIdx) => (
                        <div key={tIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                          <span style={{ color: "#2563EB", fontWeight: 800, fontSize: "0.8rem", marginTop: "1px" }}>•</span>
                          <span style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.45 }}>{tk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: "1.2rem", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>By {art.author}</span>
                  <button
                    onClick={() => setDiagOpen(true)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2563EB",
                      fontSize: "0.88rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}
                  >
                    <span>Assess Brand Fit</span>
                    <span>→</span>
                  </button>
                </div>
              </article>
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
                Operating Intelligence
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Diagnose Your Channel Economics in Under 3 Minutes
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Our proprietary Commerce Diagnostic benchmarks your inventory run-rates, platform deductions, and logistics SLAs against top-tier category leaders.
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
                  Speak With Author
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
