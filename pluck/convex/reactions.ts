import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getReactions = query({
  args: { profileId: v.id("profiles"), visitorId: v.string() },
  handler: async (ctx, { profileId, visitorId }) => {
    const all = await ctx.db
      .query("reactions")
      .withIndex("by_profile", (q) => q.eq("profileId", profileId))
      .collect();

    const countMap: Record<string, number> = {};
    const reacted: string[] = [];

    for (const r of all) {
      countMap[r.emoji] = (countMap[r.emoji] ?? 0) + 1;
      if (r.visitorId === visitorId) reacted.push(r.emoji);
    }

    const counts = Object.entries(countMap).map(([emoji, count]) => ({ emoji, count }));
    return { counts, reacted };
  },
});

export const toggleReaction = mutation({
  args: {
    profileId: v.id("profiles"),
    emoji: v.string(),
    visitorId: v.string(),
  },
  handler: async (ctx, { profileId, emoji, visitorId }) => {
    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_profile_visitor_emoji", (q) =>
        q.eq("profileId", profileId).eq("visitorId", visitorId).eq("emoji", emoji)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    } else {
      await ctx.db.insert("reactions", { profileId, emoji, visitorId });
    }
  },
});

export const getReactionSummary = query({
  args: { profileId: v.id("profiles") },
  handler: async (ctx, { profileId }) => {
    const all = await ctx.db
      .query("reactions")
      .withIndex("by_profile", (q) => q.eq("profileId", profileId))
      .collect();

    const countMap: Record<string, number> = {};
    for (const r of all) {
      countMap[r.emoji] = (countMap[r.emoji] ?? 0) + 1;
    }
    return Object.entries(countMap).map(([emoji, count]) => ({ emoji, count }));
  },
});
