// Affiliate data stored as JSON in Supabase Storage (private bucket)
// Used instead of SQL tables since the project is owned by a different Supabase account

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "affiliate-data";
const FILE = "data.json";

export type Sale = {
  id: string;
  affiliate_id: string;
  amount: 10 | 20;
  paid_at: string | null;
  created_at: string;
};

export type Affiliate = {
  id: string;
  name: string;
  code: string;
  color: string;
  created_at: string;
};

export type AffiliateStore = {
  affiliates: Affiliate[];
  sales: Sale[];
};

export type AffiliateWithSales = Affiliate & {
  affiliate_sales: Sale[];
};

export async function readStore(): Promise<AffiliateStore> {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE}`,
    {
      headers: { Authorization: `Bearer ${SERVICE_ROLE}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return { affiliates: [], sales: [] };
  return res.json();
}

export async function writeStore(data: AffiliateStore): Promise<void> {
  await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      "x-upsert": "true",
    },
    body: JSON.stringify(data),
  });
}

// Transform flat store into nested affiliate+sales structure for the dashboard
export function nestAffiliates(store: AffiliateStore): AffiliateWithSales[] {
  return store.affiliates.map((a) => ({
    ...a,
    affiliate_sales: store.sales
      .filter((s) => s.affiliate_id === a.id)
      .sort(
        (x, y) =>
          new Date(x.created_at).getTime() - new Date(y.created_at).getTime()
      ),
  }));
}
