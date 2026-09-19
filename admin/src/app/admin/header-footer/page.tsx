"use client";

import React, { useState } from "react";
import { useAdminData, SiteSettings } from "@/context/AdminDataContext";
import {
  HeaderFooterIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CheckIcon,
  MegaphoneIcon,
  ExternalLinkIcon,
  RefreshIcon,
  ShieldCheckIcon,
  LightningIcon,
  SettingsIcon
} from "@/components/Icons";

const BG_PRESETS = [
  {
    name: "Automated Logistics Hub",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Modern Regional Warehouse",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Enterprise Commerce Operations",
    url: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function HeaderFooterPage() {
  const { siteSettings, updateSiteSettings, showToast } = useAdminData();
  const [form, setForm] = useState<SiteSettings>({
    ...siteSettings,
    announcementEnabled: siteSettings.announcementEnabled ?? true,
    announcementLink: siteSettings.announcementLink || "/case-studies",
    announcementTheme: siteSettings.announcementTheme || "slate",
    headerPhoneBadge: siteSettings.headerPhoneBadge || siteSettings.phone || "+91 88821 57074",
    cinNumber: siteSettings.cinNumber || "U74999MH2021PTC368942",
    registeredCity: siteSettings.registeredCity || "Gurugram, Haryana & Mumbai, India",
    supportHours: siteSettings.supportHours || "Mon - Sat: 9:30 AM - 7:00 PM IST",
    preFooterTag: siteSettings.preFooterTag || "READY TO SCALE?",
    preFooterHeading: siteSettings.preFooterHeading || "Grow your ecommerce business with us",
    preFooterSubtext: siteSettings.preFooterSubtext || "Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.",
    preFooterCta: siteSettings.preFooterCta || "UNLOCK YOUR GROWTH →",
    preFooterBgImage: siteSettings.preFooterBgImage || BG_PRESETS[0].url,
    copyrightText: siteSettings.copyrightText || "© 2026 Good Life Sutra Pvt. Ltd. All rights reserved.",
    linkedinUrl: siteSettings.linkedinUrl || "https://linkedin.com/company/good-life-sutra",
    twitterUrl: siteSettings.twitterUrl || "https://x.com/goodlifesutra",
    youtubeUrl: siteSettings.youtubeUrl || "https://youtube.com/@goodlifesutra"
  });

  const [activeTab, setActiveTab] = useState<"header" | "prefooter" | "corporate" | "footer">("header");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isSaved, setIsSaved] = useState(false);

  // Synchronize form when settings load from PostgreSQL database
  React.useEffect(() => {
    if (siteSettings && siteSettings.companyName) {
      setForm(prev => ({
        ...prev,
        ...siteSettings
      }));
    }
  }, [siteSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = async () => {
    if (confirm("Reset all header, footer, and corporate info to official defaults?")) {
      try {
        await fetch("http://localhost:5000/api/v1/settings/reset", { method: "POST" });
      } catch (_) {}
      const defaults: SiteSettings = {
        companyName: "Good Life Sutra Pvt. Ltd.",
        phone: "+91 88821 57074",
        email: "growth@goodlifesutra.com",
        address: "Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India",
        gstNumber: "06AABCG1234F1Z8",
        whatsappNumber: "+91 88821 57074",
        headerCtaText: "Request Diagnostic →",
        heroHeadline: "Scale Ecommerce. Not Complexity.",
        announcementText: "Operating across 15+ Platforms & 23+ Leading Brands Nationwide",
        announcementEnabled: true,
        announcementLink: "/case-studies",
        announcementTheme: "slate",
        headerPhoneBadge: "+91 88821 57074",
        cinNumber: "U74999MH2021PTC368942",
        registeredCity: "Gurugram, Haryana & Mumbai, India",
        supportHours: "Mon - Sat: 9:30 AM - 7:00 PM IST",
        preFooterTag: "READY TO SCALE?",
        preFooterHeading: "Grow your ecommerce business with us",
        preFooterSubtext: "Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.",
        preFooterCta: "UNLOCK YOUR GROWTH →",
        preFooterBgImage: BG_PRESETS[0].url,
        copyrightText: "© 2026 Good Life Sutra Pvt. Ltd. All rights reserved.",
        linkedinUrl: "https://linkedin.com/company/good-life-sutra",
        twitterUrl: "https://x.com/goodlifesutra",
        youtubeUrl: "https://youtube.com/@goodlifesutra"
      };
      setForm(defaults);
      updateSiteSettings(defaults);
      showToast("Reset to GoodLife enterprise defaults");
    }
  };

  // Banner background style by theme
  const getBannerThemeStyle = () => {
    switch (form.announcementTheme) {
      case "navy":
        return { background: "#1E3A8A", color: "#FFFFFF" };
      case "sky":
        return { background: "#0284C7", color: "#FFFFFF" };
      case "gradient":
        return { background: "linear-gradient(90deg, #1E3A8A 0%, #0284C7 100%)", color: "#FFFFFF" };
      case "slate":
      default:
        return { background: "#0F172A", color: "#FFFFFF" };
    }
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
            <HeaderFooterIcon size={20} color="#2563EB" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              Header, Footer &amp; Global Brand Controls
            </h2>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
            Configure announcement banners, corporate registry, pre-footer CTA strip, and synchronized contact details across all web touchpoints.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.55rem 0.95rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              background: "#FFFFFF",
              color: "#475569",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            <RefreshIcon size={14} color="#64748B" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.55rem 0.95rem",
              borderRadius: "8px",
              border: "1px solid #BFDBFE",
              background: "#EFF6FF",
              color: "#1D4ED8",
              fontSize: "0.82rem",
              fontWeight: 700,
              textDecoration: "none"
            }}
          >
            <ExternalLinkIcon size={14} color="#1D4ED8" />
            <span>View Live Site</span>
          </a>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <CheckIcon size={16} color="#FFFFFF" />
            <span>{isSaved ? "Saved Successfully!" : "Save All Changes"}</span>
          </button>
        </div>
      </div>

      {/* ── METRICS & STATUS CARDS (4 Crisp Cards) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Announcement Status</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: form.announcementEnabled ? "#16A34A" : "#94A3B8", marginTop: "0.25rem" }}>
            {form.announcementEnabled ? "Active & Displayed" : "Disabled / Hidden"}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>
            Theme: {form.announcementTheme?.toUpperCase()}
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>Header CTA Action</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", marginTop: "0.25rem" }}>
            {form.headerCtaText || "Request Diagnostic"}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>
            Triggers Diagnostic Audit Modal
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#D97706", textTransform: "uppercase" }}>Corporate Registry</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#D97706", marginTop: "0.25rem" }}>
            GST &amp; CIN Active
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem", fontFamily: "monospace" }}>
            {form.gstNumber}
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>Direct Line &amp; WhatsApp</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", marginTop: "0.25rem" }}>
            {form.phone}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>
            SLA: Sub-2hr response window
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE LIVE PREVIEW BOX ── */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #CBD5E1",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        overflow: "hidden"
      }}>
        {/* Preview Control Header */}
        <div style={{
          background: "#F8FAFC",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Live Dynamic Sandbox Preview
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button
              type="button"
              onClick={() => setPreviewDevice("desktop")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                border: previewDevice === "desktop" ? "1px solid #2563EB" : "1px solid #E2E8F0",
                background: previewDevice === "desktop" ? "#EFF6FF" : "#FFFFFF",
                color: previewDevice === "desktop" ? "#1D4ED8" : "#64748B",
                fontSize: "0.74rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Desktop Layout
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("mobile")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                border: previewDevice === "mobile" ? "1px solid #2563EB" : "1px solid #E2E8F0",
                background: previewDevice === "mobile" ? "#EFF6FF" : "#FFFFFF",
                color: previewDevice === "mobile" ? "#1D4ED8" : "#64748B",
                fontSize: "0.74rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Mobile (Compact)
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Rendering Area */}
        <div style={{
          background: "#F1F5F9",
          padding: previewDevice === "desktop" ? "1.5rem" : "1.5rem 0.75rem",
          display: "flex",
          justifyContent: "center",
          overflowX: "auto"
        }}>
          <div style={{
            width: previewDevice === "desktop" ? "100%" : "390px",
            maxWidth: previewDevice === "desktop" ? "100%" : "390px",
            background: "#FFFFFF",
            borderRadius: "10px",
            border: "1px solid #CBD5E1",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            overflow: "hidden",
            transition: "all 0.25s ease"
          }}>
            
            {/* Top Announcement Bar */}
            {form.announcementEnabled && (
              <div style={{
                ...getBannerThemeStyle(),
                padding: "0.6rem 1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.78rem",
                fontWeight: 600,
                flexWrap: "wrap",
                gap: "0.5rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <MegaphoneIcon size={14} color="#38BDF8" />
                  <span>{form.announcementText || "Announcement banner text..."}</span>
                </div>
                {previewDevice === "desktop" && (
                  <div style={{ color: "#38BDF8", fontWeight: 700, fontSize: "0.76rem" }}>
                    Direct Hotline: {form.phone}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Header Bar */}
            <div style={{
              padding: "0.9rem 1.25rem",
              background: "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              {/* Brand Logo & Tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "0.95rem"
                }}>
                  G
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.01em" }}>
                    GOOD LIFE
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#64748B", letterSpacing: "1px", textTransform: "uppercase" }}>
                    COMMERCE PARTNER
                  </div>
                </div>
              </div>

              {/* Desktop Nav Items */}
              {previewDevice === "desktop" && (
                <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
                  <span>Solutions ▾</span>
                  <span>Capabilities ▾</span>
                  <span>Specialised ▾</span>
                  <span>Case Studies</span>
                  <span>Insights</span>
                </div>
              )}

              {/* Header Action Button */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  type="button"
                  style={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {form.headerCtaText || "Request Diagnostic →"}
                </button>
              </div>
            </div>

            {/* PRE-FOOTER "READY TO SCALE?" BANNER PREVIEW */}
            <div style={{
              position: "relative",
              padding: previewDevice === "desktop" ? "3rem 2rem" : "2rem 1.25rem",
              background: "#0F172A",
              color: "#FFFFFF",
              overflow: "hidden"
            }}>
              {/* Background Image with Blur */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${form.preFooterBgImage || BG_PRESETS[0].url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(3px)",
                opacity: 0.35,
                transform: "scale(1.05)"
              }} />

              {/* Gradient Shade */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.75) 100%)"
              }} />

              <div style={{ position: "relative", zIndex: 2, maxWidth: "540px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2px", color: "#38BDF8", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  {form.preFooterTag || "READY TO SCALE?"}
                </div>
                <h3 style={{ fontSize: previewDevice === "desktop" ? "1.6rem" : "1.25rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.6rem 0", lineHeight: 1.2 }}>
                  {form.preFooterHeading || "Grow your ecommerce business with us"}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#CBD5E1", margin: "0 0 1.25rem 0", lineHeight: 1.5 }}>
                  {form.preFooterSubtext}
                </p>
                <button
                  type="button"
                  style={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "0.6rem 1.4rem",
                    borderRadius: "4px",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    cursor: "pointer"
                  }}
                >
                  {form.preFooterCta || "UNLOCK YOUR GROWTH →"}
                </button>
              </div>
            </div>

            {/* FOOTER PREVIEW (4 COLUMNS) */}
            <div style={{
              background: "#020617",
              color: "#94A3B8",
              padding: previewDevice === "desktop" ? "2rem" : "1.5rem",
              fontSize: "0.76rem"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: previewDevice === "desktop" ? "1.2fr 1fr 1fr 1fr" : "1fr",
                gap: "1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid #1E293B"
              }}>
                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "0.84rem", marginBottom: "0.6rem" }}>
                    Registered Office
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", lineHeight: 1.5 }}>
                    <div>Direct Line: <strong style={{ color: "#F1F5F9" }}>{form.phone}</strong></div>
                    <div>Inquiry: <strong style={{ color: "#F1F5F9" }}>{form.email}</strong></div>
                    <div style={{ color: "#64748B", marginTop: "0.2rem" }}>
                      {form.companyName}<br />
                      CIN: {form.cinNumber}<br />
                      {form.registeredCity}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "0.84rem", marginBottom: "0.6rem" }}>
                    Solutions
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", color: "#CBD5E1" }}>
                    <span>Launch Online</span>
                    <span>Fix &amp; Grow</span>
                    <span>Scale Pan-India</span>
                    <span>Heavy &amp; Bulky</span>
                  </div>
                </div>

                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "0.84rem", marginBottom: "0.6rem" }}>
                    Capabilities
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", color: "#CBD5E1" }}>
                    <span>Marketplace Operations</span>
                    <span>Growth &amp; Advertising</span>
                    <span>12-State Warehousing</span>
                    <span>Revenue Assurance</span>
                  </div>
                </div>

                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "0.84rem", marginBottom: "0.6rem" }}>
                    Authority &amp; Legal
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", color: "#CBD5E1" }}>
                    <span>Case Studies</span>
                    <span>Verified Insights</span>
                    <span>Enterprise FAQs</span>
                    <span>Privacy Policy</span>
                  </div>
                </div>
              </div>

              {/* Footer Bottom Bar */}
              <div style={{
                paddingTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                fontSize: "0.72rem",
                color: "#64748B"
              }}>
                <div>{form.copyrightText}</div>
                <div style={{ display: "flex", gap: "1rem", color: "#94A3B8", fontWeight: 600 }}>
                  <span>LinkedIn</span>
                  <span>Twitter / X</span>
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── SETTINGS TABS ENGINE ── */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("header")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "header" ? "#2563EB" : "transparent",
            color: activeTab === "header" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <MegaphoneIcon size={16} color={activeTab === "header" ? "#FFFFFF" : "#64748B"} />
          <span>Header &amp; Announcement Bar</span>
        </button>

        <button
          onClick={() => setActiveTab("prefooter")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "prefooter" ? "#2563EB" : "transparent",
            color: activeTab === "prefooter" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <LightningIcon size={16} color={activeTab === "prefooter" ? "#FFFFFF" : "#64748B"} />
          <span>Pre-Footer "Ready to Scale" Strip</span>
        </button>

        <button
          onClick={() => setActiveTab("corporate")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "corporate" ? "#2563EB" : "transparent",
            color: activeTab === "corporate" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <ShieldCheckIcon size={16} color={activeTab === "corporate" ? "#FFFFFF" : "#64748B"} />
          <span>Corporate Registry &amp; Contact Info</span>
        </button>

        <button
          onClick={() => setActiveTab("footer")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "footer" ? "#2563EB" : "transparent",
            color: activeTab === "footer" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <HeaderFooterIcon size={16} color={activeTab === "footer" ? "#FFFFFF" : "#64748B"} />
          <span>Footer &amp; Social Links</span>
        </button>
      </div>

      {/* ── FORM SECTION ── */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* TAB 1: HEADER & ANNOUNCEMENT BAR */}
        {activeTab === "header" && (
          <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
              Announcement Banner &amp; Header Controls
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1.5rem 0" }}>
              Control the top strip announcement text, visual background theme, direct phone hotline badge, and header action button.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Enable / Disable Switch */}
              <div style={{
                background: "#F8FAFC",
                padding: "0.85rem 1.25rem",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A" }}>
                    Enable Top Announcement Banner
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    When toggled on, the announcement bar is rendered globally above the main navigation header.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={form.announcementEnabled}
                  onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
                  style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#2563EB" }}
                />
              </div>

              {/* Banner Text */}
              <div>
                <label className="label-text">Announcement Headline Text *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating across 15+ Platforms & 23+ Leading Brands Nationwide"
                  value={form.announcementText}
                  onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Banner Link & Theme */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Announcement Destination Link</label>
                  <input
                    type="text"
                    placeholder="/case-studies or /contact"
                    value={form.announcementLink}
                    onChange={(e) => setForm({ ...form, announcementLink: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">Visual Theme Palette</label>
                  <select
                    value={form.announcementTheme}
                    onChange={(e) => setForm({ ...form, announcementTheme: e.target.value as any })}
                    className="input-control"
                    style={{ width: "100%" }}
                  >
                    <option value="slate">Dark Slate (#0F172A) — Standard Enterprise</option>
                    <option value="navy">Electric Navy (#1E3A8A) — High Visibility</option>
                    <option value="sky">Radiant Sky (#0284C7) — Brand Accent</option>
                    <option value="gradient">Linear Gradient (Navy to Sky)</option>
                  </select>
                </div>
              </div>

              {/* Header Primary CTA & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Header Primary CTA Button Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="Request Diagnostic →"
                    value={form.headerCtaText}
                    onChange={(e) => setForm({ ...form, headerCtaText: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.25rem", display: "block" }}>
                    Triggers the interactive 4-step Commerce Diagnostic modal.
                  </span>
                </div>

                <div>
                  <label className="label-text">Header Direct Phone Badge</label>
                  <input
                    type="text"
                    placeholder="+91 88821 57074"
                    value={form.headerPhoneBadge}
                    onChange={(e) => setForm({ ...form, headerPhoneBadge: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.25rem", display: "block" }}>
                    Displayed in top announcement strip and desktop header.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PRE-FOOTER "READY TO SCALE" HERO STRIP */}
        {activeTab === "prefooter" && (
          <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
              Pre-Footer "Ready to Scale" Hero Strip
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1.5rem 0" }}>
              The high-converting full-width banner placed directly above the footer across all public subpages and capabilities.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Eyebrow & Headline */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Eyebrow Tag *</label>
                  <input
                    type="text"
                    required
                    placeholder="READY TO SCALE?"
                    value={form.preFooterTag}
                    onChange={(e) => setForm({ ...form, preFooterTag: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">Hero Main Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="Grow your ecommerce business with us"
                    value={form.preFooterHeading}
                    onChange={(e) => setForm({ ...form, preFooterHeading: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Subtext */}
              <div>
                <label className="label-text">Supporting Subtext Description</label>
                <textarea
                  rows={2}
                  placeholder="Request our complimentary Commerce Diagnostic to identify leakage points..."
                  value={form.preFooterSubtext}
                  onChange={(e) => setForm({ ...form, preFooterSubtext: e.target.value })}
                  className="input-control"
                  style={{ width: "100%", resize: "vertical" }}
                />
              </div>

              {/* CTA Button Text */}
              <div>
                <label className="label-text">Banner CTA Button Copy *</label>
                <input
                  type="text"
                  required
                  placeholder="UNLOCK YOUR GROWTH →"
                  value={form.preFooterCta}
                  onChange={(e) => setForm({ ...form, preFooterCta: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Background Image URL & Presets */}
              <div>
                <label className="label-text">Background Photography URL (with soft blur)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={form.preFooterBgImage}
                  onChange={(e) => setForm({ ...form, preFooterBgImage: e.target.value })}
                  className="input-control"
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748B", alignSelf: "center", marginRight: "0.25rem" }}>
                    High-res presets:
                  </span>
                  {BG_PRESETS.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm({ ...form, preFooterBgImage: p.url })}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "6px",
                        border: form.preFooterBgImage === p.url ? "1px solid #2563EB" : "1px solid #E2E8F0",
                        background: form.preFooterBgImage === p.url ? "#EFF6FF" : "#F8FAFC",
                        color: form.preFooterBgImage === p.url ? "#1D4ED8" : "#475569",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: CORPORATE REGISTRY & CONTACT INFO */}
        {activeTab === "corporate" && (
          <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
              Corporate Registry &amp; Compliance Details
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1.5rem 0" }}>
              Official registered legal entity name, CIN, GSTIN, and corporate headquarters address rendered across all public pages.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Entity Name & CIN */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Registered Legal Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Good Life Sutra Pvt. Ltd."
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">Corporate Identification Number (CIN)</label>
                  <input
                    type="text"
                    placeholder="U74999MH2021PTC368942"
                    value={form.cinNumber}
                    onChange={(e) => setForm({ ...form, cinNumber: e.target.value })}
                    className="input-control"
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                </div>
              </div>

              {/* GSTIN & City */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">GST Identification Number (GSTIN) *</label>
                  <input
                    type="text"
                    required
                    placeholder="06AABCG1234F1Z8"
                    value={form.gstNumber}
                    onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                    className="input-control"
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                </div>

                <div>
                  <label className="label-text">Registered Cities / Zones</label>
                  <input
                    type="text"
                    placeholder="Gurugram, Haryana & Mumbai, India"
                    value={form.registeredCity}
                    onChange={(e) => setForm({ ...form, registeredCity: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Phone, Email, WhatsApp */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <PhoneIcon size={14} color="#2563EB" />
                    <span>Primary Phone *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 88821 57074"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <MailIcon size={14} color="#2563EB" />
                    <span>Inquiry Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="growth@goodlifesutra.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">WhatsApp Support Hotline</label>
                  <input
                    type="text"
                    placeholder="+91 88821 57074"
                    value={form.whatsappNumber}
                    onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Headquarters Address */}
              <div>
                <label className="label-text" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <MapPinIcon size={14} color="#2563EB" />
                  <span>Registered Corporate Headquarters Address *</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input-control"
                  style={{ width: "100%", resize: "vertical" }}
                />
              </div>

              {/* Support Operating Hours */}
              <div>
                <label className="label-text">Operational Hours &amp; Support SLA</label>
                <input
                  type="text"
                  placeholder="Mon - Sat: 9:30 AM - 7:00 PM IST · Sub-2hr Response"
                  value={form.supportHours}
                  onChange={(e) => setForm({ ...form, supportHours: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: FOOTER & SOCIAL LINKS */}
        {activeTab === "footer" && (
          <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
              Footer Copyright &amp; Social Channels
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1.5rem 0" }}>
              Configure social profile URLs, legal copyright statement, and public disclosure links.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Copyright Statement */}
              <div>
                <label className="label-text">Legal Copyright Notice *</label>
                <input
                  type="text"
                  required
                  placeholder="© 2026 Good Life Sutra Pvt. Ltd. All rights reserved."
                  value={form.copyrightText}
                  onChange={(e) => setForm({ ...form, copyrightText: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Social URLs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">LinkedIn Company Page</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/company/good-life-sutra"
                    value={form.linkedinUrl}
                    onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">Twitter / X Profile</label>
                  <input
                    type="url"
                    placeholder="https://x.com/goodlifesutra"
                    value={form.twitterUrl}
                    onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">YouTube Channel</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@goodlifesutra"
                    value={form.youtubeUrl}
                    onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Brand Tagline */}
              <div>
                <label className="label-text">Brand Tagline &amp; Mission</label>
                <input
                  type="text"
                  placeholder="Scale Ecommerce. Not Complexity."
                  value={form.heroHeadline}
                  onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

            </div>
          </div>
        )}

        {/* ── SUBMIT BUTTON STRIP ── */}
        <div style={{
          background: "#FFFFFF",
          padding: "1.1rem 1.5rem",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
            Changes take effect immediately across all website instances and public pages.
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "0.75rem 2rem", fontSize: "0.9rem" }}
          >
            <CheckIcon size={18} color="#FFFFFF" />
            <span>{isSaved ? "Saved to Context & Storage!" : "Save All Site Settings"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
