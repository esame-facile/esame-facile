"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, Mail, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/format-price";

interface OrderData {
  id: string;
  email: string;
  total: number;
  status: string;
  items: { product_name: string; price: number }[];
}

async function fetchOrderWithRetry(sessionId: string, maxAttempts = 6): Promise<OrderData | null> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`/api/checkout/status?session_id=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) return data;
      }
    } catch {}
    if (i < maxAttempts - 1) await new Promise(r => setTimeout(r, 2000));
  }
  return null;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) { setLoading(false); return; }
    fetchOrderWithRetry(sessionId).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [searchParams]);

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-display-sm mb-2">Acquisto completato!</h1>
        <p className="text-body-md text-neutral-500 max-w-xs mx-auto">
          Ti abbiamo inviato un&apos;email con il link per scaricare il tuo kit.
        </p>
      </div>

      {/* Order summary */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-6 text-neutral-400">
          <Loader2 size={24} className="animate-spin" />
          <p className="text-body-sm">Carico il tuo ordine…</p>
        </div>
      ) : order ? (
        <div className="bg-white border border-neutral-200 rounded-brand p-5 mb-6 shadow-sm">
          <p className="text-caption text-neutral-400 uppercase tracking-wide mb-3">Il tuo ordine</p>
          <div className="space-y-3 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-body-sm font-semibold text-neutral-900">{item.product_name}</p>
                  <p className="text-caption text-neutral-400">Kit Superamento Esame</p>
                </div>
                <span className="text-body-sm font-semibold text-neutral-700">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-100 pt-3 flex justify-between">
            <span className="text-body-sm font-bold">Totale</span>
            <span className="text-body-sm font-bold">{formatPrice(order.total)}</span>
          </div>
          {order.email && (
            <p className="text-caption text-neutral-400 mt-3 flex items-center gap-1.5">
              <Mail size={12} />
              Email inviata a <strong>{order.email}</strong>
            </p>
          )}
        </div>
      ) : null}

      {/* Steps */}
      <div className="bg-primary-950 rounded-brand p-5 mb-6 space-y-4">
        <p className="text-body-sm font-bold text-white mb-1">Cosa succede adesso</p>
        {[
          { icon: Mail, text: "Controlla la tua email (anche spam)" },
          { icon: Download, text: "Clicca sul bottone \"Scarica il tuo kit\"" },
          { icon: CheckCircle, text: "Inizia a studiare subito!" },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-primary-800 flex items-center justify-center flex-shrink-0">
              <step.icon size={14} className="text-primary-300" />
            </div>
            <p className="text-body-sm text-neutral-300">{step.text}</p>
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="text-center mb-8">
        <p className="text-body-sm text-neutral-400 mb-3">Problemi con il download?</p>
        <a
          href="https://wa.me/37258472379"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white text-body-sm font-semibold hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={16} />
          Scrivici su WhatsApp
        </a>
      </div>

      {/* CTA */}
      <Link href="/catalogo">
        <Button variant="secondary" className="w-full">Scopri altri kit</Button>
      </Link>
    </div>
  );
}
