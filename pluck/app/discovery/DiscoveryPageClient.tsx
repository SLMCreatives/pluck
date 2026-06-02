"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function DiscoveryPageClient() {
  const profiles = useQuery(api.profiles.getPublishedProfiles);

  if (profiles === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div className="space-y-2">
          <p className="text-2xl">🌱</p>
          <p className="text-zinc-400 text-sm">No profiles yet. Be the first!</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Discover Creators</h1>
        <p className="mt-1 text-zinc-400 text-sm">
          Browse portfolios from Malaysian freelancers and creators.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <Link
            key={profile._id}
            href={`/${profile.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-5 transition-all duration-200 hover:border-white/16 hover:bg-white/8"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                {profile.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xl">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-white leading-tight">
                  {profile.fullName}
                </p>
                <p className="truncate text-xs text-zinc-400 mt-0.5">
                  {profile.professionalTitle}
                </p>
              </div>
              {profile.tier === "publish" && (
                <span className="ml-auto shrink-0 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-300">
                  Pro
                </span>
              )}
            </div>

            <p className="line-clamp-2 text-sm text-zinc-400 leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="font-mono text-xs text-zinc-500">
                gopeek.my/{profile.slug}
              </span>
              {profile.topReactions.length > 0 ? (
                <div className="flex items-center gap-1">
                  {profile.topReactions.map(({ emoji, count }) => (
                    <span
                      key={emoji}
                      className="flex items-center gap-0.5 rounded-full bg-white/8 px-2 py-0.5 text-xs"
                    >
                      <span>{emoji}</span>
                      <span className="text-zinc-400 tabular-nums">{count}</span>
                    </span>
                  ))}
                </div>
              ) : (
                profile.viewCount > 0 && (
                  <span className="text-xs text-zinc-500">
                    {profile.viewCount.toLocaleString()} views
                  </span>
                )
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
