"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import "./home.css";

// ═══════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════
const Counter: React.FC<{ target: string }> = ({ target }) => {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { animate(); observer.disconnect(); } }); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    function animate() {
      const prefix = target.startsWith("₹") ? "₹" : "";
      const hasCr = target.includes("Cr");
      const hasPlus = target.includes("+");
      const hasPct = target.includes("%");
      const targetVal = parseFloat(target.replace(/[^0-9.]/g, ""));
      if (isNaN(targetVal)) { setValue(target); return; }
      const duration = 1800;
      const startTime = performance.now();
      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = hasPct ? (ease * targetVal).toFixed(1) : Math.floor(ease * targetVal).toLocaleString("en-IN");
        setValue(prefix + current + (hasCr ? " Cr" : "") + (hasPlus ? "+" : "") + (hasPct ? "%" : ""));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      }
      requestAnimationFrame(tick);
    }
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{value}</span>;
};

// ═══════════════════════════════════════════════
// SAVINGS CALCULATOR (REVENUE ASSURANCE VISUAL)
// ═══════════════════════════════════════════════
const SavingsCalculator: React.FC<{ onOpenDiag: () => void }> = ({ onOpenDiag }) => {
  const [orders, setOrders] = useState(5000);
  const [aov, setAov] = useState(1200);
  const leakage = Math.round(orders * aov * 0.023);
  const timeSaved = Math.round(orders * 0.0012 * 60);
  const disputeRecovery = Math.round(orders * aov * 0.008);
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <section className="calc-section" id="revenue-assurance">
      <div className="container">
        <div className="calc-wrapper">
          <div className="calc-left">
            <span className="ptn-section-eyebrow">Revenue Assurance Engine</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.5rem" }}>Automated Settlement &amp; Claims Audit Engine</h2>
            <p style={{ color: "#64748B", fontSize: "0.97rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Daily automated reconciliation audits across marketplace commissions, weight disputes, return claims and payment gateway settlements.
            </p>
            <div className="calc-slider-group">
              <div className="calc-slider-label">
                <span>Monthly Orders</span>
                <strong>{orders.toLocaleString("en-IN")}</strong>
              </div>
              <input type="range" min={500} max={50000} step={500} value={orders} onChange={(e) => setOrders(Number(e.target.value))} className="calc-slider" />
              <div className="calc-slider-ticks"><span>500</span><span>25,000</span><span>50,000</span></div>
            </div>
            <div className="calc-slider-group" style={{ marginTop: "1.5rem" }}>
              <div className="calc-slider-label">
                <span>Avg. Order Value (₹)</span>
                <strong>₹{aov.toLocaleString("en-IN")}</strong>
              </div>
              <input type="range" min={200} max={10000} step={100} value={aov} onChange={(e) => setAov(Number(e.target.value))} className="calc-slider" />
              <div className="calc-slider-ticks"><span>₹200</span><span>₹5,000</span><span>₹10,000</span></div>
            </div>
            <button onClick={onOpenDiag} className="btn-primary-hero" style={{ marginTop: "2rem", width: "100%", justifyContent: "center" }}>
              Claim Your Free Diagnostic Report →
            </button>
          </div>
          <div className="calc-right">
            <div className="calc-result-card calc-result-main">
              <div className="calc-result-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M16 8a4 4 0 0 0-8 0v4"/></svg>
              </div>
              <div className="calc-result-label">Fee Leakage Recovered / Month</div>
              <div className="calc-result-value">{fmt(leakage)}</div>
              <div className="calc-result-sub">Platform commissions, weight disputes &amp; return claims</div>
            </div>
            <div className="calc-small-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div className="calc-result-label">Settlement Time Saved</div>
                <div className="calc-result-value" style={{ fontSize: "1.8rem" }}>{timeSaved} hrs</div>
                <div className="calc-result-sub">Auto-reconciled disputes</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </div>
                <div className="calc-result-label">Dispute Recovery</div>
                <div className="calc-result-value" style={{ fontSize: "1.8rem" }}>{fmt(disputeRecovery)}</div>
                <div className="calc-result-sub">Return claim &amp; COD mismatch</div>
              </div>
            </div>
            <div className="calc-badge">
              <div className="calc-badge-dot" />
              100% automated settlement reconciliation across active commerce platforms.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// FULFILMENT NETWORK & WAREHOUSE HUBS
// ═══════════════════════════════════════════════
const hubs = [
  { city: "Gurgaon", state: "Haryana", area: "22,000 sq ft", sla: "Same Day", coverage: "Delhi NCR + North", fba: true, fa: true },
  { city: "Mumbai", state: "Maharashtra", area: "18,500 sq ft", sla: "Next Day", coverage: "West India", fba: true, fa: false },
  { city: "Bengaluru", state: "Karnataka", area: "16,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: true },
  { city: "Hyderabad", state: "Telangana", area: "12,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: false },
  { city: "Chennai", state: "Tamil Nadu", area: "11,000 sq ft", sla: "Next Day", coverage: "South India", fba: false, fa: false },
  { city: "Kolkata", state: "West Bengal", area: "10,500 sq ft", sla: "Next Day", coverage: "East India", fba: true, fa: false },
  { city: "Ahmedabad", state: "Gujarat", area: "9,500 sq ft", sla: "Next Day", coverage: "West India", fba: false, fa: false },
  { city: "Lucknow", state: "Uttar Pradesh", area: "8,000 sq ft", sla: "Next Day", coverage: "Central UP + East", fba: false, fa: false },
  { city: "Patna", state: "Bihar", area: "7,000 sq ft", sla: "Next Day", coverage: "Bihar + Jharkhand", fba: false, fa: false },
  { city: "Indore", state: "Madhya Pradesh", area: "6,500 sq ft", sla: "Next Day", coverage: "Central India", fba: false, fa: false },
  { city: "Ludhiana", state: "Punjab", area: "6,000 sq ft", sla: "Next Day", coverage: "Punjab + J&K", fba: false, fa: false },
  { city: "Guwahati", state: "Assam", area: "5,500 sq ft", sla: "Next Day", coverage: "North East India", fba: false, fa: false },
];

const WarehouseHubs: React.FC = () => {
  const [activeHub, setActiveHub] = useState(0);
  const hub = hubs[activeHub];
  const [barWidth, setBarWidth] = useState("0%");
  useEffect(() => { setTimeout(() => setBarWidth("98.2%"), 400); }, [activeHub]);

  return (
    <section className="warehouse-section" id="fulfilment-network">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <span className="ptn-section-eyebrow">Pan-India fulfilment network</span>
          <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>12-State Warehouse Infrastructure</h2>
          <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>1,00,000+ sq ft of managed fulfilment space across India&apos;s key commerce corridors.</p>
        </div>
        <div className="warehouse-layout">
          <div className="warehouse-grid">
            {hubs.map((h, idx) => (
              <button key={idx} className={`warehouse-hub-btn ${activeHub === idx ? "active" : ""}`} onClick={() => setActiveHub(idx)}>
                <span className="hub-city">{h.city}</span>
                <span className="hub-state">{h.state}</span>
                <div>
                  {h.fba && <span className="hub-badge hub-badge-fba">FBA</span>}
                  {h.fa && <span className="hub-badge hub-badge-fa">FA</span>}
                </div>
              </button>
            ))}
          </div>
          <div className="warehouse-detail">
            <div className="warehouse-detail-header">
              <div>
                <h3 className="warehouse-city-name">{hub.city}</h3>
                <p className="warehouse-state-name">{hub.state}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {hub.fba && <span className="hub-badge-lg hub-badge-fba">FBA Enabled</span>}
                {hub.fa && <span className="hub-badge-lg hub-badge-fa">FAssured</span>}
              </div>
            </div>
            <div className="warehouse-metrics">
              {[
                { label: "Warehouse Area", value: hub.area, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
                { label: "Dispatch SLA", value: hub.sla, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
                { label: "Coverage Zone", value: hub.coverage, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>) },
              ].map((m, i) => (
                <div key={i} className="warehouse-metric">
                  <span className="warehouse-metric-icon">{m.icon}</span>
                  <div>
                    <div className="warehouse-metric-label">{m.label}</div>
                    <div className="warehouse-metric-value">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="warehouse-sla-bar-label">Fill Rate SLA Performance</div>
              <div className="warehouse-sla-bar-track">
                <div className="warehouse-sla-bar-fill" style={{ width: barWidth }} />
              </div>
              <div className="warehouse-sla-bar-pct">98.2% average across all hubs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// COMPARISON MATRIX (ACCOUNTABILITY PROBLEM)
// ═══════════════════════════════════════════════
const ComparisonMatrix: React.FC<{ onOpenDiag: () => void }> = ({ onOpenDiag }) => {
  const rows = [
    {
      area: "Settlement Reconciliation",
      bad: "Manual, monthly, error-prone",
      good: "Daily automated audit — 100% coverage",
      color: "#2563EB",
      bg: "#EFF6FF",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      area: "Return Dispute Resolution",
      bad: "Chased individually, 2–4 weeks",
      good: "Auto-flagged & resolved within 48 hrs",
      color: "#7C3AED",
      bg: "#F5F3FF",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M8 16H3v5"/>
        </svg>
      ),
    },
    {
      area: "Multi-Channel Inventory",
      bad: "Spreadsheets & manual syncs",
      good: "Live WMS sync across 12 hubs",
      color: "#0D9488",
      bg: "#F0FDFA",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      area: "Marketplace Ads Management",
      bad: "Outsourced or neglected",
      good: "In-house Amazon & Flipkart campaign ops",
      color: "#EA580C",
      bg: "#FFF7ED",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
    },
    {
      area: "D2C + Marketplace Ops",
      bad: "Separate teams, siloed data",
      good: "Unified view under one operating model",
      color: "#0284C7",
      bg: "#F0F9FF",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
    },
    {
      area: "B2B & Institutional Orders",
      bad: "Ad hoc, no structured workflow",
      good: "Defined process from enquiry to reconciliation",
      color: "#475569",
      bg: "#F8FAFC",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
    },
    {
      area: "Fill Rate SLA",
      bad: "Below 92% typical",
      good: "98.2% across all active hubs",
      color: "#059669",
      bg: "#F0FDF4",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      area: "Brand Launch Support",
      bad: "Agency-led, disconnected ops",
      good: "Integrated OEM-to-brand mandate",
      color: "#DB2777",
      bg: "#FDF2F8",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="compare-section" id="accountability-problem" style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)", padding: "5rem 0", borderTop: "1px solid #E2E8F0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="ptn-section-eyebrow" style={{ color: "#2563EB" }}>The Accountability Problem Solved</span>
          <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Why Brands Switch to Good Life</h2>
          <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>One integrated Commerce Operating Partner replaces multiple fragmented agencies.</p>
        </div>

        {/* Column Headers */}
        <div className="compare-col-headers">
          <div className="compare-col-hdr-area" />
          <div className="compare-col-hdr compare-hdr-bad">
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#FEE2E2", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.35rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
            <span>Fragmented Agencies / In-House</span>
          </div>
          <div className="compare-col-hdr compare-hdr-good">
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.35rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span>Good Life Operating Model</span>
          </div>
        </div>

        {/* Rows */}
        <div className="compare-cards-grid">
          {rows.map((row, idx) => (
            <div key={idx} className="compare-card-row">
              {/* Area Label */}
              <div className="compare-card-area">
                <span className="compare-area-icon" style={{ background: row.bg, color: row.color }}>
                  {row.icon}
                </span>
                <span className="compare-area-label">{row.area}</span>
              </div>
              {/* Bad Column */}
              <div className="compare-card-bad">
                <span className="compare-badge-bad">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </span>
                <span className="compare-card-text">{row.bad}</span>
              </div>
              {/* Good Column */}
              <div className="compare-card-good">
                <span className="compare-badge-good">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="compare-card-text">{row.good}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button onClick={onOpenDiag} className="btn-primary-hero" style={{ height: 50, padding: "0 2rem", fontSize: "0.95rem" }}>
            Request a Free Commerce Audit →
          </button>
        </div>
      </div>
    </section>
  );
};


// ═══════════════════════════════════════════════
// STICKY BAR
// ═══════════════════════════════════════════════
const StickyBar: React.FC<{ onOpenDiag: () => void }> = ({ onOpenDiag }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const handleScroll = () => { if (!dismissed) setVisible(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);
  return (
    <div className={`sticky-bar ${visible && !dismissed ? "sticky-bar-visible" : ""}`}>
      <div className="sticky-bar-inner">
        <div className="sticky-bar-dot" />
        <p className="sticky-bar-text"><strong>Ready to find your fee leaks?</strong> Get a complimentary Commerce Diagnostic — no obligation.</p>
        <button onClick={onOpenDiag} className="sticky-bar-btn">Request Diagnostic →</button>
        <button onClick={() => { setDismissed(true); setVisible(false); }} className="sticky-bar-close">✕</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// MAIN HOME PAGE COMPONENT
// ═══════════════════════════════════════════════
export default function HomePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // Typewriter words
  const words = ["Marketplaces", "D2C Stores", "B2B Channels", "Institutional Orders", "Multi-Platform Growth"];
  const [wordIdx, setWordIdx] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionClass("exit");
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
        setTransitionClass("enter");
        setTimeout(() => setTransitionClass(""), 50);
      }, 380);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  // Timeline observer
  const [isTimelineLit, setIsTimelineLit] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsTimelineLit(true); observer.disconnect(); } }); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Section 12: Case Studies / Testimonials (3 approved stories)
  const testimonials = [
    { quote: "Good Life transitioned our entire marketplace model. Their finance reconciliation caught fee leaks we didn't know existed, and our sales grew 2.5x in under a year.", author: "Founder & CEO", role: "National Kitchen Appliance Brand", initial: "N", color: "#2563EB" },
    { quote: "We scaled from 1 to 12 states overnight. Good Life WMS is rock solid — our dispatch SLA turnaround is consistently under 4 hours.", author: "Operations Director", role: "Leading Consumer Goods Brand", initial: "C", color: "#7C3AED" },
    { quote: "Daily payment disputes were eating up our margins. Good Life automated audits resolved 98% of return variances instantly.", author: "Head of E-commerce", role: "Premier Wellness Partner", initial: "W", color: "#059669" },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const [activeAccStep, setActiveAccStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  // Section 15: Schema-Enabled FAQ Data
  const homeFaqs = [
    { q: "What makes Good Life different from a traditional e-commerce agency?", a: "Good Life is an integrated Commerce Operating Partner, not an agency. We take full accountability for catalogue listings, inventory planning, multi-state warehousing, performance ads, settlement reconciliation, D2C operations, B2B/institutional execution and multi-channel order dispatch—under one operating model." },
    { q: "Does Good Life support multi-platform marketplace launch?", a: "Yes. Good Life helps brands evaluate, onboard and operate across multiple leading and relevant platforms—including Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj and other approved channels." },
    { q: "Can Good Life help an OEM manufacturer launch a consumer brand?", a: "Yes. Good Life has supported the ecommerce launch of new brands created by companies that previously operated primarily as OEMs. Our Brand Incubation mandate covers opportunity assessment, catalogue, marketplace setup, inventory, fulfilment and performance marketing." },
    { q: "Can Good Life manage D2C and marketplace operations together?", a: "Yes. Good Life can manage the operational layer for both marketplace and D2C channels together — including catalogue, order flow, inventory synchronisation, fulfilment, returns and performance reporting — providing a unified view across channels." },
    { q: "How does your finance reconciliation service work?", a: "We perform daily automated reconciliation audits on commissions, shipping charges, COD payments, returns, and payment gateways across marketplace and D2C channels. We identify listing fee leaks and disputable platform returns, recovering money that typically goes unnoticed." },
    { q: "Can Good Life fulfil bulk and institutional orders?", a: "Good Life can support brands in fulfilling bulk and institutional orders through its regional warehouse network. This includes B2B platform enquiries (IndiaMART, TradeIndia, Moglix, JioMart B2B), quotation coordination, dispatch and reconciliation." },
    { q: "Where are your warehouses located?", a: "We operate 12 warehousing locations across Gurgaon, Patna, Mumbai, Ahmedabad, Hyderabad, Guwahati, Bengaluru, Lucknow, Chennai, Indore, Kolkata, and Ludhiana, with FBA/FA hubs in select cities." },
  ];

  const portfolioLogos = [
    {
      name: "Thorne",
      svg: (
        <svg viewBox="0 0 120 30" width="120" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="900" fontSize="17" letterSpacing="2px" fill="#0F172A">THORNE</text>
        </svg>
      )
    },
    {
      name: "Puka",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" fill="#15803D">PUKA</text>
        </svg>
      )
    },
    {
      name: "HMS",
      svg: (
        <svg viewBox="0 0 90 30" width="90" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px" fill="#2563EB">HMS</text>
        </svg>
      )
    },
    {
      name: "Gaia Herbs",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <path d="M10 20 Q15 6 20 20" stroke="#059669" strokeWidth="2.5" fill="none" />
          <text x="26" y="21" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5px" fill="#059669">GAIA HERBS</text>
        </svg>
      )
    },
    {
      name: "Spark",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <polygon points="12,6 15,14 23,14 17,19 19,27 12,22 5,27 7,19 1,14 9,14" fill="#F59E0B" />
          <text x="28" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="1px" fill="#D97706">SPARK</text>
        </svg>
      )
    },
    {
      name: "Panasonic",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5px" fill="#0041C2">Panasonic</text>
        </svg>
      )
    },
    {
      name: "Mamaearth",
      svg: (
        <svg viewBox="0 0 140 30" width="140" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="'Trebuchet MS', sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5px" fill="#0D9488">mamaearth</text>
        </svg>
      )
    },
    {
      name: "boAt",
      svg: (
        <svg viewBox="0 0 110 30" width="110" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <path d="M6 22 L16 10 L24 22 Z" fill="#DC2626" />
          <text x="30" y="21" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="17" fill="#0F172A">boAt</text>
        </svg>
      )
    },
    {
      name: "Golf Pro",
      svg: (
        <svg viewBox="0 0 130 30" width="130" height="30" fill="none" style={{ opacity: 0.85, display: "inline-block", verticalAlign: "middle" }}>
          <text x="5" y="21" fontFamily="Georgia, serif" fontWeight="800" fontSize="16" letterSpacing="1px" fill="#15803D">GOLF PRO</text>
        </svg>
      )
    }
  ];

  // Approved Platform Vector SVGs (Enlarged & High-Impact)
  const channelSVGs: { name: string; bg: string; svg: React.ReactNode }[] = [
    {
      name: "Amazon",
      bg: "#232F3E",
      svg: (
        <svg viewBox="0 0 120 38" width="92" height="30" fill="none">
          <text x="4" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="22" fill="#FFFFFF">amazon</text>
          <path d="M10 28 Q38 38 66 28" stroke="#FF9900" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
          <path d="M63 25 L69 28 L64 32" fill="#FF9900"/>
        </svg>
      ),
    },
    {
      name: "Flipkart",
      bg: "#2874F0",
      svg: (
        <svg viewBox="0 0 110 38" width="88" height="30" fill="none">
          <rect x="2" y="5" width="22" height="28" rx="4" fill="#FFE500"/>
          <path d="M7 10 h8 v4 h-5 v3 h5 v4 h-5 v6 h-3 z" fill="#2874F0"/>
          <path d="M17 17 h5 v3 h-5 z" fill="#2874F0"/>
          <text x="28" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">flipkart</text>
        </svg>
      ),
    },
    {
      name: "Myntra",
      bg: "#18181B",
      svg: (
        <svg viewBox="0 0 100 32" width="76" height="26" fill="none">
          <path d="M2 24 L7 8 L12 18 L17 8 L22 24" stroke="#FF3F6C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M7 8 L12 18 L17 8" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="26" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF">myntra</text>
        </svg>
      ),
    },
    {
      name: "Moglix",
      bg: "#E8192C",
      svg: (
        <svg viewBox="0 0 100 32" width="76" height="26" fill="none">
          <rect x="2" y="6" width="20" height="20" rx="4" fill="#FFFFFF" />
          <path d="M6 21 V11 L10 16 L14 11 V21" stroke="#E8192C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="26" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">moglix</text>
        </svg>
      ),
    },
    {
      name: "JioMart",
      bg: "#0066CC",
      svg: (
        <svg viewBox="0 0 100 32" width="76" height="26" fill="none">
          <circle cx="12" cy="16" r="10" fill="#0088FF" />
          <text x="7" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF">Jio</text>
          <text x="26" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF">Mart</text>
        </svg>
      ),
    },
    {
      name: "Snapmint",
      bg: "#00B09B",
      svg: (
        <svg viewBox="0 0 100 32" width="80" height="26" fill="none">
          <polygon points="4,22 10,8 16,22" fill="#FFFFFF" />
          <text x="20" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF">snapmint</text>
        </svg>
      ),
    },
    {
      name: "Bajaj",
      bg: "#003087",
      svg: (
        <svg viewBox="0 0 90 32" width="74" height="26" fill="none">
          <path d="M4 8 H16 L8 16 L16 24 H4 Z" fill="#38BDF8" />
          <text x="22" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">BAJAJ</text>
        </svg>
      ),
    },
    {
      name: "IB (IndiaMART B2B)",
      bg: "#E8711A",
      svg: (
        <svg viewBox="0 0 80 32" width="70" height="26" fill="none">
          <rect x="2" y="4" width="22" height="24" rx="5" fill="#FFFFFF" />
          <text x="6" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#E8711A">IB</text>
          <text x="30" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="14" fill="#FFFFFF">B2B</text>
        </svg>
      ),
    },
  ];

  // Section 7: Ten Capabilities (Links into each capability page)
  const capabilities = [
    { title: "Marketplace Operations", desc: "Cataloguing, listing optimisation, buy box protection and daily account management across core channels.", href: "/capabilities/marketplace-operations", color: "#2563EB", bg: "#EFF6FF", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
    { title: "Marketplace Growth & Ads", desc: "Established Amazon & Flipkart performance ad campaigns—keyword targeting, budget pacing and conversions.", href: "/capabilities/marketplace-growth", color: "#0284C7", bg: "#F0F9FF", icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></> },
    { title: "Multi-Platform Commerce", desc: "Onboard and operate across core marketplaces, fashion channels, B2B platforms and assisted purchase networks.", href: "/multi-platform-commerce", color: "#0D9488", bg: "#F0FDFA", icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></> },
    { title: "D2C Commerce Operations", desc: "End-to-end storefront operations, catalogue synchronisation, order flows, payment/COD reconciliation and return coordination.", href: "/d2c-commerce-operations", color: "#EC4899", bg: "#FDF2F8", icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 12H3M12 3v18"/></> },
    { title: "B2B & Institutional Commerce", desc: "Bulk enquiries, corporate orders, GST invoicing, B2B platform listings and warehouse-supported dealer supply.", href: "/b2b-institutional-commerce", color: "#7C3AED", bg: "#F5F3FF", icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
    { title: "Inventory Planning", desc: "Multi-channel allocation across marketplace, D2C, B2B/institutional and dealer supplies with buffer management.", href: "/capabilities/inventory-planning", color: "#2563EB", bg: "#EFF6FF", icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></> },
    { title: "Fulfilment & Warehousing", desc: "1,00,000+ sq ft across 12 state hubs with FBA/FAssured SLA compliance and regional CNF supply support.", href: "/capabilities/warehousing-fulfilment", color: "#4F46E5", bg: "#EEF2FF", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
    { title: "Revenue Assurance", desc: "Daily automated settlement audits, weight dispute recovery and return claim reconciliation across all platforms.", href: "/capabilities/revenue-assurance", color: "#059669", bg: "#F0FDF4", icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
    { title: "Returns Management", desc: "RTO reduction, reverse logistics QC, exception tracking and return reconciliation across marketplace and D2C.", href: "/capabilities/returns-operations", color: "#F59E0B", bg: "#FFF7ED", icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></> },
    { title: "Heavy & Bulky Commerce", desc: "Specialised freight handling, transit damage protection, custom crating and coordinated last-mile delivery.", href: "/specialised/heavy-bulky-commerce", color: "#0F172A", bg: "#F8FAFC", icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
  ];

  // Section 14: Insights (CMS Articles preview)
  const insights = [
    { title: "How Daily Settlement Audits Recover 2-3% Leaked GMV for Marketplace Brands", category: "Revenue Assurance", date: "July 2026", readTime: "5 min read", link: "/insights" },
    { title: "Multi-State Warehousing Strategy: Reducing Order SLA & Regional Freight Costs", category: "Fulfilment", date: "June 2026", readTime: "7 min read", link: "/insights" },
    { title: "From OEM Manufacturer to Consumer Brand: A 6-Step Ecommerce Launch Playbook", category: "Brand Launch", date: "May 2026", readTime: "6 min read", link: "/insights" },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      
      {/* ── SECTION 1: HEADER (Sticky navigation + CTA always visible) ── */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── SECTION 2: HERO (Positioning statement + Primary/Secondary CTA) ── */}
      <section className="hero-section-light" id="hero-home">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="container">
          <div className="hero-inner-light">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              India&apos;s Trusted E-Commerce Operations Partner | Pan-India Presence
            </div>
            <h1 className="hero-headline">
              India&apos;s Commerce Operating Partner<br />
              <span style={{ whiteSpace: "nowrap" }}>
                for <span id="typewriter-word" className={transitionClass}>{words[wordIdx]}</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Marketplace growth, multi-platform operations, D2C, B2B/institutional commerce, revenue assurance and pan-India fulfilment—managed through one accountable operating model.
            </p>
            <div className="hero-cta-row">
              <button className="btn-primary-hero" onClick={() => setDiagOpen(true)}>
                Request a Commerce Diagnostic →
              </button>
              <button className="btn-ghost-hero" onClick={() => setVideoOpen(true)}>
                ▷ Watch Our Story
              </button>
            </div>
            <div className="hero-rating">
              <span className="hero-rating-stars">★★★★★</span>
              <span>4.9 average client rating across 13+ national brands</span>
            </div>

            {/* ── SECTION 3: CREDIBILITY STRIP (Channel Logos Infinite Auto-Scroll Marquee) ── */}
            <div className="channel-strip">
              <div className="channel-marquee-container">
                <div className="channel-marquee-track">
                  {[...channelSVGs, ...channelSVGs].map((ch, idx) => (
                    <div
                      key={idx}
                      className="channel-card-lg"
                      title={ch.name}
                      style={{ background: ch.bg }}
                    >
                      {ch.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Marquee */}
        <div className="brands-marquee-section">
          <p className="brands-marquee-label">Trusted by brands across e-commerce, B2B &amp; institutional commerce</p>
          <div className="logo-marquee-wrap">
            <div className="logo-marquee-track">
              {[...portfolioLogos, ...portfolioLogos].map((logo, idx) => (
                <span key={idx} className="marquee-brand" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{logo.svg}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Band (Credibility Metric Track) */}
      <section className="stats-band">
        <div className="container stats-band-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <p className="stats-band-eyebrow" style={{ color: "#FBBF24" }}>The track record</p>
              <h2 className="stats-band-title">Numbers we&apos;re<br />measured on.</h2>
            </div>
            <p style={{ color: "#E2E8F0", maxWidth: "340px", fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.6 }}>
              Six years operating e-commerce across marketplaces, D2C, B2B and institutional channels for Indian brands.
            </p>
          </div>
          <div className="stats-grid">
            {[
              { num: "₹850 Cr+", caption: "GMV Managed" },
              { num: "35+", caption: "Channel Integrations" },
              { num: "12", caption: "State Warehouse Hubs" },
              { num: "98.2%", caption: "Fill Rate SLA" },
            ].map((stat, idx) => (
              <div key={idx} className="stat-block reveal" style={{ transitionDelay: `${idx * 0.1}s`, opacity: 1, transform: "none" }}>
                <span className="stat-number"><Counter target={stat.num} /></span>
                <div className="stat-divider" style={{ background: "linear-gradient(90deg, #FBBF24, #F59E0B)" }} />
                <p className="stat-caption" style={{ color: "#CBD5E1", fontSize: "0.9rem", fontWeight: 700, opacity: 1 }}>{stat.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE ACCOUNTABILITY PROBLEM (Fragmented-agency pain point) ── */}
      <ComparisonMatrix onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 5: THREE BUYER SITUATIONS (Routes to Launch / Fix & Grow / Scale page) ── */}
      <section className="paths-section" id="three-situations">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="ptn-section-eyebrow">Tailored Operating Paths</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Where Is Your Business Today?</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Choose Launch Online, Fix &amp; Grow, or Scale Pan-India as your primary entry route.</p>
          </div>
          <div className="paths-grid">
            {[
              { tag: "01. Launch Online", tagColor: "#2563EB", title: "Offline Brand / Manufacturer", desc: "Entering e-commerce for the first time across Amazon, Flipkart, Myntra, Moglix, JioMart, Snapmint, Bajaj and other approved platforms, plus D2C.", cta: "Explore Launch Mandate →", href: "/solutions/launch-online" },
              { tag: "02. Fix & Grow", tagColor: "#0D9488", title: "Active Marketplace Brand", desc: "Stuck with stagnant GMV, rising ACOS, un-audited settlement losses, or high customer returns. We audit, fix, and grow.", cta: "Explore Fix & Grow Audit →", href: "/solutions/fix-and-grow" },
              { tag: "03. Scale Pan-India", tagColor: "#7C3AED", title: "Established Enterprise Brand", desc: "Scaling 12-state warehouse inventory, regional dealer fulfilment, B2B/institutional channels, and multi-platform D2C sync.", cta: "Explore Pan-India Scale →", href: "/solutions/scale-pan-india" },
            ].map((card, idx) => (
              <div key={idx} className="path-card reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="path-card-tag" style={{ color: card.tagColor }}>{card.tag}</div>
                <h3 className="path-card-title">{card.title}</h3>
                <p className="path-card-desc">{card.desc}</p>
                <Link href={card.href} className="path-card-cta" style={{ color: card.tagColor }}>{card.cta}</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.95rem", color: "#475569", fontWeight: 600 }}>
            💡 We also help OEMs build brands, brands expand across platforms, and companies operate D2C and institutional commerce.
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY GOOD LIFE (Operator Credibility) ── */}
      <section className="unlock-section" id="why-good-life">
        <div className="container">
          <div className="unlock-card">
            <div>
              <span className="ptn-section-eyebrow">Operator Credibility</span>
              <h2 className="ptn-section-title" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>Why Leading Brands Partner With Good Life</h2>
              <p style={{ color: "#64748B", fontSize: "0.97rem", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                Unlike traditional agencies that only manage ads or shipping, Good Life operates your complete e-commerce stack with direct balance-sheet accountability.
              </p>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <button onClick={() => setDiagOpen(true)} className="btn-primary-hero" style={{ height: "46px", padding: "0 1.5rem", fontSize: "0.92rem" }}>Schedule a Demo →</button>
                <button onClick={() => setVideoOpen(true)} className="btn-ghost-hero" style={{ height: "46px", padding: "0 1.4rem", fontSize: "0.92rem" }}>▷ Watch Demo</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { num: "01", title: "Merchant & Distribution Partnership", desc: "We purchase stock, manage end-to-end catalogue listings, and take inventory risk off your balance sheet." },
                { num: "02", title: "OEM Brand Launch & Incubation", desc: "Proven track record launching 5 brand-new consumer labels on ecommerce for veteran manufacturing/OEM partners over the last 3 years." },
                { num: "03", title: "Unified Multi-Channel Execution", desc: "Synchronize inventory across 12 state hubs to satisfy Amazon, Flipkart, Myntra, Snapmint, B2B, Moglix, and D2C orders simultaneously." },
              ].map((item, idx) => (
                <div key={idx} className={`unlock-step ${activeAccStep === idx ? "active" : ""}`} onClick={() => setActiveAccStep(idx)}>
                  <div className="unlock-step-head">
                    <span className="unlock-step-num">{item.num}</span>
                    <h4 className="unlock-step-title">{item.title}</h4>
                  </div>
                  {activeAccStep === idx && <p className="unlock-step-desc">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY CATEGORIES SECTION (Feedback Item 6) ── */}
      <section className="industry-categories-section" style={{ background: "#FFFFFF", padding: "4.5rem 0", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow" style={{ color: "#7C3AED" }}>Specialised Vertical Operations</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Category-Specific Fulfilment &amp; Growth</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Customised operating workflows tailored for high-growth product categories.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="industry-categories-grid">
            {[
              {
                num: "01",
                title: "Beauty & Fashion",
                desc: "Expedited dispatch turnaround under 4 hours, batch expiration tracking, and return QC checks.",
                gradient: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
                badgeColor: "#7C3AED",
                borderColor: "#D8B4FE"
              },
              {
                num: "02",
                title: "Electronics & FMCG",
                desc: "High-value serial number tracking, return validation, and platform SLA compliance checks.",
                gradient: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
                badgeColor: "#0284C7",
                borderColor: "#7DD3FC"
              },
              {
                num: "03",
                title: "Nutrition & Luxury",
                desc: "FSSAI-compliant warehouse hygiene setup, batch control, and tamper-proof security shipping.",
                gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                badgeColor: "#D97706",
                borderColor: "#FCD34D"
              }
            ].map((cat, idx) => (
              <div key={idx} style={{
                background: cat.gradient,
                border: `1.5px solid ${cat.borderColor}`,
                borderRadius: "20px",
                padding: "2rem 1.6rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: cat.badgeColor, opacity: 0.85, marginBottom: "0.8rem", lineHeight: 1 }}>
                  {cat.num}
                </span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem", letterSpacing: "-0.3px" }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.65, fontWeight: 500, margin: 0 }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TEN CAPABILITIES (Links into each capability page) ── */}
      <section className="ptn-do-section" id="capabilities" style={{ background: "#F8FAFC", padding: "5.5rem 0", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div className="ptn-do-header" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="ptn-section-eyebrow" style={{ color: "#2563EB" }}>Ten Connected Commerce Capabilities</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Do It All With Good Life</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>
              Marketplace operations, D2C, B2B/institutional commerce, revenue assurance and pan-India fulfilment—managed through one accountable operating model.
            </p>
          </div>
          <div className="ptn-do-grid-10">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="ptn-card-v2">
                <div className="ptn-card-icon-badge" style={{ background: cap.bg, color: cap.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{cap.icon}</svg>
                </div>
                <h3 className="ptn-card-title-v2">{cap.title}</h3>
                <p className="ptn-card-desc-v2">{cap.desc}</p>
                <Link href={cap.href} className="ptn-card-link-v2" style={{ color: cap.color }}>
                  Explore Capability →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: HEAVY & BULKY MOAT (Dedicated visual block) ── */}
      <section className="heavy-bulky-section" id="heavy-bulky">
        <div className="container">
          <div className="heavy-bulky-inner">
            <div>
              <span className="ptn-section-eyebrow" style={{ color: "#6B7280" }}>Specialised Logistics Moat</span>
              <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Heavy &amp; Bulky Commerce Logistics</h2>
              <p style={{ color: "#475569", fontSize: "0.96rem", lineHeight: 1.7, marginTop: "0.8rem", marginBottom: "1.5rem" }}>
                Specialised freight handling, transit damage protection, custom crating and coordinated last-mile delivery for large appliances, industrial goods, and bulky consumer products across 12 states.
              </p>
              <Link href="/specialised/heavy-bulky-commerce" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", height: 44, padding: "0 1.4rem", borderRadius: 10, background: "#0F172A", color: "#FFF", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                Explore Heavy &amp; Bulky Solutions →
              </Link>
            </div>
            <div style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: 18, padding: "2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem", alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#0F172A" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>Specialised Heavy Freight Network</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Handling appliances, fitness gear &amp; machinery</div>
                </div>
              </div>
              <div className="heavy-bulky-features">
                <div style={{ padding: "0.6rem 0.8rem", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>✓ Zero-damage transit protocol</div>
                <div style={{ padding: "0.6rem 0.8rem", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>✓ Scheduled appointment delivery</div>
                <div style={{ padding: "0.6rem 0.8rem", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>✓ Return QC &amp; repackaging</div>
                <div style={{ padding: "0.6rem 0.8rem", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>✓ Regional hub buffer holding</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FULFILMENT NETWORK (India Map preview + Link) ── */}
      <WarehouseHubs />

      {/* ── SECTION 10: REVENUE ASSURANCE (Settlement/claims process visual + Leakage Calculator) ── */}
      <SavingsCalculator onOpenDiag={() => setDiagOpen(true)} />

      {/* ── SECTION 11: HOW ENGAGEMENT WORKS (Infographic Workflow) ── */}
      <section className="methodology-section" id="how-it-works" style={{ background: "#FFFFFF", padding: "5.5rem 0", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="ptn-section-eyebrow" style={{ color: "#2563EB" }}>How Engagement Works</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>A Structured Path to Scale</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Diagnostic → Solution Design → Integration → Execution → Review &amp; Scale</p>
          </div>

          <div className="infographic-workflow">
            <div className="infographic-track-line" />
            {[
              {
                step: "01",
                label: "Diagnostic",
                subtitle: "Audit & Assessment",
                desc: "Evaluate marketplace visibility, fee leaks, and current SLA metrics.",
                color: "#2563EB",
                bg: "#EFF6FF",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                )
              },
              {
                step: "02",
                label: "Solution Design",
                subtitle: "Strategy & Pricing",
                desc: "Listing architecture, pricing tiers, and multi-channel inventory plan.",
                color: "#0284C7",
                bg: "#F0F9FF",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                )
              },
              {
                step: "03",
                label: "Integration",
                subtitle: "WMS & Channel Sync",
                desc: "Link sales channels with 12-state WMS and daily automated reconciliation.",
                color: "#0D9488",
                bg: "#F0FDFA",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  </svg>
                )
              },
              {
                step: "04",
                label: "Execution",
                subtitle: "Ads & Fulfilment",
                desc: "Amazon & Flipkart ad management, order dispatch, and dispute resolution.",
                color: "#4F46E5",
                bg: "#EEF2FF",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                  </svg>
                )
              },
              {
                step: "05",
                label: "Review & Scale",
                subtitle: "Multi-Platform Growth",
                desc: "Weekly performance reporting, SKU expansion, and multi-platform growth.",
                color: "#7C3AED",
                bg: "#F5F3FF",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} className="infographic-step-card">
                <div className="infographic-step-header">
                  <span className="infographic-step-number" style={{ background: item.color }}>{item.step}</span>
                  <div className="infographic-icon-box" style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="infographic-step-title">{item.label}</h3>
                <span className="infographic-step-sub">{item.subtitle}</span>
                <p className="infographic-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: CASE STUDIES (3 approved stories) ── */}
      <section className="testimonials-section" id="case-studies">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="ptn-section-eyebrow">Verified Case Studies</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Proven Results Across Indian Brands</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Real revenue growth, SLA performance and fee recovery stories.</p>
          </div>
          <div className="testimonials-wrap">
            {testimonials.map((test, index) => (
              <div key={index} className="testimonial-card" style={{ display: activeSlide === index ? "block" : "none" }}>
                <p className="testimonial-quote">&ldquo;{test.quote}&rdquo;</p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" style={{ background: test.color }}><span>{test.initial}</span></div>
                  <div className="testimonial-meta-text">
                    <div className="testimonial-author">{test.author}</div>
                    <div className="testimonial-role">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button key={index} className={`testimonial-dot ${activeSlide === index ? "active" : ""}`} onClick={() => setActiveSlide(index)} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: AGENCY PARTNER STRIP ── */}
      <section className="agency-strip" id="agency-partners">
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "1.5px", color: "#94A3B8", textTransform: "uppercase" }}>Agency &amp; Strategic Growth Partners</span>
          <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.4rem", maxWidth: 580, margin: "0.4rem auto 0" }}>
            Good Life collaborates with branding agencies, performance marketers and strategy advisors to power the operational, inventory and fulfilment layer for their client portfolio.
          </p>
        </div>
      </section>

      {/* ── SECTION 14: INSIGHTS (Latest 3 CMS articles) ── */}
      <section className="insights-section" id="insights">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="ptn-section-eyebrow">Insights &amp; Journal</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Commerce Operating Strategy</h2>
            <p className="ptn-section-subtitle" style={{ marginTop: "0.4rem" }}>Latest articles on marketplace unit economics, fee audits, and pan-India logistics.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {insights.map((article, idx) => (
              <Link key={idx} href={article.link} style={{ textDecoration: "none", background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "all 0.2s ease" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px" }}>{article.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.45, marginBottom: "0.8rem" }}>{article.title}</h3>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563EB", display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "1rem" }}>
                  Read Article →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 15: FAQ (Schema-enabled) ── */}
      <section className="faq-section" id="faq">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": homeFaqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center" }}>
            <span className="ptn-section-eyebrow">Frequently Asked Questions</span>
            <h2 className="ptn-section-title" style={{ marginTop: "0.4rem" }}>Commerce Operating Partnership Insights</h2>
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {homeFaqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? "faq-open" : ""}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <span className="faq-trigger-icon">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 16: FINAL CTA BAND + FOOTER ── */}
      <section className="final-cta-section">
        <div className="container final-cta-inner">
          <h2 className="final-cta-title">Scale Your Brand With India&apos;s <span className="cta-br"><br /></span>Premier Commerce Operating Partner</h2>
          <p className="final-cta-subtitle">Request our complimentary Commerce Diagnostic to identify leakage points, unlock new channel growth—across marketplaces, D2C, B2B and institutional commerce.</p>
          <div className="final-cta-btn-wrap">
            <button onClick={() => setDiagOpen(true)} className="btn-final-cta">Request a Free Commerce Diagnostic →</button>
          </div>
        </div>
      </section>

      <Footer />

      <StickyBar onOpenDiag={() => setDiagOpen(true)} />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* VIDEO MODAL */}
      <div className={`video-modal-overlay ${videoOpen ? "open" : ""}`} onClick={() => setVideoOpen(false)}>
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="video-modal-close" onClick={() => setVideoOpen(false)}>&times;</button>
          {videoOpen && (
            <video controls autoPlay src="https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-data-on-a-computer-screen-40787-large.mp4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>
      </div>
    </div>
  );
}
