"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ChannelCategory = "General Marketplaces" | "B2B Wholesale" | "Quick-Commerce" | "D2C Direct Storefronts";

export interface PlatformItem {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  svgCode: string;
  orderIndex: number;
  isActive: boolean;
  channelType?: ChannelCategory;
}

export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  websiteUrl: string;
  svgCode: string;
  orderIndex: number;
  isActive: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
  icon: string;
  orderIndex: number;
  isActive: boolean;
}

export interface LeadItem {
  id: string;
  leadCode?: string;
  company: string;
  website?: string;
  contact: string;
  email: string;
  mobile: string;
  category?: string;
  gmv?: string;
  intent?: string;
  timeline?: string;
  tags: string[];
  date: string;
  marketplaces?: string[];
  orderVolume?: string;
  operatingModel?: string;
  warehouseModel?: string;
  challenges?: string[];
  reconciled?: string;
  source?: string;
  emailStatus?: "Delivered" | "Sent" | "Pending" | "Failed";
  emailSentAt?: string;
  crmStatus?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAlt?: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  author: string;
  authorRole?: string;
  authorPhoto?: string;
  tags: string[];
  date: string;
  publishedAt?: string;
  scheduledAt?: string;
  seoTitle: string;
  seoDesc: string;
  canonicalUrl?: string;
  ogImage?: string;
  readTime?: string;
}

export interface CaseStudyMetric {
  val: string;
  lbl: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  category?: string; // alias for industry for backward compatibility
  industry: string;
  location?: string;
  timeframe?: string;
  shortDescription: string;
  coverImage: string;
  imageAlt?: string;
  challenge: string;
  solution: string;
  actionTaken?: string[];
  capabilities: string[];
  metrics: CaseStudyMetric[];
  stats?: string; // alias for backward compatibility
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

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: "Published" | "Draft";
  orderIndex: number;
  isFeatured?: boolean;
}

export interface RedirectItem {
  id: string;
  from: string;
  to: string;
  code: number;
  clicks: number;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  whatsappNumber: string;
  headerCtaText: string;
  heroHeadline: string;
  announcementText: string;
  announcementEnabled?: boolean;
  announcementLink?: string;
  announcementTheme?: "slate" | "navy" | "sky" | "gradient";
  headerPhoneBadge?: string;
  cinNumber?: string;
  registeredCity?: string;
  supportHours?: string;
  preFooterTag?: string;
  preFooterHeading?: string;
  preFooterSubtext?: string;
  preFooterCta?: string;
  preFooterBgImage?: string;
  copyrightText?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  googleSearchConsoleVerification?: string;
}

export interface AuthorItem {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  roleType: "Super Admin" | "Author & Editor" | "Content Specialist";
  bio: string;
  avatar: string;
  linkedin?: string;
  articlesCount: number;
  status: "Active" | "Inactive";
  lastLogin?: string;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  action: string;
  target: string;
  details?: string;
  timestamp: string;
}

export interface LandingPageItem {
  id: string;
  title: string;
  slug: string;
  sections: string[]; // ["Hero", "Features", "Proof Stats", "FAQ", "CTA", "Contact Form"]
  pageSections?: any[];
  status: "Active" | "Draft";
  ctaText: string;
  lastUpdated: string;
}

export interface SeoPageItem {
  id: string;
  pagePath: string;
  pageName: string;
  category?: "Core" | "Solutions" | "Capabilities" | "Specialised" | "Authority" | "Campaigns" | "Custom";
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonical?: string;
  robots?: string;
  ogImage?: string;
}

export interface CrmConfig {
  id?: string;
  isConnected: boolean;
  provider: string;
  webhookUrl: string;
  apiKey?: string;
  autoSync: boolean;
  notificationEmail: string;
  lastSyncStatus: string;
  lastSyncTime?: string | null;
  lastErrorMessage?: string | null;
  totalSyncedCount?: number;
  totalFailedCount?: number;
}

export interface MeetingItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientPhone?: string;
  topic?: string;
  startTime: string;
  endTime?: string;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  meetingUrl?: string;
  calendarEventId?: string;
  provider: string;
  reminder24hSent: boolean;
  reminder1hSent: boolean;
  notes?: string;
  createdAt: string;
}

export interface CalendarConfigItem {
  id?: string;
  provider: string;
  bookingUrl: string;
  embedType: string;
  remindersEnabled: boolean;
  reminder24h: boolean;
  reminder1h: boolean;
  notificationEmail: string;
}

interface AdminDataContextType {
  platforms: PlatformItem[];
  setPlatforms: React.Dispatch<React.SetStateAction<PlatformItem[]>>;
  savePlatform: (item: Partial<PlatformItem>, id?: string) => void;
  deletePlatform: (id: string) => void;
  togglePlatformStatus: (id: string) => void;

  meetings: MeetingItem[];
  calendarConfig: CalendarConfigItem | null;
  saveMeeting: (item: Partial<MeetingItem>, id?: string) => Promise<void>;
  updateMeetingStatus: (id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") => Promise<void>;
  deleteMeeting: (id: string) => Promise<void>;
  sendMeetingReminder: (id: string, type?: "24h" | "1h" | "manual") => Promise<boolean>;
  updateCalendarConfig: (config: Partial<CalendarConfigItem>) => Promise<void>;

  brands: BrandItem[];
  setBrands: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  saveBrand: (item: Partial<BrandItem>, id?: string) => void;
  deleteBrand: (id: string) => void;
  toggleBrandStatus: (id: string) => void;

  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  saveCategory: (item: Partial<CategoryItem>, id?: string) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;

  leads: LeadItem[];
  deleteLead: (id: string) => void;
  updateLeadStatus: (id: string, tag: string) => void;
  resendLeadEmail: (id: string) => void;
  addLead: (lead: Partial<LeadItem>) => void;

  articles: ArticleItem[];
  saveArticle: (item: Partial<ArticleItem>, id?: string) => void;
  deleteArticle: (id: string) => void;
  toggleArticleStatus: (id: string) => void;
  duplicateArticle: (id: string) => void;

  authors: AuthorItem[];
  saveAuthor: (item: Partial<AuthorItem>, id?: string) => void;
  deleteAuthor: (id: string) => void;
  toggleAuthorStatus: (id: string) => void;

  currentUser: AuthorItem | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthorItem | null>>;
  auditLogs: AuditLogItem[];
  logActivity: (action: string, target: string, details?: string) => void;
  loginUser: (email: string, password?: string) => { success: boolean; message?: string };
  switchUser: (authorId: string) => void;
  logoutUser: () => void;

  landingPages: LandingPageItem[];
  saveLandingPage: (item: Partial<LandingPageItem>, id?: string) => void;
  deleteLandingPage: (id: string) => void;
  toggleLandingPageStatus: (id: string) => void;

  seoPages: SeoPageItem[];
  saveSeoPage: (item: Partial<SeoPageItem>, id?: string) => void;
  deleteSeoPage: (id: string) => void;

  crmConfig: CrmConfig;
  updateCrmConfig: (config: Partial<CrmConfig>) => Promise<void>;
  testCrmWebhook: (dto?: { provider?: string; webhookUrl?: string; apiKey?: string }) => Promise<{ success: boolean; message: string; httpCode?: number }>;
  disconnectCrm: () => Promise<void>;
  syncPendingLeadsToCrm: () => Promise<{ success: boolean; message: string }>;

  caseStudies: CaseStudyItem[];
  saveCaseStudy: (item: Partial<CaseStudyItem>, id?: string) => void;
  deleteCaseStudy: (id: string) => void;
  toggleCaseStudyStatus: (id: string) => void;
  toggleCaseStudyFeatured: (id: string) => void;
  duplicateCaseStudy: (id: string) => void;

  faqs: FaqItem[];
  saveFaq: (item: Partial<FaqItem>, id?: string) => void;
  deleteFaq: (id: string) => void;
  toggleFaqStatus: (id: string) => void;
  toggleFaqFeatured: (id: string) => void;
  duplicateFaq: (id: string) => void;

  redirects: RedirectItem[];
  saveRedirect: (item: Partial<RedirectItem>, id?: string) => void;
  deleteRedirect: (id: string) => void;

  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const initialPlatforms: PlatformItem[] = [];
const initialBrands: BrandItem[] = [];
const initialCategories: CategoryItem[] = [];

const initialLeads: LeadItem[] = [];

const initialArticles: ArticleItem[] = [];

const initialCaseStudies: CaseStudyItem[] = [
  {
    id: "cs-1",
    title: "Scaling from ₹3 Cr to ₹28 Cr ARR across 6 Marketplaces in 14 Months",
    slug: "oem-appliances-marketplace-scale",
    client: "Tier-1 Home Appliances OEM",
    industry: "Home & Kitchen Appliances",
    category: "Home & Kitchen Appliances",
    location: "Rajkot, Gujarat",
    timeframe: "14 Months from Launch",
    shortDescription: "From contract OEM manufacturer to top-rated digital brand on Amazon & Flipkart with 830% GMV surge while protecting distributor wholesale margins.",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Modern kitchen appliances and induction cooktops",
    challenge: "A 25-year-old manufacturer had zero direct-to-consumer footprint. Traditional offline distributors threatened boycotts if products appeared online at retail discount.",
    solution: "Good Life Sutra engineered a distinct D2C model lineup with online-exclusive SKUs, drop-tested master packaging, and 6 regional warehouse nodes delivering under 24 hours.",
    actionTaken: [
      "Engineered digital-exclusive SKU numbers to eliminate offline dealer price wars",
      "Deployed inventory in 6 Good Life regional hubs for guaranteed Prime badges",
      "Set up 24/7 automated Buybox repricing algorithm maintaining 91% Buybox share",
      "Integrated daily claim audits recovering uncredited return freight fees"
    ],
    capabilities: [
      "Marketplace Operations",
      "Marketplace Growth & Advertising",
      "Inventory & Stock Planning",
      "Warehousing & Fulfilment"
    ],
    metrics: [
      { val: "830%", lbl: "GMV Surge" },
      { val: "₹28 Cr", lbl: "Annual Run-Rate" },
      { val: "99.4%", lbl: "SLA Adherence" },
      { val: "13.8%", lbl: "Blended TACOS" }
    ],
    stats: "830% GMV Surge · ₹28 Cr ARR · 99.4% SLA",
    testimonial: {
      quote: "Good Life gave us digital market ownership without disrupting our multi-generation wholesale network. Our online sales now outpace our original OEM contracts.",
      author: "Bhavesh Patel",
      designation: "Managing Director",
      company: "Apex Appliances OEM"
    },
    status: "Published",
    isFeatured: true,
    publishedAt: "2026-08-15T10:00:00.000Z",
    seoTitle: "Case Study: Scaling Home Appliance OEM to ₹28 Cr ARR | Good Life Sutra",
    seoDesc: "How a 25-year-old contract manufacturer scaled from ₹3 Cr to ₹28 Cr GMV across Amazon & Flipkart without offline distributor channel conflict.",
    canonicalUrl: "/case-studies/oem-appliances-marketplace-scale",
    ogImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "cs-2",
    title: "Eliminating Transit Damage & Slashing Return Freight from 18% to 2.8%",
    slug: "kitchen-chimney-transit-breakage-reduction",
    client: "Premium Kitchen Chimney & Cooktop Brand",
    industry: "Heavy & Bulky Commerce",
    category: "Heavy & Bulky Commerce",
    location: "Pune, Maharashtra",
    timeframe: "4 Months Implementation",
    shortDescription: "Specialized palletized packaging and regional forward positioning reduced fragile tempered glass breakage from 14% to 0.38%.",
    coverImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Heavy bulky kitchen chimney packaging and warehouse handling",
    challenge: "High in-transit glass canopy breakage on kitchen chimneys exceeded 14%, triggering customer negative reviews and massive two-way return courier bills.",
    solution: "Engineered customized molded foam crating, rerouted shipments away from parcel hubs into Good Life's palletized linehaul freight, and deployed doorstep technician inspections.",
    actionTaken: [
      "Custom ISTA-certified drop-proof packaging with honeycomb corner protectors",
      "Direct linehaul to 8 regional hubs cutting long-haul handling steps by 70%",
      "Local technician doorstep unboxing triage eliminating false defect returns",
      "Daily automated carrier damage claim filing recovering 98% of lost cost"
    ],
    capabilities: [
      "Heavy & Bulky Commerce",
      "Returns & Reverse Operations",
      "Warehousing & Fulfilment",
      "Revenue Assurance & Reconciliation"
    ],
    metrics: [
      { val: "-82%", lbl: "Transit Breakage" },
      { val: "2.8%", lbl: "Final Return Rate" },
      { val: "₹42 Lakh", lbl: "Quarterly Savings" },
      { val: "48h", lbl: "Doorstep Delivery SLA" }
    ],
    stats: "-82% Transit Breakage · 2.8% Return Rate · 48h Delivery",
    testimonial: {
      quote: "Heavy appliance reverse logistics was bleeding our net margins dry. Good Life transformed our unit economics and restored our Amazon customer ratings to 4.4 stars.",
      author: "Siddharth Mehta",
      designation: "Chief Operating Officer",
      company: "AeroClean Chimneys India"
    },
    status: "Published",
    isFeatured: true,
    publishedAt: "2026-09-02T14:30:00.000Z",
    seoTitle: "Heavy Bulky Transit Breakage Reduction Case Study | Good Life Sutra",
    seoDesc: "Discover how Good Life reduced fragile kitchen chimney damage from 14% to under 0.4% and saved ₹42 Lakhs in return shipping penalties.",
    canonicalUrl: "/case-studies/kitchen-chimney-transit-breakage-reduction",
    ogImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "cs-3",
    title: "Zero-Transit-Damage Fulfillment for 45kg Heavy Goods Across Tier 2/3 India",
    slug: "heavy-bulky-inverter-battery-logistics",
    client: "National Inverter & Tubular Battery OEM",
    industry: "Invertors & Battery",
    category: "Invertors & Battery",
    location: "Coimbatore, Tamil Nadu",
    timeframe: "6 Months Nationwide Rollout",
    shortDescription: "Pure sine wave inverters and tubular solar batteries fulfilled safely across 19,000+ PIN codes with multi-state GST compliance.",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Industrial inverter batteries and regional storage facilities",
    challenge: "45kg heavy-duty tubular solar batteries faced acid leakage risks and carrier dimension re-measurement penalties during interstate transit.",
    solution: "Good Life deployed palletized linehaul freight, pre-registered APOB hubs in 12 states, and daily dimension scan verification.",
    actionTaken: [
      "Registered APOB fulfillment nodes in 12 major economic states",
      "Installed specialized upright containment strapping preventing battery tilt",
      "Integrated automated UTR payment reconciliation for large B2B bulk orders"
    ],
    capabilities: [
      "Heavy & Bulky Commerce",
      "12-State Fulfilment Network",
      "Revenue Assurance & Reconciliation"
    ],
    metrics: [
      { val: "94%", lbl: "Less Freight Damage" },
      { val: "12 States", lbl: "Hub Placement" },
      { val: "99.1%", lbl: "On-Time Dispatch" },
      { val: "100%", lbl: "Weight Claims Won" }
    ],
    stats: "94% Less Freight Damage · 12 State Hubs · 99.1% Dispatch",
    status: "Published",
    isFeatured: false,
    publishedAt: "2026-09-10T09:00:00.000Z",
    seoTitle: "Inverter & Battery Multi-State Fulfillment Case Study | Good Life Sutra",
    seoDesc: "How Good Life solved heavy bulky logistics for 45kg inverters and solar batteries across 12 states with zero transport breakage.",
    canonicalUrl: "/case-studies/heavy-bulky-inverter-battery-logistics",
    ogImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
  }
];

const initialFaqs: FaqItem[] = [];

const initialRedirects: RedirectItem[] = [];

const initialSiteSettings: SiteSettings = {
  companyName: "Good Life Sutra Pvt. Ltd.",
  phone: "+91 88821 57074",
  email: "growth@goodlifesutra.com",
  address: "Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India",
  gstNumber: "06AABCG1234F1Z8",
  whatsappNumber: "+91 88821 57074",
  headerCtaText: "Request Diagnostic →",
  heroHeadline: "Scale Ecommerce. Not Complexity.",
  announcementText: "Operating across 15+ Platforms & 23+ Leading Brands Nationwide",
  announcementEnabled: true,
  announcementLink: "/case-studies",
  announcementTheme: "slate",
  headerPhoneBadge: "+91 88821 57074",
  cinNumber: "U74999MH2021PTC368942",
  registeredCity: "Gurugram, Haryana & Mumbai, India",
  supportHours: "Mon - Sat: 9:30 AM - 7:00 PM IST",
  preFooterTag: "READY TO SCALE?",
  preFooterHeading: "Grow your ecommerce business with us",
  preFooterSubtext: "Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.",
  preFooterCta: "UNLOCK YOUR GROWTH →",
  preFooterBgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  copyrightText: "© 2026 Good Life Sutra Pvt. Ltd. All rights reserved.",
  linkedinUrl: "https://linkedin.com/company/good-life-sutra",
  twitterUrl: "https://x.com/goodlifesutra",
  youtubeUrl: "https://youtube.com/@goodlifesutra",
  ga4MeasurementId: "",
  gtmContainerId: "",
  googleSearchConsoleVerification: ""
};

const initialAuthors: AuthorItem[] = [];

const initialAuditLogs: AuditLogItem[] = [
  { id: "log-1", userId: "auth-1", userName: "Rajeev Nair", userRole: "Super Admin", userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80", action: "Logged In", target: "Admin Security Portal", timestamp: "Today, 04:35 PM" },
  { id: "log-2", userId: "auth-1", userName: "Rajeev Nair", userRole: "Super Admin", userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80", action: "Updated Case Study", target: "Scaling from ₹3 Cr to ₹28 Cr ARR", timestamp: "Today, 03:50 PM" },
  { id: "log-3", userId: "auth-2", userName: "Pooja Verma", userRole: "Author & Editor", userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80", action: "Published Insight", target: "12-State Distributed Inventory Planning", timestamp: "14 Sep, 11:30 AM" },
  { id: "log-4", userId: "auth-3", userName: "Amitava Sen", userRole: "Author & Editor", userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80", action: "Created Draft", target: "The Silent Profit Killer: Auditing Deductions", timestamp: "05 Sep, 02:15 PM" }
];

const initialLandingPages: LandingPageItem[] = [
  { id: "lp-1", title: "Diwali Appliance Scale Surge 2026", slug: "diwali-appliance-scale", sections: ["Hero Banner", "Features Grid", "Proof Metrics", "FAQ Accordion", "Diagnostic Lead Form"], status: "Active", ctaText: "Claim Festival Allocation →", lastUpdated: "Sep 18, 2026" },
  { id: "lp-2", title: "OEM Institutional B2B Procurement", slug: "oem-b2b-procurement", sections: ["Hero Banner", "Features Grid", "Proof Metrics", "Call-to-Action Strip", "Diagnostic Lead Form"], status: "Active", ctaText: "Schedule Institutional Audit", lastUpdated: "Sep 14, 2026" }
];

const initialSeoPages: SeoPageItem[] = [
  { id: "seo-1", pagePath: "/", pageName: "Homepage", metaTitle: "Good Life Sutra — India's Premier Commerce Operating Partner", metaDescription: "Turnkey marketplace operations, OEM brand incubation, 12-state warehousing, and revenue settlement assurance.", keywords: "ecommerce operating partner, amazon account management, flipkart fulfillment, india commerce operations" },
  { id: "seo-2", pagePath: "/capabilities", pageName: "Capabilities", metaTitle: "Enterprise E-Commerce Capabilities | Good Life Sutra", metaDescription: "Marketplace management, advertising optimization, multi-state fulfillment, and payment reconciliation.", keywords: "marketplace operations, inventory distribution, seller services" },
  { id: "seo-3", pagePath: "/network", pageName: "12-State Network", metaTitle: "Pan-India Warehousing Network | Good Life Sutra", metaDescription: "Strategically located regional fulfillment hubs across 12 Indian states ensuring 1-day delivery SLAs.", keywords: "ecommerce warehousing india, 3PL fulfillment, appliance logistics" },
  { id: "seo-4", pagePath: "/contact", pageName: "Contact & Diagnostic", metaTitle: "Contact Good Life Sutra | Request Commerce Diagnostic", metaDescription: "Connect with our growth specialists to audit your marketplace listings and supply chain leakages.", keywords: "contact good life sutra, diagnostic audit, commerce partner" }
];

const initialCrmConfig: CrmConfig = {
  id: "default",
  isConnected: false,
  provider: "",
  webhookUrl: "",
  apiKey: "",
  autoSync: false,
  notificationEmail: "",
  lastSyncStatus: "Not Connected",
  lastSyncTime: null,
  lastErrorMessage: null,
  totalSyncedCount: 0,
  totalFailedCount: 0,
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [platforms, setPlatforms] = useState<PlatformItem[]>(initialPlatforms);
  const [brands, setBrands] = useState<BrandItem[]>(initialBrands);
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [authors, setAuthors] = useState<AuthorItem[]>(initialAuthors);
  const [currentUser, setCurrentUser] = useState<AuthorItem | null>(initialAuthors[0] || null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [landingPages, setLandingPages] = useState<LandingPageItem[]>(initialLandingPages);
  const [seoPages, setSeoPages] = useState<SeoPageItem[]>(initialSeoPages);
  const [crmConfig, setCrmConfig] = useState<CrmConfig>(initialCrmConfig);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(initialCaseStudies);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [redirects, setRedirects] = useState<RedirectItem[]>(initialRedirects);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [calendarConfig, setCalendarConfig] = useState<CalendarConfigItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load stored state if available
  useEffect(() => {
    try {
      const savedMeetings = localStorage.getItem("gl_admin_meetings");
      if (savedMeetings) setMeetings(JSON.parse(savedMeetings));
    } catch (_) {}
    try {
      const savedPlatforms = localStorage.getItem("gl_admin_platforms");
      if (savedPlatforms) {
        const defaultChannelMap: Record<string, ChannelCategory> = {
          amazon: "General Marketplaces",
          flipkart: "General Marketplaces",
          meesho: "General Marketplaces",
          myntra: "General Marketplaces",
          nykaa: "General Marketplaces",
          ajio: "General Marketplaces",
          snapmint: "General Marketplaces",
          indiamart: "B2B Wholesale",
          tradeindia: "B2B Wholesale",
          industrybuying: "B2B Wholesale",
          moglix: "B2B Wholesale",
          blinkit: "Quick-Commerce",
          zepto: "Quick-Commerce",
          jiomart: "Quick-Commerce",
          shopify: "D2C Direct Storefronts",
        };
        const parsed: PlatformItem[] = JSON.parse(savedPlatforms);
        const normalized = parsed.map(p => ({
          ...p,
          channelType: p.channelType || defaultChannelMap[p.slug] || "General Marketplaces"
        }));
        setPlatforms(normalized);
      }
      const savedBrands = localStorage.getItem("gl_admin_brands");
      if (savedBrands) setBrands(JSON.parse(savedBrands));
      const savedCats = localStorage.getItem("gl_admin_categories");
      if (savedCats) setCategories(JSON.parse(savedCats));
      const savedSettings = localStorage.getItem("gl_admin_settings");
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
      const savedRedirects = localStorage.getItem("gl_admin_redirects");
      if (savedRedirects) setRedirects(JSON.parse(savedRedirects));
    } catch (_) {}

    // Fallback sync with NestJS / Express backend if running
    async function syncBackend() {
      try {
        const leadsRes = await fetch("http://localhost:5000/api/v1/leads");
        if (leadsRes.ok) {
          const data = await leadsRes.json();
          if (Array.isArray(data)) setLeads(data);
        }
      } catch (_) {}
      try {
        const pRes = await fetch("http://localhost:5000/api/v1/platforms");
        if (pRes.ok) {
          const data = await pRes.json();
          if (Array.isArray(data) && data.length > 0) setPlatforms(data);
        }
      } catch (_) {}
      try {
        const bRes = await fetch("http://localhost:5000/api/v1/brands");
        if (bRes.ok) {
          const data = await bRes.json();
          if (Array.isArray(data) && data.length > 0) setBrands(data);
        }
      } catch (_) {}
      try {
        const cRes = await fetch("http://localhost:5000/api/v1/categories");
        if (cRes.ok) {
          const data = await cRes.json();
          if (Array.isArray(data) && data.length > 0) setCategories(data);
        }
      } catch (_) {}
      try {
        const crmRes = await fetch("http://localhost:5000/api/v1/crm");
        if (crmRes.ok) {
          const data = await crmRes.json();
          if (data && typeof data === "object") setCrmConfig(data);
        }
      } catch (_) {}
      try {
        const rRes = await fetch("http://localhost:5000/api/v1/redirects");
        if (rRes.ok) {
          const data = await rRes.json();
          if (Array.isArray(data) && data.length > 0) setRedirects(data);
        }
      } catch (_) {}
      try {
        const sRes = await fetch("http://localhost:5000/api/v1/settings");
        if (sRes.ok) {
          const data = await sRes.json();
          if (data && typeof data === "object") setSiteSettings(data);
        }
      } catch (_) {}
      try {
        const artRes = await fetch("http://localhost:5000/api/v1/articles");
        if (artRes.ok) {
          const data = await artRes.json();
          if (Array.isArray(data)) {
            setArticles(data);
            try { localStorage.setItem("gl_admin_articles", JSON.stringify(data)); } catch (_) {}
          }
        }
      } catch (_) {}
      try {
        const faqRes = await fetch("http://localhost:5000/api/v1/faqs");
        if (faqRes.ok) {
          const data = await faqRes.json();
          if (Array.isArray(data)) {
            setFaqs(data);
            try { localStorage.setItem("gl_admin_faqs", JSON.stringify(data)); } catch (_) {}
          }
        }
      } catch (_) {}
      try {
        const authRes = await fetch("http://localhost:5000/api/v1/authors");
        if (authRes.ok) {
          const data = await authRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setAuthors(data);
            setCurrentUser(prev => prev || data[0]);
            try { localStorage.setItem("gl_admin_authors", JSON.stringify(data)); } catch (_) {}
          }
        }
      } catch (_) {}
      try {
        const mRes = await fetch("http://localhost:5000/api/v1/meetings");
        if (mRes.ok) {
          const data = await mRes.json();
          if (Array.isArray(data)) {
            setMeetings(data);
            try { localStorage.setItem("gl_admin_meetings", JSON.stringify(data)); } catch (_) {}
          }
        }
      } catch (_) {}
      try {
        const mcRes = await fetch("http://localhost:5000/api/v1/meetings/config");
        if (mcRes.ok) {
          const data = await mcRes.json();
          if (data && typeof data === "object") setCalendarConfig(data);
        }
      } catch (_) {}
    }
    syncBackend();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const logActivity = (action: string, target: string, details?: string) => {
    const user = currentUser || authors[0];
    const now = new Date();
    const timeStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newLog: AuditLogItem = {
      id: "log-" + Date.now(),
      userId: user?.id || "auth-1",
      userName: user?.name || "Rajeev Nair",
      userRole: user?.roleType || "Super Admin",
      userAvatar: user?.avatar,
      action,
      target,
      details,
      timestamp: timeStr
    };
    setAuditLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 99)];
      try { localStorage.setItem("gl_admin_audit_logs", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
  };

  const loginUser = (email: string, password?: string) => {
    const matched = authors.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!matched) {
      return { success: false, message: "No author found with this email." };
    }
    if (password && matched.password && matched.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    setCurrentUser(matched);
    logActivity("Logged In", matched.name, `Authenticated as ${matched.roleType}`);
    showToast(`Welcome back, ${matched.name}!`);
    return { success: true };
  };

  const switchUser = (authorId: string) => {
    const matched = authors.find(a => a.id === authorId);
    if (matched) {
      setCurrentUser(matched);
      logActivity("Switched Session", matched.name, `Active session switched to ${matched.roleType}`);
      showToast(`Switched session to ${matched.name}`);
    }
  };

  const logoutUser = () => {
    if (currentUser) {
      logActivity("Logged Out", currentUser.name, "User session terminated");
    }
    setCurrentUser(null);
    showToast("Logged out successfully");
  };

  // Platform actions
  const savePlatform = (item: Partial<PlatformItem>, id?: string) => {
    if (!item.name?.trim()) return;
    const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const svgCode = item.svgCode || `<svg viewBox="0 0 140 40" width="140" height="40" fill="none"><text x="4" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#2563EB">${item.name}</text></svg>`;

    if (id) {
      setPlatforms(prev => {
        const updated = prev.map(p => p.id === id ? { ...p, ...item, slug, svgCode, channelType: item.channelType || p.channelType || "General Marketplaces" } : p);
        try { localStorage.setItem("gl_admin_platforms", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`Updated platform: ${item.name}`);
    } else {
      const newP: PlatformItem = {
        id: "p-" + Date.now(),
        name: item.name,
        slug,
        websiteUrl: item.websiteUrl || "",
        svgCode,
        orderIndex: platforms.length + 1,
        isActive: true,
        channelType: item.channelType || "General Marketplaces"
      };
      setPlatforms(prev => {
        const updated = [...prev, newP];
        try { localStorage.setItem("gl_admin_platforms", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`Added new platform: ${item.name}`);
    }
  };

  const deletePlatform = (id: string) => {
    setPlatforms(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem("gl_admin_platforms", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Platform removed");
  };

  const togglePlatformStatus = (id: string) => {
    setPlatforms(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p);
      try { localStorage.setItem("gl_admin_platforms", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Platform status toggled");
  };

  // Brand actions
  const saveBrand = (item: Partial<BrandItem>, id?: string) => {
    if (!item.name?.trim()) return;
    const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const svgCode = item.svgCode || `<svg viewBox="0 0 140 40" width="140" height="40" fill="none"><text x="4" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#1E293B">${item.name}</text></svg>`;

    if (id) {
      setBrands(prev => {
        const updated = prev.map(b => b.id === id ? { ...b, ...item, slug, svgCode } : b);
        try { localStorage.setItem("gl_admin_brands", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      // Sync to backend API
      fetch(`http://localhost:5000/api/v1/brands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, slug, svgCode })
      }).catch(() => {});
      showToast(`Updated brand: ${item.name}`);
    } else {
      const newB: BrandItem = {
        id: "b-" + Date.now(),
        name: item.name,
        slug,
        category: item.category || "Home & Kitchen Appliances",
        websiteUrl: item.websiteUrl || "",
        svgCode,
        orderIndex: brands.length + 1,
        isActive: true
      };
      setBrands(prev => {
        const updated = [...prev, newB];
        try { localStorage.setItem("gl_admin_brands", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      // Sync to backend API
      fetch("http://localhost:5000/api/v1/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newB)
      }).catch(() => {});
      showToast(`Added new brand: ${item.name}`);
    }
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => {
      const updated = prev.filter(b => b.id !== id);
      try { localStorage.setItem("gl_admin_brands", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    // Sync to backend API
    fetch(`http://localhost:5000/api/v1/brands/${id}`, {
      method: "DELETE"
    }).catch(() => {});
    showToast("Brand removed");
  };

  const toggleBrandStatus = (id: string) => {
    setBrands(prev => {
      const updated = prev.map(b => {
        if (b.id === id) {
          const newStatus = !b.isActive;
          fetch(`http://localhost:5000/api/v1/brands/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: newStatus })
          }).catch(() => {});
          return { ...b, isActive: newStatus };
        }
        return b;
      });
      try { localStorage.setItem("gl_admin_brands", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Brand status updated");
  };

  // Category actions
  const saveCategory = (item: Partial<CategoryItem>, id?: string) => {
    if (!item.name?.trim()) return;
    const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (id) {
      setCategories(prev => {
        const updated = prev.map(c => c.id === id ? { ...c, ...item, slug } : c);
        try { localStorage.setItem("gl_admin_categories", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`Updated category: ${item.name}`);
    } else {
      const newC: CategoryItem = {
        id: "c-" + Date.now(),
        name: item.name,
        slug,
        description: item.description || "",
        subcategories: item.subcategories || [],
        icon: item.icon || "box",
        orderIndex: categories.length + 1,
        isActive: true
      };
      setCategories(prev => {
        const updated = [...prev, newC];
        try { localStorage.setItem("gl_admin_categories", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`Added new category: ${item.name}`);
    }
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => {
      const updated = prev.filter(c => c.id !== id);
      try { localStorage.setItem("gl_admin_categories", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Category removed");
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c);
      try { localStorage.setItem("gl_admin_categories", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Category status toggled");
  };

  // Leads actions with Persistence
  const deleteLead = (id: string) => {
    setLeads(prev => {
      const updated = prev.filter(l => l.id !== id);
      try { localStorage.setItem("gl_admin_leads", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Lead removed from CRM & list");
  };

  const updateLeadStatus = (id: string, tag: string) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, tags: Array.from(new Set([...l.tags, tag])) } : l);
      try { localStorage.setItem("gl_admin_leads", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast(`Lead tagged as: ${tag}`);
  };

  const resendLeadEmail = (id: string) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? {
        ...l,
        emailStatus: "Delivered" as const,
        emailSentAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
      } : l);
      try { localStorage.setItem("gl_admin_leads", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Confirmation email dispatched to lead!");
  };

  const addLead = (lead: Partial<LeadItem>) => {
    const newL: LeadItem = {
      id: "lead-" + Date.now(),
      company: lead.company || "Enterprise Prospect",
      website: lead.website || "",
      contact: lead.contact || "Representative",
      email: lead.email || "prospect@example.com",
      mobile: lead.mobile || "+91 98000 00000",
      category: lead.category || "Home & Kitchen Appliances",
      gmv: lead.gmv || "₹5 Cr - ₹15 Cr",
      intent: lead.intent || "Scale PAN-India Marketplaces",
      timeline: lead.timeline || "Immediate (Next 30 Days)",
      tags: lead.tags || ["Landing Page"],
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      marketplaces: lead.marketplaces || ["Amazon", "Flipkart"],
      orderVolume: lead.orderVolume || "2,000 units/mo",
      operatingModel: lead.operatingModel || "Brand Direct",
      warehouseModel: lead.warehouseModel || "Regional Fulfillment",
      challenges: lead.challenges || [],
      reconciled: lead.reconciled || "In Progress",
      source: lead.source || "Landing Page",
      emailStatus: "Delivered",
      emailSentAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      crmStatus: "Synced to Zoho CRM"
    };
    setLeads(prev => {
      const updated = [newL, ...prev];
      try { localStorage.setItem("gl_admin_leads", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
  };


  // Articles / Insights actions
  const saveArticle = (item: Partial<ArticleItem>, id?: string) => {
    if (!item.title?.trim()) return;
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const dateStr = item.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    if (id) {
      setArticles(prev => {
        const updated = prev.map(a => a.id === id ? {
          ...a,
          ...item,
          slug: item.slug || a.slug || slug,
          date: dateStr,
          publishedAt: item.status === "Published" ? (a.publishedAt || new Date().toISOString()) : a.publishedAt
        } : a);
        try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast("Insight updated successfully");

      setTimeout(async () => {
        try {
          await fetch(`http://localhost:5000/api/v1/articles/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...item, slug: item.slug || slug }),
          });
        } catch (_) {}
      }, 50);
    } else {
      const newA: ArticleItem = {
        id: "art-" + Date.now(),
        title: item.title,
        slug,
        excerpt: item.excerpt || "",
        content: item.content || "",
        featuredImage: item.featuredImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
        imageAlt: item.imageAlt || item.title,
        category: item.category || "Marketplace Operations",
        status: item.status || "Draft",
        author: item.author || "Good Life Editorial",
        authorRole: item.authorRole || "Commerce Practice",
        authorPhoto: item.authorPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        tags: item.tags || ["Marketplace", "Commerce"],
        date: dateStr,
        publishedAt: item.status === "Published" ? new Date().toISOString() : undefined,
        scheduledAt: item.scheduledAt,
        seoTitle: item.seoTitle || `${item.title} | Good Life Sutra`,
        seoDesc: item.seoDesc || item.excerpt || "",
        canonicalUrl: item.canonicalUrl || `/insights/${slug}`,
        ogImage: item.ogImage || item.featuredImage,
        readTime: item.readTime || "6 min read"
      };
      setArticles(prev => {
        const updated = [newA, ...prev];
        try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast("New Insight created successfully");

      setTimeout(async () => {
        try {
          const res = await fetch("http://localhost:5000/api/v1/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newA),
          });
          if (res.ok) {
            const created = await res.json();
            if (created && created.id) {
              setArticles(prev => prev.map(a => a.id === newA.id ? created : a));
            }
          }
        } catch (_) {}
      }, 50);
    }
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Insight deleted");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/articles/${id}`, { method: "DELETE" });
      } catch (_) {}
    }, 50);
  };

  const toggleArticleStatus = (id: string) => {
    setArticles(prev => {
      const updated = prev.map(a => {
        if (a.id !== id) return a;
        const newStatus: "Published" | "Draft" = a.status === "Published" ? "Draft" : "Published";
        return {
          ...a,
          status: newStatus,
          publishedAt: newStatus === "Published" ? (a.publishedAt || new Date().toISOString()) : undefined
        };
      });
      try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Publication status updated");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/articles/${id}/toggle`, { method: "PATCH" });
      } catch (_) {}
    }, 50);
  };

  const duplicateArticle = (id: string) => {
    const existing = articles.find(a => a.id === id);
    if (!existing) return;
    const newA: ArticleItem = {
      ...existing,
      id: "art-" + Date.now(),
      title: `${existing.title} (Draft Copy)`,
      slug: `${existing.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
      status: "Draft",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      publishedAt: undefined
    };
    setArticles(prev => {
      const updated = [newA, ...prev];
      try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast(`Duplicated draft: ${existing.title}`);

    setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/articles/${id}/duplicate`, { method: "POST" });
        if (res.ok) {
          const dup = await res.json();
          if (dup && dup.id) {
            setArticles(prev => prev.map(a => a.id === newA.id ? dup : a));
          }
        }
      } catch (_) {}
    }, 50);
  };

  // Site Settings
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...settings };
      try { localStorage.setItem("gl_admin_settings", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    try {
      await fetch("http://localhost:5000/api/v1/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch (_) {}
    logActivity("Updated Site Configuration", "Settings & Analytics", "Saved global configuration, tracking IDs, and corporate registration");
    showToast("Site configuration saved successfully!");
  };

  // Author & User Account Actions
  const saveAuthor = (item: Partial<AuthorItem>, id?: string) => {
    if (!item.name?.trim()) return;
    if (id) {
      setAuthors(prev => {
        const updated = prev.map(a => a.id === id ? {
          ...a,
          ...item,
          name: item.name!,
          role: item.role || a.role,
          roleType: item.roleType || a.roleType || "Author & Editor",
          avatar: item.avatar || a.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
          status: item.status || a.status || "Active"
        } : a);
        try { localStorage.setItem("gl_admin_authors", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Updated Author Profile", item.name, `Role: ${item.role || "Author"}`);
      showToast(`Updated author profile: ${item.name}`);

      setTimeout(async () => {
        try {
          await fetch(`http://localhost:5000/api/v1/authors/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } catch (_) {}
      }, 50);
    } else {
      const newAuth: AuthorItem = {
        id: "auth-" + Date.now(),
        name: item.name,
        email: item.email || `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@goodlifesutra.com`,
        password: item.password || "author_pass_2026",
        role: item.role || "Commerce Specialist",
        roleType: item.roleType || "Author & Editor",
        bio: item.bio || "",
        avatar: item.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        linkedin: item.linkedin || "",
        articlesCount: 0,
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: "Never"
      };
      setAuthors(prev => {
        const updated = [...prev, newAuth];
        try { localStorage.setItem("gl_admin_authors", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Created Author Account", newAuth.name, `Login ID: ${newAuth.email}`);
      showToast(`Created author account: ${newAuth.name}`);

      setTimeout(async () => {
        try {
          const res = await fetch("http://localhost:5000/api/v1/authors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAuth),
          });
          if (res.ok) {
            const created = await res.json();
            if (created && created.id) {
              setAuthors(prev => prev.map(a => a.id === newAuth.id ? created : a));
            }
          }
        } catch (_) {}
      }, 50);
    }
  };

  const deleteAuthor = (id: string) => {
    const existing = authors.find(a => a.id === id);
    setAuthors(prev => {
      const updated = prev.filter(a => a.id !== id);
      try { localStorage.setItem("gl_admin_authors", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    if (existing) {
      logActivity("Deleted Author Account", existing.name);
    }
    showToast("Author profile removed");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/authors/${id}`, { method: "DELETE" });
      } catch (_) {}
    }, 50);
  };

  const toggleAuthorStatus = (id: string) => {
    setAuthors(prev => {
      const updated = prev.map(a => a.id === id ? {
        ...a,
        status: (a.status === "Active" ? "Inactive" : "Active") as "Active" | "Inactive"
      } : a);
      try { localStorage.setItem("gl_admin_authors", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Author account status updated");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/authors/${id}/toggle`, { method: "PATCH" });
      } catch (_) {}
    }, 50);
  };

  // Landing Page Actions (Predefined Section Builder)
  const saveLandingPage = (item: Partial<LandingPageItem>, id?: string) => {
    if (!item.title?.trim()) return;
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (id) {
      setLandingPages(prev => prev.map(lp => lp.id === id ? { ...lp, ...item, slug, lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) } : lp));
      showToast("Landing page configuration saved");
    } else {
      const newLp: LandingPageItem = {
        id: "lp-" + Date.now(),
        title: item.title,
        slug,
        sections: item.sections || ["Hero Banner", "Features", "Proof Stats", "CTA", "Contact Form"],
        status: item.status || "Active",
        ctaText: item.ctaText || "Get Started →",
        lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };
      setLandingPages(prev => [...prev, newLp]);
      showToast("New landing page assembled successfully");
    }
  };

  const deleteLandingPage = (id: string) => {
    setLandingPages(prev => prev.filter(lp => lp.id !== id));
    showToast("Landing page removed");
  };

  const toggleLandingPageStatus = (id: string) => {
    setLandingPages(prev => prev.map(lp => lp.id === id ? { ...lp, status: lp.status === "Active" ? "Draft" : "Active" } : lp));
    showToast("Landing page status toggled");
  };

  // SEO Page Actions with Persistence
  const saveSeoPage = (item: Partial<SeoPageItem>, id?: string) => {
    if (!item.metaTitle?.trim()) return;
    if (id) {
      setSeoPages(prev => {
        const updated = prev.map(s => s.id === id ? { ...s, ...item } : s);
        try { localStorage.setItem("gl_admin_seo_pages", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`SEO tags updated for ${item.pageName || "route"}`);
    } else {
      const newSeo: SeoPageItem = {
        id: "seo-" + Date.now(),
        pagePath: item.pagePath || "/new-page",
        pageName: item.pageName || "New Page",
        category: item.category || "Custom",
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription || "",
        keywords: item.keywords || "",
        canonical: item.canonical || `https://goodlifesutra.com${item.pagePath || ""}`,
        robots: item.robots || "index, follow"
      };
      setSeoPages(prev => {
        const updated = [...prev, newSeo];
        try { localStorage.setItem("gl_admin_seo_pages", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast(`Added new SEO route: ${item.pagePath}`);
    }
  };

  const deleteSeoPage = (id: string) => {
    setSeoPages(prev => {
      const updated = prev.filter(s => s.id !== id);
      try { localStorage.setItem("gl_admin_seo_pages", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("SEO route deleted");
  };


  // FAQ Actions with Database and LocalStorage Persistence
  const saveFaq = (item: Partial<FaqItem>, id?: string) => {
    if (!item.question?.trim()) return;

    if (id) {
      setFaqs(prev => {
        const updated = prev.map(f => f.id === id ? {
          ...f,
          ...item,
          category: item.category || f.category,
          status: item.status || f.status || "Published",
          orderIndex: item.orderIndex !== undefined ? Number(item.orderIndex) : f.orderIndex,
          isFeatured: item.isFeatured !== undefined ? !!item.isFeatured : f.isFeatured
        } : f);
        try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Updated FAQ", item.question.slice(0, 35) + "...", `Category: ${item.category || "General"}`);
      showToast(`FAQ updated: "${item.question.slice(0, 32)}..."`);

      setTimeout(async () => {
        try {
          await fetch(`http://localhost:5000/api/v1/faqs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } catch (_) {}
      }, 50);
    } else {
      const newF: FaqItem = {
        id: "faq-" + Date.now(),
        question: item.question,
        answer: item.answer || "",
        category: item.category || "General",
        status: item.status || "Published",
        orderIndex: item.orderIndex !== undefined ? Number(item.orderIndex) : (faqs.length + 1),
        isFeatured: !!item.isFeatured
      };
      setFaqs(prev => {
        const updated = [...prev, newF];
        try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Created FAQ", newF.question.slice(0, 35) + "...", `Category: ${newF.category}`);
      showToast("Added new FAQ to Database");

      setTimeout(async () => {
        try {
          const res = await fetch("http://localhost:5000/api/v1/faqs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newF),
          });
          if (res.ok) {
            const created = await res.json();
            if (created && created.id) {
              setFaqs(prev => prev.map(f => f.id === newF.id ? created : f));
            }
          }
        } catch (_) {}
      }, 50);
    }
  };

  const deleteFaq = (id: string) => {
    const target = faqs.find(f => f.id === id);
    setFaqs(prev => {
      const updated = prev.filter(f => f.id !== id);
      try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    if (target) {
      logActivity("Deleted FAQ", target.question.slice(0, 35) + "...", `Category: ${target.category}`);
    }
    showToast("FAQ removed from Database");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/faqs/${id}`, { method: "DELETE" });
      } catch (_) {}
    }, 50);
  };

  const toggleFaqStatus = (id: string) => {
    let targetQ = "";
    let newStatus: "Published" | "Draft" = "Published";
    setFaqs(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          targetQ = f.question;
          newStatus = f.status === "Published" ? "Draft" : "Published";
          return { ...f, status: newStatus };
        }
        return f;
      });
      try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    logActivity(newStatus === "Published" ? "Published FAQ" : "Unpublished FAQ", targetQ.slice(0, 35) + "...", `Status set to ${newStatus}`);
    showToast(`FAQ status changed to ${newStatus}`);

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/faqs/${id}/toggle`, { method: "PATCH" });
      } catch (_) {}
    }, 50);
  };

  const toggleFaqFeatured = (id: string) => {
    let targetQ = "";
    let isNowFeatured = false;
    setFaqs(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          targetQ = f.question;
          isNowFeatured = !f.isFeatured;
          return { ...f, isFeatured: isNowFeatured };
        }
        return f;
      });
      try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    logActivity(isNowFeatured ? "Pinned Featured FAQ" : "Unpinned Featured FAQ", targetQ.slice(0, 35) + "...");
    showToast(isNowFeatured ? "FAQ pinned as Featured" : "FAQ unpinned from Featured");

    setTimeout(async () => {
      try {
        await fetch(`http://localhost:5000/api/v1/faqs/${id}/featured`, { method: "PATCH" });
      } catch (_) {}
    }, 50);
  };

  const duplicateFaq = (id: string) => {
    const orig = faqs.find(f => f.id === id);
    if (!orig) return;
    const copy: FaqItem = {
      ...orig,
      id: "faq-" + Date.now(),
      question: `${orig.question} (Copy)`,
      status: "Draft",
      orderIndex: faqs.length + 1
    };
    setFaqs(prev => {
      const updated = [...prev, copy];
      try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    logActivity("Duplicated FAQ", copy.question.slice(0, 35) + "...", "Created draft copy");
    showToast("FAQ duplicated as Draft");

    setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/faqs/${id}/duplicate`, { method: "POST" });
        if (res.ok) {
          const dup = await res.json();
          if (dup && dup.id) {
            setFaqs(prev => prev.map(f => f.id === copy.id ? dup : f));
          }
        }
      } catch (_) {}
    }, 50);
  };

  // Case Study Actions with Full CMS Attributes
  const saveCaseStudy = (item: Partial<CaseStudyItem>, id?: string) => {
    if (!item.title?.trim()) return;
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const statsStr = item.stats || (item.metrics && item.metrics.length > 0 ? item.metrics.map(m => `${m.val} ${m.lbl}`).join(" · ") : "Verified Transformation");

    if (id) {
      setCaseStudies(prev => {
        const updated = prev.map(c => c.id === id ? {
          ...c,
          ...item,
          slug,
          stats: statsStr,
          category: item.industry || c.category,
          industry: item.industry || c.industry || "Home & Kitchen Appliances"
        } : c);
        try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Updated Case Study", item.title, `Client: ${item.client || "Client"}`);
      showToast("Case Study updated successfully");
    } else {
      const newCs: CaseStudyItem = {
        id: "cs-" + Date.now(),
        title: item.title,
        slug,
        client: item.client || "Brand Partner",
        category: item.industry || "Home & Kitchen Appliances",
        industry: item.industry || "Home & Kitchen Appliances",
        location: item.location || "India",
        timeframe: item.timeframe || "6 Months",
        shortDescription: item.shortDescription || "",
        coverImage: item.coverImage || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80",
        imageAlt: item.imageAlt || item.title,
        challenge: item.challenge || "",
        solution: item.solution || "",
        actionTaken: item.actionTaken || [],
        capabilities: item.capabilities || ["Marketplace Operations"],
        metrics: item.metrics || [{ val: "+45%", lbl: "Growth Rate" }],
        stats: statsStr,
        testimonial: item.testimonial,
        status: item.status || "Draft",
        isFeatured: item.isFeatured ?? false,
        publishedAt: item.status === "Published" ? new Date().toISOString() : undefined,
        seoTitle: item.seoTitle || `${item.title} | Good Life Sutra`,
        seoDesc: item.seoDesc || item.shortDescription || "",
        canonicalUrl: item.canonicalUrl || `/case-studies/${slug}`,
        ogImage: item.ogImage || item.coverImage
      };
      setCaseStudies(prev => {
        const updated = [newCs, ...prev];
        try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Created Case Study", newCs.title, `Status: ${newCs.status}`);
      showToast("New Case Study created successfully");
    }
  };

  const deleteCaseStudy = (id: string) => {
    const existing = caseStudies.find(c => c.id === id);
    setCaseStudies(prev => {
      const updated = prev.filter(c => c.id !== id);
      try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    if (existing) {
      logActivity("Deleted Case Study", existing.title);
    }
    showToast("Case study removed");
  };

  const toggleCaseStudyStatus = (id: string) => {
    setCaseStudies(prev => {
      const updated = prev.map(cs => {
        if (cs.id !== id) return cs;
        const newStatus: "Published" | "Draft" = cs.status === "Published" ? "Draft" : "Published";
        return {
          ...cs,
          status: newStatus,
          publishedAt: newStatus === "Published" ? (cs.publishedAt || new Date().toISOString()) : undefined
        };
      });
      try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Case study status updated");
  };

  const toggleCaseStudyFeatured = (id: string) => {
    setCaseStudies(prev => {
      const updated = prev.map(cs => cs.id === id ? { ...cs, isFeatured: !cs.isFeatured } : cs);
      try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Featured status updated");
  };

  const duplicateCaseStudy = (id: string) => {
    const existing = caseStudies.find(cs => cs.id === id);
    if (!existing) return;
    const newCs: CaseStudyItem = {
      ...existing,
      id: "cs-" + Date.now(),
      title: `${existing.title} (Draft Copy)`,
      slug: `${existing.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
      status: "Draft",
      isFeatured: false,
      publishedAt: undefined
    };
    setCaseStudies(prev => {
      const updated = [newCs, ...prev];
      try { localStorage.setItem("gl_admin_case_studies", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    logActivity("Duplicated Case Study", newCs.title);
    showToast(`Duplicated: ${existing.title}`);
  };

  // Real CRM Integration Methods (Persisted to PostgreSQL & NestJS API)
  const updateCrmConfig = async (config: Partial<CrmConfig>) => {
    const updated = { ...crmConfig, ...config };
    setCrmConfig(updated);
    try {
      localStorage.setItem("gl_admin_crm", JSON.stringify(updated));
    } catch (_) {}

    try {
      const res = await fetch("http://localhost:5000/api/v1/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        const saved = await res.json();
        setCrmConfig(saved);
        showToast("CRM configuration saved to PostgreSQL!");
      }
    } catch (e) {
      showToast("CRM config updated locally (backend sync pending)");
    }
  };

  const testCrmWebhook = async (dto?: { provider?: string; webhookUrl?: string; apiKey?: string }) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/crm/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto || {}),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Webhook verified successfully!");
        const refreshed = await fetch("http://localhost:5000/api/v1/crm").then(r => r.json()).catch(() => null);
        if (refreshed) setCrmConfig(refreshed);
      } else {
        showToast(data.message || "Webhook test failed.");
      }
      return data;
    } catch (err: any) {
      const msg = "Network error while connecting to CRM endpoint";
      showToast(msg);
      return { success: false, message: msg };
    }
  };

  const disconnectCrm = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/crm/disconnect", { method: "POST" });
      if (res.ok) {
        const saved = await res.json();
        setCrmConfig(saved);
      } else {
        setCrmConfig(prev => ({ ...prev, isConnected: false, autoSync: false, lastSyncStatus: "Disconnected", provider: "", webhookUrl: "" }));
      }
      showToast("CRM disconnected. Inbound leads remain exclusively in local database.");
    } catch (_) {
      setCrmConfig(prev => ({ ...prev, isConnected: false, autoSync: false, lastSyncStatus: "Disconnected", provider: "", webhookUrl: "" }));
      showToast("CRM disconnected.");
    }
  };

  const syncPendingLeadsToCrm = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/crm/sync-now", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Leads pushed to CRM successfully!");
        const [refreshedLeads, refreshedCrm] = await Promise.all([
          fetch("http://localhost:5000/api/v1/leads").then(r => r.json()).catch(() => null),
          fetch("http://localhost:5000/api/v1/crm").then(r => r.json()).catch(() => null),
        ]);
        if (Array.isArray(refreshedLeads)) setLeads(refreshedLeads);
        if (refreshedCrm) setCrmConfig(refreshedCrm);
        return { success: true, message: data.message };
      } else {
        showToast(data.message || "Failed to sync leads to CRM.");
        return { success: false, message: data.message };
      }
    } catch (e: any) {
      const msg = "Failed to communicate with CRM sync service.";
      showToast(msg);
      return { success: false, message: msg };
    }
  };

  // Real Redirects Actions (Persisted to PostgreSQL & NestJS Backend)
  const saveRedirect = async (item: Partial<RedirectItem>, id?: string) => {
    if (!item.from?.trim() || !item.to?.trim()) return;
    let fromUrl = item.from.trim();
    if (!fromUrl.startsWith("/") && !fromUrl.startsWith("http")) fromUrl = `/${fromUrl}`;
    const toUrl = item.to.trim();
    const code = Number(item.code) || 301;

    try {
      if (id) {
        const res = await fetch(`http://localhost:5000/api/v1/redirects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: fromUrl, to: toUrl, code }),
        });
        if (res.ok) {
          const updated = await res.json();
          setRedirects(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
          showToast(`Redirect rule updated: ${fromUrl} → ${toUrl}`);
        } else {
          showToast("Failed to update redirect rule in database.");
        }
      } else {
        const res = await fetch("http://localhost:5000/api/v1/redirects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: fromUrl, to: toUrl, code }),
        });
        if (res.ok) {
          const created = await res.json();
          setRedirects(prev => [created, ...prev]);
          showToast(`Redirect created: ${fromUrl} → ${toUrl}`);
        } else {
          const err = await res.json().catch(() => ({ message: "Failed to create" }));
          showToast(err.message || "Failed to create redirect in database.");
        }
      }
    } catch (e) {
      // Local fallback
      if (id) {
        setRedirects(prev => prev.map(r => r.id === id ? { ...r, from: fromUrl, to: toUrl, code } : r));
      } else {
        const localItem: RedirectItem = {
          id: "r-" + Date.now(),
          from: fromUrl,
          to: toUrl,
          code,
          clicks: 0,
        };
        setRedirects(prev => [localItem, ...prev]);
      }
      showToast("Redirect rule saved locally.");
    }
  };

  const deleteRedirect = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/v1/redirects/${id}`, { method: "DELETE" });
    } catch (_) {}
    setRedirects(prev => prev.filter(r => r.id !== id));
    showToast("Redirect rule deleted from database.");
  };

  const saveMeeting = async (item: Partial<MeetingItem>, id?: string) => {
    try {
      if (id) {
        const res = await fetch(`http://localhost:5000/api/v1/meetings/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (res.ok) {
          const updated = await res.json();
          setMeetings(prev => prev.map(m => m.id === id ? updated : m));
          try {
            const list = JSON.parse(localStorage.getItem("gl_admin_meetings") || "[]");
            localStorage.setItem("gl_admin_meetings", JSON.stringify(list.map((m: any) => m.id === id ? updated : m)));
          } catch (_) {}
          showToast(`Meeting with ${updated.clientName} updated`);
        }
      } else {
        const res = await fetch("http://localhost:5000/api/v1/meetings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (res.ok) {
          const created = await res.json();
          setMeetings(prev => [created, ...prev]);
          try {
            const list = JSON.parse(localStorage.getItem("gl_admin_meetings") || "[]");
            localStorage.setItem("gl_admin_meetings", JSON.stringify([created, ...list]));
          } catch (_) {}
          showToast(`Meeting scheduled with ${created.clientName}`);
        }
      }
    } catch (_) {
      showToast("Error saving meeting details");
    }
  };

  const updateMeetingStatus = async (id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/meetings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMeetings(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        try {
          const list = JSON.parse(localStorage.getItem("gl_admin_meetings") || "[]");
          localStorage.setItem("gl_admin_meetings", JSON.stringify(list.map((m: any) => m.id === id ? { ...m, status } : m)));
        } catch (_) {}
        showToast(`Meeting status marked as ${status}`);
      }
    } catch (_) {
      showToast("Error updating meeting status");
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/v1/meetings/${id}`, { method: "DELETE" });
      setMeetings(prev => prev.filter(m => m.id !== id));
      try {
        const list = JSON.parse(localStorage.getItem("gl_admin_meetings") || "[]");
        localStorage.setItem("gl_admin_meetings", JSON.stringify(list.filter((m: any) => m.id !== id)));
      } catch (_) {}
      showToast("Meeting booking removed");
    } catch (_) {
      showToast("Error deleting meeting");
    }
  };

  const sendMeetingReminder = async (id: string, type: "24h" | "1h" | "manual" = "manual"): Promise<boolean> => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/meetings/${id}/remind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (res.ok) {
        const data = await res.json();
        setMeetings(prev => prev.map(m => m.id === id ? {
          ...m,
          reminder24hSent: type === "24h" ? true : m.reminder24hSent,
          reminder1hSent: type === "1h" ? true : m.reminder1hSent,
        } : m));
        showToast(`Reminder dispatched successfully (${type})`);
        return true;
      }
      return false;
    } catch (_) {
      showToast("Failed to dispatch reminder");
      return false;
    }
  };

  const updateCalendarConfig = async (config: Partial<CalendarConfigItem>) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/meetings/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        const data = await res.json();
        setCalendarConfig(data);
        showToast("Calendar booking configuration saved successfully");
      }
    } catch (_) {
      showToast("Error updating calendar settings");
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        platforms,
        setPlatforms,
        savePlatform,
        deletePlatform,
        togglePlatformStatus,

        meetings,
        calendarConfig,
        saveMeeting,
        updateMeetingStatus,
        deleteMeeting,
        sendMeetingReminder,
        updateCalendarConfig,

        brands,
        setBrands,
        saveBrand,
        deleteBrand,
        toggleBrandStatus,

        categories,
        setCategories,
        saveCategory,
        deleteCategory,
        toggleCategoryStatus,

        leads,
        deleteLead,
        updateLeadStatus,
        resendLeadEmail,
        addLead,

        articles,
        saveArticle,
        deleteArticle,
        toggleArticleStatus,
        duplicateArticle,

        authors,
        saveAuthor,
        deleteAuthor,
        toggleAuthorStatus,

        currentUser,
        setCurrentUser,
        auditLogs,
        logActivity,
        loginUser,
        switchUser,
        logoutUser,

        landingPages,
        saveLandingPage,
        deleteLandingPage,
        toggleLandingPageStatus,

        seoPages,
        saveSeoPage,
        deleteSeoPage,

        crmConfig,
        updateCrmConfig,
        testCrmWebhook,
        disconnectCrm,
        syncPendingLeadsToCrm,

        caseStudies,
        saveCaseStudy,
        deleteCaseStudy,
        toggleCaseStudyStatus,
        toggleCaseStudyFeatured,
        duplicateCaseStudy,

        faqs,
        saveFaq,
        deleteFaq,
        toggleFaqStatus,
        toggleFaqFeatured,
        duplicateFaq,

        redirects,
        saveRedirect,
        deleteRedirect,

        siteSettings,
        updateSiteSettings,

        toast,
        showToast
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
