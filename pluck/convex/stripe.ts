import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const createCheckoutSession = action({
  args: {
    email: v.string(),
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    socialLinks: v.array(v.object({ platform: v.string(), url: v.string() })),
    tabs: v.array(v.object({ id: v.string(), name: v.string(), blocks: v.array(v.any()) })),
    slug: v.string(),
  },
  handler: async (ctx, { email, slug, fullName, ...rest }): Promise<{ checkoutUrl: string }> => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    const convexSiteUrl = process.env.CONVEX_SITE_URL;

    if (!secretKey || !convexSiteUrl) {
      throw new Error(
        "Stripe not configured. Set STRIPE_SECRET_KEY and CONVEX_SITE_URL in Convex environment variables."
      );
    }

    const profileId: Id<"profiles"> = await ctx.runMutation(api.profiles.createPendingProfile, {
      fullName,
      slug,
      ...rest,
    });

    const body = new URLSearchParams({
      "line_items[0][price_data][currency]": "myr",
      "line_items[0][price_data][product_data][name]": "Pluck Portfolio",
      "line_items[0][price_data][product_data][description]": `@${slug} — one-time publish fee`,
      "line_items[0][price_data][unit_amount]": "1000",
      "line_items[0][quantity]": "1",
      mode: "payment",
      customer_email: email,
      "metadata[profileId]": profileId,
      "metadata[slug]": slug,
      success_url: `${siteUrl}/startup/paid?slug=${encodeURIComponent(slug)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/startup/paid?slug=${encodeURIComponent(slug)}&canceled=true`,
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

    await ctx.runMutation(api.profiles.setBillId, { profileId, billId: session.id });

    return { checkoutUrl: session.url as string };
  },
});
