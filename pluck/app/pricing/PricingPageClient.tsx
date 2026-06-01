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
  { months: 1,  price: 19  },
  { months: 3,  price: 57  },
  { months: 6,  price: 114 },
  { months: 12, price: 228 },
];

const FREE_FEATURES = [
  "Live gopeek.my link — instantly",
  "WhatsApp & email contact button",
  "3 projects, 3 blocks, 6 images",
  "Looks great on any phone",
  "Free forever — not a trial",
];

const PUBLISH_FEATURES = [
  "Unlimited blocks, projects & images",
  "Custom username (gopeek.my/yourname)",
  "No GoPeek badge",
  "Enhanced lead capture",
  "Basic analytics (view count)",
];

const STRIPE_CURRENCY: Record<string, string> = { RM: "myr", $: "usd" };

export function PricingPageClient({ currency }: { currency: string }) {
  const router = useRouter();
  const [sliderIndex, setSliderIndex] = useState(0);
  const profile = useQuery(api.profiles.getMyProfile);
  const createCheckout = useAction(api.stripe.createSubscriptionCheckout);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useQuery(api.auth.currentUser);
  const currentTier = profile?.tier ?? "free";
  const stripeCurrency = STRIPE_CURRENCY[currency] ?? "myr";

  const selectedOption = MONTH_OPTIONS[sliderIndex];
  const selectedMonths = selectedOption.months;

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

      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-14 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Simple pricing</h1>
          <p className="text-zinc-400">
            Free to build and go live. Upgrade for a custom username and more.
          </p>
        </div>

        {error && (
          <p className="mb-8 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-3xl border border-emerald-500/50 bg-emerald-500/5 p-8">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white mb-3">
                Free forever
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Free</p>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold">{currency} 0</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">Live in 5 minutes. Free forever. No card needed.</p>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={currentTier !== "free" ? "/dashboard" : "/startup"}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              {currentTier !== "free" ? "Your current base" : "Build My Free Portfolio"}
            </Link>
          </div>

          {/* Publish */}
          <div className="flex flex-col rounded-3xl border border-indigo-500 bg-indigo-500/5 p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Publish</p>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold">{currency} {selectedOption.price}</span>
                <span className="mb-1 text-zinc-500">
                  / {selectedMonths === 1 ? "1 month" : `${selectedMonths} months`}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {currency} 19 × {selectedMonths} {selectedMonths === 1 ? "month" : "months"}
              </p>
              <p className="mt-2 text-sm text-zinc-400">One-time payment. No auto-renewal.</p>
            </div>

            {/* Month slider */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold uppercase tracking-widest text-zinc-500">Duration</span>
                <span className="font-semibold text-white">
                  {selectedMonths === 12 ? "1 year" : `${selectedMonths} month${selectedMonths > 1 ? "s" : ""}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={MONTH_OPTIONS.length - 1}
                step={1}
                value={sliderIndex}
                onChange={(e) => setSliderIndex(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                {MONTH_OPTIONS.map((opt) => (
                  <span key={opt.months}>{opt.months === 12 ? "1yr" : `${opt.months}mo`}</span>
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
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Pay once for your selected duration. No auto-renewal.
          <br />
          When your Publish period ends, your profile safely returns to the Free plan. Your content stays intact.
          <br />
          Supports credit card and FPX (online banking).
        </p>
      </main>
    </div>
  );
}
