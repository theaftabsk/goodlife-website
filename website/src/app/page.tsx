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

  // Hero & Console Tilt Parallax
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
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

  // Simulated live Today's Orders count
  const [ordersCount, setOrdersCount] = useState(12847);
  const [flashOrders, setFlashOrders] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 3) + 1;
      setOrdersCount((prev) => prev + inc);
      setFlashOrders(true);
      const t = setTimeout(() => setFlashOrders(false), 600);
      return () => clearTimeout(t);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Live settlement log feed ticker
  const [heroLogs, setHeroLogs] = useState<string[]>([
    "AMZ Payout sync: Reconciled +₹1,24,500",
    "FK return validation: 12 items verified",
    "JioMart order feed: Synced activeSKUs",
    "Moglix B2B ledger check: Match success",
  ]);

  useEffect(() => {
    const logPool = [
      "AMZ payout matches ledger: 100% synced",
      "FK weight match: Corrected 2 disputes",
      "JioMart price sync: Updated 18 items",
      "Moglix inventory log: Pushed stock count",
      "GLS engine: Recovered ₹24,800 chargeback",
      "D2C warehouse check: 42 inbound items verified",
      "Nykaa fulfillment: Shifted 100 items to Gurgaon",
      "Myntra Ad bidding: Adjusted campaigns +8%",
    ];
    const interval = setInterval(() => {
      setHeroLogs((prev) => {
        const temp = [...prev.slice(1)];
        const rawLog = logPool[Math.floor(Math.random() * logPool.length)];
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        temp.push(`[${time}] ${rawLog}`);
        return temp;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Timeline Connector Animation
  const [isTimelineLit, setIsTimelineLit] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTimelineLit(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Testimonials Auto-Slider data & state
  const testimonials = [
    {
      quote:
        "Good Life transitioned our entire marketplace model. Their finance reconciliation caught leaks we didn't know existed, and our sales grew 2.5x in under a year.",
      author: "Founder & CEO",
      role: "National Kitchen Appliance Brand",
      initial: "N",
    },
    {
      quote:
        "We scaled from 1 to 12 states overnight. Good Life WMS is rock solid—our dispatch turnaround is consistently under 4 hours.",
      author: "Operations Director",
      role: "Leading Cosmetics Brand",
      initial: "C",
    },
    {
      quote:
        "Daily payment disputes were eating up our margins. Good Life automated audits resolved 98% of return variances instantly.",
      author: "Head of E-commerce",
      role: "Premier Wellness Partner",
      initial: "W",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Acceleration Accordion State
  const [activeAcc, setActiveAcc] = useState<number>(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const homeFaqs = [
    {
      q: "What makes Good Life different from a traditional e-commerce agency?",
      a: "Unlike simple marketing agencies or shipping companies, Good Life is an integrated Commerce Operating Partner. We take full accountability for catalog listings, inventory planning, multi-state warehousing, performance ads, settlement reconciliation, and multi-channel order dispatch.",
    },
    {
      q: "How does your finance reconciliation service work?",
      a: "We perform daily automated reconciliation audits on commissions, shipping charges, cash-on-delivery payments, returns, and payment gateways. We identify listing fee leaks and disputable platform returns, recovering money that typically goes unnoticed.",
    },
    {
      q: "Where are your warehouses located?",
      a: "We operate 12 warehousing locations across Gurgaon, Patna, Mumbai, Ahmedabad, Hyderabad, Guwahati, Bengaluru, Lucknow, Chennai, Indore, Kolkata, and Ludhiana, along with dedicated FBA/FA hubs in Jaipur and Coimbatore.",
    },
    {
      q: "Can Good Life help an OEM manufacturer launch a direct consumer brand?",
      a: "Yes! Through our Brand Incubation mandate, we have launched 5 new consumer brands over the last 3 years created by companies that previously operated primarily as OEMs.",
    },
    {
      q: "Do you support retail customers looking for water purifiers?",
      a: "Yes! While we power marketplace growth for national brands, we also directly manage and sell our legacy household water purifiers (RO systems, softeners, air purifiers) originally launched in 2005. You can visit our dedicated water solutions page to learn more.",
    },
  ];

  // Client portfolio logos (Grayscale style like GrowthPartners)
  const portfolioLogos = [
    "THORNE",
    "PURA",
    "HIMS",
    "GAIA HERBS",
    "SPANX",
    "PANASONIC",
    "MAMAEARTH",
    "boAt",
    "GOLF PRIDE",
    "GRAPHY",
    "IRON LADY",
    "COOKD",
  ];

  // Eshopbox-style channel integrations list
  const channelIntegrations = [
    { name: "Shopify", color: "#96BF48", icon: "🛍️" },
    { name: "WooCommerce", color: "#96588A", icon: "📦" },
    { name: "Amazon", color: "#FF9900", icon: "a" },
    { name: "Flipkart", color: "#2874F0", icon: "f" },
    { name: "Blinkit", color: "#F7C325", icon: "⚡" },
    { name: "Myntra", color: "#E42B78", icon: "M" },
    { name: "JioMart", color: "#0A85EA", icon: "J" },
    { name: "Moglix", color: "#E31E24", icon: "m" },
    { name: "Zepto", color: "#8E24AA", icon: "z" },
    { name: "Meesho", color: "#5F259F", icon: "m" },
    { name: "35+ Channels", color: "#0F172A", icon: "+" },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── HERO SECTION (GrowthPartners & Eshopbox Combined Design System) ── */}
      <section
        id="hero-home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          paddingTop: "140px",
          paddingBottom: "4rem",
          background: "radial-gradient(ellipse at 50% -10%, rgba(219, 234, 254, 0.7) 0%, rgba(237, 233, 254, 0.4) 45%, rgba(255, 255, 255, 1) 85%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft background ambient blur orbs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.12)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "-120px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(147, 51, 234, 0.12)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        <div className="container text-center" style={{ position: "relative", zIndex: 2 }}>
          {/* Top Pill Badge (GrowthPartners Style) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1.1rem",
              borderRadius: "50px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              marginBottom: "1.8rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10B981",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#475569",
                letterSpacing: "0.2px",
              }}
            >
              India&apos;s Premier Commerce Operating Partner • 12 States Network
            </span>
          </div>

          {/* Huge Main Headline with Colorful Gradient Text (GrowthPartners & Eshopbox Style) */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            Sell anywhere, Scale everywhere.<br />
            One Operating Partner for{" "}
            <span
              id="typewriter-word"
              className={transitionClass}
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              {words[wordIdx]}
            </span>
          </h1>

          {/* Subtitle (Eshopbox & GrowthPartners Style) */}
          <p
            style={{
              maxWidth: "760px",
              fontSize: "1.18rem",
              color: "#475569",
              margin: "1.6rem auto 2.4rem",
              lineHeight: 1.65,
              fontWeight: 450,
            }}
          >
            Good Life operates your complete e-commerce stack—managing catalogue listings,
            performance ads, 12-state warehousing, dispatch SLAs, and 100% automated settlement audits.
          </p>

          {/* Action CTAs (GrowthPartners Dual Button Style) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setDiagOpen(true)}
              style={{
                height: "54px",
                padding: "0 2.2rem",
                borderRadius: "12px",
                background: "#2563EB",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1.05rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                transition: "all 0.2s ease",
              }}
            >
              Request a Free Audit →
            </button>
            <button
              onClick={() => setVideoOpen(true)}
              style={{
                height: "54px",
                padding: "0 2rem",
                borderRadius: "12px",
                background: "#FFFFFF",
                color: "#2563EB",
                fontWeight: 700,
                fontSize: "1.02rem",
                border: "2px solid #2563EB",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
              }}
            >
              Watch Our Story
            </button>
          </div>

          {/* Star Rating Badge (GrowthPartners Style) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              marginTop: "1.4rem",
              fontSize: "0.9rem",
              color: "#64748B",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#F59E0B", fontSize: "1.1rem" }}>★★★★★</span>
            <span>4.9 average client rating across 13+ national brands</span>
          </div>

          {/* ── ESHOPBOX STYLE CONNECTED CHANNEL INTEGRATION STRIP ── */}
          <div
            style={{
              marginTop: "3.5rem",
              position: "relative",
              maxWidth: "1000px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "1rem 0",
            }}
          >
            {/* Dashed connecting line */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "40px",
                right: "40px",
                height: "2px",
                borderTop: "2px dashed #CBD5E1",
                zIndex: 1,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
                overflowX: "auto",
                padding: "0.5rem 0",
                gap: "0.8rem",
              }}
            >
              {channelIntegrations.map((ch, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    color: ch.color,
                    flexShrink: 0,
                  }}
                  title={ch.name}
                >
                  {ch.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GROWTHPARTNERS STYLE GRAYSCALE CLIENT LOGO MARQUEE STRIP ── */}
        <div
          style={{
            marginTop: "3rem",
            background: "#FFFFFF",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
            padding: "2rem 0",
          }}
        >
          <div className="container">
            <p
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                color: "#94A3B8",
                fontWeight: 800,
                marginBottom: "1.4rem",
              }}
            >
              TRUSTED BY BRANDS ACROSS E-COMMERCE, B2B & RETAIL
            </p>
          </div>

          <div className="logo-marquee-wrap">
            <div className="logo-marquee-track">
              {portfolioLogos.map((logo, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 900,
                    color: "#64748B",
                    letterSpacing: "1.8px",
                    padding: "0 2.2rem",
                    textTransform: "uppercase",
                    opacity: 0.85,
                    filter: "grayscale(100%)",
                  }}
                >
                  {logo}
                </span>
              ))}
              {portfolioLogos.map((logo, idx) => (
                <span
                  key={`dup-${idx}`}
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 900,
                    color: "#64748B",
                    letterSpacing: "1.8px",
                    padding: "0 2.2rem",
                    textTransform: "uppercase",
                    opacity: 0.85,
                    filter: "grayscale(100%)",
                  }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL-TIME OPERATIONS CONSOLE BAND (ESHOPBOX DASHBOARD MOCKUP STYLE) ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "3rem" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              UNIFIED SOFTWARE &amp; OPERATIONS
            </span>
            <h2
              style={{
                fontSize: "2.4rem",
                fontWeight: 900,
                color: "#0F172A",
                marginTop: "0.4rem",
              }}
            >
              Good Life Growth Engine Console
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", maxWidth: "650px", margin: "0.4rem auto 0" }}>
              Control inventory, order feeds, and settlement audits under one clean operating dashboard.
            </p>
          </div>

          <div className="console-mockup-wrap">
            <div
              className="dashboard-mockup"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: "transform 0.15s ease-out",
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="dash-content-container" style={{ padding: "1.8rem" }}>
                {/* Eshopbox style dashboard top navbar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #E2E8F0",
                    paddingBottom: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
                    <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0F172A" }}>
                      GOOD LIFE ENGINE
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.2rem",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#64748B",
                      }}
                    >
                      <span style={{ color: "#2563EB", borderBottom: "2px solid #2563EB", paddingBottom: "0.4rem" }}>
                        Overview
                      </span>
                      <span>Inventory</span>
                      <span>Orders</span>
                      <span>Reports</span>
                      <span>Claims &amp; COD</span>
                      <span>Shipping</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#ECFDF5",
                      border: "1px solid #A7F3D0",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "20px",
                      color: "#059669",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981" }} />
                    Live Syncing
                  </div>
                </div>

                <div className="dash-kpi-row">
                  <div
                    className={`dash-kpi ${flashOrders ? "flash-highlight" : ""}`}
                    style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                  >
                    <div className="dash-kpi-label" style={{ color: "#64748B" }}>
                      Today&apos;s Live Orders
                    </div>
                    <div className="dash-kpi-value" style={{ color: "#0F172A" }}>
                      {ordersCount.toLocaleString()}
                    </div>
                    <div className="dash-kpi-delta" style={{ color: "#059669" }}>
                      ↑ 18.4% vs yesterday
                    </div>
                  </div>

                  <div className="dash-kpi" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <div className="dash-kpi-label" style={{ color: "#64748B" }}>
                      Active Channels
                    </div>
                    <div className="dash-kpi-value" style={{ color: "#0F172A" }}>
                      4 Markets
                    </div>
                    <div className="dash-kpi-delta" style={{ color: "#2563EB" }}>
                      ↑ 100% Synced
                    </div>
                  </div>

                  <div className="dash-kpi" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <div className="dash-kpi-label" style={{ color: "#64748B" }}>
                      GMV This Month
                    </div>
                    <div className="dash-kpi-value" style={{ color: "#0F172A" }}>
                      ₹16.8 Cr
                    </div>
                    <div className="dash-kpi-delta" style={{ color: "#059669" }}>
                      ↑ On Target
                    </div>
                  </div>

                  <div className="dash-kpi" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <div className="dash-kpi-label" style={{ color: "#64748B" }}>
                      Fill Rate SLA
                    </div>
                    <div className="dash-kpi-value" style={{ color: "#0F172A" }}>
                      98.2%
                    </div>
                    <div className="dash-kpi-delta" style={{ color: "#059669" }}>
                      ↑ 3.1% MoM
                    </div>
                  </div>
                </div>

                <div
                  className="sim-log-wrap"
                  style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px" }}
                >
                  <div className="sim-log-header" style={{ color: "#2563EB" }}>
                    Settlement &amp; Payout Audit Stream
                  </div>
                  {heroLogs.map((log, index) => (
                    <div key={index} className="sim-log-line">
                      <span className="sim-log-text" style={{ color: "#334155" }}>
                        {log}
                      </span>
                      <span className="sim-log-success" style={{ color: "#059669", fontWeight: 700 }}>
                        ✓ RECONCILED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE TAILORED OPERATING PATHS (GROWTHPARTNERS STYLE CARDS) ── */}
      <section
        id="three-situations"
        style={{
          padding: "5rem 0",
          background: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div className="container">
          <div className="section-header text-center">
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              TAILORED OPERATING PATHS
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0F172A", marginTop: "0.4rem" }}>
              Where Is Your Business Today?
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.02rem", maxWidth: "750px", margin: "0.5rem auto 0" }}>
              Choose Launch Online, Fix &amp; Grow, or Scale Pan-India as your primary entry route.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "2.2rem",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ color: "#2563EB", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                01. LAUNCH ONLINE
              </div>
              <h3 style={{ color: "#0F172A", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                Offline Brand / Manufacturer
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.93rem", lineHeight: 1.65, marginBottom: "1.4rem" }}>
                Entering e-commerce for the first time across Amazon, Flipkart, Myntra, category portals, and direct D2C store.
              </p>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563EB",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Explore Launch Mandate →
              </button>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "2.2rem",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ color: "#2563EB", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                02. FIX &amp; GROW
              </div>
              <h3 style={{ color: "#0F172A", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                Active Marketplace Brand
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.93rem", lineHeight: 1.65, marginBottom: "1.4rem" }}>
                Stuck with stagnant GMV, rising ACOS, un-audited settlement losses, or high customer returns.
              </p>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563EB",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Explore Fix &amp; Grow Audit →
              </button>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "2.2rem",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                03. SCALE PAN-INDIA
              </div>
              <h3 style={{ color: "#0F172A", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                Established Enterprise Brand
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.93rem", lineHeight: 1.65, marginBottom: "1.4rem" }}>
                Scaling 12-state warehouse inventory, regional dealer fulfilment, B2B portals, and D2C channel sync.
              </p>
              <Link
                href="/b2b-institutional-commerce"
                style={{
                  color: "#7C3AED",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                Explore Pan-India Scale →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPANDED 10-PILLAR CAPABILITIES GRID ── */}
      <section id="capabilities" style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container">
          <div className="section-header text-center">
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              CONNECTED OPERATING PILLARS
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0F172A", marginTop: "0.4rem" }}>
              End-to-End Commerce Capabilities Grid
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.02rem" }}>
              Single-point operational accountability across all critical commerce building blocks.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
              marginTop: "3rem",
            }}
          >
            {[
              { id: "ops", name: "Marketplace Operations", desc: "Listings, catalogue data, buy box, and account controls." },
              { id: "ads", name: "Marketplace Growth & Ads", desc: "Established Amazon & Flipkart performance ad campaigns." },
              { id: "multi-platform", name: "Multi-Platform Commerce", desc: "Amazon, Flipkart, Myntra, Snapmint, Moglix, JioMart, etc." },
              { id: "d2c-ops", name: "D2C Commerce Operations", desc: "Storefront catalog, order flow, returns & reverse logistics." },
              { id: "b2b-ops", name: "B2B & Institutional Commerce", desc: "Bulk orders, trade buyers & regional dealer replenishment." },
              { id: "inventory", name: "Inventory Planning", desc: "Multi-channel stock buffers & demand forecasting." },
              { id: "fulfilment", name: "Warehousing & Fulfilment", desc: "12-state regional warehouse network with rapid dispatch." },
              { id: "revenue", name: "Revenue Assurance", desc: "Automated audit of platform settlements & claims." },
              { id: "returns", name: "Returns Management", desc: "Reverse logistics QC, RTO reduction & refund workflows." },
              { id: "water", name: "Household Water Solutions", desc: "RO Systems & Softeners launched in 2005 (Legacy Brand)." },
            ].map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  padding: "1.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563EB", marginBottom: "0.4rem" }}>
                  PILLAR {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <h3 style={{ fontSize: "1.1rem", color: "#0F172A", fontWeight: 800, marginBottom: "0.4rem" }}>
                  {cap.name}
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.55, margin: 0 }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ padding: "5rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center">
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0F172A", marginTop: "0.4rem" }}>
              Commerce Operating Partnership Insights
            </h2>
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    background: "none",
                    border: "none",
                    color: "#0F172A",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {faq.q}
                  <span style={{ color: "#2563EB", fontSize: "1.3rem", fontWeight: 700 }}>
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 1.5rem 1.25rem", color: "#475569", fontSize: "0.93rem", lineHeight: 1.65 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA STRIP (GROWTHPARTNERS STYLE CTA) ── */}
      <section
        style={{
          padding: "5.5rem 0",
          background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #6D28D9 100%)",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem", color: "#FFFFFF" }}>
            Scale Your Brand With India&apos;s Premier Commerce Operating Partner
          </h2>
          <p style={{ color: "#E0E7FF", marginBottom: "2.2rem", maxWidth: "640px", margin: "0 auto 2.2rem", fontSize: "1.1rem" }}>
            Request our complimentary Commerce Diagnostic to identify leakage points, unlock new channel growth, and optimize multi-state fulfilment.
          </p>
          <button
            onClick={() => setDiagOpen(true)}
            style={{
              height: "54px",
              padding: "0 2.4rem",
              borderRadius: "12px",
              background: "#FFFFFF",
              color: "#1E40AF",
              fontWeight: 800,
              fontSize: "1.05rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            Request a Free Audit →
          </button>
        </div>
      </section>

      <Footer />

      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}

      {/* WATCH VIDEO MODAL OVERLAY */}
      <div
        className={`video-modal-overlay ${videoOpen ? "open" : ""}`}
        onClick={() => setVideoOpen(false)}
      >
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="video-modal-close" onClick={() => setVideoOpen(false)}>
            &times;
          </button>
          {videoOpen && (
            <video
              controls
              autoPlay
              src="https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-data-on-a-computer-screen-40787-large.mp4"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
