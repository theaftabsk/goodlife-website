"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function AgencyPartnerPage() {
  return (
    <SubpageTemplate
      badge="Partnership Ecosystem • Performance Agencies & Consultants"
      title={
        <>
          Agency & Consultant Partner Program: <br />
          <span style={{ color: "#2563EB" }}>Operate Physical Commerce Without Warehouse Overheads</span>
        </>
      }
      subtitle="You run top-of-funnel creative, Meta ads, and brand marketing. We handle physical marketplace operations, 12-state warehousing, stock planning, and revenue reconciliation. Expand your client retainers with zero logistics headaches."
      stats={[
        { value: "15-20%", label: "Recurring Revenue Share", sub: "On operating retainers for referred brands" },
        { value: "12 Hubs", label: "Instant Logistics Backbone", sub: "White-labeled or co-branded fulfilment" },
        { value: "0 Overhead", label: "No Warehouse Capex", sub: "Turnkey enterprise operations on day one" },
        { value: "3x Longer", label: "Client Retainer Retention", sub: "When inventory and fulfillment run smoothly" }
      ]}
      overviewTitle="The Missing Piece in Traditional Agency Client Retention"
      overviewText="Digital marketing and performance agencies regularly lose lucrative brand clients because of operational failures outside their control: out-of-stock listings killing ad ROAS, negative seller ratings caused by late courier dispatches, uncredited returns, or untracked marketplace fee creep. By partnering with Good Life, agencies transform from ad vendors into end-to-end commerce operating partners, unlocking long-term sticky client relationships and substantial recurring revenue share."
      challenges={[
        {
          title: "Ad Spends Bleeding into Out-of-Stock Listings",
          desc: "Media buyers scale campaigns only to discover that the brand's warehouse ran out of inventory, wasting ad budget, spiking CPA, and damaging client trust."
        },
        {
          title: "Inability to Fulfill Regional Delivery SLAs",
          desc: "Brands expect Next-Day Prime badges to sustain conversion rates, but agencies lack the national physical warehouse infrastructure to deliver pan-India."
        },
        {
          title: "Marketplace Margin Erosion Damaging Agency Value",
          desc: "Clients blame the marketing agency when monthly net profits dip, even though the true cause is marketplace commission creep and uncollected return claims."
        }
      ]}
      pillarsTitle="How We Empower Agency Partners"
      pillarsSubtitle="Choose between seamless co-branded collaboration or clean referral revenue models."
      pillars={[
        {
          num: "01",
          title: "Lucrative Recurring Revenue Sharing",
          desc: "Earn an ongoing monthly revenue share on the operating management fees of every brand client you onboard.",
          deliverables: [
            "15% to 20% recurring monthly margin on operations retainers",
            "Transparent partner payout dashboard with automated monthly wire transfers",
            "Multi-year commission eligibility for active client lifecycles",
            "Zero minimum referral thresholds to begin earning"
          ]
        },
        {
          num: "02",
          title: "Turnkey 12-State Physical Fulfilment",
          desc: "Provide your brand clients with an instant national warehouse footprint without investing a rupee in real estate or staff.",
          deliverables: [
            "12 strategic warehouse facilities across all Indian zones",
            "Same-day and next-day delivery badges boosting ad conversion by up to 40%",
            "State GST APOB registration assistance and E-Way bill automation",
            "Dedicated B2B distributor dispatches alongside retail D2C fulfillment"
          ]
        },
        {
          num: "03",
          title: "Unified Stock-to-Ad Synchronization",
          desc: "We align inventory depth with your upcoming promotional calendars and media budget ramp-ups.",
          deliverables: [
            "Pre-sale inventory buffer alerts before high-budget ad scale-ups",
            "Shared Slack/Teams channel with our warehouse and marketplace leads",
            "Real-time visibility into sell-through velocity and stock run-rates",
            "Automatic ad pausing protocols when inventory drops below safety thresholds"
          ]
        },
        {
          num: "04",
          title: "Automated Marketplace Revenue Recovery",
          desc: "Our audit team recovers leaked platform margins, proving additional ROI directly to your agency's client sponsors.",
          deliverables: [
            "Order-level reconciliation across Amazon, Flipkart, and Quick Comm channels",
            "Recovery of uncredited returns, carrier weight overcharges, and wrong commission debits",
            "Monthly executive financial reconciliation reports shared with client CFOs",
            "Concrete margin improvements that justify ongoing agency retainers"
          ]
        },
        {
          num: "05",
          title: "White-Label or Co-Branded Operating Model",
          desc: "Present Good Life as your specialized commerce operations division or introduce us as your trusted operating partner.",
          deliverables: [
            "Custom co-branded pitching collateral and diagnostic proposal decks",
            "Joint client pitch meetings with our senior operations leadership",
            "Flexible contracting options: direct-to-brand or sub-contracted through agency",
            "Strict non-solicitation guarantees protecting your creative/media contracts"
          ]
        },
        {
          num: "06",
          title: "Dedicated Partner Success Manager",
          desc: "A single senior point of contact at Good Life ensuring rapid SLA escalations and quarterly strategy reviews.",
          deliverables: [
            "Dedicated partner Slack/WhatsApp channel with sub-1hr SLA",
            "Quarterly business reviews identifying cross-sell growth opportunities",
            "Early access to new warehouse hubs and marketplace beta programs",
            "Co-marketing case study publications boosting your agency's industry authority"
          ]
        }
      ]}
      workflowTitle="Our Simple 4-Step Agency Partner Onboarding"
      workflowSteps={[
        {
          step: "01",
          title: "Partner Alignment Call",
          desc: "We review your client portfolio, identify operational bottlenecks, and agree on revenue share terms.",
          timeline: "Day 1"
        },
        {
          step: "02",
          title: "Joint Diagnostic Evaluation",
          desc: "We run our Commerce Diagnostic on your prospective or existing client to uncover revenue and logistics leakages.",
          timeline: "Week 1"
        },
        {
          step: "03",
          title: "Co-Branded Proposal & Kickoff",
          desc: "We present a unified operational blueprint to the brand founder or CFO, locking in scope and SLAs.",
          timeline: "Week 2"
        },
        {
          step: "04",
          title: "Execution & Monthly Revenue Share",
          desc: "We assume physical operations while you manage marketing. Payouts are credited monthly with full ledger transparency.",
          timeline: "Ongoing Monthly"
        }
      ]}
      faqs={[
        {
          q: "Will Good Life ever pitch creative or performance marketing services to our clients?",
          a: "Never. Good Life is strictly a physical commerce operating partner specializing in warehousing, marketplace seller operations, inventory planning, and financial reconciliation. Our partnership agreement includes strict non-solicitation covenants protecting your agency's core services."
        },
        {
          q: "Can we present Good Life as our internal operations division?",
          a: "Yes. We support white-label partnerships where our operational team communicates under your domain email and branding, as well as transparent co-branded engagements where we attend meetings as your specialized operating partner."
        },
        {
          q: "How does the partner revenue share work?",
          a: "Partners receive a recurring 15% to 20% share of Good Life's monthly operating retainer for every referred client, paid automatically on the 10th of every month for as long as the client remains active."
        },
        {
          q: "What types of brand clients benefit most from this partnership?",
          a: "Brands generating ₹10 Lakh to ₹5 Crore monthly GMV across Amazon, Flipkart, Quick Commerce, or D2C who struggle with warehouse stockouts, slow delivery badges, uninspected returns, or complex reconciliation."
        }
      ]}
      relatedSolutions={[
        { name: "Launch Online Solution", href: "/solutions/launch-online", tag: "Solution 01" },
        { name: "Fix & Grow Solution", href: "/solutions/fix-and-grow", tag: "Solution 02" },
        { name: "Fulfilment Network Map", href: "/specialised/fulfilment-network", tag: "Specialised 02" }
      ]}
    />
  );
}
