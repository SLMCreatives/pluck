"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    id: "free" as const,
    name: "Free",
    price: "RM 0",
    period: "",
    description: "Build and preview your portfolio.",
    features: [
      "Full portfolio builder",
      "Live phone preview",
      "Saved as draft",
    ],
    cta: "Current plan",
    highlight: false,
  },
  {
    id: "publish" as const,
    name: "Publish",
    price: "RM 9",
    period: "/mo",
    description: "Go live with a public profile URL.",
    features: [
      "Everything in Free",
      "Live public URL",
      "All content blocks",
      "Unlimited edits",
    ],
    cta: "Upgrade to Publish",
    highlight: true,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "RM 19",
    period: "/mo",
    description: "Stand out with custom domain & analytics.",
    features: [
      "Everything in Publish",
      "Custom domain",
      "Profile analytics",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlight: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const profile = useQuery(api.profiles.getMyProfile);
  const createCheckout = useAction(api.stripe.createSubscriptionCheckout);
  const [loading, setLoading] = useState<"publish" | "pro" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useQuery(api.auth.currentUser);
  const currentTier = profile?.tier ?? "free";

  async function handleUpgrade(tier: "publish" | "pro") {
    if (!profile) {
      router.push("/startup");
      return;
    }
    setLoading(tier);
    setError(null);
    try {
      const { checkoutUrl } = await createCheckout({
        profileId: profile._id,
        tier,
        email: (currentUser as { email?: string } | null)?.email ?? "",
      });
      window.location.href = checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-semibold">
            P
          </span>
          <span className="text-sm font-semibold">Pluck</span>
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Simple pricing</h1>
          <p className="mt-3 text-zinc-400">
            Build for free. Publish when you&apos;re ready.
          </p>
        </div>

        {error && (
          <p className="mb-8 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => {
            const isCurrent = currentTier === tier.id;
            const isLoading = loading === tier.id;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.highlight
                    ? "border-indigo-500 bg-indigo-500/5"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
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
                      <CheckIcon className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.id === "free" ? (
                  <Button
                    variant="outline"
                    disabled
                    className="h-11 w-full rounded-2xl text-zinc-400"
                  >
                    {isCurrent ? "Current plan" : tier.cta}
                  </Button>
                ) : (
                  <Button
                    disabled={isCurrent || isLoading}
                    onClick={() => handleUpgrade(tier.id)}
                    className={`h-11 w-full rounded-2xl ${
                      tier.highlight
                        ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    {isCurrent
                      ? "Current plan"
                      : isLoading
                      ? "Redirecting…"
                      : tier.cta}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
