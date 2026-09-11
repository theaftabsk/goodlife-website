"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function PrivacyPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className={`privacy-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "4rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.2rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Privacy & Data Governance</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            fontWeight: 900,
            color: "#0B1736",
            letterSpacing: "-1.5px",
            margin: "0 0 0.8rem"
          }}>
            Privacy Policy & Data Security
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#64748B", margin: 0, fontWeight: 500 }}>
            Effective Date: September 2026 • GOOD LIFE SUTRA PVT. LTD. (CIN: U74999MH2021PTC368942)
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main style={{ padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "3rem",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem"
          }}>
            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.8rem" }}>
                1. Scope & Enterprise Commitment
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                GOOD LIFE SUTRA PVT. LTD. (&ldquo;Good Life&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) provides commercial operations, warehousing, marketplace management, and revenue assurance services to consumer brands. This Privacy Policy governs the collection, processing, and protection of business enquiry data submitted through our website and interactive Commerce Diagnostic Tool.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.8rem" }}>
                2. Information Collected Through Qualified Forms
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, marginBottom: "0.8rem" }}>
                When you request a Commerce Diagnostic or submit a business enquiry, we collect:
              </p>
              <ul style={{ paddingLeft: "1.4rem", margin: 0, color: "#475569", fontSize: "0.92rem", lineHeight: 1.7 }}>
                <li>Company name, corporate website URL, registered legal address</li>
                <li>Authorized contact person name, designation, business email, and phone number</li>
                <li>Product category, annual/monthly GMV bands, active marketplace presence</li>
                <li>Logistics requirements, warehouse locations, and operational pain points</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.8rem" }}>
                3. Purpose of Processing & CRM Integration
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Lead data is processed exclusively to evaluate business fit, calculate commercial diagnostic benchmarks, deliver tailored proposal documents, and route qualified enquiries into our secure client CRM system. We never sell, rent, or trade your corporate information to marketing data brokers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.8rem" }}>
                4. Data Protection & Non-Disclosure (NDA)
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                We understand that commercial operational data (GMV figures, run-rates, settlement files) is highly sensitive. Prior to detailed inventory audits or marketplace API connectivity, Good Life executes a binding bilateral Non-Disclosure Agreement (NDA) ensuring strict confidentiality.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1736", marginBottom: "0.8rem" }}>
                5. Contacting Our Data Protection Officer
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                If you have questions regarding data privacy or wish to request deletion of your submitted enquiry information, contact our corporate legal team at <strong>legal@goodlifesutra.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(false)} />}
    </div>
  );
}
