"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";

export default function B2BInstitutionalPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, title: "Lead & Enquiry Handling", desc: "Structured intake and qualification for B2B leads from IndiaMART, TradeIndia, Moglix and direct institutional enquiries.", color: "#2563EB" },
    { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>, title: "Quotation & Commercial Workflow", desc: "Coordinated quotation management, pricing approvals and commercial documentation aligned to institutional norms.", color: "#0284C7" },
    { icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></>, title: "Catalogue & Product Data", desc: "B2B product catalogue management including specifications, MOQ, pricing tiers and SKU documentation.", color: "#0D9488" },
    { icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, title: "Inventory Allocation", desc: "Channel-wise inventory reservation for B2B, institutional and dealer supply alongside marketplace stock.", color: "#7C3AED" },
    { icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, title: "Order Processing & Dispatch", desc: "Warehouse-managed order processing, packing as per institutional requirements, dispatch and logistics coordination.", color: "#EC4899" },
    { icon: <><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></>, title: "Documentation & Compliance", desc: "GST invoicing, e-way bills, delivery challans and commercial documentation for institutional compliance.", color: "#F59E0B" },
    { icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, title: "MIS & Reconciliation", desc: "Order-level MIS reporting, payment reconciliation and exception tracking for B2B and institutional accounts.", color: "#059669" },
    { icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></>, title: "Returns & Exception Handling", desc: "Structured return workflows, damage documentation and credit note coordination for B2B and institutional orders.", color: "#6B7280" },
  ];

  const workflow = [
    { step: "01", title: "Requirement Qualification", desc: "Evaluate buyer profile, product specs, MOQ, pricing and delivery requirements." },
    { step: "02", title: "Commercial Approval", desc: "Coordinate quotation, price approvals and contractual terms with the brand." },
    { step: "03", title: "Inventory Confirmation", desc: "Confirm stock availability and allocation from the regional warehouse hub." },
    { step: "04", title: "Documentation", desc: "Generate GST invoice, e-way bill, challan and required compliance documents." },
    { step: "05", title: "Dispatch & Delivery", desc: "Coordinate logistics, handover to transporter and provide tracking." },
    { step: "06", title: "Reconciliation", desc: "Reconcile payments, manage exceptions and update MIS for full order closure." },
  ];

  const faqs = [
    { q: "Can Good Life fulfil bulk and institutional orders?", a: "Yes. Good Life can support brands in fulfilling bulk and institutional orders through its regional warehouse network and structured order execution process." },
    { q: "Can Good Life supply local dealers from regional warehouses?", a: "Good Life can support warehouse-backed dealer supply where the commercial and legal structure is mutually agreed. This can include inventory holding, dispatch coordination and basic fulfilment support from relevant hubs." },
    { q: "Does Good Life handle B2B platform enquiries?", a: "Yes. Good Life currently handles enquiries and operations on IndiaMART, TradeIndia, Moglix, JioMart B2B and direct institutional channels. Platform list is subject to what is actively in use." },
    { q: "Can Good Life manage inventory and reconciliation for B2B orders?", a: "Good Life can manage inventory allocation, order processing, dispatch and payment reconciliation for B2B accounts as part of an agreed operating scope." },
    { q: "Does Good Life operate as a formal CNF or distributor?", a: "Good Life can support CNF-style warehousing and regional dealer supplies where separately contracted and commercially agreed. We do not claim statutory CNF or distributor status unless the actual agreement and compliance requirements support it." },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* HERO */}
      <section style={{ paddingTop: "110px", paddingBottom: "5rem", background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(219,234,254,0.8) 0%, rgba(237,233,254,0.4) 40%, #FFFFFF 75%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 780 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
              B2B & Institutional Commerce
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.08, color: "#0F172A", marginBottom: "1.25rem" }}>
              B2B, Institutional and Dealer-Supply Commerce—<span style={{ color: "#2563EB" }}>Operated at Scale</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.2rem" }}>
              Good Life supports brands across bulk enquiries, institutional requirements, B2B platforms and local dealer supplies, using regional warehousing and controlled order execution.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} style={{ height: 52, padding: "0 2rem", borderRadius: 12, background: "#2563EB", color: "#FFF", fontWeight: 700, fontSize: "0.96rem", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,0.28)" }}>
                Discuss B2B or Institutional Requirements →
              </button>
            </div>
          </div>

          {/* Channel badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginTop: "3rem" }}>
            {["IndiaMART", "TradeIndia", "Moglix", "JioMart B2B", "Direct Institutional"].map((ch) => (
              <span key={ch} style={{ padding: "0.4rem 0.9rem", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>{ch}</span>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Who this is for</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Designed for Multi-Track Commerce</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              { icon: "🏭", title: "Brands Wanting B2B Growth", desc: "Scale institutional and bulk sales alongside your marketplace operation without splitting teams or systems." },
              { icon: "📦", title: "Companies Receiving Bulk Enquiries", desc: "Structure and fulfil corporate or institutional bulk orders from IndiaMart, TradeIndia and direct channels." },
              { icon: "🗺️", title: "Brands Needing Dealer Supply", desc: "Use Good Life's regional warehouse hubs for city and state-level dealer replenishment in agreed geographies." },
              { icon: "🏛️", title: "Institutional Buyers Seeking Fulfilment", desc: "Structured, documented fulfilment for government, corporate and PSU procurement requirements." },
            ].map((item, idx) => (
              <div key={idx} style={{ background: "#FFF", border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "1.6rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem", letterSpacing: "-0.3px" }}>{item.title}</h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: "5.5rem 0", background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Services</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Complete B2B Operating Services</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>From lead intake to payment reconciliation—one structured process.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.1rem" }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.4rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "all 0.2s ease" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${svc.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{svc.icon}</svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.3rem", letterSpacing: "-0.2px" }}>{svc.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL WORKFLOW */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="ptn-section-eyebrow">Order workflow</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Institutional Order Execution Process</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>A structured, traceable six-step workflow for every institutional order.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.1rem", maxWidth: 960, margin: "0 auto" }}>
            {workflow.map((step, idx) => (
              <div key={idx} style={{ background: "#FFF", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.6rem", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#EFF6FF", position: "absolute", top: 8, right: 14, lineHeight: 1, userSelect: "none" }}>{step.step}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem" }}>Step {step.step}</div>
                <h3 style={{ fontSize: "0.96rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.45rem", letterSpacing: "-0.2px" }}>{step.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALER SUPPLY NOTE */}
      <section style={{ padding: "5rem 0", background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 22, padding: "2.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1.5px" }}>Warehouse-Supported Dealer Supply</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", margin: "0.8rem 0 0.9rem", letterSpacing: "-0.8px" }}>Regional Inventory & Fulfilment Support</h2>
            <p style={{ fontSize: "0.96rem", color: "#334155", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              Good Life can act as a regional inventory and fulfilment partner, supporting city and state-level dealer supply from its warehouse hubs where the commercial and operational structure is mutually agreed. This can support replenishment cycles, city-level stock placement and outbound dispatch coordination.
            </p>
            <p style={{ fontSize: "0.84rem", color: "#64748B", fontStyle: "italic", margin: 0 }}>
              Good Life can support CNF-style warehousing and regional dealer supplies. This is not a statutory CNF or formal distributor appointment unless separately contracted and legally structured.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5.5rem 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="ptn-section-eyebrow">FAQs</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Common B2B & Institutional Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: "#FFF", border: `1.5px solid ${openFaq === idx ? "#BFDBFE" : "#E2E8F0"}`, borderRadius: 14, overflow: "hidden", boxShadow: openFaq === idx ? "0 4px 16px rgba(37,99,235,0.08)" : "none", transition: "all 0.2s ease" }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: "100%", padding: "1.2rem 1.5rem", background: "none", border: "none", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: "1rem", fontSize: "0.96rem", fontWeight: 700, color: "#0F172A" }}>
                  {faq.q}
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0, transform: openFaq === idx ? "rotate(45deg)" : "none", transition: "transform 0.25s ease" }}>+</span>
                </button>
                {openFaq === idx && <div style={{ padding: "0 1.5rem 1.3rem", fontSize: "0.91rem", color: "#64748B", lineHeight: 1.75 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "6rem 0", background: "linear-gradient(135deg, #0F1F40 0%, #1E3A8A 35%, #2563EB 70%, #7C3AED 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#FFF", letterSpacing: "-1.5px", marginBottom: "1rem" }}>Ready to Discuss B2B or Institutional Requirements?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>Share your requirement and our team will assess feasibility, geography and execution structure within 24 hours.</p>
          <button onClick={() => setDiagOpen(true)} style={{ height: 54, padding: "0 2.5rem", borderRadius: 14, background: "#FFF", color: "#1E3A8A", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>Discuss B2B or Institutional Requirements →</button>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
