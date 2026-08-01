"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import "../home.css";

export default function BrandLaunchIncubationPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  const engagementModels = [
    {
      title: "Ecommerce Launch & Operating Mandate",
      desc: "Full execution partner for OEM-owned brands taking their manufactured products directly to consumer and digital channels."
    },
    {
      title: "Brand Incubation & Category Analysis",
      desc: "In-depth category demand validation, competitive price gap analysis, product positioning, and launch feasibility studies."
    },
    {
      title: "Commerce Operating Partnership",
      desc: "Complete operational management covering cataloguing, marketplace listings, inventory, multi-state fulfilment, and growth."
    },
    {
      title: "JV & Strategic Partnerships",
      desc: "Separately evaluated joint venture or equity-aligned commerce partnerships for select high-potential product manufacturers."
    }
  ];

  const roadmapStages = [
    { stage: "01", title: "OEM Problem Mapping", desc: "Strong manufacturing setup exists, but consumer branding, marketplace listings, and digital ops teams are missing." },
    { stage: "02", title: "Opportunity Assessment", desc: "Analyzing category demand, competitive structure, product price points, channel economics, and unit margins." },
    { stage: "03", title: "Brand Foundation", desc: "Defining consumer positioning, product assortment, price architecture, and launch calendar." },
    { stage: "04", title: "Commerce Setup", desc: "Account creation, listing optimization, inventory safety allocation, warehouse placement, and return controls." },
    { stage: "05", title: "Demand Generation", desc: "Executing Amazon & Flipkart performance marketing, key event promotions, and developing Meta/SEO expansion strategies." },
    { stage: "06", title: "Pan-India & D2C Scale", desc: "Expanding into multi-state stock placement, additional marketplace channels, B2B platforms, and brand D2C store." }
  ];

  return (
    <div style={{ background: "#0B0F19", color: "#F3F4F6", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section className="page-hero-wrapper">
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <span className="diagnostic-step-pill" style={{ marginBottom: "1rem" }}>
              🚀 OEM-to-Brand Incubation
            </span>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
              From OEM Capability to a Market-Ready Ecommerce Brand
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "#9CA3AF", marginBottom: "2rem" }}>
              Good Life combines category data, marketplace execution, catalogue, pricing, inventory, fulfilment, performance marketing and revenue assurance to help capable manufacturers build an ecommerce brand.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
                Discuss a New Brand Launch
              </button>
              <Link href="/b2b-institutional-commerce" className="hero-play-btn" style={{ textDecoration: "none" }}>
                Explore B2B & Dealer Commerce →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Credibility Statement */}
      <section style={{ padding: "3.5rem 0", background: "rgba(56, 189, 248, 0.06)", borderTop: "1px solid rgba(56, 189, 248, 0.2)", borderBottom: "1px solid rgba(56, 189, 248, 0.2)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "850px" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem" }}>
            Proven Execution Track Record
          </div>
          <blockquote style={{ fontSize: "1.25rem", color: "#FFF", fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            “Over the last three years, Good Life has supported the ecommerce launch of five new brands created by companies that previously operated primarily as OEMs.”
          </blockquote>
        </div>
      </section>

      {/* Engagement Models */}
      <section style={{ padding: "5rem 0", background: "rgba(17, 24, 39, 0.4)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">FLEXIBLE ENGAGEMENT</span>
            <h2 className="section-title">How We Partner With OEM Manufacturers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {engagementModels.map((em, idx) => (
              <div key={idx} className="glass-card-feature">
                <div style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                  Model 0{idx + 1}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFF", marginBottom: "0.5rem" }}>{em.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{em.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Stage Launch Flow */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">LAUNCH METHODOLOGY</span>
            <h2 className="section-title">6-Stage Brand Incubation Roadmap</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {roadmapStages.map((stage, idx) => (
              <div key={idx} className="workflow-step-card" style={{ padding: "2rem" }}>
                <div className="workflow-step-num" style={{ marginBottom: "0.8rem" }}>{stage.stage}</div>
                <h3 style={{ fontSize: "1.15rem", color: "#FFF", fontWeight: 700, marginBottom: "0.5rem" }}>{stage.title}</h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ padding: "4rem 0", background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, rgba(11, 15, 25, 1) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", color: "#FFF", fontWeight: 800, marginBottom: "1rem" }}>
            Are You an OEM Seeking to Launch a Direct Brand?
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Partner with Good Life to turn your product manufacturing capacity into a high-margin digital commerce brand.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
            Discuss a New Brand Launch
          </button>
        </div>
      </section>

      <Footer />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
