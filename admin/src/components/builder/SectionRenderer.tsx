"use client";

import React, { useState } from "react";
import { PageSection, HERO_THEMES, METRICS_THEMES, CTA_THEMES } from "./types";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CloseIcon,
  CopyIcon,
  EditIcon,
  TargetIcon,
  ChartBarIcon,
  BoxesIcon,
  TagIcon,
  MegaphoneIcon,
  FaqIcon,
  ClipboardListIcon,
  BuildingIcon,
  BriefcaseIcon,
  HandshakeIcon,
  UsersIcon,
  MessageSquareIcon,
  ImageIcon,
  CreditCardIcon,
  MapPinIconCustom,
  BookOpenIcon,
  TrophyIcon,
  ShieldCheckIcon,
  StarIcon,
  ShoppingBagIcon,
  FlameIcon,
  ClockIcon,
  VideoIcon,
  ShareIcon,
  ColumnsIcon,
  PuzzleIcon,
  AlertCircleIcon,
  ProcessIcon,
  CheckCircleIcon
} from "../Icons";

interface SectionRendererProps {
  section: PageSection;
  index: number;
  totalSections: number;
  isSelected?: boolean;
  isBuilder?: boolean;
  previewDevice?: "desktop" | "tablet" | "mobile";
  onSelect?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onDuplicate?: (index: number) => void;
  onDelete?: (index: number) => void;
  onOpenDiagnostic?: () => void;
  formSubmitted?: boolean;
  onFormSubmit?: (e: React.FormEvent) => void;
}

export default function SectionRenderer({
  section,
  index,
  totalSections,
  isSelected = false,
  isBuilder = false,
  previewDevice = "desktop",
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onOpenDiagnostic,
  formSubmitted = false,
  onFormSubmit
}: SectionRendererProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const { type, content, theme } = section;
  const typo = section.typography;

  // Dynamic Typography Styles
  const headlineStyle: React.CSSProperties = {
    fontFamily: typo?.fontFamily || undefined,
    color: typo?.headlineColor || undefined,
    fontWeight: typo?.fontWeight === "black" ? 900 : typo?.fontWeight === "bold" ? 700 : typo?.fontWeight === "semibold" ? 600 : undefined
  };

  const subtextStyle: React.CSSProperties = {
    fontFamily: typo?.fontFamily || undefined,
    color: typo?.subtextColor || undefined
  };

  // Wrapper Styling
  const wrapperStyle: React.CSSProperties = isBuilder
    ? {
        position: "relative",
        cursor: "pointer",
        outline: isSelected ? "3px solid #2563EB" : isHovered ? "2px dashed #93C5FD" : "none",
        outlineOffset: "-2px",
        transition: "outline 0.15s ease",
        opacity: section.enabled ? 1 : 0.4
      }
    : {
        position: "relative"
      };

  const isMobile = previewDevice === "mobile";

  return (
    <div
      id={isBuilder ? `canvas-section-${section.id}` : undefined}
      style={wrapperStyle}
      onClick={() => isBuilder && onSelect && onSelect(section.id)}
      onMouseEnter={() => isBuilder && setIsHovered(true)}
      onMouseLeave={() => isBuilder && setIsHovered(false)}
    >
      {/* Floating Canvas Action Toolbar (Builder Only) */}
      {isBuilder && (isHovered || isSelected) && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            zIndex: 40,
            background: "#0F172A",
            color: "#FFFFFF",
            padding: "0.3rem 0.6rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            fontSize: "0.72rem",
            fontWeight: 700
          }}
        >
          <span style={{ color: "#38BDF8", marginRight: "0.25rem", textTransform: "capitalize" }}>
            #{index + 1} {type.replace("_", " ")}
          </span>

          <button
            type="button"
            onClick={() => onMoveUp && onMoveUp(index)}
            disabled={index === 0}
            style={{ border: "none", background: "transparent", color: index === 0 ? "#64748B" : "#FFFFFF", cursor: index === 0 ? "not-allowed" : "pointer", padding: "0.15rem" }}
            title="Move Section Up"
          >
            <ArrowUpIcon size={12} color="currentColor" />
          </button>

          <button
            type="button"
            onClick={() => onMoveDown && onMoveDown(index)}
            disabled={index === totalSections - 1}
            style={{ border: "none", background: "transparent", color: index === totalSections - 1 ? "#64748B" : "#FFFFFF", cursor: index === totalSections - 1 ? "not-allowed" : "pointer", padding: "0.15rem" }}
            title="Move Section Down"
          >
            <ArrowDownIcon size={12} color="currentColor" />
          </button>

          <button
            type="button"
            onClick={() => onSelect && onSelect(section.id)}
            style={{ border: "none", background: "#2563EB", color: "#FFFFFF", borderRadius: "4px", padding: "0.15rem 0.45rem", fontSize: "0.68rem", cursor: "pointer", fontWeight: 700 }}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDuplicate && onDuplicate(index)}
            style={{ border: "none", background: "rgba(255,255,255,0.15)", color: "#FFFFFF", borderRadius: "4px", padding: "0.15rem 0.4rem", fontSize: "0.68rem", cursor: "pointer" }}
            title="Duplicate Section"
          >
            <CopyIcon size={11} color="#FFFFFF" />
          </button>

          <button
            type="button"
            onClick={() => onDelete && onDelete(index)}
            style={{ border: "none", background: "rgba(239,68,68,0.25)", color: "#F87171", borderRadius: "4px", padding: "0.15rem 0.35rem", cursor: "pointer" }}
            title="Delete Section"
          >
            <CloseIcon size={11} color="#F87171" />
          </button>
        </div>
      )}

      {/* ── 1. HERO BANNER (WITH PHOTO / SPLIT SUPPORT) ── */}
      {type === "hero" && (() => {
        const themeConfig = HERO_THEMES[theme as keyof typeof HERO_THEMES] || HERO_THEMES.glow;
        const hasPhoto = Boolean(content?.imageUrl);
        return (
          <section style={{
            padding: hasPhoto ? "3.5rem 1.5rem" : "4rem 1.5rem",
            background: themeConfig.background,
            color: typo?.headlineColor || themeConfig.text,
            textAlign: hasPhoto && !isMobile ? "left" : "center",
            borderBottom: `1px solid ${themeConfig.border}`
          }}>
            <div style={{
              maxWidth: "1140px",
              margin: "0 auto",
              display: hasPhoto && !isMobile ? "grid" : "block",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "2.5rem",
              alignItems: "center"
            }}>
              <div>
                <span style={{
                  display: "inline-block",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "999px",
                  background: themeConfig.badgeBg,
                  border: `1px solid ${themeConfig.badgeBorder}`,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: themeConfig.badgeColor,
                  marginBottom: "1rem"
                }}>
                  {content?.badge || "FESTIVAL DEMAND SURGE 2026"}
                </span>

                <h1 style={{
                  fontSize: isMobile ? "1.55rem" : "2.5rem",
                  fontWeight: 900,
                  margin: "0 0 1rem",
                  lineHeight: 1.15,
                  color: typo?.headlineColor || themeConfig.text,
                  ...headlineStyle
                }}>
                  {content?.headline || "Scale Festive Volume Across Marketplaces"}
                </h1>

                <p style={{
                  fontSize: "0.95rem",
                  color: typo?.subtextColor || themeConfig.subtext,
                  margin: hasPhoto && !isMobile ? "0 0 1.75rem" : "0 auto 1.75rem",
                  maxWidth: hasPhoto ? "100%" : "600px",
                  lineHeight: 1.6,
                  ...subtextStyle
                }}>
                  {content?.subheadline || "Guaranteed warehouse capacity across 12 states, zero stockout SLAs, and daily algorithmic reconciliation."}
                </p>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: hasPhoto && !isMobile ? "flex-start" : "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => onOpenDiagnostic && onOpenDiagnostic()}
                    style={{
                      padding: "0.75rem 1.6rem",
                      background: "#2563EB",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      border: "none",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
                    }}
                  >
                    {content?.ctaText || "Claim Allocation →"}
                  </button>

                  <a
                    href="#contact-form"
                    style={{
                      padding: "0.75rem 1.4rem",
                      background: "#FFFFFF",
                      color: "#334155",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    Direct Inquiry
                  </a>
                </div>
              </div>

              {hasPhoto && (
                <div style={{ position: "relative", marginTop: isMobile ? "1.5rem" : 0 }}>
                  <img
                    src={content.imageUrl}
                    alt={content?.headline || "Hero Photo"}
                    style={{
                      width: "100%",
                      maxHeight: "360px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      border: "3px solid #FFFFFF"
                    }}
                  />
                  {content?.imageBadge && (
                    <div style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 800
                    }}>
                      {content.imageBadge}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* ── 2. PROOF METRICS ── */}
      {type === "metrics" && (() => {
        const themeConfig = METRICS_THEMES[theme as keyof typeof METRICS_THEMES] || METRICS_THEMES.dark;
        const stats = content?.stats || [
          { value: "4.8x", label: "Peak Sales Surge", subtext: "Average GMV increase" },
          { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch" },
          { value: "₹450 Cr+", label: "GMV Handled", subtext: "Across Amazon & Flipkart" }
        ];

        return (
          <section style={{
            padding: "2.75rem 1.5rem",
            background: themeConfig.background,
            color: typo?.headlineColor || themeConfig.text,
            textAlign: "center",
            borderBottom: "1px solid #E2E8F0"
          }}>
            <div style={{
              fontSize: "0.78rem",
              color: themeConfig.accent,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.75rem"
            }}>
              {content?.title || "Proven Commercial Scale"}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              maxWidth: "1100px",
              margin: "0 auto"
            }}>
              {stats.map((st: any, sIdx: number) => (
                <div key={sIdx} style={{
                  background: themeConfig.cardBg,
                  border: `1px solid ${themeConfig.cardBorder}`,
                  borderRadius: "12px",
                  padding: "1.5rem 1rem",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: themeConfig.accent,
                    lineHeight: 1,
                    ...headlineStyle
                  }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: typo?.headlineColor || themeConfig.text, marginTop: "0.35rem" }}>
                    {st.label}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: typo?.subtextColor || themeConfig.subtext, marginTop: "0.2rem", ...subtextStyle }}>
                    {st.subtext}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── 3. FEATURES GRID ── */}
      {type === "features" && (() => {
        const items = content?.items || [
          { title: "Marketplace Operations", desc: "Account health, buy-box defense, catalog indexing on Amazon & Flipkart." },
          { title: "12-State Warehousing", desc: "Bonded regional facilities ensuring 1-day delivery SLAs across India." },
          { title: "Daily Revenue Assurance", desc: "Automated claim filing for damaged in transit, commission leaks & delayed returns." }
        ];

        return (
          <section style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0F172A", margin: 0, ...headlineStyle }}>
                  {content?.title || "Operational Capabilities Engineered for Scale"}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "0.4rem auto 0", maxWidth: "550px", ...subtextStyle }}>
                  {content?.subtitle || "How Good Life operates your brand across India without fragmented agencies."}
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.25rem"
              }}>
                {items.map((f: any, fIdx: number) => (
                  <div key={fIdx} style={{
                    background: "#FFFFFF",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                  }}>
                    <div style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem"
                    }}>
                      <BoxesIcon size={18} color="#2563EB" />
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.4rem", ...headlineStyle }}>
                      {f.title}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5, margin: 0, ...subtextStyle }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── 4. ABOUT COMPANY (WITH CORPORATE PHOTO) ── */}
      {type === "about" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: isMobile ? "block" : "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {content?.badge || "ABOUT GOOD LIFE SUTRA"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0F172A", margin: "0.5rem 0 1rem", lineHeight: 1.2, ...headlineStyle }}>
                {content?.headline || "India's Premier Consumer Durables Commerce Partner"}
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, marginBottom: "1rem", ...subtextStyle }}>
                {content?.description || "Founded to solve fragmented agencies, stockouts, and delayed settlement. We operate the entire commerce chain under unified commercial accountability."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
                <div style={{ padding: "0.85rem", background: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#2563EB" }}>12 States</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Bonded Warehouse Hubs</div>
                </div>
                <div style={{ padding: "0.85rem", background: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#16A34A" }}>100% SLA</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Contractual Adherence</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: isMobile ? "1.5rem" : 0 }}>
              <img
                src={content?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"}
                alt="About Company"
                style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "14px", border: "1px solid #E2E8F0" }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 5. SERVICES OVERVIEW ── */}
      {type === "services" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", ...headlineStyle }}>
                {content?.title || "End-to-End Enterprise Services"}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B", ...subtextStyle }}>
                {content?.subtitle || "Comprehensive turnkey modules engineered for appliance manufacturers"}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem" }}>
              {(content?.services || [
                { title: "Marketplace Listing Defense", desc: "Catalog compliance, keyword dominance, suppression rescue." },
                { title: "Multi-State Warehousing", desc: "APOB registrations, bonded local fulfillment, 4-hour rebalancing." },
                { title: "Automated Escrow Audit", desc: "Direct reconciliation of returns, commission fees & carrier deductions." }
              ]).map((svc: any, sIdx: number) => (
                <div key={sIdx} style={{ background: "#FFFFFF", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.85rem" }}>
                    <BriefcaseIcon size={18} color="#2563EB" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem", ...headlineStyle }}>{svc.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0, ...subtextStyle }}>{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. PARTNERS / BRANDS GALLERY ── */}
      {type === "gallery" && (
        <section style={{ padding: "2.5rem 1.5rem", background: "#FFFFFF", textAlign: "center", borderBottom: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", ...subtextStyle }}>
            {content?.title || "Operating Across India's Top Marketplaces & 23+ Leading Appliance Brands"}
          </span>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem", opacity: 0.85 }}>
            {(content?.brands || ["Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware", "Amazon", "Flipkart"]).map((b: string, bIdx: number) => (
              <span key={bIdx} style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1E293B", background: "#F1F5F9", padding: "0.4rem 0.85rem", borderRadius: "6px" }}>
                {b}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. TEAM MEMBERS ── */}
      {type === "team" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem", ...headlineStyle }}>
              {content?.title || "Leadership & Commerce Directors"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "2rem", ...subtextStyle }}>
              {content?.subtitle || "Decades of marketplace operations, logistics & FMCG scale leadership"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem" }}>
              {(content?.members || [
                { name: "Harish Gupta", role: "Managing Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
                { name: "Sanjay Singhal", role: "Head of Logistics & Hubs", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
                { name: "Priya Venkatesh", role: "VP Marketplace Growth", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" }
              ]).map((m: any, mIdx: number) => (
                <div key={mIdx} style={{ background: "#F8FAFC", borderRadius: "12px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
                  <img src={m.img} alt={m.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 1rem" }} />
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.2rem", ...headlineStyle }}>{m.name}</h4>
                  <p style={{ fontSize: "0.78rem", color: "#2563EB", fontWeight: 700, margin: 0 }}>{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. TESTIMONIALS & REVIEWS ── */}
      {(type === "testimonials" || type === "reviews") && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem", ...headlineStyle }}>
              {content?.title || "Trusted by Appliance Industry Leaders"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "2rem", ...subtextStyle }}>
              {content?.subtitle || "Read how top consumer durable brands eliminate stockouts with Good Life"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem" }}>
              {(content?.testimonials || [
                { quote: "Good Life transformed our regional fulfillment. Next-day dispatch increased from 62% to 99.4% within 60 days.", author: "VP Operations", brand: "Major Kitchen Appliance Brand" },
                { quote: "Zero stockouts during the festive Great Indian Festival. Their dark store network handled 4.8x normal volume effortlessly.", author: "Head of D2C", brand: "Leading Consumer Durables OEM" },
                { quote: "The daily escrow audit saved us ₹42 Lakhs in unjustified logistics carrier return deductions in Q3 alone.", author: "Commercial CFO", brand: "National TV & Chimney Partner" }
              ]).map((t: any, tIdx: number) => (
                <div key={tIdx} style={{ background: "#FFFFFF", padding: "1.75rem", borderRadius: "14px", border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.2rem", color: "#EAB308", marginBottom: "0.75rem" }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={14} color="#EAB308" />
                      ))}
                    </div>
                    <p style={{ fontSize: "0.86rem", color: "#334155", lineHeight: 1.6, fontStyle: "italic", margin: "0 0 1rem" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>{t.author}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B" }}>{t.brand}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. IMAGE GALLERY / PHOTO GRID ── */}
      {type === "image_gallery" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.5rem", ...headlineStyle }}>
              {content?.title || "Facilities & Multi-State Infrastructure"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "2rem", ...subtextStyle }}>
              {content?.subtitle || "Tour our bonded warehouses, triage inspection centers and dispatch docks"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1rem" }}>
              {(content?.images || [
                { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80", cap: "12-State Bonded Logistics Hub" },
                { url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80", cap: "Automated Sorting & Conveyors" },
                { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80", cap: "24-Hour Reverse QC Testing Dock" }
              ]).map((img: any, iIdx: number) => (
                <div key={iIdx} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                  <img src={img.url} alt={img.cap} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "0.6rem", fontSize: "0.75rem", fontWeight: 700, color: "#334155", background: "#F8FAFC" }}>{img.cap}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. PRICING & SLA PLANS ── */}
      {type === "pricing" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", ...headlineStyle }}>
              {content?.title || "Commercial Operating Models"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "2rem", ...subtextStyle }}>
              {content?.subtitle || "Transparent SLAs tailored to your annual online GMV volume"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                { name: "Emerging Brand", vol: "Under ₹5 Cr GMV", fee: "Fixed Base + 3% GMV", feats: ["4 Regional Hubs", "24h Return Triage", "Bi-Weekly Settlement Audit"] },
                { name: "Growth Surge", vol: "₹5 Cr - ₹25 Cr GMV", fee: "Performance SLA + 2.2%", highlight: true, feats: ["8 Regional Hubs", "Zero Stockout Guarantee", "Dedicated Marketplace Director"] },
                { name: "Enterprise OEM", vol: "₹25 Cr+ Enterprise", fee: "Custom Turnkey SLA", feats: ["All 12 Bonded Hubs", "Daily Escrow Reconciliation", "Direct ERP & SAP Integration"] }
              ].map((tier, pIdx) => (
                <div key={pIdx} style={{
                  background: "#FFFFFF",
                  padding: "2rem 1.5rem",
                  borderRadius: "14px",
                  border: tier.highlight ? "2px solid #2563EB" : "1px solid #E2E8F0",
                  position: "relative",
                  boxShadow: tier.highlight ? "0 10px 25px rgba(37,99,235,0.12)" : "none"
                }}>
                  {tier.highlight && (
                    <span style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#2563EB", color: "#FFFFFF", fontSize: "0.68rem", fontWeight: 800, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                      MOST POPULAR
                    </span>
                  )}
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", margin: 0, ...headlineStyle }}>{tier.name}</h3>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", margin: "0.2rem 0 1rem" }}>{tier.vol}</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#2563EB", marginBottom: "1.25rem" }}>{tier.fee}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left", marginBottom: "1.5rem" }}>
                    {tier.feats.map((f, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#334155" }}>
                        <CheckCircleIcon size={14} color="#16A34A" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onOpenDiagnostic && onOpenDiagnostic()} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", background: tier.highlight ? "#2563EB" : "#F1F5F9", color: tier.highlight ? "#FFFFFF" : "#0F172A", border: "none", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer" }}>
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. FAQ ACCORDION ── */}
      {type === "faq" && (() => {
        const items = content?.items || [
          { q: "How quickly can we allocate regional inventory?", a: "Inventory inbound can be completed within 72 hours across all 12 hubs." },
          { q: "What happens if return rates surge post-festival?", a: "Our QC teams inspect returned appliances within 24 hours to separate restockable units from transit claims." }
        ];

        return (
          <section style={{ padding: "3rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: "750px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: 0, ...headlineStyle }}>
                  {content?.title || "Frequently Asked Questions"}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {items.map((qa: any, qIdx: number) => (
                  <div key={qIdx} style={{ background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === qIdx ? null : qIdx)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "1rem 1.25rem",
                        background: "transparent",
                        border: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F172A" }}>
                        {qa.q}
                      </span>
                      <span style={{ fontSize: "1.1rem", color: "#2563EB", fontWeight: 900 }}>
                        {activeFaq === qIdx ? "−" : "+"}
                      </span>
                    </button>
                    {activeFaq === qIdx && (
                      <div style={{ padding: "0 1.25rem 1rem", fontSize: "0.8rem", color: "#475569", lineHeight: 1.5 }}>
                        {qa.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── 12. CALL-TO-ACTION STRIP ── */}
      {type === "cta" && (() => {
        const themeConfig = CTA_THEMES[theme as keyof typeof CTA_THEMES] || CTA_THEMES.gradient;
        return (
          <section style={{
            padding: "3.5rem 1.5rem",
            background: themeConfig.background,
            color: typo?.headlineColor || themeConfig.text,
            textAlign: "center"
          }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 900, margin: "0 0 0.65rem", ...headlineStyle }}>
                {content?.headline || "Prepare Your Festive Fulfillment Today"}
              </h2>
              <p style={{ fontSize: "0.88rem", opacity: 0.9, margin: "0 auto 1.5rem", lineHeight: 1.5, ...subtextStyle }}>
                {content?.subtext || "Reserve dedicated racking and regional fulfillment slots before the cutoff."}
              </p>
              <button
                onClick={() => onOpenDiagnostic && onOpenDiagnostic()}
                style={{
                  padding: "0.75rem 1.8rem",
                  background: themeConfig.btnBg,
                  color: themeConfig.btnColor,
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 900,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              >
                {content?.buttonText || "Schedule Strategy Session"}
              </button>
            </div>
          </section>
        );
      })()}

      {/* ── 13. CONTACT & MAP ── */}
      {type === "contact_map" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>CONNECT WITH US</span>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", margin: "0.5rem 0 1rem", ...headlineStyle }}>
                {content?.title || "Central Headquarters & Hub Locations"}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B", ...subtextStyle }}>
                {content?.address || "Good Life Sutra Tower, Sector 62, Commercial Corridor, Noida, NCR 201309"}
              </p>
              <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#1E293B", fontWeight: 700 }}>
                Email: enterprise@goodlifesutra.com | Phone: +91 (120) 489-2200
              </div>
            </div>
            <div style={{ background: "#F1F5F9", height: "240px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0", marginTop: isMobile ? "1rem" : 0 }}>
              <div style={{ textAlign: "center", color: "#64748B" }}>
                <MapPinIconCustom size={28} color="#2563EB" />
                <div style={{ fontSize: "0.8rem", fontWeight: 700, marginTop: "0.5rem" }}>12 Regional Fulfillment Centers Across India</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 14. BLOG & ARTICLES ── */}
      {type === "blog" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", ...headlineStyle }}>
                {content?.title || "Marketplace Insights & Intelligence"}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem" }}>
              {[
                { title: "Diwali 2026 Appliance Surge Playbook", tag: "Logistics", date: "Sept 2026", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80" },
                { title: "Reducing Reverse Logistics QC Damage by 43%", tag: "Operations", date: "Aug 2026", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80" },
                { title: "Marketplace Commission Leak Audit Guide", tag: "Finance", date: "July 2026", img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80" }
              ].map((art, aIdx) => (
                <div key={aIdx} style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  <div style={{ padding: "1.25rem" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>{art.tag}</span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: "0.6rem 0 0.4rem", ...headlineStyle }}>{art.title}</h4>
                    <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{art.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 15. CASE STUDIES ── */}
      {type === "case_studies" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#0F172A", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "2rem", ...headlineStyle }}>
              {content?.title || "Proven Enterprise Case Studies"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1.5rem" }}>
              {[
                { brand: "Tier-1 Water Heater OEM", result: "4.2x GMV Surge with Zero Stockouts", summary: "Scaled from ₹12 Cr to ₹51 Cr annual online sales through 12-state dark store distribution." },
                { brand: "Smart Kitchen Chimney Brand", result: "43% Reduction in Return Transit Damages", summary: "Automated reverse QC packaging triage implemented across North and West hubs." }
              ].map((cs, cIdx) => (
                <div key={cIdx} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "1.75rem", borderRadius: "14px", textAlign: "left" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>{cs.brand}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, margin: "0.4rem 0 0.75rem", color: "#FFFFFF", ...headlineStyle }}>{cs.result}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#94A3B8", margin: 0 }}>{cs.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 16. HOW IT WORKS / PROCESS ── */}
      {type === "how_it_works" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", ...headlineStyle }}>
              {content?.title || "Turnkey 4-Step Commerce Velocity"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "2.5rem", ...subtextStyle }}>
              {content?.subtitle || "How we onboard and scale your brand across marketplaces in 14 days"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "1rem" }}>
              {[
                { step: "01", title: "Diagnostic Audit", desc: "Catalog indexing, margin leak & inventory assessment." },
                { step: "02", title: "Regional Inbound", desc: "Goods placement into 12 bonded warehouse hubs." },
                { step: "03", title: "Buy-Box Defense", desc: "Automated listing suppression prevention & lightning sales." },
                { step: "04", title: "Daily Recon", desc: "Automated dispute filing and carrier payout assurance." }
              ].map((st, idx) => (
                <div key={idx} style={{ padding: "1.5rem 1rem", background: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#2563EB", marginBottom: "0.5rem" }}>{st.step}</div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem", ...headlineStyle }}>{st.title}</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748B", margin: 0, ...subtextStyle }}>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 17. AWARDS & ACHIEVEMENTS ── */}
      {type === "awards" && (
        <section style={{ padding: "3rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", marginBottom: "1.5rem", ...headlineStyle }}>
              {content?.title || "Industry Accolades & Certifications"}
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                "ET Retail Commerce Partner of the Year 2025",
                "Amazon Top Durables Fulfillment Operator",
                "Flipkart Platinum SLA Compliance 99.4%",
                "ISO 9001:2015 Certified Supply Chain"
              ].map((awd, idx) => (
                <div key={idx} style={{ background: "#FFFFFF", padding: "0.85rem 1.25rem", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <TrophyIcon size={16} color="#D97706" />
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#334155" }}>{awd}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 18. TRUST BADGES / CERTIFICATIONS ── */}
      {type === "trust_badges" && (
        <section style={{ padding: "2.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { title: "100% GST Multi-State Compliant", desc: "APOB Registered" },
              { title: "Daily Escrow Auditing", desc: "Zero Fund Leakage" },
              { title: "Sub-24h Delivery SLA", desc: "19,000+ Pin Codes" },
              { title: "Dedicated Account Director", desc: "Direct Phone & Desk" }
            ].map((tr, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <ShieldCheckIcon size={22} color="#16A34A" />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.84rem", fontWeight: 800, color: "#0F172A" }}>{tr.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B" }}>{tr.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 19. PRODUCT SHOWCASE ── */}
      {type === "product_showcase" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", ...headlineStyle }}>
              {content?.title || "Featured Product Range"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                { name: "Smart Auto-Clean Chimney 90cm", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80", tag: "Festive Star SKU" },
                { name: "Heavy-Duty Inverter 1100VA Pure Sine", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80", tag: "Power Backup" },
                { name: "5-Star Smart Air Cooler 75L", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80", tag: "High Velocity" }
              ].map((prod, pIdx) => (
                <div key={pIdx} style={{ background: "#F8FAFC", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0", textAlign: "left" }}>
                  <img src={prod.img} alt={prod.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <div style={{ padding: "1.25rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#2563EB", background: "#EFF6FF", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>{prod.tag}</span>
                    <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: "0.4rem 0" }}>{prod.name}</h4>
                    <button onClick={() => onOpenDiagnostic && onOpenDiagnostic()} style={{ width: "100%", marginTop: "0.75rem", padding: "0.5rem", background: "#2563EB", color: "#FFFFFF", borderRadius: "6px", border: "none", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                      Request Brand Allocation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 20. OFFERS / PROMOTIONS ── */}
      {type === "offers" && (
        <section style={{ padding: "3rem 1.5rem", background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)", color: "#FFFFFF", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 900 }}>
              LIMITED TIME FESTIVE ALLOCATION
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, margin: "0.75rem 0 0.5rem", ...headlineStyle }}>
              {content?.headline || "Get 50% Off First-Month Dark Store Inbounding"}
            </h2>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "1.5rem", ...subtextStyle }}>
              {content?.subtext || "Lock in your holiday warehouse slots before regional Tier-1 hubs reach festive capacity cutoffs."}
            </p>
            <button onClick={() => onOpenDiagnostic && onOpenDiagnostic()} style={{ padding: "0.8rem 2rem", background: "#FFFFFF", color: "#B91C1C", fontWeight: 900, fontSize: "0.95rem", borderRadius: "10px", border: "none", cursor: "pointer" }}>
              Claim Promo Offer →
            </button>
          </div>
        </section>
      )}

      {/* ── 21. COUNTDOWN / COMING SOON ── */}
      {type === "countdown" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#0F172A", color: "#FFFFFF", textAlign: "center" }}>
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>PRE-FESTIVE CUTOFF</span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, margin: "0.4rem 0 1.5rem", ...headlineStyle }}>
              {content?.title || "Diwali 2026 Inbound Window Closing In"}
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.75rem" }}>
              {[{ num: "14", unit: "Days" }, { num: "08", unit: "Hours" }, { num: "32", unit: "Mins" }, { num: "45", unit: "Secs" }].map((c, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.08)", padding: "1rem 1.25rem", borderRadius: "10px", minWidth: "75px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#38BDF8" }}>{c.num}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{c.unit}</div>
                </div>
              ))}
            </div>
            <button onClick={() => onOpenDiagnostic && onOpenDiagnostic()} style={{ padding: "0.75rem 1.8rem", background: "#38BDF8", color: "#0F172A", fontWeight: 900, borderRadius: "8px", border: "none", cursor: "pointer" }}>
              Reserve Regional Slots Now
            </button>
          </div>
        </section>
      )}

      {/* ── 22. VIDEO SHOWCASE ── */}
      {type === "video" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.4rem", ...headlineStyle }}>
              {content?.title || "Watch Good Life Operational Architecture in Action"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", ...subtextStyle }}>
              See how our robotic automated dark stores pick, pack, and dispatch 40,000+ units daily.
            </p>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&auto=format&fit=crop&q=80" alt="Video Cover" style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "68px", height: "68px", borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 0 30px rgba(37,99,235,0.6)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 23. SOCIAL PROOF / MEDIA MENTIONS ── */}
      {type === "social_proof" && (
        <section style={{ padding: "2.5rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
            FEATURED & RECOGNIZED IN LEADING BUSINESS MEDIA
          </span>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "1rem", opacity: 0.85 }}>
            {["The Economic Times", "LiveMint", "Business Standard", "YourStory", "Inc42", "Financial Express"].map((pub, pIdx) => (
              <span key={pIdx} style={{ fontSize: "1.1rem", fontWeight: 900, color: "#334155", letterSpacing: "-0.02em" }}>{pub}</span>
            ))}
          </div>
        </section>
      )}

      {/* ── 24. COMPARISON TABLE ── */}
      {type === "comparison" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "2rem", ...headlineStyle }}>
              {content?.title || "Why Brands Choose Good Life Over Fragmented Vendors"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
              <div style={{ background: "#FEF2F2", border: "1px solid #FEE2E2", borderRadius: "14px", padding: "1.75rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#991B1B", marginBottom: "1rem" }}>
                  Conventional Model (Fragmented 4+ Agencies)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.82rem", color: "#7F1D1D" }}>
                  <div>✕ Single warehouse causes 5–7 day delivery times</div>
                  <div>✕ Ad agency runs campaigns while products are out of stock</div>
                  <div>✕ Returned appliances sit uninspected for weeks</div>
                  <div>✕ Carrier dispute claim deadlines regularly missed</div>
                  <div>✕ No single accountable commercial SLA partner</div>
                </div>
              </div>
              <div style={{ background: "#EFF6FF", border: "2px solid #2563EB", borderRadius: "14px", padding: "1.75rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1D4ED8", marginBottom: "1rem" }}>
                  Good Life Operating Partner (Unified Model)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.82rem", color: "#1E3A8A" }}>
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
      )}

      {/* ── 25. INTEGRATIONS & TECHNOLOGY ── */}
      {type === "integrations" && (
        <section style={{ padding: "3rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", marginBottom: "1.5rem", ...headlineStyle }}>
            {content?.title || "Seamless ERP & Marketplace Integration Stack"}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto" }}>
            {["Amazon SP-API", "Flipkart F-Plus", "Blinkit Dark Store", "SAP S/4HANA", "Zoho Inventory", "Tally Prime", "Delhivery Direct", "Shiprocket X"].map((tech, tIdx) => (
              <div key={tIdx} style={{ padding: "0.5rem 1rem", background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 800, color: "#1E293B" }}>
                {tech}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 26. PROBLEM → SOLUTION ── */}
      {type === "problem_solution" && (
        <section style={{ padding: "3.5rem 1.5rem", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#DC2626", textTransform: "uppercase" }}>THE BOTTLENECK</span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A", margin: "0.4rem 0 0.75rem", ...headlineStyle }}>
                  Why Appliance Brands Bleed Margins Online
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6, ...subtextStyle }}>
                  High shipping damage on chimneys and geysers, 7-day transit times causing cancellation spikes, and carrier reconciliation leaks draining 4–8% of net GMV.
                </p>
              </div>
              <div style={{ padding: "1.75rem", background: "#EFF6FF", borderRadius: "14px", border: "1px solid #BFDBFE" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#2563EB", textTransform: "uppercase" }}>THE GOOD LIFE SOLUTION</span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1E40AF", margin: "0.4rem 0 0.5rem", ...headlineStyle }}>
                  Regional Dark Stores & Automated Escrow
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#1E3A8A", lineHeight: 1.6, margin: 0 }}>
                  Strategic local inventory placement eliminates inter-state transit breakage, cuts delivery times to under 24 hours, and reconciles every single customer rupee automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 27. DIAGNOSTIC LEAD FORM ── */}
      {type === "form" && (
        <section id="contact-form" style={{ padding: "3.5rem 1.5rem", background: "#EFF6FF" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#1E40AF", margin: 0, ...headlineStyle }}>
                {content?.title || "Request Commercial Diagnostic Audit"}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#3B82F6", margin: "0.3rem 0 0", ...subtextStyle }}>
                {content?.subtitle || "Our marketplace directors will assess your catalog within 12 hours"}
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "14px",
                padding: "2rem",
                textAlign: "center"
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#166534", marginBottom: "0.4rem" }}>
                  Diagnostic Inquiry Received!
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#15803D", lineHeight: 1.5 }}>
                  Our commercial operations specialist will review your brand details and contact you within 12 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onFormSubmit || ((e) => e.preventDefault())}
                style={{
                  background: "#FFFFFF",
                  padding: "1.75rem",
                  borderRadius: "14px",
                  border: "1px solid #BFDBFE",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "#334155", marginBottom: "0.25rem" }}>
                      Company Name *
                    </label>
                    <input type="text" required placeholder="e.g. Havells India Ltd." style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.82rem" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "#334155", marginBottom: "0.25rem" }}>
                      Work Email *
                    </label>
                    <input type="email" required placeholder="e.g. contact@brand.com" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.82rem" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "#334155", marginBottom: "0.25rem" }}>
                    Mobile Number *
                  </label>
                  <input type="tel" required placeholder="+91 98765 43210" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.82rem" }} />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)"
                  }}
                >
                  {content?.buttonText || "Submit Diagnostic Inquiry →"}
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
