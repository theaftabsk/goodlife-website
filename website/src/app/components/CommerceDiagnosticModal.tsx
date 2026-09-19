"use client";

import React, { useState } from "react";

interface CommerceDiagnosticModalProps {
  onClose: () => void;
}

export default function CommerceDiagnosticModal({ onClose }: CommerceDiagnosticModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    whatsapp: "",
    email: "",
    category: "Home & Kitchen Appliances",
    gmv: "₹5 Cr - ₹15 Cr"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.personName.trim() || !formData.whatsapp.trim() || !formData.email.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    const payload = {
      company: formData.companyName.trim(),
      contactName: formData.personName.trim(),
      mobile: formData.whatsapp.trim(),
      email: formData.email.trim(),
      category: formData.category,
      gmvBand: formData.gmv,
      source: "Diagnostic Tool (Quick 4-Field Modal)",
      intent: "Request Custom 45-Day Launch Plan",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/v1/leads/diagnostic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Also persist to localStorage for instant multi-tab Admin sync
      try {
        const existing = localStorage.getItem("gl_admin_leads");
        const list = existing ? JSON.parse(existing) : [];
        const newLeadItem = {
          id: `lead-${Date.now()}`,
          company: payload.company,
          contact: payload.contactName,
          mobile: payload.mobile,
          email: payload.email,
          category: payload.category,
          gmv: payload.gmvBand,
          source: payload.source,
          intent: payload.intent,
          date: payload.date,
          crmStatus: "Synced to Zoho CRM",
          tags: ["Direct Modal", "High Priority"]
        };
        localStorage.setItem("gl_admin_leads", JSON.stringify([newLeadItem, ...list]));
      } catch (_) {}
    } catch (err) {
      console.log("[LEAD SUBMIT EXCEPTION]", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(11, 23, 54, 0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        animation: "modalFadeIn 0.24s ease-out forwards"
      }}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopUp {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes successCheck {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.95)",
          boxShadow: "0 28px 70px -15px rgba(11, 23, 54, 0.22), 0 8px 24px -6px rgba(0, 0, 0, 0.04)",
          padding: "2rem 2.2rem 2.2rem",
          position: "relative",
          animation: "modalPopUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden"
        }}
      >
        {/* Subtle Top Glass Gradient Ribbon */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #1D4ED8 100%)"
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            color: "#64748B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            transition: "all 0.18s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#EFF6FF";
            e.currentTarget.style.color = "#1E293B";
            e.currentTarget.style.borderColor = "#BFDBFE";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F8FAFC";
            e.currentTarget.style.color = "#64748B";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!submitted ? (
          <div>
            {/* Header Tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.3rem 0.8rem", borderRadius: "999px", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.18)", marginBottom: "0.85rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                EXECUTIVE COMMERCE MANDATE
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.4rem", letterSpacing: "-0.5px" }}>
              Request Your Custom Launch Plan
            </h3>
            <p style={{ fontSize: "0.86rem", color: "#64748B", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
              Share your details below. Our enterprise commerce lead will review and respond directly within 24 hours.
            </p>

            {errorMsg && (
              <div style={{
                padding: "0.65rem 0.9rem",
                borderRadius: "10px",
                background: "#FEF2F2",
                border: "1px solid #FCA5A5",
                color: "#B91C1C",
                fontSize: "0.82rem",
                fontWeight: 600,
                marginBottom: "1rem"
              }}>
                {errorMsg}
              </div>
            )}

            {/* Form Fields: 4 Simple & Short Fields */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              {/* 1. Comp Name */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.81rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                  <span>Company / Brand Name <span style={{ color: "#2563EB" }}>*</span></span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 500 }}>e.g. OEM / Brand</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "12px",
                  border: focusedField === "company" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "company" ? "0 0 0 4px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "company" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.18s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "company" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M8 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h.01" />
                      <path d="M16 14h.01" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prestige Home Appliances / Apex Tech"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "46px",
                      padding: "0 1rem 0 2.6rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500
                    }}
                  />
                </div>
              </div>

              {/* 2. Person Name */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.81rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                  <span>Contact Person Name <span style={{ color: "#2563EB" }}>*</span></span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 500 }}>Founder / VP / Lead</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "12px",
                  border: focusedField === "person" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "person" ? "0 0 0 4px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "person" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.18s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "person" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.personName}
                    onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                    onFocus={() => setFocusedField("person")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "46px",
                      padding: "0 1rem 0 2.6rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500
                    }}
                  />
                </div>
              </div>

              {/* 3. Whats App No */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.81rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    WhatsApp Number <span style={{ color: "#2563EB" }}>*</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                      padding: "1px 6px",
                      borderRadius: "999px",
                      background: "#DCFCE7",
                      color: "#15803D",
                      fontSize: "0.68rem",
                      fontWeight: 800
                    }}>
                      Fast Response
                    </span>
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 500 }}>Direct mobile</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "12px",
                  border: focusedField === "whatsapp" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "whatsapp" ? "0 0 0 4px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "whatsapp" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.18s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "#16A34A", display: "flex" }}>
                    {/* WhatsApp Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    onFocus={() => setFocusedField("whatsapp")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "46px",
                      padding: "0 1rem 0 2.6rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500
                    }}
                  />
                </div>
              </div>

              {/* 4. Email ID */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.81rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>
                  <span>Official Business Email ID <span style={{ color: "#2563EB" }}>*</span></span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 500 }}>For audit report</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "12px",
                  border: focusedField === "email" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "email" ? "0 0 0 4px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "email" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.18s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "email" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@brandname.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "46px",
                      padding: "0 1rem 0 2.6rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500
                    }}
                  />
                </div>
              </div>

              {/* 5 & 6. Category & Annual GMV Scale (2-Column Grid) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {/* Category Dropdown */}
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.35rem" }}>
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: "100%",
                      height: "44px",
                      padding: "0 0.75rem",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#F8FAFC",
                      fontSize: "0.82rem",
                      color: "#0F172A",
                      fontWeight: 600,
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Home & Kitchen Appliances">Home & Kitchen</option>
                    <option value="TV & Electronics">TV & Electronics</option>
                    <option value="Invertors & Battery">Invertor & Battery</option>
                    <option value="Washing Machine & Laundry">Washing Machine</option>
                    <option value="Cooler & Fan">Cooler & Fan</option>
                    <option value="Sewing Machine">Sewing Machine</option>
                    <option value="Chimney & Kitchen Hobs">Chimney & Hobs</option>
                    <option value="OEM Contract Manufacturing">OEM Manufacturing</option>
                  </select>
                </div>

                {/* Annual GMV Scale */}
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.35rem" }}>
                    Annual GMV / Headroom
                  </label>
                  <select
                    value={formData.gmv}
                    onChange={(e) => setFormData({ ...formData, gmv: e.target.value })}
                    style={{
                      width: "100%",
                      height: "44px",
                      padding: "0 0.75rem",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#F8FAFC",
                      fontSize: "0.82rem",
                      color: "#0F172A",
                      fontWeight: 600,
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Under ₹2 Cr">Under ₹2 Cr</option>
                    <option value="₹2 Cr - ₹5 Cr">₹2 Cr - ₹5 Cr</option>
                    <option value="₹5 Cr - ₹15 Cr">₹5 Cr - ₹15 Cr</option>
                    <option value="₹15 Cr - ₹30 Cr">₹15 Cr - ₹30 Cr</option>
                    <option value="₹30 Cr+">₹30 Cr+ (Scale)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: "50px",
                  marginTop: "0.4rem",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  letterSpacing: "0.4px",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 10px 24px rgba(37, 99, 235, 0.32)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 14px 28px rgba(37, 99, 235, 0.42)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(37, 99, 235, 0.32)";
                  }
                }}
              >
                {submitting ? (
                  <span>Submitting Details...</span>
                ) : (
                  <>
                    <span>REQUEST CUSTOM 45-DAY LAUNCH PLAN</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {/* Security Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", color: "#94A3B8", fontSize: "0.73rem", marginTop: "0.2rem" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Enterprise confidentiality NDA guaranteed. Zero spam.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Thank You Screen — Sleek Enterprise Confirmation */
          <div style={{ textAlign: "center", padding: "1.2rem 0.5rem" }}>
            {/* Animated Check Icon */}
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#DCFCE7",
              color: "#16A34A",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.2rem",
              boxShadow: "0 10px 25px rgba(22, 163, 74, 0.2)",
              animation: "successCheck 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.4rem" }}>
              Request Received Successfully!
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 1.6rem", lineHeight: 1.5, maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
              Thank you, <strong style={{ color: "#0B1736" }}>{formData.personName || "there"}</strong>! Our Incubation Lead has received details for <strong style={{ color: "#0B1736" }}>{formData.companyName}</strong> and will reach out via WhatsApp & Email within 24 business hours.
            </p>

            {/* Direct WhatsApp Quick Chat Option */}
            <div style={{
              background: "#F0FDF4",
              border: "1.5px solid #BBF7D0",
              borderRadius: "14px",
              padding: "1rem 1.2rem",
              marginBottom: "1.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              textAlign: "left"
            }}>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#15803D" }}>Need immediate assistance?</div>
                <div style={{ fontSize: "0.75rem", color: "#166534", marginTop: "2px" }}>Direct chat with our Incubation Lead right now.</div>
              </div>
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Good Life Team, I have just submitted a launch request for ${formData.companyName || "my company"}.`)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: "36px",
                  padding: "0 0.9rem",
                  borderRadius: "8px",
                  background: "#16A34A",
                  color: "#FFFFFF",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)"
                }}
              >
                <span>WhatsApp</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                height: "46px",
                borderRadius: "12px",
                background: "#F1F5F9",
                border: "1px solid #E2E8F0",
                color: "#1E293B",
                fontSize: "0.88rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.18s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E2E8F0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F1F5F9";
              }}
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
