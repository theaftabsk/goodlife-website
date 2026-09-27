"use client";

import React from "react";

export default function ThirdPartyValidation({ onOpenDiag }: { onOpenDiag: () => void }) {
  return (
    <section
      id="third-party-validation"
      className="scroll-blur-reveal"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "5.5rem 1.5rem 6rem",
        borderTop: "1.5px solid rgba(191, 219, 254, 0.45)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="ambient-glow-orb-left" style={{ opacity: 0.5 }} />
      <div className="ambient-glow-orb-right" style={{ opacity: 0.55 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0.26rem 0.95rem",
            borderRadius: "99px",
            background: "rgba(239, 246, 255, 0.9)",
            border: "1px solid rgba(191, 219, 254, 0.8)",
            color: "#2563EB",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.08)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
            Third-Party Validation • Platform Certifications &amp; Governance
          </span>
          <h2 style={{
            fontSize: "clamp(1.95rem, 3vw, 2.6rem)",
            fontWeight: 800,
            color: "#0B1736",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 0.7rem"
          }}>
            Recognized Credentials &amp; Operator Leadership
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "#475569",
            maxWidth: "680px",
            margin: "0 auto",
            lineHeight: 1.65
          }}>
            Strong claims backed by verifiable partner accreditations, statutory compliance, and decade-long marketplace operating experience.
          </p>
        </div>

        {/* 6 Accreditations & Certifications Cards */}
        <div className="cert-badges-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "1.4rem",
          marginBottom: "3.5rem"
        }}>
          {[
            {
              badge: "Platform Verified",
              title: "Amazon SPN Verified Partner",
              issuer: "Amazon Service Provider Network",
              desc: "Formally vetted and verified by Amazon India across catalog management, account operations, Brand Registry, and FBA inbound compliance.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              ),
              status: "Active Verified Status"
            },
            {
              badge: "Official Partner",
              title: "Flipkart Commerce Ecosystem",
              issuer: "Flipkart Internet Pvt. Ltd.",
              desc: "Integrated operations across Flipkart Assured, smart warehouse fulfillment, festive big billion day staging, and brand health governance.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2874F0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12 6 15 11 20 12 16 16 17 21 12 18 7 21 8 16 4 12 9 11 12 6" />
                </svg>
              ),
              status: "Enterprise Enabler"
            },
            {
              badge: "Quality Standard",
              title: "ISO 9001:2015 Certified",
              issuer: "International Quality Management",
              desc: "Standardized warehouse SOPs, barcode-validated pick & pack processes, temperature logs, and documented reverse logistics QC.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ),
              status: "Certified Warehouse Operations"
            },
            {
              badge: "Statutory License",
              title: "FSSAI Warehouse Registration",
              issuer: "Food Safety and Standards Authority of India",
              desc: "Approved food-grade storage and packaging compliance across regional warehouse hubs for ambient consumer packaged goods and nutrition.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                </svg>
              ),
              status: "Licensed Food & Nutrition Grade"
            },
            {
              badge: "Corporate Governance",
              title: "CIN & GST Pan-India Entity",
              issuer: "Ministry of Corporate Affairs (MCA)",
              desc: "Fully registered Indian private limited entity with active GSTINs across 12 commercial states, transparent tax credits, and annual MCA audits.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              ),
              status: "100% Statutory Compliant"
            },
            {
              badge: "Logistics Alliance",
              title: "Multi-Carrier Enterprise SLA",
              issuer: "Shiprocket, Delhivery & Bluedart Enterprise",
              desc: "Priority line-haul truck routing, automated NDR (Non-Delivery Report) workflows, and daily automated API order sync.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              ),
              status: "Tier-1 Metro Sub-24hr SLA"
            }
          ].map((card, idx) => (
            <div key={idx} style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "18px",
              padding: "1.5rem",
              boxShadow: "0 3px 12px rgba(15, 23, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.25s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#93C5FD";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {card.icon}
                  </div>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#2563EB",
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    padding: "0.18rem 0.55rem",
                    borderRadius: "99px"
                  }}>
                    {card.badge}
                  </span>
                </div>

                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.25rem" }}>
                  {card.title}
                </h4>
                <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", marginBottom: "0.6rem" }}>
                  Issued by: {card.issuer}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                  {card.desc}
                </p>
              </div>

              <div style={{
                marginTop: "1.2rem",
                borderTop: "1px solid #F1F5F9",
                paddingTop: "0.75rem",
                fontSize: "0.74rem",
                fontWeight: 750,
                color: "#166534",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                {card.status}
              </div>
            </div>
          ))}
        </div>

        {/* Operator Leadership Team Profile Card — Luxury White Glass Executive Design */}
        <div
          className="luxury-blue-glass scroll-blur-reveal operator-leadership-card"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 247, 255, 0.9) 100%)",
            borderRadius: "28px",
            border: "1.5px solid rgba(191, 219, 254, 0.85)",
            padding: "2.8rem 2.8rem",
            color: "#0B1736",
            display: "grid",
            gap: "3rem",
            alignItems: "center",
            boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle Ambient Radial Light */}
          <div style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          {/* Left Column: Vision, Mission & 3 Denominator Metric Cards */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "0.26rem 0.9rem",
              borderRadius: "99px",
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              color: "#2563EB",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "0.85rem"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
              Operator Leadership • Execution Focused
            </span>

            <h3 style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              fontWeight: 900,
              color: "#0B1736",
              margin: "0 0 0.8rem",
              lineHeight: 1.22,
              letterSpacing: "-0.6px"
            }}>
              Led by Commerce Operators, <br />
              <span style={{
                background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0284C7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Not Marketing Theorists
              </span>
            </h3>

            <p style={{
              fontSize: "0.95rem",
              color: "#475569",
              lineHeight: 1.65,
              margin: "0 0 1.8rem",
              maxWidth: "580px"
            }}>
              GoodLife was built by operators who managed ₹850Cr+ in marketplace GMV and scaled consumer brands from single-city origins to 12-state nationwide supply chains.
            </p>

            {/* 3 Executive Denominator White Glass Pills */}
            <div className="operator-stats-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem"
            }}>
              {[
                {
                  value: "₹850Cr+",
                  label: "GMV Managed",
                  sub: "cumulative volume",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="20" x2="12" y2="10" />
                      <line x1="18" y1="20" x2="18" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="16" />
                    </svg>
                  )
                },
                {
                  value: "10+ Years",
                  label: "Domain Mastery",
                  sub: "operating depth",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )
                },
                {
                  value: "12 States",
                  label: "Warehousing Footprint",
                  sub: "regional hubs",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )
                }
              ].map((stat, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #DBEAFE",
                    borderRadius: "16px",
                    padding: "1.1rem 1.15rem",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.04)",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.borderColor = "#93C5FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#DBEAFE";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0B1736", lineHeight: 1 }}>
                      {stat.value}
                    </span>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563EB" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748B", marginTop: "2px" }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Executive Operating Commitment Card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #BFDBFE",
              borderRadius: "22px",
              padding: "2.2rem 2rem",
              boxShadow: "0 12px 32px rgba(37, 99, 235, 0.08)",
              position: "relative",
              zIndex: 2
            }}
          >
            {/* Quote Icon SVG */}
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
              border: "1px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 7 2 10 3 10Z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 7 2 10 3 10Z" />
              </svg>
            </div>

            <div style={{
              fontSize: "0.74rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#059669",
              marginBottom: "0.35rem"
            }}>
              Executive Operating Commitment
            </div>

            <h4 style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#0B1736",
              margin: "0 0 0.8rem",
              lineHeight: 1.3
            }}>
              Real Accountability On The Floor
            </h4>

            <p style={{
              fontSize: "0.92rem",
              color: "#334155",
              lineHeight: 1.6,
              margin: "0 0 1.5rem",
              fontStyle: "italic"
            }}>
              &ldquo;We don&apos;t just consult on slides. When an algorithm changes or a warehouse dock faces a festive bottleneck, our team is on the floor solving it with our own balance sheet and infrastructure.&rdquo;
            </p>

            <button
              onClick={onOpenDiag}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 22px rgba(37, 99, 235, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 22px rgba(37, 99, 235, 0.3)";
              }}
            >
              <span>Meet the Operating Team →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
