import { Resend } from "resend";
import { OrderConfirmation } from "@/types";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/format-price";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

function buildEmailHtml(productName: string, price: string, downloadUrl: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Il tuo Kit è pronto</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#4f46e5;padding:28px 32px;text-align:center;">
              <p style="margin:0;color:#c7d2fe;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Esame Facile</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Il tuo Kit è pronto!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                Ciao! Il tuo acquisto è confermato. Qui sotto trovi il link per scaricare il tuo kit.
              </p>

              <!-- Product box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Prodotto acquistato</p>
                    <p style="margin:0;color:#111827;font-size:16px;font-weight:700;">${productName}</p>
                    <p style="margin:4px 0 0;color:#4f46e5;font-size:15px;font-weight:600;">${price}</p>
                  </td>
                </tr>
              </table>

              <!-- Download button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:8px;">
                      Scarica il Kit
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;color:#92400e;font-size:13px;line-height:1.5;">
                      <strong>Nota:</strong> Il link di download è valido per 48 ore e consente massimo 5 download. Salva il PDF sul tuo dispositivo.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
                Hai problemi con il download? Scrivici su WhatsApp e ti aiutiamo subito.<br/>
                Buono studio!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} Esame Facile · <a href="${SITE_CONFIG.url}" style="color:#9ca3af;">esamefacile.site</a>
              </p>
              <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">
                Hai domande? Scrivici a <a href="mailto:${SITE_CONFIG.email}" style="color:#9ca3af;">${SITE_CONFIG.email}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendPurchaseEmail(order: OrderConfirmation) {
  const item = order.items[0];
  const productName = item?.product_name ?? "Kit Esame";
  const price = formatPrice(item?.price ?? order.total);
  const downloadUrl = item?.download_url ?? SITE_CONFIG.url;

  const { error } = await getResend().emails.send({
    from: `Esame Facile <${SITE_CONFIG.email}>`,
    to: order.customer_email,
    subject: `Il tuo Kit è pronto — Esame Facile`,
    html: buildEmailHtml(productName, price, downloadUrl),
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
