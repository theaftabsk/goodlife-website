"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function ContactPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <section className="page-hero-wrapper">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="diagnostic-step-pill">📬 Contact Executive Team</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "1rem" }}>
            Get in Touch With Good Life
          </h1>
          <p className="hero-description" style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1rem" }}>
            Discuss your e-commerce growth, multi-platform expansion, B2B fulfilment, or OEM brand incubation requirements.
          </p>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="glass-card-feature" style={{ padding: "2.5rem" }}>
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Full Name</label>
                    <input required type="text" placeholder="John Doe" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Business Email</label>
                    <input required type="email" placeholder="john@brand.com" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Company / Brand Name</label>
                  <input required type="text" placeholder="Good Life Sutra Pvt. Ltd." style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>Message / Requirement</label>
                  <textarea required rows={4} placeholder="Describe your current e-commerce setup or goals..." style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }} />
                </div>
                <button type="submit" className="hero-cta-btn" style={{ width: "100%", justifyContent: "center" }}>
                  Send Executive Inquiry →
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: "#FFF", fontSize: "1.4rem", fontWeight: 700 }}>Thank You!</h3>
                <p style={{ color: "#9CA3AF", marginTop: "0.5rem" }}>Our executive team will reach out to you within 24 business hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
