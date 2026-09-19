"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface AdminCredentials {
  loginId: string;
  password: string;
  displayName: string;
  role: string;
  phone: string;
  lastLogin: string;
  lastLoginIp: string;
  twoFactorEnabled: boolean;
  securityPin: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  credentials: Omit<AdminCredentials, "password" | "securityPin">;
  failedAttempts: number;
  isLockedOut: boolean;
  lockoutRemaining: number;
  login: (loginId: string, pass: string, remember?: boolean, pin?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateLoginId: (newLoginId: string, currentPass: string) => { success: boolean; error?: string };
  updatePassword: (currentPass: string, newPass: string) => { success: boolean; error?: string };
  updateProfile: (data: Partial<AdminCredentials>) => { success: boolean };
}

const DEFAULT_CREDENTIALS: AdminCredentials = {
  loginId: "admin@goodlifesutra.com",
  password: "GoodLife@2026!",
  displayName: "Chief Operating Commander",
  role: "Super Administrator (All Modules)",
  phone: "+91 98300 00000",
  lastLogin: "Sep 19, 2026 · 15:40 IST",
  lastLoginIp: "127.0.0.1 (Local Sec-VLAN)",
  twoFactorEnabled: false,
  securityPin: "8821"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [creds, setCreds] = useState<AdminCredentials>(DEFAULT_CREDENTIALS);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Initialize and hydrate stored credentials and active session
  useEffect(() => {
    try {
      const storedCreds = localStorage.getItem("gl_admin_auth_creds");
      if (storedCreds) {
        setCreds(JSON.parse(storedCreds));
      } else {
        localStorage.setItem("gl_admin_auth_creds", JSON.stringify(DEFAULT_CREDENTIALS));
      }

      const sessionToken = localStorage.getItem("gl_admin_session_token");
      const sessionExpiry = localStorage.getItem("gl_admin_session_expiry");

      if (sessionToken && sessionExpiry) {
        const expiryTime = parseInt(sessionExpiry, 10);
        if (Date.now() < expiryTime) {
          setIsAuthenticated(true);
        } else {
          // Expired session
          localStorage.removeItem("gl_admin_session_token");
          localStorage.removeItem("gl_admin_session_expiry");
          setIsAuthenticated(false);
        }
      }
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle brute-force lockout countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLockedOut && lockoutRemaining > 0) {
      timer = setInterval(() => {
        setLockoutRemaining((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLockedOut, lockoutRemaining]);

  // LOGIN FUNCTION
  const login = async (
    loginIdInput: string,
    passInput: string,
    remember: boolean = true,
    pinInput?: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (isLockedOut) {
      return {
        success: false,
        error: `Security Lockout active. Please wait ${lockoutRemaining} seconds before trying again.`
      };
    }

    const cleanId = loginIdInput.trim().toLowerCase();
    const targetId = creds.loginId.trim().toLowerCase();

    // Verify Login ID
    const isIdMatch = cleanId === targetId;
    // Verify Password
    const isPassMatch = passInput === creds.password;

    // Verify 2FA PIN if enabled
    let isPinMatch = true;
    if (creds.twoFactorEnabled) {
      isPinMatch = pinInput === creds.securityPin;
    }

    if (!isIdMatch || !isPassMatch || !isPinMatch) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 5) {
        setIsLockedOut(true);
        setLockoutRemaining(30);
        return {
          success: false,
          error: "Maximum failed authentication attempts exceeded. Terminal locked for 30 seconds."
        };
      }

      const remaining = 5 - nextAttempts;
      return {
        success: false,
        error: `Invalid credentials. ${remaining} attempts remaining before security lockout.`
      };
    }

    // Success!
    setFailedAttempts(0);
    setIsLockedOut(false);
    setIsAuthenticated(true);

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} IST`;
    
    const updatedCreds: AdminCredentials = {
      ...creds,
      lastLogin: formattedDate,
      lastLoginIp: "127.0.0.1 (Workstation TLS 1.3)"
    };
    setCreds(updatedCreds);
    try {
      localStorage.setItem("gl_admin_auth_creds", JSON.stringify(updatedCreds));
      // Session duration: 30 days if remember, else 8 hours
      const durationMs = remember ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
      const expiry = Date.now() + durationMs;
      localStorage.setItem("gl_admin_session_token", `gl_sec_sess_${Date.now()}_${Math.random().toString(36).slice(2)}`);
      localStorage.setItem("gl_admin_session_expiry", expiry.toString());
    } catch (_) {}

    return { success: true };
  };

  // LOGOUT FUNCTION
  const logout = () => {
    try {
      localStorage.removeItem("gl_admin_session_token");
      localStorage.removeItem("gl_admin_session_expiry");
    } catch (_) {}
    setIsAuthenticated(false);
    router.push("/login");
  };

  // UPDATE LOGIN ID
  const updateLoginId = (newLoginId: string, currentPass: string): { success: boolean; error?: string } => {
    if (!newLoginId.trim()) {
      return { success: false, error: "New Login ID cannot be empty." };
    }
    if (currentPass !== creds.password) {
      return { success: false, error: "Current password verification failed. Unauthorized change attempt." };
    }

    const updated: AdminCredentials = {
      ...creds,
      loginId: newLoginId.trim()
    };
    setCreds(updated);
    try {
      localStorage.setItem("gl_admin_auth_creds", JSON.stringify(updated));
    } catch (_) {}

    return { success: true };
  };

  // UPDATE PASSWORD
  const updatePassword = (currentPass: string, newPass: string): { success: boolean; error?: string } => {
    if (currentPass !== creds.password) {
      return { success: false, error: "Current password is incorrect. Verification failed." };
    }
    if (newPass.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const updated: AdminCredentials = {
      ...creds,
      password: newPass
    };
    setCreds(updated);
    try {
      localStorage.setItem("gl_admin_auth_creds", JSON.stringify(updated));
    } catch (_) {}

    return { success: true };
  };

  // UPDATE PROFILE
  const updateProfile = (data: Partial<AdminCredentials>): { success: boolean } => {
    const updated: AdminCredentials = {
      ...creds,
      ...data
    };
    setCreds(updated);
    try {
      localStorage.setItem("gl_admin_auth_creds", JSON.stringify(updated));
    } catch (_) {}

    return { success: true };
  };

  const safeCreds: Omit<AdminCredentials, "password" | "securityPin"> = {
    loginId: creds.loginId,
    displayName: creds.displayName,
    role: creds.role,
    phone: creds.phone,
    lastLogin: creds.lastLogin,
    lastLoginIp: creds.lastLoginIp,
    twoFactorEnabled: creds.twoFactorEnabled
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        credentials: safeCreds,
        failedAttempts,
        isLockedOut,
        lockoutRemaining,
        login,
        logout,
        updateLoginId,
        updatePassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
