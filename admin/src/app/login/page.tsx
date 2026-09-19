"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import {
  ShieldCheckIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  KeyIcon
} from "@/components/Icons";

export default function LoginPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading,
    login,
    isLockedOut,
    lockoutRemaining,
    credentials
  } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleFillDemo = () => {
    setLoginId(credentials.loginId || "admin@goodlifesutra.com");
    setPassword("GoodLife@2026!");
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      setErrorMsg("Please enter your Admin Login ID or Corporate Email.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your security password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Smooth feedback delay
    await new Promise((res) => setTimeout(res, 350));

    const result = await login(loginId, password, rememberMe, pin);
    setIsSubmitting(false);

    if (result.success) {
      setAuthSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 400);
    } else {
      setErrorMsg(result.error || "Authentication failed. Please check your credentials.");
    }
  };

  // Password strength estimation
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
    return { label: "Enterprise Secure", score: 4, color: "#0284C7" };
  };

  const strength = getPasswordStrength(password);

  if (isLoading) {
    return (
      <div style={{
        height: "100vh",
        background: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#2563EB",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "42px",
            height: "42px",
            border: "3px solid #E2E8F0",
            borderTopColor: "#2563EB",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1rem"
          }} />
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>
            Verifying Admin Session...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
      position: "relative",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>

      {/* Main Clean & Simple Login Card */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "440px",
        background: "#FFFFFF",
        border: "1.5px solid #E2E8F0",
        borderRadius: "20px",
        padding: "2.5rem 2.25rem",
        boxShadow: "0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)"
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "center" }}>
            <Logo height={48} mode="light" />
          </div>
          <h1 style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.02em",
            margin: "0 0 0.35rem"
          }}>
            Admin Console Login
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0, fontWeight: 500 }}>
            Enterprise Commerce Operations &amp; CMS
          </p>
        </div>

        {/* Lockout Warning Box */}
        {isLockedOut && (
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <AlertCircleIcon size={18} color="#EF4444" />
            <div style={{ fontSize: "0.8rem", color: "#991B1B", fontWeight: 700 }}>
              Account locked due to multiple attempts. Retry in <strong>{lockoutRemaining}s</strong>
            </div>
          </div>
        )}

        {/* Error Message Box */}
        {errorMsg && !isLockedOut && (
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: "10px",
            padding: "0.8rem 1rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <AlertCircleIcon size={16} color="#DC2626" />
            <span style={{ fontSize: "0.82rem", color: "#B91C1C", fontWeight: 600 }}>
              {errorMsg}
            </span>
          </div>
        )}

        {/* Success Alert */}
        {authSuccess && (
          <div style={{
            background: "#ECFDF5",
            border: "1px solid #A7F3D0",
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <CheckCircleIcon size={18} color="#059669" />
            <span style={{ fontSize: "0.84rem", color: "#065F46", fontWeight: 700 }}>
              Login successful! Redirecting to admin console...
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          {/* Login ID Input */}
          <div>
            <label style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#334155",
              marginBottom: "0.45rem"
            }}>
              Login ID or Corporate Email
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: "0.9rem", color: "#64748B", display: "flex", alignItems: "center" }}>
                <UserIcon size={16} color="#64748B" />
              </div>
              <input
                type="text"
                required
                disabled={isLockedOut || isSubmitting || authSuccess}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="admin@goodlifesutra.com"
                style={{
                  width: "100%",
                  padding: "0.78rem 1rem 0.78rem 2.6rem",
                  background: "#F8FAFC",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: "10px",
                  color: "#0F172A",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
                onFocus={(e) => {
                  e.target.style.background = "#FFFFFF";
                  e.target.style.borderColor = "#2563EB";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "#F8FAFC";
                  e.target.style.borderColor = "#CBD5E1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
              <label style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#334155"
              }}>
                Password
              </label>
              {password && (
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: strength.color }}>
                  {strength.label}
                </span>
              )}
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: "0.9rem", color: "#64748B", display: "flex", alignItems: "center" }}>
                <LockIcon size={16} color="#64748B" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLockedOut || isSubmitting || authSuccess}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: "100%",
                  padding: "0.78rem 2.6rem 0.78rem 2.6rem",
                  background: "#F8FAFC",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: "10px",
                  color: "#0F172A",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  outline: "none",
                  letterSpacing: showPassword ? "normal" : "0.15em",
                  transition: "all 0.2s ease"
                }}
                onFocus={(e) => {
                  e.target.style.background = "#FFFFFF";
                  e.target.style.borderColor = "#2563EB";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "#F8FAFC";
                  e.target.style.borderColor = "#CBD5E1";
                  e.target.style.boxShadow = "none";
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.85rem",
                  border: "none",
                  background: "transparent",
                  color: "#64748B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.2rem"
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon size={16} color="#64748B" /> : <EyeIcon size={16} color="#64748B" />}
              </button>
            </div>

            {/* Password Strength Meter Bar */}
            {password && (
              <div style={{ display: "flex", gap: "4px", marginTop: "0.45rem" }}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      height: "3.5px",
                      borderRadius: "999px",
                      background: strength.score >= step ? strength.color : "#E2E8F0",
                      transition: "all 0.2s ease"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2FA PIN (If active) */}
          {credentials.twoFactorEnabled && (
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "0.45rem" }}>
                2-Factor Security PIN
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <div style={{ position: "absolute", left: "0.9rem", color: "#64748B" }}>
                  <KeyIcon size={16} color="#64748B" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4 or 6-digit PIN"
                  style={{
                    width: "100%",
                    padding: "0.78rem 1rem 0.78rem 2.6rem",
                    background: "#F8FAFC",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "10px",
                    color: "#0F172A",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    outline: "none"
                  }}
                />
              </div>
            </div>
          )}

          {/* Remember Me & Demo Fill */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#475569", cursor: "pointer", userSelect: "none" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "#2563EB", width: "15px", height: "15px", cursor: "pointer" }}
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                border: "1px solid #BFDBFE",
                background: "#EFF6FF",
                color: "#1D4ED8",
                padding: "0.32rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              title="Quickly fill current admin credentials for testing"
            >
              Fill Demo Credentials
            </button>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLockedOut || isSubmitting || authSuccess}
            style={{
              marginTop: "0.4rem",
              padding: "0.85rem",
              borderRadius: "10px",
              border: "none",
              background: authSuccess
                ? "linear-gradient(135deg, #059669 0%, #10B981 100%)"
                : "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#FFFFFF",
              fontSize: "0.94rem",
              fontWeight: 700,
              cursor: isLockedOut || isSubmitting || authSuccess ? "not-allowed" : "pointer",
              boxShadow: "0 6px 20px rgba(37, 99, 235, 0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.55rem",
              transition: "all 0.2s ease",
              opacity: isLockedOut ? 0.5 : 1
            }}
          >
            {isSubmitting ? (
              <span>Signing in...</span>
            ) : authSuccess ? (
              <>
                <CheckCircleIcon size={18} color="#FFFFFF" />
                <span>Success · Opening Admin Console</span>
              </>
            ) : (
              <>
                <ShieldCheckIcon size={18} color="#FFFFFF" />
                <span>Sign In to Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Bottom subtle note */}
        <div style={{
          marginTop: "1.75rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid #F1F5F9",
          textAlign: "center",
          fontSize: "0.78rem",
          color: "#64748B"
        }}>
          Need to change credentials? Visit{" "}
          <Link href="/admin/profile" style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
            Profile &amp; Security Settings
          </Link>
        </div>
      </div>

      {/* Footer Copyright */}
      <div style={{
        marginTop: "2rem",
        zIndex: 10,
        fontSize: "0.78rem",
        color: "#64748B",
        textAlign: "center"
      }}>
        © 2026 Good Life Sutra · Enterprise Commerce Operating Partner
      </div>
    </div>
  );
}
