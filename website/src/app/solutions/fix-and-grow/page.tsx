"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  DollarSign, 
  Scale, 
  RefreshCcw, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BarChart3, 
  Sparkles,
  Zap,
  PackageX,
  FileCheck2,
  Check,
  Percent,
  Activity,
  ShieldCheck,
  Layers,
  Search,
  SlidersHorizontal,
  Flame,
  Award,
  AlertCircle,
  Building2,
  Boxes,
  XCircle
} from "lucide-react";

// ── DETERMINISTIC NUMBER FORMATTER (Prevents SSR / Client Hydration Mismatches) ──
const fmtNumber = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ── ANIMATED COUNTER COMPONENT ──
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
      const prefix = target.startsWith("₹") ? "₹" : target.startsWith("+") ? "+" : target.startsWith("-") ? "-" : "";
      const hasCr = target.includes("Cr");
      const hasPlus = target.includes("+") && !target.startsWith("+");
      const hasPct = target.includes("%");
      const hasHrs = target.includes("Hrs");
      const hasDays = target.includes("Days");
      const targetVal = parseFloat(target.replace(/[^0-9.]/g, ""));
      if (isNaN(targetVal)) {
        setValue(target);
        return;
      }
      const duration = 1400;
      const startTime = performance.now();
      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = hasPct ? (ease * targetVal).toFixed(1) : fmtNumber(Math.floor(ease * targetVal));
        setValue(prefix + current + (hasCr ? " Cr" : "") + (hasPlus ? "+" : "") + (hasPct ? "%" : "") + (hasHrs ? " Hrs" : "") + (hasDays ? " Days" : ""));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      }
      requestAnimationFrame(tick);
    }
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} suppressHydrationWarning>{value}</span>;
};

export default function FixAndGrowPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  // Industry Categories for Hero Triage Simulator
  const categories = [
    { name: "Heavy & Bulky Appliances", avgLeak: 0.052, weightPenalty: 0.024, returnFraud: 0.018, adBleed: 0.010 },
    { name: "Electronics & Tech", avgLeak: 0.047, weightPenalty: 0.015, returnFraud: 0.021, adBleed: 0.011 },
    { name: "Fashion & Apparel", avgLeak: 0.068, weightPenalty: 0.012, returnFraud: 0.038, adBleed: 0.018 },
    { name: "Beauty & Personal Care", avgLeak: 0.039, weightPenalty: 0.009, returnFraud: 0.016, adBleed: 0.014 }
  ];

  // Live Simulated GMV Leakage Calculator in Hero
  const [monthlyGmvLakhs, setMonthlyGmvLakhs] = useState<number>(60); // ₹60 Lakhs default
  const curCat = categories[selectedCategory];
  const monthlyGmvNum = monthlyGmvLakhs * 100000;
  const recoveredMonthly = Math.round(monthlyGmvNum * curCat.avgLeak);
  const weightSaved = Math.round(monthlyGmvNum * curCat.weightPenalty);
  const returnClaims = Math.round(monthlyGmvNum * curCat.returnFraud);
  const adSaved = Math.round(monthlyGmvNum * curCat.adBleed);
  const fmt = (n: number) => "₹" + fmtNumber(n);

  // 4 Margin Leakage Points (Surgical Triage)
  const marginLeaks = [
    {
      id: "volumetric",
      title: "Volumetric Weight Penalties",
      pct: "3.2%",
      tag: "Freight Overcharges",
      icon: Scale,
      color: "#DC2626",
      status: "CRITICAL BLEED",
      problem: "Automated sorting hubs routinely re-measure packaging dimensions higher than physical reality, bumping 500g items into 1kg+ courier freight slabs without seller alerts.",
      leakage: "3.2% of GMV lost in unchecked courier weight debits without automatic EDI verification manifests.",
      remedy: "GoodLife warehouse dock scan validation matched against courier EDI billing files with automated sub-24h dispute filing recovering 94% of overcharges.",
      auditLedger: "Batch weight manifest reconciliation cross-checked against laser barcode dimensions on every dispatch."
    },
    {
      id: "returns",
      title: "Uncredited Customer Returns",
      pct: "4.5%",
      tag: "Return Shrinkage & Fraud",
      icon: RefreshCcw,
      color: "#EA580C",
      status: "ACTIVE DRAIN",
      problem: "Up to 15% of customer return parcels never physically reach the seller dock, or arrive switched with counterfeit or used goods past the 7-day claim window.",
      leakage: "4.5% of GMV absorbed as uncompensated inventory write-offs without forensic unboxing proof.",
      remedy: "Sub-24h forensic unboxing camera logging at dock station with automated dispute filing directly via SAFE-T reimbursement ledgers.",
      auditLedger: "Barcoded serial verification and automated claims filing returning direct bank reimbursements."
    },
    {
      id: "adspend",
      title: "Ad Spend Bleed on Depleted Stock",
      pct: "5.8%",
      tag: "Marketing Misalignment",
      icon: Target,
      color: "#D97706",
      status: "CAPITAL WASTE",
      problem: "PPC bids run at full throttle on fast-depleting SKUs without live warehouse buffer sync, burning ad dollars right before stockout and crashing organic ranking.",
      leakage: "5.8% of GMV burned on non-converting clicks, followed by weeks of expensive organic ranking recovery costs.",
      remedy: "Automated API inventory-triggered ad throttling that pauses bids when local buffer drops below 7 days, redirecting spend to high-margin depth.",
      auditLedger: "Bid throttle API synced directly with warehouse inventory buffers every 15 minutes."
    },
    {
      id: "buybox",
      title: "Buybox Delivery Suppression",
      pct: "6.4%",
      tag: "Single Hub Bottleneck",
      icon: PackageX,
      color: "#7C3AED",
      status: "LOST VOLUME",
      problem: "Shipping from a single central warehouse generates 5–7 day delivery promises for non-metro buyers, handing the Buybox to regional competitors with same-day badges.",
      leakage: "6.4% of potential GMV forfeited to local sellers winning the Buybox with faster regional delivery badges.",
      remedy: "Multi-node inventory distribution across 12 regional fulfillment centers providing sub-24h Prime delivery badges nationwide.",
      auditLedger: "Algorithmic multi-state stock placement reducing customer transit distance by 64%."
    }
  ];

  // 30-Day Protocol Stages
  const protocolStages = [
    {
      step: "01",
      title: "Forensic Audit & Stop-the-Bleed",
      timeline: "Days 1 – 10",
      focus: "Direct Cash Recovery",
      desc: "Full forensic reconciliation of past 12-month platform debits, courier weights, return claims, and bleeding PPC keywords.",
      deliverables: [
        "Historical dispute filing for uncredited returns and overcharged courier weights",
        "Negative keyword gating to eliminate non-converting ad search queries",
        "Listing hygiene audit: suppressing shadow hijackers and fixing broken variations"
      ]
    },
    {
      step: "02",
      title: "Zonal Inventory Restructure",
      timeline: "Days 11 – 20",
      focus: "SLA & Buybox Win Rate",
      desc: "Deploying safety inventory into regional fulfillment nodes to slash customer delivery times from 5 days to under 24 hours.",
      deliverables: [
        "APOB registration & split-inventory placement in West, South, and North nodes",
        "Algorithmic dynamic pricing floors to defend the Buybox without price erosion",
        "Packaging redesign recommendation for high-RTO items to pass drop-tests"
      ]
    },
    {
      step: "03",
      title: "Profitable Flywheel Acceleration",
      timeline: "Days 21 – 30",
      focus: "EBITDA Scale",
      desc: "Re-activating disciplined performance marketing with strict contribution margin targets and automated daily reconciliation.",
      deliverables: [
        "Sponsored Brand and Video ad launch targeting high-converting search intent",
        "Automated daily reconciliation engine live for sub-48h return claims",
        "Real-time executive unit-economics dashboard tracking net bank realization"
      ]
    }
  ];

  // Comparisons
  const comparisons = [
    {
      metric: "Customer Return Claims",
      before: "Manual, irregular checks; claims missed past 7-day platform window",
      after: "Automated HD unboxing with sub-48h SAFE-T reimbursement filing",
      impact: "Recovered 92% of switch-out losses",
      tag: "Direct Cash Credit"
    },
    {
      metric: "Courier Weight Disputes",
      before: "Carrier invoices paid without dimensional verification",
      after: "Automated warehouse scan reconciliation against billing debits",
      impact: "Saved 2.8% to 3.4% of freight GMV",
      tag: "Freight Margin"
    },
    {
      metric: "Delivery Speed & Buybox",
      before: "Single warehouse: 4-6 day transit times; Buybox win rate under 55%",
      after: "Multi-node 12-hub network: Next-Day Prime badges; 88%+ Buybox win rate",
      impact: "+35% organic order volume",
      tag: "Marketplace Share"
    },
    {
      metric: "Ad Spend Efficiency (ACOS)",
      before: "Broad targeting burning 35%+ ACOS with zero stockout alignment",
      after: "Inventory-throttled PPC with negative keyword gating under 18% ACOS",
      impact: "Doubled ad contribution profit",
      tag: "Contribution Profit"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "How quickly can we see margin improvements?",
      a: "Immediate savings begin within the first 10 days by stopping unverified weight overcharges and pausing bleeding PPC campaigns. Significant gross-to-net margin turnaround typically materializes within 30 to 45 days."
    },
    {
      q: "Can you recover past marketplace deductions retroactively?",
      a: "Yes. In our initial 10-day forensic audit, we inspect past 90-to-180 day carrier debit notes, missing return inwardings, and unclaimed customer dispute windows to recover capital directly back to your bank account."
    },
    {
      q: "What if our account has listing suppressions or policy warnings?",
      a: "Our compliance specialists work directly with Amazon and Flipkart seller governance teams to resolve policy flags, ungating hurdles, and intellectual property disputes before executing growth strategies."
    },
    {
      q: "How does GoodLife charge for the Fix & Grow program?",
      a: "We operate with aligned incentives. Our turnaround program combines a modest upfront operational audit with a performance share on net margin recoveries and profitable incremental GMV."
    }
  ];

  return (
    <div className="fix-and-grow-root" style={{
      background: "radial-gradient(130% 90% at 50% 0%, #F0F7FF 0%, #F8FAFC 45%, #EFF6FF 80%, #E0F2FE 100%)",
      color: "#0F172A",
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden"
    }}>

      {/* ── AMBIENT FLOATING AURORA GLOWS (Matching Website Palette) ── */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "-80px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)",
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
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)",
        filter: "blur(95px)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "auroraPulse 22s ease-in-out infinite alternate-reverse"
      }} />

      {/* ── GLOBAL STYLES & PROFESSIONAL TYPOGRAPHY (Plus Jakarta Sans) ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');

        .fix-and-grow-root,
        .fix-and-grow-root * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        @keyframes auroraPulse {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 30px) scale(1.1); }
          100% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes floatHUD {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseDotBlue {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes radarPing {
          0% { transform: scale(1); opacity: 0.9; }
          70%, 100% { transform: scale(2.4); opacity: 0; }
        }

        /* Clean Luxury White Glass Styling */
        .luxury-glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 12px 36px -8px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .luxury-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -12px rgba(37, 99, 235, 0.12), 0 6px 16px -4px rgba(15, 23, 42, 0.04);
          border-color: rgba(147, 197, 253, 0.8);
        }

        /* Brand Blue Gradient Button (Same as All Pages) */
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

        /* Subtle Glass Button */
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

        /* Telemetry Cards */
        .telemetry-tile {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.35rem 1.5rem;
          box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.05);
          transition: all 0.25s ease;
        }
        .telemetry-tile:hover {
          background: #FFFFFF;
          border-color: #93C5FD;
          transform: translateY(-3px);
          box-shadow: 0 14px 32px -8px rgba(37, 99, 235, 0.12);
        }

        /* Range Slider */
        .triage-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 9999px;
          background: #E2E8F0;
          outline: none;
          cursor: pointer;
        }
        .triage-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          border: 3px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: transform 0.15s ease;
        }
        .triage-slider::-webkit-slider-thumb:hover {
          transform: scale(1.18);
        }

        /* Responsive Mobile Layouts */
        @media (max-width: 768px) {
          .triage-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .triage-telemetry-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.85rem !important;
          }
          .surgery-station-grid {
            grid-template-columns: 1fr !important;
          }
          .gantt-stages-grid {
            grid-template-columns: 1fr !important;
          }
          .solution-hero-section {
            padding-top: 1.5rem !important;
            padding-bottom: 2rem !important;
          }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-cta-group button,
          .hero-cta-group a {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .triage-telemetry-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* ── 01. SURGICAL DIAGNOSTIC TRIAGE HERO (Clean Brand Colors + Distinct Triage UI) ── */}
      <section className="solution-hero-section" style={{
        position: "relative",
        paddingTop: "clamp(2rem, 3.5vw, 3.2rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 3.5rem)",
        zIndex: 1
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div className="triage-hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
                <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
                  <span style={{
                    animation: "radarPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "#2563EB"
                  }} />
                  <span style={{
                    position: "relative",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#2563EB",
                    boxShadow: "0 0 10px #2563EB"
                  }} />
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#2563EB", letterSpacing: "0.5px" }}>
                  FORENSIC TRIAGE & MARGIN RECOVERY
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
                Plug Hidden Leaks. <br />
                Restore <span style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Double-Digit</span> Net Margins.
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: "clamp(0.95rem, 1.25vw, 1.05rem)",
                lineHeight: "1.6",
                color: "#475569",
                marginBottom: "1.35rem",
                maxWidth: "580px"
              }}>
                Is your marketplace revenue growing while your bank settlements shrink? We forensic-audit carrier volumetric weight overcharges, uncredited return switches, ad spend bleed, and Buybox delivery drops to recover capital directly back to your bank account.
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "1.5rem" }}>
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
                  <Activity size={18} />
                  <span>Start Free Account Triage</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#margin-leaks"
                  className="btn-glass-subtle"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.9rem 1.6rem",
                    borderRadius: "14px",
                    fontSize: "0.94rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  <span>Explore 4 Margin Leaks</span>
                  <ChevronDown size={16} />
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#334155" }}>
                  <CheckCircle2 size={17} color="#16A34A" />
                  <span>Avg 4.7% GMV Recovered</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#334155" }}>
                  <CheckCircle2 size={17} color="#16A34A" />
                  <span>Sub-48h SAFE-T Claims</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.84rem", fontWeight: "700", color: "#334155" }}>
                  <CheckCircle2 size={17} color="#16A34A" />
                  <span>Zero Upfront Retainer</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Live Interactive Triage & Margin Recovery Console (White Luxury Glass) */}
            <div style={{ position: "relative" }}>
              
              {/* Floating Pill Top Left */}
              <div style={{
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
                animation: "floatHUD 5s ease-in-out infinite"
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#38BDF8", boxShadow: "0 0 8px #38BDF8" }} />
                <span style={{ fontSize: "0.76rem", fontWeight: "800", letterSpacing: "0.5px" }}>TRIAGE ENGINE LIVE</span>
              </div>

              {/* Main Visual Glass Card */}
              <div className="luxury-glass-card" style={{ padding: "clamp(1.3rem, 2.4vw, 1.85rem)", position: "relative" }}>
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#2563EB", textTransform: "uppercase", letterSpacing: "1px" }}>
                      REAL-TIME MARGIN AUDIT SIMULATOR
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0B1736", margin: "0.15rem 0 0 0" }}>
                      Instant Capital Bleed Scanner
                    </h3>
                  </div>
                  <div style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "8px",
                    background: "#FEF2F2",
                    color: "#DC2626",
                    fontSize: "0.75rem",
                    fontWeight: "800"
                  }}>
                    -{(curCat.avgLeak * 100).toFixed(1)}% AVG LOSS
                  </div>
                </div>

                {/* Category Selector Tabs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.4rem", marginBottom: "0.85rem" }}>
                  {categories.map((cat, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedCategory(cIdx)}
                      style={{
                        padding: "0.45rem 0.65rem",
                        borderRadius: "9px",
                        background: selectedCategory === cIdx ? "rgba(37, 99, 235, 0.1)" : "#F8FAFC",
                        border: selectedCategory === cIdx ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                        color: selectedCategory === cIdx ? "#2563EB" : "#64748B",
                        fontSize: "0.74rem",
                        fontWeight: "750",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Slider Input Box */}
                <div style={{
                  background: "#F8FAFC",
                  borderRadius: "12px",
                  padding: "0.8rem 1rem",
                  border: "1px solid #E2E8F0",
                  marginBottom: "0.85rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#475569" }}>Your Monthly Marketplace GMV:</span>
                    <strong style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0B1736" }}>₹{monthlyGmvLakhs} Lakhs</strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={5}
                    value={monthlyGmvLakhs}
                    onChange={(e) => setMonthlyGmvLakhs(Number(e.target.value))}
                    className="triage-slider"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.35rem" }}>
                    <span>₹10 Lakhs</span>
                    <span>₹1 Crore</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                {/* Dual Mode Switcher: Bleeding vs Recovered */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: "#F1F5F9",
                  borderRadius: "11px",
                  padding: "0.22rem",
                  marginBottom: "0.85rem",
                  border: "1px solid #E2E8F0"
                }}>
                  <button
                    onClick={() => setShieldActive(false)}
                    style={{
                      padding: "0.45rem 0.5rem",
                      borderRadius: "9px",
                      background: !shieldActive ? "#FEE2E2" : "transparent",
                      border: !shieldActive ? "1px solid #FCA5A5" : "none",
                      color: !shieldActive ? "#DC2626" : "#64748B",
                      fontSize: "0.76rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <AlertCircle size={13} color={!shieldActive ? "#DC2626" : "#64748B"} />
                    <span>Unprotected Bleed</span>
                  </button>
                  <button
                    onClick={() => setShieldActive(true)}
                    style={{
                      padding: "0.45rem 0.5rem",
                      borderRadius: "9px",
                      background: shieldActive ? "#ECFDF5" : "transparent",
                      border: shieldActive ? "1px solid #6EE7B7" : "none",
                      color: shieldActive ? "#059669" : "#64748B",
                      fontSize: "0.76rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <ShieldCheck size={13} color={shieldActive ? "#059669" : "#64748B"} />
                    <span>With GoodLife Shield</span>
                  </button>
                </div>

                {/* Primary Realization Display Box (Deep Navy matching website) */}
                <div style={{
                  background: "linear-gradient(135deg, #0B1736 0%, #172554 100%)",
                  borderRadius: "14px",
                  padding: "0.95rem 1.25rem",
                  color: "#FFFFFF",
                  marginBottom: "0.85rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#93C5FD", fontWeight: "750", textTransform: "uppercase" }}>
                        {shieldActive ? "Monthly Cash Recovered To Bank" : "Current Capital Draining / Month"}
                      </div>
                      <div style={{
                        fontSize: "clamp(1.5rem, 2.3vw, 1.85rem)",
                        fontWeight: "900",
                        color: shieldActive ? "#34D399" : "#F87171",
                        marginTop: "0.15rem"
                      }}>
                        {fmt(recoveredMonthly)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.7rem", color: "#93C5FD", fontWeight: "750", textTransform: "uppercase" }}>
                        12-Month Impact
                      </div>
                      <div style={{ fontSize: "1.15rem", fontWeight: "900", color: "#FFFFFF", marginTop: "0.15rem" }}>
                        {fmt(recoveredMonthly * 12)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Granular Breakdown 3-Tile Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem", marginBottom: "0.85rem" }}>
                  <div style={{ background: "#F8FAFC", padding: "0.6rem 0.5rem", borderRadius: "10px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                    <div style={{ fontSize: "0.66rem", color: "#64748B", fontWeight: "700" }}>Weight Disputes</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "800", color: "#0B1736", marginTop: "0.1rem" }}>{fmt(weightSaved)}</div>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "0.6rem 0.5rem", borderRadius: "10px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                    <div style={{ fontSize: "0.66rem", color: "#64748B", fontWeight: "700" }}>Return Claims</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "800", color: "#0B1736", marginTop: "0.1rem" }}>{fmt(returnClaims)}</div>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "0.6rem 0.5rem", borderRadius: "10px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                    <div style={{ fontSize: "0.66rem", color: "#64748B", fontWeight: "700" }}>Ad Waste Plug</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "800", color: "#0B1736", marginTop: "0.1rem" }}>{fmt(adSaved)}</div>
                  </div>
                </div>

                {/* Console Action Button */}
                <button
                  onClick={() => setDiagOpen(true)}
                  className="btn-gradient-blue"
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.2rem",
                    borderRadius: "12px",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem"
                  }}
                >
                  <span>Request Full Account Triage Diagnostic</span>
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 02. TELEMETRY MISSION CONTROL HUD STRIP ── */}
      <section style={{ padding: "0 1.5rem 4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div className="triage-telemetry-row" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1.15rem"
          }}>
            {[
              { val: "4.7%", label: "Average GMV Recovered", sub: "Net bank realization payout", icon: DollarSign, color: "#16A34A", bg: "#F0FDF4" },
              { val: "48 Hrs", label: "SAFE-T Claim SLA Window", sub: "Sub-48h automated unboxing proof", icon: Clock, color: "#2563EB", bg: "#EFF6FF" },
              { val: "100%", label: "EDI Weight Verification", sub: "Laser dimensional dock scans", icon: FileCheck2, color: "#D97706", bg: "#FFFBEB" },
              { val: "+35%", label: "Buybox Win Rate Recovery", sub: "12 regional fulfillment hubs", icon: TrendingUp, color: "#9333EA", bg: "#FAF5FF" }
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="telemetry-tile" style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: st.bg,
                    color: st.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.7rem", fontWeight: "900", color: "#0B1736", lineHeight: "1.1" }}>
                      <AnimatedCounter target={st.val} />
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#334155", fontWeight: "750", marginTop: "0.2rem" }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.1rem" }}>
                      {st.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 03. INTERACTIVE 4-WAY MARGIN LEAK SURGERY STATION ── */}
      <section id="margin-leaks" style={{
        padding: "clamp(3.5rem, 6vw, 5.5rem) 1.5rem",
        background: "rgba(255, 255, 255, 0.6)",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
        position: "relative"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              FORENSIC ROOT CAUSE AUTOPSY
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              The 4 Places Marketplace Accounts Bleed
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.65" }}>
              Click each leakage category to view the exact algorithmic failure, the financial drain, and how GoodLife surgical automation recovers the lost capital.
            </p>
          </div>

          {/* Dual-Sided Surgical Inspection Console */}
          <div className="surgery-station-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1.4fr",
            gap: "1.5rem",
            alignItems: "stretch"
          }}>
            
            {/* Left Column: 4 Leak Selector Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {marginLeaks.map((leak, idx) => {
                const isSelected = selectedLeak === idx;
                const Icon = leak.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLeak(idx)}
                    style={{
                      background: isSelected ? "linear-gradient(135deg, #0B1736 0%, #1E293B 100%)" : "rgba(255, 255, 255, 0.85)",
                      border: isSelected ? "1.5px solid #0B1736" : "1px solid #E2E8F0",
                      borderRadius: "16px",
                      padding: "1.2rem 1.4rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? "0 10px 30px -6px rgba(11, 23, 54, 0.3)" : "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: isSelected ? "rgba(255, 255, 255, 0.15)" : "#FEF2F2",
                        color: isSelected ? "#FCA5A5" : leak.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: "1.05rem", fontWeight: "800", color: isSelected ? "#FFFFFF" : "#0B1736" }}>
                          {leak.title}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: isSelected ? "#CBD5E1" : "#64748B", marginTop: "0.15rem" }}>
                          {leak.tag}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: "right" }}>
                      <span style={{
                        fontSize: "0.85rem",
                        fontWeight: "900",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "8px",
                        background: isSelected ? "rgba(220, 38, 38, 0.3)" : "#FEF2F2",
                        border: isSelected ? "1px solid rgba(248, 113, 113, 0.4)" : "1px solid #FECACA",
                        color: isSelected ? "#FCA5A5" : "#DC2626"
                      }}>
                        -{leak.pct} GMV
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detailed Surgical Intervention Display */}
            <div className="luxury-glass-card" style={{ padding: "clamp(1.75rem, 3.5vw, 2.5rem)", display: "flex", flexDirection: "column" }}>
              
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "9999px",
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontSize: "0.75rem",
                    fontWeight: "800",
                    marginBottom: "0.5rem"
                  }}>
                    {marginLeaks[selectedLeak].tag}
                  </span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0B1736", margin: 0 }}>
                    {marginLeaks[selectedLeak].title}
                  </h3>
                </div>

                <div style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "12px",
                  padding: "0.6rem 1rem",
                  textAlign: "right"
                }}>
                  <div style={{ fontSize: "0.68rem", color: "#991B1B", fontWeight: "800", textTransform: "uppercase" }}>Capital Drain</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "900", color: "#DC2626" }}>
                    -{marginLeaks[selectedLeak].pct} GMV
                  </div>
                </div>
              </div>

              {/* The Anatomy of the Leak */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
                {/* 1. Operational Drain */}
                <div style={{
                  background: "#FFF5F5",
                  border: "1px solid #FED7D7",
                  borderRadius: "14px",
                  padding: "1.2rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#C53030", fontWeight: "800", marginBottom: "0.45rem", fontSize: "0.92rem" }}>
                    <AlertTriangle size={17} />
                    <span>The Unchecked Operational Blind Spot</span>
                  </div>
                  <p style={{ color: "#4A5568", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                    {marginLeaks[selectedLeak].problem}
                  </p>
                </div>

                {/* 2. GoodLife Automated Surgical Fix */}
                <div style={{
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "14px",
                  padding: "1.2rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#16A34A", fontWeight: "800", marginBottom: "0.45rem", fontSize: "0.92rem" }}>
                    <ShieldCheck size={18} />
                    <span>The GoodLife Algorithmic Solution</span>
                  </div>
                  <p style={{ color: "#374151", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                    {marginLeaks[selectedLeak].remedy}
                  </p>
                </div>
              </div>

              {/* Audit Ledger Protocol Note */}
              <div style={{
                marginTop: "auto",
                borderTop: "1px solid #E2E8F0",
                paddingTop: "1.2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
                  <strong style={{ color: "#2563EB" }}>Reconciliation Engine:</strong> {marginLeaks[selectedLeak].auditLedger}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 04. 30-DAY DISCIPLINED RECOVERY SPRINT (HORIZONTAL GANTT TIMELINE) ── */}
      <section style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              DISCIPLINED SPRINT EXECUTION
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              The 30-Day Turnaround Protocol
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>
              A structured, SLA-backed sprint designed to immediately plug financial leaks in Week 1 and restore growth by Month 2.
            </p>
          </div>

          {/* 3 Interactive Timeline Cards */}
          <div className="gantt-stages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem"
          }}>
            {protocolStages.map((st, i) => (
              <div
                key={i}
                className="luxury-glass-card"
                style={{
                  padding: "1.85rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                {/* Timeline and Stage Counter */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{
                    padding: "0.35rem 0.8rem",
                    borderRadius: "8px",
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    color: "#2563EB",
                    fontSize: "0.8rem",
                    fontWeight: "800"
                  }}>
                    {st.timeline}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: "900", color: "#94A3B8" }}>
                    STAGE {st.step}
                  </span>
                </div>

                <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.35rem" }}>
                  Focus: {st.focus}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#0B1736", marginBottom: "0.75rem" }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: "1.65", marginBottom: "1.5rem" }}>
                  {st.desc}
                </p>

                {/* Stage Deliverables */}
                <div style={{ marginTop: "auto", borderTop: "1px solid #E2E8F0", paddingTop: "1.25rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#0B1736", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>
                    Milestone Deliverables:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {st.deliverables.map((del, dIdx) => (
                      <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.86rem", color: "#475569" }}>
                        <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 05. BEFORE VS AFTER COMPARISON TABLE ── */}
      <section style={{
        padding: "clamp(3.5rem, 6vw, 5.5rem) 1.5rem",
        background: "rgba(255, 255, 255, 0.7)",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
        position: "relative"
      }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              MEASURABLE TRANSFORMATION
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 1rem 0" }}>
              Status Quo vs. GoodLife Protocol
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>
              See how everyday operational blind spots transform into automated, defensible profit realization.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            {comparisons.map((c, i) => (
              <div key={i} className="luxury-glass-card" style={{ padding: "1.5rem 1.85rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.15rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0B1736", margin: 0 }}>
                    {c.metric}
                  </h3>
                  <span style={{
                    padding: "0.3rem 0.85rem",
                    borderRadius: "9999px",
                    background: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    color: "#059669",
                    fontSize: "0.825rem",
                    fontWeight: "800"
                  }}>
                    {c.impact}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                  <div style={{
                    background: "#FFF5F5",
                    padding: "1rem 1.25rem",
                    borderRadius: "12px",
                    border: "1px solid #FED7D7"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.725rem", fontWeight: "800", color: "#DC2626", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                      <XCircle size={13} color="#DC2626" />
                      <span>Traditional Status Quo</span>
                    </div>
                    <div style={{ fontSize: "0.92rem", color: "#4A5568", lineHeight: "1.55" }}>
                      {c.before}
                    </div>
                  </div>

                  <div style={{
                    background: "#F0FDF4",
                    padding: "1rem 1.25rem",
                    borderRadius: "12px",
                    border: "1px solid #BBF7D0"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.725rem", fontWeight: "800", color: "#16A34A", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                      <CheckCircle2 size={13} color="#16A34A" />
                      <span>GoodLife Turnaround System</span>
                    </div>
                    <div style={{ fontSize: "0.92rem", color: "#1E3A8A", lineHeight: "1.55" }}>
                      {c.after}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 06. PROOF CASE STUDY HIGHLIGHT (COMPACT NAVY FROSTED GLASS) ── */}
      <section style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) 1.5rem", position: "relative", zIndex: 1 }}>
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
            {/* Ambient Refractive Orbs */}
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
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
              filter: "blur(70px)",
              pointerEvents: "none"
            }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(1.75rem, 3.5vw, 3rem)",
              alignItems: "center",
              position: "relative",
              zIndex: 1
            }}>
              <div>
                {/* Badge Row */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.2) 100%)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(125, 211, 252, 0.45)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.65)",
                    boxShadow: "0 0 16px rgba(56, 189, 248, 0.2)",
                    color: "#BAE6FD",
                    fontSize: "0.75rem",
                    fontWeight: "800",
                    letterSpacing: "0.5px"
                  }}>
                    <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
                      <span style={{
                        animation: "radarPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
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
                    VERIFIED TURNAROUND CASE STUDY
                  </span>
                  
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "9999px",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    color: "#F1F5F9",
                    fontSize: "0.75rem",
                    fontWeight: "700"
                  }}>
                    <Building2 size={13} color="#93C5FD" />
                    Heavy & Bulky Home Appliance Brand
                  </span>
                </div>

                {/* Main Heading */}
                <h3 style={{
                  fontSize: "clamp(1.45rem, 2.4vw, 1.95rem)",
                  fontWeight: "900",
                  lineHeight: "1.25",
                  marginBottom: "0.85rem",
                  color: "#FFFFFF",
                  letterSpacing: "-0.025em"
                }}>
                  From ₹-4.2L Monthly Loss to <span style={{
                    background: "linear-gradient(135deg, #34D399 0%, #10B981 50%, #6EE7B7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 16px rgba(52, 211, 153, 0.35))"
                  }}>+₹11.8L Net Profit</span> in 45 Days.
                </h3>

                {/* Insight Narrative Quote */}
                <div style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderLeft: "3px solid #34D399",
                  borderRadius: "0 14px 14px 0",
                  padding: "0.85rem 1.15rem",
                  marginBottom: "1.15rem"
                }}>
                  <p style={{ color: "#E2E8F0", fontSize: "0.92rem", lineHeight: "1.65", margin: 0, fontWeight: "500" }}>
                    A heavy domestic appliance manufacturer was losing 14% of gross sales to in-transit glass breakage and uncredited courier return fraud. GoodLife re-engineered courier drop-testing, deployed 4 regional fulfillment hubs, and automated sub-48h SAFE-T reimbursement claims.
                  </p>
                </div>

                {/* 3 Strategic Milestones */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem" }}>
                  {[
                    "Forensic unboxing dock camera footage capturing 100% of return parcels",
                    "Automated sub-48h SAFE-T platform reimbursement filing recovering ₹28.4L",
                    "Regional 4-hub stock split slashing courier touches and in-transit breakage"
                  ].map((feat, fIdx) => (
                    <div key={fIdx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.55rem 0.85rem",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "0.86rem",
                      color: "#E2E8F0"
                    }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid rgba(52, 211, 153, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <CheckCircle2 size={13} color="#34D399" />
                      </div>
                      <span style={{ fontWeight: "600" }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Link Button */}
                <Link
                  href="/case-studies/kitchen-chimney-transit-breakage-reduction"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    padding: "0.75rem 1.6rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(29, 78, 216, 0.95) 100%)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(147, 197, 253, 0.55)",
                    borderTop: "1.5px solid rgba(255, 255, 255, 0.75)",
                    boxShadow: "0 12px 28px -4px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)",
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 16px 32px -4px rgba(37, 99, 235, 0.65), 0 0 28px rgba(56, 189, 248, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 12px 28px -4px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)";
                  }}
                >
                  <span>Read Full Turnaround Story & SAFE-T Ledger</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* 4 Frosted Specular Glass Metric Tiles */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.85rem"
              }}>
                {[
                  { val: "-68%", label: "Damage & Breakage", sub: "Drop-test packaging chutes", color: "#34D399", badge: "Zero Shrink", barWidth: "68%", barGrad: "linear-gradient(90deg, #34D399, #10B981)" },
                  { val: "₹28.4L", label: "SAFE-T Reimbursed", sub: "Direct bank payouts credited", color: "#38BDF8", badge: "Direct Cash", barWidth: "94%", barGrad: "linear-gradient(90deg, #38BDF8, #818CF8)" },
                  { val: "14.8%", label: "Net Operating Margin", sub: "Turnaround from negative", color: "#FBBF24", badge: "EBITDA Positive", barWidth: "85%", barGrad: "linear-gradient(90deg, #FBBF24, #F59E0B)" },
                  { val: "45 Days", label: "To Cash Flow Positive", sub: "From initial forensic audit", color: "#F472B6", badge: "Rapid Sprint", barWidth: "90%", barGrad: "linear-gradient(90deg, #F472B6, #EC4899)" }
                ].map((item, mIdx) => (
                  <div
                    key={mIdx}
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.4)",
                      borderRadius: "16px",
                      padding: "1rem 1.15rem",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "rgba(147, 197, 253, 0.55)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                      <span style={{
                        fontSize: "0.7rem",
                        fontWeight: "800",
                        color: item.color,
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        padding: "0.22rem 0.55rem",
                        borderRadius: "9999px"
                      }}>
                        {item.badge}
                      </span>
                    </div>

                    <div style={{
                      fontSize: "clamp(1.6rem, 2.2vw, 2.1rem)",
                      fontWeight: "900",
                      color: item.color,
                      lineHeight: "1.1",
                      marginBottom: "0.25rem",
                      textShadow: `0 0 18px ${item.color}40`
                    }}>
                      {item.val}
                    </div>

                    <div style={{ fontSize: "0.84rem", fontWeight: "800", color: "#FFFFFF", marginBottom: "0.15rem" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "#94A3B8", marginBottom: "0.65rem" }}>
                      {item.sub}
                    </div>

                    <div style={{
                      width: "100%",
                      height: "4px",
                      borderRadius: "9999px",
                      background: "rgba(255, 255, 255, 0.08)",
                      overflow: "hidden"
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
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 07. FAQ ACCORDION ── */}
      <section style={{
        padding: "clamp(3.5rem, 6vw, 5rem) 1.5rem",
        background: "rgba(255, 255, 255, 0.6)",
        borderTop: "1px solid #E2E8F0"
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: "900", color: "#0B1736", margin: "0.5rem 0 0 0" }}>
              Common Questions About Margin Recovery
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: isOpen ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    boxShadow: isOpen ? "0 8px 24px -4px rgba(37, 99, 235, 0.08)" : "none"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "1.05rem",
                      fontWeight: "800",
                      color: isOpen ? "#2563EB" : "#0B1736"
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="#2563EB" /> : <ChevronDown size={20} color="#64748B" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.35rem 1.5rem", color: "#475569", fontSize: "0.95rem", lineHeight: "1.65" }}>
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
              marginBottom: "1rem",
              color: "#FFFFFF",
              letterSpacing: "-0.02em"
            }}>
              Stop Bleeding Margin. Audit Your Account Today.
            </h2>
            <p style={{
              color: "#E2E8F0",
              fontSize: "1.1rem",
              maxWidth: "640px",
              margin: "0 auto 2.5rem auto",
              lineHeight: "1.65"
            }}>
              Book a complimentary forensic audit with our financial reconciliation team to identify unclaimed SAFE-T windows, courier weight overcharges, and unverified return fraud.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
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
                  cursor: "pointer"
                }}
              >
                <span>Request Free Margin Audit</span>
                <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                className="btn-glass-subtle"
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
                  textDecoration: "none"
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
