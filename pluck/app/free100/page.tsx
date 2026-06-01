import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, BookOpen, ArrowRight } from "lucide-react";
import { MockupHero } from "@/components/mockup-hero";

export const metadata: Metadata = {
  title: "First 100 Freelancers Get GoPeek Publish Free for 3 Months",
  description:
    "Build a client-ready portfolio in 5 minutes and get 3 months of GoPeek Publish completely free. Limited to the first 100 Malaysian freelancers. Claim your spot now.",
  alternates: { canonical: "/free100" },
  openGraph: {
    title: "First 100 Freelancers Get GoPeek Publish Free for 3 Months",
    description:
      "Build a client-ready portfolio in 5 minutes and get 3 months of GoPeek Publish completely free. Limited to the first 100 Malaysian freelancers.",
    url: "https://gopeek.my/free100",
  },
  twitter: {
    card: "summary_large_image",
    title: "First 100 Freelancers Get GoPeek Publish Free for 3 Months",
    description:
      "Limited to the first 100 Malaysian freelancers. Build free, get 3 months of Publish at RM 0.",
  },
};

const PROMO_CODE = "FREE100";

const PUBLISH_FEATURES = [
  "Custom username — gopeek.my/yourname",
  "Unlimited projects, blocks & images",
  "No GoPeek badge on your profile",
  "Basic analytics — track your profile views",
  "Enhanced lead capture",
  "3 full months, one-time — no auto-renewal",
];

const STEPS = [
  {
    n: "01",
    title: "Build your free portfolio",
    desc: "Go through the 5-minute wizard. Add your name, bio, social links, and best work. No design skills needed.",
  },
  {
    n: "02",
    title: "Publish and go live",
    desc: "Hit publish and your portfolio is instantly live on a free gopeek.my link. No credit card, no payment.",
  },
  {
    n: "03",
    title: "Upgrade free with your code",
    desc: `Go to the pricing page, select 3 months, and enter ${PROMO_CODE} at checkout. You pay RM 0. Your custom username and Publish features activate instantly.`,
  },
];

const OBJECTIONS = [
  {
    q: "I'm just getting started — I don't have much work to show.",
    a: "That's exactly why now is the right time. Even 1–2 strong projects beats a blank profile. Clients judge you on presentation as much as output. A clean GoPeek link says you're serious.",
  },
  {
    q: "I already have a LinkedIn / Instagram for my work.",
    a: "Those platforms bury your work in feeds and force clients to scroll. GoPeek gives you one clean link that's always your portfolio — not last Tuesday's post.",
  },
  {
    q: "What if I can't finish building it today?",
    a: "The wizard saves your progress. Start now, finish later. The code FREE100 doesn't expire — but only the first 100 people can use it. Claim your spot now, build at your pace.",
  },
  {
    q: "Is this really free? What's the catch?",
    a: "No catch. GoPeek's base plan is free forever. This campaign gives you 3 months of the paid Publish tier at RM 0 — a RM 57 value — to help the first 100 freelancers build a strong start.",
  },
];

const FAQS = [
  {
    q: "When does my 3 months start?",
    a: "From the moment you complete the checkout with code FREE100. So build your portfolio first, then redeem — your 3 months begin on your upgrade date.",
  },
  {
    q: "Do I need a credit card to start building?",
    a: "No. Building and publishing your portfolio is completely free. You only go to checkout when you're ready to activate your Publish upgrade with FREE100.",
  },
  {
    q: "What happens after 3 months?",
    a: "Your profile safely returns to the Free plan — all your content stays intact. You can renew from RM 19/month if you want to keep your custom username and analytics.",
  },
  {
    q: "Can I change my username later?",
    a: "Yes. On the Publish plan you can update your username any time from the Edit Portfolio flow.",
  },
];

export default function Free100Page() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek logo" className="rounded-xl object-contain" />
          <Image src="/gopeek_logo_text.png" width={72} height={20} alt="GoPeek" className="object-contain" />
        </Link>
        <Link
          href="/startup"
          className="rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition-colors"
        >
          Claim Free Spot
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 space-y-20">

        {/* ── Hero ── */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Limited — First 100 freelancers only
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            First 100 Freelancers Get{" "}
            <span className="text-emerald-400">3 Months of Publish Free</span>
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            A client asks to see your work. Right now, what do you send them?
            GoPeek gives you a professional portfolio link in 5 minutes —
            and for the first 100 freelancers, the full Publish plan is free for 3 months.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/startup"
              className="inline-flex items-center gap-2 justify-center rounded-2xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Claim My Free 3 Months
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sulaimanshafiq"
              target="_blank"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              See a live portfolio ↗
            </Link>
          </div>

          <p className="text-xs text-zinc-500">
            No credit card to start. Use code{" "}
            <span className="font-mono font-bold text-white">{PROMO_CODE}</span>{" "}
            at checkout to activate your free 3 months.
          </p>
        </div>

        {/* ── Hook strip ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              stat: "5 min",
              label: "From blank to live portfolio",
              sub: "No design skills. No templates. Just answer a few prompts.",
            },
            {
              stat: "RM 0",
              label: "For 3 months of Publish",
              sub: "Normally RM 57. Free for the first 100 with code FREE100.",
            },
            {
              stat: "100",
              label: "Spots available — total",
              sub: "Once 100 freelancers redeem FREE100, this offer is gone.",
            },
          ].map((item) => (
            <div
              key={item.stat}
              className="rounded-2xl border border-white/8 bg-white/3 p-5 text-center space-y-1"
            >
              <p className="text-3xl font-bold text-emerald-400">{item.stat}</p>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Mock profile ── */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">See it in action</p>
            <h2 className="text-2xl font-bold">This is what your portfolio looks like.</h2>
            <p className="text-sm text-zinc-400">
              Mobile-first, clean, and client-ready. Built with the same 5-minute wizard you&apos;re about to use.
            </p>
          </div>
          <MockupHero />
          <p className="text-center text-xs text-zinc-500">
            Want to see a real live portfolio?{" "}
            <Link href="/sulaimanshafiq" target="_blank" className="text-zinc-300 underline-offset-4 hover:underline">
              View gopeek.my/sulaimanshafiq ↗
            </Link>
          </p>
        </div>

        {/* ── Promo code spotlight ── */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Your promo code</p>
          <p className="text-6xl font-bold tracking-[0.15em] text-white">{PROMO_CODE}</p>
          <p className="text-sm text-zinc-400">
            Enter this at the pricing page after building your portfolio.{" "}
            <span className="font-semibold text-white">3 months of Publish — RM 0.</span>
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-xs text-zinc-600">100% off · Limited to 100 uses · One per account</span>
          </div>
          <Link
            href="/startup"
            className="mt-2 inline-flex items-center gap-2 justify-center rounded-2xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            Build My Portfolio Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── What's included ── */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">What you unlock</p>
            <h2 className="mt-2 text-2xl font-bold">Everything in Publish — free for 3 months.</h2>
            <p className="mt-1 text-sm text-zinc-400">Normally from RM 19/month. Yours at RM 0 with code {PROMO_CODE}.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PUBLISH_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-4 text-sm text-zinc-300">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ── How to claim + docs link ── */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">How to claim</p>
            <h2 className="mt-2 text-2xl font-bold">3 steps. Under 10 minutes.</h2>
          </div>
          <div className="space-y-3">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-2xl border border-white/8 bg-white/3 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-zinc-300">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Docs callout */}
          <div className="flex items-center gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <BookOpen className="h-5 w-5 shrink-0 text-indigo-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Not sure what to add?</p>
              <p className="mt-0.5 text-xs text-zinc-400">
                Our step-by-step guide walks you through every part of the builder — from your bio to your first project block.
              </p>
            </div>
            <Link
              href="/docs"
              className="shrink-0 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-400 hover:bg-indigo-500/20 transition-colors"
            >
              Read the guide →
            </Link>
          </div>
        </div>

        {/* ── Objection handling hooks ── */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">We hear you</p>
            <h2 className="mt-2 text-2xl font-bold">The doubts every freelancer has.</h2>
          </div>
          <div className="space-y-3">
            {OBJECTIONS.map((o) => (
              <details
                key={o.q}
                className="group rounded-2xl border border-white/8 bg-white/3 px-5 py-4 open:bg-white/5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="text-sm font-semibold text-white">{o.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-white/8 text-white/70 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{o.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold">Quick answers.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
                <p className="text-sm font-semibold text-white">{f.q}</p>
                <p className="mt-2 text-sm text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-500">
            More questions?{" "}
            <Link href="/docs" className="text-indigo-400 hover:underline underline-offset-4">
              Read the full docs
            </Link>{" "}
            or{" "}
            <a href="mailto:info@slmcreatives.com" className="text-indigo-400 hover:underline underline-offset-4">
              email us
            </a>
            .
          </p>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Spots are going. Don&apos;t wait.
          </p>
          <h2 className="text-2xl font-bold">
            The next client who searches for you<br className="hidden sm:block" /> deserves to find something great.
          </h2>
          <p className="mx-auto max-w-md text-sm text-zinc-400">
            Takes 5 minutes. Goes live for free. Use{" "}
            <span className="font-mono font-bold text-white">{PROMO_CODE}</span>{" "}
            at checkout to unlock 3 months of Publish at RM 0.
          </p>
          <Link
            href="/startup"
            className="inline-flex items-center gap-2 justify-center rounded-2xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            Build My Free Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-xs text-zinc-600">
            <span>No credit card to start</span>
            <span>·</span>
            <span>Code {PROMO_CODE} at pricing page</span>
            <span>·</span>
            <span>First 100 only</span>
          </div>
        </div>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-600">
        <p>
          © {new Date().getFullYear()} GoPeek ·{" "}
          <Link href="/docs" className="hover:text-zinc-400 transition">How it works</Link> ·{" "}
          <Link href="/pricing" className="hover:text-zinc-400 transition">Pricing</Link> ·{" "}
          <Link href="/privacy" className="hover:text-zinc-400 transition">Privacy</Link> ·{" "}
          <Link href="/terms" className="hover:text-zinc-400 transition">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
