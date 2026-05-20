"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TrendingUp } from "lucide-react";

export default function AffiliatiLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/affiliati/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim().toLowerCase(), password }),
    });

    if (res.ok) {
      router.push("/affiliati/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Errore di accesso");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "radial-gradient(ellipse 120% 60% at 50% 0%, #4338ca 0%, #1e1b4b 40%, #09090b 70%)",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
          <TrendingUp size={14} className="text-indigo-400" />
        </div>
        <span className="text-sm font-bold text-white/80">Esame Facile</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Content */}
      <div className="px-6 pb-14 space-y-8">
        {/* Headline */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">
              Area affiliati
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Le tue<br />commissioni
          </h1>
          <p className="text-sm text-white/40 mt-2">
            Accedi per vedere vendite e guadagni
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoCapitalize="none"
              autoComplete="username"
              required
              className="w-full bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="w-full bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white rounded-2xl py-4 text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Accesso...</>
              : "Entra →"}
          </button>
        </form>
      </div>
    </div>
  );
}
