import { headers } from "next/headers";
import { PricingPageClient } from "./PricingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — GoPeek Portfolio Builder",
  description:
    "Start free, forever — no credit card required. Upgrade to Publish from RM 19 for a custom username, no badge, and analytics. One-time payment, no auto-renewal.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — GoPeek Portfolio Builder",
    description:
      "Start free, forever. Upgrade to Publish from RM 19 — one-time payment, custom username, no auto-renewal.",
    url: "https://gopeek.my/pricing",
  },
  twitter: {
    card: "summary",
    title: "Pricing — GoPeek Portfolio Builder",
    description:
      "Start free, forever. Upgrade to Publish from RM 19 — one-time payment, custom username, no auto-renewal.",
  },
};

export default async function PricingPage() {
  const h = await headers();
  const country = (
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    "MY"
  ).toUpperCase();
  const currency = country === "MY" ? "RM" : "$";

  return <PricingPageClient currency={currency} />;
}
