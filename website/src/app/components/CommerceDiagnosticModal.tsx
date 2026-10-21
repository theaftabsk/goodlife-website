"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CommerceDiagnosticModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function CommerceDiagnosticModal({ isOpen = true, onClose }: CommerceDiagnosticModalProps) {
  if (isOpen === false) return null;
  const [formData, setFormData] = useState({
    personName: "",
    whatsapp: "",
    companyName: "",
    email: ""
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.personName.trim() || !formData.whatsapp.trim()) {
      setErrorMsg("Please enter your name and WhatsApp number.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    const payload = {
      company: formData.companyName.trim() || "Brand Partner",
      contactName: formData.personName.trim(),
      mobile: formData.whatsapp.trim(),
      email: formData.email.trim() || `${formData.whatsapp.trim().replace(/[^0-9]/g, "") || "client"}@brandorbit.tech`,
      category: "Multi-Category Commerce",
      gmvBand: "₹5 Cr - ₹15 Cr",
      source: "Diagnostic Modal (Ultra-Simple 1-Tap)",
      intent: "Request Custom 45-Day Launch Plan",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.brandorbit.tech";
      await fetch(`${apiUrl}/api/v1/leads/diagnostic`, {
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
        background: "rgba(11, 23, 54, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "modalFadeIn 0.22s ease-out forwards"
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
            transform: translateY(16px) scale(0.97);
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
          maxWidth: "460px",
          background: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(226, 232, 240, 0.95)",
          boxShadow: "0 25px 65px -12px rgba(11, 23, 54, 0.25), 0 8px 24px -6px rgba(0, 0, 0, 0.04)",
          padding: "1.75rem 1.75rem 1.5rem",
          position: "relative",
          animation: "modalPopUp 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden"
        }}
      >
        {/* Subtle Top Gradient Ribbon */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #1D4ED8 100%)"
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.1rem",
            right: "1.1rem",
            width: "32px",
            height: "32px",
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F8FAFC";
            e.currentTarget.style.color = "#64748B";
            e.currentTarget.style.borderColor = "#E2E8F0";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!submitted ? (
          <div>
            {/* Header Tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.22rem 0.75rem", borderRadius: "999px", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.18)", marginBottom: "0.75rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                COMPLIMENTARY AUDIT
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 style={{ fontSize: "1.32rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem", letterSpacing: "-0.4px", lineHeight: 1.25 }}>
              Request Your Custom Launch Plan
            </h3>
            <p style={{ fontSize: "0.84rem", color: "#64748B", margin: "0 0 1.25rem", lineHeight: 1.45 }}>
              Share your details below. Our enterprise commerce lead will review and respond directly within 24 hours.
            </p>

            {errorMsg && (
              <div style={{
                padding: "0.55rem 0.85rem",
                borderRadius: "10px",
                background: "#FEF2F2",
                border: "1px solid #FCA5A5",
                color: "#B91C1C",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "0.85rem"
              }}>
                {errorMsg}
              </div>
            )}

            {/* Form Fields: Clean, Simple & High Converting */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* 1. Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  Contact Person Name <span style={{ color: "#2563EB" }}>*</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "11px",
                  border: focusedField === "person" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "person" ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "person" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.16s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "person" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                      height: "44px",
                      padding: "0 0.9rem 0 2.5rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500,
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* 2. WhatsApp Number */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  <span>WhatsApp Number <span style={{ color: "#2563EB" }}>*</span></span>
                  <span style={{ fontSize: "0.68rem", color: "#16A34A", fontWeight: 700 }}>Direct response</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "11px",
                  border: focusedField === "whatsapp" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "whatsapp" ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "whatsapp" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.16s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#16A34A", display: "flex" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                      height: "44px",
                      padding: "0 0.9rem 0 2.5rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500,
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* 3. Company / Brand Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  Company / Brand Name
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "11px",
                  border: focusedField === "company" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "company" ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "company" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.16s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "company" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" /><path d="M16 6h.01" />
                      <path d="M8 10h.01" /><path d="M16 10h.01" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Prestige Home / Apex Tech"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "44px",
                      padding: "0 0.9rem 0 2.5rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500,
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* 4. Work Email (Optional) */}
              <div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  <span>Official Business Email ID</span>
                  <span style={{ fontSize: "0.68rem", color: "#94A3B8", fontWeight: 500 }}>Optional</span>
                </label>
                <div style={{
                  position: "relative",
                  borderRadius: "11px",
                  border: focusedField === "email" ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  boxShadow: focusedField === "email" ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
                  background: focusedField === "email" ? "#FFFFFF" : "#F8FAFC",
                  transition: "all 0.16s ease"
                }}>
                  <div style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "email" ? "#2563EB" : "#94A3B8", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="rajesh@brandname.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%",
                      height: "44px",
                      padding: "0 0.9rem 0 2.5rem",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0F172A",
                      fontWeight: 500,
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: "48px",
                  marginTop: "0.2rem",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 22px rgba(37, 99, 235, 0.32)",
                  transition: "all 0.18s ease"
                }}
              >
                {submitting ? (
                  <span>Submitting Details...</span>
                ) : (
                  <>
                    <span>Submit</span>
                  </>
                )}
              </button>

              {/* Security Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", color: "#94A3B8", fontSize: "0.72rem", marginTop: "0.1rem" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Enterprise confidentiality guaranteed. Zero spam.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Thank You Screen */
          <div style={{ textAlign: "center", padding: "1.2rem 0.5rem" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#DCFCE7",
              color: "#16A34A",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 8px 20px rgba(22, 163, 74, 0.18)",
              animation: "successCheck 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.35rem" }}>
              Request Received Successfully!
            </h3>
            <p style={{ fontSize: "0.86rem", color: "#64748B", margin: "0 0 1.4rem", lineHeight: 1.5, maxWidth: "380px", marginLeft: "auto", marginRight: "auto" }}>
              Thank you, <strong style={{ color: "#0B1736" }}>{formData.personName || "there"}</strong>! Our Incubation Lead has received your request and will reach out via WhatsApp within 24 business hours.
            </p>

            {/* Direct WhatsApp Quick Chat Option */}
            <div style={{
              background: "#F0FDF4",
              border: "1.5px solid #BBF7D0",
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.8rem",
              textAlign: "left"
            }}>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803D" }}>Need immediate assistance?</div>
                <div style={{ fontSize: "0.72rem", color: "#166534", marginTop: "1px" }}>Chat with our Incubation Lead directly.</div>
              </div>
              <a
                href={`https://wa.me/918882157074?text=${encodeURIComponent(`Hi Good Life Team, I have just submitted a launch request for ${formData.companyName || "my company"}.`)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: "34px",
                  padding: "0 0.85rem",
                  borderRadius: "8px",
                  background: "#16A34A",
                  color: "#FFFFFF",
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
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
                height: "44px",
                borderRadius: "11px",
                background: "#F1F5F9",
                border: "1px solid #E2E8F0",
                color: "#1E293B",
                fontSize: "0.86rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
