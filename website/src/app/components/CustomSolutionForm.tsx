"use client";

import React, { useState } from "react";

export default function CustomSolutionForm({ onOpenDiag }: { onOpenDiag: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("Scale Pan-India");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const goalOptions = [
    "Scale Pan-India",
    "Fix & Grow Audit",
    "Launch Online",
    "Warehouse & Fulfilment",
    "Fee Leakage Recovery"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="custom-solutions"
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

      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        <div className="custom-solutions-grid">
          {/* Left Column: What Happens in Your Diagnostic */}
          <div>
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
              Next Steps • Concrete Diagnostic
            </span>

            <h2 style={{
              fontSize: "clamp(1.85rem, 2.8vw, 2.35rem)",
              fontWeight: 800,
              color: "#0B1736",
              letterSpacing: "-0.6px",
              lineHeight: 1.2,
              margin: "0 0 0.8rem"
            }}>
              What Happens in Your 45-Minute Growth Diagnostic?
            </h2>

            <p style={{
              fontSize: "0.95rem",
              color: "#64748B",
              lineHeight: 1.6,
              marginBottom: "1.8rem"
            }}>
              No generic sales pitches. Our senior marketplace operators review your active catalog, fee settlements, and fulfilment footprint before the call.
            </p>

            {/* 4 Step Diagnostic Deliverables */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2rem" }}>
              {[
                {
                  num: "01",
                  title: "Historical Fee Leakage Audit",
                  desc: "We analyze your settlement reports to quantify unreconciled claims, weight discrepancies, and overcharged commissions."
                },
                {
                  num: "02",
                  title: "Catalog Conversion & Buy Box Diagnostic",
                  desc: "Identify suppressed listings, broken variations, Buy Box leakage to unauthorized resellers, and missing A+ content."
                },
                {
                  num: "03",
                  title: "12-State Fulfilment & Delivery SLA Simulation",
                  desc: "Simulate shipping speed improvements and regional freight savings across our multi-state warehousing network."
                },
                {
                  num: "04",
                  title: "Actionable 90-Day Growth Playbook",
                  desc: "A concrete, customized roadmap outlining projected GMV uplift, required stock placement, and optimized TACoS targets."
                }
              ].map((step, sIdx) => (
                <div key={sIdx} style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "0.95rem 1.15rem",
                  display: "flex",
                  gap: "0.9rem",
                  alignItems: "flex-start",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  transition: "all 0.2s ease"
                }}>
                  <div style={{
                    fontSize: "0.82rem",
                    fontWeight: 900,
                    color: "#2563EB",
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    borderRadius: "8px",
                    padding: "0.22rem 0.55rem",
                    fontFamily: "monospace",
                    flexShrink: 0
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.94rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.18rem" }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenDiag}
              style={{
                height: "48px",
                padding: "0 1.8rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span>Book Growth Diagnostic Now →</span>
            </button>
          </div>

          {/* Right Column: Clean, Simple & Beautiful Custom Solution Form */}
          <div className="luxury-blue-glass form-box" style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.95) 50%, rgba(255, 255, 255, 1) 100%)",
            border: "1.5px solid rgba(191, 219, 254, 0.85)",
            borderRadius: "24px",
            padding: "2.4rem 2.2rem",
            boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)",
            position: "relative"
          }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                display: "inline-block",
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#2563EB",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                padding: "0.2rem 0.65rem",
                borderRadius: "99px",
                marginBottom: "0.5rem"
              }}>
                Tailored Engagements
              </div>
              <h3 style={{ fontSize: "1.55rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem", letterSpacing: "-0.4px" }}>
                Looking for Something Else?
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                Share your requirements. Our operating architects will prepare a customized proposal within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div style={{
                background: "#F0FDF4",
                border: "1.5px solid #86EFAC",
                borderRadius: "16px",
                padding: "2.2rem 1.5rem",
                textAlign: "center"
              }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "#16A34A",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.5rem",
                  boxShadow: "0 6px 16px rgba(22, 163, 74, 0.25)"
                }}>
                  ✓
                </div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#14532D", margin: "0 0 0.4rem" }}>
                  Request Received!
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#166534", margin: "0 0 1rem", lineHeight: 1.5 }}>
                  Thank you, <strong>{name || "Partner"}</strong>. Our senior commerce architect will review your requirement and reach out within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #86EFAC",
                    padding: "0.45rem 1rem",
                    borderRadius: "8px",
                    color: "#166534",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer"
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                
                {/* 1. Full Name */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 750, color: "#1E293B", marginBottom: "0.35rem" }}>
                    Your Full Name *
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      style={{
                        width: "100%",
                        height: "46px",
                        borderRadius: "12px",
                        border: "1.5px solid #E2E8F0",
                        padding: "0 1rem 0 2.4rem",
                        fontSize: "0.9rem",
                        color: "#0F172A",
                        outline: "none",
                        background: "#F8FAFC",
                        transition: "all 0.2s ease"
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* 2. Contact & Company in 2-Columns */}
                <div className="form-two-col" style={{ display: "grid", gap: "0.9rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 750, color: "#1E293B", marginBottom: "0.35rem" }}>
                      Work Email / Phone *
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      </span>
                      <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="email@company.com"
                        style={{
                          width: "100%",
                          height: "46px",
                          borderRadius: "12px",
                          border: "1.5px solid #E2E8F0",
                          padding: "0 1rem 0 2.4rem",
                          fontSize: "0.9rem",
                          color: "#0F172A",
                          outline: "none",
                          background: "#F8FAFC",
                          transition: "all 0.2s ease"
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 750, color: "#1E293B", marginBottom: "0.35rem" }}>
                      Brand / Company Name *
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                      </span>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Tech"
                        style={{
                          width: "100%",
                          height: "46px",
                          borderRadius: "12px",
                          border: "1.5px solid #E2E8F0",
                          padding: "0 1rem 0 2.4rem",
                          fontSize: "0.9rem",
                          color: "#0F172A",
                          outline: "none",
                          background: "#F8FAFC",
                          transition: "all 0.2s ease"
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Primary Goal (1-Tap Fast Selection Pills) */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 750, color: "#1E293B", marginBottom: "0.45rem" }}>
                    What is your primary focus?
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {goalOptions.map((goal) => {
                      const isSelected = selectedGoal === goal;
                      return (
                        <button
                          type="button"
                          key={goal}
                          onClick={() => setSelectedGoal(goal)}
                          style={{
                            padding: "0.35rem 0.8rem",
                            borderRadius: "99px",
                            fontSize: "0.78rem",
                            fontWeight: 750,
                            border: isSelected ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                            background: isSelected ? "#EFF6FF" : "#FFFFFF",
                            color: isSelected ? "#2563EB" : "#475569",
                            cursor: "pointer",
                            boxShadow: isSelected ? "0 2px 8px rgba(37, 99, 235, 0.15)" : "none",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {isSelected ? "✓ " : ""}{goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Brief Requirement (Single clean note) */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 750, color: "#1E293B", marginBottom: "0.35rem" }}>
                    Brief Requirement or Challenge (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need 12-state warehousing & Amazon/Blinkit ad management..."
                    style={{
                      width: "100%",
                      height: "46px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      padding: "0 1rem",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      outline: "none",
                      background: "#F8FAFC",
                      transition: "all 0.2s ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.94rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "0.2rem",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 14px 30px rgba(37, 99, 235, 0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.35)"; }}
                >
                  <span>Request Custom Solution →</span>
                </button>

                {/* Trust Line */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "0.74rem",
                  color: "#64748B",
                  marginTop: "0.1rem"
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>100% Confidential • Delivered within 24 Hours • No Obligation</span>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
