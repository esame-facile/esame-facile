"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";
import type { Sale } from "@/lib/affiliate-store";
import { saleCommission } from "@/lib/commission";

const INITIAL_COUNT = 5;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short" });
}

export function SalesList({ sales, affiliateCode }: { sales: Sale[]; affiliateCode?: string }) {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...sales].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const visible = expanded ? sorted : sorted.slice(0, INITIAL_COUNT);
  const hiddenCount = sorted.length - INITIAL_COUNT;

  return (
    <div className="space-y-2">
      {visible.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-neutral-100">
              {formatDate(sale.created_at)}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Commissione €{saleCommission(sale, affiliateCode).toFixed(0)}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              sale.paid_at
                ? "bg-green-500/15 text-green-400"
                : "bg-amber-500/15 text-amber-400"
            }`}
          >
            {sale.paid_at
              ? <><CheckCircle size={11} /> Pagato</>
              : <><Clock size={11} /> In attesa</>}
          </span>
        </div>
      ))}

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {expanded
            ? <><ChevronUp size={15} /> Comprimi</>
            : <><ChevronDown size={15} /> Vedi tutte le {sorted.length} vendite</>}
        </button>
      )}
    </div>
  );
}
