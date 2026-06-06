// ============================================================
// app/page.tsx
// ============================================================
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { MockupHero } from "@/components/mockup-hero";
import { TestimonialsSection } from "@/components/testimonials-section";

export const metadata: Metadata = {
  title: "First 100 Freelancers Get GoPeek Free for 3 Months",
  description:
    "Build a client-ready portfolio in 5 minutes and get discovered early. GoPeek is giving 3 months free to the first 100 Malaysian freelancer profiles. Claim your spot before it's gone.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "First 100 Freelancers Get GoPeek Free for 3 Months",
    description:
      "Build a client-ready portfolio in 5 minutes and get discovered early. GoPeek is giving 3 months free to the first 100 Malaysian freelancer profiles. Claim your spot before it's gone.",
    url: "https://gopeek.my",
  },
  twitter: {
    card: "summary_large_image",
    title: "First 100 Freelancers Get GoPeek Free for 3 Months",
    description:
      "Build a client-ready portfolio in 5 minutes and get discovered early. GoPeek is giving 3 months free to the first 100 Malaysian freelancer profiles. Claim your spot before it's gone.",
  },
};

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
      title: "Go Live — Free",
      desc: "Hit publish and your portfolio is live instantly on a gopeek.my link. Share it right away. No waiting, no payment, no setup fee.",
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
      description: "Live in 5 minutes. Free forever. No card needed.",
      features: [
        "Live gopeek.my link — instantly",
        "WhatsApp & email contact button",
        "3 projects, 3 blocks, 6 images",
        "Looks great on any phone",
        "Free forever — not a trial",
      ],
      cta: "Build My Free Portfolio",
      ctaHref: "/startup",
      highlight: false,
      isFree: true,
      badge: "Free forever",
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
      badge: null,
      isFree: false,
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
    a: "Yes — and it goes much deeper than Linktree. Instead of just a list of links, GoPeek gives you a full project portfolio with galleries, videos, and experience blocks. You also get built-in lead capture (WhatsApp / email), and a custom username like gopeek.my/yourname when you upgrade to Publish."
  },
  {
    q: "What's the difference between the Free and Publish plans?",
    a: "Free lets you build and go live with an auto-generated URL — completely free, forever. Publish (from RM 19, one-time) gives you a custom username, removes the GoPeek badge, unlocks unlimited content and basic analytics. Choose 1 month (RM 19), 3 months (RM 57), 6 months (RM 114), or 12 months (RM 228). No recurring charges."
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


const personas = [
  {
    img: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=600&q=80",
    label: "Just landing your first client",
    name: "The New Freelancer",
    desc: "You've got skills but no portfolio yet. A client asks for your work and you freeze. GoPeek gets you from zero to live in one afternoon — free.",
    cta: "Start for free →",
  },
  {
    img: "https://images.unsplash.com/photo-1698047681820-f26b00b6c639?auto=format&fit=crop&w=600&q=80",
    label: "Side hustle going full-time",
    name: "The Career Switcher",
    desc: "You're serious now. You need something professional to send before the competition does. One clean link changes how clients see you.",
    cta: "Build yours free →",
  },
  {
    img: "https://images.unsplash.com/photo-1758518730380-04c8e0d57b68?auto=format&fit=crop&w=600&q=80",
    label: "Tired of the Google Drive shuffle",
    name: "The Experienced Pro",
    desc: "You've been freelancing for years but still send scattered links and PDFs. GoPeek puts everything in one place — polished and shareable.",
    cta: "Upgrade your presence →",
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
            <Badge>For Malaysian freelancers • 5-minute setup • Free to start</Badge>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              When Clients Ask for Your Work,{" "}
              <span className="text-zinc-400">Send One Clean Link.</span>
            </h1>

            <p className="text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              GoPeek turns your scattered files, images, and videos into a professional portfolio you can share instantly.
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
                Free forever — not a trial
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live in under 5 minutes
              </span>
            </div>
          </div>

          <div className="relative">
            <MockupHero />
          </div>
        </div>
      </section>

      {/* CAMPAIGN BANNER */}
      <section className="mx-auto max-w-6xl px-6 pb-4">
        <Link
          href="/free100"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/8 px-5 py-3.5 transition hover:bg-amber-500/12"
        >
          <div className="flex items-center gap-3">
            <span className="hidden h-2 w-2 rounded-full bg-amber-400 animate-pulse sm:block" />
            <p className="text-sm font-semibold text-amber-300">
              🎉 First 100 Freelancers — Get 3 Months of Publish Free
            </p>
            <span className="hidden rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400 sm:inline">
              Limited
            </span>
          </div>
          <span className="shrink-0 text-xs font-semibold text-amber-400 group-hover:underline">
            Claim now →
          </span>
        </Link>
      </section>

      {/* FREE FOREVER STRIP */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 px-8 py-7">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-emerald-400">
            What you get for free — forever
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🔗", label: "Your own gopeek.my link", sub: "Live and shareable instantly" },
              { icon: "💬", label: "WhatsApp contact button", sub: "Clients reach you in one tap" },
              { icon: "📁", label: "3 projects & 6 images", sub: "Enough to show your best work" },
              { icon: "♾️", label: "Free forever", sub: "No trial. No expiry. No catch." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <PrimaryCTA href="/startup">Build My Free Portfolio — No Card Needed</PrimaryCTA>
          </div>
        </div>
      </section>

      {/* SCENARIO BANNER */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=1400&q=80"
            alt="Malaysian freelancer working on a laptop"
            width={1400}
            height={560}
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div className="max-w-md space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Sound familiar?</p>
              <blockquote className="text-xl font-semibold leading-snug text-white sm:text-2xl">
                &ldquo;Can you send me your portfolio?&rdquo;
              </blockquote>
              <p className="text-sm leading-relaxed text-zinc-300">
                Every freelancer gets that message. The ones who reply instantly with a clean link — they win the job. GoPeek makes sure that&apos;s you.
              </p>
              <PrimaryCTA href="/startup">Build mine — it&apos;s free</PrimaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <SectionHeader
          kicker="Who it's for"
          title="Wherever you are in your freelance journey."
          subtitle="Whether you just landed your first client or you've been freelancing for years — GoPeek gets you looking the part."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {personas.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-sm">
                  {p.label}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                <Link href="/startup" className="inline-flex text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition">
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO SHOWCASE */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="space-y-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Real portfolios, live now</p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              The guy who built this uses it too.
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Not a demo. Not a mock. Real people, real work, live links.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Founder card */}
            <div className="flex flex-col gap-4 rounded-3xl border border-indigo-500/30 bg-indigo-500/5 p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/sulaiman.jpg"
                  alt="Sulaiman"
                  width={44}
                  height={44}
                  className="rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Sulaiman</p>
                  <p className="text-xs text-zinc-400">Founder, GoPeek · Web Designer</p>
                </div>
                <span className="ml-auto rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                  Founder
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">
                &ldquo;I built GoPeek because I was tired of sending dead links to clients. This is my own portfolio — built and live in 5 minutes.&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-zinc-400">gopeek.my/sulaimanshafiq</span>
                </div>
                <Link
                  href="/sulaimanshafiq"
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  View ↗
                </Link>
              </div>
            </div>

            {/* Beta user placeholder — update with real slug when available */}
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-base font-bold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Amirah R.</p>
                  <p className="text-xs text-zinc-400">Graphic Designer · KL</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  Beta
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">
                &ldquo;Took me less than 10 minutes. I sent the link to a client the same day and got a reply within the hour.&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-zinc-400">gopeek.my/amirah</span>
                </div>
                <Link
                  href="/startup"
                  className="inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Build yours →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="Why GoPeek"
          title="Everything a client needs to say yes — in one link."
          subtitle="Answer a few prompts, drop in your best work, and share a gopeek.my link that actually converts."
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
      <TestimonialsSection />

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
          title="Start free. Upgrade only when it makes sense."
          subtitle="The free plan is real — not a trial. Build, go live, and share your work today at no cost."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.isFree
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : tier.highlight
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-white/10 bg-white/3"
              }`}
            >
              {tier.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold text-white ${
                  tier.isFree ? "bg-emerald-500" : "bg-indigo-500"
                }`}>
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
                    <Check emerald={tier.isFree} />
                    {f}
                  </li>
                ))}
              </ul>

              {tier.isFree ? (
                <Link
                  href={tier.ctaHref}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
                >
                  {tier.cta}
                </Link>
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
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background photo */}
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80"
            alt="Freelancer confidently sharing their work on a laptop"
            width={1400}
            height={500}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

          <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:max-w-xl">
            <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
              Next time a client asks — you&apos;ll be ready.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              Build your portfolio for free and go live instantly. Share one
              clean gopeek.my link — with your work, your story, and a
              WhatsApp button that brings clients straight to you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA href="/startup">
                Build My Portfolio — It&apos;s Free
              </PrimaryCTA>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/20 backdrop-blur-sm"
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

function Check({ emerald = false }: { emerald?: boolean }) {
  return (
    <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${emerald ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500/15 text-emerald-300"}`}>
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

