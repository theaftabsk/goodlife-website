"use client";

import React from "react";
import { TrendingUpIcon } from "@/components/Icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  color?: "blue" | "green" | "amber" | "purple" | "cyan";
}

const colorMap = {
  blue: { bg: "#EFF6FF", border: "#BFDBFE", iconBg: "#DBEAFE", text: "#1D4ED8" },
  green: { bg: "#ECFDF5", border: "#A7F3D0", iconBg: "#D1FAE5", text: "#059669" },
  amber: { bg: "#FFFBEB", border: "#FDE68A", iconBg: "#FEF3C7", text: "#D97706" },
  purple: { bg: "#F5F3FF", border: "#DDD6FE", iconBg: "#EDE9FE", text: "#7C3AED" },
  cyan: { bg: "#F0F9FF", border: "#BAE6FD", iconBg: "#E0F2FE", text: "#0284C7" },
};

export default function StatCard({
  title,
  value,
  subtext,
  trend,
  isPositive = true,
  icon,
  color = "blue"
}: StatCardProps) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="admin-card" style={{ padding: "1.25rem 1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {title}
          </span>
          <div style={{
            fontSize: "1.85rem",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.03em",
            marginTop: "0.35rem",
            lineHeight: 1.1
          }}>
            {value}
          </div>
        </div>

        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: c.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.text
        }}>
          {icon}
        </div>
      </div>

      {(subtext || trend) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.9rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid #F1F5F9",
          fontSize: "0.78rem"
        }}>
          {trend && (
            <span style={{
              fontWeight: 700,
              color: isPositive ? "#059669" : "#DC2626",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            }}>
              <TrendingUpIcon size={13} color={isPositive ? "#059669" : "#DC2626"} />
              <span>{trend}</span>
            </span>
          )}
          {subtext && (
            <span style={{ color: "#64748B", fontWeight: 500 }}>
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
