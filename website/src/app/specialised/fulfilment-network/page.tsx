"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommerceDiagnosticModal from "../../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface WarehouseHub {
  id: string;
  city: string;
  state: string;
  zone: "West" | "North" | "South" | "East";
  sqft: string;
  pinCodes: string;
  sla: string;
  gstState: string;
  keyCategories: string;
  features: string[];
}

const WAREHOUSE_HUBS: WarehouseHub[] = [
  {
    id: "bhiwandi",
    city: "Bhiwandi / Mumbai MMR",
    state: "Maharashtra",
    zone: "West",
    sqft: "45,000 sq.ft",
    pinCodes: "4,200+ Pin Codes",
    sla: "Same-Day / Next-Day Delivery",
    gstState: "MH (27)",
    keyCategories: "Consumer Durables, Home Appliances, Cookware, Apparel",
    features: ["Heavy dock levelers & battery forklifts", "Amazon FBA & Flipkart FBF cross-docking", "24/7 CCTV & biometric security", "Barcoded pallet racking systems"]
  },
  {
    id: "gurugram",
    city: "Gurugram / Delhi NCR",
    state: "Haryana",
    zone: "North",
    sqft: "40,000 sq.ft",
    pinCodes: "4,800+ Pin Codes",
    sla: "Same-Day / Next-Day Delivery",
    gstState: "HR (06)",
    keyCategories: "Electronics, Kitchen Chimneys, Water Heaters, FMCG",
    features: ["Direct arterial access to NH-48 & KMP", "Dedicated heavy-bulky surface loading docks", "Temperature-stable storage bays", "Quick Commerce dark-store feeder hub"]
  },
  {
    id: "bengaluru",
    city: "Hosakote / Bengaluru",
    state: "Karnataka",
    zone: "South",
    sqft: "35,000 sq.ft",
    pinCodes: "3,900+ Pin Codes",
    sla: "Next-Day Delivery Across South India",
    gstState: "KA (29)",
    keyCategories: "Tech Accessories, Fans, Fitness Gear, Premium Home",
    features: ["Automated conveyor sortation lines", "Integrated safe-drop reverse QC docks", "Next-day delivery to Hyderabad & Chennai", "Direct seller-flex connectivity"]
  },
  {
    id: "kolkata",
    city: "Dankuni / Kolkata",
    state: "West Bengal",
    zone: "East",
    sqft: "28,000 sq.ft",
    pinCodes: "2,900+ Pin Codes",
    sla: "Next-Day East Metro Delivery",
    gstState: "WB (19)",
    keyCategories: "Ceiling Fans, Kitchenware, Consumer Packaged Goods",
    features: ["Gateway for East India & North-East transit", "Flood-protected elevated concrete plinths", "Dedicated postal & surface carrier line-hauls", "Multi-client B2B dealer dispatch dock"]
  },
  {
    id: "hyderabad",
    city: "Medchal / Hyderabad",
    state: "Telangana",
    zone: "South",
    sqft: "24,000 sq.ft",
    pinCodes: "2,400+ Pin Codes",
    sla: "Next-Day Regional Delivery",
    gstState: "TS (36)",
    keyCategories: "Appliances, Hardware, Health & Personal Care",
    features: ["ORR highway connectivity", "Same-day Hyderabad metro delivery", "Serial-tracked high-value electronics bay", "Direct carrier truckload cross-dock"]
  },
  {
    id: "chennai",
    city: "Sriperumbudur / Chennai",
    state: "Tamil Nadu",
    zone: "South",
    sqft: "22,000 sq.ft",
    pinCodes: "2,600+ Pin Codes",
    sla: "Next-Day Regional Delivery",
    gstState: "TN (33)",
    keyCategories: "Automotive, Large Home Appliances, Kitchen",
    features: ["Proximity to Chennai Port & industrial belt", "Heavy-bulky crate handling equipment", "Dedicated regional customer returns audit dock", "Full Tamil Nadu & Kerala corridor coverage"]
  },
  {
    id: "ahmedabad",
    city: "Changodar / Ahmedabad",
    state: "Gujarat",
    zone: "West",
    sqft: "20,000 sq.ft",
    pinCodes: "2,100+ Pin Codes",
    sla: "Next-Day Gujarat Delivery",
    gstState: "GJ (24)",
    keyCategories: "Textiles, Kitchen Appliances, Industrial Goods",
    features: ["Western Dedicated Freight Corridor access", "Direct OEM factory inwarding docks", "Integrated shrink-wrapping and kitting lines", "Same-day Ahmedabad & Gandhinagar SLAs"]
  },
  {
    id: "pune",
    city: "Chakan / Pune",
    state: "Maharashtra",
    zone: "West",
    sqft: "18,000 sq.ft",
    pinCodes: "1,800+ Pin Codes",
    sla: "Same-Day Western MH Delivery",
    gstState: "MH (27)",
    keyCategories: "Automotive Parts, Appliances, Fitness Gear",
    features: ["Direct linkage to Bhiwandi mega hub", "Overnight line-haul replenishments", "Specialized precision packaging stations", "Dedicated regional B2B distributor supply"]
  },
  {
    id: "lucknow",
    city: "Transport Nagar / Lucknow",
    state: "Uttar Pradesh",
    zone: "North",
    sqft: "16,000 sq.ft",
    pinCodes: "2,200+ Pin Codes",
    sla: "Next-Day Central UP Delivery",
    gstState: "UP (09)",
    keyCategories: "Consumer Goods, Electricals, Home Basics",
    features: ["Access to Agra-Lucknow & Purvanchal Expressways", "Central UP distribution node", "High-capacity COD cash vault management", "Localized vernacular customer support dock"]
  },
  {
    id: "jaipur",
    city: "VKI Area / Jaipur",
    state: "Rajasthan",
    zone: "North",
    sqft: "15,000 sq.ft",
    pinCodes: "1,600+ Pin Codes",
    sla: "Next-Day Rajasthan Delivery",
    gstState: "RJ (08)",
    keyCategories: "Home Decor, Cookware, Small Appliances",
    features: ["Direct connection to Delhi NCR freight corridor", "Dedicated fragile item cushioning lines", "Regional dealer replenishment sorting", "Rapid RTO reverse verification"]
  },
  {
    id: "guwahati",
    city: "Amingaon / Guwahati",
    state: "Assam",
    zone: "East",
    sqft: "14,000 sq.ft",
    pinCodes: "1,200+ Pin Codes",
    sla: "North-East Regional Delivery Hub",
    gstState: "AS (18)",
    keyCategories: "Consumer Essentials, Electronics, Apparel",
    features: ["Eliminates 7-10 day transit from mainland India", "Dedicated air and rail multimodal receiving", "Guaranteed local Prime/Fast delivery badges", "All 7 North-East states regional dispatch"]
  },
  {
    id: "patna",
    city: "Didarganj / Patna",
    state: "Bihar",
    zone: "East",
    sqft: "12,000 sq.ft",
    pinCodes: "1,400+ Pin Codes",
    sla: "Next-Day Bihar & Jharkhand Delivery",
    gstState: "BR (10)",
    keyCategories: "Fast-Moving Durables, Kitchen Essentials",
    features: ["NH-30 arterial distribution access", "Dedicated COD risk containment protocol", "Local last-mile rider dispatch integration", "Rapid inwarding for regional trade stock"]
  }
];

export default function FulfilmentNetworkPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState<WarehouseHub>(WAREHOUSE_HUBS[0]);
  const [selectedZone, setSelectedZone] = useState<string>("All");

  const filteredHubs = selectedZone === "All" 
    ? WAREHOUSE_HUBS 
    : WAREHOUSE_HUBS.filter(h => h.zone === selectedZone);

  return (
    <div className={`fulfilment-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.02) 40%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Fulfilment Network</span>
          </div>

          <div style={{ maxWidth: "920px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              color: "#1D4ED8",
              fontSize: "0.82rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }} />
              Pan-India Footprint • 12 Managed Regional Hubs
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.8px",
              margin: "0 0 1.25rem"
            }}>
              Strategic Fulfilment Network: <br />
              <span style={{ color: "#2563EB" }}>12 Regional Hubs. 19,000+ Pin Codes.</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.08rem, 1.8vw, 1.22rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "2.2rem",
              maxWidth: "840px",
              fontWeight: 500
            }}>
              Eliminate multi-day shipping delays and costly national zone freight rates. Good Life operates 12 managed warehouse hubs across India, giving your brand localized Prime and Next-Day delivery badges across 92% of India&apos;s online purchasing population.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDiagOpen(true)}
                style={{
                  height: "54px",
                  padding: "0 2.2rem",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(37, 99, 235, 0.32)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>UNLOCK YOUR GROWTH</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <Link
                href="/contact"
                style={{
                  height: "54px",
                  padding: "0 1.8rem",
                  borderRadius: "14px",
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  color: "#0F172A",
                  fontSize: "0.96rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                Book Network Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "2.2rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { val: "12 Hubs", label: "Operational Regional Hubs", sub: "Strategically located across 4 key zones" },
              { val: "19,000+", label: "Pin Codes Serviced", sub: "Reaching Tier-1, Tier-2, and Tier-3 India" },
              { val: "<24h SLA", label: "Same-Day / Next-Day Delivery", sub: "For all metro and Tier-1 customer orders" },
              { val: "12 States", label: "State GST Compliance", sub: "Turnkey APOB & PPOB registration support" }
            ].map((st, sIdx) => (
              <div key={sIdx} style={{ borderLeft: "3px solid #2563EB", paddingLeft: "1.2rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0B1736", letterSpacing: "-0.8px" }}>{st.val}</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1E293B", marginTop: "0.2rem" }}>{st.label}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.2rem" }}>{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hub Explorer */}
      <section style={{ padding: "5rem 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.6px", color: "#2563EB", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Pan-India Infrastructure
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 900, color: "#0B1736", letterSpacing: "-1px", margin: "0 0 0.75rem" }}>
              Explore Our 12 Regional Warehouse Locations
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Select any regional hub below to inspect capacity, state GST tax registration code, service pin-code reach, and certified material handling specs.
            </p>

            {/* Zone Filter Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.8rem", flexWrap: "wrap" }}>
              {(["All", "West", "North", "South", "East"] as const).map(zone => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "999px",
                    border: selectedZone === zone ? "1.5px solid #2563EB" : "1.5px solid #CBD5E1",
                    background: selectedZone === zone ? "#2563EB" : "#FFFFFF",
                    color: selectedZone === zone ? "#FFFFFF" : "#475569",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {zone} Zone {zone !== "All" && `(${WAREHOUSE_HUBS.filter(h => h.zone === zone).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Hubs & Selected Hub Detail Panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2.5rem", alignItems: "start" }} className="network-grid-responsive">
            
            {/* Hub List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {filteredHubs.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "1.4rem",
                      border: isSelected ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
                      boxShadow: isSelected ? "0 10px 25px rgba(37,99,235,0.12)" : "0 2px 6px rgba(0,0,0,0.02)",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        background: hub.zone === "North" ? "#FEF3C7" : hub.zone === "South" ? "#E0F2FE" : hub.zone === "West" ? "#EDE9FE" : "#DCFCE7",
                        color: hub.zone === "North" ? "#92400E" : hub.zone === "South" ? "#0369A1" : hub.zone === "West" ? "#6D28D9" : "#15803D"
                      }}>
                        {hub.zone} Zone
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B" }}>GST: {hub.gstState}</span>
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B1736", margin: "0.3rem 0" }}>
                      {hub.city}
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#64748B", margin: 0, fontWeight: 500 }}>
                      {hub.state} • {hub.sqft}
                    </p>

                    <div style={{ marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#2563EB", fontWeight: 700 }}>{hub.sla}</span>
                      <span style={{ fontSize: "0.9rem", color: isSelected ? "#2563EB" : "#94A3B8" }}>→</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Hub Deep Dive Card (Sticky) */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "2.4rem",
              border: "1.5px solid #BFDBFE",
              boxShadow: "0 18px 45px rgba(37,99,235,0.08)",
              position: "sticky",
              top: "100px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#EFF6FF",
                  color: "#2563EB"
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "1px", color: "#2563EB", textTransform: "uppercase" }}>
                    Facility Profile
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B1736", margin: 0 }}>
                    {selectedHub.city}
                  </h3>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1.5rem 0", padding: "1.2rem", background: "#F8FAFC", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Active Storage Capacity</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginTop: "0.2rem" }}>{selectedHub.sqft}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Service Coverage</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginTop: "0.2rem" }}>{selectedHub.pinCodes}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Dispatch SLA</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#16A34A", marginTop: "0.2rem" }}>{selectedHub.sla}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>GST State Code</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2563EB", marginTop: "0.2rem" }}>{selectedHub.gstState}</div>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.4rem" }}>Optimized For Categories:</div>
                <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5, background: "#EFF6FF", padding: "0.7rem 1rem", borderRadius: "8px", border: "1px solid #BFDBFE" }}>
                  {selectedHub.keyCategories}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.8rem" }}>Facility Capabilities:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {selectedHub.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#DCFCE7", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span style={{ fontSize: "0.86rem", color: "#334155", fontWeight: 500 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #E2E8F0" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "12px",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>ALLOCATE INVENTORY TO THIS HUB</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance & Tax Support */}
      <section style={{ padding: "4.5rem 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem" }}>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)", fontWeight: 900, color: "#0B1736", margin: "0 0 0.75rem" }}>
              Turnkey State GST Compliance & APOB Setup
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
              Expanding into multiple states usually requires complicated legal paperwork, landlord agreements, and state GST registrations. Good Life handles the entire regulatory roadmap for you.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {[
              {
                title: "Additional Place of Business (APOB) Registration",
                desc: "We provide verified commercial lease agreements, municipal tax receipts, and utility proofs required to register our warehouse as your compliant APOB."
              },
              {
                title: "Principal Place of Business (PPOB) for Non-Resident Brands",
                desc: "For brands without an existing entity in a particular state, we facilitate compliant PPOB establishment under local state commercial guidelines."
              },
              {
                title: "Automated Multi-State E-Way Bill Generation",
                desc: "Our ERP system generates compliant E-Way bills directly from marketplace order manifests, preventing carrier highway detentions or tax penalties."
              }
            ].map((box, bIdx) => (
              <div key={bIdx} style={{ background: "#F8FAFC", borderRadius: "18px", padding: "2rem", border: "1.5px solid #E2E8F0" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", fontWeight: 900 }}>
                  0{bIdx + 1}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.6rem" }}>{box.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section style={{ padding: "5rem 0 5.5rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{
            background: "linear-gradient(135deg, #0B1736 0%, #0F2557 100%)",
            borderRadius: "28px",
            padding: "3.5rem 3rem",
            color: "#FFFFFF",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(11, 23, 54, 0.25)"
          }}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.12)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                color: "#60A5FA"
              }}>
                Regional Deployment
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", margin: "0 0 1rem" }}>
                Ready to Deploy Stock Across 12 Key Indian Hubs?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "2.2rem" }}>
                Run our Commerce Diagnostic to simulate your optimal regional inventory split and projected freight cost savings across all 12 warehouse nodes.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setDiagOpen(true)}
                  style={{
                    height: "56px",
                    padding: "0 2.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>UNLOCK YOUR GROWTH</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <Link
                  href="/contact"
                  style={{
                    height: "56px",
                    padding: "0 2rem",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1.5px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  Contact Warehouse Operations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
