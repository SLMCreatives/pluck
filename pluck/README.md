# Pluck

A mobile-first portfolio builder that lets you create and publish a beautiful public profile in minutes.

## What it does

Pluck walks you through a guided wizard to build your portfolio — add your bio, social links, work tabs, gallery images, videos, and experience blocks. You get a live phone preview as you build, then publish with a one-time payment. Your profile is instantly live at a public URL.

## Key features

- **Wizard builder** — step-by-step flow: onboarding → socials → tabs → content blocks → preview
- **Live phone preview** — see exactly how your profile looks on mobile as you edit
- **Content blocks** — gallery images, videos, and experience entries organized into named tabs
- **Stripe payment gate** — one-time RM 10 payment to publish
- **Public profile page** — shareable URL at `/{your-id}`
- **Dashboard** — manage your profile, copy your public URL, and jump back into editing

## Tech stack

- **Next.js 15** (App Router)
- **Convex** — real-time database, backend functions, and auth
- **Convex Auth** — password-based authentication with JWT
- **UploadThing** — image uploads (gallery, profile photo, company logos)
- **Stripe** — checkout and webhook-verified publish flow
- **Tailwind CSS v4** + **shadcn/ui** — dark-themed UI with zinc/indigo/emerald palette

## Local development

You need two processes running:

```bash
# Terminal 1 — Next.js dev server
cd pluck
pnpm dev

# Terminal 2 — Convex backend sync
npx convex dev
```

### Environment variables

Create `pluck/.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
UPLOADTHING_TOKEN=your_uploadthing_token
```

Set these in your Convex dashboard environment variables:

```
JWT_PRIVATE_KEY=...
SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

### Stripe webhook (local testing)

Register `{CONVEX_SITE_URL}/stripe/webhook` in your Stripe dashboard for the `checkout.session.completed` event. Use the Stripe CLI to forward events locally during development.

## Project structure

```
app/
  page.tsx              # Landing / marketing page
  auth/page.tsx         # Sign in / sign up
  startup/page.tsx      # Portfolio wizard (new users)
  startup/paid/page.tsx # Post-payment redirect handler
  dashboard/page.tsx    # Profile summary, stats, phone preview
  dashboard/edit/page.tsx # Edit wizard pre-populated from saved profile
  [user.id]/page.tsx    # Public profile page
components/
  wizard/               # Step components for the builder flow
  ui/                   # shadcn/ui primitives
  phone-mockup.tsx      # Phone frame live preview
convex/
  profiles.ts           # DB queries and mutations
  stripe.ts             # Stripe webhook HTTP action
  auth.ts               # Convex Auth config
types/
  portfolio.ts          # Core data types (PortfolioData, Tab, ContentBlock)
```
