"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ width: "100%", fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}>
      
      {/* ── TOP BANNER SECTION ── */}
      <div style={{
        position: "relative",
        backgroundColor: "#0F172A", 
        padding: "7rem 6%",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}>
        {/* Blurred Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          transform: "scale(1.02)", // Prevents white edges from blur
          zIndex: 0
        }} />
        
        {/* Dark Deep Slate Overlay for Text Readability & Brand Matching */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          backgroundColor: "rgba(15, 23, 42, 0.55)", // Darkens the whole image
          backgroundImage: "linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, transparent 100%)", // Extra dark on left for text
          zIndex: 1 
        }} />
        
        <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
          <h4 style={{ 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            letterSpacing: "2.5px", 
            textTransform: "uppercase", 
            marginBottom: "1.2rem",
            color: "#E2E8F0"
          }}>
            Ready to Scale?
          </h4>
          <h2 style={{ 
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)", 
            fontWeight: 400, 
            fontFamily: "var(--font-display, serif)",
            lineHeight: 1.1,
            marginBottom: "1.2rem",
            color: "#FFFFFF"
          }}>
            Grow your commerce<br />business with us
          </h2>
          <p style={{ 
            fontSize: "1.05rem", 
            lineHeight: 1.6, 
            color: "#CBD5E1", 
            marginBottom: "2.5rem",
            fontWeight: 400
          }}>
            Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.
          </p>
          <Link 
            href="#revenue-assurance" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              color: "#FFFFFF",
              padding: "0 2.2rem",
              height: "48px",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "transparent"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.color = "#0F172A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            Request a Free Audit
          </Link>
        </div>
      </div>

      {/* ── BOTTOM LINKS SECTION (Solid Dark Slate Background) ── */}
      <div style={{ background: "#0B0F19", padding: "5rem 6% 2rem", color: "#94A3B8" }}>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "4rem",
          marginBottom: "5rem" 
        }}>
          
          {/* Column 1: Contact Info */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1.8rem" }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.85rem", lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>022 1234 5678</p>
              <p style={{ margin: 0 }}>hello@goodlifesutra.com</p>
              <p style={{ margin: 0, marginTop: "0.5rem" }}>
                GOOD LIFE SUTRA PVT. LTD.<br/>
                CIN: U74999MH2021PTC368942
              </p>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="footer-nav-col">
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1.8rem" }}>
              Solutions
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li><Link href="/solutions/marketplace">Marketplace Operations</Link></li>
              <li><Link href="/solutions/d2c">D2C Commerce</Link></li>
              <li><Link href="/solutions/b2b">B2B & Institutional</Link></li>
              <li><Link href="/capabilities/inventory">Inventory Planning</Link></li>
              <li><Link href="/capabilities/revenue">Revenue Assurance</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-nav-col">
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1.8rem" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1.8rem" }}>
              Newsletter
            </h4>
            <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Be the first to hear about our latest commerce insights.
            </p>
            <form style={{ display: "flex", borderBottom: "1px solid #525252", paddingBottom: "0.5rem" }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  color: "#FFFFFF", 
                  fontSize: "0.75rem", 
                  letterSpacing: "1px",
                  flex: 1, 
                  outline: "none" 
                }} 
              />
              <button 
                type="submit" 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  color: "#FFFFFF", 
                  cursor: "pointer", 
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0.5rem"
                }}
              >
                →
              </button>
            </form>
          </div>

        </div>

        {/* ── COPYRIGHT & SOCIALS ── */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderTop: "1px solid #1E293B",
          paddingTop: "2rem"
        }}>
          <div style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 500 }}>
            Copyright © 2026 Goodlife Sutra Pvt Ltd
          </div>
          
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" style={{ color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#94A3B8"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" style={{ color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#94A3B8"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

      </div>

      {/* Inline styles for hover effects in columns */}
      <style jsx>{`
        .footer-nav-col a {
          color: #94A3B8;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }
        .footer-nav-col a:hover {
          color: #FFFFFF;
        }
        @media (max-width: 768px) {
          .footer-nav-col {
            grid-column: span 2;
          }
        }
      `}</style>
    </footer>
  );
}
