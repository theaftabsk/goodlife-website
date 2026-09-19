export interface CaseStudyMetric {
  val: string;
  lbl: string;
}

export interface CaseStudyDetail {
  id: string;
  title: string;
  slug: string;
  client: string;
  category?: string;
  industry: string;
  location?: string;
  timeframe?: string;
  shortDescription: string;
  coverImage: string;
  imageAlt?: string;
  challenge: string;
  solution: string;
  actionTaken: string[];
  capabilities: string[];
  metrics: CaseStudyMetric[];
  stats?: string;
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
    company: string;
  };
  status: "Published" | "Draft";
  isFeatured: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDesc?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEEDED_CASE_STUDIES: CaseStudyDetail[] = [
  {
    id: "cs-1",
    slug: "oem-appliances-marketplace-scale",
    title: "From Contract Manufacturer to ₹18 Cr/yr Direct Marketplace Brand",
    client: "Havells & Surya Contract OEM Partner",
    industry: "Small Domestic Appliances",
    category: "Marketplace Scale",
    location: "New Delhi / 8 Regional Hubs",
    timeframe: "9 Months from Zero",
    shortDescription: "Scaled from zero to ₹1.5+ Cr monthly GMV within 9 months, maintaining 18.2% operating profit margin after all marketplace fees and logistics costs.",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80",
    challenge: "A 25-year-old appliance manufacturer with zero direct-to-consumer presence was losing operating margins to traditional distributor tiers. They needed to launch ceiling fans and induction cooktops directly on Amazon and Flipkart without cannibalizing offline dealer networks or risking inventory dead-stock.",
    solution: "GoodLife designed an exclusive online D2C sub-brand with unique model SKUs and strict price parity guardrails. We deployed stock across 6 regional GoodLife fulfillment centers to secure Prime and Next-Day delivery badges across 92% of tier-1 and tier-2 PIN codes.",
    actionTaken: [
      "End-to-end cataloging & A+ content creation for 42 high-demand appliance SKUs",
      "Direct FBA & Flipkart FBF onboarding across 6 state GST registrations (APOB)",
      "Automated order ingest and dual-carrier allocation reducing late-dispatch rate to < 0.1%",
      "Daily price monitoring & Buy Box protection algorithms preventing predatory discounting",
      "Integrated reverse logistics inspection hub slashing unjustified return acceptances"
    ],
    capabilities: ["Marketplace Management", "Fulfillment & Logistics", "Catalog & Brand Store", "Payment Reconciliation"],
    metrics: [
      { val: "+830%", lbl: "GMV Surge in 9 Months" },
      { val: "₹18.4 Cr", lbl: "Annualized Run-Rate" },
      { val: "99.4%", lbl: "On-Time Dispatch SLA" },
      { val: "13.8%", lbl: "Blended TACOS Efficiency" }
    ],
    stats: "+830% GMV Surge · 99.4% SLA",
    testimonial: {
      quote: "Good Life transformed us from an invisible contract factory into one of the top 3 selling ceiling fan brands on Amazon within three quarters. Their warehousing and reconciliations are flawless.",
      author: "Rajesh Kulkarni",
      designation: "Managing Director",
      company: "Apex Appliances Ltd."
    },
    status: "Published",
    isFeatured: true,
    publishedAt: "2026-03-15",
    seoTitle: "Appliances OEM Marketplace Scale Case Study | GoodLife",
    seoDesc: "Learn how a contract manufacturer scaled to ₹18 Cr run-rate across Amazon and Flipkart with GoodLife operating infrastructure."
  },
  {
    id: "cs-2",
    slug: "kitchen-chimney-transit-breakage-reduction",
    title: "Eliminating Transit Damage & Slashing Return Freight from 18% to 2.8%",
    client: "Premium Kitchen Chimney & Cooktop Brand",
    industry: "Large Appliances & Chimneys",
    category: "Heavy & Bulky",
    location: "Pune & Bengaluru Hubs",
    timeframe: "4 Months",
    shortDescription: "Transit damage collapsed from 14.2% to under 0.4%. Customer return rate decreased from 18% to 2.8%, saving over ₹42 Lakh in quarterly freight penalties.",
    coverImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
    challenge: "High in-transit glass canopy breakage on kitchen chimneys (exceeding 14% damage rates) was eroding seller ratings and generating astronomical two-way freight debit notes from courier partners. Standard 3PL parcel couriers were tossing delicate tempered glass units through sorting conveyor chutes.",
    solution: "GoodLife packaging engineers designed customized wooden crating and reinforced high-density edge buffer boards. Rerouted movements away from rough conveyor sorting hubs into dedicated palletized surface networks with threshold white-glove handling.",
    actionTaken: [
      "Engineered ISTA-certified drop-resistant corner guards and dual-honeycomb protective crating",
      "Shifted fragile linehaul movements from courier conveyor express to dedicated palletized trucks",
      "Implemented pre-dispatch video scan verification at packing stations",
      "Deployed 2-person delivery teams for heavy chimneys with pre-call customer appointment scheduling"
    ],
    capabilities: ["Fulfillment & Logistics", "Packaging Engineering", "Returns Mitigation"],
    metrics: [
      { val: "-82%", lbl: "Transit Breakage Drop" },
      { val: "2.8%", lbl: "Return Rate (down from 18%)" },
      { val: "₹42L+", lbl: "Quarterly Freight Savings" },
      { val: "4.4 ★", lbl: "Product Review Average" }
    ],
    stats: "-82% Transit Breakage · 48h Delivery SLA",
    testimonial: {
      quote: "Glass breakage was destroying our unit economics. GoodLife fixed our packaging physics and logistics network, cutting our returns to an all-time low and salvaging our brand reputation.",
      author: "Vikas Singhal",
      designation: "Chief Operating Officer",
      company: "AeroVent Home Systems"
    },
    status: "Published",
    isFeatured: true,
    publishedAt: "2026-04-10",
    seoTitle: "Kitchen Chimney Transit Damage Reduction Case Study | GoodLife",
    seoDesc: "How GoodLife reduced heavy appliances transit damage by 82% and saved ₹42 Lakhs in return logistics."
  },
  {
    id: "cs-3",
    slug: "heavy-bulky-inverter-battery-logistics",
    title: "Zero-Transit-Damage Fulfillment for 45kg Heavy Goods Across Tier 2/3 India",
    client: "National Inverter & Tubular Battery OEM",
    industry: "Power & Energy Storage",
    category: "Heavy & Bulky",
    location: "12 State Regional Hubs",
    timeframe: "6 Months",
    shortDescription: "Pure sine wave inverters and tubular solar batteries fulfilled safely across 19,000+ PIN codes with multi-state GST compliance.",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    challenge: "45kg heavy-duty tubular solar batteries faced acid leakage risks, carrier dimension re-measurement penalties, and interstate sales tax seizures during nationwide transit. Courier partners were misclassifying dead weight vs volumetric weights, creating ₹12+ Lakh in unjustified dispute charges.",
    solution: "GoodLife deployed palletized linehaul freight, pre-registered APOB hubs in 12 states for seamless input tax credit pass-through, and automated 3D dimension scan verification at inbound dock doors.",
    actionTaken: [
      "Established 12 compliant APOB registrations for interstate input tax credit pass-through",
      "Deployed heavy-grade palletized trucks with tail-lift equipment for safe driver unloading",
      "Automated dead-weight vs volumetric dispute reconciliation against courier weight audit files",
      "Created instant battery installation dispatch integration upon customer delivery confirmation"
    ],
    capabilities: ["Fulfillment & Logistics", "Tax & Compliance", "Reconciliation & Recovery"],
    metrics: [
      { val: "94%", lbl: "Fewer Carrier Disputes" },
      { val: "19K+", lbl: "PIN Codes Covered" },
      { val: "99.1%", lbl: "On-Time Delivery SLA" },
      { val: "100%", lbl: "Weight Overcharge Recovery" }
    ],
    stats: "94% Less Freight Damage · 12 State Hubs",
    testimonial: {
      quote: "Shipping 45kg batteries across India without spills or overcharge disputes was deemed impossible until GoodLife deployed their regional logistics grid. Our business tripled.",
      author: "Sunil Rao",
      designation: "VP Operations",
      company: "PowerCore Dynamics"
    },
    status: "Published",
    isFeatured: true,
    publishedAt: "2026-05-02",
    seoTitle: "Heavy Goods Fulfillment Case Study | GoodLife",
    seoDesc: "Explore how GoodLife manages 45kg heavy-duty power backup fulfillment with multi-state GST compliance."
  },
  {
    id: "cs-4",
    slug: "marketplace-revenue-assurance-audit",
    title: "Auditing 14 Months of Marketplace Ledger to Recover ₹84 Lakh Leaked Capital",
    client: "Consumer Electronics & Audio Brand",
    industry: "Consumer Electronics & Audio",
    category: "Revenue Assurance",
    location: "Mumbai HQ / Pan-India",
    timeframe: "60 Days Audit",
    shortDescription: "Algorithmic audit of 420,000+ transaction lines uncovering hidden fee discrepancies, SAFE-T underpayments, and courier volumetric overcharges.",
    coverImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    challenge: "Despite generating ₹4 Cr monthly GMV, the brand's finance team noticed continuous cash flow compression due to unverified commission debits, volumetric weight overcharges, and uncredited customer return parcels that disappeared in carrier transit.",
    solution: "GoodLife's algorithmic reconciliation cell ingested 14 months of raw marketplace settlement reports, cross-matching order IDs against actual warehouse intake scans and weight certificates.",
    actionTaken: [
      "Ingested 14 months of raw settlement files into GoodLife's proprietary reconciliation engine",
      "Identified 38,000+ orders where courier volumetric dimensions were billed at higher weight tiers",
      "Filed 1,400+ evidence-backed SAFE-T claims for damaged customer returns with packing station video proof",
      "Instituted automated daily reconciliation guardrails to flag ledger anomalies within 24 hours"
    ],
    capabilities: ["Payment Reconciliation", "Tax & Compliance", "Returns Mitigation"],
    metrics: [
      { val: "₹84.2L", lbl: "Direct Cash Recovered" },
      { val: "100%", lbl: "SAFE-T Claim SLA" },
      { val: "+3.1%", lbl: "Net Profit Margin Increase" },
      { val: "<24h", lbl: "Dispute Detection Speed" }
    ],
    stats: "₹84.2L Recovered · +3.1% Net Margin",
    testimonial: {
      quote: "GoodLife found money we didn't even know we had lost. ₹84 Lakh credited right back to our bank account in two months paid for our entire operations expansion.",
      author: "Aditi Mathur",
      designation: "Chief Financial Officer",
      company: "SonicWave Acoustics"
    },
    status: "Published",
    isFeatured: false,
    publishedAt: "2026-06-18",
    seoTitle: "Marketplace Reconciliation & Revenue Recovery Case Study | GoodLife",
    seoDesc: "How GoodLife audited 14 months of marketplace ledger to recover ₹84 Lakhs in cash leaks."
  },
  {
    id: "cs-5",
    slug: "pan-india-next-day-delivery-cookware",
    title: "Transitioning from Single Factory Dispatch to 12-State Next-Day Delivery",
    client: "National Cookware & Kitchen Essentials Brand",
    industry: "Home & Kitchen Hardware",
    category: "Pan-India Logistics",
    location: "12 Fulfillment Nodes",
    timeframe: "5 Months",
    shortDescription: "Decentralized inventory architecture expanding next-day delivery reach from 18% to 91%, driving a 44% lift in organic Buybox wins.",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    challenge: "Shipping cast-iron skillets and stainless-steel pressure cookers solely from a single manufacturing unit in Haryana caused 6-8 day transit times to south and west India, resulting in severe cart abandonment and high RTO cancellation rates.",
    solution: "GoodLife deployed predictive demand forecasting to stage fast-moving SKUs across 12 strategic micro-warehouses near high-density metro centers, unlocking next-day delivery badges.",
    actionTaken: [
      "Simulated historical sales velocity to pre-distribute inventory across 12 regional hub locations",
      "Setup automated auto-replenishment triggers based on real-time sell-through velocity",
      "Secured Amazon Prime and Flipkart Assured fast-delivery badges across 91% of pin-codes",
      "Reduced long-haul freight costs by 28% through full-truckload (FTL) inter-hub transfers"
    ],
    capabilities: ["Fulfillment & Logistics", "Marketplace Management", "Quick-Commerce Acceleration"],
    metrics: [
      { val: "91%", lbl: "Next-Day Delivery Reach" },
      { val: "+44%", lbl: "Organic Buybox Win Rate" },
      { val: "-28%", lbl: "Per-Unit Logistics Cost" },
      { val: "-62%", lbl: "RTO Cancellation Drop" }
    ],
    stats: "91% Next-Day Delivery · -28% Logistics Cost",
    testimonial: {
      quote: "Moving from 7-day factory dispatch to next-day delivery doubled our conversion rate overnight. GoodLife's regional warehouse network gave us enterprise distribution without the capex.",
      author: "Manish Aggarwal",
      designation: "Founder & CEO",
      company: "Kaviraj Kitchenware"
    },
    status: "Published",
    isFeatured: false,
    publishedAt: "2026-07-22",
    seoTitle: "Pan-India Warehousing & Next-Day Delivery Case Study | GoodLife",
    seoDesc: "Discover how GoodLife expanded next-day delivery to 91% of PIN codes and cut logistics costs by 28%."
  }
];

// Helper to get all published case studies (merging localStorage updates from admin if present)
export function getCaseStudies(): CaseStudyDetail[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("gl_admin_case_studies");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Format and return published only for public website
          return parsed.filter((item: any) => item.status !== "Draft");
        }
      }
    } catch (e) {
      console.error("Failed to parse gl_admin_case_studies from localStorage", e);
    }
  }
  return SEEDED_CASE_STUDIES;
}

// Helper to find single case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudyDetail | undefined {
  const all = getCaseStudies();
  const found = all.find((item) => item.slug === slug);
  if (found) return found;
  // Fallback to default seeds if not in local storage
  return SEEDED_CASE_STUDIES.find((item) => item.slug === slug);
}
