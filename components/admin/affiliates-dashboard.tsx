"use client";

import { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { saleCommission } from "@/lib/commission";

type Sale = {
  id: string;
  affiliate_id: string;
  amount: 10 | 20;
  paid_at: string | null;
  created_at: string;
};

type Affiliate = {
  id: string;
  name: string;
  code: string;
  color: string;
  affiliate_sales: Sale[];
};

const COLOR_MAP: Record<string, { dot: string; badge: string; unpaid: string }> = {
  violet: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    unpaid: "bg-violet-500/15 text-violet-200 border-violet-500/30 hover:bg-violet-500/25",
  },
  pink: {
    dot: "bg-pink-400",
    badge: "bg-pink-500/15 text-pink-300 border border-pink-500/25",
    unpaid: "bg-pink-500/15 text-pink-200 border-pink-500/30 hover:bg-pink-500/25",
  },
  emerald: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
    unpaid: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30 hover:bg-emerald-500/25",
  },
  amber: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    unpaid: "bg-amber-500/15 text-amber-200 border-amber-500/30 hover:bg-amber-500/25",
  },
};

function formatEur(val: number) {
  return `€${val % 1 === 0 ? val : val.toFixed(2)}`;
}

export function AffiliatesDashboard({ initialAffiliates }: { initialAffiliates: Affiliate[] }) {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(
    initialAffiliates.map((a) => ({
      ...a,
      affiliate_sales: [...(a.affiliate_sales ?? [])].sort(
        (x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime()
      ),
    }))
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const setItemLoading = (id: string, val: boolean) =>
    setLoading((prev) => ({ ...prev, [id]: val }));

  const totalPending = affiliates.reduce((acc, a) => {
    return acc + a.affiliate_sales.filter((s) => !s.paid_at).reduce((s, sale) => s + saleCommission(sale, a.code), 0);
  }, 0);

  const totalPaid = affiliates.reduce((acc, a) => {
    return acc + a.affiliate_sales.filter((s) => s.paid_at).reduce((s, sale) => s + saleCommission(sale, a.code), 0);
  }, 0);

  const totalSales = affiliates.reduce((acc, a) => acc + a.affiliate_sales.length, 0);

  async function addSale(affiliateId: string, amount: 10 | 20) {
    const key = `add-${affiliateId}-${amount}`;
    setItemLoading(key, true);
    const res = await fetch("/api/admin/affiliates/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliate_id: affiliateId, amount }),
    });
    if (res.ok) {
      const newSale: Sale = await res.json();
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === affiliateId
            ? { ...a, affiliate_sales: [newSale, ...a.affiliate_sales] }
            : a
        )
      );
    }
    setItemLoading(key, false);
  }

  async function togglePaid(affiliateId: string, saleId: string) {
    setItemLoading(saleId, true);
    const res = await fetch(`/api/admin/affiliates/sales/${saleId}`, { method: "PATCH" });
    if (res.ok) {
      const updated: Sale = await res.json();
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === affiliateId
            ? { ...a, affiliate_sales: a.affiliate_sales.map((s) => (s.id === saleId ? updated : s)) }
            : a
        )
      );
    }
    setItemLoading(saleId, false);
  }

  async function deleteSale(affiliateId: string, saleId: string) {
    if (!confirm("Eliminare questa vendita?")) return;
    setItemLoading(`del-${saleId}`, true);
    const res = await fetch(`/api/admin/affiliates/sales/${saleId}`, { method: "DELETE" });
    if (res.ok || res.status === 204) {
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === affiliateId
            ? { ...a, affiliate_sales: a.affiliate_sales.filter((s) => s.id !== saleId) }
            : a
        )
      );
    }
    setItemLoading(`del-${saleId}`, false);
  }

  return (
    <div className="space-y-5">
      {/* Hero — da pagare totale */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "linear-gradient(135deg, #451a03, #78350f)" }}
      >
        <p className="text-xs font-semibold text-amber-300 uppercase tracking-widest mb-2">
          Da pagare in totale
        </p>
        <p className="text-5xl font-bold text-white mb-1">{formatEur(totalPending)}</p>
        <p className="text-sm text-amber-300/70 mt-1">
          {affiliates.length} affiliate · {totalSales} vendite
        </p>
      </div>

      {/* Pagato / Vendite */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{formatEur(totalPaid)}</p>
          <p className="text-xs text-neutral-500 mt-1">Già pagato</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalSales}</p>
          <p className="text-xs text-neutral-500 mt-1">Vendite totali</p>
        </div>
      </div>

      {/* Affiliate cards */}
      {affiliates.map((affiliate) => {
        const colors = COLOR_MAP[affiliate.color] ?? COLOR_MAP.violet;
        const sales = affiliate.affiliate_sales;
        const totalComm = sales.reduce((acc, s) => acc + saleCommission(s, affiliate.code), 0);
        const paidComm = sales.filter((s) => s.paid_at).reduce((acc, s) => acc + saleCommission(s, affiliate.code), 0);
        const pendingComm = totalComm - paidComm;

        return (
          <div key={affiliate.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                <p className="text-base font-bold text-white">{affiliate.name}</p>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {affiliate.code}
                </span>
              </div>
              {pendingComm > 0 ? (
                <p className="text-sm font-bold text-amber-400">{formatEur(pendingComm)}</p>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400">
                  <Check size={13} /> In pari
                </span>
              )}
            </div>

            {/* Stats row */}
            <div className="px-4 py-3 grid grid-cols-3 gap-2 text-center border-b border-neutral-800/60">
              <div>
                <p className="text-sm font-bold text-white">{formatEur(totalComm)}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wide mt-0.5">Totale</p>
              </div>
              <div>
                <p className="text-sm font-bold text-green-400">{formatEur(paidComm)}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wide mt-0.5">Pagato</p>
              </div>
              <div>
                <p className={`text-sm font-bold ${pendingComm > 0 ? "text-amber-400" : "text-neutral-600"}`}>
                  {formatEur(pendingComm)}
                </p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wide mt-0.5">Rimane</p>
              </div>
            </div>

            {/* Chips */}
            <div className="px-4 py-4">
              {sales.length === 0 ? (
                <p className="text-sm text-neutral-600 italic">Nessuna vendita ancora</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sales.map((sale) => {
                    const isPaid = !!sale.paid_at;
                    const isToggling = loading[sale.id];
                    const isDeleting = loading[`del-${sale.id}`];

                    return (
                      <div
                        key={sale.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => !isToggling && !isDeleting && togglePaid(affiliate.id, sale.id)}
                        title={isPaid ? "Segna come da pagare" : "Segna come pagata"}
                        className={`
                          inline-flex items-center gap-1 pl-2.5 pr-2 py-1.5 rounded-full border text-xs font-semibold
                          transition-all duration-150 select-none
                          ${isToggling ? "opacity-50 cursor-wait" : "cursor-pointer"}
                          ${isPaid
                            ? "bg-neutral-800 text-neutral-500 border-neutral-700 line-through"
                            : colors.unpaid}
                        `}
                      >
                        {isPaid && <Check size={10} />}
                        {sale.amount === 10 ? "10€" : "20€"}
                        <span className="text-[10px] opacity-60">
                          ({formatEur(saleCommission(sale, affiliate.code))})
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); if (!isDeleting) deleteSale(affiliate.id, sale.id); }}
                          disabled={isDeleting}
                          title="Elimina vendita"
                          className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add sale buttons */}
            <div className="px-4 py-3 bg-white/[0.02] border-t border-neutral-800 flex gap-2">
              <button
                onClick={() => addSale(affiliate.id, 10)}
                disabled={loading[`add-${affiliate.id}-10`]}
                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-semibold transition-colors disabled:opacity-50"
              >
                <Plus size={13} /> 10€
              </button>
              <button
                onClick={() => addSale(affiliate.id, 20)}
                disabled={loading[`add-${affiliate.id}-20`]}
                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-semibold transition-colors disabled:opacity-50"
              >
                <Plus size={13} /> 20€
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
