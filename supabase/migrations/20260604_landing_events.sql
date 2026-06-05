-- Tracciamento comportamento sulla landing (visite, scroll, click, uscite)
CREATE TABLE IF NOT EXISTS public.landing_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event text NOT NULL,                 -- view | scroll | buy_click | exit | alert_sent
  page text,                           -- pathname (es. /catalogo/diritto-commerciale)
  product_slug text,                   -- slug prodotto se applicabile
  value numeric,                       -- scroll % o durata ms, a seconda dell'evento
  meta jsonb,                          -- payload extra (referrer, device, maxScroll, buyClicked...)
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS landing_events_created_idx ON public.landing_events (created_at DESC);
CREATE INDEX IF NOT EXISTS landing_events_event_idx ON public.landing_events (event, created_at DESC);
CREATE INDEX IF NOT EXISTS landing_events_session_idx ON public.landing_events (session_id);

-- Inserimenti solo via service role (API server). RLS off come le altre tabelle operative.
ALTER TABLE public.landing_events DISABLE ROW LEVEL SECURITY;
