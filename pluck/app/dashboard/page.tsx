"use client";

import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
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
  Eye,
  Lock,
  Globe,
  ArrowUpRight,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  publish: "Publish",
  pro: "Pro",
};
function formatExpiry(ts: number): string {
  return new Date(ts).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysUntil(ts: number): number {
  return Math.ceil((ts - Date.now()) / (1000 * 60 * 60 * 24));
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === "pro")
    return (
      <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
        Pro
      </span>
    );
  if (tier === "publish")
    return (
      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
        Publish
      </span>
    );
  return (
    <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ring-1 ring-inset ring-white/10">
      Free
    </span>
  );
}


function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-emerald-500" : "bg-white/15",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function DashboardPage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const setPublished = useMutation(api.profiles.setPublished);
  const { signOut } = useAuthActions();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [publishToggling, setPublishToggling] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

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
    phone: profile.phone ?? "",
    showPhone: profile.showPhone ?? false,
    socialLinks: profile.socialLinks ?? [],
    tabs: (profile.tabs ?? []) as PortfolioData["tabs"],
  };

  const tier = profile.tier ?? "free";
  const isPaid = tier !== "free";
  const expiresAt = profile.subscriptionExpiresAt ?? null;
  const daysLeft = expiresAt ? daysUntil(expiresAt) : null;
  const isExpiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const publicUrl = `gopeek.my/${profile.slug}`;
  const totalBlocks = data.tabs.reduce((n, t) => n + t.blocks.length, 0);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublish = async () => {
    setPublishToggling(true);
    setPublishError(null);
    try {
      await setPublished({ published: !profile.published });
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Failed to update visibility.");
    } finally {
      setPublishToggling(false);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek" className="rounded-xl object-contain" />
          <Image src="/gopeek_logo_text.png" width={72} height={20} alt="GoPeek" className="object-contain" />
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
        {/* ── Left panel ── */}
        <div className="flex flex-col gap-5 p-6 lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Your Portfolio</h1>
          </div>

          {/* Profile card */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center gap-4">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="h-16 w-16 shrink-0 rounded-2xl border border-white/10 object-cover"
                />
              ) : (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl font-bold">
                  {profile.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-lg font-semibold">{profile.fullName}</p>
                  <TierBadge tier={tier} />
                </div>
                <p className="truncate text-sm text-zinc-400">{profile.professionalTitle}</p>
                {profile.bio && (
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Layers className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Tabs</span>
              </div>
              <p className="mt-2 text-3xl font-semibold">{data.tabs.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Link2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Blocks</span>
              </div>
              <p className="mt-2 text-3xl font-semibold">{totalBlocks}</p>
            </div>
            {isPaid ? (
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Eye className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Views</span>
                </div>
                <p className="mt-2 text-3xl font-semibold">{profile.viewCount ?? 0}</p>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Eye className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Views</span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-zinc-700">—</p>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-zinc-950/80 backdrop-blur-sm">
                  <Lock className="h-4 w-4 text-zinc-500" />
                  <Link href="/pricing" className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition">
                    Upgrade to Publish
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Visibility toggle (paid) / Upgrade banner (free) ── */}
          {isPaid ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-zinc-400" />
                    <p className="text-sm font-semibold">Profile Visibility</p>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {profile.published
                      ? "Your profile is live and visible to anyone."
                      : "Your profile is hidden. Toggle to go live."}
                  </p>
                </div>
                <Toggle
                  checked={!!profile.published}
                  onChange={handleTogglePublish}
                  disabled={publishToggling}
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    profile.published ? "animate-pulse bg-emerald-400" : "bg-zinc-600",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-xs font-semibold",
                    profile.published ? "text-emerald-400" : "text-zinc-500",
                  ].join(" ")}
                >
                  {publishToggling ? "Updating…" : profile.published ? "Live" : "Draft"}
                </span>
              </div>
              {publishError && (
                <p className="mt-2 text-xs text-red-400">{publishError}</p>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-indigo-300">You&apos;re live on the Free plan</p>
                  <p className="mt-0.5 text-xs text-indigo-400/80">
                    Upgrade to Publish for a custom username and no GoPeek badge.
                  </p>
                </div>
                <Button
                  asChild
                  className="h-8 shrink-0 rounded-xl bg-indigo-500 px-3 text-xs font-semibold text-white hover:bg-indigo-400"
                >
                  <Link href="/pricing">Upgrade</Link>
                </Button>
              </div>
            </div>
          )}

          {/* ── Subscription & Billing ── */}
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Plan & Billing
            </p>

            {isPaid ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-bold">{TIER_LABEL[tier]} Plan</p>
                    {expiresAt && (
                      <p className="mt-0.5 text-sm text-zinc-400">
                        Active until {formatExpiry(expiresAt)}
                      </p>
                    )}
                  </div>
                  <TierBadge tier={tier} />
                </div>

                {isExpiringSoon && (
                  <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                    <p className="text-xs text-amber-300">
                      Expires in {daysLeft} day{daysLeft === 1 ? "" : "s"} — renew to stay live.
                    </p>
                  </div>
                )}

                <Button
                  asChild
                  className="h-10 w-full rounded-xl bg-indigo-500 text-white hover:bg-indigo-400"
                >
                  <Link href="/pricing" className="flex items-center justify-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Renew or extend
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xl font-bold">Free Plan</p>
                  <p className="text-sm text-zinc-400">Live with auto-generated URL</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">
                    Upgrade to Publish for a custom username, no badge, and analytics.
                  </p>
                  <Button
                    asChild
                    className="h-10 w-full rounded-xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
                  >
                    <Link href="/pricing" className="flex items-center justify-center gap-2">
                      View plans
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Public URL */}
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Public URL
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="truncate font-mono text-sm text-zinc-300">{publicUrl}</span>
              <button
                onClick={copyUrl}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={`/${profile.slug}`} target="_blank" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Profile
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <Link href="/dashboard/edit" className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Right panel — phone preview ── */}
        <PhoneMockup data={data} activeTab={data.tabs[0]?.id} />
      </div>
    </div>
  );
}
