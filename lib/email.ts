import { Resend } from "resend";
import { OrderConfirmation } from "@/types";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/format-price";

const TEMPLATE_ID = "10897e55-a104-4e29-a65e-ba8f987c7fc3";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

export async function sendPurchaseEmail(order: OrderConfirmation) {
  const item = order.items[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (getResend().emails.send as any)({
    from: `${SITE_CONFIG.name.trim()} <info@${SITE_CONFIG.email.split("@")[1]}>`,
    to: order.customer_email,
    subject: `Il tuo Kit è pronto — Esame Facile`,
    template: TEMPLATE_ID,
    variables: {
      PRODUCT_NAME: item?.product_name ?? "Kit Esame",
      PRICE: formatPrice(item?.price ?? order.total),
      DOWNLOAD_URL: item?.download_url ?? SITE_CONFIG.url,
    },
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
