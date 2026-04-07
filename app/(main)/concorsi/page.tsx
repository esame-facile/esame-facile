import { Target, Zap, ShieldCheck, BookOpen, ChevronDown, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit Concorsi & Cultura Generale – Concorsi Facili",
  description:
    "Quiz e schemi per superare i concorsi pubblici: Carabinieri, Polizia di Stato, Guardia di Finanza, test Medicina. PDF con soluzioni commentate, pronto subito.",
};

const kits = [
  {
    emoji: "🪖",
    title: "Kit Allievi Carabinieri",
    description:
      "280+ quiz ufficiali su storia, italiano, geografia, scienze, logica e costituzione. Con risposte commentate e 3 simulazioni complete.",
    badge: "Più richiesto",
    badgeColor: "bg-amber-400 text-neutral-900",
    price: "7,99€",
    priceNote: "una tantum · PDF immediato",
    topics: ["Storia d'Italia", "Grammatica italiana", "Costituzione", "Scienze", "Logica", "3 simulazioni"],
    pages: "47 pagine",
    stripeUrl: "https://buy.stripe.com/9B65kE2eHgkW7Bq7xw9IQ0t",
    comingSoon: false,
  },
  {
    emoji: "👮",
    title: "Kit Allievi Agenti Polizia",
    description:
      "5 simulazioni con 150+ quiz su Diritto Costituzionale, ordinamento PS, grammatica, logica, scienze e inglese di base.",
    badge: "Popolare",
    badgeColor: "bg-blue-500 text-white",
    price: "7,99€",
    priceNote: "una tantum · PDF immediato",
    topics: ["Diritto Costituzionale", "Ordinamento PS", "Grammatica", "Logica", "Scienze", "5 simulazioni"],
    pages: "44 pagine",
    stripeUrl: "https://buy.stripe.com/cNiaEY9H9gkW8FuaJI9IQ0u",
    comingSoon: false,
  },
  {
    emoji: "⚕️",
    title: "Kit Cultura Generale Medicina",
    description:
      "4 simulazioni TOLC-MED su logica, biologia, chimica, fisica e matematica. Schemi riassuntivi per ogni materia con soluzioni commentate.",
    badge: "TOLC-MED 2025",
    badgeColor: "bg-green-500 text-white",
    price: "5,99€",
    priceNote: "una tantum · PDF immediato",
    topics: ["Ragionamento logico", "Biologia", "Chimica", "Fisica & Matematica", "Comprensione testi", "4 simulazioni"],
    pages: "34 pagine",
    stripeUrl: "https://buy.stripe.com/9B68wQ06z4Ce8FuaJI9IQ0v",
    comingSoon: false,
  },
  {
    emoji: "⭐",
    title: "Kit Guardia di Finanza",
    description:
      "Preparazione completa per il concorso Finanzieri semplici. Quiz di cultura generale, diritto e matematica. In lavorazione.",
    badge: "In arrivo",
    badgeColor: "bg-neutral-300 text-neutral-700",
    price: "7,99€",
    priceNote: "",
    topics: ["Cultura generale", "Diritto", "Matematica", "Storia", "Geografia", "Logica"],
    pages: "",
    stripeUrl: "",
    comingSoon: true,
  },
];

const features = [
  { icon: Target, title: "Domande ufficiali", desc: "Tratte dalle ultime sessioni reali del concorso" },
  { icon: BookOpen, title: "Soluzioni commentate", desc: "Ogni risposta spiegata con la norma o il concetto" },
  { icon: Zap, title: "PDF immediato", desc: "Link al download subito dopo il pagamento" },
  { icon: ShieldCheck, title: "Aggiornato 2025", desc: "Include le novità normative dell'ultimo anno" },
];

const faqs = [
  {
    q: "I quiz sono aggiornati alle prove reali?",
    a: "Sì. Ogni kit include domande tratte dalle ultime sessioni ufficiali del concorso, integrate con le materie più frequenti degli anni precedenti.",
  },
  {
    q: "Come ricevo il PDF dopo il pagamento?",
    a: "Dopo il pagamento Stripe ricevi un'email con il link per scaricare il PDF direttamente. Il download è disponibile per 48 ore.",
  },
  {
    q: "È adatto a chi parte da zero?",
    a: "Assolutamente sì. I kit includono schemi riassuntivi per ogni materia prima delle simulazioni, così puoi studiare la teoria e poi allenarti con i quiz.",
  },
  {
    q: "Quante domande contiene ogni kit?",
    a: "Carabinieri: 280+ domande in 3 simulazioni. Polizia: 150+ in 5 simulazioni. Medicina: 120+ in 4 simulazioni. Ogni risposta ha la spiegazione.",
  },
  {
    q: "Posso usarlo anche per altri concorsi?",
    a: "Sì, i kit Carabinieri e Polizia coprono argomenti trasversali (storia, italiano, logica, costituzione) utili per quasi tutti i concorsi pubblici.",
  },
  {
    q: "Posso stamparlo?",
    a: "Certo. Il PDF è ottimizzato sia per la lettura su schermo che per la stampa in formato A4.",
  },
];

export default function ConcorsiPage() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-neutral-900" />
        <div className="container-app relative z-10 text-center pt-10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-caption text-amber-300 mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Quiz aggiornati alle prove reali 2025
          </div>

          <h1 className="text-[1.75rem] font-bold leading-tight mb-4 text-white">
            Supera il concorso.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              Al primo tentativo.
            </span>
          </h1>

          <p className="text-body-md text-blue-200 max-w-xs mx-auto mb-8">
            PDF con 120–280 quiz ufficiali per Carabinieri, Polizia, Medicina e altri concorsi pubblici.
            Simulazioni complete, soluzioni commentate.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[
              { v: "650+", l: "Quiz totali" },
              { v: "3", l: "Concorsi" },
              { v: "48h", l: "Accesso PDF" },
            ].map(({ v, l }) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-white">{v}</div>
                <div className="text-[11px] text-blue-300 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KIT CARDS ── */}
      <section className="container-app py-8 space-y-4">
        <h2 className="text-heading-md font-bold text-neutral-900 mb-2">Scegli il tuo kit</h2>
        <p className="text-body-sm text-neutral-500 mb-6">Pagamento sicuro via Stripe · PDF subito dopo l&apos;acquisto</p>

        {kits.map((kit) => (
          <div
            key={kit.title}
            className={`rounded-2xl border overflow-hidden shadow-sm ${kit.comingSoon ? "opacity-60" : ""}`}
          >
            {/* Card header */}
            <div className="bg-neutral-50 border-b px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{kit.emoji}</span>
                <div>
                  <div className="font-bold text-neutral-900 text-body-md leading-tight">{kit.title}</div>
                  {kit.pages && (
                    <div className="text-caption text-neutral-400">{kit.pages}</div>
                  )}
                </div>
              </div>
              <span className={`text-caption font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${kit.badgeColor}`}>
                {kit.badge}
              </span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4">
              <p className="text-body-sm text-neutral-600 mb-3">{kit.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {kit.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              {kit.comingSoon ? (
                <div className="flex items-center justify-between">
                  <span className="text-body-lg font-bold text-neutral-400">{kit.price}</span>
                  <span className="bg-neutral-200 text-neutral-500 text-body-sm font-semibold px-4 py-2 rounded-xl">
                    Prossimamente
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-lg font-bold text-neutral-900">{kit.price}</span>
                    {kit.priceNote && (
                      <div className="text-[11px] text-neutral-400 mt-0.5">{kit.priceNote}</div>
                    )}
                  </div>
                  <a
                    href={kit.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-body-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    Acquista ora →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-neutral-50 py-8">
        <div className="container-app">
          <h2 className="text-heading-sm font-bold text-neutral-900 mb-5 text-center">
            Cosa includono tutti i kit
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-3 border border-neutral-100">
                <Icon size={18} className="text-blue-600 mb-2" />
                <div className="font-bold text-body-sm text-neutral-900">{title}</div>
                <div className="text-caption text-neutral-500 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="container-app py-8">
        <h2 className="text-heading-sm font-bold text-neutral-900 mb-5 text-center">Come funziona</h2>
        <div className="space-y-3">
          {[
            { n: "1", t: "Scegli il kit", d: "Seleziona il concorso per cui vuoi prepararti" },
            { n: "2", t: "Paga in sicurezza", d: "Stripe · carta di credito, Apple Pay o Google Pay" },
            { n: "3", t: "Ricevi il PDF", d: "Link di download immediato via email · 48h di accesso" },
            { n: "4", t: "Studia e supera", d: "Schemi riassuntivi → simulazioni → soluzioni commentate" },
          ].map(({ n, t, d }) => (
            <div key={n} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-body-sm flex items-center justify-center shrink-0 mt-0.5">
                {n}
              </div>
              <div>
                <div className="font-bold text-body-sm text-neutral-900">{t}</div>
                <div className="text-caption text-neutral-500">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-neutral-50 py-8">
        <div className="container-app">
          <h2 className="text-heading-sm font-bold text-neutral-900 mb-5 text-center">Domande frequenti</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-neutral-100 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none">
                  <span className="font-semibold text-body-sm text-neutral-900 pr-4">{q}</span>
                  <ChevronDown
                    size={16}
                    className="text-neutral-400 shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-4 pb-3 text-body-sm text-neutral-600">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="container-app py-10 text-center">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6">
          <Award size={32} className="text-amber-400 mx-auto mb-3" />
          <h2 className="text-heading-sm font-bold text-white mb-2">Il concorso non aspetta.</h2>
          <p className="text-body-sm text-blue-200 mb-5 max-w-xs mx-auto">
            Inizia a prepararti oggi con quiz aggiornati alle prove reali 2025.
          </p>
          <a
            href="https://buy.stripe.com/9B65kE2eHgkW7Bq7xw9IQ0t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold text-body-md px-6 py-3 rounded-xl transition-colors"
          >
            Inizia ora →
          </a>
        </div>
      </section>
    </div>
  );
}
