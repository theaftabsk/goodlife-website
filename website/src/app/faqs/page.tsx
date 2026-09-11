"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface FAQ {
  category: string;
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    category: "Operating Model",
    q: "How does Good Life differ from a digital marketing agency?",
    a: "Traditional agencies only manage ad spend and creative assets in isolation—leaving warehouse operations, catalog compliance, stockouts, return QC, and financial reconciliation entirely on your plate. Good Life operates as an integrated Commerce Operating Partner. We run physical warehousing across 12 hubs, manage daily marketplace seller central accounts, forecast inventory, pack orders in under 4 hours, and audit platform settlements down to the rupee."
  },
  {
    category: "Operating Model",
    q: "Do you replace our internal team or augment it?",
    a: "We act as your dedicated commerce operating engine. You retain complete brand ownership, product R&D, and manufacturing. Your executive team (Founder, Head of Ecom, CFO) interacts with a single Good Life Operating Lead who oversees all marketplace channels, warehouse dispatches, and financial reporting."
  },
  {
    category: "Operating Model",
    q: "How quickly can Good Life onboard an existing brand?",
    a: "For existing marketplace sellers, our standard onboarding timeline is 14 to 21 days. This includes marketplace account API access, master catalog audit, initial stock inwarding at our regional hubs, and setup of daily automated settlement audit scripts."
  },
  {
    category: "Warehousing & Logistics",
    q: "Where are your 12 regional warehouses located?",
    a: "Our strategic facilities are in Bhiwandi (Mumbai MMR), Gurugram (Delhi NCR), Hosakote (Bengaluru), Medchal (Hyderabad), Dankuni (Kolkata), Sriperumbudur (Chennai), Changodar (Ahmedabad), Chakan (Pune), Lucknow (UP), Jaipur (Rajasthan), Guwahati (Assam), and Didarganj (Patna)."
  },
  {
    category: "Warehousing & Logistics",
    q: "How do you help our brand comply with multi-state GST (APOB)?",
    a: "Operating regional warehouses requires state GST Additional Place of Business (APOB) registration. Good Life provides complete commercial documentation—including certified lease agreements, electricity bills, and NOCs—and guides your tax team through the registration process within 30 days."
  },
  {
    category: "Warehousing & Logistics",
    q: "What is your order dispatch SLA?",
    a: "Orders received before 2:00 PM are packed and handed over to courier line-hauls on the same day (sub-4 hour turnaround). Orders received after 2:00 PM ship by 10:00 AM the next morning, ensuring 99%+ compliance with marketplace Seller-Flex and Fast-Track SLAs."
  },
  {
    category: "Financial Reconciliation",
    q: "How much revenue is typically leaked on marketplaces?",
    a: "Across our brand audits, we typically uncover 1.2% to 2.8% of top-line GMV leaking through courier volumetric weight overcharges, uncredited customer returns, wrong referral fee slab deductions, and delayed COD remittances."
  },
  {
    category: "Financial Reconciliation",
    q: "Do you require access to our company bank account?",
    a: "No. Good Life never requires bank transaction or disbursement access. We only require read-only access to marketplace financial reports and shipping logs. All dispute reimbursements and sales payouts are credited directly by Amazon/Flipkart into your corporate bank account."
  },
  {
    category: "Commercial Terms",
    q: "What is the commercial pricing structure?",
    a: "Our pricing consists of a base monthly operating retainer plus an aligned performance/operational throughput component based on managed GMV and warehouse pallet volume. This aligns our incentives directly with your top-line velocity and bottom-line margin expansion."
  },
  {
    category: "Commercial Terms",
    q: "What is the post-launch support and review framework?",
    a: "We operate with weekly operational SLA reports, monthly executive business reviews (P&L, ad efficiency, return rates, settlement recoveries), and quarterly strategic planning sessions."
  }
];

export default function FaqsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = selectedCat === "All"
    ? FAQS
    : FAQS.filter(f => f.category === selectedCat);

  return (
    <div className={`faqs-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
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
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Verified FAQs</span>
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
              Knowledge Repository • Schema-Enabled FAQs
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Frequently Asked Questions: <br />
              <span style={{ color: "#2563EB" }}>Clear Operational Answers</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              Learn how Good Life structures multi-channel commerce execution, multi-state warehouse placement, dispute recovery, and commercial partnerships.
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

      {/* Category Tabs */}
      <section style={{ padding: "3rem 0 1rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {(["All", "Operating Model", "Warehousing & Logistics", "Financial Reconciliation", "Commercial Terms"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCat(cat);
                  setOpenIdx(0);
                }}
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

      {/* FAQ Accordion List */}
      <section style={{ padding: "2rem 0 6rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
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
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.4rem 1.8rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      cursor: "pointer",
                      gap: "1rem"
                    }}
                  >
                    <span style={{ fontSize: "1.05rem", fontWeight: 800, color: isOpen ? "#2563EB" : "#0B1736", lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: isOpen ? "#EFF6FF" : "#F1F5F9",
                      color: isOpen ? "#2563EB" : "#64748B",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.8rem 1.6rem", borderTop: "1px solid #F1F5F9", paddingTop: "1rem" }}>
                      <p style={{ fontSize: "0.96rem", color: "#475569", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
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
                Still Have Questions?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Discuss Your Specific Operational Setup
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Take our 3-minute Commerce Diagnostic or speak directly with our solutions architecture team.
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
                  Contact Executive Team
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
