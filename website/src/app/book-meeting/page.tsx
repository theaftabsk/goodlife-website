"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalendarBookingWidget from "../components/CalendarBookingWidget";
import CommerceDiagnosticModal from "../components/CommerceDiagnosticModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

function BookingSection() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const company = searchParams.get("company") || "";

  return <CalendarBookingWidget prefillName={name} prefillEmail={email} prefillCompany={company} />;
}

export default function BookMeetingPage() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className={`book-meeting-root ${inter.className}`} style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh" }}>
      <Header onOpenDiagnostic={() => setDiagOpen(true)} />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "3.5rem",
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

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 600 }}>Calendar Booking</span>
          </div>

          <div style={{ maxWidth: "850px" }}>
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
              Direct Executive Session • 30-Minute Architecture Call
            </div>

            <h1 style={{
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#0B1736",
              letterSpacing: "-1.6px",
              margin: "0 0 1.25rem"
            }}>
              Schedule a Solution Architecture Session: <br />
              <span style={{ color: "#2563EB" }}>Speak with Our Operations Leadership</span>
            </h1>

            <p style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
              fontWeight: 500
            }}>
              Select an official time slot below to connect directly with our commerce operating team. We will review your catalog distribution, warehouse placement, return minimization, and automated marketplace reconciliation.
            </p>

            {/* Strategic Value Bullets */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "2rem",
              marginBottom: "1rem"
            }}>
              <div style={{ background: "#FFFFFF", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div style={{ color: "#2563EB", fontWeight: 800, fontSize: "0.92rem", marginBottom: "0.2rem" }}>✓ 30-Min High-Impact</div>
                <div style={{ color: "#64748B", fontSize: "0.84rem" }}>Direct operator discussion, zero sales fluff</div>
              </div>
              <div style={{ background: "#FFFFFF", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div style={{ color: "#2563EB", fontWeight: 800, fontSize: "0.92rem", marginBottom: "0.2rem" }}>✓ Pan-India Logistics</div>
                <div style={{ color: "#64748B", fontSize: "0.84rem" }}>12-State warehouse network feasibility</div>
              </div>
              <div style={{ background: "#FFFFFF", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div style={{ color: "#2563EB", fontWeight: 800, fontSize: "0.92rem", marginBottom: "0.2rem" }}>✓ NDA Guarantee</div>
                <div style={{ color: "#64748B", fontSize: "0.84rem" }}>Confidential data protection agreement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Widget Container */}
      <section style={{ padding: "3.5rem 0 6rem", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Suspense fallback={<div style={{ textAlign: "center", padding: "3rem", color: "#64748B" }}>Loading executive calendar...</div>}>
            <BookingSection />
          </Suspense>
        </div>
      </section>

      <Footer />
      {diagOpen && <CommerceDiagnosticModal onClose={() => setDiagOpen(true)} />}
    </div>
  );
}
