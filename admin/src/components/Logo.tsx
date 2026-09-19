"use client";

import React from "react";

interface LogoProps {
  height?: number;
  mode?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({ height = 40, className = "", style }: LogoProps) {
  return (
    <img
      src="/logo-removebg-preview.png"
      alt="GoodLife"
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        maxHeight: "100%",
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle",
        ...style
      }}
    />
  );
}
