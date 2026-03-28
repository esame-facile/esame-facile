import Link from "next/link";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-neutral-900" />
      <div className="container-app relative z-10 text-center pt-10 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/30 text-caption text-accent-300 mb-4">
          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse-slow" />
          Kit verificati da studenti come te
        </div>

        <h1 className="text-[1.75rem] md:text-[3.5rem] font-bold leading-tight mb-4 text-white">
          Basta notti in bianco.<br />
          <span className="text-gradient">Passa al primo colpo.</span>
        </h1>

        <p className="text-body-lg text-neutral-300 max-w-sm mx-auto mb-8">
          Schemi, trucchi e strategie per passare l&apos;esame. Creati da chi ce l&apos;ha fatta.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/catalogo">
            <Button size="lg" className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-neutral-900 font-bold">
              Scopri i Kit
            </Button>
          </Link>
          <Link href="/#come-funziona">
            <button className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-brand text-body-lg px-6 py-3 w-full sm:w-auto border border-neutral-500 text-white hover:bg-white/10 active:scale-[0.97]">
              Come funziona
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
