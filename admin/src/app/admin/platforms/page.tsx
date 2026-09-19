"use client";

import React, { useState } from "react";
import { useAdminData, PlatformItem, ChannelCategory } from "@/context/AdminDataContext";
import { PlusIcon, EditIcon, TrashIcon, ExternalLinkIcon, SearchIcon, CloseIcon } from "@/components/Icons";

const CHANNEL_CATEGORIES: ChannelCategory[] = [
  "General Marketplaces",
  "B2B Wholesale",
  "Quick-Commerce",
  "D2C Direct Storefronts"
];

export default function PlatformsPage() {
  const { platforms, savePlatform, deletePlatform, togglePlatformStatus } = useAdminData();

  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [filterChannel, setFilterChannel] = useState<"ALL" | ChannelCategory>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<PlatformItem | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    websiteUrl: string;
    svgCode: string;
    channelType: ChannelCategory;
  }>({
    name: "",
    slug: "",
    websiteUrl: "",
    svgCode: "",
    channelType: "General Marketplaces"
  });

  const openAddModal = () => {
    setEditingPlatform(null);
    setFormData({
      name: "",
      slug: "",
      websiteUrl: "",
      svgCode: "",
      channelType: "General Marketplaces"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: PlatformItem) => {
    setEditingPlatform(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      websiteUrl: p.websiteUrl,
      svgCode: p.svgCode,
      channelType: p.channelType || "General Marketplaces"
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    savePlatform(formData, editingPlatform?.id);
    setIsModalOpen(false);
  };

  const filtered = platforms.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesActive = filterActive === "ALL" || (filterActive === "ACTIVE" ? p.isActive : !p.isActive);
    const matchesChannel = filterChannel === "ALL" || (p.channelType === filterChannel);
    return matchesSearch && matchesActive && matchesChannel;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Action Bar & Channel Segment Filters */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.2rem 1.4rem",
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* Search with SVG */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
              <input
                type="text"
                placeholder="Filter platforms by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-control"
                style={{ paddingLeft: "2.2rem", width: "240px" }}
              />
            </div>

            {/* Status filter pills */}
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {(["ALL", "ACTIVE", "INACTIVE"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterActive(status)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    background: filterActive === status ? "#2563EB" : "#F8FAFC",
                    color: filterActive === status ? "#FFFFFF" : "#475569",
                    borderColor: filterActive === status ? "#2563EB" : "#E2E8F0"
                  }}
                >
                  {status === "ALL" ? `All (${platforms.length})` : status === "ACTIVE" ? `Active (${platforms.filter(p => p.isActive).length})` : `Inactive (${platforms.filter(p => !p.isActive).length})`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="/api/platforms/distribution"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.75rem",
                color: "#059669",
                background: "#ECFDF5",
                border: "1px solid #A7F3D0",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <span>● Live API: /api/platforms/distribution</span>
              <ExternalLinkIcon size={12} color="#059669" />
            </a>

            <button onClick={openAddModal} className="btn-primary">
              <PlusIcon size={16} color="#FFFFFF" />
              <span>Add New Platform</span>
            </button>
          </div>
        </div>

        {/* Channel Segment Filter Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          paddingTop: "0.75rem",
          borderTop: "1px solid #F1F5F9"
        }}>
          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Filter By Segment:
          </span>
          <button
            onClick={() => setFilterChannel("ALL")}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "1px solid",
              background: filterChannel === "ALL" ? "#0F172A" : "#F8FAFC",
              color: filterChannel === "ALL" ? "#FFFFFF" : "#475569",
              borderColor: filterChannel === "ALL" ? "#0F172A" : "#E2E8F0"
            }}
          >
            All Channels ({platforms.length})
          </button>
          {CHANNEL_CATEGORIES.map(cat => {
            const count = platforms.filter(p => p.channelType === cat).length;
            const isSelected = filterChannel === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterChannel(cat)}
                style={{
                  padding: "0.3rem 0.7rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid",
                  background: isSelected ? "#2563EB" : "#F8FAFC",
                  color: isSelected ? "#FFFFFF" : "#475569",
                  borderColor: isSelected ? "#2563EB" : "#E2E8F0"
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Platform Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.25rem"
      }}>
        {filtered.map((platform) => (
          <div
            key={platform.id}
            className="admin-card"
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: platform.isActive ? 1 : 0.65
            }}
          >
            {/* Top row: Status pill & Order */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>
                SLOT #{platform.orderIndex}
              </span>
              <button
                onClick={() => togglePlatformStatus(platform.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                <span className={platform.isActive ? "badge badge-green" : "badge badge-slate"}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: platform.isActive ? "#10B981" : "#94A3B8" }} />
                  <span>{platform.isActive ? "Active Live" : "Inactive"}</span>
                </span>
              </button>
            </div>

            {/* SVG Logo Preview Area */}
            <div style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              height: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem",
              marginBottom: "1rem"
            }}>
              <div
                dangerouslySetInnerHTML={{ __html: platform.svgCode }}
                style={{ maxHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
              />
            </div>

            {/* Info */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {platform.name}
                </h4>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    background:
                      platform.channelType === "B2B Wholesale"
                        ? "#FEF3C7"
                        : platform.channelType === "Quick-Commerce"
                        ? "#D1FAE5"
                        : platform.channelType === "D2C Direct Storefronts"
                        ? "#EDE9FE"
                        : "#DBEAFE",
                    color:
                      platform.channelType === "B2B Wholesale"
                        ? "#92400E"
                        : platform.channelType === "Quick-Commerce"
                        ? "#065F46"
                        : platform.channelType === "D2C Direct Storefronts"
                        ? "#5B21B6"
                        : "#1E40AF"
                  }}
                >
                  {platform.channelType || "General Marketplaces"}
                </span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#64748B", fontFamily: "'JetBrains Mono', monospace", marginTop: "0.3rem" }}>
                slug: /{platform.slug}
              </div>
              {platform.websiteUrl && (
                <a
                  href={platform.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.76rem",
                    color: "#2563EB",
                    marginTop: "0.3rem",
                    textDecoration: "none"
                  }}
                >
                  <span>{platform.websiteUrl}</span>
                  <ExternalLinkIcon size={12} color="#2563EB" />
                </a>
              )}
            </div>

            {/* Card Actions with SVG Icons */}
            <div style={{
              display: "flex",
              gap: "0.5rem",
              borderTop: "1px solid #F1F5F9",
              paddingTop: "0.75rem"
            }}>
              <button
                onClick={() => openEditModal(platform)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "0.45rem" }}
              >
                <EditIcon size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remove ${platform.name}?`)) deletePlatform(platform.id);
                }}
                className="btn-secondary"
                style={{ color: "#DC2626", fontSize: "0.8rem", padding: "0.45rem 0.75rem" }}
              >
                <TrashIcon size={14} color="#DC2626" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Platform Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                {editingPlatform ? `Edit Platform: ${editingPlatform.name}` : "Add New Platform"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94A3B8" }}
              >
                <CloseIcon size={18} color="#94A3B8" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Platform Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon India"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Channel Operating Segment *
                </label>
                <select
                  value={formData.channelType}
                  onChange={(e) => setFormData({ ...formData, channelType: e.target.value as ChannelCategory })}
                  className="input-control"
                  style={{ background: "#FFFFFF", cursor: "pointer" }}
                >
                  {CHANNEL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. amazon"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Official Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.amazon.in"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  SVG Vector Logo Code
                </label>
                <textarea
                  rows={4}
                  placeholder='<svg viewBox="0 0 150 40">...</svg>'
                  value={formData.svgCode}
                  onChange={(e) => setFormData({ ...formData, svgCode: e.target.value })}
                  className="input-control"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
                />
              </div>

              {/* Live SVG Preview inside modal */}
              {formData.svgCode && (
                <div style={{
                  padding: "0.75rem",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "0.4rem" }}>
                    SVG Live Preview
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: formData.svgCode }}
                    style={{ height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  />
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingPlatform ? "Update Platform" : "Add Platform"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
