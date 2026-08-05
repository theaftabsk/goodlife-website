"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";

export default function MultiPlatformCommercePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const platformCategories = [
    { category: "Core Marketplaces", platforms: ["Amazon", "Flipkart"], desc: "High-volume consumer search channels with automated ad management, buy box protection, and FBA/FAssured SLA compliance.", color: "#2563EB" },
    { category: "Fashion & Lifestyle", platforms: ["Myntra"], desc: "Curated cataloguing, lifestyle imagery adaptation, seasonal event execution, and returns QC management.", color: "#FF3F6C" },
    { category: "B2B & Industrial", platforms: ["Moglix", "IndiaMART", "TradeIndia"], desc: "Bulk listings, B2B price tiers, MOQ structures, GST invoice automation, and enterprise buyer enquiry handling.", color: "#E8192C" },
    { category: "Omnichannel Commerce", platforms: ["JioMart", "IB"], desc: "Regional store integration, hyper-local inventory sync, and multi-channel order fulfilment.", color: "#0066CC" },
    { category: "Consumer Finance & Assisted Purchase", platforms: ["Snapmint", "Bajaj"], desc: "EMl / checkout integration, transaction approval workflows, and high-ticket customer conversion optimization.", color: "#00B09B" },
  ];

  const services = [
    { title: "Platform Opportunity Assessment", desc: "Evaluate category demand, margin economics, audience fit, and operational readiness before launching on new platforms." },
    { title: "Account Onboarding & Adaptation", desc: "Cataloguing, listing creation, variation mapping, and platform-specific compliance setup across approved channels." },
    { title: "Platform Operational Controls", desc: "Custom operational workflows tailored to each marketplace's rules, SLAs, and dispute procedures rather than copy-pasting." },
    { title: "Unified Inventory Allocation", desc: "Centralised WMS stock allocation and live inventory buffer management across all active sales channels." },
    { title: "Consolidated Performance MIS", desc: "Single-dashboard view of sales, GMV, fill rate, ad spend, and net profitability across every integrated platform." },
    { title: "Claims & Settlement Auditing", desc: "Automated daily reconciliation of marketplace commission, weight disputes, COD payouts, and return chargebacks." },
  ];

  const faqs = [
    { q: "Does Good Life launch brands on all platforms?", a: "Good Life helps brands launch and operate across multiple leading and relevant platforms — including Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj, and IB. We evaluate category fit and margin economics rather than launching everywhere blindly." },
    { q: "How do you manage inventory across multiple platforms?", a: "Our 12-state WMS maintains live inventory synchronisation, allocating stock buffers across marketplace channels, D2C storefronts, and B2B orders to prevent overselling while maintaining high SLA fill rates." },
    { q: "How do you handle channel conflict and pricing differences?", a: "We establish clear cross-platform pricing governance, promotional calendars, and SKU variation strategies in close coordination with your brand team to protect brand equity and avoid channel disputes." },
    { q: "Can Good Life audit settlements across different platforms?", a: "Yes. Our automated Revenue Assurance engine reconciles platform-specific commission structures, weight fee claims, COD payouts, and return disputes across all active channels." },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* HERO */}
      <section style={{ paddingTop: "110px", paddingBottom: "5rem", background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(204,251,241,0.8) 0%, rgba(224,242,254,0.4) 40%, #FFFFFF 75%)", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "#CCFBF1", border: "1px solid #99F6E4", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, color: "#0D9488", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
              Multi-Platform Commerce
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.08, color: "#0F172A", marginBottom: "1.25rem" }}>
              Launch and Operate Your Brand Across <span style={{ color: "#0D9488" }}>Multiple Commerce Platforms</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: 1.75, maxWidth: 650, marginBottom: "2.2rem" }}>
              Good Life helps brands evaluate, onboard and operate across mainstream marketplaces, category platforms, B2B channels and assisted-purchase ecosystems through one coordinated operating model.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} style={{ height: 52, padding: "0 2rem", borderRadius: 12, background: "#0D9488", color: "#FFF", fontWeight: 700, fontSize: "0.96rem", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(13,148,136,0.28)" }}>
                Plan Your Multi-Platform Expansion →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* APPROVED PLATFORM CATEGORIES */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Platform Ecosystem</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Supported Commerce Platform Categories</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Operate across leading marketplaces, B2B portals, and consumer finance channels.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {platformCategories.map((cat, idx) => (
              <div key={idx} style={{ background: "#FFF", border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "1.8rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: cat.color, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>Category {idx + 1}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>{cat.category}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                  {cat.platforms.map((p) => (
                    <span key={p} style={{ padding: "0.25rem 0.65rem", background: `${cat.color}10`, color: cat.color, borderRadius: 6, fontSize: "0.78rem", fontWeight: 700 }}>{p}</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "5.5rem 0", background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Operating Architecture</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>End-to-End Multi-Platform Services</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.6rem" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0D9488", marginBottom: "0.4rem" }}>0{idx + 1}.</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem" }}>{svc.title}</h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="ptn-section-eyebrow">FAQs</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Multi-Platform Expansion Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: "#FFF", border: `1.5px solid ${openFaq === idx ? "#99F6E4" : "#E2E8F0"}`, borderRadius: 14, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: "100%", padding: "1.2rem 1.5rem", background: "none", border: "none", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: "1rem", fontSize: "0.96rem", fontWeight: 700, color: "#0F172A" }}>
                  {faq.q}
                  <span style={{ fontSize: "1.2rem", color: "#0D9488" }}>{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && <div style={{ padding: "0 1.5rem 1.3rem", fontSize: "0.91rem", color: "#64748B", lineHeight: 1.75 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "6rem 0", background: "linear-gradient(135deg, #0F172A 0%, #115E59 50%, #0D9488 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#FFF", letterSpacing: "-1.5px", marginBottom: "1rem" }}>Ready to Expand Across Multiple Platforms?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>Evaluate channel feasibility, margin economics and launch roadmap with our commerce team.</p>
          <button onClick={() => setDiagOpen(true)} style={{ height: 54, padding: "0 2.5rem", borderRadius: 14, background: "#FFF", color: "#115E59", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>Plan Your Multi-Platform Expansion →</button>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
