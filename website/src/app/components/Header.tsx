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

  const megaMenuData: Record<string, { name: string; href: string; desc: string }[]> = {
    solutions: [
      { name: "Launch Online", href: "/solutions/launch-online", desc: "Multi-marketplace onboarding & setup" },
      { name: "Fix & Grow", href: "/solutions/fix-and-grow", desc: "Optimize listings, margin & ad performance" },
      { name: "Scale Pan-India", href: "/solutions/scale-pan-india", desc: "12-state warehouse distribution & stock placement" },
      { name: "Brand Launch & Incubation", href: "/brand-launch-incubation", desc: "From OEM capability to direct consumer brand" },
      { name: "D2C Commerce Operations", href: "/d2c-commerce-operations", desc: "End-to-end store ops, orders & reverse logistics" }
    ],
    capabilities: [
      { name: "Marketplace Operations", href: "/capabilities/marketplace-operations", desc: "Listing, cataloguing & account controls" },
      { name: "Marketplace Growth & Ads", href: "/capabilities/marketplace-growth", desc: "Established Amazon & Flipkart performance ad ops" },
      { name: "Inventory Planning", href: "/capabilities/inventory-planning", desc: "Multi-channel allocation & stock buffers" },
      { name: "Fulfilment & Warehousing", href: "/capabilities/warehousing-fulfilment", desc: "12-state CNF-style regional warehouse network" },
      { name: "Revenue Assurance", href: "/capabilities/revenue-assurance", desc: "Platform settlement & commission auditing" },
      { name: "Returns Management", href: "/capabilities/returns-operations", desc: "RTO reduction & reverse logistics QC" },
      { name: "Multi-Platform Commerce", href: "/multi-platform-commerce", desc: "Amazon, Flipkart, Myntra, Moglix, JioMart, etc." },
      { name: "B2B & Institutional Commerce", href: "/b2b-institutional-commerce", desc: "Corporate, bulk, & regional dealer replenishment" }
    ],
    specialised: [
      { name: "Heavy & Bulky Commerce", href: "/specialised/heavy-bulky-commerce", desc: "Specialized logistics for large appliances & furniture" },
      { name: "Fulfilment Network", href: "/specialised/fulfilment-network", desc: "Interactive 12-state warehouse hub map" },
      { name: "Agency Partners", href: "/specialised/agency-partner", desc: "Strategic growth & branding partner network" }
    ],
    proof: [
      { name: "Case Studies", href: "/case-studies", desc: "5-brand launch & multi-channel success stories" },
      { name: "Insights & Journal", href: "/insights", desc: "Commerce operating strategy & market reports" },
      { name: "About Good Life", href: "/about", desc: "India's premier commerce operating partner" },
      { name: "Contact Team", href: "/contact", desc: "Executive business inquiry & office info" }
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
      background: "rgba(8, 12, 20, 0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      zIndex: 9999
    }}>
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/gl-icon.svg" alt="Good Life Logo" width={34} height={34} priority />
          <div>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "0.5px", color: "#FFF", display: "block", lineHeight: 1 }}>GOOD LIFE</span>
            <span style={{ fontSize: "0.62rem", letterSpacing: "1.8px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Commerce Partner</span>
          </div>
        </Link>

        {/* Desktop Navigation links */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          <div
            onMouseEnter={() => setActiveMenu("solutions")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "solutions" ? "#38BDF8" : "#E5E7EB", cursor: "pointer" }}>
              Solutions ▾
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("capabilities")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "capabilities" ? "#38BDF8" : "#E5E7EB", cursor: "pointer" }}>
              Capabilities ▾
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("specialised")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "specialised" ? "#38BDF8" : "#E5E7EB", cursor: "pointer" }}>
              Specialised ▾
            </span>
          </div>

          <div
            onMouseEnter={() => setActiveMenu("proof")}
            onMouseLeave={() => setActiveMenu(null)}
            style={{ position: "relative", padding: "1.5rem 0" }}
          >
            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: activeMenu === "proof" ? "#38BDF8" : "#E5E7EB", cursor: "pointer" }}>
              Proof & Knowledge ▾
            </span>
          </div>
        </nav>

        {/* Primary CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={onOpenDiagnostic} className="hero-cta-btn desktop-cta-only" style={{ height: "44px", fontSize: "0.85rem", padding: "0 1.2rem" }}>
            Request a Commerce Diagnostic
          </button>

          {/* Hamburger button for Mobile */}
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
        >
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {megaMenuData[activeMenu]?.map((item, idx) => (
                <Link key={idx} href={item.href} className="mega-item-link" onClick={() => setActiveMenu(null)}>
                  <span className="mega-item-name">{item.name}</span>
                  <span className="mega-item-desc">{item.desc}</span>
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
          background: "#080C14",
          zIndex: 9998,
          overflowY: "auto",
          padding: "1.5rem 1rem 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem"
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
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "0.5rem 0"
                }}
              >
                {catKey}
                <span>{expandedMobileCategory === catKey ? "−" : "+"}</span>
              </button>

              {expandedMobileCategory === catKey && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem", paddingLeft: "0.5rem" }}>
                  {megaMenuData[catKey]?.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ color: "#E5E7EB", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}
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
