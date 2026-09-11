"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function ContactPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    category: "Appliances & Consumer Electronics",
    gmvBand: "₹10 Lakh - ₹50 Lakh / mo",
    primaryNeed: "Warehousing & Pan-India Fulfilment",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className={`contact-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Executive Contact</span>
          </div>

          <div style={{ maxWidth: "880px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              color: "#1D4ED8",
              fontSize: "0.82rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              Enterprise Enquiries • Direct Operator Access
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Initiate a Direct Commerce Mandate: <br />
              <span style={{ color: "#2563EB" }}>Speak with Our Leadership Team</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
              maxWidth: "800px",
              fontWeight: 500
            }}>
              Whether you are an established enterprise brand launching online, seeking to eliminate warehouse stockouts, or recovering leaked marketplace margins—our executive team reviews every enquiry within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section style={{ padding: "4.5rem 0 6rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: "3.5rem", alignItems: "start" }} className="contact-grid-responsive">
            
            {/* Form Column */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "2.8rem",
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 14px 40px rgba(15, 23, 42, 0.05)"
            }}>
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.4rem" }}>
                      Submit a Qualified Business Enquiry
                    </h2>
                    <p style={{ fontSize: "0.88rem", color: "#64748B", margin: 0, fontWeight: 500 }}>
                      Complete this form for a prompt executive evaluation and solution design discussion.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                    {/* 1. Comp Name */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Company / Brand Name <span style={{ color: "#2563EB" }}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Prestige Home Appliances / Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ width: "100%", height: "48px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", background: "#F8FAFC", fontSize: "0.92rem", color: "#0F172A", outline: "none" }}
                      />
                    </div>

                    {/* 2. Person Name */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Contact Person Name <span style={{ color: "#2563EB" }}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: "100%", height: "48px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", background: "#F8FAFC", fontSize: "0.92rem", color: "#0F172A", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                    {/* 3. WhatsApp No */}
                    <div>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        <span>WhatsApp Number <span style={{ color: "#2563EB" }}>*</span></span>
                        <span style={{ fontSize: "0.68rem", color: "#16A34A", background: "#DCFCE7", padding: "1px 6px", borderRadius: "999px", fontWeight: 800 }}>Fast Response</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: "100%", height: "48px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", background: "#F8FAFC", fontSize: "0.92rem", color: "#0F172A", outline: "none" }}
                      />
                    </div>

                    {/* 4. Email ID */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                        Official Email ID <span style={{ color: "#2563EB" }}>*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="rajesh@brandname.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: "100%", height: "48px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", background: "#F8FAFC", fontSize: "0.92rem", color: "#0F172A", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                      Brief Operational Context or Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share current monthly volume, launch timeline, or specific channels..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", background: "#F8FAFC", fontSize: "0.92rem", color: "#0F172A", outline: "none", resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      height: "54px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                      marginTop: "0.5rem"
                    }}
                  >
                    <span>SUBMIT ENQUIRY & SCHEDULE DISCUSSION</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <div style={{ fontSize: "0.78rem", color: "#64748B", textAlign: "center", fontWeight: 500 }}>
                    We respect your privacy. Non-disclosure agreement (NDA) available upon request prior to confidential data sharing.
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#DCFCE7",
                    color: "#15803D",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem"
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.6rem" }}>
                    Enquiry Received Successfully
                  </h3>
                  <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.6, maxWidth: "500px", margin: "0 auto 2rem" }}>
                    Thank you, <strong>{formData.name}</strong>. An executive partner from Good Life Sutra will review your brand details and contact you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    style={{
                      height: "46px",
                      padding: "0 1.8rem",
                      borderRadius: "10px",
                      background: "#F1F5F9",
                      border: "1.5px solid #CBD5E1",
                      color: "#334155",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>

            {/* Direct Contact Cards Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Commerce Diagnostic Quick Access Card */}
              <div style={{
                background: "linear-gradient(135deg, #0B1736 0%, #0F2557 100%)",
                borderRadius: "22px",
                padding: "2.2rem",
                color: "#FFFFFF",
                boxShadow: "0 14px 40px rgba(11, 23, 54, 0.2)"
              }}>
                <div style={{ fontSize: "0.76rem", fontWeight: 800, letterSpacing: "1.5px", color: "#60A5FA", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Self-Service Evaluation
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, margin: "0 0 0.75rem", lineHeight: 1.3 }}>
                  Prefer a Diagnostic Assessment First?
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "1.6rem" }}>
                  Run through our 10-step Commerce Diagnostic to calculate your channel readiness, warehouse gaps, and revenue leakage in under 3 minutes.
                </p>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Registered Office Info */}
              <div style={{
                background: "#FFFFFF",
                borderRadius: "22px",
                padding: "2.2rem",
                border: "1.5px solid #E2E8F0"
              }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B1736", marginBottom: "1.2rem" }}>
                  Corporate Office & Coordinates
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", color: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>Direct Line</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginTop: "0.1rem" }}>022 1234 5678</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", color: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>Executive Email</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginTop: "0.1rem" }}>hello@goodlifesutra.com</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", color: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>Registered Office</div>
                      <div style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.5, marginTop: "0.1rem" }}>
                        GOOD LIFE SUTRA PVT. LTD.<br />
                        CIN: U74999MH2021PTC368942<br />
                        Mumbai, Maharashtra, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
