"use client";

import { useState, useMemo } from "react";
import type { Sale } from "@/lib/affiliate-store";

type Period = "day" | "week" | "month";

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function groupByPeriod(sales: Sale[], period: Period): { label: string; count: number }[] {
  const now = new Date();
  const buckets = new Map<string, number>();

  if (period === "day") {
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
      buckets.set(key, 0);
    }
    sales.forEach((s) => {
      const key = new Date(s.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "short" });
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    });
  } else if (period === "week") {
    for (let i = 9; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      buckets.set(`W${getISOWeek(d)}`, 0);
    }
    sales.forEach((s) => {
      const key = `W${getISOWeek(new Date(s.created_at))}`;
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    });
  } else {
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
      buckets.set(key, 0);
    }
    sales.forEach((s) => {
      const key = new Date(s.created_at).toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    });
  }

  return Array.from(buckets.entries()).map(([label, count]) => ({ label, count }));
}

const PERIODS: { key: Period; label: string }[] = [
  { key: "day", label: "Giornaliero" },
  { key: "week", label: "Settimanale" },
  { key: "month", label: "Mensile" },
];

export function Chart({ sales }: { sales: Sale[] }) {
  const [period, setPeriod] = useState<Period>("month");
  const data = useMemo(() => groupByPeriod(sales, period), [sales, period]);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div>
      <div className="flex gap-1.5 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              period === p.key
                ? "bg-indigo-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-end gap-1 h-20">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full rounded-t-sm bg-indigo-600 transition-all duration-500"
              style={{
                height: `${(d.count / maxCount) * 64}px`,
                minHeight: d.count > 0 ? "4px" : "0",
                opacity: d.count > 0 ? 1 : 0.15,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-neutral-600">{data[0]?.label}</span>
        <span className="text-xs text-neutral-600">{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}
