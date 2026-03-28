import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marco R.",
    faculty: "Ingegneria",
    text: "Ho comprato Analisi 1 tre giorni prima dell'esame. Non dico che sia magia, ma 25 non me lo aspettavo proprio.",
    rating: 5,
  },
  {
    name: "Giulia T.",
    faculty: "Giurisprudenza",
    text: "Diritto Privato riassunto in modo che si capisce davvero, non come il libro da 900 pagine. Soldi spesi bene.",
    rating: 5,
  },
  {
    name: "Ale",
    faculty: "Ingegneria",
    text: "Fisica 1 era il mio incubo. Con questo kit ho finalmente capito la termodinamica, cosa che il prof non è riuscito a fare in 3 mesi.",
    rating: 5,
  },
  {
    name: "Sara L.",
    faculty: "Medicina",
    text: "Per Anatomia serviva qualcosa di schematico. Questo kit è esattamente quello, niente fuffa. 4 stelle perché mancano un paio di immagini.",
    rating: 4,
  },
  {
    name: "Fede",
    faculty: "Economia",
    text: "Statistica mi faceva schifo. Ho preso il kit, studiato due weekend e passato con 28. Li vale tutti i 20 euro.",
    rating: 5,
  },
  {
    name: "Chiara P.",
    faculty: "Scienze",
    text: "Chimica era l'ultimo esame che mi mancava. Comprato il kit lunedì, passato venerdì. Non ci credo ancora.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "text-accent-400 fill-accent-400" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="flex-shrink-0 w-[260px] p-4 rounded-brand bg-white border border-neutral-200 shadow-card snap-start">
      <Stars count={review.rating} />
      <p className="text-body-sm text-neutral-700 mt-2 mb-3 line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>
      <div>
        <p className="text-caption font-bold text-neutral-900">{review.name}</p>
        <p className="text-caption text-neutral-400">{review.faculty}</p>
      </div>
    </div>
  );
}

export function ReviewsMarquee() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="container-app mb-6">
        <h2 className="text-display-md text-center">
          Cosa dicono gli studenti
        </h2>
      </div>
      <div className="relative flex">
        <div className="flex animate-marquee-slow gap-4 pr-4">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
        <div className="flex animate-marquee-slow2 gap-4 pr-4 absolute top-0">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.name}-dup-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
