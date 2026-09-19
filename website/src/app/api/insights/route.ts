import { NextRequest, NextResponse } from "next/server";

const DEFAULT_INSIGHTS = [
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
  }
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");

  if (slug) {
    const matched = DEFAULT_INSIGHTS.find(a => a.slug === slug);
    if (!matched) {
      return NextResponse.json({ success: false, error: "Insight not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, insight: matched });
  }

  let results = DEFAULT_INSIGHTS;
  if (category && category !== "All") {
    results = results.filter(a => a.category === category);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    insights: results
  });
}
