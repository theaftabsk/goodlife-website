"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminData, AuthorItem } from "@/context/AdminDataContext";
import {
  UserIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  CloseIcon,
  MailIcon,
  ShieldCheckIcon,
  KeyIcon,
  LockIcon,
  HistoryIcon,
  CheckIcon,
  RefreshIcon,
  ExternalLinkIcon
} from "@/components/Icons";

const AVATAR_PRESETS = [
  { label: "Male Executive (Navy)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
  { label: "Female Executive (Formal)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" },
  { label: "Male Specialist (Glasses)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
  { label: "Operations Leader", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" },
  { label: "Strategic Analyst", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" }
];

export default function AuthorsPage() {
  const {
    authors,
    saveAuthor,
    deleteAuthor,
    toggleAuthorStatus,
    currentUser,
    loginUser,
    switchUser,
    logoutUser,
    auditLogs,
    showToast
  } = useAdminData();

  // Tab State
  const [activeTab, setActiveTab] = useState<"profiles" | "matrix" | "audit">("profiles");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [auditSearch, setAuditSearch] = useState("");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Password Visibility toggles per card
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    roleType: "Author & Editor" as AuthorItem["roleType"],
    bio: "",
    email: "",
    password: "",
    avatar: AVATAR_PRESETS[0].url,
    linkedin: "",
    status: "Active" as "Active" | "Inactive"
  });

  // Login Form State for Modal / Gate
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Clearance Gate Check: ONLY Super Admin can view /admin/authors
  const isSuperAdmin = currentUser?.roleType === "Super Admin";

  // Form Handlers
  const openAddModal = () => {
    setEditingAuthor(null);
    setFormData({
      name: "",
      role: "",
      roleType: "Author & Editor",
      bio: "",
      email: "",
      password: "author_pass_2026",
      avatar: AVATAR_PRESETS[0].url,
      linkedin: "",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (a: AuthorItem) => {
    setEditingAuthor(a);
    setFormData({
      name: a.name,
      role: a.role,
      roleType: a.roleType || "Author & Editor",
      bio: a.bio,
      email: a.email,
      password: a.password || "author_pass_2026",
      avatar: a.avatar || AVATAR_PRESETS[0].url,
      linkedin: a.linkedin || "",
      status: a.status || "Active"
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    saveAuthor({
      name: formData.name.trim(),
      role: formData.role.trim() || "Commerce Specialist",
      roleType: formData.roleType,
      bio: formData.bio.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      avatar: formData.avatar,
      linkedin: formData.linkedin.trim(),
      status: formData.status
    }, editingAuthor?.id);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteAuthor(deleteId);
      setDeleteId(null);
    }
  };

  const toggleShowPassword = (id: string) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginUser(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.message || "Authentication failed");
    } else {
      setIsLoginModalOpen(false);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const quickSwitchToSuperAdmin = () => {
    const superAdmin = authors.find(a => a.roleType === "Super Admin");
    if (superAdmin) {
      switchUser(superAdmin.id);
      setLoginError(null);
    } else {
      showToast("No Super Admin profile found in system.");
    }
  };

  // Filtered Authors
  const filteredAuthors = authors.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || a.roleType === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered Audit Logs
  const filteredLogs = auditLogs.filter(log =>
    log.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
    (log.details && log.details.toLowerCase().includes(auditSearch.toLowerCase()))
  );

  const superAdminCount = authors.filter(a => a.roleType === "Super Admin").length;
  const activeCount = authors.filter(a => a.status === "Active").length;

  // -------------------------------------------------------------
  // ACCESS GATE: If current user is NOT Super Admin
  // -------------------------------------------------------------
  if (!isSuperAdmin) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "1100px", margin: "0 auto", paddingBottom: "3rem" }}>
        
        {/* Clearance Denied Alert Box */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #FCA5A5",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.08)"
        }}>
          {/* Top Warning Banner */}
          <div style={{
            background: "#FEF2F2",
            borderBottom: "1px solid #FEE2E2",
            padding: "0.85rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <LockIcon size={16} color="#DC2626" />
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#991B1B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Security Clearance Restriction Level 1 · Super Admin Only
            </span>
          </div>

          <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#FEE2E2",
                border: "1px solid #FCA5A5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <LockIcon size={28} color="#DC2626" />
              </div>
              <div>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A", margin: "0 0 0.4rem 0" }}>
                  Super Admin Clearance Required
                </h2>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0, maxWidth: "780px" }}>
                  The <strong>Author &amp; Team Credential Management</strong> module is strictly restricted to verified <strong>Super Administrators</strong>. It stores decrypted employee passwords, role permission overrides, and security audit logs.
                </p>
              </div>
            </div>

            {/* Current Session Context */}
            <div style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "1.1rem 1.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <img
                  src={currentUser?.avatar || AVATAR_PRESETS[0].url}
                  alt={currentUser?.name || "Active User"}
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #CBD5E1" }}
                />
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>
                    {currentUser?.name || "Anonymous Guest"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.15rem" }}>
                    <span style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "0.15rem 0.55rem",
                      borderRadius: "6px",
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      border: "1px solid #BFDBFE"
                    }}>
                      {currentUser?.roleType || "Author & Editor"}
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "#64748B" }}>
                      {currentUser?.email || "guest@goodlifesutra.com"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                padding: "0.45rem 0.9rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#991B1B"
              }}>
                Clearance: Content CMS Only (Access Denied)
              </div>
            </div>

            {/* Inline Super Admin Unlock Box */}
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.35rem 0" }}>
                Authenticate with Super Admin Credentials
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1.25rem 0" }}>
                If you hold administrative credentials, enter your Super Admin Login ID and password below to unlock this security enclave.
              </p>

              {loginError && (
                <div style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#B91C1C",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: "1rem"
                }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", alignItems: "flex-end" }}>
                <div>
                  <label className="label-text" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem", display: "block" }}>
                    Super Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajeev.nair@goodlifesutra.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="input-control"
                    style={{ width: "100%", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label className="label-text" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem", display: "block" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="input-control"
                    style={{ width: "100%", fontSize: "0.85rem", fontFamily: "monospace" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: "0.65rem 1.25rem", whiteSpace: "nowrap" }}
                  >
                    <ShieldCheckIcon size={16} color="#FFFFFF" />
                    <span>Verify &amp; Unlock</span>
                  </button>

                  <button
                    type="button"
                    onClick={quickSwitchToSuperAdmin}
                    style={{
                      padding: "0.65rem 1rem",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      background: "#F8FAFC",
                      color: "#1E293B",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                    title="One-click switch to default Super Admin profile"
                  >
                    Quick Unlock (Rajeev Nair)
                  </button>
                </div>
              </form>
            </div>

            {/* Alternative Actions */}
            <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
              <Link
                href="/admin"
                style={{
                  textDecoration: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#475569",
                  fontSize: "0.82rem",
                  fontWeight: 700
                }}
              >
                ← Return to Executive Dashboard
              </Link>
              <Link
                href="/admin/insights"
                style={{
                  textDecoration: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid #BFDBFE",
                  background: "#EFF6FF",
                  color: "#1D4ED8",
                  fontSize: "0.82rem",
                  fontWeight: 700
                }}
              >
                Go to Insights CMS →
              </Link>
            </div>

          </div>
        </div>

        {/* Informational 3-Tier Permission Matrix for reference */}
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.3rem" }}>
            System Role &amp; Permission Structure
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1rem" }}>
            Clear division of responsibilities across GoodLife Sutra administration modules.
          </p>
          <RoleMatrixView />
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // SUPER ADMIN VERIFIED VIEW: Full Access
  // -------------------------------------------------------------
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Top Header with Active Super Admin Capsule */}
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
            <ShieldCheckIcon size={20} color="#2563EB" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              Author &amp; Team Credential Management
            </h2>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
            Super Admin Clearance Verified · Manage team login credentials, enforce 3-tier permissions, and monitor the live audit trail.
          </p>
        </div>

        {/* Right Header Capsule: Active Session + Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          
          {/* Active Session Pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.4rem 0.85rem",
            borderRadius: "10px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0"
          }}>
            <img
              src={currentUser?.avatar || AVATAR_PRESETS[0].url}
              alt={currentUser?.name || "Admin"}
              style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid #2563EB" }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                {currentUser?.name || "Rajeev Nair"}
              </div>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#D97706" }}>
                Super Admin (Clearance Active)
              </div>
            </div>
          </div>

          {/* Test Login Button */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.55rem 0.95rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              background: "#FFFFFF",
              color: "#334155",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
            title="Authenticate as different author or test invalid logins"
          >
            <KeyIcon size={15} color="#475569" />
            <span>Author Login Portal</span>
          </button>

          {/* Add Author Profile */}
          <button
            onClick={openAddModal}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
          >
            <PlusIcon size={16} color="#FFFFFF" />
            <span>Add Author Profile</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar (4 Crisp Stat Cards) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Team Accounts</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0F172A", marginTop: "0.25rem" }}>{authors.length}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Provisioned credentials</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active Logins</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#16A34A", marginTop: "0.25rem" }}>{activeCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Enabled credentials</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.05em" }}>Super Admins</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#D97706", marginTop: "0.25rem" }}>{superAdminCount}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Unrestricted clearance</div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "1.1rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>Audit Trail Events</div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#2563EB", marginTop: "0.25rem" }}>{auditLogs.length}</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.15rem" }}>Security &amp; CMS events</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("profiles")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "profiles" ? "#2563EB" : "transparent",
            color: activeTab === "profiles" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <UserIcon size={16} color={activeTab === "profiles" ? "#FFFFFF" : "#64748B"} />
          <span>Author &amp; Team Profiles ({authors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("matrix")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "matrix" ? "#2563EB" : "transparent",
            color: activeTab === "matrix" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <ShieldCheckIcon size={16} color={activeTab === "matrix" ? "#FFFFFF" : "#64748B"} />
          <span>3-Tier Role &amp; Permission Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          style={{
            padding: "0.65rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "audit" ? "#2563EB" : "transparent",
            color: activeTab === "audit" ? "#FFFFFF" : "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <HistoryIcon size={16} color={activeTab === "audit" ? "#FFFFFF" : "#64748B"} />
          <span>Activity Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: PROFILES VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "profiles" && (
        <>
          {/* Search & Role Filter Bar */}
          <div style={{
            background: "#FFFFFF",
            padding: "0.85rem 1.25rem",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", flex: 1 }}>
              <div style={{ position: "relative", minWidth: "280px" }}>
                <SearchIcon size={16} color="#94A3B8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search by name, role, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-control"
                  style={{ paddingLeft: "2.4rem", width: "100%", fontSize: "0.85rem" }}
                />
              </div>

              {/* Role Type Filter Pill Switcher */}
              <div style={{ display: "flex", gap: "0.35rem" }}>
                {["ALL", "Super Admin", "Author & Editor", "Content Specialist"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoleFilter(r)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "6px",
                      border: roleFilter === r ? "1px solid #2563EB" : "1px solid #E2E8F0",
                      background: roleFilter === r ? "#EFF6FF" : "#FFFFFF",
                      color: roleFilter === r ? "#1D4ED8" : "#475569",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
              Showing {filteredAuthors.length} of {authors.length} accounts
            </span>
          </div>

          {/* Authors Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "1.25rem"
          }}>
            {filteredAuthors.map((author) => {
              const isPasswordVisible = !!showPasswordMap[author.id];
              const isCurrentSession = currentUser?.id === author.id;

              return (
                <div
                  key={author.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: isCurrentSession ? "2px solid #2563EB" : "1px solid #E2E8F0",
                    padding: "1.35rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: isCurrentSession ? "0 4px 14px rgba(37,99,235,0.12)" : "0 2px 6px rgba(0,0,0,0.02)",
                    position: "relative"
                  }}
                >
                  <div>
                    {/* Header: Photo, Name, Role & Status */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <img
                          src={author.avatar || AVATAR_PRESETS[0].url}
                          alt={author.name}
                          style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: author.roleType === "Super Admin" ? "2px solid #F59E0B" : "2px solid #BFDBFE",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                          }}
                        />
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                              {author.name}
                            </h4>
                          </div>
                          <div style={{ fontSize: "0.76rem", color: "#2563EB", fontWeight: 700, marginTop: "0.15rem" }}>
                            {author.role}
                          </div>
                        </div>
                      </div>

                      {/* Status Toggle Badge */}
                      <button
                        type="button"
                        onClick={() => toggleAuthorStatus(author.id)}
                        style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
                        title="Click to toggle Active / Inactive"
                      >
                        <span className={author.status === "Active" ? "badge badge-green" : "badge badge-slate"}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: author.status === "Active" ? "#10B981" : "#94A3B8" }} />
                          <span>{author.status || "Active"}</span>
                        </span>
                      </button>
                    </div>

                    {/* Role Type Pill & Articles Count */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.85rem" }}>
                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        background: author.roleType === "Super Admin" ? "#FEF3C7" : author.roleType === "Content Specialist" ? "#F3E8FF" : "#EFF6FF",
                        color: author.roleType === "Super Admin" ? "#B45309" : author.roleType === "Content Specialist" ? "#7E22CE" : "#1D4ED8",
                        border: author.roleType === "Super Admin" ? "1px solid #FDE68A" : author.roleType === "Content Specialist" ? "1px solid #E9D5FF" : "1px solid #BFDBFE"
                      }}>
                        {author.roleType || "Author & Editor"}
                      </span>

                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px",
                        background: "#F1F5F9",
                        color: "#475569",
                        border: "1px solid #E2E8F0"
                      }}>
                        {author.articlesCount || 0} Articles
                      </span>

                      {isCurrentSession && (
                        <span style={{
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          padding: "0.2rem 0.55rem",
                          borderRadius: "6px",
                          background: "#ECFDF5",
                          color: "#059669",
                          border: "1px solid #A7F3D0",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem"
                        }}>
                          <CheckIcon size={12} color="#059669" />
                          <span>Active Session</span>
                        </span>
                      )}
                    </div>

                    {/* Bio Snippet */}
                    <p style={{
                      fontSize: "0.8rem",
                      color: "#475569",
                      lineHeight: 1.5,
                      marginBottom: "0.9rem",
                      minHeight: "42px"
                    }}>
                      {author.bio || "No biography details specified."}
                    </p>

                    {/* Credentials Info Box */}
                    <div style={{
                      background: "#F8FAFC",
                      padding: "0.75rem 0.9rem",
                      borderRadius: "10px",
                      border: "1px solid #E2E8F0",
                      marginBottom: "0.9rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.76rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#334155" }}>
                          <MailIcon size={14} color="#64748B" />
                          <span style={{ fontWeight: 600 }}>Login ID:</span>
                          <span style={{ fontFamily: "monospace", color: "#2563EB", fontWeight: 700 }}>{author.email}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.76rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#334155" }}>
                          <KeyIcon size={14} color="#64748B" />
                          <span style={{ fontWeight: 600 }}>Password:</span>
                          <span style={{ fontFamily: "monospace", color: "#0F172A", fontWeight: 700 }}>
                            {isPasswordVisible ? (author.password || "author_pass_2026") : "••••••••••••"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleShowPassword(author.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#2563EB",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            padding: 0
                          }}
                        >
                          {isPasswordVisible ? "Hide" : "Show"}
                        </button>
                      </div>

                      <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.15rem" }}>
                        Last authenticated: {author.lastLogin || "Never"}
                      </div>
                    </div>

                    {/* Active Session Switcher Button */}
                    <div style={{ marginBottom: "0.85rem" }}>
                      {isCurrentSession ? (
                        <div style={{
                          padding: "0.45rem 0.8rem",
                          borderRadius: "8px",
                          background: "#ECFDF5",
                          border: "1px solid #A7F3D0",
                          color: "#065F46",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textAlign: "center"
                        }}>
                          Currently Logged In as this User
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => switchUser(author.id)}
                          style={{
                            width: "100%",
                            padding: "0.5rem 0.85rem",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            background: "#FFFFFF",
                            color: "#1E293B",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                            transition: "all 0.15s ease"
                          }}
                        >
                          <RefreshIcon size={13} color="#2563EB" />
                          <span>Switch Session to this Author</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Profile Link & Action Controls */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: "0.85rem"
                  }}>
                    {author.linkedin ? (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "0.74rem", fontWeight: 700, color: "#0A66C2", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        <span>LinkedIn</span>
                        <ExternalLinkIcon size={11} color="#0A66C2" />
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Internal profile</span>
                    )}

                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => openEditModal(author)}
                        className="btn-icon"
                        title="Edit Author Profile & Password"
                      >
                        <EditIcon size={15} color="#475569" />
                      </button>
                      <button
                        onClick={() => setDeleteId(author.id)}
                        className="btn-icon"
                        title="Delete Profile"
                        disabled={author.roleType === "Super Admin" && superAdminCount <= 1}
                      >
                        <TrashIcon size={15} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: 3-TIER ROLE & PERMISSION MATRIX */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "matrix" && (
        <RoleMatrixView />
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: AUDIT TRAIL LOGS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "audit" && (
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{
            padding: "1.1rem 1.5rem",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Enterprise Security &amp; Activity Audit Trail
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
                Immutable audit record of user logins, session switches, CMS article compositions, and credential updates.
              </p>
            </div>

            <div style={{ position: "relative", width: "280px" }}>
              <SearchIcon size={15} color="#94A3B8" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Filter audit logs..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="input-control"
                style={{ paddingLeft: "2.2rem", width: "100%", fontSize: "0.82rem" }}
              />
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontWeight: 700 }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>User &amp; Role</th>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Action Event</th>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Target Resource</th>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Details / Note</th>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#94A3B8" }}>
                      No audit events matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <img
                            src={log.userAvatar || AVATAR_PRESETS[0].url}
                            alt={log.userName}
                            style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: "#0F172A" }}>{log.userName}</div>
                            <div style={{ fontSize: "0.72rem", color: "#64748B" }}>{log.userRole}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <span style={{
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                          fontWeight: 800,
                          fontSize: "0.74rem",
                          background: log.action.includes("Logged In") || log.action.includes("Authenticated") ? "#EFF6FF" : log.action.includes("Switched") ? "#FEF3C7" : log.action.includes("Published") ? "#ECFDF5" : log.action.includes("Deleted") ? "#FEF2F2" : "#F8FAFC",
                          color: log.action.includes("Logged In") || log.action.includes("Authenticated") ? "#1D4ED8" : log.action.includes("Switched") ? "#B45309" : log.action.includes("Published") ? "#047857" : log.action.includes("Deleted") ? "#B91C1C" : "#334155",
                          border: "1px solid rgba(0,0,0,0.06)"
                        }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: "0.85rem 1.25rem", fontWeight: 700, color: "#1E293B" }}>
                        {log.target}
                      </td>
                      <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontSize: "0.78rem" }}>
                        {log.details || "—"}
                      </td>
                      <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontFamily: "monospace", fontSize: "0.75rem" }}>
                        {log.timestamp}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: ADD / EDIT AUTHOR PROFILE */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "620px",
            maxHeight: "90vh",
            overflowY: "auto",
            border: "1px solid #E2E8F0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                  {editingAuthor ? "Edit Author & Login Profile" : "Create Author & Login Account"}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0.2rem 0 0 0" }}>
                  Provide author credentials, designation, profile photo, and role permissions.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                <CloseIcon size={20} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              {/* Profile Photo Preset Selector */}
              <div>
                <label className="label-text" style={{ fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem", display: "block" }}>
                  Author Profile Photo *
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "0.85rem" }}>
                  <img
                    src={formData.avatar || AVATAR_PRESETS[0].url}
                    alt="Preview"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #BFDBFE",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      className="input-control"
                      style={{ width: "100%", fontSize: "0.82rem", marginBottom: "0.4rem" }}
                    />
                    <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                      Direct image link or select one of the high-res presets below:
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: preset.url })}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "6px",
                        border: formData.avatar === preset.url ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                        background: formData.avatar === preset.url ? "#EFF6FF" : "#F8FAFC",
                        color: formData.avatar === preset.url ? "#1D4ED8" : "#475569",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Role */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Author Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajeev Nair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label className="label-text">Designation / Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of Marketplace Operations"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">Login Email ID *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@goodlifesutra.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label className="label-text">Login Password *</label>
                  <input
                    type="text"
                    required
                    placeholder="Set author password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-control"
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                </div>
              </div>

              {/* System Clearance Tier & Status */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label-text">System Clearance Tier *</label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                    className="input-control"
                    style={{ width: "100%" }}
                  >
                    <option value="Author & Editor">Tier 2: Author &amp; Editor (Content CMS Access)</option>
                    <option value="Super Admin">Tier 1: Super Admin (Full Security &amp; Credentials Control)</option>
                    <option value="Content Specialist">Tier 3: Content Specialist (Draft Contributor Only)</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Account Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="input-control"
                    style={{ width: "100%" }}
                  >
                    <option value="Active">Active (Login Enabled)</option>
                    <option value="Inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="label-text">Author Biography / Description</label>
                <textarea
                  rows={3}
                  placeholder="Summarize author expertise, previous leadership experience, and specializations..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="input-control"
                  style={{ width: "100%", resize: "vertical" }}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="label-text">LinkedIn Profile Link</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="input-control"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid #E2E8F0" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "0.7rem 1.25rem",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    background: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: "0.7rem 1.5rem" }}
                >
                  {editingAuthor ? "Update Author Profile" : "Save & Create Account"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: AUTHOR LOGIN TEST PORTAL */}
      {/* ------------------------------------------------------------- */}
      {isLoginModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 110,
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "500px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8FAFC"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <KeyIcon size={18} color="#2563EB" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Author Authentication Portal
                </h3>
              </div>
              <button onClick={() => { setIsLoginModalOpen(false); setLoginError(null); }} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                <CloseIcon size={20} color="#64748B" />
              </button>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0 0 1.2rem 0", lineHeight: 1.5 }}>
                Test any author credentials. When you authenticate as an <strong>Author &amp; Editor</strong> or <strong>Content Specialist</strong>, the Authors CMS will immediately gate and verify your permission boundary.
              </p>

              {loginError && (
                <div style={{
                  padding: "0.65rem 0.9rem",
                  borderRadius: "8px",
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#B91C1C",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: "1rem"
                }}>
                  {loginError}
                </div>
              )}

              {/* Quick Preset Fill Buttons */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Quick-Fill Test Accounts:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {authors.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setLoginEmail(a.email);
                        setLoginPassword(a.password || (a.roleType === "Super Admin" ? "gl_admin_2026" : "author_pass_2026"));
                        setLoginError(null);
                      }}
                      style={{
                        padding: "0.45rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: loginEmail === a.email ? "#EFF6FF" : "#F8FAFC",
                        color: "#1E293B",
                        fontSize: "0.76rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "left"
                      }}
                    >
                      <span>{a.name} ({a.roleType})</span>
                      <span style={{ fontSize: "0.7rem", color: "#2563EB", fontFamily: "monospace" }}>Fill →</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label className="label-text">Author Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="author@goodlifesutra.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="input-control"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label className="label-text">Author Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="input-control"
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => { setIsLoginModalOpen(false); setLoginError(null); }}
                    style={{
                      padding: "0.65rem 1.25rem",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      background: "#FFFFFF",
                      color: "#475569",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: "0.65rem 1.5rem" }}
                  >
                    Authenticate Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: DELETE CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      {deleteId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 110,
          padding: "1rem"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            padding: "1.75rem",
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            border: "1px solid #E2E8F0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FEE2E2", color: "#DC2626", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <TrashIcon size={24} color="#DC2626" />
            </div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem 0" }}>
              Delete Author Profile?
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "0 0 1.5rem 0", lineHeight: 1.5 }}>
              This author's login account will be permanently revoked and their assigned credentials removed.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#475569", fontWeight: 700, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "none", background: "#DC2626", color: "#FFFFFF", fontWeight: 800, cursor: "pointer" }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------
// SUBCOMPONENT: 3-TIER ROLE & PERMISSION MATRIX
// -------------------------------------------------------------
function RoleMatrixView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* 3 Tier Cards Side-by-Side */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        
        {/* TIER 1: SUPER ADMIN */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #FDE68A",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.06)"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)",
            padding: "1.1rem 1.25rem",
            borderBottom: "1px solid #FDE68A"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#B45309", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Tier 1 Clearance
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "0.15rem 0.5rem", borderRadius: "6px", background: "#F59E0B", color: "#FFFFFF" }}>
                Unrestricted
              </span>
            </div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#78350F", margin: "0.4rem 0 0.15rem 0" }}>
              Super Administrator
            </h4>
            <div style={{ fontSize: "0.78rem", color: "#92400E" }}>
              Executive Directors &amp; Systems Head (e.g. Rajeev Nair)
            </div>
          </div>

          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
              Authorized Permissions:
            </div>
            {[
              "Authors & Team Credentials Management (/admin/authors)",
              "Plain-text Password Provisioning & Status Override",
              "Immutable System Security & Activity Audit Trail",
              "Direct Publishing & Scheduling Across All Modules",
              "CRM Integration Hub & Zoho / HubSpot Webhooks",
              "Permanent 301 Redirects Engine & Global Settings",
              "Database Schema Synchronization & Backup Trigger"
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.78rem", color: "#1E293B", lineHeight: 1.4 }}>
                <span style={{ color: "#16A34A", fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 2: AUTHOR & EDITOR */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #BFDBFE",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.06)"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
            padding: "1.1rem 1.25rem",
            borderBottom: "1px solid #BFDBFE"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#1D4ED8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Tier 2 Clearance
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "0.15rem 0.5rem", borderRadius: "6px", background: "#2563EB", color: "#FFFFFF" }}>
                Editorial Clearance
              </span>
            </div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1E3A8A", margin: "0.4rem 0 0.15rem 0" }}>
              Author &amp; Editor
            </h4>
            <div style={{ fontSize: "0.78rem", color: "#2563EB" }}>
              Practice Leaders &amp; VPs (e.g. Pooja Verma, Amitava Sen)
            </div>
          </div>

          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
              Authorized Permissions:
            </div>
            {[
              "Publish & Edit Insights / Blogs Articles",
              "Create & Edit Client Case Studies & Metrics Builder",
              "Manage FAQs & Category Classifications",
              "Upload Media Assets & Set SEO Meta Titles",
              "Draft Diagnostic Responses for Prospective Leads"
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.78rem", color: "#1E293B", lineHeight: 1.4 }}>
                <span style={{ color: "#16A34A", fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span>{p}</span>
              </div>
            ))}

            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.4rem", marginBottom: "0.1rem" }}>
              Restricted (Access Blocked):
            </div>
            {[
              "Locked from Authors & Team Credentials (/admin/authors)",
              "Locked from CRM Webhooks & Notification Settings",
              "Cannot modify Super Admin access credentials"
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.76rem", color: "#991B1B", lineHeight: 1.4 }}>
                <span style={{ color: "#DC2626", fontWeight: 900, flexShrink: 0 }}>✗</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 3: CONTENT SPECIALIST / CONTRIBUTOR */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #E9D5FF",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(147, 51, 234, 0.06)"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #FAF5FF 0%, #F8FAFC 100%)",
            padding: "1.1rem 1.25rem",
            borderBottom: "1px solid #E9D5FF"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#7E22CE", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Tier 3 Clearance
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "0.15rem 0.5rem", borderRadius: "6px", background: "#9333EA", color: "#FFFFFF" }}>
                Draft Contributor
              </span>
            </div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#581C87", margin: "0.4rem 0 0.15rem 0" }}>
              Content Specialist
            </h4>
            <div style={{ fontSize: "0.78rem", color: "#7E22CE" }}>
              Research Analysts &amp; Technical Copywriters
            </div>
          </div>

          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
              Authorized Permissions:
            </div>
            {[
              "Compose Draft Insight Articles for Editorial Review",
              "Compose Draft Case Studies & Metric Proposals",
              "Submit Proposed Master FAQ Q&As"
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.78rem", color: "#1E293B", lineHeight: 1.4 }}>
                <span style={{ color: "#16A34A", fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span>{p}</span>
              </div>
            ))}

            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.4rem", marginBottom: "0.1rem" }}>
              Restricted (Access Blocked):
            </div>
            {[
              "Cannot publish directly to live production website",
              "Cannot delete existing published case studies or insights",
              "Locked from Authors & Team Credentials (/admin/authors)",
              "Locked from System, CRM, and Redirection modules"
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.76rem", color: "#991B1B", lineHeight: 1.4 }}>
                <span style={{ color: "#DC2626", fontWeight: 900, flexShrink: 0 }}>✗</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Module-by-Module Permission Comparison Grid */}
      <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.4rem", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Module-by-Module Clearance Matrix
          </h4>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontWeight: 700 }}>
                <th style={{ padding: "0.85rem 1.25rem" }}>CMS Module / Resource</th>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>Super Admin (Tier 1)</th>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>Author &amp; Editor (Tier 2)</th>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>Content Specialist (Tier 3)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { module: "Author & Credentials CMS (/admin/authors)", t1: "Full Access", t2: "Restricted", t3: "Restricted" },
                { module: "Insights & Whitepapers CMS (/admin/insights)", t1: "Publish & Delete", t2: "Publish & Edit", t3: "Drafts Only" },
                { module: "Case Studies Proof Gallery (/admin/casestudies)", t1: "Publish & Delete", t2: "Publish & Edit", t3: "Drafts Only" },
                { module: "Master FAQs Management (/admin/faqs)", t1: "Publish & Delete", t2: "Publish & Edit", t3: "Drafts Only" },
                { module: "CRM Integration Hub (/admin/crm-integration)", t1: "Full Configuration", t2: "Restricted", t3: "Restricted" },
                { module: "301 Redirects Engine (/admin/redirects)", t1: "Full Configuration", t2: "Restricted", t3: "Restricted" },
                { module: "Global Header, Footer & Contact Info", t1: "Full Access", t2: "Restricted", t3: "Restricted" },
                { module: "System Database & Backups", t1: "Full Access", t2: "Restricted", t3: "Restricted" },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.85rem 1.25rem", fontWeight: 700, color: "#1E293B" }}>
                    {row.module}
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>
                    <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#ECFDF5", color: "#065F46", fontWeight: 800, fontSize: "0.74rem" }}>
                      ✓ {row.t1}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>
                    {row.t2 === "Restricted" ? (
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#FEF2F2", color: "#991B1B", fontWeight: 800, fontSize: "0.74rem" }}>
                        ✗ Restricted
                      </span>
                    ) : (
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#EFF6FF", color: "#1D4ED8", fontWeight: 800, fontSize: "0.74rem" }}>
                        ✓ {row.t2}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", textAlign: "center" }}>
                    {row.t3 === "Restricted" ? (
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#FEF2F2", color: "#991B1B", fontWeight: 800, fontSize: "0.74rem" }}>
                        ✗ Restricted
                      </span>
                    ) : (
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#FAF5FF", color: "#7E22CE", fontWeight: 800, fontSize: "0.74rem" }}>
                        ✎ {row.t3}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
