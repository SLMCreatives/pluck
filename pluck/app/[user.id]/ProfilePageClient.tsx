"use client";

import { use, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PortfolioPreview } from "@/components/portfolio-preview";
import type { PortfolioData } from "@/types/portfolio";
import Link from "next/link";

export function ProfilePageClient({
  params,
}: {
  params: Promise<{ "user.id": string }>;
}) {
  const { "user.id": slug } = use(params);
  const profile = useQuery(api.profiles.getBySlug, { slug });
  const status = useQuery(api.profiles.getPublishStatus, { slug });
  const incrementViewCount = useMutation(api.profiles.incrementViewCount);

  useEffect(() => {
    if (profile) incrementViewCount({ slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?._id]);

  if (profile === undefined || status === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-zinc-400">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (profile === null && status.exists && !status.published) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-sm space-y-4 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-white/5 text-2xl">
            🔒
          </div>
          <h1 className="text-xl font-semibold">Profile not published yet</h1>
          <p className="text-sm text-zinc-400">
            <span className="font-mono text-zinc-300">gopeek.my/{slug}</span>{" "}
            exists but hasn&apos;t been made public yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Back to GoPeek
          </Link>
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
            <span className="font-mono text-white">gopeek.my/{slug}</span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Back to GoPeek
          </Link>
        </div>
      </div>
    );
  }

  const data: PortfolioData = {
    fullName: profile.fullName,
    professionalTitle: profile.professionalTitle,
    bio: profile.bio,
    profileImage: profile.profileImage,
    phone: profile.phone ?? "",
    showPhone: profile.showPhone ?? false,
    socialLinks: profile.socialLinks ?? [],
    tabs: (profile.tabs ?? []) as PortfolioData["tabs"],
  };

  return <PortfolioPreview data={data} showBadge={!profile.tier || profile.tier === "free"} />;
}
