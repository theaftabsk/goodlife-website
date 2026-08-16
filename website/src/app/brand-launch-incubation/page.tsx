"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";

export default function BrandLaunchIncubationPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const flowSteps = [
    { step: "01", title: "OEM Problem", desc: "Manufacturing capability exists, but consumer proposition, catalogue, channel economics and operating team are absent.", color: "#EF4444" },
    { step: "02", title: "Opportunity Assessment", desc: "Category demand analysis, competitive structure, product gap identification, price architecture and launch feasibility.", color: "#F59E0B" },
    { step: "03", title: "Brand Launch Foundation", desc: "Positioning inputs, product assortment plan, marketplace catalogue creation, visual content and launch pricing strategy.", color: "#10B981" },
    { step: "04", title: "Ecommerce Setup", desc: "Marketplace accounts, listing creation, inventory allocation across 12 state hubs, warehousing, returns and audit setup.", color: "#2563EB" },
    { step: "05", title: "Demand Generation", desc: "Established Amazon & Flipkart performance ad campaigns. D2C growth capabilities expanding across Meta, SEO and social channels.", color: "#7C3AED" },
    { step: "06", title: "Scale & Expansion", desc: "Portfolio expansion, regional inventory placement, multi-platform rollout, and D2C / B2B channel integration.", color: "#EC4899" },
  ];

  const models = [
    { title: "Ecommerce Launch Mandate", desc: "End-to-end operational launch mandate for an OEM-owned consumer brand across marketplaces and D2C." },
    { title: "Brand Incubation Mandate", desc: "Full product opportunity analysis, category positioning, pricing strategy, and initial market testing." },
    { title: "Operating Partnership", desc: "Long-term ecommerce operating partnership covering cataloguing, warehousing, fulfilment, ad management and revenue audits." },
    { title: "Strategic JV / Custom Partnership", desc: "Separately evaluated and contracted joint venture or revenue-share models where aligned to growth goals." },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* HERO */}
      <section style={{ paddingTop: "110px", paddingBottom: "5rem", background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(243,232,255,0.8) 0%, rgba(253,242,248,0.4) 40%, #FFFFFF 75%)", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "#F3E8FF", border: "1px solid #E9D5FF", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, color: "#7C3AED", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
              Brand Launch &amp; Incubation
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.08, color: "#0F172A", marginBottom: "1.25rem" }}>
              From OEM Capability to a <span style={{ color: "#7C3AED" }}>Market-Ready Ecommerce Brand</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: 1.75, maxWidth: 650, marginBottom: "2.2rem" }}>
              Good Life combines category data, marketplace execution, catalogue, pricing, inventory, fulfilment, performance marketing and revenue assurance to help capable manufacturers build an ecommerce brand.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} style={{ height: 52, padding: "0 2rem", borderRadius: 12, background: "#7C3AED", color: "#FFF", fontWeight: 700, fontSize: "0.96rem", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.28)" }}>
                Discuss a New Brand Launch →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STATEMENT */}
      <section style={{ padding: "3rem 0", background: "#FAF5FF", borderTop: "1px solid #F3E8FF", borderBottom: "1px solid #F3E8FF" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 800 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#7C3AED" }}>Proven Track Record</span>
          <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginTop: "0.6rem", lineHeight: 1.6 }}>
            &ldquo;Over the last three years, Good Life has supported the ecommerce launch of five new brands created by companies that previously operated primarily as OEMs.&rdquo;
          </p>
        </div>
      </section>

      {/* PAGE FLOW STEPS */}
      <section style={{ padding: "5.5rem 0", background: "#FFF" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="ptn-section-eyebrow">Launch Roadmap</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Six-Step Brand Launch Architecture</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {flowSteps.map((s, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.6rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: s.color, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>Phase {s.step}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.45rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Partnership Structures</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Flexible Launch Engagement Models</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {models.map((m, idx) => (
              <div key={idx} style={{ background: "#FFF", border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "1.8rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>{m.title}</h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "6rem 0", background: "linear-gradient(135deg, #0F172A 0%, #3B0764 50%, #7C3AED 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#FFF", letterSpacing: "-1.5px", marginBottom: "1rem" }}>Have Manufacturing Capability and Need an Ecommerce Brand?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>Let&apos;s evaluate category feasibility, pricing models and launch timeline together.</p>
          <button onClick={() => setDiagOpen(true)} style={{ height: 54, padding: "0 2.5rem", borderRadius: 14, background: "#FFF", color: "#3B0764", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>Discuss a New Brand Launch →</button>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
