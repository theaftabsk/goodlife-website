"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import {
  UserIcon,
  LockIcon,
  KeyIcon,
  ShieldCheckIcon,
  ShieldLockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LogOutIcon,
  FingerprintIcon,
  ClockIcon,
  EyeIcon,
  EyeOffIcon
} from "@/components/Icons";

export default function ProfileSecurityPage() {
  const {
    credentials,
    updateLoginId,
    updatePassword,
    updateProfile,
    logout
  } = useAuth();
  const { showToast } = useAdminData();

  // Change Login ID Form State
  const [newLoginId, setNewLoginId] = useState("");
  const [verifyPassForId, setVerifyPassForId] = useState("");
  const [idError, setIdError] = useState<string | null>(null);
  const [idSuccess, setIdSuccess] = useState<string | null>(null);

  // Change Password Form State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // Profile metadata
  const [displayName, setDisplayName] = useState(credentials.displayName || "Chief Operating Commander");
  const [phone, setPhone] = useState(credentials.phone || "+91 98300 00000");
  const [twoFactor, setTwoFactor] = useState(credentials.twoFactorEnabled);

  // Handle Login ID Change
  const handleUpdateLoginId = (e: React.FormEvent) => {
    e.preventDefault();
    setIdError(null);
    setIdSuccess(null);

    if (!newLoginId.trim()) {
      setIdError("Please enter a valid new Login ID.");
      return;
    }
    if (!verifyPassForId) {
      setIdError("Please provide your current password for security verification.");
      return;
    }

    const res = updateLoginId(newLoginId, verifyPassForId);
    if (res.success) {
      setIdSuccess(`Login ID successfully updated to: ${newLoginId.trim()}`);
      showToast(`Login ID updated to ${newLoginId.trim()}`);
      setNewLoginId("");
      setVerifyPassForId("");
    } else {
      setIdError(res.error || "Failed to update Login ID.");
    }
  };

  // Handle Password Change
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (!currentPass) {
      setPassError("Please enter your current password.");
      return;
    }
    if (newPass.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }
    if (newPass !== confirmNewPass) {
      setPassError("New password and confirmation do not match.");
      return;
    }

    const res = updatePassword(currentPass, newPass);
    if (res.success) {
      setPassSuccess("Security password successfully changed! Use your new password on your next login.");
      showToast("Security password rotated successfully!");
      setCurrentPass("");
      setNewPass("");
      setConfirmNewPass("");
    } else {
      setPassError(res.error || "Failed to change password.");
    }
  };

  // Handle Profile Details Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ displayName, phone, twoFactorEnabled: twoFactor });
    showToast("Profile details updated!");
  };

  // Password Strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", score: 0, color: "#94A3B8" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { label: "Weak", score: 1, color: "#EF4444" };
    if (score === 2) return { label: "Fair", score: 2, color: "#F59E0B" };
    if (score === 3) return { label: "Strong", score: 3, color: "#10B981" };
    return { label: "Enterprise Grade", score: 4, color: "#06B6D4" };
  };

  const strength = getPasswordStrength(newPass);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "1150px" }}>
      
      {/* ── PROFILE HEADER BANNER ── */}
      <div style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderRadius: "16px",
        padding: "2rem",
        color: "#FFFFFF",
        border: "1px solid #334155",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #2563EB 0%, #0284C7 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 900,
            boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
            border: "2px solid rgba(255, 255, 255, 0.2)"
          }}>
            {credentials.displayName?.slice(0, 2).toUpperCase() || "AD"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, margin: 0 }}>
                {credentials.displayName || "Administrator"}
              </h2>
              <span style={{
                background: "rgba(16, 185, 129, 0.2)",
                color: "#34D399",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                fontSize: "0.7rem",
                fontWeight: 800,
                padding: "0.2rem 0.6rem",
                borderRadius: "999px"
              }}>
                ● Authenticated Active
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", color: "#94A3B8", fontSize: "0.82rem" }}>
              <span>ID: <strong style={{ color: "#E2E8F0" }}>{credentials.loginId}</strong></span>
              <span>•</span>
              <span>Role: <strong style={{ color: "#60A5FA" }}>{credentials.role}</strong></span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "0.6rem 1.1rem",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#FCA5A5",
            fontSize: "0.82rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            transition: "all 0.15s ease"
          }}
        >
          <LogOutIcon size={16} color="#FCA5A5" />
          <span>Sign Out of Session</span>
        </button>
      </div>

      {/* ── 2-COLUMN CREDENTIALS MANAGEMENT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* ── CARD 1: CHANGE LOGIN ID ── */}
        <div className="admin-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserIcon size={17} color="#2563EB" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Change Admin Login ID
              </h3>
            </div>

            <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1.25rem" }}>
              Update your primary email or login username. You will use this new Login ID to sign in to the Admin CMS.
            </p>

            {/* Current ID Pill */}
            <div style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>Current Login ID</span>
              <span style={{ fontSize: "0.86rem", fontWeight: 800, color: "#1E293B", fontFamily: "'JetBrains Mono', monospace" }}>
                {credentials.loginId}
              </span>
            </div>

            {idSuccess && (
              <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircleIcon size={15} color="#059669" />
                <span>{idSuccess}</span>
              </div>
            )}

            {idError && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <AlertCircleIcon size={15} color="#DC2626" />
                <span>{idError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateLoginId} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "#334155", marginBottom: "0.35rem" }}>
                  New Login ID / Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. director@goodlifesutra.com"
                  value={newLoginId}
                  onChange={(e) => setNewLoginId(e.target.value)}
                  className="input-control"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "#334155", marginBottom: "0.35rem" }}>
                  Current Password (for authorization) *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={verifyPassForId}
                  onChange={(e) => setVerifyPassForId(e.target.value)}
                  className="input-control"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "0.5rem", justifyContent: "center" }}
              >
                <CheckCircleIcon size={15} color="#FFFFFF" />
                <span>Save New Login ID</span>
              </button>
            </form>
          </div>
        </div>

        {/* ── CARD 2: CHANGE PASSWORD ── */}
        <div className="admin-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LockIcon size={17} color="#D97706" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Rotate Security Password
              </h3>
            </div>

            <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1.25rem" }}>
              Ensure your account is protected with a strong, enterprise-grade password containing numbers and uppercase letters.
            </p>

            {passSuccess && (
              <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircleIcon size={15} color="#059669" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <AlertCircleIcon size={15} color="#DC2626" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              {/* Current Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "#334155", marginBottom: "0.35rem" }}>
                  Current Password *
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="input-control"
                    style={{ fontSize: "0.85rem", paddingRight: "2.4rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    style={{ position: "absolute", right: "0.75rem", border: "none", background: "transparent", color: "#64748B", cursor: "pointer" }}
                  >
                    {showCurrentPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ fontSize: "0.76rem", fontWeight: 800, color: "#334155" }}>
                    New Password *
                  </label>
                  {newPass && (
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: strength.color }}>
                      {strength.label}
                    </span>
                  )}
                </div>

                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    placeholder="Minimum 6 characters"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="input-control"
                    style={{ fontSize: "0.85rem", paddingRight: "2.4rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    style={{ position: "absolute", right: "0.75rem", border: "none", background: "transparent", color: "#64748B", cursor: "pointer" }}
                  >
                    {showNewPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                  </button>
                </div>

                {newPass && (
                  <div style={{ display: "flex", gap: "4px", marginTop: "0.35rem" }}>
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        style={{
                          flex: 1,
                          height: "3px",
                          borderRadius: "999px",
                          background: strength.score >= s ? strength.color : "#E2E8F0"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "#334155", marginBottom: "0.35rem" }}>
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  className="input-control"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "0.5rem", justifyContent: "center", background: "#D97706" }}
              >
                <KeyIcon size={15} color="#FFFFFF" />
                <span>Update Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── SECURITY ENCLAVE & ACTIVE SESSIONS AUDIT ── */}
      <div className="admin-card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheckIcon size={17} color="#059669" />
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Security Audit &amp; Active Workstation Session
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>LAST LOGIN STAMP</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#0F172A", marginTop: "0.3rem" }}>
              {credentials.lastLogin}
            </div>
          </div>

          <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>SESSION IP ADDRESS</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#0F172A", marginTop: "0.3rem", fontFamily: "'JetBrains Mono', monospace" }}>
              {credentials.lastLoginIp}
            </div>
          </div>

          <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>ENCRYPTION PROTOCOL</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#10B981", marginTop: "0.3rem" }}>
              TLS 1.3 · AES-256-GCM
            </div>
          </div>

          <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>RATE LIMIT STATUS</div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#2563EB", marginTop: "0.3rem" }}>
              Active (5-Try Lockout)
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
