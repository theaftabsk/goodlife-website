"use client";

import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`header-bar ${scrolled ? "scrolled" : ""}`} style={{
      position: "fixed",
      top: scrolled ? "0px" : "18px",
      left: "50%",
      transform: "translateX(-50%)",
      width: scrolled ? "100%" : "calc(100% - 2.5rem)",
      maxWidth: scrolled ? "100%" : "1240px",
      height: scrolled ? "68px" : "74px",
      background: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: scrolled ? "0px" : "99px",
      border: scrolled ? "none" : "1px solid rgba(255, 255, 255, 0.8)",
      borderBottom: scrolled ? "1px solid rgba(15, 23, 42, 0.06)" : "1px solid rgba(255, 255, 255, 0.8)",
      boxShadow: scrolled ? "0 8px 30px rgba(15, 23, 42, 0.08)" : "0 12px 40px rgba(37, 99, 235, 0.07), 0 2px 6px rgba(15, 23, 42, 0.03)",
      zIndex: 9999,
      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      <div style={{ width: "100%", maxWidth: "1240px", margin: "0 auto", height: "100%", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Brand Logo (Left) */}
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }} className="header-logo-container">
          <Logo height={44} mode="light" />
        </Link>

        {/* Desktop Navigation Links (Option 1: Seamless Modern Glass + Bold Deep Slate) */}
        <nav style={{ display: "flex", gap: "0.4rem", alignItems: "center" }} className="desktop-nav">
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
                style={{ position: "relative", padding: "0.5rem 0" }}
              >
                <span style={{
                  fontSize: "0.93rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  color: isActive ? "#1D4ED8" : "#0F172A",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.5rem 1.15rem",
                  borderRadius: "99px",
                  background: isActive ? "rgba(37, 99, 235, 0.09)" : "transparent",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  userSelect: "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#1D4ED8";
                    e.currentTarget.style.background = "rgba(37, 99, 235, 0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#0F172A";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
                >
                  {labels[key]}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: isActive ? 1 : 0.6, transition: "transform 0.25s ease", transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            );
          })}
        </nav>

        {/* Primary Rounded Pill CTA (Right) + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onOpenDiagnostic}
            className="header-cta-button"
            style={{
              height: "46px",
              fontSize: "0.9rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              padding: "0 1.5rem",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(37, 99, 235, 0.32)",
              transition: "all 0.22s ease",
              whiteSpace: "nowrap"
            }}
          >
            <span className="cta-text-desktop">Request for a FREE AUDIT →</span>
            <span className="cta-text-mobile">Free Audit →</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              width: "44px",
              height: "44px",
              background: mobileOpen ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${mobileOpen ? "#BFDBFE" : "rgba(255, 255, 255, 0.5)"}`,
              color: mobileOpen ? "#2563EB" : "#0F172A",
              borderRadius: "14px",
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

      {/* Floating Glass Mega-Menu Overlay for Desktop */}
      {activeMenu && (
        <div
          className="mega-menu-overlay"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 2rem)",
            maxWidth: "1140px",
            background: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)",
            padding: "1.5rem"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {megaMenuData[activeMenu]?.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setActiveMenu(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.95rem 1.1rem",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.65)",
                  border: "1px solid rgba(226, 232, 240, 0.7)",
                  textDecoration: "none",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  gap: "0.25rem"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#EFF6FF";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#BFDBFE";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255, 255, 255, 0.65)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(226, 232, 240, 0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", fontFamily: "var(--font-display)" }}>{item.name}</span>
                  {item.tag && (
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "0.15rem 0.45rem", borderRadius: "6px", background: "rgba(37, 99, 235, 0.12)", color: "#2563EB" }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "0.81rem", color: "#64748B", marginTop: "0.2rem", lineHeight: 1.4, fontWeight: 500 }}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "70px",
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
