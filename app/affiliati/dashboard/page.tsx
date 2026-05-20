import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { verifySessionCookie } from "@/lib/affiliati-auth";
import { readStore } from "@/lib/affiliate-store";
import { CountUp } from "@/components/affiliati/count-up";
import { SalesList } from "@/components/affiliati/sales-list";
import { Chart } from "@/components/affiliati/chart";
import type { Sale } from "@/lib/affiliate-store";

export const dynamic = "force-dynamic";

export default async function AffiliateDashboard() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("aff_session")?.value;
  if (!sessionCookie) redirect("/affiliati");

  const affiliateId = verifySessionCookie(sessionCookie);
  if (!affiliateId) redirect("/affiliati");

  const store = await readStore();
  const affiliate = store.affiliates.find((a) => a.id === affiliateId);
  if (!affiliate) redirect("/affiliati");

  const sales: Sale[] = store.sales
    .filter((s) => s.affiliate_id === affiliateId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalEarned = sales.reduce((sum, s) => sum + s.amount * 0.2, 0);
  const totalPaid = sales.filter((s) => s.paid_at).reduce((sum, s) => sum + s.amount * 0.2, 0);
  const totalPending = totalEarned - totalPaid;

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-900">
        <span className="text-sm font-bold text-indigo-400">Esame Facile</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">Ciao, {affiliate.name}</span>
          <form action="/api/affiliati/logout" method="POST">
            <button type="submit" className="text-neutral-500 hover:text-neutral-300 transition-colors p-1">
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="container-app py-6 space-y-5">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}
        >
          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">
            Totale guadagnato
          </p>
          <p className="text-5xl font-bold text-white mb-1">
            <CountUp value={totalEarned} />
          </p>
          <p className="text-sm text-indigo-300/70 mt-1">
            {affiliate.code.toUpperCase()} · {sales.length} vendite
          </p>
        </div>

        {/* Paid / Pending */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">€{totalPaid}</p>
            <p className="text-xs text-neutral-500 mt-1">Pagato</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">€{totalPending}</p>
            <p className="text-xs text-neutral-500 mt-1">In arrivo</p>
          </div>
        </div>

        {/* Sales list */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Ultime vendite
          </p>
          <SalesList sales={sales} />
        </div>

        {/* Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 pb-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
            Andamento
          </p>
          <Chart sales={sales} />
        </div>
      </div>
    </div>
  );
}
