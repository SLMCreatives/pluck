// ============================================================
// app/page.tsx
// ============================================================
import Link from "next/link";
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

const steps = [
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
    desc: "Your profile publishes instantly on the Free plan. Upgrade to Publish from RM 19 for a custom username and unlimited content.",
    step: "04"
  }
];

const pricingTiers = [
  {
    name: "Free",
    price: "RM 0",
    period: "",
    description: "Build and go live — no credit card required.",
    features: [
      "3 blocks, 3 projects (tabs)",
      "6 images total",
      "Auto-generated public URL",
      "Basic lead capture (WhatsApp / Email)",
      "Peek badge on profile",
    ],
    cta: "Start Building",
    ctaHref: "/startup",
    highlight: false,
    badge: null,
  },
  {
    name: "Publish",
    price: "RM 19",
    period: "/mo",
    description: "Custom username and no Peek badge.",
    features: [
      "Unlimited blocks, projects & images",
      "Custom username (peek.com.my/yourname)",
      "No Peek badge",
      "Enhanced lead capture",
      "Basic analytics (view count)",
    ],
    cta: "Upgrade to Publish",
    ctaHref: "/pricing",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Pro",
    price: "RM 39",
    period: "/mo",
    description: "Custom domain and advanced analytics.",
    features: [
      "Everything in Publish",
      "Custom domain (yourname.com)",
      "Advanced analytics",
      "Multiple portfolios",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/pricing",
    highlight: false,
    badge: null,
  },
];

const faqs = [
  {
    q: "Is Free really free forever?",
    a: "Yes. You can build your full portfolio, go live with an auto-generated URL, and share it — completely free. You only pay if you want a custom username or advanced features."
  },
  {
    q: "What's the difference between Free and Publish?",
    a: "Publish (RM 19/mo or RM 149/yr) gives you a custom username (peek.com.my/yourname), removes the Peek badge, and includes basic analytics. Pro — with custom domains and advanced analytics — is coming soon."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no contracts or lock-in periods. Cancel from your billing portal at any time. Your profile will stay live on the Free plan — you just lose the custom username and premium features."
  },
  {
    q: "Do I need to be a designer to make it look good?",
    a: "Not at all. Our structured layout system ensures that no matter what you upload, it follows high-end design principles automatically."
  }
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-20">
        <Glow />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge>Mobile-first • 5-minute setup • Free to build</Badge>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Your professional flex, built in 5 minutes.
            </h1>

            <p className="text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              Stop sending messy folders. Create a high-converting, mobile-first
              portfolio that turns leads into clients — free to build, publish
              when you're ready.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCTA href="/startup">
                Build My Portfolio — It's Free
              </PrimaryCTA>
              <SecondaryCTA href="#pricing">See pricing</SecondaryCTA>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                No design skills required
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Custom URL from RM 19/mo</span>
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
          kicker="Why Peek"
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
          kicker="The Heart"
          title="Built for the after-hours hustlers."
          subtitle="Because your work deserves more than dead links and random PDFs."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="p-7">
              <blockquote className="text-pretty text-base leading-relaxed text-zinc-200">
                <span className="text-zinc-400">"</span>I spent 8 hours a day in
                a corporate office, but my real passion was{" "}
                <span className="font-semibold text-white">
                  [Design/Consulting/Coding]
                </span>{" "}
                on the side. When a big client asked for my work, I realized I
                had nothing professional to show them—just a bunch of PDFs and
                dead links. I didn't have time to master a complex website
                builder. I needed something fast, cheap, and mobile-friendly.
                <span className="block" />
                <span className="mt-4 block">
                  So, I built{" "}
                  <span className="font-semibold text-white">Peek</span> for all
                  of us who are hustling between meetings to build something of
                  our own.
                </span>
                <span className="text-zinc-400">"</span>
              </blockquote>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-sm text-zinc-400">— Founder, Peek</div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Fast • Affordable • Mobile-first
                </span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-7">
              <h3 className="text-base font-semibold">The vibe</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                You are not trying to build a &quot;website.&quot; You are
                trying to win the next client.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <Check />
                  Clean layout that makes your work pop.
                </li>
                <li className="flex gap-3">
                  <Check />
                  Built-in lead capture with WhatsApp/Email.
                </li>
                <li className="flex gap-3">
                  <Check />
                  Free to build and go live. Custom URL from RM 19/mo.
                </li>
              </ul>

              <div className="mt-6">
                <SecondaryCTA href="/startup">Try it in 5 minutes</SecondaryCTA>
              </div>
            </Card>
          </div>
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
          subtitle="No surprise fees. Cancel anytime. Your profile, your timeline."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.highlight
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-white/10 bg-white/[0.03]"
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
          All plans include unlimited profile edits. Paid plans billed monthly. Cancel anytime.
        </p>
      </section>

      {/* CTA BANNER */}
      <section id="start" className="mx-auto max-w-6xl px-6 py-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
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
              No credit card required to start • Publish from RM 9/mo
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
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:bg-white/[0.05]"
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
            <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-semibold text-white">
              P
            </span>
            <span>
              © {new Date().getFullYear()} Peek. All rights reserved.
            </span>
          </div>
          <div className="flex gap-5 text-sm text-zinc-400">
            <Link className="hover:text-white" href="#">
              Privacy
            </Link>
            <Link className="hover:text-white" href="#">
              Terms
            </Link>
            <Link className="hover:text-white" href="#pricing">
              Pricing
            </Link>
            <Link className="hover:text-white" href="/startup">
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
        "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] " +
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
      <div className="absolute left-1/2 top-8 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />
    </div>
  );
}

