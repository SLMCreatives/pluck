// ============================================================
// app/page.tsx
// ============================================================
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { MockupHero } from "@/components/mockup-hero";

const features = [
  {
    title: "Zero-Design Builder",
    benefit:
      "Answer a few questions; we handle the layout. It looks perfect on every screen, every time.",
    icon: "✨"
  },
  {
    title: "The Multimedia Vault",
    benefit:
      "Showcase YouTube reels, Figma prototypes, and slide decks in one sleek, unified feed.",
    icon: "🎞️"
  },
  {
    title: "Lead Capture Pro",
    benefit:
      'A built-in "Contact Me" button that sends inquiries straight to your WhatsApp or Email.',
    icon: "📩"
  },
  {
    title: "Mobile-First Editing",
    benefit:
      "Snap a photo of your latest work and update your portfolio on the LRT ride home.",
    icon: "📱"
  }
];

function getSteps(cur: string) {
  return [
    {
      title: "The Brain Dump",
      desc: "Answer a few prompts about your experience and skills (Typeform style).",
      step: "01"
    },
    {
      title: "The Content Drop",
      desc: "Upload your best work. We automatically format your galleries and videos.",
      step: "02"
    },
    {
      title: "The Live Preview",
      desc: "See exactly how your site looks on a phone and desktop instantly.",
      step: "03"
    },
    {
      title: "Go Live",
      desc: `Your profile publishes instantly on the Free plan. Upgrade to Publish (from ${cur} 19, one-time) for a custom username and unlimited content.`,
      step: "04"
    }
  ];
}

function getPricingTiers(cur: string) {
  return [
    {
      name: "Free",
      price: `${cur} 0`,
      period: "",
      description: "Build and go live — no credit card required.",
      features: [
        "3 blocks, 3 projects (tabs)",
        "6 images total",
        "Auto-generated public URL",
        "Basic lead capture (WhatsApp / Email)",
        "Basic themes only",
        "No analytics",
        "GoPeek badge on profile",
      ],
      cta: "Start Building",
      ctaHref: "/startup",
      highlight: false,
      badge: null,
    },
    {
      name: "Publish",
      price: `from ${cur} 19`,
      period: "",
      description: "One-time payment. Pick 1, 3, 6, or 12 months.",
      features: [
        "Unlimited blocks, projects & images",
        "Custom username (gopeek.my/yourname)",
        "No GoPeek badge",
        "Enhanced lead capture",
        "Basic analytics (view count)",
      ],
      cta: "See Publish Plans",
      ctaHref: "/pricing",
      highlight: true,
      badge: "Most popular",
    },
    {
      name: "Pro",
      price: "Coming soon",
      period: "",
      description: "Custom domain and advanced analytics.",
      features: [
        "Everything in Publish",
        "Premium themes",
        "Custom domain (yourname.com)",
        "Advanced analytics",
        "Multiple portfolios",
        "Priority support",
      ],
      cta: "Notify Me",
      ctaHref: "/pricing",
      highlight: false,
      badge: null,
    },
  ];
}

const faqs = [
  {
    q: "What is the best free portfolio builder for freelancers in Malaysia?",
    a: "GoPeek is built specifically for Malaysian freelancers and side-hustlers. It's free to start, takes 5 minutes to set up, requires zero design skills, and gives you a mobile-first portfolio with built-in WhatsApp and email lead capture — all on a shareable gopeek.my link."
  },
  {
    q: "How do I create a professional portfolio in 5 minutes?",
    a: "Sign up, fill in your name, title, and bio, add your best work, and hit publish. GoPeek handles all the layout and formatting automatically. No templates to fiddle with, no design decisions — just answer a few prompts and you're live."
  },
  {
    q: "Is GoPeek a good Linktree alternative for Malaysian freelancers?",
    a: "Yes — and it goes much deeper than Linktree. Instead of just a list of links, GoPeek gives you a full project portfolio with galleries, videos, and experience blocks. You also get built-in lead capture (WhatsApp / email) and a custom username like gopeek.my/yourname on the Publish plan."
  },
  {
    q: "What's the difference between the Free and Publish plans?",
    a: "Free lets you build and go live with an auto-generated URL — completely free, forever. Publish (from RM 19, one-time) gives you a custom username, removes the GoPeek badge, unlocks unlimited content and basic analytics. Choose 1 month (RM 19), 3 months (RM 54), 6 months (RM 99), or 12 months (RM 180). No recurring charges."
  },
  {
    q: "What happens when my Publish plan expires?",
    a: "Your profile safely reverts to the Free tier — all your content stays intact, but your custom username and paid features are paused until you renew. Renewing before expiry extends from your current end date, not from the renewal date."
  },
  {
    q: "Do I need design skills to use GoPeek?",
    a: "Not at all. GoPeek's structured layout system automatically formats everything you upload — galleries, videos, project descriptions — so it always looks polished and professional, on every screen."
  }
];

const testimonials = [
  {
    quote: "Took me less than 10 minutes. I sent the link to a client the same day and got a reply within the hour.",
    name: "Amirah R.",
    role: "Graphic designer, KL",
  },
  {
    quote: "I kept putting off building a website for two years. GoPeek got me live in one lunch break.",
    name: "Faiz H.",
    role: "Video editor & content creator",
  },
  {
    quote: "The WhatsApp contact button alone is worth it. Clients message me directly from my portfolio link.",
    name: "Siti N.",
    role: "Freelance copywriter, Penang",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://gopeek.my/#app",
      "name": "GoPeek",
      "url": "https://gopeek.my",
      "description": "Free portfolio builder for Malaysian freelancers. Build a professional mobile-first portfolio in 5 minutes with no design skills required.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "inLanguage": "en-MY",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free",
          "price": "0",
          "priceCurrency": "MYR",
          "description": "Free forever. Build and go live with an auto-generated URL.",
        },
        {
          "@type": "Offer",
          "name": "Publish",
          "price": "19",
          "priceCurrency": "MYR",
          "description": "Custom username, no badge, unlimited content, basic analytics. One-time payment.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://gopeek.my/#faq",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    },
    {
      "@type": "Organization",
      "@id": "https://gopeek.my/#org",
      "name": "GoPeek",
      "url": "https://gopeek.my",
      "logo": "https://gopeek.my/GoPeek.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@slmcreatives.com",
        "contactType": "customer support",
      },
    },
  ],
};

export default async function Page() {
  const h = await headers();
  const country = (
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    "MY"
  ).toUpperCase();
  const cur = country === "MY" ? "RM" : "$";
  const steps = getSteps(cur);
  const pricingTiers = getPricingTiers(cur);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-20">
        <Glow />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge>Mobile-first • 5-minute setup • Free to build</Badge>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              The free portfolio builder for Malaysian freelancers.
            </h1>

            <p className="text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              Stop sending messy folders and dead links. Build a professional,
              mobile-first portfolio in 5 minutes — no design skills needed.
              Share one link, capture leads via WhatsApp or email, and win more
              clients.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCTA href="/startup">
                Build My Portfolio — It's Free
              </PrimaryCTA>
              <SecondaryCTA href="#pricing">See pricing</SecondaryCTA>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                No auto-renewal
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                FPX &amp; card supported
              </span>
            </div>
          </div>

          <div className="relative">
            <MockupHero />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="Why GoPeek"
          title="Everything you need to look premium — instantly."
          subtitle="Answer a few prompts, drop in your best work, and share a link that actually converts."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-lg">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {f.benefit}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section id="story" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="The Story"
          title="Built from frustration. Launched with purpose."
          subtitle="A Malaysian freelancer got tired of sending dead links — so he built the fix."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Photo card */}
          <div className="flex justify-center lg:block lg:col-span-3">
            <div className="w-3/4 lg:w-full overflow-hidden rounded-3xl border border-white/10 bg-white/3">
              <Image
                src="/sulaiman.jpg"
                alt="Sulaiman — Founder of GoPeek"
                width={400}
                height={400}
                className="w-full object-cover"
                priority
              />
              <div className="px-5 py-4">
                <p className="font-semibold text-white">Sulaiman</p>
                <p className="mt-0.5 text-xs text-zinc-400">Founder, GoPeek</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://slmcreatives.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-white"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Website
                  </a>
                  <span className="text-white/10">|</span>
                  <a
                    href="https://www.linkedin.com/in/sulaiman-shafiq-208054193/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-white"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Story card */}
          <div className="lg:col-span-9">
            <Card className="p-7 h-full">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">In his own words</p>
              <blockquote className="mt-4 space-y-4 text-pretty text-base leading-relaxed text-zinc-200">
                <p>
                  <span className="text-2xl leading-none text-zinc-500">&ldquo;</span>I know what it feels
                  like to hustle for clients and have absolutely nothing clean to show them.
                  A potential client would ask — <span className="font-semibold text-white">&ldquo;Can I see your work?&rdquo;</span> — and
                  I&apos;d scramble to find a Google Drive link, a half-broken PDF, or
                  a project buried in my phone gallery.
                </p>
                <p>
                  It was embarrassing. Not because the work wasn&apos;t good — but because
                  I had no proper way to present it. I didn&apos;t have time or money to
                  hire a web designer. And every portfolio builder I tried either
                  looked generic, cost too much, or took hours to figure out.
                </p>
                <p>
                  So I built <span className="font-semibold text-white">GoPeek</span> for
                  myself first — and then for every Malaysian freelancer who&apos;s ever
                  lost a client simply because they couldn&apos;t show their work fast enough.
                  <span className="text-2xl leading-none text-zinc-500">&rdquo;</span>
                </p>
              </blockquote>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {["Freelancer first", "Built in Malaysia", "Launched in 2025"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <SecondaryCTA href="/startup">Build yours free</SecondaryCTA>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="Early users"
          title="Freelancers already using GoPeek."
          subtitle="Real feedback from our beta community."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <p className="text-sm leading-relaxed text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="The Journey"
          title="From brain dump → live link."
          subtitle="A simple flow that feels like chatting — not building."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.step}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400">
                  STEP
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="Pricing"
          title="Build free. Publish when you're ready."
          subtitle="No recurring charges. No auto-renewal. Your content stays yours forever."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.highlight
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-white/10 bg-white/3"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-semibold text-white">
                  {tier.badge}
                </span>
              )}

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {tier.name}
                </p>
                <p className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="mb-1 text-zinc-500">{tier.period}</span>
                </p>
                <p className="mt-2 text-sm text-zinc-400">{tier.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              {tier.name === "Pro" ? (
                <button
                  disabled
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-500 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              ) : tier.highlight ? (
                <PrimaryCTA href={tier.ctaHref}>{tier.cta}</PrimaryCTA>
              ) : (
                <SecondaryCTA href={tier.ctaHref}>{tier.cta}</SecondaryCTA>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          All plans include unlimited profile edits. Publish is a one-time payment — no recurring charges.
        </p>
      </section>

      {/* CTA BANNER */}
      <section id="start" className="mx-auto max-w-6xl px-6 py-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-500 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-6 text-center">
            <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
              Ready to stop sending PDFs?
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
              Build your portfolio for free. Preview it live. Upgrade to go
              public when you feel good about it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA href="/startup">
                Build My Portfolio — It's Free
              </PrimaryCTA>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Read FAQ
              </Link>
            </div>
            <p className="text-xs text-zinc-500">
              No credit card required • FPX &amp; card accepted • No auto-renewal • Your content stays yours
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="FAQ"
          title="Short answers. No awkward surprises."
          subtitle="We keep it simple — just like the product."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 open:bg-white/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-semibold">{item.q}</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white/80 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// ============================================================
// Components (local)
// ============================================================
function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek logo" className="rounded-xl object-contain" />
            <span>
              © {new Date().getFullYear()} GoPeek. All rights reserved.
            </span>
          </div>
          <div className="flex gap-5 text-sm text-zinc-400">
            <Link className="hover:text-white transition" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white transition" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white transition" href="#pricing">
              Pricing
            </Link>
            <Link className="hover:text-white transition" href="/startup">
              Build
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {kicker}
      </p>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90">
      <span className="h-2 w-2 rounded-full bg-indigo-400" />
      {children}
    </span>
  );
}

function PrimaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-900 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

function SecondaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
      ✓
    </span>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-8 h-105 w-105 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute right-0 top-40 h-105 w-105 rounded-full bg-fuchsia-500/20 blur-3xl" />
    </div>
  );
}

