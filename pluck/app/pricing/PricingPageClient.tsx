"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const MONTH_OPTIONS = [
  { months: 1,  price: 19,  pricePerMonth: 19,   savingsAmt: null },
  { months: 3,  price: 54,  pricePerMonth: 18,   savingsAmt: 3 },
  { months: 6,  price: 99,  pricePerMonth: 16.5, savingsAmt: 15 },
  { months: 12, price: 180, pricePerMonth: 15,   savingsAmt: 48 },
];

const FREE_FEATURES = [
  "3 blocks, 3 projects (tabs)",
  "6 images total",
  "Auto-generated public URL",
  "Basic lead capture (WhatsApp / Email)",
  "GoPeek badge on profile",
  "Basic themes only",
  "No analytics",
];

const PUBLISH_FEATURES = [
  "Unlimited blocks, projects & images",
  "Custom username (gopeek.my/yourname)",
  "No GoPeek badge",
  "Enhanced lead capture",
  "Basic analytics (view count)",
];

const PRO_FEATURES = [
  "Everything in Publish",
  "Premium themes",
  "Custom domain (yourname.com)",
  "Advanced analytics",
  "Multiple portfolios",
  "Priority support",
];

const STRIPE_CURRENCY: Record<string, string> = { RM: "myr", $: "usd" };

export function PricingPageClient({ currency }: { currency: string }) {
  const router = useRouter();
  const [selectedMonths, setSelectedMonths] = useState(1);
  const profile = useQuery(api.profiles.getMyProfile);
  const createCheckout = useAction(api.stripe.createSubscriptionCheckout);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useQuery(api.auth.currentUser);
  const currentTier = profile?.tier ?? "free";
  const stripeCurrency = STRIPE_CURRENCY[currency] ?? "myr";

  const selectedOption = MONTH_OPTIONS.find((o) => o.months === selectedMonths)!;

  async function handleUpgrade() {
    if (!profile) {
      router.push("/startup");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { checkoutUrl } = await createCheckout({
        profileId: profile._id,
        months: selectedMonths,
        email: (currentUser as { email?: string } | null)?.email ?? "",
        currency: stripeCurrency,
      });
      window.location.href = checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek logo" className="rounded-xl object-contain" />
          <Image src="/gopeek_logo_text.png" width={72} height={20} alt="GoPeek" className="object-contain" />
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-14 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Simple pricing</h1>
          <p className="text-zinc-400">
            Free to build and go live. Upgrade for a custom username and more.
          </p>
        </div>

        {error && (
          <p className="mb-8 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/3 p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Free</p>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold">{currency} 0</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">Build, go live, and share — at no cost.</p>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={currentTier !== "free" ? "/dashboard" : "/startup"}>
                {currentTier !== "free" ? "Your current base" : "Start for Free"}
              </Link>
            </Button>
          </div>

          {/* Publish */}
          <div className="relative flex flex-col rounded-3xl border border-indigo-500 bg-indigo-500/5 p-8">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-semibold text-white">
              Most popular
            </span>

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Publish</p>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold">{currency} {selectedOption.price}</span>
                <span className="mb-1 text-zinc-500">
                  / {selectedMonths === 1 ? "mo" : `${selectedMonths} mo`}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {currency} {selectedOption.pricePerMonth}/mo
                {selectedOption.savingsAmt !== null && (
                  <span className="ml-2 font-semibold text-emerald-400">
                    Save {currency} {selectedOption.savingsAmt}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Custom username and no GoPeek badge.</p>
            </div>

            {/* Month selector */}
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Duration
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {MONTH_OPTIONS.map((opt) => (
                  <button
                    key={opt.months}
                    onClick={() => setSelectedMonths(opt.months)}
                    className={[
                      "rounded-xl py-2 text-xs font-semibold transition-colors",
                      selectedMonths === opt.months
                        ? "bg-indigo-500 text-white"
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {opt.months === 12 ? "1yr" : `${opt.months}mo`}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {PUBLISH_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              disabled={currentTier === "publish" || loading}
              onClick={handleUpgrade}
              className="h-11 w-full rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600"
            >
              {currentTier === "publish"
                ? "Active — Renew to extend"
                : loading
                ? "Redirecting…"
                : `Pay ${currency} ${selectedOption.price}`}
            </Button>
          </div>

          {/* Pro — Coming Soon */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/3 p-8 opacity-60">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Pro</p>
                <span className="rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Coming Soon
                </span>
              </div>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold">{currency} 39</span>
                <span className="mb-1 text-zinc-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">Custom domain and advanced analytics.</p>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              disabled
              className="h-11 w-full rounded-2xl bg-white/10 text-zinc-500 cursor-not-allowed"
            >
              Coming Soon
            </Button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Pay once, stay live. Profile unpublishes when your period ends — renew anytime to stay live.
          <br />
          Supports credit card and FPX (online banking).
        </p>
      </main>
    </div>
  );
}
