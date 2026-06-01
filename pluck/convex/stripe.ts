import { action } from "./_generated/server";
import { v } from "convex/values";

export const createSubscriptionCheckout = action({
  args: {
    profileId: v.id("profiles"),
    months: v.number(),
    email: v.string(),
    currency: v.optional(v.string()), // "myr" or "usd"; defaults to "myr"
  },
  handler: async (_ctx, { profileId, months, email, currency = "myr" }): Promise<{ checkoutUrl: string }> => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    if (!secretKey) {
      throw new Error("Stripe not configured. Set STRIPE_SECRET_KEY in Convex environment variables.");
    }

    const isMYR = currency === "myr";
    const priceId = isMYR
      ? process.env.STRIPE_PUBLISH_PRICE_ID_MYR
      : process.env.STRIPE_PUBLISH_PRICE_ID_USD;

    if (!priceId) {
      const envVar = isMYR ? "STRIPE_PUBLISH_PRICE_ID_MYR" : "STRIPE_PUBLISH_PRICE_ID_USD";
      throw new Error(`Stripe product not configured. Set ${envVar} in Convex environment variables.`);
    }

    const body = new URLSearchParams({
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": String(months),
      mode: "payment",
      customer_email: email,
      "payment_method_types[0]": "card",
      ...(isMYR && { "payment_method_types[1]": "fpx" }),
      allow_promotion_codes: "true",
      "metadata[profileId]": profileId,
      "metadata[tier]": "publish",
      "metadata[months]": String(months),
      success_url: `${siteUrl}/startup/subscribed?tier=publish&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const session = await res.json();
    if (!res.ok) {
      throw new Error(session.error?.message ?? `Stripe error: ${JSON.stringify(session)}`);
    }

    return { checkoutUrl: session.url as string };
  },
});
