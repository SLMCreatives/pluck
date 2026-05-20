import { action } from "./_generated/server";
import { v } from "convex/values";

// Prices in MYR sen (1 MYR = 100 sen). Bulk discounts applied at 6+ months.
const AMOUNT_SEN: Record<number, number> = {
  1: 1900,   // RM 19
  3: 5400,   // RM 18/mo — save RM 3
  6: 9900,   // RM 16.50/mo — save RM 15
  12: 18000, // RM 15/mo — save RM 48
};

function amountForMonths(months: number): number {
  return AMOUNT_SEN[months] ?? months * 1900;
}

export const createSubscriptionCheckout = action({
  args: {
    profileId: v.id("profiles"),
    months: v.number(),
    email: v.string(),
  },
  handler: async (_ctx, { profileId, months, email }): Promise<{ checkoutUrl: string }> => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    if (!secretKey) {
      throw new Error("Stripe not configured. Set STRIPE_SECRET_KEY in Convex environment variables.");
    }

    const amountSen = amountForMonths(months);
    const label = months === 1 ? "1 month" : `${months} months`;

    const body = new URLSearchParams({
      "line_items[0][price_data][currency]": "myr",
      "line_items[0][price_data][product_data][name]": `Peek Publish — ${label}`,
      "line_items[0][price_data][product_data][description]":
        `Custom username, no Peek badge, analytics. Valid for ${label}.`,
      "line_items[0][price_data][unit_amount]": String(amountSen),
      "line_items[0][quantity]": "1",
      mode: "payment",
      customer_email: email,
      "payment_method_types[0]": "card",
      "payment_method_types[1]": "fpx",
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
