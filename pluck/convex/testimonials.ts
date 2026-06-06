import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("approved", true))
      .order("desc")
      .collect();
  },
});

export const submit = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    quote: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    if (!args.name.trim() || !args.quote.trim()) {
      throw new Error("Name and review are required.");
    }
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }
    await ctx.db.insert("testimonials", {
      ...args,
      approved: true,
    });
  },
});
