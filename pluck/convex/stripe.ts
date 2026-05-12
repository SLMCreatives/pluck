import { action } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createSubscriptionCheckout = action({
  args: {
    profileId: v.id("profiles"),
    tier: v.union(v.literal("publish"), v.literal("pro")),
    email: v.string(),
  },
  handler: async (_ctx, { profileId, tier, email }): Promise<{ checkoutUrl: string }> => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    const priceId =
      tier === "pro"
        ? process.env.STRIPE_PRO_PRICE_ID
        : process.env.STRIPE_PUBLISH_PRICE_ID;

    if (!secretKey || !priceId) {
      throw new Error(
        "Stripe not configured. Set STRIPE_SECRET_KEY, STRIPE_PUBLISH_PRICE_ID, and STRIPE_PRO_PRICE_ID in Convex environment variables."
      );
    }

    const body = new URLSearchParams({
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      mode: "subscription",
      customer_email: email,
      "metadata[profileId]": profileId,
      "metadata[tier]": tier,
      success_url: `${siteUrl}/startup/subscribed?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
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
