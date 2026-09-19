"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminData } from "@/context/AdminDataContext";
import { useAuth } from "@/context/AuthContext";
import {
  OverviewIcon,
  PlatformIcon,
  BrandIcon,
  CategoryIcon,
  LeadIcon,
  CaseStudyIcon,
  InsightIcon,
  FaqIcon,
  HeaderFooterIcon,
  MediaIcon,
  RedirectIcon,
  SettingsIcon,
  ExternalLinkIcon,
  DatabaseIcon,
  UserIcon,
  LandingPageIcon,
  SeoIcon,
  CrmIcon,
  ShieldCheckIcon
} from "@/components/Icons";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  count?: number;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { platforms, brands, categories, leads, redirects, authors, landingPages } = useAdminData();
  const { credentials } = useAuth();

  const navGroups: NavGroup[] = [
    {
      title: "Dashboard & Analytics",
      items: [
        { href: "/admin", label: "Executive Overview", icon: OverviewIcon },
      ]
    },
    {
      title: "Commerce & Catalog",
      items: [
        { href: "/admin/platforms", label: "Platforms", icon: PlatformIcon, count: platforms.length },
        { href: "/admin/brands", label: "Brands Portfolio", icon: BrandIcon, count: brands.length },
        { href: "/admin/categories", label: "Product Categories", icon: CategoryIcon, count: categories.length },
      ]
    },
    {
      title: "Reusable CMS Blocks (Scope #2)",
      items: [
        { href: "/admin/insights", label: "Blogs & Insights", icon: InsightIcon },
        { href: "/admin/casestudies", label: "Case Studies", icon: CaseStudyIcon },
        { href: "/admin/faqs", label: "Master FAQs", icon: FaqIcon },
        { href: "/admin/authors", label: "Author Profiles", icon: UserIcon, count: authors.length },
      ]
    },
    {
      title: "Pages & Sections (Scope #3 & #5)",
      items: [
        { href: "/admin/landing-pages", label: "Landing Pages (Sections)", icon: LandingPageIcon, count: landingPages.length },
        { href: "/admin/header-footer", label: "Header & Footer", icon: HeaderFooterIcon },
      ]
    },
    {
      title: "Media & SEO (Scope #4)",
      items: [
        { href: "/admin/media", label: "Media & Documents", icon: MediaIcon },
        { href: "/admin/seo", label: "Per-Page SEO Meta", icon: SeoIcon },
      ]
    },
    {
      title: "Leads & CRM Integration",
      items: [
        { href: "/admin/leads", label: "Inbound Leads", icon: LeadIcon, count: leads.length, badge: "Live" },
        { href: "/admin/crm-integration", label: "CRM Integration Hub", icon: CrmIcon },
      ]
    },
    {
      title: "System & Routing",
      items: [
        { href: "/admin/redirects", label: "301 Redirects", icon: RedirectIcon, count: redirects.length },
        { href: "/admin/settings", label: "Global Settings", icon: SettingsIcon },
      ]
    },
    {
      title: "Security & Credentials",
      items: [
        { href: "/admin/profile", label: "Login ID & Password", icon: ShieldCheckIcon },
      ]
    }
  ];

  return (
    <aside style={{
      width: "275px",
      minWidth: "275px",
      background: "#FFFFFF",
      borderRight: "1px solid #E2E8F0",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      {/* Brand Header */}
      <div style={{
        padding: "1.25rem 1.4rem",
        borderBottom: "1px solid #F1F5F9",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #38BDF8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          color: "#FFFFFF",
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)"
        }}>
          GL
        </div>
        <div>
          <div style={{
            fontSize: "1.02rem",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            GOOD LIFE
            <span style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.15rem 0.4rem",
              borderRadius: "4px",
              background: "#EFF6FF",
              color: "#2563EB",
              border: "1px solid #DBEAFE"
            }}>CMS</span>
          </div>
          <div style={{
            fontSize: "0.72rem",
            color: "#64748B",
            fontWeight: 500
          }}>
            Commerce Operating Partner
          </div>
        </div>
      </div>

      {/* Navigation Links (Scrollable) */}
      <nav style={{
        flex: 1,
        overflowY: "auto",
        padding: "0.6rem 0.85rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem"
      }}>
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 700,
              color: "#94A3B8",
              padding: "0 0.6rem 0.4rem",
            }}>
              {group.title}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "8px",
                      fontSize: "0.84rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#1D4ED8" : "#334155",
                      background: isActive ? "#EFF6FF" : "transparent",
                      borderLeft: isActive ? "3px solid #2563EB" : "3px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <IconComponent
                        size={17}
                        color={isActive ? "#2563EB" : "#64748B"}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      {item.badge && (
                        <span style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          padding: "0.1rem 0.4rem",
                          borderRadius: "999px",
                          background: "#ECFDF5",
                          color: "#059669",
                          border: "1px solid #A7F3D0"
                        }}>
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          padding: "0.1rem 0.5rem",
                          borderRadius: "999px",
                          background: isActive ? "#DBEAFE" : "#F1F5F9",
                          color: isActive ? "#1D4ED8" : "#64748B",
                        }}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Area with Website Link & Admin Profile */}
      <div style={{
        borderTop: "1px solid #F1F5F9",
        padding: "0.9rem 1.1rem",
        background: "#F8FAFC"
      }}>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#2563EB",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            marginBottom: "0.75rem",
            transition: "all 0.15s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <PlatformIcon size={14} color="#2563EB" />
            <span>View Live Website</span>
          </div>
          <ExternalLinkIcon size={12} color="#64748B" />
        </a>

        <Link
          href="/admin/profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            padding: "0.4rem",
            borderRadius: "8px",
            transition: "background 0.15s ease"
          }}
          title="Manage Security Profile, Login ID & Password"
        >
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#2563EB",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 800,
            flexShrink: 0
          }}>
            {credentials.displayName?.slice(0, 2).toUpperCase() || "AD"}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0F172A", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {credentials.displayName || "Administrator"}
            </div>
            <div style={{ fontSize: "0.68rem", color: "#64748B", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {credentials.loginId}
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
