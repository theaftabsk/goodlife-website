"use client";

import React from "react";

interface LogoProps {
  height?: number;
  mode?: "light" | "dark";
  className?: string;
}

export default function Logo({ height = 36, mode = "light", className = "" }: LogoProps) {
  // Dark mode colors for high contrast on dark backgrounds, Light mode colors matching exact brand image
  const goodColor = mode === "dark" ? "#4B8EC4" : "#2E628D";
  const lifeColor = mode === "dark" ? "#7EC365" : "#6FA056";

  return (
    <span
      className={`brand-logo-component ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "'Trebuchet MS', 'Outfit', 'Ubuntu', 'Segoe UI', sans-serif",
        fontStyle: "italic",
        fontWeight: 800,
        fontSize: `${height * 0.85}px`,
        lineHeight: 1,
        letterSpacing: "-0.6px",
        userSelect: "none",
      }}
    >
      <span style={{ color: goodColor, transition: "color 0.2s ease" }}>Good</span>
      <span style={{ color: lifeColor, transition: "color 0.2s ease" }}>life</span>
    </span>
  );
}
