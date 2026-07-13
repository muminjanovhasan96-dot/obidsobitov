# OBID SOBITOV — Luxury Concierge Boutique

A premium, editorial e-commerce website for **OBID SOBITOV**, a high-end
concierge boutique in Tashkent, Uzbekistan (Mirabad Avenue). The boutique sells
and imports luxury **watches** (Rolex, Audemars Piguet, Patek Philippe), premium
**designer clothing, bags and accessories**, and offers a personal-shopping
concierge service — *"bring any luxury item to order."*

Built with quiet-luxury design references in mind (MR PORTER, Net-a-Porter,
Rolex.com, Audemars Piguet, Farfetch): editorial, minimal, dark, and expensive.

---

## ✨ Features

- **Next.js 14 (App Router) + TypeScript**, statically generated (fast, SEO-friendly)
- **Trilingual** — Uzbek (default), Russian, English — with a header language switcher
- **Tailwind CSS** design-token system (near-black + champagne-gold palette)
- **Framer Motion** subtle scroll & hover animation
- **Cart** with `localStorage` persistence (React Context)
- **Concierge request form** + **Telegram deep-link** ordering
- **Checkout** with structured payment placeholders (Payme, Click, Uzcard/Humo,
  Telegram) ready for real API wiring
- **Search** overlay, **Wishlist** (Sevimlilar), **recently viewed**, product **image lightbox**
- **Light / dark** (ivory ↔ deep emerald) theme toggle, soft **page transitions**
- **Floating Telegram** button + `/api/notify` so forms reach the boutique's Telegram
- **SEO**: sitemap, robots, per-product structured data; optional **GA / Yandex Metrica**
- **Fully responsive**, mobile-first, optimized images via `next/image`
- No database — products live in a single, easily-editable typed file

---

## 🚀 Run locally

Requirements: **Node.js 18.17+** (Node 20+ recommended) and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server → http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
npm run typecheck # TypeScript type-check (tsc --noEmit)
```

---

## 🛠️ How to edit the site (for the client)

Everything a non-developer normally needs to change lives in a few clearly
commented files.

### 1. Products — `src/data/products.ts`

This is the product catalog. To **add a product**, copy any existing object in
the `products` array and edit the fields:

```ts
{
  id: "w-07",                                   // unique id
  slug: "rolex-day-date-40",                    // URL: /product/rolex-day-date-40
  name: "Day-Date 40",
  brand: "Rolex",
  category: "watches",                          // watches | clothing | bags | accessories
  priceUzs: 350000000,                          // price in UZS, plain number (no spaces)
  images: [                                     // 1–5 image URLs (first = main)
    "https://.../photo-1.jpg",
    "https://.../photo-2.jpg",
  ],
  description: {                                // text in all three languages
    uz: "…",
    ru: "…",
    en: "…",
  },
  specs: [                                      // label/value rows; value can be a
    { label: L.movement, value: "Automatic" }, //   plain string OR { uz, ru, en }
    { label: L.caseSize, value: "40 mm" },
  ],
  featured: true,                               // true = show in the home "Featured" row
  availability: "inStock",                      // "inStock" | "onOrder"
},
```

- **Delete** a product by removing its object from the array.
- The array order is the **"New arrivals"** order (first = newest).
- Only watches with `featured: true` appear in the home *Featured Timepieces* row.
- **Images:** the demo uses Unsplash placeholders. Replace the URLs with the
  client's own photos. You can either paste full URLs, or drop image files into
  the `public/` folder and reference them as `/my-photo.jpg`.
  - If you host images on a new domain, add that domain to `next.config.mjs`
    under `images.remotePatterns`.

### 2. Contact details — `src/config/site.ts`

**One place** for phone, Instagram, Telegram, address and map. Change a value
once and it updates in the header, footer, product pages, concierge form,
checkout and about page.

```ts
phone:     { display: "+998 99 777 07 00", href: "+998997770700" },
instagram: { handle: "obidsobitov_", url: "https://instagram.com/obidsobitov_" },
telegram:  { username: "obidsobitov_", url: "https://t.me/obidsobitov_" },
address:   { line: "Mirabad Avenue, Tashkent, Uzbekistan",
             mapQuery: "Mirabad, Tashkent, Uzbekistan" },
url:       "https://obidsobitov.uz",   // used for SEO / Open Graph
```

> **Telegram deep links** ("Ask via Telegram", "Order via Telegram", concierge
> "Send via Telegram") are built from `telegram.username`. Set it to the
> boutique's real Telegram username.

### 3. Texts & translations — `messages/uz.json`, `messages/ru.json`, `messages/en.json`

All UI copy and page text lives in these three files, with identical keys. To
change a headline, button, or paragraph, find its key in **all three** language
files and edit the value. Product descriptions are edited inside
`src/data/products.ts` (see above), not here.

- Default language is **Uzbek**. To change the default, edit `defaultLocale` in
  `src/i18n/config.ts`.

### 4. Colors, fonts & spacing — `tailwind.config.ts` and `src/app/globals.css`

The brand palette and typography tokens are defined in `tailwind.config.ts`
(`colors`, `fontFamily`, etc.). Fonts are loaded in `src/app/layout.tsx` via
`next/font` (Playfair Display for headings, Inter for body).

---

## 💳 Wiring real payments (Payme / Click)

The checkout page (`src/components/checkout/CheckoutView.tsx`) currently
**simulates** a successful order and offers a **Telegram** fallback that opens a
pre-filled order message. Integration points are marked with `TODO` comments:

- **Payme** — create a transaction via the Payme Merchant API, then redirect to
  the returned checkout URL. Docs: <https://developer.help.paycom.uz/>
- **Click** — create an invoice via the Click Merchant API (SHOP_ID, SERVICE_ID,
  secret key) and redirect to the pay URL. Docs: <https://docs.click.uz/>
- **Uzcard / Humo** — usually flow through Payme/Click or a bank acquirer.

Recommended approach: add a Next.js Route Handler at `src/app/api/checkout/route.ts`
that receives the order + contact details and talks to the gateway **server-side**
(never expose secret keys in the browser), then redirect the customer to the
gateway's payment page.

---

## 🔔 Notifications & analytics (optional env vars)

Copy `.env.example` → `.env.local` and fill in what you have (all optional):

- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — concierge requests, orders and
  newsletter sign-ups then arrive automatically in the boutique's Telegram
  (via `src/app/api/notify/route.ts`). Until set, forms open a pre-filled
  Telegram link instead, so nothing is lost.
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4. `NEXT_PUBLIC_YANDEX_METRICA_ID` —
  Yandex Metrica (both off until set). See `src/components/Analytics.tsx`.

On Vercel, add the same keys under **Project → Settings → Environment Variables**.

## ☁️ Deploy to Vercel

Vercel is the easiest host for Next.js (made by the same team).

1. **Push the code to GitHub** (or GitLab/Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Initial commit — OBID SOBITOV"
   git branch -M main
   git remote add origin https://github.com/<your-account>/obid-sobitov.git
   git push -u origin main
   ```
2. Go to <https://vercel.com>, sign in, and click **Add New → Project**.
3. **Import** the repository. Vercel auto-detects Next.js — no configuration
   needed. Framework preset: *Next.js*. Build command: `next build` (default).
4. Click **Deploy**. In ~1 minute you get a live URL like
   `obid-sobitov.vercel.app`.
5. Every future `git push` to `main` automatically redeploys.

> No environment variables are required for the current build. When you wire up
> Payme/Click, add their keys under **Project → Settings → Environment Variables**.

---

## 🌐 Connect the `obidsobitov.uz` domain

1. In Vercel, open your project → **Settings → Domains**.
2. Enter `obidsobitov.uz` and click **Add**. Add `www.obidsobitov.uz` too if you
   want the `www` version (Vercel will redirect one to the other).
3. Vercel shows the DNS records to create. At your **domain registrar** (where
   `obidsobitov.uz` was purchased — e.g. a `.uz` registrar / ahost / Uzinfocom),
   open the DNS settings and add:

   | Type  | Name / Host | Value                     |
   |-------|-------------|---------------------------|
   | `A`   | `@`         | `76.76.21.21`             |
   | `CNAME` | `www`     | `cname.vercel-dns.com`    |

   *(Vercel shows the exact values on the Domains screen — always use the ones it
   displays, as IPs can change.)*
4. Save the DNS records and wait for propagation (usually minutes, up to 48h for
   `.uz`). Vercel verifies the domain and **issues a free SSL certificate**
   automatically — the site will be live at `https://obidsobitov.uz`.
5. After the domain is live, update `url` in `src/config/site.ts` to
   `https://obidsobitov.uz` (used for SEO/Open Graph metadata), then redeploy.

---

## 📁 Project structure

```
obidsobitov/
├── messages/                 # UI translations (uz / ru / en)
├── public/                   # static assets (favicon; put product photos here)
├── src/
│   ├── app/                  # App Router pages
│   │   ├── layout.tsx        # root layout: fonts, header, footer, providers
│   │   ├── page.tsx          # "/"           Home
│   │   ├── catalog/          # "/catalog"    Catalog (filters + sort)
│   │   ├── product/[slug]/   # "/product/…"  Product detail
│   │   ├── concierge/        # "/concierge"  Concierge request form
│   │   ├── cart/             # "/cart"       Cart
│   │   ├── checkout/         # "/checkout"   Checkout (payment placeholders)
│   │   ├── about/            # "/about"      About / Contact
│   │   └── globals.css       # base styles + design utilities
│   ├── components/           # UI + page section components
│   │   ├── ui/               # Button, Section, PriceTag, LanguageSwitcher, …
│   │   ├── home/ catalog/ product/ concierge/ cart/ checkout/ about/
│   │   ├── Header.tsx  Footer.tsx  ProductCard.tsx
│   ├── config/site.ts        # ← contact details (edit here)
│   ├── context/              # CartContext, LocaleContext
│   ├── data/products.ts      # ← product catalog (edit here)
│   ├── i18n/                 # locale config + message loader
│   └── lib/                  # price formatting, text helpers
├── tailwind.config.ts        # ← design tokens (colors, fonts)
└── next.config.mjs           # image host allowlist
```

---

## 🎨 Design system (reference)

| Token            | Value                          |
|------------------|--------------------------------|
| Background       | `#F7F5EF` (warm ivory)         |
| Surface / cards  | `#FFFFFF`                      |
| Brand green      | `#0E3B2E` → deep `#0A2A21`     |
| Text primary     | `#1A211E`                      |
| Text muted       | `#6B726C`                      |
| Accent (gold)    | `#C2A15A` → hover `#D8BE86` — used sparingly |
| Hairline / border| `rgba(26,33,30,0.12)` (neutral) · `rgba(194,161,90,0.30)` (gold) |
| Headings         | Playfair Display (serif), emerald |
| Body / UI        | Inter (sans)                   |

**Logo:** the monogram lives at `/public/monogram.svg` (and `/public/favicon.svg`)
and the wordmark is rendered by `src/components/ui/Logo.tsx`. Replace the SVG with
the client's real mark, or drop a logo image in `/public` and swap it into `Logo.tsx`.
The palette is defined in `tailwind.config.ts` — the three brand colors are
**emerald (structure) · ivory (whitespace) · gold (accent only)**.

Prices are shown in **UZS (so'm)** with thousands separators, localized per
language.

---

© OBID SOBITOV. Crafted with elegance in Tashkent.
