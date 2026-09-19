"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAdminData, LandingPageItem } from "@/context/AdminDataContext";
import {
  PageSection,
  SectionType,
  HERO_THEMES,
  METRICS_THEMES,
  CTA_THEMES,
  FONT_OPTIONS,
  COLOR_SWATCHES,
  SAMPLE_PHOTOS,
  SectionTypography,
  createDefaultPageSections
} from "@/components/builder/types";
import SectionRenderer from "@/components/builder/SectionRenderer";
import {
  LandingPageIcon,
  PlusIcon,
  TrashIcon,
  CloseIcon,
  ExternalLinkIcon,
  GripVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DesktopIcon,
  MobileIcon,
  CheckIcon,
  TargetIcon,
  ChartBarIcon,
  BoxesIcon,
  TagIcon,
  MegaphoneIcon,
  FaqIcon,
  ClipboardListIcon,
  UndoIcon,
  RedoIcon,
  CopyIcon,
  EyeIcon,
  EditIcon,
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
  CheckCircleIcon,
  PaletteIcon,
  TypeIcon
} from "@/components/Icons";

const AVAILABLE_CATALOG_SECTIONS = [
  { type: "hero" as SectionType, label: "Hero Banner", desc: "High-impact visual banner with headline, badge & CTA button", icon: TargetIcon, color: "#4F46E5", category: "Headers" },
  { type: "metrics" as SectionType, label: "Stats / Metrics", desc: "Key operational benchmarks & performance counters", icon: ChartBarIcon, color: "#0284C7", category: "Proof" },
  { type: "features" as SectionType, label: "Features Grid", desc: "3-column operational capabilities and marketplace modules", icon: BoxesIcon, color: "#2563EB", category: "Features" },
  { type: "about" as SectionType, label: "About Company", desc: "Executive brand story with split photo and infrastructure stats", icon: BuildingIcon, color: "#059669", category: "Company" },
  { type: "services" as SectionType, label: "Services Overview", desc: "Comprehensive turnkey modules engineered for manufacturers", icon: BriefcaseIcon, color: "#7C3AED", category: "Features" },
  { type: "gallery" as SectionType, label: "Partners & Brands", desc: "Top marketplace platforms & 23+ OEM partner brands", icon: TagIcon, color: "#D97706", category: "Proof" },
  { type: "team" as SectionType, label: "Team Members", desc: "Leadership directors & operations commanders", icon: UsersIcon, color: "#4F46E5", category: "Company" },
  { type: "testimonials" as SectionType, label: "Testimonials", desc: "Quotes & verified endorsements from enterprise brand leaders", icon: MessageSquareIcon, color: "#0284C7", category: "Proof" },
  { type: "image_gallery" as SectionType, label: "Image Gallery", desc: "High-resolution photo tour of bonded hubs, docks & labs", icon: ImageIcon, color: "#059669", category: "Media" },
  { type: "pricing" as SectionType, label: "Pricing Plans", desc: "Transparent operating packages with volume-based SLA tiers", icon: CreditCardIcon, color: "#2563EB", category: "Commercial" },
  { type: "faq" as SectionType, label: "FAQ Accordion", desc: "Collapsible operational answers for merchant onboarding", icon: FaqIcon, color: "#7C3AED", category: "Conversion" },
  { type: "cta" as SectionType, label: "CTA Banner", desc: "Full-width colored banner prompting diagnostic inquiry", icon: MegaphoneIcon, color: "#1D4ED8", category: "Conversion" },
  { type: "contact_map" as SectionType, label: "Contact & Map", desc: "Headquarters address, direct phone, and regional hub pins", icon: MapPinIconCustom, color: "#0284C7", category: "Contact" },
  { type: "blog" as SectionType, label: "Blog & Articles", desc: "Industry insights, logistics playbooks, and case digests", icon: BookOpenIcon, color: "#2563EB", category: "Content" },
  { type: "case_studies" as SectionType, label: "Case Studies", desc: "In-depth client scale surges with audited metrics", icon: ChartBarIcon, color: "#0F172A", category: "Proof" },
  { type: "how_it_works" as SectionType, label: "How It Works / Process", desc: "4-step onboarding timeline from audit to regional dispatch", icon: ProcessIcon, color: "#4F46E5", category: "Features" },
  { type: "awards" as SectionType, label: "Awards & Achievements", desc: "Industry trophies, awards, and national recognitions", icon: TrophyIcon, color: "#D97706", category: "Proof" },
  { type: "trust_badges" as SectionType, label: "Trust / Certifications", desc: "ISO compliance, GST registration, and SLA seals", icon: ShieldCheckIcon, color: "#16A34A", category: "Proof" },
  { type: "reviews" as SectionType, label: "Reviews & Ratings", desc: "5-star customer feedback and ratings breakdown", icon: StarIcon, color: "#EAB308", category: "Proof" },
  { type: "product_showcase" as SectionType, label: "Product Showcase", desc: "High-impact appliance product cards with order CTA", icon: ShoppingBagIcon, color: "#2563EB", category: "Commerce" },
  { type: "offers" as SectionType, label: "Offers / Promotions", desc: "High-urgency promotional banner with discount counter", icon: FlameIcon, color: "#DC2626", category: "Commercial" },
  { type: "countdown" as SectionType, label: "Countdown / Coming Soon", desc: "Ticking launch timer for festive cutoffs", icon: ClockIcon, color: "#0284C7", category: "Conversion" },
  { type: "video" as SectionType, label: "Video Showcase", desc: "Cinematic facility tour and automated dark store demo", icon: VideoIcon, color: "#2563EB", category: "Media" },
  { type: "social_proof" as SectionType, label: "Social Proof", desc: "National media badges & press coverage", icon: ShareIcon, color: "#475569", category: "Proof" },
  { type: "comparison" as SectionType, label: "Comparison Table", desc: "Good Life Unified Model vs Fragmented Agencies", icon: ColumnsIcon, color: "#2563EB", category: "Features" },
  { type: "integrations" as SectionType, label: "Integrations / Technology", desc: "SP-API, Flipkart, SAP, Blinkit tech stack", icon: PuzzleIcon, color: "#7C3AED", category: "Features" },
  { type: "problem_solution" as SectionType, label: "Problem → Solution", desc: "Industry pain points contrasted with operational remedies", icon: AlertCircleIcon, color: "#DC2626", category: "Conversion" },
  { type: "form" as SectionType, label: "Lead / Contact Form", desc: "16-point commercial inventory audit questionnaire", icon: ClipboardListIcon, color: "#059669", category: "Conversion" }
];

function BuilderContent() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("id");

  const { landingPages, saveLandingPage, faqs, brands } = useAdminData();

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>("hero-1");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [inspectorTab, setInspectorTab] = useState<"content" | "typography" | "media">("content");

  // Interactive Brand, FAQ & Item Builder States
  const [newBrandInput, setNewBrandInput] = useState("");
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [isFaqDbPickerOpen, setIsFaqDbPickerOpen] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamRole, setNewTeamRole] = useState("");
  const [newTestimonialQuote, setNewTestimonialQuote] = useState("");
  const [newTestimonialAuthor, setNewTestimonialAuthor] = useState("");

  const handleSelectSection = (id: string, fromLayers: boolean = false) => {
    setSelectedSectionId(id);
    if (fromLayers) {
      setTimeout(() => {
        const el = document.getElementById(`canvas-section-${id}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    }
  };

  // Drag-and-drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDropOverIndex] = useState<number | null>(null);

  // Normalized Page State
  const [pageMeta, setPageMeta] = useState({
    id: "lp-" + Date.now(),
    title: "Diwali Appliance Scale Surge 2026",
    slug: "diwali-appliance-scale",
    status: "Active" as "Active" | "Draft",
    ctaText: "Claim Festival Allocation →"
  });

  const [sections, setSections] = useState<PageSection[]>(
    createDefaultPageSections("Diwali Appliance Scale Surge 2026", "Claim Festival Allocation →")
  );

  // Undo / Redo Stack
  const [history, setHistory] = useState<PageSection[][]>([
    createDefaultPageSections("Diwali Appliance Scale Surge 2026", "Claim Festival Allocation →")
  ]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const pushHistory = (newSections: PageSection[]) => {
    const updated = history.slice(0, historyIdx + 1);
    updated.push(newSections);
    setHistory(updated);
    setHistoryIdx(updated.length - 1);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      setSections(history[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setSections(history[nextIdx]);
    }
  };

  // Keyboard shortcut listener for Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIdx, history]);

  // Load target landing page if pageId matches
  useEffect(() => {
    if (pageId && pageId !== "new") {
      const match = landingPages.find(p => p.id === pageId);
      if (match) {
        setPageMeta({
          id: match.id,
          title: match.title,
          slug: match.slug,
          status: match.status,
          ctaText: match.ctaText
        });

        if (match.pageSections && Array.isArray(match.pageSections) && match.pageSections.length > 0) {
          setSections(match.pageSections);
          setHistory([match.pageSections]);
          setHistoryIdx(0);
          setSelectedSectionId(match.pageSections[0]?.id || null);
        } else {
          // Convert legacy sections to normalized model
          const converted = createDefaultPageSections(match.title, match.ctaText);
          setSections(converted);
          setHistory([converted]);
          setHistoryIdx(0);
          setSelectedSectionId(converted[0]?.id || null);
        }
      }
    } else if (pageId === "new") {
      const newSections = createDefaultPageSections("New Campaign Landing Page", "Request Diagnostic →");
      setPageMeta({
        id: "lp-" + Date.now(),
        title: "New Campaign Landing Page",
        slug: "new-campaign",
        status: "Active",
        ctaText: "Request Diagnostic →"
      });
      setSections(newSections);
      setHistory([newSections]);
      setHistoryIdx(0);
      setSelectedSectionId("hero-1");
    }
  }, [pageId, landingPages]);

  // Section Reordering Handlers
  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    // Re-assign sequential order numbers
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx }));
    setSections(reordered);
    pushHistory(reordered);
    setSelectedSectionId(moved.id);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropOverIndex(index);
    if (draggedIndex === null || draggedIndex === index) return;
    moveSection(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropOverIndex(null);
  };

  const toggleSectionEnabled = (id: string) => {
    const updated = sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s);
    setSections(updated);
    pushHistory(updated);
  };

  const deleteSection = (index: number) => {
    const target = sections[index];
    const updated = sections.filter((_, i) => i !== index).map((s, idx) => ({ ...s, order: idx }));
    setSections(updated);
    pushHistory(updated);
    if (selectedSectionId === target.id) {
      setSelectedSectionId(updated[0]?.id || null);
    }
  };

  const duplicateSection = (index: number) => {
    const original = sections[index];
    const duplicate: PageSection = {
      ...original,
      id: `${original.type}-${Date.now()}`,
      order: index + 1,
      content: JSON.parse(JSON.stringify(original.content))
    };
    const updated = [...sections];
    updated.splice(index + 1, 0, duplicate);
    const reordered = updated.map((s, idx) => ({ ...s, order: idx }));
    setSections(reordered);
    pushHistory(reordered);
    setSelectedSectionId(duplicate.id);
  };

  const addSectionFromCatalog = (type: SectionType) => {
    const id = `${type}-${Date.now()}`;
    const newSection: PageSection = {
      id,
      type,
      enabled: true,
      order: sections.length,
      content: {},
      theme: type === "hero" ? "glow" : type === "metrics" ? "dark" : type === "cta" ? "gradient" : "light"
    };

    if (type === "hero") {
      newSection.content = {
        badge: "FEATURED CAMPAIGN",
        headline: "Scale Your Channel Operations",
        subheadline: "Direct manufacturer-to-consumer infrastructure with full GST compliance and daily escrow reconciliation.",
        ctaText: "Claim Allocation →",
        imageUrl: SAMPLE_PHOTOS[0].url,
        imageBadge: "12-State Warehousing"
      };
    } else if (type === "metrics") {
      newSection.content = {
        title: "Commercial Operational Benchmarks",
        stats: [
          { value: "4.8x", label: "Peak Sales Surge", subtext: "Festive volume" },
          { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch" },
          { value: "₹450 Cr+", label: "GMV Handled", subtext: "Across India" }
        ]
      };
    } else if (type === "features") {
      newSection.content = {
        title: "Operational Capabilities Engineered for Scale",
        subtitle: "How Good Life operates your brand across India.",
        items: [
          { title: "Zero Stockout SLA", desc: "Real-time stock rebalancing across regional fulfillment hubs." },
          { title: "Listing Protection", desc: "Automated suppression prevention during sale events." },
          { title: "Daily Escrow Audit", desc: "Automated claim filing for damaged in transit." }
        ]
      };
    } else if (type === "about") {
      newSection.content = {
        badge: "ABOUT GOOD LIFE SUTRA",
        headline: "India's Premier Consumer Durables Commerce Partner",
        description: "Founded to solve fragmented agencies, stockouts, and delayed settlement. We operate the entire commerce chain under unified commercial accountability.",
        imageUrl: SAMPLE_PHOTOS[3].url
      };
    } else if (type === "services") {
      newSection.content = {
        title: "End-to-End Enterprise Services",
        subtitle: "Comprehensive turnkey modules engineered for appliance manufacturers",
        services: [
          { title: "Marketplace Listing Defense", desc: "Catalog compliance, keyword dominance, suppression rescue." },
          { title: "Multi-State Warehousing", desc: "APOB registrations, bonded local fulfillment, 4-hour rebalancing." },
          { title: "Automated Escrow Audit", desc: "Direct reconciliation of returns, commission fees & carrier deductions." }
        ]
      };
    } else if (type === "gallery") {
      newSection.content = {
        title: "Operating Across India's Top Marketplaces",
        brands: ["Crompton", "Havells", "USHA", "IKEA", "Faber", "Amazon", "Flipkart"]
      };
    } else if (type === "team") {
      newSection.content = {
        title: "Leadership & Commerce Directors",
        subtitle: "Decades of marketplace operations, logistics & FMCG scale leadership",
        members: [
          { name: "Harish Gupta", role: "Managing Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
          { name: "Sanjay Singhal", role: "Head of Logistics & Hubs", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
          { name: "Priya Venkatesh", role: "VP Marketplace Growth", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" }
        ]
      };
    } else if (type === "testimonials" || type === "reviews") {
      newSection.content = {
        title: "Trusted by Appliance Industry Leaders",
        subtitle: "Read how top consumer durable brands eliminate stockouts with Good Life",
        testimonials: [
          { quote: "Good Life transformed our regional fulfillment. Next-day dispatch increased from 62% to 99.4% within 60 days.", author: "VP Operations", brand: "Major Kitchen Appliance Brand" },
          { quote: "Zero stockouts during the festive Great Indian Festival. Their dark store network handled 4.8x normal volume effortlessly.", author: "Head of D2C", brand: "Leading Consumer Durables OEM" },
          { quote: "The daily escrow audit saved us ₹42 Lakhs in unjustified logistics carrier return deductions in Q3 alone.", author: "Commercial CFO", brand: "National TV & Chimney Partner" }
        ]
      };
    } else if (type === "image_gallery") {
      newSection.content = {
        title: "Facilities & Multi-State Infrastructure",
        subtitle: "Tour our bonded warehouses, triage inspection centers and dispatch docks",
        images: [
          { url: SAMPLE_PHOTOS[0].url, cap: "12-State Bonded Logistics Hub" },
          { url: SAMPLE_PHOTOS[2].url, cap: "Automated Sorting & Conveyors" },
          { url: SAMPLE_PHOTOS[4].url, cap: "24-Hour Reverse QC Testing Dock" }
        ]
      };
    } else if (type === "pricing") {
      newSection.content = {
        title: "Commercial Operating Models",
        subtitle: "Transparent SLAs tailored to your annual online GMV volume"
      };
    } else if (type === "faq") {
      newSection.content = {
        title: "Frequently Asked Questions",
        items: [
          { q: "How quickly can we allocate regional inventory?", a: "Inbound within 72 hours across all 12 hubs." },
          { q: "What happens if return rates surge?", a: "QC inspection within 24 hours." }
        ]
      };
    } else if (type === "cta") {
      newSection.content = {
        headline: "Prepare Your Fulfillment Operations Today",
        subtext: "Reserve dedicated racking before the seasonal cutoff.",
        buttonText: "Schedule Strategy Session"
      };
    } else if (type === "contact_map") {
      newSection.content = {
        title: "Central Headquarters & Hub Locations",
        address: "Good Life Sutra Tower, Sector 62, Commercial Corridor, Noida, NCR 201309"
      };
    } else if (type === "blog") {
      newSection.content = {
        title: "Marketplace Insights & Intelligence"
      };
    } else if (type === "case_studies") {
      newSection.content = {
        title: "Proven Enterprise Case Studies"
      };
    } else if (type === "how_it_works") {
      newSection.content = {
        title: "Turnkey 4-Step Commerce Velocity",
        subtitle: "How we onboard and scale your brand across marketplaces in 14 days"
      };
    } else if (type === "awards") {
      newSection.content = {
        title: "Industry Accolades & Certifications"
      };
    } else if (type === "trust_badges") {
      newSection.content = {
        title: "Trust Badges & Certifications"
      };
    } else if (type === "product_showcase") {
      newSection.content = {
        title: "Featured Product Range",
        imageUrl: SAMPLE_PHOTOS[1].url
      };
    } else if (type === "offers") {
      newSection.content = {
        headline: "Get 50% Off First-Month Dark Store Inbounding",
        subtext: "Lock in your holiday warehouse slots before regional Tier-1 hubs reach festive capacity cutoffs."
      };
    } else if (type === "countdown") {
      newSection.content = {
        title: "Diwali 2026 Inbound Window Closing In"
      };
    } else if (type === "video") {
      newSection.content = {
        title: "Watch Good Life Operational Architecture in Action",
        imageUrl: SAMPLE_PHOTOS[2].url
      };
    } else if (type === "social_proof") {
      newSection.content = {
        title: "Featured & Recognized in Leading Media"
      };
    } else if (type === "comparison") {
      newSection.content = {
        title: "Why Brands Choose Good Life Over Fragmented Vendors"
      };
    } else if (type === "integrations") {
      newSection.content = {
        title: "Seamless ERP & Marketplace Integration Stack"
      };
    } else if (type === "problem_solution") {
      newSection.content = {
        title: "Why Appliance Brands Bleed Margins Online"
      };
    } else if (type === "form") {
      newSection.content = {
        title: "Request Commercial Diagnostic Audit",
        subtitle: "Our marketplace directors will assess your catalog within 12 hours.",
        buttonText: "Submit Diagnostic Inquiry"
      };
    }

    const updated = [...sections, newSection].map((s, idx) => ({ ...s, order: idx }));
    setSections(updated);
    pushHistory(updated);
    setSelectedSectionId(id);
    setIsCatalogOpen(false);
  };

  const updateSectionContent = (id: string, patch: Record<string, any>) => {
    const updated = sections.map(s => {
      if (s.id === id) {
        return {
          ...s,
          content: { ...s.content, ...patch }
        };
      }
      return s;
    });
    setSections(updated);
  };

  const updateSectionTypography = (id: string, patch: Partial<SectionTypography>) => {
    const updated = sections.map(s => {
      if (s.id === id) {
        return {
          ...s,
          typography: { ...s.typography, ...patch }
        };
      }
      return s;
    });
    setSections(updated);
  };

  const updateSectionTheme = (id: string, theme: string) => {
    const updated = sections.map(s => s.id === id ? { ...s, theme } : s);
    setSections(updated);
    pushHistory(updated);
  };

  // Save to Database & LocalStorage
  const handleSave = () => {
    if (!pageMeta.title.trim()) {
      alert("Please enter a Campaign Page Title");
      return;
    }
    const slug = pageMeta.slug.trim() || pageMeta.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Produce legacy sections array for backward compatibility
    const legacySectionNames = sections
      .filter(s => s.enabled)
      .sort((a, b) => a.order - b.order)
      .map(s => {
        if (s.type === "hero") return "Hero Banner";
        if (s.type === "metrics") return "Proof Metrics";
        if (s.type === "features") return "Features Grid";
        if (s.type === "gallery") return "Brand Partner Gallery";
        if (s.type === "cta") return "Call-to-Action Strip";
        if (s.type === "faq") return "FAQ Accordion";
        return "Diagnostic Lead Form";
      });

    saveLandingPage(
      {
        ...pageMeta,
        slug,
        sections: legacySectionNames,
        pageSections: sections
      },
      pageMeta.id
    );
  };

  const getCanvasWidth = () => {
    if (previewDevice === "mobile") return "375px";
    if (previewDevice === "tablet") return "768px";
    return "100%";
  };

  const selectedSection = sections.find(s => s.id === selectedSectionId);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0F172A", overflow: "hidden" }}>
      
      {/* ── TOP STUDIO NAVBAR ── */}
      <header style={{
        height: "60px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1.5rem",
        zIndex: 50
      }}>
        {/* Left: Exit Link, Title, Slug */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin/landing-pages"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              color: "#475569",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              padding: "0.35rem 0.7rem",
              borderRadius: "6px",
              background: "#F1F5F9"
            }}
          >
            ← Exit Studio
          </Link>

          <div style={{ height: "20px", width: "1px", background: "#E2E8F0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LandingPageIcon size={16} color="#2563EB" />
            </div>
            <div>
              <input
                type="text"
                value={pageMeta.title}
                onChange={(e) => setPageMeta({ ...pageMeta, title: e.target.value })}
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  padding: "0.1rem 0.35rem",
                  background: "transparent",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
                title="Click to rename page"
              />
              <div style={{ fontSize: "0.7rem", color: "#2563EB", fontFamily: "monospace", paddingLeft: "0.35rem" }}>
                /landing/{pageMeta.slug}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher + Undo/Redo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Undo / Redo */}
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: "8px", padding: "0.2rem", border: "1px solid #E2E8F0" }}>
            <button
              onClick={handleUndo}
              disabled={historyIdx <= 0}
              style={{
                border: "none",
                background: "transparent",
                color: historyIdx <= 0 ? "#CBD5E1" : "#334155",
                padding: "0.35rem 0.6rem",
                borderRadius: "6px",
                cursor: historyIdx <= 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.74rem",
                fontWeight: 700
              }}
              title="Undo (Ctrl+Z)"
            >
              <UndoIcon size={13} color="currentColor" />
              <span>Undo</span>
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIdx >= history.length - 1}
              style={{
                border: "none",
                background: "transparent",
                color: historyIdx >= history.length - 1 ? "#CBD5E1" : "#334155",
                padding: "0.35rem 0.6rem",
                borderRadius: "6px",
                cursor: historyIdx >= history.length - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.74rem",
                fontWeight: 700
              }}
              title="Redo (Ctrl+Y)"
            >
              <RedoIcon size={13} color="currentColor" />
              <span>Redo</span>
            </button>
          </div>

          {/* Viewport Frame Toggle */}
          <div style={{
            display: "flex",
            background: "#F1F5F9",
            padding: "0.2rem",
            borderRadius: "8px",
            border: "1px solid #E2E8F0"
          }}>
            <button
              onClick={() => setPreviewDevice("desktop")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                border: "none",
                background: previewDevice === "desktop" ? "#FFFFFF" : "transparent",
                color: previewDevice === "desktop" ? "#2563EB" : "#64748B",
                fontWeight: 700,
                fontSize: "0.76rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: previewDevice === "desktop" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
              }}
            >
              <DesktopIcon size={13} />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setPreviewDevice("tablet")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                border: "none",
                background: previewDevice === "tablet" ? "#FFFFFF" : "transparent",
                color: previewDevice === "tablet" ? "#2563EB" : "#64748B",
                fontWeight: 700,
                fontSize: "0.76rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: previewDevice === "tablet" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
              }}
            >
              <DesktopIcon size={13} />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => setPreviewDevice("mobile")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                border: "none",
                background: previewDevice === "mobile" ? "#FFFFFF" : "transparent",
                color: previewDevice === "mobile" ? "#2563EB" : "#64748B",
                fontWeight: 700,
                fontSize: "0.76rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: previewDevice === "mobile" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
              }}
            >
              <MobileIcon size={13} />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Right Actions: Status & Save */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <select
            value={pageMeta.status}
            onChange={(e) => setPageMeta({ ...pageMeta, status: e.target.value as "Active" | "Draft" })}
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: pageMeta.status === "Active" ? "#16A34A" : "#64748B",
              background: "#FFFFFF",
              cursor: "pointer"
            }}
          >
            <option value="Active">● Active (Published)</option>
            <option value="Draft">○ Draft Mode</option>
          </select>

          <a
            href={`http://localhost:3000/landing/${pageMeta.slug}`}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              background: "#FFFFFF",
              color: "#334155",
              fontSize: "0.78rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem"
            }}
          >
            <span>Live View</span>
            <ExternalLinkIcon size={12} />
          </a>

          <button
            onClick={handleSave}
            style={{
              padding: "0.48rem 1.25rem",
              borderRadius: "6px",
              background: "#2563EB",
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)"
            }}
          >
            <CheckIcon size={13} color="#FFFFFF" />
            <span>Save & Publish</span>
          </button>
        </div>
      </header>

      {/* ── WORKSPACE BODY (LAYERS/INSPECTOR ON LEFT, LIVE CANVAS IN CENTER) ── */}
      <div style={{ flex: 1, minHeight: 0, height: "calc(100vh - 60px)", display: "flex", overflow: "hidden" }}>
        
        {/* ── LEFT PANE: LAYERS & SMART INSPECTOR (~480px) ── */}
        <div
          id="builder-inspector-pane"
          style={{
            width: "480px",
            minWidth: "440px",
            height: "100%",
            minHeight: 0,
            background: "#FFFFFF",
            borderRight: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto"
          }}
        >
          {/* Top Tabs: Layers vs Inspector */}
          <div style={{ padding: "1.25rem 1.25rem 0", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.85rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748B", marginBottom: "0.25rem" }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  value={pageMeta.slug}
                  onChange={(e) => setPageMeta({ ...pageMeta, slug: e.target.value })}
                  className="input-control"
                  style={{ fontSize: "0.78rem", padding: "0.4rem 0.6rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748B", marginBottom: "0.25rem" }}>
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={pageMeta.ctaText}
                  onChange={(e) => setPageMeta({ ...pageMeta, ctaText: e.target.value })}
                  className="input-control"
                  style={{ fontSize: "0.78rem", padding: "0.4rem 0.6rem" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{
                flex: 1,
                padding: "0.6rem 0",
                color: "#2563EB",
                fontWeight: 900,
                fontSize: "0.82rem",
                borderBottom: "2.5px solid #2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <span>Layers ({sections.length}) & Inspector</span>
                <span style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 700 }}>
                  Active: #{sections.findIndex(s => s.id === selectedSectionId) + 1 || 1}
                </span>
              </div>
            </div>
          </div>

          {/* 1. LAYERS LIST (TACTILE DRAG-DROP WITH VISUAL INSERTION LINE) */}
          <div style={{ padding: "1.25rem", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 900, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Page Structure & Reorder
              </span>
              <button
                type="button"
                onClick={() => setIsCatalogOpen(true)}
                style={{
                  border: "none",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <PlusIcon size={12} color="#2563EB" />
                <span>+ Add</span>
              </button>
            </div>

            {/* Drag-and-Drop Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {sections.map((sec, idx) => {
                const isSelected = selectedSectionId === sec.id;
                const isDropTarget = dragOverIndex === idx && draggedIndex !== idx;

                return (
                  <div key={sec.id}>
                    {/* Animated Blue Insertion Indicator Line */}
                    {isDropTarget && (
                      <div style={{ height: "3px", background: "#2563EB", borderRadius: "999px", margin: "2px 0" }} />
                    )}

                    <div
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleSelectSection(sec.id, true)}
                      style={{
                        padding: "0.65rem 0.8rem",
                        borderRadius: "8px",
                        background: isSelected ? "#EFF6FF" : "#FFFFFF",
                        border: isSelected ? "2px solid #2563EB" : "1px solid #E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: isSelected ? "0 2px 8px rgba(37, 99, 235, 0.12)" : "0 1px 2px rgba(0,0,0,0.03)",
                        cursor: "grab",
                        userSelect: "none",
                        opacity: sec.enabled ? 1 : 0.45,
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <GripVerticalIcon size={14} color="#94A3B8" />
                        <span style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "6px",
                          background: isSelected ? "#2563EB" : "#F1F5F9",
                          color: isSelected ? "#FFFFFF" : "#475569",
                          fontSize: "0.7rem",
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          #{idx + 1}
                        </span>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", textTransform: "capitalize" }}>
                            {sec.type} Section
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "#64748B" }}>
                            Theme: {sec.theme || "default"}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => toggleSectionEnabled(sec.id)}
                          style={{ border: "none", background: "transparent", color: sec.enabled ? "#2563EB" : "#94A3B8", cursor: "pointer", padding: "0.2rem" }}
                          title={sec.enabled ? "Disable Section" : "Enable Section"}
                        >
                          <EyeIcon size={13} color="currentColor" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveSection(idx, idx - 1)}
                          disabled={idx === 0}
                          style={{ border: "1px solid #E2E8F0", background: "#FFFFFF", color: idx === 0 ? "#CBD5E1" : "#334155", borderRadius: "5px", padding: "0.2rem 0.35rem", cursor: idx === 0 ? "not-allowed" : "pointer" }}
                          title="Move Up"
                        >
                          <ArrowUpIcon size={11} />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveSection(idx, idx + 1)}
                          disabled={idx === sections.length - 1}
                          style={{ border: "1px solid #E2E8F0", background: "#FFFFFF", color: idx === sections.length - 1 ? "#CBD5E1" : "#334155", borderRadius: "5px", padding: "0.2rem 0.35rem", cursor: idx === sections.length - 1 ? "not-allowed" : "pointer" }}
                          title="Move Down"
                        >
                          <ArrowDownIcon size={11} />
                        </button>

                        <button
                          type="button"
                          onClick={() => duplicateSection(idx)}
                          style={{ border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#2563EB", borderRadius: "5px", padding: "0.2rem 0.35rem", cursor: "pointer" }}
                          title="Duplicate"
                        >
                          <CopyIcon size={11} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteSection(idx)}
                          style={{ border: "none", background: "#FEE2E2", color: "#DC2626", borderRadius: "5px", padding: "0.25rem 0.35rem", cursor: "pointer" }}
                          title="Delete"
                        >
                          <CloseIcon size={11} color="#DC2626" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. SMART INSPECTOR (FOCUSED CONTROLS FOR SELECTED SECTION) */}
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {selectedSection ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <EditIcon size={15} color="#1E40AF" />
                    <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#1E40AF", textTransform: "uppercase" }}>
                      Inspector: {selectedSection.type} Section
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", background: "#EFF6FF", color: "#2563EB", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
                    ID: {selectedSection.id}
                  </span>
                </div>

                {/* INSPECTOR SUB-TABS */}
                <div style={{ display: "flex", background: "#F1F5F9", padding: "0.25rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <button
                    type="button"
                    onClick={() => setInspectorTab("content")}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0",
                      borderRadius: "6px",
                      border: "none",
                      background: inspectorTab === "content" ? "#FFFFFF" : "transparent",
                      color: inspectorTab === "content" ? "#2563EB" : "#64748B",
                      fontWeight: 800,
                      fontSize: "0.74rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.3rem",
                      boxShadow: inspectorTab === "content" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    <TypeIcon size={13} color="currentColor" />
                    <span>Content</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectorTab("typography")}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0",
                      borderRadius: "6px",
                      border: "none",
                      background: inspectorTab === "typography" ? "#FFFFFF" : "transparent",
                      color: inspectorTab === "typography" ? "#2563EB" : "#64748B",
                      fontWeight: 800,
                      fontSize: "0.74rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.3rem",
                      boxShadow: inspectorTab === "typography" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    <PaletteIcon size={13} color="currentColor" />
                    <span>Typography & Colors</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectorTab("media")}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0",
                      borderRadius: "6px",
                      border: "none",
                      background: inspectorTab === "media" ? "#FFFFFF" : "transparent",
                      color: inspectorTab === "media" ? "#2563EB" : "#64748B",
                      fontWeight: 800,
                      fontSize: "0.74rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.3rem",
                      boxShadow: inspectorTab === "media" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    <ImageIcon size={13} color="currentColor" />
                    <span>Photos & Media</span>
                  </button>
                </div>

                {/* TAB 1: CONTENT */}
                {inspectorTab === "content" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {/* THEME PRESETS SELECTOR */}
                    {selectedSection.type === "hero" && (
                      <div style={{ background: "#F8FAFC", padding: "0.75rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.4rem" }}>
                          Hero Theme Preset
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                          {Object.values(HERO_THEMES).map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => updateSectionTheme(selectedSection.id, t.id)}
                              style={{
                                padding: "0.4rem",
                                borderRadius: "6px",
                                border: selectedSection.theme === t.id ? "2px solid #2563EB" : "1px solid #CBD5E1",
                                background: selectedSection.theme === t.id ? "#FFFFFF" : "#F1F5F9",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                color: selectedSection.theme === t.id ? "#2563EB" : "#334155",
                                cursor: "pointer"
                              }}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSection.type === "metrics" && (
                      <div style={{ background: "#F8FAFC", padding: "0.75rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.4rem" }}>
                          Metrics Theme Preset
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
                          {Object.values(METRICS_THEMES).map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => updateSectionTheme(selectedSection.id, t.id)}
                              style={{
                                padding: "0.4rem",
                                borderRadius: "6px",
                                border: selectedSection.theme === t.id ? "2px solid #2563EB" : "1px solid #CBD5E1",
                                background: selectedSection.theme === t.id ? "#FFFFFF" : "#F1F5F9",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                color: selectedSection.theme === t.id ? "#2563EB" : "#334155",
                                cursor: "pointer"
                              }}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSection.type === "cta" && (
                      <div style={{ background: "#F8FAFC", padding: "0.75rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.4rem" }}>
                          CTA Theme Preset
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
                          {Object.values(CTA_THEMES).map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => updateSectionTheme(selectedSection.id, t.id)}
                              style={{
                                padding: "0.4rem",
                                borderRadius: "6px",
                                border: selectedSection.theme === t.id ? "2px solid #2563EB" : "1px solid #CBD5E1",
                                background: selectedSection.theme === t.id ? "#FFFFFF" : "#F1F5F9",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                color: selectedSection.theme === t.id ? "#2563EB" : "#334155",
                                cursor: "pointer"
                              }}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* HERO INPUTS */}
                    {selectedSection.type === "hero" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Badge Text</label>
                          <input
                            type="text"
                            value={selectedSection.content?.badge || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { badge: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Main Headline</label>
                          <input
                            type="text"
                            value={selectedSection.content?.headline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { headline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Sub-headline</label>
                          <textarea
                            rows={2}
                            value={selectedSection.content?.subheadline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { subheadline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Button Label</label>
                          <input
                            type="text"
                            value={selectedSection.content?.ctaText || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { ctaText: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}

                    {/* METRICS INPUTS */}
                    {selectedSection.type === "metrics" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title</label>
                          <input
                            type="text"
                            value={selectedSection.content?.title || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>3 Key Metrics Counters</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
                          {[0, 1, 2].map(mIdx => {
                            const stat = selectedSection.content?.stats?.[mIdx] || { value: "", label: "", subtext: "" };
                            return (
                              <div key={mIdx} style={{ background: "#F8FAFC", padding: "0.5rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={stat.value}
                                  onChange={(e) => {
                                    const stats = [...(selectedSection.content?.stats || [])];
                                    stats[mIdx] = { ...stats[mIdx], value: e.target.value };
                                    updateSectionContent(selectedSection.id, { stats });
                                  }}
                                  className="input-control"
                                  style={{ fontSize: "0.76rem", padding: "0.3rem", marginBottom: "0.3rem" }}
                                />
                                <input
                                  type="text"
                                  placeholder="Label"
                                  value={stat.label}
                                  onChange={(e) => {
                                    const stats = [...(selectedSection.content?.stats || [])];
                                    stats[mIdx] = { ...stats[mIdx], label: e.target.value };
                                    updateSectionContent(selectedSection.id, { stats });
                                  }}
                                  className="input-control"
                                  style={{ fontSize: "0.72rem", padding: "0.25rem" }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* FEATURES & SERVICES INPUTS */}
                    {(selectedSection.type === "features" || selectedSection.type === "services") && (() => {
                      const feats: any[] = selectedSection.content?.items || selectedSection.content?.services || [
                        { title: "Marketplace Operations", desc: "Buy-box defense, listing health, catalog compliance." },
                        { title: "12-State Warehousing", desc: "Bonded regional hubs, 1-day delivery SLAs." },
                        { title: "Escrow Audit", desc: "Automated daily reconciliation of carrier returns & fees." }
                      ];

                      const handleUpdateFeat = (idx: number, key: string, val: string) => {
                        const updated = [...feats];
                        updated[idx] = { ...updated[idx], [key]: val };
                        const fieldName = selectedSection.type === "services" ? "services" : "items";
                        updateSectionContent(selectedSection.id, { [fieldName]: updated });
                      };

                      const handleDeleteFeat = (idx: number) => {
                        const updated = feats.filter((_, i) => i !== idx);
                        const fieldName = selectedSection.type === "services" ? "services" : "items";
                        updateSectionContent(selectedSection.id, { [fieldName]: updated });
                      };

                      const handleAddFeat = () => {
                        if (!newFeatureTitle.trim()) return;
                        const updated = [
                          ...feats,
                          {
                            title: newFeatureTitle.trim(),
                            desc: newFeatureDesc.trim() || "Operational capability details engineered for enterprise scale."
                          }
                        ];
                        const fieldName = selectedSection.type === "services" ? "services" : "items";
                        updateSectionContent(selectedSection.id, { [fieldName]: updated });
                        setNewFeatureTitle("");
                        setNewFeatureDesc("");
                      };

                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title</label>
                            <input
                              type="text"
                              value={selectedSection.content?.title || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                              className="input-control"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Subtitle</label>
                            <input
                              type="text"
                              value={selectedSection.content?.subtitle || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { subtitle: e.target.value })}
                              className="input-control"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                              Feature Cards ({feats.length})
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                              {feats.map((f, fIdx) => (
                                <div key={fIdx} style={{ background: "#F8FAFC", padding: "0.65rem", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#2563EB" }}>Feature #{fIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteFeat(fIdx)}
                                      style={{ border: "none", background: "#FEE2E2", color: "#DC2626", borderRadius: "4px", padding: "0.15rem 0.35rem", cursor: "pointer" }}
                                    >
                                      <CloseIcon size={10} color="#DC2626" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={f.title}
                                    placeholder="Feature title"
                                    onChange={(e) => handleUpdateFeat(fIdx, "title", e.target.value)}
                                    className="input-control"
                                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem" }}
                                  />
                                  <textarea
                                    rows={2}
                                    value={f.desc}
                                    placeholder="Feature description"
                                    onChange={(e) => handleUpdateFeat(fIdx, "desc", e.target.value)}
                                    className="input-control"
                                    style={{ fontSize: "0.74rem", padding: "0.35rem 0.5rem" }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: "#EFF6FF", padding: "0.65rem", borderRadius: "8px", border: "1px solid #BFDBFE", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#1D4ED8" }}>+ Add New Feature Card</span>
                            <input
                              type="text"
                              placeholder="Feature title e.g. 24h Return Triage"
                              value={newFeatureTitle}
                              onChange={(e) => setNewFeatureTitle(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <textarea
                              rows={2}
                              placeholder="Capability description..."
                              value={newFeatureDesc}
                              onChange={(e) => setNewFeatureDesc(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.74rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <button
                              type="button"
                              onClick={handleAddFeat}
                              disabled={!newFeatureTitle.trim()}
                              style={{
                                border: "none",
                                background: newFeatureTitle.trim() ? "#2563EB" : "#94A3B8",
                                color: "#FFFFFF",
                                padding: "0.35rem",
                                borderRadius: "5px",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                cursor: newFeatureTitle.trim() ? "pointer" : "default"
                              }}
                            >
                              Add Feature
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ABOUT INPUTS */}
                    {selectedSection.type === "about" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Badge</label>
                          <input
                            type="text"
                            value={selectedSection.content?.badge || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { badge: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Headline</label>
                          <input
                            type="text"
                            value={selectedSection.content?.headline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { headline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Description</label>
                          <textarea
                            rows={3}
                            value={selectedSection.content?.description || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { description: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}

                    {/* CTA INPUTS */}
                    {selectedSection.type === "cta" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Headline</label>
                          <input
                            type="text"
                            value={selectedSection.content?.headline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { headline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Subtext</label>
                          <input
                            type="text"
                            value={selectedSection.content?.subtext || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { subtext: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Button Label</label>
                          <input
                            type="text"
                            value={selectedSection.content?.buttonText || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { buttonText: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}

                    {/* FAQ INPUTS */}
                    {selectedSection.type === "faq" && (() => {
                      const faqItems: { q: string; a: string }[] = selectedSection.content?.items || [
                        { q: "How quickly can we allocate regional inventory?", a: "Inventory inbound can be completed within 72 hours across all 12 hubs." },
                        { q: "What happens if return rates surge post-festival?", a: "Our QC teams inspect returned appliances within 24 hours to separate restockable units from transit claims." }
                      ];

                      const handleUpdateFaqItem = (idx: number, key: "q" | "a", val: string) => {
                        const updated = [...faqItems];
                        updated[idx] = { ...updated[idx], [key]: val };
                        updateSectionContent(selectedSection.id, { items: updated });
                      };

                      const handleDeleteFaqItem = (idx: number) => {
                        const updated = faqItems.filter((_, i) => i !== idx);
                        updateSectionContent(selectedSection.id, { items: updated });
                      };

                      const handleMoveFaq = (fromIdx: number, toIdx: number) => {
                        if (toIdx < 0 || toIdx >= faqItems.length) return;
                        const updated = [...faqItems];
                        const [moved] = updated.splice(fromIdx, 1);
                        updated.splice(toIdx, 0, moved);
                        updateSectionContent(selectedSection.id, { items: updated });
                      };

                      const handleAddFaqItem = () => {
                        if (!newFaqQ.trim()) return;
                        const updated = [
                          ...faqItems,
                          { q: newFaqQ.trim(), a: newFaqA.trim() || "Operational details provided upon onboarding." }
                        ];
                        updateSectionContent(selectedSection.id, { items: updated });
                        setNewFaqQ("");
                        setNewFaqA("");
                      };

                      const handleImportDbFaq = (dbFaq: any) => {
                        const alreadyExists = faqItems.some(item => item.q.toLowerCase() === dbFaq.question.toLowerCase());
                        if (alreadyExists) return;
                        const updated = [...faqItems, { q: dbFaq.question, a: dbFaq.answer }];
                        updateSectionContent(selectedSection.id, { items: updated });
                      };

                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>FAQ Section Title</label>
                            <input
                              type="text"
                              value={selectedSection.content?.title || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                              className="input-control"
                              placeholder="e.g. Frequently Asked Questions"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>

                          {/* Global Database FAQs Import Drawer */}
                          <div style={{ background: "#F0FDF4", padding: "0.75rem", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <FaqIcon size={14} color="#16A34A" />
                                <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#166534" }}>
                                  Database FAQs ({faqs.length})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsFaqDbPickerOpen(!isFaqDbPickerOpen)}
                                style={{
                                  border: "none",
                                  background: "#DCFCE7",
                                  color: "#15803D",
                                  padding: "0.25rem 0.6rem",
                                  borderRadius: "6px",
                                  fontSize: "0.72rem",
                                  fontWeight: 800,
                                  cursor: "pointer"
                                }}
                              >
                                {isFaqDbPickerOpen ? "Hide Database" : "Browse & Insert"}
                              </button>
                            </div>

                            {isFaqDbPickerOpen && (
                              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "180px", overflowY: "auto" }}>
                                {faqs.map(f => {
                                  const isAdded = faqItems.some(it => it.q.toLowerCase() === f.question.toLowerCase());
                                  return (
                                    <div
                                      key={f.id}
                                      style={{
                                        background: "#FFFFFF",
                                        padding: "0.5rem 0.65rem",
                                        borderRadius: "6px",
                                        border: "1px solid #E2E8F0",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "0.5rem"
                                      }}
                                    >
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                          {f.question}
                                        </div>
                                        <div style={{ fontSize: "0.66rem", color: "#64748B" }}>
                                          {f.category}
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        disabled={isAdded}
                                        onClick={() => handleImportDbFaq(f)}
                                        style={{
                                          border: "none",
                                          background: isAdded ? "#F1F5F9" : "#2563EB",
                                          color: isAdded ? "#94A3B8" : "#FFFFFF",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "4px",
                                          fontSize: "0.68rem",
                                          fontWeight: 800,
                                          cursor: isAdded ? "default" : "pointer"
                                        }}
                                      >
                                        {isAdded ? "Added ✓" : "+ Insert"}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* List of active FAQ Questions */}
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#334155" }}>
                                Page FAQ Items ({faqItems.length})
                              </label>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                              {faqItems.map((item, qIdx) => (
                                <div
                                  key={qIdx}
                                  style={{
                                    background: "#F8FAFC",
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    border: "1px solid #E2E8F0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.45rem"
                                  }}
                                >
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#2563EB" }}>
                                      Question #{qIdx + 1}
                                    </span>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                      <button
                                        type="button"
                                        disabled={qIdx === 0}
                                        onClick={() => handleMoveFaq(qIdx, qIdx - 1)}
                                        style={{ border: "none", background: "transparent", color: qIdx === 0 ? "#CBD5E1" : "#475569", cursor: qIdx === 0 ? "default" : "pointer", padding: "0.15rem" }}
                                        title="Move Up"
                                      >
                                        <ArrowUpIcon size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={qIdx === faqItems.length - 1}
                                        onClick={() => handleMoveFaq(qIdx, qIdx + 1)}
                                        style={{ border: "none", background: "transparent", color: qIdx === faqItems.length - 1 ? "#CBD5E1" : "#475569", cursor: qIdx === faqItems.length - 1 ? "default" : "pointer", padding: "0.15rem" }}
                                        title="Move Down"
                                      >
                                        <ArrowDownIcon size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteFaqItem(qIdx)}
                                        style={{ border: "none", background: "#FEE2E2", color: "#DC2626", borderRadius: "4px", padding: "0.2rem 0.35rem", cursor: "pointer" }}
                                        title="Delete Question"
                                      >
                                        <CloseIcon size={10} color="#DC2626" />
                                      </button>
                                    </div>
                                  </div>

                                  <input
                                    type="text"
                                    value={item.q}
                                    onChange={(e) => handleUpdateFaqItem(qIdx, "q", e.target.value)}
                                    className="input-control"
                                    placeholder="Enter question"
                                    style={{ fontSize: "0.78rem", padding: "0.4rem 0.6rem" }}
                                  />

                                  <textarea
                                    rows={2}
                                    value={item.a}
                                    onChange={(e) => handleUpdateFaqItem(qIdx, "a", e.target.value)}
                                    className="input-control"
                                    placeholder="Enter answer"
                                    style={{ fontSize: "0.76rem", padding: "0.4rem 0.6rem" }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Add New Custom FAQ Form */}
                          <div style={{ background: "#EFF6FF", padding: "0.75rem", borderRadius: "8px", border: "1px solid #BFDBFE" }}>
                            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#1E40AF", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <PlusIcon size={12} color="#1E40AF" />
                              <span>Add New FAQ Question</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                              <input
                                type="text"
                                placeholder="Question e.g. What is the SLA guarantee?"
                                value={newFaqQ}
                                onChange={(e) => setNewFaqQ(e.target.value)}
                                className="input-control"
                                style={{ fontSize: "0.76rem", padding: "0.35rem 0.55rem", background: "#FFFFFF" }}
                              />
                              <textarea
                                rows={2}
                                placeholder="Answer explanation..."
                                value={newFaqA}
                                onChange={(e) => setNewFaqA(e.target.value)}
                                className="input-control"
                                style={{ fontSize: "0.76rem", padding: "0.35rem 0.55rem", background: "#FFFFFF" }}
                              />
                              <button
                                type="button"
                                onClick={handleAddFaqItem}
                                disabled={!newFaqQ.trim()}
                                style={{
                                  border: "none",
                                  background: newFaqQ.trim() ? "#2563EB" : "#94A3B8",
                                  color: "#FFFFFF",
                                  padding: "0.4rem 0.8rem",
                                  borderRadius: "6px",
                                  fontSize: "0.74rem",
                                  fontWeight: 800,
                                  cursor: newFaqQ.trim() ? "pointer" : "default",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "0.3rem"
                                }}
                              >
                                <PlusIcon size={12} color="#FFFFFF" />
                                <span>+ Add Question to Accordion</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* GALLERY / PARTNERS & BRANDS INPUTS */}
                    {selectedSection.type === "gallery" && (() => {
                      const brandList: string[] = selectedSection.content?.brands || [
                        "Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware", "Amazon", "Flipkart"
                      ];

                      const appliancePresets = [
                        "Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware",
                        "Bajaj", "Philips", "Bosch", "IFB", "Samsung", "LG", "Voltas", "Blue Star", "Whirlpool"
                      ];

                      const marketplacePresets = [
                        "Amazon", "Flipkart", "Blinkit", "Zepto", "Swiggy Instamart", "BigBasket", "JioMart"
                      ];

                      const handleAddBrand = (name: string) => {
                        const trimmed = name.trim();
                        if (!trimmed) return;
                        if (brandList.some(b => b.toLowerCase() === trimmed.toLowerCase())) return;
                        const updated = [...brandList, trimmed];
                        updateSectionContent(selectedSection.id, { brands: updated });
                        setNewBrandInput("");
                      };

                      const handleRemoveBrand = (idx: number) => {
                        const updated = brandList.filter((_, i) => i !== idx);
                        updateSectionContent(selectedSection.id, { brands: updated });
                      };

                      const handleSyncDbBrands = () => {
                        const dbBrandNames = brands.filter(b => b.isActive).map(b => b.name);
                        const merged = Array.from(new Set([...brandList, ...dbBrandNames]));
                        updateSectionContent(selectedSection.id, { brands: merged });
                      };

                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title / Headline</label>
                            <input
                              type="text"
                              value={selectedSection.content?.title || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                              className="input-control"
                              placeholder="Operating Across India's Top Marketplaces & Leading Brands"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>

                          {/* Active Brand Pills */}
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#334155" }}>
                                Active Brand Tags ({brandList.length})
                              </label>
                              <button
                                type="button"
                                onClick={handleSyncDbBrands}
                                style={{
                                  border: "none",
                                  background: "#EFF6FF",
                                  color: "#2563EB",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "4px",
                                  fontSize: "0.68rem",
                                  fontWeight: 800,
                                  cursor: "pointer"
                                }}
                                title="Import all active brands from the Database"
                              >
                                Sync from DB Brands ({brands.length})
                              </button>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", background: "#F8FAFC", padding: "0.65rem", borderRadius: "8px", border: "1px solid #E2E8F0", minHeight: "50px" }}>
                              {brandList.map((brandName, bIdx) => (
                                <span
                                  key={bIdx}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.35rem",
                                    background: "#FFFFFF",
                                    border: "1px solid #CBD5E1",
                                    borderRadius: "6px",
                                    padding: "0.25rem 0.55rem",
                                    fontSize: "0.76rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                                  }}
                                >
                                  <span>{brandName}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveBrand(bIdx)}
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      cursor: "pointer",
                                      color: "#94A3B8",
                                      padding: "0 0.1rem",
                                      display: "flex",
                                      alignItems: "center"
                                    }}
                                    title={`Remove ${brandName}`}
                                  >
                                    <CloseIcon size={10} color="#DC2626" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Add Custom Brand Input */}
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569", marginBottom: "0.25rem", display: "block" }}>
                              Add Brand Name
                            </label>
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <input
                                type="text"
                                placeholder="e.g. Panasonic, Dyson, Voltas..."
                                value={newBrandInput}
                                onChange={(e) => setNewBrandInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddBrand(newBrandInput);
                                  }
                                }}
                                className="input-control"
                                style={{ flex: 1, fontSize: "0.78rem", padding: "0.4rem 0.6rem" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleAddBrand(newBrandInput)}
                                disabled={!newBrandInput.trim()}
                                style={{
                                  border: "none",
                                  background: newBrandInput.trim() ? "#2563EB" : "#94A3B8",
                                  color: "#FFFFFF",
                                  padding: "0.4rem 0.85rem",
                                  borderRadius: "6px",
                                  fontSize: "0.75rem",
                                  fontWeight: 800,
                                  cursor: newBrandInput.trim() ? "pointer" : "default"
                                }}
                              >
                                + Add
                              </button>
                            </div>
                          </div>

                          {/* Appliance Presets */}
                          <div>
                            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>
                              Quick-Add Appliances & Consumer Durables
                            </span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                              {appliancePresets.map(preset => {
                                const isAdded = brandList.some(b => b.toLowerCase() === preset.toLowerCase());
                                return (
                                  <button
                                    key={preset}
                                    type="button"
                                    disabled={isAdded}
                                    onClick={() => handleAddBrand(preset)}
                                    style={{
                                      padding: "0.25rem 0.55rem",
                                      borderRadius: "6px",
                                      border: isAdded ? "1px solid #E2E8F0" : "1px solid #93C5FD",
                                      background: isAdded ? "#F8FAFC" : "#EFF6FF",
                                      color: isAdded ? "#94A3B8" : "#1D4ED8",
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      cursor: isAdded ? "default" : "pointer"
                                    }}
                                  >
                                    {preset} {isAdded && "✓"}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Marketplace Presets */}
                          <div>
                            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>
                              Quick-Add Marketplaces & Quick-Commerce
                            </span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                              {marketplacePresets.map(preset => {
                                const isAdded = brandList.some(b => b.toLowerCase() === preset.toLowerCase());
                                return (
                                  <button
                                    key={preset}
                                    type="button"
                                    disabled={isAdded}
                                    onClick={() => handleAddBrand(preset)}
                                    style={{
                                      padding: "0.25rem 0.55rem",
                                      borderRadius: "6px",
                                      border: isAdded ? "1px solid #E2E8F0" : "1px solid #FED7AA",
                                      background: isAdded ? "#F8FAFC" : "#FFF7ED",
                                      color: isAdded ? "#94A3B8" : "#C2410C",
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      cursor: isAdded ? "default" : "pointer"
                                    }}
                                  >
                                    {preset} {isAdded && "✓"}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* TEAM MEMBERS INPUTS */}
                    {selectedSection.type === "team" && (() => {
                      const members: any[] = selectedSection.content?.members || [
                        { name: "Harish Gupta", role: "Managing Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
                        { name: "Sanjay Singhal", role: "Head of Logistics", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
                        { name: "Priya Venkatesh", role: "VP Marketplace Growth", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" }
                      ];

                      const handleUpdateMember = (idx: number, key: string, val: string) => {
                        const updated = [...members];
                        updated[idx] = { ...updated[idx], [key]: val };
                        updateSectionContent(selectedSection.id, { members: updated });
                      };

                      const handleDeleteMember = (idx: number) => {
                        const updated = members.filter((_, i) => i !== idx);
                        updateSectionContent(selectedSection.id, { members: updated });
                      };

                      const handleAddMember = () => {
                        if (!newTeamName.trim()) return;
                        const updated = [
                          ...members,
                          {
                            name: newTeamName.trim(),
                            role: newTeamRole.trim() || "Operations Lead",
                            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                          }
                        ];
                        updateSectionContent(selectedSection.id, { members: updated });
                        setNewTeamName("");
                        setNewTeamRole("");
                      };

                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title</label>
                            <input
                              type="text"
                              value={selectedSection.content?.title || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                              className="input-control"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                              Team Members ({members.length})
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                              {members.map((m, mIdx) => (
                                <div key={mIdx} style={{ background: "#F8FAFC", padding: "0.65rem", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#4F46E5" }}>Member #{mIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteMember(mIdx)}
                                      style={{ border: "none", background: "#FEE2E2", color: "#DC2626", borderRadius: "4px", padding: "0.15rem 0.35rem", cursor: "pointer" }}
                                    >
                                      <CloseIcon size={10} color="#DC2626" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={m.name}
                                    placeholder="Name"
                                    onChange={(e) => handleUpdateMember(mIdx, "name", e.target.value)}
                                    className="input-control"
                                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem" }}
                                  />
                                  <input
                                    type="text"
                                    value={m.role}
                                    placeholder="Role / Title"
                                    onChange={(e) => handleUpdateMember(mIdx, "role", e.target.value)}
                                    className="input-control"
                                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem" }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: "#EEF2FF", padding: "0.65rem", borderRadius: "8px", border: "1px solid #C7D2FE", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3730A3" }}>+ Add Team Member</span>
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={newTeamName}
                              onChange={(e) => setNewTeamName(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <input
                              type="text"
                              placeholder="Role e.g. VP Logistics"
                              value={newTeamRole}
                              onChange={(e) => setNewTeamRole(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <button
                              type="button"
                              onClick={handleAddMember}
                              disabled={!newTeamName.trim()}
                              style={{
                                border: "none",
                                background: newTeamName.trim() ? "#4F46E5" : "#94A3B8",
                                color: "#FFFFFF",
                                padding: "0.35rem",
                                borderRadius: "5px",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                cursor: newTeamName.trim() ? "pointer" : "default"
                              }}
                            >
                              Add Member
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* TESTIMONIALS & REVIEWS INPUTS */}
                    {(selectedSection.type === "testimonials" || selectedSection.type === "reviews") && (() => {
                      const testimonials: any[] = selectedSection.content?.testimonials || [
                        { quote: "Good Life transformed our regional fulfillment. Next-day dispatch increased from 62% to 99.4%.", author: "VP Operations", brand: "Major Kitchen Appliance Brand" },
                        { quote: "Zero stockouts during the festive Great Indian Festival. Handled 4.8x normal volume effortlessly.", author: "Head of D2C", brand: "Leading Consumer Durables OEM" }
                      ];

                      const handleUpdateTestimonial = (idx: number, key: string, val: string) => {
                        const updated = [...testimonials];
                        updated[idx] = { ...updated[idx], [key]: val };
                        updateSectionContent(selectedSection.id, { testimonials: updated });
                      };

                      const handleDeleteTestimonial = (idx: number) => {
                        const updated = testimonials.filter((_, i) => i !== idx);
                        updateSectionContent(selectedSection.id, { testimonials: updated });
                      };

                      const handleAddTestimonial = () => {
                        if (!newTestimonialQuote.trim()) return;
                        const updated = [
                          ...testimonials,
                          {
                            quote: newTestimonialQuote.trim(),
                            author: newTestimonialAuthor.trim() || "Commercial Director",
                            brand: "Verified Appliance Brand"
                          }
                        ];
                        updateSectionContent(selectedSection.id, { testimonials: updated });
                        setNewTestimonialQuote("");
                        setNewTestimonialAuthor("");
                      };

                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title</label>
                            <input
                              type="text"
                              value={selectedSection.content?.title || ""}
                              onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                              className="input-control"
                              style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                              Testimonials ({testimonials.length})
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                              {testimonials.map((t, tIdx) => (
                                <div key={tIdx} style={{ background: "#F8FAFC", padding: "0.65rem", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#0284C7" }}>Testimonial #{tIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTestimonial(tIdx)}
                                      style={{ border: "none", background: "#FEE2E2", color: "#DC2626", borderRadius: "4px", padding: "0.15rem 0.35rem", cursor: "pointer" }}
                                    >
                                      <CloseIcon size={10} color="#DC2626" />
                                    </button>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={t.quote}
                                    placeholder="Quote endorsement..."
                                    onChange={(e) => handleUpdateTestimonial(tIdx, "quote", e.target.value)}
                                    className="input-control"
                                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem" }}
                                  />
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem" }}>
                                    <input
                                      type="text"
                                      value={t.author}
                                      placeholder="Author"
                                      onChange={(e) => handleUpdateTestimonial(tIdx, "author", e.target.value)}
                                      className="input-control"
                                      style={{ fontSize: "0.72rem", padding: "0.3rem 0.4rem" }}
                                    />
                                    <input
                                      type="text"
                                      value={t.brand}
                                      placeholder="Brand / Company"
                                      onChange={(e) => handleUpdateTestimonial(tIdx, "brand", e.target.value)}
                                      className="input-control"
                                      style={{ fontSize: "0.72rem", padding: "0.3rem 0.4rem" }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: "#F0F9FF", padding: "0.65rem", borderRadius: "8px", border: "1px solid #BAE6FD", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0369A1" }}>+ Add Testimonial</span>
                            <textarea
                              rows={2}
                              placeholder="Client feedback quote..."
                              value={newTestimonialQuote}
                              onChange={(e) => setNewTestimonialQuote(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <input
                              type="text"
                              placeholder="Author / Designation"
                              value={newTestimonialAuthor}
                              onChange={(e) => setNewTestimonialAuthor(e.target.value)}
                              className="input-control"
                              style={{ fontSize: "0.76rem", padding: "0.35rem 0.5rem", background: "#FFFFFF" }}
                            />
                            <button
                              type="button"
                              onClick={handleAddTestimonial}
                              disabled={!newTestimonialQuote.trim()}
                              style={{
                                border: "none",
                                background: newTestimonialQuote.trim() ? "#0284C7" : "#94A3B8",
                                color: "#FFFFFF",
                                padding: "0.35rem",
                                borderRadius: "5px",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                cursor: newTestimonialQuote.trim() ? "pointer" : "default"
                              }}
                            >
                              Add Testimonial
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* OFFERS INPUTS */}
                    {selectedSection.type === "offers" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Offer Headline</label>
                          <input
                            type="text"
                            value={selectedSection.content?.headline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { headline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Offer Subtext</label>
                          <textarea
                            rows={2}
                            value={selectedSection.content?.subtext || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { subtext: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}

                    {/* FORM INPUTS */}
                    {selectedSection.type === "form" && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Form Title</label>
                          <input
                            type="text"
                            value={selectedSection.content?.title || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Subtitle</label>
                          <input
                            type="text"
                            value={selectedSection.content?.subtitle || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { subtitle: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Campaign Tag</label>
                          <input
                            type="text"
                            value={selectedSection.content?.campaignTag || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { campaignTag: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}

                    {/* GENERIC TITLE INPUT FOR REMAINING SECTIONS */}
                    {!["hero", "metrics", "features", "services", "about", "cta", "faq", "gallery", "team", "testimonials", "reviews", "offers", "form"].includes(selectedSection.type) && (
                      <>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Section Title / Headline</label>
                          <input
                            type="text"
                            value={selectedSection.content?.title || selectedSection.content?.headline || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { title: e.target.value, headline: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>Subtitle / Description</label>
                          <textarea
                            rows={2}
                            value={selectedSection.content?.subtitle || selectedSection.content?.subtext || selectedSection.content?.description || ""}
                            onChange={(e) => updateSectionContent(selectedSection.id, { subtitle: e.target.value, subtext: e.target.value, description: e.target.value })}
                            className="input-control"
                            style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem" }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* TAB 2: TYPOGRAPHY & COLORS */}
                {inspectorTab === "typography" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
                    {/* Font Family Selection */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                        Font Family
                      </label>
                      <select
                        value={selectedSection.typography?.fontFamily || FONT_OPTIONS[0].id}
                        onChange={(e) => updateSectionTypography(selectedSection.id, { fontFamily: e.target.value })}
                        className="input-control"
                        style={{ fontSize: "0.8rem", padding: "0.45rem 0.65rem", background: "#FFFFFF" }}
                      >
                        {FONT_OPTIONS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Scale Buttons */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                        Font Size Scale
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.3rem" }}>
                        {(["compact", "normal", "large", "hero"] as const).map((scale) => {
                          const isCur = (selectedSection.typography?.fontSizeScale || "normal") === scale;
                          return (
                            <button
                              key={scale}
                              type="button"
                              onClick={() => updateSectionTypography(selectedSection.id, { fontSizeScale: scale })}
                              style={{
                                padding: "0.35rem 0",
                                borderRadius: "6px",
                                border: isCur ? "2px solid #2563EB" : "1px solid #CBD5E1",
                                background: isCur ? "#EFF6FF" : "#FFFFFF",
                                color: isCur ? "#2563EB" : "#475569",
                                fontWeight: 800,
                                fontSize: "0.7rem",
                                textTransform: "capitalize",
                                cursor: "pointer"
                              }}
                            >
                              {scale}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Font Weight Buttons */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                        Font Weight
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.3rem" }}>
                        {(["normal", "semibold", "bold", "black"] as const).map((weight) => {
                          const isCur = (selectedSection.typography?.fontWeight || "bold") === weight;
                          return (
                            <button
                              key={weight}
                              type="button"
                              onClick={() => updateSectionTypography(selectedSection.id, { fontWeight: weight })}
                              style={{
                                padding: "0.35rem 0",
                                borderRadius: "6px",
                                border: isCur ? "2px solid #2563EB" : "1px solid #CBD5E1",
                                background: isCur ? "#EFF6FF" : "#FFFFFF",
                                color: isCur ? "#2563EB" : "#475569",
                                fontWeight: weight === "black" ? 900 : weight === "bold" ? 700 : 600,
                                fontSize: "0.7rem",
                                textTransform: "capitalize",
                                cursor: "pointer"
                              }}
                            >
                              {weight}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Headline Color Swatches */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                        <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#475569" }}>Headline Color</label>
                        <span style={{ fontSize: "0.68rem", color: "#64748B", fontFamily: "monospace" }}>
                          {selectedSection.typography?.headlineColor || "Theme default"}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                        {COLOR_SWATCHES.map((sw) => (
                          <div
                            key={sw.hex}
                            onClick={() => updateSectionTypography(selectedSection.id, { headlineColor: sw.hex })}
                            title={sw.label}
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "6px",
                              background: sw.hex,
                              border: selectedSection.typography?.headlineColor === sw.hex ? "2px solid #2563EB" : "1px solid #CBD5E1",
                              cursor: "pointer",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                            }}
                          />
                        ))}
                        <input
                          type="color"
                          value={selectedSection.typography?.headlineColor || "#0F172A"}
                          onChange={(e) => updateSectionTypography(selectedSection.id, { headlineColor: e.target.value })}
                          style={{ width: "26px", height: "26px", padding: 0, border: "none", borderRadius: "6px", cursor: "pointer" }}
                          title="Custom Color Picker"
                        />
                      </div>
                    </div>

                    {/* Subtext Color Swatches */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                        <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#475569" }}>Subtext Color</label>
                        <span style={{ fontSize: "0.68rem", color: "#64748B", fontFamily: "monospace" }}>
                          {selectedSection.typography?.subtextColor || "Theme default"}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                        {COLOR_SWATCHES.map((sw) => (
                          <div
                            key={sw.hex}
                            onClick={() => updateSectionTypography(selectedSection.id, { subtextColor: sw.hex })}
                            title={sw.label}
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "6px",
                              background: sw.hex,
                              border: selectedSection.typography?.subtextColor === sw.hex ? "2px solid #2563EB" : "1px solid #CBD5E1",
                              cursor: "pointer",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                            }}
                          />
                        ))}
                        <input
                          type="color"
                          value={selectedSection.typography?.subtextColor || "#475569"}
                          onChange={(e) => updateSectionTypography(selectedSection.id, { subtextColor: e.target.value })}
                          style={{ width: "26px", height: "26px", padding: 0, border: "none", borderRadius: "6px", cursor: "pointer" }}
                          title="Custom Color Picker"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PHOTOS & MEDIA */}
                {inspectorTab === "media" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                        Image / Photo URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={selectedSection.content?.imageUrl || ""}
                        onChange={(e) => updateSectionContent(selectedSection.id, { imageUrl: e.target.value })}
                        className="input-control"
                        style={{ fontSize: "0.78rem", padding: "0.45rem 0.65rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                        Floating Badge Text (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12-State Fulfillment Hub"
                        value={selectedSection.content?.imageBadge || ""}
                        onChange={(e) => updateSectionContent(selectedSection.id, { imageBadge: e.target.value })}
                        className="input-control"
                        style={{ fontSize: "0.78rem", padding: "0.45rem 0.65rem" }}
                      />
                    </div>

                    {/* Quick Preset Stock Photos */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.45rem" }}>
                        Quick Stock Presets (Click to Apply)
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        {SAMPLE_PHOTOS.map((ph, pIdx) => {
                          const isCur = selectedSection.content?.imageUrl === ph.url;
                          return (
                            <div
                              key={pIdx}
                              onClick={() => updateSectionContent(selectedSection.id, { imageUrl: ph.url, imageBadge: ph.label })}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                padding: "0.4rem 0.6rem",
                                borderRadius: "8px",
                                border: isCur ? "2px solid #2563EB" : "1px solid #E2E8F0",
                                background: isCur ? "#EFF6FF" : "#FFFFFF",
                                cursor: "pointer",
                                transition: "all 0.15s ease"
                              }}
                            >
                              <img
                                src={ph.url}
                                alt={ph.label}
                                style={{ width: "38px", height: "38px", borderRadius: "6px", objectFit: "cover" }}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "0.74rem", fontWeight: 800, color: isCur ? "#2563EB" : "#0F172A" }}>
                                  {ph.label}
                                </div>
                                <div style={{ fontSize: "0.66rem", color: "#64748B" }}>
                                  {isCur ? "Active on section" : "Click to select"}
                                </div>
                              </div>
                              {isCur && <CheckCircleIcon size={14} color="#2563EB" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {selectedSection.content?.imageUrl && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, color: "#475569", marginBottom: "0.35rem" }}>
                          Live Image Preview
                        </label>
                        <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0", maxHeight: "160px" }}>
                          <img
                            src={selectedSection.content.imageUrl}
                            alt="Section preview"
                            style={{ width: "100%", height: "140px", objectFit: "cover" }}
                          />
                          <button
                            type="button"
                            onClick={() => updateSectionContent(selectedSection.id, { imageUrl: "" })}
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "6px",
                              background: "rgba(220, 38, 38, 0.9)",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "4px",
                              padding: "0.2rem 0.5rem",
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              cursor: "pointer"
                            }}
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#64748B" }}>
                Click any section on the canvas or in the layers list to inspect and style it.
              </div>
            )}
          </div>
        </div>

        {/* ── CENTER / RIGHT PANE: INTERACTIVE LIVE CANVAS ── */}
        <div
          id="canvas-scroll-viewport"
          style={{
            flex: 1,
            height: "100%",
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            background: "#E2E8F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1.5rem 10rem"
          }}
        >
          {/* Viewport Meta Bar */}
          <div style={{
            width: getCanvasWidth(),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
            transition: "width 0.25s ease"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.74rem", color: "#15803D", fontWeight: 800 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
              <span>Interactive Page Canvas: Click any section to inspect, drag or style</span>
            </div>

            <span style={{ fontSize: "0.72rem", color: "#475569", background: "#FFFFFF", padding: "0.2rem 0.6rem", borderRadius: "6px", border: "1px solid #CBD5E1", fontWeight: 700 }}>
              {getCanvasWidth()} Viewport
            </span>
          </div>

          {/* Viewport Device Frame */}
          <div style={{
            width: getCanvasWidth(),
            minHeight: "920px",
            background: "#FFFFFF",
            borderRadius: previewDevice === "mobile" ? "28px" : previewDevice === "tablet" ? "16px" : "12px",
            border: "1px solid #CBD5E1",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.25s ease"
          }}>
            {/* Top Mock Header */}
            <div style={{
              padding: "0.85rem 1.5rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#FFFFFF"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontWeight: 900, color: "#2563EB", fontSize: "0.95rem" }}>GOOD LIFE</span>
                <span style={{ fontSize: "0.62rem", background: "#EFF6FF", color: "#2563EB", padding: "0.15rem 0.4rem", borderRadius: "4px", fontWeight: 800 }}>SUTRA</span>
              </div>
              <span style={{ fontSize: "0.72rem", background: "#2563EB", color: "#FFFFFF", padding: "0.35rem 0.8rem", borderRadius: "6px", fontWeight: 700 }}>
                Diagnostic Audit
              </span>
            </div>

            {/* Render Sequential Sections with SectionRenderer */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {sections
                .sort((a, b) => a.order - b.order)
                .map((sec, idx) => (
                  <SectionRenderer
                    key={sec.id}
                    section={sec}
                    index={idx}
                    totalSections={sections.length}
                    isSelected={selectedSectionId === sec.id}
                    isBuilder={true}
                    previewDevice={previewDevice}
                    onSelect={(id) => setSelectedSectionId(id)}
                    onMoveUp={(index) => moveSection(index, index - 1)}
                    onMoveDown={(index) => moveSection(index, index + 1)}
                    onDuplicate={(index) => duplicateSection(index)}
                    onDelete={(index) => deleteSection(index)}
                  />
                ))}
            </div>

            {/* On-Canvas Add Section Bar */}
            <div style={{ padding: "2rem 1.5rem", background: "#F8FAFC", borderTop: "1px dashed #CBD5E1", textAlign: "center" }}>
              <button
                type="button"
                onClick={() => setIsCatalogOpen(true)}
                style={{
                  padding: "0.75rem 1.75rem",
                  borderRadius: "10px",
                  border: "2px dashed #93C5FD",
                  background: "#EFF6FF",
                  color: "#1D4ED8",
                  fontSize: "0.84rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  boxShadow: "0 2px 6px rgba(37, 99, 235, 0.06)"
                }}
              >
                <PlusIcon size={16} color="#1D4ED8" />
                <span>+ Add Section to Page</span>
              </button>
            </div>

            {/* Mock Footer */}
            <div style={{
              padding: "1.25rem",
              background: "#0B132B",
              color: "#94A3B8",
              fontSize: "0.72rem",
              textAlign: "center",
              marginTop: "auto"
            }}>
              © 2026 Good Life Sutra Pvt. Ltd. Enterprise Commerce Partner.
            </div>
          </div>
        </div>

        {/* Global Scrollbar CSS for Canvas and Inspector */}
        <style dangerouslySetInnerHTML={{
          __html: `
            #canvas-scroll-viewport::-webkit-scrollbar {
              width: 12px;
            }
            #canvas-scroll-viewport::-webkit-scrollbar-track {
              background: #CBD5E1;
            }
            #canvas-scroll-viewport::-webkit-scrollbar-thumb {
              background: #64748B;
              border-radius: 6px;
              border: 2px solid #CBD5E1;
            }
            #canvas-scroll-viewport::-webkit-scrollbar-thumb:hover {
              background: #475569;
            }
            #builder-inspector-pane::-webkit-scrollbar {
              width: 8px;
            }
            #builder-inspector-pane::-webkit-scrollbar-track {
              background: #F1F5F9;
            }
            #builder-inspector-pane::-webkit-scrollbar-thumb {
              background: #CBD5E1;
              border-radius: 4px;
            }
            #builder-inspector-pane::-webkit-scrollbar-thumb:hover {
              background: #94A3B8;
            }
          `
        }} />

      </div>

      {/* ── SECTION CATALOG MODAL (+ Add Section) ── */}
      {isCatalogOpen && (() => {
        const filteredSections = AVAILABLE_CATALOG_SECTIONS.filter(cat => {
          if (!catalogSearch.trim()) return true;
          const q = catalogSearch.toLowerCase();
          return cat.label.toLowerCase().includes(q) || cat.desc.toLowerCase().includes(q) || (cat.category && cat.category.toLowerCase().includes(q));
        });

        return (
          <div className="modal-overlay" style={{ zIndex: 1000 }}>
            <div className="modal-card" style={{ maxWidth: "860px", maxHeight: "85vh", display: "flex", flexDirection: "column", padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                    Section Library Catalog ({AVAILABLE_CATALOG_SECTIONS.length} Sections)
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "0.15rem" }}>
                    Select any pre-engineered module to insert directly into your live page canvas
                  </div>
                </div>
                <button
                  onClick={() => { setIsCatalogOpen(false); setCatalogSearch(""); }}
                  style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94A3B8" }}
                >
                  <CloseIcon size={20} color="#94A3B8" />
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Search 28 sections... (e.g. hero, pricing, reviews, map, team, stats)"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="input-control"
                  style={{ fontSize: "0.85rem", padding: "0.55rem 0.85rem" }}
                  autoFocus
                />
              </div>

              {/* 2-Column Catalog Grid */}
              <div style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", paddingRight: "0.35rem" }}>
                {filteredSections.map((cat) => (
                  <div
                    key={cat.type}
                    onClick={() => {
                      addSectionFromCatalog(cat.type);
                      setCatalogSearch("");
                    }}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid #E2E8F0",
                      background: "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB";
                      e.currentTarget.style.background = "#EFF6FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E2E8F0";
                      e.currentTarget.style.background = "#FFFFFF";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <cat.icon size={18} color={cat.color} />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontWeight: 800, fontSize: "0.86rem", color: "#0F172A" }}>
                            {cat.label}
                          </span>
                          {cat.category && (
                            <span style={{ fontSize: "0.64rem", color: "#64748B", background: "#F1F5F9", padding: "0.1rem 0.35rem", borderRadius: "4px", fontWeight: 700 }}>
                              {cat.category}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.2rem", lineHeight: 1.35 }}>
                          {cat.desc}
                        </div>
                      </div>
                    </div>

                    <span style={{
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      color: "#2563EB",
                      background: "#EFF6FF",
                      padding: "0.35rem 0.65rem",
                      borderRadius: "6px",
                      flexShrink: 0
                    }}>
                      + Insert
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default function LandingPageBuilderPage() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center", color: "#FFFFFF" }}>Loading Real Visual Page Studio...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
