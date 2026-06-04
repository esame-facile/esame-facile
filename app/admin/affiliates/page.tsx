import { LogOut, Inbox } from "lucide-react";
import { readStore, nestAffiliates } from "@/lib/affiliate-store";
import { AffiliatesDashboard } from "@/components/admin/affiliates-dashboard";
import { PushSubscribeButton } from "@/components/admin/push-subscribe-button";

export const dynamic = "force-dynamic";

export default async function AffiliatesPage() {
  const store = await readStore();
  const affiliates = nestAffiliates(store);
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-900">
        <span className="text-sm font-bold text-amber-400">Quartier Generale</span>
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
            title="Ordini in entrata"
          >
            <Inbox size={16} />
          </a>
          <a
            href="/api/admin/logout"
            className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
            title="Esci"
          >
            <LogOut size={16} />
          </a>
        </div>
      </div>

      <div className="container-app py-6 space-y-5">
        {vapidKey && <PushSubscribeButton vapidKey={vapidKey} />}
        <AffiliatesDashboard initialAffiliates={affiliates} />
      </div>
    </div>
  );
}
