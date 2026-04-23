-- Create inbound_orders table
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/bfbsxzmqcbshnwiderjb/sql

CREATE TABLE IF NOT EXISTS public.inbound_orders (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text        NOT NULL,
  ebook         text        NOT NULL,
  discount_code text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS inbound_orders_email_idx ON public.inbound_orders (email);

-- Disable RLS (we only access via service role)
ALTER TABLE public.inbound_orders DISABLE ROW LEVEL SECURITY;
