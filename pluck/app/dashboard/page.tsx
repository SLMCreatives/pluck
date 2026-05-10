"use client";

import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { PhoneMockup } from "@/components/phone-mockup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Edit2,
  ExternalLink,
  Copy,
  LogOut,
  Check,
  Layers,
  Link2,
} from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

export default function DashboardPage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (profile === null) router.replace("/startup");
  }, [profile, router]);

  if (profile === undefined || profile === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
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

  const publicUrl = `pluck.link/${profile.slug}`;
  const totalBlocks = data.tabs.reduce((n, t) => n + t.blocks.length, 0);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-semibold">
            P
          </span>
          <span className="text-sm font-semibold">Pluck</span>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-57px)]">
        {/* Left panel */}
        <div className="flex flex-col gap-6 p-6 lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Your Portfolio</h1>
          </div>

          {/* Profile card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-4">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="h-16 w-16 rounded-2xl object-cover border border-white/10 flex-shrink-0"
                />
              ) : (
                <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-white/10 text-xl font-bold">
                  {profile.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">
                  {profile.fullName}
                </p>
                <p className="truncate text-sm text-zinc-400">
                  {profile.professionalTitle}
                </p>
                {profile.bio && (
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Layers className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Tabs
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold">{data.tabs.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Link2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Blocks
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold">{totalBlocks}</p>
            </div>
          </div>

          {/* Public URL */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Public URL
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="truncate font-mono text-sm text-zinc-300">
                {publicUrl}
              </span>
              <button
                onClick={copyUrl}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link
                href={`/${profile.slug}`}
                target="_blank"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Profile
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-200"
            >
              <Link href="/dashboard/edit" className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Right panel — phone preview */}
        <PhoneMockup data={data} activeTab={data.tabs[0]?.id} />
      </div>
    </div>
  );
}
