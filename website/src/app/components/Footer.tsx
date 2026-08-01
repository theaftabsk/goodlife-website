"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#070B12", borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "4rem 0 2rem", color: "#9CA3AF" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", marginBottom: "3.5rem" }}>
          
          {/* Brand Info */}
          <div style={{ gridColumn: "span 2" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.2rem" }}>
              <Image src="/gl-icon.svg" alt="Good Life Logo" width={32} height={32} />
              <div>
                <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFF", display: "block" }}>GOOD LIFE</span>
                <span style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Commerce Operating Partner</span>
              </div>
            </Link>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#9CA3AF", maxWidth: "360px", marginBottom: "1.5rem" }}>
              India's premier Commerce Operating Partner helping brands launch, operate and scale across marketplaces, D2C, B2B, and institutional channels.
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
              <li><Link href="/#launch" style={{ color: "#9CA3AF", textDecoration: "none" }}>Launch Online</Link></li>
              <li><Link href="/#fix-grow" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fix & Grow Operations</Link></li>
              <li><Link href="/#scale" style={{ color: "#9CA3AF", textDecoration: "none" }}>Scale Pan-India</Link></li>
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
              <li><Link href="/#capabilities" style={{ color: "#9CA3AF", textDecoration: "none" }}>Marketplace Operations</Link></li>
              <li><Link href="/#growth" style={{ color: "#9CA3AF", textDecoration: "none" }}>Marketplace Growth & Ads</Link></li>
              <li><Link href="/multi-platform-commerce" style={{ color: "#38BDF8", fontWeight: 600, textDecoration: "none" }}>Multi-Platform Commerce</Link></li>
              <li><Link href="/b2b-institutional-commerce" style={{ color: "#38BDF8", fontWeight: 600, textDecoration: "none" }}>B2B & Institutional Commerce</Link></li>
              <li><Link href="/#inventory" style={{ color: "#9CA3AF", textDecoration: "none" }}>Inventory Planning</Link></li>
              <li><Link href="/#fulfilment" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fulfilment & Warehousing</Link></li>
              <li><Link href="/#revenue" style={{ color: "#9CA3AF", textDecoration: "none" }}>Revenue Assurance</Link></li>
            </ul>
          </div>

          {/* Specialised & Company */}
          <div>
            <h4 style={{ color: "#FFF", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "1.2rem" }}>
              Specialised & Knowledge
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link href="/#heavy-bulky" style={{ color: "#9CA3AF", textDecoration: "none" }}>Heavy & Bulky Commerce</Link></li>
              <li><Link href="/#network" style={{ color: "#9CA3AF", textDecoration: "none" }}>Fulfilment Network Map</Link></li>
              <li><Link href="/#case-studies" style={{ color: "#9CA3AF", textDecoration: "none" }}>Case Studies & Proof</Link></li>
              <li><Link href="/#about" style={{ color: "#9CA3AF", textDecoration: "none" }}>About Good Life</Link></li>
              <li><Link href="/#privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem" }}>
          <div>GOOD LIFE SUTRA PVT. LTD. • CIN: U74999MH2021PTC368942</div>
          <div>India's Accountable Commerce Operating Partner</div>
        </div>
      </div>
    </footer>
  );
}
