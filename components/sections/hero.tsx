import Link from "next/link";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-neutral-900" />
      <div className="container-app relative z-10 text-center pt-10 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/30 text-caption text-accent-300 mb-4">
          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse-slow" />
          Appunti verificati da studenti come te
        </div>

        <h1 className="text-display-lg md:text-[3.5rem] leading-tight mb-4 text-white">
          Il{" "}
          <span className="text-gradient">cheat code</span>{" "}
          <br />
          per i tuoi esami.
        </h1>

        <p className="text-body-lg text-neutral-300 max-w-sm mx-auto mb-8">
          Riassunti mirati, schemi pronti e trucchi per passare. Creati da chi ce l&apos;ha fatta.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/catalogo">
            <Button size="lg" className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-neutral-900 font-bold">
              Trova i tuoi appunti
            </Button>
          </Link>
          <Link href="/#come-funziona">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto border-neutral-600 text-neutral-200 hover:bg-neutral-800">
              Come funziona
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
