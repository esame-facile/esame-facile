import { readStore, nestAffiliates } from "@/lib/affiliate-store";
import { AffiliatesDashboard } from "@/components/admin/affiliates-dashboard";

export const dynamic = "force-dynamic";

export default async function AffiliatesPage() {
  const store = await readStore();
  const affiliates = nestAffiliates(store);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
            <p className="text-sm text-gray-400 mt-0.5">Esame Facile — 20% commissione</p>
          </div>
          <a
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Admin
          </a>
        </div>

        <AffiliatesDashboard initialAffiliates={affiliates} />

      </div>
    </div>
  );
}
