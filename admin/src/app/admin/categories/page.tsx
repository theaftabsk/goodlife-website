"use client";

import React, { useState } from "react";
import { useAdminData, CategoryItem } from "@/context/AdminDataContext";
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, CloseIcon, BrandIcon, getCategorySvgIcon } from "@/components/Icons";

export default function CategoriesPage() {
  const { categories, brands, saveCategory, deleteCategory, toggleCategoryStatus } = useAdminData();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "box",
    description: "",
    subcategories: ""
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", icon: "box", description: "", subcategories: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      description: cat.description,
      subcategories: cat.subcategories.join(", ")
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    const subcats = formData.subcategories.split(",").map((s) => s.trim()).filter(Boolean);
    saveCategory({
      name: formData.name,
      slug: formData.slug,
      icon: formData.icon,
      description: formData.description,
      subcategories: subcats
    }, editingCategory?.id);
    setIsModalOpen(false);
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Action Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        background: "#FFFFFF",
        padding: "1.1rem 1.4rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
            <input
              type="text"
              placeholder="Search appliance categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-control"
              style={{ paddingLeft: "2.2rem", width: "260px" }}
            />
          </div>
          <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
            {categories.length} Operational Lines
          </span>
        </div>

        <button onClick={openAddModal} className="btn-primary">
          <PlusIcon size={16} color="#FFFFFF" />
          <span>Add Product Category</span>
        </button>
      </div>

      {/* Categories Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
        gap: "1.25rem"
      }}>
        {filtered.map((cat) => {
          const brandCount = brands.filter((b) => b.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="admin-card"
              style={{
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                {/* Header: Pure SVG Icon, Name & Status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #DBEAFE"
                    }}>
                      {getCategorySvgIcon(cat.name, 24, "#2563EB")}
                    </span>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A" }}>
                        {cat.name}
                      </h4>
                      <div style={{ fontSize: "0.72rem", color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>
                        /{cat.slug}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCategoryStatus(cat.id)}
                    style={{ border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    <span className={cat.isActive ? "badge badge-green" : "badge badge-slate"}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cat.isActive ? "#10B981" : "#94A3B8" }} />
                      <span>{cat.isActive ? "Active" : "Inactive"}</span>
                    </span>
                  </button>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.45, marginBottom: "1rem" }}>
                  {cat.description}
                </p>

                {/* Subcategories tags */}
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Subcategories &amp; SKUs ({cat.subcategories.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {cat.subcategories.map((sub, idx) => (
                      <span key={idx} className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer row: Brands attached & Actions */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #F1F5F9",
                paddingTop: "0.85rem",
                marginTop: "0.5rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", fontWeight: 700, color: "#2563EB" }}>
                  <BrandIcon size={14} color="#2563EB" />
                  <span>{brandCount} Partner Brands</span>
                </div>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    onClick={() => openEditModal(cat)}
                    className="btn-secondary"
                    style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
                  >
                    <EditIcon size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete category "${cat.name}"?`)) deleteCategory(cat.id);
                    }}
                    className="btn-secondary"
                    style={{ color: "#DC2626", fontSize: "0.78rem", padding: "0.35rem 0.6rem" }}
                  >
                    <TrashIcon size={13} color="#DC2626" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                {editingCategory ? `Edit Category: ${editingCategory.name}` : "Add Category"}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chimney"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Appliance specifications and placement details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Auto-Clean Chimney, Filterless Suction, Island Chimney"
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  className="input-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
