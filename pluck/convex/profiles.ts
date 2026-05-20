import { action, internalMutation, mutation, query } from "./_generated/server";
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
    slug: v.optional(v.string()), // only honoured for Publish/Pro tier
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!profile) throw new Error("Profile not found.");

    const tier = profile.tier ?? "free";
    if (tier === "free") validateFreeLimits(args.tabs);

    let slug = profile.slug;

    if (args.slug && args.slug !== profile.slug) {
      if (tier === "free") {
        throw new Error("Upgrade to Publish to use a custom username.");
      }
      const taken = await ctx.db
        .query("profiles")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .unique();
      if (taken && taken._id !== profile._id)
        throw new Error(`The username "${args.slug}" is already taken.`);
      slug = args.slug;
    }

    const { slug: _ignored, ...rest } = args;
    await ctx.db.patch(profile._id, { ...rest, slug });
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
    if ((profile.tier ?? "free") === "free")
      throw new Error("Upgrade to manage your profile visibility.");
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

// Generates a short unique random slug (free-tier auto URL).
async function generateUniqueSlug(ctx: { db: { query: (table: string) => { withIndex: (index: string, fn: (q: { eq: (field: string, value: string) => unknown }) => unknown) => { unique: () => Promise<unknown> } } } }): Promise<string> {
  for (let i = 0; i < 10; i++) {
    const slug = Math.random().toString(36).slice(2, 9);
    const taken = await (ctx.db as any)
      .query("profiles")
      .withIndex("by_slug", (q: any) => q.eq("slug", slug))
      .unique();
    if (!taken) return slug;
  }
  throw new Error("Could not generate a unique URL — please try again.");
}

function validateFreeLimits(tabs: { blocks: unknown[] }[]) {
  const totalBlocks = tabs.reduce((n, t) => n + t.blocks.length, 0);
  const totalImages = tabs
    .flatMap((t) => t.blocks as { type: string; images?: unknown[] }[])
    .filter((b) => b.type === "gallery")
    .reduce((n, b) => n + (b.images?.length ?? 0), 0);
  if (tabs.length > 3) throw new Error("Free plan: maximum 3 projects (tabs). Upgrade to Publish for unlimited.");
  if (totalBlocks > 3) throw new Error("Free plan: maximum 3 blocks. Upgrade to Publish for unlimited.");
  if (totalImages > 6) throw new Error("Free plan: maximum 6 images total. Upgrade to Publish for unlimited.");
}

// Saves the initial profile as a free user — publishes immediately with an auto-generated slug.
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated.");

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      if ((existing.tier ?? "free") === "free") validateFreeLimits(args.tabs);
      await ctx.db.patch(existing._id, { ...args });
      return existing._id;
    }

    validateFreeLimits(args.tabs);
    const slug = await generateUniqueSlug(ctx as any);
    return await ctx.db.insert("profiles", {
      ...args,
      slug,
      published: true,
      tier: "free",
      userId,
    });
  },
});

// Called by Stripe webhook after one-time checkout completes.
export const activateSubscription = mutation({
  args: {
    stripeCustomerId: v.string(),
    tier: v.literal("publish"),
    profileId: v.id("profiles"),
    months: v.number(),
  },
  handler: async (ctx, { stripeCustomerId, tier, profileId, months }) => {
    const existing = await ctx.db.get(profileId);
    // If they already have an active subscription, extend it; otherwise start fresh.
    const base = existing?.subscriptionExpiresAt && existing.subscriptionExpiresAt > Date.now()
      ? existing.subscriptionExpiresAt
      : Date.now();
    const subscriptionExpiresAt = base + months * 30 * 24 * 60 * 60 * 1000;
    await ctx.db.patch(profileId, {
      published: true,
      tier,
      stripeCustomerId,
      subscriptionExpiresAt,
    });
  },
});

// Runs on a cron schedule to unpublish profiles whose subscription has expired.
export const expireSubscriptions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const profiles = await ctx.db.query("profiles").collect();
    for (const profile of profiles) {
      if (
        profile.tier === "publish" &&
        profile.subscriptionExpiresAt &&
        profile.subscriptionExpiresAt < now &&
        profile.published
      ) {
        await ctx.db.patch(profile._id, { published: false, tier: "free" });
      }
    }
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
