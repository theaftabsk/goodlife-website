"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      height: "76px",
      background: "rgba(6, 11, 26, 0.94)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      zIndex: 9999
    }}>
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Brand Logo - Clean Typography */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.8px", color: "#FFF", display: "block", lineHeight: 1 }}>GOOD LIFE</span>
          <span style={{ fontSize: "0.62rem", letterSpacing: "1.8px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Commerce Partner</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "flex", gap: "2.2rem", alignItems: "center" }} className="desktop-nav">
          <div
            onMouseEnter={() => setActiveMenu("solutions")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "solutions" ? "#38BDF8" : "#E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Solutions <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>▾</span>
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("capabilities")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "capabilities" ? "#38BDF8" : "#E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Capabilities <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>▾</span>
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("specialised")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "specialised" ? "#38BDF8" : "#E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Specialised <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>▾</span>
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("proof")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "proof" ? "#38BDF8" : "#E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Proof & Knowledge <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>▾</span>
            </span>
          </div>
        </nav>

        {/* Primary CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={onOpenDiagnostic} className="hero-cta-btn desktop-cta-only" style={{ height: "44px", fontSize: "0.85rem", padding: "0 1.25rem", borderRadius: "10px" }}>
            Request a Commerce Diagnostic
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFF",
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              cursor: "pointer"
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
            top: "76px",
            left: 0,
            right: 0,
            background: "rgba(6, 11, 26, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            padding: "2rem 0 2.5rem"
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
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>{item.name}</span>
                    {item.tag && (
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8" }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#9CA3AF", marginTop: "0.3rem", lineHeight: 1.4 }}>{item.desc}</span>
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
          background: "#060B1A",
          zIndex: 9998,
          overflowY: "auto",
          padding: "1.5rem 1.25rem 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {["solutions", "capabilities", "specialised", "proof"].map((catKey) => (
            <div key={catKey} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.8rem" }}>
              <button
                onClick={() => toggleMobileCategory(catKey)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#38BDF8",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "0.5rem 0"
                }}
              >
                {catKey === "proof" ? "Proof & Knowledge" : catKey}
                <span>{expandedMobileCategory === catKey ? "−" : "+"}</span>
              </button>

              {expandedMobileCategory === catKey && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.6rem", paddingLeft: "0.5rem" }}>
                  {megaMenuData[catKey]?.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ color: "#E5E7EB", textDecoration: "none", fontSize: "0.92rem", fontWeight: 500 }}
                    >
                      ✦ {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => { setMobileOpen(false); onOpenDiagnostic(); }}
            className="hero-cta-btn"
            style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }}
          >
            Request a Commerce Diagnostic
          </button>
        </div>
      )}
    </header>
  );
}
