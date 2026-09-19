"use client";

import React, { useState } from "react";
import { useAdminData, RedirectItem } from "@/context/AdminDataContext";
import { RedirectIcon, PlusIcon, TrashIcon, EditIcon, SearchIcon, CloseIcon } from "@/components/Icons";

export default function RedirectsPage() {
  const { redirects, saveRedirect, deleteRedirect } = useAdminData();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<RedirectItem | null>(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    code: 301
  });

  const openAddModal = () => {
    setEditingRedirect(null);
    setFormData({ from: "", to: "", code: 301 });
    setIsModalOpen(true);
  };

  const openEditModal = (r: RedirectItem) => {
    setEditingRedirect(r);
    setFormData({
      from: r.from,
      to: r.to,
      code: r.code
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim()) return;
    saveRedirect(formData, editingRedirect?.id);
    setIsModalOpen(false);
  };

  const filtered = redirects.filter(r =>
    r.from.toLowerCase().includes(search.toLowerCase()) ||
    r.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Action Bar */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.1rem 1.4rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
          <input
            type="text"
            placeholder="Search redirect path rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-control"
            style={{ paddingLeft: "2.2rem", width: "260px" }}
          />
        </div>

        <button onClick={openAddModal} className="btn-primary">
          <PlusIcon size={16} color="#FFFFFF" />
          <span>Add 301 Redirect Rule</span>
        </button>
      </div>

      {/* Redirects Table */}
      <div className="admin-card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontSize: "0.75rem", textTransform: "uppercase" }}>
              <th style={{ padding: "0.9rem 1.25rem" }}>Source Inbound Path</th>
              <th style={{ padding: "0.9rem 1rem" }}>Target Destination URL</th>
              <th style={{ padding: "0.9rem 1rem" }}>HTTP Status</th>
              <th style={{ padding: "0.9rem 1rem" }}>Forwarded Hits</th>
              <th style={{ padding: "0.9rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "1.1rem 1.25rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#DC2626" }}>
                  {r.from}
                </td>

                <td style={{ padding: "1.1rem 1rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#16A34A" }}>
                  → {r.to}
                </td>

                <td style={{ padding: "1.1rem 1rem" }}>
                  <span className="badge badge-blue">
                    {r.code} Permanent
                  </span>
                </td>

                <td style={{ padding: "1.1rem 1rem" }}>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>{r.clicks}</span> clicks
                </td>

                <td style={{ padding: "1.1rem 1.25rem", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button
                      onClick={() => openEditModal(r)}
                      className="btn-secondary"
                      style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
                    >
                      <EditIcon size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove redirect "${r.from}"?`)) deleteRedirect(r.id);
                      }}
                      className="btn-secondary"
                      style={{ color: "#DC2626", fontSize: "0.78rem", padding: "0.35rem 0.6rem" }}
                    >
                      <TrashIcon size={13} color="#DC2626" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                {editingRedirect ? "Edit Redirect Rule" : "Create 301 Permanent Redirect"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94A3B8" }}
              >
                <CloseIcon size={16} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Source Path (From) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/old-services-page"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="input-control"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Target Destination Path (To) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/capabilities/marketplace-operations"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="input-control"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                  Redirect Type
                </label>
                <select
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: Number(e.target.value) })}
                  className="input-control"
                >
                  <option value={301}>301 - Moved Permanently (SEO Recommended)</option>
                  <option value={302}>302 - Temporary Redirect</option>
                  <option value={307}>307 - Temporary Redirect (Preserve Method)</option>
                  <option value={308}>308 - Permanent Redirect (Preserve Method)</option>
                </select>
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
                  {editingRedirect ? "Update Rule" : "Create Redirect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
