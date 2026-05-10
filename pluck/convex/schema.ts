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
    slug: v.optional(v.string()),
    published: v.optional(v.boolean()),
    userId: v.optional(v.id("users")),
    billId: v.optional(v.string()),
  }).index("by_slug", ["slug"]).index("by_user", ["userId"]).index("by_bill", ["billId"]),
});
