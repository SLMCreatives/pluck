import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

auth.addHttpRoutes(http);

async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string
): Promise<boolean> {
  const t = sigHeader.split(",").find((p) => p.startsWith("t="))?.slice(2);
  const v1 = sigHeader.split(",").find((p) => p.startsWith("v1="))?.slice(3);
  if (!t || !v1) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${t}.${rawBody}`)
  );
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hex === v1;
}

http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new Response("Server misconfigured", { status: 500 });
    }

    const rawBody = await request.text();
    const sigHeader = request.headers.get("Stripe-Signature") ?? "";

    const valid = await verifyStripeSignature(rawBody, sigHeader, webhookSecret);
    if (!valid) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const profileId = session.metadata?.profileId as Id<"profiles"> | undefined;
      const tier = session.metadata?.tier as "publish" | undefined;
      const months = parseInt(session.metadata?.months ?? "1", 10);
      const stripeCustomerId = session.customer as string | undefined;

      if (profileId && tier === "publish" && stripeCustomerId) {
        await ctx.runMutation(api.profiles.activateSubscription, {
          profileId,
          tier,
          stripeCustomerId,
          months,
        });
      }
    }

    return new Response("ok", { status: 200 });
  }),
});

export default http;
