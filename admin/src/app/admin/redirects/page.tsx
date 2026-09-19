"use client";

import React, { useState } from "react";
import { useAdminData, RedirectItem } from "@/context/AdminDataContext";
import {
  RedirectIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  SearchIcon,
  CloseIcon,
  LightningIcon,
  CheckIcon,
  ExternalLinkIcon,
} from "@/components/Icons";

export default function RedirectsPage() {
  const { redirects, saveRedirect, deleteRedirect, showToast } = useAdminData();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<RedirectItem | null>(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    code: 301,
  });
  const [testingId, setTestingId] = useState<string | null>(null);

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
      code: r.code || 301,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim()) return;
    await saveRedirect(formData, editingRedirect?.id);
    setIsModalOpen(false);
  };

  const handleTestRedirect = async (r: RedirectItem) => {
    setTestingId(r.id);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/redirects/resolve?path=${encodeURIComponent(r.from)}`);
      const data = await res.json();
      if (data.matched) {
        showToast(`Verified! "${r.from}" successfully redirects to "${data.to}" (${data.code})`);
      } else {
        showToast(`Rule for "${r.from}" not resolved.`);
      }
    } catch (_) {
      showToast("Verification check failed.");
    } finally {
      setTestingId(null);
    }
  };

  const filtered = redirects.filter(
    (r) =>
      r.from.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase())
  );

  const totalHits = redirects.reduce((sum, r) => sum + (r.clicks || 0), 0);
  const permCount = redirects.filter((r) => r.code === 301 || r.code === 308).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Overview Banner */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "1.25rem 1.5rem",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <RedirectIcon size={20} color="#2563EB" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              URL Redirects &amp; Canonical SEO Routing
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
              Permanent 301 &amp; temporary 302 routing rules executed at the Next.js edge and backed by PostgreSQL database.
            </p>
          </div>
        </div>

        <button onClick={openAddModal} className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          <PlusIcon size={16} color="#FFFFFF" />
          <span>Add 301 Redirect Rule</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Active Rules</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginTop: "0.2rem" }}>{redirects.length}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Stored in PostgreSQL</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>Total Forwarded Hits</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#16A34A", marginTop: "0.2rem" }}>{totalHits}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Tracked click traffic</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>301 Permanent Rules</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2563EB", marginTop: "0.2rem" }}>{permCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>SEO PageRank preserved</div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "1rem 1.25rem",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
          <input
            type="text"
            placeholder="Search redirect path rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-control"
            style={{ paddingLeft: "2.2rem", width: "280px" }}
          />
        </div>
        <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
          Showing {filtered.length} of {redirects.length} active routing rule{redirects.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Redirects Table */}
      <div className="admin-card" style={{ overflow: "hidden" }}>
        {redirects.length === 0 ? (
          <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#94A3B8" }}>
            No redirect rules found in database. Click &quot;Add 301 Redirect Rule&quot; to create one.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontSize: "0.74rem", textTransform: "uppercase" }}>
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
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        background: r.code === 301 ? "#EFF6FF" : "#FEF3C7",
                        color: r.code === 301 ? "#1D4ED8" : "#92400E",
                        border: r.code === 301 ? "1px solid #BFDBFE" : "1px solid #FDE68A",
                      }}
                    >
                      {r.code} {r.code === 301 ? "Permanent" : "Temporary"}
                    </span>
                  </td>

                  <td style={{ padding: "1.1rem 1rem" }}>
                    <span style={{ fontWeight: 800, color: "#0F172A" }}>{r.clicks || 0}</span>{" "}
                    <span style={{ fontSize: "0.74rem", color: "#64748B" }}>hits</span>
                  </td>

                  <td style={{ padding: "1.1rem 1.25rem", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.45rem" }}>
                      <button
                        type="button"
                        onClick={() => handleTestRedirect(r)}
                        disabled={testingId === r.id}
                        className="btn-secondary"
                        style={{ fontSize: "0.74rem", padding: "0.3rem 0.65rem" }}
                        title="Test whether redirect resolves correctly"
                      >
                        <LightningIcon size={12} color="#2563EB" />
                        <span>{testingId === r.id ? "Checking..." : "Verify"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(r)}
                        className="btn-secondary"
                        style={{ fontSize: "0.74rem", padding: "0.3rem 0.65rem" }}
                      >
                        <EditIcon size={12} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete redirect rule "${r.from}"?`)) deleteRedirect(r.id);
                        }}
                        className="btn-secondary"
                        style={{ color: "#DC2626", fontSize: "0.74rem", padding: "0.3rem 0.55rem" }}
                      >
                        <TrashIcon size={12} color="#DC2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
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
                  {editingRedirect ? "Update Rule in DB" : "Save Rule to PostgreSQL"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
