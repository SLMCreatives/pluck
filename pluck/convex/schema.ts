import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  profiles: defineTable({
    fullName: v.string(),
    professionalTitle: v.string(),
    bio: v.string(),
    profileImage: v.string(),
    socialLinks: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
        })
      )
    ),
    tabs: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          blocks: v.array(v.any()),
        })
      )
    ),
    phone: v.optional(v.string()),
    showPhone: v.optional(v.boolean()),
    slug: v.optional(v.string()),
    published: v.optional(v.boolean()),
    userId: v.optional(v.id("users")),
    billId: v.optional(v.string()),
    tier: v.optional(v.union(v.literal("free"), v.literal("publish"), v.literal("pro"))),
    billingPeriod: v.optional(v.union(v.literal("monthly"), v.literal("yearly"))),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    subscriptionExpiresAt: v.optional(v.number()),
    viewCount: v.optional(v.number()),
    coverImage: v.optional(v.string()),
    theme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
  })
    .index("by_slug", ["slug"])
    .index("by_user", ["userId"])
    .index("by_bill", ["billId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),
  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    quote: v.string(),
    rating: v.number(),
    approved: v.optional(v.boolean()),
  }).index("by_approved", ["approved"]),
  reactions: defineTable({
    profileId: v.id("profiles"),
    emoji: v.string(),
    visitorId: v.string(),
  })
    .index("by_profile", ["profileId"])
    .index("by_profile_visitor_emoji", ["profileId", "visitorId", "emoji"]),
});
