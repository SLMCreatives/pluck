"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PortfolioPreview } from "@/components/portfolio-preview";
import type { PortfolioData } from "@/types/portfolio";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ "user.id": string }>;
}) {
  const { "user.id": slug } = use(params);
  const profile = useQuery(api.profiles.getBySlug, { slug });

  if (profile === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-zinc-400">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="space-y-3 text-center">
          <p className="text-2xl font-semibold">404</p>
          <p className="text-sm text-zinc-400">
            No profile found at{" "}
            <span className="font-mono text-white">pluck.link/{slug}</span>
          </p>
        </div>
      </div>
    );
  }

  const data: PortfolioData = {
    fullName: profile.fullName,
    professionalTitle: profile.professionalTitle,
    bio: profile.bio,
    profileImage: profile.profileImage,
    socialLinks: profile.socialLinks ?? [],
    tabs: (profile.tabs ?? []) as PortfolioData["tabs"],
  };

  return (
    <div className="min-h-screen bg-black">
      <PortfolioPreview data={data} />
    </div>
  );
}
