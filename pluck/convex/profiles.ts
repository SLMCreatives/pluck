import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

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
