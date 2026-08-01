"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommerceDiagnosticModal from "./components/CommerceDiagnosticModal";
import "./home.css";

// ═══════════════════════════════════════════════
// COUNTER ANIMATION COMPONENT
// ═══════════════════════════════════════════════
const Counter: React.FC<{ target: string }> = ({ target }) => {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    function animate() {
      const cleanTargetStr = target;
      const prefix = cleanTargetStr.startsWith("₹") ? "₹" : "";
      const hasCr = cleanTargetStr.includes("Cr");
      const hasPlus = cleanTargetStr.includes("+");
      const targetVal = parseFloat(cleanTargetStr.replace(/[^0-9.]/g, ""));

      if (isNaN(targetVal)) {
        setValue(cleanTargetStr);
        return;
      }

      const duration = 1800;
      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * targetVal);

        setValue(
          prefix +
            current.toLocaleString("en-IN") +
            (hasCr ? " Cr" : "") +
            (hasPlus ? "+" : "")
        );

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(cleanTargetStr);
        }
      }
      requestAnimationFrame(tick);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
};

// ═══════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════
export default function Home() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // Hero Tilt Parallax
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    setTilt({ rx: rotateX, ry: rotateY });
  };
  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Word Cycle Rotate Animation
  const words = [
    "Marketplaces",
    "D2C Store",
    "B2B Channels",
    "Institutional Orders",
    "Dealer Supply",
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionClass("exit");

      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
        setTransitionClass("enter");

        setTimeout(() => {
          setTransitionClass("");
        }, 50);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, [words.length]);

  // Global mousemove coordinate tracker for cursor glow
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // Simulated live Today's Orders count
  const [ordersCount, setOrdersCount] = useState(12847);
  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 3) + 1;
      setOrdersCount((prev) => prev + inc);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const homeFaqs = [
    {
      q: "What makes Good Life different from a traditional e-commerce agency?",
      a: "Good Life is an integrated Commerce Operating Partner, not a fragmented agency. We take full accountability for catalogue, inventory planning, multi-state warehousing, performance ads, settlement reconciliation, and multi-channel order dispatch."
    },
    {
      q: "Can Good Life help an OEM manufacturer launch a direct consumer brand?",
      a: "Yes. Through our Brand Incubation mandate, we have launched five new brands over the last 3 years created by companies that previously operated primarily as OEMs."
    },
    {
      q: "Which platforms does Good Life operate across?",
      a: "We operate across mainstream marketplaces (Amazon, Flipkart), fashion platforms (Myntra), B2B channels (Moglix, IndiaMART, TradeIndia, Jio B2B), and consumer-finance ecosystems (Snapmint, Bajaj)."
    },
    {
      q: "How does Good Life handle B2B and regional dealer supplies?",
      a: "Good Life acts as a warehouse-supported regional inventory buffer partner, fulfilling bulk corporate orders, institutional requests, and local dealer replenishment from our 12-state warehouse network."
    }
  ];

  return (
    <>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── HERO SECTION ── */}
      <section className="hero" id="hero-home" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ paddingTop: "120px" }}>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="hero-inner">
          <div className="hero-banner">
            <div className="hero-banner-content">
              <p className="hero-banner-text">
                <span className="hero-banner-bold">India&apos;s Commerce Operating Partner.</span>{" "}
                Marketplace growth, D2C, B2B & Pan-India Fulfilment managed under one accountable model.
              </p>
            </div>
          </div>

          <h1 className="hero-title" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.15 }}>
            India&apos;s Commerce Operating Partner<br />
            for Brands Across <span id="typewriter-word" className={transitionClass}>{words[wordIdx]}</span>
          </h1>

          <p className="hero-description" style={{ maxWidth: "820px", fontSize: "1.1rem", color: "#9CA3AF", margin: "1.2rem auto 2rem" }}>
            Good Life helps brands launch, operate and scale across marketplaces, D2C, B2B and institutional channels—supported by inventory planning, pan-India fulfilment, performance marketing and revenue assurance.
          </p>

          <div className="hero-actions" style={{ gap: "1rem" }}>
            <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
              Request a Commerce Diagnostic
              <span className="hero-cta-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </button>
            <Link href="#three-situations" className="hero-play-btn" style={{ textDecoration: "none" }}>
              Explore Operating Models ↓
            </Link>
          </div>

          {/* Key Stats Strip */}
          <div className="hero-stats" style={{ marginTop: "3rem" }}>
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="₹200 Cr" /></span>
              <span className="stat-label">Gross Turnover</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="12" /></span>
              <span className="stat-label">States Fulfilment</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="13+" /></span>
              <span className="stat-label">National Brands</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="5" /></span>
              <span className="stat-label">OEM Brands Launched</span>
            </div>
          </div>
        </div>

        {/* Approved Platform Strip */}
        <div className="hero-logo-strip" style={{ marginTop: "3rem", background: "rgba(15, 23, 42, 0.8)" }}>
          <div className="logo-marquee-wrap">
            <div className="logo-marquee-track">
              {["Amazon", "Flipkart", "Myntra", "Snapmint", "Moglix", "JioMart", "IB", "Bajaj"].map((logo, idx) => (
                <span key={idx} className="hero-logo-item" style={{ fontSize: "1rem", fontWeight: 700, color: "#E5E7EB" }}>
                  ✦ {logo}
                </span>
              ))}
              {["Amazon", "Flipkart", "Myntra", "Snapmint", "Moglix", "JioMart", "IB", "Bajaj"].map((logo, idx) => (
                <span key={`dup-${idx}`} className="hero-logo-item" style={{ fontSize: "1rem", fontWeight: 700, color: "#E5E7EB" }}>
                  ✦ {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE BUYER SITUATIONS SECTION ── */}
      <section id="three-situations" style={{ padding: "5rem 0", background: "rgba(17, 24, 39, 0.4)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">TAILORED OPERATING PATHS</span>
            <h2 className="section-title">Where Is Your Business Today?</h2>
            <p className="section-subtitle" style={{ maxWidth: "780px", margin: "0.5rem auto 0" }}>
              Keep Launch, Fix & Grow, or Scale as your primary entry route—backed by connected capability across D2C, B2B, and OEM incubation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            <div id="launch" className="glass-card-feature">
              <div style={{ color: "#38BDF8", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>01. LAUNCH ONLINE</div>
              <h3 style={{ color: "#FFF", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem" }}>Offline Brand / Manufacturer</h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                Entering e-commerce for the first time across Amazon, Flipkart, Myntra, category platforms, and direct D2C store.
              </p>
              <Link href="/#launch" style={{ color: "#38BDF8", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Explore Launch Online Mandate →
              </Link>
            </div>

            <div id="fix-grow" className="glass-card-feature">
              <div style={{ color: "#60A5FA", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>02. FIX & GROW</div>
              <h3 style={{ color: "#FFF", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem" }}>Active Marketplace Brand</h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                Stuck with stagnant GMV, rising ACOS, un-audited settlement losses, or high customer returns.
              </p>
              <Link href="/#fix-grow" style={{ color: "#60A5FA", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Explore Fix & Grow Audit →
              </Link>
            </div>

            <div id="scale" className="glass-card-feature">
              <div style={{ color: "#3B82F6", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>03. SCALE PAN-INDIA</div>
              <h3 style={{ color: "#FFF", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem" }}>Established Enterprise Brand</h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                Scaling multi-state warehouse inventory, regional dealer fulfilment, B2B portals, and D2C channel synchronization.
              </p>
              <Link href="/b2b-institutional-commerce" style={{ color: "#3B82F6", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Explore Pan-India B2B Scale →
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem", padding: "1rem", background: "rgba(56, 189, 248, 0.08)", borderRadius: "12px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
            <p style={{ color: "#E5E7EB", fontSize: "0.95rem", margin: 0, fontWeight: 500 }}>
              ✦ <strong style={{ color: "#38BDF8" }}>Secondary Capability Line:</strong> We also help OEMs build market-ready brands, brands expand across platforms, and companies operate D2C and institutional commerce.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXPANDED 10-PILLAR CAPABILITIES GRID ── */}
      <section id="capabilities" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">CONNECTED OPERATING PILLARS</span>
            <h2 className="section-title">End-to-End Commerce Capabilities Grid</h2>
            <p className="section-subtitle">Single-point operational accountability across all critical commerce building blocks.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "3rem" }}>
            {[
              { id: "ops", name: "Marketplace Operations", link: "/#ops", desc: "Listings, catalogue data, buy box, and account controls." },
              { id: "ads", name: "Marketplace Growth & Ads", link: "/#ads", desc: "Established Amazon & Flipkart performance ad campaigns." },
              { id: "multi-platform", name: "Multi-Platform Commerce", link: "/multi-platform-commerce", desc: "Amazon, Flipkart, Myntra, Snapmint, Moglix, JioMart, etc." },
              { id: "d2c-ops", name: "D2C Commerce Operations", link: "/d2c-commerce-operations", desc: "Storefront catalog, order flow, returns & reverse logistics." },
              { id: "b2b-ops", name: "B2B & Institutional Commerce", link: "/b2b-institutional-commerce", desc: "Bulk orders, trade buyers & regional dealer replenishment." },
              { id: "inventory", name: "Inventory Planning", link: "/#inventory", desc: "Multi-channel stock buffers & demand forecasting." },
              { id: "fulfilment", name: "Warehousing & Fulfilment", link: "/#fulfilment", desc: "12-state regional warehouse network with rapid dispatch." },
              { id: "revenue", name: "Revenue Assurance", link: "/#revenue", desc: "Automated audit of platform settlements & claims." },
              { id: "returns", name: "Returns Management", link: "/#returns", desc: "Reverse logistics QC, RTO reduction & refund workflows." },
              { id: "bulky", name: "Heavy & Bulky Commerce", link: "/#bulky", desc: "Specialized logistics for appliances, furniture & heavy items." }
            ].map((cap, idx) => (
              <div key={idx} id={cap.id} className="glass-card-feature" style={{ scrollMarginTop: "90px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#38BDF8", marginBottom: "0.4rem" }}>PILLAR 0{idx + 1}</div>
                <h3 style={{ fontSize: "1.1rem", color: "#FFF", fontWeight: 700, marginBottom: "0.4rem" }}>
                  {cap.link.startsWith("/") && cap.link.includes("-") ? (
                    <Link href={cap.link} style={{ color: "inherit", textDecoration: "none" }}>{cap.name}</Link>
                  ) : (
                    cap.name
                  )}
                </h3>
                <p style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW HOMEPAGE SECTION 1: OEM BRAND INCUBATION ── */}
      <section style={{ padding: "5rem 0", background: "rgba(15, 23, 42, 0.7)", borderTop: "1px solid rgba(255, 255, 255, 0.05)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <span className="section-tag">BRAND INCUBATION FOR MANUFACTURERS</span>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                From OEM Capability to a Market-Ready Ecommerce Brand
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Good Life combines category demand data, marketplace execution, catalogue architecture, pricing, multi-state fulfilment, and performance marketing to help capable product manufacturers build high-margin digital consumer brands.
              </p>
              <div style={{ padding: "1.2rem", background: "rgba(56, 189, 248, 0.1)", borderRadius: "12px", border: "1px solid rgba(56, 189, 248, 0.3)", marginBottom: "1.5rem" }}>
                <p style={{ color: "#FFF", fontSize: "0.92rem", margin: 0, fontWeight: 600 }}>
                  🏆 5 New OEM Brands Launched in E-Commerce Over the Last 3 Years.
                </p>
              </div>
              <Link href="/brand-launch-incubation" className="hero-cta-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
                Explore Brand Incubation →
              </Link>
            </div>
            {/* Visual Graphic card */}
            <div className="glass-card-feature" style={{ padding: "2.5rem" }}>
              <h3 style={{ color: "#FFF", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Incubation Roadmap</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ padding: "0.8rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: "3px solid #38BDF8" }}>
                  <div style={{ color: "#38BDF8", fontWeight: 700, fontSize: "0.85rem" }}>STAGE 1</div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>Catalogue & Brand Identity Creation</div>
                </div>
                <div style={{ padding: "0.8rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: "3px solid #60A5FA" }}>
                  <div style={{ color: "#60A5FA", fontWeight: 700, fontSize: "0.85rem" }}>STAGE 2</div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>Multi-Marketplace & D2C Store Onboarding</div>
                </div>
                <div style={{ padding: "0.8rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: "3px solid #3B82F6" }}>
                  <div style={{ color: "#3B82F6", fontWeight: 700, fontSize: "0.85rem" }}>STAGE 3</div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>Pan-India Warehouse Deployment & Performance Ads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW HOMEPAGE SECTION 2: B2B & INSTITUTIONAL ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <span className="section-tag">B2B & INSTITUTIONAL CHANNEL CONTROL</span>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                Corporate, Institutional & Dealer Commerce Under One Roof
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Scale beyond D2C and consumer marketplaces with unified commercial operations for bulk buyer invoicing, GST compliance, institutional purchase orders, and multi-state warehouse dispatch.
              </p>
              <Link href="/b2b-institutional-commerce" className="hero-cta-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
                Explore B2B & Institutional Solution →
              </Link>
            </div>
            <div className="glass-card-feature" style={{ padding: "2rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38BDF8", marginBottom: "0.8rem" }}>CONNECTED B2B CHANNELS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem" }}>
                {["IndiaMART", "TradeIndia", "Moglix", "Jio B2B", "Direct Bids"].map((ch, idx) => (
                  <span key={idx} style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontWeight: 600, fontSize: "0.85rem" }}>
                    {ch}
                  </span>
                ))}
              </div>
              <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                Qualification → Commercial Approval → Inventory Allocation → Dispatch → Reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs SECTION ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center">
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Commerce Operating Partnership Insights</h2>
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {homeFaqs.map((faq, idx) => (
              <div key={idx} style={{
                background: "rgba(17, 24, 39, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                overflow: "hidden"
              }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "1.2rem 1.5rem",
                    background: "none",
                    border: "none",
                    color: "#FFF",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  {faq.q}
                  <span style={{ color: "#38BDF8", fontSize: "1.2rem" }}>{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 1.5rem 1.2rem", color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA STRIP ── */}
      <section style={{ padding: "4rem 0", background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, rgba(11, 15, 25, 1) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.2rem", color: "#FFF", fontWeight: 800, marginBottom: "1rem" }}>
            Scale Your Brand With India&apos;s Premier Commerce Operating Partner
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", maxWidth: "620px", margin: "0 auto 2rem" }}>
            Take our 10-step Commerce Diagnostic to identify leaks, unlock new channel growth, and optimize multi-state fulfilment.
          </p>
          <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
            Request a Commerce Diagnostic
          </button>
        </div>
      </section>

      <Footer />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </>
  );
}
