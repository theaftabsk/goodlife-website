"use client";

import React, { useState } from "react";
import { useAdminData, BrandItem } from "@/context/AdminDataContext";
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, CloseIcon, getCategorySvgIcon } from "@/components/Icons";

export default function BrandsPage() {
  const { brands, categories, saveBrand, deleteBrand, toggleBrandStatus } = useAdminData();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Home & Kitchen Appliances",
    websiteUrl: "",
    svgCode: ""
  });

  const openAddModal = () => {
    setEditingBrand(null);
    setFormData({
      name: "",
      slug: "",
      category: categories[0]?.name || "Home & Kitchen Appliances",
      websiteUrl: "",
      svgCode: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: BrandItem) => {
    setEditingBrand(b);
    setFormData({
      name: b.name,
      slug: b.slug,
      category: b.category,
      websiteUrl: b.websiteUrl,
      svgCode: b.svgCode
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    saveBrand(formData, editingBrand?.id);
    setIsModalOpen(false);
  };

  const filtered = brands.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Controls & Filter Bar */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.25rem 1.4rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
              <input
                type="text"
                placeholder="Search 23+ partner brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-control"
                style={{ paddingLeft: "2.2rem", width: "260px" }}
              />
            </div>
            <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
              Showing {filtered.length} of {brands.length} Brands
            </span>
          </div>

          <button onClick={openAddModal} className="btn-primary">
            <PlusIcon size={16} color="#FFFFFF" />
            <span>Add New Brand</span>
          </button>
        </div>

        {/* Category Filter Pills with SVG category icons */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedCategory("ALL")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "6px",
              fontSize: "0.74rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid",
              background: selectedCategory === "ALL" ? "#2563EB" : "#F8FAFC",
              color: selectedCategory === "ALL" ? "#FFFFFF" : "#475569",
              borderColor: selectedCategory === "ALL" ? "#2563EB" : "#E2E8F0"
            }}
          >
            All Categories ({brands.length})
          </button>
          {categories.map((cat) => {
            const count = brands.filter((b) => b.category === cat.name).length;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid",
                  background: isSelected ? "#2563EB" : "#F8FAFC",
                  color: isSelected ? "#FFFFFF" : "#475569",
                  borderColor: isSelected ? "#2563EB" : "#E2E8F0"
                }}
              >
                {getCategorySvgIcon(cat.name, 14, isSelected ? "#FFFFFF" : "#2563EB")}
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.25rem"
      }}>
        {filtered.map((brand) => (
          <div
            key={brand.id}
            className="admin-card"
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: brand.isActive ? 1 : 0.65
            }}
          >
            {/* Top Bar: Category Pill & Active Status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span className="badge badge-blue" style={{ fontSize: "0.68rem", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {brand.category}
              </span>
              <button
                onClick={() => toggleBrandStatus(brand.id)}
                style={{ border: "none", background: "transparent", cursor: "pointer" }}
              >
                <span className={brand.isActive ? "badge badge-green" : "badge badge-slate"}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: brand.isActive ? "#10B981" : "#94A3B8" }} />
                  <span>{brand.isActive ? "Active" : "Hidden"}</span>
                </span>
              </button>
            </div>

            {/* Logo Display */}
            <div style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              marginBottom: "0.9rem"
            }}>
              <div
                dangerouslySetInnerHTML={{ __html: brand.svgCode }}
                style={{ maxHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}
              />
            </div>

            {/* Title & Slug */}
            <div style={{ marginBottom: "1rem" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>
                {brand.name}
              </h4>
              <div style={{ fontSize: "0.74rem", color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>
                slug: /{brand.slug}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: "flex",
              gap: "0.5rem",
              borderTop: "1px solid #F1F5F9",
              paddingTop: "0.75rem"
            }}>
              <button
                onClick={() => openEditModal(brand)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: "center", fontSize: "0.78rem", padding: "0.4rem" }}
              >
                <EditIcon size={14} />
                <span>Edit Brand</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remove ${brand.name}?`)) deleteBrand(brand.id);
                }}
                className="btn-secondary"
                style={{ color: "#DC2626", fontSize: "0.78rem", padding: "0.4rem 0.65rem" }}
              >
                <TrashIcon size={14} color="#DC2626" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Brand Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Add Partner Brand"}
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
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Havells"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Product Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-control"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Brand Website URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://brandwebsite.com"
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
                  placeholder='<svg viewBox="0 0 140 40">...</svg>'
                  value={formData.svgCode}
                  onChange={(e) => setFormData({ ...formData, svgCode: e.target.value })}
                  className="input-control"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
                />
              </div>

              {formData.svgCode && (
                <div style={{
                  padding: "0.75rem",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "0.4rem" }}>
                    SVG Logo Preview
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
                  {editingBrand ? "Save Changes" : "Create Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
