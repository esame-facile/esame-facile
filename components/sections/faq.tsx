"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Cosa sono i Kit Superamento Esame?",
    a: "Sono guide strategiche con schemi, trucchi e metodi di studio creati da studenti che hanno superato l'esame. Ogni kit è verificato per garantire qualità e completezza.",
  },
  {
    q: "Come ricevo il materiale dopo l'acquisto?",
    a: "Subito dopo il pagamento ricevi un'email con il link di download. Il link è valido per 48 ore e puoi scaricare il file fino a 5 volte.",
  },
  {
    q: "In che formato sono i kit?",
    a: "Tutti i kit sono in formato PDF, facilmente leggibili da qualsiasi dispositivo: smartphone, tablet o computer.",
  },
  {
    q: "Posso avere il rimborso?",
    a: "In caso di problemi tecnici o se il contenuto non corrisponde a quanto descritto sulla pagina, contattaci entro 7 giorni dall'acquisto su WhatsApp. Valutiamo ogni richiesta singolarmente secondo i nostri Termini e Condizioni.",
  },
  {
    q: "Il pagamento è sicuro?",
    a: "Assolutamente sì. Utilizziamo Stripe, il sistema di pagamento usato da milioni di aziende nel mondo. Non memorizziamo i dati della tua carta.",
  },
  {
    q: "I kit vanno bene per qualsiasi università?",
    a: "I kit coprono argomenti standard che si trovano nella maggior parte dei corsi universitari italiani. Schemi e metodi sono applicabili ovunque.",
  },
  {
    q: "Come posso contattarvi?",
    a: "Puoi scriverci a info@esamefacile.site o tramite la pagina Contatti. Rispondiamo entro 24 ore.",
  },
  {
    q: "Posso diventare un autore?",
    a: "Certo! Se hai materiale di qualità e vuoi guadagnare aiutando altri studenti, scrivici a info@esamefacile.site con un campione.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16">
      <div className="container-app">
        <h2 className="text-display-md text-center mb-10">
          Domande frequenti
        </h2>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-brand border border-neutral-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full p-4 text-left"
              >
                <span className="text-body-sm font-medium text-neutral-900 pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-neutral-400 flex-shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-body-sm text-neutral-500">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
