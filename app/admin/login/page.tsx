"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Smartphone, Share, Plus } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/affiliates");
      router.refresh();
    } else {
      setError("Password errata");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "radial-gradient(ellipse 120% 60% at 50% 0%, #b45309 0%, #451a03 40%, #09090b 70%)",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <ShieldCheck size={14} className="text-amber-400" />
        </div>
        <span className="text-sm font-bold text-white/80">Esame Facile</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Content */}
      <div className="px-6 pb-14 space-y-8">
        {/* Headline */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
              Quartier Generale
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Controllo<br />totale
          </h1>
          <p className="text-sm text-white/40 mt-2">
            Accedi per vedere vendite e commissioni di tutte
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            autoComplete="current-password"
            required
            className="w-full bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/60 focus:bg-white/10 transition-all"
          />

          {error && <p className="text-red-400 text-sm px-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-white rounded-2xl py-4 text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Accesso...</>
              : "Entra →"}
          </button>
        </form>

        {/* Install instructions */}
        <div className="border-t border-white/[0.06] pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone size={13} className="text-neutral-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Aggiungi alla schermata home
            </p>
          </div>
          <div className="space-y-2">
            {[
              { icon: <span className="text-base leading-none">🧭</span>, text: "Apri questa pagina in Safari" },
              { icon: <Share size={12} className="text-neutral-400" />, text: 'Tocca l\'icona "Condividi"' },
              { icon: <Plus size={12} className="text-neutral-400" />, text: '"Aggiungi alla schermata Home"' },
              { icon: <Smartphone size={12} className="text-neutral-400" />, text: "Apri l'app dalla home e accedi" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-neutral-500">{i + 1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex-shrink-0">{step.icon}</span>
                  <p className="text-xs text-neutral-500">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
