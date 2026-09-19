"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { MediaIcon, PlusIcon, SearchIcon, CheckIcon } from "@/components/Icons";

export default function MediaPage() {
  const { platforms, brands, showToast } = useAdminData();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PLATFORMS" | "BRANDS">("ALL");

  const copySvg = (svg: string, name: string) => {
    navigator.clipboard.writeText(svg);
    showToast(`Copied ${name} SVG to clipboard!`);
  };

  const platformItems = platforms.map(p => ({
    id: p.id,
    name: p.name,
    type: "Platform SVG Vector",
    category: "Marketplace Channel",
    svg: p.svgCode
  }));

  const brandItems = brands.map(b => ({
    id: b.id,
    name: b.name,
    type: "Brand Partner SVG Vector",
    category: b.category,
    svg: b.svgCode
  }));

  const allAssets = activeFilter === "PLATFORMS" ? platformItems : activeFilter === "BRANDS" ? brandItems : [...platformItems, ...brandItems];

  const filtered = allAssets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Controls */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
            <input
              type="text"
              placeholder="Search vector assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-control"
              style={{ paddingLeft: "2.2rem", width: "240px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.35rem" }}>
            {(["ALL", "PLATFORMS", "BRANDS"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid",
                  background: activeFilter === filter ? "#2563EB" : "#F8FAFC",
                  color: activeFilter === filter ? "#FFFFFF" : "#475569",
                  borderColor: activeFilter === filter ? "#2563EB" : "#E2E8F0"
                }}
              >
                {filter === "ALL" ? `All Assets (${platformItems.length + brandItems.length})` : filter === "PLATFORMS" ? `Platforms (${platformItems.length})` : `Brands (${brandItems.length})`}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => showToast("Asset uploader ready")} className="btn-primary">
          <PlusIcon size={16} color="#FFFFFF" />
          <span>Upload Vector Asset</span>
        </button>
      </div>

      {/* Asset Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.25rem"
      }}>
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="admin-card"
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-slate" style={{ fontSize: "0.68rem" }}>
                  {asset.type}
                </span>
                <MediaIcon size={16} color="#64748B" />
              </div>

              {/* Preview Box */}
              <div style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.75rem",
                marginBottom: "0.9rem"
              }}>
                <div
                  dangerouslySetInnerHTML={{ __html: asset.svg }}
                  style={{ maxHeight: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
                />
              </div>

              <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>
                {asset.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.15rem" }}>
                {asset.category}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "0.75rem", marginTop: "1rem" }}>
              <button
                onClick={() => copySvg(asset.svg, asset.name)}
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.78rem" }}
              >
                <span>Copy SVG Vector</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
