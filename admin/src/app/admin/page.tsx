"use client";

import React from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { useAdminData } from "@/context/AdminDataContext";
import {
  PlatformIcon,
  BrandIcon,
  LeadIcon,
  CategoryIcon,
  LightningIcon,
  ExternalLinkIcon,
  CheckIcon
} from "@/components/Icons";

export default function AdminOverviewPage() {
  const { platforms, brands, categories, leads, redirects } = useAdminData();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Top Banner / Welcome Callout */}
      <div style={{
        background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 60%, #3B82F6 100%)",
        borderRadius: "14px",
        padding: "1.75rem 2rem",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.3)"
      }}>
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.2rem 0.6rem",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.15)",
            fontSize: "0.74rem",
            fontWeight: 700,
            marginBottom: "0.6rem",
            backdropFilter: "blur(4px)"
          }}>
            <LightningIcon size={13} color="#FFFFFF" />
            <span>Enterprise Operating Partner Console</span>
          </div>
          <h2 style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Good Life Sutra Executive Command
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#DBEAFE", maxWidth: "620px", marginTop: "0.35rem" }}>
            Single-point operational control across 15+ marketplaces, 23+ OEM brands, multi-state fulfillment, and daily automated revenue reconciliation.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            href="/admin/platforms"
            style={{
              padding: "0.65rem 1.25rem",
              borderRadius: "8px",
              background: "#FFFFFF",
              color: "#1D4ED8",
              fontWeight: 700,
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <span>Manage Platforms</span>
            <ExternalLinkIcon size={14} color="#1D4ED8" />
          </Link>
          <Link
            href="/admin/leads"
            style={{
              padding: "0.65rem 1.25rem",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              fontWeight: 600,
              fontSize: "0.85rem",
              backdropFilter: "blur(4px)"
            }}
          >
            Review Inbound Leads
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards with pure SVG Icons */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "1.25rem"
      }}>
        <StatCard
          title="Active Platforms"
          value={platforms.filter(p => p.isActive).length}
          subtext="Amazon, Flipkart, Quick-Comm"
          trend="+3 added"
          isPositive={true}
          icon={<PlatformIcon size={22} color="#1D4ED8" />}
          color="blue"
        />
        <StatCard
          title="Partner Brands"
          value={brands.filter(b => b.isActive).length}
          subtext="Appliances, Chimneys, Seasonal"
          trend="23 live"
          isPositive={true}
          icon={<BrandIcon size={22} color="#0284C7" />}
          color="cyan"
        />
        <StatCard
          title="Inbound Leads"
          value={leads.length}
          subtext="Diagnostics in qualification"
          trend="₹50 Cr+ pipeline"
          isPositive={true}
          icon={<LeadIcon size={22} color="#D97706" />}
          color="amber"
        />
        <StatCard
          title="Categories Active"
          value={categories.length}
          subtext="Seasonal & core appliances"
          trend="7 categories"
          isPositive={true}
          icon={<CategoryIcon size={22} color="#7C3AED" />}
          color="purple"
        />
        <StatCard
          title="Fulfillment SLA"
          value="99.4%"
          subtext="Same-day dispatch accuracy"
          trend="12 State Hubs"
          isPositive={true}
          icon={<LightningIcon size={22} color="#059669" />}
          color="green"
        />
      </div>

      {/* Two Column Grid: Recent Leads & Channel Distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "1.5rem" }}>
        
        {/* Recent Diagnostic Leads */}
        <div className="admin-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A" }}>
                Recent Diagnostic Inquiries
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748B" }}>
                High-intent B2B commerce diagnostic submissions from enterprise manufacturers.
              </p>
            </div>
            <Link
              href="/admin/leads"
              style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563EB" }}
            >
              View All ({leads.length}) →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.92rem" }}>
                      {lead.company}
                    </span>
                    <span className="badge badge-blue">
                      {lead.gmv}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "0.2rem" }}>
                    Contact: {lead.contact} · <span style={{ color: "#2563EB" }}>{lead.email}</span> · {lead.category}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem" }}>
                    {lead.tags.map((t, idx) => (
                      <span key={idx} className="badge badge-slate" style={{ fontSize: "0.68rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/admin/leads"
                  className="btn-secondary"
                  style={{ fontSize: "0.78rem", padding: "0.4rem 0.8rem" }}
                >
                  Inspect Audit →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Operations & Health */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Live Operating Platforms Overview */}
          <div className="admin-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Connected Platforms ({platforms.length})
              </h3>
              <span style={{ fontSize: "0.74rem", background: "#EFF6FF", color: "#1D4ED8", padding: "0.2rem 0.6rem", borderRadius: "999px", fontWeight: 700, border: "1px solid #BFDBFE" }}>
                {platforms.filter(p => p.isActive).length} Active
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#64748B", marginBottom: "1.1rem" }}>
              Enterprise commerce sales channels synced with Good Life operations.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {platforms.slice(0, 10).map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: "0.35rem 0.65rem",
                    borderRadius: "8px",
                    background: p.isActive ? "#F8FAFC" : "#F1F5F9",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: p.isActive ? "#0F172A" : "#94A3B8"
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.isActive ? "#10B981" : "#CBD5E1" }} />
                  <span>{p.name}</span>
                </div>
              ))}
              {platforms.length > 10 && (
                <div style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>
                  +{platforms.length - 10} more
                </div>
              )}
            </div>

            <Link
              href="/admin/platforms"
              style={{
                fontSize: "0.8rem",
                color: "#2563EB",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <span>Manage Platforms in Channel Hub</span>
              <span>→</span>
            </Link>
          </div>

          {/* Quick Operations Health Card */}
          <div className="admin-card" style={{ padding: "1.25rem 1.5rem" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.75rem" }}>
              Real-Time CMS Telemetry
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#475569" }}>Total Inbound Leads</span>
                <span style={{ fontWeight: 800, color: "#1D4ED8" }}>{leads.length} Received</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#475569" }}>Brands in Portfolio</span>
                <span style={{ fontWeight: 800, color: "#059669" }}>{brands.length} Brands</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#475569" }}>Product Categories</span>
                <span style={{ fontWeight: 800, color: "#0284C7" }}>{categories.length} Taxonomies</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#475569" }}>301 Permanent Redirects</span>
                <span style={{ fontWeight: 800, color: "#7C3AED" }}>{redirects.length} Rules</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
