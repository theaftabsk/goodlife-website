"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function MarketplaceOperationsPage() {
  return (
    <SubpageTemplate
      badge="CAPABILITY 01 • PLATFORM OPS & COMPLIANCE"
      title={
        <>
          Marketplace Operations.{" "}
          <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Flawless Catalog & Buybox Dominance.
          </span>
        </>
      }
      subtitle="Run daily seller operations without friction. Good Life manages catalogue health, algorithmic Buybox pricing, platform SLA compliance, and account health across Amazon, Flipkart, Myntra, and Quick Commerce."
      stats={[
        { value: "99.8%", label: "Listing Health Index", sub: "Zero search suppression across channels" },
        { value: "10+ Platforms", label: "Unified Daily Operations", sub: "Amazon, Flipkart, Blinkit, Myntra, JioMart" },
        { value: "Sub-1hr", label: "Order Sync & Processing SLA", sub: "Rapid dispatch across regional hubs" },
        { value: "0%", label: "Account Deactivation Rate", sub: "Proactive compliance and policy management" }
      ]}
      overviewTitle="Complete Platform Account Management With Operator Precision"
      overviewText="Marketplace algorithms ruthlessly penalize late dispatches, canceled orders, broken variations, and suppressed attributes. Instead of relying on junior portal executives who react only after listings break, Good Life monitors your seller central environments 24/7 with enterprise monitoring tools and dedicated category managers."
      challenges={[
        {
          title: "Suppressed Listings & Broken Variations",
          desc: "Unnoticed missing backend attributes or invalid image dimensions quietly suppress high-ranking listings from search results."
        },
        {
          title: "Late Dispatch Rate & Cancellation Fines",
          desc: "Failure to synchronize inventory between warehouse docks and seller portals leads to out-of-stock orders and severe platform seller strikes."
        },
        {
          title: "Account Health Degradation & Gating",
          desc: "Customer claims, negative feedback, and IP policy warnings left unaddressed can trigger sudden category gating or complete account suspension."
        }
      ]}
      pillarsTitle="Core Marketplace Operations Deliverables"
      pillarsSubtitle="Comprehensive day-to-day management of your seller ecosystems across all major platforms."
      pillars={[
        {
          num: "01",
          title: "Catalogue Architecture & Listing Creation",
          desc: "Building high-ranking, keyword-dense parent-child variations with compliant metadata and rich visual assets.",
          deliverables: [
            "Complete catalog mapping across Amazon, Flipkart, Myntra, and Blinkit",
            "SEO-indexed titles, feature bullets, and backend search terms",
            "High-converting A+ content, Brand Story, and lifestyle image upload",
            "Continuous attribute optimization to prevent search suppression"
          ]
        },
        {
          num: "02",
          title: "Algorithmic Buybox Management & Price Parity",
          desc: "Defending your brand's Buybox share 24/7 with dynamic repricing rules that protect offline channel profitability.",
          deliverables: [
            "Automated repricing rules tied to inventory levels and competitor bids",
            "Enforcement of Minimum Advertised Price (MAP) against rogue sellers",
            "Buybox win rate telemetry and instant displacement notifications",
            "Multi-channel price parity checks to avoid algorithmic delisting"
          ]
        },
        {
          num: "03",
          title: "Account Health & Policy Defense",
          desc: "Proactive tracking of order defect rates (ODR), late dispatch rates (LDR), and pre-fulfillment cancellation rates.",
          deliverables: [
            "Continuous 24/7 Seller Central account health monitoring",
            "Fast dispute resolution for unfair negative buyer feedback",
            "Resolution of Intellectual Property (IP) complaints and counterfeit claims",
            "Plan of Action (POA) documentation for reinstated listings"
          ]
        },
        {
          num: "04",
          title: "Order Flow Synchronization & SLA Hand-off",
          desc: "Automating the flow of marketplace orders directly into warehouse picking queues to meet stringent dispatch cutoffs.",
          deliverables: [
            "Sub-hour automated order ingestion across all 10+ marketplaces",
            "Automated generation of shipping labels, tax invoices, and manifests",
            "Direct integration with Amazon Easy Ship, Self Ship & 3PL couriers",
            "Late dispatch prevention with automated buffer alarms"
          ]
        },
        {
          num: "05",
          title: "Promotional Calendar & Event Management",
          desc: "Preparing catalogs, deals, and coupons well in advance for high-traffic mega sales (Prime Day, BBD, Diwali).",
          deliverables: [
            "Deal submission for Lightning Deals, 7-Day Deals, and Best Deals",
            "Coupon and bundle creation to lift Average Order Value (AOV)",
            "Event stock reservation in strategic regional fulfillment centers",
            "Real-time event pricing and inventory velocity adjustments"
          ]
        },
        {
          num: "06",
          title: "Customer Support & Review Sentiment Analytics",
          desc: "Protecting your brand reputation through prompt buyer communication and actionable product sentiment analysis.",
          deliverables: [
            "Marketplace buyer-seller messaging SLA within 12 hours",
            "Review sentiment categorization (packaging, quality, fitment)",
            "Brand Q&A management and proactive FAQ publishing on PDPs",
            "Automated review request sequencing compliant with platform TOS"
          ]
        }
      ]}
      workflowTitle="Our Daily Operating Rhythm"
      workflowSteps={[
        {
          step: "01",
          timeline: "Every Morning (9 AM)",
          title: "Health & Order Sync Check",
          desc: "Verification of overnight orders, pending shipments, Buybox status, and account health warnings."
        },
        {
          step: "02",
          timeline: "Midday (1 PM)",
          title: "Dispatch Manifest & SLA Verification",
          desc: "Auditing warehouse courier hand-offs to ensure zero missed dispatches before marketplace cutoff times."
        },
        {
          step: "03",
          timeline: "Afternoon (4 PM)",
          title: "Pricing & Buybox Audit",
          desc: "Monitoring competitor movements, adjusting price floor rules, and reviewing listing visibility."
        },
        {
          step: "04",
          timeline: "Weekly",
          title: "Executive Channel Review",
          desc: "Presentation of channel GMV, conversion rates, Buybox retention, and inventory run-rate projections."
        }
      ]}
      relatedSolutions={[
        { name: "Marketplace Growth & Ads", href: "/capabilities/marketplace-growth", tag: "Capability 02" },
        { name: "Inventory & Stock Planning", href: "/capabilities/inventory-planning", tag: "Capability 03" },
        { name: "Revenue Assurance Audit", href: "/capabilities/revenue-assurance", tag: "Capability 05" }
      ]}
      faqs={[
        {
          q: "What marketplaces does Good Life manage?",
          a: "We operate seller accounts across Amazon India, Flipkart, Myntra, JioMart, Tata CliQ, Moglix, IndiaMART, Blinkit, Zepto, and Shopify storefronts."
        },
        {
          q: "How does Good Life handle unauthorized third-party sellers undercutting our prices?",
          a: "We utilize Brand Registry IP infringement tools, test purchases, and cease-and-desist notices to remove unauthorized sellers who compromise your MAP pricing and brand trust."
        },
        {
          q: "Can you manage both 1P (Vendor Central) and 3P (Seller Central)?",
          a: "Yes. We manage both 1P PO-based wholesale operations and 3P brand-operated marketplaces, often balancing both to maximize brand reach and profitability."
        }
      ]}
    />
  );
}
