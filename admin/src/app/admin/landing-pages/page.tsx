"use client";

import React from "react";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import {
  LandingPageIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ExternalLinkIcon
} from "@/components/Icons";

export default function LandingPagesPage() {
  const { landingPages, deleteLandingPage, toggleLandingPageStatus } = useAdminData();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Scope Disclaimer Banner */}
      <div className="admin-card" style={{ padding: "1.2rem 1.5rem", background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <LandingPageIcon size={18} color="#2563EB" />
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1E40AF" }}>
            Visual Landing Page Management (Confirmed Scope Item #5)
          </span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "#3B82F6", margin: 0, lineHeight: 1.45 }}>
          Assemble custom landing pages using Good Life&apos;s modular sections (Hero, Features, Stats, FAQ, Gallery, and Contact Form). Click <strong>&quot;Open Full-Screen Studio&quot;</strong> to reorder sections with drag &amp; drop, customize text, and preview the live page in full-screen.
        </p>
      </div>

      {/* Action Bar */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.1rem 1.4rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>
            Active Campaign Landing Pages
          </span>
          <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
            {landingPages.length} Modular Pages Connected to Database
          </div>
        </div>

        <Link
          href="/admin/landing-pages/builder?id=new"
          className="btn-primary"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
        >
          <PlusIcon size={16} color="#FFFFFF" />
          <span>Assemble New Page (Full Studio)</span>
        </Link>
      </div>

      {/* Landing Pages List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {landingPages.map((lp) => (
          <div
            key={lp.id}
            className="admin-card"
            style={{
              padding: "1.4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.35rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {lp.title}
                </h4>
                <button
                  onClick={() => toggleLandingPageStatus(lp.id)}
                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                  title="Click to toggle status"
                >
                  <span className={lp.status === "Active" ? "badge badge-green" : "badge badge-slate"}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: lp.status === "Active" ? "#10B981" : "#94A3B8" }} />
                    <span>{lp.status}</span>
                  </span>
                </button>
              </div>

              <div style={{ fontSize: "0.78rem", color: "#2563EB", fontFamily: "'JetBrains Mono', monospace", marginBottom: "0.6rem" }}>
                Live URL: http://localhost:3000/landing/{lp.slug}
              </div>

              {/* Sections Included in Order */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>
                  Ordered Sections ({lp.sections.length}):
                </span>
                {lp.sections.map((sec, idx) => (
                  <span key={idx} className="badge badge-blue" style={{ fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ opacity: 0.6, fontSize: "0.65rem" }}>#{idx + 1}</span>
                    <span>{sec}</span>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <a
                href={`http://localhost:3000/landing/${lp.slug}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <span>View Live</span>
                <ExternalLinkIcon size={13} />
              </a>

              <Link
                href={`/admin/landing-pages/builder?id=${lp.id}`}
                className="btn-primary"
                style={{ fontSize: "0.8rem", padding: "0.45rem 0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <EditIcon size={14} color="#FFFFFF" />
                <span>Open Full-Screen Studio ↗</span>
              </Link>

              <button
                onClick={() => {
                  if (confirm(`Delete landing page "${lp.title}" from database?`)) deleteLandingPage(lp.id);
                }}
                className="btn-secondary"
                style={{ color: "#DC2626", fontSize: "0.8rem", padding: "0.45rem 0.75rem" }}
                title="Delete page"
              >
                <TrashIcon size={14} color="#DC2626" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
