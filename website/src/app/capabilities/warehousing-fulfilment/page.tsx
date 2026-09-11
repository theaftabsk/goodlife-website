"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function WarehousingFulfilmentPage() {
  return (
    <SubpageTemplate
      badge="CAPABILITY 04 • WAREHOUSING & REGIONAL FULFILMENT"
      title={
        <>
          Warehousing & Fulfilment.{" "}
          <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            12 Regional Hubs & Sub-4hr Dispatch.
          </span>
        </>
      }
      subtitle="National warehouse infrastructure operating at benchmark speed. Good Life provides 12-state regional storage, barcode-scanned pick & pack, custom transit packaging, and same-day carrier handoffs."
      stats={[
        { value: "12 States", label: "Managed Warehouse Network", sub: "Strategic nodes covering North, South, West & East" },
        { value: "Sub-4hr", label: "Dock-to-Carrier Dispatch SLA", sub: "Same-day cutoffs for Amazon & Flipkart" },
        { value: "99.8%", label: "Inventory Scanning Accuracy", sub: "Barcode-verified WMS picking" },
        { value: "0.2%", label: "Transit Damage Rate", sub: "Drop-tested custom pallet packaging" }
      ]}
      overviewTitle="Institutional Warehouse Operations Built for High-Volume Brands"
      overviewText="Standard 3PL providers treat e-commerce orders like slow bulk cargo, causing missed marketplace dispatch windows and cancelled orders. Good Life's regional hubs operate under rigorous SLA protocols, with dedicated staging lanes for Amazon Easy Ship, Flipkart Assured, and direct courier fleets."
      challenges={[
        {
          title: "Missed Dispatch Cutoffs & SLA Penalties",
          desc: "Failure to manifest and hand over packages to marketplace couriers before 2 PM triggers late-shipment strikes and Buybox loss."
        },
        {
          title: "High Transit Breakage on Fragile & Bulky Goods",
          desc: "Inadequate packaging for appliances, ceramics, or electronics leads to transit destruction, angry buyers, and irreversible margin losses."
        },
        {
          title: "Inventory Discrepancies & Phantom Stock",
          desc: "Manual inventory counting without automated barcode verification results in warehouse shrinkage and phantom cancellations."
        }
      ]}
      pillarsTitle="Warehousing & Fulfilment Deliverables"
      pillarsSubtitle="Complete physical operations from consignment inbound to courier dock handover."
      pillars={[
        {
          num: "01",
          title: "12-State Strategic Hub Storage",
          desc: "Modern Grade-A warehouse space situated in key logistics corridors (Delhi-NCR, Bhiwandi, Bangalore, Kolkata, Hyderabad, Ahmedabad).",
          deliverables: [
            "Secure, temperature-controlled, and CCTV-monitored facility space",
            "Heavy and bulky palletized racking for appliances and industrial goods",
            "Multi-client shared infrastructure to minimize fixed brand overhead",
            "Pre-inspected inbound docking lanes with digital weight capture"
          ]
        },
        {
          num: "02",
          title: "Barcode-Scanned Pick, Pack & Ship Operations",
          desc: "Zero-error automated picking workflows powered by mobile handheld scanners to ensure 100% order accuracy.",
          deliverables: [
            "Digital pick-lists optimized for shortest warehouse travel paths",
            "100% barcode verification matching physical SKU to marketplace order",
            "Automated invoice, packing slip, and courier label printing",
            "Order packaging photo verification for dispute proof"
          ]
        },
        {
          num: "03",
          title: "Custom Protective Packaging for Heavy & Bulky",
          desc: "Drop-tested packaging engineering specifically designed to survive harsh Indian logistics and multi-hub transfers.",
          deliverables: [
            "Heavy-duty 5-ply and 7-ply corrugated carton standardization",
            "Custom foam corner guards and shock-absorbing honeycomb padding",
            "Wooden crating and strapping for commercial kitchen & home appliances",
            "Amazon and Flipkart certified ISTA drop-test compliance"
          ]
        },
        {
          num: "04",
          title: "Carrier Hand-off Management & Same-Day SLAs",
          desc: "Dedicated staging docks ensuring marketplace pickup vans and third-party logistics (3PL) drivers sign manifests promptly.",
          deliverables: [
            "Scheduled daily courier pickups with Amazon, Flipkart, BlueDart, Delhivery",
            "Signed physical and digital manifest reconciliation",
            "Real-time tracking number injection into marketplace APIs",
            "Escalation pathways for missed courier arrivals"
          ]
        },
        {
          num: "05",
          title: "B2B Bulk Dispatch & Institutional Freight",
          desc: "Extending warehouse capabilities to handle multi-ton palletized freight for corporate buyers, retail distributors, and institutional POs.",
          deliverables: [
            "Palletization, shrink-wrapping, and forklift loading",
            "Part-Truckload (PTL) and Full-Truckload (FTL) freight dispatch",
            "Multi-state e-way bill generation and compliance documentation",
            "Appointment booking for marketplace central warehouse inbounding"
          ]
        },
        {
          num: "06",
          title: "Live Inventory Visibility & Stock Audits",
          desc: "Cloud WMS integration giving your leadership team real-time visibility into stock levels, pending picks, and dispatch velocity.",
          deliverables: [
            "Real-time API inventory synchronization across all channels",
            "Cycle counting routines ensuring zero unrecorded stock shrinkage",
            "FIFO (First-In, First-Out) batch rotation to prevent product aging",
            "End-of-day dispatch and stock reconciliation reporting"
          ]
        }
      ]}
      workflowTitle="Our Daily Fulfillment Workflow"
      workflowSteps={[
        {
          step: "01",
          timeline: "Every 15 Mins",
          title: "Automated Order Ingestion",
          desc: "Orders from Amazon, Flipkart, Blinkit, and D2C flow directly into barcode pick queues."
        },
        {
          step: "02",
          timeline: "Within 90 Mins",
          title: "Pick & Quality Verification",
          desc: "Warehouse staff scan SKU barcodes, verify serial numbers, and route to packaging stations."
        },
        {
          step: "03",
          timeline: "Before 2 PM",
          title: "Pack, Label & Manifest Staging",
          desc: "Orders packed in drop-tested materials, labeled, and staged in designated courier lanes."
        },
        {
          step: "04",
          timeline: "By 5 PM",
          title: "Carrier Handover & Tracking Sync",
          desc: "Signed manifests uploaded, tracking IDs updated, and courier transit verification confirmed."
        }
      ]}
      relatedSolutions={[
        { name: "Scale Pan-India Fulfilment", href: "/solutions/scale-pan-india", tag: "Solution 03" },
        { name: "Fulfilment Network Map", href: "/specialised/fulfilment-network", tag: "Specialised" },
        { name: "Heavy & Bulky Operations", href: "/specialised/heavy-bulky-commerce", tag: "Specialised" }
      ]}
      faqs={[
        {
          q: "What states does Good Life's warehouse network cover?",
          a: "Our network spans 12 strategic state hubs, including Delhi-NCR, Maharashtra (Bhiwandi/Pune), Karnataka (Bangalore), Telangana (Hyderabad), West Bengal (Kolkata), Gujarat (Ahmedabad), and Tamil Nadu (Chennai)."
        },
        {
          q: "Can you handle fragile or high-value items?",
          a: "Yes. We have specialized secure storage cages for high-value electronics and custom foam/crating packaging for heavy, bulky, and fragile appliances."
        },
        {
          q: "What is your same-day dispatch cutoff time?",
          a: "Orders received before 1:30 PM are manifested and dispatched the same day. Orders received later are processed on priority for the morning courier pickup."
        }
      ]}
    />
  );
}
