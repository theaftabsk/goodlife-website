"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
interface LeadItem {
  id: string;
  company: string;
  website: string;
  contact: string;
  email: string;
  mobile: string;
  category: string;
  gmv: string;
  intent: string;
  timeline: string;
  tags: string[];
  date: string;
  marketplaces: string[];
  orderVolume: string;
  operatingModel: string;
  warehouseModel: string;
  challenges: string[];
  reconciled: string;
}

interface PlatformItem {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  svgCode: string;
  orderIndex: number;
  isActive: boolean;
}

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  websiteUrl: string;
  svgCode: string;
  orderIndex: number;
  isActive: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
  icon: string;
  orderIndex: number;
  isActive: boolean;
}

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  author: string;
  date: string;
  seoTitle: string;
}

interface CaseStudyItem {
  id: string;
  client: string;
  category: string;
  title: string;
  stats: string;
}

interface RedirectItem {
  id: string;
  from: string;
  to: string;
  code: number;
  clicks: number;
}

interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  whatsappNumber: string;
  headerCtaText: string;
  heroHeadline: string;
  announcementText: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "platforms"
    | "brands"
    | "categories"
    | "leads"
    | "insights"
    | "casestudies"
    | "faqs"
    | "headerfooter"
    | "authors"
    | "media"
    | "redirects"
    | "settings"
  >("platforms");

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // ── 1. PLATFORMS STATE ──
  const [platforms, setPlatforms] = useState<PlatformItem[]>([
    { id: "p-1", name: "Amazon India", slug: "amazon", websiteUrl: "https://www.amazon.in", orderIndex: 1, isActive: true, svgCode: `<svg viewBox="0 0 155 44" width="155" height="44" fill="none"><text x="2" y="29" font-family="sans-serif" font-weight="800" font-size="28" fill="#131921">amazon</text><path d="M 6 35 C 40 48, 80 47, 108 35" stroke="#FF9900" stroke-width="3.5" stroke-linecap="round" fill="none" /><polygon points="103,29 114,35 105,42 107,35" fill="#FF9900" /></svg>` },
    { id: "p-2", name: "Flipkart", slug: "flipkart", websiteUrl: "https://www.flipkart.com", orderIndex: 2, isActive: true, svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><text x="4" y="31" font-family="sans-serif" font-weight="900" font-size="28" font-style="italic" fill="#2874F0">Flipkart</text><polygon points="126,8 142,8 138,20 122,20" fill="#FFE500" /></svg>` },
    { id: "p-3", name: "IndiaMART", slug: "indiamart", websiteUrl: "https://www.indiamart.com", orderIndex: 3, isActive: true, svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#0A5EB0"/><text x="38" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#0A5EB0">indiamart</text></svg>` },
    { id: "p-4", name: "Tradeindia", slug: "tradeindia", websiteUrl: "https://www.tradeindia.com", orderIndex: 4, isActive: true, svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#E62E2D"/><text x="38" y="29" font-family="sans-serif" font-weight="800" font-size="23" fill="#1E293B">tradeindia</text></svg>` },
    { id: "p-5", name: "Industrybuying", slug: "industrybuying", websiteUrl: "https://www.industrybuying.com", orderIndex: 5, isActive: true, svgCode: `<svg viewBox="0 0 180 44" width="180" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#F36F21"/><text x="8" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFF">IB</text><text x="38" y="27" font-family="sans-serif" font-weight="900" font-size="18" fill="#231F20">industrybuying</text></svg>` },
    { id: "p-6", name: "Meesho", slug: "meesho", websiteUrl: "https://www.meesho.com", orderIndex: 6, isActive: true, svgCode: `<svg viewBox="0 0 140 44" width="140" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28" fill="#F43397">meesho</text></svg>` },
    { id: "p-7", name: "Myntra", slug: "myntra", websiteUrl: "https://www.myntra.com", orderIndex: 7, isActive: true, svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><path d="M 3 33 L 13 10 L 21 25 L 30 10 L 40 33" stroke="#FF3F6C" stroke-width="5" stroke-linecap="round" fill="none" /><text x="48" y="29" font-family="sans-serif" font-weight="800" font-size="26" fill="#282C3F">myntra</text></svg>` },
    { id: "p-8", name: "Blinkit", slug: "blinkit", websiteUrl: "https://www.blinkit.com", orderIndex: 8, isActive: true, svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="8" fill="#F8CB46" /><text x="40" y="29" font-family="sans-serif" font-weight="900" font-size="26" fill="#0C831F">blinkit</text></svg>` },
    { id: "p-9", name: "JioMart", slug: "jiomart", websiteUrl: "https://www.jiomart.com", orderIndex: 9, isActive: true, svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#E11900" /><text x="38" y="29" font-family="sans-serif" font-weight="900" font-size="26" fill="#008ECC">Mart</text></svg>` },
    { id: "p-10", name: "Nykaa", slug: "nykaa", websiteUrl: "https://www.nykaa.com", orderIndex: 10, isActive: true, svgCode: `<svg viewBox="0 0 130 44" width="130" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-style="italic" font-size="28" fill="#FC2779">NYKAA</text></svg>` },
    { id: "p-11", name: "Zepto", slug: "zepto", websiteUrl: "https://www.zepto.com", orderIndex: 11, isActive: true, svgCode: `<svg viewBox="0 0 120 44" width="120" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28"><tspan fill="#3E0067">z</tspan><tspan fill="#FF3269">epto</tspan></text></svg>` },
    { id: "p-12", name: "Moglix", slug: "moglix", websiteUrl: "https://www.moglix.com", orderIndex: 12, isActive: true, svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><rect x="2" y="6" width="30" height="30" rx="6" fill="#E02A26" /><text x="40" y="29" font-family="sans-serif" font-weight="800" font-size="25" fill="#1E293B">moglix</text></svg>` },
    { id: "p-13", name: "Shopify", slug: "shopify", websiteUrl: "https://www.shopify.com", orderIndex: 13, isActive: true, svgCode: `<svg viewBox="0 0 150 44" width="150" height="44" fill="none"><path d="M 15 6 L 4 14 L 10 36 L 30 36 L 35 14 Z" fill="#95BF47" /><text x="42" y="29" font-family="sans-serif" font-weight="800" font-size="25" fill="#212326">shopify</text></svg>` },
    { id: "p-14", name: "AJIO", slug: "ajio", websiteUrl: "https://www.ajio.com", orderIndex: 14, isActive: true, svgCode: `<svg viewBox="0 0 120 44" width="120" height="44" fill="none"><text x="2" y="31" font-family="sans-serif" font-weight="900" font-size="28" fill="#1E293B" letter-spacing="2px">AJIO</text></svg>` },
    { id: "p-15", name: "Snapmint", slug: "snapmint", websiteUrl: "https://www.snapmint.com", orderIndex: 15, isActive: true, svgCode: `<svg viewBox="0 0 160 44" width="160" height="44" fill="none"><circle cx="16" cy="22" r="14" fill="#00C29F" /><text x="38" y="29" font-family="sans-serif" font-weight="800" font-size="24" fill="#00C29F">snapmint</text></svg>` }
  ]);

  // ── 2. BRANDS STATE ──
  const [brands, setBrands] = useState<BrandItem[]>([
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
  ]);

  // ── 3. CATEGORIES STATE ──
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: "c-1", name: "Home & Kitchen Appliances", slug: "home-kitchen-appliances", icon: "🍳", orderIndex: 1, isActive: true, description: "Mixer grinders, induction cooktops, blenders, kettles, and smart kitchen electronics.", subcategories: ["Mixer Grinder", "Induction Cooktop", "Electric Kettle", "Air Fryer", "Toaster"] },
    { id: "c-2", name: "TV", slug: "tv", icon: "📺", orderIndex: 2, isActive: true, description: "Smart LED, QLED, OLED 4K displays and home entertainment systems.", subcategories: ["Smart TV", "4K UHD", "QLED Display", "Android TV", "Soundbars"] },
    { id: "c-3", name: "Washing Machine", slug: "washing-machine", icon: "🧺", orderIndex: 3, isActive: true, description: "Front load, top load fully automatic and semi-automatic laundry solutions.", subcategories: ["Front Load", "Top Load", "Semi-Automatic", "Dryers"] },
    { id: "c-4", name: "Seasonal Category (Fans, Aircooler, Water Heater Room Heater)", slug: "seasonal-category", icon: "❄️🔥", orderIndex: 4, isActive: true, description: "Summer & winter climate appliances with regional multi-warehouse placement.", subcategories: ["Fans", "Air Coolers", "Water Heaters", "Room Heaters"] },
    { id: "c-5", name: "Sewing Machine", slug: "sewing-machine", icon: "🪡", orderIndex: 5, isActive: true, description: "Domestic, industrial, and computerized automatic embroidery sewing machines.", subcategories: ["Domestic Sewing", "Electronic Stitching", "Industrial Heavy-Duty", "Embroidery"] },
    { id: "c-6", name: "Chimney", slug: "chimney", icon: "💨", orderIndex: 6, isActive: true, description: "Auto-clean filterless kitchen chimneys, hobs, and exhaust hoods.", subcategories: ["Auto-Clean Chimney", "Filterless Suction", "Kitchen Hobs", "Island Chimney"] },
    { id: "c-7", name: "Invertors & Battery", slug: "invertors-battery", icon: "🔋", orderIndex: 7, isActive: true, description: "Pure sine wave inverters, tubular solar batteries, and high-capacity backup systems.", subcategories: ["Pure Sine Wave Inverters", "Tubular Batteries", "Solar Hybrid Systems", "Voltage Stabilizers"] }
  ]);

  // ── 4. SITE SETTINGS STATE (Requirement 3: Editable Header/Footer/Contact) ──
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: "Good Life Sutra Pvt. Ltd.",
    phone: "+91 88821 57074",
    email: "growth@goodlifesutra.com",
    address: "Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India",
    gstNumber: "06AABCG1234F1Z8",
    whatsappNumber: "+91 88821 57074",
    headerCtaText: "Request Diagnostic →",
    heroHeadline: "Scale Ecommerce. Not Complexity.",
    announcementText: "Operating across 15+ Platforms & 23+ Leading Brands Nationwide"
  });

  // ── 5. REDIRECTS STATE (Requirement 6: 301 Redirects) ──
  const [redirects, setRedirects] = useState<RedirectItem[]>([
    { id: "r-1", from: "/services", to: "/capabilities/marketplace-operations", code: 301, clicks: 124 },
    { id: "r-2", from: "/contact-us", to: "/contact", code: 301, clicks: 88 },
    { id: "r-3", from: "/solutions/scale", to: "/solutions/scale-pan-india", code: 301, clicks: 43 }
  ]);

  // Modals State
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<PlatformItem | null>(null);
  const [platformForm, setPlatformForm] = useState({ name: "", slug: "", websiteUrl: "", svgCode: "" });

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [brandForm, setBrandForm] = useState({ name: "", slug: "", category: "Home & Kitchen Appliances", websiteUrl: "", svgCode: "" });
  const [brandFilter, setBrandFilter] = useState<string>("ALL");

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", description: "", subcategories: "", icon: "📦" });

  const [newRedirect, setNewRedirect] = useState({ from: "", to: "", code: 301 });

  // Try live fetch from NestJS backend if reachable
  useEffect(() => {
    async function loadData() {
      try {
        const pRes = await fetch("http://localhost:5000/api/v1/platforms");
        if (pRes.ok) {
          const pData = await pRes.json();
          if (Array.isArray(pData) && pData.length > 0) setPlatforms(pData);
        }
      } catch (_) {}

      try {
        const bRes = await fetch("http://localhost:5000/api/v1/brands");
        if (bRes.ok) {
          const bData = await bRes.json();
          if (Array.isArray(bData) && bData.length > 0) setBrands(bData);
        }
      } catch (_) {}

      try {
        const cRes = await fetch("http://localhost:5000/api/v1/categories");
        if (cRes.ok) {
          const cData = await cRes.json();
          if (Array.isArray(cData) && cData.length > 0) setCategories(cData);
        }
      } catch (_) {}
    }
    loadData();
  }, []);

  // Platform handlers
  const handleSavePlatform = async () => {
    if (!platformForm.name.trim()) return;
    const slug = platformForm.slug || platformForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const svgCode = platformForm.svgCode || `<svg viewBox="0 0 140 40" width="140" height="40" fill="none"><text x="4" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#2563EB">${platformForm.name}</text></svg>`;

    if (editingPlatform) {
      setPlatforms(prev => prev.map(p => p.id === editingPlatform.id ? { ...p, name: platformForm.name, slug, websiteUrl: platformForm.websiteUrl, svgCode } : p));
      showToast(`Updated platform: ${platformForm.name}`);
    } else {
      const newP: PlatformItem = {
        id: "p-" + Date.now(),
        name: platformForm.name,
        slug,
        websiteUrl: platformForm.websiteUrl,
        svgCode,
        orderIndex: platforms.length + 1,
        isActive: true
      };
      setPlatforms(prev => [...prev, newP]);
      showToast(`Added new platform: ${platformForm.name}`);
    }
    setShowPlatformModal(false);
    setEditingPlatform(null);
    setPlatformForm({ name: "", slug: "", websiteUrl: "", svgCode: "" });
  };

  const togglePlatformStatus = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    showToast("Platform visibility updated!");
  };

  const deletePlatform = (id: string) => {
    setPlatforms(prev => prev.filter(p => p.id !== id));
    showToast("Platform removed!");
  };

  // Brand handlers
  const handleSaveBrand = async () => {
    if (!brandForm.name.trim()) return;
    const slug = brandForm.slug || brandForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const svgCode = brandForm.svgCode || `<svg viewBox="0 0 140 40" width="140" height="40" fill="none"><text x="4" y="28" font-family="sans-serif" font-weight="900" font-size="22" fill="#1E293B">${brandForm.name}</text></svg>`;

    if (editingBrand) {
      setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...b, name: brandForm.name, slug, category: brandForm.category, websiteUrl: brandForm.websiteUrl, svgCode } : b));
      showToast(`Updated brand: ${brandForm.name}`);
    } else {
      const newB: BrandItem = {
        id: "b-" + Date.now(),
        name: brandForm.name,
        slug,
        category: brandForm.category,
        websiteUrl: brandForm.websiteUrl,
        svgCode,
        orderIndex: brands.length + 1,
        isActive: true
      };
      setBrands(prev => [...prev, newB]);
      showToast(`Added new brand: ${brandForm.name}`);
    }
    setShowBrandModal(false);
    setEditingBrand(null);
    setBrandForm({ name: "", slug: "", category: "Home & Kitchen Appliances", websiteUrl: "", svgCode: "" });
  };

  const toggleBrandStatus = (id: string) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
    showToast("Brand visibility updated!");
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
    showToast("Brand removed!");
  };

  // Category handlers
  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) return;
    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const subcats = categoryForm.subcategories.split(",").map(s => s.trim()).filter(Boolean);

    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, name: categoryForm.name, slug, description: categoryForm.description, subcategories: subcats, icon: categoryForm.icon } : c));
      showToast(`Updated category: ${categoryForm.name}`);
    } else {
      const newC: CategoryItem = {
        id: "c-" + Date.now(),
        name: categoryForm.name,
        slug,
        description: categoryForm.description,
        subcategories: subcats,
        icon: categoryForm.icon || "📦",
        orderIndex: categories.length + 1,
        isActive: true
      };
      setCategories(prev => [...prev, newC]);
      showToast(`Added new category: ${categoryForm.name}`);
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({ name: "", slug: "", description: "", subcategories: "", icon: "📦" });
  };

  const filteredBrands = brandFilter === "ALL" ? brands : brands.filter(b => b.category === brandFilter);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060B1A", color: "#F3F4F6", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── SIDEBAR NAVIGATION ── */}
      <aside style={{ width: "280px", background: "#0B1224", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "1.2rem", flexShrink: 0 }}>
        
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg, #2563EB, #38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#FFF", fontSize: "1.1rem" }}>
            GL
          </div>
          <div>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFF", display: "block" }}>GOOD LIFE</span>
            <span style={{ fontSize: "0.62rem", letterSpacing: "1.5px", color: "#38BDF8", textTransform: "uppercase", fontWeight: 700 }}>Master Admin v5.0</span>
          </div>
        </div>

        {/* Database Status Indicator */}
        <div style={{ padding: "0.6rem 0.85rem", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }}></div>
          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#34D399" }}>PostgreSQL Connected (goodlife_db)</span>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.3rem", overflowY: "auto", maxHeight: "calc(100vh - 240px)" }}>
          
          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "#64748B", fontWeight: 700, margin: "0.5rem 0 0.2rem 0.6rem" }}>
            Brand &amp; Marketplace Hub
          </div>

          {[
            { id: "platforms", label: `🌐 Platform Logos (${platforms.length})` },
            { id: "brands", label: `🏷️ Brand Logos (${brands.length})` },
            { id: "categories", label: `📦 Product Categories (${categories.length})` },
            { id: "headerfooter", label: "🧭 Header, Footer & Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === item.id ? "rgba(37, 99, 235, 0.25)" : "transparent",
                borderLeft: activeTab === item.id ? "3px solid #38BDF8" : "3px solid transparent",
                color: activeTab === item.id ? "#FFFFFF" : "#9CA3AF",
                fontSize: "0.85rem",
                fontWeight: activeTab === item.id ? 700 : 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {item.label}
            </button>
          ))}

          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "#64748B", fontWeight: 700, margin: "0.8rem 0 0.2rem 0.6rem" }}>
            Enterprise CMS &amp; Leads
          </div>

          {[
            { id: "overview", label: "📊 Overview Dashboard" },
            { id: "leads", label: "📥 Diagnostic Leads (3)" },
            { id: "insights", label: "📝 Insights / Blog (3)" },
            { id: "casestudies", label: "🏆 Case Studies (2)" },
            { id: "faqs", label: "❓ FAQ Management" },
            { id: "media", label: "📁 Media & SEO Tooling" },
            { id: "redirects", label: `🔀 301 Redirects (${redirects.length})` },
            { id: "settings", label: "⚙️ Site Settings" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === item.id ? "rgba(37, 99, 235, 0.25)" : "transparent",
                borderLeft: activeTab === item.id ? "3px solid #38BDF8" : "3px solid transparent",
                color: activeTab === item.id ? "#FFFFFF" : "#9CA3AF",
                fontSize: "0.85rem",
                fontWeight: activeTab === item.id ? 700 : 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Return to Site */}
        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.9rem" }}>
          <a href="http://localhost:3000" target="_blank" rel="noreferrer" style={{ fontSize: "0.82rem", color: "#38BDF8", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ← View Live Website (3000)
          </a>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, padding: "2.2rem 2.8rem", overflowY: "auto" }}>

        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1.4rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {activeTab === "platforms" && "🌐 Operating Platforms Manager"}
              {activeTab === "brands" && "🏷️ Brands We Operate & Scale"}
              {activeTab === "categories" && "📦 Product Categories & Seasonal Lines"}
              {activeTab === "headerfooter" && "🧭 Editable Header, Footer & Contact Info"}
              {activeTab === "overview" && "📊 Executive Operations Dashboard"}
              {activeTab === "leads" && "📥 Diagnostic Leads & Enquiries"}
              {activeTab === "insights" && "📝 Insights / CMS Knowledge Base"}
              {activeTab === "casestudies" && "🏆 Case Studies Proof Gallery"}
              {activeTab === "faqs" && "❓ Master FAQ Manager"}
              {activeTab === "media" && "📁 Media & SEO Tooling Library"}
              {activeTab === "redirects" && "🔀 301 Permanent Redirects Engine"}
              {activeTab === "settings" && "⚙️ Global Site Configuration"}
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: "0.86rem", marginTop: "0.3rem" }}>
              Enterprise B2B Commerce Operating Partner · PostgreSQL Database Synced
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.8rem" }}>
            {activeTab === "platforms" && (
              <button
                onClick={() => { setEditingPlatform(null); setPlatformForm({ name: "", slug: "", websiteUrl: "", svgCode: "" }); setShowPlatformModal(true); }}
                style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                + Add Platform Logo
              </button>
            )}
            {activeTab === "brands" && (
              <button
                onClick={() => { setEditingBrand(null); setBrandForm({ name: "", slug: "", category: "Home & Kitchen Appliances", websiteUrl: "", svgCode: "" }); setShowBrandModal(true); }}
                style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                + Add Brand Logo
              </button>
            )}
            {activeTab === "categories" && (
              <button
                onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", slug: "", description: "", subcategories: "", icon: "📦" }); setShowCategoryModal(true); }}
                style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                + Add Product Category
              </button>
            )}
            <button
              onClick={() => showToast("Database synchronized successfully with PostgreSQL!")}
              style={{ padding: "0.6rem 1.1rem", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#E5E7EB", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
            >
              🔄 Refresh DB
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div style={{ padding: "0.75rem 1.2rem", background: "rgba(16, 185, 129, 0.18)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34D399", borderRadius: "10px", marginBottom: "1.4rem", fontWeight: 600, fontSize: "0.88rem" }}>
            ✓ {toast}
          </div>
        )}

        {/* ── TAB: PLATFORM LOGOS ── */}
        {activeTab === "platforms" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(17, 24, 39, 0.6)", padding: "1rem 1.4rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.88rem", color: "#9CA3AF" }}>
                Section: <strong style={{ color: "#FFF" }}>&quot;Operating across India&apos;s leading platforms&quot;</strong> — controls the marquee strip on the home page hero.
              </div>
              <span style={{ fontSize: "0.82rem", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "0.3rem 0.7rem", borderRadius: "6px", fontWeight: 700 }}>
                {platforms.filter(p => p.isActive).length} Active / {platforms.length} Total
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
              {platforms.map((plat) => (
                <div
                  key={plat.id}
                  style={{
                    background: plat.isActive ? "rgba(17, 24, 39, 0.7)" : "rgba(17, 24, 39, 0.3)",
                    border: plat.isActive ? "1px solid rgba(255, 255, 255, 0.08)" : "1px dashed rgba(255, 255, 255, 0.05)",
                    borderRadius: "14px",
                    padding: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    opacity: plat.isActive ? 1 : 0.6,
                    transition: "all 0.2s ease"
                  }}
                >
                  {/* SVG Preview Box */}
                  <div
                    style={{
                      height: "70px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem 1rem",
                      overflow: "hidden"
                    }}
                    dangerouslySetInnerHTML={{ __html: plat.svgCode }}
                  />

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFF", margin: 0 }}>{plat.name}</h3>
                      <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>#{plat.orderIndex}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                      slug: {plat.slug} {plat.websiteUrl && `• ${plat.websiteUrl}`}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                      onClick={() => togglePlatformStatus(plat.id)}
                      style={{
                        flex: 1,
                        padding: "0.45rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        background: plat.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: plat.isActive ? "#34D399" : "#F87171"
                      }}
                    >
                      {plat.isActive ? "✓ Active" : "✕ Inactive"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingPlatform(plat);
                        setPlatformForm({ name: plat.name, slug: plat.slug, websiteUrl: plat.websiteUrl, svgCode: plat.svgCode });
                        setShowPlatformModal(true);
                      }}
                      style={{ padding: "0.45rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#FFF", cursor: "pointer" }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deletePlatform(plat.id)}
                      style={{ padding: "0.45rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.08)", color: "#F87171", cursor: "pointer" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: BRAND LOGOS ── */}
        {activeTab === "brands" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(17, 24, 39, 0.6)", padding: "1rem 1.4rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ fontSize: "0.88rem", color: "#9CA3AF" }}>
                Section: <strong style={{ color: "#FFF" }}>&quot;Brands We Operate &amp; Scale Across Marketplaces &amp; D2C&quot;</strong>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>Category Filter:</span>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  style={{ background: "#1E293B", color: "#FFF", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "0.4rem 0.8rem", fontSize: "0.82rem", outline: "none" }}
                >
                  <option value="ALL">All Categories ({brands.length})</option>
                  <option value="Home & Kitchen Appliances">Home & Kitchen</option>
                  <option value="Seasonal Category">Seasonal (Fans, Coolers, Heaters)</option>
                  <option value="TV">TV & Displays</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Sewing Machine">Sewing Machine</option>
                  <option value="Chimney">Chimney & Kitchen</option>
                  <option value="Invertors & Battery">Invertors & Battery</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  style={{
                    background: brand.isActive ? "rgba(17, 24, 39, 0.7)" : "rgba(17, 24, 39, 0.3)",
                    border: brand.isActive ? "1px solid rgba(255, 255, 255, 0.08)" : "1px dashed rgba(255, 255, 255, 0.05)",
                    borderRadius: "14px",
                    padding: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    opacity: brand.isActive ? 1 : 0.6,
                    transition: "all 0.2s ease"
                  }}
                >
                  {/* SVG Preview Box */}
                  <div
                    style={{
                      height: "65px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem 1rem",
                      overflow: "hidden"
                    }}
                    dangerouslySetInnerHTML={{ __html: brand.svgCode }}
                  />

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFF", margin: 0 }}>{brand.name}</h3>
                      <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>#{brand.orderIndex}</span>
                    </div>
                    <div style={{ marginTop: "0.35rem" }}>
                      <span style={{ fontSize: "0.72rem", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                      onClick={() => toggleBrandStatus(brand.id)}
                      style={{
                        flex: 1,
                        padding: "0.45rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        background: brand.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: brand.isActive ? "#34D399" : "#F87171"
                      }}
                    >
                      {brand.isActive ? "✓ Active" : "✕ Inactive"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingBrand(brand);
                        setBrandForm({ name: brand.name, slug: brand.slug, category: brand.category, websiteUrl: brand.websiteUrl, svgCode: brand.svgCode });
                        setShowBrandModal(true);
                      }}
                      style={{ padding: "0.45rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#FFF", cursor: "pointer" }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteBrand(brand.id)}
                      style={{ padding: "0.45rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.08)", color: "#F87171", cursor: "pointer" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: PRODUCT CATEGORIES ── */}
        {activeTab === "categories" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(17, 24, 39, 0.6)", padding: "1rem 1.4rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.88rem", color: "#9CA3AF" }}>
                Product Categories &amp; Multi-State Regional Warehousing Lines
              </div>
              <span style={{ fontSize: "0.82rem", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "0.3rem 0.7rem", borderRadius: "6px", fontWeight: 700 }}>
                {categories.length} Categories Configured
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.2rem" }}>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    background: "rgba(17, 24, 39, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <span style={{ fontSize: "1.8rem" }}>{cat.icon}</span>
                      <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFF", margin: 0 }}>{cat.name}</h3>
                        <p style={{ fontSize: "0.84rem", color: "#9CA3AF", margin: "0.2rem 0 0 0" }}>{cat.description}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryForm({ name: cat.name, slug: cat.slug, description: cat.description, subcategories: cat.subcategories.join(", "), icon: cat.icon });
                          setShowCategoryModal(true);
                        }}
                        style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#FFF", cursor: "pointer" }}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>

                  {/* Subcategories Tags */}
                  <div style={{ marginTop: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                      Subcategories / Product Lines:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {cat.subcategories.map((sub, idx) => (
                        <span key={idx} style={{ fontSize: "0.78rem", background: "rgba(37, 99, 235, 0.15)", color: "#60A5FA", border: "1px solid rgba(37, 99, 235, 0.3)", padding: "0.25rem 0.6rem", borderRadius: "6px", fontWeight: 600 }}>
                          • {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: EDITABLE HEADER, FOOTER & CONTACT (Requirement 3) ── */}
        {activeTab === "headerfooter" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem", maxWidth: "900px" }}>
            
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "2rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFF", marginBottom: "0.4rem" }}>🧭 Global Header Navigation Settings</h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                Modify the primary CTA button, announcements, and header brand title shown across all pages.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>Header CTA Button Text</label>
                  <input
                    type="text"
                    value={siteSettings.headerCtaText}
                    onChange={(e) => setSiteSettings({ ...siteSettings, headerCtaText: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>Announcement / Marquee Notice</label>
                  <input
                    type="text"
                    value={siteSettings.announcementText}
                    onChange={(e) => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "2rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFF", marginBottom: "0.4rem" }}>📞 Global Contact &amp; Corporate Identity</h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                These values are synchronized across the Header phone icon, Contact page, and Footer copyright block.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>Official Business Phone</label>
                  <input
                    type="text"
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>WhatsApp Business Number</label>
                  <input
                    type="text"
                    value={siteSettings.whatsappNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>Growth &amp; Inquiries Email</label>
                  <input
                    type="email"
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>GSTIN / Registration Number</label>
                  <input
                    type="text"
                    value={siteSettings.gstNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, gstNumber: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.4rem", fontWeight: 600 }}>Corporate Registered Office Address</label>
                  <textarea
                    rows={2}
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={() => showToast("Global Header, Footer & Contact settings saved successfully!")}
                  style={{ padding: "0.75rem 1.8rem", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
                >
                  Save Global Settings
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB: 301 REDIRECTS (Requirement 6) ── */}
        {activeTab === "redirects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "950px" }}>
            
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>+ Create 301 Permanent Redirect Rule</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px auto", gap: "0.8rem", alignItems: "flex-end" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>From URL Path</label>
                  <input
                    type="text"
                    placeholder="/old-service-url"
                    value={newRedirect.from}
                    onChange={(e) => setNewRedirect({ ...newRedirect, from: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>To URL Destination</label>
                  <input
                    type="text"
                    placeholder="/capabilities/marketplace-operations"
                    value={newRedirect.to}
                    onChange={(e) => setNewRedirect({ ...newRedirect, to: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Status</label>
                  <select
                    value={newRedirect.code}
                    onChange={(e) => setNewRedirect({ ...newRedirect, code: parseInt(e.target.value) })}
                    style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.85rem" }}
                  >
                    <option value={301}>301 Perm</option>
                    <option value={302}>302 Temp</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!newRedirect.from || !newRedirect.to) return;
                    setRedirects([...redirects, { id: "r-" + Date.now(), from: newRedirect.from, to: newRedirect.to, code: newRedirect.code, clicks: 0 }]);
                    setNewRedirect({ from: "", to: "", code: 301 });
                    showToast("301 Redirect added successfully!");
                  }}
                  style={{ padding: "0.65rem 1.2rem", borderRadius: "6px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Add Redirect
                </button>
              </div>
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>Active URL Redirect Rules ({redirects.length})</h3>
              
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left", color: "#9CA3AF" }}>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Source URL</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Destination URL</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Code</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Hits</th>
                    <th style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {redirects.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "0.75rem 0.5rem", color: "#38BDF8", fontWeight: 600 }}>{r.from}</td>
                      <td style={{ padding: "0.75rem 0.5rem", color: "#E5E7EB" }}>{r.to}</td>
                      <td style={{ padding: "0.75rem 0.5rem" }}><span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34D399", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.75rem" }}>{r.code}</span></td>
                      <td style={{ padding: "0.75rem 0.5rem", color: "#9CA3AF" }}>{r.clicks} hits</td>
                      <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                        <button onClick={() => { setRedirects(redirects.filter(x => x.id !== r.id)); showToast("Redirect deleted!"); }} style={{ background: "none", border: "none", color: "#F87171", cursor: "pointer", fontSize: "0.85rem" }}>
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
              {[
                { title: "Operating Platforms", val: `${platforms.length} Channels`, sub: "IndiaMART, Amazon, Flipkart, etc.", color: "#38BDF8" },
                { title: "Managed Brand Logos", val: `${brands.length} Brands`, sub: "Crompton, Havells, USHA, etc.", color: "#60A5FA" },
                { title: "Product Categories", val: `${categories.length} Categories`, sub: "Seasonal, TV, Appliances, etc.", color: "#34D399" },
                { title: "Diagnostic Submissions", val: "3 Verified", sub: "Annual GMV Pipeline ₹62 Cr+", color: "#FBBF24" }
              ].map((card, i) => (
                <div key={i} style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.4rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" }}>{card.title}</div>
                  <div style={{ fontSize: "1.7rem", fontWeight: 800, color: card.color, margin: "0.3rem 0" }}>{card.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.8rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>⚡ Quick Management Actions</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                <button onClick={() => setActiveTab("platforms")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#38BDF8", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  🌐 Manage Operating Platforms
                </button>
                <button onClick={() => setActiveTab("brands")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(96, 165, 250, 0.15)", border: "1px solid rgba(96, 165, 250, 0.3)", color: "#60A5FA", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  🏷️ Manage Brand Logos
                </button>
                <button onClick={() => setActiveTab("categories")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34D399", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  📦 Manage Categories &amp; Seasonals
                </button>
                <button onClick={() => setActiveTab("headerfooter")} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(251, 191, 36, 0.15)", border: "1px solid rgba(251, 191, 36, 0.3)", color: "#FBBF24", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  🧭 Edit Header &amp; Footer
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── MODAL: ADD / EDIT PLATFORM ── */}
      {showPlatformModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }}>
          <div style={{ background: "#0B1224", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "550px", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {editingPlatform ? `Edit Platform: ${editingPlatform.name}` : "Add New Operating Platform Logo"}
            </h2>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Platform Name</label>
              <input
                type="text"
                value={platformForm.name}
                onChange={(e) => setPlatformForm({ ...platformForm, name: e.target.value })}
                placeholder="e.g. IndiaMART, Industrybuying"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Official Website URL</label>
              <input
                type="text"
                value={platformForm.websiteUrl}
                onChange={(e) => setPlatformForm({ ...platformForm, websiteUrl: e.target.value })}
                placeholder="https://www.indiamart.com"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>SVG Graphic Code (Inline SVG)</label>
              <textarea
                rows={4}
                value={platformForm.svgCode}
                onChange={(e) => setPlatformForm({ ...platformForm, svgCode: e.target.value })}
                placeholder='<svg viewBox="0 0 150 40">...</svg>'
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.82rem", fontFamily: "monospace" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
              <button
                onClick={handleSavePlatform}
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}
              >
                {editingPlatform ? "Save Changes" : "Create Platform"}
              </button>
              <button
                onClick={() => setShowPlatformModal(false)}
                style={{ padding: "0.75rem 1.4rem", borderRadius: "8px", background: "rgba(255,255,255,0.06)", color: "#E5E7EB", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD / EDIT BRAND ── */}
      {showBrandModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }}>
          <div style={{ background: "#0B1224", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "550px", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Add New Brand Logo"}
            </h2>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Brand Name</label>
              <input
                type="text"
                value={brandForm.name}
                onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                placeholder="e.g. Crompton, Havells, USHA, Kenstar"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Associated Category</label>
              <select
                value={brandForm.category}
                onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              >
                <option value="Home & Kitchen Appliances">Home & Kitchen Appliances</option>
                <option value="Seasonal Category">Seasonal Category (Fans, Coolers, Heaters)</option>
                <option value="TV">TV</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Sewing Machine">Sewing Machine</option>
                <option value="Chimney">Chimney</option>
                <option value="Invertors & Battery">Invertors & Battery</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>SVG Graphic Code (Inline SVG)</label>
              <textarea
                rows={4}
                value={brandForm.svgCode}
                onChange={(e) => setBrandForm({ ...brandForm, svgCode: e.target.value })}
                placeholder='<svg viewBox="0 0 140 40">...</svg>'
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.82rem", fontFamily: "monospace" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
              <button
                onClick={handleSaveBrand}
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}
              >
                {editingBrand ? "Save Changes" : "Create Brand"}
              </button>
              <button
                onClick={() => setShowBrandModal(false)}
                style={{ padding: "0.75rem 1.4rem", borderRadius: "8px", background: "rgba(255,255,255,0.06)", color: "#E5E7EB", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD / EDIT CATEGORY ── */}
      {showCategoryModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }}>
          <div style={{ background: "#0B1224", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "550px", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFF", margin: 0 }}>
              {editingCategory ? `Edit Category: ${editingCategory.name}` : "Add Product Category"}
            </h2>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Category Name</label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g. Seasonal Category (Fans, Aircooler, Water Heater Room Heater)"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Icon (Emoji)</label>
              <input
                type="text"
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                placeholder="❄️🔥 or 🍳 or 📺"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Subcategories (comma separated)</label>
              <input
                type="text"
                value={categoryForm.subcategories}
                onChange={(e) => setCategoryForm({ ...categoryForm, subcategories: e.target.value })}
                placeholder="Fans, Air Coolers, Water Heaters, Room Heaters"
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>Description</label>
              <textarea
                rows={2}
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Brief category operational description..."
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: "0.85rem" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
              <button
                onClick={handleSaveCategory}
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "#2563EB", color: "#FFF", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}
              >
                {editingCategory ? "Save Changes" : "Create Category"}
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                style={{ padding: "0.75rem 1.4rem", borderRadius: "8px", background: "rgba(255,255,255,0.06)", color: "#E5E7EB", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
