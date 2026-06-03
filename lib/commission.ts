// Affiliate commission rules, kept in one place.
//
// Base rate is 20%. From 29 May 2026 (Italian time) Agnese (code "uni10")
// earns 30% on her new sales. Every other affiliate stays at 20%, and Agnese's
// sales made before that date also stay at 20%.

export const BASE_COMMISSION_RATE = 0.2;

const AGNESE_CODE = "uni10";
const AGNESE_NEW_RATE = 0.3;
// 29/05/2026 00:00 Italian time (CEST, UTC+2) = 28/05/2026 22:00 UTC
const AGNESE_RATE_CHANGE_AT = Date.parse("2026-05-28T22:00:00Z");

type CommissionSale = { amount: number; created_at: string };

/** Commission rate (e.g. 0.2 or 0.3) for a single sale of a given affiliate. */
export function commissionRate(sale: CommissionSale, affiliateCode?: string): number {
  if (
    affiliateCode?.toLowerCase() === AGNESE_CODE &&
    Date.parse(sale.created_at) >= AGNESE_RATE_CHANGE_AT
  ) {
    return AGNESE_NEW_RATE;
  }
  return BASE_COMMISSION_RATE;
}

/** Commission amount in euros for a single sale. */
export function saleCommission(sale: CommissionSale, affiliateCode?: string): number {
  return sale.amount * commissionRate(sale, affiliateCode);
}

/** Rate an affiliate earns on sales made right now (for info displays). */
export function currentCommissionRate(affiliateCode?: string, at: Date = new Date()): number {
  return commissionRate({ amount: 0, created_at: at.toISOString() }, affiliateCode);
}
