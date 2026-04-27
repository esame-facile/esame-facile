import { createAdminClient } from "@/lib/supabase-server";

type InboundOrder = {
  id: string;
  email: string;
  ebook: string;
  discount_code: string | null;
  created_at: string;
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://unipass-virid.vercel.app";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();
  const { data: orders, error } = await supabase
    .from("inbound_orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Esame Facile</p>
          </div>
          <a
            href="/api/admin/logout"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Esci
          </a>
        </div>

        {/* Quick links */}
        <div className="flex gap-3">
          <a
            href="/admin/affiliates"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Affiliates
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Ordini ricevuti
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {orders?.length ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Con codice sconto
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              {orders?.filter((o) => o.discount_code).length ?? 0}
            </p>
          </div>
        </div>

        {/* API Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Endpoint per lo sviluppatore
          </h2>
          <div className="space-y-2 text-xs font-mono bg-gray-50 rounded-lg p-4">
            <div>
              <span className="text-green-600 font-bold">POST</span>{" "}
              <span className="text-gray-800">{appUrl}/api/admin/ingest</span>
            </div>
            <div className="text-gray-500">
              x-api-key: <span className="text-gray-700">{process.env.ADMIN_API_KEY}</span>
            </div>
            <div className="text-gray-500 mt-2">
              {`{ "email": "...", "ebook": "...", "discount_code": "..." }`}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Risponde 201 con {`{ "success": true, "id": "uuid" }`} in caso di successo.
          </p>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">
              Ordini inbound ({orders?.length ?? 0})
            </h2>
          </div>

          {error ? (
            <div className="p-8 text-center text-red-500 text-sm">
              Errore DB: {error.message}
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              Nessun ordine ricevuto ancora
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      Data
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Ebook
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      Codice sconto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(orders as InboundOrder[]).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(order.created_at).toLocaleString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 text-gray-800">{order.email}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        {order.ebook}
                      </td>
                      <td className="px-4 py-3">
                        {order.discount_code ? (
                          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-mono px-2 py-0.5 rounded-md">
                            {order.discount_code}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
