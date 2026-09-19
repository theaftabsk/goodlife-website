"use client";

import React, { useState, useEffect, use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import Link from "next/link";

type SectionType =
  | "hero"
  | "metrics"
  | "features"
  | "about"
  | "services"
  | "gallery"
  | "team"
  | "testimonials"
  | "image_gallery"
  | "pricing"
  | "faq"
  | "cta"
  | "contact_map"
  | "blog"
  | "case_studies"
  | "how_it_works"
  | "awards"
  | "trust_badges"
  | "reviews"
  | "product_showcase"
  | "offers"
  | "countdown"
  | "video"
  | "social_proof"
  | "comparison"
  | "integrations"
  | "problem_solution"
  | "form"
  | "showcase";

interface SectionTypography {
  fontFamily?: string;
  headlineColor?: string;
  subtextColor?: string;
  fontSizeScale?: "compact" | "normal" | "large" | "hero";
  fontWeight?: "normal" | "semibold" | "bold" | "black";
}

interface PageSection {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  content: Record<string, any>;
  theme?: string;
  typography?: SectionTypography;
}

const HERO_THEMES = {
  glow: {
    id: "glow",
    name: "Soft Blue Glow",
    background: "radial-gradient(ellipse at top, #EFF6FF 0%, #FFFFFF 80%)",
    text: "#0F172A",
    subtext: "#475569",
    badgeBg: "#EFF6FF",
    badgeBorder: "#BFDBFE",
    badgeColor: "#1D4ED8",
    border: "#E2E8F0"
  },
  clean: {
    id: "clean",
    name: "Executive White",
    background: "#FFFFFF",
    text: "#0F172A",
    subtext: "#475569",
    badgeBg: "#F1F5F9",
    badgeBorder: "#CBD5E1",
    badgeColor: "#334155",
    border: "#E2E8F0"
  },
  dark: {
    id: "dark",
    name: "Midnight Slate",
    background: "#0F172A",
    text: "#FFFFFF",
    subtext: "#94A3B8",
    badgeBg: "rgba(56, 189, 248, 0.15)",
    badgeBorder: "rgba(56, 189, 248, 0.3)",
    badgeColor: "#38BDF8",
    border: "#1E293B"
  },
  royal: {
    id: "royal",
    name: "Royal Gradient",
    background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #1D4ED8 100%)",
    text: "#FFFFFF",
    subtext: "rgba(255, 255, 255, 0.9)",
    badgeBg: "rgba(255, 255, 255, 0.2)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
    badgeColor: "#FFFFFF",
    border: "#1E40AF"
  }
};

const METRICS_THEMES = {
  dark: {
    id: "dark",
    name: "Midnight Slate",
    background: "#0F172A",
    text: "#FFFFFF",
    subtext: "#94A3B8",
    cardBg: "rgba(255, 255, 255, 0.05)",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    accent: "#38BDF8"
  },
  blue: {
    id: "blue",
    name: "Good Life Royal",
    background: "#2563EB",
    text: "#FFFFFF",
    subtext: "rgba(255, 255, 255, 0.85)",
    cardBg: "rgba(255, 255, 255, 0.15)",
    cardBorder: "rgba(255, 255, 255, 0.25)",
    accent: "#FFFFFF"
  },
  light: {
    id: "light",
    name: "Subtle Off-White",
    background: "#F8FAFC",
    text: "#0F172A",
    subtext: "#64748B",
    cardBg: "#FFFFFF",
    cardBorder: "#E2E8F0",
    accent: "#2563EB"
  }
};

const CTA_THEMES = {
  gradient: {
    id: "gradient",
    name: "Royal Gradient",
    background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #1E40AF 100%)",
    text: "#FFFFFF",
    subtext: "rgba(255, 255, 255, 0.9)",
    btnBg: "#FFFFFF",
    btnColor: "#1D4ED8"
  },
  dark: {
    id: "dark",
    name: "Midnight Slate",
    background: "#0F172A",
    text: "#FFFFFF",
    subtext: "#94A3B8",
    btnBg: "#38BDF8",
    btnColor: "#0F172A"
  },
  minimal: {
    id: "minimal",
    name: "Minimalist Slate",
    background: "#F1F5F9",
    text: "#0F172A",
    subtext: "#64748B",
    btnBg: "#2563EB",
    btnColor: "#FFFFFF"
  }
};

interface LandingPageContent {
  hero?: {
    badge?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
  };
  features?: {
    title?: string;
    subtitle?: string;
    items?: Array<{ title: string; desc: string }>;
  };
  metrics?: {
    title?: string;
    stats?: Array<{ label: string; value: string; subtext: string }>;
  };
  cta?: {
    headline?: string;
    subtext?: string;
    buttonText?: string;
  };
  faq?: {
    title?: string;
    items?: Array<{ q: string; a: string }>;
  };
  form?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    campaignTag?: string;
  };
}

interface LandingPageConfig {
  title: string;
  slug: string;
  sections: string[];
  status: string;
  ctaText: string;
  content?: LandingPageContent;
  pageSections?: PageSection[];
}

const DEFAULT_LANDING_PAGES: Record<string, LandingPageConfig> = {
  "diwali-appliance-scale": {
    title: "Diwali Appliance Scale Surge 2026",
    slug: "diwali-appliance-scale",
    sections: ["Hero Banner", "Proof Metrics", "Features Grid", "FAQ Accordion", "Diagnostic Lead Form"],
    status: "Active",
    ctaText: "Claim Festival Allocation →",
    content: {
      hero: {
        badge: "FESTIVAL DEMAND SURGE 2026",
        headline: "Scale Festive Appliance Volume Across India's Top Marketplaces",
        subheadline: "Guaranteed warehouse capacity across 12 states, zero stockout SLAs, and daily algorithmic reconciliation during peak Diwali and Great Indian Festival sales.",
        ctaText: "Claim Festival Allocation →"
      },
      features: {
        title: "Enterprise Festive Capabilities",
        subtitle: "Built specifically for appliance and consumer durable brands preparing for massive festive spike.",
        items: [
          { title: "Zero Stockout SLA", desc: "Real-time stock rebalancing across 12 regional fulfillment hubs within 4 hours." },
          { title: "Flash Sale Readiness", desc: "Automated listing suppression prevention during lightning and flash sale events." },
          { title: "Daily Escrow Audit", desc: "Automated claim filing for damaged in transit, commission leaks, and delayed returns." }
        ]
      },
      metrics: {
        title: "Proven Festive Performance",
        stats: [
          { value: "4.8x", label: "Peak Sales Surge", subtext: "Average GMV increase during festive windows" },
          { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch compliance during peak volume" },
          { value: "₹450 Cr+", label: "GMV Handled", subtext: "Processed across Amazon, Flipkart & Quick-Commerce" }
        ]
      },
      cta: {
        headline: "Prepare Your Festive Fulfillment Today",
        subtext: "Reserve dedicated racking and regional fulfillment slots before the pre-festive cutoff.",
        buttonText: "Reserve Festival Slot"
      },
      faq: {
        title: "Festive Operational Questions",
        items: [
          { q: "How quickly can we allocate regional inventory before Diwali?", a: "Inventory inbound can be completed within 72 hours across all 12 regional hub locations." },
          { q: "What happens if return rates surge post-festival?", a: "Our dedicated QC triage teams inspect returned appliances within 24 hours to separate restockable units from transit claims." }
        ]
      },
      form: {
        title: "Request Festive Allocation Audit",
        subtitle: "Our marketplace directors will assess your inventory and SKU catalog within 12 hours.",
        buttonText: "Submit Allocation Request",
        campaignTag: "Diwali 2026 Festive Surge"
      }
    }
  },
  "oem-b2b-procurement": {
    title: "OEM Institutional B2B Procurement",
    slug: "oem-b2b-procurement",
    sections: ["Hero Banner", "Proof Metrics", "Features Grid", "Call-to-Action Strip", "Diagnostic Lead Form"],
    status: "Active",
    ctaText: "Schedule Institutional Audit",
    content: {
      hero: {
        badge: "INSTITUTIONAL COMMERCE OPERATIONS",
        headline: "Turnkey Marketplace Operations for OEM & Contract Manufacturers",
        subheadline: "Direct manufacturer-to-consumer infrastructure with full GST compliance, multi-state escrow reconciliation, and enterprise ERP integration.",
        ctaText: "Schedule Institutional Audit"
      },
      features: {
        title: "B2B Operating Modules",
        subtitle: "High-volume commerce distribution for enterprise appliance manufacturing partners.",
        items: [
          { title: "Multi-State GST Compliance", desc: "Local state billing and APOB registration across all key Indian consumption zones." },
          { title: "Bulk Cargo Handling", desc: "Specialized infrastructure for heavy kitchen chimneys, geysers, and washing machines." },
          { title: "Direct Settlement Assurance", desc: "Direct payout escrows reconciling every marketplace deduction against contractual terms." }
        ]
      },
      metrics: {
        title: "Institutional Scale",
        stats: [
          { value: "23+", label: "OEM Brands Operated", subtext: "Crompton, Havells, USHA, Faber and more" },
          { value: "12 States", label: "Fulfillment Coverage", subtext: "Strategic bonded warehouses across India" },
          { value: "0%", label: "Commission Leak", subtext: "Automated payment dispute filing within 48 hours" }
        ]
      },
      cta: {
        headline: "Accelerate Your Factory-to-Marketplace Velocity",
        subtext: "Connect your enterprise ERP with Good Life's commerce operations suite.",
        buttonText: "Schedule B2B Strategy Session"
      },
      form: {
        title: "Institutional Inquiry Form",
        subtitle: "Discuss annual procurement volumes and contractual SLAs with our leadership team.",
        buttonText: "Submit B2B Inquiry",
        campaignTag: "OEM Institutional B2B"
      }
    }
  }
};

export default function DynamicLandingPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [pageConfig, setPageConfig] = useState<LandingPageConfig>(
    DEFAULT_LANDING_PAGES[slug] || {
      title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      slug,
      sections: ["Hero Banner", "Proof Metrics", "Features Grid", "FAQ Accordion", "Diagnostic Lead Form"],
      status: "Active",
      ctaText: "Request Commerce Diagnostic →"
    }
  );

  const [diagOpen, setDiagOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    mobile: "",
    category: "Home & Kitchen Appliances",
    gmv: "₹5 Cr - ₹10 Cr",
    notes: ""
  });

  // Hydrate from localStorage and NestJS PostgreSQL backend
  useEffect(() => {
    try {
      const savedPages = localStorage.getItem("gl_admin_landing_pages");
      if (savedPages) {
        const parsed = JSON.parse(savedPages);
        const match = parsed.find((p: any) => p.slug === slug);
        if (match) setPageConfig(match);
      }
    } catch (_) {}

    // Synchronize with NestJS PostgreSQL backend
    fetch("http://localhost:5000/api/v1/landing-pages")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const match = data.find((p: any) => p.slug === slug);
          if (match) {
            setPageConfig(match);
          }
        }
      })
      .catch(() => {});
  }, [slug]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      await fetch("http://localhost:5000/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          intent: `Landing Page Submission: ${pageConfig.title}`,
          source: `Landing / ${slug} [${pageConfig.content?.form?.campaignTag || "Campaign"}]`,
          date: new Date().toISOString()
        })
      });
    } catch (_) {}
  };

  // Section Renderer according to ordered sequence
  const renderSection = (secName: string, idx: number) => {
    const lower = secName.toLowerCase();

    // 1. HERO BANNER
    if (lower.includes("hero")) {
      const hero = pageConfig.content?.hero;
      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{
            background: "radial-gradient(ellipse at top, #EFF6FF 0%, #FFFFFF 70%)",
            padding: "5rem 1.5rem 4rem",
            borderBottom: "1px solid #E2E8F0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#1D4ED8",
              marginBottom: "1.25rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              <span>{hero?.badge || "Good Life Sutra — Enterprise Commerce Campaign"}</span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem"
            }}>
              {hero?.headline || pageConfig.title}
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#475569",
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto 2rem"
            }}>
              {hero?.subheadline || "Single-point operational accountability for marketplace volume surges, 12-state inventory placement, zero stock-out dark store logistics, and guaranteed payment settlement."}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: "10px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                  transition: "transform 0.15s ease"
                }}
              >
                {hero?.ctaText || pageConfig.ctaText}
              </button>

              <a
                href="#contact-form"
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  color: "#334155",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "1px solid #CBD5E1",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                Quick Lead Inquiry ↓
              </a>
            </div>
          </div>
        </section>
      );
    }

    // 2. PROOF METRICS
    if (lower.includes("metric") || lower.includes("stat")) {
      const metrics = pageConfig.content?.metrics;
      const statsList = metrics?.stats || [
        { value: "4.8x", label: "Peak Sales Surge", subtext: "Average GMV increase during festive windows" },
        { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch compliance during peak volume" },
        { value: "₹450 Cr+", label: "GMV Handled", subtext: "Processed across Amazon, Flipkart & Quick-Commerce" }
      ];

      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{ padding: "4rem 1.5rem", background: "#0F172A", color: "#FFFFFF" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "#38BDF8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.5rem"
            }}>
              {metrics?.title || "Proven Commercial Scale"}
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "2.5rem" }}>
              Operational Metrics That Protect Brand Equity
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}>
              {statsList.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "14px",
                    padding: "2rem 1.5rem",
                    backdropFilter: "blur(8px)"
                  }}
                >
                  <div style={{
                    fontSize: "2.8rem",
                    fontWeight: 900,
                    color: "#38BDF8",
                    fontFamily: "var(--font-outfit, sans-serif)",
                    lineHeight: 1,
                    marginBottom: "0.5rem"
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.4rem" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 3. FEATURES GRID
    if (lower.includes("feature")) {
      const features = pageConfig.content?.features;
      const itemsList = features?.items || [
        { title: "Marketplace Channel Operations", desc: "Account health, listing buy-box algorithms, keyword indexing, and catalog defense across Amazon, Flipkart, Blinkit, and JioMart." },
        { title: "12-State Warehousing & Fulfilment", desc: "Regional inventory placement in Tier 1 & Tier 2 hubs ensuring 1-day delivery SLAs, reduced inter-state freight, and zero transit damages." },
        { title: "Revenue Assurance & Reconciliation", desc: "Daily automated audit of every customer order against returns, payment gateway charges, commission deductions, and carrier claims." }
      ];

      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                {features?.title || "Operational Capabilities Engineered for Scale"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: "600px", margin: "0.5rem auto 0" }}>
                {features?.subtitle || "How Good Life operates your brand across India without fragmented agencies or distributor conflict."}
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.75rem"
            }}>
              {itemsList.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    background: "#FFFFFF",
                    padding: "2rem",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB",
                    marginBottom: "1.25rem"
                  }}>
                    {fIdx === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {fIdx === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    )}
                    {fIdx !== 0 && fIdx !== 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    )}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 4. BRAND PARTNER GALLERY
    if (lower.includes("gallery") || lower.includes("brand")) {
      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: "1.75rem"
            }}>
              Operating Across India&apos;s Top Marketplaces & 23+ Leading Appliance Brands
            </p>

            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2.5rem",
              opacity: 0.85
            }}>
              {["Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware", "Amazon", "Flipkart", "Blinkit"].map((brand, bIdx) => (
                <span
                  key={bIdx}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "#1E293B",
                    letterSpacing: "-0.02em"
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 5. CALL-TO-ACTION STRIP
    if (lower.includes("cta") || lower.includes("call-to-action")) {
      const cta = pageConfig.content?.cta;
      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{
            background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #1E40AF 100%)",
            padding: "4.5rem 1.5rem",
            color: "#FFFFFF",
            textAlign: "center"
          }}
        >
          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              {cta?.headline || "Ready to Scale Without Operational Friction?"}
            </h2>
            <p style={{ fontSize: "1.05rem", opacity: 0.9, lineHeight: 1.6, marginBottom: "2rem" }}>
              {cta?.subtext || "Request a diagnostic review with Good Life's commercial operations team to audit your catalogue and regional placement."}
            </p>
            <button
              onClick={() => setDiagOpen(true)}
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "#1D4ED8",
                fontSize: "1rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
              }}
            >
              {cta?.buttonText || "Schedule Operations Audit →"}
            </button>
          </div>
        </section>
      );
    }

    // 6. FAQ ACCORDION
    if (lower.includes("faq")) {
      const faq = pageConfig.content?.faq;
      const faqList = faq?.items || [
        {
          q: "How does Good Life differ from a conventional seller services agency?",
          a: "Agencies charge retainers to run ad campaigns and upload listings, but leave stockouts, warehouse damages, and payment leaks to you. Good Life operates the entire commerce chain under unified accountability: from multi-state inventory placement to daily escrow reconciliation."
        },
        {
          q: "How fast can our catalog be integrated across platforms?",
          a: "Standard merchant catalog setup, compliance checks, and warehouse inbound across all 12 regional fulfillment centers take between 10 to 14 business days."
        },
        {
          q: "Who handles customer returns and transit damages?",
          a: "Good Life maintains an on-site reverse-logistics QC cell in each regional hub. Returned appliances are inspected within 24 hours, restockable units are refurbished, and damaged units trigger automated claim filing against logistics carriers."
        }
      ];

      return (
        <section
          key={`sec-${idx}-${secName}`}
          style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A" }}>
                {faq?.title || "Frequently Asked Questions"}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.4rem" }}>
                Clear operational answers for enterprise appliance brands and manufacturers.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {faqList.map((item, qIdx) => (
                <div
                  key={qIdx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === qIdx ? null : qIdx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1.2rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                      {item.q}
                    </span>
                    <span style={{ fontSize: "1.2rem", color: "#2563EB", fontWeight: 900 }}>
                      {activeFaq === qIdx ? "−" : "+"}
                    </span>
                  </button>

                  {activeFaq === qIdx && (
                    <div style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 7. DIAGNOSTIC LEAD FORM
    if (lower.includes("form") || lower.includes("lead")) {
      const formConfig = pageConfig.content?.form;
      return (
        <section
          key={`sec-${idx}-${secName}`}
          id="contact-form"
          style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF" }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                background: "#EFF6FF",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#2563EB",
                marginBottom: "0.75rem"
              }}>
                16-POINT COMMERCIAL DIAGNOSTIC
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
                {formConfig?.title || "Request Your Marketplace Audit"}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.4rem" }}>
                {formConfig?.subtitle || "Our operations directors will evaluate your listing health, stock placement, and reconciliation leakages within 12 business hours."}
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "14px",
                padding: "2.5rem 2rem",
                textAlign: "center"
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#166534", marginBottom: "0.5rem" }}>
                  Diagnostic Inquiry Received!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#15803D", lineHeight: 1.6, maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Thank you, <strong>{formData.contactName || formData.companyName}</strong>. Our commercial operations specialist will review your brand details and contact you within 12 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    background: "#166534",
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  background: "#F8FAFC",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Company / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Havells India Ltd."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Product Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", background: "#FFFFFF" }}
                    >
                      <option>Home & Kitchen Appliances</option>
                      <option>Kitchen Chimneys & Gas Stoves</option>
                      <option>Smart LED Televisions</option>
                      <option>Washing Machines & Dryers</option>
                      <option>Seasonal Air Coolers & Fans</option>
                      <option>Inverters & Battery Systems</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Current Annual Online GMV
                    </label>
                    <select
                      value={formData.gmv}
                      onChange={(e) => setFormData({ ...formData, gmv: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", background: "#FFFFFF" }}
                    >
                      <option>Under ₹1 Cr / Emerging Brand</option>
                      <option>₹1 Cr - ₹5 Cr</option>
                      <option>₹5 Cr - ₹10 Cr</option>
                      <option>₹10 Cr - ₹50 Cr</option>
                      <option>₹50 Cr+ / Enterprise Tier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Operational Pain Points / Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Seeking 1-day delivery SLAs across North & South India, high return rate on Amazon, commission reconciliation."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.95rem",
                    borderRadius: "10px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  {formConfig?.buttonText || "Submit Diagnostic Inquiry →"}
                </button>
              </form>
            )}
          </div>
        </section>
      );
    }

    return null;
  };

  // ── Normalized Section Renderer with Themes and Real Visual Page Builder Parity ──
  const renderNormalizedSection = (section: PageSection, idx: number) => {
    const { type, content, theme } = section;

    // 1. HERO BANNER
    if (type === "hero") {
      const themeConfig = HERO_THEMES[theme as keyof typeof HERO_THEMES] || HERO_THEMES.glow;
      return (
        <section
          key={section.id || `norm-hero-${idx}`}
          style={{
            background: themeConfig.background,
            color: themeConfig.text,
            padding: "5rem 1.5rem 4rem",
            borderBottom: `1px solid ${themeConfig.border}`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: themeConfig.badgeBg,
              border: `1px solid ${themeConfig.badgeBorder}`,
              fontSize: "0.78rem",
              fontWeight: 700,
              color: themeConfig.badgeColor,
              marginBottom: "1.25rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: themeConfig.badgeColor }} />
              <span>{content?.badge || "FESTIVAL DEMAND SURGE 2026"}</span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
              fontWeight: 900,
              color: themeConfig.text,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem"
            }}>
              {content?.headline || pageConfig.title}
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: themeConfig.subtext,
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto 2rem"
            }}>
              {content?.subheadline || "Single-point operational accountability for marketplace volume surges, 12-state inventory placement, zero stock-out dark store logistics, and guaranteed payment settlement."}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: "10px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                  transition: "transform 0.15s ease"
                }}
              >
                {content?.ctaText || pageConfig.ctaText}
              </button>

              <a
                href="#contact-form"
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  color: "#334155",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "1px solid #CBD5E1",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                Quick Lead Inquiry ↓
              </a>
            </div>
          </div>
        </section>
      );
    }

    // 2. PROOF METRICS
    if (type === "metrics") {
      const themeConfig = METRICS_THEMES[theme as keyof typeof METRICS_THEMES] || METRICS_THEMES.dark;
      const statsList = content?.stats || [
        { value: "4.8x", label: "Peak Sales Surge", subtext: "Average GMV increase during festive windows" },
        { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch compliance during peak volume" },
        { value: "₹450 Cr+", label: "GMV Handled", subtext: "Processed across Amazon, Flipkart & Quick-Commerce" }
      ];

      return (
        <section
          key={section.id || `norm-metrics-${idx}`}
          style={{ padding: "4rem 1.5rem", background: themeConfig.background, color: themeConfig.text }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: themeConfig.accent,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.5rem"
            }}>
              {content?.title || "Proven Commercial Scale"}
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: themeConfig.text, marginBottom: "2.5rem" }}>
              Operational Metrics That Protect Brand Equity
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}>
              {statsList.map((stat: any, sIdx: number) => (
                <div
                  key={sIdx}
                  style={{
                    background: themeConfig.cardBg,
                    border: `1px solid ${themeConfig.cardBorder}`,
                    borderRadius: "14px",
                    padding: "2rem 1.5rem",
                    backdropFilter: "blur(8px)"
                  }}
                >
                  <div style={{
                    fontSize: "2.8rem",
                    fontWeight: 900,
                    color: themeConfig.accent,
                    fontFamily: "var(--font-outfit, sans-serif)",
                    lineHeight: 1,
                    marginBottom: "0.5rem"
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: themeConfig.text, marginBottom: "0.4rem" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: themeConfig.subtext }}>
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 3. FEATURES GRID
    if (type === "features") {
      const itemsList = content?.items || [
        { title: "Marketplace Channel Operations", desc: "Account health, listing buy-box algorithms, keyword indexing, and catalog defense across Amazon, Flipkart, Blinkit, and JioMart." },
        { title: "12-State Warehousing & Fulfilment", desc: "Regional inventory placement in Tier 1 & Tier 2 hubs ensuring 1-day delivery SLAs, reduced inter-state freight, and zero transit damages." },
        { title: "Revenue Assurance & Reconciliation", desc: "Daily automated audit of every customer order against returns, payment gateway charges, commission deductions, and carrier claims." }
      ];

      return (
        <section
          key={section.id || `norm-features-${idx}`}
          style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                {content?.title || "Operational Capabilities Engineered for Scale"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: "600px", margin: "0.5rem auto 0" }}>
                {content?.subtitle || "How Good Life operates your brand across India without fragmented agencies or distributor conflict."}
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.75rem"
            }}>
              {itemsList.map((feat: any, fIdx: number) => (
                <div
                  key={fIdx}
                  style={{
                    background: "#FFFFFF",
                    padding: "2rem",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB",
                    marginBottom: "1.25rem"
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 4. BRAND PARTNER GALLERY
    if (type === "gallery") {
      const brands = content?.brands || ["Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware", "Amazon", "Flipkart", "Blinkit"];
      return (
        <section
          key={section.id || `norm-gallery-${idx}`}
          style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#64748B",
              marginBottom: "1.75rem"
            }}>
              {content?.title || "Operating Across India's Top Marketplaces & 23+ Leading Appliance Brands"}
            </p>

            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2.5rem",
              opacity: 0.85
            }}>
              {brands.map((brand: string, bIdx: number) => (
                <span
                  key={bIdx}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "#1E293B",
                    letterSpacing: "-0.02em"
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 5. CALL-TO-ACTION STRIP
    if (type === "cta") {
      const themeConfig = CTA_THEMES[theme as keyof typeof CTA_THEMES] || CTA_THEMES.gradient;
      return (
        <section
          key={section.id || `norm-cta-${idx}`}
          style={{
            background: themeConfig.background,
            padding: "4.5rem 1.5rem",
            color: themeConfig.text,
            textAlign: "center"
          }}
        >
          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              {content?.headline || "Ready to Scale Without Operational Friction?"}
            </h2>
            <p style={{ fontSize: "1.05rem", color: themeConfig.subtext, lineHeight: 1.6, marginBottom: "2rem" }}>
              {content?.subtext || "Request a diagnostic review with Good Life's commercial operations team to audit your catalogue and regional placement."}
            </p>
            <button
              onClick={() => setDiagOpen(true)}
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "10px",
                background: themeConfig.btnBg,
                color: themeConfig.btnColor,
                fontSize: "1rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
              }}
            >
              {content?.buttonText || "Schedule Operations Audit →"}
            </button>
          </div>
        </section>
      );
    }

    // 6. FAQ ACCORDION
    if (type === "faq") {
      const faqList = content?.items || [
        {
          q: "How does Good Life differ from a conventional seller services agency?",
          a: "Agencies charge retainers to run ad campaigns and upload listings, but leave stockouts, warehouse damages, and payment leaks to you. Good Life operates the entire commerce chain under unified accountability: from multi-state inventory placement to daily escrow reconciliation."
        },
        {
          q: "How fast can our catalog be integrated across platforms?",
          a: "Standard merchant catalog setup, compliance checks, and warehouse inbound across all 12 regional fulfillment centers take between 10 to 14 business days."
        },
        {
          q: "Who handles customer returns and transit damages?",
          a: "Good Life maintains an on-site reverse-logistics QC cell in each regional hub. Returned appliances are inspected within 24 hours, restockable units are refurbished, and damaged units trigger automated claim filing against logistics carriers."
        }
      ];

      return (
        <section
          key={section.id || `norm-faq-${idx}`}
          style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A" }}>
                {content?.title || "Frequently Asked Questions"}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.4rem" }}>
                Clear operational answers for enterprise appliance brands and manufacturers.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {faqList.map((item: any, qIdx: number) => (
                <div
                  key={qIdx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === qIdx ? null : qIdx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1.2rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                      {item.q}
                    </span>
                    <span style={{ fontSize: "1.2rem", color: "#2563EB", fontWeight: 900 }}>
                      {activeFaq === qIdx ? "−" : "+"}
                    </span>
                  </button>

                  {activeFaq === qIdx && (
                    <div style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 7. DIAGNOSTIC LEAD FORM
    if (type === "form") {
      return (
        <section
          key={section.id || `norm-form-${idx}`}
          id="contact-form"
          style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF" }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                background: "#EFF6FF",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#2563EB",
                marginBottom: "0.75rem"
              }}>
                16-POINT COMMERCIAL DIAGNOSTIC
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
                {content?.title || "Request Your Marketplace Audit"}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "0.4rem" }}>
                {content?.subtitle || "Our operations directors will evaluate your listing health, stock placement, and reconciliation leakages within 12 business hours."}
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "14px",
                padding: "2.5rem 2rem",
                textAlign: "center"
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#166534", marginBottom: "0.5rem" }}>
                  Diagnostic Inquiry Received!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#15803D", lineHeight: 1.6, maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Thank you, <strong>{formData.contactName || formData.companyName}</strong>. Our commercial operations specialist will review your brand details and contact you within 12 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    background: "#166534",
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  background: "#F8FAFC",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Company / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Havells India Ltd."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Product Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", background: "#FFFFFF" }}
                    >
                      <option>Home & Kitchen Appliances</option>
                      <option>Kitchen Chimneys & Gas Stoves</option>
                      <option>Smart LED Televisions</option>
                      <option>Washing Machines & Dryers</option>
                      <option>Seasonal Air Coolers & Fans</option>
                      <option>Inverters & Battery Systems</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                      Current Annual Online GMV
                    </label>
                    <select
                      value={formData.gmv}
                      onChange={(e) => setFormData({ ...formData, gmv: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", background: "#FFFFFF" }}
                    >
                      <option>Under ₹1 Cr / Emerging Brand</option>
                      <option>₹1 Cr - ₹5 Cr</option>
                      <option>₹5 Cr - ₹10 Cr</option>
                      <option>₹10 Cr - ₹50 Cr</option>
                      <option>₹50 Cr+ / Enterprise Tier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                    Operational Pain Points / Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Seeking 1-day delivery SLAs across North & South India, high return rate on Amazon, commission reconciliation."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.9rem", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.95rem",
                    borderRadius: "10px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  {content?.buttonText || "Submit Diagnostic Inquiry →"}
                </button>
              </form>
            )}
          </div>
        </section>
      );
    }

    // 8. ABOUT COMPANY
    if (type === "about") {
      return (
        <section key={section.id || `norm-about-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {content?.badge || "ABOUT GOOD LIFE SUTRA"}
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0F172A", margin: "0.5rem 0 1rem", lineHeight: 1.2 }}>
                {content?.headline || "India's Premier Consumer Durables Commerce Partner"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {content?.description || "Founded to solve fragmented agencies, stockouts, and delayed settlement. We operate the entire commerce chain under unified commercial accountability."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ padding: "1rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2563EB" }}>12 States</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Bonded Warehouse Hubs</div>
                </div>
                <div style={{ padding: "1rem", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#16A34A" }}>100% SLA</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Contractual Adherence</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={content?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"}
                alt="About Company"
                style={{ width: "100%", maxHeight: "360px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
              />
            </div>
          </div>
        </section>
      );
    }

    // 9. SERVICES OVERVIEW
    if (type === "services") {
      const services = content?.services || [
        { title: "Marketplace Listing Defense", desc: "Catalog compliance, keyword dominance, suppression rescue." },
        { title: "Multi-State Warehousing", desc: "APOB registrations, bonded local fulfillment, 4-hour rebalancing." },
        { title: "Automated Escrow Audit", desc: "Direct reconciliation of returns, commission fees & carrier deductions." }
      ];
      return (
        <section key={section.id || `norm-services-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
                {content?.title || "End-to-End Enterprise Services"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748B" }}>
                {content?.subtitle || "Comprehensive turnkey modules engineered for appliance manufacturers"}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {services.map((svc: any, sIdx: number) => (
                <div key={sIdx} style={{ background: "#FFFFFF", padding: "1.75rem", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem" }}>{svc.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0, lineHeight: 1.6 }}>{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 10. TEAM MEMBERS
    if (type === "team") {
      const members = content?.members || [
        { name: "Harish Gupta", role: "Managing Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
        { name: "Sanjay Singhal", role: "Head of Logistics & Hubs", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
        { name: "Priya Venkatesh", role: "VP Marketplace Growth", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" }
      ];
      return (
        <section key={section.id || `norm-team-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem" }}>
              {content?.title || "Leadership & Commerce Directors"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "2.5rem" }}>
              {content?.subtitle || "Decades of marketplace operations, logistics & FMCG scale leadership"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {members.map((m: any, mIdx: number) => (
                <div key={mIdx} style={{ background: "#F8FAFC", borderRadius: "14px", padding: "1.75rem", border: "1px solid #E2E8F0" }}>
                  <img src={m.img} alt={m.name} style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 1rem" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.2rem" }}>{m.name}</h4>
                  <p style={{ fontSize: "0.82rem", color: "#2563EB", fontWeight: 700, margin: 0 }}>{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 11. TESTIMONIALS & REVIEWS
    if (type === "testimonials" || type === "reviews") {
      const testimonials = content?.testimonials || [
        { quote: "Good Life transformed our regional fulfillment. Next-day dispatch increased from 62% to 99.4% within 60 days.", author: "VP Operations", brand: "Major Kitchen Appliance Brand" },
        { quote: "Zero stockouts during the festive Great Indian Festival. Their dark store network handled 4.8x normal volume effortlessly.", author: "Head of D2C", brand: "Leading Consumer Durables OEM" },
        { quote: "The daily escrow audit saved us ₹42 Lakhs in unjustified logistics carrier return deductions in Q3 alone.", author: "Commercial CFO", brand: "National TV & Chimney Partner" }
      ];
      return (
        <section key={section.id || `norm-reviews-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem" }}>
              {content?.title || "Trusted by Appliance Industry Leaders"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "2.5rem" }}>
              {content?.subtitle || "Read how top consumer durable brands eliminate stockouts with Good Life"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {testimonials.map((t: any, tIdx: number) => (
                <div key={tIdx} style={{ background: "#FFFFFF", padding: "2rem 1.75rem", borderRadius: "14px", border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.25rem", color: "#EAB308", marginBottom: "1rem" }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 1.25rem" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>{t.author}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{t.brand}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 12. IMAGE GALLERY
    if (type === "image_gallery") {
      const images = content?.images || [
        { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80", cap: "12-State Bonded Logistics Hub" },
        { url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80", cap: "Automated Sorting & Conveyors" },
        { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80", cap: "24-Hour Reverse QC Testing Dock" }
      ];
      return (
        <section key={section.id || `norm-gallery-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem" }}>
              {content?.title || "Facilities & Multi-State Infrastructure"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "2.5rem" }}>
              {content?.subtitle || "Tour our bonded warehouses, triage inspection centers and dispatch docks"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {images.map((img: any, iIdx: number) => (
                <div key={iIdx} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                  <img src={img.url} alt={img.cap} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                  <div style={{ padding: "0.75rem 1rem", fontSize: "0.85rem", fontWeight: 700, color: "#334155", background: "#F8FAFC" }}>{img.cap}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 13. PRICING PLANS
    if (type === "pricing") {
      return (
        <section key={section.id || `norm-pricing-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
              {content?.title || "Commercial Operating Models"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "2.5rem" }}>
              {content?.subtitle || "Transparent SLAs tailored to your annual online GMV volume"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                { name: "Emerging Brand", vol: "Under ₹5 Cr GMV", fee: "Fixed Base + 3% GMV", feats: ["4 Regional Hubs", "24h Return Triage", "Bi-Weekly Settlement Audit"] },
                { name: "Growth Surge", vol: "₹5 Cr - ₹25 Cr GMV", fee: "Performance SLA + 2.2%", highlight: true, feats: ["8 Regional Hubs", "Zero Stockout Guarantee", "Dedicated Marketplace Director"] },
                { name: "Enterprise OEM", vol: "₹25 Cr+ Enterprise", fee: "Custom Turnkey SLA", feats: ["All 12 Bonded Hubs", "Daily Escrow Reconciliation", "Direct ERP & SAP Integration"] }
              ].map((tier, pIdx) => (
                <div key={pIdx} style={{
                  background: "#FFFFFF",
                  padding: "2.25rem 1.75rem",
                  borderRadius: "16px",
                  border: tier.highlight ? "2px solid #2563EB" : "1px solid #E2E8F0",
                  position: "relative",
                  boxShadow: tier.highlight ? "0 10px 25px rgba(37,99,235,0.12)" : "none"
                }}>
                  {tier.highlight && (
                    <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#2563EB", color: "#FFFFFF", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                      MOST POPULAR
                    </span>
                  )}
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>{tier.name}</h3>
                  <div style={{ fontSize: "0.82rem", color: "#64748B", margin: "0.3rem 0 1.2rem" }}>{tier.vol}</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2563EB", marginBottom: "1.5rem" }}>{tier.fee}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left", marginBottom: "1.75rem" }}>
                    {tier.feats.map((f, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#334155" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setDiagOpen(true)} style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", background: tier.highlight ? "#2563EB" : "#F1F5F9", color: tier.highlight ? "#FFFFFF" : "#0F172A", border: "none", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer" }}>
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 14. CONTACT & MAP
    if (type === "contact_map") {
      return (
        <section key={section.id || `norm-contact-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>CONNECT WITH US</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", margin: "0.5rem 0 1rem" }}>
                {content?.title || "Central Headquarters & Hub Locations"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: 1.6 }}>
                {content?.address || "Good Life Sutra Tower, Sector 62, Commercial Corridor, Noida, NCR 201309"}
              </p>
              <div style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "#1E293B", fontWeight: 700 }}>
                Email: enterprise@goodlifesutra.com | Phone: +91 (120) 489-2200
              </div>
            </div>
            <div style={{ background: "#F1F5F9", height: "260px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0" }}>
              <div style={{ textAlign: "center", color: "#64748B" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, marginTop: "0.6rem" }}>12 Regional Fulfillment Centers Across India</div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // 15. BLOG & ARTICLES
    if (type === "blog") {
      return (
        <section key={section.id || `norm-blog-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
                {content?.title || "Marketplace Insights & Intelligence"}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[
                { title: "Diwali 2026 Appliance Surge Playbook", tag: "Logistics", date: "Sept 2026", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80" },
                { title: "Reducing Reverse Logistics QC Damage by 43%", tag: "Operations", date: "Aug 2026", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80" },
                { title: "Marketplace Commission Leak Audit Guide", tag: "Finance", date: "July 2026", img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80" }
              ].map((art, aIdx) => (
                <div key={aIdx} style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  <div style={{ padding: "1.5rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{art.tag}</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0.75rem 0 0.4rem" }}>{art.title}</h4>
                    <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>{art.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 16. CASE STUDIES
    if (type === "case_studies") {
      return (
        <section key={section.id || `norm-cases-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#0F172A", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "2.5rem" }}>
              {content?.title || "Proven Enterprise Case Studies"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.75rem" }}>
              {[
                { brand: "Tier-1 Water Heater OEM", result: "4.2x GMV Surge with Zero Stockouts", summary: "Scaled from ₹12 Cr to ₹51 Cr annual online sales through 12-state dark store distribution." },
                { brand: "Smart Kitchen Chimney Brand", result: "43% Reduction in Return Transit Damages", summary: "Automated reverse QC packaging triage implemented across North and West hubs." }
              ].map((cs, cIdx) => (
                <div key={cIdx} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "2rem", borderRadius: "16px", textAlign: "left" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>{cs.brand}</span>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: "0.5rem 0 0.85rem", color: "#FFFFFF" }}>{cs.result}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>{cs.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 17. HOW IT WORKS
    if (type === "how_it_works") {
      return (
        <section key={section.id || `norm-process-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
              {content?.title || "Turnkey 4-Step Commerce Velocity"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "3rem" }}>
              {content?.subtitle || "How we onboard and scale your brand across marketplaces in 14 days"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {[
                { step: "01", title: "Diagnostic Audit", desc: "Catalog indexing, margin leak & inventory assessment." },
                { step: "02", title: "Regional Inbound", desc: "Goods placement into 12 bonded warehouse hubs." },
                { step: "03", title: "Buy-Box Defense", desc: "Automated listing suppression prevention & lightning sales." },
                { step: "04", title: "Daily Recon", desc: "Automated dispute filing and carrier payout assurance." }
              ].map((st, idx) => (
                <div key={idx} style={{ padding: "1.75rem 1.25rem", background: "#F8FAFC", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2563EB", marginBottom: "0.6rem" }}>{st.step}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem" }}>{st.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 18. AWARDS & ACHIEVEMENTS
    if (type === "awards") {
      return (
        <section key={section.id || `norm-awards-${idx}`} style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0F172A", marginBottom: "1.75rem" }}>
              {content?.title || "Industry Accolades & Certifications"}
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                "ET Retail Commerce Partner of the Year 2025",
                "Amazon Top Durables Fulfillment Operator",
                "Flipkart Platinum SLA Compliance 99.4%",
                "ISO 9001:2015 Certified Supply Chain"
              ].map((awd, idx) => (
                <div key={idx} style={{ background: "#FFFFFF", padding: "1rem 1.5rem", borderRadius: "10px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#334155" }}>{awd}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 19. TRUST BADGES
    if (type === "trust_badges") {
      return (
        <section key={section.id || `norm-trust-${idx}`} style={{ padding: "3rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { title: "100% GST Multi-State Compliant", desc: "APOB Registered" },
              { title: "Daily Escrow Auditing", desc: "Zero Fund Leakage" },
              { title: "Sub-24h Delivery SLA", desc: "19,000+ Pin Codes" },
              { title: "Dedicated Account Director", desc: "Direct Phone & Desk" }
            ].map((tr, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>{tr.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{tr.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // 20. PRODUCT SHOWCASE
    if (type === "product_showcase") {
      return (
        <section key={section.id || `norm-products-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>
              {content?.title || "Featured Product Range"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem", marginTop: "2.5rem" }}>
              {[
                { name: "Smart Auto-Clean Chimney 90cm", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80", tag: "Festive Star SKU" },
                { name: "Heavy-Duty Inverter 1100VA Pure Sine", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80", tag: "Power Backup" },
                { name: "5-Star Smart Air Cooler 75L", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80", tag: "High Velocity" }
              ].map((prod, pIdx) => (
                <div key={pIdx} style={{ background: "#F8FAFC", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0", textAlign: "left" }}>
                  <img src={prod.img} alt={prod.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "1.5rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{prod.tag}</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "0.5rem 0" }}>{prod.name}</h4>
                    <button onClick={() => setDiagOpen(true)} style={{ width: "100%", marginTop: "0.85rem", padding: "0.6rem", background: "#2563EB", color: "#FFFFFF", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
                      Request Brand Allocation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // 21. OFFERS / PROMOTIONS
    if (type === "offers") {
      return (
        <section key={section.id || `norm-offers-${idx}`} style={{ padding: "4rem 1.5rem", background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)", color: "#FFFFFF", textAlign: "center" }}>
          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "0.35rem 0.9rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 900 }}>
              LIMITED TIME FESTIVE ALLOCATION
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, margin: "0.85rem 0 0.65rem" }}>
              {content?.headline || "Get 50% Off First-Month Dark Store Inbounding"}
            </h2>
            <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "1.75rem" }}>
              {content?.subtext || "Lock in your holiday warehouse slots before regional Tier-1 hubs reach festive capacity cutoffs."}
            </p>
            <button onClick={() => setDiagOpen(true)} style={{ padding: "0.9rem 2.2rem", background: "#FFFFFF", color: "#B91C1C", fontWeight: 900, fontSize: "1rem", borderRadius: "10px", border: "none", cursor: "pointer" }}>
              Claim Promo Offer →
            </button>
          </div>
        </section>
      );
    }

    // 22. COUNTDOWN
    if (type === "countdown") {
      return (
        <section key={section.id || `norm-count-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#0F172A", color: "#FFFFFF", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>PRE-FESTIVE CUTOFF</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "0.5rem 0 1.75rem" }}>
              {content?.title || "Diwali 2026 Inbound Window Closing In"}
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginBottom: "2rem" }}>
              {[{ num: "14", unit: "Days" }, { num: "08", unit: "Hours" }, { num: "32", unit: "Mins" }, { num: "45", unit: "Secs" }].map((c, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.08)", padding: "1.2rem 1.5rem", borderRadius: "12px", minWidth: "85px" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#38BDF8" }}>{c.num}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{c.unit}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setDiagOpen(true)} style={{ padding: "0.85rem 2rem", background: "#38BDF8", color: "#0F172A", fontWeight: 900, borderRadius: "10px", border: "none", cursor: "pointer" }}>
              Reserve Regional Slots Now
            </button>
          </div>
        </section>
      );
    }

    // 23. VIDEO SHOWCASE
    if (type === "video") {
      return (
        <section key={section.id || `norm-video-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem" }}>
              {content?.title || "Watch Good Life Operational Architecture in Action"}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "2rem" }}>
              See how our robotic automated dark stores pick, pack, and dispatch 40,000+ units daily.
            </p>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&auto=format&fit=crop&q=80" alt="Video Cover" style={{ width: "100%", maxHeight: "440px", objectFit: "cover" }} />
              <div onClick={() => setDiagOpen(true)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "76px", height: "76px", borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 0 30px rgba(37,99,235,0.6)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // 24. SOCIAL PROOF
    if (type === "social_proof") {
      return (
        <section key={section.id || `norm-press-${idx}`} style={{ padding: "3rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
            FEATURED & RECOGNIZED IN LEADING BUSINESS MEDIA
          </span>
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", alignItems: "center", flexWrap: "wrap", marginTop: "1.25rem", opacity: 0.85 }}>
            {["The Economic Times", "LiveMint", "Business Standard", "YourStory", "Inc42", "Financial Express"].map((pub, pIdx) => (
              <span key={pIdx} style={{ fontSize: "1.2rem", fontWeight: 900, color: "#334155", letterSpacing: "-0.02em" }}>{pub}</span>
            ))}
          </div>
        </section>
      );
    }

    // 25. COMPARISON TABLE
    if (type === "comparison") {
      return (
        <section key={section.id || `norm-comp-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1050px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginBottom: "2.5rem" }}>
              {content?.title || "Why Brands Choose Good Life Over Fragmented Vendors"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              <div style={{ background: "#FEF2F2", border: "1px solid #FEE2E2", borderRadius: "16px", padding: "2rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#991B1B", marginBottom: "1.25rem" }}>
                  Conventional Model (Fragmented 4+ Agencies)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", fontSize: "0.88rem", color: "#7F1D1D" }}>
                  <div>✕ Single warehouse causes 5–7 day delivery times</div>
                  <div>✕ Ad agency runs campaigns while products are out of stock</div>
                  <div>✕ Returned appliances sit uninspected for weeks</div>
                  <div>✕ Carrier dispute claim deadlines regularly missed</div>
                  <div>✕ No single accountable commercial SLA partner</div>
                </div>
              </div>
              <div style={{ background: "#EFF6FF", border: "2px solid #2563EB", borderRadius: "16px", padding: "2rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1D4ED8", marginBottom: "1.25rem" }}>
                  Good Life Operating Partner (Unified Model)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", fontSize: "0.88rem", color: "#1E3A8A" }}>
                  <div>✓ 12 regional hub placement for 24-hour delivery SLAs</div>
                  <div>✓ Ads synced with inventory algorithm to prevent waste</div>
                  <div>✓ 24-hour return QC triage to recover restockable units</div>
                  <div>✓ Daily automated claim filing recovering lost margins</div>
                  <div>✓ Single-point leadership accountability for brand equity</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // 26. INTEGRATIONS
    if (type === "integrations") {
      return (
        <section key={section.id || `norm-integ-${idx}`} style={{ padding: "4rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0F172A", marginBottom: "2rem" }}>
            {content?.title || "Seamless ERP & Marketplace Integration Stack"}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto" }}>
            {["Amazon SP-API", "Flipkart F-Plus", "Blinkit Dark Store", "SAP S/4HANA", "Zoho Inventory", "Tally Prime", "Delhivery Direct", "Shiprocket X"].map((tech, tIdx) => (
              <div key={tIdx} style={{ padding: "0.6rem 1.25rem", background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 800, color: "#1E293B" }}>
                {tech}
              </div>
            ))}
          </div>
        </section>
      );
    }

    // 27. PROBLEM → SOLUTION
    if (type === "problem_solution") {
      return (
        <section key={section.id || `norm-prob-${idx}`} style={{ padding: "4.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 900, color: "#DC2626", textTransform: "uppercase" }}>THE BOTTLENECK</span>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0F172A", margin: "0.5rem 0 0.85rem" }}>
                  Why Appliance Brands Bleed Margins Online
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: 1.7 }}>
                  High shipping damage on chimneys and geysers, 7-day transit times causing cancellation spikes, and carrier reconciliation leaks draining 4–8% of net GMV.
                </p>
              </div>
              <div style={{ padding: "2rem", background: "#EFF6FF", borderRadius: "16px", border: "1px solid #BFDBFE" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 900, color: "#2563EB", textTransform: "uppercase" }}>THE GOOD LIFE SOLUTION</span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1E40AF", margin: "0.5rem 0 0.6rem" }}>
                  Regional Dark Stores & Automated Escrow
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#1E3A8A", lineHeight: 1.7, margin: 0 }}>
                  Strategic local inventory placement eliminates inter-state transit breakage, cuts delivery times to under 24 hours, and reconciles every single customer rupee automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FFFFFF", color: "#0F172A", fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Global Navigation Header */}
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Render Normalized Sections with Theme Presets if available, or fall back to legacy sequence */}
        {pageConfig.pageSections && Array.isArray(pageConfig.pageSections) && pageConfig.pageSections.length > 0 ? (
          pageConfig.pageSections
            .filter((sec) => sec.enabled !== false)
            .sort((a, b) => a.order - b.order)
            .map((sec, idx) => renderNormalizedSection(sec, idx))
        ) : (
          pageConfig.sections.map((secName, idx) => renderSection(secName, idx))
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive 16-Point Commerce Diagnostic Modal */}
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
