"use client";

import React, { useState } from "react";
import { useAdminData, ArticleItem } from "@/context/AdminDataContext";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  CloseIcon,
  ExternalLinkIcon,
  CheckIcon,
  InsightIcon,
  EyeIcon,
  CopyIcon,
  ImageIcon,
  QuoteIcon,
  ListIcon,
  TableIcon,
  LinkIcon,
  RefreshIcon
} from "@/components/Icons";

const INSIGHT_CATEGORIES = [
  "Marketplace Operations",
  "Marketplace Growth & Advertising",
  "Inventory & Stock Planning",
  "Warehousing & Fulfilment",
  "Revenue Assurance & Reconciliation",
  "Returns & Reverse Operations",
  "Heavy & Bulky Commerce",
  "Business Insights"
] as const;

const SUGGESTED_TAGS = [
  "Amazon",
  "Flipkart",
  "Marketplace",
  "Inventory",
  "Fulfilment",
  "Returns",
  "Revenue",
  "Growth",
  "Quick Commerce",
  "Buybox",
  "Reconciliation"
];

const PRESET_IMAGES = [
  { label: "Warehouse Operations", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80" },
  { label: "Inventory Storage", url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80" },
  { label: "Financial Audit", url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80" },
  { label: "Heavy Logistics", url: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80" },
  { label: "Quick Commerce", url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80" }
];

export default function InsightsPage() {
  const {
    articles,
    saveArticle,
    deleteArticle,
    toggleArticleStatus,
    duplicateArticle,
    authors
  } = useAdminData();

  // Filter States
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "Published" | "Draft" | "Scheduled">("ALL");
  const [filterAuthor, setFilterAuthor] = useState("ALL");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"basics" | "image" | "content" | "seo">("basics");
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  // Preview Modal State
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);

  // Delete Confirmation Modal
  const [deletingArticle, setDeletingArticle] = useState<ArticleItem | null>(null);

  // Editor Form Data
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    imageAlt: "",
    category: "Marketplace Operations",
    status: "Published" as "Published" | "Draft" | "Scheduled",
    author: authors[0]?.name || "Rajeev Nair",
    authorRole: authors[0]?.role || "Head of Marketplace Operations",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    tags: ["Marketplace", "Growth"],
    scheduledAt: "",
    seoTitle: "",
    seoDesc: "",
    canonicalUrl: "",
    ogImage: "",
    readTime: "6 min read"
  });

  const [customTagInput, setCustomTagInput] = useState("");

  // Statistics
  const totalCount = articles.length;
  const publishedCount = articles.filter(a => a.status === "Published").length;
  const draftCount = articles.filter(a => a.status === "Draft").length;
  const scheduledCount = articles.filter(a => a.status === "Scheduled").length;

  const openAddModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: PRESET_IMAGES[0].url,
      imageAlt: "",
      category: "Marketplace Operations",
      status: "Published",
      author: authors[0]?.name || "Rajeev Nair",
      authorRole: authors[0]?.role || "Head of Marketplace Operations",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      tags: ["Marketplace", "Commerce"],
      scheduledAt: "",
      seoTitle: "",
      seoDesc: "",
      canonicalUrl: "",
      ogImage: "",
      readTime: "5 min read"
    });
    setActiveTab("basics");
    setIsModalOpen(true);
  };

  const openEditModal = (a: ArticleItem) => {
    setEditingArticle(a);
    setFormData({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || "",
      content: a.content || "",
      featuredImage: a.featuredImage || PRESET_IMAGES[0].url,
      imageAlt: a.imageAlt || a.title,
      category: a.category,
      status: a.status,
      author: a.author,
      authorRole: a.authorRole || "Commerce Practice Lead",
      authorPhoto: a.authorPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      tags: a.tags || [],
      scheduledAt: a.scheduledAt || "",
      seoTitle: a.seoTitle || a.title,
      seoDesc: a.seoDesc || a.excerpt || "",
      canonicalUrl: a.canonicalUrl || `/insights/${a.slug}`,
      ogImage: a.ogImage || a.featuredImage || "",
      readTime: a.readTime || "6 min read"
    });
    setActiveTab("basics");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingArticle ? prev.slug : generatedSlug,
      seoTitle: editingArticle ? prev.seoTitle : `${val} | Good Life Sutra`,
      canonicalUrl: editingArticle ? prev.canonicalUrl : `/insights/${generatedSlug}`
    }));
  };

  const handleAuthorChange = (name: string) => {
    const found = authors.find(au => au.name === name);
    setFormData(prev => ({
      ...prev,
      author: name,
      authorRole: found?.role || "Commerce Practice",
      authorPhoto: found?.role?.includes("Supply")
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
        : found?.role?.includes("Reconcil")
        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  const addCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (!trimmed || formData.tags.includes(trimmed)) return;
    setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setCustomTagInput("");
  };

  const insertFormatting = (syntaxStart: string, syntaxEnd = "") => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + syntaxStart + syntaxEnd
    }));
  };

  const handleSave = (statusToSave?: "Published" | "Draft" | "Scheduled") => {
    if (!formData.title.trim()) return;
    const finalStatus = statusToSave || formData.status;
    const toSave: Partial<ArticleItem> = {
      ...formData,
      status: finalStatus,
      seoTitle: formData.seoTitle || `${formData.title} | Good Life Sutra`,
      seoDesc: formData.seoDesc || formData.excerpt,
      canonicalUrl: formData.canonicalUrl || `/insights/${formData.slug}`
    };
    saveArticle(toSave, editingArticle?.id);
    setIsModalOpen(false);
  };

  const filtered = articles.filter(a => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(search.toLowerCase())) ||
      (a.category && a.category.toLowerCase().includes(search.toLowerCase())) ||
      (a.author && a.author.toLowerCase().includes(search.toLowerCase())) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

    const matchesCategory = filterCategory === "ALL" || a.category === filterCategory;
    const matchesStatus = filterStatus === "ALL" || a.status === filterStatus;
    const matchesAuthor = filterAuthor === "ALL" || a.author === filterAuthor;

    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Page Header */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "1.5rem 2rem",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", color: "#2563EB", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem" }}>
            <InsightIcon size={15} color="#2563EB" />
            <span>CMS Content Hub</span>
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Insights &amp; Knowledge Command
          </h2>
          <p style={{ fontSize: "0.86rem", color: "#64748B", margin: "0.3rem 0 0 0" }}>
            Create, edit, preview, and publish enterprise commerce whitepapers, operational playbooks, and SEO articles.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href="http://localhost:3000/insights"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "0.6rem 1.1rem",
              borderRadius: "8px",
              background: "#F8FAFC",
              border: "1px solid #CBD5E1",
              color: "#334155",
              fontWeight: 700,
              fontSize: "0.82rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none"
            }}
          >
            <span>View Public /insights</span>
            <ExternalLinkIcon size={13} color="#475569" />
          </a>

          <button onClick={openAddModal} className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}>
            <PlusIcon size={16} color="#FFFFFF" />
            <span>Add New Insight</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Counters Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "1rem"
      }}>
        <div style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Articles</div>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#0F172A", marginTop: "0.3rem" }}>{totalCount}</div>
          <div style={{ fontSize: "0.74rem", color: "#2563EB", fontWeight: 600, marginTop: "0.2rem" }}>Active CMS Library</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #A7F3D0" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#065F46", textTransform: "uppercase" }}>Published Live</div>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#059669", marginTop: "0.3rem" }}>{publishedCount}</div>
          <div style={{ fontSize: "0.74rem", color: "#059669", fontWeight: 600, marginTop: "0.2rem" }}>Visible to Public</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #FDE68A" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#92400E", textTransform: "uppercase" }}>Draft In-Progress</div>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#D97706", marginTop: "0.3rem" }}>{draftCount}</div>
          <div style={{ fontSize: "0.74rem", color: "#D97706", fontWeight: 600, marginTop: "0.2rem" }}>Unpublished Internal</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #DDD6FE" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#5B21B6", textTransform: "uppercase" }}>Scheduled Auto-Drop</div>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#7C3AED", marginTop: "0.3rem" }}>{scheduledCount}</div>
          <div style={{ fontSize: "0.74rem", color: "#7C3AED", fontWeight: 600, marginTop: "0.2rem" }}>Automated Release</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.1rem 1.4rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", flex: "1 1 300px" }}>
            <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.85rem" }} />
            <input
              type="text"
              placeholder="Search insights by title, excerpt, category, author or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-control"
              style={{ paddingLeft: "2.4rem", width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            {(["ALL", "Published", "Draft", "Scheduled"] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid",
                  background: filterStatus === st ? "#2563EB" : "#F8FAFC",
                  color: filterStatus === st ? "#FFFFFF" : "#475569",
                  borderColor: filterStatus === st ? "#2563EB" : "#E2E8F0"
                }}
              >
                {st === "ALL" ? "All Status" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Category & Author Dropdowns */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          paddingTop: "0.75rem",
          borderTop: "1px solid #F1F5F9"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B" }}>Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-control"
              style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", width: "auto" }}
            >
              <option value="ALL">All Categories ({articles.length})</option>
              {INSIGHT_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748B" }}>Author:</span>
            <select
              value={filterAuthor}
              onChange={(e) => setFilterAuthor(e.target.value)}
              className="input-control"
              style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", width: "auto" }}
            >
              <option value="ALL">All Authors</option>
              {authors.map(au => (
                <option key={au.id} value={au.name}>{au.name}</option>
              ))}
            </select>
          </div>

          {(search || filterCategory !== "ALL" || filterStatus !== "ALL" || filterAuthor !== "ALL") && (
            <button
              onClick={() => {
                setSearch("");
                setFilterCategory("ALL");
                setFilterStatus("ALL");
                setFilterAuthor("ALL");
              }}
              style={{
                fontSize: "0.75rem",
                color: "#EF4444",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <RefreshIcon size={12} color="#EF4444" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Insights Article List Table */}
      <div className="admin-card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              <th style={{ padding: "0.9rem 1.25rem", width: "80px" }}>Visual</th>
              <th style={{ padding: "0.9rem 1rem" }}>Title &amp; Excerpt</th>
              <th style={{ padding: "0.9rem 1rem" }}>Category &amp; Tags</th>
              <th style={{ padding: "0.9rem 1rem" }}>Author &amp; Date</th>
              <th style={{ padding: "0.9rem 1rem" }}>Status</th>
              <th style={{ padding: "0.9rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem 1rem", color: "#94A3B8" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                    <InsightIcon size={32} color="#94A3B8" />
                  </div>
                  <div style={{ fontWeight: 700, color: "#475569" }}>No articles found matching filters.</div>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>Try adjusting your search keywords or clear category filters.</p>
                </td>
              </tr>
            ) : (
              filtered.map((art) => (
                <tr
                  key={art.id}
                  style={{
                    borderBottom: "1px solid #F1F5F9",
                    transition: "background 0.15s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Thumbnail Image */}
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{
                      width: "68px",
                      height: "48px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#F1F5F9",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {art.featuredImage ? (
                        <img
                          src={art.featuredImage}
                          alt={art.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <ImageIcon size={18} color="#94A3B8" />
                      )}
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td style={{ padding: "1rem 1rem", maxWidth: "360px" }}>
                    <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.92rem", lineHeight: 1.35 }}>
                      {art.title}
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "#64748B", fontFamily: "'JetBrains Mono', monospace", marginTop: "0.2rem" }}>
                      /insights/{art.slug}
                    </div>
                    {art.excerpt && (
                      <p style={{
                        fontSize: "0.78rem",
                        color: "#64748B",
                        margin: "0.3rem 0 0 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {art.excerpt}
                      </p>
                    )}
                  </td>

                  {/* Category & Tags */}
                  <td style={{ padding: "1rem 1rem" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      border: "1px solid #BFDBFE"
                    }}>
                      {art.category}
                    </span>
                    {art.tags && art.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
                        {art.tags.slice(0, 3).map((t, idx) => (
                          <span key={idx} style={{ fontSize: "0.68rem", background: "#F1F5F9", color: "#475569", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Author & Date */}
                  <td style={{ padding: "1rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {art.authorPhoto && (
                        <img
                          src={art.authorPhoto}
                          alt={art.author}
                          style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: "#1E293B", fontSize: "0.82rem" }}>{art.author}</div>
                        <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{art.date} · {art.readTime || "5 min"}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: "1rem 1rem" }}>
                    <button
                      onClick={() => toggleArticleStatus(art.id)}
                      title="Click to toggle publish status"
                      style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
                    >
                      <span className={
                        art.status === "Published"
                          ? "badge badge-green"
                          : art.status === "Draft"
                          ? "badge badge-amber"
                          : "badge badge-purple"
                      }>
                        <span style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: art.status === "Published" ? "#10B981" : art.status === "Draft" ? "#F59E0B" : "#8B5CF6"
                        }} />
                        <span>{art.status}</span>
                      </span>
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      {/* Preview Button */}
                      <button
                        onClick={() => setPreviewArticle(art)}
                        title="Live Article Preview"
                        style={{
                          background: "#F8FAFC",
                          border: "1px solid #CBD5E1",
                          borderRadius: "6px",
                          padding: "0.35rem 0.6rem",
                          cursor: "pointer",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          color: "#334155",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem"
                        }}
                      >
                        <EyeIcon size={13} color="#334155" />
                        <span>Preview</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(art)}
                        title="Edit Article"
                        style={{
                          background: "#EFF6FF",
                          border: "1px solid #BFDBFE",
                          borderRadius: "6px",
                          padding: "0.35rem 0.6rem",
                          cursor: "pointer",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          color: "#1D4ED8",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem"
                        }}
                      >
                        <EditIcon size={13} color="#1D4ED8" />
                        <span>Edit</span>
                      </button>

                      {/* Duplicate Button */}
                      <button
                        onClick={() => duplicateArticle(art.id)}
                        title="Duplicate into New Draft"
                        style={{
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          borderRadius: "6px",
                          padding: "0.35rem 0.6rem",
                          cursor: "pointer",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          color: "#475569",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem"
                        }}
                      >
                        <CopyIcon size={13} color="#475569" />
                        <span>Copy</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeletingArticle(art)}
                        title="Delete Article"
                        style={{
                          background: "#FEF2F2",
                          border: "1px solid #FECACA",
                          borderRadius: "6px",
                          padding: "0.35rem 0.5rem",
                          cursor: "pointer",
                          color: "#DC2626",
                          display: "inline-flex",
                          alignItems: "center"
                        }}
                      >
                        <TrashIcon size={14} color="#DC2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT INSIGHT MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "960px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            overflow: "hidden"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "1.2rem 1.75rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8FAFC"
            }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {editingArticle ? `Edit Insight: ${editingArticle.title.slice(0, 45)}...` : "Create New Insight Article"}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
                  Compose authoritative multi-channel commerce insights with SEO metadata.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", padding: "0.4rem" }}
              >
                <CloseIcon size={20} color="#64748B" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid #E2E8F0",
              background: "#FFFFFF",
              padding: "0 1.75rem"
            }}>
              {[
                { id: "basics", label: "1. Basic Info & Author" },
                { id: "image", label: "2. Featured Image" },
                { id: "content", label: "3. Article Content & Body" },
                { id: "seo", label: "4. SEO & Google SERP Preview" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "0.9rem 1.25rem",
                    border: "none",
                    background: "transparent",
                    borderBottom: activeTab === tab.id ? "3px solid #2563EB" : "3px solid transparent",
                    color: activeTab === tab.id ? "#2563EB" : "#64748B",
                    fontWeight: activeTab === tab.id ? 800 : 600,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body with scroll */}
            <div style={{ padding: "1.75rem", overflowY: "auto", flex: 1 }}>
              {/* TAB 1: BASICS */}
              {activeTab === "basics" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How Brands Can Scale Marketplace Operations Profitably in 2026"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="input-control"
                      style={{ fontSize: "0.95rem", fontWeight: 600 }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        URL Slug (/insights/[slug]) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="how-brands-can-scale-marketplace-operations"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="input-control"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6 min read"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        className="input-control"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Article Excerpt / Short Summary
                    </label>
                    <textarea
                      rows={2}
                      placeholder="2-3 sentence overview of what the brand executive will learn from this insight..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input-control"
                        style={{ background: "#FFFFFF", cursor: "pointer" }}
                      >
                        {INSIGHT_CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Article Author Profile *
                      </label>
                      <select
                        value={formData.author}
                        onChange={(e) => handleAuthorChange(e.target.value)}
                        className="input-control"
                        style={{ background: "#FFFFFF", cursor: "pointer" }}
                      >
                        {authors.map(au => (
                          <option key={au.id} value={au.name}>{au.name} — {au.role}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tags Selector */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Keyword Tags
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.6rem" }}>
                      {SUGGESTED_TAGS.map(t => {
                        const active = formData.tags.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleTag(t)}
                            style={{
                              padding: "0.3rem 0.65rem",
                              borderRadius: "999px",
                              fontSize: "0.74rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              border: "1px solid",
                              background: active ? "#2563EB" : "#F8FAFC",
                              color: active ? "#FFFFFF" : "#475569",
                              borderColor: active ? "#2563EB" : "#CBD5E1",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem"
                            }}
                          >
                            {active && <CheckIcon size={12} color="#FFFFFF" />}
                            <span>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="text"
                        placeholder="Add custom keyword tag..."
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTag(); } }}
                        className="input-control"
                        style={{ maxWidth: "250px", fontSize: "0.8rem" }}
                      />
                      <button type="button" onClick={addCustomTag} className="btn-secondary" style={{ fontSize: "0.8rem" }}>
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FEATURED IMAGE */}
              {activeTab === "image" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Featured Image URL *
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Image Alt Text (for SEO &amp; Accessibility)
                    </label>
                    <input
                      type="text"
                      placeholder="Descriptive alt text for the featured graphic..."
                      value={formData.imageAlt}
                      onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  {/* 1-Click Preset Images */}
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>
                      Or Pick From Curated High-Resolution Presets:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
                      {PRESET_IMAGES.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => setFormData(prev => ({ ...prev, featuredImage: p.url, imageAlt: p.label }))}
                          style={{
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: formData.featuredImage === p.url ? "2px solid #2563EB" : "1px solid #E2E8F0",
                            cursor: "pointer",
                            background: "#F8FAFC"
                          }}
                        >
                          <img src={p.url} alt={p.label} style={{ width: "100%", height: "85px", objectFit: "cover" }} />
                          <div style={{ padding: "0.4rem", fontSize: "0.72rem", fontWeight: 700, textAlign: "center", color: "#334155" }}>
                            {p.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Image Preview */}
                  {formData.featuredImage && (
                    <div style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      borderRadius: "10px",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>Live Banner Preview</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, featuredImage: "" }))}
                          style={{ fontSize: "0.74rem", color: "#EF4444", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}
                        >
                          Remove Image
                        </button>
                      </div>
                      <div style={{ width: "100%", maxHeight: "240px", overflow: "hidden", borderRadius: "8px" }}>
                        <img
                          src={formData.featuredImage}
                          alt={formData.imageAlt || "Preview"}
                          style={{ width: "100%", height: "220px", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CONTENT EDITOR */}
              {activeTab === "content" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Formatting Toolbar */}
                  <div style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    padding: "0.5rem 0.75rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    alignItems: "center"
                  }}>
                    <button
                      type="button"
                      onClick={() => insertFormatting("**Bold Text**")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", fontWeight: 900, cursor: "pointer", fontSize: "0.85rem" }}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("*Italic Text*")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", fontStyle: "italic", cursor: "pointer", fontSize: "0.85rem" }}
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<u>Underlined Text</u>")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", textDecoration: "underline", cursor: "pointer", fontSize: "0.85rem" }}
                      title="Underline"
                    >
                      U
                    </button>
                    <span style={{ width: "1px", height: "18px", background: "#CBD5E1", margin: "0 0.2rem" }} />
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n### Section Heading\n\n")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", fontWeight: 800, cursor: "pointer", fontSize: "0.8rem" }}
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n#### Subheading\n\n")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", fontWeight: 800, cursor: "pointer", fontSize: "0.8rem" }}
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <span style={{ width: "1px", height: "18px", background: "#CBD5E1", margin: "0 0.2rem" }} />
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n* Bullet point item 1\n* Bullet point item 2\n\n")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                      title="Bullet List"
                    >
                      <ListIcon size={14} color="#334155" />
                      <span>List</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n> Key Insight Callout: Marketplace delivery algorithms strictly reward local warehouse proximity.\n\n")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                      title="Quote Block"
                    >
                      <QuoteIcon size={13} color="#334155" />
                      <span>Quote</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("[Link Anchor Text](https://goodlifesutra.com)")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                      title="Hyperlink"
                    >
                      <LinkIcon size={13} color="#334155" />
                      <span>Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n| Metric | Baseline | With Good Life |\n|---|---|---|\n| Transit Damage | 14% | <0.5% |\n| Buybox Win Rate | 48% | 88% |\n\n")}
                      style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                      title="Table"
                    >
                      <TableIcon size={13} color="#334155" />
                      <span>Table</span>
                    </button>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Main Article Body (Markdown Supported) *
                    </label>
                    <textarea
                      rows={14}
                      required
                      placeholder="Write your article in Markdown here... Use headers, bold, bullet points, callouts, and numbered lists."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="input-control"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", lineHeight: 1.6 }}
                    />
                  </div>

                  <div style={{ fontSize: "0.76rem", color: "#64748B", display: "flex", justifyContent: "space-between" }}>
                    <span>Characters: {formData.content.length} · Words: {formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0}</span>
                    <span>Supports GitHub Flavored Markdown (headings, lists, bold, links, tables)</span>
                  </div>
                </div>
              )}

              {/* TAB 4: SEO & GOOGLE SERP PREVIEW */}
              {activeTab === "seo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <label style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1E293B" }}>
                        SEO Meta Title
                      </label>
                      <span style={{ fontSize: "0.74rem", color: formData.seoTitle.length > 60 ? "#EF4444" : "#10B981", fontWeight: 700 }}>
                        {formData.seoTitle.length}/60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. How Brands Can Scale Marketplace Operations | Good Life Sutra"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <label style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1E293B" }}>
                        SEO Meta Description
                      </label>
                      <span style={{ fontSize: "0.74rem", color: formData.seoDesc.length > 160 ? "#EF4444" : "#10B981", fontWeight: 700 }}>
                        {formData.seoDesc.length}/160 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Compelling 140-160 character description designed to maximize click-through rate from Google Search..."
                      value={formData.seoDesc}
                      onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      placeholder="/insights/how-brands-can-scale-marketplace-operations"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      className="input-control"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }}
                    />
                  </div>

                  {/* Google SERP Live Preview */}
                  <div style={{
                    marginTop: "0.5rem",
                    padding: "1.25rem",
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <SearchIcon size={14} color="#475569" />
                      <span>Google Search Snippet Live Preview</span>
                    </div>
                    <div style={{ maxWidth: "600px" }}>
                      <div style={{ fontSize: "0.82rem", color: "#202124", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                        <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: "10px", fontWeight: 900 }}>G</span>
                        <span style={{ color: "#4D5156" }}>goodlifesutra.com</span>
                        <span style={{ color: "#70757A" }}>› insights › {formData.slug || "sample-slug"}</span>
                      </div>
                      <div style={{ fontSize: "1.15rem", color: "#1A0DAB", fontWeight: 500, lineHeight: 1.3, marginBottom: "0.3rem", cursor: "pointer" }}>
                        {formData.seoTitle || "Article Title - Good Life Sutra"}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#4D5156", lineHeight: 1.45 }}>
                        {formData.seoDesc || formData.excerpt || "Learn how consumer brands and OEM manufacturers scale marketplace operations across Amazon, Flipkart, and Quick-Commerce."}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div style={{
              padding: "1.2rem 1.75rem",
              borderTop: "1px solid #E2E8F0",
              background: "#F8FAFC",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Publish State:</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="input-control"
                  style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem", width: "auto" }}
                >
                  <option value="Published">Published (Live)</option>
                  <option value="Draft">Draft (Internal)</option>
                  <option value="Scheduled">Scheduled Auto-Drop</option>
                </select>

                {formData.status === "Scheduled" && (
                  <input
                    type="date"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                    className="input-control"
                    style={{ padding: "0.35rem 0.6rem", fontSize: "0.78rem", width: "auto" }}
                  />
                )}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: "0.55rem 1rem", fontSize: "0.85rem" }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleSave("Draft")}
                  style={{
                    padding: "0.55rem 1.1rem",
                    borderRadius: "8px",
                    background: "#F1F5F9",
                    border: "1px solid #CBD5E1",
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSave("Published")}
                  className="btn-primary"
                  style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem" }}
                >
                  {editingArticle ? "Update & Publish" : "Publish Insight Now →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL RENDERED ARTICLE PREVIEW MODAL */}
      {previewArticle && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "880px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)"
          }}>
            {/* Top Bar */}
            <div style={{
              padding: "1rem 1.5rem",
              background: "#0F172A",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.75rem", background: "#2563EB", padding: "0.2rem 0.6rem", borderRadius: "4px", fontWeight: 800 }}>
                  LIVE PREVIEW
                </span>
                <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
                  goodlifesutra.com/insights/{previewArticle.slug}
                </span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                style={{ background: "transparent", border: "none", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <CloseIcon size={18} color="#FFFFFF" />
              </button>
            </div>

            {/* Rendered Article Body */}
            <div style={{ padding: "2.5rem 3rem", overflowY: "auto", flex: 1 }}>
              {/* Category & Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {previewArticle.category}
                </span>
                <span style={{ color: "#CBD5E1" }}>·</span>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>{previewArticle.date}</span>
                <span style={{ color: "#CBD5E1" }}>·</span>
                <span style={{ fontSize: "0.8rem", color: "#64748B" }}>{previewArticle.readTime || "6 min read"}</span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: "2.1rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.25, marginBottom: "1.25rem" }}>
                {previewArticle.title}
              </h1>

              {/* Author Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #E2E8F0" }}>
                {previewArticle.authorPhoto && (
                  <img
                    src={previewArticle.authorPhoto}
                    alt={previewArticle.author}
                    style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid #BFDBFE" }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.92rem" }}>{previewArticle.author}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748B" }}>{previewArticle.authorRole || "Good Life Commerce Practice"}</div>
                </div>
              </div>

              {/* Featured Image */}
              {previewArticle.featuredImage && (
                <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
                  <img
                    src={previewArticle.featuredImage}
                    alt={previewArticle.imageAlt || previewArticle.title}
                    style={{ width: "100%", maxHeight: "360px", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Excerpt Callout */}
              {previewArticle.excerpt && (
                <div style={{
                  padding: "1.25rem 1.5rem",
                  background: "#EFF6FF",
                  borderLeft: "4px solid #2563EB",
                  borderRadius: "0 8px 8px 0",
                  marginBottom: "2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1E3A8A",
                  lineHeight: 1.5
                }}>
                  {previewArticle.excerpt}
                </div>
              )}

              {/* Content Body */}
              <div style={{
                fontSize: "0.95rem",
                color: "#334155",
                lineHeight: 1.75,
                whiteSpace: "pre-wrap"
              }}>
                {previewArticle.content}
              </div>

              {/* Tags */}
              {previewArticle.tags && previewArticle.tags.length > 0 && (
                <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#475569", marginBottom: "0.5rem" }}>
                    FILED UNDER:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {previewArticle.tags.map((t, idx) => (
                      <span key={idx} style={{ padding: "0.3rem 0.7rem", borderRadius: "6px", background: "#F1F5F9", color: "#334155", fontSize: "0.78rem", fontWeight: 600 }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview Footer */}
            <div style={{ padding: "1rem 1.5rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setPreviewArticle(null)} className="btn-secondary">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingArticle && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            width: "100%",
            maxWidth: "460px",
            padding: "1.75rem",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", background: "#FEE2E2", marginBottom: "0.85rem" }}>
              <TrashIcon size={22} color="#DC2626" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem 0" }}>
              Delete Insight Article?
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1.25rem 0" }}>
              Are you sure you want to delete <strong style={{ color: "#0F172A" }}>"{deletingArticle.title}"</strong>? This will remove the article and its SEO URL from the public website.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setDeletingArticle(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteArticle(deletingArticle.id);
                  setDeletingArticle(null);
                }}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer"
                }}
              >
                Yes, Delete Insight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
