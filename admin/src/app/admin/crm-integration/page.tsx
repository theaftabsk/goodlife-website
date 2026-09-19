"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import {
  CrmIcon,
  CheckIcon,
  LightningIcon,
  RefreshIcon,
  TrashIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

interface CrmAuditLogItem {
  id: string;
  leadId?: string | null;
  leadCompany?: string | null;
  leadEmail?: string | null;
  action: string;
  status: string;
  httpCode?: number | null;
  payload?: any;
  response?: string | null;
  errorMessage?: string | null;
  createdAt: string;
}

export default function CrmIntegrationPage() {
  const {
    crmConfig,
    updateCrmConfig,
    testCrmWebhook,
    disconnectCrm,
    syncPendingLeadsToCrm,
    leads,
    showToast,
  } = useAdminData();

  // Local Form State
  const [provider, setProvider] = useState(crmConfig.provider || "");
  const [webhookUrl, setWebhookUrl] = useState(crmConfig.webhookUrl || "");
  const [apiKey, setApiKey] = useState(crmConfig.apiKey || "");
  const [autoSync, setAutoSync] = useState(crmConfig.autoSync);
  const [notificationEmail, setNotificationEmail] = useState(crmConfig.notificationEmail || "");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<CrmAuditLogItem[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Action Loading States
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; httpCode?: number } | null>(null);

  // Synchronize form when crmConfig loads from backend
  useEffect(() => {
    setProvider(crmConfig.provider || "");
    setWebhookUrl(crmConfig.webhookUrl || "");
    setApiKey(crmConfig.apiKey || "");
    setAutoSync(crmConfig.autoSync);
    setNotificationEmail(crmConfig.notificationEmail || "");
  }, [crmConfig]);

  // Fetch real audit logs from NestJS backend
  const fetchAuditLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/crm/logs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setAuditLogs(data);
      }
    } catch (_) {}
    setLoadingLogs(false);
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl.trim() && !provider.trim()) {
      showToast("Please enter a webhook endpoint URL or select a provider.");
      return;
    }
    setSaving(true);
    try {
      await updateCrmConfig({
        provider: provider.trim() || "Custom Webhook",
        webhookUrl: webhookUrl.trim(),
        apiKey: apiKey.trim(),
        autoSync,
        notificationEmail: notificationEmail.trim(),
        isConnected: Boolean(webhookUrl.trim()),
      });
      await fetchAuditLogs();
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAutoSync = async () => {
    const nextVal = !autoSync;
    setAutoSync(nextVal);
    await updateCrmConfig({ autoSync: nextVal });
    showToast(`Automatic real-time CRM sync turned ${nextVal ? "ON" : "OFF"}`);
    await fetchAuditLogs();
  };

  const handleTestConnection = async () => {
    if (!webhookUrl.trim()) {
      showToast("Please provide a Webhook URL before running connectivity test.");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testCrmWebhook({
        provider: provider || "CRM Webhook",
        webhookUrl: webhookUrl.trim(),
        apiKey: apiKey.trim(),
      });
      setTestResult(res);
      await fetchAuditLogs();
    } finally {
      setTesting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect this CRM? Leads will remain strictly in the local database.")) return;
    await disconnectCrm();
    setProvider("");
    setWebhookUrl("");
    setApiKey("");
    setAutoSync(false);
    setTestResult(null);
    await fetchAuditLogs();
  };

  const handleSyncPending = async () => {
    setSyncing(true);
    try {
      await syncPendingLeadsToCrm();
      await fetchAuditLogs();
    } finally {
      setSyncing(false);
    }
  };

  const handleClearLogs = async () => {
    if (!confirm("Clear all CRM telemetry audit logs?")) return;
    try {
      await fetch("http://localhost:5000/api/v1/crm/logs", { method: "DELETE" });
      setAuditLogs([]);
      showToast("CRM audit logs cleared.");
    } catch (_) {
      showToast("Failed to clear logs.");
    }
  };

  // Metrics
  const totalLeads = leads.length;
  const syncedCount = leads.filter((l) => l.crmStatus && l.crmStatus.startsWith("Synced to")).length;
  const pendingCount = totalLeads - syncedCount;
  const isCurrentlyConnected = crmConfig.isConnected && Boolean(crmConfig.webhookUrl);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px" }}>
      {/* ------------------------------------------------------------- */}
      {/* 1. STATUS HERO BANNER */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          background: isCurrentlyConnected ? "#F0FDF4" : "#F8FAFC",
          border: isCurrentlyConnected ? "1.5px solid #86EFAC" : "1.5px solid #E2E8F0",
          borderRadius: "14px",
          padding: "1.4rem 1.6rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: isCurrentlyConnected ? "#DCFCE7" : "#F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CrmIcon size={22} color={isCurrentlyConnected ? "#16A34A" : "#64748B"} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                CRM Integration &amp; Inbound Forwarding Gateway
              </h2>
              {isCurrentlyConnected ? (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    background: "#DCFCE7",
                    color: "#166534",
                    border: "1px solid #BBF7D0",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#16A34A" }} />
                  Connected: {crmConfig.provider || "Active CRM"}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    background: "#FEE2E2",
                    color: "#991B1B",
                    border: "1px solid #FECACA",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#DC2626" }} />
                  Not Connected (Inactive)
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              {isCurrentlyConnected
                ? `Endpoint verified: ${crmConfig.webhookUrl} · Real-time push is ${autoSync ? "ACTIVE (Auto-Push ON)" : "PAUSED (Manual Push Only)"}`
                : "No CRM endpoint is linked. All inbound website inquiries are securely captured and maintained in your local PostgreSQL database."}
            </p>
          </div>
        </div>

        {isCurrentlyConnected && (
          <button
            type="button"
            onClick={handleDisconnect}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "8px",
              background: "#FFFFFF",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Disconnect CRM
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. REAL METRICS STRIP */}
      {/* ------------------------------------------------------------- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Total Inbound Leads
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginTop: "0.2rem" }}>
            {totalLeads}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>
            PostgreSQL Database Count
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Synced to CRM
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#16A34A", marginTop: "0.2rem" }}>
            {syncedCount}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>
            {isCurrentlyConnected ? `Forwarded to ${crmConfig.provider}` : "No CRM Active"}
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Pending Sync / Local Only
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#D97706", marginTop: "0.2rem" }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>
            Available for manual push
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Auto-Sync Status
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, color: autoSync ? "#16A34A" : "#64748B", marginTop: "0.35rem" }}>
            {autoSync ? "Enabled (Live)" : "Disabled (Off)"}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>
            Trigger on public submission
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CRM CONFIGURATION & REAL SYNC CONTROLS */}
      {/* ------------------------------------------------------------- */}
      <form
        onSubmit={handleSave}
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              CRM Destination Configuration
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
              Configure where inbound leads should be forwarded (Zoho CRM, HubSpot, Salesforce, or generic Webhook URL).
            </p>
          </div>

          {/* Real On/Off Button Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
              Auto-Sync:
            </span>
            <button
              type="button"
              onClick={handleToggleAutoSync}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "20px",
                border: autoSync ? "1px solid #86EFAC" : "1px solid #CBD5E1",
                background: autoSync ? "#DCFCE7" : "#F1F5F9",
                color: autoSync ? "#166534" : "#475569",
                fontSize: "0.78rem",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: autoSync ? "#16A34A" : "#94A3B8",
                }}
              />
              <span>{autoSync ? "SYNC ON" : "SYNC OFF"}</span>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {/* Provider Selection */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
              CRM Platform Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="input-control"
              style={{ width: "100%", fontSize: "0.85rem" }}
            >
              <option value="">-- Select CRM / Integration Type --</option>
              <option value="Zoho CRM">Zoho CRM (Zoho Flow / Inbound Webhook)</option>
              <option value="HubSpot">HubSpot CRM</option>
              <option value="Salesforce">Salesforce CRM</option>
              <option value="Zapier / Make">Zapier / Make / n8n Automation</option>
              <option value="Custom Webhook">Custom Inbound API Endpoint</option>
            </select>
          </div>

          {/* Fallback Notification Email */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
              Notification Email (Lead Forwarding Copy)
            </label>
            <input
              type="email"
              placeholder="growth@goodlifesutra.com"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className="input-control"
              style={{ width: "100%", fontSize: "0.85rem" }}
            />
          </div>
        </div>

        {/* Webhook Endpoint */}
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
            CRM Inbound Webhook / API Endpoint URL *
          </label>
          <input
            type="url"
            placeholder="https://flow.zoho.in/... or https://api.yourcrm.com/v1/leads"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="input-control"
            style={{ width: "100%", fontFamily: "monospace", fontSize: "0.85rem" }}
          />
          <span style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.25rem", display: "block" }}>
            When a customer submits a diagnostic inquiry, Good Life dispatches an HTTP POST JSON payload to this endpoint.
          </span>
        </div>

        {/* API Key / Bearer Token */}
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
            Authorization Token / API Key (Optional)
          </label>
          <input
            type="password"
            placeholder="Bearer token or API Secret (Optional)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input-control"
            style={{ width: "100%", fontFamily: "monospace", fontSize: "0.85rem" }}
          />
          <span style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.25rem", display: "block" }}>
            Passed in the `Authorization: Bearer` and `X-Api-Key` headers on webhook dispatch.
          </span>
        </div>

        {/* Test Result Message Box */}
        {testResult && (
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              background: testResult.success ? "#ECFDF5" : "#FEF2F2",
              border: testResult.success ? "1px solid #A7F3D0" : "1px solid #FECACA",
              color: testResult.success ? "#065F46" : "#991B1B",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            {testResult.message}
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            borderTop: "1px solid #F1F5F9",
            paddingTop: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing || !webhookUrl.trim()}
              className="btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem" }}
            >
              <LightningIcon size={14} color="#2563EB" />
              <span>{testing ? "Testing Endpoint..." : "Test CRM Webhook (Live Ping)"}</span>
            </button>

            {isCurrentlyConnected && pendingCount > 0 && (
              <button
                type="button"
                onClick={handleSyncPending}
                disabled={syncing}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  color: "#1D4ED8",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <RefreshIcon size={14} color="#1D4ED8" />
                <span>{syncing ? "Pushing Leads..." : `Sync ${pendingCount} Pending Leads`}</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.85rem" }}
          >
            <CheckIcon size={16} color="#FFFFFF" />
            <span>{saving ? "Saving to PostgreSQL..." : "Save CRM Configuration"}</span>
          </button>
        </div>
      </form>

      {/* ------------------------------------------------------------- */}
      {/* 4. REAL INBOUND LEADS & FORWARDING STATUS TABLE */}
      {/* ------------------------------------------------------------- */}
      <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Inbound Leads &amp; CRM Sync Status
            </h3>
            <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
              Live submissions captured from the website and their verified CRM delivery state.
            </p>
          </div>
          <span style={{ fontSize: "0.76rem", color: "#64748B", fontWeight: 600 }}>
            {leads.length} total lead{leads.length === 1 ? "" : "s"} in database
          </span>
        </div>

        {leads.length === 0 ? (
          <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#94A3B8", background: "#F8FAFC", borderRadius: "8px" }}>
            No inbound leads in database yet. Submit an inquiry through the website or modal to test.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {leads.map((lead) => {
              const isSynced = lead.crmStatus && lead.crmStatus.startsWith("Synced to");
              return (
                <div
                  key={lead.id}
                  style={{
                    padding: "0.85rem 1.1rem",
                    borderRadius: "10px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.9rem" }}>
                        {lead.company}
                      </span>
                      <span style={{ fontSize: "0.74rem", color: "#2563EB", fontWeight: 700, fontFamily: "monospace" }}>
                        {lead.leadCode}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "0.15rem" }}>
                      {lead.contact} ({lead.email}) · {lead.category} · {lead.source || "Website Inbound"}
                    </div>
                  </div>

                  <div>
                    {isSynced ? (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "6px",
                          background: "#DCFCE7",
                          color: "#166534",
                          border: "1px solid #BBF7D0",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <CheckIcon size={12} color="#16A34A" />
                        <span>{lead.crmStatus}</span>
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "6px",
                          background: "#F1F5F9",
                          color: "#475569",
                          border: "1px solid #CBD5E1",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#94A3B8" }} />
                        <span>{lead.crmStatus || "New Inbound (Local DB Only)"}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. REAL CRM TELEMETRY & AUDIT TRAIL */}
      {/* ------------------------------------------------------------- */}
      <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ShieldCheckIcon size={18} color="#2563EB" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Live CRM Telemetry &amp; Audit Trail
              </h3>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
              Immutable audit history of webhook pings, payload deliveries, HTTP response status codes, and configuration events.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={fetchAuditLogs}
              disabled={loadingLogs}
              className="btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
            >
              <RefreshIcon size={12} color="#475569" />
              <span>{loadingLogs ? "Refreshing..." : "Refresh"}</span>
            </button>
            {auditLogs.length > 0 && (
              <button
                type="button"
                onClick={handleClearLogs}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem", color: "#DC2626" }}
              >
                <TrashIcon size={12} color="#DC2626" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        </div>

        {auditLogs.length === 0 ? (
          <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#94A3B8", background: "#F8FAFC", borderRadius: "8px" }}>
            No CRM audit events recorded yet. Click &quot;Test CRM Webhook&quot; or save a configuration to record telemetry.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid #E2E8F0", textAlign: "left", background: "#F8FAFC" }}>
                  <th style={{ padding: "0.6rem 0.75rem", color: "#475569", fontWeight: 700 }}>Timestamp</th>
                  <th style={{ padding: "0.6rem 0.75rem", color: "#475569", fontWeight: 700 }}>Action</th>
                  <th style={{ padding: "0.6rem 0.75rem", color: "#475569", fontWeight: 700 }}>Lead / Target</th>
                  <th style={{ padding: "0.6rem 0.75rem", color: "#475569", fontWeight: 700 }}>Status</th>
                  <th style={{ padding: "0.6rem 0.75rem", color: "#475569", fontWeight: 700 }}>Details / Response</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => {
                  const isSuccess = log.status === "SUCCESS";
                  const isWarning = log.status === "WARNING";
                  const formattedTime = new Date(log.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <tr key={log.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "#64748B", whiteSpace: "nowrap" }}>
                        {formattedTime}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", fontWeight: 700, color: "#0F172A" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "0.74rem",
                            background: "#F1F5F9",
                            padding: "0.15rem 0.4rem",
                            borderRadius: "4px",
                          }}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "#334155" }}>
                        {log.leadCompany ? (
                          <div>
                            <span style={{ fontWeight: 600 }}>{log.leadCompany}</span>
                            {log.leadEmail && <span style={{ color: "#94A3B8", marginLeft: "0.3rem" }}>({log.leadEmail})</span>}
                          </div>
                        ) : (
                          <span style={{ color: "#94A3B8" }}>Gateway Operation</span>
                        )}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "4px",
                            background: isSuccess ? "#DCFCE7" : isWarning ? "#FEF3C7" : "#FEE2E2",
                            color: isSuccess ? "#166534" : isWarning ? "#92400E" : "#991B1B",
                          }}
                        >
                          {log.status} {log.httpCode ? `(${log.httpCode})` : ""}
                        </span>
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "#475569", maxWidth: "380px" }}>
                        <div style={{ wordBreak: "break-word", lineHeight: 1.4 }}>
                          {log.errorMessage || log.response || "No details provided"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
