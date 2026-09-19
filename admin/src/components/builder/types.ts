export type SectionType =
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

export interface SectionTypography {
  fontFamily?: string;
  headlineColor?: string;
  subtextColor?: string;
  fontSizeScale?: "compact" | "normal" | "large" | "hero";
  fontWeight?: "normal" | "semibold" | "bold" | "black";
}

export interface PageSection {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  content: Record<string, any>;
  theme?: string;
  typography?: SectionTypography;
}

export const FONT_OPTIONS = [
  { id: "var(--font-outfit, 'Outfit', sans-serif)", label: "Outfit (Modern Display)", family: "'Outfit', sans-serif" },
  { id: "var(--font-inter, 'Inter', sans-serif)", label: "Inter (Clean Neutral)", family: "'Inter', sans-serif" },
  { id: "'Plus Jakarta Sans', sans-serif", label: "Plus Jakarta Sans (Corporate)", family: "'Plus Jakarta Sans', sans-serif" },
  { id: "'Playfair Display', Georgia, serif", label: "Playfair Display (Luxury Editorial)", family: "'Playfair Display', serif" },
  { id: "'JetBrains Mono', monospace", label: "JetBrains Mono (Technical)", family: "'JetBrains Mono', monospace" }
];

export const COLOR_SWATCHES = [
  { label: "Dark Slate", hex: "#0F172A" },
  { label: "Royal Blue", hex: "#2563EB" },
  { label: "Deep Navy", hex: "#1E3A8A" },
  { label: "Emerald Green", hex: "#059669" },
  { label: "Cyan Sky", hex: "#0284C7" },
  { label: "Amber Orange", hex: "#D97706" },
  { label: "Rose Crimson", hex: "#E11D48" },
  { label: "Pure White", hex: "#FFFFFF" },
  { label: "Muted Slate", hex: "#64748B" }
];

export const SAMPLE_PHOTOS = [
  { label: "Regional Hub Warehouse", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80" },
  { label: "Modern Kitchen Appliances", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&auto=format&fit=crop&q=80" },
  { label: "Automated Logistics Center", url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&auto=format&fit=crop&q=80" },
  { label: "Enterprise Commercial Team", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80" },
  { label: "Electronics Quality Testing", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80" }
];

export const HERO_THEMES = {
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

export const METRICS_THEMES = {
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

export const CTA_THEMES = {
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

export function createDefaultPageSections(title: string, ctaText: string): PageSection[] {
  return [
    {
      id: "hero-1",
      type: "hero",
      order: 0,
      enabled: true,
      theme: "glow",
      content: {
        badge: "FESTIVAL DEMAND SURGE 2026",
        headline: title || "Scale Festive Appliance Volume Across India",
        subheadline: "Guaranteed warehouse capacity across 12 states, zero stockout SLAs, and daily algorithmic reconciliation during peak festive windows.",
        ctaText: ctaText || "Claim Festival Allocation →"
      }
    },
    {
      id: "metrics-1",
      type: "metrics",
      order: 1,
      enabled: true,
      theme: "dark",
      content: {
        title: "Proven Festive Performance",
        stats: [
          { value: "4.8x", label: "Peak Sales Surge", subtext: "Average GMV increase during festive windows" },
          { value: "99.4%", label: "SLA Adherence", subtext: "Next-day dispatch compliance during peak volume" },
          { value: "₹450 Cr+", label: "GMV Handled", subtext: "Processed across Amazon, Flipkart & Quick-Commerce" }
        ]
      }
    },
    {
      id: "features-1",
      type: "features",
      order: 2,
      enabled: true,
      theme: "light",
      content: {
        title: "Operational Capabilities Engineered for Scale",
        subtitle: "How Good Life operates your brand across India without fragmented agencies or distributor conflict.",
        items: [
          { title: "Zero Stockout SLA", desc: "Real-time stock rebalancing across 12 regional fulfillment hubs within 4 hours." },
          { title: "Flash Sale Readiness", desc: "Automated listing suppression prevention during lightning and flash sale events." },
          { title: "Daily Escrow Audit", desc: "Automated claim filing for damaged in transit, commission leaks, and delayed returns." }
        ]
      }
    },
    {
      id: "gallery-1",
      type: "gallery",
      order: 3,
      enabled: true,
      theme: "light",
      content: {
        title: "Operating Across India's Top Marketplaces & 23+ Leading Appliance Brands",
        brands: ["Crompton", "Havells", "USHA", "IKEA", "Faber", "Hindware", "Amazon", "Flipkart"]
      }
    },
    {
      id: "cta-1",
      type: "cta",
      order: 4,
      enabled: true,
      theme: "gradient",
      content: {
        headline: "Prepare Your Festive Fulfillment Today",
        subtext: "Reserve dedicated racking and regional fulfillment slots before the pre-festive cutoff.",
        buttonText: "Reserve Festival Slot"
      }
    },
    {
      id: "faq-1",
      type: "faq",
      order: 5,
      enabled: true,
      theme: "light",
      content: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How quickly can we allocate regional inventory before Diwali?", a: "Inventory inbound can be completed within 72 hours across all 12 regional hub locations." },
          { q: "What happens if return rates surge post-festival?", a: "Our dedicated QC triage teams inspect returned appliances within 24 hours to separate restockable units from transit claims." }
        ]
      }
    },
    {
      id: "form-1",
      type: "form",
      order: 6,
      enabled: true,
      theme: "light",
      content: {
        title: "Request Commercial Diagnostic Audit",
        subtitle: "Our marketplace directors will assess your inventory and SKU catalog within 12 hours.",
        buttonText: "Submit Diagnostic Inquiry",
        campaignTag: title
      }
    }
  ];
}
