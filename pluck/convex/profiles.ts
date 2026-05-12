import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("profiles").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!profile?.published) return null;
    return profile;
  },
});

export const getPublishStatus = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!profile) return { exists: false, published: false };
    return { exists: true, published: profile.published ?? false };
  },
});

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const createPendingProfile = mutation({
  args: {
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    socialLinks: v.array(v.object({ platform: v.string(), url: v.string() })),
    tabs: v.array(v.object({ id: v.string(), name: v.string(), blocks: v.array(v.any()) })),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      if (args.slug !== existing.slug) {
        const taken = await ctx.db
          .query("profiles")
          .withIndex("by_slug", (q) => q.eq("slug", args.slug))
          .unique();
        if (taken && taken._id !== existing._id)
          throw new Error(`The username "${args.slug}" is already taken.`);
      }
      await ctx.db.patch(existing._id, { ...args, published: false });
      return existing._id;
    }

    const taken = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (taken) throw new Error(`The username "${args.slug}" is already taken.`);

    return await ctx.db.insert("profiles", { ...args, published: false, userId });
  },
});

export const setBillId = mutation({
  args: { profileId: v.id("profiles"), billId: v.string() },
  handler: async (ctx, { profileId, billId }) => {
    await ctx.db.patch(profileId, { billId });
  },
});

export const publishByBillId = mutation({
  args: { billId: v.string() },
  handler: async (ctx, { billId }) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_bill", (q) => q.eq("billId", billId))
      .unique();
    if (!profile) throw new Error("Profile not found for bill.");
    await ctx.db.patch(profile._id, { published: true });
  },
});

export const updateProfile = mutation({
  args: {
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    phone: v.optional(v.string()),
    showPhone: v.optional(v.boolean()),
    socialLinks: v.array(v.object({ platform: v.string(), url: v.string() })),
    tabs: v.array(v.object({ id: v.string(), name: v.string(), blocks: v.array(v.any()) })),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!profile) throw new Error("Profile not found.");

    if (args.slug !== profile.slug) {
      const taken = await ctx.db
        .query("profiles")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .unique();
      if (taken) throw new Error(`The username "${args.slug}" is already taken.`);
    }

    await ctx.db.patch(profile._id, args);
    return profile._id;
  },
});

// Lets paid users manually toggle their profile's visibility.
export const setPublished = mutation({
  args: { published: v.boolean() },
  handler: async (ctx, { published }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!profile) throw new Error("Profile not found.");
    if (published && !profile.stripeCustomerId)
      throw new Error("Upgrade required to publish.");
    await ctx.db.patch(profile._id, { published });
  },
});

// Increments the view counter on a public profile visit.
export const incrementViewCount = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!profile?.published) return;
    await ctx.db.patch(profile._id, { viewCount: (profile.viewCount ?? 0) + 1 });
  },
});

// Saves profile as a free draft — no payment required.
export const saveProfile = mutation({
  args: {
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    phone: v.optional(v.string()),
    showPhone: v.optional(v.boolean()),
    socialLinks: v.array(v.object({ platform: v.string(), url: v.string() })),
    tabs: v.array(v.object({ id: v.string(), name: v.string(), blocks: v.array(v.any()) })),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      if (args.slug !== existing.slug) {
        const taken = await ctx.db
          .query("profiles")
          .withIndex("by_slug", (q) => q.eq("slug", args.slug))
          .unique();
        if (taken && taken._id !== existing._id)
          throw new Error(`The username "${args.slug}" is already taken.`);
      }
      await ctx.db.patch(existing._id, { ...args });
      return existing._id;
    }

    const taken = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (taken) throw new Error(`The username "${args.slug}" is already taken.`);

    return await ctx.db.insert("profiles", {
      ...args,
      published: false,
      tier: "free",
      userId,
    });
  },
});

// Called by Stripe webhook after subscription checkout completes.
export const activateSubscription = mutation({
  args: {
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    tier: v.union(v.literal("publish"), v.literal("pro")),
    profileId: v.id("profiles"),
  },
  handler: async (ctx, { stripeCustomerId, stripeSubscriptionId, tier, profileId }) => {
    await ctx.db.patch(profileId, {
      published: true,
      tier,
      stripeCustomerId,
      stripeSubscriptionId,
      subscriptionStatus: "active",
    });
  },
});

// Called by webhook when subscription is updated or deleted.
export const setSubscriptionStatus = mutation({
  args: {
    stripeCustomerId: v.string(),
    subscriptionStatus: v.string(),
    tier: v.optional(v.union(v.literal("free"), v.literal("publish"), v.literal("pro"))),
  },
  handler: async (ctx, { stripeCustomerId, subscriptionStatus, tier }) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_stripe_customer", (q) => q.eq("stripeCustomerId", stripeCustomerId))
      .unique();
    if (!profile) return;

    const isActive = subscriptionStatus === "active";
    await ctx.db.patch(profile._id, {
      subscriptionStatus,
      ...(tier ? { tier } : {}),
      published: isActive,
      ...(!isActive ? { tier: "free" as const } : {}),
    });
  },
});

// Creates a Stripe Customer Portal session so users can manage billing.
export const createBillingPortalSession = action({
  args: {},
  handler: async (ctx): Promise<{ url: string }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const profile = await ctx.runQuery(api.profiles.getMyProfile);
    if (!profile?.stripeCustomerId) throw new Error("No active subscription found.");

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    if (!secretKey) throw new Error("Stripe not configured.");

    const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: profile.stripeCustomerId,
        return_url: `${siteUrl}/dashboard`,
      }).toString(),
    });

    const session = await res.json();
    if (!res.ok) throw new Error(session.error?.message ?? "Stripe portal error");
    return { url: session.url as string };
  },
});

export const createProfile = mutation({
  args: {
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    socialLinks: v.array(
      v.object({
        platform: v.string(),
        url: v.string(),
      })
    ),
    tabs: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        blocks: v.array(v.any()),
      })
    ),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      throw new Error(`The username "${args.slug}" is already taken.`);
    }

    return await ctx.db.insert("profiles", {
      ...args,
      published: true,
      userId,
    });
  },
});
