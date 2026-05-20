"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, CheckCircle } from "lucide-react";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export function PushSubscribeButton({ vapidKey }: { vapidKey: string }) {
  const [state, setState] = useState<"idle" | "loading" | "subscribed" | "unsupported">("idle");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }
    navigator.serviceWorker.ready.then((reg) =>
      reg.pushManager.getSubscription().then((sub) => {
        if (sub) setState("subscribed");
      })
    );
  }, []);

  async function handleSubscribe() {
    setState("loading");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey).buffer as ArrayBuffer,
      });
      const res = await fetch("/api/affiliati/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (res.ok) setState("subscribed");
      else setState("idle");
    } catch {
      setState("idle");
    }
  }

  if (state === "unsupported") return null;

  if (state === "subscribed") {
    return (
      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
        <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
        <p className="text-xs text-green-300">Notifiche attive — ti avvisiamo ad ogni vendita</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={state === "loading"}
      className="flex items-center gap-2 w-full bg-indigo-600/10 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl px-4 py-3 transition-colors disabled:opacity-50"
    >
      {state === "loading"
        ? <Loader2 size={15} className="text-indigo-400 animate-spin flex-shrink-0" />
        : <Bell size={15} className="text-indigo-400 flex-shrink-0" />}
      <div className="text-left">
        <p className="text-xs font-semibold text-indigo-300">Abilita notifiche</p>
        <p className="text-xs text-neutral-500">Ricevi un avviso appena arriva una vendita</p>
      </div>
    </button>
  );
}
