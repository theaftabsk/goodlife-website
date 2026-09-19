"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  status?: string;
  isPublished?: boolean;
  orderIndex?: number;
}

export default function FaqsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/faqs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const published = data.filter((f: any) => f.status === "Published" || f.isPublished !== false);
            setFaqs(published);
            return;
          }
        }
      } catch (_) {}

      try {
        const saved = localStorage.getItem("gl_admin_faqs");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const published = parsed.filter((f: any) => f.status === "Published" || f.isPublished !== false);
            if (published.length > 0) {
              setFaqs(published);
              return;
            }
          }
        }
      } catch (_) {}
    }

    loadFaqs();
  }, []);

  const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category || "General")))];

  const filteredFaqs = selectedCat === "All"
    ? faqs
    : faqs.filter(f => (f.category || "General") === selectedCat);

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
              Live Database Verified FAQs • Real-Time PostgreSQL
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
            {categories.map(cat => (
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
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748B" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>Loading verified FAQs from database...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={faq.id || idx}
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
                        {faq.question}
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
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
