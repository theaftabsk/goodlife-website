"use client";

import React, { useState } from "react";

interface CommerceDiagnosticModalProps {
  onClose: () => void;
}

export default function CommerceDiagnosticModal({ onClose }: CommerceDiagnosticModalProps) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    contactName: "",
    designation: "",
    email: "",
    mobile: "",
    category: "Home Appliances & Electronics",
    annualRevenue: "₹10 Cr - ₹50 Cr",
    marketplaces: [] as string[],
    monthlyGmv: "₹10L - ₹50L",
    orderVolume: "1,000 - 5,000 orders/mo",
    operatingModel: "Mixed / Fragmented Agency",
    isOem: "Yes, OEM seeking to launch brand",
    warehouseModel: "Single Warehouse / Self-fulfilled",
    challenges: [] as string[],
    reconciled: "Partially / Manual excel tracking",
    intent: "Scale Pan-India & Multi-Platform",
    timeline: "Immediate (within 14 days)"
  });

  // Calculated Lead Tags
  const getLeadTags = () => {
    const tags: string[] = [];
    if (formData.isOem.includes("OEM")) tags.push("OEM-to-Brand Opportunity");
    if (formData.marketplaces.length > 2 || formData.intent.includes("Multi-Platform")) tags.push("Multi-Platform Expansion");
    if (formData.intent.includes("D2C") || formData.challenges.includes("D2C Operations")) tags.push("D2C Operations Opportunity");
    if (formData.challenges.includes("B2B & Dealer Fulfilment") || formData.intent.includes("B2B")) tags.push("B2B/Institutional Fulfilment Opportunity");
    if (tags.length === 0) tags.push("Commerce Operating Partnership");
    return tags;
  };

  const handleNext = async () => {
    if (step < 10) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        await fetch(`${apiUrl}/api/v1/leads/diagnostic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: formData.companyName,
            website: formData.website,
            contactName: formData.contactName,
            designation: formData.designation,
            email: formData.email,
            mobile: formData.mobile,
            category: formData.category,
            revenueBand: formData.annualRevenue,
            marketplaces: formData.marketplaces,
            gmvBand: formData.monthlyGmv,
            orderVolume: formData.orderVolume,
            operatingModel: formData.operatingModel,
            warehouseModel: formData.warehouseModel,
            challenges: formData.challenges,
            reconciled: formData.reconciled,
            intent: formData.intent,
            timeline: formData.timeline
          })
        });
      } catch (e) {
        console.log("[DIAGNOSTIC SUBMIT API EXCEPTION]", e);
      }
    }
  };

  const toggleArrayItem = (field: "marketplaces" | "challenges", item: string) => {
    const list = formData[field];
    if (list.includes(item)) {
      setFormData({ ...formData, [field]: list.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...list, item] });
    }
  };

  return (
    <div className="diagnostic-modal-backdrop">
      <div className="diagnostic-modal-card">
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <span className="diagnostic-step-pill">
              {completed ? "✓ Audit Complete" : `Step ${step} of 10 — Free Audit`}
            </span>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFF", marginTop: "0.2rem" }}>
              {completed ? "Commerce Operating Audit Result" : "Request Your Custom Free Audit"}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#FFF", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }}
          >
            ✕
          </button>
        </div>

        {!completed ? (
          <div>
            {/* Step 1: Contact & Company Details */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Enter your company and contact information for custom diagnostic analysis.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input
                    type="text"
                    placeholder="Company Name *"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                  <input
                    type="text"
                    placeholder="Website URL / Brand Name"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                  <input
                    type="text"
                    placeholder="Contact Name *"
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                  <input
                    type="text"
                    placeholder="Designation (Founder/VP/Director)"
                    value={formData.designation}
                    onChange={e => setFormData({ ...formData, designation: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                  <input
                    type="email"
                    placeholder="Business Email *"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    style={{ padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Category & Revenue */}
            {step === 2 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Select your primary product category & annual revenue band.</p>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", color: "#FFF", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Product Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  >
                    <option style={{ background: "#0D131F" }}>Home Appliances & Heavy Bulky</option>
                    <option style={{ background: "#0D131F" }}>Electronics & IT Accessories</option>
                    <option style={{ background: "#0D131F" }}>Fashion & Apparel</option>
                    <option style={{ background: "#0D131F" }}>FMCG & Personal Care</option>
                    <option style={{ background: "#0D131F" }}>Industrial & B2B Goods</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "#FFF", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Annual Turnover Band</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {["Under ₹5 Cr", "₹5 Cr - ₹20 Cr", "₹20 Cr - ₹100 Cr", "Above ₹100 Cr"].map((rev, idx) => (
                      <button
                        key={idx}
                        className={`option-select-btn ${formData.annualRevenue === rev ? "selected" : ""}`}
                        onClick={() => setFormData({ ...formData, annualRevenue: rev })}
                      >
                        {rev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Marketplace Presence */}
            {step === 3 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Which platforms does your brand currently sell on? (Select all that apply)</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {["Amazon", "Flipkart", "Myntra", "Snapmint / Bajaj", "Moglix / IndiaMART", "JioMart", "D2C Website", "Not yet online (OEM Launch)"].map((mp, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.marketplaces.includes(mp) ? "selected" : ""}`}
                      onClick={() => toggleArrayItem("marketplaces", mp)}
                    >
                      {mp} {formData.marketplaces.includes(mp) ? "✓" : "+"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Monthly GMV & Order Volume */}
            {step === 4 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Approximate monthly e-commerce volume.</p>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#FFF", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Monthly GMV</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {["Pre-revenue / Launch", "Under ₹10L/mo", "₹10L - ₹50L/mo", "₹50L - ₹2 Cr/mo", "Above ₹2 Cr/mo"].map((gmv, idx) => (
                      <button
                        key={idx}
                        className={`option-select-btn ${formData.monthlyGmv === gmv ? "selected" : ""}`}
                        onClick={() => setFormData({ ...formData, monthlyGmv: gmv })}
                      >
                        {gmv}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Operating Model & OEM Status */}
            {step === 5 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Current Operating Model & OEM Background.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "OEM / Manufacturer seeking to launch a direct brand",
                    "Internal team managing marketplaces",
                    "Multiple fragmented agencies (Ads, Listing, Logistics)",
                    "Distributor-led model seeking direct operating partnership"
                  ].map((op, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.operatingModel === op ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, operatingModel: op, isOem: op.includes("OEM") ? "Yes" : "No" })}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Warehouse & Dispatch Model */}
            {step === 6 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Current Warehouse Footprint & Dispatch Network.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Single factory / main warehouse dispatch",
                    "2 - 4 Regional warehouse locations",
                    "Multi-state pan-India warehouse coverage (5+ states)",
                    "Need warehouse-supported regional dealer fulfilment"
                  ].map((wh, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.warehouseModel === wh ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, warehouseModel: wh })}
                    >
                      {wh}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Top Operational Challenges */}
            {step === 7 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>What are your primary operational bottlenecks? (Select top challenges)</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    "High RTO & Return Losses",
                    "Un-reconciled Claims & Settlements",
                    "Stock-outs across state warehouses",
                    "Stagnant Marketplace Growth / Ads ACOS",
                    "Multi-Platform / B2B Expansion",
                    "D2C Store Operations & Fulfilment"
                  ].map((ch, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.challenges.includes(ch) ? "selected" : ""}`}
                      onClick={() => toggleArrayItem("challenges", ch)}
                    >
                      {ch} {formData.challenges.includes(ch) ? "✓" : "+"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Reconciliation Status */}
            {step === 8 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Are marketplace settlements & claims systematically reconciled?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "No formal reconciliation (losing money on missing inventory & fees)",
                    "Manual Excel tracking (infrequent / partial auditing)",
                    "Automated platform reconciliation established"
                  ].map((rec, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.reconciled === rec ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, reconciled: rec })}
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Primary Intent */}
            {step === 9 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>What is your primary strategic goal?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Launch Online: Enter marketplaces & D2C from scratch",
                    "Fix & Grow: Eliminate leaks, fix ACOS, & optimize returns",
                    "Scale Pan-India: Expand multi-state fulfilment & B2B commerce",
                    "OEM Brand Incubation: Launch direct-to-consumer brand"
                  ].map((int, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.intent === int ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, intent: int })}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10: Timeline */}
            {step === 10 && (
              <div>
                <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1rem" }}>Decision & Implementation Timeline.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Immediate (within 14 days)",
                    "Within 30 days",
                    "60 - 90 days",
                    "Exploratory / Budget planning"
                  ].map((tm, idx) => (
                    <button
                      key={idx}
                      className={`option-select-btn ${formData.timeline === tm ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, timeline: tm })}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="hero-play-btn" style={{ height: "44px", padding: "0 1.2rem" }}>
                  ← Back
                </button>
              ) : <div />}
              <button onClick={handleNext} className="hero-cta-btn" style={{ height: "44px", padding: "0 1.5rem" }}>
                {step === 10 ? "Calculate Diagnostic Result →" : "Next Step →"}
              </button>
            </div>
          </div>
        ) : (
          /* Thank You & Result Screen */
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎉</div>
            <h3 style={{ fontSize: "1.6rem", color: "#FFF", fontWeight: 800, marginBottom: "0.5rem" }}>
              Diagnostic Submitted Successfully!
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Our commerce leadership team has evaluated your operating parameters.
            </p>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem", textAlign: "left" }}>
              <div style={{ fontSize: "0.8rem", color: "#38BDF8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>
                Identified Strategic Opportunity Tags:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {getLeadTags().map((tag, idx) => (
                  <span key={idx} className="lead-tag-badge">
                    ⚡ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                className="hero-cta-btn"
                style={{ width: "100%", textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}
              >
                Book Executive Commerce Strategy Session →
              </a>
              <button onClick={onClose} className="hero-play-btn" style={{ width: "100%" }}>
                Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
