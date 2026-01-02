// ============================================================
// app/page.tsx
// ============================================================
import Link from "next/link";

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
      "Showcase YouTube reels, Figma prototypes, and Slide decks in one sleek, unified feed.",
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
    title: "The Launch",
    desc: "Pay RM 10 to get your custom link and go live to the world.",
    step: "04"
  }
];

const faqs = [
  {
    q: "Why RM 10?",
    a: "We believe a professional presence shouldn't cost a fortune. RM 10 gets you a month of Pro access and a published page. It's less than a Starbucks latte."
  },
  {
    q: "Do I need to be a designer to make it look good?",
    a: "Not at all. Our structured layout system ensures that no matter what you upload, it follows high-end design principles automatically."
  },
  {
    q: "What happens after the first month?",
    a: "You can renew for just RM 8/month to keep your Pro tabs and custom URL active. If you stop, your basic info stays free, but Pro sections are hidden."
  },
  {
    q: "Can I use my own domain?",
    a: "Yes! Pro users can connect their own .com or .my domains easily."
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
            <Badge>Mobile-first • 5-minute setup • RM 10 to publish</Badge>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Your professional flex, built in 5 minutes.
            </h1>

            <p className="text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              Stop sending messy folders. Create a high-converting, mobile-first
              portfolio that turns leads into clients.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCTA href="/startup">
                Build My Portfolio — Start Free
              </PrimaryCTA>
              <SecondaryCTA href="#how">See how it works</SecondaryCTA>
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                No design skills required
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Just RM 10 to publish</span>
            </div>
          </div>

          <div className="relative">
            <MockupCard />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader
          kicker="Why Pluck"
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
                <span className="text-zinc-400">“</span>I spent 8 hours a day in
                a corporate office, but my real passion was{" "}
                <span className="font-semibold text-white">
                  [Design/Consulting/Coding]
                </span>{" "}
                on the side. When a big client asked for my work, I realized I
                had nothing professional to show them—just a bunch of PDFs and
                dead links. I didn’t have time to master a complex website
                builder. I needed something fast, cheap, and mobile-friendly.
                <span className="block" />
                <span className="mt-4 block">
                  So, I built{" "}
                  <span className="font-semibold text-white">Lume</span> for all
                  of us who are hustling between meetings to build something of
                  our own.
                </span>
                <span className="text-zinc-400">”</span>
              </blockquote>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-sm text-zinc-400">— Founder, Pluck</div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Fast • Cheap • Mobile-first
                </span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-7">
              <h3 className="text-base font-semibold">The vibe</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                You are not trying to build a \&quot;website.\&quot; You are
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
                  Publish for RM 10. Upgrade later.
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

      {/* PRICING / CTA */}
      <section id="start" className="mx-auto max-w-6xl px-6 py-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-500 blur-3xl" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
                Publish your portfolio for RM 10.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                Build free. Preview instantly. Pay only when you are ready to go
                live.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA href="/startup">
                  Build My Portfolio — Start Free
                </PrimaryCTA>
                <Link
                  href="#faq"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Read FAQ
                </Link>
              </div>
              <p className="mt-4 text-xs text-zinc-400">
                No design skills required • Mobile-first editing • Lead capture
                included
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">Pro Publishing</p>
                <p className="text-2xl font-semibold">RM 10</p>
              </div>
              <p className="text-sm text-zinc-300">
                1 month of Pro access + published page
              </p>
              <div className="my-2 h-px bg-white/10" />
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <Check /> Custom link + live page
                </li>
                <li className="flex gap-3">
                  <Check /> WhatsApp / Email inquiries
                </li>
                <li className="flex gap-3">
                  <Check /> Multimedia vault
                </li>
                <li className="flex gap-3">
                  <Check /> Mobile-first editing
                </li>
              </ul>
              <div className="mt-3 rounded-xl bg-white/5 p-3 text-xs text-zinc-300">
                Renew later for{" "}
                <span className="font-semibold text-white">RM 8/month</span> to
                keep Pro tabs + custom URL.
              </div>
            </div>
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
function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 text-sm font-semibold">
            P
          </span>
          <span className="text-sm font-semibold tracking-tight">Pluck</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
          <Link className="hover:text-white" href="#features">
            Features
          </Link>
          <Link className="hover:text-white" href="#story">
            Story
          </Link>
          <Link className="hover:text-white" href="#how">
            How it works
          </Link>
          <Link className="hover:text-white" href="#faq">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#start"
            className="hidden rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 sm:inline-flex"
          >
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}

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
              © {new Date().getFullYear()} Pluck. All rights reserved.
            </span>
          </div>
          <div className="flex gap-5 text-sm text-zinc-400">
            <Link className="hover:text-white" href="#">
              Privacy
            </Link>
            <Link className="hover:text-white" href="#">
              Terms
            </Link>
            <Link className="hover:text-white" href="#start">
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
      className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
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
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
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

function MockupCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-white/5 blur-2xl" />
      <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/30 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <span className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <div className="text-xs text-zinc-400">pluck.link/yourname</div>
          <div className="w-10" />
        </div>

        <div className="grid gap-4 p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10" />
            <div className="space-y-1">
              <div className="h-3 w-32 rounded bg-white/10" />
              <div className="h-3 w-44 rounded bg-white/5" />
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-white/10" />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                Contact Me
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-3 w-10 rounded bg-white/5" />
            </div>
            <div className="h-36 rounded-2xl bg-white/5" />
          </div>

          <p className="text-xs text-zinc-400">
            Preview updates instantly on mobile & desktop.
          </p>
        </div>
      </div>
    </div>
  );
}
