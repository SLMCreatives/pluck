import { headers } from "next/headers";
import { PricingPageClient } from "./PricingPageClient";

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
