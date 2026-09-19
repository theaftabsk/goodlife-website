"use client";

import React, { useState, useMemo } from "react";
import { useAdminData, CaseStudyItem, CaseStudyMetric } from "@/context/AdminDataContext";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  EyeIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingIcon,
  BriefcaseIcon,
  MapPinIcon,
  AwardIcon,
  TrendUpIcon,
  LinkIcon,
  RefreshIcon
} from "@/components/Icons";

const COVER_PRESETS = [
  { name: "Modern Warehouse & Logistics", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80" },
  { name: "Electronics & Smart Factory", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80" },
  { name: "Kitchen & Home Appliance Line", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80" },
  { name: "Industrial Air Quality & Chimney", url: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80" },
  { name: "High-Speed Dispatch Hub", url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80" }
];

const INDUSTRY_OPTIONS = [
  "Small Domestic Appliances",
  "Large Appliances & Chimneys",
  "Power & Energy Storage",
  "Home & Kitchen Hardware",
  "Seasonal Cooling & Heating",
  "Consumer Electronics & Audio",
  "B2B Industrial Supplies"
];

const CAPABILITY_OPTIONS = [
  "Marketplace Management",
  "Fulfillment & Logistics",
  "Catalog & Brand Store",
  "Packaging Engineering",
  "Returns Mitigation",
  "Tax & Compliance",
  "Payment Reconciliation",
  "Quick-Commerce Acceleration",
  "Performance Marketing"
];

export default function CaseStudiesPage() {
  const {
    caseStudies,
    saveCaseStudy,
    deleteCaseStudy,
    toggleCaseStudyStatus,
    toggleCaseStudyFeatured,
    duplicateCaseStudy,
    currentUser
  } = useAdminData();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft">("All");
  const [filterIndustry, setFilterIndustry] = useState<string>("All");
  const [filterCapability, setFilterCapability] = useState<string>("All");
  const [filterFeatured, setFilterFeatured] = useState<"All" | "Featured" | "Standard">("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "media" | "challenge_solution" | "results" | "seo">("basic");
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudyItem | null>(null);

  // Form Data State
  const [formData, setFormData] = useState<Partial<CaseStudyItem>>({
    title: "",
    slug: "",
    client: "",
    industry: "Small Domestic Appliances",
    location: "Pan-India Hubs",
    timeframe: "6 Months",
    shortDescription: "",
    coverImage: COVER_PRESETS[0].url,
    imageAlt: "",
    challenge: "",
    solution: "",
    actionTaken: [""],
    capabilities: ["Marketplace Management", "Fulfillment & Logistics"],
    metrics: [
      { val: "+830%", lbl: "GMV Surge in 9 Months" },
      { val: "99.4%", lbl: "SLA Adherence Rate" }
    ],
    testimonial: {
      quote: "",
      author: "",
      designation: "",
      company: ""
    },
    status: "Published",
    isFeatured: false,
    seoTitle: "",
    seoDesc: "",
    canonicalUrl: ""
  });

  // Action feedback
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<CaseStudyItem | null>(null);

  // Auto slug generation
  const handleTitleChange = (val: string) => {
    const slugVal = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && prev.slug !== slugVal && editingCaseStudy ? prev.slug : slugVal,
      seoTitle: prev.seoTitle ? prev.seoTitle : `${val} Case Study | GoodLife`
    }));
  };

  const openAddModal = () => {
    setEditingCaseStudy(null);
    setFormData({
      title: "",
      slug: "",
      client: "",
      industry: "Small Domestic Appliances",
      location: "Pan-India Hubs",
      timeframe: "6 Months",
      shortDescription: "",
      coverImage: COVER_PRESETS[0].url,
      imageAlt: "",
      challenge: "",
      solution: "",
      actionTaken: ["Direct marketplace onboarding across regional fulfillment centers", "Drop-tested packaging engineering preventing transit returns"],
      capabilities: ["Marketplace Management", "Fulfillment & Logistics"],
      metrics: [
        { val: "+42%", lbl: "Revenue Surge" },
        { val: "-68%", lbl: "Transit Breakage" }
      ],
      testimonial: {
        quote: "",
        author: "",
        designation: "",
        company: ""
      },
      status: "Published",
      isFeatured: false,
      seoTitle: "",
      seoDesc: "",
      canonicalUrl: ""
    });
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const openEditModal = (cs: CaseStudyItem) => {
    setEditingCaseStudy(cs);
    setFormData({
      title: cs.title,
      slug: cs.slug,
      client: cs.client,
      industry: cs.industry || cs.category || "Small Domestic Appliances",
      location: cs.location || "Pan-India",
      timeframe: cs.timeframe || "6 Months",
      shortDescription: cs.shortDescription || "",
      coverImage: cs.coverImage || COVER_PRESETS[0].url,
      imageAlt: cs.imageAlt || "",
      challenge: cs.challenge || "",
      solution: cs.solution || "",
      actionTaken: cs.actionTaken && cs.actionTaken.length > 0 ? cs.actionTaken : [""],
      capabilities: cs.capabilities && cs.capabilities.length > 0 ? cs.capabilities : ["Marketplace Management"],
      metrics: cs.metrics && cs.metrics.length > 0 ? cs.metrics : [{ val: "", lbl: "" }],
      testimonial: cs.testimonial || { quote: "", author: "", designation: "", company: "" },
      status: cs.status,
      isFeatured: !!cs.isFeatured,
      seoTitle: cs.seoTitle || `${cs.title} Case Study | GoodLife`,
      seoDesc: cs.seoDesc || cs.shortDescription || "",
      canonicalUrl: cs.canonicalUrl || ""
    });
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.client?.trim()) return;

    // Filter empty action points and metrics
    const cleanActions = (formData.actionTaken || []).filter((a) => a.trim().length > 0);
    const cleanMetrics = (formData.metrics || []).filter((m) => m.val.trim().length > 0 && m.lbl.trim().length > 0);

    const payload: Partial<CaseStudyItem> = {
      ...formData,
      actionTaken: cleanActions.length > 0 ? cleanActions : ["Strategic operations orchestration"],
      metrics: cleanMetrics.length > 0 ? cleanMetrics : [{ val: "+100%", lbl: "Operational Efficiency" }],
      stats: cleanMetrics.length > 0 ? `${cleanMetrics[0].val} ${cleanMetrics[0].lbl}` : "Verified Outcome",
      category: formData.industry,
      shortDescription: formData.shortDescription || ""
    };

    saveCaseStudy(payload, editingCaseStudy?.id);
    setIsModalOpen(false);
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin.replace(":3001", ":3000")}/case-studies/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Metrics Builder helpers
  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { val: "", lbl: "" }]
    }));
  };

  const handleUpdateMetric = (index: number, field: "val" | "lbl", value: string) => {
    const updated = [...(formData.metrics || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, metrics: updated }));
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== index)
    }));
  };

  // Action points helpers
  const handleAddAction = () => {
    setFormData((prev) => ({
      ...prev,
      actionTaken: [...(prev.actionTaken || []), ""]
    }));
  };

  const handleUpdateAction = (index: number, val: string) => {
    const updated = [...(formData.actionTaken || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, actionTaken: updated }));
  };

  const handleRemoveAction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      actionTaken: (prev.actionTaken || []).filter((_, i) => i !== index)
    }));
  };

  // Capabilities toggler
  const handleToggleCapability = (cap: string) => {
    const current = formData.capabilities || [];
    if (current.includes(cap)) {
      setFormData((prev) => ({ ...prev, capabilities: current.filter((c) => c !== cap) }));
    } else {
      setFormData((prev) => ({ ...prev, capabilities: [...current, cap] }));
    }
  };

  // Filtered list
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchSearch =
        cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cs.industry && cs.industry.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = filterStatus === "All" || cs.status === filterStatus;
      const matchIndustry = filterIndustry === "All" || cs.industry === filterIndustry || cs.category === filterIndustry;
      const matchCapability =
        filterCapability === "All" || (cs.capabilities && cs.capabilities.includes(filterCapability));
      const matchFeatured =
        filterFeatured === "All" || (filterFeatured === "Featured" ? !!cs.isFeatured : !cs.isFeatured);

      return matchSearch && matchStatus && matchIndustry && matchCapability && matchFeatured;
    });
  }, [caseStudies, searchTerm, filterStatus, filterIndustry, filterCapability, filterFeatured]);

  // Counters
  const totalCount = caseStudies.length;
  const publishedCount = caseStudies.filter((c) => c.status === "Published").length;
  const draftCount = caseStudies.filter((c) => c.status === "Draft").length;
  const featuredCount = caseStudies.filter((c) => !!c.isFeatured).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Header & Summary Stats */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.4rem 1.6rem",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>Case Studies CMS</h1>
            <span style={{
              background: "#F1F5F9",
              color: "#475569",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "20px"
            }}>
              Scope #2 Hub
            </span>
          </div>
          <p style={{ margin: "0.25rem 0 0", color: "#64748B", fontSize: "0.86rem" }}>
            Showcase GoodLife's client success stories, verified operational metrics, and enterprise outcomes.
          </p>
        </div>

        <button
          onClick={openAddModal}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#2563EB",
            color: "#FFFFFF",
            padding: "0.65rem 1.25rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(37,99,235,0.2)",
            transition: "all 0.15s"
          }}
        >
          <PlusIcon size={16} color="#FFFFFF" />
          Add Case Study
        </button>
      </div>

      {/* Stats Counter Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.3rem", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BriefcaseIcon size={22} color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Case Studies</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A" }}>{totalCount}</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.3rem", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircleIcon size={22} color="#059669" />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Published Live</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#059669" }}>{publishedCount}</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.3rem", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClockIcon size={22} color="#D97706" />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Draft In-Review</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#D97706" }}>{draftCount}</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.3rem", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <StarIcon size={22} color="#D97706" filled />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Featured on Web</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#B45309" }}>{featuredCount}</div>
          </div>
        </div>
      </div>

      {/* 2. Search & Multi-Filters Toolbar */}
      <div style={{
        background: "#FFFFFF",
        padding: "1rem 1.3rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.9rem",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "420px" }}>
          <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
            <SearchIcon size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by title, client OEM, or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 0.85rem 0.55rem 2.4rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "0.86rem",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            style={{
              padding: "0.5rem 0.8rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "0.82rem",
              background: "#F8FAFC",
              color: "#334155",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          {/* Industry Filter */}
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            style={{
              padding: "0.5rem 0.8rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "0.82rem",
              background: "#F8FAFC",
              color: "#334155",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="All">All Industries</option>
            {INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          {/* Capability Filter */}
          <select
            value={filterCapability}
            onChange={(e) => setFilterCapability(e.target.value)}
            style={{
              padding: "0.5rem 0.8rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "0.82rem",
              background: "#F8FAFC",
              color: "#334155",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="All">All Capabilities</option>
            {CAPABILITY_OPTIONS.map((cap) => (
              <option key={cap} value={cap}>{cap}</option>
            ))}
          </select>

          {/* Featured Filter */}
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value as any)}
            style={{
              padding: "0.5rem 0.8rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "0.82rem",
              background: "#F8FAFC",
              color: "#334155",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="All">All Placement</option>
            <option value="Featured">Featured Only</option>
            <option value="Standard">Standard Only</option>
          </select>

          {(searchTerm || filterStatus !== "All" || filterIndustry !== "All" || filterCapability !== "All" || filterFeatured !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("All");
                setFilterIndustry("All");
                setFilterCapability("All");
                setFilterFeatured("All");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
                color: "#64748B",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              <RefreshIcon size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* 3. Case Studies Cards Grid / List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredCaseStudies.length === 0 ? (
          <div style={{
            background: "#FFFFFF",
            padding: "3.5rem 2rem",
            borderRadius: "12px",
            border: "1px dashed #CBD5E1",
            textAlign: "center"
          }}>
            <BriefcaseIcon size={40} color="#94A3B8" />
            <h3 style={{ margin: "0.8rem 0 0.3rem", color: "#334155", fontWeight: 700 }}>No Case Studies Found</h3>
            <p style={{ margin: 0, color: "#64748B", fontSize: "0.88rem" }}>Try adjusting your search terms or filter criteria.</p>
          </div>
        ) : (
          filteredCaseStudies.map((cs) => {
            const isFeatured = !!cs.isFeatured;
            const isPublished = cs.status === "Published";

            return (
              <div
                key={cs.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: isFeatured ? "1.5px solid #FCD34D" : "1px solid #E2E8F0",
                  padding: "1.3rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  boxShadow: isFeatured ? "0 4px 14px rgba(245,158,11,0.06)" : "0 1px 3px rgba(0,0,0,0.02)",
                  position: "relative",
                  transition: "all 0.15s"
                }}
              >
                {/* Top Row: Industry, Featured badge, Client, and Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      padding: "0.22rem 0.6rem",
                      borderRadius: "6px"
                    }}>
                      <BuildingIcon size={12} color="#1D4ED8" />
                      {cs.industry || cs.category || "Appliance OEM"}
                    </span>

                    {cs.location && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "#64748B",
                        fontSize: "0.75rem",
                        fontWeight: 600
                      }}>
                        <MapPinIcon size={12} color="#94A3B8" />
                        {cs.location}
                      </span>
                    )}

                    {cs.timeframe && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "#64748B",
                        fontSize: "0.75rem",
                        fontWeight: 600
                      }}>
                        <ClockIcon size={12} color="#94A3B8" />
                        {cs.timeframe}
                      </span>
                    )}

                    {isFeatured && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        background: "#FEF3C7",
                        color: "#B45309",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "20px",
                        letterSpacing: "0.3px"
                      }}>
                        <StarIcon size={11} color="#B45309" filled /> FEATURED
                      </span>
                    )}

                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: isPublished ? "#ECFDF5" : "#FFFBEB",
                      color: isPublished ? "#047857" : "#B45309",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "20px"
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: isPublished ? "#10B981" : "#F59E0B" }}></span>
                      {cs.status}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {/* Toggle Feature */}
                    <button
                      onClick={() => toggleCaseStudyFeatured(cs.id)}
                      title={isFeatured ? "Unfeature from website spotlight" : "Pin as Featured showcase"}
                      style={{
                        padding: "0.45rem",
                        borderRadius: "7px",
                        border: "1px solid #E2E8F0",
                        background: isFeatured ? "#FEF3C7" : "#FFFFFF",
                        color: isFeatured ? "#B45309" : "#64748B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <StarIcon size={15} color={isFeatured ? "#D97706" : "#94A3B8"} filled={isFeatured} />
                    </button>

                    {/* Toggle Status */}
                    <button
                      onClick={() => toggleCaseStudyStatus(cs.id)}
                      title={isPublished ? "Set to Draft" : "Publish Live"}
                      style={{
                        padding: "0.45rem 0.65rem",
                        borderRadius: "7px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: isPublished ? "#047857" : "#475569",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem"
                      }}
                    >
                      <CheckCircleIcon size={14} color={isPublished ? "#059669" : "#94A3B8"} />
                      {isPublished ? "Live" : "Draft"}
                    </button>

                    {/* Copy Public Link */}
                    <button
                      onClick={() => handleCopyLink(cs.slug)}
                      title="Copy Public Web Link"
                      style={{
                        padding: "0.45rem",
                        borderRadius: "7px",
                        border: "1px solid #E2E8F0",
                        background: copiedSlug === cs.slug ? "#ECFDF5" : "#FFFFFF",
                        color: copiedSlug === cs.slug ? "#059669" : "#64748B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <LinkIcon size={14} />
                    </button>

                    {/* Preview Modal */}
                    <button
                      onClick={() => setPreviewItem(cs)}
                      title="Preview Case Study Card"
                      style={{
                        padding: "0.45rem",
                        borderRadius: "7px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: "#64748B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <EyeIcon size={14} />
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => duplicateCaseStudy(cs.id)}
                      title="Duplicate Case Study"
                      style={{
                        padding: "0.45rem",
                        borderRadius: "7px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: "#64748B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <CopyIcon size={14} />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(cs)}
                      title="Edit Case Study"
                      style={{
                        padding: "0.45rem 0.8rem",
                        borderRadius: "7px",
                        border: "1px solid #2563EB",
                        background: "#2563EB",
                        color: "#FFFFFF",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem"
                      }}
                    >
                      <EditIcon size={13} color="#FFFFFF" /> Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirmId(cs.id)}
                      title="Delete Case Study"
                      style={{
                        padding: "0.45rem",
                        borderRadius: "7px",
                        border: "1px solid #FEE2E2",
                        background: "#FFF1F2",
                        color: "#E11D48",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <TrashIcon size={14} color="#E11D48" />
                    </button>
                  </div>
                </div>

                {/* Middle Content: Title, Client OEM, Description & Metrics Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563EB", marginBottom: "0.2rem" }}>
                      CLIENT: {cs.client}
                    </div>
                    <h3 style={{ fontSize: "1.18rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.4rem 0", lineHeight: 1.35 }}>
                      {cs.title}
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#475569", margin: "0 0 0.75rem 0", lineHeight: 1.5 }}>
                      {cs.shortDescription}
                    </p>

                    {/* Capabilities Tags */}
                    {cs.capabilities && cs.capabilities.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {cs.capabilities.map((cap, i) => (
                          <span
                            key={i}
                            style={{
                              background: "#F8FAFC",
                              color: "#475569",
                              fontSize: "0.73rem",
                              fontWeight: 600,
                              padding: "0.18rem 0.5rem",
                              borderRadius: "5px",
                              border: "1px solid #E2E8F0"
                            }}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Visual Cover Preview Thumbnail */}
                  {cs.coverImage && (
                    <div style={{
                      width: "160px",
                      height: "100px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #E2E8F0",
                      flexShrink: 0,
                      background: "#F1F5F9"
                    }}>
                      <img
                        src={cs.coverImage}
                        alt={cs.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Row: Outcome Metrics Cards */}
                {cs.metrics && cs.metrics.length > 0 && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(170px, 1fr))`,
                    gap: "0.75rem",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid #F1F5F9"
                  }}>
                    {cs.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "#F8FAFC",
                          padding: "0.6rem 0.9rem",
                          borderRadius: "8px",
                          border: "1px solid #E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem"
                        }}
                      >
                        <TrendUpIcon size={16} color="#059669" />
                        <div>
                          <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.1 }}>
                            {m.val}
                          </div>
                          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>
                            {m.lbl}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. 5-Tab Add / Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "880px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "1.2rem 1.6rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8FAFC"
            }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {editingCaseStudy ? "Edit Enterprise Case Study" : "Create New Enterprise Case Study"}
                </h2>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", color: "#64748B" }}>
                  Document operational breakthroughs, verified impact metrics, and OEM client proof points.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.4rem",
                  color: "#94A3B8",
                  cursor: "pointer",
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal 5 Tabs Navigation */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid #E2E8F0",
              background: "#FFFFFF",
              padding: "0 1.2rem",
              gap: "0.4rem",
              overflowX: "auto"
            }}>
              {[
                { id: "basic", label: "1. Basic Info & Client", icon: <BriefcaseIcon size={14} /> },
                { id: "media", label: "2. Cover & Media", icon: <BuildingIcon size={14} /> },
                { id: "challenge_solution", label: "3. Challenge & Solution", icon: <CheckCircleIcon size={14} /> },
                { id: "results", label: "4. Capabilities & Metrics", icon: <TrendUpIcon size={14} /> },
                { id: "seo", label: "5. SEO & Publishing", icon: <AwardIcon size={14} /> }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.75rem 0.95rem",
                    border: "none",
                    borderBottom: activeTab === t.id ? "2.5px solid #2563EB" : "2.5px solid transparent",
                    background: "transparent",
                    color: activeTab === t.id ? "#2563EB" : "#64748B",
                    fontWeight: activeTab === t.id ? 700 : 600,
                    fontSize: "0.84rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSave} style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
              {/* TAB 1: BASIC INFO */}
              {activeTab === "basic" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Case Study Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. From Contract Manufacturer to ₹18 Cr/yr Direct Marketplace Brand"
                      value={formData.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Client / OEM Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Havells OEM Partner / Apex Appliances Ltd."
                        value={formData.client || ""}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.88rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. appliances-oem-marketplace-scale"
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.88rem",
                          outline: "none",
                          fontFamily: "monospace"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Industry Vertical
                      </label>
                      <select
                        value={formData.industry || "Small Domestic Appliances"}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.86rem",
                          outline: "none",
                          background: "#FFFFFF"
                        }}
                      >
                        {INDUSTRY_OPTIONS.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Location / Geography
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi / 8 Regional Hubs"
                        value={formData.location || ""}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.88rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Project Timeframe
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 9 Months / Multi-year"
                        value={formData.timeframe || ""}
                        onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.88rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Executive Summary / Short Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief 2-3 sentence overview highlighting the transformation and final ROI..."
                      value={formData.shortDescription || ""}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.88rem",
                        outline: "none",
                        lineHeight: 1.45
                      }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: COVER & MEDIA */}
              {activeTab === "media" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.coverImage || ""}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.88rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>
                      Select from Curated High-Res Facility Presets:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.75rem" }}>
                      {COVER_PRESETS.map((preset, i) => (
                        <div
                          key={i}
                          onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                          style={{
                            borderRadius: "8px",
                            border: formData.coverImage === preset.url ? "2px solid #2563EB" : "1px solid #E2E8F0",
                            overflow: "hidden",
                            cursor: "pointer",
                            background: "#F8FAFC",
                            transition: "all 0.15s"
                          }}
                        >
                          <img src={preset.url} alt={preset.name} style={{ width: "100%", height: "70px", objectFit: "cover" }} />
                          <div style={{ padding: "0.4rem 0.5rem", fontSize: "0.72rem", fontWeight: 600, color: "#334155", lineHeight: 1.2 }}>
                            {preset.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.coverImage && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Live Preview:</div>
                      <div style={{ height: "200px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                        <img src={formData.coverImage} alt="Cover Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CHALLENGE & SOLUTION */}
              {activeTab === "challenge_solution" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      The Challenge (Pre-GoodLife Bottleneck)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Detail the operational, logistical, or marketplace challenges the client faced..."
                      value={formData.challenge || ""}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.88rem",
                        outline: "none",
                        lineHeight: 1.45
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      The Solution (GoodLife Operational Architecture)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Explain the strategy, warehouse grid, and marketplace interventions deployed..."
                      value={formData.solution || ""}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.88rem",
                        outline: "none",
                        lineHeight: 1.45
                      }}
                    />
                  </div>

                  {/* Action Points Builder */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
                        Key Action Items & Execution Milestones
                      </label>
                      <button
                        type="button"
                        onClick={handleAddAction}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: "#EFF6FF",
                          color: "#2563EB",
                          border: "none",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                      >
                        <PlusIcon size={12} color="#2563EB" /> Add Milestone
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {(formData.actionTaken || []).map((action, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94A3B8", width: "20px" }}>
                            {idx + 1}.
                          </span>
                          <input
                            type="text"
                            placeholder="e.g. Shifted fragile movements to dedicated palletized linehaul networks"
                            value={action}
                            onChange={(e) => handleUpdateAction(idx, e.target.value)}
                            style={{
                              flex: 1,
                              padding: "0.55rem 0.8rem",
                              borderRadius: "7px",
                              border: "1px solid #CBD5E1",
                              fontSize: "0.85rem",
                              outline: "none"
                            }}
                          />
                          {(formData.actionTaken || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAction(idx)}
                              style={{
                                background: "#FFF1F2",
                                border: "1px solid #FEE2E2",
                                color: "#E11D48",
                                borderRadius: "6px",
                                padding: "0.5rem",
                                cursor: "pointer",
                                display: "flex"
                              }}
                            >
                              <TrashIcon size={13} color="#E11D48" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CAPABILITIES & METRIC BUILDER */}
              {activeTab === "results" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                  {/* Capabilities Multi-Selector */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.45rem" }}>
                      Tagged Capabilities & Services
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                      {CAPABILITY_OPTIONS.map((cap) => {
                        const isSelected = (formData.capabilities || []).includes(cap);
                        return (
                          <button
                            key={cap}
                            type="button"
                            onClick={() => handleToggleCapability(cap)}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "20px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              border: isSelected ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                              background: isSelected ? "#EFF6FF" : "#FFFFFF",
                              color: isSelected ? "#1D4ED8" : "#475569",
                              cursor: "pointer",
                              transition: "all 0.15s"
                            }}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {cap}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Outcome Metric Cards Builder */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <div>
                        <label style={{ fontSize: "0.84rem", fontWeight: 700, color: "#0F172A" }}>
                          Measurable Outcome Metrics (Cards Builder)
                        </label>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B" }}>
                          Add high-impact stats displayed prominently on the case study card and public page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddMetric}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: "#059669",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                      >
                        <PlusIcon size={12} color="#FFFFFF" /> Add Metric
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
                      {(formData.metrics || []).map((m, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "#F8FAFC",
                            padding: "0.75rem",
                            borderRadius: "10px",
                            border: "1px solid #E2E8F0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.4rem",
                            position: "relative"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B" }}>METRIC #{idx + 1}</span>
                            {(formData.metrics || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMetric(idx)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#EF4444",
                                  cursor: "pointer",
                                  fontSize: "0.8rem"
                                }}
                              >
                                ✕
                              </button>
                            )}
                          </div>

                          <input
                            type="text"
                            placeholder="Stat Value (e.g. +830%, ₹18.4 Cr, -82%)"
                            value={m.val}
                            onChange={(e) => handleUpdateMetric(idx, "val", e.target.value)}
                            style={{
                              padding: "0.45rem 0.65rem",
                              borderRadius: "6px",
                              border: "1px solid #CBD5E1",
                              fontSize: "0.95rem",
                              fontWeight: 800,
                              color: "#0F172A",
                              outline: "none"
                            }}
                          />

                          <input
                            type="text"
                            placeholder="Metric Description (e.g. GMV Surge in 9 Months)"
                            value={m.lbl}
                            onChange={(e) => handleUpdateMetric(idx, "lbl", e.target.value)}
                            style={{
                              padding: "0.45rem 0.65rem",
                              borderRadius: "6px",
                              border: "1px solid #CBD5E1",
                              fontSize: "0.82rem",
                              color: "#475569",
                              outline: "none"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Testimonial */}
                  <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Client Testimonial Quote
                    </label>
                    <textarea
                      rows={2}
                      placeholder='"Good Life transformed our offline contract factory into a top 3 Amazon appliance brand within 9 months."'
                      value={formData.testimonial?.quote || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          testimonial: { ...(formData.testimonial || { quote: "", author: "", designation: "", company: "" }), quote: e.target.value }
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.55rem 0.8rem",
                        borderRadius: "7px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.85rem",
                        outline: "none",
                        marginBottom: "0.6rem"
                      }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                      <input
                        type="text"
                        placeholder="Author Name (e.g. Rajesh Kulkarni)"
                        value={formData.testimonial?.author || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonial: { ...(formData.testimonial || { quote: "", author: "", designation: "", company: "" }), author: e.target.value }
                          })
                        }
                        style={{
                          padding: "0.45rem 0.7rem",
                          borderRadius: "6px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.82rem",
                          outline: "none"
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Designation (e.g. Managing Director)"
                        value={formData.testimonial?.designation || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonial: { ...(formData.testimonial || { quote: "", author: "", designation: "", company: "" }), designation: e.target.value }
                          })
                        }
                        style={{
                          padding: "0.45rem 0.7rem",
                          borderRadius: "6px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.82rem",
                          outline: "none"
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Company (e.g. Apex Appliances Ltd.)"
                        value={formData.testimonial?.company || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonial: { ...(formData.testimonial || { quote: "", author: "", designation: "", company: "" }), company: e.target.value }
                          })
                        }
                        style={{
                          padding: "0.45rem 0.7rem",
                          borderRadius: "6px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.82rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SEO & PUBLISHING */}
              {activeTab === "seo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Publishing Status
                      </label>
                      <select
                        value={formData.status || "Published"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.86rem",
                          outline: "none",
                          background: "#FFFFFF"
                        }}
                      >
                        <option value="Published">Published (Public on Website)</option>
                        <option value="Draft">Draft (Internal Review Only)</option>
                      </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", marginTop: "1rem" }}>
                        <input
                          type="checkbox"
                          checked={!!formData.isFeatured}
                          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                          style={{ width: "18px", height: "18px", accentColor: "#2563EB" }}
                        />
                        <span style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A" }}>
                          Pin as Featured Case Study on Homepage & Hub
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Meta Title (SEO)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Appliances OEM Marketplace Scale Case Study | GoodLife"
                      value={formData.seoTitle || ""}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.88rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                      Meta Description (SEO)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="140-160 characters summary for Google search snippets..."
                      value={formData.seoDesc || ""}
                      onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.86rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Google SERP Live Simulation */}
                  <div style={{ background: "#F8FAFC", padding: "1.1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Google Search Result Snippet Preview
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#202124" }}>
                      https://goodlife.in › case-studies › {formData.slug || "sample-slug"}
                    </div>
                    <div style={{ fontSize: "1.1rem", color: "#1a0dab", fontWeight: 500, margin: "0.2rem 0" }}>
                      {formData.seoTitle || formData.title || "Enterprise Case Study | GoodLife"}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#4d5156", lineHeight: 1.4 }}>
                      {formData.seoDesc || formData.shortDescription || "Discover how GoodLife helps appliance brands scale across Indian marketplaces with regional warehousing."}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div style={{
                marginTop: "1.8rem",
                paddingTop: "1rem",
                borderTop: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>
                  Author: <strong>{currentUser?.name || "Rajeev Nair"}</strong> ({currentUser?.role || "Super Admin"})
                </div>

                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: "0.6rem 1.1rem",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      background: "#FFFFFF",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: "0.86rem",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "#2563EB",
                      color: "#FFFFFF",
                      padding: "0.6rem 1.3rem",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: 700,
                      fontSize: "0.86rem",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(37,99,235,0.2)"
                    }}
                  >
                    <CheckCircleIcon size={15} color="#FFFFFF" />
                    {editingCaseStudy ? "Save Changes" : "Create Case Study"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            padding: "1.8rem",
            maxWidth: "440px",
            width: "100%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            textAlign: "center"
          }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <TrashIcon size={24} color="#EF4444" />
            </div>

            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
              Delete Case Study?
            </h3>
            <p style={{ margin: "0 0 1.5rem", fontSize: "0.86rem", color: "#64748B", lineHeight: 1.45 }}>
              This will permanently remove the case study and its metrics from both the Admin CMS and the public website. This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: "0.86rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCaseStudy(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#EF4444",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)"
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Preview Modal */}
      {previewItem && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            maxWidth: "680px",
            width: "100%",
            maxHeight: "85vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "1.6rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>
                Public Website Card Preview
              </span>
              <button
                onClick={() => setPreviewItem(null)}
                style={{ background: "transparent", border: "none", fontSize: "1.2rem", color: "#94A3B8", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {previewItem.coverImage && (
              <div style={{ height: "240px", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem" }}>
                <img src={previewItem.coverImage} alt={previewItem.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}

            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2563EB", marginBottom: "0.3rem" }}>
              {previewItem.client} · {previewItem.industry || previewItem.category}
            </div>

            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.6rem" }}>
              {previewItem.title}
            </h2>

            <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5, margin: "0 0 1rem" }}>
              {previewItem.shortDescription}
            </p>

            {previewItem.metrics && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.6rem", marginBottom: "1.2rem" }}>
                {previewItem.metrics.map((m, i) => (
                  <div key={i} style={{ background: "#F1F5F9", padding: "0.6rem 0.8rem", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A" }}>{m.val}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setPreviewItem(null)}
                style={{
                  padding: "0.55rem 1.1rem",
                  borderRadius: "7px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.84rem",
                  cursor: "pointer"
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
