"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #1e1b4b 0%, #0a0a0a 55%)" }}>
      <div className="px-6 pt-8">
        <span className="text-sm font-bold text-indigo-400">Esame Facile</span>
      </div>
      <div className="flex flex-col justify-end flex-1 px-6 pb-12">
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            Area riservata affiliati
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Le tue<br />commissioni
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoCapitalize="none"
            autoComplete="username"
            required
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
          />
          {error && <p className="text-red-400 text-sm px-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Accesso...</> : "Entra →"}
          </button>
        </form>
      </div>
    </div>
  );
}
