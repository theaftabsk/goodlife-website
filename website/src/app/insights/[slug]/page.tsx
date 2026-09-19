"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";
import { DEFAULT_INSIGHTS, InsightArticle } from "@/data/insightsData";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

type ArticleData = InsightArticle;

export default function SingleInsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [diagOpen, setDiagOpen] = useState(false);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      let allArticles: ArticleData[] = [];
      try {
        const res = await fetch("http://localhost:5000/api/v1/articles");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            allArticles = data;
          }
        }
      } catch (_) {}

      if (allArticles.length === 0) {
        try {
          const saved = localStorage.getItem("gl_admin_articles");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              allArticles = parsed;
            }
          }
        } catch (_) {}
      }

      if (allArticles.length === 0) {
        allArticles = DEFAULT_INSIGHTS;
      }

      const found = allArticles.find(a => a.slug === slug);
      if (found) {
        setArticle(found);
        const related = allArticles.filter(a => a.id !== found.id && a.status === "Published").slice(0, 3);
        setRelatedArticles(related);
      } else {
        // Fallback to first available
        setArticle(allArticles[0] || null);
      }
    }

    loadArticle();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!article) {
    return (
      <div className={`insight-detail-root ${inter.className}`} style={{ minHeight: "100vh", background: "#F8FAFC" }}>
        <Header onOpenDiagnostic={() => setDiagOpen(true)} />
        <div style={{ paddingTop: "12rem", textAlign: "center", paddingBottom: "8rem" }}>
          <h2>Loading Insight Briefing...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`insight-detail-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Breadcrumbs & Hero Bar */}
      <section style={{
        paddingTop: "8.5rem",
        paddingBottom: "3rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div className="container" style={{ maxWidth: "920px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#64748B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/insights" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Insights</Link>
            <span>/</span>
            <span style={{ color: "#475569", fontWeight: 600 }}>{article.category}</span>
          </div>

          {/* Category & Meta Pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <span style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              color: "#1D4ED8",
              fontSize: "0.76rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {article.category}
            </span>
            <span style={{ color: "#94A3B8" }}>•</span>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>{article.date}</span>
            <span style={{ color: "#94A3B8" }}>•</span>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>{article.readTime || "6 min read"}</span>
          </div>

          {/* Headline Title */}
          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "#0F172A",
            marginBottom: "1.5rem"
          }}>
            {article.title}
          </h1>

          {/* Author Header Row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #E2E8F0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              {article.authorPhoto && (
                <img
                  src={article.authorPhoto}
                  alt={article.author}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #BFDBFE" }}
                />
              )}
              <div>
                <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>{article.author}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{article.authorRole || "Good Life Commerce Practice Lead"}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                background: "#FFFFFF",
                border: "1px solid #CBD5E1",
                color: "#334155",
                fontWeight: 700,
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>Share Insight</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Article Body */}
      <section style={{ padding: "3.5rem 0 5rem 0" }}>
        <div className="container" style={{ maxWidth: "920px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* Featured Image */}
          {article.featuredImage && (
            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "2.5rem",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.12)",
              border: "1px solid #E2E8F0"
            }}>
              <img
                src={article.featuredImage}
                alt={article.imageAlt || article.title}
                style={{ width: "100%", maxHeight: "440px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Excerpt Executive Callout */}
          {article.excerpt && (
            <div style={{
              padding: "1.5rem 2rem",
              background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
              borderLeft: "5px solid #2563EB",
              borderRadius: "0 12px 12px 0",
              marginBottom: "2.5rem",
              boxShadow: "0 2px 8px rgba(37,99,235,0.06)"
            }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#1D4ED8", marginBottom: "0.4rem" }}>
                Executive Briefing Takeaway
              </div>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1E3A8A", lineHeight: 1.6, margin: 0 }}>
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Markdown / Body Content */}
          <div style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#334155",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}>
            {article.content}
          </div>

          {/* Filed Tags */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ marginTop: "3.5rem", paddingTop: "1.75rem", borderTop: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748B", marginBottom: "0.75rem" }}>
                Strategic Focus Areas:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {article.tags.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "6px",
                      background: "#F1F5F9",
                      border: "1px solid #E2E8F0",
                      color: "#334155",
                      fontSize: "0.82rem",
                      fontWeight: 600
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Biography Card */}
          <div style={{
            marginTop: "3rem",
            padding: "2rem",
            borderRadius: "14px",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
          }}>
            {article.authorPhoto && (
              <img
                src={article.authorPhoto}
                alt={article.author}
                style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
            )}
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#2563EB", marginBottom: "0.2rem" }}>
                Written By Good Life Operator
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0F172A", margin: "0 0 0.35rem 0" }}>
                {article.author}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                {article.authorRole || "Operating Partner Lead at Good Life Sutra. Specialized in multi-channel retail infrastructure, marketplace algorithm compliance, and revenue assurance."}
              </p>
            </div>
          </div>

          {/* Complimentary Diagnostic Callout Banner */}
          <div style={{
            marginTop: "4rem",
            padding: "2.5rem",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: "0 15px 30px -10px rgba(15,23,42,0.4)"
          }}>
            <div style={{ maxWidth: "560px" }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#38BDF8", marginBottom: "0.5rem" }}>
                Executive Commerce Consultation
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "0 0 0.5rem 0", color: "#FFFFFF" }}>
                Diagnose Your Channel Economics in Under 3 Minutes
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#CBD5E1", margin: 0, lineHeight: 1.5 }}>
                Schedule a complimentary operational audit of your marketplace listing health, multi-state inventory placement, and payment reconciliation.
              </p>
            </div>

            <button
              onClick={() => setDiagOpen(true)}
              style={{
                padding: "0.85rem 1.75rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(37,99,235,0.4)"
              }}
            >
              REQUEST FREE AUDIT →
            </button>
          </div>

          {/* Related Insights Row (Point 16) */}
          {relatedArticles.length > 0 && (
            <div style={{ marginTop: "4.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Related Executive Briefings
                </h3>
                <Link href="/insights" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2563EB", textDecoration: "none" }}>
                  View All Insights →
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{
                      background: "#FFFFFF",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid #E2E8F0",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease"
                    }}>
                      <div style={{ height: "140px", overflow: "hidden", background: "#F1F5F9" }}>
                        <img
                          src={rel.featuredImage}
                          alt={rel.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <span style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 800, textTransform: "uppercase" }}>
                            {rel.category}
                          </span>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: "0.4rem 0 0.5rem 0", lineHeight: 1.35 }}>
                            {rel.title}
                          </h4>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
                          {rel.date} · Read Article →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
