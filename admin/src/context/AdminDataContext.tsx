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

interface AdminDataContextType {
  platforms: PlatformItem[];
  setPlatforms: React.Dispatch<React.SetStateAction<PlatformItem[]>>;
  savePlatform: (item: Partial<PlatformItem>, id?: string) => void;
  deletePlatform: (id: string) => void;
  togglePlatformStatus: (id: string) => void;

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

const initialPlatforms: PlatformItem[] = [
  { id: "p-1", name: "Amazon India", slug: "amazon", websiteUrl: "https://www.amazon.in", orderIndex: 1, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 155 44" width="155" height="44" fill="none"><text x="2" y="29" font-family="sans-serif" font-weight="800" font-size="28" fill="#131921">amazon</text><path d="M 6 35 C 40 48, 80 47, 108 35" stroke="#FF9900" stroke-width="3.5" stroke-linecap="round" fill="none" /><polygon points="103,29 114,35 105,42 107,35" fill="#FF9900" /></svg>` },
  { id: "p-2", name: "Flipkart", slug: "flipkart", websiteUrl: "https://www.flipkart.com", orderIndex: 2, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><text x="4" y="31" font-family="sans-serif" font-weight="900" font-size="28" font-style="italic" fill="#2874F0">Flipkart</text><polygon points="126,8 142,8 138,20 122,20" fill="#FFE500" /></svg>` },
  { id: "p-3", name: "IndiaMART", slug: "indiamart", websiteUrl: "https://www.indiamart.com", orderIndex: 3, isActive: true, channelType: "B2B Wholesale", svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#0A5EB0"/><text x="38" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#0A5EB0">indiamart</text></svg>` },
  { id: "p-4", name: "Tradeindia", slug: "tradeindia", websiteUrl: "https://www.tradeindia.com", orderIndex: 4, isActive: true, channelType: "B2B Wholesale", svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#E62E2D"/><text x="38" y="29" font-family="sans-serif" font-weight="800" font-size="23" fill="#1E293B">tradeindia</text></svg>` },
  { id: "p-5", name: "Industrybuying", slug: "industrybuying", websiteUrl: "https://www.industrybuying.com", orderIndex: 5, isActive: true, channelType: "B2B Wholesale", svgCode: `<svg viewBox="0 0 180 44" width="180" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#F36F21"/><text x="8" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFF">IB</text><text x="38" y="27" font-family="sans-serif" font-weight="900" font-size="18" fill="#231F20">industrybuying</text></svg>` },
  { id: "p-6", name: "Meesho", slug: "meesho", websiteUrl: "https://www.meesho.com", orderIndex: 6, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 140 44" width="140" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28" fill="#F43397">meesho</text></svg>` },
  { id: "p-7", name: "Myntra", slug: "myntra", websiteUrl: "https://www.myntra.com", orderIndex: 7, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><path d="M 3 33 L 13 10 L 21 25 L 30 10 L 40 33" stroke="#FF3F6C" stroke-width="5" stroke-linecap="round" fill="none" /><text x="48" y="29" font-family="sans-serif" font-weight="800" font-size="26" fill="#282C3F">myntra</text></svg>` },
  { id: "p-8", name: "Blinkit", slug: "blinkit", websiteUrl: "https://www.blinkit.com", orderIndex: 8, isActive: true, channelType: "Quick-Commerce", svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="8" fill="#F8CB46" /><text x="40" y="29" font-family="sans-serif" font-weight="900" font-size="26" fill="#0C831F">blinkit</text></svg>` },
  { id: "p-9", name: "JioMart", slug: "jiomart", websiteUrl: "https://www.jiomart.com", orderIndex: 9, isActive: true, channelType: "Quick-Commerce", svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#E11900" /><text x="38" y="29" font-family="sans-serif" font-weight="900" font-size="26" fill="#008ECC">Mart</text></svg>` },
  { id: "p-10", name: "Nykaa", slug: "nykaa", websiteUrl: "https://www.nykaa.com", orderIndex: 10, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 130 44" width="130" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-style="italic" font-size="28" fill="#FC2779">NYKAA</text></svg>` },
  { id: "p-11", name: "Zepto", slug: "zepto", websiteUrl: "https://www.zepto.com", orderIndex: 11, isActive: true, channelType: "Quick-Commerce", svgCode: `<svg viewBox="0 0 120 44" width="120" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28"><tspan fill="#3E0067">z</tspan><tspan fill="#FF3269">epto</tspan></text></svg>` },
  { id: "p-12", name: "Moglix", slug: "moglix", websiteUrl: "https://www.moglix.com", orderIndex: 12, isActive: true, channelType: "B2B Wholesale", svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#E02A26" /><text x="40" y="29" font-family="sans-serif" font-weight="800" font-size="25" fill="#1E293B">moglix</text></svg>` },
  { id: "p-13", name: "Shopify", slug: "shopify", websiteUrl: "https://www.shopify.com", orderIndex: 13, isActive: true, channelType: "D2C Direct Storefronts", svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><path d="M 15 6 L 4 14 L 10 36 L 30 36 L 35 14 Z" fill="#95BF47" /><text x="42" y="29" font-family="sans-serif" font-weight="800" font-size="25" fill="#212326">shopify</text></svg>` },
  { id: "p-14", name: "AJIO", slug: "ajio", websiteUrl: "https://www.ajio.com", orderIndex: 14, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 120 44" width="120" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28" fill="#1E293B" letter-spacing="2px">AJIO</text></svg>` },
  { id: "p-15", name: "Snapmint", slug: "snapmint", websiteUrl: "https://www.snapmint.com", orderIndex: 15, isActive: true, channelType: "General Marketplaces", svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#00C29F" /><text x="38" y="29" font-family="sans-serif" font-weight="800" font-size="24" fill="#00C29F">snapmint</text></svg>` }
];

const initialBrands: BrandItem[] = [
  { id: "b-1", name: "Crompton", slug: "crompton", category: "Seasonal Category", websiteUrl: "", orderIndex: 1, isActive: true, svgCode: `<svg viewBox="0 0 150 42" width="150" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" fill="#004B87">Crompton</text></svg>` },
  { id: "b-2", name: "USHA", slug: "usha", category: "Sewing Machine", websiteUrl: "", orderIndex: 2, isActive: true, svgCode: `<svg viewBox="0 0 120 42" width="120" height="42" fill="none"><text x="4" y="30" font-family="sans-serif" font-weight="900" font-size="27" letter-spacing="2px" fill="#ED1C24">USHA</text></svg>` },
  { id: "b-3", name: "Havells", slug: "havells", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 3, isActive: true, svgCode: `<svg viewBox="0 0 145 42" width="145" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="22" fill="#E31E24">HAVELLS</text></svg>` },
  { id: "b-4", name: "Hindware", slug: "hindware", category: "Chimney", websiteUrl: "", orderIndex: 4, isActive: true, svgCode: `<svg viewBox="0 0 150 42" width="150" height="42" fill="none"><text x="4" y="29" font-family="Georgia, serif" font-weight="900" font-size="23" fill="#D32F2F">hindware</text></svg>` },
  { id: "b-5", name: "Kenstar", slug: "kenstar", category: "Seasonal Category", websiteUrl: "", orderIndex: 5, isActive: true, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" fill="#0072CE">KENSTAR</text></svg>` },
  { id: "b-6", name: "Bajaj", slug: "bajaj", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 6, isActive: true, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" fill="#004A97">BAJAJ</text></svg>` },
  { id: "b-7", name: "Livpure", slug: "livpure", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 7, isActive: true, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="800" font-size="24" fill="#00A3E0">Livpure</text></svg>` },
  { id: "b-8", name: "Luminus", slug: "luminus", category: "Invertors & Battery", websiteUrl: "", orderIndex: 8, isActive: true, svgCode: `<svg viewBox="0 0 145 42" width="145" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" fill="#002D72">LUMINOUS</text></svg>` },
  { id: "b-9", name: "Exide", slug: "exide", category: "Invertors & Battery", websiteUrl: "", orderIndex: 9, isActive: true, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="25" fill="#E4002B">EXIDE</text></svg>` },
  { id: "b-10", name: "Bhaburly", slug: "bhaburly", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 10, isActive: true, svgCode: `<svg viewBox="0 0 145 42" width="145" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="800" font-size="21" fill="#1E293B">BHABURLY</text></svg>` },
  { id: "b-11", name: "Amplesta", slug: "amplesta", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 11, isActive: true, svgCode: `<svg viewBox="0 0 150 42" width="150" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="22" fill="#2563EB">AMPLESTA</text></svg>` },
  { id: "b-12", name: "CG", slug: "cg", category: "Seasonal Category", websiteUrl: "", orderIndex: 12, isActive: true, svgCode: `<svg viewBox="0 0 110 42" width="110" height="42" fill="none"><rect x="4" y="7" width="28" height="26" rx="5" fill="#00529B"/><text x="10" y="26" font-family="sans-serif" font-weight="900" font-size="16" fill="#FFF">CG</text><text x="38" y="28" font-family="sans-serif" font-weight="900" font-size="21" fill="#00529B">Power</text></svg>` },
  { id: "b-13", name: "VW", slug: "vw", category: "TV", websiteUrl: "", orderIndex: 13, isActive: true, svgCode: `<svg viewBox="0 0 120 42" width="120" height="42" fill="none"><rect x="4" y="6" width="30" height="28" rx="4" fill="#0F172A"/><text x="8" y="26" font-family="sans-serif" font-weight="900" font-size="17" fill="#38BDF8">VW</text><text x="40" y="27" font-family="sans-serif" font-weight="800" font-size="19" fill="#0F172A">Vision</text></svg>` },
  { id: "b-14", name: "IVAS", slug: "ivas", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 14, isActive: true, svgCode: `<svg viewBox="0 0 120 42" width="120" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="25" fill="#E65100">IVAS</text></svg>` },
  { id: "b-15", name: "Faber", slug: "faber", category: "Chimney", websiteUrl: "", orderIndex: 15, isActive: true, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="25" font-style="italic" fill="#E10A17">FABER</text></svg>` },
  { id: "b-16", name: "IKEA", slug: "ikea", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 16, isActive: true, svgCode: `<svg viewBox="0 0 125 42" width="125" height="42" fill="none"><rect x="2" y="7" width="76" height="26" rx="4" fill="#0058A3"/><ellipse cx="40" cy="20" rx="36" ry="12" fill="#FFDA1A"/><text x="12" y="27" font-family="sans-serif" font-weight="900" font-size="20" fill="#0058A3">IKEA</text></svg>` },
  { id: "b-17", name: "Reo", slug: "reo", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 17, isActive: true, svgCode: `<svg viewBox="0 0 115 42" width="115" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="25" fill="#0284C7">REO</text></svg>` },
  { id: "b-18", name: "Activa", slug: "activa", category: "Seasonal Category", websiteUrl: "", orderIndex: 18, isActive: true, svgCode: `<svg viewBox="0 0 135 42" width="135" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" font-style="italic" fill="#DC2626">ACTIVA</text></svg>` },
  { id: "b-19", name: "Summercool", slug: "summercool", category: "Seasonal Category", websiteUrl: "", orderIndex: 19, isActive: true, svgCode: `<svg viewBox="0 0 165 42" width="165" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="20" fill="#0369A1">SUMMERCOOL</text></svg>` },
  { id: "b-20", name: "Thermocool", slug: "thermocool", category: "Seasonal Category", websiteUrl: "", orderIndex: 20, isActive: true, svgCode: `<svg viewBox="0 0 165 42" width="165" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="20" fill="#EA580C">THERMOCOOL</text></svg>` },
  { id: "b-21", name: "Power Guard", slug: "power-guard", category: "Invertors & Battery", websiteUrl: "", orderIndex: 21, isActive: true, svgCode: `<svg viewBox="0 0 170 42" width="170" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="19" fill="#15803D">POWER GUARD</text></svg>` },
  { id: "b-22", name: "Sujata", slug: "sujata", category: "Home & Kitchen Appliances", websiteUrl: "", orderIndex: 22, isActive: true, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="29" font-family="Georgia, serif" font-weight="900" font-size="24" fill="#B91C1C">SUJATA</text></svg>` },
  { id: "b-23", name: "Orient", slug: "orient", category: "Seasonal Category", websiteUrl: "", orderIndex: 23, isActive: true, svgCode: `<svg viewBox="0 0 135 42" width="135" height="42" fill="none"><text x="4" y="29" font-family="sans-serif" font-weight="900" font-size="23" fill="#1E293B">orient</text></svg>` }
];

const initialCategories: CategoryItem[] = [
  { id: "c-1", name: "Home & Kitchen Appliances", slug: "home-kitchen-appliances", icon: "kitchen", orderIndex: 1, isActive: true, description: "Mixer grinders, induction cooktops, blenders, kettles, and smart kitchen electronics.", subcategories: ["Mixer Grinder", "Induction Cooktop", "Electric Kettle", "Air Fryer", "Toaster"] },
  { id: "c-2", name: "TV", slug: "tv", icon: "tv", orderIndex: 2, isActive: true, description: "Smart LED, QLED, OLED 4K displays and home entertainment systems.", subcategories: ["Smart TV", "4K UHD", "QLED Display", "Android TV", "Soundbars"] },
  { id: "c-3", name: "Washing Machine", slug: "washing-machine", icon: "washing", orderIndex: 3, isActive: true, description: "Front load, top load fully automatic and semi-automatic laundry solutions.", subcategories: ["Front Load", "Top Load", "Semi-Automatic", "Dryers"] },
  { id: "c-4", name: "Seasonal Category (Fans, Cooler, Heaters)", slug: "seasonal-category", icon: "climate", orderIndex: 4, isActive: true, description: "Summer & winter climate appliances with regional multi-warehouse placement.", subcategories: ["Fans", "Air Coolers", "Water Heaters", "Room Heaters"] },
  { id: "c-5", name: "Sewing Machine", slug: "sewing-machine", icon: "sewing", orderIndex: 5, isActive: true, description: "Domestic, industrial, and computerized automatic embroidery sewing machines.", subcategories: ["Domestic Sewing", "Electronic Stitching", "Industrial Heavy-Duty", "Embroidery"] },
  { id: "c-6", name: "Chimney", slug: "chimney", icon: "chimney", orderIndex: 6, isActive: true, description: "Auto-clean filterless kitchen chimneys, hobs, and exhaust hoods.", subcategories: ["Auto-Clean Chimney", "Filterless Suction", "Kitchen Hobs", "Island Chimney"] },
  { id: "c-7", name: "Invertors & Battery", slug: "invertors-battery", icon: "battery", orderIndex: 7, isActive: true, description: "Pure sine wave inverters, tubular solar batteries, and high-capacity backup systems.", subcategories: ["Pure Sine Wave Inverters", "Tubular Batteries", "Solar Hybrid Systems", "Voltage Stabilizers"] }
];

const initialLeads: LeadItem[] = [];

const initialArticles: ArticleItem[] = [
  {
    id: "art-1",
    title: "How Brands Can Scale Marketplace Operations Profitably in 2026",
    slug: "how-brands-can-scale-marketplace-operations",
    excerpt: "Discover how contract manufacturers and consumer brands scale Amazon & Flipkart GMV while protecting distributor margins and eliminating price wars.",
    content: `### Executive Summary

Contract manufacturers across Rajkot, Pune, and Coimbatore are transitioning from thin OEM contract margins to direct digital brand ownership. However, expanding without an integrated commerce operating partner frequently leads to channel conflict, listing price wars, and high return penalties.

### 1. The Multi-Channel Expansion Framework

Selling simultaneously on Amazon, Flipkart, AJIO, and Quick-Commerce requires distinct catalog segmentation:

* **Digital-Exclusive SKUs:** Launch separate model numbers online to protect offline wholesale networks and prevent dealer margin complaints.
* **Algorithmic Buybox Protection:** Monitor 24/7 seller price suppression and automated repricing bots to keep organic Buybox win rates above 88%.
* **SLA Compliance:** Marketplace delivery algorithms heavily reward 24-hour dispatch. Regional fulfillment hubs are essential to maintain seller tiering.

### 2. Safeguarding Operating Margins

True marketplace profitability isn't GMV—it's net bank realization after deducting platform fees, reverse shipping, and advertising:

1. Calculate net contribution margin per unit after all fee slabs.
2. Automate daily unboxing video logging for damaged customer returns.
3. Integrate real-time payment reconciliation to claim uncredited returns within the 30-day SAFE-T window.

### Conclusion

Scaling across 15+ marketplaces demands enterprise operational rigor. Good Life Sutra partners with leading OEM brands to manage end-to-end cataloging, ads, warehousing, and revenue assurance under a shared success model.`,
    featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Modern automated fulfillment warehouse for multi-channel marketplace commerce",
    category: "Marketplace Growth & Advertising",
    status: "Published",
    author: "Rajeev Nair",
    authorRole: "Head of Marketplace Operations",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    tags: ["Marketplace", "Growth", "Amazon", "Flipkart"],
    date: "19 Sep 2026",
    publishedAt: "2026-09-19T09:00:00.000Z",
    seoTitle: "How Brands Can Scale Marketplace Operations Profitably | Good Life Sutra",
    seoDesc: "Learn how consumer brands and OEM manufacturers scale Amazon, Flipkart, and Quick-Commerce while protecting dealer margins and recovering fee leakages.",
    canonicalUrl: "/insights/how-brands-can-scale-marketplace-operations",
    ogImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    readTime: "6 min read"
  },
  {
    id: "art-2",
    title: "12-State Distributed Inventory Planning: Winning Prime & Assured Badges",
    slug: "12-state-distributed-inventory-planning",
    excerpt: "Why a single national warehouse kills your marketplace Buybox win rate, and how algorithmic 12-state stock splitting delivers same-day customer dispatch.",
    content: `### Why Single-Warehouse Fulfillment Is Dead

Marketplace algorithms on Amazon and Flipkart strictly prioritize local delivery speed. When a customer in Chennai or Kolkata searches for an appliance, a seller fulfilling from a single Delhi NCR warehouse is pushed down by regional sellers who offer 1-day delivery.

### Key Benefits of 12-State Inventory Splitting:

* **Buybox Win Rate Surge:** Up to 42% higher Buybox share due to expedited delivery promise badges.
* **40% Lower Freight Costs:** Local zone logistics fees cost significantly less than national long-haul shipping.
* **Reduced In-Transit Breakage:** Less handling transfers reduce transit damage from 12% down to 0.4%.

### Overcoming Regulatory & Tax Roadblocks

Setting up 12 state hubs traditionally required months of APOB (Additional Place of Business) GST registrations. Good Life Sutra deploys pre-registered, GST-compliant warehouse nodes across all commercial zones—enabling national fulfillment in under 30 days.`,
    featuredImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "High-tech palletized inventory storage in regional logistics center",
    category: "Inventory & Stock Planning",
    status: "Published",
    author: "Pooja Verma",
    authorRole: "VP Supply Chain & Warehousing",
    authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    tags: ["Inventory", "Fulfilment", "Buybox", "Amazon"],
    date: "14 Sep 2026",
    publishedAt: "2026-09-14T11:30:00.000Z",
    seoTitle: "12-State Distributed Inventory Planning for Marketplaces | Good Life Sutra",
    seoDesc: "Strategic guide to multi-state inventory allocation across India to unlock Amazon Prime and Flipkart Assured badges with 40% lower shipping expenses.",
    canonicalUrl: "/insights/12-state-distributed-inventory-planning",
    ogImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
    readTime: "7 min read"
  },
  {
    id: "art-3",
    title: "The Silent Profit Killer: Auditing ₹1Cr+ in Uncredited Marketplace Deductions",
    slug: "auditing-uncredited-marketplace-deductions",
    excerpt: "Forensic audit of 500,000+ settlement line items reveals that brands leak 1.8% of GMV to volumetric weight errors, return fraud, and phantom fee charges.",
    content: `### The Anatomy of Marketplace Financial Leakage

Every month, high-volume consumer goods brands lose lakhs of rupees to automated marketplace billing discrepancies. Without line-item reconciliation, these losses compound quietly on balance sheets.

### Top Leakage Categories Recovered:

1. **Volumetric Weight Overcharges (44%):** Carrier optical scanners erroneously record oversized dimensions on master cartons, billing heavy bulky freight rates on standard parcels.
2. **Customer Return Non-Receipt (31%):** Platform refunds issued to buyers where the returned inventory never arrives back at the seller warehouse.
3. **Closing Fee Mismatches & Duplicate Commission Deductions (25%):** Systemic calculation bugs during high-traffic festival flash sales.

### How Good Life Sutra Recovers Your Capital

Our proprietary audit engine scans every single order transaction against bank remittances, carrier manifests, and return inspection proof. We automatically assemble and submit substantiated dispute claims to recover lost capital within official settlement windows.`,
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Financial audit and reconciliation dashboard showing recovered revenue",
    category: "Revenue Assurance & Reconciliation",
    status: "Published",
    author: "Amitava Sen",
    authorRole: "Lead Reconciliation & Settlement Cell",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    tags: ["Revenue", "Reconciliation", "Marketplace"],
    date: "05 Sep 2026",
    publishedAt: "2026-09-05T14:15:00.000Z",
    seoTitle: "Marketplace Reconciliation & Fee Leakage Audit Playbook | Good Life Sutra",
    seoDesc: "Discover how to audit ₹1Cr+ in uncredited marketplace deductions, dispute fraudulent returns, and recover lost cash flow with daily automated UTR matching.",
    canonicalUrl: "/insights/auditing-uncredited-marketplace-deductions",
    ogImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    readTime: "8 min read"
  },
  {
    id: "art-4",
    title: "Heavy & Bulky Reverse Logistics: Cutting Damage Rates From 14% to Under 0.5%",
    slug: "heavy-bulky-reverse-logistics-playbook",
    excerpt: "Specialized palletized linehaul networks, packaging reinforcement standards, and local technician doorstep testing protocols for heavy consumer appliances.",
    content: `### The Heavy Goods Transit Challenge

Shipping large items like kitchen chimneys, air coolers, inverters, and water heaters through standard parcel hubs inevitably causes severe denting and shattered glass.

### Tactical Solutions for Fragile Shipments:

* **Honeycombed Edge Protectors:** Custom molded pulp and corner cushions certified to ISTA drop standards.
* **Technician Doorstep Verification:** Local service partners inspect installations to eliminate false 'defective' return requests.
* **Direct Regional Refurbishment:** Salvaging returned goods locally rather than incurring expensive two-way cross-country freight.`,
    featuredImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Packaging and palletized handling for fragile home appliances",
    category: "Returns & Reverse Operations",
    status: "Draft",
    author: "Pooja Verma",
    authorRole: "VP Supply Chain & Warehousing",
    authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    tags: ["Returns", "Fulfilment", "Marketplace"],
    date: "18 Sep 2026",
    seoTitle: "Heavy & Bulky Reverse Logistics Playbook | Good Life Sutra",
    seoDesc: "How appliance brands mitigate high return rates, prevent transit breakage, and manage palletized reverse logistics across India.",
    canonicalUrl: "/insights/heavy-bulky-reverse-logistics-playbook",
    ogImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
    readTime: "5 min read"
  },
  {
    id: "art-5",
    title: "Quick-Commerce for Appliances: How Blinkit, Zepto & JioMart Deliver in 15 Minutes",
    slug: "quick-commerce-consumer-appliances-playbook",
    excerpt: "Hyperlocal dark store inventory allocation strategies for high-rotation kitchen electronics and emergency home essentials.",
    content: `### The Rapid Rise of Instant Appliance Commerce

Quick-commerce is no longer just for groceries. Mixers, kettles, irons, and room heaters are now routinely ordered on 15-minute delivery platforms.

### Operating Strategies for Brands:

* Selecting top 15% high-velocity SKUs suited for dark store shelf dimensions.
* Real-time API stock syncing to avoid out-of-stock delisting penalties.
* Dynamic localized promotional pricing during evening peak shopping hours.`,
    featuredImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Quick commerce delivery fleet and hyperlocal fulfillment",
    category: "Marketplace Operations",
    status: "Scheduled",
    scheduledAt: "2026-10-01",
    author: "Rajeev Nair",
    authorRole: "Head of Marketplace Operations",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    tags: ["Quick Commerce", "Blinkit", "Zepto", "Growth"],
    date: "Scheduled (01 Oct 2026)",
    seoTitle: "Quick Commerce for Appliances: 15-Min Delivery Playbook | Good Life Sutra",
    seoDesc: "How leading electronics and appliance brands leverage Blinkit, Zepto, and JioMart for instant hyperlocal sales expansion.",
    canonicalUrl: "/insights/quick-commerce-consumer-appliances-playbook",
    ogImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
    readTime: "6 min read"
  }
];

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

const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services does Good Life provide?",
    answer: "Good Life provides marketplace operations, marketplace growth & advertising, inventory & stock planning, warehousing & fulfilment, revenue assurance & reconciliation, and returns & reverse operations.",
    category: "General",
    status: "Published",
    orderIndex: 1,
    isFeatured: true
  },
  {
    id: "faq-2",
    question: "Who can work with Good Life?",
    answer: "Good Life works with brands and businesses looking to launch, improve, or scale their commerce operations across India's leading marketplace channels.",
    category: "General",
    status: "Published",
    orderIndex: 2,
    isFeatured: true
  },
  {
    id: "faq-3",
    question: "Can Good Life help us launch our online marketplace presence?",
    answer: "Yes. Good Life provides end-to-end support for launching online commerce operations, establishing brand registry, creating optimized catalog listings, and configuring multi-state GST logistics.",
    category: "Launch Online",
    status: "Published",
    orderIndex: 3,
    isFeatured: true
  },
  {
    id: "faq-4",
    question: "Can Good Life manage marketplace operations?",
    answer: "Yes. Marketplace Operations is one of Good Life's core capabilities, encompassing daily catalog hygiene, Buybox protection algorithms, performance marketing, and operational account compliance.",
    category: "Marketplace",
    status: "Published",
    orderIndex: 4,
    isFeatured: true
  },
  {
    id: "faq-5",
    question: "Does Good Life provide warehousing and fulfilment support?",
    answer: "Yes. Warehousing & Fulfilment is delivered through our 12 regional fulfillment centers, securing Amazon Prime, Flipkart Assured, and sub-24hr doorstep delivery badges.",
    category: "Fulfilment",
    status: "Published",
    orderIndex: 5,
    isFeatured: true
  },
  {
    id: "faq-6",
    question: "Does Good Life help with inventory planning?",
    answer: "Yes. Inventory & Stock Planning is one of the core capabilities, leveraging algorithmic sales velocity forecasting to prevent out-of-stock events and eliminate excess dead inventory.",
    category: "Inventory",
    status: "Published",
    orderIndex: 6,
    isFeatured: false
  },
  {
    id: "faq-7",
    question: "Can Good Life help reduce revenue leakage?",
    answer: "Good Life provides Revenue Assurance & Reconciliation as a dedicated capability, forensic auditing marketplace fee deductions, volumetric weight overcharges, and recovering SAFE-T return claims.",
    category: "Revenue Assurance",
    status: "Published",
    orderIndex: 7,
    isFeatured: true
  },
  {
    id: "faq-8",
    question: "Does Good Life handle returns and reverse operations?",
    answer: "Yes. Returns & Reverse Operations is one of the core capabilities, featuring packing station video verification, damage grading, repackaging, and claims dispute resolution.",
    category: "Returns",
    status: "Published",
    orderIndex: 8,
    isFeatured: false
  },
  {
    id: "faq-9",
    question: "Can Good Life help with heavy and bulky products?",
    answer: "Yes. Heavy & Bulky Commerce is a specialised area within the Good Life offering, engineered specifically for large appliances, chimneys, cooktops, and high-capacity solar batteries with palletized freight.",
    category: "Heavy & Bulky Commerce",
    status: "Published",
    orderIndex: 9,
    isFeatured: true
  },
  {
    id: "faq-10",
    question: "How can I get started with Good Life?",
    answer: "You can use the Commerce Diagnostic Tool or submit a direct enquiry to start a conversation with the Good Life team and benchmark your operational headroom.",
    category: "Getting Started",
    status: "Published",
    orderIndex: 10,
    isFeatured: true
  }
];

const initialRedirects: RedirectItem[] = [
  { id: "r-1", from: "/services", to: "/capabilities/marketplace-operations", code: 301, clicks: 124 },
  { id: "r-2", from: "/contact-us", to: "/contact", code: 301, clicks: 88 },
  { id: "r-3", from: "/solutions/scale", to: "/solutions/scale-pan-india", code: 301, clicks: 43 }
];

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
  youtubeUrl: "https://youtube.com/@goodlifesutra"
};

const initialAuthors: AuthorItem[] = [
  {
    id: "auth-1",
    name: "Rajeev Nair",
    role: "Head of Marketplace Operations",
    roleType: "Super Admin",
    email: "rajeev.nair@goodlifesutra.com",
    password: "gl_admin_2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Ex-Amazon executive with 14+ years managing marketplace growth, algorithmic Buybox defense, and multi-channel appliance catalog expansion.",
    linkedin: "https://linkedin.com/in/rajeev-nair-goodlife",
    articlesCount: 5,
    status: "Active",
    lastLogin: "Today, 04:35 PM",
    createdAt: "2026-01-10"
  },
  {
    id: "auth-2",
    name: "Pooja Verma",
    role: "VP Supply Chain & Warehousing",
    roleType: "Author & Editor",
    email: "pooja.verma@goodlifesutra.com",
    password: "supply_chain_26",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    bio: "Expert in 12-state distributed warehouse networks, fragile appliance packaging engineering, and sub-24hr marketplace fulfillment SLAs.",
    linkedin: "https://linkedin.com/in/pooja-verma-goodlife",
    articlesCount: 3,
    status: "Active",
    lastLogin: "Yesterday, 11:20 AM",
    createdAt: "2026-02-14"
  },
  {
    id: "auth-3",
    name: "Amitava Sen",
    role: "Lead Reconciliation & Settlement Cell",
    roleType: "Author & Editor",
    email: "amitava.sen@goodlifesutra.com",
    password: "settle_audit_26",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "Financial auditor specializing in marketplace deduction forensic review, SAFE-T claims, volumetric weight error disputes, and escrow reconciliation.",
    linkedin: "https://linkedin.com/in/amitava-sen-goodlife",
    articlesCount: 2,
    status: "Active",
    lastLogin: "18 Sep, 02:15 PM",
    createdAt: "2026-03-01"
  }
];

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
  const [toast, setToast] = useState<string | null>(null);

  // Load stored state if available
  useEffect(() => {
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
    }
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      try { localStorage.setItem("gl_admin_articles", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Insight deleted");
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
  };



  // Redirects actions
  const saveRedirect = (item: Partial<RedirectItem>, id?: string) => {
    if (!item.from?.trim() || !item.to?.trim()) return;
    if (id) {
      setRedirects(prev => {
        const updated = prev.map(r => r.id === id ? { ...r, ...item } : r);
        try { localStorage.setItem("gl_admin_redirects", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast("Redirect rule updated");
    } else {
      const newR: RedirectItem = {
        id: "r-" + Date.now(),
        from: item.from,
        to: item.to,
        code: item.code || 301,
        clicks: 0
      };
      setRedirects(prev => {
        const updated = [...prev, newR];
        try { localStorage.setItem("gl_admin_redirects", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      showToast("Redirect rule created");
    }
  };

  const deleteRedirect = (id: string) => {
    setRedirects(prev => {
      const updated = prev.filter(r => r.id !== id);
      try { localStorage.setItem("gl_admin_redirects", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    showToast("Redirect deleted");
  };

  // Site Settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...settings };
      try { localStorage.setItem("gl_admin_settings", JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
    logActivity("Updated Site Configuration", "Header, Footer & Corporate Info", "Saved global navigation, announcement banner, and corporate registration");
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
    let updatedList: FaqItem[] = [];

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
        updatedList = updated;
        try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Updated FAQ", item.question.slice(0, 35) + "...", `Category: ${item.category || "General"}`);
      showToast(`FAQ updated: "${item.question.slice(0, 32)}..."`);
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
        updatedList = updated;
        try { localStorage.setItem("gl_admin_faqs", JSON.stringify(updated)); } catch (_) {}
        return updated;
      });
      logActivity("Created FAQ", newF.question.slice(0, 35) + "...", `Category: ${newF.category}`);
      showToast("Added new FAQ to Database");
    }

    setTimeout(async () => {
      try {
        await fetch("http://localhost:5000/api/v1/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedList)
        });
      } catch (_) {}
    }, 100);
  };

  const deleteFaq = (id: string) => {
    const target = faqs.find(f => f.id === id);
    let updatedList: FaqItem[] = [];
    setFaqs(prev => {
      const updated = prev.filter(f => f.id !== id);
      updatedList = updated;
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
    }, 100);
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

  return (
    <AdminDataContext.Provider
      value={{
        platforms,
        setPlatforms,
        savePlatform,
        deletePlatform,
        togglePlatformStatus,

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
