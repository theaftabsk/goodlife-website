"use client";

import React, { useState } from "react";
import { useAdminData, MeetingItem, CalendarConfigItem } from "@/context/AdminDataContext";
import {
  CalendarIcon,
  DownloadIcon,
  SearchIcon,
  TrashIcon,
  PhoneIcon,
  MailIcon,
  ExternalLinkIcon,
  EyeIcon,
  CloseIcon,
  BuildingIcon,
  CheckIcon,
  LightningIcon,
  SettingsIcon
} from "@/components/Icons";

export default function CalendarBookingsPage() {
  const {
    meetings,
    calendarConfig,
    saveMeeting,
    updateMeetingStatus,
    deleteMeeting,
    sendMeetingReminder,
    updateCalendarConfig,
    showToast
  } = useAdminData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [providerFilter, setProviderFilter] = useState("ALL");
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);

  // Local config form state
  const [configForm, setConfigForm] = useState<CalendarConfigItem>({
    provider: calendarConfig?.provider || "DIRECT",
    bookingUrl: calendarConfig?.bookingUrl || "https://calendly.com/goodlifesutra/strategy-session",
    embedType: calendarConfig?.embedType || "INLINE",
    remindersEnabled: calendarConfig?.remindersEnabled ?? true,
    reminder24h: calendarConfig?.reminder24h ?? true,
    reminder1h: calendarConfig?.reminder1h ?? true,
    notificationEmail: calendarConfig?.notificationEmail || "leads@goodlifesutra.com"
  });

  // New manual meeting form
  const [newMeetingForm, setNewMeetingForm] = useState({
    clientName: "",
    clientEmail: "",
    clientCompany: "",
    clientPhone: "",
    topic: "Marketplace Operations Strategy",
    startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    meetingUrl: "https://meet.google.com/gls-exec-demo",
    notes: ""
  });

  // Filter meetings
  const filtered = (meetings || []).filter(m => {
    const q = search.toLowerCase();
    const matchesSearch =
      (m.clientName || "").toLowerCase().includes(q) ||
      (m.clientCompany || "").toLowerCase().includes(q) ||
      (m.clientEmail || "").toLowerCase().includes(q) ||
      (m.clientPhone || "").toLowerCase().includes(q) ||
      (m.topic || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "ALL" ||
      m.status === statusFilter;

    const matchesProvider =
      providerFilter === "ALL" ||
      m.provider === providerFilter;

    return matchesSearch && matchesStatus && matchesProvider;
  });

  // Stats calculation
  const totalMeetings = meetings?.length || 0;
  const confirmedCount = meetings?.filter(m => m.status === "CONFIRMED").length || 0;
  const completedCount = meetings?.filter(m => m.status === "COMPLETED").length || 0;
  const remindersSentCount = meetings?.filter(m => m.reminder24hSent || m.reminder1hSent).length || 0;

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCalendarConfig(configForm);
    setShowConfigModal(false);
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingForm.clientName || !newMeetingForm.clientEmail || !newMeetingForm.startTime) {
      showToast("Please fill in required attendee details.");
      return;
    }

    const startDate = new Date(newMeetingForm.startTime);
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    await saveMeeting({
      clientName: newMeetingForm.clientName,
      clientEmail: newMeetingForm.clientEmail,
      clientCompany: newMeetingForm.clientCompany || undefined,
      clientPhone: newMeetingForm.clientPhone || undefined,
      topic: newMeetingForm.topic,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      meetingUrl: newMeetingForm.meetingUrl,
      notes: newMeetingForm.notes,
      provider: "DIRECT",
      status: "CONFIRMED",
      reminder24hSent: false,
      reminder1hSent: false
    });

    setShowNewMeetingModal(false);
    setNewMeetingForm({
      clientName: "",
      clientEmail: "",
      clientCompany: "",
      clientPhone: "",
      topic: "Marketplace Operations Strategy",
      startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      meetingUrl: "https://meet.google.com/gls-exec-demo",
      notes: ""
    });
  };

  const handleSendReminder = async (m: MeetingItem) => {
    setSendingReminderId(m.id);
    await sendMeetingReminder(m.id, "manual");
    setSendingReminderId(null);
  };

  const exportCSV = () => {
    const headers = "ID,Client Name,Company,Email,Phone,Topic,Start Time,End Time,Status,Provider,24h Reminder,1h Reminder,Meeting URL\n";
    const rows = filtered.map(m => {
      return `"${m.id}","${(m.clientName || "").replace(/"/g, '""')}","${(m.clientCompany || "").replace(/"/g, '""')}","${m.clientEmail || ""}","${m.clientPhone || ""}","${(m.topic || "").replace(/"/g, '""')}","${m.startTime || ""}","${m.endTime || ""}","${m.status}","${m.provider}","${m.reminder24hSent ? "Yes" : "No"}","${m.reminder1hSent ? "Yes" : "No"}","${m.meetingUrl || ""}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goodlife-calendar-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast("Meeting bookings exported to CSV successfully!");
  };

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return "Not set";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (_) {
      return isoString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return { bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0", label: "Confirmed" };
      case "COMPLETED":
        return { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", label: "Completed" };
      case "CANCELLED":
        return { bg: "#FEE2E2", color: "#B91C1C", border: "#FECDD3", label: "Cancelled" };
      default:
        return { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0", label: status };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "3rem" }}>
      
      {/* ── TOP HEADER BAR ── */}
      <div style={{
        background: "#FFFFFF",
        padding: "1.25rem 1.5rem",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.25rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <CalendarIcon size={22} color="#2563EB" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              Meeting &amp; Calendar Booking Workflow
            </h2>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
            Automated calendar scheduling, client reminder triggers (24h / 1h), and video conference routing.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              setConfigForm({
                provider: calendarConfig?.provider || "DIRECT",
                bookingUrl: calendarConfig?.bookingUrl || "https://calendly.com/goodlifesutra/strategy-session",
                embedType: calendarConfig?.embedType || "INLINE",
                remindersEnabled: calendarConfig?.remindersEnabled ?? true,
                reminder24h: calendarConfig?.reminder24h ?? true,
                reminder1h: calendarConfig?.reminder1h ?? true,
                notificationEmail: calendarConfig?.notificationEmail || "leads@goodlifesutra.com"
              });
              setShowConfigModal(true);
            }}
            style={{
              fontSize: "0.84rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.1rem",
              borderRadius: "8px",
              background: "#F8FAFC",
              border: "1.5px solid #CBD5E1",
              color: "#334155",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            <SettingsIcon size={16} color="#475569" />
            <span>Calendar Provider Setup</span>
          </button>

          <button
            onClick={() => setShowNewMeetingModal(true)}
            style={{
              fontSize: "0.84rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.15rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)"
            }}
          >
            <CalendarIcon size={16} color="#FFFFFF" />
            <span>+ Schedule Direct Call</span>
          </button>

          <button
            onClick={exportCSV}
            style={{
              fontSize: "0.84rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.1rem",
              borderRadius: "8px",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              color: "#475569",
              fontWeight: 700,
              cursor: "pointer"
            }}
            title="Download verified meetings formatted for Microsoft Excel"
          >
            <DownloadIcon size={16} color="#475569" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── REAL METRICS BAR ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Bookings</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0F172A", marginTop: "0.25rem" }}>{totalMeetings}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Live database meetings</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>Confirmed Upcoming</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#16A34A", marginTop: "0.25rem" }}>{confirmedCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Scheduled strategy discussions</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>Completed Sessions</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#2563EB", marginTop: "0.25rem" }}>{completedCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>Executed consultations</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>Reminders Dispatched</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#7C3AED", marginTop: "0.25rem" }}>{remindersSentCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.15rem" }}>24h / 1h automated alerts</div>
        </div>
      </div>

      {/* ── ACTIVE CALENDAR PROVIDER STRIP ── */}
      <div style={{
        background: "linear-gradient(135deg, #0B1736 0%, #172554 100%)",
        borderRadius: "14px",
        padding: "1rem 1.5rem",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "rgba(37,99,235,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(147,197,253,0.3)"
          }}>
            <CalendarIcon size={20} color="#93C5FD" />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#93C5FD", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Active Calendar Architecture • Scope #9
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, marginTop: "2px" }}>
              Provider: <span style={{ color: "#60A5FA" }}>{calendarConfig?.provider || "DIRECT (Ad-Blocker Proof Dual Mode)"}</span>
              {" • "}
              Reminders: <span style={{ color: calendarConfig?.remindersEnabled ? "#4ADE80" : "#F87171" }}>{calendarConfig?.remindersEnabled ? "Active (24h & 1h Cron)" : "Disabled"}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
            Alerts routed to: <strong style={{ color: "#E2E8F0" }}>{calendarConfig?.notificationEmail || "leads@goodlifesutra.com"}</strong>
          </div>
          <button
            onClick={() => setShowConfigModal(true)}
            style={{
              height: "36px",
              padding: "0 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Configure
          </button>
        </div>
      </div>

      {/* ── FILTER & SEARCH STRIP ── */}
      <div style={{
        background: "#FFFFFF",
        padding: "0.9rem 1.25rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", flex: 1 }}>
          <div style={{ position: "relative", minWidth: "300px" }}>
            <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by client name, company, email, phone, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                paddingLeft: "2.3rem",
                paddingRight: "1rem",
                borderRadius: "8px",
                border: "1.5px solid #CBD5E1",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
          </div>

          {/* Status Filter Pills */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {[
              { id: "ALL", label: "All Statuses" },
              { id: "CONFIRMED", label: "Confirmed" },
              { id: "COMPLETED", label: "Completed" },
              { id: "CANCELLED", label: "Cancelled" }
            ].map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setStatusFilter(pill.id)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  border: statusFilter === pill.id ? "1px solid #2563EB" : "1px solid #E2E8F0",
                  background: statusFilter === pill.id ? "#EFF6FF" : "#FFFFFF",
                  color: statusFilter === pill.id ? "#1D4ED8" : "#475569",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Provider Filter Pills */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginLeft: "0.5rem" }}>
            {[
              { id: "ALL", label: "All Providers" },
              { id: "DIRECT", label: "Direct Slot" },
              { id: "CALENDLY", label: "Calendly" },
              { id: "GOOGLE", label: "Google Cal" }
            ].map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setProviderFilter(pill.id)}
                style={{
                  padding: "0.4rem 0.65rem",
                  borderRadius: "6px",
                  border: providerFilter === pill.id ? "1px solid #7C3AED" : "1px solid #E2E8F0",
                  background: providerFilter === pill.id ? "#F5F3FF" : "#FFFFFF",
                  color: providerFilter === pill.id ? "#7C3AED" : "#64748B",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MEETINGS TABLE ── */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        overflow: "hidden"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0", color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px" }}>
                <th style={{ padding: "0.9rem 1.25rem" }}>Date &amp; Time</th>
                <th style={{ padding: "0.9rem 1.25rem" }}>Attendee / Organization</th>
                <th style={{ padding: "0.9rem 1.25rem" }}>Scope / Topic</th>
                <th style={{ padding: "0.9rem 1.25rem" }}>Provider</th>
                <th style={{ padding: "0.9rem 1.25rem" }}>Reminders</th>
                <th style={{ padding: "0.9rem 1.25rem" }}>Status</th>
                <th style={{ padding: "0.9rem 1.25rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "3.5rem 1rem", color: "#64748B" }}>
                    <CalendarIcon size={36} color="#CBD5E1" style={{ margin: "0 auto 0.75rem" }} />
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>No meetings match your criteria</div>
                    <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>Try adjusting search terms or status filters.</div>
                  </td>
                </tr>
              ) : (
                filtered.map((m) => {
                  const sBadge = getStatusBadge(m.status);
                  return (
                    <tr
                      key={m.id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        transition: "background 0.15s ease"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      {/* Date & Time */}
                      <td style={{ padding: "0.9rem 1.25rem", whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: 800, color: "#0F172A" }}>
                          {formatDateTime(m.startTime)}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "2px" }}>
                          Booked {formatDateTime(m.createdAt)}
                        </div>
                      </td>

                      {/* Attendee */}
                      <td style={{ padding: "0.9rem 1.25rem" }}>
                        <div style={{ fontWeight: 800, color: "#0B1736" }}>{m.clientName}</div>
                        {m.clientCompany && (
                          <div style={{ fontSize: "0.76rem", color: "#2563EB", fontWeight: 700 }}>
                            {m.clientCompany}
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "3px", fontSize: "0.75rem", color: "#64748B" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <MailIcon size={12} color="#94A3B8" />
                            {m.clientEmail}
                          </span>
                          {m.clientPhone && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                              <PhoneIcon size={12} color="#94A3B8" />
                              {m.clientPhone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Topic */}
                      <td style={{ padding: "0.9rem 1.25rem" }}>
                        <div style={{ fontWeight: 600, color: "#334155" }}>
                          {m.topic || "Solution Architecture Discussion"}
                        </div>
                        {m.meetingUrl && (
                          <a
                            href={m.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              fontSize: "0.72rem",
                              color: "#2563EB",
                              fontWeight: 700,
                              textDecoration: "none",
                              marginTop: "3px"
                            }}
                          >
                            <span>Video Room Link</span>
                            <ExternalLinkIcon size={10} color="#2563EB" />
                          </a>
                        )}
                      </td>

                      {/* Provider */}
                      <td style={{ padding: "0.9rem 1.25rem" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "6px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          background: m.provider === "DIRECT" ? "#EFF6FF" : "#F5F3FF",
                          color: m.provider === "DIRECT" ? "#1D4ED8" : "#6D28D9",
                          border: m.provider === "DIRECT" ? "1px solid #BFDBFE" : "1px solid #DDD6FE"
                        }}>
                          {m.provider}
                        </span>
                      </td>

                      {/* Reminders Status */}
                      <td style={{ padding: "0.9rem 1.25rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: m.reminder24hSent ? "#16A34A" : "#94A3B8"
                          }}>
                            <span>24h:</span> {m.reminder24hSent ? "✓ Sent" : "Pending"}
                          </span>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: m.reminder1hSent ? "#16A34A" : "#94A3B8"
                          }}>
                            <span>1h:</span> {m.reminder1hSent ? "✓ Sent" : "Pending"}
                          </span>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td style={{ padding: "0.9rem 1.25rem" }}>
                        <select
                          value={m.status}
                          onChange={(e) => updateMeetingStatus(m.id, e.target.value as any)}
                          style={{
                            padding: "0.3rem 0.6rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            background: sBadge.bg,
                            color: sBadge.color,
                            border: `1px solid ${sBadge.border}`,
                            outline: "none",
                            cursor: "pointer"
                          }}
                        >
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "0.9rem 1.25rem", textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                          <button
                            onClick={() => handleSendReminder(m)}
                            disabled={sendingReminderId === m.id}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "6px",
                              background: "#F1F5F9",
                              border: "1px solid #CBD5E1",
                              color: "#334155",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              cursor: sendingReminderId === m.id ? "not-allowed" : "pointer"
                            }}
                            title="Dispatches instant confirmation & ICS calendar invitation to client email"
                          >
                            {sendingReminderId === m.id ? "Sending..." : "🔔 Remind"}
                          </button>

                          <button
                            onClick={() => setSelectedMeeting(m)}
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "6px",
                              background: "#FFFFFF",
                              border: "1px solid #CBD5E1",
                              color: "#475569",
                              cursor: "pointer"
                            }}
                            title="View Full Booking Details"
                          >
                            <EyeIcon size={14} color="#475569" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(m.id)}
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "6px",
                              background: "#FFF1F2",
                              border: "1px solid #FECDD3",
                              color: "#E11D48",
                              cursor: "pointer"
                            }}
                            title="Delete Meeting Record"
                          >
                            <TrashIcon size={14} color="#E11D48" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODAL: CALENDAR PROVIDER CONFIGURATION ── */}
      {showConfigModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(11,23,54,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "1.25rem 1.5rem",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <SettingsIcon size={18} color="#2563EB" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Calendar Tool Integration (Scope #9)
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748B" }}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Provider Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.35rem" }}>
                  Selected Calendar Tool
                </label>
                <select
                  value={configForm.provider}
                  onChange={(e) => setConfigForm({ ...configForm, provider: e.target.value })}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 0.85rem",
                    borderRadius: "8px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "0.88rem",
                    color: "#0F172A",
                    outline: "none"
                  }}
                >
                  <option value="DIRECT">DIRECT: Ad-Blocker Proof Native Slots (Recommended)</option>
                  <option value="CALENDLY">CALENDLY: Calendly Embed + Direct Fallback</option>
                  <option value="GOOGLE">GOOGLE: Google Calendar Appointment Schedule</option>
                  <option value="CAL_COM">CAL_COM: Cal.com Open Scheduling</option>
                </select>
                <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.3rem" }}>
                  Direct mode allows attendees to pick slots directly without third-party ad-blockers preventing booking.
                </div>
              </div>

              {/* Booking URL */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.35rem" }}>
                  Client Tool Calendar / Embed URL
                </label>
                <input
                  type="url"
                  placeholder="https://calendly.com/your-org/30min"
                  value={configForm.bookingUrl}
                  onChange={(e) => setConfigForm({ ...configForm, bookingUrl: e.target.value })}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 0.85rem",
                    borderRadius: "8px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "0.88rem",
                    color: "#0F172A",
                    outline: "none"
                  }}
                />
              </div>

              {/* Notification Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.35rem" }}>
                  Team Alert Recipient Email
                </label>
                <input
                  type="email"
                  required
                  value={configForm.notificationEmail}
                  onChange={(e) => setConfigForm({ ...configForm, notificationEmail: e.target.value })}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 0.85rem",
                    borderRadius: "8px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "0.88rem",
                    color: "#0F172A",
                    outline: "none"
                  }}
                />
                <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.3rem" }}>
                  Receives automated meeting notifications whenever a client schedules a call.
                </div>
              </div>

              {/* Automated Reminder Toggles */}
              <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                  Automated Reminder Workflow Settings
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#334155", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={configForm.remindersEnabled}
                      onChange={(e) => setConfigForm({ ...configForm, remindersEnabled: e.target.checked })}
                    />
                    <span style={{ fontWeight: 700 }}>Enable Automated Background Reminder Engine</span>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#334155", cursor: "pointer", marginLeft: "1.5rem" }}>
                    <input
                      type="checkbox"
                      checked={configForm.reminder24h}
                      disabled={!configForm.remindersEnabled}
                      onChange={(e) => setConfigForm({ ...configForm, reminder24h: e.target.checked })}
                    />
                    <span>Dispatch 24-Hour Pre-Meeting Reminder Email</span>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#334155", cursor: "pointer", marginLeft: "1.5rem" }}>
                    <input
                      type="checkbox"
                      checked={configForm.reminder1h}
                      disabled={!configForm.remindersEnabled}
                      onChange={(e) => setConfigForm({ ...configForm, reminder1h: e.target.checked })}
                    />
                    <span>Dispatch 1-Hour Pre-Meeting Urgent Reminder Email</span>
                  </label>
                </div>
              </div>

              {/* Webhook URL Display */}
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", padding: "0.85rem", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#1E40AF", textTransform: "uppercase" }}>
                  Webhook Sync Endpoint (Calendly &amp; Google)
                </div>
                <div style={{ fontSize: "0.8rem", color: "#1D4ED8", fontFamily: "monospace", marginTop: "0.2rem", wordBreak: "break-all" }}>
                  POST http://localhost:5000/api/v1/meetings/webhook
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "8px",
                    background: "#F1F5F9",
                    border: "1px solid #CBD5E1",
                    color: "#475569",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: "8px",
                    background: "#2563EB",
                    border: "none",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: SCHEDULE DIRECT MEETING ── */}
      {showNewMeetingModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(11,23,54,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            maxWidth: "560px",
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "1.25rem 1.5rem",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <CalendarIcon size={18} color="#2563EB" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Schedule Direct Executive Session
                </h3>
              </div>
              <button
                onClick={() => setShowNewMeetingModal(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748B" }}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={newMeetingForm.clientName}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, clientName: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Appliances"
                    value={newMeetingForm.clientCompany}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, clientCompany: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@apex.com"
                    value={newMeetingForm.clientEmail}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, clientEmail: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Client Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newMeetingForm.clientPhone}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, clientPhone: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Start Date &amp; Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newMeetingForm.startTime}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, startTime: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newMeetingForm.topic}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, topic: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  Video Conference Join URL
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/xyz-abcd-efg"
                  value={newMeetingForm.meetingUrl}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, meetingUrl: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                  Internal Operator Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Discussion context, current marketplace problems..."
                  value={newMeetingForm.notes}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, notes: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: "8px", border: "1.5px solid #CBD5E1", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowNewMeetingModal(false)}
                  style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", background: "#F1F5F9", border: "1px solid #CBD5E1", color: "#475569", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.6rem 1.5rem", borderRadius: "8px", background: "#2563EB", border: "none", color: "#FFFFFF", fontWeight: 700, cursor: "pointer" }}
                >
                  Confirm &amp; Dispatch Invites
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: VIEW MEETING DETAILS ── */}
      {selectedMeeting && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(11,23,54,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            maxWidth: "520px",
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "1.25rem 1.5rem",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Meeting Booking Dossier
              </h3>
              <button
                onClick={() => setSelectedMeeting(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748B" }}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Scheduled Time</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>
                  {formatDateTime(selectedMeeting.startTime)}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Client Name</div>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{selectedMeeting.clientName}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Organization</div>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{selectedMeeting.clientCompany || "Not specified"}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Email</div>
                  <div style={{ fontWeight: 700, color: "#2563EB", marginTop: "2px" }}>{selectedMeeting.clientEmail}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Phone / WhatsApp</div>
                  <div style={{ fontWeight: 700, color: "#0F172A", marginTop: "2px" }}>{selectedMeeting.clientPhone || "Not provided"}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Discussion Scope</div>
                <div style={{ fontWeight: 700, color: "#0F172A", marginTop: "2px" }}>{selectedMeeting.topic || "Marketplace Operations Strategy"}</div>
              </div>

              {selectedMeeting.notes && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Notes</div>
                  <div style={{ fontSize: "0.85rem", color: "#334155", background: "#F1F5F9", padding: "0.6rem 0.8rem", borderRadius: "6px", marginTop: "3px" }}>
                    {selectedMeeting.notes}
                  </div>
                </div>
              )}

              {selectedMeeting.meetingUrl && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Video Conference Room</div>
                  <a
                    href={selectedMeeting.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2563EB", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none", wordBreak: "break-all" }}
                  >
                    {selectedMeeting.meetingUrl}
                  </a>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setSelectedMeeting(null)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "8px",
                    background: "#F1F5F9",
                    border: "1px solid #CBD5E1",
                    color: "#475569",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(11,23,54,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            maxWidth: "400px",
            width: "100%",
            padding: "1.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#FEE2E2",
              color: "#DC2626",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem"
            }}>
              <TrashIcon size={24} color="#DC2626" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem" }}>
              Delete Meeting Booking?
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
              This will remove the calendar appointment from the database. Any automated reminders scheduled for this session will be cancelled.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  background: "#F1F5F9",
                  border: "1px solid #CBD5E1",
                  color: "#475569",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMeeting(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  background: "#DC2626",
                  border: "none",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
