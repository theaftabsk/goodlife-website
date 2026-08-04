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

  // Scroll reveal trigger hook using IntersectionObserver
  useEffect(() => {
    const revealEls = document.querySelectorAll(".scroll-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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

  return (
    <>
      {/* Stripe-style cursor glow element */}
      <div className="cursor-glow-element"></div>

      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── HERO SECTION ── */}
      <section
        className="hero"
        id="hero-home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ paddingTop: "120px" }}
      >
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />

        <div className="hero-inner">
          <div className="hero-banner">
            <div className="hero-banner-content">
              <p className="hero-banner-text">
                <span className="hero-banner-bold">
                  India&apos;s Commerce Operating Partner.
                </span>{" "}
                Marketplace growth, D2C, B2B & Pan-India Fulfilment managed under
                one accountable model.
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setDiagOpen(true);
              }}
              className="hero-banner-arrow"
              aria-label="Request audit"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <h1
            className="hero-title"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.15 }}
          >
            India&apos;s Commerce Operating Partner<br />
            for Brands Across{" "}
            <span id="typewriter-word" className={transitionClass}>
              {words[wordIdx]}
            </span>
          </h1>

          <p
            className="hero-description"
            style={{
              maxWidth: "820px",
              fontSize: "1.1rem",
              color: "#9CA3AF",
              margin: "1.2rem auto 2rem",
            }}
          >
            Good Life helps brands launch, operate and scale across marketplaces,
            D2C, B2B and institutional channels—supported by inventory planning,
            pan-India fulfilment, performance marketing and revenue assurance.
          </p>

          <div className="hero-actions" style={{ gap: "1rem" }}>
            <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
              Request a Free Audit
              <span className="hero-cta-arrow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button
              className="hero-play-btn"
              onClick={() => setVideoOpen(true)}
            >
              <span className="hero-play-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Our Story
            </button>
          </div>

          {/* Key Stats Strip */}
          <div className="hero-stats" style={{ marginTop: "3rem" }}>
            <div className="hero-stat-item">
              <span className="stat-num">
                <Counter target="₹200 Cr" />
              </span>
              <span className="stat-label">Gross Turnover</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num">
                <Counter target="140+" />
              </span>
              <span className="stat-label">Ops Team</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num">
                <Counter target="12" />
              </span>
              <span className="stat-label">States Fulfilment</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num">
                <Counter target="13+" />
              </span>
              <span className="stat-label">National Brands</span>
            </div>
          </div>
        </div>

        {/* Approved Platform Strip */}
        <div
          className="hero-logo-strip"
          style={{ marginTop: "3rem", background: "rgba(15, 23, 42, 0.8)" }}
        >
          <div className="logo-marquee-wrap">
            <div className="logo-marquee-track">
              {[
                "Amazon",
                "Flipkart",
                "Myntra",
                "Snapmint",
                "Moglix",
                "JioMart",
                "IB",
                "Bajaj",
              ].map((logo, idx) => (
                <span
                  key={idx}
                  className="hero-logo-item"
                  style={{ fontSize: "1rem", fontWeight: 700, color: "#E5E7EB" }}
                >
                  ✦ {logo}
                </span>
              ))}
              {[
                "Amazon",
                "Flipkart",
                "Myntra",
                "Snapmint",
                "Moglix",
                "JioMart",
                "IB",
                "Bajaj",
              ].map((logo, idx) => (
                <span
                  key={`dup-${idx}`}
                  className="hero-logo-item"
                  style={{ fontSize: "1rem", fontWeight: 700, color: "#E5E7EB" }}
                >
                  ✦ {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL-TIME OPERATIONS CONSOLE BAND ── */}
      <section className="console-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">REAL-TIME ENGINE</span>
            <h2 className="section-title">GOODLIFE GROWTH CONSOLE</h2>
            <p className="section-subtitle">
              Live status and channel settlements synced under a single unified
              dashboard.
            </p>
          </div>

          <div className="console-mockup-wrap">
            <div
              className="dashboard-mockup"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <div className="dash-orb dash-orb-1"></div>
              <div className="dash-orb dash-orb-2"></div>

              <div className="dash-content-container">
                <div className="dash-top-bar">
                  <div className="dash-dots">
                    <span className="dash-dot"></span>
                    <span className="dash-dot"></span>
                    <span className="dash-dot"></span>
                  </div>
                  <div className="dash-title">GOODLIFE ENGINE</div>
                  <div className="dash-status">
                    <span className="dash-status-dot"></span>
                    LIVE
                  </div>
                </div>

                <div className="dash-kpi-row">
                  <div
                    className={`dash-kpi ${
                      flashOrders ? "flash-highlight" : ""
                    }`}
                  >
                    <div className="dash-kpi-label">Today&apos;s Orders</div>
                    <div className="dash-kpi-value">
                      {ordersCount.toLocaleString()}
                    </div>
                    <div className="dash-kpi-delta">↑ 18.4% vs yesterday</div>
                  </div>
                  <div className="dash-kpi">
                    <div className="dash-kpi-label">Active Channels</div>
                    <div className="dash-kpi-value">4 Markets</div>
                    <div className="dash-kpi-delta">↑ All synced</div>
                  </div>
                  <div className="dash-kpi">
                    <div className="dash-kpi-label">GMV This Month</div>
                    <div className="dash-kpi-value">₹16.8 Cr</div>
                    <div className="dash-kpi-delta">↑ On target</div>
                  </div>
                  <div className="dash-kpi">
                    <div className="dash-kpi-label">Fill Rate</div>
                    <div className="dash-kpi-value">98.2%</div>
                    <div className="dash-kpi-delta">↑ 3.1% MoM</div>
                  </div>
                </div>

                <div className="sim-log-wrap">
                  <div className="sim-log-header">Settlement &amp; Payout Log</div>
                  {heroLogs.map((log, index) => (
                    <div key={index} className="sim-log-line">
                      <span className="sim-log-text">{log}</span>
                      <span className="sim-log-success">✓ MATCH</span>
                    </div>
                  ))}
                </div>

                <div className="dash-chart-area">
                  <div className="dash-chart-label">
                    Channel GMV Split — Current Quarter
                  </div>
                  <div className="chart-layout-wrapper">
                    <div className="chart-left">
                      <svg viewBox="0 0 100 100" className="donut-chart-svg">
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          strokeDasharray="80.4 201"
                          strokeDashoffset="0"
                          className="donut-slice donut-slice-1"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="8"
                          strokeDasharray="50.25 201"
                          strokeDashoffset="-80.4"
                          className="donut-slice donut-slice-2"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#06B6D4"
                          strokeWidth="8"
                          strokeDasharray="30.15 201"
                          strokeDashoffset="-130.65"
                          className="donut-slice donut-slice-3"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#6366F1"
                          strokeWidth="8"
                          strokeDasharray="20.1 201"
                          strokeDashoffset="-160.8"
                          className="donut-slice donut-slice-4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#8B5CF6"
                          strokeWidth="8"
                          strokeDasharray="14.07 201"
                          strokeDashoffset="-180.9"
                          className="donut-slice donut-slice-5"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="transparent"
                          stroke="#94A3B8"
                          strokeWidth="8"
                          strokeDasharray="6.03 201"
                          strokeDashoffset="-194.97"
                          className="donut-slice donut-slice-6"
                        />
                      </svg>
                      <div className="donut-center-text">
                        <div className="donut-center-val">₹16.8Cr</div>
                        <div className="donut-center-lbl">Total GMV</div>
                      </div>
                    </div>
                    <div className="chart-right">
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#3B82F6" }}
                        ></span>
                        AMZ (40%)
                      </span>
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#F59E0B" }}
                        ></span>
                        FLK (25%)
                      </span>
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#06B6D4" }}
                        ></span>
                        JIO (15%)
                      </span>
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#6366F1" }}
                        ></span>
                        MGL (10%)
                      </span>
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#8B5CF6" }}
                        ></span>
                        D2C (7%)
                      </span>
                      <span className="market-pill">
                        <span
                          className="market-pill-dot"
                          style={{ background: "#94A3B8" }}
                        ></span>
                        OTH (3%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="stats-band">
        <div className="liquid-glass-orb stats-orb-1"></div>
        <div className="liquid-glass-orb stats-orb-2"></div>
        <div className="container stats-grid">
          <div className="stat-card card-violet">
            <div className="stat-icon-wrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stat-icon"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="₹200 Cr" />
            </h3>
            <p className="stat-label">Gross Turnover</p>
          </div>

          <div className="stat-card card-blue">
            <div className="stat-icon-wrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stat-icon"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="140+" />
            </h3>
            <p className="stat-label">Ops Team</p>
          </div>

          <div className="stat-card card-cyan">
            <div className="stat-icon-wrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stat-icon"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="12" />
            </h3>
            <p className="stat-label">States Fulfilment</p>
          </div>

          <div className="stat-card card-indigo">
            <div className="stat-icon-wrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stat-icon"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="13+" />
            </h3>
            <p className="stat-label">Brand Partners</p>
          </div>
        </div>
      </section>

      {/* ── THREE BUYER SITUATIONS SECTION ── */}
      <section
        id="three-situations"
        style={{
          padding: "5rem 0",
          background: "rgba(17, 24, 39, 0.4)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">TAILORED OPERATING PATHS</span>
            <h2 className="section-title">Where Is Your Business Today?</h2>
            <p
              className="section-subtitle"
              style={{ maxWidth: "780px", margin: "0.5rem auto 0" }}
            >
              Choose Launch, Fix & Grow, or Scale as your primary entry route—backed
              by connected capability across D2C, B2B, and OEM incubation.
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
            <div id="launch" className="glass-card-feature">
              <div
                style={{
                  color: "#38BDF8",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                01. LAUNCH ONLINE
              </div>
              <h3
                style={{
                  color: "#FFF",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                Offline Brand / Manufacturer
              </h3>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  marginBottom: "1.2rem",
                }}
              >
                Entering e-commerce for the first time across Amazon, Flipkart,
                Myntra, category platforms, and direct D2C store.
              </p>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#38BDF8",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Explore Launch Online Mandate →
              </button>
            </div>

            <div id="fix-grow" className="glass-card-feature">
              <div
                style={{
                  color: "#60A5FA",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                02. FIX & GROW
              </div>
              <h3
                style={{
                  color: "#FFF",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                Active Marketplace Brand
              </h3>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  marginBottom: "1.2rem",
                }}
              >
                Stuck with stagnant GMV, rising ACOS, un-audited settlement
                losses, or high customer returns.
              </p>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#60A5FA",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Explore Fix & Grow Audit →
              </button>
            </div>

            <div id="scale" className="glass-card-feature">
              <div
                style={{
                  color: "#3B82F6",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                03. SCALE PAN-INDIA
              </div>
              <h3
                style={{
                  color: "#FFF",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                Established Enterprise Brand
              </h3>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  marginBottom: "1.2rem",
                }}
              >
                Scaling multi-state warehouse inventory, regional dealer
                fulfilment, B2B portals, and D2C channel synchronization.
              </p>
              <Link
                href="/b2b-institutional-commerce"
                style={{
                  color: "#3B82F6",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                Explore Pan-India B2B Scale →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTELLIGENT EXPERIENCES SECTION (Infosys Style) ── */}
      <section className="infosys-experiences-section" id="experiences">
        <div className="container">
          <div className="infosys-hero-cards">
            {/* Card 1: Meet Goodlife Engine */}
            <div className="infosys-hero-card">
              <div className="infosys-card-visual wave-visual-1">
                <svg viewBox="0 0 200 120" fill="none" className="wavy-svg">
                  <path
                    d="M10 60 C 50 10, 80 110, 120 40 C 150 0, 170 100, 190 60"
                    stroke="url(#wave-grad-1)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 80 C 40 30, 90 90, 130 50 C 160 20, 170 110, 190 80"
                    stroke="url(#wave-grad-2)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient
                      id="wave-grad-1"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#4C4BFF" />
                      <stop offset="50%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient
                      id="wave-grad-2"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="infosys-card-info">
                <h3 className="infosys-card-tag">Meet Goodlife Engine</h3>
                <p className="infosys-card-desc">
                  Our custom marketplace integration portal that helps brand
                  partners lock catalog visibility, reconcile return pipelines, and
                  scale sales. Don&apos;t scale alone.
                </p>
                <button
                  onClick={() => setDiagOpen(true)}
                  className="infosys-card-link"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Explore Engine &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: Fulfillment Network */}
            <div className="infosys-hero-card">
              <div className="infosys-card-visual wave-visual-2">
                <svg viewBox="0 0 200 120" fill="none" className="wavy-svg">
                  <circle
                    cx="80"
                    cy="60"
                    r="35"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    opacity="0.8"
                  />
                  <circle
                    cx="120"
                    cy="60"
                    r="35"
                    stroke="#6D28D9"
                    strokeWidth="4"
                    opacity="0.6"
                  />
                  <circle
                    cx="100"
                    cy="60"
                    r="20"
                    fill="rgba(76, 75, 255, 0.2)"
                  />
                </svg>
              </div>
              <div className="infosys-card-info">
                <h3 className="infosys-card-tag">Fulfillment Network</h3>
                <p className="infosys-card-desc">
                  Operating across 12 states with custom warehouse protocols and
                  returns rules matching platform SLA guidelines across India.
                </p>
                <button
                  onClick={() => setDiagOpen(true)}
                  className="infosys-card-link"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Explore Network &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="infosys-section-header">
            <h2 className="infosys-section-title">
              Crafting{" "}
              <span className="text-highlight-purple">Intelligent</span>{" "}
              Experiences
            </h2>
            <p className="infosys-section-subtitle">
              Whether you are automating return disputes, linking catalog
              configuration with WMS, or running ad-spend audits, operational
              data remains the biggest enabler of scale.
            </p>
            <div className="infosys-action-row">
              <button
                onClick={() => setDiagOpen(true)}
                className="infosys-curious-btn"
              >
                I&apos;m Curious
                <span className="infosys-btn-arrow">&nearr;</span>
              </button>
            </div>
          </div>

          <div className="infosys-showcase-grid">
            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-1"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">01</span>
                <h4 className="showcase-title">Beauty & Fashion</h4>
                <p className="showcase-desc">
                  Expedited dispatch turnaround under 4 hours, batch expiration
                  alerts, and custom gift kits.
                </p>
              </div>
            </div>

            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-2"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">02</span>
                <h4 className="showcase-title">Electronics & FMCG</h4>
                <p className="showcase-desc">
                  High-value serial number tracking, returns validation, and
                  platform SLA compliance checks.
                </p>
              </div>
            </div>

            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-3"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">03</span>
                <h4 className="showcase-title">Nutrition & Luxury</h4>
                <p className="showcase-desc">
                  FSSAI-compliant warehouse hygiene setups, batch control, and
                  tamper-proof security shipping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DO IT ALL WITH GOODLIFE (Pattern.com Style) ── */}
      <section className="ptn-do-section">
        <div className="container">
          <div className="ptn-do-header">
            <h2 className="ptn-do-title">Do it all with Goodlife.</h2>
          </div>

          <div className="ptn-do-grid">
            {/* Card 1 — Marketplace Management */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-1">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon
                    points="60,70 90,54 120,70 90,86"
                    fill="#BFDBFE"
                    opacity="0.9"
                  />
                  <polygon points="60,70 90,86 90,98 60,82" fill="#3B82F6" />
                  <polygon points="90,86 120,70 120,82 90,98" fill="#1D4ED8" />
                  <polygon points="60,54 90,38 120,54 90,70" fill="#DBEAFE" />
                  <polygon points="60,54 90,70 90,82 60,66" fill="#60A5FA" />
                  <polygon points="90,70 120,54 120,66 90,82" fill="#2563EB" />
                  <polygon
                    points="60,38 90,22 120,38 90,54"
                    fill="#EFF6FF"
                    opacity="0.9"
                  />
                  <polygon points="60,38 90,54 90,66 60,50" fill="#93C5FD" />
                  <polygon points="90,54 120,38 120,50 90,66" fill="#3B82F6" />
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Marketplace Management</h3>
                <p className="ptn-card-desc">
                  Full cataloguing, listing optimisation, price management and
                  day-to-day operations across Amazon, Flipkart, JioMart and
                  Moglix.
                </p>
                <Link href="/multi-platform-commerce" className="ptn-card-cta">
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2 — Finance & Reconciliation */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-2">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon
                    points="50,88 90,62 130,88 90,114"
                    fill="#1E3A8A"
                    opacity="0.55"
                  />
                  <polygon
                    points="50,88 90,114 90,120 50,94"
                    fill="#1D4ED8"
                    opacity="0.65"
                  />
                  <polygon
                    points="90,114 130,88 130,94 90,120"
                    fill="#172554"
                    opacity="0.65"
                  />
                  <polygon
                    points="50,68 90,42 130,68 90,94"
                    fill="#3B82F6"
                    opacity="0.75"
                  />
                  <polygon
                    points="50,68 90,94 90,100 50,74"
                    fill="#2563EB"
                    opacity="0.85"
                  />
                  <polygon
                    points="90,94 130,68 130,74 90,100"
                    fill="#1E40AF"
                    opacity="0.85"
                  />
                  <polygon points="50,48 90,22 130,48 90,74" fill="#BFDBFE" />
                  <polygon points="50,48 90,74 90,80 50,54" fill="#93C5FD" />
                  <polygon points="90,74 130,48 130,54 90,80" fill="#60A5FA" />
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Finance & Reconciliation</h3>
                <p className="ptn-card-desc">
                  Automatic daily audits of platform commissions, payment gateway
                  settlements, returns deductions, and payout variances across all
                  channels.
                </p>
                <button
                  onClick={() => setDiagOpen(true)}
                  className="ptn-card-cta"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 3 — Warehousing & Fulfilment */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-3">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon
                    points="42,82 72,66 102,82 72,98"
                    fill="#93C5FD"
                    opacity="0.7"
                  />
                  <polygon
                    points="42,82 72,98 72,110 42,94"
                    fill="#3B82F6"
                    opacity="0.85"
                  />
                  <polygon
                    points="72,98 102,82 102,94 72,110"
                    fill="#1D4ED8"
                    opacity="0.85"
                  />
                  <polygon
                    points="102,82 132,66 162,82 132,98"
                    fill="#93C5FD"
                    opacity="0.7"
                  />
                  <polygon
                    points="102,82 132,98 132,110 102,94"
                    fill="#3B82F6"
                    opacity="0.85"
                  />
                  <polygon
                    points="132,98 162,82 162,94 132,110"
                    fill="#1D4ED8"
                    opacity="0.85"
                  />
                  <polygon points="72,66 102,50 132,66 102,82" fill="#DBEAFE" />
                  <polygon points="72,66 102,82 102,94 72,78" fill="#93C5FD" />
                  <polygon points="102,82 132,66 132,78 102,94" fill="#3B82F6" />
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Warehousing & Fulfilment</h3>
                <p className="ptn-card-desc">
                  1,00,000+ sq ft of warehouse space, FBA & FAssured integrations,
                  and rapid 12-state distribution with real-time inventory
                  tracking.
                </p>
                <Link
                  href="/b2b-institutional-commerce"
                  className="ptn-card-cta"
                >
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 4 — Performance Marketing */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-4">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon
                    points="60,96 90,80 120,96 90,112"
                    fill="#93C5FD"
                    opacity="0.6"
                  />
                  <polygon
                    points="60,96 90,112 90,120 60,104"
                    fill="#3B82F6"
                    opacity="0.8"
                  />
                  <polygon
                    points="90,112 120,96 120,104 90,120"
                    fill="#1D4ED8"
                    opacity="0.8"
                  />
                  <polygon
                    points="60,76 90,60 120,76 90,92"
                    fill="#BFDBFE"
                    opacity="0.9"
                  />
                  <polygon points="60,76 90,92 90,104 60,88" fill="#60A5FA" />
                  <polygon points="90,92 120,76 120,88 90,104" fill="#2563EB" />
                  <polygon points="60,56 90,40 120,56 90,72" fill="#EFF6FF" />
                  <polygon points="60,56 90,72 90,84 60,68" fill="#93C5FD" />
                  <polygon points="90,72 120,56 120,68 90,84" fill="#3B82F6" />
                  <circle
                    cx="90"
                    cy="28"
                    r="14"
                    fill="#3B82F6"
                    opacity="0.3"
                  />
                  <circle
                    cx="90"
                    cy="28"
                    r="8"
                    fill="#60A5FA"
                    opacity="0.6"
                  />
                  <circle cx="90" cy="28" r="4" fill="#DBEAFE" />
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Performance Marketing</h3>
                <p className="ptn-card-desc">
                  Full-funnel Sponsored Ads, Deal of the Day setups, search ranking
                  boosts, and return-on-ad-spend (ROAS) tracking across every
                  platform.
                </p>
                <Link
                  href="/d2c-commerce-operations"
                  className="ptn-card-cta"
                >
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="ptn-do-footer">
            <Link href="#capabilities" className="ptn-do-more-link">
              View all 10 connected capabilities
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT US / OUR STORY SECTION ── */}
      <section className="ptn-story-section" id="about-us">
        <div className="container">
          <div className="ptn-story-header">
            <h2 className="ptn-story-title">
              Your brand. Our reach.<br />A world of possibilities.
            </h2>
            <p className="ptn-story-subtitle">
              Ecommerce is complicated. Growth shouldn&apos;t be. We bring clarity
              to chaos with WMS systems that scale, OMS channel sync that delivers,
              and automated reconciliation that builds trust.
            </p>
            <div className="ptn-story-actions">
              <Link href="/about" className="ptn-story-btn">
                Our Story
                <span className="ptn-story-arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Marquee track of milestone cards */}
          <div className="ptn-story-marquee-wrap">
            <div className="ptn-story-marquee-track">
              <div className="ptn-story-card card-dark-green">
                <span className="ptn-story-val">12</span>
                <span className="ptn-story-lbl">States Fulfilment</span>
              </div>
              <div className="ptn-story-card card-light-blue">
                <span className="ptn-story-val">2011</span>
                <span className="ptn-story-lbl">Entered E-commerce</span>
              </div>
              <div className="ptn-story-card card-white-blue">
                <span className="ptn-story-val">140+</span>
                <span className="ptn-story-lbl">Ops Team</span>
              </div>
              <div className="ptn-story-card card-solid-purple">
                <span className="ptn-story-val">13+</span>
                <span className="ptn-story-lbl">Brand Partners</span>
              </div>
              <div className="ptn-story-card card-vibrant-blue">
                <span className="ptn-story-val">2005</span>
                <span className="ptn-story-lbl">Water Solutions Began</span>
              </div>
              <div className="ptn-story-card card-gold">
                <span className="ptn-story-val">₹200 Cr</span>
                <span className="ptn-story-lbl">Gross Turnover</span>
              </div>

              {/* Duplicated 6 Cards for Seamless Scrolling */}
              <div className="ptn-story-card card-dark-green">
                <span className="ptn-story-val">12</span>
                <span className="ptn-story-lbl">States Fulfilment</span>
              </div>
              <div className="ptn-story-card card-light-blue">
                <span className="ptn-story-val">2011</span>
                <span className="ptn-story-lbl">Entered E-commerce</span>
              </div>
              <div className="ptn-story-card card-white-blue">
                <span className="ptn-story-val">140+</span>
                <span className="ptn-story-lbl">Ops Team</span>
              </div>
              <div className="ptn-story-card card-solid-purple">
                <span className="ptn-story-val">13+</span>
                <span className="ptn-story-lbl">Brand Partners</span>
              </div>
              <div className="ptn-story-card card-vibrant-blue">
                <span className="ptn-story-val">2005</span>
                <span className="ptn-story-lbl">Water Solutions Began</span>
              </div>
              <div className="ptn-story-card card-gold">
                <span className="ptn-story-val">₹200 Cr</span>
                <span className="ptn-story-lbl">Gross Turnover</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OEM BRAND INCUBATION SECTION ── */}
      <section
        style={{
          padding: "5rem 0",
          background: "rgba(15, 23, 42, 0.7)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-tag">BRAND INCUBATION FOR MANUFACTURERS</span>
              <h2
                className="section-title"
                style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
              >
                From OEM Capability to a Market-Ready Ecommerce Brand
              </h2>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Good Life combines category demand data, marketplace execution,
                catalogue architecture, pricing, multi-state fulfilment, and
                performance marketing to help capable product manufacturers build
                high-margin digital consumer brands.
              </p>
              <div
                style={{
                  padding: "1.2rem",
                  background: "rgba(56, 189, 248, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    color: "#FFF",
                    fontSize: "0.92rem",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  🏆 5 New OEM Brands Launched in E-Commerce Over the Last 3 Years.
                </p>
              </div>
              <Link
                href="/brand-launch-incubation"
                className="hero-cta-btn"
                style={{ textDecoration: "none", display: "inline-flex" }}
              >
                Explore Brand Incubation →
              </Link>
            </div>
            <div className="glass-card-feature" style={{ padding: "2.5rem" }}>
              <h3
                style={{
                  color: "#FFF",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Incubation Roadmap
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div
                  style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #38BDF8",
                  }}
                >
                  <div
                    style={{
                      color: "#38BDF8",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    STAGE 1
                  </div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>
                    Catalogue & Brand Identity Creation
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #60A5FA",
                  }}
                >
                  <div
                    style={{
                      color: "#60A5FA",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    STAGE 2
                  </div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>
                    Multi-Marketplace & D2C Store Onboarding
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #3B82F6",
                  }}
                >
                  <div
                    style={{
                      color: "#3B82F6",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    STAGE 3
                  </div>
                  <div style={{ color: "#FFF", fontSize: "0.95rem" }}>
                    Pan-India Warehouse Deployment & Performance Ads
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B & INSTITUTIONAL COMMERCE SECTION ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-tag">B2B & INSTITUTIONAL CHANNEL CONTROL</span>
              <h2
                className="section-title"
                style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
              >
                Corporate, Institutional & Dealer Commerce Under One Roof
              </h2>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Scale beyond D2C and consumer marketplaces with unified commercial
                operations for bulk buyer invoicing, GST compliance, institutional
                purchase orders, and multi-state warehouse dispatch.
              </p>
              <Link
                href="/b2b-institutional-commerce"
                className="hero-cta-btn"
                style={{ textDecoration: "none", display: "inline-flex" }}
              >
                Explore B2B & Institutional Solution →
              </Link>
            </div>
            <div className="glass-card-feature" style={{ padding: "2rem" }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#38BDF8",
                  marginBottom: "0.8rem",
                }}
              >
                CONNECTED B2B CHANNELS
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1.2rem",
                }}
              >
                {["IndiaMART", "TradeIndia", "Moglix", "Jio B2B", "Direct Bids"].map(
                  (ch, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        background: "rgba(56, 189, 248, 0.15)",
                        color: "#38BDF8",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {ch}
                    </span>
                  )
                )}
              </div>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Qualification → Commercial Approval → Inventory Allocation →
                Dispatch → Reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCELERATION SECTION (Pattern.com Style) ── */}
      <section className="ptn-accel-section" id="acceleration">
        <div className="container">
          <div className="ptn-accel-video-panel">
            <div className="ptn-accel-video-left">
              <div className="ptn-accel-video-bg-mock">
                <div className="mock-browser-bar">
                  <span className="m-dot red"></span>
                  <span className="m-dot yellow"></span>
                  <span className="m-dot green"></span>
                </div>
                <div className="mock-browser-body">
                  <div className="mock-chart-container">
                    <svg
                      viewBox="0 0 200 100"
                      fill="none"
                      className="mock-chart-svg"
                    >
                      <path
                        d="M10 80 Q 40 20, 80 50 T 150 10 T 190 60"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.6"
                      />
                      <circle cx="80" cy="50" r="4" fill="#3B82F6" />
                      <circle cx="150" cy="10" r="4" fill="#6D28D9" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="ptn-accel-video-overlay"></div>

              <button
                className="ptn-accel-play-btn"
                onClick={() => setVideoOpen(true)}
                aria-label="Play video"
              >
                <span className="play-pulse-circle"></span>
                <span className="play-pulse-circle-2"></span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </button>
            </div>
            <div className="ptn-accel-video-right">
              <h2 className="ptn-accel-video-title">
                Unlock growth everywhere with our ecommerce platform.
              </h2>
            </div>
          </div>
        </div>

        <div className="container ptn-accel-body-grid">
          <div className="ptn-accel-left">
            <h2 className="ptn-accel-title">
              Your partner in ecommerce acceleration.
            </h2>
            <div className="ptn-accel-actions">
              <button
                onClick={() => setDiagOpen(true)}
                className="ptn-accel-demo-btn"
              >
                Schedule a demo
                <span className="ptn-accel-arrow">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="ptn-accel-right">
            <div className="ptn-accel-accordion">
              {[
                {
                  num: "01",
                  title: "We buy your products and sell them worldwide.",
                  desc: "Good Life acts as a 3P/1P merchant partner. We manage end-to-end purchasing, logistics, catalog management, customer service, and international compliance, removing inventory risk from your balance sheet.",
                },
                {
                  num: "02",
                  title: "Our ecommerce platform handles everything else.",
                  desc: "From syncing inventory across national WMS networks to executing full-funnel marketing campaigns and generating daily payment audits—our technology suite automates operations.",
                },
                {
                  num: "03",
                  title: "Your brand reaches new customers and marketplaces.",
                  desc: "We configure multi-channel catalog optimizations to instantly launch your brand on Amazon, Flipkart, Myntra, Jiomart, and native D2C sites, driving instant visibility boosts.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`ptn-accel-item ${
                    activeAcc === idx ? "active" : ""
                  }`}
                >
                  <div
                    className="ptn-accel-trigger"
                    onClick={() => setActiveAcc(idx)}
                  >
                    <div className="ptn-accel-icon-wrap">
                      <span className="ptn-accel-plus"></span>
                    </div>
                    <span className="ptn-accel-num">{item.num}</span>
                    <h3 className="ptn-accel-item-title">{item.title}</h3>
                  </div>
                  <div className="ptn-accel-content">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPANDED 10-PILLAR CAPABILITIES GRID ── */}
      <section id="capabilities" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">CONNECTED OPERATING PILLARS</span>
            <h2 className="section-title">End-to-End Commerce Capabilities Grid</h2>
            <p className="section-subtitle">
              Single-point operational accountability across all critical commerce
              building blocks.
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
              {
                id: "ops",
                name: "Marketplace Operations",
                link: "/#ops",
                desc: "Listings, catalogue data, buy box, and account controls.",
              },
              {
                id: "ads",
                name: "Marketplace Growth & Ads",
                link: "/#ads",
                desc: "Established Amazon & Flipkart performance ad campaigns.",
              },
              {
                id: "multi-platform",
                name: "Multi-Platform Commerce",
                link: "/multi-platform-commerce",
                desc: "Amazon, Flipkart, Myntra, Snapmint, Moglix, JioMart, etc.",
              },
              {
                id: "d2c-ops",
                name: "D2C Commerce Operations",
                link: "/d2c-commerce-operations",
                desc: "Storefront catalog, order flow, returns & reverse logistics.",
              },
              {
                id: "b2b-ops",
                name: "B2B & Institutional Commerce",
                link: "/b2b-institutional-commerce",
                desc: "Bulk orders, trade buyers & regional dealer replenishment.",
              },
              {
                id: "inventory",
                name: "Inventory Planning",
                link: "/#inventory",
                desc: "Multi-channel stock buffers & demand forecasting.",
              },
              {
                id: "fulfilment",
                name: "Warehousing & Fulfilment",
                link: "/#fulfilment",
                desc: "12-state regional warehouse network with rapid dispatch.",
              },
              {
                id: "revenue",
                name: "Revenue Assurance",
                link: "/#revenue",
                desc: "Automated audit of platform settlements & claims.",
              },
              {
                id: "returns",
                name: "Returns Management",
                link: "/#returns",
                desc: "Reverse logistics QC, RTO reduction & refund workflows.",
              },
              {
                id: "bulky",
                name: "Heavy & Bulky Commerce",
                link: "/#bulky",
                desc: "Specialized logistics for appliances, furniture & heavy items.",
              },
            ].map((cap, idx) => (
              <div
                key={idx}
                id={cap.id}
                className="glass-card-feature"
                style={{ scrollMarginTop: "90px" }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#38BDF8",
                    marginBottom: "0.4rem",
                  }}
                >
                  PILLAR {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    color: "#FFF",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                  }}
                >
                  {cap.link.startsWith("/") && cap.link.includes("-") ? (
                    <Link
                      href={cap.link}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {cap.name}
                    </Link>
                  ) : (
                    cap.name
                  )}
                </h3>
                <p
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY TIMELINE SECTION ── */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Methodology</span>
            <h2 className="section-title">A Structured Path to Growth</h2>
            <p className="section-subtitle">
              How we integrate your brand into our systems for immediate
              marketplace performance improvements.
            </p>
          </div>

          <div ref={timelineRef} className="workflow-wrap">
            <div className="workflow-connector">
              <div
                className="workflow-connector-fill"
                style={{ width: isTimelineLit ? "100%" : "0%" }}
              ></div>
            </div>

            <div
              className={`workflow-step step-violet ${
                isTimelineLit ? "lit" : ""
              }`}
            >
              <div className="workflow-node">1</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Audit & Strategy</h4>
                <p className="workflow-desc">
                  Evaluate current marketplace visibility & leakage.
                </p>
              </div>
            </div>

            <div
              className={`workflow-step step-blue ${
                isTimelineLit ? "lit" : ""
              }`}
            >
              <div className="workflow-node">2</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Setup</h4>
                <p className="workflow-desc">
                  Listing configuration & catalog optimizations.
                </p>
              </div>
            </div>

            <div
              className={`workflow-step step-cyan ${
                isTimelineLit ? "lit" : ""
              }`}
            >
              <div className="workflow-node">3</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Integration</h4>
                <p className="workflow-desc">
                  Link channels with WMS, OMS, & finance reconciliation.
                </p>
              </div>
            </div>

            <div
              className={`workflow-step step-indigo ${
                isTimelineLit ? "lit" : ""
              }`}
            >
              <div className="workflow-node">4</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Execution</h4>
                <p className="workflow-desc">
                  Run full-funnel marketing campaigns.
                </p>
              </div>
            </div>

            <div
              className={`workflow-step step-violet-dark ${
                isTimelineLit ? "lit" : ""
              }`}
            >
              <div className="workflow-node">5</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Reporting</h4>
                <p className="workflow-desc">
                  Deliver transparent weekly dashboard data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE POWER SECTION ── */}
      <section className="section-padding industries-section" id="industries">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Industries</span>
            <h2 className="section-title">Sectors We Power</h2>
            <p className="section-subtitle">
              We build custom warehouse protocols and inventory rules to fit specific
              sector guidelines.
            </p>
          </div>

          <div className="industries-grid">
            <div className="card industry-card industry-violet">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-violet-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-5c-.5 3-2 3.4-4 5s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Beauty & Fashion</div>
                  <p className="industry-desc">
                    Temperature-controlled storage, expiry tracking, batch controls,
                    and premium gift-wrap kits.
                  </p>
                </div>
              </div>
            </div>

            <div className="card industry-card industry-blue">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-blue-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Electronics & FMCG</div>
                  <p className="industry-desc">
                    Serial number tracking, high-value secure storage, same-day
                    dispatch, and return testing.
                  </p>
                </div>
              </div>
            </div>

            <div className="card industry-card industry-cyan">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-cyan-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Nutrition & Luxury</div>
                  <p className="industry-desc">
                    FSSAI-compliant warehouse hygiene, tamper-proof seal packaging,
                    and security transport links.
                  </p>
                </div>
              </div>
            </div>

            <div className="card industry-card industry-indigo">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-indigo-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Home & Kitchen</div>
                  <p className="industry-desc">
                    Heavy-bulky transit care, multi-item order sets, catalog dimension
                    mapping, and drop-ship support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section
        className="section-padding"
        style={{ background: "#FFFFFF", position: "relative" }}
      >
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">Trusted By Leading Brands</h2>
            <p className="section-subtitle">
              Hear from the brand partners who scaled their business with Good Life.
            </p>
          </div>

          <div className="testimonials-wrap">
            {testimonials.map((test, index) => (
              <div
                key={index}
                className={`testimonial-card ${
                  activeSlide === index ? "active-slide" : "hidden-slide"
                }`}
                style={{
                  display: activeSlide === index ? "flex" : "none",
                }}
              >
                <div className="testimonial-quotes-icon">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-3 6-3 6m11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-3 6-3 6" />
                  </svg>
                </div>

                <div className="testimonial-quote">&ldquo;{test.quote}&rdquo;</div>

                <div className="testimonial-meta">
                  <div className="testimonial-avatar">
                    <span>{test.initial}</span>
                  </div>
                  <div className="testimonial-meta-text">
                    <div className="testimonial-author">{test.author}</div>
                    <div className="testimonial-role">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${
                    activeSlide === index ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center">
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Commerce Operating Partnership Insights</h2>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(17, 24, 39, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
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
                    cursor: "pointer",
                  }}
                >
                  {faq.q}
                  <span style={{ color: "#38BDF8", fontSize: "1.2rem" }}>
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.2rem",
                      color: "#9CA3AF",
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section
        className="section-padding"
        style={{ background: "#FFFFFF", padding: "6rem 0 7rem" }}
      >
        <div className="container">
          <div className="final-cta-card">
            <div className="final-cta-orb final-cta-orb-1"></div>
            <div className="final-cta-orb final-cta-orb-2"></div>

            <div className="final-cta-content">
              <h2 className="final-cta-title">
                Ready to Scale Your E-commerce Business?
              </h2>
              <p className="final-cta-desc">
                Submit your brand details for a complimentary marketplace visibility
                audit and finance leak checkup. Discovery begins within 5 working
                days.
              </p>

              <div className="final-cta-actions">
                <button onClick={() => setDiagOpen(true)} className="hero-cta-btn">
                  Request a Free Audit
                  <span className="hero-cta-arrow">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {diagOpen && (
        <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />
      )}

      {/* WATCH VIDEO MODAL OVERLAY */}
      <div
        className={`video-modal-overlay ${videoOpen ? "open" : ""}`}
        onClick={() => setVideoOpen(false)}
      >
        <div
          className="video-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="video-modal-close"
            onClick={() => setVideoOpen(false)}
          >
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
    </>
  );
}
