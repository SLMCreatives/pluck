import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "expire subscriptions",
  { hours: 6 },
  internal.profiles.expireSubscriptions,
);

export default crons;
