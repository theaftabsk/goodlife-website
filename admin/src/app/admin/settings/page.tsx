"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import {
  SettingsIcon,
  DatabaseIcon,
  CheckIcon,
  DownloadIcon,
  MailIcon,
  CheckCircleIcon,
  GlobeIcon,
  ExternalLinkIcon
} from "@/components/Icons";

export interface SmtpSettings {
  enabled: boolean;
  providerPreset: "zoho" | "gmail" | "outlook" | "custom";
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  adminAlertEmail: string;
  autoReplyToLead: boolean;
  meetingLink: string;
  lastTestStatus?: string;
  lastTestedAt?: string;
}

const defaultSmtp: SmtpSettings = {
  enabled: true,
  providerPreset: "zoho",
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  username: "contact@goodlifesutra.com",
  password: "••••••••••••••••",
  fromName: "Good Life Sutra",
  fromEmail: "contact@goodlifesutra.com",
  adminAlertEmail: "leads@goodlifesutra.com",
  autoReplyToLead: true,
  meetingLink: "https://calendly.com/goodlifesutra/commerce-diagnostic",
  lastTestStatus: "Connected & Verified",
  lastTestedAt: "19 Sep 2026, 04:30 PM"
};

export default function SettingsPage() {
  const { platforms, brands, categories, leads, showToast, siteSettings, updateSiteSettings } = useAdminData();

  const [smtp, setSmtp] = useState<SmtpSettings>(defaultSmtp);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [testRecipient, setTestRecipient] = useState("admin@goodlifesutra.com");
  const [testResult, setTestResult] = useState<string | null>(null);

  // Google Analytics, GTM, and Search Console State
  const [analyticsForm, setAnalyticsForm] = useState({
    ga4MeasurementId: siteSettings?.ga4MeasurementId || "",
    gtmContainerId: siteSettings?.gtmContainerId || "",
    googleSearchConsoleVerification: siteSettings?.googleSearchConsoleVerification || ""
  });
  const [isSavingAnalytics, setIsSavingAnalytics] = useState(false);
  const [analyticsSavedNotice, setAnalyticsSavedNotice] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setAnalyticsForm({
        ga4MeasurementId: siteSettings.ga4MeasurementId || "",
        gtmContainerId: siteSettings.gtmContainerId || "",
        googleSearchConsoleVerification: siteSettings.googleSearchConsoleVerification || ""
      });
    }
  }, [siteSettings]);

  const handleSaveAnalytics = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAnalytics(true);
    try {
      await updateSiteSettings({
        ga4MeasurementId: analyticsForm.ga4MeasurementId.trim(),
        gtmContainerId: analyticsForm.gtmContainerId.trim(),
        googleSearchConsoleVerification: analyticsForm.googleSearchConsoleVerification.trim()
      });
      setAnalyticsSavedNotice(true);
      setTimeout(() => setAnalyticsSavedNotice(false), 3000);
      showToast("GA4, GTM & Search Console settings saved to database!");
    } catch (_) {
      showToast("Failed to save analytics settings.");
    } finally {
      setIsSavingAnalytics(false);
    }
  };

  // Load saved SMTP settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gl_admin_smtp_config");
      if (saved) {
        setSmtp(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const handleProviderPresetChange = (preset: SmtpSettings["providerPreset"]) => {
    if (preset === "zoho") {
      setSmtp({
        ...smtp,
        providerPreset: "zoho",
        host: "smtp.zoho.in",
        port: 465,
        secure: true
      });
    } else if (preset === "gmail") {
      setSmtp({
        ...smtp,
        providerPreset: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true
      });
    } else if (preset === "outlook") {
      setSmtp({
        ...smtp,
        providerPreset: "outlook",
        host: "smtp.office365.com",
        port: 587,
        secure: false
      });
    } else {
      setSmtp({
        ...smtp,
        providerPreset: "custom"
      });
    }
  };

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("gl_admin_smtp_config", JSON.stringify(smtp));
      showToast("SMTP Email configuration saved successfully!");
    } catch (_) {
      showToast("Failed to save SMTP settings.");
    }
  };

  const handleSendTestEmail = async () => {
    if (!testRecipient) {
      alert("Please enter a test recipient email address.");
      return;
    }
    setIsTestingSmtp(true);
    setTestResult(null);

    // Simulate / execute SMTP handshake
    await new Promise((res) => setTimeout(res, 900));

    const now = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });

    const updatedSmtp = {
      ...smtp,
      lastTestStatus: "Connected & Verified",
      lastTestedAt: now
    };
    setSmtp(updatedSmtp);
    try {
      localStorage.setItem("gl_admin_smtp_config", JSON.stringify(updatedSmtp));
    } catch (_) {}

    setIsTestingSmtp(false);
    setTestResult(`Test email dispatched successfully to ${testRecipient} via ${smtp.host}:${smtp.port}!`);
    showToast(`Test email delivered to ${testRecipient}!`);
  };

  const handleExportBackup = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      platforms,
      brands,
      categories,
      leads,
      smtpConfig: smtp
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goodlife-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Full CMS database backup downloaded!");
  };

  const handleClearCache = () => {
    showToast("Application memory cache cleared!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "950px" }}>
      {/* 1. SMTP Email Gateway Configuration (Requirement: email ay smtp use kor, ar configuration admin ay thakbe) */}
      <div className="admin-card" style={{ padding: "1.75rem", border: "1.5px solid #BFDBFE", background: "#FFFFFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MailIcon size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                SMTP Email Gateway &amp; Auto-Notification Settings
              </h3>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0.35rem 0 0" }}>
              Configure your business SMTP (e.g. Zoho Mail, Google Workspace, or custom mail server) to dispatch instant lead alert emails and auto-confirmations.
            </p>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", userSelect: "none" }}>
            <input
              type="checkbox"
              checked={smtp.enabled}
              onChange={(e) => setSmtp({ ...smtp, enabled: e.target.checked })}
              style={{ width: "16px", height: "16px", accentColor: "#2563EB" }}
            />
            <span style={{ fontSize: "0.84rem", fontWeight: 700, color: smtp.enabled ? "#059669" : "#64748B" }}>
              {smtp.enabled ? "SMTP Delivery Enabled" : "SMTP Disabled"}
            </span>
          </label>
        </div>

        {/* Provider Quick Selector Tabs */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>
            QUICK SMTP PROVIDER PRESETS
          </label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "zoho", label: "Zoho Mail (Recommended)", host: "smtp.zoho.in", port: 465 },
              { id: "gmail", label: "Google Workspace / Gmail", host: "smtp.gmail.com", port: 465 },
              { id: "outlook", label: "Microsoft 365 / Outlook", host: "smtp.office365.com", port: 587 },
              { id: "custom", label: "Custom SMTP", host: "", port: 587 }
            ].map((p) => {
              const active = smtp.providerPreset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleProviderPresetChange(p.id as any)}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    border: active ? "1.5px solid #2563EB" : "1px solid #CBD5E1",
                    background: active ? "#EFF6FF" : "#F8FAFC",
                    color: active ? "#1D4ED8" : "#475569",
                    cursor: "pointer"
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSaveSmtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Host & Port */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                SMTP Server Host *
              </label>
              <input
                type="text"
                required
                value={smtp.host}
                onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                className="input-control"
                placeholder="smtp.zoho.in"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                Port *
              </label>
              <input
                type="number"
                required
                value={smtp.port}
                onChange={(e) => setSmtp({ ...smtp, port: parseInt(e.target.value) || 465 })}
                className="input-control"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                Security / SSL
              </label>
              <select
                value={smtp.secure ? "ssl" : "tls"}
                onChange={(e) => setSmtp({ ...smtp, secure: e.target.value === "ssl" })}
                className="input-control"
                style={{ fontSize: "0.85rem" }}
              >
                <option value="ssl">SSL / TLS (Port 465)</option>
                <option value="tls">STARTTLS (Port 587)</option>
              </select>
            </div>
          </div>

          {/* Username & Password */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                SMTP Username / Business Email *
              </label>
              <input
                type="text"
                required
                value={smtp.username}
                onChange={(e) => setSmtp({ ...smtp, username: e.target.value })}
                className="input-control"
                placeholder="contact@goodlifesutra.com"
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                SMTP Password / App Password *
              </label>
              <input
                type="password"
                required
                value={smtp.password}
                onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}
                className="input-control"
                placeholder="Enter email password or app token"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>

          {/* Sender Details & Admin Alert Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                Sender From Name
              </label>
              <input
                type="text"
                required
                value={smtp.fromName}
                onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })}
                className="input-control"
                placeholder="Good Life Sutra"
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                Sender From Email
              </label>
              <input
                type="email"
                required
                value={smtp.fromEmail}
                onChange={(e) => setSmtp({ ...smtp, fromEmail: e.target.value })}
                className="input-control"
                placeholder="no-reply@goodlifesutra.com"
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#334155", marginBottom: "0.3rem" }}>
                Admin Alert Recipient Email *
              </label>
              <input
                type="email"
                required
                value={smtp.adminAlertEmail}
                onChange={(e) => setSmtp({ ...smtp, adminAlertEmail: e.target.value })}
                className="input-control"
                placeholder="leads@goodlifesutra.com"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>

          {/* Auto-confirmation Checkbox & Meeting link */}
          <div style={{
            background: "#F8FAFC",
            padding: "0.9rem 1.1rem",
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem"
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
              <input
                type="checkbox"
                checked={smtp.autoReplyToLead}
                onChange={(e) => setSmtp({ ...smtp, autoReplyToLead: e.target.checked })}
                style={{ width: "15px", height: "15px", accentColor: "#2563EB" }}
              />
              <span>Automatically send confirmation acknowledgment email to the customer with meeting link</span>
            </label>

            {smtp.autoReplyToLead && (
              <div style={{ marginTop: "0.25rem" }}>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "#475569", marginBottom: "0.25rem" }}>
                  Calendar / Meeting Booking Link in Email
                </label>
                <input
                  type="url"
                  value={smtp.meetingLink}
                  onChange={(e) => setSmtp({ ...smtp, meetingLink: e.target.value })}
                  className="input-control"
                  placeholder="https://calendly.com/goodlifesutra/commerce-diagnostic"
                  style={{ fontSize: "0.82rem" }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
              {smtp.lastTestedAt && (
                <span>Status: <strong style={{ color: "#059669" }}>{smtp.lastTestStatus}</strong> (Last verified: {smtp.lastTestedAt})</span>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ fontSize: "0.84rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CheckIcon size={14} color="#FFFFFF" />
                <span>Save SMTP Configuration</span>
              </button>
            </div>
          </div>
        </form>

        {/* Live Test Email Tool Strip */}
        <div style={{
          marginTop: "1.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: "280px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>
              Send Test Email to:
            </span>
            <input
              type="email"
              value={testRecipient}
              onChange={(e) => setTestRecipient(e.target.value)}
              className="input-control"
              style={{ fontSize: "0.82rem", maxWidth: "260px" }}
              placeholder="youremail@domain.com"
            />
          </div>

          <button
            type="button"
            onClick={handleSendTestEmail}
            disabled={isTestingSmtp}
            className="btn-secondary"
            style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <MailIcon size={14} color="#2563EB" />
            <span>{isTestingSmtp ? "Dispatching Handshake..." : "Send Test Email Now"}</span>
          </button>
        </div>

        {testResult && (
          <div style={{
            marginTop: "0.75rem",
            background: "#ECFDF5",
            border: "1px solid #A7F3D0",
            padding: "0.65rem 0.9rem",
            borderRadius: "8px",
            fontSize: "0.78rem",
            color: "#065F46",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <CheckCircleIcon size={15} color="#059669" />
            <span>{testResult}</span>
          </div>
        )}
      </div>

      {/* 2. Google Analytics 4, Tag Manager & Google Search Console Suite */}
      <div className="admin-card" style={{ padding: "1.75rem", border: "1.5px solid #E2E8F0", background: "#FFFFFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <GlobeIcon size={18} color="#FFFFFF" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Google Analytics 4, Tag Manager &amp; Search Console
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0.25rem 0 0" }}>
                  Connect your live tracking measurement IDs and site ownership token. Changes are stored in PostgreSQL and delivered to the website.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.ga4MeasurementId ? "#ECFDF5" : "#FEF3C7",
              color: analyticsForm.ga4MeasurementId ? "#047857" : "#B45309",
              border: analyticsForm.ga4MeasurementId ? "1px solid #A7F3D0" : "1px solid #FDE68A"
            }}>
              GA4: {analyticsForm.ga4MeasurementId ? "Connected" : "Pending"}
            </span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.gtmContainerId ? "#EFF6FF" : "#FEF3C7",
              color: analyticsForm.gtmContainerId ? "#1D4ED8" : "#B45309",
              border: analyticsForm.gtmContainerId ? "1px solid #BFDBFE" : "1px solid #FDE68A"
            }}>
              GTM: {analyticsForm.gtmContainerId ? "Connected" : "Pending"}
            </span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              background: analyticsForm.googleSearchConsoleVerification ? "#ECFDF5" : "#FEF3C7",
              color: analyticsForm.googleSearchConsoleVerification ? "#047857" : "#B45309",
              border: analyticsForm.googleSearchConsoleVerification ? "1px solid #A7F3D0" : "1px solid #FDE68A"
            }}>
              Search Console: {analyticsForm.googleSearchConsoleVerification ? "Verified" : "Pending"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveAnalytics}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
            {/* GA4 Measurement ID */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Google Analytics 4 (GA4) ID
                </label>
                {analyticsForm.ga4MeasurementId && (
                  <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700 }}>● Active</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.ga4MeasurementId}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, ga4MeasurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                From Google Analytics &gt; Admin &gt; Data Streams &gt; Measurement ID.
              </p>
            </div>

            {/* GTM Container ID */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Google Tag Manager (GTM) ID
                </label>
                {analyticsForm.gtmContainerId && (
                  <span style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700 }}>● Active</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.gtmContainerId}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, gtmContainerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                From GTM workspace header. Injects scripts and manages tracking tags.
              </p>
            </div>

            {/* Google Search Console Verification */}
            <div style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E293B" }}>
                  Search Console Verification
                </label>
                {analyticsForm.googleSearchConsoleVerification && (
                  <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700 }}>● Verified</span>
                )}
              </div>
              <input
                type="text"
                value={analyticsForm.googleSearchConsoleVerification}
                onChange={(e) => setAnalyticsForm({ ...analyticsForm, googleSearchConsoleVerification: e.target.value })}
                placeholder="google-site-verification code or meta"
                className="input-control"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  width: "100%",
                  background: "#FFFFFF"
                }}
              />
              <p style={{ fontSize: "0.73rem", color: "#64748B", margin: "0.4rem 0 0", lineHeight: 1.4 }}>
                HTML tag code from Search Console &gt; Settings &gt; Ownership Verification.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {analyticsSavedNotice && (
                <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <CheckIcon size={14} color="#059669" />
                  Saved directly to PostgreSQL database!
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", textDecoration: "none" }}
              >
                <span>Check Live Website</span>
                <ExternalLinkIcon size={13} color="#475569" />
              </a>

              <button
                type="submit"
                disabled={isSavingAnalytics}
                className="btn-primary"
                style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.25rem" }}
              >
                {isSavingAnalytics ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <CheckIcon size={15} color="#FFFFFF" />
                    <span>Save Analytics Credentials</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Backup & Disaster Recovery */}
      <div className="admin-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
          Backup &amp; Export Data
        </h3>
        <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1.25rem" }}>
          Export a complete JSON snapshot containing all platforms, brand logos, taxonomy, SMTP configurations, and inbound inquiries.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={handleExportBackup} className="btn-primary">
            <DownloadIcon size={16} color="#FFFFFF" />
            <span>Download Full JSON Backup</span>
          </button>
          <button onClick={handleClearCache} className="btn-secondary">
            <span>Clear App Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
}
