"use client";

import { useState } from "react";
import { HelpCircle, X, ShoppingCart, Percent, CreditCard } from "lucide-react";

export function SalesInfoModal({ code }: { code: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-neutral-600 hover:text-neutral-400 transition-colors"
        aria-label="Come vengono tracciate le vendite"
      >
        <HelpCircle size={14} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-t-3xl px-5 pt-5 pb-10 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto mb-2" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Come funziona il tracciamento</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShoppingCart size={14} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">Acquisto con codice</p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    Quando qualcuno acquista un ebook su Esame Facile usando il tuo codice sconto <span className="text-indigo-400 font-mono font-semibold">{code.toUpperCase()}</span>, l&apos;ordine viene registrato automaticamente nel sistema.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Percent size={14} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">Commissione 20%</p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    Ricevi il <span className="text-white font-semibold">20%</span> su ogni vendita generata dal tuo codice. Ogni vendita tracciata vale <span className="text-green-400 font-semibold">€2</span> di commissione per te.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CreditCard size={14} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">Pagamento</p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    I pagamenti vengono effettuati manualmente. Le vendite segnate come <span className="text-green-400 font-semibold">Pagato</span> sono già state accreditate. Quelle <span className="text-amber-400 font-semibold">In attesa</span> verranno saldate al prossimo ciclo.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <p className="text-xs text-neutral-600 text-center pt-1">
              Per qualsiasi dubbio contatta il team di Esame Facile
            </p>
          </div>
        </div>
      )}
    </>
  );
}
