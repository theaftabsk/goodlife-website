"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchIcon, BellIcon, LightningIcon, UserIcon, LogOutIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";

interface HeaderInfo {
  title: string;
  subtitle: string;
}

const routeTitles: Record<string, HeaderInfo> = {
  "/admin": {
    title: "Executive Operations Dashboard",
    subtitle: "Real-time overview of marketplaces, partner brands, pipeline leads, and fulfillment telemetry."
  },
  "/admin/platforms": {
    title: "Operating Platforms Manager",
    subtitle: "Manage 15+ marketplace & quick-commerce channels, API status, and official vector logos."
  },
  "/admin/brands": {
    title: "Brand Partners Catalog",
    subtitle: "Manage 23+ operational brand incubation contracts, categories, and marketplace placement."
  },
  "/admin/categories": {
    title: "Product Categories & Seasonal Lines",
    subtitle: "Organize appliance taxonomy, subcategory trees, and climate-driven seasonal inventory lines."
  },
  "/admin/leads": {
    title: "Enterprise Diagnostic Leads CRM",
    subtitle: "Inbound diagnostics, enterprise GMV volume metrics, qualification pipeline, and CRM tags."
  },
  "/admin/insights": {
    title: "Insights & Knowledge Base CMS",
    subtitle: "Publish enterprise supply-chain analyses, marketplace tactics, and executive whitepapers."
  },
  "/admin/casestudies": {
    title: "Case Studies Proof Gallery",
    subtitle: "Manage client transformation case studies, performance metrics, and verified ARR surges."
  },
  "/admin/faqs": {
    title: "Master FAQ Management",
    subtitle: "Manage frequently asked operational questions across partners, OEMs, and institution clients."
  },
  "/admin/header-footer": {
    title: "Header, Footer & Contact Controls",
    subtitle: "Configure global contact info, GST, registered office, headline messaging, and banner alerts."
  },
  "/admin/media": {
    title: "Media & Brand Asset Library",
    subtitle: "Official SVGs, platform badges, partner brand logos, and SEO web asset management."
  },
  "/admin/redirects": {
    title: "301 Permanent Redirects Engine",
    subtitle: "Zero-downtime URL rewrite management, legacy path mapping, and click analytics."
  },
  "/admin/settings": {
    title: "Enterprise System Settings",
    subtitle: "Database credentials, API proxy endpoints, automated backups, and RBAC security policies."
  },
  "/admin/profile": {
    title: "Admin Security & Profile Settings",
    subtitle: "Manage your administrator Login ID, rotate access passwords, and audit active sessions."
  }
};

export default function AdminHeader() {
  const pathname = usePathname();
  const { credentials, logout } = useAuth();
  const currentInfo = routeTitles[pathname] || {
    title: "Commerce Admin Control Center",
    subtitle: "Manage Good Life Sutra enterprise operations and digital storefronts."
  };

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header style={{
      background: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      padding: "1.1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 30,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)"
    }}>
      {/* Route Title & Subtitle */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
            Good Life CMS
          </span>
          <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>/</span>
          <span style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 700 }}>
            {currentInfo.title.split(" ")[0]}
          </span>
        </div>
        <h1 style={{
          fontSize: "1.35rem",
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.02em",
          marginTop: "0.15rem"
        }}>
          {currentInfo.title}
        </h1>
      </div>

      {/* Action Area & Indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        
        {/* Quick Search */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}>
          <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.75rem" }} />
          <input
            type="text"
            placeholder="Search CMS catalog..."
            style={{
              padding: "0.45rem 0.85rem 0.45rem 2.2rem",
              fontSize: "0.82rem",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              width: "220px",
              outline: "none",
              color: "#0F172A"
            }}
          />
        </div>

        {/* Notifications Button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              color: "#475569"
            }}
            title="System Notifications"
          >
            <BellIcon size={18} color="#475569" />
            <span style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#2563EB",
              border: "2px solid #FFFFFF"
            }} />
          </button>

          {notificationsOpen && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "46px",
              width: "320px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              zIndex: 50
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "0.6rem",
                borderBottom: "1px solid #F1F5F9"
              }}>
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0F172A" }}>
                  System Notifications
                </span>
                <span style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 600, cursor: "pointer" }}>
                  Mark all read
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.75rem" }}>
                <div style={{ padding: "0.5rem", borderRadius: "6px", background: "#EFF6FF", fontSize: "0.78rem" }}>
                  <div style={{ fontWeight: 700, color: "#1E40AF" }}>New Lead Received</div>
                  <div style={{ color: "#3B82F6", fontSize: "0.72rem" }}>Apex Appliances requested diagnostic audit.</div>
                </div>
                <div style={{ padding: "0.5rem", borderRadius: "6px", background: "#ECFDF5", fontSize: "0.78rem" }}>
                  <div style={{ fontWeight: 700, color: "#065F46" }}>Database Sync OK</div>
                  <div style={{ color: "#059669", fontSize: "0.72rem" }}>Prisma ORM schema synchronized with goodlife_db.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Quick Action button */}
        <Link
          href="/admin/platforms"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          <LightningIcon size={15} color="#FFFFFF" />
          <span>Platform Actions</span>
        </Link>
      </div>
    </header>
  );
}
