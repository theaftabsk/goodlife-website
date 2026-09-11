"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  onOpenDiagnostic: () => void;
}

export default function Header({ onOpenDiagnostic }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (menuKey: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const megaMenuData: Record<string, { name: string; href: string; desc: string; tag?: string }[]> = {
    solutions: [
      { name: "Launch Online", href: "/solutions/launch-online", desc: "For offline brands entering marketplaces for the first time" },
      { name: "Fix & Grow", href: "/solutions/fix-and-grow", desc: "For brands already selling online but losing growth & margin" },
      { name: "Scale Pan-India", href: "/solutions/scale-pan-india", desc: "12-state regional warehouse expansion & next-day delivery" }
    ],
    capabilities: [
      { name: "Marketplace Operations", href: "/capabilities/marketplace-operations", desc: "Catalogue management, SLA compliance & Buybox control" },
      { name: "Marketplace Growth & Ads", href: "/capabilities/marketplace-growth", desc: "Amazon PPC, Flipkart PLA & profit-guarded ad scaling" },
      { name: "Inventory & Stock Planning", href: "/capabilities/inventory-planning", desc: "Predictive run-rates, buffer stock alerts & zero stockouts" },
      { name: "Warehousing & Fulfilment", href: "/capabilities/warehousing-fulfilment", desc: "12 managed regional warehouse hubs & sub-4hr dispatch" },
      { name: "Revenue Assurance & Reconciliation", href: "/capabilities/revenue-assurance", desc: "Daily settlement audits, fee dispute recovery & claim filing" },
      { name: "Returns & Reverse Operations", href: "/capabilities/returns-operations", desc: "Reverse logistics, warehouse QC inspection & SAFE-T claims" }
    ],
    specialised: [
      { name: "Heavy & Bulky Commerce", href: "/specialised/heavy-bulky-commerce", desc: "Dedicated logistics for fans, chimneys, water heaters & large appliances" },
      { name: "Fulfilment Network Map", href: "/specialised/fulfilment-network", desc: "Interactive India map preview of 12 regional warehouse hubs" },
      { name: "Agency & Consultant Partner", href: "/specialised/agency-partner", desc: "Acquisition channel & operational execution for partner agencies" }
    ],
    proof: [
      { name: "Case Studies", href: "/case-studies", desc: "Approved client performance & verified GMV proof stories" },
      { name: "Insights & Blog", href: "/insights", desc: "Ecommerce operating strategy, unit economics & industry reports" },
      { name: "About Good Life", href: "/about", desc: "Company story, leadership team & operator credibility" },
      { name: "Executive Contact", href: "/contact", desc: "Direct business enquiry & registered office details" }
    ]
  };

  const toggleMobileCategory = (cat: string) => {
    setExpandedMobileCategory(expandedMobileCategory === cat ? null : cat);
  };

  return (
    <header ref={headerRef} className={`header-bar ${scrolled ? "scrolled" : ""}`} style={{
      position: "fixed",
      top: scrolled ? "10px" : "14px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "calc(100% - 2rem)",
      maxWidth: scrolled ? "1160px" : "1240px",
      height: scrolled ? "64px" : "70px",
      background: "rgba(255, 255, 255, 0.94)",
      backdropFilter: "blur(24px) saturate(190%)",
      WebkitBackdropFilter: "blur(24px) saturate(190%)",
      borderRadius: "999px",
      border: "1.5px solid rgba(226, 232, 240, 0.95)",
      boxShadow: scrolled
        ? "0 18px 45px rgba(15, 23, 42, 0.10), 0 4px 16px rgba(37, 99, 235, 0.08)"
        : "0 10px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)",
      zIndex: 9999,
      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: scrolled ? "1140px" : "1220px",
        margin: "0 auto",
        height: "100%",
        padding: "0 1.6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        
        {/* Brand Logo (Left) — smooth liquid scale */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            transform: scrolled ? "scale(0.94)" : "scale(1)",
            transformOrigin: "left center",
            transition: "transform 0.35s ease"
          }}
          className="header-logo-container"
        >
          <Logo height={42} mode="light" />
        </Link>

        {/* Desktop Navigation Links — Liquid glass pills */}
        <nav style={{ display: "flex", gap: "0.35rem", alignItems: "center" }} className="desktop-nav">
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
                onMouseEnter={() => handleMenuEnter(key)}
                onMouseLeave={handleMenuLeave}
                onClick={() => {
                  if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                  setActiveMenu(activeMenu === key ? null : key);
                }}
                style={{ position: "relative", padding: "0.4rem 0" }}
              >
                <span style={{
                  fontSize: scrolled ? "0.94rem" : "0.96rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: isActive ? "#1D4ED8" : "#0F172A",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: scrolled ? "0.45rem 1.05rem" : "0.5rem 1.2rem",
                  borderRadius: "999px",
                  background: isActive ? "rgba(37, 99, 235, 0.10)" : "transparent",
                  border: isActive ? "1px solid rgba(191, 219, 254, 0.8)" : "1px solid transparent",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  userSelect: "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#1D4ED8";
                    e.currentTarget.style.background = "rgba(37, 99, 235, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(191, 219, 254, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#0F172A";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
                >
                  {labels[key]}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: isActive ? 1 : 0.65, transition: "transform 0.25s ease", transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            );
          })}
        </nav>

        {/* Primary Rounded Pill CTA (Desktop Only) + Animated Minimal Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onOpenDiagnostic}
            className="header-cta-button desktop-cta-only"
            style={{
              height: scrolled ? "38px" : "40px",
              fontSize: "0.82rem",
              fontWeight: 750,
              letterSpacing: "0.3px",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              padding: scrolled ? "0 1.15rem" : "0 1.35rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
              transition: "all 0.22s ease",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.42), inset 0 1px 1px rgba(255, 255, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.35)";
            }}
          >
            <span>UNLOCK YOUR GROWTH →</span>
          </button>

          {/* Animated Minimal Hamburger Button (Untitled UI style) */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: mobileOpen ? "#F2F4F7" : "transparent",
              border: `1px solid ${mobileOpen ? "#E4E7EC" : "transparent"}`,
              color: "#344054",
              cursor: "pointer",
              position: "relative",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "0",
              transition: "all 0.22s ease"
            }}
          >
            <span style={{
              width: "20px",
              height: "2px",
              borderRadius: "2px",
              background: "#344054",
              transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
              transformOrigin: "center",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none"
            }} />
            <span style={{
              width: "20px",
              height: "2px",
              borderRadius: "2px",
              background: "#344054",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scale(0)" : "none"
            }} />
            <span style={{
              width: "20px",
              height: "2px",
              borderRadius: "2px",
              background: "#344054",
              transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
              transformOrigin: "center",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none"
            }} />
          </button>
        </div>
      </div>

      {/* Floating Liquid Glass Mega-Menu Overlay for Desktop */}
      {activeMenu && (
        <div
          className="mega-menu-overlay"
          onMouseEnter={() => {
            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
          }}
          onMouseLeave={handleMenuLeave}
          style={{
            position: "absolute",
            top: "calc(100% + 14px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 1.5rem)",
            maxWidth: "960px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            borderRadius: "26px",
            border: "1.5px solid rgba(226, 232, 240, 0.95)",
            boxShadow: "0 28px 70px rgba(15, 23, 42, 0.16), 0 4px 18px rgba(37, 99, 235, 0.08)",
            padding: "1.6rem 1.8rem",
            zIndex: 9999
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: activeMenu === "capabilities" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
            gap: "0.85rem"
          }}>
            {megaMenuData[activeMenu]?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setActiveMenu(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.95rem 1.1rem",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.55)",
                  border: "1px solid rgba(226, 232, 240, 0.75)",
                  textDecoration: "none",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  gap: "0.25rem"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(239, 246, 255, 0.95)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#93C5FD";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 20px rgba(37, 99, 235, 0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255, 255, 255, 0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(226, 232, 240, 0.75)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
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

      {/* ── UNTITLED UI WHITE THEME FULL-SCREEN MOBILE MENU ── */}
      {mobileOpen && (
        <div
          className="white-fullscreen-menu"
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            height: "100dvh",
            background: "#FFFFFF",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fullScreenFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Top Sticky Header Bar: Logo on Left, Close '✕' on Right */}
          <div style={{
            width: "100%",
            height: "64px",
            padding: "0 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EAECF0",
            background: "#FFFFFF",
            flexShrink: 0
          }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              <Logo height={34} mode="light" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "#F2F4F7",
                border: "1px solid #EAECF0",
                color: "#344054",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.16s ease"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable Body Container (Centered with refined, compact zoom-out typography) */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "0.85rem 1.25rem 2.2rem"
          }}>
            <div style={{
              maxWidth: "520px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem"
            }}>

              {/* Primary Nav Accordions */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {(["solutions", "capabilities", "specialised", "proof"] as const).map((catKey) => {
                  const labelMap: Record<string, string> = {
                    solutions: "Solutions",
                    capabilities: "Capabilities",
                    specialised: "Specialised",
                    proof: "Proof & Resources"
                  };
                  const isExpanded = expandedMobileCategory === catKey;

                  return (
                    <div key={catKey} style={{ borderBottom: "1px solid #F2F4F7", paddingBottom: "0.15rem" }}>
                      <button
                        onClick={() => toggleMobileCategory(catKey)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          color: isExpanded ? "#2563EB" : "#1D2939",
                          fontSize: "0.96rem",
                          fontWeight: 600,
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          padding: "0.7rem 0.25rem",
                          borderRadius: "8px",
                          transition: "color 0.18s ease"
                        }}
                      >
                        <span>{labelMap[catKey]}</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            color: isExpanded ? "#2563EB" : "#98A2B3",
                            transition: "transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.35rem",
                          padding: "0.2rem 0.2rem 0.6rem 0.35rem",
                          animation: "whiteAccordionFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                        }}>
                          {megaMenuData[catKey]?.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.1rem",
                                padding: "0.55rem 0.7rem",
                                borderRadius: "8px",
                                background: "#F9FAFB",
                                border: "1px solid #EAECF0",
                                textDecoration: "none",
                                transition: "all 0.16s ease"
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "#101828", fontSize: "0.86rem", fontWeight: 700 }}>{item.name}</span>
                                {item.tag && (
                                  <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "0.1rem 0.35rem", borderRadius: "4px", background: "rgba(37,99,235,0.1)", color: "#2563EB" }}>
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <span style={{ color: "#667085", fontSize: "0.74rem", lineHeight: 1.35 }}>{item.desc}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Direct Link: Pan-India 12 Hubs Map */}
                <Link
                  href="/specialised/fulfilment-network"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.7rem 0.25rem",
                    color: "#1D2939",
                    fontSize: "0.96rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderBottom: "1px solid #F2F4F7"
                  }}
                >
                  <span>Pan-India 12 Hubs Map</span>
                  <span style={{ fontSize: "0.66rem", fontWeight: 700, color: "#12B76A", background: "#ECFDF3", padding: "0.12rem 0.45rem", borderRadius: "999px" }}>
                    12 Active
                  </span>
                </Link>
              </nav>

              {/* 2-Column Clean Secondary Links Grid (Untitled UI style) */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.1rem",
                padding: "1rem 0.25rem 0.85rem",
                marginTop: "0.5rem",
                borderTop: "1px solid #EAECF0"
              }}>
                {/* Column 1 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <Link href="/about" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    About us
                  </Link>
                  <Link href="/case-studies" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Case Studies
                  </Link>
                  <Link href="/insights" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Insights & Blog
                  </Link>
                  <Link href="/specialised/heavy-bulky-commerce" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Bulky Commerce
                  </Link>
                </div>

                {/* Column 2 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <Link href="/specialised/fulfilment-network" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Warehouse Network
                  </Link>
                  <Link href="/specialised/agency-partner" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Partner Network
                  </Link>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ color: "#475467", fontSize: "0.84rem", fontWeight: 500, textDecoration: "none" }}>
                    Support & Contact
                  </Link>
                  <a href="tel:02212345678" style={{ color: "#2563EB", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none" }}>
                    022 1234 5678
                  </a>
                </div>
              </div>

              {/* Bottom Stacked Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                {/* Primary Dark Button: Get started */}
                <button
                  onClick={() => { setMobileOpen(false); onOpenDiagnostic(); }}
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: "9px",
                    background: "#0F172A",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                    transition: "background 0.18s ease"
                  }}
                >
                  <span>Get started</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Secondary White Button: Strategy Call */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: "9px",
                    background: "#FFFFFF",
                    border: "1px solid #D0D5DD",
                    color: "#344054",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                    transition: "all 0.18s ease"
                  }}
                >
                  Book Strategy Call
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modern Responsive Styles & Smooth Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .header-bar {
          transition: top 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.35s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }

        .mega-menu-overlay {
          animation: liquidDrop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes liquidDrop {
          0% {
            opacity: 0;
            transform: translate(-50%, -8px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }

        @keyframes fullScreenFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes whiteAccordionFade {
          0% {
            opacity: 0;
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fully Responsive Navbar Breakpoint: 1024px */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .header-cta-button,
          .desktop-cta-only {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
      `,
        }}
      />
    </header>
  );
}
