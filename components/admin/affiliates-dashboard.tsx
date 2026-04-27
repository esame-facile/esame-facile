"use client";

import { useState } from "react";

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

const COMMISSION_RATE = 0.2;

const COLOR_MAP: Record<string, { card: string; badge: string; btn: string; unpaid10: string; unpaid20: string }> = {
  violet: {
    card: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    btn: "bg-violet-600 hover:bg-violet-700 text-white",
    unpaid10: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    unpaid20: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
  },
  pink: {
    card: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
    btn: "bg-pink-600 hover:bg-pink-700 text-white",
    unpaid10: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    unpaid20: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
  },
  emerald: {
    card: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    unpaid10: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    unpaid20: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },
};

function commission(amount: number) {
  return amount * COMMISSION_RATE;
}

function formatEur(val: number) {
  return `€${val % 1 === 0 ? val : val.toFixed(2)}`;
}

export function AffiliatesDashboard({ initialAffiliates }: { initialAffiliates: Affiliate[] }) {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(
    initialAffiliates.map((a) => ({
      ...a,
      affiliate_sales: [...(a.affiliate_sales ?? [])].sort(
        (x, y) => new Date(x.created_at).getTime() - new Date(y.created_at).getTime()
      ),
    }))
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const setItemLoading = (id: string, val: boolean) =>
    setLoading((prev) => ({ ...prev, [id]: val }));

  // Total pending across all affiliates
  const totalPending = affiliates.reduce((acc, a) => {
    return acc + a.affiliate_sales.filter((s) => !s.paid_at).reduce((s, sale) => s + commission(sale.amount), 0);
  }, 0);

  const totalPaid = affiliates.reduce((acc, a) => {
    return acc + a.affiliate_sales.filter((s) => s.paid_at).reduce((s, sale) => s + commission(sale.amount), 0);
  }, 0);

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
            ? { ...a, affiliate_sales: [...a.affiliate_sales, newSale] }
            : a
        )
      );
    }
    setItemLoading(key, false);
  }

  async function togglePaid(affiliateId: string, saleId: string) {
    setItemLoading(saleId, true);
    const res = await fetch(`/api/admin/affiliates/sales/${saleId}`, {
      method: "PATCH",
    });
    if (res.ok) {
      const updated: Sale = await res.json();
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === affiliateId
            ? {
                ...a,
                affiliate_sales: a.affiliate_sales.map((s) =>
                  s.id === saleId ? updated : s
                ),
              }
            : a
        )
      );
    }
    setItemLoading(saleId, false);
  }

  async function deleteSale(affiliateId: string, saleId: string) {
    setItemLoading(`del-${saleId}`, true);
    const res = await fetch(`/api/admin/affiliates/sales/${saleId}`, {
      method: "DELETE",
    });
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
    <div className="space-y-6">
      {/* Global summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Da pagare totale</p>
          <p className="text-3xl font-bold text-red-500">{formatEur(totalPending)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Già pagato</p>
          <p className="text-3xl font-bold text-green-600">{formatEur(totalPaid)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Vendite totali</p>
          <p className="text-3xl font-bold text-gray-900">
            {affiliates.reduce((acc, a) => acc + a.affiliate_sales.length, 0)}
          </p>
        </div>
      </div>

      {/* Affiliate cards */}
      {affiliates.map((affiliate) => {
        const colors = COLOR_MAP[affiliate.color] ?? COLOR_MAP.violet;
        const sales = affiliate.affiliate_sales;
        const totalComm = sales.reduce((acc, s) => acc + commission(s.amount), 0);
        const paidComm = sales.filter((s) => s.paid_at).reduce((acc, s) => acc + commission(s.amount), 0);
        const pendingComm = totalComm - paidComm;

        return (
          <div
            key={affiliate.id}
            className={`bg-white rounded-xl border-2 ${colors.card} overflow-hidden`}
          >
            {/* Card header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-gray-900">{affiliate.name}</p>
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                  {affiliate.code}
                </span>
                <span className="text-xs text-gray-400">{sales.length} vendite</span>
              </div>
              <div className="text-right">
                {pendingComm > 0 ? (
                  <p className="text-sm font-bold text-red-500">{formatEur(pendingComm)} da pagare</p>
                ) : (
                  <p className="text-sm font-bold text-green-600">✓ In pari</p>
                )}
              </div>
            </div>

            {/* Chips area */}
            <div className="px-5 py-4">
              {sales.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Nessuna vendita ancora</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sales.map((sale) => {
                    const isPaid = !!sale.paid_at;
                    const isToggling = loading[sale.id];
                    const isDeleting = loading[`del-${sale.id}`];

                    return (
                      <div key={sale.id} className="relative group">
                        {/* Sale chip */}
                        <button
                          onClick={() => !isToggling && !isDeleting && togglePaid(affiliate.id, sale.id)}
                          disabled={isToggling || isDeleting}
                          title={isPaid ? "Clicca per annullare pagamento" : "Clicca per segnare pagata"}
                          className={`
                            relative inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold
                            transition-all duration-150 select-none
                            ${isToggling ? "opacity-50 cursor-wait" : "cursor-pointer"}
                            ${
                              isPaid
                                ? "bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200 line-through"
                                : sale.amount === 10
                                ? colors.unpaid10
                                : colors.unpaid20
                            }
                          `}
                        >
                          {isPaid && <span>✓</span>}
                          {sale.amount === 10 ? "10€" : "20€"}
                          <span className="text-[10px] opacity-60">
                            ({formatEur(commission(sale.amount))})
                          </span>
                        </button>

                        {/* Delete × on hover */}
                        <button
                          onClick={() => !isDeleting && deleteSale(affiliate.id, sale.id)}
                          disabled={isDeleting}
                          title="Elimina vendita"
                          className="
                            absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white
                            text-[10px] font-bold items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity
                            hidden group-hover:flex
                            hover:bg-red-600
                          "
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Stats + buttons */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              {/* Stats */}
              <div className="flex gap-4 text-xs text-gray-500">
                <span>
                  Commissioni:{" "}
                  <strong className="text-gray-800">{formatEur(totalComm)}</strong>
                </span>
                <span className="text-gray-300">|</span>
                <span>
                  Pagato:{" "}
                  <strong className="text-green-600">{formatEur(paidComm)}</strong>
                </span>
                <span className="text-gray-300">|</span>
                <span>
                  Rimane:{" "}
                  <strong className={pendingComm > 0 ? "text-red-500" : "text-gray-400"}>
                    {formatEur(pendingComm)}
                  </strong>
                </span>
              </div>

              {/* Add sale buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => addSale(affiliate.id, 10)}
                  disabled={loading[`add-${affiliate.id}-10`]}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  + 10€
                </button>
                <button
                  onClick={() => addSale(affiliate.id, 20)}
                  disabled={loading[`add-${affiliate.id}-20`]}
                  className="px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-200 text-xs font-semibold hover:bg-violet-100 transition-colors disabled:opacity-50"
                >
                  + 20€
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
