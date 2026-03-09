# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**UniPass** is an Italian e-commerce platform selling university study materials (PDF summaries, ebooks, outlines). Traffic is 100% from TikTok — the experience is **exclusively mobile-first**. All UI text is in Italian, prices in EUR (stored as integer cents).

Live at: https://unipass-virid.vercel.app | Deploy: Vercel (auto-deploy on push to main)

## Commands

```bash
cd unipass
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Local webhook testing
```

No test framework is configured. There is no test suite.

## Architecture

**Stack:** Next.js 14.2 (App Router), React 18, TypeScript (strict), Tailwind CSS 3.4, Supabase, Stripe, Resend, Zustand, Framer Motion

**Path alias:** `@/*` maps to project root (e.g., `@/lib/utils`, `@/components/ui/button`)

### Route Groups

- `app/(main)/` — Pages with shared Navbar + Footer layout
  - `page.tsx` — Homepage (Hero, SocialProof, HowItWorks, FeaturedProducts, TrustSignals, FAQ, CTA)
  - `catalogo/page.tsx` — Product listing (client component with filters/search)
  - `catalogo/[slug]/page.tsx` — Product detail (server component with JSON-LD)
  - `checkout/` — Cart, success, cancel pages
  - `chi-siamo/`, `contatti/`, `privacy/`, `termini/` — Static pages
- `app/link/page.tsx` — Standalone link-in-bio page (no navbar/footer)

### API Routes

- `GET /api/products` — List with filters, sort, pagination
- `GET /api/products/[slug]` — Product detail with reviews
- `GET /api/categories` — All categories
- `GET /api/search` — Full-text search (Italian config with unaccent)
- `POST /api/checkout` — Create Stripe Checkout session + pending order
- `GET /api/checkout/status` — Check session status
- `POST /api/webhooks/stripe` — Fulfill order, create download tokens, send email
- `GET /api/download/[token]` — Validate token, redirect to signed URL
- `POST /api/reviews` — Submit review (requires order verification)

### Key Modules

**Supabase clients** — Three separate clients for different contexts:
- `lib/supabase.ts` → `createClient()` — Browser client (uses `@supabase/ssr`)
- `lib/supabase-server.ts` → `createServerComponentClient()` — Server components (reads cookies)
- `lib/supabase-server.ts` → `createAdminClient()` — Service role for webhooks/admin ops (bypasses RLS)

**Stripe** — `lib/stripe.ts` exports a lazy singleton via Proxy pattern. Use `stripe` import directly or `getStripeServer()`.

**Cart state** — Zustand store at `store/cart-store.ts`, persisted to localStorage. The `hooks/use-cart.ts` hook wraps it with SSR hydration awareness via `CartHydration` provider. Always use the hook, not the store directly.

**Prices** — Stored as integer cents in DB. Use `lib/format-price.ts` → `formatPrice(cents)` for display (outputs "14,99 €").

**Config** — `lib/constants.ts` has `SITE_CONFIG`, `DOWNLOAD_CONFIG` (5 max downloads, 48h expiry, 60s signed URLs), navigation items, and university list.

**Analytics** — `lib/analytics.ts` provides `trackEvent()` wrapper for GA4 + TikTok Pixel + Meta Pixel. The `Analytics` component in root layout loads the scripts.

**UI components** — `components/ui/` uses CVA (class-variance-authority) for variants. `cn()` from `lib/utils.ts` = clsx + tailwind-merge.

### Database

Supabase PostgreSQL with 6 tables: `categories`, `products`, `orders`, `order_items`, `download_tokens`, `reviews`. RLS enabled on all tables. Types in `types/database.ts`.

Seed data: 4 categories (Economia, Giurisprudenza, Ingegneria, Lettere e Filosofia), 10 products (prices 999-1799 cents).

### Payment Flow

1. User adds items → Zustand cart → goes to `/checkout` → enters email → clicks pay
2. `POST /api/checkout` validates with Zod, verifies prices match DB (anti-tampering), creates Stripe Checkout Session
3. User pays on Stripe hosted page
4. Stripe webhook creates order + order_items + download_tokens, sends email via Resend
5. Success page shows download links; `GET /api/download/[token]` validates and redirects to Supabase Storage signed URL

## Development Rules

- **TypeScript strict.** No `any`, no `@ts-ignore`.
- **Server Components by default.** Only add `"use client"` when interactivity is needed.
- **Mobile-first CSS.** Write for mobile, add `md:`/`lg:` breakpoints only when needed. Touch targets min 44x44px.
- **No emoji in the UI.** Use Lucide React icons for visual communication.
- **Dark theme.** Background is `neutral-950`, primary color is indigo, accent is amber.
- **Container:** `.container-app` class (max-w-md = 448px, mobile-first layout).
- **Skeleton loading** for any component that fetches data. No blank screens or generic spinners.
- **Validate all API inputs with Zod.** Never trust frontend data.
- **Stripe webhooks must verify signatures** via `stripe.webhooks.constructEvent()`.
- **Never expose direct file URLs.** Always use token-based download with short-lived signed URLs.
- **Structured logging:** `console.error('[context]', error)`.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` (optional, for analytics)
