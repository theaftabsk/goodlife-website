"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function InventoryPlanningPage() {
  return (
    <SubpageTemplate
      badge="CAPABILITY 03 • SUPPLY CHAIN & DEMAND PLANNING"
      title={
        <>
          Inventory Planning.{" "}
          <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Zero Stockouts. Zero Dead Capital.
          </span>
        </>
      }
      subtitle="Right stock, right channel, optimized working capital. Good Life deploys predictive run-rate algorithms, automated safety stock alerts, and regional stock placement across 12 managed warehouse hubs."
      stats={[
        { value: "99.4%", label: "In-Stock Availability", sub: "For all top 20% revenue-generating SKUs" },
        { value: "45 Days", label: "Optimized Working Capital Cycle", sub: "Down from industry average of 90+ days" },
        { value: "0%", label: "Over-Storage Fee Penalties", sub: "Proactive aging stock redistribution" },
        { value: "12 States", label: "Dynamic Regional Placement", sub: "Synchronized across Amazon, Flipkart & D2C" }
      ]}
      overviewTitle="Algorithmic Inventory Forecasting Built for High-Growth Brands"
      overviewText="Stockouts kill e-commerce businesses twice: first through lost immediate revenue, and second by resetting your hard-won algorithmic search rank. Conversely, over-ordering ties up precious cash flow and triggers expensive platform long-term storage fees. Good Life synchronizes factory lead times with real-time marketplace demand velocity."
      challenges={[
        {
          title: "Sudden Stockouts on Hero Products",
          desc: "Running out of inventory on a top-selling product erases months of keyword rank gains within 48 hours."
        },
        {
          title: "Cash Trapped in Slow-Moving SKUs",
          desc: "Over-forecasting non-hero variants ties up working capital while accumulating monthly marketplace aged-inventory surcharges."
        },
        {
          title: "Regional Imbalance Across Warehouses",
          desc: "Sitting on excess inventory in Bangalore while orders from North India fail SLAs and lose the Buybox due to transit distance."
        }
      ]}
      pillarsTitle="Inventory Planning Deliverables"
      pillarsSubtitle="Scientific forecasting, multi-node replenishment, and working capital optimization."
      pillars={[
        {
          num: "01",
          title: "Predictive Demand Forecasting & Run-Rate Modeling",
          desc: "Machine-assisted calculations factoring 90-day sales velocity, seasonal trends, ad budgets, and upcoming festival peaks.",
          deliverables: [
            "Rolling 30, 60, and 90-day SKU demand velocity projections",
            "Festival spike multipliers for Diwali, Prime Day, and Big Billion Days",
            "Ad spend-to-inventory correlation modeling",
            "Supplier manufacturing lead time and transit buffer integration"
          ]
        },
        {
          num: "02",
          title: "Multi-State Regional Inventory Placement",
          desc: "Directing inventory consignments to regional hubs where historical buyer density is highest to ensure Same-Day delivery SLAs.",
          deliverables: [
            "Pin code cluster demand mapping for North, South, West, and East",
            "Regional stock split recommendations (FBA vs FA vs 3PL)",
            "Inter-warehouse transfer scheduling to rebalance stock",
            "Reduction of national shipping costs via local zone fulfillment"
          ]
        },
        {
          num: "03",
          title: "Automated Reorder Alerts & Purchase Orders",
          desc: "Never run out of stock. Automatic reorder triggers based on current consumption rates and factory production lead times.",
          deliverables: [
            "Dynamic safety stock thresholds based on sales velocity",
            "Automated PO generation notifications sent to your production team",
            "Supplier shipment milestone tracking and inbound slot booking",
            "Buffer stock alarms preventing stockout-driven Buybox loss"
          ]
        },
        {
          num: "04",
          title: "Deadstock & Aging Inventory Liquidation",
          desc: "Proactive identification of inventory approaching 60, 90, and 120-day age brackets to prevent marketplace storage penalty fees.",
          deliverables: [
            "Daily SKU aging reports across all fulfillment centers",
            "Promotional liquidation strategies (flash deals, bundles, BOGO)",
            "Marketplace aged inventory surcharge forecasting and avoidance",
            "Channel clearance through B2B institutional portals (Moglix, IndiaMART)"
          ]
        },
        {
          num: "05",
          title: "Virtual Inventory Allocation Across 10+ Channels",
          desc: "One single master inventory pool virtually segmented across Amazon, Flipkart, Blinkit, and your Shopify D2C store.",
          deliverables: [
            "Centralized inventory reservation preventing overselling",
            "Dynamic buffer stock allocation for quick-commerce spikes",
            "Channel margin guardrails prioritizing high-profit orders",
            "Automated inventory lock during high-velocity flash sales"
          ]
        },
        {
          num: "06",
          title: "Working Capital & Cash Flow Scorecard",
          desc: "Clear financial visibility into inventory turnover ratios, GMROI (Gross Margin Return on Investment), and locked capital.",
          deliverables: [
            "Inventory turnover ratio analysis by category and SKU",
            "GMROI metrics tracking return on inventory capital",
            "Cash flow requirements forecasting for upcoming manufacturing cycles",
            "Weekly executive inventory health briefing"
          ]
        }
      ]}
      workflowTitle="Our Inventory Management Cycle"
      workflowSteps={[
        {
          step: "01",
          timeline: "Weekly",
          title: "Velocity & Buffer Audit",
          desc: "Analyzing past 7-day sales run-rates, ad campaign performance, and adjusting replenishment triggers."
        },
        {
          step: "02",
          timeline: "Bi-Weekly",
          title: "Production & Inbound Planning",
          desc: "Releasing factory POs and booking warehouse inbound appointments across North, West, and South nodes."
        },
        {
          step: "03",
          timeline: "Monthly",
          title: "Aging & Liquidation Review",
          desc: "Reviewing stock approaching 60+ days and deploying promotional clearance bundles to keep capital liquid."
        },
        {
          step: "04",
          timeline: "Quarterly",
          title: "Network Rebalancing",
          desc: "Re-evaluating national pin-code demand heatmaps and reallocating warehouse capacity for maximum delivery speed."
        }
      ]}
      relatedSolutions={[
        { name: "Scale Pan-India Fulfilment", href: "/solutions/scale-pan-india", tag: "Solution 03" },
        { name: "Warehousing & Fulfilment", href: "/capabilities/warehousing-fulfilment", tag: "Capability 04" },
        { name: "Marketplace Operations", href: "/capabilities/marketplace-operations", tag: "Capability 01" }
      ]}
      faqs={[
        {
          q: "How does Good Life predict seasonal spikes like Diwali or Big Billion Days?",
          a: "We analyze historical category growth data, planned promotional ad budgets, and marketplace traffic trends to build dedicated pre-season buffer models 60 to 90 days before the event."
        },
        {
          q: "What happens if a product is sitting in Amazon FBA and racking up storage fees?",
          a: "Our system alerts you before aged fees kick in. We either activate flash promotions and coupon discounts to liquidate units profitably or arrange an automated removal order back to our regional warehouse."
        },
        {
          q: "Can you manage inventory across multiple production suppliers?",
          a: "Yes. Our supply chain team coordinates with multiple contract manufacturers or factory units, consolidating shipments into our regional hubs with barcode scanning verification."
        }
      ]}
    />
  );
}
