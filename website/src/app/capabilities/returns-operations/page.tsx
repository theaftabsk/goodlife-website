"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function ReturnsOperationsPage() {
  return (
    <SubpageTemplate
      badge="Capability 06 • Reverse Logistics & QC"
      title={
        <>
          Returns & Reverse Operations: <br />
          <span style={{ color: "#2563EB" }}>Protecting Margins & Restoring Inventory</span>
        </>
      }
      subtitle="Turn returns from an operational black hole into an accountable, disciplined recovery process. We inspect every returned item within 24 hours, file reimbursement claims, and swiftly restock sellable units."
      stats={[
        { value: "<24h", label: "Return Inwarding SLA", sub: "From carrier drop-off to barcode scan" },
        { value: "99.4%", label: "QC Inspection Accuracy", sub: "High-definition photo & serial tracking" },
        { value: "40-60%", label: "Sellable Units Restocked", sub: "Repackaged and returned to active inventory" },
        { value: "-35%", label: "Average RTO Reduction", sub: "Through NDR workflows and address verification" }
      ]}
      overviewTitle="The Uncontrolled Cost of Return Freight & Inventory Degradation"
      overviewText="For consumer brands selling across Indian marketplaces, customer returns and RTOs (Return to Origin) represent one of the single biggest threats to unit economics. When parcels sit uninspected in warehouse corners for weeks, inventory depreciates, return dispute deadlines pass, and fraudulent customer returns slip through unnoticed. Good Life implements an enterprise reverse supply chain framework: rapid warehouse inwarding, barcode verification, forensic QC, automated claim filing, and dynamic restock grading."
      challenges={[
        {
          title: "High RTO on Cash-on-Delivery (COD) Orders",
          desc: "Fake addresses, impulsive orders, and delivery agent fraud lead to high RTO rates, burning two-way shipping costs without generating any net revenue."
        },
        {
          title: "Customer Return Fraud & Product Switching",
          desc: "Customers returning old, damaged, or completely different items inside the original brand packaging, causing unrecoverable inventory losses if unflagged."
        },
        {
          title: "Depreciation of Uninspected Restock Inventory",
          desc: "Units stuck in reverse transit or sitting uninspected in warehouse bays lose peak seasonal demand cycles and tie up valuable working capital."
        }
      ]}
      pillarsTitle="Comprehensive Reverse Operations Capabilities"
      pillarsSubtitle="Every returned parcel is accounted for, forensically inspected, and routed for maximum financial recovery."
      pillars={[
        {
          num: "01",
          title: "NDR (Non-Delivery Report) & RTO Reduction Engine",
          desc: "Real-time communication with COD customers before delivery attempts fail, resolving delivery issues before packages turn back.",
          deliverables: [
            "Automated WhatsApp & IVR delivery confirmation workflows",
            "Real-time address correction for failed first delivery attempts",
            "Courier escalations for fake customer-unavailable remarks",
            "COD-to-prepaid conversion incentives at checkout"
          ]
        },
        {
          num: "02",
          title: "24-Hour Warehouse Inwarding & Barcode Auditing",
          desc: "Every incoming return shipment is scanned, weighed, and matched against marketplace tracking AWB numbers on the day of arrival.",
          deliverables: [
            "Air Waybill (AWB) barcode scanning at receiving dock",
            "Physical seal and tamper-evident packaging check",
            "Instant reconciliation against marketplace dispatch manifests",
            "Missing in transit (MIT) dispute logging against 3PL couriers"
          ]
        },
        {
          num: "03",
          title: "Forensic QC & Photographic Evidence Capture",
          desc: "High-definition camera stations recording unboxing, serial numbers, component checklists, and physical conditions.",
          deliverables: [
            "Mandatory 3-angle unboxing photography per parcel",
            "Serial number and IMEI verification against dispatch logs",
            "Functional testing for electrical and mechanical items",
            "Cloud-archived evidence library for immediate dispute submission"
          ]
        },
        {
          num: "04",
          title: "Marketplace Dispute & SAFE-T Reimbursement",
          desc: "Filing high-conviction claims on Amazon, Flipkart, and Meesho for wrong, damaged, or used product returns.",
          deliverables: [
            "Standard operating procedure aligned with marketplace claim rules",
            "Sub-48 hour claim submission to beat platform limitation windows",
            "Dedicated dispute response management to counter claim rejections",
            "Direct recovery tracking until reimbursement is approved"
          ]
        },
        {
          num: "05",
          title: "Grading, Repackaging & Restock Optimization",
          desc: "Fast-tracking pristine and minor-box-damage inventory back into active live stock to preserve sales velocity.",
          deliverables: [
            "3-tier grading system: Grade A (New), Grade B (Repack), Grade C (Liquidate)",
            "Brand-certified shrink-wrapping, fresh boxing, and barcode relabeling",
            "Immediate inventory sync back to active marketplace listings",
            "Segregation of unsellable units for vendor RTV or B2B liquidation"
          ]
        },
        {
          num: "06",
          title: "Root-Cause Analytics & Defect Feedback Loop",
          desc: "Connecting return reasons directly to manufacturing batches, packaging design, and product listing accuracy.",
          deliverables: [
            "SKU-level return reason decomposition (size, defect, buyer remorse)",
            "Listing accuracy audits to correct misleading product descriptions",
            "Packaging drop-test analysis to eliminate in-transit breakage",
            "Monthly executive return performance dashboard and action plan"
          ]
        }
      ]}
      workflowTitle="Our Reverse Supply Chain Workflow"
      workflowSteps={[
        {
          step: "01",
          title: "Real-Time Tracking & NDR Management",
          desc: "We intercept stalled shipments while in transit, resolving courier exceptions before the package returns.",
          timeline: "In-Transit Phase"
        },
        {
          step: "02",
          title: "Dock Receipt & Video Inwarding",
          desc: "Parcels received at our regional hubs are barcode-scanned and logged on unboxing camera stations.",
          timeline: "Day 1 (Within 24h)"
        },
        {
          step: "03",
          title: "QC Classification & Claim Trigger",
          desc: "Items pass through technical inspection: pristine units are queued for restock; damaged units trigger claims.",
          timeline: "Day 2 (Within 48h)"
        },
        {
          step: "04",
          title: "Restock or Liquidation Routing",
          desc: "Restocked units re-enter active sellable inventory; liquidation or vendor return lots are dispatched.",
          timeline: "Day 3 - 5"
        }
      ]}
      faqs={[
        {
          q: "How does Good Life handle switched or fraudulent customer returns?",
          a: "Our inspection docks record high-definition unboxing video and photo evidence comparing the returned item's serial number with the original dispatch record. We then immediately file an evidence-backed SAFE-T claim or seller protection dispute to claim full reimbursement."
        },
        {
          q: "What percentage of returns can realistically be put back into sellable inventory?",
          a: "Depending on the category (electronics, home appliances, or apparel), between 40% and 65% of customer returns are typically Grade A or Grade B. By swiftly replacing outer polybags/boxes and relabeling them, we return these units to prime sellable inventory within 72 hours."
        },
        {
          q: "Can Good Life help lower our COD RTO rate?",
          a: "Yes. We deploy automated WhatsApp verification bots, address sanitization engines, and dedicated telephonic call attempts on high-risk COD orders, typically reducing RTO by 25% to 35% within the first 60 days."
        },
        {
          q: "Where do returns get inspected?",
          a: "Returns are routed directly to the nearest Good Life regional fulfilment center where the original order was dispatched, minimizing reverse transit times and freight costs."
        }
      ]}
      relatedSolutions={[
        { name: "Warehousing & Fulfilment", href: "/capabilities/warehousing-fulfilment", tag: "Capability 04" },
        { name: "Revenue Assurance", href: "/capabilities/revenue-assurance", tag: "Capability 05" },
        { name: "Marketplace Operations", href: "/capabilities/marketplace-operations", tag: "Capability 01" }
      ]}
    />
  );
}
