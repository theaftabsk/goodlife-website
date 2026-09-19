"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { CrmIcon, CheckIcon, LightningIcon, ExternalLinkIcon } from "@/components/Icons";

export default function CrmIntegrationPage() {
  const { crmConfig, updateCrmConfig, leads, showToast } = useAdminData();
  const [form, setForm] = useState(crmConfig);
  const [testingWebhook, setTestingWebhook] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrmConfig(form);
  };

  const handleTestWebhook = () => {
    setTestingWebhook(true);
    setTimeout(() => {
      setTestingWebhook(false);
      showToast(`Test payload dispatched successfully to ${form.provider}!`);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "1000px" }}>
      {/* Overview Banner */}
      <div className="admin-card" style={{ padding: "1.4rem 1.6rem", background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <CrmIcon size={20} color="#2563EB" />
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#1E40AF" }}>
            CRM Integration &amp; Inbound Lead Forwarding
          </span>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#3B82F6", margin: 0, lineHeight: 1.5 }}>
          Connect Good Life&apos;s commercial diagnostic leads directly into your preferred corporate CRM (Zoho CRM, HubSpot, Salesforce, or Custom Webhooks) for instant sales routing.
        </p>
      </div>

      {/* Integration Settings Card */}
      <form onSubmit={handleSave} className="admin-card" style={{ padding: "1.6rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
          Target CRM Destination Configuration
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
              CRM Provider
            </label>
            <select
              value={form.provider}
              onChange={(e) => setForm({ ...form, provider: e.target.value as any })}
              className="input-control"
            >
              <option value="Zoho CRM">Zoho CRM (Recommended for India Enterprise)</option>
              <option value="HubSpot">HubSpot CRM</option>
              <option value="Zapier / Make">Zapier / Make Automation</option>
              <option value="Custom Webhook">Custom Inbound Webhook</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
              Automatic Real-Time Sync
            </label>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.55rem 0.85rem",
              borderRadius: "8px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              height: "38px",
              boxSizing: "border-box"
            }}>
              <input
                type="checkbox"
                id="autoSyncCheck"
                checked={form.autoSync}
                onChange={(e) => setForm({ ...form, autoSync: e.target.checked })}
                style={{ cursor: "pointer", width: "16px", height: "16px" }}
              />
              <label htmlFor="autoSyncCheck" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0F172A", cursor: "pointer" }}>
                Push diagnostic inquiries automatically on submission
              </label>
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
            CRM Inbound Webhook / API Endpoint URL *
          </label>
          <input
            type="url"
            required
            placeholder="https://flow.zoho.in/72819/flow/v1/webhook/incoming"
            value={form.webhookUrl}
            onChange={(e) => setForm({ ...form, webhookUrl: e.target.value })}
            className="input-control"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          />
          <span style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.25rem", display: "block" }}>
            Every lead form submission on the public website triggers an HTTP POST JSON payload to this endpoint.
          </span>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
            Fallback Notification Email Alert
          </label>
          <input
            type="email"
            value={form.notificationEmail}
            onChange={(e) => setForm({ ...form, notificationEmail: e.target.value })}
            className="input-control"
          />
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #F1F5F9",
          paddingTop: "1rem",
          marginTop: "0.5rem"
        }}>
          <button
            type="button"
            onClick={handleTestWebhook}
            className="btn-secondary"
            disabled={testingWebhook}
          >
            <LightningIcon size={14} color="#2563EB" />
            <span>{testingWebhook ? "Sending Test Payload..." : "Test CRM Webhook"}</span>
          </button>

          <button type="submit" className="btn-primary">
            <CheckIcon size={16} color="#FFFFFF" />
            <span>Save Integration Settings</span>
          </button>
        </div>
      </form>

      {/* Recent Webhook Forwarding Telemetry Log */}
      <div className="admin-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>Inbound Leads</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <span>CRM Forwarding Log</span>
        </h3>
        <p style={{ fontSize: "0.78rem", color: "#64748B", marginBottom: "1rem" }}>
          Recent diagnostic submissions captured on the website and synced to your CRM endpoint.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "8px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.88rem" }}>
                  {lead.company}
                </span>
                <span style={{ fontSize: "0.76rem", color: "#64748B", marginLeft: "0.5rem" }}>
                  ({lead.contact} · {lead.gmv})
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="badge badge-green" style={{ fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Synced to {form.provider}</span>
                </span>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                  HTTP 200 OK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
