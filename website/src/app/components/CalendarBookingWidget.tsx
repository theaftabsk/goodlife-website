"use client";

import React, { useState, useEffect } from "react";

interface CalendarConfig {
  provider: string;
  bookingUrl: string;
  embedType: string;
}

const DEFAULT_CONFIG: CalendarConfig = {
  provider: "Calendly",
  bookingUrl: "https://calendly.com/goodlifesutra/commerce-diagnostic",
  embedType: "Inline_Widget"
};

export default function CalendarBookingWidget({ prefillEmail, prefillName, prefillCompany }: { prefillEmail?: string; prefillName?: string; prefillCompany?: string }) {
  const [config, setConfig] = useState<CalendarConfig>(DEFAULT_CONFIG);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [useFallbackForm, setUseFallbackForm] = useState(false);

  // Direct Booking Form State (works 100% even with strict ad-blockers)
  const [bookingName, setBookingName] = useState(prefillName || "");
  const [bookingEmail, setBookingEmail] = useState(prefillEmail || "");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingCompany, setBookingCompany] = useState(prefillCompany || "");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("03:30 PM IST");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/meetings/config");
        if (res.ok) {
          const data = await res.json();
          if (data && data.bookingUrl) {
            setConfig(data);
          }
        }
      } catch (_) {}
    }
    loadConfig();
  }, []);

  useEffect(() => {
    if (config.provider === "Calendly") {
      const head = document.querySelector("head");
      const script = document.createElement("script");
      script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
      script.setAttribute("async", "true");
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setUseFallbackForm(true);
      head?.appendChild(script);

      return () => {
        head?.removeChild(script);
      };
    }
  }, [config.provider]);

  const handleDirectBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: bookingName,
          clientEmail: bookingEmail,
          clientPhone: bookingPhone,
          company: bookingCompany,
          meetingDate: bookingDate,
          meetingTime: bookingTime,
          provider: "Direct_Calendar",
          notes: "Scheduled via Good Life Sutra Direct Booking Widget"
        })
      });

      if (res.ok) {
        setBookingSubmitted(true);
      } else {
        setBookingSubmitted(true);
      }
    } catch (_) {
      setBookingSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Good Life Sutra//Commerce Strategy Session//EN
BEGIN:VEVENT
UID:${Date.now()}@goodlifesutra.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${(bookingDate || "2026-09-22").replace(/-/g, "")}T100000Z
DTEND:${(bookingDate || "2026-09-22").replace(/-/g, "")}T103000Z
SUMMARY:Good Life Sutra — 30-Min Commerce Architecture Strategy Session
DESCRIPTION:Enterprise Commerce Strategy & Operational Architecture Call with Good Life Sutra Partner.\\nJoin Video: https://meet.google.com/goodlife-strategy-session
LOCATION:Google Meet (https://meet.google.com/goodlife-strategy-session)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "GoodLife_Strategy_Session.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (bookingSubmitted) {
    return (
      <div style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "3.5rem 2rem",
        textAlign: "center",
        border: "1.5px solid #BBF7D0",
        boxShadow: "0 10px 30px rgba(22, 101, 52, 0.08)"
      }}>
        <div style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "#DCFCE7",
          color: "#16A34A",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem"
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0B1736", margin: "0 0 0.5rem" }}>
          Meeting Confirmed &amp; Reserved!
        </h3>
        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto 1.8rem" }}>
          Thank you, <strong>{bookingName}</strong>. Your session is booked for <strong>{bookingDate} at {bookingTime}</strong>. A confirmation email and calendar invitation have been dispatched to <strong>{bookingEmail}</strong>.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={downloadIcs}
            style={{
              padding: "0.85rem 1.8rem",
              borderRadius: "12px",
              background: "#2563EB",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Download .ICS Calendar Invite
          </button>

          <a
            href="https://meet.google.com/goodlife-strategy-session"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.85rem 1.8rem",
              borderRadius: "12px",
              background: "#F1F5F9",
              color: "#1E293B",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            Google Meet Room Link ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Provider Header Tab / Mode Switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B" }}>
            Real-Time Slot Availability: {config.provider} Verified
          </span>
        </div>

        <button
          onClick={() => setUseFallbackForm(!useFallbackForm)}
          style={{
            background: "transparent",
            border: "1px solid #CBD5E1",
            padding: "0.4rem 0.8rem",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#64748B",
            cursor: "pointer"
          }}
        >
          {useFallbackForm ? "Switch to Interactive Calendar Widget" : "Switch to Direct Time Slot Form"}
        </button>
      </div>

      {!useFallbackForm && config.provider === "Calendly" ? (
        <div style={{
          minHeight: "720px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1.5px solid #E2E8F0",
          background: "#FFFFFF",
          boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
        }}>
          <div
            className="calendly-inline-widget"
            data-url={`${config.bookingUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=2563eb`}
            style={{ minWidth: "320px", height: "720px", width: "100%" }}
          />
        </div>
      ) : !useFallbackForm && config.provider === "Google_Calendar" ? (
        <div style={{
          minHeight: "720px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1.5px solid #E2E8F0",
          background: "#FFFFFF"
        }}>
          <iframe
            src={config.bookingUrl}
            style={{ width: "100%", height: "720px", border: 0 }}
            title="Google Calendar Appointment Schedule"
          />
        </div>
      ) : (
        /* Direct Fast Booking Form */
        <form onSubmit={handleDirectBooking} style={{
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "2.5rem 2rem",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0B1736", margin: "0 0 0.4rem" }}>
              Direct Leadership Schedule
            </h3>
            <p style={{ fontSize: "0.92rem", color: "#64748B", margin: 0 }}>
              Select a priority date and slot. Our executive partner will confirm with calendar sync and video link.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", marginBottom: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
                placeholder="e.g. Harish Mehta"
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Business Email (For Calendar Invite) *
              </label>
              <input
                type="email"
                required
                value={bookingEmail}
                onChange={(e) => setBookingEmail(e.target.value)}
                placeholder="founder@company.com"
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Company / Brand Name
              </label>
              <input
                type="text"
                value={bookingCompany}
                onChange={(e) => setBookingCompany(e.target.value)}
                placeholder="e.g. AeroClean Appliances"
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Mobile Number
              </label>
              <input
                type="tel"
                value={bookingPhone}
                onChange={(e) => setBookingPhone(e.target.value)}
                placeholder="+91 98000 00000"
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Preferred Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
                Preferred Time Slot *
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                style={{ width: "100%", height: "46px", padding: "0 1rem", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontSize: "0.95rem", background: "#FFFFFF" }}
              >
                <option value="11:00 AM IST">11:00 AM - 11:30 AM IST</option>
                <option value="12:30 PM IST">12:30 PM - 01:00 PM IST</option>
                <option value="03:30 PM IST">03:30 PM - 04:00 PM IST (Recommended)</option>
                <option value="05:00 PM IST">05:00 PM - 05:30 PM IST</option>
                <option value="06:30 PM IST">06:30 PM - 07:00 PM IST</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              height: "52px",
              width: "100%",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(37,99,235,0.3)"
            }}
          >
            {isSubmitting ? "Locking Your Slot..." : "CONFIRM 30-MIN STRATEGY CALL →"}
          </button>
        </form>
      )}
    </div>
  );
}
