"use client";

import React, { useState, useMemo } from "react";
import { useAdminData, SeoPageItem } from "@/context/AdminDataContext";
import {
  SeoIcon,
  EditIcon,
  CheckIcon,
  CloseIcon,
  SearchIcon,
  PlusIcon,
  TrashIcon,
  ExternalLinkIcon,
  CopyIcon,
  GlobeIcon,
  EyeIcon,
  CheckCircleIcon
} from "@/components/Icons";

export default function SeoManagerPage() {
  const { seoPages, saveSeoPage, deleteSeoPage, showToast, siteSettings, updateSiteSettings } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [serpViewMode, setSerpViewMode] = useState<"desktop" | "mobile">("desktop");
  const [editingItem, setEditingItem] = useState<SeoPageItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showSitemapModal, setShowSitemapModal] = useState(false);

  // Google Analytics, GTM, and Search Console State
  const [analyticsForm, setAnalyticsForm] = useState({
    ga4MeasurementId: siteSettings?.ga4MeasurementId || "",
    gtmContainerId: siteSettings?.gtmContainerId || "",
    googleSearchConsoleVerification: siteSettings?.googleSearchConsoleVerification || ""
  });
  const [isSavingAnalytics, setIsSavingAnalytics] = useState(false);
  const [analyticsSavedNotice, setAnalyticsSavedNotice] = useState(false);

  // Synchronize when settings load from PostgreSQL database
  React.useEffect(() => {
    if (siteSettings) {
      setAnalyticsForm({
        ga4MeasurementId: siteSettings.ga4MeasurementId || "",
        gtmContainerId: siteSettings.gtmContainerId || "",
        googleSearchConsoleVerification: siteSettings.googleSearchConsoleVerification || ""
      });
    }
  }, [siteSettings]);

  const handleSaveAnalytics = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAnalytics(true);
    try {
      await updateSiteSettings({
        ga4MeasurementId: analyticsForm.ga4MeasurementId.trim(),
        gtmContainerId: analyticsForm.gtmContainerId.trim(),
        googleSearchConsoleVerification: analyticsForm.googleSearchConsoleVerification.trim()
      });
      setAnalyticsSavedNotice(true);
      setTimeout(() => setAnalyticsSavedNotice(false), 3000);
      showToast("GA4, GTM & Search Console settings saved to database!");
    } catch (_) {
      showToast("Failed to save analytics settings.");
    } finally {
      setIsSavingAnalytics(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    pagePath: "",
    pageName: "",
    category: "Core" as SeoPageItem["category"],
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonical: "",
    robots: "index, follow"
  });

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: seoPages.length };
    seoPages.forEach((p) => {
      const cat = p.category || "Core";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [seoPages]);

  // Filtered pages
  const filteredPages = useMemo(() => {
    return seoPages.filter((p) => {
      const matchesCat = selectedCategory === "All" || (p.category || "Core") === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.pagePath.toLowerCase().includes(q) ||
        p.pageName.toLowerCase().includes(q) ||
        p.metaTitle.toLowerCase().includes(q) ||
        p.keywords.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [seoPages, selectedCategory, searchQuery]);

  const openEditModal = (s: SeoPageItem) => {
    setEditingItem(s);
    setIsAddingNew(false);
    setFormData({
      pagePath: s.pagePath,
      pageName: s.pageName,
      category: s.category || "Core",
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      keywords: s.keywords,
      canonical: s.canonical || `https://goodlifesutra.com${s.pagePath === "/" ? "" : s.pagePath}`,
      robots: s.robots || "index, follow"
    });
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsAddingNew(true);
    setFormData({
      pagePath: "",
      pageName: "",
      category: "Campaigns",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonical: "",
      robots: "index, follow"
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.metaTitle.trim() || !formData.pagePath.trim()) return;

    if (isAddingNew) {
      saveSeoPage({
        pagePath: formData.pagePath.startsWith("/") ? formData.pagePath : `/${formData.pagePath}`,
        pageName: formData.pageName || formData.pagePath,
        category: formData.category,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
        canonical: formData.canonical || `https://goodlifesutra.com${formData.pagePath}`,
        robots: formData.robots
      });
    } else if (editingItem) {
      saveSeoPage(
        {
          ...editingItem,
          pagePath: formData.pagePath,
          pageName: formData.pageName,
          category: formData.category,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords,
          canonical: formData.canonical,
          robots: formData.robots
        },
        editingItem.id
      );
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the SEO entry for "${name}"?`)) {
      deleteSeoPage(id);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  // Generate XML Sitemap string
  const generateSitemapXml = () => {
    const today = new Date().toISOString().split("T")[0];
    const urls = seoPages.map((p) => {
      let priority = "0.8";
      let changefreq = "monthly";
      if (p.pagePath === "/") {
        priority = "1.0";
        changefreq = "weekly";
      } else if (p.category === "Solutions" || p.category === "Campaigns") {
        priority = "0.9";
      } else if (p.category === "Authority") {
        priority = "0.85";
        changefreq = "weekly";
      }
      return `  <url>
    <loc>https://goodlifesutra.com${p.pagePath === "/" ? "" : p.pagePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  };

  // Category Badge Colors
  const getCategoryBadgeStyle = (cat?: string) => {
    switch (cat) {
      case "Core":
        return { background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE" };
      case "Solutions":
        return { background: "#ECFDF5", color: "#047857", border: "1px solid #A7F3D0" };
      case "Capabilities":
        return { background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD" };
      case "Specialised":
        return { background: "#FAF5FF", color: "#6B21A8", border: "1px solid #E9D5FF" };
      case "Authority":
        return { background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A" };
      case "Campaigns":
        return { background: "#FFF1F2", color: "#BE123C", border: "1px solid #FECDD3" };
      default:
        return { background: "#F1F5F9", color: "#475569", border: "1px solid #CBD5E1" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top SEO Hub Banner */}
      <div className="admin-card" style={{
        padding: "1.5rem 1.75rem",
        background: "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #F0FDF4 100%)",
        border: "1.5px solid #BFDBFE",
        boxShadow: "0 4px 16px rgba(37, 99, 235, 0.05)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.4rem" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <SeoIcon size={18} color="#FFFFFF" />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Site-Wide SEO &amp; Per-Page Metadata Command Center
              </h2>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#475569", margin: 0, maxWidth: "720px", lineHeight: 1.5 }}>
              Manage Google search snippets, canonical URLs, target keywords, and indexing rules for all <strong>{seoPages.length} pages</strong> across Core, Solutions, Capabilities, Specialised Verticals, and Campaign Landing Pages.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowSitemapModal(true)}
              className="btn-secondary"
              style={{ fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 0.9rem" }}
            >
              <GlobeIcon size={15} color="#2563EB" />
              <span>Generate XML Sitemap</span>
            </button>
            <button
              onClick={openAddModal}
              className="btn-primary"
              style={{ fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem" }}
            >
              <PlusIcon size={15} color="#FFFFFF" />
              <span>Add Custom SEO Route</span>
            </button>
          </div>
        </div>

        {/* Health & Count Metrics Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.75rem",
          marginTop: "1.25rem",
          paddingTop: "1.1rem",
          borderTop: "1px solid rgba(191, 219, 254, 0.6)"
        }}>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>TOTAL INDEXED ROUTES</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1D4ED8" }}>{seoPages.length}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>CORE PAGES</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A" }}>{categoryCounts["Core"] || 0}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>SOLUTIONS</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#059669" }}>{categoryCounts["Solutions"] || 0}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>CAPABILITIES</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0284C7" }}>{categoryCounts["Capabilities"] || 0}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>SPECIALISED</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#7C3AED" }}>{categoryCounts["Specialised"] || 0}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>AUTHORITY &amp; LEGAL</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#D97706" }}>{categoryCounts["Authority"] || 0}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>CAMPAIGN LANDING</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#E11D48" }}>{categoryCounts["Campaigns"] || 0}</div>
          </div>
        </div>
      </div>

      {/* Google Analytics 4, Tag Manager & Google Search Console Suite */}
      <div className="admin-card" style={{
        padding: "1.5rem 1.75rem",
        background: "#FFFFFF",
        border: "1.5px solid #E2E8F0",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <GlobeIcon size={17} color="#FFFFFF" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Google Analytics 4, Tag Manager &amp; Search Console Setup
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0.2rem 0 0" }}>
                  Add your official measurement IDs and ownership verification. Values are saved to PostgreSQL and injected live on the website.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.ga4MeasurementId ? "#ECFDF5" : "#FEF3C7",
              color: analyticsForm.ga4MeasurementId ? "#047857" : "#B45309",
              border: analyticsForm.ga4MeasurementId ? "1px solid #A7F3D0" : "1px solid #FDE68A"
            }}>
              GA4: {analyticsForm.ga4MeasurementId ? "Connected" : "Pending"}
            </span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.gtmContainerId ? "#EFF6FF" : "#FEF3C7",
              color: analyticsForm.gtmContainerId ? "#1D4ED8" : "#B45309",
              border: analyticsForm.gtmContainerId ? "1px solid #BFDBFE" : "1px solid #FDE68A"
            }}>
              GTM: {analyticsForm.gtmContainerId ? "Connected" : "Pending"}
            </span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.googleSearchConsoleVerification ? "#ECFDF5" : "#FEF3C7",
              color: analyticsForm.googleSearchConsoleVerification ? "#047857" : "#B45309",
              border: analyticsForm.googleSearchConsoleVerification ? "1px solid #A7F3D0" : "1px solid #FDE68A"
            }}>
              Search Console: {analyticsForm.googleSearchConsoleVerification ? "Verified" : "Pending"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveAnalytics}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
            {/* GA4 Measurement ID */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Google Analytics 4 (GA4) ID
                </label>
                {analyticsForm.ga4MeasurementId && (
                  <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700 }}>● Active</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.ga4MeasurementId}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, ga4MeasurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                From Google Analytics &gt; Admin &gt; Data Streams &gt; Measurement ID.
              </p>
            </div>

            {/* GTM Container ID */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Google Tag Manager (GTM) ID
                </label>
                {analyticsForm.gtmContainerId && (
                  <span style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700 }}>● Active</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.gtmContainerId}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, gtmContainerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                From GTM workspace header. Injects scripts and manages tracking tags.
              </p>
            </div>

            {/* Google Search Console Verification */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Search Console Verification
                </label>
                {analyticsForm.googleSearchConsoleVerification && (
                  <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700 }}>● Verified</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.googleSearchConsoleVerification}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, googleSearchConsoleVerification: e.target.value })}
                placeholder="google-site-verification code or meta"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                HTML tag code from Search Console &gt; Settings &gt; Ownership Verification.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {analyticsSavedNotice && (
                <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <CheckIcon size={14} color="#059669" />
                  Saved directly to PostgreSQL database!
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", textDecoration: "none" }}
              >
                <span>Check Live Website</span>
                <ExternalLinkIcon size={13} color="#475569" />
              </a>

              <button
                type="submit"
                disabled={isSavingAnalytics}
                className="btn-primary"
                style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.25rem" }}
              >
                {isSavingAnalytics ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <CheckIcon size={15} color="#FFFFFF" />
                    <span>Save Analytics Credentials</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {["All", "Core", "Solutions", "Capabilities", "Specialised", "Authority", "Campaigns"].map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || (cat === "All" ? seoPages.length : 0);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.42rem 0.85rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  border: isActive ? "1.5px solid #2563EB" : "1px solid #CBD5E1",
                  background: isActive ? "#EFF6FF" : "#FFFFFF",
                  color: isActive ? "#1D4ED8" : "#475569",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{cat}</span>
                <span style={{
                  fontSize: "0.68rem",
                  background: isActive ? "#2563EB" : "#E2E8F0",
                  color: isActive ? "#FFFFFF" : "#64748B",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "999px",
                  fontWeight: 800
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & SERP Device Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* SERP Preview Switcher */}
          <div style={{
            display: "inline-flex",
            background: "#F1F5F9",
            padding: "3px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0"
          }}>
            <button
              onClick={() => setSerpViewMode("desktop")}
              style={{
                border: "none",
                background: serpViewMode === "desktop" ? "#FFFFFF" : "transparent",
                color: serpViewMode === "desktop" ? "#1E293B" : "#64748B",
                fontWeight: 700,
                fontSize: "0.74rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: serpViewMode === "desktop" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}
            >
              Desktop SERP
            </button>
            <button
              onClick={() => setSerpViewMode("mobile")}
              style={{
                border: "none",
                background: serpViewMode === "mobile" ? "#FFFFFF" : "transparent",
                color: serpViewMode === "mobile" ? "#1E293B" : "#64748B",
                fontWeight: 700,
                fontSize: "0.74rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: serpViewMode === "mobile" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}
            >
              Mobile SERP
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: "260px" }}>
            <div style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }}>
              <SearchIcon size={14} color="#94A3B8" />
            </div>
            <input
              type="text"
              placeholder="Search route, title, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.45rem 0.85rem 0.45rem 2.2rem",
                fontSize: "0.82rem",
                borderRadius: "8px",
                border: "1.5px solid #CBD5E1",
                outline: "none",
                background: "#FFFFFF"
              }}
            />
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredPages.length === 0 ? (
          <div className="admin-card" style={{ padding: "3rem 2rem", textAlign: "center", color: "#64748B" }}>
            <SeoIcon size={36} color="#94A3B8" style={{ margin: "0 auto 0.75rem" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1E293B", margin: "0 0 0.4rem" }}>No Matching SEO Routes Found</h3>
            <p style={{ fontSize: "0.84rem", margin: 0 }}>Try clearing your search query or switch categories.</p>
          </div>
        ) : (
          filteredPages.map((page) => {
            const catBadge = getCategoryBadgeStyle(page.category);
            const titleLength = page.metaTitle.length;
            const descLength = page.metaDescription.length;
            const isCustom = !page.id.startsWith("seo-home") && !page.id.startsWith("seo-about") && !page.id.startsWith("seo-contact") && !page.id.startsWith("seo-sol") && !page.id.startsWith("seo-cap") && !page.id.startsWith("seo-spec") && !page.id.startsWith("seo-case") && !page.id.startsWith("seo-insights") && !page.id.startsWith("seo-faqs") && !page.id.startsWith("seo-privacy") && !page.id.startsWith("seo-lp");

            return (
              <div
                key={page.id}
                className="admin-card"
                style={{
                  padding: "1.4rem 1.6rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  border: "1px solid #E2E8F0",
                  transition: "all 0.2s ease"
                }}
              >
                {/* Top Route Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      ...catBadge
                    }}>
                      {page.category || "Core"}
                    </span>

                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.86rem",
                      fontWeight: 700,
                      color: "#1E40AF",
                      background: "#EFF6FF",
                      padding: "0.2rem 0.65rem",
                      borderRadius: "6px",
                      border: "1px solid #DBEAFE"
                    }}>
                      {page.pagePath}
                    </span>

                    <span style={{ fontSize: "0.98rem", fontWeight: 800, color: "#0F172A" }}>
                      {page.pageName}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <a
                      href={`http://localhost:3000${page.pagePath === "/" ? "" : page.pagePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: "0.74rem", padding: "0.32rem 0.65rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                      title="Open page in public website"
                    >
                      <ExternalLinkIcon size={12} />
                      <span>Live URL ↗</span>
                    </a>

                    <button
                      onClick={() => openEditModal(page)}
                      className="btn-secondary"
                      style={{ fontSize: "0.74rem", padding: "0.32rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                    >
                      <EditIcon size={13} />
                      <span>Edit SEO Meta</span>
                    </button>

                    {isCustom && (
                      <button
                        onClick={() => handleDelete(page.id, page.pageName)}
                        className="btn-secondary"
                        style={{ fontSize: "0.74rem", padding: "0.32rem 0.55rem", color: "#EF4444", borderColor: "#FCA5A5" }}
                        title="Delete custom route"
                      >
                        <TrashIcon size={13} color="#EF4444" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Google SERP Simulator Box */}
                <div style={{
                  background: serpViewMode === "desktop" ? "#FFFFFF" : "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "12px",
                  padding: serpViewMode === "desktop" ? "1.1rem 1.4rem" : "1rem 1.2rem",
                  maxWidth: serpViewMode === "desktop" ? "680px" : "420px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                }}>
                  {/* Google Breadcrumb */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.35rem" }}>
                    <div style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#2E628D",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 900
                    }}>
                      G
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#202124", lineHeight: 1.2 }}>
                      <span style={{ fontWeight: 600 }}>Good Life Sutra</span>
                      <span style={{ color: "#5f6368", margin: "0 0.25rem" }}>›</span>
                      <span style={{ color: "#5f6368" }}>
                        https://goodlifesutra.com{page.pagePath === "/" ? "" : page.pagePath}
                      </span>
                    </div>
                  </div>

                  {/* Title Link */}
                  <a
                    href={`http://localhost:3000${page.pagePath === "/" ? "" : page.pagePath}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "block",
                      fontSize: serpViewMode === "desktop" ? "1.12rem" : "1.05rem",
                      fontWeight: 500,
                      color: "#1a0dab",
                      textDecoration: "none",
                      lineHeight: 1.35,
                      marginBottom: "0.4rem",
                      fontFamily: "Arial, sans-serif"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {page.metaTitle}
                  </a>

                  {/* Description Snippet */}
                  <p style={{
                    fontSize: serpViewMode === "desktop" ? "0.85rem" : "0.82rem",
                    color: "#4d5156",
                    margin: 0,
                    lineHeight: 1.45,
                    fontFamily: "Arial, sans-serif"
                  }}>
                    {page.metaDescription}
                  </p>
                </div>

                {/* SEO Metrics & Attributes Bar */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  fontSize: "0.75rem",
                  color: "#64748B",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid #F1F5F9"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    {/* Title length */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span style={{ fontWeight: 700, color: "#334155" }}>Title:</span>
                      <span style={{
                        fontWeight: 700,
                        color: titleLength >= 45 && titleLength <= 65 ? "#059669" : titleLength > 65 ? "#DC2626" : "#D97706"
                      }}>
                        {titleLength} / 60 chars
                      </span>
                    </div>

                    {/* Desc length */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span style={{ fontWeight: 700, color: "#334155" }}>Description:</span>
                      <span style={{
                        fontWeight: 700,
                        color: descLength >= 120 && descLength <= 165 ? "#059669" : descLength > 165 ? "#DC2626" : "#D97706"
                      }}>
                        {descLength} / 160 chars
                      </span>
                    </div>

                    {/* Robots */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span style={{ fontWeight: 700, color: "#334155" }}>Robots:</span>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: page.robots?.includes("noindex") ? "#DC2626" : "#059669",
                        fontWeight: 700
                      }}>
                        {page.robots || "index, follow"}
                      </span>
                    </div>
                  </div>

                  {/* Canonical */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span style={{ fontWeight: 700, color: "#334155" }}>Canonical:</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#475569" }}>
                      {page.canonical || `https://goodlifesutra.com${page.pagePath}`}
                    </span>
                  </div>
                </div>

                {/* Target Keywords Pill List */}
                {page.keywords && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#475569" }}>KEYWORDS:</span>
                    {page.keywords.split(",").map((k, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.72rem",
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "4px",
                          color: "#334155",
                          fontWeight: 500
                        }}
                      >
                        {k.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Edit / Add SEO Modal */}
      {(editingItem || isAddingNew) && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <SeoIcon size={18} color="#FFFFFF" />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {isAddingNew ? "Add New SEO Route" : `Edit SEO for ${formData.pageName}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsAddingNew(false);
                }}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94A3B8" }}
              >
                <CloseIcon size={18} color="#94A3B8" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Route Path & Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Page Route Path *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/solutions/my-page"
                    value={formData.pagePath}
                    onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                    className="input-control"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as SeoPageItem["category"] })}
                    className="input-control"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <option value="Core">Core Page</option>
                    <option value="Solutions">Solutions</option>
                    <option value="Capabilities">Capabilities</option>
                    <option value="Specialised">Specialised Verticals</option>
                    <option value="Authority">Authority &amp; Legal</option>
                    <option value="Campaigns">Campaign Landing Page</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Internal Page Display Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Scale Surge"
                  value={formData.pageName}
                  onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                  className="input-control"
                />
              </div>

              {/* Meta Title */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>
                    Google SEO Meta Title *
                  </label>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: formData.metaTitle.length >= 45 && formData.metaTitle.length <= 65 ? "#059669" : formData.metaTitle.length > 65 ? "#DC2626" : "#D97706"
                  }}>
                    {formData.metaTitle.length} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="input-control"
                  placeholder="Brand Name — Primary Keyword | Sub-Keyword"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>
                    Google SEO Meta Description *
                  </label>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 165 ? "#059669" : formData.metaDescription.length > 165 ? "#DC2626" : "#D97706"
                  }}>
                    {formData.metaDescription.length} / 160 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="input-control"
                  placeholder="Compelling 150-160 character snippet summarizing the unique value proposition..."
                />
              </div>

              {/* Real-time SERP Preview Box inside Modal */}
              <div style={{
                background: "#F8FAFC",
                border: "1px solid #CBD5E1",
                borderRadius: "10px",
                padding: "1rem 1.2rem"
              }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                  Live Google SERP Simulator
                </div>
                <div style={{ fontSize: "0.78rem", color: "#202124", marginBottom: "0.2rem" }}>
                  https://goodlifesutra.com{formData.pagePath}
                </div>
                <div style={{ fontSize: "1.02rem", color: "#1a0dab", fontWeight: 500, lineHeight: 1.3, marginBottom: "0.25rem", fontFamily: "Arial, sans-serif" }}>
                  {formData.metaTitle || "Title preview will appear here..."}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#4d5156", lineHeight: 1.4, margin: 0, fontFamily: "Arial, sans-serif" }}>
                  {formData.metaDescription || "Description preview will appear here..."}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Target Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="input-control"
                  placeholder="e.g. ecommerce operations, amazon advertising, flipkart fulfillment"
                />
              </div>

              {/* Canonical URL & Robots Directives */}
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Canonical Tag
                  </label>
                  <input
                    type="text"
                    value={formData.canonical}
                    onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                    className="input-control"
                    placeholder={`https://goodlifesutra.com${formData.pagePath}`}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Robots Indexing Directive
                  </label>
                  <select
                    value={formData.robots}
                    onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                    className="input-control"
                  >
                    <option value="index, follow">index, follow (Standard Public)</option>
                    <option value="noindex, follow">noindex, follow (Hide from Google)</option>
                    <option value="noindex, nofollow">noindex, nofollow (Strict Private)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.8rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsAddingNew(false);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckIcon size={15} color="#FFFFFF" />
                  <span>{isAddingNew ? "Add Route to Sitemap" : "Save SEO Metadata"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* XML Sitemap Modal */}
      {showSitemapModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: "750px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <GlobeIcon size={20} color="#2563EB" />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Generated XML Sitemap ({seoPages.length} URLs)
                </h3>
              </div>
              <button
                onClick={() => setShowSitemapModal(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94A3B8" }}
              >
                <CloseIcon size={18} color="#94A3B8" />
              </button>
            </div>

            <p style={{ fontSize: "0.84rem", color: "#64748B", margin: "0 0 1rem" }}>
              This live sitemap dynamically maps all active pages from the Good Life Sutra CMS. You can copy this output directly for Google Search Console submission.
            </p>

            <pre style={{
              background: "#0F172A",
              color: "#38BDF8",
              padding: "1rem",
              borderRadius: "10px",
              fontSize: "0.76rem",
              fontFamily: "'JetBrains Mono', monospace",
              maxHeight: "340px",
              overflowY: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {generateSitemapXml()}
            </pre>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button
                onClick={() => setShowSitemapModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => copyToClipboard(generateSitemapXml(), "XML Sitemap")}
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CopyIcon size={14} color="#FFFFFF" />
                <span>Copy XML to Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
