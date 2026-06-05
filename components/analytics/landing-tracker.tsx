"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type TrackState = {
  maxScroll: number;
  start: number;
  buyClicked: boolean;
  milestones: Set<number>;
  sentExit: boolean;
};

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("ef_sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("ef_sid", id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function slugFromPath(path: string): string | null {
  const m = path.match(/^\/catalogo\/([^/?#]+)/);
  return m ? m[1] : null;
}

export function LandingTracker() {
  const pathname = usePathname();
  const stateRef = useRef<TrackState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sid = getSessionId();
    const page = pathname;
    const slug = slugFromPath(pathname);
    const st: TrackState = {
      maxScroll: 0,
      start: Date.now(),
      buyClicked: false,
      milestones: new Set<number>(),
      sentExit: false,
    };
    stateRef.current = st;

    const post = (
      event: string,
      value?: number,
      meta?: Record<string, unknown>,
      beacon = false
    ) => {
      const payload = JSON.stringify({ session_id: sid, event, page, product_slug: slug, value, meta });
      try {
        if (beacon && navigator.sendBeacon) {
          navigator.sendBeacon("/api/track", new Blob([payload], { type: "text/plain" }));
        } else {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        /* no-op */
      }
    };

    post("view", undefined, {
      referrer: document.referrer || null,
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop",
    });

    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.round((h.scrollTop / scrollable) * 100)) : 100;
      if (pct > st.maxScroll) st.maxScroll = pct;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !st.milestones.has(m)) {
          st.milestones.add(m);
          post("scroll", m);
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (a.hasAttribute("data-track-buy") || /elitewebconsult\.com|buy\.stripe\.com/.test(href)) {
        st.buyClicked = true;
        post("buy_click", undefined, { href: href.slice(0, 200) });
      }
    };

    const sendExit = () => {
      if (st.sentExit) return;
      st.sentExit = true;
      post("exit", Date.now() - st.start, { maxScroll: st.maxScroll, buyClicked: st.buyClicked }, true);
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") sendExit();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", sendExit);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", sendExit);
      sendExit();
    };
  }, [pathname]);

  return null;
}
