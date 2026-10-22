"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Box, 
  Zap, 
  TrendingUp, 
  FileCheck,
  Truck,
  DollarSign,
  Play,
  RotateCcw,
  Sliders,
  Check,
  Star,
  Percent,
  Building2,
  Award
} from "lucide-react";
import "./launch-online.css";

// ── ANIMATED COUNTER COMPONENT (Same as Homepage) ──
const AnimatedCounter: React.FC<{ target: string }> = ({ target }) => {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    function animate() {
      const prefix = target.startsWith("₹") ? "₹" : "";
      const hasCr = target.includes("Cr");
      const hasPlus = target.includes("+");
      const hasPct = target.includes("%");
      const targetVal = parseFloat(target.replace(/[^0-9.]/g, ""));
      if (isNaN(targetVal)) {
        setValue(target);
        return;
      }
      const duration = 1600;
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

export default function LaunchOnlinePage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isAutoPlayRoadmap, setIsAutoPlayRoadmap] = useState<boolean>(true);

  // Auto-cycle roadmap every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlayRoadmap) return;
    const timer = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlayRoadmap]);

  // Interactive Readiness Checklist
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: false,
    4: true
  });

  const checklist = [
    { title: "Registered Trademark", sub: "Required for Brand Registry 2.0 & Buybox buy-in", icon: ShieldCheck },
    { title: "Active State GSTIN", sub: "Primary billing and multi-state APOB tax mapping", icon: FileCheck },
    { title: "Master SKU Specifications", sub: "Raw engineering specs to craft A+ conversion listings", icon: Layers },
    { title: "GS1 Barcodes / EAN", sub: "Mandatory for automated fulfillment scanning & indexing", icon: Box },
    { title: "Drop-Tested Packaging", sub: "Engineered to withstand multi-touch Indian courier chutes", icon: Truck }
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  const getReadinessStatus = () => {
    if (readinessPercent === 100) return { text: "100% READY FOR LAUNCH", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0", desc: "Your brand is primed for our expedited 30-day go-to-market dispatch and instant FBA/FBF onboarding." };
    if (readinessPercent >= 80) return { text: "80% NEAR READY", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", desc: "Minor compliance document finalization needed during Phase 1 onboarding." };
    if (readinessPercent >= 60) return { text: "60% PREPARATION REQUIRED", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", desc: "GoodLife incubation support required for barcode allocation & trademark registry." };
    return { text: "INITIAL COMPLIANCE STAGE", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA", desc: "Foundational compliance documentation required before active onboarding." };
  };

  // 60-Day Roadmap Phases
  const phases = [
    {
      id: "01",
      days: "Days 1 – 15",
      badge: "Foundation & Approvals",
      title: "Brand Registry & Category Ungating",
      summary: "Securing trademark defenses, tax mapping, and platform authorizations before spending a single rupee on ads.",
      deliverables: [
        "Amazon Brand Registry 2.0 and Flipkart Brand Authorization approval",
        "Category ungating and hazardous/heavy-bulky classification clearance",
        "Multi-state GST, TCS, and TDS legal entity configuration",
        "SKU barcode mapping and digital catalog master architecture"
      ],
      metrics: "Zero IP Hijack Risk",
      progress: "25%"
    },
    {
      id: "02",
      days: "Days 16 – 30",
      badge: "Catalog & Conversion Engine",
      title: "Conversion-Engineered A+ Listings",
      summary: "Transforming raw factory engineering specs into conversion-focused listings engineered for high organic indexing.",
      deliverables: [
        "High-intent keyword harvesting and backend search term indexing",
        "3D exploded render creation and lifestyle infographic design",
        "Brand Story and premium A+ / Enhanced Brand Content module publication",
        "Compliance packaging drop-test certification for courier line-hauls"
      ],
      metrics: "3.4x Higher Conversion Rate",
      progress: "50%"
    },
    {
      id: "03",
      days: "Days 31 – 45",
      badge: "Logistics & Buybox Seed",
      title: "Warehouse Inwarding & Prime Badges",
      summary: "Distributing initial inventory into strategic regional fulfillment nodes to unlock same-day and next-day delivery badges.",
      deliverables: [
        "First-mile pallet pickup from your manufacturing facility",
        "Inwarding across key regional hubs (Bhiwandi, Gurugram, Bengaluru)",
        "Automated inventory sync and safety stock buffer configuration",
        "Initial Buybox seeding and delivery promise optimization"
      ],
      metrics: "92% PIN Code Prime Eligibility",
      progress: "75%"
    },
    {
      id: "04",
      days: "Days 46 – 60",
      badge: "Flywheel & Revenue Scale",
      title: "Targeted Ad Engine & Margin Defense",
      summary: "Activating algorithmic PPC campaigns, collecting early verified reviews, and locking in operating profitability.",
      deliverables: [
        "Sponsored Products, Brands, and Display campaign launch with negative keyword gates",
        "Amazon Vine and platform review acceleration program enrollment",
        "Automated payment reconciliation for carrier weight disputes",
        "Weekly executive P&L reporting showing net realized payout"
      ],
      metrics: "Sub-18% Target ACOS",
      progress: "100%"
    }
  ];

  // Pipeline Nodes
  const pipelineNodes = [
    {
      step: "01",
      title: "Factory Audit & SKU Selection",
      desc: "Analyzing production cost structures and selecting the top 15% high-margin SKUs suited for direct e-commerce.",
      icon: Box
    },
    {
      step: "02",
      title: "Brand Asset Packaging",
      desc: "Creating master A+ cataloging, 3D product renders, and drop-tested shipping packaging.",
      icon: Layers
    },
    {
      step: "03",
      title: "Multi-State Inwarding",
      desc: "Securing APOB registrations and distributing initial stock into North, West, and South fulfillment hubs.",
      icon: Truck
    },
    {
      step: "04",
      title: "Buybox & Prime Badging",
      desc: "Activating automated pricing algorithms and regional fast-shipping badges to win the Buybox.",
      icon: Zap
    },
    {
      step: "05",
      title: "Precision Ad Acceleration",
      desc: "Scaling targeted search ads throttled automatically against live warehouse stock levels.",
      icon: TrendingUp
    },
    {
      step: "06",
      title: "Reconciliation & Margins",
      desc: "Automated daily auditing of platform deductions, weight discrepancies, and return reconciliations.",
      icon: DollarSign
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "How fast can we generate our first marketplace sale?",
      a: "With our standardized 60-day launch protocol, your listings are live and receiving orders between Days 30 and 45. Brands with pre-existing trademarks and GST registrations often see their first sales within 25 days."
    },
    {
      q: "Will launching online upset our existing offline distributors?",
      a: "No. We specifically protect traditional distributor relationships by creating online-exclusive SKU bundles, unique model variants, and enforcing strict MAP (Minimum Advertised Price) policies across all marketplace channels."
    },
    {
      q: "Who owns the seller accounts, customer data, and brand assets?",
      a: "You retain 100% legal ownership of all seller accounts, brand registries, customer reviews, and digital assets. GoodLife acts as your operational execution partner with zero equity claims and complete transparency."
    },
    {
      q: "What commercial model does GoodLife operate on?",
      a: "We operate on a transparent milestone-based onboarding fee combined with a performance-aligned revenue share. When your marketplace revenue grows profitably, we grow with you."
    }
  ];

  return (
    <div className="launch-online-root" style={{
      background: "radial-gradient(130% 90% at 50% 0%, #E0F2FE 0%, #F0F7FF 25%, #F8FAFC 55%, #EDF5FF 80%, #E2F1FE 100%)",
      color: "#0F172A",
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden"
    }}>

      {/* ── AMBIENT FLOATING AURORA GLOWS (Matching Homepage) ── */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "-80px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.1) 45%, transparent 70%)",
        filter: "blur(90px)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "auroraPulse 18s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute",
        top: "400px",
        right: "-120px",
        width: "650px",
        height: "650px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 70%)",
        filter: "blur(95px)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "auroraPulse 22s ease-in-out infinite alternate-reverse"
      }} />

      {/* ── GLOBAL STYLES & PROFESSIONAL TYPOGRAPHY (Plus Jakarta Sans) ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');

        .launch-online-root,
        .launch-online-root * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        @keyframes auroraPulse {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 30px) scale(1.1); }
          100% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .luxury-glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          box-shadow: 0 12px 36px -8px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .luxury-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -12px rgba(37, 99, 235, 0.12), 0 6px 16px -4px rgba(15, 23, 42, 0.04);
          border-color: rgba(147, 197, 253, 0.8);
        }
        .btn-gradient-blue {
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF !important;
          border: none;
          box-shadow: 0 8px 24px -4px rgba(37, 99, 235, 0.4);
          transition: all 0.25s ease;
        }
        .btn-gradient-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(37, 99, 235, 0.5);
        }
        .btn-glass-subtle {
          background: rgba(255, 255, 255, 0.9);
          color: #0F172A !important;
          border: 1px solid #CBD5E1;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
          transition: all 0.25s ease;
        }
        .btn-glass-subtle:hover {
          background: #FFFFFF;
          border-color: #94A3B8;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
        }
        @keyframes pingGlow {
          0% { transform: scale(1); opacity: 0.9; }
          70%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shineSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .case-metric-tile {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-top: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 14px 32px -8px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .case-metric-tile:hover {
          transform: translateY(-5px);
          border-color: rgba(147, 197, 253, 0.5);
        }
        .case-milestone-glass {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 16px;
          padding: 0.9rem 1.15rem;
          transition: all 0.25s ease;
        }
        .case-milestone-glass:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
          border-color: rgba(147, 197, 253, 0.4);
          transform: translateX(4px);
        }

        /* ── COMPREHENSIVE FULL MOBILE RESPONSIVENESS ── */
        @media (max-width: 768px) {
          .hero-responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn-group button,
          .hero-btn-group a {
            width: 100% !important;
            justify-content: center !important;
          }
          .metrics-responsive-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.85rem !important;
          }
          .roadmap-tabs-grid {
            grid-template-columns: 1fr !important;
          }
          .readiness-split-grid {
            grid-template-columns: 1fr !important;
          }
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }
          .case-study-split {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .case-metrics-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.85rem !important;
          }
          .solution-hero-section {
            padding-top: 1.5rem !important;
            padding-bottom: 2rem !important;
          }
          .prefooter-btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .prefooter-btn-group button,
          .prefooter-btn-group a {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .metrics-responsive-grid {
            grid-template-columns: 1fr !important;
          }
          .case-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 01. LUXURY SPLIT HERO SECTION ── */}
      <section className="solution-hero-section" style={{
        position: "relative",
        paddingTop: "clamp(2rem, 3.5vw, 3.2rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 3.5rem)",
        zIndex: 1
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(1.8rem, 3.5vw, 3rem)",
            alignItems: "center"
          }}>
            
            {/* Left Hero Content */}
            <div>
              {/* Eyebrow Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.4rem 1.1rem",
                borderRadius: "9999px",
                background: "rgba(239, 246, 255, 0.9)",
                border: "1px solid #BFDBFE",
                backdropFilter: "blur(10px)",
                marginBottom: "1rem"
              }}>
                <span style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#2563EB",
                  boxShadow: "0 0 10px #2563EB",
                  animation: "pulseDot 2s infinite"
                }} />
                <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#1D4ED8", letterSpacing: "0.5px" }}>
                  0 TO 1 D2C & MARKETPLACE ONBOARDING
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: "clamp(2.1rem, 3.4vw, 3.1rem)",
                fontWeight: "900",
                lineHeight: "1.14",
                letterSpacing: "-0.03em",
                color: "#0B1736",
                margin: "0 0 0.85rem 0"
              }}>
                Launch from Factory Floor to National Scale in <span style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #0284C7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>60 Days</span>.
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: "clamp(0.95rem, 1.25vw, 1.05rem)",
                lineHeight: "1.6",
                color: "#475569",
                marginBottom: "1.35rem"
              }}>
                A complete turnkey operating partnership for manufacturers and emerging brands. We engineer Brand Registry, high-converting A+ content, multi-state fulfillment, and ad scaling with strict offline MAP margin protection.
              </p>

              {/* CTA Buttons */}
              <div className="hero-btn-group" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "1.5rem" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  className="btn-gradient-blue"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.9rem 2rem",
                    borderRadius: "14px",
                    fontSize: "0.96rem",
                    fontWeight: "800",
                    cursor: "pointer"
                  }}
                >
                  <Rocket size={18} />
                  <span>Request Launch Diagnostic</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#roadmap"
                  className="btn-glass-subtle"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.9rem 1.6rem",
                    borderRadius: "14px",
                    fontSize: "0.94rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  Explore 60-Day Roadmap
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#334155" }}>
                  <CheckCircle2 size={17} color="#10B981" />
                  <span>100% Brand IP Owned</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#334155" }}>
                  <CheckCircle2 size={17} color="#10B981" />
                  <span>Zero Equity / Lock-in</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#10B981" }}>
                  <CheckCircle2 size={17} color="#10B981" />
                  <span>30-Day First Order SLA</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Luxury Interactive 3D Status Dashboard Card */}
            <div style={{ position: "relative" }}>
              
              {/* Floating Pill Top Left */}
              <div className="floating-live-pill" style={{
                position: "absolute",
                top: "-14px",
                left: "-10px",
                zIndex: 3,
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                color: "#FFFFFF",
                borderRadius: "12px",
                padding: "0.45rem 0.9rem",
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                animation: "floatCard 5s ease-in-out infinite"
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                <span style={{ fontSize: "0.76rem", fontWeight: "800", letterSpacing: "0.5px" }}>LIVE ON 15+ PLATFORMS</span>
              </div>

              {/* Main Visual Glass Card */}
              <div className="luxury-glass-card" style={{ padding: "clamp(1.3rem, 2.4vw, 1.85rem)", position: "relative" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px" }}>
                      LAUNCH COCKPIT
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0B1736", margin: "0.15rem 0 0 0" }}>
                      Factory-to-Scale Pipeline
                    </h3>
                  </div>
                  <div style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "8px",
                    background: "#ECFDF5",
                    color: "#059669",
                    fontSize: "0.75rem",
                    fontWeight: "800"
                  }}>
                    STATUS: ACTIVE
                  </div>
                </div>

                {/* Progress Pipeline Visualization */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                  {[
                    { label: "Phase 1: Trademark & GST Registry", val: "100%", status: "Complete", color: "#10B981" },
                    { label: "Phase 2: A+ Cataloging & Infographics", val: "100%", status: "Complete", color: "#10B981" },
                    { label: "Phase 3: Multi-State Warehousing (FBA/FBF)", val: "85%", status: "Inwarding", color: "#2563EB" },
                    { label: "Phase 4: Buy Box & Ad Throttling", val: "Pending", status: "Next", color: "#64748B" }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      background: "#F8FAFC",
                      borderRadius: "10px",
                      padding: "0.65rem 0.85rem",
                      border: "1px solid #E2E8F0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#1E293B" }}>{item.label}</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: "800", color: item.color }}>{item.val}</span>
                      </div>
                      <div style={{ width: "100%", height: "5px", borderRadius: "9999px", background: "#E2E8F0", overflow: "hidden" }}>
                        <div style={{
                          width: item.val === "Pending" ? "10%" : item.val,
                          height: "100%",
                          background: item.color,
                          borderRadius: "9999px"
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Realization Box */}
                <div className="cockpit-realization-box" style={{
                  background: "linear-gradient(135deg, #0B1736 0%, #172554 100%)",
                  borderRadius: "12px",
                  padding: "0.95rem 1.25rem",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#93C5FD", fontWeight: "700", textTransform: "uppercase" }}>Projected 90-Day GMV</div>
                    <div style={{ fontSize: "1.45rem", fontWeight: "900", color: "#FFFFFF", marginTop: "0.15rem" }}>₹1.5+ Cr / Mo</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.7rem", color: "#93C5FD", fontWeight: "700", textTransform: "uppercase" }}>Prime Badging</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: "900", color: "#34D399", marginTop: "0.15rem" }}>92% PIN Codes</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 02. ANIMATED METRICS ROW (Matching Homepage Counters) ── */}
      <section style={{ padding: "0 1.5rem 4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "1.25rem"
        }}>
          {[
            { val: "60", suffix: " Days", label: "Factory to First National Dispatch", icon: Clock },
            { val: "92%", suffix: "", label: "Prime Same-Day / Next-Day Coverage", icon: Truck },
            { val: "18.2%", suffix: "", label: "Net Operating Margin Realized", icon: TrendingUp },
            { val: "100%", suffix: "", label: "Account Ownership & Brand Equity", icon: ShieldCheck }
          ].map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="luxury-glass-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0B1736", lineHeight: "1.1" }}>
                    <AnimatedCounter target={st.val} />{st.suffix}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: "600", marginTop: "0.25rem" }}>
                    {st.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 03. INTERACTIVE 60-DAY ROADMAP ── */}
      <section id="roadmap" style={{
        padding: "5rem 1.5rem",
        background: "rgba(255, 255, 255, 0.6)",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
        position: "relative"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.825rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              STANDARDIZED OPERATING BLUEPRINT
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              The 60-Day Factory-to-Marketplace Roadmap
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>
              Every single launch step is sequence-governed so your brand builds organic rank and Buybox dominance without wasting ad budgets.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div
            onMouseEnter={() => setIsAutoPlayRoadmap(false)}
            onMouseLeave={() => setIsAutoPlayRoadmap(true)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1rem",
              marginBottom: "2rem"
            }}
          >
            {phases.map((ph, idx) => {
              const isSelected = activePhase === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  style={{
                    background: isSelected ? "linear-gradient(135deg, #0B1736 0%, #1E293B 100%)" : "rgba(255, 255, 255, 0.8)",
                    border: isSelected ? "1px solid #0B1736" : "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "1.4rem 1.5rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    boxShadow: isSelected ? "0 14px 32px -8px rgba(11, 23, 54, 0.3)" : "none",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: "800",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "6px",
                      background: isSelected ? "rgba(255,255,255,0.18)" : "#EFF6FF",
                      color: isSelected ? "#93C5FD" : "#2563EB"
                    }}>
                      PHASE {ph.id}
                    </span>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: isSelected ? "#94A3B8" : "#64748B" }}>
                      {ph.days}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "1.1rem",
                    fontWeight: "800",
                    color: isSelected ? "#FFFFFF" : "#0B1736",
                    lineHeight: "1.3"
                  }}>
                    {ph.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Phase Cockpit */}
          <div className="luxury-glass-card" style={{ padding: "clamp(2rem, 4vw, 3rem)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <span style={{
                  display: "inline-block",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "9999px",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  fontSize: "0.825rem",
                  fontWeight: "800",
                  marginBottom: "0.6rem"
                }}>
                  {phases[activePhase].days} • PRIMARY FOCUS
                </span>
                <h3 style={{ fontSize: "1.85rem", fontWeight: "900", color: "#0B1736", margin: "0 0 0.6rem 0" }}>
                  {phases[activePhase].title}
                </h3>
                <p style={{ color: "#475569", fontSize: "1.1rem", maxWidth: "780px", lineHeight: "1.6", margin: 0 }}>
                  {phases[activePhase].summary}
                </p>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #0B1736 0%, #1E293B 100%)",
                borderRadius: "14px",
                padding: "1.2rem 1.6rem",
                textAlign: "right",
                color: "#FFFFFF"
              }}>
                <div style={{ fontSize: "0.75rem", color: "#93C5FD", fontWeight: "700", textTransform: "uppercase" }}>Phase Milestone Target</div>
                <div style={{ fontSize: "1.25rem", fontWeight: "900", color: "#34D399", marginTop: "0.25rem" }}>
                  {phases[activePhase].metrics}
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "2rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#0B1736", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem" }}>
                Mandatory Deliverables Executed in this Sprint:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
                {phases[activePhase].deliverables.map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    padding: "1.1rem 1.25rem",
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)"
                  }}>
                    <CheckCircle2 size={20} style={{ color: "#2563EB", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.95rem", color: "#334155", lineHeight: "1.5", fontWeight: "600" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 04. INTERACTIVE READINESS CALCULATOR ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.825rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              SELF-SERVICE DIAGNOSTIC TOOL
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              Are You Launch-Ready? Check in 30 Seconds.
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>
              Toggle your current brand compliance assets to generate an instant launch assessment.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2.5rem",
            alignItems: "center"
          }}>
            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {checklist.map((item, idx) => {
                const checked = !!checkedItems[idx];
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.5rem",
                      background: checked ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                      border: checked ? "1px solid #93C5FD" : "1px solid #E2E8F0",
                      borderRadius: "16px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: checked ? "0 8px 24px -4px rgba(37, 99, 235, 0.12)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                      <div style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: checked ? "#EFF6FF" : "#F1F5F9",
                        color: checked ? "#2563EB" : "#94A3B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0B1736" }}>{item.title}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "0.2rem" }}>{item.sub}</div>
                      </div>
                    </div>

                    <div style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      border: checked ? "none" : "2px solid #CBD5E1",
                      background: checked ? "#2563EB" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease"
                    }}>
                      {checked && <Check size={18} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Result Card */}
            <div className="luxury-glass-card" style={{
              padding: "clamp(2rem, 4vw, 3rem)",
              textAlign: "center",
              border: `2px solid ${getReadinessStatus().border}`
            }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>
                LAUNCH READINESS INDEX
              </span>

              <div style={{
                fontSize: "clamp(4.2rem, 7vw, 5.5rem)",
                fontWeight: "900",
                color: "#0B1736",
                lineHeight: "1",
                margin: "1rem 0 0.5rem 0"
              }}>
                {readinessPercent}<span style={{ fontSize: "2.5rem", color: "#2563EB" }}>%</span>
              </div>

              {/* Progress bar */}
              <div style={{
                width: "100%",
                height: "12px",
                borderRadius: "9999px",
                background: "#E2E8F0",
                overflow: "hidden",
                margin: "1.25rem auto 1.5rem auto",
                maxWidth: "340px"
              }}>
                <div style={{
                  width: `${readinessPercent}%`,
                  height: "100%",
                  background: readinessPercent === 100 ? "#10B981" : "linear-gradient(90deg, #2563EB, #38BDF8)",
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }} />
              </div>

              <div style={{
                display: "inline-block",
                padding: "0.45rem 1.25rem",
                borderRadius: "9999px",
                background: getReadinessStatus().bg,
                color: getReadinessStatus().color,
                fontSize: "0.875rem",
                fontWeight: "800",
                marginBottom: "1rem"
              }}>
                {getReadinessStatus().text}
              </div>

              <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.6", margin: "0 auto 2rem auto", maxWidth: "380px" }}>
                {getReadinessStatus().desc}
              </p>

              <button
                onClick={() => setDiagOpen(true)}
                className="btn-gradient-blue"
                style={{
                  width: "100%",
                  maxWidth: "340px",
                  padding: "1rem 1.8rem",
                  borderRadius: "14px",
                  fontWeight: "800",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem"
                }}
              >
                Schedule Onboarding Call <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 05. FACTORY-TO-SCALE 6-STAGE PIPELINE ── */}
      <section style={{
        padding: "5rem 1.5rem",
        background: "rgba(255, 255, 255, 0.7)",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.825rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              FULL-STACK CAPABILITIES
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              The Factory-to-Marketplace Infrastructure
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>
              We build your brand’s dedicated digital flywheel across six mission-critical operational pillars.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "1.5rem"
          }}>
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="luxury-glass-card" style={{ padding: "2.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "#EFF6FF",
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: "900", color: "#94A3B8" }}>
                      STEP {node.step}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0B1736", marginBottom: "0.6rem" }}>
                    {node.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: "1.65", margin: 0 }}>
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 06. PROOF CASE STUDY HIGHLIGHT (COMPACT LEVEL-ER FROSTED GLASS UI/UX) ── */}
      <section style={{ padding: "clamp(2.5rem, 4.5vw, 4rem) 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(11, 23, 54, 0.94) 0%, rgba(15, 23, 42, 0.96) 50%, rgba(10, 16, 32, 0.98) 100%)",
            backdropFilter: "blur(28px) saturate(210%)",
            WebkitBackdropFilter: "blur(28px) saturate(210%)",
            borderRadius: "24px",
            padding: "clamp(1.5rem, 3.2vw, 2.75rem)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.75), 0 0 50px -10px rgba(37, 99, 235, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
            overflow: "hidden"
          }}>
            {/* Specular Diagonal Reflection Sheen */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(125deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.015) 25%, transparent 55%)",
              pointerEvents: "none",
              zIndex: 0
            }} />

            {/* Ambient Refractive Orbs behind the Glass */}
            <div style={{
              position: "absolute",
              top: "-60px",
              left: "-60px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 70%)",
              filter: "blur(65px)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              right: "-60px",
              bottom: "-60px",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
              filter: "blur(70px)",
              pointerEvents: "none"
            }} />

            <div className="case-study-split" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(1.75rem, 3.5vw, 3rem)",
              alignItems: "center",
              position: "relative",
              zIndex: 1
            }}>
              <div>
                {/* Liquid Glass Badge Row */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.2) 100%)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(125, 211, 252, 0.45)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.65)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 16px rgba(56, 189, 248, 0.2)",
                    color: "#BAE6FD",
                    fontSize: "0.75rem",
                    fontWeight: "800",
                    letterSpacing: "0.5px"
                  }}>
                    <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
                      <span style={{
                        animation: "pingGlow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: "#38BDF8"
                      }} />
                      <span style={{
                        position: "relative",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#38BDF8",
                        boxShadow: "0 0 8px #38BDF8"
                      }} />
                    </span>
                    VERIFIED CLIENT CASE STUDY
                  </span>
                  
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "9999px",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.35)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                    color: "#F1F5F9",
                    fontSize: "0.75rem",
                    fontWeight: "700"
                  }}>
                    <Building2 size={13} color="#93C5FD" />
                    Havells & Surya OEM Partner
                  </span>
                </div>

                {/* Main Heading (Compact & Proportional) */}
                <h3 style={{
                  fontSize: "clamp(1.45rem, 2.4vw, 1.95rem)",
                  fontWeight: "900",
                  lineHeight: "1.25",
                  marginBottom: "0.85rem",
                  color: "#FFFFFF",
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 14px rgba(0, 0, 0, 0.4)"
                }}>
                  From Contract Manufacturer to <span style={{
                    background: "linear-gradient(135deg, #67E8F9 0%, #38BDF8 40%, #818CF8 80%, #C084FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 16px rgba(56, 189, 248, 0.35))"
                  }}>₹1.5+ Cr/Month</span> Direct Marketplace Brand.
                </h3>

                {/* Strategic Context Glass Quote Block (Compact) */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderLeft: "3px solid #38BDF8",
                  borderRadius: "0 14px 14px 0",
                  padding: "0.85rem 1.15rem",
                  marginBottom: "1.15rem",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 8px 24px -8px rgba(0, 0, 0, 0.35)"
                }}>
                  <p style={{
                    color: "#E2E8F0",
                    fontSize: "0.92rem",
                    lineHeight: "1.65",
                    margin: 0,
                    fontWeight: "500"
                  }}>
                    A 25-year-old appliance manufacturer with zero direct-to-consumer presence was losing margins to traditional offline distributor tiers. GoodLife launched an online-exclusive D2C catalog on Amazon & Flipkart, deploying multi-node inventory across 6 state warehouses to unlock 92% Prime coverage.
                  </p>
                </div>

                {/* 3 Strategic Execution Milestones (Compact Frosted Micro-Cards) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem" }}>
                  {[
                    {
                      title: "Exclusive D2C model variants",
                      sub: "Zero offline dealer price conflict",
                      icon: Layers,
                      accent: "#818CF8",
                      bg: "rgba(129, 140, 248, 0.18)",
                      border: "rgba(129, 140, 248, 0.4)"
                    },
                    {
                      title: "Direct FBA & Flipkart FBF onboarding",
                      sub: "Across 6 state GST registrations",
                      icon: Truck,
                      accent: "#38BDF8",
                      bg: "rgba(56, 189, 248, 0.18)",
                      border: "rgba(56, 189, 248, 0.4)"
                    },
                    {
                      title: "Automated daily Buybox defense algorithms",
                      sub: "Protecting contribution margins 24/7",
                      icon: ShieldCheck,
                      accent: "#34D399",
                      bg: "rgba(52, 211, 153, 0.18)",
                      border: "rgba(52, 211, 153, 0.4)"
                    }
                  ].map((feat, fIdx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div key={fIdx} className="case-milestone-glass" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.55rem 0.85rem",
                        borderRadius: "12px"
                      }}>
                        <div style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          background: feat.bg,
                          border: `1px solid ${feat.border}`,
                          boxShadow: `0 0 12px ${feat.bg}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <FeatIcon size={15} color={feat.accent} />
                        </div>
                        <div>
                          <div style={{ fontWeight: "750", color: "#FFFFFF", fontSize: "0.86rem", lineHeight: "1.25" }}>
                            {feat.title}
                          </div>
                          <div style={{ fontSize: "0.76rem", color: "#94A3B8", marginTop: "0.1rem" }}>
                            {feat.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Compact Glass CTA Link Button */}
                <Link
                  href="/case-studies/oem-appliances-marketplace-scale"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    padding: "0.75rem 1.6rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(29, 78, 216, 0.95) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(147, 197, 253, 0.55)",
                    borderTop: "1.5px solid rgba(255, 255, 255, 0.75)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 12px 28px -4px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)",
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(37, 99, 235, 1) 0%, rgba(29, 78, 216, 1) 100%)";
                    e.currentTarget.style.borderColor = "#BAE6FD";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 16px 32px -4px rgba(37, 99, 235, 0.65), 0 0 28px rgba(56, 189, 248, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(29, 78, 216, 0.95) 100%)";
                    e.currentTarget.style.borderColor = "rgba(147, 197, 253, 0.55)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 12px 28px -4px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)";
                  }}
                >
                  <span>Read Detailed Case Study & Unit Economics</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* 4 Frosted Specular Glass Metric Tiles (Compact & Sharp) */}
              <div className="case-metrics-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.85rem"
              }}>
                {[
                  {
                    val: "₹18 Cr",
                    label: "Annualized Run Rate",
                    sub: "Scaled within 9 months",
                    color: "#38BDF8",
                    glow: "rgba(56, 189, 248, 0.28)",
                    icon: TrendingUp,
                    badge: "+480% YoY",
                    barWidth: "96%",
                    barGrad: "linear-gradient(90deg, #38BDF8, #818CF8)"
                  },
                  {
                    val: "18.2%",
                    label: "Net Operating Margin",
                    sub: "After all ad & platform fees",
                    color: "#34D399",
                    glow: "rgba(52, 211, 153, 0.28)",
                    icon: Percent,
                    badge: "Direct Margin",
                    barWidth: "86%",
                    barGrad: "linear-gradient(90deg, #34D399, #10B981)"
                  },
                  {
                    val: "< 0.1%",
                    label: "Late Dispatch SLA",
                    sub: "Dual-carrier automation",
                    color: "#FBBF24",
                    glow: "rgba(251, 191, 36, 0.28)",
                    icon: Clock,
                    badge: "99.9% SLA",
                    barWidth: "99%",
                    barGrad: "linear-gradient(90deg, #FBBF24, #F59E0B)"
                  },
                  {
                    val: "92%",
                    label: "Next-Day Prime Coverage",
                    sub: "Tier-1 & Tier-2 PIN codes",
                    color: "#F472B6",
                    glow: "rgba(244, 114, 182, 0.28)",
                    icon: Truck,
                    badge: "6 Warehouses",
                    barWidth: "92%",
                    barGrad: "linear-gradient(90deg, #F472B6, #EC4899)"
                  }
                ].map((item, mIdx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={mIdx}
                      className="case-metric-tile"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        padding: "1rem 1.15rem",
                        borderRadius: "16px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.borderColor = "rgba(147, 197, 253, 0.55)";
                        e.currentTarget.style.boxShadow = `inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 16px 36px -8px ${item.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                        e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 12px 28px -8px rgba(0, 0, 0, 0.4)";
                      }}
                    >
                      {/* Ambient Tile Glow */}
                      <div style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: item.glow,
                        filter: "blur(25px)",
                        pointerEvents: "none"
                      }} />

                      {/* Header with Icon and Pill Badge */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "rgba(255, 255, 255, 0.08)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderTop: "1px solid rgba(255, 255, 255, 0.45)",
                          boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 4px 12px -2px ${item.glow}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: item.color
                        }}>
                          <IconComp size={18} />
                        </div>
                        <span style={{
                          fontSize: "0.7rem",
                          fontWeight: "800",
                          color: item.color,
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.14)",
                          padding: "0.22rem 0.55rem",
                          borderRadius: "9999px",
                          letterSpacing: "0.3px"
                        }}>
                          {item.badge}
                        </span>
                      </div>

                      {/* Compact Luminous Value */}
                      <div style={{
                        fontSize: "clamp(1.6rem, 2.2vw, 2.1rem)",
                        fontWeight: "900",
                        color: item.color,
                        lineHeight: "1.1",
                        marginBottom: "0.25rem",
                        textShadow: `0 0 20px ${item.glow}`,
                        letterSpacing: "-0.02em"
                      }}>
                        {item.val}
                      </div>

                      {/* Label & Subtitle */}
                      <div style={{ fontSize: "0.84rem", fontWeight: "800", color: "#FFFFFF", marginBottom: "0.15rem" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#94A3B8", marginBottom: "0.65rem" }}>
                        {item.sub}
                      </div>

                      {/* Sleek SLA Glowing Progress Bar Indicator */}
                      <div style={{
                        width: "100%",
                        height: "4px",
                        borderRadius: "9999px",
                        background: "rgba(255, 255, 255, 0.08)",
                        overflow: "hidden",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                      }}>
                        <div style={{
                          width: item.barWidth,
                          height: "100%",
                          borderRadius: "9999px",
                          background: item.barGrad,
                          boxShadow: `0 0 8px ${item.color}`
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 07. FAQ ACCORDION ── */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(255, 255, 255, 0.6)", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.825rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 0 0" }}>
              Everything You Need to Know About Launching Online
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    boxShadow: isOpen ? "0 8px 24px -4px rgba(15, 23, 42, 0.06)" : "none"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.4rem 1.6rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: isOpen ? "#2563EB" : "#0B1736"
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={22} color="#2563EB" /> : <ChevronDown size={22} color="#64748B" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.6rem 1.5rem 1.6rem", color: "#475569", fontSize: "1rem", lineHeight: "1.65" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 08. PRE-FOOTER CTA BANNER ── */}
      <section style={{ padding: "clamp(3rem, 6vw, 5.5rem) 1.5rem" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.98) 75%), #0B1736",
            borderRadius: "28px",
            padding: "clamp(2.5rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            boxShadow: "0 25px 60px -15px rgba(11, 23, 54, 0.5), 0 0 45px rgba(37, 99, 235, 0.15)",
            position: "relative",
            overflow: "hidden"
          }}>
            <h2 style={{
              fontSize: "clamp(2rem, 3.8vw, 2.9rem)",
              fontWeight: "900",
              marginBottom: "1.2rem",
              color: "#FFFFFF",
              letterSpacing: "-0.02em"
            }}>
              Ready to Launch Your <span style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Direct Channel</span>?
            </h2>
            <p style={{
              color: "#E2E8F0",
              fontSize: "1.1rem",
              maxWidth: "640px",
              margin: "0 auto 2.5rem auto",
              lineHeight: "1.65"
            }}>
              Book a complimentary 30-minute launch diagnostic with our senior marketplace architects to audit category opportunity, MAP price guardrails, and margin targets.
            </p>
            <div className="prefooter-btn-group" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={() => setDiagOpen(true)}
                className="btn-gradient-blue"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.4rem",
                  borderRadius: "14px",
                  fontSize: "1.05rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 10px 28px -4px rgba(37, 99, 235, 0.5)"
                }}
              >
                <span>Request Free Launch Diagnostic</span>
                <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2.2rem",
                  borderRadius: "14px",
                  fontSize: "1.05rem",
                  fontWeight: "700",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  textDecoration: "none",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Speak with a Director
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer hideTopBanner={true} />

      {/* MODAL */}
      <CommerceDiagnosticModal isOpen={diagOpen} onClose={() => setDiagOpen(false)} />
    </div>
  );
}
