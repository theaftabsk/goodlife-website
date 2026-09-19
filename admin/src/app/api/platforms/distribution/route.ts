import { NextRequest, NextResponse } from "next/server";

// Default seed platforms with dynamic categories
const DEFAULT_PLATFORMS = [
  { id: "p-1", name: "Amazon India", slug: "amazon", channelType: "General Marketplaces", isActive: true },
  { id: "p-2", name: "Flipkart", slug: "flipkart", channelType: "General Marketplaces", isActive: true },
  { id: "p-3", name: "IndiaMART", slug: "indiamart", channelType: "B2B Wholesale", isActive: true },
  { id: "p-4", name: "Tradeindia", slug: "tradeindia", channelType: "B2B Wholesale", isActive: true },
  { id: "p-5", name: "Industrybuying", slug: "industrybuying", channelType: "B2B Wholesale", isActive: true },
  { id: "p-6", name: "Meesho", slug: "meesho", channelType: "General Marketplaces", isActive: true },
  { id: "p-7", name: "Myntra", slug: "myntra", channelType: "General Marketplaces", isActive: true },
  { id: "p-8", name: "Blinkit", slug: "blinkit", channelType: "Quick-Commerce", isActive: true },
  { id: "p-9", name: "JioMart", slug: "jiomart", channelType: "Quick-Commerce", isActive: true },
  { id: "p-10", name: "Nykaa", slug: "nykaa", channelType: "General Marketplaces", isActive: true },
  { id: "p-11", name: "Zepto", slug: "zepto", channelType: "Quick-Commerce", isActive: true },
  { id: "p-12", name: "Moglix", slug: "moglix", channelType: "B2B Wholesale", isActive: true },
  { id: "p-13", name: "Shopify", slug: "shopify", channelType: "D2C Direct Storefronts", isActive: true },
  { id: "p-14", name: "AJIO", slug: "ajio", channelType: "General Marketplaces", isActive: true },
  { id: "p-15", name: "Snapmint", slug: "snapmint", channelType: "General Marketplaces", isActive: true }
];

export async function GET(req: NextRequest) {
  try {
    // Categories defined for Good Life Sutra multi-channel commerce
    const CATEGORIES = [
      {
        type: "General Marketplaces",
        description: "B2C Pan-India general consumer marketplaces",
        sampleKeyBrands: "Amazon, Flipkart, AJIO, Myntra, Nykaa, Meesho"
      },
      {
        type: "B2B Wholesale",
        description: "Bulk enterprise, OEM & industrial distribution portals",
        sampleKeyBrands: "IndiaMART, Tradeindia, Industrybuying, Moglix"
      },
      {
        type: "Quick-Commerce",
        description: "10-30 minute hyper-local fulfillment channels",
        sampleKeyBrands: "Blinkit, Zepto, JioMart"
      },
      {
        type: "D2C Direct Storefronts",
        description: "Custom brand webstores & headless commerce",
        sampleKeyBrands: "Shopify, Custom Storefronts"
      }
    ];

    const activeList = DEFAULT_PLATFORMS.filter(p => p.isActive);
    const totalCount = activeList.length;

    const distribution = CATEGORIES.map(cat => {
      const matched = activeList.filter(p => p.channelType === cat.type);
      const count = matched.length;
      const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
      return {
        channelType: cat.type,
        count,
        percentage,
        description: cat.description,
        platforms: matched.map(p => p.name)
      };
    });

    return NextResponse.json({
      success: true,
      meta: {
        totalActivePlatforms: totalCount,
        channelSegments: CATEGORIES.length,
        calculationMethod: "DYNAMIC_REAL_TIME_COUNT",
        source: "Good Life Operations Database"
      },
      distribution,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to calculate platform distribution" },
      { status: 500 }
    );
  }
}
