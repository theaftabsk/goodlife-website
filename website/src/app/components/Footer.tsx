"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer({ hideTopBanner = false }: { hideTopBanner?: boolean } = {}) {
  return (
    <footer style={{ width: "100%", fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}>
      <style>{`
        .footer-top-banner {
          padding: 7rem 6%;
        }
        .footer-heading {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 1.2rem;
        }
        .footer-subtext {
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
        }
        .footer-bottom-grid {
          padding: 6rem 6% 3rem 6%;
          grid-template-columns: 1fr 1fr 1fr 1.2fr;
          gap: 4rem;
        }
        .footer-links-col {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 992px) {
          .footer-bottom-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            padding: 4rem 6% 2rem 6%;
          }
        }
        @media (max-width: 768px) {
          .footer-top-banner {
            padding: 4rem 6%;
            text-align: center;
          }
          .footer-heading {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          .footer-subtext {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
          }
          .footer-bottom-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 3rem 6% 2rem 6%;
          }
          .footer-col-title {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
      
      {/* ── TOP BANNER SECTION ── */}
      {!hideTopBanner && (
        <div className="footer-top-banner" style={{
          position: "relative",
          backgroundColor: "#0F172A", 
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
          <h2 className="footer-heading" style={{ 
            fontWeight: 400, 
            fontFamily: "var(--font-display, serif)",
            lineHeight: 1.1,
            color: "#FFFFFF"
          }}>
            Grow your ecommerce<br />business with us
          </h2>
          <p className="footer-subtext" style={{ 
            lineHeight: 1.6, 
            color: "#CBD5E1", 
            fontWeight: 400
          }}>
            Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.
          </p>
          <button 
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                const btn = document.querySelector(".nav-diagnostic-btn") as HTMLButtonElement | null;
                if (btn) btn.click();
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              color: "#FFFFFF",
              padding: "0 2.2rem",
              height: "48px",
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "4px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.borderColor = "#2563EB";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#FFFFFF";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            UNLOCK YOUR GROWTH →
          </button>
        </div>
      </div>
      )}

      {/* ── BOTTOM LINKS SECTION (Solid Dark Slate Background) ── */}
      <div className="footer-bottom-grid" style={{
        backgroundColor: "#020617",
        color: "#F1F5F9",
        display: "grid"
      }}>
        
        <div style={{ 
          display: "contents"
        }}>
          
          {/* Column 1: Contact Info */}
          <div>
            <h4 className="footer-col-title" style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, marginBottom: "1.8rem", letterSpacing: "0.5px" }}>
              Registered Office
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.85rem", lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: "#94A3B8" }}>Direct Line: <strong style={{ color: "#F1F5F9" }}>022 1234 5678</strong></p>
              <p style={{ margin: 0, color: "#94A3B8" }}>Inquiry: <strong style={{ color: "#F1F5F9" }}>hello@goodlifesutra.com</strong></p>
              <p style={{ margin: 0, marginTop: "0.5rem", color: "#94A3B8" }}>
                GOOD LIFE SUTRA PVT. LTD.<br/>
                CIN: U74999MH2021PTC368942<br/>
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Column 2: Solutions & Specialised */}
          <div className="footer-nav-col">
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, marginBottom: "1.8rem", letterSpacing: "0.5px" }}>
              Solutions & Specialised
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li><Link href="/solutions/launch-online">Launch Online</Link></li>
              <li><Link href="/solutions/fix-and-grow">Fix & Grow</Link></li>
              <li><Link href="/solutions/scale-pan-india">Scale Pan-India</Link></li>
              <li><Link href="/specialised/heavy-bulky-commerce">Heavy & Bulky Commerce</Link></li>
              <li><Link href="/specialised/fulfilment-network">Fulfilment Network Map</Link></li>
              <li><Link href="/specialised/agency-partner">Agency Partner Program</Link></li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="footer-nav-col">
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, marginBottom: "1.8rem", letterSpacing: "0.5px" }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li><Link href="/capabilities/marketplace-operations">Marketplace Operations</Link></li>
              <li><Link href="/capabilities/marketplace-growth">Marketplace Growth & Ads</Link></li>
              <li><Link href="/capabilities/inventory-planning">Inventory & Stock Planning</Link></li>
              <li><Link href="/capabilities/warehousing-fulfilment">Warehousing & Fulfilment</Link></li>
              <li><Link href="/capabilities/revenue-assurance">Revenue Assurance & Audit</Link></li>
              <li><Link href="/capabilities/returns-operations">Returns & Reverse Ops</Link></li>
            </ul>
          </div>

          {/* Column 4: Authority & Governance */}
          <div className="footer-nav-col">
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, marginBottom: "1.8rem", letterSpacing: "0.5px" }}>
              Authority & Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li><Link href="/about">About Good Life</Link></li>
              <li><Link href="/case-studies">Case Studies & Proof</Link></li>
              <li><Link href="/insights">Insights & Knowledge</Link></li>
              <li><Link href="/contact">Executive Contact</Link></li>
              <li><Link href="/faqs">Verified FAQs</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1.8rem" }}>
              Newsletter
            </h4>
            <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Be the first to hear about our latest ecommerce insights.
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
