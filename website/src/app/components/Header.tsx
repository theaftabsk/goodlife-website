"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

interface HeaderProps {
  onOpenDiagnostic: () => void;
}

export default function Header({ onOpenDiagnostic }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const megaMenuData: Record<string, { name: string; href: string; desc: string; tag?: string }[]> = {
    solutions: [
      { name: "Launch Online", href: "/solutions/launch-online", desc: "Multi-marketplace onboarding & catalogue launch" },
      { name: "Fix & Grow", href: "/solutions/fix-and-grow", desc: "GMV recovery, ACOS reduction & settlement audit" },
      { name: "Scale Pan-India", href: "/solutions/scale-pan-india", desc: "12-state warehouse distribution & stock placement" },
      { name: "Brand Launch & Incubation", href: "/brand-launch-incubation", desc: "From OEM manufacturer capability to consumer brand", tag: "OEM Target" },
      { name: "D2C Commerce Operations", href: "/d2c-commerce-operations", desc: "End-to-end storefront ops, order flow & reverse logistics" }
    ],
    capabilities: [
      { name: "Marketplace Operations", href: "/capabilities/marketplace-operations", desc: "Listing conversion, cataloguing & buy box control" },
      { name: "Marketplace Growth & Ads", href: "/capabilities/marketplace-growth", desc: "Established Amazon & Flipkart performance ad campaigns" },
      { name: "Inventory Planning", href: "/capabilities/inventory-planning", desc: "Multi-channel allocation & stock buffer management" },
      { name: "Fulfilment & Warehousing", href: "/capabilities/warehousing-fulfilment", desc: "12-state regional warehouse network & supply support" },
      { name: "Revenue Assurance", href: "/capabilities/revenue-assurance", desc: "Automated settlement auditing & weight claim recovery" },
      { name: "Returns Management", href: "/capabilities/returns-operations", desc: "RTO reduction, reverse logistics QC & exception tracking" },
      { name: "Multi-Platform Commerce", href: "/multi-platform-commerce", desc: "Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint" },
      { name: "B2B & Institutional Commerce", href: "/b2b-institutional-commerce", desc: "Corporate bulk orders, GST invoices & dealer replenishment" }
    ],
    specialised: [
      { name: "Heavy & Bulky Commerce", href: "/specialised/heavy-bulky-commerce", desc: "Specialised freight logistics for large appliances & furniture" },
      { name: "Fulfilment Network Map", href: "/specialised/fulfilment-network", desc: "Interactive map preview of 12-state warehouse hubs" },
      { name: "Agency Partners", href: "/specialised/agency-partner", desc: "Strategic growth & branding partner acquisition channel" }
    ],
    proof: [
      { name: "Case Studies", href: "/case-studies", desc: "5-brand launch track record & verified GMV proof stories" },
      { name: "Insights & Journal", href: "/insights", desc: "Commerce operating strategy, unit economics & reports" },
      { name: "About Good Life", href: "/about", desc: "India's premier commerce operating partner company story" },
      { name: "Executive Contact", href: "/contact", desc: "Direct executive enquiry form & registered office details" }
    ]
  };

  const toggleMobileCategory = (cat: string) => {
    setExpandedMobileCategory(expandedMobileCategory === cat ? null : cat);
  };

  return (
    <header className="header-bar" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "72px",
      background: "rgba(255, 255, 255, 0.97)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
      boxShadow: "0 1px 20px rgba(0, 0, 0, 0.05)",
      zIndex: 9999
    }}>
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }} className="header-logo-container">
          <Logo height={32} mode="light" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="desktop-nav">
          {(["solutions", "capabilities", "specialised", "proof"] as const).map((key) => {
            const labels: Record<string, string> = {
              solutions: "Solutions",
              capabilities: "Capabilities",
              specialised: "Specialised",
              proof: "Proof & Knowledge"
            };
            const isActive = activeMenu === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
                style={{ position: "relative", padding: "1.4rem 0" }}
              >
                <span style={{
                  fontSize: "0.96rem",
                  fontWeight: 700,
                  color: isActive ? "#2563EB" : "#1E293B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "8px",
                  background: isActive ? "rgba(37,99,235,0.08)" : "transparent",
                  transition: "all 0.18s ease",
                  userSelect: "none"
                }}>
                  {labels[key]}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, transition: "transform 0.18s ease", transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            );
          })}
        </nav>

        {/* Primary CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onOpenDiagnostic}
            className="header-cta-button"
            style={{
              height: "40px",
              fontSize: "0.86rem",
              fontWeight: 700,
              padding: "0 1.25rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(37, 99, 235, 0.28)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap"
            }}
          >
            <span className="cta-text-desktop">Request for a FREE AUDIT →</span>
            <span className="cta-text-mobile">Free Audit →</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              width: "40px",
              height: "40px",
              background: mobileOpen ? "#EFF6FF" : "#F8FAFC",
              border: `1px solid ${mobileOpen ? "#BFDBFE" : "#E2E8F0"}`,
              color: mobileOpen ? "#2563EB" : "#475569",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.1rem",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mega-Menu Overlay for Desktop */}
      {activeMenu && (
        <div
          className="mega-menu-overlay"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(255, 255, 255, 0.99)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.1)",
            padding: "1.75rem 0 2.25rem"
          }}
        >
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {megaMenuData[activeMenu]?.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setActiveMenu(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    background: "#F8FAFC",
                    border: "1px solid #E9EEF5",
                    textDecoration: "none",
                    transition: "all 0.18s ease",
                    gap: "0.2rem"
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#EFF6FF"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#BFDBFE"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAFC"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E9EEF5"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>{item.name}</span>
                    {item.tag && (
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "0.3rem", lineHeight: 1.4 }}>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "76px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 9998,
          overflowY: "auto",
          padding: "1.5rem 1.25rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem"
        }}>
          {["solutions", "capabilities", "specialised", "proof"].map((catKey) => {
            const labelMap: Record<string, string> = {
              solutions: "Solutions",
              capabilities: "Capabilities",
              specialised: "Specialised",
              proof: "Proof & Knowledge"
            };
            const isExpanded = expandedMobileCategory === catKey;

            return (
              <div key={catKey} style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "0.85rem 1rem",
                transition: "all 0.2s ease"
              }}>
                <button
                  onClick={() => toggleMobileCategory(catKey)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "#0F172A",
                    fontSize: "0.98rem",
                    fontWeight: 800,
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: isExpanded ? "#2563EB" : "#94A3B8" }} />
                    {labelMap[catKey]}
                  </span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2563EB" }}>
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.86rem", paddingTop: "0.86rem", borderTop: "1px solid #E2E8F0" }}>
                    {megaMenuData[catKey]?.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                          padding: "0.75rem 0.85rem",
                          background: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          borderRadius: "10px",
                          textDecoration: "none",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#0F172A", fontSize: "0.9rem", fontWeight: 700 }}>{item.name}</span>
                          {item.tag && (
                            <span style={{ fontSize: "0.65rem", fontWeight: 800, padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(37,99,235,0.1)", color: "#2563EB" }}>
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <span style={{ color: "#64748B", fontSize: "0.78rem", lineHeight: 1.4 }}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={() => { setMobileOpen(false); onOpenDiagnostic(); }}
            style={{
              width: "100%",
              marginTop: "0.5rem",
              height: "50px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFF",
              fontWeight: 800,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)"
            }}
          >
            Request a Commerce Diagnostic →
          </button>
        </div>
      )}
    </header>
  );
}
