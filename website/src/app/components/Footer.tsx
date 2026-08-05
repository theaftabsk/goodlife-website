"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#070B12", borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "4rem 0 2rem", color: "#9CA3AF" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", marginBottom: "3.5rem" }}>
          
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.2rem" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "0.8px", color: "#FFF", display: "block" }}>GOOD LIFE</span>
            </Link>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#9CA3AF", maxWidth: "360px", marginBottom: "1.5rem" }}>
              India&apos;s premier Commerce Operating Partner helping brands launch, operate and scale across marketplaces, D2C, B2B, and institutional channels.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#6B7280" }}>
              © 2026 GOOD LIFE SUTRA PVT. LTD. All rights reserved.
            </div>
          </div>

          {/* Solutions Navigation */}
          <div>
            <h4 style={{ color: "#FFF", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "1.2rem" }}>
              Solutions
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link href="/solutions/launch-online" style={{ color: "#9CA3AF", textDecoration: "none" }}>Launch Online</Link></li>
              <li><Link href="/solutions/fix-and-grow" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fix & Grow Operations</Link></li>
              <li><Link href="/solutions/scale-pan-india" style={{ color: "#9CA3AF", textDecoration: "none" }}>Scale Pan-India</Link></li>
              <li><Link href="/brand-launch-incubation" style={{ color: "#38BDF8", fontWeight: 600, textDecoration: "none" }}>Brand Launch & Incubation</Link></li>
              <li><Link href="/d2c-commerce-operations" style={{ color: "#60A5FA", fontWeight: 600, textDecoration: "none" }}>D2C Commerce Operations</Link></li>
            </ul>
          </div>

          {/* Capabilities Navigation */}
          <div>
            <h4 style={{ color: "#FFF", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "1.2rem" }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link href="/capabilities/marketplace-operations" style={{ color: "#9CA3AF", textDecoration: "none" }}>Marketplace Operations</Link></li>
              <li><Link href="/capabilities/marketplace-growth" style={{ color: "#9CA3AF", textDecoration: "none" }}>Marketplace Growth & Ads</Link></li>
              <li><Link href="/multi-platform-commerce" style={{ color: "#38BDF8", fontWeight: 600, textDecoration: "none" }}>Multi-Platform Commerce</Link></li>
              <li><Link href="/b2b-institutional-commerce" style={{ color: "#38BDF8", fontWeight: 600, textDecoration: "none" }}>B2B & Institutional Commerce</Link></li>
              <li><Link href="/capabilities/inventory-planning" style={{ color: "#9CA3AF", textDecoration: "none" }}>Inventory Planning</Link></li>
              <li><Link href="/capabilities/warehousing-fulfilment" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fulfilment & Warehousing</Link></li>
              <li><Link href="/capabilities/revenue-assurance" style={{ color: "#9CA3AF", textDecoration: "none" }}>Revenue Assurance</Link></li>
            </ul>
          </div>

          {/* Specialised & Company */}
          <div>
            <h4 style={{ color: "#FFF", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "1.2rem" }}>
              Specialised & Knowledge
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link href="/specialised/heavy-bulky-commerce" style={{ color: "#9CA3AF", textDecoration: "none" }}>Heavy & Bulky Commerce</Link></li>
              <li><Link href="/specialised/fulfilment-network" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fulfilment Network Map</Link></li>
              <li><Link href="/case-studies" style={{ color: "#9CA3AF", textDecoration: "none" }}>Case Studies & Proof</Link></li>
              <li><Link href="/about" style={{ color: "#9CA3AF", textDecoration: "none" }}>About Good Life</Link></li>
              <li><Link href="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem" }}>
          <div>GOOD LIFE SUTRA PVT. LTD. • CIN: U74999MH2021PTC368942</div>
          <div>India&apos;s Accountable Commerce Operating Partner</div>
        </div>
      </div>
    </footer>
  );
}
