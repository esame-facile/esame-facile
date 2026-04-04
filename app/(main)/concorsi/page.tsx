import Link from "next/link";
import { MessageCircle, CheckCircle, FileText, Target, Zap, ShieldCheck, BookOpen, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit Concorsi & Cultura Generale – Concorsi Facili",
  description:
    "Quiz e schemi per superare i concorsi pubblici: Carabinieri, Polizia di Stato, Guardia di Finanza, Accademia Militare, test Medicina. PDF pronti subito.",
};

const kits = [
  {
    emoji: "🪖",
    title: "Kit Carabinieri Allievi",
    description: "500+ quiz ufficiali su storia, italiano, geografia, scienze, logica e costituzione. Con risposte commentate.",
    badge: "Più richiesto",
    badgeColor: "bg-amber-400 text-neutral-900",
    price: "7,99€",
    topics: ["Storia d'Italia", "Grammatica italiana", "Geografia", "Costituzione", "Logica", "Scienze"],
    whatsapp: "https://wa.me/37258472379?text=Ciao!%20Voglio%20il%20Kit%20Carabinieri%20Allievi",
  },
  {
    emoji: "👮",
    title: "Kit Polizia di Stato",
    description: "Quiz completi per il concorso Allievi Agenti. Cultura generale, diritto, ordinamento dello Stato.",
    badge: "Popolare",
    badgeColor: "bg-blue-500 text-white",
    price: "7,99€",
    topics: ["Cultura generale", "Diritto costituzionale", "Ordinamento PS", "Logica", "Inglese base", "Attualità"],
    whatsapp: "https://wa.me/37258472379?text=Ciao!%20Voglio%20il%20Kit%20Polizia%20di%20Stato",
  },
  {
    emoji: "⚕️",
    title: "Kit Cultura Generale Medicina",
    description: "Le 300 domande di cultura generale del test di medicina. Logica, italiano, biologia, chimica, fisica.",
    badge: "65.000 candidati",
    badgeColor: "bg-green-500 text-white",
    price: "5,99€",
    topics: ["Ragionamento logico", "Comprensione testo", "Biologia", "Chimica", "Fisica", "Matematica"],
    whatsapp: "https://wa.me/37258472379?text=Ciao!%20Voglio%20il%20Kit%20Cultura%20Generale%20Medicina",
  },
  {
    emoji: "⭐",
    title: "Kit Guardia di Finanza",
    description: "Preparazione completa per il concorso Finanzieri semplici. Quiz di cultura generale e diritto.",
    badge: "In arrivo",
    badgeColor: "bg-neutral-300 text-neutral-700",
    price: "7,99€",
    topics: ["Cultura generale", "Diritto", "Matematica", "Storia", "Geografia", "Logica"],
    whatsapp: "https://wa.me/37258472379?text=Ciao!%20Sono%20interessato%20al%20Kit%20Guardia%20di%20Finanza",
    comingSoon: true,
  },
];

const faqs = [
  {
    q: "I quiz sono aggiornati alle prove reali?",
    a: "Sì. Ogni kit include domande tratte dalle ultime sessioni ufficiali del concorso, integrate con le materie più frequenti negli anni precedenti.",
  },
  {
    q: "In che formato ricevo il PDF?",
    a: "Dopo l'acquisto scrivi su WhatsApp e ti inviamo il PDF entro pochi minuti. Puoi stamparlo o studiarlo dallo smartphone.",
  },
  {
    q: "È adatto a chi parte da zero?",
    a: "Assolutamente sì. I kit sono strutturati per studenti che non sanno da dove iniziare: prima gli schemi riassuntivi per materia, poi i quiz con risposta commentata.",
  },
  {
    q: "Quante domande contiene ogni kit?",
    a: "Dipende dal kit: da 300 (Medicina) a 500+ (Carabinieri e Polizia). Ogni domanda ha risposta corretta e spiegazione.",
  },
  {
    q: "Posso usarlo anche per altri concorsi pubblici?",
    a: "Sì, i kit Carabinieri e Polizia coprono argomenti trasversali a quasi tutti i concorsi pubblici: storia, italiano, logica, costituzione, scienze.",
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
            PDF con 300–500 quiz ufficiali per Carabinieri, Polizia, Medicina e altri concorsi pubblici. Risposte commentate, pronto in minuti.
          </p>

          {/* Concorso badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Carabinieri", "Polizia di Stato", "G. di Finanza", "Medicina", "Acc. Militare", "Concorsi pubblici"].map((c) => (
              <span key={c} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-caption text-white">
                {c}
              </span>
            ))}
          </div>

          <a
            href="#kit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-brand bg-amber-400 text-neutral-900 text-body-sm font-bold hover:bg-amber-300 transition-colors"
          >
            Vedi i kit disponibili
          </a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-neutral-900 py-5">
        <div className="container-app">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { value: "500+", label: "Quiz per kit" },
              { value: "100k+", label: "Candidati/anno" },
              { value: "2025", label: "Aggiornato a" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-body-lg font-bold text-amber-400">{s.value}</p>
                <p className="text-caption text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KIT CARDS ── */}
      <section id="kit" className="py-14 bg-neutral-50">
        <div className="container-app">
          <h2 className="text-display-sm font-bold text-center mb-2">
            Scegli il tuo concorso
          </h2>
          <p className="text-body-sm text-neutral-500 text-center mb-8">
            Ogni kit è specifico per il concorso che devi affrontare.
          </p>

          <div className="space-y-4">
            {kits.map((kit) => (
              <div
                key={kit.title}
                className={`bg-white rounded-brand border p-5 shadow-sm ${kit.comingSoon ? "opacity-70 border-neutral-200" : "border-neutral-200"}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{kit.emoji}</span>
                    <div>
                      <p className="text-body-sm font-bold text-neutral-900 leading-tight">{kit.title}</p>
                      <span className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${kit.badgeColor}`}>
                        {kit.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-body-lg font-bold text-neutral-900">{kit.price}</p>
                </div>

                {/* Description */}
                <p className="text-body-sm text-neutral-600 mb-3">{kit.description}</p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {kit.topics.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {kit.comingSoon ? (
                  <a
                    href={kit.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-brand border border-green-400 text-green-600 text-body-sm font-semibold hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle size={15} />
                    Avvisami quando è disponibile
                  </a>
                ) : (
                  <a
                    href={kit.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-brand bg-green-500 text-white text-body-sm font-bold hover:bg-green-600 active:bg-green-700 transition-colors"
                  >
                    <MessageCircle size={15} />
                    Ricevi su WhatsApp – {kit.price}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COSA INCLUDE ── */}
      <section className="py-14 bg-white">
        <div className="container-app">
          <h2 className="text-display-sm font-bold text-center mb-2">
            Cosa trovi in ogni kit
          </h2>
          <p className="text-body-sm text-neutral-500 text-center mb-8">
            Strutturato per chi vuole prepararsi in modo serio e veloce.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileText, title: "Quiz ufficiali", desc: "Domande tratte dalle prove reali degli ultimi anni" },
              { icon: CheckCircle, title: "Risposte commentate", desc: "Ogni risposta ha una spiegazione per capire il perché" },
              { icon: BookOpen, title: "Schemi per materia", desc: "Riassunti veloci per ripetere storia, italiano, logica ecc." },
              { icon: Target, title: "Simulazioni d'esame", desc: "Quiz in sequenza come il test ufficiale, con punteggio" },
              { icon: Zap, title: "Pronto in 5 minuti", desc: "Scrivi su WhatsApp e ricevi il PDF subito" },
              { icon: ShieldCheck, title: "Aggiornato 2025", desc: "Allineato alle ultime tracce e banche dati ufficiali" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-brand bg-neutral-50 border border-neutral-200">
                <item.icon size={22} className="text-blue-500 mb-2" />
                <p className="text-body-sm font-bold mb-1">{item.title}</p>
                <p className="text-caption text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="py-14 bg-neutral-50">
        <div className="container-app">
          <h2 className="text-display-sm font-bold text-center mb-8">Come funziona</h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Scegli il kit", desc: "Seleziona il concorso per cui ti stai preparando." },
              { n: "2", title: "Scrivi su WhatsApp", desc: "Clicca il bottone e mandaci un messaggio con il nome del kit." },
              { n: "3", title: "Paga e ricevi", desc: "Ti inviamo il link di pagamento e subito dopo il PDF. In meno di 5 minuti." },
              { n: "4", title: "Studia e supera", desc: "Apri il PDF, inizia dai quiz, supera il concorso." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 items-start p-4 rounded-brand bg-white border border-neutral-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-caption font-bold text-white">{step.n}</span>
                </div>
                <div>
                  <p className="text-body-sm font-bold mb-0.5">{step.title}</p>
                  <p className="text-body-sm text-neutral-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 bg-white">
        <div className="container-app">
          <h2 className="text-display-sm font-bold text-center mb-8">Domande frequenti</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-neutral-50 border border-neutral-200 rounded-brand">
                <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none">
                  <p className="text-body-sm font-semibold">{faq.q}</p>
                  <ChevronDown size={16} className="text-neutral-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="px-4 pb-4 text-body-sm text-neutral-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 bg-blue-950">
        <div className="container-app text-center">
          <p className="text-caption text-blue-400 uppercase tracking-widest mb-2">Inizia oggi</p>
          <h2 className="text-display-sm font-bold text-white mb-3">
            Il prossimo concorso<br />lo superi tu.
          </h2>
          <p className="text-body-sm text-blue-300 mb-8 max-w-xs mx-auto">
            Scrivi su WhatsApp, scegli il kit e inizia a studiare in 5 minuti.
          </p>
          <a
            href="https://wa.me/37258472379?text=Ciao!%20Voglio%20prepararmi%20per%20un%20concorso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-brand bg-green-500 text-white text-body-sm font-bold hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={18} />
            Inizia su WhatsApp
          </a>
          <p className="text-caption text-blue-500 mt-4">
            Risposta entro pochi minuti · PDF consegnato subito
          </p>
        </div>
      </section>

      {/* ── BACK TO MAIN ── */}
      <div className="py-6 bg-neutral-50 text-center border-t border-neutral-200">
        <p className="text-caption text-neutral-400 mb-1">Cerchi i kit per gli esami universitari?</p>
        <Link href="/catalogo" className="text-body-sm text-primary-500 font-semibold hover:underline">
          Vai al catalogo Esame Facile →
        </Link>
      </div>
    </div>
  );
}
