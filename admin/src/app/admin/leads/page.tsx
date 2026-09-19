"use client";

import React, { useState } from "react";
import { useAdminData, LeadItem } from "@/context/AdminDataContext";
import {
  DownloadIcon,
  SearchIcon,
  TrashIcon,
  PhoneIcon,
  MailIcon,
  ExternalLinkIcon,
  LeadIcon,
  EyeIcon,
  CloseIcon,
  BuildingIcon,
  ShieldCheckIcon,
  CheckIcon,
  LightningIcon
} from "@/components/Icons";

export default function LeadsPage() {
  const { leads, deleteLead, showToast } = useAdminData();
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter leads based on real data only
  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (l.company || "").toLowerCase().includes(q) ||
      (l.contact || "").toLowerCase().includes(q) ||
      (l.email || "").toLowerCase().includes(q) ||
      (l.mobile || "").toLowerCase().includes(q) ||
      (l.category || "").toLowerCase().includes(q) ||
      (l.source || "").toLowerCase().includes(q);

    const s = (l.source || "").toLowerCase();
    const matchesSource =
      sourceFilter === "ALL" ||
      (sourceFilter === "Diwali" && s.includes("diwali")) ||
      (sourceFilter === "OEM" && s.includes("oem")) ||
      (sourceFilter === "Diagnostic" && (s.includes("diagnostic") || s.includes("modal"))) ||
      (sourceFilter === "Contact" && s.includes("contact"));

    return matchesSearch && matchesSource;
  });

  // Calculate Real-Time Metrics from PostgreSQL Database
  const totalLeads = leads.length;
  const diagnosticCount = leads.filter(l => {
    const s = (l.source || "").toLowerCase();
    return s.includes("diagnostic") || s.includes("modal");
  }).length;
  const landingPageCount = leads.filter(l => {
    const s = (l.source || "").toLowerCase();
    return s.includes("landing") || s.includes("diwali") || s.includes("oem");
  }).length;
  const directCount = leads.filter(l => {
    const s = (l.source || "").toLowerCase();
    return s.includes("contact") || (!s.includes("diagnostic") && !s.includes("landing") && !s.includes("modal"));
  }).length;

  const exportCSV = () => {
    const headers = "ID,Company Name,Contact Person,WhatsApp Number,Business Email,Category,Lead Source,Submission Date,Status\n";
    const rows = filtered.map(l => {
      return `"${l.id}","${(l.company || "").replace(/"/g, '""')}","${(l.contact || "").replace(/"/g, '""')}","${l.mobile || ""}","${l.email || ""}","${l.category || ""}","${(l.source || "Website Form").replace(/"/g, '""')}","${l.date || ""}","New Inbound"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goodlife-leads-real-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast("Real leads exported to Excel/CSV successfully!");
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteLead(deleteConfirmId);
      if (selectedLead?.id === deleteConfirmId) {
        setSelectedLead(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const getSourceBadge = (sourceStr: string = "") => {
    const s = sourceStr.toLowerCase();
    if (s.includes("diwali")) {
      return {
        label: "Landing Page: Diwali Appliance Surge",
        bg: "#FFF1F2",
        color: "#BE123C",
        border: "#FECDD3",
        icon: "⚡"
      };
    }
    if (s.includes("oem")) {
      return {
        label: "Landing Page: OEM B2B Procurement",
        bg: "#FAF5FF",
        color: "#7C3AED",
        border: "#E9D5FF",
        icon: "🏭"
      };
    }
    if (s.includes("diagnostic") || s.includes("modal")) {
      return {
        label: "Diagnostic Tool (Popup Modal)",
        bg: "#EFF6FF",
        color: "#1D4ED8",
        border: "#BFDBFE",
        icon: "🩺"
      };
    }
    if (s.includes("contact")) {
      return {
        label: "Contact Us Page Form",
        bg: "#F0FDF4",
        color: "#15803D",
        border: "#BBF7D0",
        icon: "✉️"
      };
    }
    return {
      label: sourceStr || "Direct Website Form",
      bg: "#F8FAFC",
      color: "#334155",
      border: "#E2E8F0",
      icon: "🌐"
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "3rem" }}>
      
      {/* ── TOP HEADER BAR ── */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.25rem 1.5rem",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.25rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <LeadIcon size={20} color="#2563EB" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              Live Inbound Leads &amp; Diagnostic Requests
            </h2>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
            Real-time submissions from website visitors, diagnostic modal audits, and campaign landing pages.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={exportCSV}
            className="btn-primary"
            style={{
              fontSize: "0.84rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.25rem"
            }}
            title="Download verified leads formatted for Microsoft Excel"
          >
            <DownloadIcon size={16} color="#FFFFFF" />
            <span>Export to Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* ── REAL METRICS BAR (4 High-Contrast Crisp Cards) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Real Leads</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0F172A", marginTop: "0.25rem" }}>{totalLeads}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Live database submissions</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>From Diagnostic Modal</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#2563EB", marginTop: "0.25rem" }}>{diagnosticCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Direct popup audit requests</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>Campaign Landing Pages</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#7C3AED", marginTop: "0.25rem" }}>{landingPageCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Diwali &amp; OEM B2B landing pages</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>Contact Page Inquiries</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#16A34A", marginTop: "0.25rem" }}>{directCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Direct contact form leads</div>
        </div>
      </div>

      {/* ── FILTER & SEARCH STRIP ── */}
      <div style={{
        background: "#FFFFFF",
        padding: "0.9rem 1.25rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", flex: 1 }}>
          <div style={{ position: "relative", minWidth: "300px" }}>
            <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by company, contact person, phone, email, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-control"
              style={{ paddingLeft: "2.3rem", width: "100%", fontSize: "0.85rem" }}
            />
          </div>

          {/* Source Filter Pills */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {[
              { id: "ALL", label: "All Sources" },
              { id: "Diagnostic", label: "Diagnostic Modal" },
              { id: "Diwali", label: "Diwali Landing Page" },
              { id: "OEM", label: "OEM B2B Landing Page" },
              { id: "Contact", label: "Contact Us Form" }
            ].map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSourceFilter(pill.id)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  border: sourceFilter === pill.id ? "1px solid #2563EB" : "1px solid #E2E8F0",
                  background: sourceFilter === pill.id ? "#EFF6FF" : "#FFFFFF",
                  color: sourceFilter === pill.id ? "#1D4ED8" : "#475569",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
          Showing {filtered.length} of {leads.length} real leads
        </span>
      </div>

      {/* ── ENTERPRISE LEADS TABLE ── */}
      <div style={{
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        borderRadius: "14px",
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{
                background: "#F8FAFC",
                borderBottom: "1.5px solid #E2E8F0",
                color: "#475569",
                fontSize: "0.74rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 800
              }}>
                <th style={{ padding: "0.95rem 1.25rem", whiteSpace: "nowrap" }}>Date &amp; ID</th>
                <th style={{ padding: "0.95rem 1.25rem" }}>Company &amp; Category</th>
                <th style={{ padding: "0.95rem 1.25rem" }}>Contact Executive</th>
                <th style={{ padding: "0.95rem 1.25rem", whiteSpace: "nowrap" }}>Phone &amp; Direct WhatsApp</th>
                <th style={{ padding: "0.95rem 1.25rem" }}>Lead Source &amp; Origin</th>
                <th style={{ padding: "0.95rem 1.25rem", textAlign: "center", width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "3.5rem", textAlign: "center", color: "#64748B" }}>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.25rem" }}>
                      No leads found
                    </div>
                    <div style={{ fontSize: "0.82rem" }}>
                      {search ? "No leads matched your search criteria." : "Real submissions from website visitors will appear here automatically."}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((lead, idx) => {
                  const cleanPhone = (lead.mobile || "").replace(/[^0-9]/g, "");
                  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}` : null;
                  const sourceInfo = getSourceBadge(lead.source);

                  return (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        transition: "background 0.15s ease",
                        cursor: "pointer"
                      }}
                      onClick={() => setSelectedLead(lead)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                    >
                      {/* Serial No & Date */}
                      <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "6px",
                            background: "#F1F5F9",
                            color: "#475569",
                            fontSize: "0.74rem",
                            fontWeight: 800,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                            {lead.date || "Today"}
                          </span>
                        </div>
                      </td>

                      {/* Company Name & Category Pill */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>
                          {lead.company}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
                          <span style={{
                            fontSize: "0.72rem",
                            color: "#2563EB",
                            background: "#EFF6FF",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "4px",
                            fontWeight: 700,
                            border: "1px solid #BFDBFE"
                          }}>
                            {lead.category || "General Inquiry"}
                          </span>
                        </div>
                      </td>

                      {/* Contact Person Name & Email */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ fontWeight: 700, color: "#334155" }}>
                          {lead.contact}
                        </div>
                        <div style={{ marginTop: "0.15rem" }}>
                          <a
                            href={`mailto:${lead.email}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: "#64748B", textDecoration: "none", fontSize: "0.78rem" }}
                          >
                            {lead.email}
                          </a>
                        </div>
                      </td>

                      {/* WhatsApp Number */}
                      <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <span style={{ fontWeight: 700, color: "#0F172A", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.84rem" }}>
                            {lead.mobile}
                          </span>
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#ECFDF5",
                                color: "#059669",
                                border: "1px solid #A7F3D0",
                                borderRadius: "6px",
                                padding: "0.22rem 0.55rem",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                textDecoration: "none",
                                gap: "0.25rem"
                              }}
                              title="Open WhatsApp Direct Chat"
                            >
                              <span>WhatsApp</span>
                              <ExternalLinkIcon size={11} color="#059669" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Lead Source & Origin (Single Clear Accurate Column) */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "6px",
                          background: sourceInfo.bg,
                          color: sourceInfo.color,
                          border: `1px solid ${sourceInfo.border}`
                        }}>
                          <span>{sourceInfo.icon}</span>
                          <span>{sourceInfo.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.3rem", fontSize: "0.7rem", color: "#16A34A", fontWeight: 700 }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16A34A" }} />
                          <span>New Inbound Lead</span>
                        </div>
                      </td>

                      {/* Action Buttons: View Dossier & Delete */}
                      <td style={{ padding: "1rem 1.25rem", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            style={{
                              border: "1px solid #BFDBFE",
                              background: "#EFF6FF",
                              color: "#1D4ED8",
                              padding: "0.4rem 0.55rem",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            title="Inspect Lead Details"
                          >
                            <EyeIcon size={14} color="#1D4ED8" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(lead.id)}
                            style={{
                              border: "1px solid #FEE2E2",
                              background: "#FEF2F2",
                              color: "#DC2626",
                              padding: "0.4rem 0.55rem",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            title="Delete Lead"
                          >
                            <TrashIcon size={14} color="#DC2626" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DETAIL MODAL (Real Data Only) ── */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              border: "1px solid #E2E8F0",
              overflow: "hidden"
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: "1.25rem 1.5rem",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Inbound Lead Audit Dossier
                </span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0.2rem 0 0" }}>
                  {selectedLead.company}
                </h3>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#64748B",
                  cursor: "pointer",
                  padding: "0.4rem",
                  borderRadius: "6px"
                }}
              >
                <CloseIcon size={18} color="#64748B" />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Key Contact Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ padding: "0.9rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Contact Person</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginTop: "0.25rem" }}>
                    {selectedLead.contact}
                  </div>
                </div>

                <div style={{ padding: "0.9rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Product Category</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#2563EB", marginTop: "0.25rem" }}>
                    {selectedLead.category || "General Appliance"}
                  </div>
                </div>
              </div>

              {/* Phone & Email Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ padding: "0.9rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>WhatsApp Mobile</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A", marginTop: "0.25rem", fontFamily: "monospace" }}>
                    {selectedLead.mobile}
                  </div>
                  <a
                    href={`https://wa.me/${(selectedLead.mobile || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      marginTop: "0.4rem",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "#059669",
                      textDecoration: "none"
                    }}
                  >
                    <span>Open Direct WhatsApp Chat</span>
                    <ExternalLinkIcon size={12} color="#059669" />
                  </a>
                </div>

                <div style={{ padding: "0.9rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Business Email</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A", marginTop: "0.25rem" }}>
                    {selectedLead.email}
                  </div>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      marginTop: "0.4rem",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "#2563EB",
                      textDecoration: "none"
                    }}
                  >
                    <span>Send Direct Email</span>
                    <ExternalLinkIcon size={12} color="#2563EB" />
                  </a>
                </div>
              </div>

              {/* Source & Origin Details */}
              <div style={{ padding: "1rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  Traffic Source &amp; Submission Origin
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>
                  {selectedLead.source || "Website Inbound Form"}
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "0.25rem" }}>
                  Submitted on: {selectedLead.date || "Today"} · Status: Real Inbound Lead
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "1rem 1.5rem",
              background: "#F8FAFC",
              borderTop: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmId(selectedLead.id);
                }}
                style={{
                  border: "1px solid #FEE2E2",
                  background: "#FEF2F2",
                  color: "#DC2626",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Delete Lead
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{
                  border: "1px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#334155",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirmId && (
        <div
          onClick={() => setDeleteConfirmId(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "1rem"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: "14px",
              padding: "1.5rem",
              maxWidth: "420px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#FEE2E2",
              color: "#DC2626",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem"
            }}>
              <TrashIcon size={24} color="#DC2626" />
            </div>

            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.4rem" }}>
              Delete Inbound Lead?
            </h4>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0 0 1.25rem" }}>
              This will permanently delete this lead from the PostgreSQL database.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  border: "1px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer"
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
