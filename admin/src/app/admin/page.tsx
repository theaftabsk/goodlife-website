"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock Data for Admin CMS
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

interface CaseStudyItem {
  id: string;
  client: string;
  category: string;
  title: string;
  stats: string;
}

interface RedirectItem {
  from: string;
  to: string;
  code: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "insights" | "casestudies" | "leads" | "faqs" | "authors" | "media" | "settings"
  >("overview");

  // Sample Diagnostic Leads Data
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
      tags: ["B2B/Institutional Fulfilment", "Multi-Platform Expansion"],
      date: "2026-07-31 04:50 PM"
    }
  ]);

  // Selected Lead Modal State
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Articles List State
  const [articles, setArticles] = useState<ArticleItem[]>([
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
    },
    {
      id: "ART-03",
      title: "Automating B2B GST Invoicing & Dealer Replenishment",
      category: "B2B Commerce",
      status: "Draft",
      author: "Harish Kumar",
      date: "2026-08-01",
      seoTitle: "B2B Dealer Fulfilment Automation"
    }
  ]);

  // Case Studies State
  const [caseStudies] = useState<CaseStudyItem[]>([
    {
      id: "CS-01",
      client: "Leading Kitchen Appliance OEM",
      category: "OEM Brand Launch",
      title: "0 to ₹18 Cr Annual GMV in 14 Months Across Amazon & Flipkart",
      stats: "₹18 Cr GMV · 14 Months"
    },
    {
      id: "CS-02",
      client: "Pan-India Home Decor Brand",
      category: "Fix & Grow",
      title: "ACOS Reduced from 42% to 19% With Revenue Settlement Audit",
      stats: "19% ACOS · ₹4.2 L Recovered"
    }
  ]);

  // 301 Redirects State
  const [redirects] = useState<RedirectItem[]>([
    { from: "/services/b2b", to: "/b2b-institutional-commerce", code: 301 },
    { from: "/services/oem-launch", to: "/brand-launch-incubation", code: 301 },
    { from: "/platforms/all", to: "/multi-platform-commerce", code: 301 }
  ]);

  // Toast Notice State
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportCSV = () => {
    showToast("Exported 3 Lead Records to CSV successfully!");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060B1A", color: "#F3F4F6", fontFamily: "sans-serif", display: "flex" }}>
      
      {/* ── SIDEBAR NAVIGATION ── */}
      <aside style={{ width: "260px", background: "#0B1224", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Admin Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/gl-icon.svg" alt="Good Life" width={32} height={32} />
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF", display: "block" }}>GOOD LIFE</span>
            <span style={{ fontSize: "0.62rem", letterSpacing: "1.5px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Admin CMS v2.0</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[
            { id: "overview", label: "📊 Overview Dashboard" },
            { id: "leads", label: "📥 Diagnostic Leads (3)" },
            { id: "insights", label: "📝 Insights / Blog (3)" },
            { id: "casestudies", label: "🏆 Case Studies (2)" },
            { id: "faqs", label: "❓ FAQ Management" },
            { id: "authors", label: "👤 Author Profiles" },
            { id: "media", label: "📁 Media Library" },
            { id: "settings", label: "⚙️ Site Settings & 301" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "none",
                background: activeTab === item.id ? "rgba(37, 99, 235, 0.2)" : "transparent",
                borderLeft: activeTab === item.id ? "3px solid #38BDF8" : "3px solid transparent",
                color: activeTab === item.id ? "#FFFFFF" : "#9CA3AF",
                fontSize: "0.88rem",
                fontWeight: activeTab === item.id ? 700 : 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Return to Site */}
        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1rem" }}>
          <Link href="/" style={{ fontSize: "0.85rem", color: "#38BDF8", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ← View Live Website
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, padding: "2.5rem 3rem", overflowY: "auto" }}>
        
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {activeTab === "overview" && "Executive Dashboard"}
              {activeTab === "leads" && "Commerce Diagnostic Leads & Enquiries"}
              {activeTab === "insights" && "Insights & Knowledge CMS"}
              {activeTab === "casestudies" && "Case Studies & Proof Gallery"}
              {activeTab === "faqs" && "Frequently Asked Questions Manager"}
              {activeTab === "authors" && "Author Profiles & Team Manager"}
              {activeTab === "media" && "Media & Document Library"}
              {activeTab === "settings" && "Global Site Settings & 301 Redirects"}
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginTop: "0.3rem" }}>
              Enterprise B2B Commerce Lead-Generation Platform · Good Life Sutra Pvt Ltd
            </p>
          </div>

          <button onClick={() => showToast("Database synchronized successfully!")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
            🔄 Sync CMS Database
          </button>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div style={{ padding: "0.8rem 1.2rem", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34D399", borderRadius: "10px", marginBottom: "1.5rem", fontWeight: 600, fontSize: "0.9rem" }}>
            ✓ {toast}
          </div>
        )}

        {/* ── TAB 1: OVERVIEW DASHBOARD ── */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Stat Counters */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {[
                { title: "Total Diagnostic Submissions", val: "3 Leads", sub: "+100% this week", color: "#38BDF8" },
                { title: "Annual GMV Pipeline", val: "₹62 Cr+", sub: "Filtered high-intent leads", color: "#60A5FA" },
                { title: "CMS Articles Published", val: "3 Articles", sub: "1 Draft pending", color: "#34D399" },
                { title: "Active Platforms Monitored", val: "8 Platforms", sub: "Amazon, Flipkart, B2B", color: "#FBBF24" }
              ].map((card, i) => (
                <div key={i} style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.5rem" }}>
                  <div style={{ fontSize: "0.8rem", color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" }}>{card.title}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: card.color, margin: "0.4rem 0" }}>{card.val}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick Action Shortcuts */}
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>⚡ Quick CMS Actions</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button onClick={() => setActiveTab("leads")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#38BDF8", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  📥 View All Diagnostic Leads
                </button>
                <button onClick={() => setActiveTab("insights")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#FFF", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>
                  ✍️ Create New Insight Article
                </button>
                <button onClick={() => setActiveTab("casestudies")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#FFF", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>
                  🏆 Add Case Study Proof
                </button>
                <button onClick={handleExportCSV} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34D399", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  📊 Export Leads to CSV
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", margin: 0 }}>📥 Recent Diagnostic Submissions</h3>
                <button onClick={() => setActiveTab("leads")} style={{ color: "#38BDF8", background: "none", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>View All →</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {leads.map((l) => (
                  <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#FFF", fontSize: "0.95rem" }}>{l.company}</div>
                      <div style={{ color: "#9CA3AF", fontSize: "0.82rem", marginTop: "2px" }}>{l.contact} · {l.category}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ padding: "0.3rem 0.6rem", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontSize: "0.78rem", fontWeight: 700 }}>
                        {l.intent}
                      </span>
                      <div style={{ color: "#6B7280", fontSize: "0.75rem", marginTop: "4px" }}>{l.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 2: DIAGNOSTIC LEADS ── */}
        {activeTab === "leads" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Showing 3 qualified lead submissions</div>
              <button onClick={handleExportCSV} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                📥 Export CSV
              </button>
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: "0.78rem", textTransform: "uppercase" }}>
                    <th style={{ padding: "1rem" }}>Lead ID</th>
                    <th style={{ padding: "1rem" }}>Company & Contact</th>
                    <th style={{ padding: "1rem" }}>Category & GMV</th>
                    <th style={{ padding: "1rem" }}>Operating Intent</th>
                    <th style={{ padding: "1rem" }}>Timeline</th>
                    <th style={{ padding: "1rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "1rem", fontWeight: 700, color: "#38BDF8" }}>{l.id}</td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 700, color: "#FFF" }}>{l.company}</div>
                        <div style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>{l.contact}</div>
                        <div style={{ color: "#6B7280", fontSize: "0.78rem" }}>{l.email}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ color: "#E5E7EB" }}>{l.category}</div>
                        <div style={{ color: "#34D399", fontWeight: 600, fontSize: "0.8rem" }}>{l.gmv}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ padding: "0.3rem 0.65rem", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontWeight: 700, fontSize: "0.78rem" }}>
                          {l.intent}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", color: "#FBBF24", fontWeight: 600 }}>{l.timeline}</td>
                      <td style={{ padding: "1rem" }}>
                        <button onClick={() => setSelectedLead(l)} style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: "rgba(255,255,255,0.08)", color: "#FFF", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                          View 10 Steps
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: INSIGHTS / BLOG CMS ── */}
        {activeTab === "insights" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Total 3 articles managed</div>
              <button onClick={() => showToast("New Article Draft Created!")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                + Add New Insight
              </button>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {articles.map((art) => (
                <div key={art.id} style={{ padding: "1.25rem", background: "rgba(17, 24, 39, 0.6)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px", background: art.status === "Published" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)", color: art.status === "Published" ? "#34D399" : "#FBBF24" }}>
                        {art.status}
                      </span>
                      <span style={{ color: "#38BDF8", fontSize: "0.8rem", fontWeight: 600 }}>{art.category}</span>
                    </div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", margin: 0 }}>{art.title}</h3>
                    <div style={{ color: "#6B7280", fontSize: "0.8rem", marginTop: "4px" }}>By {art.author} · {art.date} · SEO Title: &quot;{art.seoTitle}&quot;</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => showToast("Article Editing Mode Opened")} style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: "rgba(255,255,255,0.08)", color: "#FFF", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>Edit</button>
                    <button onClick={() => showToast("Draft toggled")} style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>Unpublish</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: CASE STUDIES ── */}
        {activeTab === "casestudies" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>2 Published Proof Case Studies</div>
              <button onClick={() => showToast("New Case Study Template Ready")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                + Add Case Study
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {caseStudies.map((cs) => (
                <div key={cs.id} style={{ padding: "1.5rem", background: "rgba(17, 24, 39, 0.6)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#38BDF8", marginBottom: "0.4rem" }}>{cs.category}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "0.5rem" }}>{cs.title}</h3>
                  <div style={{ color: "#34D399", fontWeight: 700, fontSize: "0.9rem", marginBottom: "1rem" }}>{cs.stats}</div>
                  <div style={{ color: "#9CA3AF", fontSize: "0.82rem" }}>Client: {cs.client}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 8: SITE SETTINGS & 301 REDIRECTS ── */}
        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Global Contact Info */}
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "1.2rem" }}>📞 Editable Global Contact Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Official Business Email</label>
                  <input type="text" defaultValue="contact@goodlifesutra.com" style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Official Phone Line</label>
                  <input type="text" defaultValue="+91 1800 200 4005" style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                </div>
              </div>
              <button onClick={() => showToast("Global Contact Information Updated!")} style={{ marginTop: "1rem", padding: "0.6rem 1.2rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                Save Settings
              </button>
            </div>

            {/* 301 Redirects Table */}
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", margin: 0 }}>🔀 301 URL Redirect Management</h3>
                <button onClick={() => showToast("301 Redirect Rule Added")} style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                  + Add Redirect
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {redirects.map((r, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                      <span style={{ color: "#EF4444" }}>{r.from}</span> → <span style={{ color: "#34D399" }}>{r.to}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8" }}>HTTP {r.code}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "#0B1224", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "20px", padding: "2.5rem", maxWidth: "600px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#FFF", fontSize: "1.4rem", margin: 0, fontWeight: 800 }}>Lead Details - {selectedLead.id}</h2>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", color: "#FFF", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem", color: "#9CA3AF" }}>
              <div>🏢 <strong style={{ color: "#FFF" }}>Company:</strong> {selectedLead.company}</div>
              <div>👤 <strong style={{ color: "#FFF" }}>Contact:</strong> {selectedLead.contact} ({selectedLead.email}, {selectedLead.mobile})</div>
              <div>📦 <strong style={{ color: "#FFF" }}>Category:</strong> {selectedLead.category}</div>
              <div>💰 <strong style={{ color: "#FFF" }}>Annual GMV:</strong> {selectedLead.gmv}</div>
              <div>🎯 <strong style={{ color: "#FFF" }}>Primary Intent:</strong> {selectedLead.intent}</div>
              <div>⏳ <strong style={{ color: "#FFF" }}>Decision Timeline:</strong> {selectedLead.timeline}</div>
              <div>⚡ <strong style={{ color: "#FFF" }}>Identified Opportunity Tags:</strong></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {selectedLead.tags.map((t, idx) => (
                  <span key={idx} style={{ padding: "0.3rem 0.6rem", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontSize: "0.78rem", fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedLead(null)} style={{ width: "100%", marginTop: "2rem", padding: "0.8rem", borderRadius: "10px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer" }}>
              Close Lead Detail
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
