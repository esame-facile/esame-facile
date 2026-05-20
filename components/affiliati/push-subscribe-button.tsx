"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, CheckCircle, Smartphone } from "lucide-react";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  // iOS Safari
  if ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone) return true;
  // Android / Desktop
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  return false;
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function PushSubscribeButton({ vapidKey }: { vapidKey: string }) {
  const [state, setState] = useState<
    "loading-init" | "needs-install" | "idle" | "requesting" | "subscribed" | "unsupported"
  >("loading-init");

  useEffect(() => {
    // Not supported at all
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      // iOS in Safari browser (not installed): show install prompt
      if (isIOS() && !isStandalone()) {
        setState("needs-install");
      } else {
        setState("unsupported");
      }
      return;
    }

    // iOS installed PWA or Android: check existing subscription
    navigator.serviceWorker.ready.then((reg) =>
      reg.pushManager.getSubscription().then((sub) => {
        setState(sub ? "subscribed" : "idle");
      })
    );
  }, []);

  async function handleSubscribe() {
    setState("requesting");
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
      setState(res.ok ? "subscribed" : "idle");
    } catch {
      setState("idle");
    }
  }

  if (state === "loading-init" || state === "unsupported") return null;

  if (state === "subscribed") {
    return (
      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
        <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
        <p className="text-xs text-green-300">Notifiche attive — ti avvisiamo ad ogni vendita</p>
      </div>
    );
  }

  if (state === "needs-install") {
    return (
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl px-4 py-3.5 space-y-2">
        <div className="flex items-center gap-2">
          <Smartphone size={15} className="text-indigo-400 flex-shrink-0" />
          <p className="text-xs font-semibold text-indigo-300">Installa l&apos;app per le notifiche</p>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Tocca <span className="text-neutral-300 font-medium">Condividi</span> in Safari, poi{" "}
          <span className="text-neutral-300 font-medium">&quot;Aggiungi alla schermata Home&quot;</span>.
          Apri l&apos;app dalla home screen e le notifiche si attiveranno da qui.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={state === "requesting"}
      className="flex items-center gap-2 w-full bg-indigo-600/10 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl px-4 py-3 transition-colors disabled:opacity-50"
    >
      {state === "requesting"
        ? <Loader2 size={15} className="text-indigo-400 animate-spin flex-shrink-0" />
        : <Bell size={15} className="text-indigo-400 flex-shrink-0" />}
      <div className="text-left">
        <p className="text-xs font-semibold text-indigo-300">Abilita notifiche</p>
        <p className="text-xs text-neutral-500">Ricevi un avviso appena arriva una vendita</p>
      </div>
    </button>
  );
}
