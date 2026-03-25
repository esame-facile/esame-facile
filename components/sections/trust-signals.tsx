import { Zap, Target, Clock, BadgeCheck } from "lucide-react";

const signals = [
  {
    icon: Target,
    title: "Mirati per il tuo esame",
    description: "Niente fuffa: solo quello che esce all'esame, strutturato per capitoli.",
  },
  {
    icon: BadgeCheck,
    title: "Scritti da chi ha passato",
    description: "Ogni appunto è creato da studenti che hanno superato lo stesso esame.",
  },
  {
    icon: Clock,
    title: "Pronti in 30 secondi",
    description: "Paghi, scarichi il PDF e inizi a studiare. Zero attese.",
  },
  {
    icon: Zap,
    title: "Risparmia settimane",
    description: "Riassunti che condensano mesi di lezioni in poche ore di studio.",
  },
];

export function TrustSignals() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container-app">
        <h2 className="text-display-md text-center mb-10">
          Perché scegliere UniPass
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="p-4 rounded-brand bg-neutral-50 border border-neutral-200"
            >
              <signal.icon
                size={24}
                className="text-primary-400 mb-3"
              />
              <h3 className="text-body-sm font-bold mb-1">{signal.title}</h3>
              <p className="text-caption text-neutral-400">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
