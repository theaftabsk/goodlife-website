"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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

  // Word Cycle Rotate Animation (Combining exact tagline and dynamic channel names)
  const words = [
    "Own Every Channel.",
    "Sell on Amazon.",
    "Sell on Flipkart.",
    "Sell on JioMart.",
    "Sell on Moglix.",
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

  // Scroll Header Listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Simulated live Today's Orders count logic
  const [ordersCount, setOrdersCount] = useState(12847);
  const [flashOrders, setFlashOrders] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 3) + 1; // +1, +2, or +3
      setOrdersCount((prev) => prev + inc);
      setFlashOrders(true);
      const t = setTimeout(() => setFlashOrders(false), 600);
      return () => clearTimeout(t);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Simulated live-sync console logs in console mockup
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
      quote: "Good Life transitioned our entire marketplace model. Their finance reconciliation caught leaks we didn't know existed, and our sales grew 2.5x in under a year.",
      author: "Founder & CEO",
      role: "National Kitchen Appliance Brand",
      initial: "N"
    },
    {
      quote: "We scaled from 1 to 12 states overnight. Good Life WMS is rock solid—our dispatch turnaround is consistently under 4 hours.",
      author: "Operations Director",
      role: "Leading Cosmetics Brand",
      initial: "C"
    },
    {
      quote: "Daily payment disputes were eating up our margins. Good Life automated audits resolved 98% of return variances instantly.",
      author: "Head of E-commerce",
      role: "Premier Wellness Partner",
      initial: "W"
    }
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // FAQ Accordion State
  const [activeAcc, setActiveAcc] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Stripe-style cursor glow element */}
      <div className="cursor-glow-element"></div>

      {/* HEADER NAVBAR */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">

          {/* LEFT: logo — always visible */}
          <div className="nav-left">
            <a href="#" className="logo">
              <Image
                src="/logo-removebg-preview.png"
                alt="Goodlife Logo"
                width={140}
                height={40}
                className="logo-img"
                priority
              />
            </a>
          </div>

          {/* CENTER: floating pill nav — desktop only */}
          <nav className="nav-center">
            <ul className="nav-pill">
              <li><a href="#" className="nav-link">Home</a></li>
              <li><a href="#about-us" className="nav-link">About Us</a></li>
              <li><a href="#" className="nav-link">Services</a></li>
              <li><a href="#" className="nav-link">Industries</a></li>
              <li><a href="#" className="nav-link">Technology</a></li>
            </ul>
          </nav>

          {/* RIGHT: CTA on desktop | Hamburger on mobile */}
          <div className="nav-right">
            <a href="#" className="nav-cta nav-cta-desktop">
              Free Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            {/* Mobile hamburger — hidden on desktop */}
            <button
              className={`nav-hamburger-mobile ${isMobileOpen ? "open" : ""}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV DRAWER — only visible on mobile */}
      <div
        className={`mobile-nav-overlay ${isMobileOpen ? "open" : ""}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className={`mobile-nav-menu ${isMobileOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="mobile-nav-header">
            <Image src="/logo-removebg-preview.png" alt="Goodlife" width={120} height={36} style={{ filter: "none" }} />
            <button className="mobile-nav-close" onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mobile-nav-links">
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>
              <span>Home</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#about-us" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>
              <span>About Us</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>
              <span>Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>
              <span>Industries</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>
              <span>Technology</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </nav>

          {/* CTA Button */}
          <div className="mobile-nav-footer">
            <a href="#" className="mobile-nav-cta" onClick={() => setIsMobileOpen(false)}>
              Get Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <p className="mobile-nav-tagline">India&apos;s #1 Marketplace Growth Partner</p>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="hero" id="hero-home" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Floating orb blobs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />

        <div className="hero-inner">
          {/* Announcement Banner — Pattern.com purple pill */}
          <div className="hero-banner">
            <div className="hero-banner-content">
              <p className="hero-banner-text">
                <span className="hero-banner-bold">India&apos;s #1 E-commerce Operations Partner.</span>{" "}
                Powering 13+ brands across 12 states. Get your free leakage audit now.
              </p>
            </div>
            <a href="#" className="hero-banner-arrow" aria-label="Learn more">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Hero title */}
          <h1 className="hero-title">
            Scale Your Brand.<br />
            <span id="typewriter-word" className={transitionClass}>{words[wordIdx]}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            From ₹200 Cr turnover and 140+ ops team to 12-state fulfilment
            and 13+ national brands — Good Life is India&apos;s end-to-end
            e-commerce growth engine.
          </p>

          {/* CTA Button — Pattern.com white button */}
          <div className="hero-actions">
            <a href="#" className="hero-cta-btn">
              Get Free Audit
              <span className="hero-cta-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <button className="hero-play-btn" onClick={() => setVideoOpen(true)}>
              <span className="hero-play-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              Watch Our Story
            </button>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="₹200 Cr" /></span>
              <span className="stat-label">Gross Turnover</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="140+" /></span>
              <span className="stat-label">Ops Team</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="12" /></span>
              <span className="stat-label">States</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="stat-num"><Counter target="13+" /></span>
              <span className="stat-label">Brand Partners</span>
            </div>
          </div>
        </div>

        {/* Logo bar — light blue strip like Pattern.com */}
        <div className="hero-logo-strip">
          <div className="logo-marquee-wrap">
            <div className="logo-marquee-track">
              <span className="hero-logo-item">Golf Pride</span>
              <span className="hero-logo-item">THORNE</span>
              <span className="hero-logo-item">pura</span>
              <span className="hero-logo-item">hims</span>
              <span className="hero-logo-item">gaia HERBS</span>
              <span className="hero-logo-item">SPANX</span>
              <span className="hero-logo-item">Panasonic</span>
              <span className="hero-logo-item">Mamaearth</span>
              <span className="hero-logo-item">boAt</span>
              {/* Duplicate for seamless loop */}
              <span className="hero-logo-item">Golf Pride</span>
              <span className="hero-logo-item">THORNE</span>
              <span className="hero-logo-item">pura</span>
              <span className="hero-logo-item">hims</span>
              <span className="hero-logo-item">gaia HERBS</span>
              <span className="hero-logo-item">SPANX</span>
              <span className="hero-logo-item">Panasonic</span>
              <span className="hero-logo-item">Mamaearth</span>
              <span className="hero-logo-item">boAt</span>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS CONSOLE BAND (Showing exact KPIs) */}
      <section className="console-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">REAL-TIME ENGINE</span>
            <h2 className="section-title">GOODLIFE GROWTH CONSOLE</h2>
            <p className="section-subtitle">
              Live status and channel settlements synced under a single unified dashboard.
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
              {/* Animated liquid glass background orbs */}
              <div className="dash-orb dash-orb-1"></div>
              <div className="dash-orb dash-orb-2"></div>

              <div className="dash-content-container">
                {/* Top bar */}
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

                {/* KPI Cards — 4 col desktop, 2 col mobile */}
                <div className="dash-kpi-row">
                  <div className={`dash-kpi ${flashOrders ? "flash-highlight" : ""}`}>
                    <div className="dash-kpi-label">Today&apos;s Orders</div>
                    <div className="dash-kpi-value">{ordersCount.toLocaleString()}</div>
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

                {/* Settlement Log */}
                <div className="sim-log-wrap">
                  <div className="sim-log-header">Settlement &amp; Payout Log</div>
                  {heroLogs.map((log, index) => (
                    <div key={index} className="sim-log-line">
                      <span className="sim-log-text">{log}</span>
                      <span className="sim-log-success">✔ MATCH</span>
                    </div>
                  ))}
                </div>

                {/* Chart section */}
                <div className="dash-chart-area">
                  <div className="dash-chart-label">
                    Channel GMV Split &mdash; Current Quarter
                  </div>
                  <div className="chart-layout-wrapper">
                    <div className="chart-left">
                      <svg viewBox="0 0 100 100" className="donut-chart-svg">
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#3B82F6" strokeWidth="8" strokeDasharray="80.4 201" strokeDashoffset="0" className="donut-slice donut-slice-1" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#F59E0B" strokeWidth="8" strokeDasharray="50.25 201" strokeDashoffset="-80.4" className="donut-slice donut-slice-2" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#06B6D4" strokeWidth="8" strokeDasharray="30.15 201" strokeDashoffset="-130.65" className="donut-slice donut-slice-3" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#6366F1" strokeWidth="8" strokeDasharray="20.1 201" strokeDashoffset="-160.8" className="donut-slice donut-slice-4" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="14.07 201" strokeDashoffset="-180.9" className="donut-slice donut-slice-5" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#94A3B8" strokeWidth="8" strokeDasharray="6.03 201" strokeDashoffset="-194.97" className="donut-slice donut-slice-6" />
                      </svg>
                      <div className="donut-center-text">
                        <div className="donut-center-val">₹16.8Cr</div>
                        <div className="donut-center-lbl">Total GMV</div>
                      </div>
                    </div>
                    <div className="chart-right">
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#3B82F6" }}></span>AMZ (40%)</span>
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#F59E0B" }}></span>FLK (25%)</span>
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#06B6D4" }}></span>JIO (15%)</span>
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#6366F1" }}></span>MGL (10%)</span>
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#8B5CF6" }}></span>D2C (7%)</span>
                      <span className="market-pill"><span className="market-pill-dot" style={{ background: "#94A3B8" }}></span>OTH (3%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="stats-band">
        {/* Floating liquid glass background orbs */}
        <div className="liquid-glass-orb stats-orb-1"></div>
        <div className="liquid-glass-orb stats-orb-2"></div>
        <div className="container stats-grid">
          {/* Stat Card 1 — Turnover */}
          <div className="stat-card card-violet">
            <div className="stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="₹200 Cr" />
            </h3>
            <p className="stat-label">Gross Turnover</p>
          </div>

          {/* Stat Card 2 — Ops Team */}
          <div className="stat-card card-blue">
            <div className="stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="140+" />
            </h3>
            <p className="stat-label">Ops Team</p>
          </div>

          {/* Stat Card 3 — States */}
          <div className="stat-card card-cyan">
            <div className="stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="12" />
            </h3>
            <p className="stat-label">States</p>
          </div>

          {/* Stat Card 4 — Brand Partners */}
          <div className="stat-card card-indigo">
            <div className="stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <h3 className="stat-num-large">
              <Counter target="13+" />
            </h3>
            <p className="stat-label">Brand Partners</p>
          </div>
        </div>
      </section>


      {/* ── INTELLIGENT EXPERIENCES SECTION (Infosys Style) ── */}
      <section className="infosys-experiences-section" id="experiences">
        <div className="container">

          {/* Top row: Two side-by-side large cards */}
          <div className="infosys-hero-cards">
            
            {/* Card 1: Meet Goodlife Engine */}
            <div className="infosys-hero-card">
              <div className="infosys-card-visual wave-visual-1">
                {/* Wavy liquid glass vector lines */}
                <svg viewBox="0 0 200 120" fill="none" className="wavy-svg">
                  <path d="M10 60 C 50 10, 80 110, 120 40 C 150 0, 170 100, 190 60" stroke="url(#wave-grad-1)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M10 80 C 40 30, 90 90, 130 50 C 160 20, 170 110, 190 80" stroke="url(#wave-grad-2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <defs>
                    <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4C4BFF" />
                      <stop offset="50%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="infosys-card-info">
                <h3 className="infosys-card-tag">Meet Goodlife Engine</h3>
                <p className="infosys-card-desc">
                  Our custom marketplace integration portal that helps brand partners lock catalog visibility, reconcile return pipelines, and scale sales. Don&apos;t scale alone.
                </p>
                <a href="#" className="infosys-card-link">Explore Engine &rarr;</a>
              </div>
            </div>

            {/* Card 2: Fulfillment Network */}
            <div className="infosys-hero-card">
              <div className="infosys-card-visual wave-visual-2">
                {/* Overlapping circles */}
                <svg viewBox="0 0 200 120" fill="none" className="wavy-svg">
                  <circle cx="80" cy="60" r="35" stroke="#3B82F6" strokeWidth="4" opacity="0.8" />
                  <circle cx="120" cy="60" r="35" stroke="#6D28D9" strokeWidth="4" opacity="0.6" />
                  <circle cx="100" cy="60" r="20" fill="rgba(76, 75, 255, 0.2)" />
                </svg>
              </div>
              <div className="infosys-card-info">
                <h3 className="infosys-card-tag">Fulfillment Network</h3>
                <p className="infosys-card-desc">
                  Operating across 12 states with custom warehouse protocols and returns rules matching platform SLA guidelines across India.
                </p>
                <a href="#" className="infosys-card-link">Explore Network &rarr;</a>
              </div>
            </div>

          </div>

          {/* Section Headline */}
          <div className="infosys-section-header">
            <h2 className="infosys-section-title">
              Crafting <span className="text-highlight-purple">Intelligent</span> Experiences
            </h2>
            <p className="infosys-section-subtitle">
              Whether you are automating return disputes, linking catalog configuration with WMS, or running ad-spend audits, operational data remains the biggest enabler of scale.
            </p>
            <div className="infosys-action-row">
              <a href="#" className="infosys-curious-btn">
                I&apos;m Curious
                <span className="infosys-btn-arrow">&nearr;</span>
              </a>
            </div>
          </div>

          {/* Three Abstract Showcase Cards below the header */}
          <div className="infosys-showcase-grid">
            
            {/* Showcase 1: Beauty & Cosmetics */}
            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-1"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">01</span>
                <h4 className="showcase-title">Beauty & Fashion</h4>
                <p className="showcase-desc">Expedited dispatch turnaround under 4 hours, batch expiration alerts, and custom gift kits.</p>
              </div>
            </div>

            {/* Showcase 2: Electronics & FMCG */}
            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-2"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">02</span>
                <h4 className="showcase-title">Electronics & FMCG</h4>
                <p className="showcase-desc">High-value serial number tracking, returns validation, and platform SLA compliance checks.</p>
              </div>
            </div>

            {/* Showcase 3: Health & Wellness */}
            <div className="infosys-showcase-card">
              <div className="infosys-showcase-bg">
                <div className="showcase-liquid-gradient s-gradient-3"></div>
              </div>
              <div className="infosys-showcase-content">
                <span className="showcase-num">03</span>
                <h4 className="showcase-title">Nutrition & Luxury</h4>
                <p className="showcase-desc">FSSAI-compliant warehouse hygiene setups, batch control, and tamper-proof security shipping.</p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ══════════════════════════════════
          DO IT ALL WITH GOODLIFE — Pattern.com style
          ══════════════════════════════════ */}
      <section className="ptn-do-section">
        <div className="container">

          {/* Centered headline */}
          <div className="ptn-do-header">
            <h2 className="ptn-do-title">Do it all with Goodlife.</h2>
          </div>

          {/* 4-card grid */}
          <div className="ptn-do-grid">

            {/* Card 1 — Marketplace Management */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-1">
                {/* Isometric grid icon */}
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon points="60,70 90,54 120,70 90,86" fill="#BFDBFE" opacity="0.9"/>
                  <polygon points="60,70 90,86 90,98 60,82" fill="#3B82F6"/>
                  <polygon points="90,86 120,70 120,82 90,98" fill="#1D4ED8"/>
                  <polygon points="60,54 90,38 120,54 90,70" fill="#DBEAFE"/>
                  <polygon points="60,54 90,70 90,82 60,66" fill="#60A5FA"/>
                  <polygon points="90,70 120,54 120,66 90,82" fill="#2563EB"/>
                  <polygon points="60,38 90,22 120,38 90,54" fill="#EFF6FF" opacity="0.9"/>
                  <polygon points="60,38 90,54 90,66 60,50" fill="#93C5FD"/>
                  <polygon points="90,54 120,38 120,50 90,66" fill="#3B82F6"/>
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Marketplace Management</h3>
                <p className="ptn-card-desc">Full cataloguing, listing optimisation, price management and day-to-day operations across Amazon, Flipkart, JioMart and Moglix.</p>
                <a href="#" className="ptn-card-cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Card 2 — Finance & Reconciliation */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-2">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon points="50,88 90,62 130,88 90,114" fill="#1E3A8A" opacity="0.55"/>
                  <polygon points="50,88 90,114 90,120 50,94" fill="#1D4ED8" opacity="0.65"/>
                  <polygon points="90,114 130,88 130,94 90,120" fill="#172554" opacity="0.65"/>
                  <polygon points="50,68 90,42 130,68 90,94" fill="#3B82F6" opacity="0.75"/>
                  <polygon points="50,68 90,94 90,100 50,74" fill="#2563EB" opacity="0.85"/>
                  <polygon points="90,94 130,68 130,74 90,100" fill="#1E40AF" opacity="0.85"/>
                  <polygon points="50,48 90,22 130,48 90,74" fill="#BFDBFE"/>
                  <polygon points="50,48 90,74 90,80 50,54" fill="#93C5FD"/>
                  <polygon points="90,74 130,48 130,54 90,80" fill="#60A5FA"/>
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Finance & Reconciliation</h3>
                <p className="ptn-card-desc">Automatic daily audits of platform commissions, payment gateway settlements, returns deductions, and payout variances across all channels.</p>
                <a href="#" className="ptn-card-cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Card 3 — Warehousing & Fulfilment */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-3">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon points="42,82 72,66 102,82 72,98" fill="#93C5FD" opacity="0.7"/>
                  <polygon points="42,82 72,98 72,110 42,94" fill="#3B82F6" opacity="0.85"/>
                  <polygon points="72,98 102,82 102,94 72,110" fill="#1D4ED8" opacity="0.85"/>
                  <polygon points="102,82 132,66 162,82 132,98" fill="#93C5FD" opacity="0.7"/>
                  <polygon points="102,82 132,98 132,110 102,94" fill="#3B82F6" opacity="0.85"/>
                  <polygon points="132,98 162,82 162,94 132,110" fill="#1D4ED8" opacity="0.85"/>
                  <polygon points="72,66 102,50 132,66 102,82" fill="#DBEAFE"/>
                  <polygon points="72,66 102,82 102,94 72,78" fill="#93C5FD"/>
                  <polygon points="102,82 132,66 132,78 102,94" fill="#3B82F6"/>
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Warehousing & Fulfilment</h3>
                <p className="ptn-card-desc">1,00,000+ sq ft of warehouse space, FBA & FAssured integrations, and rapid 12-state distribution with real-time inventory tracking.</p>
                <a href="#" className="ptn-card-cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Card 4 — Performance Marketing */}
            <div className="ptn-card">
              <div className="ptn-card-graphic ptn-card-graphic-4">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <polygon points="60,96 90,80 120,96 90,112" fill="#93C5FD" opacity="0.6"/>
                  <polygon points="60,96 90,112 90,120 60,104" fill="#3B82F6" opacity="0.8"/>
                  <polygon points="90,112 120,96 120,104 90,120" fill="#1D4ED8" opacity="0.8"/>
                  <polygon points="60,76 90,60 120,76 90,92" fill="#BFDBFE" opacity="0.9"/>
                  <polygon points="60,76 90,92 90,104 60,88" fill="#60A5FA"/>
                  <polygon points="90,92 120,76 120,88 90,104" fill="#2563EB"/>
                  <polygon points="60,56 90,40 120,56 90,72" fill="#EFF6FF"/>
                  <polygon points="60,56 90,72 90,84 60,68" fill="#93C5FD"/>
                  <polygon points="90,72 120,56 120,68 90,84" fill="#3B82F6"/>
                  <circle cx="90" cy="28" r="14" fill="#3B82F6" opacity="0.3"/>
                  <circle cx="90" cy="28" r="8" fill="#60A5FA" opacity="0.6"/>
                  <circle cx="90" cy="28" r="4" fill="#DBEAFE"/>
                </svg>
              </div>
              <div className="ptn-card-body">
                <h3 className="ptn-card-title">Performance Marketing</h3>
                <p className="ptn-card-desc">Full-funnel Sponsored Ads, Deal of the Day setups, search ranking boosts, and return-on-ad-spend (ROAS) tracking across every platform.</p>
                <a href="#" className="ptn-card-cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="ptn-do-footer">
            <a href="#" className="ptn-do-more-link">
              View all 8 capabilities
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>
      </section>


      {/* ── ABOUT US / OUR STORY SECTION ── */}
      <section className="ptn-story-section" id="about-us">
        <div className="container">
          
          <div className="ptn-story-header">
            <h2 className="ptn-story-title">Your brand. Our reach.<br />A world of possibilities.</h2>
            <p className="ptn-story-subtitle">
              Ecommerce is complicated. Growth shouldn&apos;t be. We bring clarity to chaos with WMS systems that scale, OMS channel sync that delivers, and automated reconciliation that builds trust.
            </p>
            <div className="ptn-story-actions">
              <a href="#" className="ptn-story-btn">
                Our Story
                <span className="ptn-story-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Infinite scrolling marquee track of liquid glass cards */}
          <div className="ptn-story-marquee-wrap">
            <div className="ptn-story-marquee-track">
              
              {/* Original 6 Cards (Mixed Dark / Light matching screenshot) */}
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
                <span className="ptn-story-val">1998</span>
                <span className="ptn-story-lbl">Operations Began</span>
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
                <span className="ptn-story-val">1998</span>
                <span className="ptn-story-lbl">Operations Began</span>
              </div>
              <div className="ptn-story-card card-gold">
                <span className="ptn-story-val">₹200 Cr</span>
                <span className="ptn-story-lbl">Gross Turnover</span>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ── ACCELERATION SECTION (Pattern.com Style) ── */}
      <section className="ptn-accel-section" id="acceleration">
        
        {/* Top block: Video panel */}
        <div className="container">
          <div className="ptn-accel-video-panel">
            <div className="ptn-accel-video-left">
              {/* Blurred mock dashboard background */}
              <div className="ptn-accel-video-bg-mock">
                <div className="mock-browser-bar">
                  <span className="m-dot red"></span>
                  <span className="m-dot yellow"></span>
                  <span className="m-dot green"></span>
                </div>
                <div className="mock-browser-body">
                  <div className="mock-chart-container">
                    <svg viewBox="0 0 200 100" fill="none" className="mock-chart-svg">
                      <path d="M10 80 Q 40 20, 80 50 T 150 10 T 190 60" stroke="#3B82F6" strokeWidth="3" fill="none" opacity="0.6" />
                      <circle cx="80" cy="50" r="4" fill="#3B82F6" />
                      <circle cx="150" cy="10" r="4" fill="#6D28D9" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="ptn-accel-video-overlay"></div>

              {/* Play button with liquid pulse background */}
              <button className="ptn-accel-play-btn" onClick={() => setVideoOpen(true)} aria-label="Play video">
                <span className="play-pulse-circle"></span>
                <span className="play-pulse-circle-2"></span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 3 20 12 6 21 6 3"/>
                </svg>
              </button>
            </div>
            <div className="ptn-accel-video-right">
              <h2 className="ptn-accel-video-title">Unlock growth everywhere with our ecommerce platform.</h2>
            </div>
          </div>
        </div>

        {/* Bottom block: Two columns (Accordion + Description) */}
        <div className="container ptn-accel-body-grid">
          
          {/* Left Column */}
          <div className="ptn-accel-left">
            <h2 className="ptn-accel-title">Your partner in ecommerce acceleration.</h2>
            <div className="ptn-accel-actions">
              <a href="#" className="ptn-accel-demo-btn">
                Schedule a demo
                <span className="ptn-accel-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Steps Accordion */}
          <div className="ptn-accel-right">
            <div className="ptn-accel-accordion">
              
              {[
                {
                  num: "01",
                  title: "We buy your products and sell them worldwide.",
                  desc: "Good Life acts as a 3P/1P merchant partner. We manage end-to-end purchasing, logistics, catalog management, customer service, and international compliance, removing inventory risk from your balance sheet."
                },
                {
                  num: "02",
                  title: "Our ecommerce platform handles everything else.",
                  desc: "From syncing inventory across national WMS networks to executing full-funnel marketing campaigns and generating daily payment audits—our technology suite automates operations."
                },
                {
                  num: "03",
                  title: "Your brand reaches new customers and marketplaces.",
                  desc: "We configure multi-channel catalog optimizations to instantly launch your brand on Amazon, Flipkart, Myntra, Jiomart, and native D2C sites, driving instant visibility boosts."
                }
              ].map((item, idx) => (
                <div key={idx} className={`ptn-accel-item ${activeAcc === idx ? "active" : ""}`}>
                  <div className="ptn-accel-trigger" onClick={() => setActiveAcc(idx)}>
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


      {/* METHODOLOGY SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Methodology</span>
            <h2 className="section-title">A Structured Path to Growth</h2>
            <p className="section-subtitle">
              How we integrate your brand into our systems for immediate marketplace performance improvements.
            </p>
          </div>

          <div ref={timelineRef} className="workflow-wrap">
            <div className="workflow-connector">
              <div
                className="workflow-connector-fill"
                style={{ width: isTimelineLit ? "100%" : "0%" }}
              ></div>
            </div>
            
            {/* Step 1 */}
            <div className={`workflow-step step-violet ${isTimelineLit ? "lit" : ""}`}>
              <div className="workflow-node">1</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Audit & Strategy</h4>
                <p className="workflow-desc">Evaluate current marketplace visibility & leakage.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`workflow-step step-blue ${isTimelineLit ? "lit" : ""}`}>
              <div className="workflow-node">2</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Setup</h4>
                <p className="workflow-desc">Listing configuration & catalog optimizations.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`workflow-step step-cyan ${isTimelineLit ? "lit" : ""}`}>
              <div className="workflow-node">3</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Integration</h4>
                <p className="workflow-desc">Link channels with WMS, OMS, & finance reconciliation.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`workflow-step step-indigo ${isTimelineLit ? "lit" : ""}`}>
              <div className="workflow-node">4</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Execution</h4>
                <p className="workflow-desc">Run full-funnel marketing campaigns.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className={`workflow-step step-violet-dark ${isTimelineLit ? "lit" : ""}`}>
              <div className="workflow-node">5</div>
              <div className="workflow-card">
                <h4 className="workflow-name">Reporting</h4>
                <p className="workflow-desc">Deliver transparent weekly dashboard data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="section-padding industries-section" id="industries">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Industries</span>
            <h2 className="section-title">Sectors We Power</h2>
            <p className="section-subtitle">
              We build custom warehouse protocols and inventory rules to fit specific sector guidelines.
            </p>
          </div>

          <div className="industries-grid">
            
            {/* Sector 1: Beauty & Fashion */}
            <div className="card industry-card industry-violet">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-violet-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-5c-.5 3-2 3.4-4 5s-3 3.5-3 5.5a7 7 0 0 0 7 7z"/>
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Beauty & Fashion</div>
                  <p className="industry-desc">Temperature-controlled storage, expiry tracking, batch controls, and premium gift-wrap kits.</p>
                </div>
              </div>
            </div>

            {/* Sector 2: Electronics & FMCG */}
            <div className="card industry-card industry-blue">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-blue-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Electronics & FMCG</div>
                  <p className="industry-desc">Serial number tracking, high-value secure storage, same-day dispatch, and return testing.</p>
                </div>
              </div>
            </div>

            {/* Sector 3: Nutrition & Luxury */}
            <div className="card industry-card industry-cyan">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-cyan-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Nutrition & Luxury</div>
                  <p className="industry-desc">FSSAI-compliant warehouse hygiene, tamper-proof seal packaging, and security transport links.</p>
                </div>
              </div>
            </div>

            {/* Sector 4: Home & Kitchen */}
            <div className="card industry-card industry-indigo">
              <div className="industry-card-bg">
                <div className="ind-liquid-gradient ind-indigo-grad"></div>
              </div>
              <div className="industry-content-wrap">
                <div className="industry-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="industry-info">
                  <div className="industry-name">Home & Kitchen</div>
                  <p className="industry-desc">Heavy-bulky transit care, multi-item order sets, catalog dimension mapping, and drop-ship support.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <a href="#" className="ptn-do-more-link">
              Explore vertical integrations
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section-padding" style={{ background: "#FFFFFF", position: "relative" }}>
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
                className={`testimonial-card ${activeSlide === index ? "active-slide" : "hidden-slide"}`}
                style={{
                  display: activeSlide === index ? "flex" : "none",
                }}
              >
                
                {/* Premium Background Quotes SVG Icon */}
                <div className="testimonial-quotes-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-3 6-3 6m11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-3 6-3 6"/>
                  </svg>
                </div>

                <div className="testimonial-quote">
                  &ldquo;{test.quote}&rdquo;
                </div>

                {/* Author Info with initial profile badge */}
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

            {/* Slider Dots indicators */}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${activeSlide === index ? "active" : ""}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-wrap">
            <div className="faq-item-list">
              {[
                {
                  q: "What does End-to-End Growth Partner mean?",
                  a: "Unlike simple marketing agencies or shipping companies, Good Life handles the complete operations chain. This includes managing catalog listings, product pricing, running ad campaigns, storage across our 1,00,000 sq ft warehouses, packing and shipping, and reconciling every payment from platforms like Amazon and Flipkart.",
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
                  q: "Do you support retail customers looking for water purifiers?",
                  a: "Yes! While we power marketplace growth for national brands, we also directly manage and sell our legacy household water purifiers (RO systems, softeners, air purifiers) originally launched in 2005. You can visit our dedicated water solutions page to learn more.",
                },
              ].map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
                  <div className="faq-question" onClick={() => toggleFaq(idx)}>
                    <span>{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-padding" style={{ background: "#FFFFFF", padding: "6rem 0 7rem" }}>
        <div className="container">
          <div className="final-cta-card">
            
            {/* Background glowing aurora orbs */}
            <div className="final-cta-orb final-cta-orb-1"></div>
            <div className="final-cta-orb final-cta-orb-2"></div>
            
            <div className="final-cta-content">
              <h2 className="final-cta-title">Ready to Scale Your E-commerce Business?</h2>
              <p className="final-cta-desc">
                Submit your brand details for a complimentary marketplace visibility audit and finance leak checkup. Discovery begins within 5 working days.
              </p>
              
              <div className="final-cta-actions">
                <a href="#" className="hero-cta-btn">
                  Request a Free Audit
                  <span className="hero-cta-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER SECTION (Pattern.com Style) ── */}
      <footer className="ptn-footer">
        <div className="container">
          
          <div className="ptn-footer-top">
            
            {/* Left side: Newsletter signup */}
            <div className="ptn-footer-newsletter">
              <h3 className="ptn-newsletter-title">Ready. Set. Grow.</h3>
              <p className="ptn-newsletter-desc">
                Stay ahead of the marketplace curve. Sign up to receive expert insights, trends, and strategies from Good Life.
              </p>
              <form className="ptn-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="ptn-input-group">
                  <label htmlFor="footer-email" className="ptn-input-label">
                    <span className="required-star">*</span> Business Email:
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder=""
                    required
                    className="ptn-footer-input"
                  />
                </div>
                <button type="submit" className="ptn-footer-submit-btn">
                  Submit
                </button>
              </form>
            </div>

            {/* Right side: 4 Column Links */}
            <div className="ptn-footer-nav">
              
              <div className="ptn-footer-col">
                <h4 className="ptn-footer-col-title">Products</h4>
                <ul className="ptn-footer-links">
                  <li><a href="#">Marketplace Accelerator</a></li>
                  <li><a href="#">China Accelerator</a></li>
                  <li><a href="#">TikTok Shop</a></li>
                  <li><a href="#">Marketplace Prep</a></li>
                  <li><a href="#">Middle Mile</a></li>
                  <li><a href="#">DTC Fulfillment</a></li>
                  <li><a href="#">Creators</a></li>
                  <li><a href="#">PXM</a></li>
                </ul>
              </div>

              <div className="ptn-footer-col">
                <h4 className="ptn-footer-col-title">Product Categories</h4>
                <ul className="ptn-footer-links">
                  <li><a href="#">Marketplaces</a></li>
                  <li><a href="#">Fulfillment</a></li>
                  <li><a href="#">Software</a></li>
                  <li><a href="#">Services</a></li>
                </ul>
              </div>

              <div className="ptn-footer-col">
                <h4 className="ptn-footer-col-title">Resources</h4>
                <ul className="ptn-footer-links">
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">eBooks & Reports</a></li>
                  <li><a href="#">Product Demos</a></li>
                  <li><a href="#">Topics</a></li>
                  <li><a href="#">Digital Shelf</a></li>
                  <li><a href="#">PXM Knowledge Base</a></li>
                  <li><a href="#">Developer Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="ptn-footer-col">
                <h4 className="ptn-footer-col-title">Company</h4>
                <ul className="ptn-footer-links">
                  <li><a href="#about-us">Our Story</a></li>
                  <li><a href="#">Leadership</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Newsroom</a></li>
                  <li><a href="#">Investor Relations</a></li>
                </ul>
              </div>

            </div>

          </div>

          <div className="ptn-footer-bottom">
            <p>© 2026 Good Life. All Rights Reserved. Built as proposed by Roots Research Private Limited.</p>
            <p>Prepared for Good Life • Website & Digital Presence</p>
          </div>

        </div>
      </footer>

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
    </>
  );
}
