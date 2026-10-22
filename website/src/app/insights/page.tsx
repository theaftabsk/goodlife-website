"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DEFAULT_INSIGHTS, InsightArticle } from "@/data/insightsData";
import "./insights.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Article = InsightArticle;

const CATEGORIES = [
  "All",
  "Marketplace Growth & Advertising",
  "Inventory & Stock Planning",
  "Revenue Assurance & Reconciliation",
  "Returns & Reverse Operations",
  "Marketplace Operations",
  "Heavy & Bulky Commerce",
  "Business Insights"
];

export default function InsightsPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync with PostgreSQL database / CMS backend API
  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.brandorbit.tech";
      try {
        const res = await fetch(`${apiUrl}/api/v1/articles`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const published = data.filter((a: any) => a.status === "Published");
            setArticles(published);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch articles from database API:", err);
      }

      // Check localStorage for offline admin edits if any
      try {
        const saved = localStorage.getItem("gl_admin_articles");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const published = parsed.filter((a: any) => a.status === "Published");
            setArticles(published);
            setLoading(false);
            return;
          }
        }
      } catch (_) {}

      // Strictly show database data (no hardcoded fallback)
      setArticles([]);
      setLoading(false);
    }

    loadArticles();
  }, []);

  const filteredArticles = articles.filter(a => {
    const matchesCategory = selectedCat === "All" || a.category === selectedCat;
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredArticles[0] || articles[0];
  const regularList = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className={`insights-root ${plusJakartaSans.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section className="insights-hero" style={{
        position: "relative",
        paddingTop: "3.5rem",
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

        <div className="container insights-hero-container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Insights &amp; Knowledge</span>
          </div>

          <div style={{ maxWidth: "880px" }}>
            <div className="insights-badge" style={{
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

            <h1 className="insights-heading" style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#0F172A",
              marginBottom: "1.5rem"
            }}>
              Operational Insights &amp;
              <span style={{
                background: "linear-gradient(135deg, #1D4ED8 0%, #0284C7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block"
              }}>
                Commerce Strategy Intelligence
              </span>
            </h1>

            <p className="insights-lead" style={{ fontSize: "1.15rem", color: "#475569", lineHeight: 1.6, maxWidth: "720px", marginBottom: "2rem" }}>
              Deep tactical briefings on marketplace unit economics, regional warehouse deployment, heavy-bulky freight management, and algorithmic settlement reconciliation written by hands-on commerce operators.
            </p>

            {/* Search Bar */}
            <div className="insights-search-box" style={{ position: "relative", maxWidth: "480px" }}>
              <input
                type="text"
                placeholder="Search insights by topic, marketplace, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.2rem 0.85rem 2.8rem",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  background: "#FFFFFF",
                  fontSize: "0.92rem",
                  outline: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                }}
              />
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex", alignItems: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", position: "sticky", top: "72px", zIndex: 30 }}>
        <div className="container insights-cat-bar" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0.75rem 1.5rem", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "0.6rem", minWidth: "max-content" }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  className="insights-cat-pill"
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: "0.55rem 1.15rem",
                    borderRadius: "999px",
                    fontSize: "0.82rem",
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    border: active ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                    background: active ? "#2563EB" : "#F8FAFC",
                    color: active ? "#FFFFFF" : "#475569",
                    transition: "all 0.15s ease",
                    boxShadow: active ? "0 4px 12px rgba(37, 99, 235, 0.25)" : "none"
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED INSIGHT BANNER (Point 14) */}
      {featured && selectedCat === "All" && !search && (
        <section style={{ padding: "3.5rem 0 1rem 0" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#2563EB", marginBottom: "0.85rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563EB">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Featured Strategic Briefing</span>
            </div>

            <Link href={`/insights/${featured.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="insights-featured-card" style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1.5px solid #E2E8F0",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                boxShadow: "0 10px 30px -5px rgba(0,0,0,0.06)",
                transition: "all 0.2s ease"
              }}>
                <div className="insights-featured-img-wrap" style={{ height: "100%", minHeight: "340px", overflow: "hidden", background: "#F1F5F9" }}>
                  <img
                    src={featured.featuredImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80"}
                    alt={featured.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="insights-featured-body" style={{ padding: "2.5rem 2.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                      <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#1D4ED8", background: "#EFF6FF", padding: "0.25rem 0.65rem", borderRadius: "999px", border: "1px solid #BFDBFE" }}>
                        {featured.category}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>•</span>
                      <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>{featured.date}</span>
                      <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>•</span>
                      <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>{featured.readTime || "6 min"}</span>
                    </div>

                    <h2 className="insights-featured-title" style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.3, marginBottom: "0.9rem" }}>
                      {featured.title}
                    </h2>

                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                      {featured.excerpt}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid #F1F5F9", marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      {featured.authorPhoto && (
                        <img src={featured.authorPhoto} alt={featured.author} style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0F172A" }}>{featured.author}</div>
                        <div style={{ fontSize: "0.72rem", color: "#64748B" }}>{featured.authorRole || "Good Life Operations"}</div>
                      </div>
                    </div>

                    <span style={{ fontWeight: 800, color: "#2563EB", fontSize: "0.88rem" }}>
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Articles Grid (Point 14) */}
      <section className="insights-grid-section" style={{ padding: "3.5rem 0 6rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              {selectedCat === "All" ? "Latest Published Briefings" : `${selectedCat} Articles`} ({filteredArticles.length})
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 1rem", background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "56px", height: "56px", borderRadius: "50%", background: "#F1F5F9", color: "#64748B", marginBottom: "1rem" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>No articles found for "{search}"</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Try searching for Amazon, Buybox, Inventory, or choose "All Categories".</p>
            </div>
          ) : (
            <div className="insights-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "2rem" }}>
              {filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/insights/${art.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1.5px solid #E2E8F0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}>
                    {/* Thumbnail */}
                    <div style={{ height: "190px", overflow: "hidden", background: "#F1F5F9" }}>
                      <img
                        src={art.featuredImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"}
                        alt={art.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#1D4ED8", background: "#EFF6FF", padding: "0.2rem 0.55rem", borderRadius: "999px" }}>
                            {art.category}
                          </span>
                          <span style={{ fontSize: "0.74rem", color: "#64748B" }}>
                            {art.date}
                          </span>
                        </div>

                        <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.35, marginBottom: "0.6rem" }}>
                          {art.title}
                        </h4>

                        <p style={{
                          fontSize: "0.85rem",
                          color: "#64748B",
                          lineHeight: 1.55,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {art.excerpt}
                        </p>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.2rem", borderTop: "1px solid #F1F5F9", marginTop: "1.2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {art.authorPhoto && (
                            <img src={art.authorPhoto} alt={art.author} style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }} />
                          )}
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>{art.author}</span>
                        </div>

                        <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563EB" }}>
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Complimentary Diagnostic CTA */}
      <section style={{ padding: "4rem 0 4.5rem", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="insights-diag-cta" style={{
            background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
            border: "1.5px solid #BFDBFE",
            borderRadius: "24px",
            padding: "3.5rem 2.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.06)"
          }}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
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
                Operating Intelligence
              </div>
              <h2 style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.65rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, letterSpacing: "-0.025em", margin: "0 0 1rem" }}>
                Diagnose Your Channel Economics in Under 3 Minutes
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, margin: "0 auto 2rem auto", maxWidth: "620px" }}>
                Our proprietary Commerce Diagnostic benchmarks your inventory run-rates, platform deductions, and logistics SLAs against top-tier category leaders.
              </p>
              <div className="insights-diag-btns" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
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
                    gap: "0.5rem",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
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
