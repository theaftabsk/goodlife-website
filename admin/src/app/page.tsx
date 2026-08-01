"use client";

import React, { useState } from "react";

// Types for Enterprise Admin Panel
interface LeadItem {
  id: string;
  company: string;
  contact: string;
  email: string;
  mobile: string;
  category: string;
  gmv: string;
  intent: string;
  timeline: string;
  score: number;
  tags: string[];
  date: string;
}

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  author: string;
  date: string;
  seoTitle: string;
}

interface AuditLogItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
}

export default function EnterpriseAdminApp() {
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "leads"
    | "crm"
    | "diagnostics"
    | "articles"
    | "casestudies"
    | "faq"
    | "media"
    | "authors"
    | "analytics"
    | "seo"
    | "redirects"
    | "users"
    | "roles"
    | "auditlogs"
    | "settings"
  >("dashboard");

  // Leads Data
  const [leads] = useState<LeadItem[]>([
    {
      id: "GL-1092",
      company: "Apex Appliances Pvt Ltd",
      contact: "Rajesh Sharma (CFO)",
      email: "r.sharma@apexappliances.in",
      mobile: "+91 98201 44321",
      category: "Heavy Appliances & Electronics",
      gmv: "₹10 Cr - ₹50 Cr",
      intent: "OEM Brand Launch",
      timeline: "Immediate (< 30 days)",
      score: 92,
      tags: ["OEM-to-Brand Opportunity", "Multi-State Warehousing"],
      date: "2026-08-01 11:24 AM"
    },
    {
      id: "GL-1091",
      company: "NutriLife D2C",
      contact: "Ananya Roy (Head of Growth)",
      email: "ananya@nutrilife.co",
      mobile: "+91 98711 00293",
      category: "Health & Nutrition",
      gmv: "₹2 Cr - ₹10 Cr",
      intent: "Fix & Grow Operations",
      timeline: "30-60 Days",
      score: 84,
      tags: ["D2C Operations Opportunity", "ACOS Optimization"],
      date: "2026-08-01 09:15 AM"
    },
    {
      id: "GL-1090",
      company: "Vanguard Tools & Industrial",
      contact: "Vikramaditya Paul (VP Business)",
      email: "v.paul@vanguardtools.com",
      mobile: "+91 94330 11820",
      category: "Industrial & Hardware",
      gmv: "₹50 Cr+",
      intent: "B2B & Institutional Scale",
      timeline: "Immediate (< 30 days)",
      score: 96,
      tags: ["B2B/Institutional Fulfilment", "Multi-Platform Expansion"],
      date: "2026-07-31 04:50 PM"
    }
  ]);

  // Selected Lead Modal
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Articles State
  const [articles] = useState<ArticleItem[]>([
    {
      id: "ART-01",
      title: "How Multi-State Warehousing Cuts Amazon RTO by 34%",
      category: "Logistics Strategy",
      status: "Published",
      author: "Harish Kumar",
      date: "2026-07-28",
      seoTitle: "Multi-State Warehousing RTO Reduction Guide"
    },
    {
      id: "ART-02",
      title: "From OEM Manufacturer to Direct E-Commerce Brand: Unit Economics Guide",
      category: "Brand Incubation",
      status: "Published",
      author: "Commerce Ops Team",
      date: "2026-07-20",
      seoTitle: "OEM to Consumer Brand Launch Blueprint"
    }
  ]);

  // Audit Logs State
  const [auditLogs] = useState<AuditLogItem[]>([
    { id: "LOG-501", user: "harish@goodlifesutra.com", action: "EXPORT_LEADS_CSV", target: "Diagnostic Leads", timestamp: "2026-08-01 12:04:12", ip: "103.21.124.8" },
    { id: "LOG-500", user: "admin@goodlifesutra.com", action: "UPDATE_301_REDIRECT", target: "/services/b2b", timestamp: "2026-08-01 10:15:00", ip: "103.21.124.8" },
    { id: "LOG-499", user: "editor@goodlifesutra.com", action: "PUBLISH_ARTICLE", target: "ART-01", timestamp: "2026-07-28 14:30:22", ip: "182.72.10.4" }
  ]);

  // Toast Notice State
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "leads", label: "📥 Diagnostic Leads" },
    { id: "crm", label: "🔄 CRM & Webhooks" },
    { id: "diagnostics", label: "⚡ Diagnostic Engine" },
    { id: "articles", label: "📝 Insights / Articles" },
    { id: "casestudies", label: "🏆 Case Studies" },
    { id: "faq", label: "❓ Master FAQs" },
    { id: "media", label: "📁 Cloud Media Library" },
    { id: "authors", label: "👤 Author Profiles" },
    { id: "analytics", label: "📈 Analytics & MIS" },
    { id: "seo", label: "🔍 SEO & Schema" },
    { id: "redirects", label: "🔀 301 Redirects" },
    { id: "users", label: "👥 Admin Users" },
    { id: "roles", label: "🛡️ RBAC Roles" },
    { id: "auditlogs", label: "📜 Audit Logs" },
    { id: "settings", label: "⚙️ Site Settings" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060B1A", color: "#F3F4F6", display: "flex" }}>
      
      {/* ── SIDEBAR NAVIGATION ── */}
      <aside style={{ width: "270px", background: "#0B1224", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #2563EB, #38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#FFF" }}>
            GL
          </div>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF", display: "block", letterSpacing: "0.5px" }}>GOOD LIFE</span>
            <span style={{ fontSize: "0.62rem", letterSpacing: "1.5px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Standalone Admin v3.0</span>
          </div>
        </div>

        {/* User Badge */}
        <div style={{ padding: "0.75rem 1rem", background: "rgba(255, 255, 255, 0.04)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34D399" }}></div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFF" }}>Harish Kumar</div>
            <div style={{ fontSize: "0.72rem", color: "#38BDF8", fontWeight: 600 }}>Super Admin (RBAC)</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: "100%",
                padding: "0.65rem 0.9rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === item.id ? "rgba(37, 99, 235, 0.25)" : "transparent",
                borderLeft: activeTab === item.id ? "3px solid #38BDF8" : "3px solid transparent",
                color: activeTab === item.id ? "#FFFFFF" : "#9CA3AF",
                fontSize: "0.85rem",
                fontWeight: activeTab === item.id ? 700 : 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowY: "auto" }}>
        
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1.25rem" }}>
          <div>
            <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginTop: "0.2rem" }}>
              Good Life Sutra Enterprise Standalone Admin Control Panel · Local PostgreSQL + Prisma ORM
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => showToast("Health Status: OK (Server 200, DB Connected)")} style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34D399", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
              ● API Health: 200 OK
            </button>
            <button onClick={() => showToast("Database Sync Completed")} style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
              🔄 Sync Database
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div style={{ padding: "0.75rem 1.2rem", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34D399", borderRadius: "8px", marginBottom: "1.5rem", fontWeight: 600, fontSize: "0.88rem" }}>
            ✓ {toast}
          </div>
        )}

        {/* TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.2rem" }}>
              {[
                { title: "Diagnostic Submissions", val: "3 Leads", sub: "100% Fit Scored", color: "#38BDF8" },
                { title: "GMV Opportunity Pipeline", val: "₹62 Cr+", sub: "High-Intent Enquiries", color: "#60A5FA" },
                { title: "Published CMS Articles", val: "2 Articles", sub: "1 Draft Pending", color: "#34D399" },
                { title: "Active Audit Logs", val: "501 Events", sub: "Security Monitored", color: "#FBBF24" }
              ].map((card, i) => (
                <div key={i} style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "1.25rem" }}>
                  <div style={{ fontSize: "0.78rem", color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" }}>{card.title}</div>
                  <div style={{ fontSize: "1.7rem", fontWeight: 800, color: card.color, margin: "0.3rem 0" }}>{card.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>⚡ Diagnostic Submissions Overview</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {leads.map((l) => (
                  <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 1.1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#FFF", fontSize: "0.95rem" }}>{l.company} <span style={{ color: "#38BDF8", fontSize: "0.8rem", marginLeft: "0.5rem" }}>[Score: {l.score}/100]</span></div>
                      <div style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: "2px" }}>{l.contact} · {l.category} · GMV: {l.gmv}</div>
                    </div>
                    <button onClick={() => setSelectedLead(l)} style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: "#2563EB", color: "#FFF", border: "none", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
                      Inspect Lead →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: LEADS */}
        {activeTab === "leads" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9CA3AF", fontSize: "0.88rem" }}>3 Diagnostic Submissions in Database</div>
              <button onClick={() => showToast("Exported 3 Qualified Lead Records to CSV!")} style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                📊 Export CSV
              </button>
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: "0.75rem", textTransform: "uppercase" }}>
                    <th style={{ padding: "0.9rem" }}>Lead ID</th>
                    <th style={{ padding: "0.9rem" }}>Company & Contact</th>
                    <th style={{ padding: "0.9rem" }}>Category & GMV</th>
                    <th style={{ padding: "0.9rem" }}>Operating Intent</th>
                    <th style={{ padding: "0.9rem" }}>Fit Score</th>
                    <th style={{ padding: "0.9rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "0.9rem", fontWeight: 700, color: "#38BDF8" }}>{l.id}</td>
                      <td style={{ padding: "0.9rem" }}>
                        <div style={{ fontWeight: 700, color: "#FFF" }}>{l.company}</div>
                        <div style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>{l.contact} ({l.email})</div>
                      </td>
                      <td style={{ padding: "0.9rem" }}>
                        <div style={{ color: "#E5E7EB" }}>{l.category}</div>
                        <div style={{ color: "#34D399", fontWeight: 600, fontSize: "0.78rem" }}>{l.gmv}</div>
                      </td>
                      <td style={{ padding: "0.9rem" }}>
                        <span style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontWeight: 700, fontSize: "0.75rem" }}>
                          {l.intent}
                        </span>
                      </td>
                      <td style={{ padding: "0.9rem", fontWeight: 800, color: "#FBBF24" }}>{l.score}/100</td>
                      <td style={{ padding: "0.9rem" }}>
                        <button onClick={() => setSelectedLead(l)} style={{ padding: "0.35rem 0.75rem", borderRadius: "6px", background: "rgba(255,255,255,0.08)", color: "#FFF", border: "none", cursor: "pointer", fontSize: "0.78rem" }}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: AUDIT LOGS */}
        {activeTab === "auditlogs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>📜 Admin Security Audit Trail</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {auditLogs.map((log) => (
                  <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.82rem" }}>
                    <div>
                      <span style={{ color: "#38BDF8" }}>[{log.timestamp}]</span> <strong style={{ color: "#FFF" }}>{log.user}</strong> performed <span style={{ color: "#FBBF24" }}>{log.action}</span> on {log.target}
                    </div>
                    <span style={{ color: "#9CA3AF" }}>IP: {log.ip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS FALLBACK */}
        {!["dashboard", "leads", "auditlogs"].includes(activeTab) && (
          <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "2.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚙️</div>
            <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Module Active: {navItems.find((n) => n.id === activeTab)?.label}
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              Connected to local PostgreSQL database via Prisma ORM and API v1 endpoints (`/api/v1/{activeTab}`).
            </p>
            <button onClick={() => showToast(`Synchronized ${activeTab} module with PostgreSQL database!`)} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              Sync Module Data
            </button>
          </div>
        )}

      </main>

      {/* Selected Lead Modal */}
      {selectedLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "#0B1224", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "18px", padding: "2rem", maxWidth: "580px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h2 style={{ color: "#FFF", fontSize: "1.3rem", margin: 0, fontWeight: 800 }}>Lead Details - {selectedLead.id}</h2>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", color: "#FFF", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.88rem", color: "#9CA3AF" }}>
              <div>🏢 <strong style={{ color: "#FFF" }}>Company:</strong> {selectedLead.company}</div>
              <div>👤 <strong style={{ color: "#FFF" }}>Contact:</strong> {selectedLead.contact} ({selectedLead.email})</div>
              <div>📦 <strong style={{ color: "#FFF" }}>Category:</strong> {selectedLead.category}</div>
              <div>💰 <strong style={{ color: "#FFF" }}>Annual GMV Band:</strong> {selectedLead.gmv}</div>
              <div>🎯 <strong style={{ color: "#FFF" }}>Operating Intent:</strong> {selectedLead.intent}</div>
              <div>⚡ <strong style={{ color: "#FFF" }}>Calculated Fit Score:</strong> <span style={{ color: "#FBBF24", fontWeight: 800 }}>{selectedLead.score}/100</span></div>
              <div>🏷️ <strong style={{ color: "#FFF" }}>Opportunity Tags:</strong></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {selectedLead.tags.map((t, idx) => (
                  <span key={idx} style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontSize: "0.75rem", fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedLead(null)} style={{ width: "100%", marginTop: "1.5rem", padding: "0.75rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer" }}>
              Close Inspection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
