"use client";

import React, { useState, useMemo } from "react";
import { useAdminData, FaqItem } from "@/context/AdminDataContext";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RefreshIcon
} from "@/components/Icons";

const FAQ_CATEGORIES = [
  "General",
  "Launch Online",
  "Fix & Grow",
  "Scale Pan-India",
  "Marketplace",
  "Inventory",
  "Fulfilment",
  "Revenue Assurance",
  "Returns",
  "Heavy & Bulky Commerce",
  "Partnership",
  "Getting Started"
];

export default function FaqsPage() {
  const {
    faqs,
    saveFaq,
    deleteFaq,
    toggleFaqStatus,
    toggleFaqFeatured,
    duplicateFaq,
    currentUser
  } = useAdminData();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft">("All");
  const [filterFeatured, setFilterFeatured] = useState<"All" | "Featured" | "Standard">("All");

  // Accordion Expand State
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0]?.id || null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Data State
  const [formData, setFormData] = useState<Partial<FaqItem>>({
    question: "",
    answer: "",
    category: "General",
    status: "Published",
    orderIndex: 1,
    isFeatured: false
  });

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      category: selectedCategory !== "All" ? selectedCategory : "General",
      status: "Published",
      orderIndex: faqs.length + 1,
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (f: FaqItem) => {
    setEditingFaq(f);
    setFormData({
      question: f.question,
      answer: f.answer,
      category: f.category,
      status: f.status,
      orderIndex: f.orderIndex,
      isFeatured: !!f.isFeatured
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question?.trim() || !formData.answer?.trim()) return;
    saveFaq(formData, editingFaq?.id);
    setIsModalOpen(false);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((f) => {
        const matchSearch =
          f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchCat = selectedCategory === "All" || f.category === selectedCategory;
        const matchStatus = filterStatus === "All" || f.status === filterStatus;
        const matchFeatured =
          filterFeatured === "All" || (filterFeatured === "Featured" ? !!f.isFeatured : !f.isFeatured);

        return matchSearch && matchCat && matchStatus && matchFeatured;
      })
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }, [faqs, searchTerm, selectedCategory, filterStatus, filterFeatured]);

  // Summary Counters
  const totalCount = faqs.length;
  const publishedCount = faqs.filter((f) => f.status === "Published").length;
  const draftCount = faqs.filter((f) => f.status === "Draft").length;
  const featuredCount = faqs.filter((f) => !!f.isFeatured).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Header & Summary Bar */}
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
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              FAQ Management CMS
            </h1>
            <span style={{
              background: "#F1F5F9",
              color: "#475569",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "20px"
            }}>
              Scope #2 Block
            </span>
          </div>
          <p style={{ margin: "0.25rem 0 0", color: "#64748B", fontSize: "0.86rem" }}>
            Manage GoodLife's official business questions, objections resolution, and website diagnostic prompts.
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
          Add New FAQ
        </button>
      </div>

      {/* 2. Stats Counters Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.3rem", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "10px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Questions</div>
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
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Drafts In-Review</div>
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

      {/* 3. Toolbar: Search & Multi-Filters */}
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
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "400px" }}>
          <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
            <SearchIcon size={16} />
          </span>
          <input
            type="text"
            placeholder="Search FAQs by question, answer, or category..."
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
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            <option value="All">All 12 Categories</option>
            {FAQ_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

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

          {(searchTerm || selectedCategory !== "All" || filterStatus !== "All" || filterFeatured !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setFilterStatus("All");
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

      {/* 4. FAQs Accordion List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {filteredFaqs.length === 0 ? (
          <div style={{
            background: "#FFFFFF",
            padding: "3.5rem 2rem",
            borderRadius: "12px",
            border: "1px dashed #CBD5E1",
            textAlign: "center"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h3 style={{ margin: "0.8rem 0 0.3rem", color: "#334155", fontWeight: 700 }}>No FAQs Match Your Criteria</h3>
            <p style={{ margin: 0, color: "#64748B", fontSize: "0.88rem" }}>Try adjusting your search terms or filter selection.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            const isPublished = faq.status === "Published";
            const isFeatured = !!faq.isFeatured;

            return (
              <div
                key={faq.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  border: isFeatured ? "1.5px solid #FCD34D" : isExpanded ? "1px solid #BFDBFE" : "1px solid #E2E8F0",
                  overflow: "hidden",
                  boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.03)" : "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.15s"
                }}
              >
                {/* Header Row */}
                <div style={{
                  padding: "1.1rem 1.3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.8rem",
                  background: isExpanded ? "#F8FAFC" : "#FFFFFF"
                }}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      flex: 1,
                      cursor: "pointer",
                      minWidth: "260px"
                    }}
                  >
                    <span style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      background: "#F1F5F9",
                      color: "#475569",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      #{faq.orderIndex || 1}
                    </span>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{
                          background: "#EFF6FF",
                          color: "#1D4ED8",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.18rem 0.55rem",
                          borderRadius: "5px"
                        }}>
                          {faq.category}
                        </span>

                        {isFeatured && (
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            background: "#FEF3C7",
                            color: "#B45309",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "20px"
                          }}>
                            <StarIcon size={10} color="#B45309" filled /> FEATURED
                          </span>
                        )}

                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: isPublished ? "#ECFDF5" : "#FFFBEB",
                          color: isPublished ? "#047857" : "#B45309",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "20px"
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: isPublished ? "#10B981" : "#F59E0B" }}></span>
                          {faq.status}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0F172A", marginTop: "0.15rem" }}>
                        {faq.question}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {/* Feature Pin Toggle */}
                    <button
                      onClick={() => toggleFaqFeatured(faq.id)}
                      title={isFeatured ? "Unpin from Featured" : "Pin as Featured on Web"}
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

                    {/* Status Toggle */}
                    <button
                      onClick={() => toggleFaqStatus(faq.id)}
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

                    {/* Duplicate */}
                    <button
                      onClick={() => duplicateFaq(faq.id)}
                      title="Duplicate Question"
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
                      onClick={() => openEditModal(faq)}
                      title="Edit Question"
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
                      onClick={() => setDeleteConfirmId(faq.id)}
                      title="Delete Question"
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

                    {/* Accordion Expand/Collapse Caret */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                        padding: "0.45rem",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Answer Body */}
                {isExpanded && (
                  <div style={{
                    padding: "1.2rem 1.4rem",
                    borderTop: "1px solid #F1F5F9",
                    background: "#FFFFFF",
                    fontSize: "0.92rem",
                    color: "#334155",
                    lineHeight: 1.65
                  }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                      GoodLife Answer:
                    </div>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 5. Add / Edit FAQ Modal */}
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
            maxWidth: "680px",
            maxHeight: "90vh",
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
                  {editingFaq ? "Edit Frequently Asked Question" : "Create New FAQ"}
                </h2>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", color: "#64748B" }}>
                  Provide clear, objection-handling answers directing visitors to the Commerce Diagnostic Tool.
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

            {/* Modal Form */}
            <form onSubmit={handleSave} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", overflowY: "auto" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Can Good Life manage marketplace operations?"
                  value={formData.question || ""}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
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

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                  Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide a comprehensive, authoritative answer outlining GoodLife's operational capability..."
                  value={formData.answer || ""}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    fontSize: "0.88rem",
                    outline: "none",
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    Category
                  </label>
                  <select
                    value={formData.category || "General"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    {FAQ_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

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
                    <option value="Published">Published (Live on Website)</option>
                    <option value="Draft">Draft (Internal Review)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "center" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.orderIndex || 1}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 1 })}
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
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", marginTop: "1rem" }}>
                    <input
                      type="checkbox"
                      checked={!!formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      style={{ width: "18px", height: "18px", accentColor: "#2563EB" }}
                    />
                    <span style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A" }}>
                      Pin as Featured FAQ on Homepage
                    </span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{
                marginTop: "1.2rem",
                paddingTop: "1rem",
                borderTop: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>
                  Editor: <strong>{currentUser?.name || "Rajeev Nair"}</strong>
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
                    {editingFaq ? "Save Changes" : "Create FAQ"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
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
            maxWidth: "420px",
            width: "100%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            textAlign: "center"
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <TrashIcon size={22} color="#EF4444" />
            </div>

            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 800, color: "#0F172A" }}>
              Delete FAQ Question?
            </h3>
            <p style={{ margin: "0 0 1.5rem", fontSize: "0.86rem", color: "#64748B", lineHeight: 1.45 }}>
              This will permanently delete the question from the CMS and public website. This action cannot be undone.
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
                  deleteFaq(deleteConfirmId);
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
    </div>
  );
}
